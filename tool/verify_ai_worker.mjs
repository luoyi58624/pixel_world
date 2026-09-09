// 独立浏览器验收：只启动本工具专用的无头 Chrome，不接触用户现有浏览器。
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {spawn} from 'node:child_process';

const option=(name,fallback)=>{const i=process.argv.indexOf(name);return i<0?fallback:process.argv[i+1];};
const mode=option('--mode','worker');
const chrome=option('--chrome','C:/Program Files/Google/Chrome/Application/chrome.exe');
const root=path.resolve(option('--web-root',mode==='worker'?'web':'build/web'));
const output=path.resolve('build/national_ai');fs.mkdirSync(output,{recursive:true});
const probe=`<!doctype html><html><head><base href="/strategy/"><meta charset="utf-8"></head><body><pre id="result">running</pre><script>
(async()=>{
 const f=await (await fetch('worker_fixture.json')).json();
 const failures=[],samples=[];let frames=0,last=performance.now(),intervals=[];
 function frame(t){frames++;intervals.push(t-last);last=t;requestAnimationFrame(frame);}requestAnimationFrame(frame);
 const worker=new Worker(new URL('ai/worker.js?v='+f.build,document.baseURI));
 let context='',index=0,cancelled=false;const started=performance.now();
 const normalize=v=>typeof v==='number'?Math.round(v*1e6)/1e6:Array.isArray(v)?v.map(normalize):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,normalize(x)])):v;
 function finish(error){worker.terminate();intervals=intervals.filter(x=>x>0).sort((a,b)=>a-b);const result={ok:!error,context,cancelled,replies:index,frames,elapsed:performance.now()-started,frameP95:intervals[Math.floor(intervals.length*.95)]||0,samples,error};document.getElementById('result').textContent=JSON.stringify(result);document.body.dataset.status=error?'failed':'passed';}
 worker.onerror=e=>finish(e.message||'worker error');
 worker.onmessage=e=>{try{
   const d=JSON.parse(e.data);
   if(d.kind==='hello'){context=d.backend;if(d.build!==f.build||!context.includes('DedicatedWorkerGlobalScope'))throw Error('worker identity mismatch');worker.postMessage(JSON.stringify({kind:'init',protocol:f.request.protocol,build:f.build,rules:f.rules,map:f.map}));}
   if(d.kind==='ready'){worker.postMessage(JSON.stringify({kind:'plan',request:{...f.request,id:999}}));worker.postMessage(JSON.stringify({kind:'cancel',id:999}));}
   if(d.kind==='cancelled'){cancelled=true;worker.postMessage(JSON.stringify({kind:'plan',request:{...f.request,id:1}}));}
   if(d.kind==='reply'){
     if(d.reply.id===999)throw Error('cancellation was not observed');
     if(d.reply.error)throw Error(d.reply.error);
     if(JSON.stringify(normalize(d.reply.plan))!==JSON.stringify(normalize(f.expected)))throw Error('native and web plans differ');
     index++;samples.push(d.reply.micros);
     if(index===24){if(frames<2)throw Error('main animation did not progress');finish(null);}
     else worker.postMessage(JSON.stringify({kind:'plan',request:{...f.request,id:index+1}}));
   }
   if(d.kind==='error')throw Error(d.message);
 }catch(error){finish(String(error));}};
 setTimeout(()=>{if(!document.body.dataset.status)finish('timeout');},15000);
})().catch(e=>{document.getElementById('result').textContent=String(e);document.body.dataset.status='failed';});
</script></body></html>`;

