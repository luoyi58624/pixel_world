"""只读执行十五种切札的原动画脚本，导出共用图集与逐帧坐标；不改写 ROM。"""
import sys, json, hashlib, argparse, struct
from PIL import Image, ImageDraw, ImageChops
from pathlib import Path
sys.path[:0] = ['build/nes_analysis/deps', 'tool']
from py65.devices.mpu6502 import MPU
from extract_nes_battle_art import SHA256, decompress, rgba
from extract_nes_map import _tile

prg=b''

class Memory(list):
    def __init__(self):
        super().__init__([0]*65536)
        self.ppu=bytearray(0x4000)
        self.address=0
        self.high=True
        self.increment=1
        self.actor=-1
        self.owners=[-1]*64
    def __getitem__(self,key):
        if key==0x2002:
            self.high=True
            return 128
        return super().__getitem__(key)
    def __setitem__(self,key,value):
        if isinstance(key,int):
            if key==0x2006:
                self.address=(value<<8) if self.high else ((self.address&0x3f00)|value)
                self.high=not self.high
            elif key==0x2007:
                self.ppu[self.address&0x3fff]=value
                self.address+=self.increment
            elif key==0x2000:
                self.increment=32 if value&4 else 1
            elif 0x300<=key<0x400:
                self.owners[(key-0x300)//4]=self.actor
        super().__setitem__(key,value)

class Run:
    def __init__(self,kind):
        self.mem=Memory()
        self.cpu=MPU(memory=self.mem)
        self.mem[0xc000:]=prg[0x3c000:]
        self.bank(5)
        self.frames=[]
        self.recording=False
        self.kind=kind
        self.visits={}
        self.poses={}
        self.skip_counts={}
        self.stop_at_impact=False
        self.mem[0x75:0x7a]=[0,3,7,10,14]
        self.mem[0x7a:0x7f]=[1,45,128,192,81]
        self.mem[0x244:0x246]=[0,1]
        self.mem[0x7451:0x7453]=[95,95]
        self.mem[0x702f:0x7031]=[4,4]
        self.mem[0x12:0x14]=[80,80]
        self.mem[0x570:0x580]=[128]*10+[0]*6
        self.mem[0xd0:0xd3]=[17,39,71]
        self.mem[0x81]=200
        self.mem[0x83]=16
        self.mem[0x3f]=self.mem[0x40]=0
        self.mem[0x300:0x400]=[240,0,0,0]*64
        pattern_pointer=int.from_bytes(prg[0xa686:0xa688],'little')
        patterns=decompress(prg,pattern_pointer,27*16)
        self.mem.ppu[:len(patterns)]=patterns
        for i,value in enumerate([0,128,192,224,240,248,252,254,255]):
            self.mem.ppu[0x300+i*16:0x310+i*16]=bytes([0]*8+[value]*8)
        nt=[255]*960
        for col in range(4):
            for n,tile in enumerate(prg[0x3ee72:0x3eea2]):nt[(2+n//8)*32+col*8+n%8]=tile
        nt[8*32:18*32]=[0]*320
        nt[18*32:19*32]=[12,13]*16
        nt[19*32:20*32]=[22,23]*16
        self.mem.ppu[0x2000:0x23c0]=bytes(nt)
        self.mem.ppu[0x23c0:0x2400]=decompress(prg,0x3eea2,64)
        colors=list(prg[0x145b4:0x145bc])+list(prg[0x145dc:0x145e4])
        colors[9]=colors[5]
        self.mem[0x6f20:0x6f30]=self.mem[0x6f40:0x6f50]=colors
        for i in range(4):
            self.call(0xeb77,x=i)
        for i,tile in enumerate([0xf9,0xeb,0xec,0xfd]):
            self.mem.ppu[0x17c0+i*16:0x17d0+i*16]=prg[0x146fa+tile*16:0x1470a+tile*16]
        self.call(0xe71c)
        self.call(0xe7ec)
        self.call(0x8000)
        self.mem[0xfe]=30
        self.recording=True
    def bank(self,n):
        self.mem[0x8000:0xc000]=prg[n*0x4000:(n+1)*0x4000]
        self.mem[0xac]=self.mem[0xad]=n
    def flush(self):
        r=self.mem
        data=r[0x31]
        for pos in range(r[0x30],r[0x32],3):
            address=r[0x400+pos]*256+r[0x401+pos]
            count=r[0x402+pos]&127
            inc=32 if r[0x402+pos]&128 else 1
            for _ in range(count):
                r.ppu[address&0x3fff]=r[0x430+data]
                data+=1
                address+=inc
        for addr in [0x30,0x31,0x32,0x33,0x35,0x36]:r[addr]=0
    def frame(self):
        self.flush()
        r=self.mem
        r[0x3b]=(r[0x3b]+1)&255
        r[0x38]=r[0x39]=r[0x3a]=0
        if r[0xa2]:r[0xa2]-=1
        if self.recording:
            self.frames.append({'actors':[list(r[b:b+16]) for b in [0x570,0x580,0x590,0x5c0,0x5d0]],
                'oam':list(r[0x300:0x400]),'owners':r.owners[:], 'ppu':bytes(r.ppu),
                'poses':dict(self.poses), 'kinds':r[0x75:0x7a], 'palette':r[0x6f20:0x6f60], 'scroll':r[0xfc:0x100]})
        if len(self.frames)>3000: raise RuntimeError('too many frames %04x'%self.cpu.pc)
    def ret(self):
        self.cpu.pc=(self.cpu.stPopWord()+1)&65535
    def call(self,pc,a=0,x=0):
        self.cpu.pc,self.cpu.a,self.cpu.x,self.cpu.sp,self.cpu.p=pc,a,x,255,0x30
        self.cpu.stPushWord(0x5fff)
        for budget in range(8000000):
            pc=self.cpu.pc
            if pc==0x6000:return
            if pc in [0xe7f5,0xe8d8]:
                actor=self.mem[0x93]
                self.mem.actor=actor
                self.poses[actor]=(self.mem[0x580+actor],self.mem[0x570+actor],
                    self.mem[0x5c0+actor],self.mem[0x5d0+actor],tuple(self.mem[0x75:0x7a]))
            if pc==0xd6da:
                self.bank(self.cpu.a)
                self.ret()
            elif pc==0xfd4d:
                self.frame();self.ret()
            elif pc==0xd5df:
                if self.mem[0xfe]&24 and self.recording:self.frame()
                else:self.flush()
                self.ret()
            elif pc==0xd15c:
                for _ in range(self.cpu.a): self.frame()
                self.ret()
            elif pc in [0xc81e,0xcf49]:
                self.ret()
            elif pc==0xa92f:
                self.impact=len(self.frames)
                if self.stop_at_impact:return
                self.cpu.step()
            elif pc==0xd5d8:
                self.frame();self.ret()
            else:
                self.visits[pc]=self.visits.get(pc,0)+1
                self.cpu.step()
        raise RuntimeError('budget %04x most=%s'%(self.cpu.pc,sorted(self.visits.items(),key=lambda a:-a[1])[:6]))


def oam_image(frame, indices):
    """按原 OAM 优先级合成一个脚本演员，坐标保留 NES 的裁切偏移。"""
    ppu=frame['ppu']; palette=frame['palette'][16:32]
    entries=[]
    for n in indices:
        y,tile,attr,x=frame['oam'][n*4:n*4+4]
        if y>=239:continue
        bitmap=_tile(ppu[0x1000+tile*16:0x1010+tile*16],
            [(0,0,0,0)]+[rgba(v) for v in palette[(attr&3)*4+1:(attr&3)*4+4]])
        if attr&64:bitmap=bitmap.transpose(Image.FLIP_LEFT_RIGHT)
        if attr&128:bitmap=bitmap.transpose(Image.FLIP_TOP_BOTTOM)
        if bitmap.getbbox():entries.append((n,x,y+1-16,bitmap))
    if not entries:return None
    x=min(e[1] for e in entries);y=min(e[2] for e in entries)
    w=max(e[1]+8 for e in entries)-x;h=max(e[2]+8 for e in entries)-y
    image=Image.new('RGBA',(w,h))
    for _,px,py,tile in sorted(entries,reverse=True,key=lambda e:e[0]):
        image.alpha_composite(tile,(px-x,py-y))
    return image,x,y

class SpriteLibrary:
    def __init__(self):
        self.images=[];self.lookups={};self.renderers={};self.pose_cache={}
    def add(self,image,ox,oy):
        key=(image.size,ox,oy,image.tobytes())
        if key not in self.lookups:
            self.lookups[key]=len(self.images)
            self.images.append((image,ox,oy))
        return self.lookups[key]
    def variant(self,kind,code,flags,palette):
        key=(kind,code&240,flags,tuple(palette))
        if key in self.pose_cache:return self.pose_cache[key]
        if kind not in self.renderers:
            r=Run(0);r.recording=False;r.mem[0x75]=kind;r.call(0xeb77,x=0)
            self.renderers[kind]=r
        r=self.renderers[kind];m=r.mem
        m[0x93]=0;m[0x580]=code&240;m[0x570]=flags
        m[0x5c0]=128;m[0x5d0]=96
        m[0x300:0x400]=[240,0,0,0]*64;m[0x40]=m[0x3f]=0
        m[0x6f30:0x6f40]=palette
        r.call(0xe7f5)
        frame={'ppu':m.ppu,'palette':[0]*16+list(palette),'oam':m[0x300:0x400]}
        result=oam_image(frame,range(64))
        if result is None:raise AssertionError('empty variant '+str(key[:3]))
        img,x,y=result
        index=self.add(img,x-128,y-96)
        self.pose_cache[key]=index
        return index
    def fragment(self,index,regions):
        """原 OAM 环形排序跨越首尾时分段绘制，保留交叠角色的真实优先级。"""
        image,ox,oy=self.images[index]
        mask=Image.new('L',image.size)
        draw=ImageDraw.Draw(mask)
        for x,y in regions:draw.rectangle((x-ox,y-oy,x-ox+7,y-oy+7),fill=255)
        image=image.copy()
        image.putalpha(ImageChops.multiply(image.getchannel('A'),mask))
        box=image.getbbox()
        if box is None:return self.add(Image.new('RGBA',(1,1)),0,0)
        return self.add(image.crop(box),ox+box[0],oy+box[1])

def export(rom_path, output):
    """完整运行原脚本，只跳过由当前 HUD 接管的文字窗口和战役回收回调。"""
    global prg
    original=rom_path.read_bytes()
    if hashlib.sha256(original).hexdigest()!=SHA256:raise ValueError('ROM 版本不匹配')
    prg=original[16:]
    library=SpriteLibrary();poses=[];pose_ids={};clips=[];binary=bytearray(b'NWFX1')
    binary.extend(struct.pack('<B',15))
    evidence=[]
    for effect in range(15):
        run=Run(effect);run.stop_at_impact=True;run.call(0xa901,a=effect)
        frames=run.frames
        backgrounds={f['ppu'][:0x1000]+f['ppu'][0x2000:0x2400] for f in frames}
        if len(backgrounds)!=1:raise AssertionError('unhandled background animation '+str(effect))
        timeline=[]
        for f in frames:
            groups=[];actor_counts={}
            for n in range(64):
                if f['oam'][n*4]<239:
                    actor=f['owners'][n]
                    actor_counts[actor]=actor_counts.get(actor,0)+1
                    if groups and groups[-1][0]==actor:groups[-1][1].append(n)
                    else:groups.append((actor,[n]))
            draws=[]
            for actor,indices in reversed(groups):
                result=oam_image(f,indices)
                if result is None:continue
                image,x,y=result
                code,flags,px,py,kinds=f['poses'].get(actor,(15,128,0,0,(0,3,7,10,14)))
                group=code&15
                native=library.add(image,x-px,y-py)
                variants=[native]
                partial=len(indices)!=actor_counts[actor]
                regions=[(f['oam'][n*4+3]-px,f['oam'][n*4]+1-16-py) for n in indices]
                if group in [0,2]:
                    kind=kinds[group]
                    if kind<14:
                        variants=[library.variant(kind%7,code,flags,f['palette'][16:32]),
                                  library.variant(kind%7+7,code,flags,f['palette'][16:32])]
                        if partial:variants=[library.fragment(i,regions) for i in variants]
                        variants[0 if kind<7 else 1]=native
                elif group in [1,3]:
                    kind=kinds[group]
                    family=[3,4,6,10,11,13]
                    variants=[library.variant(k,code,flags,f['palette'][16:32]) for k in family]
                    if partial:variants=[library.fragment(i,regions) for i in variants]
                    if kind in family:variants[family.index(kind)]=native
                pose=(group,tuple(variants))
                if pose not in pose_ids:
                    pose_ids[pose]=len(poses);poses.append([group,variants])
                draws.append((255 if actor<0 else actor,pose_ids[pose],px,py))
            timeline.append(draws)
        binary.extend(struct.pack('<BH',effect,len(timeline)))
        for frame in timeline:
            binary.append(len(frame))
            for actor,pose,x,y in frame:binary.extend(struct.pack('<BHBB',actor,pose,x,y))
        entry=int.from_bytes(prg[0x16948+effect*2:0x1694a+effect*2],'little')
        evidence.append({'id':effect,'entry':hex(entry),'frames':len(timeline),
                         'seconds':len(timeline)/60,'frameSha256':hashlib.sha256(json.dumps(timeline).encode()).hexdigest()})
        clips.append(timeline)
        print('effect',effect,'frames',len(timeline),'sprites',len(library.images),flush=True)
    width=1024;x=y=height=0;rects=[]
    for image,ox,oy in library.images:
        if x+image.width>width:x=0;y+=height;height=0
        rects.append([x,y,image.width,image.height,ox,oy])
        x+=image.width;height=max(height,image.height)
    atlas=Image.new('RGBA',(width,y+height))
    for (image,_,_),rect in zip(library.images,rects):atlas.alpha_composite(image,(rect[0],rect[1]))
    (output/'assets/images/battle').mkdir(parents=True,exist_ok=True)
    (output/'assets/data').mkdir(parents=True,exist_ok=True)
    (output/'docs').mkdir(parents=True,exist_ok=True)
    atlas.save(output/'assets/images/battle/weapon_effects.png')
    (output/'assets/data/weapon_animations.bin').write_bytes(binary)
    (output/'assets/data/weapon_animations.json').write_text(json.dumps(
        {'version':1,'sourceSha256':SHA256,'fps':60,'sprites':rects,'poses':poses,'clips':evidence},
        separators=(',',':'))+'\n',encoding='utf8')
    # 保留用户可修改的价格和伤害，只更新与这份原动画绑定的帧数。
    catalog_path=output/'assets/data/rom_weapons.json'
    if catalog_path.exists():
        catalog=json.loads(catalog_path.read_text(encoding='utf8'))
        for row in catalog['weapons']:
            row['animationFrames']=evidence[row['effectId']]['frames']
        catalog_path.write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    (output/'docs/nes_weapon_animation_evidence.json').write_text(json.dumps(
        {'sourceSha256':SHA256,'scriptDispatcher':'bank5 A945 / fixed EF39',
         'vblank':'FD4D','spriteCallback':'E7F5','damageAfterAnimation':'A92F -> E40C',
         'coordinateCropTop':16,'clips':evidence,'sprites':len(rects),'binaryBytes':len(binary)},
         ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    assert rom_path.read_bytes()==original
    print('atlas',atlas.size,'poses',len(poses),'bytes',len(binary),flush=True)

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('rom',type=Path)
    parser.add_argument('--output',type=Path,default=Path('.'))
    args=parser.parse_args()
    export(args.rom,args.output)

if __name__=='__main__':main()
