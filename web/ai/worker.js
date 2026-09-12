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
if(a[b]!==s){A.nz(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.c(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.jL(b)
return new s(c,this)}:function(){if(s===null)s=A.jL(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.jL(a).prototype
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
jQ(a,b,c,d){return{i:a,p:b,e:c,x:d}},
jM(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.jO==null){A.nn()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.j(A.kg("Return interceptor for "+A.w(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.iL
if(o==null)o=$.iL=A.j8(n)
p=q[o]}if(p!=null)return p
p=A.ns(a)
if(p!=null)return p
if(typeof a=="function")return B.ah
s=Object.getPrototypeOf(a)
if(s==null)return B.O
if(s===Object.prototype)return B.O
if(typeof q=="function"){o=$.iL
if(o==null)o=$.iL=A.j8(n)
Object.defineProperty(q,o,{value:B.C,enumerable:false,writable:true,configurable:true})
return B.C}return B.C},
lE(a,b){if(a<0||a>4294967295)throw A.j(A.ba(a,0,4294967295,"length",null))
return J.lF(new Array(a),b)},
k4(a,b){if(a<0)throw A.j(A.cC("Length must be a non-negative integer: "+a,null))
return A.c(new Array(a),b.h("u<0>"))},
lF(a,b){var s=A.c(a,b.h("u<0>"))
s.$flags=1
return s},
bl(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bU.prototype
return J.cU.prototype}if(typeof a=="string")return J.b7.prototype
if(a==null)return J.bV.prototype
if(typeof a=="boolean")return J.cT.prototype
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aU.prototype
if(typeof a=="symbol")return J.bY.prototype
if(typeof a=="bigint")return J.bW.prototype
return a}if(a instanceof A.z)return a
return J.jM(a)},
cz(a){if(typeof a=="string")return J.b7.prototype
if(a==null)return a
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aU.prototype
if(typeof a=="symbol")return J.bY.prototype
if(typeof a=="bigint")return J.bW.prototype
return a}if(a instanceof A.z)return a
return J.jM(a)},
aZ(a){if(a==null)return a
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aU.prototype
if(typeof a=="symbol")return J.bY.prototype
if(typeof a=="bigint")return J.bW.prototype
return a}if(a instanceof A.z)return a
return J.jM(a)},
ni(a){if(typeof a=="number")return J.bs.prototype
if(typeof a=="string")return J.b7.prototype
if(a==null)return a
if(!(a instanceof A.z))return J.bz.prototype
return a},
az(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bl(a).ab(a,b)},
aR(a,b){if(typeof b==="number")if(Array.isArray(a)||A.nr(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.aZ(a).i(a,b)},
l6(a,b){return J.aZ(a).m(a,b)},
l7(a,b){return J.aZ(a).D(a,b)},
l8(a,b){return J.ni(a).t(a,b)},
jn(a,b){return J.aZ(a).T(a,b)},
jU(a){return J.aZ(a).gJ(a)},
af(a){return J.bl(a).gR(a)},
jo(a){return J.cz(a).ga4(a)},
l9(a){return J.cz(a).gaz(a)},
G(a){return J.aZ(a).gB(a)},
la(a){return J.aZ(a).gaA(a)},
bo(a){return J.cz(a).gl(a)},
lb(a){return J.bl(a).gS(a)},
lc(a,b){return J.aZ(a).b2(a,b)},
ld(a,b){return J.aZ(a).cg(a,b)},
b1(a){return J.bl(a).q(a)},
cR:function cR(){},
cT:function cT(){},
bV:function bV(){},
bX:function bX(){},
aV:function aV(){},
d6:function d6(){},
bz:function bz(){},
aU:function aU(){},
bW:function bW(){},
bY:function bY(){},
u:function u(a){this.$ti=a},
cS:function cS(){},
h4:function h4(a){this.$ti=a},
b4:function b4(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bs:function bs(){},
bU:function bU(){},
cU:function cU(){},
b7:function b7(){}},A={jt:function jt(){},
lG(a){return new A.c_("Field '"+a+"' has not been initialized.")},
aJ(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
ij(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
X(a,b,c){return a},
jP(a){var s,r
for(s=$.aj.length,r=0;r<s;++r)if(a===$.aj[r])return!0
return!1},
Z(a,b,c,d){A.c9(b,"start")
if(c!=null){A.c9(c,"end")
if(b>c)A.b0(A.ba(b,0,c,"start",null))}return new A.y(a,b,c,d.h("y<0>"))},
lJ(a,b,c,d){if(t.U.b(a))return new A.bO(a,b,c.h("@<0>").K(d).h("bO<1,2>"))
return new A.as(a,b,c.h("@<0>").K(d).h("as<1,2>"))},
ke(a,b,c){A.c9(b,"takeCount")
if(t.U.b(a))return new A.bP(a,b,c.h("bP<0>"))
return new A.bb(a,b,c.h("bb<0>"))},
aB(){return new A.cc("No element")},
c_:function c_(a){this.a=a},
ih:function ih(){},
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
as:function as(a,b,c){this.a=a
this.b=b
this.$ti=c},
bO:function bO(a,b,c){this.a=a
this.b=b
this.$ti=c},
c1:function c1(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
a0:function a0(a,b,c){this.a=a
this.b=b
this.$ti=c},
d:function d(a,b,c){this.a=a
this.b=b
this.$ti=c},
V:function V(a,b,c){this.a=a
this.b=b
this.$ti=c},
bS:function bS(a,b,c){this.a=a
this.b=b
this.$ti=c},
bT:function bT(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
bb:function bb(a,b,c){this.a=a
this.b=b
this.$ti=c},
bP:function bP(a,b,c){this.a=a
this.b=b
this.$ti=c},
bc:function bc(a,b,c){this.a=a
this.b=b
this.$ti=c},
bQ:function bQ(a){this.$ti=a},
cf:function cf(a,b){this.a=a
this.$ti=b},
cg:function cg(a,b){this.a=a
this.$ti=b},
K:function K(){},
L:function L(a,b){this.a=a
this.$ti=b},
cJ(a,b,c){var s,r,q,p,o,n,m,l=A.l(a),k=A.bt(new A.a7(a,l.h("a7<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.v)(k),++i,p=o){r=k[i]
c.a(a.i(0,r))
o=p+1
q[r]=p}n=A.bt(new A.Y(a,l.h("Y<2>")),!0,c)
m=new A.bN(q,n,b.h("@<0>").K(c).h("bN<1,2>"))
m.$keys=k
return m}return new A.bM(A.ae(a,b,c),b.h("@<0>").K(c).h("bM<1,2>"))},
kU(a){var s=A.kT(a)
if(s!=null)return s
return"minified:"+a},
nr(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
w(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.b1(a)
return s},
d8(a){var s,r=$.k9
if(r==null)r=$.k9=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
lO(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.m(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
d9(a){var s,r,q,p
if(a instanceof A.z)return A.ab(A.aP(a),null)
s=J.bl(a)
if(s===B.ag||s===B.ai||t.ak.b(a)){r=B.I(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.ab(A.aP(a),null)},
ka(a){var s,r,q
if(a==null||typeof a=="number"||A.jG(a))return J.b1(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a6)return a.q(0)
if(a instanceof A.aD)return a.bP(!0)
s=$.l5()
for(r=0;r<1;++r){q=s[r].dG(a)
if(q!=null)return q}return"Instance of '"+A.d9(a)+"'"},
lL(){return Date.now()},
lN(){var s,r
if($.hE!==0)return
$.hE=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
if(!!s.dartUseDateNowForTicks)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.hE=1e6
$.hF=new A.hD(r)},
a1(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.bL(s,10)|55296)>>>0,s&1023|56320)}throw A.j(A.ba(a,0,1114111,null,null))},
lM(a){var s=a.$thrownJsError
if(s==null)return null
return A.bI(s)},
m(a,b){if(a==null)J.bo(a)
throw A.j(A.kI(a,b))},
kI(a,b){var s,r="index"
if(!A.ky(b))return new A.aA(!0,b,r,null)
s=J.bo(a)
if(b<0||b>=s)return A.jr(b,s,a,r)
return new A.c8(null,null,!0,b,r,"Value not in range")},
n7(a){return new A.aA(!0,a,null,null)},
j5(a){return a},
j(a){return A.U(a,new Error())},
U(a,b){var s
if(a==null)a=new A.aK()
b.dartException=a
s=A.nA
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
nA(){return J.b1(this.dartException)},
b0(a,b){throw A.U(a,b==null?new Error():b)},
cA(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.b0(A.mw(a,b,c),s)},
mw(a,b,c){var s,r,q,p,o,n,m,l,k
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
v(a){throw A.j(A.a_(a))},
aL(a){var s,r,q,p,o,n
a=A.nx(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.c([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.it(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
iu(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
kf(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
ju(a,b){var s=b==null,r=s?null:b.method
return new A.cV(a,r,s?null:b.receiver)},
aQ(a){var s
if(a==null)return new A.hf(a)
if(a instanceof A.bR){s=a.a
return A.b_(a,s==null?A.cv(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.b_(a,a.dartException)
return A.n5(a)},
b_(a,b){if(t.V.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
n5(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bL(r,16)&8191)===10)switch(q){case 438:return A.b_(a,A.ju(A.w(s)+" (Error "+q+")",null))
case 445:case 5007:A.w(s)
return A.b_(a,new A.c6())}}if(a instanceof TypeError){p=$.kW()
o=$.kX()
n=$.kY()
m=$.kZ()
l=$.l1()
k=$.l2()
j=$.l0()
$.l_()
i=$.l4()
h=$.l3()
g=p.aa(s)
if(g!=null)return A.b_(a,A.ju(A.J(s),g))
else{g=o.aa(s)
if(g!=null){g.method="call"
return A.b_(a,A.ju(A.J(s),g))}else if(n.aa(s)!=null||m.aa(s)!=null||l.aa(s)!=null||k.aa(s)!=null||j.aa(s)!=null||m.aa(s)!=null||i.aa(s)!=null||h.aa(s)!=null){A.J(s)
return A.b_(a,new A.c6())}}return A.b_(a,new A.de(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.cb()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.b_(a,new A.aA(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.cb()
return a},
bI(a){var s
if(a instanceof A.bR)return a.b
if(a==null)return new A.cn(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.cn(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
kP(a){if(a==null)return J.af(a)
if(typeof a=="object")return A.d8(a)
return J.af(a)},
ng(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.v(0,a[s],a[r])}return b},
nh(a,b){var s,r=a.length
for(s=0;s<r;++s)b.m(0,a[s])
return b},
mF(a,b,c,d,e,f){t.h.a(a)
switch(A.f(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.j(new A.iz("Unsupported number of arguments for wrapped closure"))},
ds(a,b){var s=a.$identity
if(!!s)return s
s=A.nc(a,b)
a.$identity=s
return s},
nc(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.mF)},
lr(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.db().constructor.prototype):Object.create(new A.bq(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.k2(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.ln(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.k2(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
ln(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.j("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.ll)}throw A.j("Error in functionType of tearoff")},
lo(a,b,c,d){var s=A.k1
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
k2(a,b,c,d){if(c)return A.lq(a,b,d)
return A.lo(b.length,d,a,b)},
lp(a,b,c,d){var s=A.k1,r=A.lm
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
lq(a,b,c){var s,r
if($.k_==null)$.k_=A.jZ("interceptor")
if($.k0==null)$.k0=A.jZ("receiver")
s=b.length
r=A.lp(s,c,a,b)
return r},
jL(a){return A.lr(a)},
ll(a,b){return A.cr(v.typeUniverse,A.aP(a.a),b)},
k1(a){return a.a},
lm(a){return a.b},
jZ(a){var s,r,q,p=new A.bq("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.j(A.cC("Field name "+a+" not found.",null))},
j8(a){return v.getIsolateTag(a)},
ns(a){var s,r,q,p,o,n=A.J($.kJ.$1(a)),m=$.j7[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jd[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bE($.kE.$2(a,n))
if(q!=null){m=$.j7[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jd[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.jg(s)
$.j7[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.jd[n]=s
return s}if(p==="-"){o=A.jg(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.kR(a,s)
if(p==="*")throw A.j(A.kg(n))
if(v.leafTags[n]===true){o=A.jg(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.kR(a,s)},
kR(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.jQ(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
jg(a){return J.jQ(a,!1,null,!!a.$iah)},
nu(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.jg(s)
else return J.jQ(s,c,null,null)},
nn(){if(!0===$.jO)return
$.jO=!0
A.no()},
no(){var s,r,q,p,o,n,m,l
$.j7=Object.create(null)
$.jd=Object.create(null)
A.nm()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.kS.$1(o)
if(n!=null){m=A.nu(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
nm(){var s,r,q,p,o,n,m=B.X()
m=A.bH(B.Y,A.bH(B.Z,A.bH(B.J,A.bH(B.J,A.bH(B.a_,A.bH(B.a0,A.bH(B.a1(B.I),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.kJ=new A.ja(p)
$.kE=new A.jb(o)
$.kS=new A.jc(n)},
bH(a,b){return a(b)||b},
ma(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.m(b,s)
if(!J.az(r,b[s]))return!1}return!0},
ne(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
nx(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bk:function bk(a,b){this.a=a
this.b=b},
aM:function aM(a){this.a=a},
bB:function bB(a){this.a=a},
bM:function bM(a,b){this.a=a
this.$ti=b},
bL:function bL(){},
bN:function bN(a,b,c){this.a=a
this.b=b
this.$ti=c},
bg:function bg(a,b){this.a=a
this.$ti=b},
ch:function ch(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cQ:function cQ(){},
b6:function b6(a,b){this.a=a
this.$ti=b},
hD:function hD(a){this.a=a},
ca:function ca(){},
it:function it(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
c6:function c6(){},
cV:function cV(a,b,c){this.a=a
this.b=b
this.c=c},
de:function de(a){this.a=a},
hf:function hf(a){this.a=a},
bR:function bR(a,b){this.a=a
this.b=b},
cn:function cn(a){this.a=a
this.b=null},
a6:function a6(){},
cF:function cF(){},
cG:function cG(){},
dc:function dc(){},
db:function db(){},
bq:function bq(a,b){this.a=a
this.b=b},
da:function da(a){this.a=a},
aG:function aG(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
h5:function h5(a){this.a=a},
h9:function h9(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
a7:function a7(a,b){this.a=a
this.$ti=b},
b8:function b8(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
Y:function Y(a,b){this.a=a
this.$ti=b},
ai:function ai(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aH:function aH(a,b){this.a=a
this.$ti=b},
c0:function c0(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
ja:function ja(a){this.a=a},
jb:function jb(a){this.a=a},
jc:function jc(a){this.a=a},
aD:function aD(){},
bA:function bA(){},
bj:function bj(){},
mx(a){return a},
bv:function bv(){},
c4:function c4(){},
cX:function cX(){},
bw:function bw(){},
c2:function c2(){},
c3:function c3(){},
cY:function cY(){},
cZ:function cZ(){},
d_:function d_(){},
d0:function d0(){},
d1:function d1(){},
d2:function d2(){},
d3:function d3(){},
c5:function c5(){},
d4:function d4(){},
ci:function ci(){},
cj:function cj(){},
ck:function ck(){},
cl:function cl(){},
jy(a,b){var s=b.c
return s==null?b.c=A.cp(a,"aT",[b.x]):s},
kb(a){var s=a.w
if(s===6||s===7)return A.kb(a.x)
return s===11||s===12},
lQ(a){return a.as},
kQ(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
cy(a){return A.iV(v.typeUniverse,a,!1)},
nq(a,b){var s,r,q,p,o
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
return A.kp(a1,r,!0)
case 7:s=a2.x
r=A.aY(a1,s,a3,a4)
if(r===s)return a2
return A.ko(a1,r,!0)
case 8:q=a2.y
p=A.bG(a1,q,a3,a4)
if(p===q)return a2
return A.cp(a1,a2.x,p)
case 9:o=a2.x
n=A.aY(a1,o,a3,a4)
m=a2.y
l=A.bG(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.jD(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bG(a1,j,a3,a4)
if(i===j)return a2
return A.kq(a1,k,i)
case 11:h=a2.x
g=A.aY(a1,h,a3,a4)
f=a2.y
e=A.n2(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.kn(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bG(a1,d,a3,a4)
o=a2.x
n=A.aY(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jE(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.j(A.cE("Attempted to substitute unexpected RTI kind "+a0))}},
bG(a,b,c,d){var s,r,q,p,o=b.length,n=A.iW(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.aY(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
n3(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.iW(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.aY(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
n2(a,b,c,d){var s,r=b.a,q=A.bG(a,r,c,d),p=b.b,o=A.bG(a,p,c,d),n=b.c,m=A.n3(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dj()
s.a=q
s.b=o
s.c=m
return s},
c(a,b){a[v.arrayRti]=b
return a},
j6(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.nk(s)
return a.$S()}return null},
np(a,b){var s
if(A.kb(b))if(a instanceof A.a6){s=A.j6(a)
if(s!=null)return s}return A.aP(a)},
aP(a){if(a instanceof A.z)return A.l(a)
if(Array.isArray(a))return A.i(a)
return A.jF(J.bl(a))},
i(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
l(a){var s=a.$ti
return s!=null?s:A.jF(a)},
jF(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.mE(a,s)},
mE(a,b){var s=a instanceof A.a6?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.mk(v.typeUniverse,s.name)
b.$ccache=r
return r},
nk(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.iV(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
nj(a){return A.aO(A.l(a))},
jN(a){var s=A.j6(a)
return A.aO(s==null?A.aP(a):s)},
jJ(a){var s
if(a instanceof A.aD)return A.nf(a.$r,a.bd())
s=a instanceof A.a6?A.j6(a):null
if(s!=null)return s
if(t.dm.b(a))return J.lb(a).a
if(Array.isArray(a))return A.i(a)
return A.aP(a)},
aO(a){var s=a.r
return s==null?a.r=new A.iU(a):s},
nf(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bY
if(0>=p)return A.m(q,0)
s=A.cr(v.typeUniverse,A.jJ(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.m(q,r)
s=A.ks(v.typeUniverse,s,A.jJ(q[r]))}return A.cr(v.typeUniverse,s,a)},
ay(a){return A.aO(A.iV(v.typeUniverse,a,!1))},
mD(a){var s=this
s.b=A.n0(s)
return s.b(a)},
n0(a){var s,r,q,p,o
if(a===t.K)return A.mL
if(A.bm(a))return A.mP
s=a.w
if(s===6)return A.mB
if(s===1)return A.kA
if(s===7)return A.mG
r=A.n_(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bm)){a.f="$i"+q
if(q==="q")return A.mJ
if(a===t.B)return A.mI
return A.mO}}else if(s===10){p=A.ne(a.x,a.y)
o=p==null?A.kA:p
return o==null?A.cv(o):o}return A.mz},
n_(a){if(a.w===8){if(a===t.S)return A.ky
if(a===t.i||a===t.H)return A.mK
if(a===t.N)return A.mN
if(a===t.y)return A.jG}return null},
mC(a){var s=this,r=A.my
if(A.bm(s))r=A.mo
else if(s===t.K)r=A.cv
else if(A.bJ(s)){r=A.mA
if(s===t.h6)r=A.a2
else if(s===t.dk)r=A.bE
else if(s===t.fQ)r=A.cu
else if(s===t.cg)r=A.S
else if(s===t.cD)r=A.mm
else if(s===t.an)r=A.mn}else if(s===t.S)r=A.f
else if(s===t.N)r=A.J
else if(s===t.y)r=A.ax
else if(s===t.H)r=A.x
else if(s===t.i)r=A.ao
else if(s===t.B)r=A.iX
s.a=r
return s.a(a)},
mz(a){var s=this
if(a==null)return A.bJ(s)
return A.kM(v.typeUniverse,A.np(a,s),s)},
mB(a){if(a==null)return!0
return this.x.b(a)},
mO(a){var s,r=this
if(a==null)return A.bJ(r)
s=r.f
if(a instanceof A.z)return!!a[s]
return!!J.bl(a)[s]},
mJ(a){var s,r=this
if(a==null)return A.bJ(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.z)return!!a[s]
return!!J.bl(a)[s]},
mI(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.z)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
kz(a){if(typeof a=="object"){if(a instanceof A.z)return t.B.b(a)
return!0}if(typeof a=="function")return!0
return!1},
my(a){var s=this
if(a==null){if(A.bJ(s))return a}else if(s.b(a))return a
throw A.U(A.kv(a,s),new Error())},
mA(a){var s=this
if(a==null||s.b(a))return a
throw A.U(A.kv(a,s),new Error())},
kv(a,b){return new A.bC("TypeError: "+A.ki(a,A.ab(b,null)))},
kH(a,b,c,d){if(A.kM(v.typeUniverse,a,b))return a
throw A.U(A.mc("The type argument '"+A.ab(a,null)+"' is not a subtype of the type variable bound '"+A.ab(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
ki(a,b){return A.cN(a)+": type '"+A.ab(A.jJ(a),null)+"' is not a subtype of type '"+b+"'"},
mc(a){return new A.bC("TypeError: "+a)},
an(a,b){return new A.bC("TypeError: "+A.ki(a,b))},
mG(a){var s=this
return s.x.b(a)||A.jy(v.typeUniverse,s).b(a)},
mL(a){return a!=null},
cv(a){if(a!=null)return a
throw A.U(A.an(a,"Object"),new Error())},
mP(a){return!0},
mo(a){return a},
kA(a){return!1},
jG(a){return!0===a||!1===a},
ax(a){if(!0===a)return!0
if(!1===a)return!1
throw A.U(A.an(a,"bool"),new Error())},
cu(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.U(A.an(a,"bool?"),new Error())},
ao(a){if(typeof a=="number")return a
throw A.U(A.an(a,"double"),new Error())},
mm(a){if(typeof a=="number")return a
if(a==null)return a
throw A.U(A.an(a,"double?"),new Error())},
ky(a){return typeof a=="number"&&Math.floor(a)===a},
f(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.U(A.an(a,"int"),new Error())},
a2(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.U(A.an(a,"int?"),new Error())},
mK(a){return typeof a=="number"},
x(a){if(typeof a=="number")return a
throw A.U(A.an(a,"num"),new Error())},
S(a){if(typeof a=="number")return a
if(a==null)return a
throw A.U(A.an(a,"num?"),new Error())},
mN(a){return typeof a=="string"},
J(a){if(typeof a=="string")return a
throw A.U(A.an(a,"String"),new Error())},
bE(a){if(typeof a=="string")return a
if(a==null)return a
throw A.U(A.an(a,"String?"),new Error())},
iX(a){if(A.kz(a))return a
throw A.U(A.an(a,"JSObject"),new Error())},
mn(a){if(a==null)return a
if(A.kz(a))return a
throw A.U(A.an(a,"JSObject?"),new Error())},
kC(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.ab(a[q],b)
return s},
mV(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.kC(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.ab(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
kw(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.c([],t.s)
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
if(l===8){p=A.n4(a.x)
o=a.y
return o.length>0?p+("<"+A.kC(o,b)+">"):p}if(l===10)return A.mV(a,b)
if(l===11)return A.kw(a,b,null)
if(l===12)return A.kw(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.m(b,n)
return b[n]}return"?"},
n4(a){var s=A.kT(a)
if(s!=null)return s
return"minified:"+a},
ml(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
mk(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.iV(a,b,!1)
else if(typeof m=="number"){s=m
r=A.cq(a,5,"#")
q=A.iW(s)
for(p=0;p<s;++p)q[p]=r
o=A.cp(a,b,q)
n[b]=o
return o}else return m},
mj(a,b){return A.kt(a.tR,b)},
mi(a,b){return A.kt(a.eT,b)},
iV(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.kr(a,null,b,!1)
r.set(b,s)
return s},
cr(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.kr(a,b,c,!0)
q.set(c,r)
return r},
ks(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.jD(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
kr(a,b,c,d){return A.m8(A.m2(a,b,c,d))},
aX(a,b){b.a=A.mC
b.b=A.mD
return b},
cq(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.at(null,null)
s.w=b
s.as=c
r=A.aX(a,s)
a.eC.set(c,r)
return r},
kp(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.mg(a,b,r,c)
a.eC.set(r,s)
return s},
mg(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bm(b))if(!(b===t.P||b===t.v))if(s!==6)r=s===7&&A.bJ(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.at(null,null)
q.w=6
q.x=b
q.as=c
return A.aX(a,q)},
ko(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.me(a,b,r,c)
a.eC.set(r,s)
return s},
me(a,b,c,d){var s,r
if(d){s=b.w
if(A.bm(b)||b===t.K)return b
else if(s===1)return A.cp(a,"aT",[b])
else if(b===t.P||b===t.v)return t.eH}r=new A.at(null,null)
r.w=7
r.x=b
r.as=c
return A.aX(a,r)},
mh(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.at(null,null)
s.w=13
s.x=b
s.as=q
r=A.aX(a,s)
a.eC.set(q,r)
return r},
co(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
md(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
cp(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.co(c)+">"
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
jD(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.co(r)+">")
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
kq(a,b,c){var s,r,q="+"+(b+"("+A.co(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.at(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.aX(a,s)
a.eC.set(q,r)
return r},
kn(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.co(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.co(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.md(i)+"}"}r=n+(g+")")
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
jE(a,b,c,d){var s,r=b.as+("<"+A.co(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.mf(a,b,c,r,d)
a.eC.set(r,s)
return s},
mf(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.iW(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.aY(a,b,r,0)
m=A.bG(a,c,r,0)
return A.jE(a,n,m,c!==m)}}l=new A.at(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.aX(a,l)},
m2(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
m8(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.m4(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.kk(a,r,l,k,!1)
else if(q===46)r=A.kk(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bi(a.u,a.e,k.pop()))
break
case 94:k.push(A.mh(a.u,k.pop()))
break
case 35:k.push(A.cq(a.u,5,"#"))
break
case 64:k.push(A.cq(a.u,2,"@"))
break
case 126:k.push(A.cq(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.m6(a,k)
break
case 38:A.m5(a,k)
break
case 63:p=a.u
k.push(A.kp(p,A.bi(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.ko(p,A.bi(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.m3(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.kl(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.m9(a.u,a.e,o)
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
return A.bi(a.u,a.e,m)},
m4(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
kk(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.ml(s,o.x)[p]
if(n==null)A.b0('No "'+p+'" in "'+A.lQ(o)+'"')
d.push(A.cr(s,o,n))}else d.push(p)
return m},
m6(a,b){var s,r=a.u,q=A.kj(a,b),p=b.pop()
if(typeof p=="string")b.push(A.cp(r,p,q))
else{s=A.bi(r,a.e,p)
switch(s.w){case 11:b.push(A.jE(r,s,q,a.n))
break
default:b.push(A.jD(r,s,q))
break}}},
m3(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.kj(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bi(p,a.e,o)
q=new A.dj()
q.a=s
q.b=n
q.c=m
b.push(A.kn(p,r,q))
return
case-4:b.push(A.kq(p,b.pop(),s))
return
default:throw A.j(A.cE("Unexpected state under `()`: "+A.w(o)))}},
m5(a,b){var s=b.pop()
if(0===s){b.push(A.cq(a.u,1,"0&"))
return}if(1===s){b.push(A.cq(a.u,4,"1&"))
return}throw A.j(A.cE("Unexpected extended operation "+A.w(s)))},
kj(a,b){var s=b.splice(a.p)
A.kl(a.u,a.e,s)
a.p=b.pop()
return s},
bi(a,b,c){if(typeof c=="string")return A.cp(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.m7(a,b,c)}else return c},
kl(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bi(a,b,c[s])},
m9(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bi(a,b,c[s])},
m7(a,b,c){var s,r,q=b.w
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
kM(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.T(a,b,null,c,null)
r.set(c,s)}return s},
T(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bm(d))return!0
s=b.w
if(s===4)return!0
if(A.bm(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.T(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.v){if(q===7)return A.T(a,b,c,d.x,e)
return d===p||d===t.v||q===6}if(d===t.K){if(s===7)return A.T(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.T(a,b.x,c,d,e))return!1
return A.T(a,A.jy(a,b),c,d,e)}if(s===6)return A.T(a,p,c,d,e)&&A.T(a,b.x,c,d,e)
if(q===7){if(A.T(a,b,c,d.x,e))return!0
return A.T(a,b,c,A.jy(a,d),e)}if(q===6)return A.T(a,b,c,p,e)||A.T(a,b,c,d.x,e)
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
if(!A.T(a,j,c,i,e)||!A.T(a,i,e,j,c))return!1}return A.kx(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.kx(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.mH(a,b,c,d,e)}if(o&&q===10)return A.mM(a,b,c,d,e)
return!1},
kx(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.T(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.T(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.T(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.T(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.T(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
mH(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.cr(a,b,r[o])
return A.ku(a,p,null,c,d.y,e)}return A.ku(a,b.y,null,c,d.y,e)},
ku(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.T(a,b[s],d,e[s],f))return!1
return!0},
mM(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.T(a,r[s],c,q[s],e))return!1
return!0},
bJ(a){var s=a.w,r=!0
if(!(a===t.P||a===t.v))if(!A.bm(a))if(s!==6)r=s===7&&A.bJ(a.x)
return r},
bm(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
kt(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
iW(a){return a>0?new Array(a):v.typeUniverse.sEA},
at:function at(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dj:function dj(){this.c=this.b=this.a=null},
iU:function iU(a){this.a=a},
di:function di(){},
bC:function bC(a){this.a=a},
lX(){var s,r,q
if(self.scheduleImmediate!=null)return A.n8()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.ds(new A.iw(s),1)).observe(r,{childList:true})
return new A.iv(s,r,q)}else if(self.setImmediate!=null)return A.n9()
return A.na()},
lY(a){self.scheduleImmediate(A.ds(new A.ix(t.M.a(a)),0))},
lZ(a){self.setImmediate(A.ds(new A.iy(t.M.a(a)),0))},
m_(a){A.jA(B.H,t.M.a(a))},
jA(a,b){return A.mb(0,b)},
mb(a,b){var s=new A.iS()
s.cu(a,b)
return s},
mS(a){return new A.df(new A.W($.N,a.h("W<0>")),a.h("df<0>"))},
ms(a,b){a.$2(0,null)
b.b=!0
return b.a},
mp(a,b){A.mt(a,b)},
mr(a,b){var s,r,q=b.$ti
q.h("1/?").a(a)
s=a==null?q.c.a(a):a
if(!b.b)b.a.cC(s)
else{r=b.a
if(q.h("aT<1>").b(s))r.bA(s)
else r.bC(s)}},
mq(a,b){var s=A.aQ(a),r=A.bI(a),q=b.b,p=b.a
if(q)p.b7(new A.aq(s,r))
else p.bz(new A.aq(s,r))},
mt(a,b){var s,r,q=new A.iY(b),p=new A.iZ(b)
if(a instanceof A.W)a.bO(q,p,t.z)
else{s=t.z
if(a instanceof A.W)a.cj(q,p,s)
else{r=new A.W($.N,t.c)
r.a=8
r.c=a
r.bO(q,p,s)}}},
n6(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.N.cf(new A.j1(s),t.p,t.S,t.z)},
km(a,b,c){return 0},
jp(a){var s
if(t.V.b(a)){s=a.gaN()
if(s!=null)return s}return B.a3},
lx(a,b){var s
if(!b.b(null))throw A.j(A.ev(null,"computation","The type parameter is not nullable"))
s=new A.W($.N,b.h("W<0>"))
A.lT(a,new A.h3(null,s,b))
return s},
iD(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.lR()
b.bz(new A.aq(new A.aA(!0,n,null,"Cannot complete a future with itself"),s))
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
A.bf(b,p)
return}b.a^=2
A.dr(null,null,b.b,t.M.a(new A.iE(o,b)))},
bf(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.u,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.jI(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.bf(d.a,c)
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
A.jI(j.a,j.b)
return}g=$.N
if(g!==h)$.N=h
else g=null
c=c.c
if((c&15)===8)new A.iI(q,d,n).$0()
else if(o){if((c&1)!==0)new A.iH(q,j).$0()}else if((c&2)!==0)new A.iG(d,q).$0()
if(g!=null)$.N=g
c=q.c
if(c instanceof A.W){p=q.a.$ti
p=p.h("aT<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aS(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.iD(c,f,!0)
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
mW(a,b){var s
if(t.C.b(a))return b.cf(a,t.z,t.K,t.l)
s=t.D
if(s.b(a))return s.a(a)
throw A.j(A.ev(a,"onError",u.c))},
mT(){var s,r
for(s=$.bF;s!=null;s=$.bF){$.cx=null
r=s.b
$.bF=r
if(r==null)$.cw=null
s.a.$0()}},
n1(){$.jH=!0
try{A.mT()}finally{$.cx=null
$.jH=!1
if($.bF!=null)$.jT().$1(A.kG())}},
kD(a){var s=new A.dg(a),r=$.cw
if(r==null){$.bF=$.cw=s
if(!$.jH)$.jT().$1(A.kG())}else $.cw=r.b=s},
mZ(a){var s,r,q,p=$.bF
if(p==null){A.kD(a)
$.cx=$.cw
return}s=new A.dg(a)
r=$.cx
if(r==null){s.b=p
$.bF=$.cx=s}else{q=r.b
s.b=q
$.cx=r.b=s
if(q==null)$.cw=s}},
nL(a,b){A.X(a,"stream",t.K)
return new A.dp(b.h("dp<0>"))},
lT(a,b){var s=$.N
if(s===B.j)return A.jA(a,t.M.a(b))
return A.jA(a,t.M.a(s.bZ(b)))},
jI(a,b){A.mZ(new A.j0(a,b))},
kB(a,b,c,d,e){var s,r=$.N
if(r===c)return d.$0()
$.N=c
s=r
try{r=d.$0()
return r}finally{$.N=s}},
mY(a,b,c,d,e,f,g){var s,r=$.N
if(r===c)return d.$1(e)
$.N=c
s=r
try{r=d.$1(e)
return r}finally{$.N=s}},
mX(a,b,c,d,e,f,g,h,i){var s,r=$.N
if(r===c)return d.$2(e,f)
$.N=c
s=r
try{r=d.$2(e,f)
return r}finally{$.N=s}},
dr(a,b,c,d){t.M.a(d)
if(B.j!==c){d=c.bZ(d)
d=d}A.kD(d)},
iw:function iw(a){this.a=a},
iv:function iv(a,b,c){this.a=a
this.b=b
this.c=c},
ix:function ix(a){this.a=a},
iy:function iy(a){this.a=a},
iS:function iS(){},
iT:function iT(a,b){this.a=a
this.b=b},
df:function df(a,b){this.a=a
this.b=!1
this.$ti=b},
iY:function iY(a){this.a=a},
iZ:function iZ(a){this.a=a},
j1:function j1(a){this.a=a},
aN:function aN(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aw:function aw(a,b){this.a=a
this.$ti=b},
aq:function aq(a,b){this.a=a
this.b=b},
h3:function h3(a,b,c){this.a=a
this.b=b
this.c=c},
be:function be(a,b,c,d,e){var _=this
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
iA:function iA(a,b){this.a=a
this.b=b},
iF:function iF(a,b){this.a=a
this.b=b},
iE:function iE(a,b){this.a=a
this.b=b},
iC:function iC(a,b){this.a=a
this.b=b},
iB:function iB(a,b){this.a=a
this.b=b},
iI:function iI(a,b,c){this.a=a
this.b=b
this.c=c},
iJ:function iJ(a,b){this.a=a
this.b=b},
iK:function iK(a){this.a=a},
iH:function iH(a,b){this.a=a
this.b=b},
iG:function iG(a,b){this.a=a
this.b=b},
dg:function dg(a){this.a=a
this.b=null},
dp:function dp(a){this.$ti=a},
ct:function ct(){},
dn:function dn(){},
iR:function iR(a,b){this.a=a
this.b=b},
j0:function j0(a,b){this.a=a
this.b=b},
jv(a,b){return new A.aG(a.h("@<0>").K(b).h("aG<1,2>"))},
Q(a,b,c){return b.h("@<0>").K(c).h("k6<1,2>").a(A.ng(a,new A.aG(b.h("@<0>").K(c).h("aG<1,2>"))))},
R(a,b){return new A.aG(a.h("@<0>").K(b).h("aG<1,2>"))},
lH(a){return new A.au(a.h("au<0>"))},
b9(a){return new A.au(a.h("au<0>"))},
lI(a,b){return b.h("k8<0>").a(A.nh(a,new A.au(b.h("au<0>"))))},
jC(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
iP(a,b,c){var s=new A.bh(a,b,c.h("bh<0>"))
s.c=a.e
return s},
aC(a,b){var s=J.G(a)
if(s.j())return s.gn()
return null},
ae(a,b,c){var s=A.jv(b,c)
a.a8(0,new A.ha(s,b,c))
return s},
k7(a,b,c){var s=A.jv(b,c)
s.F(0,a)
return s},
hd(a){var s,r
if(A.jP(a))return"{...}"
s=new A.by("")
try{r={}
B.a.m($.aj,a)
s.a+="{"
r.a=!0
a.a8(0,new A.he(r,s))
s.a+="}"}finally{if(0>=$.aj.length)return A.m($.aj,-1)
$.aj.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
au:function au(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dm:function dm(a){this.a=a
this.c=this.b=null},
bh:function bh(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
ha:function ha(a,b,c){this.a=a
this.b=b
this.c=c},
E:function E(){},
F:function F(){},
hc:function hc(a){this.a=a},
he:function he(a,b){this.a=a
this.b=b},
cs:function cs(){},
bu:function bu(){},
cd:function cd(){},
bx:function bx(){},
cm:function cm(){},
bD:function bD(){},
mU(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aQ(r)
q=A.k3(String(s))
throw A.j(q)}q=A.j_(p)
return q},
j_(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.dk(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.j_(a[s])
return a},
k5(a,b,c){return new A.bZ(a,b)},
mv(a){return a.I()},
m0(a,b){return new A.iM(a,[],A.nd())},
m1(a,b,c){var s,r=new A.by(""),q=A.m0(r,b)
q.b0(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
dk:function dk(a,b){this.a=a
this.b=b
this.c=null},
dl:function dl(a){this.a=a},
cH:function cH(){},
cK:function cK(){},
bZ:function bZ(a,b){this.a=a
this.b=b},
cW:function cW(a,b){this.a=a
this.b=b},
h6:function h6(){},
h8:function h8(a){this.b=a},
h7:function h7(a){this.a=a},
iN:function iN(){},
iO:function iO(a,b){this.a=a
this.b=b},
iM:function iM(a,b,c){this.c=a
this.a=b
this.b=c},
kL(a){var s=A.lO(a,null)
if(s!=null)return s
throw A.j(A.k3(a))},
lt(a,b){a=A.U(a,new Error())
if(a==null)a=A.cv(a)
a.stack=b.q(0)
throw a},
hb(a,b,c,d){var s,r=c?J.k4(a,d):J.lE(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
bt(a,b,c){var s,r=A.c([],c.h("u<0>"))
for(s=J.G(a);s.j();)B.a.m(r,c.a(s.gn()))
if(b)return r
r.$flags=1
return r},
o(a,b){var s,r
if(Array.isArray(a))return A.c(a.slice(0),b.h("u<0>"))
s=A.c([],b.h("u<0>"))
for(r=J.G(a);r.j();)B.a.m(s,r.gn())
return s},
aI(a,b){var s=A.bt(a,!1,b)
s.$flags=3
return s},
kd(a,b,c){var s=J.G(b)
if(!s.j())return a
if(c.length===0){do a+=A.w(s.gn())
while(s.j())}else{a+=A.w(s.gn())
while(s.j())a=a+c+A.w(s.gn())}return a},
lR(){return A.bI(new Error())},
ls(a,b,c){var s,r
for(s=0;s<4;++s){r=a[s]
if(r.b===b)return r}throw A.j(A.ev(b,"name","No enum value with that name"))},
cN(a){if(typeof a=="number"||A.jG(a)||a==null)return J.b1(a)
if(typeof a=="string")return JSON.stringify(a)
return A.ka(a)},
lu(a,b){A.X(a,"error",t.K)
A.X(b,"stackTrace",t.l)
A.lt(a,b)},
cE(a){return new A.cD(a)},
cC(a,b){return new A.aA(!1,null,b,a)},
ev(a,b,c){return new A.aA(!0,a,b,c)},
ba(a,b,c,d,e){return new A.c8(b,c,!0,a,d,"Invalid value")},
lP(a,b,c){if(0>a||a>c)throw A.j(A.ba(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.j(A.ba(b,a,c,"end",null))
return b}return c},
c9(a,b){if(a<0)throw A.j(A.ba(a,0,null,b,null))
return a},
jr(a,b,c,d){return new A.cP(b,!0,a,d,"Index out of range")},
bd(a){return new A.ce(a)},
kg(a){return new A.dd(a)},
kc(a){return new A.cc(a)},
a_(a){return new A.cI(a)},
k3(a){return new A.ag(a)},
lD(a,b,c){var s,r
if(A.jP(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.c([],t.s)
B.a.m($.aj,a)
try{A.mQ(a,s)}finally{if(0>=$.aj.length)return A.m($.aj,-1)
$.aj.pop()}r=A.kd(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
js(a,b,c){var s,r
if(A.jP(a))return b+"..."+c
s=new A.by(b)
B.a.m($.aj,a)
try{r=s
r.a=A.kd(r.a,a,", ")}finally{if(0>=$.aj.length)return A.m($.aj,-1)
$.aj.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
mQ(a,b){var s,r,q,p,o,n,m,l=a.gB(a),k=0,j=0
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
jx(a,b,c,d){var s
if(B.k===c){s=J.af(a)
b=J.af(b)
return A.ij(A.aJ(A.aJ($.du(),s),b))}if(B.k===d){s=J.af(a)
b=J.af(b)
c=J.af(c)
return A.ij(A.aJ(A.aJ(A.aJ($.du(),s),b),c))}s=J.af(a)
b=J.af(b)
c=J.af(c)
d=J.af(d)
d=A.ij(A.aJ(A.aJ(A.aJ(A.aJ($.du(),s),b),c),d))
return d},
lK(a){var s,r,q=$.du()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.v)(a),++r)q=A.aJ(q,J.af(a[r]))
return A.ij(q)},
cL:function cL(){},
dh:function dh(){},
C:function C(){},
cD:function cD(a){this.a=a},
aK:function aK(){},
aA:function aA(a,b,c,d){var _=this
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
cP:function cP(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
ce:function ce(a){this.a=a},
dd:function dd(a){this.a=a},
cc:function cc(a){this.a=a},
cI:function cI(a){this.a=a},
d5:function d5(){},
cb:function cb(){},
iz:function iz(a){this.a=a},
ag:function ag(a){this.a=a},
a:function a(){},
a9:function a9(a,b,c){this.a=a
this.b=b
this.$ti=c},
aa:function aa(){},
z:function z(){},
dq:function dq(){},
ii:function ii(){this.b=this.a=0},
by:function by(a){this.a=a},
jW(a,b,c,d){var s,r,q,p,o,n=t.N,m=t.S,l=a.gaj(),k=a.gaj(),j=a.gaj(),i=A.k7(a.gaj().x,m,m),h=A.R(m,m)
for(s=a.gM(),r=J.G(s.a),s=new A.V(r,s.b,s.$ti.h("V<1>"));s.j();){q=r.gn()
h.v(0,q.a,q.d)}s=A.R(n,t.J)
for(r=d.length,p=0;p<d.length;d.length===r||(0,A.v)(d),++p){o=d[p]
s.v(0,o.a,o)}return new A.b3(a,b,c,l.b,k.c,j.d,i,h,s,A.b9(n),A.b9(n),A.b9(n),A.b9(m),A.b9(m),A.b9(m),A.R(m,t.y))},
ew:function ew(a){this.a=a},
b3:function b3(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
dx:function dx(){},
dy:function dy(){},
dV:function dV(a){this.a=a},
dz:function dz(a,b){this.a=a
this.b=b},
dS:function dS(){},
e7:function e7(a,b){this.a=a
this.b=b},
e8:function e8(){},
e6:function e6(a){this.a=a},
e2:function e2(a){this.a=a},
e3:function e3(a){this.a=a},
e4:function e4(a){this.a=a},
e5:function e5(a){this.a=a},
e0:function e0(a){this.a=a},
e1:function e1(a){this.a=a},
dC:function dC(){},
dD:function dD(a){this.a=a},
dE:function dE(a,b){this.a=a
this.b=b},
dF:function dF(a,b,c){this.a=a
this.b=b
this.c=c},
dJ:function dJ(a,b){this.a=a
this.b=b},
dG:function dG(a){this.a=a},
dH:function dH(){},
dI:function dI(a,b){this.a=a
this.b=b},
dK:function dK(a){this.a=a},
dL:function dL(){},
dM:function dM(a){this.a=a},
dN:function dN(){},
dO:function dO(a){this.a=a},
dP:function dP(a){this.a=a},
dR:function dR(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dQ:function dQ(a){this.a=a},
dW:function dW(a){this.a=a},
dT:function dT(){},
dU:function dU(){},
dA:function dA(){},
dB:function dB(){},
dX:function dX(a){this.a=a},
dY:function dY(){},
dZ:function dZ(a){this.a=a},
e_:function e_(a){this.a=a},
aS(a,b,c,d){var s,r=b.f,q=A.i(r)
q=new A.d(r,q.h("e(1)").a(new A.eB(a)),q.h("d<1>")).gl(0)
r=b.gM()
if(!b.gM().gB(0).j())s=0
else{s=b.gaj().r
if(s==null){s=c.b.i(0,"countryIncome")
s.toString
s=B.b.k(s)}}return new A.eA(a,q,r.E(0,s,new A.eC(d,c),t.S),b,c)},
eA:function eA(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eB:function eB(a){this.a=a},
eC:function eC(a,b){this.a=a
this.b=b},
ak(a){var s=a.x,r=s>=15?500:0,q=a.e
if(q===2)q=1000
else q=q===1?30:0
return a.w*3+a.r*0.35+a.f*0.15+s*1.5-a.y*2+r+q},
ac(a,b){var s=b?a.x*0.75:0,r=a.e
if(r===1)r=30
else r=r===2?-200:0
return a.w*100+a.r*0.35+a.f*0.15-a.y*2-s+r},
nB(a){return t.r.a(a).x>=15},
kK(a,b){var s=a.gbl(),r=a.gN(),q=b.b.i(0,"soldierPower")
q.toString
return s*(a.w+r*B.b.k(q))+B.a.E(a.ax,0,new A.j9(b,a),t.H)},
dt(a,b,c,d){var s,r=b.b,q=r.i(0,"soldierHp")
q.toString
q=B.b.k(q)
s=b.bY(a.w,c,!1)
r=r.i(0,"soldierPower")
r.toString
return(a.f+d*q)*(s+d*B.b.k(r))*(1+b.dq(B.b.aI(a.ay))/1000)},
b5:function b5(a,b){this.a=a
this.b=b},
bK:function bK(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.r=d},
eD:function eD(a,b,c){this.a=a
this.b=b
this.c=c},
eE:function eE(){},
eF:function eF(){},
j9:function j9(a,b){this.a=a
this.b=b},
jY(c1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9=A.x(c1.i(0,"interval")),c0=A.S(c1.i(0,"resourceInterval"))
if(c0==null)c0=30
s=A.a2(c1.i(0,"cashBuffer"))
if(s==null)s=12
r=A.S(c1.i(0,"payrollRatio"))
if(r==null)r=0.5
q=A.a2(c1.i(0,"dangerousCountryCities"))
if(q==null)q=5
p=A.S(c1.i(0,"coalitionBudgetBase"))
if(p==null)p=0.5
o=A.S(c1.i(0,"coalitionBudgetStep"))
if(o==null)o=0.25
n=A.S(c1.i(0,"coalitionTargetBase"))
if(n==null)n=45
m=A.S(c1.i(0,"coalitionTargetStep"))
if(m==null)m=15
l=A.S(c1.i(0,"coalitionPayrollCeiling"))
if(l==null)l=0.8
k=A.S(c1.i(0,"coalitionTravel"))
if(k==null)k=45
j=A.S(c1.i(0,"targetTravelScale"))
if(j==null)j=25
i=A.S(c1.i(0,"hatredTargetBonus"))
if(i==null)i=90
h=A.S(c1.i(0,"breakthroughMargin"))
if(h==null)h=0.1
g=A.x(c1.i(0,"threat"))
f=A.x(c1.i(0,"urgent"))
e=A.x(c1.i(0,"margin"))
d=A.x(c1.i(0,"commit"))
c=A.a2(c1.i(0,"rearExtra"))
if(c==null)c=1
b=A.f(c1.i(0,"candidates"))
a=A.f(c1.i(0,"assessments"))
a0=A.f(c1.i(0,"routes"))
a1=A.f(c1.i(0,"plans"))
a2=A.f(c1.i(0,"commands"))
a3=A.f(c1.i(0,"team"))
a4=A.a2(c1.i(0,"fronts"))
if(a4==null)a4=2
a5=A.a2(c1.i(0,"singleFrontMonths"))
if(a5==null)a5=12
a6=A.S(c1.i(0,"splitForce"))
if(a6==null)a6=2.25
a7=A.S(c1.i(0,"splitAdvantage"))
if(a7==null)a7=0.3
a8=A.S(c1.i(0,"arrivalSpread"))
if(a8==null)a8=20
a9=A.S(c1.i(0,"expeditionSeconds"))
if(a9==null)a9=900
b0=A.S(c1.i(0,"assaultCommitDistance"))
if(b0==null)b0=64
b1=A.S(c1.i(0,"recallCriticalMargin"))
if(b1==null)b1=0.25
b2=A.a2(c1.i(0,"attritionCombat"))
if(b2==null)b2=8
b3=A.S(c1.i(0,"attritionGain"))
if(b3==null)b3=0.06
b4=A.f(c1.i(0,"targets"))
b5=A.f(c1.i(0,"slice"))
b6=A.x(c1.i(0,"advantage"))
b7=A.x(c1.i(0,"expansion"))
b8=A.x(c1.i(0,"credit"))
return new A.cB(b9,g,f,e,c0,s,r,q,p,o,n,m,l,k,j,i,h,d,A.x(c1.i(0,"age")),c,b,a,a0,a1,a2,a3,b4,b5,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b6,b8,b7,A.f(c1.i(0,"timeout")),A.f(c1.i(0,"restarts")),A.x(c1.i(0,"stagnation")))},
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
av:function av(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eG:function eG(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.r=_.f=_.e=$
_.w=null
_.x=e},
f3:function f3(){},
f4:function f4(a){this.a=a},
f5:function f5(){},
fg:function fg(){},
fl:function fl(){},
fm:function fm(){},
fn:function fn(a){this.a=a},
fo:function fo(a){this.a=a},
fp:function fp(a){this.a=a},
fq:function fq(a,b){this.a=a
this.b=b},
fr:function fr(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
f6:function f6(a){this.a=a},
f7:function f7(a,b,c){this.a=a
this.b=b
this.c=c},
f8:function f8(a){this.a=a},
f9:function f9(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fa:function fa(a,b,c){this.a=a
this.b=b
this.c=c},
fb:function fb(a){this.a=a},
fc:function fc(){},
fd:function fd(a){this.a=a},
fe:function fe(a){this.a=a},
ff:function ff(){},
fh:function fh(a,b){this.a=a
this.b=b},
fi:function fi(a){this.a=a},
fj:function fj(){},
fk:function fk(a){this.a=a},
eR:function eR(a,b){this.a=a
this.b=b},
eS:function eS(a){this.a=a},
eH:function eH(a){this.a=a},
eN:function eN(a){this.a=a},
eO:function eO(a,b,c){this.a=a
this.b=b
this.c=c},
eP:function eP(a,b,c){this.a=a
this.b=b
this.c=c},
eQ:function eQ(a){this.a=a},
eW:function eW(a){this.a=a},
eX:function eX(a,b){this.a=a
this.b=b},
eY:function eY(a){this.a=a},
eZ:function eZ(a,b){this.a=a
this.b=b},
f_:function f_(a){this.a=a},
f0:function f0(a){this.a=a},
f1:function f1(){},
f2:function f2(a){this.a=a},
eU:function eU(a){this.a=a},
eV:function eV(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eT:function eT(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eJ:function eJ(a,b,c){this.a=a
this.b=b
this.c=c},
eK:function eK(a){this.a=a},
eL:function eL(a){this.a=a},
eM:function eM(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eI:function eI(a){this.a=a},
ad:function ad(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fs:function fs(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
h0:function h0(a,b){this.a=a
this.b=b},
h1:function h1(a){this.a=a},
h_:function h_(a){this.a=a},
h2:function h2(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fY:function fY(){},
fX:function fX(){},
fZ:function fZ(){},
fW:function fW(){},
ft:function ft(){},
fu:function fu(){},
fv:function fv(){},
fD:function fD(){},
fE:function fE(a){this.a=a},
fF:function fF(){},
fG:function fG(){},
fH:function fH(a){this.a=a},
fI:function fI(){},
fJ:function fJ(a){this.a=a},
fK:function fK(a){this.a=a},
fw:function fw(){},
fx:function fx(a){this.a=a},
fL:function fL(a,b){this.a=a
this.b=b},
fy:function fy(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fz:function fz(a,b){this.a=a
this.b=b},
fA:function fA(){},
fB:function fB(a){this.a=a},
fC:function fC(a){this.a=a},
fT:function fT(a){this.a=a},
fU:function fU(a){this.a=a},
fV:function fV(){},
fM:function fM(){},
fP:function fP(a){this.a=a},
fQ:function fQ(){},
fR:function fR(a){this.a=a},
fS:function fS(a){this.a=a},
fN:function fN(){},
fO:function fO(){},
ej(a){var s,r=a.length
if(0>=r)return A.m(a,0)
s=A.x(a[0])
if(1>=r)return A.m(a,1)
return new A.t(s,A.x(a[1]))},
t:function t(a,b){this.a=a
this.b=b},
ei:function ei(a){this.a=a},
jV(c2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=A.J(c2.i(0,"id")),a9=A.f(c2.i(0,"c")),b0=A.f(c2.i(0,"home")),b1=A.f(c2.i(0,"o")),b2=A.f(c2.i(0,"t")),b3=A.x(c2.i(0,"hp")),b4=A.f(c2.i(0,"max")),b5=A.f(c2.i(0,"a")),b6=A.f(c2.i(0,"p")),b7=A.f(c2.i(0,"pay")),b8=t.j,b9=A.ej(b8.a(c2.i(0,"xy"))),c0=A.ej(b8.a(c2.i(0,"v"))),c1=A.f(c2.i(0,"s"))
if(!(c1>=0&&c1<8))return A.m(B.L,c1)
c1=B.L[c1]
s=A.c([],t.n)
for(r=b8.a(c2.i(0,"troops")),q=r.length,p=0;p<r.length;r.length===q||(0,A.v)(r),++p)s.push(A.x(r[p]))
r=t.R
q=t.S
o=A.bt(r.a(c2.i(0,"w")),!0,q)
n=A.x(c2.i(0,"m"))
m=c2.i(0,"to")==null?null:A.ej(b8.a(c2.i(0,"to")))
l=A.a2(c2.i(0,"target"))
k=A.x(c2.i(0,"return"))
j=A.ax(c2.i(0,"dispatch"))
i=A.ax(c2.i(0,"move"))
h=A.ax(c2.i(0,"dismiss"))
g=A.ax(c2.i(0,"upgrade"))
f=A.ax(c2.i(0,"retreat"))
e=A.ax(c2.i(0,"marked"))
d=A.J(c2.i(0,"rev"))
c=A.f(c2.i(0,"orderRev"))
b=A.bE(c2.i(0,"opponent"))
a=A.f(c2.i(0,"clashes"))
a0=A.x(c2.i(0,"received"))
a1=A.x(c2.i(0,"dealt"))
a2=A.ax(c2.i(0,"opening"))
a3=A.ax(c2.i(0,"weaponReady"))
a4=A.c([],t._)
for(r=J.G(r.a(c2.i(0,"returnPath")));r.j();){a5=b8.a(r.gn())
a6=a5.length
if(0>=a6)return A.m(a5,0)
a7=A.x(a5[0])
if(1>=a6)return A.m(a5,1)
a4.push(new A.t(a7,A.x(a5[1])))}b8=A.a2(c2.i(0,"regionCity"))
r=A.a2(c2.i(0,"salaryPaidMonth"))
if(r==null)r=-1
a5=A.cu(c2.i(0,"movementPending"))
return new A.p(a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b9,c0,c1,A.aI(s,t.i),A.aI(o,q),n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,b8,r,a5===!0)},
le(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=A.f(a3.i(0,"id")),c=A.f(a3.i(0,"c")),b=A.f(a3.i(0,"native")),a=A.f(a3.i(0,"level")),a0=t.j,a1=A.ej(a0.a(a3.i(0,"xy"))),a2=A.c([],t._)
for(s=a0.a(a3.i(0,"outline")),r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q){p=a0.a(s[q])
o=p.length
if(0>=o)return A.m(p,0)
n=A.x(p[0])
if(1>=o)return A.m(p,1)
a2.push(new A.t(n,A.x(p[1])))}a0=A.f(a3.i(0,"income"))
s=A.f(a3.i(0,"poor"))
r=A.f(a3.i(0,"cap"))
p=A.f(a3.i(0,"recruitCap"))
o=A.ax(a3.i(0,"recruit"))
n=A.cu(a3.i(0,"upgrade"))
m=A.J(a3.i(0,"rev"))
l=A.f(a3.i(0,"baseIncome"))
k=A.a2(a3.i(0,"initial"))
j=A.f(a3.i(0,"wins"))
i=A.bE(a3.i(0,"attacker"))
h=A.bE(a3.i(0,"defender"))
g=A.J(a3.i(0,"stage"))
f=A.x(a3.i(0,"next"))
e=A.cu(a3.i(0,"fallen"))
return new A.D(d,c,b,a,a1,new A.ei(a2),a0,s,r,p,l,o,n!==!1,m,k,j,i,h,g,f,e===!0,A.x(a3.i(0,"danger")))},
lf(a){var s,r,q,p,o,n=A.f(a.i(0,"id")),m=A.f(a.i(0,"gold")),l=A.f(a.i(0,"reserves")),k=A.f(a.i(0,"capacity")),j=A.f(a.i(0,"salary")),i=A.f(a.i(0,"poor")),h=A.a2(a.i(0,"baseIncome")),g=A.S(a.i(0,"garrisonAccrued"))
if(g==null)g=0
s=t.S
r=A.R(s,s)
for(q=t.f,p=q.a(a.i(0,"stock")).gah(),p=p.gB(p);p.j();){o=p.gn()
r.v(0,A.kL(A.J(o.a)),A.f(o.b))}p=A.R(s,s)
for(q=q.a(a.i(0,"hate")).gah(),q=q.gB(q);q.j();){o=q.gn()
p.v(0,A.kL(A.J(o.a)),A.f(o.b))}return new A.b2(n,m,l,k,j,i,h,g,A.cJ(r,s,s),A.cJ(p,s,s))},
lg(a){var s,r,q,p,o,n,m=A.f(a.i(0,"country")),l=A.f(a.i(0,"tick")),k=A.x(a.i(0,"month")),j=A.c([],t.Y)
for(s=t.R,r=J.G(s.a(a.i(0,"cities"))),q=t.f,p=t.N,o=t.z;r.j();)j.push(A.le(A.ae(q.a(r.gn()),p,o)))
r=A.c([],t.e)
for(n=J.G(s.a(a.i(0,"heroes")));n.j();)r.push(A.jV(A.ae(q.a(n.gn()),p,o)))
n=A.c([],t.eu)
for(s=J.G(s.a(a.i(0,"countries")));s.j();)n.push(A.lf(A.ae(q.a(s.gn()),p,o)))
s=A.f(a.i(0,"pool"))
q=A.f(a.i(0,"salary"))
p=A.a2(a.i(0,"year"))
if(p==null)p=1
o=A.a2(a.i(0,"monthIndex"))
if(o==null)o=0
return new A.ea(m,l,p,o,k,A.aI(j,t.q),A.aI(r,t.r),A.aI(n,t.t),s,q)},
am:function am(a,b){this.a=a
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
dw:function dw(){},
dv:function dv(){},
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
b2:function b2(a,b,c,d,e,f,g,h,i,j){var _=this
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
ea:function ea(a,b,c,d,e,f,g,h,i,j){var _=this
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
eg:function eg(a){this.a=a},
eh:function eh(a){this.a=a},
ed:function ed(a,b){this.a=a
this.b=b},
ec:function ec(a){this.a=a},
ee:function ee(){},
ef:function ef(a){this.a=a},
eb:function eb(a){this.a=a},
jK(a,b,c){var s,r,q=null,p=a.as
if(p===B.f||p===B.e||p===B.y)return q
s=c.y.i(0,a.a)
p=s==null
if((p?q:s.b)==="expedition")p=p?q:s.d
else p=a.CW
r=b.G(p)
return r!=null&&r.b!==a.b?r:q},
kF(a,b,c,d){var s,r,q=A.jK(a,b,c)
if(q==null)return!1
s=a.as
r=!0
if(s!==B.w)if(s!==B.x){s=a.z
s=q.f.X(s).H(s)<=d.w.p2}else s=r
else s=r
return s},
c7(a,b,c,d,e){var s=B.a.D(a.f,new A.hh(e,a))?e:null
s=new A.hg(a,b,c,s,d,A.R(t.S,t.bd))
s.ct(a,b,c,d,e)
return s},
hg:function hg(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hh:function hh(a,b){this.a=a
this.b=b},
hi:function hi(){},
hm:function hm(a){this.a=a},
ho:function ho(a){this.a=a},
hp:function hp(a){this.a=a},
hn:function hn(a,b){this.a=a
this.b=b},
hk:function hk(){},
hl:function hl(a,b){this.a=a
this.b=b},
hq:function hq(a){this.a=a},
hj:function hj(a){this.a=a},
d7:function d7(a,b){this.a=a
this.b=b},
hr:function hr(a,b,c){this.a=a
this.b=b
this.c=c},
hu:function hu(a,b){this.a=a
this.b=b},
hs:function hs(a,b,c){this.a=a
this.b=b
this.c=c},
ht:function ht(a){this.a=a},
hx:function hx(a){this.a=a},
hy:function hy(){},
hz:function hz(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hA:function hA(){},
hB:function hB(){},
hC:function hC(){},
hv:function hv(){},
hw:function hw(a){this.a=a},
lk(a){var s,r,q,p,o,n,m,l,k=A.J(a.i(0,"hero")),j=A.J(a.i(0,"role")),i=A.f(a.i(0,"deadline")),h=A.f(a.i(0,"commit")),g=A.a2(a.i(0,"city")),f=A.bE(a.i(0,"enemy")),e=A.c([],t._)
for(s=J.G(t.R.a(a.i(0,"points"))),r=t.j;s.j();){q=r.a(s.gn())
p=q.length
if(0>=p)return A.m(q,0)
o=A.x(q[0])
if(1>=p)return A.m(q,1)
e.push(new A.t(o,A.x(q[1])))}s=A.f(a.i(0,"leg"))
r=A.f(a.i(0,"gold"))
q=A.ax(a.i(0,"slot"))
p=A.cu(a.i(0,"rearStaging"))
o=A.J(a.i(0,"reason"))
n=A.f(a.i(0,"order"))
m=A.a2(a.i(0,"targetCountry"))
l=A.cu(a.i(0,"attrition"))
return new A.a5(k,j,o,g,m,l===!0,f,e,s,i,h,r,q,p===!0,n)},
lh(a){var s,r,q,p,o,n,m,l,k,j,i
if(!J.az(a.i(0,"protocol"),1))throw A.j(B.a9)
s=A.J(a.i(0,"session"))
r=A.f(a.i(0,"id"))
q=A.J(a.i(0,"rules"))
p=A.J(a.i(0,"map"))
o=t.f
n=t.N
m=t.z
l=A.lg(A.ae(o.a(a.i(0,"observation")),n,m))
k=A.f(a.i(0,"deadline"))
j=A.c([],t.m)
for(i=J.G(t.R.a(a.i(0,"tasks")));i.j();)j.push(A.lk(A.ae(o.a(i.gn()),n,m)))
o=A.f(a.i(0,"seed"))
n=A.f(a.i(0,"priority"))
m=A.f(a.i(0,"idle"))
i=A.bE(a.i(0,"stage"))
if(i==null)i="full"
return new A.el(s,q,p,r,k,o,n,m,A.ls(B.al,i,t.a9),A.a2(a.i(0,"offensiveCountry")),A.a2(a.i(0,"offensiveCity")),l,j)},
jX(a,b,c,d){var s=a.Q
return new A.ek(a.a,a.b,a.c,a.d,s.a,s.b,a.e,d,b,c)},
aE:function aE(a,b){this.a=a
this.b=b},
al:function al(a,b){this.a=a
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
br:function br(a,b,c,d,e,f,g,h,i,j){var _=this
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
el:function el(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
ek:function ek(a,b,c,d,e,f,g,h,i,j){var _=this
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
j2(b0,b1,b2,b3,b4,b5,b6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2="soldierLimit",a3="soldierPower",a4="soldierHp",a5={},a6=b2.u(b1.a),a7=A.i(a6).h("L<1>"),a8=A.Z(new A.L(a6,a7),0,A.X(b1.gZ(),"count",t.S),a7.h("k.E")).al(0),a9=A.aS(b1.b,b2,b3,null)
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
p=B.a.am(b2.w,new A.j3(b1)).c
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
e=b4.d8(b0,i,h,!1,g,j<b5.length?A.c([b5[j]],m):B.d,!0,f)
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
a6=new A.j4(a5,a8,b0,b3)
if(a8.length!==0&&J.jo(b5)&&a5.b<s.k4)return new A.aM([!1,a5.b,0,a5.a])
r=s.fy
if(a0>r)return a6.$0()
o=a8.length
m=o===0
if(!m)a7=o===1&&n<=2&&a7>=b0.r*0.8&&a5.b>s.ry||a5.b>s.RG+Math.max(0,o-1)*0.025-b6
else a7=!0
if(a7){a6=a5.b
a7=a5.a
return new A.aM([!1,a6,a9.ci(a6>=s.k4||m?a0:Math.max(2,a0),o),a7])}a1=o>1&&a5.a>s.RG&&a5.b>-0.08?Math.min(r,o):0
if(a1===0)return a6.$0()
a6=a5.b
a7=a5.a
return new A.aM([!1,a6,a9.ci(a1,o),a7])},
j3:function j3(a){this.a=a},
j4:function j4(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ny(a,b,c,d,e,f,g,h){var s
if(f<3||e)return!1
s=d*h+80+g
return c.aG(0,new A.jh(a,s))&&b.aG(0,new A.ji(a,s))},
jh:function jh(a,b){this.a=a
this.b=b},
ji:function ji(a,b){this.a=a
this.b=b},
hG:function hG(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hJ:function hJ(){},
hK:function hK(a){this.a=a},
hL:function hL(){},
hW:function hW(a,b,c){this.a=a
this.b=b
this.c=c},
i6:function i6(a,b,c){this.a=a
this.b=b
this.c=c},
hI:function hI(a,b){this.a=a
this.b=b},
hH:function hH(a,b,c){this.a=a
this.b=b
this.c=c},
i9:function i9(a,b){this.a=a
this.b=b},
ia:function ia(a,b){this.a=a
this.b=b},
ib:function ib(){},
ic:function ic(){},
ig:function ig(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
ie:function ie(a){this.a=a},
hM:function hM(){},
id:function id(a,b,c){this.a=a
this.b=b
this.c=c},
hN:function hN(a){this.a=a},
hO:function hO(a,b){this.a=a
this.b=b},
hP:function hP(){},
hQ:function hQ(){},
hR:function hR(){},
hS:function hS(){},
hT:function hT(a){this.a=a},
hU:function hU(){},
hV:function hV(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hX:function hX(a,b,c){this.a=a
this.b=b
this.c=c},
hY:function hY(a){this.a=a},
hZ:function hZ(){},
i_:function i_(a){this.a=a},
i0:function i0(){},
i1:function i1(){},
i2:function i2(a,b,c){this.a=a
this.b=b
this.c=c},
i3:function i3(a,b,c){this.a=a
this.b=b
this.c=c},
i4:function i4(a,b){this.a=a
this.b=b},
i5:function i5(a,b,c){this.a=a
this.b=b
this.c=c},
i7:function i7(){},
i8:function i8(){},
bp:function bp(a,b,c){this.a=a
this.b=b
this.d=c},
em:function em(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
en:function en(){},
eo:function eo(a,b,c){this.a=a
this.b=b
this.c=c},
ep:function ep(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eq:function eq(a,b,c){this.a=a
this.b=b
this.c=c},
er:function er(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
li(a,b,c,d,e,f,g,h){var s,r,q,p,o=A.cJ(f,t.N,t.H),n=t.S,m=A.aI(e,n),l=A.aI(a,n),k=t.i,j=A.aI(c,k)
k=A.aI(b,k)
s=t.z
s=A.R(s,s)
for(r=h.length,q=0;q<h.length;h.length===r||(0,A.v)(h),++q){p=h[q]
s.v(0,p.a,p)}return new A.es(g,o,m,l,j,k,A.cJ(s,n,t.o),d)},
lj(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g=A.J(a0.i(0,"version")),f=t.f,e=t.N,d=A.ae(f.a(a0.i(0,"values")),e,t.H),c=t.R,b=t.S,a=A.bt(c.a(a0.i(0,"upgrades")),!0,b)
b=A.bt(c.a(a0.i(0,"defenseBonuses")),!0,b)
s=t.n
r=A.c([],s)
for(q=J.G(c.a(a0.i(0,"movement")));q.j();)r.push(A.x(q.gn()))
s=A.c([],s)
for(q=J.G(c.a(a0.i(0,"field")));q.j();)s.push(A.x(q.gn()))
q=A.c([],t.k)
for(c=J.G(c.a(a0.i(0,"weapons"))),p=t.j;c.j();){o=p.a(c.gn())
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
h=A.ax(o[5])
if(6>=n)return A.m(o,6)
q.push(new A.ap(m,l,k,j,i,h,A.x(o[6])))}return A.li(b,s,r,A.jY(A.ae(f.a(a0.i(0,"tuning")),e,t.z)),a,d,g,q)},
ap:function ap(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
es:function es(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
e9:function e9(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eu:function eu(a,b,c){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=0
_.r=c},
bn(a,b,c,d,e,f){var s,r,q,p,o,n,m=a.a,l=c.u(m),k=A.i(l).h("L<1>"),j=A.Z(new A.L(l,k),0,A.X(a.gZ(),"count",t.S),k.h("k.E")).al(0)
if(j.length===0)s=0
else{l=A.i(j)
s=new A.a0(j,l.h("h(1)").a(new A.jj()),l.h("a0<1,h>")).ak(0,B.A)}l=c.r
k=A.i(l)
r=new A.d(l,k.h("e(1)").a(new A.jk(a)),k.h("d<1>")).E(0,0,new A.jl(),t.i)
k=a.b
l=c.gaj().y.i(0,k)
l=B.c.A(l==null?0:l,0,100)
k=A.aS(k,c,d,null)
if(k.ga3()){q=k.e.w
p=q.z+k.gbb()*q.Q}else p=0
o=e^m*7919
o^=o<<13
o^=o>>>17
if(f==null){m=b.z.H(a.e)
k=d.b.i(0,"marchSpeed")
k.toString
q=d.e
if(0>=q.length)return A.m(q,0)
n=m/(k*q[0])}else n=f
if(a.c===b.b)m=1
else{m=d.b.i(0,"foreignYield")
m.toString}k=d.w
return Math.max(1,160+a.z*m*2+r+p+l/100*k.ay-s*0.25-a.d*6)/Math.pow(1+n/k.ax,1.5)+((o^o<<5)&65535)/65536*0.000001},
jj:function jj(){},
jk:function jk(a){this.a=a},
jl:function jl(){},
a4:function a4(a,b,c){this.a=a
this.b=b
this.c=c},
ar:function ar(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.d=c
_.f=d
_.r=e
_.w=f},
ey:function ey(){},
ez:function ez(){},
ex:function ex(){},
ik:function ik(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
il:function il(a){this.a=a},
im:function im(){},
io:function io(a){this.a=a},
ip:function ip(a){this.a=a},
iq:function iq(a){this.a=a},
ir:function ir(a){this.a=a},
is:function is(){},
et:function et(a){var _=this
_.a=a
_.d=_.c=_.b=0
_.e=!1},
nt(){var s,r,q=new A.je(),p=v.G,o="web-worker:"+A.J(p.self.constructor.name)
p=A.iX(p.self)
s=new A.jf(new A.eu(q,o,A.b9(t.S)))
if(typeof s=="function")A.b0(A.cC("Attempting to rewrap a JS function.",null))
r=function(a,b){return function(c){return a(b,c,arguments.length)}}(A.mu,s)
r[$.jR()]=s
p.onmessage=r
q.$1(B.i.au(t.G.a(A.Q(["kind","hello","protocol",1,"build","39a6eab2","backend",o],t.N,t.X)),null))},
je:function je(){},
jf:function jf(a){this.a=a},
kT(a){return v.mangledGlobalNames[a]},
nz(a){throw A.U(new A.c_("Field '"+a+"' has been assigned during initialization."),new Error())},
O(){throw A.U(A.lG(""),new Error())},
mu(a,b,c){t.h.a(a)
if(A.f(c)>=1)return a.$1(b)
return a.$0()},
kO(a,b,c){A.kH(c,t.H,"T","min")
return Math.min(c.a(a),c.a(b))},
kN(a,b,c){A.kH(c,t.H,"T","max")
return Math.max(c.a(a),c.a(b))},
lz(a){var s,r,q,p,o,n,m,l,k,j,i,h,g="nationalAi",f="maxCityLevel",e="initialMonth",d=A.cO($.jm())
for(s=new A.aH(a,A.l(a).h("aH<1,2>")).gB(0),r=t.f,q=t.N,p=t.X;s.j();){o=s.d
n=o.a
m=n==="nationalAi"&&r.b(o.b)
l=o.b
if(m){m=A.cO(r.a($.jm().i(0,g)))
k=A.jv(q,p)
k.F(0,m)
k.F(0,A.cO(r.a(l)))
d.v(0,n,k)}else d.v(0,n,A.jq(l))}j=d.i(0,"cityUpgradeCosts")
i=d.i(0,"cityDefenseAttackBonuses")
h=d.i(0,"cityDefenseMoraleBonuses")
s=t.j
if(!s.b(j)||j.length!==4||!s.b(i)||i.length!==5||!s.b(h)||h.length!==5)A.b0(B.a7)
if(A.f(d.i(0,f))!==i.length||A.f(d.i(0,f))!==h.length)A.b0(B.a8)
if(A.f(d.i(0,e))<1||A.f(d.i(0,e))>12||A.x(d.i(0,"secondsPerMonth"))<=0||A.f(d.i(0,f))<1)A.b0(B.aa)
s=A.cJ(d,q,p)
$.ly=s
A.jY(A.ae(A.ae(r.a(s.i(0,g)),q,p),q,t.z))},
cO(a){var s,r,q=A.R(t.N,t.X)
for(s=a.gah(),s=s.gB(s);s.j();){r=s.gn()
q.v(0,J.b1(r.a),A.jq(r.b))}return q},
jq(a){var s,r
A:{if(t.f.b(a)){s=A.cO(a)
break A}if(t.j.b(a)){s=[]
for(r=J.G(a);r.j();)s.push(A.jq(r.gn()))
break A}s=a
break A}return s},
nl(a,b,c,d,e,f,g,h){var s,r,q,p,o,n,m,l=null,k=f.H(a),j=!c
if(j&&k>d*b+80)return l
s=h.a
r=h.b
q=Math.sqrt(s*s+r*r)
p=q<0.01?0:((a.a-f.a)*s+(a.b-f.b)*r)/(Math.max(1,k)*q)
if(j&&k>72){if(p<0.45)return l
o=Math.max(0,k*p)
n=new A.t(f.a+s/q*o,f.b+r/q*o)
if(e.X(n).H(n)>48)return l}m=g.$2(f,e.bU(f,a))
if(isFinite(m))j=!j||m<=b
else j=!1
return j?m:l},
jw(a,b,c){var s=Math.max(0,a-c)
return s*s*b}},B={}
var w=[A,J,B]
var $={}
A.jt.prototype={}
J.cR.prototype={
ab(a,b){return a===b},
gR(a){return A.d8(a)},
q(a){return"Instance of '"+A.d9(a)+"'"},
gS(a){return A.aO(A.jF(this))}}
J.cT.prototype={
q(a){return String(a)},
gR(a){return a?519018:218159},
gS(a){return A.aO(t.y)},
$iB:1,
$ie:1}
J.bV.prototype={
ab(a,b){return null==b},
q(a){return"null"},
gR(a){return 0},
$iB:1}
J.bX.prototype={$iM:1}
J.aV.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.d6.prototype={}
J.bz.prototype={}
J.aU.prototype={
q(a){var s=a[$.kV()]
if(s==null)s=a[$.jR()]
if(s==null)return this.cs(a)
return"JavaScript function for "+J.b1(s)},
$iaF:1}
J.bW.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.bY.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.u.prototype={
m(a,b){A.i(a).c.a(b)
a.$flags&1&&A.cA(a,29)
a.push(b)},
an(a,b){var s
a.$flags&1&&A.cA(a,"remove",1)
for(s=0;s<a.length;++s)if(J.az(a[s],b)){a.splice(s,1)
return!0}return!1},
F(a,b){var s
A.i(a).h("a<1>").a(b)
a.$flags&1&&A.cA(a,"addAll",2)
if(Array.isArray(b)){this.cA(a,b)
return}for(s=J.G(b);s.j();)a.push(s.gn())},
cA(a,b){var s,r
t.gn.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.j(A.a_(a))
for(r=0;r<s;++r)a.push(b[r])},
aF(a){a.$flags&1&&A.cA(a,"clear","clear")
a.length=0},
dm(a,b){var s,r=A.hb(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.v(r,s,A.w(a[s]))
return r.join(b)},
cg(a,b){return A.Z(a,0,A.X(b,"count",t.S),A.i(a).c)},
b2(a,b){return A.Z(a,b,null,A.i(a).c)},
ak(a,b){var s,r,q
A.i(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.j(A.aB())
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
if(a.length!==s)throw A.j(A.a_(a))}throw A.j(A.aB())},
T(a,b){if(!(b>=0&&b<a.length))return A.m(a,b)
return a[b]},
gJ(a){if(a.length>0)return a[0]
throw A.j(A.aB())},
gaA(a){var s=a.length
if(s>0)return a[s-1]
throw A.j(A.aB())},
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
C(a,b){var s,r,q,p,o,n=A.i(a)
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
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.ds(b,2))
if(p>0)this.cS(a,p)},
cS(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
p(a,b){var s
for(s=0;s<a.length;++s)if(J.az(a[s],b))return!0
return!1},
ga4(a){return a.length===0},
gaz(a){return a.length!==0},
q(a){return A.js(a,"[","]")},
gB(a){return new J.b4(a,a.length,A.i(a).h("b4<1>"))},
gR(a){return A.d8(a)},
gl(a){return a.length},
v(a,b,c){A.i(a).c.a(c)
a.$flags&2&&A.cA(a)
if(!(b>=0&&b<a.length))throw A.j(A.kI(a,b))
a[b]=c},
$in:1,
$ia:1,
$iq:1}
J.cS.prototype={
dG(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.d9(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.h4.prototype={}
J.b4.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.v(q)
throw A.j(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iH:1}
J.bs.prototype={
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
return s+0}throw A.j(A.bd(""+a+".toInt()"))},
aw(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.j(A.bd(""+a+".ceil()"))},
W(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.j(A.bd(""+a+".floor()"))},
aI(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.j(A.bd(""+a+".round()"))},
A(a,b,c){if(B.c.t(b,c)>0)throw A.j(A.n7(b))
if(this.t(a,b)<0)return b
if(this.t(a,c)>0)return c
return a},
aZ(a,b){var s
if(b>20)throw A.j(A.ba(b,0,20,"fractionDigits",null))
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
throw A.j(A.bd("Result of truncating division is "+A.w(s)+": "+A.w(a)+" ~/ "+A.w(b)))},
bL(a,b){var s
if(a>0)s=this.cW(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cW(a,b){return b>31?0:a>>>b},
gS(a){return A.aO(t.H)},
$ih:1,
$ia3:1}
J.bU.prototype={
gS(a){return A.aO(t.S)},
$iB:1,
$ib:1}
J.cU.prototype={
gS(a){return A.aO(t.i)},
$iB:1}
J.b7.prototype={
aO(a,b,c){return a.substring(b,A.lP(b,c,a.length))},
bs(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.j(B.a2)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
dr(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bs(c,s)+a},
t(a,b){var s
A.J(b)
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
gS(a){return A.aO(t.N)},
gl(a){return a.length},
$iB:1,
$iI:1}
A.c_.prototype={
q(a){return"LateInitializationError: "+this.a}}
A.ih.prototype={}
A.n.prototype={}
A.k.prototype={
gB(a){var s=this
return new A.r(s,s.gl(s),A.l(s).h("r<k.E>"))},
ga4(a){return this.gl(this)===0},
D(a,b){var s,r,q=this
A.l(q).h("e(k.E)").a(b)
s=q.gl(q)
for(r=0;r<s;++r){if(b.$1(q.T(0,r)))return!0
if(s!==q.gl(q))throw A.j(A.a_(q))}return!1},
c9(a,b,c){var s=A.l(this)
return new A.a0(this,s.K(c).h("1(k.E)").a(b),s.h("@<k.E>").K(c).h("a0<1,2>"))},
ak(a,b){var s,r,q,p=this
A.l(p).h("k.E(k.E,k.E)").a(b)
s=p.gl(p)
if(s===0)throw A.j(A.aB())
r=p.T(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.T(0,q))
if(s!==p.gl(p))throw A.j(A.a_(p))}return r},
E(a,b,c,d){var s,r,q,p=this
d.a(b)
A.l(p).K(d).h("1(1,k.E)").a(c)
s=p.gl(p)
for(r=b,q=0;q<s;++q){r=c.$2(r,p.T(0,q))
if(s!==p.gl(p))throw A.j(A.a_(p))}return r},
dF(a){var s,r=this,q=A.lH(A.l(r).h("k.E"))
for(s=0;s<r.gl(r);++s)q.m(0,r.T(0,s))
return q}}
A.y.prototype={
U(a,b,c,d){var s,r=this.b
A.c9(r,"start")
s=this.c
if(s!=null){A.c9(s,"end")
if(r>s)throw A.j(A.ba(r,0,s,"start",null))}},
gcJ(){var s=J.bo(this.a),r=this.c
if(r==null||r>s)return s
return r},
gcZ(){var s=J.bo(this.a),r=this.b
if(r>s)return s
return r},
gl(a){var s,r=J.bo(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
T(a,b){var s=this,r=s.gcZ()+b
if(b<0||r>=s.gcJ())throw A.j(A.jr(b,s.gl(0),s,"index"))
return J.jn(s.a,r)},
al(a){var s,r,q,p=this,o=p.b,n=p.a,m=J.cz(n),l=m.gl(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.k4(0,p.$ti.c)
return n}r=A.hb(s,m.T(n,o),!0,p.$ti.c)
for(q=1;q<s;++q){B.a.v(r,q,m.T(n,o+q))
if(m.gl(n)<l)throw A.j(A.a_(p))}return r}}
A.r.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=J.cz(q),o=p.gl(q)
if(r.b!==o)throw A.j(A.a_(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.T(q,s);++r.c
return!0},
$iH:1}
A.as.prototype={
gB(a){return new A.c1(J.G(this.a),this.b,A.l(this).h("c1<1,2>"))},
gl(a){return J.bo(this.a)}}
A.bO.prototype={$in:1}
A.c1.prototype={
j(){var s=this,r=s.b
if(r.j()){s.a=s.c.$1(r.gn())
return!0}s.a=null
return!1},
gn(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iH:1}
A.a0.prototype={
gl(a){return J.bo(this.a)},
T(a,b){return this.b.$1(J.jn(this.a,b))}}
A.d.prototype={
gB(a){return new A.V(J.G(this.a),this.b,this.$ti.h("V<1>"))}}
A.V.prototype={
j(){var s,r
for(s=this.a,r=this.b;s.j();)if(r.$1(s.gn()))return!0
return!1},
gn(){return this.a.gn()},
$iH:1}
A.bS.prototype={
gB(a){return new A.bT(J.G(this.a),this.b,B.W,this.$ti.h("bT<1,2>"))}}
A.bT.prototype={
gn(){var s=this.d
return s==null?this.$ti.y[1].a(s):s},
j(){var s,r,q=this,p=q.c
if(p==null)return!1
for(s=q.a,r=q.b;!p.j();){q.d=null
if(s.j()){q.c=null
p=J.G(r.$1(s.gn()))
q.c=p}else return!1}q.d=q.c.gn()
return!0},
$iH:1}
A.bb.prototype={
gB(a){var s=this.a
return new A.bc(s.gB(s),this.b,A.l(this).h("bc<1>"))}}
A.bP.prototype={
gl(a){var s=this.a,r=s.gl(s)
s=this.b
if(r>s)return s
return r},
$in:1}
A.bc.prototype={
j(){if(--this.b>=0)return this.a.j()
this.b=-1
return!1},
gn(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gn()},
$iH:1}
A.bQ.prototype={
j(){return!1},
gn(){throw A.j(A.aB())},
$iH:1}
A.cf.prototype={
gB(a){return new A.cg(J.G(this.a),this.$ti.h("cg<1>"))}}
A.cg.prototype={
j(){var s,r
for(s=this.a,r=this.$ti.c;s.j();)if(r.b(s.gn()))return!0
return!1},
gn(){return this.$ti.c.a(this.a.gn())},
$iH:1}
A.K.prototype={
sl(a,b){throw A.j(A.bd("Cannot change the length of a fixed-length list"))},
m(a,b){A.aP(a).h("K.E").a(b)
throw A.j(A.bd("Cannot add to a fixed-length list"))}}
A.L.prototype={
gl(a){return this.a.length},
T(a,b){var s=this.a
return J.jn(s,s.length-1-b)}}
A.bk.prototype={$r:"+(1,2)",$s:1}
A.aM.prototype={$r:"+breakthrough,lower,teamSize,upper(1,2,3,4)",$s:2}
A.bB.prototype={$r:"+high,low,selfHigh,selfLow(1,2,3,4)",$s:3}
A.bM.prototype={}
A.bL.prototype={
ga4(a){return this.gl(this)===0},
gaz(a){return this.gl(this)!==0},
q(a){return A.hd(this)},
gah(){return new A.aw(this.dh(),A.l(this).h("aw<a9<1,2>>"))},
dh(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gah(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.ga9(),o=o.gB(o),n=A.l(s),m=n.y[1],n=n.h("a9<1,2>")
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
A.bN.prototype={
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
ga9(){return new A.bg(this.gbE(),this.$ti.h("bg<1>"))},
gb_(){return new A.bg(this.b,this.$ti.h("bg<2>"))}}
A.bg.prototype={
gl(a){return this.a.length},
gB(a){var s=this.a
return new A.ch(s,s.length,this.$ti.h("ch<1>"))}}
A.ch.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iH:1}
A.cQ.prototype={
ab(a,b){if(b==null)return!1
return b instanceof A.b6&&this.a.ab(0,b.a)&&A.jN(this)===A.jN(b)},
gR(a){return A.jx(this.a,A.jN(this),B.k,B.k)},
q(a){var s=B.a.dm([A.aO(this.$ti.c)],", ")
return this.a.q(0)+" with "+("<"+s+">")}}
A.b6.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.nq(A.j6(this.a),this.$ti)}}
A.hD.prototype={
$0(){return B.b.W(1000*this.a.now())},
$S:5}
A.ca.prototype={}
A.it.prototype={
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
A.c6.prototype={
q(a){return"Null check operator used on a null value"}}
A.cV.prototype={
q(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.de.prototype={
q(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hf.prototype={
q(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.bR.prototype={}
A.cn.prototype={
q(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iaW:1}
A.a6.prototype={
q(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.kU(r==null?"unknown":r)+"'"},
$iaF:1,
gdL(){return this},
$C:"$1",
$R:1,
$D:null}
A.cF.prototype={$C:"$0",$R:0}
A.cG.prototype={$C:"$2",$R:2}
A.dc.prototype={}
A.db.prototype={
q(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.kU(s)+"'"}}
A.bq.prototype={
ab(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bq))return!1
return this.$_target===b.$_target&&this.a===b.a},
gR(a){return(A.kP(this.a)^A.d8(this.$_target))>>>0},
q(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.d9(this.a)+"'")}}
A.da.prototype={
q(a){return"RuntimeError: "+this.a}}
A.aG.prototype={
gl(a){return this.a},
ga4(a){return this.a===0},
ga9(){return new A.a7(this,A.l(this).h("a7<1>"))},
gah(){return new A.aH(this,A.l(this).h("aH<1,2>"))},
a_(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dj(a)},
dj(a){var s=this.d
if(s==null)return!1
return this.bm(this.bD(s,a),a)>=0},
F(a,b){A.l(this).h("a8<1,2>").a(b).a8(0,new A.h5(this))},
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
bg(a,b){var s=this,r=A.l(s),q=new A.h9(r.c.a(a),r.y[1].a(b))
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
c8(a){return J.af(a)&1073741823},
bD(a,b){return a[this.c8(b)]},
bm(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.az(a[r].a,b))return r
return-1},
q(a){return A.hd(this)},
bf(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ik6:1}
A.h5.prototype={
$2(a,b){var s=this.a,r=A.l(s)
s.v(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.l(this.a).h("~(1,2)")}}
A.h9.prototype={}
A.a7.prototype={
gl(a){return this.a.a},
ga4(a){return this.a.a===0},
gB(a){var s=this.a
return new A.b8(s,s.r,s.e,this.$ti.h("b8<1>"))},
p(a,b){return this.a.a_(b)}}
A.b8.prototype={
gn(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.a_(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iH:1}
A.Y.prototype={
gl(a){return this.a.a},
gB(a){var s=this.a
return new A.ai(s,s.r,s.e,this.$ti.h("ai<1>"))}}
A.ai.prototype={
gn(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.a_(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iH:1}
A.aH.prototype={
gl(a){return this.a.a},
gB(a){var s=this.a
return new A.c0(s,s.r,s.e,this.$ti.h("c0<1,2>"))}}
A.c0.prototype={
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
$iH:1}
A.ja.prototype={
$1(a){return this.a(a)},
$S:22}
A.jb.prototype={
$2(a,b){return this.a(a,b)},
$S:44}
A.jc.prototype={
$1(a){return this.a(A.J(a))},
$S:33}
A.aD.prototype={
q(a){return this.bP(!1)},
bP(a){var s,r,q,p,o,n=this.cK(),m=this.bd(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.m(m,q)
o=m[q]
l=a?l+A.ka(o):l+A.w(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
cK(){var s,r=this.$s
while($.iQ.length<=r)B.a.m($.iQ,null)
s=$.iQ[r]
if(s==null){s=this.cG()
B.a.v($.iQ,r,s)}return s},
cG(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.c(new Array(l),t.Q)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.v(k,q,r[s])}}return A.aI(k,t.K)}}
A.bA.prototype={
bd(){return[this.a,this.b]},
ab(a,b){if(b==null)return!1
return b instanceof A.bA&&this.$s===b.$s&&J.az(this.a,b.a)&&J.az(this.b,b.b)},
gR(a){return A.jx(this.$s,this.a,this.b,B.k)}}
A.bj.prototype={
bd(){return this.a},
ab(a,b){if(b==null)return!1
return b instanceof A.bj&&this.$s===b.$s&&A.ma(this.a,b.a)},
gR(a){return A.jx(this.$s,A.lK(this.a),B.k,B.k)}}
A.bv.prototype={
gS(a){return B.am},
$iB:1}
A.c4.prototype={}
A.cX.prototype={
gS(a){return B.an},
$iB:1}
A.bw.prototype={
gl(a){return a.length},
$iah:1}
A.c2.prototype={$in:1,$ia:1,$iq:1}
A.c3.prototype={$in:1,$ia:1,$iq:1}
A.cY.prototype={
gS(a){return B.ao},
$iB:1}
A.cZ.prototype={
gS(a){return B.ap},
$iB:1}
A.d_.prototype={
gS(a){return B.aq},
$iB:1}
A.d0.prototype={
gS(a){return B.ar},
$iB:1}
A.d1.prototype={
gS(a){return B.as},
$iB:1}
A.d2.prototype={
gS(a){return B.au},
$iB:1}
A.d3.prototype={
gS(a){return B.av},
$iB:1}
A.c5.prototype={
gS(a){return B.aw},
gl(a){return a.length},
$iB:1}
A.d4.prototype={
gS(a){return B.ax},
gl(a){return a.length},
$iB:1,
$ijB:1}
A.ci.prototype={}
A.cj.prototype={}
A.ck.prototype={}
A.cl.prototype={}
A.at.prototype={
h(a){return A.cr(v.typeUniverse,this,a)},
K(a){return A.ks(v.typeUniverse,this,a)}}
A.dj.prototype={}
A.iU.prototype={
q(a){return A.ab(this.a,null)}}
A.di.prototype={
q(a){return this.a}}
A.bC.prototype={$iaK:1}
A.iw.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:32}
A.iv.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:52}
A.ix.prototype={
$0(){this.a.$0()},
$S:21}
A.iy.prototype={
$0(){this.a.$0()},
$S:21}
A.iS.prototype={
cu(a,b){if(self.setTimeout!=null)self.setTimeout(A.ds(new A.iT(this,b),0),a)
else throw A.j(A.bd("`setTimeout()` not found."))}}
A.iT.prototype={
$0(){this.b.$0()},
$S:3}
A.df.prototype={}
A.iY.prototype={
$1(a){return this.a.$2(0,a)},
$S:61}
A.iZ.prototype={
$2(a,b){this.a.$2(1,new A.bR(a,t.l.a(b)))},
$S:53}
A.j1.prototype={
$2(a,b){this.a(A.f(a),b)},
$S:46}
A.aN.prototype={
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
if(p==null||p.length===0){o.a=A.km
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
o.a=A.km
throw n
return!1}if(0>=p.length)return A.m(p,-1)
o.a=p.pop()
m=1
continue}throw A.j(A.kc("sync*"))}return!1},
bS(a){var s,r,q=this
if(a instanceof A.aw){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.m(r,q.a)
q.a=s
return 2}else{q.d=J.G(a)
return 2}},
$iH:1}
A.aw.prototype={
gB(a){return new A.aN(this.a(),this.$ti.h("aN<1>"))}}
A.aq.prototype={
q(a){return A.w(this.a)},
$iC:1,
gaN(){return this.b}}
A.h3.prototype={
$0(){this.c.a(null)
this.b.cE(null)},
$S:3}
A.be.prototype={
dn(a){if((this.c&15)!==6)return!0
return this.b.b.br(t.al.a(this.d),a.a,t.y,t.K)},
di(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.dC(q,m,a.b,o,n,t.l)
else p=l.br(t.D.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.aQ(s))){if((r.c&1)!==0)throw A.j(A.cC("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.j(A.cC("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.W.prototype={
cj(a,b,c){var s,r,q=this.$ti
q.K(c).h("1/(2)").a(a)
s=$.N
if(s===B.j){if(!t.C.b(b)&&!t.D.b(b))throw A.j(A.ev(b,"onError",u.c))}else{c.h("@<0/>").K(q.c).h("1(2)").a(a)
b=A.mW(b,s)}r=new A.W(s,c.h("W<0>"))
this.b3(new A.be(r,3,a,b,q.h("@<1>").K(c).h("be<1,2>")))
return r},
bO(a,b,c){var s,r=this.$ti
r.K(c).h("1/(2)").a(a)
s=new A.W($.N,c.h("W<0>"))
this.b3(new A.be(s,19,a,b,r.h("@<1>").K(c).h("be<1,2>")))
return s},
cV(a){this.a=this.a&1|16
this.c=a},
aQ(a){this.a=a.a&30|this.a&1
this.c=a.c},
b3(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.b3(a)
return}r.aQ(s)}A.dr(null,null,r.b,t.M.a(new A.iA(r,a)))}},
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
A.dr(null,null,m.b,t.M.a(new A.iF(l,m)))}},
aC(){var s=t.F.a(this.c)
this.c=null
return this.aS(s)},
aS(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
cE(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("aT<1>").b(a))A.iD(a,r,!0)
else{s=r.aC()
q.c.a(a)
r.a=8
r.c=a
A.bf(r,s)}},
bC(a){var s,r=this
r.$ti.c.a(a)
s=r.aC()
r.a=8
r.c=a
A.bf(r,s)},
cF(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aC()
q.aQ(a)
A.bf(q,r)},
b7(a){var s=this.aC()
this.cV(a)
A.bf(this,s)},
cC(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("aT<1>").b(a)){this.bA(a)
return}this.cD(a)},
cD(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dr(null,null,s.b,t.M.a(new A.iC(s,a)))},
bA(a){A.iD(this.$ti.h("aT<1>").a(a),this,!1)
return},
bz(a){this.a^=2
A.dr(null,null,this.b,t.M.a(new A.iB(this,a)))},
$iaT:1}
A.iA.prototype={
$0(){A.bf(this.a,this.b)},
$S:3}
A.iF.prototype={
$0(){A.bf(this.b,this.a.a)},
$S:3}
A.iE.prototype={
$0(){A.iD(this.a.a,this.b,!0)},
$S:3}
A.iC.prototype={
$0(){this.a.bC(this.b)},
$S:3}
A.iB.prototype={
$0(){this.a.b7(this.b)},
$S:3}
A.iI.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dB(t.fO.a(q.d),t.z)}catch(p){s=A.aQ(p)
r=A.bI(p)
if(k.c&&t.u.a(k.b.a.c).a===s){q=k.a
q.c=t.u.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.jp(q)
n=k.a
n.c=new A.aq(q,o)
q=n}q.b=!0
return}if(j instanceof A.W&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.u.a(j.c)
q.b=!0}return}if(j instanceof A.W){m=k.b.a
l=new A.W(m.b,m.$ti)
j.cj(new A.iJ(l,m),new A.iK(l),t.p)
q=k.a
q.c=l
q.b=!1}},
$S:3}
A.iJ.prototype={
$1(a){this.a.cF(this.b)},
$S:32}
A.iK.prototype={
$2(a,b){A.cv(a)
t.l.a(b)
this.a.b7(new A.aq(a,b))},
$S:34}
A.iH.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.br(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aQ(l)
r=A.bI(l)
q=s
p=r
if(p==null)p=A.jp(q)
o=this.a
o.c=new A.aq(q,p)
o.b=!0}},
$S:3}
A.iG.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.u.a(l.a.a.c)
p=l.b
if(p.a.dn(s)&&p.a.e!=null){p.c=p.a.di(s)
p.b=!1}}catch(o){r=A.aQ(o)
q=A.bI(o)
p=t.u.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.jp(p)
m=l.b
m.c=new A.aq(p,n)
p=m}p.b=!0}},
$S:3}
A.dg.prototype={}
A.dp.prototype={}
A.ct.prototype={$ikh:1}
A.dn.prototype={
dD(a){var s,r,q
t.M.a(a)
try{if(B.j===$.N){a.$0()
return}A.kB(null,null,this,a,t.p)}catch(q){s=A.aQ(q)
r=A.bI(q)
A.jI(A.cv(s),t.l.a(r))}},
bZ(a){return new A.iR(this,t.M.a(a))},
dB(a,b){b.h("0()").a(a)
if($.N===B.j)return a.$0()
return A.kB(null,null,this,a,b)},
br(a,b,c,d){c.h("@<0>").K(d).h("1(2)").a(a)
d.a(b)
if($.N===B.j)return a.$1(b)
return A.mY(null,null,this,a,b,c,d)},
dC(a,b,c,d,e,f){d.h("@<0>").K(e).K(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.N===B.j)return a.$2(b,c)
return A.mX(null,null,this,a,b,c,d,e,f)},
cf(a,b,c,d){return b.h("@<0>").K(c).K(d).h("1(2,3)").a(a)}}
A.iR.prototype={
$0(){return this.a.dD(this.b)},
$S:3}
A.j0.prototype={
$0(){A.lu(this.a,this.b)},
$S:3}
A.au.prototype={
cN(){return new A.au(A.l(this).h("au<1>"))},
gB(a){var s=this,r=new A.bh(s,s.r,A.l(s).h("bh<1>"))
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
return q.bB(s==null?q.b=A.jC():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bB(r==null?q.c=A.jC():r,b)}else return q.cz(b)},
cz(a){var s,r,q,p=this
A.l(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jC()
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
b6(a){var s,r=this,q=new A.dm(A.l(r).c.a(a))
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
b8(a){return J.af(a)&1073741823},
bc(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.az(a[r].a,b))return r
return-1},
$ik8:1}
A.dm.prototype={}
A.bh.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.j(A.a_(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iH:1}
A.ha.prototype={
$2(a,b){this.a.v(0,this.b.a(a),this.c.a(b))},
$S:41}
A.E.prototype={
gB(a){return new A.r(a,a.length,A.aP(a).h("r<E.E>"))},
T(a,b){if(!(b>=0&&b<a.length))return A.m(a,b)
return a[b]},
ga4(a){return a.length===0},
gaz(a){return a.length!==0},
gJ(a){var s=a.length
if(s===0)throw A.j(A.aB())
if(0>=s)return A.m(a,0)
return a[0]},
gaA(a){var s,r=a.length
if(r===0)throw A.j(A.aB())
s=r-1
if(!(s>=0))return A.m(a,s)
return a[s]},
b2(a,b){return A.Z(a,b,null,A.aP(a).h("E.E"))},
m(a,b){var s
A.aP(a).h("E.E").a(b)
s=a.length
this.sl(a,s+1)
if(!(s<a.length))return A.m(a,s)
a[s]=b},
q(a){return A.js(a,"[","]")}}
A.F.prototype={
a8(a,b){var s,r,q,p=A.l(this)
p.h("~(F.K,F.V)").a(b)
for(s=this.ga9(),s=s.gB(s),p=p.h("F.V");s.j();){r=s.gn()
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
gah(){return this.ga9().c9(0,new A.hc(this),A.l(this).h("a9<F.K,F.V>"))},
a_(a){return this.ga9().p(0,a)},
gl(a){var s=this.ga9()
return s.gl(s)},
ga4(a){var s=this.ga9()
return s.ga4(s)},
q(a){return A.hd(this)},
$ia8:1}
A.hc.prototype={
$1(a){var s=this.a,r=A.l(s)
r.h("F.K").a(a)
s=s.i(0,a)
if(s==null)s=r.h("F.V").a(s)
return new A.a9(a,s,r.h("a9<F.K,F.V>"))},
$S(){return A.l(this.a).h("a9<F.K,F.V>(F.K)")}}
A.he.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.w(a)
r.a=(r.a+=s)+": "
s=A.w(b)
r.a+=s},
$S:25}
A.cs.prototype={}
A.bu.prototype={
i(a,b){return this.a.i(0,b)},
a8(a,b){this.a.a8(0,this.$ti.h("~(1,2)").a(b))},
ga4(a){return this.a.a===0},
gaz(a){return this.a.a!==0},
gl(a){return this.a.a},
q(a){return A.hd(this.a)},
gb_(){var s=this.a
return new A.Y(s,A.l(s).h("Y<2>"))},
gah(){var s=this.a
return new A.aH(s,A.l(s).h("aH<1,2>"))},
$ia8:1}
A.cd.prototype={}
A.bx.prototype={
F(a,b){var s
A.l(this).h("a<1>").a(b)
for(s=b.gB(b);s.j();)this.m(0,s.gn())},
q(a){return A.js(this,"{","}")},
E(a,b,c,d){var s,r,q,p
d.a(b)
s=A.l(this)
s.K(d).h("1(1,2)").a(c)
for(s=A.iP(this,this.r,s.c),r=s.$ti.c,q=b;s.j();){p=s.d
q=c.$2(q,p==null?r.a(p):p)}return q},
D(a,b){var s,r,q=A.l(this)
q.h("e(1)").a(b)
for(q=A.iP(this,this.r,q.c),s=q.$ti.c;q.j();){r=q.d
if(b.$1(r==null?s.a(r):r))return!0}return!1},
$in:1,
$ia:1,
$ijz:1}
A.cm.prototype={
df(a){var s,r,q,p=this,o=p.cN()
for(s=A.iP(p,p.r,A.l(p).c),r=s.$ti.c;s.j();){q=s.d
if(q==null)q=r.a(q)
if(!a.p(0,q))o.m(0,q)}return o}}
A.bD.prototype={}
A.dk.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cO(b):s}},
gl(a){return this.b==null?this.c.a:this.aB().length},
ga4(a){return this.gl(0)===0},
ga9(){if(this.b==null){var s=this.c
return new A.a7(s,A.l(s).h("a7<1>"))}return new A.dl(this)},
v(a,b,c){var s,r,q=this
A.J(b)
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
if(typeof p=="undefined"){p=A.j_(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.j(A.a_(o))}},
aB(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.c(Object.keys(this.a),t.s)
return s},
d0(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.R(t.N,t.z)
r=n.aB()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.v(0,o,n.i(0,o))}if(p===0)B.a.m(r,"")
else B.a.aF(r)
n.a=n.b=null
return n.c=s},
cO(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.j_(this.a[a])
return this.b[a]=s}}
A.dl.prototype={
gl(a){return this.a.gl(0)},
T(a,b){var s=this.a
if(s.b==null)s=s.ga9().T(0,b)
else{s=s.aB()
if(!(b>=0&&b<s.length))return A.m(s,b)
s=s[b]}return s},
gB(a){var s=this.a
if(s.b==null){s=s.ga9()
s=s.gB(s)}else{s=s.aB()
s=new J.b4(s,s.length,A.i(s).h("b4<1>"))}return s},
p(a,b){return this.a.a_(b)}}
A.cH.prototype={}
A.cK.prototype={}
A.bZ.prototype={
q(a){var s=A.cN(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.cW.prototype={
q(a){return"Cyclic error in JSON stringify"}}
A.h6.prototype={
da(a,b){var s=A.mU(a,this.gdc().a)
return s},
au(a,b){var s=A.m1(a,this.gdg().b,null)
return s},
gdg(){return B.ak},
gdc(){return B.aj}}
A.h8.prototype={}
A.h7.prototype={}
A.iN.prototype={
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
if(a==null?p==null:a===p)throw A.j(new A.cW(a,null))}B.a.m(s,a)},
b0(a){var s,r,q,p,o=this
if(o.ck(a))return
o.b4(a)
try{s=o.b.$1(a)
if(!o.ck(s)){q=A.k5(a,null,o.gbF())
throw A.j(q)}q=o.a
if(0>=q.length)return A.m(q,-1)
q.pop()}catch(p){r=A.aQ(p)
q=A.k5(a,r,o.gbF())
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
if(J.l9(a)){if(0>=a.length)return A.m(a,0)
this.b0(a[0])
for(s=1;s<a.length;++s){r.a+=","
this.b0(a[s])}}r.a+="]"},
dJ(a){var s,r,q,p,o,n,m=this,l={}
if(a.ga4(a)){m.c.a+="{}"
return!0}s=a.gl(a)*2
r=A.hb(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.a8(0,new A.iO(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.cl(A.J(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.m(r,n)
m.b0(r[n])}p.a+="}"
return!0}}
A.iO.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.v(s,r.a++,a)
B.a.v(s,r.a++,b)},
$S:25}
A.iM.prototype={
gbF(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.cL.prototype={
ab(a,b){if(b==null)return!1
return b instanceof A.cL},
gR(a){return B.c.gR(0)},
q(a){return"0:00:00."+B.p.dr(B.c.q(0),6,"0")}}
A.dh.prototype={
q(a){return this.aR()},
$icM:1}
A.C.prototype={
gaN(){return A.lM(this)}}
A.cD.prototype={
q(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cN(s)
return"Assertion failed"}}
A.aK.prototype={}
A.aA.prototype={
gba(){return"Invalid argument"+(!this.a?"(s)":"")},
gb9(){return""},
q(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gba()+q+o
if(!s.a)return n
return n+s.gb9()+": "+A.cN(s.gbn())},
gbn(){return this.b}}
A.c8.prototype={
gbn(){return A.S(this.b)},
gba(){return"RangeError"},
gb9(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.w(q):""
else if(q==null)s=": Not greater than or equal to "+A.w(r)
else if(q>r)s=": Not in inclusive range "+A.w(r)+".."+A.w(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.w(r)
return s}}
A.cP.prototype={
gbn(){return A.f(this.b)},
gba(){return"RangeError"},
gb9(){if(A.f(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gl(a){return this.f}}
A.ce.prototype={
q(a){return"Unsupported operation: "+this.a}}
A.dd.prototype={
q(a){return"UnimplementedError: "+this.a}}
A.cc.prototype={
q(a){return"Bad state: "+this.a}}
A.cI.prototype={
q(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.cN(s)+"."}}
A.d5.prototype={
q(a){return"Out of Memory"},
gaN(){return null},
$iC:1}
A.cb.prototype={
q(a){return"Stack Overflow"},
gaN(){return null},
$iC:1}
A.iz.prototype={
q(a){return"Exception: "+this.a}}
A.ag.prototype={
q(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.a.prototype={
c9(a,b,c){var s=A.l(this)
return A.lJ(this,s.K(c).h("1(a.E)").a(b),s.h("a.E"),c)},
dH(a,b){var s=A.l(this)
return new A.d(this,s.h("e(a.E)").a(b),s.h("d<a.E>"))},
E(a,b,c,d){var s,r
d.a(b)
A.l(this).K(d).h("1(1,a.E)").a(c)
for(s=this.gB(this),r=b;s.j();)r=c.$2(r,s.gn())
return r},
aG(a,b){var s
A.l(this).h("e(a.E)").a(b)
for(s=this.gB(this);s.j();)if(!b.$1(s.gn()))return!1
return!0},
D(a,b){var s
A.l(this).h("e(a.E)").a(b)
for(s=this.gB(this);s.j();)if(b.$1(s.gn()))return!0
return!1},
gl(a){var s,r=this.gB(this)
for(s=0;r.j();)++s
return s},
cg(a,b){return A.ke(this,b,A.l(this).h("a.E"))},
gJ(a){var s=this.gB(this)
if(!s.j())throw A.j(A.aB())
return s.gn()},
gaA(a){var s,r=this.gB(this)
if(!r.j())throw A.j(A.aB())
do s=r.gn()
while(r.j())
return s},
T(a,b){var s,r
A.c9(b,"index")
s=this.gB(this)
for(r=b;s.j();){if(r===0)return s.gn();--r}throw A.j(A.jr(b,b-r,this,"index"))},
q(a){return A.lD(this,"(",")")}}
A.a9.prototype={
q(a){return"MapEntry("+A.w(this.a)+": "+A.w(this.b)+")"}}
A.aa.prototype={
gR(a){return A.z.prototype.gR.call(this,0)},
q(a){return"null"}}
A.z.prototype={$iz:1,
ab(a,b){return this===b},
gR(a){return A.d8(this)},
q(a){return"Instance of '"+A.d9(this)+"'"},
gS(a){return A.nj(this)},
toString(){return this.q(this)}}
A.dq.prototype={
q(a){return""},
$iaW:1}
A.ii.prototype={
gc5(){var s,r=this.b
if(r==null)r=$.hF.$0()
s=r-this.a
if($.jS()===1e6)return s
return s*1000},
bu(){var s=this,r=s.b
if(r!=null){s.a=s.a+($.hF.$0()-r)
s.b=null}}}
A.by.prototype={
gl(a){return this.a.length},
q(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ilS:1}
A.ew.prototype={}
A.b3.prototype={
gbV(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=t.S,f=A.R(g,g)
for(g=h.y,g=new A.ai(g,g.r,g.e,A.l(g).h("ai<2>")),s=h.a,r=h.z,q=h.Q,p=s.b,o=s.a;g.j();){n=g.d
m=s.a0(n.a)
l=!0
if(n.as){k=n.d
if(k!=null)if(m!=null)if(!m.fx)if(!(m.f<=0)){j=m.a
if(!r.p(0,j)){i=m.as
if(!((i===B.f||i===B.e)&&!q.p(0,j)))if(n.y>=p){l=s.G(k)
l=(l==null?null:l.b)!==o}}}}if(l)continue
n=n.d
n.toString
f.aK(n,new A.dx(),new A.dy())}return f},
P(){var s,r=this,q=r.y,p=A.l(q).h("Y<2>")
q=A.o(new A.Y(q,p),p.h("a.E"))
s=A.jW(r.a,r.b,r.c,q)
s.d=r.d
s.e=r.e
s.f=r.f
s.r=r.r
q=s.w
q.aF(0)
q.F(0,r.w)
q=s.x
q.aF(0)
q.F(0,r.x)
s.z.F(0,r.z)
s.Q.F(0,r.Q)
s.as.F(0,r.as)
s.at.F(0,r.at)
s.ay.F(0,r.ay)
s.ax.F(0,r.ax)
s.ch.F(0,r.ch)
return s},
u(a){var s=this.a.u(a),r=A.i(s),q=r.h("d<1>")
s=A.o(new A.d(s,r.h("e(1)").a(new A.dV(this)),q),q.h("a.E"))
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
p=new A.d(q,p.h("e(1)").a(new A.dz(r,a)),p.h("d<1>")).gl(0)
q=r.gbV().i(0,a)
if(q==null)q=0
s=r.at.p(0,a)?1:0
return p+q+s},
a7(a){var s=a.a
if(B.a.D(this.u(s),new A.dS()))return 2
return this.ax.p(0,s)||this.aM(a)?0:1},
aM(a){return this.ch.cd(a.a,new A.e7(this,a))},
ce(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=A.b9(t.S)
for(s=J.ld(t.W.a(a),g.b.w.go),s=s.gB(s),r=g.c,q=g.a;s.j();){p=s.gn()
o=q.gM()
n=o.$ti
m=n.h("d<a.E>")
l=A.o(new A.d(o,n.h("e(a.E)").a(new A.e0(g)),m),m.h("a.E"))
B.a.C(l,new A.e1(p))
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
aq(a){var s,r,q,p,o,n,m,l,k=this,j=a.c,i=k.a.G(j)
if(i==null)return!1
s=k.u(j)
j=A.i(s)
r=j.h("e(1)")
j=j.h("d<1>")
q=A.aC(new A.d(s,r.a(new A.dC()),j),t.r)
if(q!=null){if(s.length<=2||a.a===q.a)return!1
p=A.o(new A.d(s,r.a(new A.dD(q)),j),j.h("a.E"))
B.a.C(p,new A.dE(k,i))
j=B.a.gJ(p)
r=k.b
o=k.O(i)
n=r.b.i(0,"soldierLimit")
n.toString
m=A.i(p)
return a.a!==new A.d(p,m.h("e(1)").a(new A.dF(k,i,A.dt(j,r,o,B.b.k(n)))),m.h("d<1>")).gaA(0).a}if(k.aM(i))return!(a.x>=15&&a.w<12)
if(s.length<=1)return!1
o=new A.dJ(k,i)
B.a.C(s,new A.dG(o))
l=A.o(new A.d(s,r.a(A.nb()),j),j.h("a.E"))
B.a.C(l,new A.dH())
if(l.length!==0)return a.a!==B.a.gJ(l).a
n=o.$1(B.a.gJ(s))
if(typeof n!=="number")return n.bs()
return a.a!==new A.d(s,r.a(new A.dI(o,n*0.6)),j).gaA(0).a},
ae(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d="monthSeconds",c=e.b,b=c.b,a=b.i(0,d)
a.toString
s=b.i(0,"budgetSafety")
s.toString
r=Math.min(c.w.p1,a+s)
c=e.a
a=c.r
s=A.i(a)
q=s.h("e(1)")
s=s.h("d<1>")
p=t.S
o=new A.d(a,q.a(new A.dK(e)),s).E(0,e.r,new A.dL(),p)
n=new A.d(a,q.a(new A.dM(e)),s).E(0,e.r,new A.dN(),p)
s=c.gM()
q=s.$ti
a=q.h("d<a.E>")
m=A.o(new A.d(s,q.h("e(a.E)").a(new A.dO(e)),a),a.h("a.E"))
if(m.length===0)a=0
else{a=c.gaj().r
if(a==null){a=b.i(0,"countryIncome")
a.toString
a=B.b.k(a)}s=b.i(0,"poorPenalty")
s.toString
s=a-B.b.k(s)
a=s}l=new A.dR(e,o,a+B.a.E(m,0,new A.dP(e),p),n,e.gbo())
k=A.lI([r],t.i)
j=A.c([],t.n)
i=c.e
c=r+1e-9
h=i
while(h<=c){k.m(0,h)
B.a.m(j,h)
a=b.i(0,d)
a.toString
h+=a}for(c=A.iP(k,k.r,k.$ti.c),a=c.$ti.c,g=0;c.j();){s=c.d
if(s==null)s=a.a(s)
if(s+1e-9<i)f=0
else{q=b.i(0,d)
q.toString
f=1+B.b.W((s-i)/q)}if(B.a.D(j,new A.dQ(s)))g=Math.max(g,A.j5(l.$1(Math.max(0,f-1))))
g=Math.max(g,A.j5(l.$1(f)))}c=Math.max(0,g)
if(a0)b=0
else{b=b.i(0,"emergencyGold")
b.toString
b=B.b.k(b)}return new A.ew(c+b)},
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
gbo(){return this.a.gM().E(0,0,new A.dW(this),t.S)},
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
if(!r||s===B.e)for(s=a.ax,r=s.length,q=n.w,o=0;o<r;++o)q.aK(s[o],new A.dT(),new A.dU())
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
s.w.aK(a,new A.dA(),new A.dB())
return!0},
bq(a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d="drawCost",c=e.b,b=c.b,a=b.i(0,d)
a.toString
s=e.a
r=s.y
q=B.b.k(a)+r
a=s.r
p=A.i(a)
o=t.S
n=new A.d(a,p.h("e(1)").a(new A.dX(e)),p.h("d<1>")).E(0,e.r+r,new A.dY(),o)
p=s.gaj().r
if(p==null){a=b.i(0,"countryIncome")
a.toString
a=B.b.k(a)}else a=p
p=s.gM()
m=p.$ti
l=a+new A.d(p,m.h("e(a.E)").a(new A.dZ(e)),m.h("d<a.E>")).E(0,0,new A.e_(e),o)
o=b.i(0,"garrisonFree")
k=B.b.k(o==null?2:o)
a=b.i(0,"garrisonFactor")
j=B.b.k(a==null?0:a)
a=a0.a
i=e.L(a)
h=e.gbo()+A.jw(i+1,j,k)-A.jw(i,j,k)
p=n+h
if(p<=l*(a1?1.3:1.1)){if(a1)c=1
else if(a2==null)c=c.w.r
else{c=A.aS(a2,s,c,null)
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
if(q.G(s)!=null){q=q.G(s)
q.toString
q=l.aM(q)}else q=!1
if(!q){r=!(l.ax.p(0,s)&&c.b==="evacuate"&&c.as)
s=r}else s=r}else s=r
if(s)return!1
s=l.w
r=t.S
p=A.k7(s,r,r)
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
s.F(0,p)
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
A.dx.prototype={
$1(a){return A.f(a)+1},
$S:7}
A.dy.prototype={
$0(){return 1},
$S:5}
A.dV.prototype={
$1(a){var s=this.a,r=t.r.a(a).a
return!s.z.p(0,r)&&!s.Q.p(0,r)},
$S:0}
A.dz.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.c===this.b&&a.f>0&&!a.fx&&!s.z.p(0,a.a)},
$S:0}
A.dS.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.e7.prototype={
$0(){var s,r,q,p,o,n,m,l,k,j=new A.e8(),i=this.b,h=this.a,g=h.a
if(i.b===g.a){s=g.gM().gl(0)
r=j.$1(i)
q=h.b
p=q.b.i(0,"marchSpeed")
p.toString
o=B.a.ak(q.e,B.A)
n=g.f
m=A.i(n)
l=m.h("e(1)").a(new A.e2(h))
j=m.h("+(t,h)(1)").a(new A.e3(j))
g=g.r
k=A.i(g)
q=A.ny(i.e,new A.as(new A.d(g,k.h("e(1)").a(new A.e4(h)),k.h("d<1>")),k.h("+(t,e)(1)").a(new A.e5(i)),k.h("as<1,+(t,e)>")),new A.as(new A.d(n,l,m.h("d<1>")),j,m.h("as<1,+(t,h)>")),p*o,i.ax!=null,s,r,q.w.b)
j=q}else j=!1
return j},
$S:37}
A.e8.prototype={
$1(a){return B.a.E(a.f.a,0,new A.e6(a),t.i)},
$S:39}
A.e6.prototype={
$2(a,b){return Math.max(A.ao(a),this.a.e.H(t.c1.a(b)))},
$S:42}
A.e2.prototype={
$1(a){return t.q.a(a).b!==this.a.a.a},
$S:1}
A.e3.prototype={
$1(a){t.q.a(a)
return new A.bk(a.e,this.a.$1(a))},
$S:36}
A.e4.prototype={
$1(a){var s
t.r.a(a)
if(a.b!==this.a.a.a){s=a.as
s=!(s===B.f||s===B.e)&&!a.fx&&a.f>0}else s=!1
return s},
$S:0}
A.e5.prototype={
$1(a){t.r.a(a)
return new A.bk(a.z,a.p2===this.a.a)},
$S:62}
A.e0.prototype={
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
A.e1.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.H(s),b.e.H(s))},
$S:4}
A.dC.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.dD.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.dE.prototype={
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
o=A.dt(b,s,q,B.b.k(o))
r=m.O(r)
p=p.i(0,n)
p.toString
return B.b.t(o,A.dt(a,s,r,B.b.k(p)))},
$S:2}
A.dF.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=s.b
s=s.O(this.b)
q=r.b.i(0,"soldierLimit")
q.toString
return A.dt(a,r,s,B.b.k(q))>=this.c*0.6},
$S:0}
A.dJ.prototype={
$1(a){var s=this.a,r=s.b,q=s.O(this.b),p=r.b.i(0,"soldierLimit")
p.toString
return A.dt(a,r,q,Math.min(B.b.k(p),s.e))},
$S:23}
A.dG.prototype={
$2(a,b){var s,r=t.r
r.a(a)
s=this.a
return J.l8(s.$1(r.a(b)),s.$1(a))},
$S:2}
A.dH.prototype={
$2(a,b){var s,r=t.r
r.a(a)
r.a(b)
s=B.c.t(b.x,a.x)
return s!==0?s:B.c.t(a.w,b.w)},
$S:2}
A.dI.prototype={
$1(a){var s=this.a.$1(t.r.a(a))
if(typeof s!=="number")return s.dM()
return s>=this.b},
$S:0}
A.dK.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.p(0,a.a)},
$S:0}
A.dL.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:9}
A.dM.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=s.a
return a.b===r.a&&a.f>0&&!s.z.p(0,a.a)&&a.p3===r.d},
$S:0}
A.dN.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:9}
A.dO.prototype={
$1(a){return!this.a.ax.p(0,t.q.a(a).a)},
$S:1}
A.dP.prototype={
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
A.dR.prototype={
$1(a){var s,r,q,p=this
if(a===0)s=0
else{s=p.a
r=s.a
q=r.gaj()
s=s.b.b.i(0,"monthSeconds")
s.toString
s=a*(p.b-p.c)-p.d+B.b.aw(q.w+p.e*(r.e/s+a-1))}return s},
$S:7}
A.dQ.prototype={
$1(a){return Math.abs(A.ao(a)-this.a)<1e-7},
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
return a+A.jw(r,B.b.k(s==null?0:s),q)},
$S:8}
A.dT.prototype={
$1(a){return A.f(a)+1},
$S:7}
A.dU.prototype={
$0(){return 1},
$S:5}
A.dA.prototype={
$1(a){return A.f(a)+1},
$S:7}
A.dB.prototype={
$0(){return 1},
$S:5}
A.dX.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.p(0,a.a)},
$S:0}
A.dY.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:9}
A.dZ.prototype={
$1(a){return!this.a.ax.p(0,t.q.a(a).a)},
$S:1}
A.e_.prototype={
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
A.eA.prototype={
ga3(){var s=this
return s.a!==s.d.a&&s.b>=s.e.w.w},
gbb(){return Math.max(0,this.b-this.e.w.w)},
gaV(){if(this.ga3()){var s=this.e.w
s=Math.max(0,s.x+this.gbb()*s.y)}else s=0
return s},
ci(a,b){return a===0||!this.ga3()||b<=1?a:Math.min(this.e.w.fy,a+1+B.c.bi(this.gbb(),2))}}
A.eB.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.eC.prototype={
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
A.b5.prototype={
aR(){return"CombatAdvantage."+this.b}}
A.bK.prototype={}
A.eD.prototype={
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
if(!b6.b.d1())return B.a5
if(q)q=B.a.E(l,0,new A.eE(),t.H)
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
if(o)o=B.a.E(j,0,new A.eF(),t.H)
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
else{q=b2<-b3?B.r:B.a4
b4=q}q=A.c([],t.s)
if(c4>0||c0>0)q.push("\u57ce\u9632\u589e\u52a0\u653b\u51fb\u4e0e\u5f00\u573a\u58eb\u6c14\uff0c\u5b88\u65b9\u6b66\u5668\u8d21\u732e\u4e3a\u96f6")
if(s.length>1)q.push("\u672c\u6b21\u5bf9\u9635\u53ea\u8ba1\u9996\u4ef6\u6b66\u5668\uff0c\u5176\u4f59\u7559\u5f85\u4e0b\u4e00\u4f4d\u5b88\u5c06")
if(a5)q.push("\u5b58\u5728\u5148\u624b\u81f4\u547d\u6216\u81ea\u4f24\u98ce\u9669")
q.push("\u4f59\u91cf\u4e3a\u9759\u6001\u98ce\u9669\u6307\u6807\uff0c\u5e76\u975e\u80dc\u7387")
b5=new A.bK(b4,b1,b2,a5)
if(h.a>=256)h.an(0,new A.a7(h,A.l(h).h("a7<1>")).gJ(0))
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
if(!b)return new A.bB([0,0,0,0])
for(s=this.a,r=s.r,s=s.b,q=0,p=0,o=0,n=0,m=0;l=a.length,m<Math.min(l,1);++m){if(!(m<l))return A.m(a,m)
k=r.i(0,a[m])
if(k==null)continue
l=m===0
if(l&&c){q+=k.c
o+=k.d}if(!(l&&c)){l=s.i(0,"weaponChance")
l.toString
l=l>0}else l=!0
if(l){p+=k.c
n+=k.d}}return new A.bB([p,q,n,o])}}
A.eE.prototype={
$2(a,b){return A.x(a)+A.ao(b)},
$S:15}
A.eF.prototype={
$2(a,b){return A.x(a)+A.ao(b)},
$S:15}
A.j9.prototype={
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
A.av.prototype={}
A.eG.prototype={
bv(){return new A.aw(this.cr(),t.gL)},
cr(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9,k0,k1,k2,k3,k4,k5,k6,k7,k8
return function $async$bv(k9,l0,l1){if(l0===1){p.push(l1)
r=q}for(;;)switch(r){case 0:k6={}
k7=s.c
k8=s.a
if(k7.b!==k8.a||k7.c!==s.b.a)throw A.j(B.ae)
o=k7.Q
n=o.f
if(n.length>64||o.r.length>256||o.w.length>32)throw A.j(B.af)
m=s.e
m===$&&A.O()
l=s.f
l===$&&A.O()
k=new A.ik(o,k8,m,l)
j=o.gM(),i=J.G(j.a),j=new A.V(i,j.b,j.$ti.h("V<1>")),h=s.x
case 3:if(!j.j()){r=4
break}g=i.gn()
h.v(0,g.a,k.dz(g))
r=5
return k9.b=0,1
case 5:r=3
break
case 4:j=A.l(h).h("Y<2>")
f=new A.Y(h,j).D(0,new A.f3())
i=k7.x
g=i===B.o
if(g&&f){k7=s.d
s.w=new A.br("defending",null,0,1,B.M,A.c(["\u4e3b\u89d2\u6240\u5728\u57ce\u5c1a\u6709\u660e\u786e\u751f\u547d\u98ce\u9669\uff0c\u6682\u505c\u65b0\u8fdc\u5f81\uff0c\u4f18\u5148\u5b8c\u6210\u9632\u5b88\u8c03\u5ea6"],t.s),k7.e,k7.c,k7.d,0)
r=1
break}e=k7.as
d=A.i(e)
c=d.h("d<1>")
e=A.o(new A.d(e,d.h("e(1)").a(new A.f4(s)),c),c.h("a.E"))
b=A.jW(o,k8,m,e)
k6.a=b
r=i===B.G?6:7
break
case 6:o=s.r
o===$&&A.O()
s.w=new A.hG(k7,k8,o,l,h).ds(b)
r=8
return k9.b=1,1
case 8:r=1
break
case 7:e=t.Z
a=A.c([],e)
d=t.s
a0=A.c([],d)
c=s.d
a1=s.r
a1===$&&A.O()
a2=new A.fs(k7,k8,c,l,a1,h)
a3=j.h("d<a.E>")
a4=A.o(new A.d(new A.Y(h,j),j.h("e(a.E)").a(new A.f5()),a3),a3.h("a.E"))
B.a.C(a4,new A.fg())
j=t.bQ
a5=A.c([new A.av(k6.a,A.c([],e),A.c([],d),0,0)],j)
a3=g?A.c([],t.bL):a4
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
b7=A.c([],j)
b8=a5.length,b9=0
case 12:if(!(b9<a5.length)){r=14
break}c0=a5[b9]
c1=a2.c0(b6,c0.a),c2=c1.$ti,c1=new A.aN(c1.a(),c2.h("aN<1>")),c3=c0.d,c4=c0.e,c5=c0.c,c6=c0.b,c2=c2.c
case 15:if(!c1.j()){r=16
break}c7=c1.b
if(c7==null)c7=c2.a(c7)
c8=A.o(c6,b1)
B.a.F(c8,c7.b)
if(B.a.E(c8,0,new A.fl(),a8)>b0){c.e=!0
r=15
break}c9=c7.a
d0=A.o(c5,a7)
d1=c7.e
if(d1.length!==0)d0.push(d1)
d1=c7.c
c7=c7.d?1:0
B.a.m(b7,new A.av(c9,c8,d0,c3+d1,c4+c7))
r=17
return k9.b=1,1
case 17:r=15
break
case 16:case 13:a5.length===b8||(0,A.v)(a5),++b9
r=12
break
case 14:if(b7.length!==0){B.a.C(b7,new A.fm())
b8=A.f(Math.min(4,b4))
c1=new A.y(b7,0,b8,b3)
c1.U(b7,0,b8,b2)
a5=c1.al(0)}case 10:a3.length===a6||(0,A.v)(a3),++b5
r=9
break
case 11:if(a4.length!==0&&!g){d2=B.a.gJ(a5)
k6.a=d2.a
B.a.F(a,d2.b)
B.a.F(a0,d2.c)
j=d2.e
if(j>0){j=""+j
B.a.m(a0,c.e?"\u89c4\u5212\u914d\u989d\u5df2\u7528\u5c3d\uff1a"+j+" \u5ea7\u57ce\u5c1a\u672a\u627e\u5230\u5b8c\u6574\u65b9\u6848\uff0c\u4e0d\u80fd\u636e\u6b64\u65ad\u5b9a\u65e0\u6cd5\u633d\u6551":"unsalvageableDefense\uff1a"+j+" \u5ea7\u57ce\u5728\u5f53\u524d\u9501\u5b9a\u3001\u8d44\u91d1\u6216\u65f6\u9650\u4e0b\u672a\u627e\u5230\u5b8c\u6574\u4fee\u590d\u65b9\u6848")}d3="defending"}else d3="preparing"
if(a4.length!==0)d3="defending"
if(!g){d4=s.cQ(k6.a)
if(d4!=null){k6.a=d4.a
B.a.m(a,d4.b)
B.a.m(a0,"\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5176\u4ed6\u5b89\u5168\u57ce\u6c60\u7ee7\u7eed\u7ec4\u7ec7\u8fdb\u653b")}}r=18
return k9.b=2,1
case 18:for(j=o.r,g=A.i(j),a3=g.h("e(1)"),a6=a3.a(new A.fn(s)),g=g.h("d<1>"),b1=g.h("e(a.E)").a(new A.fo(s)),a6=new A.d(j,a6,g).gB(0),b1=new A.V(a6,b1,g.h("V<a.E>")),b2=t.w,b3=t.e,b4=t.Y,b8=k8.b;b1.j();){c1=a6.gn()
if(c1.e!==1||B.a.D(c1.ax,new A.fp(s)))continue
d5=o.a0(c1.id)
if(d5==null)continue
d6=o.G(c1.CW)
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
c3=A.c([new A.A(B.R,c3,null,null,0,B.d)],b2)
c4=A.c([c1,d5],b3)
c1=o.G(c1.c)
c1.toString
B.a.m(a,new A.P(c2,c3,a1.ag(c4,A.c([c1],b4)),B.q,0,!0))}r=19
return k9.b=3,1
case 19:a6=g.h("a.E")
d9=A.o(new A.d(j,a3.a(new A.fq(k6,s)),g),a6)
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
if((c9?null:e1.b)==="expedition")if((c9?null:e1.e)!=null){d1=o.G(c9?null:e1.d)
d1=d1==null?null:d1.b
if(d1!=(c9?null:e1.e)){d1=o.G(c9?null:e1.d)
d1=(d1==null?null:d1.b)!==c3}else d1=e4
e4=d1}e5=d0&&e0.as===B.n&&!e0.p4&&e1.x+1>=e1.w.length
d1=e0.as===B.n
if(d1)if(!e0.p4){e6=!0
if(d0)if(!e3)e7=e5&&B.a.p(A.c(["intercept","standby"],d),e1.b)
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
break}if(d0&&e7&&!e3&&!f0&&e1.z>c2&&!A.kF(e0,o,k6.a,k8)&&e0.f>=e0.r*0.5){r=21
break}f1=e0.p4
if(f1&&d0&&!e3&&!e2){r=21
break}f2=A.jK(e0,o,k6.a)
d0=!1
if(e7)if(A.kF(e0,o,k6.a,k8))d0=e0.f>=e0.r*0.25||o.u(f2.a).length===0
if(d0){B.a.m(a0,c8+"\u5df2\u4e34\u8fd1\u4e3b\u653b\u76ee\u6807\uff0c\u4fdd\u6301\u8fdb\u653b\uff0c\u4e0d\u56e0\u666e\u901a\u9884\u8b66\u6216\u6574\u5907\u9884\u7b97\u6298\u8fd4")
r=21
break}if((c9?null:e1.b)==="expedition"&&e7&&!e3&&e0.f>=e0.r*0.65&&e1.x+1<e1.w.length){r=21
break}if(e7&&!f0&&!e3&&e0.f>=e0.r*0.65&&!d1){r=21
break}d0=o.gM()
e7=d0.$ti
f3=e7.h("d<a.E>")
f4=A.o(new A.d(d0,e7.h("e(a.E)").a(new A.fr(k6,s,e3,e1)),f3),f3.h("a.E"))
B.a.C(f4,new A.f6(e0))
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
d0=A.c([e0.z],c5)
d1=B.b.aI(c7)
e7=g4?1:0
g5=new A.a5(c8,"standby",g3,c9,null,!1,null,d0,0,c2+d1,c2,0,!1,!1,e0.go+e7)
k6.a.y.v(0,c8,g5)
e7=A.c([],b2)
if(g4)e7.push(new A.A(B.Q,c8,null,null,0,B.d))
c8=A.c([g5],c4)
d0=A.c([e0],b3)
c9=o.G(c9)
c9.toString
B.a.m(a,new A.P(g3,e7,a1.ag(d0,A.c([c9],b4)),c8,0,!1))}}r=23
return k9.b=4,1
case 23:case 21:d9.length===b1||(0,A.v)(d9),++b5
r=20
break
case 22:g6=A.o(new A.d(j,a3.a(new A.f7(k6,s,f)),g),a6)
B.a.C(g6,new A.f8(s))
j=k7.y
g=k7.z
g7=A.c7(o,k6.a,k8,g,j)
d=A.R(a8,a8)
for(a3=g7.f,a6=new A.b8(a3,a3.r,a3.e,A.l(a3).h("b8<1>"));a6.j();){b1=a6.d
c2=a3.i(0,b1)
c2=c2==null?null:c2.length
d.v(0,b1,c2==null?0:c2)}g8=g7.gY()
if(g8==null)g8=g7.gcc()
if(g7.gY()!=null&&a4.length===0)d3="attacking"
a3=g6.length,c6=k7.w>c6/a9.a,a6=a9.k4,k7=k7.f,b1=a9.rx,c2=a9.fy,a9=a9.go,c3=A.i(n),c4=c3.h("e(1)"),c3=c3.h("d<1>"),c5=c3.h("a.E"),g9=0,h0=1,h1=!1,b5=0
case 24:if(!(b5<g6.length)){r=26
break}e0=g6[b5]
h2={}
c7=e0.a
if(k6.a.as.p(0,c7)||k6.a.z.p(0,c7)){r=25
break}h3=o.G(e0.c)
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
break}h5=A.c7(o,k6.a,k8,g,j)
h6=A.o(new A.d(n,c4.a(new A.f9(s,h5,e0,d)),c3),c5)
B.a.C(h6,new A.fa(s,h5,e0))
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
i1=e7.al(0)
f6=m.aJ(e0,h9.e,o,h9)
if(!f6.d){r=27
break}i2=a1.bp(e0,k6.a,h9,l)
for(c7=i2.length,i3=!1,b9=0;b9<i2.length;i2.length===c7||(0,A.v)(i2),++b9){i4=i2[b9]
d0=A.j2(e0,h9,o,k8,l,i4,c6&&k6.a.d>100?0.05:0).a
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
d0=A.bn(h9,e0,o,k8,k7,c7)
d1=k6.a.d
e7=g2.a.d
f1=B.a.b2(i4,1).E(0,0,new A.fb(s),a8)
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
if(c7!=null){c7=B.a.E(a,0,new A.fc(),a8)
c8=h2.a
c7=c7+c8.b.b.length<=b0}else{c8=c7
c7=!1}if(c7){k6.a=c8.a
B.a.m(a,c8.b)
g8=h7.a
d.aK(g8,new A.fd(h2),new A.fe(h2))
h1=!0}r=30
return k9.b=6,1
case 30:case 25:g6.length===a3||(0,A.v)(g6),++b5
r=24
break
case 26:k7=!h1
if(k7&&c1&&B.a.gJ(a5).e===0&&i!==B.z){j3=s.cY(k6.a,g7)
if(j3!=null){k6.a=j3.a
B.a.m(a,j3.b)
d3="preparing"}}r=i===B.F&&c1&&k7&&B.a.E(a,0,new A.ff(),a8)<b0-3?31:32
break
case 31:j4=k6.a.ce(new A.d(n,c4.a(new A.fh(s,g7)),c3))
k7=o.gM(),m=J.G(k7.a),k7=new A.V(m,k7.b,k7.$ti.h("V<1>"))
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
g=i.h("d<1>")
j6=A.o(new A.d(j5,i.h("e(1)").a(new A.fi(k6)),g),g.h("a.E"))
B.a.C(j6,new A.fj())
j7=!1
if(j4.p(0,j))if(B.a.D(n,new A.fk(s))){i=j5.length===0||k6.a.bW(j)<k6.a.a7(l)+h0
j7=i}if(j6.length!==0){i=j5.length
g=k6.a
d=l.ax
if(d==null){g=g.x.i(0,j)
if(g==null)g=l.d}else{g=l.ay
a3=l.db?1:0
a3=B.c.A(d-g-a3,0,5)
g=a3}if(i<g)i=j7&&j5.length>=l.y
else i=!0}else i=!1
if(i)if(b7.aL(l,B.a.gJ(j6))&&b7.d>=b7.V().a){k6.a=b7
B.a.m(a,new A.P("\u5148\u6269\u5145\u5b89\u5168\u8fce\u6218\u540d\u989d\u548c\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u8003\u8651\u62db\u5c06\u4e0e\u8fdc\u5f81",A.c([new A.A(B.l,B.a.gJ(j6).a,j,null,0,B.d)],b2),a1.ag(A.c([B.a.gJ(j6)],b3),A.c([l],b4)),B.q,b7.V().a,!1))
r=34
break}if(j7){i=o.G(g8)
i=b7.dv(l,i==null?null:i.b)&&b7.d>=b7.V().a}else i=!1
if(i){k6.a=b7
B.a.m(a,new A.P("\u4e3a\u7559\u5b88\u4e0e\u8fdc\u5f81\u7684\u771f\u5b9e\u7f3a\u53e3\u62bd\u53d6\u82f1\u96c4\uff0c\u9884\u7559\u6700\u9ad8\u624b\u7eed\u8d39\u548c\u6708\u4ff8",A.c([new A.A(B.u,null,j,null,0,B.d)],b2),a1.ag(A.c([],b3),A.c([l],b4)),B.q,b7.V().a,!1))
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
B.a.m(a,new A.P("\u8865\u5145\u8fd1\u671f\u5b88\u57ce\u548c\u51fa\u5f81\u6240\u9700\u5175\u5458\uff0c\u4e0d\u586b\u6ee1\u6ca1\u6709\u4efb\u52a1\u7684\u5168\u56fd\u5bb9\u91cf",A.c([new A.A(B.m,null,j,null,k0,B.d)],b2),a1.ag(A.c([],b3),A.c([l],b4)),B.q,j9.V().a,!1))
r=34
break}}r=35
return k9.b=7,1
case 35:r=33
break
case 34:case 32:if(h1)d3=a4.length===0?"attacking":"defending"
k1=o.G(g8)
if(k1!=null){k2=A.aS(k1.b,o,k8,null)
if(k2.ga3())B.a.m(a0,"\u76ee\u6807\u56fd\u5360\u6709 "+k2.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.aw(k2.c*k2.gaV())+" \u91d1\u5e01\uff0c\u51c6\u5907\u5f3a\u5316\u6b66\u5668\u548c\u8f6e\u653b\u5175\u529b")}if(a.length===0){k7=k6.a
B.a.m(a0,k7.d<k7.V().a?"\u8d44\u91d1\u4e0d\u8db3\u4ee5\u8986\u76d6\u73b0\u6709\u90e8\u961f\u548c\u6b20\u6536\u6708\u4ff8\uff0c\u7b49\u5f85\u6574\u5907":"\u6ca1\u6709\u6ee1\u8db3\u5b88\u57ce\u3001\u65f6\u9650\u53ca\u9759\u6001\u98ce\u9669\u7ea6\u675f\u7684\u65b0\u589e\u884c\u52a8\uff0c\u4fdd\u6301\u5df2\u6709\u4efb\u52a1")}if(c6)B.a.m(a0,"\u505c\u6ede\u8bca\u65ad\uff1a"+(d3==="saving"?"\u7f3a\u5c11\u6574\u961f\u540e\u52e4\u8d44\u91d1":"\u7f3a\u5c11\u53ef\u5b89\u5168\u6267\u884c\u7684\u6269\u5f20\u6761\u4ef6")+"\uff0c\u4e0d\u901a\u8fc7\u65e0\u9650\u62db\u52df\u6216\u81ea\u6740\u51fa\u51fb\u6253\u7834\u7b49\u5f85")
k3=A.c([],e)
for(k7=a.length,k4=0,b5=0;b5<a.length;a.length===k7||(0,A.v)(a),++b5){k5=a[b5]
k4+=k5.b.length
if(k4>b0){c.e=!0
B.a.m(a0,"\u547d\u4ee4\u914d\u989d\u5230\u8fbe\uff0c\u53ea\u63d0\u4ea4\u524d\u9762\u5b8c\u6574\u7684\u52a8\u4f5c\u7ec4\uff0c\u540e\u7eed\u7559\u5f85\u4e0b\u4e00\u6b21\u89c4\u5212")
break}B.a.m(k3,k5)}s.w=new A.br(d3,g8,g9,h0,k3,A.Z(a0,0,A.X(12,"count",a8),a7).al(0),c.e,c.c,c.d,c.b)
case 1:return 0
case 2:return k9.c=p.at(-1),3}}}},
cQ(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this
for(s=a2.c.Q,r=s.gM(),q=J.G(r.a),r=new A.V(q,r.b,r.$ti.h("V<1>")),p=a2.x,o=a2.d,n=s.r,m=A.i(n),l=m.h("e(1)"),m=m.h("d<1>"),k=m.h("a.E"),j=a3.ax;r.j();){i=q.gn()
h=i.a
if(a3.u(h).length!==0||a3.aM(i)||a3.L(h)>0||j.p(0,h))continue
g=A.o(new A.d(n,l.a(new A.eR(a2,a3)),m),k)
B.a.C(g,new A.eS(i))
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
r=s.G(l?null:b.d)
if(r==null||r.b===s.a)return!1
l=s.u(r.a)
q=A.i(l).h("L<1>")
p=A.aC(A.Z(new A.L(l,q),0,A.X(r.gZ(),"count",t.S),q.h("k.E")),t.r)
if(p==null)return!1
l=B.a.am(s.w,new A.eH(r))
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
n=o.h("d<1>")
m=A.o(new A.d(p,o.h("e(1)").a(new A.eN(b1)),n),n.h("a.E"))
B.a.C(m,new A.eO(b1,r,b4))
for(p=b1.a,o=p.w,n=A.Z(m,0,A.X(o.go,"count",t.S),A.i(m).c),l=n.$ti,n=new A.r(n,n.gl(0),l.h("r<k.E>")),s=!s,k=t.r,j=o.fy,i=b3.y,h=A.l(i).h("Y<2>"),g=h.h("e(a.E)"),f=h.h("d<a.E>"),e=b1.d,l=l.h("k.E"),p=p.b,d=q.w,o=o.ch;n.j();){c=n.d
if(c==null)c=l.a(c)
if(!e.a2())return b2
b=b1.r
b===$&&A.O()
if(!b.ai(c))continue
a=new A.d(new A.Y(i,h),g.a(new A.eP(b1,b4,c)),f).gl(0)
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
a7=A.aC(a6,k)
a1=a7!=null
if(a1){a2=B.a.am(d,new A.eQ(c))
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
cY(b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=a5.c.Q,a7=a6.gM(),a8=a7.$ti,a9=a8.h("d<a.E>"),b0=A.o(new A.d(a7,a8.h("e(a.E)").a(new A.eW(a5)),a9),a9.h("a.E"))
if(b0.length<2)return null
a7=a6.f
a8=A.i(a7)
a9=a8.h("d<1>")
s=A.o(new A.d(a7,a8.h("e(1)").a(new A.eX(a5,b2)),a9),a9.h("a.E"))
a7=t.S
a8=t.i
r=A.R(a7,a8)
for(a9=b0.length,q=A.i(s),p=q.c,q=q.h("y<1>"),o=a5.a,n=o.w,m=n.go,l=0;l<b0.length;b0.length===a9||(0,A.v)(b0),++l){k=b0[l]
B.a.C(s,new A.eY(k))
j=new A.y(s,0,m,q)
j.U(s,0,m,p)
r.v(0,k.a,j.E(0,1/0,new A.eZ(a5,k),a8))}B.a.C(b0,new A.f_(r))
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
b=c.h("d<1>")
a1=A.o(new A.d(a0,c.h("e(1)").a(new A.f0(b1)),b),b.h("a.E"))
B.a.C(a1,new A.f1())
c=A.i(a1)
b=c.h("y<1>")
a=new A.y(a1,0,2,b)
a.U(a1,0,2,c.c)
a=new A.r(a,a.gl(0),b.h("r<k.E>"))
b=b.h("k.E")
d=d.d
while(a.j()){c=a.d
if(c==null)c=b.a(c)
if(c.x<15||e>=o.af(m)||d<o.af(m)||B.a.D(b1.u(h),new A.f2(c)))continue
if(!p.a2())return null
a2=a5.e
a2===$&&A.O()
a3=a2.ao(c,f,a6,!0,i)
a2=a5.r
a2===$&&A.O()
a4=a2.cn(b1,c,a3,!0,!0,"\u540e\u65b9\u5efa\u8bbe\u5df2\u5b8c\u6210\uff0c\u5b89\u5168\u8f6c\u79fb\u9ad8\u5185\u653f\u5c06\u9886\u4e3b\u6301\u524d\u7ebf\u57ce\u9632\u5efa\u8bbe","transfer",i)
if(a4!=null)return a4}}}return null},
bJ(a,b,c){var s,r,q=a.a,p=this.x.i(0,q),o=p==null?null:p.d
if(o==null)o=A.c([],t.ay)
if(o.length===0)return!0
q=c.u(q)
p=A.i(q)
s=p.h("d<1>")
q=A.o(new A.d(q,p.h("e(1)").a(new A.eU(b)),s),s.h("a.E"))
p=A.i(q).h("L<1>")
r=A.Z(new A.L(q,p),0,A.X(c.O(a),"count",t.S),p.h("k.E")).al(0)
if(r.length===0)return!1
return B.a.aG(o,new A.eV(this,r,c,a))},
bH(c7,c8,c9,d0,d1,d2,d3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4=this,c5=null,c6="soldierLimit"
t.L.a(d0)
s=t.e
r=A.c([],s)
for(q=c4.c.Q,p=q.gM(),o=J.G(p.a),p=new A.V(o,p.b,p.$ti.h("V<1>")),n=c4.x,m=c8.c;p.j();){l=o.gn()
k=l.a
j=n.i(0,k)
if(j==null)j=c5
else j=j.d.length!==0||j.a.ax!=null
if(j===!0&&k!==m)continue
i=c7.a7(l)
h=Math.max(0,c7.u(k).length-i)
l=c7.u(k)
k=A.i(l)
j=k.h("d<1>")
g=A.o(new A.d(l,k.h("e(1)").a(new A.eJ(c4,c7,c9)),j),j.h("a.E"))
B.a.C(g,new A.eK(c4))
l=A.i(g)
k=new A.y(g,0,h,l.h("y<1>"))
k.U(g,0,h,l.c)
B.a.F(r,k)}if(!B.a.p(r,c8))return c5
B.a.an(r,c8)
B.a.C(r,new A.eL(c4))
p=c4.e
p===$&&A.O()
o=c9.e
f=p.aJ(c8,o,q,c9)
if(!f.d)return c5
e=A.c([c8],s)
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
a6=A.c([],t.w)
a7=A.c([],t.m)
a8=A.R(s,s)
s=q.u(c9.a)
p=A.i(s).h("L<1>")
a9=A.Z(new A.L(s,p),0,A.X(c9.gZ(),"count",k),p.h("k.E")).al(0)
for(s=l.fx,m=m.b,p=d1===1,o=A.i(a9),l=o.c,o=o.h("y<1>"),k=t.x,b0=c7,b1=0;b1<e.length;++b1){b2=e[b1]
j=b2.c
b=n.i(0,j)
if(b==null)b=c5
else b=b.d.length!==0||b.a.ax!=null
if(b===!0){b=q.G(j)
b.toString
b=!c4.bJ(b,b2,b0)}else b=!1
if(b)return c5
b=d.i(0,b2.a)
b.toString
if(b1===0)a1=A.c([d0],k)
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
b8=J.l7(b8,new A.eM(c4,b2,c9,b7))}else b8=!1
if(b8)continue
for(b8=q.gM(),b9=J.G(b8.a),b8=new A.V(b9,b8.b,b8.$ti.h("V<1>")),c0=0;b8.j();){c1=b9.gn()
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
B.a.F(a6,j.b)
B.a.F(a7,j.d)
a8.F(0,j.c)
if(a6.length>s){c4.d.e=!0
return c5}}s=c4.r
s===$&&A.O()
a8.F(0,s.ag(a9,A.c([],t.Y)))
if(d3)s="\u5148\u6d3e\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u5c06\u9886\u8fdb\u653b\u524d\u6392\uff0c\u6301\u7eed\u8f6e\u653b\u5e76\u8865\u5145\u6218\u635f"
else s=p?"\u6267\u884c\u9759\u6001\u4f18\u52bf\u660e\u786e\u3001\u53ef\u4ee5\u4f9b\u517b\u7684\u6269\u5f20":"\u6574\u961f\u540e\u52e4\u51c6\u5907\u5b8c\u6210\uff0c\u6309\u771f\u5b9e\u6392\u961f\u89c4\u5219\u8f6e\u653b\uff1b\u4e0d\u9884\u6f14\u672a\u6765\u4f24\u4ea1"
return new A.d7(b0,new A.P(s,a6,a8,a7,b0.V().a,!1))},
d_(a,b,c){var s=this.c
return A.bn(a,b,s.Q,this.a,s.f,c)},
aU(a,b){return this.d_(a,b,null)}}
A.f3.prototype={
$1(a){return t.a.a(a).ga1()},
$S:16}
A.f4.prototype={
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
A.f5.prototype={
$1(a){t.a.a(a)
return a.d.length!==0||a.a.ax!=null},
$S:16}
A.fg.prototype={
$2(a,b){var s,r=t.a
r.a(a)
r.a(b)
if(a.ga1()!==b.ga1())return a.ga1()?-1:1
s=B.b.t(a.ga6(),b.ga6())
return s!==0?s:B.b.t(b.w+b.a.r*4,a.w+a.a.r*4)},
$S:35}
A.fl.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:12}
A.fm.prototype={
$2(a,b){var s,r=t.dp
r.a(a)
r.a(b)
r=a.e
s=b.e
return r!==s?B.c.t(r,s):B.b.t(b.d,a.d)},
$S:69}
A.fn.prototype={
$1(a){t.r.a(a)
return a.b===this.a.c.Q.a&&!a.fx&&a.fr},
$S:0}
A.fo.prototype={
$1(a){t.r.a(a)
return this.a.c.x!==B.o},
$S:0}
A.fp.prototype={
$1(a){var s=this.a.a.r.i(0,A.f(a))
return(s==null?null:s.d)===0},
$S:17}
A.fq.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.Q.a&&a.db&&s.x!==B.o&&!a.fx&&!this.a.a.as.p(0,a.a)},
$S:0}
A.fr.prototype={
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
A.f6.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(a.e.H(s),b.e.H(s))},
$S:4}
A.f7.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b.c
r=!1
if(a.b===s.Q.a)if(a.cy){r=this.a
s=r.a.aq(a)&&!this.c&&s.x!==B.z&&!a.fx&&!r.a.z.p(0,a.a)}else s=r
else s=r
return s},
$S:0}
A.f8.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ac(b,s.G(b.c).d<q.af(r)),A.ac(a,s.G(a.c).d<q.af(r)))},
$S:2}
A.f9.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.a
r=!1
if(a.b!==s.c.Q.a)if(this.b.av(a)){q=s.r
q===$&&A.O()
if(q.ai(a)){r=this.d.i(0,a.a)
if(r==null)r=0
s=r<s.a.w.fy}else s=r}else s=r
else s=r
return s},
$S:1}
A.fa.prototype={
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
A.fb.prototype={
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
A.fc.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:12}
A.fd.prototype={
$1(a){return A.f(a)+this.a.a.b.d.length},
$S:7}
A.fe.prototype={
$0(){return this.a.a.b.d.length},
$S:5}
A.ff.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:12}
A.fh.prototype={
$1(a){var s,r
t.q.a(a)
s=this.a
r=!1
if(a.b!==s.c.Q.a)if(this.b.av(a)){s=s.r
s===$&&A.O()
s=s.ai(a)}else s=r
else s=r
return s},
$S:1}
A.fi.prototype={
$1(a){t.r.a(a)
return a.dy&&!this.a.a.as.p(0,a.a)},
$S:0}
A.fj.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fk.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.eR.prototype={
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
A.eS.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.z.H(s),b.z.H(s))},
$S:2}
A.eH.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.eN.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.eO.prototype={
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
A.eP.prototype={
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
A.eQ.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.eW.prototype={
$1(a){var s=this.a.x.i(0,t.q.a(a).a)
if(s==null)s=null
else s=s.d.length!==0||s.a.ax!=null
return s!==!0},
$S:1}
A.eX.prototype={
$1(a){t.q.a(a)
return a.b!==this.a.c.Q.a&&this.b.av(a)},
$S:1}
A.eY.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.H(s),b.e.H(s))},
$S:4}
A.eZ.prototype={
$2(a,b){var s,r
A.ao(a)
t.q.a(b)
s=this.a.e
s===$&&A.O()
r=this.b.e
return Math.min(a,s.ac(r,b.f.X(r)))},
$S:38}
A.f_.prototype={
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
A.f0.prototype={
$1(a){t.r.a(a)
return a.cy&&a.e!==2&&!this.a.as.p(0,a.a)},
$S:0}
A.f1.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.f2.prototype={
$1(a){return t.r.a(a).x>=this.a.x},
$S:0}
A.eU.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.eV.prototype={
$1(a){var s=this
return B.a.D(s.b,new A.eT(s.a,t.O.a(a),s.c,s.d))},
$S:10}
A.eT.prototype={
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
A.eJ.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.cy){r=this.b
if(!r.as.p(0,a.a))if(r.aq(a)){s=this.a.r
s===$&&A.O()
s=s.ai(this.c)}}return s},
$S:0}
A.eK.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ac(b,s.G(b.c).d<q.af(r)),A.ac(a,s.G(a.c).d<q.af(r)))},
$S:2}
A.eL.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ac(b,s.G(b.c).d<q.af(r)),A.ac(a,s.G(a.c).d<q.af(r)))},
$S:2}
A.eM.prototype={
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
k=r.d7(j.b,a,p,Math.min(B.b.k(n),B.a.am(s.c.Q.w,new A.eI(q)).c),l,m)
return J.jo(l)&&k.b<o.w.k4||k.r||k.c<=o.w.RG||k.b<-0.12},
$S:0}
A.eI.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.ad.prototype={}
A.fs.prototype={
c0(a,b){return new A.aw(this.d3(a,b),t.dT)},
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
if(m.length!==0)if(B.a.aG(m,new A.h0(s,q))){e=q.y
e=!new A.Y(e,A.l(e).h("Y<2>")).D(0,new A.h1(r))}}p=e?3:4
break
case 3:p=5
return c.b=new A.ad(q,A.c([],t.Z),s.ad(r,q),!1,"\u5df2\u6709\u622a\u51fb\u90e8\u961f\u80fd\u53ca\u65f6\u63a5\u654c\uff0c\u7b49\u5f85\u6267\u884c\u7ed3\u679c\uff0c\u4e0d\u91cd\u590d\u6d3e\u51fa\u7b2c\u4e8c\u652f\u90e8\u961f","hold"),1
case 5:p=1
break
case 4:e=!1
if(f)if(!r.ga1())e=(i==null?null:i.a)===B.h
p=e?6:7
break
case 6:p=8
return c.b=new A.ad(q,A.c([],t.Z),s.ad(r,q),!1,"\u57ce\u9632\u4e0e\u73b0\u6709\u5b88\u5c06\u8db3\u4ee5\u5e94\u5bf9\u53ef\u89c1\u6765\u654c\uff0c\u7ef4\u6301\u8fdc\u5f81\uff0c\u4e0d\u53ec\u56de\u5c06\u9886","hold"),1
case 8:p=1
break
case 7:e=s.by(r,q)
l=A.o(e,e.$ti.h("a.E"))
e=A.i(l)
m=e.h("d<1>")
k=A.o(new A.d(l,e.h("e(1)").a(new A.h2(s,r,i,q)),m),m.h("a.E"))
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
return c.b=s.aD(r,q,j,A.c([new A.A(B.u,null,g,null,0,B.d)],t.w),"\u672c\u5730\u4ecd\u6709\u8fce\u6218\u540d\u989d\uff0c\u5148\u62db\u52df\u8865\u5f3a\uff0c\u518d\u6309\u5b9e\u9645\u5230\u4efb\u5c5e\u6027\u590d\u6838\uff0c\u6682\u4e0d\u53ec\u56de\u8fdc\u5f81"),1
case 16:p=1
break
case 15:case 13:p=17
return c.bS(l)
case 17:case 1:return 0
case 2:return c.c=n.at(-1),3}}}},
by(a,b){return new A.aw(this.cB(a,b),t.dT)},
cB(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e,d,c,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1
return function $async$by(g2,g3,g4){if(g3===1){n.push(g4)
p=o}for(;;)switch(p){case 0:f5=r.a
f6=f5.a
f7=q.L(f6)>q.O(f5)
f8=t.Z
f9=A.c([],f8)
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
return g2.b=s.aD(r,q,h,A.c([new A.A(B.m,null,f6,null,g,B.d)],t.w),"\u4f18\u5148\u7528\u56fd\u5e93\u8865\u8db3\u73b0\u6709\u5b88\u519b\u5175\u5458\uff0c\u518d\u5224\u65ad\u662f\u5426\u9700\u8981\u5916\u63f4"),1
case 8:case 7:case 5:g0=f5.ax
m=g0==null
p=m?9:10
break
case 9:f=q.P()
e=A.c([],t.w)
j=f.u(f6)
d=A.i(j)
c=d.h("d<1>")
a0=A.o(new A.d(j,d.h("e(1)").a(new A.ft()),c),c.h("a.E"))
B.a.C(a0,new A.fu())
p=a0.length!==0?11:12
break
case 11:a1=B.a.gJ(a0)
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
c=d.h("d<1>")
a5=A.o(new A.d(j,d.h("e(1)").a(new A.fv()),c),c.h("a.E"))
B.a.C(a5,new A.fD())
j=A.i(a5),d=A.Z(a5,0,A.X(3,"count",t.S),j.c),c=d.$ti,d=new A.r(d,d.gl(0),c.h("r<k.E>")),a3=f5.db,a4=f5.ay,a6=f5.d,a7=t.T,a8=t.w,a9=t.e,b0=j.h("e(1)"),j=j.h("d<1>"),c=c.h("k.E")
case 20:if(!d.j()){p=21
break}b1=d.d
if(b1==null)b1=c.a(b1)
if(!f9.a2()){p=21
break}b2=q.P()
e=A.c([],a8)
b3=A.c([b1],a9)
B.a.F(b3,new A.d(a5,b0.a(new A.fE(b1)),j))
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
c1=b8.h("d<1>")
a0=A.o(new A.d(b7,b8.h("e(1)").a(new A.fF()),c1),c1.h("a.E"))
B.a.C(a0,new A.fG())
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
if(!b9.aL(f5,B.a.gJ(a0)))break
B.a.m(c0,new A.A(B.l,B.a.gJ(a0).a,f6,null,0,B.d));++c2}b8=b9.L(f6)
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
c=d.h("d<1>")
c3=A.o(new A.d(j,d.h("e(1)").a(new A.fH(q)),c),c.h("a.E"))
B.a.C(c3,new A.fI())
if(g1){g1=r.f
g1=(g1==null?null:g1.a)!==B.h}else g1=!0
p=g1&&s.a.Q.gM().gl(0)>1?35:36
break
case 35:c4=q.P()
g1=r.f
if((g1==null?null:g1.a)===B.r)c4.ax.m(0,f6)
c5=A.c([],f8)
g1=s.a.Q
j=g1.gM()
d=j.$ti
c=d.h("d<a.E>")
c6=A.o(new A.d(j,d.h("e(a.E)").a(new A.fJ(f5)),c),c.h("a.E"))
B.a.C(c6,new A.fK(f5))
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
case 39:d9=new A.bS(c5,b4.a(new A.fw()),b7).E(0,0,new A.fx(s),b8)
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
e1=new A.fL(s,q)
g1=s.a.Q
j=g1.r
d=A.i(j)
c=d.h("d<1>")
e2=A.o(new A.d(j,d.h("e(1)").a(new A.fy(s,q,e1,e0)),c),c.h("a.E"))
B.a.C(e2,new A.fz(e1,f5))
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
case 44:e8=new A.a0(j,c1.a(new A.fA()),c7).ak(0,new A.fB(s))
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
return g2.b=new A.ad(e4,A.c([d8.b],f8),s.ad(r,e4)-A.ak(d5)*0.08,!1,"","recall"),1
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
return g2.b=new A.ad(f1,A.c([d8.b],f8),s.ad(r,f1)+80-A.ak(d5)*0.08,f7,"","recall"),1
case 55:case 54:p=51
break
case 52:p=42
break
case 43:if(g1.gM().gl(0)===1)l=(d4?null:b7.a)===B.r&&c3.length>1
else l=!1
p=l?56:57
break
case 56:l=g1.f,k=A.i(l),j=k.h("d<1>"),j=A.ke(new A.d(l,k.h("e(1)").a(new A.fC(s)),j),3,j.h("a.E")),k=j.a,j=new A.bc(k.gB(k),j.b,A.l(j).h("bc<1>"))
case 58:if(!j.j()){p=59
break}l=j.gn()
if(!f9.a2()){p=59
break}b6=B.a.gJ(c3)
d8=c.co(q,b6,a4.ao(b6,l.e,g1,!0,l),r.ga6(),!0,"\u4fdd\u7559\u539f\u57ce\u5b88\u519b\u62d6\u5ef6\uff0c\u6838\u5fc3\u5728\u5371\u9669\u7a97\u53e3\u524d\u593a\u53d6\u7a7a\u57ce\u5efa\u7acb\u65b0\u636e\u70b9","newBase",l)
p=d8!=null?60:61
break
case 60:l=d8.a
k=A.c([d8.b],f8)
d=s.ad(r,l)
a3=A.ak(b6)
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
r=s.h("p?(1)").a(new A.fT(m))
q=c.z.df(b.z).E(0,0,new A.fU(m),t.i)
p=c.P()
o=A.o(d,t.T)
s=A.o(new A.cf(new A.a0(d,r,s.h("a0<1,p?>")),t.cO),t.r)
r=a.d
n=A.i(r)
B.a.F(s,new A.a0(r,n.h("p(1)").a(new A.fV()),n.h("a0<1,p>")))
n=a.a
s=A.c([new A.P(e,o,m.e.ag(s,A.c([n],t.Y)),B.q,c.ae(!0).a,!0)],t.Z)
o=m.ad(a,c)
r=Math.max(0,b.d-c.d)
if(c.L(n.a)<=c.O(n)){n=m.a5(a,c)
n=(n==null?null:n.a)!==B.h}else n=!0
return new A.ad(p,s,o-q*0.65-r*0.2,n,"","local")},
cL(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=b.y,s=new A.ai(s,s.r,s.e,A.l(s).h("ai<2>")),r=this.e,q=a.a,p=q.a,o=this.a.Q,n=o.b,m=b.z,l=this.b.w.d,k=a.b;s.j();){j=s.d
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
if(!(s.ax!=null||B.a.D(a.d,new A.fM())))return!1
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
for(o=b4.y,o=new A.ai(o,o.r,o.e,A.l(o).h("ai<2>")),n=t.N,m=t.z,l=t.n,k=b0.e.c,j=b0.a.Q,i=j.b,h=b4.z,g=b0.b,f=g.w.d;o.j();){e=o.d
if(!e.as||e.d!==r||e.y<i)continue
d=j.a0(e.a)
if(d==null||d.fx||d.id!=null||d.f<=0||h.p(0,d.a)||B.a.D(q,new A.fP(d)))continue
c=d.z
for(e=J.lc(e.w,e.x),b=e.$ti,e=new A.r(e,e.gl(0),b.h("r<k.E>")),b=b.h("k.E"),a=0;e.j();c=a1){a0=e.d
a1=a0==null?b.a(a0):a0
a+=k.ac(c,a1)}if(!isFinite(a)||a+f>=b3.ga6())continue
p=Math.min(b4.f,p+d.gN())
e=A.ae(d.I(),n,m)
e.v(0,"hp",d.r)
e.v(0,"troops",A.c([],l))
e.v(0,"s",0)
B.a.m(q,A.jV(e))}B.a.C(q,new A.fQ())
o=A.i(q)
n=t.r
a2=A.aC(new A.d(q,o.h("e(1)").a(new A.fR(b3)),o.h("d<1>")),n)
m=A.c([],t.e)
if(a2!=null)m.push(a2)
o=o.h("L<1>")
B.a.F(m,new A.L(q,o).bw(0,o.h("e(k.E)").a(new A.fS(a2))))
a3=A.Z(m,0,A.X(b4.O(s),"count",t.S),n).al(0)
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
s=new A.d(o,s.h("e(1)").a(new A.fN()),s.h("d<1>")).E(0,0,new A.fO(),t.H)
o=this.a.Q.gM().gl(0)===1?400:0
r=150+p.r*4+a.w*0.5+s+o
q=this.a5(a,b)
p=n===0?r*2:0
o=q==null?null:q.b
if(o==null)o=-0.8
return-m*5000-p+o*r}}
A.h0.prototype={
$1(a){return this.a.cL(t.O.a(a),this.b)},
$S:10}
A.h1.prototype={
$1(a){t.J.a(a)
return a.f&&B.a.D(this.a.d,new A.h_(a))},
$S:11}
A.h_.prototype={
$1(a){return t.O.a(a).a.a===this.a.r},
$S:10}
A.h2.prototype={
$1(a){var s,r,q,p,o,n=this
t.cs.a(a)
s=!1
if(a.f==="local"){r=a.b
if(r.length!==0)if(B.a.D(r,new A.fY())){q=a.a
p=n.b
o=p.a
if(q.L(o.a)<=q.O(o)){s=n.a
q=s.a5(p,q)
q=q==null?null:q.b
if(q==null)q=-1
o=n.c
o=o==null?null:o.b
s=(q>(o==null?-1:o)+0.04||B.a.D(r,new A.fZ()))&&a.c>s.ad(p,n.d)}}}return s},
$S:40}
A.fY.prototype={
$1(a){return B.a.D(t.I.a(a).b,new A.fX())},
$S:30}
A.fX.prototype={
$1(a){var s=t.T.a(a).a
return s===B.l||s===B.m||s===B.E},
$S:18}
A.fZ.prototype={
$1(a){return B.a.D(t.I.a(a).d,new A.fW())},
$S:30}
A.fW.prototype={
$1(a){return t.J.a(a).b==="intercept"},
$S:11}
A.ft.prototype={
$1(a){return t.r.a(a).dy},
$S:0}
A.fu.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fv.prototype={
$1(a){t.r.a(a)
return a.dx&&a.e!==2},
$S:0}
A.fD.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.ak(a),A.ak(b))},
$S:2}
A.fE.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fF.prototype={
$1(a){return t.r.a(a).dy},
$S:0}
A.fG.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fH.prototype={
$1(a){t.r.a(a)
return a.cy&&!this.a.as.p(0,a.a)},
$S:0}
A.fI.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ak(s.a(b)),A.ak(a))},
$S:2}
A.fJ.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:1}
A.fK.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.H(s),b.e.H(s))},
$S:4}
A.fw.prototype={
$1(a){return t.I.a(a).d},
$S:43}
A.fx.prototype={
$2(a,b){var s
A.ao(a)
s=this.a.a.Q.a0(t.J.a(b).a)
s.toString
return a+A.ak(s)},
$S:68}
A.fL.prototype={
$1(a){var s,r,q=this.a.a.Q,p=this.b
if(A.jK(a,q,p)==null){p=p.y
s=a.a
r=p.i(0,s)
if((r==null?null:r.b)==="intercept"){p=p.i(0,s)
q=q.a0(p==null?null:p.r)
q=q==null?null:q.f
q=(q==null?0:q)>0}else q=!1}else q=!0
return q},
$S:0}
A.fy.prototype={
$1(a){var s,r,q,p,o=this
t.r.a(a)
s=!1
if(a.b===o.a.a.Q.a)if(a.db)if(!a.fx){r=o.b
q=a.a
p=r.y.i(0,q)
if((p==null?null:p.as)!==!0)if(!r.as.p(0,q))s=!o.c.$1(a)||o.d}return s},
$S:0}
A.fz.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a
if(!J.az(s.$1(a),s.$1(b)))return s.$1(a)?1:-1
s=this.b.e
return B.b.t(a.z.H(s),b.z.H(s))},
$S:2}
A.fA.prototype={
$1(a){return t.O.a(a).a},
$S:19}
A.fB.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.kK(a,s)>A.kK(b,s)?a:b},
$S:27}
A.fC.prototype={
$1(a){var s
t.q.a(a)
s=this.a.a.Q
return a.b!==s.a&&s.u(a.a).length===0},
$S:1}
A.fT.prototype={
$1(a){return this.a.a.Q.a0(t.T.a(a).b)},
$S:47}
A.fU.prototype={
$2(a,b){var s
A.ao(a)
s=this.a.a.Q.a0(A.J(b))
s.toString
return a+A.ak(s)},
$S:48}
A.fV.prototype={
$1(a){return t.O.a(a).a},
$S:19}
A.fM.prototype={
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
A.fP.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fQ.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.fR.prototype={
$1(a){return t.r.a(a).a===this.a.a.CW},
$S:0}
A.fS.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fN.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.fO.prototype={
$2(a,b){return A.x(a)+A.ak(t.r.a(b))},
$S:49}
A.t.prototype={
I(){return A.c([this.a,this.b],t.n)},
H(a){var s=this.a-a.a,r=this.b-a.b
return Math.sqrt(s*s+r*r)},
aH(a,b){var s=this.a,r=this.b
return new A.t(s+(a.a-s)*b,r+(a.b-r)*b)}}
A.ei.prototype={
X(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this.a,f=B.a.gJ(g)
for(s=a.a,r=a.b,q=1/0,p=0;o=g.length,p<o;){n=g[p];++p
m=g[p%o]
o=n.a
l=m.a-o
k=n.b
j=m.b-k
i=n.aH(m,B.b.A(((s-o)*l+(r-k)*j)/(l*l+j*j),0,1))
h=i.H(a)
if(h<q){q=h
f=i}}return f},
p(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(this.X(b).H(b)<1e-7)return!0
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
return s.length===0?null:B.a.ak(s,B.B)},
c2(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.a,g=b.a-h,f=a.b,e=b.b-f,d=A.c([],t.n)
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
c3(a,b){var s=a.H(b),r=s<1e-7?new A.t(a.a+4096,a.b+0):a.aH(b,4096/s),q=this.c2(a,r)
return q.length===0?this.X(b):a.aH(r,B.a.ak(q,B.A))}}
A.am.prototype={
aR(){return"AiArmyState."+this.b}}
A.p.prototype={
gN(){var s=this.at,r=A.i(s)
return new A.d(s,r.h("e(1)").a(new A.dw()),r.h("d<1>")).gl(0)},
gbl(){return this.f+B.a.E(this.at,0,new A.dv(),t.H)},
I(){var s,r,q,p,o,n,m,l=this,k=l.z,j=t.n
k=A.c([k.a,k.b],j)
s=l.Q
s=A.c([s.a,s.b],j)
r=l.ch
r=r==null?null:A.c([r.a,r.b],j)
q=A.c([],t.A)
for(p=l.p1,o=p.length,n=0;n<p.length;p.length===o||(0,A.v)(p),++n){m=p[n]
q.push(A.c([m.a,m.b],j))}return A.Q(["id",l.a,"c",l.b,"home",l.c,"o",l.d,"t",l.e,"hp",l.f,"max",l.r,"a",l.w,"p",l.x,"pay",l.y,"xy",k,"v",s,"s",l.as.a,"troops",l.at,"w",l.ax,"m",l.ay,"to",r,"target",l.CW,"return",l.cx,"dispatch",l.cy,"move",l.db,"dismiss",l.dx,"upgrade",l.dy,"retreat",l.fr,"marked",l.fx,"rev",l.fy,"orderRev",l.go,"opponent",l.id,"clashes",l.k1,"received",l.k2,"dealt",l.k3,"opening",l.k4,"weaponReady",l.ok,"returnPath",q,"regionCity",l.p2,"salaryPaidMonth",l.p3,"movementPending",l.p4],t.N,t.X)}}
A.dw.prototype={
$1(a){return A.ao(a)>0},
$S:14}
A.dv.prototype={
$2(a,b){return A.x(a)+A.ao(b)},
$S:15}
A.D.prototype={
gZ(){var s,r=this,q=r.ax
if(q==null)q=r.d
else{s=r.db?1:0
s=B.c.A(q-r.ay-s,0,5)
q=s}return q},
I(){var s,r,q,p,o,n=this,m=n.e,l=t.n
m=A.c([m.a,m.b],l)
s=A.c([],t.A)
for(r=n.f.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.v)(r),++p){o=r[p]
s.push(A.c([o.a,o.b],l))}return A.Q(["id",n.a,"c",n.b,"native",n.c,"level",n.d,"xy",m,"outline",s,"income",n.r,"baseIncome",n.z,"poor",n.w,"cap",n.x,"recruitCap",n.y,"recruit",n.Q,"upgrade",n.as,"rev",n.at,"initial",n.ax,"wins",n.ay,"attacker",n.ch,"defender",n.CW,"stage",n.cx,"next",n.cy,"fallen",n.db,"danger",n.dx],t.N,t.X)}}
A.b2.prototype={
I(){var s,r,q=this,p=t.N,o=t.S,n=A.R(p,o)
for(s=q.x.gah(),s=s.gB(s);s.j();){r=s.gn()
n.v(0,""+r.a,r.b)}o=A.R(p,o)
for(s=q.y.gah(),s=s.gB(s);s.j();){r=s.gn()
o.v(0,""+r.a,r.b)}return A.Q(["id",q.a,"gold",q.b,"reserves",q.c,"capacity",q.d,"salary",q.e,"poor",q.f,"baseIncome",q.r,"garrisonAccrued",q.w,"stock",n,"hate",o],p,t.X)}}
A.ea.prototype={
gaj(){return B.a.am(this.w,new A.eg(this))},
gM(){var s=this.f,r=A.i(s)
return new A.d(s,r.h("e(1)").a(new A.eh(this)),r.h("d<1>"))},
u(a){var s=this.r,r=A.i(s),q=r.h("d<1>")
s=A.o(new A.d(s,r.h("e(1)").a(new A.ed(this,a)),q),q.h("a.E"))
B.a.C(s,new A.ee())
return s},
a0(a){var s=this.r,r=A.i(s)
return A.aC(new A.d(s,r.h("e(1)").a(new A.ef(a)),r.h("d<1>")),t.r)},
G(a){var s=this.f,r=A.i(s)
return A.aC(new A.d(s,r.h("e(1)").a(new A.eb(a)),r.h("d<1>")),t.q)},
I(){var s,r,q,p,o=this,n=t.d,m=A.c([],n)
for(s=o.f,r=s.length,q=0;q<r;++q)m.push(s[q].I())
s=A.c([],n)
for(r=o.r,p=r.length,q=0;q<p;++q)s.push(r[q].I())
n=A.c([],n)
for(r=o.w,p=r.length,q=0;q<p;++q)n.push(r[q].I())
return A.Q(["country",o.a,"tick",o.b,"month",o.e,"cities",m,"heroes",s,"countries",n,"pool",o.x,"salary",o.y,"year",o.c,"monthIndex",o.d],t.N,t.X)}}
A.eg.prototype={
$1(a){return t.t.a(a).a===this.a.a},
$S:6}
A.eh.prototype={
$1(a){return t.q.a(a).b===this.a.a},
$S:1}
A.ed.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b
if(a.c===s){r=a.as
s=(r===B.f||r===B.e)&&a.f>0&&a.b===B.a.am(this.a.f,new A.ec(s)).b}else s=!1
return s},
$S:0}
A.ec.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.ee.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.ef.prototype={
$1(a){return t.r.a(a).a===this.a},
$S:0}
A.eb.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.hg.prototype={
ct(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
for(s=this.b,r=s.y,r=new A.ai(r,r.r,r.e,A.l(r).h("ai<2>")),q=this.f,p=this.a,o=p.a,n=s.z,s=s.Q;r.j();){m=r.d
l=p.a0(m.a)
k=p.G(m.d)
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
J.l6(q.cd(k.a,new A.hi()),l)}},
gaX(){var s,r,q,p=this,o=p.d
if(o==null||p.f.a!==0)return o
s=new A.hm(p)
r=p.a
if(A.aS(o,r,p.c,null).ga3())return s.$1(o)?o:null
r=r.f
q=A.i(r)
return new A.a0(r,q.h("b(1)").a(new A.hk()),q.h("a0<1,b>")).dF(0).D(0,new A.hl(p,s))?null:o},
gcc(){var s,r=this
if(r.gaX()!=null){s=r.a.G(r.e)
s=s==null?null:s.b
s=s==r.gaX()}else s=!1
return s?r.e:null},
gY(){var s=this.f,r=A.l(s).h("a7<1>"),q=A.o(new A.a7(s,r),r.h("a.E"))
B.a.C(q,new A.hq(this))
return A.aC(q,t.S)},
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
d9(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c="soldierLimit",b=d.a,a=b.G(a0)
a.toString
s=d.f.i(0,a0)
if(s==null)s=A.c([],t.e)
r=s.length
q=d.b.Q
p=d.c.b
o=0
n=0
for(;n<s.length;s.length===r||(0,A.v)(s),++n){m=s[n]
if(q.p(0,m.a)){l=p.i(0,c)
l.toString
k=B.b.k(l)}else k=m.gN()
o+=d.bM(m,k,0)}j=B.a.am(b.w,new A.hj(a)).c
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
A.hh.prototype={
$1(a){var s=t.q.a(a).b
return s===this.a&&s!==this.b.a},
$S:1}
A.hi.prototype={
$0(){return A.c([],t.e)},
$S:50}
A.hm.prototype={
$1(a){var s=this.a,r=s.a.f,q=A.i(r)
return new A.d(r,q.h("e(1)").a(new A.ho(a)),q.h("d<1>")).D(0,new A.hp(s))},
$S:17}
A.ho.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.hp.prototype={
$1(a){var s
t.q.a(a)
s=this.a
return s.a.gM().D(0,new A.hn(s,a))},
$S:1}
A.hn.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.b.c.ac(r,this.b.f.X(r))<=s.c.w.at},
$S:1}
A.hk.prototype={
$1(a){return t.q.a(a).b},
$S:51}
A.hl.prototype={
$1(a){var s
A.f(a)
s=this.a
return A.aS(a,s.a,s.c,null).ga3()&&this.b.$1(a)},
$S:17}
A.hq.prototype={
$2(a,b){var s,r
A.f(a)
A.f(b)
s=this.a.f
r=B.c.t(s.i(0,b).length,s.i(0,a).length)
return r!==0?r:B.c.t(a,b)},
$S:24}
A.hj.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.d7.prototype={}
A.hr.prototype={
ai(a){var s=this.a.Q
return!A.aS(a.b,s,this.b,null).ga3()||s.gM().gl(0)>=3||s.gM().D(0,new A.hu(this,a))},
bp(a,b,c,d){var s,r,q=a.as
if(!(q===B.f||q===B.e)){q=a.ax
s=t.x
return q.length===0?A.c([],s):A.c([q],s)}r=this.bh(b,a)
if(r.length===0)return A.c([],t.x)
return A.c([A.c([B.a.gJ(r).a],t.b)],t.x)},
bh(a,b){var s=this.b.r.gb_(),r=A.l(s),q=r.h("d<a.E>"),p=A.o(new A.d(s,r.h("e(a.E)").a(new A.hs(this,a,b)),q),q.h("a.E"))
B.a.C(p,new A.ht(a))
return p},
cX(a){return this.bh(a,null)},
aY(a,b,c,d){var s,r,q,p,o,n,m,l,k,j=this
if(a===0||b.gZ()<3||j.a.Q.u(b.a).length<2)return a
s=A.aC(j.bh(c,d),t.o)
r=s==null?null:s.b
if(r==null)r=0
s=j.a.Q.r
q=A.i(s)
p=q.h("e(1)")
q=q.h("d<1>")
o=new A.d(s,p.a(new A.hx(j)),q).E(0,0,new A.hy(),t.S)
n=d.z
m=j.c.ac(n,b.f.X(n))
l=new A.d(s,p.a(new A.hz(j,o,m,b,c)),q).gl(0)
k=Math.max(0,c.d-c.V().a-20)
s=j.b
q=s.b.i(0,"soldierLimit")
q.toString
return Math.max(a,Math.min(s.w.fy,Math.min(l,B.c.aP(k,Math.max(1,r+B.b.k(q))))))},
de(a){var s,r,q,p,o,n=this.a.Q
if(n.c<3)return 1
s=A.aC(this.cX(a),t.o)
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
s=A.R(s,s)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.v)(a),++q){p=a[q]
s.v(0,"h:"+p.a,p.fy)}for(r=b.length,q=0;q<b.length;b.length===r||(0,A.v)(b),++q){o=b[q]
s.v(0,"c:"+o.a,o.at)}return s},
ap(b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=this,a9=null
t.L.a(b8)
s=c3==="intercept"
if(s){r=b1.as
r=r===B.f||r===B.e}else r=!1
if(r)return a9
if(!b2.d||!isFinite(b2.b)||J.jo(b2.a)||b1.fx||b0.as.p(0,b1.a))return a9
r=b2.b
q=a8.b
p=q.w
o=p.d
n=r+o
if(n>=b5)return a9
m=c3==="expedition"
if(m)l=!a8.ai(c4)
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
h=J.cz(i)
i=h.gaz(i)&&h.gaA(i).H(J.la(b2.a))<32&&b1.as!==B.n}}}}if(i)return a9}g=b0.P()
f=A.c([],t.w)
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
a3=A.R(q,q)
for(q=b8.length,p=g.w,e=e.x===B.o,a4=0;a4<b8.length;b8.length===q||(0,A.v)(b8),++a4){a5=b8[a4]
a3.aK(a5,new A.hA(),new A.hB())
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
B.a.m(f,new A.A(B.E,l,s,J.jU(a),0,b8))}else{if(!g.dw(b1,a1))return a9
if(s||a.length>1)s=a9
else s=r
B.a.m(f,new A.A(B.P,l,s,J.jU(a),0,B.d))}a6=g.ae(b6).a
a7=B.a.D(f,new A.hC())
if(a7&&g.d<a6)return a9
s=A.c([b1],t.e)
if(!i)s.push(b7)
r=d.G(b1.c)
r.toString
r=A.c([r],t.Y)
r.push(c4)
s=a8.ag(s,r)
r=A.c([a1],t.m)
return new A.d7(g,new A.P(c2,f,s,r,a7?a6:g.d,b6))},
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
r=s.G(a4.c)
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
a0=A.o(new A.d(A.c([(m-a)/j,(m+a)/j],t.n),t.db.a(new A.hv()),g),g.h("a.E"))
if(a0.length!==0)b=B.a.ak(a0,B.B)}for(m=s.f,a1=B.t,a2=0;a2<3;++a2){a3=new A.t(q+l*b,r+k*b)
if(!h.p(0,a3)||B.a.D(m,new A.hw(a3)))return B.t
a1=i.dE(a4,a3,s)
if(!a1.d)return a1
j=a1.b
if(Math.abs(b-j)<0.1)break
b=(b+j)/2}return a1}}
A.hu.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.c.ac(r,this.b.f.X(r))<=s.b.w.at},
$S:1}
A.hs.prototype={
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
A.ht.prototype={
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
A.hx.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a.Q.a&&!a.fx},
$S:0}
A.hy.prototype={
$2(a,b){return Math.max(A.f(a),t.r.a(b).w)},
$S:9}
A.hz.prototype={
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
A.hA.prototype={
$1(a){return A.f(a)+1},
$S:7}
A.hB.prototype={
$0(){return 1},
$S:5}
A.hC.prototype={
$1(a){return t.T.a(a).a===B.v},
$S:18}
A.hv.prototype={
$1(a){return A.ao(a)>=0},
$S:14}
A.hw.prototype={
$1(a){return t.q.a(a).f.p(0,this.a)},
$S:1}
A.aE.prototype={
aR(){return"AiDecisionStage."+this.b}}
A.al.prototype={
aR(){return"AiActionKind."+this.b}}
A.A.prototype={
I(){var s=this,r=s.d
r=r==null?null:A.c([r.a,r.b],t.n)
return A.Q(["kind",s.a.a,"hero",s.b,"city",s.c,"point",r,"amount",s.e,"weapons",s.f],t.N,t.X)}}
A.a5.prototype={
I(){var s,r,q,p,o,n=this,m=A.c([],t.A)
for(s=n.w,r=s.length,q=t.n,p=0;p<s.length;s.length===r||(0,A.v)(s),++p){o=s[p]
m.push(A.c([o.a,o.b],q))}return A.Q(["hero",n.a,"role",n.b,"deadline",n.y,"commit",n.z,"city",n.d,"enemy",n.r,"points",m,"leg",n.x,"gold",n.Q,"slot",n.as,"rearStaging",n.at,"reason",n.c,"order",n.ax,"targetCountry",n.e,"attrition",n.f],t.N,t.X)}}
A.P.prototype={
I(){var s,r,q,p=this,o=t.d,n=A.c([],o)
for(s=p.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)n.push(s[q].I())
o=A.c([],o)
for(s=p.d,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)o.push(s[q].I())
return A.Q(["reason",p.a,"actions",n,"deps",p.c,"tasks",o,"floor",p.e,"emergency",p.f],t.N,t.X)}}
A.br.prototype={
I(){var s,r,q,p=this,o=A.c([],t.d)
for(s=p.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)o.push(s[q].I())
return A.Q(["phase",p.a,"target",p.b,"gold",p.c,"heroes",p.d,"groups",o,"notes",p.f,"limited",p.r,"assessments",p.w,"routeSteps",p.x,"expansions",p.y],t.N,t.X)}}
A.el.prototype={
I(){var s,r,q,p=this,o=p.Q.I(),n=A.c([],t.d)
for(s=p.as,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)n.push(s[q].I())
return A.Q(["protocol",1,"session",p.a,"id",p.d,"rules",p.b,"map",p.c,"observation",o,"deadline",p.e,"tasks",n,"seed",p.f,"priority",p.r,"idle",p.w,"stage",p.x.b,"offensiveCountry",p.y,"offensiveCity",p.z],t.N,t.X)}}
A.ek.prototype={
I(){var s=this
return A.Q(["protocol",1,"session",s.a,"id",s.d,"country",s.e,"rules",s.b,"map",s.c,"tick",s.f,"deadline",s.r,"plan",s.x.I(),"micros",s.w,"error",s.y],t.N,t.X)}}
A.j3.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.j4.prototype={
$0(){var s=this,r=s.a,q=r.c,p=!1
if(s.b.length!==0)if(q!=null)if(!q.r){p=s.c
p=p.f>=p.r*0.5&&q.c>0&&q.b>=s.d.w.ch}if(p)return new A.aM([!0,q.b,1,q.c])
return new A.aM([!1,r.b,0,r.a])},
$S:54}
A.jh.prototype={
$1(a){t.cJ.a(a)
return this.a.H(a.a)>this.b+a.b},
$S:55}
A.ji.prototype={
$1(a){t.fg.a(a)
return!a.b&&this.a.H(a.a)>this.b},
$S:56}
A.hG.prototype={
ds(i4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1=this,i2=null,i3={}
i3.a=i4
s=i1.a
r=s.Q
q=i1.e
p=new A.Y(q,A.l(q).h("Y<2>")).D(0,new A.hJ())
o=t.Z
n=A.c([],o)
m=A.c([],t.dZ)
i3.b=i3.c=!1
l=i1.b
k=s.y
s=s.z
j=A.c7(r,i4,l,s,k)
i=r.r
h=A.i(i)
g=h.h("e(1)")
h=h.h("d<1>")
f=A.o(new A.d(i,g.a(new A.hK(r)),h),h.h("a.E"))
B.a.C(f,new A.hL())
e=r.f
d=A.i(e)
c=d.h("e(1)")
d=d.h("d<1>")
b=d.h("a.E")
a=A.o(new A.d(e,c.a(new A.hW(i1,r,j)),d),b)
if(f.length!==0)B.a.C(a,new A.i6(i1,f,r))
a0=A.aC(a,t.q)
a1=i4.ce(a)
a2=a0==null
a3=a2?i2:A.aS(a0.b,r,l,i2)
a4=!p
if(a4)a5=(a3==null?i2:a3.ga3())===!0
else a5=!1
a6=new A.hI(i1,a5?Math.min(B.b.aw(a3.c*a3.gaV()),Math.max(0,i4.d-i4.V().a)):0)
a7=new A.hH(i3,i1,n)
a8=r.gM()
a9=A.o(a8,a8.$ti.h("a.E"))
B.a.C(a9,new A.i9(i3,i1))
a5=t.S
b0=Math.min(i3.a.f,B.a.E(a9,0,new A.ia(i3,i1),a5))
if(a9.length!==0&&b0>i3.a.e){b1=i3.a.P()
b2=Math.min(b0-b1.e,b1.gbT())
if(b2>0&&b1.aE(b2))a7.$4(b1,A.c([new A.A(B.m,i2,B.a.gJ(a9).a,i2,b2,B.d)],t.w),"\u4f18\u5148\u7528\u73b0\u6709\u4f59\u989d\u8865\u5145\u5b88\u5c06\u548c\u5f85\u51fa\u5f81\u5c06\u9886\u7684\u5175\u5458\uff0c\u4e70\u5f97\u8d77\u591a\u5c11\u8865\u591a\u5c11\uff0c\u4e0d\u900f\u652f",B.a.gJ(a9))}for(a8=a9.length,b3=l.w,b4=b3.fx,b5=b4-2,b6=t.w,b7=0;b8=a9.length,b7<b8;a9.length===a8||(0,A.v)(a9),++b7){b9=a9[b7]
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
c2=c0.h("d<1>")
c4=A.o(new A.d(c1,c0.h("e(1)").a(new A.ib()),c2),c2.h("a.E"))
B.a.C(c4,new A.ic())
if(c4.length===0)continue
c5=B.a.gJ(c4)
b1=i3.a.P()
if(b1.aL(b9,c5)&&b1.d>=b1.ae(!0).a)a7.$6$emergency$hero(b1,A.c([new A.A(B.l,c5.a,b8,i2,0,B.d)],b6),"\u9632\u5fa1\u7b56\u7565\u53d1\u73b0\u6765\u654c\uff0c\u4f18\u5148\u63d0\u9ad8\u5fc5\u8981\u57ce\u9632\uff0c\u5347\u7ea7\u540e\u4ecd\u4fdd\u7559\u4f59\u989d",b9,!0,c5)}c6=new A.ig(i3,i1,b0,a0,a6,r,a7)
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
d1=new A.d(i,g.a(new A.id(i3,r,Math.max(12,new A.d(i,g.a(new A.ie(r)),h).E(0,0,new A.hM(),a5)*0.8))),h).gl(0)
d2=d0>=2&&d1+i3.a.at.a<d0&&B.a.D(e,new A.hN(r))
if(d2){d3=b9.a
d4=q.i(0,d3)
if(d4==null)d4=i2
else d4=d4.d.length!==0||d4.a.ax!=null
d3=d4!==!0&&i3.a.u(d3).length>=b9.y}else d3=!1
if(d3){d3=i3.a.u(b9.a)
d4=A.i(d3)
d5=d4.h("d<1>")
d6=A.o(new A.d(d3,d4.h("e(1)").a(new A.hO(i3,i1)),d5),d5.h("a.E"))
B.a.C(d6,new A.hP())
if(d6.length!==0){b1=i3.a.P()
d7=B.a.gJ(d6)
if(b1.c4(d7))a7.$5$hero(b1,A.c([new A.A(B.D,d7.a,i2,i2,0,B.d)],b6),"\u5b89\u5168\u540e\u65b9\u6e05\u7406\u4f4e\u4ef7\u503c\u5197\u4f59\u7f16\u5236\uff0c\u4fdd\u7559\u5b9e\u9645\u5b88\u5c06\u548c\u5185\u653f\u5c06\u9886\uff0c\u4e3a\u5f3a\u653b\u4e3b\u529b\u8865\u5458",b9,d7)}}d3=b9.a
c1=i3.a.u(d3)
d4=A.i(c1)
d5=d4.h("d<1>")
c4=A.o(new A.d(c1,d4.h("e(1)").a(new A.hQ()),d5),d5.h("a.E"))
B.a.C(c4,new A.hR())
if(c1.length!==0&&c0.gaz(c0)){d8=B.a.ak(c1,new A.hS())
d4=c0.gb_()
d5=A.l(d4)
d9=d5.h("d<a.E>")
e0=A.o(new A.d(d4,d5.h("e(a.E)").a(new A.hT(r)),d9),d9.h("a.E"))
B.a.C(e0,new A.hU())
e1=A.o(new A.d(e,c.a(new A.hV(i3,i1,r,d8)),d),b)
B.a.C(e1,new A.hX(i1,d8,r))
e2=e1.length===0?0:2
d4=A.i(e1)
d5=d4.h("y<1>")
d9=new A.y(e1,0,3,d5)
d9.U(e1,0,3,d4.c)
d9=new A.r(d9,d9.gl(0),d5.h("r<k.E>"))
d5=d5.h("k.E")
while(d9.j()){d4=d9.d
if(d4==null)d4=d5.a(d4)
if(e0.length===0)e3=A.c([],c8)
else{e3=c2.i(0,"carryLimit")
e3.toString
e3=A.hb(B.b.k(e3),B.a.gJ(e0).a,!1,a5)}e3=A.j2(d8,d4,r,l,c3,e3,0).a[2]
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
if(d4){if(B.a.D(e,new A.hY(r)))if(!d2)if(c1.length!==0)d4=e4>0&&i3.a.bW(d3)<i3.a.a7(b9)+e4
else d4=!0
else d4=!0
else d4=e5
e5=d4}}if(c4.length!==0)if(b9.ax==null){d4=c1.length
d5=i3.a.x.i(0,d3)
d9=!0
if(d5==null)d5=b9.d
if(d4<=d5)if(!B.a.D(c1,new A.hZ())){if(e5){d4=c1.length
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
if(d4!==!0)B.a.m(m,new A.bk(b9,B.a.gJ(c4)))}if(e5&&!i3.b){d3=q.i(0,d3)
if(d3==null)d3=i2
else d3=d3.d.length!==0||d3.a.ax!=null
c6.$2$defense(b9,d3===!0)}}e6=A.c([],t.e)
for(i=a9.length,b7=0;b7<a9.length;a9.length===i||(0,A.v)(a9),++b7){b9=a9[b7]
h=b9.a
g=q.i(0,h)
if(g==null)g=i2
else g=g.d.length!==0||g.a.ax!=null
if(g===!0)continue
c1=i3.a.u(h)
h=A.i(c1)
g=h.h("d<1>")
e7=A.o(new A.d(c1,h.h("e(1)").a(new A.i_(i3)),g),g.h("a.E"))
B.a.C(e7,new A.i0())
h=A.f(Math.max(0,c1.length-i3.a.a7(b9)))
g=A.i(e7)
a8=new A.y(e7,0,h,g.h("y<1>"))
a8.U(e7,0,h,g.c)
B.a.F(e6,a8)}B.a.C(e6,new A.i1())
e8=i2
e9=i2
f0=0
f1=1
if(e6.length!==0&&!i3.c&&a4){d7=B.a.gJ(e6)
f2=A.c7(r,i3.a,l,s,k)
e1=A.o(new A.d(e,c.a(new A.i2(i3,i1,r)),d),b)
B.a.C(e1,new A.i3(i1,d7,r))
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
f6=A.o(new A.d(e6,g.a(new A.i4(i1,c)),e),d)
if(f6.length===0)break A
d7=B.a.gJ(f6)
for(b=b8.bp(d7,i3.a,c,c3),a4=b.length,a8=c.e,f7=c.a,b7=0;b7<b.length;b.length===a4||(0,A.v)(b),++b7){e0=b[b7]
f8={}
f9=A.j2(d7,c,r,l,c3,e0,0)
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
g5=A.c([],b6)
g7=1/0
g8=0
g9=0
for(;;){g6=!1
if(!(g9<g2)){g6=!0
break}if(!(g9<f6.length))return A.m(f6,g9)
h0=f6[g9]
if(A.j2(h0,c,r,l,c3,e0,0).a[2]===0)break
h1=k.aJ(h0,a8,r,c)
c0=h1.b
g7=Math.min(g7,c0)
g8=Math.max(g8,c0)
if(!h1.d||g8-g7>i)break
h2=B.a.E(a9,0,new A.i5(f8,i1,h0),a5)
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
B.a.F(g5,new A.d(c0,c8.h("e(1)").a(new A.i7()),c8.h("d<1>")));++g9}if(!g6)continue
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
if(g5.length!==0){c=r.G(d7.c)
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
if(B.a.E(n,0,new A.i8(),a5)>=b4)break
b1=i3.a.P()
if(b1.aL(b9,c5)&&a6.$2$civilian(b1,!0))a7.$5$hero(b1,A.c([new A.A(B.l,c5.a,b9.a,i2,0,B.d)],b6),"\u5b8c\u6210\u519b\u9700\u5b89\u6392\u540e\u7528\u4f59\u94b1\u5347\u7ea7\u57ce\u9632\uff0c\u4ecd\u4fdd\u7559\u6708\u4ff8\u4e0e\u5468\u8f6c\u4f59\u989d",b9,c5)}q=e9==null
h6=r.G(q?e8:e9)
if(h6==null)h6=a0
h7=h6==null?i2:A.aS(h6.b,r,l,i3.a.x)
h8=A.c([],o)
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
i=A.c([],t.s)
if(p)i.push("\u4e3b\u89d2\u6240\u5728\u57ce\u5b58\u5728\u660e\u786e\u98ce\u9669\uff0c\u519b\u8d39\u4f18\u5148\u7528\u4e8e\u5b88\u519b\u4e0e\u57ce\u9632\uff0c\u6682\u505c\u8fdb\u653b\u6b66\u5668\u91c7\u8d2d")
if(n.length===0)i.push("\u672c\u8f6e\u65e0\u5fc5\u8981\u4e14\u53ef\u652f\u4ed8\u7684\u91c7\u8d2d\uff0c\u4fdd\u7559\u56fd\u5e93")
if((h7==null?i2:h7.ga3())===!0)i.push("\u76ee\u6807\u56fd\u5360\u6709 "+h7.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.aw(h7.c*h7.gaV())+" \u91d1\u5e01\uff0c\u51c6\u5907\u5f3a\u5316\u6b66\u5668\u548c\u8f6e\u653b\u5175\u529b")
return new A.br(s,q,f0,f1,h8,i,o,l,k,c3)}}
A.hJ.prototype={
$1(a){return t.a.a(a).ga1()},
$S:16}
A.hK.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&a.f>0&&!a.fx},
$S:0}
A.hL.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.hW.prototype={
$1(a){t.q.a(a)
return a.b!==this.b.a&&this.c.av(a)&&this.a.c.ai(a)},
$S:1}
A.i6.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bn(o.a(b),B.a.gJ(s),r,p,q,null),A.bn(a,B.a.gJ(s),r,p,q,null))},
$S:4}
A.hI.prototype={
$2$civilian(a,b){var s=a.d,r=Math.max(a.V().a,this.a.b.w.f)
return s>=r+(b?this.b:0)},
$1(a){return this.$2$civilian(a,!1)},
$S:57}
A.hH.prototype={
$6$emergency$hero(a,b,c,d,e,f){var s,r
t.f3.a(b)
this.a.a=a
s=this.b
r=A.c([],t.e)
if(f!=null)r.push(f)
r=s.c.ag(r,A.c([d],t.Y))
s=e?a.ae(!0).a:Math.max(a.V().a,s.b.w.f)
B.a.m(this.c,new A.P(c,b,r,B.q,s,e))},
$4(a,b,c,d){return this.$6$emergency$hero(a,b,c,d,!1,null)},
$5$hero(a,b,c,d,e){return this.$6$emergency$hero(a,b,c,d,!1,e)},
$S:58}
A.i9.prototype={
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
A.ia.prototype={
$2(a,b){var s,r
A.f(a)
t.q.a(b)
s=this.a.a.u(b.a).length
r=this.b.b.b.i(0,"soldierLimit")
r.toString
return a+s*B.b.k(r)},
$S:8}
A.ib.prototype={
$1(a){return t.r.a(a).dy},
$S:0}
A.ic.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.ig.prototype={
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
if(b)k.b=!0}return!1}k=A.c([],t.w)
if(s)k.push(new A.A(B.m,l,j,l,n,B.d))
k.push(new A.A(B.u,l,j,l,0,B.d))
j=b?"\u4f18\u5148\u8865\u5145\u672c\u56fd\u5b88\u57ce\u7f3a\u53e3\uff0c\u5e76\u5907\u9f50\u65b0\u5c06\u5175\u5458\u4e0e\u6708\u4ff8":"\u5b88\u57ce\u7f3a\u53e3\u5df2\u4f18\u5148\u5904\u7406\uff0c\u518d\u8865\u524d\u7ebf\u8fdb\u653b\u5c06\u9886\u53ca\u5176\u5175\u5458"
m.r.$4(r,k,j,a)
return!0},
$S:59}
A.ie.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&!a.fx},
$S:0}
A.hM.prototype={
$2(a,b){return Math.max(A.f(a),t.r.a(b).w)},
$S:9}
A.id.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.b===this.b.a)if(!a.fx){r=this.a
if(!r.a.z.p(0,a.a))if(a.f>=a.r*0.65)if(a.w>=this.c){s=a.as
s=!(s===B.f||s===B.e)||r.a.aq(a)}}return s},
$S:0}
A.hN.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.hO.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.dx){r=this.b.b
if(a.w<=r.w.p4){s=a.x
r=r.b.i(0,"drawCost")
r.toString
s=s<=B.b.k(r)&&s<15&&this.a.a.aq(a)}}return s},
$S:0}
A.hP.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.ak(a),A.ak(b))},
$S:2}
A.hQ.prototype={
$1(a){return t.r.a(a).dy},
$S:0}
A.hR.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.hS.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return A.ac(a,!0)>A.ac(b,!0)?a:b},
$S:27}
A.hT.prototype={
$1(a){t.o.a(a)
return a.f&&a.d===0&&this.a.c>=a.e},
$S:20}
A.hU.prototype={
$2(a,b){var s=t.o
s.a(a)
return B.c.t(s.a(b).c,a.c)},
$S:26}
A.hV.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.c7(s,this.a.a,r.b,q.z,q.y).av(a)&&r.c.ai(a)}else s=!1
return s},
$S:1}
A.hX.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bn(o.a(b),s,r,p,q,null),A.bn(a,s,r,p,q,null))},
$S:4}
A.hY.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.hZ.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.i_.prototype={
$1(a){t.r.a(a)
return a.cy&&this.a.a.aq(a)},
$S:0}
A.i0.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.i1.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.i2.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.c7(s,this.a.a,r.b,q.z,q.y).av(a)&&r.c.ai(a)}else s=!1
return s},
$S:1}
A.i3.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bn(o.a(b),s,r,p,q,null),A.bn(a,s,r,p,q,null))},
$S:4}
A.i4.prototype={
$1(a){t.r.a(a)
return this.a.c.ai(this.b)},
$S:0}
A.i5.prototype={
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
A.i7.prototype={
$1(a){return t.T.a(a).a===B.v},
$S:18}
A.i8.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:12}
A.bp.prototype={}
A.em.prototype={
ac(b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=b1.a,a7=b1.b,a8=A.w(b0.a)+","+A.w(b0.b)+":"+A.w(a6)+","+A.w(a7),a9=a5.d
if(a9.a_(a8)){a6=a9.i(0,a8)
a6.toString
return a6}for(s=a5.a,r=s.b,q=s.c,p=r+q+8,o=r-1,--q,n=a5.b,m=n.b,n=n.e,s=s.d,l=s.length,k=n.length,j=a5.c,i=b0,h=0,g=0;g<p;++g){f=i.H(b1)
if(f<1e-7){if(a9.a>=256){e=new A.a7(a9,A.l(a9).h("a7<1>")).gB(0)
if(!e.j())A.b0(A.aB())
a9.an(0,e.gn())}a9.v(0,a8,h)
return h}if(!j.dA())return 1/0
d=i.a
c=(a6-d)/f
b=i.b
a=(a7-b)/f
a0=B.c.A(B.b.W((d+c*1e-7)/16),0,o)
a1=B.c.A(B.b.W((b+a*1e-7)/16),0,q)
a2=new A.en()
a3=a2.$3(d,c,a0)
a2=a2.$3(b,a,a1)
a4=Math.min(f,Math.min(A.j5(a3),A.j5(a2)))
a2=m.i(0,"marchSpeed")
a2.toString
a3=a1*r+a0
if(!(a3>=0&&a3<l))return A.m(s,a3)
a3=s[a3]
if(!(a3<k))return A.m(n,a3)
h+=a4/(a2*n[a3])
i=new A.t(d+c*a4,b+a*a4)}return 1/0},
ao(a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=b0.G(a8.c),a5=a8.as,a6=(a5===B.f||a5===B.e)&&a4!=null?a4.f.c3(a4.e,a9):a8.z,a7=b2==null?a9:b2.f.bU(a6,a9)
a5=this.a
if(!a5.p(0,a7))return B.t
s=new A.eo(b0,a8,b2)
r=new A.eq(this,b0,a8)
q=t._
p=A.c([A.c([a7],q)],t.a5)
if(!s.$2(a6,a7))o=b1&&r.$2(a6,a7)
else o=!0
if(o){n=a6.H(a7)
o=a6.a
m=a7.a
l=(o+m)/2
k=a6.b
j=a7.b
i=(k+j)/2
if(n>0)for(h=[-96,96,-192,192],k=(j-k)/n,o=(m-o)/n,g=0;g<4;++g){f=h[g]
e=new A.t(l-k*f,i+o*f)
if(a5.p(0,e))B.a.m(p,A.c([e,a7],q))}}for(a5=p.length,d=null,g=0;g<p.length;p.length===a5||(0,A.v)(p),++g){c=p[g]
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
if(d==null||a0<d.b)d=new A.bp(c,a0,!0)}return d==null?B.U:d},
aJ(a,b,c,d){return this.ao(a,b,c,!1,d)},
dE(a,b,c){return this.ao(a,b,c,!1,null)}}
A.en.prototype={
$3(a,b,c){var s
if(Math.abs(b)<1e-12)s=1/0
else s=Math.max(1e-8,((b>0?c+1:c)*16-a)/b)
return s},
$S:60}
A.eo.prototype={
$2(a,b){return B.a.D(this.a.f,new A.ep(this.b,this.c,a,b))},
$S:31}
A.ep.prototype={
$1(a){var s,r=this
t.q.a(a)
if(a.b!==r.a.b){s=r.b
s=s==null?null:s.a
s=a.a!==s&&a.f.c6(r.c,r.d)!=null}else s=!1
return s},
$S:1}
A.eq.prototype={
$2(a,b){return B.a.D(this.b.r,new A.er(this.a,this.c,b,a))},
$S:31}
A.er.prototype={
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
l=B.b.A(((k.a-q)*p+(k.b-o)*n)/m,0,1)}s=r.aH(s,l).H(a.z)
r=j.a.b.b.i(0,"encounterDistance")
r.toString
return s<r+12},
$S:0}
A.ap.prototype={
I(){var s=this
return A.c([s.a,s.b,s.c,s.d,s.e,s.f,s.r],t.Q)}}
A.es.prototype={
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
I(){var s,r,q,p=this,o=A.c([],t.eG)
for(s=p.r.gb_(),s=s.gB(s),r=t.Q;s.j();){q=s.gn()
o.push(A.c([q.a,q.b,q.c,q.d,q.e,q.f,q.r],r))}return A.Q(["version",p.a,"values",p.b,"upgrades",p.c,"defenseBonuses",p.d,"movement",p.e,"field",p.f,"weapons",o,"tuning",p.w.I()],t.N,t.X)}}
A.e9.prototype={
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
A.eu.prototype={
dt(a){var s,r,q,p,o,n,m,l,k,j,i,h=this
try{s=t.d1.a(B.i.da(a,null))
switch(J.aR(s,"kind")){case"init":if(!J.az(J.aR(s,"protocol"),1)||!J.az(J.aR(s,"build"),"39a6eab2"))throw A.j(B.ab);++h.f
h.e=null
o=h.r
if(o.a>0){o.b=o.c=o.d=o.e=o.f=null
o.a=0
o.b5()}r=J.aR(s,"gameConfig")
o=t.f
if(!o.b(r))throw A.j(B.a6)
n=t.N
m=t.z
A.lz(A.ae(r,n,m))
h.c=A.lj(A.ae(o.a(J.aR(s,"rules")),n,m))
m=A.ae(o.a(J.aR(s,"map")),n,m)
o=A.J(m.i(0,"version"))
l=A.f(m.i(0,"width"))
k=A.f(m.i(0,"height"))
m=A.bt(t.R.a(m.i(0,"terrain")),!0,t.S)
j=new Uint8Array(A.mx(m))
if(l<=0||k<=0||m.length!==l*k)A.b0(B.ad)
h.d=new A.e9(o,l,k,j)
h.a.$1(B.i.au(t.G.a(A.Q(["kind","ready","rules",h.c.a,"map",o,"backend",h.b],n,t.X)),null))
break
case"cancel":o=h.e
n=J.aR(s,"id")
if(o==null?n==null:o===n)h.r.m(0,A.f(J.aR(s,"id")))
break
case"plan":if(h.c==null||h.d==null||h.e!=null){o=A.kc("AI \u5c1a\u672a\u5c31\u7eea\u6216\u5df2\u6709\u8bf7\u6c42\u6267\u884c\u4e2d")
throw A.j(o)}q=A.lh(A.ae(t.f.a(J.aR(s,"request")),t.N,t.z))
h.e=q.d
h.aT(q,h.f)
break
default:throw A.j(B.ac)}}catch(i){p=A.aQ(i)
h.a.$1(B.i.au(t.G.a(A.Q(["kind","error","message",J.b1(p)],t.N,t.X)),null))}},
aT(a,b){return this.cU(a,b)},
cU(a3,a4){var s=0,r=A.mS(t.p),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
var $async$aT=A.n6(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:a1=new A.ii()
$.jS()
a1.bu()
m=a1
p=4
i=n.c
i.toString
h=n.d
h.toString
g=new A.et(i.w)
f=new A.eG(i,h,a3,g,A.R(t.S,t.a))
e=t.N
h=new A.em(h,i,g,A.R(e,t.i))
f.e=h
f.f=new A.eD(i,g,A.R(e,t.cM))
f.r=new A.hr(a3,i,h)
l=f
k=0
i=l.bv(),h=i.$ti,i=new A.aN(i.a(),h.h("aN<1>")),h=h.c,g=n.r,d=a3.d,c=t.p
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
if(b.b==null)b.b=$.hF.$0()
s=11
return A.mp(A.lx(B.H,c),$async$aT)
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
n.a.$1(B.i.au(t.G.a(A.Q(["kind","reply","reply",A.jX(a3,i,null,m.gc5()).I()],e,t.X)),null))
p=2
s=6
break
case 4:p=3
a2=o.pop()
j=A.aQ(a2)
if(a4!==n.f){s=1
break}n.e=null
i=A.c(["\u89c4\u5212\u5931\u8d25\uff0c\u4e3b\u73af\u5883\u4fdd\u7559\u6709\u9650\u5b89\u5168\u4fdd\u62a4"],t.s)
h=m.gc5()
n.a.$1(B.i.au(t.G.a(A.Q(["kind","reply","reply",A.jX(a3,new A.br("preparing",null,0,1,B.M,i,!1,0,0,0),J.b1(j),h).I()],t.N,t.X)),null))
s=6
break
case 3:s=2
break
case 6:case 1:return A.mr(q,r)
case 2:return A.mq(o.at(-1),r)}})
return A.ms($async$aT,r)}}
A.jj.prototype={
$1(a){t.r.a(a)
return a.w*3+a.f*0.35+a.gN()*8},
$S:23}
A.jk.prototype={
$1(a){var s
t.r.a(a)
if(a.c===this.a.a){s=a.as
s=!(s===B.f||s===B.e)}else s=!1
return s},
$S:0}
A.jl.prototype={
$2(a,b){var s
A.ao(a)
t.r.a(b)
s=A.ak(b)
return a+s*(b.id==null?0.12:0.03)},
$S:28}
A.a4.prototype={}
A.ar.prototype={
ga1(){var s=this,r=!1
if(B.a.D(s.b,new A.ey()))if(s.a.ax!=null||B.a.D(s.d,new A.ez())){r=s.r
r=r==null||r.a!==B.h}return r},
ga6(){var s,r=this.a
if(r.ax!=null)r=r.dx
else{r=this.d
if(r.length===0)r=1/0
else{s=A.i(r)
s=new A.a0(r,s.h("h(1)").a(new A.ex()),s.h("a0<1,h>")).ak(0,B.B)
r=s}}return r}}
A.ey.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.ez.prototype={
$1(a){return t.O.a(a).c>=0.55},
$S:10}
A.ex.prototype={
$1(a){return t.O.a(a).b},
$S:63}
A.ik.prototype={
dz(c4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8=this,b9="marchSpeed",c0=b8.a,c1=c4.a,c2=c0.u(c1),c3=A.c([],t.ay)
for(s=c0.r,r=s.length,q=c4.e,p=c4.f,o=b8.b,n=o.b,o=o.w.b,m=q.a,l=q.b,k=c4.ch,j=c4.b,i=0;i<r;++i){h=s[i]
if(h.b!==j){g=h.as
g=g===B.f||g===B.e||h.f<=0}else g=!0
if(g)continue
if(h.a===k){B.a.m(c3,new A.a4(h,0,1))
continue}if(h.fx)continue
g=h.z
f=g.H(q)
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
if(p.X(a4).H(a4)>48)continue}d=n.i(0,b9)
d.toString
a5=A.nl(q,o,e,d,p,g,new A.il(b8),c)
if(a5==null)continue
if(h.as===B.n||a1)g=0.35
else if(a2>0.8)g=1
else g=f<72?0.9:0.55
B.a.m(c3,new A.a4(h,a5,g))}B.a.C(c3,new A.im())
c1=A.i(c2)
r=t.r
a6=A.aC(new A.d(c2,c1.h("e(1)").a(new A.io(c4)),c1.h("d<1>")),r)
q=A.c([],t.e)
if(a6!=null)q.push(a6)
c1=c1.h("L<1>")
B.a.F(q,new A.L(c2,c1).bw(0,c1.h("e(k.E)").a(new A.ip(a6))))
c1=t.S
a7=A.Z(q,0,A.X(c4.gZ(),"count",c1),r).al(0)
a8=A.R(t.N,c1)
a9=B.a.am(c0.w,new A.iq(c4)).c
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
return new A.ar(c4,c2,c3,b2,b3,new A.d(s,c0.h("e(1)").a(new A.ir(c4)),c0.h("d<1>")).E(0,0,new A.is(),t.i))}}
A.il.prototype={
$2(a,b){var s=this.a,r=s.c,q=r.ac(a,b)
if(!isFinite(q)&&r.c.e){r=a.H(b)
s=s.b.b.i(0,"marchSpeed")
s.toString
s=r/s}else s=q
return s},
$S:64}
A.im.prototype={
$2(a,b){var s,r=t.O
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.p.t(a.a.a,b.a.a):B.b.t(r,s)},
$S:65}
A.io.prototype={
$1(a){return t.r.a(a).a===this.a.CW},
$S:0}
A.ip.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.iq.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.ir.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=!1
if(a.b===s.b)if(a.c===s.a){s=a.as
s=!(s===B.f||s===B.e)&&!a.fx}else s=r
else s=r
return s},
$S:0}
A.is.prototype={
$2(a,b){return A.ao(a)+A.ak(t.r.a(b))},
$S:28}
A.et.prototype={
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
A.je.prototype={
$1(a){A.J(a)
return A.iX(v.G.self).postMessage(a)},
$S:66}
A.jf.prototype={
$1(a){return this.a.dt(A.J(A.iX(a).data))},
$S:67};(function aliases(){var s=J.aV.prototype
s.cs=s.q
s=A.a.prototype
s.bw=s.dH})();(function installTearOffs(){var s=hunkHelpers._static_0,r=hunkHelpers._static_1,q=hunkHelpers.installStaticTearOff
s(A,"mR","lL",5)
r(A,"n8","lY",13)
r(A,"n9","lZ",13)
r(A,"na","m_",13)
s(A,"kG","n1",3)
r(A,"nd","mv",22)
r(A,"nb","nB",0)
q(A,"nw",2,null,["$1$2","$2"],["kO",function(a,b){return A.kO(a,b,t.H)}],29,0)
q(A,"nv",2,null,["$1$2","$2"],["kN",function(a,b){return A.kN(a,b,t.H)}],29,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.z,null)
q(A.z,[A.jt,J.cR,A.ca,J.b4,A.C,A.ih,A.a,A.r,A.c1,A.V,A.bT,A.bc,A.bQ,A.cg,A.K,A.aD,A.bu,A.bL,A.ch,A.a6,A.it,A.hf,A.bR,A.cn,A.F,A.h9,A.b8,A.ai,A.c0,A.at,A.dj,A.iU,A.iS,A.df,A.aN,A.aq,A.be,A.W,A.dg,A.dp,A.ct,A.bx,A.dm,A.bh,A.E,A.cs,A.cH,A.cK,A.iN,A.cL,A.dh,A.d5,A.cb,A.iz,A.ag,A.a9,A.aa,A.dq,A.ii,A.by,A.ew,A.b3,A.eA,A.bK,A.eD,A.cB,A.av,A.eG,A.ad,A.fs,A.t,A.ei,A.p,A.D,A.b2,A.ea,A.hg,A.d7,A.hr,A.A,A.a5,A.P,A.br,A.el,A.ek,A.hG,A.bp,A.em,A.ap,A.es,A.e9,A.eu,A.a4,A.ar,A.ik,A.et])
q(J.cR,[J.cT,J.bV,J.bX,J.bW,J.bY,J.bs,J.b7])
q(J.bX,[J.aV,J.u,A.bv,A.c4])
q(J.aV,[J.d6,J.bz,J.aU])
r(J.cS,A.ca)
r(J.h4,J.u)
q(J.bs,[J.bU,J.cU])
q(A.C,[A.c_,A.aK,A.cV,A.de,A.da,A.di,A.bZ,A.cD,A.aA,A.ce,A.dd,A.cc,A.cI])
q(A.a,[A.n,A.as,A.d,A.bS,A.bb,A.cf,A.bg,A.aw])
q(A.n,[A.k,A.a7,A.Y,A.aH])
q(A.k,[A.y,A.a0,A.L,A.dl])
r(A.bO,A.as)
r(A.bP,A.bb)
q(A.aD,[A.bA,A.bj])
r(A.bk,A.bA)
q(A.bj,[A.aM,A.bB])
r(A.bD,A.bu)
r(A.cd,A.bD)
r(A.bM,A.cd)
r(A.bN,A.bL)
q(A.a6,[A.cQ,A.cF,A.cG,A.dc,A.ja,A.jc,A.iw,A.iv,A.iY,A.iJ,A.hc,A.dx,A.dV,A.dz,A.dS,A.e8,A.e2,A.e3,A.e4,A.e5,A.e0,A.dC,A.dD,A.dF,A.dJ,A.dI,A.dK,A.dM,A.dO,A.dR,A.dQ,A.dT,A.dA,A.dX,A.dZ,A.eB,A.f3,A.f4,A.f5,A.fn,A.fo,A.fp,A.fq,A.fr,A.f7,A.f9,A.fd,A.fh,A.fi,A.fk,A.eR,A.eH,A.eN,A.eP,A.eQ,A.eW,A.eX,A.f0,A.f2,A.eU,A.eV,A.eT,A.eJ,A.eM,A.eI,A.h0,A.h1,A.h_,A.h2,A.fY,A.fX,A.fZ,A.fW,A.ft,A.fv,A.fE,A.fF,A.fH,A.fJ,A.fw,A.fL,A.fy,A.fA,A.fC,A.fT,A.fV,A.fM,A.fP,A.fR,A.fS,A.fN,A.dw,A.eg,A.eh,A.ed,A.ec,A.ef,A.eb,A.hh,A.hm,A.ho,A.hp,A.hn,A.hk,A.hl,A.hj,A.hu,A.hs,A.hx,A.hz,A.hA,A.hC,A.hv,A.hw,A.j3,A.jh,A.ji,A.hJ,A.hK,A.hW,A.hI,A.hH,A.ib,A.ig,A.ie,A.id,A.hN,A.hO,A.hQ,A.hT,A.hV,A.hY,A.hZ,A.i_,A.i2,A.i4,A.i7,A.en,A.ep,A.er,A.jj,A.jk,A.ey,A.ez,A.ex,A.io,A.ip,A.iq,A.ir,A.je,A.jf])
r(A.b6,A.cQ)
q(A.cF,[A.hD,A.ix,A.iy,A.iT,A.h3,A.iA,A.iF,A.iE,A.iC,A.iB,A.iI,A.iH,A.iG,A.iR,A.j0,A.dy,A.e7,A.dU,A.dB,A.fe,A.hi,A.hB,A.j4])
r(A.c6,A.aK)
q(A.dc,[A.db,A.bq])
q(A.F,[A.aG,A.dk])
q(A.cG,[A.h5,A.jb,A.iZ,A.j1,A.iK,A.ha,A.he,A.iO,A.e6,A.e1,A.dE,A.dG,A.dH,A.dL,A.dN,A.dP,A.dW,A.dY,A.e_,A.eC,A.eE,A.eF,A.j9,A.fg,A.fl,A.fm,A.f6,A.f8,A.fa,A.fb,A.fc,A.ff,A.fj,A.eS,A.eO,A.eY,A.eZ,A.f_,A.f1,A.eK,A.eL,A.fu,A.fD,A.fG,A.fI,A.fK,A.fx,A.fz,A.fB,A.fU,A.fQ,A.fO,A.dv,A.ee,A.hq,A.ht,A.hy,A.hL,A.i6,A.i9,A.ia,A.ic,A.hM,A.hP,A.hR,A.hS,A.hU,A.hX,A.i0,A.i1,A.i3,A.i5,A.i8,A.eo,A.eq,A.jl,A.il,A.im,A.is])
q(A.c4,[A.cX,A.bw])
q(A.bw,[A.ci,A.ck])
r(A.cj,A.ci)
r(A.c2,A.cj)
r(A.cl,A.ck)
r(A.c3,A.cl)
q(A.c2,[A.cY,A.cZ])
q(A.c3,[A.d_,A.d0,A.d1,A.d2,A.d3,A.c5,A.d4])
r(A.bC,A.di)
r(A.dn,A.ct)
r(A.cm,A.bx)
r(A.au,A.cm)
r(A.cW,A.bZ)
r(A.h6,A.cH)
q(A.cK,[A.h8,A.h7])
r(A.iM,A.iN)
q(A.aA,[A.c8,A.cP])
q(A.dh,[A.b5,A.am,A.aE,A.al])
s(A.ci,A.E)
s(A.cj,A.K)
s(A.ck,A.E)
s(A.cl,A.K)
s(A.bD,A.cs)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{b:"int",h:"double",a3:"num",I:"String",e:"bool",aa:"Null",q:"List",z:"Object",a8:"Map",M:"JSObject"},mangledNames:{},types:["e(p)","e(D)","b(p,p)","~()","b(D,D)","b()","e(b2)","b(b)","b(b,D)","b(b,p)","e(a4)","e(a5)","b(b,P)","~(~())","e(h)","h(a3,h)","e(ar)","e(b)","e(A)","p(a4)","e(ap)","aa()","@(@)","h(p)","b(b,b)","~(z?,z?)","b(ap,ap)","p(p,p)","h(h,p)","0^(0^,0^)<a3>","e(P)","e(t,t)","aa(@)","@(I)","aa(z,aW)","b(ar,ar)","+(t,h)(D)","e()","h(h,D)","h(D)","e(ad)","~(@,@)","h(h,t)","q<a5>(P)","@(@,I)","a3(a3,b)","~(b,@)","p?(A)","h(h,I)","h(a3,p)","q<p>()","b(D)","aa(~())","aa(@,aW)","+breakthrough,lower,teamSize,upper(e,h,b,h)()","e(+(t,h))","e(+(t,e))","e(b3{civilian:e})","~(b3,q<A>,I,D{emergency:e,hero:p?})","e(D{defense!e})","h(h,h,b)","~(@)","+(t,e)(p)","h(a4)","h(t,t)","b(a4,a4)","~(I)","~(M)","h(h,a5)","b(av,av)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.bk&&a.b(c.a)&&b.b(c.b),"4;breakthrough,lower,teamSize,upper":a=>b=>b instanceof A.aM&&A.kQ(a,b.a),"4;high,low,selfHigh,selfLow":a=>b=>b instanceof A.bB&&A.kQ(a,b.a)}}
A.mj(v.typeUniverse,JSON.parse('{"aU":"aV","d6":"aV","bz":"aV","nI":"bv","cT":{"e":[],"B":[]},"bV":{"B":[]},"bX":{"M":[]},"aV":{"M":[]},"u":{"q":["1"],"n":["1"],"M":[],"a":["1"]},"cS":{"ca":[]},"h4":{"u":["1"],"q":["1"],"n":["1"],"M":[],"a":["1"]},"b4":{"H":["1"]},"bs":{"h":[],"a3":[]},"bU":{"h":[],"b":[],"a3":[],"B":[]},"cU":{"h":[],"a3":[],"B":[]},"b7":{"I":[],"B":[]},"c_":{"C":[]},"n":{"a":["1"]},"k":{"n":["1"],"a":["1"]},"y":{"k":["1"],"n":["1"],"a":["1"],"a.E":"1","k.E":"1"},"r":{"H":["1"]},"as":{"a":["2"],"a.E":"2"},"bO":{"as":["1","2"],"n":["2"],"a":["2"],"a.E":"2"},"c1":{"H":["2"]},"a0":{"k":["2"],"n":["2"],"a":["2"],"a.E":"2","k.E":"2"},"d":{"a":["1"],"a.E":"1"},"V":{"H":["1"]},"bS":{"a":["2"],"a.E":"2"},"bT":{"H":["2"]},"bb":{"a":["1"],"a.E":"1"},"bP":{"bb":["1"],"n":["1"],"a":["1"],"a.E":"1"},"bc":{"H":["1"]},"bQ":{"H":["1"]},"cf":{"a":["1"],"a.E":"1"},"cg":{"H":["1"]},"L":{"k":["1"],"n":["1"],"a":["1"],"a.E":"1","k.E":"1"},"bk":{"bA":[],"aD":[]},"aM":{"bj":[],"aD":[]},"bB":{"bj":[],"aD":[]},"bM":{"cd":["1","2"],"bD":["1","2"],"bu":["1","2"],"cs":["1","2"],"a8":["1","2"]},"bL":{"a8":["1","2"]},"bN":{"bL":["1","2"],"a8":["1","2"]},"bg":{"a":["1"],"a.E":"1"},"ch":{"H":["1"]},"cQ":{"a6":[],"aF":[]},"b6":{"a6":[],"aF":[]},"c6":{"aK":[],"C":[]},"cV":{"C":[]},"de":{"C":[]},"cn":{"aW":[]},"a6":{"aF":[]},"cF":{"a6":[],"aF":[]},"cG":{"a6":[],"aF":[]},"dc":{"a6":[],"aF":[]},"db":{"a6":[],"aF":[]},"bq":{"a6":[],"aF":[]},"da":{"C":[]},"aG":{"F":["1","2"],"k6":["1","2"],"a8":["1","2"],"F.K":"1","F.V":"2"},"a7":{"n":["1"],"a":["1"],"a.E":"1"},"b8":{"H":["1"]},"Y":{"n":["1"],"a":["1"],"a.E":"1"},"ai":{"H":["1"]},"aH":{"n":["a9<1,2>"],"a":["a9<1,2>"],"a.E":"a9<1,2>"},"c0":{"H":["a9<1,2>"]},"bA":{"aD":[]},"bj":{"aD":[]},"bv":{"M":[],"B":[]},"c4":{"M":[]},"cX":{"M":[],"B":[]},"bw":{"ah":["1"],"M":[]},"c2":{"E":["h"],"q":["h"],"ah":["h"],"n":["h"],"M":[],"a":["h"],"K":["h"]},"c3":{"E":["b"],"q":["b"],"ah":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"]},"cY":{"E":["h"],"q":["h"],"ah":["h"],"n":["h"],"M":[],"a":["h"],"K":["h"],"B":[],"E.E":"h","K.E":"h"},"cZ":{"E":["h"],"q":["h"],"ah":["h"],"n":["h"],"M":[],"a":["h"],"K":["h"],"B":[],"E.E":"h","K.E":"h"},"d_":{"E":["b"],"q":["b"],"ah":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"],"B":[],"E.E":"b","K.E":"b"},"d0":{"E":["b"],"q":["b"],"ah":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"],"B":[],"E.E":"b","K.E":"b"},"d1":{"E":["b"],"q":["b"],"ah":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"],"B":[],"E.E":"b","K.E":"b"},"d2":{"E":["b"],"q":["b"],"ah":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"],"B":[],"E.E":"b","K.E":"b"},"d3":{"E":["b"],"q":["b"],"ah":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"],"B":[],"E.E":"b","K.E":"b"},"c5":{"E":["b"],"q":["b"],"ah":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"],"B":[],"E.E":"b","K.E":"b"},"d4":{"jB":[],"E":["b"],"q":["b"],"ah":["b"],"n":["b"],"M":[],"a":["b"],"K":["b"],"B":[],"E.E":"b","K.E":"b"},"di":{"C":[]},"bC":{"aK":[],"C":[]},"aN":{"H":["1"]},"aw":{"a":["1"],"a.E":"1"},"aq":{"C":[]},"W":{"aT":["1"]},"ct":{"kh":[]},"dn":{"ct":[],"kh":[]},"au":{"bx":["1"],"k8":["1"],"jz":["1"],"n":["1"],"a":["1"]},"bh":{"H":["1"]},"F":{"a8":["1","2"]},"bu":{"a8":["1","2"]},"cd":{"bD":["1","2"],"bu":["1","2"],"cs":["1","2"],"a8":["1","2"]},"bx":{"jz":["1"],"n":["1"],"a":["1"]},"cm":{"bx":["1"],"jz":["1"],"n":["1"],"a":["1"]},"dk":{"F":["I","@"],"a8":["I","@"],"F.K":"I","F.V":"@"},"dl":{"k":["I"],"n":["I"],"a":["I"],"a.E":"I","k.E":"I"},"bZ":{"C":[]},"cW":{"C":[]},"h":{"a3":[]},"b":{"a3":[]},"q":{"n":["1"],"a":["1"]},"dh":{"cM":[]},"cD":{"C":[]},"aK":{"C":[]},"aA":{"C":[]},"c8":{"C":[]},"cP":{"C":[]},"ce":{"C":[]},"dd":{"C":[]},"cc":{"C":[]},"cI":{"C":[]},"d5":{"C":[]},"cb":{"C":[]},"dq":{"aW":[]},"by":{"lS":[]},"b5":{"cM":[]},"am":{"cM":[]},"aE":{"cM":[]},"al":{"cM":[]},"lC":{"q":["b"],"n":["b"],"a":["b"]},"jB":{"q":["b"],"n":["b"],"a":["b"]},"lW":{"q":["b"],"n":["b"],"a":["b"]},"lA":{"q":["b"],"n":["b"],"a":["b"]},"lU":{"q":["b"],"n":["b"],"a":["b"]},"lB":{"q":["b"],"n":["b"],"a":["b"]},"lV":{"q":["b"],"n":["b"],"a":["b"]},"lv":{"q":["h"],"n":["h"],"a":["h"]},"lw":{"q":["h"],"n":["h"],"a":["h"]}}'))
A.mi(v.typeUniverse,JSON.parse('{"n":1,"bw":1,"cm":1,"cH":2,"cK":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.cy
return{T:s("A"),q:s("D"),I:s("P"),t:s("b2"),a9:s("aE"),r:s("p"),c1:s("t"),bJ:s("bp"),o:s("ap"),J:s("a5"),u:s("aq"),a:s("ar"),cM:s("bK"),cs:s("ad"),U:s("n<@>"),V:s("C"),bo:s("bS<P,a5>"),h:s("aF"),O:s("a4"),E:s("b6<h>"),W:s("a<D>"),ef:s("a<p>"),er:s("a<a5>(P)"),R:s("a<@>"),w:s("u<A>"),Y:s("u<D>"),Z:s("u<P>"),eu:s("u<b2>"),e:s("u<p>"),_:s("u<t>"),k:s("u<ap>"),m:s("u<a5>"),bL:s("u<ar>"),ay:s("u<a4>"),a5:s("u<q<t>>"),eG:s("u<q<z>>"),A:s("u<q<h>>"),x:s("u<q<b>>"),d:s("u<a8<I,z?>>"),Q:s("u<z>"),dZ:s("u<+(D,p)>"),s:s("u<I>"),bQ:s("u<av>"),n:s("u<h>"),gn:s("u<@>"),b:s("u<b>"),v:s("bV"),B:s("M"),cj:s("aU"),aU:s("ah<@>"),f3:s("q<A>"),bd:s("q<p>"),j:s("q<@>"),L:s("q<b>"),d1:s("a8<I,@>"),f:s("a8<@,@>"),G:s("a8<I,z?>"),P:s("aa"),K:s("z"),gT:s("nJ"),bY:s("+()"),fg:s("+(t,e)"),cJ:s("+(t,h)"),l:s("aW"),N:s("I"),aQ:s("y<av>"),dm:s("B"),eK:s("aK"),ak:s("bz"),eO:s("d<p>"),eq:s("d<h>"),cO:s("cf<p>"),c:s("W<@>"),dp:s("av"),dT:s("aw<ad>"),gL:s("aw<b>"),y:s("e"),aO:s("e(p)"),al:s("e(z)"),db:s("e(h)"),i:s("h"),z:s("@"),fO:s("@()"),D:s("@(z)"),C:s("@(z,aW)"),S:s("b"),eH:s("aT<aa>?"),an:s("M?"),bM:s("q<@>?"),eg:s("q<b>?"),X:s("z?"),dk:s("I?"),F:s("be<@,@>?"),g:s("dm?"),fQ:s("e?"),cD:s("h?"),h6:s("b?"),cg:s("a3?"),H:s("a3"),p:s("~"),M:s("~()"),cA:s("~(I,@)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.ag=J.cR.prototype
B.a=J.u.prototype
B.c=J.bU.prototype
B.b=J.bs.prototype
B.p=J.b7.prototype
B.ah=J.aU.prototype
B.ai=J.bX.prototype
B.O=J.d6.prototype
B.C=J.bz.prototype
B.l=new A.al(0,"upgrade")
B.D=new A.al(1,"dismiss")
B.u=new A.al(2,"recruit")
B.m=new A.al(3,"soldiers")
B.v=new A.al(4,"buyWeapon")
B.E=new A.al(5,"dispatch")
B.P=new A.al(6,"move")
B.Q=new A.al(7,"camp")
B.R=new A.al(8,"retreat")
B.f=new A.am(0,"garrison")
B.n=new A.am(2,"camped")
B.w=new A.am(3,"queue")
B.x=new A.am(4,"attacking")
B.e=new A.am(5,"defending")
B.y=new A.am(7,"retreating")
B.F=new A.aE(0,"full")
B.G=new A.aE(1,"resources")
B.z=new A.aE(2,"defense")
B.o=new A.aE(3,"attack")
B.N=s([],t._)
B.t=new A.bp(B.N,1/0,!1)
B.U=new A.bp(B.N,1/0,!1)
B.V=new A.cB(4,24,6,1.5,10,12,0.65,5,0.5,0.25,45,15,0.8,45,25,90,-0.15,10,3,1,96,160,6000,8,24,4,6,8,2,0,1,0.3,20,900,64,0.25,8,0.06,0.12,0.35,0.05,2500,2,20)
B.A=new A.b6(A.nv(),t.E)
B.B=new A.b6(A.nw(),t.E)
B.H=new A.cL()
B.W=new A.bQ(A.cy("bQ<0&>"))
B.I=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.X=function() {
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
B.a1=function(getTagFallback) {
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
B.Y=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.a0=function(hooks) {
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
B.a_=function(hooks) {
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
B.Z=function(hooks) {
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

B.i=new A.h6()
B.a2=new A.d5()
B.k=new A.ih()
B.j=new A.dn()
B.a3=new A.dq()
B.h=new A.b5(0,"favorable")
B.a4=new A.b5(1,"close")
B.r=new A.b5(2,"unfavorable")
B.K=new A.b5(3,"unknown")
B.ay=s(["\u9759\u6001\u8bc4\u4f30\u914d\u989d\u8017\u5c3d"],t.s)
B.a5=new A.bK(B.K,-1,1,!1)
B.a6=new A.ag("AI \u521d\u59cb\u5316\u7f3a\u5c11 gameConfig")
B.a7=new A.ag("game_config.json5 \u7684\u57ce\u6c60\u6570\u7ec4\u957f\u5ea6\u4e0d\u6b63\u786e")
B.a8=new A.ag("\u6700\u9ad8\u57ce\u6c60\u7b49\u7ea7\u5fc5\u987b\u4e0e\u57ce\u9632\u52a0\u6210\u6570\u7ec4\u957f\u5ea6\u4e00\u81f4")
B.a9=new A.ag("AI \u534f\u8bae\u7248\u672c\u4e0d\u5339\u914d")
B.aa=new A.ag("game_config.json5 \u5305\u542b\u975e\u6cd5\u7684\u65f6\u95f4\u6216\u57ce\u6c60\u7b49\u7ea7")
B.ab=new A.ag("AI \u6784\u5efa\u7248\u672c\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u751f\u6210 Worker")
B.ac=new A.ag("\u672a\u77e5 AI \u5de5\u4f5c\u547d\u4ee4")
B.ad=new A.ag("AI \u5730\u56fe\u5c3a\u5bf8\u65e0\u6548")
B.ae=new A.ag("\u56fd\u5bb6\u89c4\u5212\u9759\u6001\u7248\u672c\u4e0d\u5339\u914d")
B.af=new A.ag("\u56fd\u5bb6\u89c2\u5bdf\u8d85\u51fa\u534f\u8bae\u5bb9\u91cf")
B.aj=new A.h7(null)
B.ak=new A.h8(null)
B.S=new A.am(1,"marching")
B.T=new A.am(6,"field")
B.L=s([B.f,B.S,B.n,B.w,B.x,B.e,B.T,B.y],A.cy("u<am>"))
B.al=s([B.F,B.G,B.z,B.o],A.cy("u<aE>"))
B.M=s([],t.Z)
B.az=s([],t.k)
B.q=s([],t.m)
B.d=s([],t.b)
B.am=A.ay("nD")
B.an=A.ay("nE")
B.ao=A.ay("lv")
B.ap=A.ay("lw")
B.aq=A.ay("lA")
B.ar=A.ay("lB")
B.as=A.ay("lC")
B.at=A.ay("z")
B.au=A.ay("lU")
B.av=A.ay("lV")
B.aw=A.ay("lW")
B.ax=A.ay("jB")})();(function staticFields(){$.iL=null
$.aj=A.c([],t.Q)
$.k9=null
$.hE=0
$.hF=A.mR()
$.k0=null
$.k_=null
$.kJ=null
$.kE=null
$.kS=null
$.j7=null
$.jd=null
$.jO=null
$.iQ=A.c([],A.cy("u<q<z>?>"))
$.bF=null
$.cw=null
$.cx=null
$.jH=!1
$.N=B.j})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"nG","kV",()=>A.j8("_$dart_dartClosure"))
s($,"nF","jR",()=>A.j8("_$dart_dartClosure_dartJSInterop"))
s($,"nY","l5",()=>A.c([new J.cS()],A.cy("u<ca>")))
s($,"nM","kW",()=>A.aL(A.iu({
toString:function(){return"$receiver$"}})))
s($,"nN","kX",()=>A.aL(A.iu({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"nO","kY",()=>A.aL(A.iu(null)))
s($,"nP","kZ",()=>A.aL(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"nS","l1",()=>A.aL(A.iu(void 0)))
s($,"nT","l2",()=>A.aL(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"nR","l0",()=>A.aL(A.kf(null)))
s($,"nQ","l_",()=>A.aL(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"nV","l4",()=>A.aL(A.kf(void 0)))
s($,"nU","l3",()=>A.aL(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"nW","jT",()=>A.lX())
s($,"nX","du",()=>A.kP(B.at))
s($,"nK","jS",()=>{A.lN()
return $.hE})
s($,"nH","jm",()=>{var q=t.b
return A.Q(["initialYear",1,"initialMonth",1,"secondsPerMonth",60,"initialGold",50,"countryAiEnabled",!0,"countryAiInitialDelay",0,"countryAiInterval",5,"countryAiMinimumSoldiers",4,"heroOfferValidMonths",2,"aiDepartureInterval",2,"countryAiEmergencyGold",5,"countryAiBudgetSafetySeconds",30,"countryAiBattleBudgetSeconds",30,"countryAiTargetTravelScale",30,"countryAiTargetDistancePower",2,"countryAiStrengthScale",80,"countryAiWeaknessPower",2,"countryHatredPerAttack",20,"countryHatredMaximum",100,"countryHatredWeightPerPoint",0.02,"normalHarvestWeight",2,"poorHarvestWeight",1,"abundantHarvestWeight",1,"cityBaseIncome",20,"cityIncomePerLevel",0,"countryMonthlyIncome",10,"foreignCityYieldFactor",1,"retreatBaseSuccessChance",0.9,"retreatConditionPenalty",0.1,"retreatExitSeconds",1.2,"retreatResultSeconds",0.6,"aiRetreatMinimumClashes",2,"aiRetreatSurvivalRatio",0.6,"aiRetreatHealthRatio",0.25,"aiThreatDistance",320,"aiMaximumRaidHeroes",4,"aiTargetShortlist",3,"aiTravelCacheSize",256,"aiRaidRetrySeconds",15,"harvestAdjustmentMin",5,"harvestAdjustmentMax",10,"chargeHeroSalary",!0,"freeGarrisonHeroes",2,"garrisonUpkeepFactor",0,"maxCityLevel",5,"firstYearCityUpgradeLimit",3,"cityUpgradeLevelsPerYear",1,"cityUpgradeCosts",A.c([30,40,50,60],q),"cityReserveCapacityPerLevel",4,"initialSoldiersPerHero",4,"soldierRecruitCost",1,"soldierRecruitBatchSize",10,"heroSoldierLimit",4,"initialHeroSoldiers",0,"recruitedHeroSoldiers",0,"heroDrawCost",5,"recycleDefeatedHeroes",!0,"cityDefenseAttackBonuses",A.c([1,3,5,8,10],q),"cityDefenseMoraleBonuses",A.c([5,10,15,20,25],q),"battleRecoilDifferenceScale",0.25,"cityDefenseRecoilScale",0,"battleMoralePowerScale",6,"battleUseMorale",!0,"battleMoraleDrainPerSecond",12,"battleMoraleDrainRandomRange",4,"battleWallDamageScale",0.5,"fieldEncounterDistance",16,"mountainHeroAttackFactor",1,"riverHeroAttackFactor",1,"grassHeroAttackFactor",1,"fieldBattleHistoryLimit",16,"baseMarchSpeed",22,"heroWalkFrameSeconds",0.2,"grassSpeedFactor",0.75,"mountainSpeedFactor",0.2,"waterSpeedFactor",0.4,"battleFormationFrames",163,"cityDamageChancePerVictory",1,"nationalAi",B.V.I()],t.N,t.X)})
r($,"ly","nC",()=>A.cO($.jm()))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.bv,SharedArrayBuffer:A.bv,ArrayBufferView:A.c4,DataView:A.cX,Float32Array:A.cY,Float64Array:A.cZ,Int16Array:A.d_,Int32Array:A.d0,Int8Array:A.d1,Uint16Array:A.d2,Uint32Array:A.d3,Uint8ClampedArray:A.c5,CanvasPixelArray:A.c5,Uint8Array:A.d4})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bw.$nativeSuperclassTag="ArrayBufferView"
A.ci.$nativeSuperclassTag="ArrayBufferView"
A.cj.$nativeSuperclassTag="ArrayBufferView"
A.c2.$nativeSuperclassTag="ArrayBufferView"
A.ck.$nativeSuperclassTag="ArrayBufferView"
A.cl.$nativeSuperclassTag="ArrayBufferView"
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
var s=A.nt
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()