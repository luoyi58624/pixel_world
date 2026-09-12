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
if(a[b]!==s){A.nt(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.d(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.jH(b)
return new s(c,this)}:function(){if(s===null)s=A.jH(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.jH(a).prototype
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
jM(a,b,c,d){return{i:a,p:b,e:c,x:d}},
jI(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.jK==null){A.nh()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.j(A.kc("Return interceptor for "+A.w(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.iK
if(o==null)o=$.iK=A.j7(n)
p=q[o]}if(p!=null)return p
p=A.nm(a)
if(p!=null)return p
if(typeof a=="function")return B.ac
s=Object.getPrototypeOf(a)
if(s==null)return B.O
if(s===Object.prototype)return B.O
if(typeof q=="function"){o=$.iK
if(o==null)o=$.iK=A.j7(n)
Object.defineProperty(q,o,{value:B.C,enumerable:false,writable:true,configurable:true})
return B.C}return B.C},
ly(a,b){if(a<0||a>4294967295)throw A.j(A.b8(a,0,4294967295,"length",null))
return J.lz(new Array(a),b)},
k_(a,b){if(a<0)throw A.j(A.cC("Length must be a non-negative integer: "+a,null))
return A.d(new Array(a),b.h("u<0>"))},
lz(a,b){var s=A.d(a,b.h("u<0>"))
s.$flags=1
return s},
bj(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bT.prototype
return J.cS.prototype}if(typeof a=="string")return J.b4.prototype
if(a==null)return J.bU.prototype
if(typeof a=="boolean")return J.cR.prototype
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aS.prototype
if(typeof a=="symbol")return J.bX.prototype
if(typeof a=="bigint")return J.bV.prototype
return a}if(a instanceof A.z)return a
return J.jI(a)},
cy(a){if(typeof a=="string")return J.b4.prototype
if(a==null)return a
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aS.prototype
if(typeof a=="symbol")return J.bX.prototype
if(typeof a=="bigint")return J.bV.prototype
return a}if(a instanceof A.z)return a
return J.jI(a)},
aX(a){if(a==null)return a
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aS.prototype
if(typeof a=="symbol")return J.bX.prototype
if(typeof a=="bigint")return J.bV.prototype
return a}if(a instanceof A.z)return a
return J.jI(a)},
nc(a){if(typeof a=="number")return J.br.prototype
if(typeof a=="string")return J.b4.prototype
if(a==null)return a
if(!(a instanceof A.z))return J.by.prototype
return a},
ay(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bj(a).ab(a,b)},
aZ(a,b){if(typeof b==="number")if(Array.isArray(a)||A.nl(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.aX(a).i(a,b)},
l2(a,b){return J.aX(a).m(a,b)},
l3(a,b){return J.aX(a).D(a,b)},
l4(a,b){return J.nc(a).t(a,b)},
jl(a,b){return J.aX(a).T(a,b)},
jQ(a){return J.aX(a).gH(a)},
ae(a){return J.bj(a).gR(a)},
jm(a){return J.cy(a).ga4(a)},
l5(a){return J.cy(a).gaz(a)},
J(a){return J.aX(a).gC(a)},
l6(a){return J.aX(a).gaA(a)},
bm(a){return J.cy(a).gl(a)},
l7(a){return J.bj(a).gS(a)},
l8(a,b){return J.aX(a).b2(a,b)},
l9(a,b){return J.aX(a).cg(a,b)},
bn(a){return J.bj(a).q(a)},
cP:function cP(){},
cR:function cR(){},
bU:function bU(){},
bW:function bW(){},
aT:function aT(){},
d4:function d4(){},
by:function by(){},
aS:function aS(){},
bV:function bV(){},
bX:function bX(){},
u:function u(a){this.$ti=a},
cQ:function cQ(){},
h3:function h3(a){this.$ti=a},
b1:function b1(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
br:function br(){},
bT:function bT(){},
cS:function cS(){},
b4:function b4(){}},A={jq:function jq(){},
lA(a){return new A.bZ("Field '"+a+"' has not been initialized.")},
aI(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
ii(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
X(a,b,c){return a},
jL(a){var s,r
for(s=$.ah.length,r=0;r<s;++r)if(a===$.ah[r])return!0
return!1},
Z(a,b,c,d){A.c8(b,"start")
if(c!=null){A.c8(c,"end")
if(b>c)A.cz(A.b8(b,0,c,"start",null))}return new A.y(a,b,c,d.h("y<0>"))},
lD(a,b,c,d){if(t.U.b(a))return new A.bN(a,b,c.h("@<0>").K(d).h("bN<1,2>"))
return new A.ar(a,b,c.h("@<0>").K(d).h("ar<1,2>"))},
ka(a,b,c){A.c8(b,"takeCount")
if(t.U.b(a))return new A.bO(a,b,c.h("bO<0>"))
return new A.b9(a,b,c.h("b9<0>"))},
aA(){return new A.cb("No element")},
bZ:function bZ(a){this.a=a},
ig:function ig(){},
n:function n(){},
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
ar:function ar(a,b,c){this.a=a
this.b=b
this.$ti=c},
bN:function bN(a,b,c){this.a=a
this.b=b
this.$ti=c},
c0:function c0(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
a0:function a0(a,b,c){this.a=a
this.b=b
this.$ti=c},
c:function c(a,b,c){this.a=a
this.b=b
this.$ti=c},
V:function V(a,b,c){this.a=a
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
ce:function ce(a,b){this.a=a
this.$ti=b},
cf:function cf(a,b){this.a=a
this.$ti=b},
K:function K(){},
L:function L(a,b){this.a=a
this.$ti=b},
eE(a,b,c){var s,r,q,p,o,n,m,l=A.l(a),k=A.bs(new A.a7(a,l.h("a7<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.v)(k),++i,p=o){r=k[i]
c.a(a.i(0,r))
o=p+1
q[r]=p}n=A.bs(new A.Y(a,l.h("Y<2>")),!0,c)
m=new A.bM(q,n,b.h("@<0>").K(c).h("bM<1,2>"))
m.$keys=k
return m}return new A.bL(A.aq(a,b,c),b.h("@<0>").K(c).h("bL<1,2>"))},
kQ(a){var s=A.kP(a)
if(s!=null)return s
return"minified:"+a},
nl(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
w(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.bn(a)
return s},
d6(a){var s,r=$.k5
if(r==null)r=$.k5=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
lI(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.m(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
d7(a){var s,r,q,p
if(a instanceof A.z)return A.ab(A.aO(a),null)
s=J.bj(a)
if(s===B.ab||s===B.ad||t.ak.b(a)){r=B.I(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.ab(A.aO(a),null)},
k6(a){var s,r,q
if(a==null||typeof a=="number"||A.jC(a))return J.bn(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a6)return a.q(0)
if(a instanceof A.aC)return a.bP(!0)
s=$.l1()
for(r=0;r<1;++r){q=s[r].dG(a)
if(q!=null)return q}return"Instance of '"+A.d7(a)+"'"},
lF(){return Date.now()},
lH(){var s,r
if($.hD!==0)return
$.hD=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
if(!!s.dartUseDateNowForTicks)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.hD=1e6
$.hE=new A.hC(r)},
a1(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.bL(s,10)|55296)>>>0,s&1023|56320)}throw A.j(A.b8(a,0,1114111,null,null))},
lG(a){var s=a.$thrownJsError
if(s==null)return null
return A.bH(s)},
m(a,b){if(a==null)J.bm(a)
throw A.j(A.kE(a,b))},
kE(a,b){var s,r="index"
if(!A.ku(b))return new A.az(!0,b,r,null)
s=J.bm(a)
if(b<0||b>=s)return A.jo(b,s,a,r)
return new A.c7(null,null,!0,b,r,"Value not in range")},
n1(a){return new A.az(!0,a,null,null)},
j4(a){return a},
j(a){return A.T(a,new Error())},
T(a,b){var s
if(a==null)a=new A.aJ()
b.dartException=a
s=A.nu
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
nu(){return J.bn(this.dartException)},
cz(a,b){throw A.T(a,b==null?new Error():b)},
cA(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.cz(A.mq(a,b,c),s)},
mq(a,b,c){var s,r,q,p,o,n,m,l,k
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
v(a){throw A.j(A.a_(a))},
aK(a){var s,r,q,p,o,n
a=A.nr(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.d([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.is(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
it(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
kb(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
jr(a,b){var s=b==null,r=s?null:b.method
return new A.cT(a,r,s?null:b.receiver)},
aP(a){var s
if(a==null)return new A.he(a)
if(a instanceof A.bQ){s=a.a
return A.aY(a,s==null?A.cu(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.aY(a,a.dartException)
return A.n_(a)},
aY(a,b){if(t.V.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
n_(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bL(r,16)&8191)===10)switch(q){case 438:return A.aY(a,A.jr(A.w(s)+" (Error "+q+")",null))
case 445:case 5007:A.w(s)
return A.aY(a,new A.c5())}}if(a instanceof TypeError){p=$.kS()
o=$.kT()
n=$.kU()
m=$.kV()
l=$.kY()
k=$.kZ()
j=$.kX()
$.kW()
i=$.l0()
h=$.l_()
g=p.aa(s)
if(g!=null)return A.aY(a,A.jr(A.I(s),g))
else{g=o.aa(s)
if(g!=null){g.method="call"
return A.aY(a,A.jr(A.I(s),g))}else if(n.aa(s)!=null||m.aa(s)!=null||l.aa(s)!=null||k.aa(s)!=null||j.aa(s)!=null||m.aa(s)!=null||i.aa(s)!=null||h.aa(s)!=null){A.I(s)
return A.aY(a,new A.c5())}}return A.aY(a,new A.dc(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.ca()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.aY(a,new A.az(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.ca()
return a},
bH(a){var s
if(a instanceof A.bQ)return a.b
if(a==null)return new A.cm(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.cm(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
kL(a){if(a==null)return J.ae(a)
if(typeof a=="object")return A.d6(a)
return J.ae(a)},
na(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.v(0,a[s],a[r])}return b},
nb(a,b){var s,r=a.length
for(s=0;s<r;++s)b.m(0,a[s])
return b},
mz(a,b,c,d,e,f){t.h.a(a)
switch(A.f(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.j(new A.iy("Unsupported number of arguments for wrapped closure"))},
dq(a,b){var s=a.$identity
if(!!s)return s
s=A.n6(a,b)
a.$identity=s
return s},
n6(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.mz)},
ln(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.d9().constructor.prototype):Object.create(new A.bp(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.jY(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.lj(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.jY(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
lj(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.j("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.lh)}throw A.j("Error in functionType of tearoff")},
lk(a,b,c,d){var s=A.jX
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
jY(a,b,c,d){if(c)return A.lm(a,b,d)
return A.lk(b.length,d,a,b)},
ll(a,b,c,d){var s=A.jX,r=A.li
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
lm(a,b,c){var s,r
if($.jV==null)$.jV=A.jU("interceptor")
if($.jW==null)$.jW=A.jU("receiver")
s=b.length
r=A.ll(s,c,a,b)
return r},
jH(a){return A.ln(a)},
lh(a,b){return A.cq(v.typeUniverse,A.aO(a.a),b)},
jX(a){return a.a},
li(a){return a.b},
jU(a){var s,r,q,p=new A.bp("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.j(A.cC("Field name "+a+" not found.",null))},
j7(a){return v.getIsolateTag(a)},
nm(a){var s,r,q,p,o,n=A.I($.kF.$1(a)),m=$.j6[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jc[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bD($.kA.$2(a,n))
if(q!=null){m=$.j6[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jc[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.jf(s)
$.j6[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.jc[n]=s
return s}if(p==="-"){o=A.jf(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.kN(a,s)
if(p==="*")throw A.j(A.kc(n))
if(v.leafTags[n]===true){o=A.jf(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.kN(a,s)},
kN(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.jM(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
jf(a){return J.jM(a,!1,null,!!a.$iaf)},
no(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.jf(s)
else return J.jM(s,c,null,null)},
nh(){if(!0===$.jK)return
$.jK=!0
A.ni()},
ni(){var s,r,q,p,o,n,m,l
$.j6=Object.create(null)
$.jc=Object.create(null)
A.ng()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.kO.$1(o)
if(n!=null){m=A.no(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
ng(){var s,r,q,p,o,n,m=B.W()
m=A.bG(B.X,A.bG(B.Y,A.bG(B.J,A.bG(B.J,A.bG(B.Z,A.bG(B.a_,A.bG(B.a0(B.I),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.kF=new A.j9(p)
$.kA=new A.ja(o)
$.kO=new A.jb(n)},
bG(a,b){return a(b)||b},
m4(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.m(b,s)
if(!J.ay(r,b[s]))return!1}return!0},
n8(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
nr(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bi:function bi(a,b){this.a=a
this.b=b},
aL:function aL(a){this.a=a},
bA:function bA(a){this.a=a},
bL:function bL(a,b){this.a=a
this.$ti=b},
bK:function bK(){},
bM:function bM(a,b,c){this.a=a
this.b=b
this.$ti=c},
be:function be(a,b){this.a=a
this.$ti=b},
cg:function cg(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cO:function cO(){},
b3:function b3(a,b){this.a=a
this.$ti=b},
hC:function hC(a){this.a=a},
c9:function c9(){},
is:function is(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
c5:function c5(){},
cT:function cT(a,b,c){this.a=a
this.b=b
this.c=c},
dc:function dc(a){this.a=a},
he:function he(a){this.a=a},
bQ:function bQ(a,b){this.a=a
this.b=b},
cm:function cm(a){this.a=a
this.b=null},
a6:function a6(){},
cF:function cF(){},
cG:function cG(){},
da:function da(){},
d9:function d9(){},
bp:function bp(a,b){this.a=a
this.b=b},
d8:function d8(a){this.a=a},
aG:function aG(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
h4:function h4(a){this.a=a},
h8:function h8(a,b){var _=this
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
Y:function Y(a,b){this.a=a
this.$ti=b},
ag:function ag(a,b,c,d){var _=this
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
j9:function j9(a){this.a=a},
ja:function ja(a){this.a=a},
jb:function jb(a){this.a=a},
aC:function aC(){},
bz:function bz(){},
bh:function bh(){},
mr(a){return a},
bu:function bu(){},
c3:function c3(){},
cV:function cV(){},
bv:function bv(){},
c1:function c1(){},
c2:function c2(){},
cW:function cW(){},
cX:function cX(){},
cY:function cY(){},
cZ:function cZ(){},
d_:function d_(){},
d0:function d0(){},
d1:function d1(){},
c4:function c4(){},
d2:function d2(){},
ch:function ch(){},
ci:function ci(){},
cj:function cj(){},
ck:function ck(){},
ju(a,b){var s=b.c
return s==null?b.c=A.co(a,"aR",[b.x]):s},
k7(a){var s=a.w
if(s===6||s===7)return A.k7(a.x)
return s===11||s===12},
lK(a){return a.as},
kM(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
cx(a){return A.iU(v.typeUniverse,a,!1)},
nk(a,b){var s,r,q,p,o
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
return A.kl(a1,r,!0)
case 7:s=a2.x
r=A.aW(a1,s,a3,a4)
if(r===s)return a2
return A.kk(a1,r,!0)
case 8:q=a2.y
p=A.bF(a1,q,a3,a4)
if(p===q)return a2
return A.co(a1,a2.x,p)
case 9:o=a2.x
n=A.aW(a1,o,a3,a4)
m=a2.y
l=A.bF(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.jz(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bF(a1,j,a3,a4)
if(i===j)return a2
return A.km(a1,k,i)
case 11:h=a2.x
g=A.aW(a1,h,a3,a4)
f=a2.y
e=A.mX(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.kj(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bF(a1,d,a3,a4)
o=a2.x
n=A.aW(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jA(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.j(A.cE("Attempted to substitute unexpected RTI kind "+a0))}},
bF(a,b,c,d){var s,r,q,p,o=b.length,n=A.iV(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.aW(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
mY(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.iV(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.aW(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
mX(a,b,c,d){var s,r=b.a,q=A.bF(a,r,c,d),p=b.b,o=A.bF(a,p,c,d),n=b.c,m=A.mY(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dh()
s.a=q
s.b=o
s.c=m
return s},
d(a,b){a[v.arrayRti]=b
return a},
j5(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.ne(s)
return a.$S()}return null},
nj(a,b){var s
if(A.k7(b))if(a instanceof A.a6){s=A.j5(a)
if(s!=null)return s}return A.aO(a)},
aO(a){if(a instanceof A.z)return A.l(a)
if(Array.isArray(a))return A.i(a)
return A.jB(J.bj(a))},
i(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
l(a){var s=a.$ti
return s!=null?s:A.jB(a)},
jB(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.my(a,s)},
my(a,b){var s=a instanceof A.a6?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.me(v.typeUniverse,s.name)
b.$ccache=r
return r},
ne(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.iU(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
nd(a){return A.aN(A.l(a))},
jJ(a){var s=A.j5(a)
return A.aN(s==null?A.aO(a):s)},
jF(a){var s
if(a instanceof A.aC)return A.n9(a.$r,a.bd())
s=a instanceof A.a6?A.j5(a):null
if(s!=null)return s
if(t.dm.b(a))return J.l7(a).a
if(Array.isArray(a))return A.i(a)
return A.aO(a)},
aN(a){var s=a.r
return s==null?a.r=new A.iT(a):s},
n9(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bY
if(0>=p)return A.m(q,0)
s=A.cq(v.typeUniverse,A.jF(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.m(q,r)
s=A.ko(v.typeUniverse,s,A.jF(q[r]))}return A.cq(v.typeUniverse,s,a)},
ax(a){return A.aN(A.iU(v.typeUniverse,a,!1))},
mx(a){var s=this
s.b=A.mV(s)
return s.b(a)},
mV(a){var s,r,q,p,o
if(a===t.K)return A.mF
if(A.bk(a))return A.mJ
s=a.w
if(s===6)return A.mv
if(s===1)return A.kw
if(s===7)return A.mA
r=A.mU(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bk)){a.f="$i"+q
if(q==="q")return A.mD
if(a===t.B)return A.mC
return A.mI}}else if(s===10){p=A.n8(a.x,a.y)
o=p==null?A.kw:p
return o==null?A.cu(o):o}return A.mt},
mU(a){if(a.w===8){if(a===t.S)return A.ku
if(a===t.i||a===t.H)return A.mE
if(a===t.N)return A.mH
if(a===t.y)return A.jC}return null},
mw(a){var s=this,r=A.ms
if(A.bk(s))r=A.mi
else if(s===t.K)r=A.cu
else if(A.bI(s)){r=A.mu
if(s===t.h6)r=A.a2
else if(s===t.dk)r=A.bD
else if(s===t.fQ)r=A.ct
else if(s===t.cg)r=A.R
else if(s===t.cD)r=A.mg
else if(s===t.an)r=A.mh}else if(s===t.S)r=A.f
else if(s===t.N)r=A.I
else if(s===t.y)r=A.aw
else if(s===t.H)r=A.x
else if(s===t.i)r=A.am
else if(s===t.B)r=A.iW
s.a=r
return s.a(a)},
mt(a){var s=this
if(a==null)return A.bI(s)
return A.kI(v.typeUniverse,A.nj(a,s),s)},
mv(a){if(a==null)return!0
return this.x.b(a)},
mI(a){var s,r=this
if(a==null)return A.bI(r)
s=r.f
if(a instanceof A.z)return!!a[s]
return!!J.bj(a)[s]},
mD(a){var s,r=this
if(a==null)return A.bI(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.z)return!!a[s]
return!!J.bj(a)[s]},
mC(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.z)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
kv(a){if(typeof a=="object"){if(a instanceof A.z)return t.B.b(a)
return!0}if(typeof a=="function")return!0
return!1},
ms(a){var s=this
if(a==null){if(A.bI(s))return a}else if(s.b(a))return a
throw A.T(A.kr(a,s),new Error())},
mu(a){var s=this
if(a==null||s.b(a))return a
throw A.T(A.kr(a,s),new Error())},
kr(a,b){return new A.bB("TypeError: "+A.ke(a,A.ab(b,null)))},
kD(a,b,c,d){if(A.kI(v.typeUniverse,a,b))return a
throw A.T(A.m6("The type argument '"+A.ab(a,null)+"' is not a subtype of the type variable bound '"+A.ab(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
ke(a,b){return A.cM(a)+": type '"+A.ab(A.jF(a),null)+"' is not a subtype of type '"+b+"'"},
m6(a){return new A.bB("TypeError: "+a)},
al(a,b){return new A.bB("TypeError: "+A.ke(a,b))},
mA(a){var s=this
return s.x.b(a)||A.ju(v.typeUniverse,s).b(a)},
mF(a){return a!=null},
cu(a){if(a!=null)return a
throw A.T(A.al(a,"Object"),new Error())},
mJ(a){return!0},
mi(a){return a},
kw(a){return!1},
jC(a){return!0===a||!1===a},
aw(a){if(!0===a)return!0
if(!1===a)return!1
throw A.T(A.al(a,"bool"),new Error())},
ct(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.T(A.al(a,"bool?"),new Error())},
am(a){if(typeof a=="number")return a
throw A.T(A.al(a,"double"),new Error())},
mg(a){if(typeof a=="number")return a
if(a==null)return a
throw A.T(A.al(a,"double?"),new Error())},
ku(a){return typeof a=="number"&&Math.floor(a)===a},
f(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.T(A.al(a,"int"),new Error())},
a2(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.T(A.al(a,"int?"),new Error())},
mE(a){return typeof a=="number"},
x(a){if(typeof a=="number")return a
throw A.T(A.al(a,"num"),new Error())},
R(a){if(typeof a=="number")return a
if(a==null)return a
throw A.T(A.al(a,"num?"),new Error())},
mH(a){return typeof a=="string"},
I(a){if(typeof a=="string")return a
throw A.T(A.al(a,"String"),new Error())},
bD(a){if(typeof a=="string")return a
if(a==null)return a
throw A.T(A.al(a,"String?"),new Error())},
iW(a){if(A.kv(a))return a
throw A.T(A.al(a,"JSObject"),new Error())},
mh(a){if(a==null)return a
if(A.kv(a))return a
throw A.T(A.al(a,"JSObject?"),new Error())},
ky(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.ab(a[q],b)
return s},
mP(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.ky(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.ab(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
ks(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.d([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.m(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.m(a4,l)
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
if(l===8){p=A.mZ(a.x)
o=a.y
return o.length>0?p+("<"+A.ky(o,b)+">"):p}if(l===10)return A.mP(a,b)
if(l===11)return A.ks(a,b,null)
if(l===12)return A.ks(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.m(b,n)
return b[n]}return"?"},
mZ(a){var s=A.kP(a)
if(s!=null)return s
return"minified:"+a},
mf(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
me(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.iU(a,b,!1)
else if(typeof m=="number"){s=m
r=A.cp(a,5,"#")
q=A.iV(s)
for(p=0;p<s;++p)q[p]=r
o=A.co(a,b,q)
n[b]=o
return o}else return m},
md(a,b){return A.kp(a.tR,b)},
mc(a,b){return A.kp(a.eT,b)},
iU(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.kn(a,null,b,!1)
r.set(b,s)
return s},
cq(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.kn(a,b,c,!0)
q.set(c,r)
return r},
ko(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.jz(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
kn(a,b,c,d){return A.m2(A.lX(a,b,c,d))},
aV(a,b){b.a=A.mw
b.b=A.mx
return b},
cp(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.as(null,null)
s.w=b
s.as=c
r=A.aV(a,s)
a.eC.set(c,r)
return r},
kl(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.ma(a,b,r,c)
a.eC.set(r,s)
return s},
ma(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bk(b))if(!(b===t.P||b===t.v))if(s!==6)r=s===7&&A.bI(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.as(null,null)
q.w=6
q.x=b
q.as=c
return A.aV(a,q)},
kk(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.m8(a,b,r,c)
a.eC.set(r,s)
return s},
m8(a,b,c,d){var s,r
if(d){s=b.w
if(A.bk(b)||b===t.K)return b
else if(s===1)return A.co(a,"aR",[b])
else if(b===t.P||b===t.v)return t.eH}r=new A.as(null,null)
r.w=7
r.x=b
r.as=c
return A.aV(a,r)},
mb(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.as(null,null)
s.w=13
s.x=b
s.as=q
r=A.aV(a,s)
a.eC.set(q,r)
return r},
cn(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
m7(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
co(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.cn(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.as(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.aV(a,r)
a.eC.set(p,q)
return q},
jz(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.cn(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.as(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.aV(a,o)
a.eC.set(q,n)
return n},
km(a,b,c){var s,r,q="+"+(b+"("+A.cn(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.as(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.aV(a,s)
a.eC.set(q,r)
return r},
kj(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.cn(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.cn(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.m7(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.as(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.aV(a,p)
a.eC.set(r,o)
return o},
jA(a,b,c,d){var s,r=b.as+("<"+A.cn(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.m9(a,b,c,r,d)
a.eC.set(r,s)
return s},
m9(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.iV(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.aW(a,b,r,0)
m=A.bF(a,c,r,0)
return A.jA(a,n,m,c!==m)}}l=new A.as(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.aV(a,l)},
lX(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
m2(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.lZ(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.kg(a,r,l,k,!1)
else if(q===46)r=A.kg(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bg(a.u,a.e,k.pop()))
break
case 94:k.push(A.mb(a.u,k.pop()))
break
case 35:k.push(A.cp(a.u,5,"#"))
break
case 64:k.push(A.cp(a.u,2,"@"))
break
case 126:k.push(A.cp(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.m0(a,k)
break
case 38:A.m_(a,k)
break
case 63:p=a.u
k.push(A.kl(p,A.bg(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.kk(p,A.bg(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.lY(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.kh(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.m3(a.u,a.e,o)
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
lZ(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
kg(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.mf(s,o.x)[p]
if(n==null)A.cz('No "'+p+'" in "'+A.lK(o)+'"')
d.push(A.cq(s,o,n))}else d.push(p)
return m},
m0(a,b){var s,r=a.u,q=A.kf(a,b),p=b.pop()
if(typeof p=="string")b.push(A.co(r,p,q))
else{s=A.bg(r,a.e,p)
switch(s.w){case 11:b.push(A.jA(r,s,q,a.n))
break
default:b.push(A.jz(r,s,q))
break}}},
lY(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.kf(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bg(p,a.e,o)
q=new A.dh()
q.a=s
q.b=n
q.c=m
b.push(A.kj(p,r,q))
return
case-4:b.push(A.km(p,b.pop(),s))
return
default:throw A.j(A.cE("Unexpected state under `()`: "+A.w(o)))}},
m_(a,b){var s=b.pop()
if(0===s){b.push(A.cp(a.u,1,"0&"))
return}if(1===s){b.push(A.cp(a.u,4,"1&"))
return}throw A.j(A.cE("Unexpected extended operation "+A.w(s)))},
kf(a,b){var s=b.splice(a.p)
A.kh(a.u,a.e,s)
a.p=b.pop()
return s},
bg(a,b,c){if(typeof c=="string")return A.co(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.m1(a,b,c)}else return c},
kh(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bg(a,b,c[s])},
m3(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bg(a,b,c[s])},
m1(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.j(A.cE("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.j(A.cE("Bad index "+c+" for "+b.q(0)))},
kI(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.S(a,b,null,c,null)
r.set(c,s)}return s},
S(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bk(d))return!0
s=b.w
if(s===4)return!0
if(A.bk(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.S(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.v){if(q===7)return A.S(a,b,c,d.x,e)
return d===p||d===t.v||q===6}if(d===t.K){if(s===7)return A.S(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.S(a,b.x,c,d,e))return!1
return A.S(a,A.ju(a,b),c,d,e)}if(s===6)return A.S(a,p,c,d,e)&&A.S(a,b.x,c,d,e)
if(q===7){if(A.S(a,b,c,d.x,e))return!0
return A.S(a,b,c,A.ju(a,d),e)}if(q===6)return A.S(a,b,c,p,e)||A.S(a,b,c,d.x,e)
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
if(!A.S(a,j,c,i,e)||!A.S(a,i,e,j,c))return!1}return A.kt(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.kt(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.mB(a,b,c,d,e)}if(o&&q===10)return A.mG(a,b,c,d,e)
return!1},
kt(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
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
mB(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.cq(a,b,r[o])
return A.kq(a,p,null,c,d.y,e)}return A.kq(a,b.y,null,c,d.y,e)},
kq(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.S(a,b[s],d,e[s],f))return!1
return!0},
mG(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.S(a,r[s],c,q[s],e))return!1
return!0},
bI(a){var s=a.w,r=!0
if(!(a===t.P||a===t.v))if(!A.bk(a))if(s!==6)r=s===7&&A.bI(a.x)
return r},
bk(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
kp(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
iV(a){return a>0?new Array(a):v.typeUniverse.sEA},
as:function as(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dh:function dh(){this.c=this.b=this.a=null},
iT:function iT(a){this.a=a},
dg:function dg(){},
bB:function bB(a){this.a=a},
lR(){var s,r,q
if(self.scheduleImmediate!=null)return A.n2()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.dq(new A.iv(s),1)).observe(r,{childList:true})
return new A.iu(s,r,q)}else if(self.setImmediate!=null)return A.n3()
return A.n4()},
lS(a){self.scheduleImmediate(A.dq(new A.iw(t.M.a(a)),0))},
lT(a){self.setImmediate(A.dq(new A.ix(t.M.a(a)),0))},
lU(a){A.jw(B.H,t.M.a(a))},
jw(a,b){return A.m5(0,b)},
m5(a,b){var s=new A.iR()
s.cu(a,b)
return s},
mM(a){return new A.dd(new A.W($.N,a.h("W<0>")),a.h("dd<0>"))},
mm(a,b){a.$2(0,null)
b.b=!0
return b.a},
mj(a,b){A.mn(a,b)},
ml(a,b){var s,r,q=b.$ti
q.h("1/?").a(a)
s=a==null?q.c.a(a):a
if(!b.b)b.a.cC(s)
else{r=b.a
if(q.h("aR<1>").b(s))r.bA(s)
else r.bC(s)}},
mk(a,b){var s=A.aP(a),r=A.bH(a),q=b.b,p=b.a
if(q)p.b7(new A.ao(s,r))
else p.bz(new A.ao(s,r))},
mn(a,b){var s,r,q=new A.iX(b),p=new A.iY(b)
if(a instanceof A.W)a.bO(q,p,t.z)
else{s=t.z
if(a instanceof A.W)a.cj(q,p,s)
else{r=new A.W($.N,t.c)
r.a=8
r.c=a
r.bO(q,p,s)}}},
n0(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.N.cf(new A.j0(s),t.p,t.S,t.z)},
ki(a,b,c){return 0},
jn(a){var s
if(t.V.b(a)){s=a.gaN()
if(s!=null)return s}return B.a2},
lt(a,b){var s
if(!b.b(null))throw A.j(A.et(null,"computation","The type parameter is not nullable"))
s=new A.W($.N,b.h("W<0>"))
A.lN(a,new A.h2(null,s,b))
return s},
iC(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.lL()
b.bz(new A.ao(new A.az(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bI(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aC()
b.aQ(o.a)
A.bd(b,p)
return}b.a^=2
A.dp(null,null,b.b,t.M.a(new A.iD(o,b)))},
bd(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.u,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.jE(m.a,m.b)}return}q.a=b
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
A.jE(j.a,j.b)
return}g=$.N
if(g!==h)$.N=h
else g=null
c=c.c
if((c&15)===8)new A.iH(q,d,n).$0()
else if(o){if((c&1)!==0)new A.iG(q,j).$0()}else if((c&2)!==0)new A.iF(d,q).$0()
if(g!=null)$.N=g
c=q.c
if(c instanceof A.W){p=q.a.$ti
p=p.h("aR<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aS(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.iC(c,f,!0)
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
mQ(a,b){var s
if(t.C.b(a))return b.cf(a,t.z,t.K,t.l)
s=t.D
if(s.b(a))return s.a(a)
throw A.j(A.et(a,"onError",u.c))},
mN(){var s,r
for(s=$.bE;s!=null;s=$.bE){$.cw=null
r=s.b
$.bE=r
if(r==null)$.cv=null
s.a.$0()}},
mW(){$.jD=!0
try{A.mN()}finally{$.cw=null
$.jD=!1
if($.bE!=null)$.jP().$1(A.kC())}},
kz(a){var s=new A.de(a),r=$.cv
if(r==null){$.bE=$.cv=s
if(!$.jD)$.jP().$1(A.kC())}else $.cv=r.b=s},
mT(a){var s,r,q,p=$.bE
if(p==null){A.kz(a)
$.cw=$.cv
return}s=new A.de(a)
r=$.cw
if(r==null){s.b=p
$.bE=$.cw=s}else{q=r.b
s.b=q
$.cw=r.b=s
if(q==null)$.cv=s}},
nD(a,b){A.X(a,"stream",t.K)
return new A.dm(b.h("dm<0>"))},
lN(a,b){var s=$.N
if(s===B.j)return A.jw(a,t.M.a(b))
return A.jw(a,t.M.a(s.bZ(b)))},
jE(a,b){A.mT(new A.j_(a,b))},
kx(a,b,c,d,e){var s,r=$.N
if(r===c)return d.$0()
$.N=c
s=r
try{r=d.$0()
return r}finally{$.N=s}},
mS(a,b,c,d,e,f,g){var s,r=$.N
if(r===c)return d.$1(e)
$.N=c
s=r
try{r=d.$1(e)
return r}finally{$.N=s}},
mR(a,b,c,d,e,f,g,h,i){var s,r=$.N
if(r===c)return d.$2(e,f)
$.N=c
s=r
try{r=d.$2(e,f)
return r}finally{$.N=s}},
dp(a,b,c,d){t.M.a(d)
if(B.j!==c){d=c.bZ(d)
d=d}A.kz(d)},
iv:function iv(a){this.a=a},
iu:function iu(a,b,c){this.a=a
this.b=b
this.c=c},
iw:function iw(a){this.a=a},
ix:function ix(a){this.a=a},
iR:function iR(){},
iS:function iS(a,b){this.a=a
this.b=b},
dd:function dd(a,b){this.a=a
this.b=!1
this.$ti=b},
iX:function iX(a){this.a=a},
iY:function iY(a){this.a=a},
j0:function j0(a){this.a=a},
aM:function aM(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
av:function av(a,b){this.a=a
this.$ti=b},
ao:function ao(a,b){this.a=a
this.b=b},
h2:function h2(a,b,c){this.a=a
this.b=b
this.c=c},
bc:function bc(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
W:function W(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
iz:function iz(a,b){this.a=a
this.b=b},
iE:function iE(a,b){this.a=a
this.b=b},
iD:function iD(a,b){this.a=a
this.b=b},
iB:function iB(a,b){this.a=a
this.b=b},
iA:function iA(a,b){this.a=a
this.b=b},
iH:function iH(a,b,c){this.a=a
this.b=b
this.c=c},
iI:function iI(a,b){this.a=a
this.b=b},
iJ:function iJ(a){this.a=a},
iG:function iG(a,b){this.a=a
this.b=b},
iF:function iF(a,b){this.a=a
this.b=b},
de:function de(a){this.a=a
this.b=null},
dm:function dm(a){this.$ti=a},
cs:function cs(){},
dl:function dl(){},
iQ:function iQ(a,b){this.a=a
this.b=b},
j_:function j_(a,b){this.a=a
this.b=b},
k2(a,b){return new A.aG(a.h("@<0>").K(b).h("aG<1,2>"))},
Q(a,b,c){return b.h("@<0>").K(c).h("k1<1,2>").a(A.na(a,new A.aG(b.h("@<0>").K(c).h("aG<1,2>"))))},
U(a,b){return new A.aG(a.h("@<0>").K(b).h("aG<1,2>"))},
lB(a){return new A.at(a.h("at<0>"))},
b7(a){return new A.at(a.h("at<0>"))},
lC(a,b){return b.h("k4<0>").a(A.nb(a,new A.at(b.h("at<0>"))))},
jy(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
iO(a,b,c){var s=new A.bf(a,b,c.h("bf<0>"))
s.c=a.e
return s},
aB(a,b){var s=J.J(a)
if(s.j())return s.gn()
return null},
aq(a,b,c){var s=A.k2(b,c)
a.a8(0,new A.h9(s,b,c))
return s},
k3(a,b,c){var s=A.k2(b,c)
s.J(0,a)
return s},
hc(a){var s,r
if(A.jL(a))return"{...}"
s=new A.bx("")
try{r={}
B.a.m($.ah,a)
s.a+="{"
r.a=!0
a.a8(0,new A.hd(r,s))
s.a+="}"}finally{if(0>=$.ah.length)return A.m($.ah,-1)
$.ah.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
at:function at(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dk:function dk(a){this.a=a
this.c=this.b=null},
bf:function bf(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
h9:function h9(a,b,c){this.a=a
this.b=b
this.c=c},
E:function E(){},
F:function F(){},
hb:function hb(a){this.a=a},
hd:function hd(a,b){this.a=a
this.b=b},
cr:function cr(){},
bt:function bt(){},
cc:function cc(){},
bw:function bw(){},
cl:function cl(){},
bC:function bC(){},
mO(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aP(r)
q=A.jZ(String(s))
throw A.j(q)}q=A.iZ(p)
return q},
iZ(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.di(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.iZ(a[s])
return a},
k0(a,b,c){return new A.bY(a,b)},
mp(a){return a.I()},
lV(a,b){return new A.iL(a,[],A.n7())},
lW(a,b,c){var s,r=new A.bx(""),q=A.lV(r,b)
q.b0(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
di:function di(a,b){this.a=a
this.b=b
this.c=null},
dj:function dj(a){this.a=a},
cH:function cH(){},
cJ:function cJ(){},
bY:function bY(a,b){this.a=a
this.b=b},
cU:function cU(a,b){this.a=a
this.b=b},
h5:function h5(){},
h7:function h7(a){this.b=a},
h6:function h6(a){this.a=a},
iM:function iM(){},
iN:function iN(a,b){this.a=a
this.b=b},
iL:function iL(a,b,c){this.c=a
this.a=b
this.b=c},
kH(a){var s=A.lI(a,null)
if(s!=null)return s
throw A.j(A.jZ(a))},
lp(a,b){a=A.T(a,new Error())
if(a==null)a=A.cu(a)
a.stack=b.q(0)
throw a},
ha(a,b,c,d){var s,r=c?J.k_(a,d):J.ly(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
bs(a,b,c){var s,r=A.d([],c.h("u<0>"))
for(s=J.J(a);s.j();)B.a.m(r,c.a(s.gn()))
if(b)return r
r.$flags=1
return r},
o(a,b){var s,r
if(Array.isArray(a))return A.d(a.slice(0),b.h("u<0>"))
s=A.d([],b.h("u<0>"))
for(r=J.J(a);r.j();)B.a.m(s,r.gn())
return s},
aH(a,b){var s=A.bs(a,!1,b)
s.$flags=3
return s},
k9(a,b,c){var s=J.J(b)
if(!s.j())return a
if(c.length===0){do a+=A.w(s.gn())
while(s.j())}else{a+=A.w(s.gn())
while(s.j())a=a+c+A.w(s.gn())}return a},
lL(){return A.bH(new Error())},
lo(a,b,c){var s,r
for(s=0;s<4;++s){r=a[s]
if(r.b===b)return r}throw A.j(A.et(b,"name","No enum value with that name"))},
cM(a){if(typeof a=="number"||A.jC(a)||a==null)return J.bn(a)
if(typeof a=="string")return JSON.stringify(a)
return A.k6(a)},
lq(a,b){A.X(a,"error",t.K)
A.X(b,"stackTrace",t.l)
A.lp(a,b)},
cE(a){return new A.cD(a)},
cC(a,b){return new A.az(!1,null,b,a)},
et(a,b,c){return new A.az(!0,a,b,c)},
b8(a,b,c,d,e){return new A.c7(b,c,!0,a,d,"Invalid value")},
lJ(a,b,c){if(0>a||a>c)throw A.j(A.b8(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.j(A.b8(b,a,c,"end",null))
return b}return c},
c8(a,b){if(a<0)throw A.j(A.b8(a,0,null,b,null))
return a},
jo(a,b,c,d){return new A.cN(b,!0,a,d,"Index out of range")},
bb(a){return new A.cd(a)},
kc(a){return new A.db(a)},
k8(a){return new A.cb(a)},
a_(a){return new A.cI(a)},
jZ(a){return new A.aE(a)},
lx(a,b,c){var s,r
if(A.jL(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.d([],t.s)
B.a.m($.ah,a)
try{A.mK(a,s)}finally{if(0>=$.ah.length)return A.m($.ah,-1)
$.ah.pop()}r=A.k9(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
jp(a,b,c){var s,r
if(A.jL(a))return b+"..."+c
s=new A.bx(b)
B.a.m($.ah,a)
try{r=s
r.a=A.k9(r.a,a,", ")}finally{if(0>=$.ah.length)return A.m($.ah,-1)
$.ah.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
mK(a,b){var s,r,q,p,o,n,m,l=a.gC(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.j())return
s=A.w(l.gn())
B.a.m(b,s)
k+=s.length+2;++j}if(!l.j()){if(j<=5)return
if(0>=b.length)return A.m(b,-1)
r=b.pop()
if(0>=b.length)return A.m(b,-1)
q=b.pop()}else{p=l.gn();++j
if(!l.j()){if(j<=4){B.a.m(b,A.w(p))
return}r=A.w(p)
if(0>=b.length)return A.m(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gn();++j
for(;l.j();p=o,o=n){n=l.gn();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.m(b,-1)
k-=b.pop().length+2;--j}B.a.m(b,"...")
return}}q=A.w(p)
r=A.w(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.m(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.m(b,m)
B.a.m(b,q)
B.a.m(b,r)},
jt(a,b,c,d){var s
if(B.k===c){s=J.ae(a)
b=J.ae(b)
return A.ii(A.aI(A.aI($.ds(),s),b))}if(B.k===d){s=J.ae(a)
b=J.ae(b)
c=J.ae(c)
return A.ii(A.aI(A.aI(A.aI($.ds(),s),b),c))}s=J.ae(a)
b=J.ae(b)
c=J.ae(c)
d=J.ae(d)
d=A.ii(A.aI(A.aI(A.aI(A.aI($.ds(),s),b),c),d))
return d},
lE(a){var s,r,q=$.ds()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.v)(a),++r)q=A.aI(q,J.ae(a[r]))
return A.ii(q)},
cK:function cK(){},
df:function df(){},
C:function C(){},
cD:function cD(a){this.a=a},
aJ:function aJ(){},
az:function az(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
c7:function c7(a,b,c,d,e,f){var _=this
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
cd:function cd(a){this.a=a},
db:function db(a){this.a=a},
cb:function cb(a){this.a=a},
cI:function cI(a){this.a=a},
d3:function d3(){},
ca:function ca(){},
iy:function iy(a){this.a=a},
aE:function aE(a){this.a=a},
a:function a(){},
a9:function a9(a,b,c){this.a=a
this.b=b
this.$ti=c},
aa:function aa(){},
z:function z(){},
dn:function dn(){},
ih:function ih(){this.b=this.a=0},
bx:function bx(a){this.a=a},
jS(a,b,c,d){var s,r,q,p,o,n=t.N,m=t.S,l=a.gai(),k=a.gai(),j=a.gai(),i=A.k3(a.gai().x,m,m),h=A.U(m,m)
for(s=a.gM(),r=J.J(s.a),s=new A.V(r,s.b,s.$ti.h("V<1>"));s.j();){q=r.gn()
h.v(0,q.a,q.d)}s=A.U(n,t.J)
for(r=d.length,p=0;p<d.length;d.length===r||(0,A.v)(d),++p){o=d[p]
s.v(0,o.a,o)}return new A.b0(a,b,c,l.b,k.c,j.d,i,h,s,A.b7(n),A.b7(n),A.b7(n),A.b7(m),A.b7(m),A.b7(m),A.U(m,t.y))},
eu:function eu(a){this.a=a},
b0:function b0(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
_.ay=o
_.ch=p},
dv:function dv(){},
dw:function dw(){},
dT:function dT(a){this.a=a},
dx:function dx(a,b){this.a=a
this.b=b},
dQ:function dQ(){},
e5:function e5(a,b){this.a=a
this.b=b},
e6:function e6(){},
e4:function e4(a){this.a=a},
e0:function e0(a){this.a=a},
e1:function e1(a){this.a=a},
e2:function e2(a){this.a=a},
e3:function e3(a){this.a=a},
dZ:function dZ(a){this.a=a},
e_:function e_(a){this.a=a},
dA:function dA(){},
dB:function dB(a){this.a=a},
dC:function dC(a,b){this.a=a
this.b=b},
dD:function dD(a,b,c){this.a=a
this.b=b
this.c=c},
dH:function dH(a,b){this.a=a
this.b=b},
dE:function dE(a){this.a=a},
dF:function dF(){},
dG:function dG(a,b){this.a=a
this.b=b},
dI:function dI(a){this.a=a},
dJ:function dJ(){},
dK:function dK(a){this.a=a},
dL:function dL(){},
dM:function dM(a){this.a=a},
dN:function dN(a){this.a=a},
dP:function dP(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dO:function dO(a){this.a=a},
dU:function dU(a){this.a=a},
dR:function dR(){},
dS:function dS(){},
dy:function dy(){},
dz:function dz(){},
dV:function dV(a){this.a=a},
dW:function dW(){},
dX:function dX(a){this.a=a},
dY:function dY(a){this.a=a},
aQ(a,b,c,d){var s,r=b.f,q=A.i(r)
q=new A.c(r,q.h("e(1)").a(new A.ez(a)),q.h("c<1>")).gl(0)
r=b.gM()
if(!b.gM().gC(0).j())s=0
else{s=b.gai().r
if(s==null){s=c.b.i(0,"countryIncome")
s.toString
s=B.b.k(s)}}return new A.ey(a,q,r.E(0,s,new A.eA(d,c),t.S),b,c)},
ey:function ey(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ez:function ez(a){this.a=a},
eA:function eA(a,b){this.a=a
this.b=b},
ai(a){var s=a.x,r=s>=15?500:0,q=a.e
if(q===2)q=1000
else q=q===1?30:0
return a.w*3+a.r*0.35+a.f*0.15+s*1.5-a.y*2+r+q},
ac(a,b){var s=b?a.x*0.75:0,r=a.e
if(r===1)r=30
else r=r===2?-200:0
return a.w*100+a.r*0.35+a.f*0.15-a.y*2-s+r},
nv(a){return t.r.a(a).x>=15},
kG(a,b){var s=a.gbl(),r=a.gN(),q=b.b.i(0,"soldierPower")
q.toString
return s*(a.w+r*B.b.k(q))+B.a.E(a.ax,0,new A.j8(b,a),t.H)},
dr(a,b,c,d){var s,r=b.b,q=r.i(0,"soldierHp")
q.toString
q=B.b.k(q)
s=b.bY(a.w,c,!1)
r=r.i(0,"soldierPower")
r.toString
return(a.f+d*q)*(s+d*B.b.k(r))*(1+b.dq(B.b.aI(a.ay))/1000)},
b2:function b2(a,b){this.a=a
this.b=b},
bJ:function bJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.r=d},
eB:function eB(a,b,c){this.a=a
this.b=b
this.c=c},
eC:function eC(){},
eD:function eD(){},
j8:function j8(a,b){this.a=a
this.b=b},
cB:function cB(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4){var _=this
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
au:function au(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eF:function eF(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.r=_.f=_.e=$
_.w=null
_.x=e},
f2:function f2(){},
f3:function f3(a){this.a=a},
f4:function f4(){},
ff:function ff(){},
fk:function fk(){},
fl:function fl(){},
fm:function fm(a){this.a=a},
fn:function fn(a){this.a=a},
fo:function fo(a){this.a=a},
fp:function fp(a,b){this.a=a
this.b=b},
fq:function fq(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
f5:function f5(a){this.a=a},
f6:function f6(a,b,c){this.a=a
this.b=b
this.c=c},
f7:function f7(a){this.a=a},
f8:function f8(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
f9:function f9(a,b,c){this.a=a
this.b=b
this.c=c},
fa:function fa(a){this.a=a},
fb:function fb(){},
fc:function fc(a){this.a=a},
fd:function fd(a){this.a=a},
fe:function fe(){},
fg:function fg(a,b){this.a=a
this.b=b},
fh:function fh(a){this.a=a},
fi:function fi(){},
fj:function fj(a){this.a=a},
eQ:function eQ(a,b){this.a=a
this.b=b},
eR:function eR(a){this.a=a},
eG:function eG(a){this.a=a},
eM:function eM(a){this.a=a},
eN:function eN(a,b,c){this.a=a
this.b=b
this.c=c},
eO:function eO(a,b,c){this.a=a
this.b=b
this.c=c},
eP:function eP(a){this.a=a},
eV:function eV(a){this.a=a},
eW:function eW(a,b){this.a=a
this.b=b},
eX:function eX(a){this.a=a},
eY:function eY(a,b){this.a=a
this.b=b},
eZ:function eZ(a){this.a=a},
f_:function f_(a){this.a=a},
f0:function f0(){},
f1:function f1(a){this.a=a},
eT:function eT(a){this.a=a},
eU:function eU(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eS:function eS(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eI:function eI(a,b,c){this.a=a
this.b=b
this.c=c},
eJ:function eJ(a){this.a=a},
eK:function eK(a){this.a=a},
eL:function eL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eH:function eH(a){this.a=a},
ad:function ad(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fr:function fr(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
h_:function h_(a,b){this.a=a
this.b=b},
h0:function h0(a){this.a=a},
fZ:function fZ(a){this.a=a},
h1:function h1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fX:function fX(){},
fW:function fW(){},
fY:function fY(){},
fV:function fV(){},
fs:function fs(){},
ft:function ft(){},
fu:function fu(){},
fC:function fC(){},
fD:function fD(a){this.a=a},
fE:function fE(){},
fF:function fF(){},
fG:function fG(a){this.a=a},
fH:function fH(){},
fI:function fI(a){this.a=a},
fJ:function fJ(a){this.a=a},
fv:function fv(){},
fw:function fw(a){this.a=a},
fK:function fK(a,b){this.a=a
this.b=b},
fx:function fx(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fy:function fy(a,b){this.a=a
this.b=b},
fz:function fz(){},
fA:function fA(a){this.a=a},
fB:function fB(a){this.a=a},
fS:function fS(a){this.a=a},
fT:function fT(a){this.a=a},
fU:function fU(){},
fL:function fL(){},
fO:function fO(a){this.a=a},
fP:function fP(){},
fQ:function fQ(a){this.a=a},
fR:function fR(a){this.a=a},
fM:function fM(){},
fN:function fN(){},
eh(a){var s,r=a.length
if(0>=r)return A.m(a,0)
s=A.x(a[0])
if(1>=r)return A.m(a,1)
return new A.t(s,A.x(a[1]))},
t:function t(a,b){this.a=a
this.b=b},
eg:function eg(a){this.a=a},
jR(c2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=A.I(c2.i(0,"id")),a9=A.f(c2.i(0,"c")),b0=A.f(c2.i(0,"home")),b1=A.f(c2.i(0,"o")),b2=A.f(c2.i(0,"t")),b3=A.x(c2.i(0,"hp")),b4=A.f(c2.i(0,"max")),b5=A.f(c2.i(0,"a")),b6=A.f(c2.i(0,"p")),b7=A.f(c2.i(0,"pay")),b8=t.j,b9=A.eh(b8.a(c2.i(0,"xy"))),c0=A.eh(b8.a(c2.i(0,"v"))),c1=A.f(c2.i(0,"s"))
if(!(c1>=0&&c1<8))return A.m(B.L,c1)
c1=B.L[c1]
s=A.d([],t.n)
for(r=b8.a(c2.i(0,"troops")),q=r.length,p=0;p<r.length;r.length===q||(0,A.v)(r),++p)s.push(A.x(r[p]))
r=t.R
q=t.S
o=A.bs(r.a(c2.i(0,"w")),!0,q)
n=A.x(c2.i(0,"m"))
m=c2.i(0,"to")==null?null:A.eh(b8.a(c2.i(0,"to")))
l=A.a2(c2.i(0,"target"))
k=A.x(c2.i(0,"return"))
j=A.aw(c2.i(0,"dispatch"))
i=A.aw(c2.i(0,"move"))
h=A.aw(c2.i(0,"dismiss"))
g=A.aw(c2.i(0,"upgrade"))
f=A.aw(c2.i(0,"retreat"))
e=A.aw(c2.i(0,"marked"))
d=A.I(c2.i(0,"rev"))
c=A.f(c2.i(0,"orderRev"))
b=A.bD(c2.i(0,"opponent"))
a=A.f(c2.i(0,"clashes"))
a0=A.x(c2.i(0,"received"))
a1=A.x(c2.i(0,"dealt"))
a2=A.aw(c2.i(0,"opening"))
a3=A.aw(c2.i(0,"weaponReady"))
a4=A.d([],t._)
for(r=J.J(r.a(c2.i(0,"returnPath")));r.j();){a5=b8.a(r.gn())
a6=a5.length
if(0>=a6)return A.m(a5,0)
a7=A.x(a5[0])
if(1>=a6)return A.m(a5,1)
a4.push(new A.t(a7,A.x(a5[1])))}b8=A.a2(c2.i(0,"regionCity"))
r=A.a2(c2.i(0,"salaryPaidMonth"))
if(r==null)r=-1
a5=A.ct(c2.i(0,"movementPending"))
return new A.p(a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b9,c0,c1,A.aH(s,t.i),A.aH(o,q),n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,b8,r,a5===!0)},
la(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=A.f(a3.i(0,"id")),c=A.f(a3.i(0,"c")),b=A.f(a3.i(0,"native")),a=A.f(a3.i(0,"level")),a0=t.j,a1=A.eh(a0.a(a3.i(0,"xy"))),a2=A.d([],t._)
for(s=a0.a(a3.i(0,"outline")),r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q){p=a0.a(s[q])
o=p.length
if(0>=o)return A.m(p,0)
n=A.x(p[0])
if(1>=o)return A.m(p,1)
a2.push(new A.t(n,A.x(p[1])))}a0=A.f(a3.i(0,"income"))
s=A.f(a3.i(0,"poor"))
r=A.f(a3.i(0,"cap"))
p=A.f(a3.i(0,"recruitCap"))
o=A.aw(a3.i(0,"recruit"))
n=A.ct(a3.i(0,"upgrade"))
m=A.I(a3.i(0,"rev"))
l=A.f(a3.i(0,"baseIncome"))
k=A.a2(a3.i(0,"initial"))
j=A.f(a3.i(0,"wins"))
i=A.bD(a3.i(0,"attacker"))
h=A.bD(a3.i(0,"defender"))
g=A.I(a3.i(0,"stage"))
f=A.x(a3.i(0,"next"))
e=A.ct(a3.i(0,"fallen"))
return new A.D(d,c,b,a,a1,new A.eg(a2),a0,s,r,p,l,o,n!==!1,m,k,j,i,h,g,f,e===!0,A.x(a3.i(0,"danger")))},
lb(a){var s,r,q,p,o,n=A.f(a.i(0,"id")),m=A.f(a.i(0,"gold")),l=A.f(a.i(0,"reserves")),k=A.f(a.i(0,"capacity")),j=A.f(a.i(0,"salary")),i=A.f(a.i(0,"poor")),h=A.a2(a.i(0,"baseIncome")),g=A.R(a.i(0,"garrisonAccrued"))
if(g==null)g=0
s=t.S
r=A.U(s,s)
for(q=t.f,p=q.a(a.i(0,"stock")).gal(),p=p.gC(p);p.j();){o=p.gn()
r.v(0,A.kH(A.I(o.a)),A.f(o.b))}p=A.U(s,s)
for(q=q.a(a.i(0,"hate")).gal(),q=q.gC(q);q.j();){o=q.gn()
p.v(0,A.kH(A.I(o.a)),A.f(o.b))}return new A.b_(n,m,l,k,j,i,h,g,A.eE(r,s,s),A.eE(p,s,s))},
lc(a){var s,r,q,p,o,n,m=A.f(a.i(0,"country")),l=A.f(a.i(0,"tick")),k=A.x(a.i(0,"month")),j=A.d([],t.Y)
for(s=t.R,r=J.J(s.a(a.i(0,"cities"))),q=t.f,p=t.N,o=t.z;r.j();)j.push(A.la(A.aq(q.a(r.gn()),p,o)))
r=A.d([],t.e)
for(n=J.J(s.a(a.i(0,"heroes")));n.j();)r.push(A.jR(A.aq(q.a(n.gn()),p,o)))
n=A.d([],t.eu)
for(s=J.J(s.a(a.i(0,"countries")));s.j();)n.push(A.lb(A.aq(q.a(s.gn()),p,o)))
s=A.f(a.i(0,"pool"))
q=A.f(a.i(0,"salary"))
p=A.a2(a.i(0,"year"))
if(p==null)p=1
o=A.a2(a.i(0,"monthIndex"))
if(o==null)o=0
return new A.e8(m,l,p,o,k,A.aH(j,t.q),A.aH(r,t.r),A.aH(n,t.t),s,q)},
ak:function ak(a,b){this.a=a
this.b=b},
p:function p(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7){var _=this
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
b_:function b_(a,b,c,d,e,f,g,h,i,j){var _=this
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
ee:function ee(a){this.a=a},
ef:function ef(a){this.a=a},
eb:function eb(a,b){this.a=a
this.b=b},
ea:function ea(a){this.a=a},
ec:function ec(){},
ed:function ed(a){this.a=a},
e9:function e9(a){this.a=a},
jG(a,b,c){var s,r,q=null,p=a.as
if(p===B.f||p===B.e||p===B.y)return q
s=c.y.i(0,a.a)
p=s==null
if((p?q:s.b)==="expedition")p=p?q:s.d
else p=a.CW
r=b.F(p)
return r!=null&&r.b!==a.b?r:q},
kB(a,b,c,d){var s,r,q=A.jG(a,b,c)
if(q==null)return!1
s=a.as
r=!0
if(s!==B.w)if(s!==B.x){s=a.z
s=q.f.X(s).G(s)<=d.w.p2}else s=r
else s=r
return s},
c6(a,b,c,d,e){var s=B.a.D(a.f,new A.hg(e,a))?e:null
s=new A.hf(a,b,c,s,d,A.U(t.S,t.bd))
s.ct(a,b,c,d,e)
return s},
hf:function hf(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hg:function hg(a,b){this.a=a
this.b=b},
hh:function hh(){},
hl:function hl(a){this.a=a},
hn:function hn(a){this.a=a},
ho:function ho(a){this.a=a},
hm:function hm(a,b){this.a=a
this.b=b},
hj:function hj(){},
hk:function hk(a,b){this.a=a
this.b=b},
hp:function hp(a){this.a=a},
hi:function hi(a){this.a=a},
d5:function d5(a,b){this.a=a
this.b=b},
hq:function hq(a,b,c){this.a=a
this.b=b
this.c=c},
ht:function ht(a,b){this.a=a
this.b=b},
hr:function hr(a,b,c){this.a=a
this.b=b
this.c=c},
hs:function hs(a){this.a=a},
hw:function hw(a){this.a=a},
hx:function hx(){},
hy:function hy(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hz:function hz(){},
hA:function hA(){},
hB:function hB(){},
hu:function hu(){},
hv:function hv(a){this.a=a},
lg(a){var s,r,q,p,o,n,m,l,k=A.I(a.i(0,"hero")),j=A.I(a.i(0,"role")),i=A.f(a.i(0,"deadline")),h=A.f(a.i(0,"commit")),g=A.a2(a.i(0,"city")),f=A.bD(a.i(0,"enemy")),e=A.d([],t._)
for(s=J.J(t.R.a(a.i(0,"points"))),r=t.j;s.j();){q=r.a(s.gn())
p=q.length
if(0>=p)return A.m(q,0)
o=A.x(q[0])
if(1>=p)return A.m(q,1)
e.push(new A.t(o,A.x(q[1])))}s=A.f(a.i(0,"leg"))
r=A.f(a.i(0,"gold"))
q=A.aw(a.i(0,"slot"))
p=A.ct(a.i(0,"rearStaging"))
o=A.I(a.i(0,"reason"))
n=A.f(a.i(0,"order"))
m=A.a2(a.i(0,"targetCountry"))
l=A.ct(a.i(0,"attrition"))
return new A.a5(k,j,o,g,m,l===!0,f,e,s,i,h,r,q,p===!0,n)},
ld(a){var s,r,q,p,o,n,m,l,k,j,i
if(!J.ay(a.i(0,"protocol"),1))throw A.j(B.a5)
s=A.I(a.i(0,"session"))
r=A.f(a.i(0,"id"))
q=A.I(a.i(0,"rules"))
p=A.I(a.i(0,"map"))
o=t.f
n=t.N
m=t.z
l=A.lc(A.aq(o.a(a.i(0,"observation")),n,m))
k=A.f(a.i(0,"deadline"))
j=A.d([],t.m)
for(i=J.J(t.R.a(a.i(0,"tasks")));i.j();)j.push(A.lg(A.aq(o.a(i.gn()),n,m)))
o=A.f(a.i(0,"seed"))
n=A.f(a.i(0,"priority"))
m=A.f(a.i(0,"idle"))
i=A.bD(a.i(0,"stage"))
if(i==null)i="full"
return new A.ej(s,q,p,r,k,o,n,m,A.lo(B.ag,i,t.a9),A.a2(a.i(0,"offensiveCountry")),A.a2(a.i(0,"offensiveCity")),l,j)},
jT(a,b,c,d){var s=a.Q
return new A.ei(a.a,a.b,a.c,a.d,s.a,s.b,a.e,d,b,c)},
aD:function aD(a,b){this.a=a
this.b=b},
aj:function aj(a,b){this.a=a
this.b=b},
A:function A(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
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
P:function P(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bq:function bq(a,b,c,d,e,f,g,h,i,j){var _=this
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
ej:function ej(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
ei:function ei(a,b,c,d,e,f,g,h,i,j){var _=this
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
j1(b0,b1,b2,b3,b4,b5,b6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2="soldierLimit",a3="soldierPower",a4="soldierHp",a5={},a6=b2.u(b1.a),a7=A.i(a6).h("L<1>"),a8=A.Z(new A.L(a6,a7),0,A.X(b1.gZ(),"count",t.S),a7.h("k.E")).ak(0),a9=A.aQ(b1.b,b2,b3,null)
a5.a=a5.b=1
a5.c=null
a7=b3.d2(b0.w,!1)
a6=b3.b
s=a6.i(0,a2)
s.toString
s=B.b.k(s)
r=a6.i(0,a3)
r.toString
q=a7+s*B.b.k(r)
p=B.a.am(b2.w,new A.j2(b1)).c
for(a7=b1.db,s=b1.ax,r=b1.ay,o=s==null,n=b1.d,m=t.b,l=b3.d,k=0,j=0;j<a8.length;++j){i=a8[j]
h=a6.i(0,a2)
h.toString
g=Math.min(B.b.k(h),p+i.gN())
p=Math.max(0,p-(g-i.gN()))
if(o)h=n
else{h=a7?1:0
h=B.c.A(s-r-h,0,5)}h=Math.max(1,h-j)
f=a6.i(0,a2)
f.toString
f=B.b.k(f)
e=b4.d8(b0,i,h,!1,g,j<b5.length?A.d([b5[j]],m):B.d,!0,f)
a5.b=Math.min(a5.b,e.b)
if(j===0)a5.c=e
a5.a=Math.min(a5.a,e.c)
if(o)h=n
else{h=a7?1:0
h=B.c.A(s-r-h,0,5)}h=A.f(Math.max(1,h-j))
f=B.c.A(B.c.W(i.w),0,63)
if(h>0){d=l.length
h=B.c.A(h-1,0,d-1)
if(!(h>=0&&h<d))return A.m(l,h)
h=l[h]}else h=0
h=B.c.A(f+h,0,63)
f=a6.i(0,a3)
f.toString
c=(h+g*B.b.k(f))/Math.max(1,q)
f=a6.i(0,a4)
f.toString
k+=(i.f+g*B.b.k(f))*c*c}for(a7=b3.r,s=b3.w,r=s.rx,b=0,j=0;o=b5.length,j<Math.min(o,a8.length);++j){if(!(j<o))return A.m(b5,j)
a=a7.i(0,b5[j])
if(a!=null){o=Math.max(0,a.c-a.d)
b+=o*(j===0?1:r)}}a7=b0.f
r=a6.i(0,a2)
r.toString
r=B.b.k(r)
a6=a6.i(0,a4)
a6.toString
a0=Math.max(1,B.b.aw(k/Math.max(1,(a7+r*B.b.k(a6)+b)*0.85)))
a6=new A.j3(a5,a8,b0,b3)
if(a8.length!==0&&J.jm(b5)&&a5.b<s.k4)return new A.aL([!1,a5.b,0,a5.a])
r=s.fy
if(a0>r)return a6.$0()
o=a8.length
m=o===0
if(!m)a7=o===1&&n<=2&&a7>=b0.r*0.8&&a5.b>s.ry||a5.b>s.RG+Math.max(0,o-1)*0.025-b6
else a7=!0
if(a7){a6=a5.b
a7=a5.a
return new A.aL([!1,a6,a9.ci(a6>=s.k4||m?a0:Math.max(2,a0),o),a7])}a1=o>1&&a5.a>s.RG&&a5.b>-0.08?Math.min(r,o):0
if(a1===0)return a6.$0()
a6=a5.b
a7=a5.a
return new A.aL([!1,a6,a9.ci(a1,o),a7])},
j2:function j2(a){this.a=a},
j3:function j3(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ns(a,b,c,d,e,f,g,h){var s
if(f<3||e)return!1
s=d*h+80+g
return c.aG(0,new A.jg(a,s))&&b.aG(0,new A.jh(a,s))},
jg:function jg(a,b){this.a=a
this.b=b},
jh:function jh(a,b){this.a=a
this.b=b},
hF:function hF(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hI:function hI(){},
hJ:function hJ(a){this.a=a},
hK:function hK(){},
hV:function hV(a,b,c){this.a=a
this.b=b
this.c=c},
i5:function i5(a,b,c){this.a=a
this.b=b
this.c=c},
hH:function hH(a,b){this.a=a
this.b=b},
hG:function hG(a,b,c){this.a=a
this.b=b
this.c=c},
i8:function i8(a,b){this.a=a
this.b=b},
i9:function i9(a,b){this.a=a
this.b=b},
ia:function ia(){},
ib:function ib(){},
ie:function ie(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
id:function id(a){this.a=a},
hL:function hL(){},
ic:function ic(a,b,c){this.a=a
this.b=b
this.c=c},
hM:function hM(a){this.a=a},
hN:function hN(a,b){this.a=a
this.b=b},
hO:function hO(){},
hP:function hP(){},
hQ:function hQ(){},
hR:function hR(){},
hS:function hS(a){this.a=a},
hT:function hT(){},
hU:function hU(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hW:function hW(a,b,c){this.a=a
this.b=b
this.c=c},
hX:function hX(a){this.a=a},
hY:function hY(){},
hZ:function hZ(a){this.a=a},
i_:function i_(){},
i0:function i0(){},
i1:function i1(a,b,c){this.a=a
this.b=b
this.c=c},
i2:function i2(a,b,c){this.a=a
this.b=b
this.c=c},
i3:function i3(a,b){this.a=a
this.b=b},
i4:function i4(a,b,c){this.a=a
this.b=b
this.c=c},
i6:function i6(){},
i7:function i7(){},
bo:function bo(a,b,c){this.a=a
this.b=b
this.d=c},
ek:function ek(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
el:function el(){},
em:function em(a,b,c){this.a=a
this.b=b
this.c=c},
en:function en(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eo:function eo(a,b,c){this.a=a
this.b=b
this.c=c},
ep:function ep(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
le(a,b,c,d,e,f,g,h){var s,r,q,p,o=A.eE(f,t.N,t.H),n=t.S,m=A.aH(e,n),l=A.aH(a,n),k=t.i,j=A.aH(c,k)
k=A.aH(b,k)
s=t.z
s=A.U(s,s)
for(r=h.length,q=0;q<h.length;h.length===r||(0,A.v)(h),++q){p=h[q]
s.v(0,p.a,p)}return new A.eq(g,o,m,l,j,k,A.eE(s,n,t.o),d)},
lf(c9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2=A.I(c9.i(0,"version")),c3=t.f,c4=t.N,c5=A.aq(c3.a(c9.i(0,"values")),c4,t.H),c6=t.R,c7=t.S,c8=A.bs(c6.a(c9.i(0,"upgrades")),!0,c7)
c7=A.bs(c6.a(c9.i(0,"defenseBonuses")),!0,c7)
s=t.n
r=A.d([],s)
for(q=J.J(c6.a(c9.i(0,"movement")));q.j();)r.push(A.x(q.gn()))
s=A.d([],s)
for(q=J.J(c6.a(c9.i(0,"field")));q.j();)s.push(A.x(q.gn()))
q=A.d([],t.k)
for(c6=J.J(c6.a(c9.i(0,"weapons"))),p=t.j;c6.j();){o=p.a(c6.gn())
n=o.length
if(0>=n)return A.m(o,0)
m=A.f(o[0])
if(1>=n)return A.m(o,1)
l=A.f(o[1])
if(2>=n)return A.m(o,2)
k=A.f(o[2])
if(3>=n)return A.m(o,3)
j=A.f(o[3])
if(4>=n)return A.m(o,4)
i=A.f(o[4])
if(5>=n)return A.m(o,5)
h=A.aw(o[5])
if(6>=n)return A.m(o,6)
q.push(new A.an(m,l,k,j,i,h,A.x(o[6])))}c3=A.aq(c3.a(c9.i(0,"tuning")),c4,t.z)
c4=A.x(c3.i(0,"interval"))
c6=A.R(c3.i(0,"resourceInterval"))
if(c6==null)c6=30
p=A.a2(c3.i(0,"cashBuffer"))
if(p==null)p=12
o=A.R(c3.i(0,"payrollRatio"))
if(o==null)o=0.5
n=A.a2(c3.i(0,"dangerousCountryCities"))
if(n==null)n=5
m=A.R(c3.i(0,"coalitionBudgetBase"))
if(m==null)m=0.5
l=A.R(c3.i(0,"coalitionBudgetStep"))
if(l==null)l=0.25
k=A.R(c3.i(0,"coalitionTargetBase"))
if(k==null)k=45
j=A.R(c3.i(0,"coalitionTargetStep"))
if(j==null)j=15
i=A.R(c3.i(0,"coalitionPayrollCeiling"))
if(i==null)i=0.8
h=A.R(c3.i(0,"coalitionTravel"))
if(h==null)h=45
g=A.R(c3.i(0,"targetTravelScale"))
if(g==null)g=25
f=A.R(c3.i(0,"hatredTargetBonus"))
if(f==null)f=90
e=A.R(c3.i(0,"breakthroughMargin"))
if(e==null)e=0.1
d=A.x(c3.i(0,"threat"))
c=A.x(c3.i(0,"urgent"))
b=A.x(c3.i(0,"margin"))
a=A.x(c3.i(0,"commit"))
a0=A.a2(c3.i(0,"rearExtra"))
if(a0==null)a0=1
a1=A.f(c3.i(0,"candidates"))
a2=A.f(c3.i(0,"assessments"))
a3=A.f(c3.i(0,"routes"))
a4=A.f(c3.i(0,"plans"))
a5=A.f(c3.i(0,"commands"))
a6=A.f(c3.i(0,"team"))
a7=A.a2(c3.i(0,"fronts"))
if(a7==null)a7=2
a8=A.a2(c3.i(0,"singleFrontMonths"))
if(a8==null)a8=12
a9=A.R(c3.i(0,"splitForce"))
if(a9==null)a9=2.25
b0=A.R(c3.i(0,"splitAdvantage"))
if(b0==null)b0=0.3
b1=A.R(c3.i(0,"arrivalSpread"))
if(b1==null)b1=20
b2=A.R(c3.i(0,"expeditionSeconds"))
if(b2==null)b2=900
b3=A.R(c3.i(0,"assaultCommitDistance"))
if(b3==null)b3=64
b4=A.R(c3.i(0,"recallCriticalMargin"))
if(b4==null)b4=0.25
b5=A.a2(c3.i(0,"attritionCombat"))
if(b5==null)b5=8
b6=A.R(c3.i(0,"attritionGain"))
if(b6==null)b6=0.06
b7=A.f(c3.i(0,"targets"))
b8=A.f(c3.i(0,"slice"))
b9=A.x(c3.i(0,"advantage"))
c0=A.x(c3.i(0,"expansion"))
c1=A.x(c3.i(0,"credit"))
return A.le(c7,s,r,new A.cB(c4,d,c,b,c6,p,o,n,m,l,k,j,i,h,g,f,e,a,A.x(c3.i(0,"age")),a0,a1,a2,a3,a4,a5,a6,b7,b8,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b9,c1,c0,A.f(c3.i(0,"timeout")),A.f(c3.i(0,"restarts")),A.x(c3.i(0,"stagnation"))),c8,c5,c2,q)},
an:function an(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
eq:function eq(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
e7:function e7(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
es:function es(a,b,c){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=0
_.r=c},
bl(a,b,c,d,e,f){var s,r,q,p,o,n,m=a.a,l=c.u(m),k=A.i(l).h("L<1>"),j=A.Z(new A.L(l,k),0,A.X(a.gZ(),"count",t.S),k.h("k.E")).ak(0)
if(j.length===0)s=0
else{l=A.i(j)
s=new A.a0(j,l.h("h(1)").a(new A.ji()),l.h("a0<1,h>")).aj(0,B.A)}l=c.r
k=A.i(l)
r=new A.c(l,k.h("e(1)").a(new A.jj(a)),k.h("c<1>")).E(0,0,new A.jk(),t.i)
k=a.b
l=c.gai().y.i(0,k)
l=B.c.A(l==null?0:l,0,100)
k=A.aQ(k,c,d,null)
if(k.ga3()){q=k.e.w
p=q.z+k.gbb()*q.Q}else p=0
o=e^m*7919
o^=o<<13
o^=o>>>17
if(f==null){m=b.z.G(a.e)
k=d.b.i(0,"marchSpeed")
k.toString
q=d.e
if(0>=q.length)return A.m(q,0)
n=m/(k*q[0])}else n=f
if(a.c===b.b)m=1
else{m=d.b.i(0,"foreignYield")
m.toString}k=d.w
return Math.max(1,160+a.z*m*2+r+p+l/100*k.ay-s*0.25-a.d*6)/Math.pow(1+n/k.ax,1.5)+((o^o<<5)&65535)/65536*0.000001},
ji:function ji(){},
jj:function jj(a){this.a=a},
jk:function jk(){},
a4:function a4(a,b,c){this.a=a
this.b=b
this.c=c},
ap:function ap(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.d=c
_.f=d
_.r=e
_.w=f},
ew:function ew(){},
ex:function ex(){},
ev:function ev(){},
ij:function ij(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ik:function ik(a){this.a=a},
il:function il(){},
im:function im(a){this.a=a},
io:function io(a){this.a=a},
ip:function ip(a){this.a=a},
iq:function iq(a){this.a=a},
ir:function ir(){},
er:function er(a){var _=this
_.a=a
_.d=_.c=_.b=0
_.e=!1},
nn(){var s,r,q=new A.jd(),p=v.G,o="web-worker:"+A.I(p.self.constructor.name)
p=A.iW(p.self)
s=new A.je(new A.es(q,o,A.b7(t.S)))
if(typeof s=="function")A.cz(A.cC("Attempting to rewrap a JS function.",null))
r=function(a,b){return function(c){return a(b,c,arguments.length)}}(A.mo,s)
r[$.jN()]=s
p.onmessage=r
q.$1(B.i.au(t.G.a(A.Q(["kind","hello","protocol",1,"build","525a6037","backend",o],t.N,t.X)),null))},
jd:function jd(){},
je:function je(a){this.a=a},
kP(a){return v.mangledGlobalNames[a]},
nt(a){throw A.T(new A.bZ("Field '"+a+"' has been assigned during initialization."),new Error())},
O(){throw A.T(A.lA(""),new Error())},
mo(a,b,c){t.h.a(a)
if(A.f(c)>=1)return a.$1(b)
return a.$0()},
kK(a,b,c){A.kD(c,t.H,"T","min")
return Math.min(c.a(a),c.a(b))},
kJ(a,b,c){A.kD(c,t.H,"T","max")
return Math.max(c.a(a),c.a(b))},
nf(a,b,c,d,e,f,g,h){var s,r,q,p,o,n,m,l=null,k=f.G(a),j=!c
if(j&&k>d*b+80)return l
s=h.a
r=h.b
q=Math.sqrt(s*s+r*r)
p=q<0.01?0:((a.a-f.a)*s+(a.b-f.b)*r)/(Math.max(1,k)*q)
if(j&&k>72){if(p<0.45)return l
o=Math.max(0,k*p)
n=new A.t(f.a+s/q*o,f.b+r/q*o)
if(e.X(n).G(n)>48)return l}m=g.$2(f,e.bU(f,a))
if(isFinite(m))j=!j||m<=b
else j=!1
return j?m:l},
js(a,b,c){var s=Math.max(0,a-c)
return s*s*b}},B={}
var w=[A,J,B]
var $={}
A.jq.prototype={}
J.cP.prototype={
ab(a,b){return a===b},
gR(a){return A.d6(a)},
q(a){return"Instance of '"+A.d7(a)+"'"},
gS(a){return A.aN(A.jB(this))}}
J.cR.prototype={
q(a){return String(a)},
gR(a){return a?519018:218159},
gS(a){return A.aN(t.y)},
$iB:1,
$ie:1}
J.bU.prototype={
ab(a,b){return null==b},
q(a){return"null"},
gR(a){return 0},
$iB:1}
J.bW.prototype={$iM:1}
J.aT.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.d4.prototype={}
J.by.prototype={}
J.aS.prototype={
q(a){var s=a[$.kR()]
if(s==null)s=a[$.jN()]
if(s==null)return this.cs(a)
return"JavaScript function for "+J.bn(s)},
$iaF:1}
J.bV.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.bX.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.u.prototype={
m(a,b){A.i(a).c.a(b)
a.$flags&1&&A.cA(a,29)
a.push(b)},
an(a,b){var s
a.$flags&1&&A.cA(a,"remove",1)
for(s=0;s<a.length;++s)if(J.ay(a[s],b)){a.splice(s,1)
return!0}return!1},
J(a,b){var s
A.i(a).h("a<1>").a(b)
a.$flags&1&&A.cA(a,"addAll",2)
if(Array.isArray(b)){this.cA(a,b)
return}for(s=J.J(b);s.j();)a.push(s.gn())},
cA(a,b){var s,r
t.gn.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.j(A.a_(a))
for(r=0;r<s;++r)a.push(b[r])},
aF(a){a.$flags&1&&A.cA(a,"clear","clear")
a.length=0},
dm(a,b){var s,r=A.ha(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.v(r,s,A.w(a[s]))
return r.join(b)},
cg(a,b){return A.Z(a,0,A.X(b,"count",t.S),A.i(a).c)},
b2(a,b){return A.Z(a,b,null,A.i(a).c)},
aj(a,b){var s,r,q
A.i(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.j(A.aA())
if(0>=s)return A.m(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.j(A.a_(a))}return r},
E(a,b,c,d){var s,r,q
d.a(b)
A.i(a).K(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.j(A.a_(a))}return r},
am(a,b){var s,r,q
A.i(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.j(A.a_(a))}throw A.j(A.aA())},
T(a,b){if(!(b>=0&&b<a.length))return A.m(a,b)
return a[b]},
gH(a){if(a.length>0)return a[0]
throw A.j(A.aA())},
gaA(a){var s=a.length
if(s>0)return a[s-1]
throw A.j(A.aA())},
D(a,b){var s,r
A.i(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.j(A.a_(a))}return!1},
aG(a,b){var s,r
A.i(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.j(A.a_(a))}return!0},
B(a,b){var s,r,q,p,o,n=A.i(a)
n.h("b(1,1)?").a(b)
a.$flags&2&&A.cA(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dN()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.dq(b,2))
if(p>0)this.cS(a,p)},
cS(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
p(a,b){var s
for(s=0;s<a.length;++s)if(J.ay(a[s],b))return!0
return!1},
ga4(a){return a.length===0},
gaz(a){return a.length!==0},
q(a){return A.jp(a,"[","]")},
gC(a){return new J.b1(a,a.length,A.i(a).h("b1<1>"))},
gR(a){return A.d6(a)},
gl(a){return a.length},
v(a,b,c){A.i(a).c.a(c)
a.$flags&2&&A.cA(a)
if(!(b>=0&&b<a.length))throw A.j(A.kE(a,b))
a[b]=c},
$in:1,
$ia:1,
$iq:1}
J.cQ.prototype={
dG(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.d7(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.h3.prototype={}
J.b1.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.v(q)
throw A.j(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iG:1}
J.br.prototype={
t(a,b){var s
A.x(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaW(b)
if(this.gaW(a)===s)return 0
if(this.gaW(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaW(a){return a===0?1/a<0:a<0},
k(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.j(A.bb(""+a+".toInt()"))},
aw(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.j(A.bb(""+a+".ceil()"))},
W(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.j(A.bb(""+a+".floor()"))},
aI(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.j(A.bb(""+a+".round()"))},
A(a,b,c){if(B.c.t(b,c)>0)throw A.j(A.n1(b))
if(this.t(a,b)<0)return b
if(this.t(a,c)>0)return c
return a},
aZ(a,b){var s
if(b>20)throw A.j(A.b8(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaW(a))return"-"+s
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
aP(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.bN(a,b)},
bi(a,b){return(a|0)===a?a/b|0:this.bN(a,b)},
bN(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.j(A.bb("Result of truncating division is "+A.w(s)+": "+A.w(a)+" ~/ "+A.w(b)))},
bL(a,b){var s
if(a>0)s=this.cW(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cW(a,b){return b>31?0:a>>>b},
gS(a){return A.aN(t.H)},
$ih:1,
$ia3:1}
J.bT.prototype={
gS(a){return A.aN(t.S)},
$iB:1,
$ib:1}
J.cS.prototype={
gS(a){return A.aN(t.i)},
$iB:1}
J.b4.prototype={
aO(a,b,c){return a.substring(b,A.lJ(b,c,a.length))},
bs(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.j(B.a1)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
dr(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bs(c,s)+a},
t(a,b){var s
A.I(b)
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
gS(a){return A.aN(t.N)},
gl(a){return a.length},
$iB:1,
$iH:1}
A.bZ.prototype={
q(a){return"LateInitializationError: "+this.a}}
A.ig.prototype={}
A.n.prototype={}
A.k.prototype={
gC(a){var s=this
return new A.r(s,s.gl(s),A.l(s).h("r<k.E>"))},
ga4(a){return this.gl(this)===0},
D(a,b){var s,r,q=this
A.l(q).h("e(k.E)").a(b)
s=q.gl(q)
for(r=0;r<s;++r){if(b.$1(q.T(0,r)))return!0
if(s!==q.gl(q))throw A.j(A.a_(q))}return!1},
c9(a,b,c){var s=A.l(this)
return new A.a0(this,s.K(c).h("1(k.E)").a(b),s.h("@<k.E>").K(c).h("a0<1,2>"))},
aj(a,b){var s,r,q,p=this
A.l(p).h("k.E(k.E,k.E)").a(b)
s=p.gl(p)
if(s===0)throw A.j(A.aA())
r=p.T(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.T(0,q))
if(s!==p.gl(p))throw A.j(A.a_(p))}return r},
E(a,b,c,d){var s,r,q,p=this
d.a(b)
A.l(p).K(d).h("1(1,k.E)").a(c)
s=p.gl(p)
for(r=b,q=0;q<s;++q){r=c.$2(r,p.T(0,q))
if(s!==p.gl(p))throw A.j(A.a_(p))}return r},
dF(a){var s,r=this,q=A.lB(A.l(r).h("k.E"))
for(s=0;s<r.gl(r);++s)q.m(0,r.T(0,s))
return q}}
A.y.prototype={
U(a,b,c,d){var s,r=this.b
A.c8(r,"start")
s=this.c
if(s!=null){A.c8(s,"end")
if(r>s)throw A.j(A.b8(r,0,s,"start",null))}},
gcJ(){var s=J.bm(this.a),r=this.c
if(r==null||r>s)return s
return r},
gcZ(){var s=J.bm(this.a),r=this.b
if(r>s)return s
return r},
gl(a){var s,r=J.bm(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
T(a,b){var s=this,r=s.gcZ()+b
if(b<0||r>=s.gcJ())throw A.j(A.jo(b,s.gl(0),s,"index"))
return J.jl(s.a,r)},
ak(a){var s,r,q,p=this,o=p.b,n=p.a,m=J.cy(n),l=m.gl(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.k_(0,p.$ti.c)
return n}r=A.ha(s,m.T(n,o),!0,p.$ti.c)
for(q=1;q<s;++q){B.a.v(r,q,m.T(n,o+q))
if(m.gl(n)<l)throw A.j(A.a_(p))}return r}}
A.r.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=J.cy(q),o=p.gl(q)
if(r.b!==o)throw A.j(A.a_(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.T(q,s);++r.c
return!0},
$iG:1}
A.ar.prototype={
gC(a){return new A.c0(J.J(this.a),this.b,A.l(this).h("c0<1,2>"))},
gl(a){return J.bm(this.a)}}
A.bN.prototype={$in:1}
A.c0.prototype={
j(){var s=this,r=s.b
if(r.j()){s.a=s.c.$1(r.gn())
return!0}s.a=null
return!1},
gn(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iG:1}
A.a0.prototype={
gl(a){return J.bm(this.a)},
T(a,b){return this.b.$1(J.jl(this.a,b))}}
A.c.prototype={
gC(a){return new A.V(J.J(this.a),this.b,this.$ti.h("V<1>"))}}
A.V.prototype={
j(){var s,r
for(s=this.a,r=this.b;s.j();)if(r.$1(s.gn()))return!0
return!1},
gn(){return this.a.gn()},
$iG:1}
A.bR.prototype={
gC(a){return new A.bS(J.J(this.a),this.b,B.V,this.$ti.h("bS<1,2>"))}}
A.bS.prototype={
gn(){var s=this.d
return s==null?this.$ti.y[1].a(s):s},
j(){var s,r,q=this,p=q.c
if(p==null)return!1
for(s=q.a,r=q.b;!p.j();){q.d=null
if(s.j()){q.c=null
p=J.J(r.$1(s.gn()))
q.c=p}else return!1}q.d=q.c.gn()
return!0},
$iG:1}
A.b9.prototype={
gC(a){var s=this.a
return new A.ba(s.gC(s),this.b,A.l(this).h("ba<1>"))}}
A.bO.prototype={
gl(a){var s=this.a,r=s.gl(s)
s=this.b
if(r>s)return s
return r},
$in:1}
A.ba.prototype={
j(){if(--this.b>=0)return this.a.j()
this.b=-1
return!1},
gn(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gn()},
$iG:1}
A.bP.prototype={
j(){return!1},
gn(){throw A.j(A.aA())},
$iG:1}
A.ce.prototype={
gC(a){return new A.cf(J.J(this.a),this.$ti.h("cf<1>"))}}
A.cf.prototype={
j(){var s,r
for(s=this.a,r=this.$ti.c;s.j();)if(r.b(s.gn()))return!0
return!1},
gn(){return this.$ti.c.a(this.a.gn())},
$iG:1}
A.K.prototype={
sl(a,b){throw A.j(A.bb("Cannot change the length of a fixed-length list"))},
m(a,b){A.aO(a).h("K.E").a(b)
throw A.j(A.bb("Cannot add to a fixed-length list"))}}
A.L.prototype={
gl(a){return this.a.length},
T(a,b){var s=this.a
return J.jl(s,s.length-1-b)}}
A.bi.prototype={$r:"+(1,2)",$s:1}
A.aL.prototype={$r:"+breakthrough,lower,teamSize,upper(1,2,3,4)",$s:2}
A.bA.prototype={$r:"+high,low,selfHigh,selfLow(1,2,3,4)",$s:3}
A.bL.prototype={}
A.bK.prototype={
ga4(a){return this.gl(this)===0},
gaz(a){return this.gl(this)!==0},
q(a){return A.hc(this)},
gal(){return new A.av(this.dh(),A.l(this).h("av<a9<1,2>>"))},
dh(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gal(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.ga9(),o=o.gC(o),n=A.l(s),m=n.y[1],n=n.h("a9<1,2>")
case 2:if(!o.j()){r=3
break}l=o.gn()
k=s.i(0,l)
r=4
return a.b=new A.a9(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$ia8:1}
A.bM.prototype={
gl(a){return this.b.length},
gbE(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
a_(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
i(a,b){if(!this.a_(b))return null
return this.b[this.a[b]]},
a8(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbE()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
ga9(){return new A.be(this.gbE(),this.$ti.h("be<1>"))},
gb_(){return new A.be(this.b,this.$ti.h("be<2>"))}}
A.be.prototype={
gl(a){return this.a.length},
gC(a){var s=this.a
return new A.cg(s,s.length,this.$ti.h("cg<1>"))}}
A.cg.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iG:1}
A.cO.prototype={
ab(a,b){if(b==null)return!1
return b instanceof A.b3&&this.a.ab(0,b.a)&&A.jJ(this)===A.jJ(b)},
gR(a){return A.jt(this.a,A.jJ(this),B.k,B.k)},
q(a){var s=B.a.dm([A.aN(this.$ti.c)],", ")
return this.a.q(0)+" with "+("<"+s+">")}}
A.b3.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.nk(A.j5(this.a),this.$ti)}}
A.hC.prototype={
$0(){return B.b.W(1000*this.a.now())},
$S:5}
A.c9.prototype={}
A.is.prototype={
aa(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.he.prototype={
q(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.bQ.prototype={}
A.cm.prototype={
q(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iaU:1}
A.a6.prototype={
q(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.kQ(r==null?"unknown":r)+"'"},
$iaF:1,
gdL(){return this},
$C:"$1",
$R:1,
$D:null}
A.cF.prototype={$C:"$0",$R:0}
A.cG.prototype={$C:"$2",$R:2}
A.da.prototype={}
A.d9.prototype={
q(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.kQ(s)+"'"}}
A.bp.prototype={
ab(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bp))return!1
return this.$_target===b.$_target&&this.a===b.a},
gR(a){return(A.kL(this.a)^A.d6(this.$_target))>>>0},
q(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.d7(this.a)+"'")}}
A.d8.prototype={
q(a){return"RuntimeError: "+this.a}}
A.aG.prototype={
gl(a){return this.a},
ga4(a){return this.a===0},
ga9(){return new A.a7(this,A.l(this).h("a7<1>"))},
gal(){return new A.b5(this,A.l(this).h("b5<1,2>"))},
a_(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dj(a)},
dj(a){var s=this.d
if(s==null)return!1
return this.bm(this.bD(s,a),a)>=0},
J(a,b){A.l(this).h("a8<1,2>").a(b).a8(0,new A.h4(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.dk(b)},
dk(a){var s,r,q=this.d
if(q==null)return null
s=this.bD(q,a)
r=this.bm(s,a)
if(r<0)return null
return s[r].b},
v(a,b,c){var s,r,q=this,p=A.l(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bx(s==null?q.b=q.bf():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bx(r==null?q.c=q.bf():r,b,c)}else q.dl(b,c)},
dl(a,b){var s,r,q,p,o=this,n=A.l(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.bf()
r=o.c8(a)
q=s[r]
if(q==null)s[r]=[o.bg(a,b)]
else{p=o.bm(q,a)
if(p>=0)q[p].b=b
else q.push(o.bg(a,b))}},
cd(a,b){var s,r,q=this,p=A.l(q)
p.c.a(a)
p.h("2()").a(b)
if(q.a_(a)){s=q.i(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.v(0,a,r)
return r},
an(a,b){var s=this.cv(this.b,b)
return s},
aF(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.be()}},
a8(a,b){var s,r,q=this
A.l(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.j(A.a_(q))
s=s.c}},
bx(a,b,c){var s,r=A.l(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.bg(b,c)
else s.b=c},
cv(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.cw(s)
delete a[b]
return s.b},
be(){this.r=this.r+1&1073741823},
bg(a,b){var s=this,r=A.l(s),q=new A.h8(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.be()
return q},
cw(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.be()},
c8(a){return J.ae(a)&1073741823},
bD(a,b){return a[this.c8(b)]},
bm(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.ay(a[r].a,b))return r
return-1},
q(a){return A.hc(this)},
bf(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ik1:1}
A.h4.prototype={
$2(a,b){var s=this.a,r=A.l(s)
s.v(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.l(this.a).h("~(1,2)")}}
A.h8.prototype={}
A.a7.prototype={
gl(a){return this.a.a},
ga4(a){return this.a.a===0},
gC(a){var s=this.a
return new A.b6(s,s.r,s.e,this.$ti.h("b6<1>"))},
p(a,b){return this.a.a_(b)}}
A.b6.prototype={
gn(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.a_(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iG:1}
A.Y.prototype={
gl(a){return this.a.a},
gC(a){var s=this.a
return new A.ag(s,s.r,s.e,this.$ti.h("ag<1>"))}}
A.ag.prototype={
gn(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.a_(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iG:1}
A.b5.prototype={
gl(a){return this.a.a},
gC(a){var s=this.a
return new A.c_(s,s.r,s.e,this.$ti.h("c_<1,2>"))}}
A.c_.prototype={
gn(){var s=this.d
s.toString
return s},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.a_(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.a9(s.a,s.b,r.$ti.h("a9<1,2>"))
r.c=s.c
return!0}},
$iG:1}
A.j9.prototype={
$1(a){return this.a(a)},
$S:22}
A.ja.prototype={
$2(a,b){return this.a(a,b)},
$S:44}
A.jb.prototype={
$1(a){return this.a(A.I(a))},
$S:33}
A.aC.prototype={
q(a){return this.bP(!1)},
bP(a){var s,r,q,p,o,n=this.cK(),m=this.bd(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.m(m,q)
o=m[q]
l=a?l+A.k6(o):l+A.w(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
cK(){var s,r=this.$s
while($.iP.length<=r)B.a.m($.iP,null)
s=$.iP[r]
if(s==null){s=this.cG()
B.a.v($.iP,r,s)}return s},
cG(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.d(new Array(l),t.Q)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.v(k,q,r[s])}}return A.aH(k,t.K)}}
A.bz.prototype={
bd(){return[this.a,this.b]},
ab(a,b){if(b==null)return!1
return b instanceof A.bz&&this.$s===b.$s&&J.ay(this.a,b.a)&&J.ay(this.b,b.b)},
gR(a){return A.jt(this.$s,this.a,this.b,B.k)}}
A.bh.prototype={
bd(){return this.a},
ab(a,b){if(b==null)return!1
return b instanceof A.bh&&this.$s===b.$s&&A.m4(this.a,b.a)},
gR(a){return A.jt(this.$s,A.lE(this.a),B.k,B.k)}}
A.bu.prototype={
gS(a){return B.ah},
$iB:1}
A.c3.prototype={}
A.cV.prototype={
gS(a){return B.ai},
$iB:1}
A.bv.prototype={
gl(a){return a.length},
$iaf:1}
A.c1.prototype={$in:1,$ia:1,$iq:1}
A.c2.prototype={$in:1,$ia:1,$iq:1}
A.cW.prototype={
gS(a){return B.aj},
$iB:1}
A.cX.prototype={
gS(a){return B.ak},
$iB:1}
A.cY.prototype={
gS(a){return B.al},
$iB:1}
A.cZ.prototype={
gS(a){return B.am},
$iB:1}
A.d_.prototype={
gS(a){return B.an},
$iB:1}
A.d0.prototype={
gS(a){return B.ap},
$iB:1}
A.d1.prototype={
gS(a){return B.aq},
$iB:1}
A.c4.prototype={
gS(a){return B.ar},
gl(a){return a.length},
$iB:1}
A.d2.prototype={
gS(a){return B.as},
gl(a){return a.length},
$iB:1,
$ijx:1}
A.ch.prototype={}
A.ci.prototype={}
A.cj.prototype={}
A.ck.prototype={}
A.as.prototype={
h(a){return A.cq(v.typeUniverse,this,a)},
K(a){return A.ko(v.typeUniverse,this,a)}}
A.dh.prototype={}
A.iT.prototype={
q(a){return A.ab(this.a,null)}}
A.dg.prototype={
q(a){return this.a}}
A.bB.prototype={$iaJ:1}
A.iv.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:32}
A.iu.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:52}
A.iw.prototype={
$0(){this.a.$0()},
$S:21}
A.ix.prototype={
$0(){this.a.$0()},
$S:21}
A.iR.prototype={
cu(a,b){if(self.setTimeout!=null)self.setTimeout(A.dq(new A.iS(this,b),0),a)
else throw A.j(A.bb("`setTimeout()` not found."))}}
A.iS.prototype={
$0(){this.b.$0()},
$S:3}
A.dd.prototype={}
A.iX.prototype={
$1(a){return this.a.$2(0,a)},
$S:61}
A.iY.prototype={
$2(a,b){this.a.$2(1,new A.bQ(a,t.l.a(b)))},
$S:53}
A.j0.prototype={
$2(a,b){this.a(A.f(a),b)},
$S:46}
A.aM.prototype={
gn(){var s=this.b
return s==null?this.$ti.c.a(s):s},
cT(a,b){var s,r,q
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
o.d=null}q=o.cT(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.ki
return!1}if(0>=p.length)return A.m(p,-1)
o.a=p.pop()
m=0
n=null
continue}if(2===q){m=0
n=null
continue}if(3===q){n=o.c
o.c=null
p=o.e
if(p==null||p.length===0){o.b=null
o.a=A.ki
throw n
return!1}if(0>=p.length)return A.m(p,-1)
o.a=p.pop()
m=1
continue}throw A.j(A.k8("sync*"))}return!1},
bS(a){var s,r,q=this
if(a instanceof A.av){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.m(r,q.a)
q.a=s
return 2}else{q.d=J.J(a)
return 2}},
$iG:1}
A.av.prototype={
gC(a){return new A.aM(this.a(),this.$ti.h("aM<1>"))}}
A.ao.prototype={
q(a){return A.w(this.a)},
$iC:1,
gaN(){return this.b}}
A.h2.prototype={
$0(){this.c.a(null)
this.b.cE(null)},
$S:3}
A.bc.prototype={
dn(a){if((this.c&15)!==6)return!0
return this.b.b.br(t.al.a(this.d),a.a,t.y,t.K)},
di(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.dC(q,m,a.b,o,n,t.l)
else p=l.br(t.D.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.aP(s))){if((r.c&1)!==0)throw A.j(A.cC("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.j(A.cC("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.W.prototype={
cj(a,b,c){var s,r,q=this.$ti
q.K(c).h("1/(2)").a(a)
s=$.N
if(s===B.j){if(!t.C.b(b)&&!t.D.b(b))throw A.j(A.et(b,"onError",u.c))}else{c.h("@<0/>").K(q.c).h("1(2)").a(a)
b=A.mQ(b,s)}r=new A.W(s,c.h("W<0>"))
this.b3(new A.bc(r,3,a,b,q.h("@<1>").K(c).h("bc<1,2>")))
return r},
bO(a,b,c){var s,r=this.$ti
r.K(c).h("1/(2)").a(a)
s=new A.W($.N,c.h("W<0>"))
this.b3(new A.bc(s,19,a,b,r.h("@<1>").K(c).h("bc<1,2>")))
return s},
cV(a){this.a=this.a&1|16
this.c=a},
aQ(a){this.a=a.a&30|this.a&1
this.c=a.c},
b3(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.b3(a)
return}r.aQ(s)}A.dp(null,null,r.b,t.M.a(new A.iz(r,a)))}},
bI(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.bI(a)
return}m.aQ(n)}l.a=m.aS(a)
A.dp(null,null,m.b,t.M.a(new A.iE(l,m)))}},
aC(){var s=t.F.a(this.c)
this.c=null
return this.aS(s)},
aS(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
cE(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("aR<1>").b(a))A.iC(a,r,!0)
else{s=r.aC()
q.c.a(a)
r.a=8
r.c=a
A.bd(r,s)}},
bC(a){var s,r=this
r.$ti.c.a(a)
s=r.aC()
r.a=8
r.c=a
A.bd(r,s)},
cF(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aC()
q.aQ(a)
A.bd(q,r)},
b7(a){var s=this.aC()
this.cV(a)
A.bd(this,s)},
cC(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("aR<1>").b(a)){this.bA(a)
return}this.cD(a)},
cD(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dp(null,null,s.b,t.M.a(new A.iB(s,a)))},
bA(a){A.iC(this.$ti.h("aR<1>").a(a),this,!1)
return},
bz(a){this.a^=2
A.dp(null,null,this.b,t.M.a(new A.iA(this,a)))},
$iaR:1}
A.iz.prototype={
$0(){A.bd(this.a,this.b)},
$S:3}
A.iE.prototype={
$0(){A.bd(this.b,this.a.a)},
$S:3}
A.iD.prototype={
$0(){A.iC(this.a.a,this.b,!0)},
$S:3}
A.iB.prototype={
$0(){this.a.bC(this.b)},
$S:3}
A.iA.prototype={
$0(){this.a.b7(this.b)},
$S:3}
A.iH.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dB(t.fO.a(q.d),t.z)}catch(p){s=A.aP(p)
r=A.bH(p)
if(k.c&&t.u.a(k.b.a.c).a===s){q=k.a
q.c=t.u.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.jn(q)
n=k.a
n.c=new A.ao(q,o)
q=n}q.b=!0
return}if(j instanceof A.W&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.u.a(j.c)
q.b=!0}return}if(j instanceof A.W){m=k.b.a
l=new A.W(m.b,m.$ti)
j.cj(new A.iI(l,m),new A.iJ(l),t.p)
q=k.a
q.c=l
q.b=!1}},
$S:3}
A.iI.prototype={
$1(a){this.a.cF(this.b)},
$S:32}
A.iJ.prototype={
$2(a,b){A.cu(a)
t.l.a(b)
this.a.b7(new A.ao(a,b))},
$S:34}
A.iG.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.br(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aP(l)
r=A.bH(l)
q=s
p=r
if(p==null)p=A.jn(q)
o=this.a
o.c=new A.ao(q,p)
o.b=!0}},
$S:3}
A.iF.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.u.a(l.a.a.c)
p=l.b
if(p.a.dn(s)&&p.a.e!=null){p.c=p.a.di(s)
p.b=!1}}catch(o){r=A.aP(o)
q=A.bH(o)
p=t.u.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.jn(p)
m=l.b
m.c=new A.ao(p,n)
p=m}p.b=!0}},
$S:3}
A.de.prototype={}
A.dm.prototype={}
A.cs.prototype={$ikd:1}
A.dl.prototype={
dD(a){var s,r,q
t.M.a(a)
try{if(B.j===$.N){a.$0()
return}A.kx(null,null,this,a,t.p)}catch(q){s=A.aP(q)
r=A.bH(q)
A.jE(A.cu(s),t.l.a(r))}},
bZ(a){return new A.iQ(this,t.M.a(a))},
dB(a,b){b.h("0()").a(a)
if($.N===B.j)return a.$0()
return A.kx(null,null,this,a,b)},
br(a,b,c,d){c.h("@<0>").K(d).h("1(2)").a(a)
d.a(b)
if($.N===B.j)return a.$1(b)
return A.mS(null,null,this,a,b,c,d)},
dC(a,b,c,d,e,f){d.h("@<0>").K(e).K(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.N===B.j)return a.$2(b,c)
return A.mR(null,null,this,a,b,c,d,e,f)},
cf(a,b,c,d){return b.h("@<0>").K(c).K(d).h("1(2,3)").a(a)}}
A.iQ.prototype={
$0(){return this.a.dD(this.b)},
$S:3}
A.j_.prototype={
$0(){A.lq(this.a,this.b)},
$S:3}
A.at.prototype={
cN(){return new A.at(A.l(this).h("at<1>"))},
gC(a){var s=this,r=new A.bf(s,s.r,A.l(s).h("bf<1>"))
r.c=s.e
return r},
gl(a){return this.a},
p(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cH(b)},
cH(a){var s=this.d
if(s==null)return!1
return this.bc(s[this.b8(a)],a)>=0},
m(a,b){var s,r,q=this
A.l(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bB(s==null?q.b=A.jy():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bB(r==null?q.c=A.jy():r,b)}else return q.cz(b)},
cz(a){var s,r,q,p=this
A.l(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jy()
r=p.b8(a)
q=s[r]
if(q==null)s[r]=[p.b6(a)]
else{if(p.bc(q,a)>=0)return!1
q.push(p.b6(a))}return!0},
an(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bK(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bK(s.c,b)
else return s.cR(b)},
cR(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.b8(a)
r=n[s]
q=o.bc(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bQ(p)
return!0},
bB(a,b){A.l(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.b6(b)
return!0},
bK(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bQ(s)
delete a[b]
return!0},
b5(){this.r=this.r+1&1073741823},
b6(a){var s,r=this,q=new A.dk(A.l(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.b5()
return q},
bQ(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.b5()},
b8(a){return J.ae(a)&1073741823},
bc(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.ay(a[r].a,b))return r
return-1},
$ik4:1}
A.dk.prototype={}
A.bf.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.j(A.a_(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iG:1}
A.h9.prototype={
$2(a,b){this.a.v(0,this.b.a(a),this.c.a(b))},
$S:41}
A.E.prototype={
gC(a){return new A.r(a,a.length,A.aO(a).h("r<E.E>"))},
T(a,b){if(!(b>=0&&b<a.length))return A.m(a,b)
return a[b]},
ga4(a){return a.length===0},
gaz(a){return a.length!==0},
gH(a){var s=a.length
if(s===0)throw A.j(A.aA())
if(0>=s)return A.m(a,0)
return a[0]},
gaA(a){var s,r=a.length
if(r===0)throw A.j(A.aA())
s=r-1
if(!(s>=0))return A.m(a,s)
return a[s]},
b2(a,b){return A.Z(a,b,null,A.aO(a).h("E.E"))},
m(a,b){var s
A.aO(a).h("E.E").a(b)
s=a.length
this.sl(a,s+1)
if(!(s<a.length))return A.m(a,s)
a[s]=b},
q(a){return A.jp(a,"[","]")}}
A.F.prototype={
a8(a,b){var s,r,q,p=A.l(this)
p.h("~(F.K,F.V)").a(b)
for(s=this.ga9(),s=s.gC(s),p=p.h("F.V");s.j();){r=s.gn()
q=this.i(0,r)
b.$2(r,q==null?p.a(q):q)}},
aK(a,b,c){var s,r=this,q=A.l(r)
q.h("F.K").a(a)
q.h("F.V(F.V)").a(b)
q.h("F.V()?").a(c)
if(r.a_(a)){s=r.i(0,a)
q=b.$1(s==null?q.h("F.V").a(s):s)
r.v(0,a,q)
return q}q=c.$0()
r.v(0,a,q)
return q},
gal(){return this.ga9().c9(0,new A.hb(this),A.l(this).h("a9<F.K,F.V>"))},
a_(a){return this.ga9().p(0,a)},
gl(a){var s=this.ga9()
return s.gl(s)},
ga4(a){var s=this.ga9()
return s.ga4(s)},
q(a){return A.hc(this)},
$ia8:1}
A.hb.prototype={
$1(a){var s=this.a,r=A.l(s)
r.h("F.K").a(a)
s=s.i(0,a)
if(s==null)s=r.h("F.V").a(s)
return new A.a9(a,s,r.h("a9<F.K,F.V>"))},
$S(){return A.l(this.a).h("a9<F.K,F.V>(F.K)")}}
A.hd.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.w(a)
r.a=(r.a+=s)+": "
s=A.w(b)
r.a+=s},
$S:25}
A.cr.prototype={}
A.bt.prototype={
i(a,b){return this.a.i(0,b)},
a8(a,b){this.a.a8(0,this.$ti.h("~(1,2)").a(b))},
ga4(a){return this.a.a===0},
gaz(a){return this.a.a!==0},
gl(a){return this.a.a},
q(a){return A.hc(this.a)},
gb_(){var s=this.a
return new A.Y(s,A.l(s).h("Y<2>"))},
gal(){var s=this.a
return new A.b5(s,A.l(s).h("b5<1,2>"))},
$ia8:1}
A.cc.prototype={}
A.bw.prototype={
J(a,b){var s
A.l(this).h("a<1>").a(b)
for(s=b.gC(b);s.j();)this.m(0,s.gn())},
q(a){return A.jp(this,"{","}")},
E(a,b,c,d){var s,r,q,p
d.a(b)
s=A.l(this)
s.K(d).h("1(1,2)").a(c)
for(s=A.iO(this,this.r,s.c),r=s.$ti.c,q=b;s.j();){p=s.d
q=c.$2(q,p==null?r.a(p):p)}return q},
D(a,b){var s,r,q=A.l(this)
q.h("e(1)").a(b)
for(q=A.iO(this,this.r,q.c),s=q.$ti.c;q.j();){r=q.d
if(b.$1(r==null?s.a(r):r))return!0}return!1},
$in:1,
$ia:1,
$ijv:1}
A.cl.prototype={
df(a){var s,r,q,p=this,o=p.cN()
for(s=A.iO(p,p.r,A.l(p).c),r=s.$ti.c;s.j();){q=s.d
if(q==null)q=r.a(q)
if(!a.p(0,q))o.m(0,q)}return o}}
A.bC.prototype={}
A.di.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cO(b):s}},
gl(a){return this.b==null?this.c.a:this.aB().length},
ga4(a){return this.gl(0)===0},
ga9(){if(this.b==null){var s=this.c
return new A.a7(s,A.l(s).h("a7<1>"))}return new A.dj(this)},
v(a,b,c){var s,r,q=this
A.I(b)
if(q.b==null)q.c.v(0,b,c)
else if(q.a_(b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.d0().v(0,b,c)},
a_(a){if(this.b==null)return this.c.a_(a)
return!1},
a8(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.a8(0,b)
s=o.aB()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.iZ(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.j(A.a_(o))}},
aB(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.d(Object.keys(this.a),t.s)
return s},
d0(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.U(t.N,t.z)
r=n.aB()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.v(0,o,n.i(0,o))}if(p===0)B.a.m(r,"")
else B.a.aF(r)
n.a=n.b=null
return n.c=s},
cO(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.iZ(this.a[a])
return this.b[a]=s}}
A.dj.prototype={
gl(a){return this.a.gl(0)},
T(a,b){var s=this.a
if(s.b==null)s=s.ga9().T(0,b)
else{s=s.aB()
if(!(b>=0&&b<s.length))return A.m(s,b)
s=s[b]}return s},
gC(a){var s=this.a
if(s.b==null){s=s.ga9()
s=s.gC(s)}else{s=s.aB()
s=new J.b1(s,s.length,A.i(s).h("b1<1>"))}return s},
p(a,b){return this.a.a_(b)}}
A.cH.prototype={}
A.cJ.prototype={}
A.bY.prototype={
q(a){var s=A.cM(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.cU.prototype={
q(a){return"Cyclic error in JSON stringify"}}
A.h5.prototype={
da(a,b){var s=A.mO(a,this.gdc().a)
return s},
au(a,b){var s=A.lW(a,this.gdg().b,null)
return s},
gdg(){return B.af},
gdc(){return B.ae}}
A.h7.prototype={}
A.h6.prototype={}
A.iM.prototype={
cl(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.p.aO(a,r,q)
r=q+1
o=A.a1(92)
s.a+=o
o=A.a1(117)
s.a+=o
o=A.a1(100)
s.a+=o
o=p>>>8&15
o=A.a1(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.a1(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.a1(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.p.aO(a,r,q)
r=q+1
o=A.a1(92)
s.a+=o
switch(p){case 8:o=A.a1(98)
s.a+=o
break
case 9:o=A.a1(116)
s.a+=o
break
case 10:o=A.a1(110)
s.a+=o
break
case 12:o=A.a1(102)
s.a+=o
break
case 13:o=A.a1(114)
s.a+=o
break
default:o=A.a1(117)
s.a+=o
o=A.a1(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.a1(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.a1(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.p.aO(a,r,q)
r=q+1
o=A.a1(92)
s.a+=o
o=A.a1(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.p.aO(a,r,m)},
b4(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.j(new A.cU(a,null))}B.a.m(s,a)},
b0(a){var s,r,q,p,o=this
if(o.ck(a))return
o.b4(a)
try{s=o.b.$1(a)
if(!o.ck(s)){q=A.k0(a,null,o.gbF())
throw A.j(q)}q=o.a
if(0>=q.length)return A.m(q,-1)
q.pop()}catch(p){r=A.aP(p)
q=A.k0(a,r,o.gbF())
throw A.j(q)}},
ck(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.b.q(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.cl(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.b4(a)
q.dI(a)
s=q.a
if(0>=s.length)return A.m(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.b4(a)
r=q.dJ(a)
s=q.a
if(0>=s.length)return A.m(s,-1)
s.pop()
return r}else return!1},
dI(a){var s,r=this.c
r.a+="["
if(J.l5(a)){if(0>=a.length)return A.m(a,0)
this.b0(a[0])
for(s=1;s<a.length;++s){r.a+=","
this.b0(a[s])}}r.a+="]"},
dJ(a){var s,r,q,p,o,n,m=this,l={}
if(a.ga4(a)){m.c.a+="{}"
return!0}s=a.gl(a)*2
r=A.ha(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.a8(0,new A.iN(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.cl(A.I(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.m(r,n)
m.b0(r[n])}p.a+="}"
return!0}}
A.iN.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.v(s,r.a++,a)
B.a.v(s,r.a++,b)},
$S:25}
A.iL.prototype={
gbF(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.cK.prototype={
ab(a,b){if(b==null)return!1
return b instanceof A.cK},
gR(a){return B.c.gR(0)},
q(a){return"0:00:00."+B.p.dr(B.c.q(0),6,"0")}}
A.df.prototype={
q(a){return this.aR()},
$icL:1}
A.C.prototype={
gaN(){return A.lG(this)}}
A.cD.prototype={
q(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cM(s)
return"Assertion failed"}}
A.aJ.prototype={}
A.az.prototype={
gba(){return"Invalid argument"+(!this.a?"(s)":"")},
gb9(){return""},
q(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gba()+q+o
if(!s.a)return n
return n+s.gb9()+": "+A.cM(s.gbn())},
gbn(){return this.b}}
A.c7.prototype={
gbn(){return A.R(this.b)},
gba(){return"RangeError"},
gb9(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.w(q):""
else if(q==null)s=": Not greater than or equal to "+A.w(r)
else if(q>r)s=": Not in inclusive range "+A.w(r)+".."+A.w(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.w(r)
return s}}
A.cN.prototype={
gbn(){return A.f(this.b)},
gba(){return"RangeError"},
gb9(){if(A.f(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gl(a){return this.f}}
A.cd.prototype={
q(a){return"Unsupported operation: "+this.a}}
A.db.prototype={
q(a){return"UnimplementedError: "+this.a}}
A.cb.prototype={
q(a){return"Bad state: "+this.a}}
A.cI.prototype={
q(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.cM(s)+"."}}
A.d3.prototype={
q(a){return"Out of Memory"},
gaN(){return null},
$iC:1}
A.ca.prototype={
q(a){return"Stack Overflow"},
gaN(){return null},
$iC:1}
A.iy.prototype={
q(a){return"Exception: "+this.a}}
A.aE.prototype={
q(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.a.prototype={
c9(a,b,c){var s=A.l(this)
return A.lD(this,s.K(c).h("1(a.E)").a(b),s.h("a.E"),c)},
dH(a,b){var s=A.l(this)
return new A.c(this,s.h("e(a.E)").a(b),s.h("c<a.E>"))},
E(a,b,c,d){var s,r
d.a(b)
A.l(this).K(d).h("1(1,a.E)").a(c)
for(s=this.gC(this),r=b;s.j();)r=c.$2(r,s.gn())
return r},
aG(a,b){var s
A.l(this).h("e(a.E)").a(b)
for(s=this.gC(this);s.j();)if(!b.$1(s.gn()))return!1
return!0},
D(a,b){var s
A.l(this).h("e(a.E)").a(b)
for(s=this.gC(this);s.j();)if(b.$1(s.gn()))return!0
return!1},
gl(a){var s,r=this.gC(this)
for(s=0;r.j();)++s
return s},
cg(a,b){return A.ka(this,b,A.l(this).h("a.E"))},
gH(a){var s=this.gC(this)
if(!s.j())throw A.j(A.aA())
return s.gn()},
gaA(a){var s,r=this.gC(this)
if(!r.j())throw A.j(A.aA())
do s=r.gn()
while(r.j())
return s},
T(a,b){var s,r
A.c8(b,"index")
s=this.gC(this)
for(r=b;s.j();){if(r===0)return s.gn();--r}throw A.j(A.jo(b,b-r,this,"index"))},
q(a){return A.lx(this,"(",")")}}
A.a9.prototype={
q(a){return"MapEntry("+A.w(this.a)+": "+A.w(this.b)+")"}}
A.aa.prototype={
gR(a){return A.z.prototype.gR.call(this,0)},
q(a){return"null"}}
A.z.prototype={$iz:1,
ab(a,b){return this===b},
gR(a){return A.d6(this)},
q(a){return"Instance of '"+A.d7(this)+"'"},
gS(a){return A.nd(this)},
toString(){return this.q(this)}}
A.dn.prototype={
q(a){return""},
$iaU:1}
A.ih.prototype={
gc5(){var s,r=this.b
if(r==null)r=$.hE.$0()
s=r-this.a
if($.jO()===1e6)return s
return s*1000},
bu(){var s=this,r=s.b
if(r!=null){s.a=s.a+($.hE.$0()-r)
s.b=null}}}
A.bx.prototype={
gl(a){return this.a.length},
q(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ilM:1}
A.eu.prototype={}
A.b0.prototype={
gbV(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=t.S,f=A.U(g,g)
for(g=h.y,g=new A.ag(g,g.r,g.e,A.l(g).h("ag<2>")),s=h.a,r=h.z,q=h.Q,p=s.b,o=s.a;g.j();){n=g.d
m=s.a0(n.a)
l=!0
if(n.as){k=n.d
if(k!=null)if(m!=null)if(!m.fx)if(!(m.f<=0)){j=m.a
if(!r.p(0,j)){i=m.as
if(!((i===B.f||i===B.e)&&!q.p(0,j)))if(n.y>=p){l=s.F(k)
l=(l==null?null:l.b)!==o}}}}if(l)continue
n=n.d
n.toString
f.aK(n,new A.dv(),new A.dw())}return f},
P(){var s,r=this,q=r.y,p=A.l(q).h("Y<2>")
q=A.o(new A.Y(q,p),p.h("a.E"))
s=A.jS(r.a,r.b,r.c,q)
s.d=r.d
s.e=r.e
s.f=r.f
s.r=r.r
q=s.w
q.aF(0)
q.J(0,r.w)
q=s.x
q.aF(0)
q.J(0,r.x)
s.z.J(0,r.z)
s.Q.J(0,r.Q)
s.as.J(0,r.as)
s.at.J(0,r.at)
s.ay.J(0,r.ay)
s.ax.J(0,r.ax)
s.ch.J(0,r.ch)
return s},
u(a){var s=this.a.u(a),r=A.i(s),q=r.h("c<1>")
s=A.o(new A.c(s,r.h("e(1)").a(new A.dT(this)),q),q.h("a.E"))
return s},
O(a){var s
if(a.ax==null){s=this.x.i(0,a.a)
if(s==null)s=a.d}else s=a.gZ()
return s},
L(a){var s,r=this.u(a).length,q=this.gbV().i(0,a)
if(q==null)q=0
s=this.at.p(0,a)?1:0
return r+q+s},
bW(a){var s,r=this,q=r.a.r,p=A.i(q)
p=new A.c(q,p.h("e(1)").a(new A.dx(r,a)),p.h("c<1>")).gl(0)
q=r.gbV().i(0,a)
if(q==null)q=0
s=r.at.p(0,a)?1:0
return p+q+s},
a7(a){var s=a.a
if(B.a.D(this.u(s),new A.dQ()))return 2
return this.ax.p(0,s)||this.aM(a)?0:1},
aM(a){return this.ch.cd(a.a,new A.e5(this,a))},
ce(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=A.b7(t.S)
for(s=J.l9(t.W.a(a),g.b.w.go),s=s.gC(s),r=g.c,q=g.a;s.j();){p=s.gn()
o=q.gM()
n=o.$ti
m=n.h("c<a.E>")
l=A.o(new A.c(o,n.h("e(a.E)").a(new A.dZ(g)),m),m.h("a.E"))
B.a.B(l,new A.e_(p))
o=A.i(l)
n=o.h("y<1>")
m=new A.y(l,0,3,n)
m.U(l,0,3,o.c)
m=new A.r(m,m.gl(0),n.h("r<k.E>"))
p=p.f
n=n.h("k.E")
k=null
j=1/0
while(m.j()){o=m.d
i=o==null?n.a(o):o
o=i.e
h=r.ac(o,p.X(o))
if(h<j){j=h
k=i}}if(k!=null)f.m(0,k.a)}return f},
aq(a){var s,r,q,p,o,n,m,l,k=this,j=a.c,i=k.a.F(j)
if(i==null)return!1
s=k.u(j)
j=A.i(s)
r=j.h("e(1)")
j=j.h("c<1>")
q=A.aB(new A.c(s,r.a(new A.dA()),j),t.r)
if(q!=null){if(s.length<=2||a.a===q.a)return!1
p=A.o(new A.c(s,r.a(new A.dB(q)),j),j.h("a.E"))
B.a.B(p,new A.dC(k,i))
j=B.a.gH(p)
r=k.b
o=k.O(i)
n=r.b.i(0,"soldierLimit")
n.toString
m=A.i(p)
return a.a!==new A.c(p,m.h("e(1)").a(new A.dD(k,i,A.dr(j,r,o,B.b.k(n)))),m.h("c<1>")).gaA(0).a}if(k.aM(i))return!(a.x>=15&&a.w<12)
if(s.length<=1)return!1
o=new A.dH(k,i)
B.a.B(s,new A.dE(o))
l=A.o(new A.c(s,r.a(A.n5()),j),j.h("a.E"))
B.a.B(l,new A.dF())
if(l.length!==0)return a.a!==B.a.gH(l).a
n=o.$1(B.a.gH(s))
if(typeof n!=="number")return n.bs()
return a.a!==new A.c(s,r.a(new A.dG(o,n*0.6)),j).gaA(0).a},
ae(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d="monthSeconds",c=e.b,b=c.b,a=b.i(0,d)
a.toString
s=b.i(0,"budgetSafety")
s.toString
r=Math.min(c.w.p1,a+s)
c=e.a
a=c.r
s=A.i(a)
q=s.h("e(1)")
s=s.h("c<1>")
p=t.S
o=new A.c(a,q.a(new A.dI(e)),s).E(0,e.r,new A.dJ(),p)
n=new A.c(a,q.a(new A.dK(e)),s).E(0,e.r,new A.dL(),p)
s=c.gM()
q=s.$ti
a=q.h("c<a.E>")
m=A.o(new A.c(s,q.h("e(a.E)").a(new A.dM(e)),a),a.h("a.E"))
if(m.length===0)a=0
else{a=c.gai().r
if(a==null){a=b.i(0,"countryIncome")
a.toString
a=B.b.k(a)}s=b.i(0,"poorPenalty")
s.toString
s=a-B.b.k(s)
a=s}l=new A.dP(e,o,a+B.a.E(m,0,new A.dN(e),p),n,e.gbo())
k=A.lC([r],t.i)
j=A.d([],t.n)
i=c.e
c=r+1e-9
h=i
while(h<=c){k.m(0,h)
B.a.m(j,h)
a=b.i(0,d)
a.toString
h+=a}for(c=A.iO(k,k.r,k.$ti.c),a=c.$ti.c,g=0;c.j();){s=c.d
if(s==null)s=a.a(s)
if(s+1e-9<i)f=0
else{q=b.i(0,d)
q.toString
f=1+B.b.W((s-i)/q)}if(B.a.D(j,new A.dO(s)))g=Math.max(g,A.j4(l.$1(Math.max(0,f-1))))
g=Math.max(g,A.j4(l.$1(f)))}c=Math.max(0,g)
if(a0)b=0
else{b=b.i(0,"emergencyGold")
b.toString
b=B.b.k(b)}return new A.eu(c+b)},
V(){return this.ae(!1)},
aL(a,b){var s,r,q,p,o,n,m,l,k=this,j="capacityPerLevel",i=!0
if(a.as)if(!k.ay.p(0,a.a))if(b.dy){i=b.a
i=k.z.p(0,i)||k.Q.p(0,i)}if(i)return!1
i=k.x
s=a.a
r=i.i(0,s)
r.toString
q=k.b
p=q.c
o=p.length
if(r>o)n=null
else{m=r-1
if(!(m>=0))return A.m(p,m)
n=B.c.A(p[m]-b.x,0,99999)}if(r>=q.af(k.a.c)||n==null||k.d<=n)return!1
if(a.b===a.c)l=1
else{p=q.b.i(0,"foreignYield")
p.toString
l=p}p=k.f
o=r+1
q=q.b
m=q.i(0,j)
m.toString
m=B.b.W(o*B.b.k(m)*l)
q=q.i(0,j)
q.toString
k.f=p+(m-B.b.W(r*B.b.k(q)*l))
k.d=k.d-n
i.v(0,s,o)
k.ay.m(0,s)
return!0},
gbo(){return this.a.gM().E(0,0,new A.dU(this),t.S)},
c4(a){var s,r,q,p,o,n=this
if(!a.dx||a.e===2||n.z.p(0,a.a))return!1
s=a.as
r=s!==B.f
if(!r||s===B.e){q=a.c
q=!n.ax.p(0,q)&&n.u(q).length<=1}else q=!1
if(q)return!1
q=a.a
n.z.m(0,q)
n.y.an(0,q)
n.as.m(0,q)
n.d=n.d+a.x
q=n.f
p=n.e
n.e=Math.min(q,p+(!r||s===B.e?a.gN():0))
if(!r||s===B.e)for(s=a.ax,r=s.length,q=n.w,o=0;o<r;++o)q.aK(s[o],new A.dR(),new A.dS())
return!0},
gbT(){var s=this.d,r=this.b.b.i(0,"soldierCost")
r.toString
return Math.max(0,B.c.aP(s,B.b.k(r)))},
aE(a){var s,r=this,q=r.b.b.i(0,"soldierCost")
q.toString
s=a*B.b.k(q)
if(a>0){q=r.d
q=q<=0||s>q||r.e+a>r.f}else q=!0
if(q)return!1
r.d-=s
r.e+=a
return!0},
c_(a){var s=this,r=s.b.r.i(0,a),q=!0
if(r!=null)if(r.f)if(s.a.c>=r.e){q=s.d
q=q<=0||q<r.b}if(q)return!1
s.d=s.d-r.b
s.w.aK(a,new A.dy(),new A.dz())
return!0},
bq(a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d="drawCost",c=e.b,b=c.b,a=b.i(0,d)
a.toString
s=e.a
r=s.y
q=B.b.k(a)+r
a=s.r
p=A.i(a)
o=t.S
n=new A.c(a,p.h("e(1)").a(new A.dV(e)),p.h("c<1>")).E(0,e.r+r,new A.dW(),o)
p=s.gai().r
if(p==null){a=b.i(0,"countryIncome")
a.toString
a=B.b.k(a)}else a=p
p=s.gM()
m=p.$ti
l=a+new A.c(p,m.h("e(a.E)").a(new A.dX(e)),m.h("c<a.E>")).E(0,0,new A.dY(e),o)
o=b.i(0,"garrisonFree")
k=B.b.k(o==null?2:o)
a=b.i(0,"garrisonFactor")
j=B.b.k(a==null?0:a)
a=a0.a
i=e.L(a)
h=e.gbo()+A.js(i+1,j,k)-A.js(i,j,k)
p=n+h
if(p<=l*(a1?1.3:1.1)){if(a1)c=1
else if(a2==null)c=c.w.r
else{c=A.aQ(a2,s,c,null)
o=c.e.w
if(c.ga3()){m=o.r
c=Math.max(m,Math.min(o.as,m+c.gaV()*0.2))}else c=o.r}g=n<=l*c}else g=!1
f=(s.c>=3||a1||p<=l)&&e.d-q>=e.ae(a1).a+r+Math.max(0,h-e.gbo())
c=!0
if(a0.Q){p=e.at
if(!p.p(0,a))if(s.x>p.a){s=e.d
b=b.i(0,d)
b.toString
if(s>B.b.k(b))if(e.d>=q)c=!(g||f)}}if(c)return!1
e.d-=q
e.r+=r
e.at.m(0,a)
return!0},
dv(a,b){return this.bq(a,!1,b)},
du(a,b){return this.bq(a,b,null)},
dd(a,b,c){var s,r,q,p,o,n,m,l=this
t.L.a(b)
if(a.cy){s=a.a
s=l.as.p(0,s)||l.z.p(0,s)}else s=!0
if(s)return!1
s=a.c
r=!1
if(l.u(s).length<=1){q=l.a
if(q.F(s)!=null){q=q.F(s)
q.toString
q=l.aM(q)}else q=!1
if(!q){r=!(l.ax.p(0,s)&&c.b==="evacuate"&&c.as)
s=r}else s=r}else s=r
if(s)return!1
s=l.w
r=t.S
p=A.k3(s,r,r)
r=b.length
q=l.b.b
o=q.i(0,"carryLimit")
o.toString
if(r>B.b.k(o))return!1
for(r=b.length,n=0;n<b.length;b.length===r||(0,A.v)(b),++n){m=b[n]
o=p.i(0,m)
if((o==null?0:o)===0)return!1
o=p.i(0,m)
o.toString
p.v(0,m,o-1)}s.aF(0)
s.J(0,p)
s=l.e
q=q.i(0,"soldierLimit")
q.toString
l.e=s-Math.min(s,B.b.k(q)-a.gN())
q=a.a
l.Q.m(0,q)
l.as.m(0,q)
l.y.v(0,q,c)
return!0},
dw(a,b){var s
if(!a.db||this.as.p(0,a.a)||a.fx)return!1
s=a.a
this.as.m(0,s)
this.y.v(0,s,b)
return!0}}
A.dv.prototype={
$1(a){return A.f(a)+1},
$S:7}
A.dw.prototype={
$0(){return 1},
$S:5}
A.dT.prototype={
$1(a){var s=this.a,r=t.r.a(a).a
return!s.z.p(0,r)&&!s.Q.p(0,r)},
$S:0}
A.dx.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.c===this.b&&a.f>0&&!a.fx&&!s.z.p(0,a.a)},
$S:0}
A.dQ.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.e5.prototype={
$0(){var s,r,q,p,o,n,m,l,k,j=new A.e6(),i=this.b,h=this.a,g=h.a
if(i.b===g.a){s=g.gM().gl(0)
r=j.$1(i)
q=h.b
p=q.b.i(0,"marchSpeed")
p.toString
o=B.a.aj(q.e,B.A)
n=g.f
m=A.i(n)
l=m.h("e(1)").a(new A.e0(h))
j=m.h("+(t,h)(1)").a(new A.e1(j))
g=g.r
k=A.i(g)
q=A.ns(i.e,new A.ar(new A.c(g,k.h("e(1)").a(new A.e2(h)),k.h("c<1>")),k.h("+(t,e)(1)").a(new A.e3(i)),k.h("ar<1,+(t,e)>")),new A.ar(new A.c(n,l,m.h("c<1>")),j,m.h("ar<1,+(t,h)>")),p*o,i.ax!=null,s,r,q.w.b)
j=q}else j=!1
return j},
$S:37}
A.e6.prototype={
$1(a){return B.a.E(a.f.a,0,new A.e4(a),t.i)},
$S:39}
A.e4.prototype={
$2(a,b){return Math.max(A.am(a),this.a.e.G(t.c1.a(b)))},
$S:42}
A.e0.prototype={
$1(a){return t.q.a(a).b!==this.a.a.a},
$S:1}
A.e1.prototype={
$1(a){t.q.a(a)
return new A.bi(a.e,this.a.$1(a))},
$S:36}
A.e2.prototype={
$1(a){var s
t.r.a(a)
if(a.b!==this.a.a.a){s=a.as
s=!(s===B.f||s===B.e)&&!a.fx&&a.f>0}else s=!1
return s},
$S:0}
A.e3.prototype={
$1(a){t.r.a(a)
return new A.bi(a.z,a.p2===this.a.a)},
$S:62}
A.dZ.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.a
r=a.a
q=!1
if(!s.ax.p(0,r))if(a.Q)s=a.ax==null||s.L(r)<s.O(a)
else s=q
else s=q
return s},
$S:1}
A.e_.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.G(s),b.e.G(s))},
$S:4}
A.dA.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.dB.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.dC.prototype={
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
o=A.dr(b,s,q,B.b.k(o))
r=m.O(r)
p=p.i(0,n)
p.toString
return B.b.t(o,A.dr(a,s,r,B.b.k(p)))},
$S:2}
A.dD.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=s.b
s=s.O(this.b)
q=r.b.i(0,"soldierLimit")
q.toString
return A.dr(a,r,s,B.b.k(q))>=this.c*0.6},
$S:0}
A.dH.prototype={
$1(a){var s=this.a,r=s.b,q=s.O(this.b),p=r.b.i(0,"soldierLimit")
p.toString
return A.dr(a,r,q,Math.min(B.b.k(p),s.e))},
$S:23}
A.dE.prototype={
$2(a,b){var s,r=t.r
r.a(a)
s=this.a
return J.l4(s.$1(r.a(b)),s.$1(a))},
$S:2}
A.dF.prototype={
$2(a,b){var s,r=t.r
r.a(a)
r.a(b)
s=B.c.t(b.x,a.x)
return s!==0?s:B.c.t(a.w,b.w)},
$S:2}
A.dG.prototype={
$1(a){var s=this.a.$1(t.r.a(a))
if(typeof s!=="number")return s.dM()
return s>=this.b},
$S:0}
A.dI.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.p(0,a.a)},
$S:0}
A.dJ.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:9}
A.dK.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=s.a
return a.b===r.a&&a.f>0&&!s.z.p(0,a.a)&&a.p3===r.d},
$S:0}
A.dL.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:9}
A.dM.prototype={
$1(a){return!this.a.ax.p(0,t.q.a(a).a)},
$S:1}
A.dN.prototype={
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
$S:8}
A.dP.prototype={
$1(a){var s,r,q,p=this
if(a===0)s=0
else{s=p.a
r=s.a
q=r.gai()
s=s.b.b.i(0,"monthSeconds")
s.toString
s=a*(p.b-p.c)-p.d+B.b.aw(q.w+p.e*(r.e/s+a-1))}return s},
$S:7}
A.dO.prototype={
$1(a){return Math.abs(A.am(a)-this.a)<1e-7},
$S:14}
A.dU.prototype={
$2(a,b){var s,r,q
A.f(a)
s=this.a
r=s.L(t.q.a(b).a)
s=s.b.b
q=s.i(0,"garrisonFree")
q=B.b.k(q==null?2:q)
s=s.i(0,"garrisonFactor")
return a+A.js(r,B.b.k(s==null?0:s),q)},
$S:8}
A.dR.prototype={
$1(a){return A.f(a)+1},
$S:7}
A.dS.prototype={
$0(){return 1},
$S:5}
A.dy.prototype={
$1(a){return A.f(a)+1},
$S:7}
A.dz.prototype={
$0(){return 1},
$S:5}
A.dV.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.p(0,a.a)},
$S:0}
A.dW.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:9}
A.dX.prototype={
$1(a){return!this.a.ax.p(0,t.q.a(a).a)},
$S:1}
A.dY.prototype={
$2(a,b){var s,r,q
A.f(a)
t.q.a(b)
s=this.a
r=s.x.i(0,b.a)
if(r==null)r=b.d
s=s.b.b
q=s.i(0,"incomeStep")
q.toString
q=B.b.k(q)
if(b.b===b.c)s=1
else{s=s.i(0,"foreignYield")
s.toString}return a+B.b.W((b.z+(r-1)*q)*s)},
$S:8}
A.ey.prototype={
ga3(){var s=this
return s.a!==s.d.a&&s.b>=s.e.w.w},
gbb(){return Math.max(0,this.b-this.e.w.w)},
gaV(){if(this.ga3()){var s=this.e.w
s=Math.max(0,s.x+this.gbb()*s.y)}else s=0
return s},
ci(a,b){return a===0||!this.ga3()||b<=1?a:Math.min(this.e.w.fy,a+1+B.c.bi(this.gbb(),2))}}
A.ez.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.eA.prototype={
$2(a,b){var s,r
A.f(a)
t.q.a(b)
s=this.a
s=s==null?null:s.i(0,b.a)
if(s==null)s=b.d
r=this.b.b.i(0,"incomeStep")
r.toString
return a+b.z+(s-1)*B.b.k(r)},
$S:8}
A.b2.prototype={
aR(){return"CombatAdvantage."+this.b}}
A.bJ.prototype={}
A.eB.prototype={
ar(b8,b9,c0,c1,c2,c3,c4,c5,c6,c7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6=this,b7="soldierHp"
t.eg.a(c3)
s=c3==null?b8.ax:c3
r=b9.ax
q=c6==null
p=q?b8.gN():c6
o=c2==null
n=o?b9.gN():c2
m=b8.f
l=b8.at
k=b9.f
j=b9.at
i=b8.a+":"+A.w(m)+":"+b8.w+":"+A.w(l)+":"+A.w(b8.ay)+":"+b9.a+":"+A.w(k)+":"+b9.w+":"+A.w(j)+":"+A.w(b9.ay)+":"+c4+":"+c0+":"+c7+":"+p+":"+n+":"+A.w(s)+":"+A.w(r)+":0:"+c5+":"+c1
h=b6.c
g=h.i(0,i)
if(g!=null)return g
if(!b6.b.d1())return B.a4
if(q)q=B.a.E(l,0,new A.eC(),t.H)
else{q=b6.a.b.i(0,b7)
q.toString
q=p*B.b.k(q)}f=m+q
q=b6.a
l=q.b
e=l.i(0,b7)
e.toString
d=B.b.k(e)
c=Math.min(n,B.b.W(0/d))
b=c*d+Math.max(0,0-n*d)
if(o)o=B.a.E(j,0,new A.eD(),t.H)
else{o=l.i(0,b7)
o.toString
o=n*B.b.k(o)}a=k+o
o=c4===0
a0=b6.bR(s,o&&m>0,c5)
a1=c0===0
a2=b6.bR(r,a1&&k>0,c1)
a1=o&&a1
a3=b6.bG(b8,p,c4,c7,a1)
a4=b6.bG(b9,n-c,c0,c7,a1)
o=a0.a
m=o[0]
a5=m>=a&&a2.a[0]>=f||o[2]>=f
l=a2.a
a6=Math.max(0,f-l[0]-o[2])
a7=Math.max(0,a-o[1]-l[3]-b)
a8=Math.max(0,f-l[1]-o[3])
a9=Math.max(0,a-m-l[2]-b)
b0=Math.max(1,f*a3+a*a4)
b1=(a6*a3*0.9-a7*a4*1.1)/b0
b2=(a8*a3*1.1-a9*a4*0.9)/b0
b3=q.w.RG
if(a5)b4=B.K
else if(b1>b3)b4=B.h
else{q=b2<-b3?B.r:B.a3
b4=q}q=A.d([],t.s)
if(c4>0||c0>0)q.push("\u57ce\u9632\u589e\u52a0\u653b\u51fb\u4e0e\u5f00\u573a\u58eb\u6c14\uff0c\u5b88\u65b9\u6b66\u5668\u8d21\u732e\u4e3a\u96f6")
if(s.length>1)q.push("\u672c\u6b21\u5bf9\u9635\u53ea\u8ba1\u9996\u4ef6\u6b66\u5668\uff0c\u5176\u4f59\u7559\u5f85\u4e0b\u4e00\u4f4d\u5b88\u5c06")
if(a5)q.push("\u5b58\u5728\u5148\u624b\u81f4\u547d\u6216\u81ea\u4f24\u98ce\u9669")
q.push("\u4f59\u91cf\u4e3a\u9759\u6001\u98ce\u9669\u6307\u6807\uff0c\u5e76\u975e\u80dc\u7387")
b5=new A.bJ(b4,b1,b2,a5)
if(h.a>=256)h.an(0,new A.a7(h,A.l(h).h("a7<1>")).gH(0))
h.v(0,i,b5)
return b5},
d5(a,b,c,d,e){return this.ar(a,b,c,d,null,null,0,e,null,0)},
d7(a,b,c,d,e,f){return this.ar(a,b,c,!0,d,e,0,!0,f,0)},
d8(a,b,c,d,e,f,g,h){return this.ar(a,b,c,d,e,f,0,g,h,0)},
d4(a,b,c,d){return this.ar(a,b,0,!0,null,null,c,!0,d,0)},
c1(a,b,c,d,e){return this.ar(a,b,c,d,e,null,0,!0,null,0)},
bk(a,b,c,d,e,f){return this.ar(a,b,0,c,null,null,d,e,f,0)},
d6(a,b,c,d,e){return this.ar(a,b,0,c,null,null,0,d,null,e)},
bG(a,b,c,d,e){var s,r,q=this.a,p=q.bj(a.w,c,e,d),o=q.b.i(0,"soldierPower")
o.toString
o=B.b.k(o)
s=B.b.aI(a.ay)
r=q.cb(s,e?0:c)
return(B.c.bi(p+b*o+2,4)+1)*1.5*(1+B.b.A(r/1000,0,0.1))},
bR(a,b,c){var s,r,q,p,o,n,m,l,k
t.L.a(a)
if(!b)return new A.bA([0,0,0,0])
for(s=this.a,r=s.r,s=s.b,q=0,p=0,o=0,n=0,m=0;l=a.length,m<Math.min(l,1);++m){if(!(m<l))return A.m(a,m)
k=r.i(0,a[m])
if(k==null)continue
l=m===0
if(l&&c){q+=k.c
o+=k.d}if(!(l&&c)){l=s.i(0,"weaponChance")
l.toString
l=l>0}else l=!0
if(l){p+=k.c
n+=k.d}}return new A.bA([p,q,n,o])}}
A.eC.prototype={
$2(a,b){return A.x(a)+A.am(b)},
$S:15}
A.eD.prototype={
$2(a,b){return A.x(a)+A.am(b)},
$S:15}
A.j8.prototype={
$2(a,b){var s
A.x(a)
s=this.a.r.i(0,A.f(b))
s=s==null?null:s.c
if(s==null)s=0
return a+s*this.b.w},
$S:45}
A.cB.prototype={
I(){var s=this
return A.Q(["interval",s.a,"resourceInterval",s.e,"cashBuffer",s.f,"payrollRatio",s.r,"dangerousCountryCities",s.w,"coalitionBudgetBase",s.x,"coalitionBudgetStep",s.y,"coalitionTargetBase",s.z,"coalitionTargetStep",s.Q,"coalitionPayrollCeiling",s.as,"coalitionTravel",s.at,"targetTravelScale",s.ax,"hatredTargetBonus",s.ay,"breakthroughMargin",s.ch,"threat",s.b,"urgent",s.c,"margin",s.d,"commit",s.CW,"rearExtra",s.cy,"candidates",s.db,"assessments",s.dx,"routes",s.dy,"plans",s.fr,"commands",s.fx,"team",s.fy,"fronts",s.k1,"singleFrontMonths",s.k2,"splitForce",s.k3,"splitAdvantage",s.k4,"arrivalSpread",s.ok,"expeditionSeconds",s.p1,"assaultCommitDistance",s.p2,"recallCriticalMargin",s.p3,"attritionCombat",s.p4,"attritionGain",s.R8,"targets",s.go,"slice",s.id,"advantage",s.RG,"expansion",s.ry,"credit",s.rx,"age",s.cx,"timeout",s.to,"restarts",s.x1,"stagnation",s.x2],t.N,t.X)}}
A.au.prototype={}
A.eF.prototype={
bv(){return new A.av(this.cr(),t.gL)},
cr(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9,k0,k1,k2,k3,k4,k5,k6,k7,k8
return function $async$bv(k9,l0,l1){if(l0===1){p.push(l1)
r=q}for(;;)switch(r){case 0:k6={}
k7=s.c
k8=s.a
if(k7.b!==k8.a||k7.c!==s.b.a)throw A.j(B.a9)
o=k7.Q
n=o.f
if(n.length>64||o.r.length>256||o.w.length>32)throw A.j(B.aa)
m=s.e
m===$&&A.O()
l=s.f
l===$&&A.O()
k=new A.ij(o,k8,m,l)
j=o.gM(),i=J.J(j.a),j=new A.V(i,j.b,j.$ti.h("V<1>")),h=s.x
case 3:if(!j.j()){r=4
break}g=i.gn()
h.v(0,g.a,k.dz(g))
r=5
return k9.b=0,1
case 5:r=3
break
case 4:j=A.l(h).h("Y<2>")
f=new A.Y(h,j).D(0,new A.f2())
i=k7.x
g=i===B.o
if(g&&f){k7=s.d
s.w=new A.bq("defending",null,0,1,B.M,A.d(["\u4e3b\u89d2\u6240\u5728\u57ce\u5c1a\u6709\u660e\u786e\u751f\u547d\u98ce\u9669\uff0c\u6682\u505c\u65b0\u8fdc\u5f81\uff0c\u4f18\u5148\u5b8c\u6210\u9632\u5b88\u8c03\u5ea6"],t.s),k7.e,k7.c,k7.d,0)
r=1
break}e=k7.as
d=A.i(e)
c=d.h("c<1>")
e=A.o(new A.c(e,d.h("e(1)").a(new A.f3(s)),c),c.h("a.E"))
b=A.jS(o,k8,m,e)
k6.a=b
r=i===B.G?6:7
break
case 6:o=s.r
o===$&&A.O()
s.w=new A.hF(k7,k8,o,l,h).ds(b)
r=8
return k9.b=1,1
case 8:r=1
break
case 7:e=t.Z
a=A.d([],e)
d=t.s
a0=A.d([],d)
c=s.d
a1=s.r
a1===$&&A.O()
a2=new A.fr(k7,k8,c,l,a1,h)
a3=j.h("c<a.E>")
a4=A.o(new A.c(new A.Y(h,j),j.h("e(a.E)").a(new A.f4()),a3),a3.h("a.E"))
B.a.B(a4,new A.ff())
j=t.bQ
a5=A.d([new A.au(k6.a,A.d([],e),A.d([],d),0,0)],j)
a3=g?A.d([],t.bL):a4
a6=a3.length
a7=t.N
a8=t.S
a9=k8.w
b0=a9.fx
b1=t.I
b2=t.dp
b3=t.aQ
b4=a9.fr
b5=0
case 9:if(!(b5<a3.length)){r=11
break}b6=a3[b5]
b7=A.d([],j)
b8=a5.length,b9=0
case 12:if(!(b9<a5.length)){r=14
break}c0=a5[b9]
c1=a2.c0(b6,c0.a),c2=c1.$ti,c1=new A.aM(c1.a(),c2.h("aM<1>")),c3=c0.d,c4=c0.e,c5=c0.c,c6=c0.b,c2=c2.c
case 15:if(!c1.j()){r=16
break}c7=c1.b
if(c7==null)c7=c2.a(c7)
c8=A.o(c6,b1)
B.a.J(c8,c7.b)
if(B.a.E(c8,0,new A.fk(),a8)>b0){c.e=!0
r=15
break}c9=c7.a
d0=A.o(c5,a7)
d1=c7.e
if(d1.length!==0)d0.push(d1)
d1=c7.c
c7=c7.d?1:0
B.a.m(b7,new A.au(c9,c8,d0,c3+d1,c4+c7))
r=17
return k9.b=1,1
case 17:r=15
break
case 16:case 13:a5.length===b8||(0,A.v)(a5),++b9
r=12
break
case 14:if(b7.length!==0){B.a.B(b7,new A.fl())
b8=A.f(Math.min(4,b4))
c1=new A.y(b7,0,b8,b3)
c1.U(b7,0,b8,b2)
a5=c1.ak(0)}case 10:a3.length===a6||(0,A.v)(a3),++b5
r=9
break
case 11:if(a4.length!==0&&!g){d2=B.a.gH(a5)
k6.a=d2.a
B.a.J(a,d2.b)
B.a.J(a0,d2.c)
j=d2.e
if(j>0){j=""+j
B.a.m(a0,c.e?"\u89c4\u5212\u914d\u989d\u5df2\u7528\u5c3d\uff1a"+j+" \u5ea7\u57ce\u5c1a\u672a\u627e\u5230\u5b8c\u6574\u65b9\u6848\uff0c\u4e0d\u80fd\u636e\u6b64\u65ad\u5b9a\u65e0\u6cd5\u633d\u6551":"unsalvageableDefense\uff1a"+j+" \u5ea7\u57ce\u5728\u5f53\u524d\u9501\u5b9a\u3001\u8d44\u91d1\u6216\u65f6\u9650\u4e0b\u672a\u627e\u5230\u5b8c\u6574\u4fee\u590d\u65b9\u6848")}d3="defending"}else d3="preparing"
if(a4.length!==0)d3="defending"
if(!g){d4=s.cQ(k6.a)
if(d4!=null){k6.a=d4.a
B.a.m(a,d4.b)
B.a.m(a0,"\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5176\u4ed6\u5b89\u5168\u57ce\u6c60\u7ee7\u7eed\u7ec4\u7ec7\u8fdb\u653b")}}r=18
return k9.b=2,1
case 18:for(j=o.r,g=A.i(j),a3=g.h("e(1)"),a6=a3.a(new A.fm(s)),g=g.h("c<1>"),b1=g.h("e(a.E)").a(new A.fn(s)),a6=new A.c(j,a6,g).gC(0),b1=new A.V(a6,b1,g.h("V<a.E>")),b2=t.w,b3=t.e,b4=t.Y,b8=k8.b;b1.j();){c1=a6.gn()
if(c1.e!==1||B.a.D(c1.ax,new A.fo(s)))continue
d5=o.a0(c1.id)
if(d5==null)continue
d6=o.F(c1.CW)
d7=!1
if(c1.as===B.x)if(d6!=null){if(c1.gN()<d5.gN()){c2=d6.ax
if(c2==null)c2=d6.d
else{c3=d6.ay
c4=d6.db?1:0
c4=B.c.A(c2-c3-c4,0,5)
c2=c4}c2=l.d5(c1,d5,c2,!1,!1).c<0}else c2=d7
d7=c2}d8=!1
if(c1.f<c1.r*0.25)if(c1.k1>=2){c2=c1.k2
if(c2>0){c3=c1.gbl()
c4=d5.gbl()
c5=Math.max(1,c1.k3)
c6=b8.i(0,"retreatSurvivalRatio")
c6.toString
c6=c3/c2<c4/c5*c6
c2=c6}else c2=d8
d8=c2}if(!d7&&!d8)continue
c2=k6.a
c3=c1.a
if(c2.as.p(0,c3))continue
k6.a.as.m(0,c3)
c2=d7?"\u9ad8\u7ea7\u5c06\u9886\u6b66\u5668\u5df2\u6d88\u8017\u4e14\u5175\u529b\u843d\u540e\uff0c\u5f53\u524d\u5c5e\u6027\u5df2\u4e0d\u9002\u5408\u7ee7\u7eed\u653b\u57ce\uff0c\u8d81\u4ecd\u6709\u751f\u547d\u7533\u8bf7\u5408\u6cd5\u64a4\u9000\u6574\u5907":"\u9ad8\u7ea7\u5c06\u9886\u751f\u547d\u4f4e\u4e8e\u56db\u5206\u4e4b\u4e00\uff0c\u5df2\u53d1\u751f\u7684\u4f24\u5bb3\u663e\u793a\u80dc\u671b\u6e3a\u832b\uff0c\u7533\u8bf7\u6709\u98ce\u9669\u7684\u5408\u6cd5\u64a4\u9000"
c3=A.d([new A.A(B.R,c3,null,null,0,B.d)],b2)
c4=A.d([c1,d5],b3)
c1=o.F(c1.c)
c1.toString
B.a.m(a,new A.P(c2,c3,a1.ag(c4,A.d([c1],b4)),B.q,0,!0))}r=19
return k9.b=3,1
case 19:a6=g.h("a.E")
d9=A.o(new A.c(j,a3.a(new A.fp(k6,s)),g),a6)
b1=d9.length,c1=!f,c2=o.b,c3=o.a,c4=t.m,c5=t._,c6=a9.x2,c7=c6*60,b5=0
case 20:if(!(b5<d9.length)){r=22
break}e0=d9[b5]
c8=e0.a
if(k6.a.as.p(0,c8)){r=21
break}e1=k6.a.y.i(0,c8)
e2=s.cM(e0,e1)
c9=e1==null
d0=!c9
e3=d0&&e1.y<c2
e4=!1
if((c9?null:e1.b)==="expedition")if((c9?null:e1.e)!=null){d1=o.F(c9?null:e1.d)
d1=d1==null?null:d1.b
if(d1!=(c9?null:e1.e)){d1=o.F(c9?null:e1.d)
d1=(d1==null?null:d1.b)!==c3}else d1=e4
e4=d1}e5=d0&&e0.as===B.n&&!e0.p4&&e1.x+1>=e1.w.length
d1=e0.as===B.n
if(d1)if(!e0.p4){e6=!0
if(d0)if(!e3)e7=e5&&B.a.p(A.d(["intercept","standby"],d),e1.b)
else e7=e6
else e7=e6
e6=e7}else e6=!1
else e6=!1
e7=!e4
e8=!e7||e5||e6||e2
if(c1){if(e7)e7=e5&&e1.b==="expedition"||e6
else e7=!0
e7=e7&&e0.f>=e0.r*0.65}else e7=!1
if(e7){e9=s.cP(k6.a,e0,e1)
if(e9!=null){k6.a=e9.a
B.a.m(a,e9.b)
r=21
break}if(c.e){r=21
break}}if((c9?null:e1.as)===!0){e7=c9?null:e1.d
e7=e0.CW==e7&&!e3&&!e8}else e7=!1
if(e7){r=21
break}if((c9?null:e1.b)==="intercept")if(o.a0(c9?null:e1.r)!=null){e7=h.i(0,c9?null:e1.d)
if(e7==null)e7=null
else e7=e7.d.length!==0||e7.a.ax!=null
e7=e7!==!0
f0=e7}else f0=!0
else f0=!1
e7=!e8
if(e7&&f0&&e1.z>c2&&e0.f>=e0.r*0.65){r=21
break}if(d0&&e7&&!e3&&!f0&&e1.z>c2&&!A.kB(e0,o,k6.a,k8)&&e0.f>=e0.r*0.5){r=21
break}f1=e0.p4
if(f1&&d0&&!e3&&!e2){r=21
break}f2=A.jG(e0,o,k6.a)
d0=!1
if(e7)if(A.kB(e0,o,k6.a,k8))d0=e0.f>=e0.r*0.25||o.u(f2.a).length===0
if(d0){B.a.m(a0,c8+"\u5df2\u4e34\u8fd1\u4e3b\u653b\u76ee\u6807\uff0c\u4fdd\u6301\u8fdb\u653b\uff0c\u4e0d\u56e0\u666e\u901a\u9884\u8b66\u6216\u6574\u5907\u9884\u7b97\u6298\u8fd4")
r=21
break}if((c9?null:e1.b)==="expedition"&&e7&&!e3&&e0.f>=e0.r*0.65&&e1.x+1<e1.w.length){r=21
break}if(e7&&!f0&&!e3&&e0.f>=e0.r*0.65&&!d1){r=21
break}d0=o.gM()
e7=d0.$ti
f3=e7.h("c<a.E>")
f4=A.o(new A.c(d0,e7.h("e(a.E)").a(new A.fq(k6,s,e3,e1)),f3),f3.h("a.E"))
B.a.B(f4,new A.f5(e0))
d0=A.i(f4)
e7=d0.h("y<1>")
f3=new A.y(f4,0,3,e7)
f3.U(f4,0,3,d0.c)
f3=new A.r(f3,f3.gl(0),e7.h("r<k.E>"))
d0=e0.f<e0.r*0.65
e7=e7.h("k.E")
while(f3.j()){f5=f3.d
if(f5==null)f5=e7.a(f5)
if(!c.a2())break
f6=m.ao(e0,f5.e,o,!0,f5)
f7=k6.a
f8=f5.a
f9=h.i(0,f8)
if(f9==null)f9=null
else f9=f9.d.length!==0||f9.a.ax!=null
if(e2)g0="\u653b\u57ce\u6b66\u5668\u5df2\u6d88\u8017\uff0c\u5f53\u524d\u968f\u519b\u5175\u529b\u4e0d\u8db3\u4ee5\u5b89\u5168\u7ee7\u7eed\uff0c\u56de\u57ce\u8865\u88c5\u540e\u91cd\u65b0\u7ec4\u7ec7\u8fdb\u653b"
else if(d0)g0="\u5c06\u9886\u53d7\u4f24\uff0c\u56de\u57ce\u6062\u590d\u751f\u547d\u540e\u518d\u6218"
else if(e4)g0="\u76ee\u6807\u6613\u4e3b\u540e\u539f\u57ce\u4e0e\u9644\u8fd1\u654c\u57ce\u5747\u4e0d\u9002\u5408\u7ee7\u7eed\u8fdb\u653b\uff0c\u56de\u57ce\u6574\u5907"
else if(e5)g0="\u539f\u8def\u7ebf\u6301\u7eed\u53d7\u963b\uff0c\u91cd\u65b0\u9009\u62e9\u6709\u5b89\u5168\u540d\u989d\u7684\u57ce\u6c60\u6574\u5907"
else if(e3)g0="\u539f\u4efb\u52a1\u5df2\u8d85\u8fc7\u6267\u884c\u65f6\u9650\uff0c\u56de\u57ce\u91cd\u65b0\u6574\u5907"
else g0=f0?"\u622a\u51fb\u76ee\u6807\u5df2\u6d88\u5931\uff0c\u56de\u57ce\u7ed3\u675f\u672c\u6b21\u4efb\u52a1":"\u91ce\u5916\u6307\u4ee4\u5df2\u5b8c\u6210\uff0c\u56de\u57ce\u7b49\u5f85\u65b0\u4efb\u52a1"
g1=h.i(0,f8)
if(g1==null)g1=null
else g1=g1.d.length!==0||g1.a.ax!=null
f8=g1===!0?h.i(0,f8).ga6():1/0
g2=a1.cm(f7,e0,f6,!0,f8,!0,f9!==!0,g0,"regroup",f5)
if(g2!=null){k6.a=g2.a
B.a.m(a,g2.b)
break}}if((e6||e2)&&!k6.a.as.p(0,c8)){g3=e2?"\u653b\u57ce\u6b66\u5668\u5df2\u6d88\u8017\u4e14\u6682\u65e0\u5b89\u5168\u8865\u88c5\u5730\u70b9\uff0c\u505c\u6b62\u63a8\u8fdb\u5e76\u7b49\u5f85\u91cd\u65b0\u8c03\u5ea6":"\u5f53\u524d\u6ca1\u6709\u5408\u9002\u7684\u622a\u51fb\u6216\u8fdb\u653b\u76ee\u6807\uff0c\u53cb\u57ce\u4e5f\u6ca1\u6709\u5b89\u5168\u5165\u57ce\u65b9\u6848\uff0c\u6682\u65f6\u5f85\u547d\u5e76\u7ee7\u7eed\u590d\u67e5"
B.a.m(a0,c8+"\uff1a"+g3)
if((c9?null:e1.b)!=="standby"||e3){if(e2)g4=!d1||f1
else g4=!1
c9=e0.c
d0=A.d([e0.z],c5)
d1=B.b.aI(c7)
e7=g4?1:0
g5=new A.a5(c8,"standby",g3,c9,null,!1,null,d0,0,c2+d1,c2,0,!1,!1,e0.go+e7)
k6.a.y.v(0,c8,g5)
e7=A.d([],b2)
if(g4)e7.push(new A.A(B.Q,c8,null,null,0,B.d))
c8=A.d([g5],c4)
d0=A.d([e0],b3)
c9=o.F(c9)
c9.toString
B.a.m(a,new A.P(g3,e7,a1.ag(d0,A.d([c9],b4)),c8,0,!1))}}r=23
return k9.b=4,1
case 23:case 21:d9.length===b1||(0,A.v)(d9),++b5
r=20
break
case 22:g6=A.o(new A.c(j,a3.a(new A.f6(k6,s,f)),g),a6)
B.a.B(g6,new A.f7(s))
j=k7.y
g=k7.z
g7=A.c6(o,k6.a,k8,g,j)
d=A.U(a8,a8)
for(a3=g7.f,a6=new A.b6(a3,a3.r,a3.e,A.l(a3).h("b6<1>"));a6.j();){b1=a6.d
c2=a3.i(0,b1)
c2=c2==null?null:c2.length
d.v(0,b1,c2==null?0:c2)}g8=g7.gY()
if(g8==null)g8=g7.gcc()
if(g7.gY()!=null&&a4.length===0)d3="attacking"
a3=g6.length,c6=k7.w>c6/a9.a,a6=a9.k4,k7=k7.f,b1=a9.rx,c2=a9.fy,a9=a9.go,c3=A.i(n),c4=c3.h("e(1)"),c3=c3.h("c<1>"),c5=c3.h("a.E"),g9=0,h0=1,h1=!1,b5=0
case 24:if(!(b5<g6.length)){r=26
break}e0=g6[b5]
h2={}
c7=e0.a
if(k6.a.as.p(0,c7)||k6.a.z.p(0,c7)){r=25
break}h3=o.F(e0.c)
c7=h3.a
b6=h.i(0,c7)
c8=b6==null
if(c8)c9=null
else c9=b6.d.length!==0||b6.a.ax!=null
if(c9===!0){if(c8)c9=null
else{c9=b6.f
c9=c9==null?null:c9.a}c9=c9!==B.h}else c9=!1
if(c9){r=25
break}if(c8)c9=null
else c9=b6.d.length!==0||b6.a.ax!=null
d0=k6.a
if(c9===!0){c9=d0.a7(h3)
d0=k6.a
d1=h3.ax
if(d1==null){d0=d0.x.i(0,c7)
if(d0==null)d0=h3.d}else{d0=h3.ay
e7=h3.db?1:0
e7=B.c.A(d1-d0-e7,0,5)
d0=e7}h4=Math.min(c9,d0)}else h4=d0.a7(h3)
if(k6.a.u(c7).length<=h4){r=25
break}if(c8)c7=null
else c7=b6.d.length!==0||b6.a.ax!=null
if(c7===!0&&!s.bJ(h3,e0,k6.a)){r=25
break}h5=A.c6(o,k6.a,k8,g,j)
h6=A.o(new A.c(n,c4.a(new A.f8(s,h5,e0,d)),c3),c5)
B.a.B(h6,new A.f9(s,h5,e0))
h2.a=null
c7=A.i(h6)
c8=c7.h("y<1>")
c9=new A.y(h6,0,a9,c8)
c9.U(h6,0,a9,c7.c)
c9=new A.r(c9,c9.gl(0),c8.h("r<k.E>"))
c8=c8.h("k.E")
h7=null
h8=-1/0
case 27:if(!c9.j()){r=28
break}c7=c9.d
h9=c7==null?c8.a(c7):c7
if(!c.a2()){r=28
break}i0=h9.a
c7=o.u(i0)
d0=A.i(c7).h("L<1>")
c7=new A.L(c7,d0)
d1=h9.ax
if(d1==null)d1=h9.d
else{e7=h9.ay
f1=h9.db?1:0
f1=B.c.A(d1-e7-f1,0,5)
d1=f1}e7=new A.y(c7,0,d1,d0.h("y<k.E>"))
e7.U(c7,0,d1,d0.h("k.E"))
i1=e7.ak(0)
f6=m.aJ(e0,h9.e,o,h9)
if(!f6.d){r=27
break}i2=a1.bp(e0,k6.a,h9,l)
for(c7=i2.length,i3=!1,b9=0;b9<i2.length;i2.length===c7||(0,A.v)(i2),++b9){i4=i2[b9]
d0=A.j1(e0,h9,o,k8,l,i4,c6&&k6.a.d>100?0.05:0).a
i5=d0[1]
i6=a1.aY(d0[2],h9,k6.a,e0)
i3=i6>0
if(!i3)continue
if(h5.gY()!=null&&i0!==h5.gY())d1=i6!==1||i5<a6
else d1=!1
if(d1)continue
i7=d.i(0,i0)
if(i7==null)i7=0
i8=i6-i7
if(i8<=0)continue
h0=Math.max(h0,i6)
g2=s.bH(k6.a,e0,h9,i4,i8,i7,d0[0])
if(g2==null){i9=k6.a.P()
i9.d=1e6
j0=s.bH(i9,e0,h9,i4,i8,i7,d0[0])
if(j0!=null){if(a4.length===0)d3="saving"
d0=i9.d
d1=j0.a
j1=d0-d1.d+d1.V().a
g9=g9===0?j1:Math.min(g9,j1)
if(g8==null)g8=i0}else if(a4.length===0)d3="preparing"
continue}c7=f6.b
d0=A.bl(h9,e0,o,k8,k7,c7)
d1=k6.a.d
e7=g2.a.d
f1=B.a.b2(i4,1).E(0,0,new A.fa(s),a8)
f3=b8.i(0,"weaponChance")
f3.toString
j2=d0-c7*0.4-(d1-e7)*0.5+i5*30+f1*b1*f3*0.02
if(j2>h8){h2.a=g2
h0=g2.b.d.length
h8=j2
h7=h9}break}if(!i3&&g8==null){h0=Math.max(1,Math.min(c2,i1.length))
g8=i0}r=29
return k9.b=5,1
case 29:r=27
break
case 28:c7=h2.a
if(c7!=null){c7=B.a.E(a,0,new A.fb(),a8)
c8=h2.a
c7=c7+c8.b.b.length<=b0}else{c8=c7
c7=!1}if(c7){k6.a=c8.a
B.a.m(a,c8.b)
g8=h7.a
d.aK(g8,new A.fc(h2),new A.fd(h2))
h1=!0}r=30
return k9.b=6,1
case 30:case 25:g6.length===a3||(0,A.v)(g6),++b5
r=24
break
case 26:k7=!h1
if(k7&&c1&&B.a.gH(a5).e===0&&i!==B.z){j3=s.cY(k6.a,g7)
if(j3!=null){k6.a=j3.a
B.a.m(a,j3.b)
d3="preparing"}}r=i===B.F&&c1&&k7&&B.a.E(a,0,new A.fe(),a8)<b0-3?31:32
break
case 31:j4=k6.a.ce(new A.c(n,c4.a(new A.fg(s,g7)),c3))
k7=o.gM(),m=J.J(k7.a),k7=new A.V(m,k7.b,k7.$ti.h("V<1>"))
case 33:if(!k7.j()){r=34
break}l=m.gn()
j=l.a
i=h.i(0,j)
if(i==null)i=null
else i=i.d.length!==0||i.a.ax!=null
if(i===!0){r=33
break}if(!c.a2()){r=34
break}j5=k6.a.u(j)
b7=k6.a.P()
i=A.i(j5)
g=i.h("c<1>")
j6=A.o(new A.c(j5,i.h("e(1)").a(new A.fh(k6)),g),g.h("a.E"))
B.a.B(j6,new A.fi())
j7=!1
if(j4.p(0,j))if(B.a.D(n,new A.fj(s))){i=j5.length===0||k6.a.bW(j)<k6.a.a7(l)+h0
j7=i}if(j6.length!==0){i=j5.length
g=k6.a
d=l.ax
if(d==null){g=g.x.i(0,j)
if(g==null)g=l.d}else{g=l.ay
a3=l.db?1:0
a3=B.c.A(d-g-a3,0,5)
g=a3}if(i<g)i=j7&&j5.length>=l.y
else i=!0}else i=!1
if(i)if(b7.aL(l,B.a.gH(j6))&&b7.d>=b7.V().a){k6.a=b7
B.a.m(a,new A.P("\u5148\u6269\u5145\u5b89\u5168\u8fce\u6218\u540d\u989d\u548c\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u8003\u8651\u62db\u5c06\u4e0e\u8fdc\u5f81",A.d([new A.A(B.l,B.a.gH(j6).a,j,null,0,B.d)],b2),a1.ag(A.d([B.a.gH(j6)],b3),A.d([l],b4)),B.q,b7.V().a,!1))
r=34
break}if(j7){i=o.F(g8)
i=b7.dv(l,i==null?null:i.b)&&b7.d>=b7.V().a}else i=!1
if(i){k6.a=b7
B.a.m(a,new A.P("\u4e3a\u7559\u5b88\u4e0e\u8fdc\u5f81\u7684\u771f\u5b9e\u7f3a\u53e3\u62bd\u53d6\u82f1\u96c4\uff0c\u9884\u7559\u6700\u9ad8\u624b\u7eed\u8d39\u548c\u6708\u4ff8",A.d([new A.A(B.u,null,j,null,0,B.d)],b2),a1.ag(A.d([],b3),A.d([l],b4)),B.q,b7.V().a,!1))
r=34
break}i=k6.a.f
g=j5.length
d=b8.i(0,"soldierLimit")
d.toString
d=Math.min(i,g*B.b.k(d))
g=k6.a
j8=d-g.e
if(j8>0){j9=g.P()
i=j9.d
g=j9.b.b.i(0,"soldierCost")
g.toString
g=Math.max(0,B.c.aP(i,B.b.k(g)))
i=b8.i(0,"soldierBatch")
i.toString
k0=Math.min(g,Math.min(B.b.k(i),j8))
if(k0>0&&j9.aE(k0)){k6.a=j9
B.a.m(a,new A.P("\u8865\u5145\u8fd1\u671f\u5b88\u57ce\u548c\u51fa\u5f81\u6240\u9700\u5175\u5458\uff0c\u4e0d\u586b\u6ee1\u6ca1\u6709\u4efb\u52a1\u7684\u5168\u56fd\u5bb9\u91cf",A.d([new A.A(B.m,null,j,null,k0,B.d)],b2),a1.ag(A.d([],b3),A.d([l],b4)),B.q,j9.V().a,!1))
r=34
break}}r=35
return k9.b=7,1
case 35:r=33
break
case 34:case 32:if(h1)d3=a4.length===0?"attacking":"defending"
k1=o.F(g8)
if(k1!=null){k2=A.aQ(k1.b,o,k8,null)
if(k2.ga3())B.a.m(a0,"\u76ee\u6807\u56fd\u5360\u6709 "+k2.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.aw(k2.c*k2.gaV())+" \u91d1\u5e01\uff0c\u51c6\u5907\u5f3a\u5316\u6b66\u5668\u548c\u8f6e\u653b\u5175\u529b")}if(a.length===0){k7=k6.a
B.a.m(a0,k7.d<k7.V().a?"\u8d44\u91d1\u4e0d\u8db3\u4ee5\u8986\u76d6\u73b0\u6709\u90e8\u961f\u548c\u6b20\u6536\u6708\u4ff8\uff0c\u7b49\u5f85\u6574\u5907":"\u6ca1\u6709\u6ee1\u8db3\u5b88\u57ce\u3001\u65f6\u9650\u53ca\u9759\u6001\u98ce\u9669\u7ea6\u675f\u7684\u65b0\u589e\u884c\u52a8\uff0c\u4fdd\u6301\u5df2\u6709\u4efb\u52a1")}if(c6)B.a.m(a0,"\u505c\u6ede\u8bca\u65ad\uff1a"+(d3==="saving"?"\u7f3a\u5c11\u6574\u961f\u540e\u52e4\u8d44\u91d1":"\u7f3a\u5c11\u53ef\u5b89\u5168\u6267\u884c\u7684\u6269\u5f20\u6761\u4ef6")+"\uff0c\u4e0d\u901a\u8fc7\u65e0\u9650\u62db\u52df\u6216\u81ea\u6740\u51fa\u51fb\u6253\u7834\u7b49\u5f85")
k3=A.d([],e)
for(k7=a.length,k4=0,b5=0;b5<a.length;a.length===k7||(0,A.v)(a),++b5){k5=a[b5]
k4+=k5.b.length
if(k4>b0){c.e=!0
B.a.m(a0,"\u547d\u4ee4\u914d\u989d\u5230\u8fbe\uff0c\u53ea\u63d0\u4ea4\u524d\u9762\u5b8c\u6574\u7684\u52a8\u4f5c\u7ec4\uff0c\u540e\u7eed\u7559\u5f85\u4e0b\u4e00\u6b21\u89c4\u5212")
break}B.a.m(k3,k5)}s.w=new A.bq(d3,g8,g9,h0,k3,A.Z(a0,0,A.X(12,"count",a8),a7).ak(0),c.e,c.c,c.d,c.b)
case 1:return 0
case 2:return k9.c=p.at(-1),3}}}},
cQ(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this
for(s=a2.c.Q,r=s.gM(),q=J.J(r.a),r=new A.V(q,r.b,r.$ti.h("V<1>")),p=a2.x,o=a2.d,n=s.r,m=A.i(n),l=m.h("e(1)"),m=m.h("c<1>"),k=m.h("a.E"),j=a3.ax;r.j();){i=q.gn()
h=i.a
if(a3.u(h).length!==0||a3.aM(i)||a3.L(h)>0||j.p(0,h))continue
g=A.o(new A.c(n,l.a(new A.eQ(a2,a3)),m),k)
B.a.B(g,new A.eR(i))
f=A.i(g)
e=f.h("y<1>")
d=new A.y(g,0,4,e)
d.U(g,0,4,f.c)
d=new A.r(d,d.gl(0),e.h("r<k.E>"))
f=i.e
e=e.h("k.E")
while(d.j()){c=d.d
if(c==null)c=e.a(c)
if(!o.a2())return null
b=a2.e
b===$&&A.O()
a=b.ao(c,f,s,!0,i)
b=a2.r
b===$&&A.O()
a0=p.i(0,h)
a0=a0==null?null:a0.ga6()
a1=b.b1(a3,c,a,!0,a0==null?1/0:a0,!0,"\u524d\u7ebf\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5b89\u5168\u540e\u65b9\u65e0\u9700\u4e3a\u7559\u5b88\u7275\u5236\u90e8\u961f","transfer",i)
if(a1!=null)return a1}}return null},
cM(a,b){var s,r,q,p,o,n,m=this,l=b==null
if((l?null:b.b)!=="expedition"||a.ax.length!==0)return!1
s=m.c.Q
r=s.F(l?null:b.d)
if(r==null||r.b===s.a)return!1
l=s.u(r.a)
q=A.i(l).h("L<1>")
p=A.aB(A.Z(new A.L(l,q),0,A.X(r.gZ(),"count",t.S),q.h("k.E")),t.r)
if(p==null)return!1
l=B.a.am(s.w,new A.eG(r))
s=m.f
s===$&&A.O()
q=r.gZ()
o=m.a.b.i(0,"soldierLimit")
o.toString
n=s.c1(a,p,q,!1,Math.min(B.b.k(o),p.gN()+l.c))
return!m.d.e&&n.a!==B.h},
cP(b3,b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this,b2=null
if(b4.ax.length===0)return b2
s=b5==null
if((s?b2:b5.b)==="expedition")r=s?b2:b5.d
else r=b2
q=b1.c.Q
p=q.f
o=A.i(p)
n=o.h("c<1>")
m=A.o(new A.c(p,o.h("e(1)").a(new A.eM(b1)),n),n.h("a.E"))
B.a.B(m,new A.eN(b1,r,b4))
for(p=b1.a,o=p.w,n=A.Z(m,0,A.X(o.go,"count",t.S),A.i(m).c),l=n.$ti,n=new A.r(n,n.gl(0),l.h("r<k.E>")),s=!s,k=t.r,j=o.fy,i=b3.y,h=A.l(i).h("Y<2>"),g=h.h("e(a.E)"),f=h.h("c<a.E>"),e=b1.d,l=l.h("k.E"),p=p.b,d=q.w,o=o.ch;n.j();){c=n.d
if(c==null)c=l.a(c)
if(!e.a2())return b2
b=b1.r
b===$&&A.O()
if(!b.ah(c))continue
a=new A.c(new A.Y(i,h),g.a(new A.eO(b1,b4,c)),f).gl(0)
if(a>=j)continue
a0=c.a
a1=q.u(a0)
a2=A.i(a1).h("L<1>")
a1=new A.L(a1,a2)
a3=c.ax
a4=a3==null
if(a4)a5=c.d
else{a5=c.ay
a6=c.db?1:0
a6=B.c.A(a3-a5-a6,0,5)
a5=a6}a6=new A.y(a1,0,a5,a2.h("y<k.E>"))
a6.U(a1,0,a5,a2.h("k.E"))
a7=A.aB(a6,k)
a1=a7!=null
if(a1){a2=B.a.am(d,new A.eP(c))
a5=b1.f
a5===$&&A.O()
if(a4)a3=c.d
else{a4=c.ay
a6=c.db?1:0
a6=B.c.A(a3-a4-a6,0,5)
a3=a6}a4=p.i(0,"soldierLimit")
a4.toString
a8=a5.c1(b4,a7,a3,!1,Math.min(B.b.k(a4),a7.gN()+a2.c))
if(a8.r||a8.c<=0||a8.b<o)continue}a2=b1.e
a2===$&&A.O()
a9=a2.aJ(b4,c.e,q,c)
if(!s||b5.b!=="expedition")a0="\u91ce\u5916\u4efb\u52a1\u7ed3\u675f\u540e\u5229\u7528\u73b0\u6709\u968f\u8eab\u5175\u529b\uff0c\u8f6c\u653b\u53ef\u4ee5\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u654c\u57ce"
else a0=a0===r?"\u91cd\u65b0\u6838\u5bf9\u5f53\u524d\u5b88\u519b\u4e0e\u8def\u7ebf\u540e\uff0c\u7ee7\u7eed\u8fdb\u653b\u539f\u76ee\u6807":"\u539f\u76ee\u6807\u4e0d\u518d\u9002\u5408\u8fdb\u653b\uff0c\u8f6c\u5411\u9644\u8fd1\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u654c\u57ce"
b0=b.cp(b3,b4,a9,a1,!0,a,a0,"expedition",c)
if(b0!=null)return b0}return b2},
cY(b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=a5.c.Q,a7=a6.gM(),a8=a7.$ti,a9=a8.h("c<a.E>"),b0=A.o(new A.c(a7,a8.h("e(a.E)").a(new A.eV(a5)),a9),a9.h("a.E"))
if(b0.length<2)return null
a7=a6.f
a8=A.i(a7)
a9=a8.h("c<1>")
s=A.o(new A.c(a7,a8.h("e(1)").a(new A.eW(a5,b2)),a9),a9.h("a.E"))
a7=t.S
a8=t.i
r=A.U(a7,a8)
for(a9=b0.length,q=A.i(s),p=q.c,q=q.h("y<1>"),o=a5.a,n=o.w,m=n.go,l=0;l<b0.length;b0.length===a9||(0,A.v)(b0),++l){k=b0[l]
B.a.B(s,new A.eX(k))
j=new A.y(s,0,m,q)
j.U(s,0,m,p)
r.v(0,k.a,j.E(0,1/0,new A.eY(a5,k),a8))}B.a.B(b0,new A.eZ(r))
for(a8=A.i(b0),a7=A.Z(b0,0,A.X(2,"count",a7),a8.c),a9=a7.$ti,a7=new A.r(a7,a7.gl(0),a9.h("r<k.E>")),a8=a8.h("L<1>"),q=a8.h("r<k.E>"),p=a5.d,m=a6.c,j=a8.h("k.E"),n=n.at,a9=a9.h("k.E");a7.j();){i=a7.d
if(i==null)i=a9.a(i)
h=i.a
g=r.i(0,h)
g.toString
if(g>n)continue
for(g=new A.L(b0,a8),g=new A.r(g,g.gl(0),q),f=i.e,e=i.d;g.j();){d=g.d
if(d==null)d=j.a(d)
c=d.a
b=r.i(0,c)
b.toString
a=r.i(0,h)
a.toString
if(b<a+10)continue
a0=b1.u(c)
if(a0.length<=b1.a7(d))continue
c=A.i(a0)
b=c.h("c<1>")
a1=A.o(new A.c(a0,c.h("e(1)").a(new A.f_(b1)),b),b.h("a.E"))
B.a.B(a1,new A.f0())
c=A.i(a1)
b=c.h("y<1>")
a=new A.y(a1,0,2,b)
a.U(a1,0,2,c.c)
a=new A.r(a,a.gl(0),b.h("r<k.E>"))
b=b.h("k.E")
d=d.d
while(a.j()){c=a.d
if(c==null)c=b.a(c)
if(c.x<15||e>=o.af(m)||d<o.af(m)||B.a.D(b1.u(h),new A.f1(c)))continue
if(!p.a2())return null
a2=a5.e
a2===$&&A.O()
a3=a2.ao(c,f,a6,!0,i)
a2=a5.r
a2===$&&A.O()
a4=a2.cn(b1,c,a3,!0,!0,"\u540e\u65b9\u5efa\u8bbe\u5df2\u5b8c\u6210\uff0c\u5b89\u5168\u8f6c\u79fb\u9ad8\u5185\u653f\u5c06\u9886\u4e3b\u6301\u524d\u7ebf\u57ce\u9632\u5efa\u8bbe","transfer",i)
if(a4!=null)return a4}}}return null},
bJ(a,b,c){var s,r,q=a.a,p=this.x.i(0,q),o=p==null?null:p.d
if(o==null)o=A.d([],t.ay)
if(o.length===0)return!0
q=c.u(q)
p=A.i(q)
s=p.h("c<1>")
q=A.o(new A.c(q,p.h("e(1)").a(new A.eT(b)),s),s.h("a.E"))
p=A.i(q).h("L<1>")
r=A.Z(new A.L(q,p),0,A.X(c.O(a),"count",t.S),p.h("k.E")).ak(0)
if(r.length===0)return!1
return B.a.aG(o,new A.eU(this,r,c,a))},
bH(c7,c8,c9,d0,d1,d2,d3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4=this,c5=null,c6="soldierLimit"
t.L.a(d0)
s=t.e
r=A.d([],s)
for(q=c4.c.Q,p=q.gM(),o=J.J(p.a),p=new A.V(o,p.b,p.$ti.h("V<1>")),n=c4.x,m=c8.c;p.j();){l=o.gn()
k=l.a
j=n.i(0,k)
if(j==null)j=c5
else j=j.d.length!==0||j.a.ax!=null
if(j===!0&&k!==m)continue
i=c7.a7(l)
h=Math.max(0,c7.u(k).length-i)
l=c7.u(k)
k=A.i(l)
j=k.h("c<1>")
g=A.o(new A.c(l,k.h("e(1)").a(new A.eI(c4,c7,c9)),j),j.h("a.E"))
B.a.B(g,new A.eJ(c4))
l=A.i(g)
k=new A.y(g,0,h,l.h("y<1>"))
k.U(g,0,h,l.c)
B.a.J(r,k)}if(!B.a.p(r,c8))return c5
B.a.an(r,c8)
B.a.B(r,new A.eK(c4))
p=c4.e
p===$&&A.O()
o=c9.e
f=p.aJ(c8,o,q,c9)
if(!f.d)return c5
e=A.d([c8],s)
s=t.N
d=A.Q([c8.a,f],s,t.bJ)
c=f.b
for(m=c4.a,l=m.w,k=t.S,j=A.Z(r,0,A.X(l.fy*2,"count",k),t.r),b=j.$ti,j=new A.r(j,j.gl(0),b.h("r<k.E>")),a=l.ok,b=b.h("k.E"),a0=c;j.j();){a1=j.d
if(a1==null)a1=b.a(a1)
if(e.length>=d1)break
a2=p.aJ(a1,o,q,c9)
if(!a2.d)continue
a3=a2.b
a4=Math.min(c,a3)
a5=Math.max(a0,a3)
if(a5-a4>a)continue
B.a.m(e,a1)
d.v(0,a1.a,a2)
a0=a5
c=a4}if(e.length<d1)return c5
a6=A.d([],t.w)
a7=A.d([],t.m)
a8=A.U(s,s)
s=q.u(c9.a)
p=A.i(s).h("L<1>")
a9=A.Z(new A.L(s,p),0,A.X(c9.gZ(),"count",k),p.h("k.E")).ak(0)
for(s=l.fx,m=m.b,p=d1===1,o=A.i(a9),l=o.c,o=o.h("y<1>"),k=t.x,b0=c7,b1=0;b1<e.length;++b1){b2=e[b1]
j=b2.c
b=n.i(0,j)
if(b==null)b=c5
else b=b.d.length!==0||b.a.ax!=null
if(b===!0){b=q.F(j)
b.toString
b=!c4.bJ(b,b2,b0)}else b=!1
if(b)return c5
b=d.i(0,b2.a)
b.toString
if(b1===0)a1=A.d([d0],k)
else{a1=c4.r
a1===$&&A.O()
a3=c4.f
a3===$&&A.O()
a3=a1.bp(b2,b0,c9,a3)
a1=a3}a3=a1.length
b3=d2+b1
b4=b1>0
b5=c5
b6=0
for(;b6<a1.length;a1.length===a3||(0,A.v)(a1),++b6){b7=a1[b6]
if(b4){if(d3){b8=new A.y(a9,0,1,o)
b8.U(a9,0,1,l)}else b8=a9
b8=J.l3(b8,new A.eL(c4,b2,c9,b7))}else b8=!1
if(b8)continue
for(b8=q.gM(),b9=J.J(b8.a),b8=new A.V(b9,b8.b,b8.$ti.h("V<1>")),c0=0;b8.j();){c1=b9.gn()
c2=c1.a
c3=b0.u(c2).length
c1=Math.min(Math.max(0,c3-(c2===j?1:0)),b0.a7(c1))
c3=m.i(0,c6)
c3.toString
c0+=c1*B.b.k(c3)}b8=c4.r
b8===$&&A.O()
b9=p?"\u56f4\u7ed5\u4e3b\u653b\u76ee\u6807\u6295\u5165\u8db3\u591f\u6218\u529b\uff0c\u4fdd\u7559\u5176\u4ed6\u65b9\u5411\u5175\u529b":"\u96c6\u4e2d\u4f18\u52bf\u7f16\u961f\u8f6e\u653b\u540c\u4e00\u5ea7\u57ce\uff0c\u62b5\u8fbe\u95f4\u9694\u4e0d\u8d85\u8fc7"+B.b.k(a)+"\u79d2"
c1=b0.f
c2=m.i(0,c6)
c2.toString
b5=b8.bt(b0,b2,b,d3,b7,Math.min(c0,Math.max(0,c1-B.b.k(c2))),b3,b9,"expedition",c9)
if(b5!=null)break}if(b5==null)return c5
b0=b5.a
j=b5.b
B.a.J(a6,j.b)
B.a.J(a7,j.d)
a8.J(0,j.c)
if(a6.length>s){c4.d.e=!0
return c5}}s=c4.r
s===$&&A.O()
a8.J(0,s.ag(a9,A.d([],t.Y)))
if(d3)s="\u5148\u6d3e\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u5c06\u9886\u8fdb\u653b\u524d\u6392\uff0c\u6301\u7eed\u8f6e\u653b\u5e76\u8865\u5145\u6218\u635f"
else s=p?"\u6267\u884c\u9759\u6001\u4f18\u52bf\u660e\u786e\u3001\u53ef\u4ee5\u4f9b\u517b\u7684\u6269\u5f20":"\u6574\u961f\u540e\u52e4\u51c6\u5907\u5b8c\u6210\uff0c\u6309\u771f\u5b9e\u6392\u961f\u89c4\u5219\u8f6e\u653b\uff1b\u4e0d\u9884\u6f14\u672a\u6765\u4f24\u4ea1"
return new A.d5(b0,new A.P(s,a6,a8,a7,b0.V().a,!1))},
d_(a,b,c){var s=this.c
return A.bl(a,b,s.Q,this.a,s.f,c)},
aU(a,b){return this.d_(a,b,null)}}
A.f2.prototype={
$1(a){return t.a.a(a).ga1()},
$S:16}
A.f3.prototype={
$1(a){var s,r,q
t.J.a(a)
s=this.a.c.Q
r=s.a0(a.a)
q=!1
if(r!=null)if(r.b===s.a)if(!r.fx)if(r.f>0){s=r.as
s=!(s===B.f||s===B.e)&&r.go===a.ax}else s=q
else s=q
else s=q
else s=q
return s},
$S:11}
A.f4.prototype={
$1(a){t.a.a(a)
return a.d.length!==0||a.a.ax!=null},
$S:16}
A.ff.prototype={
$2(a,b){var s,r=t.a
r.a(a)
r.a(b)
if(a.ga1()!==b.ga1())return a.ga1()?-1:1
s=B.b.t(a.ga6(),b.ga6())
return s!==0?s:B.b.t(b.w+b.a.r*4,a.w+a.a.r*4)},
$S:35}
A.fk.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:12}
A.fl.prototype={
$2(a,b){var s,r=t.dp
r.a(a)
r.a(b)
r=a.e
s=b.e
return r!==s?B.c.t(r,s):B.b.t(b.d,a.d)},
$S:69}
A.fm.prototype={
$1(a){t.r.a(a)
return a.b===this.a.c.Q.a&&!a.fx&&a.fr},
$S:0}
A.fn.prototype={
$1(a){t.r.a(a)
return this.a.c.x!==B.o},
$S:0}
A.fo.prototype={
$1(a){var s=this.a.a.r.i(0,A.f(a))
return(s==null?null:s.d)===0},
$S:17}
A.fp.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.Q.a&&a.db&&s.x!==B.o&&!a.fx&&!this.a.a.as.p(0,a.a)},
$S:0}
A.fq.prototype={
$1(a){var s,r,q,p,o,n,m,l=this,k=null
t.q.a(a)
s=l.a
r=a.a
q=s.a.L(r)
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
s=m===!0?s.O(a):Math.max(s.O(a),a.y+o.a.w.cy)
if(q-p<s){s=n.i(0,r)
if(s==null)s=k
else s=s.d.length!==0||s.a.ax!=null
if(s===!0){s=n.i(0,r)
if(s==null)s=k
else{s=s.f
s=s==null?k:s.a}s=s===B.h}else s=!0}else s=!1
return s},
$S:1}
A.f5.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(a.e.G(s),b.e.G(s))},
$S:4}
A.f6.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b.c
r=!1
if(a.b===s.Q.a)if(a.cy){r=this.a
s=r.a.aq(a)&&!this.c&&s.x!==B.z&&!a.fx&&!r.a.z.p(0,a.a)}else s=r
else s=r
return s},
$S:0}
A.f7.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ac(b,s.F(b.c).d<q.af(r)),A.ac(a,s.F(a.c).d<q.af(r)))},
$S:2}
A.f8.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.a
r=!1
if(a.b!==s.c.Q.a)if(this.b.av(a)){q=s.r
q===$&&A.O()
if(q.ah(a)){r=this.d.i(0,a.a)
if(r==null)r=0
s=r<s.a.w.fy}else s=r}else s=r
else s=r
return s},
$S:1}
A.f9.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.b
if(a.a===r.gY())r=-1
else if(b.a===r.gY())r=1
else{r=this.a
s=this.c
s=B.b.t(r.aU(b,s),r.aU(a,s))
r=s}return r},
$S:4}
A.fa.prototype={
$2(a,b){var s,r
A.f(a)
A.f(b)
s=this.a.a.r
r=s.i(0,b)
r=r==null?null:r.c
if(r==null)r=0
s=s.i(0,b)
s=s==null?null:s.d
return a+Math.max(0,r-(s==null?0:s))},
$S:24}
A.fb.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:12}
A.fc.prototype={
$1(a){return A.f(a)+this.a.a.b.d.length},
$S:7}
A.fd.prototype={
$0(){return this.a.a.b.d.length},
$S:5}
A.fe.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:12}
A.fg.prototype={
$1(a){var s,r
t.q.a(a)
s=this.a
r=!1
if(a.b!==s.c.Q.a)if(this.b.av(a)){s=s.r
s===$&&A.O()
s=s.ah(a)}else s=r
else s=r
return s},
$S:1}
A.fh.prototype={
$1(a){t.r.a(a)
return a.dy&&!this.a.a.as.p(0,a.a)},
$S:0}
A.fi.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fj.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.eQ.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=!1
if(a.b===s.c.Q.a)if(a.cy){q=this.b
if(q.aq(a))if(!q.as.p(0,a.a)){s=s.x.i(0,a.c)
if(s==null)s=null
else s=s.d.length!==0||s.a.ax!=null
s=s!==!0}else s=r
else s=r}else s=r
else s=r
return s},
$S:0}
A.eR.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.z.G(s),b.z.G(s))},
$S:2}
A.eG.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.eM.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.eN.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.b
s=a.a===r
if(s!==(b.a===r))return s?-1:1
r=this.a
s=this.c
return B.b.t(r.aU(b,s),r.aU(a,s))},
$S:4}
A.eO.prototype={
$1(a){var s,r
t.J.a(a)
s=a.a
r=!1
if(s!==this.b.a)if(a.b==="expedition")if(a.d===this.c.a){s=this.a.c.Q.a0(s)
s=(s==null?null:s.fx)===!1}else s=r
else s=r
else s=r
return s},
$S:11}
A.eP.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.eV.prototype={
$1(a){var s=this.a.x.i(0,t.q.a(a).a)
if(s==null)s=null
else s=s.d.length!==0||s.a.ax!=null
return s!==!0},
$S:1}
A.eW.prototype={
$1(a){t.q.a(a)
return a.b!==this.a.c.Q.a&&this.b.av(a)},
$S:1}
A.eX.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.G(s),b.e.G(s))},
$S:4}
A.eY.prototype={
$2(a,b){var s,r
A.am(a)
t.q.a(b)
s=this.a.e
s===$&&A.O()
r=this.b.e
return Math.min(a,s.ac(r,b.f.X(r)))},
$S:38}
A.eZ.prototype={
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
A.f_.prototype={
$1(a){t.r.a(a)
return a.cy&&a.e!==2&&!this.a.as.p(0,a.a)},
$S:0}
A.f0.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.f1.prototype={
$1(a){return t.r.a(a).x>=this.a.x},
$S:0}
A.eT.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.eU.prototype={
$1(a){var s=this
return B.a.D(s.b,new A.eS(s.a,t.O.a(a),s.c,s.d))},
$S:10}
A.eS.prototype={
$1(a){var s,r,q,p,o,n=this,m="soldierLimit"
t.r.a(a)
s=n.a
r=s.f
r===$&&A.O()
q=n.c
p=q.O(n.d)
s=s.a.b
o=s.i(0,m)
o.toString
o=B.b.k(o)
q=q.e
s=s.i(0,m)
s.toString
return r.d4(a,n.b.a,p,Math.min(o,Math.max(0,q-B.b.k(s)))).a===B.h},
$S:0}
A.eI.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.cy){r=this.b
if(!r.as.p(0,a.a))if(r.aq(a)){s=this.a.r
s===$&&A.O()
s=s.ah(this.c)}}return s},
$S:0}
A.eJ.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ac(b,s.F(b.c).d<q.af(r)),A.ac(a,s.F(a.c).d<q.af(r)))},
$S:2}
A.eK.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ac(b,s.F(b.c).d<q.af(r)),A.ac(a,s.F(a.c).d<q.af(r)))},
$S:2}
A.eL.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this,i="soldierLimit"
t.r.a(a)
s=j.a
r=s.f
r===$&&A.O()
q=j.c
p=q.gZ()
o=s.a
n=o.b
m=n.i(0,i)
m.toString
m=B.b.k(m)
n=n.i(0,i)
n.toString
l=j.d
k=r.d7(j.b,a,p,Math.min(B.b.k(n),B.a.am(s.c.Q.w,new A.eH(q)).c),l,m)
return J.jm(l)&&k.b<o.w.k4||k.r||k.c<=o.w.RG||k.b<-0.12},
$S:0}
A.eH.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.ad.prototype={}
A.fr.prototype={
c0(a,b){return new A.av(this.d3(a,b),t.dT)},
d3(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e
return function $async$c0(c,d,a0){if(d===1){n.push(a0)
p=o}for(;;)switch(p){case 0:i=s.a5(r,q)
h=r.a
g=h.a
f=q.L(g)<=q.O(h)
e=!1
if(f)if(!r.ga1()){m=r.d
if(m.length!==0)if(B.a.aG(m,new A.h_(s,q))){e=q.y
e=!new A.Y(e,A.l(e).h("Y<2>")).D(0,new A.h0(r))}}p=e?3:4
break
case 3:p=5
return c.b=new A.ad(q,A.d([],t.Z),s.ad(r,q),!1,"\u5df2\u6709\u622a\u51fb\u90e8\u961f\u80fd\u53ca\u65f6\u63a5\u654c\uff0c\u7b49\u5f85\u6267\u884c\u7ed3\u679c\uff0c\u4e0d\u91cd\u590d\u6d3e\u51fa\u7b2c\u4e8c\u652f\u90e8\u961f","hold"),1
case 5:p=1
break
case 4:e=!1
if(f)if(!r.ga1())e=(i==null?null:i.a)===B.h
p=e?6:7
break
case 6:p=8
return c.b=new A.ad(q,A.d([],t.Z),s.ad(r,q),!1,"\u57ce\u9632\u4e0e\u73b0\u6709\u5b88\u5c06\u8db3\u4ee5\u5e94\u5bf9\u53ef\u89c1\u6765\u654c\uff0c\u7ef4\u6301\u8fdc\u5f81\uff0c\u4e0d\u53ec\u56de\u5c06\u9886","hold"),1
case 8:p=1
break
case 7:e=s.by(r,q)
l=A.o(e,e.$ti.h("a.E"))
e=A.i(l)
m=e.h("c<1>")
k=A.o(new A.c(l,e.h("e(1)").a(new A.h1(s,r,i,q)),m),m.h("a.E"))
p=k.length!==0?9:10
break
case 9:p=11
return c.bS(k)
case 11:p=1
break
case 10:p=f&&q.L(g)<q.O(h)?12:13
break
case 12:j=q.P()
p=j.du(h,!0)&&j.d>=j.ae(!0).a?14:15
break
case 14:p=16
return c.b=s.aD(r,q,j,A.d([new A.A(B.u,null,g,null,0,B.d)],t.w),"\u672c\u5730\u4ecd\u6709\u8fce\u6218\u540d\u989d\uff0c\u5148\u62db\u52df\u8865\u5f3a\uff0c\u518d\u6309\u5b9e\u9645\u5230\u4efb\u5c5e\u6027\u590d\u6838\uff0c\u6682\u4e0d\u53ec\u56de\u8fdc\u5f81"),1
case 16:p=1
break
case 15:case 13:p=17
return c.bS(l)
case 17:case 1:return 0
case 2:return c.c=n.at(-1),3}}}},
by(a,b){return new A.av(this.cB(a,b),t.dT)},
cB(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e,d,c,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1
return function $async$by(g2,g3,g4){if(g3===1){n.push(g4)
p=o}for(;;)switch(p){case 0:f5=r.a
f6=f5.a
f7=q.L(f6)>q.O(f5)
f8=t.Z
f9=A.d([],f8)
g0=s.ad(r,q)
g1=!f7
if(g1){m=s.a5(r,q)
m=(m==null?null:m.a)!==B.h}else m=!0
p=3
return g2.b=new A.ad(q,f9,g0,m,f7?"unsalvageableDefense\uff1a\u5f53\u524d\u5b89\u5168\u540d\u989d "+q.O(f5)+"\uff0c\u9a7b\u519b "+q.L(f6)+"\uff0c\u7b49\u5f85\u5408\u6cd5\u4fee\u590d":"\u4fdd\u6301\u53ef\u51fa\u573a\u5b88\u519b\uff0c\u7ee7\u7eed\u76d1\u63a7\u5168\u90e8\u6765\u654c","local"),1
case 3:f9=s.c
if(!f9.a2()){p=1
break}g0=q.f
m=q.u(f6).length
l=s.b
k=l.b
j=k.i(0,"soldierLimit")
j.toString
i=Math.max(0,Math.min(g0,m*B.b.k(j))-q.e)
p=i>0?4:5
break
case 4:h=q.P()
g=Math.min(i,h.gbT())
p=g>0&&h.aE(g)?6:7
break
case 6:p=8
return g2.b=s.aD(r,q,h,A.d([new A.A(B.m,null,f6,null,g,B.d)],t.w),"\u4f18\u5148\u7528\u56fd\u5e93\u8865\u8db3\u73b0\u6709\u5b88\u519b\u5175\u5458\uff0c\u518d\u5224\u65ad\u662f\u5426\u9700\u8981\u5916\u63f4"),1
case 8:case 7:case 5:g0=f5.ax
m=g0==null
p=m?9:10
break
case 9:f=q.P()
e=A.d([],t.w)
j=f.u(f6)
d=A.i(j)
c=d.h("c<1>")
a0=A.o(new A.c(j,d.h("e(1)").a(new A.fs()),c),c.h("a.E"))
B.a.B(a0,new A.ft())
p=a0.length!==0?11:12
break
case 11:a1=B.a.gH(a0)
j=a1.a
d=f.x
c=f5.d
a2=0
case 13:if(a2<4){a3=d.i(0,f6)
a3.toString
a4=k.i(0,"maxLevel")
a4.toString
a4=a3<B.b.k(a4)
a3=a4}else a3=!1
if(!a3){p=14
break}if(!f.aL(f5,a1)||f.d<f.ae(!0).a){p=14
break}B.a.m(e,new A.A(B.l,j,f6,null,0,B.d))
a3=f.L(f6)
a4=d.i(0,f6)
if(a4==null)a4=c
p=a3<=a4?15:16
break
case 15:p=17
return g2.b=s.aD(r,q,f,e,"\u4f18\u5148\u7531\u9ad8\u5185\u653f\u5c06\u9886\u5347\u7ea7\uff0c\u4fdd\u62a4\u771f\u5b9e\u8fce\u6218\u540d\u989d"),1
case 17:a3=s.a5(r,f)
if((a3==null?null:a3.a)===B.h||f7){p=14
break}case 16:++a2
p=13
break
case 14:case 12:case 10:p=f7?18:19
break
case 18:j=q.u(f6)
d=A.i(j)
c=d.h("c<1>")
a5=A.o(new A.c(j,d.h("e(1)").a(new A.fu()),c),c.h("a.E"))
B.a.B(a5,new A.fC())
j=A.i(a5),d=A.Z(a5,0,A.X(3,"count",t.S),j.c),c=d.$ti,d=new A.r(d,d.gl(0),c.h("r<k.E>")),a3=f5.db,a4=f5.ay,a6=f5.d,a7=t.T,a8=t.w,a9=t.e,b0=j.h("e(1)"),j=j.h("c<1>"),c=c.h("k.E")
case 20:if(!d.j()){p=21
break}b1=d.d
if(b1==null)b1=c.a(b1)
if(!f9.a2()){p=21
break}b2=q.P()
e=A.d([],a8)
b3=A.d([b1],a9)
B.a.J(b3,new A.c(a5,b0.a(new A.fD(b1)),j))
b1=b3.length,b4=b2.x,b5=0
case 22:if(!(b5<b3.length)){p=24
break}b6=b3[b5]
b7=b2.L(f6)
if(m){b8=b4.i(0,f6)
if(b8==null)b8=a6}else{b8=a3?1:0
b8=B.c.A(g0-a4-b8,0,5)}if(b7<=b8){p=24
break}if(!b2.c4(b6)){p=23
break}B.a.m(e,new A.A(B.D,b6.a,null,null,0,B.d))
p=m?25:26
break
case 25:b9=b2.P()
c0=A.o(e,a7)
b7=b9.u(f6)
b8=A.i(b7)
c1=b8.h("c<1>")
a0=A.o(new A.c(b7,b8.h("e(1)").a(new A.fE()),c1),c1.h("a.E"))
B.a.B(a0,new A.fF())
p=a0.length!==0?27:28
break
case 27:b7=b9.x
c2=0
for(;;){if(c2<3){b8=b9.L(f6)
c1=b7.i(0,f6)
if(c1==null)c1=a6
c1=b8>c1
b8=c1}else b8=!1
if(!b8)break
if(!b9.aL(f5,B.a.gH(a0)))break
B.a.m(c0,new A.A(B.l,B.a.gH(a0).a,f6,null,0,B.d));++c2}b8=b9.L(f6)
b7=b7.i(0,f6)
if(b7==null)b7=a6
p=b8<=b7&&b9.d>=b9.ae(!0).a?29:30
break
case 29:p=31
return g2.b=s.aD(r,q,b9,c0,"\u5148\u89e3\u96c7\u4f4e\u4ea4\u6362\u4ef7\u503c\u6321\u4f4d\u8005\u7b79\u8d44\uff0c\u4fdd\u7559\u4e3b\u6301\u8005\u5b8c\u6210\u6551\u57ce\u5347\u7ea7"),1
case 31:case 30:case 28:case 26:case 23:b3.length===b1||(0,A.v)(b3),++b5
p=22
break
case 24:b1=b2.L(f6)
if(m){b3=b4.i(0,f6)
if(b3==null)b3=a6}else{b3=a3?1:0
b3=B.c.A(g0-a4-b3,0,5)}p=b1<=b3?32:33
break
case 32:p=34
return g2.b=s.aD(r,q,b2,e,"\u6ca1\u6709\u53ef\u652f\u4ed8\u4e14\u53ca\u65f6\u7684\u5347\u7ea7\u65b9\u6848\uff0c\u6e05\u51fa\u6321\u4f4d\u5b88\u5c06\u5e76\u4fdd\u7559\u6838\u5fc3\u51fa\u573a"),1
case 34:case 33:p=20
break
case 21:case 19:j=q.u(f6)
d=A.i(j)
c=d.h("c<1>")
c3=A.o(new A.c(j,d.h("e(1)").a(new A.fG(q)),c),c.h("a.E"))
B.a.B(c3,new A.fH())
if(g1){g1=r.f
g1=(g1==null?null:g1.a)!==B.h}else g1=!0
p=g1&&s.a.Q.gM().gl(0)>1?35:36
break
case 35:c4=q.P()
g1=r.f
if((g1==null?null:g1.a)===B.r)c4.ax.m(0,f6)
c5=A.d([],f8)
g1=s.a.Q
j=g1.gM()
d=j.$ti
c=d.h("c<a.E>")
c6=A.o(new A.c(j,d.h("e(a.E)").a(new A.fI(f5)),c),c.h("a.E"))
B.a.B(c6,new A.fJ(f5))
j=A.Z(c3,0,A.X(l.w.fy,"count",t.S),A.i(c3).c),d=j.$ti,j=new A.r(j,j.gl(0),d.h("r<k.E>")),c=f5.db,a3=f5.ay,a4=A.i(c6),a6=a4.c,a4=a4.h("y<1>"),a7=a4.h("r<k.E>"),a8=s.e,a9=a8.c,b0=s.f,b1=a4.h("k.E"),d=d.h("k.E"),b3=f5.d,b4=t.er,b7=t.bo,b8=t.i,c1=t.I
case 37:if(!j.j()){p=38
break}c7=j.d
if(c7==null)c7=d.a(c7)
if(!f9.a2()){p=38
break}c8=new A.y(c6,0,4,a4)
c8.U(c6,0,4,a6)
c8=new A.r(c8,c8.gl(0),a7)
c9=c4.x
d0=null
while(c8.j()){d1=c8.d
if(d1==null)d1=b1.a(d1)
d2=d1.a
d3=b0.i(0,d2)
d4=d3==null
if(d4)d5=null
else d5=d3.d.length!==0||d3.a.ax!=null
if(d5===!0){if(d4)d4=null
else{d4=d3.f
d4=d4==null?null:d4.a}d4=d4!==B.h}else d4=!1
if(d4)continue
d4=c4.L(d2)
d5=d1.ax
if(d5==null){d2=c9.i(0,d2)
if(d2==null)d2=d1.d}else{d2=d1.ay
d6=d1.db?1:0
d6=B.c.A(d5-d2-d6,0,5)
d2=d6}if(d4>=d2)continue
d7=a9.ao(c7,d1.e,g1,!0,d1)
d2=f7?"transfer":"evacuate"
d8=a8.b1(c4,c7,d7,!0,r.ga6(),!0,"\u5728\u539f\u57ce\u5371\u9669\u7a97\u53e3\u524d\u8fdb\u9a7b\u5b89\u5168\u53cb\u57ce\uff0c\u6539\u53d8\u6240\u5c5e\u57ce\u4ee5\u4fdd\u5168\u5c06\u9886",d2,d1)
if(d8!=null)d1=d0==null||d8.a.d>d0.a.d
else d1=!1
if(d1)d0=d8}if(d0==null){p=37
break}c4=d0.a
B.a.m(c5,d0.b)
c7=c4.L(f6)
if(m){c8=c4.x.i(0,f6)
if(c8==null)c8=b3}else{c8=c?1:0
c8=B.c.A(g0-a3-c8,0,5)}p=c7<=c8?39:40
break
case 39:d9=new A.bR(c5,b4.a(new A.fv()),b7).E(0,0,new A.fw(s),b8)
c7=c4.P()
c8=A.o(c5,c1)
c9=s.ad(r,c4)
d1=isFinite(r.ga6())?"\u5b89\u5168\u5224\u65ad\u4ee5\u5b9e\u9645\u8fdb\u9a7b\u53cb\u57ce\u4e3a\u51c6\uff0c\u9014\u4e2d\u539f\u57ce\u5931\u5b88\u4ecd\u4f1a\u6e05\u9664\u90e8\u961f":"\u8f6c\u79fb\u5230\u5b89\u5168\u540e\u65b9\u6574\u5907"
p=41
return g2.b=new A.ad(c7,c8,c9+d9*0.65,!1,d1,"relocation"),1
case 41:if(f7){p=38
break}case 40:p=37
break
case 38:case 36:e0=s.cI(r,q)
e1=new A.fK(s,q)
g1=s.a.Q
j=g1.r
d=A.i(j)
c=d.h("c<1>")
e2=A.o(new A.c(j,d.h("e(1)").a(new A.fx(s,q,e1,e0)),c),c.h("a.E"))
B.a.B(e2,new A.fy(e1,f5))
j=r.d
l=j.length===0?0:l.w.fy
l=A.Z(e2,0,A.X(l,"count",t.S),A.i(e2).c)
d=l.$ti
l=new A.r(l,l.gl(0),d.h("r<k.E>"))
c=s.e
a3=s.d
a4=c.c
a6=a4.a
a7=q.y
a8=!e0
a9=s.f
d=d.h("k.E")
b0=f5.db
b1=f5.ay
b3=f5.d
b4=q.x
b7=r.f
b8=A.i(j)
c1=b8.h("p(1)")
c7=b8.h("a0<1,p>")
c8=f5.e
c9=b8.c
b8=b8.h("y<1>")
d1=b8.h("r<k.E>")
d2=b8.h("k.E")
d4=b7==null
case 42:if(!l.j()){p=43
break}d5=l.d
if(d5==null)d5=d.a(d5)
if(!f9.a2()){p=43
break}d6=d5.c
e3=a9.i(0,d6)
e4=r.ga6()
e5=e3==null
if(e5)e6=null
else e6=e3.d.length!==0||e3.a.ax!=null
e6=e6===!0?e3.ga6():1/0
e7=Math.min(e4,e6)
e4=!1
if(!e1.$1(d5)||e0){e6=s.a5(r,q)
if((e6==null?null:e6.a)!==B.h){e4=q.L(f6)
if(m){e6=b4.i(0,f6)
if(e6==null)e6=b3}else{e6=b0?1:0
e6=B.c.A(g0-b1-e6,0,5)}e6=e4<e6
e4=e6}}p=e4?44:45
break
case 44:e8=new A.a0(j,c1.a(new A.fz()),c7).aj(0,new A.fA(s))
if(m){e4=b4.i(0,f6)
if(e4==null)e4=b3}else{e4=b0?1:0
e4=B.c.A(g0-b1-e4,0,5)}e6=k.i(0,"soldierLimit")
e6.toString
e9=a3.bk(d5,e8,e8.k4,e4,!1,Math.min(B.b.k(e6),q.e+d5.gN()))
e4=d4?null:b7.b
if(e4==null)e4=-1
p=e9.b>e4+0.05?46:47
break
case 46:d7=a4.ao(d5,c8,g1,!0,f5)
if(m){e4=b4.i(0,f6)
if(e4==null)e4=b3}else{e4=b0?1:0
e4=B.c.A(g0-b1-e4,0,5)}e6=s.a5(r,q)
e6=e6==null?null:e6.b
d8=c.b1(q,d5,d7,!0,e7,!0,"\u672c\u5730\u62b5\u6297\u4ecd\u6709\u7f3a\u53e3\uff08\u57ce\u9632"+e4+"\u7ea7\uff0c\u9632\u5b88\u4f59\u91cf"+B.b.aI((e6==null?-1:e6)*100)+"\u70b9\uff09\uff0c\u63f4\u519b\u7ea6"+B.b.aZ(d7.b,1)+"\u79d2\u5230\u8fbe\uff0c\u5371\u9669\u7a97\u53e3"+B.b.aZ(e7,1)+"\u79d2\uff0c\u9884\u7559\u5165\u57ce\u540d\u989d","rescue",f5)
if(d8!=null){e4=s.a5(r,d8.a)
e4=(e4==null?null:e4.a)===B.h}else e4=!1
p=e4?48:49
break
case 48:e4=d8.a
p=50
return g2.b=new A.ad(e4,A.d([d8.b],f8),s.ad(r,e4)-A.ai(d5)*0.08,!1,"","recall"),1
case 50:case 49:case 47:case 45:e4=new A.y(j,0,2,b8)
e4.U(j,0,2,c9)
e4=new A.r(e4,e4.gl(0),d1)
e6=d5.k4
d6=d6!==f6
f0=d5.a
case 51:if(!e4.j()){p=52
break}f1=e4.d
if(f1==null)f1=d2.a(f1)
f2=a7.i(0,f0)
if((f2==null?null:f2.b)==="intercept"){f2=a7.i(0,f0)
f2=f2==null?null:f2.r
f3=f2===f1.a.a}else f3=!1
if(e1.$1(d5)&&a8&&!f3){p=51
break}f2=!1
if(d6){if(e5)f4=null
else f4=e3.d.length!==0||e3.a.ax!=null
if(f4===!0){if(e5)f2=null
else{f2=e3.f
f2=f2==null?null:f2.a}f2=f2!==B.h}}if(f2){p=51
break}f2=f1.a
d7=c.c7(d5,f2,q)
if(a3.d6(d5,f2,f2.k4,e6,a6.bX(f2.z)).a!==B.h){p=51
break}f4=e1.$1(d5)?"\u672c\u5730\u624b\u6bb5\u65e0\u6cd5\u62b5\u6321\u660e\u786e\u6765\u88ad\uff0c\u7d27\u6025\u622a\u51fb\u9884\u8ba1"+B.b.aZ(d7.b,1)+"\u79d2\uff0c\u65e9\u4e8e\u654c\u519b"+B.b.aZ(f1.b,1)+"\u79d2\u62b5\u57ce\uff1b\u6700\u540e\u624d\u6539\u6d3e\u8fdc\u5f81":"\u52a8\u7528\u9644\u8fd1\u95f2\u7f6e\u90e8\u961f\u622a\u51fb\u6765\u654c\uff0c\u4e0d\u6253\u65ad\u4e3b\u653b\u4efb\u52a1"
d8=c.cq(q,d5,d7,f1.b,!0,f2,f4,"intercept",f5)
p=d8!=null?53:54
break
case 53:f1=d8.a
p=55
return g2.b=new A.ad(f1,A.d([d8.b],f8),s.ad(r,f1)+80-A.ai(d5)*0.08,f7,"","recall"),1
case 55:case 54:p=51
break
case 52:p=42
break
case 43:if(g1.gM().gl(0)===1)l=(d4?null:b7.a)===B.r&&c3.length>1
else l=!1
p=l?56:57
break
case 56:l=g1.f,k=A.i(l),j=k.h("c<1>"),j=A.ka(new A.c(l,k.h("e(1)").a(new A.fB(s)),j),3,j.h("a.E")),k=j.a,j=new A.ba(k.gC(k),j.b,A.l(j).h("ba<1>"))
case 58:if(!j.j()){p=59
break}l=j.gn()
if(!f9.a2()){p=59
break}b6=B.a.gH(c3)
d8=c.co(q,b6,a4.ao(b6,l.e,g1,!0,l),r.ga6(),!0,"\u4fdd\u7559\u539f\u57ce\u5b88\u519b\u62d6\u5ef6\uff0c\u6838\u5fc3\u5728\u5371\u9669\u7a97\u53e3\u524d\u593a\u53d6\u7a7a\u57ce\u5efa\u7acb\u65b0\u636e\u70b9","newBase",l)
p=d8!=null?60:61
break
case 60:l=d8.a
k=A.d([d8.b],f8)
d=s.ad(r,l)
a3=A.ai(b6)
a6=l.L(f6)
if(m){a7=l.x.i(0,f6)
if(a7==null)a7=b3}else{a7=b0?1:0
a7=B.c.A(g0-b1-a7,0,5)}p=62
return g2.b=new A.ad(l,k,d+a3*1.2,a6>a7,"","relocation"),1
case 62:case 61:p=58
break
case 59:case 57:case 1:return 0
case 2:return g2.c=n.at(-1),3}}}},
aD(a,b,c,d,e){var s,r,q,p,o,n,m=this
t.f3.a(d)
s=A.i(d)
r=s.h("p?(1)").a(new A.fS(m))
q=c.z.df(b.z).E(0,0,new A.fT(m),t.i)
p=c.P()
o=A.o(d,t.T)
s=A.o(new A.ce(new A.a0(d,r,s.h("a0<1,p?>")),t.cO),t.r)
r=a.d
n=A.i(r)
B.a.J(s,new A.a0(r,n.h("p(1)").a(new A.fU()),n.h("a0<1,p>")))
n=a.a
s=A.d([new A.P(e,o,m.e.ag(s,A.d([n],t.Y)),B.q,c.ae(!0).a,!0)],t.Z)
o=m.ad(a,c)
r=Math.max(0,b.d-c.d)
if(c.L(n.a)<=c.O(n)){n=m.a5(a,c)
n=(n==null?null:n.a)!==B.h}else n=!0
return new A.ad(p,s,o-q*0.65-r*0.2,n,"","local")},
cL(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=b.y,s=new A.ag(s,s.r,s.e,A.l(s).h("ag<2>")),r=this.e,q=a.a,p=q.a,o=this.a.Q,n=o.b,m=b.z,l=this.b.w.d,k=a.b;s.j();){j=s.d
if(j.b!=="intercept"||j.r!==p||j.y<=n)continue
i=o.a0(j.a)
if(i==null||i.f<=0||i.fx||m.p(0,i.a))continue
if(i.id===p)return!0
if(!i.db||j.z<=n)continue
h=r.c7(i,q,b)
if(h.d&&h.b+l<k)return!0}return!1},
cI(a,b){var s,r
if(this.c.e)return!1
s=a.a
if(!(s.ax!=null||B.a.D(a.d,new A.fL())))return!1
if(a.ga1())return!0
if(b.u(s.a).length===0)return!0
r=this.a5(a,b)
return r!=null&&r.c<-this.b.w.p3},
a5(b3,b4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1=null,b2=b3.d
if(b2.length===0)return b1
s=b3.a
r=s.a
q=b4.u(r)
p=b4.e
for(o=b4.y,o=new A.ag(o,o.r,o.e,A.l(o).h("ag<2>")),n=t.N,m=t.z,l=t.n,k=b0.e.c,j=b0.a.Q,i=j.b,h=b4.z,g=b0.b,f=g.w.d;o.j();){e=o.d
if(!e.as||e.d!==r||e.y<i)continue
d=j.a0(e.a)
if(d==null||d.fx||d.id!=null||d.f<=0||h.p(0,d.a)||B.a.D(q,new A.fO(d)))continue
c=d.z
for(e=J.l8(e.w,e.x),b=e.$ti,e=new A.r(e,e.gl(0),b.h("r<k.E>")),b=b.h("k.E"),a=0;e.j();c=a1){a0=e.d
a1=a0==null?b.a(a0):a0
a+=k.ac(c,a1)}if(!isFinite(a)||a+f>=b3.ga6())continue
p=Math.min(b4.f,p+d.gN())
e=A.aq(d.I(),n,m)
e.v(0,"hp",d.r)
e.v(0,"troops",A.d([],l))
e.v(0,"s",0)
B.a.m(q,A.jR(e))}B.a.B(q,new A.fP())
o=A.i(q)
n=t.r
a2=A.aB(new A.c(q,o.h("e(1)").a(new A.fQ(b3)),o.h("c<1>")),n)
m=A.d([],t.e)
if(a2!=null)m.push(a2)
o=o.h("L<1>")
B.a.J(m,new A.L(q,o).bw(0,o.h("e(k.E)").a(new A.fR(a2))))
a3=A.Z(m,0,A.X(b4.O(s),"count",t.S),n).ak(0)
if(a3.length===0)return b1
for(o=b0.d,n=s.d,m=b4.x,g=g.b,l=s.CW,k=s.db,j=s.ay,s=s.ax,i=s==null,a4=b1,a5=0;a5<a3.length;++a5){d=a3[a5]
if(d.as===B.e)a6=0
else{h=g.i(0,"soldierLimit")
h.toString
a6=Math.min(p,B.b.k(h)-d.gN())}p-=a6
for(h=b2.length,a7=b1,a8=0;a8<b2.length;b2.length===h||(0,A.v)(b2),++a8){f=b2[a8].a
if(i){e=m.i(0,r)
if(e==null)e=n}else{e=k?1:0
e=B.c.A(s-j-e,0,5)}a9=o.bk(d,f,f.k4,Math.max(1,e-a5),!1,d.gN()+a6)
if(a7==null||a9.b<a7.b)a7=a9}if(d.e===2&&d.a===l)return a7
if(a4==null||a7.b>a4.b)a4=a7}return a4},
ad(a,b){var s,r,q,p=a.a,o=p.a,n=b.L(o),m=Math.max(0,n-b.O(p))
o=b.u(o)
s=A.i(o)
s=new A.c(o,s.h("e(1)").a(new A.fM()),s.h("c<1>")).E(0,0,new A.fN(),t.H)
o=this.a.Q.gM().gl(0)===1?400:0
r=150+p.r*4+a.w*0.5+s+o
q=this.a5(a,b)
p=n===0?r*2:0
o=q==null?null:q.b
if(o==null)o=-0.8
return-m*5000-p+o*r}}
A.h_.prototype={
$1(a){return this.a.cL(t.O.a(a),this.b)},
$S:10}
A.h0.prototype={
$1(a){t.J.a(a)
return a.f&&B.a.D(this.a.d,new A.fZ(a))},
$S:11}
A.fZ.prototype={
$1(a){return t.O.a(a).a.a===this.a.r},
$S:10}
A.h1.prototype={
$1(a){var s,r,q,p,o,n=this
t.cs.a(a)
s=!1
if(a.f==="local"){r=a.b
if(r.length!==0)if(B.a.D(r,new A.fX())){q=a.a
p=n.b
o=p.a
if(q.L(o.a)<=q.O(o)){s=n.a
q=s.a5(p,q)
q=q==null?null:q.b
if(q==null)q=-1
o=n.c
o=o==null?null:o.b
s=(q>(o==null?-1:o)+0.04||B.a.D(r,new A.fY()))&&a.c>s.ad(p,n.d)}}}return s},
$S:40}
A.fX.prototype={
$1(a){return B.a.D(t.I.a(a).b,new A.fW())},
$S:30}
A.fW.prototype={
$1(a){var s=t.T.a(a).a
return s===B.l||s===B.m||s===B.E},
$S:18}
A.fY.prototype={
$1(a){return B.a.D(t.I.a(a).d,new A.fV())},
$S:30}
A.fV.prototype={
$1(a){return t.J.a(a).b==="intercept"},
$S:11}
A.fs.prototype={
$1(a){return t.r.a(a).dy},
$S:0}
A.ft.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fu.prototype={
$1(a){t.r.a(a)
return a.dx&&a.e!==2},
$S:0}
A.fC.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.ai(a),A.ai(b))},
$S:2}
A.fD.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fE.prototype={
$1(a){return t.r.a(a).dy},
$S:0}
A.fF.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fG.prototype={
$1(a){t.r.a(a)
return a.cy&&!this.a.as.p(0,a.a)},
$S:0}
A.fH.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ai(s.a(b)),A.ai(a))},
$S:2}
A.fI.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:1}
A.fJ.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.G(s),b.e.G(s))},
$S:4}
A.fv.prototype={
$1(a){return t.I.a(a).d},
$S:43}
A.fw.prototype={
$2(a,b){var s
A.am(a)
s=this.a.a.Q.a0(t.J.a(b).a)
s.toString
return a+A.ai(s)},
$S:68}
A.fK.prototype={
$1(a){var s,r,q=this.a.a.Q,p=this.b
if(A.jG(a,q,p)==null){p=p.y
s=a.a
r=p.i(0,s)
if((r==null?null:r.b)==="intercept"){p=p.i(0,s)
q=q.a0(p==null?null:p.r)
q=q==null?null:q.f
q=(q==null?0:q)>0}else q=!1}else q=!0
return q},
$S:0}
A.fx.prototype={
$1(a){var s,r,q,p,o=this
t.r.a(a)
s=!1
if(a.b===o.a.a.Q.a)if(a.db)if(!a.fx){r=o.b
q=a.a
p=r.y.i(0,q)
if((p==null?null:p.as)!==!0)if(!r.as.p(0,q))s=!o.c.$1(a)||o.d}return s},
$S:0}
A.fy.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a
if(!J.ay(s.$1(a),s.$1(b)))return s.$1(a)?1:-1
s=this.b.e
return B.b.t(a.z.G(s),b.z.G(s))},
$S:2}
A.fz.prototype={
$1(a){return t.O.a(a).a},
$S:19}
A.fA.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.kG(a,s)>A.kG(b,s)?a:b},
$S:27}
A.fB.prototype={
$1(a){var s
t.q.a(a)
s=this.a.a.Q
return a.b!==s.a&&s.u(a.a).length===0},
$S:1}
A.fS.prototype={
$1(a){return this.a.a.Q.a0(t.T.a(a).b)},
$S:47}
A.fT.prototype={
$2(a,b){var s
A.am(a)
s=this.a.a.Q.a0(A.I(b))
s.toString
return a+A.ai(s)},
$S:48}
A.fU.prototype={
$1(a){return t.O.a(a).a},
$S:19}
A.fL.prototype={
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
A.fO.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fP.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.fQ.prototype={
$1(a){return t.r.a(a).a===this.a.a.CW},
$S:0}
A.fR.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fM.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.fN.prototype={
$2(a,b){return A.x(a)+A.ai(t.r.a(b))},
$S:49}
A.t.prototype={
I(){return A.d([this.a,this.b],t.n)},
G(a){var s=this.a-a.a,r=this.b-a.b
return Math.sqrt(s*s+r*r)},
aH(a,b){var s=this.a,r=this.b
return new A.t(s+(a.a-s)*b,r+(a.b-r)*b)}}
A.eg.prototype={
X(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this.a,f=B.a.gH(g)
for(s=a.a,r=a.b,q=1/0,p=0;o=g.length,p<o;){n=g[p];++p
m=g[p%o]
o=n.a
l=m.a-o
k=n.b
j=m.b-k
i=n.aH(m,B.b.A(((s-o)*l+(r-k)*j)/(l*l+j*j),0,1))
h=i.G(a)
if(h<q){q=h
f=i}}return f},
p(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(this.X(b).G(b)<1e-7)return!0
for(s=this.a,r=s.length,q=b.b,p=b.a,o=!1,n=0;n<r;){m=s[n];++n
l=s[n%r]
k=m.b
j=l.b
if(k>q!==j>q){i=m.a
i=p<(l.a-i)*(q-k)/(j-k)+i
k=i}else k=!1
if(k)o=!o}return o},
c6(a,b){var s
if(this.p(0,a))return null
s=this.c2(a,b)
return s.length===0?null:B.a.aj(s,B.B)},
c2(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.a,g=b.a-h,f=a.b,e=b.b-f,d=A.d([],t.n)
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
if(j>=-1e-7&&j<=1.0000001&&i>=-1e-7&&i<=1.0000001)B.a.m(d,B.b.A(j,0,1))}return d},
bU(a,b){var s,r=this
if(r.p(0,a))return r.X(a)
s=r.c6(a,b)
return s==null?r.X(a):a.aH(b,s)},
c3(a,b){var s=a.G(b),r=s<1e-7?new A.t(a.a+4096,a.b+0):a.aH(b,4096/s),q=this.c2(a,r)
return q.length===0?this.X(b):a.aH(r,B.a.aj(q,B.A))}}
A.ak.prototype={
aR(){return"AiArmyState."+this.b}}
A.p.prototype={
gN(){var s=this.at,r=A.i(s)
return new A.c(s,r.h("e(1)").a(new A.du()),r.h("c<1>")).gl(0)},
gbl(){return this.f+B.a.E(this.at,0,new A.dt(),t.H)},
I(){var s,r,q,p,o,n,m,l=this,k=l.z,j=t.n
k=A.d([k.a,k.b],j)
s=l.Q
s=A.d([s.a,s.b],j)
r=l.ch
r=r==null?null:A.d([r.a,r.b],j)
q=A.d([],t.A)
for(p=l.p1,o=p.length,n=0;n<p.length;p.length===o||(0,A.v)(p),++n){m=p[n]
q.push(A.d([m.a,m.b],j))}return A.Q(["id",l.a,"c",l.b,"home",l.c,"o",l.d,"t",l.e,"hp",l.f,"max",l.r,"a",l.w,"p",l.x,"pay",l.y,"xy",k,"v",s,"s",l.as.a,"troops",l.at,"w",l.ax,"m",l.ay,"to",r,"target",l.CW,"return",l.cx,"dispatch",l.cy,"move",l.db,"dismiss",l.dx,"upgrade",l.dy,"retreat",l.fr,"marked",l.fx,"rev",l.fy,"orderRev",l.go,"opponent",l.id,"clashes",l.k1,"received",l.k2,"dealt",l.k3,"opening",l.k4,"weaponReady",l.ok,"returnPath",q,"regionCity",l.p2,"salaryPaidMonth",l.p3,"movementPending",l.p4],t.N,t.X)}}
A.du.prototype={
$1(a){return A.am(a)>0},
$S:14}
A.dt.prototype={
$2(a,b){return A.x(a)+A.am(b)},
$S:15}
A.D.prototype={
gZ(){var s,r=this,q=r.ax
if(q==null)q=r.d
else{s=r.db?1:0
s=B.c.A(q-r.ay-s,0,5)
q=s}return q},
I(){var s,r,q,p,o,n=this,m=n.e,l=t.n
m=A.d([m.a,m.b],l)
s=A.d([],t.A)
for(r=n.f.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.v)(r),++p){o=r[p]
s.push(A.d([o.a,o.b],l))}return A.Q(["id",n.a,"c",n.b,"native",n.c,"level",n.d,"xy",m,"outline",s,"income",n.r,"baseIncome",n.z,"poor",n.w,"cap",n.x,"recruitCap",n.y,"recruit",n.Q,"upgrade",n.as,"rev",n.at,"initial",n.ax,"wins",n.ay,"attacker",n.ch,"defender",n.CW,"stage",n.cx,"next",n.cy,"fallen",n.db,"danger",n.dx],t.N,t.X)}}
A.b_.prototype={
I(){var s,r,q=this,p=t.N,o=t.S,n=A.U(p,o)
for(s=q.x.gal(),s=s.gC(s);s.j();){r=s.gn()
n.v(0,""+r.a,r.b)}o=A.U(p,o)
for(s=q.y.gal(),s=s.gC(s);s.j();){r=s.gn()
o.v(0,""+r.a,r.b)}return A.Q(["id",q.a,"gold",q.b,"reserves",q.c,"capacity",q.d,"salary",q.e,"poor",q.f,"baseIncome",q.r,"garrisonAccrued",q.w,"stock",n,"hate",o],p,t.X)}}
A.e8.prototype={
gai(){return B.a.am(this.w,new A.ee(this))},
gM(){var s=this.f,r=A.i(s)
return new A.c(s,r.h("e(1)").a(new A.ef(this)),r.h("c<1>"))},
u(a){var s=this.r,r=A.i(s),q=r.h("c<1>")
s=A.o(new A.c(s,r.h("e(1)").a(new A.eb(this,a)),q),q.h("a.E"))
B.a.B(s,new A.ec())
return s},
a0(a){var s=this.r,r=A.i(s)
return A.aB(new A.c(s,r.h("e(1)").a(new A.ed(a)),r.h("c<1>")),t.r)},
F(a){var s=this.f,r=A.i(s)
return A.aB(new A.c(s,r.h("e(1)").a(new A.e9(a)),r.h("c<1>")),t.q)},
I(){var s,r,q,p,o=this,n=t.d,m=A.d([],n)
for(s=o.f,r=s.length,q=0;q<r;++q)m.push(s[q].I())
s=A.d([],n)
for(r=o.r,p=r.length,q=0;q<p;++q)s.push(r[q].I())
n=A.d([],n)
for(r=o.w,p=r.length,q=0;q<p;++q)n.push(r[q].I())
return A.Q(["country",o.a,"tick",o.b,"month",o.e,"cities",m,"heroes",s,"countries",n,"pool",o.x,"salary",o.y,"year",o.c,"monthIndex",o.d],t.N,t.X)}}
A.ee.prototype={
$1(a){return t.t.a(a).a===this.a.a},
$S:6}
A.ef.prototype={
$1(a){return t.q.a(a).b===this.a.a},
$S:1}
A.eb.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b
if(a.c===s){r=a.as
s=(r===B.f||r===B.e)&&a.f>0&&a.b===B.a.am(this.a.f,new A.ea(s)).b}else s=!1
return s},
$S:0}
A.ea.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.ec.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.ed.prototype={
$1(a){return t.r.a(a).a===this.a},
$S:0}
A.e9.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.hf.prototype={
ct(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
for(s=this.b,r=s.y,r=new A.ag(r,r.r,r.e,A.l(r).h("ag<2>")),q=this.f,p=this.a,o=p.a,n=s.z,s=s.Q;r.j();){m=r.d
l=p.a0(m.a)
k=p.F(m.d)
j=!0
if(m.b==="expedition")if(l!=null)if(k!=null)if(k.b!==o)if(l.b===o)if(!l.fx)if(!(l.f<=0)){m=l.a
if(!n.p(0,m)){i=l.as
if(i!==B.y)m=(i===B.f||i===B.e)&&!s.p(0,m)
else m=j}else m=j}else m=j
else m=j
else m=j
else m=j
else m=j
else m=j
else m=j
if(m)continue
J.l2(q.cd(k.a,new A.hh()),l)}},
gaX(){var s,r,q,p=this,o=p.d
if(o==null||p.f.a!==0)return o
s=new A.hl(p)
r=p.a
if(A.aQ(o,r,p.c,null).ga3())return s.$1(o)?o:null
r=r.f
q=A.i(r)
return new A.a0(r,q.h("b(1)").a(new A.hj()),q.h("a0<1,b>")).dF(0).D(0,new A.hk(p,s))?null:o},
gcc(){var s,r=this
if(r.gaX()!=null){s=r.a.F(r.e)
s=s==null?null:s.b
s=s==r.gaX()}else s=!1
return s?r.e:null},
gY(){var s=this.f,r=A.l(s).h("a7<1>"),q=A.o(new A.a7(s,r),r.h("a.E"))
B.a.B(q,new A.hp(this))
return A.aB(q,t.S)},
gca(){var s,r=this,q=r.gY()
if(q!=null){s=r.c.w
s=r.a.d>=s.k2&&r.f.a<s.k1&&r.d9(q)>=s.k3}else s=!0
return s},
av(a){var s,r,q,p=this
if(p.gY()==null)return!0
s=!1
if(p.gaX()!=null)if(a.b!==p.gaX())s=p.gY()==null||!p.gca()
if(s)return!1
r=p.gY()
if(r==null)r=p.gcc()
s=!0
if(r!=null){q=a.a
if(q!==r)s=p.gY()!=null&&!p.f.a_(q)&&p.gca()}return s},
d9(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c="soldierLimit",b=d.a,a=b.F(a0)
a.toString
s=d.f.i(0,a0)
if(s==null)s=A.d([],t.e)
r=s.length
q=d.b.Q
p=d.c.b
o=0
n=0
for(;n<s.length;s.length===r||(0,A.v)(s),++n){m=s[n]
if(q.p(0,m.a)){l=p.i(0,c)
l.toString
k=B.b.k(l)}else k=m.gN()
o+=d.bM(m,k,0)}j=B.a.am(b.w,new A.hi(a)).c
for(b=b.u(a0),s=A.i(b).h("L<1>"),s=A.Z(new A.L(b,s),0,A.X(a.gZ(),"count",t.S),s.h("k.E")),b=s.$ti,s=new A.r(s,s.gl(0),b.h("r<k.E>")),r=a.db,q=a.ax,l=a.ay,i=q==null,b=b.h("k.E"),a=a.d,h=0,g=0;s.j();){f=s.d
if(f==null)f=b.a(f)
e=p.i(0,c)
e.toString
k=Math.min(B.b.k(e),f.gN()+j)
j-=k-f.gN()
if(i)e=a
else{e=r?1:0
e=B.c.A(q-l-e,0,5)}h+=d.bM(f,k,Math.max(1,e-g));++g}return h===0?1/0:o/h},
bM(a,b,c){var s,r=this.c,q=r.bY(a.w,c,!1)
r=r.b
s=r.i(0,"soldierPower")
s.toString
s=B.b.k(s)
r=r.i(0,"soldierHp")
r.toString
return(a.f+b*B.b.k(r))*(B.c.bi(q+b*s+2,4)+1)*(1+a.ay/1000)}}
A.hg.prototype={
$1(a){var s=t.q.a(a).b
return s===this.a&&s!==this.b.a},
$S:1}
A.hh.prototype={
$0(){return A.d([],t.e)},
$S:50}
A.hl.prototype={
$1(a){var s=this.a,r=s.a.f,q=A.i(r)
return new A.c(r,q.h("e(1)").a(new A.hn(a)),q.h("c<1>")).D(0,new A.ho(s))},
$S:17}
A.hn.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.ho.prototype={
$1(a){var s
t.q.a(a)
s=this.a
return s.a.gM().D(0,new A.hm(s,a))},
$S:1}
A.hm.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.b.c.ac(r,this.b.f.X(r))<=s.c.w.at},
$S:1}
A.hj.prototype={
$1(a){return t.q.a(a).b},
$S:51}
A.hk.prototype={
$1(a){var s
A.f(a)
s=this.a
return A.aQ(a,s.a,s.c,null).ga3()&&this.b.$1(a)},
$S:17}
A.hp.prototype={
$2(a,b){var s,r
A.f(a)
A.f(b)
s=this.a.f
r=B.c.t(s.i(0,b).length,s.i(0,a).length)
return r!==0?r:B.c.t(a,b)},
$S:24}
A.hi.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.d5.prototype={}
A.hq.prototype={
ah(a){var s=this.a.Q
return!A.aQ(a.b,s,this.b,null).ga3()||s.gM().gl(0)>=3||s.gM().D(0,new A.ht(this,a))},
bp(a,b,c,d){var s,r,q=a.as
if(!(q===B.f||q===B.e)){q=a.ax
s=t.x
return q.length===0?A.d([],s):A.d([q],s)}r=this.bh(b,a)
if(r.length===0)return A.d([],t.x)
return A.d([A.d([B.a.gH(r).a],t.b)],t.x)},
bh(a,b){var s=this.b.r.gb_(),r=A.l(s),q=r.h("c<a.E>"),p=A.o(new A.c(s,r.h("e(a.E)").a(new A.hr(this,a,b)),q),q.h("a.E"))
B.a.B(p,new A.hs(a))
return p},
cX(a){return this.bh(a,null)},
aY(a,b,c,d){var s,r,q,p,o,n,m,l,k,j=this
if(a===0||b.gZ()<3||j.a.Q.u(b.a).length<2)return a
s=A.aB(j.bh(c,d),t.o)
r=s==null?null:s.b
if(r==null)r=0
s=j.a.Q.r
q=A.i(s)
p=q.h("e(1)")
q=q.h("c<1>")
o=new A.c(s,p.a(new A.hw(j)),q).E(0,0,new A.hx(),t.S)
n=d.z
m=j.c.ac(n,b.f.X(n))
l=new A.c(s,p.a(new A.hy(j,o,m,b,c)),q).gl(0)
k=Math.max(0,c.d-c.V().a-20)
s=j.b
q=s.b.i(0,"soldierLimit")
q.toString
return Math.max(a,Math.min(s.w.fy,Math.min(l,B.c.aP(k,Math.max(1,r+B.b.k(q))))))},
de(a){var s,r,q,p,o,n=this.a.Q
if(n.c<3)return 1
s=A.aB(this.cX(a),t.o)
r=s==null?null:s.b
if(r==null)r=0
s=this.b
q=s.w
p=Math.max(0,a.d-a.V().a-q.f)
s=s.b
o=s.i(0,"drawCost")
o.toString
o=B.b.k(o)
s=s.i(0,"soldierLimit")
s.toString
return Math.max(1,Math.min(q.fy,B.b.aP(p,Math.max(1,r+o+n.y+B.b.k(s)))))},
ag(a,b){var s,r,q,p,o
t.ef.a(a)
t.W.a(b)
s=t.N
s=A.U(s,s)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.v)(a),++q){p=a[q]
s.v(0,"h:"+p.a,p.fy)}for(r=b.length,q=0;q<b.length;b.length===r||(0,A.v)(b),++q){o=b[q]
s.v(0,"c:"+o.a,o.at)}return s},
ap(b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=this,a9=null
t.L.a(b8)
s=c3==="intercept"
if(s){r=b1.as
r=r===B.f||r===B.e}else r=!1
if(r)return a9
if(!b2.d||!isFinite(b2.b)||J.jm(b2.a)||b1.fx||b0.as.p(0,b1.a))return a9
r=b2.b
q=a8.b
p=q.w
o=p.d
n=r+o
if(n>=b5)return a9
m=c3==="expedition"
if(m)l=!a8.ah(c4)
else l=!1
if(l)return a9
l=b1.a
k=b0.y.i(0,l)
j=k==null
if(!j){if(k.z>a8.a.Q.b&&!b6)return a9
i=!1
if(k.b===c3){h=k.d
if(h===c4.a){if(m){h=k.e
h=h===c4.b}else h=!0
if(h){h=k.r
if(h==(b7==null?a9:b7.a)){i=k.w
h=J.cy(i)
i=h.gaz(i)&&h.gaA(i).G(J.l6(b2.a))<32&&b1.as!==B.n}}}}if(i)return a9}g=b0.P()
f=A.d([],t.w)
if(!b3){i=q.b
h=i.i(0,"battleBudget")
h.toString
e=b4?1:c4.gZ()
e=Math.min(e,a8.a.Q.u(c4.a).length)
e=Math.max(1,e)
i=i.i(0,"budgetSafety")
i.toString
n+=h*(c0+1)*e+r+i}if(n>p.p1)return a9
r=c4.a
i=b7==null
h=i?a9:b7.a
e=a8.a
d=e.Q
c=d.b
o=B.b.aw(isFinite(b5)?b5*60:(Math.max(n,60)+p.cx+o)*60)
b=B.b.aI(p.CW*60)
a=b2.a
a0=b3&&c1
if(m)m=c4.b
else m=a9
a1=new A.a5(l,c3,c2,r,m,b4,h,a,0,c+o,c+b,0,b3,a0,b1.go+1)
o=!1
if(b3){m=g.L(r)
o=(j?a9:k.as)===!0&&k.y>=c&&k.d===r?1:0
p=c1?Math.max(g.O(c4),c4.y+p.cy):g.O(c4)
p=m-o>=p}else p=o
if(p)return a9
p=b1.as
if(p===B.f||p===B.e){p=g.f
q=q.b.i(0,"soldierLimit")
q.toString
a2=Math.max(0,Math.min(p,b9+B.b.k(q)-b1.gN())-g.e)
if(a2>0){if(e.x===B.o)return a9
if(!g.aE(a2))return a9
B.a.m(f,new A.A(B.m,a9,b1.c,a9,a2,B.d))}q=t.S
a3=A.U(q,q)
for(q=b8.length,p=g.w,e=e.x===B.o,a4=0;a4<b8.length;b8.length===q||(0,A.v)(b8),++a4){a5=b8[a4]
a3.aK(a5,new A.hz(),new A.hA())
o=p.i(0,a5)
if(o==null)o=0
m=a3.i(0,a5)
m.toString
if(o<m){if(e)return a9
if(!g.c_(a5))return a9
B.a.m(f,new A.A(B.v,a9,a9,a9,a5,B.d))}}if(!g.dd(b1,b8,a1))return a9
if(g.e<b9)return a9
if(s||a.length>1)s=a9
else s=r
B.a.m(f,new A.A(B.E,l,s,J.jQ(a),0,b8))}else{if(!g.dw(b1,a1))return a9
if(s||a.length>1)s=a9
else s=r
B.a.m(f,new A.A(B.P,l,s,J.jQ(a),0,B.d))}a6=g.ae(b6).a
a7=B.a.D(f,new A.hB())
if(a7&&g.d<a6)return a9
s=A.d([b1],t.e)
if(!i)s.push(b7)
r=d.F(b1.c)
r.toString
r=A.d([r],t.Y)
r.push(c4)
s=a8.ag(s,r)
r=A.d([a1],t.m)
return new A.d5(g,new A.P(c2,f,s,r,a7?a6:g.d,b6))},
cm(a,b,c,d,e,f,g,h,i,j){return this.ap(a,b,c,d,!1,e,f,null,B.d,0,0,g,h,i,j)},
cn(a,b,c,d,e,f,g,h){return this.ap(a,b,c,d,!1,1/0,!1,null,B.d,0,0,e,f,g,h)},
bt(a,b,c,d,e,f,g,h,i,j){return this.ap(a,b,c,!1,d,1/0,!1,null,e,f,g,!1,h,i,j)},
cp(a,b,c,d,e,f,g,h,i){return this.ap(a,b,c,!1,d,1/0,e,null,B.d,0,f,!1,g,h,i)},
b1(a,b,c,d,e,f,g,h,i){return this.ap(a,b,c,d,!1,e,f,null,B.d,0,0,!1,g,h,i)},
cq(a,b,c,d,e,f,g,h,i){return this.ap(a,b,c,!1,!1,d,e,f,B.d,0,0,!1,g,h,i)},
co(a,b,c,d,e,f,g,h){return this.ap(a,b,c,!1,!1,d,e,null,B.d,0,0,!1,f,g,h)},
c7(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a5.id!=null)return B.t
s=this.a.Q
r=s.F(a4.c)
r.toString
q=a4.as
p=q===B.f||q===B.e?r.f.c3(r.e,a5.z):a4.z
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
g=h.bX(p)
if(!(g<m.length))return A.m(m,g)
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
a0=A.o(new A.c(A.d([(m-a)/j,(m+a)/j],t.n),t.db.a(new A.hu()),g),g.h("a.E"))
if(a0.length!==0)b=B.a.aj(a0,B.B)}for(m=s.f,a1=B.t,a2=0;a2<3;++a2){a3=new A.t(q+l*b,r+k*b)
if(!h.p(0,a3)||B.a.D(m,new A.hv(a3)))return B.t
a1=i.dE(a4,a3,s)
if(!a1.d)return a1
j=a1.b
if(Math.abs(b-j)<0.1)break
b=(b+j)/2}return a1}}
A.ht.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.c.ac(r,this.b.f.X(r))<=s.b.w.at},
$S:1}
A.hr.prototype={
$1(a){var s,r,q,p,o=this
t.o.a(a)
s=o.b.w.i(0,a.a)
if((s==null?0:s)<=0)s=a.f&&o.a.a.Q.c>=a.e
else s=!0
if(s){s=o.c
r=a.d
if(s==null)s=r===0
else{s=s.f
q=o.a.b.b
p=q.i(0,"soldierLimit")
p.toString
p=B.b.k(p)
q=q.i(0,"soldierHp")
q.toString
q=r<s+p*B.b.k(q)
s=q}}else s=!1
return s},
$S:20}
A.hs.prototype={
$2(a,b){var s,r,q,p,o=t.o
o.a(a)
o.a(b)
s=B.c.t(b.c-b.d,a.c-a.d)
if(s!==0)return s
o=this.a.w
r=o.i(0,a.a)
q=(r==null?0:r)>0?0:a.b
o=o.i(0,b.a)
p=(o==null?0:o)>0?0:b.b
return q!==p?B.c.t(q,p):B.c.t(a.b,b.b)},
$S:26}
A.hw.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a.Q.a&&!a.fx},
$S:0}
A.hx.prototype={
$2(a,b){return Math.max(A.f(a),t.r.a(b).w)},
$S:9}
A.hy.prototype={
$1(a){var s,r,q,p,o,n=this
t.r.a(a)
s=n.a
r=!1
if(a.b===s.a.Q.a)if(!a.fx)if(a.f>=a.r*0.65)if(a.w>=n.b*0.8){q=!1
if(a.cy){p=n.c
if(p!=null){o=a.z
s=Math.abs(s.c.ac(o,n.d.f.X(o))-p)<=s.b.w.ok}else s=!0
if(s){s=n.e
s=s.aq(a)&&!s.as.p(0,a.a)}else s=q}else s=q
if(!s){s=n.e.y
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
A.hz.prototype={
$1(a){return A.f(a)+1},
$S:7}
A.hA.prototype={
$0(){return 1},
$S:5}
A.hB.prototype={
$1(a){return t.T.a(a).a===B.v},
$S:18}
A.hu.prototype={
$1(a){return A.am(a)>=0},
$S:14}
A.hv.prototype={
$1(a){return t.q.a(a).f.p(0,this.a)},
$S:1}
A.aD.prototype={
aR(){return"AiDecisionStage."+this.b}}
A.aj.prototype={
aR(){return"AiActionKind."+this.b}}
A.A.prototype={
I(){var s=this,r=s.d
r=r==null?null:A.d([r.a,r.b],t.n)
return A.Q(["kind",s.a.a,"hero",s.b,"city",s.c,"point",r,"amount",s.e,"weapons",s.f],t.N,t.X)}}
A.a5.prototype={
I(){var s,r,q,p,o,n=this,m=A.d([],t.A)
for(s=n.w,r=s.length,q=t.n,p=0;p<s.length;s.length===r||(0,A.v)(s),++p){o=s[p]
m.push(A.d([o.a,o.b],q))}return A.Q(["hero",n.a,"role",n.b,"deadline",n.y,"commit",n.z,"city",n.d,"enemy",n.r,"points",m,"leg",n.x,"gold",n.Q,"slot",n.as,"rearStaging",n.at,"reason",n.c,"order",n.ax,"targetCountry",n.e,"attrition",n.f],t.N,t.X)}}
A.P.prototype={
I(){var s,r,q,p=this,o=t.d,n=A.d([],o)
for(s=p.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)n.push(s[q].I())
o=A.d([],o)
for(s=p.d,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)o.push(s[q].I())
return A.Q(["reason",p.a,"actions",n,"deps",p.c,"tasks",o,"floor",p.e,"emergency",p.f],t.N,t.X)}}
A.bq.prototype={
I(){var s,r,q,p=this,o=A.d([],t.d)
for(s=p.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)o.push(s[q].I())
return A.Q(["phase",p.a,"target",p.b,"gold",p.c,"heroes",p.d,"groups",o,"notes",p.f,"limited",p.r,"assessments",p.w,"routeSteps",p.x,"expansions",p.y],t.N,t.X)}}
A.ej.prototype={
I(){var s,r,q,p=this,o=p.Q.I(),n=A.d([],t.d)
for(s=p.as,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)n.push(s[q].I())
return A.Q(["protocol",1,"session",p.a,"id",p.d,"rules",p.b,"map",p.c,"observation",o,"deadline",p.e,"tasks",n,"seed",p.f,"priority",p.r,"idle",p.w,"stage",p.x.b,"offensiveCountry",p.y,"offensiveCity",p.z],t.N,t.X)}}
A.ei.prototype={
I(){var s=this
return A.Q(["protocol",1,"session",s.a,"id",s.d,"country",s.e,"rules",s.b,"map",s.c,"tick",s.f,"deadline",s.r,"plan",s.x.I(),"micros",s.w,"error",s.y],t.N,t.X)}}
A.j2.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.j3.prototype={
$0(){var s=this,r=s.a,q=r.c,p=!1
if(s.b.length!==0)if(q!=null)if(!q.r){p=s.c
p=p.f>=p.r*0.5&&q.c>0&&q.b>=s.d.w.ch}if(p)return new A.aL([!0,q.b,1,q.c])
return new A.aL([!1,r.b,0,r.a])},
$S:54}
A.jg.prototype={
$1(a){t.cJ.a(a)
return this.a.G(a.a)>this.b+a.b},
$S:55}
A.jh.prototype={
$1(a){t.fg.a(a)
return!a.b&&this.a.G(a.a)>this.b},
$S:56}
A.hF.prototype={
ds(i4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1=this,i2=null,i3={}
i3.a=i4
s=i1.a
r=s.Q
q=i1.e
p=new A.Y(q,A.l(q).h("Y<2>")).D(0,new A.hI())
o=t.Z
n=A.d([],o)
m=A.d([],t.dZ)
i3.b=i3.c=!1
l=i1.b
k=s.y
s=s.z
j=A.c6(r,i4,l,s,k)
i=r.r
h=A.i(i)
g=h.h("e(1)")
h=h.h("c<1>")
f=A.o(new A.c(i,g.a(new A.hJ(r)),h),h.h("a.E"))
B.a.B(f,new A.hK())
e=r.f
d=A.i(e)
c=d.h("e(1)")
d=d.h("c<1>")
b=d.h("a.E")
a=A.o(new A.c(e,c.a(new A.hV(i1,r,j)),d),b)
if(f.length!==0)B.a.B(a,new A.i5(i1,f,r))
a0=A.aB(a,t.q)
a1=i4.ce(a)
a2=a0==null
a3=a2?i2:A.aQ(a0.b,r,l,i2)
a4=!p
if(a4)a5=(a3==null?i2:a3.ga3())===!0
else a5=!1
a6=new A.hH(i1,a5?Math.min(B.b.aw(a3.c*a3.gaV()),Math.max(0,i4.d-i4.V().a)):0)
a7=new A.hG(i3,i1,n)
a8=r.gM()
a9=A.o(a8,a8.$ti.h("a.E"))
B.a.B(a9,new A.i8(i3,i1))
a5=t.S
b0=Math.min(i3.a.f,B.a.E(a9,0,new A.i9(i3,i1),a5))
if(a9.length!==0&&b0>i3.a.e){b1=i3.a.P()
b2=Math.min(b0-b1.e,b1.gbT())
if(b2>0&&b1.aE(b2))a7.$4(b1,A.d([new A.A(B.m,i2,B.a.gH(a9).a,i2,b2,B.d)],t.w),"\u4f18\u5148\u7528\u73b0\u6709\u4f59\u989d\u8865\u5145\u5b88\u5c06\u548c\u5f85\u51fa\u5f81\u5c06\u9886\u7684\u5175\u5458\uff0c\u4e70\u5f97\u8d77\u591a\u5c11\u8865\u591a\u5c11\uff0c\u4e0d\u900f\u652f",B.a.gH(a9))}for(a8=a9.length,b3=l.w,b4=b3.fx,b5=b4-2,b6=t.w,b7=0;b8=a9.length,b7<b8;a9.length===a8||(0,A.v)(a9),++b7){b9=a9[b7]
if(n.length>=b5)break
b8=b9.a
c0=q.i(0,b8)
if(c0==null)c0=i2
else c0=c0.d.length!==0||c0.a.ax!=null
if(c0!==!0||b9.ax!=null)continue
c1=i3.a.u(b8)
c0=c1.length
c2=i3.a
c3=b9.ax
if(c3==null){c2=c2.x.i(0,b8)
if(c2==null)c2=b9.d}else{c2=b9.db?1:0
c2=B.c.A(c3-b9.ay-c2,0,5)}c3=!1
if(c0<=c2){c0=q.i(0,b8)
if(c0==null)c0=i2
else{c0=c0.f
c0=c0==null?i2:c0.a}if(c0!==B.r){c0=q.i(0,b8)
c0=(c0==null?i2:c0.ga1())!==!0}else c0=c3}else c0=c3
if(c0)continue
c0=A.i(c1)
c2=c0.h("c<1>")
c4=A.o(new A.c(c1,c0.h("e(1)").a(new A.ia()),c2),c2.h("a.E"))
B.a.B(c4,new A.ib())
if(c4.length===0)continue
c5=B.a.gH(c4)
b1=i3.a.P()
if(b1.aL(b9,c5)&&b1.d>=b1.ae(!0).a)a7.$6$emergency$hero(b1,A.d([new A.A(B.l,c5.a,b8,i2,0,B.d)],b6),"\u9632\u5fa1\u7b56\u7565\u53d1\u73b0\u6765\u654c\uff0c\u4f18\u5148\u63d0\u9ad8\u5fc5\u8981\u57ce\u9632\uff0c\u5347\u7ea7\u540e\u4ecd\u4fdd\u7559\u4f59\u989d",b9,!0,c5)}c6=new A.ie(i3,i1,b0,a0,a6,r,a7)
for(b7=0;a8=a9.length,b7<a8;a9.length===b8||(0,A.v)(a9),++b7){b9=a9[b7]
if(n.length>=b5)break
a8=b9.a
c1=i3.a.u(a8)
c0=q.i(0,a8)
if(c0==null)c0=i2
else c0=c0.d.length!==0||c0.a.ax!=null
c2=i3.a.L(a8)
c3=i3.a.a7(b9)
c7=!1
if(c0===!0){c0=i3.a.L(a8)
c8=b9.ax
if(c8==null)c8=b9.d
else{c9=b9.db?1:0
c9=B.c.A(c8-b9.ay-c9,0,5)
c8=c9}if(c0<c8){if(c1.length!==0){a8=q.i(0,a8)
if(a8==null)a8=i2
else{a8=a8.f
a8=a8==null?i2:a8.a}a8=a8!==B.h}else a8=!0
c7=a8}}if(c2<c3||c7)c6.$2$defense(b9,!0)}for(b8=i1.c,c0=l.r,c2=l.b,c3=i1.d,c8=t.b,c9=a3==null,b7=0;b7<a9.length;a9.length===a8||(0,A.v)(a9),++b7){b9=a9[b7]
if(n.length>=b5)break
d0=b8.de(i3.a)
d1=new A.c(i,g.a(new A.ic(i3,r,Math.max(12,new A.c(i,g.a(new A.id(r)),h).E(0,0,new A.hL(),a5)*0.8))),h).gl(0)
d2=d0>=2&&d1+i3.a.at.a<d0&&B.a.D(e,new A.hM(r))
if(d2){d3=b9.a
d4=q.i(0,d3)
if(d4==null)d4=i2
else d4=d4.d.length!==0||d4.a.ax!=null
d3=d4!==!0&&i3.a.u(d3).length>=b9.y}else d3=!1
if(d3){d3=i3.a.u(b9.a)
d4=A.i(d3)
d5=d4.h("c<1>")
d6=A.o(new A.c(d3,d4.h("e(1)").a(new A.hN(i3,i1)),d5),d5.h("a.E"))
B.a.B(d6,new A.hO())
if(d6.length!==0){b1=i3.a.P()
d7=B.a.gH(d6)
if(b1.c4(d7))a7.$5$hero(b1,A.d([new A.A(B.D,d7.a,i2,i2,0,B.d)],b6),"\u5b89\u5168\u540e\u65b9\u6e05\u7406\u4f4e\u4ef7\u503c\u5197\u4f59\u7f16\u5236\uff0c\u4fdd\u7559\u5b9e\u9645\u5b88\u5c06\u548c\u5185\u653f\u5c06\u9886\uff0c\u4e3a\u5f3a\u653b\u4e3b\u529b\u8865\u5458",b9,d7)}}d3=b9.a
c1=i3.a.u(d3)
d4=A.i(c1)
d5=d4.h("c<1>")
c4=A.o(new A.c(c1,d4.h("e(1)").a(new A.hP()),d5),d5.h("a.E"))
B.a.B(c4,new A.hQ())
if(c1.length!==0&&c0.gaz(c0)){d8=B.a.aj(c1,new A.hR())
d4=c0.gb_()
d5=A.l(d4)
d9=d5.h("c<a.E>")
e0=A.o(new A.c(d4,d5.h("e(a.E)").a(new A.hS(r)),d9),d9.h("a.E"))
B.a.B(e0,new A.hT())
e1=A.o(new A.c(e,c.a(new A.hU(i3,i1,r,d8)),d),b)
B.a.B(e1,new A.hW(i1,d8,r))
e2=e1.length===0?0:2
d4=A.i(e1)
d5=d4.h("y<1>")
d9=new A.y(e1,0,3,d5)
d9.U(e1,0,3,d4.c)
d9=new A.r(d9,d9.gl(0),d5.h("r<k.E>"))
d5=d5.h("k.E")
while(d9.j()){d4=d9.d
if(d4==null)d4=d5.a(d4)
if(e0.length===0)e3=A.d([],c8)
else{e3=c2.i(0,"carryLimit")
e3.toString
e3=A.ha(B.b.k(e3),B.a.gH(e0).a,!1,a5)}e3=A.j1(d8,d4,r,l,c3,e3,0).a[2]
if(e3>0){if(c9)d5=i2
else d5=a3.a!==a3.d.a&&a3.b>=a3.e.w.w
if(d5===!0){d5=d4.b
d5=d5===(a2?i2:a0.b)}else d5=!1
if(d5){e2=b8.aY(e3,d4,i3.a,d8)
break}e2=b8.aY(e3,d4,i3.a,d8)
break}}e4=e2}else e4=1
if(p){d4=q.i(0,d3)
d4=(d4==null?i2:d4.ga1())===!0}else d4=!0
e5=!1
if(d4){if(!a1.p(0,d3)){d4=q.i(0,d3)
if(d4==null)d4=i2
else d4=d4.d.length!==0||d4.a.ax!=null
d4=d4===!0}else d4=!0
if(d4){if(B.a.D(e,new A.hX(r)))if(!d2)if(c1.length!==0)d4=e4>0&&i3.a.bW(d3)<i3.a.a7(b9)+e4
else d4=!0
else d4=!0
else d4=e5
e5=d4}}if(c4.length!==0)if(b9.ax==null){d4=c1.length
d5=i3.a.x.i(0,d3)
d9=!0
if(d5==null)d5=b9.d
if(d4<=d5)if(!B.a.D(c1,new A.hY())){if(e5){d4=c1.length
d5=i3.a.x.i(0,d3)
if(d5==null)d5=b9.d
d5=d4>=d5
d4=d5}else d4=!1
if(!d4){d4=q.i(0,d3)
if(d4==null)d4=i2
else{d4=d4.f
d4=d4==null?i2:d4.a}d4=d4===B.r}else d4=d9}else d4=d9
else d4=d9}else d4=!1
else d4=!1
if(d4){d4=q.i(0,d3)
if(d4==null)d4=i2
else d4=d4.d.length!==0||d4.a.ax!=null
if(d4!==!0)B.a.m(m,new A.bi(b9,B.a.gH(c4)))}if(e5&&!i3.b){d3=q.i(0,d3)
if(d3==null)d3=i2
else d3=d3.d.length!==0||d3.a.ax!=null
c6.$2$defense(b9,d3===!0)}}e6=A.d([],t.e)
for(i=a9.length,b7=0;b7<a9.length;a9.length===i||(0,A.v)(a9),++b7){b9=a9[b7]
h=b9.a
g=q.i(0,h)
if(g==null)g=i2
else g=g.d.length!==0||g.a.ax!=null
if(g===!0)continue
c1=i3.a.u(h)
h=A.i(c1)
g=h.h("c<1>")
e7=A.o(new A.c(c1,h.h("e(1)").a(new A.hZ(i3)),g),g.h("a.E"))
B.a.B(e7,new A.i_())
h=A.f(Math.max(0,c1.length-i3.a.a7(b9)))
g=A.i(e7)
a8=new A.y(e7,0,h,g.h("y<1>"))
a8.U(e7,0,h,g.c)
B.a.J(e6,a8)}B.a.B(e6,new A.i0())
e8=i2
e9=i2
f0=0
f1=1
if(e6.length!==0&&!i3.c&&a4){d7=B.a.gH(e6)
f2=A.c6(r,i3.a,l,s,k)
e1=A.o(new A.c(e,c.a(new A.i1(i3,i1,r)),d),b)
B.a.B(e1,new A.i2(i1,d7,r))
s=A.Z(e1,0,A.X(b3.go,"count",a5),A.i(e1).c)
q=s.$ti
s=new A.r(s,s.gl(0),q.h("r<k.E>"))
k=b8.c
i=b3.ok
h=f2.f
b3=b3.k4
g=t.aO
e=t.eO
d=e.h("a.E")
q=q.h("k.E")
f3=f0
f4=e8
f5=!1
for(;;){if(!s.j()){f0=f3
e8=f4
break}A:{c=s.d
if(c==null)c=q.a(c)
f6=A.o(new A.c(e6,g.a(new A.i3(i1,c)),e),d)
if(f6.length===0)break A
d7=B.a.gH(f6)
for(b=b8.bp(d7,i3.a,c,c3),a4=b.length,a8=c.e,f7=c.a,b7=0;b7<b.length;b.length===a4||(0,A.v)(b),++b7){e0=b[b7]
f8={}
f9=A.j1(d7,c,r,l,c3,e0,0)
b5=h.i(0,f7)
g0=b5==null?i2:b5.length
if(g0==null)g0=0
b5=f9.a
g1=b8.aY(b5[2],c,i3.a,d7)
g2=g1-g0
g3=f2.gY()!=null&&f2.gY()!==f7
c0=!0
if(b5[2]!==0)if(g2>0)if(g2<=f6.length)if(g3)c0=g1!==1||b5[1]<b3
else c0=!1
if(c0)continue
g4=i3.a.P()
g4.d=1e6
f8.a=g4
g5=A.d([],b6)
g7=1/0
g8=0
g9=0
for(;;){g6=!1
if(!(g9<g2)){g6=!0
break}if(!(g9<f6.length))return A.m(f6,g9)
h0=f6[g9]
if(A.j1(h0,c,r,l,c3,e0,0).a[2]===0)break
h1=k.aJ(h0,a8,r,c)
c0=h1.b
g7=Math.min(g7,c0)
g8=Math.max(g8,c0)
if(!h1.d||g8-g7>i)break
h2=B.a.E(a9,0,new A.i4(f8,i1,h0),a5)
c0=f8.a
c8=c0.f
d3=c2.i(0,"soldierLimit")
d3.toString
d3=Math.min(h2,Math.max(0,c8-B.b.k(d3)))
h3=b8.bt(c0,h0,h1,b5[0],e0,d3,g0+g9,"\u6309\u5171\u540c\u653b\u9632\u95e8\u69db\u6838\u7b97\u6574\u961f\u6b66\u5668\u4e0e\u5175\u5458","expedition",c)
if(h3==null)break
f8.a=h3.a
c0=h3.b.b
c8=A.i(c0)
B.a.J(g5,new A.c(c0,c8.h("e(1)").a(new A.i6()),c8.h("c<1>")));++g9}if(!g6)continue
b5=f8.a
h4=1e6-b5.d+b5.V().a
b5=i3.a
if(b5.d<h4){if(f3===0||h4<f3){f1=g1
f3=h4
f4=f7}continue}b1=b5.P()
b5=g5.length
h5=0
for(;;){if(!(h5<g5.length)){g6=!0
break}if(!b1.c_(g5[h5].e)){g6=!1
break}g5.length===b5||(0,A.v)(g5);++h5}if(!g6||!a6.$1(b1))continue
if(g5.length!==0){c=r.F(d7.c)
c.toString
a7.$4(b1,g5,"\u6309\u76ee\u6807\u57ce\u9632\u4e0e\u5b88\u5c06\u914d\u9f50"+g1+"\u540d\u8fdb\u653b\u5c06\u9886\u7684\u9ad8\u7ea7\u6b66\u5668\uff0c\u4fdd\u7559\u6708\u4ff8\u9884\u7b97",c)}f3=f0
e9=f7
f4=e8
f5=!0
break}if(f5){f0=f3
e8=f4
break}}}}s=e8==null
if(s&&!i3.c)for(q=m.length,b7=0;b7<m.length;m.length===q||(0,A.v)(m),++b7){k=m[b7]
b9=k.a
c5=k.b
if(B.a.E(n,0,new A.i7(),a5)>=b4)break
b1=i3.a.P()
if(b1.aL(b9,c5)&&a6.$2$civilian(b1,!0))a7.$5$hero(b1,A.d([new A.A(B.l,c5.a,b9.a,i2,0,B.d)],b6),"\u5b8c\u6210\u519b\u9700\u5b89\u6392\u540e\u7528\u4f59\u94b1\u5347\u7ea7\u57ce\u9632\uff0c\u4ecd\u4fdd\u7559\u6708\u4ff8\u4e0e\u5468\u8f6c\u4f59\u989d",b9,c5)}q=e9==null
h6=r.F(q?e8:e9)
if(h6==null)h6=a0
h7=h6==null?i2:A.aQ(h6.b,r,l,i3.a.x)
h8=A.d([],o)
for(o=n.length,h9=0,b7=0;b7<n.length;n.length===o||(0,A.v)(n),++b7){i0=n[b7]
h9+=i0.b.length
if(h9>b4){c3.b.e=!0
break}B.a.m(h8,i0)}if(p)s="defending"
else s=s?"preparing":"saving"
q=q?e8:e9
if(q==null)if((c9?i2:a3.ga3())===!0)q=a2?i2:a0.a
else q=i2
c3=c3.b
o=c3.e
l=c3.c
k=c3.d
c3=c3.b
i=A.d([],t.s)
if(p)i.push("\u4e3b\u89d2\u6240\u5728\u57ce\u5b58\u5728\u660e\u786e\u98ce\u9669\uff0c\u519b\u8d39\u4f18\u5148\u7528\u4e8e\u5b88\u519b\u4e0e\u57ce\u9632\uff0c\u6682\u505c\u8fdb\u653b\u6b66\u5668\u91c7\u8d2d")
if(n.length===0)i.push("\u672c\u8f6e\u65e0\u5fc5\u8981\u4e14\u53ef\u652f\u4ed8\u7684\u91c7\u8d2d\uff0c\u4fdd\u7559\u56fd\u5e93")
if((h7==null?i2:h7.ga3())===!0)i.push("\u76ee\u6807\u56fd\u5360\u6709 "+h7.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.aw(h7.c*h7.gaV())+" \u91d1\u5e01\uff0c\u51c6\u5907\u5f3a\u5316\u6b66\u5668\u548c\u8f6e\u653b\u5175\u529b")
return new A.bq(s,q,f0,f1,h8,i,o,l,k,c3)}}
A.hI.prototype={
$1(a){return t.a.a(a).ga1()},
$S:16}
A.hJ.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&a.f>0&&!a.fx},
$S:0}
A.hK.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.hV.prototype={
$1(a){t.q.a(a)
return a.b!==this.b.a&&this.c.av(a)&&this.a.c.ah(a)},
$S:1}
A.i5.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bl(o.a(b),B.a.gH(s),r,p,q,null),A.bl(a,B.a.gH(s),r,p,q,null))},
$S:4}
A.hH.prototype={
$2$civilian(a,b){var s=a.d,r=Math.max(a.V().a,this.a.b.w.f)
return s>=r+(b?this.b:0)},
$1(a){return this.$2$civilian(a,!1)},
$S:57}
A.hG.prototype={
$6$emergency$hero(a,b,c,d,e,f){var s,r
t.f3.a(b)
this.a.a=a
s=this.b
r=A.d([],t.e)
if(f!=null)r.push(f)
r=s.c.ag(r,A.d([d],t.Y))
s=e?a.ae(!0).a:Math.max(a.V().a,s.b.w.f)
B.a.m(this.c,new A.P(c,b,r,B.q,s,e))},
$4(a,b,c,d){return this.$6$emergency$hero(a,b,c,d,!1,null)},
$5$hero(a,b,c,d,e){return this.$6$emergency$hero(a,b,c,d,!1,e)},
$S:58}
A.i8.prototype={
$2(a,b){var s,r,q,p,o,n,m,l=null,k=t.q
k.a(a)
s=this.b.e
k=k.a(b).a
r=s.i(0,k)
r=(r==null?l:r.ga1())===!0?1:0
q=a.a
p=s.i(0,q)
o=B.c.t(r,(p==null?l:p.ga1())===!0?1:0)
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
A.i9.prototype={
$2(a,b){var s,r
A.f(a)
t.q.a(b)
s=this.a.a.u(b.a).length
r=this.b.b.b.i(0,"soldierLimit")
r.toString
return a+s*B.b.k(r)},
$S:8}
A.ia.prototype={
$1(a){return t.r.a(a).dy},
$S:0}
A.ib.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.ie.prototype={
$2$defense(a,b){var s,r,q,p,o,n,m=this,l=null,k=m.a,j=a.a
if(!k.a.at.p(0,j)){s=m.b.e.i(0,j)
if(s==null)s=l
else s=s.d.length!==0||s.a.ax!=null
s=s===!0&&k.a.L(j)>=a.gZ()}else s=!0
if(s)return!1
r=k.a.P()
s=r.f
q=r.at.a
p=m.b
o=p.b.b.i(0,"soldierLimit")
o.toString
n=Math.max(0,Math.min(s,m.c+(q+1)*B.b.k(o))-r.e)
s=n>0
if(s&&!r.aE(n))return!1
if(!b){q=p.e.i(0,j)
if(q==null)q=l
else q=q.d.length!==0||q.a.ax!=null
q=q===!0}else q=!0
p=m.d
if(!r.bq(a,q,p==null?l:p.b)||!m.e.$1(r)){if(a.Q&&m.f.x>k.a.at.a){k.c=!0
if(b)k.b=!0}return!1}k=A.d([],t.w)
if(s)k.push(new A.A(B.m,l,j,l,n,B.d))
k.push(new A.A(B.u,l,j,l,0,B.d))
j=b?"\u4f18\u5148\u8865\u5145\u672c\u56fd\u5b88\u57ce\u7f3a\u53e3\uff0c\u5e76\u5907\u9f50\u65b0\u5c06\u5175\u5458\u4e0e\u6708\u4ff8":"\u5b88\u57ce\u7f3a\u53e3\u5df2\u4f18\u5148\u5904\u7406\uff0c\u518d\u8865\u524d\u7ebf\u8fdb\u653b\u5c06\u9886\u53ca\u5176\u5175\u5458"
m.r.$4(r,k,j,a)
return!0},
$S:59}
A.id.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&!a.fx},
$S:0}
A.hL.prototype={
$2(a,b){return Math.max(A.f(a),t.r.a(b).w)},
$S:9}
A.ic.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.b===this.b.a)if(!a.fx){r=this.a
if(!r.a.z.p(0,a.a))if(a.f>=a.r*0.65)if(a.w>=this.c){s=a.as
s=!(s===B.f||s===B.e)||r.a.aq(a)}}return s},
$S:0}
A.hM.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.hN.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.dx){r=this.b.b
if(a.w<=r.w.p4){s=a.x
r=r.b.i(0,"drawCost")
r.toString
s=s<=B.b.k(r)&&s<15&&this.a.a.aq(a)}}return s},
$S:0}
A.hO.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.ai(a),A.ai(b))},
$S:2}
A.hP.prototype={
$1(a){return t.r.a(a).dy},
$S:0}
A.hQ.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.hR.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return A.ac(a,!0)>A.ac(b,!0)?a:b},
$S:27}
A.hS.prototype={
$1(a){t.o.a(a)
return a.f&&a.d===0&&this.a.c>=a.e},
$S:20}
A.hT.prototype={
$2(a,b){var s=t.o
s.a(a)
return B.c.t(s.a(b).c,a.c)},
$S:26}
A.hU.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.c6(s,this.a.a,r.b,q.z,q.y).av(a)&&r.c.ah(a)}else s=!1
return s},
$S:1}
A.hW.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bl(o.a(b),s,r,p,q,null),A.bl(a,s,r,p,q,null))},
$S:4}
A.hX.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.hY.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.hZ.prototype={
$1(a){t.r.a(a)
return a.cy&&this.a.a.aq(a)},
$S:0}
A.i_.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.i0.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.i1.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.c6(s,this.a.a,r.b,q.z,q.y).av(a)&&r.c.ah(a)}else s=!1
return s},
$S:1}
A.i2.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bl(o.a(b),s,r,p,q,null),A.bl(a,s,r,p,q,null))},
$S:4}
A.i3.prototype={
$1(a){t.r.a(a)
return this.a.c.ah(this.b)},
$S:0}
A.i4.prototype={
$2(a,b){var s,r,q
A.f(a)
t.q.a(b)
s=this.a
r=b.a
q=s.a.u(r).length
s=Math.min(Math.max(0,q-(r===this.c.c?1:0)),s.a.a7(b))
q=this.b.b.b.i(0,"soldierLimit")
q.toString
return a+s*B.b.k(q)},
$S:8}
A.i6.prototype={
$1(a){return t.T.a(a).a===B.v},
$S:18}
A.i7.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:12}
A.bo.prototype={}
A.ek.prototype={
ac(b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=b1.a,a7=b1.b,a8=A.w(b0.a)+","+A.w(b0.b)+":"+A.w(a6)+","+A.w(a7),a9=a5.d
if(a9.a_(a8)){a6=a9.i(0,a8)
a6.toString
return a6}for(s=a5.a,r=s.b,q=s.c,p=r+q+8,o=r-1,--q,n=a5.b,m=n.b,n=n.e,s=s.d,l=s.length,k=n.length,j=a5.c,i=b0,h=0,g=0;g<p;++g){f=i.G(b1)
if(f<1e-7){if(a9.a>=256){e=new A.a7(a9,A.l(a9).h("a7<1>")).gC(0)
if(!e.j())A.cz(A.aA())
a9.an(0,e.gn())}a9.v(0,a8,h)
return h}if(!j.dA())return 1/0
d=i.a
c=(a6-d)/f
b=i.b
a=(a7-b)/f
a0=B.c.A(B.b.W((d+c*1e-7)/16),0,o)
a1=B.c.A(B.b.W((b+a*1e-7)/16),0,q)
a2=new A.el()
a3=a2.$3(d,c,a0)
a2=a2.$3(b,a,a1)
a4=Math.min(f,Math.min(A.j4(a3),A.j4(a2)))
a2=m.i(0,"marchSpeed")
a2.toString
a3=a1*r+a0
if(!(a3>=0&&a3<l))return A.m(s,a3)
a3=s[a3]
if(!(a3<k))return A.m(n,a3)
h+=a4/(a2*n[a3])
i=new A.t(d+c*a4,b+a*a4)}return 1/0},
ao(a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=b0.F(a8.c),a5=a8.as,a6=(a5===B.f||a5===B.e)&&a4!=null?a4.f.c3(a4.e,a9):a8.z,a7=b2==null?a9:b2.f.bU(a6,a9)
a5=this.a
if(!a5.p(0,a7))return B.t
s=new A.em(b0,a8,b2)
r=new A.eo(this,b0,a8)
q=t._
p=A.d([A.d([a7],q)],t.a5)
if(!s.$2(a6,a7))o=b1&&r.$2(a6,a7)
else o=!0
if(o){n=a6.G(a7)
o=a6.a
m=a7.a
l=(o+m)/2
k=a6.b
j=a7.b
i=(k+j)/2
if(n>0)for(h=[-96,96,-192,192],k=(j-k)/n,o=(m-o)/n,g=0;g<4;++g){f=h[g]
e=new A.t(l-k*f,i+o*f)
if(a5.p(0,e))B.a.m(p,A.d([e,a7],q))}}for(a5=p.length,d=null,g=0;g<p.length;p.length===a5||(0,A.v)(p),++g){c=p[g]
q=c.length
a=a6
a0=0
a1=!1
a2=0
for(;;){if(!(a2<c.length)){b=!0
break}a3=c[a2]
if(s.$2(a,a3)){b=!1
break}a1=a1||r.$2(a,a3)
a0+=this.ac(a,a3)
c.length===q||(0,A.v)(c);++a2
a=a3}q=!0
if(b)if(isFinite(a0))q=b1&&a1
if(q)continue
if(d==null||a0<d.b)d=new A.bo(c,a0,!0)}return d==null?B.U:d},
aJ(a,b,c,d){return this.ao(a,b,c,!1,d)},
dE(a,b,c){return this.ao(a,b,c,!1,null)}}
A.el.prototype={
$3(a,b,c){var s
if(Math.abs(b)<1e-12)s=1/0
else s=Math.max(1e-8,((b>0?c+1:c)*16-a)/b)
return s},
$S:60}
A.em.prototype={
$2(a,b){return B.a.D(this.a.f,new A.en(this.b,this.c,a,b))},
$S:31}
A.en.prototype={
$1(a){var s,r=this
t.q.a(a)
if(a.b!==r.a.b){s=r.b
s=s==null?null:s.a
s=a.a!==s&&a.f.c6(r.c,r.d)!=null}else s=!1
return s},
$S:1}
A.eo.prototype={
$2(a,b){return B.a.D(this.b.r,new A.ep(this.a,this.c,b,a))},
$S:31}
A.ep.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this
t.r.a(a)
if(a.b!==j.b.b){s=a.as
s=s===B.f||s===B.e||a.fx||a.f<=0}else s=!0
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
l=B.b.A(((k.a-q)*p+(k.b-o)*n)/m,0,1)}s=r.aH(s,l).G(a.z)
r=j.a.b.b.i(0,"encounterDistance")
r.toString
return s<r+12},
$S:0}
A.an.prototype={
I(){var s=this
return A.d([s.a,s.b,s.c,s.d,s.e,s.f,s.r],t.Q)}}
A.eq.prototype={
cb(a,b){var s,r=this.b
if(r.i(0,"useMorale")===0)return 0
if(b>0){r=r.i(0,"cityMoraleBonus"+B.c.A(b,1,5))
r=r==null?null:B.b.k(r)
if(r==null)r=0}else r=0
s=a+r
return s<0?0:s},
dq(a){return this.cb(a,0)},
bj(a,b,c,d){var s,r,q,p
if(c){s=this.f
if(!(d<s.length))return A.m(s,d)
s=s[d]}else s=1
s=B.c.A(B.b.W(a*s),0,63)
if(b>0){r=this.d
q=r.length
p=B.c.A(b-1,0,q-1)
if(!(p>=0&&p<q))return A.m(r,p)
p=r[p]
r=p}else r=0
return B.c.A(s+r,0,63)},
bY(a,b,c){return this.bj(a,b,c,0)},
d2(a,b){return this.bj(a,0,b,0)},
af(a){var s,r,q="maxLevel",p=this.b,o=p.i(0,"firstYearCityLevel")
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
I(){var s,r,q,p=this,o=A.d([],t.eG)
for(s=p.r.gb_(),s=s.gC(s),r=t.Q;s.j();){q=s.gn()
o.push(A.d([q.a,q.b,q.c,q.d,q.e,q.f,q.r],r))}return A.Q(["version",p.a,"values",p.b,"upgrades",p.c,"defenseBonuses",p.d,"movement",p.e,"field",p.f,"weapons",o,"tuning",p.w.I()],t.N,t.X)}}
A.e7.prototype={
bX(a){var s=this.d,r=this.b
r=B.c.A(B.b.W(a.b/16),0,this.c-1)*r+B.c.A(B.b.W(a.a/16),0,r-1)
if(!(r>=0&&r<s.length))return A.m(s,r)
return s[r]},
p(a,b){var s,r=b.a
if(isFinite(r)){s=b.b
r=isFinite(s)&&r>=0&&s>=0&&r<this.b*16&&s<this.c*16}else r=!1
return r},
I(){var s=this
return A.Q(["version",s.a,"width",s.b,"height",s.c,"terrain",s.d],t.N,t.X)}}
A.es.prototype={
dt(a){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=t.d1.a(B.i.da(a,null))
switch(J.aZ(s,"kind")){case"init":if(!J.ay(J.aZ(s,"protocol"),1)||!J.ay(J.aZ(s,"build"),"525a6037"))throw A.j(B.a6);++i.f
i.e=null
p=i.r
if(p.a>0){p.b=p.c=p.d=p.e=p.f=null
p.a=0
p.b5()}p=t.f
o=t.N
n=t.z
i.c=A.lf(A.aq(p.a(J.aZ(s,"rules")),o,n))
n=A.aq(p.a(J.aZ(s,"map")),o,n)
p=A.I(n.i(0,"version"))
m=A.f(n.i(0,"width"))
l=A.f(n.i(0,"height"))
n=A.bs(t.R.a(n.i(0,"terrain")),!0,t.S)
k=new Uint8Array(A.mr(n))
if(m<=0||l<=0||n.length!==m*l)A.cz(B.a8)
i.d=new A.e7(p,m,l,k)
i.a.$1(B.i.au(t.G.a(A.Q(["kind","ready","rules",i.c.a,"map",p,"backend",i.b],o,t.X)),null))
break
case"cancel":p=i.e
o=J.aZ(s,"id")
if(p==null?o==null:p===o)i.r.m(0,A.f(J.aZ(s,"id")))
break
case"plan":if(i.c==null||i.d==null||i.e!=null){p=A.k8("AI \u5c1a\u672a\u5c31\u7eea\u6216\u5df2\u6709\u8bf7\u6c42\u6267\u884c\u4e2d")
throw A.j(p)}r=A.ld(A.aq(t.f.a(J.aZ(s,"request")),t.N,t.z))
i.e=r.d
i.aT(r,i.f)
break
default:throw A.j(B.a7)}}catch(j){q=A.aP(j)
i.a.$1(B.i.au(t.G.a(A.Q(["kind","error","message",J.bn(q)],t.N,t.X)),null))}},
aT(a,b){return this.cU(a,b)},
cU(a3,a4){var s=0,r=A.mM(t.p),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
var $async$aT=A.n0(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:a1=new A.ih()
$.jO()
a1.bu()
m=a1
p=4
i=n.c
i.toString
h=n.d
h.toString
g=new A.er(i.w)
f=new A.eF(i,h,a3,g,A.U(t.S,t.a))
e=t.N
h=new A.ek(h,i,g,A.U(e,t.i))
f.e=h
f.f=new A.eB(i,g,A.U(e,t.cM))
f.r=new A.hq(a3,i,h)
l=f
k=0
i=l.bv(),h=i.$ti,i=new A.aM(i.a(),h.h("aM<1>")),h=h.c,g=n.r,d=a3.d,c=t.p
case 7:if(!i.j()){s=8
break}b=i.b
if(b==null)h.a(b)
if(a4!==n.f||g.p(0,d)){if(a4===n.f){n.e=null
g.an(0,d)
n.a.$1(B.i.au(t.G.a(A.Q(["kind","cancelled","id",d],e,t.X)),null))}s=1
break}b=k
if(typeof b!=="number"){q=b.dK()
s=1
break}a=b+1
k=a
s=a>=n.c.w.id?9:10
break
case 9:k=0
b=m
if(b.b==null)b.b=$.hE.$0()
s=11
return A.mj(A.lt(B.H,c),$async$aT)
case 11:m.bu()
case 10:s=7
break
case 8:if(a4!==n.f){s=1
break}if(g.an(0,d)){n.e=null
n.a.$1(B.i.au(t.G.a(A.Q(["kind","cancelled","id",d],e,t.X)),null))
s=1
break}n.e=null
i=l.w
i.toString
n.a.$1(B.i.au(t.G.a(A.Q(["kind","reply","reply",A.jT(a3,i,null,m.gc5()).I()],e,t.X)),null))
p=2
s=6
break
case 4:p=3
a2=o.pop()
j=A.aP(a2)
if(a4!==n.f){s=1
break}n.e=null
i=A.d(["\u89c4\u5212\u5931\u8d25\uff0c\u4e3b\u73af\u5883\u4fdd\u7559\u6709\u9650\u5b89\u5168\u4fdd\u62a4"],t.s)
h=m.gc5()
n.a.$1(B.i.au(t.G.a(A.Q(["kind","reply","reply",A.jT(a3,new A.bq("preparing",null,0,1,B.M,i,!1,0,0,0),J.bn(j),h).I()],t.N,t.X)),null))
s=6
break
case 3:s=2
break
case 6:case 1:return A.ml(q,r)
case 2:return A.mk(o.at(-1),r)}})
return A.mm($async$aT,r)}}
A.ji.prototype={
$1(a){t.r.a(a)
return a.w*3+a.f*0.35+a.gN()*8},
$S:23}
A.jj.prototype={
$1(a){var s
t.r.a(a)
if(a.c===this.a.a){s=a.as
s=!(s===B.f||s===B.e)}else s=!1
return s},
$S:0}
A.jk.prototype={
$2(a,b){var s
A.am(a)
t.r.a(b)
s=A.ai(b)
return a+s*(b.id==null?0.12:0.03)},
$S:28}
A.a4.prototype={}
A.ap.prototype={
ga1(){var s=this,r=!1
if(B.a.D(s.b,new A.ew()))if(s.a.ax!=null||B.a.D(s.d,new A.ex())){r=s.r
r=r==null||r.a!==B.h}return r},
ga6(){var s,r=this.a
if(r.ax!=null)r=r.dx
else{r=this.d
if(r.length===0)r=1/0
else{s=A.i(r)
s=new A.a0(r,s.h("h(1)").a(new A.ev()),s.h("a0<1,h>")).aj(0,B.B)
r=s}}return r}}
A.ew.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.ex.prototype={
$1(a){return t.O.a(a).c>=0.55},
$S:10}
A.ev.prototype={
$1(a){return t.O.a(a).b},
$S:63}
A.ij.prototype={
dz(c4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8=this,b9="marchSpeed",c0=b8.a,c1=c4.a,c2=c0.u(c1),c3=A.d([],t.ay)
for(s=c0.r,r=s.length,q=c4.e,p=c4.f,o=b8.b,n=o.b,o=o.w.b,m=q.a,l=q.b,k=c4.ch,j=c4.b,i=0;i<r;++i){h=s[i]
if(h.b!==j){g=h.as
g=g===B.f||g===B.e||h.f<=0}else g=!0
if(g)continue
if(h.a===k){B.a.m(c3,new A.a4(h,0,1))
continue}if(h.fx)continue
g=h.z
f=g.G(q)
e=h.p2===c1
d=!e
if(d){c=n.i(0,b9)
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
a4=new A.t(g.a+b/a0*a3,g.b+a/a0*a3)
if(p.X(a4).G(a4)>48)continue}d=n.i(0,b9)
d.toString
a5=A.nf(q,o,e,d,p,g,new A.ik(b8),c)
if(a5==null)continue
if(h.as===B.n||a1)g=0.35
else if(a2>0.8)g=1
else g=f<72?0.9:0.55
B.a.m(c3,new A.a4(h,a5,g))}B.a.B(c3,new A.il())
c1=A.i(c2)
r=t.r
a6=A.aB(new A.c(c2,c1.h("e(1)").a(new A.im(c4)),c1.h("c<1>")),r)
q=A.d([],t.e)
if(a6!=null)q.push(a6)
c1=c1.h("L<1>")
B.a.J(q,new A.L(c2,c1).bw(0,c1.h("e(k.E)").a(new A.io(a6))))
c1=t.S
a7=A.Z(q,0,A.X(c4.gZ(),"count",c1),r).ak(0)
a8=A.U(t.N,c1)
a9=B.a.am(c0.w,new A.ip(c4)).c
for(c0=a7.length,i=0;c1=a7.length,i<c1;a7.length===c0||(0,A.v)(a7),++i){b0=a7[i]
if(b0.as===B.e)b1=0
else{c1=n.i(0,"soldierLimit")
c1.toString
b1=Math.min(a9,B.b.k(c1)-b0.gN())}a9-=b1
a8.v(0,b0.a,b0.gN()+b1)}c0=c3.length
b2=null
b3=null
if(c0!==0&&c1!==0)for(c1=c4.db,r=c4.ax,q=c4.ay,p=r==null,o=b8.d,n=c4.d,b4=0;b4<a7.length;++b4,c0=l){b5=a7[b4]
for(m=b5.a,b6=null,i=0;l=c3.length,i<l;c3.length===c0||(0,A.v)(c3),++i){l=c3[i].a
if(p)k=n
else{k=c1?1:0
k=B.c.A(r-q-k,0,5)}b7=o.bk(b5,l,l.k4,Math.max(1,k-b4),!1,a8.i(0,m))
if(b6==null||b7.b<b6.b)b6=b7}if(b2==null||b6.b>b2.b)b2=b6
if(b5.e===2)b3=b6}c0=A.i(s)
return new A.ap(c4,c2,c3,b2,b3,new A.c(s,c0.h("e(1)").a(new A.iq(c4)),c0.h("c<1>")).E(0,0,new A.ir(),t.i))}}
A.ik.prototype={
$2(a,b){var s=this.a,r=s.c,q=r.ac(a,b)
if(!isFinite(q)&&r.c.e){r=a.G(b)
s=s.b.b.i(0,"marchSpeed")
s.toString
s=r/s}else s=q
return s},
$S:64}
A.il.prototype={
$2(a,b){var s,r=t.O
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.p.t(a.a.a,b.a.a):B.b.t(r,s)},
$S:65}
A.im.prototype={
$1(a){return t.r.a(a).a===this.a.CW},
$S:0}
A.io.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.ip.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.iq.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=!1
if(a.b===s.b)if(a.c===s.a){s=a.as
s=!(s===B.f||s===B.e)&&!a.fx}else s=r
else s=r
return s},
$S:0}
A.ir.prototype={
$2(a,b){return A.am(a)+A.ai(t.r.a(b))},
$S:28}
A.er.prototype={
a2(){var s=this,r=s.b
if(r>=s.a.db){s.e=!0
return!1}s.b=r+1
return!0},
d1(){var s=this,r=s.c
if(r>=s.a.dx){s.e=!0
return!1}s.c=r+1
return!0},
dA(){var s=this,r=s.d
if(r>=s.a.dy){s.e=!0
return!1}s.d=r+1
return!0}}
A.jd.prototype={
$1(a){A.I(a)
return A.iW(v.G.self).postMessage(a)},
$S:66}
A.je.prototype={
$1(a){return this.a.dt(A.I(A.iW(a).data))},
$S:67};(function aliases(){var s=J.aT.prototype
s.cs=s.q
s=A.a.prototype
s.bw=s.dH})();(function installTearOffs(){var s=hunkHelpers._static_0,r=hunkHelpers._static_1,q=hunkHelpers.installStaticTearOff
s(A,"mL","lF",5)
r(A,"n2","lS",13)
r(A,"n3","lT",13)
r(A,"n4","lU",13)
s(A,"kC","mW",3)
r(A,"n7","mp",22)
r(A,"n5","nv",0)
q(A,"nq",2,null,["$1$2","$2"],["kK",function(a,b){return A.kK(a,b,t.H)}],29,0)
q(A,"np",2,null,["$1$2","$2"],["kJ",function(a,b){return A.kJ(a,b,t.H)}],29,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.z,null)
q(A.z,[A.jq,J.cP,A.c9,J.b1,A.C,A.ig,A.a,A.r,A.c0,A.V,A.bS,A.ba,A.bP,A.cf,A.K,A.aC,A.bt,A.bK,A.cg,A.a6,A.is,A.he,A.bQ,A.cm,A.F,A.h8,A.b6,A.ag,A.c_,A.as,A.dh,A.iT,A.iR,A.dd,A.aM,A.ao,A.bc,A.W,A.de,A.dm,A.cs,A.bw,A.dk,A.bf,A.E,A.cr,A.cH,A.cJ,A.iM,A.cK,A.df,A.d3,A.ca,A.iy,A.aE,A.a9,A.aa,A.dn,A.ih,A.bx,A.eu,A.b0,A.ey,A.bJ,A.eB,A.cB,A.au,A.eF,A.ad,A.fr,A.t,A.eg,A.p,A.D,A.b_,A.e8,A.hf,A.d5,A.hq,A.A,A.a5,A.P,A.bq,A.ej,A.ei,A.hF,A.bo,A.ek,A.an,A.eq,A.e7,A.es,A.a4,A.ap,A.ij,A.er])
q(J.cP,[J.cR,J.bU,J.bW,J.bV,J.bX,J.br,J.b4])
q(J.bW,[J.aT,J.u,A.bu,A.c3])
q(J.aT,[J.d4,J.by,J.aS])
r(J.cQ,A.c9)
r(J.h3,J.u)
q(J.br,[J.bT,J.cS])
q(A.C,[A.bZ,A.aJ,A.cT,A.dc,A.d8,A.dg,A.bY,A.cD,A.az,A.cd,A.db,A.cb,A.cI])
q(A.a,[A.n,A.ar,A.c,A.bR,A.b9,A.ce,A.be,A.av])
q(A.n,[A.k,A.a7,A.Y,A.b5])
q(A.k,[A.y,A.a0,A.L,A.dj])
r(A.bN,A.ar)
r(A.bO,A.b9)
q(A.aC,[A.bz,A.bh])
r(A.bi,A.bz)
q(A.bh,[A.aL,A.bA])
r(A.bC,A.bt)
r(A.cc,A.bC)
r(A.bL,A.cc)
r(A.bM,A.bK)
q(A.a6,[A.cO,A.cF,A.cG,A.da,A.j9,A.jb,A.iv,A.iu,A.iX,A.iI,A.hb,A.dv,A.dT,A.dx,A.dQ,A.e6,A.e0,A.e1,A.e2,A.e3,A.dZ,A.dA,A.dB,A.dD,A.dH,A.dG,A.dI,A.dK,A.dM,A.dP,A.dO,A.dR,A.dy,A.dV,A.dX,A.ez,A.f2,A.f3,A.f4,A.fm,A.fn,A.fo,A.fp,A.fq,A.f6,A.f8,A.fc,A.fg,A.fh,A.fj,A.eQ,A.eG,A.eM,A.eO,A.eP,A.eV,A.eW,A.f_,A.f1,A.eT,A.eU,A.eS,A.eI,A.eL,A.eH,A.h_,A.h0,A.fZ,A.h1,A.fX,A.fW,A.fY,A.fV,A.fs,A.fu,A.fD,A.fE,A.fG,A.fI,A.fv,A.fK,A.fx,A.fz,A.fB,A.fS,A.fU,A.fL,A.fO,A.fQ,A.fR,A.fM,A.du,A.ee,A.ef,A.eb,A.ea,A.ed,A.e9,A.hg,A.hl,A.hn,A.ho,A.hm,A.hj,A.hk,A.hi,A.ht,A.hr,A.hw,A.hy,A.hz,A.hB,A.hu,A.hv,A.j2,A.jg,A.jh,A.hI,A.hJ,A.hV,A.hH,A.hG,A.ia,A.ie,A.id,A.ic,A.hM,A.hN,A.hP,A.hS,A.hU,A.hX,A.hY,A.hZ,A.i1,A.i3,A.i6,A.el,A.en,A.ep,A.ji,A.jj,A.ew,A.ex,A.ev,A.im,A.io,A.ip,A.iq,A.jd,A.je])
r(A.b3,A.cO)
q(A.cF,[A.hC,A.iw,A.ix,A.iS,A.h2,A.iz,A.iE,A.iD,A.iB,A.iA,A.iH,A.iG,A.iF,A.iQ,A.j_,A.dw,A.e5,A.dS,A.dz,A.fd,A.hh,A.hA,A.j3])
r(A.c5,A.aJ)
q(A.da,[A.d9,A.bp])
q(A.F,[A.aG,A.di])
q(A.cG,[A.h4,A.ja,A.iY,A.j0,A.iJ,A.h9,A.hd,A.iN,A.e4,A.e_,A.dC,A.dE,A.dF,A.dJ,A.dL,A.dN,A.dU,A.dW,A.dY,A.eA,A.eC,A.eD,A.j8,A.ff,A.fk,A.fl,A.f5,A.f7,A.f9,A.fa,A.fb,A.fe,A.fi,A.eR,A.eN,A.eX,A.eY,A.eZ,A.f0,A.eJ,A.eK,A.ft,A.fC,A.fF,A.fH,A.fJ,A.fw,A.fy,A.fA,A.fT,A.fP,A.fN,A.dt,A.ec,A.hp,A.hs,A.hx,A.hK,A.i5,A.i8,A.i9,A.ib,A.hL,A.hO,A.hQ,A.hR,A.hT,A.hW,A.i_,A.i0,A.i2,A.i4,A.i7,A.em,A.eo,A.jk,A.ik,A.il,A.ir])
q(A.c3,[A.cV,A.bv])
q(A.bv,[A.ch,A.cj])
r(A.ci,A.ch)
r(A.c1,A.ci)
r(A.ck,A.cj)
r(A.c2,A.ck)
q(A.c1,[A.cW,A.cX])
q(A.c2,[A.cY,A.cZ,A.d_,A.d0,A.d1,A.c4,A.d2])
r(A.bB,A.dg)
r(A.dl,A.cs)
r(A.cl,A.bw)
r(A.at,A.cl)
r(A.cU,A.bY)
r(A.h5,A.cH)
q(A.cJ,[A.h7,A.h6])
r(A.iL,A.iM)
q(A.az,[A.c7,A.cN])
q(A.df,[A.b2,A.ak,A.aD,A.aj])
s(A.ch,A.E)
s(A.ci,A.K)
s(A.cj,A.E)
s(A.ck,A.K)
s(A.bC,A.cr)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{b:"int",h:"double",a3:"num",H:"String",e:"bool",aa:"Null",q:"List",z:"Object",a8:"Map",M:"JSObject"},mangledNames:{},types:["e(p)","e(D)","b(p,p)","~()","b(D,D)","b()","e(b_)","b(b)","b(b,D)","b(b,p)","e(a4)","e(a5)","b(b,P)","~(~())","e(h)","h(a3,h)","e(ap)","e(b)","e(A)","p(a4)","e(an)","aa()","@(@)","h(p)","b(b,b)","~(z?,z?)","b(an,an)","p(p,p)","h(h,p)","0^(0^,0^)<a3>","e(P)","e(t,t)","aa(@)","@(H)","aa(z,aU)","b(ap,ap)","+(t,h)(D)","e()","h(h,D)","h(D)","e(ad)","~(@,@)","h(h,t)","q<a5>(P)","@(@,H)","a3(a3,b)","~(b,@)","p?(A)","h(h,H)","h(a3,p)","q<p>()","b(D)","aa(~())","aa(@,aU)","+breakthrough,lower,teamSize,upper(e,h,b,h)()","e(+(t,h))","e(+(t,e))","e(b0{civilian:e})","~(b0,q<A>,H,D{emergency:e,hero:p?})","e(D{defense!e})","h(h,h,b)","~(@)","+(t,e)(p)","h(a4)","h(t,t)","b(a4,a4)","~(H)","~(M)","h(h,a5)","b(au,au)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.bi&&a.b(c.a)&&b.b(c.b),"4;breakthrough,lower,teamSize,upper":a=>b=>b instanceof A.aL&&A.kM(a,b.a),"4;high,low,selfHigh,selfLow":a=>b=>b instanceof A.bA&&A.kM(a,b.a)}}
A.md(v.typeUniverse,JSON.parse('{"aS":"aT","d4":"aT","by":"aT","nA":"bu","cR":{"e":[],"B":[]},"bU":{"B":[]},"bW":{"M":[]},"aT":{"M":[]},"u":{"q":["1"],"n":["1"],"M":[],"a":["1"]},"cQ":{"c9":[]},"h3":{"u":["1"],"q":["1"],"n":["1"],"M":[],"a":["1"]},"b1":{"G":["1"]},"br":{"h":[],"a3":[]},"bT":{"h":[],"b":[],"a3":[],"B":[]},"cS":{"h":[],"a3":[],"B":[]},"b4":{"H":[],"B":[]},"bZ":{"C":[]},"n":{"a":["1"]},"k":{"n":["1"],"a":["1"]},"y":{"k":["1"],"n":["1"],"a":["1"],"a.E":"1","k.E":"1"},"r":{"G":["1"]},"ar":{"a":["2"],"a.E":"2"},"bN":{"ar":["1","2"],"n":["2"],"a":["2"],"a.E":"2"},"c0":{"G":["2"]},"a0":{"k":["2"],"n":["2"],"a":["2"],"a.E":"2","k.E":"2"},"c":{"a":["1"],"a.E":"1"},"V":{"G":["1"]},"bR":{"a":["2"],"a.E":"2"},"bS":{"G":["2"]},"b9":{"a":["1"],"a.E":"1"},"bO":{"b9":["1"],"n":["1"],"a":["1"],"a.E":"1"},"ba":{"G":["1"]},"bP":{"G":["1"]},"ce":{"a":["1"],"a.E":"1"},"cf":{"G":["1"]},"L":{"k":["1"],"n":["1"],"a":["1"],"a.E":"1","k.E":"1"},"bi":{"bz":[],"aC":[]},"aL":{"bh":[],"aC":[]},"bA":{"bh":[],"aC":[]},"bL":{"cc":["1","2"],"bC":["1","2"],"bt":["1","2"],"cr":["1","2"],"a8":["1","2"]},"bK":{"a8":["1","2"]},"bM":{"bK":["1","2"],"a8":["1","2"]},"be":{"a":["1"],"a.E":"1"},"cg":{"G":["1"]},"cO":{"a6":[],"aF":[]},"b3":{"a6":[],"aF":[]},"c5":{"aJ":[],"C":[]},"cT":{"C":[]},"dc":{"C":[]},"cm":{"aU":[]},"a6":{"aF":[]},"cF":{"a6":[],"aF":[]},"cG":{"a6":[],"aF":[]},"da":{"a6":[],"aF":[]},"d9":{"a6":[],"aF":[]},"bp":{"a6":[],"aF":[]},"d8":{"C":[]},"aG":{"F":["1","2"],"k1":["1","2"],"a8":["1","2"],"F.K":"1","F.V":"2"},"a7":{"n":["1"],"a":["1"],"a.E":"1"},"b6":{"G":["1"]},"Y":{"n":["1"],"a":["1"],"a.E":"1"},"ag":{"G":["1"]},"b5":{"n":["a9<1,2>"],"a":["a9<1,2>"],"a.E":"a9<1,2>"},"c_":{"G":["a9<1,2>"]},"bz":{"aC":[]},"bh":{"aC":[]},"bu":{"M":[],"B":[]},"c3":{"M":[]},"cV":{"M":[],"B":[]},"bv":{"af":["1"],"M":[]},"c1":{"E":["h"],"q":["h"],"af":["h"],"n":["h"],"M":[],"a":["h"],"K":["h"]},"c2":{"E":["b"],"q":["b"],"af":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"]},"cW":{"E":["h"],"q":["h"],"af":["h"],"n":["h"],"M":[],"a":["h"],"K":["h"],"B":[],"E.E":"h","K.E":"h"},"cX":{"E":["h"],"q":["h"],"af":["h"],"n":["h"],"M":[],"a":["h"],"K":["h"],"B":[],"E.E":"h","K.E":"h"},"cY":{"E":["b"],"q":["b"],"af":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"],"B":[],"E.E":"b","K.E":"b"},"cZ":{"E":["b"],"q":["b"],"af":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"],"B":[],"E.E":"b","K.E":"b"},"d_":{"E":["b"],"q":["b"],"af":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"],"B":[],"E.E":"b","K.E":"b"},"d0":{"E":["b"],"q":["b"],"af":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"],"B":[],"E.E":"b","K.E":"b"},"d1":{"E":["b"],"q":["b"],"af":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"],"B":[],"E.E":"b","K.E":"b"},"c4":{"E":["b"],"q":["b"],"af":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"],"B":[],"E.E":"b","K.E":"b"},"d2":{"jx":[],"E":["b"],"q":["b"],"af":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"],"B":[],"E.E":"b","K.E":"b"},"dg":{"C":[]},"bB":{"aJ":[],"C":[]},"aM":{"G":["1"]},"av":{"a":["1"],"a.E":"1"},"ao":{"C":[]},"W":{"aR":["1"]},"cs":{"kd":[]},"dl":{"cs":[],"kd":[]},"at":{"bw":["1"],"k4":["1"],"jv":["1"],"n":["1"],"a":["1"]},"bf":{"G":["1"]},"F":{"a8":["1","2"]},"bt":{"a8":["1","2"]},"cc":{"bC":["1","2"],"bt":["1","2"],"cr":["1","2"],"a8":["1","2"]},"bw":{"jv":["1"],"n":["1"],"a":["1"]},"cl":{"bw":["1"],"jv":["1"],"n":["1"],"a":["1"]},"di":{"F":["H","@"],"a8":["H","@"],"F.K":"H","F.V":"@"},"dj":{"k":["H"],"n":["H"],"a":["H"],"a.E":"H","k.E":"H"},"bY":{"C":[]},"cU":{"C":[]},"h":{"a3":[]},"b":{"a3":[]},"q":{"n":["1"],"a":["1"]},"df":{"cL":[]},"cD":{"C":[]},"aJ":{"C":[]},"az":{"C":[]},"c7":{"C":[]},"cN":{"C":[]},"cd":{"C":[]},"db":{"C":[]},"cb":{"C":[]},"cI":{"C":[]},"d3":{"C":[]},"ca":{"C":[]},"dn":{"aU":[]},"bx":{"lM":[]},"b2":{"cL":[]},"ak":{"cL":[]},"aD":{"cL":[]},"aj":{"cL":[]},"lw":{"q":["b"],"n":["b"],"a":["b"]},"jx":{"q":["b"],"n":["b"],"a":["b"]},"lQ":{"q":["b"],"n":["b"],"a":["b"]},"lu":{"q":["b"],"n":["b"],"a":["b"]},"lO":{"q":["b"],"n":["b"],"a":["b"]},"lv":{"q":["b"],"n":["b"],"a":["b"]},"lP":{"q":["b"],"n":["b"],"a":["b"]},"lr":{"q":["h"],"n":["h"],"a":["h"]},"ls":{"q":["h"],"n":["h"],"a":["h"]}}'))
A.mc(v.typeUniverse,JSON.parse('{"n":1,"bv":1,"cl":1,"cH":2,"cJ":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.cx
return{T:s("A"),q:s("D"),I:s("P"),t:s("b_"),a9:s("aD"),r:s("p"),c1:s("t"),bJ:s("bo"),o:s("an"),J:s("a5"),u:s("ao"),a:s("ap"),cM:s("bJ"),cs:s("ad"),U:s("n<@>"),V:s("C"),bo:s("bR<P,a5>"),h:s("aF"),O:s("a4"),E:s("b3<h>"),W:s("a<D>"),ef:s("a<p>"),er:s("a<a5>(P)"),R:s("a<@>"),w:s("u<A>"),Y:s("u<D>"),Z:s("u<P>"),eu:s("u<b_>"),e:s("u<p>"),_:s("u<t>"),k:s("u<an>"),m:s("u<a5>"),bL:s("u<ap>"),ay:s("u<a4>"),a5:s("u<q<t>>"),eG:s("u<q<z>>"),A:s("u<q<h>>"),x:s("u<q<b>>"),d:s("u<a8<H,z?>>"),Q:s("u<z>"),dZ:s("u<+(D,p)>"),s:s("u<H>"),bQ:s("u<au>"),n:s("u<h>"),gn:s("u<@>"),b:s("u<b>"),v:s("bU"),B:s("M"),cj:s("aS"),aU:s("af<@>"),f3:s("q<A>"),bd:s("q<p>"),j:s("q<@>"),L:s("q<b>"),d1:s("a8<H,@>"),f:s("a8<@,@>"),G:s("a8<H,z?>"),P:s("aa"),K:s("z"),gT:s("nB"),bY:s("+()"),fg:s("+(t,e)"),cJ:s("+(t,h)"),l:s("aU"),N:s("H"),aQ:s("y<au>"),dm:s("B"),eK:s("aJ"),ak:s("by"),eO:s("c<p>"),eq:s("c<h>"),cO:s("ce<p>"),c:s("W<@>"),dp:s("au"),dT:s("av<ad>"),gL:s("av<b>"),y:s("e"),aO:s("e(p)"),al:s("e(z)"),db:s("e(h)"),i:s("h"),z:s("@"),fO:s("@()"),D:s("@(z)"),C:s("@(z,aU)"),S:s("b"),eH:s("aR<aa>?"),an:s("M?"),bM:s("q<@>?"),eg:s("q<b>?"),X:s("z?"),dk:s("H?"),F:s("bc<@,@>?"),g:s("dk?"),fQ:s("e?"),cD:s("h?"),h6:s("b?"),cg:s("a3?"),H:s("a3"),p:s("~"),M:s("~()"),cA:s("~(H,@)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.ab=J.cP.prototype
B.a=J.u.prototype
B.c=J.bT.prototype
B.b=J.br.prototype
B.p=J.b4.prototype
B.ac=J.aS.prototype
B.ad=J.bW.prototype
B.O=J.d4.prototype
B.C=J.by.prototype
B.l=new A.aj(0,"upgrade")
B.D=new A.aj(1,"dismiss")
B.u=new A.aj(2,"recruit")
B.m=new A.aj(3,"soldiers")
B.v=new A.aj(4,"buyWeapon")
B.E=new A.aj(5,"dispatch")
B.P=new A.aj(6,"move")
B.Q=new A.aj(7,"camp")
B.R=new A.aj(8,"retreat")
B.f=new A.ak(0,"garrison")
B.n=new A.ak(2,"camped")
B.w=new A.ak(3,"queue")
B.x=new A.ak(4,"attacking")
B.e=new A.ak(5,"defending")
B.y=new A.ak(7,"retreating")
B.F=new A.aD(0,"full")
B.G=new A.aD(1,"resources")
B.z=new A.aD(2,"defense")
B.o=new A.aD(3,"attack")
B.N=s([],t._)
B.t=new A.bo(B.N,1/0,!1)
B.U=new A.bo(B.N,1/0,!1)
B.at=new A.cB(4,24,6,1.5,10,12,0.65,5,0.5,0.25,45,15,0.8,45,25,90,-0.15,10,3,1,96,160,6000,8,24,4,6,8,2,0,1,0.3,20,900,64,0.25,8,0.06,0.12,0.35,0.05,2500,2,20)
B.A=new A.b3(A.np(),t.E)
B.B=new A.b3(A.nq(),t.E)
B.H=new A.cK()
B.V=new A.bP(A.cx("bP<0&>"))
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

B.i=new A.h5()
B.a1=new A.d3()
B.k=new A.ig()
B.j=new A.dl()
B.a2=new A.dn()
B.h=new A.b2(0,"favorable")
B.a3=new A.b2(1,"close")
B.r=new A.b2(2,"unfavorable")
B.K=new A.b2(3,"unknown")
B.au=s(["\u9759\u6001\u8bc4\u4f30\u914d\u989d\u8017\u5c3d"],t.s)
B.a4=new A.bJ(B.K,-1,1,!1)
B.a5=new A.aE("AI \u534f\u8bae\u7248\u672c\u4e0d\u5339\u914d")
B.a6=new A.aE("AI \u6784\u5efa\u7248\u672c\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u751f\u6210 Worker")
B.a7=new A.aE("\u672a\u77e5 AI \u5de5\u4f5c\u547d\u4ee4")
B.a8=new A.aE("AI \u5730\u56fe\u5c3a\u5bf8\u65e0\u6548")
B.a9=new A.aE("\u56fd\u5bb6\u89c4\u5212\u9759\u6001\u7248\u672c\u4e0d\u5339\u914d")
B.aa=new A.aE("\u56fd\u5bb6\u89c2\u5bdf\u8d85\u51fa\u534f\u8bae\u5bb9\u91cf")
B.ae=new A.h6(null)
B.af=new A.h7(null)
B.S=new A.ak(1,"marching")
B.T=new A.ak(6,"field")
B.L=s([B.f,B.S,B.n,B.w,B.x,B.e,B.T,B.y],A.cx("u<ak>"))
B.ag=s([B.F,B.G,B.z,B.o],A.cx("u<aD>"))
B.M=s([],t.Z)
B.av=s([],t.k)
B.q=s([],t.m)
B.d=s([],t.b)
B.ah=A.ax("nw")
B.ai=A.ax("nx")
B.aj=A.ax("lr")
B.ak=A.ax("ls")
B.al=A.ax("lu")
B.am=A.ax("lv")
B.an=A.ax("lw")
B.ao=A.ax("z")
B.ap=A.ax("lO")
B.aq=A.ax("lP")
B.ar=A.ax("lQ")
B.as=A.ax("jx")})();(function staticFields(){$.iK=null
$.ah=A.d([],t.Q)
$.k5=null
$.hD=0
$.hE=A.mL()
$.jW=null
$.jV=null
$.kF=null
$.kA=null
$.kO=null
$.j6=null
$.jc=null
$.jK=null
$.iP=A.d([],A.cx("u<q<z>?>"))
$.bE=null
$.cv=null
$.cw=null
$.jD=!1
$.N=B.j})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"nz","kR",()=>A.j7("_$dart_dartClosure"))
s($,"ny","jN",()=>A.j7("_$dart_dartClosure_dartJSInterop"))
s($,"nQ","l1",()=>A.d([new J.cQ()],A.cx("u<c9>")))
s($,"nE","kS",()=>A.aK(A.it({
toString:function(){return"$receiver$"}})))
s($,"nF","kT",()=>A.aK(A.it({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"nG","kU",()=>A.aK(A.it(null)))
s($,"nH","kV",()=>A.aK(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nK","kY",()=>A.aK(A.it(void 0)))
s($,"nL","kZ",()=>A.aK(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nJ","kX",()=>A.aK(A.kb(null)))
s($,"nI","kW",()=>A.aK(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"nN","l0",()=>A.aK(A.kb(void 0)))
s($,"nM","l_",()=>A.aK(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"nO","jP",()=>A.lR())
s($,"nP","ds",()=>A.kL(B.ao))
s($,"nC","jO",()=>{A.lH()
return $.hD})})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.bu,SharedArrayBuffer:A.bu,ArrayBufferView:A.c3,DataView:A.cV,Float32Array:A.cW,Float64Array:A.cX,Int16Array:A.cY,Int32Array:A.cZ,Int8Array:A.d_,Uint16Array:A.d0,Uint32Array:A.d1,Uint8ClampedArray:A.c4,CanvasPixelArray:A.c4,Uint8Array:A.d2})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bv.$nativeSuperclassTag="ArrayBufferView"
A.ch.$nativeSuperclassTag="ArrayBufferView"
A.ci.$nativeSuperclassTag="ArrayBufferView"
A.c1.$nativeSuperclassTag="ArrayBufferView"
A.cj.$nativeSuperclassTag="ArrayBufferView"
A.ck.$nativeSuperclassTag="ArrayBufferView"
A.c2.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.nn
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()