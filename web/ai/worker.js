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
if(a[b]!==s){A.mF(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.c(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.j_(b)
return new s(c,this)}:function(){if(s===null)s=A.j_(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.j_(a).prototype
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
j4(a,b,c,d){return{i:a,p:b,e:c,x:d}},
j0(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.j2==null){A.mt()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.h(A.jt("Return interceptor for "+A.u(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.i1
if(o==null)o=$.i1=A.ip(n)
p=q[o]}if(p!=null)return p
p=A.my(a)
if(p!=null)return p
if(typeof a=="function")return B.aa
s=Object.getPrototypeOf(a)
if(s==null)return B.N
if(s===Object.prototype)return B.N
if(typeof q=="function"){o=$.i1
if(o==null)o=$.i1=A.ip(n)
Object.defineProperty(q,o,{value:B.y,enumerable:false,writable:true,configurable:true})
return B.y}return B.y},
kM(a,b){if(a<0||a>4294967295)throw A.h(A.b6(a,0,4294967295,"length",null))
return J.kN(new Array(a),b)},
ji(a,b){if(a<0)throw A.h(A.cA("Length must be a non-negative integer: "+a,null))
return A.c(new Array(a),b.h("r<0>"))},
kN(a,b){var s=A.c(a,b.h("r<0>"))
s.$flags=1
return s},
bg(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bQ.prototype
return J.cQ.prototype}if(typeof a=="string")return J.bm.prototype
if(a==null)return J.bR.prototype
if(typeof a=="boolean")return J.cP.prototype
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aN.prototype
if(typeof a=="symbol")return J.bV.prototype
if(typeof a=="bigint")return J.bT.prototype
return a}if(a instanceof A.y)return a
return J.j0(a)},
cw(a){if(typeof a=="string")return J.bm.prototype
if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aN.prototype
if(typeof a=="symbol")return J.bV.prototype
if(typeof a=="bigint")return J.bT.prototype
return a}if(a instanceof A.y)return a
return J.j0(a)},
aX(a){if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aN.prototype
if(typeof a=="symbol")return J.bV.prototype
if(typeof a=="bigint")return J.bT.prototype
return a}if(a instanceof A.y)return a
return J.j0(a)},
ak(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bg(a).a8(a,b)},
aZ(a,b){if(typeof b==="number")if(Array.isArray(a)||A.mx(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.aX(a).i(a,b)},
kk(a,b){return J.aX(a).l(a,b)},
iD(a,b){return J.aX(a).T(a,b)},
ds(a){return J.aX(a).gG(a)},
a2(a){return J.bg(a).gP(a)},
iE(a){return J.cw(a).ga0(a)},
kl(a){return J.cw(a).gam(a)},
H(a){return J.aX(a).gB(a)},
km(a){return J.aX(a).gba(a)},
bi(a){return J.cw(a).gm(a)},
kn(a){return J.bg(a).gR(a)},
j8(a,b){return J.aX(a).aO(a,b)},
bj(a){return J.bg(a).p(a)},
cN:function cN(){},
cP:function cP(){},
bR:function bR(){},
bU:function bU(){},
aO:function aO(){},
d4:function d4(){},
cb:function cb(){},
aN:function aN(){},
bT:function bT(){},
bV:function bV(){},
r:function r(a){this.$ti=a},
cO:function cO(){},
fL:function fL(a){this.$ti=a},
b0:function b0(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bS:function bS(){},
bQ:function bQ(){},
cQ:function cQ(){},
bm:function bm(){}},A={iI:function iI(){},
kO(a){return new A.bX("Field '"+a+"' has not been initialized.")},
aF(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
hB(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
Z(a,b,c){return a},
j3(a){var s,r
for(s=$.ag.length,r=0;r<s;++r)if(a===$.ag[r])return!0
return!1},
a1(a,b,c,d){A.c7(b,"start")
if(c!=null){A.c7(c,"end")
if(b>c)A.cx(A.b6(b,0,c,"start",null))}return new A.D(a,b,c,d.h("D<0>"))},
kQ(a,b,c,d){if(t.U.b(a))return new A.bJ(a,b,c.h("@<0>").D(d).h("bJ<1,2>"))
return new A.b5(a,b,c.h("@<0>").D(d).h("b5<1,2>"))},
l_(a,b,c){A.c7(b,"takeCount")
if(t.U.b(a))return new A.bK(a,b,c.h("bK<0>"))
return new A.b7(a,b,c.h("b7<0>"))},
aD(){return new A.ca("No element")},
bX:function bX(a){this.a=a},
hz:function hz(){},
n:function n(){},
k:function k(){},
D:function D(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
t:function t(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
b5:function b5(a,b,c){this.a=a
this.b=b
this.$ti=c},
bJ:function bJ(a,b,c){this.a=a
this.b=b
this.$ti=c},
c0:function c0(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
R:function R(a,b,c){this.a=a
this.b=b
this.$ti=c},
d:function d(a,b,c){this.a=a
this.b=b
this.$ti=c},
S:function S(a,b,c){this.a=a
this.b=b
this.$ti=c},
bN:function bN(a,b,c){this.a=a
this.b=b
this.$ti=c},
bO:function bO(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b7:function b7(a,b,c){this.a=a
this.b=b
this.$ti=c},
bK:function bK(a,b,c){this.a=a
this.b=b
this.$ti=c},
b8:function b8(a,b,c){this.a=a
this.b=b
this.$ti=c},
bL:function bL(a){this.$ti=a},
bs:function bs(a,b){this.a=a
this.$ti=b},
ce:function ce(a,b){this.a=a
this.$ti=b},
I:function I(){},
N:function N(a,b){this.a=a
this.$ti=b},
ep(a,b,c){var s,r,q,p,o,n,m,l=A.o(a),k=A.c_(new A.a5(a,l.h("a5<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.w)(k),++i,p=o){r=k[i]
c.a(a.i(0,r))
o=p+1
q[r]=p}n=A.c_(new A.af(a,l.h("af<2>")),!0,c)
m=new A.bH(q,n,b.h("@<0>").D(c).h("bH<1,2>"))
m.$keys=k
return m}return new A.bG(A.ao(a,b,c),b.h("@<0>").D(c).h("bG<1,2>"))},
k7(a){var s=A.k6(a)
if(s!=null)return s
return"minified:"+a},
mx(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
u(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.bj(a)
return s},
d6(a){var s,r=$.jn
if(r==null)r=$.jn=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
kV(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.l(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
d7(a){var s,r,q,p
if(a instanceof A.y)return A.aa(A.au(a),null)
s=J.bg(a)
if(s===B.a9||s===B.ab||t.ak.b(a)){r=B.I(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aa(A.au(a),null)},
jo(a){var s,r,q
if(a==null||typeof a=="number"||A.iV(a))return J.bj(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a3)return a.p(0)
if(a instanceof A.ax)return a.bF(!0)
s=$.kj()
for(r=0;r<1;++r){q=s[r].d6(a)
if(q!=null)return q}return"Instance of '"+A.d7(a)+"'"},
kS(){return Date.now()},
kU(){var s,r
if($.hd!==0)return
$.hd=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
if(!!s.dartUseDateNowForTicks)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.hd=1e6
$.he=new A.hc(r)},
Y(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.bA(s,10)|55296)>>>0,s&1023|56320)}throw A.h(A.b6(a,0,1114111,null,null))},
kT(a){var s=a.$thrownJsError
if(s==null)return null
return A.bB(s)},
jZ(a){throw A.h(A.jS(a))},
l(a,b){if(a==null)J.bi(a)
throw A.h(A.jW(a,b))},
jW(a,b){var s,r="index"
if(!A.jL(b))return new A.aw(!0,b,r,null)
s=J.bi(a)
if(b<0||b>=s)return A.iG(b,s,a,r)
return new A.c6(null,null,!0,b,r,"Value not in range")},
jS(a){return new A.aw(!0,a,null,null)},
jU(a){return a},
h(a){return A.Q(a,new Error())},
Q(a,b){var s
if(a==null)a=new A.aG()
b.dartException=a
s=A.mG
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
mG(){return J.bj(this.dartException)},
cx(a,b){throw A.Q(a,b==null?new Error():b)},
cy(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.cx(A.lE(a,b,c),s)},
lE(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.cd("'"+s+"': Cannot "+o+" "+l+k+n)},
w(a){throw A.h(A.W(a))},
aH(a){var s,r,q,p,o,n
a=A.mE(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.c([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.hK(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
hL(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
js(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
iJ(a,b){var s=b==null,r=s?null:b.method
return new A.cR(a,r,s?null:b.receiver)},
aL(a){var s
if(a==null)return new A.fV(a)
if(a instanceof A.bM){s=a.a
return A.aY(a,s==null?A.cs(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.aY(a,a.dartException)
return A.md(a)},
aY(a,b){if(t.V.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
md(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bA(r,16)&8191)===10)switch(q){case 438:return A.aY(a,A.iJ(A.u(s)+" (Error "+q+")",null))
case 445:case 5007:A.u(s)
return A.aY(a,new A.c5())}}if(a instanceof TypeError){p=$.k9()
o=$.ka()
n=$.kb()
m=$.kc()
l=$.kf()
k=$.kg()
j=$.ke()
$.kd()
i=$.ki()
h=$.kh()
g=p.a5(s)
if(g!=null)return A.aY(a,A.iJ(A.G(s),g))
else{g=o.a5(s)
if(g!=null){g.method="call"
return A.aY(a,A.iJ(A.G(s),g))}else if(n.a5(s)!=null||m.a5(s)!=null||l.a5(s)!=null||k.a5(s)!=null||j.a5(s)!=null||m.a5(s)!=null||i.a5(s)!=null||h.a5(s)!=null){A.G(s)
return A.aY(a,new A.c5())}}return A.aY(a,new A.dc(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.c9()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.aY(a,new A.aw(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.c9()
return a},
bB(a){var s
if(a instanceof A.bM)return a.b
if(a==null)return new A.cl(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.cl(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
k3(a){if(a==null)return J.a2(a)
if(typeof a=="object")return A.d6(a)
return J.a2(a)},
mn(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.u(0,a[s],a[r])}return b},
mo(a,b){var s,r=a.length
for(s=0;s<r;++s)b.l(0,a[s])
return b},
lN(a,b,c,d,e,f){t.h.a(a)
switch(A.f(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.h(new A.hQ("Unsupported number of arguments for wrapped closure"))},
dq(a,b){var s=a.$identity
if(!!s)return s
s=A.mj(a,b)
a.$identity=s
return s},
mj(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.lN)},
kB(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.d9().constructor.prototype):Object.create(new A.bl(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.jg(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.kx(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.jg(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
kx(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.h("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.kv)}throw A.h("Error in functionType of tearoff")},
ky(a,b,c,d){var s=A.jf
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
jg(a,b,c,d){if(c)return A.kA(a,b,d)
return A.ky(b.length,d,a,b)},
kz(a,b,c,d){var s=A.jf,r=A.kw
switch(b?-1:a){case 0:throw A.h(new A.d8("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
kA(a,b,c){var s,r
if($.jd==null)$.jd=A.jc("interceptor")
if($.je==null)$.je=A.jc("receiver")
s=b.length
r=A.kz(s,c,a,b)
return r},
j_(a){return A.kB(a)},
kv(a,b){return A.cp(v.typeUniverse,A.au(a.a),b)},
jf(a){return a.a},
kw(a){return a.b},
jc(a){var s,r,q,p=new A.bl("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.h(A.cA("Field name "+a+" not found.",null))},
ip(a){return v.getIsolateTag(a)},
my(a){var s,r,q,p,o,n=A.G($.jX.$1(a)),m=$.io[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.iv[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bx($.jR.$2(a,n))
if(q!=null){m=$.io[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.iv[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.iy(s)
$.io[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.iv[n]=s
return s}if(p==="-"){o=A.iy(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.k4(a,s)
if(p==="*")throw A.h(A.jt(n))
if(v.leafTags[n]===true){o=A.iy(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.k4(a,s)},
k4(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.j4(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
iy(a){return J.j4(a,!1,null,!!a.$iad)},
mA(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.iy(s)
else return J.j4(s,c,null,null)},
mt(){if(!0===$.j2)return
$.j2=!0
A.mu()},
mu(){var s,r,q,p,o,n,m,l
$.io=Object.create(null)
$.iv=Object.create(null)
A.ms()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.k5.$1(o)
if(n!=null){m=A.mA(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
ms(){var s,r,q,p,o,n,m=B.U()
m=A.bA(B.V,A.bA(B.W,A.bA(B.J,A.bA(B.J,A.bA(B.X,A.bA(B.Y,A.bA(B.Z(B.I),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.jX=new A.is(p)
$.jR=new A.it(o)
$.k5=new A.iu(n)},
bA(a,b){return a(b)||b},
li(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.l(b,s)
if(!J.ak(r,b[s]))return!1}return!0},
ml(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
mE(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
aT:function aT(a,b,c){this.a=a
this.b=b
this.c=c},
aU:function aU(a,b,c){this.a=a
this.b=b
this.c=c},
bu:function bu(a){this.a=a},
bG:function bG(a,b){this.a=a
this.$ti=b},
bF:function bF(){},
bH:function bH(a,b,c){this.a=a
this.b=b
this.$ti=c},
bc:function bc(a,b){this.a=a
this.$ti=b},
cf:function cf(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cM:function cM(){},
b2:function b2(a,b){this.a=a
this.$ti=b},
hc:function hc(a){this.a=a},
c8:function c8(){},
hK:function hK(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
c5:function c5(){},
cR:function cR(a,b,c){this.a=a
this.b=b
this.c=c},
dc:function dc(a){this.a=a},
fV:function fV(a){this.a=a},
bM:function bM(a,b){this.a=a
this.b=b},
cl:function cl(a){this.a=a
this.b=null},
a3:function a3(){},
cD:function cD(){},
cE:function cE(){},
da:function da(){},
d9:function d9(){},
bl:function bl(a,b){this.a=a
this.b=b},
d8:function d8(a){this.a=a},
aE:function aE(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
fM:function fM(a){this.a=a},
fQ:function fQ(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
a5:function a5(a,b){this.a=a
this.$ti=b},
b4:function b4(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
af:function af(a,b){this.a=a
this.$ti=b},
ae:function ae(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b3:function b3(a,b){this.a=a
this.$ti=b},
bY:function bY(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
is:function is(a){this.a=a},
it:function it(a){this.a=a},
iu:function iu(a){this.a=a},
ax:function ax(){},
bf:function bf(){},
bt:function bt(){},
lF(a){return a},
bo:function bo(){},
c3:function c3(){},
cU:function cU(){},
bp:function bp(){},
c1:function c1(){},
c2:function c2(){},
cV:function cV(){},
cW:function cW(){},
cX:function cX(){},
cY:function cY(){},
cZ:function cZ(){},
d_:function d_(){},
d0:function d0(){},
c4:function c4(){},
d1:function d1(){},
cg:function cg(){},
ch:function ch(){},
ci:function ci(){},
cj:function cj(){},
iM(a,b){var s=b.c
return s==null?b.c=A.cn(a,"aM",[b.x]):s},
jp(a){var s=a.w
if(s===6||s===7)return A.jp(a.x)
return s===11||s===12},
kX(a){return a.as},
mD(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
cv(a){return A.ib(v.typeUniverse,a,!1)},
mw(a,b){var s,r,q,p,o
if(a==null)return null
s=b.y
r=a.Q
if(r==null)r=a.Q=new Map()
q=b.as
p=r.get(q)
if(p!=null)return p
o=A.aW(v.typeUniverse,a.x,s,0)
r.set(q,o)
return o},
aW(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.aW(a1,s,a3,a4)
if(r===s)return a2
return A.jC(a1,r,!0)
case 7:s=a2.x
r=A.aW(a1,s,a3,a4)
if(r===s)return a2
return A.jB(a1,r,!0)
case 8:q=a2.y
p=A.bz(a1,q,a3,a4)
if(p===q)return a2
return A.cn(a1,a2.x,p)
case 9:o=a2.x
n=A.aW(a1,o,a3,a4)
m=a2.y
l=A.bz(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.iR(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bz(a1,j,a3,a4)
if(i===j)return a2
return A.jD(a1,k,i)
case 11:h=a2.x
g=A.aW(a1,h,a3,a4)
f=a2.y
e=A.ma(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.jA(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bz(a1,d,a3,a4)
o=a2.x
n=A.aW(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.iS(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.h(A.cC("Attempted to substitute unexpected RTI kind "+a0))}},
bz(a,b,c,d){var s,r,q,p,o=b.length,n=A.ic(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.aW(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
mb(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.ic(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.aW(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
ma(a,b,c,d){var s,r=b.a,q=A.bz(a,r,c,d),p=b.b,o=A.bz(a,p,c,d),n=b.c,m=A.mb(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dh()
s.a=q
s.b=o
s.c=m
return s},
c(a,b){a[v.arrayRti]=b
return a},
im(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.mq(s)
return a.$S()}return null},
mv(a,b){var s
if(A.jp(b))if(a instanceof A.a3){s=A.im(a)
if(s!=null)return s}return A.au(a)},
au(a){if(a instanceof A.y)return A.o(a)
if(Array.isArray(a))return A.j(a)
return A.iU(J.bg(a))},
j(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
o(a){var s=a.$ti
return s!=null?s:A.iU(a)},
iU(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.lM(a,s)},
lM(a,b){var s=a instanceof A.a3?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.ls(v.typeUniverse,s.name)
b.$ccache=r
return r},
mq(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.ib(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
mp(a){return A.aJ(A.o(a))},
j1(a){var s=A.im(a)
return A.aJ(s==null?A.au(a):s)},
iY(a){var s
if(a instanceof A.ax)return A.mm(a.$r,a.aX())
s=a instanceof A.a3?A.im(a):null
if(s!=null)return s
if(t.dm.b(a))return J.kn(a).a
if(Array.isArray(a))return A.j(a)
return A.au(a)},
aJ(a){var s=a.r
return s==null?a.r=new A.ia(a):s},
mm(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bY
if(0>=p)return A.l(q,0)
s=A.cp(v.typeUniverse,A.iY(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.l(q,r)
s=A.jF(v.typeUniverse,s,A.iY(q[r]))}return A.cp(v.typeUniverse,s,a)},
av(a){return A.aJ(A.ib(v.typeUniverse,a,!1))},
lL(a){var s=this
s.b=A.m8(s)
return s.b(a)},
m8(a){var s,r,q,p,o
if(a===t.K)return A.lT
if(A.bh(a))return A.lX
s=a.w
if(s===6)return A.lJ
if(s===1)return A.jN
if(s===7)return A.lO
r=A.m7(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bh)){a.f="$i"+q
if(q==="m")return A.lR
if(a===t.B)return A.lQ
return A.lW}}else if(s===10){p=A.ml(a.x,a.y)
o=p==null?A.jN:p
return o==null?A.cs(o):o}return A.lH},
m7(a){if(a.w===8){if(a===t.S)return A.jL
if(a===t.i||a===t.H)return A.lS
if(a===t.N)return A.lV
if(a===t.y)return A.iV}return null},
lK(a){var s=this,r=A.lG
if(A.bh(s))r=A.lw
else if(s===t.K)r=A.cs
else if(A.bC(s)){r=A.lI
if(s===t.h6)r=A.a9
else if(s===t.dk)r=A.bx
else if(s===t.fQ)r=A.iT
else if(s===t.cg)r=A.ay
else if(s===t.cD)r=A.lu
else if(s===t.an)r=A.lv}else if(s===t.S)r=A.f
else if(s===t.N)r=A.G
else if(s===t.y)r=A.as
else if(s===t.H)r=A.v
else if(s===t.i)r=A.aj
else if(s===t.B)r=A.id
s.a=r
return s.a(a)},
lH(a){var s=this
if(a==null)return A.bC(s)
return A.k0(v.typeUniverse,A.mv(a,s),s)},
lJ(a){if(a==null)return!0
return this.x.b(a)},
lW(a){var s,r=this
if(a==null)return A.bC(r)
s=r.f
if(a instanceof A.y)return!!a[s]
return!!J.bg(a)[s]},
lR(a){var s,r=this
if(a==null)return A.bC(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.y)return!!a[s]
return!!J.bg(a)[s]},
lQ(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.y)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
jM(a){if(typeof a=="object"){if(a instanceof A.y)return t.B.b(a)
return!0}if(typeof a=="function")return!0
return!1},
lG(a){var s=this
if(a==null){if(A.bC(s))return a}else if(s.b(a))return a
throw A.Q(A.jI(a,s),new Error())},
lI(a){var s=this
if(a==null||s.b(a))return a
throw A.Q(A.jI(a,s),new Error())},
jI(a,b){return new A.bv("TypeError: "+A.jv(a,A.aa(b,null)))},
jV(a,b,c,d){if(A.k0(v.typeUniverse,a,b))return a
throw A.Q(A.lk("The type argument '"+A.aa(a,null)+"' is not a subtype of the type variable bound '"+A.aa(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
jv(a,b){return A.cK(a)+": type '"+A.aa(A.iY(a),null)+"' is not a subtype of type '"+b+"'"},
lk(a){return new A.bv("TypeError: "+a)},
ai(a,b){return new A.bv("TypeError: "+A.jv(a,b))},
lO(a){var s=this
return s.x.b(a)||A.iM(v.typeUniverse,s).b(a)},
lT(a){return a!=null},
cs(a){if(a!=null)return a
throw A.Q(A.ai(a,"Object"),new Error())},
lX(a){return!0},
lw(a){return a},
jN(a){return!1},
iV(a){return!0===a||!1===a},
as(a){if(!0===a)return!0
if(!1===a)return!1
throw A.Q(A.ai(a,"bool"),new Error())},
iT(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.Q(A.ai(a,"bool?"),new Error())},
aj(a){if(typeof a=="number")return a
throw A.Q(A.ai(a,"double"),new Error())},
lu(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Q(A.ai(a,"double?"),new Error())},
jL(a){return typeof a=="number"&&Math.floor(a)===a},
f(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.Q(A.ai(a,"int"),new Error())},
a9(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.Q(A.ai(a,"int?"),new Error())},
lS(a){return typeof a=="number"},
v(a){if(typeof a=="number")return a
throw A.Q(A.ai(a,"num"),new Error())},
ay(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Q(A.ai(a,"num?"),new Error())},
lV(a){return typeof a=="string"},
G(a){if(typeof a=="string")return a
throw A.Q(A.ai(a,"String"),new Error())},
bx(a){if(typeof a=="string")return a
if(a==null)return a
throw A.Q(A.ai(a,"String?"),new Error())},
id(a){if(A.jM(a))return a
throw A.Q(A.ai(a,"JSObject"),new Error())},
lv(a){if(a==null)return a
if(A.jM(a))return a
throw A.Q(A.ai(a,"JSObject?"),new Error())},
jP(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aa(a[q],b)
return s},
m2(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.jP(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.aa(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
jJ(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.c([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.l(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.l(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.aa(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.aa(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.aa(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.aa(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.aa(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
aa(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.aa(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.aa(a.x,b)+">"
if(l===8){p=A.mc(a.x)
o=a.y
return o.length>0?p+("<"+A.jP(o,b)+">"):p}if(l===10)return A.m2(a,b)
if(l===11)return A.jJ(a,b,null)
if(l===12)return A.jJ(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.l(b,n)
return b[n]}return"?"},
mc(a){var s=A.k6(a)
if(s!=null)return s
return"minified:"+a},
lt(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
ls(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.ib(a,b,!1)
else if(typeof m=="number"){s=m
r=A.co(a,5,"#")
q=A.ic(s)
for(p=0;p<s;++p)q[p]=r
o=A.cn(a,b,q)
n[b]=o
return o}else return m},
lr(a,b){return A.jG(a.tR,b)},
lq(a,b){return A.jG(a.eT,b)},
ib(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.jE(a,null,b,!1)
r.set(b,s)
return s},
cp(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.jE(a,b,c,!0)
q.set(c,r)
return r},
jF(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.iR(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
jE(a,b,c,d){return A.lg(A.la(a,b,c,d))},
aV(a,b){b.a=A.lK
b.b=A.lL
return b},
co(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.ap(null,null)
s.w=b
s.as=c
r=A.aV(a,s)
a.eC.set(c,r)
return r},
jC(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.lo(a,b,r,c)
a.eC.set(r,s)
return s},
lo(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bh(b))if(!(b===t.P||b===t.v))if(s!==6)r=s===7&&A.bC(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.ap(null,null)
q.w=6
q.x=b
q.as=c
return A.aV(a,q)},
jB(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.lm(a,b,r,c)
a.eC.set(r,s)
return s},
lm(a,b,c,d){var s,r
if(d){s=b.w
if(A.bh(b)||b===t.K)return b
else if(s===1)return A.cn(a,"aM",[b])
else if(b===t.P||b===t.v)return t.eH}r=new A.ap(null,null)
r.w=7
r.x=b
r.as=c
return A.aV(a,r)},
lp(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.ap(null,null)
s.w=13
s.x=b
s.as=q
r=A.aV(a,s)
a.eC.set(q,r)
return r},
cm(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
ll(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
cn(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.cm(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.ap(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.aV(a,r)
a.eC.set(p,q)
return q},
iR(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.cm(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.ap(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.aV(a,o)
a.eC.set(q,n)
return n},
jD(a,b,c){var s,r,q="+"+(b+"("+A.cm(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.ap(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.aV(a,s)
a.eC.set(q,r)
return r},
jA(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.cm(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.cm(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.ll(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.ap(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.aV(a,p)
a.eC.set(r,o)
return o},
iS(a,b,c,d){var s,r=b.as+("<"+A.cm(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.ln(a,b,c,r,d)
a.eC.set(r,s)
return s},
ln(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.ic(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.aW(a,b,r,0)
m=A.bz(a,c,r,0)
return A.iS(a,n,m,c!==m)}}l=new A.ap(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.aV(a,l)},
la(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
lg(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.lc(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.jx(a,r,l,k,!1)
else if(q===46)r=A.jx(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.be(a.u,a.e,k.pop()))
break
case 94:k.push(A.lp(a.u,k.pop()))
break
case 35:k.push(A.co(a.u,5,"#"))
break
case 64:k.push(A.co(a.u,2,"@"))
break
case 126:k.push(A.co(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.le(a,k)
break
case 38:A.ld(a,k)
break
case 63:p=a.u
k.push(A.jC(p,A.be(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.jB(p,A.be(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.lb(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.jy(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.lh(a.u,a.e,o)
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
return A.be(a.u,a.e,m)},
lc(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
jx(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.lt(s,o.x)[p]
if(n==null)A.cx('No "'+p+'" in "'+A.kX(o)+'"')
d.push(A.cp(s,o,n))}else d.push(p)
return m},
le(a,b){var s,r=a.u,q=A.jw(a,b),p=b.pop()
if(typeof p=="string")b.push(A.cn(r,p,q))
else{s=A.be(r,a.e,p)
switch(s.w){case 11:b.push(A.iS(r,s,q,a.n))
break
default:b.push(A.iR(r,s,q))
break}}},
lb(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.jw(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.be(p,a.e,o)
q=new A.dh()
q.a=s
q.b=n
q.c=m
b.push(A.jA(p,r,q))
return
case-4:b.push(A.jD(p,b.pop(),s))
return
default:throw A.h(A.cC("Unexpected state under `()`: "+A.u(o)))}},
ld(a,b){var s=b.pop()
if(0===s){b.push(A.co(a.u,1,"0&"))
return}if(1===s){b.push(A.co(a.u,4,"1&"))
return}throw A.h(A.cC("Unexpected extended operation "+A.u(s)))},
jw(a,b){var s=b.splice(a.p)
A.jy(a.u,a.e,s)
a.p=b.pop()
return s},
be(a,b,c){if(typeof c=="string")return A.cn(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.lf(a,b,c)}else return c},
jy(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.be(a,b,c[s])},
lh(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.be(a,b,c[s])},
lf(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.h(A.cC("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.h(A.cC("Bad index "+c+" for "+b.p(0)))},
k0(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.P(a,b,null,c,null)
r.set(c,s)}return s},
P(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bh(d))return!0
s=b.w
if(s===4)return!0
if(A.bh(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.P(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.v){if(q===7)return A.P(a,b,c,d.x,e)
return d===p||d===t.v||q===6}if(d===t.K){if(s===7)return A.P(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.P(a,b.x,c,d,e))return!1
return A.P(a,A.iM(a,b),c,d,e)}if(s===6)return A.P(a,p,c,d,e)&&A.P(a,b.x,c,d,e)
if(q===7){if(A.P(a,b,c,d.x,e))return!0
return A.P(a,b,c,A.iM(a,d),e)}if(q===6)return A.P(a,b,c,p,e)||A.P(a,b,c,d.x,e)
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
if(!A.P(a,j,c,i,e)||!A.P(a,i,e,j,c))return!1}return A.jK(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.jK(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.lP(a,b,c,d,e)}if(o&&q===10)return A.lU(a,b,c,d,e)
return!1},
jK(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.P(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.P(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.P(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.P(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.P(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
lP(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.cp(a,b,r[o])
return A.jH(a,p,null,c,d.y,e)}return A.jH(a,b.y,null,c,d.y,e)},
jH(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.P(a,b[s],d,e[s],f))return!1
return!0},
lU(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.P(a,r[s],c,q[s],e))return!1
return!0},
bC(a){var s=a.w,r=!0
if(!(a===t.P||a===t.v))if(!A.bh(a))if(s!==6)r=s===7&&A.bC(a.x)
return r},
bh(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
jG(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
ic(a){return a>0?new Array(a):v.typeUniverse.sEA},
ap:function ap(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dh:function dh(){this.c=this.b=this.a=null},
ia:function ia(a){this.a=a},
dg:function dg(){},
bv:function bv(a){this.a=a},
l4(){var s,r,q
if(self.scheduleImmediate!=null)return A.mg()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.dq(new A.hN(s),1)).observe(r,{childList:true})
return new A.hM(s,r,q)}else if(self.setImmediate!=null)return A.mh()
return A.mi()},
l5(a){self.scheduleImmediate(A.dq(new A.hO(t.M.a(a)),0))},
l6(a){self.setImmediate(A.dq(new A.hP(t.M.a(a)),0))},
l7(a){A.iO(B.H,t.M.a(a))},
iO(a,b){return A.lj(0,b)},
lj(a,b){var s=new A.i8()
s.c7(a,b)
return s},
m_(a){return new A.dd(new A.T($.L,a.h("T<0>")),a.h("dd<0>"))},
lA(a,b){a.$2(0,null)
b.b=!0
return b.a},
lx(a,b){A.lB(a,b)},
lz(a,b){var s,r,q=b.$ti
q.h("1/?").a(a)
s=a==null?q.c.a(a):a
if(!b.b)b.a.cb(s)
else{r=b.a
if(q.h("aM<1>").b(s))r.bn(s)
else r.br(s)}},
ly(a,b){var s=A.aL(a),r=A.bB(a),q=b.b,p=b.a
if(q)p.aT(new A.am(s,r))
else p.bm(new A.am(s,r))},
lB(a,b){var s,r,q=new A.ie(b),p=new A.ig(b)
if(a instanceof A.T)a.bE(q,p,t.z)
else{s=t.z
if(a instanceof A.T)a.bX(q,p,s)
else{r=new A.T($.L,t.c)
r.a=8
r.c=a
r.bE(q,p,s)}}},
me(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.L.bV(new A.ij(s),t.p,t.S,t.z)},
jz(a,b,c){return 0},
iF(a){var s
if(t.V.b(a)){s=a.gaD()
if(s!=null)return s}return B.a0},
kH(a,b){var s
if(!b.b(null))throw A.h(A.ej(null,"computation","The type parameter is not nullable"))
s=new A.T($.L,b.h("T<0>"))
A.l0(a,new A.fK(null,s,b))
return s},
hU(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.kY()
b.bm(new A.am(new A.aw(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.by(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.ap()
b.aF(o.a)
A.bb(b,p)
return}b.a^=2
A.dp(null,null,b.b,t.M.a(new A.hV(o,b)))},
bb(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.u,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.iX(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.bb(d.a,c)
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
A.iX(j.a,j.b)
return}g=$.L
if(g!==h)$.L=h
else g=null
c=c.c
if((c&15)===8)new A.hZ(q,d,n).$0()
else if(o){if((c&1)!==0)new A.hY(q,j).$0()}else if((c&2)!==0)new A.hX(d,q).$0()
if(g!=null)$.L=g
c=q.c
if(c instanceof A.T){p=q.a.$ti
p=p.h("aM<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aH(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.hU(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.aH(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
m3(a,b){var s
if(t.C.b(a))return b.bV(a,t.z,t.K,t.l)
s=t.D
if(s.b(a))return s.a(a)
throw A.h(A.ej(a,"onError",u.c))},
m0(){var s,r
for(s=$.by;s!=null;s=$.by){$.cu=null
r=s.b
$.by=r
if(r==null)$.ct=null
s.a.$0()}},
m9(){$.iW=!0
try{A.m0()}finally{$.cu=null
$.iW=!1
if($.by!=null)$.j7().$1(A.jT())}},
jQ(a){var s=new A.de(a),r=$.ct
if(r==null){$.by=$.ct=s
if(!$.iW)$.j7().$1(A.jT())}else $.ct=r.b=s},
m6(a){var s,r,q,p=$.by
if(p==null){A.jQ(a)
$.cu=$.ct
return}s=new A.de(a)
r=$.cu
if(r==null){s.b=p
$.by=$.cu=s}else{q=r.b
s.b=q
$.cu=r.b=s
if(q==null)$.ct=s}},
mO(a,b){A.Z(a,"stream",t.K)
return new A.dm(b.h("dm<0>"))},
l0(a,b){var s=$.L
if(s===B.j)return A.iO(a,t.M.a(b))
return A.iO(a,t.M.a(s.bJ(b)))},
iX(a,b){A.m6(new A.ii(a,b))},
jO(a,b,c,d,e){var s,r=$.L
if(r===c)return d.$0()
$.L=c
s=r
try{r=d.$0()
return r}finally{$.L=s}},
m5(a,b,c,d,e,f,g){var s,r=$.L
if(r===c)return d.$1(e)
$.L=c
s=r
try{r=d.$1(e)
return r}finally{$.L=s}},
m4(a,b,c,d,e,f,g,h,i){var s,r=$.L
if(r===c)return d.$2(e,f)
$.L=c
s=r
try{r=d.$2(e,f)
return r}finally{$.L=s}},
dp(a,b,c,d){t.M.a(d)
if(B.j!==c){d=c.bJ(d)
d=d}A.jQ(d)},
hN:function hN(a){this.a=a},
hM:function hM(a,b,c){this.a=a
this.b=b
this.c=c},
hO:function hO(a){this.a=a},
hP:function hP(a){this.a=a},
i8:function i8(){},
i9:function i9(a,b){this.a=a
this.b=b},
dd:function dd(a,b){this.a=a
this.b=!1
this.$ti=b},
ie:function ie(a){this.a=a},
ig:function ig(a){this.a=a},
ij:function ij(a){this.a=a},
aI:function aI(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
ar:function ar(a,b){this.a=a
this.$ti=b},
am:function am(a,b){this.a=a
this.b=b},
fK:function fK(a,b,c){this.a=a
this.b=b
this.c=c},
ba:function ba(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
T:function T(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
hR:function hR(a,b){this.a=a
this.b=b},
hW:function hW(a,b){this.a=a
this.b=b},
hV:function hV(a,b){this.a=a
this.b=b},
hT:function hT(a,b){this.a=a
this.b=b},
hS:function hS(a,b){this.a=a
this.b=b},
hZ:function hZ(a,b,c){this.a=a
this.b=b
this.c=c},
i_:function i_(a,b){this.a=a
this.b=b},
i0:function i0(a){this.a=a},
hY:function hY(a,b){this.a=a
this.b=b},
hX:function hX(a,b){this.a=a
this.b=b},
de:function de(a){this.a=a
this.b=null},
dm:function dm(a){this.$ti=a},
cr:function cr(){},
dl:function dl(){},
i7:function i7(a,b){this.a=a
this.b=b},
ii:function ii(a,b){this.a=a
this.b=b},
iK(a,b){return new A.aE(a.h("@<0>").D(b).h("aE<1,2>"))},
O(a,b,c){return b.h("@<0>").D(c).h("jk<1,2>").a(A.mn(a,new A.aE(b.h("@<0>").D(c).h("aE<1,2>"))))},
X(a,b){return new A.aE(a.h("@<0>").D(b).h("aE<1,2>"))},
bZ(a){return new A.aS(a.h("aS<0>"))},
kP(a,b){return b.h("jm<0>").a(A.mo(a,new A.aS(b.h("aS<0>"))))},
iQ(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
i5(a,b,c){var s=new A.bd(a,b,c.h("bd<0>"))
s.c=a.e
return s},
bP(a,b){var s=J.H(a)
if(s.j())return s.gn()
return null},
ao(a,b,c){var s=A.iK(b,c)
a.a3(0,new A.fR(s,b,c))
return s},
jl(a,b,c){var s=A.iK(b,c)
s.E(0,a)
return s},
fT(a){var s,r
if(A.j3(a))return"{...}"
s=new A.br("")
try{r={}
B.a.l($.ag,a)
s.a+="{"
r.a=!0
a.a3(0,new A.fU(r,s))
s.a+="}"}finally{if(0>=$.ag.length)return A.l($.ag,-1)
$.ag.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
aS:function aS(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dk:function dk(a){this.a=a
this.c=this.b=null},
bd:function bd(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
fR:function fR(a,b,c){this.a=a
this.b=b
this.c=c},
A:function A(){},
C:function C(){},
fS:function fS(a){this.a=a},
fU:function fU(a,b){this.a=a
this.b=b},
cq:function cq(){},
bn:function bn(){},
cc:function cc(){},
bq:function bq(){},
ck:function ck(){},
bw:function bw(){},
m1(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aL(r)
q=A.jh(String(s))
throw A.h(q)}q=A.ih(p)
return q},
ih(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.di(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.ih(a[s])
return a},
jj(a,b,c){return new A.bW(a,b)},
lD(a){return a.F()},
l8(a,b){return new A.i2(a,[],A.mk())},
l9(a,b,c){var s,r=new A.br(""),q=A.l8(r,b)
q.aN(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
di:function di(a,b){this.a=a
this.b=b
this.c=null},
dj:function dj(a){this.a=a},
cF:function cF(){},
cH:function cH(){},
bW:function bW(a,b){this.a=a
this.b=b},
cS:function cS(a,b){this.a=a
this.b=b},
fN:function fN(){},
fP:function fP(a){this.b=a},
fO:function fO(a){this.a=a},
i3:function i3(){},
i4:function i4(a,b){this.a=a
this.b=b},
i2:function i2(a,b,c){this.c=a
this.a=b
this.b=c},
k_(a){var s=A.kV(a,null)
if(s!=null)return s
throw A.h(A.jh(a))},
kD(a,b){a=A.Q(a,new Error())
if(a==null)a=A.cs(a)
a.stack=b.p(0)
throw a},
cT(a,b,c,d){var s,r=c?J.ji(a,d):J.kM(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
c_(a,b,c){var s,r=A.c([],c.h("r<0>"))
for(s=J.H(a);s.j();)B.a.l(r,c.a(s.gn()))
if(b)return r
r.$flags=1
return r},
p(a,b){var s,r
if(Array.isArray(a))return A.c(a.slice(0),b.h("r<0>"))
s=A.c([],b.h("r<0>"))
for(r=J.H(a);r.j();)B.a.l(s,r.gn())
return s},
aP(a,b){var s=A.c_(a,!1,b)
s.$flags=3
return s},
jr(a,b,c){var s=J.H(b)
if(!s.j())return a
if(c.length===0){do a+=A.u(s.gn())
while(s.j())}else{a+=A.u(s.gn())
while(s.j())a=a+c+A.u(s.gn())}return a},
kY(){return A.bB(new Error())},
kC(a,b,c){var s,r
for(s=0;s<4;++s){r=a[s]
if(r.b===b)return r}throw A.h(A.ej(b,"name","No enum value with that name"))},
cK(a){if(typeof a=="number"||A.iV(a)||a==null)return J.bj(a)
if(typeof a=="string")return JSON.stringify(a)
return A.jo(a)},
kE(a,b){A.Z(a,"error",t.K)
A.Z(b,"stackTrace",t.l)
A.kD(a,b)},
cC(a){return new A.cB(a)},
cA(a,b){return new A.aw(!1,null,b,a)},
ej(a,b,c){return new A.aw(!0,a,b,c)},
b6(a,b,c,d,e){return new A.c6(b,c,!0,a,d,"Invalid value")},
kW(a,b,c){if(0>a||a>c)throw A.h(A.b6(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.h(A.b6(b,a,c,"end",null))
return b}return c},
c7(a,b){if(a<0)throw A.h(A.b6(a,0,null,b,null))
return a},
iG(a,b,c,d){return new A.cL(b,!0,a,d,"Index out of range")},
b9(a){return new A.cd(a)},
jt(a){return new A.db(a)},
jq(a){return new A.ca(a)},
W(a){return new A.cG(a)},
jh(a){return new A.aB(a)},
kL(a,b,c){var s,r
if(A.j3(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.c([],t.s)
B.a.l($.ag,a)
try{A.lY(a,s)}finally{if(0>=$.ag.length)return A.l($.ag,-1)
$.ag.pop()}r=A.jr(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
iH(a,b,c){var s,r
if(A.j3(a))return b+"..."+c
s=new A.br(b)
B.a.l($.ag,a)
try{r=s
r.a=A.jr(r.a,a,", ")}finally{if(0>=$.ag.length)return A.l($.ag,-1)
$.ag.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
lY(a,b){var s,r,q,p,o,n,m,l=a.gB(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.j())return
s=A.u(l.gn())
B.a.l(b,s)
k+=s.length+2;++j}if(!l.j()){if(j<=5)return
if(0>=b.length)return A.l(b,-1)
r=b.pop()
if(0>=b.length)return A.l(b,-1)
q=b.pop()}else{p=l.gn();++j
if(!l.j()){if(j<=4){B.a.l(b,A.u(p))
return}r=A.u(p)
if(0>=b.length)return A.l(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gn();++j
for(;l.j();p=o,o=n){n=l.gn();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.l(b,-1)
k-=b.pop().length+2;--j}B.a.l(b,"...")
return}}q=A.u(p)
r=A.u(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.l(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.l(b,m)
B.a.l(b,q)
B.a.l(b,r)},
iL(a,b,c,d){var s
if(B.o===c){s=J.a2(a)
b=J.a2(b)
return A.hB(A.aF(A.aF($.dr(),s),b))}if(B.o===d){s=J.a2(a)
b=J.a2(b)
c=J.a2(c)
return A.hB(A.aF(A.aF(A.aF($.dr(),s),b),c))}s=J.a2(a)
b=J.a2(b)
c=J.a2(c)
d=J.a2(d)
d=A.hB(A.aF(A.aF(A.aF(A.aF($.dr(),s),b),c),d))
return d},
kR(a){var s,r,q=$.dr()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.w)(a),++r)q=A.aF(q,J.a2(a[r]))
return A.hB(q)},
cI:function cI(){},
df:function df(){},
B:function B(){},
cB:function cB(a){this.a=a},
aG:function aG(){},
aw:function aw(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
c6:function c6(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
cL:function cL(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
cd:function cd(a){this.a=a},
db:function db(a){this.a=a},
ca:function ca(a){this.a=a},
cG:function cG(a){this.a=a},
d3:function d3(){},
c9:function c9(){},
hQ:function hQ(a){this.a=a},
aB:function aB(a){this.a=a},
b:function b(){},
a7:function a7(a,b,c){this.a=a
this.b=b
this.$ti=c},
a8:function a8(){},
y:function y(){},
dn:function dn(){},
hA:function hA(){this.b=this.a=0},
br:function br(a){this.a=a},
ja(a,b,c,d){var s,r,q,p,o,n=t.N,m=t.S,l=A.c([],t.aD),k=a.gaz(),j=a.gaz(),i=a.gaz(),h=A.jl(a.gaz().r,m,m),g=A.X(m,m)
for(s=a.gU(),r=J.H(s.a),s=new A.S(r,s.b,s.$ti.h("S<1>"));s.j();){q=r.gn()
g.u(0,q.a,q.d)}s=A.X(n,t.J)
for(r=d.length,p=0;p<d.length;d.length===r||(0,A.w)(d),++p){o=d[p]
s.u(0,o.a,o)}return new A.aA(a,b,c,k.b,j.c,i.d,h,g,s,A.bZ(n),A.bZ(n),A.bZ(n),A.bZ(m),A.bZ(m),l)},
aR:function aR(a,b,c){this.a=a
this.b=b
this.c=c},
ek:function ek(a){this.a=a},
aA:function aA(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
dv:function dv(){},
dw:function dw(){},
dT:function dT(a){this.a=a},
dL:function dL(a,b){this.a=a
this.b=b},
dM:function dM(){},
dN:function dN(a){this.a=a},
dO:function dO(a){this.a=a},
dP:function dP(a){this.a=a},
dQ:function dQ(a){this.a=a},
dz:function dz(a){this.a=a},
dA:function dA(a,b){this.a=a
this.b=b},
dB:function dB(a){this.a=a},
dC:function dC(){},
dD:function dD(a){this.a=a},
dE:function dE(){},
dF:function dF(a){this.a=a},
dG:function dG(a){this.a=a},
dH:function dH(a){this.a=a},
dK:function dK(a,b,c){this.a=a
this.b=b
this.c=c},
dI:function dI(a){this.a=a},
dJ:function dJ(a){this.a=a},
dR:function dR(){},
dS:function dS(){},
dx:function dx(){},
dy:function dy(){},
dU:function dU(a){this.a=a},
dV:function dV(){},
dW:function dW(a){this.a=a},
dX:function dX(a){this.a=a},
ac(a){var s=a.e
if(s===2)s=1000
else s=s===1?30:0
return a.w*3+a.r*0.35+a.f*0.15+a.x*1.5-a.y*2+s},
at(a,b){var s=b?a.x*0.75:0,r=a.e
if(r===1)r=30
else r=r===2?-200:0
return a.w*3+a.r*0.35+a.f*0.15-a.y*2-s+r},
jY(a,b){var s=a.gaJ(),r=a.gO(),q=b.b.i(0,"soldierPower")
q.toString
return s*(a.w+r*B.b.k(q))+B.a.H(a.ax,0,new A.iq(b,a),t.H)},
ir(a,b,c,d){var s,r=b.b,q=r.i(0,"soldierHp")
q.toString
q=B.b.k(q)
s=b.b2(a.w,c,!1)
r=r.i(0,"soldierPower")
r.toString
return(a.f+d*q)*(s+d*B.b.k(r))*(1+a.ay/1000)},
b1:function b1(a,b){this.a=a
this.b=b},
bE:function bE(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
em:function em(a,b,c){this.a=a
this.b=b
this.c=c},
en:function en(){},
eo:function eo(){},
iq:function iq(a,b){this.a=a
this.b=b},
cz:function cz(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4){var _=this
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
aq:function aq(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eq:function eq(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.r=_.f=_.e=$
_.w=null
_.x=e},
ez:function ez(a){this.a=a},
eA:function eA(){},
eB:function eB(){},
eM:function eM(){},
eQ:function eQ(){},
eR:function eR(a){this.a=a},
eS:function eS(a){this.a=a},
eT:function eT(a){this.a=a},
eU:function eU(a,b){this.a=a
this.b=b},
eV:function eV(a,b){this.a=a
this.b=b},
eW:function eW(a){this.a=a},
eC:function eC(a,b){this.a=a
this.b=b},
eD:function eD(a){this.a=a},
eE:function eE(){},
eF:function eF(a,b,c){this.a=a
this.b=b
this.c=c},
eG:function eG(a,b,c){this.a=a
this.b=b
this.c=c},
eH:function eH(a){this.a=a},
eI:function eI(){},
eJ:function eJ(a){this.a=a},
eK:function eK(a){this.a=a},
eL:function eL(){},
eN:function eN(a){this.a=a},
eO:function eO(){},
eP:function eP(a){this.a=a},
ex:function ex(a){this.a=a},
ey:function ey(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ew:function ew(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
es:function es(a){this.a=a},
et:function et(a){this.a=a},
eu:function eu(a){this.a=a},
ev:function ev(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
er:function er(a){this.a=a},
a4:function a4(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
eX:function eX(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fH:function fH(a,b){this.a=a
this.b=b},
fI:function fI(a){this.a=a},
fG:function fG(a){this.a=a},
fJ:function fJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fE:function fE(){},
fD:function fD(){},
fF:function fF(){},
fC:function fC(){},
eY:function eY(){},
eZ:function eZ(){},
f_:function f_(){},
fa:function fa(){},
fl:function fl(a){this.a=a},
fn:function fn(){},
fo:function fo(){},
fp:function fp(a){this.a=a},
fq:function fq(){},
fr:function fr(a){this.a=a},
fs:function fs(a){this.a=a},
f0:function f0(){},
f1:function f1(a){this.a=a},
ft:function ft(a,b){this.a=a
this.b=b},
f2:function f2(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
f3:function f3(a,b){this.a=a
this.b=b},
f4:function f4(){},
f5:function f5(a){this.a=a},
f6:function f6(a){this.a=a},
f7:function f7(a,b,c){this.a=a
this.b=b
this.c=c},
f8:function f8(a){this.a=a},
f9:function f9(a,b,c){this.a=a
this.b=b
this.c=c},
fb:function fb(a){this.a=a},
fc:function fc(){},
fd:function fd(){},
fe:function fe(){},
ff:function ff(a,b){this.a=a
this.b=b},
fg:function fg(){},
fh:function fh(a){this.a=a},
fi:function fi(a){this.a=a},
fj:function fj(a){this.a=a},
fk:function fk(){},
fm:function fm(a){this.a=a},
fz:function fz(a){this.a=a},
fA:function fA(a){this.a=a},
fB:function fB(){},
fu:function fu(){},
fv:function fv(a){this.a=a},
fw:function fw(){},
fx:function fx(a){this.a=a},
fy:function fy(a){this.a=a},
e7(a){var s,r=a.length
if(0>=r)return A.l(a,0)
s=A.v(a[0])
if(1>=r)return A.l(a,1)
return new A.J(s,A.v(a[1]))},
J:function J(a,b){this.a=a
this.b=b},
e6:function e6(a){this.a=a},
j9(c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9=A.G(c3.i(0,"id")),b0=A.f(c3.i(0,"c")),b1=A.f(c3.i(0,"home")),b2=A.f(c3.i(0,"o")),b3=A.f(c3.i(0,"t")),b4=A.v(c3.i(0,"hp")),b5=A.f(c3.i(0,"max")),b6=A.f(c3.i(0,"a")),b7=A.f(c3.i(0,"p")),b8=A.f(c3.i(0,"pay")),b9=t.j,c0=A.e7(b9.a(c3.i(0,"xy"))),c1=A.e7(b9.a(c3.i(0,"v"))),c2=A.f(c3.i(0,"s"))
if(!(c2>=0&&c2<8))return A.l(B.L,c2)
c2=B.L[c2]
s=A.c([],t.n)
for(r=b9.a(c3.i(0,"troops")),q=r.length,p=0;p<r.length;r.length===q||(0,A.w)(r),++p)s.push(A.v(r[p]))
r=t.R
q=t.S
o=A.c_(r.a(c3.i(0,"w")),!0,q)
n=A.v(c3.i(0,"m"))
m=A.v(c3.i(0,"due"))
l=c3.i(0,"to")==null?null:A.e7(b9.a(c3.i(0,"to")))
k=A.a9(c3.i(0,"target"))
j=A.v(c3.i(0,"return"))
i=A.as(c3.i(0,"dispatch"))
h=A.as(c3.i(0,"move"))
g=A.as(c3.i(0,"dismiss"))
f=A.as(c3.i(0,"upgrade"))
e=A.as(c3.i(0,"retreat"))
d=A.as(c3.i(0,"marked"))
c=A.G(c3.i(0,"rev"))
b=A.f(c3.i(0,"orderRev"))
a=A.bx(c3.i(0,"opponent"))
a0=A.f(c3.i(0,"clashes"))
a1=A.v(c3.i(0,"received"))
a2=A.v(c3.i(0,"dealt"))
a3=A.as(c3.i(0,"opening"))
a4=A.as(c3.i(0,"weaponReady"))
a5=A.c([],t._)
for(r=J.H(r.a(c3.i(0,"returnPath")));r.j();){a6=b9.a(r.gn())
a7=a6.length
if(0>=a7)return A.l(a6,0)
a8=A.v(a6[0])
if(1>=a7)return A.l(a6,1)
a5.push(new A.J(a8,A.v(a6[1])))}b9=A.a9(c3.i(0,"regionCity"))
r=A.a9(c3.i(0,"salaryPaidMonth"))
if(r==null)r=-1
return new A.q(a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,c0,c1,c2,A.aP(s,t.i),A.aP(o,q),n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,b9,r)},
ko(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=A.f(a2.i(0,"id")),d=A.f(a2.i(0,"c")),c=A.f(a2.i(0,"native")),b=A.f(a2.i(0,"level")),a=t.j,a0=A.e7(a.a(a2.i(0,"xy"))),a1=A.c([],t._)
for(s=a.a(a2.i(0,"outline")),r=s.length,q=0;q<s.length;s.length===r||(0,A.w)(s),++q){p=a.a(s[q])
o=p.length
if(0>=o)return A.l(p,0)
n=A.v(p[0])
if(1>=o)return A.l(p,1)
a1.push(new A.J(n,A.v(p[1])))}a=A.f(a2.i(0,"income"))
s=A.f(a2.i(0,"poor"))
r=A.f(a2.i(0,"cap"))
p=A.f(a2.i(0,"recruitCap"))
o=A.as(a2.i(0,"recruit"))
n=A.G(a2.i(0,"rev"))
m=A.f(a2.i(0,"baseIncome"))
l=A.a9(a2.i(0,"initial"))
k=A.f(a2.i(0,"wins"))
j=A.bx(a2.i(0,"attacker"))
i=A.bx(a2.i(0,"defender"))
h=A.G(a2.i(0,"stage"))
g=A.v(a2.i(0,"next"))
f=A.iT(a2.i(0,"fallen"))
return new A.U(e,d,c,b,a0,new A.e6(a1),a,s,r,p,m,o,n,l,k,j,i,h,g,f===!0,A.v(a2.i(0,"danger")))},
kp(a){var s,r,q,p=A.f(a.i(0,"id")),o=A.f(a.i(0,"gold")),n=A.f(a.i(0,"reserves")),m=A.f(a.i(0,"capacity")),l=A.f(a.i(0,"salary")),k=A.f(a.i(0,"poor")),j=t.S,i=A.X(j,j)
for(s=t.f,r=s.a(a.i(0,"stock")).gaf(),r=r.gB(r);r.j();){q=r.gn()
i.u(0,A.k_(A.G(q.a)),A.f(q.b))}r=A.X(j,j)
for(s=s.a(a.i(0,"hate")).gaf(),s=s.gB(s);s.j();){q=s.gn()
r.u(0,A.k_(A.G(q.a)),A.f(q.b))}return new A.b_(p,o,n,m,l,k,A.ep(i,j,j),A.ep(r,j,j))},
kq(a){var s,r,q,p,o,n,m=A.f(a.i(0,"country")),l=A.f(a.i(0,"tick")),k=A.v(a.i(0,"month")),j=A.c([],t.Y)
for(s=t.R,r=J.H(s.a(a.i(0,"cities"))),q=t.f,p=t.N,o=t.z;r.j();)j.push(A.ko(A.ao(q.a(r.gn()),p,o)))
r=A.c([],t.e)
for(n=J.H(s.a(a.i(0,"heroes")));n.j();)r.push(A.j9(A.ao(q.a(n.gn()),p,o)))
n=A.c([],t.eu)
for(s=J.H(s.a(a.i(0,"countries")));s.j();)n.push(A.kp(A.ao(q.a(s.gn()),p,o)))
s=A.f(a.i(0,"pool"))
q=A.f(a.i(0,"salary"))
p=A.a9(a.i(0,"year"))
if(p==null)p=1
o=A.a9(a.i(0,"monthIndex"))
if(o==null)o=0
return new A.dZ(m,l,p,o,k,A.aP(j,t.q),A.aP(r,t.r),A.aP(n,t.t),s,q)},
ah:function ah(a,b){this.a=a
this.b=b},
q:function q(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7){var _=this
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
_.p4=b7},
du:function du(){},
dt:function dt(){},
U:function U(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1){var _=this
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
_.db=a1},
b_:function b_(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
dZ:function dZ(a,b,c,d,e,f,g,h,i,j){var _=this
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
e4:function e4(a){this.a=a},
e5:function e5(a){this.a=a},
e1:function e1(a,b){this.a=a
this.b=b},
e0:function e0(a){this.a=a},
e2:function e2(){},
e3:function e3(a){this.a=a},
e_:function e_(a){this.a=a},
iZ(a,b,c){var s,r,q=null,p=a.as
if(p===B.f||p===B.e||p===B.t)return q
s=c.y.i(0,a.a)
p=s==null
if((p?q:s.b)==="expedition")p=p?q:s.d
else p=a.cx
r=b.L(p)
return r!=null&&r.b!==a.b?r:q},
mf(a,b,c,d){var s,r,q=A.iZ(a,b,c)
if(q==null)return!1
s=a.as
r=!0
if(s!==B.w)if(s!==B.C){s=a.z
s=q.f.aj(s).I(s)<=d.r.fx}else s=r
else s=r
return s},
d2(a,b,c,d,e){var s=B.a.J(a.f,new A.fX(e,a))?e:null
s=new A.fW(a,b,c,s,d,A.X(t.S,t.bd))
s.c6(a,b,c,d,e)
return s},
fW:function fW(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fX:function fX(a,b){this.a=a
this.b=b},
fY:function fY(){},
h_:function h_(a){this.a=a},
fZ:function fZ(a){this.a=a},
d5:function d5(a,b){this.a=a
this.b=b},
h0:function h0(a,b,c){this.a=a
this.b=b
this.c=c},
h3:function h3(a,b){this.a=a
this.b=b},
h4:function h4(){},
h5:function h5(a){this.a=a},
h6:function h6(){},
h7:function h7(a){this.a=a},
h8:function h8(a){this.a=a},
h9:function h9(a){this.a=a},
ha:function ha(){},
hb:function hb(){},
h1:function h1(){},
h2:function h2(a){this.a=a},
ku(a){var s,r,q,p,o,n,m,l=A.G(a.i(0,"hero")),k=A.G(a.i(0,"role")),j=A.f(a.i(0,"deadline")),i=A.f(a.i(0,"commit")),h=A.a9(a.i(0,"city")),g=A.bx(a.i(0,"enemy")),f=A.c([],t._)
for(s=J.H(t.R.a(a.i(0,"points"))),r=t.j;s.j();){q=r.a(s.gn())
p=q.length
if(0>=p)return A.l(q,0)
o=A.v(q[0])
if(1>=p)return A.l(q,1)
f.push(new A.J(o,A.v(q[1])))}s=A.f(a.i(0,"leg"))
r=A.f(a.i(0,"gold"))
q=A.as(a.i(0,"slot"))
p=A.G(a.i(0,"reason"))
o=A.f(a.i(0,"order"))
n=A.a9(a.i(0,"targetCountry"))
m=A.iT(a.i(0,"attrition"))
return new A.ab(l,k,p,h,n,m===!0,g,f,s,j,i,r,q,o)},
kr(a){var s,r,q,p,o,n,m,l,k,j,i
if(!J.ak(a.i(0,"protocol"),1))throw A.h(B.a3)
s=A.G(a.i(0,"session"))
r=A.f(a.i(0,"id"))
q=A.G(a.i(0,"rules"))
p=A.G(a.i(0,"map"))
o=t.f
n=t.N
m=t.z
l=A.kq(A.ao(o.a(a.i(0,"observation")),n,m))
k=A.f(a.i(0,"deadline"))
j=A.c([],t.m)
for(i=J.H(t.R.a(a.i(0,"tasks")));i.j();)j.push(A.ku(A.ao(o.a(i.gn()),n,m)))
o=A.f(a.i(0,"seed"))
n=A.f(a.i(0,"priority"))
m=A.f(a.i(0,"idle"))
i=A.bx(a.i(0,"stage"))
if(i==null)i="full"
return new A.e9(s,q,p,r,k,o,n,m,A.kC(B.ae,i,t.a9),A.a9(a.i(0,"offensiveCountry")),A.a9(a.i(0,"offensiveCity")),l,j)},
jb(a,b,c,d){var s=a.Q
return new A.e8(a.a,a.b,a.c,a.d,s.a,s.b,a.e,d,b,c)},
az:function az(a,b){this.a=a
this.b=b},
al:function al(a,b){this.a=a
this.b=b},
x:function x(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
ab:function ab(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var _=this
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
_.at=n},
M:function M(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bI:function bI(a,b,c,d,e,f,g,h,i,j){var _=this
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
e9:function e9(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
e8:function e8(a,b,c,d,e,f,g,h,i,j){var _=this
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
ik(a7,a8,a9,b0,b1,b2,b3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="soldierLimit",a2="soldierPower",a3="soldierHp",a4=a9.A(a8.a),a5=A.j(a4).h("N<1>"),a6=A.a1(new A.N(a4,a5),0,A.Z(a8.ga9(),"count",t.S),a5.h("k.E")).a7(0)
a5=b0.cA(a7.w,!1)
a4=b0.b
s=a4.i(0,a1)
s.toString
s=B.b.k(s)
r=a4.i(0,a2)
r.toString
q=a5+s*B.b.k(r)
p=B.a.al(a9.w,new A.il(a8)).c
for(a5=a8.cy,s=a8.at,r=a8.ax,o=s==null,n=a8.d,m=t.a,l=1,k=1,j=0,i=0;i<a6.length;++i){h=a6[i]
g=a4.i(0,a1)
g.toString
f=Math.min(B.b.k(g),p+h.gO())
p=Math.max(0,p-(f-h.gO()))
if(o)g=n
else{g=a5?1:0
g=B.c.v(s-r-g,0,5)}g=Math.max(1,g-i)
e=a4.i(0,a1)
e.toString
e=B.b.k(e)
d=b1.cG(a7,h,g,!1,f,i<b2.length?A.c([b2[i]],m):B.d,!0,e)
l=Math.min(l,d.b)
k=Math.min(k,d.c)
if(o)g=n
else{g=a5?1:0
g=B.c.v(s-r-g,0,5)}g=b0.b2(h.w,Math.max(1,g-i),!1)
e=a4.i(0,a2)
e.toString
c=(g+f*B.b.k(e))/Math.max(1,q)
e=a4.i(0,a3)
e.toString
j+=(h.f+f*B.b.k(e))*c*c}for(a5=b0.f,s=b0.r,r=s.k2,b=0,i=0;o=b2.length,i<Math.min(o,a6.length);++i){if(!(i<o))return A.l(b2,i)
a=a5.i(0,b2[i])
if(a!=null){o=Math.max(0,a.c-a.d)
b+=o*(i===0?1:r)}}a5=a7.f
r=a4.i(0,a1)
r.toString
r=B.b.k(r)
a4=a4.i(0,a3)
a4.toString
a0=Math.max(1,B.b.b4(j/Math.max(1,(a5+r*B.b.k(a4)+b)*0.85)))
if(a6.length!==0&&J.iE(b2)&&l<s.dx)return new A.aU(l,0,k)
a4=s.ay
if(a0>a4)return new A.aU(l,0,k)
r=a6.length
o=r===0
if(!o)a5=r===1&&n<=2&&a5>=a7.r*0.8&&l>s.k3||l>s.k1+Math.max(0,r-1)*0.025-b3
else a5=!0
if(a5)return new A.aU(l,l>=s.dx||o?a0:Math.max(2,a0),k)
return new A.aU(l,r>1&&k>s.k1&&l>-0.08?Math.min(a4,r):0,k)},
il:function il(a){this.a=a},
hf:function hf(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hh:function hh(a){this.a=a},
hg:function hg(a,b,c){this.a=a
this.b=b
this.c=c},
hi:function hi(a){this.a=a},
hj:function hj(a,b){this.a=a
this.b=b},
hk:function hk(){},
hr:function hr(){},
hs:function hs(){},
ht:function ht(a){this.a=a},
hu:function hu(){},
hv:function hv(a,b,c){this.a=a
this.b=b
this.c=c},
hw:function hw(a,b,c){this.a=a
this.b=b
this.c=c},
hx:function hx(a){this.a=a},
hy:function hy(){},
hl:function hl(){},
hm:function hm(){},
hn:function hn(a,b,c){this.a=a
this.b=b
this.c=c},
ho:function ho(a,b,c){this.a=a
this.b=b
this.c=c},
hp:function hp(a,b,c){this.a=a
this.b=b
this.c=c},
hq:function hq(){},
bk:function bk(a,b,c){this.a=a
this.b=b
this.d=c},
ea:function ea(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eb:function eb(){},
ec:function ec(a,b,c){this.a=a
this.b=b
this.c=c},
ed:function ed(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ee:function ee(a,b,c){this.a=a
this.b=b
this.c=c},
ef:function ef(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ks(a,b,c,d,e,f,g){var s,r,q,p,o=A.ep(e,t.N,t.H),n=t.S,m=A.aP(d,n),l=t.i,k=A.aP(b,l)
l=A.aP(a,l)
s=t.z
s=A.X(s,s)
for(r=g.length,q=0;q<g.length;g.length===r||(0,A.w)(g),++q){p=g[q]
s.u(0,p.a,p)}return new A.eg(f,o,m,k,l,A.ep(s,n,t.o),c)},
kt(b8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=A.G(b8.i(0,"version")),b1=t.f,b2=t.N,b3=A.ao(b1.a(b8.i(0,"values")),b2,t.H),b4=t.R,b5=A.c_(b4.a(b8.i(0,"upgrades")),!0,t.S),b6=t.n,b7=A.c([],b6)
for(s=J.H(b4.a(b8.i(0,"movement")));s.j();)b7.push(A.v(s.gn()))
b6=A.c([],b6)
for(s=J.H(b4.a(b8.i(0,"field")));s.j();)b6.push(A.v(s.gn()))
s=A.c([],t.W)
for(b4=J.H(b4.a(b8.i(0,"weapons"))),r=t.j;b4.j();){q=r.a(b4.gn())
p=q.length
if(0>=p)return A.l(q,0)
o=A.f(q[0])
if(1>=p)return A.l(q,1)
n=A.f(q[1])
if(2>=p)return A.l(q,2)
m=A.f(q[2])
if(3>=p)return A.l(q,3)
l=A.f(q[3])
if(4>=p)return A.l(q,4)
k=A.f(q[4])
if(5>=p)return A.l(q,5)
j=A.as(q[5])
if(6>=p)return A.l(q,6)
s.push(new A.V(o,n,m,l,k,j,A.v(q[6])))}b1=A.ao(b1.a(b8.i(0,"tuning")),b2,t.z)
b2=A.v(b1.i(0,"interval"))
b4=A.ay(b1.i(0,"resourceInterval"))
if(b4==null)b4=30
r=A.a9(b1.i(0,"cashBuffer"))
if(r==null)r=12
q=A.ay(b1.i(0,"payrollRatio"))
if(q==null)q=0.5
p=A.v(b1.i(0,"threat"))
o=A.v(b1.i(0,"urgent"))
n=A.v(b1.i(0,"margin"))
m=A.v(b1.i(0,"commit"))
l=A.a9(b1.i(0,"rearExtra"))
if(l==null)l=1
k=A.f(b1.i(0,"candidates"))
j=A.f(b1.i(0,"assessments"))
i=A.f(b1.i(0,"routes"))
h=A.f(b1.i(0,"plans"))
g=A.f(b1.i(0,"commands"))
f=A.f(b1.i(0,"team"))
e=A.a9(b1.i(0,"fronts"))
if(e==null)e=2
d=A.a9(b1.i(0,"singleFrontMonths"))
if(d==null)d=12
c=A.ay(b1.i(0,"splitForce"))
if(c==null)c=2.25
b=A.ay(b1.i(0,"splitAdvantage"))
if(b==null)b=0.3
a=A.ay(b1.i(0,"arrivalSpread"))
if(a==null)a=20
a0=A.ay(b1.i(0,"expeditionSeconds"))
if(a0==null)a0=900
a1=A.ay(b1.i(0,"assaultCommitDistance"))
if(a1==null)a1=64
a2=A.ay(b1.i(0,"recallCriticalMargin"))
if(a2==null)a2=0.25
a3=A.a9(b1.i(0,"attritionCombat"))
if(a3==null)a3=8
a4=A.ay(b1.i(0,"attritionGain"))
if(a4==null)a4=0.06
a5=A.f(b1.i(0,"targets"))
a6=A.f(b1.i(0,"slice"))
a7=A.v(b1.i(0,"advantage"))
a8=A.v(b1.i(0,"expansion"))
a9=A.v(b1.i(0,"credit"))
return A.ks(b6,b7,new A.cz(b2,p,o,n,b4,r,q,m,A.v(b1.i(0,"age")),l,k,j,i,h,g,f,a5,a6,e,d,c,b,a,a0,a1,a2,a3,a4,a7,a9,a8,A.f(b1.i(0,"timeout")),A.f(b1.i(0,"restarts")),A.v(b1.i(0,"stagnation"))),b5,b3,b0,s)},
V:function V(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
eg:function eg(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
dY:function dY(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ei:function ei(a,b,c){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=0
_.r=c},
bD(a,b,c,d,e){var s,r,q,p,o,n,m=a.a,l=c.A(m),k=A.j(l).h("N<1>"),j=A.a1(new A.N(l,k),0,A.Z(a.ga9(),"count",t.S),k.h("k.E")).a7(0)
if(j.length===0)s=0
else{l=A.j(j)
s=new A.R(j,l.h("i(1)").a(new A.iz()),l.h("R<1,i>")).a6(0,B.G)}l=c.f
k=A.j(l)
r=new A.d(l,k.h("e(1)").a(new A.iA(a)),k.h("d<1>")).gm(0)
k=c.r
l=A.j(k)
q=new A.d(k,l.h("e(1)").a(new A.iB(a)),l.h("d<1>")).H(0,0,new A.iC(),t.i)
l=c.gaz().w.i(0,a.b)
p=Math.min(0.5,(l==null?0:l)*0.005)
o=r>=3?Math.min(40,r*6):0
n=e^m*7919
n^=n<<13
n^=n>>>17
if(a.c===b.b)m=1
else{m=d.b.i(0,"foreignYield")
m.toString}return 160+a.z*m*2+q+o+p*30-s*0.5-a.d*8-b.z.I(a.e)*0.03+((n^n<<5)&65535)/65536*0.000001},
iz:function iz(){},
iA:function iA(a){this.a=a},
iB:function iB(a){this.a=a},
iC:function iC(){},
a0:function a0(a,b,c){this.a=a
this.b=b
this.c=c},
an:function an(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.d=c
_.f=d
_.r=e},
el:function el(){},
hC:function hC(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hD:function hD(a){this.a=a},
hE:function hE(){},
hF:function hF(a){this.a=a},
hG:function hG(a){this.a=a},
hH:function hH(a){this.a=a},
hI:function hI(a){this.a=a},
hJ:function hJ(){},
eh:function eh(a){var _=this
_.a=a
_.d=_.c=_.b=0
_.e=!1},
mz(){var s,r,q=new A.iw(),p=v.G,o="web-worker:"+A.G(p.self.constructor.name)
p=A.id(p.self)
s=new A.ix(new A.ei(q,o,A.bZ(t.S)))
if(typeof s=="function")A.cx(A.cA("Attempting to rewrap a JS function.",null))
r=function(a,b){return function(c){return a(b,c,arguments.length)}}(A.lC,s)
r[$.j5()]=s
p.onmessage=r
q.$1(B.i.ai(t.G.a(A.O(["kind","hello","protocol",1,"build","8c12ff1c","backend",o],t.N,t.X)),null))},
iw:function iw(){},
ix:function ix(a){this.a=a},
k6(a){return v.mangledGlobalNames[a]},
mF(a){throw A.Q(new A.bX("Field '"+a+"' has been assigned during initialization."),new Error())},
aK(){throw A.Q(A.kO(""),new Error())},
lC(a,b,c){t.h.a(a)
if(A.f(c)>=1)return a.$1(b)
return a.$0()},
k2(a,b,c){A.jV(c,t.H,"T","min")
return Math.min(c.a(a),c.a(b))},
k1(a,b,c){A.jV(c,t.H,"T","max")
return Math.max(c.a(a),c.a(b))},
mr(a,b,c,d,e,f,g,h){var s,r,q,p,o,n,m,l=null,k=f.I(a),j=!c
if(j&&k>d*b+80)return l
s=h.a
r=h.b
q=Math.sqrt(s*s+r*r)
p=q<0.01?0:((a.a-f.a)*s+(a.b-f.b)*r)/(Math.max(1,k)*q)
if(j&&k>72){if(p<0.45)return l
o=Math.max(0,k*p)
n=new A.J(f.a+s/q*o,f.b+r/q*o)
if(e.aj(n).I(n)>48)return l}m=g.$2(f,e.bI(f,a))
if(isFinite(m))j=!j||m<=b
else j=!1
return j?m:l}},B={}
var w=[A,J,B]
var $={}
A.iI.prototype={}
J.cN.prototype={
a8(a,b){return a===b},
gP(a){return A.d6(a)},
p(a){return"Instance of '"+A.d7(a)+"'"},
gR(a){return A.aJ(A.iU(this))}}
J.cP.prototype={
p(a){return String(a)},
gP(a){return a?519018:218159},
gR(a){return A.aJ(t.y)},
$iz:1,
$ie:1}
J.bR.prototype={
a8(a,b){return null==b},
p(a){return"null"},
gP(a){return 0},
$iz:1}
J.bU.prototype={$iK:1}
J.aO.prototype={
gP(a){return 0},
p(a){return String(a)}}
J.d4.prototype={}
J.cb.prototype={}
J.aN.prototype={
p(a){var s=a[$.k8()]
if(s==null)s=a[$.j5()]
if(s==null)return this.c5(a)
return"JavaScript function for "+J.bj(s)},
$iaC:1}
J.bT.prototype={
gP(a){return 0},
p(a){return String(a)}}
J.bV.prototype={
gP(a){return 0},
p(a){return String(a)}}
J.r.prototype={
l(a,b){A.j(a).c.a(b)
a.$flags&1&&A.cy(a,29)
a.push(b)},
ag(a,b){var s
a.$flags&1&&A.cy(a,"remove",1)
for(s=0;s<a.length;++s)if(J.ak(a[s],b)){a.splice(s,1)
return!0}return!1},
E(a,b){var s
A.j(a).h("b<1>").a(b)
a.$flags&1&&A.cy(a,"addAll",2)
if(Array.isArray(b)){this.c9(a,b)
return}for(s=J.H(b);s.j();)a.push(s.gn())},
c9(a,b){var s,r
t.gn.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.h(A.W(a))
for(r=0;r<s;++r)a.push(b[r])},
au(a){a.$flags&1&&A.cy(a,"clear","clear")
a.length=0},
aw(a,b,c){var s=A.j(a)
return new A.R(a,s.D(c).h("1(2)").a(b),s.h("@<1>").D(c).h("R<1,2>"))},
cT(a,b){var s,r=A.cT(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.u(r,s,A.u(a[s]))
return r.join(b)},
aO(a,b){return A.a1(a,b,null,A.j(a).c)},
a6(a,b){var s,r,q
A.j(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.h(A.aD())
if(0>=s)return A.l(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.h(A.W(a))}return r},
H(a,b,c,d){var s,r,q
d.a(b)
A.j(a).D(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.h(A.W(a))}return r},
al(a,b){var s,r,q
A.j(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.h(A.W(a))}throw A.h(A.aD())},
T(a,b){if(!(b>=0&&b<a.length))return A.l(a,b)
return a[b]},
gG(a){if(a.length>0)return a[0]
throw A.h(A.aD())},
gba(a){var s=a.length
if(s>0)return a[s-1]
throw A.h(A.aD())},
J(a,b){var s,r
A.j(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.h(A.W(a))}return!1},
b6(a,b){var s,r
A.j(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.h(A.W(a))}return!0},
C(a,b){var s,r,q,p,o,n=A.j(a)
n.h("a(1,1)?").a(b)
a.$flags&2&&A.cy(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dd()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.dq(b,2))
if(p>0)this.co(a,p)},
co(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
q(a,b){var s
for(s=0;s<a.length;++s)if(J.ak(a[s],b))return!0
return!1},
ga0(a){return a.length===0},
gam(a){return a.length!==0},
p(a){return A.iH(a,"[","]")},
gB(a){return new J.b0(a,a.length,A.j(a).h("b0<1>"))},
gP(a){return A.d6(a)},
gm(a){return a.length},
u(a,b,c){A.j(a).c.a(c)
a.$flags&2&&A.cy(a)
if(!(b>=0&&b<a.length))throw A.h(A.jW(a,b))
a[b]=c},
cP(a,b){var s
A.j(a).h("e(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$in:1,
$ib:1,
$im:1}
J.cO.prototype={
d6(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.d7(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.fL.prototype={}
J.b0.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.w(q)
throw A.h(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iE:1}
J.bS.prototype={
t(a,b){var s
A.v(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaK(b)
if(this.gaK(a)===s)return 0
if(this.gaK(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaK(a){return a===0?1/a<0:a<0},
k(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.h(A.b9(""+a+".toInt()"))},
b4(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.h(A.b9(""+a+".ceil()"))},
W(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.h(A.b9(""+a+".floor()"))},
bW(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.h(A.b9(""+a+".round()"))},
v(a,b,c){if(B.c.t(b,c)>0)throw A.h(A.jS(b))
if(this.t(a,b)<0)return b
if(this.t(a,c)>0)return c
return a},
aM(a,b){var s
if(b>20)throw A.h(A.b6(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaK(a))return"-"+s
return s},
p(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gP(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
bj(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.bD(a,b)},
bC(a,b){return(a|0)===a?a/b|0:this.bD(a,b)},
bD(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.h(A.b9("Result of truncating division is "+A.u(s)+": "+A.u(a)+" ~/ "+b))},
bA(a,b){var s
if(a>0)s=this.cs(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cs(a,b){return b>31?0:a>>>b},
gR(a){return A.aJ(t.H)},
$ii:1,
$ia_:1}
J.bQ.prototype={
gR(a){return A.aJ(t.S)},
$iz:1,
$ia:1}
J.cQ.prototype={
gR(a){return A.aJ(t.i)},
$iz:1}
J.bm.prototype={
aE(a,b,c){return a.substring(b,A.kW(b,c,a.length))},
c_(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.h(B.a_)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
cV(a,b,c){var s=b-a.length
if(s<=0)return a
return this.c_(c,s)+a},
t(a,b){var s
A.G(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
p(a){return a},
gP(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gR(a){return A.aJ(t.N)},
gm(a){return a.length},
$iz:1,
$iF:1}
A.bX.prototype={
p(a){return"LateInitializationError: "+this.a}}
A.hz.prototype={}
A.n.prototype={}
A.k.prototype={
gB(a){var s=this
return new A.t(s,s.gm(s),A.o(s).h("t<k.E>"))},
ga0(a){return this.gm(this)===0},
aw(a,b,c){var s=A.o(this)
return new A.R(this,s.D(c).h("1(k.E)").a(b),s.h("@<k.E>").D(c).h("R<1,2>"))},
a6(a,b){var s,r,q,p=this
A.o(p).h("k.E(k.E,k.E)").a(b)
s=p.gm(p)
if(s===0)throw A.h(A.aD())
r=p.T(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.T(0,q))
if(s!==p.gm(p))throw A.h(A.W(p))}return r},
H(a,b,c,d){var s,r,q,p=this
d.a(b)
A.o(p).D(d).h("1(1,k.E)").a(c)
s=p.gm(p)
for(r=b,q=0;q<s;++q){r=c.$2(r,p.T(0,q))
if(s!==p.gm(p))throw A.h(A.W(p))}return r}}
A.D.prototype={
Z(a,b,c,d){var s,r=this.b
A.c7(r,"start")
s=this.c
if(s!=null){A.c7(s,"end")
if(r>s)throw A.h(A.b6(r,0,s,"start",null))}},
gcj(){var s=J.bi(this.a),r=this.c
if(r==null||r>s)return s
return r},
gct(){var s=J.bi(this.a),r=this.b
if(r>s)return s
return r},
gm(a){var s,r=J.bi(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
T(a,b){var s=this,r=s.gct()+b
if(b<0||r>=s.gcj())throw A.h(A.iG(b,s.gm(0),s,"index"))
return J.iD(s.a,r)},
a7(a){var s,r,q,p=this,o=p.b,n=p.a,m=J.cw(n),l=m.gm(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.ji(0,p.$ti.c)
return n}r=A.cT(s,m.T(n,o),!0,p.$ti.c)
for(q=1;q<s;++q){B.a.u(r,q,m.T(n,o+q))
if(m.gm(n)<l)throw A.h(A.W(p))}return r}}
A.t.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=J.cw(q),o=p.gm(q)
if(r.b!==o)throw A.h(A.W(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.T(q,s);++r.c
return!0},
$iE:1}
A.b5.prototype={
gB(a){return new A.c0(J.H(this.a),this.b,A.o(this).h("c0<1,2>"))},
gm(a){return J.bi(this.a)}}
A.bJ.prototype={$in:1}
A.c0.prototype={
j(){var s=this,r=s.b
if(r.j()){s.a=s.c.$1(r.gn())
return!0}s.a=null
return!1},
gn(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iE:1}
A.R.prototype={
gm(a){return J.bi(this.a)},
T(a,b){return this.b.$1(J.iD(this.a,b))}}
A.d.prototype={
gB(a){return new A.S(J.H(this.a),this.b,this.$ti.h("S<1>"))}}
A.S.prototype={
j(){var s,r
for(s=this.a,r=this.b;s.j();)if(r.$1(s.gn()))return!0
return!1},
gn(){return this.a.gn()},
$iE:1}
A.bN.prototype={
gB(a){return new A.bO(J.H(this.a),this.b,B.T,this.$ti.h("bO<1,2>"))}}
A.bO.prototype={
gn(){var s=this.d
return s==null?this.$ti.y[1].a(s):s},
j(){var s,r,q=this,p=q.c
if(p==null)return!1
for(s=q.a,r=q.b;!p.j();){q.d=null
if(s.j()){q.c=null
p=J.H(r.$1(s.gn()))
q.c=p}else return!1}q.d=q.c.gn()
return!0},
$iE:1}
A.b7.prototype={
gB(a){var s=this.a
return new A.b8(s.gB(s),this.b,A.o(this).h("b8<1>"))}}
A.bK.prototype={
gm(a){var s=this.a,r=s.gm(s)
s=this.b
if(r>s)return s
return r},
$in:1}
A.b8.prototype={
j(){if(--this.b>=0)return this.a.j()
this.b=-1
return!1},
gn(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gn()},
$iE:1}
A.bL.prototype={
j(){return!1},
gn(){throw A.h(A.aD())},
$iE:1}
A.bs.prototype={
gB(a){return new A.ce(J.H(this.a),this.$ti.h("ce<1>"))}}
A.ce.prototype={
j(){var s,r
for(s=this.a,r=this.$ti.c;s.j();)if(r.b(s.gn()))return!0
return!1},
gn(){return this.$ti.c.a(this.a.gn())},
$iE:1}
A.I.prototype={
sm(a,b){throw A.h(A.b9("Cannot change the length of a fixed-length list"))},
l(a,b){A.au(a).h("I.E").a(b)
throw A.h(A.b9("Cannot add to a fixed-length list"))}}
A.N.prototype={
gm(a){return this.a.length},
T(a,b){var s=this.a
return J.iD(s,s.length-1-b)}}
A.aT.prototype={$r:"+(1,2,3)",$s:1}
A.aU.prototype={$r:"+lower,teamSize,upper(1,2,3)",$s:2}
A.bu.prototype={$r:"+high,low,selfHigh,selfLow(1,2,3,4)",$s:3}
A.bG.prototype={}
A.bF.prototype={
ga0(a){return this.gm(this)===0},
gam(a){return this.gm(this)!==0},
p(a){return A.fT(this)},
gaf(){return new A.ar(this.cN(),A.o(this).h("ar<a7<1,2>>"))},
cN(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gaf(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.ga4(),o=o.gB(o),n=A.o(s),m=n.y[1],n=n.h("a7<1,2>")
case 2:if(!o.j()){r=3
break}l=o.gn()
k=s.i(0,l)
r=4
return a.b=new A.a7(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$ia6:1}
A.bH.prototype={
gm(a){return this.b.length},
gbu(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
V(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
i(a,b){if(!this.V(b))return null
return this.b[this.a[b]]},
a3(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbu()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
ga4(){return new A.bc(this.gbu(),this.$ti.h("bc<1>"))},
gaC(){return new A.bc(this.b,this.$ti.h("bc<2>"))}}
A.bc.prototype={
gm(a){return this.a.length},
gB(a){var s=this.a
return new A.cf(s,s.length,this.$ti.h("cf<1>"))}}
A.cf.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iE:1}
A.cM.prototype={
a8(a,b){if(b==null)return!1
return b instanceof A.b2&&this.a.a8(0,b.a)&&A.j1(this)===A.j1(b)},
gP(a){return A.iL(this.a,A.j1(this),B.o,B.o)},
p(a){var s=B.a.cT([A.aJ(this.$ti.c)],", ")
return this.a.p(0)+" with "+("<"+s+">")}}
A.b2.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.mw(A.im(this.a),this.$ti)}}
A.hc.prototype={
$0(){return B.b.W(1000*this.a.now())},
$S:4}
A.c8.prototype={}
A.hK.prototype={
a5(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.c5.prototype={
p(a){return"Null check operator used on a null value"}}
A.cR.prototype={
p(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.dc.prototype={
p(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.fV.prototype={
p(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.bM.prototype={}
A.cl.prototype={
p(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iaQ:1}
A.a3.prototype={
p(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.k7(r==null?"unknown":r)+"'"},
$iaC:1,
gdc(){return this},
$C:"$1",
$R:1,
$D:null}
A.cD.prototype={$C:"$0",$R:0}
A.cE.prototype={$C:"$2",$R:2}
A.da.prototype={}
A.d9.prototype={
p(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.k7(s)+"'"}}
A.bl.prototype={
a8(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bl))return!1
return this.$_target===b.$_target&&this.a===b.a},
gP(a){return(A.k3(this.a)^A.d6(this.$_target))>>>0},
p(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.d7(this.a)+"'")}}
A.d8.prototype={
p(a){return"RuntimeError: "+this.a}}
A.aE.prototype={
gm(a){return this.a},
ga0(a){return this.a===0},
ga4(){return new A.a5(this,A.o(this).h("a5<1>"))},
gaf(){return new A.b3(this,A.o(this).h("b3<1,2>"))},
V(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.cQ(a)},
cQ(a){var s=this.d
if(s==null)return!1
return this.b8(this.bs(s,a),a)>=0},
E(a,b){A.o(this).h("a6<1,2>").a(b).a3(0,new A.fM(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.cR(b)},
cR(a){var s,r,q=this.d
if(q==null)return null
s=this.bs(q,a)
r=this.b8(s,a)
if(r<0)return null
return s[r].b},
u(a,b,c){var s,r,q=this,p=A.o(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bk(s==null?q.b=q.aZ():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bk(r==null?q.c=q.aZ():r,b,c)}else q.cS(b,c)},
cS(a,b){var s,r,q,p,o=this,n=A.o(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.aZ()
r=o.bS(a)
q=s[r]
if(q==null)s[r]=[o.b_(a,b)]
else{p=o.b8(q,a)
if(p>=0)q[p].b=b
else q.push(o.b_(a,b))}},
cX(a,b){var s,r,q=this,p=A.o(q)
p.c.a(a)
p.h("2()").a(b)
if(q.V(a)){s=q.i(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.u(0,a,r)
return r},
ag(a,b){var s=this.cn(this.b,b)
return s},
au(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aY()}},
a3(a,b){var s,r,q=this
A.o(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.h(A.W(q))
s=s.c}},
bk(a,b,c){var s,r=A.o(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.b_(b,c)
else s.b=c},
cn(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.cu(s)
delete a[b]
return s.b},
aY(){this.r=this.r+1&1073741823},
b_(a,b){var s=this,r=A.o(s),q=new A.fQ(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.aY()
return q},
cu(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.aY()},
bS(a){return J.a2(a)&1073741823},
bs(a,b){return a[this.bS(b)]},
b8(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.ak(a[r].a,b))return r
return-1},
p(a){return A.fT(this)},
aZ(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ijk:1}
A.fM.prototype={
$2(a,b){var s=this.a,r=A.o(s)
s.u(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.o(this.a).h("~(1,2)")}}
A.fQ.prototype={}
A.a5.prototype={
gm(a){return this.a.a},
ga0(a){return this.a.a===0},
gB(a){var s=this.a
return new A.b4(s,s.r,s.e,this.$ti.h("b4<1>"))},
q(a,b){return this.a.V(b)}}
A.b4.prototype={
gn(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.h(A.W(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iE:1}
A.af.prototype={
gm(a){return this.a.a},
gB(a){var s=this.a
return new A.ae(s,s.r,s.e,this.$ti.h("ae<1>"))}}
A.ae.prototype={
gn(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.h(A.W(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iE:1}
A.b3.prototype={
gm(a){return this.a.a},
gB(a){var s=this.a
return new A.bY(s,s.r,s.e,this.$ti.h("bY<1,2>"))}}
A.bY.prototype={
gn(){var s=this.d
s.toString
return s},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.h(A.W(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.a7(s.a,s.b,r.$ti.h("a7<1,2>"))
r.c=s.c
return!0}},
$iE:1}
A.is.prototype={
$1(a){return this.a(a)},
$S:21}
A.it.prototype={
$2(a,b){return this.a(a,b)},
$S:34}
A.iu.prototype={
$1(a){return this.a(A.G(a))},
$S:44}
A.ax.prototype={
p(a){return this.bF(!1)},
bF(a){var s,r,q,p,o,n=this.ck(),m=this.aX(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.l(m,q)
o=m[q]
l=a?l+A.jo(o):l+A.u(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
ck(){var s,r=this.$s
while($.i6.length<=r)B.a.l($.i6,null)
s=$.i6[r]
if(s==null){s=this.cf()
B.a.u($.i6,r,s)}return s},
cf(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.c(new Array(l),t.Q)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.u(k,q,r[s])}}return A.aP(k,t.K)}}
A.bf.prototype={
aX(){return[this.a,this.b,this.c]},
a8(a,b){var s=this
if(b==null)return!1
return b instanceof A.bf&&s.$s===b.$s&&J.ak(s.a,b.a)&&J.ak(s.b,b.b)&&J.ak(s.c,b.c)},
gP(a){var s=this
return A.iL(s.$s,s.a,s.b,s.c)}}
A.bt.prototype={
aX(){return this.a},
a8(a,b){if(b==null)return!1
return b instanceof A.bt&&this.$s===b.$s&&A.li(this.a,b.a)},
gP(a){return A.iL(this.$s,A.kR(this.a),B.o,B.o)}}
A.bo.prototype={
gR(a){return B.ah},
$iz:1}
A.c3.prototype={}
A.cU.prototype={
gR(a){return B.ai},
$iz:1}
A.bp.prototype={
gm(a){return a.length},
$iad:1}
A.c1.prototype={$in:1,$ib:1,$im:1}
A.c2.prototype={$in:1,$ib:1,$im:1}
A.cV.prototype={
gR(a){return B.aj},
$iz:1}
A.cW.prototype={
gR(a){return B.ak},
$iz:1}
A.cX.prototype={
gR(a){return B.al},
$iz:1}
A.cY.prototype={
gR(a){return B.am},
$iz:1}
A.cZ.prototype={
gR(a){return B.an},
$iz:1}
A.d_.prototype={
gR(a){return B.ap},
$iz:1}
A.d0.prototype={
gR(a){return B.aq},
$iz:1}
A.c4.prototype={
gR(a){return B.ar},
gm(a){return a.length},
$iz:1}
A.d1.prototype={
gR(a){return B.as},
gm(a){return a.length},
$iz:1,
$iiP:1}
A.cg.prototype={}
A.ch.prototype={}
A.ci.prototype={}
A.cj.prototype={}
A.ap.prototype={
h(a){return A.cp(v.typeUniverse,this,a)},
D(a){return A.jF(v.typeUniverse,this,a)}}
A.dh.prototype={}
A.ia.prototype={
p(a){return A.aa(this.a,null)}}
A.dg.prototype={
p(a){return this.a}}
A.bv.prototype={$iaG:1}
A.hN.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:22}
A.hM.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:55}
A.hO.prototype={
$0(){this.a.$0()},
$S:32}
A.hP.prototype={
$0(){this.a.$0()},
$S:32}
A.i8.prototype={
c7(a,b){if(self.setTimeout!=null)self.setTimeout(A.dq(new A.i9(this,b),0),a)
else throw A.h(A.b9("`setTimeout()` not found."))}}
A.i9.prototype={
$0(){this.b.$0()},
$S:3}
A.dd.prototype={}
A.ie.prototype={
$1(a){return this.a.$2(0,a)},
$S:41}
A.ig.prototype={
$2(a,b){this.a.$2(1,new A.bM(a,t.l.a(b)))},
$S:49}
A.ij.prototype={
$2(a,b){this.a(A.f(a),b)},
$S:62}
A.aI.prototype={
gn(){var s=this.b
return s==null?this.$ti.c.a(s):s},
cp(a,b){var s,r,q
a=A.f(a)
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
o.d=null}q=o.cp(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.jz
return!1}if(0>=p.length)return A.l(p,-1)
o.a=p.pop()
m=0
n=null
continue}if(2===q){m=0
n=null
continue}if(3===q){n=o.c
o.c=null
p=o.e
if(p==null||p.length===0){o.b=null
o.a=A.jz
throw n
return!1}if(0>=p.length)return A.l(p,-1)
o.a=p.pop()
m=1
continue}throw A.h(A.jq("sync*"))}return!1},
bH(a){var s,r,q=this
if(a instanceof A.ar){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.l(r,q.a)
q.a=s
return 2}else{q.d=J.H(a)
return 2}},
$iE:1}
A.ar.prototype={
gB(a){return new A.aI(this.a(),this.$ti.h("aI<1>"))}}
A.am.prototype={
p(a){return A.u(this.a)},
$iB:1,
gaD(){return this.b}}
A.fK.prototype={
$0(){this.c.a(null)
this.b.cd(null)},
$S:3}
A.ba.prototype={
cU(a){if((this.c&15)!==6)return!0
return this.b.b.bd(t.al.a(this.d),a.a,t.y,t.K)},
cO(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.d3(q,m,a.b,o,n,t.l)
else p=l.bd(t.D.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.aL(s))){if((r.c&1)!==0)throw A.h(A.cA("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.h(A.cA("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.T.prototype={
bX(a,b,c){var s,r,q=this.$ti
q.D(c).h("1/(2)").a(a)
s=$.L
if(s===B.j){if(!t.C.b(b)&&!t.D.b(b))throw A.h(A.ej(b,"onError",u.c))}else{c.h("@<0/>").D(q.c).h("1(2)").a(a)
b=A.m3(b,s)}r=new A.T(s,c.h("T<0>"))
this.aP(new A.ba(r,3,a,b,q.h("@<1>").D(c).h("ba<1,2>")))
return r},
bE(a,b,c){var s,r=this.$ti
r.D(c).h("1/(2)").a(a)
s=new A.T($.L,c.h("T<0>"))
this.aP(new A.ba(s,19,a,b,r.h("@<1>").D(c).h("ba<1,2>")))
return s},
cr(a){this.a=this.a&1|16
this.c=a},
aF(a){this.a=a.a&30|this.a&1
this.c=a.c},
aP(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.aP(a)
return}r.aF(s)}A.dp(null,null,r.b,t.M.a(new A.hR(r,a)))}},
by(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.by(a)
return}m.aF(n)}l.a=m.aH(a)
A.dp(null,null,m.b,t.M.a(new A.hW(l,m)))}},
ap(){var s=t.F.a(this.c)
this.c=null
return this.aH(s)},
aH(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
cd(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("aM<1>").b(a))A.hU(a,r,!0)
else{s=r.ap()
q.c.a(a)
r.a=8
r.c=a
A.bb(r,s)}},
br(a){var s,r=this
r.$ti.c.a(a)
s=r.ap()
r.a=8
r.c=a
A.bb(r,s)},
ce(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.ap()
q.aF(a)
A.bb(q,r)},
aT(a){var s=this.ap()
this.cr(a)
A.bb(this,s)},
cb(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("aM<1>").b(a)){this.bn(a)
return}this.cc(a)},
cc(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dp(null,null,s.b,t.M.a(new A.hT(s,a)))},
bn(a){A.hU(this.$ti.h("aM<1>").a(a),this,!1)
return},
bm(a){this.a^=2
A.dp(null,null,this.b,t.M.a(new A.hS(this,a)))},
$iaM:1}
A.hR.prototype={
$0(){A.bb(this.a,this.b)},
$S:3}
A.hW.prototype={
$0(){A.bb(this.b,this.a.a)},
$S:3}
A.hV.prototype={
$0(){A.hU(this.a.a,this.b,!0)},
$S:3}
A.hT.prototype={
$0(){this.a.br(this.b)},
$S:3}
A.hS.prototype={
$0(){this.a.aT(this.b)},
$S:3}
A.hZ.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.d2(t.fO.a(q.d),t.z)}catch(p){s=A.aL(p)
r=A.bB(p)
if(k.c&&t.u.a(k.b.a.c).a===s){q=k.a
q.c=t.u.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.iF(q)
n=k.a
n.c=new A.am(q,o)
q=n}q.b=!0
return}if(j instanceof A.T&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.u.a(j.c)
q.b=!0}return}if(j instanceof A.T){m=k.b.a
l=new A.T(m.b,m.$ti)
j.bX(new A.i_(l,m),new A.i0(l),t.p)
q=k.a
q.c=l
q.b=!1}},
$S:3}
A.i_.prototype={
$1(a){this.a.ce(this.b)},
$S:22}
A.i0.prototype={
$2(a,b){A.cs(a)
t.l.a(b)
this.a.aT(new A.am(a,b))},
$S:42}
A.hY.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bd(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aL(l)
r=A.bB(l)
q=s
p=r
if(p==null)p=A.iF(q)
o=this.a
o.c=new A.am(q,p)
o.b=!0}},
$S:3}
A.hX.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.u.a(l.a.a.c)
p=l.b
if(p.a.cU(s)&&p.a.e!=null){p.c=p.a.cO(s)
p.b=!1}}catch(o){r=A.aL(o)
q=A.bB(o)
p=t.u.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.iF(p)
m=l.b
m.c=new A.am(p,n)
p=m}p.b=!0}},
$S:3}
A.de.prototype={}
A.dm.prototype={}
A.cr.prototype={$iju:1}
A.dl.prototype={
d4(a){var s,r,q
t.M.a(a)
try{if(B.j===$.L){a.$0()
return}A.jO(null,null,this,a,t.p)}catch(q){s=A.aL(q)
r=A.bB(q)
A.iX(A.cs(s),t.l.a(r))}},
bJ(a){return new A.i7(this,t.M.a(a))},
d2(a,b){b.h("0()").a(a)
if($.L===B.j)return a.$0()
return A.jO(null,null,this,a,b)},
bd(a,b,c,d){c.h("@<0>").D(d).h("1(2)").a(a)
d.a(b)
if($.L===B.j)return a.$1(b)
return A.m5(null,null,this,a,b,c,d)},
d3(a,b,c,d,e,f){d.h("@<0>").D(e).D(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.L===B.j)return a.$2(b,c)
return A.m4(null,null,this,a,b,c,d,e,f)},
bV(a,b,c,d){return b.h("@<0>").D(c).D(d).h("1(2,3)").a(a)}}
A.i7.prototype={
$0(){return this.a.d4(this.b)},
$S:3}
A.ii.prototype={
$0(){A.kE(this.a,this.b)},
$S:3}
A.aS.prototype={
gB(a){var s=this,r=new A.bd(s,s.r,s.$ti.h("bd<1>"))
r.c=s.e
return r},
gm(a){return this.a},
q(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cg(b)},
cg(a){var s=this.d
if(s==null)return!1
return this.aW(s[J.a2(a)&1073741823],a)>=0},
l(a,b){var s,r,q=this
q.$ti.c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bo(s==null?q.b=A.iQ():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bo(r==null?q.c=A.iQ():r,b)}else return q.c8(b)},
c8(a){var s,r,q,p=this
p.$ti.c.a(a)
s=p.d
if(s==null)s=p.d=A.iQ()
r=J.a2(a)&1073741823
q=s[r]
if(q==null)s[r]=[p.aS(a)]
else{if(p.aW(q,a)>=0)return!1
q.push(p.aS(a))}return!0},
ag(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bp(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bp(s.c,b)
else return s.cm(b)},
cm(a){var s,r,q,p,o=this.d
if(o==null)return!1
s=J.a2(a)&1073741823
r=o[s]
q=this.aW(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete o[s]
this.bq(p)
return!0},
bo(a,b){this.$ti.c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.aS(b)
return!0},
bp(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bq(s)
delete a[b]
return!0},
aR(){this.r=this.r+1&1073741823},
aS(a){var s,r=this,q=new A.dk(r.$ti.c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.aR()
return q},
bq(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.aR()},
aW(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.ak(a[r].a,b))return r
return-1},
$ijm:1}
A.dk.prototype={}
A.bd.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.h(A.W(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iE:1}
A.fR.prototype={
$2(a,b){this.a.u(0,this.b.a(a),this.c.a(b))},
$S:36}
A.A.prototype={
gB(a){return new A.t(a,a.length,A.au(a).h("t<A.E>"))},
T(a,b){if(!(b>=0&&b<a.length))return A.l(a,b)
return a[b]},
ga0(a){return a.length===0},
gam(a){return a.length!==0},
gG(a){var s=a.length
if(s===0)throw A.h(A.aD())
if(0>=s)return A.l(a,0)
return a[0]},
gba(a){var s,r=a.length
if(r===0)throw A.h(A.aD())
s=r-1
if(!(s>=0))return A.l(a,s)
return a[s]},
aw(a,b,c){var s=A.au(a)
return new A.R(a,s.D(c).h("1(A.E)").a(b),s.h("@<A.E>").D(c).h("R<1,2>"))},
H(a,b,c,d){var s,r,q,p
d.a(b)
A.au(a).D(d).h("1(1,A.E)").a(c)
s=a.length
for(r=s,q=b,p=0;p<s;++p){if(!(p<r))return A.l(a,p)
q=c.$2(q,a[p])
r=a.length
if(s!==r)throw A.h(A.W(a))}return q},
aO(a,b){return A.a1(a,b,null,A.au(a).h("A.E"))},
l(a,b){var s
A.au(a).h("A.E").a(b)
s=a.length
this.sm(a,s+1)
if(!(s<a.length))return A.l(a,s)
a[s]=b},
p(a){return A.iH(a,"[","]")}}
A.C.prototype={
a3(a,b){var s,r,q,p=A.o(this)
p.h("~(C.K,C.V)").a(b)
for(s=this.ga4(),s=s.gB(s),p=p.h("C.V");s.j();){r=s.gn()
q=this.i(0,r)
b.$2(r,q==null?p.a(q):q)}},
aA(a,b,c){var s,r=this,q=A.o(r)
q.h("C.K").a(a)
q.h("C.V(C.V)").a(b)
q.h("C.V()?").a(c)
if(r.V(a)){s=r.i(0,a)
q=b.$1(s==null?q.h("C.V").a(s):s)
r.u(0,a,q)
return q}q=c.$0()
r.u(0,a,q)
return q},
gaf(){return this.ga4().aw(0,new A.fS(this),A.o(this).h("a7<C.K,C.V>"))},
V(a){return this.ga4().q(0,a)},
gm(a){var s=this.ga4()
return s.gm(s)},
ga0(a){var s=this.ga4()
return s.ga0(s)},
p(a){return A.fT(this)},
$ia6:1}
A.fS.prototype={
$1(a){var s=this.a,r=A.o(s)
r.h("C.K").a(a)
s=s.i(0,a)
if(s==null)s=r.h("C.V").a(s)
return new A.a7(a,s,r.h("a7<C.K,C.V>"))},
$S(){return A.o(this.a).h("a7<C.K,C.V>(C.K)")}}
A.fU.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.u(a)
r.a=(r.a+=s)+": "
s=A.u(b)
r.a+=s},
$S:31}
A.cq.prototype={}
A.bn.prototype={
i(a,b){return this.a.i(0,b)},
a3(a,b){this.a.a3(0,this.$ti.h("~(1,2)").a(b))},
ga0(a){return this.a.a===0},
gam(a){return this.a.a!==0},
gm(a){return this.a.a},
p(a){return A.fT(this.a)},
gaC(){var s=this.a
return new A.af(s,A.o(s).h("af<2>"))},
gaf(){var s=this.a
return new A.b3(s,A.o(s).h("b3<1,2>"))},
$ia6:1}
A.cc.prototype={}
A.bq.prototype={
E(a,b){var s,r,q
this.$ti.h("b<1>").a(b)
for(s=A.i5(b,b.r,b.$ti.c),r=s.$ti.c;s.j();){q=s.d
this.l(0,q==null?r.a(q):q)}},
p(a){return A.iH(this,"{","}")},
H(a,b,c,d){var s,r,q,p
d.a(b)
s=this.$ti
s.D(d).h("1(1,2)").a(c)
for(s=A.i5(this,this.r,s.c),r=s.$ti.c,q=b;s.j();){p=s.d
q=c.$2(q,p==null?r.a(p):p)}return q},
$in:1,
$ib:1,
$iiN:1}
A.ck.prototype={
cL(a){var s,r,q=this.$ti,p=new A.aS(q)
for(q=A.i5(this,this.r,q.c),s=q.$ti.c;q.j();){r=q.d
if(r==null)r=s.a(r)
if(!a.q(0,r))p.l(0,r)}return p}}
A.bw.prototype={}
A.di.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cl(b):s}},
gm(a){return this.b==null?this.c.a:this.ao().length},
ga0(a){return this.gm(0)===0},
ga4(){if(this.b==null){var s=this.c
return new A.a5(s,A.o(s).h("a5<1>"))}return new A.dj(this)},
u(a,b,c){var s,r,q=this
A.G(b)
if(q.b==null)q.c.u(0,b,c)
else if(q.V(b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.cv().u(0,b,c)},
V(a){if(this.b==null)return this.c.V(a)
return!1},
a3(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.a3(0,b)
s=o.ao()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.ih(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.h(A.W(o))}},
ao(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.c(Object.keys(this.a),t.s)
return s},
cv(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.X(t.N,t.z)
r=n.ao()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.u(0,o,n.i(0,o))}if(p===0)B.a.l(r,"")
else B.a.au(r)
n.a=n.b=null
return n.c=s},
cl(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.ih(this.a[a])
return this.b[a]=s}}
A.dj.prototype={
gm(a){return this.a.gm(0)},
T(a,b){var s=this.a
if(s.b==null)s=s.ga4().T(0,b)
else{s=s.ao()
if(!(b>=0&&b<s.length))return A.l(s,b)
s=s[b]}return s},
gB(a){var s=this.a
if(s.b==null){s=s.ga4()
s=s.gB(s)}else{s=s.ao()
s=new J.b0(s,s.length,A.j(s).h("b0<1>"))}return s},
q(a,b){return this.a.V(b)}}
A.cF.prototype={}
A.cH.prototype={}
A.bW.prototype={
p(a){var s=A.cK(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.cS.prototype={
p(a){return"Cyclic error in JSON stringify"}}
A.fN.prototype={
cI(a,b){var s=A.m1(a,this.gcJ().a)
return s},
ai(a,b){var s=A.l9(a,this.gcM().b,null)
return s},
gcM(){return B.ad},
gcJ(){return B.ac}}
A.fP.prototype={}
A.fO.prototype={}
A.i3.prototype={
bZ(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.q.aE(a,r,q)
r=q+1
o=A.Y(92)
s.a+=o
o=A.Y(117)
s.a+=o
o=A.Y(100)
s.a+=o
o=p>>>8&15
o=A.Y(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.Y(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.Y(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.q.aE(a,r,q)
r=q+1
o=A.Y(92)
s.a+=o
switch(p){case 8:o=A.Y(98)
s.a+=o
break
case 9:o=A.Y(116)
s.a+=o
break
case 10:o=A.Y(110)
s.a+=o
break
case 12:o=A.Y(102)
s.a+=o
break
case 13:o=A.Y(114)
s.a+=o
break
default:o=A.Y(117)
s.a+=o
o=A.Y(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.Y(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.Y(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.q.aE(a,r,q)
r=q+1
o=A.Y(92)
s.a+=o
o=A.Y(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.q.aE(a,r,m)},
aQ(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.h(new A.cS(a,null))}B.a.l(s,a)},
aN(a){var s,r,q,p,o=this
if(o.bY(a))return
o.aQ(a)
try{s=o.b.$1(a)
if(!o.bY(s)){q=A.jj(a,null,o.gbv())
throw A.h(q)}q=o.a
if(0>=q.length)return A.l(q,-1)
q.pop()}catch(p){r=A.aL(p)
q=A.jj(a,r,o.gbv())
throw A.h(q)}},
bY(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.b.p(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.bZ(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.aQ(a)
q.d8(a)
s=q.a
if(0>=s.length)return A.l(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.aQ(a)
r=q.d9(a)
s=q.a
if(0>=s.length)return A.l(s,-1)
s.pop()
return r}else return!1},
d8(a){var s,r=this.c
r.a+="["
if(J.kl(a)){if(0>=a.length)return A.l(a,0)
this.aN(a[0])
for(s=1;s<a.length;++s){r.a+=","
this.aN(a[s])}}r.a+="]"},
d9(a){var s,r,q,p,o,n,m=this,l={}
if(a.ga0(a)){m.c.a+="{}"
return!0}s=a.gm(a)*2
r=A.cT(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.a3(0,new A.i4(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.bZ(A.G(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.l(r,n)
m.aN(r[n])}p.a+="}"
return!0}}
A.i4.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.u(s,r.a++,a)
B.a.u(s,r.a++,b)},
$S:31}
A.i2.prototype={
gbv(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.cI.prototype={
a8(a,b){if(b==null)return!1
return b instanceof A.cI},
gP(a){return B.c.gP(0)},
p(a){return"0:00:00."+B.q.cV(B.c.p(0),6,"0")}}
A.df.prototype={
p(a){return this.aG()},
$icJ:1}
A.B.prototype={
gaD(){return A.kT(this)}}
A.cB.prototype={
p(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cK(s)
return"Assertion failed"}}
A.aG.prototype={}
A.aw.prototype={
gaV(){return"Invalid argument"+(!this.a?"(s)":"")},
gaU(){return""},
p(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gaV()+q+o
if(!s.a)return n
return n+s.gaU()+": "+A.cK(s.gb9())},
gb9(){return this.b}}
A.c6.prototype={
gb9(){return A.ay(this.b)},
gaV(){return"RangeError"},
gaU(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.u(q):""
else if(q==null)s=": Not greater than or equal to "+A.u(r)
else if(q>r)s=": Not in inclusive range "+A.u(r)+".."+A.u(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.u(r)
return s}}
A.cL.prototype={
gb9(){return A.f(this.b)},
gaV(){return"RangeError"},
gaU(){if(A.f(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gm(a){return this.f}}
A.cd.prototype={
p(a){return"Unsupported operation: "+this.a}}
A.db.prototype={
p(a){return"UnimplementedError: "+this.a}}
A.ca.prototype={
p(a){return"Bad state: "+this.a}}
A.cG.prototype={
p(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.cK(s)+"."}}
A.d3.prototype={
p(a){return"Out of Memory"},
gaD(){return null},
$iB:1}
A.c9.prototype={
p(a){return"Stack Overflow"},
gaD(){return null},
$iB:1}
A.hQ.prototype={
p(a){return"Exception: "+this.a}}
A.aB.prototype={
p(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.b.prototype={
aw(a,b,c){var s=A.o(this)
return A.kQ(this,s.D(c).h("1(b.E)").a(b),s.h("b.E"),c)},
d7(a,b){var s=A.o(this)
return new A.d(this,s.h("e(b.E)").a(b),s.h("d<b.E>"))},
H(a,b,c,d){var s,r
d.a(b)
A.o(this).D(d).h("1(1,b.E)").a(c)
for(s=this.gB(this),r=b;s.j();)r=c.$2(r,s.gn())
return r},
J(a,b){var s
A.o(this).h("e(b.E)").a(b)
for(s=this.gB(this);s.j();)if(b.$1(s.gn()))return!0
return!1},
gm(a){var s,r=this.gB(this)
for(s=0;r.j();)++s
return s},
gG(a){var s=this.gB(this)
if(!s.j())throw A.h(A.aD())
return s.gn()},
T(a,b){var s,r
A.c7(b,"index")
s=this.gB(this)
for(r=b;s.j();){if(r===0)return s.gn();--r}throw A.h(A.iG(b,b-r,this,"index"))},
p(a){return A.kL(this,"(",")")}}
A.a7.prototype={
p(a){return"MapEntry("+A.u(this.a)+": "+A.u(this.b)+")"}}
A.a8.prototype={
gP(a){return A.y.prototype.gP.call(this,0)},
p(a){return"null"}}
A.y.prototype={$iy:1,
a8(a,b){return this===b},
gP(a){return A.d6(this)},
p(a){return"Instance of '"+A.d7(this)+"'"},
gR(a){return A.mp(this)},
toString(){return this.p(this)}}
A.dn.prototype={
p(a){return""},
$iaQ:1}
A.hA.prototype={
gbQ(){var s,r=this.b
if(r==null)r=$.he.$0()
s=r-this.a
if($.j6()===1e6)return s
return s*1000},
bg(){var s=this,r=s.b
if(r!=null){s.a=s.a+($.he.$0()-r)
s.b=null}}}
A.br.prototype={
gm(a){return this.a.length},
p(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ikZ:1}
A.aR.prototype={}
A.ek.prototype={}
A.aA.prototype={
gcw(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=t.S,f=A.X(g,g)
for(g=h.y,g=new A.ae(g,g.r,g.e,A.o(g).h("ae<2>")),s=h.a,r=h.z,q=h.Q,p=s.b,o=s.a;g.j();){n=g.d
m=s.X(n.a)
l=!0
if(n.as){k=n.d
if(k!=null)if(m!=null)if(!m.fy)if(!(m.f<=0)){j=m.a
if(!r.q(0,j)){i=m.as
if(!((i===B.f||i===B.e)&&!q.q(0,j)))if(n.y>=p){l=s.L(k)
l=(l==null?null:l.b)!==o}}}}if(l)continue
n=n.d
n.toString
f.aA(n,new A.dv(),new A.dw())}return f},
M(){var s,r=this,q=r.y,p=A.o(q).h("af<2>")
q=A.p(new A.af(q,p),p.h("b.E"))
s=A.ja(r.a,r.b,r.c,q)
s.d=r.d
s.e=r.e
s.f=r.f
s.r=r.r
q=s.w
q.au(0)
q.E(0,r.w)
q=s.x
q.au(0)
q.E(0,r.x)
s.z.E(0,r.z)
s.Q.E(0,r.Q)
s.as.E(0,r.as)
s.at.E(0,r.at)
s.ax.E(0,r.ax)
B.a.E(s.ay,r.ay)
return s},
A(a){var s=this.a.A(a),r=A.j(s),q=r.h("d<1>")
s=A.p(new A.d(s,r.h("e(1)").a(new A.dT(this)),q),q.h("b.E"))
return s},
N(a){var s
if(a.at==null){s=this.x.i(0,a.a)
if(s==null)s=a.d}else s=a.ga9()
return s},
K(a){var s,r=this.A(a).length,q=this.gcw().i(0,a)
if(q==null)q=0
s=this.at.q(0,a)?1:0
return r+q+s},
ae(a){var s,r,q,p=this,o=p.a,n=a.a,m=o.A(n),l=p.A(n)
if(a.at!=null||B.a.J(o.r,new A.dL(p,a)))return l.length===0?0:1
if(B.a.J(l,new A.dM()))return 1
if(m.length<=1)return 0
n=o.f
s=A.j(n)
r=t.i
q=new A.d(n,s.h("e(1)").a(new A.dN(p)),s.h("d<1>")).H(0,1/0,new A.dO(a),r)
o=o.gU()
s=o.$ti
return q>new A.d(o,s.h("e(b.E)").a(new A.dP(a)),s.h("d<b.E>")).H(0,1/0,new A.dQ(a),r)*1.5?0:1},
aa(d2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4=this,c5="monthSeconds",c6="supplySafety",c7="supplySeconds",c8="battleBudget",c9=c4.b,d0=c9.b,d1=d0.i(0,c5)
d1.toString
s=d0.i(0,c6)
s.toString
r=d1+s
d1=c4.ay
s=A.p(d1,t.gf)
for(q=c4.a,p=q.r,o=A.j(p),n=o.h("e(1)"),m=n.a(new A.dz(c4)),l=B.a.gB(p),m=new A.S(l,m,o.h("S<1>")),k=c4.y,j=c4.c,o=o.h("d<1>"),c9=c9.r,i=c9.w,h=q.b/60,g=c9.d,f=c9.fr;m.j();){c9=l.gn()
e=k.i(0,c9.a)
d=c9.as
c=d===B.n
if(c&&e==null){b=d0.i(0,"campRate")
b.toString}else b=1
a=d0.i(0,c7)
a.toString
d=d===B.t
if(d&&c9.p2.length!==0){a0=c9.z
if(c9.k1!=null){c=d0.i(0,c8)
c.toString
a1=c}else a1=0
for(c=c9.p2,a2=c.length,a3=0;a3<c.length;c.length===a2||(0,A.w)(c),++a3,a0=a4){a4=c[a3]
a1+=j.ad(a0,a4)}}else{a2=e!=null
if(a2&&e.as){a0=c9.z
for(c=J.j8(e.w,e.x),a2=c.$ti,c=new A.t(c,c.gm(0),a2.h("t<k.E>")),a2=a2.h("k.E"),a1=g;c.j();a0=a6){a5=c.d
a6=a5==null?a2.a(a5):a5
a1+=j.ad(a0,a6)}}else{a5=c9.cx
if(a5!=null){a7=q.L(a5)
a7=a7==null?null:a7.b
a7=a7===c9.b&&c9.CW!=null}else a7=!1
if(a7){c=c9.z
a2=c9.CW
a2.toString
a1=j.ad(c,a2)+g}else if(a2&&!e.as){c=e.z
a2=e.Q
a5=d0.i(0,c7)
a5.toString
a1=Math.max(0,c/60-i+a2*a5-h)
c=c9.CW
if(c!=null)a1=Math.max(a1,j.ad(c9.z,c))}else{a2=c9.CW
if(a2!=null&&!c){a8=j.ad(c9.z,a2)
a9=q.L(a5)
a1=Math.max(r,a8)
if(a9!=null&&a9.b!==c9.b){b0=new A.d(p,n.a(new A.dA(c9,a9)),o).gm(0)
c=a9.at
if(c==null)c=a9.d
else{a2=a9.ax
a5=a9.cy?1:0
a5=B.c.v(c-a2-a5,0,5)
c=a5}b1=Math.max(1,Math.min(c,q.A(a9.a).length))
c=d0.i(0,c8)
c.toString
a2=d0.i(0,c6)
a2.toString
a1=a8+b1*(1+b0)*c+a2}}else a1=r}}}if(!isFinite(a1))a1=f
r=Math.max(r,a1)
b2=e==null&&c9.cx==null&&!d
c9=c9.ch
d=b2?1/0:a1
B.a.l(s,new A.aR(c9,b/a,d))}for(c9=d1.length,a3=0;a3<c9;++a3)r=Math.max(r,d1[a3].c)
r=Math.min(f,r)
c9=t.S
b3=new A.d(p,n.a(new A.dB(c4)),o).H(0,c4.r,new A.dC(),c9)
b4=new A.d(p,n.a(new A.dD(c4)),o).H(0,c4.r,new A.dE(),c9)
o=q.gU()
n=o.$ti
p=n.h("d<b.E>")
b5=A.p(new A.d(o,n.h("e(b.E)").a(new A.dF(c4)),p),p.h("b.E"))
if(b5.length===0)d1=0
else{d1=d0.i(0,"countryIncome")
d1.toString
d1=B.b.k(d1)
p=d0.i(0,"poorPenalty")
p.toString
p=d1-B.b.k(p)
d1=p}p=A.j(b5)
b6=new A.dK(b3,d1+new A.d(b5,p.h("e(1)").a(new A.dG(c4)),p.h("d<1>")).H(0,0,new A.dH(c4),c9),b4)
b7=A.kP([r],t.i)
b8=A.c([],t.n)
b9=q.e
d1=r+1e-9
c0=b9
while(c0<=d1){b7.l(0,c0)
B.a.l(b8,c0)
q=d0.i(0,c5)
q.toString
c0+=q}for(d1=A.i5(b7,b7.r,b7.$ti.c),q=d1.$ti.c,c1=0;d1.j();){p=d1.d
if(p==null)p=q.a(p)
c2=B.a.H(s,0,new A.dI(p),c9)
if(p+1e-9<b9)c3=0
else{o=d0.i(0,c5)
o.toString
c3=1+B.b.W((p-b9)/o)}if(B.a.J(b8,new A.dJ(p))){p=b6.$1(Math.max(0,c3-1))
if(typeof p!=="number")return A.jZ(p)
c1=Math.max(c1,c2+p)}p=b6.$1(c3)
if(typeof p!=="number")return A.jZ(p)
c1=Math.max(c1,c2+p)}c9=Math.max(0,c1)
if(d2)d0=s.length===0?0:1
else{d0=d0.i(0,"emergencyGold")
d0.toString
d0=B.b.k(d0)}return new A.ek(c9+d0)},
S(){return this.aa(!1)},
aB(a,b){var s,r,q,p,o,n,m,l,k,j,i=this,h="maxLevel",g="capacityPerLevel"
if(b.fr){s=b.a
s=i.z.q(0,s)||i.Q.q(0,s)}else s=!0
if(s)return!1
s=i.x
r=a.a
q=s.i(0,r)
q.toString
p=i.b
o=p.c
n=o.length
if(q>n)m=null
else{l=q-1
if(!(l>=0))return A.l(o,l)
m=B.c.v(o[l]-b.x,0,99999)}p=p.b
o=p.i(0,"firstYearCityLevel")
if(o==null){o=p.i(0,h)
o.toString
o=B.b.k(o)}o=B.b.k(o)
n=p.i(0,"initialYear")
n=B.b.k(n==null?1:n)
l=p.i(0,h)
l.toString
l=B.c.v(i.a.c-n,0,B.b.k(l))
n=p.i(0,"cityLevelsPerYear")
n=B.b.k(n==null?1:n)
k=p.i(0,h)
k.toString
if(q>=B.c.v(o+l*n,1,B.b.k(k))||m==null||i.d<m)return!1
if(a.b===a.c)j=1
else{o=p.i(0,"foreignYield")
o.toString
j=o}o=i.f
n=q+1
l=p.i(0,g)
l.toString
l=B.b.W(n*B.b.k(l)*j)
p=p.i(0,g)
p.toString
i.f=o+(l-B.b.W(q*B.b.k(p)*j))
i.d=i.d-m
s.u(0,r,n)
return!0},
bP(a){var s,r,q,p,o,n=this
if(!a.dy||a.e===2||n.z.q(0,a.a))return!1
s=a.a
n.z.l(0,s)
n.y.ag(0,s)
n.as.l(0,s)
n.d=n.d+a.x
s=n.f
r=n.e
q=a.as
p=q!==B.f
n.e=Math.min(s,r+(!p||q===B.e?a.gO():0))
if(!p||q===B.e)for(s=a.ax,r=s.length,q=n.w,o=0;o<r;++o)q.aA(s[o],new A.dR(),new A.dS())
return!0},
ar(a){var s,r=this,q=r.b.b.i(0,"soldierCost")
q.toString
s=a*B.b.k(q)
if(a<0||r.e+a>r.f||r.d<s)return!1
r.d-=s
r.e+=a
return!0},
bK(a){var s=this,r=s.b.f.i(0,a)
if(r==null||!r.f||s.a.c<r.e||s.d<r.b)return!1
s.d=s.d-r.b
s.w.aA(a,new A.dx(),new A.dy())
return!0},
bc(a,b){var s,r,q,p,o,n,m=this,l=m.b,k=l.b,j=k.i(0,"drawCost")
j.toString
s=m.a
r=s.y
q=B.b.k(j)+r
j=s.r
p=A.j(j)
o=t.S
n=new A.d(j,p.h("e(1)").a(new A.dU(m)),p.h("d<1>")).H(0,m.r+r,new A.dV(),o)
k=k.i(0,"countryIncome")
k.toString
k=B.b.k(k)
p=s.gU()
j=p.$ti
o=new A.d(p,j.h("e(b.E)").a(new A.dW(m)),j.h("d<b.E>")).H(0,0,new A.dX(m),o)
j=!0
if(a.Q){p=m.at
if(!p.q(0,a.a))if(s.x>p.a)if(m.d>=q){l=b?1:l.r.r
l=n>(k+o)*l}else l=j
else l=j
else l=j}else l=j
if(l)return!1
m.d-=q
m.r+=r
m.at.l(0,a.a)
return!0},
cZ(a){return this.bc(a,!1)},
cK(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(b)
if(a.db){s=a.a
s=l.as.q(0,s)||l.z.q(0,s)||l.d<=0}else s=!0
if(s)return!1
s=l.w
r=t.S
q=A.jl(s,r,r)
r=b.length
p=l.b.b
o=p.i(0,"carryLimit")
o.toString
if(r>B.b.k(o))return!1
for(r=b.length,n=0;n<b.length;b.length===r||(0,A.w)(b),++n){m=b[n]
o=q.i(0,m)
if((o==null?0:o)===0)return!1
o=q.i(0,m)
o.toString
q.u(0,m,o-1)}s.au(0)
s.E(0,q)
s=l.e
r=p.i(0,"soldierLimit")
r.toString
l.e=s-Math.min(s,B.b.k(r)-a.gO())
r=a.a
l.Q.l(0,r)
l.as.l(0,r)
l.y.u(0,r,c)
p=p.i(0,"supplySeconds")
p.toString
B.a.l(l.ay,new A.aR(a.ch,1/p,d))
return!0},
d_(a,b){var s,r=this
if(!a.dx||r.as.q(0,a.a)||r.d<=0||a.fy)return!1
s=a.a
r.as.l(0,s)
r.y.u(0,s,b)
return!0}}
A.dv.prototype={
$1(a){return A.f(a)+1},
$S:5}
A.dw.prototype={
$0(){return 1},
$S:4}
A.dT.prototype={
$1(a){var s=this.a,r=t.r.a(a).a
return!s.z.q(0,r)&&!s.Q.q(0,r)},
$S:0}
A.dL.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.b!==this.a.a.a){r=a.as
if(!(r===B.f||r===B.e))if(!a.fy)if(a.f>0){s=this.b
s=a.p3===s.a||a.z.I(s.e)<96}}return s},
$S:0}
A.dM.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.dN.prototype={
$1(a){return t.q.a(a).b!==this.a.a.a},
$S:1}
A.dO.prototype={
$2(a,b){return Math.min(A.aj(a),t.q.a(b).e.I(this.a.e))},
$S:25}
A.dP.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:1}
A.dQ.prototype={
$2(a,b){return Math.min(A.aj(a),t.q.a(b).e.I(this.a.e))},
$S:25}
A.dz.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
if(a.b===s.a.a){r=a.as
s=!(r===B.f||r===B.e)&&!a.fy&&!s.z.q(0,a.a)}else s=!1
return s},
$S:0}
A.dA.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=!1
if(a.a!==s.a)if(a.b===s.b){q=this.b
if(a.cx===q.a){r=q.e
r=a.z.I(r)<s.z.I(r)
s=r}else s=r}else s=r
else s=r
return s},
$S:0}
A.dB.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.q(0,a.a)},
$S:0}
A.dC.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:13}
A.dD.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=s.a
return a.b===r.a&&a.f>0&&!s.z.q(0,a.a)&&a.p4===r.d},
$S:0}
A.dE.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:13}
A.dF.prototype={
$1(a){return!this.a.ax.q(0,t.q.a(a).a)},
$S:1}
A.dG.prototype={
$1(a){return!this.a.ax.q(0,t.q.a(a).a)},
$S:1}
A.dH.prototype={
$2(a,b){var s,r,q
A.f(a)
t.q.a(b)
s=this.a
r=s.x.i(0,b.a)
r.toString
s=s.b.b
q=s.i(0,"incomeStep")
q.toString
q=B.b.k(q)
if(b.b===b.c)s=1
else{s=s.i(0,"foreignYield")
s.toString}return a+B.b.W((b.z+(r-1)*q)*s)},
$S:9}
A.dK.prototype={
$1(a){return a===0?0:a*(this.a-this.b)-this.c},
$S:5}
A.dI.prototype={
$2(a,b){A.f(a)
t.gf.a(b)
return a+B.b.W(b.a+b.b*Math.min(this.a,b.c)+1e-9)},
$S:61}
A.dJ.prototype={
$1(a){return Math.abs(A.aj(a)-this.a)<1e-7},
$S:11}
A.dR.prototype={
$1(a){return A.f(a)+1},
$S:5}
A.dS.prototype={
$0(){return 1},
$S:4}
A.dx.prototype={
$1(a){return A.f(a)+1},
$S:5}
A.dy.prototype={
$0(){return 1},
$S:4}
A.dU.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.q(0,a.a)},
$S:0}
A.dV.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:13}
A.dW.prototype={
$1(a){return!this.a.ax.q(0,t.q.a(a).a)},
$S:1}
A.dX.prototype={
$2(a,b){var s,r
A.f(a)
t.q.a(b)
s=this.a
r=s.x.i(0,b.a)
if(r==null)r=b.d
s=s.b.b.i(0,"incomeStep")
s.toString
return a+b.z+(r-1)*B.b.k(s)},
$S:9}
A.b1.prototype={
aG(){return"CombatAdvantage."+this.b}}
A.bE.prototype={}
A.em.prototype={
ah(b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6=this,b7="soldierHp"
t.eg.a(c4)
s=c4==null?b8.ax:c4
r=b9.ax
q=c7==null
p=q?b8.gO():c7
o=c3==null
n=o?b9.gO():c3
m=b8.f
l=b8.at
k=b9.f
j=b9.at
i=b8.a+":"+A.u(m)+":"+b8.w+":"+A.u(l)+":"+A.u(b8.ay)+":"+b9.a+":"+A.u(k)+":"+b9.w+":"+A.u(j)+":"+A.u(b9.ay)+":"+c5+":"+c0+":"+c8+":"+p+":"+n+":"+A.u(s)+":"+A.u(r)+":"+c2+":"+c6+":"+c1
h=b6.c
g=h.i(0,i)
if(g!=null)return g
if(!b6.b.cz())return B.a2
if(q)q=B.a.H(l,0,new A.en(),t.H)
else{q=b6.a.b.i(0,b7)
q.toString
q=p*B.b.k(q)}f=m+q
q=b6.a
l=q.b
e=l.i(0,b7)
e.toString
d=B.b.k(e)
c=Math.min(n,B.b.W(c2/d))
b=c*d+Math.max(0,c2-n*d)
if(o&&c2===0)o=B.a.H(j,0,new A.eo(),t.H)
else{o=l.i(0,b7)
o.toString
o=n*B.b.k(o)}a=k+o
o=c5===0
a0=b6.bG(s,o&&m>0,c6)
a1=c0===0
a2=b6.bG(r,a1&&k>0,c1)
a1=o&&a1
a3=b6.bw(b8,p,c5,c8,a1)
a4=b6.bw(b9,n-c,c0,c8,a1)
o=a0.a
m=o[0]
a5=m>=a&&a2.a[0]>=f||o[2]>=f
l=a2.a
k=l[0]
a6=Math.max(0,f-k-o[2])
j=o[1]
a7=Math.max(0,a-j-l[3]-b)
a8=Math.max(0,f-l[1]-o[3])
a9=Math.max(0,a-m-l[2]-b)
b0=Math.max(1,f*a3+a*a4)
b1=(a6*a3*0.9-a7*a4*1.1)/b0
b2=(a8*a3*1.1-a9*a4*0.9)/b0
b3=q.r.k1
if(a5)b4=B.K
else if(b1>b3)b4=B.h
else{q=b2<-b3?B.p:B.a1
b4=q}q=A.c([],t.s)
if(c5>0||c0>0)q.push("\u57ce\u9632\u4ec5\u4fee\u6b63\u653b\u51fb\uff0c\u5b88\u65b9\u6b66\u5668\u8d21\u732e\u4e3a\u96f6")
if(s.length>1)q.push("\u672c\u6b21\u5bf9\u9635\u53ea\u8ba1\u9996\u4ef6\u6b66\u5668\uff0c\u5176\u4f59\u7559\u5f85\u4e0b\u4e00\u4f4d\u5b88\u5c06")
if(a5)q.push("\u5b58\u5728\u5148\u624b\u81f4\u547d\u6216\u81ea\u4f24\u98ce\u9669")
q.push("\u4f59\u91cf\u4e3a\u9759\u6001\u98ce\u9669\u6307\u6807\uff0c\u5e76\u975e\u80dc\u7387")
b5=new A.bE(b4,b1,b2,j,k,a5)
if(h.a>=256)h.ag(0,new A.a5(h,A.o(h).h("a5<1>")).gG(0))
h.u(0,i,b5)
return b5},
cE(a,b,c,d,e,f){return this.ah(a,b,c,!0,0,d,e,0,!0,f,0)},
cG(a,b,c,d,e,f,g,h){return this.ah(a,b,c,d,0,e,f,0,g,h,0)},
bM(a,b,c,d){return this.ah(a,b,0,!0,0,null,null,c,!0,d,0)},
b5(a,b,c,d,e,f){return this.ah(a,b,0,c,0,null,null,d,e,f,0)},
cC(a,b,c,d,e){return this.ah(a,b,0,c,0,null,null,0,d,null,e)},
cF(a,b,c,d,e,f,g){return this.ah(a,b,0,c,0,null,d,0,e,f,g)},
cD(a,b,c,d,e){return this.ah(a,b,0,!0,c,null,null,d,!0,e,0)},
bw(a,b,c,d,e){var s=this.a,r=s.b3(a.w,c,e,d)
s=s.b.i(0,"soldierPower")
s.toString
return(B.c.bC(r+b*B.b.k(s)+2,4)+1)*1.5*(1+B.b.v(a.ay/1000,0,0.1))},
bG(a,b,c){var s,r,q,p,o,n,m,l,k
t.L.a(a)
if(!b)return new A.bu([0,0,0,0])
for(s=this.a,r=s.f,s=s.b,q=0,p=0,o=0,n=0,m=0;l=a.length,m<Math.min(l,1);++m){if(!(m<l))return A.l(a,m)
k=r.i(0,a[m])
if(k==null)continue
l=m===0
if(l&&c){q+=k.c
o+=k.d}if(!(l&&c)){l=s.i(0,"weaponChance")
l.toString
l=l>0}else l=!0
if(l){p+=k.c
n+=k.d}}return new A.bu([p,q,n,o])}}
A.en.prototype={
$2(a,b){return A.v(a)+A.aj(b)},
$S:14}
A.eo.prototype={
$2(a,b){return A.v(a)+A.aj(b)},
$S:14}
A.iq.prototype={
$2(a,b){var s
A.v(a)
s=this.a.f.i(0,A.f(b))
s=s==null?null:s.c
if(s==null)s=0
return a+s*this.b.w},
$S:43}
A.cz.prototype={
F(){var s=this
return A.O(["interval",s.a,"resourceInterval",s.e,"cashBuffer",s.f,"payrollRatio",s.r,"threat",s.b,"urgent",s.c,"margin",s.d,"commit",s.w,"rearExtra",s.y,"candidates",s.z,"assessments",s.Q,"routes",s.as,"plans",s.at,"commands",s.ax,"team",s.ay,"fronts",s.cx,"singleFrontMonths",s.cy,"splitForce",s.db,"splitAdvantage",s.dx,"arrivalSpread",s.dy,"expeditionSeconds",s.fr,"assaultCommitDistance",s.fx,"recallCriticalMargin",s.fy,"attritionCombat",s.go,"attritionGain",s.id,"targets",s.ch,"slice",s.CW,"advantage",s.k1,"expansion",s.k3,"credit",s.k2,"age",s.x,"timeout",s.k4,"restarts",s.ok,"stagnation",s.p1],t.N,t.X)}}
A.aq.prototype={}
A.eq.prototype={
bh(){return new A.ar(this.c4(),t.gL)},
c4(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6
return function $async$bh(i7,i8,i9){if(i8===1){p.push(i9)
r=q}for(;;)switch(r){case 0:i4={}
i5=s.c
i6=s.a
if(i5.b!==i6.a||i5.c!==s.b.a)throw A.h(B.a7)
o=i5.Q
n=o.f
if(n.length>64||o.r.length>256||o.w.length>32)throw A.h(B.a8)
m=s.e
m===$&&A.aK()
l=s.f
l===$&&A.aK()
k=new A.hC(o,i6,m,l)
j=o.gU(),i=J.H(j.a),j=new A.S(i,j.b,j.$ti.h("S<1>")),h=s.x
case 3:if(!j.j()){r=4
break}g=i.gn()
h.u(0,g.a,k.d0(g))
r=5
return i7.b=0,1
case 5:r=3
break
case 4:j=i5.as
i=A.j(j)
g=i.h("d<1>")
j=A.p(new A.d(j,i.h("e(1)").a(new A.ez(s)),g),g.h("b.E"))
f=A.ja(o,i6,m,j)
i4.a=f
j=i5.x
r=j===B.E?6:7
break
case 6:o=s.r
o===$&&A.aK()
s.w=new A.hf(i5,i6,o,l,h).cW(f)
r=8
return i7.b=1,1
case 8:r=1
break
case 7:i=t.Z
e=A.c([],i)
g=t.s
d=A.c([],g)
c=s.d
b=s.r
b===$&&A.aK()
a=new A.eX(i5,i6,c,l,b,h)
a0=A.o(h).h("af<2>")
a1=a0.h("d<b.E>")
a2=A.p(new A.d(new A.af(h,a0),a0.h("e(b.E)").a(new A.eA()),a1),a1.h("b.E"))
B.a.C(a2,new A.eB())
a0=t.bQ
a3=A.c([new A.aq(i4.a,A.c([],i),A.c([],g),0,0)],a0)
g=j===B.k
a1=g?A.c([],t.bL):a2
a4=a1.length
a5=t.N
a6=t.S
a7=i6.r
a8=a7.ax
a9=t.I
b0=t.dp
b1=t.aQ
b2=a7.at
b3=0
case 9:if(!(b3<a1.length)){r=11
break}b4=a1[b3]
b5=A.c([],a0)
b6=a3.length,b7=0
case 12:if(!(b7<a3.length)){r=14
break}b8=a3[b7]
b9=a.bL(b4,b8.a),c0=b9.$ti,b9=new A.aI(b9.a(),c0.h("aI<1>")),c1=b8.d,c2=b8.e,c3=b8.c,c4=b8.b,c0=c0.c
case 15:if(!b9.j()){r=16
break}c5=b9.b
if(c5==null)c5=c0.a(c5)
c6=A.p(c4,a9)
B.a.E(c6,c5.b)
if(B.a.H(c6,0,new A.eM(),a6)>a8){c.e=!0
r=15
break}c7=c5.a
c8=A.p(c3,a5)
c9=c5.e
if(c9.length!==0)c8.push(c9)
c9=c5.c
c5=c5.d?1:0
B.a.l(b5,new A.aq(c7,c6,c8,c1+c9,c2+c5))
r=17
return i7.b=1,1
case 17:r=15
break
case 16:case 13:a3.length===b6||(0,A.w)(a3),++b7
r=12
break
case 14:if(b5.length!==0){B.a.C(b5,new A.eQ())
b6=A.f(Math.min(4,b2))
b9=new A.D(b5,0,b6,b1)
b9.Z(b5,0,b6,b0)
a3=b9.a7(0)}case 10:a1.length===a4||(0,A.w)(a1),++b3
r=9
break
case 11:if(a2.length!==0&&!g){d0=B.a.gG(a3)
i4.a=d0.a
B.a.E(e,d0.b)
B.a.E(d,d0.c)
a0=d0.e
if(a0>0){a0=""+a0
B.a.l(d,c.e?"\u89c4\u5212\u914d\u989d\u5df2\u7528\u5c3d\uff1a"+a0+" \u5ea7\u57ce\u5c1a\u672a\u627e\u5230\u5b8c\u6574\u65b9\u6848\uff0c\u4e0d\u80fd\u636e\u6b64\u65ad\u5b9a\u65e0\u6cd5\u633d\u6551":"unsalvageableDefense\uff1a"+a0+" \u5ea7\u57ce\u5728\u5f53\u524d\u9501\u5b9a\u3001\u8d44\u91d1\u6216\u65f6\u9650\u4e0b\u672a\u627e\u5230\u5b8c\u6574\u4fee\u590d\u65b9\u6848")}d1="defending"}else d1="preparing"
if(a2.length!==0)d1="defending"
r=18
return i7.b=2,1
case 18:for(a0=o.r,a1=A.j(a0),a4=a1.h("e(1)"),a9=a4.a(new A.eR(s)),a1=a1.h("d<1>"),b0=a1.h("e(b.E)").a(new A.eS(s)),a9=new A.d(a0,a9,a1).gB(0),b0=new A.S(a9,b0,a1.h("S<b.E>")),b1=t.w,b2=t.e,b6=t.Y,b9=i6.b;b0.j();){c0=a9.gn()
if(c0.e!==1||c0.f>=c0.r*0.25||c0.k2<2||c0.k3<=0||B.a.J(c0.ax,new A.eT(s)))continue
d2=o.X(c0.k1)
if(d2!=null){c1=c0.gaJ()
c2=c0.k3
c3=d2.gaJ()
c4=Math.max(1,c0.k4)
c5=b9.i(0,"retreatSurvivalRatio")
c5.toString
c5=c1/c2>=c3/c4*c5
c1=c5}else c1=!0
if(c1)continue
c1=i4.a
c2=c0.a
if(c1.as.q(0,c2))continue
i4.a.as.l(0,c2)
c1=A.c([new A.x(B.P,c2,null,null,0,B.d)],b1)
c2=A.c([c0,d2],b2)
c0=o.L(c0.c)
c0.toString
B.a.l(e,new A.M("\u9ad8\u7ea7\u5c06\u9886\u751f\u547d\u4f4e\u4e8e\u56db\u5206\u4e4b\u4e00\uff0c\u5df2\u53d1\u751f\u7684\u4f24\u5bb3\u663e\u793a\u80dc\u671b\u6e3a\u832b\uff0c\u7533\u8bf7\u6709\u98ce\u9669\u7684\u5408\u6cd5\u64a4\u9000",c1,b.ac(c2,A.c([c0],b6)),B.r,0,!0))}r=19
return i7.b=3,1
case 19:a9=a1.h("b.E")
d3=A.p(new A.d(a0,a4.a(new A.eU(i4,s)),a1),a9)
b0=d3.length,c0=o.b,b3=0
case 20:if(!(b3<d3.length)){r=22
break}d4=d3[b3]
c1=d4.a
d5=i4.a.y.i(0,c1)
c2=i4.a
d6=c2.d<c2.S().a
c2=d5==null
if((c2?null:d5.as)===!0){c3=c2?null:d5.d
c3=d4.cx==c3&&!d6}else c3=!1
if(c3){r=21
break}if((c2?null:d5.b)==="intercept")if(o.X(c2?null:d5.r)!=null){c3=h.i(0,c2?null:d5.d)
if(c3==null)c3=null
else c3=c3.d.length!==0||c3.a.at!=null
c3=c3!==!0
d7=c3}else d7=!0
else d7=!1
if(d7&&!d6&&d5.z>c0&&d4.f>=d4.r*0.65){r=21
break}d8=!c2&&d5.y<c0
d9=A.iZ(d4,o,i4.a)
c3=!1
if(A.mf(d4,o,i4.a,i6))if(i4.a.d>0)c3=d4.f>=d4.r*0.25||o.A(d9.a).length===0
if(c3){B.a.l(d,c1+"\u5df2\u4e34\u8fd1\u4e3b\u653b\u76ee\u6807\uff0c\u4fdd\u6301\u8fdb\u653b\uff0c\u4e0d\u56e0\u666e\u901a\u9884\u8b66\u6216\u6574\u5907\u9884\u7b97\u6298\u8fd4")
r=21
break}if((c2?null:d5.b)==="expedition"&&!d8&&!d6&&d4.f>=d4.r*0.65&&d5.x+1<d5.w.length){r=21
break}if(!d6&&!d7&&!d8&&d4.f>=d4.r*0.65&&d4.as!==B.n){r=21
break}e0=h.i(0,d4.c)
c1=o.gU()
c2=c1.$ti
c3=c2.h("d<b.E>")
e1=A.p(new A.d(c1,c2.h("e(b.E)").a(new A.eV(i4,s)),c3),c3.h("b.E"))
B.a.C(e1,new A.eW(d4))
c1=A.j(e1)
c2=c1.h("D<1>")
c3=new A.D(e1,0,3,c2)
c3.Z(e1,0,3,c1.c)
c3=new A.t(c3,c3.gm(0),c2.h("t<k.E>"))
c1=e0==null
c4=d4.f<d4.r*0.65
c2=c2.h("k.E")
while(c3.j()){c5=c3.d
if(c5==null)c5=c2.a(c5)
if(!c.a2())break
e2=m.an(d4,c5.e,o,!0,c5)
c6=i4.a
c7=h.i(0,c5.a)
if(c7==null)c7=null
else c7=c7.d.length!==0||c7.a.at!=null
if(d6)c8="\u73b0\u6709\u56fd\u5e93\u4e0d\u8db3\u4ee5\u7ee7\u7eed\u4f9b\u517b\u8fdc\u7a0b\u4efb\u52a1\uff0c\u56de\u57ce\u7f29\u51cf\u7cae\u8349\u652f\u51fa"
else if(c4)c8="\u5c06\u9886\u53d7\u4f24\uff0c\u56de\u57ce\u6062\u590d\u751f\u547d\u540e\u518d\u6218"
else if(d8)c8="\u539f\u4efb\u52a1\u5df2\u8d85\u8fc7\u6267\u884c\u65f6\u9650\uff0c\u56de\u57ce\u91cd\u65b0\u6574\u5907"
else c8=d7?"\u622a\u51fb\u76ee\u6807\u5df2\u6d88\u5931\uff0c\u56de\u57ce\u7ed3\u675f\u672c\u6b21\u4efb\u52a1":"\u91ce\u5916\u6307\u4ee4\u5df2\u5b8c\u6210\uff0c\u56de\u57ce\u7b49\u5f85\u65b0\u4efb\u52a1"
if(c1)c9=null
else c9=e0.d.length!==0||e0.a.at!=null
c9=c9===!0?e0.gab():1/0
e3=b.c0(c6,d4,e2,!0,c9,!0,c7!==!0,c8,"regroup",c5)
if(e3!=null){i4.a=e3.a
B.a.l(e,e3.b)
break}}r=23
return i7.b=4,1
case 23:case 21:d3.length===b0||(0,A.w)(d3),++b3
r=20
break
case 22:e4=A.p(new A.d(a0,a4.a(new A.eC(i4,s)),a1),a9)
B.a.C(e4,new A.eD(s))
a0=i5.y
a1=i5.z
e5=A.d2(o,i4.a,i6,a1,a0)
a4=A.X(a6,a6)
for(a9=e5.f,b0=new A.b4(a9,a9.r,a9.e,A.o(a9).h("b4<1>"));b0.j();){c0=b0.d
c1=a9.i(0,c0)
c1=c1==null?null:c1.length
a4.u(0,c0,c1==null?0:c1)}e6=e5.gY()
if(e6==null)e6=e5.gbU()
if(e5.gY()!=null&&a2.length===0)d1="attacking"
if(B.a.gG(a3).e===0)e7=!g||B.a.b6(a2,new A.eE())
else e7=!1
g=e4.length,a9=i5.w>a7.p1/a7.a,b0=a7.dx,i5=i5.f,c0=a7.k2,c1=a7.ay,a7=a7.ch,c2=A.j(n),c3=c2.h("e(1)"),c2=c2.h("d<1>"),c4=c2.h("b.E"),e8=0,e9=1,f0=!1,b3=0
case 24:if(!(b3<e4.length)){r=26
break}d4=e4[b3]
f1={}
if(e7){c5=d4.a
c5=i4.a.as.q(0,c5)||i4.a.z.q(0,c5)}else c5=!0
if(c5){r=25
break}f2=o.L(d4.c)
c5=f2.a
b4=h.i(0,c5)
c6=b4==null
if(c6)c7=null
else c7=b4.d.length!==0||b4.a.at!=null
if(c7===!0){if(c6)c7=null
else{c7=b4.f
c7=c7==null?null:c7.a}c7=c7!==B.h}else c7=!1
if(c7){r=25
break}if(c6)c7=null
else c7=b4.d.length!==0||b4.a.at!=null
c8=i4.a
if(c7===!0){c7=c8.ae(f2)
c8=i4.a
c9=f2.at
if(c9==null){c8=c8.x.i(0,c5)
if(c8==null)c8=f2.d}else{c8=f2.ax
f3=f2.cy?1:0
f3=B.c.v(c9-c8-f3,0,5)
c8=f3}f4=Math.min(c7,c8)}else f4=c8.ae(f2)
if(i4.a.A(c5).length<=f4){r=25
break}if(c6)c5=null
else c5=b4.d.length!==0||b4.a.at!=null
if(c5===!0&&!s.bz(f2,d4,i4.a)){r=25
break}f5=A.d2(o,i4.a,i6,a1,a0)
f6=A.p(new A.d(n,c3.a(new A.eF(s,f5,a4)),c2),c4)
B.a.C(f6,new A.eG(s,f5,d4))
f1.a=null
c5=A.j(f6)
c6=c5.h("D<1>")
c7=new A.D(f6,0,a7,c6)
c7.Z(f6,0,a7,c5.c)
c7=new A.t(c7,c7.gm(0),c6.h("t<k.E>"))
c6=c6.h("k.E")
f7=null
f8=-1/0
case 27:if(!c7.j()){r=28
break}c5=c7.d
f9=c5==null?c6.a(c5):c5
if(!c.a2()){r=28
break}g0=f9.a
c5=o.A(g0)
c8=A.j(c5).h("N<1>")
c5=new A.N(c5,c8)
c9=f9.at
if(c9==null)c9=f9.d
else{f3=f9.ax
g1=f9.cy?1:0
g1=B.c.v(c9-f3-g1,0,5)
c9=g1}f3=new A.D(c5,0,c9,c8.h("D<k.E>"))
f3.Z(c5,0,c9,c8.h("k.E"))
g2=f3.a7(0)
e2=m.aL(d4,f9.e,o,f9)
if(!e2.d){r=27
break}g3=b.bb(d4,i4.a)
for(c5=g3.length,g4=!1,b7=0;b7<g3.length;g3.length===c5||(0,A.w)(g3),++b7){g5=g3[b7]
g6=A.ik(d4,f9,o,i6,l,g5,a9&&i4.a.d>100?0.05:0)
g7=g6.a
g8=g6.b
g4=g8>0
if(!g4)continue
if(f5.gY()!=null&&g0!==f5.gY())c8=g8!==1||g7<b0
else c8=!1
if(c8)continue
g9=a4.i(0,g0)
if(g9==null)g9=0
h0=g8-g9
if(h0<=0)continue
e9=Math.max(e9,g8)
e3=s.bx(i4.a,d4,f9,g5,h0,g9)
if(e3==null){h1=i4.a.M()
h1.d=1e6
h2=s.bx(h1,d4,f9,g5,h0,g9)
if(h2!=null){if(a2.length===0)d1="saving"
c8=h1.d
c9=h2.a
h3=c8-c9.d+c9.S().a
e8=e8===0?h3:Math.min(e8,h3)
if(e6==null)e6=g0}else if(a2.length===0)d1="preparing"
continue}c5=A.bD(f9,d4,o,i6,i5)
c8=i4.a.d
c9=e3.a.d
f3=B.a.aO(g5,1).H(0,0,new A.eH(s),a6)
g1=b9.i(0,"weaponChance")
g1.toString
h4=c5-e2.b*0.4-(c8-c9)*0.5+g7*30+f3*c0*g1*0.02
if(h4>f8){f1.a=e3
e9=e3.b.d.length
f8=h4
f7=f9}break}if(!g4&&e6==null){e9=Math.max(1,Math.min(c1,g2.length))
e6=g0}r=29
return i7.b=5,1
case 29:r=27
break
case 28:c5=f1.a
if(c5!=null){c5=B.a.H(e,0,new A.eI(),a6)
c6=f1.a
c5=c5+c6.b.b.length<=a8}else{c6=c5
c5=!1}if(c5){i4.a=c6.a
B.a.l(e,c6.b)
e6=f7.a
a4.aA(e6,new A.eJ(f1),new A.eK(f1))
f0=!0}r=30
return i7.b=6,1
case 30:case 25:e4.length===g||(0,A.w)(e4),++b3
r=24
break
case 26:r=j===B.D&&!f0&&B.a.H(e,0,new A.eL(),a6)<a8-3?31:32
break
case 31:i5=o.gU(),i6=J.H(i5.a),i5=new A.S(i6,i5.b,i5.$ti.h("S<1>"))
case 33:if(!i5.j()){r=34
break}o=i6.gn()
m=o.a
l=h.i(0,m)
if(l==null)l=null
else l=l.d.length!==0||l.a.at!=null
if(l===!0){r=33
break}if(!c.a2()){r=34
break}h5=i4.a.A(m)
b5=i4.a.M()
l=A.j(h5)
j=l.h("d<1>")
h6=A.p(new A.d(h5,l.h("e(1)").a(new A.eN(i4)),j),j.h("b.E"))
B.a.C(h6,new A.eO())
h7=B.a.J(n,new A.eP(s))&&h5.length<i4.a.ae(o)+e9
if(h6.length!==0){l=h5.length
j=i4.a
g=o.at
if(g==null){j=j.x.i(0,m)
if(j==null)j=o.d}else{j=o.ax
a0=o.cy?1:0
a0=B.c.v(g-j-a0,0,5)
j=a0}if(l<j)l=h7&&h5.length>=o.y
else l=!0}else l=!1
if(l)if(b5.aB(o,B.a.gG(h6))&&b5.d>=b5.S().a){i4.a=b5
B.a.l(e,new A.M("\u5148\u6269\u5145\u5b89\u5168\u8fce\u6218\u540d\u989d\u548c\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u8003\u8651\u62db\u5c06\u4e0e\u8fdc\u5f81",A.c([new A.x(B.l,B.a.gG(h6).a,m,null,0,B.d)],b1),b.ac(A.c([B.a.gG(h6)],b2),A.c([o],b6)),B.r,b5.S().a,!1))
r=34
break}if(h7&&b5.cZ(o)&&b5.d>=b5.S().a){i4.a=b5
B.a.l(e,new A.M("\u4e3a\u7559\u5b88\u4e0e\u8fdc\u5f81\u7684\u771f\u5b9e\u7f3a\u53e3\u62bd\u53d6\u82f1\u96c4\uff0c\u9884\u7559\u6700\u9ad8\u624b\u7eed\u8d39\u548c\u6708\u4ff8",A.c([new A.x(B.v,null,m,null,0,B.d)],b1),b.ac(A.c([],b2),A.c([o],b6)),B.r,b5.S().a,!1))
r=34
break}l=i4.a.f
j=h5.length
g=b9.i(0,"soldierLimit")
g.toString
g=Math.min(l,j*B.b.k(g))
j=i4.a
h8=g-j.e
if(h8>0){h9=j.M()
l=b9.i(0,"soldierBatch")
l.toString
i0=Math.min(B.b.k(l),h8)
if(h9.ar(i0)&&h9.d>=h9.S().a){i4.a=h9
B.a.l(e,new A.M("\u8865\u5145\u8fd1\u671f\u5b88\u57ce\u548c\u51fa\u5f81\u6240\u9700\u5175\u5458\uff0c\u4e0d\u586b\u6ee1\u6ca1\u6709\u4efb\u52a1\u7684\u5168\u56fd\u5bb9\u91cf",A.c([new A.x(B.m,null,m,null,i0,B.d)],b1),b.ac(A.c([],b2),A.c([o],b6)),B.r,h9.S().a,!1))
r=34
break}}r=35
return i7.b=7,1
case 35:r=33
break
case 34:case 32:if(f0)d1=a2.length===0?"attacking":"defending"
if(e.length===0){i5=i4.a
B.a.l(d,i5.d<i5.S().a?"\u8d44\u91d1\u4e0d\u8db3\u4ee5\u8986\u76d6\u73b0\u6709\u90e8\u961f\u548c\u6b20\u6536\u6708\u4ff8\uff0c\u7b49\u5f85\u6574\u5907":"\u6ca1\u6709\u6ee1\u8db3\u5b88\u57ce\u3001\u65f6\u9650\u53ca\u9759\u6001\u98ce\u9669\u7ea6\u675f\u7684\u65b0\u589e\u884c\u52a8\uff0c\u4fdd\u6301\u5df2\u6709\u4efb\u52a1")}if(a9)B.a.l(d,"\u505c\u6ede\u8bca\u65ad\uff1a"+(d1==="saving"?"\u7f3a\u5c11\u6574\u961f\u540e\u52e4\u8d44\u91d1":"\u7f3a\u5c11\u53ef\u5b89\u5168\u6267\u884c\u7684\u6269\u5f20\u6761\u4ef6")+"\uff0c\u4e0d\u901a\u8fc7\u65e0\u9650\u62db\u52df\u6216\u81ea\u6740\u51fa\u51fb\u6253\u7834\u7b49\u5f85")
i1=A.c([],i)
for(i5=e.length,i2=0,b3=0;b3<e.length;e.length===i5||(0,A.w)(e),++b3){i3=e[b3]
i2+=i3.b.length
if(i2>a8){c.e=!0
B.a.l(d,"\u547d\u4ee4\u914d\u989d\u5230\u8fbe\uff0c\u53ea\u63d0\u4ea4\u524d\u9762\u5b8c\u6574\u7684\u52a8\u4f5c\u7ec4\uff0c\u540e\u7eed\u7559\u5f85\u4e0b\u4e00\u6b21\u89c4\u5212")
break}B.a.l(i1,i3)}s.w=new A.bI(d1,e6,e8,e9,i1,A.a1(d,0,A.Z(12,"count",a6),a5).a7(0),c.e,c.c,c.d,c.b)
case 1:return 0
case 2:return i7.c=p.at(-1),3}}}},
bz(a,b,c){var s,r,q=a.a,p=this.x.i(0,q),o=p==null?null:p.d
if(o==null)o=A.c([],t.k)
if(o.length===0)return!0
q=c.A(q)
p=A.j(q)
s=p.h("d<1>")
q=A.p(new A.d(q,p.h("e(1)").a(new A.ex(b)),s),s.h("b.E"))
p=A.j(q).h("N<1>")
r=A.a1(new A.N(q,p),0,A.Z(c.N(a),"count",t.S),p.h("k.E")).a7(0)
if(r.length===0)return!1
return B.a.b6(o,new A.ey(this,r,c,a))},
bx(c5,c6,c7,c8,c9,d0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2=this,c3=null,c4="soldierLimit"
t.L.a(c8)
s=t.e
r=A.c([],s)
for(q=c2.c.Q,p=q.gU(),o=J.H(p.a),p=new A.S(o,p.b,p.$ti.h("S<1>")),n=c2.x,m=c6.c;p.j();){l=o.gn()
k=l.a
j=n.i(0,k)
if(j==null)j=c3
else j=j.d.length!==0||j.a.at!=null
if(j===!0&&k!==m)continue
i=c5.ae(l)
h=Math.max(0,c5.A(k).length-i)
l=c5.A(k)
k=A.j(l)
j=k.h("d<1>")
g=A.p(new A.d(l,k.h("e(1)").a(new A.es(c5)),j),j.h("b.E"))
B.a.C(g,new A.et(c2))
l=A.j(g)
k=new A.D(g,0,h,l.h("D<1>"))
k.Z(g,0,h,l.c)
B.a.E(r,k)}if(!B.a.q(r,c6))return c3
B.a.ag(r,c6)
B.a.C(r,new A.eu(c2))
p=c2.e
p===$&&A.aK()
o=c7.e
f=p.aL(c6,o,q,c7)
if(!f.d)return c3
e=A.c([c6],s)
s=t.N
d=A.O([c6.a,f],s,t.bJ)
c=f.b
for(m=c2.a,l=m.r,k=t.S,j=A.a1(r,0,A.Z(l.ay*2,"count",k),t.r),b=j.$ti,j=new A.t(j,j.gm(0),b.h("t<k.E>")),a=l.dy,b=b.h("k.E"),a0=c;j.j();){a1=j.d
if(a1==null)a1=b.a(a1)
if(e.length>=c9)break
a2=p.aL(a1,o,q,c7)
if(!a2.d)continue
a3=a2.b
a4=Math.min(c,a3)
a5=Math.max(a0,a3)
if(a5-a4>a)continue
B.a.l(e,a1)
d.u(0,a1.a,a2)
a0=a5
c=a4}if(e.length<c9)return c3
a6=A.c([],t.w)
a7=A.c([],t.m)
a8=A.X(s,s)
s=q.A(c7.a)
p=A.j(s).h("N<1>")
a9=A.a1(new A.N(s,p),0,A.Z(c7.ga9(),"count",k),p.h("k.E")).a7(0)
for(s=l.ax,m=m.b,p=c9===1,o=t.A,b0=c5,b1=0;b1<e.length;++b1){b2=e[b1]
l=b2.c
k=n.i(0,l)
if(k==null)k=c3
else k=k.d.length!==0||k.a.at!=null
if(k===!0){k=q.L(l)
k.toString
k=!c2.bz(k,b2,b0)}else k=!1
if(k)return c3
k=d.i(0,b2.a)
k.toString
if(b1===0)j=A.c([c8],o)
else{j=c2.r
j===$&&A.aK()
j=j.bb(b2,b0)}b=j.length
a1=d0+b1
a3=b1>0
b3=c3
b4=0
for(;b4<j.length;j.length===b||(0,A.w)(j),++b4){b5=j[b4]
if(a3&&B.a.J(a9,new A.ev(c2,b2,c7,b5)))continue
for(b6=q.gU(),b7=J.H(b6.a),b6=new A.S(b7,b6.b,b6.$ti.h("S<1>")),b8=0;b6.j();){b9=b7.gn()
c0=b9.a
c1=b0.A(c0).length
b9=Math.min(Math.max(0,c1-(c0===l?1:0)),b0.ae(b9))
c1=m.i(0,c4)
c1.toString
b8+=b9*B.b.k(c1)}b6=c2.r
b6===$&&A.aK()
b7=p?"\u56f4\u7ed5\u4e3b\u653b\u76ee\u6807\u6295\u5165\u8db3\u591f\u6218\u529b\uff0c\u4fdd\u7559\u5176\u4ed6\u65b9\u5411\u5175\u529b":"\u96c6\u4e2d\u4f18\u52bf\u7f16\u961f\u8f6e\u653b\u540c\u4e00\u5ea7\u57ce\uff0c\u62b5\u8fbe\u95f4\u9694\u4e0d\u8d85\u8fc7"+B.b.k(a)+"\u79d2"
b9=b0.f
c0=m.i(0,c4)
c0.toString
b3=b6.bf(b0,b2,k,b5,Math.min(b8,Math.max(0,b9-B.b.k(c0))),a1,b7,"expedition",c7)
if(b3!=null)break}if(b3==null)return c3
b0=b3.a
l=b3.b
B.a.E(a6,l.b)
B.a.E(a7,l.d)
a8.E(0,l.c)
if(a6.length>s){c2.d.e=!0
return c3}}s=c2.r
s===$&&A.aK()
a8.E(0,s.ac(a9,A.c([],t.Y)))
s=p?"\u6267\u884c\u9759\u6001\u4f18\u52bf\u660e\u786e\u3001\u53ef\u4ee5\u4f9b\u517b\u7684\u6269\u5f20":"\u6574\u961f\u540e\u52e4\u51c6\u5907\u5b8c\u6210\uff0c\u6309\u771f\u5b9e\u6392\u961f\u89c4\u5219\u8f6e\u653b\uff1b\u4e0d\u9884\u6f14\u672a\u6765\u4f24\u4ea1"
return new A.d5(b0,new A.M(s,a6,a8,a7,b0.S().a,!1))}}
A.ez.prototype={
$1(a){var s,r,q
t.J.a(a)
s=this.a.c.Q
r=s.X(a.a)
q=!1
if(r!=null)if(r.b===s.a)if(!r.fy)if(r.f>0){s=r.as
s=!(s===B.f||s===B.e)&&r.id===a.at}else s=q
else s=q
else s=q
else s=q
return s},
$S:15}
A.eA.prototype={
$1(a){t.b.a(a)
return a.d.length!==0||a.a.at!=null},
$S:23}
A.eB.prototype={
$2(a,b){var s,r=t.b
r.a(a)
r.a(b)
s=B.b.t(a.gab(),b.gab())
return s!==0?s:B.b.t(b.r+b.a.r*4,a.r+a.a.r*4)},
$S:40}
A.eM.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:16}
A.eQ.prototype={
$2(a,b){var s,r=t.dp
r.a(a)
r.a(b)
r=a.e
s=b.e
return r!==s?B.c.t(r,s):B.b.t(b.d,a.d)},
$S:53}
A.eR.prototype={
$1(a){t.r.a(a)
return a.b===this.a.c.Q.a&&!a.fy&&a.fx},
$S:0}
A.eS.prototype={
$1(a){t.r.a(a)
return this.a.c.x!==B.k},
$S:0}
A.eT.prototype={
$1(a){var s=this.a.a.f.i(0,A.f(a))
return(s==null?null:s.d)===0},
$S:37}
A.eU.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.Q.a&&a.dx&&s.x!==B.k&&!a.fy&&!this.a.a.as.q(0,a.a)},
$S:0}
A.eV.prototype={
$1(a){var s,r,q,p,o,n,m=null
t.q.a(a)
s=this.a
r=a.a
q=s.a.K(r)
p=this.b
o=p.x
n=o.i(0,r)
if(n==null)n=m
else n=n.d.length!==0||n.a.at!=null
s=s.a
if(q<(n===!0?s.N(a):Math.max(s.N(a),a.y+p.a.r.y))){s=o.i(0,r)
if(s==null)s=m
else s=s.d.length!==0||s.a.at!=null
if(s===!0){s=o.i(0,r)
if(s==null)s=m
else{s=s.f
s=s==null?m:s.a}s=s===B.h}else s=!0}else s=!1
return s},
$S:1}
A.eW.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(a.e.I(s),b.e.I(s))},
$S:6}
A.eC.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.Q.a&&a.db&&s.x!==B.F&&!a.fy&&!this.a.a.z.q(0,a.a)},
$S:0}
A.eD.prototype={
$2(a,b){var s,r,q,p="maxLevel",o=t.r
o.a(a)
o.a(b)
o=this.a
s=o.c.Q
r=s.L(b.c).d
o=o.a.b
q=o.i(0,p)
q.toString
q=A.at(b,r<B.b.k(q))
s=s.L(a.c).d
o=o.i(0,p)
o.toString
return B.b.t(q,A.at(a,s<B.b.k(o)))},
$S:2}
A.eE.prototype={
$1(a){var s
t.b.a(a)
if(Math.max(0,a.b.length-a.a.ga9())===0){s=a.f
s=(s==null?null:s.a)===B.h}else s=!1
return s},
$S:23}
A.eF.prototype={
$1(a){var s,r
t.q.a(a)
s=this.a
r=!1
if(a.b!==s.c.Q.a)if(this.b.b0(a)){r=this.c.i(0,a.a)
if(r==null)r=0
s=r<s.a.r.ay}else s=r
else s=r
return s},
$S:1}
A.eG.prototype={
$2(a,b){var s,r,q,p=t.q
p.a(a)
p.a(b)
p=this.b
if(a.a===p.gY())p=-1
else if(b.a===p.gY())p=1
else{p=this.a
s=this.c
r=p.c
q=r.Q
p=p.a
r=r.f
r=B.b.t(A.bD(b,s,q,p,r),A.bD(a,s,q,p,r))
p=r}return p},
$S:6}
A.eH.prototype={
$2(a,b){var s,r
A.f(a)
A.f(b)
s=this.a.a.f
r=s.i(0,b)
r=r==null?null:r.c
if(r==null)r=0
s=s.i(0,b)
s=s==null?null:s.d
return a+Math.max(0,r-(s==null?0:s))},
$S:26}
A.eI.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:16}
A.eJ.prototype={
$1(a){return A.f(a)+this.a.a.b.d.length},
$S:5}
A.eK.prototype={
$0(){return this.a.a.b.d.length},
$S:4}
A.eL.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:16}
A.eN.prototype={
$1(a){t.r.a(a)
return a.fr&&!this.a.a.as.q(0,a.a)},
$S:0}
A.eO.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.eP.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.ex.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.ey.prototype={
$1(a){var s=this
return B.a.J(s.b,new A.ew(s.a,t.O.a(a),s.c,s.d))},
$S:10}
A.ew.prototype={
$1(a){var s,r,q,p,o,n=this,m="soldierLimit"
t.r.a(a)
s=n.a
r=s.f
r===$&&A.aK()
q=n.c
p=q.N(n.d)
s=s.a.b
o=s.i(0,m)
o.toString
o=B.b.k(o)
q=q.e
s=s.i(0,m)
s.toString
return r.bM(a,n.b.a,p,Math.min(o,Math.max(0,q-B.b.k(s)))).a===B.h},
$S:0}
A.es.prototype={
$1(a){t.r.a(a)
return a.db&&!this.a.as.q(0,a.a)},
$S:0}
A.et.prototype={
$2(a,b){var s,r,q,p="maxLevel",o=t.r
o.a(a)
o.a(b)
o=this.a
s=o.c.Q
r=s.L(b.c).d
o=o.a.b
q=o.i(0,p)
q.toString
q=A.at(b,r<B.b.k(q))
s=s.L(a.c).d
o=o.i(0,p)
o.toString
return B.b.t(q,A.at(a,s<B.b.k(o)))},
$S:2}
A.eu.prototype={
$2(a,b){var s,r,q,p="maxLevel",o=t.r
o.a(a)
o.a(b)
o=this.a
s=o.c.Q
r=s.L(b.c).d
o=o.a.b
q=o.i(0,p)
q.toString
q=A.at(b,r<B.b.k(q))
s=s.L(a.c).d
o=o.i(0,p)
o.toString
return B.b.t(q,A.at(a,s<B.b.k(o)))},
$S:2}
A.ev.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this,i="soldierLimit"
t.r.a(a)
s=j.a
r=s.f
r===$&&A.aK()
q=j.c
p=q.ga9()
o=s.a
n=o.b
m=n.i(0,i)
m.toString
m=B.b.k(m)
n=n.i(0,i)
n.toString
l=j.d
k=r.cE(j.b,a,p,Math.min(B.b.k(n),B.a.al(s.c.Q.w,new A.er(q)).c),l,m)
return J.iE(l)&&k.b<o.r.dx||k.r||k.c<=o.r.k1||k.b<-0.12},
$S:0}
A.er.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:8}
A.a4.prototype={}
A.eX.prototype={
bL(a,b){return new A.ar(this.cB(a,b),t.dT)},
cB(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e
return function $async$bL(c,d,a0){if(d===1){n.push(a0)
p=o}for(;;)switch(p){case 0:i=s.a_(r,q)
h=r.a
g=h.a
f=q.K(g)<=q.N(h)
e=!1
if(f){m=r.d
if(m.length!==0)if(B.a.b6(m,new A.fH(s,q))){e=q.y
e=!new A.af(e,A.o(e).h("af<2>")).J(0,new A.fI(r))}}p=e?3:4
break
case 3:p=5
return c.b=new A.a4(q,A.c([],t.Z),s.a1(r,q),!1,"\u5df2\u6709\u622a\u51fb\u90e8\u961f\u80fd\u53ca\u65f6\u63a5\u654c\uff0c\u7b49\u5f85\u6267\u884c\u7ed3\u679c\uff0c\u4e0d\u91cd\u590d\u6d3e\u51fa\u7b2c\u4e8c\u652f\u90e8\u961f","hold"),1
case 5:p=1
break
case 4:if(f)e=(i==null?null:i.a)===B.h
else e=!1
p=e?6:7
break
case 6:p=8
return c.b=new A.a4(q,A.c([],t.Z),s.a1(r,q),!1,"\u57ce\u9632\u4e0e\u73b0\u6709\u5b88\u5c06\u8db3\u4ee5\u5e94\u5bf9\u53ef\u89c1\u6765\u654c\uff0c\u7ef4\u6301\u8fdc\u5f81\uff0c\u4e0d\u53ec\u56de\u5c06\u9886","hold"),1
case 8:p=1
break
case 7:e=s.bl(r,q)
l=A.p(e,e.$ti.h("b.E"))
e=A.j(l)
m=e.h("d<1>")
k=A.p(new A.d(l,e.h("e(1)").a(new A.fJ(s,r,i,q)),m),m.h("b.E"))
p=k.length!==0?9:10
break
case 9:p=11
return c.bH(k)
case 11:p=1
break
case 10:p=f&&q.K(g)<q.N(h)?12:13
break
case 12:j=q.M()
p=j.bc(h,!0)&&j.d>=j.aa(!0).a?14:15
break
case 14:p=16
return c.b=s.aq(r,q,j,A.c([new A.x(B.v,null,g,null,0,B.d)],t.w),"\u672c\u5730\u4ecd\u6709\u8fce\u6218\u540d\u989d\uff0c\u5148\u62db\u52df\u8865\u5f3a\uff0c\u518d\u6309\u5b9e\u9645\u5230\u4efb\u5c5e\u6027\u590d\u6838\uff0c\u6682\u4e0d\u53ec\u56de\u8fdc\u5f81"),1
case 16:p=1
break
case 15:case 13:p=17
return c.bH(l)
case 17:case 1:return 0
case 2:return c.c=n.at(-1),3}}}},
bl(a,b){return new A.ar(this.ca(a,b),t.dT)},
ca(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e,d,c,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9,k0,k1,k2,k3,k4,k5,k6
return function $async$bl(k7,k8,k9){if(k8===1){n.push(k9)
p=o}for(;;)switch(p){case 0:k0=r.a
k1=k0.a
k2=q.K(k1)>q.N(k0)
k3=t.Z
k4=A.c([],k3)
k5=s.a1(r,q)
k6=!k2
if(k6){m=s.a_(r,q)
m=(m==null?null:m.a)!==B.h}else m=!0
p=3
return k7.b=new A.a4(q,k4,k5,m,k2?"unsalvageableDefense\uff1a\u5f53\u524d\u5b89\u5168\u540d\u989d "+q.N(k0)+"\uff0c\u9a7b\u519b "+q.K(k1)+"\uff0c\u7b49\u5f85\u5408\u6cd5\u4fee\u590d":"\u4fdd\u6301\u53ef\u51fa\u573a\u5b88\u519b\uff0c\u7ee7\u7eed\u76d1\u63a7\u5168\u90e8\u6765\u654c","local"),1
case 3:k4=s.c
if(!k4.a2()){p=1
break}k5=q.f
m=q.A(k1).length
l=s.b
k=l.b
j=k.i(0,"soldierLimit")
j.toString
i=Math.max(0,Math.min(k5,m*B.b.k(j))-q.e)
p=i>0?4:5
break
case 4:h=q.M()
k5=h.d
m=h.aa(!0)
j=k.i(0,"soldierCost")
j.toString
g=Math.min(i,Math.max(0,B.c.bj(k5-m.a,B.b.k(j))))
p=g>0&&h.ar(g)?6:7
break
case 6:p=8
return k7.b=s.aq(r,q,h,A.c([new A.x(B.m,null,k1,null,g,B.d)],t.w),"\u4f18\u5148\u7528\u56fd\u5e93\u8865\u8db3\u73b0\u6709\u5b88\u519b\u5175\u5458\uff0c\u518d\u5224\u65ad\u662f\u5426\u9700\u8981\u5916\u63f4"),1
case 8:case 7:case 5:k5=k0.at
m=k5==null
p=m?9:10
break
case 9:f=q.M()
e=A.c([],t.w)
j=f.A(k1)
d=A.j(j)
c=d.h("d<1>")
a0=A.p(new A.d(j,d.h("e(1)").a(new A.eY()),c),c.h("b.E"))
B.a.C(a0,new A.eZ())
p=a0.length!==0?11:12
break
case 11:a1=B.a.gG(a0)
j=a1.a
d=f.x
c=k0.d
a2=0
case 13:if(a2<4){a3=d.i(0,k1)
a3.toString
a4=k.i(0,"maxLevel")
a4.toString
a4=a3<B.b.k(a4)
a3=a4}else a3=!1
if(!a3){p=14
break}if(!f.aB(k0,a1)||f.d<f.aa(!0).a){p=14
break}B.a.l(e,new A.x(B.l,j,k1,null,0,B.d))
a3=f.K(k1)
a4=d.i(0,k1)
if(a4==null)a4=c
p=a3<=a4?15:16
break
case 15:p=17
return k7.b=s.aq(r,q,f,e,"\u4f18\u5148\u7531\u9ad8\u5185\u653f\u5c06\u9886\u5347\u7ea7\uff0c\u4fdd\u62a4\u771f\u5b9e\u8fce\u6218\u540d\u989d"),1
case 17:a3=s.a_(r,f)
if((a3==null?null:a3.a)===B.h||k2){p=14
break}case 16:++a2
p=13
break
case 14:case 12:case 10:p=k2?18:19
break
case 18:j=q.A(k1)
d=A.j(j)
c=d.h("d<1>")
a5=A.p(new A.d(j,d.h("e(1)").a(new A.f_()),c),c.h("b.E"))
B.a.C(a5,new A.fa())
j=A.j(a5),d=A.a1(a5,0,A.Z(3,"count",t.S),j.c),c=d.$ti,d=new A.t(d,d.gm(0),c.h("t<k.E>")),a3=k0.cy,a4=k0.ax,a6=k0.d,a7=t.T,a8=t.w,a9=t.e,b0=j.h("e(1)"),j=j.h("d<1>"),c=c.h("k.E")
case 20:if(!d.j()){p=21
break}b1=d.d
if(b1==null)b1=c.a(b1)
if(!k4.a2()){p=21
break}b2=q.M()
e=A.c([],a8)
b3=A.c([b1],a9)
B.a.E(b3,new A.d(a5,b0.a(new A.fl(b1)),j))
b1=b3.length,b4=b2.x,b5=0
case 22:if(!(b5<b3.length)){p=24
break}b6=b3[b5]
b7=b2.K(k1)
if(m){b8=b4.i(0,k1)
if(b8==null)b8=a6}else{b8=a3?1:0
b8=B.c.v(k5-a4-b8,0,5)}if(b7<=b8){p=24
break}if(!b2.bP(b6)){p=23
break}B.a.l(e,new A.x(B.z,b6.a,null,null,0,B.d))
p=m?25:26
break
case 25:b9=b2.M()
c0=A.p(e,a7)
b7=b9.A(k1)
b8=A.j(b7)
c1=b8.h("d<1>")
a0=A.p(new A.d(b7,b8.h("e(1)").a(new A.fn()),c1),c1.h("b.E"))
B.a.C(a0,new A.fo())
p=a0.length!==0?27:28
break
case 27:b7=b9.x
c2=0
for(;;){if(c2<3){b8=b9.K(k1)
c1=b7.i(0,k1)
if(c1==null)c1=a6
c1=b8>c1
b8=c1}else b8=!1
if(!b8)break
if(!b9.aB(k0,B.a.gG(a0)))break
B.a.l(c0,new A.x(B.l,B.a.gG(a0).a,k1,null,0,B.d));++c2}b8=b9.K(k1)
b7=b7.i(0,k1)
if(b7==null)b7=a6
p=b8<=b7&&b9.d>=b9.aa(!0).a?29:30
break
case 29:p=31
return k7.b=s.aq(r,q,b9,c0,"\u5148\u89e3\u96c7\u4f4e\u4ea4\u6362\u4ef7\u503c\u6321\u4f4d\u8005\u7b79\u8d44\uff0c\u4fdd\u7559\u4e3b\u6301\u8005\u5b8c\u6210\u6551\u57ce\u5347\u7ea7"),1
case 31:case 30:case 28:case 26:case 23:b3.length===b1||(0,A.w)(b3),++b5
p=22
break
case 24:b1=b2.K(k1)
if(m){b3=b4.i(0,k1)
if(b3==null)b3=a6}else{b3=a3?1:0
b3=B.c.v(k5-a4-b3,0,5)}p=b1<=b3?32:33
break
case 32:p=34
return k7.b=s.aq(r,q,b2,e,"\u6ca1\u6709\u53ef\u652f\u4ed8\u4e14\u53ca\u65f6\u7684\u5347\u7ea7\u65b9\u6848\uff0c\u6e05\u51fa\u6321\u4f4d\u5b88\u5c06\u5e76\u4fdd\u7559\u6838\u5fc3\u51fa\u573a"),1
case 34:case 33:p=20
break
case 21:case 19:j=q.A(k1)
d=A.j(j)
c=d.h("d<1>")
c3=A.p(new A.d(j,d.h("e(1)").a(new A.fp(q)),c),c.h("b.E"))
B.a.C(c3,new A.fq())
if(k6){k6=r.f
k6=(k6==null?null:k6.a)!==B.h}else k6=!0
p=k6&&s.a.Q.gU().gm(0)>1?35:36
break
case 35:c4=q.M()
k6=r.f
if((k6==null?null:k6.a)===B.p)c4.ax.l(0,k1)
c5=A.c([],k3)
k6=s.a.Q
j=k6.gU()
d=j.$ti
c=d.h("d<b.E>")
c6=A.p(new A.d(j,d.h("e(b.E)").a(new A.fr(k0)),c),c.h("b.E"))
B.a.C(c6,new A.fs(k0))
j=A.a1(c3,0,A.Z(l.r.ay,"count",t.S),A.j(c3).c),d=j.$ti,j=new A.t(j,j.gm(0),d.h("t<k.E>")),c=k0.cy,a3=k0.ax,a4=A.j(c6),a6=a4.c,a4=a4.h("D<1>"),a7=a4.h("t<k.E>"),a8=s.e,a9=a8.c,b0=s.f,b1=a4.h("k.E"),d=d.h("k.E"),b3=k0.d,b4=t.er,b7=t.bo,b8=t.i,c1=t.I
case 37:if(!j.j()){p=38
break}c7=j.d
if(c7==null)c7=d.a(c7)
if(!k4.a2()){p=38
break}c8=new A.D(c6,0,4,a4)
c8.Z(c6,0,4,a6)
c8=new A.t(c8,c8.gm(0),a7)
c9=c4.x
d0=null
while(c8.j()){d1=c8.d
if(d1==null)d1=b1.a(d1)
d2=d1.a
d3=b0.i(0,d2)
d4=d3==null
if(d4)d5=null
else d5=d3.d.length!==0||d3.a.at!=null
if(d5===!0){if(d4)d4=null
else{d4=d3.f
d4=d4==null?null:d4.a}d4=d4!==B.h}else d4=!1
if(d4)continue
d4=c4.K(d2)
d5=d1.at
if(d5==null){d2=c9.i(0,d2)
if(d2==null)d2=d1.d}else{d2=d1.ax
d6=d1.cy?1:0
d6=B.c.v(d5-d2-d6,0,5)
d2=d6}if(d4>=d2)continue
d7=a9.an(c7,d1.e,k6,!0,d1)
d2=k2?"transfer":"evacuate"
d8=a8.be(c4,c7,d7,!0,r.gab(),!0,"\u5728\u539f\u57ce\u5371\u9669\u7a97\u53e3\u524d\u8fdb\u9a7b\u5b89\u5168\u53cb\u57ce\uff0c\u6539\u53d8\u6240\u5c5e\u57ce\u4ee5\u4fdd\u5168\u5c06\u9886",d2,d1)
if(d8!=null)d1=d0==null||d8.a.d>d0.a.d
else d1=!1
if(d1)d0=d8}if(d0==null){p=37
break}c4=d0.a
B.a.l(c5,d0.b)
c7=c4.K(k1)
if(m){c8=c4.x.i(0,k1)
if(c8==null)c8=b3}else{c8=c?1:0
c8=B.c.v(k5-a3-c8,0,5)}p=c7<=c8?39:40
break
case 39:d9=new A.bN(c5,b4.a(new A.f0()),b7).H(0,0,new A.f1(s),b8)
c7=c4.M()
c8=A.p(c5,c1)
c9=s.a1(r,c4)
d1=isFinite(r.gab())?"\u5b89\u5168\u5224\u65ad\u4ee5\u5b9e\u9645\u8fdb\u9a7b\u53cb\u57ce\u4e3a\u51c6\uff0c\u9014\u4e2d\u539f\u57ce\u5931\u5b88\u4ecd\u4f1a\u6e05\u9664\u90e8\u961f":"\u8f6c\u79fb\u5230\u5b89\u5168\u540e\u65b9\u6574\u5907"
p=41
return k7.b=new A.a4(c7,c8,c9+d9*0.65,!1,d1,"relocation"),1
case 41:if(k2){p=38
break}case 40:p=37
break
case 38:case 36:e0=s.ci(r,q)
e1=new A.ft(s,q)
k6=s.a.Q
j=k6.r
d=A.j(j)
c=d.h("d<1>")
e2=A.p(new A.d(j,d.h("e(1)").a(new A.f2(s,q,e1,e0)),c),c.h("b.E"))
B.a.C(e2,new A.f3(e1,k0))
j=r.d
d=j.length===0?0:l.r.ay
c=t.S
d=A.a1(e2,0,A.Z(d,"count",c),A.j(e2).c)
a3=d.$ti
d=new A.t(d,d.gm(0),a3.h("t<k.E>"))
a4=s.e
a6=s.d
a7=a4.c
a8=a7.a
a9=q.y
b0=!e0
b1=s.f
a3=a3.h("k.E")
b3=k0.cy
b4=k0.ax
b7=k0.d
b8=q.x
c1=r.f
c7=A.j(j)
c8=c7.h("q(1)")
c9=c7.h("R<1,q>")
d1=k0.e
d2=c7.c
c7=c7.h("D<1>")
d4=c7.h("t<k.E>")
d5=c7.h("k.E")
d6=c1==null
case 42:if(!d.j()){p=43
break}e3=d.d
if(e3==null)e3=a3.a(e3)
if(!k4.a2()){p=43
break}e4=e3.c
e5=b1.i(0,e4)
e6=r.gab()
e7=e5==null
if(e7)e8=null
else e8=e5.d.length!==0||e5.a.at!=null
e8=e8===!0?e5.gab():1/0
e9=Math.min(e6,e8)
e6=!1
if(!e1.$1(e3)||e0){e8=s.a_(r,q)
if((e8==null?null:e8.a)!==B.h){e6=q.K(k1)
if(m){e8=b8.i(0,k1)
if(e8==null)e8=b7}else{e8=b3?1:0
e8=B.c.v(k5-b4-e8,0,5)}e8=e6<e8
e6=e8}}p=e6?44:45
break
case 44:f0=new A.R(j,c8.a(new A.f4()),c9).a6(0,new A.f5(s))
if(m){e6=b8.i(0,k1)
if(e6==null)e6=b7}else{e6=b3?1:0
e6=B.c.v(k5-b4-e6,0,5)}e8=k.i(0,"soldierLimit")
e8.toString
f1=a6.b5(e3,f0,f0.ok,e6,!1,Math.min(B.b.k(e8),q.e+e3.gO()))
e6=d6?null:c1.b
if(e6==null)e6=-1
p=f1.b>e6+0.05?46:47
break
case 46:d7=a7.an(e3,d1,k6,!0,k0)
if(m){e6=b8.i(0,k1)
if(e6==null)e6=b7}else{e6=b3?1:0
e6=B.c.v(k5-b4-e6,0,5)}e8=s.a_(r,q)
e8=e8==null?null:e8.b
d8=a4.be(q,e3,d7,!0,e9,!0,"\u672c\u5730\u62b5\u6297\u4ecd\u6709\u7f3a\u53e3\uff08\u57ce\u9632"+e6+"\u7ea7\uff0c\u9632\u5b88\u4f59\u91cf"+B.b.bW((e8==null?-1:e8)*100)+"\u70b9\uff09\uff0c\u63f4\u519b\u7ea6"+B.b.aM(d7.b,1)+"\u79d2\u5230\u8fbe\uff0c\u5371\u9669\u7a97\u53e3"+B.b.aM(e9,1)+"\u79d2\uff0c\u9884\u7559\u5165\u57ce\u540d\u989d","rescue",k0)
if(d8!=null){e6=s.a_(r,d8.a)
e6=(e6==null?null:e6.a)===B.h}else e6=!1
p=e6?48:49
break
case 48:e6=d8.a
p=50
return k7.b=new A.a4(e6,A.c([d8.b],k3),s.a1(r,e6)-A.ac(e3)*0.08,!1,"","recall"),1
case 50:case 49:case 47:case 45:e6=new A.D(j,0,2,c7)
e6.Z(j,0,2,d2)
e6=new A.t(e6,e6.gm(0),d4)
e8=e3.ok
e4=e4!==k1
f2=e3.a
case 51:if(!e6.j()){p=52
break}f3=e6.d
if(f3==null)f3=d5.a(f3)
f4=a9.i(0,f2)
if((f4==null?null:f4.b)==="intercept"){f4=a9.i(0,f2)
f4=f4==null?null:f4.r
f5=f4===f3.a.a}else f5=!1
if(e1.$1(e3)&&b0&&!f5){p=51
break}f4=!1
if(e4){if(e7)f6=null
else f6=e5.d.length!==0||e5.a.at!=null
if(f6===!0){if(e7)f4=null
else{f4=e5.f
f4=f4==null?null:f4.a}f4=f4!==B.h}}if(f4){p=51
break}f4=f3.a
d7=a4.b7(e3,f4,q)
if(a6.cC(e3,f4,f4.ok,e8,a8.b1(f4.z)).a!==B.h){p=51
break}f6=e1.$1(e3)?"\u672c\u5730\u624b\u6bb5\u65e0\u6cd5\u62b5\u6321\u660e\u786e\u6765\u88ad\uff0c\u7d27\u6025\u622a\u51fb\u9884\u8ba1"+B.b.aM(d7.b,1)+"\u79d2\uff0c\u65e9\u4e8e\u654c\u519b"+B.b.aM(f3.b,1)+"\u79d2\u62b5\u57ce\uff1b\u6700\u540e\u624d\u6539\u6d3e\u8fdc\u5f81":"\u52a8\u7528\u9644\u8fd1\u95f2\u7f6e\u90e8\u961f\u622a\u51fb\u6765\u654c\uff0c\u4e0d\u6253\u65ad\u4e3b\u653b\u4efb\u52a1"
d8=a4.c3(q,e3,d7,f3.b,!0,f4,f6,"intercept",k0)
p=d8!=null?53:54
break
case 53:f3=d8.a
p=55
return k7.b=new A.a4(f3,A.c([d8.b],k3),s.a1(r,f3)+80-A.ac(e3)*0.08,k2,"","recall"),1
case 55:case 54:p=51
break
case 52:p=42
break
case 43:d=A.j(c3)
a3=d.h("d<1>")
f7=A.p(new A.d(c3,d.h("e(1)").a(new A.f6(s)),a3),a3.h("b.E"))
B.a.C(f7,new A.f7(s,q,k0))
if(c3.length>1){d=s.a_(r,q)
f8=(d==null?null:d.a)===B.p}else f8=!1
d=A.a1(j,0,A.Z(2,"count",c),d2),c=d.$ti,d=new A.t(d,d.gm(0),c.h("t<k.E>")),a3=A.j(f7),a9=a3.c,a3=a3.h("D<1>"),b0=a3.h("t<k.E>"),b1=t.a,b8=t.H,c7=t.N,c8=t.dg,c9=t.cO,d1=t.Y,d2=t.T,d4=l.r,d5=d4.go,e3=d4.id,l=l.f,e4=t.fR,e6=t.w,e7=t.e,e8=t.eV,f2=a3.h("k.E"),d4=d4.d,c=c.h("k.E")
case 56:if(!d.j()){p=57
break}f3=d.d
if(f3==null)f3=c.a(f3)
if(!f8||f3.a.k1!=null||s.bt(f3,q)){p=56
break}f4=new A.D(f7,0,4,a3)
f4.Z(f7,0,4,a9)
f4=new A.t(f4,f4.gm(0),b0)
f6=f3.a
f3=f3.b
f9=f6.z
g0=f6.ok
case 58:if(!f4.j()){p=59
break}g1=f4.d
if(g1==null)g1=f2.a(g1)
if(!k4.a2()){p=59
break}g2=q.A(k1)
g3=A.j(g2)
g4=g3.h("d<1>")
g5=A.p(new A.d(g2,g3.h("e(1)").a(new A.f8(g1)),g4),g4.h("b.E"))
if(g5.length===0){p=58
break}g6=B.a.a6(g5,new A.f9(s,q,k0))
d7=a4.b7(g1,f6,q)
if(!d7.d||d7.b+d4>=f3){p=58
break}g7=A.c([new A.aT(q,A.c([],e6),A.c([],e7))],e8)
if(k2){g2=q.d
g3=k.i(0,"emergencyGold")
g3.toString
g3=g2<B.b.k(g3)+4
g2=g3}else g2=!1
if(g2){g2=A.j(g5)
g3=g2.h("d<1>")
g8=A.p(new A.d(g5,g2.h("e(1)").a(new A.fb(g6)),g3),g3.h("b.E"))
B.a.C(g8,new A.fc())
if(g8.length!==0&&k4.a2()){b9=q.M()
if(b9.bP(B.a.gG(g8)))B.a.l(g7,new A.aT(b9,A.c([new A.x(B.z,B.a.gG(g8).a,null,null,0,B.d)],e6),A.c([B.a.gG(g8)],e7)))}}if(m){g2=q.A(k1)
g3=A.j(g2)
g4=g3.h("d<1>")
a0=A.p(new A.d(g2,g3.h("e(1)").a(new A.fd()),g4),g4.h("b.E"))
B.a.C(a0,new A.fe())
f=q.M()
if(a0.length!==0&&f.aB(k0,B.a.gG(a0))&&f.d>=f.aa(!0).a)B.a.l(g7,new A.aT(f,A.c([new A.x(B.l,B.a.gG(a0).a,k1,null,0,B.d)],e6),A.c([],e7)))}g2=A.p(g7,e4)
g3=g2.length
b5=0
for(;b5<g2.length;g2.length===g3||(0,A.w)(g2),++b5){g9=g2[b5]
h=g9.a.M()
if(m){g4=h.x.i(0,k1)
if(g4==null)g4=b7}else{g4=b3?1:0
g4=B.c.v(k5-b4-g4,0,5)}h0=Math.min(g4,h.A(k1).length-1)
g4=h.f
h1=k.i(0,"soldierLimit")
h1.toString
h2=Math.min(g4,(h0+1)*B.b.k(h1))-h.e
if(h2>0&&h.ar(h2)&&h.d>=h.aa(!0).a){g4=A.p(g9.b,d2)
g4.push(new A.x(B.m,null,k1,null,h2,B.d))
B.a.l(g7,new A.aT(h,g4,g9.c))}}g2=g7.length,g3=g1.w<=d5,g4=g1.f,h1=g6===null,h3=!h1,b5=0
case 60:if(!(b5<g7.length)){p=62
break}h4=g7[b5]
h5=h4.a
h6=l.gaC()
h7=A.o(h6)
h8=h7.h("d<b.E>")
h9=A.p(new A.d(h6,h7.h("e(b.E)").a(new A.ff(s,h5)),h8),h8.h("b.E"))
B.a.C(h9,new A.fg())
if(h9.length===0){p=61
break}h6=[A.c([B.a.gG(h9).a],b1)],h7=h4.c,h8=J.aX(h7),i0=h4.b,i1=J.aX(i0),i2=h5.x,i3=0
case 63:if(!(i3<1)){p=65
break}i4=h6[i3]
i5=a8.b1(f9)
i6=k.i(0,"soldierLimit")
i6.toString
f1=a6.cF(g1,f6,g0,i4,!0,Math.min(B.b.k(i6),h5.e),i5)
i7=f1.a===B.h
i5=!i7
i6=!1
if(i5)if(g3)if(h3)if(f1.d>0){i6=k.i(0,"soldierLimit")
i6.toString
i6=Math.min(B.b.k(i6),h5.e)
i8=k.i(0,"soldierHp")
i8.toString
i8=f1.f<g4+i6*B.b.k(i8)
i6=i8}if(i6){i6=h5.A(k1)
i8=A.j(i6)
i9=i8.h("d<1>")
i6=A.p(new A.d(i6,i8.h("e(1)").a(new A.fh(g1)),i9),i9.h("b.E"))
i7=!1
i8=A.j(i6).h("N<1>")
i6=new A.N(i6,i8)
if(m){i9=i2.i(0,k1)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.v(k5-b4-i9,0,5)}j0=new A.D(i6,0,i9,i8.h("D<k.E>"))
j0.Z(i6,0,i9,i8.h("k.E"))
j1=B.a.cP(j0.a7(0),new A.fi(g6))
if(j1<0){p=64
break}i6=h5.e
i8=k.i(0,"soldierLimit")
i8.toString
j2=Math.max(0,i6-(j1+1)*B.b.k(i8))
if(m){i6=i2.i(0,k1)
if(i6==null)i6=b7}else{i6=b3?1:0
i6=B.c.v(k5-b4-i6,0,5)}i8=k.i(0,"soldierLimit")
i8.toString
j3=a6.bM(g6,f6,i6,Math.min(B.b.k(i8),j2))
if(m){i6=i2.i(0,k1)
if(i6==null)i6=b7}else{i6=b3?1:0
i6=B.c.v(k5-b4-i6,0,5)}i8=k.i(0,"soldierLimit")
i8.toString
i9=f1.d
j4=a6.cD(g6,f6,i9,i6,Math.min(B.b.k(i8),j2))
j5=j4.b-j3.b
j6=j4.a===B.h
i6=k.i(0,"soldierHp")
i6.toString
if(i9>=B.b.k(i6))if(j5>=e3){if(!j6)i6=(d6?null:c1.a)===B.p
else i6=!0
i7=i6}}else{j6=i7
j5=0}if(!i7){p=64
break}if(g5.length===0)i5=j.length>1||i5
else i5=!1
if(i5){p=64
break}i5=j5>0
i6=i5?"\u4f4e\u653b\u51fb\u5c06\u9886\u643a\u4e00\u4ef6\u5f3a\u6b66\u5668\u6d88\u8017\u6765\u654c\uff0c\u4fdd\u7559\u9ad8\u653b\u51fb\u5b88\u5c06\u4e0e\u57ce\u9632\u63a5\u6218":"\u4f4e\u653b\u51fb\u4f59\u5c06\u643a\u5f53\u524d\u6700\u5f3a\u6b66\u5668\u8fce\u6218\uff0c\u4fdd\u7559\u57ce\u5185\u4e3b\u529b\u63a5\u654c"
if(h1)i8=0
else{i8=k.i(0,"soldierLimit")
i8.toString
i8=Math.min(B.b.k(i8),h5.e)}d8=a4.c1(h5,g1,d7,i5,f3,!0,f6,i4,i8,i6,"intercept",k0)
if(d8==null){p=64
break}i6=d8.a
j7=i6.K(k1)
i8=d8.b
i9=A.p(i0,d2)
B.a.E(i9,i8.b)
j0=A.iK(c7,c7)
j0.E(0,i8.c)
j0.E(0,a4.ac(new A.bs(i1.aw(i0,new A.fj(s),c8),c9),A.c([],d1)))
i8=A.c([new A.M(i8.a,i9,j0,i8.d,i8.e,!0)],k3)
j0=s.a1(r,i6)
i9=Math.max(0,q.d-i6.d)
i5=i5?A.ac(g1)*0.5:0
j8=h8.H(h7,0,new A.fk(),b8)
if(m){j9=i6.x.i(0,k1)
if(j9==null)j9=b7}else{j9=b3?1:0
j9=B.c.v(k5-b4-j9,0,5)}j9=j7>j9||!j6
p=66
return k7.b=new A.a4(i6,i8,j0+200+j5*500-i9*0.25-i5-j8,j9,"","local"),1
case 66:case 64:++i3
p=63
break
case 65:case 61:g7.length===g2||(0,A.w)(g7),++b5
p=60
break
case 62:p=58
break
case 59:p=56
break
case 57:if(k6.gU().gm(0)===1)l=(d6?null:c1.a)===B.p&&c3.length>1
else l=!1
p=l?67:68
break
case 67:l=k6.f,k=A.j(l),j=k.h("d<1>"),j=A.l_(new A.d(l,k.h("e(1)").a(new A.fm(s)),j),3,j.h("b.E")),k=j.a,j=new A.b8(k.gB(k),j.b,A.o(j).h("b8<1>"))
case 69:if(!j.j()){p=70
break}l=j.gn()
if(!k4.a2()){p=70
break}b6=B.a.gG(c3)
d8=a4.c2(q,b6,a7.an(b6,l.e,k6,!0,l),r.gab(),!0,"\u4fdd\u7559\u539f\u57ce\u5b88\u519b\u62d6\u5ef6\uff0c\u6838\u5fc3\u5728\u5371\u9669\u7a97\u53e3\u524d\u593a\u53d6\u7a7a\u57ce\u5efa\u7acb\u65b0\u636e\u70b9","newBase",l)
p=d8!=null?71:72
break
case 71:l=d8.a
k=A.c([d8.b],k3)
d=s.a1(r,l)
c=A.ac(b6)
a3=l.K(k1)
if(m){a6=l.x.i(0,k1)
if(a6==null)a6=b7}else{a6=b3?1:0
a6=B.c.v(k5-b4-a6,0,5)}p=73
return k7.b=new A.a4(l,k,d+c*1.2,a3>a6,"","relocation"),1
case 73:case 72:p=69
break
case 70:case 68:case 1:return 0
case 2:return k7.c=n.at(-1),3}}}},
aq(a,b,c,d,e){var s,r,q,p,o,n,m=this
t.f3.a(d)
s=A.j(d)
r=s.h("q?(1)").a(new A.fz(m))
q=c.z.cL(b.z).H(0,0,new A.fA(m),t.i)
p=c.M()
o=A.p(d,t.T)
s=A.p(new A.bs(new A.R(d,r,s.h("R<1,q?>")),t.cO),t.r)
r=a.d
n=A.j(r)
B.a.E(s,new A.R(r,n.h("q(1)").a(new A.fB()),n.h("R<1,q>")))
n=a.a
s=A.c([new A.M(e,o,m.e.ac(s,A.c([n],t.Y)),B.r,c.aa(!0).a,!0)],t.Z)
o=m.a1(a,c)
r=Math.max(0,b.d-c.d)
if(c.K(n.a)<=c.N(n)){n=m.a_(a,c)
n=(n==null?null:n.a)!==B.h}else n=!0
return new A.a4(p,s,o-q*0.65-r*0.2,n,"","local")},
bt(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=b.y,s=new A.ae(s,s.r,s.e,A.o(s).h("ae<2>")),r=this.e,q=a.a,p=q.a,o=this.a.Q,n=o.b,m=b.z,l=this.b.r.d,k=a.b;s.j();){j=s.d
if(j.b!=="intercept"||j.r!==p||j.y<=n)continue
i=o.X(j.a)
if(i==null||i.f<=0||i.fy||m.q(0,i.a))continue
if(i.k1===p)return!0
if(!i.dx||j.z<=n)continue
h=r.b7(i,q,b)
if(h.d&&h.b+l<k)return!0}return!1},
ci(a,b){var s,r
if(this.c.e)return!1
s=a.a
if(!(s.at!=null||B.a.J(a.d,new A.fu())))return!1
if(b.A(s.a).length===0)return!0
r=this.a_(a,b)
return r!=null&&r.c<-this.b.r.fy},
a_(b3,b4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1=null,b2=b3.d
if(b2.length===0)return b1
s=b3.a
r=s.a
q=b4.A(r)
p=b4.e
for(o=b4.y,o=new A.ae(o,o.r,o.e,A.o(o).h("ae<2>")),n=t.N,m=t.z,l=t.n,k=b0.e.c,j=b0.a.Q,i=j.b,h=b4.z,g=b0.b,f=g.r.d;o.j();){e=o.d
if(!e.as||e.d!==r||e.y<i)continue
d=j.X(e.a)
if(d==null||d.fy||d.k1!=null||d.f<=0||h.q(0,d.a)||B.a.J(q,new A.fv(d)))continue
c=d.z
for(e=J.j8(e.w,e.x),b=e.$ti,e=new A.t(e,e.gm(0),b.h("t<k.E>")),b=b.h("k.E"),a=0;e.j();c=a1){a0=e.d
a1=a0==null?b.a(a0):a0
a+=k.ad(c,a1)}if(!isFinite(a)||a+f>=b3.gab())continue
p=Math.min(b4.f,p+d.gO())
e=A.ao(d.F(),n,m)
e.u(0,"hp",d.r)
e.u(0,"troops",A.c([],l))
e.u(0,"s",0)
B.a.l(q,A.j9(e))}B.a.C(q,new A.fw())
o=A.j(q)
n=t.r
a2=A.bP(new A.d(q,o.h("e(1)").a(new A.fx(b3)),o.h("d<1>")),n)
m=A.c([],t.e)
if(a2!=null)m.push(a2)
o=o.h("N<1>")
B.a.E(m,new A.N(q,o).bi(0,o.h("e(k.E)").a(new A.fy(a2))))
a3=A.a1(m,0,A.Z(b4.N(s),"count",t.S),n).a7(0)
if(a3.length===0)return b1
for(o=b0.d,n=s.d,m=b4.x,g=g.b,l=s.cy,k=s.ax,s=s.at,j=s==null,a4=b1,a5=0;a5<a3.length;++a5){d=a3[a5]
if(d.as===B.e)a6=0
else{i=g.i(0,"soldierLimit")
i.toString
a6=Math.min(p,B.b.k(i)-d.gO())}p-=a6
for(i=b2.length,a7=b1,a8=0;a8<b2.length;b2.length===i||(0,A.w)(b2),++a8){h=b2[a8].a
if(j){f=m.i(0,r)
if(f==null)f=n}else{f=l?1:0
f=B.c.v(s-k-f,0,5)}a9=o.b5(d,h,h.ok,Math.max(1,f-a5),!1,d.gO()+a6)
if(a7==null||a9.b<a7.b)a7=a9}if(a4==null||a7.b>a4.b)a4=a7}return a4},
a1(a,b){var s=a.a,r=b.K(s.a),q=Math.max(0,r-b.N(s)),p=this.a.Q.gU().gm(0)===1?400:0,o=150+s.r*4+a.r*0.5+p,n=this.a_(a,b)
s=r===0?o*2:0
p=n==null?null:n.b
if(p==null)p=-0.8
return-q*5000-s+p*o}}
A.fH.prototype={
$1(a){return this.a.bt(t.O.a(a),this.b)},
$S:10}
A.fI.prototype={
$1(a){t.J.a(a)
return a.f&&B.a.J(this.a.d,new A.fG(a))},
$S:15}
A.fG.prototype={
$1(a){return t.O.a(a).a.a===this.a.r},
$S:10}
A.fJ.prototype={
$1(a){var s,r,q,p,o,n=this
t.cs.a(a)
s=!1
if(a.f==="local"){r=a.b
if(r.length!==0)if(B.a.J(r,new A.fE())){q=a.a
p=n.b
o=p.a
if(q.K(o.a)<=q.N(o)){s=n.a
q=s.a_(p,q)
q=q==null?null:q.b
if(q==null)q=-1
o=n.c
o=o==null?null:o.b
s=(q>(o==null?-1:o)+0.04||B.a.J(r,new A.fF()))&&a.c>s.a1(p,n.d)}}}return s},
$S:35}
A.fE.prototype={
$1(a){return B.a.J(t.I.a(a).b,new A.fD())},
$S:27}
A.fD.prototype={
$1(a){var s=t.T.a(a).a
return s===B.l||s===B.m||s===B.B},
$S:29}
A.fF.prototype={
$1(a){return B.a.J(t.I.a(a).d,new A.fC())},
$S:27}
A.fC.prototype={
$1(a){return t.J.a(a).b==="intercept"},
$S:15}
A.eY.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.eZ.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.f_.prototype={
$1(a){t.r.a(a)
return a.dy&&a.e!==2},
$S:0}
A.fa.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.ac(a),A.ac(b))},
$S:2}
A.fl.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fn.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.fo.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fp.prototype={
$1(a){t.r.a(a)
return a.db&&!this.a.as.q(0,a.a)},
$S:0}
A.fq.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b)),A.ac(a))},
$S:2}
A.fr.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:1}
A.fs.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.I(s),b.e.I(s))},
$S:6}
A.f0.prototype={
$1(a){return t.I.a(a).d},
$S:38}
A.f1.prototype={
$2(a,b){var s
A.aj(a)
s=this.a.a.Q.X(t.J.a(b).a)
s.toString
return a+A.ac(s)},
$S:39}
A.ft.prototype={
$1(a){var s,r,q=this.a.a.Q,p=this.b
if(A.iZ(a,q,p)==null){p=p.y
s=a.a
r=p.i(0,s)
if((r==null?null:r.b)==="intercept"){p=p.i(0,s)
q=q.X(p==null?null:p.r)
q=q==null?null:q.f
q=(q==null?0:q)>0}else q=!1}else q=!0
return q},
$S:0}
A.f2.prototype={
$1(a){var s,r,q,p,o=this
t.r.a(a)
s=!1
if(a.b===o.a.a.Q.a)if(a.dx)if(!a.fy){r=o.b
q=a.a
p=r.y.i(0,q)
if((p==null?null:p.as)!==!0)if(!r.as.q(0,q))s=!o.c.$1(a)||o.d}return s},
$S:0}
A.f3.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a
if(!J.ak(s.$1(a),s.$1(b)))return s.$1(a)?1:-1
s=this.b.e
return B.b.t(a.z.I(s),b.z.I(s))},
$S:2}
A.f4.prototype={
$1(a){return t.O.a(a).a},
$S:24}
A.f5.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.jY(a,s)>A.jY(b,s)?a:b},
$S:17}
A.f6.prototype={
$1(a){return t.r.a(a).w<=this.a.b.r.go},
$S:0}
A.f7.prototype={
$2(a,b){var s,r,q,p=t.r
p.a(a)
p.a(b)
p=this.a.b
s=p.r.go
r=a.w<=s
if(r!==b.w<=s)return r?-1:1
s=this.b
q=this.c
return B.b.t(A.ir(a,p,s.N(q),4),A.ir(b,p,s.N(q),4))},
$S:2}
A.f8.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.f9.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a.b
s=this.b
r=this.c
return A.ir(a,q,s.N(r),4)>A.ir(b,q,s.N(r),4)?a:b},
$S:17}
A.fb.prototype={
$1(a){t.r.a(a)
return a!==this.a&&a.dy&&a.e!==2},
$S:0}
A.fc.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.ac(a),A.ac(b))},
$S:2}
A.fd.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.fe.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.ff.prototype={
$1(a){var s
t.o.a(a)
s=this.b.w.i(0,a.a)
if((s==null?0:s)<=0)s=a.f&&this.a.a.Q.c>=a.e
else s=!0
return s},
$S:7}
A.fg.prototype={
$2(a,b){var s=t.o
s.a(a)
return B.c.t(s.a(b).c,a.c)},
$S:18}
A.fh.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fi.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fj.prototype={
$1(a){return this.a.a.Q.X(t.T.a(a).b)},
$S:28}
A.fk.prototype={
$2(a,b){return A.v(a)+A.ac(t.r.a(b))*0.65},
$S:45}
A.fm.prototype={
$1(a){var s
t.q.a(a)
s=this.a.a.Q
return a.b!==s.a&&s.A(a.a).length===0},
$S:1}
A.fz.prototype={
$1(a){return this.a.a.Q.X(t.T.a(a).b)},
$S:28}
A.fA.prototype={
$2(a,b){var s
A.aj(a)
s=this.a.a.Q.X(A.G(b))
s.toString
return a+A.ac(s)},
$S:60}
A.fB.prototype={
$1(a){return t.O.a(a).a},
$S:24}
A.fu.prototype={
$1(a){var s,r,q
t.O.a(a)
s=a.a
r=s.as
if(r!==B.w){q=!1
if(a.c>=0.9)if(r!==B.n){s=s.Q
s=Math.abs(s.a)+Math.abs(s.b)>0.01}else s=q
else s=q}else s=!0
return s},
$S:10}
A.fv.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fw.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.fx.prototype={
$1(a){return t.r.a(a).a===this.a.a.ch},
$S:0}
A.fy.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.J.prototype={
F(){return A.c([this.a,this.b],t.n)},
I(a){var s=this.a-a.a,r=this.b-a.b
return Math.sqrt(s*s+r*r)},
av(a,b){var s=this.a,r=this.b
return new A.J(s+(a.a-s)*b,r+(a.b-r)*b)}}
A.e6.prototype={
aj(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this.a,f=B.a.gG(g)
for(s=a.a,r=a.b,q=1/0,p=0;o=g.length,p<o;){n=g[p];++p
m=g[p%o]
o=n.a
l=m.a-o
k=n.b
j=m.b-k
i=n.av(m,B.b.v(((s-o)*l+(r-k)*j)/(l*l+j*j),0,1))
h=i.I(a)
if(h<q){q=h
f=i}}return f},
q(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(this.aj(b).I(b)<1e-7)return!0
for(s=this.a,r=s.length,q=b.b,p=b.a,o=!1,n=0;n<r;){m=s[n];++n
l=s[n%r]
k=m.b
j=l.b
if(k>q!==j>q){i=m.a
i=p<(l.a-i)*(q-k)/(j-k)+i
k=i}else k=!1
if(k)o=!o}return o},
bR(a,b){var s
if(this.q(0,a))return null
s=this.bN(a,b)
return s.length===0?null:B.a.a6(s,B.x)},
bN(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.a,g=b.a-h,f=a.b,e=b.b-f,d=A.c([],t.n)
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
bI(a,b){var s,r=this
if(r.q(0,a))return r.aj(a)
s=r.bR(a,b)
return s==null?r.aj(a):a.av(b,s)},
bO(a,b){var s=a.I(b),r=s<1e-7?new A.J(a.a+4096,a.b+0):a.av(b,4096/s),q=this.bN(a,r)
return q.length===0?this.aj(b):a.av(r,B.a.a6(q,B.G))}}
A.ah.prototype={
aG(){return"AiArmyState."+this.b}}
A.q.prototype={
gO(){var s=this.at,r=A.j(s)
return new A.d(s,r.h("e(1)").a(new A.du()),r.h("d<1>")).gm(0)},
gaJ(){return this.f+B.a.H(this.at,0,new A.dt(),t.H)},
F(){var s,r,q,p,o,n,m,l=this,k=l.z,j=t.n
k=A.c([k.a,k.b],j)
s=l.Q
s=A.c([s.a,s.b],j)
r=l.CW
r=r==null?null:A.c([r.a,r.b],j)
q=A.c([],t.x)
for(p=l.p2,o=p.length,n=0;n<p.length;p.length===o||(0,A.w)(p),++n){m=p[n]
q.push(A.c([m.a,m.b],j))}return A.O(["id",l.a,"c",l.b,"home",l.c,"o",l.d,"t",l.e,"hp",l.f,"max",l.r,"a",l.w,"p",l.x,"pay",l.y,"xy",k,"v",s,"s",l.as.a,"troops",l.at,"w",l.ax,"m",l.ay,"due",l.ch,"to",r,"target",l.cx,"return",l.cy,"dispatch",l.db,"move",l.dx,"dismiss",l.dy,"upgrade",l.fr,"retreat",l.fx,"marked",l.fy,"rev",l.go,"orderRev",l.id,"opponent",l.k1,"clashes",l.k2,"received",l.k3,"dealt",l.k4,"opening",l.ok,"weaponReady",l.p1,"returnPath",q,"regionCity",l.p3,"salaryPaidMonth",l.p4],t.N,t.X)}}
A.du.prototype={
$1(a){return A.aj(a)>0},
$S:11}
A.dt.prototype={
$2(a,b){return A.v(a)+A.aj(b)},
$S:14}
A.U.prototype={
ga9(){var s,r=this,q=r.at
if(q==null)q=r.d
else{s=r.cy?1:0
s=B.c.v(q-r.ax-s,0,5)
q=s}return q},
F(){var s,r,q,p,o,n=this,m=n.e,l=t.n
m=A.c([m.a,m.b],l)
s=A.c([],t.x)
for(r=n.f.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.w)(r),++p){o=r[p]
s.push(A.c([o.a,o.b],l))}return A.O(["id",n.a,"c",n.b,"native",n.c,"level",n.d,"xy",m,"outline",s,"income",n.r,"baseIncome",n.z,"poor",n.w,"cap",n.x,"recruitCap",n.y,"recruit",n.Q,"rev",n.as,"initial",n.at,"wins",n.ax,"attacker",n.ay,"defender",n.ch,"stage",n.CW,"next",n.cx,"fallen",n.cy,"danger",n.db],t.N,t.X)}}
A.b_.prototype={
F(){var s,r,q=this,p=t.N,o=t.S,n=A.X(p,o)
for(s=q.r.gaf(),s=s.gB(s);s.j();){r=s.gn()
n.u(0,""+r.a,r.b)}o=A.X(p,o)
for(s=q.w.gaf(),s=s.gB(s);s.j();){r=s.gn()
o.u(0,""+r.a,r.b)}return A.O(["id",q.a,"gold",q.b,"reserves",q.c,"capacity",q.d,"salary",q.e,"poor",q.f,"stock",n,"hate",o],p,t.X)}}
A.dZ.prototype={
gaz(){return B.a.al(this.w,new A.e4(this))},
gU(){var s=this.f,r=A.j(s)
return new A.d(s,r.h("e(1)").a(new A.e5(this)),r.h("d<1>"))},
A(a){var s=this.r,r=A.j(s),q=r.h("d<1>")
s=A.p(new A.d(s,r.h("e(1)").a(new A.e1(this,a)),q),q.h("b.E"))
B.a.C(s,new A.e2())
return s},
X(a){var s=this.r,r=A.j(s)
return A.bP(new A.d(s,r.h("e(1)").a(new A.e3(a)),r.h("d<1>")),t.r)},
L(a){var s=this.f,r=A.j(s)
return A.bP(new A.d(s,r.h("e(1)").a(new A.e_(a)),r.h("d<1>")),t.q)},
F(){var s,r,q,p,o=this,n=t.d,m=A.c([],n)
for(s=o.f,r=s.length,q=0;q<r;++q)m.push(s[q].F())
s=A.c([],n)
for(r=o.r,p=r.length,q=0;q<p;++q)s.push(r[q].F())
n=A.c([],n)
for(r=o.w,p=r.length,q=0;q<p;++q)n.push(r[q].F())
return A.O(["country",o.a,"tick",o.b,"month",o.e,"cities",m,"heroes",s,"countries",n,"pool",o.x,"salary",o.y,"year",o.c,"monthIndex",o.d],t.N,t.X)}}
A.e4.prototype={
$1(a){return t.t.a(a).a===this.a.a},
$S:8}
A.e5.prototype={
$1(a){return t.q.a(a).b===this.a.a},
$S:1}
A.e1.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b
if(a.c===s){r=a.as
s=(r===B.f||r===B.e)&&a.f>0&&a.b===B.a.al(this.a.f,new A.e0(s)).b}else s=!1
return s},
$S:0}
A.e0.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.e2.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.e3.prototype={
$1(a){return t.r.a(a).a===this.a},
$S:0}
A.e_.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.fW.prototype={
c6(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
for(s=this.b,r=s.y,r=new A.ae(r,r.r,r.e,A.o(r).h("ae<2>")),q=this.f,p=this.a,o=p.a,n=s.z,s=s.Q;r.j();){m=r.d
l=p.X(m.a)
k=p.L(m.d)
j=!0
if(m.b==="expedition")if(l!=null)if(k!=null)if(k.b!==o)if(l.b===o)if(!l.fy)if(!(l.f<=0)){m=l.a
if(!n.q(0,m)){i=l.as
if(i!==B.t)m=(i===B.f||i===B.e)&&!s.q(0,m)
else m=j}else m=j}else m=j
else m=j
else m=j
else m=j
else m=j
else m=j
else m=j
if(m)continue
J.kk(q.cX(k.a,new A.fY()),l)}},
gbU(){var s,r=this,q=r.d
if(q!=null){s=r.a.L(r.e)
q=(s==null?null:s.b)===q}else q=!1
return q?r.e:null},
gY(){var s=this.f,r=A.o(s).h("a5<1>"),q=A.p(new A.a5(s,r),r.h("b.E"))
B.a.C(q,new A.h_(this))
return A.bP(q,t.S)},
gbT(){var s,r=this,q=r.gY()
if(q!=null){s=r.c.r
s=r.a.d>=s.cy&&r.f.a<s.cx&&r.cH(q)>=s.db}else s=!0
return s},
b0(a){var s,r=this,q=r.d,p=!1
if(q!=null)if(a.b!==q)q=r.gY()==null||!r.gbT()
else q=p
else q=p
if(q)return!1
s=r.gY()
if(s==null)s=r.gbU()
q=!0
if(s!=null){p=a.a
if(p!==s)q=r.gY()!=null&&!r.f.V(p)&&r.gbT()}return q},
cH(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c="soldierLimit",b=d.a,a=b.L(a0)
a.toString
s=d.f.i(0,a0)
if(s==null)s=A.c([],t.e)
r=s.length
q=d.b.Q
p=d.c.b
o=0
n=0
for(;n<s.length;s.length===r||(0,A.w)(s),++n){m=s[n]
if(q.q(0,m.a)){l=p.i(0,c)
l.toString
k=B.b.k(l)}else k=m.gO()
o+=d.bB(m,k,0)}j=B.a.al(b.w,new A.fZ(a)).c
for(b=b.A(a0),s=A.j(b).h("N<1>"),s=A.a1(new A.N(b,s),0,A.Z(a.ga9(),"count",t.S),s.h("k.E")),b=s.$ti,s=new A.t(s,s.gm(0),b.h("t<k.E>")),r=a.cy,q=a.at,l=a.ax,i=q==null,b=b.h("k.E"),a=a.d,h=0,g=0;s.j();){f=s.d
if(f==null)f=b.a(f)
e=p.i(0,c)
e.toString
k=Math.min(B.b.k(e),f.gO()+j)
j-=k-f.gO()
if(i)e=a
else{e=r?1:0
e=B.c.v(q-l-e,0,5)}h+=d.bB(f,k,Math.max(1,e-g));++g}return h===0?1/0:o/h},
bB(a,b,c){var s,r=this.c,q=r.b2(a.w,c,!1)
r=r.b
s=r.i(0,"soldierPower")
s.toString
s=B.b.k(s)
r=r.i(0,"soldierHp")
r.toString
return(a.f+b*B.b.k(r))*(B.c.bC(q+b*s+2,4)+1)*(1+a.ay/1000)}}
A.fX.prototype={
$1(a){var s=t.q.a(a).b
return s===this.a&&s!==this.b.a},
$S:1}
A.fY.prototype={
$0(){return A.c([],t.e)},
$S:47}
A.h_.prototype={
$2(a,b){var s,r
A.f(a)
A.f(b)
s=this.a.f
r=B.c.t(s.i(0,b).length,s.i(0,a).length)
return r!==0?r:B.c.t(a,b)},
$S:26}
A.fZ.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:8}
A.d5.prototype={}
A.h0.prototype={
bb(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.as
if(!(h===B.f||h===B.e))return A.c([a.ax],t.A)
h=this.b
s=h.f.gaC()
r=A.o(s)
q=r.h("d<b.E>")
p=A.p(new A.d(s,r.h("e(b.E)").a(new A.h3(this,b)),q),q.h("b.E"))
B.a.C(p,new A.h4())
s=t.a
o=A.c([A.c([],s)],t.A)
for(r=t.S,q=A.j(p),n=A.a1(p,0,A.Z(5,"count",r),q.c),m=n.$ti,n=new A.t(n,n.gm(0),m.h("t<k.E>")),m=m.h("k.E");n.j();){l=n.d
B.a.l(o,A.c([(l==null?m.a(l):l).a],s))}if(p.length!==0){n=q.h("e(1)")
q=q.h("d<1>")
k=A.p(new A.d(p,n.a(new A.h5(a)),q),q.h("b.E"))
m=k.length===0?p:k
j=B.a.a6(m,new A.h6())
if(!B.a.J(o,new A.h7(j)))B.a.l(o,A.c([j.a],s))
h=h.b.i(0,"carryLimit")
h.toString
B.a.l(o,A.cT(Math.min(3,B.b.k(h)),j.a,!1,r))
i=A.bP(new A.d(p,n.a(new A.h8(b)),q),t.o)
if(i!=null&&!B.a.J(o,new A.h9(i)))B.a.l(o,A.c([i.a],s))}return o},
ac(a,b){var s,r,q,p,o
t.ef.a(a)
t.fy.a(b)
s=t.N
s=A.X(s,s)
for(r=J.H(a);r.j();){q=r.gn()
s.u(0,"h:"+q.a,q.go)}for(r=b.length,p=0;p<b.length;b.length===r||(0,A.w)(b),++p){o=b[p]
s.u(0,"c:"+o.a,o.as)}return s},
ak(a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7=this,a8=null
t.L.a(b7)
if(!b1.d||!isFinite(b1.b)||J.iE(b1.a)||b0.fy||a9.as.q(0,b0.a))return a8
s=b1.b
r=a7.b
q=r.r
p=s+q.d
if(p>=b4)return a8
o=b0.a
n=a9.y.i(0,o)
m=n==null
if(!m){if(n.z>a7.a.Q.b&&!b5)return a8
l=!1
if(n.b===c2){k=n.d
if(k===c3.a){k=n.r
if(k==(b6==null?a8:b6.a)){l=n.w
k=J.cw(l)
l=k.gam(l)&&k.gba(l).I(J.km(b1.a))<32&&b0.as!==B.n}}}if(l)return a8}j=a9.M()
i=A.c([],t.w)
l=!b2
if(l){k=r.b
h=k.i(0,"battleBudget")
h.toString
g=Math.min(c3.ga9(),a7.a.Q.A(c3.a).length)
g=Math.max(1,g)
k=k.i(0,"supplySafety")
k.toString
p+=h*(b9+1)*g+s+k}if(p>q.fr)return a8
s=c3.a
k=b6==null
h=k?a8:b6.a
g=a7.a
f=g.Q
e=f.b
d=B.b.b4(isFinite(b4)?b4*60:Math.max(p,60)*60)
c=B.b.bW(q.w*60)
b=b1.a
r=r.b
a=r.i(0,"supplySeconds")
a.toString
a=B.b.b4(p/a)
if(c2==="expedition")a0=c3.b
else a0=a8
a1=new A.ab(o,c2,c1,s,a0,b3,h,b,0,e+d,e+c,a,b2,b0.id+1)
h=!1
if(b2){e=j.K(s)
if((m?a8:n.as)===!0){h=(m?a8:n.d)===s
m=h}else m=!1
m=m?1:0
q=c0?Math.max(j.N(c3),c3.y+q.y):j.N(c3)
q=e-m>=q}else q=h
if(q)return a8
q=b0.as
if(q===B.f||q===B.e){q=j.f
r=r.i(0,"soldierLimit")
r.toString
a2=Math.max(0,Math.min(q,b8+B.b.k(r)-b0.gO())-j.e)
if(a2>0){if(g.x===B.k)return a8
if(!j.ar(a2))return a8
B.a.l(i,new A.x(B.m,a8,b0.c,a8,a2,B.d))}r=t.S
a3=A.X(r,r)
for(r=b7.length,q=j.w,g=g.x===B.k,a4=0;a4<b7.length;b7.length===r||(0,A.w)(b7),++a4){a5=b7[a4]
a3.aA(a5,new A.ha(),new A.hb())
m=q.i(0,a5)
if(m==null)m=0
h=a3.i(0,a5)
h.toString
if(m<h){if(g)return a8
if(!j.bK(a5))return a8
B.a.l(i,new A.x(B.A,a8,a8,a8,a5,B.d))}}if(!j.cK(b0,b7,a1,p))return a8
if(j.e<b8)return a8
if(c2==="intercept"||b.length>1)s=a8
B.a.l(i,new A.x(B.B,o,s,J.ds(b),0,b7))}else{if(!j.d_(b0,a1))return a8
if(c2==="intercept"||b.length>1)s=a8
B.a.l(i,new A.x(B.O,o,s,J.ds(b),0,B.d))}a6=j.aa(b5).a
s=j.d
if(s>=a6)s=l&&s===0
else s=!0
if(s)return a8
s=A.c([b0],t.e)
if(!k)s.push(b6)
r=f.L(b0.c)
r.toString
r=A.c([r],t.Y)
r.push(c3)
return new A.d5(j,new A.M(c1,i,a7.ac(s,r),A.c([a1],t.m),a6,b5))},
c0(a,b,c,d,e,f,g,h,i,j){return this.ak(a,b,c,d,!1,e,f,null,B.d,0,0,g,h,i,j)},
bf(a,b,c,d,e,f,g,h,i){return this.ak(a,b,c,!1,!1,1/0,!1,null,d,e,f,!1,g,h,i)},
be(a,b,c,d,e,f,g,h,i){return this.ak(a,b,c,d,!1,e,f,null,B.d,0,0,!1,g,h,i)},
c3(a,b,c,d,e,f,g,h,i){return this.ak(a,b,c,!1,!1,d,e,f,B.d,0,0,!1,g,h,i)},
c1(a,b,c,d,e,f,g,h,i,j,k,l){return this.ak(a,b,c,!1,d,e,f,g,h,i,0,!1,j,k,l)},
c2(a,b,c,d,e,f,g,h){return this.ak(a,b,c,!1,!1,d,e,null,B.d,0,0,!1,f,g,h)},
b7(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a5.k1!=null)return B.u
s=this.a.Q
r=s.L(a4.c)
r.toString
q=a4.as
p=q===B.f||q===B.e?r.f.bO(r.e,a5.z):a4.z
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
m=m.d
i=this.c
h=i.a
g=h.b1(p)
if(!(g<m.length))return A.l(m,g)
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
a0=A.p(new A.d(A.c([(m-a)/j,(m+a)/j],t.n),t.db.a(new A.h1()),g),g.h("b.E"))
if(a0.length!==0)b=B.a.a6(a0,B.x)}for(m=s.f,a1=B.u,a2=0;a2<3;++a2){a3=new A.J(q+l*b,r+k*b)
if(!h.q(0,a3)||B.a.J(m,new A.h2(a3)))return B.u
a1=i.d5(a4,a3,s)
if(!a1.d)return a1
j=a1.b
if(Math.abs(b-j)<0.1)break
b=(b+j)/2}return a1}}
A.h3.prototype={
$1(a){var s
t.o.a(a)
s=this.b.w.i(0,a.a)
if((s==null?0:s)<=0){s=this.a.a
s=s.x!==B.k&&a.f&&s.Q.c>=a.e}else s=!0
return s},
$S:7}
A.h4.prototype={
$2(a,b){var s,r=t.o
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.c.t(a.a,b.a):B.c.t(r,s)},
$S:18}
A.h5.prototype={
$1(a){return t.o.a(a).d<this.a.gaJ()},
$S:7}
A.h6.prototype={
$2(a,b){var s=t.o
s.a(a)
s.a(b)
return a.c-a.d>b.c-b.d?a:b},
$S:48}
A.h7.prototype={
$1(a){t.L.a(a)
return a.length===1&&J.ds(a)===this.a.a},
$S:33}
A.h8.prototype={
$1(a){var s
t.o.a(a)
if(a.d>0){s=this.a.w.i(0,a.a)
s=(s==null?0:s)>0}else s=!1
return s},
$S:7}
A.h9.prototype={
$1(a){t.L.a(a)
return a.length===1&&J.ds(a)===this.a.a},
$S:33}
A.ha.prototype={
$1(a){return A.f(a)+1},
$S:5}
A.hb.prototype={
$0(){return 1},
$S:4}
A.h1.prototype={
$1(a){return A.aj(a)>=0},
$S:11}
A.h2.prototype={
$1(a){return t.q.a(a).f.q(0,this.a)},
$S:1}
A.az.prototype={
aG(){return"AiDecisionStage."+this.b}}
A.al.prototype={
aG(){return"AiActionKind."+this.b}}
A.x.prototype={
F(){var s=this,r=s.d
r=r==null?null:A.c([r.a,r.b],t.n)
return A.O(["kind",s.a.a,"hero",s.b,"city",s.c,"point",r,"amount",s.e,"weapons",s.f],t.N,t.X)}}
A.ab.prototype={
F(){var s,r,q,p,o,n=this,m=A.c([],t.x)
for(s=n.w,r=s.length,q=t.n,p=0;p<s.length;s.length===r||(0,A.w)(s),++p){o=s[p]
m.push(A.c([o.a,o.b],q))}return A.O(["hero",n.a,"role",n.b,"deadline",n.y,"commit",n.z,"city",n.d,"enemy",n.r,"points",m,"leg",n.x,"gold",n.Q,"slot",n.as,"reason",n.c,"order",n.at,"targetCountry",n.e,"attrition",n.f],t.N,t.X)}}
A.M.prototype={
F(){var s,r,q,p=this,o=t.d,n=A.c([],o)
for(s=p.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.w)(s),++q)n.push(s[q].F())
o=A.c([],o)
for(s=p.d,r=s.length,q=0;q<s.length;s.length===r||(0,A.w)(s),++q)o.push(s[q].F())
return A.O(["reason",p.a,"actions",n,"deps",p.c,"tasks",o,"floor",p.e,"emergency",p.f],t.N,t.X)}}
A.bI.prototype={
F(){var s,r,q,p=this,o=A.c([],t.d)
for(s=p.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.w)(s),++q)o.push(s[q].F())
return A.O(["phase",p.a,"target",p.b,"gold",p.c,"heroes",p.d,"groups",o,"notes",p.f,"limited",p.r,"assessments",p.w,"routeSteps",p.x,"expansions",p.y],t.N,t.X)}}
A.e9.prototype={
F(){var s,r,q,p=this,o=p.Q.F(),n=A.c([],t.d)
for(s=p.as,r=s.length,q=0;q<s.length;s.length===r||(0,A.w)(s),++q)n.push(s[q].F())
return A.O(["protocol",1,"session",p.a,"id",p.d,"rules",p.b,"map",p.c,"observation",o,"deadline",p.e,"tasks",n,"seed",p.f,"priority",p.r,"idle",p.w,"stage",p.x.b,"offensiveCountry",p.y,"offensiveCity",p.z],t.N,t.X)}}
A.e8.prototype={
F(){var s=this
return A.O(["protocol",1,"session",s.a,"id",s.d,"country",s.e,"rules",s.b,"map",s.c,"tick",s.f,"deadline",s.r,"plan",s.x.F(),"micros",s.w,"error",s.y],t.N,t.X)}}
A.il.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:8}
A.hf.prototype={
cW(f5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2=this,f3=null,f4={}
f4.a=f5
s=f2.a
r=s.Q
q=A.c([],t.Z)
p=new A.hh(f2)
o=new A.hg(f4,f2,q)
n=r.gU()
m=A.p(n,n.$ti.h("b.E"))
B.a.C(m,new A.hi(f2))
n=t.S
l=Math.min(f4.a.f,B.a.H(m,0,new A.hj(f4,f2),n))
if(m.length!==0&&l>f4.a.e){k=f4.a.M()
j=f2.b
i=Math.max(0,k.d-Math.max(k.S().a,j.r.f))
h=k.e
j=j.b.i(0,"soldierCost")
j.toString
g=Math.min(l-h,B.b.bj(i,B.b.k(j)))
if(g>0&&k.ar(g)&&p.$1(k))o.$4(k,A.c([new A.x(B.m,f3,B.a.gG(m).a,f3,g,B.d)],t.w),"\u6309\u5168\u56fd\u73b0\u6709\u5b88\u5c06\u548c\u5f85\u51fa\u5f81\u5c06\u9886\u8865\u5175\uff0c\u4fdd\u7559\u7cae\u8349\u3001\u6708\u4ff8\u548c\u6d41\u52a8\u8d44\u91d1",B.a.gG(m))}for(j=m.length,h=r.f,f=f2.b,e=f.r,d=e.ax-2,c=f.f,b=f.b,a=f2.d,a0=t.a,a1=e.ay,a2=A.j(h),a3=a2.h("e(1)"),a2=a2.h("d<1>"),a4=a2.h("b.E"),a5=f2.e,a6=t.w,a7=0;a7<m.length;m.length===j||(0,A.w)(m),++a7){a8=m[a7]
if(q.length>=d)break
a9=a8.a
b0=f4.a.A(a9)
b1=A.j(b0)
b2=b1.h("d<1>")
b3=A.p(new A.d(b0,b1.h("e(1)").a(new A.hk()),b2),b2.h("b.E"))
B.a.C(b3,new A.hr())
if(b0.length!==0&&c.gam(c)){b4=B.a.a6(b0,new A.hs())
b1=c.gaC()
b2=A.o(b1)
b5=b2.h("d<b.E>")
b6=A.p(new A.d(b1,b2.h("e(b.E)").a(new A.ht(r)),b5),b5.h("b.E"))
B.a.C(b6,new A.hu())
b7=A.p(new A.d(h,a3.a(new A.hv(f4,f2,r)),a2),a4)
B.a.C(b7,new A.hw(f2,b4,r))
b1=A.j(b7)
b2=b1.h("D<1>")
b5=new A.D(b7,0,3,b2)
b5.Z(b7,0,3,b1.c)
b5=new A.t(b5,b5.gm(0),b2.h("t<k.E>"))
b2=b2.h("k.E")
b8=a1
while(b5.j()){b1=b5.d
if(b1==null)b1=b2.a(b1)
if(b6.length===0)b9=A.c([],a0)
else{b9=b.i(0,"carryLimit")
b9.toString
b9=A.cT(B.b.k(b9),B.a.gG(b6).a,!1,n)}b1=A.ik(b4,b1,r,f,a,b9,0).b
if(b1>0)b8=Math.min(b8,b1)}c0=b8}else c0=1
c1=B.a.J(h,new A.hx(r))&&f4.a.K(a9)<f4.a.ae(a8)+c0
if(b3.length!==0)if(a8.at==null){b1=b0.length
b2=f4.a.x.i(0,a9)
b5=!0
if(b2==null)b2=a8.d
if(b1<=b2){if(c1){b1=b0.length
b2=f4.a.x.i(0,a9)
if(b2==null)b2=a8.d
b2=b1>=b2
b1=b2}else b1=!1
if(!b1){b1=a5.i(0,a9)
if(b1==null)b1=f3
else{b1=b1.f
b1=b1==null?f3:b1.a}b1=b1===B.p}else b1=b5}else b1=b5}else b1=!1
else b1=!1
if(b1){k=f4.a.M()
if(k.aB(a8,B.a.gG(b3))&&p.$1(k))o.$5$hero(k,A.c([new A.x(B.l,B.a.gG(b3).a,a9,f3,0,B.d)],a6),"\u63d0\u9ad8\u5fc5\u8981\u57ce\u9632\u4e0e\u8fce\u6218\u540d\u989d\uff0c\u4fdd\u7559\u5df2\u51fa\u5f81\u90e8\u961f\u7684\u540e\u52e4\u8d44\u91d1",a8,B.a.gG(b3))}if(c1){b1=a5.i(0,a9)
if(b1==null)b1=f3
else b1=b1.d.length!==0||b1.a.at!=null
if(b1===!0){b1=f4.a.K(a9)
b2=a8.at
if(b2==null)b2=a8.d
else{b5=a8.cy?1:0
b5=B.c.v(b2-a8.ax-b5,0,5)
b2=b5}b2=b1<b2
b1=b2}else b1=!0}else b1=!1
if(b1){k=f4.a.M()
b1=a5.i(0,a9)
if(b1==null)b1=f3
else b1=b1.d.length!==0||b1.a.at!=null
if(k.bc(a8,b1===!0)&&p.$1(k))o.$4(k,A.c([new A.x(B.v,f3,a9,f3,0,B.d)],a6),"\u8865\u5145\u7559\u5b88\u548c\u540e\u7eed\u6269\u5f20\u6240\u9700\u5c06\u9886\uff0c\u7b7e\u7ea6\u4e0e\u6708\u4ff8\u6309\u6700\u9ad8\u8d39\u7528\u9884\u7559",a8)}}c2=A.c([],t.e)
for(j=m.length,a7=0;a7<m.length;m.length===j||(0,A.w)(m),++a7){a8=m[a7]
d=a8.a
c=a5.i(0,d)
if(c==null)c=f3
else c=c.d.length!==0||c.a.at!=null
if(c===!0)continue
b0=f4.a.A(d)
d=A.j(b0)
c=d.h("d<1>")
c3=A.p(new A.d(b0,d.h("e(1)").a(new A.hy()),c),c.h("b.E"))
B.a.C(c3,new A.hl())
d=A.f(Math.max(0,b0.length-f4.a.ae(a8)))
c=A.j(c3)
a0=new A.D(c3,0,d,c.h("D<1>"))
a0.Z(c3,0,d,c.c)
B.a.E(c2,a0)}B.a.C(c2,new A.hm())
c4=f3
c5=f3
c6=0
c7=1
if(c2.length!==0){c8=B.a.gG(c2)
c9=A.d2(r,f4.a,f,s.z,s.y)
b7=A.p(new A.d(h,a3.a(new A.hn(f4,f2,r)),a2),a4)
B.a.C(b7,new A.ho(f2,c8,r))
s=A.a1(b7,0,A.Z(e.ch,"count",n),A.j(b7).c)
j=s.$ti
s=new A.t(s,s.gm(0),j.h("t<k.E>"))
h=f2.c
d=h.c
c=e.dy
a0=c9.f
e=e.dx
j=j.h("k.E")
a2=c8.c
d0=c6
d1=c4
d2=!1
for(;;){if(!s.j()){c6=d0
c4=d1
break}a3=s.d
if(a3==null)a3=j.a(a3)
for(a4=h.bb(c8,f4.a),a5=a4.length,a9=a3.e,d3=a3.a,a7=0;a7<a4.length;a4.length===a5||(0,A.w)(a4),++a7){b6=a4[a7]
d4={}
d5=A.ik(c8,a3,r,f,a,b6,0)
b1=a0.i(0,d3)
d6=b1==null?f3:b1.length
if(d6==null)d6=0
d7=d5.b
d8=d7-d6
d9=c9.gY()!=null&&c9.gY()!==d3
b1=!0
if(d7!==0)if(d8>0)if(d8<=c2.length)if(d9)b1=d7!==1||d5.a<e
else b1=!1
if(b1)continue
e0=f4.a.M()
e0.d=1e6
d4.a=e0
e1=A.c([],a6)
e3=1/0
e4=0
e5=0
for(;;){e2=!1
if(!(e5<d8)){e2=!0
break}if(!(e5<c2.length))return A.l(c2,e5)
e6=c2[e5]
if(A.ik(e6,a3,r,f,a,b6,0).b===0)break
e7=d.aL(e6,a9,r,a3)
b1=e7.b
e3=Math.min(e3,b1)
e4=Math.max(e4,b1)
if(!e7.d||e4-e3>c)break
e8=B.a.H(m,0,new A.hp(d4,f2,e6),n)
b1=d4.a
b2=b1.f
b5=b.i(0,"soldierLimit")
b5.toString
e9=h.bf(b1,e6,e7,b6,Math.min(e8,Math.max(0,b2-B.b.k(b5))),d6+e5,"\u6309\u5171\u540c\u653b\u9632\u95e8\u69db\u6838\u7b97\u6574\u961f\u6b66\u5668\u4e0e\u8def\u8d39","expedition",a3)
if(e9==null)break
d4.a=e9.a
b1=e9.b.b
b2=A.j(b1)
B.a.E(e1,new A.d(b1,b2.h("e(1)").a(new A.hq()),b2.h("d<1>")));++e5}if(!e2)continue
b1=d4.a
f0=1e6-b1.d+b1.S().a
b1=f4.a
if(b1.d<f0){if(d0===0||f0<d0){c7=d7
d0=f0
d1=d3}continue}k=b1.M()
b1=e1.length
f1=0
for(;;){if(!(f1<e1.length)){e2=!0
break}if(!k.bK(e1[f1].e)){e2=!1
break}e1.length===b1||(0,A.w)(e1);++f1}if(!e2||!p.$1(k))continue
if(e1.length!==0){a3=r.L(a2)
a3.toString
o.$4(k,e1,"\u6309\u76ee\u6807\u57ce\u9632\u4e0e\u5b88\u5c06\u914d\u9f50"+d7+"\u540d\u8fdb\u653b\u5c06\u9886\u7684\u6b66\u5668\uff0c\u9884\u7559\u6574\u961f\u7cae\u8349",a3)}d0=c6
c5=d3
d1=c4
d2=!0
break}if(d2){c6=d0
c4=d1
break}}}s=c4==null?"preparing":"saving"
n=c5==null?c4:c5
a=a.b
j=a.e
h=a.c
f=a.d
a=a.b
return new A.bI(s,n,c6,c7,q,q.length===0?A.c(["\u672c\u8f6e\u65e0\u5fc5\u8981\u4e14\u53ef\u652f\u4ed8\u7684\u91c7\u8d2d\uff0c\u4fdd\u7559\u56fd\u5e93"],t.s):B.ag,j,h,f,a)}}
A.hh.prototype={
$1(a){return a.d>=Math.max(a.S().a,this.a.b.r.f)},
$S:50}
A.hg.prototype={
$5$hero(a,b,c,d,e){var s,r
t.f3.a(b)
this.a.a=a
s=this.b
r=A.c([],t.e)
if(e!=null)r.push(e)
B.a.l(this.c,new A.M(c,b,s.c.ac(r,A.c([d],t.Y)),B.r,Math.max(a.S().a,s.b.r.f),!1))},
$4(a,b,c,d){return this.$5$hero(a,b,c,d,null)},
$S:51}
A.hi.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.a.e
o=o.a(b).a
r=s.i(0,o)
if(r==null)r=null
else r=r.d.length!==0||r.a.at!=null
r=r===!0?1:0
q=a.a
s=s.i(0,q)
if(s==null)s=null
else s=s.d.length!==0||s.a.at!=null
p=B.c.t(r,s===!0?1:0)
return p!==0?p:B.c.t(q,o)},
$S:6}
A.hj.prototype={
$2(a,b){var s,r
A.f(a)
t.q.a(b)
s=this.a.a.A(b.a).length
r=this.b.b.b.i(0,"soldierLimit")
r.toString
return a+s*B.b.k(r)},
$S:9}
A.hk.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.hr.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.hs.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return A.at(a,!0)>A.at(b,!0)?a:b},
$S:17}
A.ht.prototype={
$1(a){t.o.a(a)
return a.f&&a.d===0&&this.a.c>=a.e},
$S:7}
A.hu.prototype={
$2(a,b){var s=t.o
s.a(a)
return B.c.t(s.a(b).c,a.c)},
$S:18}
A.hv.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
q=A.d2(s,this.a.a,r.b,q.z,q.y).b0(a)
s=q}else s=!1
return s},
$S:1}
A.hw.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bD(o.a(b),s,r,p,q),A.bD(a,s,r,p,q))},
$S:6}
A.hx.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.hy.prototype={
$1(a){return t.r.a(a).db},
$S:0}
A.hl.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.at(s.a(b),!0),A.at(a,!0))},
$S:2}
A.hm.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.at(s.a(b),!0),A.at(a,!0))},
$S:2}
A.hn.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
q=A.d2(s,this.a.a,r.b,q.z,q.y).b0(a)
s=q}else s=!1
return s},
$S:1}
A.ho.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bD(o.a(b),s,r,p,q),A.bD(a,s,r,p,q))},
$S:6}
A.hp.prototype={
$2(a,b){var s,r,q
A.f(a)
t.q.a(b)
s=this.a
r=b.a
q=s.a.A(r).length
s=Math.min(Math.max(0,q-(r===this.c.c?1:0)),s.a.ae(b))
q=this.b.b.b.i(0,"soldierLimit")
q.toString
return a+s*B.b.k(q)},
$S:9}
A.hq.prototype={
$1(a){return t.T.a(a).a===B.A},
$S:29}
A.bk.prototype={}
A.ea.prototype={
ad(b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=b1.a,a7=b1.b,a8=A.u(b0.a)+","+A.u(b0.b)+":"+A.u(a6)+","+A.u(a7),a9=a5.d
if(a9.V(a8)){a6=a9.i(0,a8)
a6.toString
return a6}for(s=a5.a,r=s.b,q=s.c,p=r+q+8,o=r-1,--q,n=a5.b,m=n.b,n=n.d,s=s.d,l=s.length,k=n.length,j=a5.c,i=b0,h=0,g=0;g<p;++g){f=i.I(b1)
if(f<1e-7){if(a9.a>=256){e=new A.a5(a9,A.o(a9).h("a5<1>")).gB(0)
if(!e.j())A.cx(A.aD())
a9.ag(0,e.gn())}a9.u(0,a8,h)
return h}if(!j.d1())return 1/0
d=i.a
c=(a6-d)/f
b=i.b
a=(a7-b)/f
a0=B.c.v(B.b.W((d+c*1e-7)/16),0,o)
a1=B.c.v(B.b.W((b+a*1e-7)/16),0,q)
a2=new A.eb()
a3=a2.$3(d,c,a0)
a2=a2.$3(b,a,a1)
a4=Math.min(f,Math.min(A.jU(a3),A.jU(a2)))
a2=m.i(0,"marchSpeed")
a2.toString
a3=a1*r+a0
if(!(a3>=0&&a3<l))return A.l(s,a3)
a3=s[a3]
if(!(a3<k))return A.l(n,a3)
h+=a4/(a2*n[a3])
i=new A.J(d+c*a4,b+a*a4)}return 1/0},
an(a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=b0.L(a8.c),a5=a8.as,a6=(a5===B.f||a5===B.e)&&a4!=null?a4.f.bO(a4.e,a9):a8.z,a7=b2==null?a9:b2.f.bI(a6,a9)
a5=this.a
if(!a5.q(0,a7))return B.u
s=new A.ec(b0,a8,b2)
r=new A.ee(this,b0,a8)
q=t._
p=A.c([A.c([a7],q)],t.a5)
if(!s.$2(a6,a7))o=b1&&r.$2(a6,a7)
else o=!0
if(o){n=a6.I(a7)
o=a6.a
m=a7.a
l=(o+m)/2
k=a6.b
j=a7.b
i=(k+j)/2
if(n>0)for(h=[-96,96,-192,192],k=(j-k)/n,o=(m-o)/n,g=0;g<4;++g){f=h[g]
e=new A.J(l-k*f,i+o*f)
if(a5.q(0,e))B.a.l(p,A.c([e,a7],q))}}for(a5=p.length,d=null,g=0;g<p.length;p.length===a5||(0,A.w)(p),++g){c=p[g]
q=c.length
a=a6
a0=0
a1=!1
a2=0
for(;;){if(!(a2<c.length)){b=!0
break}a3=c[a2]
if(s.$2(a,a3)){b=!1
break}a1=a1||r.$2(a,a3)
a0+=this.ad(a,a3)
c.length===q||(0,A.w)(c);++a2
a=a3}q=!0
if(b)if(isFinite(a0))q=b1&&a1
if(q)continue
if(d==null||a0<d.b)d=new A.bk(c,a0,!0)}return d==null?B.S:d},
aL(a,b,c,d){return this.an(a,b,c,!1,d)},
d5(a,b,c){return this.an(a,b,c,!1,null)}}
A.eb.prototype={
$3(a,b,c){var s
if(Math.abs(b)<1e-12)s=1/0
else s=Math.max(1e-8,((b>0?c+1:c)*16-a)/b)
return s},
$S:52}
A.ec.prototype={
$2(a,b){return B.a.J(this.a.f,new A.ed(this.b,this.c,a,b))},
$S:19}
A.ed.prototype={
$1(a){var s,r=this
t.q.a(a)
if(a.b!==r.a.b){s=r.b
s=s==null?null:s.a
s=a.a!==s&&a.f.bR(r.c,r.d)!=null}else s=!1
return s},
$S:1}
A.ee.prototype={
$2(a,b){return B.a.J(this.b.r,new A.ef(this.a,this.c,b,a))},
$S:19}
A.ef.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this
t.r.a(a)
if(a.b!==j.b.b){s=a.as
s=s===B.f||s===B.e||a.fy||a.f<=0}else s=!0
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
l=B.b.v(((k.a-q)*p+(k.b-o)*n)/m,0,1)}s=r.av(s,l).I(a.z)
r=j.a.b.b.i(0,"encounterDistance")
r.toString
return s<r+12},
$S:0}
A.V.prototype={
F(){var s=this
return A.c([s.a,s.b,s.c,s.d,s.e,s.f,s.r],t.Q)}}
A.eg.prototype={
b3(a,b,c,d){var s,r,q
if(c){s=this.e
if(!(d<s.length))return A.l(s,d)
s=s[d]}else s=1
s=B.c.v(B.b.W(a*s),0,63)
if(b>0){r=this.b
q=r.i(0,"defenseBase")
q.toString
q=B.b.k(q)
r=r.i(0,"defenseStep")
r.toString
r=q+(b-1)*B.b.k(r)}else r=0
return B.c.v(s+r,0,63)},
cA(a,b){return this.b3(a,0,b,0)},
b2(a,b,c){return this.b3(a,b,c,0)},
F(){var s,r,q,p=this,o=A.c([],t.eG)
for(s=p.f.gaC(),s=s.gB(s),r=t.Q;s.j();){q=s.gn()
o.push(A.c([q.a,q.b,q.c,q.d,q.e,q.f,q.r],r))}return A.O(["version",p.a,"values",p.b,"upgrades",p.c,"movement",p.d,"field",p.e,"weapons",o,"tuning",p.r.F()],t.N,t.X)}}
A.dY.prototype={
b1(a){var s=this.d,r=this.b
r=B.c.v(B.b.W(a.b/16),0,this.c-1)*r+B.c.v(B.b.W(a.a/16),0,r-1)
if(!(r>=0&&r<s.length))return A.l(s,r)
return s[r]},
q(a,b){var s,r=b.a
if(isFinite(r)){s=b.b
r=isFinite(s)&&r>=0&&s>=0&&r<this.b*16&&s<this.c*16}else r=!1
return r},
F(){var s=this
return A.O(["version",s.a,"width",s.b,"height",s.c,"terrain",s.d],t.N,t.X)}}
A.ei.prototype={
cY(a){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=t.d1.a(B.i.cI(a,null))
switch(J.aZ(s,"kind")){case"init":if(!J.ak(J.aZ(s,"protocol"),1)||!J.ak(J.aZ(s,"build"),"8c12ff1c"))throw A.h(B.a4);++i.f
i.e=null
p=i.r
if(p.a>0){p.b=p.c=p.d=p.e=p.f=null
p.a=0
p.aR()}p=t.f
o=t.N
n=t.z
i.c=A.kt(A.ao(p.a(J.aZ(s,"rules")),o,n))
n=A.ao(p.a(J.aZ(s,"map")),o,n)
p=A.G(n.i(0,"version"))
m=A.f(n.i(0,"width"))
l=A.f(n.i(0,"height"))
n=A.c_(t.R.a(n.i(0,"terrain")),!0,t.S)
k=new Uint8Array(A.lF(n))
if(m<=0||l<=0||n.length!==m*l)A.cx(B.a6)
i.d=new A.dY(p,m,l,k)
i.a.$1(B.i.ai(t.G.a(A.O(["kind","ready","rules",i.c.a,"map",p,"backend",i.b],o,t.X)),null))
break
case"cancel":p=i.e
o=J.aZ(s,"id")
if(p==null?o==null:p===o)i.r.l(0,A.f(J.aZ(s,"id")))
break
case"plan":if(i.c==null||i.d==null||i.e!=null){p=A.jq("AI \u5c1a\u672a\u5c31\u7eea\u6216\u5df2\u6709\u8bf7\u6c42\u6267\u884c\u4e2d")
throw A.h(p)}r=A.kr(A.ao(t.f.a(J.aZ(s,"request")),t.N,t.z))
i.e=r.d
i.aI(r,i.f)
break
default:throw A.h(B.a5)}}catch(j){q=A.aL(j)
i.a.$1(B.i.ai(t.G.a(A.O(["kind","error","message",J.bj(q)],t.N,t.X)),null))}},
aI(a,b){return this.cq(a,b)},
cq(a3,a4){var s=0,r=A.m_(t.p),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
var $async$aI=A.me(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:a1=new A.hA()
$.j6()
a1.bg()
m=a1
p=4
i=n.c
i.toString
h=n.d
h.toString
g=new A.eh(i.r)
f=new A.eq(i,h,a3,g,A.X(t.S,t.b))
e=t.N
h=new A.ea(h,i,g,A.X(e,t.i))
f.e=h
f.f=new A.em(i,g,A.X(e,t.cM))
f.r=new A.h0(a3,i,h)
l=f
k=0
i=l.bh(),h=i.$ti,i=new A.aI(i.a(),h.h("aI<1>")),h=h.c,g=n.r,d=a3.d,c=t.p
case 7:if(!i.j()){s=8
break}b=i.b
if(b==null)h.a(b)
if(a4!==n.f||g.q(0,d)){if(a4===n.f){n.e=null
g.ag(0,d)
n.a.$1(B.i.ai(t.G.a(A.O(["kind","cancelled","id",d],e,t.X)),null))}s=1
break}b=k
if(typeof b!=="number"){q=b.da()
s=1
break}a=b+1
k=a
s=a>=n.c.r.CW?9:10
break
case 9:k=0
b=m
if(b.b==null)b.b=$.he.$0()
s=11
return A.lx(A.kH(B.H,c),$async$aI)
case 11:m.bg()
case 10:s=7
break
case 8:if(a4!==n.f){s=1
break}if(g.ag(0,d)){n.e=null
n.a.$1(B.i.ai(t.G.a(A.O(["kind","cancelled","id",d],e,t.X)),null))
s=1
break}n.e=null
i=l.w
i.toString
n.a.$1(B.i.ai(t.G.a(A.O(["kind","reply","reply",A.jb(a3,i,null,m.gbQ()).F()],e,t.X)),null))
p=2
s=6
break
case 4:p=3
a2=o.pop()
j=A.aL(a2)
if(a4!==n.f){s=1
break}n.e=null
i=A.c(["\u89c4\u5212\u5931\u8d25\uff0c\u4e3b\u73af\u5883\u4fdd\u7559\u6709\u9650\u5b89\u5168\u4fdd\u62a4"],t.s)
h=m.gbQ()
n.a.$1(B.i.ai(t.G.a(A.O(["kind","reply","reply",A.jb(a3,new A.bI("preparing",null,0,1,B.af,i,!1,0,0,0),J.bj(j),h).F()],t.N,t.X)),null))
s=6
break
case 3:s=2
break
case 6:case 1:return A.lz(q,r)
case 2:return A.ly(o.at(-1),r)}})
return A.lA($async$aI,r)}}
A.iz.prototype={
$1(a){t.r.a(a)
return a.w*3+a.f*0.35+a.gO()*8},
$S:54}
A.iA.prototype={
$1(a){return t.q.a(a).b===this.a.b},
$S:1}
A.iB.prototype={
$1(a){var s
t.r.a(a)
if(a.c===this.a.a){s=a.as
s=!(s===B.f||s===B.e)}else s=!1
return s},
$S:0}
A.iC.prototype={
$2(a,b){var s
A.aj(a)
t.r.a(b)
s=A.ac(b)
return a+s*(b.k1==null?0.12:0.03)},
$S:20}
A.a0.prototype={}
A.an.prototype={
gab(){var s,r=this.a
if(r.at!=null)r=r.db
else{r=this.d
if(r.length===0)r=1/0
else{s=A.j(r)
s=new A.R(r,s.h("i(1)").a(new A.el()),s.h("R<1,i>")).a6(0,B.x)
r=s}}return r}}
A.el.prototype={
$1(a){return t.O.a(a).b},
$S:56}
A.hC.prototype={
d0(c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7=this,b8="marchSpeed",b9=b7.a,c0=c3.a,c1=b9.A(c0),c2=A.c([],t.k)
for(s=b9.r,r=s.length,q=c3.e,p=c3.f,o=b7.b,n=o.b,o=o.r.b,m=q.a,l=q.b,k=c3.ay,j=c3.b,i=0;i<r;++i){h=s[i]
if(h.b!==j){g=h.as
g=g===B.f||g===B.e||h.f<=0}else g=!0
if(g)continue
if(h.a===k){B.a.l(c2,new A.a0(h,0,1))
continue}if(h.fy)continue
g=h.z
f=g.I(q)
e=h.p3===c0
d=!e
if(d){c=n.i(0,b8)
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
a4=new A.J(g.a+b/a0*a3,g.b+a/a0*a3)
if(p.aj(a4).I(a4)>48)continue}d=n.i(0,b8)
d.toString
a5=A.mr(q,o,e,d,p,g,new A.hD(b7),c)
if(a5==null)continue
if(h.as===B.n||a1)g=0.35
else if(a2>0.8)g=1
else g=f<72?0.9:0.55
B.a.l(c2,new A.a0(h,a5,g))}B.a.C(c2,new A.hE())
c0=A.j(c1)
r=t.r
a6=A.bP(new A.d(c1,c0.h("e(1)").a(new A.hF(c3)),c0.h("d<1>")),r)
q=A.c([],t.e)
if(a6!=null)q.push(a6)
c0=c0.h("N<1>")
B.a.E(q,new A.N(c1,c0).bi(0,c0.h("e(k.E)").a(new A.hG(a6))))
c0=t.S
a7=A.a1(q,0,A.Z(c3.ga9(),"count",c0),r).a7(0)
a8=A.X(t.N,c0)
a9=B.a.al(b9.w,new A.hH(c3)).c
for(b9=a7.length,i=0;c0=a7.length,i<c0;a7.length===b9||(0,A.w)(a7),++i){b0=a7[i]
if(b0.as===B.e)b1=0
else{c0=n.i(0,"soldierLimit")
c0.toString
b1=Math.min(a9,B.b.k(c0)-b0.gO())}a9-=b1
a8.u(0,b0.a,b0.gO()+b1)}b9=c2.length
b2=null
if(b9!==0&&c0!==0)for(c0=c3.cy,r=c3.at,q=c3.ax,p=r==null,o=b7.d,n=c3.d,b3=0;b3<a7.length;++b3,b9=l){b4=a7[b3]
for(m=b4.a,b5=null,i=0;l=c2.length,i<l;c2.length===b9||(0,A.w)(c2),++i){l=c2[i].a
if(p)k=n
else{k=c0?1:0
k=B.c.v(r-q-k,0,5)}b6=o.b5(b4,l,l.ok,Math.max(1,k-b3),!1,a8.i(0,m))
if(b5==null||b6.b<b5.b)b5=b6}if(b2==null||b5.b>b2.b)b2=b5}b9=A.j(s)
return new A.an(c3,c1,c2,b2,new A.d(s,b9.h("e(1)").a(new A.hI(c3)),b9.h("d<1>")).H(0,0,new A.hJ(),t.i))}}
A.hD.prototype={
$2(a,b){var s=this.a,r=s.c,q=r.ad(a,b)
if(!isFinite(q)&&r.c.e){r=a.I(b)
s=s.b.b.i(0,"marchSpeed")
s.toString
s=r/s}else s=q
return s},
$S:57}
A.hE.prototype={
$2(a,b){var s,r=t.O
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.q.t(a.a.a,b.a.a):B.b.t(r,s)},
$S:58}
A.hF.prototype={
$1(a){return t.r.a(a).a===this.a.ch},
$S:0}
A.hG.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.hH.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:8}
A.hI.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=!1
if(a.b===s.b)if(a.c===s.a){s=a.as
s=!(s===B.f||s===B.e)&&!a.fy}else s=r
else s=r
return s},
$S:0}
A.hJ.prototype={
$2(a,b){return A.aj(a)+A.ac(t.r.a(b))},
$S:20}
A.eh.prototype={
a2(){var s=this,r=s.b
if(r>=s.a.z){s.e=!0
return!1}s.b=r+1
return!0},
cz(){var s=this,r=s.c
if(r>=s.a.Q){s.e=!0
return!1}s.c=r+1
return!0},
d1(){var s=this,r=s.d
if(r>=s.a.as){s.e=!0
return!1}s.d=r+1
return!0}}
A.iw.prototype={
$1(a){A.G(a)
return A.id(v.G.self).postMessage(a)},
$S:59}
A.ix.prototype={
$1(a){return this.a.cY(A.G(A.id(a).data))},
$S:46};(function aliases(){var s=J.aO.prototype
s.c5=s.p
s=A.b.prototype
s.bi=s.d7})();(function installTearOffs(){var s=hunkHelpers._static_0,r=hunkHelpers._static_1,q=hunkHelpers.installStaticTearOff
s(A,"lZ","kS",4)
r(A,"mg","l5",12)
r(A,"mh","l6",12)
r(A,"mi","l7",12)
s(A,"jT","m9",3)
r(A,"mk","lD",21)
q(A,"mC",2,null,["$1$2","$2"],["k2",function(a,b){return A.k2(a,b,t.H)}],30,0)
q(A,"mB",2,null,["$1$2","$2"],["k1",function(a,b){return A.k1(a,b,t.H)}],30,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.y,null)
q(A.y,[A.iI,J.cN,A.c8,J.b0,A.B,A.hz,A.b,A.t,A.c0,A.S,A.bO,A.b8,A.bL,A.ce,A.I,A.ax,A.bn,A.bF,A.cf,A.a3,A.hK,A.fV,A.bM,A.cl,A.C,A.fQ,A.b4,A.ae,A.bY,A.ap,A.dh,A.ia,A.i8,A.dd,A.aI,A.am,A.ba,A.T,A.de,A.dm,A.cr,A.bq,A.dk,A.bd,A.A,A.cq,A.cF,A.cH,A.i3,A.cI,A.df,A.d3,A.c9,A.hQ,A.aB,A.a7,A.a8,A.dn,A.hA,A.br,A.aR,A.ek,A.aA,A.bE,A.em,A.cz,A.aq,A.eq,A.a4,A.eX,A.J,A.e6,A.q,A.U,A.b_,A.dZ,A.fW,A.d5,A.h0,A.x,A.ab,A.M,A.bI,A.e9,A.e8,A.hf,A.bk,A.ea,A.V,A.eg,A.dY,A.ei,A.a0,A.an,A.hC,A.eh])
q(J.cN,[J.cP,J.bR,J.bU,J.bT,J.bV,J.bS,J.bm])
q(J.bU,[J.aO,J.r,A.bo,A.c3])
q(J.aO,[J.d4,J.cb,J.aN])
r(J.cO,A.c8)
r(J.fL,J.r)
q(J.bS,[J.bQ,J.cQ])
q(A.B,[A.bX,A.aG,A.cR,A.dc,A.d8,A.dg,A.bW,A.cB,A.aw,A.cd,A.db,A.ca,A.cG])
q(A.b,[A.n,A.b5,A.d,A.bN,A.b7,A.bs,A.bc,A.ar])
q(A.n,[A.k,A.a5,A.af,A.b3])
q(A.k,[A.D,A.R,A.N,A.dj])
r(A.bJ,A.b5)
r(A.bK,A.b7)
q(A.ax,[A.bf,A.bt])
q(A.bf,[A.aT,A.aU])
r(A.bu,A.bt)
r(A.bw,A.bn)
r(A.cc,A.bw)
r(A.bG,A.cc)
r(A.bH,A.bF)
q(A.a3,[A.cM,A.cD,A.cE,A.da,A.is,A.iu,A.hN,A.hM,A.ie,A.i_,A.fS,A.dv,A.dT,A.dL,A.dM,A.dN,A.dP,A.dz,A.dA,A.dB,A.dD,A.dF,A.dG,A.dK,A.dJ,A.dR,A.dx,A.dU,A.dW,A.ez,A.eA,A.eR,A.eS,A.eT,A.eU,A.eV,A.eC,A.eE,A.eF,A.eJ,A.eN,A.eP,A.ex,A.ey,A.ew,A.es,A.ev,A.er,A.fH,A.fI,A.fG,A.fJ,A.fE,A.fD,A.fF,A.fC,A.eY,A.f_,A.fl,A.fn,A.fp,A.fr,A.f0,A.ft,A.f2,A.f4,A.f6,A.f8,A.fb,A.fd,A.ff,A.fh,A.fi,A.fj,A.fm,A.fz,A.fB,A.fu,A.fv,A.fx,A.fy,A.du,A.e4,A.e5,A.e1,A.e0,A.e3,A.e_,A.fX,A.fZ,A.h3,A.h5,A.h7,A.h8,A.h9,A.ha,A.h1,A.h2,A.il,A.hh,A.hg,A.hk,A.ht,A.hv,A.hx,A.hy,A.hn,A.hq,A.eb,A.ed,A.ef,A.iz,A.iA,A.iB,A.el,A.hF,A.hG,A.hH,A.hI,A.iw,A.ix])
r(A.b2,A.cM)
q(A.cD,[A.hc,A.hO,A.hP,A.i9,A.fK,A.hR,A.hW,A.hV,A.hT,A.hS,A.hZ,A.hY,A.hX,A.i7,A.ii,A.dw,A.dS,A.dy,A.eK,A.fY,A.hb])
r(A.c5,A.aG)
q(A.da,[A.d9,A.bl])
q(A.C,[A.aE,A.di])
q(A.cE,[A.fM,A.it,A.ig,A.ij,A.i0,A.fR,A.fU,A.i4,A.dO,A.dQ,A.dC,A.dE,A.dH,A.dI,A.dV,A.dX,A.en,A.eo,A.iq,A.eB,A.eM,A.eQ,A.eW,A.eD,A.eG,A.eH,A.eI,A.eL,A.eO,A.et,A.eu,A.eZ,A.fa,A.fo,A.fq,A.fs,A.f1,A.f3,A.f5,A.f7,A.f9,A.fc,A.fe,A.fg,A.fk,A.fA,A.fw,A.dt,A.e2,A.h_,A.h4,A.h6,A.hi,A.hj,A.hr,A.hs,A.hu,A.hw,A.hl,A.hm,A.ho,A.hp,A.ec,A.ee,A.iC,A.hD,A.hE,A.hJ])
q(A.c3,[A.cU,A.bp])
q(A.bp,[A.cg,A.ci])
r(A.ch,A.cg)
r(A.c1,A.ch)
r(A.cj,A.ci)
r(A.c2,A.cj)
q(A.c1,[A.cV,A.cW])
q(A.c2,[A.cX,A.cY,A.cZ,A.d_,A.d0,A.c4,A.d1])
r(A.bv,A.dg)
r(A.dl,A.cr)
r(A.ck,A.bq)
r(A.aS,A.ck)
r(A.cS,A.bW)
r(A.fN,A.cF)
q(A.cH,[A.fP,A.fO])
r(A.i2,A.i3)
q(A.aw,[A.c6,A.cL])
q(A.df,[A.b1,A.ah,A.az,A.al])
s(A.cg,A.A)
s(A.ch,A.I)
s(A.ci,A.A)
s(A.cj,A.I)
s(A.bw,A.cq)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",i:"double",a_:"num",F:"String",e:"bool",a8:"Null",m:"List",y:"Object",a6:"Map",K:"JSObject"},mangledNames:{},types:["e(q)","e(U)","a(q,q)","~()","a()","a(a)","a(U,U)","e(V)","e(b_)","a(a,U)","e(a0)","e(i)","~(~())","a(a,q)","i(a_,i)","e(ab)","a(a,M)","q(q,q)","a(V,V)","e(J,J)","i(i,q)","@(@)","a8(@)","e(an)","q(a0)","i(i,U)","a(a,a)","e(M)","q?(x)","e(x)","0^(0^,0^)<a_>","~(y?,y?)","a8()","e(m<a>)","@(@,F)","e(a4)","~(@,@)","e(a)","m<ab>(M)","i(i,ab)","a(an,an)","~(@)","a8(y,aQ)","a_(a_,a)","@(F)","i(a_,q)","~(K)","m<q>()","V(V,V)","a8(@,aQ)","e(aA)","~(aA,m<x>,F,U{hero:q?})","i(i,i,a)","a(aq,aq)","i(q)","a8(~())","i(a0)","i(J,J)","a(a0,a0)","~(F)","i(i,F)","a(a,aR)","~(a,@)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"3;":(a,b,c)=>d=>d instanceof A.aT&&a.b(d.a)&&b.b(d.b)&&c.b(d.c),"3;lower,teamSize,upper":(a,b,c)=>d=>d instanceof A.aU&&a.b(d.a)&&b.b(d.b)&&c.b(d.c),"4;high,low,selfHigh,selfLow":a=>b=>b instanceof A.bu&&A.mD(a,b.a)}}
A.lr(v.typeUniverse,JSON.parse('{"aN":"aO","d4":"aO","cb":"aO","mL":"bo","cP":{"e":[],"z":[]},"bR":{"z":[]},"bU":{"K":[]},"aO":{"K":[]},"r":{"m":["1"],"n":["1"],"K":[],"b":["1"]},"cO":{"c8":[]},"fL":{"r":["1"],"m":["1"],"n":["1"],"K":[],"b":["1"]},"b0":{"E":["1"]},"bS":{"i":[],"a_":[]},"bQ":{"i":[],"a":[],"a_":[],"z":[]},"cQ":{"i":[],"a_":[],"z":[]},"bm":{"F":[],"z":[]},"bX":{"B":[]},"n":{"b":["1"]},"k":{"n":["1"],"b":["1"]},"D":{"k":["1"],"n":["1"],"b":["1"],"b.E":"1","k.E":"1"},"t":{"E":["1"]},"b5":{"b":["2"],"b.E":"2"},"bJ":{"b5":["1","2"],"n":["2"],"b":["2"],"b.E":"2"},"c0":{"E":["2"]},"R":{"k":["2"],"n":["2"],"b":["2"],"b.E":"2","k.E":"2"},"d":{"b":["1"],"b.E":"1"},"S":{"E":["1"]},"bN":{"b":["2"],"b.E":"2"},"bO":{"E":["2"]},"b7":{"b":["1"],"b.E":"1"},"bK":{"b7":["1"],"n":["1"],"b":["1"],"b.E":"1"},"b8":{"E":["1"]},"bL":{"E":["1"]},"bs":{"b":["1"],"b.E":"1"},"ce":{"E":["1"]},"N":{"k":["1"],"n":["1"],"b":["1"],"b.E":"1","k.E":"1"},"aT":{"bf":[],"ax":[]},"aU":{"bf":[],"ax":[]},"bu":{"bt":[],"ax":[]},"bG":{"cc":["1","2"],"bw":["1","2"],"bn":["1","2"],"cq":["1","2"],"a6":["1","2"]},"bF":{"a6":["1","2"]},"bH":{"bF":["1","2"],"a6":["1","2"]},"bc":{"b":["1"],"b.E":"1"},"cf":{"E":["1"]},"cM":{"a3":[],"aC":[]},"b2":{"a3":[],"aC":[]},"c5":{"aG":[],"B":[]},"cR":{"B":[]},"dc":{"B":[]},"cl":{"aQ":[]},"a3":{"aC":[]},"cD":{"a3":[],"aC":[]},"cE":{"a3":[],"aC":[]},"da":{"a3":[],"aC":[]},"d9":{"a3":[],"aC":[]},"bl":{"a3":[],"aC":[]},"d8":{"B":[]},"aE":{"C":["1","2"],"jk":["1","2"],"a6":["1","2"],"C.K":"1","C.V":"2"},"a5":{"n":["1"],"b":["1"],"b.E":"1"},"b4":{"E":["1"]},"af":{"n":["1"],"b":["1"],"b.E":"1"},"ae":{"E":["1"]},"b3":{"n":["a7<1,2>"],"b":["a7<1,2>"],"b.E":"a7<1,2>"},"bY":{"E":["a7<1,2>"]},"bf":{"ax":[]},"bt":{"ax":[]},"bo":{"K":[],"z":[]},"c3":{"K":[]},"cU":{"K":[],"z":[]},"bp":{"ad":["1"],"K":[]},"c1":{"A":["i"],"m":["i"],"ad":["i"],"n":["i"],"K":[],"b":["i"],"I":["i"]},"c2":{"A":["a"],"m":["a"],"ad":["a"],"n":["a"],"K":[],"b":["a"],"I":["a"]},"cV":{"A":["i"],"m":["i"],"ad":["i"],"n":["i"],"K":[],"b":["i"],"I":["i"],"z":[],"A.E":"i","I.E":"i"},"cW":{"A":["i"],"m":["i"],"ad":["i"],"n":["i"],"K":[],"b":["i"],"I":["i"],"z":[],"A.E":"i","I.E":"i"},"cX":{"A":["a"],"m":["a"],"ad":["a"],"n":["a"],"K":[],"b":["a"],"I":["a"],"z":[],"A.E":"a","I.E":"a"},"cY":{"A":["a"],"m":["a"],"ad":["a"],"n":["a"],"K":[],"b":["a"],"I":["a"],"z":[],"A.E":"a","I.E":"a"},"cZ":{"A":["a"],"m":["a"],"ad":["a"],"n":["a"],"K":[],"b":["a"],"I":["a"],"z":[],"A.E":"a","I.E":"a"},"d_":{"A":["a"],"m":["a"],"ad":["a"],"n":["a"],"K":[],"b":["a"],"I":["a"],"z":[],"A.E":"a","I.E":"a"},"d0":{"A":["a"],"m":["a"],"ad":["a"],"n":["a"],"K":[],"b":["a"],"I":["a"],"z":[],"A.E":"a","I.E":"a"},"c4":{"A":["a"],"m":["a"],"ad":["a"],"n":["a"],"K":[],"b":["a"],"I":["a"],"z":[],"A.E":"a","I.E":"a"},"d1":{"iP":[],"A":["a"],"m":["a"],"ad":["a"],"n":["a"],"K":[],"b":["a"],"I":["a"],"z":[],"A.E":"a","I.E":"a"},"dg":{"B":[]},"bv":{"aG":[],"B":[]},"aI":{"E":["1"]},"ar":{"b":["1"],"b.E":"1"},"am":{"B":[]},"T":{"aM":["1"]},"cr":{"ju":[]},"dl":{"cr":[],"ju":[]},"aS":{"bq":["1"],"jm":["1"],"iN":["1"],"n":["1"],"b":["1"]},"bd":{"E":["1"]},"C":{"a6":["1","2"]},"bn":{"a6":["1","2"]},"cc":{"bw":["1","2"],"bn":["1","2"],"cq":["1","2"],"a6":["1","2"]},"bq":{"iN":["1"],"n":["1"],"b":["1"]},"ck":{"bq":["1"],"iN":["1"],"n":["1"],"b":["1"]},"di":{"C":["F","@"],"a6":["F","@"],"C.K":"F","C.V":"@"},"dj":{"k":["F"],"n":["F"],"b":["F"],"b.E":"F","k.E":"F"},"bW":{"B":[]},"cS":{"B":[]},"i":{"a_":[]},"a":{"a_":[]},"m":{"n":["1"],"b":["1"]},"df":{"cJ":[]},"cB":{"B":[]},"aG":{"B":[]},"aw":{"B":[]},"c6":{"B":[]},"cL":{"B":[]},"cd":{"B":[]},"db":{"B":[]},"ca":{"B":[]},"cG":{"B":[]},"d3":{"B":[]},"c9":{"B":[]},"dn":{"aQ":[]},"br":{"kZ":[]},"b1":{"cJ":[]},"ah":{"cJ":[]},"az":{"cJ":[]},"al":{"cJ":[]},"kK":{"m":["a"],"n":["a"],"b":["a"]},"iP":{"m":["a"],"n":["a"],"b":["a"]},"l3":{"m":["a"],"n":["a"],"b":["a"]},"kI":{"m":["a"],"n":["a"],"b":["a"]},"l1":{"m":["a"],"n":["a"],"b":["a"]},"kJ":{"m":["a"],"n":["a"],"b":["a"]},"l2":{"m":["a"],"n":["a"],"b":["a"]},"kF":{"m":["i"],"n":["i"],"b":["i"]},"kG":{"m":["i"],"n":["i"],"b":["i"]}}'))
A.lq(v.typeUniverse,JSON.parse('{"n":1,"bp":1,"ck":1,"cF":2,"cH":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.cv
return{T:s("x"),q:s("U"),I:s("M"),t:s("b_"),a9:s("az"),r:s("q"),bJ:s("bk"),o:s("V"),J:s("ab"),u:s("am"),b:s("an"),cM:s("bE"),cs:s("a4"),U:s("n<@>"),V:s("B"),bo:s("bN<M,ab>"),h:s("aC"),O:s("a0"),E:s("b2<i>"),fy:s("b<U>"),ef:s("b<q>"),er:s("b<ab>(M)"),R:s("b<@>"),w:s("r<x>"),Y:s("r<U>"),Z:s("r<M>"),eu:s("r<b_>"),e:s("r<q>"),_:s("r<J>"),W:s("r<V>"),m:s("r<ab>"),bL:s("r<an>"),k:s("r<a0>"),a5:s("r<m<J>>"),eG:s("r<m<y>>"),x:s("r<m<i>>"),A:s("r<m<a>>"),d:s("r<a6<F,y?>>"),Q:s("r<y>"),eV:s("r<+(aA,m<x>,m<q>)>"),s:s("r<F>"),aD:s("r<aR>"),bQ:s("r<aq>"),n:s("r<i>"),gn:s("r<@>"),a:s("r<a>"),v:s("bR"),B:s("K"),cj:s("aN"),aU:s("ad<@>"),f3:s("m<x>"),bd:s("m<q>"),j:s("m<@>"),L:s("m<a>"),d1:s("a6<F,@>"),f:s("a6<@,@>"),G:s("a6<F,y?>"),P:s("a8"),K:s("y"),gT:s("mM"),bY:s("+()"),fR:s("+(aA,m<x>,m<q>)"),l:s("aQ"),N:s("F"),aQ:s("D<aq>"),gf:s("aR"),dm:s("z"),eK:s("aG"),ak:s("cb"),eq:s("d<i>"),cO:s("bs<q>"),c:s("T<@>"),dp:s("aq"),dT:s("ar<a4>"),gL:s("ar<a>"),y:s("e"),al:s("e(y)"),db:s("e(i)"),i:s("i"),z:s("@"),fO:s("@()"),D:s("@(y)"),C:s("@(y,aQ)"),S:s("a"),dg:s("q?"),eH:s("aM<a8>?"),an:s("K?"),bM:s("m<@>?"),eg:s("m<a>?"),X:s("y?"),dk:s("F?"),F:s("ba<@,@>?"),g:s("dk?"),fQ:s("e?"),cD:s("i?"),h6:s("a?"),cg:s("a_?"),H:s("a_"),p:s("~"),M:s("~()"),cA:s("~(F,@)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.a9=J.cN.prototype
B.a=J.r.prototype
B.c=J.bQ.prototype
B.b=J.bS.prototype
B.q=J.bm.prototype
B.aa=J.aN.prototype
B.ab=J.bU.prototype
B.N=J.d4.prototype
B.y=J.cb.prototype
B.l=new A.al(0,"upgrade")
B.z=new A.al(1,"dismiss")
B.v=new A.al(2,"recruit")
B.m=new A.al(3,"soldiers")
B.A=new A.al(4,"buyWeapon")
B.B=new A.al(5,"dispatch")
B.O=new A.al(6,"move")
B.P=new A.al(8,"retreat")
B.f=new A.ah(0,"garrison")
B.n=new A.ah(2,"camped")
B.w=new A.ah(3,"queue")
B.C=new A.ah(4,"attacking")
B.e=new A.ah(5,"defending")
B.t=new A.ah(7,"retreating")
B.D=new A.az(0,"full")
B.E=new A.az(1,"resources")
B.F=new A.az(2,"defense")
B.k=new A.az(3,"attack")
B.M=s([],t._)
B.u=new A.bk(B.M,1/0,!1)
B.S=new A.bk(B.M,1/0,!1)
B.at=new A.cz(8,24,6,1.5,30,12,0.5,10,3,1,96,160,6000,8,24,4,6,8,2,12,2.25,0.3,20,900,64,0.25,8,0.06,0.12,0.35,0.05,2500,2,60)
B.G=new A.b2(A.mB(),t.E)
B.x=new A.b2(A.mC(),t.E)
B.H=new A.cI()
B.T=new A.bL(A.cv("bL<0&>"))
B.I=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.U=function() {
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
B.Z=function(getTagFallback) {
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
B.V=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.Y=function(hooks) {
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
B.X=function(hooks) {
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
B.W=function(hooks) {
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

B.i=new A.fN()
B.a_=new A.d3()
B.o=new A.hz()
B.j=new A.dl()
B.a0=new A.dn()
B.h=new A.b1(0,"favorable")
B.a1=new A.b1(1,"close")
B.p=new A.b1(2,"unfavorable")
B.K=new A.b1(3,"unknown")
B.au=s(["\u9759\u6001\u8bc4\u4f30\u914d\u989d\u8017\u5c3d"],t.s)
B.a2=new A.bE(B.K,-1,1,0,0,!1)
B.a3=new A.aB("AI \u534f\u8bae\u7248\u672c\u4e0d\u5339\u914d")
B.a4=new A.aB("AI \u6784\u5efa\u7248\u672c\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u751f\u6210 Worker")
B.a5=new A.aB("\u672a\u77e5 AI \u5de5\u4f5c\u547d\u4ee4")
B.a6=new A.aB("AI \u5730\u56fe\u5c3a\u5bf8\u65e0\u6548")
B.a7=new A.aB("\u56fd\u5bb6\u89c4\u5212\u9759\u6001\u7248\u672c\u4e0d\u5339\u914d")
B.a8=new A.aB("\u56fd\u5bb6\u89c2\u5bdf\u8d85\u51fa\u534f\u8bae\u5bb9\u91cf")
B.ac=new A.fO(null)
B.ad=new A.fP(null)
B.Q=new A.ah(1,"marching")
B.R=new A.ah(6,"field")
B.L=s([B.f,B.Q,B.n,B.w,B.C,B.e,B.R,B.t],A.cv("r<ah>"))
B.ae=s([B.D,B.E,B.F,B.k],A.cv("r<az>"))
B.af=s([],t.Z)
B.av=s([],t.W)
B.r=s([],t.m)
B.ag=s([],t.s)
B.d=s([],t.a)
B.ah=A.av("mH")
B.ai=A.av("mI")
B.aj=A.av("kF")
B.ak=A.av("kG")
B.al=A.av("kI")
B.am=A.av("kJ")
B.an=A.av("kK")
B.ao=A.av("y")
B.ap=A.av("l1")
B.aq=A.av("l2")
B.ar=A.av("l3")
B.as=A.av("iP")})();(function staticFields(){$.i1=null
$.ag=A.c([],t.Q)
$.jn=null
$.hd=0
$.he=A.lZ()
$.je=null
$.jd=null
$.jX=null
$.jR=null
$.k5=null
$.io=null
$.iv=null
$.j2=null
$.i6=A.c([],A.cv("r<m<y>?>"))
$.by=null
$.ct=null
$.cu=null
$.iW=!1
$.L=B.j})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"mK","k8",()=>A.ip("_$dart_dartClosure"))
s($,"mJ","j5",()=>A.ip("_$dart_dartClosure_dartJSInterop"))
s($,"n0","kj",()=>A.c([new J.cO()],A.cv("r<c8>")))
s($,"mP","k9",()=>A.aH(A.hL({
toString:function(){return"$receiver$"}})))
s($,"mQ","ka",()=>A.aH(A.hL({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"mR","kb",()=>A.aH(A.hL(null)))
s($,"mS","kc",()=>A.aH(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"mV","kf",()=>A.aH(A.hL(void 0)))
s($,"mW","kg",()=>A.aH(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"mU","ke",()=>A.aH(A.js(null)))
s($,"mT","kd",()=>A.aH(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"mY","ki",()=>A.aH(A.js(void 0)))
s($,"mX","kh",()=>A.aH(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"mZ","j7",()=>A.l4())
s($,"n_","dr",()=>A.k3(B.ao))
s($,"mN","j6",()=>{A.kU()
return $.hd})})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.bo,SharedArrayBuffer:A.bo,ArrayBufferView:A.c3,DataView:A.cU,Float32Array:A.cV,Float64Array:A.cW,Int16Array:A.cX,Int32Array:A.cY,Int8Array:A.cZ,Uint16Array:A.d_,Uint32Array:A.d0,Uint8ClampedArray:A.c4,CanvasPixelArray:A.c4,Uint8Array:A.d1})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bp.$nativeSuperclassTag="ArrayBufferView"
A.cg.$nativeSuperclassTag="ArrayBufferView"
A.ch.$nativeSuperclassTag="ArrayBufferView"
A.c1.$nativeSuperclassTag="ArrayBufferView"
A.ci.$nativeSuperclassTag="ArrayBufferView"
A.cj.$nativeSuperclassTag="ArrayBufferView"
A.c2.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$0=function(){return this()}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$1=function(a){return this(a)}
Function.prototype.$1$2=function(a,b){return this(a,b)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.mz
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()