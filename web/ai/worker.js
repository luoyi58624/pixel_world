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
if(a[b]!==s){A.nc(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.c(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.jt(b)
return new s(c,this)}:function(){if(s===null)s=A.jt(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.jt(a).prototype
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
jz(a,b,c,d){return{i:a,p:b,e:c,x:d}},
ju(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.jx==null){A.n1()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.j(A.jZ("Return interceptor for "+A.v(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.iw
if(o==null)o=$.iw=A.iS(n)
p=q[o]}if(p!=null)return p
p=A.n6(a)
if(p!=null)return p
if(typeof a=="function")return B.aa
s=Object.getPrototypeOf(a)
if(s==null)return B.N
if(s===Object.prototype)return B.N
if(typeof q=="function"){o=$.iw
if(o==null)o=$.iw=A.iS(n)
Object.defineProperty(q,o,{value:B.z,enumerable:false,writable:true,configurable:true})
return B.z}return B.z},
li(a,b){if(a<0||a>4294967295)throw A.j(A.b8(a,0,4294967295,"length",null))
return J.lj(new Array(a),b)},
jO(a,b){if(a<0)throw A.j(A.cE("Length must be a non-negative integer: "+a,null))
return A.c(new Array(a),b.h("t<0>"))},
lj(a,b){var s=A.c(a,b.h("t<0>"))
s.$flags=1
return s},
bi(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bT.prototype
return J.cU.prototype}if(typeof a=="string")return J.b4.prototype
if(a==null)return J.bU.prototype
if(typeof a=="boolean")return J.cT.prototype
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aR.prototype
if(typeof a=="symbol")return J.bX.prototype
if(typeof a=="bigint")return J.bV.prototype
return a}if(a instanceof A.x)return a
return J.ju(a)},
cA(a){if(typeof a=="string")return J.b4.prototype
if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aR.prototype
if(typeof a=="symbol")return J.bX.prototype
if(typeof a=="bigint")return J.bV.prototype
return a}if(a instanceof A.x)return a
return J.ju(a)},
aC(a){if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aR.prototype
if(typeof a=="symbol")return J.bX.prototype
if(typeof a=="bigint")return J.bV.prototype
return a}if(a instanceof A.x)return a
return J.ju(a)},
mX(a){if(typeof a=="number")return J.bq.prototype
if(typeof a=="string")return J.b4.prototype
if(a==null)return a
if(!(a instanceof A.x))return J.bw.prototype
return a},
ao(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bi(a).ac(a,b)},
b_(a,b){if(typeof b==="number")if(Array.isArray(a)||A.n5(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.aC(a).i(a,b)},
kQ(a,b){return J.aC(a).l(a,b)},
kR(a,b){return J.aC(a).H(a,b)},
jD(a,b){return J.mX(a).t(a,b)},
j4(a,b){return J.aC(a).T(a,b)},
kS(a,b,c,d){return J.aC(a).D(a,b,c,d)},
du(a){return J.aC(a).gF(a)},
af(a){return J.bi(a).gR(a)},
j5(a){return J.cA(a).ga3(a)},
jE(a){return J.cA(a).gaq(a)},
H(a){return J.aC(a).gB(a)},
kT(a){return J.aC(a).gbi(a)},
bl(a){return J.cA(a).gm(a)},
kU(a){return J.bi(a).gS(a)},
j6(a,b){return J.aC(a).bo(a,b)},
bm(a){return J.bi(a).p(a)},
cR:function cR(){},
cT:function cT(){},
bU:function bU(){},
bW:function bW(){},
aS:function aS(){},
d6:function d6(){},
bw:function bw(){},
aR:function aR(){},
bV:function bV(){},
bX:function bX(){},
t:function t(a){this.$ti=a},
cS:function cS(){},
fY:function fY(a){this.$ti=a},
b1:function b1(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bq:function bq(){},
bT:function bT(){},
cU:function cU(){},
b4:function b4(){}},A={ja:function ja(){},
lk(a){return new A.bZ("Field '"+a+"' has not been initialized.")},
aJ(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
i3(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
W(a,b,c){return a},
jy(a){var s,r
for(s=$.ak.length,r=0;r<s;++r)if(a===$.ak[r])return!0
return!1},
Z(a,b,c,d){A.cb(b,"start")
if(c!=null){A.cb(c,"end")
if(b>c)A.cB(A.b8(b,0,c,"start",null))}return new A.y(a,b,c,d.h("y<0>"))},
ln(a,b,c,d){if(t.U.b(a))return new A.bN(a,b,c.h("@<0>").E(d).h("bN<1,2>"))
return new A.b7(a,b,c.h("@<0>").E(d).h("b7<1,2>"))},
lx(a,b,c){A.cb(b,"takeCount")
if(t.U.b(a))return new A.bO(a,b,c.h("bO<0>"))
return new A.b9(a,b,c.h("b9<0>"))},
aH(){return new A.ce("No element")},
bZ:function bZ(a){this.a=a},
i1:function i1(){},
p:function p(){},
k:function k(){},
y:function y(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
r:function r(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
b7:function b7(a,b,c){this.a=a
this.b=b
this.$ti=c},
bN:function bN(a,b,c){this.a=a
this.b=b
this.$ti=c},
c3:function c3(a,b,c){var _=this
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
U:function U(a,b,c){this.a=a
this.b=b
this.$ti=c},
bR:function bR(a,b,c){this.a=a
this.b=b
this.$ti=c},
bS:function bS(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b9:function b9(a,b,c){this.a=a
this.b=b
this.$ti=c},
bO:function bO(a,b,c){this.a=a
this.b=b
this.$ti=c},
ba:function ba(a,b,c){this.a=a
this.b=b
this.$ti=c},
bP:function bP(a){this.$ti=a},
bx:function bx(a,b){this.a=a
this.$ti=b},
ch:function ch(a,b){this.a=a
this.$ti=b},
I:function I(){},
L:function L(a,b){this.a=a
this.$ti=b},
ev(a,b,c){var s,r,q,p,o,n,m,l=A.l(a),k=A.c2(new A.a6(a,l.h("a6<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.u)(k),++i,p=o){r=k[i]
c.a(a.i(0,r))
o=p+1
q[r]=p}n=A.c2(new A.ai(a,l.h("ai<2>")),!0,c)
m=new A.bL(q,n,b.h("@<0>").E(c).h("bL<1,2>"))
m.$keys=k
return m}return new A.bK(A.as(a,b,c),b.h("@<0>").E(c).h("bK<1,2>"))},
kD(a){var s=A.kC(a)
if(s!=null)return s
return"minified:"+a},
n5(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
v(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.bm(a)
return s},
d8(a){var s,r=$.jT
if(r==null)r=$.jT=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
ls(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.n(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
d9(a){var s,r,q,p
if(a instanceof A.x)return A.aa(A.ay(a),null)
s=J.bi(a)
if(s===B.a9||s===B.ab||t.ak.b(a)){r=B.I(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aa(A.ay(a),null)},
jU(a){var s,r,q
if(a==null||typeof a=="number"||A.jo(a))return J.bm(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a4)return a.p(0)
if(a instanceof A.aB)return a.bM(!0)
s=$.kP()
for(r=0;r<1;++r){q=s[r].dt(a)
if(q!=null)return q}return"Instance of '"+A.d9(a)+"'"},
lp(){return Date.now()},
lr(){var s,r
if($.hB!==0)return
$.hB=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
if(!!s.dartUseDateNowForTicks)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.hB=1e6
$.hC=new A.hA(r)},
a0(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.bH(s,10)|55296)>>>0,s&1023|56320)}throw A.j(A.b8(a,0,1114111,null,null))},
lq(a){var s=a.$thrownJsError
if(s==null)return null
return A.bG(s)},
jw(a){throw A.j(A.kn(a))},
n(a,b){if(a==null)J.bl(a)
throw A.j(A.kr(a,b))},
kr(a,b){var s,r="index"
if(!A.kg(b))return new A.aA(!0,b,r,null)
s=J.bl(a)
if(b<0||b>=s)return A.j8(b,s,a,r)
return new A.ca(null,null,!0,b,r,"Value not in range")},
kn(a){return new A.aA(!0,a,null,null)},
kp(a){return a},
j(a){return A.T(a,new Error())},
T(a,b){var s
if(a==null)a=new A.aK()
b.dartException=a
s=A.nd
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
nd(){return J.bm(this.dartException)},
cB(a,b){throw A.T(a,b==null?new Error():b)},
cC(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.cB(A.mb(a,b,c),s)},
mb(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.cg("'"+s+"': Cannot "+o+" "+l+k+n)},
u(a){throw A.j(A.X(a))},
aL(a){var s,r,q,p,o,n
a=A.nb(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.c([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.ic(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
id(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
jY(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
jb(a,b){var s=b==null,r=s?null:b.method
return new A.cV(a,r,s?null:b.receiver)},
aP(a){var s
if(a==null)return new A.h7(a)
if(a instanceof A.bQ){s=a.a
return A.aZ(a,s==null?A.cv(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.aZ(a,a.dartException)
return A.mL(a)},
aZ(a,b){if(t.V.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
mL(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bH(r,16)&8191)===10)switch(q){case 438:return A.aZ(a,A.jb(A.v(s)+" (Error "+q+")",null))
case 445:case 5007:A.v(s)
return A.aZ(a,new A.c8())}}if(a instanceof TypeError){p=$.kF()
o=$.kG()
n=$.kH()
m=$.kI()
l=$.kL()
k=$.kM()
j=$.kK()
$.kJ()
i=$.kO()
h=$.kN()
g=p.a9(s)
if(g!=null)return A.aZ(a,A.jb(A.G(s),g))
else{g=o.a9(s)
if(g!=null){g.method="call"
return A.aZ(a,A.jb(A.G(s),g))}else if(n.a9(s)!=null||m.a9(s)!=null||l.a9(s)!=null||k.a9(s)!=null||j.a9(s)!=null||m.a9(s)!=null||i.a9(s)!=null||h.a9(s)!=null){A.G(s)
return A.aZ(a,new A.c8())}}return A.aZ(a,new A.de(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.cd()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.aZ(a,new A.aA(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.cd()
return a},
bG(a){var s
if(a instanceof A.bQ)return a.b
if(a==null)return new A.co(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.co(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
ky(a){if(a==null)return J.af(a)
if(typeof a=="object")return A.d8(a)
return J.af(a)},
mV(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.u(0,a[s],a[r])}return b},
mW(a,b){var s,r=a.length
for(s=0;s<r;++s)b.l(0,a[s])
return b},
mk(a,b,c,d,e,f){t.h.a(a)
switch(A.f(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.j(new A.ij("Unsupported number of arguments for wrapped closure"))},
ds(a,b){var s=a.$identity
if(!!s)return s
s=A.mR(a,b)
a.$identity=s
return s},
mR(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.mk)},
l7(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.db().constructor.prototype):Object.create(new A.bo(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.jM(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.l3(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.jM(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
l3(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.j("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.l1)}throw A.j("Error in functionType of tearoff")},
l4(a,b,c,d){var s=A.jL
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
jM(a,b,c,d){if(c)return A.l6(a,b,d)
return A.l4(b.length,d,a,b)},
l5(a,b,c,d){var s=A.jL,r=A.l2
switch(b?-1:a){case 0:throw A.j(new A.da("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
l6(a,b,c){var s,r
if($.jJ==null)$.jJ=A.jI("interceptor")
if($.jK==null)$.jK=A.jI("receiver")
s=b.length
r=A.l5(s,c,a,b)
return r},
jt(a){return A.l7(a)},
l1(a,b){return A.cs(v.typeUniverse,A.ay(a.a),b)},
jL(a){return a.a},
l2(a){return a.b},
jI(a){var s,r,q,p=new A.bo("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.j(A.cE("Field name "+a+" not found.",null))},
iS(a){return v.getIsolateTag(a)},
n6(a){var s,r,q,p,o,n=A.G($.ks.$1(a)),m=$.iR[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.iY[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bC($.km.$2(a,n))
if(q!=null){m=$.iR[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.iY[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.j0(s)
$.iR[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.iY[n]=s
return s}if(p==="-"){o=A.j0(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.kA(a,s)
if(p==="*")throw A.j(A.jZ(n))
if(v.leafTags[n]===true){o=A.j0(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.kA(a,s)},
kA(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.jz(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
j0(a){return J.jz(a,!1,null,!!a.$iag)},
n8(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.j0(s)
else return J.jz(s,c,null,null)},
n1(){if(!0===$.jx)return
$.jx=!0
A.n2()},
n2(){var s,r,q,p,o,n,m,l
$.iR=Object.create(null)
$.iY=Object.create(null)
A.n0()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.kB.$1(o)
if(n!=null){m=A.n8(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
n0(){var s,r,q,p,o,n,m=B.U()
m=A.bF(B.V,A.bF(B.W,A.bF(B.J,A.bF(B.J,A.bF(B.X,A.bF(B.Y,A.bF(B.Z(B.I),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.ks=new A.iV(p)
$.km=new A.iW(o)
$.kB=new A.iX(n)},
bF(a,b){return a(b)||b},
lQ(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.n(b,s)
if(!J.ao(r,b[s]))return!1}return!0},
mT(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
nb(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
aW:function aW(a,b,c){this.a=a
this.b=b
this.c=c},
aM:function aM(a){this.a=a},
bz:function bz(a){this.a=a},
bK:function bK(a,b){this.a=a
this.$ti=b},
bJ:function bJ(){},
bL:function bL(a,b,c){this.a=a
this.b=b
this.$ti=c},
be:function be(a,b){this.a=a
this.$ti=b},
ci:function ci(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cQ:function cQ(){},
b3:function b3(a,b){this.a=a
this.$ti=b},
hA:function hA(a){this.a=a},
cc:function cc(){},
ic:function ic(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
c8:function c8(){},
cV:function cV(a,b,c){this.a=a
this.b=b
this.c=c},
de:function de(a){this.a=a},
h7:function h7(a){this.a=a},
bQ:function bQ(a,b){this.a=a
this.b=b},
co:function co(a){this.a=a
this.b=null},
a4:function a4(){},
cH:function cH(){},
cI:function cI(){},
dc:function dc(){},
db:function db(){},
bo:function bo(a,b){this.a=a
this.b=b},
da:function da(a){this.a=a},
aI:function aI(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
fZ:function fZ(a){this.a=a},
h2:function h2(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
a6:function a6(a,b){this.a=a
this.$ti=b},
b6:function b6(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
ai:function ai(a,b){this.a=a
this.$ti=b},
ah:function ah(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b5:function b5(a,b){this.a=a
this.$ti=b},
c_:function c_(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
iV:function iV(a){this.a=a},
iW:function iW(a){this.a=a},
iX:function iX(a){this.a=a},
aB:function aB(){},
by:function by(){},
bh:function bh(){},
mc(a){return a},
bs:function bs(){},
c6:function c6(){},
cX:function cX(){},
bt:function bt(){},
c4:function c4(){},
c5:function c5(){},
cY:function cY(){},
cZ:function cZ(){},
d_:function d_(){},
d0:function d0(){},
d1:function d1(){},
d2:function d2(){},
d3:function d3(){},
c7:function c7(){},
d4:function d4(){},
cj:function cj(){},
ck:function ck(){},
cl:function cl(){},
cm:function cm(){},
jf(a,b){var s=b.c
return s==null?b.c=A.cq(a,"aQ",[b.x]):s},
jV(a){var s=a.w
if(s===6||s===7)return A.jV(a.x)
return s===11||s===12},
lu(a){return a.as},
kz(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
cz(a){return A.iG(v.typeUniverse,a,!1)},
n4(a,b){var s,r,q,p,o
if(a==null)return null
s=b.y
r=a.Q
if(r==null)r=a.Q=new Map()
q=b.as
p=r.get(q)
if(p!=null)return p
o=A.aY(v.typeUniverse,a.x,s,0)
r.set(q,o)
return o},
aY(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.aY(a1,s,a3,a4)
if(r===s)return a2
return A.k7(a1,r,!0)
case 7:s=a2.x
r=A.aY(a1,s,a3,a4)
if(r===s)return a2
return A.k6(a1,r,!0)
case 8:q=a2.y
p=A.bE(a1,q,a3,a4)
if(p===q)return a2
return A.cq(a1,a2.x,p)
case 9:o=a2.x
n=A.aY(a1,o,a3,a4)
m=a2.y
l=A.bE(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.jk(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bE(a1,j,a3,a4)
if(i===j)return a2
return A.k8(a1,k,i)
case 11:h=a2.x
g=A.aY(a1,h,a3,a4)
f=a2.y
e=A.mI(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.k5(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bE(a1,d,a3,a4)
o=a2.x
n=A.aY(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jl(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.j(A.cG("Attempted to substitute unexpected RTI kind "+a0))}},
bE(a,b,c,d){var s,r,q,p,o=b.length,n=A.iH(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.aY(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
mJ(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.iH(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.aY(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
mI(a,b,c,d){var s,r=b.a,q=A.bE(a,r,c,d),p=b.b,o=A.bE(a,p,c,d),n=b.c,m=A.mJ(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dj()
s.a=q
s.b=o
s.c=m
return s},
c(a,b){a[v.arrayRti]=b
return a},
iQ(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.mZ(s)
return a.$S()}return null},
n3(a,b){var s
if(A.jV(b))if(a instanceof A.a4){s=A.iQ(a)
if(s!=null)return s}return A.ay(a)},
ay(a){if(a instanceof A.x)return A.l(a)
if(Array.isArray(a))return A.h(a)
return A.jn(J.bi(a))},
h(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
l(a){var s=a.$ti
return s!=null?s:A.jn(a)},
jn(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.mj(a,s)},
mj(a,b){var s=a instanceof A.a4?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.m_(v.typeUniverse,s.name)
b.$ccache=r
return r},
mZ(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.iG(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
mY(a){return A.aO(A.l(a))},
jv(a){var s=A.iQ(a)
return A.aO(s==null?A.ay(a):s)},
jr(a){var s
if(a instanceof A.aB)return A.mU(a.$r,a.b5())
s=a instanceof A.a4?A.iQ(a):null
if(s!=null)return s
if(t.dm.b(a))return J.kU(a).a
if(Array.isArray(a))return A.h(a)
return A.ay(a)},
aO(a){var s=a.r
return s==null?a.r=new A.iF(a):s},
mU(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bY
if(0>=p)return A.n(q,0)
s=A.cs(v.typeUniverse,A.jr(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.n(q,r)
s=A.ka(v.typeUniverse,s,A.jr(q[r]))}return A.cs(v.typeUniverse,s,a)},
az(a){return A.aO(A.iG(v.typeUniverse,a,!1))},
mi(a){var s=this
s.b=A.mG(s)
return s.b(a)},
mG(a){var s,r,q,p,o
if(a===t.K)return A.mq
if(A.bj(a))return A.mu
s=a.w
if(s===6)return A.mg
if(s===1)return A.ki
if(s===7)return A.ml
r=A.mF(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bj)){a.f="$i"+q
if(q==="m")return A.mo
if(a===t.B)return A.mn
return A.mt}}else if(s===10){p=A.mT(a.x,a.y)
o=p==null?A.ki:p
return o==null?A.cv(o):o}return A.me},
mF(a){if(a.w===8){if(a===t.S)return A.kg
if(a===t.i||a===t.H)return A.mp
if(a===t.N)return A.ms
if(a===t.y)return A.jo}return null},
mh(a){var s=this,r=A.md
if(A.bj(s))r=A.m3
else if(s===t.K)r=A.cv
else if(A.bH(s)){r=A.mf
if(s===t.h6)r=A.a3
else if(s===t.dk)r=A.bC
else if(s===t.fQ)r=A.jm
else if(s===t.cg)r=A.R
else if(s===t.cD)r=A.m1
else if(s===t.an)r=A.m2}else if(s===t.S)r=A.f
else if(s===t.N)r=A.G
else if(s===t.y)r=A.ax
else if(s===t.H)r=A.w
else if(s===t.i)r=A.aj
else if(s===t.B)r=A.iI
s.a=r
return s.a(a)},
me(a){var s=this
if(a==null)return A.bH(s)
return A.kv(v.typeUniverse,A.n3(a,s),s)},
mg(a){if(a==null)return!0
return this.x.b(a)},
mt(a){var s,r=this
if(a==null)return A.bH(r)
s=r.f
if(a instanceof A.x)return!!a[s]
return!!J.bi(a)[s]},
mo(a){var s,r=this
if(a==null)return A.bH(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.x)return!!a[s]
return!!J.bi(a)[s]},
mn(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.x)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
kh(a){if(typeof a=="object"){if(a instanceof A.x)return t.B.b(a)
return!0}if(typeof a=="function")return!0
return!1},
md(a){var s=this
if(a==null){if(A.bH(s))return a}else if(s.b(a))return a
throw A.T(A.kd(a,s),new Error())},
mf(a){var s=this
if(a==null||s.b(a))return a
throw A.T(A.kd(a,s),new Error())},
kd(a,b){return new A.bA("TypeError: "+A.k0(a,A.aa(b,null)))},
kq(a,b,c,d){if(A.kv(v.typeUniverse,a,b))return a
throw A.T(A.lS("The type argument '"+A.aa(a,null)+"' is not a subtype of the type variable bound '"+A.aa(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
k0(a,b){return A.cO(a)+": type '"+A.aa(A.jr(a),null)+"' is not a subtype of type '"+b+"'"},
lS(a){return new A.bA("TypeError: "+a)},
an(a,b){return new A.bA("TypeError: "+A.k0(a,b))},
ml(a){var s=this
return s.x.b(a)||A.jf(v.typeUniverse,s).b(a)},
mq(a){return a!=null},
cv(a){if(a!=null)return a
throw A.T(A.an(a,"Object"),new Error())},
mu(a){return!0},
m3(a){return a},
ki(a){return!1},
jo(a){return!0===a||!1===a},
ax(a){if(!0===a)return!0
if(!1===a)return!1
throw A.T(A.an(a,"bool"),new Error())},
jm(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.T(A.an(a,"bool?"),new Error())},
aj(a){if(typeof a=="number")return a
throw A.T(A.an(a,"double"),new Error())},
m1(a){if(typeof a=="number")return a
if(a==null)return a
throw A.T(A.an(a,"double?"),new Error())},
kg(a){return typeof a=="number"&&Math.floor(a)===a},
f(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.T(A.an(a,"int"),new Error())},
a3(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.T(A.an(a,"int?"),new Error())},
mp(a){return typeof a=="number"},
w(a){if(typeof a=="number")return a
throw A.T(A.an(a,"num"),new Error())},
R(a){if(typeof a=="number")return a
if(a==null)return a
throw A.T(A.an(a,"num?"),new Error())},
ms(a){return typeof a=="string"},
G(a){if(typeof a=="string")return a
throw A.T(A.an(a,"String"),new Error())},
bC(a){if(typeof a=="string")return a
if(a==null)return a
throw A.T(A.an(a,"String?"),new Error())},
iI(a){if(A.kh(a))return a
throw A.T(A.an(a,"JSObject"),new Error())},
m2(a){if(a==null)return a
if(A.kh(a))return a
throw A.T(A.an(a,"JSObject?"),new Error())},
kk(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aa(a[q],b)
return s},
mA(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.kk(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.aa(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
ke(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.c([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.l(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.n(a4,l)
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
if(l===8){p=A.mK(a.x)
o=a.y
return o.length>0?p+("<"+A.kk(o,b)+">"):p}if(l===10)return A.mA(a,b)
if(l===11)return A.ke(a,b,null)
if(l===12)return A.ke(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.n(b,n)
return b[n]}return"?"},
mK(a){var s=A.kC(a)
if(s!=null)return s
return"minified:"+a},
m0(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
m_(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.iG(a,b,!1)
else if(typeof m=="number"){s=m
r=A.cr(a,5,"#")
q=A.iH(s)
for(p=0;p<s;++p)q[p]=r
o=A.cq(a,b,q)
n[b]=o
return o}else return m},
lZ(a,b){return A.kb(a.tR,b)},
lY(a,b){return A.kb(a.eT,b)},
iG(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.k9(a,null,b,!1)
r.set(b,s)
return s},
cs(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.k9(a,b,c,!0)
q.set(c,r)
return r},
ka(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.jk(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
k9(a,b,c,d){return A.lO(A.lI(a,b,c,d))},
aX(a,b){b.a=A.mh
b.b=A.mi
return b},
cr(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.at(null,null)
s.w=b
s.as=c
r=A.aX(a,s)
a.eC.set(c,r)
return r},
k7(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.lW(a,b,r,c)
a.eC.set(r,s)
return s},
lW(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bj(b))if(!(b===t.P||b===t.v))if(s!==6)r=s===7&&A.bH(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.at(null,null)
q.w=6
q.x=b
q.as=c
return A.aX(a,q)},
k6(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.lU(a,b,r,c)
a.eC.set(r,s)
return s},
lU(a,b,c,d){var s,r
if(d){s=b.w
if(A.bj(b)||b===t.K)return b
else if(s===1)return A.cq(a,"aQ",[b])
else if(b===t.P||b===t.v)return t.eH}r=new A.at(null,null)
r.w=7
r.x=b
r.as=c
return A.aX(a,r)},
lX(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.at(null,null)
s.w=13
s.x=b
s.as=q
r=A.aX(a,s)
a.eC.set(q,r)
return r},
cp(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
lT(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
cq(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.cp(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.at(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.aX(a,r)
a.eC.set(p,q)
return q},
jk(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.cp(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.at(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.aX(a,o)
a.eC.set(q,n)
return n},
k8(a,b,c){var s,r,q="+"+(b+"("+A.cp(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.at(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.aX(a,s)
a.eC.set(q,r)
return r},
k5(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.cp(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.cp(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.lT(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.at(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.aX(a,p)
a.eC.set(r,o)
return o},
jl(a,b,c,d){var s,r=b.as+("<"+A.cp(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.lV(a,b,c,r,d)
a.eC.set(r,s)
return s},
lV(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.iH(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.aY(a,b,r,0)
m=A.bE(a,c,r,0)
return A.jl(a,n,m,c!==m)}}l=new A.at(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.aX(a,l)},
lI(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
lO(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.lK(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.k2(a,r,l,k,!1)
else if(q===46)r=A.k2(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bg(a.u,a.e,k.pop()))
break
case 94:k.push(A.lX(a.u,k.pop()))
break
case 35:k.push(A.cr(a.u,5,"#"))
break
case 64:k.push(A.cr(a.u,2,"@"))
break
case 126:k.push(A.cr(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.lM(a,k)
break
case 38:A.lL(a,k)
break
case 63:p=a.u
k.push(A.k7(p,A.bg(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.k6(p,A.bg(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.lJ(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.k3(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.lP(a.u,a.e,o)
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
return A.bg(a.u,a.e,m)},
lK(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
k2(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.m0(s,o.x)[p]
if(n==null)A.cB('No "'+p+'" in "'+A.lu(o)+'"')
d.push(A.cs(s,o,n))}else d.push(p)
return m},
lM(a,b){var s,r=a.u,q=A.k1(a,b),p=b.pop()
if(typeof p=="string")b.push(A.cq(r,p,q))
else{s=A.bg(r,a.e,p)
switch(s.w){case 11:b.push(A.jl(r,s,q,a.n))
break
default:b.push(A.jk(r,s,q))
break}}},
lJ(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.k1(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bg(p,a.e,o)
q=new A.dj()
q.a=s
q.b=n
q.c=m
b.push(A.k5(p,r,q))
return
case-4:b.push(A.k8(p,b.pop(),s))
return
default:throw A.j(A.cG("Unexpected state under `()`: "+A.v(o)))}},
lL(a,b){var s=b.pop()
if(0===s){b.push(A.cr(a.u,1,"0&"))
return}if(1===s){b.push(A.cr(a.u,4,"1&"))
return}throw A.j(A.cG("Unexpected extended operation "+A.v(s)))},
k1(a,b){var s=b.splice(a.p)
A.k3(a.u,a.e,s)
a.p=b.pop()
return s},
bg(a,b,c){if(typeof c=="string")return A.cq(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.lN(a,b,c)}else return c},
k3(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bg(a,b,c[s])},
lP(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bg(a,b,c[s])},
lN(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.j(A.cG("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.j(A.cG("Bad index "+c+" for "+b.p(0)))},
kv(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.S(a,b,null,c,null)
r.set(c,s)}return s},
S(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bj(d))return!0
s=b.w
if(s===4)return!0
if(A.bj(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.S(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.v){if(q===7)return A.S(a,b,c,d.x,e)
return d===p||d===t.v||q===6}if(d===t.K){if(s===7)return A.S(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.S(a,b.x,c,d,e))return!1
return A.S(a,A.jf(a,b),c,d,e)}if(s===6)return A.S(a,p,c,d,e)&&A.S(a,b.x,c,d,e)
if(q===7){if(A.S(a,b,c,d.x,e))return!0
return A.S(a,b,c,A.jf(a,d),e)}if(q===6)return A.S(a,b,c,p,e)||A.S(a,b,c,d.x,e)
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
if(!A.S(a,j,c,i,e)||!A.S(a,i,e,j,c))return!1}return A.kf(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.kf(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.mm(a,b,c,d,e)}if(o&&q===10)return A.mr(a,b,c,d,e)
return!1},
kf(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.S(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.S(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.S(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.S(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.S(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
mm(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.cs(a,b,r[o])
return A.kc(a,p,null,c,d.y,e)}return A.kc(a,b.y,null,c,d.y,e)},
kc(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.S(a,b[s],d,e[s],f))return!1
return!0},
mr(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.S(a,r[s],c,q[s],e))return!1
return!0},
bH(a){var s=a.w,r=!0
if(!(a===t.P||a===t.v))if(!A.bj(a))if(s!==6)r=s===7&&A.bH(a.x)
return r},
bj(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
kb(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
iH(a){return a>0?new Array(a):v.typeUniverse.sEA},
at:function at(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dj:function dj(){this.c=this.b=this.a=null},
iF:function iF(a){this.a=a},
di:function di(){},
bA:function bA(a){this.a=a},
lC(){var s,r,q
if(self.scheduleImmediate!=null)return A.mO()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.ds(new A.ig(s),1)).observe(r,{childList:true})
return new A.ie(s,r,q)}else if(self.setImmediate!=null)return A.mP()
return A.mQ()},
lD(a){self.scheduleImmediate(A.ds(new A.ih(t.M.a(a)),0))},
lE(a){self.setImmediate(A.ds(new A.ii(t.M.a(a)),0))},
lF(a){A.jh(B.H,t.M.a(a))},
jh(a,b){return A.lR(0,b)},
lR(a,b){var s=new A.iD()
s.cn(a,b)
return s},
mx(a){return new A.df(new A.V($.M,a.h("V<0>")),a.h("df<0>"))},
m7(a,b){a.$2(0,null)
b.b=!0
return b.a},
m4(a,b){A.m8(a,b)},
m6(a,b){var s,r,q=b.$ti
q.h("1/?").a(a)
s=a==null?q.c.a(a):a
if(!b.b)b.a.ct(s)
else{r=b.a
if(q.h("aQ<1>").b(s))r.bv(s)
else r.bx(s)}},
m5(a,b){var s=A.aP(a),r=A.bG(a),q=b.b,p=b.a
if(q)p.b_(new A.aq(s,r))
else p.bu(new A.aq(s,r))},
m8(a,b){var s,r,q=new A.iJ(b),p=new A.iK(b)
if(a instanceof A.V)a.bL(q,p,t.z)
else{s=t.z
if(a instanceof A.V)a.c9(q,p,s)
else{r=new A.V($.M,t.c)
r.a=8
r.c=a
r.bL(q,p,s)}}},
mM(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.M.c7(new A.iN(s),t.x,t.S,t.z)},
k4(a,b,c){return 0},
j7(a){var s
if(t.V.b(a)){s=a.gaI()
if(s!=null)return s}return B.a0},
ld(a,b){var s
if(!b.b(null))throw A.j(A.em(null,"computation","The type parameter is not nullable"))
s=new A.V($.M,b.h("V<0>"))
A.ly(a,new A.fX(null,s,b))
return s},
io(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.lv()
b.bu(new A.aq(new A.aA(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bE(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aw()
b.aK(o.a)
A.bd(b,p)
return}b.a^=2
A.dr(null,null,b.b,t.M.a(new A.ip(o,b)))},
bd(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.u,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.jq(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.bd(d.a,c)
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
A.jq(j.a,j.b)
return}g=$.M
if(g!==h)$.M=h
else g=null
c=c.c
if((c&15)===8)new A.it(q,d,n).$0()
else if(o){if((c&1)!==0)new A.is(q,j).$0()}else if((c&2)!==0)new A.ir(d,q).$0()
if(g!=null)$.M=g
c=q.c
if(c instanceof A.V){p=q.a.$ti
p=p.h("aQ<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aM(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.io(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.aM(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
mB(a,b){var s
if(t.C.b(a))return b.c7(a,t.z,t.K,t.l)
s=t.D
if(s.b(a))return s.a(a)
throw A.j(A.em(a,"onError",u.c))},
my(){var s,r
for(s=$.bD;s!=null;s=$.bD){$.cx=null
r=s.b
$.bD=r
if(r==null)$.cw=null
s.a.$0()}},
mH(){$.jp=!0
try{A.my()}finally{$.cx=null
$.jp=!1
if($.bD!=null)$.jC().$1(A.ko())}},
kl(a){var s=new A.dg(a),r=$.cw
if(r==null){$.bD=$.cw=s
if(!$.jp)$.jC().$1(A.ko())}else $.cw=r.b=s},
mE(a){var s,r,q,p=$.bD
if(p==null){A.kl(a)
$.cx=$.cw
return}s=new A.dg(a)
r=$.cx
if(r==null){s.b=p
$.bD=$.cx=s}else{q=r.b
s.b=q
$.cx=r.b=s
if(q==null)$.cw=s}},
nl(a,b){A.W(a,"stream",t.K)
return new A.dp(b.h("dp<0>"))},
ly(a,b){var s=$.M
if(s===B.j)return A.jh(a,t.M.a(b))
return A.jh(a,t.M.a(s.bR(b)))},
jq(a,b){A.mE(new A.iM(a,b))},
kj(a,b,c,d,e){var s,r=$.M
if(r===c)return d.$0()
$.M=c
s=r
try{r=d.$0()
return r}finally{$.M=s}},
mD(a,b,c,d,e,f,g){var s,r=$.M
if(r===c)return d.$1(e)
$.M=c
s=r
try{r=d.$1(e)
return r}finally{$.M=s}},
mC(a,b,c,d,e,f,g,h,i){var s,r=$.M
if(r===c)return d.$2(e,f)
$.M=c
s=r
try{r=d.$2(e,f)
return r}finally{$.M=s}},
dr(a,b,c,d){t.M.a(d)
if(B.j!==c){d=c.bR(d)
d=d}A.kl(d)},
ig:function ig(a){this.a=a},
ie:function ie(a,b,c){this.a=a
this.b=b
this.c=c},
ih:function ih(a){this.a=a},
ii:function ii(a){this.a=a},
iD:function iD(){},
iE:function iE(a,b){this.a=a
this.b=b},
df:function df(a,b){this.a=a
this.b=!1
this.$ti=b},
iJ:function iJ(a){this.a=a},
iK:function iK(a){this.a=a},
iN:function iN(a){this.a=a},
aN:function aN(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aw:function aw(a,b){this.a=a
this.$ti=b},
aq:function aq(a,b){this.a=a
this.b=b},
fX:function fX(a,b,c){this.a=a
this.b=b
this.c=c},
bc:function bc(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
V:function V(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
ik:function ik(a,b){this.a=a
this.b=b},
iq:function iq(a,b){this.a=a
this.b=b},
ip:function ip(a,b){this.a=a
this.b=b},
im:function im(a,b){this.a=a
this.b=b},
il:function il(a,b){this.a=a
this.b=b},
it:function it(a,b,c){this.a=a
this.b=b
this.c=c},
iu:function iu(a,b){this.a=a
this.b=b},
iv:function iv(a){this.a=a},
is:function is(a,b){this.a=a
this.b=b},
ir:function ir(a,b){this.a=a
this.b=b},
dg:function dg(a){this.a=a
this.b=null},
dp:function dp(a){this.$ti=a},
cu:function cu(){},
dn:function dn(){},
iC:function iC(a,b){this.a=a
this.b=b},
iM:function iM(a,b){this.a=a
this.b=b},
jc(a,b){return new A.aI(a.h("@<0>").E(b).h("aI<1,2>"))},
Q(a,b,c){return b.h("@<0>").E(c).h("jQ<1,2>").a(A.mV(a,new A.aI(b.h("@<0>").E(c).h("aI<1,2>"))))},
Y(a,b){return new A.aI(a.h("@<0>").E(b).h("aI<1,2>"))},
ll(a){return new A.au(a.h("au<0>"))},
c0(a){return new A.au(a.h("au<0>"))},
lm(a,b){return b.h("jS<0>").a(A.mW(a,new A.au(b.h("au<0>"))))},
jj(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
iA(a,b,c){var s=new A.bf(a,b,c.h("bf<0>"))
s.c=a.e
return s},
bp(a,b){var s=J.H(a)
if(s.j())return s.gn()
return null},
as(a,b,c){var s=A.jc(b,c)
a.a7(0,new A.h3(s,b,c))
return s},
jR(a,b,c){var s=A.jc(b,c)
s.G(0,a)
return s},
h5(a){var s,r
if(A.jy(a))return"{...}"
s=new A.bv("")
try{r={}
B.a.l($.ak,a)
s.a+="{"
r.a=!0
a.a7(0,new A.h6(r,s))
s.a+="}"}finally{if(0>=$.ak.length)return A.n($.ak,-1)
$.ak.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
au:function au(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dm:function dm(a){this.a=a
this.c=this.b=null},
bf:function bf(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
h3:function h3(a,b,c){this.a=a
this.b=b
this.c=c},
B:function B(){},
D:function D(){},
h4:function h4(a){this.a=a},
h6:function h6(a,b){this.a=a
this.b=b},
ct:function ct(){},
br:function br(){},
cf:function cf(){},
bu:function bu(){},
cn:function cn(){},
bB:function bB(){},
mz(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aP(r)
q=A.jN(String(s))
throw A.j(q)}q=A.iL(p)
return q},
iL(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.dk(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.iL(a[s])
return a},
jP(a,b,c){return new A.bY(a,b)},
ma(a){return a.I()},
lG(a,b){return new A.ix(a,[],A.mS())},
lH(a,b,c){var s,r=new A.bv(""),q=A.lG(r,b)
q.aU(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
dk:function dk(a,b){this.a=a
this.b=b
this.c=null},
dl:function dl(a){this.a=a},
cJ:function cJ(){},
cL:function cL(){},
bY:function bY(a,b){this.a=a
this.b=b},
cW:function cW(a,b){this.a=a
this.b=b},
h_:function h_(){},
h1:function h1(a){this.b=a},
h0:function h0(a){this.a=a},
iy:function iy(){},
iz:function iz(a,b){this.a=a
this.b=b},
ix:function ix(a,b,c){this.c=a
this.a=b
this.b=c},
ku(a){var s=A.ls(a,null)
if(s!=null)return s
throw A.j(A.jN(a))},
l9(a,b){a=A.T(a,new Error())
if(a==null)a=A.cv(a)
a.stack=b.p(0)
throw a},
c1(a,b,c,d){var s,r=c?J.jO(a,d):J.li(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
c2(a,b,c){var s,r=A.c([],c.h("t<0>"))
for(s=J.H(a);s.j();)B.a.l(r,c.a(s.gn()))
if(b)return r
r.$flags=1
return r},
o(a,b){var s,r
if(Array.isArray(a))return A.c(a.slice(0),b.h("t<0>"))
s=A.c([],b.h("t<0>"))
for(r=J.H(a);r.j();)B.a.l(s,r.gn())
return s},
aT(a,b){var s=A.c2(a,!1,b)
s.$flags=3
return s},
jX(a,b,c){var s=J.H(b)
if(!s.j())return a
if(c.length===0){do a+=A.v(s.gn())
while(s.j())}else{a+=A.v(s.gn())
while(s.j())a=a+c+A.v(s.gn())}return a},
lv(){return A.bG(new Error())},
l8(a,b,c){var s,r
for(s=0;s<4;++s){r=a[s]
if(r.b===b)return r}throw A.j(A.em(b,"name","No enum value with that name"))},
cO(a){if(typeof a=="number"||A.jo(a)||a==null)return J.bm(a)
if(typeof a=="string")return JSON.stringify(a)
return A.jU(a)},
la(a,b){A.W(a,"error",t.K)
A.W(b,"stackTrace",t.l)
A.l9(a,b)},
cG(a){return new A.cF(a)},
cE(a,b){return new A.aA(!1,null,b,a)},
em(a,b,c){return new A.aA(!0,a,b,c)},
b8(a,b,c,d,e){return new A.ca(b,c,!0,a,d,"Invalid value")},
lt(a,b,c){if(0>a||a>c)throw A.j(A.b8(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.j(A.b8(b,a,c,"end",null))
return b}return c},
cb(a,b){if(a<0)throw A.j(A.b8(a,0,null,b,null))
return a},
j8(a,b,c,d){return new A.cP(b,!0,a,d,"Index out of range")},
bb(a){return new A.cg(a)},
jZ(a){return new A.dd(a)},
jW(a){return new A.ce(a)},
X(a){return new A.cK(a)},
jN(a){return new A.aF(a)},
lh(a,b,c){var s,r
if(A.jy(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.c([],t.s)
B.a.l($.ak,a)
try{A.mv(a,s)}finally{if(0>=$.ak.length)return A.n($.ak,-1)
$.ak.pop()}r=A.jX(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
j9(a,b,c){var s,r
if(A.jy(a))return b+"..."+c
s=new A.bv(b)
B.a.l($.ak,a)
try{r=s
r.a=A.jX(r.a,a,", ")}finally{if(0>=$.ak.length)return A.n($.ak,-1)
$.ak.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
mv(a,b){var s,r,q,p,o,n,m,l=a.gB(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.j())return
s=A.v(l.gn())
B.a.l(b,s)
k+=s.length+2;++j}if(!l.j()){if(j<=5)return
if(0>=b.length)return A.n(b,-1)
r=b.pop()
if(0>=b.length)return A.n(b,-1)
q=b.pop()}else{p=l.gn();++j
if(!l.j()){if(j<=4){B.a.l(b,A.v(p))
return}r=A.v(p)
if(0>=b.length)return A.n(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gn();++j
for(;l.j();p=o,o=n){n=l.gn();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.n(b,-1)
k-=b.pop().length+2;--j}B.a.l(b,"...")
return}}q=A.v(p)
r=A.v(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.n(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.l(b,m)
B.a.l(b,q)
B.a.l(b,r)},
je(a,b,c,d){var s
if(B.o===c){s=J.af(a)
b=J.af(b)
return A.i3(A.aJ(A.aJ($.dt(),s),b))}if(B.o===d){s=J.af(a)
b=J.af(b)
c=J.af(c)
return A.i3(A.aJ(A.aJ(A.aJ($.dt(),s),b),c))}s=J.af(a)
b=J.af(b)
c=J.af(c)
d=J.af(d)
d=A.i3(A.aJ(A.aJ(A.aJ(A.aJ($.dt(),s),b),c),d))
return d},
lo(a){var s,r,q=$.dt()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.u)(a),++r)q=A.aJ(q,J.af(a[r]))
return A.i3(q)},
cM:function cM(){},
dh:function dh(){},
C:function C(){},
cF:function cF(a){this.a=a},
aK:function aK(){},
aA:function aA(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ca:function ca(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
cP:function cP(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
cg:function cg(a){this.a=a},
dd:function dd(a){this.a=a},
ce:function ce(a){this.a=a},
cK:function cK(a){this.a=a},
d5:function d5(){},
cd:function cd(){},
ij:function ij(a){this.a=a},
aF:function aF(a){this.a=a},
b:function b(){},
a8:function a8(a,b,c){this.a=a
this.b=b
this.$ti=c},
a9:function a9(){},
x:function x(){},
dq:function dq(){},
i2:function i2(){this.b=this.a=0},
bv:function bv(a){this.a=a},
jG(a,b,c,d){var s,r,q,p,o,n=t.N,m=t.S,l=A.c([],t.aD),k=a.gar(),j=a.gar(),i=a.gar(),h=A.jR(a.gar().w,m,m),g=A.Y(m,m)
for(s=a.gN(),r=J.H(s.a),s=new A.U(r,s.b,s.$ti.h("U<1>"));s.j();){q=r.gn()
g.u(0,q.a,q.d)}s=A.Y(n,t.J)
for(r=d.length,p=0;p<d.length;d.length===r||(0,A.u)(d),++p){o=d[p]
s.u(0,o.a,o)}return new A.aE(a,b,c,k.b,j.c,i.d,h,g,s,A.c0(n),A.c0(n),A.c0(n),A.c0(m),A.c0(m),l)},
aV:function aV(a,b,c){this.a=a
this.b=b
this.c=c},
en:function en(a){this.a=a},
aE:function aE(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
dx:function dx(){},
dy:function dy(){},
dV:function dV(a){this.a=a},
dN:function dN(a,b){this.a=a
this.b=b},
dO:function dO(){},
dP:function dP(a){this.a=a},
dQ:function dQ(a){this.a=a},
dR:function dR(a){this.a=a},
dS:function dS(a){this.a=a},
dB:function dB(a){this.a=a},
dC:function dC(a,b){this.a=a
this.b=b},
dD:function dD(a){this.a=a},
dE:function dE(){},
dF:function dF(a){this.a=a},
dG:function dG(){},
dH:function dH(a){this.a=a},
dI:function dI(a){this.a=a},
dJ:function dJ(a){this.a=a},
dM:function dM(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dK:function dK(a){this.a=a},
dL:function dL(a){this.a=a},
dW:function dW(a){this.a=a},
dT:function dT(){},
dU:function dU(){},
dz:function dz(){},
dA:function dA(){},
dX:function dX(a){this.a=a},
dY:function dY(){},
dZ:function dZ(a){this.a=a},
e_:function e_(a){this.a=a},
am(a,b,c,d){var s,r=b.f,q=A.h(r)
q=new A.d(r,q.h("e(1)").a(new A.eq(a)),q.h("d<1>")).gm(0)
r=b.gN()
if(!b.gN().gB(0).j())s=0
else{s=c.b.i(0,"countryIncome")
s.toString
s=B.b.k(s)}return new A.ep(a,q,r.D(0,s,new A.er(d,c),t.S),b,c)},
ep:function ep(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eq:function eq(a){this.a=a},
er:function er(a,b){this.a=a
this.b=b},
ad(a){var s=a.e
if(s===2)s=1000
else s=s===1?30:0
return a.w*3+a.r*0.35+a.f*0.15+a.x*1.5-a.y*2+s},
ab(a,b){var s=b?a.x*0.75:0,r=a.e
if(r===1)r=30
else r=r===2?-200:0
return a.w*3+a.r*0.35+a.f*0.15-a.y*2-s+r},
kt(a,b){var s=a.gaP(),r=a.gP(),q=b.b.i(0,"soldierPower")
q.toString
return s*(a.w+r*B.b.k(q))+B.a.D(a.ax,0,new A.iT(b,a),t.H)},
iU(a,b,c,d){var s,r=b.b,q=r.i(0,"soldierHp")
q.toString
q=B.b.k(q)
s=b.bb(a.w,c,!1)
r=r.i(0,"soldierPower")
r.toString
return(a.f+d*q)*(s+d*B.b.k(r))*(1+a.ay/1000)},
b2:function b2(a,b){this.a=a
this.b=b},
bI:function bI(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
es:function es(a,b,c){this.a=a
this.b=b
this.c=c},
et:function et(){},
eu:function eu(){},
iT:function iT(a,b){this.a=a
this.b=b},
cD:function cD(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4){var _=this
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
_.to=c2
_.x1=c3
_.x2=c4},
av:function av(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ew:function ew(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.r=_.f=_.e=$
_.w=null
_.x=e},
eM:function eM(a){this.a=a},
eN:function eN(){},
eO:function eO(){},
eZ:function eZ(){},
f2:function f2(){},
f3:function f3(a){this.a=a},
f4:function f4(a){this.a=a},
f5:function f5(a){this.a=a},
f6:function f6(a,b){this.a=a
this.b=b},
f7:function f7(a,b){this.a=a
this.b=b},
f8:function f8(a){this.a=a},
eP:function eP(a,b){this.a=a
this.b=b},
eQ:function eQ(a){this.a=a},
eR:function eR(){},
eS:function eS(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eT:function eT(a,b,c){this.a=a
this.b=b
this.c=c},
eU:function eU(a){this.a=a},
eV:function eV(){},
eW:function eW(a){this.a=a},
eX:function eX(a){this.a=a},
eY:function eY(){},
f_:function f_(a){this.a=a},
f0:function f0(){},
f1:function f1(a){this.a=a},
eF:function eF(a){this.a=a},
eG:function eG(a,b){this.a=a
this.b=b},
eH:function eH(a){this.a=a},
eI:function eI(a,b){this.a=a
this.b=b},
eJ:function eJ(a){this.a=a},
eK:function eK(a){this.a=a},
eL:function eL(){},
eD:function eD(a){this.a=a},
eE:function eE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eC:function eC(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ey:function ey(a,b,c){this.a=a
this.b=b
this.c=c},
ez:function ez(a){this.a=a},
eA:function eA(a){this.a=a},
eB:function eB(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ex:function ex(a){this.a=a},
a5:function a5(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
f9:function f9(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fU:function fU(a,b){this.a=a
this.b=b},
fV:function fV(a){this.a=a},
fT:function fT(a){this.a=a},
fW:function fW(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fR:function fR(){},
fQ:function fQ(){},
fS:function fS(){},
fP:function fP(){},
fa:function fa(){},
fb:function fb(){},
fc:function fc(){},
fn:function fn(){},
fy:function fy(a){this.a=a},
fA:function fA(){},
fB:function fB(){},
fC:function fC(a){this.a=a},
fD:function fD(){},
fE:function fE(a){this.a=a},
fF:function fF(a){this.a=a},
fd:function fd(){},
fe:function fe(a){this.a=a},
fG:function fG(a,b){this.a=a
this.b=b},
ff:function ff(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fg:function fg(a,b){this.a=a
this.b=b},
fh:function fh(){},
fi:function fi(a){this.a=a},
fj:function fj(a){this.a=a},
fk:function fk(a,b,c){this.a=a
this.b=b
this.c=c},
fl:function fl(a){this.a=a},
fm:function fm(a,b,c){this.a=a
this.b=b
this.c=c},
fo:function fo(a){this.a=a},
fp:function fp(){},
fq:function fq(){},
fr:function fr(){},
fs:function fs(a,b){this.a=a
this.b=b},
ft:function ft(){},
fu:function fu(a){this.a=a},
fv:function fv(a){this.a=a},
fw:function fw(a){this.a=a},
fx:function fx(){},
fz:function fz(a){this.a=a},
fM:function fM(a){this.a=a},
fN:function fN(a){this.a=a},
fO:function fO(){},
fH:function fH(){},
fI:function fI(a){this.a=a},
fJ:function fJ(){},
fK:function fK(a){this.a=a},
fL:function fL(a){this.a=a},
ea(a){var s,r=a.length
if(0>=r)return A.n(a,0)
s=A.w(a[0])
if(1>=r)return A.n(a,1)
return new A.J(s,A.w(a[1]))},
J:function J(a,b){this.a=a
this.b=b},
e9:function e9(a){this.a=a},
jF(c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9=A.G(c3.i(0,"id")),b0=A.f(c3.i(0,"c")),b1=A.f(c3.i(0,"home")),b2=A.f(c3.i(0,"o")),b3=A.f(c3.i(0,"t")),b4=A.w(c3.i(0,"hp")),b5=A.f(c3.i(0,"max")),b6=A.f(c3.i(0,"a")),b7=A.f(c3.i(0,"p")),b8=A.f(c3.i(0,"pay")),b9=t.j,c0=A.ea(b9.a(c3.i(0,"xy"))),c1=A.ea(b9.a(c3.i(0,"v"))),c2=A.f(c3.i(0,"s"))
if(!(c2>=0&&c2<8))return A.n(B.L,c2)
c2=B.L[c2]
s=A.c([],t.n)
for(r=b9.a(c3.i(0,"troops")),q=r.length,p=0;p<r.length;r.length===q||(0,A.u)(r),++p)s.push(A.w(r[p]))
r=t.R
q=t.S
o=A.c2(r.a(c3.i(0,"w")),!0,q)
n=A.w(c3.i(0,"m"))
m=A.w(c3.i(0,"due"))
l=c3.i(0,"to")==null?null:A.ea(b9.a(c3.i(0,"to")))
k=A.a3(c3.i(0,"target"))
j=A.w(c3.i(0,"return"))
i=A.ax(c3.i(0,"dispatch"))
h=A.ax(c3.i(0,"move"))
g=A.ax(c3.i(0,"dismiss"))
f=A.ax(c3.i(0,"upgrade"))
e=A.ax(c3.i(0,"retreat"))
d=A.ax(c3.i(0,"marked"))
c=A.G(c3.i(0,"rev"))
b=A.f(c3.i(0,"orderRev"))
a=A.bC(c3.i(0,"opponent"))
a0=A.f(c3.i(0,"clashes"))
a1=A.w(c3.i(0,"received"))
a2=A.w(c3.i(0,"dealt"))
a3=A.ax(c3.i(0,"opening"))
a4=A.ax(c3.i(0,"weaponReady"))
a5=A.c([],t._)
for(r=J.H(r.a(c3.i(0,"returnPath")));r.j();){a6=b9.a(r.gn())
a7=a6.length
if(0>=a7)return A.n(a6,0)
a8=A.w(a6[0])
if(1>=a7)return A.n(a6,1)
a5.push(new A.J(a8,A.w(a6[1])))}b9=A.a3(c3.i(0,"regionCity"))
r=A.a3(c3.i(0,"salaryPaidMonth"))
if(r==null)r=-1
return new A.q(a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,c0,c1,c2,A.aT(s,t.i),A.aT(o,q),n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,b9,r)},
kV(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=A.f(a2.i(0,"id")),d=A.f(a2.i(0,"c")),c=A.f(a2.i(0,"native")),b=A.f(a2.i(0,"level")),a=t.j,a0=A.ea(a.a(a2.i(0,"xy"))),a1=A.c([],t._)
for(s=a.a(a2.i(0,"outline")),r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q){p=a.a(s[q])
o=p.length
if(0>=o)return A.n(p,0)
n=A.w(p[0])
if(1>=o)return A.n(p,1)
a1.push(new A.J(n,A.w(p[1])))}a=A.f(a2.i(0,"income"))
s=A.f(a2.i(0,"poor"))
r=A.f(a2.i(0,"cap"))
p=A.f(a2.i(0,"recruitCap"))
o=A.ax(a2.i(0,"recruit"))
n=A.G(a2.i(0,"rev"))
m=A.f(a2.i(0,"baseIncome"))
l=A.a3(a2.i(0,"initial"))
k=A.f(a2.i(0,"wins"))
j=A.bC(a2.i(0,"attacker"))
i=A.bC(a2.i(0,"defender"))
h=A.G(a2.i(0,"stage"))
g=A.w(a2.i(0,"next"))
f=A.jm(a2.i(0,"fallen"))
return new A.P(e,d,c,b,a0,new A.e9(a1),a,s,r,p,m,o,n,l,k,j,i,h,g,f===!0,A.w(a2.i(0,"danger")))},
kW(a){var s,r,q,p,o,n=A.f(a.i(0,"id")),m=A.f(a.i(0,"gold")),l=A.f(a.i(0,"reserves")),k=A.f(a.i(0,"capacity")),j=A.f(a.i(0,"salary")),i=A.f(a.i(0,"poor")),h=A.R(a.i(0,"garrisonAccrued"))
if(h==null)h=0
s=t.S
r=A.Y(s,s)
for(q=t.f,p=q.a(a.i(0,"stock")).gai(),p=p.gB(p);p.j();){o=p.gn()
r.u(0,A.ku(A.G(o.a)),A.f(o.b))}p=A.Y(s,s)
for(q=q.a(a.i(0,"hate")).gai(),q=q.gB(q);q.j();){o=q.gn()
p.u(0,A.ku(A.G(o.a)),A.f(o.b))}return new A.b0(n,m,l,k,j,i,h,A.ev(r,s,s),A.ev(p,s,s))},
kX(a){var s,r,q,p,o,n,m=A.f(a.i(0,"country")),l=A.f(a.i(0,"tick")),k=A.w(a.i(0,"month")),j=A.c([],t.Y)
for(s=t.R,r=J.H(s.a(a.i(0,"cities"))),q=t.f,p=t.N,o=t.z;r.j();)j.push(A.kV(A.as(q.a(r.gn()),p,o)))
r=A.c([],t.e)
for(n=J.H(s.a(a.i(0,"heroes")));n.j();)r.push(A.jF(A.as(q.a(n.gn()),p,o)))
n=A.c([],t.eu)
for(s=J.H(s.a(a.i(0,"countries")));s.j();)n.push(A.kW(A.as(q.a(s.gn()),p,o)))
s=A.f(a.i(0,"pool"))
q=A.f(a.i(0,"salary"))
p=A.a3(a.i(0,"year"))
if(p==null)p=1
o=A.a3(a.i(0,"monthIndex"))
if(o==null)o=0
return new A.e1(m,l,p,o,k,A.aT(j,t.q),A.aT(r,t.r),A.aT(n,t.t),s,q)},
al:function al(a,b){this.a=a
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
dw:function dw(){},
dv:function dv(){},
P:function P(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1){var _=this
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
b0:function b0(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
e1:function e1(a,b,c,d,e,f,g,h,i,j){var _=this
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
e7:function e7(a){this.a=a},
e8:function e8(a){this.a=a},
e4:function e4(a,b){this.a=a
this.b=b},
e3:function e3(a){this.a=a},
e5:function e5(){},
e6:function e6(a){this.a=a},
e2:function e2(a){this.a=a},
js(a,b,c){var s,r,q=null,p=a.as
if(p===B.f||p===B.e||p===B.t)return q
s=c.y.i(0,a.a)
p=s==null
if((p?q:s.b)==="expedition")p=p?q:s.d
else p=a.cx
r=b.K(p)
return r!=null&&r.b!==a.b?r:q},
mN(a,b,c,d){var s,r,q=A.js(a,b,c)
if(q==null)return!1
s=a.as
r=!0
if(s!==B.w)if(s!==B.D){s=a.z
s=q.f.a4(s).J(s)<=d.r.p2}else s=r
else s=r
return s},
c9(a,b,c,d,e){var s=B.a.H(a.f,new A.h9(e,a))?e:null
s=new A.h8(a,b,c,s,d,A.Y(t.S,t.bd))
s.cm(a,b,c,d,e)
return s},
h8:function h8(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
h9:function h9(a,b){this.a=a
this.b=b},
ha:function ha(){},
he:function he(a){this.a=a},
hg:function hg(a){this.a=a},
hh:function hh(a){this.a=a},
hf:function hf(a,b){this.a=a
this.b=b},
hc:function hc(){},
hd:function hd(a,b){this.a=a
this.b=b},
hi:function hi(a){this.a=a},
hb:function hb(a){this.a=a},
d7:function d7(a,b){this.a=a
this.b=b},
hj:function hj(a,b,c){this.a=a
this.b=b
this.c=c},
hk:function hk(a,b){this.a=a
this.b=b},
hn:function hn(a,b,c){this.a=a
this.b=b
this.c=c},
ho:function ho(){},
hp:function hp(a){this.a=a},
hq:function hq(){},
hr:function hr(a){this.a=a},
hs:function hs(a){this.a=a},
ht:function ht(a){this.a=a},
hv:function hv(a){this.a=a},
hw:function hw(a){this.a=a},
hx:function hx(a){this.a=a},
hu:function hu(a,b){this.a=a
this.b=b},
hy:function hy(){},
hz:function hz(){},
hl:function hl(){},
hm:function hm(a){this.a=a},
l0(a){var s,r,q,p,o,n,m,l=A.G(a.i(0,"hero")),k=A.G(a.i(0,"role")),j=A.f(a.i(0,"deadline")),i=A.f(a.i(0,"commit")),h=A.a3(a.i(0,"city")),g=A.bC(a.i(0,"enemy")),f=A.c([],t._)
for(s=J.H(t.R.a(a.i(0,"points"))),r=t.j;s.j();){q=r.a(s.gn())
p=q.length
if(0>=p)return A.n(q,0)
o=A.w(q[0])
if(1>=p)return A.n(q,1)
f.push(new A.J(o,A.w(q[1])))}s=A.f(a.i(0,"leg"))
r=A.f(a.i(0,"gold"))
q=A.ax(a.i(0,"slot"))
p=A.G(a.i(0,"reason"))
o=A.f(a.i(0,"order"))
n=A.a3(a.i(0,"targetCountry"))
m=A.jm(a.i(0,"attrition"))
return new A.ac(l,k,p,h,n,m===!0,g,f,s,j,i,r,q,o)},
kY(a){var s,r,q,p,o,n,m,l,k,j,i
if(!J.ao(a.i(0,"protocol"),1))throw A.j(B.a3)
s=A.G(a.i(0,"session"))
r=A.f(a.i(0,"id"))
q=A.G(a.i(0,"rules"))
p=A.G(a.i(0,"map"))
o=t.f
n=t.N
m=t.z
l=A.kX(A.as(o.a(a.i(0,"observation")),n,m))
k=A.f(a.i(0,"deadline"))
j=A.c([],t.m)
for(i=J.H(t.R.a(a.i(0,"tasks")));i.j();)j.push(A.l0(A.as(o.a(i.gn()),n,m)))
o=A.f(a.i(0,"seed"))
n=A.f(a.i(0,"priority"))
m=A.f(a.i(0,"idle"))
i=A.bC(a.i(0,"stage"))
if(i==null)i="full"
return new A.ec(s,q,p,r,k,o,n,m,A.l8(B.ae,i,t.a9),A.a3(a.i(0,"offensiveCountry")),A.a3(a.i(0,"offensiveCity")),l,j)},
jH(a,b,c,d){var s=a.Q
return new A.eb(a.a,a.b,a.c,a.d,s.a,s.b,a.e,d,b,c)},
aD:function aD(a,b){this.a=a
this.b=b},
ap:function ap(a,b){this.a=a
this.b=b},
z:function z(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
ac:function ac(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var _=this
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
N:function N(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bM:function bM(a,b,c,d,e,f,g,h,i,j){var _=this
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
ec:function ec(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
eb:function eb(a,b,c,d,e,f,g,h,i,j){var _=this
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
cy(a8,a9,b0,b1,b2,b3,b4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="soldierLimit",a1="soldierPower",a2="soldierHp",a3={},a4=b0.v(a9.a),a5=A.h(a4).h("L<1>"),a6=A.Z(new A.L(a4,a5),0,A.W(a9.ga5(),"count",t.S),a5.h("k.E")).ab(0),a7=A.am(a9.b,b0,b1,null)
a3.a=a3.b=1
a3.c=null
a5=b1.cS(a8.w,!1)
a4=b1.b
s=a4.i(0,a0)
s.toString
s=B.b.k(s)
r=a4.i(0,a1)
r.toString
q=a5+s*B.b.k(r)
p=B.a.ap(b0.w,new A.iO(a9)).c
for(a5=a9.cy,s=a9.at,r=a9.ax,o=s==null,n=a9.d,m=t.a,l=0,k=0;k<a6.length;++k){j=a6[k]
i=a4.i(0,a0)
i.toString
h=Math.min(B.b.k(i),p+j.gP())
p=Math.max(0,p-(h-j.gP()))
if(o)i=n
else{i=a5?1:0
i=B.c.A(s-r-i,0,5)}i=Math.max(1,i-k)
g=a4.i(0,a0)
g.toString
g=B.b.k(g)
f=b2.cY(a8,j,i,!1,h,k<b3.length?A.c([b3[k]],m):B.d,!0,g)
a3.b=Math.min(a3.b,f.b)
if(k===0)a3.c=f
a3.a=Math.min(a3.a,f.c)
if(o)i=n
else{i=a5?1:0
i=B.c.A(s-r-i,0,5)}i=b1.bb(j.w,Math.max(1,i-k),!1)
g=a4.i(0,a1)
g.toString
e=(i+h*B.b.k(g))/Math.max(1,q)
g=a4.i(0,a2)
g.toString
l+=(j.f+h*B.b.k(g))*e*e}for(a5=b1.f,s=b1.r,r=s.rx,d=0,k=0;o=b3.length,k<Math.min(o,a6.length);++k){if(!(k<o))return A.n(b3,k)
c=a5.i(0,b3[k])
if(c!=null){o=Math.max(0,c.c-c.d)
d+=o*(k===0?1:r)}}a5=a8.f
r=a4.i(0,a0)
r.toString
r=B.b.k(r)
a4=a4.i(0,a2)
a4.toString
b=Math.max(1,B.b.ah(l/Math.max(1,(a5+r*B.b.k(a4)+d)*0.85)))
a4=new A.iP(a3,a6,b3,a8,b1,a7)
if(a6.length!==0&&J.j5(b3)&&a3.b<s.k4)return new A.aM([!1,a3.b,0,a3.a])
r=s.fy
if(b>r)return a4.$0()
o=a6.length
m=o===0
if(!m)a5=o===1&&n<=2&&a5>=a8.r*0.8&&a3.b>s.ry||a3.b>s.RG+Math.max(0,o-1)*0.025-b4
else a5=!0
if(a5){a4=a3.b
a5=a3.a
return new A.aM([!1,a4,a7.bl(a4>=s.k4||m?b:Math.max(2,b),o),a5])}a=o>1&&a3.a>s.RG&&a3.b>-0.08?Math.min(r,o):0
if(a===0)return a4.$0()
a4=a3.b
a5=a3.a
return new A.aM([!1,a4,a7.bl(a,o),a5])},
iO:function iO(a){this.a=a},
iP:function iP(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hD:function hD(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hG:function hG(a){this.a=a},
hH:function hH(){},
hI:function hI(a,b,c){this.a=a
this.b=b
this.c=c},
hT:function hT(a,b,c){this.a=a
this.b=b
this.c=c},
hF:function hF(a,b){this.a=a
this.b=b},
hE:function hE(a,b,c){this.a=a
this.b=b
this.c=c},
hV:function hV(a){this.a=a},
hW:function hW(a,b){this.a=a
this.b=b},
hX:function hX(){},
hY:function hY(){},
hZ:function hZ(){},
i_:function i_(a){this.a=a},
i0:function i0(){},
hJ:function hJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hK:function hK(a,b,c){this.a=a
this.b=b
this.c=c},
hL:function hL(a){this.a=a},
hM:function hM(){},
hN:function hN(){},
hO:function hO(){},
hP:function hP(a,b,c){this.a=a
this.b=b
this.c=c},
hQ:function hQ(a,b,c){this.a=a
this.b=b
this.c=c},
hR:function hR(a,b){this.a=a
this.b=b},
hS:function hS(a,b,c){this.a=a
this.b=b
this.c=c},
hU:function hU(){},
bn:function bn(a,b,c){this.a=a
this.b=b
this.d=c},
ed:function ed(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ee:function ee(){},
ef:function ef(a,b,c){this.a=a
this.b=b
this.c=c},
eg:function eg(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eh:function eh(a,b,c){this.a=a
this.b=b
this.c=c},
ei:function ei(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
kZ(a,b,c,d,e,f,g){var s,r,q,p,o=A.ev(e,t.N,t.H),n=t.S,m=A.aT(d,n),l=t.i,k=A.aT(b,l)
l=A.aT(a,l)
s=t.z
s=A.Y(s,s)
for(r=g.length,q=0;q<g.length;g.length===r||(0,A.u)(g),++q){p=g[q]
s.u(0,p.a,p)}return new A.ej(f,o,m,k,l,A.ev(s,n,t.o),c)},
l_(c8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0=A.G(c8.i(0,"version")),c1=t.f,c2=t.N,c3=A.as(c1.a(c8.i(0,"values")),c2,t.H),c4=t.R,c5=A.c2(c4.a(c8.i(0,"upgrades")),!0,t.S),c6=t.n,c7=A.c([],c6)
for(s=J.H(c4.a(c8.i(0,"movement")));s.j();)c7.push(A.w(s.gn()))
c6=A.c([],c6)
for(s=J.H(c4.a(c8.i(0,"field")));s.j();)c6.push(A.w(s.gn()))
s=A.c([],t.W)
for(c4=J.H(c4.a(c8.i(0,"weapons"))),r=t.j;c4.j();){q=r.a(c4.gn())
p=q.length
if(0>=p)return A.n(q,0)
o=A.f(q[0])
if(1>=p)return A.n(q,1)
n=A.f(q[1])
if(2>=p)return A.n(q,2)
m=A.f(q[2])
if(3>=p)return A.n(q,3)
l=A.f(q[3])
if(4>=p)return A.n(q,4)
k=A.f(q[4])
if(5>=p)return A.n(q,5)
j=A.ax(q[5])
if(6>=p)return A.n(q,6)
s.push(new A.a_(o,n,m,l,k,j,A.w(q[6])))}c1=A.as(c1.a(c8.i(0,"tuning")),c2,t.z)
c2=A.w(c1.i(0,"interval"))
c4=A.R(c1.i(0,"resourceInterval"))
if(c4==null)c4=30
r=A.a3(c1.i(0,"cashBuffer"))
if(r==null)r=12
q=A.R(c1.i(0,"payrollRatio"))
if(q==null)q=0.5
p=A.a3(c1.i(0,"dangerousCountryCities"))
if(p==null)p=3
o=A.R(c1.i(0,"coalitionBudgetBase"))
if(o==null)o=0.5
n=A.R(c1.i(0,"coalitionBudgetStep"))
if(n==null)n=0.25
m=A.R(c1.i(0,"coalitionTargetBase"))
if(m==null)m=45
l=A.R(c1.i(0,"coalitionTargetStep"))
if(l==null)l=15
k=A.R(c1.i(0,"coalitionPayrollCeiling"))
if(k==null)k=0.8
j=A.R(c1.i(0,"coalitionTravel"))
if(j==null)j=45
i=A.R(c1.i(0,"targetTravelScale"))
if(i==null)i=25
h=A.R(c1.i(0,"hatredTargetBonus"))
if(h==null)h=90
g=A.R(c1.i(0,"breakthroughMargin"))
if(g==null)g=0.1
f=A.w(c1.i(0,"threat"))
e=A.w(c1.i(0,"urgent"))
d=A.w(c1.i(0,"margin"))
c=A.w(c1.i(0,"commit"))
b=A.a3(c1.i(0,"rearExtra"))
if(b==null)b=1
a=A.f(c1.i(0,"candidates"))
a0=A.f(c1.i(0,"assessments"))
a1=A.f(c1.i(0,"routes"))
a2=A.f(c1.i(0,"plans"))
a3=A.f(c1.i(0,"commands"))
a4=A.f(c1.i(0,"team"))
a5=A.a3(c1.i(0,"fronts"))
if(a5==null)a5=2
a6=A.a3(c1.i(0,"singleFrontMonths"))
if(a6==null)a6=12
a7=A.R(c1.i(0,"splitForce"))
if(a7==null)a7=2.25
a8=A.R(c1.i(0,"splitAdvantage"))
if(a8==null)a8=0.3
a9=A.R(c1.i(0,"arrivalSpread"))
if(a9==null)a9=20
b0=A.R(c1.i(0,"expeditionSeconds"))
if(b0==null)b0=900
b1=A.R(c1.i(0,"assaultCommitDistance"))
if(b1==null)b1=64
b2=A.R(c1.i(0,"recallCriticalMargin"))
if(b2==null)b2=0.25
b3=A.a3(c1.i(0,"attritionCombat"))
if(b3==null)b3=8
b4=A.R(c1.i(0,"attritionGain"))
if(b4==null)b4=0.06
b5=A.f(c1.i(0,"targets"))
b6=A.f(c1.i(0,"slice"))
b7=A.w(c1.i(0,"advantage"))
b8=A.w(c1.i(0,"expansion"))
b9=A.w(c1.i(0,"credit"))
return A.kZ(c6,c7,new A.cD(c2,f,e,d,c4,r,q,p,o,n,m,l,k,j,i,h,g,c,A.w(c1.i(0,"age")),b,a,a0,a1,a2,a3,a4,b5,b6,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b7,b9,b8,A.f(c1.i(0,"timeout")),A.f(c1.i(0,"restarts")),A.w(c1.i(0,"stagnation"))),c5,c3,c0,s)},
a_:function a_(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
ej:function ej(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
e0:function e0(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
el:function el(a,b,c){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=0
_.r=c},
bk(a,b,c,d,e,f){var s,r,q,p,o,n,m=a.a,l=c.v(m),k=A.h(l).h("L<1>"),j=A.Z(new A.L(l,k),0,A.W(a.ga5(),"count",t.S),k.h("k.E")).ab(0)
if(j.length===0)s=0
else{l=A.h(j)
s=new A.O(j,l.h("i(1)").a(new A.j1()),l.h("O<1,i>")).aa(0,B.G)}l=c.r
k=A.h(l)
r=new A.d(l,k.h("e(1)").a(new A.j2(a)),k.h("d<1>")).D(0,0,new A.j3(),t.i)
k=a.b
l=c.gar().x.i(0,k)
l=B.c.A(l==null?0:l,0,100)
k=A.am(k,c,d,null)
if(k.gW()){q=k.e.r
p=q.z+k.gb3()*q.Q}else p=0
o=e^m*7919
o^=o<<13
o^=o>>>17
if(f==null){m=b.z.J(a.e)
k=d.b.i(0,"marchSpeed")
k.toString
q=d.d
if(0>=q.length)return A.n(q,0)
n=m/(k*q[0])}else n=f
if(a.c===b.b)m=1
else{m=d.b.i(0,"foreignYield")
m.toString}k=d.r
return Math.max(1,160+a.z*m*2+r+p+l/100*k.ay-s*0.25-a.d*6)/Math.pow(1+n/k.ax,1.5)+((o^o<<5)&65535)/65536*0.000001},
j1:function j1(){},
j2:function j2(a){this.a=a},
j3:function j3(){},
a2:function a2(a,b,c){this.a=a
this.b=b
this.c=c},
ar:function ar(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.d=c
_.f=d
_.r=e},
eo:function eo(){},
i4:function i4(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
i5:function i5(a){this.a=a},
i6:function i6(){},
i7:function i7(a){this.a=a},
i8:function i8(a){this.a=a},
i9:function i9(a){this.a=a},
ia:function ia(a){this.a=a},
ib:function ib(){},
ek:function ek(a){var _=this
_.a=a
_.d=_.c=_.b=0
_.e=!1},
n7(){var s,r,q=new A.iZ(),p=v.G,o="web-worker:"+A.G(p.self.constructor.name)
p=A.iI(p.self)
s=new A.j_(new A.el(q,o,A.c0(t.S)))
if(typeof s=="function")A.cB(A.cE("Attempting to rewrap a JS function.",null))
r=function(a,b){return function(c){return a(b,c,arguments.length)}}(A.m9,s)
r[$.jA()]=s
p.onmessage=r
q.$1(B.i.an(t.G.a(A.Q(["kind","hello","protocol",1,"build","93b626df","backend",o],t.N,t.X)),null))},
iZ:function iZ(){},
j_:function j_(a){this.a=a},
kC(a){return v.mangledGlobalNames[a]},
nc(a){throw A.T(new A.bZ("Field '"+a+"' has been assigned during initialization."),new Error())},
ae(){throw A.T(A.lk(""),new Error())},
m9(a,b,c){t.h.a(a)
if(A.f(c)>=1)return a.$1(b)
return a.$0()},
kx(a,b,c){A.kq(c,t.H,"T","min")
return Math.min(c.a(a),c.a(b))},
kw(a,b,c){A.kq(c,t.H,"T","max")
return Math.max(c.a(a),c.a(b))},
n_(a,b,c,d,e,f,g,h){var s,r,q,p,o,n,m,l=null,k=f.J(a),j=!c
if(j&&k>d*b+80)return l
s=h.a
r=h.b
q=Math.sqrt(s*s+r*r)
p=q<0.01?0:((a.a-f.a)*s+(a.b-f.b)*r)/(Math.max(1,k)*q)
if(j&&k>72){if(p<0.45)return l
o=Math.max(0,k*p)
n=new A.J(f.a+s/q*o,f.b+r/q*o)
if(e.a4(n).J(n)>48)return l}m=g.$2(f,e.bQ(f,a))
if(isFinite(m))j=!j||m<=b
else j=!1
return j?m:l},
jd(a,b,c){var s=Math.max(0,a-c)
return s*s*b}},B={}
var w=[A,J,B]
var $={}
A.ja.prototype={}
J.cR.prototype={
ac(a,b){return a===b},
gR(a){return A.d8(a)},
p(a){return"Instance of '"+A.d9(a)+"'"},
gS(a){return A.aO(A.jn(this))}}
J.cT.prototype={
p(a){return String(a)},
gR(a){return a?519018:218159},
gS(a){return A.aO(t.y)},
$iA:1,
$ie:1}
J.bU.prototype={
ac(a,b){return null==b},
p(a){return"null"},
gR(a){return 0},
$iA:1}
J.bW.prototype={$iK:1}
J.aS.prototype={
gR(a){return 0},
p(a){return String(a)}}
J.d6.prototype={}
J.bw.prototype={}
J.aR.prototype={
p(a){var s=a[$.kE()]
if(s==null)s=a[$.jA()]
if(s==null)return this.cl(a)
return"JavaScript function for "+J.bm(s)},
$iaG:1}
J.bV.prototype={
gR(a){return 0},
p(a){return String(a)}}
J.bX.prototype={
gR(a){return 0},
p(a){return String(a)}}
J.t.prototype={
l(a,b){A.h(a).c.a(b)
a.$flags&1&&A.cC(a,29)
a.push(b)},
aj(a,b){var s
a.$flags&1&&A.cC(a,"remove",1)
for(s=0;s<a.length;++s)if(J.ao(a[s],b)){a.splice(s,1)
return!0}return!1},
G(a,b){var s
A.h(a).h("b<1>").a(b)
a.$flags&1&&A.cC(a,"addAll",2)
if(Array.isArray(b)){this.cr(a,b)
return}for(s=J.H(b);s.j();)a.push(s.gn())},
cr(a,b){var s,r
t.gn.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.j(A.X(a))
for(r=0;r<s;++r)a.push(b[r])},
aC(a){a.$flags&1&&A.cC(a,"clear","clear")
a.length=0},
aF(a,b,c){var s=A.h(a)
return new A.O(a,s.E(c).h("1(2)").a(b),s.h("@<1>").E(c).h("O<1,2>"))},
da(a,b){var s,r=A.c1(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.u(r,s,A.v(a[s]))
return r.join(b)},
bo(a,b){return A.Z(a,b,null,A.h(a).c)},
aa(a,b){var s,r,q
A.h(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.j(A.aH())
if(0>=s)return A.n(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.j(A.X(a))}return r},
D(a,b,c,d){var s,r,q
d.a(b)
A.h(a).E(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.j(A.X(a))}return r},
ap(a,b){var s,r,q
A.h(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.j(A.X(a))}throw A.j(A.aH())},
T(a,b){if(!(b>=0&&b<a.length))return A.n(a,b)
return a[b]},
gF(a){if(a.length>0)return a[0]
throw A.j(A.aH())},
gbi(a){var s=a.length
if(s>0)return a[s-1]
throw A.j(A.aH())},
H(a,b){var s,r
A.h(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.j(A.X(a))}return!1},
be(a,b){var s,r
A.h(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.j(A.X(a))}return!0},
C(a,b){var s,r,q,p,o,n=A.h(a)
n.h("a(1,1)?").a(b)
a.$flags&2&&A.cC(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dA()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.ds(b,2))
if(p>0)this.cH(a,p)},
cH(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
q(a,b){var s
for(s=0;s<a.length;++s)if(J.ao(a[s],b))return!0
return!1},
ga3(a){return a.length===0},
gaq(a){return a.length!==0},
p(a){return A.j9(a,"[","]")},
gB(a){return new J.b1(a,a.length,A.h(a).h("b1<1>"))},
gR(a){return A.d8(a)},
gm(a){return a.length},
u(a,b,c){A.h(a).c.a(c)
a.$flags&2&&A.cC(a)
if(!(b>=0&&b<a.length))throw A.j(A.kr(a,b))
a[b]=c},
d6(a,b){var s
A.h(a).h("e(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$ip:1,
$ib:1,
$im:1}
J.cS.prototype={
dt(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.d9(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.fY.prototype={}
J.b1.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.u(q)
throw A.j(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iE:1}
J.bq.prototype={
t(a,b){var s
A.w(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaQ(b)
if(this.gaQ(a)===s)return 0
if(this.gaQ(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaQ(a){return a===0?1/a<0:a<0},
k(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.j(A.bb(""+a+".toInt()"))},
ah(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.j(A.bb(""+a+".ceil()"))},
Z(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.j(A.bb(""+a+".floor()"))},
c8(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.j(A.bb(""+a+".round()"))},
A(a,b,c){if(B.c.t(b,c)>0)throw A.j(A.kn(b))
if(this.t(a,b)<0)return b
if(this.t(a,c)>0)return c
return a},
aT(a,b){var s
if(b>20)throw A.j(A.b8(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaQ(a))return"-"+s
return s},
p(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gR(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
aV(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.bK(a,b)},
b9(a,b){return(a|0)===a?a/b|0:this.bK(a,b)},
bK(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.j(A.bb("Result of truncating division is "+A.v(s)+": "+A.v(a)+" ~/ "+b))},
bH(a,b){var s
if(a>0)s=this.cL(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cL(a,b){return b>31?0:a>>>b},
gS(a){return A.aO(t.H)},
$ii:1,
$ia1:1}
J.bT.prototype={
gS(a){return A.aO(t.S)},
$iA:1,
$ia:1}
J.cU.prototype={
gS(a){return A.aO(t.i)},
$iA:1}
J.b4.prototype={
aJ(a,b,c){return a.substring(b,A.lt(b,c,a.length))},
cd(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.j(B.a_)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
dd(a,b,c){var s=b-a.length
if(s<=0)return a
return this.cd(c,s)+a},
t(a,b){var s
A.G(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
p(a){return a},
gR(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gS(a){return A.aO(t.N)},
gm(a){return a.length},
$iA:1,
$iF:1}
A.bZ.prototype={
p(a){return"LateInitializationError: "+this.a}}
A.i1.prototype={}
A.p.prototype={}
A.k.prototype={
gB(a){var s=this
return new A.r(s,s.gm(s),A.l(s).h("r<k.E>"))},
ga3(a){return this.gm(this)===0},
H(a,b){var s,r,q=this
A.l(q).h("e(k.E)").a(b)
s=q.gm(q)
for(r=0;r<s;++r){if(b.$1(q.T(0,r)))return!0
if(s!==q.gm(q))throw A.j(A.X(q))}return!1},
aF(a,b,c){var s=A.l(this)
return new A.O(this,s.E(c).h("1(k.E)").a(b),s.h("@<k.E>").E(c).h("O<1,2>"))},
aa(a,b){var s,r,q,p=this
A.l(p).h("k.E(k.E,k.E)").a(b)
s=p.gm(p)
if(s===0)throw A.j(A.aH())
r=p.T(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.T(0,q))
if(s!==p.gm(p))throw A.j(A.X(p))}return r},
D(a,b,c,d){var s,r,q,p=this
d.a(b)
A.l(p).E(d).h("1(1,k.E)").a(c)
s=p.gm(p)
for(r=b,q=0;q<s;++q){r=c.$2(r,p.T(0,q))
if(s!==p.gm(p))throw A.j(A.X(p))}return r},
ds(a){var s,r=this,q=A.ll(A.l(r).h("k.E"))
for(s=0;s<r.gm(r);++s)q.l(0,r.T(0,s))
return q}}
A.y.prototype={
V(a,b,c,d){var s,r=this.b
A.cb(r,"start")
s=this.c
if(s!=null){A.cb(s,"end")
if(r>s)throw A.j(A.b8(r,0,s,"start",null))}},
gcC(){var s=J.bl(this.a),r=this.c
if(r==null||r>s)return s
return r},
gcN(){var s=J.bl(this.a),r=this.b
if(r>s)return s
return r},
gm(a){var s,r=J.bl(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
T(a,b){var s=this,r=s.gcN()+b
if(b<0||r>=s.gcC())throw A.j(A.j8(b,s.gm(0),s,"index"))
return J.j4(s.a,r)},
ab(a){var s,r,q,p=this,o=p.b,n=p.a,m=J.cA(n),l=m.gm(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.jO(0,p.$ti.c)
return n}r=A.c1(s,m.T(n,o),!0,p.$ti.c)
for(q=1;q<s;++q){B.a.u(r,q,m.T(n,o+q))
if(m.gm(n)<l)throw A.j(A.X(p))}return r}}
A.r.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=J.cA(q),o=p.gm(q)
if(r.b!==o)throw A.j(A.X(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.T(q,s);++r.c
return!0},
$iE:1}
A.b7.prototype={
gB(a){return new A.c3(J.H(this.a),this.b,A.l(this).h("c3<1,2>"))},
gm(a){return J.bl(this.a)}}
A.bN.prototype={$ip:1}
A.c3.prototype={
j(){var s=this,r=s.b
if(r.j()){s.a=s.c.$1(r.gn())
return!0}s.a=null
return!1},
gn(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iE:1}
A.O.prototype={
gm(a){return J.bl(this.a)},
T(a,b){return this.b.$1(J.j4(this.a,b))}}
A.d.prototype={
gB(a){return new A.U(J.H(this.a),this.b,this.$ti.h("U<1>"))}}
A.U.prototype={
j(){var s,r
for(s=this.a,r=this.b;s.j();)if(r.$1(s.gn()))return!0
return!1},
gn(){return this.a.gn()},
$iE:1}
A.bR.prototype={
gB(a){return new A.bS(J.H(this.a),this.b,B.T,this.$ti.h("bS<1,2>"))}}
A.bS.prototype={
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
A.b9.prototype={
gB(a){var s=this.a
return new A.ba(s.gB(s),this.b,A.l(this).h("ba<1>"))}}
A.bO.prototype={
gm(a){var s=this.a,r=s.gm(s)
s=this.b
if(r>s)return s
return r},
$ip:1}
A.ba.prototype={
j(){if(--this.b>=0)return this.a.j()
this.b=-1
return!1},
gn(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gn()},
$iE:1}
A.bP.prototype={
j(){return!1},
gn(){throw A.j(A.aH())},
$iE:1}
A.bx.prototype={
gB(a){return new A.ch(J.H(this.a),this.$ti.h("ch<1>"))}}
A.ch.prototype={
j(){var s,r
for(s=this.a,r=this.$ti.c;s.j();)if(r.b(s.gn()))return!0
return!1},
gn(){return this.$ti.c.a(this.a.gn())},
$iE:1}
A.I.prototype={
sm(a,b){throw A.j(A.bb("Cannot change the length of a fixed-length list"))},
l(a,b){A.ay(a).h("I.E").a(b)
throw A.j(A.bb("Cannot add to a fixed-length list"))}}
A.L.prototype={
gm(a){return this.a.length},
T(a,b){var s=this.a
return J.j4(s,s.length-1-b)}}
A.aW.prototype={$r:"+(1,2,3)",$s:1}
A.aM.prototype={$r:"+breakthrough,lower,teamSize,upper(1,2,3,4)",$s:2}
A.bz.prototype={$r:"+high,low,selfHigh,selfLow(1,2,3,4)",$s:3}
A.bK.prototype={}
A.bJ.prototype={
ga3(a){return this.gm(this)===0},
gaq(a){return this.gm(this)!==0},
p(a){return A.h5(this)},
gai(){return new A.aw(this.d4(),A.l(this).h("aw<a8<1,2>>"))},
d4(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gai(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.ga8(),o=o.gB(o),n=A.l(s),m=n.y[1],n=n.h("a8<1,2>")
case 2:if(!o.j()){r=3
break}l=o.gn()
k=s.i(0,l)
r=4
return a.b=new A.a8(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$ia7:1}
A.bL.prototype={
gm(a){return this.b.length},
gbA(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
Y(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
i(a,b){if(!this.Y(b))return null
return this.b[this.a[b]]},
a7(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbA()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
ga8(){return new A.be(this.gbA(),this.$ti.h("be<1>"))},
gau(){return new A.be(this.b,this.$ti.h("be<2>"))}}
A.be.prototype={
gm(a){return this.a.length},
gB(a){var s=this.a
return new A.ci(s,s.length,this.$ti.h("ci<1>"))}}
A.ci.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iE:1}
A.cQ.prototype={
ac(a,b){if(b==null)return!1
return b instanceof A.b3&&this.a.ac(0,b.a)&&A.jv(this)===A.jv(b)},
gR(a){return A.je(this.a,A.jv(this),B.o,B.o)},
p(a){var s=B.a.da([A.aO(this.$ti.c)],", ")
return this.a.p(0)+" with "+("<"+s+">")}}
A.b3.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.n4(A.iQ(this.a),this.$ti)}}
A.hA.prototype={
$0(){return B.b.Z(1000*this.a.now())},
$S:5}
A.cc.prototype={}
A.ic.prototype={
a9(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.c8.prototype={
p(a){return"Null check operator used on a null value"}}
A.cV.prototype={
p(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.de.prototype={
p(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.h7.prototype={
p(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.bQ.prototype={}
A.co.prototype={
p(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iaU:1}
A.a4.prototype={
p(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.kD(r==null?"unknown":r)+"'"},
$iaG:1,
gdz(){return this},
$C:"$1",
$R:1,
$D:null}
A.cH.prototype={$C:"$0",$R:0}
A.cI.prototype={$C:"$2",$R:2}
A.dc.prototype={}
A.db.prototype={
p(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.kD(s)+"'"}}
A.bo.prototype={
ac(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bo))return!1
return this.$_target===b.$_target&&this.a===b.a},
gR(a){return(A.ky(this.a)^A.d8(this.$_target))>>>0},
p(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.d9(this.a)+"'")}}
A.da.prototype={
p(a){return"RuntimeError: "+this.a}}
A.aI.prototype={
gm(a){return this.a},
ga3(a){return this.a===0},
ga8(){return new A.a6(this,A.l(this).h("a6<1>"))},
gai(){return new A.b5(this,A.l(this).h("b5<1,2>"))},
Y(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.d7(a)},
d7(a){var s=this.d
if(s==null)return!1
return this.bg(this.by(s,a),a)>=0},
G(a,b){A.l(this).h("a7<1,2>").a(b).a7(0,new A.fZ(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.d8(b)},
d8(a){var s,r,q=this.d
if(q==null)return null
s=this.by(q,a)
r=this.bg(s,a)
if(r<0)return null
return s[r].b},
u(a,b,c){var s,r,q=this,p=A.l(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bs(s==null?q.b=q.b7():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bs(r==null?q.c=q.b7():r,b,c)}else q.d9(b,c)},
d9(a,b){var s,r,q,p,o=this,n=A.l(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.b7()
r=o.c0(a)
q=s[r]
if(q==null)s[r]=[o.b8(a,b)]
else{p=o.bg(q,a)
if(p>=0)q[p].b=b
else q.push(o.b8(a,b))}},
df(a,b){var s,r,q=this,p=A.l(q)
p.c.a(a)
p.h("2()").a(b)
if(q.Y(a)){s=q.i(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.u(0,a,r)
return r},
aj(a,b){var s=this.co(this.b,b)
return s},
aC(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.b6()}},
a7(a,b){var s,r,q=this
A.l(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.j(A.X(q))
s=s.c}},
bs(a,b,c){var s,r=A.l(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.b8(b,c)
else s.b=c},
co(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.cp(s)
delete a[b]
return s.b},
b6(){this.r=this.r+1&1073741823},
b8(a,b){var s=this,r=A.l(s),q=new A.h2(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.b6()
return q},
cp(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.b6()},
c0(a){return J.af(a)&1073741823},
by(a,b){return a[this.c0(b)]},
bg(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.ao(a[r].a,b))return r
return-1},
p(a){return A.h5(this)},
b7(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ijQ:1}
A.fZ.prototype={
$2(a,b){var s=this.a,r=A.l(s)
s.u(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.l(this.a).h("~(1,2)")}}
A.h2.prototype={}
A.a6.prototype={
gm(a){return this.a.a},
ga3(a){return this.a.a===0},
gB(a){var s=this.a
return new A.b6(s,s.r,s.e,this.$ti.h("b6<1>"))},
q(a,b){return this.a.Y(b)}}
A.b6.prototype={
gn(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.X(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iE:1}
A.ai.prototype={
gm(a){return this.a.a},
gB(a){var s=this.a
return new A.ah(s,s.r,s.e,this.$ti.h("ah<1>"))}}
A.ah.prototype={
gn(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.X(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iE:1}
A.b5.prototype={
gm(a){return this.a.a},
gB(a){var s=this.a
return new A.c_(s,s.r,s.e,this.$ti.h("c_<1,2>"))}}
A.c_.prototype={
gn(){var s=this.d
s.toString
return s},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.X(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.a8(s.a,s.b,r.$ti.h("a8<1,2>"))
r.c=s.c
return!0}},
$iE:1}
A.iV.prototype={
$1(a){return this.a(a)},
$S:26}
A.iW.prototype={
$2(a,b){return this.a(a,b)},
$S:42}
A.iX.prototype={
$1(a){return this.a(A.G(a))},
$S:37}
A.aB.prototype={
p(a){return this.bM(!1)},
bM(a){var s,r,q,p,o,n=this.cD(),m=this.b5(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.n(m,q)
o=m[q]
l=a?l+A.jU(o):l+A.v(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
cD(){var s,r=this.$s
while($.iB.length<=r)B.a.l($.iB,null)
s=$.iB[r]
if(s==null){s=this.cz()
B.a.u($.iB,r,s)}return s},
cz(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.c(new Array(l),t.Q)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.u(k,q,r[s])}}return A.aT(k,t.K)}}
A.by.prototype={
b5(){return[this.a,this.b,this.c]},
ac(a,b){var s=this
if(b==null)return!1
return b instanceof A.by&&s.$s===b.$s&&J.ao(s.a,b.a)&&J.ao(s.b,b.b)&&J.ao(s.c,b.c)},
gR(a){var s=this
return A.je(s.$s,s.a,s.b,s.c)}}
A.bh.prototype={
b5(){return this.a},
ac(a,b){if(b==null)return!1
return b instanceof A.bh&&this.$s===b.$s&&A.lQ(this.a,b.a)},
gR(a){return A.je(this.$s,A.lo(this.a),B.o,B.o)}}
A.bs.prototype={
gS(a){return B.ag},
$iA:1}
A.c6.prototype={}
A.cX.prototype={
gS(a){return B.ah},
$iA:1}
A.bt.prototype={
gm(a){return a.length},
$iag:1}
A.c4.prototype={$ip:1,$ib:1,$im:1}
A.c5.prototype={$ip:1,$ib:1,$im:1}
A.cY.prototype={
gS(a){return B.ai},
$iA:1}
A.cZ.prototype={
gS(a){return B.aj},
$iA:1}
A.d_.prototype={
gS(a){return B.ak},
$iA:1}
A.d0.prototype={
gS(a){return B.al},
$iA:1}
A.d1.prototype={
gS(a){return B.am},
$iA:1}
A.d2.prototype={
gS(a){return B.ao},
$iA:1}
A.d3.prototype={
gS(a){return B.ap},
$iA:1}
A.c7.prototype={
gS(a){return B.aq},
gm(a){return a.length},
$iA:1}
A.d4.prototype={
gS(a){return B.ar},
gm(a){return a.length},
$iA:1,
$iji:1}
A.cj.prototype={}
A.ck.prototype={}
A.cl.prototype={}
A.cm.prototype={}
A.at.prototype={
h(a){return A.cs(v.typeUniverse,this,a)},
E(a){return A.ka(v.typeUniverse,this,a)}}
A.dj.prototype={}
A.iF.prototype={
p(a){return A.aa(this.a,null)}}
A.di.prototype={
p(a){return this.a}}
A.bA.prototype={$iaK:1}
A.ig.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:24}
A.ie.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:50}
A.ih.prototype={
$0(){this.a.$0()},
$S:25}
A.ii.prototype={
$0(){this.a.$0()},
$S:25}
A.iD.prototype={
cn(a,b){if(self.setTimeout!=null)self.setTimeout(A.ds(new A.iE(this,b),0),a)
else throw A.j(A.bb("`setTimeout()` not found."))}}
A.iE.prototype={
$0(){this.b.$0()},
$S:3}
A.df.prototype={}
A.iJ.prototype={
$1(a){return this.a.$2(0,a)},
$S:35}
A.iK.prototype={
$2(a,b){this.a.$2(1,new A.bQ(a,t.l.a(b)))},
$S:44}
A.iN.prototype={
$2(a,b){this.a(A.f(a),b)},
$S:58}
A.aN.prototype={
gn(){var s=this.b
return s==null?this.$ti.c.a(s):s},
cI(a,b){var s,r,q
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
o.d=null}q=o.cI(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.k4
return!1}if(0>=p.length)return A.n(p,-1)
o.a=p.pop()
m=0
n=null
continue}if(2===q){m=0
n=null
continue}if(3===q){n=o.c
o.c=null
p=o.e
if(p==null||p.length===0){o.b=null
o.a=A.k4
throw n
return!1}if(0>=p.length)return A.n(p,-1)
o.a=p.pop()
m=1
continue}throw A.j(A.jW("sync*"))}return!1},
bP(a){var s,r,q=this
if(a instanceof A.aw){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.l(r,q.a)
q.a=s
return 2}else{q.d=J.H(a)
return 2}},
$iE:1}
A.aw.prototype={
gB(a){return new A.aN(this.a(),this.$ti.h("aN<1>"))}}
A.aq.prototype={
p(a){return A.v(this.a)},
$iC:1,
gaI(){return this.b}}
A.fX.prototype={
$0(){this.c.a(null)
this.b.cv(null)},
$S:3}
A.bc.prototype={
dc(a){if((this.c&15)!==6)return!0
return this.b.b.bk(t.al.a(this.d),a.a,t.y,t.K)},
d5(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.dn(q,m,a.b,o,n,t.l)
else p=l.bk(t.D.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.aP(s))){if((r.c&1)!==0)throw A.j(A.cE("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.j(A.cE("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.V.prototype={
c9(a,b,c){var s,r,q=this.$ti
q.E(c).h("1/(2)").a(a)
s=$.M
if(s===B.j){if(!t.C.b(b)&&!t.D.b(b))throw A.j(A.em(b,"onError",u.c))}else{c.h("@<0/>").E(q.c).h("1(2)").a(a)
b=A.mB(b,s)}r=new A.V(s,c.h("V<0>"))
this.aW(new A.bc(r,3,a,b,q.h("@<1>").E(c).h("bc<1,2>")))
return r},
bL(a,b,c){var s,r=this.$ti
r.E(c).h("1/(2)").a(a)
s=new A.V($.M,c.h("V<0>"))
this.aW(new A.bc(s,19,a,b,r.h("@<1>").E(c).h("bc<1,2>")))
return s},
cK(a){this.a=this.a&1|16
this.c=a},
aK(a){this.a=a.a&30|this.a&1
this.c=a.c},
aW(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.aW(a)
return}r.aK(s)}A.dr(null,null,r.b,t.M.a(new A.ik(r,a)))}},
bE(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.bE(a)
return}m.aK(n)}l.a=m.aM(a)
A.dr(null,null,m.b,t.M.a(new A.iq(l,m)))}},
aw(){var s=t.F.a(this.c)
this.c=null
return this.aM(s)},
aM(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
cv(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("aQ<1>").b(a))A.io(a,r,!0)
else{s=r.aw()
q.c.a(a)
r.a=8
r.c=a
A.bd(r,s)}},
bx(a){var s,r=this
r.$ti.c.a(a)
s=r.aw()
r.a=8
r.c=a
A.bd(r,s)},
cw(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aw()
q.aK(a)
A.bd(q,r)},
b_(a){var s=this.aw()
this.cK(a)
A.bd(this,s)},
ct(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("aQ<1>").b(a)){this.bv(a)
return}this.cu(a)},
cu(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dr(null,null,s.b,t.M.a(new A.im(s,a)))},
bv(a){A.io(this.$ti.h("aQ<1>").a(a),this,!1)
return},
bu(a){this.a^=2
A.dr(null,null,this.b,t.M.a(new A.il(this,a)))},
$iaQ:1}
A.ik.prototype={
$0(){A.bd(this.a,this.b)},
$S:3}
A.iq.prototype={
$0(){A.bd(this.b,this.a.a)},
$S:3}
A.ip.prototype={
$0(){A.io(this.a.a,this.b,!0)},
$S:3}
A.im.prototype={
$0(){this.a.bx(this.b)},
$S:3}
A.il.prototype={
$0(){this.a.b_(this.b)},
$S:3}
A.it.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dm(t.fO.a(q.d),t.z)}catch(p){s=A.aP(p)
r=A.bG(p)
if(k.c&&t.u.a(k.b.a.c).a===s){q=k.a
q.c=t.u.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.j7(q)
n=k.a
n.c=new A.aq(q,o)
q=n}q.b=!0
return}if(j instanceof A.V&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.u.a(j.c)
q.b=!0}return}if(j instanceof A.V){m=k.b.a
l=new A.V(m.b,m.$ti)
j.c9(new A.iu(l,m),new A.iv(l),t.x)
q=k.a
q.c=l
q.b=!1}},
$S:3}
A.iu.prototype={
$1(a){this.a.cw(this.b)},
$S:24}
A.iv.prototype={
$2(a,b){A.cv(a)
t.l.a(b)
this.a.b_(new A.aq(a,b))},
$S:67}
A.is.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bk(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aP(l)
r=A.bG(l)
q=s
p=r
if(p==null)p=A.j7(q)
o=this.a
o.c=new A.aq(q,p)
o.b=!0}},
$S:3}
A.ir.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.u.a(l.a.a.c)
p=l.b
if(p.a.dc(s)&&p.a.e!=null){p.c=p.a.d5(s)
p.b=!1}}catch(o){r=A.aP(o)
q=A.bG(o)
p=t.u.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.j7(p)
m=l.b
m.c=new A.aq(p,n)
p=m}p.b=!0}},
$S:3}
A.dg.prototype={}
A.dp.prototype={}
A.cu.prototype={$ik_:1}
A.dn.prototype={
dq(a){var s,r,q
t.M.a(a)
try{if(B.j===$.M){a.$0()
return}A.kj(null,null,this,a,t.x)}catch(q){s=A.aP(q)
r=A.bG(q)
A.jq(A.cv(s),t.l.a(r))}},
bR(a){return new A.iC(this,t.M.a(a))},
dm(a,b){b.h("0()").a(a)
if($.M===B.j)return a.$0()
return A.kj(null,null,this,a,b)},
bk(a,b,c,d){c.h("@<0>").E(d).h("1(2)").a(a)
d.a(b)
if($.M===B.j)return a.$1(b)
return A.mD(null,null,this,a,b,c,d)},
dn(a,b,c,d,e,f){d.h("@<0>").E(e).E(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.M===B.j)return a.$2(b,c)
return A.mC(null,null,this,a,b,c,d,e,f)},
c7(a,b,c,d){return b.h("@<0>").E(c).E(d).h("1(2,3)").a(a)}}
A.iC.prototype={
$0(){return this.a.dq(this.b)},
$S:3}
A.iM.prototype={
$0(){A.la(this.a,this.b)},
$S:3}
A.au.prototype={
cE(){return new A.au(A.l(this).h("au<1>"))},
gB(a){var s=this,r=new A.bf(s,s.r,A.l(s).h("bf<1>"))
r.c=s.e
return r},
gm(a){return this.a},
q(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cA(b)},
cA(a){var s=this.d
if(s==null)return!1
return this.b4(s[this.b0(a)],a)>=0},
l(a,b){var s,r,q=this
A.l(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bw(s==null?q.b=A.jj():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bw(r==null?q.c=A.jj():r,b)}else return q.cq(b)},
cq(a){var s,r,q,p=this
A.l(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jj()
r=p.b0(a)
q=s[r]
if(q==null)s[r]=[p.aZ(a)]
else{if(p.b4(q,a)>=0)return!1
q.push(p.aZ(a))}return!0},
aj(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bG(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bG(s.c,b)
else return s.cG(b)},
cG(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.b0(a)
r=n[s]
q=o.b4(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bN(p)
return!0},
bw(a,b){A.l(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.aZ(b)
return!0},
bG(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bN(s)
delete a[b]
return!0},
aY(){this.r=this.r+1&1073741823},
aZ(a){var s,r=this,q=new A.dm(A.l(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.aY()
return q},
bN(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.aY()},
b0(a){return J.af(a)&1073741823},
b4(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.ao(a[r].a,b))return r
return-1},
$ijS:1}
A.dm.prototype={}
A.bf.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.j(A.X(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iE:1}
A.h3.prototype={
$2(a,b){this.a.u(0,this.b.a(a),this.c.a(b))},
$S:43}
A.B.prototype={
gB(a){return new A.r(a,a.length,A.ay(a).h("r<B.E>"))},
T(a,b){if(!(b>=0&&b<a.length))return A.n(a,b)
return a[b]},
ga3(a){return a.length===0},
gaq(a){return a.length!==0},
gF(a){var s=a.length
if(s===0)throw A.j(A.aH())
if(0>=s)return A.n(a,0)
return a[0]},
gbi(a){var s,r=a.length
if(r===0)throw A.j(A.aH())
s=r-1
if(!(s>=0))return A.n(a,s)
return a[s]},
aF(a,b,c){var s=A.ay(a)
return new A.O(a,s.E(c).h("1(B.E)").a(b),s.h("@<B.E>").E(c).h("O<1,2>"))},
D(a,b,c,d){var s,r,q,p
d.a(b)
A.ay(a).E(d).h("1(1,B.E)").a(c)
s=a.length
for(r=s,q=b,p=0;p<s;++p){if(!(p<r))return A.n(a,p)
q=c.$2(q,a[p])
r=a.length
if(s!==r)throw A.j(A.X(a))}return q},
bo(a,b){return A.Z(a,b,null,A.ay(a).h("B.E"))},
l(a,b){var s
A.ay(a).h("B.E").a(b)
s=a.length
this.sm(a,s+1)
if(!(s<a.length))return A.n(a,s)
a[s]=b},
p(a){return A.j9(a,"[","]")}}
A.D.prototype={
a7(a,b){var s,r,q,p=A.l(this)
p.h("~(D.K,D.V)").a(b)
for(s=this.ga8(),s=s.gB(s),p=p.h("D.V");s.j();){r=s.gn()
q=this.i(0,r)
b.$2(r,q==null?p.a(q):q)}},
aG(a,b,c){var s,r=this,q=A.l(r)
q.h("D.K").a(a)
q.h("D.V(D.V)").a(b)
q.h("D.V()?").a(c)
if(r.Y(a)){s=r.i(0,a)
q=b.$1(s==null?q.h("D.V").a(s):s)
r.u(0,a,q)
return q}q=c.$0()
r.u(0,a,q)
return q},
gai(){return this.ga8().aF(0,new A.h4(this),A.l(this).h("a8<D.K,D.V>"))},
Y(a){return this.ga8().q(0,a)},
gm(a){var s=this.ga8()
return s.gm(s)},
ga3(a){var s=this.ga8()
return s.ga3(s)},
p(a){return A.h5(this)},
$ia7:1}
A.h4.prototype={
$1(a){var s=this.a,r=A.l(s)
r.h("D.K").a(a)
s=s.i(0,a)
if(s==null)s=r.h("D.V").a(s)
return new A.a8(a,s,r.h("a8<D.K,D.V>"))},
$S(){return A.l(this.a).h("a8<D.K,D.V>(D.K)")}}
A.h6.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.v(a)
r.a=(r.a+=s)+": "
s=A.v(b)
r.a+=s},
$S:23}
A.ct.prototype={}
A.br.prototype={
i(a,b){return this.a.i(0,b)},
a7(a,b){this.a.a7(0,this.$ti.h("~(1,2)").a(b))},
ga3(a){return this.a.a===0},
gaq(a){return this.a.a!==0},
gm(a){return this.a.a},
p(a){return A.h5(this.a)},
gau(){var s=this.a
return new A.ai(s,A.l(s).h("ai<2>"))},
gai(){var s=this.a
return new A.b5(s,A.l(s).h("b5<1,2>"))},
$ia7:1}
A.cf.prototype={}
A.bu.prototype={
G(a,b){var s
A.l(this).h("b<1>").a(b)
for(s=b.gB(b);s.j();)this.l(0,s.gn())},
p(a){return A.j9(this,"{","}")},
D(a,b,c,d){var s,r,q,p
d.a(b)
s=A.l(this)
s.E(d).h("1(1,2)").a(c)
for(s=A.iA(this,this.r,s.c),r=s.$ti.c,q=b;s.j();){p=s.d
q=c.$2(q,p==null?r.a(p):p)}return q},
H(a,b){var s,r,q=A.l(this)
q.h("e(1)").a(b)
for(q=A.iA(this,this.r,q.c),s=q.$ti.c;q.j();){r=q.d
if(b.$1(r==null?s.a(r):r))return!0}return!1},
$ip:1,
$ib:1,
$ijg:1}
A.cn.prototype={
d2(a){var s,r,q,p=this,o=p.cE()
for(s=A.iA(p,p.r,A.l(p).c),r=s.$ti.c;s.j();){q=s.d
if(q==null)q=r.a(q)
if(!a.q(0,q))o.l(0,q)}return o}}
A.bB.prototype={}
A.dk.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cF(b):s}},
gm(a){return this.b==null?this.c.a:this.av().length},
ga3(a){return this.gm(0)===0},
ga8(){if(this.b==null){var s=this.c
return new A.a6(s,A.l(s).h("a6<1>"))}return new A.dl(this)},
u(a,b,c){var s,r,q=this
A.G(b)
if(q.b==null)q.c.u(0,b,c)
else if(q.Y(b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.cP().u(0,b,c)},
Y(a){if(this.b==null)return this.c.Y(a)
return!1},
a7(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.a7(0,b)
s=o.av()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.iL(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.j(A.X(o))}},
av(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.c(Object.keys(this.a),t.s)
return s},
cP(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.Y(t.N,t.z)
r=n.av()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.u(0,o,n.i(0,o))}if(p===0)B.a.l(r,"")
else B.a.aC(r)
n.a=n.b=null
return n.c=s},
cF(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.iL(this.a[a])
return this.b[a]=s}}
A.dl.prototype={
gm(a){return this.a.gm(0)},
T(a,b){var s=this.a
if(s.b==null)s=s.ga8().T(0,b)
else{s=s.av()
if(!(b>=0&&b<s.length))return A.n(s,b)
s=s[b]}return s},
gB(a){var s=this.a
if(s.b==null){s=s.ga8()
s=s.gB(s)}else{s=s.av()
s=new J.b1(s,s.length,A.h(s).h("b1<1>"))}return s},
q(a,b){return this.a.Y(b)}}
A.cJ.prototype={}
A.cL.prototype={}
A.bY.prototype={
p(a){var s=A.cO(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.cW.prototype={
p(a){return"Cyclic error in JSON stringify"}}
A.h_.prototype={
d_(a,b){var s=A.mz(a,this.gd0().a)
return s},
an(a,b){var s=A.lH(a,this.gd3().b,null)
return s},
gd3(){return B.ad},
gd0(){return B.ac}}
A.h1.prototype={}
A.h0.prototype={}
A.iy.prototype={
cb(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.q.aJ(a,r,q)
r=q+1
o=A.a0(92)
s.a+=o
o=A.a0(117)
s.a+=o
o=A.a0(100)
s.a+=o
o=p>>>8&15
o=A.a0(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.a0(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.a0(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.q.aJ(a,r,q)
r=q+1
o=A.a0(92)
s.a+=o
switch(p){case 8:o=A.a0(98)
s.a+=o
break
case 9:o=A.a0(116)
s.a+=o
break
case 10:o=A.a0(110)
s.a+=o
break
case 12:o=A.a0(102)
s.a+=o
break
case 13:o=A.a0(114)
s.a+=o
break
default:o=A.a0(117)
s.a+=o
o=A.a0(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.a0(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.a0(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.q.aJ(a,r,q)
r=q+1
o=A.a0(92)
s.a+=o
o=A.a0(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.q.aJ(a,r,m)},
aX(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.j(new A.cW(a,null))}B.a.l(s,a)},
aU(a){var s,r,q,p,o=this
if(o.ca(a))return
o.aX(a)
try{s=o.b.$1(a)
if(!o.ca(s)){q=A.jP(a,null,o.gbB())
throw A.j(q)}q=o.a
if(0>=q.length)return A.n(q,-1)
q.pop()}catch(p){r=A.aP(p)
q=A.jP(a,r,o.gbB())
throw A.j(q)}},
ca(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.b.p(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.cb(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.aX(a)
q.dv(a)
s=q.a
if(0>=s.length)return A.n(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.aX(a)
r=q.dw(a)
s=q.a
if(0>=s.length)return A.n(s,-1)
s.pop()
return r}else return!1},
dv(a){var s,r=this.c
r.a+="["
if(J.jE(a)){if(0>=a.length)return A.n(a,0)
this.aU(a[0])
for(s=1;s<a.length;++s){r.a+=","
this.aU(a[s])}}r.a+="]"},
dw(a){var s,r,q,p,o,n,m=this,l={}
if(a.ga3(a)){m.c.a+="{}"
return!0}s=a.gm(a)*2
r=A.c1(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.a7(0,new A.iz(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.cb(A.G(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.n(r,n)
m.aU(r[n])}p.a+="}"
return!0}}
A.iz.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.u(s,r.a++,a)
B.a.u(s,r.a++,b)},
$S:23}
A.ix.prototype={
gbB(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.cM.prototype={
ac(a,b){if(b==null)return!1
return b instanceof A.cM},
gR(a){return B.c.gR(0)},
p(a){return"0:00:00."+B.q.dd(B.c.p(0),6,"0")}}
A.dh.prototype={
p(a){return this.aL()},
$icN:1}
A.C.prototype={
gaI(){return A.lq(this)}}
A.cF.prototype={
p(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cO(s)
return"Assertion failed"}}
A.aK.prototype={}
A.aA.prototype={
gb2(){return"Invalid argument"+(!this.a?"(s)":"")},
gb1(){return""},
p(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gb2()+q+o
if(!s.a)return n
return n+s.gb1()+": "+A.cO(s.gbh())},
gbh(){return this.b}}
A.ca.prototype={
gbh(){return A.R(this.b)},
gb2(){return"RangeError"},
gb1(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.v(q):""
else if(q==null)s=": Not greater than or equal to "+A.v(r)
else if(q>r)s=": Not in inclusive range "+A.v(r)+".."+A.v(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.v(r)
return s}}
A.cP.prototype={
gbh(){return A.f(this.b)},
gb2(){return"RangeError"},
gb1(){if(A.f(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gm(a){return this.f}}
A.cg.prototype={
p(a){return"Unsupported operation: "+this.a}}
A.dd.prototype={
p(a){return"UnimplementedError: "+this.a}}
A.ce.prototype={
p(a){return"Bad state: "+this.a}}
A.cK.prototype={
p(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.cO(s)+"."}}
A.d5.prototype={
p(a){return"Out of Memory"},
gaI(){return null},
$iC:1}
A.cd.prototype={
p(a){return"Stack Overflow"},
gaI(){return null},
$iC:1}
A.ij.prototype={
p(a){return"Exception: "+this.a}}
A.aF.prototype={
p(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.b.prototype={
aF(a,b,c){var s=A.l(this)
return A.ln(this,s.E(c).h("1(b.E)").a(b),s.h("b.E"),c)},
du(a,b){var s=A.l(this)
return new A.d(this,s.h("e(b.E)").a(b),s.h("d<b.E>"))},
D(a,b,c,d){var s,r
d.a(b)
A.l(this).E(d).h("1(1,b.E)").a(c)
for(s=this.gB(this),r=b;s.j();)r=c.$2(r,s.gn())
return r},
H(a,b){var s
A.l(this).h("e(b.E)").a(b)
for(s=this.gB(this);s.j();)if(b.$1(s.gn()))return!0
return!1},
gm(a){var s,r=this.gB(this)
for(s=0;r.j();)++s
return s},
gF(a){var s=this.gB(this)
if(!s.j())throw A.j(A.aH())
return s.gn()},
T(a,b){var s,r
A.cb(b,"index")
s=this.gB(this)
for(r=b;s.j();){if(r===0)return s.gn();--r}throw A.j(A.j8(b,b-r,this,"index"))},
p(a){return A.lh(this,"(",")")}}
A.a8.prototype={
p(a){return"MapEntry("+A.v(this.a)+": "+A.v(this.b)+")"}}
A.a9.prototype={
gR(a){return A.x.prototype.gR.call(this,0)},
p(a){return"null"}}
A.x.prototype={$ix:1,
ac(a,b){return this===b},
gR(a){return A.d8(this)},
p(a){return"Instance of '"+A.d9(this)+"'"},
gS(a){return A.mY(this)},
toString(){return this.p(this)}}
A.dq.prototype={
p(a){return""},
$iaU:1}
A.i2.prototype={
gbY(){var s,r=this.b
if(r==null)r=$.hC.$0()
s=r-this.a
if($.jB()===1e6)return s
return s*1000},
bp(){var s=this,r=s.b
if(r!=null){s.a=s.a+($.hC.$0()-r)
s.b=null}}}
A.bv.prototype={
gm(a){return this.a.length},
p(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ilw:1}
A.aV.prototype={}
A.en.prototype={}
A.aE.prototype={
gcQ(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=t.S,f=A.Y(g,g)
for(g=h.y,g=new A.ah(g,g.r,g.e,A.l(g).h("ah<2>")),s=h.a,r=h.z,q=h.Q,p=s.b,o=s.a;g.j();){n=g.d
m=s.a_(n.a)
l=!0
if(n.as){k=n.d
if(k!=null)if(m!=null)if(!m.fy)if(!(m.f<=0)){j=m.a
if(!r.q(0,j)){i=m.as
if(!((i===B.f||i===B.e)&&!q.q(0,j)))if(n.y>=p){l=s.K(k)
l=(l==null?null:l.b)!==o}}}}if(l)continue
n=n.d
n.toString
f.aG(n,new A.dx(),new A.dy())}return f},
M(){var s,r=this,q=r.y,p=A.l(q).h("ai<2>")
q=A.o(new A.ai(q,p),p.h("b.E"))
s=A.jG(r.a,r.b,r.c,q)
s.d=r.d
s.e=r.e
s.f=r.f
s.r=r.r
q=s.w
q.aC(0)
q.G(0,r.w)
q=s.x
q.aC(0)
q.G(0,r.x)
s.z.G(0,r.z)
s.Q.G(0,r.Q)
s.as.G(0,r.as)
s.at.G(0,r.at)
s.ax.G(0,r.ax)
B.a.G(s.ay,r.ay)
return s},
v(a){var s=this.a.v(a),r=A.h(s),q=r.h("d<1>")
s=A.o(new A.d(s,r.h("e(1)").a(new A.dV(this)),q),q.h("b.E"))
return s},
O(a){var s
if(a.at==null){s=this.x.i(0,a.a)
if(s==null)s=a.d}else s=a.ga5()
return s},
L(a){var s,r=this.v(a).length,q=this.gcQ().i(0,a)
if(q==null)q=0
s=this.at.q(0,a)?1:0
return r+q+s},
af(a){var s,r,q,p=this,o=p.a,n=a.a,m=o.v(n),l=p.v(n)
if(a.at!=null||B.a.H(o.r,new A.dN(p,a)))return l.length===0?0:1
if(B.a.H(l,new A.dO()))return 1
if(m.length<=1)return 0
n=o.f
s=A.h(n)
r=t.i
q=new A.d(n,s.h("e(1)").a(new A.dP(p)),s.h("d<1>")).D(0,1/0,new A.dQ(a),r)
o=o.gN()
s=o.$ti
return q>new A.d(o,s.h("e(b.E)").a(new A.dR(a)),s.h("d<b.E>")).D(0,1/0,new A.dS(a),r)*1.5?0:1},
ad(d2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4=this,c5="monthSeconds",c6="supplySafety",c7="supplySeconds",c8="battleBudget",c9=c4.b,d0=c9.b,d1=d0.i(0,c5)
d1.toString
s=d0.i(0,c6)
s.toString
r=d1+s
d1=c4.ay
s=A.o(d1,t.gf)
for(q=c4.a,p=q.r,o=A.h(p),n=o.h("e(1)"),m=n.a(new A.dB(c4)),l=B.a.gB(p),m=new A.U(l,m,o.h("U<1>")),k=c4.y,j=c4.c,o=o.h("d<1>"),c9=c9.r,i=c9.CW,h=q.b/60,g=c9.d,f=c9.p1;m.j();){c9=l.gn()
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
for(c=c9.p2,a2=c.length,a3=0;a3<c.length;c.length===a2||(0,A.u)(c),++a3,a0=a4){a4=c[a3]
a1+=j.X(a0,a4)}}else{a2=e!=null
if(a2&&e.as){a0=c9.z
for(c=J.j6(e.w,e.x),a2=c.$ti,c=new A.r(c,c.gm(0),a2.h("r<k.E>")),a2=a2.h("k.E"),a1=g;c.j();a0=a6){a5=c.d
a6=a5==null?a2.a(a5):a5
a1+=j.X(a0,a6)}}else{a5=c9.cx
if(a5!=null){a7=q.K(a5)
a7=a7==null?null:a7.b
a7=a7===c9.b&&c9.CW!=null}else a7=!1
if(a7){c=c9.z
a2=c9.CW
a2.toString
a1=j.X(c,a2)+g}else if(a2&&!e.as){c=e.z
a2=e.Q
a5=d0.i(0,c7)
a5.toString
a1=Math.max(0,c/60-i+a2*a5-h)
c=c9.CW
if(c!=null)a1=Math.max(a1,j.X(c9.z,c))}else{a2=c9.CW
if(a2!=null&&!c){a8=j.X(c9.z,a2)
a9=q.K(a5)
a1=Math.max(r,a8)
if(a9!=null&&a9.b!==c9.b){b0=new A.d(p,n.a(new A.dC(c9,a9)),o).gm(0)
c=a9.at
if(c==null)c=a9.d
else{a2=a9.ax
a5=a9.cy?1:0
a5=B.c.A(c-a2-a5,0,5)
c=a5}b1=Math.max(1,Math.min(c,q.v(a9.a).length))
c=d0.i(0,c8)
c.toString
a2=d0.i(0,c6)
a2.toString
a1=a8+b1*(1+b0)*c+a2}}else a1=r}}}if(!isFinite(a1))a1=f
r=Math.max(r,a1)
b2=e==null&&c9.cx==null&&!d
c9=c9.ch
d=b2?1/0:a1
B.a.l(s,new A.aV(c9,b/a,d))}for(c9=d1.length,a3=0;a3<c9;++a3)r=Math.max(r,d1[a3].c)
r=Math.min(f,r)
c9=t.S
b3=new A.d(p,n.a(new A.dD(c4)),o).D(0,c4.r,new A.dE(),c9)
b4=new A.d(p,n.a(new A.dF(c4)),o).D(0,c4.r,new A.dG(),c9)
o=q.gN()
n=o.$ti
p=n.h("d<b.E>")
b5=A.o(new A.d(o,n.h("e(b.E)").a(new A.dH(c4)),p),p.h("b.E"))
if(b5.length===0)d1=0
else{d1=d0.i(0,"countryIncome")
d1.toString
d1=B.b.k(d1)
p=d0.i(0,"poorPenalty")
p.toString
p=d1-B.b.k(p)
d1=p}p=A.h(b5)
b6=new A.dM(c4,b3,d1+new A.d(b5,p.h("e(1)").a(new A.dI(c4)),p.h("d<1>")).D(0,0,new A.dJ(c4),c9),b4,c4.gc4())
b7=A.lm([r],t.i)
b8=A.c([],t.n)
b9=q.e
d1=r+1e-9
c0=b9
while(c0<=d1){b7.l(0,c0)
B.a.l(b8,c0)
q=d0.i(0,c5)
q.toString
c0+=q}for(d1=A.iA(b7,b7.r,b7.$ti.c),q=d1.$ti.c,c1=0;d1.j();){p=d1.d
if(p==null)p=q.a(p)
c2=B.a.D(s,0,new A.dK(p),c9)
if(p+1e-9<b9)c3=0
else{o=d0.i(0,c5)
o.toString
c3=1+B.b.Z((p-b9)/o)}if(B.a.H(b8,new A.dL(p))){p=b6.$1(Math.max(0,c3-1))
if(typeof p!=="number")return A.jw(p)
c1=Math.max(c1,c2+p)}p=b6.$1(c3)
if(typeof p!=="number")return A.jw(p)
c1=Math.max(c1,c2+p)}c9=Math.max(0,c1)
if(d2)d0=s.length===0?0:1
else{d0=d0.i(0,"emergencyGold")
d0.toString
d0=B.b.k(d0)}return new A.en(c9+d0)},
U(){return this.ad(!1)},
aH(a,b){var s,r,q,p,o,n,m,l,k,j=this,i="capacityPerLevel"
if(b.fr){s=b.a
s=j.z.q(0,s)||j.Q.q(0,s)}else s=!0
if(s)return!1
s=j.x
r=a.a
q=s.i(0,r)
q.toString
p=j.b
o=p.c
n=o.length
if(q>n)m=null
else{l=q-1
if(!(l>=0))return A.n(o,l)
m=B.c.A(o[l]-b.x,0,99999)}if(q>=p.al(j.a.c)||m==null||j.d<m)return!1
if(a.b===a.c)k=1
else{o=p.b.i(0,"foreignYield")
o.toString
k=o}o=j.f
n=q+1
p=p.b
l=p.i(0,i)
l.toString
l=B.b.Z(n*B.b.k(l)*k)
p=p.i(0,i)
p.toString
j.f=o+(l-B.b.Z(q*B.b.k(p)*k))
j.d=j.d-m
s.u(0,r,n)
return!0},
gc4(){return this.a.gN().D(0,0,new A.dW(this),t.S)},
bX(a){var s,r,q,p,o,n=this
if(!a.dy||a.e===2||n.z.q(0,a.a))return!1
s=a.a
n.z.l(0,s)
n.y.aj(0,s)
n.as.l(0,s)
n.d=n.d+a.x
s=n.f
r=n.e
q=a.as
p=q!==B.f
n.e=Math.min(s,r+(!p||q===B.e?a.gP():0))
if(!p||q===B.e)for(s=a.ax,r=s.length,q=n.w,o=0;o<r;++o)q.aG(s[o],new A.dT(),new A.dU())
return!0},
aB(a){var s,r=this,q=r.b.b.i(0,"soldierCost")
q.toString
s=a*B.b.k(q)
if(a<0||r.e+a>r.f||r.d<s)return!1
r.d-=s
r.e+=a
return!0},
bS(a){var s=this,r=s.b.f.i(0,a)
if(r==null||!r.f||s.a.c<r.e||s.d<r.b)return!1
s.d=s.d-r.b
s.w.aG(a,new A.dz(),new A.dA())
return!0},
bj(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=g.b,e=f.b,d=e.i(0,"drawCost")
d.toString
s=g.a
r=s.y
q=B.b.k(d)+r
d=s.r
p=A.h(d)
o=t.S
n=new A.d(d,p.h("e(1)").a(new A.dX(g)),p.h("d<1>")).D(0,g.r+r,new A.dY(),o)
p=e.i(0,"countryIncome")
p.toString
p=B.b.k(p)
d=s.gN()
m=d.$ti
l=p+new A.d(d,m.h("e(b.E)").a(new A.dZ(g)),m.h("d<b.E>")).D(0,0,new A.e_(g),o)
o=e.i(0,"garrisonFree")
k=B.b.k(o==null?2:o)
e=e.i(0,"garrisonFactor")
j=B.b.k(e==null?0:e)
e=a.a
i=g.L(e)
d=g.gc4()
p=A.jd(i+1,j,k)
o=A.jd(i,j,k)
m=!0
if(a.Q){h=g.at
if(!h.q(0,e))if(s.x>h.a)if(g.d>=q){h=b?1.3:1.1
if(!(n+(d+p-o)>l*h)){if(b)f=1
else if(c==null)f=f.r.r
else{f=A.am(c,s,f,null)
d=f.e.r
if(f.gW()){s=d.r
f=Math.max(s,Math.min(d.as,s+f.gaD()*0.2))}else f=d.r}f=n>l*f}else f=m}else f=m
else f=m
else f=m}else f=m
if(f)return!1
g.d-=q
g.r+=r
g.at.l(0,e)
return!0},
di(a,b){return this.bj(a,!1,b)},
dh(a,b){return this.bj(a,b,null)},
d1(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(b)
if(a.db){s=a.a
s=l.as.q(0,s)||l.z.q(0,s)||l.d<=0}else s=!0
if(s)return!1
s=l.w
r=t.S
q=A.jR(s,r,r)
r=b.length
p=l.b.b
o=p.i(0,"carryLimit")
o.toString
if(r>B.b.k(o))return!1
for(r=b.length,n=0;n<b.length;b.length===r||(0,A.u)(b),++n){m=b[n]
o=q.i(0,m)
if((o==null?0:o)===0)return!1
o=q.i(0,m)
o.toString
q.u(0,m,o-1)}s.aC(0)
s.G(0,q)
s=l.e
r=p.i(0,"soldierLimit")
r.toString
l.e=s-Math.min(s,B.b.k(r)-a.gP())
r=a.a
l.Q.l(0,r)
l.as.l(0,r)
l.y.u(0,r,c)
p=p.i(0,"supplySeconds")
p.toString
B.a.l(l.ay,new A.aV(a.ch,1/p,d))
return!0},
dj(a,b){var s,r=this
if(!a.dx||r.as.q(0,a.a)||r.d<=0||a.fy)return!1
s=a.a
r.as.l(0,s)
r.y.u(0,s,b)
return!0}}
A.dx.prototype={
$1(a){return A.f(a)+1},
$S:6}
A.dy.prototype={
$0(){return 1},
$S:5}
A.dV.prototype={
$1(a){var s=this.a,r=t.r.a(a).a
return!s.z.q(0,r)&&!s.Q.q(0,r)},
$S:0}
A.dN.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.b!==this.a.a.a){r=a.as
if(!(r===B.f||r===B.e))if(!a.fy)if(a.f>0){s=this.b
s=a.p3===s.a||a.z.J(s.e)<96}}return s},
$S:0}
A.dO.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.dP.prototype={
$1(a){return t.q.a(a).b!==this.a.a.a},
$S:1}
A.dQ.prototype={
$2(a,b){return Math.min(A.aj(a),t.q.a(b).e.J(this.a.e))},
$S:12}
A.dR.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:1}
A.dS.prototype={
$2(a,b){return Math.min(A.aj(a),t.q.a(b).e.J(this.a.e))},
$S:12}
A.dB.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
if(a.b===s.a.a){r=a.as
s=!(r===B.f||r===B.e)&&!a.fy&&!s.z.q(0,a.a)}else s=!1
return s},
$S:0}
A.dC.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=!1
if(a.a!==s.a)if(a.b===s.b){q=this.b
if(a.cx===q.a){r=q.e
r=a.z.J(r)<s.z.J(r)
s=r}else s=r}else s=r
else s=r
return s},
$S:0}
A.dD.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.q(0,a.a)},
$S:0}
A.dE.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:13}
A.dF.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=s.a
return a.b===r.a&&a.f>0&&!s.z.q(0,a.a)&&a.p4===r.d},
$S:0}
A.dG.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:13}
A.dH.prototype={
$1(a){return!this.a.ax.q(0,t.q.a(a).a)},
$S:1}
A.dI.prototype={
$1(a){return!this.a.ax.q(0,t.q.a(a).a)},
$S:1}
A.dJ.prototype={
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
s.toString}return a+B.b.Z((b.z+(r-1)*q)*s)},
$S:7}
A.dM.prototype={
$1(a){var s,r,q,p=this
if(a===0)s=0
else{s=p.a
r=s.a
q=r.gar()
s=s.b.b.i(0,"monthSeconds")
s.toString
s=a*(p.b-p.c)-p.d+B.b.ah(q.r+p.e*(r.e/s+a-1))}return s},
$S:6}
A.dK.prototype={
$2(a,b){A.f(a)
t.gf.a(b)
return a+B.b.Z(b.a+b.b*Math.min(this.a,b.c)+1e-9)},
$S:48}
A.dL.prototype={
$1(a){return Math.abs(A.aj(a)-this.a)<1e-7},
$S:14}
A.dW.prototype={
$2(a,b){var s,r,q
A.f(a)
s=this.a
r=s.L(t.q.a(b).a)
s=s.b.b
q=s.i(0,"garrisonFree")
q=B.b.k(q==null?2:q)
s=s.i(0,"garrisonFactor")
return a+A.jd(r,B.b.k(s==null?0:s),q)},
$S:7}
A.dT.prototype={
$1(a){return A.f(a)+1},
$S:6}
A.dU.prototype={
$0(){return 1},
$S:5}
A.dz.prototype={
$1(a){return A.f(a)+1},
$S:6}
A.dA.prototype={
$0(){return 1},
$S:5}
A.dX.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.q(0,a.a)},
$S:0}
A.dY.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:13}
A.dZ.prototype={
$1(a){return!this.a.ax.q(0,t.q.a(a).a)},
$S:1}
A.e_.prototype={
$2(a,b){var s,r
A.f(a)
t.q.a(b)
s=this.a
r=s.x.i(0,b.a)
if(r==null)r=b.d
s=s.b.b.i(0,"incomeStep")
s.toString
return a+b.z+(r-1)*B.b.k(s)},
$S:7}
A.ep.prototype={
gW(){var s=this
return s.a!==s.d.a&&s.b>=s.e.r.w},
gb3(){return Math.max(0,this.b-this.e.r.w)},
gaD(){if(this.gW()){var s=this.e.r
s=Math.max(0,s.x+this.gb3()*s.y)}else s=0
return s},
bl(a,b){return a===0||!this.gW()||b<=1?a:Math.min(this.e.r.fy,a+1+B.c.b9(this.gb3(),2))}}
A.eq.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.er.prototype={
$2(a,b){var s,r
A.f(a)
t.q.a(b)
s=this.a
s=s==null?null:s.i(0,b.a)
if(s==null)s=b.d
r=this.b.b.i(0,"incomeStep")
r.toString
return a+b.z+(s-1)*B.b.k(r)},
$S:7}
A.b2.prototype={
aL(){return"CombatAdvantage."+this.b}}
A.bI.prototype={}
A.es.prototype={
am(b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6=this,b7="soldierHp"
t.eg.a(c4)
s=c4==null?b8.ax:c4
r=b9.ax
q=c7==null
p=q?b8.gP():c7
o=c3==null
n=o?b9.gP():c3
m=b8.f
l=b8.at
k=b9.f
j=b9.at
i=b8.a+":"+A.v(m)+":"+b8.w+":"+A.v(l)+":"+A.v(b8.ay)+":"+b9.a+":"+A.v(k)+":"+b9.w+":"+A.v(j)+":"+A.v(b9.ay)+":"+c5+":"+c0+":"+c8+":"+p+":"+n+":"+A.v(s)+":"+A.v(r)+":"+c2+":"+c6+":"+c1
h=b6.c
g=h.i(0,i)
if(g!=null)return g
if(!b6.b.cR())return B.a2
if(q)q=B.a.D(l,0,new A.et(),t.H)
else{q=b6.a.b.i(0,b7)
q.toString
q=p*B.b.k(q)}f=m+q
q=b6.a
l=q.b
e=l.i(0,b7)
e.toString
d=B.b.k(e)
c=Math.min(n,B.b.Z(c2/d))
b=c*d+Math.max(0,c2-n*d)
if(o&&c2===0)o=B.a.D(j,0,new A.eu(),t.H)
else{o=l.i(0,b7)
o.toString
o=n*B.b.k(o)}a=k+o
o=c5===0
a0=b6.bO(s,o&&m>0,c6)
a1=c0===0
a2=b6.bO(r,a1&&k>0,c1)
a1=o&&a1
a3=b6.bC(b8,p,c5,c8,a1)
a4=b6.bC(b9,n-c,c0,c8,a1)
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
b3=q.r.RG
if(a5)b4=B.K
else if(b1>b3)b4=B.h
else{q=b2<-b3?B.p:B.a1
b4=q}q=A.c([],t.s)
if(c5>0||c0>0)q.push("\u57ce\u9632\u4ec5\u4fee\u6b63\u653b\u51fb\uff0c\u5b88\u65b9\u6b66\u5668\u8d21\u732e\u4e3a\u96f6")
if(s.length>1)q.push("\u672c\u6b21\u5bf9\u9635\u53ea\u8ba1\u9996\u4ef6\u6b66\u5668\uff0c\u5176\u4f59\u7559\u5f85\u4e0b\u4e00\u4f4d\u5b88\u5c06")
if(a5)q.push("\u5b58\u5728\u5148\u624b\u81f4\u547d\u6216\u81ea\u4f24\u98ce\u9669")
q.push("\u4f59\u91cf\u4e3a\u9759\u6001\u98ce\u9669\u6307\u6807\uff0c\u5e76\u975e\u80dc\u7387")
b5=new A.bI(b4,b1,b2,j,k,a5)
if(h.a>=256)h.aj(0,new A.a6(h,A.l(h).h("a6<1>")).gF(0))
h.u(0,i,b5)
return b5},
cW(a,b,c,d,e,f){return this.am(a,b,c,!0,0,d,e,0,!0,f,0)},
cY(a,b,c,d,e,f,g,h){return this.am(a,b,c,d,0,e,f,0,g,h,0)},
bU(a,b,c,d){return this.am(a,b,0,!0,0,null,null,c,!0,d,0)},
bd(a,b,c,d,e,f){return this.am(a,b,0,c,0,null,null,d,e,f,0)},
cU(a,b,c,d,e){return this.am(a,b,0,c,0,null,null,0,d,null,e)},
cX(a,b,c,d,e,f,g){return this.am(a,b,0,c,0,null,d,0,e,f,g)},
cV(a,b,c,d,e){return this.am(a,b,0,!0,c,null,null,d,!0,e,0)},
bC(a,b,c,d,e){var s=this.a,r=s.bc(a.w,c,e,d)
s=s.b.i(0,"soldierPower")
s.toString
return(B.c.b9(r+b*B.b.k(s)+2,4)+1)*1.5*(1+B.b.A(a.ay/1000,0,0.1))},
bO(a,b,c){var s,r,q,p,o,n,m,l,k
t.L.a(a)
if(!b)return new A.bz([0,0,0,0])
for(s=this.a,r=s.f,s=s.b,q=0,p=0,o=0,n=0,m=0;l=a.length,m<Math.min(l,1);++m){if(!(m<l))return A.n(a,m)
k=r.i(0,a[m])
if(k==null)continue
l=m===0
if(l&&c){q+=k.c
o+=k.d}if(!(l&&c)){l=s.i(0,"weaponChance")
l.toString
l=l>0}else l=!0
if(l){p+=k.c
n+=k.d}}return new A.bz([p,q,n,o])}}
A.et.prototype={
$2(a,b){return A.w(a)+A.aj(b)},
$S:11}
A.eu.prototype={
$2(a,b){return A.w(a)+A.aj(b)},
$S:11}
A.iT.prototype={
$2(a,b){var s
A.w(a)
s=this.a.f.i(0,A.f(b))
s=s==null?null:s.c
if(s==null)s=0
return a+s*this.b.w},
$S:41}
A.cD.prototype={
I(){var s=this
return A.Q(["interval",s.a,"resourceInterval",s.e,"cashBuffer",s.f,"payrollRatio",s.r,"dangerousCountryCities",s.w,"coalitionBudgetBase",s.x,"coalitionBudgetStep",s.y,"coalitionTargetBase",s.z,"coalitionTargetStep",s.Q,"coalitionPayrollCeiling",s.as,"coalitionTravel",s.at,"targetTravelScale",s.ax,"hatredTargetBonus",s.ay,"breakthroughMargin",s.ch,"threat",s.b,"urgent",s.c,"margin",s.d,"commit",s.CW,"rearExtra",s.cy,"candidates",s.db,"assessments",s.dx,"routes",s.dy,"plans",s.fr,"commands",s.fx,"team",s.fy,"fronts",s.k1,"singleFrontMonths",s.k2,"splitForce",s.k3,"splitAdvantage",s.k4,"arrivalSpread",s.ok,"expeditionSeconds",s.p1,"assaultCommitDistance",s.p2,"recallCriticalMargin",s.p3,"attritionCombat",s.p4,"attritionGain",s.R8,"targets",s.go,"slice",s.id,"advantage",s.RG,"expansion",s.ry,"credit",s.rx,"age",s.cx,"timeout",s.to,"restarts",s.x1,"stagnation",s.x2],t.N,t.X)}}
A.av.prototype={}
A.ew.prototype={
bq(){return new A.aw(this.ck(),t.gL)},
ck(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9
return function $async$bq(j0,j1,j2){if(j1===1){p.push(j2)
r=q}for(;;)switch(r){case 0:i7={}
i8=s.c
i9=s.a
if(i8.b!==i9.a||i8.c!==s.b.a)throw A.j(B.a7)
o=i8.Q
n=o.f
if(n.length>64||o.r.length>256||o.w.length>32)throw A.j(B.a8)
m=s.e
m===$&&A.ae()
l=s.f
l===$&&A.ae()
k=new A.i4(o,i9,m,l)
j=o.gN(),i=J.H(j.a),j=new A.U(i,j.b,j.$ti.h("U<1>")),h=s.x
case 3:if(!j.j()){r=4
break}g=i.gn()
h.u(0,g.a,k.dk(g))
r=5
return j0.b=0,1
case 5:r=3
break
case 4:j=i8.as
i=A.h(j)
g=i.h("d<1>")
j=A.o(new A.d(j,i.h("e(1)").a(new A.eM(s)),g),g.h("b.E"))
f=A.jG(o,i9,m,j)
i7.a=f
j=i8.x
r=j===B.F?6:7
break
case 6:o=s.r
o===$&&A.ae()
s.w=new A.hD(i8,i9,o,l,h).de(f)
r=8
return j0.b=1,1
case 8:r=1
break
case 7:i=t.Z
e=A.c([],i)
g=t.s
d=A.c([],g)
c=s.d
b=s.r
b===$&&A.ae()
a=new A.f9(i8,i9,c,l,b,h)
a0=A.l(h).h("ai<2>")
a1=a0.h("d<b.E>")
a2=A.o(new A.d(new A.ai(h,a0),a0.h("e(b.E)").a(new A.eN()),a1),a1.h("b.E"))
B.a.C(a2,new A.eO())
a0=t.bQ
a3=A.c([new A.av(i7.a,A.c([],i),A.c([],g),0,0)],a0)
g=j===B.k
a1=g?A.c([],t.bL):a2
a4=a1.length
a5=t.N
a6=t.S
a7=i9.r
a8=a7.fx
a9=t.I
b0=t.dp
b1=t.aQ
b2=a7.fr
b3=0
case 9:if(!(b3<a1.length)){r=11
break}b4=a1[b3]
b5=A.c([],a0)
b6=a3.length,b7=0
case 12:if(!(b7<a3.length)){r=14
break}b8=a3[b7]
b9=a.bT(b4,b8.a),c0=b9.$ti,b9=new A.aN(b9.a(),c0.h("aN<1>")),c1=b8.d,c2=b8.e,c3=b8.c,c4=b8.b,c0=c0.c
case 15:if(!b9.j()){r=16
break}c5=b9.b
if(c5==null)c5=c0.a(c5)
c6=A.o(c4,a9)
B.a.G(c6,c5.b)
if(B.a.D(c6,0,new A.eZ(),a6)>a8){c.e=!0
r=15
break}c7=c5.a
c8=A.o(c3,a5)
c9=c5.e
if(c9.length!==0)c8.push(c9)
c9=c5.c
c5=c5.d?1:0
B.a.l(b5,new A.av(c7,c6,c8,c1+c9,c2+c5))
r=17
return j0.b=1,1
case 17:r=15
break
case 16:case 13:a3.length===b6||(0,A.u)(a3),++b7
r=12
break
case 14:if(b5.length!==0){B.a.C(b5,new A.f2())
b6=A.f(Math.min(4,b2))
b9=new A.y(b5,0,b6,b1)
b9.V(b5,0,b6,b0)
a3=b9.ab(0)}case 10:a1.length===a4||(0,A.u)(a1),++b3
r=9
break
case 11:if(a2.length!==0&&!g){d0=B.a.gF(a3)
i7.a=d0.a
B.a.G(e,d0.b)
B.a.G(d,d0.c)
a0=d0.e
if(a0>0){a0=""+a0
B.a.l(d,c.e?"\u89c4\u5212\u914d\u989d\u5df2\u7528\u5c3d\uff1a"+a0+" \u5ea7\u57ce\u5c1a\u672a\u627e\u5230\u5b8c\u6574\u65b9\u6848\uff0c\u4e0d\u80fd\u636e\u6b64\u65ad\u5b9a\u65e0\u6cd5\u633d\u6551":"unsalvageableDefense\uff1a"+a0+" \u5ea7\u57ce\u5728\u5f53\u524d\u9501\u5b9a\u3001\u8d44\u91d1\u6216\u65f6\u9650\u4e0b\u672a\u627e\u5230\u5b8c\u6574\u4fee\u590d\u65b9\u6848")}d1="defending"}else d1="preparing"
if(a2.length!==0)d1="defending"
r=18
return j0.b=2,1
case 18:for(a0=o.r,a1=A.h(a0),a4=a1.h("e(1)"),a9=a4.a(new A.f3(s)),a1=a1.h("d<1>"),b0=a1.h("e(b.E)").a(new A.f4(s)),a9=new A.d(a0,a9,a1).gB(0),b0=new A.U(a9,b0,a1.h("U<b.E>")),b1=t.w,b2=t.e,b6=t.Y,b9=i9.b;b0.j();){c0=a9.gn()
if(c0.e!==1||c0.f>=c0.r*0.25||c0.k2<2||c0.k3<=0||B.a.H(c0.ax,new A.f5(s)))continue
d2=o.a_(c0.k1)
if(d2!=null){c1=c0.gaP()
c2=c0.k3
c3=d2.gaP()
c4=Math.max(1,c0.k4)
c5=b9.i(0,"retreatSurvivalRatio")
c5.toString
c5=c1/c2>=c3/c4*c5
c1=c5}else c1=!0
if(c1)continue
c1=i7.a
c2=c0.a
if(c1.as.q(0,c2))continue
i7.a.as.l(0,c2)
c1=A.c([new A.z(B.P,c2,null,null,0,B.d)],b1)
c2=A.c([c0,d2],b2)
c0=o.K(c0.c)
c0.toString
B.a.l(e,new A.N("\u9ad8\u7ea7\u5c06\u9886\u751f\u547d\u4f4e\u4e8e\u56db\u5206\u4e4b\u4e00\uff0c\u5df2\u53d1\u751f\u7684\u4f24\u5bb3\u663e\u793a\u80dc\u671b\u6e3a\u832b\uff0c\u7533\u8bf7\u6709\u98ce\u9669\u7684\u5408\u6cd5\u64a4\u9000",c1,b.ag(c2,A.c([c0],b6)),B.r,0,!0))}r=19
return j0.b=3,1
case 19:a9=a1.h("b.E")
d3=A.o(new A.d(a0,a4.a(new A.f6(i7,s)),a1),a9)
b0=d3.length,c0=o.b,b3=0
case 20:if(!(b3<d3.length)){r=22
break}d4=d3[b3]
c1=d4.a
d5=i7.a.y.i(0,c1)
c2=i7.a
d6=c2.d<c2.U().a
c2=d5==null
if((c2?null:d5.as)===!0){c3=c2?null:d5.d
c3=d4.cx==c3&&!d6}else c3=!1
if(c3){r=21
break}if((c2?null:d5.b)==="intercept")if(o.a_(c2?null:d5.r)!=null){c3=h.i(0,c2?null:d5.d)
if(c3==null)c3=null
else c3=c3.d.length!==0||c3.a.at!=null
c3=c3!==!0
d7=c3}else d7=!0
else d7=!1
if(d7&&!d6&&d5.z>c0&&d4.f>=d4.r*0.65){r=21
break}d8=!c2&&d5.y<c0
d9=A.js(d4,o,i7.a)
c3=!1
if(A.mN(d4,o,i7.a,i9))if(i7.a.d>0)c3=d4.f>=d4.r*0.25||o.v(d9.a).length===0
if(c3){B.a.l(d,c1+"\u5df2\u4e34\u8fd1\u4e3b\u653b\u76ee\u6807\uff0c\u4fdd\u6301\u8fdb\u653b\uff0c\u4e0d\u56e0\u666e\u901a\u9884\u8b66\u6216\u6574\u5907\u9884\u7b97\u6298\u8fd4")
r=21
break}if((c2?null:d5.b)==="expedition"&&!d8&&!d6&&d4.f>=d4.r*0.65&&d5.x+1<d5.w.length){r=21
break}if(!d6&&!d7&&!d8&&d4.f>=d4.r*0.65&&d4.as!==B.n){r=21
break}e0=h.i(0,d4.c)
c1=o.gN()
c2=c1.$ti
c3=c2.h("d<b.E>")
e1=A.o(new A.d(c1,c2.h("e(b.E)").a(new A.f7(i7,s)),c3),c3.h("b.E"))
B.a.C(e1,new A.f8(d4))
c1=A.h(e1)
c2=c1.h("y<1>")
c3=new A.y(e1,0,3,c2)
c3.V(e1,0,3,c1.c)
c3=new A.r(c3,c3.gm(0),c2.h("r<k.E>"))
c1=e0==null
c4=d4.f<d4.r*0.65
c2=c2.h("k.E")
while(c3.j()){c5=c3.d
if(c5==null)c5=c2.a(c5)
if(!c.a2())break
e2=m.ao(d4,c5.e,o,!0,c5)
c6=i7.a
c7=h.i(0,c5.a)
if(c7==null)c7=null
else c7=c7.d.length!==0||c7.a.at!=null
if(d6)c8="\u73b0\u6709\u56fd\u5e93\u4e0d\u8db3\u4ee5\u7ee7\u7eed\u4f9b\u517b\u8fdc\u7a0b\u4efb\u52a1\uff0c\u56de\u57ce\u7f29\u51cf\u7cae\u8349\u652f\u51fa"
else if(c4)c8="\u5c06\u9886\u53d7\u4f24\uff0c\u56de\u57ce\u6062\u590d\u751f\u547d\u540e\u518d\u6218"
else if(d8)c8="\u539f\u4efb\u52a1\u5df2\u8d85\u8fc7\u6267\u884c\u65f6\u9650\uff0c\u56de\u57ce\u91cd\u65b0\u6574\u5907"
else c8=d7?"\u622a\u51fb\u76ee\u6807\u5df2\u6d88\u5931\uff0c\u56de\u57ce\u7ed3\u675f\u672c\u6b21\u4efb\u52a1":"\u91ce\u5916\u6307\u4ee4\u5df2\u5b8c\u6210\uff0c\u56de\u57ce\u7b49\u5f85\u65b0\u4efb\u52a1"
if(c1)c9=null
else c9=e0.d.length!==0||e0.a.at!=null
c9=c9===!0?e0.gae():1/0
e3=b.ce(c6,d4,e2,!0,c9,!0,c7!==!0,c8,"regroup",c5)
if(e3!=null){i7.a=e3.a
B.a.l(e,e3.b)
break}}r=23
return j0.b=4,1
case 23:case 21:d3.length===b0||(0,A.u)(d3),++b3
r=20
break
case 22:e4=A.o(new A.d(a0,a4.a(new A.eP(i7,s)),a1),a9)
B.a.C(e4,new A.eQ(s))
a0=i8.y
a1=i8.z
e5=A.c9(o,i7.a,i9,a1,a0)
a4=A.Y(a6,a6)
for(a9=e5.f,b0=new A.b6(a9,a9.r,a9.e,A.l(a9).h("b6<1>"));b0.j();){c0=b0.d
c1=a9.i(0,c0)
c1=c1==null?null:c1.length
a4.u(0,c0,c1==null?0:c1)}e6=e5.ga0()
if(e6==null)e6=e5.gc5()
if(e5.ga0()!=null&&a2.length===0)d1="attacking"
if(B.a.gF(a3).e===0)e7=!g||B.a.be(a2,new A.eR())
else e7=!1
g=e4.length,a9=i8.w>a7.x2/a7.a,b0=a7.k4,i8=i8.f,c0=a7.rx,c1=a7.fy,a7=a7.go,c2=A.h(n),c3=c2.h("e(1)"),c2=c2.h("d<1>"),c4=c2.h("b.E"),e8=0,e9=1,f0=!1,b3=0
case 24:if(!(b3<e4.length)){r=26
break}d4=e4[b3]
f1={}
if(e7){c5=d4.a
c5=i7.a.as.q(0,c5)||i7.a.z.q(0,c5)}else c5=!0
if(c5){r=25
break}f2=o.K(d4.c)
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
c8=i7.a
if(c7===!0){c7=c8.af(f2)
c8=i7.a
c9=f2.at
if(c9==null){c8=c8.x.i(0,c5)
if(c8==null)c8=f2.d}else{c8=f2.ax
f3=f2.cy?1:0
f3=B.c.A(c9-c8-f3,0,5)
c8=f3}f4=Math.min(c7,c8)}else f4=c8.af(f2)
if(i7.a.v(c5).length<=f4){r=25
break}if(c6)c5=null
else c5=b4.d.length!==0||b4.a.at!=null
if(c5===!0&&!s.bF(f2,d4,i7.a)){r=25
break}f5=A.c9(o,i7.a,i9,a1,a0)
f6=A.o(new A.d(n,c3.a(new A.eS(s,f5,d4,a4)),c2),c4)
B.a.C(f6,new A.eT(s,f5,d4))
f1.a=null
c5=A.h(f6)
c6=c5.h("y<1>")
c7=new A.y(f6,0,a7,c6)
c7.V(f6,0,a7,c5.c)
c7=new A.r(c7,c7.gm(0),c6.h("r<k.E>"))
c6=c6.h("k.E")
f7=null
f8=-1/0
case 27:if(!c7.j()){r=28
break}c5=c7.d
f9=c5==null?c6.a(c5):c5
if(!c.a2()){r=28
break}g0=f9.a
c5=o.v(g0)
c8=A.h(c5).h("L<1>")
c5=new A.L(c5,c8)
c9=f9.at
if(c9==null)c9=f9.d
else{f3=f9.ax
g1=f9.cy?1:0
g1=B.c.A(c9-f3-g1,0,5)
c9=g1}f3=new A.y(c5,0,c9,c8.h("y<k.E>"))
f3.V(c5,0,c9,c8.h("k.E"))
g2=f3.ab(0)
e2=m.aS(d4,f9.e,o,f9)
if(!e2.d){r=27
break}g3=b.c6(d4,i7.a,f9,l)
for(c5=g3.length,g4=!1,b7=0;b7<g3.length;g3.length===c5||(0,A.u)(g3),++b7){g5=g3[b7]
c8=A.cy(d4,f9,o,i9,l,g5,a9&&i7.a.d>100?0.05:0).a
g6=c8[1]
g7=c8[2]
g4=g7>0
if(!g4)continue
if(f5.ga0()!=null&&g0!==f5.ga0())c9=g7!==1||g6<b0
else c9=!1
if(c9)continue
g8=a4.i(0,g0)
if(g8==null)g8=0
g9=g7-g8
if(g9<=0)continue
e9=Math.max(e9,g7)
e3=s.bD(i7.a,d4,f9,g5,g9,g8,c8[0])
if(e3==null){h0=i7.a.M()
h0.d=1e6
h1=s.bD(h0,d4,f9,g5,g9,g8,c8[0])
if(h1!=null){if(a2.length===0)d1="saving"
c8=h0.d
c9=h1.a
h2=c8-c9.d+c9.U().a
e8=e8===0?h2:Math.min(e8,h2)
if(e6==null)e6=g0}else if(a2.length===0)d1="preparing"
continue}c5=e2.b
c8=A.bk(f9,d4,o,i9,i8,c5)
c9=i7.a.d
f3=e3.a.d
g1=J.j6(g5,1).D(0,0,new A.eU(s),a6)
h3=b9.i(0,"weaponChance")
h3.toString
h4=c8-c5*0.4-(c9-f3)*0.5+g6*30+g1*c0*h3*0.02
if(h4>f8){f1.a=e3
e9=e3.b.d.length
f8=h4
f7=f9}break}if(!g4&&e6==null){e9=Math.max(1,Math.min(c1,g2.length))
e6=g0}r=29
return j0.b=5,1
case 29:r=27
break
case 28:c5=f1.a
if(c5!=null){c5=B.a.D(e,0,new A.eV(),a6)
c6=f1.a
c5=c5+c6.b.b.length<=a8}else{c6=c5
c5=!1}if(c5){i7.a=c6.a
B.a.l(e,c6.b)
e6=f7.a
a4.aG(e6,new A.eW(f1),new A.eX(f1))
f0=!0}r=30
return j0.b=6,1
case 30:case 25:e4.length===g||(0,A.u)(e4),++b3
r=24
break
case 26:i8=!f0
if(i8&&e7&&j!==B.x){h5=s.cM(i7.a,e5)
if(h5!=null){i7.a=h5.a
B.a.l(e,h5.b)
d1="preparing"}}r=j===B.E&&i8&&B.a.D(e,0,new A.eY(),a6)<a8-3?31:32
break
case 31:i8=o.gN(),m=J.H(i8.a),i8=new A.U(m,i8.b,i8.$ti.h("U<1>"))
case 33:if(!i8.j()){r=34
break}l=m.gn()
j=l.a
g=h.i(0,j)
if(g==null)g=null
else g=g.d.length!==0||g.a.at!=null
if(g===!0){r=33
break}if(!c.a2()){r=34
break}h6=i7.a.v(j)
b5=i7.a.M()
g=A.h(h6)
a0=g.h("d<1>")
h7=A.o(new A.d(h6,g.h("e(1)").a(new A.f_(i7)),a0),a0.h("b.E"))
B.a.C(h7,new A.f0())
h8=B.a.H(n,new A.f1(s))&&h6.length<i7.a.af(l)+e9
if(h7.length!==0){g=h6.length
a0=i7.a
a1=l.at
if(a1==null){a0=a0.x.i(0,j)
if(a0==null)a0=l.d}else{a0=l.ax
a4=l.cy?1:0
a4=B.c.A(a1-a0-a4,0,5)
a0=a4}if(g<a0)g=h8&&h6.length>=l.y
else g=!0}else g=!1
if(g)if(b5.aH(l,B.a.gF(h7))&&b5.d>=b5.U().a){i7.a=b5
B.a.l(e,new A.N("\u5148\u6269\u5145\u5b89\u5168\u8fce\u6218\u540d\u989d\u548c\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u8003\u8651\u62db\u5c06\u4e0e\u8fdc\u5f81",A.c([new A.z(B.l,B.a.gF(h7).a,j,null,0,B.d)],b1),b.ag(A.c([B.a.gF(h7)],b2),A.c([l],b6)),B.r,b5.U().a,!1))
r=34
break}if(h8){g=o.K(e6)
g=b5.di(l,g==null?null:g.b)&&b5.d>=b5.U().a}else g=!1
if(g){i7.a=b5
B.a.l(e,new A.N("\u4e3a\u7559\u5b88\u4e0e\u8fdc\u5f81\u7684\u771f\u5b9e\u7f3a\u53e3\u62bd\u53d6\u82f1\u96c4\uff0c\u9884\u7559\u6700\u9ad8\u624b\u7eed\u8d39\u548c\u6708\u4ff8",A.c([new A.z(B.v,null,j,null,0,B.d)],b1),b.ag(A.c([],b2),A.c([l],b6)),B.r,b5.U().a,!1))
r=34
break}g=i7.a.f
a0=h6.length
a1=b9.i(0,"soldierLimit")
a1.toString
a1=Math.min(g,a0*B.b.k(a1))
a0=i7.a
h9=a1-a0.e
if(h9>0){i0=a0.M()
g=b9.i(0,"soldierBatch")
g.toString
i1=Math.min(B.b.k(g),h9)
if(i0.aB(i1)&&i0.d>=i0.U().a){i7.a=i0
B.a.l(e,new A.N("\u8865\u5145\u8fd1\u671f\u5b88\u57ce\u548c\u51fa\u5f81\u6240\u9700\u5175\u5458\uff0c\u4e0d\u586b\u6ee1\u6ca1\u6709\u4efb\u52a1\u7684\u5168\u56fd\u5bb9\u91cf",A.c([new A.z(B.m,null,j,null,i1,B.d)],b1),b.ag(A.c([],b2),A.c([l],b6)),B.r,i0.U().a,!1))
r=34
break}}r=35
return j0.b=7,1
case 35:r=33
break
case 34:case 32:if(f0)d1=a2.length===0?"attacking":"defending"
i2=o.K(e6)
if(i2!=null){i3=A.am(i2.b,o,i9,null)
if(i3.gW())B.a.l(d,"\u76ee\u6807\u56fd\u5360\u6709 "+i3.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.ah(i3.c*i3.gaD())+" \u91d1\u5e01\uff0c\u51c6\u5907\u5f3a\u5316\u6b66\u5668\u548c\u8f6e\u653b\u5175\u529b")}if(e.length===0){i8=i7.a
B.a.l(d,i8.d<i8.U().a?"\u8d44\u91d1\u4e0d\u8db3\u4ee5\u8986\u76d6\u73b0\u6709\u90e8\u961f\u548c\u6b20\u6536\u6708\u4ff8\uff0c\u7b49\u5f85\u6574\u5907":"\u6ca1\u6709\u6ee1\u8db3\u5b88\u57ce\u3001\u65f6\u9650\u53ca\u9759\u6001\u98ce\u9669\u7ea6\u675f\u7684\u65b0\u589e\u884c\u52a8\uff0c\u4fdd\u6301\u5df2\u6709\u4efb\u52a1")}if(a9)B.a.l(d,"\u505c\u6ede\u8bca\u65ad\uff1a"+(d1==="saving"?"\u7f3a\u5c11\u6574\u961f\u540e\u52e4\u8d44\u91d1":"\u7f3a\u5c11\u53ef\u5b89\u5168\u6267\u884c\u7684\u6269\u5f20\u6761\u4ef6")+"\uff0c\u4e0d\u901a\u8fc7\u65e0\u9650\u62db\u52df\u6216\u81ea\u6740\u51fa\u51fb\u6253\u7834\u7b49\u5f85")
i4=A.c([],i)
for(i8=e.length,i5=0,b3=0;b3<e.length;e.length===i8||(0,A.u)(e),++b3){i6=e[b3]
i5+=i6.b.length
if(i5>a8){c.e=!0
B.a.l(d,"\u547d\u4ee4\u914d\u989d\u5230\u8fbe\uff0c\u53ea\u63d0\u4ea4\u524d\u9762\u5b8c\u6574\u7684\u52a8\u4f5c\u7ec4\uff0c\u540e\u7eed\u7559\u5f85\u4e0b\u4e00\u6b21\u89c4\u5212")
break}B.a.l(i4,i6)}s.w=new A.bM(d1,e6,e8,e9,i4,A.Z(d,0,A.W(12,"count",a6),a5).ab(0),c.e,c.c,c.d,c.b)
case 1:return 0
case 2:return j0.c=p.at(-1),3}}}},
cM(a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=this,a2=a1.c.Q,a3=a2.gN(),a4=a3.$ti,a5=a4.h("d<b.E>"),a6=A.o(new A.d(a3,a4.h("e(b.E)").a(new A.eF(a1)),a5),a5.h("b.E"))
if(a6.length<2)return null
a3=a2.f
a4=A.h(a3)
a5=a4.h("d<1>")
s=A.o(new A.d(a3,a4.h("e(1)").a(new A.eG(a1,a8)),a5),a5.h("b.E"))
a3=t.S
a4=t.i
r=A.Y(a3,a4)
for(a5=a6.length,q=A.h(s),p=q.c,q=q.h("y<1>"),o=a1.a.r,n=o.go,m=0;m<a6.length;a6.length===a5||(0,A.u)(a6),++m){l=a6[m]
B.a.C(s,new A.eH(l))
k=new A.y(s,0,n,q)
k.V(s,0,n,p)
r.u(0,l.a,k.D(0,1/0,new A.eI(a1,l),a4))}B.a.C(a6,new A.eJ(r))
for(a4=A.h(a6),a3=A.Z(a6,0,A.W(2,"count",a3),a4.c),a5=a3.$ti,a3=new A.r(a3,a3.gm(0),a5.h("r<k.E>")),a4=a4.h("L<1>"),q=a4.h("r<k.E>"),p=a1.d,n=a4.h("k.E"),o=o.at,a5=a5.h("k.E");a3.j();){k=a3.d
if(k==null)k=a5.a(k)
j=k.a
i=r.i(0,j)
i.toString
if(i>o)continue
for(i=new A.L(a6,a4),i=new A.r(i,i.gm(0),q),h=k.e;i.j();){g=i.d
if(g==null)g=n.a(g)
f=g.a
e=r.i(0,f)
e.toString
d=r.i(0,j)
d.toString
if(e<d+10)continue
c=a7.v(f)
if(c.length<=a7.af(g))continue
g=A.h(c)
f=g.h("d<1>")
b=A.o(new A.d(c,g.h("e(1)").a(new A.eK(a7)),f),f.h("b.E"))
B.a.C(b,new A.eL())
g=A.h(b)
f=g.h("y<1>")
e=new A.y(b,0,2,f)
e.V(b,0,2,g.c)
e=new A.r(e,e.gm(0),f.h("r<k.E>"))
f=f.h("k.E")
while(e.j()){g=e.d
if(g==null)g=f.a(g)
if(!p.a2())return null
d=a1.e
d===$&&A.ae()
a=d.ao(g,h,a2,!0,k)
d=a1.r
d===$&&A.ae()
a0=d.cg(a7,g,a,!0,!0,"\u5c06\u540e\u65b9\u95f2\u7f6e\u4e3b\u529b\u524d\u79fb\u5230\u5b89\u5168\u524d\u6cbf\u636e\u70b9\uff0c\u7f29\u77ed\u540e\u7eed\u5f81\u670d\u7684\u884c\u519b\u4e0e\u7cae\u8349\u6210\u672c","transfer",k)
if(a0!=null)return a0}}}return null},
bF(a,b,c){var s,r,q=a.a,p=this.x.i(0,q),o=p==null?null:p.d
if(o==null)o=A.c([],t.k)
if(o.length===0)return!0
q=c.v(q)
p=A.h(q)
s=p.h("d<1>")
q=A.o(new A.d(q,p.h("e(1)").a(new A.eD(b)),s),s.h("b.E"))
p=A.h(q).h("L<1>")
r=A.Z(new A.L(q,p),0,A.W(c.O(a),"count",t.S),p.h("k.E")).ab(0)
if(r.length===0)return!1
return B.a.be(o,new A.eE(this,r,c,a))},
bD(c9,d0,d1,d2,d3,d4,d5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6=this,c7=null,c8="soldierLimit"
t.L.a(d2)
s=t.e
r=A.c([],s)
for(q=c6.c.Q,p=q.gN(),o=J.H(p.a),p=new A.U(o,p.b,p.$ti.h("U<1>")),n=c6.x,m=d0.c;p.j();){l=o.gn()
k=l.a
j=n.i(0,k)
if(j==null)j=c7
else j=j.d.length!==0||j.a.at!=null
if(j===!0&&k!==m)continue
i=c9.af(l)
h=Math.max(0,c9.v(k).length-i)
l=c9.v(k)
k=A.h(l)
j=k.h("d<1>")
g=A.o(new A.d(l,k.h("e(1)").a(new A.ey(c6,c9,d1)),j),j.h("b.E"))
B.a.C(g,new A.ez(c6))
l=A.h(g)
k=new A.y(g,0,h,l.h("y<1>"))
k.V(g,0,h,l.c)
B.a.G(r,k)}if(!B.a.q(r,d0))return c7
B.a.aj(r,d0)
B.a.C(r,new A.eA(c6))
p=c6.e
p===$&&A.ae()
o=d1.e
f=p.aS(d0,o,q,d1)
if(!f.d)return c7
e=A.c([d0],s)
s=t.N
d=A.Q([d0.a,f],s,t.bJ)
c=f.b
for(m=c6.a,l=m.r,k=t.S,j=A.Z(r,0,A.W(l.fy*2,"count",k),t.r),b=j.$ti,j=new A.r(j,j.gm(0),b.h("r<k.E>")),a=l.ok,b=b.h("k.E"),a0=c;j.j();){a1=j.d
if(a1==null)a1=b.a(a1)
if(e.length>=d3)break
a2=p.aS(a1,o,q,d1)
if(!a2.d)continue
a3=a2.b
a4=Math.min(c,a3)
a5=Math.max(a0,a3)
if(a5-a4>a)continue
B.a.l(e,a1)
d.u(0,a1.a,a2)
a0=a5
c=a4}if(e.length<d3)return c7
a6=A.c([],t.w)
a7=A.c([],t.m)
a8=A.Y(s,s)
s=q.v(d1.a)
p=A.h(s).h("L<1>")
a9=A.Z(new A.L(s,p),0,A.W(d1.ga5(),"count",k),p.h("k.E")).ab(0)
for(s=l.fx,p=m.b,o=d3===1,l=A.h(a9),k=l.c,l=l.h("y<1>"),j=d1.b,b=t.p,b0=c9,b1=0;b1<e.length;++b1){b2=e[b1]
a1=b2.c
a3=n.i(0,a1)
if(a3==null)a3=c7
else a3=a3.d.length!==0||a3.a.at!=null
if(a3===!0){a3=q.K(a1)
a3.toString
a3=!c6.bF(a3,b2,b0)}else a3=!1
if(a3)return c7
a3=d.i(0,b2.a)
a3.toString
if(b1!==0){b3=A.am(j,q,m,c7)
b3=b3.a!==b3.d.a&&b3.b>=b3.e.r.w}else b3=!0
if(b3)b3=A.c([d2],b)
else{b3=c6.r
b3===$&&A.ae()
b3=b3.c1(b2,b0)}b4=b3.length
b5=d4+b1
b6=b1>0
b7=c7
b8=0
for(;b8<b3.length;b3.length===b4||(0,A.u)(b3),++b8){b9=b3[b8]
if(b6){if(d5){c0=new A.y(a9,0,1,l)
c0.V(a9,0,1,k)}else c0=a9
c0=J.kR(c0,new A.eB(c6,b2,d1,b9))}else c0=!1
if(c0)continue
for(c0=q.gN(),c1=J.H(c0.a),c0=new A.U(c1,c0.b,c0.$ti.h("U<1>")),c2=0;c0.j();){c3=c1.gn()
c4=c3.a
c5=b0.v(c4).length
c3=Math.min(Math.max(0,c5-(c4===a1?1:0)),b0.af(c3))
c5=p.i(0,c8)
c5.toString
c2+=c3*B.b.k(c5)}c0=c6.r
c0===$&&A.ae()
c1=o?"\u56f4\u7ed5\u4e3b\u653b\u76ee\u6807\u6295\u5165\u8db3\u591f\u6218\u529b\uff0c\u4fdd\u7559\u5176\u4ed6\u65b9\u5411\u5175\u529b":"\u96c6\u4e2d\u4f18\u52bf\u7f16\u961f\u8f6e\u653b\u540c\u4e00\u5ea7\u57ce\uff0c\u62b5\u8fbe\u95f4\u9694\u4e0d\u8d85\u8fc7"+B.b.k(a)+"\u79d2"
c3=b0.f
c4=p.i(0,c8)
c4.toString
b7=c0.bm(b0,b2,a3,d5,b9,Math.min(c2,Math.max(0,c3-B.b.k(c4))),b5,c1,"expedition",d1)
if(b7!=null)break}if(b7==null)return c7
b0=b7.a
a1=b7.b
B.a.G(a6,a1.b)
B.a.G(a7,a1.d)
a8.G(0,a1.c)
if(a6.length>s){c6.d.e=!0
return c7}}s=c6.r
s===$&&A.ae()
a8.G(0,s.ag(a9,A.c([],t.Y)))
if(d5)s="\u96c6\u4e2d\u7f16\u961f\u5148\u7a81\u7834\u524d\u6392\u5b88\u5c06\uff0c\u518d\u7531\u540e\u7eed\u90e8\u961f\u8f6e\u653b\u6253\u5f00\u57ce\u9632\u7f3a\u53e3"
else s=o?"\u6267\u884c\u9759\u6001\u4f18\u52bf\u660e\u786e\u3001\u53ef\u4ee5\u4f9b\u517b\u7684\u6269\u5f20":"\u6574\u961f\u540e\u52e4\u51c6\u5907\u5b8c\u6210\uff0c\u6309\u771f\u5b9e\u6392\u961f\u89c4\u5219\u8f6e\u653b\uff1b\u4e0d\u9884\u6f14\u672a\u6765\u4f24\u4ea1"
return new A.d7(b0,new A.N(s,a6,a8,a7,b0.U().a,!1))},
cO(a,b,c){var s=this.c
return A.bk(a,b,s.Q,this.a,s.f,c)},
bJ(a,b){return this.cO(a,b,null)}}
A.eM.prototype={
$1(a){var s,r,q
t.J.a(a)
s=this.a.c.Q
r=s.a_(a.a)
q=!1
if(r!=null)if(r.b===s.a)if(!r.fy)if(r.f>0){s=r.as
s=!(s===B.f||s===B.e)&&r.id===a.at}else s=q
else s=q
else s=q
else s=q
return s},
$S:15}
A.eN.prototype={
$1(a){t.b.a(a)
return a.d.length!==0||a.a.at!=null},
$S:27}
A.eO.prototype={
$2(a,b){var s,r=t.b
r.a(a)
r.a(b)
s=B.b.t(a.gae(),b.gae())
return s!==0?s:B.b.t(b.r+b.a.r*4,a.r+a.a.r*4)},
$S:36}
A.eZ.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:16}
A.f2.prototype={
$2(a,b){var s,r=t.dp
r.a(a)
r.a(b)
r=a.e
s=b.e
return r!==s?B.c.t(r,s):B.b.t(b.d,a.d)},
$S:40}
A.f3.prototype={
$1(a){t.r.a(a)
return a.b===this.a.c.Q.a&&!a.fy&&a.fx},
$S:0}
A.f4.prototype={
$1(a){t.r.a(a)
return this.a.c.x!==B.k},
$S:0}
A.f5.prototype={
$1(a){var s=this.a.a.f.i(0,A.f(a))
return(s==null?null:s.d)===0},
$S:17}
A.f6.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.Q.a&&a.dx&&s.x!==B.k&&!a.fy&&!this.a.a.as.q(0,a.a)},
$S:0}
A.f7.prototype={
$1(a){var s,r,q,p,o,n,m=null
t.q.a(a)
s=this.a
r=a.a
q=s.a.L(r)
p=this.b
o=p.x
n=o.i(0,r)
if(n==null)n=m
else n=n.d.length!==0||n.a.at!=null
s=s.a
if(q<(n===!0?s.O(a):Math.max(s.O(a),a.y+p.a.r.cy))){s=o.i(0,r)
if(s==null)s=m
else s=s.d.length!==0||s.a.at!=null
if(s===!0){s=o.i(0,r)
if(s==null)s=m
else{s=s.f
s=s==null?m:s.a}s=s===B.h}else s=!0}else s=!1
return s},
$S:1}
A.f8.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(a.e.J(s),b.e.J(s))},
$S:4}
A.eP.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.Q.a&&a.db&&s.x!==B.x&&!a.fy&&!this.a.a.z.q(0,a.a)},
$S:0}
A.eQ.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ab(b,s.K(b.c).d<q.al(r)),A.ab(a,s.K(a.c).d<q.al(r)))},
$S:2}
A.eR.prototype={
$1(a){var s
t.b.a(a)
if(Math.max(0,a.b.length-a.a.ga5())===0){s=a.f
s=(s==null?null:s.a)===B.h}else s=!1
return s},
$S:27}
A.eS.prototype={
$1(a){var s,r,q,p=this
t.q.a(a)
s=p.a
r=!1
if(a.b!==s.c.Q.a)if(p.b.aA(a)){q=s.r
q===$&&A.ae()
if(q.aO(p.c,a)){r=p.d.i(0,a.a)
if(r==null)r=0
s=r<s.a.r.fy}else s=r}else s=r
else s=r
return s},
$S:1}
A.eT.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.b
if(a.a===r.ga0())r=-1
else if(b.a===r.ga0())r=1
else{r=this.a
s=this.c
s=B.b.t(r.bJ(b,s),r.bJ(a,s))
r=s}return r},
$S:4}
A.eU.prototype={
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
$S:18}
A.eV.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:16}
A.eW.prototype={
$1(a){return A.f(a)+this.a.a.b.d.length},
$S:6}
A.eX.prototype={
$0(){return this.a.a.b.d.length},
$S:5}
A.eY.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:16}
A.f_.prototype={
$1(a){t.r.a(a)
return a.fr&&!this.a.a.as.q(0,a.a)},
$S:0}
A.f0.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.f1.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.eF.prototype={
$1(a){var s=this.a.x.i(0,t.q.a(a).a)
if(s==null)s=null
else s=s.d.length!==0||s.a.at!=null
return s!==!0},
$S:1}
A.eG.prototype={
$1(a){t.q.a(a)
return a.b!==this.a.c.Q.a&&this.b.aA(a)},
$S:1}
A.eH.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.J(s),b.e.J(s))},
$S:4}
A.eI.prototype={
$2(a,b){var s,r
A.aj(a)
t.q.a(b)
s=this.a.e
s===$&&A.ae()
r=this.b.e
return Math.min(a,s.X(r,b.f.a4(r)))},
$S:12}
A.eJ.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.a
s=r.i(0,a.a)
s.toString
r=r.i(0,b.a)
r.toString
return B.b.t(s,r)},
$S:4}
A.eK.prototype={
$1(a){t.r.a(a)
return a.db&&a.e!==2&&!this.a.as.q(0,a.a)},
$S:0}
A.eL.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ab(s.a(b),!0),A.ab(a,!0))},
$S:2}
A.eD.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.eE.prototype={
$1(a){var s=this
return B.a.H(s.b,new A.eC(s.a,t.O.a(a),s.c,s.d))},
$S:10}
A.eC.prototype={
$1(a){var s,r,q,p,o,n=this,m="soldierLimit"
t.r.a(a)
s=n.a
r=s.f
r===$&&A.ae()
q=n.c
p=q.O(n.d)
s=s.a.b
o=s.i(0,m)
o.toString
o=B.b.k(o)
q=q.e
s=s.i(0,m)
s.toString
return r.bU(a,n.b.a,p,Math.min(o,Math.max(0,q-B.b.k(s)))).a===B.h},
$S:0}
A.ey.prototype={
$1(a){var s
t.r.a(a)
s=!1
if(a.db)if(!this.b.as.q(0,a.a)){s=this.a.r
s===$&&A.ae()
s=s.aO(a,this.c)}return s},
$S:0}
A.ez.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ab(b,s.K(b.c).d<q.al(r)),A.ab(a,s.K(a.c).d<q.al(r)))},
$S:2}
A.eA.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ab(b,s.K(b.c).d<q.al(r)),A.ab(a,s.K(a.c).d<q.al(r)))},
$S:2}
A.eB.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this,i="soldierLimit"
t.r.a(a)
s=j.a
r=s.f
r===$&&A.ae()
q=j.c
p=q.ga5()
o=s.a
n=o.b
m=n.i(0,i)
m.toString
m=B.b.k(m)
n=n.i(0,i)
n.toString
l=j.d
k=r.cW(j.b,a,p,Math.min(B.b.k(n),B.a.ap(s.c.Q.w,new A.ex(q)).c),l,m)
return J.j5(l)&&k.b<o.r.k4||k.r||k.c<=o.r.RG||k.b<-0.12},
$S:0}
A.ex.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:9}
A.a5.prototype={}
A.f9.prototype={
bT(a,b){return new A.aw(this.cT(a,b),t.dT)},
cT(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e
return function $async$bT(c,d,a0){if(d===1){n.push(a0)
p=o}for(;;)switch(p){case 0:i=s.a1(r,q)
h=r.a
g=h.a
f=q.L(g)<=q.O(h)
e=!1
if(f){m=r.d
if(m.length!==0)if(B.a.be(m,new A.fU(s,q))){e=q.y
e=!new A.ai(e,A.l(e).h("ai<2>")).H(0,new A.fV(r))}}p=e?3:4
break
case 3:p=5
return c.b=new A.a5(q,A.c([],t.Z),s.a6(r,q),!1,"\u5df2\u6709\u622a\u51fb\u90e8\u961f\u80fd\u53ca\u65f6\u63a5\u654c\uff0c\u7b49\u5f85\u6267\u884c\u7ed3\u679c\uff0c\u4e0d\u91cd\u590d\u6d3e\u51fa\u7b2c\u4e8c\u652f\u90e8\u961f","hold"),1
case 5:p=1
break
case 4:if(f)e=(i==null?null:i.a)===B.h
else e=!1
p=e?6:7
break
case 6:p=8
return c.b=new A.a5(q,A.c([],t.Z),s.a6(r,q),!1,"\u57ce\u9632\u4e0e\u73b0\u6709\u5b88\u5c06\u8db3\u4ee5\u5e94\u5bf9\u53ef\u89c1\u6765\u654c\uff0c\u7ef4\u6301\u8fdc\u5f81\uff0c\u4e0d\u53ec\u56de\u5c06\u9886","hold"),1
case 8:p=1
break
case 7:e=s.bt(r,q)
l=A.o(e,e.$ti.h("b.E"))
e=A.h(l)
m=e.h("d<1>")
k=A.o(new A.d(l,e.h("e(1)").a(new A.fW(s,r,i,q)),m),m.h("b.E"))
p=k.length!==0?9:10
break
case 9:p=11
return c.bP(k)
case 11:p=1
break
case 10:p=f&&q.L(g)<q.O(h)?12:13
break
case 12:j=q.M()
p=j.dh(h,!0)&&j.d>=j.ad(!0).a?14:15
break
case 14:p=16
return c.b=s.az(r,q,j,A.c([new A.z(B.v,null,g,null,0,B.d)],t.w),"\u672c\u5730\u4ecd\u6709\u8fce\u6218\u540d\u989d\uff0c\u5148\u62db\u52df\u8865\u5f3a\uff0c\u518d\u6309\u5b9e\u9645\u5230\u4efb\u5c5e\u6027\u590d\u6838\uff0c\u6682\u4e0d\u53ec\u56de\u8fdc\u5f81"),1
case 16:p=1
break
case 15:case 13:p=17
return c.bP(l)
case 17:case 1:return 0
case 2:return c.c=n.at(-1),3}}}},
bt(a,b){return new A.aw(this.cs(a,b),t.dT)},
cs(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e,d,c,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9,k0,k1,k2,k3,k4,k5,k6
return function $async$bt(k7,k8,k9){if(k8===1){n.push(k9)
p=o}for(;;)switch(p){case 0:k0=r.a
k1=k0.a
k2=q.L(k1)>q.O(k0)
k3=t.Z
k4=A.c([],k3)
k5=s.a6(r,q)
k6=!k2
if(k6){m=s.a1(r,q)
m=(m==null?null:m.a)!==B.h}else m=!0
p=3
return k7.b=new A.a5(q,k4,k5,m,k2?"unsalvageableDefense\uff1a\u5f53\u524d\u5b89\u5168\u540d\u989d "+q.O(k0)+"\uff0c\u9a7b\u519b "+q.L(k1)+"\uff0c\u7b49\u5f85\u5408\u6cd5\u4fee\u590d":"\u4fdd\u6301\u53ef\u51fa\u573a\u5b88\u519b\uff0c\u7ee7\u7eed\u76d1\u63a7\u5168\u90e8\u6765\u654c","local"),1
case 3:k4=s.c
if(!k4.a2()){p=1
break}k5=q.f
m=q.v(k1).length
l=s.b
k=l.b
j=k.i(0,"soldierLimit")
j.toString
i=Math.max(0,Math.min(k5,m*B.b.k(j))-q.e)
p=i>0?4:5
break
case 4:h=q.M()
k5=h.d
m=h.ad(!0)
j=k.i(0,"soldierCost")
j.toString
g=Math.min(i,Math.max(0,B.c.aV(k5-m.a,B.b.k(j))))
p=g>0&&h.aB(g)?6:7
break
case 6:p=8
return k7.b=s.az(r,q,h,A.c([new A.z(B.m,null,k1,null,g,B.d)],t.w),"\u4f18\u5148\u7528\u56fd\u5e93\u8865\u8db3\u73b0\u6709\u5b88\u519b\u5175\u5458\uff0c\u518d\u5224\u65ad\u662f\u5426\u9700\u8981\u5916\u63f4"),1
case 8:case 7:case 5:k5=k0.at
m=k5==null
p=m?9:10
break
case 9:f=q.M()
e=A.c([],t.w)
j=f.v(k1)
d=A.h(j)
c=d.h("d<1>")
a0=A.o(new A.d(j,d.h("e(1)").a(new A.fa()),c),c.h("b.E"))
B.a.C(a0,new A.fb())
p=a0.length!==0?11:12
break
case 11:a1=B.a.gF(a0)
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
break}if(!f.aH(k0,a1)||f.d<f.ad(!0).a){p=14
break}B.a.l(e,new A.z(B.l,j,k1,null,0,B.d))
a3=f.L(k1)
a4=d.i(0,k1)
if(a4==null)a4=c
p=a3<=a4?15:16
break
case 15:p=17
return k7.b=s.az(r,q,f,e,"\u4f18\u5148\u7531\u9ad8\u5185\u653f\u5c06\u9886\u5347\u7ea7\uff0c\u4fdd\u62a4\u771f\u5b9e\u8fce\u6218\u540d\u989d"),1
case 17:a3=s.a1(r,f)
if((a3==null?null:a3.a)===B.h||k2){p=14
break}case 16:++a2
p=13
break
case 14:case 12:case 10:p=k2?18:19
break
case 18:j=q.v(k1)
d=A.h(j)
c=d.h("d<1>")
a5=A.o(new A.d(j,d.h("e(1)").a(new A.fc()),c),c.h("b.E"))
B.a.C(a5,new A.fn())
j=A.h(a5),d=A.Z(a5,0,A.W(3,"count",t.S),j.c),c=d.$ti,d=new A.r(d,d.gm(0),c.h("r<k.E>")),a3=k0.cy,a4=k0.ax,a6=k0.d,a7=t.T,a8=t.w,a9=t.e,b0=j.h("e(1)"),j=j.h("d<1>"),c=c.h("k.E")
case 20:if(!d.j()){p=21
break}b1=d.d
if(b1==null)b1=c.a(b1)
if(!k4.a2()){p=21
break}b2=q.M()
e=A.c([],a8)
b3=A.c([b1],a9)
B.a.G(b3,new A.d(a5,b0.a(new A.fy(b1)),j))
b1=b3.length,b4=b2.x,b5=0
case 22:if(!(b5<b3.length)){p=24
break}b6=b3[b5]
b7=b2.L(k1)
if(m){b8=b4.i(0,k1)
if(b8==null)b8=a6}else{b8=a3?1:0
b8=B.c.A(k5-a4-b8,0,5)}if(b7<=b8){p=24
break}if(!b2.bX(b6)){p=23
break}B.a.l(e,new A.z(B.A,b6.a,null,null,0,B.d))
p=m?25:26
break
case 25:b9=b2.M()
c0=A.o(e,a7)
b7=b9.v(k1)
b8=A.h(b7)
c1=b8.h("d<1>")
a0=A.o(new A.d(b7,b8.h("e(1)").a(new A.fA()),c1),c1.h("b.E"))
B.a.C(a0,new A.fB())
p=a0.length!==0?27:28
break
case 27:b7=b9.x
c2=0
for(;;){if(c2<3){b8=b9.L(k1)
c1=b7.i(0,k1)
if(c1==null)c1=a6
c1=b8>c1
b8=c1}else b8=!1
if(!b8)break
if(!b9.aH(k0,B.a.gF(a0)))break
B.a.l(c0,new A.z(B.l,B.a.gF(a0).a,k1,null,0,B.d));++c2}b8=b9.L(k1)
b7=b7.i(0,k1)
if(b7==null)b7=a6
p=b8<=b7&&b9.d>=b9.ad(!0).a?29:30
break
case 29:p=31
return k7.b=s.az(r,q,b9,c0,"\u5148\u89e3\u96c7\u4f4e\u4ea4\u6362\u4ef7\u503c\u6321\u4f4d\u8005\u7b79\u8d44\uff0c\u4fdd\u7559\u4e3b\u6301\u8005\u5b8c\u6210\u6551\u57ce\u5347\u7ea7"),1
case 31:case 30:case 28:case 26:case 23:b3.length===b1||(0,A.u)(b3),++b5
p=22
break
case 24:b1=b2.L(k1)
if(m){b3=b4.i(0,k1)
if(b3==null)b3=a6}else{b3=a3?1:0
b3=B.c.A(k5-a4-b3,0,5)}p=b1<=b3?32:33
break
case 32:p=34
return k7.b=s.az(r,q,b2,e,"\u6ca1\u6709\u53ef\u652f\u4ed8\u4e14\u53ca\u65f6\u7684\u5347\u7ea7\u65b9\u6848\uff0c\u6e05\u51fa\u6321\u4f4d\u5b88\u5c06\u5e76\u4fdd\u7559\u6838\u5fc3\u51fa\u573a"),1
case 34:case 33:p=20
break
case 21:case 19:j=q.v(k1)
d=A.h(j)
c=d.h("d<1>")
c3=A.o(new A.d(j,d.h("e(1)").a(new A.fC(q)),c),c.h("b.E"))
B.a.C(c3,new A.fD())
if(k6){k6=r.f
k6=(k6==null?null:k6.a)!==B.h}else k6=!0
p=k6&&s.a.Q.gN().gm(0)>1?35:36
break
case 35:c4=q.M()
k6=r.f
if((k6==null?null:k6.a)===B.p)c4.ax.l(0,k1)
c5=A.c([],k3)
k6=s.a.Q
j=k6.gN()
d=j.$ti
c=d.h("d<b.E>")
c6=A.o(new A.d(j,d.h("e(b.E)").a(new A.fE(k0)),c),c.h("b.E"))
B.a.C(c6,new A.fF(k0))
j=A.Z(c3,0,A.W(l.r.fy,"count",t.S),A.h(c3).c),d=j.$ti,j=new A.r(j,j.gm(0),d.h("r<k.E>")),c=k0.cy,a3=k0.ax,a4=A.h(c6),a6=a4.c,a4=a4.h("y<1>"),a7=a4.h("r<k.E>"),a8=s.e,a9=a8.c,b0=s.f,b1=a4.h("k.E"),d=d.h("k.E"),b3=k0.d,b4=t.er,b7=t.bo,b8=t.i,c1=t.I
case 37:if(!j.j()){p=38
break}c7=j.d
if(c7==null)c7=d.a(c7)
if(!k4.a2()){p=38
break}c8=new A.y(c6,0,4,a4)
c8.V(c6,0,4,a6)
c8=new A.r(c8,c8.gm(0),a7)
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
d4=c4.L(d2)
d5=d1.at
if(d5==null){d2=c9.i(0,d2)
if(d2==null)d2=d1.d}else{d2=d1.ax
d6=d1.cy?1:0
d6=B.c.A(d5-d2-d6,0,5)
d2=d6}if(d4>=d2)continue
d7=a9.ao(c7,d1.e,k6,!0,d1)
d2=k2?"transfer":"evacuate"
d8=a8.bn(c4,c7,d7,!0,r.gae(),!0,"\u5728\u539f\u57ce\u5371\u9669\u7a97\u53e3\u524d\u8fdb\u9a7b\u5b89\u5168\u53cb\u57ce\uff0c\u6539\u53d8\u6240\u5c5e\u57ce\u4ee5\u4fdd\u5168\u5c06\u9886",d2,d1)
if(d8!=null)d1=d0==null||d8.a.d>d0.a.d
else d1=!1
if(d1)d0=d8}if(d0==null){p=37
break}c4=d0.a
B.a.l(c5,d0.b)
c7=c4.L(k1)
if(m){c8=c4.x.i(0,k1)
if(c8==null)c8=b3}else{c8=c?1:0
c8=B.c.A(k5-a3-c8,0,5)}p=c7<=c8?39:40
break
case 39:d9=new A.bR(c5,b4.a(new A.fd()),b7).D(0,0,new A.fe(s),b8)
c7=c4.M()
c8=A.o(c5,c1)
c9=s.a6(r,c4)
d1=isFinite(r.gae())?"\u5b89\u5168\u5224\u65ad\u4ee5\u5b9e\u9645\u8fdb\u9a7b\u53cb\u57ce\u4e3a\u51c6\uff0c\u9014\u4e2d\u539f\u57ce\u5931\u5b88\u4ecd\u4f1a\u6e05\u9664\u90e8\u961f":"\u8f6c\u79fb\u5230\u5b89\u5168\u540e\u65b9\u6574\u5907"
p=41
return k7.b=new A.a5(c7,c8,c9+d9*0.65,!1,d1,"relocation"),1
case 41:if(k2){p=38
break}case 40:p=37
break
case 38:case 36:e0=s.cB(r,q)
e1=new A.fG(s,q)
k6=s.a.Q
j=k6.r
d=A.h(j)
c=d.h("d<1>")
e2=A.o(new A.d(j,d.h("e(1)").a(new A.ff(s,q,e1,e0)),c),c.h("b.E"))
B.a.C(e2,new A.fg(e1,k0))
j=r.d
d=j.length===0?0:l.r.fy
c=t.S
d=A.Z(e2,0,A.W(d,"count",c),A.h(e2).c)
a3=d.$ti
d=new A.r(d,d.gm(0),a3.h("r<k.E>"))
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
c7=A.h(j)
c8=c7.h("q(1)")
c9=c7.h("O<1,q>")
d1=k0.e
d2=c7.c
c7=c7.h("y<1>")
d4=c7.h("r<k.E>")
d5=c7.h("k.E")
d6=c1==null
case 42:if(!d.j()){p=43
break}e3=d.d
if(e3==null)e3=a3.a(e3)
if(!k4.a2()){p=43
break}e4=e3.c
e5=b1.i(0,e4)
e6=r.gae()
e7=e5==null
if(e7)e8=null
else e8=e5.d.length!==0||e5.a.at!=null
e8=e8===!0?e5.gae():1/0
e9=Math.min(e6,e8)
e6=!1
if(!e1.$1(e3)||e0){e8=s.a1(r,q)
if((e8==null?null:e8.a)!==B.h){e6=q.L(k1)
if(m){e8=b8.i(0,k1)
if(e8==null)e8=b7}else{e8=b3?1:0
e8=B.c.A(k5-b4-e8,0,5)}e8=e6<e8
e6=e8}}p=e6?44:45
break
case 44:f0=new A.O(j,c8.a(new A.fh()),c9).aa(0,new A.fi(s))
if(m){e6=b8.i(0,k1)
if(e6==null)e6=b7}else{e6=b3?1:0
e6=B.c.A(k5-b4-e6,0,5)}e8=k.i(0,"soldierLimit")
e8.toString
f1=a6.bd(e3,f0,f0.ok,e6,!1,Math.min(B.b.k(e8),q.e+e3.gP()))
e6=d6?null:c1.b
if(e6==null)e6=-1
p=f1.b>e6+0.05?46:47
break
case 46:d7=a7.ao(e3,d1,k6,!0,k0)
if(m){e6=b8.i(0,k1)
if(e6==null)e6=b7}else{e6=b3?1:0
e6=B.c.A(k5-b4-e6,0,5)}e8=s.a1(r,q)
e8=e8==null?null:e8.b
d8=a4.bn(q,e3,d7,!0,e9,!0,"\u672c\u5730\u62b5\u6297\u4ecd\u6709\u7f3a\u53e3\uff08\u57ce\u9632"+e6+"\u7ea7\uff0c\u9632\u5b88\u4f59\u91cf"+B.b.c8((e8==null?-1:e8)*100)+"\u70b9\uff09\uff0c\u63f4\u519b\u7ea6"+B.b.aT(d7.b,1)+"\u79d2\u5230\u8fbe\uff0c\u5371\u9669\u7a97\u53e3"+B.b.aT(e9,1)+"\u79d2\uff0c\u9884\u7559\u5165\u57ce\u540d\u989d","rescue",k0)
if(d8!=null){e6=s.a1(r,d8.a)
e6=(e6==null?null:e6.a)===B.h}else e6=!1
p=e6?48:49
break
case 48:e6=d8.a
p=50
return k7.b=new A.a5(e6,A.c([d8.b],k3),s.a6(r,e6)-A.ad(e3)*0.08,!1,"","recall"),1
case 50:case 49:case 47:case 45:e6=new A.y(j,0,2,c7)
e6.V(j,0,2,d2)
e6=new A.r(e6,e6.gm(0),d4)
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
d7=a4.bf(e3,f4,q)
if(a6.cU(e3,f4,f4.ok,e8,a8.ba(f4.z)).a!==B.h){p=51
break}f6=e1.$1(e3)?"\u672c\u5730\u624b\u6bb5\u65e0\u6cd5\u62b5\u6321\u660e\u786e\u6765\u88ad\uff0c\u7d27\u6025\u622a\u51fb\u9884\u8ba1"+B.b.aT(d7.b,1)+"\u79d2\uff0c\u65e9\u4e8e\u654c\u519b"+B.b.aT(f3.b,1)+"\u79d2\u62b5\u57ce\uff1b\u6700\u540e\u624d\u6539\u6d3e\u8fdc\u5f81":"\u52a8\u7528\u9644\u8fd1\u95f2\u7f6e\u90e8\u961f\u622a\u51fb\u6765\u654c\uff0c\u4e0d\u6253\u65ad\u4e3b\u653b\u4efb\u52a1"
d8=a4.cj(q,e3,d7,f3.b,!0,f4,f6,"intercept",k0)
p=d8!=null?53:54
break
case 53:f3=d8.a
p=55
return k7.b=new A.a5(f3,A.c([d8.b],k3),s.a6(r,f3)+80-A.ad(e3)*0.08,k2,"","recall"),1
case 55:case 54:p=51
break
case 52:p=42
break
case 43:d=A.h(c3)
a3=d.h("d<1>")
f7=A.o(new A.d(c3,d.h("e(1)").a(new A.fj(s)),a3),a3.h("b.E"))
B.a.C(f7,new A.fk(s,q,k0))
if(c3.length>1){d=s.a1(r,q)
f8=(d==null?null:d.a)===B.p}else f8=!1
d=A.Z(j,0,A.W(2,"count",c),d2),c=d.$ti,d=new A.r(d,d.gm(0),c.h("r<k.E>")),a3=A.h(f7),a9=a3.c,a3=a3.h("y<1>"),b0=a3.h("r<k.E>"),b1=t.a,b8=t.H,c7=t.N,c8=t.dg,c9=t.cO,d1=t.Y,d2=t.T,d4=l.r,d5=d4.p4,e3=d4.R8,l=l.f,e4=t.fR,e6=t.w,e7=t.e,e8=t.eV,f2=a3.h("k.E"),d4=d4.d,c=c.h("k.E")
case 56:if(!d.j()){p=57
break}f3=d.d
if(f3==null)f3=c.a(f3)
if(!f8||f3.a.k1!=null||s.bz(f3,q)){p=56
break}f4=new A.y(f7,0,4,a3)
f4.V(f7,0,4,a9)
f4=new A.r(f4,f4.gm(0),b0)
f6=f3.a
f3=f3.b
f9=f6.z
g0=f6.ok
case 58:if(!f4.j()){p=59
break}g1=f4.d
if(g1==null)g1=f2.a(g1)
if(!k4.a2()){p=59
break}g2=q.v(k1)
g3=A.h(g2)
g4=g3.h("d<1>")
g5=A.o(new A.d(g2,g3.h("e(1)").a(new A.fl(g1)),g4),g4.h("b.E"))
if(g5.length===0){p=58
break}g6=B.a.aa(g5,new A.fm(s,q,k0))
d7=a4.bf(g1,f6,q)
if(!d7.d||d7.b+d4>=f3){p=58
break}g7=A.c([new A.aW(q,A.c([],e6),A.c([],e7))],e8)
if(k2){g2=q.d
g3=k.i(0,"emergencyGold")
g3.toString
g3=g2<B.b.k(g3)+4
g2=g3}else g2=!1
if(g2){g2=A.h(g5)
g3=g2.h("d<1>")
g8=A.o(new A.d(g5,g2.h("e(1)").a(new A.fo(g6)),g3),g3.h("b.E"))
B.a.C(g8,new A.fp())
if(g8.length!==0&&k4.a2()){b9=q.M()
if(b9.bX(B.a.gF(g8)))B.a.l(g7,new A.aW(b9,A.c([new A.z(B.A,B.a.gF(g8).a,null,null,0,B.d)],e6),A.c([B.a.gF(g8)],e7)))}}if(m){g2=q.v(k1)
g3=A.h(g2)
g4=g3.h("d<1>")
a0=A.o(new A.d(g2,g3.h("e(1)").a(new A.fq()),g4),g4.h("b.E"))
B.a.C(a0,new A.fr())
f=q.M()
if(a0.length!==0&&f.aH(k0,B.a.gF(a0))&&f.d>=f.ad(!0).a)B.a.l(g7,new A.aW(f,A.c([new A.z(B.l,B.a.gF(a0).a,k1,null,0,B.d)],e6),A.c([],e7)))}g2=A.o(g7,e4)
g3=g2.length
b5=0
for(;b5<g2.length;g2.length===g3||(0,A.u)(g2),++b5){g9=g2[b5]
h=g9.a.M()
if(m){g4=h.x.i(0,k1)
if(g4==null)g4=b7}else{g4=b3?1:0
g4=B.c.A(k5-b4-g4,0,5)}h0=Math.min(g4,h.v(k1).length-1)
g4=h.f
h1=k.i(0,"soldierLimit")
h1.toString
h2=Math.min(g4,(h0+1)*B.b.k(h1))-h.e
if(h2>0&&h.aB(h2)&&h.d>=h.ad(!0).a){g4=A.o(g9.b,d2)
g4.push(new A.z(B.m,null,k1,null,h2,B.d))
B.a.l(g7,new A.aW(h,g4,g9.c))}}g2=g7.length,g3=g1.w<=d5,g4=g1.f,h1=g6===null,h3=!h1,b5=0
case 60:if(!(b5<g7.length)){p=62
break}h4=g7[b5]
h5=h4.a
h6=l.gau()
h7=A.l(h6)
h8=h7.h("d<b.E>")
h9=A.o(new A.d(h6,h7.h("e(b.E)").a(new A.fs(s,h5)),h8),h8.h("b.E"))
B.a.C(h9,new A.ft())
if(h9.length===0){p=61
break}h6=[A.c([B.a.gF(h9).a],b1)],h7=h4.c,h8=J.aC(h7),i0=h4.b,i1=J.aC(i0),i2=h5.x,i3=0
case 63:if(!(i3<1)){p=65
break}i4=h6[i3]
i5=a8.ba(f9)
i6=k.i(0,"soldierLimit")
i6.toString
f1=a6.cX(g1,f6,g0,i4,!0,Math.min(B.b.k(i6),h5.e),i5)
i7=f1.a===B.h
i5=!i7
i6=!1
if(i5)if(g3)if(h3)if(f1.d>0){i6=k.i(0,"soldierLimit")
i6.toString
i6=Math.min(B.b.k(i6),h5.e)
i8=k.i(0,"soldierHp")
i8.toString
i8=f1.f<g4+i6*B.b.k(i8)
i6=i8}if(i6){i6=h5.v(k1)
i8=A.h(i6)
i9=i8.h("d<1>")
i6=A.o(new A.d(i6,i8.h("e(1)").a(new A.fu(g1)),i9),i9.h("b.E"))
i7=!1
i8=A.h(i6).h("L<1>")
i6=new A.L(i6,i8)
if(m){i9=i2.i(0,k1)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.A(k5-b4-i9,0,5)}j0=new A.y(i6,0,i9,i8.h("y<k.E>"))
j0.V(i6,0,i9,i8.h("k.E"))
j1=B.a.d6(j0.ab(0),new A.fv(g6))
if(j1<0){p=64
break}i6=h5.e
i8=k.i(0,"soldierLimit")
i8.toString
j2=Math.max(0,i6-(j1+1)*B.b.k(i8))
if(m){i6=i2.i(0,k1)
if(i6==null)i6=b7}else{i6=b3?1:0
i6=B.c.A(k5-b4-i6,0,5)}i8=k.i(0,"soldierLimit")
i8.toString
j3=a6.bU(g6,f6,i6,Math.min(B.b.k(i8),j2))
if(m){i6=i2.i(0,k1)
if(i6==null)i6=b7}else{i6=b3?1:0
i6=B.c.A(k5-b4-i6,0,5)}i8=k.i(0,"soldierLimit")
i8.toString
i9=f1.d
j4=a6.cV(g6,f6,i9,i6,Math.min(B.b.k(i8),j2))
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
i8=Math.min(B.b.k(i8),h5.e)}d8=a4.cf(h5,g1,d7,i5,f3,!0,f6,i4,i8,i6,"intercept",k0)
if(d8==null){p=64
break}i6=d8.a
j7=i6.L(k1)
i8=d8.b
i9=A.o(i0,d2)
B.a.G(i9,i8.b)
j0=A.jc(c7,c7)
j0.G(0,i8.c)
j0.G(0,a4.ag(new A.bx(i1.aF(i0,new A.fw(s),c8),c9),A.c([],d1)))
i8=A.c([new A.N(i8.a,i9,j0,i8.d,i8.e,!0)],k3)
j0=s.a6(r,i6)
i9=Math.max(0,q.d-i6.d)
i5=i5?A.ad(g1)*0.5:0
j8=h8.D(h7,0,new A.fx(),b8)
if(m){j9=i6.x.i(0,k1)
if(j9==null)j9=b7}else{j9=b3?1:0
j9=B.c.A(k5-b4-j9,0,5)}j9=j7>j9||!j6
p=66
return k7.b=new A.a5(i6,i8,j0+200+j5*500-i9*0.25-i5-j8,j9,"","local"),1
case 66:case 64:++i3
p=63
break
case 65:case 61:g7.length===g2||(0,A.u)(g7),++b5
p=60
break
case 62:p=58
break
case 59:p=56
break
case 57:if(k6.gN().gm(0)===1)l=(d6?null:c1.a)===B.p&&c3.length>1
else l=!1
p=l?67:68
break
case 67:l=k6.f,k=A.h(l),j=k.h("d<1>"),j=A.lx(new A.d(l,k.h("e(1)").a(new A.fz(s)),j),3,j.h("b.E")),k=j.a,j=new A.ba(k.gB(k),j.b,A.l(j).h("ba<1>"))
case 69:if(!j.j()){p=70
break}l=j.gn()
if(!k4.a2()){p=70
break}b6=B.a.gF(c3)
d8=a4.ci(q,b6,a7.ao(b6,l.e,k6,!0,l),r.gae(),!0,"\u4fdd\u7559\u539f\u57ce\u5b88\u519b\u62d6\u5ef6\uff0c\u6838\u5fc3\u5728\u5371\u9669\u7a97\u53e3\u524d\u593a\u53d6\u7a7a\u57ce\u5efa\u7acb\u65b0\u636e\u70b9","newBase",l)
p=d8!=null?71:72
break
case 71:l=d8.a
k=A.c([d8.b],k3)
d=s.a6(r,l)
c=A.ad(b6)
a3=l.L(k1)
if(m){a6=l.x.i(0,k1)
if(a6==null)a6=b7}else{a6=b3?1:0
a6=B.c.A(k5-b4-a6,0,5)}p=73
return k7.b=new A.a5(l,k,d+c*1.2,a3>a6,"","relocation"),1
case 73:case 72:p=69
break
case 70:case 68:case 1:return 0
case 2:return k7.c=n.at(-1),3}}}},
az(a,b,c,d,e){var s,r,q,p,o,n,m=this
t.f3.a(d)
s=A.h(d)
r=s.h("q?(1)").a(new A.fM(m))
q=c.z.d2(b.z).D(0,0,new A.fN(m),t.i)
p=c.M()
o=A.o(d,t.T)
s=A.o(new A.bx(new A.O(d,r,s.h("O<1,q?>")),t.cO),t.r)
r=a.d
n=A.h(r)
B.a.G(s,new A.O(r,n.h("q(1)").a(new A.fO()),n.h("O<1,q>")))
n=a.a
s=A.c([new A.N(e,o,m.e.ag(s,A.c([n],t.Y)),B.r,c.ad(!0).a,!0)],t.Z)
o=m.a6(a,c)
r=Math.max(0,b.d-c.d)
if(c.L(n.a)<=c.O(n)){n=m.a1(a,c)
n=(n==null?null:n.a)!==B.h}else n=!0
return new A.a5(p,s,o-q*0.65-r*0.2,n,"","local")},
bz(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=b.y,s=new A.ah(s,s.r,s.e,A.l(s).h("ah<2>")),r=this.e,q=a.a,p=q.a,o=this.a.Q,n=o.b,m=b.z,l=this.b.r.d,k=a.b;s.j();){j=s.d
if(j.b!=="intercept"||j.r!==p||j.y<=n)continue
i=o.a_(j.a)
if(i==null||i.f<=0||i.fy||m.q(0,i.a))continue
if(i.k1===p)return!0
if(!i.dx||j.z<=n)continue
h=r.bf(i,q,b)
if(h.d&&h.b+l<k)return!0}return!1},
cB(a,b){var s,r
if(this.c.e)return!1
s=a.a
if(!(s.at!=null||B.a.H(a.d,new A.fH())))return!1
if(b.v(s.a).length===0)return!0
r=this.a1(a,b)
return r!=null&&r.c<-this.b.r.p3},
a1(b3,b4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1=null,b2=b3.d
if(b2.length===0)return b1
s=b3.a
r=s.a
q=b4.v(r)
p=b4.e
for(o=b4.y,o=new A.ah(o,o.r,o.e,A.l(o).h("ah<2>")),n=t.N,m=t.z,l=t.n,k=b0.e.c,j=b0.a.Q,i=j.b,h=b4.z,g=b0.b,f=g.r.d;o.j();){e=o.d
if(!e.as||e.d!==r||e.y<i)continue
d=j.a_(e.a)
if(d==null||d.fy||d.k1!=null||d.f<=0||h.q(0,d.a)||B.a.H(q,new A.fI(d)))continue
c=d.z
for(e=J.j6(e.w,e.x),b=e.$ti,e=new A.r(e,e.gm(0),b.h("r<k.E>")),b=b.h("k.E"),a=0;e.j();c=a1){a0=e.d
a1=a0==null?b.a(a0):a0
a+=k.X(c,a1)}if(!isFinite(a)||a+f>=b3.gae())continue
p=Math.min(b4.f,p+d.gP())
e=A.as(d.I(),n,m)
e.u(0,"hp",d.r)
e.u(0,"troops",A.c([],l))
e.u(0,"s",0)
B.a.l(q,A.jF(e))}B.a.C(q,new A.fJ())
o=A.h(q)
n=t.r
a2=A.bp(new A.d(q,o.h("e(1)").a(new A.fK(b3)),o.h("d<1>")),n)
m=A.c([],t.e)
if(a2!=null)m.push(a2)
o=o.h("L<1>")
B.a.G(m,new A.L(q,o).br(0,o.h("e(k.E)").a(new A.fL(a2))))
a3=A.Z(m,0,A.W(b4.O(s),"count",t.S),n).ab(0)
if(a3.length===0)return b1
for(o=b0.d,n=s.d,m=b4.x,g=g.b,l=s.cy,k=s.ax,s=s.at,j=s==null,a4=b1,a5=0;a5<a3.length;++a5){d=a3[a5]
if(d.as===B.e)a6=0
else{i=g.i(0,"soldierLimit")
i.toString
a6=Math.min(p,B.b.k(i)-d.gP())}p-=a6
for(i=b2.length,a7=b1,a8=0;a8<b2.length;b2.length===i||(0,A.u)(b2),++a8){h=b2[a8].a
if(j){f=m.i(0,r)
if(f==null)f=n}else{f=l?1:0
f=B.c.A(s-k-f,0,5)}a9=o.bd(d,h,h.ok,Math.max(1,f-a5),!1,d.gP()+a6)
if(a7==null||a9.b<a7.b)a7=a9}if(a4==null||a7.b>a4.b)a4=a7}return a4},
a6(a,b){var s=a.a,r=b.L(s.a),q=Math.max(0,r-b.O(s)),p=this.a.Q.gN().gm(0)===1?400:0,o=150+s.r*4+a.r*0.5+p,n=this.a1(a,b)
s=r===0?o*2:0
p=n==null?null:n.b
if(p==null)p=-0.8
return-q*5000-s+p*o}}
A.fU.prototype={
$1(a){return this.a.bz(t.O.a(a),this.b)},
$S:10}
A.fV.prototype={
$1(a){t.J.a(a)
return a.f&&B.a.H(this.a.d,new A.fT(a))},
$S:15}
A.fT.prototype={
$1(a){return t.O.a(a).a.a===this.a.r},
$S:10}
A.fW.prototype={
$1(a){var s,r,q,p,o,n=this
t.cs.a(a)
s=!1
if(a.f==="local"){r=a.b
if(r.length!==0)if(B.a.H(r,new A.fR())){q=a.a
p=n.b
o=p.a
if(q.L(o.a)<=q.O(o)){s=n.a
q=s.a1(p,q)
q=q==null?null:q.b
if(q==null)q=-1
o=n.c
o=o==null?null:o.b
s=(q>(o==null?-1:o)+0.04||B.a.H(r,new A.fS()))&&a.c>s.a6(p,n.d)}}}return s},
$S:60}
A.fR.prototype={
$1(a){return B.a.H(t.I.a(a).b,new A.fQ())},
$S:29}
A.fQ.prototype={
$1(a){var s=t.T.a(a).a
return s===B.l||s===B.m||s===B.C},
$S:30}
A.fS.prototype={
$1(a){return B.a.H(t.I.a(a).d,new A.fP())},
$S:29}
A.fP.prototype={
$1(a){return t.J.a(a).b==="intercept"},
$S:15}
A.fa.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.fb.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fc.prototype={
$1(a){t.r.a(a)
return a.dy&&a.e!==2},
$S:0}
A.fn.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.ad(a),A.ad(b))},
$S:2}
A.fy.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fA.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.fB.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fC.prototype={
$1(a){t.r.a(a)
return a.db&&!this.a.as.q(0,a.a)},
$S:0}
A.fD.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ad(s.a(b)),A.ad(a))},
$S:2}
A.fE.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:1}
A.fF.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.J(s),b.e.J(s))},
$S:4}
A.fd.prototype={
$1(a){return t.I.a(a).d},
$S:38}
A.fe.prototype={
$2(a,b){var s
A.aj(a)
s=this.a.a.Q.a_(t.J.a(b).a)
s.toString
return a+A.ad(s)},
$S:39}
A.fG.prototype={
$1(a){var s,r,q=this.a.a.Q,p=this.b
if(A.js(a,q,p)==null){p=p.y
s=a.a
r=p.i(0,s)
if((r==null?null:r.b)==="intercept"){p=p.i(0,s)
q=q.a_(p==null?null:p.r)
q=q==null?null:q.f
q=(q==null?0:q)>0}else q=!1}else q=!0
return q},
$S:0}
A.ff.prototype={
$1(a){var s,r,q,p,o=this
t.r.a(a)
s=!1
if(a.b===o.a.a.Q.a)if(a.dx)if(!a.fy){r=o.b
q=a.a
p=r.y.i(0,q)
if((p==null?null:p.as)!==!0)if(!r.as.q(0,q))s=!o.c.$1(a)||o.d}return s},
$S:0}
A.fg.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a
if(!J.ao(s.$1(a),s.$1(b)))return s.$1(a)?1:-1
s=this.b.e
return B.b.t(a.z.J(s),b.z.J(s))},
$S:2}
A.fh.prototype={
$1(a){return t.O.a(a).a},
$S:31}
A.fi.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.kt(a,s)>A.kt(b,s)?a:b},
$S:19}
A.fj.prototype={
$1(a){return t.r.a(a).w<=this.a.b.r.p4},
$S:0}
A.fk.prototype={
$2(a,b){var s,r,q,p=t.r
p.a(a)
p.a(b)
p=this.a.b
s=p.r.p4
r=a.w<=s
if(r!==b.w<=s)return r?-1:1
s=this.b
q=this.c
return B.b.t(A.iU(a,p,s.O(q),4),A.iU(b,p,s.O(q),4))},
$S:2}
A.fl.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fm.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a.b
s=this.b
r=this.c
return A.iU(a,q,s.O(r),4)>A.iU(b,q,s.O(r),4)?a:b},
$S:19}
A.fo.prototype={
$1(a){t.r.a(a)
return a!==this.a&&a.dy&&a.e!==2},
$S:0}
A.fp.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.ad(a),A.ad(b))},
$S:2}
A.fq.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.fr.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fs.prototype={
$1(a){var s
t.o.a(a)
s=this.b.w.i(0,a.a)
if((s==null?0:s)<=0)s=a.f&&this.a.a.Q.c>=a.e
else s=!0
return s},
$S:8}
A.ft.prototype={
$2(a,b){var s=t.o
s.a(a)
return B.c.t(s.a(b).c,a.c)},
$S:20}
A.fu.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fv.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fw.prototype={
$1(a){return this.a.a.Q.a_(t.T.a(a).b)},
$S:28}
A.fx.prototype={
$2(a,b){return A.w(a)+A.ad(t.r.a(b))*0.65},
$S:45}
A.fz.prototype={
$1(a){var s
t.q.a(a)
s=this.a.a.Q
return a.b!==s.a&&s.v(a.a).length===0},
$S:1}
A.fM.prototype={
$1(a){return this.a.a.Q.a_(t.T.a(a).b)},
$S:28}
A.fN.prototype={
$2(a,b){var s
A.aj(a)
s=this.a.a.Q.a_(A.G(b))
s.toString
return a+A.ad(s)},
$S:46}
A.fO.prototype={
$1(a){return t.O.a(a).a},
$S:31}
A.fH.prototype={
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
A.fI.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fJ.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.fK.prototype={
$1(a){return t.r.a(a).a===this.a.a.ch},
$S:0}
A.fL.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.J.prototype={
I(){return A.c([this.a,this.b],t.n)},
J(a){var s=this.a-a.a,r=this.b-a.b
return Math.sqrt(s*s+r*r)},
aE(a,b){var s=this.a,r=this.b
return new A.J(s+(a.a-s)*b,r+(a.b-r)*b)}}
A.e9.prototype={
a4(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this.a,f=B.a.gF(g)
for(s=a.a,r=a.b,q=1/0,p=0;o=g.length,p<o;){n=g[p];++p
m=g[p%o]
o=n.a
l=m.a-o
k=n.b
j=m.b-k
i=n.aE(m,B.b.A(((s-o)*l+(r-k)*j)/(l*l+j*j),0,1))
h=i.J(a)
if(h<q){q=h
f=i}}return f},
q(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(this.a4(b).J(b)<1e-7)return!0
for(s=this.a,r=s.length,q=b.b,p=b.a,o=!1,n=0;n<r;){m=s[n];++n
l=s[n%r]
k=m.b
j=l.b
if(k>q!==j>q){i=m.a
i=p<(l.a-i)*(q-k)/(j-k)+i
k=i}else k=!1
if(k)o=!o}return o},
bZ(a,b){var s
if(this.q(0,a))return null
s=this.bV(a,b)
return s.length===0?null:B.a.aa(s,B.y)},
bV(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.a,g=b.a-h,f=a.b,e=b.b-f,d=A.c([],t.n)
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
if(j>=-1e-7&&j<=1.0000001&&i>=-1e-7&&i<=1.0000001)B.a.l(d,B.b.A(j,0,1))}return d},
bQ(a,b){var s,r=this
if(r.q(0,a))return r.a4(a)
s=r.bZ(a,b)
return s==null?r.a4(a):a.aE(b,s)},
bW(a,b){var s=a.J(b),r=s<1e-7?new A.J(a.a+4096,a.b+0):a.aE(b,4096/s),q=this.bV(a,r)
return q.length===0?this.a4(b):a.aE(r,B.a.aa(q,B.G))}}
A.al.prototype={
aL(){return"AiArmyState."+this.b}}
A.q.prototype={
gP(){var s=this.at,r=A.h(s)
return new A.d(s,r.h("e(1)").a(new A.dw()),r.h("d<1>")).gm(0)},
gaP(){return this.f+B.a.D(this.at,0,new A.dv(),t.H)},
I(){var s,r,q,p,o,n,m,l=this,k=l.z,j=t.n
k=A.c([k.a,k.b],j)
s=l.Q
s=A.c([s.a,s.b],j)
r=l.CW
r=r==null?null:A.c([r.a,r.b],j)
q=A.c([],t.A)
for(p=l.p2,o=p.length,n=0;n<p.length;p.length===o||(0,A.u)(p),++n){m=p[n]
q.push(A.c([m.a,m.b],j))}return A.Q(["id",l.a,"c",l.b,"home",l.c,"o",l.d,"t",l.e,"hp",l.f,"max",l.r,"a",l.w,"p",l.x,"pay",l.y,"xy",k,"v",s,"s",l.as.a,"troops",l.at,"w",l.ax,"m",l.ay,"due",l.ch,"to",r,"target",l.cx,"return",l.cy,"dispatch",l.db,"move",l.dx,"dismiss",l.dy,"upgrade",l.fr,"retreat",l.fx,"marked",l.fy,"rev",l.go,"orderRev",l.id,"opponent",l.k1,"clashes",l.k2,"received",l.k3,"dealt",l.k4,"opening",l.ok,"weaponReady",l.p1,"returnPath",q,"regionCity",l.p3,"salaryPaidMonth",l.p4],t.N,t.X)}}
A.dw.prototype={
$1(a){return A.aj(a)>0},
$S:14}
A.dv.prototype={
$2(a,b){return A.w(a)+A.aj(b)},
$S:11}
A.P.prototype={
ga5(){var s,r=this,q=r.at
if(q==null)q=r.d
else{s=r.cy?1:0
s=B.c.A(q-r.ax-s,0,5)
q=s}return q},
I(){var s,r,q,p,o,n=this,m=n.e,l=t.n
m=A.c([m.a,m.b],l)
s=A.c([],t.A)
for(r=n.f.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.u)(r),++p){o=r[p]
s.push(A.c([o.a,o.b],l))}return A.Q(["id",n.a,"c",n.b,"native",n.c,"level",n.d,"xy",m,"outline",s,"income",n.r,"baseIncome",n.z,"poor",n.w,"cap",n.x,"recruitCap",n.y,"recruit",n.Q,"rev",n.as,"initial",n.at,"wins",n.ax,"attacker",n.ay,"defender",n.ch,"stage",n.CW,"next",n.cx,"fallen",n.cy,"danger",n.db],t.N,t.X)}}
A.b0.prototype={
I(){var s,r,q=this,p=t.N,o=t.S,n=A.Y(p,o)
for(s=q.w.gai(),s=s.gB(s);s.j();){r=s.gn()
n.u(0,""+r.a,r.b)}o=A.Y(p,o)
for(s=q.x.gai(),s=s.gB(s);s.j();){r=s.gn()
o.u(0,""+r.a,r.b)}return A.Q(["id",q.a,"gold",q.b,"reserves",q.c,"capacity",q.d,"salary",q.e,"poor",q.f,"garrisonAccrued",q.r,"stock",n,"hate",o],p,t.X)}}
A.e1.prototype={
gar(){return B.a.ap(this.w,new A.e7(this))},
gN(){var s=this.f,r=A.h(s)
return new A.d(s,r.h("e(1)").a(new A.e8(this)),r.h("d<1>"))},
v(a){var s=this.r,r=A.h(s),q=r.h("d<1>")
s=A.o(new A.d(s,r.h("e(1)").a(new A.e4(this,a)),q),q.h("b.E"))
B.a.C(s,new A.e5())
return s},
a_(a){var s=this.r,r=A.h(s)
return A.bp(new A.d(s,r.h("e(1)").a(new A.e6(a)),r.h("d<1>")),t.r)},
K(a){var s=this.f,r=A.h(s)
return A.bp(new A.d(s,r.h("e(1)").a(new A.e2(a)),r.h("d<1>")),t.q)},
I(){var s,r,q,p,o=this,n=t.d,m=A.c([],n)
for(s=o.f,r=s.length,q=0;q<r;++q)m.push(s[q].I())
s=A.c([],n)
for(r=o.r,p=r.length,q=0;q<p;++q)s.push(r[q].I())
n=A.c([],n)
for(r=o.w,p=r.length,q=0;q<p;++q)n.push(r[q].I())
return A.Q(["country",o.a,"tick",o.b,"month",o.e,"cities",m,"heroes",s,"countries",n,"pool",o.x,"salary",o.y,"year",o.c,"monthIndex",o.d],t.N,t.X)}}
A.e7.prototype={
$1(a){return t.t.a(a).a===this.a.a},
$S:9}
A.e8.prototype={
$1(a){return t.q.a(a).b===this.a.a},
$S:1}
A.e4.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b
if(a.c===s){r=a.as
s=(r===B.f||r===B.e)&&a.f>0&&a.b===B.a.ap(this.a.f,new A.e3(s)).b}else s=!1
return s},
$S:0}
A.e3.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.e5.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.e6.prototype={
$1(a){return t.r.a(a).a===this.a},
$S:0}
A.e2.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.h8.prototype={
cm(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
for(s=this.b,r=s.y,r=new A.ah(r,r.r,r.e,A.l(r).h("ah<2>")),q=this.f,p=this.a,o=p.a,n=s.z,s=s.Q;r.j();){m=r.d
l=p.a_(m.a)
k=p.K(m.d)
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
J.kQ(q.df(k.a,new A.ha()),l)}},
gaR(){var s,r,q,p=this,o=p.d
if(o==null||p.f.a!==0)return o
s=new A.he(p)
r=p.a
if(A.am(o,r,p.c,null).gW())return s.$1(o)?o:null
r=r.f
q=A.h(r)
return new A.O(r,q.h("a(1)").a(new A.hc()),q.h("O<1,a>")).ds(0).H(0,new A.hd(p,s))?null:o},
gc5(){var s,r=this
if(r.gaR()!=null){s=r.a.K(r.e)
s=s==null?null:s.b
s=s==r.gaR()}else s=!1
return s?r.e:null},
ga0(){var s=this.f,r=A.l(s).h("a6<1>"),q=A.o(new A.a6(s,r),r.h("b.E"))
B.a.C(q,new A.hi(this))
return A.bp(q,t.S)},
gc3(){var s,r=this,q=r.ga0()
if(q!=null){s=r.c.r
s=r.a.d>=s.k2&&r.f.a<s.k1&&r.cZ(q)>=s.k3}else s=!0
return s},
aA(a){var s,r,q=this,p=!1
if(q.gaR()!=null)if(a.b!==q.gaR())p=q.ga0()==null||!q.gc3()
if(p)return!1
s=q.ga0()
if(s==null)s=q.gc5()
p=!0
if(s!=null){r=a.a
if(r!==s)p=q.ga0()!=null&&!q.f.Y(r)&&q.gc3()}return p},
cZ(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c="soldierLimit",b=d.a,a=b.K(a0)
a.toString
s=d.f.i(0,a0)
if(s==null)s=A.c([],t.e)
r=s.length
q=d.b.Q
p=d.c.b
o=0
n=0
for(;n<s.length;s.length===r||(0,A.u)(s),++n){m=s[n]
if(q.q(0,m.a)){l=p.i(0,c)
l.toString
k=B.b.k(l)}else k=m.gP()
o+=d.bI(m,k,0)}j=B.a.ap(b.w,new A.hb(a)).c
for(b=b.v(a0),s=A.h(b).h("L<1>"),s=A.Z(new A.L(b,s),0,A.W(a.ga5(),"count",t.S),s.h("k.E")),b=s.$ti,s=new A.r(s,s.gm(0),b.h("r<k.E>")),r=a.cy,q=a.at,l=a.ax,i=q==null,b=b.h("k.E"),a=a.d,h=0,g=0;s.j();){f=s.d
if(f==null)f=b.a(f)
e=p.i(0,c)
e.toString
k=Math.min(B.b.k(e),f.gP()+j)
j-=k-f.gP()
if(i)e=a
else{e=r?1:0
e=B.c.A(q-l-e,0,5)}h+=d.bI(f,k,Math.max(1,e-g));++g}return h===0?1/0:o/h},
bI(a,b,c){var s,r=this.c,q=r.bb(a.w,c,!1)
r=r.b
s=r.i(0,"soldierPower")
s.toString
s=B.b.k(s)
r=r.i(0,"soldierHp")
r.toString
return(a.f+b*B.b.k(r))*(B.c.b9(q+b*s+2,4)+1)*(1+a.ay/1000)}}
A.h9.prototype={
$1(a){var s=t.q.a(a).b
return s===this.a&&s!==this.b.a},
$S:1}
A.ha.prototype={
$0(){return A.c([],t.e)},
$S:47}
A.he.prototype={
$1(a){var s=this.a,r=s.a.f,q=A.h(r)
return new A.d(r,q.h("e(1)").a(new A.hg(a)),q.h("d<1>")).H(0,new A.hh(s))},
$S:17}
A.hg.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.hh.prototype={
$1(a){var s
t.q.a(a)
s=this.a
return s.a.gN().H(0,new A.hf(s,a))},
$S:1}
A.hf.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.b.c.X(r,this.b.f.a4(r))<=s.c.r.at},
$S:1}
A.hc.prototype={
$1(a){return t.q.a(a).b},
$S:66}
A.hd.prototype={
$1(a){var s
A.f(a)
s=this.a
return A.am(a,s.a,s.c,null).gW()&&this.b.$1(a)},
$S:17}
A.hi.prototype={
$2(a,b){var s,r
A.f(a)
A.f(b)
s=this.a.f
r=B.c.t(s.i(0,b).length,s.i(0,a).length)
return r!==0?r:B.c.t(a,b)},
$S:18}
A.hb.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:9}
A.d7.prototype={}
A.hj.prototype={
c_(a){var s=this.a.Q
return!A.am(a.b,s,this.b,null).gW()||s.gN().H(0,new A.hk(this,a))},
aO(a,b){var s,r=this.b
if(A.am(b.b,this.a.Q,r,null).gW()){s=a.z
r=this.c.X(s,b.f.a4(s))<=r.r.at}else r=!0
return r},
c2(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h=a.as
if(!(h===B.f||h===B.e))return A.c([a.ax],t.p)
h=this.b
s=h.f.gau()
r=A.l(s)
q=r.h("d<b.E>")
p=A.o(new A.d(s,r.h("e(b.E)").a(new A.hn(this,b,c)),q),q.h("b.E"))
B.a.C(p,new A.ho())
s=t.a
o=A.c([A.c([],s)],t.p)
for(r=t.S,q=A.h(p),n=A.Z(p,0,A.W(5,"count",r),q.c),m=n.$ti,n=new A.r(n,n.gm(0),m.h("r<k.E>")),m=m.h("k.E");n.j();){l=n.d
B.a.l(o,A.c([(l==null?m.a(l):l).a],s))}if(p.length!==0){n=q.h("e(1)")
q=q.h("d<1>")
k=A.o(new A.d(p,n.a(new A.hp(a)),q),q.h("b.E"))
m=k.length===0?p:k
j=B.a.aa(m,new A.hq())
if(!B.a.H(o,new A.hr(j)))B.a.l(o,A.c([j.a],s))
h=h.b.i(0,"carryLimit")
h.toString
B.a.l(o,A.c1(Math.min(3,B.b.k(h)),j.a,!1,r))
i=A.bp(new A.d(p,n.a(new A.hs(b)),q),t.o)
if(i!=null&&!B.a.H(o,new A.ht(i)))B.a.l(o,A.c([i.a],s))}return o},
c1(a,b){return this.c2(a,b,!1)},
c6(a7,a8,a9,b0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=this,a4=a3.a.Q,a5=a3.b,a6=A.am(a9.b,a4,a5,a8.x)
if(a6.gW()){s=a7.as
s=!(s===B.f||s===B.e)}else s=!0
if(s)return a3.c1(a7,a8)
r=Math.min(a4.v(a9.a).length,a9.ga5())
if(r===0)return A.c([B.d],t.p)
q=a3.c2(a7,a8,!0)
p=new A.hv(a3)
for(s=q.length,o=null,n=1,m=0;m<q.length;q.length===s||(0,A.u)(q),++m){l=q[m]
k=A.cy(a7,a9,a4,a5,b0,l,0).a
if(k[2]>0)if(o!=null){j=p.$1(l)
i=p.$1(o)
if(typeof j!=="number")return j.dB()
if(typeof i!=="number")return A.jw(i)
i=j<i
j=i}else j=!0
else j=!1
if(j){n=k[2]
o=l}}if(o==null)return q
s=p.$1(o)
k=B.c.aV(B.b.ah(a6.c*a6.gaD()),n)
if(typeof s!=="number")return s.cc()
h=s+k
k=t.p
g=A.c([o],k)
for(s=a5.f.gau(),s=s.gB(s),j=a5.b,i=a7.f,f=t.S,e=a8.w,d=a4.c;s.j();){c=s.gn()
b=c.a
a=e.i(0,b)
if((a==null?0:a)===0)a=!(c.f&&d>=c.e)
else a=!1
if(a)continue
a=c.b
c=c.d
a0=1
for(;;){a1=j.i(0,"carryLimit")
a1.toString
if(!(a0<=Math.min(r,B.b.k(a1))))break
if(a*a0<=h){a1=j.i(0,"soldierLimit")
a1.toString
a1=B.b.k(a1)
a2=j.i(0,"soldierHp")
a2.toString
a2=c<i+a1*B.b.k(a2)
a1=a2}else a1=!1
if(a1)B.a.l(g,A.c1(a0,b,!1,f));++a0}}B.a.C(g,new A.hu(new A.hx(a3),p))
for(s=A.Z(g,0,A.W(a5.r.fy,"count",f),t.L),j=s.$ti,s=new A.r(s,s.gm(0),j.h("r<k.E>")),j=j.h("k.E");s.j();){i=s.d
if(i==null)i=j.a(i)
if(A.cy(a7,a9,a4,a5,b0,i,0).a[2]>0)return A.c([i],k)}return A.c([o],k)},
ag(a,b){var s,r,q,p,o
t.ef.a(a)
t.fy.a(b)
s=t.N
s=A.Y(s,s)
for(r=J.H(a);r.j();){q=r.gn()
s.u(0,"h:"+q.a,q.go)}for(r=b.length,p=0;p<b.length;b.length===r||(0,A.u)(b),++p){o=b[p]
s.u(0,"c:"+o.a,o.as)}return s},
ak(a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7=this,a8=null
t.L.a(b7)
if(!b1.d||!isFinite(b1.b)||J.j5(b1.a)||b0.fy||a9.as.q(0,b0.a))return a8
s=b1.b
r=a7.b
q=r.r
p=s+q.d
if(p>=b4)return a8
o=c2==="expedition"
if(o&&A.am(c3.b,a7.a.Q,r,a8).gW()&&s>q.at)return a8
n=b0.a
m=a9.y.i(0,n)
l=m==null
if(!l){if(m.z>a7.a.Q.b&&!b5)return a8
k=!1
if(m.b===c2){j=m.d
if(j===c3.a){j=m.r
if(j==(b6==null?a8:b6.a)){k=m.w
j=J.cA(k)
k=j.gaq(k)&&j.gbi(k).J(J.kT(b1.a))<32&&b0.as!==B.n}}}if(k)return a8}i=a9.M()
h=A.c([],t.w)
k=!b2
if(k){j=r.b
g=j.i(0,"battleBudget")
g.toString
f=Math.min(c3.ga5(),a7.a.Q.v(c3.a).length)
f=Math.max(1,f)
j=j.i(0,"supplySafety")
j.toString
p+=g*(b9+1)*f+s+j}if(p>q.p1)return a8
s=c3.a
j=b6==null
g=j?a8:b6.a
f=a7.a
e=f.Q
d=e.b
c=B.b.ah(isFinite(b4)?b4*60:Math.max(p,60)*60)
b=B.b.c8(q.CW*60)
a=b1.a
r=r.b
a0=r.i(0,"supplySeconds")
a0.toString
a0=B.b.ah(p/a0)
if(o)o=c3.b
else o=a8
a1=new A.ac(n,c2,c1,s,o,b3,g,a,0,d+c,d+b,a0,b2,b0.id+1)
o=!1
if(b2){g=i.L(s)
if((l?a8:m.as)===!0)o=(l?a8:m.d)===s
else o=!1
o=o?1:0
q=c0?Math.max(i.O(c3),c3.y+q.cy):i.O(c3)
q=g-o>=q}else q=o
if(q)return a8
q=b0.as
if(q===B.f||q===B.e){q=i.f
r=r.i(0,"soldierLimit")
r.toString
a2=Math.max(0,Math.min(q,b8+B.b.k(r)-b0.gP())-i.e)
if(a2>0){if(f.x===B.k)return a8
if(!i.aB(a2))return a8
B.a.l(h,new A.z(B.m,a8,b0.c,a8,a2,B.d))}r=t.S
a3=A.Y(r,r)
for(r=b7.length,q=i.w,f=f.x===B.k,a4=0;a4<b7.length;b7.length===r||(0,A.u)(b7),++a4){a5=b7[a4]
a3.aG(a5,new A.hy(),new A.hz())
o=q.i(0,a5)
if(o==null)o=0
l=a3.i(0,a5)
l.toString
if(o<l){if(f)return a8
if(!i.bS(a5))return a8
B.a.l(h,new A.z(B.B,a8,a8,a8,a5,B.d))}}if(!i.d1(b0,b7,a1,p))return a8
if(i.e<b8)return a8
if(c2==="intercept"||a.length>1)s=a8
B.a.l(h,new A.z(B.C,n,s,J.du(a),0,b7))}else{if(!i.dj(b0,a1))return a8
if(c2==="intercept"||a.length>1)s=a8
B.a.l(h,new A.z(B.O,n,s,J.du(a),0,B.d))}a6=i.ad(b5).a
s=i.d
if(s>=a6)s=k&&s===0
else s=!0
if(s)return a8
s=A.c([b0],t.e)
if(!j)s.push(b6)
r=e.K(b0.c)
r.toString
r=A.c([r],t.Y)
r.push(c3)
return new A.d7(i,new A.N(c1,h,a7.ag(s,r),A.c([a1],t.m),a6,b5))},
ce(a,b,c,d,e,f,g,h,i,j){return this.ak(a,b,c,d,!1,e,f,null,B.d,0,0,g,h,i,j)},
cg(a,b,c,d,e,f,g,h){return this.ak(a,b,c,d,!1,1/0,!1,null,B.d,0,0,e,f,g,h)},
bm(a,b,c,d,e,f,g,h,i,j){return this.ak(a,b,c,!1,d,1/0,!1,null,e,f,g,!1,h,i,j)},
bn(a,b,c,d,e,f,g,h,i){return this.ak(a,b,c,d,!1,e,f,null,B.d,0,0,!1,g,h,i)},
cj(a,b,c,d,e,f,g,h,i){return this.ak(a,b,c,!1,!1,d,e,f,B.d,0,0,!1,g,h,i)},
cf(a,b,c,d,e,f,g,h,i,j,k,l){return this.ak(a,b,c,!1,d,e,f,g,h,i,0,!1,j,k,l)},
ci(a,b,c,d,e,f,g,h){return this.ak(a,b,c,!1,!1,d,e,null,B.d,0,0,!1,f,g,h)},
bf(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a5.k1!=null)return B.u
s=this.a.Q
r=s.K(a4.c)
r.toString
q=a4.as
p=q===B.f||q===B.e?r.f.bW(r.e,a5.z):a4.z
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
g=h.ba(p)
if(!(g<m.length))return A.n(m,g)
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
a0=A.o(new A.d(A.c([(m-a)/j,(m+a)/j],t.n),t.db.a(new A.hl()),g),g.h("b.E"))
if(a0.length!==0)b=B.a.aa(a0,B.y)}for(m=s.f,a1=B.u,a2=0;a2<3;++a2){a3=new A.J(q+l*b,r+k*b)
if(!h.q(0,a3)||B.a.H(m,new A.hm(a3)))return B.u
a1=i.dr(a4,a3,s)
if(!a1.d)return a1
j=a1.b
if(Math.abs(b-j)<0.1)break
b=(b+j)/2}return a1}}
A.hk.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.c.X(r,this.b.f.a4(r))<=s.b.r.at},
$S:1}
A.hn.prototype={
$1(a){var s
t.o.a(a)
s=this.b.w.i(0,a.a)
if((s==null?0:s)<=0){s=this.a.a
s=(s.x!==B.k||this.c)&&a.f&&s.Q.c>=a.e}else s=!0
return s},
$S:8}
A.ho.prototype={
$2(a,b){var s,r=t.o
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.c.t(a.a,b.a):B.c.t(r,s)},
$S:20}
A.hp.prototype={
$1(a){return t.o.a(a).d<this.a.gaP()},
$S:8}
A.hq.prototype={
$2(a,b){var s=t.o
s.a(a)
s.a(b)
return a.c-a.d>b.c-b.d?a:b},
$S:49}
A.hr.prototype={
$1(a){t.L.a(a)
return a.length===1&&J.du(a)===this.a.a},
$S:33}
A.hs.prototype={
$1(a){var s
t.o.a(a)
if(a.d>0){s=this.a.w.i(0,a.a)
s=(s==null?0:s)>0}else s=!1
return s},
$S:8}
A.ht.prototype={
$1(a){t.L.a(a)
return a.length===1&&J.du(a)===this.a.a},
$S:33}
A.hv.prototype={
$1(a){return J.kS(t.L.a(a),0,new A.hw(this.a),t.S)},
$S:51}
A.hw.prototype={
$2(a,b){return A.f(a)+this.a.b.f.i(0,A.f(b)).b},
$S:18}
A.hx.prototype={
$1(a){var s,r,q,p,o,n,m,l
t.L.a(a)
for(s=this.a.b,r=s.r.rx,s=s.f,q=0,p=0;p<a.length;++p){o=s.i(0,a[p])
n=o.c
m=o.d
l=p===0?1:r
q+=(n-m)*l}return q},
$S:52}
A.hu.prototype={
$2(a,b){var s,r=t.L
r.a(a)
r.a(b)
r=this.a
s=J.jD(r.$1(b),r.$1(a))
if(s!==0)r=s
else{r=this.b
r=J.jD(r.$1(a),r.$1(b))}return r},
$S:53}
A.hy.prototype={
$1(a){return A.f(a)+1},
$S:6}
A.hz.prototype={
$0(){return 1},
$S:5}
A.hl.prototype={
$1(a){return A.aj(a)>=0},
$S:14}
A.hm.prototype={
$1(a){return t.q.a(a).f.q(0,this.a)},
$S:1}
A.aD.prototype={
aL(){return"AiDecisionStage."+this.b}}
A.ap.prototype={
aL(){return"AiActionKind."+this.b}}
A.z.prototype={
I(){var s=this,r=s.d
r=r==null?null:A.c([r.a,r.b],t.n)
return A.Q(["kind",s.a.a,"hero",s.b,"city",s.c,"point",r,"amount",s.e,"weapons",s.f],t.N,t.X)}}
A.ac.prototype={
I(){var s,r,q,p,o,n=this,m=A.c([],t.A)
for(s=n.w,r=s.length,q=t.n,p=0;p<s.length;s.length===r||(0,A.u)(s),++p){o=s[p]
m.push(A.c([o.a,o.b],q))}return A.Q(["hero",n.a,"role",n.b,"deadline",n.y,"commit",n.z,"city",n.d,"enemy",n.r,"points",m,"leg",n.x,"gold",n.Q,"slot",n.as,"reason",n.c,"order",n.at,"targetCountry",n.e,"attrition",n.f],t.N,t.X)}}
A.N.prototype={
I(){var s,r,q,p=this,o=t.d,n=A.c([],o)
for(s=p.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q)n.push(s[q].I())
o=A.c([],o)
for(s=p.d,r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q)o.push(s[q].I())
return A.Q(["reason",p.a,"actions",n,"deps",p.c,"tasks",o,"floor",p.e,"emergency",p.f],t.N,t.X)}}
A.bM.prototype={
I(){var s,r,q,p=this,o=A.c([],t.d)
for(s=p.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q)o.push(s[q].I())
return A.Q(["phase",p.a,"target",p.b,"gold",p.c,"heroes",p.d,"groups",o,"notes",p.f,"limited",p.r,"assessments",p.w,"routeSteps",p.x,"expansions",p.y],t.N,t.X)}}
A.ec.prototype={
I(){var s,r,q,p=this,o=p.Q.I(),n=A.c([],t.d)
for(s=p.as,r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q)n.push(s[q].I())
return A.Q(["protocol",1,"session",p.a,"id",p.d,"rules",p.b,"map",p.c,"observation",o,"deadline",p.e,"tasks",n,"seed",p.f,"priority",p.r,"idle",p.w,"stage",p.x.b,"offensiveCountry",p.y,"offensiveCity",p.z],t.N,t.X)}}
A.eb.prototype={
I(){var s=this
return A.Q(["protocol",1,"session",s.a,"id",s.d,"country",s.e,"rules",s.b,"map",s.c,"tick",s.f,"deadline",s.r,"plan",s.x.I(),"micros",s.w,"error",s.y],t.N,t.X)}}
A.iO.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:9}
A.iP.prototype={
$0(){var s=this,r=s.a,q=r.c,p=s.b,o=!1
if(p.length>1)if(J.jE(s.c))if(q!=null)if(!q.r){o=s.d
o=o.f>=o.r*0.65&&q.b>=s.e.r.ch}if(o){r=q.b
o=q.c
return new A.aM([!0,r,s.f.bl(2,p.length),o])}return new A.aM([!1,r.b,0,r.a])},
$S:54}
A.hD.prototype={
de(g6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3=this,g4=null,g5={}
g5.a=g6
s=g3.a
r=s.Q
q=A.c([],t.Z)
p=g3.b
o=s.y
s=s.z
n=A.c9(r,g6,p,s,o)
m=r.r
l=A.h(m)
k=l.h("d<1>")
j=A.o(new A.d(m,l.h("e(1)").a(new A.hG(r)),k),k.h("b.E"))
B.a.C(j,new A.hH())
m=r.f
l=A.h(m)
k=l.h("e(1)")
l=l.h("d<1>")
i=l.h("b.E")
h=A.o(new A.d(m,k.a(new A.hI(g3,r,n)),l),i)
if(j.length!==0)B.a.C(h,new A.hT(g3,j,r))
g=A.bp(h,t.q)
f=g==null
e=f?g4:A.am(g.b,r,p,g4)
d=e==null
c=new A.hF(g3,(d?g4:e.gW())===!0?Math.min(B.b.ah(e.c*e.gaD()),Math.max(0,g6.d-g6.U().a)):0)
b=new A.hE(g5,g3,q)
a=r.gN()
a0=A.o(a,a.$ti.h("b.E"))
B.a.C(a0,new A.hV(g3))
a=t.S
a1=Math.min(g5.a.f,B.a.D(a0,0,new A.hW(g5,g3),a))
if(a0.length!==0&&a1>g5.a.e){a2=g5.a.M()
a3=Math.max(0,a2.d-Math.max(a2.U().a,p.r.f))
a4=a2.e
a5=p.b.i(0,"soldierCost")
a5.toString
a6=Math.min(a1-a4,B.b.aV(a3,B.b.k(a5)))
if(a6>0&&a2.aB(a6)&&c.$1(a2))b.$4(a2,A.c([new A.z(B.m,g4,B.a.gF(a0).a,g4,a6,B.d)],t.w),"\u6309\u5168\u56fd\u73b0\u6709\u5b88\u5c06\u548c\u5f85\u51fa\u5f81\u5c06\u9886\u8865\u5175\uff0c\u4fdd\u7559\u7cae\u8349\u3001\u6708\u4ff8\u548c\u6d41\u52a8\u8d44\u91d1",B.a.gF(a0))}for(a4=a0.length,a5=p.r,a7=a5.fx-2,a8=p.f,a9=p.b,b0=g3.d,b1=t.a,b2=g3.e,b3=t.w,b4=0;b4<a0.length;a0.length===a4||(0,A.u)(a0),++b4){b5=a0[b4]
if(q.length>=a7)break
b6=b5.a
b7=g5.a.v(b6)
b8=A.h(b7)
b9=b8.h("d<1>")
c0=A.o(new A.d(b7,b8.h("e(1)").a(new A.hX()),b9),b9.h("b.E"))
B.a.C(c0,new A.hY())
if(b7.length!==0&&a8.gaq(a8)){c1=B.a.aa(b7,new A.hZ())
b8=a8.gau()
b9=A.l(b8)
c2=b9.h("d<b.E>")
c3=A.o(new A.d(b8,b9.h("e(b.E)").a(new A.i_(r)),c2),c2.h("b.E"))
B.a.C(c3,new A.i0())
c4=A.o(new A.d(m,k.a(new A.hJ(g5,g3,r,c1)),l),i)
B.a.C(c4,new A.hK(g3,c1,r))
c5=c4.length===0?0:2
b8=A.h(c4)
b9=b8.h("y<1>")
c2=new A.y(c4,0,3,b9)
c2.V(c4,0,3,b8.c)
c2=new A.r(c2,c2.gm(0),b9.h("r<k.E>"))
b9=b9.h("k.E")
while(c2.j()){b8=c2.d
if(b8==null)b8=b9.a(b8)
if(c3.length===0)c6=A.c([],b1)
else{c6=a9.i(0,"carryLimit")
c6.toString
c6=A.c1(B.b.k(c6),B.a.gF(c3).a,!1,a)}c7=A.cy(c1,b8,r,p,b0,c6,0).a[2]
if(c7>0){if(d)b9=g4
else b9=e.a!==e.d.a&&e.b>=e.e.r.w
if(b9===!0){b8=b8.b
b8=b8===(f?g4:g.b)}else b8=!1
if(b8){c5=c7
break}c5=c7
break}}c8=c5}else c8=1
c9=c8>0&&B.a.H(m,new A.hL(r))&&g5.a.L(b6)<g5.a.af(b5)+c8
if(c0.length!==0)if(b5.at==null){b8=b7.length
b9=g5.a.x.i(0,b6)
c2=!0
if(b9==null)b9=b5.d
if(b8<=b9){if(c9){b8=b7.length
b9=g5.a.x.i(0,b6)
if(b9==null)b9=b5.d
b9=b8>=b9
b8=b9}else b8=!1
if(!b8){b8=b2.i(0,b6)
if(b8==null)b8=g4
else{b8=b8.f
b8=b8==null?g4:b8.a}b8=b8===B.p}else b8=c2}else b8=c2}else b8=!1
else b8=!1
if(b8){a2=g5.a.M()
if(a2.aH(b5,B.a.gF(c0))){b8=b2.i(0,b6)
if(b8==null)b8=g4
else b8=b8.d.length!==0||b8.a.at!=null
b8=c.$2$civilian(a2,b8!==!0)}else b8=!1
if(b8)b.$5$hero(a2,A.c([new A.z(B.l,B.a.gF(c0).a,b6,g4,0,B.d)],b3),"\u63d0\u9ad8\u5fc5\u8981\u57ce\u9632\u4e0e\u8fce\u6218\u540d\u989d\uff0c\u4fdd\u7559\u5df2\u51fa\u5f81\u90e8\u961f\u7684\u540e\u52e4\u8d44\u91d1",b5,B.a.gF(c0))}if(c9){b8=b2.i(0,b6)
if(b8==null)b8=g4
else b8=b8.d.length!==0||b8.a.at!=null
if(b8===!0){b8=g5.a.L(b6)
b9=b5.at
if(b9==null)b9=b5.d
else{c2=b5.cy?1:0
c2=B.c.A(b9-b5.ax-c2,0,5)
b9=c2}b9=b8<b9
b8=b9}else b8=!0}else b8=!1
if(b8){a2=g5.a.M()
b8=b2.i(0,b6)
if(b8==null)b8=g4
else b8=b8.d.length!==0||b8.a.at!=null
b9=f?g4:g.b
if(a2.bj(b5,b8===!0,b9)&&c.$1(a2))b.$4(a2,A.c([new A.z(B.v,g4,b6,g4,0,B.d)],b3),"\u8865\u5145\u7559\u5b88\u548c\u540e\u7eed\u6269\u5f20\u6240\u9700\u5c06\u9886\uff0c\u7b7e\u7ea6\u4e0e\u6708\u4ff8\u6309\u6700\u9ad8\u8d39\u7528\u9884\u7559",b5)}}d0=A.c([],t.e)
for(a4=a0.length,b4=0;b4<a0.length;a0.length===a4||(0,A.u)(a0),++b4){b5=a0[b4]
a7=b5.a
a8=b2.i(0,a7)
if(a8==null)a8=g4
else a8=a8.d.length!==0||a8.a.at!=null
if(a8===!0)continue
b7=g5.a.v(a7)
a7=A.h(b7)
a8=a7.h("d<1>")
d1=A.o(new A.d(b7,a7.h("e(1)").a(new A.hM()),a8),a8.h("b.E"))
B.a.C(d1,new A.hN())
a7=A.f(Math.max(0,b7.length-g5.a.af(b5)))
a8=A.h(d1)
b1=new A.y(d1,0,a7,a8.h("y<1>"))
b1.V(d1,0,a7,a8.c)
B.a.G(d0,b1)}B.a.C(d0,new A.hO())
d2=g4
d3=g4
d4=0
d5=1
if(d0.length!==0){d6=B.a.gF(d0)
d7=A.c9(r,g5.a,p,s,o)
c4=A.o(new A.d(m,k.a(new A.hP(g5,g3,r)),l),i)
B.a.C(c4,new A.hQ(g3,d6,r))
s=A.Z(c4,0,A.W(a5.go,"count",a),A.h(c4).c)
o=s.$ti
s=new A.r(s,s.gm(0),o.h("r<k.E>"))
m=g3.c
l=m.c
k=a5.ok
i=d7.f
a5=a5.k4
a4=t.aO
a7=t.eO
a8=a7.h("b.E")
o=o.h("k.E")
d8=d4
d9=d2
e0=!1
for(;;){if(!s.j()){d4=d8
d2=d9
break}A:{b1=s.d
if(b1==null)b1=o.a(b1)
e1=A.o(new A.d(d0,a4.a(new A.hR(g3,b1)),a7),a8)
if(e1.length===0)break A
d6=B.a.gF(e1)
for(b2=m.c6(d6,g5.a,b1,b0),b6=b2.length,b8=b1.e,e2=b1.a,b4=0;b4<b2.length;b2.length===b6||(0,A.u)(b2),++b4){c3=b2[b4]
e3={}
e4=A.cy(d6,b1,r,p,b0,c3,0)
b9=i.i(0,e2)
e5=b9==null?g4:b9.length
if(e5==null)e5=0
b9=e4.a
e6=b9[2]-e5
e7=d7.ga0()!=null&&d7.ga0()!==e2
c2=b9[2]
c6=!0
if(c2!==0)if(e6>0)if(e6<=e1.length)if(e7)c2=c2!==1||b9[1]<a5
else c2=!1
else c2=c6
else c2=c6
else c2=c6
if(c2)continue
e8=g5.a.M()
e8.d=1e6
e3.a=e8
e9=A.c([],b3)
f1=1/0
f2=0
f3=0
for(;;){f0=!1
if(!(f3<e6)){f0=!0
break}if(!(f3<e1.length))return A.n(e1,f3)
f4=e1[f3]
if(A.cy(f4,b1,r,p,b0,c3,0).a[2]===0)break
f5=l.aS(f4,b8,r,b1)
c2=f5.b
f1=Math.min(f1,c2)
f2=Math.max(f2,c2)
if(!f5.d||f2-f1>k)break
f6=B.a.D(a0,0,new A.hS(e3,g3,f4),a)
c2=e3.a
c6=c2.f
f7=a9.i(0,"soldierLimit")
f7.toString
f7=Math.min(f6,Math.max(0,c6-B.b.k(f7)))
f8=m.bm(c2,f4,f5,b9[0],c3,f7,e5+f3,"\u6309\u5171\u540c\u653b\u9632\u95e8\u69db\u6838\u7b97\u6574\u961f\u6b66\u5668\u4e0e\u8def\u8d39","expedition",b1)
if(f8==null)break
e3.a=f8.a
c2=f8.b.b
c6=A.h(c2)
B.a.G(e9,new A.d(c2,c6.h("e(1)").a(new A.hU()),c6.h("d<1>")));++f3}if(!f0)continue
c2=e3.a
f9=1e6-c2.d+c2.U().a
c2=g5.a
if(c2.d<f9){if(d8===0||f9<d8){d5=b9[2]
d8=f9
d9=e2}continue}a2=c2.M()
c2=e9.length
g0=0
for(;;){if(!(g0<e9.length)){f0=!0
break}if(!a2.bS(e9[g0].e)){f0=!1
break}e9.length===c2||(0,A.u)(e9);++g0}if(!f0||!c.$1(a2))continue
if(e9.length!==0){b1=b9[2]
b2=r.K(d6.c)
b2.toString
b.$4(a2,e9,"\u6309\u76ee\u6807\u57ce\u9632\u4e0e\u5b88\u5c06\u914d\u9f50"+b1+"\u540d\u8fdb\u653b\u5c06\u9886\u7684\u6b66\u5668\uff0c\u9884\u7559\u6574\u961f\u7cae\u8349",b2)}d8=d4
d3=e2
d9=d2
e0=!0
break}if(e0){d4=d8
d2=d9
break}}}}s=d3==null
g1=r.K(s?d2:d3)
if(g1==null)g1=g
g2=g1==null?g4:A.am(g1.b,r,p,g5.a.x)
p=d2==null?"preparing":"saving"
s=s?d2:d3
if(s==null)if((d?g4:e.gW())===!0)s=f?g4:g.a
else s=g4
b0=b0.b
o=b0.e
m=b0.c
l=b0.d
b0=b0.b
k=A.c([],t.s)
if(q.length===0)k.push("\u672c\u8f6e\u65e0\u5fc5\u8981\u4e14\u53ef\u652f\u4ed8\u7684\u91c7\u8d2d\uff0c\u4fdd\u7559\u56fd\u5e93")
if((g2==null?g4:g2.gW())===!0)k.push("\u76ee\u6807\u56fd\u5360\u6709 "+g2.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.ah(g2.c*g2.gaD())+" \u91d1\u5e01\uff0c\u51c6\u5907\u5f3a\u5316\u6b66\u5668\u548c\u8f6e\u653b\u5175\u529b")
return new A.bM(p,s,d4,d5,q,k,o,m,l,b0)}}
A.hG.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&a.f>0&&!a.fy},
$S:0}
A.hH.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ab(s.a(b),!0),A.ab(a,!0))},
$S:2}
A.hI.prototype={
$1(a){t.q.a(a)
return a.b!==this.b.a&&this.c.aA(a)&&this.a.c.c_(a)},
$S:1}
A.hT.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bk(o.a(b),B.a.gF(s),r,p,q,null),A.bk(a,B.a.gF(s),r,p,q,null))},
$S:4}
A.hF.prototype={
$2$civilian(a,b){var s=a.d,r=Math.max(a.U().a,this.a.b.r.f)
return s>=r+(b?this.b:0)},
$1(a){return this.$2$civilian(a,!1)},
$S:55}
A.hE.prototype={
$5$hero(a,b,c,d,e){var s,r
t.f3.a(b)
this.a.a=a
s=this.b
r=A.c([],t.e)
if(e!=null)r.push(e)
B.a.l(this.c,new A.N(c,b,s.c.ag(r,A.c([d],t.Y)),B.r,Math.max(a.U().a,s.b.r.f),!1))},
$4(a,b,c,d){return this.$5$hero(a,b,c,d,null)},
$S:56}
A.hV.prototype={
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
$S:4}
A.hW.prototype={
$2(a,b){var s,r
A.f(a)
t.q.a(b)
s=this.a.a.v(b.a).length
r=this.b.b.b.i(0,"soldierLimit")
r.toString
return a+s*B.b.k(r)},
$S:7}
A.hX.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.hY.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.hZ.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return A.ab(a,!0)>A.ab(b,!0)?a:b},
$S:19}
A.i_.prototype={
$1(a){t.o.a(a)
return a.f&&a.d===0&&this.a.c>=a.e},
$S:8}
A.i0.prototype={
$2(a,b){var s=t.o
s.a(a)
return B.c.t(s.a(b).c,a.c)},
$S:20}
A.hJ.prototype={
$1(a){var s,r,q,p=this
t.q.a(a)
s=p.c
if(a.b!==s.a){r=p.b
q=r.a
s=A.c9(s,p.a.a,r.b,q.z,q.y).aA(a)&&r.c.aO(p.d,a)}else s=!1
return s},
$S:1}
A.hK.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bk(o.a(b),s,r,p,q,null),A.bk(a,s,r,p,q,null))},
$S:4}
A.hL.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.hM.prototype={
$1(a){return t.r.a(a).db},
$S:0}
A.hN.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ab(s.a(b),!0),A.ab(a,!0))},
$S:2}
A.hO.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ab(s.a(b),!0),A.ab(a,!0))},
$S:2}
A.hP.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.c9(s,this.a.a,r.b,q.z,q.y).aA(a)&&r.c.c_(a)}else s=!1
return s},
$S:1}
A.hQ.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bk(o.a(b),s,r,p,q,null),A.bk(a,s,r,p,q,null))},
$S:4}
A.hR.prototype={
$1(a){return this.a.c.aO(t.r.a(a),this.b)},
$S:0}
A.hS.prototype={
$2(a,b){var s,r,q
A.f(a)
t.q.a(b)
s=this.a
r=b.a
q=s.a.v(r).length
s=Math.min(Math.max(0,q-(r===this.c.c?1:0)),s.a.af(b))
q=this.b.b.b.i(0,"soldierLimit")
q.toString
return a+s*B.b.k(q)},
$S:7}
A.hU.prototype={
$1(a){return t.T.a(a).a===B.B},
$S:30}
A.bn.prototype={}
A.ed.prototype={
X(b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=b1.a,a7=b1.b,a8=A.v(b0.a)+","+A.v(b0.b)+":"+A.v(a6)+","+A.v(a7),a9=a5.d
if(a9.Y(a8)){a6=a9.i(0,a8)
a6.toString
return a6}for(s=a5.a,r=s.b,q=s.c,p=r+q+8,o=r-1,--q,n=a5.b,m=n.b,n=n.d,s=s.d,l=s.length,k=n.length,j=a5.c,i=b0,h=0,g=0;g<p;++g){f=i.J(b1)
if(f<1e-7){if(a9.a>=256){e=new A.a6(a9,A.l(a9).h("a6<1>")).gB(0)
if(!e.j())A.cB(A.aH())
a9.aj(0,e.gn())}a9.u(0,a8,h)
return h}if(!j.dl())return 1/0
d=i.a
c=(a6-d)/f
b=i.b
a=(a7-b)/f
a0=B.c.A(B.b.Z((d+c*1e-7)/16),0,o)
a1=B.c.A(B.b.Z((b+a*1e-7)/16),0,q)
a2=new A.ee()
a3=a2.$3(d,c,a0)
a2=a2.$3(b,a,a1)
a4=Math.min(f,Math.min(A.kp(a3),A.kp(a2)))
a2=m.i(0,"marchSpeed")
a2.toString
a3=a1*r+a0
if(!(a3>=0&&a3<l))return A.n(s,a3)
a3=s[a3]
if(!(a3<k))return A.n(n,a3)
h+=a4/(a2*n[a3])
i=new A.J(d+c*a4,b+a*a4)}return 1/0},
ao(a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=b0.K(a8.c),a5=a8.as,a6=(a5===B.f||a5===B.e)&&a4!=null?a4.f.bW(a4.e,a9):a8.z,a7=b2==null?a9:b2.f.bQ(a6,a9)
a5=this.a
if(!a5.q(0,a7))return B.u
s=new A.ef(b0,a8,b2)
r=new A.eh(this,b0,a8)
q=t._
p=A.c([A.c([a7],q)],t.a5)
if(!s.$2(a6,a7))o=b1&&r.$2(a6,a7)
else o=!0
if(o){n=a6.J(a7)
o=a6.a
m=a7.a
l=(o+m)/2
k=a6.b
j=a7.b
i=(k+j)/2
if(n>0)for(h=[-96,96,-192,192],k=(j-k)/n,o=(m-o)/n,g=0;g<4;++g){f=h[g]
e=new A.J(l-k*f,i+o*f)
if(a5.q(0,e))B.a.l(p,A.c([e,a7],q))}}for(a5=p.length,d=null,g=0;g<p.length;p.length===a5||(0,A.u)(p),++g){c=p[g]
q=c.length
a=a6
a0=0
a1=!1
a2=0
for(;;){if(!(a2<c.length)){b=!0
break}a3=c[a2]
if(s.$2(a,a3)){b=!1
break}a1=a1||r.$2(a,a3)
a0+=this.X(a,a3)
c.length===q||(0,A.u)(c);++a2
a=a3}q=!0
if(b)if(isFinite(a0))q=b1&&a1
if(q)continue
if(d==null||a0<d.b)d=new A.bn(c,a0,!0)}return d==null?B.S:d},
aS(a,b,c,d){return this.ao(a,b,c,!1,d)},
dr(a,b,c){return this.ao(a,b,c,!1,null)}}
A.ee.prototype={
$3(a,b,c){var s
if(Math.abs(b)<1e-12)s=1/0
else s=Math.max(1e-8,((b>0?c+1:c)*16-a)/b)
return s},
$S:57}
A.ef.prototype={
$2(a,b){return B.a.H(this.a.f,new A.eg(this.b,this.c,a,b))},
$S:34}
A.eg.prototype={
$1(a){var s,r=this
t.q.a(a)
if(a.b!==r.a.b){s=r.b
s=s==null?null:s.a
s=a.a!==s&&a.f.bZ(r.c,r.d)!=null}else s=!1
return s},
$S:1}
A.eh.prototype={
$2(a,b){return B.a.H(this.b.r,new A.ei(this.a,this.c,b,a))},
$S:34}
A.ei.prototype={
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
l=B.b.A(((k.a-q)*p+(k.b-o)*n)/m,0,1)}s=r.aE(s,l).J(a.z)
r=j.a.b.b.i(0,"encounterDistance")
r.toString
return s<r+12},
$S:0}
A.a_.prototype={
I(){var s=this
return A.c([s.a,s.b,s.c,s.d,s.e,s.f,s.r],t.Q)}}
A.ej.prototype={
bc(a,b,c,d){var s,r,q
if(c){s=this.e
if(!(d<s.length))return A.n(s,d)
s=s[d]}else s=1
s=B.c.A(B.b.Z(a*s),0,63)
if(b>0){r=this.b
q=r.i(0,"defenseBase")
q.toString
q=B.b.k(q)
r=r.i(0,"defenseStep")
r.toString
r=q+(b-1)*B.b.k(r)}else r=0
return B.c.A(s+r,0,63)},
bb(a,b,c){return this.bc(a,b,c,0)},
cS(a,b){return this.bc(a,0,b,0)},
al(a){var s,r,q="maxLevel",p=this.b,o=p.i(0,"firstYearCityLevel")
if(o==null){o=p.i(0,q)
o.toString
o=B.b.k(o)}o=B.b.k(o)
s=p.i(0,"initialYear")
s=B.b.k(s==null?1:s)
r=p.i(0,q)
r.toString
r=B.c.A(a-s,0,B.b.k(r))
s=p.i(0,"cityLevelsPerYear")
s=B.b.k(s==null?1:s)
p=p.i(0,q)
p.toString
return B.c.A(o+r*s,1,B.b.k(p))},
I(){var s,r,q,p=this,o=A.c([],t.eG)
for(s=p.f.gau(),s=s.gB(s),r=t.Q;s.j();){q=s.gn()
o.push(A.c([q.a,q.b,q.c,q.d,q.e,q.f,q.r],r))}return A.Q(["version",p.a,"values",p.b,"upgrades",p.c,"movement",p.d,"field",p.e,"weapons",o,"tuning",p.r.I()],t.N,t.X)}}
A.e0.prototype={
ba(a){var s=this.d,r=this.b
r=B.c.A(B.b.Z(a.b/16),0,this.c-1)*r+B.c.A(B.b.Z(a.a/16),0,r-1)
if(!(r>=0&&r<s.length))return A.n(s,r)
return s[r]},
q(a,b){var s,r=b.a
if(isFinite(r)){s=b.b
r=isFinite(s)&&r>=0&&s>=0&&r<this.b*16&&s<this.c*16}else r=!1
return r},
I(){var s=this
return A.Q(["version",s.a,"width",s.b,"height",s.c,"terrain",s.d],t.N,t.X)}}
A.el.prototype={
dg(a){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=t.d1.a(B.i.d_(a,null))
switch(J.b_(s,"kind")){case"init":if(!J.ao(J.b_(s,"protocol"),1)||!J.ao(J.b_(s,"build"),"93b626df"))throw A.j(B.a4);++i.f
i.e=null
p=i.r
if(p.a>0){p.b=p.c=p.d=p.e=p.f=null
p.a=0
p.aY()}p=t.f
o=t.N
n=t.z
i.c=A.l_(A.as(p.a(J.b_(s,"rules")),o,n))
n=A.as(p.a(J.b_(s,"map")),o,n)
p=A.G(n.i(0,"version"))
m=A.f(n.i(0,"width"))
l=A.f(n.i(0,"height"))
n=A.c2(t.R.a(n.i(0,"terrain")),!0,t.S)
k=new Uint8Array(A.mc(n))
if(m<=0||l<=0||n.length!==m*l)A.cB(B.a6)
i.d=new A.e0(p,m,l,k)
i.a.$1(B.i.an(t.G.a(A.Q(["kind","ready","rules",i.c.a,"map",p,"backend",i.b],o,t.X)),null))
break
case"cancel":p=i.e
o=J.b_(s,"id")
if(p==null?o==null:p===o)i.r.l(0,A.f(J.b_(s,"id")))
break
case"plan":if(i.c==null||i.d==null||i.e!=null){p=A.jW("AI \u5c1a\u672a\u5c31\u7eea\u6216\u5df2\u6709\u8bf7\u6c42\u6267\u884c\u4e2d")
throw A.j(p)}r=A.kY(A.as(t.f.a(J.b_(s,"request")),t.N,t.z))
i.e=r.d
i.aN(r,i.f)
break
default:throw A.j(B.a5)}}catch(j){q=A.aP(j)
i.a.$1(B.i.an(t.G.a(A.Q(["kind","error","message",J.bm(q)],t.N,t.X)),null))}},
aN(a,b){return this.cJ(a,b)},
cJ(a3,a4){var s=0,r=A.mx(t.x),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
var $async$aN=A.mM(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:a1=new A.i2()
$.jB()
a1.bp()
m=a1
p=4
i=n.c
i.toString
h=n.d
h.toString
g=new A.ek(i.r)
f=new A.ew(i,h,a3,g,A.Y(t.S,t.b))
e=t.N
h=new A.ed(h,i,g,A.Y(e,t.i))
f.e=h
f.f=new A.es(i,g,A.Y(e,t.cM))
f.r=new A.hj(a3,i,h)
l=f
k=0
i=l.bq(),h=i.$ti,i=new A.aN(i.a(),h.h("aN<1>")),h=h.c,g=n.r,d=a3.d,c=t.x
case 7:if(!i.j()){s=8
break}b=i.b
if(b==null)h.a(b)
if(a4!==n.f||g.q(0,d)){if(a4===n.f){n.e=null
g.aj(0,d)
n.a.$1(B.i.an(t.G.a(A.Q(["kind","cancelled","id",d],e,t.X)),null))}s=1
break}b=k
if(typeof b!=="number"){q=b.cc()
s=1
break}a=b+1
k=a
s=a>=n.c.r.id?9:10
break
case 9:k=0
b=m
if(b.b==null)b.b=$.hC.$0()
s=11
return A.m4(A.ld(B.H,c),$async$aN)
case 11:m.bp()
case 10:s=7
break
case 8:if(a4!==n.f){s=1
break}if(g.aj(0,d)){n.e=null
n.a.$1(B.i.an(t.G.a(A.Q(["kind","cancelled","id",d],e,t.X)),null))
s=1
break}n.e=null
i=l.w
i.toString
n.a.$1(B.i.an(t.G.a(A.Q(["kind","reply","reply",A.jH(a3,i,null,m.gbY()).I()],e,t.X)),null))
p=2
s=6
break
case 4:p=3
a2=o.pop()
j=A.aP(a2)
if(a4!==n.f){s=1
break}n.e=null
i=A.c(["\u89c4\u5212\u5931\u8d25\uff0c\u4e3b\u73af\u5883\u4fdd\u7559\u6709\u9650\u5b89\u5168\u4fdd\u62a4"],t.s)
h=m.gbY()
n.a.$1(B.i.an(t.G.a(A.Q(["kind","reply","reply",A.jH(a3,new A.bM("preparing",null,0,1,B.af,i,!1,0,0,0),J.bm(j),h).I()],t.N,t.X)),null))
s=6
break
case 3:s=2
break
case 6:case 1:return A.m6(q,r)
case 2:return A.m5(o.at(-1),r)}})
return A.m7($async$aN,r)}}
A.j1.prototype={
$1(a){t.r.a(a)
return a.w*3+a.f*0.35+a.gP()*8},
$S:59}
A.j2.prototype={
$1(a){var s
t.r.a(a)
if(a.c===this.a.a){s=a.as
s=!(s===B.f||s===B.e)}else s=!1
return s},
$S:0}
A.j3.prototype={
$2(a,b){var s
A.aj(a)
t.r.a(b)
s=A.ad(b)
return a+s*(b.k1==null?0.12:0.03)},
$S:22}
A.a2.prototype={}
A.ar.prototype={
gae(){var s,r=this.a
if(r.at!=null)r=r.db
else{r=this.d
if(r.length===0)r=1/0
else{s=A.h(r)
s=new A.O(r,s.h("i(1)").a(new A.eo()),s.h("O<1,i>")).aa(0,B.y)
r=s}}return r}}
A.eo.prototype={
$1(a){return t.O.a(a).b},
$S:61}
A.i4.prototype={
dk(c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7=this,b8="marchSpeed",b9=b7.a,c0=c3.a,c1=b9.v(c0),c2=A.c([],t.k)
for(s=b9.r,r=s.length,q=c3.e,p=c3.f,o=b7.b,n=o.b,o=o.r.b,m=q.a,l=q.b,k=c3.ay,j=c3.b,i=0;i<r;++i){h=s[i]
if(h.b!==j){g=h.as
g=g===B.f||g===B.e||h.f<=0}else g=!0
if(g)continue
if(h.a===k){B.a.l(c2,new A.a2(h,0,1))
continue}if(h.fy)continue
g=h.z
f=g.J(q)
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
if(p.a4(a4).J(a4)>48)continue}d=n.i(0,b8)
d.toString
a5=A.n_(q,o,e,d,p,g,new A.i5(b7),c)
if(a5==null)continue
if(h.as===B.n||a1)g=0.35
else if(a2>0.8)g=1
else g=f<72?0.9:0.55
B.a.l(c2,new A.a2(h,a5,g))}B.a.C(c2,new A.i6())
c0=A.h(c1)
r=t.r
a6=A.bp(new A.d(c1,c0.h("e(1)").a(new A.i7(c3)),c0.h("d<1>")),r)
q=A.c([],t.e)
if(a6!=null)q.push(a6)
c0=c0.h("L<1>")
B.a.G(q,new A.L(c1,c0).br(0,c0.h("e(k.E)").a(new A.i8(a6))))
c0=t.S
a7=A.Z(q,0,A.W(c3.ga5(),"count",c0),r).ab(0)
a8=A.Y(t.N,c0)
a9=B.a.ap(b9.w,new A.i9(c3)).c
for(b9=a7.length,i=0;c0=a7.length,i<c0;a7.length===b9||(0,A.u)(a7),++i){b0=a7[i]
if(b0.as===B.e)b1=0
else{c0=n.i(0,"soldierLimit")
c0.toString
b1=Math.min(a9,B.b.k(c0)-b0.gP())}a9-=b1
a8.u(0,b0.a,b0.gP()+b1)}b9=c2.length
b2=null
if(b9!==0&&c0!==0)for(c0=c3.cy,r=c3.at,q=c3.ax,p=r==null,o=b7.d,n=c3.d,b3=0;b3<a7.length;++b3,b9=l){b4=a7[b3]
for(m=b4.a,b5=null,i=0;l=c2.length,i<l;c2.length===b9||(0,A.u)(c2),++i){l=c2[i].a
if(p)k=n
else{k=c0?1:0
k=B.c.A(r-q-k,0,5)}b6=o.bd(b4,l,l.ok,Math.max(1,k-b3),!1,a8.i(0,m))
if(b5==null||b6.b<b5.b)b5=b6}if(b2==null||b5.b>b2.b)b2=b5}b9=A.h(s)
return new A.ar(c3,c1,c2,b2,new A.d(s,b9.h("e(1)").a(new A.ia(c3)),b9.h("d<1>")).D(0,0,new A.ib(),t.i))}}
A.i5.prototype={
$2(a,b){var s=this.a,r=s.c,q=r.X(a,b)
if(!isFinite(q)&&r.c.e){r=a.J(b)
s=s.b.b.i(0,"marchSpeed")
s.toString
s=r/s}else s=q
return s},
$S:62}
A.i6.prototype={
$2(a,b){var s,r=t.O
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.q.t(a.a.a,b.a.a):B.b.t(r,s)},
$S:63}
A.i7.prototype={
$1(a){return t.r.a(a).a===this.a.ch},
$S:0}
A.i8.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.i9.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:9}
A.ia.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=!1
if(a.b===s.b)if(a.c===s.a){s=a.as
s=!(s===B.f||s===B.e)&&!a.fy}else s=r
else s=r
return s},
$S:0}
A.ib.prototype={
$2(a,b){return A.aj(a)+A.ad(t.r.a(b))},
$S:22}
A.ek.prototype={
a2(){var s=this,r=s.b
if(r>=s.a.db){s.e=!0
return!1}s.b=r+1
return!0},
cR(){var s=this,r=s.c
if(r>=s.a.dx){s.e=!0
return!1}s.c=r+1
return!0},
dl(){var s=this,r=s.d
if(r>=s.a.dy){s.e=!0
return!1}s.d=r+1
return!0}}
A.iZ.prototype={
$1(a){A.G(a)
return A.iI(v.G.self).postMessage(a)},
$S:64}
A.j_.prototype={
$1(a){return this.a.dg(A.G(A.iI(a).data))},
$S:65};(function aliases(){var s=J.aS.prototype
s.cl=s.p
s=A.b.prototype
s.br=s.du})();(function installTearOffs(){var s=hunkHelpers._static_0,r=hunkHelpers._static_1,q=hunkHelpers.installStaticTearOff
s(A,"mw","lp",5)
r(A,"mO","lD",21)
r(A,"mP","lE",21)
r(A,"mQ","lF",21)
s(A,"ko","mH",3)
r(A,"mS","ma",26)
q(A,"na",2,null,["$1$2","$2"],["kx",function(a,b){return A.kx(a,b,t.H)}],32,0)
q(A,"n9",2,null,["$1$2","$2"],["kw",function(a,b){return A.kw(a,b,t.H)}],32,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.x,null)
q(A.x,[A.ja,J.cR,A.cc,J.b1,A.C,A.i1,A.b,A.r,A.c3,A.U,A.bS,A.ba,A.bP,A.ch,A.I,A.aB,A.br,A.bJ,A.ci,A.a4,A.ic,A.h7,A.bQ,A.co,A.D,A.h2,A.b6,A.ah,A.c_,A.at,A.dj,A.iF,A.iD,A.df,A.aN,A.aq,A.bc,A.V,A.dg,A.dp,A.cu,A.bu,A.dm,A.bf,A.B,A.ct,A.cJ,A.cL,A.iy,A.cM,A.dh,A.d5,A.cd,A.ij,A.aF,A.a8,A.a9,A.dq,A.i2,A.bv,A.aV,A.en,A.aE,A.ep,A.bI,A.es,A.cD,A.av,A.ew,A.a5,A.f9,A.J,A.e9,A.q,A.P,A.b0,A.e1,A.h8,A.d7,A.hj,A.z,A.ac,A.N,A.bM,A.ec,A.eb,A.hD,A.bn,A.ed,A.a_,A.ej,A.e0,A.el,A.a2,A.ar,A.i4,A.ek])
q(J.cR,[J.cT,J.bU,J.bW,J.bV,J.bX,J.bq,J.b4])
q(J.bW,[J.aS,J.t,A.bs,A.c6])
q(J.aS,[J.d6,J.bw,J.aR])
r(J.cS,A.cc)
r(J.fY,J.t)
q(J.bq,[J.bT,J.cU])
q(A.C,[A.bZ,A.aK,A.cV,A.de,A.da,A.di,A.bY,A.cF,A.aA,A.cg,A.dd,A.ce,A.cK])
q(A.b,[A.p,A.b7,A.d,A.bR,A.b9,A.bx,A.be,A.aw])
q(A.p,[A.k,A.a6,A.ai,A.b5])
q(A.k,[A.y,A.O,A.L,A.dl])
r(A.bN,A.b7)
r(A.bO,A.b9)
q(A.aB,[A.by,A.bh])
r(A.aW,A.by)
q(A.bh,[A.aM,A.bz])
r(A.bB,A.br)
r(A.cf,A.bB)
r(A.bK,A.cf)
r(A.bL,A.bJ)
q(A.a4,[A.cQ,A.cH,A.cI,A.dc,A.iV,A.iX,A.ig,A.ie,A.iJ,A.iu,A.h4,A.dx,A.dV,A.dN,A.dO,A.dP,A.dR,A.dB,A.dC,A.dD,A.dF,A.dH,A.dI,A.dM,A.dL,A.dT,A.dz,A.dX,A.dZ,A.eq,A.eM,A.eN,A.f3,A.f4,A.f5,A.f6,A.f7,A.eP,A.eR,A.eS,A.eW,A.f_,A.f1,A.eF,A.eG,A.eK,A.eD,A.eE,A.eC,A.ey,A.eB,A.ex,A.fU,A.fV,A.fT,A.fW,A.fR,A.fQ,A.fS,A.fP,A.fa,A.fc,A.fy,A.fA,A.fC,A.fE,A.fd,A.fG,A.ff,A.fh,A.fj,A.fl,A.fo,A.fq,A.fs,A.fu,A.fv,A.fw,A.fz,A.fM,A.fO,A.fH,A.fI,A.fK,A.fL,A.dw,A.e7,A.e8,A.e4,A.e3,A.e6,A.e2,A.h9,A.he,A.hg,A.hh,A.hf,A.hc,A.hd,A.hb,A.hk,A.hn,A.hp,A.hr,A.hs,A.ht,A.hv,A.hx,A.hy,A.hl,A.hm,A.iO,A.hG,A.hI,A.hF,A.hE,A.hX,A.i_,A.hJ,A.hL,A.hM,A.hP,A.hR,A.hU,A.ee,A.eg,A.ei,A.j1,A.j2,A.eo,A.i7,A.i8,A.i9,A.ia,A.iZ,A.j_])
r(A.b3,A.cQ)
q(A.cH,[A.hA,A.ih,A.ii,A.iE,A.fX,A.ik,A.iq,A.ip,A.im,A.il,A.it,A.is,A.ir,A.iC,A.iM,A.dy,A.dU,A.dA,A.eX,A.ha,A.hz,A.iP])
r(A.c8,A.aK)
q(A.dc,[A.db,A.bo])
q(A.D,[A.aI,A.dk])
q(A.cI,[A.fZ,A.iW,A.iK,A.iN,A.iv,A.h3,A.h6,A.iz,A.dQ,A.dS,A.dE,A.dG,A.dJ,A.dK,A.dW,A.dY,A.e_,A.er,A.et,A.eu,A.iT,A.eO,A.eZ,A.f2,A.f8,A.eQ,A.eT,A.eU,A.eV,A.eY,A.f0,A.eH,A.eI,A.eJ,A.eL,A.ez,A.eA,A.fb,A.fn,A.fB,A.fD,A.fF,A.fe,A.fg,A.fi,A.fk,A.fm,A.fp,A.fr,A.ft,A.fx,A.fN,A.fJ,A.dv,A.e5,A.hi,A.ho,A.hq,A.hw,A.hu,A.hH,A.hT,A.hV,A.hW,A.hY,A.hZ,A.i0,A.hK,A.hN,A.hO,A.hQ,A.hS,A.ef,A.eh,A.j3,A.i5,A.i6,A.ib])
q(A.c6,[A.cX,A.bt])
q(A.bt,[A.cj,A.cl])
r(A.ck,A.cj)
r(A.c4,A.ck)
r(A.cm,A.cl)
r(A.c5,A.cm)
q(A.c4,[A.cY,A.cZ])
q(A.c5,[A.d_,A.d0,A.d1,A.d2,A.d3,A.c7,A.d4])
r(A.bA,A.di)
r(A.dn,A.cu)
r(A.cn,A.bu)
r(A.au,A.cn)
r(A.cW,A.bY)
r(A.h_,A.cJ)
q(A.cL,[A.h1,A.h0])
r(A.ix,A.iy)
q(A.aA,[A.ca,A.cP])
q(A.dh,[A.b2,A.al,A.aD,A.ap])
s(A.cj,A.B)
s(A.ck,A.I)
s(A.cl,A.B)
s(A.cm,A.I)
s(A.bB,A.ct)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",i:"double",a1:"num",F:"String",e:"bool",a9:"Null",m:"List",x:"Object",a7:"Map",K:"JSObject"},mangledNames:{},types:["e(q)","e(P)","a(q,q)","~()","a(P,P)","a()","a(a)","a(a,P)","e(a_)","e(b0)","e(a2)","i(a1,i)","i(i,P)","a(a,q)","e(i)","e(ac)","a(a,N)","e(a)","a(a,a)","q(q,q)","a(a_,a_)","~(~())","i(i,q)","~(x?,x?)","a9(@)","a9()","@(@)","e(ar)","q?(z)","e(N)","e(z)","q(a2)","0^(0^,0^)<a1>","e(m<a>)","e(J,J)","~(@)","a(ar,ar)","@(F)","m<ac>(N)","i(i,ac)","a(av,av)","a1(a1,a)","@(@,F)","~(@,@)","a9(@,aU)","i(a1,q)","i(i,F)","m<q>()","a(a,aV)","a_(a_,a_)","a9(~())","a(m<a>)","i(m<a>)","a(m<a>,m<a>)","+breakthrough,lower,teamSize,upper(e,i,a,i)()","e(aE{civilian:e})","~(aE,m<z>,F,P{hero:q?})","i(i,i,a)","~(a,@)","i(q)","e(a5)","i(a2)","i(J,J)","a(a2,a2)","~(F)","~(K)","a(P)","a9(x,aU)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"3;":(a,b,c)=>d=>d instanceof A.aW&&a.b(d.a)&&b.b(d.b)&&c.b(d.c),"4;breakthrough,lower,teamSize,upper":a=>b=>b instanceof A.aM&&A.kz(a,b.a),"4;high,low,selfHigh,selfLow":a=>b=>b instanceof A.bz&&A.kz(a,b.a)}}
A.lZ(v.typeUniverse,JSON.parse('{"aR":"aS","d6":"aS","bw":"aS","ni":"bs","cT":{"e":[],"A":[]},"bU":{"A":[]},"bW":{"K":[]},"aS":{"K":[]},"t":{"m":["1"],"p":["1"],"K":[],"b":["1"]},"cS":{"cc":[]},"fY":{"t":["1"],"m":["1"],"p":["1"],"K":[],"b":["1"]},"b1":{"E":["1"]},"bq":{"i":[],"a1":[]},"bT":{"i":[],"a":[],"a1":[],"A":[]},"cU":{"i":[],"a1":[],"A":[]},"b4":{"F":[],"A":[]},"bZ":{"C":[]},"p":{"b":["1"]},"k":{"p":["1"],"b":["1"]},"y":{"k":["1"],"p":["1"],"b":["1"],"b.E":"1","k.E":"1"},"r":{"E":["1"]},"b7":{"b":["2"],"b.E":"2"},"bN":{"b7":["1","2"],"p":["2"],"b":["2"],"b.E":"2"},"c3":{"E":["2"]},"O":{"k":["2"],"p":["2"],"b":["2"],"b.E":"2","k.E":"2"},"d":{"b":["1"],"b.E":"1"},"U":{"E":["1"]},"bR":{"b":["2"],"b.E":"2"},"bS":{"E":["2"]},"b9":{"b":["1"],"b.E":"1"},"bO":{"b9":["1"],"p":["1"],"b":["1"],"b.E":"1"},"ba":{"E":["1"]},"bP":{"E":["1"]},"bx":{"b":["1"],"b.E":"1"},"ch":{"E":["1"]},"L":{"k":["1"],"p":["1"],"b":["1"],"b.E":"1","k.E":"1"},"aW":{"by":[],"aB":[]},"aM":{"bh":[],"aB":[]},"bz":{"bh":[],"aB":[]},"bK":{"cf":["1","2"],"bB":["1","2"],"br":["1","2"],"ct":["1","2"],"a7":["1","2"]},"bJ":{"a7":["1","2"]},"bL":{"bJ":["1","2"],"a7":["1","2"]},"be":{"b":["1"],"b.E":"1"},"ci":{"E":["1"]},"cQ":{"a4":[],"aG":[]},"b3":{"a4":[],"aG":[]},"c8":{"aK":[],"C":[]},"cV":{"C":[]},"de":{"C":[]},"co":{"aU":[]},"a4":{"aG":[]},"cH":{"a4":[],"aG":[]},"cI":{"a4":[],"aG":[]},"dc":{"a4":[],"aG":[]},"db":{"a4":[],"aG":[]},"bo":{"a4":[],"aG":[]},"da":{"C":[]},"aI":{"D":["1","2"],"jQ":["1","2"],"a7":["1","2"],"D.K":"1","D.V":"2"},"a6":{"p":["1"],"b":["1"],"b.E":"1"},"b6":{"E":["1"]},"ai":{"p":["1"],"b":["1"],"b.E":"1"},"ah":{"E":["1"]},"b5":{"p":["a8<1,2>"],"b":["a8<1,2>"],"b.E":"a8<1,2>"},"c_":{"E":["a8<1,2>"]},"by":{"aB":[]},"bh":{"aB":[]},"bs":{"K":[],"A":[]},"c6":{"K":[]},"cX":{"K":[],"A":[]},"bt":{"ag":["1"],"K":[]},"c4":{"B":["i"],"m":["i"],"ag":["i"],"p":["i"],"K":[],"b":["i"],"I":["i"]},"c5":{"B":["a"],"m":["a"],"ag":["a"],"p":["a"],"K":[],"b":["a"],"I":["a"]},"cY":{"B":["i"],"m":["i"],"ag":["i"],"p":["i"],"K":[],"b":["i"],"I":["i"],"A":[],"B.E":"i","I.E":"i"},"cZ":{"B":["i"],"m":["i"],"ag":["i"],"p":["i"],"K":[],"b":["i"],"I":["i"],"A":[],"B.E":"i","I.E":"i"},"d_":{"B":["a"],"m":["a"],"ag":["a"],"p":["a"],"K":[],"b":["a"],"I":["a"],"A":[],"B.E":"a","I.E":"a"},"d0":{"B":["a"],"m":["a"],"ag":["a"],"p":["a"],"K":[],"b":["a"],"I":["a"],"A":[],"B.E":"a","I.E":"a"},"d1":{"B":["a"],"m":["a"],"ag":["a"],"p":["a"],"K":[],"b":["a"],"I":["a"],"A":[],"B.E":"a","I.E":"a"},"d2":{"B":["a"],"m":["a"],"ag":["a"],"p":["a"],"K":[],"b":["a"],"I":["a"],"A":[],"B.E":"a","I.E":"a"},"d3":{"B":["a"],"m":["a"],"ag":["a"],"p":["a"],"K":[],"b":["a"],"I":["a"],"A":[],"B.E":"a","I.E":"a"},"c7":{"B":["a"],"m":["a"],"ag":["a"],"p":["a"],"K":[],"b":["a"],"I":["a"],"A":[],"B.E":"a","I.E":"a"},"d4":{"ji":[],"B":["a"],"m":["a"],"ag":["a"],"p":["a"],"K":[],"b":["a"],"I":["a"],"A":[],"B.E":"a","I.E":"a"},"di":{"C":[]},"bA":{"aK":[],"C":[]},"aN":{"E":["1"]},"aw":{"b":["1"],"b.E":"1"},"aq":{"C":[]},"V":{"aQ":["1"]},"cu":{"k_":[]},"dn":{"cu":[],"k_":[]},"au":{"bu":["1"],"jS":["1"],"jg":["1"],"p":["1"],"b":["1"]},"bf":{"E":["1"]},"D":{"a7":["1","2"]},"br":{"a7":["1","2"]},"cf":{"bB":["1","2"],"br":["1","2"],"ct":["1","2"],"a7":["1","2"]},"bu":{"jg":["1"],"p":["1"],"b":["1"]},"cn":{"bu":["1"],"jg":["1"],"p":["1"],"b":["1"]},"dk":{"D":["F","@"],"a7":["F","@"],"D.K":"F","D.V":"@"},"dl":{"k":["F"],"p":["F"],"b":["F"],"b.E":"F","k.E":"F"},"bY":{"C":[]},"cW":{"C":[]},"i":{"a1":[]},"a":{"a1":[]},"m":{"p":["1"],"b":["1"]},"dh":{"cN":[]},"cF":{"C":[]},"aK":{"C":[]},"aA":{"C":[]},"ca":{"C":[]},"cP":{"C":[]},"cg":{"C":[]},"dd":{"C":[]},"ce":{"C":[]},"cK":{"C":[]},"d5":{"C":[]},"cd":{"C":[]},"dq":{"aU":[]},"bv":{"lw":[]},"b2":{"cN":[]},"al":{"cN":[]},"aD":{"cN":[]},"ap":{"cN":[]},"lg":{"m":["a"],"p":["a"],"b":["a"]},"ji":{"m":["a"],"p":["a"],"b":["a"]},"lB":{"m":["a"],"p":["a"],"b":["a"]},"le":{"m":["a"],"p":["a"],"b":["a"]},"lz":{"m":["a"],"p":["a"],"b":["a"]},"lf":{"m":["a"],"p":["a"],"b":["a"]},"lA":{"m":["a"],"p":["a"],"b":["a"]},"lb":{"m":["i"],"p":["i"],"b":["i"]},"lc":{"m":["i"],"p":["i"],"b":["i"]}}'))
A.lY(v.typeUniverse,JSON.parse('{"p":1,"bt":1,"cn":1,"cJ":2,"cL":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.cz
return{T:s("z"),q:s("P"),I:s("N"),t:s("b0"),a9:s("aD"),r:s("q"),bJ:s("bn"),o:s("a_"),J:s("ac"),u:s("aq"),b:s("ar"),cM:s("bI"),cs:s("a5"),U:s("p<@>"),V:s("C"),bo:s("bR<N,ac>"),h:s("aG"),O:s("a2"),E:s("b3<i>"),fy:s("b<P>"),ef:s("b<q>"),er:s("b<ac>(N)"),R:s("b<@>"),w:s("t<z>"),Y:s("t<P>"),Z:s("t<N>"),eu:s("t<b0>"),e:s("t<q>"),_:s("t<J>"),W:s("t<a_>"),m:s("t<ac>"),bL:s("t<ar>"),k:s("t<a2>"),a5:s("t<m<J>>"),eG:s("t<m<x>>"),A:s("t<m<i>>"),p:s("t<m<a>>"),d:s("t<a7<F,x?>>"),Q:s("t<x>"),eV:s("t<+(aE,m<z>,m<q>)>"),s:s("t<F>"),aD:s("t<aV>"),bQ:s("t<av>"),n:s("t<i>"),gn:s("t<@>"),a:s("t<a>"),v:s("bU"),B:s("K"),cj:s("aR"),aU:s("ag<@>"),f3:s("m<z>"),bd:s("m<q>"),j:s("m<@>"),L:s("m<a>"),d1:s("a7<F,@>"),f:s("a7<@,@>"),G:s("a7<F,x?>"),P:s("a9"),K:s("x"),gT:s("nj"),bY:s("+()"),fR:s("+(aE,m<z>,m<q>)"),l:s("aU"),N:s("F"),aQ:s("y<av>"),gf:s("aV"),dm:s("A"),eK:s("aK"),ak:s("bw"),eO:s("d<q>"),eq:s("d<i>"),cO:s("bx<q>"),c:s("V<@>"),dp:s("av"),dT:s("aw<a5>"),gL:s("aw<a>"),y:s("e"),aO:s("e(q)"),al:s("e(x)"),db:s("e(i)"),i:s("i"),z:s("@"),fO:s("@()"),D:s("@(x)"),C:s("@(x,aU)"),S:s("a"),dg:s("q?"),eH:s("aQ<a9>?"),an:s("K?"),bM:s("m<@>?"),eg:s("m<a>?"),X:s("x?"),dk:s("F?"),F:s("bc<@,@>?"),g:s("dm?"),fQ:s("e?"),cD:s("i?"),h6:s("a?"),cg:s("a1?"),H:s("a1"),x:s("~"),M:s("~()"),cA:s("~(F,@)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.a9=J.cR.prototype
B.a=J.t.prototype
B.c=J.bT.prototype
B.b=J.bq.prototype
B.q=J.b4.prototype
B.aa=J.aR.prototype
B.ab=J.bW.prototype
B.N=J.d6.prototype
B.z=J.bw.prototype
B.l=new A.ap(0,"upgrade")
B.A=new A.ap(1,"dismiss")
B.v=new A.ap(2,"recruit")
B.m=new A.ap(3,"soldiers")
B.B=new A.ap(4,"buyWeapon")
B.C=new A.ap(5,"dispatch")
B.O=new A.ap(6,"move")
B.P=new A.ap(8,"retreat")
B.f=new A.al(0,"garrison")
B.n=new A.al(2,"camped")
B.w=new A.al(3,"queue")
B.D=new A.al(4,"attacking")
B.e=new A.al(5,"defending")
B.t=new A.al(7,"retreating")
B.E=new A.aD(0,"full")
B.F=new A.aD(1,"resources")
B.x=new A.aD(2,"defense")
B.k=new A.aD(3,"attack")
B.M=s([],t._)
B.u=new A.bn(B.M,1/0,!1)
B.S=new A.bn(B.M,1/0,!1)
B.as=new A.cD(8,24,6,1.5,30,12,0.5,3,0.5,0.25,45,15,0.8,45,25,90,0.1,10,3,1,96,160,6000,8,24,4,6,8,2,12,2.25,0.3,20,900,64,0.25,8,0.06,0.12,0.35,0.05,2500,2,60)
B.G=new A.b3(A.n9(),t.E)
B.y=new A.b3(A.na(),t.E)
B.H=new A.cM()
B.T=new A.bP(A.cz("bP<0&>"))
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

B.i=new A.h_()
B.a_=new A.d5()
B.o=new A.i1()
B.j=new A.dn()
B.a0=new A.dq()
B.h=new A.b2(0,"favorable")
B.a1=new A.b2(1,"close")
B.p=new A.b2(2,"unfavorable")
B.K=new A.b2(3,"unknown")
B.at=s(["\u9759\u6001\u8bc4\u4f30\u914d\u989d\u8017\u5c3d"],t.s)
B.a2=new A.bI(B.K,-1,1,0,0,!1)
B.a3=new A.aF("AI \u534f\u8bae\u7248\u672c\u4e0d\u5339\u914d")
B.a4=new A.aF("AI \u6784\u5efa\u7248\u672c\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u751f\u6210 Worker")
B.a5=new A.aF("\u672a\u77e5 AI \u5de5\u4f5c\u547d\u4ee4")
B.a6=new A.aF("AI \u5730\u56fe\u5c3a\u5bf8\u65e0\u6548")
B.a7=new A.aF("\u56fd\u5bb6\u89c4\u5212\u9759\u6001\u7248\u672c\u4e0d\u5339\u914d")
B.a8=new A.aF("\u56fd\u5bb6\u89c2\u5bdf\u8d85\u51fa\u534f\u8bae\u5bb9\u91cf")
B.ac=new A.h0(null)
B.ad=new A.h1(null)
B.Q=new A.al(1,"marching")
B.R=new A.al(6,"field")
B.L=s([B.f,B.Q,B.n,B.w,B.D,B.e,B.R,B.t],A.cz("t<al>"))
B.ae=s([B.E,B.F,B.x,B.k],A.cz("t<aD>"))
B.af=s([],t.Z)
B.au=s([],t.W)
B.r=s([],t.m)
B.d=s([],t.a)
B.ag=A.az("ne")
B.ah=A.az("nf")
B.ai=A.az("lb")
B.aj=A.az("lc")
B.ak=A.az("le")
B.al=A.az("lf")
B.am=A.az("lg")
B.an=A.az("x")
B.ao=A.az("lz")
B.ap=A.az("lA")
B.aq=A.az("lB")
B.ar=A.az("ji")})();(function staticFields(){$.iw=null
$.ak=A.c([],t.Q)
$.jT=null
$.hB=0
$.hC=A.mw()
$.jK=null
$.jJ=null
$.ks=null
$.km=null
$.kB=null
$.iR=null
$.iY=null
$.jx=null
$.iB=A.c([],A.cz("t<m<x>?>"))
$.bD=null
$.cw=null
$.cx=null
$.jp=!1
$.M=B.j})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"nh","kE",()=>A.iS("_$dart_dartClosure"))
s($,"ng","jA",()=>A.iS("_$dart_dartClosure_dartJSInterop"))
s($,"ny","kP",()=>A.c([new J.cS()],A.cz("t<cc>")))
s($,"nm","kF",()=>A.aL(A.id({
toString:function(){return"$receiver$"}})))
s($,"nn","kG",()=>A.aL(A.id({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"no","kH",()=>A.aL(A.id(null)))
s($,"np","kI",()=>A.aL(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"ns","kL",()=>A.aL(A.id(void 0)))
s($,"nt","kM",()=>A.aL(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nr","kK",()=>A.aL(A.jY(null)))
s($,"nq","kJ",()=>A.aL(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"nv","kO",()=>A.aL(A.jY(void 0)))
s($,"nu","kN",()=>A.aL(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"nw","jC",()=>A.lC())
s($,"nx","dt",()=>A.ky(B.an))
s($,"nk","jB",()=>{A.lr()
return $.hB})})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.bs,SharedArrayBuffer:A.bs,ArrayBufferView:A.c6,DataView:A.cX,Float32Array:A.cY,Float64Array:A.cZ,Int16Array:A.d_,Int32Array:A.d0,Int8Array:A.d1,Uint16Array:A.d2,Uint32Array:A.d3,Uint8ClampedArray:A.c7,CanvasPixelArray:A.c7,Uint8Array:A.d4})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bt.$nativeSuperclassTag="ArrayBufferView"
A.cj.$nativeSuperclassTag="ArrayBufferView"
A.ck.$nativeSuperclassTag="ArrayBufferView"
A.c4.$nativeSuperclassTag="ArrayBufferView"
A.cl.$nativeSuperclassTag="ArrayBufferView"
A.cm.$nativeSuperclassTag="ArrayBufferView"
A.c5.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$0=function(){return this()}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$2=function(a,b){return this(a,b)}
Function.prototype.$1$1=function(a){return this(a)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.n7
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()