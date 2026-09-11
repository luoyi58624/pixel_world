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
if(a[b]!==s){A.nE(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.d(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.jT(b)
return new s(c,this)}:function(){if(s===null)s=A.jT(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.jT(a).prototype
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
jY(a,b,c,d){return{i:a,p:b,e:c,x:d}},
jU(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.jW==null){A.ns()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.j(A.kn("Return interceptor for "+A.x(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.iV
if(o==null)o=$.iV=A.jh(n)
p=q[o]}if(p!=null)return p
p=A.nx(a)
if(p!=null)return p
if(typeof a=="function")return B.aa
s=Object.getPrototypeOf(a)
if(s==null)return B.N
if(s===Object.prototype)return B.N
if(typeof q=="function"){o=$.iV
if(o==null)o=$.iV=A.jh(n)
Object.defineProperty(q,o,{value:B.B,enumerable:false,writable:true,configurable:true})
return B.B}return B.B},
lK(a,b){if(a<0||a>4294967295)throw A.j(A.ba(a,0,4294967295,"length",null))
return J.lL(new Array(a),b)},
kc(a,b){if(a<0)throw A.j(A.cF("Length must be a non-negative integer: "+a,null))
return A.d(new Array(a),b.h("t<0>"))},
lL(a,b){var s=A.d(a,b.h("t<0>"))
s.$flags=1
return s},
bk(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bX.prototype
return J.cV.prototype}if(typeof a=="string")return J.b7.prototype
if(a==null)return J.bY.prototype
if(typeof a=="boolean")return J.cU.prototype
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aV.prototype
if(typeof a=="symbol")return J.c0.prototype
if(typeof a=="bigint")return J.bZ.prototype
return a}if(a instanceof A.A)return a
return J.jU(a)},
cB(a){if(typeof a=="string")return J.b7.prototype
if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aV.prototype
if(typeof a=="symbol")return J.c0.prototype
if(typeof a=="bigint")return J.bZ.prototype
return a}if(a instanceof A.A)return a
return J.jU(a)},
aD(a){if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aV.prototype
if(typeof a=="symbol")return J.c0.prototype
if(typeof a=="bigint")return J.bZ.prototype
return a}if(a instanceof A.A)return a
return J.jU(a)},
nn(a){if(typeof a=="number")return J.br.prototype
if(typeof a=="string")return J.b7.prototype
if(a==null)return a
if(!(a instanceof A.A))return J.bz.prototype
return a},
af(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bk(a).a7(a,b)},
b2(a,b){if(typeof b==="number")if(Array.isArray(a)||A.nw(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.aD(a).i(a,b)},
lf(a,b){return J.aD(a).m(a,b)},
lg(a,b){return J.aD(a).K(a,b)},
lh(a,b){return J.nn(a).t(a,b)},
jv(a,b){return J.aD(a).V(a,b)},
k1(a){return J.aD(a).gD(a)},
ag(a){return J.bk(a).gR(a)},
jw(a){return J.cB(a).ga_(a)},
li(a){return J.cB(a).gav(a)},
G(a){return J.aD(a).gC(a)},
lj(a){return J.aD(a).gaF(a)},
bn(a){return J.cB(a).gl(a)},
lk(a){return J.bk(a).gU(a)},
k2(a,b){return J.aD(a).b1(a,b)},
ll(a,b){return J.aD(a).cd(a,b)},
bo(a){return J.bk(a).q(a)},
cS:function cS(){},
cU:function cU(){},
bY:function bY(){},
c_:function c_(){},
aW:function aW(){},
d7:function d7(){},
bz:function bz(){},
aV:function aV(){},
bZ:function bZ(){},
c0:function c0(){},
t:function t(a){this.$ti=a},
cT:function cT(){},
hk:function hk(a){this.$ti=a},
b4:function b4(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
br:function br(){},
bX:function bX(){},
cV:function cV(){},
b7:function b7(){}},A={jA:function jA(){},
lM(a){return new A.c2("Field '"+a+"' has not been initialized.")},
aL(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
iu(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
Y(a,b,c){return a},
jX(a){var s,r
for(s=$.aj.length,r=0;r<s;++r)if(a===$.aj[r])return!0
return!1},
a_(a,b,c,d){A.cd(b,"start")
if(c!=null){A.cd(c,"end")
if(b>c)A.cC(A.ba(b,0,c,"start",null))}return new A.u(a,b,c,d.h("u<0>"))},
lP(a,b,c,d){if(t.U.b(a))return new A.bS(a,b,c.h("@<0>").H(d).h("bS<1,2>"))
return new A.at(a,b,c.h("@<0>").H(d).h("at<1,2>"))},
jG(a,b,c){A.cd(b,"takeCount")
if(t.U.b(a))return new A.bT(a,b,c.h("bT<0>"))
return new A.bb(a,b,c.h("bb<0>"))},
aC(){return new A.cg("No element")},
c2:function c2(a){this.a=a},
is:function is(){},
r:function r(){},
k:function k(){},
u:function u(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
o:function o(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
at:function at(a,b,c){this.a=a
this.b=b
this.$ti=c},
bS:function bS(a,b,c){this.a=a
this.b=b
this.$ti=c},
c4:function c4(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
Q:function Q(a,b,c){this.a=a
this.b=b
this.$ti=c},
b:function b(a,b,c){this.a=a
this.b=b
this.$ti=c},
R:function R(a,b,c){this.a=a
this.b=b
this.$ti=c},
aT:function aT(a,b,c){this.a=a
this.b=b
this.$ti=c},
bW:function bW(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
bb:function bb(a,b,c){this.a=a
this.b=b
this.$ti=c},
bT:function bT(a,b,c){this.a=a
this.b=b
this.$ti=c},
bc:function bc(a,b,c){this.a=a
this.b=b
this.$ti=c},
bU:function bU(a){this.$ti=a},
bA:function bA(a,b){this.a=a
this.$ti=b},
cj:function cj(a,b){this.a=a
this.$ti=b},
K:function K(){},
L:function L(a,b){this.a=a
this.$ti=b},
eG(a,b,c){var s,r,q,p,o,n,m,l=A.l(a),k=A.bt(new A.a8(a,l.h("a8<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.v)(k),++i,p=o){r=k[i]
c.a(a.i(0,r))
o=p+1
q[r]=p}n=A.bt(new A.a9(a,l.h("a9<2>")),!0,c)
m=new A.bQ(q,n,b.h("@<0>").H(c).h("bQ<1,2>"))
m.$keys=k
return m}return new A.bP(A.as(a,b,c),b.h("@<0>").H(c).h("bP<1,2>"))},
l2(a){var s=A.l1(a)
if(s!=null)return s
return"minified:"+a},
nw(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
x(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.bo(a)
return s},
d8(a){var s,r=$.kh
if(r==null)r=$.kh=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
lU(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.n(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
d9(a){var s,r,q,p
if(a instanceof A.A)return A.ad(A.az(a),null)
s=J.bk(a)
if(s===B.a9||s===B.ab||t.ak.b(a)){r=B.I(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.ad(A.az(a),null)},
ki(a){var s,r,q
if(a==null||typeof a=="number"||A.jN(a))return J.bo(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a6)return a.q(0)
if(a instanceof A.al)return a.bT(!0)
s=$.le()
for(r=0;r<1;++r){q=s[r].dH(a)
if(q!=null)return q}return"Instance of '"+A.d9(a)+"'"},
lR(){return Date.now()},
lT(){var s,r
if($.hU!==0)return
$.hU=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
if(!!s.dartUseDateNowForTicks)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.hU=1e6
$.hV=new A.hT(r)},
a0(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.bP(s,10)|55296)>>>0,s&1023|56320)}throw A.j(A.ba(a,0,1114111,null,null))},
lS(a){var s=a.$thrownJsError
if(s==null)return null
return A.bL(s)},
kT(a){throw A.j(A.kM(a))},
n(a,b){if(a==null)J.bn(a)
throw A.j(A.kQ(a,b))},
kQ(a,b){var s,r="index"
if(!A.kF(b))return new A.aB(!0,b,r,null)
s=J.bn(a)
if(b<0||b>=s)return A.jy(b,s,a,r)
return new A.cc(null,null,!0,b,r,"Value not in range")},
kM(a){return new A.aB(!0,a,null,null)},
kO(a){return a},
j(a){return A.W(a,new Error())},
W(a,b){var s
if(a==null)a=new A.aM()
b.dartException=a
s=A.nF
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
nF(){return J.bo(this.dartException)},
cC(a,b){throw A.W(a,b==null?new Error():b)},
cD(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.cC(A.mC(a,b,c),s)},
mC(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.ci("'"+s+"': Cannot "+o+" "+l+k+n)},
v(a){throw A.j(A.Z(a))},
aN(a){var s,r,q,p,o,n
a=A.nC(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.d([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.iD(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
iE(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
km(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
jB(a,b){var s=b==null,r=s?null:b.method
return new A.cW(a,r,s?null:b.receiver)},
aR(a){var s
if(a==null)return new A.hv(a)
if(a instanceof A.bV){s=a.a
return A.b1(a,s==null?A.cx(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.b1(a,a.dartException)
return A.nb(a)},
b1(a,b){if(t.V.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
nb(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bP(r,16)&8191)===10)switch(q){case 438:return A.b1(a,A.jB(A.x(s)+" (Error "+q+")",null))
case 445:case 5007:A.x(s)
return A.b1(a,new A.c9())}}if(a instanceof TypeError){p=$.l4()
o=$.l5()
n=$.l6()
m=$.l7()
l=$.la()
k=$.lb()
j=$.l9()
$.l8()
i=$.ld()
h=$.lc()
g=p.ad(s)
if(g!=null)return A.b1(a,A.jB(A.J(s),g))
else{g=o.ad(s)
if(g!=null){g.method="call"
return A.b1(a,A.jB(A.J(s),g))}else if(n.ad(s)!=null||m.ad(s)!=null||l.ad(s)!=null||k.ad(s)!=null||j.ad(s)!=null||m.ad(s)!=null||i.ad(s)!=null||h.ad(s)!=null){A.J(s)
return A.b1(a,new A.c9())}}return A.b1(a,new A.de(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.cf()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.b1(a,new A.aB(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.cf()
return a},
bL(a){var s
if(a instanceof A.bV)return a.b
if(a==null)return new A.cq(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.cq(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
kY(a){if(a==null)return J.ag(a)
if(typeof a=="object")return A.d8(a)
return J.ag(a)},
nl(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.B(0,a[s],a[r])}return b},
nm(a,b){var s,r=a.length
for(s=0;s<r;++s)b.m(0,a[s])
return b},
mL(a,b,c,d,e,f){t.k.a(a)
switch(A.h(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.j(new A.iJ("Unsupported number of arguments for wrapped closure"))},
dt(a,b){var s=a.$identity
if(!!s)return s
s=A.nh(a,b)
a.$identity=s
return s},
nh(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.mL)},
lz(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.db().constructor.prototype):Object.create(new A.bq(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.ka(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.lv(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.ka(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
lv(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.j("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.lt)}throw A.j("Error in functionType of tearoff")},
lw(a,b,c,d){var s=A.k9
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
ka(a,b,c,d){if(c)return A.ly(a,b,d)
return A.lw(b.length,d,a,b)},
lx(a,b,c,d){var s=A.k9,r=A.lu
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
ly(a,b,c){var s,r
if($.k7==null)$.k7=A.k6("interceptor")
if($.k8==null)$.k8=A.k6("receiver")
s=b.length
r=A.lx(s,c,a,b)
return r},
jT(a){return A.lz(a)},
lt(a,b){return A.cu(v.typeUniverse,A.az(a.a),b)},
k9(a){return a.a},
lu(a){return a.b},
k6(a){var s,r,q,p=new A.bq("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.j(A.cF("Field name "+a+" not found.",null))},
jh(a){return v.getIsolateTag(a)},
nx(a){var s,r,q,p,o,n=A.J($.kR.$1(a)),m=$.jg[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jm[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bH($.kL.$2(a,n))
if(q!=null){m=$.jg[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jm[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.jp(s)
$.jg[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.jm[n]=s
return s}if(p==="-"){o=A.jp(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.l_(a,s)
if(p==="*")throw A.j(A.kn(n))
if(v.leafTags[n]===true){o=A.jp(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.l_(a,s)},
l_(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.jY(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
jp(a){return J.jY(a,!1,null,!!a.$iah)},
nz(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.jp(s)
else return J.jY(s,c,null,null)},
ns(){if(!0===$.jW)return
$.jW=!0
A.nt()},
nt(){var s,r,q,p,o,n,m,l
$.jg=Object.create(null)
$.jm=Object.create(null)
A.nr()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.l0.$1(o)
if(n!=null){m=A.nz(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
nr(){var s,r,q,p,o,n,m=B.U()
m=A.bK(B.V,A.bK(B.W,A.bK(B.J,A.bK(B.J,A.bK(B.X,A.bK(B.Y,A.bK(B.Z(B.I),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.kR=new A.jj(p)
$.kL=new A.jk(o)
$.l0=new A.jl(n)},
bK(a,b){return a(b)||b},
mg(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.n(b,s)
if(!J.af(r,b[s]))return!1}return!0},
nj(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
nC(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bD:function bD(a,b){this.a=a
this.b=b},
aZ:function aZ(a,b,c){this.a=a
this.b=b
this.c=c},
aO:function aO(a){this.a=a},
bE:function bE(a){this.a=a},
bP:function bP(a,b){this.a=a
this.$ti=b},
bO:function bO(){},
bQ:function bQ(a,b,c){this.a=a
this.b=b
this.$ti=c},
bg:function bg(a,b){this.a=a
this.$ti=b},
ck:function ck(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cR:function cR(){},
b6:function b6(a,b){this.a=a
this.$ti=b},
hT:function hT(a){this.a=a},
ce:function ce(){},
iD:function iD(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
c9:function c9(){},
cW:function cW(a,b,c){this.a=a
this.b=b
this.c=c},
de:function de(a){this.a=a},
hv:function hv(a){this.a=a},
bV:function bV(a,b){this.a=a
this.b=b},
cq:function cq(a){this.a=a
this.b=null},
a6:function a6(){},
cI:function cI(){},
cJ:function cJ(){},
dc:function dc(){},
db:function db(){},
bq:function bq(a,b){this.a=a
this.b=b},
da:function da(a){this.a=a},
aJ:function aJ(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hl:function hl(a){this.a=a},
hp:function hp(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
a8:function a8(a,b){this.a=a
this.$ti=b},
b9:function b9(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
a9:function a9(a,b){this.a=a
this.$ti=b},
ai:function ai(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b8:function b8(a,b){this.a=a
this.$ti=b},
c3:function c3(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
jj:function jj(a){this.a=a},
jk:function jk(a){this.a=a},
jl:function jl(a){this.a=a},
al:function al(){},
bB:function bB(){},
bC:function bC(){},
bj:function bj(){},
mD(a){return a},
bv:function bv(){},
c7:function c7(){},
cY:function cY(){},
bw:function bw(){},
c5:function c5(){},
c6:function c6(){},
cZ:function cZ(){},
d_:function d_(){},
d0:function d0(){},
d1:function d1(){},
d2:function d2(){},
d3:function d3(){},
d4:function d4(){},
c8:function c8(){},
d5:function d5(){},
cl:function cl(){},
cm:function cm(){},
cn:function cn(){},
co:function co(){},
jE(a,b){var s=b.c
return s==null?b.c=A.cs(a,"aU",[b.x]):s},
kj(a){var s=a.w
if(s===6||s===7)return A.kj(a.x)
return s===11||s===12},
lW(a){return a.as},
kZ(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
cA(a){return A.j4(v.typeUniverse,a,!1)},
nv(a,b){var s,r,q,p,o
if(a==null)return null
s=b.y
r=a.Q
if(r==null)r=a.Q=new Map()
q=b.as
p=r.get(q)
if(p!=null)return p
o=A.b0(v.typeUniverse,a.x,s,0)
r.set(q,o)
return o},
b0(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.b0(a1,s,a3,a4)
if(r===s)return a2
return A.kw(a1,r,!0)
case 7:s=a2.x
r=A.b0(a1,s,a3,a4)
if(r===s)return a2
return A.kv(a1,r,!0)
case 8:q=a2.y
p=A.bJ(a1,q,a3,a4)
if(p===q)return a2
return A.cs(a1,a2.x,p)
case 9:o=a2.x
n=A.b0(a1,o,a3,a4)
m=a2.y
l=A.bJ(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.jK(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bJ(a1,j,a3,a4)
if(i===j)return a2
return A.kx(a1,k,i)
case 11:h=a2.x
g=A.b0(a1,h,a3,a4)
f=a2.y
e=A.n8(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.ku(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bJ(a1,d,a3,a4)
o=a2.x
n=A.b0(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jL(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.j(A.cH("Attempted to substitute unexpected RTI kind "+a0))}},
bJ(a,b,c,d){var s,r,q,p,o=b.length,n=A.j5(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.b0(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
n9(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.j5(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.b0(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
n8(a,b,c,d){var s,r=b.a,q=A.bJ(a,r,c,d),p=b.b,o=A.bJ(a,p,c,d),n=b.c,m=A.n9(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dj()
s.a=q
s.b=o
s.c=m
return s},
d(a,b){a[v.arrayRti]=b
return a},
jf(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.np(s)
return a.$S()}return null},
nu(a,b){var s
if(A.kj(b))if(a instanceof A.a6){s=A.jf(a)
if(s!=null)return s}return A.az(a)},
az(a){if(a instanceof A.A)return A.l(a)
if(Array.isArray(a))return A.f(a)
return A.jM(J.bk(a))},
f(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
l(a){var s=a.$ti
return s!=null?s:A.jM(a)},
jM(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.mK(a,s)},
mK(a,b){var s=a instanceof A.a6?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.mq(v.typeUniverse,s.name)
b.$ccache=r
return r},
np(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.j4(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
no(a){return A.aQ(A.l(a))},
jV(a){var s=A.jf(a)
return A.aQ(s==null?A.az(a):s)},
jQ(a){var s
if(a instanceof A.al)return A.nk(a.$r,a.aR())
s=a instanceof A.a6?A.jf(a):null
if(s!=null)return s
if(t.dm.b(a))return J.lk(a).a
if(Array.isArray(a))return A.f(a)
return A.az(a)},
aQ(a){var s=a.r
return s==null?a.r=new A.j3(a):s},
nk(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bY
if(0>=p)return A.n(q,0)
s=A.cu(v.typeUniverse,A.jQ(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.n(q,r)
s=A.kz(v.typeUniverse,s,A.jQ(q[r]))}return A.cu(v.typeUniverse,s,a)},
aA(a){return A.aQ(A.j4(v.typeUniverse,a,!1))},
mJ(a){var s=this
s.b=A.n6(s)
return s.b(a)},
n6(a){var s,r,q,p,o
if(a===t.K)return A.mR
if(A.bl(a))return A.mV
s=a.w
if(s===6)return A.mH
if(s===1)return A.kH
if(s===7)return A.mM
r=A.n5(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bl)){a.f="$i"+q
if(q==="q")return A.mP
if(a===t.A)return A.mO
return A.mU}}else if(s===10){p=A.nj(a.x,a.y)
o=p==null?A.kH:p
return o==null?A.cx(o):o}return A.mF},
n5(a){if(a.w===8){if(a===t.S)return A.kF
if(a===t.i||a===t.H)return A.mQ
if(a===t.N)return A.mT
if(a===t.y)return A.jN}return null},
mI(a){var s=this,r=A.mE
if(A.bl(s))r=A.mu
else if(s===t.K)r=A.cx
else if(A.bM(s)){r=A.mG
if(s===t.h6)r=A.a3
else if(s===t.dk)r=A.bH
else if(s===t.fQ)r=A.dr
else if(s===t.cg)r=A.U
else if(s===t.cD)r=A.ms
else if(s===t.an)r=A.mt}else if(s===t.S)r=A.h
else if(s===t.N)r=A.J
else if(s===t.y)r=A.ay
else if(s===t.H)r=A.z
else if(s===t.i)r=A.an
else if(s===t.A)r=A.j6
s.a=r
return s.a(a)},
mF(a){var s=this
if(a==null)return A.bM(s)
return A.kV(v.typeUniverse,A.nu(a,s),s)},
mH(a){if(a==null)return!0
return this.x.b(a)},
mU(a){var s,r=this
if(a==null)return A.bM(r)
s=r.f
if(a instanceof A.A)return!!a[s]
return!!J.bk(a)[s]},
mP(a){var s,r=this
if(a==null)return A.bM(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.A)return!!a[s]
return!!J.bk(a)[s]},
mO(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.A)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
kG(a){if(typeof a=="object"){if(a instanceof A.A)return t.A.b(a)
return!0}if(typeof a=="function")return!0
return!1},
mE(a){var s=this
if(a==null){if(A.bM(s))return a}else if(s.b(a))return a
throw A.W(A.kC(a,s),new Error())},
mG(a){var s=this
if(a==null||s.b(a))return a
throw A.W(A.kC(a,s),new Error())},
kC(a,b){return new A.bF("TypeError: "+A.kp(a,A.ad(b,null)))},
kP(a,b,c,d){if(A.kV(v.typeUniverse,a,b))return a
throw A.W(A.mi("The type argument '"+A.ad(a,null)+"' is not a subtype of the type variable bound '"+A.ad(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
kp(a,b){return A.cP(a)+": type '"+A.ad(A.jQ(a),null)+"' is not a subtype of type '"+b+"'"},
mi(a){return new A.bF("TypeError: "+a)},
am(a,b){return new A.bF("TypeError: "+A.kp(a,b))},
mM(a){var s=this
return s.x.b(a)||A.jE(v.typeUniverse,s).b(a)},
mR(a){return a!=null},
cx(a){if(a!=null)return a
throw A.W(A.am(a,"Object"),new Error())},
mV(a){return!0},
mu(a){return a},
kH(a){return!1},
jN(a){return!0===a||!1===a},
ay(a){if(!0===a)return!0
if(!1===a)return!1
throw A.W(A.am(a,"bool"),new Error())},
dr(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.W(A.am(a,"bool?"),new Error())},
an(a){if(typeof a=="number")return a
throw A.W(A.am(a,"double"),new Error())},
ms(a){if(typeof a=="number")return a
if(a==null)return a
throw A.W(A.am(a,"double?"),new Error())},
kF(a){return typeof a=="number"&&Math.floor(a)===a},
h(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.W(A.am(a,"int"),new Error())},
a3(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.W(A.am(a,"int?"),new Error())},
mQ(a){return typeof a=="number"},
z(a){if(typeof a=="number")return a
throw A.W(A.am(a,"num"),new Error())},
U(a){if(typeof a=="number")return a
if(a==null)return a
throw A.W(A.am(a,"num?"),new Error())},
mT(a){return typeof a=="string"},
J(a){if(typeof a=="string")return a
throw A.W(A.am(a,"String"),new Error())},
bH(a){if(typeof a=="string")return a
if(a==null)return a
throw A.W(A.am(a,"String?"),new Error())},
j6(a){if(A.kG(a))return a
throw A.W(A.am(a,"JSObject"),new Error())},
mt(a){if(a==null)return a
if(A.kG(a))return a
throw A.W(A.am(a,"JSObject?"),new Error())},
kJ(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.ad(a[q],b)
return s},
n0(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.kJ(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.ad(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
kD(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.d([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.m(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.n(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.ad(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.ad(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.ad(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.ad(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.ad(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
ad(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.ad(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.ad(a.x,b)+">"
if(l===8){p=A.na(a.x)
o=a.y
return o.length>0?p+("<"+A.kJ(o,b)+">"):p}if(l===10)return A.n0(a,b)
if(l===11)return A.kD(a,b,null)
if(l===12)return A.kD(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.n(b,n)
return b[n]}return"?"},
na(a){var s=A.l1(a)
if(s!=null)return s
return"minified:"+a},
mr(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
mq(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.j4(a,b,!1)
else if(typeof m=="number"){s=m
r=A.ct(a,5,"#")
q=A.j5(s)
for(p=0;p<s;++p)q[p]=r
o=A.cs(a,b,q)
n[b]=o
return o}else return m},
mp(a,b){return A.kA(a.tR,b)},
mo(a,b){return A.kA(a.eT,b)},
j4(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.ky(a,null,b,!1)
r.set(b,s)
return s},
cu(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.ky(a,b,c,!0)
q.set(c,r)
return r},
kz(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.jK(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
ky(a,b,c,d){return A.me(A.m8(a,b,c,d))},
b_(a,b){b.a=A.mI
b.b=A.mJ
return b},
ct(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.au(null,null)
s.w=b
s.as=c
r=A.b_(a,s)
a.eC.set(c,r)
return r},
kw(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.mm(a,b,r,c)
a.eC.set(r,s)
return s},
mm(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bl(b))if(!(b===t.P||b===t.v))if(s!==6)r=s===7&&A.bM(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.au(null,null)
q.w=6
q.x=b
q.as=c
return A.b_(a,q)},
kv(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.mk(a,b,r,c)
a.eC.set(r,s)
return s},
mk(a,b,c,d){var s,r
if(d){s=b.w
if(A.bl(b)||b===t.K)return b
else if(s===1)return A.cs(a,"aU",[b])
else if(b===t.P||b===t.v)return t.eH}r=new A.au(null,null)
r.w=7
r.x=b
r.as=c
return A.b_(a,r)},
mn(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.au(null,null)
s.w=13
s.x=b
s.as=q
r=A.b_(a,s)
a.eC.set(q,r)
return r},
cr(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
mj(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
cs(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.cr(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.au(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.b_(a,r)
a.eC.set(p,q)
return q},
jK(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.cr(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.au(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.b_(a,o)
a.eC.set(q,n)
return n},
kx(a,b,c){var s,r,q="+"+(b+"("+A.cr(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.au(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.b_(a,s)
a.eC.set(q,r)
return r},
ku(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.cr(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.cr(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.mj(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.au(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.b_(a,p)
a.eC.set(r,o)
return o},
jL(a,b,c,d){var s,r=b.as+("<"+A.cr(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.ml(a,b,c,r,d)
a.eC.set(r,s)
return s},
ml(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.j5(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.b0(a,b,r,0)
m=A.bJ(a,c,r,0)
return A.jL(a,n,m,c!==m)}}l=new A.au(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.b_(a,l)},
m8(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
me(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.ma(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.kr(a,r,l,k,!1)
else if(q===46)r=A.kr(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bi(a.u,a.e,k.pop()))
break
case 94:k.push(A.mn(a.u,k.pop()))
break
case 35:k.push(A.ct(a.u,5,"#"))
break
case 64:k.push(A.ct(a.u,2,"@"))
break
case 126:k.push(A.ct(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.mc(a,k)
break
case 38:A.mb(a,k)
break
case 63:p=a.u
k.push(A.kw(p,A.bi(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.kv(p,A.bi(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.m9(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.ks(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.mf(a.u,a.e,o)
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
ma(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
kr(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.mr(s,o.x)[p]
if(n==null)A.cC('No "'+p+'" in "'+A.lW(o)+'"')
d.push(A.cu(s,o,n))}else d.push(p)
return m},
mc(a,b){var s,r=a.u,q=A.kq(a,b),p=b.pop()
if(typeof p=="string")b.push(A.cs(r,p,q))
else{s=A.bi(r,a.e,p)
switch(s.w){case 11:b.push(A.jL(r,s,q,a.n))
break
default:b.push(A.jK(r,s,q))
break}}},
m9(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.kq(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bi(p,a.e,o)
q=new A.dj()
q.a=s
q.b=n
q.c=m
b.push(A.ku(p,r,q))
return
case-4:b.push(A.kx(p,b.pop(),s))
return
default:throw A.j(A.cH("Unexpected state under `()`: "+A.x(o)))}},
mb(a,b){var s=b.pop()
if(0===s){b.push(A.ct(a.u,1,"0&"))
return}if(1===s){b.push(A.ct(a.u,4,"1&"))
return}throw A.j(A.cH("Unexpected extended operation "+A.x(s)))},
kq(a,b){var s=b.splice(a.p)
A.ks(a.u,a.e,s)
a.p=b.pop()
return s},
bi(a,b,c){if(typeof c=="string")return A.cs(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.md(a,b,c)}else return c},
ks(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bi(a,b,c[s])},
mf(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bi(a,b,c[s])},
md(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.j(A.cH("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.j(A.cH("Bad index "+c+" for "+b.q(0)))},
kV(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.V(a,b,null,c,null)
r.set(c,s)}return s},
V(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bl(d))return!0
s=b.w
if(s===4)return!0
if(A.bl(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.V(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.v){if(q===7)return A.V(a,b,c,d.x,e)
return d===p||d===t.v||q===6}if(d===t.K){if(s===7)return A.V(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.V(a,b.x,c,d,e))return!1
return A.V(a,A.jE(a,b),c,d,e)}if(s===6)return A.V(a,p,c,d,e)&&A.V(a,b.x,c,d,e)
if(q===7){if(A.V(a,b,c,d.x,e))return!0
return A.V(a,b,c,A.jE(a,d),e)}if(q===6)return A.V(a,b,c,p,e)||A.V(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.k)return!0
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
if(!A.V(a,j,c,i,e)||!A.V(a,i,e,j,c))return!1}return A.kE(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.kE(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.mN(a,b,c,d,e)}if(o&&q===10)return A.mS(a,b,c,d,e)
return!1},
kE(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.V(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.V(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.V(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.V(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.V(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
mN(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.cu(a,b,r[o])
return A.kB(a,p,null,c,d.y,e)}return A.kB(a,b.y,null,c,d.y,e)},
kB(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.V(a,b[s],d,e[s],f))return!1
return!0},
mS(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.V(a,r[s],c,q[s],e))return!1
return!0},
bM(a){var s=a.w,r=!0
if(!(a===t.P||a===t.v))if(!A.bl(a))if(s!==6)r=s===7&&A.bM(a.x)
return r},
bl(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
kA(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
j5(a){return a>0?new Array(a):v.typeUniverse.sEA},
au:function au(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dj:function dj(){this.c=this.b=this.a=null},
j3:function j3(a){this.a=a},
di:function di(){},
bF:function bF(a){this.a=a},
m2(){var s,r,q
if(self.scheduleImmediate!=null)return A.nd()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.dt(new A.iG(s),1)).observe(r,{childList:true})
return new A.iF(s,r,q)}else if(self.setImmediate!=null)return A.ne()
return A.nf()},
m3(a){self.scheduleImmediate(A.dt(new A.iH(t.M.a(a)),0))},
m4(a){self.setImmediate(A.dt(new A.iI(t.M.a(a)),0))},
m5(a){A.jH(B.H,t.M.a(a))},
jH(a,b){return A.mh(0,b)},
mh(a,b){var s=new A.j1()
s.ct(a,b)
return s},
mY(a){return new A.df(new A.X($.P,a.h("X<0>")),a.h("df<0>"))},
my(a,b){a.$2(0,null)
b.b=!0
return b.a},
mv(a,b){A.mz(a,b)},
mx(a,b){var s,r,q=b.$ti
q.h("1/?").a(a)
s=a==null?q.c.a(a):a
if(!b.b)b.a.cB(s)
else{r=b.a
if(q.h("aU<1>").b(s))r.bD(s)
else r.bF(s)}},
mw(a,b){var s=A.aR(a),r=A.bL(a),q=b.b,p=b.a
if(q)p.b6(new A.aq(s,r))
else p.bC(new A.aq(s,r))},
mz(a,b){var s,r,q=new A.j7(b),p=new A.j8(b)
if(a instanceof A.X)a.bS(q,p,t.z)
else{s=t.z
if(a instanceof A.X)a.cf(q,p,s)
else{r=new A.X($.P,t.c)
r.a=8
r.c=a
r.bS(q,p,s)}}},
nc(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.P.cc(new A.jb(s),t.x,t.S,t.z)},
kt(a,b,c){return 0},
jx(a){var s
if(t.V.b(a)){s=a.gaM()
if(s!=null)return s}return B.a0},
lF(a,b){var s
if(!b.b(null))throw A.j(A.ex(null,"computation","The type parameter is not nullable"))
s=new A.X($.P,b.h("X<0>"))
A.lZ(a,new A.hj(null,s,b))
return s},
iN(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.lX()
b.bC(new A.aq(new A.aB(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bM(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aA()
b.aP(o.a)
A.bf(b,p)
return}b.a^=2
A.ds(null,null,b.b,t.M.a(new A.iO(o,b)))},
bf(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.u,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.jP(m.a,m.b)}return}q.a=b
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
A.jP(j.a,j.b)
return}g=$.P
if(g!==h)$.P=h
else g=null
c=c.c
if((c&15)===8)new A.iS(q,d,n).$0()
else if(o){if((c&1)!==0)new A.iR(q,j).$0()}else if((c&2)!==0)new A.iQ(d,q).$0()
if(g!=null)$.P=g
c=q.c
if(c instanceof A.X){p=q.a.$ti
p=p.h("aU<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aS(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.iN(c,f,!0)
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
n1(a,b){var s
if(t.C.b(a))return b.cc(a,t.z,t.K,t.l)
s=t.B
if(s.b(a))return s.a(a)
throw A.j(A.ex(a,"onError",u.c))},
mZ(){var s,r
for(s=$.bI;s!=null;s=$.bI){$.cz=null
r=s.b
$.bI=r
if(r==null)$.cy=null
s.a.$0()}},
n7(){$.jO=!0
try{A.mZ()}finally{$.cz=null
$.jO=!1
if($.bI!=null)$.k0().$1(A.kN())}},
kK(a){var s=new A.dg(a),r=$.cy
if(r==null){$.bI=$.cy=s
if(!$.jO)$.k0().$1(A.kN())}else $.cy=r.b=s},
n4(a){var s,r,q,p=$.bI
if(p==null){A.kK(a)
$.cz=$.cy
return}s=new A.dg(a)
r=$.cz
if(r==null){s.b=p
$.bI=$.cz=s}else{q=r.b
s.b=q
$.cz=r.b=s
if(q==null)$.cy=s}},
nO(a,b){A.Y(a,"stream",t.K)
return new A.dp(b.h("dp<0>"))},
lZ(a,b){var s=$.P
if(s===B.k)return A.jH(a,t.M.a(b))
return A.jH(a,t.M.a(s.c0(b)))},
jP(a,b){A.n4(new A.ja(a,b))},
kI(a,b,c,d,e){var s,r=$.P
if(r===c)return d.$0()
$.P=c
s=r
try{r=d.$0()
return r}finally{$.P=s}},
n3(a,b,c,d,e,f,g){var s,r=$.P
if(r===c)return d.$1(e)
$.P=c
s=r
try{r=d.$1(e)
return r}finally{$.P=s}},
n2(a,b,c,d,e,f,g,h,i){var s,r=$.P
if(r===c)return d.$2(e,f)
$.P=c
s=r
try{r=d.$2(e,f)
return r}finally{$.P=s}},
ds(a,b,c,d){t.M.a(d)
if(B.k!==c){d=c.c0(d)
d=d}A.kK(d)},
iG:function iG(a){this.a=a},
iF:function iF(a,b,c){this.a=a
this.b=b
this.c=c},
iH:function iH(a){this.a=a},
iI:function iI(a){this.a=a},
j1:function j1(){},
j2:function j2(a,b){this.a=a
this.b=b},
df:function df(a,b){this.a=a
this.b=!1
this.$ti=b},
j7:function j7(a){this.a=a},
j8:function j8(a){this.a=a},
jb:function jb(a){this.a=a},
aP:function aP(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
ax:function ax(a,b){this.a=a
this.$ti=b},
aq:function aq(a,b){this.a=a
this.b=b},
hj:function hj(a,b,c){this.a=a
this.b=b
this.c=c},
be:function be(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
X:function X(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
iK:function iK(a,b){this.a=a
this.b=b},
iP:function iP(a,b){this.a=a
this.b=b},
iO:function iO(a,b){this.a=a
this.b=b},
iM:function iM(a,b){this.a=a
this.b=b},
iL:function iL(a,b){this.a=a
this.b=b},
iS:function iS(a,b,c){this.a=a
this.b=b
this.c=c},
iT:function iT(a,b){this.a=a
this.b=b},
iU:function iU(a){this.a=a},
iR:function iR(a,b){this.a=a
this.b=b},
iQ:function iQ(a,b){this.a=a
this.b=b},
dg:function dg(a){this.a=a
this.b=null},
dp:function dp(a){this.$ti=a},
cw:function cw(){},
dn:function dn(){},
j0:function j0(a,b){this.a=a
this.b=b},
ja:function ja(a,b){this.a=a
this.b=b},
jC(a,b){return new A.aJ(a.h("@<0>").H(b).h("aJ<1,2>"))},
T(a,b,c){return b.h("@<0>").H(c).h("ke<1,2>").a(A.nl(a,new A.aJ(b.h("@<0>").H(c).h("aJ<1,2>"))))},
S(a,b){return new A.aJ(a.h("@<0>").H(b).h("aJ<1,2>"))},
lN(a){return new A.av(a.h("av<0>"))},
bs(a){return new A.av(a.h("av<0>"))},
lO(a,b){return b.h("kg<0>").a(A.nm(a,new A.av(b.h("av<0>"))))},
jJ(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
iZ(a,b,c){var s=new A.bh(a,b,c.h("bh<0>"))
s.c=a.e
return s},
aI(a,b){var s=J.G(a)
if(s.j())return s.gp()
return null},
as(a,b,c){var s=A.jC(b,c)
a.ab(0,new A.hq(s,b,c))
return s},
kf(a,b,c){var s=A.jC(b,c)
s.F(0,a)
return s},
ht(a){var s,r
if(A.jX(a))return"{...}"
s=new A.by("")
try{r={}
B.a.m($.aj,a)
s.a+="{"
r.a=!0
a.ab(0,new A.hu(r,s))
s.a+="}"}finally{if(0>=$.aj.length)return A.n($.aj,-1)
$.aj.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
av:function av(a){var _=this
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
hq:function hq(a,b,c){this.a=a
this.b=b
this.c=c},
C:function C(){},
F:function F(){},
hs:function hs(a){this.a=a},
hu:function hu(a,b){this.a=a
this.b=b},
cv:function cv(){},
bu:function bu(){},
ch:function ch(){},
bx:function bx(){},
cp:function cp(){},
bG:function bG(){},
n_(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aR(r)
q=A.kb(String(s))
throw A.j(q)}q=A.j9(p)
return q},
j9(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.dk(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.j9(a[s])
return a},
kd(a,b,c){return new A.c1(a,b)},
mB(a){return a.J()},
m6(a,b){return new A.iW(a,[],A.ni())},
m7(a,b,c){var s,r=new A.by(""),q=A.m6(r,b)
q.b_(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
dk:function dk(a,b){this.a=a
this.b=b
this.c=null},
dl:function dl(a){this.a=a},
cK:function cK(){},
cM:function cM(){},
c1:function c1(a,b){this.a=a
this.b=b},
cX:function cX(a,b){this.a=a
this.b=b},
hm:function hm(){},
ho:function ho(a){this.b=a},
hn:function hn(a){this.a=a},
iX:function iX(){},
iY:function iY(a,b){this.a=a
this.b=b},
iW:function iW(a,b,c){this.c=a
this.a=b
this.b=c},
kU(a){var s=A.lU(a,null)
if(s!=null)return s
throw A.j(A.kb(a))},
lB(a,b){a=A.W(a,new Error())
if(a==null)a=A.cx(a)
a.stack=b.q(0)
throw a},
hr(a,b,c,d){var s,r=c?J.kc(a,d):J.lK(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
bt(a,b,c){var s,r=A.d([],c.h("t<0>"))
for(s=J.G(a);s.j();)B.a.m(r,c.a(s.gp()))
if(b)return r
r.$flags=1
return r},
m(a,b){var s,r
if(Array.isArray(a))return A.d(a.slice(0),b.h("t<0>"))
s=A.d([],b.h("t<0>"))
for(r=J.G(a);r.j();)B.a.m(s,r.gp())
return s},
aK(a,b){var s=A.bt(a,!1,b)
s.$flags=3
return s},
kl(a,b,c){var s=J.G(b)
if(!s.j())return a
if(c.length===0){do a+=A.x(s.gp())
while(s.j())}else{a+=A.x(s.gp())
while(s.j())a=a+c+A.x(s.gp())}return a},
lX(){return A.bL(new Error())},
lA(a,b,c){var s,r
for(s=0;s<4;++s){r=a[s]
if(r.b===b)return r}throw A.j(A.ex(b,"name","No enum value with that name"))},
cP(a){if(typeof a=="number"||A.jN(a)||a==null)return J.bo(a)
if(typeof a=="string")return JSON.stringify(a)
return A.ki(a)},
lC(a,b){A.Y(a,"error",t.K)
A.Y(b,"stackTrace",t.l)
A.lB(a,b)},
cH(a){return new A.cG(a)},
cF(a,b){return new A.aB(!1,null,b,a)},
ex(a,b,c){return new A.aB(!0,a,b,c)},
ba(a,b,c,d,e){return new A.cc(b,c,!0,a,d,"Invalid value")},
lV(a,b,c){if(0>a||a>c)throw A.j(A.ba(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.j(A.ba(b,a,c,"end",null))
return b}return c},
cd(a,b){if(a<0)throw A.j(A.ba(a,0,null,b,null))
return a},
jy(a,b,c,d){return new A.cQ(b,!0,a,d,"Index out of range")},
bd(a){return new A.ci(a)},
kn(a){return new A.dd(a)},
kk(a){return new A.cg(a)},
Z(a){return new A.cL(a)},
kb(a){return new A.aG(a)},
lJ(a,b,c){var s,r
if(A.jX(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.d([],t.s)
B.a.m($.aj,a)
try{A.mW(a,s)}finally{if(0>=$.aj.length)return A.n($.aj,-1)
$.aj.pop()}r=A.kl(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
jz(a,b,c){var s,r
if(A.jX(a))return b+"..."+c
s=new A.by(b)
B.a.m($.aj,a)
try{r=s
r.a=A.kl(r.a,a,", ")}finally{if(0>=$.aj.length)return A.n($.aj,-1)
$.aj.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
mW(a,b){var s,r,q,p,o,n,m,l=a.gC(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.j())return
s=A.x(l.gp())
B.a.m(b,s)
k+=s.length+2;++j}if(!l.j()){if(j<=5)return
if(0>=b.length)return A.n(b,-1)
r=b.pop()
if(0>=b.length)return A.n(b,-1)
q=b.pop()}else{p=l.gp();++j
if(!l.j()){if(j<=4){B.a.m(b,A.x(p))
return}r=A.x(p)
if(0>=b.length)return A.n(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gp();++j
for(;l.j();p=o,o=n){n=l.gp();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.n(b,-1)
k-=b.pop().length+2;--j}B.a.m(b,"...")
return}}q=A.x(p)
r=A.x(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.n(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.m(b,m)
B.a.m(b,q)
B.a.m(b,r)},
hw(a,b,c,d){var s
if(B.l===c){s=J.ag(a)
b=J.ag(b)
return A.iu(A.aL(A.aL($.dv(),s),b))}if(B.l===d){s=J.ag(a)
b=J.ag(b)
c=J.ag(c)
return A.iu(A.aL(A.aL(A.aL($.dv(),s),b),c))}s=J.ag(a)
b=J.ag(b)
c=J.ag(c)
d=J.ag(d)
d=A.iu(A.aL(A.aL(A.aL(A.aL($.dv(),s),b),c),d))
return d},
lQ(a){var s,r,q=$.dv()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.v)(a),++r)q=A.aL(q,J.ag(a[r]))
return A.iu(q)},
cN:function cN(){},
dh:function dh(){},
D:function D(){},
cG:function cG(a){this.a=a},
aM:function aM(){},
aB:function aB(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cc:function cc(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
cQ:function cQ(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
ci:function ci(a){this.a=a},
dd:function dd(a){this.a=a},
cg:function cg(a){this.a=a},
cL:function cL(a){this.a=a},
d6:function d6(){},
cf:function cf(){},
iJ:function iJ(a){this.a=a},
aG:function aG(a){this.a=a},
a:function a(){},
ab:function ab(a,b,c){this.a=a
this.b=b
this.$ti=c},
ac:function ac(){},
A:function A(){},
dq:function dq(){},
it:function it(){this.b=this.a=0},
by:function by(a){this.a=a},
k4(a,b,c,d){var s,r,q,p,o,n=t.N,m=t.S,l=A.d([],t.aD),k=a.gaw(),j=a.gaw(),i=a.gaw(),h=A.kf(a.gaw().w,m,m),g=A.S(m,m)
for(s=a.gM(),r=J.G(s.a),s=new A.R(r,s.b,s.$ti.h("R<1>"));s.j();){q=r.gp()
g.B(0,q.a,q.d)}s=A.S(n,t.J)
for(r=d.length,p=0;p<d.length;d.length===r||(0,A.v)(d),++p){o=d[p]
s.B(0,o.a,o)}return new A.aF(a,b,c,k.b,j.c,i.d,h,g,s,A.bs(n),A.bs(n),A.bs(n),A.bs(m),A.bs(m),l,A.S(m,t.y))},
aY:function aY(a,b,c){this.a=a
this.b=b
this.c=c},
ey:function ey(a){this.a=a},
aF:function aF(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
dy:function dy(){},
dz:function dz(){},
dX:function dX(a){this.a=a},
dA:function dA(a,b){this.a=a
this.b=b},
e9:function e9(a,b){this.a=a
this.b=b},
ea:function ea(){},
e8:function e8(a){this.a=a},
e4:function e4(a){this.a=a},
e5:function e5(a){this.a=a},
e6:function e6(a){this.a=a},
e7:function e7(a){this.a=a},
e2:function e2(a){this.a=a},
e3:function e3(a){this.a=a},
dD:function dD(a){this.a=a},
dE:function dE(){},
dI:function dI(a,b){this.a=a
this.b=b},
dF:function dF(a){this.a=a},
dG:function dG(){},
dH:function dH(a,b){this.a=a
this.b=b},
dJ:function dJ(a){this.a=a},
dK:function dK(a,b){this.a=a
this.b=b},
dL:function dL(a){this.a=a},
dM:function dM(){},
dN:function dN(a){this.a=a},
dO:function dO(){},
dP:function dP(a){this.a=a},
dQ:function dQ(a){this.a=a},
dR:function dR(a){this.a=a},
dU:function dU(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dS:function dS(a){this.a=a},
dT:function dT(a){this.a=a},
dY:function dY(a){this.a=a},
dV:function dV(){},
dW:function dW(){},
dB:function dB(){},
dC:function dC(){},
dZ:function dZ(a){this.a=a},
e_:function e_(){},
e0:function e0(a){this.a=a},
e1:function e1(a){this.a=a},
aS(a,b,c,d){var s,r=b.f,q=A.f(r)
q=new A.b(r,q.h("e(1)").a(new A.eB(a)),q.h("b<1>")).gl(0)
r=b.gM()
if(!b.gM().gC(0).j())s=0
else{s=c.b.i(0,"countryIncome")
s.toString
s=B.b.k(s)}return new A.eA(a,q,r.G(0,s,new A.eC(d,c),t.S),b,c)},
eA:function eA(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eB:function eB(a){this.a=a},
eC:function eC(a,b){this.a=a
this.b=b},
a4(a){var s=a.x,r=s>=15?500:0,q=a.e
if(q===2)q=1000
else q=q===1?30:0
return a.w*3+a.r*0.35+a.f*0.15+s*1.5-a.y*2+r+q},
ae(a,b){var s=b?a.x*0.75:0,r=a.e
if(r===1)r=30
else r=r===2?-200:0
return a.w*100+a.r*0.35+a.f*0.15-a.y*2-s+r},
nG(a){return t.r.a(a).x>=15},
kS(a,b){var s=a.gbm(),r=a.gP(),q=b.b.i(0,"soldierPower")
q.toString
return s*(a.w+r*B.b.k(q))+B.a.G(a.ax,0,new A.ji(b,a),t.H)},
du(a,b,c,d){var s,r=b.b,q=r.i(0,"soldierHp")
q.toString
q=B.b.k(q)
s=b.c_(a.w,c,!1)
r=r.i(0,"soldierPower")
r.toString
return(a.f+d*q)*(s+d*B.b.k(r))*(1+a.ay/1000)},
b5:function b5(a,b){this.a=a
this.b=b},
bN:function bN(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
eD:function eD(a,b,c){this.a=a
this.b=b
this.c=c},
eE:function eE(){},
eF:function eF(){},
ji:function ji(a,b){this.a=a
this.b=b},
cE:function cE(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4){var _=this
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
aw:function aw(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eH:function eH(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.r=_.f=_.e=$
_.w=null
_.x=e},
f8:function f8(a){this.a=a},
f9:function f9(){},
fa:function fa(){},
fl:function fl(){},
fp:function fp(){},
fq:function fq(a){this.a=a},
fr:function fr(a){this.a=a},
fs:function fs(a){this.a=a},
ft:function ft(a,b){this.a=a
this.b=b},
fu:function fu(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fv:function fv(a){this.a=a},
fb:function fb(a,b){this.a=a
this.b=b},
fc:function fc(a){this.a=a},
fd:function fd(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fe:function fe(a,b,c){this.a=a
this.b=b
this.c=c},
ff:function ff(a){this.a=a},
fg:function fg(){},
fh:function fh(a){this.a=a},
fi:function fi(a){this.a=a},
fj:function fj(){},
fk:function fk(a,b){this.a=a
this.b=b},
fm:function fm(a){this.a=a},
fn:function fn(){},
fo:function fo(a){this.a=a},
eR:function eR(a,b){this.a=a
this.b=b},
eS:function eS(a){this.a=a},
eT:function eT(a){this.a=a},
eU:function eU(){},
eV:function eV(){},
eW:function eW(a,b){this.a=a
this.b=b},
eX:function eX(a){this.a=a},
eN:function eN(a){this.a=a},
eO:function eO(a,b,c){this.a=a
this.b=b
this.c=c},
eP:function eP(a,b,c){this.a=a
this.b=b
this.c=c},
eQ:function eQ(a){this.a=a},
f0:function f0(a){this.a=a},
f1:function f1(a,b){this.a=a
this.b=b},
f2:function f2(a){this.a=a},
f3:function f3(a,b){this.a=a
this.b=b},
f4:function f4(a){this.a=a},
f5:function f5(a){this.a=a},
f6:function f6(){},
f7:function f7(a){this.a=a},
eZ:function eZ(a){this.a=a},
f_:function f_(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eY:function eY(a,b,c,d){var _=this
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
a7:function a7(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fw:function fw(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hg:function hg(a,b){this.a=a
this.b=b},
hh:function hh(a){this.a=a},
hf:function hf(a){this.a=a},
hi:function hi(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hd:function hd(){},
hc:function hc(){},
he:function he(){},
hb:function hb(){},
fx:function fx(){},
fy:function fy(){},
fz:function fz(){},
fK:function fK(){},
fV:function fV(a){this.a=a},
fX:function fX(){},
fY:function fY(){},
fZ:function fZ(a){this.a=a},
h_:function h_(){},
h0:function h0(a){this.a=a},
h1:function h1(a){this.a=a},
fA:function fA(){},
fB:function fB(a){this.a=a},
h2:function h2(a,b){this.a=a
this.b=b},
fC:function fC(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fD:function fD(a,b){this.a=a
this.b=b},
fE:function fE(){},
fF:function fF(a){this.a=a},
fG:function fG(a){this.a=a},
fH:function fH(a,b,c){this.a=a
this.b=b
this.c=c},
fI:function fI(a){this.a=a},
fJ:function fJ(a,b,c){this.a=a
this.b=b
this.c=c},
fL:function fL(a){this.a=a},
fM:function fM(){},
fN:function fN(){},
fO:function fO(){},
fP:function fP(a,b){this.a=a
this.b=b},
fQ:function fQ(){},
fR:function fR(a){this.a=a},
fS:function fS(a){this.a=a},
fT:function fT(a){this.a=a},
fU:function fU(){},
fW:function fW(a){this.a=a},
h8:function h8(a){this.a=a},
h9:function h9(a){this.a=a},
ha:function ha(){},
h3:function h3(){},
h4:function h4(a){this.a=a},
h5:function h5(){},
h6:function h6(a){this.a=a},
h7:function h7(a){this.a=a},
el(a){var s,r=a.length
if(0>=r)return A.n(a,0)
s=A.z(a[0])
if(1>=r)return A.n(a,1)
return new A.w(s,A.z(a[1]))},
w:function w(a,b){this.a=a
this.b=b},
ek:function ek(a){this.a=a},
k3(c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9=A.J(c3.i(0,"id")),b0=A.h(c3.i(0,"c")),b1=A.h(c3.i(0,"home")),b2=A.h(c3.i(0,"o")),b3=A.h(c3.i(0,"t")),b4=A.z(c3.i(0,"hp")),b5=A.h(c3.i(0,"max")),b6=A.h(c3.i(0,"a")),b7=A.h(c3.i(0,"p")),b8=A.h(c3.i(0,"pay")),b9=t.j,c0=A.el(b9.a(c3.i(0,"xy"))),c1=A.el(b9.a(c3.i(0,"v"))),c2=A.h(c3.i(0,"s"))
if(!(c2>=0&&c2<8))return A.n(B.L,c2)
c2=B.L[c2]
s=A.d([],t.n)
for(r=b9.a(c3.i(0,"troops")),q=r.length,p=0;p<r.length;r.length===q||(0,A.v)(r),++p)s.push(A.z(r[p]))
r=t.R
q=t.S
o=A.bt(r.a(c3.i(0,"w")),!0,q)
n=A.z(c3.i(0,"m"))
m=A.z(c3.i(0,"due"))
l=c3.i(0,"to")==null?null:A.el(b9.a(c3.i(0,"to")))
k=A.a3(c3.i(0,"target"))
j=A.z(c3.i(0,"return"))
i=A.ay(c3.i(0,"dispatch"))
h=A.ay(c3.i(0,"move"))
g=A.ay(c3.i(0,"dismiss"))
f=A.ay(c3.i(0,"upgrade"))
e=A.ay(c3.i(0,"retreat"))
d=A.ay(c3.i(0,"marked"))
c=A.J(c3.i(0,"rev"))
b=A.h(c3.i(0,"orderRev"))
a=A.bH(c3.i(0,"opponent"))
a0=A.h(c3.i(0,"clashes"))
a1=A.z(c3.i(0,"received"))
a2=A.z(c3.i(0,"dealt"))
a3=A.ay(c3.i(0,"opening"))
a4=A.ay(c3.i(0,"weaponReady"))
a5=A.d([],t._)
for(r=J.G(r.a(c3.i(0,"returnPath")));r.j();){a6=b9.a(r.gp())
a7=a6.length
if(0>=a7)return A.n(a6,0)
a8=A.z(a6[0])
if(1>=a7)return A.n(a6,1)
a5.push(new A.w(a8,A.z(a6[1])))}b9=A.a3(c3.i(0,"regionCity"))
r=A.a3(c3.i(0,"salaryPaidMonth"))
if(r==null)r=-1
a6=A.dr(c3.i(0,"movementPending"))
return new A.p(a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,c0,c1,c2,A.aK(s,t.i),A.aK(o,q),n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,b9,r,a6===!0)},
lm(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=A.h(a2.i(0,"id")),d=A.h(a2.i(0,"c")),c=A.h(a2.i(0,"native")),b=A.h(a2.i(0,"level")),a=t.j,a0=A.el(a.a(a2.i(0,"xy"))),a1=A.d([],t._)
for(s=a.a(a2.i(0,"outline")),r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q){p=a.a(s[q])
o=p.length
if(0>=o)return A.n(p,0)
n=A.z(p[0])
if(1>=o)return A.n(p,1)
a1.push(new A.w(n,A.z(p[1])))}a=A.h(a2.i(0,"income"))
s=A.h(a2.i(0,"poor"))
r=A.h(a2.i(0,"cap"))
p=A.h(a2.i(0,"recruitCap"))
o=A.ay(a2.i(0,"recruit"))
n=A.J(a2.i(0,"rev"))
m=A.h(a2.i(0,"baseIncome"))
l=A.a3(a2.i(0,"initial"))
k=A.h(a2.i(0,"wins"))
j=A.bH(a2.i(0,"attacker"))
i=A.bH(a2.i(0,"defender"))
h=A.J(a2.i(0,"stage"))
g=A.z(a2.i(0,"next"))
f=A.dr(a2.i(0,"fallen"))
return new A.M(e,d,c,b,a0,new A.ek(a1),a,s,r,p,m,o,n,l,k,j,i,h,g,f===!0,A.z(a2.i(0,"danger")))},
ln(a){var s,r,q,p,o,n=A.h(a.i(0,"id")),m=A.h(a.i(0,"gold")),l=A.h(a.i(0,"reserves")),k=A.h(a.i(0,"capacity")),j=A.h(a.i(0,"salary")),i=A.h(a.i(0,"poor")),h=A.U(a.i(0,"garrisonAccrued"))
if(h==null)h=0
s=t.S
r=A.S(s,s)
for(q=t.f,p=q.a(a.i(0,"stock")).gam(),p=p.gC(p);p.j();){o=p.gp()
r.B(0,A.kU(A.J(o.a)),A.h(o.b))}p=A.S(s,s)
for(q=q.a(a.i(0,"hate")).gam(),q=q.gC(q);q.j();){o=q.gp()
p.B(0,A.kU(A.J(o.a)),A.h(o.b))}return new A.b3(n,m,l,k,j,i,h,A.eG(r,s,s),A.eG(p,s,s))},
lo(a){var s,r,q,p,o,n,m=A.h(a.i(0,"country")),l=A.h(a.i(0,"tick")),k=A.z(a.i(0,"month")),j=A.d([],t.Y)
for(s=t.R,r=J.G(s.a(a.i(0,"cities"))),q=t.f,p=t.N,o=t.z;r.j();)j.push(A.lm(A.as(q.a(r.gp()),p,o)))
r=A.d([],t.e)
for(n=J.G(s.a(a.i(0,"heroes")));n.j();)r.push(A.k3(A.as(q.a(n.gp()),p,o)))
n=A.d([],t.eu)
for(s=J.G(s.a(a.i(0,"countries")));s.j();)n.push(A.ln(A.as(q.a(s.gp()),p,o)))
s=A.h(a.i(0,"pool"))
q=A.h(a.i(0,"salary"))
p=A.a3(a.i(0,"year"))
if(p==null)p=1
o=A.a3(a.i(0,"monthIndex"))
if(o==null)o=0
return new A.ec(m,l,p,o,k,A.aK(j,t.q),A.aK(r,t.r),A.aK(n,t.t),s,q)},
ak:function ak(a,b){this.a=a
this.b=b},
p:function p(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8){var _=this
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
_.R8=b8},
dx:function dx(){},
dw:function dw(){},
M:function M(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1){var _=this
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
b3:function b3(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
ec:function ec(a,b,c,d,e,f,g,h,i,j){var _=this
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
ei:function ei(a){this.a=a},
ej:function ej(a){this.a=a},
ef:function ef(a,b){this.a=a
this.b=b},
ee:function ee(a){this.a=a},
eg:function eg(){},
eh:function eh(a){this.a=a},
ed:function ed(a){this.a=a},
jS(a,b,c){var s,r,q=null,p=a.as
if(p===B.f||p===B.e||p===B.t)return q
s=c.y.i(0,a.a)
p=s==null
if((p?q:s.b)==="expedition")p=p?q:s.d
else p=a.cx
r=b.I(p)
return r!=null&&r.b!==a.b?r:q},
jR(a,b,c,d){var s,r,q=A.jS(a,b,c)
if(q==null)return!1
s=a.as
r=!0
if(s!==B.x)if(s!==B.E){s=a.z
s=q.f.a0(s).E(s)<=d.w.p2}else s=r
else s=r
return s},
ca(a,b,c,d,e){var s=B.a.K(a.f,new A.hy(e,a))?e:null
s=new A.hx(a,b,c,s,d,A.S(t.S,t.bd))
s.cs(a,b,c,d,e)
return s},
hx:function hx(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hy:function hy(a,b){this.a=a
this.b=b},
hz:function hz(){},
hD:function hD(a){this.a=a},
hF:function hF(a){this.a=a},
hG:function hG(a){this.a=a},
hE:function hE(a,b){this.a=a
this.b=b},
hB:function hB(){},
hC:function hC(a,b){this.a=a
this.b=b},
hH:function hH(a){this.a=a},
hA:function hA(a){this.a=a},
cb:function cb(a,b){this.a=a
this.b=b},
hI:function hI(a,b,c){this.a=a
this.b=b
this.c=c},
hL:function hL(a,b){this.a=a
this.b=b},
hJ:function hJ(a,b,c){this.a=a
this.b=b
this.c=c},
hK:function hK(){},
hO:function hO(a){this.a=a},
hP:function hP(){},
hQ:function hQ(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hR:function hR(){},
hS:function hS(){},
hM:function hM(){},
hN:function hN(a){this.a=a},
ls(a){var s,r,q,p,o,n,m,l,k=A.J(a.i(0,"hero")),j=A.J(a.i(0,"role")),i=A.h(a.i(0,"deadline")),h=A.h(a.i(0,"commit")),g=A.a3(a.i(0,"city")),f=A.bH(a.i(0,"enemy")),e=A.d([],t._)
for(s=J.G(t.R.a(a.i(0,"points"))),r=t.j;s.j();){q=r.a(s.gp())
p=q.length
if(0>=p)return A.n(q,0)
o=A.z(q[0])
if(1>=p)return A.n(q,1)
e.push(new A.w(o,A.z(q[1])))}s=A.h(a.i(0,"leg"))
r=A.h(a.i(0,"gold"))
q=A.ay(a.i(0,"slot"))
p=A.dr(a.i(0,"rearStaging"))
o=A.J(a.i(0,"reason"))
n=A.h(a.i(0,"order"))
m=A.a3(a.i(0,"targetCountry"))
l=A.dr(a.i(0,"attrition"))
return new A.a5(k,j,o,g,m,l===!0,f,e,s,i,h,r,q,p===!0,n)},
lp(a){var s,r,q,p,o,n,m,l,k,j,i
if(!J.af(a.i(0,"protocol"),1))throw A.j(B.a3)
s=A.J(a.i(0,"session"))
r=A.h(a.i(0,"id"))
q=A.J(a.i(0,"rules"))
p=A.J(a.i(0,"map"))
o=t.f
n=t.N
m=t.z
l=A.lo(A.as(o.a(a.i(0,"observation")),n,m))
k=A.h(a.i(0,"deadline"))
j=A.d([],t.m)
for(i=J.G(t.R.a(a.i(0,"tasks")));i.j();)j.push(A.ls(A.as(o.a(i.gp()),n,m)))
o=A.h(a.i(0,"seed"))
n=A.h(a.i(0,"priority"))
m=A.h(a.i(0,"idle"))
i=A.bH(a.i(0,"stage"))
if(i==null)i="full"
return new A.en(s,q,p,r,k,o,n,m,A.lA(B.ae,i,t.a9),A.a3(a.i(0,"offensiveCountry")),A.a3(a.i(0,"offensiveCity")),l,j)},
k5(a,b,c,d){var s=a.Q
return new A.em(a.a,a.b,a.c,a.d,s.a,s.b,a.e,d,b,c)},
aE:function aE(a,b){this.a=a
this.b=b},
ao:function ao(a,b){this.a=a
this.b=b},
y:function y(a,b,c,d,e,f){var _=this
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
E:function E(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bR:function bR(a,b,c,d,e,f,g,h,i,j){var _=this
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
en:function en(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
em:function em(a,b,c,d,e,f,g,h,i,j){var _=this
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
jc(b1,b2,b3,b4,b5,b6,b7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3="soldierLimit",a4="soldierPower",a5="soldierHp",a6={},a7=b3.u(b2.a),a8=A.f(a7).h("L<1>"),a9=A.a_(new A.L(a7,a8),0,A.Y(b2.gag(),"count",t.S),a8.h("k.E")).af(0),b0=A.aS(b2.b,b3,b4,null)
a6.a=a6.b=1
a6.c=null
a8=b4.d0(b1.w,!1)
a7=b4.b
s=a7.i(0,a3)
s.toString
s=B.b.k(s)
r=a7.i(0,a4)
r.toString
q=a8+s*B.b.k(r)
p=B.a.ar(b3.w,new A.jd(b2)).c
for(a8=b2.cy,s=b2.at,r=b2.ax,o=s==null,n=b2.d,m=t.a,l=b4.d,k=0,j=0;j<a9.length;++j){i=a9[j]
h=a7.i(0,a3)
h.toString
g=Math.min(B.b.k(h),p+i.gP())
p=Math.max(0,p-(g-i.gP()))
if(o)h=n
else{h=a8?1:0
h=B.c.v(s-r-h,0,5)}h=Math.max(1,h-j)
f=a7.i(0,a3)
f.toString
f=B.b.k(f)
e=b5.d8(b1,i,h,!1,g,j<b6.length?A.d([b6[j]],m):B.d,!0,f)
a6.b=Math.min(a6.b,e.b)
if(j===0)a6.c=e
a6.a=Math.min(a6.a,e.c)
if(o)h=n
else{h=a8?1:0
h=B.c.v(s-r-h,0,5)}h=A.h(Math.max(1,h-j))
f=B.c.v(B.c.Y(i.w),0,63)
if(h>0){d=l.length
h=B.c.v(h-1,0,d-1)
if(!(h>=0&&h<d))return A.n(l,h)
h=l[h]}else h=0
h=B.c.v(f+h,0,63)
f=a7.i(0,a4)
f.toString
c=(h+g*B.b.k(f))/Math.max(1,q)
f=a7.i(0,a5)
f.toString
k+=(i.f+g*B.b.k(f))*c*c}for(a8=b4.r,s=b4.w,r=s.rx,b=0,j=0;o=b6.length,j<Math.min(o,a9.length);++j){if(!(j<o))return A.n(b6,j)
a=a8.i(0,b6[j])
if(a!=null){o=Math.max(0,a.c-a.d)
b+=o*(j===0?1:r)}}a8=b1.f
r=a7.i(0,a3)
r.toString
r=B.b.k(r)
a7=a7.i(0,a5)
a7.toString
a0=Math.max(1,B.b.ap(k/Math.max(1,(a8+r*B.b.k(a7)+b)*0.85)))
a7=new A.je(a6,a9,b1,b4)
a1=a7.$0()
if(a1.a[2]>0)return a1
if(a9.length!==0&&J.jw(b6)&&a6.b<s.k4)return new A.aO([!1,a6.b,0,a6.a])
r=s.fy
if(a0>r)return a7.$0()
o=a9.length
m=o===0
if(!m)a8=o===1&&n<=2&&a8>=b1.r*0.8&&a6.b>s.ry||a6.b>s.RG+Math.max(0,o-1)*0.025-b7
else a8=!0
if(a8){a7=a6.b
a8=a6.a
return new A.aO([!1,a7,b0.ce(a7>=s.k4||m?a0:Math.max(2,a0),o),a8])}a2=o>1&&a6.a>s.RG&&a6.b>-0.08?Math.min(r,o):0
if(a2===0)return a7.$0()
a7=a6.b
a8=a6.a
return new A.aO([!1,a7,b0.ce(a2,o),a8])},
jd:function jd(a){this.a=a},
je:function je(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
nD(a,b,c,d,e,f,g,h){var s
if(f<3||e)return!1
s=d*h+80+g
return c.aE(0,new A.jq(a,s))&&b.aE(0,new A.jr(a,s))},
jq:function jq(a,b){this.a=a
this.b=b},
jr:function jr(a,b){this.a=a
this.b=b},
hW:function hW(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hZ:function hZ(a){this.a=a},
i_:function i_(){},
i0:function i0(a,b,c){this.a=a
this.b=b
this.c=c},
ib:function ib(a,b,c){this.a=a
this.b=b
this.c=c},
hY:function hY(a,b){this.a=a
this.b=b},
hX:function hX(a,b,c){this.a=a
this.b=b
this.c=c},
ik:function ik(a,b){this.a=a
this.b=b},
il:function il(a,b){this.a=a
this.b=b},
io:function io(a){this.a=a},
ip:function ip(){},
im:function im(a,b,c){this.a=a
this.b=b
this.c=c},
iq:function iq(a){this.a=a},
ir:function ir(a,b){this.a=a
this.b=b},
i1:function i1(){},
i2:function i2(){},
i3:function i3(){},
i4:function i4(){},
i5:function i5(a){this.a=a},
i6:function i6(){},
i7:function i7(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
i8:function i8(a,b,c){this.a=a
this.b=b
this.c=c},
i9:function i9(a){this.a=a},
ia:function ia(a){this.a=a},
ic:function ic(){},
id:function id(){},
ie:function ie(a,b,c){this.a=a
this.b=b
this.c=c},
ig:function ig(a,b,c){this.a=a
this.b=b
this.c=c},
ih:function ih(a,b){this.a=a
this.b=b},
ii:function ii(a,b,c){this.a=a
this.b=b
this.c=c},
ij:function ij(){},
bp:function bp(a,b,c){this.a=a
this.b=b
this.d=c},
eo:function eo(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ep:function ep(){},
eq:function eq(a,b,c){this.a=a
this.b=b
this.c=c},
er:function er(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
es:function es(a,b,c){this.a=a
this.b=b
this.c=c},
et:function et(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
lq(a,b,c,d,e,f,g,h){var s,r,q,p,o=A.eG(f,t.N,t.H),n=t.S,m=A.aK(e,n),l=A.aK(a,n),k=t.i,j=A.aK(c,k)
k=A.aK(b,k)
s=t.z
s=A.S(s,s)
for(r=h.length,q=0;q<h.length;h.length===r||(0,A.v)(h),++q){p=h[q]
s.B(0,p.a,p)}return new A.eu(g,o,m,l,j,k,A.eG(s,n,t.o),d)},
lr(c9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2=A.J(c9.i(0,"version")),c3=t.f,c4=t.N,c5=A.as(c3.a(c9.i(0,"values")),c4,t.H),c6=t.R,c7=t.S,c8=A.bt(c6.a(c9.i(0,"upgrades")),!0,c7)
c7=A.bt(c6.a(c9.i(0,"defenseBonuses")),!0,c7)
s=t.n
r=A.d([],s)
for(q=J.G(c6.a(c9.i(0,"movement")));q.j();)r.push(A.z(q.gp()))
s=A.d([],s)
for(q=J.G(c6.a(c9.i(0,"field")));q.j();)s.push(A.z(q.gp()))
q=A.d([],t.b8)
for(c6=J.G(c6.a(c9.i(0,"weapons"))),p=t.j;c6.j();){o=p.a(c6.gp())
n=o.length
if(0>=n)return A.n(o,0)
m=A.h(o[0])
if(1>=n)return A.n(o,1)
l=A.h(o[1])
if(2>=n)return A.n(o,2)
k=A.h(o[2])
if(3>=n)return A.n(o,3)
j=A.h(o[3])
if(4>=n)return A.n(o,4)
i=A.h(o[4])
if(5>=n)return A.n(o,5)
h=A.ay(o[5])
if(6>=n)return A.n(o,6)
q.push(new A.ap(m,l,k,j,i,h,A.z(o[6])))}c3=A.as(c3.a(c9.i(0,"tuning")),c4,t.z)
c4=A.z(c3.i(0,"interval"))
c6=A.U(c3.i(0,"resourceInterval"))
if(c6==null)c6=30
p=A.a3(c3.i(0,"cashBuffer"))
if(p==null)p=12
o=A.U(c3.i(0,"payrollRatio"))
if(o==null)o=0.5
n=A.a3(c3.i(0,"dangerousCountryCities"))
if(n==null)n=3
m=A.U(c3.i(0,"coalitionBudgetBase"))
if(m==null)m=0.5
l=A.U(c3.i(0,"coalitionBudgetStep"))
if(l==null)l=0.25
k=A.U(c3.i(0,"coalitionTargetBase"))
if(k==null)k=45
j=A.U(c3.i(0,"coalitionTargetStep"))
if(j==null)j=15
i=A.U(c3.i(0,"coalitionPayrollCeiling"))
if(i==null)i=0.8
h=A.U(c3.i(0,"coalitionTravel"))
if(h==null)h=45
g=A.U(c3.i(0,"targetTravelScale"))
if(g==null)g=25
f=A.U(c3.i(0,"hatredTargetBonus"))
if(f==null)f=90
e=A.U(c3.i(0,"breakthroughMargin"))
if(e==null)e=0.1
d=A.z(c3.i(0,"threat"))
c=A.z(c3.i(0,"urgent"))
b=A.z(c3.i(0,"margin"))
a=A.z(c3.i(0,"commit"))
a0=A.a3(c3.i(0,"rearExtra"))
if(a0==null)a0=1
a1=A.h(c3.i(0,"candidates"))
a2=A.h(c3.i(0,"assessments"))
a3=A.h(c3.i(0,"routes"))
a4=A.h(c3.i(0,"plans"))
a5=A.h(c3.i(0,"commands"))
a6=A.h(c3.i(0,"team"))
a7=A.a3(c3.i(0,"fronts"))
if(a7==null)a7=2
a8=A.a3(c3.i(0,"singleFrontMonths"))
if(a8==null)a8=12
a9=A.U(c3.i(0,"splitForce"))
if(a9==null)a9=2.25
b0=A.U(c3.i(0,"splitAdvantage"))
if(b0==null)b0=0.3
b1=A.U(c3.i(0,"arrivalSpread"))
if(b1==null)b1=20
b2=A.U(c3.i(0,"expeditionSeconds"))
if(b2==null)b2=900
b3=A.U(c3.i(0,"assaultCommitDistance"))
if(b3==null)b3=64
b4=A.U(c3.i(0,"recallCriticalMargin"))
if(b4==null)b4=0.25
b5=A.a3(c3.i(0,"attritionCombat"))
if(b5==null)b5=8
b6=A.U(c3.i(0,"attritionGain"))
if(b6==null)b6=0.06
b7=A.h(c3.i(0,"targets"))
b8=A.h(c3.i(0,"slice"))
b9=A.z(c3.i(0,"advantage"))
c0=A.z(c3.i(0,"expansion"))
c1=A.z(c3.i(0,"credit"))
return A.lq(c7,s,r,new A.cE(c4,d,c,b,c6,p,o,n,m,l,k,j,i,h,g,f,e,a,A.z(c3.i(0,"age")),a0,a1,a2,a3,a4,a5,a6,b7,b8,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b9,c1,c0,A.h(c3.i(0,"timeout")),A.h(c3.i(0,"restarts")),A.z(c3.i(0,"stagnation"))),c8,c5,c2,q)},
ap:function ap(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
eu:function eu(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
eb:function eb(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ew:function ew(a,b,c){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=0
_.r=c},
bm(a,b,c,d,e,f){var s,r,q,p,o,n,m=a.a,l=c.u(m),k=A.f(l).h("L<1>"),j=A.a_(new A.L(l,k),0,A.Y(a.gag(),"count",t.S),k.h("k.E")).af(0)
if(j.length===0)s=0
else{l=A.f(j)
s=new A.Q(j,l.h("i(1)").a(new A.js()),l.h("Q<1,i>")).ae(0,B.z)}l=c.r
k=A.f(l)
r=new A.b(l,k.h("e(1)").a(new A.jt(a)),k.h("b<1>")).G(0,0,new A.ju(),t.i)
k=a.b
l=c.gaw().x.i(0,k)
l=B.c.v(l==null?0:l,0,100)
k=A.aS(k,c,d,null)
if(k.ga6()){q=k.e.w
p=q.z+k.gba()*q.Q}else p=0
o=e^m*7919
o^=o<<13
o^=o>>>17
if(f==null){m=b.z.E(a.e)
k=d.b.i(0,"marchSpeed")
k.toString
q=d.e
if(0>=q.length)return A.n(q,0)
n=m/(k*q[0])}else n=f
if(a.c===b.b)m=1
else{m=d.b.i(0,"foreignYield")
m.toString}k=d.w
return Math.max(1,160+a.z*m*2+r+p+l/100*k.ay-s*0.25-a.d*6)/Math.pow(1+n/k.ax,1.5)+((o^o<<5)&65535)/65536*0.000001},
js:function js(){},
jt:function jt(a){this.a=a},
ju:function ju(){},
a2:function a2(a,b,c){this.a=a
this.b=b
this.c=c},
ar:function ar(a,b,c,d){var _=this
_.a=a
_.d=b
_.f=c
_.r=d},
ez:function ez(){},
iv:function iv(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iw:function iw(a){this.a=a},
ix:function ix(){},
iy:function iy(a){this.a=a},
iz:function iz(a){this.a=a},
iA:function iA(a){this.a=a},
iB:function iB(a){this.a=a},
iC:function iC(){},
ev:function ev(a){var _=this
_.a=a
_.d=_.c=_.b=0
_.e=!1},
ny(){var s,r,q=new A.jn(),p=v.G,o="web-worker:"+A.J(p.self.constructor.name)
p=A.j6(p.self)
s=new A.jo(new A.ew(q,o,A.bs(t.S)))
if(typeof s=="function")A.cC(A.cF("Attempting to rewrap a JS function.",null))
r=function(a,b){return function(c){return a(b,c,arguments.length)}}(A.mA,s)
r[$.jZ()]=s
p.onmessage=r
q.$1(B.j.aq(t.G.a(A.T(["kind","hello","protocol",1,"build","15a64ec","backend",o],t.N,t.X)),null))},
jn:function jn(){},
jo:function jo(a){this.a=a},
l1(a){return v.mangledGlobalNames[a]},
nE(a){throw A.W(new A.c2("Field '"+a+"' has been assigned during initialization."),new Error())},
O(){throw A.W(A.lM(""),new Error())},
mA(a,b,c){t.k.a(a)
if(A.h(c)>=1)return a.$1(b)
return a.$0()},
kX(a,b,c){A.kP(c,t.H,"T","min")
return Math.min(c.a(a),c.a(b))},
kW(a,b,c){A.kP(c,t.H,"T","max")
return Math.max(c.a(a),c.a(b))},
nq(a,b,c,d,e,f,g,h){var s,r,q,p,o,n,m,l=null,k=f.E(a),j=!c
if(j&&k>d*b+80)return l
s=h.a
r=h.b
q=Math.sqrt(s*s+r*r)
p=q<0.01?0:((a.a-f.a)*s+(a.b-f.b)*r)/(Math.max(1,k)*q)
if(j&&k>72){if(p<0.45)return l
o=Math.max(0,k*p)
n=new A.w(f.a+s/q*o,f.b+r/q*o)
if(e.a0(n).E(n)>48)return l}m=g.$2(f,e.bX(f,a))
if(isFinite(m))j=!j||m<=b
else j=!1
return j?m:l},
jD(a,b,c){var s=Math.max(0,a-c)
return s*s*b}},B={}
var w=[A,J,B]
var $={}
A.jA.prototype={}
J.cS.prototype={
a7(a,b){return a===b},
gR(a){return A.d8(a)},
q(a){return"Instance of '"+A.d9(a)+"'"},
gU(a){return A.aQ(A.jM(this))}}
J.cU.prototype={
q(a){return String(a)},
gR(a){return a?519018:218159},
gU(a){return A.aQ(t.y)},
$iB:1,
$ie:1}
J.bY.prototype={
a7(a,b){return null==b},
q(a){return"null"},
gR(a){return 0},
$iB:1}
J.c_.prototype={$iN:1}
J.aW.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.d7.prototype={}
J.bz.prototype={}
J.aV.prototype={
q(a){var s=a[$.l3()]
if(s==null)s=a[$.jZ()]
if(s==null)return this.cr(a)
return"JavaScript function for "+J.bo(s)},
$iaH:1}
J.bZ.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.c0.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.t.prototype={
m(a,b){A.f(a).c.a(b)
a.$flags&1&&A.cD(a,29)
a.push(b)},
an(a,b){var s
a.$flags&1&&A.cD(a,"remove",1)
for(s=0;s<a.length;++s)if(J.af(a[s],b)){a.splice(s,1)
return!0}return!1},
F(a,b){var s
A.f(a).h("a<1>").a(b)
a.$flags&1&&A.cD(a,"addAll",2)
if(Array.isArray(b)){this.cz(a,b)
return}for(s=J.G(b);s.j();)a.push(s.gp())},
cz(a,b){var s,r
t.gn.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.j(A.Z(a))
for(r=0;r<s;++r)a.push(b[r])},
aD(a){a.$flags&1&&A.cD(a,"clear","clear")
a.length=0},
aH(a,b,c){var s=A.f(a)
return new A.Q(a,s.H(c).h("1(2)").a(b),s.h("@<1>").H(c).h("Q<1,2>"))},
dq(a,b){var s,r=A.hr(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.B(r,s,A.x(a[s]))
return r.join(b)},
cd(a,b){return A.a_(a,0,A.Y(b,"count",t.S),A.f(a).c)},
b1(a,b){return A.a_(a,b,null,A.f(a).c)},
ae(a,b){var s,r,q
A.f(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.j(A.aC())
if(0>=s)return A.n(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.j(A.Z(a))}return r},
G(a,b,c,d){var s,r,q
d.a(b)
A.f(a).H(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.j(A.Z(a))}return r},
ar(a,b){var s,r,q
A.f(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.j(A.Z(a))}throw A.j(A.aC())},
V(a,b){if(!(b>=0&&b<a.length))return A.n(a,b)
return a[b]},
gD(a){if(a.length>0)return a[0]
throw A.j(A.aC())},
gaF(a){var s=a.length
if(s>0)return a[s-1]
throw A.j(A.aC())},
K(a,b){var s,r
A.f(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.j(A.Z(a))}return!1},
aE(a,b){var s,r
A.f(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.j(A.Z(a))}return!0},
A(a,b){var s,r,q,p,o,n=A.f(a)
n.h("c(1,1)?").a(b)
a.$flags&2&&A.cD(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dO()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.dt(b,2))
if(p>0)this.cQ(a,p)},
cQ(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
n(a,b){var s
for(s=0;s<a.length;++s)if(J.af(a[s],b))return!0
return!1},
ga_(a){return a.length===0},
gav(a){return a.length!==0},
q(a){return A.jz(a,"[","]")},
gC(a){return new J.b4(a,a.length,A.f(a).h("b4<1>"))},
gR(a){return A.d8(a)},
gl(a){return a.length},
B(a,b,c){A.f(a).c.a(c)
a.$flags&2&&A.cD(a)
if(!(b>=0&&b<a.length))throw A.j(A.kQ(a,b))
a[b]=c},
dk(a,b){var s
A.f(a).h("e(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$ir:1,
$ia:1,
$iq:1}
J.cT.prototype={
dH(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.d9(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.hk.prototype={}
J.b4.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.v(q)
throw A.j(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iH:1}
J.br.prototype={
t(a,b){var s
A.z(b)
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
ap(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.j(A.bd(""+a+".ceil()"))},
Y(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.j(A.bd(""+a+".floor()"))},
bt(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.j(A.bd(""+a+".round()"))},
v(a,b,c){if(B.c.t(b,c)>0)throw A.j(A.kM(b))
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
aO(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.bR(a,b)},
bg(a,b){return(a|0)===a?a/b|0:this.bR(a,b)},
bR(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.j(A.bd("Result of truncating division is "+A.x(s)+": "+A.x(a)+" ~/ "+A.x(b)))},
bP(a,b){var s
if(a>0)s=this.cU(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cU(a,b){return b>31?0:a>>>b},
gU(a){return A.aQ(t.H)},
$ii:1,
$ia1:1}
J.bX.prototype={
gU(a){return A.aQ(t.S)},
$iB:1,
$ic:1}
J.cV.prototype={
gU(a){return A.aQ(t.i)},
$iB:1}
J.b7.prototype={
aN(a,b,c){return a.substring(b,A.lV(b,c,a.length))},
bv(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.j(B.a_)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
ds(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bv(c,s)+a},
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
gU(a){return A.aQ(t.N)},
gl(a){return a.length},
$iB:1,
$iI:1}
A.c2.prototype={
q(a){return"LateInitializationError: "+this.a}}
A.is.prototype={}
A.r.prototype={}
A.k.prototype={
gC(a){var s=this
return new A.o(s,s.gl(s),A.l(s).h("o<k.E>"))},
ga_(a){return this.gl(this)===0},
K(a,b){var s,r,q=this
A.l(q).h("e(k.E)").a(b)
s=q.gl(q)
for(r=0;r<s;++r){if(b.$1(q.V(0,r)))return!0
if(s!==q.gl(q))throw A.j(A.Z(q))}return!1},
aH(a,b,c){var s=A.l(this)
return new A.Q(this,s.H(c).h("1(k.E)").a(b),s.h("@<k.E>").H(c).h("Q<1,2>"))},
ae(a,b){var s,r,q,p=this
A.l(p).h("k.E(k.E,k.E)").a(b)
s=p.gl(p)
if(s===0)throw A.j(A.aC())
r=p.V(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.V(0,q))
if(s!==p.gl(p))throw A.j(A.Z(p))}return r},
G(a,b,c,d){var s,r,q,p=this
d.a(b)
A.l(p).H(d).h("1(1,k.E)").a(c)
s=p.gl(p)
for(r=b,q=0;q<s;++q){r=c.$2(r,p.V(0,q))
if(s!==p.gl(p))throw A.j(A.Z(p))}return r},
dG(a){var s,r=this,q=A.lN(A.l(r).h("k.E"))
for(s=0;s<r.gl(r);++s)q.m(0,r.V(0,s))
return q}}
A.u.prototype={
S(a,b,c,d){var s,r=this.b
A.cd(r,"start")
s=this.c
if(s!=null){A.cd(s,"end")
if(r>s)throw A.j(A.ba(r,0,s,"start",null))}},
gcI(){var s=J.bn(this.a),r=this.c
if(r==null||r>s)return s
return r},
gcX(){var s=J.bn(this.a),r=this.b
if(r>s)return s
return r},
gl(a){var s,r=J.bn(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
V(a,b){var s=this,r=s.gcX()+b
if(b<0||r>=s.gcI())throw A.j(A.jy(b,s.gl(0),s,"index"))
return J.jv(s.a,r)},
af(a){var s,r,q,p=this,o=p.b,n=p.a,m=J.cB(n),l=m.gl(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.kc(0,p.$ti.c)
return n}r=A.hr(s,m.V(n,o),!0,p.$ti.c)
for(q=1;q<s;++q){B.a.B(r,q,m.V(n,o+q))
if(m.gl(n)<l)throw A.j(A.Z(p))}return r}}
A.o.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=J.cB(q),o=p.gl(q)
if(r.b!==o)throw A.j(A.Z(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.V(q,s);++r.c
return!0},
$iH:1}
A.at.prototype={
gC(a){return new A.c4(J.G(this.a),this.b,A.l(this).h("c4<1,2>"))},
gl(a){return J.bn(this.a)}}
A.bS.prototype={$ir:1}
A.c4.prototype={
j(){var s=this,r=s.b
if(r.j()){s.a=s.c.$1(r.gp())
return!0}s.a=null
return!1},
gp(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iH:1}
A.Q.prototype={
gl(a){return J.bn(this.a)},
V(a,b){return this.b.$1(J.jv(this.a,b))}}
A.b.prototype={
gC(a){return new A.R(J.G(this.a),this.b,this.$ti.h("R<1>"))}}
A.R.prototype={
j(){var s,r
for(s=this.a,r=this.b;s.j();)if(r.$1(s.gp()))return!0
return!1},
gp(){return this.a.gp()},
$iH:1}
A.aT.prototype={
gC(a){return new A.bW(J.G(this.a),this.b,B.T,this.$ti.h("bW<1,2>"))}}
A.bW.prototype={
gp(){var s=this.d
return s==null?this.$ti.y[1].a(s):s},
j(){var s,r,q=this,p=q.c
if(p==null)return!1
for(s=q.a,r=q.b;!p.j();){q.d=null
if(s.j()){q.c=null
p=J.G(r.$1(s.gp()))
q.c=p}else return!1}q.d=q.c.gp()
return!0},
$iH:1}
A.bb.prototype={
gC(a){var s=this.a
return new A.bc(s.gC(s),this.b,A.l(this).h("bc<1>"))}}
A.bT.prototype={
gl(a){var s=this.a,r=s.gl(s)
s=this.b
if(r>s)return s
return r},
$ir:1}
A.bc.prototype={
j(){if(--this.b>=0)return this.a.j()
this.b=-1
return!1},
gp(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gp()},
$iH:1}
A.bU.prototype={
j(){return!1},
gp(){throw A.j(A.aC())},
$iH:1}
A.bA.prototype={
gC(a){return new A.cj(J.G(this.a),this.$ti.h("cj<1>"))}}
A.cj.prototype={
j(){var s,r
for(s=this.a,r=this.$ti.c;s.j();)if(r.b(s.gp()))return!0
return!1},
gp(){return this.$ti.c.a(this.a.gp())},
$iH:1}
A.K.prototype={
sl(a,b){throw A.j(A.bd("Cannot change the length of a fixed-length list"))},
m(a,b){A.az(a).h("K.E").a(b)
throw A.j(A.bd("Cannot add to a fixed-length list"))}}
A.L.prototype={
gl(a){return this.a.length},
V(a,b){var s=this.a
return J.jv(s,s.length-1-b)}}
A.bD.prototype={$r:"+(1,2)",$s:1}
A.aZ.prototype={$r:"+(1,2,3)",$s:2}
A.aO.prototype={$r:"+breakthrough,lower,teamSize,upper(1,2,3,4)",$s:3}
A.bE.prototype={$r:"+high,low,selfHigh,selfLow(1,2,3,4)",$s:4}
A.bP.prototype={}
A.bO.prototype={
ga_(a){return this.gl(this)===0},
gav(a){return this.gl(this)!==0},
q(a){return A.ht(this)},
gam(){return new A.ax(this.di(),A.l(this).h("ax<ab<1,2>>"))},
di(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gam(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.gac(),o=o.gC(o),n=A.l(s),m=n.y[1],n=n.h("ab<1,2>")
case 2:if(!o.j()){r=3
break}l=o.gp()
k=s.i(0,l)
r=4
return a.b=new A.ab(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$iaa:1}
A.bQ.prototype={
gl(a){return this.b.length},
gbI(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
a3(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
i(a,b){if(!this.a3(b))return null
return this.b[this.a[b]]},
ab(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbI()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gac(){return new A.bg(this.gbI(),this.$ti.h("bg<1>"))},
gaL(){return new A.bg(this.b,this.$ti.h("bg<2>"))}}
A.bg.prototype={
gl(a){return this.a.length},
gC(a){var s=this.a
return new A.ck(s,s.length,this.$ti.h("ck<1>"))}}
A.ck.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iH:1}
A.cR.prototype={
a7(a,b){if(b==null)return!1
return b instanceof A.b6&&this.a.a7(0,b.a)&&A.jV(this)===A.jV(b)},
gR(a){return A.hw(this.a,A.jV(this),B.l,B.l)},
q(a){var s=B.a.dq([A.aQ(this.$ti.c)],", ")
return this.a.q(0)+" with "+("<"+s+">")}}
A.b6.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.nv(A.jf(this.a),this.$ti)}}
A.hT.prototype={
$0(){return B.b.Y(1000*this.a.now())},
$S:5}
A.ce.prototype={}
A.iD.prototype={
ad(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.c9.prototype={
q(a){return"Null check operator used on a null value"}}
A.cW.prototype={
q(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.de.prototype={
q(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hv.prototype={
q(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.bV.prototype={}
A.cq.prototype={
q(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iaX:1}
A.a6.prototype={
q(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.l2(r==null?"unknown":r)+"'"},
$iaH:1,
gdM(){return this},
$C:"$1",
$R:1,
$D:null}
A.cI.prototype={$C:"$0",$R:0}
A.cJ.prototype={$C:"$2",$R:2}
A.dc.prototype={}
A.db.prototype={
q(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.l2(s)+"'"}}
A.bq.prototype={
a7(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bq))return!1
return this.$_target===b.$_target&&this.a===b.a},
gR(a){return(A.kY(this.a)^A.d8(this.$_target))>>>0},
q(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.d9(this.a)+"'")}}
A.da.prototype={
q(a){return"RuntimeError: "+this.a}}
A.aJ.prototype={
gl(a){return this.a},
ga_(a){return this.a===0},
gac(){return new A.a8(this,A.l(this).h("a8<1>"))},
gam(){return new A.b8(this,A.l(this).h("b8<1,2>"))},
a3(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dl(a)},
dl(a){var s=this.d
if(s==null)return!1
return this.bo(this.bG(s,a),a)>=0},
F(a,b){A.l(this).h("aa<1,2>").a(b).ab(0,new A.hl(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.dm(b)},
dm(a){var s,r,q=this.d
if(q==null)return null
s=this.bG(q,a)
r=this.bo(s,a)
if(r<0)return null
return s[r].b},
B(a,b,c){var s,r,q=this,p=A.l(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bA(s==null?q.b=q.bd():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bA(r==null?q.c=q.bd():r,b,c)}else q.dn(b,c)},
dn(a,b){var s,r,q,p,o=this,n=A.l(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.bd()
r=o.c7(a)
q=s[r]
if(q==null)s[r]=[o.be(a,b)]
else{p=o.bo(q,a)
if(p>=0)q[p].b=b
else q.push(o.be(a,b))}},
ca(a,b){var s,r,q=this,p=A.l(q)
p.c.a(a)
p.h("2()").a(b)
if(q.a3(a)){s=q.i(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.B(0,a,r)
return r},
an(a,b){var s=this.cu(this.b,b)
return s},
aD(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.bc()}},
ab(a,b){var s,r,q=this
A.l(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.j(A.Z(q))
s=s.c}},
bA(a,b,c){var s,r=A.l(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.be(b,c)
else s.b=c},
cu(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.cv(s)
delete a[b]
return s.b},
bc(){this.r=this.r+1&1073741823},
be(a,b){var s=this,r=A.l(s),q=new A.hp(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.bc()
return q},
cv(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.bc()},
c7(a){return J.ag(a)&1073741823},
bG(a,b){return a[this.c7(b)]},
bo(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.af(a[r].a,b))return r
return-1},
q(a){return A.ht(this)},
bd(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ike:1}
A.hl.prototype={
$2(a,b){var s=this.a,r=A.l(s)
s.B(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.l(this.a).h("~(1,2)")}}
A.hp.prototype={}
A.a8.prototype={
gl(a){return this.a.a},
ga_(a){return this.a.a===0},
gC(a){var s=this.a
return new A.b9(s,s.r,s.e,this.$ti.h("b9<1>"))},
n(a,b){return this.a.a3(b)}}
A.b9.prototype={
gp(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.Z(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iH:1}
A.a9.prototype={
gl(a){return this.a.a},
gC(a){var s=this.a
return new A.ai(s,s.r,s.e,this.$ti.h("ai<1>"))}}
A.ai.prototype={
gp(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.Z(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iH:1}
A.b8.prototype={
gl(a){return this.a.a},
gC(a){var s=this.a
return new A.c3(s,s.r,s.e,this.$ti.h("c3<1,2>"))}}
A.c3.prototype={
gp(){var s=this.d
s.toString
return s},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.Z(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.ab(s.a,s.b,r.$ti.h("ab<1,2>"))
r.c=s.c
return!0}},
$iH:1}
A.jj.prototype={
$1(a){return this.a(a)},
$S:20}
A.jk.prototype={
$2(a,b){return this.a(a,b)},
$S:46}
A.jl.prototype={
$1(a){return this.a(A.J(a))},
$S:45}
A.al.prototype={
q(a){return this.bT(!1)},
bT(a){var s,r,q,p,o,n=this.cJ(),m=this.aR(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.n(m,q)
o=m[q]
l=a?l+A.ki(o):l+A.x(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
cJ(){var s,r=this.$s
while($.j_.length<=r)B.a.m($.j_,null)
s=$.j_[r]
if(s==null){s=this.cF()
B.a.B($.j_,r,s)}return s},
cF(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.d(new Array(l),t.Q)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.B(k,q,r[s])}}return A.aK(k,t.K)}}
A.bB.prototype={
aR(){return[this.a,this.b]},
a7(a,b){if(b==null)return!1
return b instanceof A.bB&&this.$s===b.$s&&J.af(this.a,b.a)&&J.af(this.b,b.b)},
gR(a){return A.hw(this.$s,this.a,this.b,B.l)}}
A.bC.prototype={
aR(){return[this.a,this.b,this.c]},
a7(a,b){var s=this
if(b==null)return!1
return b instanceof A.bC&&s.$s===b.$s&&J.af(s.a,b.a)&&J.af(s.b,b.b)&&J.af(s.c,b.c)},
gR(a){var s=this
return A.hw(s.$s,s.a,s.b,s.c)}}
A.bj.prototype={
aR(){return this.a},
a7(a,b){if(b==null)return!1
return b instanceof A.bj&&this.$s===b.$s&&A.mg(this.a,b.a)},
gR(a){return A.hw(this.$s,A.lQ(this.a),B.l,B.l)}}
A.bv.prototype={
gU(a){return B.ag},
$iB:1}
A.c7.prototype={}
A.cY.prototype={
gU(a){return B.ah},
$iB:1}
A.bw.prototype={
gl(a){return a.length},
$iah:1}
A.c5.prototype={$ir:1,$ia:1,$iq:1}
A.c6.prototype={$ir:1,$ia:1,$iq:1}
A.cZ.prototype={
gU(a){return B.ai},
$iB:1}
A.d_.prototype={
gU(a){return B.aj},
$iB:1}
A.d0.prototype={
gU(a){return B.ak},
$iB:1}
A.d1.prototype={
gU(a){return B.al},
$iB:1}
A.d2.prototype={
gU(a){return B.am},
$iB:1}
A.d3.prototype={
gU(a){return B.ao},
$iB:1}
A.d4.prototype={
gU(a){return B.ap},
$iB:1}
A.c8.prototype={
gU(a){return B.aq},
gl(a){return a.length},
$iB:1}
A.d5.prototype={
gU(a){return B.ar},
gl(a){return a.length},
$iB:1,
$ijI:1}
A.cl.prototype={}
A.cm.prototype={}
A.cn.prototype={}
A.co.prototype={}
A.au.prototype={
h(a){return A.cu(v.typeUniverse,this,a)},
H(a){return A.kz(v.typeUniverse,this,a)}}
A.dj.prototype={}
A.j3.prototype={
q(a){return A.ad(this.a,null)}}
A.di.prototype={
q(a){return this.a}}
A.bF.prototype={$iaM:1}
A.iG.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:21}
A.iF.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:42}
A.iH.prototype={
$0(){this.a.$0()},
$S:25}
A.iI.prototype={
$0(){this.a.$0()},
$S:25}
A.j1.prototype={
ct(a,b){if(self.setTimeout!=null)self.setTimeout(A.dt(new A.j2(this,b),0),a)
else throw A.j(A.bd("`setTimeout()` not found."))}}
A.j2.prototype={
$0(){this.b.$0()},
$S:3}
A.df.prototype={}
A.j7.prototype={
$1(a){return this.a.$2(0,a)},
$S:48}
A.j8.prototype={
$2(a,b){this.a.$2(1,new A.bV(a,t.l.a(b)))},
$S:36}
A.jb.prototype={
$2(a,b){this.a(A.h(a),b)},
$S:40}
A.aP.prototype={
gp(){var s=this.b
return s==null?this.$ti.c.a(s):s},
cR(a,b){var s,r,q
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
o.d=null}q=o.cR(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.kt
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
o.a=A.kt
throw n
return!1}if(0>=p.length)return A.n(p,-1)
o.a=p.pop()
m=1
continue}throw A.j(A.kk("sync*"))}return!1},
bW(a){var s,r,q=this
if(a instanceof A.ax){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.m(r,q.a)
q.a=s
return 2}else{q.d=J.G(a)
return 2}},
$iH:1}
A.ax.prototype={
gC(a){return new A.aP(this.a(),this.$ti.h("aP<1>"))}}
A.aq.prototype={
q(a){return A.x(this.a)},
$iD:1,
gaM(){return this.b}}
A.hj.prototype={
$0(){this.c.a(null)
this.b.cD(null)},
$S:3}
A.be.prototype={
dr(a){if((this.c&15)!==6)return!0
return this.b.b.bu(t.al.a(this.d),a.a,t.y,t.K)},
dj(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.dD(q,m,a.b,o,n,t.l)
else p=l.bu(t.B.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.aR(s))){if((r.c&1)!==0)throw A.j(A.cF("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.j(A.cF("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.X.prototype={
cf(a,b,c){var s,r,q=this.$ti
q.H(c).h("1/(2)").a(a)
s=$.P
if(s===B.k){if(!t.C.b(b)&&!t.B.b(b))throw A.j(A.ex(b,"onError",u.c))}else{c.h("@<0/>").H(q.c).h("1(2)").a(a)
b=A.n1(b,s)}r=new A.X(s,c.h("X<0>"))
this.b2(new A.be(r,3,a,b,q.h("@<1>").H(c).h("be<1,2>")))
return r},
bS(a,b,c){var s,r=this.$ti
r.H(c).h("1/(2)").a(a)
s=new A.X($.P,c.h("X<0>"))
this.b2(new A.be(s,19,a,b,r.h("@<1>").H(c).h("be<1,2>")))
return s},
cT(a){this.a=this.a&1|16
this.c=a},
aP(a){this.a=a.a&30|this.a&1
this.c=a.c},
b2(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.b2(a)
return}r.aP(s)}A.ds(null,null,r.b,t.M.a(new A.iK(r,a)))}},
bM(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.bM(a)
return}m.aP(n)}l.a=m.aS(a)
A.ds(null,null,m.b,t.M.a(new A.iP(l,m)))}},
aA(){var s=t.F.a(this.c)
this.c=null
return this.aS(s)},
aS(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
cD(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("aU<1>").b(a))A.iN(a,r,!0)
else{s=r.aA()
q.c.a(a)
r.a=8
r.c=a
A.bf(r,s)}},
bF(a){var s,r=this
r.$ti.c.a(a)
s=r.aA()
r.a=8
r.c=a
A.bf(r,s)},
cE(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aA()
q.aP(a)
A.bf(q,r)},
b6(a){var s=this.aA()
this.cT(a)
A.bf(this,s)},
cB(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("aU<1>").b(a)){this.bD(a)
return}this.cC(a)},
cC(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.ds(null,null,s.b,t.M.a(new A.iM(s,a)))},
bD(a){A.iN(this.$ti.h("aU<1>").a(a),this,!1)
return},
bC(a){this.a^=2
A.ds(null,null,this.b,t.M.a(new A.iL(this,a)))},
$iaU:1}
A.iK.prototype={
$0(){A.bf(this.a,this.b)},
$S:3}
A.iP.prototype={
$0(){A.bf(this.b,this.a.a)},
$S:3}
A.iO.prototype={
$0(){A.iN(this.a.a,this.b,!0)},
$S:3}
A.iM.prototype={
$0(){this.a.bF(this.b)},
$S:3}
A.iL.prototype={
$0(){this.a.b6(this.b)},
$S:3}
A.iS.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dC(t.fO.a(q.d),t.z)}catch(p){s=A.aR(p)
r=A.bL(p)
if(k.c&&t.u.a(k.b.a.c).a===s){q=k.a
q.c=t.u.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.jx(q)
n=k.a
n.c=new A.aq(q,o)
q=n}q.b=!0
return}if(j instanceof A.X&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.u.a(j.c)
q.b=!0}return}if(j instanceof A.X){m=k.b.a
l=new A.X(m.b,m.$ti)
j.cf(new A.iT(l,m),new A.iU(l),t.x)
q=k.a
q.c=l
q.b=!1}},
$S:3}
A.iT.prototype={
$1(a){this.a.cE(this.b)},
$S:21}
A.iU.prototype={
$2(a,b){A.cx(a)
t.l.a(b)
this.a.b6(new A.aq(a,b))},
$S:34}
A.iR.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bu(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aR(l)
r=A.bL(l)
q=s
p=r
if(p==null)p=A.jx(q)
o=this.a
o.c=new A.aq(q,p)
o.b=!0}},
$S:3}
A.iQ.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.u.a(l.a.a.c)
p=l.b
if(p.a.dr(s)&&p.a.e!=null){p.c=p.a.dj(s)
p.b=!1}}catch(o){r=A.aR(o)
q=A.bL(o)
p=t.u.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.jx(p)
m=l.b
m.c=new A.aq(p,n)
p=m}p.b=!0}},
$S:3}
A.dg.prototype={}
A.dp.prototype={}
A.cw.prototype={$iko:1}
A.dn.prototype={
dE(a){var s,r,q
t.M.a(a)
try{if(B.k===$.P){a.$0()
return}A.kI(null,null,this,a,t.x)}catch(q){s=A.aR(q)
r=A.bL(q)
A.jP(A.cx(s),t.l.a(r))}},
c0(a){return new A.j0(this,t.M.a(a))},
dC(a,b){b.h("0()").a(a)
if($.P===B.k)return a.$0()
return A.kI(null,null,this,a,b)},
bu(a,b,c,d){c.h("@<0>").H(d).h("1(2)").a(a)
d.a(b)
if($.P===B.k)return a.$1(b)
return A.n3(null,null,this,a,b,c,d)},
dD(a,b,c,d,e,f){d.h("@<0>").H(e).H(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.P===B.k)return a.$2(b,c)
return A.n2(null,null,this,a,b,c,d,e,f)},
cc(a,b,c,d){return b.h("@<0>").H(c).H(d).h("1(2,3)").a(a)}}
A.j0.prototype={
$0(){return this.a.dE(this.b)},
$S:3}
A.ja.prototype={
$0(){A.lC(this.a,this.b)},
$S:3}
A.av.prototype={
cK(){return new A.av(A.l(this).h("av<1>"))},
gC(a){var s=this,r=new A.bh(s,s.r,A.l(s).h("bh<1>"))
r.c=s.e
return r},
gl(a){return this.a},
n(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cG(b)},
cG(a){var s=this.d
if(s==null)return!1
return this.bb(s[this.b7(a)],a)>=0},
m(a,b){var s,r,q=this
A.l(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bE(s==null?q.b=A.jJ():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bE(r==null?q.c=A.jJ():r,b)}else return q.cw(b)},
cw(a){var s,r,q,p=this
A.l(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jJ()
r=p.b7(a)
q=s[r]
if(q==null)s[r]=[p.b5(a)]
else{if(p.bb(q,a)>=0)return!1
q.push(p.b5(a))}return!0},
an(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bO(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bO(s.c,b)
else return s.cP(b)},
cP(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.b7(a)
r=n[s]
q=o.bb(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bU(p)
return!0},
bE(a,b){A.l(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.b5(b)
return!0},
bO(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bU(s)
delete a[b]
return!0},
b4(){this.r=this.r+1&1073741823},
b5(a){var s,r=this,q=new A.dm(A.l(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.b4()
return q},
bU(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.b4()},
b7(a){return J.ag(a)&1073741823},
bb(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.af(a[r].a,b))return r
return-1},
$ikg:1}
A.dm.prototype={}
A.bh.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.j(A.Z(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iH:1}
A.hq.prototype={
$2(a,b){this.a.B(0,this.b.a(a),this.c.a(b))},
$S:44}
A.C.prototype={
gC(a){return new A.o(a,a.length,A.az(a).h("o<C.E>"))},
V(a,b){if(!(b>=0&&b<a.length))return A.n(a,b)
return a[b]},
ga_(a){return a.length===0},
gav(a){return a.length!==0},
gD(a){var s=a.length
if(s===0)throw A.j(A.aC())
if(0>=s)return A.n(a,0)
return a[0]},
gaF(a){var s,r=a.length
if(r===0)throw A.j(A.aC())
s=r-1
if(!(s>=0))return A.n(a,s)
return a[s]},
aH(a,b,c){var s=A.az(a)
return new A.Q(a,s.H(c).h("1(C.E)").a(b),s.h("@<C.E>").H(c).h("Q<1,2>"))},
G(a,b,c,d){var s,r,q,p
d.a(b)
A.az(a).H(d).h("1(1,C.E)").a(c)
s=a.length
for(r=s,q=b,p=0;p<s;++p){if(!(p<r))return A.n(a,p)
q=c.$2(q,a[p])
r=a.length
if(s!==r)throw A.j(A.Z(a))}return q},
b1(a,b){return A.a_(a,b,null,A.az(a).h("C.E"))},
m(a,b){var s
A.az(a).h("C.E").a(b)
s=a.length
this.sl(a,s+1)
if(!(s<a.length))return A.n(a,s)
a[s]=b},
q(a){return A.jz(a,"[","]")}}
A.F.prototype={
ab(a,b){var s,r,q,p=A.l(this)
p.h("~(F.K,F.V)").a(b)
for(s=this.gac(),s=s.gC(s),p=p.h("F.V");s.j();){r=s.gp()
q=this.i(0,r)
b.$2(r,q==null?p.a(q):q)}},
aJ(a,b,c){var s,r=this,q=A.l(r)
q.h("F.K").a(a)
q.h("F.V(F.V)").a(b)
q.h("F.V()?").a(c)
if(r.a3(a)){s=r.i(0,a)
q=b.$1(s==null?q.h("F.V").a(s):s)
r.B(0,a,q)
return q}q=c.$0()
r.B(0,a,q)
return q},
gam(){return this.gac().aH(0,new A.hs(this),A.l(this).h("ab<F.K,F.V>"))},
a3(a){return this.gac().n(0,a)},
gl(a){var s=this.gac()
return s.gl(s)},
ga_(a){var s=this.gac()
return s.ga_(s)},
q(a){return A.ht(this)},
$iaa:1}
A.hs.prototype={
$1(a){var s=this.a,r=A.l(s)
r.h("F.K").a(a)
s=s.i(0,a)
if(s==null)s=r.h("F.V").a(s)
return new A.ab(a,s,r.h("ab<F.K,F.V>"))},
$S(){return A.l(this.a).h("ab<F.K,F.V>(F.K)")}}
A.hu.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.x(a)
r.a=(r.a+=s)+": "
s=A.x(b)
r.a+=s},
$S:22}
A.cv.prototype={}
A.bu.prototype={
i(a,b){return this.a.i(0,b)},
ab(a,b){this.a.ab(0,this.$ti.h("~(1,2)").a(b))},
ga_(a){return this.a.a===0},
gav(a){return this.a.a!==0},
gl(a){return this.a.a},
q(a){return A.ht(this.a)},
gaL(){var s=this.a
return new A.a9(s,A.l(s).h("a9<2>"))},
gam(){var s=this.a
return new A.b8(s,A.l(s).h("b8<1,2>"))},
$iaa:1}
A.ch.prototype={}
A.bx.prototype={
F(a,b){var s
A.l(this).h("a<1>").a(b)
for(s=b.gC(b);s.j();)this.m(0,s.gp())},
q(a){return A.jz(this,"{","}")},
G(a,b,c,d){var s,r,q,p
d.a(b)
s=A.l(this)
s.H(d).h("1(1,2)").a(c)
for(s=A.iZ(this,this.r,s.c),r=s.$ti.c,q=b;s.j();){p=s.d
q=c.$2(q,p==null?r.a(p):p)}return q},
K(a,b){var s,r,q=A.l(this)
q.h("e(1)").a(b)
for(q=A.iZ(this,this.r,q.c),s=q.$ti.c;q.j();){r=q.d
if(b.$1(r==null?s.a(r):r))return!0}return!1},
$ir:1,
$ia:1,
$ijF:1}
A.cp.prototype={
dg(a){var s,r,q,p=this,o=p.cK()
for(s=A.iZ(p,p.r,A.l(p).c),r=s.$ti.c;s.j();){q=s.d
if(q==null)q=r.a(q)
if(!a.n(0,q))o.m(0,q)}return o}}
A.bG.prototype={}
A.dk.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cL(b):s}},
gl(a){return this.b==null?this.c.a:this.az().length},
ga_(a){return this.gl(0)===0},
gac(){if(this.b==null){var s=this.c
return new A.a8(s,A.l(s).h("a8<1>"))}return new A.dl(this)},
B(a,b,c){var s,r,q=this
A.J(b)
if(q.b==null)q.c.B(0,b,c)
else if(q.a3(b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.cZ().B(0,b,c)},
a3(a){if(this.b==null)return this.c.a3(a)
return!1},
ab(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.ab(0,b)
s=o.az()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.j9(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.j(A.Z(o))}},
az(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.d(Object.keys(this.a),t.s)
return s},
cZ(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.S(t.N,t.z)
r=n.az()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.B(0,o,n.i(0,o))}if(p===0)B.a.m(r,"")
else B.a.aD(r)
n.a=n.b=null
return n.c=s},
cL(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.j9(this.a[a])
return this.b[a]=s}}
A.dl.prototype={
gl(a){return this.a.gl(0)},
V(a,b){var s=this.a
if(s.b==null)s=s.gac().V(0,b)
else{s=s.az()
if(!(b>=0&&b<s.length))return A.n(s,b)
s=s[b]}return s},
gC(a){var s=this.a
if(s.b==null){s=s.gac()
s=s.gC(s)}else{s=s.az()
s=new J.b4(s,s.length,A.f(s).h("b4<1>"))}return s},
n(a,b){return this.a.a3(b)}}
A.cK.prototype={}
A.cM.prototype={}
A.c1.prototype={
q(a){var s=A.cP(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.cX.prototype={
q(a){return"Cyclic error in JSON stringify"}}
A.hm.prototype={
da(a,b){var s=A.n_(a,this.gdc().a)
return s},
aq(a,b){var s=A.m7(a,this.gdh().b,null)
return s},
gdh(){return B.ad},
gdc(){return B.ac}}
A.ho.prototype={}
A.hn.prototype={}
A.iX.prototype={
ci(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.p.aN(a,r,q)
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
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.p.aN(a,r,q)
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
break}}else if(p===34||p===92){if(q>r)s.a+=B.p.aN(a,r,q)
r=q+1
o=A.a0(92)
s.a+=o
o=A.a0(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.p.aN(a,r,m)},
b3(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.j(new A.cX(a,null))}B.a.m(s,a)},
b_(a){var s,r,q,p,o=this
if(o.cg(a))return
o.b3(a)
try{s=o.b.$1(a)
if(!o.cg(s)){q=A.kd(a,null,o.gbJ())
throw A.j(q)}q=o.a
if(0>=q.length)return A.n(q,-1)
q.pop()}catch(p){r=A.aR(p)
q=A.kd(a,r,o.gbJ())
throw A.j(q)}},
cg(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.b.q(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.ci(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.b3(a)
q.dJ(a)
s=q.a
if(0>=s.length)return A.n(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.b3(a)
r=q.dK(a)
s=q.a
if(0>=s.length)return A.n(s,-1)
s.pop()
return r}else return!1},
dJ(a){var s,r=this.c
r.a+="["
if(J.li(a)){if(0>=a.length)return A.n(a,0)
this.b_(a[0])
for(s=1;s<a.length;++s){r.a+=","
this.b_(a[s])}}r.a+="]"},
dK(a){var s,r,q,p,o,n,m=this,l={}
if(a.ga_(a)){m.c.a+="{}"
return!0}s=a.gl(a)*2
r=A.hr(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.ab(0,new A.iY(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.ci(A.J(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.n(r,n)
m.b_(r[n])}p.a+="}"
return!0}}
A.iY.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.B(s,r.a++,a)
B.a.B(s,r.a++,b)},
$S:22}
A.iW.prototype={
gbJ(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.cN.prototype={
a7(a,b){if(b==null)return!1
return b instanceof A.cN},
gR(a){return B.c.gR(0)},
q(a){return"0:00:00."+B.p.ds(B.c.q(0),6,"0")}}
A.dh.prototype={
q(a){return this.aQ()},
$icO:1}
A.D.prototype={
gaM(){return A.lS(this)}}
A.cG.prototype={
q(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cP(s)
return"Assertion failed"}}
A.aM.prototype={}
A.aB.prototype={
gb9(){return"Invalid argument"+(!this.a?"(s)":"")},
gb8(){return""},
q(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gb9()+q+o
if(!s.a)return n
return n+s.gb8()+": "+A.cP(s.gbp())},
gbp(){return this.b}}
A.cc.prototype={
gbp(){return A.U(this.b)},
gb9(){return"RangeError"},
gb8(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.x(q):""
else if(q==null)s=": Not greater than or equal to "+A.x(r)
else if(q>r)s=": Not in inclusive range "+A.x(r)+".."+A.x(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.x(r)
return s}}
A.cQ.prototype={
gbp(){return A.h(this.b)},
gb9(){return"RangeError"},
gb8(){if(A.h(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gl(a){return this.f}}
A.ci.prototype={
q(a){return"Unsupported operation: "+this.a}}
A.dd.prototype={
q(a){return"UnimplementedError: "+this.a}}
A.cg.prototype={
q(a){return"Bad state: "+this.a}}
A.cL.prototype={
q(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.cP(s)+"."}}
A.d6.prototype={
q(a){return"Out of Memory"},
gaM(){return null},
$iD:1}
A.cf.prototype={
q(a){return"Stack Overflow"},
gaM(){return null},
$iD:1}
A.iJ.prototype={
q(a){return"Exception: "+this.a}}
A.aG.prototype={
q(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.a.prototype={
aH(a,b,c){var s=A.l(this)
return A.lP(this,s.H(c).h("1(a.E)").a(b),s.h("a.E"),c)},
dI(a,b){var s=A.l(this)
return new A.b(this,s.h("e(a.E)").a(b),s.h("b<a.E>"))},
G(a,b,c,d){var s,r
d.a(b)
A.l(this).H(d).h("1(1,a.E)").a(c)
for(s=this.gC(this),r=b;s.j();)r=c.$2(r,s.gp())
return r},
aE(a,b){var s
A.l(this).h("e(a.E)").a(b)
for(s=this.gC(this);s.j();)if(!b.$1(s.gp()))return!1
return!0},
K(a,b){var s
A.l(this).h("e(a.E)").a(b)
for(s=this.gC(this);s.j();)if(b.$1(s.gp()))return!0
return!1},
gl(a){var s,r=this.gC(this)
for(s=0;r.j();)++s
return s},
cd(a,b){return A.jG(this,b,A.l(this).h("a.E"))},
gD(a){var s=this.gC(this)
if(!s.j())throw A.j(A.aC())
return s.gp()},
gaF(a){var s,r=this.gC(this)
if(!r.j())throw A.j(A.aC())
do s=r.gp()
while(r.j())
return s},
V(a,b){var s,r
A.cd(b,"index")
s=this.gC(this)
for(r=b;s.j();){if(r===0)return s.gp();--r}throw A.j(A.jy(b,b-r,this,"index"))},
q(a){return A.lJ(this,"(",")")}}
A.ab.prototype={
q(a){return"MapEntry("+A.x(this.a)+": "+A.x(this.b)+")"}}
A.ac.prototype={
gR(a){return A.A.prototype.gR.call(this,0)},
q(a){return"null"}}
A.A.prototype={$iA:1,
a7(a,b){return this===b},
gR(a){return A.d8(this)},
q(a){return"Instance of '"+A.d9(this)+"'"},
gU(a){return A.no(this)},
toString(){return this.q(this)}}
A.dq.prototype={
q(a){return""},
$iaX:1}
A.it.prototype={
gc5(){var s,r=this.b
if(r==null)r=$.hV.$0()
s=r-this.a
if($.k_()===1e6)return s
return s*1000},
bx(){var s=this,r=s.b
if(r!=null){s.a=s.a+($.hV.$0()-r)
s.b=null}}}
A.by.prototype={
gl(a){return this.a.length},
q(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ilY:1}
A.aY.prototype={}
A.ey.prototype={}
A.aF.prototype={
gbY(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=t.S,f=A.S(g,g)
for(g=h.y,g=new A.ai(g,g.r,g.e,A.l(g).h("ai<2>")),s=h.a,r=h.z,q=h.Q,p=s.b,o=s.a;g.j();){n=g.d
m=s.Z(n.a)
l=!0
if(n.as){k=n.d
if(k!=null)if(m!=null)if(!m.fy)if(!(m.f<=0)){j=m.a
if(!r.n(0,j)){i=m.as
if(!((i===B.f||i===B.e)&&!q.n(0,j)))if(n.y>=p){l=s.I(k)
l=(l==null?null:l.b)!==o}}}}if(l)continue
n=n.d
n.toString
f.aJ(n,new A.dy(),new A.dz())}return f},
N(){var s,r=this,q=r.y,p=A.l(q).h("a9<2>")
q=A.m(new A.a9(q,p),p.h("a.E"))
s=A.k4(r.a,r.b,r.c,q)
s.d=r.d
s.e=r.e
s.f=r.f
s.r=r.r
q=s.w
q.aD(0)
q.F(0,r.w)
q=s.x
q.aD(0)
q.F(0,r.x)
s.z.F(0,r.z)
s.Q.F(0,r.Q)
s.as.F(0,r.as)
s.at.F(0,r.at)
s.ax.F(0,r.ax)
B.a.F(s.ay,r.ay)
s.ch.F(0,r.ch)
return s},
u(a){var s=this.a.u(a),r=A.f(s),q=r.h("b<1>")
s=A.m(new A.b(s,r.h("e(1)").a(new A.dX(this)),q),q.h("a.E"))
return s},
O(a){var s
if(a.at==null){s=this.x.i(0,a.a)
if(s==null)s=a.d}else s=a.gag()
return s},
L(a){var s,r=this.u(a).length,q=this.gbY().i(0,a)
if(q==null)q=0
s=this.at.n(0,a)?1:0
return r+q+s},
bZ(a){var s,r=this,q=r.a.r,p=A.f(q)
p=new A.b(q,p.h("e(1)").a(new A.dA(r,a)),p.h("b<1>")).gl(0)
q=r.gbY().i(0,a)
if(q==null)q=0
s=r.at.n(0,a)?1:0
return p+q+s},
dd(a){return this.ax.n(0,a.a)||this.a2(a)?0:1},
a2(a){return this.ch.ca(a.a,new A.e9(this,a))},
cb(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=A.bs(t.S)
for(s=J.ll(t.fy.a(a),g.b.w.go),s=s.gC(s),r=g.c,q=g.a;s.j();){p=s.gp()
o=q.gM()
n=o.$ti
m=n.h("b<a.E>")
l=A.m(new A.b(o,n.h("e(a.E)").a(new A.e2(g)),m),m.h("a.E"))
B.a.A(l,new A.e3(p))
o=A.f(l)
n=o.h("u<1>")
m=new A.u(l,0,3,n)
m.S(l,0,3,o.c)
m=new A.o(m,m.gl(0),n.h("o<k.E>"))
p=p.f
n=n.h("k.E")
k=null
j=1/0
while(m.j()){o=m.d
i=o==null?n.a(o):o
o=i.e
h=r.W(o,p.a0(o))
if(h<j){j=h
k=i}}if(k!=null)f.m(0,k.a)}return f},
ao(a){var s,r,q,p,o,n=this,m=n.a,l=a.c,k=m.I(l)
if(k==null)return!1
if(n.a2(k)){if(a.e!==2)m=!(a.x>=15&&a.w<12)
else m=!1
return m}m=m.u(l)
l=A.f(m)
s=l.h("b<1>")
r=A.m(new A.b(m,l.h("e(1)").a(new A.dD(n)),s),s.h("a.E"))
if(r.length<=1)return!1
m=A.f(r)
l=m.h("e(1)")
m=m.h("b<1>")
q=A.aI(new A.b(r,l.a(new A.dE()),m),t.r)
if(q!=null)return a.a!==q.a
s=new A.dI(n,k)
B.a.A(r,new A.dF(s))
p=A.m(new A.b(r,l.a(A.ng()),m),m.h("a.E"))
B.a.A(p,new A.dG())
if(p.length!==0)return a.a!==B.a.gD(p).a
o=s.$1(B.a.gD(r))
if(typeof o!=="number")return o.bv()
return a.a!==new A.b(r,l.a(new A.dH(s,o*0.6)),m).gaF(0).a},
a5(d2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4=this,c5="monthSeconds",c6="supplySafety",c7="supplySeconds",c8="battleBudget",c9=c4.b,d0=c9.b,d1=d0.i(0,c5)
d1.toString
s=d0.i(0,c6)
s.toString
r=d1+s
d1=c4.ay
s=A.m(d1,t.gf)
for(q=c4.a,p=q.r,o=A.f(p),n=o.h("e(1)"),m=n.a(new A.dJ(c4)),l=B.a.gC(p),m=new A.R(l,m,o.h("R<1>")),k=c4.y,j=c4.c,o=o.h("b<1>"),c9=c9.w,i=c9.CW,h=q.b/60,g=c9.d,f=c9.p1;m.j();){c9=l.gp()
e=k.i(0,c9.a)
d=c9.as
c=d===B.i
if(c&&e==null){b=d0.i(0,"campRate")
b.toString}else b=1
a=d0.i(0,c7)
a.toString
d=d===B.t
if(d&&c9.p2.length!==0){a0=c9.z
if(c9.k1!=null){c=d0.i(0,c8)
c.toString
a1=c}else a1=0
for(c=c9.p2,a2=c.length,a3=0;a3<c.length;c.length===a2||(0,A.v)(c),++a3,a0=a4){a4=c[a3]
a1+=j.W(a0,a4)}}else{a2=e!=null
if(a2&&e.as){a0=c9.z
for(c=J.k2(e.w,e.x),a2=c.$ti,c=new A.o(c,c.gl(0),a2.h("o<k.E>")),a2=a2.h("k.E"),a1=g;c.j();a0=a6){a5=c.d
a6=a5==null?a2.a(a5):a5
a1+=j.W(a0,a6)}}else{a5=c9.cx
if(a5!=null){a7=q.I(a5)
a7=a7==null?null:a7.b
a7=a7===c9.b&&c9.CW!=null}else a7=!1
if(a7){c=c9.z
a2=c9.CW
a2.toString
a1=j.W(c,a2)+g}else if(a2&&!e.as){c=e.z
a2=e.Q
a5=d0.i(0,c7)
a5.toString
a1=Math.max(0,c/60-i+a2*a5-h)
c=c9.CW
if(c!=null)a1=Math.max(a1,j.W(c9.z,c))}else{a2=c9.CW
if(a2!=null&&!c){a8=j.W(c9.z,a2)
a9=q.I(a5)
a1=Math.max(r,a8)
if(a9!=null&&a9.b!==c9.b){b0=new A.b(p,n.a(new A.dK(c9,a9)),o).gl(0)
c=a9.at
if(c==null)c=a9.d
else{a2=a9.ax
a5=a9.cy?1:0
a5=B.c.v(c-a2-a5,0,5)
c=a5}b1=Math.max(1,Math.min(c,q.u(a9.a).length))
c=d0.i(0,c8)
c.toString
a2=d0.i(0,c6)
a2.toString
a1=a8+b1*(1+b0)*c+a2}}else a1=r}}}if(!isFinite(a1))a1=f
r=Math.max(r,a1)
b2=(e==null||e.b==="standby")&&c9.cx==null&&!d
c9=c9.ch
d=b2?1/0:a1
B.a.m(s,new A.aY(c9,b/a,d))}for(c9=d1.length,a3=0;a3<c9;++a3)r=Math.max(r,d1[a3].c)
r=Math.min(f,r)
c9=t.S
b3=new A.b(p,n.a(new A.dL(c4)),o).G(0,c4.r,new A.dM(),c9)
b4=new A.b(p,n.a(new A.dN(c4)),o).G(0,c4.r,new A.dO(),c9)
o=q.gM()
n=o.$ti
p=n.h("b<a.E>")
b5=A.m(new A.b(o,n.h("e(a.E)").a(new A.dP(c4)),p),p.h("a.E"))
if(b5.length===0)d1=0
else{d1=d0.i(0,"countryIncome")
d1.toString
d1=B.b.k(d1)
p=d0.i(0,"poorPenalty")
p.toString
p=d1-B.b.k(p)
d1=p}p=A.f(b5)
b6=new A.dU(c4,b3,d1+new A.b(b5,p.h("e(1)").a(new A.dQ(c4)),p.h("b<1>")).G(0,0,new A.dR(c4),c9),b4,c4.gbq())
b7=A.lO([r],t.i)
b8=A.d([],t.n)
b9=q.e
d1=r+1e-9
c0=b9
while(c0<=d1){b7.m(0,c0)
B.a.m(b8,c0)
q=d0.i(0,c5)
q.toString
c0+=q}for(d1=A.iZ(b7,b7.r,b7.$ti.c),q=d1.$ti.c,c1=0;d1.j();){p=d1.d
if(p==null)p=q.a(p)
c2=B.a.G(s,0,new A.dS(p),c9)
if(p+1e-9<b9)c3=0
else{o=d0.i(0,c5)
o.toString
c3=1+B.b.Y((p-b9)/o)}if(B.a.K(b8,new A.dT(p))){p=b6.$1(Math.max(0,c3-1))
if(typeof p!=="number")return A.kT(p)
c1=Math.max(c1,c2+p)}p=b6.$1(c3)
if(typeof p!=="number")return A.kT(p)
c1=Math.max(c1,c2+p)}c9=Math.max(0,c1)
if(d2)d0=s.length===0?0:1
else{d0=d0.i(0,"emergencyGold")
d0.toString
d0=B.b.k(d0)}return new A.ey(c9+d0)},
T(){return this.a5(!1)},
aK(a,b){var s,r,q,p,o,n,m,l,k,j=this,i="capacityPerLevel"
if(b.fr){s=b.a
s=j.z.n(0,s)||j.Q.n(0,s)}else s=!0
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
m=B.c.v(o[l]-b.x,0,99999)}if(q>=p.ai(j.a.c)||m==null||j.d<m)return!1
if(a.b===a.c)k=1
else{o=p.b.i(0,"foreignYield")
o.toString
k=o}o=j.f
n=q+1
p=p.b
l=p.i(0,i)
l.toString
l=B.b.Y(n*B.b.k(l)*k)
p=p.i(0,i)
p.toString
j.f=o+(l-B.b.Y(q*B.b.k(p)*k))
j.d=j.d-m
s.B(0,r,n)
return!0},
gbq(){return this.a.gM().G(0,0,new A.dY(this),t.S)},
bl(a){var s,r,q,p,o,n=this
if(!a.dy||a.e===2||n.z.n(0,a.a))return!1
s=a.as
r=s!==B.f
if(!r||s===B.e){q=a.c
q=!n.ax.n(0,q)&&n.u(q).length<=1}else q=!1
if(q)return!1
q=a.a
n.z.m(0,q)
n.y.an(0,q)
n.as.m(0,q)
n.d=n.d+a.x
q=n.f
p=n.e
n.e=Math.min(q,p+(!r||s===B.e?a.gP():0))
if(!r||s===B.e)for(s=a.ax,r=s.length,q=n.w,o=0;o<r;++o)q.aJ(s[o],new A.dV(),new A.dW())
return!0},
aC(a){var s,r=this,q=r.b.b.i(0,"soldierCost")
q.toString
s=a*B.b.k(q)
if(a<0||r.e+a>r.f||r.d<s)return!1
r.d-=s
r.e+=a
return!0},
c1(a){var s=this,r=s.b.r.i(0,a)
if(r==null||!r.f||s.a.c<r.e||s.d<r.b)return!1
s.d=s.d-r.b
s.w.aJ(a,new A.dB(),new A.dC())
return!0},
bs(a,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d=e.b,c=d.b,b=c.i(0,"drawCost")
b.toString
s=e.a
r=s.y
q=B.b.k(b)+r
b=s.r
p=A.f(b)
o=t.S
n=new A.b(b,p.h("e(1)").a(new A.dZ(e)),p.h("b<1>")).G(0,e.r+r,new A.e_(),o)
p=c.i(0,"countryIncome")
p.toString
p=B.b.k(p)
b=s.gM()
m=b.$ti
l=p+new A.b(b,m.h("e(a.E)").a(new A.e0(e)),m.h("b<a.E>")).G(0,0,new A.e1(e),o)
o=c.i(0,"garrisonFree")
k=B.b.k(o==null?2:o)
c=c.i(0,"garrisonFactor")
j=B.b.k(c==null?0:c)
c=a.a
i=e.L(c)
h=e.gbq()+A.jD(i+1,j,k)-A.jD(i,j,k)
b=a0?1.3:1.1
if(n+h<=l*b){if(a0)d=1
else if(a1==null)d=d.w.r
else{d=A.aS(a1,s,d,null)
b=d.e.w
if(d.ga6()){p=b.r
d=Math.max(p,Math.min(b.as,p+d.gaV()*0.2))}else d=b.r}g=n<=l*d}else g=!1
f=(s.c>=3||a0)&&e.d-q>=e.a5(a0).a+r+Math.max(0,h-e.gbq())
d=!0
if(a.Q){b=e.at
if(!b.n(0,c))if(s.x>b.a)if(e.d>=q)d=!(g||f)}if(d)return!1
e.d-=q
e.r+=r
e.at.m(0,c)
return!0},
dw(a,b){return this.bs(a,!1,b)},
dv(a,b){return this.bs(a,b,null)},
de(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(b)
if(a.db){s=a.a
s=l.as.n(0,s)||l.z.n(0,s)||l.d<=0}else s=!0
if(s)return!1
s=a.c
r=!1
if(l.u(s).length<=1){q=l.a
if(q.I(s)!=null){q=q.I(s)
q.toString
q=l.a2(q)}else q=!1
if(!q){r=!(l.ax.n(0,s)&&c.b==="evacuate"&&c.as)
s=r}else s=r}else s=r
if(s)return!1
s=l.w
r=t.S
p=A.kf(s,r,r)
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
p.B(0,m,o-1)}s.aD(0)
s.F(0,p)
s=l.e
r=q.i(0,"soldierLimit")
r.toString
l.e=s-Math.min(s,B.b.k(r)-a.gP())
r=a.a
l.Q.m(0,r)
l.as.m(0,r)
l.y.B(0,r,c)
q=q.i(0,"supplySeconds")
q.toString
B.a.m(l.ay,new A.aY(a.ch,1/q,d))
return!0},
dz(a,b){var s,r=this
if(!a.dx||r.as.n(0,a.a)||r.d<=0||a.fy)return!1
s=a.a
r.as.m(0,s)
r.y.B(0,s,b)
return!0}}
A.dy.prototype={
$1(a){return A.h(a)+1},
$S:6}
A.dz.prototype={
$0(){return 1},
$S:5}
A.dX.prototype={
$1(a){var s=this.a,r=t.r.a(a).a
return!s.z.n(0,r)&&!s.Q.n(0,r)},
$S:0}
A.dA.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.c===this.b&&a.f>0&&!a.fy&&!s.z.n(0,a.a)},
$S:0}
A.e9.prototype={
$0(){var s,r,q,p,o,n,m,l,k,j=new A.ea(),i=this.b,h=this.a,g=h.a
if(i.b===g.a){s=g.gM().gl(0)
r=j.$1(i)
q=h.b
p=q.b.i(0,"marchSpeed")
p.toString
o=B.a.ae(q.e,B.z)
n=g.f
m=A.f(n)
l=m.h("e(1)").a(new A.e4(h))
j=m.h("+(w,i)(1)").a(new A.e5(j))
g=g.r
k=A.f(g)
q=A.nD(i.e,new A.at(new A.b(g,k.h("e(1)").a(new A.e6(h)),k.h("b<1>")),k.h("+(w,e)(1)").a(new A.e7(i)),k.h("at<1,+(w,e)>")),new A.at(new A.b(n,l,m.h("b<1>")),j,m.h("at<1,+(w,i)>")),p*o,i.at!=null,s,r,q.w.b)
j=q}else j=!1
return j},
$S:49}
A.ea.prototype={
$1(a){return B.a.G(a.f.a,0,new A.e8(a),t.i)},
$S:51}
A.e8.prototype={
$2(a,b){return Math.max(A.an(a),this.a.e.E(t.c1.a(b)))},
$S:69}
A.e4.prototype={
$1(a){return t.q.a(a).b!==this.a.a.a},
$S:1}
A.e5.prototype={
$1(a){t.q.a(a)
return new A.bD(a.e,this.a.$1(a))},
$S:37}
A.e6.prototype={
$1(a){var s
t.r.a(a)
if(a.b!==this.a.a.a){s=a.as
s=!(s===B.f||s===B.e)&&!a.fy&&a.f>0}else s=!1
return s},
$S:0}
A.e7.prototype={
$1(a){t.r.a(a)
return new A.bD(a.z,a.p3===this.a.a)},
$S:39}
A.e2.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.a
r=a.a
q=!1
if(!s.ax.n(0,r))if(a.Q)s=a.at==null||s.L(r)<s.O(a)
else s=q
else s=q
return s},
$S:1}
A.e3.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.E(s),b.e.E(s))},
$S:4}
A.dD.prototype={
$1(a){return!this.a.z.n(0,t.r.a(a).a)},
$S:0}
A.dE.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.dI.prototype={
$1(a){var s=this.a,r=s.b,q=s.O(this.b),p=r.b.i(0,"soldierLimit")
p.toString
return A.du(a,r,q,Math.min(B.b.k(p),s.e))},
$S:33}
A.dF.prototype={
$2(a,b){var s,r=t.r
r.a(a)
s=this.a
return J.lh(s.$1(r.a(b)),s.$1(a))},
$S:2}
A.dG.prototype={
$2(a,b){var s,r=t.r
r.a(a)
r.a(b)
s=B.c.t(b.x,a.x)
return s!==0?s:B.c.t(a.w,b.w)},
$S:2}
A.dH.prototype={
$1(a){var s=this.a.$1(t.r.a(a))
if(typeof s!=="number")return s.dN()
return s>=this.b},
$S:0}
A.dJ.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
if(a.b===s.a.a){r=a.as
s=!(r===B.f||r===B.e)&&!a.fy&&!s.z.n(0,a.a)}else s=!1
return s},
$S:0}
A.dK.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=!1
if(a.a!==s.a)if(a.b===s.b){q=this.b
if(a.cx===q.a){r=q.e
r=a.z.E(r)<s.z.E(r)
s=r}else s=r}else s=r
else s=r
return s},
$S:0}
A.dL.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.n(0,a.a)},
$S:0}
A.dM.prototype={
$2(a,b){return A.h(a)+t.r.a(b).y},
$S:9}
A.dN.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=s.a
return a.b===r.a&&a.f>0&&!s.z.n(0,a.a)&&a.p4===r.d},
$S:0}
A.dO.prototype={
$2(a,b){return A.h(a)+t.r.a(b).y},
$S:9}
A.dP.prototype={
$1(a){return!this.a.ax.n(0,t.q.a(a).a)},
$S:1}
A.dQ.prototype={
$1(a){return!this.a.ax.n(0,t.q.a(a).a)},
$S:1}
A.dR.prototype={
$2(a,b){var s,r,q
A.h(a)
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
s.toString}return a+B.b.Y((b.z+(r-1)*q)*s)},
$S:7}
A.dU.prototype={
$1(a){var s,r,q,p=this
if(a===0)s=0
else{s=p.a
r=s.a
q=r.gaw()
s=s.b.b.i(0,"monthSeconds")
s.toString
s=a*(p.b-p.c)-p.d+B.b.ap(q.r+p.e*(r.e/s+a-1))}return s},
$S:6}
A.dS.prototype={
$2(a,b){A.h(a)
t.gf.a(b)
return a+B.b.Y(b.a+b.b*Math.min(this.a,b.c)+1e-9)},
$S:47}
A.dT.prototype={
$1(a){return Math.abs(A.an(a)-this.a)<1e-7},
$S:13}
A.dY.prototype={
$2(a,b){var s,r,q
A.h(a)
s=this.a
r=s.L(t.q.a(b).a)
s=s.b.b
q=s.i(0,"garrisonFree")
q=B.b.k(q==null?2:q)
s=s.i(0,"garrisonFactor")
return a+A.jD(r,B.b.k(s==null?0:s),q)},
$S:7}
A.dV.prototype={
$1(a){return A.h(a)+1},
$S:6}
A.dW.prototype={
$0(){return 1},
$S:5}
A.dB.prototype={
$1(a){return A.h(a)+1},
$S:6}
A.dC.prototype={
$0(){return 1},
$S:5}
A.dZ.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.n(0,a.a)},
$S:0}
A.e_.prototype={
$2(a,b){return A.h(a)+t.r.a(b).y},
$S:9}
A.e0.prototype={
$1(a){return!this.a.ax.n(0,t.q.a(a).a)},
$S:1}
A.e1.prototype={
$2(a,b){var s,r,q
A.h(a)
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
s.toString}return a+B.b.Y((b.z+(r-1)*q)*s)},
$S:7}
A.eA.prototype={
ga6(){var s=this
return s.a!==s.d.a&&s.b>=s.e.w.w},
gba(){return Math.max(0,this.b-this.e.w.w)},
gaV(){if(this.ga6()){var s=this.e.w
s=Math.max(0,s.x+this.gba()*s.y)}else s=0
return s},
ce(a,b){return a===0||!this.ga6()||b<=1?a:Math.min(this.e.w.fy,a+1+B.c.bg(this.gba(),2))}}
A.eB.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.eC.prototype={
$2(a,b){var s,r
A.h(a)
t.q.a(b)
s=this.a
s=s==null?null:s.i(0,b.a)
if(s==null)s=b.d
r=this.b.b.i(0,"incomeStep")
r.toString
return a+b.z+(s-1)*B.b.k(r)},
$S:7}
A.b5.prototype={
aQ(){return"CombatAdvantage."+this.b}}
A.bN.prototype={}
A.eD.prototype={
aj(b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5=this,b6="soldierHp",b7=t.eg
b7.a(c5)
b7.a(c1)
s=c5==null?b8.ax:c5
r=c1==null?b9.ax:c1
b7=c8==null
q=b7?b8.gP():c8
p=c4==null
o=p?b9.gP():c4
n=b8.f
m=b8.at
l=b9.f
k=b9.at
j=b8.a+":"+A.x(n)+":"+b8.w+":"+A.x(m)+":"+A.x(b8.ay)+":"+b9.a+":"+A.x(l)+":"+b9.w+":"+A.x(k)+":"+A.x(b9.ay)+":"+c6+":"+c0+":"+c9+":"+q+":"+o+":"+A.x(s)+":"+A.x(r)+":"+c3+":"+c7+":"+c2
i=b5.c
h=i.i(0,j)
if(h!=null)return h
if(!b5.b.d_())return B.a2
if(b7)b7=B.a.G(m,0,new A.eE(),t.H)
else{b7=b5.a.b.i(0,b6)
b7.toString
b7=q*B.b.k(b7)}g=n+b7
b7=b5.a
m=b7.b
f=m.i(0,b6)
f.toString
e=B.b.k(f)
d=Math.min(o,B.b.Y(c3/e))
c=d*e+Math.max(0,c3-o*e)
if(p&&c3===0)p=B.a.G(k,0,new A.eF(),t.H)
else{p=m.i(0,b6)
p.toString
p=o*B.b.k(p)}b=l+p
p=c6===0
a=b5.bV(s,p&&n>0,c7)
a0=c0===0
a1=b5.bV(r,a0&&l>0,c2)
a0=p&&a0
a2=b5.bK(b8,q,c6,c9,a0)
a3=b5.bK(b9,o-d,c0,c9,a0)
p=a.a
n=p[0]
a4=n>=b&&a1.a[0]>=g||p[2]>=g
m=a1.a
l=m[0]
a5=Math.max(0,g-l-p[2])
k=p[1]
a6=Math.max(0,b-k-m[3]-c)
a7=Math.max(0,g-m[1]-p[3])
a8=Math.max(0,b-n-m[2]-c)
a9=Math.max(1,g*a2+b*a3)
b0=(a5*a2*0.9-a6*a3*1.1)/a9
b1=(a7*a2*1.1-a8*a3*0.9)/a9
b2=b7.w.RG
if(a4)b3=B.K
else if(b0>b2)b3=B.h
else{b7=b1<-b2?B.r:B.a1
b3=b7}b7=A.d([],t.s)
if(c6>0||c0>0)b7.push("\u57ce\u9632\u4ec5\u4fee\u6b63\u653b\u51fb\uff0c\u5b88\u65b9\u6b66\u5668\u8d21\u732e\u4e3a\u96f6")
if(s.length>1)b7.push("\u672c\u6b21\u5bf9\u9635\u53ea\u8ba1\u9996\u4ef6\u6b66\u5668\uff0c\u5176\u4f59\u7559\u5f85\u4e0b\u4e00\u4f4d\u5b88\u5c06")
if(a4)b7.push("\u5b58\u5728\u5148\u624b\u81f4\u547d\u6216\u81ea\u4f24\u98ce\u9669")
b7.push("\u4f59\u91cf\u4e3a\u9759\u6001\u98ce\u9669\u6307\u6807\uff0c\u5e76\u975e\u80dc\u7387")
b4=new A.bN(b3,b0,b1,k,l,a4)
if(i.a>=256)i.an(0,new A.a8(i,A.l(i).h("a8<1>")).gD(0))
i.B(0,j,b4)
return b4},
d5(a,b,c,d,e,f){return this.aj(a,b,c,null,!0,0,d,e,0,!0,f,0)},
d8(a,b,c,d,e,f,g,h){return this.aj(a,b,c,null,d,0,e,f,0,g,h,0)},
bj(a,b,c,d){return this.aj(a,b,0,null,!0,0,null,null,c,!0,d,0)},
d2(a,b,c,d,e){return this.aj(a,b,c,null,d,0,e,null,0,!0,null,0)},
bk(a,b,c,d,e,f){return this.aj(a,b,0,null,c,0,null,null,d,e,f,0)},
d3(a,b,c,d,e){var s=null
return this.aj(a,b,0,s,c,0,s,s,0,d,s,e)},
d7(a,b,c,d,e,f,g){return this.aj(a,b,0,null,c,0,null,d,0,e,f,g)},
d6(a,b,c,d,e,f){return this.aj(a,b,0,c,d,0,null,null,e,!0,f,0)},
d4(a,b,c,d,e){return this.aj(a,b,0,null,!0,c,null,null,d,!0,e,0)},
bK(a,b,c,d,e){var s=this.a,r=s.bi(a.w,c,e,d)
s=s.b.i(0,"soldierPower")
s.toString
return(B.c.bg(r+b*B.b.k(s)+2,4)+1)*1.5*(1+B.b.v(a.ay/1000,0,0.1))},
bV(a,b,c){var s,r,q,p,o,n,m,l,k
t.L.a(a)
if(!b)return new A.bE([0,0,0,0])
for(s=this.a,r=s.r,s=s.b,q=0,p=0,o=0,n=0,m=0;l=a.length,m<Math.min(l,1);++m){if(!(m<l))return A.n(a,m)
k=r.i(0,a[m])
if(k==null)continue
l=m===0
if(l&&c){q+=k.c
o+=k.d}if(!(l&&c)){l=s.i(0,"weaponChance")
l.toString
l=l>0}else l=!0
if(l){p+=k.c
n+=k.d}}return new A.bE([p,q,n,o])}}
A.eE.prototype={
$2(a,b){return A.z(a)+A.an(b)},
$S:12}
A.eF.prototype={
$2(a,b){return A.z(a)+A.an(b)},
$S:12}
A.ji.prototype={
$2(a,b){var s
A.z(a)
s=this.a.r.i(0,A.h(b))
s=s==null?null:s.c
if(s==null)s=0
return a+s*this.b.w},
$S:50}
A.cE.prototype={
J(){var s=this
return A.T(["interval",s.a,"resourceInterval",s.e,"cashBuffer",s.f,"payrollRatio",s.r,"dangerousCountryCities",s.w,"coalitionBudgetBase",s.x,"coalitionBudgetStep",s.y,"coalitionTargetBase",s.z,"coalitionTargetStep",s.Q,"coalitionPayrollCeiling",s.as,"coalitionTravel",s.at,"targetTravelScale",s.ax,"hatredTargetBonus",s.ay,"breakthroughMargin",s.ch,"threat",s.b,"urgent",s.c,"margin",s.d,"commit",s.CW,"rearExtra",s.cy,"candidates",s.db,"assessments",s.dx,"routes",s.dy,"plans",s.fr,"commands",s.fx,"team",s.fy,"fronts",s.k1,"singleFrontMonths",s.k2,"splitForce",s.k3,"splitAdvantage",s.k4,"arrivalSpread",s.ok,"expeditionSeconds",s.p1,"assaultCommitDistance",s.p2,"recallCriticalMargin",s.p3,"attritionCombat",s.p4,"attritionGain",s.R8,"targets",s.go,"slice",s.id,"advantage",s.RG,"expansion",s.ry,"credit",s.rx,"age",s.cx,"timeout",s.to,"restarts",s.x1,"stagnation",s.x2],t.N,t.X)}}
A.aw.prototype={}
A.eH.prototype={
by(){return new A.ax(this.cq(),t.gL)},
cq(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9,k0,k1
return function $async$by(k2,k3,k4){if(k3===1){p.push(k4)
r=q}for(;;)switch(r){case 0:j9={}
k0=s.c
k1=s.a
if(k0.b!==k1.a||k0.c!==s.b.a)throw A.j(B.a7)
o=k0.Q
n=o.f
if(n.length>64||o.r.length>256||o.w.length>32)throw A.j(B.a8)
m=s.e
m===$&&A.O()
l=s.f
l===$&&A.O()
k=new A.iv(o,k1,m,l)
j=o.gM(),i=J.G(j.a),j=new A.R(i,j.b,j.$ti.h("R<1>")),h=s.x
case 3:if(!j.j()){r=4
break}g=i.gp()
h.B(0,g.a,k.dA(g))
r=5
return k2.b=0,1
case 5:r=3
break
case 4:j=k0.as
i=A.f(j)
g=i.h("b<1>")
j=A.m(new A.b(j,i.h("e(1)").a(new A.f8(s)),g),g.h("a.E"))
f=A.k4(o,k1,m,j)
j9.a=f
j=k0.x
r=j===B.G?6:7
break
case 6:o=s.r
o===$&&A.O()
s.w=new A.hW(k0,k1,o,l,h).dt(f)
r=8
return k2.b=1,1
case 8:r=1
break
case 7:i=t.Z
e=A.d([],i)
g=t.s
d=A.d([],g)
c=s.d
b=s.r
b===$&&A.O()
a=new A.fw(k0,k1,c,l,b,h)
a0=A.l(h).h("a9<2>")
a1=a0.h("b<a.E>")
a2=A.m(new A.b(new A.a9(h,a0),a0.h("e(a.E)").a(new A.f9()),a1),a1.h("a.E"))
B.a.A(a2,new A.fa())
a0=t.bQ
a3=A.d([new A.aw(j9.a,A.d([],i),A.d([],g),0,0)],a0)
a1=j===B.o
a4=a1?A.d([],t.bz):a2
a5=a4.length
a6=t.N
a7=t.S
a8=k1.w
a9=a8.fx
b0=t.I
b1=t.dp
b2=t.aQ
b3=a8.fr
b4=0
case 9:if(!(b4<a4.length)){r=11
break}b5=a4[b4]
b6=A.d([],a0)
b7=a3.length,b8=0
case 12:if(!(b8<a3.length)){r=14
break}b9=a3[b8]
c0=a.c2(b5,b9.a),c1=c0.$ti,c0=new A.aP(c0.a(),c1.h("aP<1>")),c2=b9.d,c3=b9.e,c4=b9.c,c5=b9.b,c1=c1.c
case 15:if(!c0.j()){r=16
break}c6=c0.b
if(c6==null)c6=c1.a(c6)
c7=A.m(c5,b0)
B.a.F(c7,c6.b)
if(B.a.G(c7,0,new A.fl(),a7)>a9){c.e=!0
r=15
break}c8=c6.a
c9=A.m(c4,a6)
d0=c6.e
if(d0.length!==0)c9.push(d0)
d0=c6.c
c6=c6.d?1:0
B.a.m(b6,new A.aw(c8,c7,c9,c2+d0,c3+c6))
r=17
return k2.b=1,1
case 17:r=15
break
case 16:case 13:a3.length===b7||(0,A.v)(a3),++b8
r=12
break
case 14:if(b6.length!==0){B.a.A(b6,new A.fp())
b7=A.h(Math.min(4,b3))
c0=new A.u(b6,0,b7,b2)
c0.S(b6,0,b7,b1)
a3=c0.af(0)}case 10:a4.length===a5||(0,A.v)(a4),++b4
r=9
break
case 11:if(a2.length!==0&&!a1){d1=B.a.gD(a3)
j9.a=d1.a
B.a.F(e,d1.b)
B.a.F(d,d1.c)
a0=d1.e
if(a0>0){a0=""+a0
B.a.m(d,c.e?"\u89c4\u5212\u914d\u989d\u5df2\u7528\u5c3d\uff1a"+a0+" \u5ea7\u57ce\u5c1a\u672a\u627e\u5230\u5b8c\u6574\u65b9\u6848\uff0c\u4e0d\u80fd\u636e\u6b64\u65ad\u5b9a\u65e0\u6cd5\u633d\u6551":"unsalvageableDefense\uff1a"+a0+" \u5ea7\u57ce\u5728\u5f53\u524d\u9501\u5b9a\u3001\u8d44\u91d1\u6216\u65f6\u9650\u4e0b\u672a\u627e\u5230\u5b8c\u6574\u4fee\u590d\u65b9\u6848")}d2="defending"}else d2="preparing"
if(a2.length!==0)d2="defending"
if(!a1){d3=s.cO(j9.a)
if(d3!=null){j9.a=d3.a
B.a.m(e,d3.b)
B.a.m(d,"\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5176\u4ed6\u5b89\u5168\u57ce\u6c60\u7ee7\u7eed\u7ec4\u7ec7\u8fdb\u653b")}}r=18
return k2.b=2,1
case 18:for(a0=o.r,a1=A.f(a0),a4=a1.h("e(1)"),a5=a4.a(new A.fq(s)),a1=a1.h("b<1>"),b0=a1.h("e(a.E)").a(new A.fr(s)),a5=new A.b(a0,a5,a1).gC(0),b0=new A.R(a5,b0,a1.h("R<a.E>")),b1=t.w,b2=t.e,b3=t.Y,b7=k1.b;b0.j();){c0=a5.gp()
if(c0.e!==1||c0.f>=c0.r*0.25||c0.k2<2||c0.k3<=0||B.a.K(c0.ax,new A.fs(s)))continue
d4=o.Z(c0.k1)
if(d4!=null){c1=c0.gbm()
c2=c0.k3
c3=d4.gbm()
c4=Math.max(1,c0.k4)
c5=b7.i(0,"retreatSurvivalRatio")
c5.toString
c5=c1/c2>=c3/c4*c5
c1=c5}else c1=!0
if(c1)continue
c1=j9.a
c2=c0.a
if(c1.as.n(0,c2))continue
j9.a.as.m(0,c2)
c1=A.d([new A.y(B.P,c2,null,null,0,B.d)],b1)
c2=A.d([c0,d4],b2)
c0=o.I(c0.c)
c0.toString
B.a.m(e,new A.E("\u9ad8\u7ea7\u5c06\u9886\u751f\u547d\u4f4e\u4e8e\u56db\u5206\u4e4b\u4e00\uff0c\u5df2\u53d1\u751f\u7684\u4f24\u5bb3\u663e\u793a\u80dc\u671b\u6e3a\u832b\uff0c\u7533\u8bf7\u6709\u98ce\u9669\u7684\u5408\u6cd5\u64a4\u9000",c1,b.aa(c2,A.d([c0],b3)),B.q,0,!0))}r=19
return k2.b=3,1
case 19:a5=a1.h("a.E")
d5=A.m(new A.b(a0,a4.a(new A.ft(j9,s)),a1),a5)
b0=j9.a
c0=b0.d
if(c0>0&&c0<b0.T().a){d6=s.cN(j9.a,d5)
if(d6!=null){j9.a=d6.a
B.a.m(e,d6.b)}}b0=d5.length,c0=o.b,c1=o.a,c2=t._,c3=a8.x2,c4=c3*60,c5=t.m,b4=0
case 20:if(!(b4<d5.length)){r=22
break}d7=d5[b4]
c6=d7.a
if(j9.a.as.n(0,c6)){r=21
break}d8=j9.a.y.i(0,c6)
c7=j9.a
d9=c7.d<c7.T().a
c7=d8==null
c8=!c7
e0=c8&&d8.y<c0
e1=!1
if((c7?null:d8.b)==="expedition")if((c7?null:d8.e)!=null){c9=o.I(c7?null:d8.d)
c9=c9==null?null:c9.b
if(c9!=(c7?null:d8.e)){c9=o.I(c7?null:d8.d)
c9=(c9==null?null:c9.b)!==c1}else c9=e1
e1=c9}e2=c8&&d7.as===B.i&&!d7.R8&&d8.x+1>=d8.w.length
c9=d7.as===B.i
if(c9)if(!d7.R8){e3=!0
if(c8)if(!e0)d0=e2&&B.a.n(A.d(["intercept","standby"],g),d8.b)
else d0=e3
else d0=e3
e3=d0}else e3=!1
else e3=!1
d0=!e1
e4=!d0||e2||e3
if(d0)d0=e2&&d8.b==="expedition"||e3
else d0=!0
if(d0)d0=(e3||!d9)&&d7.f>=d7.r*0.65
else d0=!1
if(d0){e5=s.cM(j9.a,d7,d8)
if(e5!=null){j9.a=e5.a
B.a.m(e,e5.b)
r=21
break}if(c.e){r=21
break}}if((c7?null:d8.as)===!0){d0=c7?null:d8.d
d0=d7.cx==d0&&!e0&&!e4&&!d9}else d0=!1
if(d0){r=21
break}if((c7?null:d8.b)==="intercept")if(o.Z(c7?null:d8.r)!=null){d0=h.i(0,c7?null:d8.d)
if(d0==null)d0=null
else d0=d0.d.length!==0||d0.a.at!=null
d0=d0!==!0
e6=d0}else e6=!0
else e6=!1
d0=!e4
if(d0&&e6&&!d9&&d8.z>c0&&d7.f>=d7.r*0.65){r=21
break}if(c8&&d0&&!e0&&!d9&&!e6&&d8.z>c0&&!A.jR(d7,o,j9.a,k1)&&d7.f>=d7.r*0.5){r=21
break}if(d7.R8&&c8&&!e0&&j9.a.d>0){r=21
break}e7=A.jS(d7,o,j9.a)
c8=!1
if(d0)if(A.jR(d7,o,j9.a,k1))if(j9.a.d>0)c8=d7.f>=d7.r*0.25||o.u(e7.a).length===0
if(c8){B.a.m(d,c6+"\u5df2\u4e34\u8fd1\u4e3b\u653b\u76ee\u6807\uff0c\u4fdd\u6301\u8fdb\u653b\uff0c\u4e0d\u56e0\u666e\u901a\u9884\u8b66\u6216\u6574\u5907\u9884\u7b97\u6298\u8fd4")
r=21
break}if((c7?null:d8.b)==="expedition"&&d0&&!e0&&!d9&&d7.f>=d7.r*0.65&&d8.x+1<d8.w.length){r=21
break}if(!d9&&d0&&!e6&&!e0&&d7.f>=d7.r*0.65&&!c9){r=21
break}c8=o.gM()
c9=c8.$ti
d0=c9.h("b<a.E>")
e8=A.m(new A.b(c8,c9.h("e(a.E)").a(new A.fu(j9,s,e0,d8)),d0),d0.h("a.E"))
B.a.A(e8,new A.fv(d7))
c8=A.f(e8)
c9=c8.h("u<1>")
d0=new A.u(e8,0,3,c9)
d0.S(e8,0,3,c8.c)
d0=new A.o(d0,d0.gl(0),c9.h("o<k.E>"))
c8=d7.f<d7.r*0.65
c9=c9.h("k.E")
while(d0.j()){e9=d0.d
if(e9==null)e9=c9.a(e9)
if(!c.X())break
f0=m.al(d7,e9.e,o,!0,e9)
f1=j9.a
f2=e9.a
f3=h.i(0,f2)
if(f3==null)f3=null
else f3=f3.d.length!==0||f3.a.at!=null
if(d9)f4="\u73b0\u6709\u56fd\u5e93\u4e0d\u8db3\u4ee5\u7ee7\u7eed\u4f9b\u517b\u8fdc\u7a0b\u4efb\u52a1\uff0c\u56de\u57ce\u7f29\u51cf\u7cae\u8349\u652f\u51fa"
else if(c8)f4="\u5c06\u9886\u53d7\u4f24\uff0c\u56de\u57ce\u6062\u590d\u751f\u547d\u540e\u518d\u6218"
else if(e1)f4="\u76ee\u6807\u6613\u4e3b\u540e\u539f\u57ce\u4e0e\u9644\u8fd1\u654c\u57ce\u5747\u4e0d\u9002\u5408\u7ee7\u7eed\u8fdb\u653b\uff0c\u56de\u57ce\u6574\u5907"
else if(e2)f4="\u539f\u8def\u7ebf\u6301\u7eed\u53d7\u963b\uff0c\u91cd\u65b0\u9009\u62e9\u6709\u5b89\u5168\u540d\u989d\u7684\u57ce\u6c60\u6574\u5907"
else if(e0)f4="\u539f\u4efb\u52a1\u5df2\u8d85\u8fc7\u6267\u884c\u65f6\u9650\uff0c\u56de\u57ce\u91cd\u65b0\u6574\u5907"
else f4=e6?"\u622a\u51fb\u76ee\u6807\u5df2\u6d88\u5931\uff0c\u56de\u57ce\u7ed3\u675f\u672c\u6b21\u4efb\u52a1":"\u91ce\u5916\u6307\u4ee4\u5df2\u5b8c\u6210\uff0c\u56de\u57ce\u7b49\u5f85\u65b0\u4efb\u52a1"
f5=h.i(0,f2)
if(f5==null)f5=null
else f5=f5.d.length!==0||f5.a.at!=null
f2=f5===!0?h.i(0,f2).ga9():1/0
f6=b.cj(f1,d7,f0,!0,f2,!0,f3!==!0,f4,"regroup",e9)
if(f6!=null){j9.a=f6.a
B.a.m(e,f6.b)
break}}if(e3&&!j9.a.as.n(0,c6)){f7=d9?"\u5f53\u524d\u91d1\u5e01\u4e0d\u8db3\u4ee5\u627f\u62c5\u53ef\u6267\u884c\u7684\u65b0\u884c\u7a0b\uff0c\u6682\u65f6\u5f85\u547d\u5e76\u7ee7\u7eed\u590d\u67e5\u8865\u7ed9\u548c\u5165\u57ce\u540d\u989d":"\u5f53\u524d\u6ca1\u6709\u5408\u9002\u7684\u622a\u51fb\u6216\u8fdb\u653b\u76ee\u6807\uff0c\u53cb\u57ce\u4e5f\u6ca1\u6709\u5b89\u5168\u5165\u57ce\u65b9\u6848\uff0c\u6682\u65f6\u5f85\u547d\u5e76\u7ee7\u7eed\u590d\u67e5"
B.a.m(d,c6+"\uff1a"+f7)
if((c7?null:d8.b)!=="standby"||e0){c7=d7.c
f8=new A.a5(c6,"standby",f7,c7,null,!1,null,A.d([d7.z],c2),0,c0+B.b.bt(c4),c0,0,!1,!1,d7.id)
j9.a.y.B(0,c6,f8)
c6=A.d([],b1)
c8=A.d([f8],c5)
c9=A.d([d7],b2)
c7=o.I(c7)
c7.toString
B.a.m(e,new A.E(f7,c6,b.aa(c9,A.d([c7],b3)),c8,0,!1))}}r=23
return k2.b=4,1
case 23:case 21:d5.length===b0||(0,A.v)(d5),++b4
r=20
break
case 22:f9=A.m(new A.b(a0,a4.a(new A.fb(j9,s)),a1),a5)
B.a.A(f9,new A.fc(s))
g=k0.y
a0=k0.z
g0=A.ca(o,j9.a,k1,a0,g)
a1=A.S(a7,a7)
for(a4=g0.f,a5=new A.b9(a4,a4.r,a4.e,A.l(a4).h("b9<1>"));a5.j();){b0=a5.d
c0=a4.i(0,b0)
c0=c0==null?null:c0.length
a1.B(0,b0,c0==null?0:c0)}g1=g0.ga1()
if(g1==null)g1=g0.gc9()
if(g0.ga1()!=null&&a2.length===0)d2="attacking"
a4=f9.length,c3=k0.w>c3/a8.a,a5=a8.k4,k0=k0.f,b0=a8.rx,c0=a8.fy,a8=a8.go,c1=A.f(n),c2=c1.h("e(1)"),c1=c1.h("b<1>"),c4=c1.h("a.E"),g2=0,g3=1,g4=!1,b4=0
case 24:if(!(b4<f9.length)){r=26
break}d7=f9[b4]
g5={}
c5=d7.a
if(j9.a.as.n(0,c5)||j9.a.z.n(0,c5)){r=25
break}g6=o.I(d7.c)
c5=g6.a
b5=h.i(0,c5)
c6=b5==null
if(c6)c7=null
else c7=b5.d.length!==0||b5.a.at!=null
if(c7===!0){if(c6)c7=null
else{c7=b5.f
c7=c7==null?null:c7.a}c7=c7!==B.h}else c7=!1
if(c7){r=25
break}if(c6)c7=null
else c7=b5.d.length!==0||b5.a.at!=null
c8=j9.a
if(c7===!0){c7=c8.ax.n(0,c5)||c8.a2(g6)?0:1
c8=j9.a
c9=g6.at
if(c9==null){c8=c8.x.i(0,c5)
if(c8==null)c8=g6.d}else{c8=g6.ax
d0=g6.cy?1:0
d0=B.c.v(c9-c8-d0,0,5)
c8=d0}g7=Math.min(c7,c8)}else g7=c8.ax.n(0,c5)||c8.a2(g6)?0:1
if(j9.a.u(c5).length<=g7){r=25
break}if(c6)c5=null
else c5=b5.d.length!==0||b5.a.at!=null
if(c5===!0&&!s.bN(g6,d7,j9.a)){r=25
break}g8=A.ca(o,j9.a,k1,a0,g)
g9=A.m(new A.b(n,c2.a(new A.fd(s,g8,d7,a1)),c1),c4)
B.a.A(g9,new A.fe(s,g8,d7))
g5.a=null
c5=A.f(g9)
c6=c5.h("u<1>")
c7=new A.u(g9,0,a8,c6)
c7.S(g9,0,a8,c5.c)
c7=new A.o(c7,c7.gl(0),c6.h("o<k.E>"))
c6=c6.h("k.E")
h0=null
h1=-1/0
case 27:if(!c7.j()){r=28
break}c5=c7.d
h2=c5==null?c6.a(c5):c5
if(!c.X()){r=28
break}h3=h2.a
c5=o.u(h3)
c8=A.f(c5).h("L<1>")
c5=new A.L(c5,c8)
c9=h2.at
if(c9==null)c9=h2.d
else{d0=h2.ax
e9=h2.cy?1:0
e9=B.c.v(c9-d0-e9,0,5)
c9=e9}d0=new A.u(c5,0,c9,c8.h("u<k.E>"))
d0.S(c5,0,c9,c8.h("k.E"))
h4=d0.af(0)
f0=m.aI(d7,h2.e,o,h2)
if(!f0.d){r=27
break}h5=b.br(d7,j9.a,h2,l)
for(c5=h5.length,h6=!1,b8=0;b8<h5.length;h5.length===c5||(0,A.v)(h5),++b8){h7=h5[b8]
c8=A.jc(d7,h2,o,k1,l,h7,c3&&j9.a.d>100?0.05:0).a
h8=c8[1]
h9=b.aY(c8[2],h2,j9.a,d7)
h6=h9>0
if(!h6)continue
if(g8.ga1()!=null&&h3!==g8.ga1())c9=h9!==1||h8<a5
else c9=!1
if(c9)continue
i0=a1.i(0,h3)
if(i0==null)i0=0
i1=h9-i0
if(i1<=0)continue
g3=Math.max(g3,h9)
f6=s.bL(j9.a,d7,h2,h7,i1,i0,c8[0])
if(f6==null){i2=j9.a.N()
i2.d=1e6
i3=s.bL(i2,d7,h2,h7,i1,i0,c8[0])
if(i3!=null){if(a2.length===0)d2="saving"
c8=i2.d
c9=i3.a
i4=c8-c9.d+c9.T().a
g2=g2===0?i4:Math.min(g2,i4)
if(g1==null)g1=h3}else if(a2.length===0)d2="preparing"
continue}c5=f0.b
c8=A.bm(h2,d7,o,k1,k0,c5)
c9=j9.a.d
d0=f6.a.d
e9=B.a.b1(h7,1).G(0,0,new A.ff(s),a7)
f1=b7.i(0,"weaponChance")
f1.toString
i5=c8-c5*0.4-(c9-d0)*0.5+h8*30+e9*b0*f1*0.02
if(i5>h1){g5.a=f6
g3=f6.b.d.length
h1=i5
h0=h2}break}if(!h6&&g1==null){g3=Math.max(1,Math.min(c0,h4.length))
g1=h3}r=29
return k2.b=5,1
case 29:r=27
break
case 28:c5=g5.a
if(c5!=null){c5=B.a.G(e,0,new A.fg(),a7)
c6=g5.a
c5=c5+c6.b.b.length<=a9}else{c6=c5
c5=!1}if(c5){j9.a=c6.a
B.a.m(e,c6.b)
g1=h0.a
a1.aJ(g1,new A.fh(g5),new A.fi(g5))
g4=!0}r=30
return k2.b=6,1
case 30:case 25:f9.length===a4||(0,A.v)(f9),++b4
r=24
break
case 26:k0=!g4
if(k0&&B.a.gD(a3).e===0&&j!==B.y){i6=s.cW(j9.a,g0)
if(i6!=null){j9.a=i6.a
B.a.m(e,i6.b)
d2="preparing"}}r=j===B.F&&k0&&B.a.G(e,0,new A.fj(),a7)<a9-3?31:32
break
case 31:i7=j9.a.cb(new A.b(n,c2.a(new A.fk(s,g0)),c1))
k0=o.gM(),m=J.G(k0.a),k0=new A.R(m,k0.b,k0.$ti.h("R<1>"))
case 33:if(!k0.j()){r=34
break}l=m.gp()
j=l.a
g=h.i(0,j)
if(g==null)g=null
else g=g.d.length!==0||g.a.at!=null
if(g===!0){r=33
break}if(!c.X()){r=34
break}i8=j9.a.u(j)
b6=j9.a.N()
g=A.f(i8)
a0=g.h("b<1>")
i9=A.m(new A.b(i8,g.h("e(1)").a(new A.fm(j9)),a0),a0.h("a.E"))
B.a.A(i9,new A.fn())
j0=!1
if(i7.n(0,j))if(B.a.K(n,new A.fo(s))){if(i8.length!==0){g=j9.a.bZ(j)
a0=j9.a
g=g<(a0.ax.n(0,j)||a0.a2(l)?0:1)+g3}else g=!0
j0=g}if(i9.length!==0){g=i8.length
a0=j9.a
a1=l.at
if(a1==null){a0=a0.x.i(0,j)
if(a0==null)a0=l.d}else{a0=l.ax
a4=l.cy?1:0
a4=B.c.v(a1-a0-a4,0,5)
a0=a4}if(g<a0)g=j0&&i8.length>=l.y
else g=!0}else g=!1
if(g)if(b6.aK(l,B.a.gD(i9))&&b6.d>=b6.T().a){j9.a=b6
B.a.m(e,new A.E("\u5148\u6269\u5145\u5b89\u5168\u8fce\u6218\u540d\u989d\u548c\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u8003\u8651\u62db\u5c06\u4e0e\u8fdc\u5f81",A.d([new A.y(B.m,B.a.gD(i9).a,j,null,0,B.d)],b1),b.aa(A.d([B.a.gD(i9)],b2),A.d([l],b3)),B.q,b6.T().a,!1))
r=34
break}if(j0){g=o.I(g1)
g=b6.dw(l,g==null?null:g.b)&&b6.d>=b6.T().a}else g=!1
if(g){j9.a=b6
B.a.m(e,new A.E("\u4e3a\u7559\u5b88\u4e0e\u8fdc\u5f81\u7684\u771f\u5b9e\u7f3a\u53e3\u62bd\u53d6\u82f1\u96c4\uff0c\u9884\u7559\u6700\u9ad8\u624b\u7eed\u8d39\u548c\u6708\u4ff8",A.d([new A.y(B.w,null,j,null,0,B.d)],b1),b.aa(A.d([],b2),A.d([l],b3)),B.q,b6.T().a,!1))
r=34
break}g=j9.a.f
a0=i8.length
a1=b7.i(0,"soldierLimit")
a1.toString
a1=Math.min(g,a0*B.b.k(a1))
a0=j9.a
j1=a1-a0.e
if(j1>0){j2=a0.N()
g=b7.i(0,"soldierBatch")
g.toString
j3=Math.min(B.b.k(g),j1)
if(j2.aC(j3)&&j2.d>=j2.T().a){j9.a=j2
B.a.m(e,new A.E("\u8865\u5145\u8fd1\u671f\u5b88\u57ce\u548c\u51fa\u5f81\u6240\u9700\u5175\u5458\uff0c\u4e0d\u586b\u6ee1\u6ca1\u6709\u4efb\u52a1\u7684\u5168\u56fd\u5bb9\u91cf",A.d([new A.y(B.n,null,j,null,j3,B.d)],b1),b.aa(A.d([],b2),A.d([l],b3)),B.q,j2.T().a,!1))
r=34
break}}r=35
return k2.b=7,1
case 35:r=33
break
case 34:case 32:if(g4)d2=a2.length===0?"attacking":"defending"
j4=o.I(g1)
if(j4!=null){j5=A.aS(j4.b,o,k1,null)
if(j5.ga6())B.a.m(d,"\u76ee\u6807\u56fd\u5360\u6709 "+j5.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.ap(j5.c*j5.gaV())+" \u91d1\u5e01\uff0c\u51c6\u5907\u5f3a\u5316\u6b66\u5668\u548c\u8f6e\u653b\u5175\u529b")}if(e.length===0){k0=j9.a
B.a.m(d,k0.d<k0.T().a?"\u8d44\u91d1\u4e0d\u8db3\u4ee5\u8986\u76d6\u73b0\u6709\u90e8\u961f\u548c\u6b20\u6536\u6708\u4ff8\uff0c\u7b49\u5f85\u6574\u5907":"\u6ca1\u6709\u6ee1\u8db3\u5b88\u57ce\u3001\u65f6\u9650\u53ca\u9759\u6001\u98ce\u9669\u7ea6\u675f\u7684\u65b0\u589e\u884c\u52a8\uff0c\u4fdd\u6301\u5df2\u6709\u4efb\u52a1")}if(c3)B.a.m(d,"\u505c\u6ede\u8bca\u65ad\uff1a"+(d2==="saving"?"\u7f3a\u5c11\u6574\u961f\u540e\u52e4\u8d44\u91d1":"\u7f3a\u5c11\u53ef\u5b89\u5168\u6267\u884c\u7684\u6269\u5f20\u6761\u4ef6")+"\uff0c\u4e0d\u901a\u8fc7\u65e0\u9650\u62db\u52df\u6216\u81ea\u6740\u51fa\u51fb\u6253\u7834\u7b49\u5f85")
j6=A.d([],i)
for(k0=e.length,j7=0,b4=0;b4<e.length;e.length===k0||(0,A.v)(e),++b4){j8=e[b4]
j7+=j8.b.length
if(j7>a9){c.e=!0
B.a.m(d,"\u547d\u4ee4\u914d\u989d\u5230\u8fbe\uff0c\u53ea\u63d0\u4ea4\u524d\u9762\u5b8c\u6574\u7684\u52a8\u4f5c\u7ec4\uff0c\u540e\u7eed\u7559\u5f85\u4e0b\u4e00\u6b21\u89c4\u5212")
break}B.a.m(j6,j8)}s.w=new A.bR(d2,g1,g2,g3,j6,A.a_(d,0,A.Y(12,"count",a7),a6).af(0),c.e,c.c,c.d,c.b)
case 1:return 0
case 2:return k2.c=p.at(-1),3}}}},
cN(a,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b=null
t.bd.a(a0)
s=A.f(a0)
r=s.h("b<1>")
r=A.jG(new A.b(a0,s.h("e(1)").a(new A.eR(c,a)),r),8,r.h("a.E"))
q=A.m(r,A.l(r).h("a.E"))
if(q.length<2)return b
p=a.N()
p.d=1e6
o=A.d([],t.Z)
for(s=q.length,r=c.c.Q,n=c.d,m=0;m<q.length;q.length===s||(0,A.v)(q),++m){l=q[m]
k=r.gM()
j=k.$ti
i=j.h("b<a.E>")
h=A.m(new A.b(k,j.h("e(a.E)").a(new A.eS(c)),i),i.h("a.E"))
B.a.A(h,new A.eT(l))
k=A.f(h)
j=k.h("u<1>")
i=new A.u(h,0,3,j)
i.S(h,0,3,k.c)
i=new A.o(i,i.gl(0),j.h("o<k.E>"))
j=j.h("k.E")
while(i.j()){k=i.d
if(k==null)k=j.a(k)
if(!n.X())return b
g=c.e
g===$&&A.O()
f=g.al(l,k.e,r,!0,k)
g=c.r
g===$&&A.O()
e=g.cn(p,l,f,!0,!0,!0,"\u540c\u65f6\u5b89\u6392\u7f3a\u94b1\u8425\u5730\u56de\u57ce\uff0c\u7f29\u77ed\u5168\u56fd\u7cae\u8349\u627f\u8bfa","regroup",k)
if(e==null)continue
p=e.a
B.a.m(o,e.b)
break}}if(o.length<2)return b
p.d=a.d
d=p.a5(!0).a
if(p.d<d)return b
s=t.fB
s=A.m(new A.aT(o,t.fj.a(new A.eU()),s),s.h("a.E"))
r=t.E
r=A.m(new A.aT(o,t.W.a(new A.eV()),r),r.h("a.E"))
n=t.N
n=A.S(n,n)
for(k=o.length,m=0;m<o.length;o.length===k||(0,A.v)(o),++m)n.F(0,o[m].c)
return new A.cb(p,new A.E("\u5408\u5e76\u6838\u7b97\u5404\u652f\u8fd4\u7a0b\u8d39\u7528\uff0c\u4ee5\u73b0\u6709\u73b0\u91d1\u7ec4\u7ec7\u56de\u57ce\uff0c\u4e0d\u518d\u4e92\u76f8\u9884\u7559\u957f\u671f\u624e\u8425\u8d39",s,n,r,d,!0))},
cO(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this
for(s=a2.c.Q,r=s.gM(),q=J.G(r.a),r=new A.R(q,r.b,r.$ti.h("R<1>")),p=a2.x,o=a2.d,n=s.r,m=A.f(n),l=m.h("e(1)"),m=m.h("b<1>"),k=m.h("a.E"),j=a3.ax;r.j();){i=q.gp()
h=i.a
if(a3.u(h).length!==0||a3.a2(i)||a3.L(h)>0||j.n(0,h))continue
g=A.m(new A.b(n,l.a(new A.eW(a2,a3)),m),k)
B.a.A(g,new A.eX(i))
f=A.f(g)
e=f.h("u<1>")
d=new A.u(g,0,4,e)
d.S(g,0,4,f.c)
d=new A.o(d,d.gl(0),e.h("o<k.E>"))
f=i.e
e=e.h("k.E")
while(d.j()){c=d.d
if(c==null)c=e.a(c)
if(!o.X())return null
b=a2.e
b===$&&A.O()
a=b.al(c,f,s,!0,i)
b=a2.r
b===$&&A.O()
a0=p.i(0,h)
a0=a0==null?null:a0.ga9()
a1=b.b0(a3,c,a,!0,a0==null?1/0:a0,!0,"\u524d\u7ebf\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5b89\u5168\u540e\u65b9\u65e0\u9700\u4e3a\u7559\u5b88\u7275\u5236\u90e8\u961f","transfer",i)
if(a1!=null)return a1}}return null},
cM(b3,b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this,b2=null
if(b4.ax.length===0)return b2
s=b5==null
if((s?b2:b5.b)==="expedition")r=s?b2:b5.d
else r=b2
q=b1.c.Q
p=q.f
o=A.f(p)
n=o.h("b<1>")
m=A.m(new A.b(p,o.h("e(1)").a(new A.eN(b1)),n),n.h("a.E"))
B.a.A(m,new A.eO(b1,r,b4))
for(p=b1.a,o=p.w,n=A.a_(m,0,A.Y(o.go,"count",t.S),A.f(m).c),l=n.$ti,n=new A.o(n,n.gl(0),l.h("o<k.E>")),s=!s,k=t.r,j=o.fy,i=b3.y,h=A.l(i).h("a9<2>"),g=h.h("e(a.E)"),f=h.h("b<a.E>"),e=b1.d,l=l.h("k.E"),p=p.b,d=q.w,o=o.ch;n.j();){c=n.d
if(c==null)c=l.a(c)
if(!e.X())return b2
b=b1.r
b===$&&A.O()
if(!b.ak(c))continue
a=new A.b(new A.a9(i,h),g.a(new A.eP(b1,b4,c)),f).gl(0)
if(a>=j)continue
a0=c.a
a1=q.u(a0)
a2=A.f(a1).h("L<1>")
a1=new A.L(a1,a2)
a3=c.at
a4=a3==null
if(a4)a5=c.d
else{a5=c.ax
a6=c.cy?1:0
a6=B.c.v(a3-a5-a6,0,5)
a5=a6}a6=new A.u(a1,0,a5,a2.h("u<k.E>"))
a6.S(a1,0,a5,a2.h("k.E"))
a7=A.aI(a6,k)
a1=a7!=null
if(a1){a2=B.a.ar(d,new A.eQ(c))
a5=b1.f
a5===$&&A.O()
if(a4)a3=c.d
else{a4=c.ax
a6=c.cy?1:0
a6=B.c.v(a3-a4-a6,0,5)
a3=a6}a4=p.i(0,"soldierLimit")
a4.toString
a8=a5.d2(b4,a7,a3,!1,Math.min(B.b.k(a4),a7.gP()+a2.c))
if(a8.r||a8.c<=0||a8.b<o)continue}a2=b1.e
a2===$&&A.O()
a9=a2.aI(b4,c.e,q,c)
if(!s||b5.b!=="expedition")a0="\u91ce\u5916\u4efb\u52a1\u7ed3\u675f\u540e\u5229\u7528\u73b0\u6709\u968f\u8eab\u5175\u529b\uff0c\u8f6c\u653b\u53ef\u4ee5\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u654c\u57ce"
else a0=a0===r?"\u91cd\u65b0\u6838\u5bf9\u5f53\u524d\u5b88\u519b\u4e0e\u8def\u8d39\u540e\uff0c\u7ee7\u7eed\u8fdb\u653b\u539f\u76ee\u6807":"\u539f\u76ee\u6807\u4e0d\u518d\u9002\u5408\u8fdb\u653b\uff0c\u8f6c\u5411\u9644\u8fd1\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u654c\u57ce"
b0=b.co(b3,b4,a9,a1,!0,a,a0,"expedition",c)
if(b0!=null)return b0}return b2},
cW(b2,b3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6=this,a7=a6.c.Q,a8=a7.gM(),a9=a8.$ti,b0=a9.h("b<a.E>"),b1=A.m(new A.b(a8,a9.h("e(a.E)").a(new A.f0(a6)),b0),b0.h("a.E"))
if(b1.length<2)return null
a8=a7.f
a9=A.f(a8)
b0=a9.h("b<1>")
s=A.m(new A.b(a8,a9.h("e(1)").a(new A.f1(a6,b3)),b0),b0.h("a.E"))
a8=t.S
a9=t.i
r=A.S(a8,a9)
for(b0=b1.length,q=A.f(s),p=q.c,q=q.h("u<1>"),o=a6.a,n=o.w,m=n.go,l=0;l<b1.length;b1.length===b0||(0,A.v)(b1),++l){k=b1[l]
B.a.A(s,new A.f2(k))
j=new A.u(s,0,m,q)
j.S(s,0,m,p)
r.B(0,k.a,j.G(0,1/0,new A.f3(a6,k),a9))}B.a.A(b1,new A.f4(r))
for(a9=A.f(b1),a8=A.a_(b1,0,A.Y(2,"count",a8),a9.c),b0=a8.$ti,a8=new A.o(a8,a8.gl(0),b0.h("o<k.E>")),a9=a9.h("L<1>"),q=a9.h("o<k.E>"),p=a6.d,m=a7.c,j=b2.ax,i=a9.h("k.E"),n=n.at,b0=b0.h("k.E");a8.j();){h=a8.d
if(h==null)h=b0.a(h)
g=h.a
f=r.i(0,g)
f.toString
if(f>n)continue
for(f=new A.L(b1,a9),f=new A.o(f,f.gl(0),q),e=h.e,d=h.d;f.j();){c=f.d
if(c==null)c=i.a(c)
b=c.a
a=r.i(0,b)
a.toString
a0=r.i(0,g)
a0.toString
if(a<a0+10)continue
a1=b2.u(b)
a=a1.length
if(a<=(j.n(0,b)||b2.a2(c)?0:1))continue
b=A.f(a1)
a=b.h("b<1>")
a2=A.m(new A.b(a1,b.h("e(1)").a(new A.f5(b2)),a),a.h("a.E"))
B.a.A(a2,new A.f6())
b=A.f(a2)
a=b.h("u<1>")
a0=new A.u(a2,0,2,a)
a0.S(a2,0,2,b.c)
a0=new A.o(a0,a0.gl(0),a.h("o<k.E>"))
a=a.h("k.E")
c=c.d
while(a0.j()){b=a0.d
if(b==null)b=a.a(b)
if(b.x<15||d>=o.ai(m)||c<o.ai(m)||B.a.K(b2.u(g),new A.f7(b)))continue
if(!p.X())return null
a3=a6.e
a3===$&&A.O()
a4=a3.al(b,e,a7,!0,h)
a3=a6.r
a3===$&&A.O()
a5=a3.cl(b2,b,a4,!0,!0,"\u540e\u65b9\u5efa\u8bbe\u5df2\u5b8c\u6210\uff0c\u5b89\u5168\u8f6c\u79fb\u9ad8\u5185\u653f\u5c06\u9886\u4e3b\u6301\u524d\u7ebf\u57ce\u9632\u5efa\u8bbe","transfer",h)
if(a5!=null)return a5}}}return null},
bN(a,b,c){var s,r,q=a.a,p=this.x.i(0,q),o=p==null?null:p.d
if(o==null)o=A.d([],t.D)
if(o.length===0)return!0
q=c.u(q)
p=A.f(q)
s=p.h("b<1>")
q=A.m(new A.b(q,p.h("e(1)").a(new A.eZ(b)),s),s.h("a.E"))
p=A.f(q).h("L<1>")
r=A.a_(new A.L(q,p),0,A.Y(c.O(a),"count",t.S),p.h("k.E")).af(0)
if(r.length===0)return!1
return B.a.aE(o,new A.f_(this,r,c,a))},
bL(c8,c9,d0,d1,d2,d3,d4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5=this,c6=null,c7="soldierLimit"
t.L.a(d1)
s=t.e
r=A.d([],s)
for(q=c5.c.Q,p=q.gM(),o=J.G(p.a),p=new A.R(o,p.b,p.$ti.h("R<1>")),n=c8.ax,m=c5.x,l=c9.c;p.j();){k=o.gp()
j=k.a
i=m.i(0,j)
if(i==null)i=c6
else i=i.d.length!==0||i.a.at!=null
if(i===!0&&j!==l)continue
h=n.n(0,j)||c8.a2(k)?0:1
g=Math.max(0,c8.u(j).length-h)
k=c8.u(j)
j=A.f(k)
i=j.h("b<1>")
f=A.m(new A.b(k,j.h("e(1)").a(new A.eJ(c5,c8,d0)),i),i.h("a.E"))
B.a.A(f,new A.eK(c5))
k=A.f(f)
j=new A.u(f,0,g,k.h("u<1>"))
j.S(f,0,g,k.c)
B.a.F(r,j)}if(!B.a.n(r,c9))return c6
B.a.an(r,c9)
B.a.A(r,new A.eL(c5))
p=c5.e
p===$&&A.O()
o=d0.e
e=p.aI(c9,o,q,d0)
if(!e.d)return c6
d=A.d([c9],s)
s=t.N
c=A.T([c9.a,e],s,t.bJ)
b=e.b
for(n=c5.a,l=n.w,k=t.S,j=A.a_(r,0,A.Y(l.fy*2,"count",k),t.r),i=j.$ti,j=new A.o(j,j.gl(0),i.h("o<k.E>")),a=l.ok,i=i.h("k.E"),a0=b;j.j();){a1=j.d
if(a1==null)a1=i.a(a1)
if(d.length>=d2)break
a2=p.aI(a1,o,q,d0)
if(!a2.d)continue
a3=a2.b
a4=Math.min(b,a3)
a5=Math.max(a0,a3)
if(a5-a4>a)continue
B.a.m(d,a1)
c.B(0,a1.a,a2)
a0=a5
b=a4}if(d.length<d2)return c6
a6=A.d([],t.w)
a7=A.d([],t.m)
a8=A.S(s,s)
s=q.u(d0.a)
p=A.f(s).h("L<1>")
a9=A.a_(new A.L(s,p),0,A.Y(d0.gag(),"count",k),p.h("k.E")).af(0)
for(s=l.fx,n=n.b,p=d2===1,o=A.f(a9),l=o.c,o=o.h("u<1>"),k=t.p,b0=c8,b1=0;b1<d.length;++b1){b2=d[b1]
j=b2.c
i=m.i(0,j)
if(i==null)i=c6
else i=i.d.length!==0||i.a.at!=null
if(i===!0){i=q.I(j)
i.toString
i=!c5.bN(i,b2,b0)}else i=!1
if(i)return c6
i=c.i(0,b2.a)
i.toString
if(b1===0)a1=A.d([d1],k)
else{a1=c5.r
a1===$&&A.O()
a3=c5.f
a3===$&&A.O()
a3=a1.br(b2,b0,d0,a3)
a1=a3}a3=a1.length
b3=d3+b1
b4=b0.ax
b5=b1>0
b6=c6
b7=0
for(;b7<a1.length;a1.length===a3||(0,A.v)(a1),++b7){b8=a1[b7]
if(b5){if(d4){b9=new A.u(a9,0,1,o)
b9.S(a9,0,1,l)}else b9=a9
b9=J.lg(b9,new A.eM(c5,b2,d0,b8))}else b9=!1
if(b9)continue
for(b9=q.gM(),c0=J.G(b9.a),b9=new A.R(c0,b9.b,b9.$ti.h("R<1>")),c1=0;b9.j();){c2=c0.gp()
c3=c2.a
c4=b0.u(c3).length
c4=Math.max(0,c4-(c3===j?1:0))
c2=b4.n(0,c3)||b0.a2(c2)?0:1
c2=Math.min(c4,c2)
c4=n.i(0,c7)
c4.toString
c1+=c2*B.b.k(c4)}b9=c5.r
b9===$&&A.O()
c0=p?"\u56f4\u7ed5\u4e3b\u653b\u76ee\u6807\u6295\u5165\u8db3\u591f\u6218\u529b\uff0c\u4fdd\u7559\u5176\u4ed6\u65b9\u5411\u5175\u529b":"\u96c6\u4e2d\u4f18\u52bf\u7f16\u961f\u8f6e\u653b\u540c\u4e00\u5ea7\u57ce\uff0c\u62b5\u8fbe\u95f4\u9694\u4e0d\u8d85\u8fc7"+B.b.k(a)+"\u79d2"
c2=b0.f
c3=n.i(0,c7)
c3.toString
b6=b9.bw(b0,b2,i,d4,b8,Math.min(c1,Math.max(0,c2-B.b.k(c3))),b3,c0,"expedition",d0)
if(b6!=null)break}if(b6==null)return c6
b0=b6.a
j=b6.b
B.a.F(a6,j.b)
B.a.F(a7,j.d)
a8.F(0,j.c)
if(a6.length>s){c5.d.e=!0
return c6}}s=c5.r
s===$&&A.O()
a8.F(0,s.aa(a9,A.d([],t.Y)))
if(d4)s="\u5148\u6d3e\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u5c06\u9886\u8fdb\u653b\u524d\u6392\uff0c\u6301\u7eed\u8f6e\u653b\u5e76\u8865\u5145\u6218\u635f"
else s=p?"\u6267\u884c\u9759\u6001\u4f18\u52bf\u660e\u786e\u3001\u53ef\u4ee5\u4f9b\u517b\u7684\u6269\u5f20":"\u6574\u961f\u540e\u52e4\u51c6\u5907\u5b8c\u6210\uff0c\u6309\u771f\u5b9e\u6392\u961f\u89c4\u5219\u8f6e\u653b\uff1b\u4e0d\u9884\u6f14\u672a\u6765\u4f24\u4ea1"
return new A.cb(b0,new A.E(s,a6,a8,a7,b0.T().a,!1))},
cY(a,b,c){var s=this.c
return A.bm(a,b,s.Q,this.a,s.f,c)},
aU(a,b){return this.cY(a,b,null)}}
A.f8.prototype={
$1(a){var s,r,q
t.J.a(a)
s=this.a.c.Q
r=s.Z(a.a)
q=!1
if(r!=null)if(r.b===s.a)if(!r.fy)if(r.f>0){s=r.as
s=!(s===B.f||s===B.e)&&r.id===a.ax}else s=q
else s=q
else s=q
else s=q
return s},
$S:11}
A.f9.prototype={
$1(a){t.h.a(a)
return a.d.length!==0||a.a.at!=null},
$S:62}
A.fa.prototype={
$2(a,b){var s,r=t.h
r.a(a)
r.a(b)
s=B.b.t(a.ga9(),b.ga9())
return s!==0?s:B.b.t(b.r+b.a.r*4,a.r+a.a.r*4)},
$S:63}
A.fl.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:15}
A.fp.prototype={
$2(a,b){var s,r=t.dp
r.a(a)
r.a(b)
r=a.e
s=b.e
return r!==s?B.c.t(r,s):B.b.t(b.d,a.d)},
$S:35}
A.fq.prototype={
$1(a){t.r.a(a)
return a.b===this.a.c.Q.a&&!a.fy&&a.fx},
$S:0}
A.fr.prototype={
$1(a){t.r.a(a)
return this.a.c.x!==B.o},
$S:0}
A.fs.prototype={
$1(a){var s=this.a.a.r.i(0,A.h(a))
return(s==null?null:s.d)===0},
$S:16}
A.ft.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.Q.a&&a.dx&&s.x!==B.o&&!a.fy&&!this.a.a.as.n(0,a.a)},
$S:0}
A.fu.prototype={
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
else m=m.d.length!==0||m.a.at!=null
s=s.a
s=m===!0?s.O(a):Math.max(s.O(a),a.y+o.a.w.cy)
if(q-p<s){s=n.i(0,r)
if(s==null)s=k
else s=s.d.length!==0||s.a.at!=null
if(s===!0){s=n.i(0,r)
if(s==null)s=k
else{s=s.f
s=s==null?k:s.a}s=s===B.h}else s=!0}else s=!1
return s},
$S:1}
A.fv.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(a.e.E(s),b.e.E(s))},
$S:4}
A.fb.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b.c
r=!1
if(a.b===s.Q.a)if(a.db){r=this.a
s=r.a.ao(a)&&s.x!==B.y&&!a.fy&&!r.a.z.n(0,a.a)}else s=r
else s=r
return s},
$S:0}
A.fc.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ae(b,s.I(b.c).d<q.ai(r)),A.ae(a,s.I(a.c).d<q.ai(r)))},
$S:2}
A.fd.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.a
r=!1
if(a.b!==s.c.Q.a)if(this.b.au(a)){q=s.r
q===$&&A.O()
if(q.ak(a)){r=this.d.i(0,a.a)
if(r==null)r=0
s=r<s.a.w.fy}else s=r}else s=r
else s=r
return s},
$S:1}
A.fe.prototype={
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
$S:4}
A.ff.prototype={
$2(a,b){var s,r
A.h(a)
A.h(b)
s=this.a.a.r
r=s.i(0,b)
r=r==null?null:r.c
if(r==null)r=0
s=s.i(0,b)
s=s==null?null:s.d
return a+Math.max(0,r-(s==null?0:s))},
$S:23}
A.fg.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:15}
A.fh.prototype={
$1(a){return A.h(a)+this.a.a.b.d.length},
$S:6}
A.fi.prototype={
$0(){return this.a.a.b.d.length},
$S:5}
A.fj.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:15}
A.fk.prototype={
$1(a){var s,r
t.q.a(a)
s=this.a
r=!1
if(a.b!==s.c.Q.a)if(this.b.au(a)){s=s.r
s===$&&A.O()
s=s.ak(a)}else s=r
else s=r
return s},
$S:1}
A.fm.prototype={
$1(a){t.r.a(a)
return a.fr&&!this.a.a.as.n(0,a.a)},
$S:0}
A.fn.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fo.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.eR.prototype={
$1(a){var s,r
t.r.a(a)
if(a.as!==B.i){s=this.b
if(s.y.i(0,a.a)==null){r=this.a
r=!A.jR(a,r.c.Q,s,r.a)
s=r}else s=!1}else s=!0
return s&&!a.R8&&a.k1==null},
$S:0}
A.eS.prototype={
$1(a){var s=this.a.x.i(0,t.q.a(a).a)
if(s==null)s=null
else s=s.d.length!==0||s.a.at!=null
return s!==!0},
$S:1}
A.eT.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(a.e.E(s),b.e.E(s))},
$S:4}
A.eU.prototype={
$1(a){return t.I.a(a).b},
$S:38}
A.eV.prototype={
$1(a){return t.I.a(a).d},
$S:30}
A.eW.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=!1
if(a.b===s.c.Q.a)if(a.db){q=this.b
if(q.ao(a))if(!q.as.n(0,a.a)){s=s.x.i(0,a.c)
if(s==null)s=null
else s=s.d.length!==0||s.a.at!=null
s=s!==!0}else s=r
else s=r}else s=r
else s=r
return s},
$S:0}
A.eX.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.z.E(s),b.z.E(s))},
$S:2}
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
if(s!==this.b.a)if(a.b==="expedition")if(a.d===this.c.a){s=this.a.c.Q.Z(s)
s=(s==null?null:s.fy)===!1}else s=r
else s=r
else s=r
return s},
$S:11}
A.eQ.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:8}
A.f0.prototype={
$1(a){var s=this.a.x.i(0,t.q.a(a).a)
if(s==null)s=null
else s=s.d.length!==0||s.a.at!=null
return s!==!0},
$S:1}
A.f1.prototype={
$1(a){t.q.a(a)
return a.b!==this.a.c.Q.a&&this.b.au(a)},
$S:1}
A.f2.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.E(s),b.e.E(s))},
$S:4}
A.f3.prototype={
$2(a,b){var s,r
A.an(a)
t.q.a(b)
s=this.a.e
s===$&&A.O()
r=this.b.e
return Math.min(a,s.W(r,b.f.a0(r)))},
$S:41}
A.f4.prototype={
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
A.f5.prototype={
$1(a){t.r.a(a)
return a.db&&a.e!==2&&!this.a.as.n(0,a.a)},
$S:0}
A.f6.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ae(s.a(b),!0),A.ae(a,!0))},
$S:2}
A.f7.prototype={
$1(a){return t.r.a(a).x>=this.a.x},
$S:0}
A.eZ.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.f_.prototype={
$1(a){var s=this
return B.a.K(s.b,new A.eY(s.a,t.O.a(a),s.c,s.d))},
$S:10}
A.eY.prototype={
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
return r.bj(a,n.b.a,p,Math.min(o,Math.max(0,q-B.b.k(s)))).a===B.h},
$S:0}
A.eJ.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.db){r=this.b
if(!r.as.n(0,a.a))if(r.ao(a)){s=this.a.r
s===$&&A.O()
s=s.ak(this.c)}}return s},
$S:0}
A.eK.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ae(b,s.I(b.c).d<q.ai(r)),A.ae(a,s.I(a.c).d<q.ai(r)))},
$S:2}
A.eL.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ae(b,s.I(b.c).d<q.ai(r)),A.ae(a,s.I(a.c).d<q.ai(r)))},
$S:2}
A.eM.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this,i="soldierLimit"
t.r.a(a)
s=j.a
r=s.f
r===$&&A.O()
q=j.c
p=q.gag()
o=s.a
n=o.b
m=n.i(0,i)
m.toString
m=B.b.k(m)
n=n.i(0,i)
n.toString
l=j.d
k=r.d5(j.b,a,p,Math.min(B.b.k(n),B.a.ar(s.c.Q.w,new A.eI(q)).c),l,m)
return J.jw(l)&&k.b<o.w.k4||k.r||k.c<=o.w.RG||k.b<-0.12},
$S:0}
A.eI.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:8}
A.a7.prototype={}
A.fw.prototype={
c2(a,b){return new A.ax(this.d1(a,b),t.dT)},
d1(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e
return function $async$c2(c,d,a0){if(d===1){n.push(a0)
p=o}for(;;)switch(p){case 0:i=s.a4(r,q)
h=r.a
g=h.a
f=q.L(g)<=q.O(h)
e=!1
if(f){m=r.d
if(m.length!==0)if(B.a.aE(m,new A.hg(s,q))){e=q.y
e=!new A.a9(e,A.l(e).h("a9<2>")).K(0,new A.hh(r))}}p=e?3:4
break
case 3:p=5
return c.b=new A.a7(q,A.d([],t.Z),s.a8(r,q),!1,"\u5df2\u6709\u622a\u51fb\u90e8\u961f\u80fd\u53ca\u65f6\u63a5\u654c\uff0c\u7b49\u5f85\u6267\u884c\u7ed3\u679c\uff0c\u4e0d\u91cd\u590d\u6d3e\u51fa\u7b2c\u4e8c\u652f\u90e8\u961f","hold"),1
case 5:p=1
break
case 4:if(f)e=(i==null?null:i.a)===B.h
else e=!1
p=e?6:7
break
case 6:p=8
return c.b=new A.a7(q,A.d([],t.Z),s.a8(r,q),!1,"\u57ce\u9632\u4e0e\u73b0\u6709\u5b88\u5c06\u8db3\u4ee5\u5e94\u5bf9\u53ef\u89c1\u6765\u654c\uff0c\u7ef4\u6301\u8fdc\u5f81\uff0c\u4e0d\u53ec\u56de\u5c06\u9886","hold"),1
case 8:p=1
break
case 7:e=s.bB(r,q)
l=A.m(e,e.$ti.h("a.E"))
e=A.f(l)
m=e.h("b<1>")
k=A.m(new A.b(l,e.h("e(1)").a(new A.hi(s,r,i,q)),m),m.h("a.E"))
p=k.length!==0?9:10
break
case 9:p=11
return c.bW(k)
case 11:p=1
break
case 10:p=f&&q.L(g)<q.O(h)?12:13
break
case 12:j=q.N()
p=j.dv(h,!0)&&j.d>=j.a5(!0).a?14:15
break
case 14:p=16
return c.b=s.aB(r,q,j,A.d([new A.y(B.w,null,g,null,0,B.d)],t.w),"\u672c\u5730\u4ecd\u6709\u8fce\u6218\u540d\u989d\uff0c\u5148\u62db\u52df\u8865\u5f3a\uff0c\u518d\u6309\u5b9e\u9645\u5230\u4efb\u5c5e\u6027\u590d\u6838\uff0c\u6682\u4e0d\u53ec\u56de\u8fdc\u5f81"),1
case 16:p=1
break
case 15:case 13:p=17
return c.bW(l)
case 17:case 1:return 0
case 2:return c.c=n.at(-1),3}}}},
bB(a,b){return new A.ax(this.cA(a,b),t.dT)},
cA(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e,d,c,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9,k0,k1,k2,k3,k4,k5,k6,k7,k8,k9
return function $async$bB(l0,l1,l2){if(l1===1){n.push(l2)
p=o}for(;;)switch(p){case 0:k3=r.a
k4=k3.a
k5=q.L(k4)>q.O(k3)
k6=t.Z
k7=A.d([],k6)
k8=s.a8(r,q)
k9=!k5
if(k9){m=s.a4(r,q)
m=(m==null?null:m.a)!==B.h}else m=!0
p=3
return l0.b=new A.a7(q,k7,k8,m,k5?"unsalvageableDefense\uff1a\u5f53\u524d\u5b89\u5168\u540d\u989d "+q.O(k3)+"\uff0c\u9a7b\u519b "+q.L(k4)+"\uff0c\u7b49\u5f85\u5408\u6cd5\u4fee\u590d":"\u4fdd\u6301\u53ef\u51fa\u573a\u5b88\u519b\uff0c\u7ee7\u7eed\u76d1\u63a7\u5168\u90e8\u6765\u654c","local"),1
case 3:k7=s.c
if(!k7.X()){p=1
break}k8=q.f
m=q.u(k4).length
l=s.b
k=l.b
j=k.i(0,"soldierLimit")
j.toString
i=Math.max(0,Math.min(k8,m*B.b.k(j))-q.e)
p=i>0?4:5
break
case 4:h=q.N()
k8=h.d
m=h.a5(!0)
j=k.i(0,"soldierCost")
j.toString
g=Math.min(i,Math.max(0,B.c.aO(k8-m.a,B.b.k(j))))
p=g>0&&h.aC(g)?6:7
break
case 6:p=8
return l0.b=s.aB(r,q,h,A.d([new A.y(B.n,null,k4,null,g,B.d)],t.w),"\u4f18\u5148\u7528\u56fd\u5e93\u8865\u8db3\u73b0\u6709\u5b88\u519b\u5175\u5458\uff0c\u518d\u5224\u65ad\u662f\u5426\u9700\u8981\u5916\u63f4"),1
case 8:case 7:case 5:k8=k3.at
m=k8==null
p=m?9:10
break
case 9:f=q.N()
e=A.d([],t.w)
j=f.u(k4)
d=A.f(j)
c=d.h("b<1>")
a0=A.m(new A.b(j,d.h("e(1)").a(new A.fx()),c),c.h("a.E"))
B.a.A(a0,new A.fy())
p=a0.length!==0?11:12
break
case 11:a1=B.a.gD(a0)
j=a1.a
d=f.x
c=k3.d
a2=0
case 13:if(a2<4){a3=d.i(0,k4)
a3.toString
a4=k.i(0,"maxLevel")
a4.toString
a4=a3<B.b.k(a4)
a3=a4}else a3=!1
if(!a3){p=14
break}if(!f.aK(k3,a1)||f.d<f.a5(!0).a){p=14
break}B.a.m(e,new A.y(B.m,j,k4,null,0,B.d))
a3=f.L(k4)
a4=d.i(0,k4)
if(a4==null)a4=c
p=a3<=a4?15:16
break
case 15:p=17
return l0.b=s.aB(r,q,f,e,"\u4f18\u5148\u7531\u9ad8\u5185\u653f\u5c06\u9886\u5347\u7ea7\uff0c\u4fdd\u62a4\u771f\u5b9e\u8fce\u6218\u540d\u989d"),1
case 17:a3=s.a4(r,f)
if((a3==null?null:a3.a)===B.h||k5){p=14
break}case 16:++a2
p=13
break
case 14:case 12:case 10:p=k5?18:19
break
case 18:j=q.u(k4)
d=A.f(j)
c=d.h("b<1>")
a5=A.m(new A.b(j,d.h("e(1)").a(new A.fz()),c),c.h("a.E"))
B.a.A(a5,new A.fK())
j=A.f(a5),d=A.a_(a5,0,A.Y(3,"count",t.S),j.c),c=d.$ti,d=new A.o(d,d.gl(0),c.h("o<k.E>")),a3=k3.cy,a4=k3.ax,a6=k3.d,a7=t.T,a8=t.w,a9=t.e,b0=j.h("e(1)"),j=j.h("b<1>"),c=c.h("k.E")
case 20:if(!d.j()){p=21
break}b1=d.d
if(b1==null)b1=c.a(b1)
if(!k7.X()){p=21
break}b2=q.N()
e=A.d([],a8)
b3=A.d([b1],a9)
B.a.F(b3,new A.b(a5,b0.a(new A.fV(b1)),j))
b1=b3.length,b4=b2.x,b5=0
case 22:if(!(b5<b3.length)){p=24
break}b6=b3[b5]
b7=b2.L(k4)
if(m){b8=b4.i(0,k4)
if(b8==null)b8=a6}else{b8=a3?1:0
b8=B.c.v(k8-a4-b8,0,5)}if(b7<=b8){p=24
break}if(!b2.bl(b6)){p=23
break}B.a.m(e,new A.y(B.v,b6.a,null,null,0,B.d))
p=m?25:26
break
case 25:b9=b2.N()
c0=A.m(e,a7)
b7=b9.u(k4)
b8=A.f(b7)
c1=b8.h("b<1>")
a0=A.m(new A.b(b7,b8.h("e(1)").a(new A.fX()),c1),c1.h("a.E"))
B.a.A(a0,new A.fY())
p=a0.length!==0?27:28
break
case 27:b7=b9.x
c2=0
for(;;){if(c2<3){b8=b9.L(k4)
c1=b7.i(0,k4)
if(c1==null)c1=a6
c1=b8>c1
b8=c1}else b8=!1
if(!b8)break
if(!b9.aK(k3,B.a.gD(a0)))break
B.a.m(c0,new A.y(B.m,B.a.gD(a0).a,k4,null,0,B.d));++c2}b8=b9.L(k4)
b7=b7.i(0,k4)
if(b7==null)b7=a6
p=b8<=b7&&b9.d>=b9.a5(!0).a?29:30
break
case 29:p=31
return l0.b=s.aB(r,q,b9,c0,"\u5148\u89e3\u96c7\u4f4e\u4ea4\u6362\u4ef7\u503c\u6321\u4f4d\u8005\u7b79\u8d44\uff0c\u4fdd\u7559\u4e3b\u6301\u8005\u5b8c\u6210\u6551\u57ce\u5347\u7ea7"),1
case 31:case 30:case 28:case 26:case 23:b3.length===b1||(0,A.v)(b3),++b5
p=22
break
case 24:b1=b2.L(k4)
if(m){b3=b4.i(0,k4)
if(b3==null)b3=a6}else{b3=a3?1:0
b3=B.c.v(k8-a4-b3,0,5)}p=b1<=b3?32:33
break
case 32:p=34
return l0.b=s.aB(r,q,b2,e,"\u6ca1\u6709\u53ef\u652f\u4ed8\u4e14\u53ca\u65f6\u7684\u5347\u7ea7\u65b9\u6848\uff0c\u6e05\u51fa\u6321\u4f4d\u5b88\u5c06\u5e76\u4fdd\u7559\u6838\u5fc3\u51fa\u573a"),1
case 34:case 33:p=20
break
case 21:case 19:j=q.u(k4)
d=A.f(j)
c=d.h("b<1>")
c3=A.m(new A.b(j,d.h("e(1)").a(new A.fZ(q)),c),c.h("a.E"))
B.a.A(c3,new A.h_())
if(k9){k9=r.f
k9=(k9==null?null:k9.a)!==B.h}else k9=!0
p=k9&&s.a.Q.gM().gl(0)>1?35:36
break
case 35:c4=q.N()
k9=r.f
if((k9==null?null:k9.a)===B.r)c4.ax.m(0,k4)
c5=A.d([],k6)
k9=s.a.Q
j=k9.gM()
d=j.$ti
c=d.h("b<a.E>")
c6=A.m(new A.b(j,d.h("e(a.E)").a(new A.h0(k3)),c),c.h("a.E"))
B.a.A(c6,new A.h1(k3))
j=A.a_(c3,0,A.Y(l.w.fy,"count",t.S),A.f(c3).c),d=j.$ti,j=new A.o(j,j.gl(0),d.h("o<k.E>")),c=k3.cy,a3=k3.ax,a4=A.f(c6),a6=a4.c,a4=a4.h("u<1>"),a7=a4.h("o<k.E>"),a8=s.e,a9=a8.c,b0=s.f,b1=a4.h("k.E"),d=d.h("k.E"),b3=k3.d,b4=t.W,b7=t.E,b8=t.i,c1=t.I
case 37:if(!j.j()){p=38
break}c7=j.d
if(c7==null)c7=d.a(c7)
if(!k7.X()){p=38
break}c8=new A.u(c6,0,4,a4)
c8.S(c6,0,4,a6)
c8=new A.o(c8,c8.gl(0),a7)
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
d6=B.c.v(d5-d2-d6,0,5)
d2=d6}if(d4>=d2)continue
d7=a9.al(c7,d1.e,k9,!0,d1)
d2=k5?"transfer":"evacuate"
d8=a8.b0(c4,c7,d7,!0,r.ga9(),!0,"\u5728\u539f\u57ce\u5371\u9669\u7a97\u53e3\u524d\u8fdb\u9a7b\u5b89\u5168\u53cb\u57ce\uff0c\u6539\u53d8\u6240\u5c5e\u57ce\u4ee5\u4fdd\u5168\u5c06\u9886",d2,d1)
if(d8!=null)d1=d0==null||d8.a.d>d0.a.d
else d1=!1
if(d1)d0=d8}if(d0==null){p=37
break}c4=d0.a
B.a.m(c5,d0.b)
c7=c4.L(k4)
if(m){c8=c4.x.i(0,k4)
if(c8==null)c8=b3}else{c8=c?1:0
c8=B.c.v(k8-a3-c8,0,5)}p=c7<=c8?39:40
break
case 39:d9=new A.aT(c5,b4.a(new A.fA()),b7).G(0,0,new A.fB(s),b8)
c7=c4.N()
c8=A.m(c5,c1)
c9=s.a8(r,c4)
d1=isFinite(r.ga9())?"\u5b89\u5168\u5224\u65ad\u4ee5\u5b9e\u9645\u8fdb\u9a7b\u53cb\u57ce\u4e3a\u51c6\uff0c\u9014\u4e2d\u539f\u57ce\u5931\u5b88\u4ecd\u4f1a\u6e05\u9664\u90e8\u961f":"\u8f6c\u79fb\u5230\u5b89\u5168\u540e\u65b9\u6574\u5907"
p=41
return l0.b=new A.a7(c7,c8,c9+d9*0.65,!1,d1,"relocation"),1
case 41:if(k5){p=38
break}case 40:p=37
break
case 38:case 36:e0=s.cH(r,q)
e1=new A.h2(s,q)
k9=s.a.Q
j=k9.r
d=A.f(j)
c=d.h("b<1>")
e2=A.m(new A.b(j,d.h("e(1)").a(new A.fC(s,q,e1,e0)),c),c.h("a.E"))
B.a.A(e2,new A.fD(e1,k3))
j=r.d
d=j.length===0?0:l.w.fy
c=t.S
d=A.a_(e2,0,A.Y(d,"count",c),A.f(e2).c)
a3=d.$ti
d=new A.o(d,d.gl(0),a3.h("o<k.E>"))
a4=s.e
a6=s.d
a7=a4.c
a8=a7.a
a9=q.y
b0=!e0
b1=s.f
a3=a3.h("k.E")
b3=k3.cy
b4=k3.ax
b7=k3.d
b8=q.x
c1=r.f
c7=A.f(j)
c8=c7.h("p(1)")
c9=c7.h("Q<1,p>")
d1=k3.e
d2=c7.c
c7=c7.h("u<1>")
d4=c7.h("o<k.E>")
d5=c7.h("k.E")
d6=c1==null
case 42:if(!d.j()){p=43
break}e3=d.d
if(e3==null)e3=a3.a(e3)
if(!k7.X()){p=43
break}e4=e3.c
e5=b1.i(0,e4)
e6=r.ga9()
e7=e5==null
if(e7)e8=null
else e8=e5.d.length!==0||e5.a.at!=null
e8=e8===!0?e5.ga9():1/0
e9=Math.min(e6,e8)
e6=!1
if(!e1.$1(e3)||e0){e8=s.a4(r,q)
if((e8==null?null:e8.a)!==B.h){e6=q.L(k4)
if(m){e8=b8.i(0,k4)
if(e8==null)e8=b7}else{e8=b3?1:0
e8=B.c.v(k8-b4-e8,0,5)}e8=e6<e8
e6=e8}}p=e6?44:45
break
case 44:f0=new A.Q(j,c8.a(new A.fE()),c9).ae(0,new A.fF(s))
if(m){e6=b8.i(0,k4)
if(e6==null)e6=b7}else{e6=b3?1:0
e6=B.c.v(k8-b4-e6,0,5)}e8=k.i(0,"soldierLimit")
e8.toString
f1=a6.bk(e3,f0,f0.ok,e6,!1,Math.min(B.b.k(e8),q.e+e3.gP()))
e6=d6?null:c1.b
if(e6==null)e6=-1
p=f1.b>e6+0.05?46:47
break
case 46:d7=a7.al(e3,d1,k9,!0,k3)
if(m){e6=b8.i(0,k4)
if(e6==null)e6=b7}else{e6=b3?1:0
e6=B.c.v(k8-b4-e6,0,5)}e8=s.a4(r,q)
e8=e8==null?null:e8.b
d8=a4.b0(q,e3,d7,!0,e9,!0,"\u672c\u5730\u62b5\u6297\u4ecd\u6709\u7f3a\u53e3\uff08\u57ce\u9632"+e6+"\u7ea7\uff0c\u9632\u5b88\u4f59\u91cf"+B.b.bt((e8==null?-1:e8)*100)+"\u70b9\uff09\uff0c\u63f4\u519b\u7ea6"+B.b.aZ(d7.b,1)+"\u79d2\u5230\u8fbe\uff0c\u5371\u9669\u7a97\u53e3"+B.b.aZ(e9,1)+"\u79d2\uff0c\u9884\u7559\u5165\u57ce\u540d\u989d","rescue",k3)
if(d8!=null){e6=s.a4(r,d8.a)
e6=(e6==null?null:e6.a)===B.h}else e6=!1
p=e6?48:49
break
case 48:e6=d8.a
p=50
return l0.b=new A.a7(e6,A.d([d8.b],k6),s.a8(r,e6)-A.a4(e3)*0.08,!1,"","recall"),1
case 50:case 49:case 47:case 45:e6=new A.u(j,0,2,c7)
e6.S(j,0,2,d2)
e6=new A.o(e6,e6.gl(0),d4)
e8=e3.ok
e4=e4!==k4
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
d7=a4.bn(e3,f4,q)
if(a6.d3(e3,f4,f4.ok,e8,a8.bh(f4.z)).a!==B.h){p=51
break}f6=e1.$1(e3)?"\u672c\u5730\u624b\u6bb5\u65e0\u6cd5\u62b5\u6321\u660e\u786e\u6765\u88ad\uff0c\u7d27\u6025\u622a\u51fb\u9884\u8ba1"+B.b.aZ(d7.b,1)+"\u79d2\uff0c\u65e9\u4e8e\u654c\u519b"+B.b.aZ(f3.b,1)+"\u79d2\u62b5\u57ce\uff1b\u6700\u540e\u624d\u6539\u6d3e\u8fdc\u5f81":"\u52a8\u7528\u9644\u8fd1\u95f2\u7f6e\u90e8\u961f\u622a\u51fb\u6765\u654c\uff0c\u4e0d\u6253\u65ad\u4e3b\u653b\u4efb\u52a1"
d8=a4.cp(q,e3,d7,f3.b,!0,f4,f6,"intercept",k3)
p=d8!=null?53:54
break
case 53:f3=d8.a
p=55
return l0.b=new A.a7(f3,A.d([d8.b],k6),s.a8(r,f3)+80-A.a4(e3)*0.08,k5,"","recall"),1
case 55:case 54:p=51
break
case 52:p=42
break
case 43:d=A.f(c3)
a3=d.h("b<1>")
f7=A.m(new A.b(c3,d.h("e(1)").a(new A.fG(s)),a3),a3.h("a.E"))
B.a.A(f7,new A.fH(s,q,k3))
if(c3.length>1){d=s.a4(r,q)
f8=(d==null?null:d.a)!==B.h}else f8=!1
d=A.a_(j,0,A.Y(2,"count",c),d2),c=d.$ti,d=new A.o(d,d.gl(0),c.h("o<k.E>")),a3=A.f(f7),a9=a3.c,a3=a3.h("u<1>"),b0=a3.h("o<k.E>"),b1=t.a,b8=t.H,c7=t.N,c8=t.dg,c9=t.cO,d1=t.Y,d2=t.T,d4=l.w,d5=d4.R8,e3=d4.p4,e4=t.p,l=l.r,e6=t.fR,e7=t.w,e8=t.e,f2=t.eV,f3=a3.h("k.E"),d4=d4.d,c=c.h("k.E")
case 56:if(!d.j()){p=57
break}f4=d.d
if(f4==null)f4=c.a(f4)
if(!f8||f4.a.k1!=null||s.bH(f4,q)){p=56
break}f6=new A.u(f7,0,4,a3)
f6.S(f7,0,4,a9)
f6=new A.o(f6,f6.gl(0),b0)
f9=f4.a
f4=f4.b
g0=f9.z
g1=f9.ok
g2=f9.p1
case 58:if(!f6.j()){p=59
break}g3=f6.d
if(g3==null)g3=f3.a(g3)
if(!k7.X()){p=59
break}g4=q.u(k4)
g5=A.f(g4)
g6=g5.h("b<1>")
g7=A.m(new A.b(g4,g5.h("e(1)").a(new A.fI(g3)),g6),g6.h("a.E"))
if(g7.length===0){p=58
break}g8=B.a.ae(g7,new A.fJ(s,q,k3))
d7=a4.bn(g3,f9,q)
if(!d7.d||d7.b+d4>=f4){p=58
break}g9=A.d([new A.aZ(q,A.d([],e7),A.d([],e8))],f2)
if(k5){g4=q.d
g5=k.i(0,"emergencyGold")
g5.toString
g5=g4<B.b.k(g5)+4
g4=g5}else g4=!1
if(g4){g4=A.f(g7)
g5=g4.h("b<1>")
h0=A.m(new A.b(g7,g4.h("e(1)").a(new A.fL(g8)),g5),g5.h("a.E"))
B.a.A(h0,new A.fM())
if(h0.length!==0&&k7.X()){b9=q.N()
if(b9.bl(B.a.gD(h0)))B.a.m(g9,new A.aZ(b9,A.d([new A.y(B.v,B.a.gD(h0).a,null,null,0,B.d)],e7),A.d([B.a.gD(h0)],e8)))}}if(m){g4=q.u(k4)
g5=A.f(g4)
g6=g5.h("b<1>")
a0=A.m(new A.b(g4,g5.h("e(1)").a(new A.fN()),g6),g6.h("a.E"))
B.a.A(a0,new A.fO())
f=q.N()
if(a0.length!==0&&f.aK(k3,B.a.gD(a0))&&f.d>=f.a5(!0).a)B.a.m(g9,new A.aZ(f,A.d([new A.y(B.m,B.a.gD(a0).a,k4,null,0,B.d)],e7),A.d([],e8)))}g4=A.m(g9,e6)
g5=g4.length
b5=0
for(;b5<g4.length;g4.length===g5||(0,A.v)(g4),++b5){h1=g4[b5]
h=h1.a.N()
if(m){g6=h.x.i(0,k4)
if(g6==null)g6=b7}else{g6=b3?1:0
g6=B.c.v(k8-b4-g6,0,5)}h2=Math.min(g6,h.u(k4).length-1)
g6=h.f
h3=k.i(0,"soldierLimit")
h3.toString
h4=Math.min(g6,(h2+1)*B.b.k(h3))-h.e
if(h4>0&&h.aC(h4)&&h.d>=h.a5(!0).a){g6=A.m(h1.b,d2)
g6.push(new A.y(B.n,null,k4,null,h4,B.d))
B.a.m(g9,new A.aZ(h,g6,h1.c))}}g4=g9.length,g5=g3.w<=e3,g6=g3.f,h3=g8===null,h5=!h3,b5=0
case 60:if(!(b5<g9.length)){p=62
break}h6=g9[b5]
h7=h6.a
h8=l.gaL()
h9=A.l(h8)
i0=h9.h("b<a.E>")
i1=A.m(new A.b(h8,h9.h("e(a.E)").a(new A.fP(s,h7)),i0),i0.h("a.E"))
B.a.A(i1,new A.fQ())
h8=A.d([],e4)
if(i1.length!==0)h8.push(A.d([B.a.gD(i1).a],b1))
h8.push(A.d([],b1))
h9=h8.length
i0=h6.c
i2=J.aD(i0)
i3=h6.b
i4=J.aD(i3)
i5=h7.x
i6=0
case 63:if(!(i6<h8.length)){p=65
break}i7=h8[i6]
i8=a8.bh(g0)
i9=k.i(0,"soldierLimit")
i9.toString
f1=a6.d7(g3,f9,g1,i7,!0,Math.min(B.b.k(i9),h7.e),i8)
j0=f1.a===B.h
i8=!j0
i9=!1
if(i8)if(B.a.ga_(i7))if(h5)if(g1)if(g2){i9=k.i(0,"soldierHp")
i9.toString
i9=f1.f>=B.b.k(i9)}if(i9){if(m){i9=i5.i(0,k4)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.v(k8-b4-i9,0,5)}j1=k.i(0,"soldierLimit")
j1.toString
j2=a6.bj(g8,f9,i9,B.b.k(j1))
if(m){i9=i5.i(0,k4)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.v(k8-b4-i9,0,5)}j1=k.i(0,"soldierLimit")
j1.toString
j3=a6.d6(g8,f9,B.d,!1,i9,B.b.k(j1)).b-j2.b
if(j3>=d5)if(!j2.r){i9=(d6?null:c1.a)===B.r
j0=i9}else j0=!0
else j0=!1
j4=!1}else{j4=j0
j3=0}i9=!1
if(!j0)if(g5)if(h5)if(f1.d>0){i9=k.i(0,"soldierLimit")
i9.toString
i9=Math.min(B.b.k(i9),h7.e)
j1=k.i(0,"soldierHp")
j1.toString
j1=f1.f<g6+i9*B.b.k(j1)
i9=j1}if(i9){i9=h7.u(k4)
j1=A.f(i9)
j5=j1.h("b<1>")
i9=A.m(new A.b(i9,j1.h("e(1)").a(new A.fR(g3)),j5),j5.h("a.E"))
j0=!1
j1=A.f(i9).h("L<1>")
i9=new A.L(i9,j1)
if(m){j5=i5.i(0,k4)
if(j5==null)j5=b7}else{j5=b3?1:0
j5=B.c.v(k8-b4-j5,0,5)}j6=new A.u(i9,0,j5,j1.h("u<k.E>"))
j6.S(i9,0,j5,j1.h("k.E"))
j7=B.a.dk(j6.af(0),new A.fS(g8))
if(j7<0){p=64
break}i9=h7.e
j1=k.i(0,"soldierLimit")
j1.toString
j8=Math.max(0,i9-(j7+1)*B.b.k(j1))
if(m){i9=i5.i(0,k4)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.v(k8-b4-i9,0,5)}j1=k.i(0,"soldierLimit")
j1.toString
j2=a6.bj(g8,f9,i9,Math.min(B.b.k(j1),j8))
if(m){i9=i5.i(0,k4)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.v(k8-b4-i9,0,5)}j1=k.i(0,"soldierLimit")
j1.toString
j5=f1.d
j9=a6.d4(g8,f9,j5,i9,Math.min(B.b.k(j1),j8))
j3=j9.b-j2.b
j4=j9.a===B.h
i9=k.i(0,"soldierHp")
i9.toString
if(j5>=B.b.k(i9))if(j3>=d5){if(!j4)i9=(d6?null:c1.a)!==B.h
else i9=!0
j0=i9}}if(!j0){p=64
break}if(g7.length===0)i8=j.length>1||i8
else i8=!1
if(i8){p=64
break}if(B.a.ga_(i7)&&j3>0)i8="\u4f4e\u653b\u51fb\u4e14\u975e\u9ad8\u5185\u653f\u5c06\u9886\u51fa\u57ce\u5438\u6536\u6765\u654c\u5f00\u573a\u6b66\u5668\uff0c\u4fdd\u7559\u4e3b\u529b\u548c\u57ce\u9632\uff0c\u7b49\u5f85\u5b9e\u9645\u6218\u679c\u518d\u590d\u6838"
else i8=j3>0?"\u4f4e\u653b\u51fb\u5c06\u9886\u643a\u4e00\u4ef6\u5f3a\u6b66\u5668\u6d88\u8017\u6765\u654c\uff0c\u4fdd\u7559\u9ad8\u653b\u51fb\u5b88\u5c06\u4e0e\u57ce\u9632\u63a5\u6218":"\u4f4e\u653b\u51fb\u4f59\u5c06\u643a\u5f53\u524d\u6700\u5f3a\u6b66\u5668\u8fce\u6218\uff0c\u4fdd\u7559\u57ce\u5185\u4e3b\u529b\u63a5\u654c"
i9=j3>0
if(h3)j1=0
else{j1=k.i(0,"soldierLimit")
j1.toString
j1=Math.min(B.b.k(j1),h7.e)}d8=a4.ck(h7,g3,d7,i9,f4,!0,f9,i7,j1,i8,"intercept",k3)
if(d8==null){p=64
break}i8=d8.a
k0=i8.L(k4)
j1=d8.b
j5=A.m(i3,d2)
B.a.F(j5,j1.b)
j6=A.jC(c7,c7)
j6.F(0,j1.c)
j6.F(0,a4.aa(new A.bA(i4.aH(i3,new A.fT(s),c8),c9),A.d([],d1)))
j1=A.d([new A.E(j1.a,j5,j6,j1.d,j1.e,!0)],k6)
j6=s.a8(r,i8)
j5=Math.max(0,q.d-i8.d)
i9=i9?A.a4(g3)*0.5:0
k1=i2.G(i0,0,new A.fU(),b8)
if(m){k2=i8.x.i(0,k4)
if(k2==null)k2=b7}else{k2=b3?1:0
k2=B.c.v(k8-b4-k2,0,5)}k2=k0>k2||!j4
p=66
return l0.b=new A.a7(i8,j1,j6+200+j3*500-j5*0.25-i9-k1,k2,"","local"),1
case 66:case 64:h8.length===h9||(0,A.v)(h8),++i6
p=63
break
case 65:case 61:g9.length===g4||(0,A.v)(g9),++b5
p=60
break
case 62:p=58
break
case 59:p=56
break
case 57:if(k9.gM().gl(0)===1)l=(d6?null:c1.a)===B.r&&c3.length>1
else l=!1
p=l?67:68
break
case 67:l=k9.f,k=A.f(l),j=k.h("b<1>"),j=A.jG(new A.b(l,k.h("e(1)").a(new A.fW(s)),j),3,j.h("a.E")),k=j.a,j=new A.bc(k.gC(k),j.b,A.l(j).h("bc<1>"))
case 69:if(!j.j()){p=70
break}l=j.gp()
if(!k7.X()){p=70
break}b6=B.a.gD(c3)
d8=a4.cm(q,b6,a7.al(b6,l.e,k9,!0,l),r.ga9(),!0,"\u4fdd\u7559\u539f\u57ce\u5b88\u519b\u62d6\u5ef6\uff0c\u6838\u5fc3\u5728\u5371\u9669\u7a97\u53e3\u524d\u593a\u53d6\u7a7a\u57ce\u5efa\u7acb\u65b0\u636e\u70b9","newBase",l)
p=d8!=null?71:72
break
case 71:l=d8.a
k=A.d([d8.b],k6)
d=s.a8(r,l)
c=A.a4(b6)
a3=l.L(k4)
if(m){a6=l.x.i(0,k4)
if(a6==null)a6=b7}else{a6=b3?1:0
a6=B.c.v(k8-b4-a6,0,5)}p=73
return l0.b=new A.a7(l,k,d+c*1.2,a3>a6,"","relocation"),1
case 73:case 72:p=69
break
case 70:case 68:case 1:return 0
case 2:return l0.c=n.at(-1),3}}}},
aB(a,b,c,d,e){var s,r,q,p,o,n,m=this
t.f3.a(d)
s=A.f(d)
r=s.h("p?(1)").a(new A.h8(m))
q=c.z.dg(b.z).G(0,0,new A.h9(m),t.i)
p=c.N()
o=A.m(d,t.T)
s=A.m(new A.bA(new A.Q(d,r,s.h("Q<1,p?>")),t.cO),t.r)
r=a.d
n=A.f(r)
B.a.F(s,new A.Q(r,n.h("p(1)").a(new A.ha()),n.h("Q<1,p>")))
n=a.a
s=A.d([new A.E(e,o,m.e.aa(s,A.d([n],t.Y)),B.q,c.a5(!0).a,!0)],t.Z)
o=m.a8(a,c)
r=Math.max(0,b.d-c.d)
if(c.L(n.a)<=c.O(n)){n=m.a4(a,c)
n=(n==null?null:n.a)!==B.h}else n=!0
return new A.a7(p,s,o-q*0.65-r*0.2,n,"","local")},
bH(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=b.y,s=new A.ai(s,s.r,s.e,A.l(s).h("ai<2>")),r=this.e,q=a.a,p=q.a,o=this.a.Q,n=o.b,m=b.z,l=this.b.w.d,k=a.b;s.j();){j=s.d
if(j.b!=="intercept"||j.r!==p||j.y<=n)continue
i=o.Z(j.a)
if(i==null||i.f<=0||i.fy||m.n(0,i.a))continue
if(i.k1===p)return!0
if(!i.dx||j.z<=n)continue
h=r.bn(i,q,b)
if(h.d&&h.b+l<k)return!0}return!1},
cH(a,b){var s,r
if(this.c.e)return!1
s=a.a
if(!(s.at!=null||B.a.K(a.d,new A.h3())))return!1
if(b.u(s.a).length===0)return!0
r=this.a4(a,b)
return r!=null&&r.c<-this.b.w.p3},
a4(b3,b4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1=null,b2=b3.d
if(b2.length===0)return b1
s=b3.a
r=s.a
q=b4.u(r)
p=b4.e
for(o=b4.y,o=new A.ai(o,o.r,o.e,A.l(o).h("ai<2>")),n=t.N,m=t.z,l=t.n,k=b0.e.c,j=b0.a.Q,i=j.b,h=b4.z,g=b0.b,f=g.w.d;o.j();){e=o.d
if(!e.as||e.d!==r||e.y<i)continue
d=j.Z(e.a)
if(d==null||d.fy||d.k1!=null||d.f<=0||h.n(0,d.a)||B.a.K(q,new A.h4(d)))continue
c=d.z
for(e=J.k2(e.w,e.x),b=e.$ti,e=new A.o(e,e.gl(0),b.h("o<k.E>")),b=b.h("k.E"),a=0;e.j();c=a1){a0=e.d
a1=a0==null?b.a(a0):a0
a+=k.W(c,a1)}if(!isFinite(a)||a+f>=b3.ga9())continue
p=Math.min(b4.f,p+d.gP())
e=A.as(d.J(),n,m)
e.B(0,"hp",d.r)
e.B(0,"troops",A.d([],l))
e.B(0,"s",0)
B.a.m(q,A.k3(e))}B.a.A(q,new A.h5())
o=A.f(q)
n=t.r
a2=A.aI(new A.b(q,o.h("e(1)").a(new A.h6(b3)),o.h("b<1>")),n)
m=A.d([],t.e)
if(a2!=null)m.push(a2)
o=o.h("L<1>")
B.a.F(m,new A.L(q,o).bz(0,o.h("e(k.E)").a(new A.h7(a2))))
a3=A.a_(m,0,A.Y(b4.O(s),"count",t.S),n).af(0)
if(a3.length===0)return b1
for(o=b0.d,n=s.d,m=b4.x,g=g.b,l=s.cy,k=s.ax,s=s.at,j=s==null,a4=b1,a5=0;a5<a3.length;++a5){d=a3[a5]
if(d.as===B.e)a6=0
else{i=g.i(0,"soldierLimit")
i.toString
a6=Math.min(p,B.b.k(i)-d.gP())}p-=a6
for(i=b2.length,a7=b1,a8=0;a8<b2.length;b2.length===i||(0,A.v)(b2),++a8){h=b2[a8].a
if(j){f=m.i(0,r)
if(f==null)f=n}else{f=l?1:0
f=B.c.v(s-k-f,0,5)}a9=o.bk(d,h,h.ok,Math.max(1,f-a5),!1,d.gP()+a6)
if(a7==null||a9.b<a7.b)a7=a9}if(a4==null||a7.b>a4.b)a4=a7}return a4},
a8(a,b){var s=a.a,r=b.L(s.a),q=Math.max(0,r-b.O(s)),p=this.a.Q.gM().gl(0)===1?400:0,o=150+s.r*4+a.r*0.5+p,n=this.a4(a,b)
s=r===0?o*2:0
p=n==null?null:n.b
if(p==null)p=-0.8
return-q*5000-s+p*o}}
A.hg.prototype={
$1(a){return this.a.bH(t.O.a(a),this.b)},
$S:10}
A.hh.prototype={
$1(a){t.J.a(a)
return a.f&&B.a.K(this.a.d,new A.hf(a))},
$S:11}
A.hf.prototype={
$1(a){return t.O.a(a).a.a===this.a.r},
$S:10}
A.hi.prototype={
$1(a){var s,r,q,p,o,n=this
t.cs.a(a)
s=!1
if(a.f==="local"){r=a.b
if(r.length!==0)if(B.a.K(r,new A.hd())){q=a.a
p=n.b
o=p.a
if(q.L(o.a)<=q.O(o)){s=n.a
q=s.a4(p,q)
q=q==null?null:q.b
if(q==null)q=-1
o=n.c
o=o==null?null:o.b
s=(q>(o==null?-1:o)+0.04||B.a.K(r,new A.he()))&&a.c>s.a8(p,n.d)}}}return s},
$S:43}
A.hd.prototype={
$1(a){return B.a.K(t.I.a(a).b,new A.hc())},
$S:26}
A.hc.prototype={
$1(a){var s=t.T.a(a).a
return s===B.m||s===B.n||s===B.D},
$S:27}
A.he.prototype={
$1(a){return B.a.K(t.I.a(a).d,new A.hb())},
$S:26}
A.hb.prototype={
$1(a){return t.J.a(a).b==="intercept"},
$S:11}
A.fx.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.fy.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fz.prototype={
$1(a){t.r.a(a)
return a.dy&&a.e!==2},
$S:0}
A.fK.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.a4(a),A.a4(b))},
$S:2}
A.fV.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fX.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.fY.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fZ.prototype={
$1(a){t.r.a(a)
return a.db&&!this.a.as.n(0,a.a)},
$S:0}
A.h_.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.a4(s.a(b)),A.a4(a))},
$S:2}
A.h0.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:1}
A.h1.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.E(s),b.e.E(s))},
$S:4}
A.fA.prototype={
$1(a){return t.I.a(a).d},
$S:30}
A.fB.prototype={
$2(a,b){var s
A.an(a)
s=this.a.a.Q.Z(t.J.a(b).a)
s.toString
return a+A.a4(s)},
$S:70}
A.h2.prototype={
$1(a){var s,r,q=this.a.a.Q,p=this.b
if(A.jS(a,q,p)==null){p=p.y
s=a.a
r=p.i(0,s)
if((r==null?null:r.b)==="intercept"){p=p.i(0,s)
q=q.Z(p==null?null:p.r)
q=q==null?null:q.f
q=(q==null?0:q)>0}else q=!1}else q=!0
return q},
$S:0}
A.fC.prototype={
$1(a){var s,r,q,p,o=this
t.r.a(a)
s=!1
if(a.b===o.a.a.Q.a)if(a.dx)if(!a.fy){r=o.b
q=a.a
p=r.y.i(0,q)
if((p==null?null:p.as)!==!0)if(!r.as.n(0,q))s=!o.c.$1(a)||o.d}return s},
$S:0}
A.fD.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a
if(!J.af(s.$1(a),s.$1(b)))return s.$1(a)?1:-1
s=this.b.e
return B.b.t(a.z.E(s),b.z.E(s))},
$S:2}
A.fE.prototype={
$1(a){return t.O.a(a).a},
$S:29}
A.fF.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.kS(a,s)>A.kS(b,s)?a:b},
$S:14}
A.fG.prototype={
$1(a){t.r.a(a)
return a.w<=this.a.b.w.p4&&a.x<15},
$S:0}
A.fH.prototype={
$2(a,b){var s,r,q,p=t.r
p.a(a)
p.a(b)
p=this.a.b
s=p.w.p4
r=a.w<=s
if(r!==b.w<=s)return r?-1:1
s=this.b
q=this.c
return B.b.t(A.du(a,p,s.O(q),4),A.du(b,p,s.O(q),4))},
$S:2}
A.fI.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fJ.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a.b
s=this.b
r=this.c
return A.du(a,q,s.O(r),4)>A.du(b,q,s.O(r),4)?a:b},
$S:14}
A.fL.prototype={
$1(a){t.r.a(a)
return a!==this.a&&a.dy&&a.e!==2},
$S:0}
A.fM.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.a4(a),A.a4(b))},
$S:2}
A.fN.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.fO.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fP.prototype={
$1(a){var s
t.o.a(a)
s=this.b.w.i(0,a.a)
if((s==null?0:s)<=0)s=a.f&&this.a.a.Q.c>=a.e
else s=!0
return s},
$S:18}
A.fQ.prototype={
$2(a,b){var s=t.o
s.a(a)
return B.c.t(s.a(b).c,a.c)},
$S:19}
A.fR.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fS.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fT.prototype={
$1(a){return this.a.a.Q.Z(t.T.a(a).b)},
$S:31}
A.fU.prototype={
$2(a,b){return A.z(a)+A.a4(t.r.a(b))*0.65},
$S:52}
A.fW.prototype={
$1(a){var s
t.q.a(a)
s=this.a.a.Q
return a.b!==s.a&&s.u(a.a).length===0},
$S:1}
A.h8.prototype={
$1(a){return this.a.a.Q.Z(t.T.a(a).b)},
$S:31}
A.h9.prototype={
$2(a,b){var s
A.an(a)
s=this.a.a.Q.Z(A.J(b))
s.toString
return a+A.a4(s)},
$S:53}
A.ha.prototype={
$1(a){return t.O.a(a).a},
$S:29}
A.h3.prototype={
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
A.h4.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.h5.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.h6.prototype={
$1(a){return t.r.a(a).a===this.a.a.ch},
$S:0}
A.h7.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.w.prototype={
J(){return A.d([this.a,this.b],t.n)},
E(a){var s=this.a-a.a,r=this.b-a.b
return Math.sqrt(s*s+r*r)},
aG(a,b){var s=this.a,r=this.b
return new A.w(s+(a.a-s)*b,r+(a.b-r)*b)}}
A.ek.prototype={
a0(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this.a,f=B.a.gD(g)
for(s=a.a,r=a.b,q=1/0,p=0;o=g.length,p<o;){n=g[p];++p
m=g[p%o]
o=n.a
l=m.a-o
k=n.b
j=m.b-k
i=n.aG(m,B.b.v(((s-o)*l+(r-k)*j)/(l*l+j*j),0,1))
h=i.E(a)
if(h<q){q=h
f=i}}return f},
n(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(this.a0(b).E(b)<1e-7)return!0
for(s=this.a,r=s.length,q=b.b,p=b.a,o=!1,n=0;n<r;){m=s[n];++n
l=s[n%r]
k=m.b
j=l.b
if(k>q!==j>q){i=m.a
i=p<(l.a-i)*(q-k)/(j-k)+i
k=i}else k=!1
if(k)o=!o}return o},
c6(a,b){var s
if(this.n(0,a))return null
s=this.c3(a,b)
return s.length===0?null:B.a.ae(s,B.A)},
c3(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.a,g=b.a-h,f=a.b,e=b.b-f,d=A.d([],t.n)
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
if(j>=-1e-7&&j<=1.0000001&&i>=-1e-7&&i<=1.0000001)B.a.m(d,B.b.v(j,0,1))}return d},
bX(a,b){var s,r=this
if(r.n(0,a))return r.a0(a)
s=r.c6(a,b)
return s==null?r.a0(a):a.aG(b,s)},
c4(a,b){var s=a.E(b),r=s<1e-7?new A.w(a.a+4096,a.b+0):a.aG(b,4096/s),q=this.c3(a,r)
return q.length===0?this.a0(b):a.aG(r,B.a.ae(q,B.z))}}
A.ak.prototype={
aQ(){return"AiArmyState."+this.b}}
A.p.prototype={
gP(){var s=this.at,r=A.f(s)
return new A.b(s,r.h("e(1)").a(new A.dx()),r.h("b<1>")).gl(0)},
gbm(){return this.f+B.a.G(this.at,0,new A.dw(),t.H)},
J(){var s,r,q,p,o,n,m,l=this,k=l.z,j=t.n
k=A.d([k.a,k.b],j)
s=l.Q
s=A.d([s.a,s.b],j)
r=l.CW
r=r==null?null:A.d([r.a,r.b],j)
q=A.d([],t.b)
for(p=l.p2,o=p.length,n=0;n<p.length;p.length===o||(0,A.v)(p),++n){m=p[n]
q.push(A.d([m.a,m.b],j))}return A.T(["id",l.a,"c",l.b,"home",l.c,"o",l.d,"t",l.e,"hp",l.f,"max",l.r,"a",l.w,"p",l.x,"pay",l.y,"xy",k,"v",s,"s",l.as.a,"troops",l.at,"w",l.ax,"m",l.ay,"due",l.ch,"to",r,"target",l.cx,"return",l.cy,"dispatch",l.db,"move",l.dx,"dismiss",l.dy,"upgrade",l.fr,"retreat",l.fx,"marked",l.fy,"rev",l.go,"orderRev",l.id,"opponent",l.k1,"clashes",l.k2,"received",l.k3,"dealt",l.k4,"opening",l.ok,"weaponReady",l.p1,"returnPath",q,"regionCity",l.p3,"salaryPaidMonth",l.p4,"movementPending",l.R8],t.N,t.X)}}
A.dx.prototype={
$1(a){return A.an(a)>0},
$S:13}
A.dw.prototype={
$2(a,b){return A.z(a)+A.an(b)},
$S:12}
A.M.prototype={
gag(){var s,r=this,q=r.at
if(q==null)q=r.d
else{s=r.cy?1:0
s=B.c.v(q-r.ax-s,0,5)
q=s}return q},
J(){var s,r,q,p,o,n=this,m=n.e,l=t.n
m=A.d([m.a,m.b],l)
s=A.d([],t.b)
for(r=n.f.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.v)(r),++p){o=r[p]
s.push(A.d([o.a,o.b],l))}return A.T(["id",n.a,"c",n.b,"native",n.c,"level",n.d,"xy",m,"outline",s,"income",n.r,"baseIncome",n.z,"poor",n.w,"cap",n.x,"recruitCap",n.y,"recruit",n.Q,"rev",n.as,"initial",n.at,"wins",n.ax,"attacker",n.ay,"defender",n.ch,"stage",n.CW,"next",n.cx,"fallen",n.cy,"danger",n.db],t.N,t.X)}}
A.b3.prototype={
J(){var s,r,q=this,p=t.N,o=t.S,n=A.S(p,o)
for(s=q.w.gam(),s=s.gC(s);s.j();){r=s.gp()
n.B(0,""+r.a,r.b)}o=A.S(p,o)
for(s=q.x.gam(),s=s.gC(s);s.j();){r=s.gp()
o.B(0,""+r.a,r.b)}return A.T(["id",q.a,"gold",q.b,"reserves",q.c,"capacity",q.d,"salary",q.e,"poor",q.f,"garrisonAccrued",q.r,"stock",n,"hate",o],p,t.X)}}
A.ec.prototype={
gaw(){return B.a.ar(this.w,new A.ei(this))},
gM(){var s=this.f,r=A.f(s)
return new A.b(s,r.h("e(1)").a(new A.ej(this)),r.h("b<1>"))},
u(a){var s=this.r,r=A.f(s),q=r.h("b<1>")
s=A.m(new A.b(s,r.h("e(1)").a(new A.ef(this,a)),q),q.h("a.E"))
B.a.A(s,new A.eg())
return s},
Z(a){var s=this.r,r=A.f(s)
return A.aI(new A.b(s,r.h("e(1)").a(new A.eh(a)),r.h("b<1>")),t.r)},
I(a){var s=this.f,r=A.f(s)
return A.aI(new A.b(s,r.h("e(1)").a(new A.ed(a)),r.h("b<1>")),t.q)},
J(){var s,r,q,p,o=this,n=t.d,m=A.d([],n)
for(s=o.f,r=s.length,q=0;q<r;++q)m.push(s[q].J())
s=A.d([],n)
for(r=o.r,p=r.length,q=0;q<p;++q)s.push(r[q].J())
n=A.d([],n)
for(r=o.w,p=r.length,q=0;q<p;++q)n.push(r[q].J())
return A.T(["country",o.a,"tick",o.b,"month",o.e,"cities",m,"heroes",s,"countries",n,"pool",o.x,"salary",o.y,"year",o.c,"monthIndex",o.d],t.N,t.X)}}
A.ei.prototype={
$1(a){return t.t.a(a).a===this.a.a},
$S:8}
A.ej.prototype={
$1(a){return t.q.a(a).b===this.a.a},
$S:1}
A.ef.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b
if(a.c===s){r=a.as
s=(r===B.f||r===B.e)&&a.f>0&&a.b===B.a.ar(this.a.f,new A.ee(s)).b}else s=!1
return s},
$S:0}
A.ee.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.eg.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.eh.prototype={
$1(a){return t.r.a(a).a===this.a},
$S:0}
A.ed.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.hx.prototype={
cs(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
for(s=this.b,r=s.y,r=new A.ai(r,r.r,r.e,A.l(r).h("ai<2>")),q=this.f,p=this.a,o=p.a,n=s.z,s=s.Q;r.j();){m=r.d
l=p.Z(m.a)
k=p.I(m.d)
j=!0
if(m.b==="expedition")if(l!=null)if(k!=null)if(k.b!==o)if(l.b===o)if(!l.fy)if(!(l.f<=0)){m=l.a
if(!n.n(0,m)){i=l.as
if(i!==B.t)m=(i===B.f||i===B.e)&&!s.n(0,m)
else m=j}else m=j}else m=j
else m=j
else m=j
else m=j
else m=j
else m=j
else m=j
if(m)continue
J.lf(q.ca(k.a,new A.hz()),l)}},
gaX(){var s,r,q,p=this,o=p.d
if(o==null||p.f.a!==0)return o
s=new A.hD(p)
r=p.a
if(A.aS(o,r,p.c,null).ga6())return s.$1(o)?o:null
r=r.f
q=A.f(r)
return new A.Q(r,q.h("c(1)").a(new A.hB()),q.h("Q<1,c>")).dG(0).K(0,new A.hC(p,s))?null:o},
gc9(){var s,r=this
if(r.gaX()!=null){s=r.a.I(r.e)
s=s==null?null:s.b
s=s==r.gaX()}else s=!1
return s?r.e:null},
ga1(){var s=this.f,r=A.l(s).h("a8<1>"),q=A.m(new A.a8(s,r),r.h("a.E"))
B.a.A(q,new A.hH(this))
return A.aI(q,t.S)},
gc8(){var s,r=this,q=r.ga1()
if(q!=null){s=r.c.w
s=r.a.d>=s.k2&&r.f.a<s.k1&&r.d9(q)>=s.k3}else s=!0
return s},
au(a){var s,r,q,p=this
if(p.ga1()==null)return!0
s=!1
if(p.gaX()!=null)if(a.b!==p.gaX())s=p.ga1()==null||!p.gc8()
if(s)return!1
r=p.ga1()
if(r==null)r=p.gc9()
s=!0
if(r!=null){q=a.a
if(q!==r)s=p.ga1()!=null&&!p.f.a3(q)&&p.gc8()}return s},
d9(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c="soldierLimit",b=d.a,a=b.I(a0)
a.toString
s=d.f.i(0,a0)
if(s==null)s=A.d([],t.e)
r=s.length
q=d.b.Q
p=d.c.b
o=0
n=0
for(;n<s.length;s.length===r||(0,A.v)(s),++n){m=s[n]
if(q.n(0,m.a)){l=p.i(0,c)
l.toString
k=B.b.k(l)}else k=m.gP()
o+=d.bQ(m,k,0)}j=B.a.ar(b.w,new A.hA(a)).c
for(b=b.u(a0),s=A.f(b).h("L<1>"),s=A.a_(new A.L(b,s),0,A.Y(a.gag(),"count",t.S),s.h("k.E")),b=s.$ti,s=new A.o(s,s.gl(0),b.h("o<k.E>")),r=a.cy,q=a.at,l=a.ax,i=q==null,b=b.h("k.E"),a=a.d,h=0,g=0;s.j();){f=s.d
if(f==null)f=b.a(f)
e=p.i(0,c)
e.toString
k=Math.min(B.b.k(e),f.gP()+j)
j-=k-f.gP()
if(i)e=a
else{e=r?1:0
e=B.c.v(q-l-e,0,5)}h+=d.bQ(f,k,Math.max(1,e-g));++g}return h===0?1/0:o/h},
bQ(a,b,c){var s,r=this.c,q=r.c_(a.w,c,!1)
r=r.b
s=r.i(0,"soldierPower")
s.toString
s=B.b.k(s)
r=r.i(0,"soldierHp")
r.toString
return(a.f+b*B.b.k(r))*(B.c.bg(q+b*s+2,4)+1)*(1+a.ay/1000)}}
A.hy.prototype={
$1(a){var s=t.q.a(a).b
return s===this.a&&s!==this.b.a},
$S:1}
A.hz.prototype={
$0(){return A.d([],t.e)},
$S:54}
A.hD.prototype={
$1(a){var s=this.a,r=s.a.f,q=A.f(r)
return new A.b(r,q.h("e(1)").a(new A.hF(a)),q.h("b<1>")).K(0,new A.hG(s))},
$S:16}
A.hF.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.hG.prototype={
$1(a){var s
t.q.a(a)
s=this.a
return s.a.gM().K(0,new A.hE(s,a))},
$S:1}
A.hE.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.b.c.W(r,this.b.f.a0(r))<=s.c.w.at},
$S:1}
A.hB.prototype={
$1(a){return t.q.a(a).b},
$S:55}
A.hC.prototype={
$1(a){var s
A.h(a)
s=this.a
return A.aS(a,s.a,s.c,null).ga6()&&this.b.$1(a)},
$S:16}
A.hH.prototype={
$2(a,b){var s,r
A.h(a)
A.h(b)
s=this.a.f
r=B.c.t(s.i(0,b).length,s.i(0,a).length)
return r!==0?r:B.c.t(a,b)},
$S:23}
A.hA.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:8}
A.cb.prototype={}
A.hI.prototype={
ak(a){var s=this.a.Q
return!A.aS(a.b,s,this.b,null).ga6()||s.gM().gl(0)>=3||s.gM().K(0,new A.hL(this,a))},
br(a,b,c,d){var s,r,q=a.as
if(!(q===B.f||q===B.e)){q=a.ax
s=t.p
return q.length===0?A.d([],s):A.d([q],s)}r=this.bf(b,a)
if(r.length===0)return A.d([],t.p)
return A.d([A.d([B.a.gD(r).a],t.a)],t.p)},
bf(a,b){var s=this.b.r.gaL(),r=A.l(s),q=r.h("b<a.E>"),p=A.m(new A.b(s,r.h("e(a.E)").a(new A.hJ(this,a,b)),q),q.h("a.E"))
B.a.A(p,new A.hK())
return p},
cV(a){return this.bf(a,null)},
aY(a,b,c,d){var s,r,q,p,o,n,m,l,k,j=this
if(a!==0){s=j.a.Q
s=s.c<3||b.gag()<3||s.u(b.a).length<2}else s=!0
if(s)return a
s=A.aI(j.bf(c,d),t.o)
r=s==null?null:s.b
if(r==null)r=0
s=j.a.Q.r
q=A.f(s)
p=q.h("e(1)")
q=q.h("b<1>")
o=new A.b(s,p.a(new A.hO(j)),q).G(0,0,new A.hP(),t.S)
n=d.z
m=j.c.W(n,b.f.a0(n))
l=new A.b(s,p.a(new A.hQ(j,o,m,b,c)),q).gl(0)
k=Math.max(0,c.d-c.T().a-20)
s=j.b
q=s.b.i(0,"soldierLimit")
q.toString
return Math.max(a,Math.min(s.w.fy,Math.min(l,B.c.aO(k,Math.max(1,r+B.b.k(q))))))},
df(a){var s,r,q,p,o,n=this.a.Q
if(n.c<3)return 1
s=A.aI(this.cV(a),t.o)
r=s==null?null:s.b
if(r==null)r=0
s=this.b
q=s.w
p=Math.max(0,a.d-a.T().a-q.f)
s=s.b
o=s.i(0,"drawCost")
o.toString
o=B.b.k(o)
s=s.i(0,"soldierLimit")
s.toString
return Math.max(1,Math.min(q.fy,B.b.aO(p,Math.max(1,r+o+n.y+B.b.k(s)))))},
aa(a,b){var s,r,q,p,o
t.ef.a(a)
t.fy.a(b)
s=t.N
s=A.S(s,s)
for(r=J.G(a);r.j();){q=r.gp()
s.B(0,"h:"+q.a,q.go)}for(r=b.length,p=0;p<b.length;b.length===r||(0,A.v)(b),++p){o=b[p]
s.B(0,"c:"+o.a,o.as)}return s},
ah(b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=this,a9=null
t.L.a(b8)
if(!b2.d||!isFinite(b2.b)||J.jw(b2.a)||b1.fy||b0.as.n(0,b1.a))return a9
s=b2.b
r=a8.b
q=r.w
p=q.d
o=s+p
if(o>=b5)return a9
n=c3==="expedition"
if(n)m=!a8.ak(c4)
else m=!1
if(m)return a9
m=b1.a
l=b0.y.i(0,m)
k=l==null
if(!k){if(l.z>a8.a.Q.b&&!b6)return a9
j=!1
if(l.b===c3){i=l.d
if(i===c4.a){if(n){i=l.e
i=i===c4.b}else i=!0
if(i){i=l.r
if(i==(b7==null?a9:b7.a)){j=l.w
i=J.cB(j)
j=i.gav(j)&&i.gaF(j).E(J.lj(b2.a))<32&&b1.as!==B.i}}}}if(j)return a9}h=b0.N()
g=A.d([],t.w)
j=!b3
if(j){i=r.b
f=i.i(0,"battleBudget")
f.toString
e=b4?1:c4.gag()
e=Math.min(e,a8.a.Q.u(c4.a).length)
e=Math.max(1,e)
i=i.i(0,"supplySafety")
i.toString
o+=f*(c0+1)*e+s+i}if(o>q.p1)return a9
s=c4.a
i=b7==null
f=i?a9:b7.a
e=a8.a
d=e.Q
c=d.b
p=B.b.ap(isFinite(b5)?b5*60:(Math.max(o,60)+q.cx+p)*60)
b=B.b.bt(q.CW*60)
a=b2.a
r=r.b
a0=r.i(0,"supplySeconds")
a0.toString
a0=B.b.ap(o/a0)
a1=b3&&c1
if(n)n=c4.b
else n=a9
a2=new A.a5(m,c3,c2,s,n,b4,f,a,0,c+p,c+b,a0,b3,a1,b1.id+1)
p=!1
if(b3){n=h.L(s)
p=(k?a9:l.as)===!0&&l.y>=c&&l.d===s?1:0
q=c1?Math.max(h.O(c4),c4.y+q.cy):h.O(c4)
q=n-p>=q}else q=p
if(q)return a9
q=b1.as
if(q===B.f||q===B.e){q=h.f
r=r.i(0,"soldierLimit")
r.toString
a3=Math.max(0,Math.min(q,b9+B.b.k(r)-b1.gP())-h.e)
if(a3>0){if(e.x===B.o)return a9
if(!h.aC(a3))return a9
B.a.m(g,new A.y(B.n,a9,b1.c,a9,a3,B.d))}r=t.S
a4=A.S(r,r)
for(r=b8.length,q=h.w,e=e.x===B.o,a5=0;a5<b8.length;b8.length===r||(0,A.v)(b8),++a5){a6=b8[a5]
a4.aJ(a6,new A.hR(),new A.hS())
p=q.i(0,a6)
if(p==null)p=0
n=a4.i(0,a6)
n.toString
if(p<n){if(e)return a9
if(!h.c1(a6))return a9
B.a.m(g,new A.y(B.C,a9,a9,a9,a6,B.d))}}if(!h.de(b1,b8,a2,o))return a9
if(h.e<b9)return a9
if(c3==="intercept"||a.length>1)s=a9
B.a.m(g,new A.y(B.D,m,s,J.k1(a),0,b8))}else{if(!h.dz(b1,a2))return a9
if(c3==="intercept"||a.length>1)s=a9
B.a.m(g,new A.y(B.O,m,s,J.k1(a),0,B.d))}a7=h.a5(b6).a
s=h.d
if(s>=a7)s=j&&s===0
else s=!0
if(s)return a9
s=A.d([b1],t.e)
if(!i)s.push(b7)
r=d.I(b1.c)
r.toString
r=A.d([r],t.Y)
r.push(c4)
return new A.cb(h,new A.E(c2,g,a8.aa(s,r),A.d([a2],t.m),a7,b6))},
cj(a,b,c,d,e,f,g,h,i,j){return this.ah(a,b,c,d,!1,e,f,null,B.d,0,0,g,h,i,j)},
cl(a,b,c,d,e,f,g,h){return this.ah(a,b,c,d,!1,1/0,!1,null,B.d,0,0,e,f,g,h)},
bw(a,b,c,d,e,f,g,h,i,j){return this.ah(a,b,c,!1,d,1/0,!1,null,e,f,g,!1,h,i,j)},
co(a,b,c,d,e,f,g,h,i){return this.ah(a,b,c,!1,d,1/0,e,null,B.d,0,f,!1,g,h,i)},
cn(a,b,c,d,e,f,g,h,i){return this.ah(a,b,c,d,!1,1/0,e,null,B.d,0,0,f,g,h,i)},
b0(a,b,c,d,e,f,g,h,i){return this.ah(a,b,c,d,!1,e,f,null,B.d,0,0,!1,g,h,i)},
cp(a,b,c,d,e,f,g,h,i){return this.ah(a,b,c,!1,!1,d,e,f,B.d,0,0,!1,g,h,i)},
ck(a,b,c,d,e,f,g,h,i,j,k,l){return this.ah(a,b,c,!1,d,e,f,g,h,i,0,!1,j,k,l)},
cm(a,b,c,d,e,f,g,h){return this.ah(a,b,c,!1,!1,d,e,null,B.d,0,0,!1,f,g,h)},
bn(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a5.k1!=null)return B.u
s=this.a.Q
r=s.I(a4.c)
r.toString
q=a4.as
p=q===B.f||q===B.e?r.f.c4(r.e,a5.z):a4.z
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
g=h.bh(p)
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
a0=A.m(new A.b(A.d([(m-a)/j,(m+a)/j],t.n),t.db.a(new A.hM()),g),g.h("a.E"))
if(a0.length!==0)b=B.a.ae(a0,B.A)}for(m=s.f,a1=B.u,a2=0;a2<3;++a2){a3=new A.w(q+l*b,r+k*b)
if(!h.n(0,a3)||B.a.K(m,new A.hN(a3)))return B.u
a1=i.dF(a4,a3,s)
if(!a1.d)return a1
j=a1.b
if(Math.abs(b-j)<0.1)break
b=(b+j)/2}return a1}}
A.hL.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.c.W(r,this.b.f.a0(r))<=s.b.w.at},
$S:1}
A.hJ.prototype={
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
$S:18}
A.hK.prototype={
$2(a,b){var s,r=t.o
r.a(a)
r.a(b)
s=B.c.t(b.c-b.d,a.c-a.d)
return s!==0?s:B.c.t(a.b,b.b)},
$S:19}
A.hO.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a.Q.a&&!a.fy},
$S:0}
A.hP.prototype={
$2(a,b){return Math.max(A.h(a),t.r.a(b).w)},
$S:9}
A.hQ.prototype={
$1(a){var s,r,q,p,o,n=this
t.r.a(a)
s=n.a
r=!1
if(a.b===s.a.Q.a)if(!a.fy)if(a.f>=a.r*0.65)if(a.w>=n.b*0.8){q=!1
if(a.db){p=n.c
if(p!=null){o=a.z
s=Math.abs(s.c.W(o,n.d.f.a0(o))-p)<=s.b.w.ok}else s=!0
if(s){s=n.e
s=s.ao(a)&&!s.as.n(0,a.a)}else s=q}else s=q
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
A.hR.prototype={
$1(a){return A.h(a)+1},
$S:6}
A.hS.prototype={
$0(){return 1},
$S:5}
A.hM.prototype={
$1(a){return A.an(a)>=0},
$S:13}
A.hN.prototype={
$1(a){return t.q.a(a).f.n(0,this.a)},
$S:1}
A.aE.prototype={
aQ(){return"AiDecisionStage."+this.b}}
A.ao.prototype={
aQ(){return"AiActionKind."+this.b}}
A.y.prototype={
J(){var s=this,r=s.d
r=r==null?null:A.d([r.a,r.b],t.n)
return A.T(["kind",s.a.a,"hero",s.b,"city",s.c,"point",r,"amount",s.e,"weapons",s.f],t.N,t.X)}}
A.a5.prototype={
J(){var s,r,q,p,o,n=this,m=A.d([],t.b)
for(s=n.w,r=s.length,q=t.n,p=0;p<s.length;s.length===r||(0,A.v)(s),++p){o=s[p]
m.push(A.d([o.a,o.b],q))}return A.T(["hero",n.a,"role",n.b,"deadline",n.y,"commit",n.z,"city",n.d,"enemy",n.r,"points",m,"leg",n.x,"gold",n.Q,"slot",n.as,"rearStaging",n.at,"reason",n.c,"order",n.ax,"targetCountry",n.e,"attrition",n.f],t.N,t.X)}}
A.E.prototype={
J(){var s,r,q,p=this,o=t.d,n=A.d([],o)
for(s=p.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)n.push(s[q].J())
o=A.d([],o)
for(s=p.d,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)o.push(s[q].J())
return A.T(["reason",p.a,"actions",n,"deps",p.c,"tasks",o,"floor",p.e,"emergency",p.f],t.N,t.X)}}
A.bR.prototype={
J(){var s,r,q,p=this,o=A.d([],t.d)
for(s=p.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)o.push(s[q].J())
return A.T(["phase",p.a,"target",p.b,"gold",p.c,"heroes",p.d,"groups",o,"notes",p.f,"limited",p.r,"assessments",p.w,"routeSteps",p.x,"expansions",p.y],t.N,t.X)}}
A.en.prototype={
J(){var s,r,q,p=this,o=p.Q.J(),n=A.d([],t.d)
for(s=p.as,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)n.push(s[q].J())
return A.T(["protocol",1,"session",p.a,"id",p.d,"rules",p.b,"map",p.c,"observation",o,"deadline",p.e,"tasks",n,"seed",p.f,"priority",p.r,"idle",p.w,"stage",p.x.b,"offensiveCountry",p.y,"offensiveCity",p.z],t.N,t.X)}}
A.em.prototype={
J(){var s=this
return A.T(["protocol",1,"session",s.a,"id",s.d,"country",s.e,"rules",s.b,"map",s.c,"tick",s.f,"deadline",s.r,"plan",s.x.J(),"micros",s.w,"error",s.y],t.N,t.X)}}
A.jd.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:8}
A.je.prototype={
$0(){var s=this,r=s.a,q=r.c,p=!1
if(s.b.length!==0)if(q!=null)if(!q.r){p=s.c
p=p.f>=p.r*0.5&&q.c>0&&q.b>=s.d.w.ch}if(p)return new A.aO([!0,q.b,1,q.c])
return new A.aO([!1,r.b,0,r.a])},
$S:56}
A.jq.prototype={
$1(a){t.cJ.a(a)
return this.a.E(a.a)>this.b+a.b},
$S:57}
A.jr.prototype={
$1(a){t.fg.a(a)
return!a.b&&this.a.E(a.a)>this.b},
$S:58}
A.hW.prototype={
dt(h4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1=this,h2=null,h3={}
h3.a=h4
s=h1.a
r=s.Q
q=A.d([],t.Z)
p=h1.b
o=s.y
s=s.z
n=A.ca(r,h4,p,s,o)
m=r.r
l=A.f(m)
k=l.h("e(1)")
l=l.h("b<1>")
j=A.m(new A.b(m,k.a(new A.hZ(r)),l),l.h("a.E"))
B.a.A(j,new A.i_())
i=r.f
h=A.f(i)
g=h.h("e(1)")
h=h.h("b<1>")
f=h.h("a.E")
e=A.m(new A.b(i,g.a(new A.i0(h1,r,n)),h),f)
if(j.length!==0)B.a.A(e,new A.ib(h1,j,r))
d=A.aI(e,t.q)
c=h4.cb(e)
b=d==null
a=b?h2:A.aS(d.b,r,p,h2)
a0=a==null
a1=new A.hY(h1,(a0?h2:a.ga6())===!0?Math.min(B.b.ap(a.c*a.gaV()),Math.max(0,h4.d-h4.T().a)):0)
a2=new A.hX(h3,h1,q)
a3=r.gM()
a4=A.m(a3,a3.$ti.h("a.E"))
B.a.A(a4,new A.ik(h3,h1))
a3=t.S
a5=Math.min(h3.a.f,B.a.G(a4,0,new A.il(h3,h1),a3))
if(a4.length!==0&&a5>h3.a.e){a6=h3.a.N()
a7=Math.max(0,a6.d-Math.max(a6.T().a,p.w.f))
a8=a6.e
a9=p.b.i(0,"soldierCost")
a9.toString
b0=Math.min(a5-a8,B.b.aO(a7,B.b.k(a9)))
if(b0>0&&a6.aC(b0)&&a1.$1(a6))a2.$4(a6,A.d([new A.y(B.n,h2,B.a.gD(a4).a,h2,b0,B.d)],t.w),"\u6309\u5168\u56fd\u73b0\u6709\u5b88\u5c06\u548c\u5f85\u51fa\u5f81\u5c06\u9886\u8865\u5175\uff0c\u4fdd\u7559\u7cae\u8349\u3001\u6708\u4ff8\u548c\u6d41\u52a8\u8d44\u91d1",B.a.gD(a4))}for(a8=a4.length,a9=h1.c,b1=p.w,b2=b1.fx-2,b3=h1.e,b4=t.w,b5=p.r,b6=p.b,b7=h1.d,b8=t.a,b9=0;b9<a4.length;a4.length===a8||(0,A.v)(a4),++b9){c0=a4[b9]
if(q.length>=b2)break
c1=a9.df(h3.a)
c2=new A.b(m,k.a(new A.im(h3,r,Math.max(12,new A.b(m,k.a(new A.io(r)),l).G(0,0,new A.ip(),a3)*0.8))),l).gl(0)
c3=c1>=2&&c2+h3.a.at.a<c1&&B.a.K(i,new A.iq(r))
if(c3){c4=c0.a
c5=b3.i(0,c4)
if(c5==null)c5=h2
else c5=c5.d.length!==0||c5.a.at!=null
c4=c5!==!0&&h3.a.u(c4).length>=c0.y}else c4=!1
if(c4){c4=h3.a.u(c0.a)
c5=A.f(c4)
c6=c5.h("b<1>")
c7=A.m(new A.b(c4,c5.h("e(1)").a(new A.ir(h3,h1)),c6),c6.h("a.E"))
B.a.A(c7,new A.i1())
if(c7.length!==0){a6=h3.a.N()
c8=B.a.gD(c7)
if(a6.bl(c8))a2.$5$hero(a6,A.d([new A.y(B.v,c8.a,h2,h2,0,B.d)],b4),"\u5b89\u5168\u540e\u65b9\u6e05\u7406\u4f4e\u4ef7\u503c\u5197\u4f59\u7f16\u5236\uff0c\u4fdd\u7559\u5b9e\u9645\u5b88\u5c06\u548c\u5185\u653f\u5c06\u9886\uff0c\u4e3a\u5f3a\u653b\u4e3b\u529b\u8865\u5458",c0,c8)}}c4=c0.a
c9=h3.a.u(c4)
c5=A.f(c9)
c6=c5.h("b<1>")
d0=A.m(new A.b(c9,c5.h("e(1)").a(new A.i2()),c6),c6.h("a.E"))
B.a.A(d0,new A.i3())
if(c9.length!==0&&b5.gav(b5)){d1=B.a.ae(c9,new A.i4())
c5=b5.gaL()
c6=A.l(c5)
d2=c6.h("b<a.E>")
d3=A.m(new A.b(c5,c6.h("e(a.E)").a(new A.i5(r)),d2),d2.h("a.E"))
B.a.A(d3,new A.i6())
d4=A.m(new A.b(i,g.a(new A.i7(h3,h1,r,d1)),h),f)
B.a.A(d4,new A.i8(h1,d1,r))
d5=d4.length===0?0:2
c5=A.f(d4)
c6=c5.h("u<1>")
d2=new A.u(d4,0,3,c6)
d2.S(d4,0,3,c5.c)
d2=new A.o(d2,d2.gl(0),c6.h("o<k.E>"))
c6=c6.h("k.E")
while(d2.j()){c5=d2.d
if(c5==null)c5=c6.a(c5)
if(d3.length===0)d6=A.d([],b8)
else{d6=b6.i(0,"carryLimit")
d6.toString
d6=A.hr(B.b.k(d6),B.a.gD(d3).a,!1,a3)}d6=A.jc(d1,c5,r,p,b7,d6,0).a[2]
if(d6>0){if(a0)c6=h2
else c6=a.a!==a.d.a&&a.b>=a.e.w.w
if(c6===!0){c6=c5.b
c6=c6===(b?h2:d.b)}else c6=!1
if(c6){d5=a9.aY(d6,c5,h3.a,d1)
break}d5=a9.aY(d6,c5,h3.a,d1)
break}}d7=d5}else d7=1
if(!c.n(0,c4)){c5=b3.i(0,c4)
if(c5==null)c5=h2
else c5=c5.d.length!==0||c5.a.at!=null
c5=c5===!0}else c5=!0
d8=!1
if(c5)if(B.a.K(i,new A.i9(r))){if(!c3)if(c9.length!==0)if(d7>0){c5=h3.a.bZ(c4)
c6=h3.a
c5=c5<(c6.ax.n(0,c4)||c6.a2(c0)?0:1)+d7}else c5=d8
else c5=!0
else c5=!0
d8=c5}if(d0.length!==0)if(c0.at==null){c5=c9.length
c6=h3.a.x.i(0,c4)
d2=!0
if(c6==null)c6=c0.d
if(c5<=c6){if(d8){c5=c9.length
c6=h3.a.x.i(0,c4)
if(c6==null)c6=c0.d
c6=c5>=c6
c5=c6}else c5=!1
if(!c5){c5=b3.i(0,c4)
if(c5==null)c5=h2
else{c5=c5.f
c5=c5==null?h2:c5.a}c5=c5===B.r}else c5=d2}else c5=d2}else c5=!1
else c5=!1
if(c5){a6=h3.a.N()
if(a6.aK(c0,B.a.gD(d0))){c5=b3.i(0,c4)
if(c5==null)c5=h2
else c5=c5.d.length!==0||c5.a.at!=null
c5=a1.$2$civilian(a6,c5!==!0)}else c5=!1
if(c5)a2.$5$hero(a6,A.d([new A.y(B.m,B.a.gD(d0).a,c4,h2,0,B.d)],b4),"\u63d0\u9ad8\u5fc5\u8981\u57ce\u9632\u4e0e\u8fce\u6218\u540d\u989d\uff0c\u4fdd\u7559\u5df2\u51fa\u5f81\u90e8\u961f\u7684\u540e\u52e4\u8d44\u91d1",c0,B.a.gD(d0))}if(d8){c5=b3.i(0,c4)
if(c5==null)c5=h2
else c5=c5.d.length!==0||c5.a.at!=null
if(c5===!0){c5=h3.a.L(c4)
c6=c0.at
if(c6==null)c6=c0.d
else{d2=c0.cy?1:0
d2=B.c.v(c6-c0.ax-d2,0,5)
c6=d2}c6=c5<c6
c5=c6}else c5=!0}else c5=!1
if(c5){a6=h3.a.N()
c5=b3.i(0,c4)
if(c5==null)c5=h2
else c5=c5.d.length!==0||c5.a.at!=null
c6=b?h2:d.b
if(a6.bs(c0,c5===!0,c6)&&a1.$1(a6))a2.$4(a6,A.d([new A.y(B.w,h2,c4,h2,0,B.d)],b4),"\u8865\u5145\u7559\u5b88\u548c\u540e\u7eed\u6269\u5f20\u6240\u9700\u5c06\u9886\uff0c\u7b7e\u7ea6\u4e0e\u6708\u4ff8\u6309\u6700\u9ad8\u8d39\u7528\u9884\u7559",c0)}}d9=A.d([],t.e)
for(m=a4.length,b9=0;b9<a4.length;a4.length===m||(0,A.v)(a4),++b9){c0=a4[b9]
l=c0.a
k=b3.i(0,l)
if(k==null)k=h2
else k=k.d.length!==0||k.a.at!=null
if(k===!0)continue
c9=h3.a.u(l)
k=A.f(c9)
a8=k.h("b<1>")
e0=A.m(new A.b(c9,k.h("e(1)").a(new A.ia(h3)),a8),a8.h("a.E"))
B.a.A(e0,new A.ic())
k=c9.length
a8=h3.a
k=A.h(Math.max(0,k-(a8.ax.n(0,l)||a8.a2(c0)?0:1)))
l=A.f(e0)
a8=new A.u(e0,0,k,l.h("u<1>"))
a8.S(e0,0,k,l.c)
B.a.F(d9,a8)}B.a.A(d9,new A.id())
e1=h2
e2=h2
e3=0
e4=1
if(d9.length!==0){c8=B.a.gD(d9)
e5=A.ca(r,h3.a,p,s,o)
d4=A.m(new A.b(i,g.a(new A.ie(h3,h1,r)),h),f)
B.a.A(d4,new A.ig(h1,c8,r))
s=A.a_(d4,0,A.Y(b1.go,"count",a3),A.f(d4).c)
o=s.$ti
s=new A.o(s,s.gl(0),o.h("o<k.E>"))
m=a9.c
l=b1.ok
k=e5.f
b1=b1.k4
i=t.aO
h=t.eO
g=h.h("a.E")
o=o.h("k.E")
e6=e3
e7=e1
e8=!1
for(;;){if(!s.j()){e3=e6
e1=e7
break}A:{f=s.d
if(f==null)f=o.a(f)
e9=A.m(new A.b(d9,i.a(new A.ih(h1,f)),h),g)
if(e9.length===0)break A
c8=B.a.gD(e9)
for(a8=a9.br(c8,h3.a,f,b7),b2=a8.length,b3=f.e,f0=f.a,b9=0;b9<a8.length;a8.length===b2||(0,A.v)(a8),++b9){d3=a8[b9]
f1={}
f2=A.jc(c8,f,r,p,b7,d3,0)
b5=k.i(0,f0)
f3=b5==null?h2:b5.length
if(f3==null)f3=0
b5=f2.a
f4=a9.aY(b5[2],f,h3.a,c8)
f5=f4-f3
f6=e5.ga1()!=null&&e5.ga1()!==f0
b8=!0
if(b5[2]!==0)if(f5>0)if(f5<=e9.length)if(f6)b8=f4!==1||b5[1]<b1
else b8=!1
if(b8)continue
f7=h3.a.N()
f7.d=1e6
f1.a=f7
f8=A.d([],b4)
g0=1/0
g1=0
g2=0
for(;;){f9=!1
if(!(g2<f5)){f9=!0
break}if(!(g2<e9.length))return A.n(e9,g2)
g3=e9[g2]
if(A.jc(g3,f,r,p,b7,d3,0).a[2]===0)break
g4=m.aI(g3,b3,r,f)
b8=g4.b
g0=Math.min(g0,b8)
g1=Math.max(g1,b8)
if(!g4.d||g1-g0>l)break
g5=B.a.G(a4,0,new A.ii(f1,h1,g3),a3)
b8=f1.a
c4=b8.f
c5=b6.i(0,"soldierLimit")
c5.toString
c5=Math.min(g5,Math.max(0,c4-B.b.k(c5)))
g6=a9.bw(b8,g3,g4,b5[0],d3,c5,f3+g2,"\u6309\u5171\u540c\u653b\u9632\u95e8\u69db\u6838\u7b97\u6574\u961f\u6b66\u5668\u4e0e\u8def\u8d39","expedition",f)
if(g6==null)break
f1.a=g6.a
b8=g6.b.b
c4=A.f(b8)
B.a.F(f8,new A.b(b8,c4.h("e(1)").a(new A.ij()),c4.h("b<1>")));++g2}if(!f9)continue
b5=f1.a
g7=1e6-b5.d+b5.T().a
b5=h3.a
if(b5.d<g7){if(e6===0||g7<e6){e4=f4
e6=g7
e7=f0}continue}a6=b5.N()
b5=f8.length
g8=0
for(;;){if(!(g8<f8.length)){f9=!0
break}if(!a6.c1(f8[g8].e)){f9=!1
break}f8.length===b5||(0,A.v)(f8);++g8}if(!f9||!a1.$1(a6))continue
if(f8.length!==0){f=r.I(c8.c)
f.toString
a2.$4(a6,f8,"\u6309\u76ee\u6807\u57ce\u9632\u4e0e\u5b88\u5c06\u914d\u9f50"+f4+"\u540d\u8fdb\u653b\u5c06\u9886\u7684\u9ad8\u7ea7\u6b66\u5668\uff0c\u9884\u7559\u6574\u961f\u7cae\u8349",f)}e6=e3
e2=f0
e7=e1
e8=!0
break}if(e8){e3=e6
e1=e7
break}}}}s=e2==null
g9=r.I(s?e1:e2)
if(g9==null)g9=d
h0=g9==null?h2:A.aS(g9.b,r,p,h3.a.x)
p=e1==null?"preparing":"saving"
s=s?e1:e2
if(s==null)if((a0?h2:a.ga6())===!0)s=b?h2:d.a
else s=h2
b7=b7.b
o=b7.e
m=b7.c
l=b7.d
b7=b7.b
k=A.d([],t.s)
if(q.length===0)k.push("\u672c\u8f6e\u65e0\u5fc5\u8981\u4e14\u53ef\u652f\u4ed8\u7684\u91c7\u8d2d\uff0c\u4fdd\u7559\u56fd\u5e93")
if((h0==null?h2:h0.ga6())===!0)k.push("\u76ee\u6807\u56fd\u5360\u6709 "+h0.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.ap(h0.c*h0.gaV())+" \u91d1\u5e01\uff0c\u51c6\u5907\u5f3a\u5316\u6b66\u5668\u548c\u8f6e\u653b\u5175\u529b")
return new A.bR(p,s,e3,e4,q,k,o,m,l,b7)}}
A.hZ.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&a.f>0&&!a.fy},
$S:0}
A.i_.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ae(s.a(b),!0),A.ae(a,!0))},
$S:2}
A.i0.prototype={
$1(a){t.q.a(a)
return a.b!==this.b.a&&this.c.au(a)&&this.a.c.ak(a)},
$S:1}
A.ib.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bm(o.a(b),B.a.gD(s),r,p,q,null),A.bm(a,B.a.gD(s),r,p,q,null))},
$S:4}
A.hY.prototype={
$2$civilian(a,b){var s=a.d,r=Math.max(a.T().a,this.a.b.w.f)
return s>=r+(b?this.b:0)},
$1(a){return this.$2$civilian(a,!1)},
$S:59}
A.hX.prototype={
$5$hero(a,b,c,d,e){var s,r
t.f3.a(b)
this.a.a=a
s=this.b
r=A.d([],t.e)
if(e!=null)r.push(e)
B.a.m(this.c,new A.E(c,b,s.c.aa(r,A.d([d],t.Y)),B.q,Math.max(a.T().a,s.b.w.f),!1))},
$4(a,b,c,d){return this.$5$hero(a,b,c,d,null)},
$S:60}
A.ik.prototype={
$2(a,b){var s,r,q,p,o,n=t.q
n.a(a)
s=this.a
n=n.a(b).a
r=s.a.u(n).length===0?1:0
q=a.a
p=B.c.t(r,s.a.u(q).length===0?1:0)
if(p!==0)return p
s=this.b.e
r=s.i(0,n)
if(r==null)r=null
else r=r.d.length!==0||r.a.at!=null
r=r===!0?1:0
s=s.i(0,q)
if(s==null)s=null
else s=s.d.length!==0||s.a.at!=null
o=B.c.t(r,s===!0?1:0)
return o!==0?o:B.c.t(q,n)},
$S:4}
A.il.prototype={
$2(a,b){var s,r
A.h(a)
t.q.a(b)
s=this.a.a.u(b.a).length
r=this.b.b.b.i(0,"soldierLimit")
r.toString
return a+s*B.b.k(r)},
$S:7}
A.io.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&!a.fy},
$S:0}
A.ip.prototype={
$2(a,b){return Math.max(A.h(a),t.r.a(b).w)},
$S:9}
A.im.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.b===this.b.a)if(!a.fy){r=this.a
if(!r.a.z.n(0,a.a))if(a.f>=a.r*0.65)if(a.w>=this.c){s=a.as
s=!(s===B.f||s===B.e)||r.a.ao(a)}}return s},
$S:0}
A.iq.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.ir.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.dy){r=this.b.b
if(a.w<=r.w.p4){s=a.x
r=r.b.i(0,"drawCost")
r.toString
s=s<=B.b.k(r)&&s<15&&this.a.a.ao(a)}}return s},
$S:0}
A.i1.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.a4(a),A.a4(b))},
$S:2}
A.i2.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.i3.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.i4.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return A.ae(a,!0)>A.ae(b,!0)?a:b},
$S:14}
A.i5.prototype={
$1(a){t.o.a(a)
return a.f&&a.d===0&&this.a.c>=a.e},
$S:18}
A.i6.prototype={
$2(a,b){var s=t.o
s.a(a)
return B.c.t(s.a(b).c,a.c)},
$S:19}
A.i7.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.ca(s,this.a.a,r.b,q.z,q.y).au(a)&&r.c.ak(a)}else s=!1
return s},
$S:1}
A.i8.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bm(o.a(b),s,r,p,q,null),A.bm(a,s,r,p,q,null))},
$S:4}
A.i9.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.ia.prototype={
$1(a){t.r.a(a)
return a.db&&this.a.a.ao(a)},
$S:0}
A.ic.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ae(s.a(b),!0),A.ae(a,!0))},
$S:2}
A.id.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ae(s.a(b),!0),A.ae(a,!0))},
$S:2}
A.ie.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.ca(s,this.a.a,r.b,q.z,q.y).au(a)&&r.c.ak(a)}else s=!1
return s},
$S:1}
A.ig.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bm(o.a(b),s,r,p,q,null),A.bm(a,s,r,p,q,null))},
$S:4}
A.ih.prototype={
$1(a){t.r.a(a)
return this.a.c.ak(this.b)},
$S:0}
A.ii.prototype={
$2(a,b){var s,r,q
A.h(a)
t.q.a(b)
s=this.a
r=b.a
q=s.a.u(r).length
s=Math.min(Math.max(0,q-(r===this.c.c?1:0)),s.a.dd(b))
q=this.b.b.b.i(0,"soldierLimit")
q.toString
return a+s*B.b.k(q)},
$S:7}
A.ij.prototype={
$1(a){return t.T.a(a).a===B.C},
$S:27}
A.bp.prototype={}
A.eo.prototype={
W(b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=b1.a,a7=b1.b,a8=A.x(b0.a)+","+A.x(b0.b)+":"+A.x(a6)+","+A.x(a7),a9=a5.d
if(a9.a3(a8)){a6=a9.i(0,a8)
a6.toString
return a6}for(s=a5.a,r=s.b,q=s.c,p=r+q+8,o=r-1,--q,n=a5.b,m=n.b,n=n.e,s=s.d,l=s.length,k=n.length,j=a5.c,i=b0,h=0,g=0;g<p;++g){f=i.E(b1)
if(f<1e-7){if(a9.a>=256){e=new A.a8(a9,A.l(a9).h("a8<1>")).gC(0)
if(!e.j())A.cC(A.aC())
a9.an(0,e.gp())}a9.B(0,a8,h)
return h}if(!j.dB())return 1/0
d=i.a
c=(a6-d)/f
b=i.b
a=(a7-b)/f
a0=B.c.v(B.b.Y((d+c*1e-7)/16),0,o)
a1=B.c.v(B.b.Y((b+a*1e-7)/16),0,q)
a2=new A.ep()
a3=a2.$3(d,c,a0)
a2=a2.$3(b,a,a1)
a4=Math.min(f,Math.min(A.kO(a3),A.kO(a2)))
a2=m.i(0,"marchSpeed")
a2.toString
a3=a1*r+a0
if(!(a3>=0&&a3<l))return A.n(s,a3)
a3=s[a3]
if(!(a3<k))return A.n(n,a3)
h+=a4/(a2*n[a3])
i=new A.w(d+c*a4,b+a*a4)}return 1/0},
al(a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=b0.I(a8.c),a5=a8.as,a6=(a5===B.f||a5===B.e)&&a4!=null?a4.f.c4(a4.e,a9):a8.z,a7=b2==null?a9:b2.f.bX(a6,a9)
a5=this.a
if(!a5.n(0,a7))return B.u
s=new A.eq(b0,a8,b2)
r=new A.es(this,b0,a8)
q=t._
p=A.d([A.d([a7],q)],t.a5)
if(!s.$2(a6,a7))o=b1&&r.$2(a6,a7)
else o=!0
if(o){n=a6.E(a7)
o=a6.a
m=a7.a
l=(o+m)/2
k=a6.b
j=a7.b
i=(k+j)/2
if(n>0)for(h=[-96,96,-192,192],k=(j-k)/n,o=(m-o)/n,g=0;g<4;++g){f=h[g]
e=new A.w(l-k*f,i+o*f)
if(a5.n(0,e))B.a.m(p,A.d([e,a7],q))}}for(a5=p.length,d=null,g=0;g<p.length;p.length===a5||(0,A.v)(p),++g){c=p[g]
q=c.length
a=a6
a0=0
a1=!1
a2=0
for(;;){if(!(a2<c.length)){b=!0
break}a3=c[a2]
if(s.$2(a,a3)){b=!1
break}a1=a1||r.$2(a,a3)
a0+=this.W(a,a3)
c.length===q||(0,A.v)(c);++a2
a=a3}q=!0
if(b)if(isFinite(a0))q=b1&&a1
if(q)continue
if(d==null||a0<d.b)d=new A.bp(c,a0,!0)}return d==null?B.S:d},
aI(a,b,c,d){return this.al(a,b,c,!1,d)},
dF(a,b,c){return this.al(a,b,c,!1,null)}}
A.ep.prototype={
$3(a,b,c){var s
if(Math.abs(b)<1e-12)s=1/0
else s=Math.max(1e-8,((b>0?c+1:c)*16-a)/b)
return s},
$S:61}
A.eq.prototype={
$2(a,b){return B.a.K(this.a.f,new A.er(this.b,this.c,a,b))},
$S:32}
A.er.prototype={
$1(a){var s,r=this
t.q.a(a)
if(a.b!==r.a.b){s=r.b
s=s==null?null:s.a
s=a.a!==s&&a.f.c6(r.c,r.d)!=null}else s=!1
return s},
$S:1}
A.es.prototype={
$2(a,b){return B.a.K(this.b.r,new A.et(this.a,this.c,b,a))},
$S:32}
A.et.prototype={
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
l=B.b.v(((k.a-q)*p+(k.b-o)*n)/m,0,1)}s=r.aG(s,l).E(a.z)
r=j.a.b.b.i(0,"encounterDistance")
r.toString
return s<r+12},
$S:0}
A.ap.prototype={
J(){var s=this
return A.d([s.a,s.b,s.c,s.d,s.e,s.f,s.r],t.Q)}}
A.eu.prototype={
bi(a,b,c,d){var s,r,q,p
if(c){s=this.f
if(!(d<s.length))return A.n(s,d)
s=s[d]}else s=1
s=B.c.v(B.b.Y(a*s),0,63)
if(b>0){r=this.d
q=r.length
p=B.c.v(b-1,0,q-1)
if(!(p>=0&&p<q))return A.n(r,p)
p=r[p]
r=p}else r=0
return B.c.v(s+r,0,63)},
c_(a,b,c){return this.bi(a,b,c,0)},
d0(a,b){return this.bi(a,0,b,0)},
ai(a){var s,r,q="maxLevel",p=this.b,o=p.i(0,"firstYearCityLevel")
if(o==null){o=p.i(0,q)
o.toString
o=B.b.k(o)}o=B.b.k(o)
s=p.i(0,"initialYear")
s=B.b.k(s==null?1:s)
r=p.i(0,q)
r.toString
r=B.c.v(a-s,0,B.b.k(r))
s=p.i(0,"cityLevelsPerYear")
s=B.b.k(s==null?1:s)
p=p.i(0,q)
p.toString
return B.c.v(o+r*s,1,B.b.k(p))},
J(){var s,r,q,p=this,o=A.d([],t.eG)
for(s=p.r.gaL(),s=s.gC(s),r=t.Q;s.j();){q=s.gp()
o.push(A.d([q.a,q.b,q.c,q.d,q.e,q.f,q.r],r))}return A.T(["version",p.a,"values",p.b,"upgrades",p.c,"defenseBonuses",p.d,"movement",p.e,"field",p.f,"weapons",o,"tuning",p.w.J()],t.N,t.X)}}
A.eb.prototype={
bh(a){var s=this.d,r=this.b
r=B.c.v(B.b.Y(a.b/16),0,this.c-1)*r+B.c.v(B.b.Y(a.a/16),0,r-1)
if(!(r>=0&&r<s.length))return A.n(s,r)
return s[r]},
n(a,b){var s,r=b.a
if(isFinite(r)){s=b.b
r=isFinite(s)&&r>=0&&s>=0&&r<this.b*16&&s<this.c*16}else r=!1
return r},
J(){var s=this
return A.T(["version",s.a,"width",s.b,"height",s.c,"terrain",s.d],t.N,t.X)}}
A.ew.prototype={
du(a){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=t.d1.a(B.j.da(a,null))
switch(J.b2(s,"kind")){case"init":if(!J.af(J.b2(s,"protocol"),1)||!J.af(J.b2(s,"build"),"15a64ec"))throw A.j(B.a4);++i.f
i.e=null
p=i.r
if(p.a>0){p.b=p.c=p.d=p.e=p.f=null
p.a=0
p.b4()}p=t.f
o=t.N
n=t.z
i.c=A.lr(A.as(p.a(J.b2(s,"rules")),o,n))
n=A.as(p.a(J.b2(s,"map")),o,n)
p=A.J(n.i(0,"version"))
m=A.h(n.i(0,"width"))
l=A.h(n.i(0,"height"))
n=A.bt(t.R.a(n.i(0,"terrain")),!0,t.S)
k=new Uint8Array(A.mD(n))
if(m<=0||l<=0||n.length!==m*l)A.cC(B.a6)
i.d=new A.eb(p,m,l,k)
i.a.$1(B.j.aq(t.G.a(A.T(["kind","ready","rules",i.c.a,"map",p,"backend",i.b],o,t.X)),null))
break
case"cancel":p=i.e
o=J.b2(s,"id")
if(p==null?o==null:p===o)i.r.m(0,A.h(J.b2(s,"id")))
break
case"plan":if(i.c==null||i.d==null||i.e!=null){p=A.kk("AI \u5c1a\u672a\u5c31\u7eea\u6216\u5df2\u6709\u8bf7\u6c42\u6267\u884c\u4e2d")
throw A.j(p)}r=A.lp(A.as(t.f.a(J.b2(s,"request")),t.N,t.z))
i.e=r.d
i.aT(r,i.f)
break
default:throw A.j(B.a5)}}catch(j){q=A.aR(j)
i.a.$1(B.j.aq(t.G.a(A.T(["kind","error","message",J.bo(q)],t.N,t.X)),null))}},
aT(a,b){return this.cS(a,b)},
cS(a3,a4){var s=0,r=A.mY(t.x),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
var $async$aT=A.nc(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:a1=new A.it()
$.k_()
a1.bx()
m=a1
p=4
i=n.c
i.toString
h=n.d
h.toString
g=new A.ev(i.w)
f=new A.eH(i,h,a3,g,A.S(t.S,t.h))
e=t.N
h=new A.eo(h,i,g,A.S(e,t.i))
f.e=h
f.f=new A.eD(i,g,A.S(e,t.cM))
f.r=new A.hI(a3,i,h)
l=f
k=0
i=l.by(),h=i.$ti,i=new A.aP(i.a(),h.h("aP<1>")),h=h.c,g=n.r,d=a3.d,c=t.x
case 7:if(!i.j()){s=8
break}b=i.b
if(b==null)h.a(b)
if(a4!==n.f||g.n(0,d)){if(a4===n.f){n.e=null
g.an(0,d)
n.a.$1(B.j.aq(t.G.a(A.T(["kind","cancelled","id",d],e,t.X)),null))}s=1
break}b=k
if(typeof b!=="number"){q=b.dL()
s=1
break}a=b+1
k=a
s=a>=n.c.w.id?9:10
break
case 9:k=0
b=m
if(b.b==null)b.b=$.hV.$0()
s=11
return A.mv(A.lF(B.H,c),$async$aT)
case 11:m.bx()
case 10:s=7
break
case 8:if(a4!==n.f){s=1
break}if(g.an(0,d)){n.e=null
n.a.$1(B.j.aq(t.G.a(A.T(["kind","cancelled","id",d],e,t.X)),null))
s=1
break}n.e=null
i=l.w
i.toString
n.a.$1(B.j.aq(t.G.a(A.T(["kind","reply","reply",A.k5(a3,i,null,m.gc5()).J()],e,t.X)),null))
p=2
s=6
break
case 4:p=3
a2=o.pop()
j=A.aR(a2)
if(a4!==n.f){s=1
break}n.e=null
i=A.d(["\u89c4\u5212\u5931\u8d25\uff0c\u4e3b\u73af\u5883\u4fdd\u7559\u6709\u9650\u5b89\u5168\u4fdd\u62a4"],t.s)
h=m.gc5()
n.a.$1(B.j.aq(t.G.a(A.T(["kind","reply","reply",A.k5(a3,new A.bR("preparing",null,0,1,B.af,i,!1,0,0,0),J.bo(j),h).J()],t.N,t.X)),null))
s=6
break
case 3:s=2
break
case 6:case 1:return A.mx(q,r)
case 2:return A.mw(o.at(-1),r)}})
return A.my($async$aT,r)}}
A.js.prototype={
$1(a){t.r.a(a)
return a.w*3+a.f*0.35+a.gP()*8},
$S:33}
A.jt.prototype={
$1(a){var s
t.r.a(a)
if(a.c===this.a.a){s=a.as
s=!(s===B.f||s===B.e)}else s=!1
return s},
$S:0}
A.ju.prototype={
$2(a,b){var s
A.an(a)
t.r.a(b)
s=A.a4(b)
return a+s*(b.k1==null?0.12:0.03)},
$S:24}
A.a2.prototype={}
A.ar.prototype={
ga9(){var s,r=this.a
if(r.at!=null)r=r.db
else{r=this.d
if(r.length===0)r=1/0
else{s=A.f(r)
s=new A.Q(r,s.h("i(1)").a(new A.ez()),s.h("Q<1,i>")).ae(0,B.A)
r=s}}return r}}
A.ez.prototype={
$1(a){return t.O.a(a).b},
$S:64}
A.iv.prototype={
dA(c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7=this,b8="marchSpeed",b9=b7.a,c0=c3.a,c1=b9.u(c0),c2=A.d([],t.D)
for(s=b9.r,r=s.length,q=c3.e,p=c3.f,o=b7.b,n=o.b,o=o.w.b,m=q.a,l=q.b,k=c3.ay,j=c3.b,i=0;i<r;++i){h=s[i]
if(h.b!==j){g=h.as
g=g===B.f||g===B.e||h.f<=0}else g=!0
if(g)continue
if(h.a===k){B.a.m(c2,new A.a2(h,0,1))
continue}if(h.fy)continue
g=h.z
f=g.E(q)
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
a4=new A.w(g.a+b/a0*a3,g.b+a/a0*a3)
if(p.a0(a4).E(a4)>48)continue}d=n.i(0,b8)
d.toString
a5=A.nq(q,o,e,d,p,g,new A.iw(b7),c)
if(a5==null)continue
if(h.as===B.i||a1)g=0.35
else if(a2>0.8)g=1
else g=f<72?0.9:0.55
B.a.m(c2,new A.a2(h,a5,g))}B.a.A(c2,new A.ix())
c0=A.f(c1)
r=t.r
a6=A.aI(new A.b(c1,c0.h("e(1)").a(new A.iy(c3)),c0.h("b<1>")),r)
q=A.d([],t.e)
if(a6!=null)q.push(a6)
c0=c0.h("L<1>")
B.a.F(q,new A.L(c1,c0).bz(0,c0.h("e(k.E)").a(new A.iz(a6))))
c0=t.S
a7=A.a_(q,0,A.Y(c3.gag(),"count",c0),r).af(0)
a8=A.S(t.N,c0)
a9=B.a.ar(b9.w,new A.iA(c3)).c
for(b9=a7.length,i=0;c0=a7.length,i<c0;a7.length===b9||(0,A.v)(a7),++i){b0=a7[i]
if(b0.as===B.e)b1=0
else{c0=n.i(0,"soldierLimit")
c0.toString
b1=Math.min(a9,B.b.k(c0)-b0.gP())}a9-=b1
a8.B(0,b0.a,b0.gP()+b1)}b9=c2.length
b2=null
if(b9!==0&&c0!==0)for(c0=c3.cy,r=c3.at,q=c3.ax,p=r==null,o=b7.d,n=c3.d,b3=0;b3<a7.length;++b3,b9=l){b4=a7[b3]
for(m=b4.a,b5=null,i=0;l=c2.length,i<l;c2.length===b9||(0,A.v)(c2),++i){l=c2[i].a
if(p)k=n
else{k=c0?1:0
k=B.c.v(r-q-k,0,5)}b6=o.bk(b4,l,l.ok,Math.max(1,k-b3),!1,a8.i(0,m))
if(b5==null||b6.b<b5.b)b5=b6}if(b2==null||b5.b>b2.b)b2=b5}b9=A.f(s)
return new A.ar(c3,c2,b2,new A.b(s,b9.h("e(1)").a(new A.iB(c3)),b9.h("b<1>")).G(0,0,new A.iC(),t.i))}}
A.iw.prototype={
$2(a,b){var s=this.a,r=s.c,q=r.W(a,b)
if(!isFinite(q)&&r.c.e){r=a.E(b)
s=s.b.b.i(0,"marchSpeed")
s.toString
s=r/s}else s=q
return s},
$S:65}
A.ix.prototype={
$2(a,b){var s,r=t.O
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.p.t(a.a.a,b.a.a):B.b.t(r,s)},
$S:66}
A.iy.prototype={
$1(a){return t.r.a(a).a===this.a.ch},
$S:0}
A.iz.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.iA.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:8}
A.iB.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=!1
if(a.b===s.b)if(a.c===s.a){s=a.as
s=!(s===B.f||s===B.e)&&!a.fy}else s=r
else s=r
return s},
$S:0}
A.iC.prototype={
$2(a,b){return A.an(a)+A.a4(t.r.a(b))},
$S:24}
A.ev.prototype={
X(){var s=this,r=s.b
if(r>=s.a.db){s.e=!0
return!1}s.b=r+1
return!0},
d_(){var s=this,r=s.c
if(r>=s.a.dx){s.e=!0
return!1}s.c=r+1
return!0},
dB(){var s=this,r=s.d
if(r>=s.a.dy){s.e=!0
return!1}s.d=r+1
return!0}}
A.jn.prototype={
$1(a){A.J(a)
return A.j6(v.G.self).postMessage(a)},
$S:67}
A.jo.prototype={
$1(a){return this.a.du(A.J(A.j6(a).data))},
$S:68};(function aliases(){var s=J.aW.prototype
s.cr=s.q
s=A.a.prototype
s.bz=s.dI})();(function installTearOffs(){var s=hunkHelpers._static_0,r=hunkHelpers._static_1,q=hunkHelpers.installStaticTearOff
s(A,"mX","lR",5)
r(A,"nd","m3",17)
r(A,"ne","m4",17)
r(A,"nf","m5",17)
s(A,"kN","n7",3)
r(A,"ni","mB",20)
r(A,"ng","nG",0)
q(A,"nB",2,null,["$1$2","$2"],["kX",function(a,b){return A.kX(a,b,t.H)}],28,0)
q(A,"nA",2,null,["$1$2","$2"],["kW",function(a,b){return A.kW(a,b,t.H)}],28,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.A,null)
q(A.A,[A.jA,J.cS,A.ce,J.b4,A.D,A.is,A.a,A.o,A.c4,A.R,A.bW,A.bc,A.bU,A.cj,A.K,A.al,A.bu,A.bO,A.ck,A.a6,A.iD,A.hv,A.bV,A.cq,A.F,A.hp,A.b9,A.ai,A.c3,A.au,A.dj,A.j3,A.j1,A.df,A.aP,A.aq,A.be,A.X,A.dg,A.dp,A.cw,A.bx,A.dm,A.bh,A.C,A.cv,A.cK,A.cM,A.iX,A.cN,A.dh,A.d6,A.cf,A.iJ,A.aG,A.ab,A.ac,A.dq,A.it,A.by,A.aY,A.ey,A.aF,A.eA,A.bN,A.eD,A.cE,A.aw,A.eH,A.a7,A.fw,A.w,A.ek,A.p,A.M,A.b3,A.ec,A.hx,A.cb,A.hI,A.y,A.a5,A.E,A.bR,A.en,A.em,A.hW,A.bp,A.eo,A.ap,A.eu,A.eb,A.ew,A.a2,A.ar,A.iv,A.ev])
q(J.cS,[J.cU,J.bY,J.c_,J.bZ,J.c0,J.br,J.b7])
q(J.c_,[J.aW,J.t,A.bv,A.c7])
q(J.aW,[J.d7,J.bz,J.aV])
r(J.cT,A.ce)
r(J.hk,J.t)
q(J.br,[J.bX,J.cV])
q(A.D,[A.c2,A.aM,A.cW,A.de,A.da,A.di,A.c1,A.cG,A.aB,A.ci,A.dd,A.cg,A.cL])
q(A.a,[A.r,A.at,A.b,A.aT,A.bb,A.bA,A.bg,A.ax])
q(A.r,[A.k,A.a8,A.a9,A.b8])
q(A.k,[A.u,A.Q,A.L,A.dl])
r(A.bS,A.at)
r(A.bT,A.bb)
q(A.al,[A.bB,A.bC,A.bj])
r(A.bD,A.bB)
r(A.aZ,A.bC)
q(A.bj,[A.aO,A.bE])
r(A.bG,A.bu)
r(A.ch,A.bG)
r(A.bP,A.ch)
r(A.bQ,A.bO)
q(A.a6,[A.cR,A.cI,A.cJ,A.dc,A.jj,A.jl,A.iG,A.iF,A.j7,A.iT,A.hs,A.dy,A.dX,A.dA,A.ea,A.e4,A.e5,A.e6,A.e7,A.e2,A.dD,A.dE,A.dI,A.dH,A.dJ,A.dK,A.dL,A.dN,A.dP,A.dQ,A.dU,A.dT,A.dV,A.dB,A.dZ,A.e0,A.eB,A.f8,A.f9,A.fq,A.fr,A.fs,A.ft,A.fu,A.fb,A.fd,A.fh,A.fk,A.fm,A.fo,A.eR,A.eS,A.eU,A.eV,A.eW,A.eN,A.eP,A.eQ,A.f0,A.f1,A.f5,A.f7,A.eZ,A.f_,A.eY,A.eJ,A.eM,A.eI,A.hg,A.hh,A.hf,A.hi,A.hd,A.hc,A.he,A.hb,A.fx,A.fz,A.fV,A.fX,A.fZ,A.h0,A.fA,A.h2,A.fC,A.fE,A.fG,A.fI,A.fL,A.fN,A.fP,A.fR,A.fS,A.fT,A.fW,A.h8,A.ha,A.h3,A.h4,A.h6,A.h7,A.dx,A.ei,A.ej,A.ef,A.ee,A.eh,A.ed,A.hy,A.hD,A.hF,A.hG,A.hE,A.hB,A.hC,A.hA,A.hL,A.hJ,A.hO,A.hQ,A.hR,A.hM,A.hN,A.jd,A.jq,A.jr,A.hZ,A.i0,A.hY,A.hX,A.io,A.im,A.iq,A.ir,A.i2,A.i5,A.i7,A.i9,A.ia,A.ie,A.ih,A.ij,A.ep,A.er,A.et,A.js,A.jt,A.ez,A.iy,A.iz,A.iA,A.iB,A.jn,A.jo])
r(A.b6,A.cR)
q(A.cI,[A.hT,A.iH,A.iI,A.j2,A.hj,A.iK,A.iP,A.iO,A.iM,A.iL,A.iS,A.iR,A.iQ,A.j0,A.ja,A.dz,A.e9,A.dW,A.dC,A.fi,A.hz,A.hS,A.je])
r(A.c9,A.aM)
q(A.dc,[A.db,A.bq])
q(A.F,[A.aJ,A.dk])
q(A.cJ,[A.hl,A.jk,A.j8,A.jb,A.iU,A.hq,A.hu,A.iY,A.e8,A.e3,A.dF,A.dG,A.dM,A.dO,A.dR,A.dS,A.dY,A.e_,A.e1,A.eC,A.eE,A.eF,A.ji,A.fa,A.fl,A.fp,A.fv,A.fc,A.fe,A.ff,A.fg,A.fj,A.fn,A.eT,A.eX,A.eO,A.f2,A.f3,A.f4,A.f6,A.eK,A.eL,A.fy,A.fK,A.fY,A.h_,A.h1,A.fB,A.fD,A.fF,A.fH,A.fJ,A.fM,A.fO,A.fQ,A.fU,A.h9,A.h5,A.dw,A.eg,A.hH,A.hK,A.hP,A.i_,A.ib,A.ik,A.il,A.ip,A.i1,A.i3,A.i4,A.i6,A.i8,A.ic,A.id,A.ig,A.ii,A.eq,A.es,A.ju,A.iw,A.ix,A.iC])
q(A.c7,[A.cY,A.bw])
q(A.bw,[A.cl,A.cn])
r(A.cm,A.cl)
r(A.c5,A.cm)
r(A.co,A.cn)
r(A.c6,A.co)
q(A.c5,[A.cZ,A.d_])
q(A.c6,[A.d0,A.d1,A.d2,A.d3,A.d4,A.c8,A.d5])
r(A.bF,A.di)
r(A.dn,A.cw)
r(A.cp,A.bx)
r(A.av,A.cp)
r(A.cX,A.c1)
r(A.hm,A.cK)
q(A.cM,[A.ho,A.hn])
r(A.iW,A.iX)
q(A.aB,[A.cc,A.cQ])
q(A.dh,[A.b5,A.ak,A.aE,A.ao])
s(A.cl,A.C)
s(A.cm,A.K)
s(A.cn,A.C)
s(A.co,A.K)
s(A.bG,A.cv)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{c:"int",i:"double",a1:"num",I:"String",e:"bool",ac:"Null",q:"List",A:"Object",aa:"Map",N:"JSObject"},mangledNames:{},types:["e(p)","e(M)","c(p,p)","~()","c(M,M)","c()","c(c)","c(c,M)","e(b3)","c(c,p)","e(a2)","e(a5)","i(a1,i)","e(i)","p(p,p)","c(c,E)","e(c)","~(~())","e(ap)","c(ap,ap)","@(@)","ac(@)","~(A?,A?)","c(c,c)","i(i,p)","ac()","e(E)","e(y)","0^(0^,0^)<a1>","p(a2)","q<a5>(E)","p?(y)","e(w,w)","i(p)","ac(A,aX)","c(aw,aw)","ac(@,aX)","+(w,i)(M)","q<y>(E)","+(w,e)(p)","~(c,@)","i(i,M)","ac(~())","e(a7)","~(@,@)","@(I)","@(@,I)","c(c,aY)","~(@)","e()","a1(a1,c)","i(M)","i(a1,p)","i(i,I)","q<p>()","c(M)","+breakthrough,lower,teamSize,upper(e,i,c,i)()","e(+(w,i))","e(+(w,e))","e(aF{civilian:e})","~(aF,q<y>,I,M{hero:p?})","i(i,i,c)","e(ar)","c(ar,ar)","i(a2)","i(w,w)","c(a2,a2)","~(I)","~(N)","i(i,w)","i(i,a5)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.bD&&a.b(c.a)&&b.b(c.b),"3;":(a,b,c)=>d=>d instanceof A.aZ&&a.b(d.a)&&b.b(d.b)&&c.b(d.c),"4;breakthrough,lower,teamSize,upper":a=>b=>b instanceof A.aO&&A.kZ(a,b.a),"4;high,low,selfHigh,selfLow":a=>b=>b instanceof A.bE&&A.kZ(a,b.a)}}
A.mp(v.typeUniverse,JSON.parse('{"aV":"aW","d7":"aW","bz":"aW","nL":"bv","cU":{"e":[],"B":[]},"bY":{"B":[]},"c_":{"N":[]},"aW":{"N":[]},"t":{"q":["1"],"r":["1"],"N":[],"a":["1"]},"cT":{"ce":[]},"hk":{"t":["1"],"q":["1"],"r":["1"],"N":[],"a":["1"]},"b4":{"H":["1"]},"br":{"i":[],"a1":[]},"bX":{"i":[],"c":[],"a1":[],"B":[]},"cV":{"i":[],"a1":[],"B":[]},"b7":{"I":[],"B":[]},"c2":{"D":[]},"r":{"a":["1"]},"k":{"r":["1"],"a":["1"]},"u":{"k":["1"],"r":["1"],"a":["1"],"a.E":"1","k.E":"1"},"o":{"H":["1"]},"at":{"a":["2"],"a.E":"2"},"bS":{"at":["1","2"],"r":["2"],"a":["2"],"a.E":"2"},"c4":{"H":["2"]},"Q":{"k":["2"],"r":["2"],"a":["2"],"a.E":"2","k.E":"2"},"b":{"a":["1"],"a.E":"1"},"R":{"H":["1"]},"aT":{"a":["2"],"a.E":"2"},"bW":{"H":["2"]},"bb":{"a":["1"],"a.E":"1"},"bT":{"bb":["1"],"r":["1"],"a":["1"],"a.E":"1"},"bc":{"H":["1"]},"bU":{"H":["1"]},"bA":{"a":["1"],"a.E":"1"},"cj":{"H":["1"]},"L":{"k":["1"],"r":["1"],"a":["1"],"a.E":"1","k.E":"1"},"bD":{"bB":[],"al":[]},"aZ":{"bC":[],"al":[]},"aO":{"bj":[],"al":[]},"bE":{"bj":[],"al":[]},"bP":{"ch":["1","2"],"bG":["1","2"],"bu":["1","2"],"cv":["1","2"],"aa":["1","2"]},"bO":{"aa":["1","2"]},"bQ":{"bO":["1","2"],"aa":["1","2"]},"bg":{"a":["1"],"a.E":"1"},"ck":{"H":["1"]},"cR":{"a6":[],"aH":[]},"b6":{"a6":[],"aH":[]},"c9":{"aM":[],"D":[]},"cW":{"D":[]},"de":{"D":[]},"cq":{"aX":[]},"a6":{"aH":[]},"cI":{"a6":[],"aH":[]},"cJ":{"a6":[],"aH":[]},"dc":{"a6":[],"aH":[]},"db":{"a6":[],"aH":[]},"bq":{"a6":[],"aH":[]},"da":{"D":[]},"aJ":{"F":["1","2"],"ke":["1","2"],"aa":["1","2"],"F.K":"1","F.V":"2"},"a8":{"r":["1"],"a":["1"],"a.E":"1"},"b9":{"H":["1"]},"a9":{"r":["1"],"a":["1"],"a.E":"1"},"ai":{"H":["1"]},"b8":{"r":["ab<1,2>"],"a":["ab<1,2>"],"a.E":"ab<1,2>"},"c3":{"H":["ab<1,2>"]},"bB":{"al":[]},"bC":{"al":[]},"bj":{"al":[]},"bv":{"N":[],"B":[]},"c7":{"N":[]},"cY":{"N":[],"B":[]},"bw":{"ah":["1"],"N":[]},"c5":{"C":["i"],"q":["i"],"ah":["i"],"r":["i"],"N":[],"a":["i"],"K":["i"]},"c6":{"C":["c"],"q":["c"],"ah":["c"],"r":["c"],"N":[],"a":["c"],"K":["c"]},"cZ":{"C":["i"],"q":["i"],"ah":["i"],"r":["i"],"N":[],"a":["i"],"K":["i"],"B":[],"C.E":"i","K.E":"i"},"d_":{"C":["i"],"q":["i"],"ah":["i"],"r":["i"],"N":[],"a":["i"],"K":["i"],"B":[],"C.E":"i","K.E":"i"},"d0":{"C":["c"],"q":["c"],"ah":["c"],"r":["c"],"N":[],"a":["c"],"K":["c"],"B":[],"C.E":"c","K.E":"c"},"d1":{"C":["c"],"q":["c"],"ah":["c"],"r":["c"],"N":[],"a":["c"],"K":["c"],"B":[],"C.E":"c","K.E":"c"},"d2":{"C":["c"],"q":["c"],"ah":["c"],"r":["c"],"N":[],"a":["c"],"K":["c"],"B":[],"C.E":"c","K.E":"c"},"d3":{"C":["c"],"q":["c"],"ah":["c"],"r":["c"],"N":[],"a":["c"],"K":["c"],"B":[],"C.E":"c","K.E":"c"},"d4":{"C":["c"],"q":["c"],"ah":["c"],"r":["c"],"N":[],"a":["c"],"K":["c"],"B":[],"C.E":"c","K.E":"c"},"c8":{"C":["c"],"q":["c"],"ah":["c"],"r":["c"],"N":[],"a":["c"],"K":["c"],"B":[],"C.E":"c","K.E":"c"},"d5":{"jI":[],"C":["c"],"q":["c"],"ah":["c"],"r":["c"],"N":[],"a":["c"],"K":["c"],"B":[],"C.E":"c","K.E":"c"},"di":{"D":[]},"bF":{"aM":[],"D":[]},"aP":{"H":["1"]},"ax":{"a":["1"],"a.E":"1"},"aq":{"D":[]},"X":{"aU":["1"]},"cw":{"ko":[]},"dn":{"cw":[],"ko":[]},"av":{"bx":["1"],"kg":["1"],"jF":["1"],"r":["1"],"a":["1"]},"bh":{"H":["1"]},"F":{"aa":["1","2"]},"bu":{"aa":["1","2"]},"ch":{"bG":["1","2"],"bu":["1","2"],"cv":["1","2"],"aa":["1","2"]},"bx":{"jF":["1"],"r":["1"],"a":["1"]},"cp":{"bx":["1"],"jF":["1"],"r":["1"],"a":["1"]},"dk":{"F":["I","@"],"aa":["I","@"],"F.K":"I","F.V":"@"},"dl":{"k":["I"],"r":["I"],"a":["I"],"a.E":"I","k.E":"I"},"c1":{"D":[]},"cX":{"D":[]},"i":{"a1":[]},"c":{"a1":[]},"q":{"r":["1"],"a":["1"]},"dh":{"cO":[]},"cG":{"D":[]},"aM":{"D":[]},"aB":{"D":[]},"cc":{"D":[]},"cQ":{"D":[]},"ci":{"D":[]},"dd":{"D":[]},"cg":{"D":[]},"cL":{"D":[]},"d6":{"D":[]},"cf":{"D":[]},"dq":{"aX":[]},"by":{"lY":[]},"b5":{"cO":[]},"ak":{"cO":[]},"aE":{"cO":[]},"ao":{"cO":[]},"lI":{"q":["c"],"r":["c"],"a":["c"]},"jI":{"q":["c"],"r":["c"],"a":["c"]},"m1":{"q":["c"],"r":["c"],"a":["c"]},"lG":{"q":["c"],"r":["c"],"a":["c"]},"m_":{"q":["c"],"r":["c"],"a":["c"]},"lH":{"q":["c"],"r":["c"],"a":["c"]},"m0":{"q":["c"],"r":["c"],"a":["c"]},"lD":{"q":["i"],"r":["i"],"a":["i"]},"lE":{"q":["i"],"r":["i"],"a":["i"]}}'))
A.mo(v.typeUniverse,JSON.parse('{"r":1,"bw":1,"cp":1,"cK":2,"cM":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.cA
return{T:s("y"),q:s("M"),I:s("E"),t:s("b3"),a9:s("aE"),r:s("p"),c1:s("w"),bJ:s("bp"),o:s("ap"),J:s("a5"),u:s("aq"),h:s("ar"),cM:s("bN"),cs:s("a7"),U:s("r<@>"),V:s("D"),fB:s("aT<E,y>"),E:s("aT<E,a5>"),k:s("aH"),O:s("a2"),bL:s("b6<i>"),fj:s("a<y>(E)"),fy:s("a<M>"),ef:s("a<p>"),W:s("a<a5>(E)"),R:s("a<@>"),w:s("t<y>"),Y:s("t<M>"),Z:s("t<E>"),eu:s("t<b3>"),e:s("t<p>"),_:s("t<w>"),b8:s("t<ap>"),m:s("t<a5>"),bz:s("t<ar>"),D:s("t<a2>"),a5:s("t<q<w>>"),eG:s("t<q<A>>"),b:s("t<q<i>>"),p:s("t<q<c>>"),d:s("t<aa<I,A?>>"),Q:s("t<A>"),eV:s("t<+(aF,q<y>,q<p>)>"),s:s("t<I>"),aD:s("t<aY>"),bQ:s("t<aw>"),n:s("t<i>"),gn:s("t<@>"),a:s("t<c>"),v:s("bY"),A:s("N"),cj:s("aV"),aU:s("ah<@>"),f3:s("q<y>"),bd:s("q<p>"),j:s("q<@>"),L:s("q<c>"),d1:s("aa<I,@>"),f:s("aa<@,@>"),G:s("aa<I,A?>"),P:s("ac"),K:s("A"),gT:s("nM"),bY:s("+()"),fg:s("+(w,e)"),cJ:s("+(w,i)"),fR:s("+(aF,q<y>,q<p>)"),l:s("aX"),N:s("I"),aQ:s("u<aw>"),gf:s("aY"),dm:s("B"),eK:s("aM"),ak:s("bz"),eO:s("b<p>"),eq:s("b<i>"),cO:s("bA<p>"),c:s("X<@>"),dp:s("aw"),dT:s("ax<a7>"),gL:s("ax<c>"),y:s("e"),aO:s("e(p)"),al:s("e(A)"),db:s("e(i)"),i:s("i"),z:s("@"),fO:s("@()"),B:s("@(A)"),C:s("@(A,aX)"),S:s("c"),dg:s("p?"),eH:s("aU<ac>?"),an:s("N?"),bM:s("q<@>?"),eg:s("q<c>?"),X:s("A?"),dk:s("I?"),F:s("be<@,@>?"),g:s("dm?"),fQ:s("e?"),cD:s("i?"),h6:s("c?"),cg:s("a1?"),H:s("a1"),x:s("~"),M:s("~()"),cA:s("~(I,@)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.a9=J.cS.prototype
B.a=J.t.prototype
B.c=J.bX.prototype
B.b=J.br.prototype
B.p=J.b7.prototype
B.aa=J.aV.prototype
B.ab=J.c_.prototype
B.N=J.d7.prototype
B.B=J.bz.prototype
B.m=new A.ao(0,"upgrade")
B.v=new A.ao(1,"dismiss")
B.w=new A.ao(2,"recruit")
B.n=new A.ao(3,"soldiers")
B.C=new A.ao(4,"buyWeapon")
B.D=new A.ao(5,"dispatch")
B.O=new A.ao(6,"move")
B.P=new A.ao(8,"retreat")
B.f=new A.ak(0,"garrison")
B.i=new A.ak(2,"camped")
B.x=new A.ak(3,"queue")
B.E=new A.ak(4,"attacking")
B.e=new A.ak(5,"defending")
B.t=new A.ak(7,"retreating")
B.F=new A.aE(0,"full")
B.G=new A.aE(1,"resources")
B.y=new A.aE(2,"defense")
B.o=new A.aE(3,"attack")
B.M=s([],t._)
B.u=new A.bp(B.M,1/0,!1)
B.S=new A.bp(B.M,1/0,!1)
B.as=new A.cE(4,24,6,1.5,10,12,0.65,3,0.5,0.25,45,15,0.8,45,25,90,-0.15,10,3,1,96,160,6000,8,24,4,6,8,2,0,1,0.3,20,900,64,0.25,8,0.06,0.12,0.35,0.05,2500,2,20)
B.z=new A.b6(A.nA(),t.bL)
B.A=new A.b6(A.nB(),t.bL)
B.H=new A.cN()
B.T=new A.bU(A.cA("bU<0&>"))
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

B.j=new A.hm()
B.a_=new A.d6()
B.l=new A.is()
B.k=new A.dn()
B.a0=new A.dq()
B.h=new A.b5(0,"favorable")
B.a1=new A.b5(1,"close")
B.r=new A.b5(2,"unfavorable")
B.K=new A.b5(3,"unknown")
B.at=s(["\u9759\u6001\u8bc4\u4f30\u914d\u989d\u8017\u5c3d"],t.s)
B.a2=new A.bN(B.K,-1,1,0,0,!1)
B.a3=new A.aG("AI \u534f\u8bae\u7248\u672c\u4e0d\u5339\u914d")
B.a4=new A.aG("AI \u6784\u5efa\u7248\u672c\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u751f\u6210 Worker")
B.a5=new A.aG("\u672a\u77e5 AI \u5de5\u4f5c\u547d\u4ee4")
B.a6=new A.aG("AI \u5730\u56fe\u5c3a\u5bf8\u65e0\u6548")
B.a7=new A.aG("\u56fd\u5bb6\u89c4\u5212\u9759\u6001\u7248\u672c\u4e0d\u5339\u914d")
B.a8=new A.aG("\u56fd\u5bb6\u89c2\u5bdf\u8d85\u51fa\u534f\u8bae\u5bb9\u91cf")
B.ac=new A.hn(null)
B.ad=new A.ho(null)
B.Q=new A.ak(1,"marching")
B.R=new A.ak(6,"field")
B.L=s([B.f,B.Q,B.i,B.x,B.E,B.e,B.R,B.t],A.cA("t<ak>"))
B.ae=s([B.F,B.G,B.y,B.o],A.cA("t<aE>"))
B.af=s([],t.Z)
B.au=s([],t.b8)
B.q=s([],t.m)
B.d=s([],t.a)
B.ag=A.aA("nH")
B.ah=A.aA("nI")
B.ai=A.aA("lD")
B.aj=A.aA("lE")
B.ak=A.aA("lG")
B.al=A.aA("lH")
B.am=A.aA("lI")
B.an=A.aA("A")
B.ao=A.aA("m_")
B.ap=A.aA("m0")
B.aq=A.aA("m1")
B.ar=A.aA("jI")})();(function staticFields(){$.iV=null
$.aj=A.d([],t.Q)
$.kh=null
$.hU=0
$.hV=A.mX()
$.k8=null
$.k7=null
$.kR=null
$.kL=null
$.l0=null
$.jg=null
$.jm=null
$.jW=null
$.j_=A.d([],A.cA("t<q<A>?>"))
$.bI=null
$.cy=null
$.cz=null
$.jO=!1
$.P=B.k})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"nK","l3",()=>A.jh("_$dart_dartClosure"))
s($,"nJ","jZ",()=>A.jh("_$dart_dartClosure_dartJSInterop"))
s($,"o0","le",()=>A.d([new J.cT()],A.cA("t<ce>")))
s($,"nP","l4",()=>A.aN(A.iE({
toString:function(){return"$receiver$"}})))
s($,"nQ","l5",()=>A.aN(A.iE({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"nR","l6",()=>A.aN(A.iE(null)))
s($,"nS","l7",()=>A.aN(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nV","la",()=>A.aN(A.iE(void 0)))
s($,"nW","lb",()=>A.aN(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nU","l9",()=>A.aN(A.km(null)))
s($,"nT","l8",()=>A.aN(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"nY","ld",()=>A.aN(A.km(void 0)))
s($,"nX","lc",()=>A.aN(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"nZ","k0",()=>A.m2())
s($,"o_","dv",()=>A.kY(B.an))
s($,"nN","k_",()=>{A.lT()
return $.hU})})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.bv,SharedArrayBuffer:A.bv,ArrayBufferView:A.c7,DataView:A.cY,Float32Array:A.cZ,Float64Array:A.d_,Int16Array:A.d0,Int32Array:A.d1,Int8Array:A.d2,Uint16Array:A.d3,Uint32Array:A.d4,Uint8ClampedArray:A.c8,CanvasPixelArray:A.c8,Uint8Array:A.d5})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bw.$nativeSuperclassTag="ArrayBufferView"
A.cl.$nativeSuperclassTag="ArrayBufferView"
A.cm.$nativeSuperclassTag="ArrayBufferView"
A.c5.$nativeSuperclassTag="ArrayBufferView"
A.cn.$nativeSuperclassTag="ArrayBufferView"
A.co.$nativeSuperclassTag="ArrayBufferView"
A.c6.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.ny
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()