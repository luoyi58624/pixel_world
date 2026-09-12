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
if(a[b]!==s){A.nk(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.c(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.jw(b)
return new s(c,this)}:function(){if(s===null)s=A.jw(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.jw(a).prototype
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
jB(a,b,c,d){return{i:a,p:b,e:c,x:d}},
jx(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.jz==null){A.n6()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.j(A.k1("Return interceptor for "+A.v(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.ix
if(o==null)o=$.ix=A.iV(n)
p=q[o]}if(p!=null)return p
p=A.nc(a)
if(p!=null)return p
if(typeof a=="function")return B.ag
s=Object.getPrototypeOf(a)
if(s==null)return B.M
if(s===Object.prototype)return B.M
if(typeof q=="function"){o=$.ix
if(o==null)o=$.ix=A.iV(n)
Object.defineProperty(q,o,{value:B.C,enumerable:false,writable:true,configurable:true})
return B.C}return B.C},
ln(a,b){if(a<0||a>4294967295)throw A.j(A.b8(a,0,4294967295,"length",null))
return J.lo(new Array(a),b)},
jQ(a,b){if(a<0)throw A.j(A.cB("Length must be a non-negative integer: "+a,null))
return A.c(new Array(a),b.h("u<0>"))},
lo(a,b){var s=A.c(a,b.h("u<0>"))
s.$flags=1
return s},
bh(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bT.prototype
return J.cS.prototype}if(typeof a=="string")return J.b5.prototype
if(a==null)return J.bU.prototype
if(typeof a=="boolean")return J.cR.prototype
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aS.prototype
if(typeof a=="symbol")return J.bX.prototype
if(typeof a=="bigint")return J.bV.prototype
return a}if(a instanceof A.A)return a
return J.jx(a)},
cy(a){if(typeof a=="string")return J.b5.prototype
if(a==null)return a
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aS.prototype
if(typeof a=="symbol")return J.bX.prototype
if(typeof a=="bigint")return J.bV.prototype
return a}if(a instanceof A.A)return a
return J.jx(a)},
bi(a){if(a==null)return a
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aS.prototype
if(typeof a=="symbol")return J.bX.prototype
if(typeof a=="bigint")return J.bV.prototype
return a}if(a instanceof A.A)return a
return J.jx(a)},
n1(a){if(typeof a=="number")return J.bp.prototype
if(typeof a=="string")return J.b5.prototype
if(a==null)return a
if(!(a instanceof A.A))return J.bv.prototype
return a},
ay(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bh(a).ae(a,b)},
aO(a,b){if(typeof b==="number")if(Array.isArray(a)||A.nb(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.bi(a).i(a,b)},
kQ(a,b){return J.bi(a).k(a,b)},
kR(a,b){return J.n1(a).t(a,b)},
j8(a,b){return J.bi(a).T(a,b)},
jF(a){return J.bi(a).gL(a)},
ag(a){return J.bh(a).gR(a)},
kS(a){return J.cy(a).ga6(a)},
kT(a){return J.cy(a).gbj(a)},
I(a){return J.bi(a).gC(a)},
kU(a){return J.bi(a).gaz(a)},
bl(a){return J.cy(a).gm(a)},
kV(a){return J.bh(a).gS(a)},
kW(a,b){return J.bi(a).bq(a,b)},
kX(a,b){return J.bi(a).cc(a,b)},
b_(a){return J.bh(a).q(a)},
cP:function cP(){},
cR:function cR(){},
bU:function bU(){},
bW:function bW(){},
aT:function aT(){},
d4:function d4(){},
bv:function bv(){},
aS:function aS(){},
bV:function bV(){},
bX:function bX(){},
u:function u(a){this.$ti=a},
cQ:function cQ(){},
fX:function fX(a){this.$ti=a},
b2:function b2(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bp:function bp(){},
bT:function bT(){},
cS:function cS(){},
b5:function b5(){}},A={je:function je(){},
lp(a){return new A.bZ("Field '"+a+"' has not been initialized.")},
aF(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
i4(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
W(a,b,c){return a},
jA(a){var s,r
for(s=$.aj.length,r=0;r<s;++r)if(a===$.aj[r])return!0
return!1},
X(a,b,c,d){A.c9(b,"start")
if(c!=null){A.c9(c,"end")
if(b>c)A.aM(A.b8(b,0,c,"start",null))}return new A.z(a,b,c,d.h("z<0>"))},
ls(a,b,c,d){if(t.Q.b(a))return new A.bN(a,b,c.h("@<0>").K(d).h("bN<1,2>"))
return new A.ar(a,b,c.h("@<0>").K(d).h("ar<1,2>"))},
k_(a,b,c){A.c9(b,"takeCount")
if(t.Q.b(a))return new A.bO(a,b,c.h("bO<0>"))
return new A.b9(a,b,c.h("b9<0>"))},
aA(){return new A.cc("No element")},
bZ:function bZ(a){this.a=a},
i2:function i2(){},
m:function m(){},
k:function k(){},
z:function z(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
q:function q(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
ar:function ar(a,b,c){this.a=a
this.b=b
this.$ti=c},
bN:function bN(a,b,c){this.a=a
this.b=b
this.$ti=c},
c1:function c1(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
Y:function Y(a,b,c){this.a=a
this.b=b
this.$ti=c},
d:function d(a,b,c){this.a=a
this.b=b
this.$ti=c},
T:function T(a,b,c){this.a=a
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
cf:function cf(a,b){this.a=a
this.$ti=b},
cg:function cg(a,b){this.a=a
this.$ti=b},
J:function J(){},
K:function K(a,b){this.a=a
this.$ti=b},
ja(a,b,c){var s,r,q,p,o,n,m,l=A.l(a),k=A.c0(new A.a7(a,l.h("a7<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.w)(k),++i,p=o){r=k[i]
c.a(a.i(0,r))
o=p+1
q[r]=p}n=A.c0(new A.a3(a,l.h("a3<2>")),!0,c)
m=new A.bM(q,n,b.h("@<0>").K(c).h("bM<1,2>"))
m.$keys=k
return m}return new A.bL(A.af(a,b,c),b.h("@<0>").K(c).h("bL<1,2>"))},
kD(a){var s=A.kC(a)
if(s!=null)return s
return"minified:"+a},
nb(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
v(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.b_(a)
return s},
d6(a){var s,r=$.jV
if(r==null)r=$.jV=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
lx(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.o(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
d7(a){var s,r,q,p
if(a instanceof A.A)return A.ab(A.aL(a),null)
s=J.bh(a)
if(s===B.af||s===B.ah||t.ak.b(a)){r=B.H(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.ab(A.aL(a),null)},
jW(a){var s,r,q
if(a==null||typeof a=="number"||A.jr(a))return J.b_(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a6)return a.q(0)
if(a instanceof A.aI)return a.bN(!0)
s=$.kP()
for(r=0;r<1;++r){q=s[r].dz(a)
if(q!=null)return q}return"Instance of '"+A.d7(a)+"'"},
lu(){return Date.now()},
lw(){var s,r
if($.hq!==0)return
$.hq=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
if(!!s.dartUseDateNowForTicks)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.hq=1e6
$.hr=new A.hp(r)},
Z(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.bJ(s,10)|55296)>>>0,s&1023|56320)}throw A.j(A.b8(a,0,1114111,null,null))},
lv(a){var s=a.$thrownJsError
if(s==null)return null
return A.bG(s)},
o(a,b){if(a==null)J.bl(a)
throw A.j(A.ks(a,b))},
ks(a,b){var s,r="index"
if(!A.iN(b))return new A.az(!0,b,r,null)
s=J.bl(a)
if(b<0||b>=s)return A.jc(b,s,a,r)
return new A.c8(null,null,!0,b,r,"Value not in range")},
mR(a){return new A.az(!0,a,null,null)},
iS(a){return a},
j(a){return A.R(a,new Error())},
R(a,b){var s
if(a==null)a=new A.aG()
b.dartException=a
s=A.nl
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
nl(){return J.b_(this.dartException)},
aM(a,b){throw A.R(a,b==null?new Error():b)},
cz(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.aM(A.mf(a,b,c),s)},
mf(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.ce("'"+s+"': Cannot "+o+" "+l+k+n)},
w(a){throw A.j(A.a1(a))},
aH(a){var s,r,q,p,o,n
a=A.ni(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.c([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.id(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
ie(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
k0(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
jf(a,b){var s=b==null,r=s?null:b.method
return new A.cT(a,r,s?null:b.receiver)},
aN(a){var s
if(a==null)return new A.h6(a)
if(a instanceof A.bQ){s=a.a
return A.aZ(a,s==null?A.cv(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.aZ(a,a.dartException)
return A.mP(a)},
aZ(a,b){if(t.U.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
mP(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bJ(r,16)&8191)===10)switch(q){case 438:return A.aZ(a,A.jf(A.v(s)+" (Error "+q+")",null))
case 445:case 5007:A.v(s)
return A.aZ(a,new A.c6())}}if(a instanceof TypeError){p=$.kF()
o=$.kG()
n=$.kH()
m=$.kI()
l=$.kL()
k=$.kM()
j=$.kK()
$.kJ()
i=$.kO()
h=$.kN()
g=p.ab(s)
if(g!=null)return A.aZ(a,A.jf(A.L(s),g))
else{g=o.ab(s)
if(g!=null){g.method="call"
return A.aZ(a,A.jf(A.L(s),g))}else if(n.ab(s)!=null||m.ab(s)!=null||l.ab(s)!=null||k.ab(s)!=null||j.ab(s)!=null||m.ab(s)!=null||i.ab(s)!=null||h.ab(s)!=null){A.L(s)
return A.aZ(a,new A.c6())}}return A.aZ(a,new A.dc(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.cb()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.aZ(a,new A.az(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.cb()
return a},
bG(a){var s
if(a instanceof A.bQ)return a.b
if(a==null)return new A.co(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.co(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
ky(a){if(a==null)return J.ag(a)
if(typeof a=="object")return A.d6(a)
return J.ag(a)},
n_(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.A(0,a[s],a[r])}return b},
n0(a,b){var s,r=a.length
for(s=0;s<r;++s)b.k(0,a[s])
return b},
mo(a,b,c,d,e,f){t.h.a(a)
switch(A.h(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.j(new A.ik("Unsupported number of arguments for wrapped closure"))},
dr(a,b){var s=a.$identity
if(!!s)return s
s=A.mW(a,b)
a.$identity=s
return s},
mW(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.mo)},
la(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.d9().constructor.prototype):Object.create(new A.bn(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.jO(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.l6(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.jO(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
l6(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.j("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.l4)}throw A.j("Error in functionType of tearoff")},
l7(a,b,c,d){var s=A.jN
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
jO(a,b,c,d){if(c)return A.l9(a,b,d)
return A.l7(b.length,d,a,b)},
l8(a,b,c,d){var s=A.jN,r=A.l5
switch(b?-1:a){case 0:throw A.j(new A.d8("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
l9(a,b,c){var s,r
if($.jL==null)$.jL=A.jK("interceptor")
if($.jM==null)$.jM=A.jK("receiver")
s=b.length
r=A.l8(s,c,a,b)
return r},
jw(a){return A.la(a)},
l4(a,b){return A.cs(v.typeUniverse,A.aL(a.a),b)},
jN(a){return a.a},
l5(a){return a.b},
jK(a){var s,r,q,p=new A.bn("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.j(A.cB("Field name "+a+" not found.",null))},
iV(a){return v.getIsolateTag(a)},
nc(a){var s,r,q,p,o,n=A.L($.kt.$1(a)),m=$.iU[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.iZ[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bB($.ko.$2(a,n))
if(q!=null){m=$.iU[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.iZ[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.j1(s)
$.iU[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.iZ[n]=s
return s}if(p==="-"){o=A.j1(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.kA(a,s)
if(p==="*")throw A.j(A.k1(n))
if(v.leafTags[n]===true){o=A.j1(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.kA(a,s)},
kA(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.jB(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
j1(a){return J.jB(a,!1,null,!!a.$iah)},
ne(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.j1(s)
else return J.jB(s,c,null,null)},
n6(){if(!0===$.jz)return
$.jz=!0
A.n7()},
n7(){var s,r,q,p,o,n,m,l
$.iU=Object.create(null)
$.iZ=Object.create(null)
A.n5()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.kB.$1(o)
if(n!=null){m=A.ne(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
n5(){var s,r,q,p,o,n,m=B.V()
m=A.bE(B.W,A.bE(B.X,A.bE(B.I,A.bE(B.I,A.bE(B.Y,A.bE(B.Z,A.bE(B.a_(B.H),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.kt=new A.iW(p)
$.ko=new A.iX(o)
$.kB=new A.iY(n)},
bE(a,b){return a(b)||b},
lU(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.o(b,s)
if(!J.ay(r,b[s]))return!1}return!0},
mY(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
ni(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bg:function bg(a,b){this.a=a
this.b=b},
av:function av(a){this.a=a},
bL:function bL(a,b){this.a=a
this.$ti=b},
bK:function bK(){},
bM:function bM(a,b,c){this.a=a
this.b=b
this.$ti=c},
ch:function ch(a,b){this.a=a
this.$ti=b},
ci:function ci(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cO:function cO(){},
b4:function b4(a,b){this.a=a
this.$ti=b},
hp:function hp(a){this.a=a},
ca:function ca(){},
id:function id(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
c6:function c6(){},
cT:function cT(a,b,c){this.a=a
this.b=b
this.c=c},
dc:function dc(a){this.a=a},
h6:function h6(a){this.a=a},
bQ:function bQ(a,b){this.a=a
this.b=b},
co:function co(a){this.a=a
this.b=null},
a6:function a6(){},
cE:function cE(){},
cF:function cF(){},
da:function da(){},
d9:function d9(){},
bn:function bn(a,b){this.a=a
this.b=b},
d8:function d8(a){this.a=a},
aD:function aD(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
fY:function fY(a){this.a=a},
h1:function h1(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
a7:function a7(a,b){this.a=a
this.$ti=b},
b6:function b6(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
a3:function a3(a,b){this.a=a
this.$ti=b},
ai:function ai(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aE:function aE(a,b){this.a=a
this.$ti=b},
c_:function c_(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
iW:function iW(a){this.a=a},
iX:function iX(a){this.a=a},
iY:function iY(a){this.a=a},
aI:function aI(){},
bw:function bw(){},
bx:function bx(){},
mg(a){return a},
br:function br(){},
c4:function c4(){},
cV:function cV(){},
bs:function bs(){},
c2:function c2(){},
c3:function c3(){},
cW:function cW(){},
cX:function cX(){},
cY:function cY(){},
cZ:function cZ(){},
d_:function d_(){},
d0:function d0(){},
d1:function d1(){},
c5:function c5(){},
d2:function d2(){},
cj:function cj(){},
ck:function ck(){},
cl:function cl(){},
cm:function cm(){},
jj(a,b){var s=b.c
return s==null?b.c=A.cq(a,"aQ",[b.x]):s},
jX(a){var s=a.w
if(s===6||s===7)return A.jX(a.x)
return s===11||s===12},
lz(a){return a.as},
nh(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
bF(a){return A.iH(v.typeUniverse,a,!1)},
n9(a,b){var s,r,q,p,o
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
return A.ka(a1,r,!0)
case 7:s=a2.x
r=A.aY(a1,s,a3,a4)
if(r===s)return a2
return A.k9(a1,r,!0)
case 8:q=a2.y
p=A.bD(a1,q,a3,a4)
if(p===q)return a2
return A.cq(a1,a2.x,p)
case 9:o=a2.x
n=A.aY(a1,o,a3,a4)
m=a2.y
l=A.bD(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.jo(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bD(a1,j,a3,a4)
if(i===j)return a2
return A.kb(a1,k,i)
case 11:h=a2.x
g=A.aY(a1,h,a3,a4)
f=a2.y
e=A.mM(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.k8(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bD(a1,d,a3,a4)
o=a2.x
n=A.aY(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jp(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.j(A.cD("Attempted to substitute unexpected RTI kind "+a0))}},
bD(a,b,c,d){var s,r,q,p,o=b.length,n=A.iI(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.aY(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
mN(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.iI(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.aY(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
mM(a,b,c,d){var s,r=b.a,q=A.bD(a,r,c,d),p=b.b,o=A.bD(a,p,c,d),n=b.c,m=A.mN(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dh()
s.a=q
s.b=o
s.c=m
return s},
c(a,b){a[v.arrayRti]=b
return a},
iT(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.n3(s)
return a.$S()}return null},
n8(a,b){var s
if(A.jX(b))if(a instanceof A.a6){s=A.iT(a)
if(s!=null)return s}return A.aL(a)},
aL(a){if(a instanceof A.A)return A.l(a)
if(Array.isArray(a))return A.i(a)
return A.jq(J.bh(a))},
i(a){var s=a[v.arrayRti],r=t.V
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
l(a){var s=a.$ti
return s!=null?s:A.jq(a)},
jq(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.mn(a,s)},
mn(a,b){var s=a instanceof A.a6?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.m3(v.typeUniverse,s.name)
b.$ccache=r
return r},
n3(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.iH(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
n2(a){return A.aK(A.l(a))},
jy(a){var s=A.iT(a)
return A.aK(s==null?A.aL(a):s)},
ju(a){var s
if(a instanceof A.aI)return A.mZ(a.$r,a.b9())
s=a instanceof A.a6?A.iT(a):null
if(s!=null)return s
if(t.dm.b(a))return J.kV(a).a
if(Array.isArray(a))return A.i(a)
return A.aL(a)},
aK(a){var s=a.r
return s==null?a.r=new A.iG(a):s},
mZ(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bY
if(0>=p)return A.o(q,0)
s=A.cs(v.typeUniverse,A.ju(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.o(q,r)
s=A.kd(v.typeUniverse,s,A.ju(q[r]))}return A.cs(v.typeUniverse,s,a)},
ax(a){return A.aK(A.iH(v.typeUniverse,a,!1))},
mm(a){var s=this
s.b=A.mK(s)
return s.b(a)},
mK(a){var s,r,q,p,o
if(a===t.K)return A.mu
if(A.bj(a))return A.my
s=a.w
if(s===6)return A.mk
if(s===1)return A.kk
if(s===7)return A.mp
r=A.mJ(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bj)){a.f="$i"+q
if(q==="t")return A.ms
if(a===t.p)return A.mr
return A.mx}}else if(s===10){p=A.mY(a.x,a.y)
o=p==null?A.kk:p
return o==null?A.cv(o):o}return A.mi},
mJ(a){if(a.w===8){if(a===t.S)return A.iN
if(a===t.i||a===t.H)return A.mt
if(a===t.N)return A.mw
if(a===t.y)return A.jr}return null},
ml(a){var s=this,r=A.mh
if(A.bj(s))r=A.m7
else if(s===t.K)r=A.cv
else if(A.bI(s)){r=A.mj
if(s===t.h6)r=A.a_
else if(s===t.dk)r=A.bB
else if(s===t.fQ)r=A.bA
else if(s===t.cg)r=A.V
else if(s===t.cD)r=A.m5
else if(s===t.an)r=A.m6}else if(s===t.S)r=A.h
else if(s===t.N)r=A.L
else if(s===t.y)r=A.aX
else if(s===t.H)r=A.x
else if(s===t.i)r=A.an
else if(s===t.p)r=A.iJ
s.a=r
return s.a(a)},
mi(a){var s=this
if(a==null)return A.bI(s)
return A.kv(v.typeUniverse,A.n8(a,s),s)},
mk(a){if(a==null)return!0
return this.x.b(a)},
mx(a){var s,r=this
if(a==null)return A.bI(r)
s=r.f
if(a instanceof A.A)return!!a[s]
return!!J.bh(a)[s]},
ms(a){var s,r=this
if(a==null)return A.bI(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.A)return!!a[s]
return!!J.bh(a)[s]},
mr(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.A)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
kj(a){if(typeof a=="object"){if(a instanceof A.A)return t.p.b(a)
return!0}if(typeof a=="function")return!0
return!1},
mh(a){var s=this
if(a==null){if(A.bI(s))return a}else if(s.b(a))return a
throw A.R(A.kg(a,s),new Error())},
mj(a){var s=this
if(a==null||s.b(a))return a
throw A.R(A.kg(a,s),new Error())},
kg(a,b){return new A.by("TypeError: "+A.k3(a,A.ab(b,null)))},
kr(a,b,c,d){if(A.kv(v.typeUniverse,a,b))return a
throw A.R(A.lW("The type argument '"+A.ab(a,null)+"' is not a subtype of the type variable bound '"+A.ab(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
k3(a,b){return A.cL(a)+": type '"+A.ab(A.ju(a),null)+"' is not a subtype of type '"+b+"'"},
lW(a){return new A.by("TypeError: "+a)},
am(a,b){return new A.by("TypeError: "+A.k3(a,b))},
mp(a){var s=this
return s.x.b(a)||A.jj(v.typeUniverse,s).b(a)},
mu(a){return a!=null},
cv(a){if(a!=null)return a
throw A.R(A.am(a,"Object"),new Error())},
my(a){return!0},
m7(a){return a},
kk(a){return!1},
jr(a){return!0===a||!1===a},
aX(a){if(!0===a)return!0
if(!1===a)return!1
throw A.R(A.am(a,"bool"),new Error())},
bA(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.R(A.am(a,"bool?"),new Error())},
an(a){if(typeof a=="number")return a
throw A.R(A.am(a,"double"),new Error())},
m5(a){if(typeof a=="number")return a
if(a==null)return a
throw A.R(A.am(a,"double?"),new Error())},
iN(a){return typeof a=="number"&&Math.floor(a)===a},
h(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.R(A.am(a,"int"),new Error())},
a_(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.R(A.am(a,"int?"),new Error())},
mt(a){return typeof a=="number"},
x(a){if(typeof a=="number")return a
throw A.R(A.am(a,"num"),new Error())},
V(a){if(typeof a=="number")return a
if(a==null)return a
throw A.R(A.am(a,"num?"),new Error())},
mw(a){return typeof a=="string"},
L(a){if(typeof a=="string")return a
throw A.R(A.am(a,"String"),new Error())},
bB(a){if(typeof a=="string")return a
if(a==null)return a
throw A.R(A.am(a,"String?"),new Error())},
iJ(a){if(A.kj(a))return a
throw A.R(A.am(a,"JSObject"),new Error())},
m6(a){if(a==null)return a
if(A.kj(a))return a
throw A.R(A.am(a,"JSObject?"),new Error())},
km(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.ab(a[q],b)
return s},
mE(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.km(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.ab(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
kh(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.c([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.k(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.o(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.ab(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.ab(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.ab(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.ab(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.ab(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
ab(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.ab(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.ab(a.x,b)+">"
if(l===8){p=A.mO(a.x)
o=a.y
return o.length>0?p+("<"+A.km(o,b)+">"):p}if(l===10)return A.mE(a,b)
if(l===11)return A.kh(a,b,null)
if(l===12)return A.kh(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.o(b,n)
return b[n]}return"?"},
mO(a){var s=A.kC(a)
if(s!=null)return s
return"minified:"+a},
m4(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
m3(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.iH(a,b,!1)
else if(typeof m=="number"){s=m
r=A.cr(a,5,"#")
q=A.iI(s)
for(p=0;p<s;++p)q[p]=r
o=A.cq(a,b,q)
n[b]=o
return o}else return m},
m2(a,b){return A.ke(a.tR,b)},
m1(a,b){return A.ke(a.eT,b)},
iH(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.kc(a,null,b,!1)
r.set(b,s)
return s},
cs(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.kc(a,b,c,!0)
q.set(c,r)
return r},
kd(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.jo(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
kc(a,b,c,d){return A.lS(A.lM(a,b,c,d))},
aW(a,b){b.a=A.ml
b.b=A.mm
return b},
cr(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.as(null,null)
s.w=b
s.as=c
r=A.aW(a,s)
a.eC.set(c,r)
return r},
ka(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.m_(a,b,r,c)
a.eC.set(r,s)
return s},
m_(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bj(b))if(!(b===t.P||b===t.v))if(s!==6)r=s===7&&A.bI(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.as(null,null)
q.w=6
q.x=b
q.as=c
return A.aW(a,q)},
k9(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.lY(a,b,r,c)
a.eC.set(r,s)
return s},
lY(a,b,c,d){var s,r
if(d){s=b.w
if(A.bj(b)||b===t.K)return b
else if(s===1)return A.cq(a,"aQ",[b])
else if(b===t.P||b===t.v)return t.eH}r=new A.as(null,null)
r.w=7
r.x=b
r.as=c
return A.aW(a,r)},
m0(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.as(null,null)
s.w=13
s.x=b
s.as=q
r=A.aW(a,s)
a.eC.set(q,r)
return r},
cp(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
lX(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
cq(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.cp(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.as(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.aW(a,r)
a.eC.set(p,q)
return q},
jo(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.cp(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.as(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.aW(a,o)
a.eC.set(q,n)
return n},
kb(a,b,c){var s,r,q="+"+(b+"("+A.cp(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.as(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.aW(a,s)
a.eC.set(q,r)
return r},
k8(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.cp(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.cp(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.lX(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.as(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.aW(a,p)
a.eC.set(r,o)
return o},
jp(a,b,c,d){var s,r=b.as+("<"+A.cp(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.lZ(a,b,c,r,d)
a.eC.set(r,s)
return s},
lZ(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.iI(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.aY(a,b,r,0)
m=A.bD(a,c,r,0)
return A.jp(a,n,m,c!==m)}}l=new A.as(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.aW(a,l)},
lM(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
lS(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.lO(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.k5(a,r,l,k,!1)
else if(q===46)r=A.k5(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bf(a.u,a.e,k.pop()))
break
case 94:k.push(A.m0(a.u,k.pop()))
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
case 62:A.lQ(a,k)
break
case 38:A.lP(a,k)
break
case 63:p=a.u
k.push(A.ka(p,A.bf(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.k9(p,A.bf(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.lN(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.k6(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.lT(a.u,a.e,o)
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
return A.bf(a.u,a.e,m)},
lO(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
k5(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.m4(s,o.x)[p]
if(n==null)A.aM('No "'+p+'" in "'+A.lz(o)+'"')
d.push(A.cs(s,o,n))}else d.push(p)
return m},
lQ(a,b){var s,r=a.u,q=A.k4(a,b),p=b.pop()
if(typeof p=="string")b.push(A.cq(r,p,q))
else{s=A.bf(r,a.e,p)
switch(s.w){case 11:b.push(A.jp(r,s,q,a.n))
break
default:b.push(A.jo(r,s,q))
break}}},
lN(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.k4(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bf(p,a.e,o)
q=new A.dh()
q.a=s
q.b=n
q.c=m
b.push(A.k8(p,r,q))
return
case-4:b.push(A.kb(p,b.pop(),s))
return
default:throw A.j(A.cD("Unexpected state under `()`: "+A.v(o)))}},
lP(a,b){var s=b.pop()
if(0===s){b.push(A.cr(a.u,1,"0&"))
return}if(1===s){b.push(A.cr(a.u,4,"1&"))
return}throw A.j(A.cD("Unexpected extended operation "+A.v(s)))},
k4(a,b){var s=b.splice(a.p)
A.k6(a.u,a.e,s)
a.p=b.pop()
return s},
bf(a,b,c){if(typeof c=="string")return A.cq(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.lR(a,b,c)}else return c},
k6(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bf(a,b,c[s])},
lT(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bf(a,b,c[s])},
lR(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.j(A.cD("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.j(A.cD("Bad index "+c+" for "+b.q(0)))},
kv(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.Q(a,b,null,c,null)
r.set(c,s)}return s},
Q(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bj(d))return!0
s=b.w
if(s===4)return!0
if(A.bj(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.Q(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.v){if(q===7)return A.Q(a,b,c,d.x,e)
return d===p||d===t.v||q===6}if(d===t.K){if(s===7)return A.Q(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.Q(a,b.x,c,d,e))return!1
return A.Q(a,A.jj(a,b),c,d,e)}if(s===6)return A.Q(a,p,c,d,e)&&A.Q(a,b.x,c,d,e)
if(q===7){if(A.Q(a,b,c,d.x,e))return!0
return A.Q(a,b,c,A.jj(a,d),e)}if(q===6)return A.Q(a,b,c,p,e)||A.Q(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.h)return!0
o=s===10
if(o&&d===t.gT)return!0
if(q===12){if(b===t.W)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.Q(a,j,c,i,e)||!A.Q(a,i,e,j,c))return!1}return A.ki(a,b.x,c,d.x,e)}if(q===11){if(b===t.W)return!0
if(p)return!1
return A.ki(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.mq(a,b,c,d,e)}if(o&&q===10)return A.mv(a,b,c,d,e)
return!1},
ki(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.Q(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.Q(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.Q(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.Q(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.Q(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
mq(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.cs(a,b,r[o])
return A.kf(a,p,null,c,d.y,e)}return A.kf(a,b.y,null,c,d.y,e)},
kf(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.Q(a,b[s],d,e[s],f))return!1
return!0},
mv(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.Q(a,r[s],c,q[s],e))return!1
return!0},
bI(a){var s=a.w,r=!0
if(!(a===t.P||a===t.v))if(!A.bj(a))if(s!==6)r=s===7&&A.bI(a.x)
return r},
bj(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
ke(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
iI(a){return a>0?new Array(a):v.typeUniverse.sEA},
as:function as(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dh:function dh(){this.c=this.b=this.a=null},
iG:function iG(a){this.a=a},
dg:function dg(){},
by:function by(a){this.a=a},
lG(){var s,r,q
if(self.scheduleImmediate!=null)return A.mS()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.dr(new A.ih(s),1)).observe(r,{childList:true})
return new A.ig(s,r,q)}else if(self.setImmediate!=null)return A.mT()
return A.mU()},
lH(a){self.scheduleImmediate(A.dr(new A.ii(t.M.a(a)),0))},
lI(a){self.setImmediate(A.dr(new A.ij(t.M.a(a)),0))},
lJ(a){A.jl(B.G,t.M.a(a))},
jl(a,b){return A.lV(0,b)},
lV(a,b){var s=new A.iE()
s.cq(a,b)
return s},
mB(a){return new A.dd(new A.U($.O,a.h("U<0>")),a.h("dd<0>"))},
mb(a,b){a.$2(0,null)
b.b=!0
return b.a},
m8(a,b){A.mc(a,b)},
ma(a,b){var s,r,q=b.$ti
q.h("1/?").a(a)
s=a==null?q.c.a(a):a
if(!b.b)b.a.cw(s)
else{r=b.a
if(q.h("aQ<1>").b(s))r.bx(s)
else r.bz(s)}},
m9(a,b){var s=A.aN(a),r=A.bG(a),q=b.b,p=b.a
if(q)p.b3(new A.ap(s,r))
else p.bw(new A.ap(s,r))},
mc(a,b){var s,r,q=new A.iK(b),p=new A.iL(b)
if(a instanceof A.U)a.bM(q,p,t.z)
else{s=t.z
if(a instanceof A.U)a.cd(q,p,s)
else{r=new A.U($.O,t.c)
r.a=8
r.c=a
r.bM(q,p,s)}}},
mQ(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.O.cb(new A.iP(s),t.o,t.S,t.z)},
k7(a,b,c){return 0},
j9(a){var s
if(t.U.b(a)){s=a.gaL()
if(s!=null)return s}return B.a1},
lg(a,b){var s
if(!b.b(null))throw A.j(A.eo(null,"computation","The type parameter is not nullable"))
s=new A.U($.O,b.h("U<0>"))
A.lC(a,new A.fW(null,s,b))
return s},
ip(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.lA()
b.bw(new A.ap(new A.az(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bG(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aB()
b.aN(o.a)
A.bd(b,p)
return}b.a^=2
A.dp(null,null,b.b,t.M.a(new A.iq(o,b)))},
bd(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.u,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.jt(m.a,m.b)}return}q.a=b
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
A.jt(j.a,j.b)
return}g=$.O
if(g!==h)$.O=h
else g=null
c=c.c
if((c&15)===8)new A.iu(q,d,n).$0()
else if(o){if((c&1)!==0)new A.it(q,j).$0()}else if((c&2)!==0)new A.is(d,q).$0()
if(g!=null)$.O=g
c=q.c
if(c instanceof A.U){p=q.a.$ti
p=p.h("aQ<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aP(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.ip(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.aP(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
mF(a,b){var s
if(t.C.b(a))return b.cb(a,t.z,t.K,t.l)
s=t.A
if(s.b(a))return s.a(a)
throw A.j(A.eo(a,"onError",u.c))},
mC(){var s,r
for(s=$.bC;s!=null;s=$.bC){$.cx=null
r=s.b
$.bC=r
if(r==null)$.cw=null
s.a.$0()}},
mL(){$.js=!0
try{A.mC()}finally{$.cx=null
$.js=!1
if($.bC!=null)$.jE().$1(A.kq())}},
kn(a){var s=new A.de(a),r=$.cw
if(r==null){$.bC=$.cw=s
if(!$.js)$.jE().$1(A.kq())}else $.cw=r.b=s},
mI(a){var s,r,q,p=$.bC
if(p==null){A.kn(a)
$.cx=$.cw
return}s=new A.de(a)
r=$.cx
if(r==null){s.b=p
$.bC=$.cx=s}else{q=r.b
s.b=q
$.cx=r.b=s
if(q==null)$.cw=s}},
nw(a,b){A.W(a,"stream",t.K)
return new A.dm(b.h("dm<0>"))},
lC(a,b){var s=$.O
if(s===B.l)return A.jl(a,t.M.a(b))
return A.jl(a,t.M.a(s.bV(b)))},
jt(a,b){A.mI(new A.iO(a,b))},
kl(a,b,c,d,e){var s,r=$.O
if(r===c)return d.$0()
$.O=c
s=r
try{r=d.$0()
return r}finally{$.O=s}},
mH(a,b,c,d,e,f,g){var s,r=$.O
if(r===c)return d.$1(e)
$.O=c
s=r
try{r=d.$1(e)
return r}finally{$.O=s}},
mG(a,b,c,d,e,f,g,h,i){var s,r=$.O
if(r===c)return d.$2(e,f)
$.O=c
s=r
try{r=d.$2(e,f)
return r}finally{$.O=s}},
dp(a,b,c,d){t.M.a(d)
if(B.l!==c){d=c.bV(d)
d=d}A.kn(d)},
ih:function ih(a){this.a=a},
ig:function ig(a,b,c){this.a=a
this.b=b
this.c=c},
ii:function ii(a){this.a=a},
ij:function ij(a){this.a=a},
iE:function iE(){},
iF:function iF(a,b){this.a=a
this.b=b},
dd:function dd(a,b){this.a=a
this.b=!1
this.$ti=b},
iK:function iK(a){this.a=a},
iL:function iL(a){this.a=a},
iP:function iP(a){this.a=a},
aJ:function aJ(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aw:function aw(a,b){this.a=a
this.$ti=b},
ap:function ap(a,b){this.a=a
this.b=b},
fW:function fW(a,b,c){this.a=a
this.b=b
this.c=c},
bc:function bc(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
U:function U(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
il:function il(a,b){this.a=a
this.b=b},
ir:function ir(a,b){this.a=a
this.b=b},
iq:function iq(a,b){this.a=a
this.b=b},
io:function io(a,b){this.a=a
this.b=b},
im:function im(a,b){this.a=a
this.b=b},
iu:function iu(a,b,c){this.a=a
this.b=b
this.c=c},
iv:function iv(a,b){this.a=a
this.b=b},
iw:function iw(a){this.a=a},
it:function it(a,b){this.a=a
this.b=b},
is:function is(a,b){this.a=a
this.b=b},
de:function de(a){this.a=a
this.b=null},
dm:function dm(a){this.$ti=a},
cu:function cu(){},
dl:function dl(){},
iD:function iD(a,b){this.a=a
this.b=b},
iO:function iO(a,b){this.a=a
this.b=b},
jT(a,b){return new A.aD(a.h("@<0>").K(b).h("aD<1,2>"))},
P(a,b,c){return b.h("@<0>").K(c).h("jS<1,2>").a(A.n_(a,new A.aD(b.h("@<0>").K(c).h("aD<1,2>"))))},
a4(a,b){return new A.aD(a.h("@<0>").K(b).h("aD<1,2>"))},
lq(a){return new A.at(a.h("at<0>"))},
b7(a){return new A.at(a.h("at<0>"))},
lr(a,b){return b.h("jU<0>").a(A.n0(a,new A.at(b.h("at<0>"))))},
jn(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
iB(a,b,c){var s=new A.be(a,b,c.h("be<0>"))
s.c=a.e
return s},
aR(a,b){var s=J.I(a)
if(s.j())return s.gp()
return null},
af(a,b,c){var s=A.jT(b,c)
a.a9(0,new A.h2(s,b,c))
return s},
h4(a){var s,r
if(A.jA(a))return"{...}"
s=new A.bu("")
try{r={}
B.a.k($.aj,a)
s.a+="{"
r.a=!0
a.a9(0,new A.h5(r,s))
s.a+="}"}finally{if(0>=$.aj.length)return A.o($.aj,-1)
$.aj.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
at:function at(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dk:function dk(a){this.a=a
this.c=this.b=null},
be:function be(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
h2:function h2(a,b,c){this.a=a
this.b=b
this.c=c},
E:function E(){},
F:function F(){},
h3:function h3(a){this.a=a},
h5:function h5(a,b){this.a=a
this.b=b},
ct:function ct(){},
bq:function bq(){},
cd:function cd(){},
bt:function bt(){},
cn:function cn(){},
bz:function bz(){},
mD(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aN(r)
q=A.jP(String(s))
throw A.j(q)}q=A.iM(p)
return q},
iM(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.di(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.iM(a[s])
return a},
jR(a,b,c){return new A.bY(a,b)},
me(a){return a.H()},
lK(a,b){return new A.iy(a,[],A.mX())},
lL(a,b,c){var s,r=new A.bu(""),q=A.lK(r,b)
q.aX(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
di:function di(a,b){this.a=a
this.b=b
this.c=null},
dj:function dj(a){this.a=a},
cG:function cG(){},
cI:function cI(){},
bY:function bY(a,b){this.a=a
this.b=b},
cU:function cU(a,b){this.a=a
this.b=b},
fZ:function fZ(){},
h0:function h0(a){this.b=a},
h_:function h_(a){this.a=a},
iz:function iz(){},
iA:function iA(a,b){this.a=a
this.b=b},
iy:function iy(a,b,c){this.c=a
this.a=b
this.b=c},
na(a){var s=A.lx(a,null)
if(s!=null)return s
throw A.j(A.jP(a))},
lc(a,b){a=A.R(a,new Error())
if(a==null)a=A.cv(a)
a.stack=b.q(0)
throw a},
jg(a,b,c,d){var s,r=c?J.jQ(a,d):J.ln(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
c0(a,b,c){var s,r=A.c([],c.h("u<0>"))
for(s=J.I(a);s.j();)B.a.k(r,c.a(s.gp()))
if(b)return r
r.$flags=1
return r},
p(a,b){var s,r
if(Array.isArray(a))return A.c(a.slice(0),b.h("u<0>"))
s=A.c([],b.h("u<0>"))
for(r=J.I(a);r.j();)B.a.k(s,r.gp())
return s},
aU(a,b){var s=A.c0(a,!1,b)
s.$flags=3
return s},
jZ(a,b,c){var s=J.I(b)
if(!s.j())return a
if(c.length===0){do a+=A.v(s.gp())
while(s.j())}else{a+=A.v(s.gp())
while(s.j())a=a+c+A.v(s.gp())}return a},
lA(){return A.bG(new Error())},
lb(a,b,c){var s,r
for(s=0;s<4;++s){r=a[s]
if(r.b===b)return r}throw A.j(A.eo(b,"name","No enum value with that name"))},
cL(a){if(typeof a=="number"||A.jr(a)||a==null)return J.b_(a)
if(typeof a=="string")return JSON.stringify(a)
return A.jW(a)},
ld(a,b){A.W(a,"error",t.K)
A.W(b,"stackTrace",t.l)
A.lc(a,b)},
cD(a){return new A.cC(a)},
cB(a,b){return new A.az(!1,null,b,a)},
eo(a,b,c){return new A.az(!0,a,b,c)},
b8(a,b,c,d,e){return new A.c8(b,c,!0,a,d,"Invalid value")},
ly(a,b,c){if(0>a||a>c)throw A.j(A.b8(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.j(A.b8(b,a,c,"end",null))
return b}return c},
c9(a,b){if(a<0)throw A.j(A.b8(a,0,null,b,null))
return a},
jc(a,b,c,d){return new A.cN(b,!0,a,d,"Index out of range")},
bb(a){return new A.ce(a)},
k1(a){return new A.db(a)},
jY(a){return new A.cc(a)},
a1(a){return new A.cH(a)},
jP(a){return new A.ae(a)},
lm(a,b,c){var s,r
if(A.jA(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.c([],t.s)
B.a.k($.aj,a)
try{A.mz(a,s)}finally{if(0>=$.aj.length)return A.o($.aj,-1)
$.aj.pop()}r=A.jZ(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
jd(a,b,c){var s,r
if(A.jA(a))return b+"..."+c
s=new A.bu(b)
B.a.k($.aj,a)
try{r=s
r.a=A.jZ(r.a,a,", ")}finally{if(0>=$.aj.length)return A.o($.aj,-1)
$.aj.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
mz(a,b){var s,r,q,p,o,n,m,l=a.gC(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.j())return
s=A.v(l.gp())
B.a.k(b,s)
k+=s.length+2;++j}if(!l.j()){if(j<=5)return
if(0>=b.length)return A.o(b,-1)
r=b.pop()
if(0>=b.length)return A.o(b,-1)
q=b.pop()}else{p=l.gp();++j
if(!l.j()){if(j<=4){B.a.k(b,A.v(p))
return}r=A.v(p)
if(0>=b.length)return A.o(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gp();++j
for(;l.j();p=o,o=n){n=l.gp();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.o(b,-1)
k-=b.pop().length+2;--j}B.a.k(b,"...")
return}}q=A.v(p)
r=A.v(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.o(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.k(b,m)
B.a.k(b,q)
B.a.k(b,r)},
ji(a,b,c,d){var s
if(B.m===c){s=J.ag(a)
b=J.ag(b)
return A.i4(A.aF(A.aF($.ds(),s),b))}if(B.m===d){s=J.ag(a)
b=J.ag(b)
c=J.ag(c)
return A.i4(A.aF(A.aF(A.aF($.ds(),s),b),c))}s=J.ag(a)
b=J.ag(b)
c=J.ag(c)
d=J.ag(d)
d=A.i4(A.aF(A.aF(A.aF(A.aF($.ds(),s),b),c),d))
return d},
lt(a){var s,r,q=$.ds()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.w)(a),++r)q=A.aF(q,J.ag(a[r]))
return A.i4(q)},
cJ:function cJ(){},
df:function df(){},
C:function C(){},
cC:function cC(a){this.a=a},
aG:function aG(){},
az:function az(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
c8:function c8(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
cN:function cN(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
ce:function ce(a){this.a=a},
db:function db(a){this.a=a},
cc:function cc(a){this.a=a},
cH:function cH(a){this.a=a},
d3:function d3(){},
cb:function cb(){},
ik:function ik(a){this.a=a},
ae:function ae(a){this.a=a},
a:function a(){},
a9:function a9(a,b,c){this.a=a
this.b=b
this.$ti=c},
aa:function aa(){},
A:function A(){},
dn:function dn(){},
i3:function i3(){this.b=this.a=0},
bu:function bu(a){this.a=a},
jH(a,b,c,d){var s,r,q,p,o,n=t.N,m=t.S,l=a.gac(),k=a.gac(),j=a.gac(),i=A.a4(m,m)
for(s=a.gN(),r=J.I(s.a),s=new A.T(r,s.b,s.$ti.h("T<1>"));s.j();){q=r.gp()
i.A(0,q.a,q.d)}s=A.a4(n,t.J)
for(r=d.length,p=0;p<d.length;d.length===r||(0,A.w)(d),++p){o=d[p]
s.A(0,o.a,o)}return new A.b1(a,b,c,l.b,k.c,j.d,i,s,A.b7(n),A.b7(n),A.b7(n),A.b7(m),A.b7(m),A.b7(m),A.a4(m,t.y))},
ep:function ep(a){this.a=a},
b1:function b1(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
dP:function dP(a){this.a=a},
dx:function dx(a,b){this.a=a
this.b=b},
dO:function dO(){},
e1:function e1(a,b){this.a=a
this.b=b},
e2:function e2(){},
e0:function e0(a){this.a=a},
dX:function dX(a){this.a=a},
dY:function dY(a){this.a=a},
dZ:function dZ(a){this.a=a},
e_:function e_(a){this.a=a},
dV:function dV(a){this.a=a},
dW:function dW(a){this.a=a},
dy:function dy(){},
dz:function dz(a){this.a=a},
dA:function dA(a,b){this.a=a
this.b=b},
dB:function dB(a,b,c){this.a=a
this.b=b
this.c=c},
dF:function dF(a,b){this.a=a
this.b=b},
dC:function dC(a){this.a=a},
dD:function dD(){},
dE:function dE(a,b){this.a=a
this.b=b},
dG:function dG(a){this.a=a},
dH:function dH(){},
dI:function dI(a){this.a=a},
dJ:function dJ(){},
dK:function dK(a){this.a=a},
dL:function dL(a){this.a=a},
dN:function dN(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dM:function dM(a){this.a=a},
dQ:function dQ(a){this.a=a},
dR:function dR(a){this.a=a},
dS:function dS(){},
dT:function dT(a){this.a=a},
dU:function dU(a){this.a=a},
aP(a,b,c,d){var s,r=b.f,q=A.i(r)
q=new A.d(r,q.h("e(1)").a(new A.eu(a)),q.h("d<1>")).gm(0)
r=b.gN()
if(!b.gN().gC(0).j())s=0
else{s=b.gac().r
if(s==null){s=c.b.i(0,"countryIncome")
s.toString
s=B.b.l(s)}}return new A.et(a,q,r.G(0,s,new A.ev(d,c),t.S),b,c)},
et:function et(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eu:function eu(a){this.a=a},
ev:function ev(a,b){this.a=a
this.b=b},
a0(a){var s=a.x,r=s>=15?500:0,q=a.e
if(q===2)q=1000
else q=q===1?30:0
return a.w*3+a.r*0.35+a.f*0.15+s*1.5-a.y*2+r+q},
ac(a,b){var s=b?a.x*0.75:0,r=a.e
if(r===1)r=30
else r=r===2?-200:0
return a.w*100+a.r*0.35+a.f*0.15-a.y*2-s+r},
nm(a){return t.r.a(a).x>=15},
ku(a,b){var s=a.gbg(),r=a.gJ(),q=b.b.i(0,"soldierPower")
q.toString
return s*(a.w+r*B.b.l(q))},
bH(a,b,c,d){var s,r=b.b,q=r.i(0,"soldierHp")
q.toString
q=B.b.l(q)
s=b.bU(a.w,c,!1)
r=r.i(0,"soldierPower")
r.toString
return(a.f+d*q)*(s+d*B.b.l(r))*(1+b.dh(B.b.aH(a.ax))/1000)},
b3:function b3(a,b){this.a=a
this.b=b},
bJ:function bJ(a,b,c){this.a=a
this.b=b
this.c=c},
ew:function ew(a,b,c){this.a=a
this.b=b
this.c=c},
ex:function ex(){},
ey:function ey(){},
jJ(b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7=A.x(b9.i(0,"interval")),b8=A.V(b9.i(0,"resourceInterval"))
if(b8==null)b8=30
s=A.a_(b9.i(0,"cashBuffer"))
if(s==null)s=12
r=A.V(b9.i(0,"payrollRatio"))
if(r==null)r=0.5
q=A.a_(b9.i(0,"dangerousCountryCities"))
if(q==null)q=5
p=A.V(b9.i(0,"coalitionBudgetBase"))
if(p==null)p=0.5
o=A.V(b9.i(0,"coalitionBudgetStep"))
if(o==null)o=0.25
n=A.V(b9.i(0,"coalitionTargetBase"))
if(n==null)n=45
m=A.V(b9.i(0,"coalitionTargetStep"))
if(m==null)m=15
l=A.V(b9.i(0,"coalitionPayrollCeiling"))
if(l==null)l=0.8
k=A.V(b9.i(0,"coalitionTravel"))
if(k==null)k=45
j=A.V(b9.i(0,"targetTravelScale"))
if(j==null)j=25
i=A.V(b9.i(0,"hatredTargetBonus"))
if(i==null)i=90
h=A.V(b9.i(0,"breakthroughMargin"))
if(h==null)h=0.1
g=A.x(b9.i(0,"threat"))
f=A.x(b9.i(0,"urgent"))
e=A.x(b9.i(0,"margin"))
d=A.x(b9.i(0,"commit"))
c=A.a_(b9.i(0,"rearExtra"))
if(c==null)c=1
b=A.h(b9.i(0,"candidates"))
a=A.h(b9.i(0,"assessments"))
a0=A.h(b9.i(0,"routes"))
a1=A.h(b9.i(0,"plans"))
a2=A.h(b9.i(0,"commands"))
a3=A.h(b9.i(0,"team"))
a4=A.a_(b9.i(0,"fronts"))
if(a4==null)a4=2
a5=A.a_(b9.i(0,"singleFrontMonths"))
if(a5==null)a5=12
a6=A.V(b9.i(0,"splitForce"))
if(a6==null)a6=2.25
a7=A.V(b9.i(0,"splitAdvantage"))
if(a7==null)a7=0.3
a8=A.V(b9.i(0,"arrivalSpread"))
if(a8==null)a8=20
a9=A.V(b9.i(0,"expeditionSeconds"))
if(a9==null)a9=900
b0=A.V(b9.i(0,"assaultCommitDistance"))
if(b0==null)b0=64
b1=A.V(b9.i(0,"recallCriticalMargin"))
if(b1==null)b1=0.25
b2=A.a_(b9.i(0,"attritionCombat"))
if(b2==null)b2=8
b3=A.h(b9.i(0,"targets"))
b4=A.h(b9.i(0,"slice"))
b5=A.x(b9.i(0,"advantage"))
b6=A.x(b9.i(0,"expansion"))
return new A.cA(b7,g,f,e,b8,s,r,q,p,o,n,m,l,k,j,i,h,d,A.x(b9.i(0,"age")),c,b,a,a0,a1,a2,a3,b3,b4,a4,a5,a6,a7,a8,a9,b0,b1,b2,b5,b6,A.h(b9.i(0,"timeout")),A.h(b9.i(0,"restarts")),A.x(b9.i(0,"stagnation")))},
cA:function cA(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2){var _=this
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
au:function au(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ez:function ez(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.r=_.f=_.e=$
_.w=null
_.x=e},
eV:function eV(){},
eW:function eW(a){this.a=a},
eX:function eX(){},
f7:function f7(){},
fa:function fa(){},
fb:function fb(){},
fc:function fc(a){this.a=a},
fd:function fd(a){this.a=a},
fe:function fe(a,b){this.a=a
this.b=b},
ff:function ff(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fg:function fg(a){this.a=a},
eY:function eY(a,b,c){this.a=a
this.b=b
this.c=c},
eZ:function eZ(a){this.a=a},
f_:function f_(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
f0:function f0(a,b,c){this.a=a
this.b=b
this.c=c},
f1:function f1(){},
f2:function f2(a){this.a=a},
f3:function f3(a){this.a=a},
f4:function f4(){},
f5:function f5(a,b){this.a=a
this.b=b},
f6:function f6(a){this.a=a},
f8:function f8(){},
f9:function f9(a){this.a=a},
eI:function eI(a,b){this.a=a
this.b=b},
eJ:function eJ(a){this.a=a},
eA:function eA(a){this.a=a},
eE:function eE(a){this.a=a},
eF:function eF(a,b,c){this.a=a
this.b=b
this.c=c},
eG:function eG(a,b,c){this.a=a
this.b=b
this.c=c},
eH:function eH(a){this.a=a},
eN:function eN(a){this.a=a},
eO:function eO(a,b){this.a=a
this.b=b},
eP:function eP(a){this.a=a},
eQ:function eQ(a,b){this.a=a
this.b=b},
eR:function eR(a){this.a=a},
eS:function eS(a){this.a=a},
eT:function eT(){},
eU:function eU(a){this.a=a},
eL:function eL(a){this.a=a},
eM:function eM(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eK:function eK(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eB:function eB(a,b,c){this.a=a
this.b=b
this.c=c},
eC:function eC(a){this.a=a},
eD:function eD(a){this.a=a},
ad:function ad(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fh:function fh(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fR:function fR(a,b){this.a=a
this.b=b},
fS:function fS(a){this.a=a},
fQ:function fQ(a){this.a=a},
fT:function fT(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fO:function fO(){},
fN:function fN(){},
fP:function fP(){},
fM:function fM(){},
fV:function fV(){},
fU:function fU(a){this.a=a},
fi:function fi(){},
fj:function fj(){},
fk:function fk(){},
ft:function ft(){},
fu:function fu(a){this.a=a},
fv:function fv(){},
fw:function fw(){},
fx:function fx(a){this.a=a},
fy:function fy(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fz:function fz(a){this.a=a},
fA:function fA(a){this.a=a},
fl:function fl(){},
fm:function fm(a){this.a=a},
fB:function fB(a,b){this.a=a
this.b=b},
fn:function fn(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fo:function fo(a,b){this.a=a
this.b=b},
fp:function fp(){},
fq:function fq(a){this.a=a},
fr:function fr(a){this.a=a},
fs:function fs(){},
fI:function fI(){},
fJ:function fJ(a){this.a=a},
fK:function fK(a){this.a=a},
fL:function fL(){},
fC:function fC(){},
fF:function fF(a){this.a=a},
fG:function fG(a){this.a=a},
fH:function fH(a){this.a=a},
fD:function fD(){},
fE:function fE(){},
ec(a){var s,r=a.length
if(0>=r)return A.o(a,0)
s=A.x(a[0])
if(1>=r)return A.o(a,1)
return new A.r(s,A.x(a[1]))},
r:function r(a,b){this.a=a
this.b=b},
eb:function eb(a){this.a=a},
jG(b8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=A.L(b8.i(0,"id")),a5=A.h(b8.i(0,"c")),a6=A.h(b8.i(0,"home")),a7=A.h(b8.i(0,"o")),a8=A.h(b8.i(0,"t")),a9=A.x(b8.i(0,"hp")),b0=A.h(b8.i(0,"max")),b1=A.h(b8.i(0,"a")),b2=A.h(b8.i(0,"p")),b3=A.h(b8.i(0,"pay")),b4=t.j,b5=A.ec(b4.a(b8.i(0,"xy"))),b6=A.ec(b4.a(b8.i(0,"v"))),b7=A.h(b8.i(0,"s"))
if(!(b7>=0&&b7<8))return A.o(B.J,b7)
b7=B.J[b7]
s=A.c([],t.n)
for(r=b4.a(b8.i(0,"troops")),q=r.length,p=0;p<r.length;r.length===q||(0,A.w)(r),++p)s.push(A.x(r[p]))
r=A.x(b8.i(0,"m"))
q=b8.i(0,"to")==null?null:A.ec(b4.a(b8.i(0,"to")))
o=A.a_(b8.i(0,"target"))
n=A.x(b8.i(0,"return"))
m=A.aX(b8.i(0,"dispatch"))
l=A.aX(b8.i(0,"move"))
k=A.aX(b8.i(0,"dismiss"))
j=A.aX(b8.i(0,"upgrade"))
i=A.aX(b8.i(0,"retreat"))
h=A.aX(b8.i(0,"marked"))
g=A.L(b8.i(0,"rev"))
f=A.h(b8.i(0,"orderRev"))
e=A.bB(b8.i(0,"opponent"))
d=A.h(b8.i(0,"clashes"))
c=A.x(b8.i(0,"received"))
b=A.x(b8.i(0,"dealt"))
a=A.c([],t._)
for(a0=J.I(t.R.a(b8.i(0,"returnPath")));a0.j();){a1=b4.a(a0.gp())
a2=a1.length
if(0>=a2)return A.o(a1,0)
a3=A.x(a1[0])
if(1>=a2)return A.o(a1,1)
a.push(new A.r(a3,A.x(a1[1])))}b4=A.a_(b8.i(0,"regionCity"))
a0=A.a_(b8.i(0,"salaryPaidMonth"))
if(a0==null)a0=-1
a1=A.bA(b8.i(0,"movementPending"))
return new A.n(a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b5,b6,b7,A.aU(s,t.i),r,q,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,b4,a0,a1===!0)},
l_(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
s=B.c.t(b.x,a.x)
if(s!==0)return s
r=B.c.t(b.w,a.w)
if(r!==0)return r
q=a.e===2
if(q!==(b.e===2))return q?-1:1
return B.c.t(a.d,b.d)},
kY(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=A.h(a3.i(0,"id")),c=A.h(a3.i(0,"c")),b=A.h(a3.i(0,"native")),a=A.h(a3.i(0,"level")),a0=t.j,a1=A.ec(a0.a(a3.i(0,"xy"))),a2=A.c([],t._)
for(s=a0.a(a3.i(0,"outline")),r=s.length,q=0;q<s.length;s.length===r||(0,A.w)(s),++q){p=a0.a(s[q])
o=p.length
if(0>=o)return A.o(p,0)
n=A.x(p[0])
if(1>=o)return A.o(p,1)
a2.push(new A.r(n,A.x(p[1])))}a0=A.h(a3.i(0,"income"))
s=A.h(a3.i(0,"poor"))
r=A.h(a3.i(0,"cap"))
p=A.h(a3.i(0,"recruitCap"))
o=A.aX(a3.i(0,"recruit"))
n=A.bA(a3.i(0,"upgrade"))
m=A.L(a3.i(0,"rev"))
l=A.h(a3.i(0,"baseIncome"))
k=A.a_(a3.i(0,"initial"))
j=A.h(a3.i(0,"wins"))
i=A.bB(a3.i(0,"attacker"))
h=A.bB(a3.i(0,"defender"))
g=A.L(a3.i(0,"stage"))
f=A.x(a3.i(0,"next"))
e=A.bA(a3.i(0,"fallen"))
return new A.D(d,c,b,a,a1,new A.eb(a2),a0,s,r,p,l,o,n!==!1,m,k,j,i,h,g,f,e===!0,A.x(a3.i(0,"danger")))},
kZ(a){var s,r,q,p,o,n=A.h(a.i(0,"id")),m=A.h(a.i(0,"gold")),l=A.h(a.i(0,"reserves")),k=A.h(a.i(0,"capacity")),j=A.h(a.i(0,"salary")),i=A.h(a.i(0,"poor")),h=A.a_(a.i(0,"baseIncome")),g=A.V(a.i(0,"garrisonAccrued"))
if(g==null)g=0
s=A.bA(a.i(0,"soldierRecruitmentAllowed"))
r=t.S
q=A.a4(r,r)
for(p=t.f.a(a.i(0,"hate")).gau(),p=p.gC(p);p.j();){o=p.gp()
q.A(0,A.na(A.L(o.a)),A.h(o.b))}return new A.b0(n,m,l,k,j,i,h,g,s!==!1,A.ja(q,r,r))},
l0(a){var s,r,q,p,o,n,m=A.h(a.i(0,"country")),l=A.h(a.i(0,"tick")),k=A.x(a.i(0,"month")),j=A.c([],t.Y)
for(s=t.R,r=J.I(s.a(a.i(0,"cities"))),q=t.f,p=t.N,o=t.z;r.j();)j.push(A.kY(A.af(q.a(r.gp()),p,o)))
r=A.c([],t.e)
for(n=J.I(s.a(a.i(0,"heroes")));n.j();)r.push(A.jG(A.af(q.a(n.gp()),p,o)))
n=A.c([],t.eu)
for(s=J.I(s.a(a.i(0,"countries")));s.j();)n.push(A.kZ(A.af(q.a(s.gp()),p,o)))
s=A.h(a.i(0,"pool"))
q=A.h(a.i(0,"salary"))
p=A.a_(a.i(0,"year"))
if(p==null)p=1
o=A.a_(a.i(0,"monthIndex"))
if(o==null)o=0
return new A.e4(m,l,p,o,k,A.aU(j,t.q),A.aU(r,t.r),A.aU(n,t.t),s,q)},
al:function al(a,b){this.a=a
this.b=b},
n:function n(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4){var _=this
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
du:function du(){},
dt:function dt(){},
D:function D(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2){var _=this
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
_.dx=a2},
b0:function b0(a,b,c,d,e,f,g,h,i,j){var _=this
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
e4:function e4(a,b,c,d,e,f,g,h,i,j){var _=this
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
e9:function e9(a){this.a=a},
ea:function ea(a){this.a=a},
e7:function e7(a,b){this.a=a
this.b=b},
e6:function e6(a){this.a=a},
e8:function e8(a){this.a=a},
e5:function e5(a){this.a=a},
jv(a,b,c){var s,r,q=null,p=a.as
if(p===B.e||p===B.d||p===B.x)return q
s=c.x.i(0,a.a)
p=s==null
if((p?q:s.b)==="expedition")p=p?q:s.d
else p=a.ch
r=b.E(p)
return r!=null&&r.b!==a.b?r:q},
kp(a,b,c,d){var s,r,q=A.jv(a,b,c)
if(q==null)return!1
s=a.as
r=!0
if(s!==B.v)if(s!==B.w){s=a.z
s=q.f.X(s).F(s)<=d.r.p2}else s=r
else s=r
return s},
c7(a,b,c,d,e){var s=B.a.D(a.f,new A.h8(e,a))?e:null
s=new A.h7(a,b,c,s,d,A.a4(t.S,t.bd))
s.cp(a,b,c,d,e)
return s},
h7:function h7(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
h8:function h8(a,b){this.a=a
this.b=b},
h9:function h9(){},
hd:function hd(a){this.a=a},
hf:function hf(a){this.a=a},
hg:function hg(a){this.a=a},
he:function he(a,b){this.a=a
this.b=b},
hb:function hb(){},
hc:function hc(a,b){this.a=a
this.b=b},
hh:function hh(a){this.a=a},
ha:function ha(a){this.a=a},
d5:function d5(a,b){this.a=a
this.b=b},
hi:function hi(a,b,c){this.a=a
this.b=b
this.c=c},
hj:function hj(a,b){this.a=a
this.b=b},
hm:function hm(a){this.a=a},
hn:function hn(){},
ho:function ho(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hk:function hk(){},
hl:function hl(a){this.a=a},
l3(a){var s,r,q,p,o,n,m,l,k=A.L(a.i(0,"hero")),j=A.L(a.i(0,"role")),i=A.h(a.i(0,"deadline")),h=A.h(a.i(0,"commit")),g=A.a_(a.i(0,"city")),f=A.bB(a.i(0,"enemy")),e=A.c([],t._)
for(s=J.I(t.R.a(a.i(0,"points"))),r=t.j;s.j();){q=r.a(s.gp())
p=q.length
if(0>=p)return A.o(q,0)
o=A.x(q[0])
if(1>=p)return A.o(q,1)
e.push(new A.r(o,A.x(q[1])))}s=A.h(a.i(0,"leg"))
r=A.h(a.i(0,"gold"))
q=A.aX(a.i(0,"slot"))
p=A.bA(a.i(0,"rearStaging"))
o=A.L(a.i(0,"reason"))
n=A.h(a.i(0,"order"))
m=A.a_(a.i(0,"targetCountry"))
l=A.bA(a.i(0,"attrition"))
return new A.a5(k,j,o,g,m,l===!0,f,e,s,i,h,r,q,p===!0,n)},
l1(a){var s,r,q,p,o,n,m,l,k,j,i
if(!J.ay(a.i(0,"protocol"),2))throw A.j(B.a7)
s=A.L(a.i(0,"session"))
r=A.h(a.i(0,"id"))
q=A.L(a.i(0,"rules"))
p=A.L(a.i(0,"map"))
o=t.f
n=t.N
m=t.z
l=A.l0(A.af(o.a(a.i(0,"observation")),n,m))
k=A.h(a.i(0,"deadline"))
j=A.c([],t.m)
for(i=J.I(t.R.a(a.i(0,"tasks")));i.j();)j.push(A.l3(A.af(o.a(i.gp()),n,m)))
o=A.h(a.i(0,"seed"))
n=A.h(a.i(0,"priority"))
m=A.h(a.i(0,"idle"))
i=A.bB(a.i(0,"stage"))
if(i==null)i="full"
return new A.ee(s,q,p,r,k,o,n,m,A.lb(B.ak,i,t.a9),A.a_(a.i(0,"offensiveCountry")),A.a_(a.i(0,"offensiveCity")),l,j)},
jI(a,b,c,d){var s=a.Q
return new A.ed(a.a,a.b,a.c,a.d,s.a,s.b,a.e,d,b,c)},
aB:function aB(a,b){this.a=a
this.b=b},
ao:function ao(a,b){this.a=a
this.b=b},
y:function y(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
a5:function a5(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
M:function M(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bo:function bo(a,b,c,d,e,f,g,h,i,j){var _=this
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
ee:function ee(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
ed:function ed(a,b,c,d,e,f,g,h,i,j){var _=this
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
dq(b0,b1,b2,b3,b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2="soldierLimit",a3="soldierPower",a4="soldierHp",a5={},a6=b2.u(b1.a),a7=A.i(a6).h("K<1>"),a8=A.X(new A.K(a6,a7),0,A.W(b1.ga3(),"count",t.S),a7.h("k.E")).aj(0),a9=A.aP(b1.b,b2,b3,null)
a5.a=a5.b=1
a5.c=0
a5.d=null
a7=b3.cY(b0.w,!1)
a6=b3.b
s=a6.i(0,a2)
s.toString
s=B.b.l(s)
r=a6.i(0,a3)
r.toString
q=a7+s*B.b.l(r)
p=B.a.av(b2.w,new A.iQ(b1)).c
for(a7=b1.db,s=b1.ax,r=b1.ay,o=s==null,n=b1.d,m=b3.d,l=0,k=0;k<a8.length;++k){j=a8[k]
i=a6.i(0,a2)
i.toString
h=Math.min(B.b.l(i),p+j.gJ())
p=Math.max(0,p-(h-j.gJ()))
if(o)i=n
else{i=a7?1:0
i=B.c.v(s-r-i,0,5)}i=Math.max(1,i-k)
g=a6.i(0,a2)
g.toString
f=b4.d1(b0,j,i,h,B.b.l(g))
if(f.a===B.B)return new A.av([!1,-1,0,1])
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
if(!(g>=0&&g<d))return A.o(m,g)
g=m[g]}else g=0
g=B.c.v(e+g,0,63)
e=a6.i(0,a3)
e.toString
c=(g+h*B.b.l(e))/Math.max(1,q)
e=a6.i(0,a4)
e.toString
b=(j.f+h*B.b.l(e))*c*c
l+=b
if(i)a5.c=b}a7=b0.f
s=a6.i(0,a2)
s.toString
s=B.b.l(s)
a6=a6.i(0,a4)
a6.toString
a=a7+s*B.b.l(a6)
a0=Math.max(1,B.b.aq(l/Math.max(1,a*0.85)))
a6=new A.iR(a5,a8,b0,b3,a)
s=b3.r
r=s.fy
if(a0>r)return a6.$0()
o=a8.length
m=o===0
if(!m)n=o===1&&n<=2&&a7>=b0.r*0.8&&a5.b>s.RG||a5.b>s.R8+Math.max(0,o-1)*0.025-b5
else n=!0
if(n){a6=a5.b
a7=a5.a
return new A.av([!1,a6,a9.bn(a6>=s.k4||m?a0:Math.max(2,a0),o),a7])}if(a0>=2&&a7>=b0.r*0.65){a6=a5.b
a7=a5.a
return new A.av([!1,a6,a9.bn(a0,o),a7])}a1=o>1&&a5.a>s.R8&&a5.b>-0.08?Math.min(r,o):0
if(a1===0)return a6.$0()
a6=a5.b
a7=a5.a
return new A.av([!1,a6,a9.bn(a1,o),a7])},
iQ:function iQ(a){this.a=a},
iR:function iR(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
nj(a,b,c,d,e,f,g,h){var s
if(f<3||e)return!1
s=d*h+80+g
return c.aF(0,new A.j2(a,s))&&b.aF(0,new A.j3(a,s))},
j2:function j2(a,b){this.a=a
this.b=b},
j3:function j3(a,b){this.a=a
this.b=b},
hs:function hs(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hx:function hx(){},
hy:function hy(a){this.a=a},
hz:function hz(){},
hK:function hK(a,b,c){this.a=a
this.b=b
this.c=c},
hV:function hV(a,b,c){this.a=a
this.b=b
this.c=c},
hw:function hw(a,b){this.a=a
this.b=b},
ht:function ht(a,b,c){this.a=a
this.b=b
this.c=c},
hu:function hu(){},
hv:function hv(){},
hW:function hW(a,b){this.a=a
this.b=b},
hX:function hX(a,b){this.a=a
this.b=b},
hY:function hY(){},
hZ:function hZ(){},
i1:function i1(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
i0:function i0(a){this.a=a},
hA:function hA(){},
i_:function i_(a,b,c){this.a=a
this.b=b
this.c=c},
hB:function hB(a){this.a=a},
hC:function hC(a,b){this.a=a
this.b=b},
hD:function hD(){},
hE:function hE(){},
hF:function hF(){},
hG:function hG(){},
hH:function hH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hI:function hI(a,b,c){this.a=a
this.b=b
this.c=c},
hJ:function hJ(a){this.a=a},
hL:function hL(){},
hM:function hM(a){this.a=a},
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
hT:function hT(){},
hU:function hU(){},
bm:function bm(a,b,c){this.a=a
this.b=b
this.d=c},
ef:function ef(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eg:function eg(){},
eh:function eh(a,b,c){this.a=a
this.b=b
this.c=c},
ei:function ei(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ej:function ej(a,b,c){this.a=a
this.b=b
this.c=c},
ek:function ek(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
l2(a){var s,r=A.L(a.i(0,"version")),q=t.f,p=t.N,o=t.H,n=A.af(q.a(a.i(0,"values")),p,o),m=t.R,l=t.S,k=A.c0(m.a(a.i(0,"upgrades")),!0,l),j=A.c0(m.a(a.i(0,"defenseBonuses")),!0,l),i=t.n,h=A.c([],i)
for(s=J.I(m.a(a.i(0,"movement")));s.j();)h.push(A.x(s.gp()))
i=A.c([],i)
for(m=J.I(m.a(a.i(0,"field")));m.j();)i.push(A.x(m.gp()))
q=A.jJ(A.af(q.a(a.i(0,"tuning")),p,t.z))
m=t.i
return new A.el(r,A.ja(n,p,o),A.aU(k,l),A.aU(j,l),A.aU(h,m),A.aU(i,m),q)},
el:function el(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
e3:function e3(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
en:function en(a,b,c){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=0
_.r=c},
bk(a,b,c,d,e,f){var s,r,q,p,o,n,m=a.a,l=c.u(m),k=A.i(l).h("K<1>"),j=A.X(new A.K(l,k),0,A.W(a.ga3(),"count",t.S),k.h("k.E")).aj(0)
if(j.length===0)s=0
else{l=A.i(j)
s=new A.Y(j,l.h("f(1)").a(new A.j4()),l.h("Y<1,f>")).ad(0,B.z)}l=c.r
k=A.i(l)
r=new A.d(l,k.h("e(1)").a(new A.j5(a)),k.h("d<1>")).G(0,0,new A.j6(),t.i)
k=a.b
l=c.gac().y.i(0,k)
l=B.c.v(l==null?0:l,0,100)
k=A.aP(k,c,d,null)
if(k.ga5()){q=k.e.r
p=q.z+k.gb7()*q.Q}else p=0
o=e^m*7919
o^=o<<13
o^=o>>>17
if(f==null){m=b.z.F(a.e)
k=d.b.i(0,"marchSpeed")
k.toString
q=d.e
if(0>=q.length)return A.o(q,0)
n=m/(k*q[0])}else n=f
if(a.c===b.b)m=1
else{m=d.b.i(0,"foreignYield")
m.toString}k=d.r
return Math.max(1,160+a.z*m*2+r+p+l/100*k.ay-s*0.25-a.d*6)/Math.pow(1+n/k.ax,1.5)+((o^o<<5)&65535)/65536*0.000001},
j4:function j4(){},
j5:function j5(a){this.a=a},
j6:function j6(){},
a2:function a2(a,b,c){this.a=a
this.b=b
this.c=c},
aq:function aq(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.d=c
_.f=d
_.r=e
_.w=f},
er:function er(){},
es:function es(){},
eq:function eq(){},
i5:function i5(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
i6:function i6(a){this.a=a},
i7:function i7(){},
i8:function i8(a){this.a=a},
i9:function i9(a){this.a=a},
ia:function ia(a){this.a=a},
ib:function ib(a){this.a=a},
ic:function ic(){},
em:function em(a){var _=this
_.a=a
_.d=_.c=_.b=0
_.e=!1},
nd(){var s,r,q=new A.j_(),p=v.G,o="web-worker:"+A.L(p.self.constructor.name)
p=A.iJ(p.self)
s=new A.j0(new A.en(q,o,A.b7(t.S)))
if(typeof s=="function")A.aM(A.cB("Attempting to rewrap a JS function.",null))
r=function(a,b){return function(c){return a(b,c,arguments.length)}}(A.md,s)
r[$.jC()]=s
p.onmessage=r
q.$1(B.k.ar(t.G.a(A.P(["kind","hello","protocol",2,"build","38211274","backend",o],t.N,t.X)),null))},
j_:function j_(){},
j0:function j0(a){this.a=a},
kC(a){return v.mangledGlobalNames[a]},
nk(a){throw A.R(new A.bZ("Field '"+a+"' has been assigned during initialization."),new Error())},
S(){throw A.R(A.lp(""),new Error())},
md(a,b,c){t.h.a(a)
if(A.h(c)>=1)return a.$1(b)
return a.$0()},
kx(a,b,c){A.kr(c,t.H,"T","min")
return Math.min(c.a(a),c.a(b))},
kw(a,b,c){A.kr(c,t.H,"T","max")
return Math.max(c.a(a),c.a(b))},
li(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e="nationalAi",d="maxCityLevel",c="initialMonth",b=A.cM($.j7())
for(s=new A.aE(a,A.l(a).h("aE<1,2>")).gC(0),r=t.f,q=t.N,p=t.X;s.j();){o=s.d
n=o.a
m=n==="nationalAi"&&r.b(o.b)
l=o.b
if(m){m=A.cM(r.a($.j7().i(0,e)))
k=A.jT(q,p)
k.I(0,m)
k.I(0,A.cM(r.a(l)))
b.A(0,n,k)}else b.A(0,n,A.jb(l))}j=b.i(0,"poorHarvestAdjustmentMin")
i=b.i(0,"poorHarvestAdjustmentMax")
if(!A.iN(j)||!A.iN(i)||j<0||i<j)A.aM(B.aa)
h=b.i(0,"cityUpgradeCosts")
g=b.i(0,"cityDefenseAttackBonuses")
f=b.i(0,"cityDefenseMoraleBonuses")
s=t.j
if(!s.b(h)||h.length!==4||!s.b(g)||g.length!==5||!s.b(f)||f.length!==5)A.aM(B.a5)
if(A.h(b.i(0,d))!==g.length||A.h(b.i(0,d))!==f.length)A.aM(B.a6)
if(A.h(b.i(0,c))<1||A.h(b.i(0,c))>12||A.x(b.i(0,"secondsPerMonth"))<=0||A.h(b.i(0,d))<1)A.aM(B.a8)
s=A.ja(b,q,p)
$.lh=s
A.jJ(A.af(A.af(r.a(s.i(0,e)),q,p),q,t.z))},
cM(a){var s,r,q=A.a4(t.N,t.X)
for(s=a.gau(),s=s.gC(s);s.j();){r=s.gp()
q.A(0,J.b_(r.a),A.jb(r.b))}return q},
jb(a){var s,r
A:{if(t.f.b(a)){s=A.cM(a)
break A}if(t.j.b(a)){s=[]
for(r=J.I(a);r.j();)s.push(A.jb(r.gp()))
break A}s=a
break A}return s},
n4(a,b,c,d,e,f,g,h){var s,r,q,p,o,n,m,l=null,k=f.F(a),j=!c
if(j&&k>d*b+80)return l
s=h.a
r=h.b
q=Math.sqrt(s*s+r*r)
p=q<0.01?0:((a.a-f.a)*s+(a.b-f.b)*r)/(Math.max(1,k)*q)
if(j&&k>72){if(p<0.45)return l
o=Math.max(0,k*p)
n=new A.r(f.a+s/q*o,f.b+r/q*o)
if(e.X(n).F(n)>48)return l}m=g.$2(f,e.bQ(f,a))
if(isFinite(m))j=!j||m<=b
else j=!1
return j?m:l},
jh(a,b,c){var s=Math.max(0,a-c)
return s*s*b}},B={}
var w=[A,J,B]
var $={}
A.je.prototype={}
J.cP.prototype={
ae(a,b){return a===b},
gR(a){return A.d6(a)},
q(a){return"Instance of '"+A.d7(a)+"'"},
gS(a){return A.aK(A.jq(this))}}
J.cR.prototype={
q(a){return String(a)},
gR(a){return a?519018:218159},
gS(a){return A.aK(t.y)},
$iB:1,
$ie:1}
J.bU.prototype={
ae(a,b){return null==b},
q(a){return"null"},
gR(a){return 0},
$iB:1}
J.bW.prototype={$iN:1}
J.aT.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.d4.prototype={}
J.bv.prototype={}
J.aS.prototype={
q(a){var s=a[$.kE()]
if(s==null)s=a[$.jC()]
if(s==null)return this.co(a)
return"JavaScript function for "+J.b_(s)},
$iaC:1}
J.bV.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.bX.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.u.prototype={
k(a,b){A.i(a).c.a(b)
a.$flags&1&&A.cz(a,29)
a.push(b)},
am(a,b){var s
a.$flags&1&&A.cz(a,"remove",1)
for(s=0;s<a.length;++s)if(J.ay(a[s],b)){a.splice(s,1)
return!0}return!1},
I(a,b){var s
A.i(a).h("a<1>").a(b)
a.$flags&1&&A.cz(a,"addAll",2)
if(Array.isArray(b)){this.cu(a,b)
return}for(s=J.I(b);s.j();)a.push(s.gp())},
cu(a,b){var s,r
t.V.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.j(A.a1(a))
for(r=0;r<s;++r)a.push(b[r])},
bf(a){a.$flags&1&&A.cz(a,"clear","clear")
a.length=0},
df(a,b){var s,r=A.jg(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.A(r,s,A.v(a[s]))
return r.join(b)},
cc(a,b){return A.X(a,0,A.W(b,"count",t.S),A.i(a).c)},
bq(a,b){return A.X(a,b,null,A.i(a).c)},
ad(a,b){var s,r,q
A.i(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.j(A.aA())
if(0>=s)return A.o(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.j(A.a1(a))}return r},
G(a,b,c,d){var s,r,q
d.a(b)
A.i(a).K(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.j(A.a1(a))}return r},
av(a,b){var s,r,q
A.i(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.j(A.a1(a))}throw A.j(A.aA())},
T(a,b){if(!(b>=0&&b<a.length))return A.o(a,b)
return a[b]},
gL(a){if(a.length>0)return a[0]
throw A.j(A.aA())},
gaz(a){var s=a.length
if(s>0)return a[s-1]
throw A.j(A.aA())},
D(a,b){var s,r
A.i(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.j(A.a1(a))}return!1},
aF(a,b){var s,r
A.i(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.j(A.a1(a))}return!0},
B(a,b){var s,r,q,p,o,n=A.i(a)
n.h("b(1,1)?").a(b)
a.$flags&2&&A.cz(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dG()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.dr(b,2))
if(p>0)this.cN(a,p)},
cN(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
n(a,b){var s
for(s=0;s<a.length;++s)if(J.ay(a[s],b))return!0
return!1},
ga6(a){return a.length===0},
gbj(a){return a.length!==0},
q(a){return A.jd(a,"[","]")},
gC(a){return new J.b2(a,a.length,A.i(a).h("b2<1>"))},
gR(a){return A.d6(a)},
gm(a){return a.length},
A(a,b,c){A.i(a).c.a(c)
a.$flags&2&&A.cz(a)
if(!(b>=0&&b<a.length))throw A.j(A.ks(a,b))
a[b]=c},
$im:1,
$ia:1,
$it:1}
J.cQ.prototype={
dz(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.d7(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.fX.prototype={}
J.b2.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.w(q)
throw A.j(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iG:1}
J.bp.prototype={
t(a,b){var s
A.x(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaT(b)
if(this.gaT(a)===s)return 0
if(this.gaT(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaT(a){return a===0?1/a<0:a<0},
l(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.j(A.bb(""+a+".toInt()"))},
aq(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.j(A.bb(""+a+".ceil()"))},
a0(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.j(A.bb(""+a+".floor()"))},
aH(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.j(A.bb(""+a+".round()"))},
v(a,b,c){if(B.c.t(b,c)>0)throw A.j(A.mR(b))
if(this.t(a,b)<0)return b
if(this.t(a,c)>0)return c
return a},
aW(a,b){var s
if(b>20)throw A.j(A.b8(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaT(a))return"-"+s
return s},
q(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gR(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
aZ(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.bL(a,b)},
bd(a,b){return(a|0)===a?a/b|0:this.bL(a,b)},
bL(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.j(A.bb("Result of truncating division is "+A.v(s)+": "+A.v(a)+" ~/ "+A.v(b)))},
bJ(a,b){var s
if(a>0)s=this.cS(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cS(a,b){return b>31?0:a>>>b},
gS(a){return A.aK(t.H)},
$if:1,
$iak:1}
J.bT.prototype={
gS(a){return A.aK(t.S)},
$iB:1,
$ib:1}
J.cS.prototype={
gS(a){return A.aK(t.i)},
$iB:1}
J.b5.prototype={
aM(a,b,c){return a.substring(b,A.ly(b,c,a.length))},
bo(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.j(B.a0)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
di(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bo(c,s)+a},
t(a,b){var s
A.L(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
q(a){return a},
gR(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gS(a){return A.aK(t.N)},
gm(a){return a.length},
$iB:1,
$iH:1}
A.bZ.prototype={
q(a){return"LateInitializationError: "+this.a}}
A.i2.prototype={}
A.m.prototype={}
A.k.prototype={
gC(a){var s=this
return new A.q(s,s.gm(s),A.l(s).h("q<k.E>"))},
ga6(a){return this.gm(this)===0},
c5(a,b,c){var s=A.l(this)
return new A.Y(this,s.K(c).h("1(k.E)").a(b),s.h("@<k.E>").K(c).h("Y<1,2>"))},
ad(a,b){var s,r,q,p=this
A.l(p).h("k.E(k.E,k.E)").a(b)
s=p.gm(p)
if(s===0)throw A.j(A.aA())
r=p.T(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.T(0,q))
if(s!==p.gm(p))throw A.j(A.a1(p))}return r},
G(a,b,c,d){var s,r,q,p=this
d.a(b)
A.l(p).K(d).h("1(1,k.E)").a(c)
s=p.gm(p)
for(r=b,q=0;q<s;++q){r=c.$2(r,p.T(0,q))
if(s!==p.gm(p))throw A.j(A.a1(p))}return r},
dw(a){var s,r=this,q=A.lq(A.l(r).h("k.E"))
for(s=0;s<r.gm(r);++s)q.k(0,r.T(0,s))
return q}}
A.z.prototype={
U(a,b,c,d){var s,r=this.b
A.c9(r,"start")
s=this.c
if(s!=null){A.c9(s,"end")
if(r>s)throw A.j(A.b8(r,0,s,"start",null))}},
gcE(){var s=J.bl(this.a),r=this.c
if(r==null||r>s)return s
return r},
gcU(){var s=J.bl(this.a),r=this.b
if(r>s)return s
return r},
gm(a){var s,r=J.bl(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
T(a,b){var s=this,r=s.gcU()+b
if(b<0||r>=s.gcE())throw A.j(A.jc(b,s.gm(0),s,"index"))
return J.j8(s.a,r)},
aj(a){var s,r,q,p=this,o=p.b,n=p.a,m=J.cy(n),l=m.gm(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.jQ(0,p.$ti.c)
return n}r=A.jg(s,m.T(n,o),!0,p.$ti.c)
for(q=1;q<s;++q){B.a.A(r,q,m.T(n,o+q))
if(m.gm(n)<l)throw A.j(A.a1(p))}return r}}
A.q.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=J.cy(q),o=p.gm(q)
if(r.b!==o)throw A.j(A.a1(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.T(q,s);++r.c
return!0},
$iG:1}
A.ar.prototype={
gC(a){return new A.c1(J.I(this.a),this.b,A.l(this).h("c1<1,2>"))},
gm(a){return J.bl(this.a)}}
A.bN.prototype={$im:1}
A.c1.prototype={
j(){var s=this,r=s.b
if(r.j()){s.a=s.c.$1(r.gp())
return!0}s.a=null
return!1},
gp(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iG:1}
A.Y.prototype={
gm(a){return J.bl(this.a)},
T(a,b){return this.b.$1(J.j8(this.a,b))}}
A.d.prototype={
gC(a){return new A.T(J.I(this.a),this.b,this.$ti.h("T<1>"))}}
A.T.prototype={
j(){var s,r
for(s=this.a,r=this.b;s.j();)if(r.$1(s.gp()))return!0
return!1},
gp(){return this.a.gp()},
$iG:1}
A.bR.prototype={
gC(a){return new A.bS(J.I(this.a),this.b,B.U,this.$ti.h("bS<1,2>"))}}
A.bS.prototype={
gp(){var s=this.d
return s==null?this.$ti.y[1].a(s):s},
j(){var s,r,q=this,p=q.c
if(p==null)return!1
for(s=q.a,r=q.b;!p.j();){q.d=null
if(s.j()){q.c=null
p=J.I(r.$1(s.gp()))
q.c=p}else return!1}q.d=q.c.gp()
return!0},
$iG:1}
A.b9.prototype={
gC(a){var s=this.a
return new A.ba(s.gC(s),this.b,A.l(this).h("ba<1>"))}}
A.bO.prototype={
gm(a){var s=this.a,r=s.gm(s)
s=this.b
if(r>s)return s
return r},
$im:1}
A.ba.prototype={
j(){if(--this.b>=0)return this.a.j()
this.b=-1
return!1},
gp(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gp()},
$iG:1}
A.bP.prototype={
j(){return!1},
gp(){throw A.j(A.aA())},
$iG:1}
A.cf.prototype={
gC(a){return new A.cg(J.I(this.a),this.$ti.h("cg<1>"))}}
A.cg.prototype={
j(){var s,r
for(s=this.a,r=this.$ti.c;s.j();)if(r.b(s.gp()))return!0
return!1},
gp(){return this.$ti.c.a(this.a.gp())},
$iG:1}
A.J.prototype={
sm(a,b){throw A.j(A.bb("Cannot change the length of a fixed-length list"))},
k(a,b){A.aL(a).h("J.E").a(b)
throw A.j(A.bb("Cannot add to a fixed-length list"))}}
A.K.prototype={
gm(a){return this.a.length},
T(a,b){var s=this.a
return J.j8(s,s.length-1-b)}}
A.bg.prototype={$r:"+(1,2)",$s:1}
A.av.prototype={$r:"+breakthrough,lower,teamSize,upper(1,2,3,4)",$s:2}
A.bL.prototype={}
A.bK.prototype={
ga6(a){return this.gm(this)===0},
q(a){return A.h4(this)},
gau(){return new A.aw(this.d9(),A.l(this).h("aw<a9<1,2>>"))},
d9(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gau(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.gaa(),o=o.gC(o),n=A.l(s),m=n.y[1],n=n.h("a9<1,2>")
case 2:if(!o.j()){r=3
break}l=o.gp()
k=s.i(0,l)
r=4
return a.b=new A.a9(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$ia8:1}
A.bM.prototype={
gm(a){return this.b.length},
gbC(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
W(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
i(a,b){if(!this.W(b))return null
return this.b[this.a[b]]},
a9(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbC()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gaa(){return new A.ch(this.gbC(),this.$ti.h("ch<1>"))}}
A.ch.prototype={
gm(a){return this.a.length},
gC(a){var s=this.a
return new A.ci(s,s.length,this.$ti.h("ci<1>"))}}
A.ci.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iG:1}
A.cO.prototype={
ae(a,b){if(b==null)return!1
return b instanceof A.b4&&this.a.ae(0,b.a)&&A.jy(this)===A.jy(b)},
gR(a){return A.ji(this.a,A.jy(this),B.m,B.m)},
q(a){var s=B.a.df([A.aK(this.$ti.c)],", ")
return this.a.q(0)+" with "+("<"+s+">")}}
A.b4.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.n9(A.iT(this.a),this.$ti)}}
A.hp.prototype={
$0(){return B.b.a0(1000*this.a.now())},
$S:10}
A.ca.prototype={}
A.id.prototype={
ab(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.c6.prototype={
q(a){return"Null check operator used on a null value"}}
A.cT.prototype={
q(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.dc.prototype={
q(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.h6.prototype={
q(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.bQ.prototype={}
A.co.prototype={
q(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iaV:1}
A.a6.prototype={
q(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.kD(r==null?"unknown":r)+"'"},
$iaC:1,
gdE(){return this},
$C:"$1",
$R:1,
$D:null}
A.cE.prototype={$C:"$0",$R:0}
A.cF.prototype={$C:"$2",$R:2}
A.da.prototype={}
A.d9.prototype={
q(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.kD(s)+"'"}}
A.bn.prototype={
ae(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bn))return!1
return this.$_target===b.$_target&&this.a===b.a},
gR(a){return(A.ky(this.a)^A.d6(this.$_target))>>>0},
q(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.d7(this.a)+"'")}}
A.d8.prototype={
q(a){return"RuntimeError: "+this.a}}
A.aD.prototype={
gm(a){return this.a},
ga6(a){return this.a===0},
gaa(){return new A.a7(this,A.l(this).h("a7<1>"))},
gau(){return new A.aE(this,A.l(this).h("aE<1,2>"))},
W(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dc(a)},
dc(a){var s=this.d
if(s==null)return!1
return this.bh(this.bB(s,a),a)>=0},
I(a,b){A.l(this).h("a8<1,2>").a(b).a9(0,new A.fY(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.dd(b)},
dd(a){var s,r,q=this.d
if(q==null)return null
s=this.bB(q,a)
r=this.bh(s,a)
if(r<0)return null
return s[r].b},
A(a,b,c){var s,r,q=this,p=A.l(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bu(s==null?q.b=q.bb():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bu(r==null?q.c=q.bb():r,b,c)}else q.de(b,c)},
de(a,b){var s,r,q,p,o=this,n=A.l(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.bb()
r=o.c4(a)
q=s[r]
if(q==null)s[r]=[o.bc(a,b)]
else{p=o.bh(q,a)
if(p>=0)q[p].b=b
else q.push(o.bc(a,b))}},
c9(a,b){var s,r,q=this,p=A.l(q)
p.c.a(a)
p.h("2()").a(b)
if(q.W(a)){s=q.i(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.A(0,a,r)
return r},
am(a,b){var s=this.cr(this.b,b)
return s},
bf(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.ba()}},
a9(a,b){var s,r,q=this
A.l(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.j(A.a1(q))
s=s.c}},
bu(a,b,c){var s,r=A.l(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.bc(b,c)
else s.b=c},
cr(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.cs(s)
delete a[b]
return s.b},
ba(){this.r=this.r+1&1073741823},
bc(a,b){var s=this,r=A.l(s),q=new A.h1(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.ba()
return q},
cs(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.ba()},
c4(a){return J.ag(a)&1073741823},
bB(a,b){return a[this.c4(b)]},
bh(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.ay(a[r].a,b))return r
return-1},
q(a){return A.h4(this)},
bb(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ijS:1}
A.fY.prototype={
$2(a,b){var s=this.a,r=A.l(s)
s.A(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.l(this.a).h("~(1,2)")}}
A.h1.prototype={}
A.a7.prototype={
gm(a){return this.a.a},
ga6(a){return this.a.a===0},
gC(a){var s=this.a
return new A.b6(s,s.r,s.e,this.$ti.h("b6<1>"))},
n(a,b){return this.a.W(b)}}
A.b6.prototype={
gp(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.a1(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iG:1}
A.a3.prototype={
gm(a){return this.a.a},
gC(a){var s=this.a
return new A.ai(s,s.r,s.e,this.$ti.h("ai<1>"))}}
A.ai.prototype={
gp(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.a1(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iG:1}
A.aE.prototype={
gm(a){return this.a.a},
gC(a){var s=this.a
return new A.c_(s,s.r,s.e,this.$ti.h("c_<1,2>"))}}
A.c_.prototype={
gp(){var s=this.d
s.toString
return s},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.a1(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.a9(s.a,s.b,r.$ti.h("a9<1,2>"))
r.c=s.c
return!0}},
$iG:1}
A.iW.prototype={
$1(a){return this.a(a)},
$S:20}
A.iX.prototype={
$2(a,b){return this.a(a,b)},
$S:43}
A.iY.prototype={
$1(a){return this.a(A.L(a))},
$S:42}
A.aI.prototype={
q(a){return this.bN(!1)},
bN(a){var s,r,q,p,o,n=this.cF(),m=this.b9(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.o(m,q)
o=m[q]
l=a?l+A.jW(o):l+A.v(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
cF(){var s,r=this.$s
while($.iC.length<=r)B.a.k($.iC,null)
s=$.iC[r]
if(s==null){s=this.cC()
B.a.A($.iC,r,s)}return s},
cC(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.c(new Array(l),t.L)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.A(k,q,r[s])}}return A.aU(k,t.K)}}
A.bw.prototype={
b9(){return[this.a,this.b]},
ae(a,b){if(b==null)return!1
return b instanceof A.bw&&this.$s===b.$s&&J.ay(this.a,b.a)&&J.ay(this.b,b.b)},
gR(a){return A.ji(this.$s,this.a,this.b,B.m)}}
A.bx.prototype={
b9(){return this.a},
ae(a,b){if(b==null)return!1
return b instanceof A.bx&&this.$s===b.$s&&A.lU(this.a,b.a)},
gR(a){return A.ji(this.$s,A.lt(this.a),B.m,B.m)}}
A.br.prototype={
gS(a){return B.al},
$iB:1}
A.c4.prototype={}
A.cV.prototype={
gS(a){return B.am},
$iB:1}
A.bs.prototype={
gm(a){return a.length},
$iah:1}
A.c2.prototype={$im:1,$ia:1,$it:1}
A.c3.prototype={$im:1,$ia:1,$it:1}
A.cW.prototype={
gS(a){return B.an},
$iB:1}
A.cX.prototype={
gS(a){return B.ao},
$iB:1}
A.cY.prototype={
gS(a){return B.ap},
$iB:1}
A.cZ.prototype={
gS(a){return B.aq},
$iB:1}
A.d_.prototype={
gS(a){return B.ar},
$iB:1}
A.d0.prototype={
gS(a){return B.at},
$iB:1}
A.d1.prototype={
gS(a){return B.au},
$iB:1}
A.c5.prototype={
gS(a){return B.av},
gm(a){return a.length},
$iB:1}
A.d2.prototype={
gS(a){return B.aw},
gm(a){return a.length},
$iB:1,
$ijm:1}
A.cj.prototype={}
A.ck.prototype={}
A.cl.prototype={}
A.cm.prototype={}
A.as.prototype={
h(a){return A.cs(v.typeUniverse,this,a)},
K(a){return A.kd(v.typeUniverse,this,a)}}
A.dh.prototype={}
A.iG.prototype={
q(a){return A.ab(this.a,null)}}
A.dg.prototype={
q(a){return this.a}}
A.by.prototype={$iaG:1}
A.ih.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:21}
A.ig.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:38}
A.ii.prototype={
$0(){this.a.$0()},
$S:22}
A.ij.prototype={
$0(){this.a.$0()},
$S:22}
A.iE.prototype={
cq(a,b){if(self.setTimeout!=null)self.setTimeout(A.dr(new A.iF(this,b),0),a)
else throw A.j(A.bb("`setTimeout()` not found."))}}
A.iF.prototype={
$0(){this.b.$0()},
$S:3}
A.dd.prototype={}
A.iK.prototype={
$1(a){return this.a.$2(0,a)},
$S:44}
A.iL.prototype={
$2(a,b){this.a.$2(1,new A.bQ(a,t.l.a(b)))},
$S:32}
A.iP.prototype={
$2(a,b){this.a(A.h(a),b)},
$S:37}
A.aJ.prototype={
gp(){var s=this.b
return s==null?this.$ti.c.a(s):s},
cO(a,b){var s,r,q
a=A.h(a)
b=b
s=this.a
for(;;)try{r=s(this,a,b)
return r}catch(q){b=q
a=1}},
j(){var s,r,q,p,o=this,n=null,m=0
for(;;){s=o.d
if(s!=null)try{if(s.j()){o.b=s.gp()
return!0}else o.d=null}catch(r){n=r
m=1
o.d=null}q=o.cO(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.k7
return!1}if(0>=p.length)return A.o(p,-1)
o.a=p.pop()
m=0
n=null
continue}if(2===q){m=0
n=null
continue}if(3===q){n=o.c
o.c=null
p=o.e
if(p==null||p.length===0){o.b=null
o.a=A.k7
throw n
return!1}if(0>=p.length)return A.o(p,-1)
o.a=p.pop()
m=1
continue}throw A.j(A.jY("sync*"))}return!1},
bP(a){var s,r,q=this
if(a instanceof A.aw){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.k(r,q.a)
q.a=s
return 2}else{q.d=J.I(a)
return 2}},
$iG:1}
A.aw.prototype={
gC(a){return new A.aJ(this.a(),this.$ti.h("aJ<1>"))}}
A.ap.prototype={
q(a){return A.v(this.a)},
$iC:1,
gaL(){return this.b}}
A.fW.prototype={
$0(){this.c.a(null)
this.b.cA(null)},
$S:3}
A.bc.prototype={
dg(a){if((this.c&15)!==6)return!0
return this.b.b.bm(t.al.a(this.d),a.a,t.y,t.K)},
da(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.dt(q,m,a.b,o,n,t.l)
else p=l.bm(t.A.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.aN(s))){if((r.c&1)!==0)throw A.j(A.cB("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.j(A.cB("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.U.prototype={
cd(a,b,c){var s,r,q=this.$ti
q.K(c).h("1/(2)").a(a)
s=$.O
if(s===B.l){if(!t.C.b(b)&&!t.A.b(b))throw A.j(A.eo(b,"onError",u.c))}else{c.h("@<0/>").K(q.c).h("1(2)").a(a)
b=A.mF(b,s)}r=new A.U(s,c.h("U<0>"))
this.b_(new A.bc(r,3,a,b,q.h("@<1>").K(c).h("bc<1,2>")))
return r},
bM(a,b,c){var s,r=this.$ti
r.K(c).h("1/(2)").a(a)
s=new A.U($.O,c.h("U<0>"))
this.b_(new A.bc(s,19,a,b,r.h("@<1>").K(c).h("bc<1,2>")))
return s},
cQ(a){this.a=this.a&1|16
this.c=a},
aN(a){this.a=a.a&30|this.a&1
this.c=a.c},
b_(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.b_(a)
return}r.aN(s)}A.dp(null,null,r.b,t.M.a(new A.il(r,a)))}},
bG(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.bG(a)
return}m.aN(n)}l.a=m.aP(a)
A.dp(null,null,m.b,t.M.a(new A.ir(l,m)))}},
aB(){var s=t.F.a(this.c)
this.c=null
return this.aP(s)},
aP(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
cA(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("aQ<1>").b(a))A.ip(a,r,!0)
else{s=r.aB()
q.c.a(a)
r.a=8
r.c=a
A.bd(r,s)}},
bz(a){var s,r=this
r.$ti.c.a(a)
s=r.aB()
r.a=8
r.c=a
A.bd(r,s)},
cB(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aB()
q.aN(a)
A.bd(q,r)},
b3(a){var s=this.aB()
this.cQ(a)
A.bd(this,s)},
cw(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("aQ<1>").b(a)){this.bx(a)
return}this.cz(a)},
cz(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dp(null,null,s.b,t.M.a(new A.io(s,a)))},
bx(a){A.ip(this.$ti.h("aQ<1>").a(a),this,!1)
return},
bw(a){this.a^=2
A.dp(null,null,this.b,t.M.a(new A.im(this,a)))},
$iaQ:1}
A.il.prototype={
$0(){A.bd(this.a,this.b)},
$S:3}
A.ir.prototype={
$0(){A.bd(this.b,this.a.a)},
$S:3}
A.iq.prototype={
$0(){A.ip(this.a.a,this.b,!0)},
$S:3}
A.io.prototype={
$0(){this.a.bz(this.b)},
$S:3}
A.im.prototype={
$0(){this.a.b3(this.b)},
$S:3}
A.iu.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.ds(t.fO.a(q.d),t.z)}catch(p){s=A.aN(p)
r=A.bG(p)
if(k.c&&t.u.a(k.b.a.c).a===s){q=k.a
q.c=t.u.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.j9(q)
n=k.a
n.c=new A.ap(q,o)
q=n}q.b=!0
return}if(j instanceof A.U&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.u.a(j.c)
q.b=!0}return}if(j instanceof A.U){m=k.b.a
l=new A.U(m.b,m.$ti)
j.cd(new A.iv(l,m),new A.iw(l),t.o)
q=k.a
q.c=l
q.b=!1}},
$S:3}
A.iv.prototype={
$1(a){this.a.cB(this.b)},
$S:21}
A.iw.prototype={
$2(a,b){A.cv(a)
t.l.a(b)
this.a.b3(new A.ap(a,b))},
$S:31}
A.it.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bm(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aN(l)
r=A.bG(l)
q=s
p=r
if(p==null)p=A.j9(q)
o=this.a
o.c=new A.ap(q,p)
o.b=!0}},
$S:3}
A.is.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.u.a(l.a.a.c)
p=l.b
if(p.a.dg(s)&&p.a.e!=null){p.c=p.a.da(s)
p.b=!1}}catch(o){r=A.aN(o)
q=A.bG(o)
p=t.u.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.j9(p)
m=l.b
m.c=new A.ap(p,n)
p=m}p.b=!0}},
$S:3}
A.de.prototype={}
A.dm.prototype={}
A.cu.prototype={$ik2:1}
A.dl.prototype={
du(a){var s,r,q
t.M.a(a)
try{if(B.l===$.O){a.$0()
return}A.kl(null,null,this,a,t.o)}catch(q){s=A.aN(q)
r=A.bG(q)
A.jt(A.cv(s),t.l.a(r))}},
bV(a){return new A.iD(this,t.M.a(a))},
ds(a,b){b.h("0()").a(a)
if($.O===B.l)return a.$0()
return A.kl(null,null,this,a,b)},
bm(a,b,c,d){c.h("@<0>").K(d).h("1(2)").a(a)
d.a(b)
if($.O===B.l)return a.$1(b)
return A.mH(null,null,this,a,b,c,d)},
dt(a,b,c,d,e,f){d.h("@<0>").K(e).K(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.O===B.l)return a.$2(b,c)
return A.mG(null,null,this,a,b,c,d,e,f)},
cb(a,b,c,d){return b.h("@<0>").K(c).K(d).h("1(2,3)").a(a)}}
A.iD.prototype={
$0(){return this.a.du(this.b)},
$S:3}
A.iO.prototype={
$0(){A.ld(this.a,this.b)},
$S:3}
A.at.prototype={
cI(){return new A.at(A.l(this).h("at<1>"))},
gC(a){var s=this,r=new A.be(s,s.r,A.l(s).h("be<1>"))
r.c=s.e
return r},
gm(a){return this.a},
n(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cD(b)},
cD(a){var s=this.d
if(s==null)return!1
return this.b8(s[this.b4(a)],a)>=0},
k(a,b){var s,r,q=this
A.l(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.by(s==null?q.b=A.jn():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.by(r==null?q.c=A.jn():r,b)}else return q.ct(b)},
ct(a){var s,r,q,p=this
A.l(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jn()
r=p.b4(a)
q=s[r]
if(q==null)s[r]=[p.b2(a)]
else{if(p.b8(q,a)>=0)return!1
q.push(p.b2(a))}return!0},
am(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bI(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bI(s.c,b)
else return s.cM(b)},
cM(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.b4(a)
r=n[s]
q=o.b8(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bO(p)
return!0},
by(a,b){A.l(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.b2(b)
return!0},
bI(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bO(s)
delete a[b]
return!0},
b1(){this.r=this.r+1&1073741823},
b2(a){var s,r=this,q=new A.dk(A.l(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.b1()
return q},
bO(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.b1()},
b4(a){return J.ag(a)&1073741823},
b8(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.ay(a[r].a,b))return r
return-1},
$ijU:1}
A.dk.prototype={}
A.be.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.j(A.a1(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iG:1}
A.h2.prototype={
$2(a,b){this.a.A(0,this.b.a(a),this.c.a(b))},
$S:39}
A.E.prototype={
gC(a){return new A.q(a,a.length,A.aL(a).h("q<E.E>"))},
T(a,b){if(!(b>=0&&b<a.length))return A.o(a,b)
return a[b]},
ga6(a){return a.length===0},
gbj(a){return a.length!==0},
gL(a){var s=a.length
if(s===0)throw A.j(A.aA())
if(0>=s)return A.o(a,0)
return a[0]},
gaz(a){var s,r=a.length
if(r===0)throw A.j(A.aA())
s=r-1
if(!(s>=0))return A.o(a,s)
return a[s]},
bq(a,b){return A.X(a,b,null,A.aL(a).h("E.E"))},
k(a,b){var s
A.aL(a).h("E.E").a(b)
s=a.length
this.sm(a,s+1)
if(!(s<a.length))return A.o(a,s)
a[s]=b},
q(a){return A.jd(a,"[","]")}}
A.F.prototype={
a9(a,b){var s,r,q,p=A.l(this)
p.h("~(F.K,F.V)").a(b)
for(s=this.gaa(),s=s.gC(s),p=p.h("F.V");s.j();){r=s.gp()
q=this.i(0,r)
b.$2(r,q==null?p.a(q):q)}},
ce(a,b,c){var s,r=this,q=A.l(r)
q.h("F.K").a(a)
q.h("F.V(F.V)").a(b)
q.h("F.V()?").a(c)
if(r.W(a)){s=r.i(0,a)
q=b.$1(s==null?q.h("F.V").a(s):s)
r.A(0,a,q)
return q}q=c.$0()
r.A(0,a,q)
return q},
gau(){return this.gaa().c5(0,new A.h3(this),A.l(this).h("a9<F.K,F.V>"))},
W(a){return this.gaa().n(0,a)},
gm(a){var s=this.gaa()
return s.gm(s)},
ga6(a){var s=this.gaa()
return s.ga6(s)},
q(a){return A.h4(this)},
$ia8:1}
A.h3.prototype={
$1(a){var s=this.a,r=A.l(s)
r.h("F.K").a(a)
s=s.i(0,a)
if(s==null)s=r.h("F.V").a(s)
return new A.a9(a,s,r.h("a9<F.K,F.V>"))},
$S(){return A.l(this.a).h("a9<F.K,F.V>(F.K)")}}
A.h5.prototype={
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
A.bq.prototype={
i(a,b){return this.a.i(0,b)},
a9(a,b){this.a.a9(0,this.$ti.h("~(1,2)").a(b))},
ga6(a){return this.a.a===0},
gm(a){return this.a.a},
q(a){return A.h4(this.a)},
gau(){var s=this.a
return new A.aE(s,A.l(s).h("aE<1,2>"))},
$ia8:1}
A.cd.prototype={}
A.bt.prototype={
I(a,b){var s
A.l(this).h("a<1>").a(b)
for(s=b.gC(b);s.j();)this.k(0,s.gp())},
q(a){return A.jd(this,"{","}")},
G(a,b,c,d){var s,r,q,p
d.a(b)
s=A.l(this)
s.K(d).h("1(1,2)").a(c)
for(s=A.iB(this,this.r,s.c),r=s.$ti.c,q=b;s.j();){p=s.d
q=c.$2(q,p==null?r.a(p):p)}return q},
D(a,b){var s,r,q=A.l(this)
q.h("e(1)").a(b)
for(q=A.iB(this,this.r,q.c),s=q.$ti.c;q.j();){r=q.d
if(b.$1(r==null?s.a(r):r))return!0}return!1},
$im:1,
$ia:1,
$ijk:1}
A.cn.prototype={
d7(a){var s,r,q,p=this,o=p.cI()
for(s=A.iB(p,p.r,A.l(p).c),r=s.$ti.c;s.j();){q=s.d
if(q==null)q=r.a(q)
if(!a.n(0,q))o.k(0,q)}return o}}
A.bz.prototype={}
A.di.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cJ(b):s}},
gm(a){return this.b==null?this.c.a:this.aA().length},
ga6(a){return this.gm(0)===0},
gaa(){if(this.b==null){var s=this.c
return new A.a7(s,A.l(s).h("a7<1>"))}return new A.dj(this)},
A(a,b,c){var s,r,q=this
A.L(b)
if(q.b==null)q.c.A(0,b,c)
else if(q.W(b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.cW().A(0,b,c)},
W(a){if(this.b==null)return this.c.W(a)
return!1},
a9(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.a9(0,b)
s=o.aA()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.iM(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.j(A.a1(o))}},
aA(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.c(Object.keys(this.a),t.s)
return s},
cW(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.a4(t.N,t.z)
r=n.aA()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.A(0,o,n.i(0,o))}if(p===0)B.a.k(r,"")
else B.a.bf(r)
n.a=n.b=null
return n.c=s},
cJ(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.iM(this.a[a])
return this.b[a]=s}}
A.dj.prototype={
gm(a){return this.a.gm(0)},
T(a,b){var s=this.a
if(s.b==null)s=s.gaa().T(0,b)
else{s=s.aA()
if(!(b>=0&&b<s.length))return A.o(s,b)
s=s[b]}return s},
gC(a){var s=this.a
if(s.b==null){s=s.gaa()
s=s.gC(s)}else{s=s.aA()
s=new J.b2(s,s.length,A.i(s).h("b2<1>"))}return s},
n(a,b){return this.a.W(b)}}
A.cG.prototype={}
A.cI.prototype={}
A.bY.prototype={
q(a){var s=A.cL(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.cU.prototype={
q(a){return"Cyclic error in JSON stringify"}}
A.fZ.prototype={
d3(a,b){var s=A.mD(a,this.gd4().a)
return s},
ar(a,b){var s=A.lL(a,this.gd8().b,null)
return s},
gd8(){return B.aj},
gd4(){return B.ai}}
A.h0.prototype={}
A.h_.prototype={}
A.iz.prototype={
cg(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.o.aM(a,r,q)
r=q+1
o=A.Z(92)
s.a+=o
o=A.Z(117)
s.a+=o
o=A.Z(100)
s.a+=o
o=p>>>8&15
o=A.Z(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.Z(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.Z(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.o.aM(a,r,q)
r=q+1
o=A.Z(92)
s.a+=o
switch(p){case 8:o=A.Z(98)
s.a+=o
break
case 9:o=A.Z(116)
s.a+=o
break
case 10:o=A.Z(110)
s.a+=o
break
case 12:o=A.Z(102)
s.a+=o
break
case 13:o=A.Z(114)
s.a+=o
break
default:o=A.Z(117)
s.a+=o
o=A.Z(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.Z(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.Z(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.o.aM(a,r,q)
r=q+1
o=A.Z(92)
s.a+=o
o=A.Z(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.o.aM(a,r,m)},
b0(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.j(new A.cU(a,null))}B.a.k(s,a)},
aX(a){var s,r,q,p,o=this
if(o.cf(a))return
o.b0(a)
try{s=o.b.$1(a)
if(!o.cf(s)){q=A.jR(a,null,o.gbD())
throw A.j(q)}q=o.a
if(0>=q.length)return A.o(q,-1)
q.pop()}catch(p){r=A.aN(p)
q=A.jR(a,r,o.gbD())
throw A.j(q)}},
cf(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.b.q(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.cg(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.b0(a)
q.dB(a)
s=q.a
if(0>=s.length)return A.o(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.b0(a)
r=q.dC(a)
s=q.a
if(0>=s.length)return A.o(s,-1)
s.pop()
return r}else return!1},
dB(a){var s,r=this.c
r.a+="["
if(J.kT(a)){if(0>=a.length)return A.o(a,0)
this.aX(a[0])
for(s=1;s<a.length;++s){r.a+=","
this.aX(a[s])}}r.a+="]"},
dC(a){var s,r,q,p,o,n,m=this,l={}
if(a.ga6(a)){m.c.a+="{}"
return!0}s=a.gm(a)*2
r=A.jg(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.a9(0,new A.iA(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.cg(A.L(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.o(r,n)
m.aX(r[n])}p.a+="}"
return!0}}
A.iA.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.A(s,r.a++,a)
B.a.A(s,r.a++,b)},
$S:23}
A.iy.prototype={
gbD(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.cJ.prototype={
ae(a,b){if(b==null)return!1
return b instanceof A.cJ},
gR(a){return B.c.gR(0)},
q(a){return"0:00:00."+B.o.di(B.c.q(0),6,"0")}}
A.df.prototype={
q(a){return this.aO()},
$icK:1}
A.C.prototype={
gaL(){return A.lv(this)}}
A.cC.prototype={
q(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cL(s)
return"Assertion failed"}}
A.aG.prototype={}
A.az.prototype={
gb6(){return"Invalid argument"+(!this.a?"(s)":"")},
gb5(){return""},
q(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gb6()+q+o
if(!s.a)return n
return n+s.gb5()+": "+A.cL(s.gbi())},
gbi(){return this.b}}
A.c8.prototype={
gbi(){return A.V(this.b)},
gb6(){return"RangeError"},
gb5(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.v(q):""
else if(q==null)s=": Not greater than or equal to "+A.v(r)
else if(q>r)s=": Not in inclusive range "+A.v(r)+".."+A.v(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.v(r)
return s}}
A.cN.prototype={
gbi(){return A.h(this.b)},
gb6(){return"RangeError"},
gb5(){if(A.h(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gm(a){return this.f}}
A.ce.prototype={
q(a){return"Unsupported operation: "+this.a}}
A.db.prototype={
q(a){return"UnimplementedError: "+this.a}}
A.cc.prototype={
q(a){return"Bad state: "+this.a}}
A.cH.prototype={
q(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.cL(s)+"."}}
A.d3.prototype={
q(a){return"Out of Memory"},
gaL(){return null},
$iC:1}
A.cb.prototype={
q(a){return"Stack Overflow"},
gaL(){return null},
$iC:1}
A.ik.prototype={
q(a){return"Exception: "+this.a}}
A.ae.prototype={
q(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.a.prototype={
c5(a,b,c){var s=A.l(this)
return A.ls(this,s.K(c).h("1(a.E)").a(b),s.h("a.E"),c)},
dA(a,b){var s=A.l(this)
return new A.d(this,s.h("e(a.E)").a(b),s.h("d<a.E>"))},
G(a,b,c,d){var s,r
d.a(b)
A.l(this).K(d).h("1(1,a.E)").a(c)
for(s=this.gC(this),r=b;s.j();)r=c.$2(r,s.gp())
return r},
aF(a,b){var s
A.l(this).h("e(a.E)").a(b)
for(s=this.gC(this);s.j();)if(!b.$1(s.gp()))return!1
return!0},
D(a,b){var s
A.l(this).h("e(a.E)").a(b)
for(s=this.gC(this);s.j();)if(b.$1(s.gp()))return!0
return!1},
gm(a){var s,r=this.gC(this)
for(s=0;r.j();)++s
return s},
cc(a,b){return A.k_(this,b,A.l(this).h("a.E"))},
gL(a){var s=this.gC(this)
if(!s.j())throw A.j(A.aA())
return s.gp()},
gaz(a){var s,r=this.gC(this)
if(!r.j())throw A.j(A.aA())
do s=r.gp()
while(r.j())
return s},
T(a,b){var s,r
A.c9(b,"index")
s=this.gC(this)
for(r=b;s.j();){if(r===0)return s.gp();--r}throw A.j(A.jc(b,b-r,this,"index"))},
q(a){return A.lm(this,"(",")")}}
A.a9.prototype={
q(a){return"MapEntry("+A.v(this.a)+": "+A.v(this.b)+")"}}
A.aa.prototype={
gR(a){return A.A.prototype.gR.call(this,0)},
q(a){return"null"}}
A.A.prototype={$iA:1,
ae(a,b){return this===b},
gR(a){return A.d6(this)},
q(a){return"Instance of '"+A.d7(this)+"'"},
gS(a){return A.n2(this)},
toString(){return this.q(this)}}
A.dn.prototype={
q(a){return""},
$iaV:1}
A.i3.prototype={
gc1(){var s,r=this.b
if(r==null)r=$.hr.$0()
s=r-this.a
if($.jD()===1e6)return s
return s*1000},
br(){var s=this,r=s.b
if(r!=null){s.a=s.a+($.hr.$0()-r)
s.b=null}}}
A.bu.prototype={
gm(a){return this.a.length},
q(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ilB:1}
A.ep.prototype={}
A.b1.prototype={
gbR(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=t.S,f=A.a4(g,g)
for(g=h.x,g=new A.ai(g,g.r,g.e,A.l(g).h("ai<2>")),s=h.a,r=h.y,q=h.z,p=s.b,o=s.a;g.j();){n=g.d
m=s.a1(n.a)
l=!0
if(n.as){k=n.d
if(k!=null)if(m!=null)if(!m.fr)if(!(m.f<=0)){j=m.a
if(!r.n(0,j)){i=m.as
if(!((i===B.e||i===B.d)&&!q.n(0,j)))if(n.y>=p){l=s.E(k)
l=(l==null?null:l.b)!==o}}}}if(l)continue
n=n.d
n.toString
f.ce(n,new A.dv(),new A.dw())}return f},
P(){var s,r=this,q=r.x,p=A.l(q).h("a3<2>")
q=A.p(new A.a3(q,p),p.h("a.E"))
s=A.jH(r.a,r.b,r.c,q)
s.d=r.d
s.e=r.e
s.f=r.f
s.r=r.r
q=s.w
q.bf(0)
q.I(0,r.w)
s.y.I(0,r.y)
s.z.I(0,r.z)
s.Q.I(0,r.Q)
s.as.I(0,r.as)
s.ax.I(0,r.ax)
s.at.I(0,r.at)
s.ay.I(0,r.ay)
return s},
u(a){var s=this.a.u(a),r=A.i(s),q=r.h("d<1>")
s=A.p(new A.d(s,r.h("e(1)").a(new A.dP(this)),q),q.h("a.E"))
return s},
O(a){var s
if(a.ax==null){s=this.w.i(0,a.a)
if(s==null)s=a.d}else s=a.ga3()
return s},
M(a){var s,r=this.u(a).length,q=this.gbR().i(0,a)
if(q==null)q=0
s=this.as.n(0,a)?1:0
return r+q+s},
bS(a){var s,r=this,q=r.a.r,p=A.i(q)
p=new A.d(q,p.h("e(1)").a(new A.dx(r,a)),p.h("d<1>")).gm(0)
q=r.gbR().i(0,a)
if(q==null)q=0
s=r.as.n(0,a)?1:0
return p+q+s},
a8(a){var s=a.a
if(B.a.D(this.u(s),new A.dO()))return 2
return this.at.n(0,s)||this.aK(a)?0:1},
aK(a){return this.ay.c9(a.a,new A.e1(this,a))},
ca(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=A.b7(t.S)
for(s=J.kX(t.E.a(a),g.b.r.go),s=s.gC(s),r=g.c,q=g.a;s.j();){p=s.gp()
o=q.gN()
n=o.$ti
m=n.h("d<a.E>")
l=A.p(new A.d(o,n.h("e(a.E)").a(new A.dV(g)),m),m.h("a.E"))
B.a.B(l,new A.dW(p))
o=A.i(l)
n=o.h("z<1>")
m=new A.z(l,0,3,n)
m.U(l,0,3,o.c)
m=new A.q(m,m.gm(0),n.h("q<k.E>"))
p=p.f
n=n.h("k.E")
k=null
j=1/0
while(m.j()){o=m.d
i=o==null?n.a(o):o
o=i.e
h=r.af(o,p.X(o))
if(h<j){j=h
k=i}}if(k!=null)f.k(0,k.a)}return f},
ap(a){var s,r,q,p,o,n,m,l,k=this,j=a.c,i=k.a.E(j)
if(i==null)return!1
s=k.u(j)
j=A.i(s)
r=j.h("e(1)")
j=j.h("d<1>")
q=A.aR(new A.d(s,r.a(new A.dy()),j),t.r)
if(q!=null){if(s.length<=2||a.a===q.a)return!1
p=A.p(new A.d(s,r.a(new A.dz(q)),j),j.h("a.E"))
B.a.B(p,new A.dA(k,i))
j=B.a.gL(p)
r=k.b
o=k.O(i)
n=r.b.i(0,"soldierLimit")
n.toString
m=A.i(p)
return a.a!==new A.d(p,m.h("e(1)").a(new A.dB(k,i,A.bH(j,r,o,B.b.l(n)))),m.h("d<1>")).gaz(0).a}if(k.aK(i))return!(a.x>=15&&a.w<12)
if(s.length<=1)return!1
o=new A.dF(k,i)
B.a.B(s,new A.dC(o))
l=A.p(new A.d(s,r.a(A.mV()),j),j.h("a.E"))
B.a.B(l,new A.dD())
if(l.length!==0)return a.a!==B.a.gL(l).a
n=o.$1(B.a.gL(s))
if(typeof n!=="number")return n.bo()
return a.a!==new A.d(s,r.a(new A.dE(o,n*0.6)),j).gaz(0).a},
al(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d="monthSeconds",c=e.b,b=c.b,a=b.i(0,d)
a.toString
s=b.i(0,"budgetSafety")
s.toString
r=Math.min(c.r.p1,a+s)
c=e.a
a=c.r
s=A.i(a)
q=s.h("e(1)")
s=s.h("d<1>")
p=t.S
o=new A.d(a,q.a(new A.dG(e)),s).G(0,e.r,new A.dH(),p)
n=new A.d(a,q.a(new A.dI(e)),s).G(0,0,new A.dJ(),p)
s=c.gN()
q=s.$ti
a=q.h("d<a.E>")
m=A.p(new A.d(s,q.h("e(a.E)").a(new A.dK(e)),a),a.h("a.E"))
if(m.length===0)a=0
else{a=c.gac().r
if(a==null){a=b.i(0,"countryIncome")
a.toString
a=B.b.l(a)}s=b.i(0,"poorPenalty")
s.toString
s=a-B.b.l(s)
a=s}l=new A.dN(e,o,a+B.a.G(m,0,new A.dL(e),p),n,e.gbk())
k=A.lr([r],t.i)
j=A.c([],t.n)
i=c.e
c=r+1e-9
h=i
while(h<=c){k.k(0,h)
B.a.k(j,h)
a=b.i(0,d)
a.toString
h+=a}for(c=A.iB(k,k.r,k.$ti.c),a=c.$ti.c,g=0;c.j();){s=c.d
if(s==null)s=a.a(s)
if(s+1e-9<i)f=0
else{q=b.i(0,d)
q.toString
f=1+B.b.a0((s-i)/q)}if(B.a.D(j,new A.dM(s)))g=Math.max(g,A.iS(l.$1(Math.max(0,f-1))))
g=Math.max(g,A.iS(l.$1(f)))}c=Math.max(0,g)
if(a0)b=0
else{b=b.i(0,"emergencyGold")
b.toString
b=B.b.l(b)}return new A.ep(c+b)},
V(){return this.al(!1)},
aJ(a,b){var s,r,q,p,o,n,m,l,k=this,j="capacityPerLevel",i=!0
if(a.as)if(!k.ax.n(0,a.a))if(b.dx){i=b.a
i=k.y.n(0,i)||k.z.n(0,i)}if(i)return!1
i=k.w
s=a.a
r=i.i(0,s)
r.toString
q=k.b
p=q.c
o=p.length
if(r>o)n=null
else{m=r-1
if(!(m>=0))return A.o(p,m)
n=B.c.v(p[m]-b.x,0,99999)}if(r>=q.ah(k.a.c)||n==null||k.d<=n)return!1
if(a.b===a.c)l=1
else{p=q.b.i(0,"foreignYield")
p.toString
l=p}p=k.f
o=r+1
q=q.b
m=q.i(0,j)
m.toString
m=B.b.a0(o*B.b.l(m)*l)
q=q.i(0,j)
q.toString
k.f=p+(m-B.b.a0(r*B.b.l(q)*l))
k.d=k.d-n
i.A(0,s,o)
k.ax.k(0,s)
return!0},
gbk(){return this.a.gN().G(0,0,new A.dQ(this),t.S)},
c0(a){var s,r,q,p,o=this
if(!a.db||a.e===2||o.y.n(0,a.a))return!1
s=a.as
r=s!==B.e
if(!r||s===B.d){q=a.c
q=!o.at.n(0,q)&&o.u(q).length<=1}else q=!1
if(q)return!1
q=a.a
o.y.k(0,q)
o.x.am(0,q)
o.Q.k(0,q)
o.d=o.d+a.x
q=o.f
p=o.e
o.e=Math.min(q,p+(!r||s===B.d?a.gJ():0))
return!0},
ak(){var s,r,q,p=this,o=Math.max(0,p.f-p.e)
if(p.a.gac().x){s=p.d
r=p.b.b.i(0,"soldierCost")
r.toString
r=Math.max(0,B.c.aZ(s,B.b.l(r)))
s=r}else s=0
q=Math.min(o,s)
return q>0&&p.bW(q)?q:0},
bW(a){var s,r,q=this
if(!q.a.gac().x)return!1
s=q.b.b.i(0,"soldierCost")
s.toString
r=a*B.b.l(s)
if(a>0){s=q.d
s=s<=0||r>s||q.e+a>q.f}else s=!0
if(s)return!1
q.d-=r
q.e+=a
return!0},
bl(a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d="drawCost",c=e.b,b=c.b,a=b.i(0,d)
a.toString
s=B.b.l(a)
a=e.a
r=a.r
q=A.i(r)
p=a.y
o=t.S
n=new A.d(r,q.h("e(1)").a(new A.dR(e)),q.h("d<1>")).G(0,e.r+p,new A.dS(),o)
q=a.gac().r
if(q==null){r=b.i(0,"countryIncome")
r.toString
r=B.b.l(r)}else r=q
q=a.gN()
m=q.$ti
l=r+new A.d(q,m.h("e(a.E)").a(new A.dT(e)),m.h("d<a.E>")).G(0,0,new A.dU(e),o)
o=b.i(0,"garrisonFree")
k=B.b.l(o==null?2:o)
r=b.i(0,"garrisonFactor")
j=B.b.l(r==null?0:r)
r=a0.a
i=e.M(r)
h=e.gbk()+A.jh(i+1,j,k)-A.jh(i,j,k)
q=n+h
if(q<=l*(a1?1.3:1.1)){if(a1)c=1
else if(a2==null)c=c.r.r
else{c=A.aP(a2,a,c,null)
o=c.e.r
if(c.ga5()){m=o.r
c=Math.max(m,Math.min(o.as,m+c.gaS()*0.2))}else c=o.r}g=n<=l*c}else g=!1
f=(a.c>=3||a1||q<=l)&&e.d-s>=e.al(a1).a+p+Math.max(0,h-e.gbk())
c=!0
if(a0.Q){q=e.as
if(!q.n(0,r))if(a.x>q.a){a=e.d
b=b.i(0,d)
b.toString
if(a>B.b.l(b))if(e.d>=s)c=!(g||f)}}if(c)return!1
e.d-=s
e.r+=p
e.as.k(0,r)
return!0},
dm(a,b){return this.bl(a,!1,b)},
dl(a,b){return this.bl(a,b,null)},
d5(a,b){var s,r,q,p=this
if(a.cx){s=a.a
s=p.Q.n(0,s)||p.y.n(0,s)}else s=!0
if(s)return!1
s=a.c
r=!1
if(p.u(s).length<=1){q=p.a
if(q.E(s)!=null){q=q.E(s)
q.toString
q=p.aK(q)}else q=!1
if(!q){r=!(p.at.n(0,s)&&b.b==="evacuate"&&b.as)
s=r}else s=r}else s=r
if(s)return!1
s=p.e
r=p.b.b.i(0,"soldierLimit")
r.toString
p.e=s-Math.min(s,B.b.l(r)-a.gJ())
r=a.a
p.z.k(0,r)
p.Q.k(0,r)
p.x.A(0,r,b)
return!0},
dn(a,b){var s
if(!a.cy||this.Q.n(0,a.a)||a.fr)return!1
s=a.a
this.Q.k(0,s)
this.x.A(0,s,b)
return!0}}
A.dv.prototype={
$1(a){return A.h(a)+1},
$S:14}
A.dw.prototype={
$0(){return 1},
$S:10}
A.dP.prototype={
$1(a){var s=this.a,r=t.r.a(a).a
return!s.y.n(0,r)&&!s.z.n(0,r)},
$S:0}
A.dx.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.c===this.b&&a.f>0&&!a.fr&&!s.y.n(0,a.a)},
$S:0}
A.dO.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.e1.prototype={
$0(){var s,r,q,p,o,n,m,l,k,j=new A.e2(),i=this.b,h=this.a,g=h.a
if(i.b===g.a){s=g.gN().gm(0)
r=j.$1(i)
q=h.b
p=q.b.i(0,"marchSpeed")
p.toString
o=B.a.ad(q.e,B.z)
n=g.f
m=A.i(n)
l=m.h("e(1)").a(new A.dX(h))
j=m.h("+(r,f)(1)").a(new A.dY(j))
g=g.r
k=A.i(g)
q=A.nj(i.e,new A.ar(new A.d(g,k.h("e(1)").a(new A.dZ(h)),k.h("d<1>")),k.h("+(r,e)(1)").a(new A.e_(i)),k.h("ar<1,+(r,e)>")),new A.ar(new A.d(n,l,m.h("d<1>")),j,m.h("ar<1,+(r,f)>")),p*o,i.ax!=null,s,r,q.r.b)
j=q}else j=!1
return j},
$S:48}
A.e2.prototype={
$1(a){return B.a.G(a.f.a,0,new A.e0(a),t.i)},
$S:58}
A.e0.prototype={
$2(a,b){return Math.max(A.an(a),this.a.e.F(t.c1.a(b)))},
$S:59}
A.dX.prototype={
$1(a){return t.q.a(a).b!==this.a.a.a},
$S:1}
A.dY.prototype={
$1(a){t.q.a(a)
return new A.bg(a.e,this.a.$1(a))},
$S:34}
A.dZ.prototype={
$1(a){var s
t.r.a(a)
if(a.b!==this.a.a.a){s=a.as
s=!(s===B.e||s===B.d)&&!a.fr&&a.f>0}else s=!1
return s},
$S:0}
A.e_.prototype={
$1(a){t.r.a(a)
return new A.bg(a.z,a.k4===this.a.a)},
$S:36}
A.dV.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.a
r=a.a
q=!1
if(!s.at.n(0,r))if(a.Q)s=a.ax==null||s.M(r)<s.O(a)
else s=q
else s=q
return s},
$S:1}
A.dW.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.F(s),b.e.F(s))},
$S:4}
A.dy.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.dz.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.dA.prototype={
$2(a,b){var s,r,q,p,o,n="soldierLimit",m=t.r
m.a(a)
m.a(b)
m=this.a
s=m.b
r=this.b
q=m.O(r)
p=s.b
o=p.i(0,n)
o.toString
o=A.bH(b,s,q,B.b.l(o))
r=m.O(r)
p=p.i(0,n)
p.toString
return B.b.t(o,A.bH(a,s,r,B.b.l(p)))},
$S:2}
A.dB.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=s.b
s=s.O(this.b)
q=r.b.i(0,"soldierLimit")
q.toString
return A.bH(a,r,s,B.b.l(q))>=this.c*0.6},
$S:0}
A.dF.prototype={
$1(a){var s=this.a,r=s.b,q=s.O(this.b),p=r.b.i(0,"soldierLimit")
p.toString
return A.bH(a,r,q,Math.min(B.b.l(p),s.e))},
$S:24}
A.dC.prototype={
$2(a,b){var s,r=t.r
r.a(a)
s=this.a
return J.kR(s.$1(r.a(b)),s.$1(a))},
$S:2}
A.dD.prototype={
$2(a,b){var s,r=t.r
r.a(a)
r.a(b)
s=B.c.t(b.x,a.x)
return s!==0?s:B.c.t(a.w,b.w)},
$S:2}
A.dE.prototype={
$1(a){var s=this.a.$1(t.r.a(a))
if(typeof s!=="number")return s.dF()
return s>=this.b},
$S:0}
A.dG.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.y.n(0,a.a)},
$S:0}
A.dH.prototype={
$2(a,b){return A.h(a)+t.r.a(b).y},
$S:7}
A.dI.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=s.a
return a.b===r.a&&a.f>0&&!s.y.n(0,a.a)&&a.ok===r.d},
$S:0}
A.dJ.prototype={
$2(a,b){return A.h(a)+t.r.a(b).y},
$S:7}
A.dK.prototype={
$1(a){return!this.a.at.n(0,t.q.a(a).a)},
$S:1}
A.dL.prototype={
$2(a,b){var s,r,q
A.h(a)
t.q.a(b)
s=this.a
r=s.w.i(0,b.a)
r.toString
s=s.b.b
q=s.i(0,"incomeStep")
q.toString
q=B.b.l(q)
if(b.b===b.c)s=1
else{s=s.i(0,"foreignYield")
s.toString}return a+B.b.a0((b.z+(r-1)*q)*s)},
$S:5}
A.dN.prototype={
$1(a){var s,r,q,p=this
if(a===0)s=0
else{s=p.a
r=s.a
q=r.gac()
s=s.b.b.i(0,"monthSeconds")
s.toString
s=a*(p.b-p.c)-p.d+B.b.aq(q.w+p.e*(r.e/s+a-1))}return s},
$S:14}
A.dM.prototype={
$1(a){return Math.abs(A.an(a)-this.a)<1e-7},
$S:15}
A.dQ.prototype={
$2(a,b){var s,r,q
A.h(a)
s=this.a
r=s.M(t.q.a(b).a)
s=s.b.b
q=s.i(0,"garrisonFree")
q=B.b.l(q==null?2:q)
s=s.i(0,"garrisonFactor")
return a+A.jh(r,B.b.l(s==null?0:s),q)},
$S:5}
A.dR.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.y.n(0,a.a)},
$S:0}
A.dS.prototype={
$2(a,b){return A.h(a)+t.r.a(b).y},
$S:7}
A.dT.prototype={
$1(a){return!this.a.at.n(0,t.q.a(a).a)},
$S:1}
A.dU.prototype={
$2(a,b){var s,r,q
A.h(a)
t.q.a(b)
s=this.a
r=s.w.i(0,b.a)
if(r==null)r=b.d
s=s.b.b
q=s.i(0,"incomeStep")
q.toString
q=B.b.l(q)
if(b.b===b.c)s=1
else{s=s.i(0,"foreignYield")
s.toString}return a+B.b.a0((b.z+(r-1)*q)*s)},
$S:5}
A.et.prototype={
ga5(){var s=this
return s.a!==s.d.a&&s.b>=s.e.r.w},
gb7(){return Math.max(0,this.b-this.e.r.w)},
gaS(){if(this.ga5()){var s=this.e.r
s=Math.max(0,s.x+this.gb7()*s.y)}else s=0
return s},
bn(a,b){return a===0||!this.ga5()||b<=1?a:Math.min(this.e.r.fy,a+1+B.c.bd(this.gb7(),2))}}
A.eu.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.ev.prototype={
$2(a,b){var s,r
A.h(a)
t.q.a(b)
s=this.a
s=s==null?null:s.i(0,b.a)
if(s==null)s=b.d
r=this.b.b.i(0,"incomeStep")
r.toString
return a+b.z+(s-1)*B.b.l(r)},
$S:5}
A.b3.prototype={
aO(){return"CombatAdvantage."+this.b}}
A.bJ.prototype={}
A.ew.prototype={
aE(a1,a2,a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l=this,k="soldierHp",j=a6==null,i=j?a1.gJ():a6,h=a4==null,g=h?a2.gJ():a4,f=a1.f,e=a1.at,d=a2.f,c=a2.at,b=a1.a+":"+A.v(f)+":"+a1.w+":"+A.v(e)+":"+A.v(a1.ax)+":"+a2.a+":"+A.v(d)+":"+a2.w+":"+A.v(c)+":"+A.v(a2.ax)+":"+a5+":"+a3+":"+a7+":"+i+":"+g,a=l.c,a0=a.i(0,b)
if(a0!=null)return a0
if(!l.b.cX())return B.a3
if(j)j=B.a.G(e,0,new A.ex(),t.H)
else{j=l.a.b.i(0,k)
j.toString
j=i*B.b.l(j)}if(h)h=B.a.G(c,0,new A.ey(),t.H)
else{h=l.a.b.i(0,k)
h.toString
h=g*B.b.l(h)}s=a5===0&&a3===0
j=(f+j)*l.bE(a1,i,a5,a7,s)
h=(d+h)*l.bE(a2,g,a3,a7,s)
r=Math.max(1,j+h)
q=(j*0.9-h*1.1)/r
p=(j*1.1-h*0.9)/r
o=l.a.r.R8
if(q>o)n=B.f
else n=p<-o?B.r:B.a2
j=A.c([],t.s)
if(a5>0||a3>0)j.push("\u57ce\u9632\u589e\u52a0\u653b\u51fb\u4e0e\u5f00\u573a\u58eb\u6c14")
j.push("\u4f59\u91cf\u4e3a\u9759\u6001\u98ce\u9669\u6307\u6807\uff0c\u5e76\u975e\u80dc\u7387")
m=new A.bJ(n,q,p)
if(a.a>=256)a.am(0,new A.a7(a,A.l(a).h("a7<1>")).gL(0))
a.A(0,b,m)
return m},
d_(a,b,c){return this.aE(a,b,c,null,0,null,0)},
d1(a,b,c,d,e){return this.aE(a,b,c,d,0,e,0)},
aD(a,b,c,d){return this.aE(a,b,0,null,c,d,0)},
bY(a,b,c,d){return this.aE(a,b,c,d,0,null,0)},
d0(a,b,c){return this.aE(a,b,0,null,0,null,c)},
bE(a,b,c,d,e){var s,r,q=this.a,p=q.be(a.w,c,e,d),o=q.b.i(0,"soldierPower")
o.toString
o=B.b.l(o)
s=B.b.aH(a.ax)
r=q.c7(s,e?0:c)
return(B.c.bd(p+b*o+2,4)+1)*1.5*(1+B.b.v(r/1000,0,0.1))}}
A.ex.prototype={
$2(a,b){return A.x(a)+A.an(b)},
$S:16}
A.ey.prototype={
$2(a,b){return A.x(a)+A.an(b)},
$S:16}
A.cA.prototype={
H(){var s=this
return A.P(["interval",s.a,"resourceInterval",s.e,"cashBuffer",s.f,"payrollRatio",s.r,"dangerousCountryCities",s.w,"coalitionBudgetBase",s.x,"coalitionBudgetStep",s.y,"coalitionTargetBase",s.z,"coalitionTargetStep",s.Q,"coalitionPayrollCeiling",s.as,"coalitionTravel",s.at,"targetTravelScale",s.ax,"hatredTargetBonus",s.ay,"breakthroughMargin",s.ch,"threat",s.b,"urgent",s.c,"margin",s.d,"commit",s.CW,"rearExtra",s.cy,"candidates",s.db,"assessments",s.dx,"routes",s.dy,"plans",s.fr,"commands",s.fx,"team",s.fy,"fronts",s.k1,"singleFrontMonths",s.k2,"splitForce",s.k3,"splitAdvantage",s.k4,"arrivalSpread",s.ok,"expeditionSeconds",s.p1,"assaultCommitDistance",s.p2,"recallCriticalMargin",s.p3,"attritionCombat",s.p4,"targets",s.go,"slice",s.id,"advantage",s.R8,"expansion",s.RG,"age",s.cx,"timeout",s.rx,"restarts",s.ry,"stagnation",s.to],t.N,t.X)}}
A.au.prototype={}
A.ez.prototype={
bs(){return new A.aw(this.cn(),t.gL)},
cn(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9,k0,k1,k2,k3
return function $async$bs(k4,k5,k6){if(k5===1){p.push(k6)
r=q}for(;;)switch(r){case 0:k1={}
k2=s.c
k3=s.a
if(k2.b!==k3.a||k2.c!==s.b.a)throw A.j(B.ad)
o=k2.Q
n=o.f
if(n.length>64||o.r.length>256||o.w.length>32)throw A.j(B.ae)
m=s.e
m===$&&A.S()
l=s.f
l===$&&A.S()
k=new A.i5(o,k3,m,l)
j=o.gN(),i=J.I(j.a),j=new A.T(i,j.b,j.$ti.h("T<1>")),h=s.x
case 3:if(!j.j()){r=4
break}g=i.gp()
h.A(0,g.a,k.dq(g))
r=5
return k4.b=0,1
case 5:r=3
break
case 4:j=A.l(h).h("a3<2>")
f=new A.a3(h,j).D(0,new A.eV())
i=k2.x
g=i===B.p
if(g&&f){k2=s.d
s.w=new A.bo("defending",null,0,1,B.K,A.c(["\u4e3b\u89d2\u6240\u5728\u57ce\u5c1a\u6709\u660e\u786e\u751f\u547d\u98ce\u9669\uff0c\u6682\u505c\u65b0\u8fdc\u5f81\uff0c\u4f18\u5148\u5b8c\u6210\u9632\u5b88\u8c03\u5ea6"],t.s),k2.e,k2.c,k2.d,0)
r=1
break}e=k2.as
d=A.i(e)
c=d.h("d<1>")
e=A.p(new A.d(e,d.h("e(1)").a(new A.eW(s)),c),c.h("a.E"))
b=A.jH(o,k3,m,e)
k1.a=b
r=i===B.F?6:7
break
case 6:o=s.r
o===$&&A.S()
s.w=new A.hs(k2,k3,o,l,h).dj(b)
r=8
return k4.b=1,1
case 8:r=1
break
case 7:e=t.Z
a=A.c([],e)
d=t.s
a0=A.c([],d)
c=s.d
a1=s.r
a1===$&&A.S()
a2=new A.fh(k2,k3,c,l,a1,h)
a3=j.h("d<a.E>")
a4=A.p(new A.d(new A.a3(h,j),j.h("e(a.E)").a(new A.eX()),a3),a3.h("a.E"))
B.a.B(a4,new A.f7())
j=t.bQ
a5=A.c([new A.au(k1.a,A.c([],e),A.c([],d),0,0)],j)
a3=g?A.c([],t.bL):a4
a6=a3.length
a7=t.N
a8=t.S
a9=k3.r
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
c1=a2.bX(b6,c0.a),c2=c1.$ti,c1=new A.aJ(c1.a(),c2.h("aJ<1>")),c3=c0.d,c4=c0.e,c5=c0.c,c6=c0.b,c2=c2.c
case 15:if(!c1.j()){r=16
break}c7=c1.b
if(c7==null)c7=c2.a(c7)
c8=A.p(c6,b1)
B.a.I(c8,c7.b)
if(B.a.G(c8,0,new A.fa(),a8)>b0){c.e=!0
r=15
break}c9=c7.a
d0=A.p(c5,a7)
d1=c7.e
if(d1.length!==0)d0.push(d1)
d1=c7.c
c7=c7.d?1:0
B.a.k(b7,new A.au(c9,c8,d0,c3+d1,c4+c7))
r=17
return k4.b=1,1
case 17:r=15
break
case 16:case 13:a5.length===b8||(0,A.w)(a5),++b9
r=12
break
case 14:if(b7.length!==0){B.a.B(b7,new A.fb())
b8=A.h(Math.min(4,b4))
c1=new A.z(b7,0,b8,b3)
c1.U(b7,0,b8,b2)
a5=c1.aj(0)}case 10:a3.length===a6||(0,A.w)(a3),++b5
r=9
break
case 11:if(a4.length!==0&&!g){d2=B.a.gL(a5)
k1.a=d2.a
B.a.I(a,d2.b)
B.a.I(a0,d2.c)
j=d2.e
if(j>0){j=""+j
B.a.k(a0,c.e?"\u89c4\u5212\u914d\u989d\u5df2\u7528\u5c3d\uff1a"+j+" \u5ea7\u57ce\u5c1a\u672a\u627e\u5230\u5b8c\u6574\u65b9\u6848\uff0c\u4e0d\u80fd\u636e\u6b64\u65ad\u5b9a\u65e0\u6cd5\u633d\u6551":"unsalvageableDefense\uff1a"+j+" \u5ea7\u57ce\u5728\u5f53\u524d\u9501\u5b9a\u3001\u8d44\u91d1\u6216\u65f6\u9650\u4e0b\u672a\u627e\u5230\u5b8c\u6574\u4fee\u590d\u65b9\u6848")}d3="defending"}else d3="preparing"
if(a4.length!==0)d3="defending"
if(!g){d4=s.cL(k1.a)
if(d4!=null){k1.a=d4.a
B.a.k(a,d4.b)
B.a.k(a0,"\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5176\u4ed6\u5b89\u5168\u57ce\u6c60\u7ee7\u7eed\u7ec4\u7ec7\u8fdb\u653b")}}r=18
return k4.b=2,1
case 18:for(j=o.r,g=A.i(j),a3=g.h("e(1)"),a6=a3.a(new A.fc(s)),g=g.h("d<1>"),b1=g.h("e(a.E)").a(new A.fd(s)),a6=new A.d(j,a6,g).gC(0),b1=new A.T(a6,b1,g.h("T<a.E>")),b2=t.w,b3=t.e,b4=t.Y,b8=k3.b;b1.j();){c1=a6.gp()
if(c1.e!==1)continue
d5=o.a1(c1.go)
if(d5==null)continue
d6=o.E(c1.ch)
d7=!1
if(c1.as===B.w)if(d6!=null){if(c1.gJ()<d5.gJ()){c2=d6.ax
if(c2==null)c2=d6.d
else{c3=d6.ay
c4=d6.db?1:0
c4=B.c.v(c2-c3-c4,0,5)
c2=c4}c2=l.d_(c1,d5,c2).c<0}else c2=d7
d7=c2}d8=!1
if(c1.f<c1.r*0.25)if(c1.id>=2){c2=c1.k1
if(c2>0){c3=c1.gbg()
c4=d5.gbg()
c5=Math.max(1,c1.k2)
c6=b8.i(0,"retreatSurvivalRatio")
c6.toString
c6=c3/c2<c4/c5*c6
c2=c6}else c2=d8
d8=c2}if(!d7&&!d8)continue
c2=k1.a
c3=c1.a
if(c2.Q.n(0,c3))continue
k1.a.Q.k(0,c3)
c2=d7?"\u9ad8\u7ea7\u5c06\u9886\u5175\u529b\u843d\u540e\uff0c\u5f53\u524d\u5c5e\u6027\u5df2\u4e0d\u9002\u5408\u7ee7\u7eed\u653b\u57ce\uff0c\u8d81\u4ecd\u6709\u751f\u547d\u7533\u8bf7\u5408\u6cd5\u64a4\u9000\u6574\u5907":"\u9ad8\u7ea7\u5c06\u9886\u751f\u547d\u4f4e\u4e8e\u56db\u5206\u4e4b\u4e00\uff0c\u5df2\u53d1\u751f\u7684\u4f24\u5bb3\u663e\u793a\u80dc\u671b\u6e3a\u832b\uff0c\u7533\u8bf7\u6709\u98ce\u9669\u7684\u5408\u6cd5\u64a4\u9000"
c3=A.c([new A.y(B.P,c3,null,null,0)],b2)
c4=A.c([c1,d5],b3)
c1=o.E(c1.c)
c1.toString
B.a.k(a,new A.M(c2,c3,a1.a_(c4,A.c([c1],b4)),B.i,0,!0))}r=19
return k4.b=3,1
case 19:a6=g.h("a.E")
d9=A.p(new A.d(j,a3.a(new A.fe(k1,s)),g),a6)
b1=d9.length,b8=!f,c1=o.b,c2=o.a,c3=t.m,c4=t._,c5=a9.to,c6=c5*60,b5=0
case 20:if(!(b5<d9.length)){r=22
break}e0=d9[b5]
c7=e0.a
if(k1.a.Q.n(0,c7)){r=21
break}e1=k1.a.x.i(0,c7)
e2=s.cH(e0,e1)
c8=e1==null
c9=!c8
e3=c9&&e1.y<c1
e4=!1
if((c8?null:e1.b)==="expedition")if((c8?null:e1.e)!=null){d0=o.E(c8?null:e1.d)
d0=d0==null?null:d0.b
if(d0!=(c8?null:e1.e)){d0=o.E(c8?null:e1.d)
d0=(d0==null?null:d0.b)!==c2}else d0=e4
e4=d0}e5=c9&&e0.as===B.n&&!e0.p1&&e1.x+1>=e1.w.length
d0=e0.as===B.n
if(d0)if(!e0.p1){e6=!0
if(c9)if(!e3)d1=e5&&B.a.n(A.c(["intercept","standby"],d),e1.b)
else d1=e6
else d1=e6
e6=d1}else e6=!1
else e6=!1
d1=!e4
e7=!d1||e5||e6||e2
if(b8){if(d1)d1=e5&&e1.b==="expedition"||e6
else d1=!0
d1=d1&&e0.f>=e0.r*0.65}else d1=!1
if(d1){e8=s.cK(k1.a,e0,e1)
if(e8!=null){k1.a=e8.a
B.a.k(a,e8.b)
r=21
break}if(c.e){r=21
break}}if((c8?null:e1.as)===!0){d1=c8?null:e1.d
d1=e0.ch==d1&&!e3&&!e7}else d1=!1
if(d1){r=21
break}if((c8?null:e1.b)==="intercept")if(o.a1(c8?null:e1.r)!=null){d1=h.i(0,c8?null:e1.d)
if(d1==null)d1=null
else d1=d1.d.length!==0||d1.a.ax!=null
d1=d1!==!0
e9=d1}else e9=!0
else e9=!1
d1=!e7
if(d1&&e9&&e1.z>c1&&e0.f>=e0.r*0.65){r=21
break}if(c9&&d1&&!e3&&!e9&&e1.z>c1&&!A.kp(e0,o,k1.a,k3)&&e0.f>=e0.r*0.5){r=21
break}f0=e0.p1
if(f0&&c9&&!e3&&!e2){r=21
break}f1=A.jv(e0,o,k1.a)
c9=!1
if(d1)if(A.kp(e0,o,k1.a,k3))c9=e0.f>=e0.r*0.25||o.u(f1.a).length===0
if(c9){B.a.k(a0,c7+"\u5df2\u4e34\u8fd1\u4e3b\u653b\u76ee\u6807\uff0c\u4fdd\u6301\u8fdb\u653b\uff0c\u4e0d\u56e0\u666e\u901a\u9884\u8b66\u6216\u6574\u5907\u9884\u7b97\u6298\u8fd4")
r=21
break}if((c8?null:e1.b)==="expedition"&&d1&&!e3&&e0.f>=e0.r*0.65&&e1.x+1<e1.w.length){r=21
break}if(d1&&!e9&&!e3&&e0.f>=e0.r*0.65&&!d0){r=21
break}c9=o.gN()
d1=c9.$ti
f2=d1.h("d<a.E>")
f3=A.p(new A.d(c9,d1.h("e(a.E)").a(new A.ff(k1,s,e3,e1)),f2),f2.h("a.E"))
B.a.B(f3,new A.fg(e0))
c9=A.i(f3)
d1=c9.h("z<1>")
f2=new A.z(f3,0,3,d1)
f2.U(f3,0,3,c9.c)
f2=new A.q(f2,f2.gm(0),d1.h("q<k.E>"))
c9=e0.f<e0.r*0.65
d1=d1.h("k.E")
while(f2.j()){f4=f2.d
if(f4==null)f4=d1.a(f4)
if(!c.a4())break
f5=m.an(e0,f4.e,o,!0,f4)
f6=k1.a
f7=f4.a
f8=h.i(0,f7)
if(f8==null)f8=null
else f8=f8.d.length!==0||f8.a.ax!=null
if(e2)f9="\u5f53\u524d\u968f\u519b\u5175\u529b\u4e0d\u8db3\u4ee5\u5b89\u5168\u7ee7\u7eed\uff0c\u56de\u57ce\u8865\u5175\u540e\u91cd\u65b0\u7ec4\u7ec7\u8fdb\u653b"
else if(c9)f9="\u5c06\u9886\u53d7\u4f24\uff0c\u56de\u57ce\u6062\u590d\u751f\u547d\u540e\u518d\u6218"
else if(e4)f9="\u76ee\u6807\u6613\u4e3b\u540e\u539f\u57ce\u4e0e\u9644\u8fd1\u654c\u57ce\u5747\u4e0d\u9002\u5408\u7ee7\u7eed\u8fdb\u653b\uff0c\u56de\u57ce\u6574\u5907"
else if(e5)f9="\u539f\u8def\u7ebf\u6301\u7eed\u53d7\u963b\uff0c\u91cd\u65b0\u9009\u62e9\u6709\u5b89\u5168\u540d\u989d\u7684\u57ce\u6c60\u6574\u5907"
else if(e3)f9="\u539f\u4efb\u52a1\u5df2\u8d85\u8fc7\u6267\u884c\u65f6\u9650\uff0c\u56de\u57ce\u91cd\u65b0\u6574\u5907"
else f9=e9?"\u622a\u51fb\u76ee\u6807\u5df2\u6d88\u5931\uff0c\u56de\u57ce\u7ed3\u675f\u672c\u6b21\u4efb\u52a1":"\u91ce\u5916\u6307\u4ee4\u5df2\u5b8c\u6210\uff0c\u56de\u57ce\u7b49\u5f85\u65b0\u4efb\u52a1"
g0=h.i(0,f7)
if(g0==null)g0=null
else g0=g0.d.length!==0||g0.a.ax!=null
f7=g0===!0?h.i(0,f7).ga7():1/0
g1=a1.ci(f6,e0,f5,!0,f7,!0,f8!==!0,f9,"regroup",f4)
if(g1!=null){k1.a=g1.a
B.a.k(a,g1.b)
break}}if((e6||e2)&&!k1.a.Q.n(0,c7)){g2=e2?"\u968f\u519b\u5175\u529b\u4e0d\u8db3\u4e14\u6682\u65e0\u5b89\u5168\u6574\u5907\u5730\u70b9\uff0c\u505c\u6b62\u63a8\u8fdb\u5e76\u7b49\u5f85\u91cd\u65b0\u8c03\u5ea6":"\u5f53\u524d\u6ca1\u6709\u5408\u9002\u7684\u622a\u51fb\u6216\u8fdb\u653b\u76ee\u6807\uff0c\u53cb\u57ce\u4e5f\u6ca1\u6709\u5b89\u5168\u5165\u57ce\u65b9\u6848\uff0c\u6682\u65f6\u5f85\u547d\u5e76\u7ee7\u7eed\u590d\u67e5"
B.a.k(a0,c7+"\uff1a"+g2)
if((c8?null:e1.b)!=="standby"||e3){if(e2)g3=!d0||f0
else g3=!1
c8=e0.c
c9=A.c([e0.z],c4)
d0=B.b.aH(c6)
d1=g3?1:0
g4=new A.a5(c7,"standby",g2,c8,null,!1,null,c9,0,c1+d0,c1,0,!1,!1,e0.fy+d1)
k1.a.x.A(0,c7,g4)
d1=A.c([],b2)
if(g3)d1.push(new A.y(B.O,c7,null,null,0))
c7=A.c([g4],c3)
c9=A.c([e0],b3)
c8=o.E(c8)
c8.toString
B.a.k(a,new A.M(g2,d1,a1.a_(c9,A.c([c8],b4)),c7,0,!1))}}r=23
return k4.b=4,1
case 23:case 21:d9.length===b1||(0,A.w)(d9),++b5
r=20
break
case 22:g5=A.p(new A.d(j,a3.a(new A.eY(k1,s,f)),g),a6)
B.a.B(g5,new A.eZ(s))
j=k2.y
g=k2.z
g6=A.c7(o,k1.a,k3,g,j)
d=A.a4(a8,a8)
for(a3=g6.f,a6=new A.b6(a3,a3.r,a3.e,A.l(a3).h("b6<1>"));a6.j();){b1=a6.d
c1=a3.i(0,b1)
c1=c1==null?null:c1.length
d.A(0,b1,c1==null?0:c1)}g7=g6.gY()
if(g7==null)g7=g6.gc8()
if(g6.gY()!=null&&a4.length===0)d3="attacking"
a3=g5.length,a6=k2.f,c5=k2.w>c5/a9.a,k2=a9.k4,b1=a9.fy,a9=a9.go,c1=A.i(n),c2=c1.h("e(1)"),c1=c1.h("d<1>"),c3=c1.h("a.E"),g8=0,g9=1,h0=!1,b5=0
case 24:if(!(b5<g5.length)){r=26
break}e0=g5[b5]
h1={}
c4=e0.a
if(k1.a.Q.n(0,c4)||k1.a.y.n(0,c4)){r=25
break}h2=o.E(e0.c)
c4=h2.a
b6=h.i(0,c4)
c6=b6==null
if(c6)c7=null
else c7=b6.d.length!==0||b6.a.ax!=null
if(c7===!0){if(c6)c7=null
else{c7=b6.f
c7=c7==null?null:c7.a}c7=c7!==B.f}else c7=!1
if(c7){r=25
break}if(c6)c7=null
else c7=b6.d.length!==0||b6.a.ax!=null
c8=k1.a
if(c7===!0){c7=c8.a8(h2)
c8=k1.a
c9=h2.ax
if(c9==null){c8=c8.w.i(0,c4)
if(c8==null)c8=h2.d}else{c8=h2.ay
d0=h2.db?1:0
d0=B.c.v(c9-c8-d0,0,5)
c8=d0}h3=Math.min(c7,c8)}else h3=c8.a8(h2)
if(k1.a.u(c4).length<=h3){r=25
break}if(c6)c4=null
else c4=b6.d.length!==0||b6.a.ax!=null
if(c4===!0&&!s.bH(h2,e0,k1.a)){r=25
break}h4=A.c7(o,k1.a,k3,g,j)
h5=A.p(new A.d(n,c2.a(new A.f_(s,h4,e0,d)),c1),c3)
B.a.B(h5,new A.f0(s,h4,e0))
h1.a=null
c4=A.i(h5)
c6=c4.h("z<1>")
c7=new A.z(h5,0,a9,c6)
c7.U(h5,0,a9,c4.c)
c7=new A.q(c7,c7.gm(0),c6.h("q<k.E>"))
c6=c6.h("k.E")
h6=null
h7=-1/0
case 27:if(!c7.j()){r=28
break}c4=c7.d
h8=c4==null?c6.a(c4):c4
if(!c.a4()){r=28
break}h9=h8.a
c4=o.u(h9)
c8=A.i(c4).h("K<1>")
c4=new A.K(c4,c8)
c9=h8.ax
if(c9==null)c9=h8.d
else{d0=h8.ay
d1=h8.db?1:0
d1=B.c.v(c9-d0-d1,0,5)
c9=d1}d0=new A.z(c4,0,c9,c8.h("z<k.E>"))
d0.U(c4,0,c9,c8.h("k.E"))
i0=d0.aj(0)
f5=m.aI(e0,h8.e,o,h8)
if(!f5.d){r=27
break}c4=A.dq(e0,h8,o,k3,l,c5&&k1.a.d>100?0.05:0).a
i1=c4[1]
i2=a1.aV(c4[2],h8,k1.a,e0)
r=i2===0?29:30
break
case 29:if(g7==null){g9=Math.max(1,Math.min(b1,i0.length))
g7=h9}r=31
return k4.b=5,1
case 31:r=27
break
case 30:if(h4.gY()!=null&&h9!==h4.gY())c8=i2!==1||i1<k2
else c8=!1
if(c8){r=27
break}i3=d.i(0,h9)
if(i3==null)i3=0
i4=i2-i3
if(i4<=0){r=27
break}g9=Math.max(g9,i2)
g1=s.bF(k1.a,e0,h8,i4,i3,c4[0])
if(g1==null){i5=k1.a.P()
i5.d=1e6
i6=s.bF(i5,e0,h8,i4,i3,c4[0])
if(i6!=null){if(a4.length===0)d3="saving"
c4=i5.d
c8=i6.a
i7=c4-c8.d+c8.V().a
g8=g8===0?i7:Math.min(g8,i7)
if(g7==null)g7=h9}else if(a4.length===0)d3="preparing"
r=27
break}c4=f5.b
i8=A.bk(h8,e0,o,k3,a6,c4)-c4*0.4-(k1.a.d-g1.a.d)*0.5+i1*30
if(i8>h7){h1.a=g1
g9=g1.b.d.length
h7=i8
h6=h8}r=32
return k4.b=5,1
case 32:r=27
break
case 28:c4=h1.a
if(c4!=null){c4=B.a.G(a,0,new A.f1(),a8)
c6=h1.a
c4=c4+c6.b.b.length<=b0}else{c6=c4
c4=!1}if(c4){k1.a=c6.a
B.a.k(a,c6.b)
g7=h6.a
d.ce(g7,new A.f2(h1),new A.f3(h1))
h0=!0}r=33
return k4.b=6,1
case 33:case 25:g5.length===a3||(0,A.w)(g5),++b5
r=24
break
case 26:k2=!h0
if(k2&&b8&&B.a.gL(a5).e===0&&i!==B.y){i9=s.cT(k1.a,g6)
if(i9!=null){k1.a=i9.a
B.a.k(a,i9.b)
d3="preparing"}}r=i===B.E&&b8&&k2&&B.a.G(a,0,new A.f4(),a8)<b0-3?34:35
break
case 34:j0=k1.a.ca(new A.d(n,c2.a(new A.f5(s,g6)),c1))
k2=o.gN(),m=J.I(k2.a),k2=new A.T(m,k2.b,k2.$ti.h("T<1>"))
case 36:if(!k2.j()){r=37
break}l=m.gp()
j=l.a
i=h.i(0,j)
if(i==null)i=null
else i=i.d.length!==0||i.a.ax!=null
if(i===!0){r=36
break}if(!c.a4()){r=37
break}j1=k1.a.u(j)
b7=k1.a.P()
i=A.i(j1)
g=i.h("d<1>")
j2=A.p(new A.d(j1,i.h("e(1)").a(new A.f6(k1)),g),g.h("a.E"))
B.a.B(j2,new A.f8())
j3=!1
if(j0.n(0,j))if(B.a.D(n,new A.f9(s))){i=j1.length===0||k1.a.bS(j)<k1.a.a8(l)+g9
j3=i}if(j2.length!==0){i=j1.length
g=k1.a
d=l.ax
if(d==null){g=g.w.i(0,j)
if(g==null)g=l.d}else{g=l.ay
a3=l.db?1:0
a3=B.c.v(d-g-a3,0,5)
g=a3}if(i<g)i=j3&&j1.length>=l.y
else i=!0}else i=!1
if(i)if(b7.aJ(l,B.a.gL(j2))&&b7.d>=b7.V().a){k1.a=b7
B.a.k(a,new A.M("\u5148\u6269\u5145\u5b89\u5168\u8fce\u6218\u540d\u989d\u548c\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u8003\u8651\u62db\u5c06\u4e0e\u8fdc\u5f81",A.c([new A.y(B.j,B.a.gL(j2).a,j,null,0)],b2),a1.a_(A.c([B.a.gL(j2)],b3),A.c([l],b4)),B.i,b7.V().a,!1))
j4=b7.ak()
if(j4>0)B.a.k(a,new A.M("\u57ce\u9632\u5347\u7ea7\u540e\u5728\u540c\u4e00\u6b21\u8865\u5175\u7a97\u53e3\u5185\u5c3d\u91cf\u8865\u6ee1\u5168\u56fd\u5175\u5458\u5bb9\u91cf",A.c([new A.y(B.h,null,j,null,j4)],b2),a1.a_(A.c([],b3),A.c([l],b4)),B.i,0,!1))
r=37
break}if(j3){i=o.E(g7)
i=b7.dm(l,i==null?null:i.b)&&b7.d>=b7.V().a}else i=!1
if(i){k1.a=b7
B.a.k(a,new A.M("\u4e3a\u7559\u5b88\u4e0e\u8fdc\u5f81\u7684\u771f\u5b9e\u7f3a\u53e3\u62bd\u53d6\u82f1\u96c4\uff0c\u9884\u7559\u6700\u9ad8\u624b\u7eed\u8d39\u548c\u6708\u4ff8",A.c([new A.y(B.u,null,j,null,0)],b2),a1.a_(A.c([],b3),A.c([l],b4)),B.i,b7.V().a,!1))
r=37
break}j5=k1.a.P()
j4=j5.ak()
if(j4>0){k1.a=j5
B.a.k(a,new A.M("\u4f18\u5148\u8865\u6ee1\u5168\u56fd\u5175\u5458\u5bb9\u91cf\uff0c\u8d44\u91d1\u4e0d\u8db3\u65f6\u4e70\u5f97\u8d77\u591a\u5c11\u8865\u591a\u5c11\uff0c\u4e0d\u900f\u652f",A.c([new A.y(B.h,null,j,null,j4)],b2),a1.a_(A.c([],b3),A.c([l],b4)),B.i,j5.V().a,!1))
r=37
break}r=38
return k4.b=7,1
case 38:r=36
break
case 37:case 35:if(h0)d3=a4.length===0?"attacking":"defending"
j6=o.E(g7)
if(j6!=null){j7=A.aP(j6.b,o,k3,null)
if(j7.ga5())B.a.k(a0,"\u76ee\u6807\u56fd\u5360\u6709 "+j7.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.aq(j7.c*j7.gaS())+" \u91d1\u5e01\uff0c\u51c6\u5907\u8f6e\u653b\u5175\u529b")}if(a.length===0){k2=k1.a
B.a.k(a0,k2.d<k2.V().a?"\u8d44\u91d1\u4e0d\u8db3\u4ee5\u8986\u76d6\u73b0\u6709\u90e8\u961f\u548c\u6b20\u6536\u6708\u4ff8\uff0c\u7b49\u5f85\u6574\u5907":"\u6ca1\u6709\u6ee1\u8db3\u5b88\u57ce\u3001\u65f6\u9650\u53ca\u9759\u6001\u98ce\u9669\u7ea6\u675f\u7684\u65b0\u589e\u884c\u52a8\uff0c\u4fdd\u6301\u5df2\u6709\u4efb\u52a1")}if(c5)B.a.k(a0,"\u505c\u6ede\u8bca\u65ad\uff1a"+(d3==="saving"?"\u7f3a\u5c11\u6574\u961f\u540e\u52e4\u8d44\u91d1":"\u7f3a\u5c11\u53ef\u5b89\u5168\u6267\u884c\u7684\u6269\u5f20\u6761\u4ef6")+"\uff0c\u4e0d\u901a\u8fc7\u65e0\u9650\u62db\u52df\u6216\u81ea\u6740\u51fa\u51fb\u6253\u7834\u7b49\u5f85")
j8=A.c([],e)
for(k2=a.length,j9=0,b5=0;b5<a.length;a.length===k2||(0,A.w)(a),++b5){k0=a[b5]
j9+=k0.b.length
if(j9>b0){c.e=!0
B.a.k(a0,"\u547d\u4ee4\u914d\u989d\u5230\u8fbe\uff0c\u53ea\u63d0\u4ea4\u524d\u9762\u5b8c\u6574\u7684\u52a8\u4f5c\u7ec4\uff0c\u540e\u7eed\u7559\u5f85\u4e0b\u4e00\u6b21\u89c4\u5212")
break}B.a.k(j8,k0)}s.w=new A.bo(d3,g7,g8,g9,j8,A.X(a0,0,A.W(12,"count",a8),a7).aj(0),c.e,c.c,c.d,c.b)
case 1:return 0
case 2:return k4.c=p.at(-1),3}}}},
cL(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this
for(s=a2.c.Q,r=s.gN(),q=J.I(r.a),r=new A.T(q,r.b,r.$ti.h("T<1>")),p=a2.x,o=a2.d,n=s.r,m=A.i(n),l=m.h("e(1)"),m=m.h("d<1>"),k=m.h("a.E"),j=a3.at;r.j();){i=q.gp()
h=i.a
if(a3.u(h).length!==0||a3.aK(i)||a3.M(h)>0||j.n(0,h))continue
g=A.p(new A.d(n,l.a(new A.eI(a2,a3)),m),k)
B.a.B(g,new A.eJ(i))
f=A.i(g)
e=f.h("z<1>")
d=new A.z(g,0,4,e)
d.U(g,0,4,f.c)
d=new A.q(d,d.gm(0),e.h("q<k.E>"))
f=i.e
e=e.h("k.E")
while(d.j()){c=d.d
if(c==null)c=e.a(c)
if(!o.a4())return null
b=a2.e
b===$&&A.S()
a=b.an(c,f,s,!0,i)
b=a2.r
b===$&&A.S()
a0=p.i(0,h)
a0=a0==null?null:a0.ga7()
a1=b.aY(a3,c,a,!0,a0==null?1/0:a0,!0,"\u524d\u7ebf\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5b89\u5168\u540e\u65b9\u65e0\u9700\u4e3a\u7559\u5b88\u7275\u5236\u90e8\u961f","transfer",i)
if(a1!=null)return a1}}return null},
cH(a,b){var s,r,q,p,o,n,m,l=this,k="soldierLimit",j=b==null
if((j?null:b.b)==="expedition"){s=a.gJ()
r=l.a.b.i(0,k)
r.toString
r=s>=B.b.l(r)
s=r}else s=!0
if(s)return!1
s=l.c.Q
q=s.E(j?null:b.d)
if(q==null||q.b===s.a)return!1
j=s.u(q.a)
r=A.i(j).h("K<1>")
p=A.aR(A.X(new A.K(j,r),0,A.W(q.ga3(),"count",t.S),r.h("k.E")),t.r)
if(p==null)return!1
j=B.a.av(s.w,new A.eA(q))
s=l.f
s===$&&A.S()
r=q.ga3()
o=l.a
n=o.b.i(0,k)
n.toString
m=s.bY(a,p,r,Math.min(B.b.l(n),p.gJ()+j.c))
if(l.d.e)return!1
if(b.f)return m.c<=0||m.b<o.r.ch
return m.a!==B.f},
cK(b3,b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1=null,b2=b5==null
if((b2?b1:b5.b)==="expedition")s=b2?b1:b5.d
else s=b1
r=b0.c.Q
q=r.f
p=A.i(q)
o=p.h("d<1>")
n=A.p(new A.d(q,p.h("e(1)").a(new A.eE(b0)),o),o.h("a.E"))
B.a.B(n,new A.eF(b0,s,b4))
for(q=b0.a,p=q.r,o=A.X(n,0,A.W(p.go,"count",t.S),A.i(n).c),m=o.$ti,o=new A.q(o,o.gm(0),m.h("q<k.E>")),b2=!b2,l=t.r,k=p.fy,j=b3.x,i=A.l(j).h("a3<2>"),h=i.h("e(a.E)"),g=i.h("d<a.E>"),f=b0.d,m=m.h("k.E"),q=q.b,e=r.w,p=p.ch;o.j();){d=o.d
if(d==null)d=m.a(d)
if(!f.a4())return b1
c=b0.r
c===$&&A.S()
if(!c.ai(d))continue
b=new A.d(new A.a3(j,i),h.a(new A.eG(b0,b4,d)),g).gm(0)
if(b>=k)continue
a=d.a
a0=r.u(a)
a1=A.i(a0).h("K<1>")
a0=new A.K(a0,a1)
a2=d.ax
a3=a2==null
if(a3)a4=d.d
else{a4=d.ay
a5=d.db?1:0
a5=B.c.v(a2-a4-a5,0,5)
a4=a5}a5=new A.z(a0,0,a4,a1.h("z<k.E>"))
a5.U(a0,0,a4,a1.h("k.E"))
a6=A.aR(a5,l)
a0=a6!=null
if(a0){a1=B.a.av(e,new A.eH(d))
a4=b0.f
a4===$&&A.S()
if(a3)a2=d.d
else{a3=d.ay
a5=d.db?1:0
a5=B.c.v(a2-a3-a5,0,5)
a2=a5}a3=q.i(0,"soldierLimit")
a3.toString
a7=a4.bY(b4,a6,a2,Math.min(B.b.l(a3),a6.gJ()+a1.c))
if(a7.c<=0||a7.b<p)continue}a1=b0.e
a1===$&&A.S()
a8=a1.aI(b4,d.e,r,d)
if(!b2||b5.b!=="expedition")a="\u91ce\u5916\u4efb\u52a1\u7ed3\u675f\u540e\u5229\u7528\u73b0\u6709\u968f\u8eab\u5175\u529b\uff0c\u8f6c\u653b\u53ef\u4ee5\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u654c\u57ce"
else a=a===s?"\u91cd\u65b0\u6838\u5bf9\u5f53\u524d\u5b88\u519b\u4e0e\u8def\u7ebf\u540e\uff0c\u7ee7\u7eed\u8fdb\u653b\u539f\u76ee\u6807":"\u539f\u76ee\u6807\u4e0d\u518d\u9002\u5408\u8fdb\u653b\uff0c\u8f6c\u5411\u9644\u8fd1\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u654c\u57ce"
a9=c.cl(b3,b4,a8,a0,!0,b,a,"expedition",d)
if(a9!=null)return a9}return b1},
cT(b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=a5.c.Q,a7=a6.gN(),a8=a7.$ti,a9=a8.h("d<a.E>"),b0=A.p(new A.d(a7,a8.h("e(a.E)").a(new A.eN(a5)),a9),a9.h("a.E"))
if(b0.length<2)return null
a7=a6.f
a8=A.i(a7)
a9=a8.h("d<1>")
s=A.p(new A.d(a7,a8.h("e(1)").a(new A.eO(a5,b2)),a9),a9.h("a.E"))
a7=t.S
a8=t.i
r=A.a4(a7,a8)
for(a9=b0.length,q=A.i(s),p=q.c,q=q.h("z<1>"),o=a5.a,n=o.r,m=n.go,l=0;l<b0.length;b0.length===a9||(0,A.w)(b0),++l){k=b0[l]
B.a.B(s,new A.eP(k))
j=new A.z(s,0,m,q)
j.U(s,0,m,p)
r.A(0,k.a,j.G(0,1/0,new A.eQ(a5,k),a8))}B.a.B(b0,new A.eR(r))
for(a8=A.i(b0),a7=A.X(b0,0,A.W(2,"count",a7),a8.c),a9=a7.$ti,a7=new A.q(a7,a7.gm(0),a9.h("q<k.E>")),a8=a8.h("K<1>"),q=a8.h("q<k.E>"),p=a5.d,m=a6.c,j=a8.h("k.E"),n=n.at,a9=a9.h("k.E");a7.j();){i=a7.d
if(i==null)i=a9.a(i)
h=i.a
g=r.i(0,h)
g.toString
if(g>n)continue
for(g=new A.K(b0,a8),g=new A.q(g,g.gm(0),q),f=i.e,e=i.d;g.j();){d=g.d
if(d==null)d=j.a(d)
c=d.a
b=r.i(0,c)
b.toString
a=r.i(0,h)
a.toString
if(b<a+10)continue
a0=b1.u(c)
if(a0.length<=b1.a8(d))continue
c=A.i(a0)
b=c.h("d<1>")
a1=A.p(new A.d(a0,c.h("e(1)").a(new A.eS(b1)),b),b.h("a.E"))
B.a.B(a1,new A.eT())
c=A.i(a1)
b=c.h("z<1>")
a=new A.z(a1,0,2,b)
a.U(a1,0,2,c.c)
a=new A.q(a,a.gm(0),b.h("q<k.E>"))
b=b.h("k.E")
d=d.d
while(a.j()){c=a.d
if(c==null)c=b.a(c)
if(c.x<15||e>=o.ah(m)||d<o.ah(m)||B.a.D(b1.u(h),new A.eU(c)))continue
if(!p.a4())return null
a2=a5.e
a2===$&&A.S()
a3=a2.an(c,f,a6,!0,i)
a2=a5.r
a2===$&&A.S()
a4=a2.cj(b1,c,a3,!0,!0,"\u540e\u65b9\u5efa\u8bbe\u5df2\u5b8c\u6210\uff0c\u5b89\u5168\u8f6c\u79fb\u9ad8\u5185\u653f\u5c06\u9886\u4e3b\u6301\u524d\u7ebf\u57ce\u9632\u5efa\u8bbe","transfer",i)
if(a4!=null)return a4}}}return null},
bH(a,b,c){var s,r,q=a.a,p=this.x.i(0,q),o=p==null?null:p.d
if(o==null)o=A.c([],t.D)
if(o.length===0)return!0
q=c.u(q)
p=A.i(q)
s=p.h("d<1>")
q=A.p(new A.d(q,p.h("e(1)").a(new A.eL(b)),s),s.h("a.E"))
p=A.i(q).h("K<1>")
r=A.X(new A.K(q,p),0,A.W(c.O(a),"count",t.S),p.h("k.E")).aj(0)
if(r.length===0)return!1
return B.a.aF(o,new A.eM(this,r,c,a))},
bF(b9,c0,c1,c2,c3,c4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=this,b5=null,b6="soldierLimit",b7=t.e,b8=A.c([],b7)
for(s=b4.c.Q,r=s.gN(),q=J.I(r.a),r=new A.T(q,r.b,r.$ti.h("T<1>")),p=b4.x,o=c0.c;r.j();){n=q.gp()
m=n.a
l=p.i(0,m)
if(l==null)l=b5
else l=l.d.length!==0||l.a.ax!=null
if(l===!0&&m!==o)continue
k=b9.a8(n)
j=Math.max(0,b9.u(m).length-k)
n=b9.u(m)
m=A.i(n)
l=m.h("d<1>")
i=A.p(new A.d(n,m.h("e(1)").a(new A.eB(b4,b9,c1)),l),l.h("a.E"))
B.a.B(i,new A.eC(b4))
n=A.i(i)
m=new A.z(i,0,j,n.h("z<1>"))
m.U(i,0,j,n.c)
B.a.I(b8,m)}if(!B.a.n(b8,c0))return b5
B.a.am(b8,c0)
B.a.B(b8,new A.eD(b4))
r=b4.e
r===$&&A.S()
q=c1.e
h=r.aI(c0,q,s,c1)
if(!h.d)return b5
g=A.c([c0],b7)
b7=t.N
f=A.P([c0.a,h],b7,t.bJ)
e=h.b
for(o=b4.a,n=o.r,m=t.S,l=A.X(b8,0,A.W(n.fy*2,"count",m),t.r),d=l.$ti,l=new A.q(l,l.gm(0),d.h("q<k.E>")),c=n.ok,d=d.h("k.E"),b=c2+c3,a=e;l.j();){a0=l.d
if(a0==null)a0=d.a(a0)
if(g.length>=c2)break
a1=b4.f
a1===$&&A.S()
a1=A.dq(a0,c1,s,o,a1,0).a[2]
if(a1===0||a1>b)continue
a2=r.aI(a0,q,s,c1)
if(!a2.d)continue
a1=a2.b
a3=Math.min(e,a1)
a4=Math.max(a,a1)
if(a4-a3>c)continue
B.a.k(g,a0)
f.A(0,a0.a,a2)
a=a4
e=a3}if(g.length<c2)return b5
a5=A.c([],t.w)
a6=A.c([],t.m)
a7=A.a4(b7,b7)
b7=s.u(c1.a)
r=A.i(b7).h("K<1>")
a8=A.X(new A.K(b7,r),0,A.W(c1.ga3(),"count",m),r.h("k.E")).aj(0)
for(b7=n.fx,o=o.b,r=c2===1,a9=b9,b0=0;b0<g.length;++b0){b1=g[b0]
q=b1.c
n=p.i(0,q)
if(n==null)n=b5
else n=n.d.length!==0||n.a.ax!=null
if(n===!0){n=s.E(q)
n.toString
n=!b4.bH(n,b1,a9)}else n=!1
if(n)return b5
n=f.i(0,b1.a)
n.toString
for(m=s.gN(),l=J.I(m.a),m=new A.T(l,m.b,m.$ti.h("T<1>")),b2=0;m.j();){d=l.gp()
b=d.a
a0=a9.u(b).length
d=Math.min(Math.max(0,a0-(b===q?1:0)),a9.a8(d))
a0=o.i(0,b6)
a0.toString
b2+=d*B.b.l(a0)}q=b4.r
q===$&&A.S()
m=r?"\u56f4\u7ed5\u4e3b\u653b\u76ee\u6807\u6295\u5165\u8db3\u591f\u6218\u529b\uff0c\u4fdd\u7559\u5176\u4ed6\u65b9\u5411\u5175\u529b":"\u96c6\u4e2d\u4f18\u52bf\u7f16\u961f\u8f6e\u653b\u540c\u4e00\u5ea7\u57ce\uff0c\u62b5\u8fbe\u95f4\u9694\u4e0d\u8d85\u8fc7"+B.b.l(c)+"\u79d2"
l=a9.f
d=o.i(0,b6)
d.toString
b3=q.bp(a9,b1,n,c4,Math.min(b2,Math.max(0,l-B.b.l(d))),c3+b0,m,"expedition",c1)
if(b3==null)return b5
a9=b3.a
q=b3.b
B.a.I(a5,q.b)
B.a.I(a6,q.d)
a7.I(0,q.c)
if(a5.length>b7){b4.d.e=!0
return b5}}b7=b4.r
b7===$&&A.S()
a7.I(0,b7.a_(a8,A.c([],t.Y)))
if(c4)b7="\u5148\u6d3e\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u5c06\u9886\u8fdb\u653b\u524d\u6392\uff0c\u6301\u7eed\u8f6e\u653b\u5e76\u8865\u5145\u6218\u635f"
else b7=r?"\u6267\u884c\u9759\u6001\u4f18\u52bf\u660e\u786e\u3001\u53ef\u4ee5\u4f9b\u517b\u7684\u6269\u5f20":"\u6574\u961f\u540e\u52e4\u51c6\u5907\u5b8c\u6210\uff0c\u6309\u771f\u5b9e\u6392\u961f\u89c4\u5219\u8f6e\u653b\uff1b\u4e0d\u9884\u6f14\u672a\u6765\u4f24\u4ea1"
return new A.d5(a9,new A.M(b7,a5,a7,a6,a9.V().a,!1))},
cV(a,b,c){var s=this.c
return A.bk(a,b,s.Q,this.a,s.f,c)},
aR(a,b){return this.cV(a,b,null)}}
A.eV.prototype={
$1(a){return t.a.a(a).ga2()},
$S:17}
A.eW.prototype={
$1(a){var s,r,q
t.J.a(a)
s=this.a.c.Q
r=s.a1(a.a)
q=!1
if(r!=null)if(r.b===s.a)if(!r.fr)if(r.f>0){s=r.as
s=!(s===B.e||s===B.d)&&r.fy===a.ax}else s=q
else s=q
else s=q
else s=q
return s},
$S:11}
A.eX.prototype={
$1(a){t.a.a(a)
return a.d.length!==0||a.a.ax!=null},
$S:17}
A.f7.prototype={
$2(a,b){var s,r=t.a
r.a(a)
r.a(b)
if(a.ga2()!==b.ga2())return a.ga2()?-1:1
s=B.b.t(a.ga7(),b.ga7())
return s!==0?s:B.b.t(b.w+b.a.r*4,a.w+a.a.r*4)},
$S:65}
A.fa.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:8}
A.fb.prototype={
$2(a,b){var s,r=t.dp
r.a(a)
r.a(b)
r=a.e
s=b.e
return r!==s?B.c.t(r,s):B.b.t(b.d,a.d)},
$S:33}
A.fc.prototype={
$1(a){t.r.a(a)
return a.b===this.a.c.Q.a&&!a.fr&&a.dy},
$S:0}
A.fd.prototype={
$1(a){t.r.a(a)
return this.a.c.x!==B.p},
$S:0}
A.fe.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.Q.a&&a.cy&&s.x!==B.p&&!a.fr&&!this.a.a.Q.n(0,a.a)},
$S:0}
A.ff.prototype={
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
else m=m.d.length!==0||m.a.ax!=null
s=s.a
s=m===!0?s.O(a):Math.max(s.O(a),a.y+o.a.r.cy)
if(q-p<s){s=n.i(0,r)
if(s==null)s=k
else s=s.d.length!==0||s.a.ax!=null
if(s===!0){s=n.i(0,r)
if(s==null)s=k
else{s=s.f
s=s==null?k:s.a}s=s===B.f}else s=!0}else s=!1
return s},
$S:1}
A.fg.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(a.e.F(s),b.e.F(s))},
$S:4}
A.eY.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b.c
r=!1
if(a.b===s.Q.a)if(a.cx){r=this.a
s=r.a.ap(a)&&!this.c&&s.x!==B.y&&!a.fr&&!r.a.y.n(0,a.a)}else s=r
else s=r
return s},
$S:0}
A.eZ.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ac(b,s.E(b.c).d<q.ah(r)),A.ac(a,s.E(a.c).d<q.ah(r)))},
$S:2}
A.f_.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.a
r=!1
if(a.b!==s.c.Q.a)if(this.b.aw(a)){q=s.r
q===$&&A.S()
if(q.ai(a)){r=this.d.i(0,a.a)
if(r==null)r=0
s=r<s.a.r.fy}else s=r}else s=r
else s=r
return s},
$S:1}
A.f0.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.b
if(a.a===r.gY())r=-1
else if(b.a===r.gY())r=1
else{r=this.a
s=this.c
s=B.b.t(r.aR(b,s),r.aR(a,s))
r=s}return r},
$S:4}
A.f1.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:8}
A.f2.prototype={
$1(a){return A.h(a)+this.a.a.b.d.length},
$S:14}
A.f3.prototype={
$0(){return this.a.a.b.d.length},
$S:10}
A.f4.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:8}
A.f5.prototype={
$1(a){var s,r
t.q.a(a)
s=this.a
r=!1
if(a.b!==s.c.Q.a)if(this.b.aw(a)){s=s.r
s===$&&A.S()
s=s.ai(a)}else s=r
else s=r
return s},
$S:1}
A.f6.prototype={
$1(a){t.r.a(a)
return a.dx&&!this.a.a.Q.n(0,a.a)},
$S:0}
A.f8.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.f9.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.eI.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=!1
if(a.b===s.c.Q.a)if(a.cx){q=this.b
if(q.ap(a))if(!q.Q.n(0,a.a)){s=s.x.i(0,a.c)
if(s==null)s=null
else s=s.d.length!==0||s.a.ax!=null
s=s!==!0}else s=r
else s=r}else s=r
else s=r
return s},
$S:0}
A.eJ.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.z.F(s),b.z.F(s))},
$S:2}
A.eA.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.eE.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.eF.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.b
s=a.a===r
if(s!==(b.a===r))return s?-1:1
r=this.a
s=this.c
return B.b.t(r.aR(b,s),r.aR(a,s))},
$S:4}
A.eG.prototype={
$1(a){var s,r
t.J.a(a)
s=a.a
r=!1
if(s!==this.b.a)if(a.b==="expedition")if(a.d===this.c.a){s=this.a.c.Q.a1(s)
s=(s==null?null:s.fr)===!1}else s=r
else s=r
else s=r
return s},
$S:11}
A.eH.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.eN.prototype={
$1(a){var s=this.a.x.i(0,t.q.a(a).a)
if(s==null)s=null
else s=s.d.length!==0||s.a.ax!=null
return s!==!0},
$S:1}
A.eO.prototype={
$1(a){t.q.a(a)
return a.b!==this.a.c.Q.a&&this.b.aw(a)},
$S:1}
A.eP.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.F(s),b.e.F(s))},
$S:4}
A.eQ.prototype={
$2(a,b){var s,r
A.an(a)
t.q.a(b)
s=this.a.e
s===$&&A.S()
r=this.b.e
return Math.min(a,s.af(r,b.f.X(r)))},
$S:35}
A.eR.prototype={
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
A.eS.prototype={
$1(a){t.r.a(a)
return a.cx&&a.e!==2&&!this.a.Q.n(0,a.a)},
$S:0}
A.eT.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.eU.prototype={
$1(a){return t.r.a(a).x>=this.a.x},
$S:0}
A.eL.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.eM.prototype={
$1(a){var s=this
return B.a.D(s.b,new A.eK(s.a,t.O.a(a),s.c,s.d))},
$S:9}
A.eK.prototype={
$1(a){var s,r,q,p,o,n=this,m="soldierLimit"
t.r.a(a)
s=n.a
r=s.f
r===$&&A.S()
q=n.c
p=q.O(n.d)
s=s.a.b
o=s.i(0,m)
o.toString
o=B.b.l(o)
q=q.e
s=s.i(0,m)
s.toString
return r.aD(a,n.b.a,p,Math.min(o,Math.max(0,q-B.b.l(s)))).a===B.f},
$S:0}
A.eB.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.cx){r=this.b
if(!r.Q.n(0,a.a))if(r.ap(a)){s=this.a.r
s===$&&A.S()
s=s.ai(this.c)}}return s},
$S:0}
A.eC.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ac(b,s.E(b.c).d<q.ah(r)),A.ac(a,s.E(a.c).d<q.ah(r)))},
$S:2}
A.eD.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ac(b,s.E(b.c).d<q.ah(r)),A.ac(a,s.E(a.c).d<q.ah(r)))},
$S:2}
A.ad.prototype={}
A.fh.prototype={
bX(a,b){return new A.aw(this.cZ(a,b),t.dT)},
cZ(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e
return function $async$bX(c,d,a0){if(d===1){n.push(a0)
p=o}for(;;)switch(p){case 0:i=s.Z(r,q)
h=r.a
g=h.a
f=q.M(g)<=q.O(h)
e=!1
if(f)if(!r.ga2()){m=r.d
if(m.length!==0)if(B.a.aF(m,new A.fR(s,q))){e=q.x
e=!new A.a3(e,A.l(e).h("a3<2>")).D(0,new A.fS(r))}}p=e?3:4
break
case 3:p=5
return c.b=new A.ad(q,A.c([],t.Z),s.ag(r,q),!1,"\u5df2\u6709\u622a\u51fb\u90e8\u961f\u80fd\u53ca\u65f6\u63a5\u654c\uff0c\u7b49\u5f85\u6267\u884c\u7ed3\u679c\uff0c\u4e0d\u91cd\u590d\u6d3e\u51fa\u7b2c\u4e8c\u652f\u90e8\u961f","hold"),1
case 5:p=1
break
case 4:e=!1
if(f)if(!r.ga2())e=(i==null?null:i.a)===B.f
p=e?6:7
break
case 6:p=8
return c.b=new A.ad(q,A.c([],t.Z),s.ag(r,q),!1,"\u57ce\u9632\u4e0e\u73b0\u6709\u5b88\u5c06\u8db3\u4ee5\u5e94\u5bf9\u53ef\u89c1\u6765\u654c\uff0c\u7ef4\u6301\u8fdc\u5f81\uff0c\u4e0d\u53ec\u56de\u5c06\u9886","hold"),1
case 8:p=1
break
case 7:e=s.bv(r,q)
l=A.p(e,e.$ti.h("a.E"))
e=A.i(l)
m=e.h("e(1)")
e=e.h("d<1>")
k=A.p(new A.d(l,m.a(new A.fT(s,r,i,q)),e),e.h("a.E"))
p=k.length!==0?9:10
break
case 9:p=11
return c.bP(k)
case 11:p=1
break
case 10:p=f&&q.M(g)<q.O(h)?12:13
break
case 12:j=q.P()
p=j.dl(h,!0)&&j.d>=j.al(!0).a?14:15
break
case 14:p=16
return c.b=s.aC(r,q,j,A.c([new A.y(B.u,null,g,null,0)],t.w),"\u672c\u5730\u4ecd\u6709\u8fce\u6218\u540d\u989d\uff0c\u5148\u62db\u52df\u8865\u5f3a\uff0c\u518d\u6309\u5b9e\u9645\u5230\u4efb\u5c5e\u6027\u590d\u6838\uff0c\u6682\u4e0d\u53ec\u56de\u8fdc\u5f81"),1
case 16:p=1
break
case 15:case 13:p=17
return c.bP(new A.d(l,m.a(new A.fU(B.a.D(l,new A.fV()))),e))
case 17:case 1:return 0
case 2:return c.c=n.at(-1),3}}}},
bv(a,b){return new A.aw(this.cv(a,b),t.dT)},
cv(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e,d,c,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0
return function $async$bv(g1,g2,g3){if(g2===1){n.push(g3)
p=o}for(;;)switch(p){case 0:f4=r.a
f5=f4.a
f6=q.M(f5)>q.O(f4)
f7=t.Z
f8=A.c([],f7)
f9=s.ag(r,q)
g0=!f6
if(g0){m=s.Z(r,q)
m=(m==null?null:m.a)!==B.f}else m=!0
p=3
return g1.b=new A.ad(q,f8,f9,m,f6?"unsalvageableDefense\uff1a\u5f53\u524d\u5b89\u5168\u540d\u989d "+q.O(f4)+"\uff0c\u9a7b\u519b "+q.M(f5)+"\uff0c\u7b49\u5f85\u5408\u6cd5\u4fee\u590d":"\u4fdd\u6301\u53ef\u51fa\u573a\u5b88\u519b\uff0c\u7ee7\u7eed\u76d1\u63a7\u5168\u90e8\u6765\u654c","local"),1
case 3:f8=s.c
if(!f8.a4()){p=1
break}l=q.P()
k=l.ak()
p=k>0?4:5
break
case 4:p=6
return g1.b=s.aC(r,q,l,A.c([new A.y(B.h,null,f5,null,k)],t.w),"\u4f18\u5148\u7528\u56fd\u5e93\u8865\u6ee1\u5168\u56fd\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u5224\u65ad\u662f\u5426\u9700\u8981\u5916\u63f4"),1
case 6:case 5:f9=f4.ax
m=f9==null
p=m?7:8
break
case 7:j=q.P()
i=A.c([],t.w)
h=j.u(f5)
g=A.i(h)
f=g.h("d<1>")
e=A.p(new A.d(h,g.h("e(1)").a(new A.fi()),f),f.h("a.E"))
B.a.B(e,new A.fj())
p=e.length!==0?9:10
break
case 9:d=B.a.gL(e)
h=d.a
g=j.w
f=s.b.b
c=f4.d
a0=0
case 11:if(a0<4){a1=g.i(0,f5)
a1.toString
a2=f.i(0,"maxLevel")
a2.toString
a2=a1<B.b.l(a2)
a1=a2}else a1=!1
if(!a1){p=12
break}if(!j.aJ(f4,d)||j.d<j.al(!0).a){p=12
break}B.a.k(i,new A.y(B.j,h,f5,null,0))
a1=j.M(f5)
a2=g.i(0,f5)
if(a2==null)a2=c
p=a1<=a2?13:14
break
case 13:p=15
return g1.b=s.aC(r,q,j,i,"\u4f18\u5148\u7531\u9ad8\u5185\u653f\u5c06\u9886\u5347\u7ea7\uff0c\u4fdd\u62a4\u771f\u5b9e\u8fce\u6218\u540d\u989d"),1
case 15:a1=s.Z(r,j)
if((a1==null?null:a1.a)===B.f||f6){p=12
break}case 14:++a0
p=11
break
case 12:case 10:case 8:p=f6?16:17
break
case 16:h=q.u(f5)
g=A.i(h)
f=g.h("d<1>")
a3=A.p(new A.d(h,g.h("e(1)").a(new A.fk()),f),f.h("a.E"))
B.a.B(a3,new A.ft())
h=A.i(a3),g=A.X(a3,0,A.W(3,"count",t.S),h.c),f=g.$ti,g=new A.q(g,g.gm(0),f.h("q<k.E>")),c=f4.db,a1=f4.ay,a2=f4.d,a4=t.T,a5=t.w,a6=t.e,a7=h.h("e(1)"),h=h.h("d<1>"),f=f.h("k.E")
case 18:if(!g.j()){p=19
break}a8=g.d
if(a8==null)a8=f.a(a8)
if(!f8.a4()){p=19
break}a9=q.P()
i=A.c([],a5)
b0=A.c([a8],a6)
B.a.I(b0,new A.d(a3,a7.a(new A.fu(a8)),h))
a8=b0.length,b1=a9.w,b2=0
case 20:if(!(b2<b0.length)){p=22
break}b3=b0[b2]
b4=a9.M(f5)
if(m){b5=b1.i(0,f5)
if(b5==null)b5=a2}else{b5=c?1:0
b5=B.c.v(f9-a1-b5,0,5)}if(b4<=b5){p=22
break}if(!a9.c0(b3)){p=21
break}B.a.k(i,new A.y(B.t,b3.a,null,null,0))
p=m?23:24
break
case 23:b6=a9.P()
b7=A.p(i,a4)
b4=b6.u(f5)
b5=A.i(b4)
b8=b5.h("d<1>")
e=A.p(new A.d(b4,b5.h("e(1)").a(new A.fv()),b8),b8.h("a.E"))
B.a.B(e,new A.fw())
p=e.length!==0?25:26
break
case 25:b4=b6.w
b9=0
for(;;){if(b9<3){b5=b6.M(f5)
b8=b4.i(0,f5)
if(b8==null)b8=a2
b8=b5>b8
b5=b8}else b5=!1
if(!b5)break
if(!b6.aJ(f4,B.a.gL(e)))break
B.a.k(b7,new A.y(B.j,B.a.gL(e).a,f5,null,0));++b9}b5=b6.M(f5)
b4=b4.i(0,f5)
if(b4==null)b4=a2
p=b5<=b4&&b6.d>=b6.al(!0).a?27:28
break
case 27:p=29
return g1.b=s.aC(r,q,b6,b7,"\u5148\u89e3\u96c7\u4f4e\u4ea4\u6362\u4ef7\u503c\u6321\u4f4d\u8005\u7b79\u8d44\uff0c\u4fdd\u7559\u4e3b\u6301\u8005\u5b8c\u6210\u6551\u57ce\u5347\u7ea7"),1
case 29:case 28:case 26:case 24:case 21:b0.length===a8||(0,A.w)(b0),++b2
p=20
break
case 22:a8=a9.M(f5)
if(m){b0=b1.i(0,f5)
if(b0==null)b0=a2}else{b0=c?1:0
b0=B.c.v(f9-a1-b0,0,5)}p=a8<=b0?30:31
break
case 30:p=32
return g1.b=s.aC(r,q,a9,i,"\u6ca1\u6709\u53ef\u652f\u4ed8\u4e14\u53ca\u65f6\u7684\u5347\u7ea7\u65b9\u6848\uff0c\u6e05\u51fa\u6321\u4f4d\u5b88\u5c06\u5e76\u4fdd\u7559\u6838\u5fc3\u51fa\u573a"),1
case 32:case 31:p=18
break
case 19:case 17:c0=s.cR(r,q)
h=q.u(f5)
g=A.i(h)
f=g.h("d<1>")
c1=A.p(new A.d(h,g.h("e(1)").a(new A.fx(q)),f),f.h("a.E"))
B.a.B(c1,new A.fy(s,c0,q,f4))
p=(!g0||c0)&&s.a.Q.gN().gm(0)>1?33:34
break
case 33:c2=q.P()
if(c0)c2.at.k(0,f5)
c3=A.c([],f7)
g0=s.a.Q
h=g0.gN()
g=h.$ti
f=g.h("d<a.E>")
c4=A.p(new A.d(h,g.h("e(a.E)").a(new A.fz(f4)),f),f.h("a.E"))
B.a.B(c4,new A.fA(f4))
h=A.X(c1,0,A.W(s.b.r.fy,"count",t.S),A.i(c1).c),g=h.$ti,h=new A.q(h,h.gm(0),g.h("q<k.E>")),f=f4.db,c=f4.ay,a1=A.i(c4),a2=a1.c,a1=a1.h("z<1>"),a4=a1.h("q<k.E>"),a5=s.e,a6=a5.c,a7=s.f,a8=a1.h("k.E"),g=g.h("k.E"),b0=f4.d,b1=t.er,b4=t.bo,b5=t.i,b8=t.I
case 35:if(!h.j()){p=36
break}c5=h.d
if(c5==null)c5=g.a(c5)
if(!f8.a4()){p=36
break}c6=new A.z(c4,0,4,a1)
c6.U(c4,0,4,a2)
c6=new A.q(c6,c6.gm(0),a4)
c7=c2.w
c8=null
while(c6.j()){c9=c6.d
if(c9==null)c9=a8.a(c9)
d0=c9.a
d1=a7.i(0,d0)
d2=d1==null
if(d2)d3=null
else d3=d1.d.length!==0||d1.a.ax!=null
if(d3===!0){if(d2)d2=null
else{d2=d1.f
d2=d2==null?null:d2.a}d2=d2!==B.f}else d2=!1
if(d2)continue
d2=c2.M(d0)
d3=c9.ax
if(d3==null){d0=c7.i(0,d0)
if(d0==null)d0=c9.d}else{d0=c9.ay
d4=c9.db?1:0
d4=B.c.v(d3-d0-d4,0,5)
d0=d4}if(d2>=d0)continue
d5=a6.an(c5,c9.e,g0,!0,c9)
d0=c0?"evacuate":"transfer"
d2=c0?"\u73b0\u6709\u6838\u5fc3\u4e5f\u660e\u786e\u5904\u4e8e\u52a3\u52bf\uff0c\u5728\u5371\u9669\u7a97\u53e3\u524d\u8f6c\u79fb\u4fdd\u5168\u5c06\u9886\uff0c\u539f\u57ce\u98ce\u9669\u4ecd\u672a\u89e3\u51b3":"\u8f6c\u79fb\u591a\u4f59\u7684\u5f31\u5c06\uff0c\u4e3a\u5f3a\u5c06\u4fdd\u7559\u672c\u57ce\u8fce\u6218\u540d\u989d"
d6=a5.aY(c2,c5,d5,!0,r.ga7(),!0,d2,d0,c9)
if(d6!=null)c9=c8==null||d6.a.d>c8.a.d
else c9=!1
if(c9)c8=d6}if(c8==null){p=35
break}c2=c8.a
B.a.k(c3,c8.b)
c5=c2.M(f5)
if(m){c6=c2.w.i(0,f5)
if(c6==null)c6=b0}else{c6=f?1:0
c6=B.c.v(f9-c-c6,0,5)}p=c5<=c6?37:38
break
case 37:d7=new A.bR(c3,b1.a(new A.fl()),b4).G(0,0,new A.fm(s),b5)
c5=c2.P()
c6=A.p(c3,b8)
c7=s.ag(r,c2)
c9=isFinite(r.ga7())?"\u5b89\u5168\u5224\u65ad\u4ee5\u5b9e\u9645\u8fdb\u9a7b\u53cb\u57ce\u4e3a\u51c6\uff0c\u9014\u4e2d\u539f\u57ce\u5931\u5b88\u4ecd\u4f1a\u6e05\u9664\u90e8\u961f":"\u8f6c\u79fb\u5230\u5b89\u5168\u540e\u65b9\u6574\u5907"
d0=s.Z(r,c2)
d0=d0==null?null:d0.a
d2=c0?"relocation":"local"
p=39
return g1.b=new A.ad(c5,c6,c7+d7*0.65,d0!==B.f,c9,d2),1
case 39:if(f6){p=36
break}case 38:p=35
break
case 36:case 34:d8=s.bA(r,q)
d9=new A.fB(s,q)
g0=s.a.Q
h=g0.r
g=A.i(h)
f=g.h("d<1>")
e0=A.p(new A.d(h,g.h("e(1)").a(new A.fn(s,q,d9,d8)),f),f.h("a.E"))
B.a.B(e0,new A.fo(d9,f4))
h=r.d
g=h.length===0?0:s.b.r.fy
g=A.X(e0,0,A.W(g,"count",t.S),A.i(e0).c)
f=g.$ti
g=new A.q(g,g.gm(0),f.h("q<k.E>"))
c=s.e
a1=s.d
a2=c.c
a4=a2.a
a5=q.x
a6=!d8
a7=s.f
f=f.h("k.E")
a8=f4.db
b0=f4.ay
b1=f4.d
b4=q.w
b5=r.f
b8=s.b.b
c5=A.i(h)
c6=c5.h("n(1)")
c7=c5.h("Y<1,n>")
c9=f4.e
d0=c5.c
c5=c5.h("z<1>")
d2=c5.h("q<k.E>")
d3=c5.h("k.E")
d4=b5==null
case 40:if(!g.j()){p=41
break}e1=g.d
if(e1==null)e1=f.a(e1)
if(!f8.a4()){p=41
break}e2=e1.c
e3=a7.i(0,e2)
e4=r.ga7()
e5=e3==null
if(e5)e6=null
else e6=e3.d.length!==0||e3.a.ax!=null
e6=e6===!0?e3.ga7():1/0
e7=Math.min(e4,e6)
e4=!1
if(!d9.$1(e1)||d8){e6=s.Z(r,q)
if((e6==null?null:e6.a)!==B.f){e4=q.M(f5)
if(m){e6=b4.i(0,f5)
if(e6==null)e6=b1}else{e6=a8?1:0
e6=B.c.v(f9-b0-e6,0,5)}e6=e4<e6
e4=e6}}p=e4?42:43
break
case 42:e8=new A.Y(h,c6.a(new A.fp()),c7).ad(0,new A.fq(s))
if(m){e4=b4.i(0,f5)
if(e4==null)e4=b1}else{e4=a8?1:0
e4=B.c.v(f9-b0-e4,0,5)}e6=b8.i(0,"soldierLimit")
e6.toString
e9=a1.aD(e1,e8,e4,Math.min(B.b.l(e6),q.e+e1.gJ()))
e4=d4?null:b5.b
if(e4==null)e4=-1
p=e9.b>e4+0.05?44:45
break
case 44:d5=a2.an(e1,c9,g0,!0,f4)
if(m){e4=b4.i(0,f5)
if(e4==null)e4=b1}else{e4=a8?1:0
e4=B.c.v(f9-b0-e4,0,5)}e6=s.Z(r,q)
e6=e6==null?null:e6.b
d6=c.aY(q,e1,d5,!0,e7,!0,"\u672c\u5730\u62b5\u6297\u4ecd\u6709\u7f3a\u53e3\uff08\u57ce\u9632"+e4+"\u7ea7\uff0c\u9632\u5b88\u4f59\u91cf"+B.b.aH((e6==null?-1:e6)*100)+"\u70b9\uff09\uff0c\u63f4\u519b\u7ea6"+B.b.aW(d5.b,1)+"\u79d2\u5230\u8fbe\uff0c\u5371\u9669\u7a97\u53e3"+B.b.aW(e7,1)+"\u79d2\uff0c\u9884\u7559\u5165\u57ce\u540d\u989d","rescue",f4)
if(d6!=null){e4=s.Z(r,d6.a)
e4=(e4==null?null:e4.a)===B.f}else e4=!1
p=e4?46:47
break
case 46:e4=d6.a
p=48
return g1.b=new A.ad(e4,A.c([d6.b],f7),s.ag(r,e4)-A.a0(e1)*0.08,!1,"","recall"),1
case 48:case 47:case 45:case 43:e4=new A.z(h,0,2,c5)
e4.U(h,0,2,d0)
e4=new A.q(e4,e4.gm(0),d2)
e2=e2!==f5
e6=e1.a
case 49:if(!e4.j()){p=50
break}f0=e4.d
if(f0==null)f0=d3.a(f0)
f1=a5.i(0,e6)
if((f1==null?null:f1.b)==="intercept"){f1=a5.i(0,e6)
f1=f1==null?null:f1.r
f2=f1===f0.a.a}else f2=!1
if(d9.$1(e1)&&a6&&!f2){p=49
break}f1=!1
if(e2){if(e5)f3=null
else f3=e3.d.length!==0||e3.a.ax!=null
if(f3===!0){if(e5)f1=null
else{f1=e3.f
f1=f1==null?null:f1.a}f1=f1!==B.f}}if(f1){p=49
break}f1=f0.a
d5=c.c3(e1,f1,q)
if(a1.d0(e1,f1,a4.bT(f1.z)).a!==B.f){p=49
break}f3=d9.$1(e1)?"\u672c\u5730\u624b\u6bb5\u65e0\u6cd5\u62b5\u6321\u660e\u786e\u6765\u88ad\uff0c\u7d27\u6025\u622a\u51fb\u9884\u8ba1"+B.b.aW(d5.b,1)+"\u79d2\uff0c\u65e9\u4e8e\u654c\u519b"+B.b.aW(f0.b,1)+"\u79d2\u62b5\u57ce\uff1b\u6700\u540e\u624d\u6539\u6d3e\u8fdc\u5f81":"\u52a8\u7528\u9644\u8fd1\u95f2\u7f6e\u90e8\u961f\u622a\u51fb\u6765\u654c\uff0c\u4e0d\u6253\u65ad\u4e3b\u653b\u4efb\u52a1"
d6=c.cm(q,e1,d5,f0.b,!0,f1,f3,"intercept",f4)
p=d6!=null?51:52
break
case 51:f0=d6.a
p=53
return g1.b=new A.ad(f0,A.c([d6.b],f7),s.ag(r,f0)+80-A.a0(e1)*0.08,f6,"","recall"),1
case 53:case 52:p=49
break
case 50:p=40
break
case 41:if(g0.gN().gm(0)===1)h=(d4?null:b5.a)===B.r&&c1.length>1
else h=!1
p=h?54:55
break
case 54:h=g0.f,g=A.i(h),f=g.h("d<1>"),f=A.k_(new A.d(h,g.h("e(1)").a(new A.fr(s)),f),3,f.h("a.E")),g=f.a,f=new A.ba(g.gC(g),f.b,A.l(f).h("ba<1>"))
case 56:if(!f.j()){p=57
break}h=f.gp()
if(!f8.a4()){p=57
break}b3=B.a.ad(c1,new A.fs())
d6=c.ck(q,b3,a2.an(b3,h.e,g0,!0,h),r.ga7(),!0,"\u4fdd\u7559\u539f\u57ce\u5b88\u519b\u62d6\u5ef6\uff0c\u6838\u5fc3\u5728\u5371\u9669\u7a97\u53e3\u524d\u593a\u53d6\u7a7a\u57ce\u5efa\u7acb\u65b0\u636e\u70b9","newBase",h)
p=d6!=null?58:59
break
case 58:h=d6.a
g=A.c([d6.b],f7)
a1=s.ag(r,h)
a4=A.a0(b3)
a5=h.M(f5)
if(m){a6=h.w.i(0,f5)
if(a6==null)a6=b1}else{a6=a8?1:0
a6=B.c.v(f9-b0-a6,0,5)}p=60
return g1.b=new A.ad(h,g,a1+a4*1.2,a5>a6,"","relocation"),1
case 60:case 59:p=56
break
case 57:case 55:case 1:return 0
case 2:return g1.c=n.at(-1),3}}}},
aC(a,b,c,d,e){var s,r,q,p,o,n,m,l,k=this
t.k.a(d)
s=c.P()
r=B.a.D(d,new A.fI())?s.ak():0
q=A.i(d)
p=q.h("n?(1)").a(new A.fJ(k))
o=c.y.d7(b.y).G(0,0,new A.fK(k),t.i)
n=A.p(d,t.T)
m=k.e
q=A.p(new A.cf(new A.Y(d,p,q.h("Y<1,n?>")),t.gn),t.r)
p=a.d
l=A.i(p)
B.a.I(q,new A.Y(p,l.h("n(1)").a(new A.fL()),l.h("Y<1,n>")))
l=a.a
p=t.Y
q=A.c([new A.M(e,n,m.a_(q,A.c([l],p)),B.i,c.al(!0).a,!0)],t.Z)
if(r>0)q.push(new A.M("\u57ce\u9632\u5347\u7ea7\u540e\u5728\u540c\u4e00\u6b21\u8865\u5175\u7a97\u53e3\u5185\u5c3d\u91cf\u8865\u6ee1\u5168\u56fd\u5175\u5458\u5bb9\u91cf",A.c([new A.y(B.h,null,l.a,null,r)],t.w),m.a_(A.c([],t.e),A.c([l],p)),B.i,0,!0))
p=k.ag(a,s)
n=Math.max(0,b.d-s.d)
if(s.M(l.a)<=s.O(l)){m=k.Z(a,s)
m=(m==null?null:m.a)!==B.f}else m=!0
return new A.ad(s,q,p-o*0.65-n*0.2,m,"","local")},
cG(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=b.x,s=new A.ai(s,s.r,s.e,A.l(s).h("ai<2>")),r=this.e,q=a.a,p=q.a,o=this.a.Q,n=o.b,m=b.y,l=this.b.r.d,k=a.b;s.j();){j=s.d
if(j.b!=="intercept"||j.r!==p||j.y<=n)continue
i=o.a1(j.a)
if(i==null||i.f<=0||i.fr||m.n(0,i.a))continue
if(i.go===p)return!0
if(!i.cy||j.z<=n)continue
h=r.c3(i,q,b)
if(h.d&&h.b+l<k)return!0}return!1},
bA(a,b){var s,r
if(this.c.e)return!1
s=a.a
if(!(s.ax!=null||B.a.D(a.d,new A.fC())))return!1
if(a.ga2())return!0
if(b.u(s.a).length===0)return!0
r=this.Z(a,b)
return r!=null&&r.c<-this.b.r.p3},
cR(a8,a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7=this
if(!a7.bA(a8,a9))return!1
s=a8.a
r=s.a
q=a9.u(r)
p=q.length
if(p===0)return!1
for(o=a8.d,n=a7.b,m=n.b,l=a7.d,k=s.d,j=a9.w,i=a7.c,n=-n.r.p3,h=s.db,g=s.ay,s=s.ax,f=s==null,e=0;e<q.length;q.length===p||(0,A.w)(q),++e){d=q[e]
for(c=o.length,b=d.as===B.d,a=null,a0=0;a0<o.length;o.length===c||(0,A.w)(o),++a0){a1=o[a0]
if(f){a2=j.i(0,r)
if(a2==null)a2=k}else{a2=h?1:0
a2=B.c.v(s-g-a2,0,5)}a2=Math.max(1,a2)
a3=d.gJ()
if(b)a4=0
else{a4=a9.e
a5=m.i(0,"soldierLimit")
a5.toString
a5=Math.min(a4,B.b.l(a5)-d.gJ())
a4=a5}a6=l.aD(d,a1.a,a2,a3+a4)
if(a6.a===B.B||i.e)return!1
if(a==null||a6.b<a.b)a=a6}if(a==null||a.c>=n)return!1}return!0},
Z(b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this,b2=null,b3=b4.d
if(b3.length===0)return b2
s=b4.a
r=s.a
q=b5.u(r)
p=b5.e
for(o=b5.x,o=new A.ai(o,o.r,o.e,A.l(o).h("ai<2>")),n=t.N,m=t.z,l=t.n,k=b1.e.c,j=b1.a.Q,i=j.b,h=b5.y,g=b1.b,f=g.r.d;o.j();){e=o.d
if(!e.as||e.d!==r||e.y<i)continue
d=j.a1(e.a)
if(d==null||d.fr||d.go!=null||d.f<=0||h.n(0,d.a)||B.a.D(q,new A.fF(d)))continue
c=d.z
for(e=J.kW(e.w,e.x),b=e.$ti,e=new A.q(e,e.gm(0),b.h("q<k.E>")),b=b.h("k.E"),a=0;e.j();c=a1){a0=e.d
a1=a0==null?b.a(a0):a0
a+=k.af(c,a1)}if(!isFinite(a)||a+f>=b4.ga7())continue
p=Math.min(b5.f,p+d.gJ())
e=A.af(d.H(),n,m)
e.A(0,"hp",d.r)
e.A(0,"troops",A.c([],l))
e.A(0,"s",0)
B.a.k(q,A.jG(e))}B.a.B(q,A.kz())
o=A.i(q)
n=t.r
a2=A.aR(new A.d(q,o.h("e(1)").a(new A.fG(b4)),o.h("d<1>")),n)
m=A.c([],t.e)
if(a2!=null)m.push(a2)
o=o.h("K<1>")
B.a.I(m,new A.K(q,o).bt(0,o.h("e(k.E)").a(new A.fH(a2))))
a3=A.X(m,0,A.W(b5.O(s),"count",t.S),n).aj(0)
if(a3.length===0)return b2
for(o=b1.d,n=s.d,m=b5.w,g=g.b,l=s.CW,k=s.db,j=s.ay,s=s.ax,i=s==null,a4=b2,a5=0;a5<a3.length;++a5){d=a3[a5]
if(d.as===B.d)a6=0
else{h=g.i(0,"soldierLimit")
h.toString
a6=Math.min(p,B.b.l(h)-d.gJ())}p-=a6
for(h=b3.length,a7=b2,a8=0;a8<b3.length;b3.length===h||(0,A.w)(b3),++a8){a9=b3[a8]
if(i){f=m.i(0,r)
if(f==null)f=n}else{f=k?1:0
f=B.c.v(s-j-f,0,5)}b0=o.aD(d,a9.a,Math.max(1,f-a5),d.gJ()+a6)
if(a7==null||b0.b<a7.b)a7=b0}if(d.e===2&&d.a===l)return a7
if(a4==null||a7.b>a4.b)a4=a7}return a4},
ag(a,b){var s,r,q,p=a.a,o=p.a,n=b.M(o),m=Math.max(0,n-b.O(p))
o=b.u(o)
s=A.i(o)
s=new A.d(o,s.h("e(1)").a(new A.fD()),s.h("d<1>")).G(0,0,new A.fE(),t.H)
o=this.a.Q.gN().gm(0)===1?400:0
r=150+p.r*4+a.w*0.5+s+o
q=this.Z(a,b)
p=n===0?r*2:0
o=q==null?null:q.b
if(o==null)o=-0.8
return-m*5000-p+o*r}}
A.fR.prototype={
$1(a){return this.a.cG(t.O.a(a),this.b)},
$S:9}
A.fS.prototype={
$1(a){t.J.a(a)
return a.f&&B.a.D(this.a.d,new A.fQ(a))},
$S:11}
A.fQ.prototype={
$1(a){return t.O.a(a).a.a===this.a.r},
$S:9}
A.fT.prototype={
$1(a){var s,r,q,p,o,n,m=this
t.x.a(a)
s=!1
if(a.f==="local"){r=a.b
if(r.length!==0)if(B.a.D(r,new A.fO())){q=a.a
p=m.b
o=p.a
if(q.M(o.a)<=q.O(o)){o=m.a
n=o.Z(p,q)
n=n==null?null:n.c
if(n==null)n=-1
if(n>=-o.b.r.p3){s=o.Z(p,q)
s=s==null?null:s.b
if(s==null)s=-1
q=m.c
q=q==null?null:q.b
s=(s>(q==null?-1:q)+0.04||B.a.D(r,new A.fP()))&&a.c>o.ag(p,m.d)}}}}return s},
$S:18}
A.fO.prototype={
$1(a){return B.a.D(t.I.a(a).b,new A.fN())},
$S:25}
A.fN.prototype={
$1(a){var s=t.T.a(a).a
return s===B.j||s===B.t||s===B.h||s===B.D},
$S:12}
A.fP.prototype={
$1(a){return B.a.D(t.I.a(a).d,new A.fM())},
$S:25}
A.fM.prototype={
$1(a){return t.J.a(a).b==="intercept"},
$S:11}
A.fV.prototype={
$1(a){t.x.a(a)
return a.f!=="relocation"&&!a.d},
$S:18}
A.fU.prototype={
$1(a){t.x.a(a)
return!this.a||a.f!=="relocation"},
$S:18}
A.fi.prototype={
$1(a){return t.r.a(a).dx},
$S:0}
A.fj.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fk.prototype={
$1(a){t.r.a(a)
return a.db&&a.e!==2},
$S:0}
A.ft.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.a0(a),A.a0(b))},
$S:2}
A.fu.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fv.prototype={
$1(a){return t.r.a(a).dx},
$S:0}
A.fw.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fx.prototype={
$1(a){t.r.a(a)
return a.cx&&!this.a.Q.n(0,a.a)},
$S:0}
A.fy.prototype={
$2(a,b){var s,r,q,p,o,n,m=this,l="soldierLimit",k=t.r
k.a(a)
k.a(b)
if(m.b)return B.b.t(A.a0(b),A.a0(a))
k=m.a.b
s=m.c
r=m.d
q=s.O(r)
p=k.b
o=p.i(0,l)
o.toString
o=A.bH(a,k,q,B.b.l(o))
r=s.O(r)
p=p.i(0,l)
p.toString
n=B.b.t(o,A.bH(b,k,r,B.b.l(p)))
return n!==0?n:B.b.t(A.a0(a),A.a0(b))},
$S:2}
A.fz.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:1}
A.fA.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.F(s),b.e.F(s))},
$S:4}
A.fl.prototype={
$1(a){return t.I.a(a).d},
$S:40}
A.fm.prototype={
$2(a,b){var s
A.an(a)
s=this.a.a.Q.a1(t.J.a(b).a)
s.toString
return a+A.a0(s)},
$S:41}
A.fB.prototype={
$1(a){var s,r,q=this.a.a.Q,p=this.b
if(A.jv(a,q,p)==null){p=p.x
s=a.a
r=p.i(0,s)
if((r==null?null:r.b)==="intercept"){p=p.i(0,s)
q=q.a1(p==null?null:p.r)
q=q==null?null:q.f
q=(q==null?0:q)>0}else q=!1}else q=!0
return q},
$S:0}
A.fn.prototype={
$1(a){var s,r,q,p,o=this
t.r.a(a)
s=!1
if(a.b===o.a.a.Q.a)if(a.cy)if(!a.fr){r=o.b
q=a.a
p=r.x.i(0,q)
if((p==null?null:p.as)!==!0)if(!r.Q.n(0,q))s=!o.c.$1(a)||o.d}return s},
$S:0}
A.fo.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a
if(!J.ay(s.$1(a),s.$1(b)))return s.$1(a)?1:-1
s=this.b.e
return B.b.t(a.z.F(s),b.z.F(s))},
$S:2}
A.fp.prototype={
$1(a){return t.O.a(a).a},
$S:26}
A.fq.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.ku(a,s)>A.ku(b,s)?a:b},
$S:19}
A.fr.prototype={
$1(a){var s
t.q.a(a)
s=this.a.a.Q
return a.b!==s.a&&s.u(a.a).length===0},
$S:1}
A.fs.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return A.a0(a)>=A.a0(b)?a:b},
$S:19}
A.fI.prototype={
$1(a){return t.T.a(a).a===B.j},
$S:12}
A.fJ.prototype={
$1(a){return this.a.a.Q.a1(t.T.a(a).b)},
$S:66}
A.fK.prototype={
$2(a,b){var s
A.an(a)
s=this.a.a.Q.a1(A.L(b))
s.toString
return a+A.a0(s)},
$S:45}
A.fL.prototype={
$1(a){return t.O.a(a).a},
$S:26}
A.fC.prototype={
$1(a){var s,r,q
t.O.a(a)
s=a.a
r=s.as
if(r!==B.v){q=!1
if(a.c>=0.9)if(r!==B.n){s=s.Q
s=Math.abs(s.a)+Math.abs(s.b)>0.01}else s=q
else s=q}else s=!0
return s},
$S:9}
A.fF.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fG.prototype={
$1(a){return t.r.a(a).a===this.a.a.CW},
$S:0}
A.fH.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fD.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.fE.prototype={
$2(a,b){return A.x(a)+A.a0(t.r.a(b))},
$S:46}
A.r.prototype={
H(){return A.c([this.a,this.b],t.n)},
F(a){var s=this.a-a.a,r=this.b-a.b
return Math.sqrt(s*s+r*r)},
aG(a,b){var s=this.a,r=this.b
return new A.r(s+(a.a-s)*b,r+(a.b-r)*b)}}
A.eb.prototype={
X(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this.a,f=B.a.gL(g)
for(s=a.a,r=a.b,q=1/0,p=0;o=g.length,p<o;){n=g[p];++p
m=g[p%o]
o=n.a
l=m.a-o
k=n.b
j=m.b-k
i=n.aG(m,B.b.v(((s-o)*l+(r-k)*j)/(l*l+j*j),0,1))
h=i.F(a)
if(h<q){q=h
f=i}}return f},
n(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(this.X(b).F(b)<1e-7)return!0
for(s=this.a,r=s.length,q=b.b,p=b.a,o=!1,n=0;n<r;){m=s[n];++n
l=s[n%r]
k=m.b
j=l.b
if(k>q!==j>q){i=m.a
i=p<(l.a-i)*(q-k)/(j-k)+i
k=i}else k=!1
if(k)o=!o}return o},
c2(a,b){var s
if(this.n(0,a))return null
s=this.bZ(a,b)
return s.length===0?null:B.a.ad(s,B.A)},
bZ(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.a,g=b.a-h,f=a.b,e=b.b-f,d=A.c([],t.n)
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
if(j>=-1e-7&&j<=1.0000001&&i>=-1e-7&&i<=1.0000001)B.a.k(d,B.b.v(j,0,1))}return d},
bQ(a,b){var s,r=this
if(r.n(0,a))return r.X(a)
s=r.c2(a,b)
return s==null?r.X(a):a.aG(b,s)},
c_(a,b){var s=a.F(b),r=s<1e-7?new A.r(a.a+4096,a.b+0):a.aG(b,4096/s),q=this.bZ(a,r)
return q.length===0?this.X(b):a.aG(r,B.a.ad(q,B.z))}}
A.al.prototype={
aO(){return"AiArmyState."+this.b}}
A.n.prototype={
gJ(){var s=this.at,r=A.i(s)
return new A.d(s,r.h("e(1)").a(new A.du()),r.h("d<1>")).gm(0)},
gbg(){return this.f+B.a.G(this.at,0,new A.dt(),t.H)},
H(){var s,r,q,p,o,n,m,l=this,k=l.z,j=t.n
k=A.c([k.a,k.b],j)
s=l.Q
s=A.c([s.a,s.b],j)
r=l.ay
r=r==null?null:A.c([r.a,r.b],j)
q=A.c([],t.b)
for(p=l.k3,o=p.length,n=0;n<p.length;p.length===o||(0,A.w)(p),++n){m=p[n]
q.push(A.c([m.a,m.b],j))}return A.P(["id",l.a,"c",l.b,"home",l.c,"o",l.d,"t",l.e,"hp",l.f,"max",l.r,"a",l.w,"p",l.x,"pay",l.y,"xy",k,"v",s,"s",l.as.a,"troops",l.at,"m",l.ax,"to",r,"target",l.ch,"return",l.CW,"dispatch",l.cx,"move",l.cy,"dismiss",l.db,"upgrade",l.dx,"retreat",l.dy,"marked",l.fr,"rev",l.fx,"orderRev",l.fy,"opponent",l.go,"clashes",l.id,"received",l.k1,"dealt",l.k2,"returnPath",q,"regionCity",l.k4,"salaryPaidMonth",l.ok,"movementPending",l.p1],t.N,t.X)}}
A.du.prototype={
$1(a){return A.an(a)>0},
$S:15}
A.dt.prototype={
$2(a,b){return A.x(a)+A.an(b)},
$S:16}
A.D.prototype={
ga3(){var s,r=this,q=r.ax
if(q==null)q=r.d
else{s=r.db?1:0
s=B.c.v(q-r.ay-s,0,5)
q=s}return q},
H(){var s,r,q,p,o,n=this,m=n.e,l=t.n
m=A.c([m.a,m.b],l)
s=A.c([],t.b)
for(r=n.f.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.w)(r),++p){o=r[p]
s.push(A.c([o.a,o.b],l))}return A.P(["id",n.a,"c",n.b,"native",n.c,"level",n.d,"xy",m,"outline",s,"income",n.r,"baseIncome",n.z,"poor",n.w,"cap",n.x,"recruitCap",n.y,"recruit",n.Q,"upgrade",n.as,"rev",n.at,"initial",n.ax,"wins",n.ay,"attacker",n.ch,"defender",n.CW,"stage",n.cx,"next",n.cy,"fallen",n.db,"danger",n.dx],t.N,t.X)}}
A.b0.prototype={
H(){var s,r,q=this,p=t.N,o=A.a4(p,t.S)
for(s=q.y.gau(),s=s.gC(s);s.j();){r=s.gp()
o.A(0,""+r.a,r.b)}return A.P(["id",q.a,"gold",q.b,"reserves",q.c,"capacity",q.d,"salary",q.e,"poor",q.f,"baseIncome",q.r,"garrisonAccrued",q.w,"soldierRecruitmentAllowed",q.x,"hate",o],p,t.X)}}
A.e4.prototype={
gac(){return B.a.av(this.w,new A.e9(this))},
gN(){var s=this.f,r=A.i(s)
return new A.d(s,r.h("e(1)").a(new A.ea(this)),r.h("d<1>"))},
u(a){var s=this.r,r=A.i(s),q=r.h("d<1>")
s=A.p(new A.d(s,r.h("e(1)").a(new A.e7(this,a)),q),q.h("a.E"))
B.a.B(s,A.kz())
return s},
a1(a){var s=this.r,r=A.i(s)
return A.aR(new A.d(s,r.h("e(1)").a(new A.e8(a)),r.h("d<1>")),t.r)},
E(a){var s=this.f,r=A.i(s)
return A.aR(new A.d(s,r.h("e(1)").a(new A.e5(a)),r.h("d<1>")),t.q)},
H(){var s,r,q,p,o=this,n=t.d,m=A.c([],n)
for(s=o.f,r=s.length,q=0;q<r;++q)m.push(s[q].H())
s=A.c([],n)
for(r=o.r,p=r.length,q=0;q<p;++q)s.push(r[q].H())
n=A.c([],n)
for(r=o.w,p=r.length,q=0;q<p;++q)n.push(r[q].H())
return A.P(["country",o.a,"tick",o.b,"month",o.e,"cities",m,"heroes",s,"countries",n,"pool",o.x,"salary",o.y,"year",o.c,"monthIndex",o.d],t.N,t.X)}}
A.e9.prototype={
$1(a){return t.t.a(a).a===this.a.a},
$S:6}
A.ea.prototype={
$1(a){return t.q.a(a).b===this.a.a},
$S:1}
A.e7.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b
if(a.c===s){r=a.as
s=(r===B.e||r===B.d)&&a.f>0&&a.b===B.a.av(this.a.f,new A.e6(s)).b}else s=!1
return s},
$S:0}
A.e6.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.e8.prototype={
$1(a){return t.r.a(a).a===this.a},
$S:0}
A.e5.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.h7.prototype={
cp(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
for(s=this.b,r=s.x,r=new A.ai(r,r.r,r.e,A.l(r).h("ai<2>")),q=this.f,p=this.a,o=p.a,n=s.y,s=s.z;r.j();){m=r.d
l=p.a1(m.a)
k=p.E(m.d)
j=!0
if(m.b==="expedition")if(l!=null)if(k!=null)if(k.b!==o)if(l.b===o)if(!l.fr)if(!(l.f<=0)){m=l.a
if(!n.n(0,m)){i=l.as
if(i!==B.x)m=(i===B.e||i===B.d)&&!s.n(0,m)
else m=j}else m=j}else m=j
else m=j
else m=j
else m=j
else m=j
else m=j
else m=j
if(m)continue
J.kQ(q.c9(k.a,new A.h9()),l)}},
gaU(){var s,r,q,p=this,o=p.d
if(o==null||p.f.a!==0)return o
s=new A.hd(p)
r=p.a
if(A.aP(o,r,p.c,null).ga5())return s.$1(o)?o:null
r=r.f
q=A.i(r)
return new A.Y(r,q.h("b(1)").a(new A.hb()),q.h("Y<1,b>")).dw(0).D(0,new A.hc(p,s))?null:o},
gc8(){var s,r=this
if(r.gaU()!=null){s=r.a.E(r.e)
s=s==null?null:s.b
s=s==r.gaU()}else s=!1
return s?r.e:null},
gY(){var s=this.f,r=A.l(s).h("a7<1>"),q=A.p(new A.a7(s,r),r.h("a.E"))
B.a.B(q,new A.hh(this))
return A.aR(q,t.S)},
gc6(){var s,r=this,q=r.gY()
if(q!=null){s=r.c.r
s=r.a.d>=s.k2&&r.f.a<s.k1&&r.d2(q)>=s.k3}else s=!0
return s},
aw(a){var s,r,q,p,o=this
if(o.gY()==null)return!0
s=o.f
r=a.a
if(s.W(r))return!0
q=!1
if(o.gaU()!=null)if(a.b!==o.gaU())q=o.gY()==null||!o.gc6()
if(q)return!1
p=o.gY()
if(p==null)p=o.gc8()
q=!0
if(p!=null)if(r!==p)s=o.gY()!=null&&!s.W(r)&&o.gc6()
else s=q
else s=q
return s},
d2(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c="soldierLimit",b=d.a,a=b.E(a0)
a.toString
s=d.f.i(0,a0)
if(s==null)s=A.c([],t.e)
r=s.length
q=d.b.z
p=d.c.b
o=0
n=0
for(;n<s.length;s.length===r||(0,A.w)(s),++n){m=s[n]
if(q.n(0,m.a)){l=p.i(0,c)
l.toString
k=B.b.l(l)}else k=m.gJ()
o+=d.bK(m,k,0)}j=B.a.av(b.w,new A.ha(a)).c
for(b=b.u(a0),s=A.i(b).h("K<1>"),s=A.X(new A.K(b,s),0,A.W(a.ga3(),"count",t.S),s.h("k.E")),b=s.$ti,s=new A.q(s,s.gm(0),b.h("q<k.E>")),r=a.db,q=a.ax,l=a.ay,i=q==null,b=b.h("k.E"),a=a.d,h=0,g=0;s.j();){f=s.d
if(f==null)f=b.a(f)
e=p.i(0,c)
e.toString
k=Math.min(B.b.l(e),f.gJ()+j)
j-=k-f.gJ()
if(i)e=a
else{e=r?1:0
e=B.c.v(q-l-e,0,5)}h+=d.bK(f,k,Math.max(1,e-g));++g}return h===0?1/0:o/h},
bK(a,b,c){var s,r=this.c,q=r.bU(a.w,c,!1)
r=r.b
s=r.i(0,"soldierPower")
s.toString
s=B.b.l(s)
r=r.i(0,"soldierHp")
r.toString
return(a.f+b*B.b.l(r))*(B.c.bd(q+b*s+2,4)+1)*(1+a.ax/1000)}}
A.h8.prototype={
$1(a){var s=t.q.a(a).b
return s===this.a&&s!==this.b.a},
$S:1}
A.h9.prototype={
$0(){return A.c([],t.e)},
$S:47}
A.hd.prototype={
$1(a){var s=this.a,r=s.a.f,q=A.i(r)
return new A.d(r,q.h("e(1)").a(new A.hf(a)),q.h("d<1>")).D(0,new A.hg(s))},
$S:28}
A.hf.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.hg.prototype={
$1(a){var s
t.q.a(a)
s=this.a
return s.a.gN().D(0,new A.he(s,a))},
$S:1}
A.he.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.b.c.af(r,this.b.f.X(r))<=s.c.r.at},
$S:1}
A.hb.prototype={
$1(a){return t.q.a(a).b},
$S:49}
A.hc.prototype={
$1(a){var s
A.h(a)
s=this.a
return A.aP(a,s.a,s.c,null).ga5()&&this.b.$1(a)},
$S:28}
A.hh.prototype={
$2(a,b){var s,r
A.h(a)
A.h(b)
s=this.a.f
r=B.c.t(s.i(0,b).length,s.i(0,a).length)
return r!==0?r:B.c.t(a,b)},
$S:50}
A.ha.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.d5.prototype={}
A.hi.prototype={
ai(a){var s=this.a.Q
return!A.aP(a.b,s,this.b,null).ga5()||s.gN().gm(0)>=3||s.gN().D(0,new A.hj(this,a))},
aV(a,b,c,d){var s,r,q,p,o,n,m,l,k=this
if(a===0||b.ga3()<3||k.a.Q.u(b.a).length<2)return a
s=k.a.Q.r
r=A.i(s)
q=r.h("e(1)")
r=r.h("d<1>")
p=new A.d(s,q.a(new A.hm(k)),r).G(0,0,new A.hn(),t.S)
o=d.z
n=k.c.af(o,b.f.X(o))
m=new A.d(s,q.a(new A.ho(k,p,n,b,c)),r).gm(0)
l=Math.max(0,c.d-c.V().a-20)
s=k.b
r=s.b.i(0,"soldierLimit")
r.toString
return Math.max(a,Math.min(s.r.fy,Math.min(m,B.c.aZ(l,Math.max(1,B.b.l(r))))))},
d6(a){var s,r,q,p,o=this.a.Q
if(o.c<3)return 1
s=this.b
r=s.r
q=Math.max(0,a.d-a.V().a-r.f)
s=s.b
p=s.i(0,"drawCost")
p.toString
p=B.b.l(p)
s=s.i(0,"soldierLimit")
s.toString
return Math.max(1,Math.min(r.fy,B.b.aZ(q,Math.max(1,p+o.y+B.b.l(s)))))},
a_(a,b){var s,r,q,p,o
t.ef.a(a)
t.E.a(b)
s=t.N
s=A.a4(s,s)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.w)(a),++q){p=a[q]
s.A(0,"h:"+p.a,p.fx)}for(r=b.length,q=0;q<b.length;b.length===r||(0,A.w)(b),++q){o=b[q]
s.A(0,"c:"+o.a,o.at)}return s},
ao(a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=this,a4=null,a5=b8==="intercept"
if(a5){s=a7.as
s=s===B.e||s===B.d}else s=!1
if(s)return a4
if(!a8.d||!isFinite(a8.b)||J.kS(a8.a)||a7.fr||a6.Q.n(0,a7.a))return a4
s=a8.b
r=a3.b
q=r.r
p=q.d
o=s+p
if(o>=b1)return a4
n=b8==="expedition"
if(n)m=!a3.ai(b9)
else m=!1
if(m)return a4
m=a7.a
l=a6.x.i(0,m)
k=l==null
if(!k){if(l.z>a3.a.Q.b&&!b2)return a4
j=!1
if(l.b===b8){i=l.d
if(i===b9.a){if(n){i=l.e
i=i===b9.b}else i=!0
if(i){i=l.r
if(i==(b3==null?a4:b3.a)){j=l.w
i=J.cy(j)
j=i.gbj(j)&&i.gaz(j).F(J.kU(a8.a))<32&&a7.as!==B.n}}}}if(j)return a4}h=a6.P()
g=A.c([],t.w)
if(!a9){j=r.b
i=j.i(0,"battleBudget")
i.toString
f=b0?1:b9.ga3()
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
p=B.b.aq(isFinite(b1)?b1*60:(Math.max(o,60)+q.cx+p)*60)
c=B.b.aH(q.CW*60)
b=a8.a
a=a9&&b6
if(n)n=b9.b
else n=a4
a0=new A.a5(m,b8,b7,s,n,b0,i,b,0,d+p,d+c,0,a9,a,a7.fy+1)
p=!1
if(a9){n=h.M(s)
p=(k?a4:l.as)===!0&&l.y>=d&&l.d===s?1:0
q=b6?Math.max(h.O(b9),b9.y+q.cy):h.O(b9)
q=n-p>=q}else q=p
if(q)return a4
q=a7.as
if(q===B.e||q===B.d){q=h.f
r=r.b.i(0,"soldierLimit")
r.toString
a1=Math.max(0,Math.min(q,b4+B.b.l(r)-a7.gJ())-h.e)
if(a1>0){if(f.x===B.p)return a4
a2=h.ak()
if(a2<a1)return a4
B.a.k(g,new A.y(B.h,a4,a7.c,a4,a2))}if(!h.d5(a7,a0))return a4
if(h.e<b4)return a4
if(a5||b.length>1)a5=a4
else a5=s
B.a.k(g,new A.y(B.D,m,a5,J.jF(b),0))}else{if(!h.dn(a7,a0))return a4
if(a5||b.length>1)a5=a4
else a5=s
B.a.k(g,new A.y(B.N,m,a5,J.jF(b),0))}a5=A.c([a7],t.e)
if(!j)a5.push(b3)
s=e.E(a7.c)
s.toString
s=A.c([s],t.Y)
s.push(b9)
return new A.d5(h,new A.M(b7,g,a3.a_(a5,s),A.c([a0],t.m),h.d,b2))},
ci(a,b,c,d,e,f,g,h,i,j){return this.ao(a,b,c,d,!1,e,f,null,0,0,g,h,i,j)},
cj(a,b,c,d,e,f,g,h){return this.ao(a,b,c,d,!1,1/0,!1,null,0,0,e,f,g,h)},
bp(a,b,c,d,e,f,g,h,i){return this.ao(a,b,c,!1,d,1/0,!1,null,e,f,!1,g,h,i)},
cl(a,b,c,d,e,f,g,h,i){return this.ao(a,b,c,!1,d,1/0,e,null,0,f,!1,g,h,i)},
aY(a,b,c,d,e,f,g,h,i){return this.ao(a,b,c,d,!1,e,f,null,0,0,!1,g,h,i)},
cm(a,b,c,d,e,f,g,h,i){return this.ao(a,b,c,!1,!1,d,e,f,0,0,!1,g,h,i)},
ck(a,b,c,d,e,f,g,h){return this.ao(a,b,c,!1,!1,d,e,null,0,0,!1,f,g,h)},
c3(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a5.go!=null)return B.q
s=this.a.Q
r=s.E(a4.c)
r.toString
q=a4.as
p=q===B.e||q===B.d?r.f.c_(r.e,a5.z):a4.z
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
g=h.bT(p)
if(!(g<m.length))return A.o(m,g)
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
a0=A.p(new A.d(A.c([(m-a)/j,(m+a)/j],t.n),t.db.a(new A.hk()),g),g.h("a.E"))
if(a0.length!==0)b=B.a.ad(a0,B.A)}for(m=s.f,a1=B.q,a2=0;a2<3;++a2){a3=new A.r(q+l*b,r+k*b)
if(!h.n(0,a3)||B.a.D(m,new A.hl(a3)))return B.q
a1=i.dv(a4,a3,s)
if(!a1.d)return a1
j=a1.b
if(Math.abs(b-j)<0.1)break
b=(b+j)/2}return a1}}
A.hj.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.c.af(r,this.b.f.X(r))<=s.b.r.at},
$S:1}
A.hm.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a.Q.a&&!a.fr},
$S:0}
A.hn.prototype={
$2(a,b){return Math.max(A.h(a),t.r.a(b).w)},
$S:7}
A.ho.prototype={
$1(a){var s,r,q,p,o,n=this
t.r.a(a)
s=n.a
r=!1
if(a.b===s.a.Q.a)if(!a.fr)if(a.f>=a.r*0.65)if(a.w>=n.b*0.8){q=!1
if(a.cx){p=n.c
if(p!=null){o=a.z
s=Math.abs(s.c.af(o,n.d.f.X(o))-p)<=s.b.r.ok}else s=!0
if(s){s=n.e
s=s.ap(a)&&!s.Q.n(0,a.a)}else s=q}else s=q
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
A.hk.prototype={
$1(a){return A.an(a)>=0},
$S:15}
A.hl.prototype={
$1(a){return t.q.a(a).f.n(0,this.a)},
$S:1}
A.aB.prototype={
aO(){return"AiDecisionStage."+this.b}}
A.ao.prototype={
aO(){return"AiActionKind."+this.b}}
A.y.prototype={
H(){var s=this,r=s.d
r=r==null?null:A.c([r.a,r.b],t.n)
return A.P(["kind",s.a.a,"hero",s.b,"city",s.c,"point",r,"amount",s.e],t.N,t.X)}}
A.a5.prototype={
H(){var s,r,q,p,o,n=this,m=A.c([],t.b)
for(s=n.w,r=s.length,q=t.n,p=0;p<s.length;s.length===r||(0,A.w)(s),++p){o=s[p]
m.push(A.c([o.a,o.b],q))}return A.P(["hero",n.a,"role",n.b,"deadline",n.y,"commit",n.z,"city",n.d,"enemy",n.r,"points",m,"leg",n.x,"gold",n.Q,"slot",n.as,"rearStaging",n.at,"reason",n.c,"order",n.ax,"targetCountry",n.e,"attrition",n.f],t.N,t.X)}}
A.M.prototype={
H(){var s,r,q,p=this,o=t.d,n=A.c([],o)
for(s=p.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.w)(s),++q)n.push(s[q].H())
o=A.c([],o)
for(s=p.d,r=s.length,q=0;q<s.length;s.length===r||(0,A.w)(s),++q)o.push(s[q].H())
return A.P(["reason",p.a,"actions",n,"deps",p.c,"tasks",o,"floor",p.e,"emergency",p.f],t.N,t.X)}}
A.bo.prototype={
H(){var s,r,q,p=this,o=A.c([],t.d)
for(s=p.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.w)(s),++q)o.push(s[q].H())
return A.P(["phase",p.a,"target",p.b,"gold",p.c,"heroes",p.d,"groups",o,"notes",p.f,"limited",p.r,"assessments",p.w,"routeSteps",p.x,"expansions",p.y],t.N,t.X)}}
A.ee.prototype={
H(){var s,r,q,p=this,o=p.Q.H(),n=A.c([],t.d)
for(s=p.as,r=s.length,q=0;q<s.length;s.length===r||(0,A.w)(s),++q)n.push(s[q].H())
return A.P(["protocol",2,"session",p.a,"id",p.d,"rules",p.b,"map",p.c,"observation",o,"deadline",p.e,"tasks",n,"seed",p.f,"priority",p.r,"idle",p.w,"stage",p.x.b,"offensiveCountry",p.y,"offensiveCity",p.z],t.N,t.X)}}
A.ed.prototype={
H(){var s=this
return A.P(["protocol",2,"session",s.a,"id",s.d,"country",s.e,"rules",s.b,"map",s.c,"tick",s.f,"deadline",s.r,"plan",s.x.H(),"micros",s.w,"error",s.y],t.N,t.X)}}
A.iQ.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.iR.prototype={
$0(){var s,r=this,q=r.a,p=q.d,o=r.b,n=!1
if(o.length!==0)if(p!=null){n=r.c
n=n.f>=n.r*0.5&&p.c>0&&p.b>=r.d.r.ch}if(n)return new A.av([!0,p.b,1,p.c])
s=B.b.aq(q.c/Math.max(1,r.e*0.85))
if(o.length!==0){o=r.c
o=o.f>=o.r*0.65&&s>=2&&s<=r.d.r.fy}else o=!1
if(o)return new A.av([!0,p.b,s,p.c])
return new A.av([!1,q.b,0,q.a])},
$S:51}
A.j2.prototype={
$1(a){t.cJ.a(a)
return this.a.F(a.a)>this.b+a.b},
$S:52}
A.j3.prototype={
$1(a){t.fg.a(a)
return!a.b&&this.a.F(a.a)>this.b},
$S:53}
A.hs.prototype={
dj(h8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5=this,h6=null,h7={}
h7.a=h8
s=h5.a
r=s.Q
q=h5.e
p=new A.a3(q,A.l(q).h("a3<2>")).D(0,new A.hx())
o=t.Z
n=A.c([],o)
m=A.c([],t.dZ)
h7.b=h7.c=!1
l=h5.b
k=s.y
s=s.z
j=A.c7(r,h8,l,s,k)
i=r.r
h=A.i(i)
g=h.h("e(1)")
h=h.h("d<1>")
f=A.p(new A.d(i,g.a(new A.hy(r)),h),h.h("a.E"))
B.a.B(f,new A.hz())
e=r.f
d=A.i(e)
c=d.h("e(1)")
d=d.h("d<1>")
b=d.h("a.E")
a=A.p(new A.d(e,c.a(new A.hK(h5,r,j)),d),b)
if(f.length!==0)B.a.B(a,new A.hV(h5,f,r))
a0=A.aR(a,t.q)
a1=h8.ca(a)
a2=a0==null
a3=a2?h6:A.aP(a0.b,r,l,h6)
a4=!p
if(a4)a5=(a3==null?h6:a3.ga5())===!0
else a5=!1
a6=new A.hw(h5,a5?Math.min(B.b.aq(a3.c*a3.gaS()),Math.max(0,h8.d-h8.V().a)):0)
a7=new A.ht(h7,h5,n)
a8=r.gN()
a9=A.p(a8,a8.$ti.h("a.E"))
B.a.B(a9,new A.hW(h7,h5))
a5=t.S
b0=Math.min(h7.a.f,B.a.G(a9,0,new A.hX(h7,h5),a5))
if(a9.length!==0){b1=h7.a.P()
b2=b1.ak()
if(b2>0)a7.$4(b1,A.c([new A.y(B.h,h6,B.a.gL(a9).a,h6,b2)],t.w),"\u4f18\u5148\u8865\u6ee1\u5168\u56fd\u5175\u5458\u5bb9\u91cf\uff0c\u8d44\u91d1\u4e0d\u8db3\u65f6\u4e70\u5f97\u8d77\u591a\u5c11\u8865\u591a\u5c11\uff0c\u4e0d\u900f\u652f",B.a.gL(a9))}for(a8=a9.length,b3=l.r,b4=b3.fx,b5=b4-2,b6=t.w,b7=0;b8=a9.length,b7<b8;a9.length===a8||(0,A.w)(a9),++b7){b9=a9[b7]
if(n.length>=b5)break
b8=b9.a
c0=q.i(0,b8)
if(c0==null)c0=h6
else c0=c0.d.length!==0||c0.a.ax!=null
if(c0!==!0||b9.ax!=null)continue
c1=h7.a.u(b8)
c0=c1.length
c2=h7.a
c3=b9.ax
if(c3==null){c2=c2.w.i(0,b8)
if(c2==null)c2=b9.d}else{c2=b9.db?1:0
c2=B.c.v(c3-b9.ay-c2,0,5)}c3=!1
if(c0<=c2){c0=q.i(0,b8)
if(c0==null)c0=h6
else{c0=c0.f
c0=c0==null?h6:c0.a}if(c0!==B.r){c0=q.i(0,b8)
c0=(c0==null?h6:c0.ga2())!==!0}else c0=c3}else c0=c3
if(c0)continue
c0=A.i(c1)
c2=c0.h("d<1>")
c4=A.p(new A.d(c1,c0.h("e(1)").a(new A.hY()),c2),c2.h("a.E"))
B.a.B(c4,new A.hZ())
if(c4.length===0)continue
c5=B.a.gL(c4)
b1=h7.a.P()
if(b1.aJ(b9,c5)&&b1.d>=b1.al(!0).a)a7.$6$emergency$hero(b1,A.c([new A.y(B.j,c5.a,b8,h6,0)],b6),"\u9632\u5fa1\u7b56\u7565\u53d1\u73b0\u6765\u654c\uff0c\u4f18\u5148\u63d0\u9ad8\u5fc5\u8981\u57ce\u9632\uff0c\u5347\u7ea7\u540e\u4ecd\u4fdd\u7559\u4f59\u989d",b9,!0,c5)}c6=new A.i1(h7,h5,b0,a0,a6,r,a7)
for(b7=0;a8=a9.length,b7<a8;a9.length===b8||(0,A.w)(a9),++b7){b9=a9[b7]
if(n.length>=b5)break
a8=b9.a
c1=h7.a.u(a8)
c0=q.i(0,a8)
if(c0==null)c0=h6
else c0=c0.d.length!==0||c0.a.ax!=null
c2=h7.a.M(a8)
c3=h7.a.a8(b9)
c7=!1
if(c0===!0){c0=h7.a.M(a8)
c8=b9.ax
if(c8==null)c8=b9.d
else{c9=b9.db?1:0
c9=B.c.v(c8-b9.ay-c9,0,5)
c8=c9}if(c0<c8){if(c1.length!==0){a8=q.i(0,a8)
if(a8==null)a8=h6
else{a8=a8.f
a8=a8==null?h6:a8.a}a8=a8!==B.f}else a8=!0
c7=a8}}if(c2<c3||c7)c6.$2$defense(b9,!0)}for(b8=h5.c,c0=h5.d,c2=a3==null,b7=0;b7<a9.length;a9.length===a8||(0,A.w)(a9),++b7){b9=a9[b7]
if(n.length>=b5)break
d0=b8.d6(h7.a)
d1=new A.d(i,g.a(new A.i_(h7,r,Math.max(12,new A.d(i,g.a(new A.i0(r)),h).G(0,0,new A.hA(),a5)*0.8))),h).gm(0)
d2=d0>=2&&d1+h7.a.as.a<d0&&B.a.D(e,new A.hB(r))
if(d2){c3=b9.a
c8=q.i(0,c3)
if(c8==null)c8=h6
else c8=c8.d.length!==0||c8.a.ax!=null
c3=c8!==!0&&h7.a.u(c3).length>=b9.y}else c3=!1
if(c3){c3=h7.a.u(b9.a)
c8=A.i(c3)
c9=c8.h("d<1>")
d3=A.p(new A.d(c3,c8.h("e(1)").a(new A.hC(h7,h5)),c9),c9.h("a.E"))
B.a.B(d3,new A.hD())
if(d3.length!==0){b1=h7.a.P()
d4=B.a.gL(d3)
if(b1.c0(d4))a7.$5$hero(b1,A.c([new A.y(B.t,d4.a,h6,h6,0)],b6),"\u5b89\u5168\u540e\u65b9\u6e05\u7406\u4f4e\u4ef7\u503c\u5197\u4f59\u7f16\u5236\uff0c\u4fdd\u7559\u5b9e\u9645\u5b88\u5c06\u548c\u5185\u653f\u5c06\u9886\uff0c\u4e3a\u5f3a\u653b\u4e3b\u529b\u8865\u5458",b9,d4)}}c3=b9.a
c1=h7.a.u(c3)
c8=A.i(c1)
c9=c8.h("d<1>")
c4=A.p(new A.d(c1,c8.h("e(1)").a(new A.hE()),c9),c9.h("a.E"))
B.a.B(c4,new A.hF())
if(c1.length!==0){d5=B.a.ad(c1,new A.hG())
d6=A.p(new A.d(e,c.a(new A.hH(h7,h5,r,d5)),d),b)
B.a.B(d6,new A.hI(h5,d5,r))
d7=d6.length===0?0:2
c8=A.i(d6)
c9=c8.h("z<1>")
d8=new A.z(d6,0,3,c9)
d8.U(d6,0,3,c8.c)
d8=new A.q(d8,d8.gm(0),c9.h("q<k.E>"))
c9=c9.h("k.E")
while(d8.j()){c8=d8.d
if(c8==null)c8=c9.a(c8)
d9=A.dq(d5,c8,r,l,c0,0).a[2]
if(d9>0){if(c2)c9=h6
else c9=a3.a!==a3.d.a&&a3.b>=a3.e.r.w
if(c9===!0){c9=c8.b
c9=c9===(a2?h6:a0.b)}else c9=!1
if(c9){d7=b8.aV(d9,c8,h7.a,d5)
break}d7=b8.aV(d9,c8,h7.a,d5)
break}}e0=d7}else e0=1
if(p){c8=q.i(0,c3)
c8=(c8==null?h6:c8.ga2())===!0}else c8=!0
e1=!1
if(c8){if(!a1.n(0,c3)){c8=q.i(0,c3)
if(c8==null)c8=h6
else c8=c8.d.length!==0||c8.a.ax!=null
c8=c8===!0}else c8=!0
if(c8){if(B.a.D(e,new A.hJ(r)))if(!d2)if(c1.length!==0)c8=e0>0&&h7.a.bS(c3)<h7.a.a8(b9)+e0
else c8=!0
else c8=!0
else c8=e1
e1=c8}}if(c4.length!==0)if(b9.ax==null){c8=c1.length
c9=h7.a.w.i(0,c3)
d8=!0
if(c9==null)c9=b9.d
if(c8<=c9)if(!B.a.D(c1,new A.hL())){if(e1){c8=c1.length
c9=h7.a.w.i(0,c3)
if(c9==null)c9=b9.d
c9=c8>=c9
c8=c9}else c8=!1
if(!c8){c8=q.i(0,c3)
if(c8==null)c8=h6
else{c8=c8.f
c8=c8==null?h6:c8.a}c8=c8===B.r}else c8=d8}else c8=d8
else c8=d8}else c8=!1
else c8=!1
if(c8){c8=q.i(0,c3)
if(c8==null)c8=h6
else c8=c8.d.length!==0||c8.a.ax!=null
if(c8!==!0)B.a.k(m,new A.bg(b9,B.a.gL(c4)))}if(e1&&!h7.b){c3=q.i(0,c3)
if(c3==null)c3=h6
else c3=c3.d.length!==0||c3.a.ax!=null
c6.$2$defense(b9,c3===!0)}}e2=A.c([],t.e)
for(i=a9.length,b7=0;b7<a9.length;a9.length===i||(0,A.w)(a9),++b7){b9=a9[b7]
h=b9.a
g=q.i(0,h)
if(g==null)g=h6
else g=g.d.length!==0||g.a.ax!=null
if(g===!0)continue
c1=h7.a.u(h)
h=A.i(c1)
g=h.h("d<1>")
e3=A.p(new A.d(c1,h.h("e(1)").a(new A.hM(h7)),g),g.h("a.E"))
B.a.B(e3,new A.hN())
h=A.h(Math.max(0,c1.length-h7.a.a8(b9)))
g=A.i(e3)
a8=new A.z(e3,0,h,g.h("z<1>"))
a8.U(e3,0,h,g.c)
B.a.I(e2,a8)}B.a.B(e2,new A.hO())
e4=h6
e5=h6
e6=0
e7=1
if(e2.length!==0&&!h7.c&&a4){d4=B.a.gL(e2)
e8=A.c7(r,h7.a,l,s,k)
d6=A.p(new A.d(e,c.a(new A.hP(h7,h5,r)),d),b)
B.a.B(d6,new A.hQ(h5,d4,r))
s=A.X(d6,0,A.W(b3.go,"count",a5),A.i(d6).c)
q=s.$ti
s=new A.q(s,s.gm(0),q.h("q<k.E>"))
k=l.b
i=b8.c
h=b3.ok
g=e8.f
e=t.aO
d=t.eO
c=d.h("a.E")
q=q.h("k.E")
b3=b3.k4
e9=e6
f0=e4
for(;;){if(!s.j()){e6=e9
e4=f0
break}A:{b=s.d
if(b==null)b=q.a(b)
f1={}
f2=A.p(new A.d(e2,e.a(new A.hR(h5,b)),d),c)
if(f2.length===0)break A
d4=B.a.gL(f2)
f3=A.dq(d4,b,r,l,c0,0)
f4=b.a
a4=g.i(0,f4)
f5=a4==null?h6:a4.length
if(f5==null)f5=0
a4=f3.a
f6=b8.aV(a4[2],b,h7.a,d4)
f7=f6-f5
f8=e8.gY()!=null&&e8.gY()!==f4
a8=!0
if(a4[2]!==0)if(f7>0)if(f7<=f2.length)if(f8)a8=f6!==1||a4[1]<b3
else a8=!1
if(a8)break A
f9=h7.a.P()
f9.d=1e6
f1.a=f9
g0=A.c([],b6)
a8=b.e
g2=1/0
g3=0
g4=0
for(;;){g1=!1
if(!(g4<f7)){g1=!0
break}if(!(g4<f2.length))return A.o(f2,g4)
g5=f2[g4]
if(A.dq(g5,b,r,l,c0,0).a[2]===0)break
g6=i.aI(g5,a8,r,b)
b5=g6.b
g2=Math.min(g2,b5)
g3=Math.max(g3,b5)
if(!g6.d||g3-g2>h)break
g7=B.a.G(a9,0,new A.hS(f1,h5,g5),a5)
b5=f1.a
c3=b5.f
c8=k.i(0,"soldierLimit")
c8.toString
c8=Math.min(g7,Math.max(0,c3-B.b.l(c8)))
g8=b8.bp(b5,g5,g6,a4[0],c8,f5+g4,"\u6309\u5171\u540c\u653b\u9632\u95e8\u69db\u6838\u7b97\u6574\u961f\u5175\u5458","expedition",b)
if(g8==null)break
f1.a=g8.a
b5=g8.b.b
c3=A.i(b5)
B.a.I(g0,new A.d(b5,c3.h("e(1)").a(new A.hT()),c3.h("d<1>")));++g4}if(!g1)break A
b=f1.a
g9=1e6-b.d+b.V().a
b=h7.a
if(b.d<g9){if(e9===0||g9<e9){e7=f6
e9=g9
f0=f4}break A}b1=b.P()
b=g0.length
b7=0
for(;;){if(!(b7<g0.length)){g1=!0
break}if(!b1.bW(g0[b7].e)){g1=!1
break}g0.length===b||(0,A.w)(g0);++b7}if(!g1||!a6.$1(b1))break A
if(g0.length!==0){b=r.E(d4.c)
b.toString
if(!a7.$4(b1,g0,"\u6309\u76ee\u6807\u57ce\u9632\u4e0e\u5b88\u5c06\u914d\u9f50"+f6+"\u540d\u8fdb\u653b\u5c06\u9886\u7684\u968f\u519b\u5175\u5458\uff0c\u4fdd\u7559\u6708\u4ff8\u9884\u7b97",b))break A}e5=f4
break}}}s=e4==null
if(s&&!h7.c)for(q=m.length,b7=0;b7<m.length;m.length===q||(0,A.w)(m),++b7){k=m[b7]
b9=k.a
c5=k.b
if(B.a.G(n,0,new A.hU(),a5)>=b4)break
b1=h7.a.P()
if(b1.aJ(b9,c5)&&a6.$2$civilian(b1,!0))a7.$5$hero(b1,A.c([new A.y(B.j,c5.a,b9.a,h6,0)],b6),"\u5b8c\u6210\u519b\u9700\u5b89\u6392\u540e\u7528\u4f59\u94b1\u5347\u7ea7\u57ce\u9632\uff0c\u4ecd\u4fdd\u7559\u6708\u4ff8\u4e0e\u5468\u8f6c\u4f59\u989d",b9,c5)}q=e5==null
h0=r.E(q?e4:e5)
if(h0==null)h0=a0
h1=h0==null?h6:A.aP(h0.b,r,l,h7.a.w)
h2=A.c([],o)
for(o=n.length,h3=0,b7=0;b7<n.length;n.length===o||(0,A.w)(n),++b7){h4=n[b7]
h3+=h4.b.length
if(h3>b4){c0.b.e=!0
break}B.a.k(h2,h4)}if(p)s="defending"
else s=s?"preparing":"saving"
q=q?e4:e5
if(q==null)if((c2?h6:a3.ga5())===!0)q=a2?h6:a0.a
else q=h6
c0=c0.b
o=c0.e
l=c0.c
k=c0.d
c0=c0.b
i=A.c([],t.s)
if(p)i.push("\u4e3b\u89d2\u6240\u5728\u57ce\u5b58\u5728\u660e\u786e\u98ce\u9669\uff0c\u519b\u8d39\u4f18\u5148\u7528\u4e8e\u5b88\u519b\u4e0e\u57ce\u9632\uff0c\u6682\u505c\u65b0\u589e\u8fdc\u5f81\u519b\u9700")
if(n.length===0)i.push("\u672c\u8f6e\u65e0\u5fc5\u8981\u4e14\u53ef\u652f\u4ed8\u7684\u91c7\u8d2d\uff0c\u4fdd\u7559\u56fd\u5e93")
if((h1==null?h6:h1.ga5())===!0)i.push("\u76ee\u6807\u56fd\u5360\u6709 "+h1.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.aq(h1.c*h1.gaS())+" \u91d1\u5e01\uff0c\u51c6\u5907\u8f6e\u653b\u5175\u529b")
return new A.bo(s,q,e6,e7,h2,i,o,l,k,c0)}}
A.hx.prototype={
$1(a){return t.a.a(a).ga2()},
$S:17}
A.hy.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&a.f>0&&!a.fr},
$S:0}
A.hz.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.hK.prototype={
$1(a){t.q.a(a)
return a.b!==this.b.a&&this.c.aw(a)&&this.a.c.ai(a)},
$S:1}
A.hV.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bk(o.a(b),B.a.gL(s),r,p,q,null),A.bk(a,B.a.gL(s),r,p,q,null))},
$S:4}
A.hw.prototype={
$2$civilian(a,b){var s=a.d,r=Math.max(a.V().a,this.a.b.r.f)
return s>=r+(b?this.b:0)},
$1(a){return this.$2$civilian(a,!1)},
$S:54}
A.ht.prototype={
$6$emergency$hero(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j
t.k.a(b)
s=a.P()
r=B.a.D(b,new A.hu())?s.ak():0
q=this.c
p=B.a.G(q,0,new A.hv(),t.S)
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
B.a.k(q,new A.M(c,b,l,B.i,e?a.al(!0).a:Math.max(a.V().a,k.f),e))
if(n)B.a.k(q,new A.M("\u5728\u540c\u4e00\u6b21\u8865\u5175\u7a97\u53e3\u5185\u8865\u5145\u5347\u7ea7\u65b0\u589e\u7684\u5168\u56fd\u5175\u5458\u5bb9\u91cf\uff0c\u4e0d\u900f\u652f\u56fd\u5e93",A.c([new A.y(B.h,null,d.a,null,r)],t.w),o.a_(A.c([],m),A.c([d],j)),B.i,0,e))
return!0},
$4(a,b,c,d){return this.$6$emergency$hero(a,b,c,d,!1,null)},
$5$hero(a,b,c,d,e){return this.$6$emergency$hero(a,b,c,d,!1,e)},
$S:55}
A.hu.prototype={
$1(a){return t.T.a(a).a===B.j},
$S:12}
A.hv.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:8}
A.hW.prototype={
$2(a,b){var s,r,q,p,o,n,m,l=null,k=t.q
k.a(a)
s=this.b.e
k=k.a(b).a
r=s.i(0,k)
r=(r==null?l:r.ga2())===!0?1:0
q=a.a
p=s.i(0,q)
o=B.c.t(r,(p==null?l:p.ga2())===!0?1:0)
if(o!==0)return o
r=this.a
p=r.a.u(k).length===0?1:0
n=B.c.t(p,r.a.u(q).length===0?1:0)
if(n!==0)return n
r=s.i(0,k)
if(r==null)r=l
else r=r.d.length!==0||r.a.ax!=null
r=r===!0?1:0
s=s.i(0,q)
if(s==null)s=l
else s=s.d.length!==0||s.a.ax!=null
m=B.c.t(r,s===!0?1:0)
return m!==0?m:B.c.t(q,k)},
$S:4}
A.hX.prototype={
$2(a,b){var s,r
A.h(a)
t.q.a(b)
s=this.a.a.u(b.a).length
r=this.b.b.b.i(0,"soldierLimit")
r.toString
return a+s*B.b.l(r)},
$S:5}
A.hY.prototype={
$1(a){return t.r.a(a).dx},
$S:0}
A.hZ.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.i1.prototype={
$2$defense(a,b){var s,r,q,p,o,n,m,l=this,k=null,j=l.a,i=a.a
if(!j.a.as.n(0,i)){s=l.b.e.i(0,i)
if(s==null)s=k
else s=s.d.length!==0||s.a.ax!=null
s=s===!0&&j.a.M(i)>=a.ga3()}else s=!0
if(s)return!1
r=j.a.P()
s=r.f
q=r.as.a
p=l.b
o=p.b.b.i(0,"soldierLimit")
o.toString
n=Math.max(0,Math.min(s,l.c+(q+1)*B.b.l(o))-r.e)
m=n>0?r.ak():0
if(m<n)return!1
if(!b){s=p.e.i(0,i)
if(s==null)s=k
else s=s.d.length!==0||s.a.ax!=null
s=s===!0}else s=!0
q=l.d
if(!r.bl(a,s,q==null?k:q.b)||!l.e.$1(r)){if(a.Q&&l.f.x>j.a.as.a){j.c=!0
if(b)j.b=!0}return!1}j=A.c([],t.w)
if(m>0)j.push(new A.y(B.h,k,i,k,m))
j.push(new A.y(B.u,k,i,k,0))
i=b?"\u4f18\u5148\u8865\u5145\u672c\u56fd\u5b88\u57ce\u7f3a\u53e3\uff0c\u5e76\u5907\u9f50\u65b0\u5c06\u5175\u5458\u4e0e\u6708\u4ff8":"\u5b88\u57ce\u7f3a\u53e3\u5df2\u4f18\u5148\u5904\u7406\uff0c\u518d\u8865\u524d\u7ebf\u8fdb\u653b\u5c06\u9886\u53ca\u5176\u5175\u5458"
return l.r.$4(r,j,i,a)},
$S:56}
A.i0.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&!a.fr},
$S:0}
A.hA.prototype={
$2(a,b){return Math.max(A.h(a),t.r.a(b).w)},
$S:7}
A.i_.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.b===this.b.a)if(!a.fr){r=this.a
if(!r.a.y.n(0,a.a))if(a.f>=a.r*0.65)if(a.w>=this.c){s=a.as
s=!(s===B.e||s===B.d)||r.a.ap(a)}}return s},
$S:0}
A.hB.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.hC.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.db){r=this.b.b
if(a.w<=r.r.p4){s=a.x
r=r.b.i(0,"drawCost")
r.toString
s=s<=B.b.l(r)&&s<15&&this.a.a.ap(a)}}return s},
$S:0}
A.hD.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.a0(a),A.a0(b))},
$S:2}
A.hE.prototype={
$1(a){return t.r.a(a).dx},
$S:0}
A.hF.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.hG.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return A.ac(a,!0)>A.ac(b,!0)?a:b},
$S:19}
A.hH.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.c7(s,this.a.a,r.b,q.z,q.y).aw(a)&&r.c.ai(a)}else s=!1
return s},
$S:1}
A.hI.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bk(o.a(b),s,r,p,q,null),A.bk(a,s,r,p,q,null))},
$S:4}
A.hJ.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.hL.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.hM.prototype={
$1(a){t.r.a(a)
return a.cx&&this.a.a.ap(a)},
$S:0}
A.hN.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.hO.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.hP.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.c7(s,this.a.a,r.b,q.z,q.y).aw(a)&&r.c.ai(a)}else s=!1
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
$1(a){t.r.a(a)
return this.a.c.ai(this.b)},
$S:0}
A.hS.prototype={
$2(a,b){var s,r,q
A.h(a)
t.q.a(b)
s=this.a
r=b.a
q=s.a.u(r).length
s=Math.min(Math.max(0,q-(r===this.c.c?1:0)),s.a.a8(b))
q=this.b.b.b.i(0,"soldierLimit")
q.toString
return a+s*B.b.l(q)},
$S:5}
A.hT.prototype={
$1(a){return t.T.a(a).a===B.h},
$S:12}
A.hU.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:8}
A.bm.prototype={}
A.ef.prototype={
af(b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=b1.a,a7=b1.b,a8=A.v(b0.a)+","+A.v(b0.b)+":"+A.v(a6)+","+A.v(a7),a9=a5.d
if(a9.W(a8)){a6=a9.i(0,a8)
a6.toString
return a6}for(s=a5.a,r=s.b,q=s.c,p=r+q+8,o=r-1,--q,n=a5.b,m=n.b,n=n.e,s=s.d,l=s.length,k=n.length,j=a5.c,i=b0,h=0,g=0;g<p;++g){f=i.F(b1)
if(f<1e-7){if(a9.a>=256){e=new A.a7(a9,A.l(a9).h("a7<1>")).gC(0)
if(!e.j())A.aM(A.aA())
a9.am(0,e.gp())}a9.A(0,a8,h)
return h}if(!j.dr())return 1/0
d=i.a
c=(a6-d)/f
b=i.b
a=(a7-b)/f
a0=B.c.v(B.b.a0((d+c*1e-7)/16),0,o)
a1=B.c.v(B.b.a0((b+a*1e-7)/16),0,q)
a2=new A.eg()
a3=a2.$3(d,c,a0)
a2=a2.$3(b,a,a1)
a4=Math.min(f,Math.min(A.iS(a3),A.iS(a2)))
a2=m.i(0,"marchSpeed")
a2.toString
a3=a1*r+a0
if(!(a3>=0&&a3<l))return A.o(s,a3)
a3=s[a3]
if(!(a3<k))return A.o(n,a3)
h+=a4/(a2*n[a3])
i=new A.r(d+c*a4,b+a*a4)}return 1/0},
an(a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=b0.E(a8.c),a5=a8.as,a6=(a5===B.e||a5===B.d)&&a4!=null?a4.f.c_(a4.e,a9):a8.z,a7=b2==null?a9:b2.f.bQ(a6,a9)
a5=this.a
if(!a5.n(0,a7))return B.q
s=new A.eh(b0,a8,b2)
r=new A.ej(this,b0,a8)
q=t._
p=A.c([A.c([a7],q)],t.a5)
if(!s.$2(a6,a7))o=b1&&r.$2(a6,a7)
else o=!0
if(o){n=a6.F(a7)
o=a6.a
m=a7.a
l=(o+m)/2
k=a6.b
j=a7.b
i=(k+j)/2
if(n>0)for(h=[-96,96,-192,192],k=(j-k)/n,o=(m-o)/n,g=0;g<4;++g){f=h[g]
e=new A.r(l-k*f,i+o*f)
if(a5.n(0,e))B.a.k(p,A.c([e,a7],q))}}for(a5=p.length,d=null,g=0;g<p.length;p.length===a5||(0,A.w)(p),++g){c=p[g]
q=c.length
a=a6
a0=0
a1=!1
a2=0
for(;;){if(!(a2<c.length)){b=!0
break}a3=c[a2]
if(s.$2(a,a3)){b=!1
break}a1=a1||r.$2(a,a3)
a0+=this.af(a,a3)
c.length===q||(0,A.w)(c);++a2
a=a3}q=!0
if(b)if(isFinite(a0))q=b1&&a1
if(q)continue
if(d==null||a0<d.b)d=new A.bm(c,a0,!0)}return d==null?B.S:d},
aI(a,b,c,d){return this.an(a,b,c,!1,d)},
dv(a,b,c){return this.an(a,b,c,!1,null)}}
A.eg.prototype={
$3(a,b,c){var s
if(Math.abs(b)<1e-12)s=1/0
else s=Math.max(1e-8,((b>0?c+1:c)*16-a)/b)
return s},
$S:57}
A.eh.prototype={
$2(a,b){return B.a.D(this.a.f,new A.ei(this.b,this.c,a,b))},
$S:29}
A.ei.prototype={
$1(a){var s,r=this
t.q.a(a)
if(a.b!==r.a.b){s=r.b
s=s==null?null:s.a
s=a.a!==s&&a.f.c2(r.c,r.d)!=null}else s=!1
return s},
$S:1}
A.ej.prototype={
$2(a,b){return B.a.D(this.b.r,new A.ek(this.a,this.c,b,a))},
$S:29}
A.ek.prototype={
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
l=B.b.v(((k.a-q)*p+(k.b-o)*n)/m,0,1)}s=r.aG(s,l).F(a.z)
r=j.a.b.b.i(0,"encounterDistance")
r.toString
return s<r+12},
$S:0}
A.el.prototype={
c7(a,b){var s,r=this.b
if(r.i(0,"useMorale")===0)return 0
if(b>0){r=r.i(0,"cityMoraleBonus"+B.c.v(b,1,5))
r=r==null?null:B.b.l(r)
if(r==null)r=0}else r=0
s=a+r
return s<0?0:s},
dh(a){return this.c7(a,0)},
be(a,b,c,d){var s,r,q,p
if(c){s=this.f
if(!(d<s.length))return A.o(s,d)
s=s[d]}else s=1
s=B.c.v(B.b.a0(a*s),0,63)
if(b>0){r=this.d
q=r.length
p=B.c.v(b-1,0,q-1)
if(!(p>=0&&p<q))return A.o(r,p)
p=r[p]
r=p}else r=0
return B.c.v(s+r,0,63)},
bU(a,b,c){return this.be(a,b,c,0)},
cY(a,b){return this.be(a,0,b,0)},
ah(a){var s,r,q="maxLevel",p=this.b,o=p.i(0,"firstYearCityLevel")
if(o==null){o=p.i(0,q)
o.toString
o=B.b.l(o)}o=B.b.l(o)
s=p.i(0,"initialYear")
s=B.b.l(s==null?1:s)
r=p.i(0,q)
r.toString
r=B.c.v(a-s,0,B.b.l(r))
s=p.i(0,"cityLevelsPerYear")
s=B.b.l(s==null?1:s)
p=p.i(0,q)
p.toString
return B.c.v(o+r*s,1,B.b.l(p))},
H(){var s=this
return A.P(["version",s.a,"values",s.b,"upgrades",s.c,"defenseBonuses",s.d,"movement",s.e,"field",s.f,"tuning",s.r.H()],t.N,t.X)}}
A.e3.prototype={
bT(a){var s=this.d,r=this.b
r=B.c.v(B.b.a0(a.b/16),0,this.c-1)*r+B.c.v(B.b.a0(a.a/16),0,r-1)
if(!(r>=0&&r<s.length))return A.o(s,r)
return s[r]},
n(a,b){var s,r=b.a
if(isFinite(r)){s=b.b
r=isFinite(s)&&r>=0&&s>=0&&r<this.b*16&&s<this.c*16}else r=!1
return r},
H(){var s=this
return A.P(["version",s.a,"width",s.b,"height",s.c,"terrain",s.d],t.N,t.X)}}
A.en.prototype={
dk(a){var s,r,q,p,o,n,m,l,k,j,i,h=this
try{s=t.d1.a(B.k.d3(a,null))
switch(J.aO(s,"kind")){case"init":if(!J.ay(J.aO(s,"protocol"),2)||!J.ay(J.aO(s,"build"),"38211274"))throw A.j(B.a9);++h.f
h.e=null
o=h.r
if(o.a>0){o.b=o.c=o.d=o.e=o.f=null
o.a=0
o.b1()}r=J.aO(s,"gameConfig")
o=t.f
if(!o.b(r))throw A.j(B.a4)
n=t.N
m=t.z
A.li(A.af(r,n,m))
h.c=A.l2(A.af(o.a(J.aO(s,"rules")),n,m))
m=A.af(o.a(J.aO(s,"map")),n,m)
o=A.L(m.i(0,"version"))
l=A.h(m.i(0,"width"))
k=A.h(m.i(0,"height"))
m=A.c0(t.R.a(m.i(0,"terrain")),!0,t.S)
j=new Uint8Array(A.mg(m))
if(l<=0||k<=0||m.length!==l*k)A.aM(B.ac)
h.d=new A.e3(o,l,k,j)
h.a.$1(B.k.ar(t.G.a(A.P(["kind","ready","rules",h.c.a,"map",o,"backend",h.b],n,t.X)),null))
break
case"cancel":o=h.e
n=J.aO(s,"id")
if(o==null?n==null:o===n)h.r.k(0,A.h(J.aO(s,"id")))
break
case"plan":if(h.c==null||h.d==null||h.e!=null){o=A.jY("AI \u5c1a\u672a\u5c31\u7eea\u6216\u5df2\u6709\u8bf7\u6c42\u6267\u884c\u4e2d")
throw A.j(o)}q=A.l1(A.af(t.f.a(J.aO(s,"request")),t.N,t.z))
h.e=q.d
h.aQ(q,h.f)
break
default:throw A.j(B.ab)}}catch(i){p=A.aN(i)
h.a.$1(B.k.ar(t.G.a(A.P(["kind","error","message",J.b_(p)],t.N,t.X)),null))}},
aQ(a,b){return this.cP(a,b)},
cP(a3,a4){var s=0,r=A.mB(t.o),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
var $async$aQ=A.mQ(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:a1=new A.i3()
$.jD()
a1.br()
m=a1
p=4
i=n.c
i.toString
h=n.d
h.toString
g=new A.em(i.r)
f=new A.ez(i,h,a3,g,A.a4(t.S,t.a))
e=t.N
h=new A.ef(h,i,g,A.a4(e,t.i))
f.e=h
f.f=new A.ew(i,g,A.a4(e,t.cM))
f.r=new A.hi(a3,i,h)
l=f
k=0
i=l.bs(),h=i.$ti,i=new A.aJ(i.a(),h.h("aJ<1>")),h=h.c,g=n.r,d=a3.d,c=t.o
case 7:if(!i.j()){s=8
break}b=i.b
if(b==null)h.a(b)
if(a4!==n.f||g.n(0,d)){if(a4===n.f){n.e=null
g.am(0,d)
n.a.$1(B.k.ar(t.G.a(A.P(["kind","cancelled","id",d],e,t.X)),null))}s=1
break}b=k
if(typeof b!=="number"){q=b.dD()
s=1
break}a=b+1
k=a
s=a>=n.c.r.id?9:10
break
case 9:k=0
b=m
if(b.b==null)b.b=$.hr.$0()
s=11
return A.m8(A.lg(B.G,c),$async$aQ)
case 11:m.br()
case 10:s=7
break
case 8:if(a4!==n.f){s=1
break}if(g.am(0,d)){n.e=null
n.a.$1(B.k.ar(t.G.a(A.P(["kind","cancelled","id",d],e,t.X)),null))
s=1
break}n.e=null
i=l.w
i.toString
n.a.$1(B.k.ar(t.G.a(A.P(["kind","reply","reply",A.jI(a3,i,null,m.gc1()).H()],e,t.X)),null))
p=2
s=6
break
case 4:p=3
a2=o.pop()
j=A.aN(a2)
if(a4!==n.f){s=1
break}n.e=null
i=A.c(["\u89c4\u5212\u5931\u8d25\uff0c\u4e3b\u73af\u5883\u4fdd\u7559\u6709\u9650\u5b89\u5168\u4fdd\u62a4"],t.s)
h=m.gc1()
n.a.$1(B.k.ar(t.G.a(A.P(["kind","reply","reply",A.jI(a3,new A.bo("preparing",null,0,1,B.K,i,!1,0,0,0),J.b_(j),h).H()],t.N,t.X)),null))
s=6
break
case 3:s=2
break
case 6:case 1:return A.ma(q,r)
case 2:return A.m9(o.at(-1),r)}})
return A.mb($async$aQ,r)}}
A.j4.prototype={
$1(a){t.r.a(a)
return a.w*3+a.f*0.35+a.gJ()*8},
$S:24}
A.j5.prototype={
$1(a){var s
t.r.a(a)
if(a.c===this.a.a){s=a.as
s=!(s===B.e||s===B.d)}else s=!1
return s},
$S:0}
A.j6.prototype={
$2(a,b){var s
A.an(a)
t.r.a(b)
s=A.a0(b)
return a+s*(b.go==null?0.12:0.03)},
$S:30}
A.a2.prototype={}
A.aq.prototype={
ga2(){var s=this,r=!1
if(B.a.D(s.b,new A.er()))if(s.a.ax!=null||B.a.D(s.d,new A.es())){r=s.r
r=r==null||r.a!==B.f}return r},
ga7(){var s,r=this.a
if(r.ax!=null)r=r.dx
else{r=this.d
if(r.length===0)r=1/0
else{s=A.i(r)
s=new A.Y(r,s.h("f(1)").a(new A.eq()),s.h("Y<1,f>")).ad(0,B.A)
r=s}}return r}}
A.er.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.es.prototype={
$1(a){return t.O.a(a).c>=0.55},
$S:9}
A.eq.prototype={
$1(a){return t.O.a(a).b},
$S:60}
A.i5.prototype={
dq(c5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9=this,c0="marchSpeed",c1=b9.a,c2=c5.a,c3=c1.u(c2),c4=A.c([],t.D)
for(s=c1.r,r=s.length,q=c5.e,p=c5.f,o=b9.b,n=o.b,o=o.r.b,m=q.a,l=q.b,k=c5.ch,j=c5.b,i=0;i<r;++i){h=s[i]
if(h.b!==j){g=h.as
g=g===B.e||g===B.d||h.f<=0}else g=!0
if(g)continue
if(h.a===k){B.a.k(c4,new A.a2(h,0,1))
continue}if(h.fr)continue
g=h.z
f=g.F(q)
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
a4=new A.r(g.a+b/a0*a3,g.b+a/a0*a3)
if(p.X(a4).F(a4)>48)continue}d=n.i(0,c0)
d.toString
a5=A.n4(q,o,e,d,p,g,new A.i6(b9),c)
if(a5==null)continue
if(h.as===B.n||a1)g=0.35
else if(a2>0.8)g=1
else g=f<72?0.9:0.55
B.a.k(c4,new A.a2(h,a5,g))}B.a.B(c4,new A.i7())
c2=A.i(c3)
r=t.r
a6=A.aR(new A.d(c3,c2.h("e(1)").a(new A.i8(c5)),c2.h("d<1>")),r)
q=A.c([],t.e)
if(a6!=null)q.push(a6)
c2=c2.h("K<1>")
B.a.I(q,new A.K(c3,c2).bt(0,c2.h("e(k.E)").a(new A.i9(a6))))
c2=t.S
a7=A.X(q,0,A.W(c5.ga3(),"count",c2),r).aj(0)
a8=A.a4(t.N,c2)
a9=B.a.av(c1.w,new A.ia(c5)).c
for(c1=a7.length,i=0;c2=a7.length,i<c2;a7.length===c1||(0,A.w)(a7),++i){b0=a7[i]
if(b0.as===B.d)b1=0
else{c2=n.i(0,"soldierLimit")
c2.toString
b1=Math.min(a9,B.b.l(c2)-b0.gJ())}a9-=b1
a8.A(0,b0.a,b0.gJ()+b1)}c1=c4.length
b2=null
b3=null
if(c1!==0&&c2!==0)for(c2=c5.db,r=c5.ax,q=c5.ay,p=r==null,o=b9.d,n=c5.d,b4=0;b4<a7.length;++b4,c1=l){b5=a7[b4]
for(m=b5.a,b6=null,i=0;l=c4.length,i<l;c4.length===c1||(0,A.w)(c4),++i){b7=c4[i]
if(p)l=n
else{l=c2?1:0
l=B.c.v(r-q-l,0,5)}b8=o.aD(b5,b7.a,Math.max(1,l-b4),a8.i(0,m))
if(b6==null||b8.b<b6.b)b6=b8}if(b2==null||b6.b>b2.b)b2=b6
if(b5.e===2)b3=b6}c1=A.i(s)
return new A.aq(c5,c3,c4,b2,b3,new A.d(s,c1.h("e(1)").a(new A.ib(c5)),c1.h("d<1>")).G(0,0,new A.ic(),t.i))}}
A.i6.prototype={
$2(a,b){var s=this.a,r=s.c,q=r.af(a,b)
if(!isFinite(q)&&r.c.e){r=a.F(b)
s=s.b.b.i(0,"marchSpeed")
s.toString
s=r/s}else s=q
return s},
$S:61}
A.i7.prototype={
$2(a,b){var s,r=t.O
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.o.t(a.a.a,b.a.a):B.b.t(r,s)},
$S:62}
A.i8.prototype={
$1(a){return t.r.a(a).a===this.a.CW},
$S:0}
A.i9.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.ia.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.ib.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=!1
if(a.b===s.b)if(a.c===s.a){s=a.as
s=!(s===B.e||s===B.d)&&!a.fr}else s=r
else s=r
return s},
$S:0}
A.ic.prototype={
$2(a,b){return A.an(a)+A.a0(t.r.a(b))},
$S:30}
A.em.prototype={
a4(){var s=this,r=s.b
if(r>=s.a.db){s.e=!0
return!1}s.b=r+1
return!0},
cX(){var s=this,r=s.c
if(r>=s.a.dx){s.e=!0
return!1}s.c=r+1
return!0},
dr(){var s=this,r=s.d
if(r>=s.a.dy){s.e=!0
return!1}s.d=r+1
return!0}}
A.j_.prototype={
$1(a){A.L(a)
return A.iJ(v.G.self).postMessage(a)},
$S:63}
A.j0.prototype={
$1(a){return this.a.dk(A.L(A.iJ(a).data))},
$S:64};(function aliases(){var s=J.aT.prototype
s.co=s.q
s=A.a.prototype
s.bt=s.dA})();(function installTearOffs(){var s=hunkHelpers._static_0,r=hunkHelpers._static_1,q=hunkHelpers._static_2,p=hunkHelpers.installStaticTearOff
s(A,"mA","lu",10)
r(A,"mS","lH",13)
r(A,"mT","lI",13)
r(A,"mU","lJ",13)
s(A,"kq","mL",3)
r(A,"mX","me",20)
r(A,"mV","nm",0)
q(A,"kz","l_",2)
p(A,"ng",2,null,["$1$2","$2"],["kx",function(a,b){return A.kx(a,b,t.H)}],27,0)
p(A,"nf",2,null,["$1$2","$2"],["kw",function(a,b){return A.kw(a,b,t.H)}],27,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.A,null)
q(A.A,[A.je,J.cP,A.ca,J.b2,A.C,A.i2,A.a,A.q,A.c1,A.T,A.bS,A.ba,A.bP,A.cg,A.J,A.aI,A.bq,A.bK,A.ci,A.a6,A.id,A.h6,A.bQ,A.co,A.F,A.h1,A.b6,A.ai,A.c_,A.as,A.dh,A.iG,A.iE,A.dd,A.aJ,A.ap,A.bc,A.U,A.de,A.dm,A.cu,A.bt,A.dk,A.be,A.E,A.ct,A.cG,A.cI,A.iz,A.cJ,A.df,A.d3,A.cb,A.ik,A.ae,A.a9,A.aa,A.dn,A.i3,A.bu,A.ep,A.b1,A.et,A.bJ,A.ew,A.cA,A.au,A.ez,A.ad,A.fh,A.r,A.eb,A.n,A.D,A.b0,A.e4,A.h7,A.d5,A.hi,A.y,A.a5,A.M,A.bo,A.ee,A.ed,A.hs,A.bm,A.ef,A.el,A.e3,A.en,A.a2,A.aq,A.i5,A.em])
q(J.cP,[J.cR,J.bU,J.bW,J.bV,J.bX,J.bp,J.b5])
q(J.bW,[J.aT,J.u,A.br,A.c4])
q(J.aT,[J.d4,J.bv,J.aS])
r(J.cQ,A.ca)
r(J.fX,J.u)
q(J.bp,[J.bT,J.cS])
q(A.C,[A.bZ,A.aG,A.cT,A.dc,A.d8,A.dg,A.bY,A.cC,A.az,A.ce,A.db,A.cc,A.cH])
q(A.a,[A.m,A.ar,A.d,A.bR,A.b9,A.cf,A.ch,A.aw])
q(A.m,[A.k,A.a7,A.a3,A.aE])
q(A.k,[A.z,A.Y,A.K,A.dj])
r(A.bN,A.ar)
r(A.bO,A.b9)
q(A.aI,[A.bw,A.bx])
r(A.bg,A.bw)
r(A.av,A.bx)
r(A.bz,A.bq)
r(A.cd,A.bz)
r(A.bL,A.cd)
r(A.bM,A.bK)
q(A.a6,[A.cO,A.cE,A.cF,A.da,A.iW,A.iY,A.ih,A.ig,A.iK,A.iv,A.h3,A.dv,A.dP,A.dx,A.dO,A.e2,A.dX,A.dY,A.dZ,A.e_,A.dV,A.dy,A.dz,A.dB,A.dF,A.dE,A.dG,A.dI,A.dK,A.dN,A.dM,A.dR,A.dT,A.eu,A.eV,A.eW,A.eX,A.fc,A.fd,A.fe,A.ff,A.eY,A.f_,A.f2,A.f5,A.f6,A.f9,A.eI,A.eA,A.eE,A.eG,A.eH,A.eN,A.eO,A.eS,A.eU,A.eL,A.eM,A.eK,A.eB,A.fR,A.fS,A.fQ,A.fT,A.fO,A.fN,A.fP,A.fM,A.fV,A.fU,A.fi,A.fk,A.fu,A.fv,A.fx,A.fz,A.fl,A.fB,A.fn,A.fp,A.fr,A.fI,A.fJ,A.fL,A.fC,A.fF,A.fG,A.fH,A.fD,A.du,A.e9,A.ea,A.e7,A.e6,A.e8,A.e5,A.h8,A.hd,A.hf,A.hg,A.he,A.hb,A.hc,A.ha,A.hj,A.hm,A.ho,A.hk,A.hl,A.iQ,A.j2,A.j3,A.hx,A.hy,A.hK,A.hw,A.ht,A.hu,A.hY,A.i1,A.i0,A.i_,A.hB,A.hC,A.hE,A.hH,A.hJ,A.hL,A.hM,A.hP,A.hR,A.hT,A.eg,A.ei,A.ek,A.j4,A.j5,A.er,A.es,A.eq,A.i8,A.i9,A.ia,A.ib,A.j_,A.j0])
r(A.b4,A.cO)
q(A.cE,[A.hp,A.ii,A.ij,A.iF,A.fW,A.il,A.ir,A.iq,A.io,A.im,A.iu,A.it,A.is,A.iD,A.iO,A.dw,A.e1,A.f3,A.h9,A.iR])
r(A.c6,A.aG)
q(A.da,[A.d9,A.bn])
q(A.F,[A.aD,A.di])
q(A.cF,[A.fY,A.iX,A.iL,A.iP,A.iw,A.h2,A.h5,A.iA,A.e0,A.dW,A.dA,A.dC,A.dD,A.dH,A.dJ,A.dL,A.dQ,A.dS,A.dU,A.ev,A.ex,A.ey,A.f7,A.fa,A.fb,A.fg,A.eZ,A.f0,A.f1,A.f4,A.f8,A.eJ,A.eF,A.eP,A.eQ,A.eR,A.eT,A.eC,A.eD,A.fj,A.ft,A.fw,A.fy,A.fA,A.fm,A.fo,A.fq,A.fs,A.fK,A.fE,A.dt,A.hh,A.hn,A.hz,A.hV,A.hv,A.hW,A.hX,A.hZ,A.hA,A.hD,A.hF,A.hG,A.hI,A.hN,A.hO,A.hQ,A.hS,A.hU,A.eh,A.ej,A.j6,A.i6,A.i7,A.ic])
q(A.c4,[A.cV,A.bs])
q(A.bs,[A.cj,A.cl])
r(A.ck,A.cj)
r(A.c2,A.ck)
r(A.cm,A.cl)
r(A.c3,A.cm)
q(A.c2,[A.cW,A.cX])
q(A.c3,[A.cY,A.cZ,A.d_,A.d0,A.d1,A.c5,A.d2])
r(A.by,A.dg)
r(A.dl,A.cu)
r(A.cn,A.bt)
r(A.at,A.cn)
r(A.cU,A.bY)
r(A.fZ,A.cG)
q(A.cI,[A.h0,A.h_])
r(A.iy,A.iz)
q(A.az,[A.c8,A.cN])
q(A.df,[A.b3,A.al,A.aB,A.ao])
s(A.cj,A.E)
s(A.ck,A.J)
s(A.cl,A.E)
s(A.cm,A.J)
s(A.bz,A.ct)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{b:"int",f:"double",ak:"num",H:"String",e:"bool",aa:"Null",t:"List",A:"Object",a8:"Map",N:"JSObject"},mangledNames:{},types:["e(n)","e(D)","b(n,n)","~()","b(D,D)","b(b,D)","e(b0)","b(b,n)","b(b,M)","e(a2)","b()","e(a5)","e(y)","~(~())","b(b)","e(f)","f(ak,f)","e(aq)","e(ad)","n(n,n)","@(@)","aa(@)","aa()","~(A?,A?)","f(n)","e(M)","n(a2)","0^(0^,0^)<ak>","e(b)","e(r,r)","f(f,n)","aa(A,aV)","aa(@,aV)","b(au,au)","+(r,f)(D)","f(f,D)","+(r,e)(n)","~(b,@)","aa(~())","~(@,@)","t<a5>(M)","f(f,a5)","@(H)","@(@,H)","~(@)","f(f,H)","f(ak,n)","t<n>()","e()","b(D)","b(b,b)","+breakthrough,lower,teamSize,upper(e,f,b,f)()","e(+(r,f))","e(+(r,e))","e(b1{civilian:e})","e(b1,t<y>,H,D{emergency:e,hero:n?})","e(D{defense!e})","f(f,f,b)","f(D)","f(f,r)","f(a2)","f(r,r)","b(a2,a2)","~(H)","~(N)","b(aq,aq)","n?(y)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.bg&&a.b(c.a)&&b.b(c.b),"4;breakthrough,lower,teamSize,upper":a=>b=>b instanceof A.av&&A.nh(a,b.a)}}
A.m2(v.typeUniverse,JSON.parse('{"aS":"aT","d4":"aT","bv":"aT","nt":"br","cR":{"e":[],"B":[]},"bU":{"B":[]},"bW":{"N":[]},"aT":{"N":[]},"u":{"t":["1"],"m":["1"],"N":[],"a":["1"]},"cQ":{"ca":[]},"fX":{"u":["1"],"t":["1"],"m":["1"],"N":[],"a":["1"]},"b2":{"G":["1"]},"bp":{"f":[],"ak":[]},"bT":{"f":[],"b":[],"ak":[],"B":[]},"cS":{"f":[],"ak":[],"B":[]},"b5":{"H":[],"B":[]},"bZ":{"C":[]},"m":{"a":["1"]},"k":{"m":["1"],"a":["1"]},"z":{"k":["1"],"m":["1"],"a":["1"],"a.E":"1","k.E":"1"},"q":{"G":["1"]},"ar":{"a":["2"],"a.E":"2"},"bN":{"ar":["1","2"],"m":["2"],"a":["2"],"a.E":"2"},"c1":{"G":["2"]},"Y":{"k":["2"],"m":["2"],"a":["2"],"a.E":"2","k.E":"2"},"d":{"a":["1"],"a.E":"1"},"T":{"G":["1"]},"bR":{"a":["2"],"a.E":"2"},"bS":{"G":["2"]},"b9":{"a":["1"],"a.E":"1"},"bO":{"b9":["1"],"m":["1"],"a":["1"],"a.E":"1"},"ba":{"G":["1"]},"bP":{"G":["1"]},"cf":{"a":["1"],"a.E":"1"},"cg":{"G":["1"]},"K":{"k":["1"],"m":["1"],"a":["1"],"a.E":"1","k.E":"1"},"bg":{"bw":[],"aI":[]},"av":{"bx":[],"aI":[]},"bL":{"cd":["1","2"],"bz":["1","2"],"bq":["1","2"],"ct":["1","2"],"a8":["1","2"]},"bK":{"a8":["1","2"]},"bM":{"bK":["1","2"],"a8":["1","2"]},"ch":{"a":["1"],"a.E":"1"},"ci":{"G":["1"]},"cO":{"a6":[],"aC":[]},"b4":{"a6":[],"aC":[]},"c6":{"aG":[],"C":[]},"cT":{"C":[]},"dc":{"C":[]},"co":{"aV":[]},"a6":{"aC":[]},"cE":{"a6":[],"aC":[]},"cF":{"a6":[],"aC":[]},"da":{"a6":[],"aC":[]},"d9":{"a6":[],"aC":[]},"bn":{"a6":[],"aC":[]},"d8":{"C":[]},"aD":{"F":["1","2"],"jS":["1","2"],"a8":["1","2"],"F.K":"1","F.V":"2"},"a7":{"m":["1"],"a":["1"],"a.E":"1"},"b6":{"G":["1"]},"a3":{"m":["1"],"a":["1"],"a.E":"1"},"ai":{"G":["1"]},"aE":{"m":["a9<1,2>"],"a":["a9<1,2>"],"a.E":"a9<1,2>"},"c_":{"G":["a9<1,2>"]},"bw":{"aI":[]},"bx":{"aI":[]},"br":{"N":[],"B":[]},"c4":{"N":[]},"cV":{"N":[],"B":[]},"bs":{"ah":["1"],"N":[]},"c2":{"E":["f"],"t":["f"],"ah":["f"],"m":["f"],"N":[],"a":["f"],"J":["f"]},"c3":{"E":["b"],"t":["b"],"ah":["b"],"m":["b"],"N":[],"a":["b"],"J":["b"]},"cW":{"E":["f"],"t":["f"],"ah":["f"],"m":["f"],"N":[],"a":["f"],"J":["f"],"B":[],"E.E":"f","J.E":"f"},"cX":{"E":["f"],"t":["f"],"ah":["f"],"m":["f"],"N":[],"a":["f"],"J":["f"],"B":[],"E.E":"f","J.E":"f"},"cY":{"E":["b"],"t":["b"],"ah":["b"],"m":["b"],"N":[],"a":["b"],"J":["b"],"B":[],"E.E":"b","J.E":"b"},"cZ":{"E":["b"],"t":["b"],"ah":["b"],"m":["b"],"N":[],"a":["b"],"J":["b"],"B":[],"E.E":"b","J.E":"b"},"d_":{"E":["b"],"t":["b"],"ah":["b"],"m":["b"],"N":[],"a":["b"],"J":["b"],"B":[],"E.E":"b","J.E":"b"},"d0":{"E":["b"],"t":["b"],"ah":["b"],"m":["b"],"N":[],"a":["b"],"J":["b"],"B":[],"E.E":"b","J.E":"b"},"d1":{"E":["b"],"t":["b"],"ah":["b"],"m":["b"],"N":[],"a":["b"],"J":["b"],"B":[],"E.E":"b","J.E":"b"},"c5":{"E":["b"],"t":["b"],"ah":["b"],"m":["b"],"N":[],"a":["b"],"J":["b"],"B":[],"E.E":"b","J.E":"b"},"d2":{"jm":[],"E":["b"],"t":["b"],"ah":["b"],"m":["b"],"N":[],"a":["b"],"J":["b"],"B":[],"E.E":"b","J.E":"b"},"dg":{"C":[]},"by":{"aG":[],"C":[]},"aJ":{"G":["1"]},"aw":{"a":["1"],"a.E":"1"},"ap":{"C":[]},"U":{"aQ":["1"]},"cu":{"k2":[]},"dl":{"cu":[],"k2":[]},"at":{"bt":["1"],"jU":["1"],"jk":["1"],"m":["1"],"a":["1"]},"be":{"G":["1"]},"F":{"a8":["1","2"]},"bq":{"a8":["1","2"]},"cd":{"bz":["1","2"],"bq":["1","2"],"ct":["1","2"],"a8":["1","2"]},"bt":{"jk":["1"],"m":["1"],"a":["1"]},"cn":{"bt":["1"],"jk":["1"],"m":["1"],"a":["1"]},"di":{"F":["H","@"],"a8":["H","@"],"F.K":"H","F.V":"@"},"dj":{"k":["H"],"m":["H"],"a":["H"],"a.E":"H","k.E":"H"},"bY":{"C":[]},"cU":{"C":[]},"f":{"ak":[]},"b":{"ak":[]},"t":{"m":["1"],"a":["1"]},"df":{"cK":[]},"cC":{"C":[]},"aG":{"C":[]},"az":{"C":[]},"c8":{"C":[]},"cN":{"C":[]},"ce":{"C":[]},"db":{"C":[]},"cc":{"C":[]},"cH":{"C":[]},"d3":{"C":[]},"cb":{"C":[]},"dn":{"aV":[]},"bu":{"lB":[]},"b3":{"cK":[]},"al":{"cK":[]},"aB":{"cK":[]},"ao":{"cK":[]},"ll":{"t":["b"],"m":["b"],"a":["b"]},"jm":{"t":["b"],"m":["b"],"a":["b"]},"lF":{"t":["b"],"m":["b"],"a":["b"]},"lj":{"t":["b"],"m":["b"],"a":["b"]},"lD":{"t":["b"],"m":["b"],"a":["b"]},"lk":{"t":["b"],"m":["b"],"a":["b"]},"lE":{"t":["b"],"m":["b"],"a":["b"]},"le":{"t":["f"],"m":["f"],"a":["f"]},"lf":{"t":["f"],"m":["f"],"a":["f"]}}'))
A.m1(v.typeUniverse,JSON.parse('{"m":1,"bs":1,"cn":1,"cG":2,"cI":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.bF
return{T:s("y"),q:s("D"),I:s("M"),t:s("b0"),a9:s("aB"),r:s("n"),c1:s("r"),bJ:s("bm"),J:s("a5"),u:s("ap"),a:s("aq"),cM:s("bJ"),x:s("ad"),Q:s("m<@>"),U:s("C"),bo:s("bR<M,a5>"),h:s("aC"),O:s("a2"),B:s("b4<f>"),E:s("a<D>"),ef:s("a<n>"),er:s("a<a5>(M)"),R:s("a<@>"),w:s("u<y>"),Y:s("u<D>"),Z:s("u<M>"),eu:s("u<b0>"),e:s("u<n>"),_:s("u<r>"),m:s("u<a5>"),bL:s("u<aq>"),D:s("u<a2>"),a5:s("u<t<r>>"),b:s("u<t<f>>"),d:s("u<a8<H,A?>>"),L:s("u<A>"),dZ:s("u<+(D,n)>"),s:s("u<H>"),bQ:s("u<au>"),n:s("u<f>"),V:s("u<@>"),v:s("bU"),p:s("N"),W:s("aS"),aU:s("ah<@>"),k:s("t<y>"),bd:s("t<n>"),j:s("t<@>"),d1:s("a8<H,@>"),f:s("a8<@,@>"),G:s("a8<H,A?>"),P:s("aa"),K:s("A"),gT:s("nu"),bY:s("+()"),fg:s("+(r,e)"),cJ:s("+(r,f)"),l:s("aV"),N:s("H"),aQ:s("z<au>"),dm:s("B"),eK:s("aG"),ak:s("bv"),eO:s("d<n>"),eq:s("d<f>"),gn:s("cf<n>"),c:s("U<@>"),dp:s("au"),dT:s("aw<ad>"),gL:s("aw<b>"),y:s("e"),aO:s("e(n)"),al:s("e(A)"),db:s("e(f)"),i:s("f"),z:s("@"),fO:s("@()"),A:s("@(A)"),C:s("@(A,aV)"),S:s("b"),eH:s("aQ<aa>?"),an:s("N?"),bM:s("t<@>?"),X:s("A?"),dk:s("H?"),F:s("bc<@,@>?"),g:s("dk?"),fQ:s("e?"),cD:s("f?"),h6:s("b?"),cg:s("ak?"),H:s("ak"),o:s("~"),M:s("~()"),cA:s("~(H,@)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.af=J.cP.prototype
B.a=J.u.prototype
B.c=J.bT.prototype
B.b=J.bp.prototype
B.o=J.b5.prototype
B.ag=J.aS.prototype
B.ah=J.bW.prototype
B.M=J.d4.prototype
B.C=J.bv.prototype
B.j=new A.ao(0,"upgrade")
B.t=new A.ao(1,"dismiss")
B.u=new A.ao(2,"recruit")
B.h=new A.ao(3,"soldiers")
B.D=new A.ao(4,"dispatch")
B.N=new A.ao(5,"move")
B.O=new A.ao(6,"camp")
B.P=new A.ao(7,"retreat")
B.e=new A.al(0,"garrison")
B.n=new A.al(2,"camped")
B.v=new A.al(3,"queue")
B.w=new A.al(4,"attacking")
B.d=new A.al(5,"defending")
B.x=new A.al(7,"retreating")
B.E=new A.aB(0,"full")
B.F=new A.aB(1,"resources")
B.y=new A.aB(2,"defense")
B.p=new A.aB(3,"attack")
B.L=s([],t._)
B.q=new A.bm(B.L,1/0,!1)
B.S=new A.bm(B.L,1/0,!1)
B.T=new A.cA(4,24,6,1.5,10,12,0.65,5,0.5,0.25,45,15,0.8,45,25,90,-0.15,10,3,1,96,160,6000,8,24,4,6,8,2,0,1,0.3,20,900,64,0.25,8,0.12,0.05,2500,2,20)
B.z=new A.b4(A.nf(),t.B)
B.A=new A.b4(A.ng(),t.B)
B.G=new A.cJ()
B.U=new A.bP(A.bF("bP<0&>"))
B.H=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.V=function() {
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
B.a_=function(getTagFallback) {
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
B.W=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.Z=function(hooks) {
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
B.Y=function(hooks) {
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
B.X=function(hooks) {
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
B.I=function(hooks) { return hooks; }

B.k=new A.fZ()
B.a0=new A.d3()
B.m=new A.i2()
B.l=new A.dl()
B.a1=new A.dn()
B.f=new A.b3(0,"favorable")
B.a2=new A.b3(1,"close")
B.r=new A.b3(2,"unfavorable")
B.B=new A.b3(3,"unknown")
B.ax=s(["\u9759\u6001\u8bc4\u4f30\u914d\u989d\u8017\u5c3d"],t.s)
B.a3=new A.bJ(B.B,-1,1)
B.a4=new A.ae("AI \u521d\u59cb\u5316\u7f3a\u5c11 gameConfig")
B.a5=new A.ae("game_config.json5 \u7684\u57ce\u6c60\u6570\u7ec4\u957f\u5ea6\u4e0d\u6b63\u786e")
B.a6=new A.ae("\u6700\u9ad8\u57ce\u6c60\u7b49\u7ea7\u5fc5\u987b\u4e0e\u57ce\u9632\u52a0\u6210\u6570\u7ec4\u957f\u5ea6\u4e00\u81f4")
B.a7=new A.ae("AI \u534f\u8bae\u7248\u672c\u4e0d\u5339\u914d")
B.a8=new A.ae("game_config.json5 \u5305\u542b\u975e\u6cd5\u7684\u65f6\u95f4\u6216\u57ce\u6c60\u7b49\u7ea7")
B.a9=new A.ae("AI \u6784\u5efa\u7248\u672c\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u751f\u6210 Worker")
B.aa=new A.ae("\u6b20\u6536\u91d1\u5e01\u8303\u56f4\u5fc5\u987b\u4e3a\u975e\u8d1f\u6574\u6570\u4e14\u4e0a\u9650\u4e0d\u5c0f\u4e8e\u4e0b\u9650")
B.ab=new A.ae("\u672a\u77e5 AI \u5de5\u4f5c\u547d\u4ee4")
B.ac=new A.ae("AI \u5730\u56fe\u5c3a\u5bf8\u65e0\u6548")
B.ad=new A.ae("\u56fd\u5bb6\u89c4\u5212\u9759\u6001\u7248\u672c\u4e0d\u5339\u914d")
B.ae=new A.ae("\u56fd\u5bb6\u89c2\u5bdf\u8d85\u51fa\u534f\u8bae\u5bb9\u91cf")
B.ai=new A.h_(null)
B.aj=new A.h0(null)
B.Q=new A.al(1,"marching")
B.R=new A.al(6,"field")
B.J=s([B.e,B.Q,B.n,B.v,B.w,B.d,B.R,B.x],A.bF("u<al>"))
B.ak=s([B.E,B.F,B.y,B.p],A.bF("u<aB>"))
B.K=s([],t.Z)
B.i=s([],t.m)
B.al=A.ax("no")
B.am=A.ax("np")
B.an=A.ax("le")
B.ao=A.ax("lf")
B.ap=A.ax("lj")
B.aq=A.ax("lk")
B.ar=A.ax("ll")
B.as=A.ax("A")
B.at=A.ax("lD")
B.au=A.ax("lE")
B.av=A.ax("lF")
B.aw=A.ax("jm")})();(function staticFields(){$.ix=null
$.aj=A.c([],t.L)
$.jV=null
$.hq=0
$.hr=A.mA()
$.jM=null
$.jL=null
$.kt=null
$.ko=null
$.kB=null
$.iU=null
$.iZ=null
$.jz=null
$.iC=A.c([],A.bF("u<t<A>?>"))
$.bC=null
$.cw=null
$.cx=null
$.js=!1
$.O=B.l})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"nr","kE",()=>A.iV("_$dart_dartClosure"))
s($,"nq","jC",()=>A.iV("_$dart_dartClosure_dartJSInterop"))
s($,"nJ","kP",()=>A.c([new J.cQ()],A.bF("u<ca>")))
s($,"nx","kF",()=>A.aH(A.ie({
toString:function(){return"$receiver$"}})))
s($,"ny","kG",()=>A.aH(A.ie({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"nz","kH",()=>A.aH(A.ie(null)))
s($,"nA","kI",()=>A.aH(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"nD","kL",()=>A.aH(A.ie(void 0)))
s($,"nE","kM",()=>A.aH(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"nC","kK",()=>A.aH(A.k0(null)))
s($,"nB","kJ",()=>A.aH(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"nG","kO",()=>A.aH(A.k0(void 0)))
s($,"nF","kN",()=>A.aH(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"nH","jE",()=>A.lG())
s($,"nI","ds",()=>A.ky(B.as))
s($,"nv","jD",()=>{A.lw()
return $.hq})
s($,"ns","j7",()=>{var q=A.bF("u<b>")
return A.P(["initialYear",1,"initialMonth",1,"secondsPerMonth",60,"initialGold",50,"countryAiEnabled",!0,"countryAiInitialDelay",0,"countryAiInterval",5,"countryAiMinimumSoldiers",4,"heroOfferValidMonths",2,"aiDepartureInterval",2,"countryAiEmergencyGold",5,"countryAiBudgetSafetySeconds",30,"countryAiBattleBudgetSeconds",30,"countryAiTargetTravelScale",30,"countryAiTargetDistancePower",2,"countryAiStrengthScale",80,"countryAiWeaknessPower",2,"countryHatredPerAttack",20,"countryHatredMaximum",100,"countryHatredWeightPerPoint",0.02,"normalHarvestWeight",2,"poorHarvestWeight",1,"abundantHarvestWeight",1,"cityBaseIncome",10,"cityIncomePerLevel",0,"countryMonthlyIncome",10,"foreignCityYieldFactor",1,"retreatBaseSuccessChance",0.9,"retreatConditionPenalty",0.1,"retreatExitSeconds",1.2,"retreatResultSeconds",0.6,"aiRetreatMinimumClashes",2,"aiRetreatSurvivalRatio",0.6,"aiRetreatHealthRatio",0.25,"aiThreatDistance",320,"aiMaximumRaidHeroes",4,"aiTargetShortlist",3,"aiTravelCacheSize",256,"aiRaidRetrySeconds",15,"harvestAdjustmentMin",5,"harvestAdjustmentMax",10,"poorHarvestAdjustmentMin",10,"poorHarvestAdjustmentMax",20,"chargeHeroSalary",!0,"freeGarrisonHeroes",2,"garrisonUpkeepFactor",0,"maxCityLevel",5,"firstYearCityUpgradeLimit",3,"cityUpgradeLevelsPerYear",1,"cityUpgradeCosts",A.c([30,40,50,60],q),"cityReserveCapacityPerLevel",4,"initialSoldiersPerHero",4,"soldierRecruitCost",1,"soldierRecruitBatchSize",10,"heroSoldierLimit",4,"initialHeroSoldiers",0,"recruitedHeroSoldiers",0,"heroDrawCost",5,"recycleDefeatedHeroes",!0,"cityDefenseAttackBonuses",A.c([1,3,5,8,10],q),"cityDefenseMoraleBonuses",A.c([5,10,15,20,25],q),"battleRecoilDifferenceScale",0.25,"cityDefenseRecoilScale",0,"battleMoralePowerScale",6,"battleUseMorale",!0,"battleMoraleDrainPerSecond",12,"battleMoraleDrainRandomRange",4,"battleWallDamageScale",0.5,"fieldEncounterDistance",16,"mountainHeroAttackFactor",1,"riverHeroAttackFactor",1,"grassHeroAttackFactor",1,"fieldBattleHistoryLimit",16,"baseMarchSpeed",22,"heroWalkFrameSeconds",0.2,"grassSpeedFactor",0.75,"mountainSpeedFactor",0.2,"waterSpeedFactor",0.4,"battleFormationFrames",163,"cityDamageChancePerVictory",1,"nationalAi",B.T.H()],t.N,t.X)})
r($,"lh","nn",()=>A.cM($.j7()))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.br,SharedArrayBuffer:A.br,ArrayBufferView:A.c4,DataView:A.cV,Float32Array:A.cW,Float64Array:A.cX,Int16Array:A.cY,Int32Array:A.cZ,Int8Array:A.d_,Uint16Array:A.d0,Uint32Array:A.d1,Uint8ClampedArray:A.c5,CanvasPixelArray:A.c5,Uint8Array:A.d2})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bs.$nativeSuperclassTag="ArrayBufferView"
A.cj.$nativeSuperclassTag="ArrayBufferView"
A.ck.$nativeSuperclassTag="ArrayBufferView"
A.c2.$nativeSuperclassTag="ArrayBufferView"
A.cl.$nativeSuperclassTag="ArrayBufferView"
A.cm.$nativeSuperclassTag="ArrayBufferView"
A.c3.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$0=function(){return this()}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$1=function(a){return this(a)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.nd
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()