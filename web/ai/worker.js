(function dartProgram(){function copyProperties(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
b[q]=a[q]}}function mixinPropertiesHard(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
if(!b.hasOwnProperty(q)){b[q]=a[q]}}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var s=function(){}
s.prototype={p:{}}
var r=new s()
if(!(Object.getPrototypeOf(r)&&Object.getPrototypeOf(r).p===s.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var q=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(q))return true}}catch(p){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var s=Object.create(b.prototype)
copyProperties(a.prototype,s)
a.prototype=s}}function inheritMany(a,b){for(var s=0;s<b.length;s++){inherit(b[s],a)}}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazy(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){a[b]=d()}a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){var r=d()
if(a[b]!==s){A.o_(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.c(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.k8(b)
return new s(c,this)}:function(){if(s===null)s=A.k8(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.k8(a).prototype
return s}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number"){h+=x}return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var s=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var r=staticTearOffGetter(s)
a[b]=r}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var s=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var r=instanceTearOffGetter(c,s)
a[b]=r}function setOrUpdateInterceptorsByTag(a){var s=v.interceptorsByTag
if(!s){v.interceptorsByTag=a
return}copyProperties(a,s)}function setOrUpdateLeafTags(a){var s=v.leafTags
if(!s){v.leafTags=a
return}copyProperties(a,s)}function updateTypes(a){var s=v.types
var r=s.length
s.push.apply(s,a)
return r}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var s=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},r=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:s(0,0,null,["$0"],0),_instance_1u:s(0,1,null,["$1"],0),_instance_2u:s(0,2,null,["$2"],0),_instance_0i:s(1,0,null,["$0"],0),_instance_1i:s(1,1,null,["$1"],0),_instance_2i:s(1,2,null,["$2"],0),_static_0:r(0,null,["$0"],0),_static_1:r(1,null,["$1"],0),_static_2:r(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={
kd(a,b,c,d){return{i:a,p:b,e:c,x:d}},
k9(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.kb==null){A.nN()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.i(A.kK("Return interceptor for "+A.t(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.jb
if(o==null)o=$.jb=A.jz(n)
p=q[o]}if(p!=null)return p
p=A.nT(a)
if(p!=null)return p
if(typeof a=="function")return B.ah
s=Object.getPrototypeOf(a)
if(s==null)return B.N
if(s===Object.prototype)return B.N
if(typeof q=="function"){o=$.jb
if(o==null)o=$.jb=A.jz(n)
Object.defineProperty(q,o,{value:B.B,enumerable:false,writable:true,configurable:true})
return B.B}return B.B},
m2(a,b){if(a<0||a>4294967295)throw A.i(A.aQ(a,0,4294967295,"length",null))
return J.m3(new Array(a),b)},
kx(a,b){if(a<0)throw A.i(A.cY("Length must be a non-negative integer: "+a,null))
return A.c(new Array(a),b.h("r<0>"))},
m3(a,b){var s=A.c(a,b.h("r<0>"))
s.$flags=1
return s},
m4(a,b){var s=t.e8
return J.kj(s.a(a),s.a(b))},
bw(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.c8.prototype
return J.dd.prototype}if(typeof a=="string")return J.bk.prototype
if(a==null)return J.c9.prototype
if(typeof a=="boolean")return J.dc.prototype
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b3.prototype
if(typeof a=="symbol")return J.cc.prototype
if(typeof a=="bigint")return J.ca.prototype
return a}if(a instanceof A.C)return a
return J.k9(a)},
aH(a){if(typeof a=="string")return J.bk.prototype
if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b3.prototype
if(typeof a=="symbol")return J.cc.prototype
if(typeof a=="bigint")return J.ca.prototype
return a}if(a instanceof A.C)return a
return J.k9(a)},
ao(a){if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b3.prototype
if(typeof a=="symbol")return J.cc.prototype
if(typeof a=="bigint")return J.ca.prototype
return a}if(a instanceof A.C)return a
return J.k9(a)},
nI(a){if(typeof a=="number")return J.bB.prototype
if(typeof a=="string")return J.bk.prototype
if(a==null)return a
if(!(a instanceof A.C))return J.bH.prototype
return a},
aE(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bw(a).aj(a,b)},
ar(a,b){if(typeof b==="number")if(Array.isArray(a)||A.nS(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.ao(a).i(a,b)},
ly(a,b,c){return J.ao(a).A(a,b,c)},
kh(a,b){return J.ao(a).l(a,b)},
ki(a,b){return J.ao(a).aV(a,b)},
kj(a,b){return J.nI(a).t(a,b)},
cV(a,b){return J.ao(a).N(a,b)},
cW(a){return J.ao(a).gF(a)},
aj(a){return J.bw(a).gT(a)},
dO(a){return J.aH(a).gO(a)},
kk(a){return J.aH(a).gaa(a)},
A(a){return J.ao(a).gB(a)},
jM(a){return J.ao(a).gU(a)},
N(a){return J.aH(a).gk(a)},
lz(a){return J.bw(a).gV(a)},
lA(a,b){return J.aH(a).sk(a,b)},
dP(a,b){return J.ao(a).a3(a,b)},
lB(a,b){return J.ao(a).cn(a,b)},
aZ(a){return J.bw(a).q(a)},
da:function da(){},
dc:function dc(){},
c9:function c9(){},
cb:function cb(){},
b4:function b4(){},
dr:function dr(){},
bH:function bH(){},
b3:function b3(){},
ca:function ca(){},
cc:function cc(){},
r:function r(a){this.$ti=a},
db:function db(){},
ht:function ht(a){this.$ti=a},
bf:function bf(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bB:function bB(){},
c8:function c8(){},
dd:function dd(){},
bk:function bk(){}},A={jR:function jR(){},
ku(a,b,c){if(t.Q.b(a))return new A.cA(a,b.h("@<0>").I(c).h("cA<1,2>"))
return new A.bg(a,b.h("@<0>").I(c).h("bg<1,2>"))},
m5(a){return new A.ce("Field '"+a+"' has not been initialized.")},
aS(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
iL(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
W(a,b,c){return a},
kc(a){var s,r
for(s=$.an.length,r=0;r<s;++r)if(a===$.an[r])return!0
return!1},
R(a,b,c,d){A.aR(b,"start")
if(c!=null){A.aR(c,"end")
if(b>c)A.aC(A.aQ(b,0,c,"start",null))}return new A.y(a,b,c,d.h("y<0>"))},
m8(a,b,c,d){if(t.Q.b(a))return new A.c0(a,b,c.h("@<0>").I(d).h("c0<1,2>"))
return new A.bn(a,b,c.h("@<0>").I(d).h("bn<1,2>"))},
kI(a,b,c){var s="takeCount"
A.kp(b,s,t.S)
A.aR(b,s)
if(t.Q.b(a))return new A.c1(a,b,c.h("c1<0>"))
return new A.bo(a,b,c.h("bo<0>"))},
kG(a,b,c){if(t.Q.b(a)){A.cS(b)
return void 1}A.cS(b)
return void 1},
cS(a){A.kp(a,"count",t.S)
A.aR(a,"count")
return a},
lY(a,b,c){return new A.c_(a,b,c.h("c_<0>"))},
a0(){return new A.cu("No element")},
b6:function b6(){},
bV:function bV(a,b){this.a=a
this.$ti=b},
bg:function bg(a,b){this.a=a
this.$ti=b},
cA:function cA(a,b){this.a=a
this.$ti=b},
cz:function cz(){},
aK:function aK(a,b){this.a=a
this.$ti=b},
ce:function ce(a){this.a=a},
iF:function iF(){},
m:function m(){},
l:function l(){},
y:function y(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
p:function p(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bn:function bn(a,b,c){this.a=a
this.b=b
this.$ti=c},
c0:function c0(a,b,c){this.a=a
this.b=b
this.$ti=c},
ch:function ch(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
O:function O(a,b,c){this.a=a
this.b=b
this.$ti=c},
d:function d(a,b,c){this.a=a
this.b=b
this.$ti=c},
V:function V(a,b,c){this.a=a
this.b=b
this.$ti=c},
c5:function c5(a,b,c){this.a=a
this.b=b
this.$ti=c},
c6:function c6(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
bo:function bo(a,b,c){this.a=a
this.b=b
this.$ti=c},
c1:function c1(a,b,c){this.a=a
this.b=b
this.$ti=c},
bp:function bp(a,b,c){this.a=a
this.b=b
this.$ti=c},
cr:function cr(a,b,c){this.a=a
this.b=b
this.$ti=c},
hq:function hq(a,b,c){this.a=a
this.b=b
this.$ti=c},
cs:function cs(a,b,c){this.a=a
this.b=b
this.$ti=c},
c2:function c2(a){this.$ti=a},
c3:function c3(a){this.$ti=a},
cx:function cx(a,b){this.a=a
this.$ti=b},
cy:function cy(a,b){this.a=a
this.$ti=b},
c7:function c7(a,b,c){this.a=a
this.b=b
this.$ti=c},
c_:function c_(a,b,c){this.a=a
this.b=b
this.$ti=c},
bj:function bj(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.$ti=c},
J:function J(){},
K:function K(a,b){this.a=a
this.$ti=b},
cQ:function cQ(){},
jO(a,b,c){var s,r,q,p,o,n,m,l=A.k(a),k=A.cg(new A.aa(a,l.h("aa<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.z)(k),++i,p=o){r=k[i]
c.a(a.i(0,r))
o=p+1
q[r]=p}n=A.cg(new A.T(a,l.h("T<2>")),!0,c)
m=new A.bZ(q,n,b.h("@<0>").I(c).h("bZ<1,2>"))
m.$keys=k
return m}return new A.bY(A.ai(a,b,c),b.h("@<0>").I(c).h("bY<1,2>"))},
ll(a){var s=A.lk(a)
if(s!=null)return s
return"minified:"+a},
nS(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
t(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.aZ(a)
return s},
ds(a){var s,r=$.kC
if(r==null)r=$.kC=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
md(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.w(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
dt(a){var s,r,q,p
if(a instanceof A.C)return A.ae(A.aI(a),null)
s=J.bw(a)
if(s===B.ag||s===B.ai||t.ak.b(a)){r=B.I(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.ae(A.aI(a),null)},
kD(a){var s,r,q
if(a==null||typeof a=="number"||A.k3(a))return J.aZ(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a9)return a.q(0)
if(a instanceof A.az)return a.bY(!0)
s=$.lx()
for(r=0;r<1;++r){q=s[r].dM(a)
if(q!=null)return q}return"Instance of '"+A.dt(a)+"'"},
ma(){return Date.now()},
mc(){var s,r
if($.hX!==0)return
$.hX=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
if(!!s.dartUseDateNowForTicks)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.hX=1e6
$.hY=new A.hW(r)},
a5(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.bT(s,10)|55296)>>>0,s&1023|56320)}throw A.i(A.aQ(a,0,1114111,null,null))},
mb(a){var s=a.$thrownJsError
if(s==null)return null
return A.bS(s)},
w(a,b){if(a==null)J.N(a)
throw A.i(A.jx(a,b))},
jx(a,b){var s,r="index"
if(!A.jq(b))return new A.aF(!0,b,r,null)
s=J.N(a)
if(b<0||b>=s)return A.hs(b,s,a,r)
return new A.cp(null,null,!0,b,r,"Value not in range")},
ny(a){return new A.aF(!0,a,null,null)},
jv(a){return a},
i(a){return A.Z(a,new Error())},
Z(a,b){var s
if(a==null)a=new A.aT()
b.dartException=a
s=A.o0
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
o0(){return J.aZ(this.dartException)},
aC(a,b){throw A.Z(a,b==null?new Error():b)},
bc(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.aC(A.mW(a,b,c),s)},
mW(a,b,c){var s,r,q,p,o,n,m,l,k
if(typeof b=="string")s=b
else{r="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
q=r.length
p=b
if(p>q){c=p/q|0
p%=q}s=r[p]}o=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
n=t.j.b(a)?"list":"ByteData"
m=a.$flags|0
l="a "
if((m&4)!==0)k="constant "
else if((m&2)!==0){k="unmodifiable "
l="an "}else k=(m&1)!==0?"fixed-length ":""
return new A.cw("'"+s+"': Cannot "+o+" "+l+k+n)},
z(a){throw A.i(A.a3(a))},
aU(a){var s,r,q,p,o,n
a=A.nY(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.c([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.iU(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
iV(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
kJ(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
jS(a,b){var s=b==null,r=s?null:b.method
return new A.de(a,r,s?null:b.receiver)},
aY(a){var s
if(a==null)return new A.hD(a)
if(a instanceof A.c4){s=a.a
return A.bb(a,s==null?A.cR(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.bb(a,a.dartException)
return A.nw(a)},
bb(a,b){if(t.U.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
nw(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bT(r,16)&8191)===10)switch(q){case 438:return A.bb(a,A.jS(A.t(s)+" (Error "+q+")",null))
case 445:case 5007:A.t(s)
return A.bb(a,new A.cm())}}if(a instanceof TypeError){p=$.ln()
o=$.lo()
n=$.lp()
m=$.lq()
l=$.lt()
k=$.lu()
j=$.ls()
$.lr()
i=$.lw()
h=$.lv()
g=p.ag(s)
if(g!=null)return A.bb(a,A.jS(A.L(s),g))
else{g=o.ag(s)
if(g!=null){g.method="call"
return A.bb(a,A.jS(A.L(s),g))}else if(n.ag(s)!=null||m.ag(s)!=null||l.ag(s)!=null||k.ag(s)!=null||j.ag(s)!=null||m.ag(s)!=null||i.ag(s)!=null||h.ag(s)!=null){A.L(s)
return A.bb(a,new A.cm())}}return A.bb(a,new A.dy(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.ct()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.bb(a,new A.aF(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.ct()
return a},
bS(a){var s
if(a instanceof A.c4)return a.b
if(a==null)return new A.cJ(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.cJ(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
lg(a){if(a==null)return J.aj(a)
if(typeof a=="object")return A.ds(a)
return J.aj(a)},
nG(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.A(0,a[s],a[r])}return b},
nH(a,b){var s,r=a.length
for(s=0;s<r;++s)b.l(0,a[s])
return b},
n5(a,b,c,d,e,f){t.h.a(a)
switch(A.h(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.i(new A.j_("Unsupported number of arguments for wrapped closure"))},
dM(a,b){var s=a.$identity
if(!!s)return s
s=A.nC(a,b)
a.$identity=s
return s},
nC(a,b){var s
switch(b){case 0:s=a.$0
break
case 1:s=a.$1
break
case 2:s=a.$2
break
case 3:s=a.$3
break
case 4:s=a.$4
break
default:s=null}if(s!=null)return s.bind(a)
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.n5)},
lP(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.dv().constructor.prototype):Object.create(new A.bz(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.kv(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.lL(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.kv(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
lL(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.i("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.lJ)}throw A.i("Error in functionType of tearoff")},
lM(a,b,c,d){var s=A.kt
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
kv(a,b,c,d){if(c)return A.lO(a,b,d)
return A.lM(b.length,d,a,b)},
lN(a,b,c,d){var s=A.kt,r=A.lK
switch(b?-1:a){case 0:throw A.i(new A.du("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
lO(a,b,c){var s,r
if($.kr==null)$.kr=A.kq("interceptor")
if($.ks==null)$.ks=A.kq("receiver")
s=b.length
r=A.lN(s,c,a,b)
return r},
k8(a){return A.lP(a)},
lJ(a,b){return A.cN(v.typeUniverse,A.aI(a.a),b)},
kt(a){return a.a},
lK(a){return a.b},
kq(a){var s,r,q,p=new A.bz("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.i(A.cY("Field name "+a+" not found.",null))},
jz(a){return v.getIsolateTag(a)},
nT(a){var s,r,q,p,o,n=A.L($.la.$1(a)),m=$.jy[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jD[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bN($.l6.$2(a,n))
if(q!=null){m=$.jy[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jD[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.jG(s)
$.jy[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.jD[n]=s
return s}if(p==="-"){o=A.jG(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.li(a,s)
if(p==="*")throw A.i(A.kK(n))
if(v.leafTags[n]===true){o=A.jG(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.li(a,s)},
li(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.kd(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
jG(a){return J.kd(a,!1,null,!!a.$iak)},
nV(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.jG(s)
else return J.kd(s,c,null,null)},
nN(){if(!0===$.kb)return
$.kb=!0
A.nO()},
nO(){var s,r,q,p,o,n,m,l
$.jy=Object.create(null)
$.jD=Object.create(null)
A.nM()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.lj.$1(o)
if(n!=null){m=A.nV(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
nM(){var s,r,q,p,o,n,m=B.W()
m=A.bQ(B.X,A.bQ(B.Y,A.bQ(B.J,A.bQ(B.J,A.bQ(B.Z,A.bQ(B.a_,A.bQ(B.a0(B.I),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.la=new A.jA(p)
$.l6=new A.jB(o)
$.lj=new A.jC(n)},
bQ(a,b){return a(b)||b},
mA(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.w(b,s)
if(!J.aE(r,b[s]))return!1}return!0},
nE(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
nY(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
aG:function aG(a,b){this.a=a
this.b=b},
cH:function cH(a,b){this.a=a
this.b=b},
bv:function bv(a,b){this.a=a
this.b=b},
aA:function aA(a){this.a=a},
bY:function bY(a,b){this.a=a
this.$ti=b},
bX:function bX(){},
bZ:function bZ(a,b,c){this.a=a
this.b=b
this.$ti=c},
cB:function cB(a,b){this.a=a
this.$ti=b},
cC:function cC(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
d9:function d9(){},
aM:function aM(a,b){this.a=a
this.$ti=b},
hW:function hW(a){this.a=a},
cq:function cq(){},
iU:function iU(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
cm:function cm(){},
de:function de(a,b,c){this.a=a
this.b=b
this.c=c},
dy:function dy(a){this.a=a},
hD:function hD(a){this.a=a},
c4:function c4(a,b){this.a=a
this.b=b},
cJ:function cJ(a){this.a=a
this.b=null},
a9:function a9(){},
d0:function d0(){},
d1:function d1(){},
dw:function dw(){},
dv:function dv(){},
bz:function bz(a,b){this.a=a
this.b=b},
du:function du(a){this.a=a},
aN:function aN(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hu:function hu(a){this.a=a},
hy:function hy(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
aa:function aa(a,b){this.a=a
this.$ti=b},
bl:function bl(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
T:function T(a,b){this.a=a
this.$ti=b},
al:function al(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aO:function aO(a,b){this.a=a
this.$ti=b},
cf:function cf(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
jA:function jA(a){this.a=a},
jB:function jB(a){this.a=a},
jC:function jC(a){this.a=a},
az:function az(){},
b7:function b7(){},
bJ:function bJ(){},
mX(a){return a},
aW(a,b,c){if(a>>>0!==a||a>=c)throw A.i(A.jx(b,a))},
bD:function bD(){},
ck:function ck(){},
dg:function dg(){},
bE:function bE(){},
ci:function ci(){},
cj:function cj(){},
dh:function dh(){},
di:function di(){},
dj:function dj(){},
dk:function dk(){},
dl:function dl(){},
dm:function dm(){},
dn:function dn(){},
cl:function cl(){},
dp:function dp(){},
cD:function cD(){},
cE:function cE(){},
cF:function cF(){},
cG:function cG(){},
jW(a,b){var s=b.c
return s==null?b.c=A.cL(a,"b1",[b.x]):s},
kE(a){var s=a.w
if(s===6||s===7)return A.kE(a.x)
return s===11||s===12},
mf(a){return a.as},
nX(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
bR(a){return A.jk(v.typeUniverse,a,!1)},
nQ(a,b){var s,r,q,p,o
if(a==null)return null
s=b.y
r=a.Q
if(r==null)r=a.Q=new Map()
q=b.as
p=r.get(q)
if(p!=null)return p
o=A.ba(v.typeUniverse,a.x,s,0)
r.set(q,o)
return o},
ba(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.ba(a1,s,a3,a4)
if(r===s)return a2
return A.kT(a1,r,!0)
case 7:s=a2.x
r=A.ba(a1,s,a3,a4)
if(r===s)return a2
return A.kS(a1,r,!0)
case 8:q=a2.y
p=A.bP(a1,q,a3,a4)
if(p===q)return a2
return A.cL(a1,a2.x,p)
case 9:o=a2.x
n=A.ba(a1,o,a3,a4)
m=a2.y
l=A.bP(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.k0(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bP(a1,j,a3,a4)
if(i===j)return a2
return A.kU(a1,k,i)
case 11:h=a2.x
g=A.ba(a1,h,a3,a4)
f=a2.y
e=A.nt(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.kR(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bP(a1,d,a3,a4)
o=a2.x
n=A.ba(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.k1(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.i(A.d_("Attempted to substitute unexpected RTI kind "+a0))}},
bP(a,b,c,d){var s,r,q,p,o=b.length,n=A.jl(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.ba(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
nu(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.jl(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.ba(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
nt(a,b,c,d){var s,r=b.a,q=A.bP(a,r,c,d),p=b.b,o=A.bP(a,p,c,d),n=b.c,m=A.nu(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dD()
s.a=q
s.b=o
s.c=m
return s},
c(a,b){a[v.arrayRti]=b
return a},
jw(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.nK(s)
return a.$S()}return null},
nP(a,b){var s
if(A.kE(b))if(a instanceof A.a9){s=A.jw(a)
if(s!=null)return s}return A.aI(a)},
aI(a){if(a instanceof A.C)return A.k(a)
if(Array.isArray(a))return A.f(a)
return A.k2(J.bw(a))},
f(a){var s=a[v.arrayRti],r=t.V
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
k(a){var s=a.$ti
return s!=null?s:A.k2(a)},
k2(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.n3(a,s)},
n3(a,b){var s=a instanceof A.a9?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.mK(v.typeUniverse,s.name)
b.$ccache=r
return r},
nK(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.jk(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
nJ(a){return A.aX(A.k(a))},
ka(a){var s=A.jw(a)
return A.aX(s==null?A.aI(a):s)},
k6(a){var s
if(a instanceof A.az)return A.nF(a.$r,a.bf())
s=a instanceof A.a9?A.jw(a):null
if(s!=null)return s
if(t.dm.b(a))return J.lz(a).a
if(Array.isArray(a))return A.f(a)
return A.aI(a)},
aX(a){var s=a.r
return s==null?a.r=new A.jj(a):s},
nF(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bY
if(0>=p)return A.w(q,0)
s=A.cN(v.typeUniverse,A.k6(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.w(q,r)
s=A.kW(v.typeUniverse,s,A.k6(q[r]))}return A.cN(v.typeUniverse,s,a)},
aD(a){return A.aX(A.jk(v.typeUniverse,a,!1))},
n2(a){var s=this
s.b=A.nr(s)
return s.b(a)},
nr(a){var s,r,q,p,o
if(a===t.K)return A.nb
if(A.bx(a))return A.nf
s=a.w
if(s===6)return A.n0
if(s===1)return A.l2
if(s===7)return A.n6
r=A.nq(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bx)){a.f="$i"+q
if(q==="q")return A.n9
if(a===t.p)return A.n8
return A.ne}}else if(s===10){p=A.nE(a.x,a.y)
o=p==null?A.l2:p
return o==null?A.cR(o):o}return A.mZ},
nq(a){if(a.w===8){if(a===t.S)return A.jq
if(a===t.i||a===t.H)return A.na
if(a===t.N)return A.nd
if(a===t.y)return A.k3}return null},
n1(a){var s=this,r=A.mY
if(A.bx(s))r=A.mO
else if(s===t.K)r=A.cR
else if(A.bU(s)){r=A.n_
if(s===t.h6)r=A.X
else if(s===t.dk)r=A.bN
else if(s===t.fQ)r=A.bM
else if(s===t.cg)r=A.a2
else if(s===t.cD)r=A.mM
else if(s===t.an)r=A.mN}else if(s===t.S)r=A.h
else if(s===t.N)r=A.L
else if(s===t.y)r=A.b9
else if(s===t.H)r=A.u
else if(s===t.i)r=A.am
else if(s===t.p)r=A.jm
s.a=r
return s.a(a)},
mZ(a){var s=this
if(a==null)return A.bU(s)
return A.lc(v.typeUniverse,A.nP(a,s),s)},
n0(a){if(a==null)return!0
return this.x.b(a)},
ne(a){var s,r=this
if(a==null)return A.bU(r)
s=r.f
if(a instanceof A.C)return!!a[s]
return!!J.bw(a)[s]},
n9(a){var s,r=this
if(a==null)return A.bU(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.C)return!!a[s]
return!!J.bw(a)[s]},
n8(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.C)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
l1(a){if(typeof a=="object"){if(a instanceof A.C)return t.p.b(a)
return!0}if(typeof a=="function")return!0
return!1},
mY(a){var s=this
if(a==null){if(A.bU(s))return a}else if(s.b(a))return a
throw A.Z(A.kZ(a,s),new Error())},
n_(a){var s=this
if(a==null||s.b(a))return a
throw A.Z(A.kZ(a,s),new Error())},
kZ(a,b){return new A.bK("TypeError: "+A.kM(a,A.ae(b,null)))},
l9(a,b,c,d){if(A.lc(v.typeUniverse,a,b))return a
throw A.Z(A.mC("The type argument '"+A.ae(a,null)+"' is not a subtype of the type variable bound '"+A.ae(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
kM(a,b){return A.d6(a)+": type '"+A.ae(A.k6(a),null)+"' is not a subtype of type '"+b+"'"},
mC(a){return new A.bK("TypeError: "+a)},
aq(a,b){return new A.bK("TypeError: "+A.kM(a,b))},
n6(a){var s=this
return s.x.b(a)||A.jW(v.typeUniverse,s).b(a)},
nb(a){return a!=null},
cR(a){if(a!=null)return a
throw A.Z(A.aq(a,"Object"),new Error())},
nf(a){return!0},
mO(a){return a},
l2(a){return!1},
k3(a){return!0===a||!1===a},
b9(a){if(!0===a)return!0
if(!1===a)return!1
throw A.Z(A.aq(a,"bool"),new Error())},
bM(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.Z(A.aq(a,"bool?"),new Error())},
am(a){if(typeof a=="number")return a
throw A.Z(A.aq(a,"double"),new Error())},
mM(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Z(A.aq(a,"double?"),new Error())},
jq(a){return typeof a=="number"&&Math.floor(a)===a},
h(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.Z(A.aq(a,"int"),new Error())},
X(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.Z(A.aq(a,"int?"),new Error())},
na(a){return typeof a=="number"},
u(a){if(typeof a=="number")return a
throw A.Z(A.aq(a,"num"),new Error())},
a2(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Z(A.aq(a,"num?"),new Error())},
nd(a){return typeof a=="string"},
L(a){if(typeof a=="string")return a
throw A.Z(A.aq(a,"String"),new Error())},
bN(a){if(typeof a=="string")return a
if(a==null)return a
throw A.Z(A.aq(a,"String?"),new Error())},
jm(a){if(A.l1(a))return a
throw A.Z(A.aq(a,"JSObject"),new Error())},
mN(a){if(a==null)return a
if(A.l1(a))return a
throw A.Z(A.aq(a,"JSObject?"),new Error())},
l4(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.ae(a[q],b)
return s},
nl(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.l4(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.ae(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
l_(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.c([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.l(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.w(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.ae(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.ae(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.ae(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.ae(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.ae(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
ae(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.ae(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.ae(a.x,b)+">"
if(l===8){p=A.nv(a.x)
o=a.y
return o.length>0?p+("<"+A.l4(o,b)+">"):p}if(l===10)return A.nl(a,b)
if(l===11)return A.l_(a,b,null)
if(l===12)return A.l_(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.w(b,n)
return b[n]}return"?"},
nv(a){var s=A.lk(a)
if(s!=null)return s
return"minified:"+a},
mL(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
mK(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.jk(a,b,!1)
else if(typeof m=="number"){s=m
r=A.cM(a,5,"#")
q=A.jl(s)
for(p=0;p<s;++p)q[p]=r
o=A.cL(a,b,q)
n[b]=o
return o}else return m},
mJ(a,b){return A.kX(a.tR,b)},
mI(a,b){return A.kX(a.eT,b)},
jk(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.kV(a,null,b,!1)
r.set(b,s)
return s},
cN(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.kV(a,b,c,!0)
q.set(c,r)
return r},
kW(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.k0(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
kV(a,b,c,d){return A.my(A.ms(a,b,c,d))},
b8(a,b){b.a=A.n1
b.b=A.n2
return b},
cM(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.aw(null,null)
s.w=b
s.as=c
r=A.b8(a,s)
a.eC.set(c,r)
return r},
kT(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.mG(a,b,r,c)
a.eC.set(r,s)
return s},
mG(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bx(b))if(!(b===t.P||b===t.v))if(s!==6)r=s===7&&A.bU(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.aw(null,null)
q.w=6
q.x=b
q.as=c
return A.b8(a,q)},
kS(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.mE(a,b,r,c)
a.eC.set(r,s)
return s},
mE(a,b,c,d){var s,r
if(d){s=b.w
if(A.bx(b)||b===t.K)return b
else if(s===1)return A.cL(a,"b1",[b])
else if(b===t.P||b===t.v)return t.eH}r=new A.aw(null,null)
r.w=7
r.x=b
r.as=c
return A.b8(a,r)},
mH(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.aw(null,null)
s.w=13
s.x=b
s.as=q
r=A.b8(a,s)
a.eC.set(q,r)
return r},
cK(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
mD(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
cL(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.cK(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.aw(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.b8(a,r)
a.eC.set(p,q)
return q},
k0(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.cK(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.aw(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.b8(a,o)
a.eC.set(q,n)
return n},
kU(a,b,c){var s,r,q="+"+(b+"("+A.cK(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.aw(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.b8(a,s)
a.eC.set(q,r)
return r},
kR(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.cK(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.cK(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.mD(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.aw(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.b8(a,p)
a.eC.set(r,o)
return o},
k1(a,b,c,d){var s,r=b.as+("<"+A.cK(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.mF(a,b,c,r,d)
a.eC.set(r,s)
return s},
mF(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.jl(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.ba(a,b,r,0)
m=A.bP(a,c,r,0)
return A.k1(a,n,m,c!==m)}}l=new A.aw(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.b8(a,l)},
ms(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
my(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.mu(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.kO(a,r,l,k,!1)
else if(q===46)r=A.kO(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bu(a.u,a.e,k.pop()))
break
case 94:k.push(A.mH(a.u,k.pop()))
break
case 35:k.push(A.cM(a.u,5,"#"))
break
case 64:k.push(A.cM(a.u,2,"@"))
break
case 126:k.push(A.cM(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.mw(a,k)
break
case 38:A.mv(a,k)
break
case 63:p=a.u
k.push(A.kT(p,A.bu(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.kS(p,A.bu(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.mt(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.kP(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.mz(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-2)
break
case 43:n=l.indexOf("(",r)
k.push(l.substring(r,n))
k.push(-4)
k.push(a.p)
a.p=k.length
r=n+1
break
default:throw"Bad character "+q}}}m=k.pop()
return A.bu(a.u,a.e,m)},
mu(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
kO(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.mL(s,o.x)[p]
if(n==null)A.aC('No "'+p+'" in "'+A.mf(o)+'"')
d.push(A.cN(s,o,n))}else d.push(p)
return m},
mw(a,b){var s,r=a.u,q=A.kN(a,b),p=b.pop()
if(typeof p=="string")b.push(A.cL(r,p,q))
else{s=A.bu(r,a.e,p)
switch(s.w){case 11:b.push(A.k1(r,s,q,a.n))
break
default:b.push(A.k0(r,s,q))
break}}},
mt(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.kN(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bu(p,a.e,o)
q=new A.dD()
q.a=s
q.b=n
q.c=m
b.push(A.kR(p,r,q))
return
case-4:b.push(A.kU(p,b.pop(),s))
return
default:throw A.i(A.d_("Unexpected state under `()`: "+A.t(o)))}},
mv(a,b){var s=b.pop()
if(0===s){b.push(A.cM(a.u,1,"0&"))
return}if(1===s){b.push(A.cM(a.u,4,"1&"))
return}throw A.i(A.d_("Unexpected extended operation "+A.t(s)))},
kN(a,b){var s=b.splice(a.p)
A.kP(a.u,a.e,s)
a.p=b.pop()
return s},
bu(a,b,c){if(typeof c=="string")return A.cL(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.mx(a,b,c)}else return c},
kP(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bu(a,b,c[s])},
mz(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bu(a,b,c[s])},
mx(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.i(A.d_("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.i(A.d_("Bad index "+c+" for "+b.q(0)))},
lc(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.Y(a,b,null,c,null)
r.set(c,s)}return s},
Y(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bx(d))return!0
s=b.w
if(s===4)return!0
if(A.bx(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.Y(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.v){if(q===7)return A.Y(a,b,c,d.x,e)
return d===p||d===t.v||q===6}if(d===t.K){if(s===7)return A.Y(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.Y(a,b.x,c,d,e))return!1
return A.Y(a,A.jW(a,b),c,d,e)}if(s===6)return A.Y(a,p,c,d,e)&&A.Y(a,b.x,c,d,e)
if(q===7){if(A.Y(a,b,c,d.x,e))return!0
return A.Y(a,b,c,A.jW(a,d),e)}if(q===6)return A.Y(a,b,c,p,e)||A.Y(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.h)return!0
o=s===10
if(o&&d===t.gT)return!0
if(q===12){if(b===t.cj)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.Y(a,j,c,i,e)||!A.Y(a,i,e,j,c))return!1}return A.l0(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.l0(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.n7(a,b,c,d,e)}if(o&&q===10)return A.nc(a,b,c,d,e)
return!1},
l0(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.Y(a3,a4.x,a5,a6.x,a7))return!1
s=a4.y
r=a6.y
q=s.a
p=r.a
o=q.length
n=p.length
if(o>n)return!1
m=n-o
l=s.b
k=r.b
j=l.length
i=k.length
if(o+j<n+i)return!1
for(h=0;h<o;++h){g=q[h]
if(!A.Y(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.Y(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.Y(a3,k[h],a7,g,a5))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.Y(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
n7(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.cN(a,b,r[o])
return A.kY(a,p,null,c,d.y,e)}return A.kY(a,b.y,null,c,d.y,e)},
kY(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.Y(a,b[s],d,e[s],f))return!1
return!0},
nc(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.Y(a,r[s],c,q[s],e))return!1
return!0},
bU(a){var s=a.w,r=!0
if(!(a===t.P||a===t.v))if(!A.bx(a))if(s!==6)r=s===7&&A.bU(a.x)
return r},
bx(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
kX(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
jl(a){return a>0?new Array(a):v.typeUniverse.sEA},
aw:function aw(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dD:function dD(){this.c=this.b=this.a=null},
jj:function jj(a){this.a=a},
dC:function dC(){},
bK:function bK(a){this.a=a},
mm(){var s,r,q
if(self.scheduleImmediate!=null)return A.nz()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.dM(new A.iX(s),1)).observe(r,{childList:true})
return new A.iW(s,r,q)}else if(self.setImmediate!=null)return A.nA()
return A.nB()},
mn(a){self.scheduleImmediate(A.dM(new A.iY(t.M.a(a)),0))},
mo(a){self.setImmediate(A.dM(new A.iZ(t.M.a(a)),0))},
mp(a){A.jY(B.G,t.M.a(a))},
jY(a,b){return A.mB(0,b)},
mB(a,b){var s=new A.jh()
s.cE(a,b)
return s},
ni(a){return new A.dz(new A.a1($.S,a.h("a1<0>")),a.h("dz<0>"))},
mS(a,b){a.$2(0,null)
b.b=!0
return b.a},
mP(a,b){A.mT(a,b)},
mR(a,b){var s,r,q=b.$ti
q.h("1/?").a(a)
s=a==null?q.c.a(a):a
if(!b.b)b.a.cK(s)
else{r=b.a
if(q.h("b1<1>").b(s))r.bH(s)
else r.bJ(s)}},
mQ(a,b){var s=A.aY(a),r=A.bS(a),q=b.b,p=b.a
if(q)p.b9(new A.at(s,r))
else p.bF(new A.at(s,r))},
mT(a,b){var s,r,q=new A.jn(b),p=new A.jo(b)
if(a instanceof A.a1)a.bX(q,p,t.z)
else{s=t.z
if(a instanceof A.a1)a.co(q,p,s)
else{r=new A.a1($.S,t.c)
r.a=8
r.c=a
r.bX(q,p,s)}}},
nx(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.S.cm(new A.js(s),t.o,t.S,t.z)},
kQ(a,b,c){return 0},
jN(a){var s
if(t.U.b(a)){s=a.gaO()
if(s!=null)return s}return B.a2},
lV(a,b){var s
if(!b.b(null))throw A.i(A.eI(null,"computation","The type parameter is not nullable"))
s=new A.a1($.S,b.h("a1<0>"))
A.mi(a,new A.hr(null,s,b))
return s},
j3(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.mg()
b.bF(new A.at(new A.aF(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bQ(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aH()
b.aQ(o.a)
A.bs(b,p)
return}b.a^=2
A.dK(null,null,b.b,t.M.a(new A.j4(o,b)))},
bs(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.u,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.k5(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.bs(d.a,c)
q.a=l
k=l.a}p=d.a
j=p.c
q.b=n
q.c=j
if(o){i=c.c
i=(i&1)!==0||(i&15)===8}else i=!0
if(i){h=c.b.b
if(n){p=p.b===h
p=!(p||p)}else p=!1
if(p){s.a(j)
A.k5(j.a,j.b)
return}g=$.S
if(g!==h)$.S=h
else g=null
c=c.c
if((c&15)===8)new A.j8(q,d,n).$0()
else if(o){if((c&1)!==0)new A.j7(q,j).$0()}else if((c&2)!==0)new A.j6(d,q).$0()
if(g!=null)$.S=g
c=q.c
if(c instanceof A.a1){p=q.a.$ti
p=p.h("b1<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aS(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.j3(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.aS(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
nm(a,b){var s
if(t.C.b(a))return b.cm(a,t.z,t.K,t.l)
s=t.A
if(s.b(a))return s.a(a)
throw A.i(A.eI(a,"onError",u.c))},
nj(){var s,r
for(s=$.bO;s!=null;s=$.bO){$.cU=null
r=s.b
$.bO=r
if(r==null)$.cT=null
s.a.$0()}},
ns(){$.k4=!0
try{A.nj()}finally{$.cU=null
$.k4=!1
if($.bO!=null)$.kg().$1(A.l8())}},
l5(a){var s=new A.dA(a),r=$.cT
if(r==null){$.bO=$.cT=s
if(!$.k4)$.kg().$1(A.l8())}else $.cT=r.b=s},
np(a){var s,r,q,p=$.bO
if(p==null){A.l5(a)
$.cU=$.cT
return}s=new A.dA(a)
r=$.cU
if(r==null){s.b=p
$.bO=$.cU=s}else{q=r.b
s.b=q
$.cU=r.b=s
if(q==null)$.cT=s}},
oa(a,b){A.W(a,"stream",t.K)
return new A.dI(b.h("dI<0>"))},
mi(a,b){var s=$.S
if(s===B.m)return A.jY(a,t.M.a(b))
return A.jY(a,t.M.a(s.c4(b)))},
k5(a,b){A.np(new A.jr(a,b))},
l3(a,b,c,d,e){var s,r=$.S
if(r===c)return d.$0()
$.S=c
s=r
try{r=d.$0()
return r}finally{$.S=s}},
no(a,b,c,d,e,f,g){var s,r=$.S
if(r===c)return d.$1(e)
$.S=c
s=r
try{r=d.$1(e)
return r}finally{$.S=s}},
nn(a,b,c,d,e,f,g,h,i){var s,r=$.S
if(r===c)return d.$2(e,f)
$.S=c
s=r
try{r=d.$2(e,f)
return r}finally{$.S=s}},
dK(a,b,c,d){t.M.a(d)
if(B.m!==c){d=c.c4(d)
d=d}A.l5(d)},
iX:function iX(a){this.a=a},
iW:function iW(a,b,c){this.a=a
this.b=b
this.c=c},
iY:function iY(a){this.a=a},
iZ:function iZ(a){this.a=a},
jh:function jh(){},
ji:function ji(a,b){this.a=a
this.b=b},
dz:function dz(a,b){this.a=a
this.b=!1
this.$ti=b},
jn:function jn(a){this.a=a},
jo:function jo(a){this.a=a},
js:function js(a){this.a=a},
aV:function aV(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aB:function aB(a,b){this.a=a
this.$ti=b},
at:function at(a,b){this.a=a
this.b=b},
hr:function hr(a,b,c){this.a=a
this.b=b
this.c=c},
br:function br(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
a1:function a1(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
j0:function j0(a,b){this.a=a
this.b=b},
j5:function j5(a,b){this.a=a
this.b=b},
j4:function j4(a,b){this.a=a
this.b=b},
j2:function j2(a,b){this.a=a
this.b=b},
j1:function j1(a,b){this.a=a
this.b=b},
j8:function j8(a,b,c){this.a=a
this.b=b
this.c=c},
j9:function j9(a,b){this.a=a
this.b=b},
ja:function ja(a){this.a=a},
j7:function j7(a,b){this.a=a
this.b=b},
j6:function j6(a,b){this.a=a
this.b=b},
dA:function dA(a){this.a=a
this.b=null},
dI:function dI(a){this.$ti=a},
cP:function cP(){},
dH:function dH(){},
jg:function jg(a,b){this.a=a
this.b=b},
jr:function jr(a,b){this.a=a
this.b=b},
kA(a,b){return new A.aN(a.h("@<0>").I(b).h("aN<1,2>"))},
U(a,b,c){return b.h("@<0>").I(c).h("kz<1,2>").a(A.nG(a,new A.aN(b.h("@<0>").I(c).h("aN<1,2>"))))},
a4(a,b){return new A.aN(a.h("@<0>").I(b).h("aN<1,2>"))},
m6(a){return new A.ax(a.h("ax<0>"))},
bm(a){return new A.ax(a.h("ax<0>"))},
m7(a,b){return b.h("kB<0>").a(A.nH(a,new A.ax(b.h("ax<0>"))))},
k_(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
bI(a,b,c){var s=new A.bt(a,b,c.h("bt<0>"))
s.c=a.e
return s},
b2(a,b){var s=J.A(a)
if(s.j())return s.gn()
return null},
ai(a,b,c){var s=A.kA(b,c)
a.ad(0,new A.hz(s,b,c))
return s},
hB(a){var s,r
if(A.kc(a))return"{...}"
s=new A.bG("")
try{r={}
B.a.l($.an,a)
s.a+="{"
r.a=!0
a.ad(0,new A.hC(r,s))
s.a+="}"}finally{if(0>=$.an.length)return A.w($.an,-1)
$.an.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
ax:function ax(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dG:function dG(a){this.a=a
this.c=this.b=null},
bt:function bt(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
hz:function hz(a,b,c){this.a=a
this.b=b
this.c=c},
v:function v(){},
H:function H(){},
hA:function hA(a){this.a=a},
hC:function hC(a,b){this.a=a
this.b=b},
cO:function cO(){},
bC:function bC(){},
cv:function cv(){},
bF:function bF(){},
cI:function cI(){},
bL:function bL(){},
nk(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aY(r)
q=A.kw(String(s))
throw A.i(q)}q=A.jp(p)
return q},
jp(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.dE(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.jp(a[s])
return a},
ky(a,b,c){return new A.cd(a,b)},
mV(a){return a.L()},
mq(a,b){return new A.jc(a,[],A.nD())},
mr(a,b,c){var s,r=new A.bG(""),q=A.mq(r,b)
q.b2(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
dE:function dE(a,b){this.a=a
this.b=b
this.c=null},
dF:function dF(a){this.a=a},
d2:function d2(){},
d4:function d4(){},
cd:function cd(a,b){this.a=a
this.b=b},
df:function df(a,b){this.a=a
this.b=b},
hv:function hv(){},
hx:function hx(a){this.b=a},
hw:function hw(a){this.a=a},
jd:function jd(){},
je:function je(a,b){this.a=a
this.b=b},
jc:function jc(a,b,c){this.c=a
this.a=b
this.b=c},
nR(a){var s=A.md(a,null)
if(s!=null)return s
throw A.i(A.kw(a))},
lR(a,b){a=A.Z(a,new Error())
if(a==null)a=A.cR(a)
a.stack=b.q(0)
throw a},
jT(a,b,c,d){var s,r=c?J.kx(a,d):J.m2(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
cg(a,b,c){var s,r=A.c([],c.h("r<0>"))
for(s=J.A(a);s.j();)B.a.l(r,c.a(s.gn()))
if(b)return r
r.$flags=1
return r},
n(a,b){var s,r
if(Array.isArray(a))return A.c(a.slice(0),b.h("r<0>"))
s=A.c([],b.h("r<0>"))
for(r=J.A(a);r.j();)B.a.l(s,r.gn())
return s},
aP(a,b){var s=A.cg(a,!1,b)
s.$flags=3
return s},
kH(a,b,c){var s=J.A(b)
if(!s.j())return a
if(c.length===0){do a+=A.t(s.gn())
while(s.j())}else{a+=A.t(s.gn())
while(s.j())a=a+c+A.t(s.gn())}return a},
mg(){return A.bS(new Error())},
lQ(a,b,c){var s,r
for(s=0;s<4;++s){r=a[s]
if(r.b===b)return r}throw A.i(A.eI(b,"name","No enum value with that name"))},
d6(a){if(typeof a=="number"||A.k3(a)||a==null)return J.aZ(a)
if(typeof a=="string")return JSON.stringify(a)
return A.kD(a)},
lS(a,b){A.W(a,"error",t.K)
A.W(b,"stackTrace",t.l)
A.lR(a,b)},
d_(a){return new A.cZ(a)},
cY(a,b){return new A.aF(!1,null,b,a)},
eI(a,b,c){return new A.aF(!0,a,b,c)},
kp(a,b,c){return a},
aQ(a,b,c,d,e){return new A.cp(b,c,!0,a,d,"Invalid value")},
me(a,b,c){if(0>a||a>c)throw A.i(A.aQ(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.i(A.aQ(b,a,c,"end",null))
return b}return c},
aR(a,b){if(a<0)throw A.i(A.aQ(a,0,null,b,null))
return a},
hs(a,b,c,d){return new A.d8(b,!0,a,d,"Index out of range")},
bq(a){return new A.cw(a)},
kK(a){return new A.dx(a)},
iJ(a){return new A.cu(a)},
a3(a){return new A.d3(a)},
kw(a){return new A.ah(a)},
m1(a,b,c){var s,r
if(A.kc(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.c([],t.s)
B.a.l($.an,a)
try{A.ng(a,s)}finally{if(0>=$.an.length)return A.w($.an,-1)
$.an.pop()}r=A.kH(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
jQ(a,b,c){var s,r
if(A.kc(a))return b+"..."+c
s=new A.bG(b)
B.a.l($.an,a)
try{r=s
r.a=A.kH(r.a,a,", ")}finally{if(0>=$.an.length)return A.w($.an,-1)
$.an.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
ng(a,b){var s,r,q,p,o,n,m,l=a.gB(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.j())return
s=A.t(l.gn())
B.a.l(b,s)
k+=s.length+2;++j}if(!l.j()){if(j<=5)return
if(0>=b.length)return A.w(b,-1)
r=b.pop()
if(0>=b.length)return A.w(b,-1)
q=b.pop()}else{p=l.gn();++j
if(!l.j()){if(j<=4){B.a.l(b,A.t(p))
return}r=A.t(p)
if(0>=b.length)return A.w(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gn();++j
for(;l.j();p=o,o=n){n=l.gn();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.w(b,-1)
k-=b.pop().length+2;--j}B.a.l(b,"...")
return}}q=A.t(p)
r=A.t(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.w(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.l(b,m)
B.a.l(b,q)
B.a.l(b,r)},
jV(a,b,c,d){var s
if(B.n===c){s=J.aj(a)
b=J.aj(b)
return A.iL(A.aS(A.aS($.dN(),s),b))}if(B.n===d){s=J.aj(a)
b=J.aj(b)
c=J.aj(c)
return A.iL(A.aS(A.aS(A.aS($.dN(),s),b),c))}s=J.aj(a)
b=J.aj(b)
c=J.aj(c)
d=J.aj(d)
d=A.iL(A.aS(A.aS(A.aS(A.aS($.dN(),s),b),c),d))
return d},
m9(a){var s,r,q=$.dN()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.z)(a),++r)q=A.aS(q,J.aj(a[r]))
return A.iL(q)},
bi:function bi(){},
dB:function dB(){},
G:function G(){},
cZ:function cZ(a){this.a=a},
aT:function aT(){},
aF:function aF(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cp:function cp(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
d8:function d8(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
cw:function cw(a){this.a=a},
dx:function dx(a){this.a=a},
cu:function cu(a){this.a=a},
d3:function d3(a){this.a=a},
dq:function dq(){},
ct:function ct(){},
j_:function j_(a){this.a=a},
ah:function ah(a){this.a=a},
b:function b(){},
ac:function ac(a,b,c){this.a=a
this.b=b
this.$ti=c},
ad:function ad(){},
C:function C(){},
dJ:function dJ(){},
iK:function iK(){this.b=this.a=0},
bG:function bG(a){this.a=a},
kF(a,b,c){var s,r,q,p,o=[]
for(s=c!=null,r=0;r<b;++r)for(q=r*a,p=0;p<a;++p)if(!s||J.ar(c,q+p)!==0)o.push(new A.bv(p,r))
return new A.iG(a,b,A.aP(o,t.bP),A.a4(t.S,t.gE))},
iG:function iG(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iI:function iI(a,b){this.a=a
this.b=b},
iH:function iH(a,b){this.a=a
this.b=b},
km(a,b,c,d){var s,r,q,p,o,n=t.N,m=t.S,l=a.gah(),k=a.gah(),j=a.gah(),i=A.a4(m,m)
for(s=a.gP(),r=J.A(s.a),s=new A.V(r,s.b,s.$ti.h("V<1>"));s.j();){q=r.gn()
i.A(0,q.a,q.d)}s=A.a4(n,t.J)
for(r=d.length,p=0;p<d.length;d.length===r||(0,A.z)(d),++p){o=d[p]
s.A(0,o.a,o)}return new A.be(a,b,c,l.b,k.c,j.d,i,s,A.bm(n),A.bm(n),A.bm(n),A.bm(m),A.bm(m),A.bm(m),A.a4(m,t.y))},
eJ:function eJ(a){this.a=a},
be:function be(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=0
_.w=g
_.x=h
_.y=i
_.z=j
_.Q=k
_.as=l
_.at=m
_.ax=n
_.ay=o},
dU:function dU(){},
dV:function dV(){},
ec:function ec(a){this.a=a},
dW:function dW(a,b){this.a=a
this.b=b},
eb:function eb(){},
em:function em(a,b){this.a=a
this.b=b},
ek:function ek(a){this.a=a},
el:function el(a,b){this.a=a
this.b=b},
ei:function ei(a){this.a=a},
ej:function ej(a){this.a=a},
dX:function dX(){},
dY:function dY(a){this.a=a},
dZ:function dZ(a,b){this.a=a
this.b=b},
e_:function e_(a,b,c){this.a=a
this.b=b
this.c=c},
e2:function e2(a,b){this.a=a
this.b=b},
e0:function e0(a){this.a=a},
e1:function e1(a,b){this.a=a
this.b=b},
e3:function e3(a){this.a=a},
e4:function e4(){},
e5:function e5(a){this.a=a},
e6:function e6(){},
e7:function e7(a){this.a=a},
e8:function e8(a){this.a=a},
ea:function ea(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
e9:function e9(a){this.a=a},
ed:function ed(a){this.a=a},
ee:function ee(a){this.a=a},
ef:function ef(){},
eg:function eg(a){this.a=a},
eh:function eh(a){this.a=a},
b0(a,b,c,d){var s,r=b.f,q=A.f(r)
q=new A.d(r,q.h("e(1)").a(new A.eO(a)),q.h("d<1>")).gk(0)
r=b.gP()
if(!b.gP().gB(0).j())s=0
else{s=b.gah().r
if(s==null){s=c.b.i(0,"countryIncome")
s.toString
s=B.b.m(s)}}return new A.eN(a,q,r.H(0,s,new A.eP(d,c),t.S),b,c)},
eN:function eN(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eO:function eO(a){this.a=a},
eP:function eP(a,b){this.a=a
this.b=b},
a6(a){var s=a.x,r=s>=15?500:0,q=a.e
if(q===2)q=1000
else q=q===1?30:0
return a.w*3+a.r*0.35+a.f*0.15+s*1.5-a.y*2+r+q},
af(a,b){var s=b?a.x*0.75:0,r=a.e
if(r===1)r=30
else r=r===2?-200:0
return a.w*100+a.r*0.35+a.f*0.15-a.y*2-s+r},
lb(a,b){var s=a.gbo(),r=a.gK(),q=b.b.i(0,"soldierPower")
q.toString
return s*(a.w+r*B.b.m(q))},
bT(a,b,c,d){var s,r=b.b,q=r.i(0,"soldierHp")
q.toString
q=B.b.m(q)
s=b.bl(a.w,c,!1)
r=r.i(0,"soldierPower")
r.toString
return(a.f+d*q)*(s+d*B.b.m(r))*(1+b.dv(B.b.aM(a.ax))/1000)},
bh:function bh(a,b){this.a=a
this.b=b},
bW:function bW(a,b,c){this.a=a
this.b=b
this.c=c},
eQ:function eQ(a,b,c){this.a=a
this.b=b
this.c=c},
eR:function eR(){},
eS:function eS(){},
ko(b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7=A.u(b9.i(0,"interval")),b8=A.a2(b9.i(0,"resourceInterval"))
if(b8==null)b8=30
s=A.X(b9.i(0,"cashBuffer"))
if(s==null)s=12
r=A.a2(b9.i(0,"payrollRatio"))
if(r==null)r=0.5
q=A.X(b9.i(0,"dangerousCountryCities"))
if(q==null)q=5
p=A.a2(b9.i(0,"coalitionBudgetBase"))
if(p==null)p=0.5
o=A.a2(b9.i(0,"coalitionBudgetStep"))
if(o==null)o=0.25
n=A.a2(b9.i(0,"coalitionTargetBase"))
if(n==null)n=45
m=A.a2(b9.i(0,"coalitionTargetStep"))
if(m==null)m=15
l=A.a2(b9.i(0,"coalitionPayrollCeiling"))
if(l==null)l=0.8
k=A.a2(b9.i(0,"coalitionTravel"))
if(k==null)k=45
j=A.a2(b9.i(0,"targetTravelScale"))
if(j==null)j=25
i=A.a2(b9.i(0,"hatredTargetBonus"))
if(i==null)i=90
h=A.a2(b9.i(0,"breakthroughMargin"))
if(h==null)h=0.1
g=A.u(b9.i(0,"threat"))
f=A.u(b9.i(0,"urgent"))
e=A.u(b9.i(0,"margin"))
d=A.u(b9.i(0,"commit"))
c=A.X(b9.i(0,"rearExtra"))
if(c==null)c=1
b=A.h(b9.i(0,"candidates"))
a=A.h(b9.i(0,"assessments"))
a0=A.h(b9.i(0,"routes"))
a1=A.h(b9.i(0,"plans"))
a2=A.h(b9.i(0,"commands"))
a3=A.h(b9.i(0,"team"))
a4=A.X(b9.i(0,"fronts"))
if(a4==null)a4=2
a5=A.X(b9.i(0,"singleFrontMonths"))
if(a5==null)a5=12
a6=A.a2(b9.i(0,"splitForce"))
if(a6==null)a6=2.25
a7=A.a2(b9.i(0,"splitAdvantage"))
if(a7==null)a7=0.3
a8=A.a2(b9.i(0,"arrivalSpread"))
if(a8==null)a8=20
a9=A.a2(b9.i(0,"expeditionSeconds"))
if(a9==null)a9=900
b0=A.a2(b9.i(0,"assaultCommitDistance"))
if(b0==null)b0=64
b1=A.a2(b9.i(0,"recallCriticalMargin"))
if(b1==null)b1=0.25
b2=A.X(b9.i(0,"attritionCombat"))
if(b2==null)b2=8
b3=A.h(b9.i(0,"targets"))
b4=A.h(b9.i(0,"slice"))
b5=A.u(b9.i(0,"advantage"))
b6=A.u(b9.i(0,"expansion"))
return new A.cX(b7,g,f,e,b8,s,r,q,p,o,n,m,l,k,j,i,h,d,A.u(b9.i(0,"age")),c,b,a,a0,a1,a2,a3,b3,b4,a4,a5,a6,a7,a8,a9,b0,b1,b2,b5,b6,A.h(b9.i(0,"timeout")),A.h(b9.i(0,"restarts")),A.u(b9.i(0,"stagnation")))},
cX:function cX(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=o
_.ay=p
_.ch=q
_.CW=r
_.cx=s
_.cy=a0
_.db=a1
_.dx=a2
_.dy=a3
_.fr=a4
_.fx=a5
_.fy=a6
_.go=a7
_.id=a8
_.k1=a9
_.k2=b0
_.k3=b1
_.k4=b2
_.ok=b3
_.p1=b4
_.p2=b5
_.p3=b6
_.p4=b7
_.R8=b8
_.RG=b9
_.rx=c0
_.ry=c1
_.to=c2},
ay:function ay(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eT:function eT(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.r=_.f=_.e=$
_.w=null
_.x=e},
fo:function fo(){},
fp:function fp(a){this.a=a},
fq:function fq(){},
fB:function fB(){},
fF:function fF(){},
fG:function fG(){},
fH:function fH(a){this.a=a},
fI:function fI(a){this.a=a},
fJ:function fJ(a,b){this.a=a
this.b=b},
fK:function fK(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fL:function fL(a){this.a=a},
fr:function fr(a,b,c){this.a=a
this.b=b
this.c=c},
fs:function fs(a){this.a=a},
ft:function ft(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fu:function fu(a,b,c){this.a=a
this.b=b
this.c=c},
fv:function fv(){},
fw:function fw(a){this.a=a},
fx:function fx(a){this.a=a},
fy:function fy(){},
fz:function fz(){},
fA:function fA(a,b){this.a=a
this.b=b},
fC:function fC(a){this.a=a},
fD:function fD(){},
fE:function fE(a){this.a=a},
f5:function f5(a,b){this.a=a
this.b=b},
f6:function f6(a){this.a=a},
eU:function eU(a){this.a=a},
f1:function f1(a){this.a=a},
f2:function f2(a,b,c){this.a=a
this.b=b
this.c=c},
f3:function f3(a,b,c){this.a=a
this.b=b
this.c=c},
f4:function f4(a){this.a=a},
eV:function eV(a,b,c){this.a=a
this.b=b
this.c=c},
eW:function eW(){},
eX:function eX(a){this.a=a},
eY:function eY(){},
fa:function fa(a,b,c){this.a=a
this.b=b
this.c=c},
fb:function fb(a){this.a=a},
fc:function fc(a){this.a=a},
fd:function fd(a){this.a=a},
fe:function fe(a,b){this.a=a
this.b=b},
ff:function ff(a){this.a=a},
fg:function fg(a){this.a=a},
fh:function fh(a,b){this.a=a
this.b=b},
fi:function fi(a){this.a=a},
fj:function fj(a,b){this.a=a
this.b=b},
fk:function fk(a){this.a=a},
fl:function fl(a){this.a=a},
fm:function fm(){},
fn:function fn(a){this.a=a},
f8:function f8(a){this.a=a},
f9:function f9(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
f7:function f7(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eZ:function eZ(a,b,c){this.a=a
this.b=b
this.c=c},
f_:function f_(a){this.a=a},
f0:function f0(a){this.a=a},
ag:function ag(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fM:function fM(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hl:function hl(a,b){this.a=a
this.b=b},
hm:function hm(a){this.a=a},
hk:function hk(a){this.a=a},
hn:function hn(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hi:function hi(){},
hh:function hh(){},
hj:function hj(){},
hg:function hg(){},
hp:function hp(){},
ho:function ho(a){this.a=a},
fN:function fN(){},
fO:function fO(){},
fP:function fP(){},
fY:function fY(){},
fZ:function fZ(a){this.a=a},
h_:function h_(){},
h0:function h0(){},
h1:function h1(a){this.a=a},
h2:function h2(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h3:function h3(a){this.a=a},
h4:function h4(a){this.a=a},
fQ:function fQ(){},
fR:function fR(a){this.a=a},
h5:function h5(a,b){this.a=a
this.b=b},
fS:function fS(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fT:function fT(a,b){this.a=a
this.b=b},
fU:function fU(){},
fV:function fV(a){this.a=a},
fW:function fW(a){this.a=a},
fX:function fX(){},
hc:function hc(){},
hd:function hd(a){this.a=a},
he:function he(a){this.a=a},
hf:function hf(){},
h6:function h6(){},
h9:function h9(a){this.a=a},
ha:function ha(a){this.a=a},
hb:function hb(a){this.a=a},
h7:function h7(){},
h8:function h8(){},
ew(a){var s=J.ao(a)
return new A.D(A.u(s.i(a,0)),A.u(s.i(a,1)))},
D:function D(a,b){this.a=a
this.b=b},
ev:function ev(a){this.a=a},
kl(b6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=A.L(b6.i(0,"id")),a3=A.h(b6.i(0,"c")),a4=A.h(b6.i(0,"home")),a5=A.h(b6.i(0,"o")),a6=A.h(b6.i(0,"t")),a7=A.u(b6.i(0,"hp")),a8=A.h(b6.i(0,"max")),a9=A.h(b6.i(0,"a")),b0=A.h(b6.i(0,"p")),b1=A.h(b6.i(0,"pay")),b2=t.j,b3=A.ew(b2.a(b6.i(0,"xy"))),b4=A.ew(b2.a(b6.i(0,"v"))),b5=A.h(b6.i(0,"s"))
if(!(b5>=0&&b5<8))return A.w(B.K,b5)
b5=B.K[b5]
s=A.c([],t.n)
for(r=J.A(b2.a(b6.i(0,"troops")));r.j();)s.push(A.u(r.gn()))
r=A.u(b6.i(0,"m"))
q=b6.i(0,"to")==null?null:A.ew(b2.a(b6.i(0,"to")))
p=A.X(b6.i(0,"target"))
o=A.u(b6.i(0,"return"))
n=A.b9(b6.i(0,"dispatch"))
m=A.b9(b6.i(0,"move"))
l=A.b9(b6.i(0,"dismiss"))
k=A.b9(b6.i(0,"upgrade"))
j=A.b9(b6.i(0,"retreat"))
i=A.b9(b6.i(0,"marked"))
h=A.L(b6.i(0,"rev"))
g=A.h(b6.i(0,"orderRev"))
f=A.bN(b6.i(0,"opponent"))
e=A.h(b6.i(0,"clashes"))
d=A.u(b6.i(0,"received"))
c=A.u(b6.i(0,"dealt"))
b=A.c([],t._)
for(a=J.A(t.R.a(b6.i(0,"returnPath")));a.j();){a0=b2.a(a.gn())
a1=J.ao(a0)
b.push(new A.D(A.u(a1.i(a0,0)),A.u(a1.i(a0,1))))}b2=A.X(b6.i(0,"regionCity"))
a=A.X(b6.i(0,"salaryPaidMonth"))
if(a==null)a=-1
a0=A.bM(b6.i(0,"movementPending"))
return new A.o(a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b3,b4,b5,A.aP(s,t.i),r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,b2,a,a0===!0)},
lE(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
s=B.c.t(b.x,a.x)
if(s!==0)return s
r=B.c.t(b.w,a.w)
if(r!==0)return r
q=a.e===2
if(q!==(b.e===2))return q?-1:1
return B.c.t(a.d,b.d)},
lC(a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=A.h(a7.i(0,"id")),a1=A.h(a7.i(0,"c")),a2=A.h(a7.i(0,"native")),a3=A.h(a7.i(0,"level")),a4=t.j,a5=A.ew(a4.a(a7.i(0,"xy"))),a6=A.c([],t._)
for(s=J.A(a4.a(a7.i(0,"outline")));s.j();){r=a4.a(s.gn())
q=J.ao(r)
a6.push(new A.D(A.u(q.i(r,0)),A.u(q.i(r,1))))}a4=A.h(a7.i(0,"income"))
s=A.h(a7.i(0,"poor"))
r=A.h(a7.i(0,"cap"))
q=A.h(a7.i(0,"recruitCap"))
p=t.bM
o=p.a(a7.i(0,"neighbors"))
o=o==null?null:J.ki(o,t.S)
n=A.b9(a7.i(0,"recruit"))
m=A.bM(a7.i(0,"upgrade"))
l=A.L(a7.i(0,"rev"))
k=A.h(a7.i(0,"baseIncome"))
j=A.X(a7.i(0,"initial"))
i=A.h(a7.i(0,"wins"))
h=A.bN(a7.i(0,"attacker"))
g=A.bN(a7.i(0,"defender"))
f=A.L(a7.i(0,"stage"))
e=A.u(a7.i(0,"next"))
d=A.bM(a7.i(0,"fallen"))
c=A.u(a7.i(0,"danger"))
b=A.X(a7.i(0,"gridWidth"))
if(b==null)b=0
a=A.X(a7.i(0,"gridHeight"))
if(a==null)a=0
p=p.a(a7.i(0,"gridTiles"))
p=p==null?null:J.ki(p,t.S)
if(p==null)p=B.am
return new A.P(a0,a1,a2,a3,o,a5,new A.ev(a6),b,a,p,a4,s,r,q,k,n,m!==!1,l,j,i,h,g,f,e,d===!0,c)},
lD(a){var s,r,q,p,o,n=A.h(a.i(0,"id")),m=A.h(a.i(0,"gold")),l=A.h(a.i(0,"reserves")),k=A.h(a.i(0,"capacity")),j=A.h(a.i(0,"salary")),i=A.h(a.i(0,"poor")),h=A.X(a.i(0,"baseIncome")),g=A.a2(a.i(0,"garrisonAccrued"))
if(g==null)g=0
s=A.bM(a.i(0,"soldierRecruitmentAllowed"))
r=t.S
q=A.a4(r,r)
for(p=t.f.a(a.i(0,"hate")).gaB(),p=p.gB(p);p.j();){o=p.gn()
q.A(0,A.nR(A.L(o.a)),A.h(o.b))}return new A.bd(n,m,l,k,j,i,h,g,s!==!1,A.jO(q,r,r))},
lF(a){var s,r,q,p,o,n,m=A.h(a.i(0,"country")),l=A.h(a.i(0,"tick")),k=A.u(a.i(0,"month")),j=A.c([],t.Y)
for(s=t.R,r=J.A(s.a(a.i(0,"cities"))),q=t.f,p=t.N,o=t.z;r.j();)j.push(A.lC(A.ai(q.a(r.gn()),p,o)))
r=A.c([],t.e)
for(n=J.A(s.a(a.i(0,"heroes")));n.j();)r.push(A.kl(A.ai(q.a(n.gn()),p,o)))
n=A.c([],t.eu)
for(s=J.A(s.a(a.i(0,"countries")));s.j();)n.push(A.lD(A.ai(q.a(s.gn()),p,o)))
s=A.h(a.i(0,"pool"))
q=A.h(a.i(0,"salary"))
p=A.X(a.i(0,"year"))
if(p==null)p=1
o=A.X(a.i(0,"monthIndex"))
if(o==null)o=0
return new A.eo(m,l,p,o,k,A.aP(j,t.q),A.aP(r,t.r),A.aP(n,t.t),s,q)},
ap:function ap(a,b){this.a=a
this.b=b},
o:function o(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=o
_.ay=p
_.ch=q
_.CW=r
_.cx=s
_.cy=a0
_.db=a1
_.dx=a2
_.dy=a3
_.fr=a4
_.fx=a5
_.fy=a6
_.go=a7
_.id=a8
_.k1=a9
_.k2=b0
_.k3=b1
_.k4=b2
_.ok=b3
_.p1=b4},
dT:function dT(){},
dS:function dS(){},
P:function P(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=o
_.ay=p
_.ch=q
_.CW=r
_.cx=s
_.cy=a0
_.db=a1
_.dx=a2
_.dy=a3
_.fr=a4
_.fx=a5
_.fy=a6},
dQ:function dQ(){},
dR:function dR(){},
bd:function bd(a,b,c,d,e,f,g,h,i,j){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j},
eo:function eo(a,b,c,d,e,f,g,h,i,j){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j},
et:function et(a){this.a=a},
eu:function eu(a){this.a=a},
er:function er(a,b){this.a=a
this.b=b},
eq:function eq(a){this.a=a},
es:function es(a){this.a=a},
ep:function ep(a){this.a=a},
k7(a,b,c){var s,r,q=null,p=a.as
if(p===B.e||p===B.d||p===B.q)return q
s=c.x.i(0,a.a)
p=s==null
if((p?q:s.b)==="expedition")p=p?q:s.d
else p=a.ch
r=b.G(p)
return r!=null&&r.b!==a.b?r:q},
l7(a,b,c,d){var s,r,q=A.k7(a,b,c)
if(q==null)return!1
s=a.as
r=!0
if(s!==B.x)if(s!==B.y){s=a.z
s=q.r.Y(s).E(s)<=d.r.p2}else s=r
else s=r
return s},
cn(a,b,c,d,e){var s=B.a.D(a.f,new A.hF(e,a))?e:null
s=new A.hE(a,b,c,s,d,A.a4(t.S,t.bd))
s.cD(a,b,c,d,e)
return s},
hE:function hE(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hF:function hF(a,b){this.a=a
this.b=b},
hG:function hG(){},
hK:function hK(a){this.a=a},
hM:function hM(a){this.a=a},
hN:function hN(a){this.a=a},
hL:function hL(a,b){this.a=a
this.b=b},
hI:function hI(){},
hJ:function hJ(a,b){this.a=a
this.b=b},
hO:function hO(a){this.a=a},
hH:function hH(a){this.a=a},
co:function co(a,b){this.a=a
this.b=b},
hP:function hP(a,b,c){this.a=a
this.b=b
this.c=c},
hQ:function hQ(a,b){this.a=a
this.b=b},
hT:function hT(a){this.a=a},
hU:function hU(){},
hV:function hV(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hR:function hR(){},
hS:function hS(a){this.a=a},
lI(a){var s,r,q,p,o,n,m,l,k=A.L(a.i(0,"hero")),j=A.L(a.i(0,"role")),i=A.h(a.i(0,"deadline")),h=A.h(a.i(0,"commit")),g=A.X(a.i(0,"city")),f=A.bN(a.i(0,"enemy")),e=A.c([],t._)
for(s=J.A(t.R.a(a.i(0,"points"))),r=t.j;s.j();){q=r.a(s.gn())
p=J.ao(q)
e.push(new A.D(A.u(p.i(q,0)),A.u(p.i(q,1))))}s=A.h(a.i(0,"leg"))
r=A.h(a.i(0,"gold"))
q=A.b9(a.i(0,"slot"))
p=A.bM(a.i(0,"rearStaging"))
o=A.L(a.i(0,"reason"))
n=A.h(a.i(0,"order"))
m=A.X(a.i(0,"targetCountry"))
l=A.bM(a.i(0,"attrition"))
return new A.a8(k,j,o,g,m,l===!0,f,e,s,i,h,r,q,p===!0,n)},
lG(a){var s,r,q,p,o,n,m,l,k,j,i
if(!J.aE(a.i(0,"protocol"),2))throw A.i(B.a8)
s=A.L(a.i(0,"session"))
r=A.h(a.i(0,"id"))
q=A.L(a.i(0,"rules"))
p=A.L(a.i(0,"map"))
o=t.f
n=t.N
m=t.z
l=A.lF(A.ai(o.a(a.i(0,"observation")),n,m))
k=A.h(a.i(0,"deadline"))
j=A.c([],t.m)
for(i=J.A(t.R.a(a.i(0,"tasks")));i.j();)j.push(A.lI(A.ai(o.a(i.gn()),n,m)))
o=A.h(a.i(0,"seed"))
n=A.h(a.i(0,"priority"))
m=A.h(a.i(0,"idle"))
i=A.bN(a.i(0,"stage"))
if(i==null)i="full"
return new A.ey(s,q,p,r,k,o,n,m,A.lQ(B.al,i,t.a9),A.X(a.i(0,"offensiveCountry")),A.X(a.i(0,"offensiveCity")),l,j)},
kn(a,b,c,d){var s=a.Q
return new A.ex(a.a,a.b,a.c,a.d,s.a,s.b,a.e,d,b,c)},
aJ:function aJ(a,b){this.a=a
this.b=b},
as:function as(a,b){this.a=a
this.b=b},
x:function x(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
a8:function a8(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=n
_.ax=o},
I:function I(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bA:function bA(a,b,c,d,e,f,g,h,i,j){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j},
ey:function ey(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m},
ex:function ex(a,b,c,d,e,f,g,h,i,j){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j},
dL(b0,b1,b2,b3,b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2="soldierLimit",a3="soldierPower",a4="soldierHp",a5={},a6=b2.u(b1.a),a7=A.f(a6).h("K<1>"),a8=A.R(new A.K(a6,a7),0,A.W(b1.ga2(),"count",t.S),a7.h("l.E")).ap(0),a9=A.b0(b1.b,b2,b3,null)
a5.a=a5.b=1
a5.c=0
a5.d=null
a7=b3.d9(b0.w,!1)
a6=b3.b
s=a6.i(0,a2)
s.toString
s=B.b.m(s)
r=a6.i(0,a3)
r.toString
q=a7+s*B.b.m(r)
p=B.a.av(b2.w,new A.jt(b1)).c
for(a7=b1.fx,s=b1.cx,r=b1.cy,o=s==null,n=b1.d,m=b3.d,l=0,k=0;k<a8.length;++k){j=a8[k]
i=a6.i(0,a2)
i.toString
h=Math.min(B.b.m(i),p+j.gK())
p=Math.max(0,p-(h-j.gK()))
if(o)i=n
else{i=a7?1:0
i=B.c.v(s-r-i,0,5)}i=Math.max(1,i-k)
g=a6.i(0,a2)
g.toString
f=b4.de(b0,j,i,h,B.b.m(g))
if(f.a===B.A)return new A.aA([!1,-1,0,1])
a5.b=Math.min(a5.b,f.b)
i=k===0
if(i)a5.d=f
a5.a=Math.min(a5.a,f.c)
if(o)g=n
else{g=a7?1:0
g=B.c.v(s-r-g,0,5)}g=A.h(Math.max(1,g-k))
e=B.c.v(B.c.a0(j.w),0,63)
if(g>0){d=m.length
g=B.c.v(g-1,0,d-1)
if(!(g>=0&&g<d))return A.w(m,g)
g=m[g]}else g=0
g=B.c.v(e+g,0,63)
e=a6.i(0,a3)
e.toString
c=(g+h*B.b.m(e))/Math.max(1,q)
e=a6.i(0,a4)
e.toString
b=(j.f+h*B.b.m(e))*c*c
l+=b
if(i)a5.c=b}a7=b0.f
s=a6.i(0,a2)
s.toString
s=B.b.m(s)
a6=a6.i(0,a4)
a6.toString
a=a7+s*B.b.m(a6)
a0=Math.max(1,B.b.an(l/Math.max(1,a*0.85)))
a6=new A.ju(a5,a8,b0,b3,a)
s=b3.r
r=s.fy
if(a0>r)return a6.$0()
o=a8.length
m=o===0
if(!m)n=o===1&&n<=2&&a7>=b0.r*0.8&&a5.b>s.RG||a5.b>s.R8+Math.max(0,o-1)*0.025-b5
else n=!0
if(n){a6=a5.b
a7=a5.a
return new A.aA([!1,a6,a9.bv(a6>=s.k4||m?a0:Math.max(2,a0),o),a7])}if(a0>=2&&a7>=b0.r*0.65){a6=a5.b
a7=a5.a
return new A.aA([!1,a6,a9.bv(a0,o),a7])}a1=o>1&&a5.a>s.R8&&a5.b>-0.08?Math.min(r,o):0
if(a1===0)return a6.$0()
a6=a5.b
a7=a5.a
return new A.aA([!1,a6,a9.bv(a1,o),a7])},
jt:function jt(a){this.a=a},
ju:function ju(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
nZ(a,b,c,d){return!c&&!b&&d!=null&&d.aW(0,new A.jH(a))},
jH:function jH(a){this.a=a},
hZ:function hZ(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
i3:function i3(){},
i4:function i4(a){this.a=a},
i5:function i5(){},
ih:function ih(a,b,c){this.a=a
this.b=b
this.c=c},
it:function it(a,b,c){this.a=a
this.b=b
this.c=c},
i2:function i2(a,b){this.a=a
this.b=b},
i_:function i_(a,b,c){this.a=a
this.b=b
this.c=c},
i0:function i0(){},
i1:function i1(){},
iy:function iy(a,b){this.a=a
this.b=b},
iz:function iz(a,b){this.a=a
this.b=b},
iA:function iA(){},
iB:function iB(){},
iE:function iE(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
iC:function iC(){},
iD:function iD(a){this.a=a},
i6:function i6(a){this.a=a},
i7:function i7(a){this.a=a},
i9:function i9(a){this.a=a},
ia:function ia(){},
i8:function i8(a,b,c){this.a=a
this.b=b
this.c=c},
ib:function ib(a){this.a=a},
ic:function ic(a,b){this.a=a
this.b=b},
id:function id(){},
ie:function ie(){},
ig:function ig(){},
ii:function ii(){},
ij:function ij(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ik:function ik(a,b,c){this.a=a
this.b=b
this.c=c},
il:function il(a){this.a=a},
im:function im(){},
io:function io(a){this.a=a},
ip:function ip(){},
iq:function iq(){},
ir:function ir(a,b,c){this.a=a
this.b=b
this.c=c},
is:function is(a,b,c){this.a=a
this.b=b
this.c=c},
iu:function iu(a,b){this.a=a
this.b=b},
iv:function iv(a,b,c){this.a=a
this.b=b
this.c=c},
iw:function iw(){},
ix:function ix(){},
b_:function b_(a,b,c){this.a=a
this.b=b
this.d=c},
ez:function ez(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eA:function eA(){},
eB:function eB(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eC:function eC(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
eD:function eD(a,b,c){this.a=a
this.b=b
this.c=c},
eE:function eE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
lH(a){var s,r=A.L(a.i(0,"version")),q=t.f,p=t.N,o=t.H,n=A.ai(q.a(a.i(0,"values")),p,o),m=t.R,l=t.S,k=A.cg(m.a(a.i(0,"upgrades")),!0,l),j=A.cg(m.a(a.i(0,"defenseBonuses")),!0,l),i=t.n,h=A.c([],i)
for(s=J.A(m.a(a.i(0,"movement")));s.j();)h.push(A.u(s.gn()))
i=A.c([],i)
for(m=J.A(m.a(a.i(0,"field")));m.j();)i.push(A.u(m.gn()))
q=A.ko(A.ai(q.a(a.i(0,"tuning")),p,t.z))
m=t.i
return new A.eF(r,A.jO(n,p,o),A.aP(k,l),A.aP(j,l),A.aP(h,m),A.aP(i,m),q)},
eF:function eF(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
en:function en(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eH:function eH(a,b,c){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=0
_.r=c},
by(a,b,c,d,e,f){var s,r,q,p,o,n,m=a.a,l=c.u(m),k=A.f(l).h("K<1>"),j=A.R(new A.K(l,k),0,A.W(a.ga2(),"count",t.S),k.h("l.E")).ap(0)
if(j.length===0)s=0
else{l=A.f(j)
s=new A.O(j,l.h("j(1)").a(new A.jI()),l.h("O<1,j>")).ai(0,B.F)}l=c.r
k=A.f(l)
r=new A.d(l,k.h("e(1)").a(new A.jJ(a)),k.h("d<1>")).H(0,0,new A.jK(),t.i)
k=a.b
l=c.gah().y.i(0,k)
l=B.c.v(l==null?0:l,0,100)
k=A.b0(k,c,d,null)
if(k.ga8()){q=k.e.r
p=q.z+k.gbd()*q.Q}else p=0
o=e^m*7919
o^=o<<13
o^=o>>>17
if(f==null){m=b.z.E(a.f)
k=d.b.i(0,"marchSpeed")
k.toString
q=d.e
if(0>=q.length)return A.w(q,0)
n=m/(k*q[0])}else n=f
if(a.c===b.b)m=1
else{m=d.b.i(0,"foreignYield")
m.toString}k=d.r
return Math.max(1,160+a.ax*m*2+r+p+l/100*k.ay-s*0.25-a.d*6)/Math.pow(1+n/k.ax,1.5)+((o^o<<5)&65535)/65536*0.000001},
jI:function jI(){},
jJ:function jJ(a){this.a=a},
jK:function jK(){},
a7:function a7(a,b,c){this.a=a
this.b=b
this.c=c},
au:function au(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.d=c
_.f=d
_.r=e
_.w=f},
eL:function eL(){},
eM:function eM(){},
eK:function eK(){},
iM:function iM(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iN:function iN(a){this.a=a},
iO:function iO(){},
iP:function iP(a){this.a=a},
iQ:function iQ(a){this.a=a},
iR:function iR(a){this.a=a},
iS:function iS(a){this.a=a},
iT:function iT(){},
eG:function eG(a){var _=this
_.a=a
_.d=_.c=_.b=0
_.e=!1},
nU(){var s,r,q=new A.jE(),p=v.G,o="web-worker:"+A.L(p.self.constructor.name)
p=A.jm(p.self)
s=new A.jF(new A.eH(q,o,A.bm(t.S)))
if(typeof s=="function")A.aC(A.cY("Attempting to rewrap a JS function.",null))
r=function(a,b){return function(c){return a(b,c,arguments.length)}}(A.mU,s)
r[$.ke()]=s
p.onmessage=r
q.$1(B.l.aA(t.G.a(A.U(["kind","hello","protocol",2,"build","9ef84ae9","backend",o],t.N,t.X)),null))},
jE:function jE(){},
jF:function jF(a){this.a=a},
lk(a){return v.mangledGlobalNames[a]},
o_(a){throw A.Z(new A.ce("Field '"+a+"' has been assigned during initialization."),new Error())},
M(){throw A.Z(A.m5(""),new Error())},
mU(a,b,c){t.h.a(a)
if(A.h(c)>=1)return a.$1(b)
return a.$0()},
lf(a,b,c){A.l9(c,t.H,"T","min")
return Math.min(c.a(a),c.a(b))},
le(a,b,c){A.l9(c,t.H,"T","max")
return Math.max(c.a(a),c.a(b))},
lX(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e="nationalAi",d="maxCityLevel",c="initialMonth",b=A.d7($.jL())
for(s=new A.aO(a,A.k(a).h("aO<1,2>")).gB(0),r=t.f,q=t.N,p=t.X;s.j();){o=s.d
n=o.a
m=n==="nationalAi"&&r.b(o.b)
l=o.b
if(m){m=A.d7(r.a($.jL().i(0,e)))
k=A.kA(q,p)
k.J(0,m)
k.J(0,A.d7(r.a(l)))
b.A(0,n,k)}else b.A(0,n,A.jP(l))}j=b.i(0,"poorHarvestAdjustmentMin")
i=b.i(0,"poorHarvestAdjustmentMax")
if(!A.jq(j)||!A.jq(i)||j<0||i<j)A.aC(B.ab)
h=b.i(0,"cityUpgradeCosts")
g=b.i(0,"cityDefenseAttackBonuses")
f=b.i(0,"cityDefenseMoraleBonuses")
s=t.j
if(!s.b(h)||J.N(h)!==4||!s.b(g)||J.N(g)!==5||!s.b(f)||J.N(f)!==5)A.aC(B.a6)
if(A.h(b.i(0,d))!==J.N(g)||A.h(b.i(0,d))!==J.N(f))A.aC(B.a7)
if(A.h(b.i(0,c))<1||A.h(b.i(0,c))>12||A.u(b.i(0,"secondsPerMonth"))<=0||A.h(b.i(0,d))<1)A.aC(B.a9)
s=A.jO(b,q,p)
$.lW=s
A.ko(A.ai(A.ai(r.a(s.i(0,e)),q,p),q,t.z))},
d7(a){var s,r,q=A.a4(t.N,t.X)
for(s=a.gaB(),s=s.gB(s);s.j();){r=s.gn()
q.A(0,J.aZ(r.a),A.jP(r.b))}return q},
jP(a){var s,r
A:{if(t.f.b(a)){s=A.d7(a)
break A}if(t.j.b(a)){s=[]
for(r=J.A(a);r.j();)s.push(A.jP(r.gn()))
break A}s=a
break A}return s},
nL(a,b,c,d,e,f,g,h){var s,r,q,p,o,n,m,l=null,k=f.E(a),j=!c
if(j&&k>d*b+80)return l
s=h.a
r=h.b
q=Math.sqrt(s*s+r*r)
p=q<0.01?0:((a.a-f.a)*s+(a.b-f.b)*r)/(Math.max(1,k)*q)
if(j&&k>72){if(p<0.45)return l
o=Math.max(0,k*p)
n=new A.D(f.a+s/q*o,f.b+r/q*o)
if(e.Y(n).E(n)>48)return l}m=g.$2(f,e.c0(f,a))
if(isFinite(m))j=!j||m<=b
else j=!1
return j?m:l},
jU(a,b,c){var s=Math.max(0,a-c)
return s*s*b}},B={}
var w=[A,J,B]
var $={}
A.jR.prototype={}
J.da.prototype={
aj(a,b){return a===b},
gT(a){return A.ds(a)},
q(a){return"Instance of '"+A.dt(a)+"'"},
gV(a){return A.aX(A.k2(this))}}
J.dc.prototype={
q(a){return String(a)},
gT(a){return a?519018:218159},
gV(a){return A.aX(t.y)},
$iE:1,
$ie:1}
J.c9.prototype={
aj(a,b){return null==b},
q(a){return"null"},
gT(a){return 0},
$iE:1}
J.cb.prototype={$iQ:1}
J.b4.prototype={
gT(a){return 0},
q(a){return String(a)}}
J.dr.prototype={}
J.bH.prototype={}
J.b3.prototype={
q(a){var s=a[$.lm()]
if(s==null)s=a[$.ke()]
if(s==null)return this.cC(a)
return"JavaScript function for "+J.aZ(s)},
$iaL:1}
J.ca.prototype={
gT(a){return 0},
q(a){return String(a)}}
J.cc.prototype={
gT(a){return 0},
q(a){return String(a)}}
J.r.prototype={
aV(a,b){return new A.aK(a,A.f(a).h("@<1>").I(b).h("aK<1,2>"))},
l(a,b){A.f(a).c.a(b)
a.$flags&1&&A.bc(a,29)
a.push(b)},
aw(a,b){var s
a.$flags&1&&A.bc(a,"remove",1)
for(s=0;s<a.length;++s)if(J.aE(a[s],b)){a.splice(s,1)
return!0}return!1},
J(a,b){var s
A.f(a).h("b<1>").a(b)
a.$flags&1&&A.bc(a,"addAll",2)
if(Array.isArray(b)){this.cI(a,b)
return}for(s=J.A(b);s.j();)a.push(s.gn())},
cI(a,b){var s,r
t.V.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.i(A.a3(a))
for(r=0;r<s;++r)a.push(b[r])},
bn(a){a.$flags&1&&A.bc(a,"clear","clear")
a.length=0},
dt(a,b){var s,r=A.jT(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.A(r,s,A.t(a[s]))
return r.join(b)},
cn(a,b){return A.R(a,0,A.W(b,"count",t.S),A.f(a).c)},
a3(a,b){return A.R(a,b,null,A.f(a).c)},
ai(a,b){var s,r,q
A.f(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.i(A.a0())
if(0>=s)return A.w(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.i(A.a3(a))}return r},
H(a,b,c,d){var s,r,q
d.a(b)
A.f(a).I(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.i(A.a3(a))}return r},
av(a,b){var s,r,q
A.f(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.i(A.a3(a))}throw A.i(A.a0())},
N(a,b){if(!(b>=0&&b<a.length))return A.w(a,b)
return a[b]},
gF(a){if(a.length>0)return a[0]
throw A.i(A.a0())},
gU(a){var s=a.length
if(s>0)return a[s-1]
throw A.i(A.a0())},
D(a,b){var s,r
A.f(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.i(A.a3(a))}return!1},
aW(a,b){var s,r
A.f(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.i(A.a3(a))}return!0},
C(a,b){var s,r,q,p,o,n=A.f(a)
n.h("a(1,1)?").a(b)
a.$flags&2&&A.bc(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.n4()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dS()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.dM(b,2))
if(p>0)this.cZ(a,p)},
bz(a){return this.C(a,null)},
cZ(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
p(a,b){var s
for(s=0;s<a.length;++s)if(J.aE(a[s],b))return!0
return!1},
gO(a){return a.length===0},
gaa(a){return a.length!==0},
q(a){return A.jQ(a,"[","]")},
gB(a){return new J.bf(a,a.length,A.f(a).h("bf<1>"))},
gT(a){return A.ds(a)},
gk(a){return a.length},
sk(a,b){a.$flags&1&&A.bc(a,"set length","change the length of")
if(b<0)throw A.i(A.aQ(b,0,null,"newLength",null))
if(b>a.length)A.f(a).c.a(null)
a.length=b},
i(a,b){A.h(b)
if(!(b>=0&&b<a.length))throw A.i(A.jx(a,b))
return a[b]},
A(a,b,c){A.f(a).c.a(c)
a.$flags&2&&A.bc(a)
if(!(b>=0&&b<a.length))throw A.i(A.jx(a,b))
a[b]=c},
$im:1,
$ib:1,
$iq:1}
J.db.prototype={
dM(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.dt(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.ht.prototype={}
J.bf.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.z(q)
throw A.i(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iB:1}
J.bB.prototype={
t(a,b){var s
A.u(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaY(b)
if(this.gaY(a)===s)return 0
if(this.gaY(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaY(a){return a===0?1/a<0:a<0},
m(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.i(A.bq(""+a+".toInt()"))},
an(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.i(A.bq(""+a+".ceil()"))},
a0(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.i(A.bq(""+a+".floor()"))},
aM(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.i(A.bq(""+a+".round()"))},
v(a,b,c){if(B.c.t(b,c)>0)throw A.i(A.ny(b))
if(this.t(a,b)<0)return b
if(this.t(a,c)>0)return c
return a},
b1(a,b){var s
if(b>20)throw A.i(A.aQ(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaY(a))return"-"+s
return s},
q(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gT(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
aC(a,b){return a+b},
cB(a,b){return a-b},
b4(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.bW(a,b)},
bk(a,b){return(a|0)===a?a/b|0:this.bW(a,b)},
bW(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.i(A.bq("Result of truncating division is "+A.t(s)+": "+A.t(a)+" ~/ "+A.t(b)))},
bT(a,b){var s
if(a>0)s=this.d3(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
d3(a,b){return b>31?0:a>>>b},
gV(a){return A.aX(t.H)},
$iav:1,
$ij:1,
$ia_:1}
J.c8.prototype={
gV(a){return A.aX(t.S)},
$iE:1,
$ia:1}
J.dd.prototype={
gV(a){return A.aX(t.i)},
$iE:1}
J.bk.prototype={
aP(a,b,c){return a.substring(b,A.me(b,c,a.length))},
bw(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.i(B.a1)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
dw(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bw(c,s)+a},
t(a,b){var s
A.L(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
q(a){return a},
gT(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gV(a){return A.aX(t.N)},
gk(a){return a.length},
$iE:1,
$iav:1,
$iF:1}
A.b6.prototype={
gB(a){return new A.bV(J.A(this.gab()),A.k(this).h("bV<1,2>"))},
gk(a){return J.N(this.gab())},
gO(a){return J.dO(this.gab())},
gaa(a){return J.kk(this.gab())},
a3(a,b){var s=A.k(this)
return A.ku(J.dP(this.gab(),b),s.c,s.y[1])},
N(a,b){return A.k(this).y[1].a(J.cV(this.gab(),b))},
gF(a){return A.k(this).y[1].a(J.cW(this.gab()))},
gU(a){return A.k(this).y[1].a(J.jM(this.gab()))},
q(a){return J.aZ(this.gab())}}
A.bV.prototype={
j(){return this.a.j()},
gn(){return this.$ti.y[1].a(this.a.gn())},
$iB:1}
A.bg.prototype={
gab(){return this.a}}
A.cA.prototype={$im:1}
A.cz.prototype={
i(a,b){return this.$ti.y[1].a(J.ar(this.a,b))},
A(a,b,c){var s=this.$ti
J.ly(this.a,b,s.c.a(s.y[1].a(c)))},
sk(a,b){J.lA(this.a,b)},
l(a,b){var s=this.$ti
J.kh(this.a,s.c.a(s.y[1].a(b)))},
$im:1,
$iq:1}
A.aK.prototype={
aV(a,b){return new A.aK(this.a,this.$ti.h("@<1>").I(b).h("aK<1,2>"))},
gab(){return this.a}}
A.ce.prototype={
q(a){return"LateInitializationError: "+this.a}}
A.iF.prototype={}
A.m.prototype={}
A.l.prototype={
gB(a){var s=this
return new A.p(s,s.gk(s),A.k(s).h("p<l.E>"))},
gO(a){return this.gk(this)===0},
gF(a){if(this.gk(this)===0)throw A.i(A.a0())
return this.N(0,0)},
gU(a){var s=this
if(s.gk(s)===0)throw A.i(A.a0())
return s.N(0,s.gk(s)-1)},
aW(a,b){var s,r,q=this
A.k(q).h("e(l.E)").a(b)
s=q.gk(q)
for(r=0;r<s;++r){if(!b.$1(q.N(0,r)))return!1
if(s!==q.gk(q))throw A.i(A.a3(q))}return!0},
cf(a,b,c){var s=A.k(this)
return new A.O(this,s.I(c).h("1(l.E)").a(b),s.h("@<l.E>").I(c).h("O<1,2>"))},
ai(a,b){var s,r,q,p=this
A.k(p).h("l.E(l.E,l.E)").a(b)
s=p.gk(p)
if(s===0)throw A.i(A.a0())
r=p.N(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.N(0,q))
if(s!==p.gk(p))throw A.i(A.a3(p))}return r},
H(a,b,c,d){var s,r,q,p=this
d.a(b)
A.k(p).I(d).h("1(1,l.E)").a(c)
s=p.gk(p)
for(r=b,q=0;q<s;++q){r=c.$2(r,p.N(0,q))
if(s!==p.gk(p))throw A.i(A.a3(p))}return r},
a3(a,b){return A.R(this,b,null,A.k(this).h("l.E"))},
dL(a){var s,r=this,q=A.m6(A.k(r).h("l.E"))
for(s=0;s<r.gk(r);++s)q.l(0,r.N(0,s))
return q}}
A.y.prototype={
W(a,b,c,d){var s,r=this.b
A.aR(r,"start")
s=this.c
if(s!=null){A.aR(s,"end")
if(r>s)throw A.i(A.aQ(r,0,s,"start",null))}},
gcQ(){var s=J.N(this.a),r=this.c
if(r==null||r>s)return s
return r},
gd5(){var s=J.N(this.a),r=this.b
if(r>s)return s
return r},
gk(a){var s,r=J.N(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
N(a,b){var s=this,r=s.gd5()+b
if(b<0||r>=s.gcQ())throw A.i(A.hs(b,s.gk(0),s,"index"))
return J.cV(s.a,r)},
a3(a,b){var s,r,q=this
A.aR(b,"count")
s=B.c.aC(q.b,b)
r=q.c
if(r!=null&&s>=r)return new A.c2(q.$ti.h("c2<1>"))
return A.R(q.a,s,r,q.$ti.c)},
ap(a){var s,r,q,p=this,o=p.b,n=p.a,m=J.aH(n),l=m.gk(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.kx(0,p.$ti.c)
return n}r=A.jT(s,m.N(n,o),!0,p.$ti.c)
for(q=1;q<s;++q){B.a.A(r,q,m.N(n,o+q))
if(m.gk(n)<l)throw A.i(A.a3(p))}return r}}
A.p.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=J.aH(q),o=p.gk(q)
if(r.b!==o)throw A.i(A.a3(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.N(q,s);++r.c
return!0},
$iB:1}
A.bn.prototype={
gB(a){return new A.ch(J.A(this.a),this.b,A.k(this).h("ch<1,2>"))},
gk(a){return J.N(this.a)},
gO(a){return J.dO(this.a)},
gF(a){return this.b.$1(J.cW(this.a))},
gU(a){return this.b.$1(J.jM(this.a))},
N(a,b){return this.b.$1(J.cV(this.a,b))}}
A.c0.prototype={$im:1}
A.ch.prototype={
j(){var s=this,r=s.b
if(r.j()){s.a=s.c.$1(r.gn())
return!0}s.a=null
return!1},
gn(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iB:1}
A.O.prototype={
gk(a){return J.N(this.a)},
N(a,b){return this.b.$1(J.cV(this.a,b))}}
A.d.prototype={
gB(a){return new A.V(J.A(this.a),this.b,this.$ti.h("V<1>"))}}
A.V.prototype={
j(){var s,r
for(s=this.a,r=this.b;s.j();)if(r.$1(s.gn()))return!0
return!1},
gn(){return this.a.gn()},
$iB:1}
A.c5.prototype={
gB(a){return new A.c6(J.A(this.a),this.b,B.H,this.$ti.h("c6<1,2>"))}}
A.c6.prototype={
gn(){var s=this.d
return s==null?this.$ti.y[1].a(s):s},
j(){var s,r,q=this,p=q.c
if(p==null)return!1
for(s=q.a,r=q.b;!p.j();){q.d=null
if(s.j()){q.c=null
p=J.A(r.$1(s.gn()))
q.c=p}else return!1}q.d=q.c.gn()
return!0},
$iB:1}
A.bo.prototype={
gB(a){var s=this.a
return new A.bp(s.gB(s),this.b,A.k(this).h("bp<1>"))}}
A.c1.prototype={
gk(a){var s=this.a,r=s.gk(s)
s=this.b
if(r>s)return s
return r},
$im:1}
A.bp.prototype={
j(){if(--this.b>=0)return this.a.j()
this.b=-1
return!1},
gn(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gn()},
$iB:1}
A.cr.prototype={
a3(a,b){this.b.aC(0,A.cS(b))
return void 1},
gB(a){var s=this.a
return new A.cs(s.gB(s),this.b,A.k(this).h("cs<1>"))}}
A.hq.prototype={
gk(a){var s=this.a,r=B.c.cB(s.gk(s),this.b)
if(r>=0)return r
return 0},
a3(a,b){this.b.aC(0,A.cS(b))
return void 1},
$im:1}
A.cs.prototype={
j(){var s,r
for(s=this.a,r=0;r<this.b;++r)s.j()
this.b=0
return s.j()},
gn(){return this.a.gn()},
$iB:1}
A.c2.prototype={
gB(a){return B.H},
gO(a){return!0},
gk(a){return 0},
gF(a){throw A.i(A.a0())},
gU(a){throw A.i(A.a0())},
N(a,b){throw A.i(A.aQ(b,0,0,"index",null))},
a3(a,b){A.aR(b,"count")
return this}}
A.c3.prototype={
j(){return!1},
gn(){throw A.i(A.a0())},
$iB:1}
A.cx.prototype={
gB(a){return new A.cy(J.A(this.a),this.$ti.h("cy<1>"))}}
A.cy.prototype={
j(){var s,r
for(s=this.a,r=this.$ti.c;s.j();)if(r.b(s.gn()))return!0
return!1},
gn(){return this.$ti.c.a(this.a.gn())},
$iB:1}
A.c7.prototype={
gk(a){return J.N(this.a)},
gO(a){return J.dO(this.a)},
gaa(a){return J.kk(this.a)},
gF(a){return new A.aG(this.b,J.cW(this.a))},
N(a,b){return new A.aG(b+this.b,J.cV(this.a,b))},
a3(a,b){J.dP(this.a,A.cS(b))
b.aC(0,this.b)
return void 1},
gB(a){return new A.bj(J.A(this.a),this.b,A.k(this).h("bj<1>"))}}
A.c_.prototype={
gU(a){var s,r=this.a,q=J.aH(r),p=q.gk(r)
if(p<=0)throw A.i(A.a0())
s=q.gU(r)
if(p!==q.gk(r))throw A.i(A.a3(this))
return new A.aG(p-1+this.b,s)},
a3(a,b){J.dP(this.a,A.cS(b))
B.c.aC(this.b,b)
return void 1},
$im:1}
A.bj.prototype={
j(){if(++this.c>=0&&this.a.j())return!0
this.c=-2
return!1},
gn(){var s=this.c
return s>=0?new A.aG(this.b+s,this.a.gn()):A.aC(A.a0())},
$iB:1}
A.J.prototype={
sk(a,b){throw A.i(A.bq("Cannot change the length of a fixed-length list"))},
l(a,b){A.aI(a).h("J.E").a(b)
throw A.i(A.bq("Cannot add to a fixed-length list"))}}
A.K.prototype={
gk(a){return J.N(this.a)},
N(a,b){var s=this.a,r=J.aH(s)
return r.N(s,r.gk(s)-1-b)}}
A.cQ.prototype={}
A.aG.prototype={$r:"+(1,2)",$s:1}
A.cH.prototype={$r:"+hero,route(1,2)",$s:2}
A.bv.prototype={$r:"+x,y(1,2)",$s:3}
A.aA.prototype={$r:"+breakthrough,lower,teamSize,upper(1,2,3,4)",$s:4}
A.bY.prototype={}
A.bX.prototype={
gO(a){return this.gk(this)===0},
q(a){return A.hB(this)},
gaB(){return new A.aB(this.dm(),A.k(this).h("aB<ac<1,2>>"))},
dm(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gaB(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.gaf(),o=o.gB(o),n=A.k(s),m=n.y[1],n=n.h("ac<1,2>")
case 2:if(!o.j()){r=3
break}l=o.gn()
k=s.i(0,l)
r=4
return a.b=new A.ac(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$iab:1}
A.bZ.prototype={
gk(a){return this.b.length},
gbM(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
Z(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
i(a,b){if(!this.Z(b))return null
return this.b[this.a[b]]},
ad(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbM()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gaf(){return new A.cB(this.gbM(),this.$ti.h("cB<1>"))}}
A.cB.prototype={
gk(a){return this.a.length},
gO(a){return 0===this.a.length},
gaa(a){return 0!==this.a.length},
gB(a){var s=this.a
return new A.cC(s,s.length,this.$ti.h("cC<1>"))}}
A.cC.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iB:1}
A.d9.prototype={
aj(a,b){if(b==null)return!1
return b instanceof A.aM&&this.a.aj(0,b.a)&&A.ka(this)===A.ka(b)},
gT(a){return A.jV(this.a,A.ka(this),B.n,B.n)},
q(a){var s=B.a.dt([A.aX(this.$ti.c)],", ")
return this.a.q(0)+" with "+("<"+s+">")}}
A.aM.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.nQ(A.jw(this.a),this.$ti)}}
A.hW.prototype={
$0(){return B.b.a0(1000*this.a.now())},
$S:12}
A.cq.prototype={}
A.iU.prototype={
ag(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
if(p==null)return null
s=Object.create(null)
r=q.b
if(r!==-1)s.arguments=p[r+1]
r=q.c
if(r!==-1)s.argumentsExpr=p[r+1]
r=q.d
if(r!==-1)s.expr=p[r+1]
r=q.e
if(r!==-1)s.method=p[r+1]
r=q.f
if(r!==-1)s.receiver=p[r+1]
return s}}
A.cm.prototype={
q(a){return"Null check operator used on a null value"}}
A.de.prototype={
q(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.dy.prototype={
q(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hD.prototype={
q(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.c4.prototype={}
A.cJ.prototype={
q(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ib5:1}
A.a9.prototype={
q(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.ll(r==null?"unknown":r)+"'"},
$iaL:1,
gdQ(){return this},
$C:"$1",
$R:1,
$D:null}
A.d0.prototype={$C:"$0",$R:0}
A.d1.prototype={$C:"$2",$R:2}
A.dw.prototype={}
A.dv.prototype={
q(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.ll(s)+"'"}}
A.bz.prototype={
aj(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bz))return!1
return this.$_target===b.$_target&&this.a===b.a},
gT(a){return(A.lg(this.a)^A.ds(this.$_target))>>>0},
q(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.dt(this.a)+"'")}}
A.du.prototype={
q(a){return"RuntimeError: "+this.a}}
A.aN.prototype={
gk(a){return this.a},
gO(a){return this.a===0},
gaf(){return new A.aa(this,A.k(this).h("aa<1>"))},
gaB(){return new A.aO(this,A.k(this).h("aO<1,2>"))},
Z(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dq(a)},
dq(a){var s=this.d
if(s==null)return!1
return this.bp(this.bL(s,a),a)>=0},
J(a,b){A.k(this).h("ab<1,2>").a(b).ad(0,new A.hu(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.dr(b)},
dr(a){var s,r,q=this.d
if(q==null)return null
s=this.bL(q,a)
r=this.bp(s,a)
if(r<0)return null
return s[r].b},
A(a,b,c){var s,r,q=this,p=A.k(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bD(s==null?q.b=q.bh():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bD(r==null?q.c=q.bh():r,b,c)}else q.ds(b,c)},
ds(a,b){var s,r,q,p,o=this,n=A.k(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.bh()
r=o.ce(a)
q=s[r]
if(q==null)s[r]=[o.bi(a,b)]
else{p=o.bp(q,a)
if(p>=0)q[p].b=b
else q.push(o.bi(a,b))}},
bs(a,b){var s,r,q=this,p=A.k(q)
p.c.a(a)
p.h("2()").a(b)
if(q.Z(a)){s=q.i(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.A(0,a,r)
return r},
aw(a,b){var s=this.cF(this.b,b)
return s},
bn(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.bg()}},
ad(a,b){var s,r,q=this
A.k(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.i(A.a3(q))
s=s.c}},
bD(a,b,c){var s,r=A.k(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.bi(b,c)
else s.b=c},
cF(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.cG(s)
delete a[b]
return s.b},
bg(){this.r=this.r+1&1073741823},
bi(a,b){var s=this,r=A.k(s),q=new A.hy(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.bg()
return q},
cG(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.bg()},
ce(a){return J.aj(a)&1073741823},
bL(a,b){return a[this.ce(b)]},
bp(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aE(a[r].a,b))return r
return-1},
q(a){return A.hB(this)},
bh(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ikz:1}
A.hu.prototype={
$2(a,b){var s=this.a,r=A.k(s)
s.A(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.k(this.a).h("~(1,2)")}}
A.hy.prototype={}
A.aa.prototype={
gk(a){return this.a.a},
gO(a){return this.a.a===0},
gB(a){var s=this.a
return new A.bl(s,s.r,s.e,this.$ti.h("bl<1>"))},
p(a,b){return this.a.Z(b)}}
A.bl.prototype={
gn(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.i(A.a3(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iB:1}
A.T.prototype={
gk(a){return this.a.a},
gO(a){return this.a.a===0},
gB(a){var s=this.a
return new A.al(s,s.r,s.e,this.$ti.h("al<1>"))}}
A.al.prototype={
gn(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.i(A.a3(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iB:1}
A.aO.prototype={
gk(a){return this.a.a},
gO(a){return this.a.a===0},
gB(a){var s=this.a
return new A.cf(s,s.r,s.e,this.$ti.h("cf<1,2>"))}}
A.cf.prototype={
gn(){var s=this.d
s.toString
return s},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.i(A.a3(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.ac(s.a,s.b,r.$ti.h("ac<1,2>"))
r.c=s.c
return!0}},
$iB:1}
A.jA.prototype={
$1(a){return this.a(a)},
$S:20}
A.jB.prototype={
$2(a,b){return this.a(a,b)},
$S:49}
A.jC.prototype={
$1(a){return this.a(A.L(a))},
$S:42}
A.az.prototype={
q(a){return this.bY(!1)},
bY(a){var s,r,q,p,o,n=this.cR(),m=this.bf(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.w(m,q)
o=m[q]
l=a?l+A.kD(o):l+A.t(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
cR(){var s,r=this.$s
while($.jf.length<=r)B.a.l($.jf,null)
s=$.jf[r]
if(s==null){s=this.cO()
B.a.A($.jf,r,s)}return s},
cO(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.c(new Array(l),t.L)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.A(k,q,r[s])}}return A.aP(k,t.K)}}
A.b7.prototype={
bf(){return[this.a,this.b]},
aj(a,b){if(b==null)return!1
return b instanceof A.b7&&this.$s===b.$s&&J.aE(this.a,b.a)&&J.aE(this.b,b.b)},
gT(a){return A.jV(this.$s,this.a,this.b,B.n)}}
A.bJ.prototype={
bf(){return this.a},
aj(a,b){if(b==null)return!1
return b instanceof A.bJ&&this.$s===b.$s&&A.mA(this.a,b.a)},
gT(a){return A.jV(this.$s,A.m9(this.a),B.n,B.n)}}
A.bD.prototype={
gV(a){return B.an},
$iE:1}
A.ck.prototype={}
A.dg.prototype={
gV(a){return B.ao},
$iE:1}
A.bE.prototype={
gk(a){return a.length},
$iak:1}
A.ci.prototype={
i(a,b){A.aW(b,a,a.length)
return a[b]},
A(a,b,c){A.am(c)
a.$flags&2&&A.bc(a)
A.aW(b,a,a.length)
a[b]=c},
$im:1,
$ib:1,
$iq:1}
A.cj.prototype={
A(a,b,c){A.h(c)
a.$flags&2&&A.bc(a)
A.aW(b,a,a.length)
a[b]=c},
$im:1,
$ib:1,
$iq:1}
A.dh.prototype={
gV(a){return B.ap},
$iE:1}
A.di.prototype={
gV(a){return B.aq},
$iE:1}
A.dj.prototype={
gV(a){return B.ar},
i(a,b){A.aW(b,a,a.length)
return a[b]},
$iE:1}
A.dk.prototype={
gV(a){return B.as},
i(a,b){A.aW(b,a,a.length)
return a[b]},
$iE:1}
A.dl.prototype={
gV(a){return B.at},
i(a,b){A.aW(b,a,a.length)
return a[b]},
$iE:1}
A.dm.prototype={
gV(a){return B.av},
i(a,b){A.aW(b,a,a.length)
return a[b]},
$iE:1}
A.dn.prototype={
gV(a){return B.aw},
i(a,b){A.aW(b,a,a.length)
return a[b]},
$iE:1}
A.cl.prototype={
gV(a){return B.ax},
gk(a){return a.length},
i(a,b){A.aW(b,a,a.length)
return a[b]},
$iE:1}
A.dp.prototype={
gV(a){return B.ay},
gk(a){return a.length},
i(a,b){A.h(b)
A.aW(b,a,a.length)
return a[b]},
$iE:1,
$ijZ:1}
A.cD.prototype={}
A.cE.prototype={}
A.cF.prototype={}
A.cG.prototype={}
A.aw.prototype={
h(a){return A.cN(v.typeUniverse,this,a)},
I(a){return A.kW(v.typeUniverse,this,a)}}
A.dD.prototype={}
A.jj.prototype={
q(a){return A.ae(this.a,null)}}
A.dC.prototype={
q(a){return this.a}}
A.bK.prototype={$iaT:1}
A.iX.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:29}
A.iW.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:37}
A.iY.prototype={
$0(){this.a.$0()},
$S:31}
A.iZ.prototype={
$0(){this.a.$0()},
$S:31}
A.jh.prototype={
cE(a,b){if(self.setTimeout!=null)self.setTimeout(A.dM(new A.ji(this,b),0),a)
else throw A.i(A.bq("`setTimeout()` not found."))}}
A.ji.prototype={
$0(){this.b.$0()},
$S:4}
A.dz.prototype={}
A.jn.prototype={
$1(a){return this.a.$2(0,a)},
$S:66}
A.jo.prototype={
$2(a,b){this.a.$2(1,new A.c4(a,t.l.a(b)))},
$S:59}
A.js.prototype={
$2(a,b){this.a(A.h(a),b)},
$S:58}
A.aV.prototype={
gn(){var s=this.b
return s==null?this.$ti.c.a(s):s},
d_(a,b){var s,r,q
a=A.h(a)
b=b
s=this.a
for(;;)try{r=s(this,a,b)
return r}catch(q){b=q
a=1}},
j(){var s,r,q,p,o=this,n=null,m=0
for(;;){s=o.d
if(s!=null)try{if(s.j()){o.b=s.gn()
return!0}else o.d=null}catch(r){n=r
m=1
o.d=null}q=o.d_(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.kQ
return!1}if(0>=p.length)return A.w(p,-1)
o.a=p.pop()
m=0
n=null
continue}if(2===q){m=0
n=null
continue}if(3===q){n=o.c
o.c=null
p=o.e
if(p==null||p.length===0){o.b=null
o.a=A.kQ
throw n
return!1}if(0>=p.length)return A.w(p,-1)
o.a=p.pop()
m=1
continue}throw A.i(A.iJ("sync*"))}return!1},
c_(a){var s,r,q=this
if(a instanceof A.aB){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.l(r,q.a)
q.a=s
return 2}else{q.d=J.A(a)
return 2}},
$iB:1}
A.aB.prototype={
gB(a){return new A.aV(this.a(),this.$ti.h("aV<1>"))}}
A.at.prototype={
q(a){return A.t(this.a)},
$iG:1,
gaO(){return this.b}}
A.hr.prototype={
$0(){this.c.a(null)
this.b.cM(null)},
$S:4}
A.br.prototype={
du(a){if((this.c&15)!==6)return!0
return this.b.b.bu(t.al.a(this.d),a.a,t.y,t.K)},
dn(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.dH(q,m,a.b,o,n,t.l)
else p=l.bu(t.A.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.aY(s))){if((r.c&1)!==0)throw A.i(A.cY("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.i(A.cY("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.a1.prototype={
co(a,b,c){var s,r,q=this.$ti
q.I(c).h("1/(2)").a(a)
s=$.S
if(s===B.m){if(!t.C.b(b)&&!t.A.b(b))throw A.i(A.eI(b,"onError",u.c))}else{c.h("@<0/>").I(q.c).h("1(2)").a(a)
b=A.nm(b,s)}r=new A.a1(s,c.h("a1<0>"))
this.b5(new A.br(r,3,a,b,q.h("@<1>").I(c).h("br<1,2>")))
return r},
bX(a,b,c){var s,r=this.$ti
r.I(c).h("1/(2)").a(a)
s=new A.a1($.S,c.h("a1<0>"))
this.b5(new A.br(s,19,a,b,r.h("@<1>").I(c).h("br<1,2>")))
return s},
d1(a){this.a=this.a&1|16
this.c=a},
aQ(a){this.a=a.a&30|this.a&1
this.c=a.c},
b5(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.b5(a)
return}r.aQ(s)}A.dK(null,null,r.b,t.M.a(new A.j0(r,a)))}},
bQ(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.bQ(a)
return}m.aQ(n)}l.a=m.aS(a)
A.dK(null,null,m.b,t.M.a(new A.j5(l,m)))}},
aH(){var s=t.F.a(this.c)
this.c=null
return this.aS(s)},
aS(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
cM(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("b1<1>").b(a))A.j3(a,r,!0)
else{s=r.aH()
q.c.a(a)
r.a=8
r.c=a
A.bs(r,s)}},
bJ(a){var s,r=this
r.$ti.c.a(a)
s=r.aH()
r.a=8
r.c=a
A.bs(r,s)},
cN(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aH()
q.aQ(a)
A.bs(q,r)},
b9(a){var s=this.aH()
this.d1(a)
A.bs(this,s)},
cK(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("b1<1>").b(a)){this.bH(a)
return}this.cL(a)},
cL(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dK(null,null,s.b,t.M.a(new A.j2(s,a)))},
bH(a){A.j3(this.$ti.h("b1<1>").a(a),this,!1)
return},
bF(a){this.a^=2
A.dK(null,null,this.b,t.M.a(new A.j1(this,a)))},
$ib1:1}
A.j0.prototype={
$0(){A.bs(this.a,this.b)},
$S:4}
A.j5.prototype={
$0(){A.bs(this.b,this.a.a)},
$S:4}
A.j4.prototype={
$0(){A.j3(this.a.a,this.b,!0)},
$S:4}
A.j2.prototype={
$0(){this.a.bJ(this.b)},
$S:4}
A.j1.prototype={
$0(){this.a.b9(this.b)},
$S:4}
A.j8.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dG(t.fO.a(q.d),t.z)}catch(p){s=A.aY(p)
r=A.bS(p)
if(k.c&&t.u.a(k.b.a.c).a===s){q=k.a
q.c=t.u.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.jN(q)
n=k.a
n.c=new A.at(q,o)
q=n}q.b=!0
return}if(j instanceof A.a1&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.u.a(j.c)
q.b=!0}return}if(j instanceof A.a1){m=k.b.a
l=new A.a1(m.b,m.$ti)
j.co(new A.j9(l,m),new A.ja(l),t.o)
q=k.a
q.c=l
q.b=!1}},
$S:4}
A.j9.prototype={
$1(a){this.a.cN(this.b)},
$S:29}
A.ja.prototype={
$2(a,b){A.cR(a)
t.l.a(b)
this.a.b9(new A.at(a,b))},
$S:33}
A.j7.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bu(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aY(l)
r=A.bS(l)
q=s
p=r
if(p==null)p=A.jN(q)
o=this.a
o.c=new A.at(q,p)
o.b=!0}},
$S:4}
A.j6.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.u.a(l.a.a.c)
p=l.b
if(p.a.du(s)&&p.a.e!=null){p.c=p.a.dn(s)
p.b=!1}}catch(o){r=A.aY(o)
q=A.bS(o)
p=t.u.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.jN(p)
m=l.b
m.c=new A.at(p,n)
p=m}p.b=!0}},
$S:4}
A.dA.prototype={}
A.dI.prototype={}
A.cP.prototype={$ikL:1}
A.dH.prototype={
dI(a){var s,r,q
t.M.a(a)
try{if(B.m===$.S){a.$0()
return}A.l3(null,null,this,a,t.o)}catch(q){s=A.aY(q)
r=A.bS(q)
A.k5(A.cR(s),t.l.a(r))}},
c4(a){return new A.jg(this,t.M.a(a))},
dG(a,b){b.h("0()").a(a)
if($.S===B.m)return a.$0()
return A.l3(null,null,this,a,b)},
bu(a,b,c,d){c.h("@<0>").I(d).h("1(2)").a(a)
d.a(b)
if($.S===B.m)return a.$1(b)
return A.no(null,null,this,a,b,c,d)},
dH(a,b,c,d,e,f){d.h("@<0>").I(e).I(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.S===B.m)return a.$2(b,c)
return A.nn(null,null,this,a,b,c,d,e,f)},
cm(a,b,c,d){return b.h("@<0>").I(c).I(d).h("1(2,3)").a(a)}}
A.jg.prototype={
$0(){return this.a.dI(this.b)},
$S:4}
A.jr.prototype={
$0(){A.lS(this.a,this.b)},
$S:4}
A.ax.prototype={
cU(){return new A.ax(A.k(this).h("ax<1>"))},
gB(a){var s=this,r=new A.bt(s,s.r,A.k(s).h("bt<1>"))
r.c=s.e
return r},
gk(a){return this.a},
gO(a){return this.a===0},
gaa(a){return this.a!==0},
p(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cP(b)},
cP(a){var s=this.d
if(s==null)return!1
return this.be(s[this.ba(a)],a)>=0},
gF(a){var s=this.e
if(s==null)throw A.i(A.iJ("No elements"))
return A.k(this).c.a(s.a)},
gU(a){var s=this.f
if(s==null)throw A.i(A.iJ("No elements"))
return A.k(this).c.a(s.a)},
l(a,b){var s,r,q=this
A.k(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bI(s==null?q.b=A.k_():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bI(r==null?q.c=A.k_():r,b)}else return q.cH(b)},
cH(a){var s,r,q,p=this
A.k(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.k_()
r=p.ba(a)
q=s[r]
if(q==null)s[r]=[p.b8(a)]
else{if(p.be(q,a)>=0)return!1
q.push(p.b8(a))}return!0},
aw(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bS(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bS(s.c,b)
else return s.cY(b)},
cY(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.ba(a)
r=n[s]
q=o.be(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bZ(p)
return!0},
bI(a,b){A.k(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.b8(b)
return!0},
bS(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bZ(s)
delete a[b]
return!0},
b7(){this.r=this.r+1&1073741823},
b8(a){var s,r=this,q=new A.dG(A.k(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.b7()
return q},
bZ(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.b7()},
ba(a){return J.aj(a)&1073741823},
be(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aE(a[r].a,b))return r
return-1},
$ikB:1}
A.dG.prototype={}
A.bt.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.i(A.a3(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iB:1}
A.hz.prototype={
$2(a,b){this.a.A(0,this.b.a(a),this.c.a(b))},
$S:47}
A.v.prototype={
gB(a){return new A.p(a,this.gk(a),A.aI(a).h("p<v.E>"))},
N(a,b){return this.i(a,b)},
gO(a){return this.gk(a)===0},
gaa(a){return!this.gO(a)},
gF(a){if(this.gk(a)===0)throw A.i(A.a0())
return this.i(a,0)},
gU(a){if(this.gk(a)===0)throw A.i(A.a0())
return this.i(a,this.gk(a)-1)},
a3(a,b){return A.R(a,b,null,A.aI(a).h("v.E"))},
l(a,b){var s
A.aI(a).h("v.E").a(b)
s=this.gk(a)
this.sk(a,s+1)
this.A(a,s,b)},
aV(a,b){return new A.aK(a,A.aI(a).h("@<v.E>").I(b).h("aK<1,2>"))},
q(a){return A.jQ(a,"[","]")}}
A.H.prototype={
ad(a,b){var s,r,q,p=A.k(this)
p.h("~(H.K,H.V)").a(b)
for(s=this.gaf(),s=s.gB(s),p=p.h("H.V");s.j();){r=s.gn()
q=this.i(0,r)
b.$2(r,q==null?p.a(q):q)}},
cp(a,b,c){var s,r=this,q=A.k(r)
q.h("H.K").a(a)
q.h("H.V(H.V)").a(b)
q.h("H.V()?").a(c)
if(r.Z(a)){s=r.i(0,a)
q=b.$1(s==null?q.h("H.V").a(s):s)
r.A(0,a,q)
return q}q=c.$0()
r.A(0,a,q)
return q},
gaB(){return this.gaf().cf(0,new A.hA(this),A.k(this).h("ac<H.K,H.V>"))},
Z(a){return this.gaf().p(0,a)},
gk(a){var s=this.gaf()
return s.gk(s)},
gO(a){var s=this.gaf()
return s.gO(s)},
q(a){return A.hB(this)},
$iab:1}
A.hA.prototype={
$1(a){var s=this.a,r=A.k(s)
r.h("H.K").a(a)
s=s.i(0,a)
if(s==null)s=r.h("H.V").a(s)
return new A.ac(a,s,r.h("ac<H.K,H.V>"))},
$S(){return A.k(this.a).h("ac<H.K,H.V>(H.K)")}}
A.hC.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.t(a)
r.a=(r.a+=s)+": "
s=A.t(b)
r.a+=s},
$S:25}
A.cO.prototype={}
A.bC.prototype={
i(a,b){return this.a.i(0,b)},
ad(a,b){this.a.ad(0,this.$ti.h("~(1,2)").a(b))},
gO(a){return this.a.a===0},
gk(a){return this.a.a},
q(a){return A.hB(this.a)},
gaB(){var s=this.a
return new A.aO(s,A.k(s).h("aO<1,2>"))},
$iab:1}
A.cv.prototype={}
A.bF.prototype={
gO(a){return this.a===0},
gaa(a){return this.a!==0},
J(a,b){var s
A.k(this).h("b<1>").a(b)
for(s=b.gB(b);s.j();)this.l(0,s.gn())},
q(a){return A.jQ(this,"{","}")},
H(a,b,c,d){var s,r,q,p
d.a(b)
s=A.k(this)
s.I(d).h("1(1,2)").a(c)
for(s=A.bI(this,this.r,s.c),r=s.$ti.c,q=b;s.j();){p=s.d
q=c.$2(q,p==null?r.a(p):p)}return q},
D(a,b){var s,r,q=A.k(this)
q.h("e(1)").a(b)
for(q=A.bI(this,this.r,q.c),s=q.$ti.c;q.j();){r=q.d
if(b.$1(r==null?s.a(r):r))return!0}return!1},
a3(a,b){return A.kG(this,b,A.k(this).c)},
gF(a){var s,r=A.bI(this,this.r,A.k(this).c)
if(!r.j())throw A.i(A.a0())
s=r.d
return s==null?r.$ti.c.a(s):s},
gU(a){var s,r,q=A.bI(this,this.r,A.k(this).c)
if(!q.j())throw A.i(A.a0())
s=q.$ti.c
do{r=q.d
if(r==null)r=s.a(r)}while(q.j())
return r},
N(a,b){var s,r,q,p=this
A.aR(b,"index")
s=A.bI(p,p.r,A.k(p).c)
for(r=b;s.j();){if(r===0){q=s.d
return q==null?s.$ti.c.a(q):q}--r}throw A.i(A.hs(b,b-r,p,"index"))},
$im:1,
$ib:1,
$ijX:1}
A.cI.prototype={
dk(a){var s,r,q,p=this,o=p.cU()
for(s=A.bI(p,p.r,A.k(p).c),r=s.$ti.c;s.j();){q=s.d
if(q==null)q=r.a(q)
if(!a.p(0,q))o.l(0,q)}return o}}
A.bL.prototype={}
A.dE.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cW(b):s}},
gk(a){return this.b==null?this.c.a:this.aG().length},
gO(a){return this.gk(0)===0},
gaf(){if(this.b==null){var s=this.c
return new A.aa(s,A.k(s).h("aa<1>"))}return new A.dF(this)},
A(a,b,c){var s,r,q=this
A.L(b)
if(q.b==null)q.c.A(0,b,c)
else if(q.Z(b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.d7().A(0,b,c)},
Z(a){if(this.b==null)return this.c.Z(a)
return!1},
ad(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.ad(0,b)
s=o.aG()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.jp(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.i(A.a3(o))}},
aG(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.c(Object.keys(this.a),t.s)
return s},
d7(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.a4(t.N,t.z)
r=n.aG()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.A(0,o,n.i(0,o))}if(p===0)B.a.l(r,"")
else B.a.bn(r)
n.a=n.b=null
return n.c=s},
cW(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.jp(this.a[a])
return this.b[a]=s}}
A.dF.prototype={
gk(a){return this.a.gk(0)},
N(a,b){var s=this.a
if(s.b==null)s=s.gaf().N(0,b)
else{s=s.aG()
if(!(b>=0&&b<s.length))return A.w(s,b)
s=s[b]}return s},
gB(a){var s=this.a
if(s.b==null){s=s.gaf()
s=s.gB(s)}else{s=s.aG()
s=new J.bf(s,s.length,A.f(s).h("bf<1>"))}return s},
p(a,b){return this.a.Z(b)}}
A.d2.prototype={}
A.d4.prototype={}
A.cd.prototype={
q(a){var s=A.d6(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.df.prototype={
q(a){return"Cyclic error in JSON stringify"}}
A.hv.prototype={
dg(a,b){var s=A.nk(a,this.gdh().a)
return s},
aA(a,b){var s=A.mr(a,this.gdl().b,null)
return s},
gdl(){return B.ak},
gdh(){return B.aj}}
A.hx.prototype={}
A.hw.prototype={}
A.jd.prototype={
cr(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.o.aP(a,r,q)
r=q+1
o=A.a5(92)
s.a+=o
o=A.a5(117)
s.a+=o
o=A.a5(100)
s.a+=o
o=p>>>8&15
o=A.a5(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.a5(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.a5(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.o.aP(a,r,q)
r=q+1
o=A.a5(92)
s.a+=o
switch(p){case 8:o=A.a5(98)
s.a+=o
break
case 9:o=A.a5(116)
s.a+=o
break
case 10:o=A.a5(110)
s.a+=o
break
case 12:o=A.a5(102)
s.a+=o
break
case 13:o=A.a5(114)
s.a+=o
break
default:o=A.a5(117)
s.a+=o
o=A.a5(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.a5(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.a5(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.o.aP(a,r,q)
r=q+1
o=A.a5(92)
s.a+=o
o=A.a5(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.o.aP(a,r,m)},
b6(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.i(new A.df(a,null))}B.a.l(s,a)},
b2(a){var s,r,q,p,o=this
if(o.cq(a))return
o.b6(a)
try{s=o.b.$1(a)
if(!o.cq(s)){q=A.ky(a,null,o.gbN())
throw A.i(q)}q=o.a
if(0>=q.length)return A.w(q,-1)
q.pop()}catch(p){r=A.aY(p)
q=A.ky(a,r,o.gbN())
throw A.i(q)}},
cq(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.b.q(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.cr(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.b6(a)
q.dO(a)
s=q.a
if(0>=s.length)return A.w(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.b6(a)
r=q.dP(a)
s=q.a
if(0>=s.length)return A.w(s,-1)
s.pop()
return r}else return!1},
dO(a){var s,r,q=this.c
q.a+="["
s=J.aH(a)
if(s.gaa(a)){this.b2(s.i(a,0))
for(r=1;r<s.gk(a);++r){q.a+=","
this.b2(s.i(a,r))}}q.a+="]"},
dP(a){var s,r,q,p,o,n,m=this,l={}
if(a.gO(a)){m.c.a+="{}"
return!0}s=a.gk(a)*2
r=A.jT(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.ad(0,new A.je(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.cr(A.L(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.w(r,n)
m.b2(r[n])}p.a+="}"
return!0}}
A.je.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.A(s,r.a++,a)
B.a.A(s,r.a++,b)},
$S:25}
A.jc.prototype={
gbN(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.bi.prototype={
aj(a,b){if(b==null)return!1
return b instanceof A.bi},
gT(a){return B.c.gT(0)},
t(a,b){t.fu.a(b)
return 0},
q(a){return"0:00:00."+B.o.dw(B.c.q(0),6,"0")},
$iav:1}
A.dB.prototype={
q(a){return this.aR()},
$id5:1}
A.G.prototype={
gaO(){return A.mb(this)}}
A.cZ.prototype={
q(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.d6(s)
return"Assertion failed"}}
A.aT.prototype={}
A.aF.prototype={
gbc(){return"Invalid argument"+(!this.a?"(s)":"")},
gbb(){return""},
q(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gbc()+q+o
if(!s.a)return n
return n+s.gbb()+": "+A.d6(s.gbq())},
gbq(){return this.b}}
A.cp.prototype={
gbq(){return A.a2(this.b)},
gbc(){return"RangeError"},
gbb(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.t(q):""
else if(q==null)s=": Not greater than or equal to "+A.t(r)
else if(q>r)s=": Not in inclusive range "+A.t(r)+".."+A.t(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.t(r)
return s}}
A.d8.prototype={
gbq(){return A.h(this.b)},
gbc(){return"RangeError"},
gbb(){if(A.h(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gk(a){return this.f}}
A.cw.prototype={
q(a){return"Unsupported operation: "+this.a}}
A.dx.prototype={
q(a){return"UnimplementedError: "+this.a}}
A.cu.prototype={
q(a){return"Bad state: "+this.a}}
A.d3.prototype={
q(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.d6(s)+"."}}
A.dq.prototype={
q(a){return"Out of Memory"},
gaO(){return null},
$iG:1}
A.ct.prototype={
q(a){return"Stack Overflow"},
gaO(){return null},
$iG:1}
A.j_.prototype={
q(a){return"Exception: "+this.a}}
A.ah.prototype={
q(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.b.prototype={
aV(a,b){return A.ku(this,A.k(this).h("b.E"),b)},
cf(a,b,c){var s=A.k(this)
return A.m8(this,s.I(c).h("1(b.E)").a(b),s.h("b.E"),c)},
dN(a,b){var s=A.k(this)
return new A.d(this,s.h("e(b.E)").a(b),s.h("d<b.E>"))},
H(a,b,c,d){var s,r
d.a(b)
A.k(this).I(d).h("1(1,b.E)").a(c)
for(s=this.gB(this),r=b;s.j();)r=c.$2(r,s.gn())
return r},
D(a,b){var s
A.k(this).h("e(b.E)").a(b)
for(s=this.gB(this);s.j();)if(b.$1(s.gn()))return!0
return!1},
gk(a){var s,r=this.gB(this)
for(s=0;r.j();)++s
return s},
gO(a){return!this.gB(this).j()},
gaa(a){return!this.gO(this)},
cn(a,b){return A.kI(this,b,A.k(this).h("b.E"))},
a3(a,b){return A.kG(this,b,A.k(this).h("b.E"))},
gF(a){var s=this.gB(this)
if(!s.j())throw A.i(A.a0())
return s.gn()},
gU(a){var s,r=this.gB(this)
if(!r.j())throw A.i(A.a0())
do s=r.gn()
while(r.j())
return s},
N(a,b){var s,r
A.aR(b,"index")
s=this.gB(this)
for(r=b;s.j();){if(r===0)return s.gn();--r}throw A.i(A.hs(b,b-r,this,"index"))},
q(a){return A.m1(this,"(",")")}}
A.ac.prototype={
q(a){return"MapEntry("+A.t(this.a)+": "+A.t(this.b)+")"}}
A.ad.prototype={
gT(a){return A.C.prototype.gT.call(this,0)},
q(a){return"null"}}
A.C.prototype={$iC:1,
aj(a,b){return this===b},
gT(a){return A.ds(this)},
q(a){return"Instance of '"+A.dt(this)+"'"},
gV(a){return A.nJ(this)},
toString(){return this.q(this)}}
A.dJ.prototype={
q(a){return""},
$ib5:1}
A.iK.prototype={
gcb(){var s,r=this.b
if(r==null)r=$.hY.$0()
s=r-this.a
if($.kf()===1e6)return s
return s*1000},
bA(){var s=this,r=s.b
if(r!=null){s.a=s.a+($.hY.$0()-r)
s.b=null}}}
A.bG.prototype={
gk(a){return this.a.length},
q(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$imh:1}
A.iG.prototype={
bG(a){return this.d.bs(a,new A.iI(this,a))},
cj(a,b){var s=J.ar(this.bG(a),b)
return new A.bv((s.a+0.5-this.a/2)*16,(s.b+0.5-this.b/2)*16)}}
A.iI.prototype={
$0(){var s,r,q,p,o,n,m,l,k,j=this.b+1,i=A.c([],t.c7)
for(s=-j,r=this.a,q=r.b+j,p=r.a+j,r=r.c,o=r.length!==0,n=A.f(r),m=n.h("a(1)"),n=n.h("O<1,a>"),l=s;l<q;++l)for(k=s;k<p;++k)if(o&&new A.O(r,m.a(new A.iH(k,l)),n).ai(0,B.V)===j)i.push(new A.bv(k,l))
return i},
$S:44}
A.iH.prototype={
$1(a){t.bP.a(a)
return Math.max(Math.abs(this.a-a.a),Math.abs(this.b-a.b))},
$S:43}
A.eJ.prototype={}
A.be.prototype={
gc1(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=t.S,f=A.a4(g,g)
for(g=h.x,g=new A.al(g,g.r,g.e,A.k(g).h("al<2>")),s=h.a,r=h.y,q=h.z,p=s.b,o=s.a;g.j();){n=g.d
m=s.a6(n.a)
l=!0
if(n.as){k=n.d
if(k!=null)if(m!=null)if(!m.fr)if(!(m.f<=0)){j=m.a
if(!r.p(0,j)){i=m.as
if(!((i===B.e||i===B.d)&&!q.p(0,j)))if(n.y>=p){l=s.G(k)
l=(l==null?null:l.b)!==o}}}}if(l)continue
n=n.d
n.toString
f.cp(n,new A.dU(),new A.dV())}return f},
S(){var s,r=this,q=r.x,p=A.k(q).h("T<2>")
q=A.n(new A.T(q,p),p.h("b.E"))
s=A.km(r.a,r.b,r.c,q)
s.d=r.d
s.e=r.e
s.f=r.f
s.r=r.r
q=s.w
q.bn(0)
q.J(0,r.w)
s.y.J(0,r.y)
s.z.J(0,r.z)
s.Q.J(0,r.Q)
s.as.J(0,r.as)
s.ax.J(0,r.ax)
s.at.J(0,r.at)
s.ay.J(0,r.ay)
return s},
u(a){var s=this.a.u(a),r=A.f(s),q=r.h("d<1>")
s=A.n(new A.d(s,r.h("e(1)").a(new A.ec(this)),q),q.h("b.E"))
return s},
R(a){var s
if(a.cx==null){s=this.w.i(0,a.a)
if(s==null)s=a.d}else s=a.ga2()
return s},
M(a){var s,r=this.u(a).length,q=this.gc1().i(0,a)
if(q==null)q=0
s=this.as.p(0,a)?1:0
return r+q+s},
c2(a){var s,r=this,q=r.a.r,p=A.f(q)
p=new A.d(q,p.h("e(1)").a(new A.dW(r,a)),p.h("d<1>")).gk(0)
q=r.gc1().i(0,a)
if(q==null)q=0
s=r.as.p(0,a)?1:0
return p+q+s},
a9(a){var s=this,r=a.a
if(B.a.D(s.u(r),new A.eb()))return s.ak(a)?1:2
return s.at.p(0,r)||s.ak(a)?0:1},
ak(a){return this.ay.bs(a.a,new A.em(this,a))},
cl(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=A.bm(t.S)
for(s=J.lB(t.E.a(a),g.b.r.go),s=s.gB(s),r=g.c,q=g.a;s.j();){p=s.gn()
o=q.gP()
n=o.$ti
m=n.h("d<b.E>")
l=A.n(new A.d(o,n.h("e(b.E)").a(new A.ei(g)),m),m.h("b.E"))
B.a.C(l,new A.ej(p))
o=A.f(l)
n=o.h("y<1>")
m=new A.y(l,0,3,n)
m.W(l,0,3,o.c)
m=new A.p(m,m.gk(0),n.h("p<l.E>"))
p=p.r
n=n.h("l.E")
k=null
j=1/0
while(m.j()){o=m.d
i=o==null?n.a(o):o
o=i.f
h=r.al(o,p.Y(o))
if(h<j){j=h
k=i}}if(k!=null)f.l(0,k.a)}return f},
az(a){var s,r,q,p,o,n,m,l=this,k=a.c,j=l.a.G(k)
if(j==null)return!1
if(l.ak(j))return a.e!==2
s=l.u(k)
k=A.f(s)
r=k.h("e(1)")
k=k.h("d<1>")
q=A.b2(new A.d(s,r.a(new A.dX()),k),t.r)
if(q!=null){if(s.length<=2||a.a===q.a)return!1
p=A.n(new A.d(s,r.a(new A.dY(q)),k),k.h("b.E"))
B.a.C(p,new A.dZ(l,j))
k=B.a.gF(p)
r=l.b
o=l.R(j)
n=r.b.i(0,"soldierLimit")
n.toString
m=A.f(p)
return a.a!==new A.d(p,m.h("e(1)").a(new A.e_(l,j,A.bT(k,r,o,B.b.m(n)))),m.h("d<1>")).gU(0).a}if(s.length<=1)return!1
o=new A.e2(l,j)
B.a.C(s,new A.e0(o))
n=o.$1(B.a.gF(s))
if(typeof n!=="number")return n.bw()
return a.a!==new A.d(s,r.a(new A.e1(o,n*0.6)),k).gU(0).a},
au(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d="monthSeconds",c=e.b,b=c.b,a=b.i(0,d)
a.toString
s=b.i(0,"budgetSafety")
s.toString
r=Math.min(c.r.p1,a+s)
c=e.a
a=c.r
s=A.f(a)
q=s.h("e(1)")
s=s.h("d<1>")
p=t.S
o=new A.d(a,q.a(new A.e3(e)),s).H(0,e.r,new A.e4(),p)
n=new A.d(a,q.a(new A.e5(e)),s).H(0,0,new A.e6(),p)
s=c.gP()
q=s.$ti
a=q.h("d<b.E>")
m=A.n(new A.d(s,q.h("e(b.E)").a(new A.e7(e)),a),a.h("b.E"))
if(m.length===0)a=0
else{a=c.gah().r
if(a==null){a=b.i(0,"countryIncome")
a.toString
a=B.b.m(a)}s=b.i(0,"poorPenalty")
s.toString
s=a-B.b.m(s)
a=s}l=new A.ea(e,o,a+B.a.H(m,0,new A.e8(e),p),n,e.gbr())
k=A.m7([r],t.i)
j=A.c([],t.n)
i=c.e
c=r+1e-9
h=i
while(h<=c){k.l(0,h)
B.a.l(j,h)
a=b.i(0,d)
a.toString
h+=a}for(c=A.bI(k,k.r,k.$ti.c),a=c.$ti.c,g=0;c.j();){s=c.d
if(s==null)s=a.a(s)
if(s+1e-9<i)f=0
else{q=b.i(0,d)
q.toString
f=1+B.b.a0((s-i)/q)}if(B.a.D(j,new A.e9(s)))g=Math.max(g,A.jv(l.$1(Math.max(0,f-1))))
g=Math.max(g,A.jv(l.$1(f)))}c=Math.max(0,g)
if(a0)b=0
else{b=b.i(0,"emergencyGold")
b.toString
b=B.b.m(b)}return new A.eJ(c+b)},
X(){return this.au(!1)},
aN(a,b){var s,r,q,p,o,n,m,l,k=this,j="capacityPerLevel",i=!0
if(a.ch)if(!k.ax.p(0,a.a))if(b.dx){i=b.a
i=k.y.p(0,i)||k.z.p(0,i)}if(i)return!1
i=k.w
s=a.a
r=i.i(0,s)
r.toString
q=k.b
p=q.c
o=p.length
if(r>o)n=null
else{m=r-1
if(!(m>=0))return A.w(p,m)
n=B.c.v(p[m]-b.x,0,99999)}if(r>=q.ao(k.a.c)||n==null||k.d<=n)return!1
if(a.b===a.c)l=1
else{p=q.b.i(0,"foreignYield")
p.toString
l=p}p=k.f
o=r+1
q=q.b
m=q.i(0,j)
m.toString
m=B.b.a0(o*B.b.m(m)*l)
q=q.i(0,j)
q.toString
k.f=p+(m-B.b.a0(r*B.b.m(q)*l))
k.d=k.d-n
i.A(0,s,o)
k.ax.l(0,s)
return!0},
gbr(){return this.a.gP().H(0,0,new A.ed(this),t.S)},
ca(a){var s,r,q,p,o=this
if(!a.db||a.e===2||o.y.p(0,a.a))return!1
s=a.as
r=s!==B.e
if(!r||s===B.d){q=a.c
q=!o.at.p(0,q)&&o.u(q).length<=1}else q=!1
if(q)return!1
q=a.a
o.y.l(0,q)
o.x.aw(0,q)
o.Q.l(0,q)
o.d=o.d+a.x
q=o.f
p=o.e
o.e=Math.min(q,p+(!r||s===B.d?a.gK():0))
return!0},
ar(){var s,r,q,p=this,o=Math.max(0,p.f-p.e)
if(p.a.gah().x){s=p.d
r=p.b.b.i(0,"soldierCost")
r.toString
r=Math.max(0,B.c.b4(s,B.b.m(r)))
s=r}else s=0
q=Math.min(o,s)
return q>0&&p.c5(q)?q:0},
c5(a){var s,r,q=this
if(!q.a.gah().x)return!1
s=q.b.b.i(0,"soldierCost")
s.toString
r=a*B.b.m(s)
if(a>0){s=q.d
s=s<=0||r>s||q.e+a>q.f}else s=!0
if(s)return!1
q.d-=r
q.e+=a
return!0},
bt(a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d="drawCost",c=e.b,b=c.b,a=b.i(0,d)
a.toString
s=B.b.m(a)
a=e.a
r=a.r
q=A.f(r)
p=a.y
o=t.S
n=new A.d(r,q.h("e(1)").a(new A.ee(e)),q.h("d<1>")).H(0,e.r+p,new A.ef(),o)
q=a.gah().r
if(q==null){r=b.i(0,"countryIncome")
r.toString
r=B.b.m(r)}else r=q
q=a.gP()
m=q.$ti
l=r+new A.d(q,m.h("e(b.E)").a(new A.eg(e)),m.h("d<b.E>")).H(0,0,new A.eh(e),o)
o=b.i(0,"garrisonFree")
k=B.b.m(o==null?2:o)
r=b.i(0,"garrisonFactor")
j=B.b.m(r==null?0:r)
r=a0.a
i=e.M(r)
h=e.gbr()+A.jU(i+1,j,k)-A.jU(i,j,k)
q=n+h
if(q<=l*(a1?1.3:1.1)){if(a1)c=1
else if(a2==null)c=c.r.r
else{c=A.b0(a2,a,c,null)
o=c.e.r
if(c.ga8()){m=o.r
c=Math.max(m,Math.min(o.as,m+c.gaX()*0.2))}else c=o.r}g=n<=l*c}else g=!1
f=(a.c>=3||a1||q<=l)&&e.d-s>=e.au(a1).a+p+Math.max(0,h-e.gbr())
c=!0
if(a0.ay){q=e.as
if(!q.p(0,r))if(a.x>q.a){a=e.d
b=b.i(0,d)
b.toString
if(a>B.b.m(b))if(e.d>=s)c=!(g||f)}}if(c)return!1
e.d-=s
e.r+=p
e.as.l(0,r)
return!0},
dC(a,b){return this.bt(a,!1,b)},
dB(a,b){return this.bt(a,b,null)},
di(a,b){var s,r,q,p=this
if(a.cx){s=a.a
s=p.Q.p(0,s)||p.y.p(0,s)}else s=!0
if(s)return!1
s=a.c
r=!1
if(p.u(s).length<=1){q=p.a
if(q.G(s)!=null){q=q.G(s)
q.toString
q=p.ak(q)}else q=!1
if(!q){r=!(p.at.p(0,s)&&b.b==="evacuate"&&b.as)
s=r}else s=r}else s=r
if(s)return!1
s=p.e
r=p.b.b.i(0,"soldierLimit")
r.toString
p.e=s-Math.min(s,B.b.m(r)-a.gK())
r=a.a
p.z.l(0,r)
p.Q.l(0,r)
p.x.A(0,r,b)
return!0},
dD(a,b){var s
if(!a.cy||this.Q.p(0,a.a)||a.fr)return!1
s=a.a
this.Q.l(0,s)
this.x.A(0,s,b)
return!0}}
A.dU.prototype={
$1(a){return A.h(a)+1},
$S:17}
A.dV.prototype={
$0(){return 1},
$S:12}
A.ec.prototype={
$1(a){var s=this.a,r=t.r.a(a).a
return!s.y.p(0,r)&&!s.z.p(0,r)},
$S:0}
A.dW.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.c===this.b&&a.f>0&&!a.fr&&!s.y.p(0,a.a)},
$S:0}
A.eb.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.em.prototype={
$0(){var s,r,q=this.b,p=this.a,o=p.a,n=o.a
if(q.b===n){s=q.e
if(s==null)s=null
else{r=s.$ti
r=new A.O(s,r.h("a?(v.E)").a(new A.ek(p)),r.h("O<v.E,a?>"))
s=r}s=A.nZ(n,B.a.D(o.r,new A.el(p,q)),q.cx!=null,s)
q=s}else q=!1
return q},
$S:39}
A.ek.prototype={
$1(a){var s=this.a.a.G(A.h(a))
return s==null?null:s.b},
$S:38}
A.el.prototype={
$1(a){var s
t.r.a(a)
if(a.b!==this.a.a.a){s=a.as
s=!(s===B.e||s===B.d)&&!a.fr&&a.f>0&&a.k4===this.b.a}else s=!1
return s},
$S:0}
A.ei.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.a
r=a.a
q=!1
if(!s.at.p(0,r))if(!s.ak(a))if(a.ay)s=a.cx==null||s.M(r)<s.R(a)
else s=q
else s=q
else s=q
return s},
$S:1}
A.ej.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.f
return B.b.t(a.f.E(s),b.f.E(s))},
$S:3}
A.dX.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.dY.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.dZ.prototype={
$2(a,b){var s,r,q,p,o,n="soldierLimit",m=t.r
m.a(a)
m.a(b)
m=this.a
s=m.b
r=this.b
q=m.R(r)
p=s.b
o=p.i(0,n)
o.toString
o=A.bT(b,s,q,B.b.m(o))
r=m.R(r)
p=p.i(0,n)
p.toString
return B.b.t(o,A.bT(a,s,r,B.b.m(p)))},
$S:2}
A.e_.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=s.b
s=s.R(this.b)
q=r.b.i(0,"soldierLimit")
q.toString
return A.bT(a,r,s,B.b.m(q))>=this.c*0.6},
$S:0}
A.e2.prototype={
$1(a){var s=this.a,r=s.b,q=s.R(this.b),p=r.b.i(0,"soldierLimit")
p.toString
return A.bT(a,r,q,Math.min(B.b.m(p),s.e))},
$S:30}
A.e0.prototype={
$2(a,b){var s,r=t.r
r.a(a)
s=this.a
return J.kj(s.$1(r.a(b)),s.$1(a))},
$S:2}
A.e1.prototype={
$1(a){var s=this.a.$1(t.r.a(a))
if(typeof s!=="number")return s.dR()
return s>=this.b},
$S:0}
A.e3.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.y.p(0,a.a)},
$S:0}
A.e4.prototype={
$2(a,b){return A.h(a)+t.r.a(b).y},
$S:9}
A.e5.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=s.a
return a.b===r.a&&a.f>0&&!s.y.p(0,a.a)&&a.ok===r.d},
$S:0}
A.e6.prototype={
$2(a,b){return A.h(a)+t.r.a(b).y},
$S:9}
A.e7.prototype={
$1(a){return!this.a.at.p(0,t.q.a(a).a)},
$S:1}
A.e8.prototype={
$2(a,b){var s,r,q
A.h(a)
t.q.a(b)
s=this.a
r=s.w.i(0,b.a)
r.toString
s=s.b.b
q=s.i(0,"incomeStep")
q.toString
q=B.b.m(q)
if(b.b===b.c)s=1
else{s=s.i(0,"foreignYield")
s.toString}return a+B.b.a0((b.ax+(r-1)*q)*s)},
$S:6}
A.ea.prototype={
$1(a){var s,r,q,p=this
if(a===0)s=0
else{s=p.a
r=s.a
q=r.gah()
s=s.b.b.i(0,"monthSeconds")
s.toString
s=a*(p.b-p.c)-p.d+B.b.an(q.w+p.e*(r.e/s+a-1))}return s},
$S:17}
A.e9.prototype={
$1(a){return Math.abs(A.am(a)-this.a)<1e-7},
$S:19}
A.ed.prototype={
$2(a,b){var s,r,q
A.h(a)
s=this.a
r=s.M(t.q.a(b).a)
s=s.b.b
q=s.i(0,"garrisonFree")
q=B.b.m(q==null?2:q)
s=s.i(0,"garrisonFactor")
return a+A.jU(r,B.b.m(s==null?0:s),q)},
$S:6}
A.ee.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.y.p(0,a.a)},
$S:0}
A.ef.prototype={
$2(a,b){return A.h(a)+t.r.a(b).y},
$S:9}
A.eg.prototype={
$1(a){return!this.a.at.p(0,t.q.a(a).a)},
$S:1}
A.eh.prototype={
$2(a,b){var s,r,q
A.h(a)
t.q.a(b)
s=this.a
r=s.w.i(0,b.a)
if(r==null)r=b.d
s=s.b.b
q=s.i(0,"incomeStep")
q.toString
q=B.b.m(q)
if(b.b===b.c)s=1
else{s=s.i(0,"foreignYield")
s.toString}return a+B.b.a0((b.ax+(r-1)*q)*s)},
$S:6}
A.eN.prototype={
ga8(){var s=this
return s.a!==s.d.a&&s.b>=s.e.r.w},
gbd(){return Math.max(0,this.b-this.e.r.w)},
gaX(){if(this.ga8()){var s=this.e.r
s=Math.max(0,s.x+this.gbd()*s.y)}else s=0
return s},
bv(a,b){return a===0||!this.ga8()||b<=1?a:Math.min(this.e.r.fy,a+1+B.c.bk(this.gbd(),2))}}
A.eO.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.eP.prototype={
$2(a,b){var s,r
A.h(a)
t.q.a(b)
s=this.a
s=s==null?null:s.i(0,b.a)
if(s==null)s=b.d
r=this.b.b.i(0,"incomeStep")
r.toString
return a+b.ax+(s-1)*B.b.m(r)},
$S:6}
A.bh.prototype={
aR(){return"CombatAdvantage."+this.b}}
A.bW.prototype={}
A.eQ.prototype={
aK(a1,a2,a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l=this,k="soldierHp",j=a6==null,i=j?a1.gK():a6,h=a4==null,g=h?a2.gK():a4,f=a1.f,e=a1.at,d=a2.f,c=a2.at,b=a1.a+":"+A.t(f)+":"+a1.w+":"+A.t(e)+":"+A.t(a1.ax)+":"+a2.a+":"+A.t(d)+":"+a2.w+":"+A.t(c)+":"+A.t(a2.ax)+":"+a5+":"+a3+":"+a7+":"+i+":"+g,a=l.c,a0=a.i(0,b)
if(a0!=null)return a0
if(!l.b.d8())return B.a4
if(j)j=B.a.H(e,0,new A.eR(),t.H)
else{j=l.a.b.i(0,k)
j.toString
j=i*B.b.m(j)}if(h)h=B.a.H(c,0,new A.eS(),t.H)
else{h=l.a.b.i(0,k)
h.toString
h=g*B.b.m(h)}s=a5===0&&a3===0
j=(f+j)*l.bO(a1,i,a5,a7,s)
h=(d+h)*l.bO(a2,g,a3,a7,s)
r=Math.max(1,j+h)
q=(j*0.9-h*1.1)/r
p=(j*1.1-h*0.9)/r
o=l.a.r.R8
if(q>o)n=B.f
else n=p<-o?B.u:B.a3
j=A.c([],t.s)
if(a5>0||a3>0)j.push("\u57ce\u9632\u589e\u52a0\u653b\u51fb\u4e0e\u5f00\u573a\u58eb\u6c14")
j.push("\u4f59\u91cf\u4e3a\u9759\u6001\u98ce\u9669\u6307\u6807\uff0c\u5e76\u975e\u80dc\u7387")
m=new A.bW(n,q,p)
if(a.a>=256)a.aw(0,new A.aa(a,A.k(a).h("aa<1>")).gF(0))
a.A(0,b,m)
return m},
dc(a,b,c){return this.aK(a,b,c,null,0,null,0)},
de(a,b,c,d,e){return this.aK(a,b,c,d,0,e,0)},
aJ(a,b,c,d){return this.aK(a,b,0,null,c,d,0)},
c7(a,b,c,d){return this.aK(a,b,c,d,0,null,0)},
dd(a,b,c){return this.aK(a,b,0,null,0,null,c)},
bO(a,b,c,d,e){var s,r,q=this.a,p=q.bm(a.w,c,e,d),o=q.b.i(0,"soldierPower")
o.toString
o=B.b.m(o)
s=B.b.aM(a.ax)
r=q.ci(s,e?0:c)
return(B.c.bk(p+b*o+2,4)+1)*1.5*(1+B.b.v(r/1000,0,0.1))}}
A.eR.prototype={
$2(a,b){return A.u(a)+A.am(b)},
$S:13}
A.eS.prototype={
$2(a,b){return A.u(a)+A.am(b)},
$S:13}
A.cX.prototype={
L(){var s=this
return A.U(["interval",s.a,"resourceInterval",s.e,"cashBuffer",s.f,"payrollRatio",s.r,"dangerousCountryCities",s.w,"coalitionBudgetBase",s.x,"coalitionBudgetStep",s.y,"coalitionTargetBase",s.z,"coalitionTargetStep",s.Q,"coalitionPayrollCeiling",s.as,"coalitionTravel",s.at,"targetTravelScale",s.ax,"hatredTargetBonus",s.ay,"breakthroughMargin",s.ch,"threat",s.b,"urgent",s.c,"margin",s.d,"commit",s.CW,"rearExtra",s.cy,"candidates",s.db,"assessments",s.dx,"routes",s.dy,"plans",s.fr,"commands",s.fx,"team",s.fy,"fronts",s.k1,"singleFrontMonths",s.k2,"splitForce",s.k3,"splitAdvantage",s.k4,"arrivalSpread",s.ok,"expeditionSeconds",s.p1,"assaultCommitDistance",s.p2,"recallCriticalMargin",s.p3,"attritionCombat",s.p4,"targets",s.go,"slice",s.id,"advantage",s.R8,"expansion",s.RG,"age",s.cx,"timeout",s.rx,"restarts",s.ry,"stagnation",s.to],t.N,t.X)}}
A.ay.prototype={}
A.eT.prototype={
bB(){return new A.aB(this.cA(),t.gL)},
cA(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9,k0,k1,k2,k3,k4
return function $async$bB(k5,k6,k7){if(k6===1){p.push(k7)
r=q}for(;;)switch(r){case 0:k2={}
k3=s.c
k4=s.a
if(k3.b!==k4.a||k3.c!==s.b.a)throw A.i(B.ae)
o=k3.Q
n=o.f
if(n.length>64||o.r.length>256||o.w.length>32)throw A.i(B.af)
m=s.e
m===$&&A.M()
l=s.f
l===$&&A.M()
k=new A.iM(o,k4,m,l)
j=o.gP(),i=J.A(j.a),j=new A.V(i,j.b,j.$ti.h("V<1>")),h=s.x
case 3:if(!j.j()){r=4
break}g=i.gn()
h.A(0,g.a,k.dE(g))
r=5
return k5.b=0,1
case 5:r=3
break
case 4:j=A.k(h).h("T<2>")
f=new A.T(h,j).D(0,new A.fo())
i=k3.x
g=i===B.p
if(g&&f){k3=s.d
s.w=new A.bA("defending",null,0,1,B.L,A.c(["\u4e3b\u89d2\u6240\u5728\u57ce\u5c1a\u6709\u660e\u786e\u751f\u547d\u98ce\u9669\uff0c\u6682\u505c\u65b0\u8fdc\u5f81\uff0c\u4f18\u5148\u5b8c\u6210\u9632\u5b88\u8c03\u5ea6"],t.s),k3.e,k3.c,k3.d,0)
r=1
break}e=k3.as
d=A.f(e)
c=d.h("d<1>")
e=A.n(new A.d(e,d.h("e(1)").a(new A.fp(s)),c),c.h("b.E"))
b=A.km(o,k4,m,e)
k2.a=b
r=i===B.E?6:7
break
case 6:o=s.r
o===$&&A.M()
s.w=new A.hZ(k3,k4,o,l,h).dz(b)
r=8
return k5.b=1,1
case 8:r=1
break
case 7:e=t.Z
a=A.c([],e)
d=t.s
a0=A.c([],d)
c=s.d
a1=s.r
a1===$&&A.M()
a2=new A.fM(k3,k4,c,l,a1,h)
a3=j.h("d<b.E>")
a4=A.n(new A.d(new A.T(h,j),j.h("e(b.E)").a(new A.fq()),a3),a3.h("b.E"))
B.a.C(a4,new A.fB())
j=t.bQ
a5=A.c([new A.ay(k2.a,A.c([],e),A.c([],d),0,0)],j)
a3=g?A.c([],t.bL):a4
a6=a3.length
a7=t.N
a8=t.S
a9=k4.r
b0=a9.fx
b1=t.I
b2=t.dp
b3=t.aQ
b4=a9.fr
b5=0
case 9:if(!(b5<a3.length)){r=11
break}b6=a3[b5]
b7=A.c([],j)
b8=a5.length,b9=0
case 12:if(!(b9<a5.length)){r=14
break}c0=a5[b9]
c1=a2.c6(b6,c0.a),c2=c1.$ti,c1=new A.aV(c1.a(),c2.h("aV<1>")),c3=c0.d,c4=c0.e,c5=c0.c,c6=c0.b,c2=c2.c
case 15:if(!c1.j()){r=16
break}c7=c1.b
if(c7==null)c7=c2.a(c7)
c8=A.n(c6,b1)
B.a.J(c8,c7.b)
if(B.a.H(c8,0,new A.fF(),a8)>b0){c.e=!0
r=15
break}c9=c7.a
d0=A.n(c5,a7)
d1=c7.e
if(d1.length!==0)d0.push(d1)
d1=c7.c
c7=c7.d?1:0
B.a.l(b7,new A.ay(c9,c8,d0,c3+d1,c4+c7))
r=17
return k5.b=1,1
case 17:r=15
break
case 16:case 13:a5.length===b8||(0,A.z)(a5),++b9
r=12
break
case 14:if(b7.length!==0){B.a.C(b7,new A.fG())
b8=A.h(Math.min(4,b4))
c1=new A.y(b7,0,b8,b3)
c1.W(b7,0,b8,b2)
a5=c1.ap(0)}case 10:a3.length===a6||(0,A.z)(a3),++b5
r=9
break
case 11:if(a4.length!==0&&!g){d2=B.a.gF(a5)
k2.a=d2.a
B.a.J(a,d2.b)
B.a.J(a0,d2.c)
j=d2.e
if(j>0){j=""+j
B.a.l(a0,c.e?"\u89c4\u5212\u914d\u989d\u5df2\u7528\u5c3d\uff1a"+j+" \u5ea7\u57ce\u5c1a\u672a\u627e\u5230\u5b8c\u6574\u65b9\u6848\uff0c\u4e0d\u80fd\u636e\u6b64\u65ad\u5b9a\u65e0\u6cd5\u633d\u6551":"unsalvageableDefense\uff1a"+j+" \u5ea7\u57ce\u5728\u5f53\u524d\u9501\u5b9a\u3001\u8d44\u91d1\u6216\u65f6\u9650\u4e0b\u672a\u627e\u5230\u5b8c\u6574\u4fee\u590d\u65b9\u6848")}d3="defending"}else d3="preparing"
if(a4.length!==0)d3="defending"
if(!g){d4=s.cX(k2.a)
if(d4!=null){k2.a=d4.a
B.a.l(a,d4.b)
B.a.l(a0,"\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5176\u4ed6\u5b89\u5168\u57ce\u6c60\u7ee7\u7eed\u7ec4\u7ec7\u8fdb\u653b")}}r=18
return k5.b=2,1
case 18:for(j=o.r,g=A.f(j),a3=g.h("e(1)"),a6=a3.a(new A.fH(s)),g=g.h("d<1>"),b1=g.h("e(b.E)").a(new A.fI(s)),a6=new A.d(j,a6,g).gB(0),b1=new A.V(a6,b1,g.h("V<b.E>")),b2=t.w,b3=t.e,b4=t.Y,b8=k4.b;b1.j();){c1=a6.gn()
if(c1.e!==1)continue
d5=o.a6(c1.go)
if(d5==null)continue
d6=o.G(c1.ch)
d7=!1
if(c1.as===B.y)if(d6!=null){c2=k2.a.x.i(0,c1.a)
if((c2==null?null:c2.f)!==!0)if(c1.gK()<d5.gK()){c2=d6.cx
if(c2==null)c2=d6.d
else{c3=d6.cy
c4=d6.fx?1:0
c4=B.c.v(c2-c3-c4,0,5)
c2=c4}c2=l.dc(c1,d5,c2).c<0}else c2=d7
else c2=d7
d7=c2}d8=!1
if(c1.f<c1.r*0.25)if(c1.id>=2){c2=c1.k1
if(c2>0){c3=c1.gbo()
c4=d5.gbo()
c5=Math.max(1,c1.k2)
c6=b8.i(0,"retreatSurvivalRatio")
c6.toString
c6=c3/c2<c4/c5*c6
c2=c6}else c2=d8
d8=c2}if(!d7&&!d8)continue
c2=k2.a
c3=c1.a
if(c2.Q.p(0,c3))continue
k2.a.Q.l(0,c3)
c2=d7?"\u9ad8\u7ea7\u5c06\u9886\u5175\u529b\u843d\u540e\uff0c\u5f53\u524d\u5c5e\u6027\u5df2\u4e0d\u9002\u5408\u7ee7\u7eed\u653b\u57ce\uff0c\u8d81\u4ecd\u6709\u751f\u547d\u7533\u8bf7\u5408\u6cd5\u64a4\u9000\u6574\u5907":"\u9ad8\u7ea7\u5c06\u9886\u751f\u547d\u4f4e\u4e8e\u56db\u5206\u4e4b\u4e00\uff0c\u5df2\u53d1\u751f\u7684\u4f24\u5bb3\u663e\u793a\u80dc\u671b\u6e3a\u832b\uff0c\u7533\u8bf7\u6709\u98ce\u9669\u7684\u5408\u6cd5\u64a4\u9000"
c3=A.c([new A.x(B.Q,c3,null,null,0)],b2)
c4=A.c([c1,d5],b3)
c1=o.G(c1.c)
c1.toString
B.a.l(a,new A.I(c2,c3,a1.a_(c4,A.c([c1],b4)),B.j,0,!0))}r=19
return k5.b=3,1
case 19:a6=g.h("b.E")
d9=A.n(new A.d(j,a3.a(new A.fJ(k2,s)),g),a6)
b1=d9.length,b8=!f,c1=o.a,c2=o.b,c3=t.m,c4=t._,c5=a9.to,c6=c5*60,b5=0
case 20:if(!(b5<d9.length)){r=22
break}e0=d9[b5]
c7=e0.a
if(k2.a.Q.p(0,c7)){r=21
break}e1=k2.a.x.i(0,c7)
c8=e0.as
c9=c8===B.q
e2=!1
if(c9)if(e0.k3.length<=1){d0=e0.ay
d0=d0!=null&&e0.z.E(d0)<1
e2=d0}if(c9&&!e2){r=21
break}e3=s.cT(e0,e1)
c9=e1==null
d0=!c9
e4=d0&&e1.y<c2
if((c9?null:e1.b)==="staging"&&e0.f>=e0.r*0.65){d6=o.G(c9?null:e1.d)
if(d6!=null){d1=d6.b
e5=e1.b
e6=!1
if(e5==="expedition"||e5==="staging")if(d1!==c1){e5=e1.e
d1=e5!=null&&d1!==e5}else d1=!0
else d1=e6
d1=!d1&&!e4}else d1=!1
if(d1){if(c8===B.i&&!e0.p1){e7=s.bR(k2.a,e0,e1)
if(e7!=null){k2.a=e7.a
B.a.l(a,e7.b)}}r=21
break}e8=s.bU(k2.a,e0)
if(e8!=null){k2.a=e8.a
B.a.l(a,e8.b)
r=21
break}}if(c9)d1=null
else{d1=o.G(e1.d)
e5=!1
d1=d1==null?null:d1.b
e6=e1.b
if(e6==="expedition"||e6==="staging")if(d1!=null)if(d1!==c1){e5=e1.e
d1=e5!=null&&d1!==e5}else d1=!0
else d1=e5
else d1=e5}e9=d1===!0
f0=d0&&c8===B.i&&!e0.p1&&e1.x+1>=J.N(e1.w)
d1=!e2
f1=!0
if(d1)if(c8===B.i){if(!e0.p1)if(d0)if(!e4)e5=f0&&B.a.p(A.c(["intercept","standby"],d),e1.b)
else e5=f1
else e5=f1
else e5=!1
f1=e5}else f1=!1
e5=!e9
f2=!e5||f0||f1||e3
e6=!1
if(b8)if(d1){if(e5)d1=f0&&e1.b==="expedition"||f1
else d1=!0
d1=d1&&e0.f>=e0.r*0.65}else d1=e6
else d1=e6
if(d1){e7=s.bR(k2.a,e0,e1)
if(e7!=null){k2.a=e7.a
B.a.l(a,e7.b)
r=21
break}if(c.e&&e5){r=21
break}}if((c9?null:e1.as)===!0){d1=c9?null:e1.d
d1=e0.ch==d1&&!e4&&!f2}else d1=!1
if(d1){r=21
break}if((c9?null:e1.b)==="intercept")if(o.a6(c9?null:e1.r)!=null){d1=h.i(0,c9?null:e1.d)
if(d1==null)d1=null
else d1=d1.d.length!==0||d1.a.cx!=null
d1=d1!==!0
f3=d1}else f3=!0
else f3=!1
d1=!f2
if(d1&&f3&&e1.z>c2&&e0.f>=e0.r*0.65){r=21
break}if(d0&&d1&&!e4&&!f3&&e1.z>c2&&!A.l7(e0,o,k2.a,k4)&&e0.f>=e0.r*0.5){r=21
break}e6=e0.p1
if(e6&&d0&&!e4&&!e3&&e5){r=21
break}f4=A.k7(e0,o,k2.a)
d0=!1
if(d1)if(A.l7(e0,o,k2.a,k4))d0=e0.f>=e0.r*0.25||o.u(f4.a).length===0
if(d0){B.a.l(a0,c7+"\u5df2\u4e34\u8fd1\u4e3b\u653b\u76ee\u6807\uff0c\u4fdd\u6301\u8fdb\u653b\uff0c\u4e0d\u56e0\u666e\u901a\u9884\u8b66\u6216\u6574\u5907\u9884\u7b97\u6298\u8fd4")
r=21
break}if((c9?null:e1.b)==="expedition"&&d1&&!e4&&e0.f>=e0.r*0.65&&e1.x+1<J.N(e1.w)){r=21
break}if(d1&&!f3&&!e4&&e0.f>=e0.r*0.65&&c8!==B.i){r=21
break}d0=o.gP()
d1=d0.$ti
e5=d1.h("d<b.E>")
f5=A.n(new A.d(d0,d1.h("e(b.E)").a(new A.fK(k2,s,e4,e1)),e5),e5.h("b.E"))
B.a.C(f5,new A.fL(e0))
d0=A.f(f5)
d1=d0.h("y<1>")
e5=new A.y(f5,0,3,d1)
e5.W(f5,0,3,d0.c)
e5=new A.p(e5,e5.gk(0),d1.h("p<l.E>"))
d0=e0.f<e0.r*0.65
d1=d1.h("l.E")
while(e5.j()){f6=e5.d
if(f6==null)f6=d1.a(f6)
if(!c.a5())break
f7=m.aF(e0,f6.f,o,!0,f6)
f8=k2.a
f9=f6.a
g0=h.i(0,f9)
if(g0==null)g0=null
else g0=g0.d.length!==0||g0.a.cx!=null
if(e3)g1="\u5f53\u524d\u968f\u519b\u5175\u529b\u4e0d\u8db3\u4ee5\u5b89\u5168\u7ee7\u7eed\uff0c\u56de\u57ce\u8865\u5175\u540e\u91cd\u65b0\u7ec4\u7ec7\u8fdb\u653b"
else if(d0)g1="\u5c06\u9886\u53d7\u4f24\uff0c\u56de\u57ce\u6062\u590d\u751f\u547d\u540e\u518d\u6218"
else if(e2)g1="\u539f\u8fd4\u7a0b\u57ce\u6c60\u6ca1\u6709\u5165\u57ce\u540d\u989d\uff0c\u6539\u5f80\u5176\u4ed6\u6709\u7a7a\u4f4d\u7684\u53cb\u57ce\u6574\u5907"
else if(e9)g1="\u76ee\u6807\u6613\u4e3b\u540e\u539f\u57ce\u4e0e\u9644\u8fd1\u654c\u57ce\u5747\u4e0d\u9002\u5408\u7ee7\u7eed\u8fdb\u653b\uff0c\u56de\u57ce\u6574\u5907"
else if(f0)g1="\u539f\u8def\u7ebf\u6301\u7eed\u53d7\u963b\uff0c\u91cd\u65b0\u9009\u62e9\u6709\u5b89\u5168\u540d\u989d\u7684\u57ce\u6c60\u6574\u5907"
else if(e4)g1="\u539f\u4efb\u52a1\u5df2\u8d85\u8fc7\u6267\u884c\u65f6\u9650\uff0c\u56de\u57ce\u91cd\u65b0\u6574\u5907"
else g1=f3?"\u622a\u51fb\u76ee\u6807\u5df2\u6d88\u5931\uff0c\u56de\u57ce\u7ed3\u675f\u672c\u6b21\u4efb\u52a1":"\u91ce\u5916\u6307\u4ee4\u5df2\u5b8c\u6210\uff0c\u56de\u57ce\u7b49\u5f85\u65b0\u4efb\u52a1"
g2=h.i(0,f9)
if(g2==null)g2=null
else g2=g2.d.length!==0||g2.a.cx!=null
f9=g2===!0?h.i(0,f9).gac():1/0
g3=a1.cs(f8,e0,f7,!0,f9,!0,g0!==!0,g1,"regroup",f6)
if(g3!=null){k2.a=g3.a
B.a.l(a,g3.b)
break}}if((f1||e3||e9)&&!k2.a.Q.p(0,c7)){if(e3)g4="\u968f\u519b\u5175\u529b\u4e0d\u8db3\u4e14\u6682\u65e0\u5b89\u5168\u6574\u5907\u5730\u70b9\uff0c\u505c\u6b62\u63a8\u8fdb\u5e76\u7b49\u5f85\u91cd\u65b0\u8c03\u5ea6"
else g4=e9?"\u539f\u8fdb\u653b\u76ee\u6807\u5df2\u7ecf\u6613\u4e3b\uff0c\u6682\u65e0\u5408\u9002\u7684\u65b0\u76ee\u6807\u6216\u5b89\u5168\u5165\u57ce\u65b9\u6848\uff0c\u505c\u6b62\u65e7\u8fdc\u5f81\u5e76\u7ee7\u7eed\u590d\u67e5":"\u5f53\u524d\u6ca1\u6709\u5408\u9002\u7684\u622a\u51fb\u6216\u8fdb\u653b\u76ee\u6807\uff0c\u53cb\u57ce\u4e5f\u6ca1\u6709\u5b89\u5168\u5165\u57ce\u65b9\u6848\uff0c\u6682\u65f6\u5f85\u547d\u5e76\u7ee7\u7eed\u590d\u67e5"
B.a.l(a0,c7+"\uff1a"+g4)
if((c9?null:e1.b)!=="standby"||e4){if(e3||e9)g5=c8!==B.i||e6
else g5=!1
c8=e0.c
c9=A.c([e0.z],c4)
d0=B.b.aM(c6)
d1=g5?1:0
g6=new A.a8(c7,"standby",g4,c8,null,!1,null,c9,0,c2+d0,c2,0,!1,!1,e0.fy+d1)
k2.a.x.A(0,c7,g6)
d1=A.c([],b2)
if(g5)d1.push(new A.x(B.P,c7,null,null,0))
c7=A.c([g6],c3)
c9=A.c([e0],b3)
c8=o.G(c8)
c8.toString
B.a.l(a,new A.I(g4,d1,a1.a_(c9,A.c([c8],b4)),c7,0,!1))}}r=23
return k5.b=4,1
case 23:case 21:d9.length===b1||(0,A.z)(d9),++b5
r=20
break
case 22:g7=A.n(new A.d(j,a3.a(new A.fr(k2,s,f)),g),a6)
B.a.C(g7,new A.fs(s))
j=k3.y
g=k3.z
g8=A.cn(o,k2.a,k4,g,j)
d=A.a4(a8,a8)
for(a3=g8.f,a6=new A.bl(a3,a3.r,a3.e,A.k(a3).h("bl<1>"));a6.j();){b1=a6.d
c1=a3.i(0,b1)
c1=c1==null?null:J.N(c1)
d.A(0,b1,c1==null?0:c1)}g9=g8.ga1()
if(g9==null)g9=g8.gck()
if(g8.ga1()!=null&&a4.length===0)d3="attacking"
a3=g7.length,a6=k3.f,c5=k3.w>c5/a9.a,k3=a9.k4,b1=a9.fy,a9=a9.go,c1=A.f(n),c2=c1.h("e(1)"),c1=c1.h("d<1>"),c3=c1.h("b.E"),h0=0,h1=1,h2=!1,b5=0
case 24:if(!(c4=g7.length,b5<c4)){r=26
break}e0=g7[b5]
h3={}
c4=e0.a
if(k2.a.Q.p(0,c4)||k2.a.y.p(0,c4)){r=25
break}h4=o.G(e0.c)
c4=h4.a
b6=h.i(0,c4)
c6=b6==null
if(c6)c7=null
else c7=b6.d.length!==0||b6.a.cx!=null
if(c7===!0){if(c6)c7=null
else{c7=b6.f
c7=c7==null?null:c7.a}c7=c7!==B.f}else c7=!1
if(c7){r=25
break}if(c6)c7=null
else c7=b6.d.length!==0||b6.a.cx!=null
c8=k2.a
if(c7===!0){c7=c8.a9(h4)
c8=k2.a
c9=h4.cx
if(c9==null){c8=c8.w.i(0,c4)
if(c8==null)c8=h4.d}else{c8=h4.cy
d0=h4.fx?1:0
d0=B.c.v(c9-c8-d0,0,5)
c8=d0}h5=Math.min(c7,c8)}else h5=c8.a9(h4)
if(k2.a.u(c4).length<=h5){r=25
break}if(c6)c4=null
else c4=b6.d.length!==0||b6.a.cx!=null
if(c4===!0&&!s.bj(h4,e0,k2.a)){r=25
break}h6=A.cn(o,k2.a,k4,g,j)
h7=A.n(new A.d(n,c2.a(new A.ft(s,h6,e0,d)),c1),c3)
B.a.C(h7,new A.fu(s,h6,e0))
h3.a=null
c4=A.f(h7)
c6=c4.h("y<1>")
c7=new A.y(h7,0,a9,c6)
c7.W(h7,0,a9,c4.c)
c7=new A.p(c7,c7.gk(0),c6.h("p<l.E>"))
c6=c6.h("l.E")
h8=null
h9=-1/0
case 27:if(!c7.j()){r=28
break}c4=c7.d
i0=c4==null?c6.a(c4):c4
if(!c.a5()){r=28
break}i1=i0.a
c4=o.u(i1)
c8=A.f(c4).h("K<1>")
c4=new A.K(c4,c8)
c9=i0.cx
if(c9==null)c9=i0.d
else{d0=i0.cy
d1=i0.fx?1:0
d1=B.c.v(c9-d0-d1,0,5)
c9=d1}d0=new A.y(c4,0,c9,c8.h("y<l.E>"))
d0.W(c4,0,c9,c8.h("l.E"))
i2=d0.ap(0)
f7=m.aE(e0,i0.f,o,i0)
if(!f7.d){r=27
break}c4=A.dL(e0,i0,o,k4,l,c5&&k2.a.d>100?0.05:0).a
i3=c4[1]
i4=a1.b_(c4[2],i0,k2.a,e0)
r=i4===0?29:30
break
case 29:if(g9==null){h1=Math.max(1,Math.min(b1,i2.length))
g9=i1}r=31
return k5.b=5,1
case 31:r=27
break
case 30:if(h6.ga1()!=null&&i1!==h6.ga1())c8=i4!==1||i3<k3
else c8=!1
if(c8){r=27
break}i5=d.i(0,i1)
if(i5==null)i5=0
i6=i4-i5
if(i6<=0){r=27
break}h1=Math.max(h1,i4)
g3=s.bP(k2.a,e0,i0,i6,i5,c4[0])
if(g3==null){i7=k2.a.S()
i7.d=1e6
i8=s.bP(i7,e0,i0,i6,i5,c4[0])
if(i8!=null){if(a4.length===0)d3="saving"
c4=i7.d
c8=i8.a
i9=c4-c8.d+c8.X().a
h0=h0===0?i9:Math.min(h0,i9)
if(g9==null)g9=i1}else if(a4.length===0)d3="preparing"
r=27
break}c4=f7.b
j0=A.by(i0,e0,o,k4,a6,c4)-c4*0.4-(k2.a.d-g3.a.d)*0.5+i3*30
if(j0>h9){h3.a=g3
h1=g3.b.d.length
h9=j0
h8=i0}r=32
return k5.b=5,1
case 32:r=27
break
case 28:c4=h3.a
if(c4!=null){c4=B.a.H(a,0,new A.fv(),a8)
c6=h3.a
c4=c4+c6.b.b.length<=b0}else{c6=c4
c4=!1}if(c4){k2.a=c6.a
B.a.l(a,c6.b)
g9=h8.a
d.cp(g9,new A.fw(h3),new A.fx(h3))
h2=!0}r=33
return k5.b=6,1
case 33:case 25:g7.length===a3||(0,A.z)(g7),++b5
r=24
break
case 26:if(b8&&i!==B.r)for(b5=0;b5<g7.length;g7.length===c4||(0,A.z)(g7),++b5){e0=g7[b5]
if(k2.a.Q.p(0,e0.a))continue
h4=o.G(e0.c)
k3=h.i(0,h4.a)
if(k3==null)k3=null
else k3=k3.d.length!==0||k3.a.cx!=null
if(k3===!0&&!s.bj(h4,e0,k2.a))continue
if(B.a.H(a,0,new A.fy(),a8)>=b0)break
e8=s.bU(k2.a,e0)
if(e8!=null){k2.a=e8.a
B.a.l(a,e8.b)}}k3=!h2
if(k3&&b8&&B.a.gF(a5).e===0&&i!==B.r){e8=s.d4(k2.a,g8)
if(e8!=null){k2.a=e8.a
B.a.l(a,e8.b)
d3="preparing"}}r=i===B.D&&b8&&k3&&B.a.H(a,0,new A.fz(),a8)<b0-3?34:35
break
case 34:j1=k2.a.cl(new A.d(n,c2.a(new A.fA(s,g8)),c1))
k3=o.gP(),m=J.A(k3.a),k3=new A.V(m,k3.b,k3.$ti.h("V<1>"))
case 36:if(!k3.j()){r=37
break}l=m.gn()
j=l.a
i=h.i(0,j)
if(i==null)i=null
else i=i.d.length!==0||i.a.cx!=null
if(i===!0){r=36
break}if(!c.a5()){r=37
break}j2=k2.a.u(j)
b7=k2.a.S()
i=A.f(j2)
g=i.h("d<1>")
j3=A.n(new A.d(j2,i.h("e(1)").a(new A.fC(k2)),g),g.h("b.E"))
B.a.C(j3,new A.fD())
j4=!1
if(j1.p(0,j))if(B.a.D(n,new A.fE(s))){i=j2.length===0||k2.a.c2(j)<k2.a.a9(l)+h1
j4=i}if(j3.length!==0){i=j2.length
g=k2.a
d=l.cx
if(d==null){g=g.w.i(0,j)
if(g==null)g=l.d}else{g=l.cy
a3=l.fx?1:0
a3=B.c.v(d-g-a3,0,5)
g=a3}if(i<g)i=j4&&j2.length>=l.at
else i=!0}else i=!1
if(i)if(b7.aN(l,B.a.gF(j3))&&b7.d>=b7.X().a){k2.a=b7
B.a.l(a,new A.I("\u5148\u6269\u5145\u5b89\u5168\u8fce\u6218\u540d\u989d\u548c\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u8003\u8651\u62db\u5c06\u4e0e\u8fdc\u5f81",A.c([new A.x(B.k,B.a.gF(j3).a,j,null,0)],b2),a1.a_(A.c([B.a.gF(j3)],b3),A.c([l],b4)),B.j,b7.X().a,!1))
j5=b7.ar()
if(j5>0)B.a.l(a,new A.I("\u57ce\u9632\u5347\u7ea7\u540e\u5728\u540c\u4e00\u6b21\u8865\u5175\u7a97\u53e3\u5185\u5c3d\u91cf\u8865\u6ee1\u5168\u56fd\u5175\u5458\u5bb9\u91cf",A.c([new A.x(B.h,null,j,null,j5)],b2),a1.a_(A.c([],b3),A.c([l],b4)),B.j,0,!1))
r=37
break}if(j4){i=o.G(g9)
i=b7.dC(l,i==null?null:i.b)&&b7.d>=b7.X().a}else i=!1
if(i){k2.a=b7
B.a.l(a,new A.I("\u4e3a\u7559\u5b88\u4e0e\u8fdc\u5f81\u7684\u771f\u5b9e\u7f3a\u53e3\u62bd\u53d6\u82f1\u96c4\uff0c\u9884\u7559\u6700\u9ad8\u624b\u7eed\u8d39\u548c\u6708\u4ff8",A.c([new A.x(B.w,null,j,null,0)],b2),a1.a_(A.c([],b3),A.c([l],b4)),B.j,b7.X().a,!1))
r=37
break}j6=k2.a.S()
j5=j6.ar()
if(j5>0){k2.a=j6
B.a.l(a,new A.I("\u4f18\u5148\u8865\u6ee1\u5168\u56fd\u5175\u5458\u5bb9\u91cf\uff0c\u8d44\u91d1\u4e0d\u8db3\u65f6\u4e70\u5f97\u8d77\u591a\u5c11\u8865\u591a\u5c11\uff0c\u4e0d\u900f\u652f",A.c([new A.x(B.h,null,j,null,j5)],b2),a1.a_(A.c([],b3),A.c([l],b4)),B.j,j6.X().a,!1))
r=37
break}r=38
return k5.b=7,1
case 38:r=36
break
case 37:case 35:if(h2)d3=a4.length===0?"attacking":"defending"
j7=o.G(g9)
if(j7!=null){j8=A.b0(j7.b,o,k4,null)
if(j8.ga8())B.a.l(a0,"\u76ee\u6807\u56fd\u5360\u6709 "+j8.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.an(j8.c*j8.gaX())+" \u91d1\u5e01\uff0c\u51c6\u5907\u8f6e\u653b\u5175\u529b")}if(a.length===0){k3=k2.a
B.a.l(a0,k3.d<k3.X().a?"\u8d44\u91d1\u4e0d\u8db3\u4ee5\u8986\u76d6\u73b0\u6709\u90e8\u961f\u548c\u6b20\u6536\u6708\u4ff8\uff0c\u7b49\u5f85\u6574\u5907":"\u6ca1\u6709\u6ee1\u8db3\u5b88\u57ce\u3001\u65f6\u9650\u53ca\u9759\u6001\u98ce\u9669\u7ea6\u675f\u7684\u65b0\u589e\u884c\u52a8\uff0c\u4fdd\u6301\u5df2\u6709\u4efb\u52a1")}if(c5)B.a.l(a0,"\u505c\u6ede\u8bca\u65ad\uff1a"+(d3==="saving"?"\u7f3a\u5c11\u6574\u961f\u540e\u52e4\u8d44\u91d1":"\u7f3a\u5c11\u53ef\u5b89\u5168\u6267\u884c\u7684\u6269\u5f20\u6761\u4ef6")+"\uff0c\u4e0d\u901a\u8fc7\u65e0\u9650\u62db\u52df\u6216\u81ea\u6740\u51fa\u51fb\u6253\u7834\u7b49\u5f85")
j9=A.c([],e)
for(k3=a.length,k0=0,b5=0;b5<a.length;a.length===k3||(0,A.z)(a),++b5){k1=a[b5]
k0+=k1.b.length
if(k0>b0){c.e=!0
B.a.l(a0,"\u547d\u4ee4\u914d\u989d\u5230\u8fbe\uff0c\u53ea\u63d0\u4ea4\u524d\u9762\u5b8c\u6574\u7684\u52a8\u4f5c\u7ec4\uff0c\u540e\u7eed\u7559\u5f85\u4e0b\u4e00\u6b21\u89c4\u5212")
break}B.a.l(j9,k1)}s.w=new A.bA(d3,g9,h0,h1,j9,A.R(a0,0,A.W(12,"count",a8),a7).ap(0),c.e,c.c,c.d,c.b)
case 1:return 0
case 2:return k5.c=p.at(-1),3}}}},
cX(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this
for(s=a2.c.Q,r=s.gP(),q=J.A(r.a),r=new A.V(q,r.b,r.$ti.h("V<1>")),p=a2.x,o=a2.d,n=s.r,m=A.f(n),l=m.h("e(1)"),m=m.h("d<1>"),k=m.h("b.E"),j=a3.at;r.j();){i=q.gn()
h=i.a
if(a3.u(h).length!==0||a3.ak(i)||a3.M(h)>0||j.p(0,h))continue
g=A.n(new A.d(n,l.a(new A.f5(a2,a3)),m),k)
B.a.C(g,new A.f6(i))
f=A.f(g)
e=f.h("y<1>")
d=new A.y(g,0,4,e)
d.W(g,0,4,f.c)
d=new A.p(d,d.gk(0),e.h("p<l.E>"))
f=i.f
e=e.h("l.E")
while(d.j()){c=d.d
if(c==null)c=e.a(c)
if(!o.a5())return null
b=a2.e
b===$&&A.M()
a=b.aF(c,f,s,!0,i)
b=a2.r
b===$&&A.M()
a0=p.i(0,h)
a0=a0==null?null:a0.gac()
a1=b.b3(a3,c,a,!0,a0==null?1/0:a0,!0,"\u524d\u7ebf\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5b89\u5168\u540e\u65b9\u65e0\u9700\u4e3a\u7559\u5b88\u7275\u5236\u90e8\u961f","transfer",i)
if(a1!=null)return a1}}return null},
cT(a,b){var s,r,q,p,o,n,m,l=this,k="soldierLimit",j=b==null
if((j?null:b.b)==="expedition"){s=a.gK()
r=l.a.b.i(0,k)
r.toString
r=s>=B.b.m(r)
s=r}else s=!0
if(s)return!1
s=l.c.Q
q=s.G(j?null:b.d)
if(q==null||q.b===s.a)return!1
j=s.u(q.a)
r=A.f(j).h("K<1>")
p=A.b2(A.R(new A.K(j,r),0,A.W(q.ga2(),"count",t.S),r.h("l.E")),t.r)
if(p==null)return!1
j=B.a.av(s.w,new A.eU(q))
s=l.f
s===$&&A.M()
r=q.ga2()
o=l.a
n=o.b.i(0,k)
n.toString
m=s.c7(a,p,r,Math.min(B.b.m(n),p.gK()+j.c))
if(l.d.e)return!1
if(b.f)return m.c<=0||m.b<o.r.ch
return m.a!==B.f},
bR(b4,b5,b6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this,b2=null,b3=b6==null
if((b3?b2:b6.b)==="expedition")s=b3?b2:b6.d
else s=b2
r=b1.c.Q
q=r.f
p=A.f(q)
o=p.h("d<1>")
n=A.n(new A.d(q,p.h("e(1)").a(new A.f1(b1)),o),o.h("b.E"))
B.a.C(n,new A.f2(b1,s,b5))
for(q=b1.a,p=q.r,o=A.R(n,0,A.W(p.go,"count",t.S),A.f(n).c),m=o.$ti,o=new A.p(o,o.gk(0),m.h("p<l.E>")),b3=!b3,l=t.r,k=p.fy,j=b4.x,i=A.k(j).h("T<2>"),h=i.h("e(b.E)"),g=i.h("d<b.E>"),f=b1.d,m=m.h("l.E"),q=q.b,e=r.w,p=p.ch;o.j();){d=o.d
if(d==null)d=m.a(d)
if(!f.a5())return b2
c=b1.r
c===$&&A.M()
if(!c.ae(d))continue
b=new A.d(new A.T(j,i),h.a(new A.f3(b1,b5,d)),g).gk(0)
if(b>=k)continue
a=d.a
a0=r.u(a)
a1=A.f(a0).h("K<1>")
a0=new A.K(a0,a1)
a2=d.cx
a3=a2==null
if(a3)a4=d.d
else{a4=d.cy
a5=d.fx?1:0
a5=B.c.v(a2-a4-a5,0,5)
a4=a5}a5=new A.y(a0,0,a4,a1.h("y<l.E>"))
a5.W(a0,0,a4,a1.h("l.E"))
a6=A.b2(a5,l)
a0=a6!=null
if(a0){a1=B.a.av(e,new A.f4(d))
a4=b1.f
a4===$&&A.M()
if(a3)a2=d.d
else{a3=d.cy
a5=d.fx?1:0
a5=B.c.v(a2-a3-a5,0,5)
a2=a5}a3=q.i(0,"soldierLimit")
a3.toString
a7=a4.c7(b5,a6,a2,Math.min(B.b.m(a3),a6.gK()+a1.c))
if(a7.c<=0||a7.b<p){a8=b1.cV(b4,d,a6,b)
if(a8!=null)return a8
continue}}a1=b1.e
a1===$&&A.M()
a9=a1.aE(b5,d.f,r,d)
if(!b3||b6.b!=="expedition")a="\u91ce\u5916\u4efb\u52a1\u7ed3\u675f\u540e\u5229\u7528\u73b0\u6709\u968f\u8eab\u5175\u529b\uff0c\u8f6c\u653b\u53ef\u4ee5\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u654c\u57ce"
else a=a===s?"\u91cd\u65b0\u6838\u5bf9\u5f53\u524d\u5b88\u519b\u4e0e\u8def\u7ebf\u540e\uff0c\u7ee7\u7eed\u8fdb\u653b\u539f\u76ee\u6807":"\u539f\u76ee\u6807\u4e0d\u518d\u9002\u5408\u8fdb\u653b\uff0c\u8f6c\u5411\u9644\u8fd1\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u654c\u57ce"
b0=c.bx(b4,b5,a9,a0,!0,b,a,"expedition",d)
if(b0!=null)return b0}return b2},
cV(b5,b6,b7,b8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=this,a9="soldierPower",b0=a8.c.Q,b1=b0.r,b2=A.f(b1),b3=b2.h("d<1>"),b4=A.n(new A.d(b1,b2.h("e(1)").a(new A.eV(a8,b5,b6)),b3),b3.h("b.E"))
B.a.C(b4,new A.eW())
b1=B.a.av(b0.w,new A.eX(b6))
b2=a8.a
b3=b2.b
s=b3.i(0,"soldierLimit")
s.toString
r=Math.min(B.b.m(s),b7.gK()+b1.c)
b1=b2.bl(b7.w,b6.ga2(),!1)
s=b3.i(0,a9)
s.toString
q=b1+r*B.b.m(s)
s=b3.i(0,"soldierHp")
s.toString
p=b7.f+r*B.b.m(s)
o=A.c([],t.h2)
for(b1=b2.r,b2=b1.fy,s=A.R(b4,0,A.W(b2*2,"count",t.S),A.f(b4).c),n=s.$ti,s=new A.p(s,s.gk(0),n.h("p<l.E>")),m=t.H,b1=b1.ok,l=b6.f,b2-=b8,n=n.h("l.E"),k=a8.d,j=b1*2,i=0,h=1/0,g=0;s.j();){f=s.d
if(f==null)f=n.a(f)
if(o.length>=b2||!k.a5())break
e=a8.e
e===$&&A.M()
d=e.aE(f,l,b0,b6)
if(!d.d||d.b>j)continue
e=d.b
c=Math.min(h,e)
b=Math.max(g,e)
if(b-c>b1)continue
e=f.w
e=B.c.v(B.c.a0(e),0,63)
e=B.c.v(e,0,63)
a=f.gK()
a0=b3.i(0,a9)
a0.toString
a0=B.b.m(a0)
a1=Math.max(1,q)
i+=(f.f+B.a.H(f.at,0,new A.eY(),m))*((e+a*a0)/a1)*0.85
B.a.l(o,new A.cH(f,d))
if(i>=p)break
g=b
h=c}if(o.length<2||i<p)return null
a2=A.c([],t.w)
a3=A.c([],t.m)
b0=a8.r
b0===$&&A.M()
a4=b0.a_(A.c([b7],t.e),A.c([b6],t.Y))
for(b1=A.lY(o,0,t.bU),b2=J.A(b1.a),b3=b1.b,b1=new A.bj(b2,b3,A.k(b1).h("bj<1>")),a5=b5;b1.j();){s=b1.c
s=s>=0?new A.aG(b3+s,b2.gn()):A.aC(A.a0())
a6=s.b
a7=b0.bx(a5,a6.a,a6.b,!0,!0,b8+s.a,"\u5916\u56f4\u7f16\u961f\u5df2\u5230\u4f4d\uff0c\u6309\u5b9e\u9645\u5175\u529b\u8f6e\u653b\u524d\u6392\uff0c\u5f3a\u5c06\u5148\u653b\u3001\u5176\u4f59\u63a5\u7eed","expedition",b6)
if(a7==null)return null
a5=a7.a
s=a7.b
B.a.J(a2,s.b)
B.a.J(a3,s.d)
a4.J(0,s.c)}return new A.co(a5,new A.I("\u5916\u56f4\u5175\u529b\u5408\u8ba1\u8db3\u4ee5\u53d1\u8d77\u8f6e\u653b\uff0c\u4e0d\u518d\u8981\u6c42\u6bcf\u540d\u5c06\u9886\u5355\u72ec\u5360\u4f18",a2,a4,a3,a5.d,!0))},
bU(a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=a.c.Q,a1=t.S,a2=a0.gP().H(0,0,new A.fa(a,a7,a8),a1),a3=a0.f,a4=A.f(a3),a5=a4.h("d<1>"),a6=A.n(new A.d(a3,a4.h("e(1)").a(new A.fb(a)),a5),a5.h("b.E"))
B.a.C(a6,new A.fc(a8))
for(a1=A.R(a6,0,A.W(3,"count",a1),A.f(a6).c),a4=a1.$ti,a1=new A.p(a1,a1.gk(0),a4.h("p<l.E>")),a5=a.a.b,s=a.b,r=a7.x,q=A.k(r).h("T<2>"),p=(a0.r.length/8|0)+1,o=t._,a4=a4.h("l.E");a1.j();){n=a1.d
if(n==null)n=a4.a(n)
m=n.gcz()
l=A.c([],o)
for(k=n.f,j=k.a,k=k.b,i=0;i<=p;++i){h=A.c([],o)
for(g=0;g<J.N(m.bG(i));++g)h.push(new A.D(j+m.cj(i,g).a,k+m.cj(i,g).b))
B.a.C(h,new A.fd(a8))
B.a.J(l,h)}for(k=l.length,f=0;f<l.length;l.length===k||(0,A.z)(l),++f){e=l[f]
if(!s.p(0,e)||B.a.D(a3,new A.fe(e,n))||new A.T(r,q).D(0,new A.ff(e)))continue
j=a.e
j===$&&A.M()
d=j.dK(a8,e,a0,n)
if(!d.d)continue
j=a.r
j===$&&A.M()
h=a7.f
c=a5.i(0,"soldierLimit")
c.toString
b=j.cv(a7,a8,d,!0,Math.min(a2,Math.max(0,h-B.b.m(c))),"\u91ca\u653e\u540e\u65b9\u53ca\u524d\u7ebf\u591a\u4f59\u5175\u529b\uff0c\u8d34\u7740\u6700\u8fd1\u654c\u57ce\u7684\u5916\u56f4\u683c\u5b50\u96c6\u7ed3\uff0c\u5230\u8fbe\u540e\u4f9d\u6b21\u8f6e\u653b","staging",n)
if(b!=null)return b}}return null},
d4(b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=a5.c.Q,a7=a6.gP(),a8=a7.$ti,a9=a8.h("d<b.E>"),b0=A.n(new A.d(a7,a8.h("e(b.E)").a(new A.fg(a5)),a9),a9.h("b.E"))
if(b0.length<2)return null
a7=a6.f
a8=A.f(a7)
a9=a8.h("d<1>")
s=A.n(new A.d(a7,a8.h("e(1)").a(new A.fh(a5,b2)),a9),a9.h("b.E"))
a7=t.S
a8=t.i
r=A.a4(a7,a8)
for(a9=b0.length,q=A.f(s),p=q.c,q=q.h("y<1>"),o=a5.a,n=o.r,m=n.go,l=0;l<b0.length;b0.length===a9||(0,A.z)(b0),++l){k=b0[l]
B.a.C(s,new A.fi(k))
j=new A.y(s,0,m,q)
j.W(s,0,m,p)
r.A(0,k.a,j.H(0,1/0,new A.fj(a5,k),a8))}B.a.C(b0,new A.fk(r))
for(a8=A.f(b0),a7=A.R(b0,0,A.W(2,"count",a7),a8.c),a9=a7.$ti,a7=new A.p(a7,a7.gk(0),a9.h("p<l.E>")),a8=a8.h("K<1>"),q=a8.h("p<l.E>"),p=a5.d,m=a6.c,j=a8.h("l.E"),n=n.at,a9=a9.h("l.E");a7.j();){i=a7.d
if(i==null)i=a9.a(i)
h=i.a
g=r.i(0,h)
g.toString
if(g>n)continue
for(g=new A.K(b0,a8),g=new A.p(g,g.gk(0),q),f=i.f,e=i.d;g.j();){d=g.d
if(d==null)d=j.a(d)
c=d.a
b=r.i(0,c)
b.toString
a=r.i(0,h)
a.toString
if(b<a+10)continue
a0=b1.u(c)
if(a0.length<=b1.a9(d))continue
c=A.f(a0)
b=c.h("d<1>")
a1=A.n(new A.d(a0,c.h("e(1)").a(new A.fl(b1)),b),b.h("b.E"))
B.a.C(a1,new A.fm())
c=A.f(a1)
b=c.h("y<1>")
a=new A.y(a1,0,2,b)
a.W(a1,0,2,c.c)
a=new A.p(a,a.gk(0),b.h("p<l.E>"))
b=b.h("l.E")
d=d.d
while(a.j()){c=a.d
if(c==null)c=b.a(c)
if(c.x<15||e>=o.ao(m)||d<o.ao(m)||B.a.D(b1.u(h),new A.fn(c)))continue
if(!p.a5())return null
a2=a5.e
a2===$&&A.M()
a3=a2.aF(c,f,a6,!0,i)
a2=a5.r
a2===$&&A.M()
a4=a2.ct(b1,c,a3,!0,!0,"\u540e\u65b9\u5efa\u8bbe\u5df2\u5b8c\u6210\uff0c\u5b89\u5168\u8f6c\u79fb\u9ad8\u5185\u653f\u5c06\u9886\u4e3b\u6301\u524d\u7ebf\u57ce\u9632\u5efa\u8bbe","transfer",i)
if(a4!=null)return a4}}}return null},
bj(a,b,c){var s,r,q=a.a,p=this.x.i(0,q),o=p==null?null:p.d
if(o==null)o=A.c([],t.D)
if(o.length===0)return!0
q=c.u(q)
p=A.f(q)
s=p.h("d<1>")
q=A.n(new A.d(q,p.h("e(1)").a(new A.f8(b)),s),s.h("b.E"))
p=A.f(q).h("K<1>")
r=A.R(new A.K(q,p),0,A.W(c.R(a),"count",t.S),p.h("l.E")).ap(0)
if(r.length===0)return!1
return B.a.aW(o,new A.f9(this,r,c,a))},
bP(b9,c0,c1,c2,c3,c4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=this,b5=null,b6="soldierLimit",b7=t.e,b8=A.c([],b7)
for(s=b4.c.Q,r=s.gP(),q=J.A(r.a),r=new A.V(q,r.b,r.$ti.h("V<1>")),p=b4.x,o=c0.c;r.j();){n=q.gn()
m=n.a
l=p.i(0,m)
if(l==null)l=b5
else l=l.d.length!==0||l.a.cx!=null
if(l===!0&&m!==o)continue
k=b9.a9(n)
j=Math.max(0,b9.u(m).length-k)
n=b9.u(m)
m=A.f(n)
l=m.h("d<1>")
i=A.n(new A.d(n,m.h("e(1)").a(new A.eZ(b4,b9,c1)),l),l.h("b.E"))
B.a.C(i,new A.f_(b4))
n=A.f(i)
m=new A.y(i,0,j,n.h("y<1>"))
m.W(i,0,j,n.c)
B.a.J(b8,m)}if(!B.a.p(b8,c0))return b5
B.a.aw(b8,c0)
B.a.C(b8,new A.f0(b4))
r=b4.e
r===$&&A.M()
q=c1.f
h=r.aE(c0,q,s,c1)
if(!h.d)return b5
g=A.c([c0],b7)
b7=t.N
f=A.U([c0.a,h],b7,t.bJ)
e=h.b
for(o=b4.a,n=o.r,m=t.S,l=A.R(b8,0,A.W(n.fy*2,"count",m),t.r),d=l.$ti,l=new A.p(l,l.gk(0),d.h("p<l.E>")),c=n.ok,d=d.h("l.E"),b=c2+c3,a=e;l.j();){a0=l.d
if(a0==null)a0=d.a(a0)
if(g.length>=c2)break
a1=b4.f
a1===$&&A.M()
a1=A.dL(a0,c1,s,o,a1,0).a[2]
if(a1===0||a1>b)continue
a2=r.aE(a0,q,s,c1)
if(!a2.d)continue
a1=a2.b
a3=Math.min(e,a1)
a4=Math.max(a,a1)
if(a4-a3>c)continue
B.a.l(g,a0)
f.A(0,a0.a,a2)
a=a4
e=a3}if(g.length<c2)return b5
a5=A.c([],t.w)
a6=A.c([],t.m)
a7=A.a4(b7,b7)
b7=s.u(c1.a)
r=A.f(b7).h("K<1>")
a8=A.R(new A.K(b7,r),0,A.W(c1.ga2(),"count",m),r.h("l.E")).ap(0)
for(b7=n.fx,o=o.b,r=c2===1,a9=b9,b0=0;b0<g.length;++b0){b1=g[b0]
q=b1.c
n=p.i(0,q)
if(n==null)n=b5
else n=n.d.length!==0||n.a.cx!=null
if(n===!0){n=s.G(q)
n.toString
n=!b4.bj(n,b1,a9)}else n=!1
if(n)return b5
n=f.i(0,b1.a)
n.toString
for(m=s.gP(),l=J.A(m.a),m=new A.V(l,m.b,m.$ti.h("V<1>")),b2=0;m.j();){d=l.gn()
b=d.a
a0=a9.u(b).length
d=Math.min(Math.max(0,a0-(b===q?1:0)),a9.a9(d))
a0=o.i(0,b6)
a0.toString
b2+=d*B.b.m(a0)}q=b4.r
q===$&&A.M()
m=r?"\u56f4\u7ed5\u4e3b\u653b\u76ee\u6807\u6295\u5165\u8db3\u591f\u6218\u529b\uff0c\u4fdd\u7559\u5176\u4ed6\u65b9\u5411\u5175\u529b":"\u96c6\u4e2d\u4f18\u52bf\u7f16\u961f\u8f6e\u653b\u540c\u4e00\u5ea7\u57ce\uff0c\u62b5\u8fbe\u95f4\u9694\u4e0d\u8d85\u8fc7"+B.b.m(c)+"\u79d2"
l=a9.f
d=o.i(0,b6)
d.toString
b3=q.by(a9,b1,n,c4,Math.min(b2,Math.max(0,l-B.b.m(d))),c3+b0,m,"expedition",c1)
if(b3==null)return b5
a9=b3.a
q=b3.b
B.a.J(a5,q.b)
B.a.J(a6,q.d)
a7.J(0,q.c)
if(a5.length>b7){b4.d.e=!0
return b5}}b7=b4.r
b7===$&&A.M()
a7.J(0,b7.a_(a8,A.c([],t.Y)))
if(c4)b7="\u5148\u6d3e\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u5c06\u9886\u8fdb\u653b\u524d\u6392\uff0c\u6301\u7eed\u8f6e\u653b\u5e76\u8865\u5145\u6218\u635f"
else b7=r?"\u6267\u884c\u9759\u6001\u4f18\u52bf\u660e\u786e\u3001\u53ef\u4ee5\u4f9b\u517b\u7684\u6269\u5f20":"\u6574\u961f\u540e\u52e4\u51c6\u5907\u5b8c\u6210\uff0c\u6309\u771f\u5b9e\u6392\u961f\u89c4\u5219\u8f6e\u653b\uff1b\u4e0d\u9884\u6f14\u672a\u6765\u4f24\u4ea1"
return new A.co(a9,new A.I(b7,a5,a7,a6,a9.X().a,!1))},
d6(a,b,c){var s=this.c
return A.by(a,b,s.Q,this.a,s.f,c)},
aU(a,b){return this.d6(a,b,null)}}
A.fo.prototype={
$1(a){return t.a.a(a).ga7()},
$S:14}
A.fp.prototype={
$1(a){var s,r,q
t.J.a(a)
s=this.a.c.Q
r=s.a6(a.a)
q=!1
if(r!=null)if(r.b===s.a)if(!r.fr)if(r.f>0){s=r.as
s=!(s===B.e||s===B.d)&&r.fy===a.ax}else s=q
else s=q
else s=q
else s=q
return s},
$S:7}
A.fq.prototype={
$1(a){t.a.a(a)
return a.d.length!==0||a.a.cx!=null},
$S:14}
A.fB.prototype={
$2(a,b){var s,r=t.a
r.a(a)
r.a(b)
if(a.ga7()!==b.ga7())return a.ga7()?-1:1
s=B.b.t(a.gac(),b.gac())
return s!==0?s:B.b.t(b.w+b.a.z*4,a.w+a.a.z*4)},
$S:36}
A.fF.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:8}
A.fG.prototype={
$2(a,b){var s,r=t.dp
r.a(a)
r.a(b)
r=a.e
s=b.e
return r!==s?B.c.t(r,s):B.b.t(b.d,a.d)},
$S:32}
A.fH.prototype={
$1(a){t.r.a(a)
return a.b===this.a.c.Q.a&&!a.fr&&a.dy},
$S:0}
A.fI.prototype={
$1(a){t.r.a(a)
return this.a.c.x!==B.p},
$S:0}
A.fJ.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.Q.a&&a.cy&&s.x!==B.p&&!a.fr&&!this.a.a.Q.p(0,a.a)},
$S:0}
A.fK.prototype={
$1(a){var s,r,q,p,o,n,m,l=this,k=null
t.q.a(a)
s=l.a
r=a.a
q=s.a.M(r)
p=!1
if(!l.c){o=l.d
n=o==null
if((n?k:o.as)===!0)p=(n?k:o.d)===r}p=p?1:0
o=l.b
n=o.x
m=n.i(0,r)
if(m==null)m=k
else m=m.d.length!==0||m.a.cx!=null
s=s.a
s=m===!0?s.R(a):Math.max(s.R(a),a.at+o.a.r.cy)
if(q-p<s){s=n.i(0,r)
if(s==null)s=k
else s=s.d.length!==0||s.a.cx!=null
if(s===!0){s=n.i(0,r)
if(s==null)s=k
else{s=s.f
s=s==null?k:s.a}s=s===B.f}else s=!0}else s=!1
return s},
$S:1}
A.fL.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(a.f.E(s),b.f.E(s))},
$S:3}
A.fr.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b.c
r=!1
if(a.b===s.Q.a)if(a.cx){r=this.a
s=r.a.az(a)&&!this.c&&s.x!==B.r&&!a.fr&&!r.a.y.p(0,a.a)}else s=r
else s=r
return s},
$S:0}
A.fs.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.af(b,s.G(b.c).d<q.ao(r)),A.af(a,s.G(a.c).d<q.ao(r)))},
$S:2}
A.ft.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.a
r=!1
if(a.b!==s.c.Q.a)if(this.b.aD(a)){q=s.r
q===$&&A.M()
if(q.ae(a)){r=this.d.i(0,a.a)
if(r==null)r=0
s=r<s.a.r.fy}else s=r}else s=r
else s=r
return s},
$S:1}
A.fu.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.b
if(a.a===r.ga1())r=-1
else if(b.a===r.ga1())r=1
else{r=this.a
s=this.c
s=B.b.t(r.aU(b,s),r.aU(a,s))
r=s}return r},
$S:3}
A.fv.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:8}
A.fw.prototype={
$1(a){return A.h(a)+this.a.a.b.d.length},
$S:17}
A.fx.prototype={
$0(){return this.a.a.b.d.length},
$S:12}
A.fy.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:8}
A.fz.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:8}
A.fA.prototype={
$1(a){var s,r
t.q.a(a)
s=this.a
r=!1
if(a.b!==s.c.Q.a)if(this.b.aD(a)){s=s.r
s===$&&A.M()
s=s.ae(a)}else s=r
else s=r
return s},
$S:1}
A.fC.prototype={
$1(a){t.r.a(a)
return a.dx&&!this.a.a.Q.p(0,a.a)},
$S:0}
A.fD.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fE.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.f5.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=!1
if(a.b===s.c.Q.a)if(a.cx){q=this.b
if(q.az(a))if(!q.Q.p(0,a.a)){s=s.x.i(0,a.c)
if(s==null)s=null
else s=s.d.length!==0||s.a.cx!=null
s=s!==!0}else s=r
else s=r}else s=r
else s=r
return s},
$S:0}
A.f6.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.f
return B.b.t(a.z.E(s),b.z.E(s))},
$S:2}
A.eU.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:5}
A.f1.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.f2.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.b
s=a.a===r
if(s!==(b.a===r))return s?-1:1
r=this.a
s=this.c
return B.b.t(r.aU(b,s),r.aU(a,s))},
$S:3}
A.f3.prototype={
$1(a){var s,r
t.J.a(a)
s=a.a
r=!1
if(s!==this.b.a)if(a.b==="expedition")if(a.d===this.c.a){s=this.a.c.Q.a6(s)
s=(s==null?null:s.fr)===!1}else s=r
else s=r
else s=r
return s},
$S:7}
A.f4.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:5}
A.eV.prototype={
$1(a){var s,r,q,p,o,n,m
t.r.a(a)
s=this.b
r=a.a
q=s.x.i(0,r)
p=this.a
o=!1
if(a.b===p.c.Q.a)if(a.cy)if(a.as===B.i)if(!a.p1)if(!a.fr)if(a.f>=a.r*0.65){n=a.gK()
m=p.a.b.i(0,"soldierLimit")
m.toString
if(n===B.b.m(m))if(!s.Q.p(0,r)){s=q==null
if((s?null:q.b)==="staging"){s=s?null:q.d
r=this.c
if(s===r.a){s=p.r
s===$&&A.M()
r=s.ae(r)
s=r}else s=o}else s=o}else s=o
else s=o}else s=o
else s=o
else s=o
else s=o
else s=o
else s=o
return s},
$S:0}
A.eW.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(b.w*b.f/b.r,a.w*a.f/a.r)},
$S:2}
A.eX.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:5}
A.eY.prototype={
$2(a,b){return A.u(a)+A.am(b)},
$S:13}
A.fa.prototype={
$2(a,b){var s,r,q,p,o
A.h(a)
t.q.a(b)
s=this.b
r=b.a
q=s.u(r).length
p=this.c
o=p.as
s=Math.min(Math.max(0,q-((o===B.e||o===B.d)&&p.c===r?1:0)),s.a9(b))
q=this.a.a.b.i(0,"soldierLimit")
q.toString
return a+s*B.b.m(q)},
$S:6}
A.fb.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.fc.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(s.E(a.f),s.E(b.f))},
$S:3}
A.fd.prototype={
$2(a,b){var s=t.W
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(s.E(a),s.E(b))},
$S:34}
A.fe.prototype={
$1(a){var s,r
t.q.a(a)
s=a.r
r=this.a
if(s.p(0,r))s=a.a!==this.b.a||s.Y(r).E(r)>1e-7
else s=!1
return s},
$S:1}
A.ff.prototype={
$1(a){var s,r=t.J.a(a).w,q=J.aH(r)
if(q.gaa(r)){s=this.a
r=Math.abs(q.gU(r).a-s.a)<15.9999999&&Math.abs(q.gU(r).b-s.b)<15.9999999}else r=!1
return r},
$S:7}
A.fg.prototype={
$1(a){var s=this.a.x.i(0,t.q.a(a).a)
if(s==null)s=null
else s=s.d.length!==0||s.a.cx!=null
return s!==!0},
$S:1}
A.fh.prototype={
$1(a){t.q.a(a)
return a.b!==this.a.c.Q.a&&this.b.aD(a)},
$S:1}
A.fi.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.f
return B.b.t(a.f.E(s),b.f.E(s))},
$S:3}
A.fj.prototype={
$2(a,b){var s,r
A.am(a)
t.q.a(b)
s=this.a.e
s===$&&A.M()
r=this.b.f
return Math.min(a,s.al(r,b.r.Y(r)))},
$S:35}
A.fk.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.a
s=r.i(0,a.a)
s.toString
r=r.i(0,b.a)
r.toString
return B.b.t(s,r)},
$S:3}
A.fl.prototype={
$1(a){t.r.a(a)
return a.cx&&a.e!==2&&!this.a.Q.p(0,a.a)},
$S:0}
A.fm.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.af(s.a(b),!0),A.af(a,!0))},
$S:2}
A.fn.prototype={
$1(a){return t.r.a(a).x>=this.a.x},
$S:0}
A.f8.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.f9.prototype={
$1(a){var s=this
return B.a.D(s.b,new A.f7(s.a,t.O.a(a),s.c,s.d))},
$S:10}
A.f7.prototype={
$1(a){var s,r,q,p,o,n=this,m="soldierLimit"
t.r.a(a)
s=n.a
r=s.f
r===$&&A.M()
q=n.c
p=q.R(n.d)
s=s.a.b
o=s.i(0,m)
o.toString
o=B.b.m(o)
q=q.e
s=s.i(0,m)
s.toString
return r.aJ(a,n.b.a,p,Math.min(o,Math.max(0,q-B.b.m(s)))).a===B.f},
$S:0}
A.eZ.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.cx){r=this.b
if(!r.Q.p(0,a.a))if(r.az(a)){s=this.a.r
s===$&&A.M()
s=s.ae(this.c)}}return s},
$S:0}
A.f_.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.af(b,s.G(b.c).d<q.ao(r)),A.af(a,s.G(a.c).d<q.ao(r)))},
$S:2}
A.f0.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.af(b,s.G(b.c).d<q.ao(r)),A.af(a,s.G(a.c).d<q.ao(r)))},
$S:2}
A.ag.prototype={}
A.fM.prototype={
c6(a,b){return new A.aB(this.da(a,b),t.dT)},
da(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e
return function $async$c6(c,d,a0){if(d===1){n.push(a0)
p=o}for(;;)switch(p){case 0:i=s.a4(r,q)
h=r.a
g=h.a
f=q.M(g)<=q.R(h)
e=!1
if(f)if(!r.ga7()){m=r.d
if(m.length!==0)if(B.a.aW(m,new A.hl(s,q))){e=q.x
e=!new A.T(e,A.k(e).h("T<2>")).D(0,new A.hm(r))}}p=e?3:4
break
case 3:p=5
return c.b=new A.ag(q,A.c([],t.Z),s.am(r,q),!1,"\u5df2\u6709\u622a\u51fb\u90e8\u961f\u80fd\u53ca\u65f6\u63a5\u654c\uff0c\u7b49\u5f85\u6267\u884c\u7ed3\u679c\uff0c\u4e0d\u91cd\u590d\u6d3e\u51fa\u7b2c\u4e8c\u652f\u90e8\u961f","hold"),1
case 5:p=1
break
case 4:e=!1
if(f)if(!r.ga7())e=(i==null?null:i.a)===B.f
p=e?6:7
break
case 6:p=8
return c.b=new A.ag(q,A.c([],t.Z),s.am(r,q),!1,"\u57ce\u9632\u4e0e\u73b0\u6709\u5b88\u5c06\u8db3\u4ee5\u5e94\u5bf9\u53ef\u89c1\u6765\u654c\uff0c\u7ef4\u6301\u8fdc\u5f81\uff0c\u4e0d\u53ec\u56de\u5c06\u9886","hold"),1
case 8:p=1
break
case 7:e=s.bE(r,q)
l=A.n(e,e.$ti.h("b.E"))
e=A.f(l)
m=e.h("e(1)")
e=e.h("d<1>")
k=A.n(new A.d(l,m.a(new A.hn(s,r,i,q)),e),e.h("b.E"))
p=k.length!==0?9:10
break
case 9:p=11
return c.c_(k)
case 11:p=1
break
case 10:p=f&&q.M(g)<q.R(h)?12:13
break
case 12:j=q.S()
p=j.dB(h,!0)&&j.d>=j.au(!0).a?14:15
break
case 14:p=16
return c.b=s.aI(r,q,j,A.c([new A.x(B.w,null,g,null,0)],t.w),"\u672c\u5730\u4ecd\u6709\u8fce\u6218\u540d\u989d\uff0c\u5148\u62db\u52df\u8865\u5f3a\uff0c\u518d\u6309\u5b9e\u9645\u5230\u4efb\u5c5e\u6027\u590d\u6838\uff0c\u6682\u4e0d\u53ec\u56de\u8fdc\u5f81"),1
case 16:p=1
break
case 15:case 13:p=17
return c.c_(new A.d(l,m.a(new A.ho(B.a.D(l,new A.hp()))),e))
case 17:case 1:return 0
case 2:return c.c=n.at(-1),3}}}},
bE(a,b){return new A.aB(this.cJ(a,b),t.dT)},
cJ(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e,d,c,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1
return function $async$bE(g2,g3,g4){if(g3===1){n.push(g4)
p=o}for(;;)switch(p){case 0:f5=r.a
f6=f5.a
f7=q.M(f6)>q.R(f5)
f8=t.Z
f9=A.c([],f8)
g0=s.am(r,q)
g1=!f7
if(g1){m=s.a4(r,q)
m=(m==null?null:m.a)!==B.f}else m=!0
p=3
return g2.b=new A.ag(q,f9,g0,m,f7?"unsalvageableDefense\uff1a\u5f53\u524d\u5b89\u5168\u540d\u989d "+q.R(f5)+"\uff0c\u9a7b\u519b "+q.M(f6)+"\uff0c\u7b49\u5f85\u5408\u6cd5\u4fee\u590d":"\u4fdd\u6301\u53ef\u51fa\u573a\u5b88\u519b\uff0c\u7ee7\u7eed\u76d1\u63a7\u5168\u90e8\u6765\u654c","local"),1
case 3:f9=s.c
if(!f9.a5()){p=1
break}l=q.S()
k=l.ar()
p=k>0?4:5
break
case 4:p=6
return g2.b=s.aI(r,q,l,A.c([new A.x(B.h,null,f6,null,k)],t.w),"\u4f18\u5148\u7528\u56fd\u5e93\u8865\u6ee1\u5168\u56fd\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u5224\u65ad\u662f\u5426\u9700\u8981\u5916\u63f4"),1
case 6:case 5:g0=f5.cx
m=g0==null
p=m?7:8
break
case 7:j=q.S()
i=A.c([],t.w)
h=j.u(f6)
g=A.f(h)
f=g.h("d<1>")
e=A.n(new A.d(h,g.h("e(1)").a(new A.fN()),f),f.h("b.E"))
B.a.C(e,new A.fO())
p=e.length!==0?9:10
break
case 9:d=B.a.gF(e)
h=d.a
g=j.w
f=s.b.b
c=f5.d
a0=0
case 11:if(a0<4){a1=g.i(0,f6)
a1.toString
a2=f.i(0,"maxLevel")
a2.toString
a2=a1<B.b.m(a2)
a1=a2}else a1=!1
if(!a1){p=12
break}if(!j.aN(f5,d)||j.d<j.au(!0).a){p=12
break}B.a.l(i,new A.x(B.k,h,f6,null,0))
a1=j.M(f6)
a2=g.i(0,f6)
if(a2==null)a2=c
p=a1<=a2?13:14
break
case 13:p=15
return g2.b=s.aI(r,q,j,i,"\u4f18\u5148\u7531\u9ad8\u5185\u653f\u5c06\u9886\u5347\u7ea7\uff0c\u4fdd\u62a4\u771f\u5b9e\u8fce\u6218\u540d\u989d"),1
case 15:a1=s.a4(r,j)
if((a1==null?null:a1.a)===B.f||f7){p=12
break}case 14:++a0
p=11
break
case 12:case 10:case 8:p=f7?16:17
break
case 16:h=q.u(f6)
g=A.f(h)
f=g.h("d<1>")
a3=A.n(new A.d(h,g.h("e(1)").a(new A.fP()),f),f.h("b.E"))
B.a.C(a3,new A.fY())
h=A.f(a3),g=A.R(a3,0,A.W(3,"count",t.S),h.c),f=g.$ti,g=new A.p(g,g.gk(0),f.h("p<l.E>")),c=f5.fx,a1=f5.cy,a2=f5.d,a4=t.T,a5=t.w,a6=t.e,a7=h.h("e(1)"),h=h.h("d<1>"),f=f.h("l.E")
case 18:if(!g.j()){p=19
break}a8=g.d
if(a8==null)a8=f.a(a8)
if(!f9.a5()){p=19
break}a9=q.S()
i=A.c([],a5)
b0=A.c([a8],a6)
B.a.J(b0,new A.d(a3,a7.a(new A.fZ(a8)),h))
a8=b0.length,b1=a9.w,b2=0
case 20:if(!(b2<b0.length)){p=22
break}b3=b0[b2]
b4=a9.M(f6)
if(m){b5=b1.i(0,f6)
if(b5==null)b5=a2}else{b5=c?1:0
b5=B.c.v(g0-a1-b5,0,5)}if(b4<=b5){p=22
break}if(!a9.ca(b3)){p=21
break}B.a.l(i,new A.x(B.v,b3.a,null,null,0))
p=m?23:24
break
case 23:b6=a9.S()
b7=A.n(i,a4)
b4=b6.u(f6)
b5=A.f(b4)
b8=b5.h("d<1>")
e=A.n(new A.d(b4,b5.h("e(1)").a(new A.h_()),b8),b8.h("b.E"))
B.a.C(e,new A.h0())
p=e.length!==0?25:26
break
case 25:b4=b6.w
b9=0
for(;;){if(b9<3){b5=b6.M(f6)
b8=b4.i(0,f6)
if(b8==null)b8=a2
b8=b5>b8
b5=b8}else b5=!1
if(!b5)break
if(!b6.aN(f5,B.a.gF(e)))break
B.a.l(b7,new A.x(B.k,B.a.gF(e).a,f6,null,0));++b9}b5=b6.M(f6)
b4=b4.i(0,f6)
if(b4==null)b4=a2
p=b5<=b4&&b6.d>=b6.au(!0).a?27:28
break
case 27:p=29
return g2.b=s.aI(r,q,b6,b7,"\u5148\u89e3\u96c7\u4f4e\u4ea4\u6362\u4ef7\u503c\u6321\u4f4d\u8005\u7b79\u8d44\uff0c\u4fdd\u7559\u4e3b\u6301\u8005\u5b8c\u6210\u6551\u57ce\u5347\u7ea7"),1
case 29:case 28:case 26:case 24:case 21:b0.length===a8||(0,A.z)(b0),++b2
p=20
break
case 22:a8=a9.M(f6)
if(m){b0=b1.i(0,f6)
if(b0==null)b0=a2}else{b0=c?1:0
b0=B.c.v(g0-a1-b0,0,5)}p=a8<=b0?30:31
break
case 30:p=32
return g2.b=s.aI(r,q,a9,i,"\u6ca1\u6709\u53ef\u652f\u4ed8\u4e14\u53ca\u65f6\u7684\u5347\u7ea7\u65b9\u6848\uff0c\u6e05\u51fa\u6321\u4f4d\u5b88\u5c06\u5e76\u4fdd\u7559\u6838\u5fc3\u51fa\u573a"),1
case 32:case 31:p=18
break
case 19:case 17:c0=s.d2(r,q)
h=q.u(f6)
g=A.f(h)
f=g.h("d<1>")
c1=A.n(new A.d(h,g.h("e(1)").a(new A.h1(q)),f),f.h("b.E"))
B.a.C(c1,new A.h2(s,c0,q,f5))
p=(!g1||c0)&&s.a.Q.gP().gk(0)>1?33:34
break
case 33:c2=q.S()
if(c0)c2.at.l(0,f6)
c3=A.c([],f8)
g1=s.a.Q
h=g1.gP()
g=h.$ti
f=g.h("d<b.E>")
c4=A.n(new A.d(h,g.h("e(b.E)").a(new A.h3(f5)),f),f.h("b.E"))
B.a.C(c4,new A.h4(f5))
h=A.R(c1,0,A.W(s.b.r.fy,"count",t.S),A.f(c1).c),g=h.$ti,h=new A.p(h,h.gk(0),g.h("p<l.E>")),f=f5.fx,c=f5.cy,a1=A.f(c4),a2=a1.c,a1=a1.h("y<1>"),a4=a1.h("p<l.E>"),a5=s.e,a6=a5.c,a7=s.f,a8=a1.h("l.E"),g=g.h("l.E"),b0=f5.d,b1=t.er,b4=t.bo,b5=t.i,b8=t.I
case 35:if(!h.j()){p=36
break}c5=h.d
if(c5==null)c5=g.a(c5)
if(!f9.a5()){p=36
break}c6=new A.y(c4,0,4,a1)
c6.W(c4,0,4,a2)
c6=new A.p(c6,c6.gk(0),a4)
c7=c2.w
c8=null
while(c6.j()){c9=c6.d
if(c9==null)c9=a8.a(c9)
d0=c9.a
d1=a7.i(0,d0)
d2=d1==null
if(d2)d3=null
else d3=d1.d.length!==0||d1.a.cx!=null
if(d3===!0){if(d2)d2=null
else{d2=d1.f
d2=d2==null?null:d2.a}d2=d2!==B.f}else d2=!1
if(d2)continue
d2=c2.M(d0)
d3=c9.cx
if(d3==null){d0=c7.i(0,d0)
if(d0==null)d0=c9.d}else{d0=c9.cy
d4=c9.fx?1:0
d4=B.c.v(d3-d0-d4,0,5)
d0=d4}if(d2>=d0)continue
d5=a6.aF(c5,c9.f,g1,!0,c9)
d0=c0?"evacuate":"transfer"
d2=c0?"\u73b0\u6709\u6838\u5fc3\u4e5f\u660e\u786e\u5904\u4e8e\u52a3\u52bf\uff0c\u5728\u5371\u9669\u7a97\u53e3\u524d\u8f6c\u79fb\u4fdd\u5168\u5c06\u9886\uff0c\u539f\u57ce\u98ce\u9669\u4ecd\u672a\u89e3\u51b3":"\u8f6c\u79fb\u591a\u4f59\u7684\u5f31\u5c06\uff0c\u4e3a\u5f3a\u5c06\u4fdd\u7559\u672c\u57ce\u8fce\u6218\u540d\u989d"
d6=a5.b3(c2,c5,d5,!0,r.gac(),!0,d2,d0,c9)
if(d6!=null)c9=c8==null||d6.a.d>c8.a.d
else c9=!1
if(c9)c8=d6}if(c8==null){p=35
break}c2=c8.a
B.a.l(c3,c8.b)
c5=c2.M(f6)
if(m){c6=c2.w.i(0,f6)
if(c6==null)c6=b0}else{c6=f?1:0
c6=B.c.v(g0-c-c6,0,5)}p=c5<=c6?37:38
break
case 37:d7=new A.c5(c3,b1.a(new A.fQ()),b4).H(0,0,new A.fR(s),b5)
c5=c2.S()
c6=A.n(c3,b8)
c7=s.am(r,c2)
c9=isFinite(r.gac())?"\u5b89\u5168\u5224\u65ad\u4ee5\u5b9e\u9645\u8fdb\u9a7b\u53cb\u57ce\u4e3a\u51c6\uff0c\u9014\u4e2d\u539f\u57ce\u5931\u5b88\u4ecd\u4f1a\u6e05\u9664\u90e8\u961f":"\u8f6c\u79fb\u5230\u5b89\u5168\u540e\u65b9\u6574\u5907"
d0=s.a4(r,c2)
d0=d0==null?null:d0.a
d2=c0?"relocation":"local"
p=39
return g2.b=new A.ag(c5,c6,c7+d7*0.65,d0!==B.f,c9,d2),1
case 39:if(f7){p=36
break}case 38:p=35
break
case 36:case 34:d8=s.bK(r,q)
d9=new A.h5(s,q)
g1=s.a.Q
h=g1.r
g=A.f(h)
f=g.h("d<1>")
e0=A.n(new A.d(h,g.h("e(1)").a(new A.fS(s,q,d9,d8)),f),f.h("b.E"))
B.a.C(e0,new A.fT(d9,f5))
h=r.d
g=h.length===0?0:s.b.r.fy
g=A.R(e0,0,A.W(g,"count",t.S),A.f(e0).c)
f=g.$ti
g=new A.p(g,g.gk(0),f.h("p<l.E>"))
c=s.e
a1=s.d
a2=c.c
a4=a2.a
a5=q.x
a6=!d8
a7=s.f
f=f.h("l.E")
a8=f5.fx
b0=f5.cy
b1=f5.d
b4=q.w
b5=r.f
b8=s.b.b
c5=A.f(h)
c6=c5.h("o(1)")
c7=c5.h("O<1,o>")
c9=f5.f
d0=c5.c
c5=c5.h("y<1>")
d2=c5.h("p<l.E>")
d3=c5.h("l.E")
d4=b5==null
case 40:if(!g.j()){p=41
break}e1=g.d
if(e1==null)e1=f.a(e1)
if(!f9.a5()){p=41
break}e2=e1.c
e3=a7.i(0,e2)
e4=r.gac()
e5=e3==null
if(e5)e6=null
else e6=e3.d.length!==0||e3.a.cx!=null
e6=e6===!0?e3.gac():1/0
e7=Math.min(e4,e6)
e4=!1
if(!d9.$1(e1)||d8){e6=s.a4(r,q)
if((e6==null?null:e6.a)!==B.f){e4=q.M(f6)
if(m){e6=b4.i(0,f6)
if(e6==null)e6=b1}else{e6=a8?1:0
e6=B.c.v(g0-b0-e6,0,5)}e6=e4<e6
e4=e6}}p=e4?42:43
break
case 42:e8=new A.O(h,c6.a(new A.fU()),c7).ai(0,new A.fV(s))
if(m){e4=b4.i(0,f6)
if(e4==null)e4=b1}else{e4=a8?1:0
e4=B.c.v(g0-b0-e4,0,5)}e6=b8.i(0,"soldierLimit")
e6.toString
e9=a1.aJ(e1,e8,e4,Math.min(B.b.m(e6),q.e+e1.gK()))
e4=d4?null:b5.b
if(e4==null)e4=-1
p=e9.b>e4+0.05?44:45
break
case 44:d5=a2.aF(e1,c9,g1,!0,f5)
if(m){e4=b4.i(0,f6)
if(e4==null)e4=b1}else{e4=a8?1:0
e4=B.c.v(g0-b0-e4,0,5)}e6=s.a4(r,q)
e6=e6==null?null:e6.b
d6=c.b3(q,e1,d5,!0,e7,!0,"\u672c\u5730\u62b5\u6297\u4ecd\u6709\u7f3a\u53e3\uff08\u57ce\u9632"+e4+"\u7ea7\uff0c\u9632\u5b88\u4f59\u91cf"+B.b.aM((e6==null?-1:e6)*100)+"\u70b9\uff09\uff0c\u63f4\u519b\u7ea6"+B.b.b1(d5.b,1)+"\u79d2\u5230\u8fbe\uff0c\u5371\u9669\u7a97\u53e3"+B.b.b1(e7,1)+"\u79d2\uff0c\u9884\u7559\u5165\u57ce\u540d\u989d","rescue",f5)
if(d6!=null){e4=s.a4(r,d6.a)
e4=(e4==null?null:e4.a)===B.f}else e4=!1
p=e4?46:47
break
case 46:e4=d6.a
p=48
return g2.b=new A.ag(e4,A.c([d6.b],f8),s.am(r,e4)-A.a6(e1)*0.08,!1,"","recall"),1
case 48:case 47:case 45:case 43:e4=new A.y(h,0,2,c5)
e4.W(h,0,2,d0)
e4=new A.p(e4,e4.gk(0),d2)
e2=e2!==f6
e6=e1.a
f0=!e1.cy
case 49:if(!e4.j()){p=50
break}f1=e4.d
if(f1==null)f1=d3.a(f1)
if(f0){p=50
break}f2=a5.i(0,e6)
if((f2==null?null:f2.b)==="intercept"){f2=a5.i(0,e6)
f2=f2==null?null:f2.r
f3=f2===f1.a.a}else f3=!1
if(d9.$1(e1)&&a6&&!f3){p=49
break}f2=!1
if(e2){if(e5)f4=null
else f4=e3.d.length!==0||e3.a.cx!=null
if(f4===!0){if(e5)f2=null
else{f2=e3.f
f2=f2==null?null:f2.a}f2=f2!==B.f}}if(f2){p=49
break}f2=f1.a
d5=c.cd(e1,f2,q)
if(a1.dd(e1,f2,a4.c3(f2.z)).a!==B.f){p=49
break}f4=d9.$1(e1)?"\u672c\u5730\u624b\u6bb5\u65e0\u6cd5\u62b5\u6321\u660e\u786e\u6765\u88ad\uff0c\u7d27\u6025\u622a\u51fb\u9884\u8ba1"+B.b.b1(d5.b,1)+"\u79d2\uff0c\u65e9\u4e8e\u654c\u519b"+B.b.b1(f1.b,1)+"\u79d2\u62b5\u57ce\uff1b\u6700\u540e\u624d\u6539\u6d3e\u8fdc\u5f81":"\u52a8\u7528\u9644\u8fd1\u95f2\u7f6e\u90e8\u961f\u622a\u51fb\u6765\u654c\uff0c\u4e0d\u6253\u65ad\u4e3b\u653b\u4efb\u52a1"
d6=c.cw(q,e1,d5,f1.b,!0,f2,f4,"intercept",f5)
p=d6!=null?51:52
break
case 51:f1=d6.a
p=53
return g2.b=new A.ag(f1,A.c([d6.b],f8),s.am(r,f1)+80-A.a6(e1)*0.08,f7,"","recall"),1
case 53:case 52:p=49
break
case 50:p=40
break
case 41:if(g1.gP().gk(0)===1)h=(d4?null:b5.a)===B.u&&c1.length>1
else h=!1
p=h?54:55
break
case 54:h=g1.f,g=A.f(h),f=g.h("d<1>"),f=A.kI(new A.d(h,g.h("e(1)").a(new A.fW(s)),f),3,f.h("b.E")),g=f.a,f=new A.bp(g.gB(g),f.b,A.k(f).h("bp<1>"))
case 56:if(!f.j()){p=57
break}h=f.gn()
if(!f9.a5()){p=57
break}b3=B.a.ai(c1,new A.fX())
d6=c.cu(q,b3,a2.aF(b3,h.f,g1,!0,h),r.gac(),!0,"\u4fdd\u7559\u539f\u57ce\u5b88\u519b\u62d6\u5ef6\uff0c\u6838\u5fc3\u5728\u5371\u9669\u7a97\u53e3\u524d\u593a\u53d6\u7a7a\u57ce\u5efa\u7acb\u65b0\u636e\u70b9","newBase",h)
p=d6!=null?58:59
break
case 58:h=d6.a
g=A.c([d6.b],f8)
a1=s.am(r,h)
a4=A.a6(b3)
a5=h.M(f6)
if(m){a6=h.w.i(0,f6)
if(a6==null)a6=b1}else{a6=a8?1:0
a6=B.c.v(g0-b0-a6,0,5)}p=60
return g2.b=new A.ag(h,g,a1+a4*1.2,a5>a6,"","relocation"),1
case 60:case 59:p=56
break
case 57:case 55:case 1:return 0
case 2:return g2.c=n.at(-1),3}}}},
aI(a,b,c,d,e){var s,r,q,p,o,n,m,l,k=this
t.f3.a(d)
s=c.S()
r=B.a.D(d,new A.hc())?s.ar():0
q=A.f(d)
p=q.h("o?(1)").a(new A.hd(k))
o=c.y.dk(b.y).H(0,0,new A.he(k),t.i)
n=A.n(d,t.T)
m=k.e
q=A.n(new A.cx(new A.O(d,p,q.h("O<1,o?>")),t.gn),t.r)
p=a.d
l=A.f(p)
B.a.J(q,new A.O(p,l.h("o(1)").a(new A.hf()),l.h("O<1,o>")))
l=a.a
p=t.Y
q=A.c([new A.I(e,n,m.a_(q,A.c([l],p)),B.j,c.au(!0).a,!0)],t.Z)
if(r>0)q.push(new A.I("\u57ce\u9632\u5347\u7ea7\u540e\u5728\u540c\u4e00\u6b21\u8865\u5175\u7a97\u53e3\u5185\u5c3d\u91cf\u8865\u6ee1\u5168\u56fd\u5175\u5458\u5bb9\u91cf",A.c([new A.x(B.h,null,l.a,null,r)],t.w),m.a_(A.c([],t.e),A.c([l],p)),B.j,0,!0))
p=k.am(a,s)
n=Math.max(0,b.d-s.d)
if(s.M(l.a)<=s.R(l)){m=k.a4(a,s)
m=(m==null?null:m.a)!==B.f}else m=!0
return new A.ag(s,q,p-o*0.65-n*0.2,m,"","local")},
cS(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=b.x,s=new A.al(s,s.r,s.e,A.k(s).h("al<2>")),r=this.e,q=a.a,p=q.a,o=this.a.Q,n=o.b,m=b.y,l=this.b.r.d,k=a.b;s.j();){j=s.d
if(j.b!=="intercept"||j.r!==p||j.y<=n)continue
i=o.a6(j.a)
if(i==null||i.f<=0||i.fr||m.p(0,i.a))continue
if(i.go===p)return!0
if(!i.cy||j.z<=n)continue
h=r.cd(i,q,b)
if(h.d&&h.b+l<k)return!0}return!1},
bK(a,b){var s,r
if(this.c.e)return!1
s=a.a
if(!(s.cx!=null||B.a.D(a.d,new A.h6())))return!1
if(a.ga7())return!0
if(b.u(s.a).length===0)return!0
r=this.a4(a,b)
return r!=null&&r.c<-this.b.r.p3},
d2(a8,a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7=this
if(!a7.bK(a8,a9))return!1
s=a8.a
r=s.a
q=a9.u(r)
p=q.length
if(p===0)return!1
for(o=a8.d,n=a7.b,m=n.b,l=a7.d,k=s.d,j=a9.w,i=a7.c,n=-n.r.p3,h=s.fx,g=s.cy,s=s.cx,f=s==null,e=0;e<q.length;q.length===p||(0,A.z)(q),++e){d=q[e]
for(c=o.length,b=d.as===B.d,a=null,a0=0;a0<o.length;o.length===c||(0,A.z)(o),++a0){a1=o[a0]
if(f){a2=j.i(0,r)
if(a2==null)a2=k}else{a2=h?1:0
a2=B.c.v(s-g-a2,0,5)}a2=Math.max(1,a2)
a3=d.gK()
if(b)a4=0
else{a4=a9.e
a5=m.i(0,"soldierLimit")
a5.toString
a5=Math.min(a4,B.b.m(a5)-d.gK())
a4=a5}a6=l.aJ(d,a1.a,a2,a3+a4)
if(a6.a===B.A||i.e)return!1
if(a==null||a6.b<a.b)a=a6}if(a==null||a.c>=n)return!1}return!0},
a4(b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this,b2=null,b3=b4.d
if(b3.length===0)return b2
s=b4.a
r=s.a
q=b5.u(r)
p=b5.e
for(o=b5.x,o=new A.al(o,o.r,o.e,A.k(o).h("al<2>")),n=t.N,m=t.z,l=t.n,k=b1.e.c,j=b1.a.Q,i=j.b,h=b5.y,g=b1.b,f=g.r.d;o.j();){e=o.d
if(!e.as||e.d!==r||e.y<i)continue
d=j.a6(e.a)
if(d==null||d.fr||d.go!=null||d.f<=0||h.p(0,d.a)||B.a.D(q,new A.h9(d)))continue
c=d.z
for(e=J.dP(e.w,e.x),b=e.$ti,e=new A.p(e,e.gk(0),b.h("p<l.E>")),b=b.h("l.E"),a=0;e.j();c=a1){a0=e.d
a1=a0==null?b.a(a0):a0
a+=k.al(c,a1)}if(!isFinite(a)||a+f>=b4.gac())continue
p=Math.min(b5.f,p+d.gK())
e=A.ai(d.L(),n,m)
e.A(0,"hp",d.r)
e.A(0,"troops",A.c([],l))
e.A(0,"s",0)
B.a.l(q,A.kl(e))}B.a.C(q,A.lh())
o=A.f(q)
n=t.r
a2=A.b2(new A.d(q,o.h("e(1)").a(new A.ha(b4)),o.h("d<1>")),n)
m=A.c([],t.e)
if(a2!=null)m.push(a2)
o=o.h("K<1>")
B.a.J(m,new A.K(q,o).bC(0,o.h("e(l.E)").a(new A.hb(a2))))
a3=A.R(m,0,A.W(b5.R(s),"count",t.S),n).ap(0)
if(a3.length===0)return b2
for(o=b1.d,n=s.d,m=b5.w,g=g.b,l=s.dx,k=s.fx,j=s.cy,s=s.cx,i=s==null,a4=b2,a5=0;a5<a3.length;++a5){d=a3[a5]
if(d.as===B.d)a6=0
else{h=g.i(0,"soldierLimit")
h.toString
a6=Math.min(p,B.b.m(h)-d.gK())}p-=a6
for(h=b3.length,a7=b2,a8=0;a8<b3.length;b3.length===h||(0,A.z)(b3),++a8){a9=b3[a8]
if(i){f=m.i(0,r)
if(f==null)f=n}else{f=k?1:0
f=B.c.v(s-j-f,0,5)}b0=o.aJ(d,a9.a,Math.max(1,f-a5),d.gK()+a6)
if(a7==null||b0.b<a7.b)a7=b0}if(d.e===2&&d.a===l)return a7
if(a4==null||a7.b>a4.b)a4=a7}return a4},
am(a,b){var s,r,q,p=a.a,o=p.a,n=b.M(o),m=Math.max(0,n-b.R(p))
o=b.u(o)
s=A.f(o)
s=new A.d(o,s.h("e(1)").a(new A.h7()),s.h("d<1>")).H(0,0,new A.h8(),t.H)
o=this.a.Q.gP().gk(0)===1?400:0
r=150+p.z*4+a.w*0.5+s+o
q=this.a4(a,b)
p=n===0?r*2:0
o=q==null?null:q.b
if(o==null)o=-0.8
return-m*5000-p+o*r}}
A.hl.prototype={
$1(a){return this.a.cS(t.O.a(a),this.b)},
$S:10}
A.hm.prototype={
$1(a){t.J.a(a)
return a.f&&B.a.D(this.a.d,new A.hk(a))},
$S:7}
A.hk.prototype={
$1(a){return t.O.a(a).a.a===this.a.r},
$S:10}
A.hn.prototype={
$1(a){var s,r,q,p,o,n,m=this
t.x.a(a)
s=!1
if(a.f==="local"){r=a.b
if(r.length!==0)if(B.a.D(r,new A.hi())){q=a.a
p=m.b
o=p.a
if(q.M(o.a)<=q.R(o)){o=m.a
n=o.a4(p,q)
n=n==null?null:n.c
if(n==null)n=-1
if(n>=-o.b.r.p3){s=o.a4(p,q)
s=s==null?null:s.b
if(s==null)s=-1
q=m.c
q=q==null?null:q.b
s=(s>(q==null?-1:q)+0.04||B.a.D(r,new A.hj()))&&a.c>o.am(p,m.d)}}}}return s},
$S:18}
A.hi.prototype={
$1(a){return B.a.D(t.I.a(a).b,new A.hh())},
$S:28}
A.hh.prototype={
$1(a){var s=t.T.a(a).a
return s===B.k||s===B.v||s===B.h||s===B.C},
$S:11}
A.hj.prototype={
$1(a){return B.a.D(t.I.a(a).d,new A.hg())},
$S:28}
A.hg.prototype={
$1(a){return t.J.a(a).b==="intercept"},
$S:7}
A.hp.prototype={
$1(a){t.x.a(a)
return a.f!=="relocation"&&!a.d},
$S:18}
A.ho.prototype={
$1(a){t.x.a(a)
return!this.a||a.f!=="relocation"},
$S:18}
A.fN.prototype={
$1(a){return t.r.a(a).dx},
$S:0}
A.fO.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fP.prototype={
$1(a){t.r.a(a)
return a.db&&a.e!==2},
$S:0}
A.fY.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.a6(a),A.a6(b))},
$S:2}
A.fZ.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.h_.prototype={
$1(a){return t.r.a(a).dx},
$S:0}
A.h0.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.h1.prototype={
$1(a){t.r.a(a)
return a.cx&&!this.a.Q.p(0,a.a)},
$S:0}
A.h2.prototype={
$2(a,b){var s,r,q,p,o,n,m=this,l="soldierLimit",k=t.r
k.a(a)
k.a(b)
if(m.b)return B.b.t(A.a6(b),A.a6(a))
k=m.a.b
s=m.c
r=m.d
q=s.R(r)
p=k.b
o=p.i(0,l)
o.toString
o=A.bT(a,k,q,B.b.m(o))
r=s.R(r)
p=p.i(0,l)
p.toString
n=B.b.t(o,A.bT(b,k,r,B.b.m(p)))
return n!==0?n:B.b.t(A.a6(a),A.a6(b))},
$S:2}
A.h3.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:1}
A.h4.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.f
return B.b.t(a.f.E(s),b.f.E(s))},
$S:3}
A.fQ.prototype={
$1(a){return t.I.a(a).d},
$S:40}
A.fR.prototype={
$2(a,b){var s
A.am(a)
s=this.a.a.Q.a6(t.J.a(b).a)
s.toString
return a+A.a6(s)},
$S:41}
A.h5.prototype={
$1(a){var s,r,q=this.a.a.Q,p=this.b
if(A.k7(a,q,p)==null){p=p.x
s=a.a
r=p.i(0,s)
if((r==null?null:r.b)==="intercept"){p=p.i(0,s)
q=q.a6(p==null?null:p.r)
q=q==null?null:q.f
q=(q==null?0:q)>0}else q=!1}else q=!0
return q},
$S:0}
A.fS.prototype={
$1(a){var s,r,q,p,o=this
t.r.a(a)
s=o.a.a.Q
r=!1
if(a.b===s.a){if(!a.cy)if(a.cx){s=s.G(a.c)
s.toString
s=o.b.ak(s)}else s=!1
else s=!0
if(s)if(!a.fr){s=o.b
q=a.a
p=s.x.i(0,q)
if((p==null?null:p.as)!==!0)if(!s.Q.p(0,q))s=!o.c.$1(a)||o.d
else s=r
else s=r}else s=r
else s=r}else s=r
return s},
$S:0}
A.fT.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a
if(!J.aE(s.$1(a),s.$1(b)))return s.$1(a)?1:-1
s=this.b.f
return B.b.t(a.z.E(s),b.z.E(s))},
$S:2}
A.fU.prototype={
$1(a){return t.O.a(a).a},
$S:27}
A.fV.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.lb(a,s)>A.lb(b,s)?a:b},
$S:16}
A.fW.prototype={
$1(a){var s
t.q.a(a)
s=this.a.a.Q
return a.b!==s.a&&s.u(a.a).length===0},
$S:1}
A.fX.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return A.a6(a)>=A.a6(b)?a:b},
$S:16}
A.hc.prototype={
$1(a){return t.T.a(a).a===B.k},
$S:11}
A.hd.prototype={
$1(a){return this.a.a.Q.a6(t.T.a(a).b)},
$S:67}
A.he.prototype={
$2(a,b){var s
A.am(a)
s=this.a.a.Q.a6(A.L(b))
s.toString
return a+A.a6(s)},
$S:45}
A.hf.prototype={
$1(a){return t.O.a(a).a},
$S:27}
A.h6.prototype={
$1(a){var s,r,q
t.O.a(a)
s=a.a
r=s.as
if(r!==B.x){q=!1
if(a.c>=0.9)if(r!==B.i){s=s.Q
s=Math.abs(s.a)+Math.abs(s.b)>0.01}else s=q
else s=q}else s=!0
return s},
$S:10}
A.h9.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.ha.prototype={
$1(a){return t.r.a(a).a===this.a.a.dx},
$S:0}
A.hb.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.h7.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.h8.prototype={
$2(a,b){return A.u(a)+A.a6(t.r.a(b))},
$S:46}
A.D.prototype={
L(){return A.c([this.a,this.b],t.n)},
E(a){var s=this.a-a.a,r=this.b-a.b
return Math.sqrt(s*s+r*r)},
aL(a,b){var s=this.a,r=this.b
return new A.D(s+(a.a-s)*b,r+(a.b-r)*b)}}
A.ev.prototype={
Y(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this.a,f=B.a.gF(g)
for(s=a.a,r=a.b,q=1/0,p=0;o=g.length,p<o;){n=g[p];++p
m=g[p%o]
o=n.a
l=m.a-o
k=n.b
j=m.b-k
i=n.aL(m,B.b.v(((s-o)*l+(r-k)*j)/(l*l+j*j),0,1))
h=i.E(a)
if(h<q){q=h
f=i}}return f},
p(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(this.Y(b).E(b)<1e-7)return!0
for(s=this.a,r=s.length,q=b.b,p=b.a,o=!1,n=0;n<r;){m=s[n];++n
l=s[n%r]
k=m.b
j=l.b
if(k>q!==j>q){i=m.a
i=p<(l.a-i)*(q-k)/(j-k)+i
k=i}else k=!1
if(k)o=!o}return o},
cc(a,b){var s
if(this.p(0,a))return null
s=this.c8(a,b)
return s.length===0?null:B.a.ai(s,B.z)},
c8(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.a,g=b.a-h,f=a.b,e=b.b-f,d=A.c([],t.n)
for(s=this.a,r=0;q=s.length,r<q;){p=s[r];++r
o=s[r%q]
q=p.a
n=o.a-q
m=p.b
l=o.b-m
k=g*l-e*n
if(Math.abs(k)<1e-7)continue
q-=h
m-=f
j=(q*l-m*n)/k
i=(q*e-m*g)/k
if(j>=-1e-7&&j<=1.0000001&&i>=-1e-7&&i<=1.0000001)B.a.l(d,B.b.v(j,0,1))}return d},
c0(a,b){var s,r=this
if(r.p(0,a))return r.Y(a)
s=r.cc(a,b)
return s==null?r.Y(a):a.aL(b,s)},
c9(a,b){var s=a.E(b),r=s<1e-7?new A.D(a.a+4096,a.b+0):a.aL(b,4096/s),q=this.c8(a,r)
return q.length===0?this.Y(b):a.aL(r,B.a.ai(q,B.F))}}
A.ap.prototype={
aR(){return"AiArmyState."+this.b}}
A.o.prototype={
gK(){var s=this.at,r=A.f(s)
return new A.d(s,r.h("e(1)").a(new A.dT()),r.h("d<1>")).gk(0)},
gbo(){return this.f+B.a.H(this.at,0,new A.dS(),t.H)},
L(){var s,r,q,p,o,n,m,l=this,k=l.z,j=t.n
k=A.c([k.a,k.b],j)
s=l.Q
s=A.c([s.a,s.b],j)
r=l.ay
r=r==null?null:A.c([r.a,r.b],j)
q=A.c([],t.b)
for(p=l.k3,o=p.length,n=0;n<p.length;p.length===o||(0,A.z)(p),++n){m=p[n]
q.push(A.c([m.a,m.b],j))}return A.U(["id",l.a,"c",l.b,"home",l.c,"o",l.d,"t",l.e,"hp",l.f,"max",l.r,"a",l.w,"p",l.x,"pay",l.y,"xy",k,"v",s,"s",l.as.a,"troops",l.at,"m",l.ax,"to",r,"target",l.ch,"return",l.CW,"dispatch",l.cx,"move",l.cy,"dismiss",l.db,"upgrade",l.dx,"retreat",l.dy,"marked",l.fr,"rev",l.fx,"orderRev",l.fy,"opponent",l.go,"clashes",l.id,"received",l.k1,"dealt",l.k2,"returnPath",q,"regionCity",l.k4,"salaryPaidMonth",l.ok,"movementPending",l.p1],t.N,t.X)}}
A.dT.prototype={
$1(a){return A.am(a)>0},
$S:19}
A.dS.prototype={
$2(a,b){return A.u(a)+A.am(b)},
$S:13}
A.P.prototype={
gcz(){var s,r,q,p,o,n=this,m=n.w
if(m>0&&n.x>0){s=n.x
r=n.y
return A.kF(m,s,J.N(r)===m*s?r:null)}m=n.r.a
s=A.f(m)
r=s.h("j(1)")
s=s.h("O<1,j>")
q=s.h("l.E")
p=A.n(new A.O(m,r.a(new A.dQ()),s),q)
B.a.bz(p)
o=A.n(new A.O(m,r.a(new A.dR()),s),q)
B.a.bz(o)
return A.kF(B.c.v(B.b.an((B.a.gU(p)-B.a.gF(p)-16)/16),1,256),B.c.v(B.b.an((B.a.gU(o)-B.a.gF(o)-16)/16),1,256),null)},
ga2(){var s,r=this,q=r.cx
if(q==null)q=r.d
else{s=r.fx?1:0
s=B.c.v(q-r.cy-s,0,5)
q=s}return q},
L(){var s,r,q,p,o,n=this,m=n.f,l=t.n
m=A.c([m.a,m.b],l)
s=A.c([],t.b)
for(r=n.r.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.z)(r),++p){o=r[p]
s.push(A.c([o.a,o.b],l))}return A.U(["id",n.a,"c",n.b,"native",n.c,"level",n.d,"xy",m,"outline",s,"gridWidth",n.w,"gridHeight",n.x,"gridTiles",n.y,"income",n.z,"baseIncome",n.ax,"poor",n.Q,"cap",n.as,"recruitCap",n.at,"neighbors",n.e,"recruit",n.ay,"upgrade",n.ch,"rev",n.CW,"initial",n.cx,"wins",n.cy,"attacker",n.db,"defender",n.dx,"stage",n.dy,"next",n.fr,"fallen",n.fx,"danger",n.fy],t.N,t.X)}}
A.dQ.prototype={
$1(a){return t.W.a(a).a},
$S:24}
A.dR.prototype={
$1(a){return t.W.a(a).b},
$S:24}
A.bd.prototype={
L(){var s,r,q=this,p=t.N,o=A.a4(p,t.S)
for(s=q.y.gaB(),s=s.gB(s);s.j();){r=s.gn()
o.A(0,""+r.a,r.b)}return A.U(["id",q.a,"gold",q.b,"reserves",q.c,"capacity",q.d,"salary",q.e,"poor",q.f,"baseIncome",q.r,"garrisonAccrued",q.w,"soldierRecruitmentAllowed",q.x,"hate",o],p,t.X)}}
A.eo.prototype={
gah(){return B.a.av(this.w,new A.et(this))},
gP(){var s=this.f,r=A.f(s)
return new A.d(s,r.h("e(1)").a(new A.eu(this)),r.h("d<1>"))},
u(a){var s=this.r,r=A.f(s),q=r.h("d<1>")
s=A.n(new A.d(s,r.h("e(1)").a(new A.er(this,a)),q),q.h("b.E"))
B.a.C(s,A.lh())
return s},
a6(a){var s=this.r,r=A.f(s)
return A.b2(new A.d(s,r.h("e(1)").a(new A.es(a)),r.h("d<1>")),t.r)},
G(a){var s=this.f,r=A.f(s)
return A.b2(new A.d(s,r.h("e(1)").a(new A.ep(a)),r.h("d<1>")),t.q)},
L(){var s,r,q,p,o=this,n=t.d,m=A.c([],n)
for(s=o.f,r=s.length,q=0;q<r;++q)m.push(s[q].L())
s=A.c([],n)
for(r=o.r,p=r.length,q=0;q<p;++q)s.push(r[q].L())
n=A.c([],n)
for(r=o.w,p=r.length,q=0;q<p;++q)n.push(r[q].L())
return A.U(["country",o.a,"tick",o.b,"month",o.e,"cities",m,"heroes",s,"countries",n,"pool",o.x,"salary",o.y,"year",o.c,"monthIndex",o.d],t.N,t.X)}}
A.et.prototype={
$1(a){return t.t.a(a).a===this.a.a},
$S:5}
A.eu.prototype={
$1(a){return t.q.a(a).b===this.a.a},
$S:1}
A.er.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b
if(a.c===s){r=a.as
s=(r===B.e||r===B.d)&&a.f>0&&a.b===B.a.av(this.a.f,new A.eq(s)).b}else s=!1
return s},
$S:0}
A.eq.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.es.prototype={
$1(a){return t.r.a(a).a===this.a},
$S:0}
A.ep.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.hE.prototype={
cD(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=this.b,r=s.x,r=new A.al(r,r.r,r.e,A.k(r).h("al<2>")),q=this.f,p=this.a,o=p.a,n=p.b,m=s.y,s=s.z;r.j();){l=r.d
k=p.a6(l.a)
j=p.G(l.d)
i=!0
if(l.b==="expedition")if(k!=null)if(j!=null)if(j.b!==o)if(k.b===o)if(!k.fr)if(!(k.f<=0))if(l.y>=n)if(!(k.p1&&l.z<n)){l=k.a
if(!m.p(0,l)){h=k.as
if(h!==B.q)l=(h===B.e||h===B.d)&&!s.p(0,l)
else l=i}else l=i}else l=i
else l=i
else l=i
else l=i
else l=i
else l=i
else l=i
else l=i
else l=i
if(l)continue
J.kh(q.bs(j.a,new A.hG()),k)}},
gaZ(){var s,r,q,p=this,o=p.d
if(o==null||p.f.a!==0)return o
s=new A.hK(p)
r=p.a
if(A.b0(o,r,p.c,null).ga8())return s.$1(o)?o:null
r=r.f
q=A.f(r)
return new A.O(r,q.h("a(1)").a(new A.hI()),q.h("O<1,a>")).dL(0).D(0,new A.hJ(p,s))?null:o},
gck(){var s,r=this
if(r.gaZ()!=null){s=r.a.G(r.e)
s=s==null?null:s.b
s=s==r.gaZ()}else s=!1
return s?r.e:null},
ga1(){var s=this.f,r=A.k(s).h("aa<1>"),q=A.n(new A.aa(s,r),r.h("b.E"))
B.a.C(q,new A.hO(this))
return A.b2(q,t.S)},
gcg(){var s,r=this,q=r.ga1()
if(q!=null){s=r.c.r
s=r.a.d>=s.k2&&r.f.a<s.k1&&r.df(q)>=s.k3}else s=!0
return s},
aD(a){var s,r,q,p,o=this
if(o.ga1()==null)return!0
s=o.f
r=a.a
if(s.Z(r))return!0
q=!1
if(o.gaZ()!=null)if(a.b!==o.gaZ())q=o.ga1()==null||!o.gcg()
if(q)return!1
p=o.ga1()
if(p==null)p=o.gck()
q=!0
if(p!=null)if(r!==p)s=o.ga1()!=null&&!s.Z(r)&&o.gcg()
else s=q
else s=q
return s},
df(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this,e="soldierLimit",d=f.a,c=d.G(a)
c.toString
s=f.f.i(0,a)
s=J.A(s==null?A.c([],t.e):s)
r=f.b.z
q=f.c.b
p=0
while(s.j()){o=s.gn()
if(r.p(0,o.a)){n=q.i(0,e)
n.toString
m=B.b.m(n)}else m=o.gK()
p+=f.bV(o,m,0)}l=B.a.av(d.w,new A.hH(c)).c
for(d=d.u(a),s=A.f(d).h("K<1>"),s=A.R(new A.K(d,s),0,A.W(c.ga2(),"count",t.S),s.h("l.E")),d=s.$ti,s=new A.p(s,s.gk(0),d.h("p<l.E>")),r=c.fx,o=c.cx,n=c.cy,k=o==null,d=d.h("l.E"),c=c.d,j=0,i=0;s.j();){h=s.d
if(h==null)h=d.a(h)
g=q.i(0,e)
g.toString
m=Math.min(B.b.m(g),h.gK()+l)
l-=m-h.gK()
if(k)g=c
else{g=r?1:0
g=B.c.v(o-n-g,0,5)}j+=f.bV(h,m,Math.max(1,g-i));++i}return j===0?1/0:p/j},
bV(a,b,c){var s,r=this.c,q=r.bl(a.w,c,!1)
r=r.b
s=r.i(0,"soldierPower")
s.toString
s=B.b.m(s)
r=r.i(0,"soldierHp")
r.toString
return(a.f+b*B.b.m(r))*(B.c.bk(q+b*s+2,4)+1)*(1+a.ax/1000)}}
A.hF.prototype={
$1(a){var s=t.q.a(a).b
return s===this.a&&s!==this.b.a},
$S:1}
A.hG.prototype={
$0(){return A.c([],t.e)},
$S:48}
A.hK.prototype={
$1(a){var s=this.a,r=s.a.f,q=A.f(r)
return new A.d(r,q.h("e(1)").a(new A.hM(a)),q.h("d<1>")).D(0,new A.hN(s))},
$S:23}
A.hM.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.hN.prototype={
$1(a){var s
t.q.a(a)
s=this.a
return s.a.gP().D(0,new A.hL(s,a))},
$S:1}
A.hL.prototype={
$1(a){var s=this.a,r=t.q.a(a).f
return s.b.c.al(r,this.b.r.Y(r))<=s.c.r.at},
$S:1}
A.hI.prototype={
$1(a){return t.q.a(a).b},
$S:50}
A.hJ.prototype={
$1(a){var s
A.h(a)
s=this.a
return A.b0(a,s.a,s.c,null).ga8()&&this.b.$1(a)},
$S:23}
A.hO.prototype={
$2(a,b){var s,r,q
A.h(a)
A.h(b)
s=this.a.f
r=s.i(0,b)
r.toString
r=J.N(r)
s=s.i(0,a)
s.toString
q=B.c.t(r,J.N(s))
return q!==0?q:B.c.t(a,b)},
$S:51}
A.hH.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:5}
A.co.prototype={}
A.hP.prototype={
ae(a){var s=this.a.Q
return!A.b0(a.b,s,this.b,null).ga8()||s.gP().gk(0)>=3||s.gP().D(0,new A.hQ(this,a))},
b_(a,b,c,d){var s,r,q,p,o,n,m,l,k=this
if(a===0||b.ga2()<3||k.a.Q.u(b.a).length<2)return a
s=k.a.Q.r
r=A.f(s)
q=r.h("e(1)")
r=r.h("d<1>")
p=new A.d(s,q.a(new A.hT(k)),r).H(0,0,new A.hU(),t.S)
o=d.z
n=k.c.al(o,b.r.Y(o))
m=new A.d(s,q.a(new A.hV(k,p,n,b,c)),r).gk(0)
l=Math.max(0,c.d-c.X().a-20)
s=k.b
r=s.b.i(0,"soldierLimit")
r.toString
return Math.max(a,Math.min(s.r.fy,Math.min(m,B.c.b4(l,Math.max(1,B.b.m(r))))))},
dj(a){var s,r,q,p,o=this.a.Q
if(o.c<3)return 1
s=this.b
r=s.r
q=Math.max(0,a.d-a.X().a-r.f)
s=s.b
p=s.i(0,"drawCost")
p.toString
p=B.b.m(p)
s=s.i(0,"soldierLimit")
s.toString
return Math.max(1,Math.min(r.fy,B.b.b4(q,Math.max(1,p+o.y+B.b.m(s)))))},
a_(a,b){var s,r,q,p,o
t.ef.a(a)
t.E.a(b)
s=t.N
s=A.a4(s,s)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.z)(a),++q){p=a[q]
s.A(0,"h:"+p.a,p.fx)}for(r=b.length,q=0;q<b.length;b.length===r||(0,A.z)(b),++q){o=b[q]
s.A(0,"c:"+o.a,o.CW)}return s},
aq(a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=this,a4=null,a5=b8==="intercept"
if(a5){s=a7.as
s=s===B.e||s===B.d}else s=!1
if(s)return a4
if(!a8.d||!isFinite(a8.b)||J.dO(a8.a)||a7.fr||a6.Q.p(0,a7.a))return a4
s=a8.b
r=a3.b
q=r.r
p=q.d
o=s+p
if(o>=b1)return a4
n=b8==="expedition"
m=!1
if(n)m=b9.b===a3.a.Q.a||!a3.ae(b9)
if(m)return a4
m=a7.a
l=a6.x.i(0,m)
k=l==null
if(!k){if(l.z>a3.a.Q.b&&!b2)return a4
j=!1
if(l.b===b8){i=l.d
if(i===b9.a){if(!(!n&&b8!=="staging")){i=l.e
i=i===b9.b}else i=!0
if(i){i=l.r
if(i==(b3==null?a4:b3.a)){j=l.w
i=J.aH(j)
j=i.gaa(j)&&i.gU(j).E(J.jM(a8.a))<32&&a7.as!==B.i}}}}if(j)return a4}h=a6.S()
g=A.c([],t.w)
if(!a9){j=r.b
i=j.i(0,"battleBudget")
i.toString
f=b0?1:b9.ga2()
f=Math.min(f,a3.a.Q.u(b9.a).length)
f=Math.max(1,f)
j=j.i(0,"budgetSafety")
j.toString
o+=i*(b5+1)*f+s+j}if(o>q.p1)return a4
s=b9.a
j=b3==null
i=j?a4:b3.a
f=a3.a
e=f.Q
d=e.b
p=B.b.an(isFinite(b1)?b1*60:(Math.max(o,60)+q.cx+p)*60)
c=B.b.aM(q.CW*60)
b=a8.a
a=a9&&b6
if(n||b8==="staging")n=b9.b
else n=a4
a0=new A.a8(m,b8,b7,s,n,b0,i,b,0,d+p,d+c,0,a9,a,a7.fy+1)
p=!1
if(a9){n=h.M(s)
p=(k?a4:l.as)===!0&&l.y>=d&&l.d===s?1:0
q=b6?Math.max(h.R(b9),b9.at+q.cy):h.R(b9)
q=n-p>=q}else q=p
if(q)return a4
q=a7.as
if(q===B.e||q===B.d){q=h.f
r=r.b.i(0,"soldierLimit")
r.toString
a1=Math.max(0,Math.min(q,b4+B.b.m(r)-a7.gK())-h.e)
if(a1>0){if(f.x===B.p)return a4
a2=h.ar()
if(a2<a1)return a4
B.a.l(g,new A.x(B.h,a4,a7.c,a4,a2))}if(!h.di(a7,a0))return a4
if(h.e<b4)return a4
if(a5||b8==="staging"||J.N(b)>1)a5=a4
else a5=s
B.a.l(g,new A.x(B.C,m,a5,J.cW(b),0))}else{if(!h.dD(a7,a0))return a4
if(a5||b8==="staging"||J.N(b)>1)a5=a4
else a5=s
B.a.l(g,new A.x(B.O,m,a5,J.cW(b),0))}a5=A.c([a7],t.e)
if(!j)a5.push(b3)
s=e.G(a7.c)
s.toString
s=A.c([s],t.Y)
s.push(b9)
return new A.co(h,new A.I(b7,g,a3.a_(a5,s),A.c([a0],t.m),h.d,b2))},
cs(a,b,c,d,e,f,g,h,i,j){return this.aq(a,b,c,d,!1,e,f,null,0,0,g,h,i,j)},
ct(a,b,c,d,e,f,g,h){return this.aq(a,b,c,d,!1,1/0,!1,null,0,0,e,f,g,h)},
by(a,b,c,d,e,f,g,h,i){return this.aq(a,b,c,!1,d,1/0,!1,null,e,f,!1,g,h,i)},
cv(a,b,c,d,e,f,g,h){return this.aq(a,b,c,!1,!1,1/0,d,null,e,0,!1,f,g,h)},
bx(a,b,c,d,e,f,g,h,i){return this.aq(a,b,c,!1,d,1/0,e,null,0,f,!1,g,h,i)},
b3(a,b,c,d,e,f,g,h,i){return this.aq(a,b,c,d,!1,e,f,null,0,0,!1,g,h,i)},
cw(a,b,c,d,e,f,g,h,i){return this.aq(a,b,c,!1,!1,d,e,f,0,0,!1,g,h,i)},
cu(a,b,c,d,e,f,g,h){return this.aq(a,b,c,!1,!1,d,e,null,0,0,!1,f,g,h)},
cd(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a5.go!=null)return B.t
s=this.a.Q
r=s.G(a4.c)
r.toString
q=a4.as
p=q===B.e||q===B.d?r.r.c9(r.f,a5.z):a4.z
r=a5.z
q=r.a
o=q-p.a
r=r.b
n=r-p.b
m=a5.Q
l=m.a
k=m.b
m=this.b
j=m.b.i(0,"marchSpeed")
j.toString
m=m.e
i=this.c
h=i.a
g=h.c3(p)
if(!(g<m.length))return A.w(m,g)
f=j*m[g]
e=l*l+k*k-f*f
d=2*(o*l+n*k)
c=o*o+n*n
b=Math.sqrt(c)/f
m=Math.abs(e)
if(m<1e-7&&d<0)b=-c/d
else if(m>=1e-7&&d*d-4*e*c>=0){a=Math.sqrt(d*d-4*e*c)
m=-d
j=2*e
g=t.eq
a0=A.n(new A.d(A.c([(m-a)/j,(m+a)/j],t.n),t.db.a(new A.hR()),g),g.h("b.E"))
if(a0.length!==0)b=B.a.ai(a0,B.z)}for(m=s.f,a1=B.t,a2=0;a2<3;++a2){a3=new A.D(q+l*b,r+k*b)
if(!h.p(0,a3)||B.a.D(m,new A.hS(a3)))return B.t
a1=i.dJ(a4,a3,s)
if(!a1.d)return a1
j=a1.b
if(Math.abs(b-j)<0.1)break
b=(b+j)/2}return a1}}
A.hQ.prototype={
$1(a){var s=this.a,r=t.q.a(a).f
return s.c.al(r,this.b.r.Y(r))<=s.b.r.at},
$S:1}
A.hT.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a.Q.a&&!a.fr},
$S:0}
A.hU.prototype={
$2(a,b){return Math.max(A.h(a),t.r.a(b).w)},
$S:9}
A.hV.prototype={
$1(a){var s,r,q,p,o,n=this
t.r.a(a)
s=n.a
r=!1
if(a.b===s.a.Q.a)if(!a.fr)if(a.f>=a.r*0.65)if(a.w>=n.b*0.8){q=!1
if(a.cx){p=n.c
if(p!=null){o=a.z
s=Math.abs(s.c.al(o,n.d.r.Y(o))-p)<=s.b.r.ok}else s=!0
if(s){s=n.e
s=s.az(a)&&!s.Q.p(0,a.a)}else s=q}else s=q
if(!s){s=n.e.x
q=a.a
p=s.i(0,q)
if((p==null?null:p.b)==="expedition"){s=s.i(0,q)
s=s==null?null:s.d
s=s===n.d.a}else s=r}else s=!0}else s=r
else s=r
else s=r
else s=r
return s},
$S:0}
A.hR.prototype={
$1(a){return A.am(a)>=0},
$S:19}
A.hS.prototype={
$1(a){return t.q.a(a).r.p(0,this.a)},
$S:1}
A.aJ.prototype={
aR(){return"AiDecisionStage."+this.b}}
A.as.prototype={
aR(){return"AiActionKind."+this.b}}
A.x.prototype={
L(){var s=this,r=s.d
r=r==null?null:A.c([r.a,r.b],t.n)
return A.U(["kind",s.a.a,"hero",s.b,"city",s.c,"point",r,"amount",s.e],t.N,t.X)}}
A.a8.prototype={
L(){var s,r,q,p=this,o=A.c([],t.b)
for(s=J.A(p.w),r=t.n;s.j();){q=s.gn()
o.push(A.c([q.a,q.b],r))}return A.U(["hero",p.a,"role",p.b,"deadline",p.y,"commit",p.z,"city",p.d,"enemy",p.r,"points",o,"leg",p.x,"gold",p.Q,"slot",p.as,"rearStaging",p.at,"reason",p.c,"order",p.ax,"targetCountry",p.e,"attrition",p.f],t.N,t.X)}}
A.I.prototype={
L(){var s,r,q,p=this,o=t.d,n=A.c([],o)
for(s=p.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.z)(s),++q)n.push(s[q].L())
o=A.c([],o)
for(s=p.d,r=s.length,q=0;q<s.length;s.length===r||(0,A.z)(s),++q)o.push(s[q].L())
return A.U(["reason",p.a,"actions",n,"deps",p.c,"tasks",o,"floor",p.e,"emergency",p.f],t.N,t.X)}}
A.bA.prototype={
L(){var s,r,q,p=this,o=A.c([],t.d)
for(s=p.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.z)(s),++q)o.push(s[q].L())
return A.U(["phase",p.a,"target",p.b,"gold",p.c,"heroes",p.d,"groups",o,"notes",p.f,"limited",p.r,"assessments",p.w,"routeSteps",p.x,"expansions",p.y],t.N,t.X)}}
A.ey.prototype={
L(){var s,r,q,p=this,o=p.Q.L(),n=A.c([],t.d)
for(s=p.as,r=s.length,q=0;q<s.length;s.length===r||(0,A.z)(s),++q)n.push(s[q].L())
return A.U(["protocol",2,"session",p.a,"id",p.d,"rules",p.b,"map",p.c,"observation",o,"deadline",p.e,"tasks",n,"seed",p.f,"priority",p.r,"idle",p.w,"stage",p.x.b,"offensiveCountry",p.y,"offensiveCity",p.z],t.N,t.X)}}
A.ex.prototype={
L(){var s=this
return A.U(["protocol",2,"session",s.a,"id",s.d,"country",s.e,"rules",s.b,"map",s.c,"tick",s.f,"deadline",s.r,"plan",s.x.L(),"micros",s.w,"error",s.y],t.N,t.X)}}
A.jt.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:5}
A.ju.prototype={
$0(){var s,r=this,q=r.a,p=q.d,o=r.b,n=!1
if(o.length!==0)if(p!=null){n=r.c
n=n.f>=n.r*0.5&&p.c>0&&p.b>=r.d.r.ch}if(n)return new A.aA([!0,p.b,1,p.c])
s=B.b.an(q.c/Math.max(1,r.e*0.85))
if(o.length!==0){o=r.c
o=o.f>=o.r*0.65&&s>=2&&s<=r.d.r.fy}else o=!1
if(o)return new A.aA([!0,p.b,s,p.c])
return new A.aA([!1,q.b,0,q.a])},
$S:52}
A.jH.prototype={
$1(a){return A.X(a)===this.a},
$S:53}
A.hZ.prototype={
dz(h9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6=this,h7=null,h8={}
h8.a=h9
s=h6.a
r=s.Q
q=h6.e
p=A.k(q).h("T<2>")
o=new A.T(q,p).D(0,new A.i3())
n=t.Z
m=A.c([],n)
l=A.c([],t.dZ)
h8.b=h8.c=!1
k=h6.b
j=s.y
s=s.z
i=A.cn(r,h9,k,s,j)
h=r.r
g=A.f(h)
f=g.h("e(1)")
g=g.h("d<1>")
e=A.n(new A.d(h,f.a(new A.i4(r)),g),g.h("b.E"))
B.a.C(e,new A.i5())
d=r.f
c=A.f(d)
b=c.h("e(1)")
c=c.h("d<1>")
a=c.h("b.E")
a0=A.n(new A.d(d,b.a(new A.ih(h6,r,i)),c),a)
if(e.length!==0)B.a.C(a0,new A.it(h6,e,r))
a1=A.b2(a0,t.q)
a2=h9.cl(a0)
a3=a1==null
a4=a3?h7:A.b0(a1.b,r,k,h7)
a5=!o
if(a5)a6=(a4==null?h7:a4.ga8())===!0
else a6=!1
a7=new A.i2(h6,a6?Math.min(B.b.an(a4.c*a4.gaX()),Math.max(0,h9.d-h9.X().a)):0)
a8=new A.i_(h8,h6,m)
a9=r.gP()
b0=A.n(a9,a9.$ti.h("b.E"))
B.a.C(b0,new A.iy(h8,h6))
a6=t.S
b1=Math.min(h8.a.f,B.a.H(b0,0,new A.iz(h8,h6),a6))
if(b0.length!==0){b2=h8.a.S()
b3=b2.ar()
if(b3>0)a8.$4(b2,A.c([new A.x(B.h,h7,B.a.gF(b0).a,h7,b3)],t.w),"\u4f18\u5148\u8865\u6ee1\u5168\u56fd\u5175\u5458\u5bb9\u91cf\uff0c\u8d44\u91d1\u4e0d\u8db3\u65f6\u4e70\u5f97\u8d77\u591a\u5c11\u8865\u591a\u5c11\uff0c\u4e0d\u900f\u652f",B.a.gF(b0))}for(a9=b0.length,b4=k.r,b5=b4.fx,b6=b5-2,b7=t.w,b8=0;b9=b0.length,b8<b9;b0.length===a9||(0,A.z)(b0),++b8){c0=b0[b8]
if(m.length>=b6)break
b9=c0.a
c1=q.i(0,b9)
if(c1==null)c1=h7
else c1=c1.d.length!==0||c1.a.cx!=null
if(c1!==!0||c0.cx!=null)continue
c2=h8.a.u(b9)
c1=c2.length
c3=h8.a
c4=c0.cx
if(c4==null){c3=c3.w.i(0,b9)
if(c3==null)c3=c0.d}else{c3=c0.fx?1:0
c3=B.c.v(c4-c0.cy-c3,0,5)}c4=!1
if(c1<=c3){c1=q.i(0,b9)
if(c1==null)c1=h7
else{c1=c1.f
c1=c1==null?h7:c1.a}if(c1!==B.u){c1=q.i(0,b9)
c1=(c1==null?h7:c1.ga7())!==!0}else c1=c4}else c1=c4
if(c1)continue
c1=A.f(c2)
c3=c1.h("d<1>")
c5=A.n(new A.d(c2,c1.h("e(1)").a(new A.iA()),c3),c3.h("b.E"))
B.a.C(c5,new A.iB())
if(c5.length===0)continue
c6=B.a.gF(c5)
b2=h8.a.S()
if(b2.aN(c0,c6)&&b2.d>=b2.au(!0).a)a8.$6$emergency$hero(b2,A.c([new A.x(B.k,c6.a,b9,h7,0)],b7),"\u9632\u5fa1\u7b56\u7565\u53d1\u73b0\u6765\u654c\uff0c\u4f18\u5148\u63d0\u9ad8\u5fc5\u8981\u57ce\u9632\uff0c\u5347\u7ea7\u540e\u4ecd\u4fdd\u7559\u4f59\u989d",c0,!0,c6)}c7=new A.iE(h8,h6,b1,a1,a7,r,a8)
for(b8=0;b8<b0.length;b0.length===b9||(0,A.z)(b0),++b8){c0=b0[b8]
if(m.length>=b6)break
a9=c0.a
c2=h8.a.u(a9)
c1=q.i(0,a9)
if(c1==null)c1=h7
else c1=c1.d.length!==0||c1.a.cx!=null
c3=h8.a.M(a9)
c4=h8.a.a9(c0)
c8=!1
if(c1===!0){c1=h8.a.M(a9)
c9=c0.cx
if(c9==null)c9=c0.d
else{d0=c0.fx?1:0
d0=B.c.v(c9-c0.cy-d0,0,5)
c9=d0}if(c1<c9){if(c2.length!==0){a9=q.i(0,a9)
if(a9==null)a9=h7
else{a9=a9.f
a9=a9==null?h7:a9.a}a9=a9!==B.f}else a9=!0
c8=a9}}if(c3<c4||c8)c7.$2$defense(c0,!0)}for(a9=p.h("e(b.E)").a(new A.iC()),b9=new A.T(q,p).gB(0),p=new A.V(b9,a9,p.h("V<b.E>")),a9=A.f(b0),c1=a9.h("e(1)"),a9=a9.h("d<1>"),c3=a9.h("b.E");p.j();){c4=b9.gn()
c9=h8.a.x
if(new A.T(c9,A.k(c9).h("T<2>")).D(0,new A.iD(c4)))continue
d1=A.n(new A.d(b0,c1.a(new A.i6(h8)),a9),c3)
B.a.C(d1,new A.i7(c4))
if(d1.length!==0)c7.$2$defense(B.a.gF(d1),!0)}for(p=b0.length,a9=h6.c,b9=h6.d,c1=a4==null,b8=0;b8<b0.length;b0.length===p||(0,A.z)(b0),++b8){c0=b0[b8]
if(m.length>=b6)break
d2=a9.dj(h8.a)
if(h8.a.ak(c0))continue
d3=new A.d(h,f.a(new A.i8(h8,r,Math.max(12,new A.d(h,f.a(new A.i9(r)),g).H(0,0,new A.ia(),a6)*0.8))),g).gk(0)
d4=d2>=2&&d3+h8.a.as.a<d2&&B.a.D(d,new A.ib(r))
if(d4){c3=c0.a
c4=q.i(0,c3)
if(c4==null)c4=h7
else c4=c4.d.length!==0||c4.a.cx!=null
c3=c4!==!0&&h8.a.u(c3).length>=c0.at}else c3=!1
if(c3){c3=h8.a.u(c0.a)
c4=A.f(c3)
c9=c4.h("d<1>")
d5=A.n(new A.d(c3,c4.h("e(1)").a(new A.ic(h8,h6)),c9),c9.h("b.E"))
B.a.C(d5,new A.id())
if(d5.length!==0){b2=h8.a.S()
d6=B.a.gF(d5)
if(b2.ca(d6))a8.$5$hero(b2,A.c([new A.x(B.v,d6.a,h7,h7,0)],b7),"\u5b89\u5168\u540e\u65b9\u6e05\u7406\u4f4e\u4ef7\u503c\u5197\u4f59\u7f16\u5236\uff0c\u4fdd\u7559\u5b9e\u9645\u5b88\u5c06\u548c\u5185\u653f\u5c06\u9886\uff0c\u4e3a\u5f3a\u653b\u4e3b\u529b\u8865\u5458",c0,d6)}}c3=c0.a
c2=h8.a.u(c3)
c4=A.f(c2)
c9=c4.h("d<1>")
c5=A.n(new A.d(c2,c4.h("e(1)").a(new A.ie()),c9),c9.h("b.E"))
B.a.C(c5,new A.ig())
if(c2.length!==0){d7=B.a.ai(c2,new A.ii())
d8=A.n(new A.d(d,b.a(new A.ij(h8,h6,r,d7)),c),a)
B.a.C(d8,new A.ik(h6,d7,r))
d9=d8.length===0?0:2
c4=A.f(d8)
c9=c4.h("y<1>")
d0=new A.y(d8,0,3,c9)
d0.W(d8,0,3,c4.c)
d0=new A.p(d0,d0.gk(0),c9.h("p<l.E>"))
c9=c9.h("l.E")
while(d0.j()){c4=d0.d
if(c4==null)c4=c9.a(c4)
e0=A.dL(d7,c4,r,k,b9,0).a[2]
if(e0>0){if(c1)c9=h7
else c9=a4.a!==a4.d.a&&a4.b>=a4.e.r.w
if(c9===!0){c9=c4.b
c9=c9===(a3?h7:a1.b)}else c9=!1
if(c9){d9=a9.b_(e0,c4,h8.a,d7)
break}d9=a9.b_(e0,c4,h8.a,d7)
break}}e1=d9}else e1=1
if(o){c4=q.i(0,c3)
c4=(c4==null?h7:c4.ga7())===!0}else c4=!0
e2=!1
if(c4){if(!a2.p(0,c3)){c4=q.i(0,c3)
if(c4==null)c4=h7
else c4=c4.d.length!==0||c4.a.cx!=null
c4=c4===!0}else c4=!0
if(c4){if(B.a.D(d,new A.il(r)))if(!d4)if(c2.length!==0)c4=e1>0&&h8.a.c2(c3)<h8.a.a9(c0)+e1
else c4=!0
else c4=!0
else c4=e2
e2=c4}}if(c5.length!==0)if(c0.cx==null){c4=c2.length
c9=h8.a.w.i(0,c3)
d0=!0
if(c9==null)c9=c0.d
if(c4<=c9)if(!B.a.D(c2,new A.im())){if(e2){c4=c2.length
c9=h8.a.w.i(0,c3)
if(c9==null)c9=c0.d
c9=c4>=c9
c4=c9}else c4=!1
if(!c4){c4=q.i(0,c3)
if(c4==null)c4=h7
else{c4=c4.f
c4=c4==null?h7:c4.a}c4=c4===B.u}else c4=d0}else c4=d0
else c4=d0}else c4=!1
else c4=!1
if(c4){c4=q.i(0,c3)
if(c4==null)c4=h7
else c4=c4.d.length!==0||c4.a.cx!=null
if(c4!==!0)B.a.l(l,new A.aG(c0,B.a.gF(c5)))}if(e2&&!h8.b){c3=q.i(0,c3)
if(c3==null)c3=h7
else c3=c3.d.length!==0||c3.a.cx!=null
c7.$2$defense(c0,c3===!0)}}e3=A.c([],t.e)
for(p=b0.length,b8=0;b8<b0.length;b0.length===p||(0,A.z)(b0),++b8){c0=b0[b8]
h=c0.a
g=q.i(0,h)
if(g==null)g=h7
else g=g.d.length!==0||g.a.cx!=null
if(g===!0)continue
c2=h8.a.u(h)
h=A.f(c2)
g=h.h("d<1>")
e4=A.n(new A.d(c2,h.h("e(1)").a(new A.io(h8)),g),g.h("b.E"))
B.a.C(e4,new A.ip())
h=A.h(Math.max(0,c2.length-h8.a.a9(c0)))
g=A.f(e4)
f=new A.y(e4,0,h,g.h("y<1>"))
f.W(e4,0,h,g.c)
B.a.J(e3,f)}B.a.C(e3,new A.iq())
e5=h7
e6=h7
e7=0
e8=1
if(e3.length!==0&&!h8.c&&a5){d6=B.a.gF(e3)
e9=A.cn(r,h8.a,k,s,j)
d8=A.n(new A.d(d,b.a(new A.ir(h8,h6,r)),c),a)
B.a.C(d8,new A.is(h6,d6,r))
s=A.R(d8,0,A.W(b4.go,"count",a6),A.f(d8).c)
q=s.$ti
s=new A.p(s,s.gk(0),q.h("p<l.E>"))
p=k.b
j=a9.c
h=b4.ok
g=e9.f
f=t.aO
d=t.eO
c=d.h("b.E")
q=q.h("l.E")
b4=b4.k4
f0=e7
f1=e5
for(;;){if(!s.j()){e7=f0
e5=f1
break}A:{b=s.d
if(b==null)b=q.a(b)
f2={}
f3=A.n(new A.d(e3,f.a(new A.iu(h6,b)),d),c)
if(f3.length===0)break A
d6=B.a.gF(f3)
f4=A.dL(d6,b,r,k,b9,0)
f5=b.a
a=g.i(0,f5)
f6=a==null?h7:J.N(a)
if(f6==null)f6=0
a=f4.a
f7=a9.b_(a[2],b,h8.a,d6)
f8=f7-f6
f9=e9.ga1()!=null&&e9.ga1()!==f5
a5=!0
if(a[2]!==0)if(f8>0)if(f8<=f3.length)if(f9)a5=f7!==1||a[1]<b4
else a5=!1
if(a5)break A
g0=h8.a.S()
g0.d=1e6
f2.a=g0
g1=A.c([],b7)
a5=b.f
g3=1/0
g4=0
g5=0
for(;;){g2=!1
if(!(g5<f8)){g2=!0
break}if(!(g5<f3.length))return A.w(f3,g5)
g6=f3[g5]
if(A.dL(g6,b,r,k,b9,0).a[2]===0)break
g7=j.aE(g6,a5,r,b)
b6=g7.b
g3=Math.min(g3,b6)
g4=Math.max(g4,b6)
if(!g7.d||g4-g3>h)break
g8=B.a.H(b0,0,new A.iv(f2,h6,g6),a6)
b6=f2.a
c3=b6.f
c4=p.i(0,"soldierLimit")
c4.toString
c4=Math.min(g8,Math.max(0,c3-B.b.m(c4)))
g9=a9.by(b6,g6,g7,a[0],c4,f6+g5,"\u6309\u5171\u540c\u653b\u9632\u95e8\u69db\u6838\u7b97\u6574\u961f\u5175\u5458","expedition",b)
if(g9==null)break
f2.a=g9.a
b6=g9.b.b
c3=A.f(b6)
B.a.J(g1,new A.d(b6,c3.h("e(1)").a(new A.iw()),c3.h("d<1>")));++g5}if(!g2)break A
b=f2.a
h0=1e6-b.d+b.X().a
b=h8.a
if(b.d<h0){if(f0===0||h0<f0){e8=f7
f0=h0
f1=f5}break A}b2=b.S()
b=g1.length
b8=0
for(;;){if(!(b8<g1.length)){g2=!0
break}if(!b2.c5(g1[b8].e)){g2=!1
break}g1.length===b||(0,A.z)(g1);++b8}if(!g2||!a7.$1(b2))break A
if(g1.length!==0){b=r.G(d6.c)
b.toString
if(!a8.$4(b2,g1,"\u6309\u76ee\u6807\u57ce\u9632\u4e0e\u5b88\u5c06\u914d\u9f50"+f7+"\u540d\u8fdb\u653b\u5c06\u9886\u7684\u968f\u519b\u5175\u5458\uff0c\u4fdd\u7559\u6708\u4ff8\u9884\u7b97",b))break A}e6=f5
break}}}s=e5==null
if(s&&!h8.c)for(q=l.length,b8=0;b8<l.length;l.length===q||(0,A.z)(l),++b8){p=l[b8]
c0=p.a
c6=p.b
if(B.a.H(m,0,new A.ix(),a6)>=b5)break
b2=h8.a.S()
if(b2.aN(c0,c6)&&a7.$2$civilian(b2,!0))a8.$5$hero(b2,A.c([new A.x(B.k,c6.a,c0.a,h7,0)],b7),"\u5b8c\u6210\u519b\u9700\u5b89\u6392\u540e\u7528\u4f59\u94b1\u5347\u7ea7\u57ce\u9632\uff0c\u4ecd\u4fdd\u7559\u6708\u4ff8\u4e0e\u5468\u8f6c\u4f59\u989d",c0,c6)}q=e6==null
h1=r.G(q?e5:e6)
if(h1==null)h1=a1
h2=h1==null?h7:A.b0(h1.b,r,k,h8.a.w)
h3=A.c([],n)
for(p=m.length,h4=0,b8=0;b8<m.length;m.length===p||(0,A.z)(m),++b8){h5=m[b8]
h4+=h5.b.length
if(h4>b5){b9.b.e=!0
break}B.a.l(h3,h5)}if(o)s="defending"
else s=s?"preparing":"saving"
q=q?e5:e6
if(q==null)if((c1?h7:a4.ga8())===!0)q=a3?h7:a1.a
else q=h7
b9=b9.b
p=b9.e
n=b9.c
k=b9.d
b9=b9.b
j=A.c([],t.s)
if(o)j.push("\u4e3b\u89d2\u6240\u5728\u57ce\u5b58\u5728\u660e\u786e\u98ce\u9669\uff0c\u519b\u8d39\u4f18\u5148\u7528\u4e8e\u5b88\u519b\u4e0e\u57ce\u9632\uff0c\u6682\u505c\u65b0\u589e\u8fdc\u5f81\u519b\u9700")
if(m.length===0)j.push("\u672c\u8f6e\u65e0\u5fc5\u8981\u4e14\u53ef\u652f\u4ed8\u7684\u91c7\u8d2d\uff0c\u4fdd\u7559\u56fd\u5e93")
if((h2==null?h7:h2.ga8())===!0)j.push("\u76ee\u6807\u56fd\u5360\u6709 "+h2.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.an(h2.c*h2.gaX())+" \u91d1\u5e01\uff0c\u51c6\u5907\u8f6e\u653b\u5175\u529b")
return new A.bA(s,q,e7,e8,h3,j,p,n,k,b9)}}
A.i3.prototype={
$1(a){return t.a.a(a).ga7()},
$S:14}
A.i4.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&a.f>0&&!a.fr},
$S:0}
A.i5.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.af(s.a(b),!0),A.af(a,!0))},
$S:2}
A.ih.prototype={
$1(a){t.q.a(a)
return a.b!==this.b.a&&this.c.aD(a)&&this.a.c.ae(a)},
$S:1}
A.it.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.by(o.a(b),B.a.gF(s),r,p,q,null),A.by(a,B.a.gF(s),r,p,q,null))},
$S:3}
A.i2.prototype={
$2$civilian(a,b){var s=a.d,r=Math.max(a.X().a,this.a.b.r.f)
return s>=r+(b?this.b:0)},
$1(a){return this.$2$civilian(a,!1)},
$S:54}
A.i_.prototype={
$6$emergency$hero(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j
t.f3.a(b)
s=a.S()
r=B.a.D(b,new A.i0())?s.ar():0
q=this.c
p=B.a.H(q,0,new A.i1(),t.S)
o=b.length
n=r>0
m=n?1:0
l=this.b
k=l.b.r
if(p+o+m>k.fx){l.d.b.e=!0
return!1}this.a.a=s
o=l.c
m=t.e
l=A.c([],m)
if(f!=null)l.push(f)
j=t.Y
l=o.a_(l,A.c([d],j))
B.a.l(q,new A.I(c,b,l,B.j,e?a.au(!0).a:Math.max(a.X().a,k.f),e))
if(n)B.a.l(q,new A.I("\u5728\u540c\u4e00\u6b21\u8865\u5175\u7a97\u53e3\u5185\u8865\u5145\u5347\u7ea7\u65b0\u589e\u7684\u5168\u56fd\u5175\u5458\u5bb9\u91cf\uff0c\u4e0d\u900f\u652f\u56fd\u5e93",A.c([new A.x(B.h,null,d.a,null,r)],t.w),o.a_(A.c([],m),A.c([d],j)),B.j,0,e))
return!0},
$4(a,b,c,d){return this.$6$emergency$hero(a,b,c,d,!1,null)},
$5$hero(a,b,c,d,e){return this.$6$emergency$hero(a,b,c,d,!1,e)},
$S:55}
A.i0.prototype={
$1(a){return t.T.a(a).a===B.k},
$S:11}
A.i1.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:8}
A.iy.prototype={
$2(a,b){var s,r,q,p,o,n,m,l=null,k=t.q
k.a(a)
s=this.b.e
k=k.a(b).a
r=s.i(0,k)
r=(r==null?l:r.ga7())===!0?1:0
q=a.a
p=s.i(0,q)
o=B.c.t(r,(p==null?l:p.ga7())===!0?1:0)
if(o!==0)return o
r=this.a
p=r.a.u(k).length===0?1:0
n=B.c.t(p,r.a.u(q).length===0?1:0)
if(n!==0)return n
r=s.i(0,k)
if(r==null)r=l
else r=r.d.length!==0||r.a.cx!=null
r=r===!0?1:0
s=s.i(0,q)
if(s==null)s=l
else s=s.d.length!==0||s.a.cx!=null
m=B.c.t(r,s===!0?1:0)
return m!==0?m:B.c.t(q,k)},
$S:3}
A.iz.prototype={
$2(a,b){var s,r
A.h(a)
t.q.a(b)
s=this.a.a.u(b.a).length
r=this.b.b.b.i(0,"soldierLimit")
r.toString
return a+s*B.b.m(r)},
$S:6}
A.iA.prototype={
$1(a){return t.r.a(a).dx},
$S:0}
A.iB.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.iE.prototype={
$2$defense(a,b){var s,r,q,p,o,n,m,l=this,k=null,j=l.a,i=a.a
if(!j.a.as.p(0,i)){s=l.b.e.i(0,i)
if(s==null)s=k
else s=s.d.length!==0||s.a.cx!=null
s=s===!0&&j.a.M(i)>=a.ga2()}else s=!0
if(s)return!1
r=j.a.S()
s=r.f
q=r.as.a
p=l.b
o=p.b.b.i(0,"soldierLimit")
o.toString
n=Math.max(0,Math.min(s,l.c+(q+1)*B.b.m(o))-r.e)
m=n>0?r.ar():0
if(m<n)return!1
if(!b){s=p.e.i(0,i)
if(s==null)s=k
else s=s.d.length!==0||s.a.cx!=null
s=s===!0}else s=!0
q=l.d
if(!r.bt(a,s,q==null?k:q.b)||!l.e.$1(r)){if(a.ay&&l.f.x>j.a.as.a){j.c=!0
if(b)j.b=!0}return!1}j=A.c([],t.w)
if(m>0)j.push(new A.x(B.h,k,i,k,m))
j.push(new A.x(B.w,k,i,k,0))
i=b?"\u4f18\u5148\u8865\u5145\u672c\u56fd\u5b88\u57ce\u7f3a\u53e3\uff0c\u5e76\u5907\u9f50\u65b0\u5c06\u5175\u5458\u4e0e\u6708\u4ff8":"\u5b88\u57ce\u7f3a\u53e3\u5df2\u4f18\u5148\u5904\u7406\uff0c\u518d\u8865\u524d\u7ebf\u8fdb\u653b\u5c06\u9886\u53ca\u5176\u5175\u5458"
return l.r.$4(r,j,i,a)},
$S:56}
A.iC.prototype={
$1(a){var s
t.a.a(a)
if(a.d.length!==0||a.a.cx!=null){s=a.f
s=(s==null?null:s.a)!==B.f}else s=!1
return s},
$S:14}
A.iD.prototype={
$1(a){t.J.a(a)
return a.b==="rescue"&&a.d===this.a.a.a},
$S:7}
A.i6.prototype={
$1(a){var s
t.q.a(a)
s=this.a
return s.a.ak(a)&&s.a.u(a.a).length===0&&a.ay},
$S:1}
A.i7.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.a.f
return B.b.t(a.f.E(s),b.f.E(s))},
$S:3}
A.i9.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&!a.fr},
$S:0}
A.ia.prototype={
$2(a,b){return Math.max(A.h(a),t.r.a(b).w)},
$S:9}
A.i8.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.b===this.b.a)if(!a.fr){r=this.a
if(!r.a.y.p(0,a.a))if(a.f>=a.r*0.65)if(a.w>=this.c){s=a.as
s=!(s===B.e||s===B.d)||r.a.az(a)}}return s},
$S:0}
A.ib.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.ic.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.db){r=this.b.b
if(a.w<=r.r.p4){s=a.x
r=r.b.i(0,"drawCost")
r.toString
s=s<=B.b.m(r)&&s<15&&this.a.a.az(a)}}return s},
$S:0}
A.id.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.a6(a),A.a6(b))},
$S:2}
A.ie.prototype={
$1(a){return t.r.a(a).dx},
$S:0}
A.ig.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.ii.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return A.af(a,!0)>A.af(b,!0)?a:b},
$S:16}
A.ij.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.cn(s,this.a.a,r.b,q.z,q.y).aD(a)&&r.c.ae(a)}else s=!1
return s},
$S:1}
A.ik.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.by(o.a(b),s,r,p,q,null),A.by(a,s,r,p,q,null))},
$S:3}
A.il.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.im.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.io.prototype={
$1(a){t.r.a(a)
return a.cx&&this.a.a.az(a)},
$S:0}
A.ip.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.af(s.a(b),!0),A.af(a,!0))},
$S:2}
A.iq.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.af(s.a(b),!0),A.af(a,!0))},
$S:2}
A.ir.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.cn(s,this.a.a,r.b,q.z,q.y).aD(a)&&r.c.ae(a)}else s=!1
return s},
$S:1}
A.is.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.by(o.a(b),s,r,p,q,null),A.by(a,s,r,p,q,null))},
$S:3}
A.iu.prototype={
$1(a){t.r.a(a)
return this.a.c.ae(this.b)},
$S:0}
A.iv.prototype={
$2(a,b){var s,r,q
A.h(a)
t.q.a(b)
s=this.a
r=b.a
q=s.a.u(r).length
s=Math.min(Math.max(0,q-(r===this.c.c?1:0)),s.a.a9(b))
q=this.b.b.b.i(0,"soldierLimit")
q.toString
return a+s*B.b.m(q)},
$S:6}
A.iw.prototype={
$1(a){return t.T.a(a).a===B.h},
$S:11}
A.ix.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:8}
A.b_.prototype={}
A.ez.prototype={
al(b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=b1.a,a7=b1.b,a8=A.t(b0.a)+","+A.t(b0.b)+":"+A.t(a6)+","+A.t(a7),a9=a5.d
if(a9.Z(a8)){a6=a9.i(0,a8)
a6.toString
return a6}for(s=a5.a,r=s.b,q=s.c,p=r+q+8,o=r-1,--q,n=a5.b,m=n.b,n=n.e,s=s.d,l=s.length,k=n.length,j=a5.c,i=b0,h=0,g=0;g<p;++g){f=i.E(b1)
if(f<1e-7){if(a9.a>=256){e=new A.aa(a9,A.k(a9).h("aa<1>")).gB(0)
if(!e.j())A.aC(A.a0())
a9.aw(0,e.gn())}a9.A(0,a8,h)
return h}if(!j.dF())return 1/0
d=i.a
c=(a6-d)/f
b=i.b
a=(a7-b)/f
a0=B.c.v(B.b.a0((d+c*1e-7)/16),0,o)
a1=B.c.v(B.b.a0((b+a*1e-7)/16),0,q)
a2=new A.eA()
a3=a2.$3(d,c,a0)
a2=a2.$3(b,a,a1)
a4=Math.min(f,Math.min(A.jv(a3),A.jv(a2)))
a2=m.i(0,"marchSpeed")
a2.toString
a3=a1*r+a0
if(!(a3>=0&&a3<l))return A.w(s,a3)
a3=s[a3]
if(!(a3<k))return A.w(n,a3)
h+=a4/(a2*n[a3])
i=new A.D(d+c*a4,b+a*a4)}return 1/0},
b0(a7,a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=a9.G(a7.c),a4=a7.as,a5=(a4===B.e||a4===B.d)&&a3!=null?a3.r.c9(a3.f,a8):a7.z,a6=b2==null?a8:b2.r.c0(a5,a8)
a4=this.a
if(!a4.p(0,a6))return B.t
s=new A.eB(a9,a7,b2,b1,a6)
r=new A.eD(this,a9,a7)
q=t._
p=A.c([A.c([a6],q)],t.a5)
if(!s.$2(a5,a6))o=b0&&r.$2(a5,a6)
else o=!0
if(o){n=a5.E(a6)
o=a5.a
m=a6.a
l=(o+m)/2
k=a5.b
j=a6.b
i=(k+j)/2
if(n>0)for(h=[-96,96,-192,192],k=(j-k)/n,o=(m-o)/n,g=0;g<4;++g){f=h[g]
e=new A.D(l-k*f,i+o*f)
if(a4.p(0,e))B.a.l(p,A.c([e,a6],q))}}for(a4=p.length,d=null,g=0;g<p.length;p.length===a4||(0,A.z)(p),++g){c=p[g]
q=B.a.gB(c)
a=a5
a0=0
a1=!1
for(;;){if(!q.j()){b=!0
break}a2=q.gn()
if(s.$2(a,a2)){b=!1
break}a1=a1||r.$2(a,a2)
a0+=this.al(a,a2)
a=a2}q=!0
if(b)if(isFinite(a0))q=b0&&a1
if(q)continue
if(d==null||a0<d.b)d=new A.b_(c,a0,!0)}return d==null?B.T:d},
aF(a,b,c,d,e){return this.b0(a,b,c,d,null,e)},
aE(a,b,c,d){return this.b0(a,b,c,!1,null,d)},
dK(a,b,c,d){return this.b0(a,b,c,!1,d,null)},
dJ(a,b,c){return this.b0(a,b,c,!1,null,null)}}
A.eA.prototype={
$3(a,b,c){var s
if(Math.abs(b)<1e-12)s=1/0
else s=Math.max(1e-8,((b>0?c+1:c)*16-a)/b)
return s},
$S:57}
A.eB.prototype={
$2(a,b){var s=this
return B.a.D(s.a.f,new A.eC(s.b,s.c,a,b,s.d,s.e))},
$S:22}
A.eC.prototype={
$1(a){var s,r,q,p,o=this
t.q.a(a)
if(a.b!==o.a.b){s=o.b
s=s==null?null:s.a
s=a.a===s}else s=!0
if(s)return!1
s=o.d
r=a.r.cc(o.c,s)
if(r!=null){q=o.e
q=q==null?null:q.a
p=!(a.a===q&&s.E(o.f)<1e-7&&r>=0.9999999)
s=p}else s=!1
return s},
$S:1}
A.eD.prototype={
$2(a,b){return B.a.D(this.b.r,new A.eE(this.a,this.c,b,a))},
$S:22}
A.eE.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this
t.r.a(a)
if(a.b!==j.b.b){s=a.as
s=s===B.e||s===B.d||a.fr||a.f<=0}else s=!0
if(s)return!1
s=j.c
r=j.d
q=r.a
p=s.a-q
o=r.b
n=s.b-o
m=p*p+n*n
if(m===0)l=0
else{k=a.z
l=B.b.v(((k.a-q)*p+(k.b-o)*n)/m,0,1)}s=r.aL(s,l).E(a.z)
r=j.a.b.b.i(0,"encounterDistance")
r.toString
return s<r+12},
$S:0}
A.eF.prototype={
ci(a,b){var s,r=this.b
if(r.i(0,"useMorale")===0)return 0
if(b>0){r=r.i(0,"cityMoraleBonus"+B.c.v(b,1,5))
r=r==null?null:B.b.m(r)
if(r==null)r=0}else r=0
s=a+r
return s<0?0:s},
dv(a){return this.ci(a,0)},
bm(a,b,c,d){var s,r,q,p
if(c){s=this.f
if(!(d<s.length))return A.w(s,d)
s=s[d]}else s=1
s=B.c.v(B.b.a0(a*s),0,63)
if(b>0){r=this.d
q=r.length
p=B.c.v(b-1,0,q-1)
if(!(p>=0&&p<q))return A.w(r,p)
p=r[p]
r=p}else r=0
return B.c.v(s+r,0,63)},
bl(a,b,c){return this.bm(a,b,c,0)},
d9(a,b){return this.bm(a,0,b,0)},
ao(a){var s,r,q="maxLevel",p=this.b,o=p.i(0,"firstYearCityLevel")
if(o==null){o=p.i(0,q)
o.toString
o=B.b.m(o)}o=B.b.m(o)
s=p.i(0,"initialYear")
s=B.b.m(s==null?1:s)
r=p.i(0,q)
r.toString
r=B.c.v(a-s,0,B.b.m(r))
s=p.i(0,"cityLevelsPerYear")
s=B.b.m(s==null?1:s)
p=p.i(0,q)
p.toString
return B.c.v(o+r*s,1,B.b.m(p))},
L(){var s=this
return A.U(["version",s.a,"values",s.b,"upgrades",s.c,"defenseBonuses",s.d,"movement",s.e,"field",s.f,"tuning",s.r.L()],t.N,t.X)}}
A.en.prototype={
c3(a){var s=this.d,r=this.b
r=B.c.v(B.b.a0(a.b/16),0,this.c-1)*r+B.c.v(B.b.a0(a.a/16),0,r-1)
if(!(r>=0&&r<s.length))return A.w(s,r)
return s[r]},
p(a,b){var s,r=b.a
if(isFinite(r)){s=b.b
r=isFinite(s)&&r>=0&&s>=0&&r<this.b*16&&s<this.c*16}else r=!1
return r},
L(){var s=this
return A.U(["version",s.a,"width",s.b,"height",s.c,"terrain",s.d],t.N,t.X)}}
A.eH.prototype={
dA(a){var s,r,q,p,o,n,m,l,k,j,i,h=this
try{s=t.d1.a(B.l.dg(a,null))
switch(J.ar(s,"kind")){case"init":if(!J.aE(J.ar(s,"protocol"),2)||!J.aE(J.ar(s,"build"),"9ef84ae9"))throw A.i(B.aa);++h.f
h.e=null
o=h.r
if(o.a>0){o.b=o.c=o.d=o.e=o.f=null
o.a=0
o.b7()}r=J.ar(s,"gameConfig")
o=t.f
if(!o.b(r))throw A.i(B.a5)
n=t.N
m=t.z
A.lX(A.ai(r,n,m))
h.c=A.lH(A.ai(o.a(J.ar(s,"rules")),n,m))
m=A.ai(o.a(J.ar(s,"map")),n,m)
o=A.L(m.i(0,"version"))
l=A.h(m.i(0,"width"))
k=A.h(m.i(0,"height"))
m=A.cg(t.R.a(m.i(0,"terrain")),!0,t.S)
j=new Uint8Array(A.mX(m))
if(l<=0||k<=0||m.length!==l*k)A.aC(B.ad)
h.d=new A.en(o,l,k,j)
h.a.$1(B.l.aA(t.G.a(A.U(["kind","ready","rules",h.c.a,"map",o,"backend",h.b],n,t.X)),null))
break
case"cancel":o=h.e
n=J.ar(s,"id")
if(o==null?n==null:o===n)h.r.l(0,A.h(J.ar(s,"id")))
break
case"plan":if(h.c==null||h.d==null||h.e!=null){o=A.iJ("AI \u5c1a\u672a\u5c31\u7eea\u6216\u5df2\u6709\u8bf7\u6c42\u6267\u884c\u4e2d")
throw A.i(o)}q=A.lG(A.ai(t.f.a(J.ar(s,"request")),t.N,t.z))
h.e=q.d
h.aT(q,h.f)
break
default:throw A.i(B.ac)}}catch(i){p=A.aY(i)
h.a.$1(B.l.aA(t.G.a(A.U(["kind","error","message",J.aZ(p)],t.N,t.X)),null))}},
aT(a,b){return this.d0(a,b)},
d0(a3,a4){var s=0,r=A.ni(t.o),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
var $async$aT=A.nx(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:a1=new A.iK()
$.kf()
a1.bA()
m=a1
p=4
i=n.c
i.toString
h=n.d
h.toString
g=new A.eG(i.r)
f=new A.eT(i,h,a3,g,A.a4(t.S,t.a))
e=t.N
h=new A.ez(h,i,g,A.a4(e,t.i))
f.e=h
f.f=new A.eQ(i,g,A.a4(e,t.cM))
f.r=new A.hP(a3,i,h)
l=f
k=0
i=l.bB(),h=i.$ti,i=new A.aV(i.a(),h.h("aV<1>")),h=h.c,g=n.r,d=a3.d,c=t.o
case 7:if(!i.j()){s=8
break}b=i.b
if(b==null)h.a(b)
if(a4!==n.f||g.p(0,d)){if(a4===n.f){n.e=null
g.aw(0,d)
n.a.$1(B.l.aA(t.G.a(A.U(["kind","cancelled","id",d],e,t.X)),null))}s=1
break}b=k
if(typeof b!=="number"){q=b.aC()
s=1
break}a=b+1
k=a
s=a>=n.c.r.id?9:10
break
case 9:k=0
b=m
if(b.b==null)b.b=$.hY.$0()
s=11
return A.mP(A.lV(B.G,c),$async$aT)
case 11:m.bA()
case 10:s=7
break
case 8:if(a4!==n.f){s=1
break}if(g.aw(0,d)){n.e=null
n.a.$1(B.l.aA(t.G.a(A.U(["kind","cancelled","id",d],e,t.X)),null))
s=1
break}n.e=null
i=l.w
i.toString
n.a.$1(B.l.aA(t.G.a(A.U(["kind","reply","reply",A.kn(a3,i,null,m.gcb()).L()],e,t.X)),null))
p=2
s=6
break
case 4:p=3
a2=o.pop()
j=A.aY(a2)
if(a4!==n.f){s=1
break}n.e=null
i=A.c(["\u89c4\u5212\u5931\u8d25\uff0c\u4e3b\u73af\u5883\u4fdd\u7559\u6709\u9650\u5b89\u5168\u4fdd\u62a4"],t.s)
h=m.gcb()
n.a.$1(B.l.aA(t.G.a(A.U(["kind","reply","reply",A.kn(a3,new A.bA("preparing",null,0,1,B.L,i,!1,0,0,0),J.aZ(j),h).L()],t.N,t.X)),null))
s=6
break
case 3:s=2
break
case 6:case 1:return A.mR(q,r)
case 2:return A.mQ(o.at(-1),r)}})
return A.mS($async$aT,r)}}
A.jI.prototype={
$1(a){t.r.a(a)
return a.w*3+a.f*0.35+a.gK()*8},
$S:30}
A.jJ.prototype={
$1(a){var s
t.r.a(a)
if(a.c===this.a.a){s=a.as
s=!(s===B.e||s===B.d)}else s=!1
return s},
$S:0}
A.jK.prototype={
$2(a,b){var s
A.am(a)
t.r.a(b)
s=A.a6(b)
return a+s*(b.go==null?0.12:0.03)},
$S:21}
A.a7.prototype={}
A.au.prototype={
ga7(){var s=this,r=!1
if(B.a.D(s.b,new A.eL()))if(s.a.cx!=null||B.a.D(s.d,new A.eM())){r=s.r
r=r==null||r.a!==B.f}return r},
gac(){var s,r=this.a
if(r.cx!=null)r=r.fy
else{r=this.d
if(r.length===0)r=1/0
else{s=A.f(r)
s=new A.O(r,s.h("j(1)").a(new A.eK()),s.h("O<1,j>")).ai(0,B.z)
r=s}}return r}}
A.eL.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.eM.prototype={
$1(a){return t.O.a(a).c>=0.55},
$S:10}
A.eK.prototype={
$1(a){return t.O.a(a).b},
$S:60}
A.iM.prototype={
dE(c5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9=this,c0="marchSpeed",c1=b9.a,c2=c5.a,c3=c1.u(c2),c4=A.c([],t.D)
for(s=c1.r,r=s.length,q=c5.f,p=c5.r,o=b9.b,n=o.b,o=o.r.b,m=q.a,l=q.b,k=c5.db,j=c5.b,i=0;i<r;++i){h=s[i]
if(h.b!==j){g=h.as
g=g===B.e||g===B.d||h.f<=0}else g=!0
if(g)continue
if(h.a===k){B.a.l(c4,new A.a7(h,0,1))
continue}if(h.fr)continue
g=h.z
f=g.E(q)
e=h.k4===c2
d=!e
if(d){c=n.i(0,c0)
c.toString
c=f>c*o+80}else c=!1
if(c)continue
c=h.Q
b=c.a
a=c.b
a0=Math.sqrt(b*b+a*a)
a1=a0<0.01
a2=a1?0:((m-g.a)*b+(l-g.b)*a)/(Math.max(1,f)*a0)
if(d&&a2<0.45&&f>72)continue
if(d&&f>72){a3=Math.max(0,f*a2)
a4=new A.D(g.a+b/a0*a3,g.b+a/a0*a3)
if(p.Y(a4).E(a4)>48)continue}d=n.i(0,c0)
d.toString
a5=A.nL(q,o,e,d,p,g,new A.iN(b9),c)
if(a5==null)continue
if(h.as===B.i||a1)g=0.35
else if(a2>0.8)g=1
else g=f<72?0.9:0.55
B.a.l(c4,new A.a7(h,a5,g))}B.a.C(c4,new A.iO())
c2=A.f(c3)
r=t.r
a6=A.b2(new A.d(c3,c2.h("e(1)").a(new A.iP(c5)),c2.h("d<1>")),r)
q=A.c([],t.e)
if(a6!=null)q.push(a6)
c2=c2.h("K<1>")
B.a.J(q,new A.K(c3,c2).bC(0,c2.h("e(l.E)").a(new A.iQ(a6))))
c2=t.S
a7=A.R(q,0,A.W(c5.ga2(),"count",c2),r).ap(0)
a8=A.a4(t.N,c2)
a9=B.a.av(c1.w,new A.iR(c5)).c
for(c1=a7.length,i=0;c2=a7.length,i<c2;a7.length===c1||(0,A.z)(a7),++i){b0=a7[i]
if(b0.as===B.d)b1=0
else{c2=n.i(0,"soldierLimit")
c2.toString
b1=Math.min(a9,B.b.m(c2)-b0.gK())}a9-=b1
a8.A(0,b0.a,b0.gK()+b1)}c1=c4.length
b2=null
b3=null
if(c1!==0&&c2!==0)for(c2=c5.fx,r=c5.cx,q=c5.cy,p=r==null,o=b9.d,n=c5.d,b4=0;b4<a7.length;++b4,c1=l){b5=a7[b4]
for(m=b5.a,b6=null,i=0;l=c4.length,i<l;c4.length===c1||(0,A.z)(c4),++i){b7=c4[i]
if(p)l=n
else{l=c2?1:0
l=B.c.v(r-q-l,0,5)}b8=o.aJ(b5,b7.a,Math.max(1,l-b4),a8.i(0,m))
if(b6==null||b8.b<b6.b)b6=b8}if(b2==null||b6.b>b2.b)b2=b6
if(b5.e===2)b3=b6}c1=A.f(s)
return new A.au(c5,c3,c4,b2,b3,new A.d(s,c1.h("e(1)").a(new A.iS(c5)),c1.h("d<1>")).H(0,0,new A.iT(),t.i))}}
A.iN.prototype={
$2(a,b){var s=this.a,r=s.c,q=r.al(a,b)
if(!isFinite(q)&&r.c.e){r=a.E(b)
s=s.b.b.i(0,"marchSpeed")
s.toString
s=r/s}else s=q
return s},
$S:61}
A.iO.prototype={
$2(a,b){var s,r=t.O
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.o.t(a.a.a,b.a.a):B.b.t(r,s)},
$S:62}
A.iP.prototype={
$1(a){return t.r.a(a).a===this.a.dx},
$S:0}
A.iQ.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.iR.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:5}
A.iS.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=!1
if(a.b===s.b)if(a.c===s.a){s=a.as
s=!(s===B.e||s===B.d)&&!a.fr}else s=r
else s=r
return s},
$S:0}
A.iT.prototype={
$2(a,b){return A.am(a)+A.a6(t.r.a(b))},
$S:21}
A.eG.prototype={
a5(){var s=this,r=s.b
if(r>=s.a.db){s.e=!0
return!1}s.b=r+1
return!0},
d8(){var s=this,r=s.c
if(r>=s.a.dx){s.e=!0
return!1}s.c=r+1
return!0},
dF(){var s=this,r=s.d
if(r>=s.a.dy){s.e=!0
return!1}s.d=r+1
return!0}}
A.jE.prototype={
$1(a){A.L(a)
return A.jm(v.G.self).postMessage(a)},
$S:63}
A.jF.prototype={
$1(a){return this.a.dA(A.L(A.jm(a).data))},
$S:64};(function aliases(){var s=J.b4.prototype
s.cC=s.q
s=A.b.prototype
s.bC=s.dN})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_0,q=hunkHelpers._static_1,p=hunkHelpers.installStaticTearOff
s(J,"n4","m4",65)
r(A,"nh","ma",12)
q(A,"nz","mn",15)
q(A,"nA","mo",15)
q(A,"nB","mp",15)
r(A,"l8","ns",4)
q(A,"nD","mV",20)
s(A,"lh","lE",2)
p(A,"ld",2,null,["$1$2","$2"],["lf",function(a,b){return A.lf(a,b,t.H)}],26,0)
p(A,"nW",2,null,["$1$2","$2"],["le",function(a,b){return A.le(a,b,t.H)}],26,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.C,null)
q(A.C,[A.jR,J.da,A.cq,J.bf,A.b,A.bV,A.G,A.iF,A.p,A.ch,A.V,A.c6,A.bp,A.cs,A.c3,A.cy,A.bj,A.J,A.az,A.bC,A.bX,A.cC,A.a9,A.iU,A.hD,A.c4,A.cJ,A.H,A.hy,A.bl,A.al,A.cf,A.aw,A.dD,A.jj,A.jh,A.dz,A.aV,A.at,A.br,A.a1,A.dA,A.dI,A.cP,A.bF,A.dG,A.bt,A.v,A.cO,A.d2,A.d4,A.jd,A.bi,A.dB,A.dq,A.ct,A.j_,A.ah,A.ac,A.ad,A.dJ,A.iK,A.bG,A.iG,A.eJ,A.be,A.eN,A.bW,A.eQ,A.cX,A.ay,A.eT,A.ag,A.fM,A.D,A.ev,A.o,A.P,A.bd,A.eo,A.hE,A.co,A.hP,A.x,A.a8,A.I,A.bA,A.ey,A.ex,A.hZ,A.b_,A.ez,A.eF,A.en,A.eH,A.a7,A.au,A.iM,A.eG])
q(J.da,[J.dc,J.c9,J.cb,J.ca,J.cc,J.bB,J.bk])
q(J.cb,[J.b4,J.r,A.bD,A.ck])
q(J.b4,[J.dr,J.bH,J.b3])
r(J.db,A.cq)
r(J.ht,J.r)
q(J.bB,[J.c8,J.dd])
q(A.b,[A.b6,A.m,A.bn,A.d,A.c5,A.bo,A.cr,A.cx,A.c7,A.cB,A.aB])
q(A.b6,[A.bg,A.cQ])
r(A.cA,A.bg)
r(A.cz,A.cQ)
r(A.aK,A.cz)
q(A.G,[A.ce,A.aT,A.de,A.dy,A.du,A.dC,A.cd,A.cZ,A.aF,A.cw,A.dx,A.cu,A.d3])
q(A.m,[A.l,A.c2,A.aa,A.T,A.aO])
q(A.l,[A.y,A.O,A.K,A.dF])
r(A.c0,A.bn)
r(A.c1,A.bo)
r(A.hq,A.cr)
r(A.c_,A.c7)
q(A.az,[A.b7,A.bJ])
q(A.b7,[A.aG,A.cH,A.bv])
r(A.aA,A.bJ)
r(A.bL,A.bC)
r(A.cv,A.bL)
r(A.bY,A.cv)
r(A.bZ,A.bX)
q(A.a9,[A.d9,A.d0,A.d1,A.dw,A.jA,A.jC,A.iX,A.iW,A.jn,A.j9,A.hA,A.iH,A.dU,A.ec,A.dW,A.eb,A.ek,A.el,A.ei,A.dX,A.dY,A.e_,A.e2,A.e1,A.e3,A.e5,A.e7,A.ea,A.e9,A.ee,A.eg,A.eO,A.fo,A.fp,A.fq,A.fH,A.fI,A.fJ,A.fK,A.fr,A.ft,A.fw,A.fA,A.fC,A.fE,A.f5,A.eU,A.f1,A.f3,A.f4,A.eV,A.eX,A.fb,A.fe,A.ff,A.fg,A.fh,A.fl,A.fn,A.f8,A.f9,A.f7,A.eZ,A.hl,A.hm,A.hk,A.hn,A.hi,A.hh,A.hj,A.hg,A.hp,A.ho,A.fN,A.fP,A.fZ,A.h_,A.h1,A.h3,A.fQ,A.h5,A.fS,A.fU,A.fW,A.hc,A.hd,A.hf,A.h6,A.h9,A.ha,A.hb,A.h7,A.dT,A.dQ,A.dR,A.et,A.eu,A.er,A.eq,A.es,A.ep,A.hF,A.hK,A.hM,A.hN,A.hL,A.hI,A.hJ,A.hH,A.hQ,A.hT,A.hV,A.hR,A.hS,A.jt,A.jH,A.i3,A.i4,A.ih,A.i2,A.i_,A.i0,A.iA,A.iE,A.iC,A.iD,A.i6,A.i9,A.i8,A.ib,A.ic,A.ie,A.ij,A.il,A.im,A.io,A.ir,A.iu,A.iw,A.eA,A.eC,A.eE,A.jI,A.jJ,A.eL,A.eM,A.eK,A.iP,A.iQ,A.iR,A.iS,A.jE,A.jF])
r(A.aM,A.d9)
q(A.d0,[A.hW,A.iY,A.iZ,A.ji,A.hr,A.j0,A.j5,A.j4,A.j2,A.j1,A.j8,A.j7,A.j6,A.jg,A.jr,A.iI,A.dV,A.em,A.fx,A.hG,A.ju])
r(A.cm,A.aT)
q(A.dw,[A.dv,A.bz])
q(A.H,[A.aN,A.dE])
q(A.d1,[A.hu,A.jB,A.jo,A.js,A.ja,A.hz,A.hC,A.je,A.ej,A.dZ,A.e0,A.e4,A.e6,A.e8,A.ed,A.ef,A.eh,A.eP,A.eR,A.eS,A.fB,A.fF,A.fG,A.fL,A.fs,A.fu,A.fv,A.fy,A.fz,A.fD,A.f6,A.f2,A.eW,A.eY,A.fa,A.fc,A.fd,A.fi,A.fj,A.fk,A.fm,A.f_,A.f0,A.fO,A.fY,A.h0,A.h2,A.h4,A.fR,A.fT,A.fV,A.fX,A.he,A.h8,A.dS,A.hO,A.hU,A.i5,A.it,A.i1,A.iy,A.iz,A.iB,A.i7,A.ia,A.id,A.ig,A.ii,A.ik,A.ip,A.iq,A.is,A.iv,A.ix,A.eB,A.eD,A.jK,A.iN,A.iO,A.iT])
q(A.ck,[A.dg,A.bE])
q(A.bE,[A.cD,A.cF])
r(A.cE,A.cD)
r(A.ci,A.cE)
r(A.cG,A.cF)
r(A.cj,A.cG)
q(A.ci,[A.dh,A.di])
q(A.cj,[A.dj,A.dk,A.dl,A.dm,A.dn,A.cl,A.dp])
r(A.bK,A.dC)
r(A.dH,A.cP)
r(A.cI,A.bF)
r(A.ax,A.cI)
r(A.df,A.cd)
r(A.hv,A.d2)
q(A.d4,[A.hx,A.hw])
r(A.jc,A.jd)
q(A.aF,[A.cp,A.d8])
q(A.dB,[A.bh,A.ap,A.aJ,A.as])
s(A.cQ,A.v)
s(A.cD,A.v)
s(A.cE,A.J)
s(A.cF,A.v)
s(A.cG,A.J)
s(A.bL,A.cO)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",j:"double",a_:"num",F:"String",e:"bool",ad:"Null",q:"List",C:"Object",ab:"Map",Q:"JSObject"},mangledNames:{},types:["e(o)","e(P)","a(o,o)","a(P,P)","~()","e(bd)","a(a,P)","e(a8)","a(a,I)","a(a,o)","e(a7)","e(x)","a()","j(a_,j)","e(au)","~(~())","o(o,o)","a(a)","e(ag)","e(j)","@(@)","j(j,o)","e(D,D)","e(a)","j(D)","~(C?,C?)","0^(0^,0^)<a_>","o(a7)","e(I)","ad(@)","j(o)","ad()","a(ay,ay)","ad(C,b5)","a(D,D)","j(j,P)","a(au,au)","ad(~())","a?(a)","e()","q<a8>(I)","j(j,a8)","@(F)","a(+x,y(a,a))","q<+x,y(a,a)>()","j(j,F)","j(a_,o)","~(@,@)","q<o>()","@(@,F)","a(P)","a(a,a)","+breakthrough,lower,teamSize,upper(e,j,a,j)()","e(a?)","e(be{civilian:e})","e(be,q<x>,F,P{emergency:e,hero:o?})","e(P{defense!e})","j(j,j,a)","~(a,@)","ad(@,b5)","j(a7)","j(D,D)","a(a7,a7)","~(F)","~(Q)","a(@,@)","~(@)","o?(x)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.aG&&a.b(c.a)&&b.b(c.b),"2;hero,route":(a,b)=>c=>c instanceof A.cH&&a.b(c.a)&&b.b(c.b),"2;x,y":(a,b)=>c=>c instanceof A.bv&&a.b(c.a)&&b.b(c.b),"4;breakthrough,lower,teamSize,upper":a=>b=>b instanceof A.aA&&A.nX(a,b.a)}}
A.mJ(v.typeUniverse,JSON.parse('{"b3":"b4","dr":"b4","bH":"b4","o7":"bD","dc":{"e":[],"E":[]},"c9":{"E":[]},"cb":{"Q":[]},"b4":{"Q":[]},"r":{"q":["1"],"m":["1"],"Q":[],"b":["1"]},"db":{"cq":[]},"ht":{"r":["1"],"q":["1"],"m":["1"],"Q":[],"b":["1"]},"bf":{"B":["1"]},"bB":{"j":[],"a_":[],"av":["a_"]},"c8":{"j":[],"a":[],"a_":[],"av":["a_"],"E":[]},"dd":{"j":[],"a_":[],"av":["a_"],"E":[]},"bk":{"F":[],"av":["F"],"E":[]},"b6":{"b":["2"]},"bV":{"B":["2"]},"bg":{"b6":["1","2"],"b":["2"],"b.E":"2"},"cA":{"bg":["1","2"],"b6":["1","2"],"m":["2"],"b":["2"],"b.E":"2"},"cz":{"v":["2"],"q":["2"],"b6":["1","2"],"m":["2"],"b":["2"]},"aK":{"cz":["1","2"],"v":["2"],"q":["2"],"b6":["1","2"],"m":["2"],"b":["2"],"v.E":"2","b.E":"2"},"ce":{"G":[]},"m":{"b":["1"]},"l":{"m":["1"],"b":["1"]},"y":{"l":["1"],"m":["1"],"b":["1"],"b.E":"1","l.E":"1"},"p":{"B":["1"]},"bn":{"b":["2"],"b.E":"2"},"c0":{"bn":["1","2"],"m":["2"],"b":["2"],"b.E":"2"},"ch":{"B":["2"]},"O":{"l":["2"],"m":["2"],"b":["2"],"b.E":"2","l.E":"2"},"d":{"b":["1"],"b.E":"1"},"V":{"B":["1"]},"c5":{"b":["2"],"b.E":"2"},"c6":{"B":["2"]},"bo":{"b":["1"],"b.E":"1"},"c1":{"bo":["1"],"m":["1"],"b":["1"],"b.E":"1"},"bp":{"B":["1"]},"cr":{"b":["1"],"b.E":"1"},"hq":{"cr":["1"],"m":["1"],"b":["1"],"b.E":"1"},"cs":{"B":["1"]},"c2":{"m":["1"],"b":["1"],"b.E":"1"},"c3":{"B":["1"]},"cx":{"b":["1"],"b.E":"1"},"cy":{"B":["1"]},"c7":{"b":["+(a,1)"],"b.E":"+(a,1)"},"c_":{"c7":["1"],"m":["+(a,1)"],"b":["+(a,1)"],"b.E":"+(a,1)"},"bj":{"B":["+(a,1)"]},"K":{"l":["1"],"m":["1"],"b":["1"],"b.E":"1","l.E":"1"},"aG":{"b7":[],"az":[]},"cH":{"b7":[],"az":[]},"bv":{"b7":[],"az":[]},"aA":{"bJ":[],"az":[]},"bY":{"cv":["1","2"],"bL":["1","2"],"bC":["1","2"],"cO":["1","2"],"ab":["1","2"]},"bX":{"ab":["1","2"]},"bZ":{"bX":["1","2"],"ab":["1","2"]},"cB":{"b":["1"],"b.E":"1"},"cC":{"B":["1"]},"d9":{"a9":[],"aL":[]},"aM":{"a9":[],"aL":[]},"cm":{"aT":[],"G":[]},"de":{"G":[]},"dy":{"G":[]},"cJ":{"b5":[]},"a9":{"aL":[]},"d0":{"a9":[],"aL":[]},"d1":{"a9":[],"aL":[]},"dw":{"a9":[],"aL":[]},"dv":{"a9":[],"aL":[]},"bz":{"a9":[],"aL":[]},"du":{"G":[]},"aN":{"H":["1","2"],"kz":["1","2"],"ab":["1","2"],"H.K":"1","H.V":"2"},"aa":{"m":["1"],"b":["1"],"b.E":"1"},"bl":{"B":["1"]},"T":{"m":["1"],"b":["1"],"b.E":"1"},"al":{"B":["1"]},"aO":{"m":["ac<1,2>"],"b":["ac<1,2>"],"b.E":"ac<1,2>"},"cf":{"B":["ac<1,2>"]},"b7":{"az":[]},"bJ":{"az":[]},"bD":{"Q":[],"E":[]},"ck":{"Q":[]},"dg":{"Q":[],"E":[]},"bE":{"ak":["1"],"Q":[]},"ci":{"v":["j"],"q":["j"],"ak":["j"],"m":["j"],"Q":[],"b":["j"],"J":["j"]},"cj":{"v":["a"],"q":["a"],"ak":["a"],"m":["a"],"Q":[],"b":["a"],"J":["a"]},"dh":{"v":["j"],"q":["j"],"ak":["j"],"m":["j"],"Q":[],"b":["j"],"J":["j"],"E":[],"v.E":"j","J.E":"j"},"di":{"v":["j"],"q":["j"],"ak":["j"],"m":["j"],"Q":[],"b":["j"],"J":["j"],"E":[],"v.E":"j","J.E":"j"},"dj":{"v":["a"],"q":["a"],"ak":["a"],"m":["a"],"Q":[],"b":["a"],"J":["a"],"E":[],"v.E":"a","J.E":"a"},"dk":{"v":["a"],"q":["a"],"ak":["a"],"m":["a"],"Q":[],"b":["a"],"J":["a"],"E":[],"v.E":"a","J.E":"a"},"dl":{"v":["a"],"q":["a"],"ak":["a"],"m":["a"],"Q":[],"b":["a"],"J":["a"],"E":[],"v.E":"a","J.E":"a"},"dm":{"v":["a"],"q":["a"],"ak":["a"],"m":["a"],"Q":[],"b":["a"],"J":["a"],"E":[],"v.E":"a","J.E":"a"},"dn":{"v":["a"],"q":["a"],"ak":["a"],"m":["a"],"Q":[],"b":["a"],"J":["a"],"E":[],"v.E":"a","J.E":"a"},"cl":{"v":["a"],"q":["a"],"ak":["a"],"m":["a"],"Q":[],"b":["a"],"J":["a"],"E":[],"v.E":"a","J.E":"a"},"dp":{"jZ":[],"v":["a"],"q":["a"],"ak":["a"],"m":["a"],"Q":[],"b":["a"],"J":["a"],"E":[],"v.E":"a","J.E":"a"},"dC":{"G":[]},"bK":{"aT":[],"G":[]},"aV":{"B":["1"]},"aB":{"b":["1"],"b.E":"1"},"at":{"G":[]},"a1":{"b1":["1"]},"cP":{"kL":[]},"dH":{"cP":[],"kL":[]},"ax":{"bF":["1"],"kB":["1"],"jX":["1"],"m":["1"],"b":["1"]},"bt":{"B":["1"]},"H":{"ab":["1","2"]},"bC":{"ab":["1","2"]},"cv":{"bL":["1","2"],"bC":["1","2"],"cO":["1","2"],"ab":["1","2"]},"bF":{"jX":["1"],"m":["1"],"b":["1"]},"cI":{"bF":["1"],"jX":["1"],"m":["1"],"b":["1"]},"dE":{"H":["F","@"],"ab":["F","@"],"H.K":"F","H.V":"@"},"dF":{"l":["F"],"m":["F"],"b":["F"],"b.E":"F","l.E":"F"},"cd":{"G":[]},"df":{"G":[]},"j":{"a_":[],"av":["a_"]},"bi":{"av":["bi"]},"a":{"a_":[],"av":["a_"]},"q":{"m":["1"],"b":["1"]},"a_":{"av":["a_"]},"F":{"av":["F"]},"dB":{"d5":[]},"cZ":{"G":[]},"aT":{"G":[]},"aF":{"G":[]},"cp":{"G":[]},"d8":{"G":[]},"cw":{"G":[]},"dx":{"G":[]},"cu":{"G":[]},"d3":{"G":[]},"dq":{"G":[]},"ct":{"G":[]},"dJ":{"b5":[]},"bG":{"mh":[]},"bh":{"d5":[]},"ap":{"d5":[]},"aJ":{"d5":[]},"as":{"d5":[]},"m0":{"q":["a"],"m":["a"],"b":["a"]},"jZ":{"q":["a"],"m":["a"],"b":["a"]},"ml":{"q":["a"],"m":["a"],"b":["a"]},"lZ":{"q":["a"],"m":["a"],"b":["a"]},"mj":{"q":["a"],"m":["a"],"b":["a"]},"m_":{"q":["a"],"m":["a"],"b":["a"]},"mk":{"q":["a"],"m":["a"],"b":["a"]},"lT":{"q":["j"],"m":["j"],"b":["j"]},"lU":{"q":["j"],"m":["j"],"b":["j"]}}'))
A.mI(v.typeUniverse,JSON.parse('{"cQ":2,"bE":1,"cI":1,"d2":2,"d4":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.bR
return{T:s("x"),q:s("P"),I:s("I"),t:s("bd"),a9:s("aJ"),r:s("o"),W:s("D"),bJ:s("b_"),J:s("a8"),u:s("at"),a:s("au"),cM:s("bW"),e8:s("av<@>"),x:s("ag"),fu:s("bi"),Q:s("m<@>"),U:s("G"),bo:s("c5<I,a8>"),h:s("aL"),O:s("a7"),B:s("aM<j>"),E:s("b<P>"),ef:s("b<o>"),er:s("b<a8>(I)"),R:s("b<@>"),w:s("r<x>"),Y:s("r<P>"),Z:s("r<I>"),eu:s("r<bd>"),e:s("r<o>"),_:s("r<D>"),m:s("r<a8>"),bL:s("r<au>"),D:s("r<a7>"),a5:s("r<q<D>>"),b:s("r<q<j>>"),d:s("r<ab<F,C?>>"),L:s("r<C>"),dZ:s("r<+(P,o)>"),h2:s("r<+hero,route(o,b_)>"),c7:s("r<+x,y(a,a)>"),s:s("r<F>"),bQ:s("r<ay>"),n:s("r<j>"),V:s("r<@>"),k:s("r<a>"),v:s("c9"),p:s("Q"),cj:s("b3"),aU:s("ak<@>"),f3:s("q<x>"),bd:s("q<o>"),gE:s("q<+x,y(a,a)>"),j:s("q<@>"),d1:s("ab<F,@>"),f:s("ab<@,@>"),G:s("ab<F,C?>"),P:s("ad"),K:s("C"),gT:s("o8"),bY:s("+()"),bU:s("+hero,route(o,b_)"),bP:s("+x,y(a,a)"),l:s("b5"),N:s("F"),aQ:s("y<ay>"),dm:s("E"),eK:s("aT"),ak:s("bH"),eO:s("d<o>"),eq:s("d<j>"),gn:s("cx<o>"),c:s("a1<@>"),dp:s("ay"),dT:s("aB<ag>"),gL:s("aB<a>"),y:s("e"),aO:s("e(o)"),al:s("e(C)"),db:s("e(j)"),i:s("j"),z:s("@"),fO:s("@()"),A:s("@(C)"),C:s("@(C,b5)"),S:s("a"),eH:s("b1<ad>?"),an:s("Q?"),bM:s("q<@>?"),X:s("C?"),dk:s("F?"),F:s("br<@,@>?"),g:s("dG?"),fQ:s("e?"),cD:s("j?"),h6:s("a?"),cg:s("a_?"),H:s("a_"),o:s("~"),M:s("~()"),cA:s("~(F,@)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.ag=J.da.prototype
B.a=J.r.prototype
B.c=J.c8.prototype
B.b=J.bB.prototype
B.o=J.bk.prototype
B.ah=J.b3.prototype
B.ai=J.cb.prototype
B.N=J.dr.prototype
B.B=J.bH.prototype
B.k=new A.as(0,"upgrade")
B.v=new A.as(1,"dismiss")
B.w=new A.as(2,"recruit")
B.h=new A.as(3,"soldiers")
B.C=new A.as(4,"dispatch")
B.O=new A.as(5,"move")
B.P=new A.as(6,"camp")
B.Q=new A.as(7,"retreat")
B.e=new A.ap(0,"garrison")
B.i=new A.ap(2,"camped")
B.x=new A.ap(3,"queue")
B.y=new A.ap(4,"attacking")
B.d=new A.ap(5,"defending")
B.q=new A.ap(7,"retreating")
B.D=new A.aJ(0,"full")
B.E=new A.aJ(1,"resources")
B.r=new A.aJ(2,"defense")
B.p=new A.aJ(3,"attack")
B.M=s([],t._)
B.t=new A.b_(B.M,1/0,!1)
B.T=new A.b_(B.M,1/0,!1)
B.U=new A.cX(4,24,6,1.5,10,12,0.65,5,0.5,0.25,45,15,0.8,45,25,90,-0.15,10,3,1,96,160,6000,8,24,4,6,8,2,0,1,0.3,20,900,64,0.25,8,0.12,0.05,2500,2,20)
B.F=new A.aM(A.nW(),t.B)
B.z=new A.aM(A.ld(),t.B)
B.V=new A.aM(A.ld(),A.bR("aM<a>"))
B.G=new A.bi()
B.H=new A.c3(A.bR("c3<0&>"))
B.I=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.W=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof HTMLElement == "function";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.a0=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var userAgent = navigator.userAgent;
    if (typeof userAgent != "string") return hooks;
    if (userAgent.indexOf("DumpRenderTree") >= 0) return hooks;
    if (userAgent.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.X=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.a_=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.Z=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.Y=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.J=function(hooks) { return hooks; }

B.l=new A.hv()
B.a1=new A.dq()
B.n=new A.iF()
B.m=new A.dH()
B.a2=new A.dJ()
B.f=new A.bh(0,"favorable")
B.a3=new A.bh(1,"close")
B.u=new A.bh(2,"unfavorable")
B.A=new A.bh(3,"unknown")
B.az=s(["\u9759\u6001\u8bc4\u4f30\u914d\u989d\u8017\u5c3d"],t.s)
B.a4=new A.bW(B.A,-1,1)
B.a5=new A.ah("AI \u521d\u59cb\u5316\u7f3a\u5c11 gameConfig")
B.a6=new A.ah("game_config.json5 \u7684\u57ce\u6c60\u6570\u7ec4\u957f\u5ea6\u4e0d\u6b63\u786e")
B.a7=new A.ah("\u6700\u9ad8\u57ce\u6c60\u7b49\u7ea7\u5fc5\u987b\u4e0e\u57ce\u9632\u52a0\u6210\u6570\u7ec4\u957f\u5ea6\u4e00\u81f4")
B.a8=new A.ah("AI \u534f\u8bae\u7248\u672c\u4e0d\u5339\u914d")
B.a9=new A.ah("game_config.json5 \u5305\u542b\u975e\u6cd5\u7684\u65f6\u95f4\u6216\u57ce\u6c60\u7b49\u7ea7")
B.aa=new A.ah("AI \u6784\u5efa\u7248\u672c\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u751f\u6210 Worker")
B.ab=new A.ah("\u6b20\u6536\u91d1\u5e01\u8303\u56f4\u5fc5\u987b\u4e3a\u975e\u8d1f\u6574\u6570\u4e14\u4e0a\u9650\u4e0d\u5c0f\u4e8e\u4e0b\u9650")
B.ac=new A.ah("\u672a\u77e5 AI \u5de5\u4f5c\u547d\u4ee4")
B.ad=new A.ah("AI \u5730\u56fe\u5c3a\u5bf8\u65e0\u6548")
B.ae=new A.ah("\u56fd\u5bb6\u89c4\u5212\u9759\u6001\u7248\u672c\u4e0d\u5339\u914d")
B.af=new A.ah("\u56fd\u5bb6\u89c2\u5bdf\u8d85\u51fa\u534f\u8bae\u5bb9\u91cf")
B.aj=new A.hw(null)
B.ak=new A.hx(null)
B.R=new A.ap(1,"marching")
B.S=new A.ap(6,"field")
B.K=s([B.e,B.R,B.i,B.x,B.y,B.d,B.S,B.q],A.bR("r<ap>"))
B.al=s([B.D,B.E,B.r,B.p],A.bR("r<aJ>"))
B.L=s([],t.Z)
B.j=s([],t.m)
B.am=s([],t.k)
B.an=A.aD("o2")
B.ao=A.aD("o3")
B.ap=A.aD("lT")
B.aq=A.aD("lU")
B.ar=A.aD("lZ")
B.as=A.aD("m_")
B.at=A.aD("m0")
B.au=A.aD("C")
B.av=A.aD("mj")
B.aw=A.aD("mk")
B.ax=A.aD("ml")
B.ay=A.aD("jZ")})();(function staticFields(){$.jb=null
$.an=A.c([],t.L)
$.kC=null
$.hX=0
$.hY=A.nh()
$.ks=null
$.kr=null
$.la=null
$.l6=null
$.lj=null
$.jy=null
$.jD=null
$.kb=null
$.jf=A.c([],A.bR("r<q<C>?>"))
$.bO=null
$.cT=null
$.cU=null
$.k4=!1
$.S=B.m})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"o5","lm",()=>A.jz("_$dart_dartClosure"))
s($,"o4","ke",()=>A.jz("_$dart_dartClosure_dartJSInterop"))
s($,"on","lx",()=>A.c([new J.db()],A.bR("r<cq>")))
s($,"ob","ln",()=>A.aU(A.iV({
toString:function(){return"$receiver$"}})))
s($,"oc","lo",()=>A.aU(A.iV({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"od","lp",()=>A.aU(A.iV(null)))
s($,"oe","lq",()=>A.aU(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"oh","lt",()=>A.aU(A.iV(void 0)))
s($,"oi","lu",()=>A.aU(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"og","ls",()=>A.aU(A.kJ(null)))
s($,"of","lr",()=>A.aU(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"ok","lw",()=>A.aU(A.kJ(void 0)))
s($,"oj","lv",()=>A.aU(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"ol","kg",()=>A.mm())
s($,"om","dN",()=>A.lg(B.au))
s($,"o9","kf",()=>{A.mc()
return $.hX})
s($,"o6","jL",()=>{var q=t.k
return A.U(["initialYear",1,"initialMonth",1,"secondsPerMonth",60,"initialGold",50,"countryAiEnabled",!0,"countryAiInitialDelay",0,"countryAiInterval",5,"countryAiMinimumSoldiers",4,"heroOfferValidMonths",2,"aiDepartureInterval",2,"countryAiEmergencyGold",5,"countryAiBudgetSafetySeconds",30,"countryAiBattleBudgetSeconds",30,"countryAiTargetTravelScale",30,"countryAiTargetDistancePower",2,"countryAiStrengthScale",80,"countryAiWeaknessPower",2,"countryHatredPerAttack",20,"countryHatredMaximum",100,"countryHatredWeightPerPoint",0.02,"normalHarvestWeight",2,"poorHarvestWeight",1,"abundantHarvestWeight",1,"cityBaseIncome",10,"cityIncomePerLevel",0,"countryMonthlyIncome",10,"foreignCityYieldFactor",1,"retreatBaseSuccessChance",0.9,"retreatConditionPenalty",0.1,"retreatExitSeconds",1.2,"retreatResultSeconds",0.6,"aiRetreatMinimumClashes",2,"aiRetreatSurvivalRatio",0.6,"aiRetreatHealthRatio",0.25,"aiThreatDistance",320,"aiMaximumRaidHeroes",4,"aiTargetShortlist",3,"aiTravelCacheSize",256,"aiRaidRetrySeconds",15,"harvestAdjustmentMin",5,"harvestAdjustmentMax",10,"poorHarvestAdjustmentMin",10,"poorHarvestAdjustmentMax",20,"chargeHeroSalary",!0,"freeGarrisonHeroes",2,"garrisonUpkeepFactor",0,"maxCityLevel",5,"firstYearCityUpgradeLimit",3,"cityUpgradeLevelsPerYear",1,"cityUpgradeCosts",A.c([30,40,50,60],q),"cityReserveCapacityPerLevel",4,"initialSoldiersPerHero",4,"soldierRecruitCost",1,"soldierRecruitBatchSize",10,"heroSoldierLimit",4,"initialHeroSoldiers",0,"recruitedHeroSoldiers",0,"heroDrawCost",5,"recycleDefeatedHeroes",!0,"cityDefenseAttackBonuses",A.c([1,3,5,8,10],q),"cityDefenseMoraleBonuses",A.c([5,10,15,20,25],q),"battleRecoilDifferenceScale",0.25,"cityDefenseRecoilScale",0,"battleMoralePowerScale",6,"battleUseMorale",!0,"battleMoraleDrainPerSecond",12,"battleMoraleDrainRandomRange",4,"battleWallDamageScale",0.5,"fieldEncounterDistance",16,"mountainHeroAttackFactor",1,"riverHeroAttackFactor",1,"grassHeroAttackFactor",1,"fieldBattleHistoryLimit",16,"baseMarchSpeed",22,"heroWalkFrameSeconds",0.2,"grassSpeedFactor",0.75,"mountainSpeedFactor",0.2,"waterSpeedFactor",0.4,"battleFormationFrames",163,"cityDamageChancePerVictory",1,"nationalAi",B.U.L()],t.N,t.X)})
r($,"lW","o1",()=>A.d7($.jL()))})();(function nativeSupport(){!function(){var s=function(a){var m={}
m[a]=1
return Object.keys(hunkHelpers.convertToFastObject(m))[0]}
v.getIsolateTag=function(a){return s("___dart_"+a+v.isolateTag)}
var r="___dart_isolate_tags_"
var q=Object[r]||(Object[r]=Object.create(null))
var p="_ZxYxX"
for(var o=0;;o++){var n=s(p+"_"+o+"_")
if(!(n in q)){q[n]=1
v.isolateTag=n
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.bD,SharedArrayBuffer:A.bD,ArrayBufferView:A.ck,DataView:A.dg,Float32Array:A.dh,Float64Array:A.di,Int16Array:A.dj,Int32Array:A.dk,Int8Array:A.dl,Uint16Array:A.dm,Uint32Array:A.dn,Uint8ClampedArray:A.cl,CanvasPixelArray:A.cl,Uint8Array:A.dp})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bE.$nativeSuperclassTag="ArrayBufferView"
A.cD.$nativeSuperclassTag="ArrayBufferView"
A.cE.$nativeSuperclassTag="ArrayBufferView"
A.ci.$nativeSuperclassTag="ArrayBufferView"
A.cF.$nativeSuperclassTag="ArrayBufferView"
A.cG.$nativeSuperclassTag="ArrayBufferView"
A.cj.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$0=function(){return this()}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$1=function(a){return this(a)}
Function.prototype.$1$0=function(){return this()}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.nU
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()