const server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://local');let relative=decodeURIComponent(url.pathname).replace(/^\/strategy\//,'/').replace(/^\//,'');
  res.setHeader('Cache-Control','no-store');
  if(relative==='worker_probe.html'){res.setHeader('Content-Type','text/html; charset=utf-8');res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline'; worker-src 'self'; connect-src 'self'");res.end(probe);return;}
  let file=relative==='worker_fixture.json'?path.join(output,'worker_fixture.json'):path.resolve(root,relative||'index.html');
  if(relative!=='worker_fixture.json'&&!file.startsWith(root+path.sep)&&file!==path.join(root,'index.html')){res.writeHead(403);res.end();return;}
  if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
  const types={'.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.html':'text/html','.wasm':'application/wasm','.png':'image/png','.css':'text/css'};
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const port=server.address().port;
const child=spawn(chrome,['--headless=new','--no-first-run','--no-default-browser-check','--remote-debugging-port=0',`--user-data-dir=${path.join(output,'chrome-'+Date.now())}`,'--disable-background-timer-throttling','--disable-renderer-backgrounding','about:blank'],{windowsHide:true,stdio:['ignore','ignore','pipe']});
let ws;
try{
  const endpoint=await new Promise((resolve,reject)=>{let data='';const timer=setTimeout(()=>reject(Error('Chrome startup timeout')),10000);child.stderr.on('data',chunk=>{data+=chunk;const match=data.match(/DevTools listening on (ws:\/\/[^\s]+)/);if(match){clearTimeout(timer);resolve(match[1]);}});child.once('error',reject);});
  ws=new WebSocket(endpoint);await new Promise((r,j)=>{ws.addEventListener('open',r,{once:true});ws.addEventListener('error',j,{once:true});});
  let serial=0;const callbacks=new Map(),events=[];
  ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.id){const c=callbacks.get(d.id);callbacks.delete(d.id);if(c){d.error?c.reject(Error(JSON.stringify(d.error))):c.resolve(d.result);}}else events.push(d);});
  const send=(method,params={},sessionId)=>new Promise((resolve,reject)=>{const id=++serial;callbacks.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params,sessionId}));});
  const target=await send('Target.createTarget',{url:'about:blank'});
  const {sessionId}=await send('Target.attachToTarget',{targetId:target.targetId,flatten:true});
  await send('Runtime.enable',{},sessionId);await send('Page.enable',{},sessionId);await send('Network.enable',{},sessionId);
  await send('Emulation.setDeviceMetricsOverride',{width:1024,height:768,deviceScaleFactor:1.75,mobile:false},sessionId);
  const url=`http://127.0.0.1:${port}/strategy/${mode==='worker'?'worker_probe.html':''}`;
  await send('Page.navigate',{url},sessionId);
  const pause=ms=>new Promise(r=>setTimeout(r,ms));
  const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true},sessionId)).result.value;
  if(mode==='worker'){
    let state;
    for(let i=0;i<320;i++){state=await evaluate('document.body?.dataset.status');if(state)break;await pause(50);}
    const text=await evaluate('document.getElementById("result")?.textContent');
    fs.writeFileSync(path.join(output,'browser_worker.json'),text||'null');console.log(text);
    if(state!=='passed')throw Error('Browser worker verification failed');
  }else{
    await pause(2500);
    await evaluate('window.__aiFrames=[];window.__aiLast=performance.now();requestAnimationFrame(function sample(t){window.__aiFrames.push(t-window.__aiLast);window.__aiLast=t;requestAnimationFrame(sample);});');
    await send('Input.dispatchMouseEvent',{type:'mousePressed',x:750,y:500,button:'left',clickCount:1},sessionId);
    for(let i=0;i<30;i++){await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:750-i*8,y:500-i*3,button:'left',buttons:1},sessionId);await pause(16);}
    await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:518,y:413,button:'left',clickCount:1},sessionId);
    await pause(Number(option('--seconds','15'))*1000);
    const targets=(await send('Target.getTargets')).targetInfos;
    const workers=targets.filter(t=>t.type==='worker').map(t=>({id:t.targetId,url:t.url}));
    const metrics=events.filter(e=>e.method==='Runtime.consoleAPICalled').flatMap(e=>e.params.args.map(a=>a.value).filter(v=>typeof v==='string'&&v.startsWith('AI_PROFILE:'))).map(v=>JSON.parse(v.slice(11)));
    const frames=await evaluate('window.__aiFrames');
    const errors=events.filter(e=>e.method==='Runtime.exceptionThrown').map(e=>e.params.exceptionDetails.exception?.description||e.params.exceptionDetails.text);
    const screenshot=await send('Page.captureScreenshot',{format:'png'},sessionId);
    fs.writeFileSync(path.join(output,`browser_${mode}.png`),Buffer.from(screenshot.data,'base64'));
    const requested=events.filter(e=>e.method==='Network.requestWillBeSent').map(e=>e.params.request.url);
    const data={mode,workers,metrics,frames,errors,requested};
    fs.writeFileSync(path.join(output,`browser_${mode}.json`),JSON.stringify(data,null,2));
    console.log(JSON.stringify({mode,workers:data.workers,metrics:metrics.at(-1),frames:frames?.length,errors}));
    if(errors.length||workers.length!==1||!metrics.some(m=>m.accepted>0&&m.commands>0&&m.worker.backend==='web-worker:DedicatedWorkerGlobalScope'))throw Error('Game did not execute real background AI');
  }
  await send('Browser.close').catch(()=>{});
}finally{ws?.close();child.kill();server.close();}
