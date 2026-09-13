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
if(a[b]!==s){A.nB(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.c(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.jN(b)
return new s(c,this)}:function(){if(s===null)s=A.jN(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.jN(a).prototype
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
jS(a,b,c,d){return{i:a,p:b,e:c,x:d}},
jO(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.jQ==null){A.no()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.f(A.km("Return interceptor for "+A.t(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.iR
if(o==null)o=$.iR=A.je(n)
p=q[o]}if(p!=null)return p
p=A.nu(a)
if(p!=null)return p
if(typeof a=="function")return B.ah
s=Object.getPrototypeOf(a)
if(s==null)return B.N
if(s===Object.prototype)return B.N
if(typeof q=="function"){o=$.iR
if(o==null)o=$.iR=A.je(n)
Object.defineProperty(q,o,{value:B.z,enumerable:false,writable:true,configurable:true})
return B.z}return B.z},
lF(a,b){if(a<0||a>4294967295)throw A.f(A.aP(a,0,4294967295,"length",null))
return J.lG(new Array(a),b)},
kb(a,b){if(a<0)throw A.f(A.cX("Length must be a non-negative integer: "+a,null))
return A.c(new Array(a),b.h("r<0>"))},
lG(a,b){var s=A.c(a,b.h("r<0>"))
s.$flags=1
return s},
lH(a,b){var s=t.e8
return J.jY(s.a(a),s.a(b))},
bv(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.c6.prototype
return J.dc.prototype}if(typeof a=="string")return J.bk.prototype
if(a==null)return J.c7.prototype
if(typeof a=="boolean")return J.db.prototype
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b2.prototype
if(typeof a=="symbol")return J.ca.prototype
if(typeof a=="bigint")return J.c8.prototype
return a}if(a instanceof A.z)return a
return J.jO(a)},
aG(a){if(typeof a=="string")return J.bk.prototype
if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b2.prototype
if(typeof a=="symbol")return J.ca.prototype
if(typeof a=="bigint")return J.c8.prototype
return a}if(a instanceof A.z)return a
return J.jO(a)},
aq(a){if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b2.prototype
if(typeof a=="symbol")return J.ca.prototype
if(typeof a=="bigint")return J.c8.prototype
return a}if(a instanceof A.z)return a
return J.jO(a)},
nj(a){if(typeof a=="number")return J.bz.prototype
if(typeof a=="string")return J.bk.prototype
if(a==null)return a
if(!(a instanceof A.z))return J.bG.prototype
return a},
aD(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bv(a).ag(a,b)},
ar(a,b){if(typeof b==="number")if(Array.isArray(a)||A.nt(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.aq(a).i(a,b)},
lb(a,b,c){return J.aq(a).u(a,b,c)},
jW(a,b){return J.aq(a).m(a,b)},
jX(a,b){return J.aq(a).aU(a,b)},
jY(a,b){return J.nj(a).t(a,b)},
cU(a,b){return J.aq(a).M(a,b)},
cV(a){return J.aq(a).gI(a)},
ai(a){return J.bv(a).gS(a)},
dO(a){return J.aG(a).gO(a)},
jZ(a){return J.aG(a).ga7(a)},
A(a){return J.aq(a).gB(a)},
jr(a){return J.aq(a).gT(a)},
N(a){return J.aG(a).gk(a)},
lc(a){return J.bv(a).gU(a)},
ld(a,b){return J.aG(a).sk(a,b)},
dP(a,b){return J.aq(a).a_(a,b)},
aZ(a){return J.bv(a).q(a)},
d9:function d9(){},
db:function db(){},
c7:function c7(){},
c9:function c9(){},
b3:function b3(){},
dr:function dr(){},
bG:function bG(){},
b2:function b2(){},
c8:function c8(){},
ca:function ca(){},
r:function r(a){this.$ti=a},
da:function da(){},
hh:function hh(a){this.$ti=a},
be:function be(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bz:function bz(){},
c6:function c6(){},
dc:function dc(){},
bk:function bk(){}},A={jw:function jw(){},
k8(a,b,c){if(t.Q.b(a))return new A.cx(a,b.h("@<0>").H(c).h("cx<1,2>"))
return new A.bf(a,b.h("@<0>").H(c).h("bf<1,2>"))},
lI(a){return new A.cc("Field '"+a+"' has not been initialized.")},
aR(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
iq(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
X(a,b,c){return a},
jR(a){var s,r
for(s=$.al.length,r=0;r<s;++r)if(a===$.al[r])return!0
return!1},
U(a,b,c,d){A.aQ(b,"start")
if(c!=null){A.aQ(c,"end")
if(b>c)A.aB(A.aP(b,0,c,"start",null))}return new A.E(a,b,c,d.h("E<0>"))},
lK(a,b,c,d){if(t.Q.b(a))return new A.bZ(a,b,c.h("@<0>").H(d).h("bZ<1,2>"))
return new A.bm(a,b,c.h("@<0>").H(d).h("bm<1,2>"))},
lU(a,b,c){var s="takeCount"
A.k3(b,s,t.S)
A.aQ(b,s)
if(t.Q.b(a))return new A.c_(a,b,c.h("c_<0>"))
return new A.bn(a,b,c.h("bn<0>"))},
kj(a,b,c){if(t.Q.b(a)){A.cQ(b)
return void 1}A.cQ(b)
return void 1},
cQ(a){A.k3(a,"count",t.S)
A.aQ(a,"count")
return a},
lA(a,b,c){return new A.bY(a,b,c.h("bY<0>"))},
a_(){return new A.cr("No element")},
b5:function b5(){},
bT:function bT(a,b){this.a=a
this.$ti=b},
bf:function bf(a,b){this.a=a
this.$ti=b},
cx:function cx(a,b){this.a=a
this.$ti=b},
cw:function cw(){},
aJ:function aJ(a,b){this.a=a
this.$ti=b},
cc:function cc(a){this.a=a},
ij:function ij(){},
m:function m(){},
l:function l(){},
E:function E(a,b,c,d){var _=this
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
bm:function bm(a,b,c){this.a=a
this.b=b
this.$ti=c},
bZ:function bZ(a,b,c){this.a=a
this.b=b
this.$ti=c},
cf:function cf(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
I:function I(a,b,c){this.a=a
this.b=b
this.$ti=c},
d:function d(a,b,c){this.a=a
this.b=b
this.$ti=c},
a0:function a0(a,b,c){this.a=a
this.b=b
this.$ti=c},
c3:function c3(a,b,c){this.a=a
this.b=b
this.$ti=c},
c4:function c4(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
bn:function bn(a,b,c){this.a=a
this.b=b
this.$ti=c},
c_:function c_(a,b,c){this.a=a
this.b=b
this.$ti=c},
bo:function bo(a,b,c){this.a=a
this.b=b
this.$ti=c},
co:function co(a,b,c){this.a=a
this.b=b
this.$ti=c},
he:function he(a,b,c){this.a=a
this.b=b
this.$ti=c},
cp:function cp(a,b,c){this.a=a
this.b=b
this.$ti=c},
c0:function c0(a){this.$ti=a},
c1:function c1(a){this.$ti=a},
cu:function cu(a,b){this.a=a
this.$ti=b},
cv:function cv(a,b){this.a=a
this.$ti=b},
c5:function c5(a,b,c){this.a=a
this.b=b
this.$ti=c},
bY:function bY(a,b,c){this.a=a
this.b=b
this.$ti=c},
bj:function bj(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.$ti=c},
K:function K(){},
L:function L(a,b){this.a=a
this.$ti=b},
cO:function cO(){},
jt(a,b,c){var s,r,q,p,o,n,m,l=A.k(a),k=A.ce(new A.a9(a,l.h("a9<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.x)(k),++i,p=o){r=k[i]
c.a(a.i(0,r))
o=p+1
q[r]=p}n=A.ce(new A.Q(a,l.h("Q<2>")),!0,c)
m=new A.bX(q,n,b.h("@<0>").H(c).h("bX<1,2>"))
m.$keys=k
return m}return new A.bW(A.ah(a,b,c),b.h("@<0>").H(c).h("bW<1,2>"))},
kZ(a){var s=A.kY(a)
if(s!=null)return s
return"minified:"+a},
nt(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
t(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.aZ(a)
return s},
ds(a){var s,r=$.kf
if(r==null)r=$.kf=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
lP(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.w(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
dt(a){var s,r,q,p
if(a instanceof A.z)return A.ad(A.aH(a),null)
s=J.bv(a)
if(s===B.ag||s===B.ai||t.ak.b(a)){r=B.I(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.ad(A.aH(a),null)},
kg(a){var s,r,q
if(a==null||typeof a=="number"||A.jI(a))return J.aZ(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a8)return a.q(0)
if(a instanceof A.ay)return a.bV(!0)
s=$.la()
for(r=0;r<1;++r){q=s[r].dH(a)
if(q!=null)return q}return"Instance of '"+A.dt(a)+"'"},
lM(){return Date.now()},
lO(){var s,r
if($.hL!==0)return
$.hL=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
if(!!s.dartUseDateNowForTicks)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.hL=1e6
$.hM=new A.hK(r)},
a5(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.bQ(s,10)|55296)>>>0,s&1023|56320)}throw A.f(A.aP(a,0,1114111,null,null))},
lN(a){var s=a.$thrownJsError
if(s==null)return null
return A.bQ(s)},
w(a,b){if(a==null)J.N(a)
throw A.f(A.jc(a,b))},
jc(a,b){var s,r="index"
if(!A.j5(b))return new A.aE(!0,b,r,null)
s=J.N(a)
if(b<0||b>=s)return A.hg(b,s,a,r)
return new A.cm(null,null,!0,b,r,"Value not in range")},
na(a){return new A.aE(!0,a,null,null)},
kM(a){return a},
f(a){return A.Y(a,new Error())},
Y(a,b){var s
if(a==null)a=new A.aS()
b.dartException=a
s=A.nC
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
nC(){return J.aZ(this.dartException)},
aB(a,b){throw A.Y(a,b==null?new Error():b)},
bb(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.aB(A.my(a,b,c),s)},
my(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.ct("'"+s+"': Cannot "+o+" "+l+k+n)},
x(a){throw A.f(A.a3(a))},
aT(a){var s,r,q,p,o,n
a=A.nz(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.c([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.iz(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
iA(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
kl(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
jx(a,b){var s=b==null,r=s?null:b.method
return new A.dd(a,r,s?null:b.receiver)},
aY(a){var s
if(a==null)return new A.hr(a)
if(a instanceof A.c2){s=a.a
return A.ba(a,s==null?A.cP(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.ba(a,a.dartException)
return A.n8(a)},
ba(a,b){if(t.U.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
n8(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bQ(r,16)&8191)===10)switch(q){case 438:return A.ba(a,A.jx(A.t(s)+" (Error "+q+")",null))
case 445:case 5007:A.t(s)
return A.ba(a,new A.ck())}}if(a instanceof TypeError){p=$.l0()
o=$.l1()
n=$.l2()
m=$.l3()
l=$.l6()
k=$.l7()
j=$.l5()
$.l4()
i=$.l9()
h=$.l8()
g=p.ae(s)
if(g!=null)return A.ba(a,A.jx(A.M(s),g))
else{g=o.ae(s)
if(g!=null){g.method="call"
return A.ba(a,A.jx(A.M(s),g))}else if(n.ae(s)!=null||m.ae(s)!=null||l.ae(s)!=null||k.ae(s)!=null||j.ae(s)!=null||m.ae(s)!=null||i.ae(s)!=null||h.ae(s)!=null){A.M(s)
return A.ba(a,new A.ck())}}return A.ba(a,new A.dz(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.cq()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.ba(a,new A.aE(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.cq()
return a},
bQ(a){var s
if(a instanceof A.c2)return a.b
if(a==null)return new A.cH(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.cH(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
kU(a){if(a==null)return J.ai(a)
if(typeof a=="object")return A.ds(a)
return J.ai(a)},
ni(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.u(0,a[s],a[r])}return b},
mI(a,b,c,d,e,f){t.h.a(a)
switch(A.i(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.f(new A.iF("Unsupported number of arguments for wrapped closure"))},
dM(a,b){var s=a.$identity
if(!!s)return s
s=A.ne(a,b)
a.$identity=s
return s},
ne(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.mI)},
lr(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.dw().constructor.prototype):Object.create(new A.bx(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.k9(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.ln(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.k9(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
ln(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.f("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.ll)}throw A.f("Error in functionType of tearoff")},
lo(a,b,c,d){var s=A.k7
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
k9(a,b,c,d){if(c)return A.lq(a,b,d)
return A.lo(b.length,d,a,b)},
lp(a,b,c,d){var s=A.k7,r=A.lm
switch(b?-1:a){case 0:throw A.f(new A.dv("Intercepted function with no arguments."))
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
if($.k5==null)$.k5=A.k4("interceptor")
if($.k6==null)$.k6=A.k4("receiver")
s=b.length
r=A.lp(s,c,a,b)
return r},
jN(a){return A.lr(a)},
ll(a,b){return A.cL(v.typeUniverse,A.aH(a.a),b)},
k7(a){return a.a},
lm(a){return a.b},
k4(a){var s,r,q,p=new A.bx("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.f(A.cX("Field name "+a+" not found.",null))},
je(a){return v.getIsolateTag(a)},
nu(a){var s,r,q,p,o,n=A.M($.kO.$1(a)),m=$.jd[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.ji[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bL($.kJ.$2(a,n))
if(q!=null){m=$.jd[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.ji[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.jl(s)
$.jd[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.ji[n]=s
return s}if(p==="-"){o=A.jl(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.kW(a,s)
if(p==="*")throw A.f(A.km(n))
if(v.leafTags[n]===true){o=A.jl(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.kW(a,s)},
kW(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.jS(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
jl(a){return J.jS(a,!1,null,!!a.$iaj)},
nw(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.jl(s)
else return J.jS(s,c,null,null)},
no(){if(!0===$.jQ)return
$.jQ=!0
A.np()},
np(){var s,r,q,p,o,n,m,l
$.jd=Object.create(null)
$.ji=Object.create(null)
A.nn()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.kX.$1(o)
if(n!=null){m=A.nw(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
nn(){var s,r,q,p,o,n,m=B.W()
m=A.bO(B.X,A.bO(B.Y,A.bO(B.J,A.bO(B.J,A.bO(B.Z,A.bO(B.a_,A.bO(B.a0(B.I),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.kO=new A.jf(p)
$.kJ=new A.jg(o)
$.kX=new A.jh(n)},
bO(a,b){return a(b)||b},
mc(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.w(b,s)
if(!J.aD(r,b[s]))return!1}return!0},
ng(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
nz(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
aF:function aF(a,b){this.a=a
this.b=b},
cF:function cF(a,b){this.a=a
this.b=b},
bu:function bu(a,b){this.a=a
this.b=b},
az:function az(a){this.a=a},
bW:function bW(a,b){this.a=a
this.$ti=b},
bV:function bV(){},
bX:function bX(a,b,c){this.a=a
this.b=b
this.$ti=c},
cy:function cy(a,b){this.a=a
this.$ti=b},
cz:function cz(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
d8:function d8(){},
aL:function aL(a,b){this.a=a
this.$ti=b},
hK:function hK(a){this.a=a},
cn:function cn(){},
iz:function iz(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
ck:function ck(){},
dd:function dd(a,b,c){this.a=a
this.b=b
this.c=c},
dz:function dz(a){this.a=a},
hr:function hr(a){this.a=a},
c2:function c2(a,b){this.a=a
this.b=b},
cH:function cH(a){this.a=a
this.b=null},
a8:function a8(){},
d_:function d_(){},
d0:function d0(){},
dx:function dx(){},
dw:function dw(){},
bx:function bx(a,b){this.a=a
this.b=b},
dv:function dv(a){this.a=a},
aM:function aM(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hi:function hi(a){this.a=a},
hm:function hm(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
a9:function a9(a,b){this.a=a
this.$ti=b},
bl:function bl(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
Q:function Q(a,b){this.a=a
this.$ti=b},
ak:function ak(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aN:function aN(a,b){this.a=a
this.$ti=b},
cd:function cd(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
jf:function jf(a){this.a=a},
jg:function jg(a){this.a=a},
jh:function jh(a){this.a=a},
ay:function ay(){},
b6:function b6(){},
bH:function bH(){},
mz(a){return a},
aW(a,b,c){if(a>>>0!==a||a>=c)throw A.f(A.jc(b,a))},
bC:function bC(){},
ci:function ci(){},
df:function df(){},
bD:function bD(){},
cg:function cg(){},
ch:function ch(){},
dg:function dg(){},
dh:function dh(){},
di:function di(){},
dj:function dj(){},
dk:function dk(){},
dl:function dl(){},
dm:function dm(){},
cj:function cj(){},
dn:function dn(){},
cB:function cB(){},
cC:function cC(){},
cD:function cD(){},
cE:function cE(){},
jA(a,b){var s=b.c
return s==null?b.c=A.cJ(a,"b0",[b.x]):s},
kh(a){var s=a.w
if(s===6||s===7)return A.kh(a.x)
return s===11||s===12},
lR(a){return a.as},
ny(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
bP(a){return A.j_(v.typeUniverse,a,!1)},
nr(a,b){var s,r,q,p,o
if(a==null)return null
s=b.y
r=a.Q
if(r==null)r=a.Q=new Map()
q=b.as
p=r.get(q)
if(p!=null)return p
o=A.b9(v.typeUniverse,a.x,s,0)
r.set(q,o)
return o},
b9(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.b9(a1,s,a3,a4)
if(r===s)return a2
return A.kv(a1,r,!0)
case 7:s=a2.x
r=A.b9(a1,s,a3,a4)
if(r===s)return a2
return A.ku(a1,r,!0)
case 8:q=a2.y
p=A.bN(a1,q,a3,a4)
if(p===q)return a2
return A.cJ(a1,a2.x,p)
case 9:o=a2.x
n=A.b9(a1,o,a3,a4)
m=a2.y
l=A.bN(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.jF(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bN(a1,j,a3,a4)
if(i===j)return a2
return A.kw(a1,k,i)
case 11:h=a2.x
g=A.b9(a1,h,a3,a4)
f=a2.y
e=A.n5(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.kt(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bN(a1,d,a3,a4)
o=a2.x
n=A.b9(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jG(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.f(A.cZ("Attempted to substitute unexpected RTI kind "+a0))}},
bN(a,b,c,d){var s,r,q,p,o=b.length,n=A.j0(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.b9(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
n6(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.j0(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.b9(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
n5(a,b,c,d){var s,r=b.a,q=A.bN(a,r,c,d),p=b.b,o=A.bN(a,p,c,d),n=b.c,m=A.n6(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dE()
s.a=q
s.b=o
s.c=m
return s},
c(a,b){a[v.arrayRti]=b
return a},
jb(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.nl(s)
return a.$S()}return null},
nq(a,b){var s
if(A.kh(b))if(a instanceof A.a8){s=A.jb(a)
if(s!=null)return s}return A.aH(a)},
aH(a){if(a instanceof A.z)return A.k(a)
if(Array.isArray(a))return A.h(a)
return A.jH(J.bv(a))},
h(a){var s=a[v.arrayRti],r=t.V
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
k(a){var s=a.$ti
return s!=null?s:A.jH(a)},
jH(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.mG(a,s)},
mG(a,b){var s=a instanceof A.a8?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.mm(v.typeUniverse,s.name)
b.$ccache=r
return r},
nl(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.j_(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
nk(a){return A.aX(A.k(a))},
jP(a){var s=A.jb(a)
return A.aX(s==null?A.aH(a):s)},
jL(a){var s
if(a instanceof A.ay)return A.nh(a.$r,a.bd())
s=a instanceof A.a8?A.jb(a):null
if(s!=null)return s
if(t.dm.b(a))return J.lc(a).a
if(Array.isArray(a))return A.h(a)
return A.aH(a)},
aX(a){var s=a.r
return s==null?a.r=new A.iZ(a):s},
nh(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bY
if(0>=p)return A.w(q,0)
s=A.cL(v.typeUniverse,A.jL(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.w(q,r)
s=A.ky(v.typeUniverse,s,A.jL(q[r]))}return A.cL(v.typeUniverse,s,a)},
aC(a){return A.aX(A.j_(v.typeUniverse,a,!1))},
mF(a){var s=this
s.b=A.n3(s)
return s.b(a)},
n3(a){var s,r,q,p,o
if(a===t.K)return A.mO
if(A.bw(a))return A.mS
s=a.w
if(s===6)return A.mD
if(s===1)return A.kF
if(s===7)return A.mJ
r=A.n2(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bw)){a.f="$i"+q
if(q==="p")return A.mM
if(a===t.p)return A.mL
return A.mR}}else if(s===10){p=A.ng(a.x,a.y)
o=p==null?A.kF:p
return o==null?A.cP(o):o}return A.mB},
n2(a){if(a.w===8){if(a===t.S)return A.j5
if(a===t.i||a===t.H)return A.mN
if(a===t.N)return A.mQ
if(a===t.y)return A.jI}return null},
mE(a){var s=this,r=A.mA
if(A.bw(s))r=A.mq
else if(s===t.K)r=A.cP
else if(A.bS(s)){r=A.mC
if(s===t.h6)r=A.V
else if(s===t.dk)r=A.bL
else if(s===t.fQ)r=A.bK
else if(s===t.cg)r=A.a2
else if(s===t.cD)r=A.mo
else if(s===t.an)r=A.mp}else if(s===t.S)r=A.i
else if(s===t.N)r=A.M
else if(s===t.y)r=A.b8
else if(s===t.H)r=A.u
else if(s===t.i)r=A.ap
else if(s===t.p)r=A.j1
s.a=r
return s.a(a)},
mB(a){var s=this
if(a==null)return A.bS(s)
return A.kQ(v.typeUniverse,A.nq(a,s),s)},
mD(a){if(a==null)return!0
return this.x.b(a)},
mR(a){var s,r=this
if(a==null)return A.bS(r)
s=r.f
if(a instanceof A.z)return!!a[s]
return!!J.bv(a)[s]},
mM(a){var s,r=this
if(a==null)return A.bS(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.z)return!!a[s]
return!!J.bv(a)[s]},
mL(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.z)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
kE(a){if(typeof a=="object"){if(a instanceof A.z)return t.p.b(a)
return!0}if(typeof a=="function")return!0
return!1},
mA(a){var s=this
if(a==null){if(A.bS(s))return a}else if(s.b(a))return a
throw A.Y(A.kB(a,s),new Error())},
mC(a){var s=this
if(a==null||s.b(a))return a
throw A.Y(A.kB(a,s),new Error())},
kB(a,b){return new A.bI("TypeError: "+A.ko(a,A.ad(b,null)))},
kN(a,b,c,d){if(A.kQ(v.typeUniverse,a,b))return a
throw A.Y(A.me("The type argument '"+A.ad(a,null)+"' is not a subtype of the type variable bound '"+A.ad(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
ko(a,b){return A.d5(a)+": type '"+A.ad(A.jL(a),null)+"' is not a subtype of type '"+b+"'"},
me(a){return new A.bI("TypeError: "+a)},
ao(a,b){return new A.bI("TypeError: "+A.ko(a,b))},
mJ(a){var s=this
return s.x.b(a)||A.jA(v.typeUniverse,s).b(a)},
mO(a){return a!=null},
cP(a){if(a!=null)return a
throw A.Y(A.ao(a,"Object"),new Error())},
mS(a){return!0},
mq(a){return a},
kF(a){return!1},
jI(a){return!0===a||!1===a},
b8(a){if(!0===a)return!0
if(!1===a)return!1
throw A.Y(A.ao(a,"bool"),new Error())},
bK(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.Y(A.ao(a,"bool?"),new Error())},
ap(a){if(typeof a=="number")return a
throw A.Y(A.ao(a,"double"),new Error())},
mo(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Y(A.ao(a,"double?"),new Error())},
j5(a){return typeof a=="number"&&Math.floor(a)===a},
i(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.Y(A.ao(a,"int"),new Error())},
V(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.Y(A.ao(a,"int?"),new Error())},
mN(a){return typeof a=="number"},
u(a){if(typeof a=="number")return a
throw A.Y(A.ao(a,"num"),new Error())},
a2(a){if(typeof a=="number")return a
if(a==null)return a
throw A.Y(A.ao(a,"num?"),new Error())},
mQ(a){return typeof a=="string"},
M(a){if(typeof a=="string")return a
throw A.Y(A.ao(a,"String"),new Error())},
bL(a){if(typeof a=="string")return a
if(a==null)return a
throw A.Y(A.ao(a,"String?"),new Error())},
j1(a){if(A.kE(a))return a
throw A.Y(A.ao(a,"JSObject"),new Error())},
mp(a){if(a==null)return a
if(A.kE(a))return a
throw A.Y(A.ao(a,"JSObject?"),new Error())},
kH(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.ad(a[q],b)
return s},
mY(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.kH(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.ad(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
kC(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.c([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.m(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.w(a4,l)
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
if(l===8){p=A.n7(a.x)
o=a.y
return o.length>0?p+("<"+A.kH(o,b)+">"):p}if(l===10)return A.mY(a,b)
if(l===11)return A.kC(a,b,null)
if(l===12)return A.kC(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.w(b,n)
return b[n]}return"?"},
n7(a){var s=A.kY(a)
if(s!=null)return s
return"minified:"+a},
mn(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
mm(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.j_(a,b,!1)
else if(typeof m=="number"){s=m
r=A.cK(a,5,"#")
q=A.j0(s)
for(p=0;p<s;++p)q[p]=r
o=A.cJ(a,b,q)
n[b]=o
return o}else return m},
ml(a,b){return A.kz(a.tR,b)},
mk(a,b){return A.kz(a.eT,b)},
j_(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.kx(a,null,b,!1)
r.set(b,s)
return s},
cL(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.kx(a,b,c,!0)
q.set(c,r)
return r},
ky(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.jF(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
kx(a,b,c,d){return A.ma(A.m4(a,b,c,d))},
b7(a,b){b.a=A.mE
b.b=A.mF
return b},
cK(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.aw(null,null)
s.w=b
s.as=c
r=A.b7(a,s)
a.eC.set(c,r)
return r},
kv(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.mi(a,b,r,c)
a.eC.set(r,s)
return s},
mi(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bw(b))if(!(b===t.P||b===t.v))if(s!==6)r=s===7&&A.bS(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.aw(null,null)
q.w=6
q.x=b
q.as=c
return A.b7(a,q)},
ku(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.mg(a,b,r,c)
a.eC.set(r,s)
return s},
mg(a,b,c,d){var s,r
if(d){s=b.w
if(A.bw(b)||b===t.K)return b
else if(s===1)return A.cJ(a,"b0",[b])
else if(b===t.P||b===t.v)return t.eH}r=new A.aw(null,null)
r.w=7
r.x=b
r.as=c
return A.b7(a,r)},
mj(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.aw(null,null)
s.w=13
s.x=b
s.as=q
r=A.b7(a,s)
a.eC.set(q,r)
return r},
cI(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
mf(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
cJ(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.cI(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.aw(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.b7(a,r)
a.eC.set(p,q)
return q},
jF(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.cI(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.aw(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.b7(a,o)
a.eC.set(q,n)
return n},
kw(a,b,c){var s,r,q="+"+(b+"("+A.cI(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.aw(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.b7(a,s)
a.eC.set(q,r)
return r},
kt(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.cI(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.cI(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.mf(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.aw(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.b7(a,p)
a.eC.set(r,o)
return o},
jG(a,b,c,d){var s,r=b.as+("<"+A.cI(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.mh(a,b,c,r,d)
a.eC.set(r,s)
return s},
mh(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.j0(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.b9(a,b,r,0)
m=A.bN(a,c,r,0)
return A.jG(a,n,m,c!==m)}}l=new A.aw(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.b7(a,l)},
m4(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
ma(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.m6(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.kq(a,r,l,k,!1)
else if(q===46)r=A.kq(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bt(a.u,a.e,k.pop()))
break
case 94:k.push(A.mj(a.u,k.pop()))
break
case 35:k.push(A.cK(a.u,5,"#"))
break
case 64:k.push(A.cK(a.u,2,"@"))
break
case 126:k.push(A.cK(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.m8(a,k)
break
case 38:A.m7(a,k)
break
case 63:p=a.u
k.push(A.kv(p,A.bt(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.ku(p,A.bt(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.m5(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.kr(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.mb(a.u,a.e,o)
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
return A.bt(a.u,a.e,m)},
m6(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
kq(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.mn(s,o.x)[p]
if(n==null)A.aB('No "'+p+'" in "'+A.lR(o)+'"')
d.push(A.cL(s,o,n))}else d.push(p)
return m},
m8(a,b){var s,r=a.u,q=A.kp(a,b),p=b.pop()
if(typeof p=="string")b.push(A.cJ(r,p,q))
else{s=A.bt(r,a.e,p)
switch(s.w){case 11:b.push(A.jG(r,s,q,a.n))
break
default:b.push(A.jF(r,s,q))
break}}},
m5(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.kp(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bt(p,a.e,o)
q=new A.dE()
q.a=s
q.b=n
q.c=m
b.push(A.kt(p,r,q))
return
case-4:b.push(A.kw(p,b.pop(),s))
return
default:throw A.f(A.cZ("Unexpected state under `()`: "+A.t(o)))}},
m7(a,b){var s=b.pop()
if(0===s){b.push(A.cK(a.u,1,"0&"))
return}if(1===s){b.push(A.cK(a.u,4,"1&"))
return}throw A.f(A.cZ("Unexpected extended operation "+A.t(s)))},
kp(a,b){var s=b.splice(a.p)
A.kr(a.u,a.e,s)
a.p=b.pop()
return s},
bt(a,b,c){if(typeof c=="string")return A.cJ(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.m9(a,b,c)}else return c},
kr(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bt(a,b,c[s])},
mb(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bt(a,b,c[s])},
m9(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.f(A.cZ("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.f(A.cZ("Bad index "+c+" for "+b.q(0)))},
kQ(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.W(a,b,null,c,null)
r.set(c,s)}return s},
W(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bw(d))return!0
s=b.w
if(s===4)return!0
if(A.bw(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.W(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.v){if(q===7)return A.W(a,b,c,d.x,e)
return d===p||d===t.v||q===6}if(d===t.K){if(s===7)return A.W(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.W(a,b.x,c,d,e))return!1
return A.W(a,A.jA(a,b),c,d,e)}if(s===6)return A.W(a,p,c,d,e)&&A.W(a,b.x,c,d,e)
if(q===7){if(A.W(a,b,c,d.x,e))return!0
return A.W(a,b,c,A.jA(a,d),e)}if(q===6)return A.W(a,b,c,p,e)||A.W(a,b,c,d.x,e)
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
if(!A.W(a,j,c,i,e)||!A.W(a,i,e,j,c))return!1}return A.kD(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.kD(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.mK(a,b,c,d,e)}if(o&&q===10)return A.mP(a,b,c,d,e)
return!1},
kD(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.W(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.W(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.W(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.W(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.W(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
mK(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.cL(a,b,r[o])
return A.kA(a,p,null,c,d.y,e)}return A.kA(a,b.y,null,c,d.y,e)},
kA(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.W(a,b[s],d,e[s],f))return!1
return!0},
mP(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.W(a,r[s],c,q[s],e))return!1
return!0},
bS(a){var s=a.w,r=!0
if(!(a===t.P||a===t.v))if(!A.bw(a))if(s!==6)r=s===7&&A.bS(a.x)
return r},
bw(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
kz(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
j0(a){return a>0?new Array(a):v.typeUniverse.sEA},
aw:function aw(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dE:function dE(){this.c=this.b=this.a=null},
iZ:function iZ(a){this.a=a},
dD:function dD(){},
bI:function bI(a){this.a=a},
lZ(){var s,r,q
if(self.scheduleImmediate!=null)return A.nb()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.dM(new A.iC(s),1)).observe(r,{childList:true})
return new A.iB(s,r,q)}else if(self.setImmediate!=null)return A.nc()
return A.nd()},
m_(a){self.scheduleImmediate(A.dM(new A.iD(t.M.a(a)),0))},
m0(a){self.setImmediate(A.dM(new A.iE(t.M.a(a)),0))},
m1(a){A.jC(B.G,t.M.a(a))},
jC(a,b){return A.md(0,b)},
md(a,b){var s=new A.iX()
s.cA(a,b)
return s},
mV(a){return new A.dA(new A.a1($.R,a.h("a1<0>")),a.h("dA<0>"))},
mu(a,b){a.$2(0,null)
b.b=!0
return b.a},
mr(a,b){A.mv(a,b)},
mt(a,b){var s,r,q=b.$ti
q.h("1/?").a(a)
s=a==null?q.c.a(a):a
if(!b.b)b.a.cE(s)
else{r=b.a
if(q.h("b0<1>").b(s))r.bD(s)
else r.bH(s)}},
ms(a,b){var s=A.aY(a),r=A.bQ(a),q=b.b,p=b.a
if(q)p.b7(new A.at(s,r))
else p.bB(new A.at(s,r))},
mv(a,b){var s,r,q=new A.j2(b),p=new A.j3(b)
if(a instanceof A.a1)a.bU(q,p,t.z)
else{s=t.z
if(a instanceof A.a1)a.ck(q,p,s)
else{r=new A.a1($.R,t.c)
r.a=8
r.c=a
r.bU(q,p,s)}}},
n9(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.R.cj(new A.j7(s),t.o,t.S,t.z)},
ks(a,b,c){return 0},
js(a){var s
if(t.U.b(a)){s=a.gaM()
if(s!=null)return s}return B.a2},
lx(a,b){var s
if(!b.b(null))throw A.f(A.eA(null,"computation","The type parameter is not nullable"))
s=new A.a1($.R,b.h("a1<0>"))
A.lV(a,new A.hf(null,s,b))
return s},
iJ(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.lS()
b.bB(new A.at(new A.aE(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bO(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aE()
b.aO(o.a)
A.br(b,p)
return}b.a^=2
A.dL(null,null,b.b,t.M.a(new A.iK(o,b)))},
br(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.u,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.jK(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.br(d.a,c)
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
A.jK(j.a,j.b)
return}g=$.R
if(g!==h)$.R=h
else g=null
c=c.c
if((c&15)===8)new A.iO(q,d,n).$0()
else if(o){if((c&1)!==0)new A.iN(q,j).$0()}else if((c&2)!==0)new A.iM(d,q).$0()
if(g!=null)$.R=g
c=q.c
if(c instanceof A.a1){p=q.a.$ti
p=p.h("b0<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aQ(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.iJ(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.aQ(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
mZ(a,b){var s
if(t.C.b(a))return b.cj(a,t.z,t.K,t.l)
s=t.A
if(s.b(a))return s.a(a)
throw A.f(A.eA(a,"onError",u.c))},
mW(){var s,r
for(s=$.bM;s!=null;s=$.bM){$.cS=null
r=s.b
$.bM=r
if(r==null)$.cR=null
s.a.$0()}},
n4(){$.jJ=!0
try{A.mW()}finally{$.cS=null
$.jJ=!1
if($.bM!=null)$.jV().$1(A.kL())}},
kI(a){var s=new A.dB(a),r=$.cR
if(r==null){$.bM=$.cR=s
if(!$.jJ)$.jV().$1(A.kL())}else $.cR=r.b=s},
n1(a){var s,r,q,p=$.bM
if(p==null){A.kI(a)
$.cS=$.cR
return}s=new A.dB(a)
r=$.cS
if(r==null){s.b=p
$.bM=$.cS=s}else{q=r.b
s.b=q
$.cS=r.b=s
if(q==null)$.cR=s}},
nM(a,b){A.X(a,"stream",t.K)
return new A.dJ(b.h("dJ<0>"))},
lV(a,b){var s=$.R
if(s===B.k)return A.jC(a,t.M.a(b))
return A.jC(a,t.M.a(s.bZ(b)))},
jK(a,b){A.n1(new A.j6(a,b))},
kG(a,b,c,d,e){var s,r=$.R
if(r===c)return d.$0()
$.R=c
s=r
try{r=d.$0()
return r}finally{$.R=s}},
n0(a,b,c,d,e,f,g){var s,r=$.R
if(r===c)return d.$1(e)
$.R=c
s=r
try{r=d.$1(e)
return r}finally{$.R=s}},
n_(a,b,c,d,e,f,g,h,i){var s,r=$.R
if(r===c)return d.$2(e,f)
$.R=c
s=r
try{r=d.$2(e,f)
return r}finally{$.R=s}},
dL(a,b,c,d){t.M.a(d)
if(B.k!==c){d=c.bZ(d)
d=d}A.kI(d)},
iC:function iC(a){this.a=a},
iB:function iB(a,b,c){this.a=a
this.b=b
this.c=c},
iD:function iD(a){this.a=a},
iE:function iE(a){this.a=a},
iX:function iX(){},
iY:function iY(a,b){this.a=a
this.b=b},
dA:function dA(a,b){this.a=a
this.b=!1
this.$ti=b},
j2:function j2(a){this.a=a},
j3:function j3(a){this.a=a},
j7:function j7(a){this.a=a},
aV:function aV(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
aA:function aA(a,b){this.a=a
this.$ti=b},
at:function at(a,b){this.a=a
this.b=b},
hf:function hf(a,b,c){this.a=a
this.b=b
this.c=c},
bq:function bq(a,b,c,d,e){var _=this
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
iG:function iG(a,b){this.a=a
this.b=b},
iL:function iL(a,b){this.a=a
this.b=b},
iK:function iK(a,b){this.a=a
this.b=b},
iI:function iI(a,b){this.a=a
this.b=b},
iH:function iH(a,b){this.a=a
this.b=b},
iO:function iO(a,b,c){this.a=a
this.b=b
this.c=c},
iP:function iP(a,b){this.a=a
this.b=b},
iQ:function iQ(a){this.a=a},
iN:function iN(a,b){this.a=a
this.b=b},
iM:function iM(a,b){this.a=a
this.b=b},
dB:function dB(a){this.a=a
this.b=null},
dJ:function dJ(a){this.$ti=a},
cN:function cN(){},
dI:function dI(){},
iW:function iW(a,b){this.a=a
this.b=b},
j6:function j6(a,b){this.a=a
this.b=b},
ke(a,b){return new A.aM(a.h("@<0>").H(b).h("aM<1,2>"))},
T(a,b,c){return b.h("@<0>").H(c).h("kd<1,2>").a(A.ni(a,new A.aM(b.h("@<0>").H(c).h("aM<1,2>"))))},
a4(a,b){return new A.aM(a.h("@<0>").H(b).h("aM<1,2>"))},
lJ(a){return new A.aU(a.h("aU<0>"))},
bA(a){return new A.aU(a.h("aU<0>"))},
jE(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
cA(a,b,c){var s=new A.bs(a,b,c.h("bs<0>"))
s.c=a.e
return s},
b1(a,b){var s=J.A(a)
if(s.j())return s.gl()
return null},
ah(a,b,c){var s=A.ke(b,c)
a.ac(0,new A.hn(s,b,c))
return s},
hp(a){var s,r
if(A.jR(a))return"{...}"
s=new A.bF("")
try{r={}
B.a.m($.al,a)
s.a+="{"
r.a=!0
a.ac(0,new A.hq(r,s))
s.a+="}"}finally{if(0>=$.al.length)return A.w($.al,-1)
$.al.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
aU:function aU(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dH:function dH(a){this.a=a
this.c=this.b=null},
bs:function bs(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
hn:function hn(a,b,c){this.a=a
this.b=b
this.c=c},
v:function v(){},
H:function H(){},
ho:function ho(a){this.a=a},
hq:function hq(a,b){this.a=a
this.b=b},
cM:function cM(){},
bB:function bB(){},
cs:function cs(){},
bE:function bE(){},
cG:function cG(){},
bJ:function bJ(){},
mX(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aY(r)
q=A.ka(String(s))
throw A.f(q)}q=A.j4(p)
return q},
j4(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.dF(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.j4(a[s])
return a},
kc(a,b,c){return new A.cb(a,b)},
mx(a){return a.K()},
m2(a,b){return new A.iS(a,[],A.nf())},
m3(a,b,c){var s,r=new A.bF(""),q=A.m2(r,b)
q.b0(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
dF:function dF(a,b){this.a=a
this.b=b
this.c=null},
dG:function dG(a){this.a=a},
d1:function d1(){},
d3:function d3(){},
cb:function cb(a,b){this.a=a
this.b=b},
de:function de(a,b){this.a=a
this.b=b},
hj:function hj(){},
hl:function hl(a){this.b=a},
hk:function hk(a){this.a=a},
iT:function iT(){},
iU:function iU(a,b){this.a=a
this.b=b},
iS:function iS(a,b,c){this.c=a
this.a=b
this.b=c},
ns(a){var s=A.lP(a,null)
if(s!=null)return s
throw A.f(A.ka(a))},
lt(a,b){a=A.Y(a,new Error())
if(a==null)a=A.cP(a)
a.stack=b.q(0)
throw a},
jy(a,b,c,d){var s,r=c?J.kb(a,d):J.lF(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
ce(a,b,c){var s,r=A.c([],c.h("r<0>"))
for(s=J.A(a);s.j();)B.a.m(r,c.a(s.gl()))
if(b)return r
r.$flags=1
return r},
n(a,b){var s,r
if(Array.isArray(a))return A.c(a.slice(0),b.h("r<0>"))
s=A.c([],b.h("r<0>"))
for(r=J.A(a);r.j();)B.a.m(s,r.gl())
return s},
aO(a,b){var s=A.ce(a,!1,b)
s.$flags=3
return s},
kk(a,b,c){var s=J.A(b)
if(!s.j())return a
if(c.length===0){do a+=A.t(s.gl())
while(s.j())}else{a+=A.t(s.gl())
while(s.j())a=a+c+A.t(s.gl())}return a},
lS(){return A.bQ(new Error())},
ls(a,b,c){var s,r
for(s=0;s<4;++s){r=a[s]
if(r.b===b)return r}throw A.f(A.eA(b,"name","No enum value with that name"))},
d5(a){if(typeof a=="number"||A.jI(a)||a==null)return J.aZ(a)
if(typeof a=="string")return JSON.stringify(a)
return A.kg(a)},
lu(a,b){A.X(a,"error",t.K)
A.X(b,"stackTrace",t.l)
A.lt(a,b)},
cZ(a){return new A.cY(a)},
cX(a,b){return new A.aE(!1,null,b,a)},
eA(a,b,c){return new A.aE(!0,a,b,c)},
k3(a,b,c){return a},
aP(a,b,c,d,e){return new A.cm(b,c,!0,a,d,"Invalid value")},
lQ(a,b,c){if(0>a||a>c)throw A.f(A.aP(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.f(A.aP(b,a,c,"end",null))
return b}return c},
aQ(a,b){if(a<0)throw A.f(A.aP(a,0,null,b,null))
return a},
hg(a,b,c,d){return new A.d7(b,!0,a,d,"Index out of range")},
bp(a){return new A.ct(a)},
km(a){return new A.dy(a)},
io(a){return new A.cr(a)},
a3(a){return new A.d2(a)},
ka(a){return new A.ag(a)},
lE(a,b,c){var s,r
if(A.jR(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.c([],t.s)
B.a.m($.al,a)
try{A.mT(a,s)}finally{if(0>=$.al.length)return A.w($.al,-1)
$.al.pop()}r=A.kk(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
jv(a,b,c){var s,r
if(A.jR(a))return b+"..."+c
s=new A.bF(b)
B.a.m($.al,a)
try{r=s
r.a=A.kk(r.a,a,", ")}finally{if(0>=$.al.length)return A.w($.al,-1)
$.al.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
mT(a,b){var s,r,q,p,o,n,m,l=a.gB(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.j())return
s=A.t(l.gl())
B.a.m(b,s)
k+=s.length+2;++j}if(!l.j()){if(j<=5)return
if(0>=b.length)return A.w(b,-1)
r=b.pop()
if(0>=b.length)return A.w(b,-1)
q=b.pop()}else{p=l.gl();++j
if(!l.j()){if(j<=4){B.a.m(b,A.t(p))
return}r=A.t(p)
if(0>=b.length)return A.w(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gl();++j
for(;l.j();p=o,o=n){n=l.gl();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.w(b,-1)
k-=b.pop().length+2;--j}B.a.m(b,"...")
return}}q=A.t(p)
r=A.t(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.w(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.m(b,m)
B.a.m(b,q)
B.a.m(b,r)},
jz(a,b,c,d){var s
if(B.m===c){s=J.ai(a)
b=J.ai(b)
return A.iq(A.aR(A.aR($.dN(),s),b))}if(B.m===d){s=J.ai(a)
b=J.ai(b)
c=J.ai(c)
return A.iq(A.aR(A.aR(A.aR($.dN(),s),b),c))}s=J.ai(a)
b=J.ai(b)
c=J.ai(c)
d=J.ai(d)
d=A.iq(A.aR(A.aR(A.aR(A.aR($.dN(),s),b),c),d))
return d},
lL(a){var s,r,q=$.dN()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.x)(a),++r)q=A.aR(q,J.ai(a[r]))
return A.iq(q)},
bi:function bi(){},
dC:function dC(){},
G:function G(){},
cY:function cY(a){this.a=a},
aS:function aS(){},
aE:function aE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cm:function cm(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
d7:function d7(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
ct:function ct(a){this.a=a},
dy:function dy(a){this.a=a},
cr:function cr(a){this.a=a},
d2:function d2(a){this.a=a},
dq:function dq(){},
cq:function cq(){},
iF:function iF(a){this.a=a},
ag:function ag(a){this.a=a},
b:function b(){},
ab:function ab(a,b,c){this.a=a
this.b=b
this.$ti=c},
ac:function ac(){},
z:function z(){},
dK:function dK(){},
ip:function ip(){this.b=this.a=0},
bF:function bF(a){this.a=a},
ki(a,b,c){var s,r,q,p,o=[]
for(s=c!=null,r=0;r<b;++r)for(q=r*a,p=0;p<a;++p)if(!s||J.ar(c,q+p)!==0)o.push(new A.bu(p,r))
return new A.ik(a,b,A.aO(o,t.bP),A.a4(t.S,t.gE))},
ik:function ik(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
im:function im(a,b){this.a=a
this.b=b},
il:function il(a,b){this.a=a
this.b=b},
k0(a,b,c,d){var s,r,q,p,o,n=t.N,m=t.S,l=a.gaq(),k=a.gaq(),j=a.gaq(),i=A.a4(m,m)
for(s=a.gR(),r=J.A(s.a),s=new A.a0(r,s.b,s.$ti.h("a0<1>"));s.j();){q=r.gl()
i.u(0,q.a,q.d)}s=A.a4(n,t.J)
for(r=d.length,p=0;p<d.length;d.length===r||(0,A.x)(d),++p){o=d[p]
s.u(0,o.a,o)}return new A.bd(a,b,c,l.b,k.c,j.d,i,s,A.bA(n),A.bA(n),A.bA(n),A.bA(m),A.bA(m),A.bA(m),A.a4(m,t.y))},
eB:function eB(a){this.a=a},
bd:function bd(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
e7:function e7(a){this.a=a},
e6:function e6(){},
ee:function ee(a,b){this.a=a
this.b=b},
ec:function ec(a){this.a=a},
ed:function ed(a,b){this.a=a
this.b=b},
e9:function e9(a){this.a=a},
ea:function ea(a,b,c){this.a=a
this.b=b
this.c=c},
e8:function e8(a){this.a=a},
eb:function eb(a,b){this.a=a
this.b=b},
dW:function dW(){},
dX:function dX(a){this.a=a},
dY:function dY(a,b){this.a=a
this.b=b},
dZ:function dZ(a,b,c){this.a=a
this.b=b
this.c=c},
e1:function e1(a,b){this.a=a
this.b=b},
e_:function e_(a){this.a=a},
e0:function e0(a,b){this.a=a
this.b=b},
e2:function e2(a){this.a=a},
e3:function e3(){},
e4:function e4(a){this.a=a},
e5:function e5(a){this.a=a},
bg(a,b,c,d){var s,r=b.f,q=A.h(r)
q=new A.d(r,q.h("e(1)").a(new A.eG(a)),q.h("d<1>")).gk(0)
r=b.gR()
if(!b.gR().gB(0).j())s=0
else{s=b.gaq().r
if(s==null){s=c.b.i(0,"countryIncome")
s.toString
s=B.b.n(s)}}return new A.eF(a,q,r.L(0,s,new A.eH(d,c),t.S),b,c)},
eF:function eF(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eG:function eG(a){this.a=a},
eH:function eH(a,b){this.a=a
this.b=b},
ae(a){var s=a.x,r=s>=15?500:0,q=a.e
if(q===2)q=1000
else q=q===1?30:0
return a.w*3+a.r*0.35+a.f*0.15+s*1.5-a.y*2+r+q},
am(a,b){var s=b?a.x*0.75:0,r=a.e
if(r===1)r=30
else r=r===2?-200:0
return a.w*100+a.r*0.35+a.f*0.15-a.y*2-s+r},
kP(a,b){var s=a.gbm(),r=a.gJ(),q=b.b.i(0,"soldierPower")
q.toString
return s*(a.w+r*B.b.n(q))},
bR(a,b,c,d){var s,r=b.b,q=r.i(0,"soldierHp")
q.toString
q=B.b.n(q)
s=b.bj(a.w,c,!1)
r=r.i(0,"soldierPower")
r.toString
return(a.f+d*q)*(s+d*B.b.n(r))*(1+b.ds(B.b.aL(a.ax))/1000)},
bh:function bh(a,b){this.a=a
this.b=b},
bU:function bU(a,b,c){this.a=a
this.b=b
this.c=c},
eI:function eI(a,b,c){this.a=a
this.b=b
this.c=c},
eJ:function eJ(){},
eK:function eK(){},
k2(b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7=A.u(b9.i(0,"interval")),b8=A.a2(b9.i(0,"resourceInterval"))
if(b8==null)b8=30
s=A.V(b9.i(0,"cashBuffer"))
if(s==null)s=10
r=A.a2(b9.i(0,"payrollRatio"))
if(r==null)r=0.5
q=A.V(b9.i(0,"dangerousCountryCities"))
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
c=A.V(b9.i(0,"rearExtra"))
if(c==null)c=1
b=A.i(b9.i(0,"candidates"))
a=A.i(b9.i(0,"assessments"))
a0=A.i(b9.i(0,"routes"))
a1=A.i(b9.i(0,"plans"))
a2=A.i(b9.i(0,"commands"))
a3=A.i(b9.i(0,"team"))
a4=A.V(b9.i(0,"fronts"))
if(a4==null)a4=2
a5=A.V(b9.i(0,"singleFrontMonths"))
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
b2=A.V(b9.i(0,"attritionCombat"))
if(b2==null)b2=8
b3=A.i(b9.i(0,"targets"))
b4=A.i(b9.i(0,"slice"))
b5=A.u(b9.i(0,"advantage"))
b6=A.u(b9.i(0,"expansion"))
return new A.cW(b7,g,f,e,b8,s,r,q,p,o,n,m,l,k,j,i,h,d,A.u(b9.i(0,"age")),c,b,a,a0,a1,a2,a3,b3,b4,a4,a5,a6,a7,a8,a9,b0,b1,b2,b5,b6,A.i(b9.i(0,"timeout")),A.i(b9.i(0,"restarts")),A.u(b9.i(0,"stagnation")))},
cW:function cW(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2){var _=this
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
ax:function ax(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eL:function eL(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.r=_.f=_.e=$
_.w=null
_.x=e},
fg:function fg(){},
fh:function fh(a){this.a=a},
fi:function fi(){},
fs:function fs(){},
ft:function ft(){},
fu:function fu(){},
fv:function fv(a){this.a=a},
fw:function fw(a){this.a=a},
fx:function fx(a,b){this.a=a
this.b=b},
fy:function fy(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fz:function fz(a){this.a=a},
fj:function fj(a,b,c){this.a=a
this.b=b
this.c=c},
fk:function fk(a){this.a=a},
fl:function fl(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fm:function fm(a,b,c){this.a=a
this.b=b
this.c=c},
fn:function fn(){},
fo:function fo(a){this.a=a},
fp:function fp(a){this.a=a},
fq:function fq(){},
fr:function fr(){},
eY:function eY(a,b){this.a=a
this.b=b},
eZ:function eZ(a){this.a=a},
eM:function eM(a){this.a=a},
eU:function eU(a){this.a=a},
eV:function eV(a,b,c){this.a=a
this.b=b
this.c=c},
eW:function eW(a,b,c){this.a=a
this.b=b
this.c=c},
eX:function eX(a){this.a=a},
eN:function eN(a,b,c){this.a=a
this.b=b
this.c=c},
eO:function eO(){},
eP:function eP(a){this.a=a},
eQ:function eQ(){},
f2:function f2(a,b,c){this.a=a
this.b=b
this.c=c},
f3:function f3(a){this.a=a},
f4:function f4(a){this.a=a},
f5:function f5(a){this.a=a},
f6:function f6(a,b){this.a=a
this.b=b},
f7:function f7(a){this.a=a},
f8:function f8(a){this.a=a},
f9:function f9(a,b){this.a=a
this.b=b},
fa:function fa(a){this.a=a},
fb:function fb(a,b){this.a=a
this.b=b},
fc:function fc(a){this.a=a},
fd:function fd(a){this.a=a},
fe:function fe(){},
ff:function ff(a){this.a=a},
f0:function f0(a){this.a=a},
f1:function f1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
f_:function f_(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eR:function eR(a,b,c){this.a=a
this.b=b
this.c=c},
eS:function eS(a){this.a=a},
eT:function eT(a){this.a=a},
af:function af(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fA:function fA(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
h9:function h9(a,b){this.a=a
this.b=b},
ha:function ha(a){this.a=a},
h8:function h8(a){this.a=a},
hb:function hb(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h6:function h6(){},
h5:function h5(){},
h7:function h7(){},
h4:function h4(){},
hd:function hd(){},
hc:function hc(a){this.a=a},
fB:function fB(){},
fC:function fC(){},
fD:function fD(){},
fM:function fM(){},
fN:function fN(a){this.a=a},
fO:function fO(){},
fP:function fP(){},
fQ:function fQ(a){this.a=a},
fR:function fR(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fS:function fS(a){this.a=a},
fT:function fT(a){this.a=a},
fE:function fE(){},
fF:function fF(a){this.a=a},
fU:function fU(a,b){this.a=a
this.b=b},
fG:function fG(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fH:function fH(a,b){this.a=a
this.b=b},
fI:function fI(){},
fJ:function fJ(a){this.a=a},
fK:function fK(a){this.a=a},
fL:function fL(){},
h0:function h0(){},
h1:function h1(a){this.a=a},
h2:function h2(a){this.a=a},
h3:function h3(){},
fV:function fV(){},
fY:function fY(a){this.a=a},
fZ:function fZ(a){this.a=a},
h_:function h_(a){this.a=a},
fW:function fW(){},
fX:function fX(){},
eo(a){var s=J.aq(a)
return new A.B(A.u(s.i(a,0)),A.u(s.i(a,1)))},
B:function B(a,b){this.a=a
this.b=b},
en:function en(a){this.a=a},
k_(b6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=A.M(b6.i(0,"id")),a3=A.i(b6.i(0,"c")),a4=A.i(b6.i(0,"home")),a5=A.i(b6.i(0,"o")),a6=A.i(b6.i(0,"t")),a7=A.u(b6.i(0,"hp")),a8=A.i(b6.i(0,"max")),a9=A.i(b6.i(0,"a")),b0=A.i(b6.i(0,"p")),b1=A.i(b6.i(0,"pay")),b2=t.j,b3=A.eo(b2.a(b6.i(0,"xy"))),b4=A.eo(b2.a(b6.i(0,"v"))),b5=A.i(b6.i(0,"s"))
if(!(b5>=0&&b5<8))return A.w(B.K,b5)
b5=B.K[b5]
s=A.c([],t.n)
for(r=J.A(b2.a(b6.i(0,"troops")));r.j();)s.push(A.u(r.gl()))
r=A.u(b6.i(0,"m"))
q=b6.i(0,"to")==null?null:A.eo(b2.a(b6.i(0,"to")))
p=A.V(b6.i(0,"target"))
o=A.u(b6.i(0,"return"))
n=A.b8(b6.i(0,"dispatch"))
m=A.b8(b6.i(0,"move"))
l=A.b8(b6.i(0,"dismiss"))
k=A.b8(b6.i(0,"upgrade"))
j=A.b8(b6.i(0,"retreat"))
i=A.b8(b6.i(0,"marked"))
h=A.M(b6.i(0,"rev"))
g=A.i(b6.i(0,"orderRev"))
f=A.bL(b6.i(0,"opponent"))
e=A.i(b6.i(0,"clashes"))
d=A.u(b6.i(0,"received"))
c=A.u(b6.i(0,"dealt"))
b=A.c([],t.a)
for(a=J.A(t.R.a(b6.i(0,"returnPath")));a.j();){a0=b2.a(a.gl())
a1=J.aq(a0)
b.push(new A.B(A.u(a1.i(a0,0)),A.u(a1.i(a0,1))))}b2=A.V(b6.i(0,"regionCity"))
a=A.V(b6.i(0,"salaryPaidMonth"))
if(a==null)a=-1
a0=A.bK(b6.i(0,"movementPending"))
return new A.o(a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b3,b4,b5,A.aO(s,t.i),r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,b2,a,a0===!0)},
lg(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
s=B.c.t(b.x,a.x)
if(s!==0)return s
r=B.c.t(b.w,a.w)
if(r!==0)return r
q=a.e===2
if(q!==(b.e===2))return q?-1:1
return B.c.t(a.d,b.d)},
le(a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=A.i(a7.i(0,"id")),a1=A.i(a7.i(0,"c")),a2=A.i(a7.i(0,"native")),a3=A.i(a7.i(0,"level")),a4=t.j,a5=A.eo(a4.a(a7.i(0,"xy"))),a6=A.c([],t.a)
for(s=J.A(a4.a(a7.i(0,"outline")));s.j();){r=a4.a(s.gl())
q=J.aq(r)
a6.push(new A.B(A.u(q.i(r,0)),A.u(q.i(r,1))))}a4=A.i(a7.i(0,"income"))
s=A.i(a7.i(0,"poor"))
r=A.i(a7.i(0,"cap"))
q=A.i(a7.i(0,"recruitCap"))
p=t.bM
o=p.a(a7.i(0,"neighbors"))
o=o==null?null:J.jX(o,t.S)
n=A.b8(a7.i(0,"recruit"))
m=A.bK(a7.i(0,"upgrade"))
l=A.M(a7.i(0,"rev"))
k=A.i(a7.i(0,"baseIncome"))
j=A.V(a7.i(0,"initial"))
i=A.i(a7.i(0,"wins"))
h=A.bL(a7.i(0,"attacker"))
g=A.bL(a7.i(0,"defender"))
f=A.M(a7.i(0,"stage"))
e=A.u(a7.i(0,"next"))
d=A.bK(a7.i(0,"fallen"))
c=A.u(a7.i(0,"danger"))
b=A.V(a7.i(0,"gridWidth"))
if(b==null)b=0
a=A.V(a7.i(0,"gridHeight"))
if(a==null)a=0
p=p.a(a7.i(0,"gridTiles"))
p=p==null?null:J.jX(p,t.S)
if(p==null)p=B.am
return new A.J(a0,a1,a2,a3,o,a5,new A.en(a6),b,a,p,a4,s,r,q,k,n,m!==!1,l,j,i,h,g,f,e,d===!0,c)},
lf(a){var s,r,q,p,o,n=A.i(a.i(0,"id")),m=A.i(a.i(0,"gold")),l=A.i(a.i(0,"reserves")),k=A.i(a.i(0,"capacity")),j=A.i(a.i(0,"salary")),i=A.i(a.i(0,"poor")),h=A.V(a.i(0,"baseIncome")),g=A.a2(a.i(0,"garrisonAccrued"))
if(g==null)g=0
s=A.bK(a.i(0,"soldierRecruitmentAllowed"))
r=t.S
q=A.a4(r,r)
for(p=t.f.a(a.i(0,"hate")).gaw(),p=p.gB(p);p.j();){o=p.gl()
q.u(0,A.ns(A.M(o.a)),A.i(o.b))}return new A.bc(n,m,l,k,j,i,h,g,s!==!1,A.jt(q,r,r))},
lh(a){var s,r,q,p,o,n,m=A.i(a.i(0,"country")),l=A.i(a.i(0,"tick")),k=A.u(a.i(0,"month")),j=A.c([],t.Y)
for(s=t.R,r=J.A(s.a(a.i(0,"cities"))),q=t.f,p=t.N,o=t.z;r.j();)j.push(A.le(A.ah(q.a(r.gl()),p,o)))
r=A.c([],t.e)
for(n=J.A(s.a(a.i(0,"heroes")));n.j();)r.push(A.k_(A.ah(q.a(n.gl()),p,o)))
n=A.c([],t.eu)
for(s=J.A(s.a(a.i(0,"countries")));s.j();)n.push(A.lf(A.ah(q.a(s.gl()),p,o)))
s=A.i(a.i(0,"pool"))
q=A.i(a.i(0,"salary"))
p=A.V(a.i(0,"year"))
if(p==null)p=1
o=A.V(a.i(0,"monthIndex"))
if(o==null)o=0
return new A.eg(m,l,p,o,k,A.aO(j,t.q),A.aO(r,t.r),A.aO(n,t.t),s,q)},
an:function an(a,b){this.a=a
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
J:function J(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6){var _=this
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
bc:function bc(a,b,c,d,e,f,g,h,i,j){var _=this
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
eg:function eg(a,b,c,d,e,f,g,h,i,j){var _=this
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
el:function el(a){this.a=a},
em:function em(a){this.a=a},
ej:function ej(a,b){this.a=a
this.b=b},
ei:function ei(a){this.a=a},
ek:function ek(a){this.a=a},
eh:function eh(a){this.a=a},
jM(a,b,c){var s,r,q=null,p=a.as
if(p===B.f||p===B.d||p===B.q)return q
s=c.x.i(0,a.a)
p=s==null
if((p?q:s.b)==="expedition")p=p?q:s.d
else p=a.ch
r=b.G(p)
return r!=null&&r.b!==a.b?r:q},
kK(a,b,c,d){var s,r,q=A.jM(a,b,c)
if(q==null)return!1
s=a.as
r=!0
if(s!==B.w)if(s!==B.x){s=a.z
s=q.r.X(s).E(s)<=d.r.p2}else s=r
else s=r
return s},
dp(a,b,c,d,e){var s=B.a.D(a.f,new A.ht(e,a))?e:null
s=new A.hs(a,b,c,s,d,A.a4(t.S,t.bd))
s.cz(a,b,c,d,e)
return s},
hs:function hs(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
ht:function ht(a,b){this.a=a
this.b=b},
hu:function hu(){},
hy:function hy(a){this.a=a},
hA:function hA(a){this.a=a},
hB:function hB(a){this.a=a},
hz:function hz(a,b){this.a=a
this.b=b},
hw:function hw(){},
hx:function hx(a,b){this.a=a
this.b=b},
hC:function hC(a){this.a=a},
hv:function hv(a){this.a=a},
cl:function cl(a,b){this.a=a
this.b=b},
hD:function hD(a,b,c){this.a=a
this.b=b
this.c=c},
hE:function hE(a,b){this.a=a
this.b=b},
hH:function hH(a){this.a=a},
hI:function hI(){},
hJ:function hJ(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hF:function hF(){},
hG:function hG(a){this.a=a},
lk(a){var s,r,q,p,o,n,m,l,k=A.M(a.i(0,"hero")),j=A.M(a.i(0,"role")),i=A.i(a.i(0,"deadline")),h=A.i(a.i(0,"commit")),g=A.V(a.i(0,"city")),f=A.bL(a.i(0,"enemy")),e=A.c([],t.a)
for(s=J.A(t.R.a(a.i(0,"points"))),r=t.j;s.j();){q=r.a(s.gl())
p=J.aq(q)
e.push(new A.B(A.u(p.i(q,0)),A.u(p.i(q,1))))}s=A.i(a.i(0,"leg"))
r=A.i(a.i(0,"gold"))
q=A.b8(a.i(0,"slot"))
p=A.bK(a.i(0,"rearStaging"))
o=A.M(a.i(0,"reason"))
n=A.i(a.i(0,"order"))
m=A.V(a.i(0,"targetCountry"))
l=A.bK(a.i(0,"attrition"))
return new A.a7(k,j,o,g,m,l===!0,f,e,s,i,h,r,q,p===!0,n)},
li(a){var s,r,q,p,o,n,m,l,k,j,i
if(!J.aD(a.i(0,"protocol"),2))throw A.f(B.a8)
s=A.M(a.i(0,"session"))
r=A.i(a.i(0,"id"))
q=A.M(a.i(0,"rules"))
p=A.M(a.i(0,"map"))
o=t.f
n=t.N
m=t.z
l=A.lh(A.ah(o.a(a.i(0,"observation")),n,m))
k=A.i(a.i(0,"deadline"))
j=A.c([],t.m)
for(i=J.A(t.R.a(a.i(0,"tasks")));i.j();)j.push(A.lk(A.ah(o.a(i.gl()),n,m)))
o=A.i(a.i(0,"seed"))
n=A.i(a.i(0,"priority"))
m=A.i(a.i(0,"idle"))
i=A.bL(a.i(0,"stage"))
if(i==null)i="full"
return new A.eq(s,q,p,r,k,o,n,m,A.ls(B.al,i,t.a9),A.V(a.i(0,"offensiveCountry")),A.V(a.i(0,"offensiveCity")),l,j)},
k1(a,b,c,d){var s=a.Q
return new A.ep(a.a,a.b,a.c,a.d,s.a,s.b,a.e,d,b,c)},
aI:function aI(a,b){this.a=a
this.b=b},
as:function as(a,b){this.a=a
this.b=b},
F:function F(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
a7:function a7(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
S:function S(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
by:function by(a,b,c,d,e,f,g,h,i,j){var _=this
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
eq:function eq(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
ep:function ep(a,b,c,d,e,f,g,h,i,j){var _=this
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
j8(b0,b1,b2,b3,b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2="soldierLimit",a3="soldierPower",a4="soldierHp",a5={},a6=b2.v(b1.a),a7=A.h(a6).h("L<1>"),a8=A.U(new A.L(a6,a7),0,A.X(b1.gZ(),"count",t.S),a7.h("l.E")).al(0),a9=A.bg(b1.b,b2,b3,null)
a5.a=a5.b=1
a5.c=0
a5.d=null
a7=b3.d6(b0.w,!1)
a6=b3.b
s=a6.i(0,a2)
s.toString
s=B.b.n(s)
r=a6.i(0,a3)
r.toString
q=a7+s*B.b.n(r)
p=B.a.ao(b2.w,new A.j9(b1)).c
for(a7=b1.fx,s=b1.cx,r=b1.cy,o=s==null,n=b1.d,m=b3.d,l=0,k=0;k<a8.length;++k){j=a8[k]
i=a6.i(0,a2)
i.toString
h=Math.min(B.b.n(i),p+j.gJ())
p=Math.max(0,p-(h-j.gJ()))
if(o)i=n
else{i=a7?1:0
i=B.c.A(s-r-i,0,5)}i=Math.max(1,i-k)
g=a6.i(0,a2)
g.toString
f=b4.da(b0,j,i,h,B.b.n(g))
if(f.a===B.y)return new A.az([!1,-1,0,1])
a5.b=Math.min(a5.b,f.b)
i=k===0
if(i)a5.d=f
a5.a=Math.min(a5.a,f.c)
if(o)g=n
else{g=a7?1:0
g=B.c.A(s-r-g,0,5)}g=A.i(Math.max(1,g-k))
e=B.c.A(B.c.a6(j.w),0,63)
if(g>0){d=m.length
g=B.c.A(g-1,0,d-1)
if(!(g>=0&&g<d))return A.w(m,g)
g=m[g]}else g=0
g=B.c.A(e+g,0,63)
e=a6.i(0,a3)
e.toString
c=(g+h*B.b.n(e))/Math.max(1,q)
e=a6.i(0,a4)
e.toString
b=(j.f+h*B.b.n(e))*c*c
l+=b
if(i)a5.c=b}a7=b0.f
s=a6.i(0,a2)
s.toString
s=B.b.n(s)
a6=a6.i(0,a4)
a6.toString
a=a7+s*B.b.n(a6)
a0=Math.max(1,B.b.au(l/Math.max(1,a*0.85)))
a6=new A.ja(a5,a8,b0,b3,a)
s=b3.r
r=s.fy
if(a0>r)return a6.$0()
o=a8.length
m=o===0
if(!m)n=o===1&&n<=2&&a7>=b0.r*0.8&&a5.b>s.RG||a5.b>s.R8+Math.max(0,o-1)*0.025-b5
else n=!0
if(n){a6=a5.b
a7=a5.a
return new A.az([!1,a6,a9.br(a6>=s.k4||m?a0:Math.max(2,a0),o),a7])}if(a0>=2&&a7>=b0.r*0.65){a6=a5.b
a7=a5.a
return new A.az([!1,a6,a9.br(a0,o),a7])}a1=o>1&&a5.a>s.R8&&a5.b>-0.08?Math.min(r,o):0
if(a1===0)return a6.$0()
a6=a5.b
a7=a5.a
return new A.az([!1,a6,a9.br(a1,o),a7])},
j9:function j9(a){this.a=a},
ja:function ja(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
nA(a,b,c,d){return!c&&!b&&d!=null&&d.aV(0,new A.jm(a))},
jm:function jm(a){this.a=a},
du:function du(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hR:function hR(){},
hS:function hS(a){this.a=a},
hT:function hT(){},
i3:function i3(a,b,c){this.a=a
this.b=b
this.c=c},
ia:function ia(a,b,c){this.a=a
this.b=b
this.c=c},
ib:function ib(){},
hQ:function hQ(){},
hN:function hN(a,b,c){this.a=a
this.b=b
this.c=c},
hO:function hO(){},
hP:function hP(){},
ic:function ic(a,b){this.a=a
this.b=b},
id:function id(a,b){this.a=a
this.b=b},
ie:function ie(){},
ig:function ig(){},
ii:function ii(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
ih:function ih(){},
hU:function hU(a){this.a=a},
hV:function hV(a){this.a=a},
hW:function hW(a){this.a=a},
hX:function hX(a){this.a=a},
hY:function hY(){},
hZ:function hZ(a){this.a=a},
i_:function i_(){},
i0:function i0(a){this.a=a},
i1:function i1(){},
i2:function i2(){},
i4:function i4(a,b,c){this.a=a
this.b=b
this.c=c},
i5:function i5(a,b,c){this.a=a
this.b=b
this.c=c},
i6:function i6(a,b){this.a=a
this.b=b},
i7:function i7(a,b,c){this.a=a
this.b=b
this.c=c},
i8:function i8(){},
i9:function i9(){},
b_:function b_(a,b,c){this.a=a
this.b=b
this.d=c},
er:function er(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
es:function es(){},
et:function et(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eu:function eu(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
ev:function ev(a,b,c){this.a=a
this.b=b
this.c=c},
ew:function ew(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
lj(a){var s,r=A.M(a.i(0,"version")),q=t.f,p=t.N,o=t.H,n=A.ah(q.a(a.i(0,"values")),p,o),m=t.R,l=t.S,k=A.ce(m.a(a.i(0,"upgrades")),!0,l),j=A.ce(m.a(a.i(0,"defenseBonuses")),!0,l),i=t.n,h=A.c([],i)
for(s=J.A(m.a(a.i(0,"movement")));s.j();)h.push(A.u(s.gl()))
i=A.c([],i)
for(m=J.A(m.a(a.i(0,"field")));m.j();)i.push(A.u(m.gl()))
q=A.k2(A.ah(q.a(a.i(0,"tuning")),p,t.z))
m=t.i
return new A.ex(r,A.jt(n,p,o),A.aO(k,l),A.aO(j,l),A.aO(h,m),A.aO(i,m),q)},
ex:function ex(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
ef:function ef(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ez:function ez(a,b,c){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=0
_.r=c},
cT(a,b,c,d,e,f){var s,r,q,p,o,n,m=a.a,l=c.v(m),k=A.h(l).h("L<1>"),j=A.U(new A.L(l,k),0,A.X(a.gZ(),"count",t.S),k.h("l.E")).al(0)
if(j.length===0)s=0
else{l=A.h(j)
s=new A.I(j,l.h("j(1)").a(new A.jn()),l.h("I<1,j>")).af(0,B.F)}l=c.r
k=A.h(l)
r=new A.d(l,k.h("e(1)").a(new A.jo(a)),k.h("d<1>")).L(0,0,new A.jp(),t.i)
k=a.b
l=c.gaq().y.i(0,k)
l=B.c.A(l==null?0:l,0,100)
k=A.bg(k,c,d,null)
if(k.gaj()){q=k.e.r
p=q.z+k.gbb()*q.Q}else p=0
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
jn:function jn(){},
jo:function jo(a){this.a=a},
jp:function jp(){},
a6:function a6(a,b,c){this.a=a
this.b=b
this.c=c},
au:function au(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.d=c
_.f=d
_.r=e
_.w=f},
eD:function eD(){},
eE:function eE(){},
eC:function eC(){},
ir:function ir(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
is:function is(a){this.a=a},
it:function it(){},
iu:function iu(a){this.a=a},
iv:function iv(a){this.a=a},
iw:function iw(a){this.a=a},
ix:function ix(a){this.a=a},
iy:function iy(){},
ey:function ey(a){var _=this
_.a=a
_.d=_.c=_.b=0
_.e=!1},
nv(){var s,r,q=new A.jj(),p=v.G,o="web-worker:"+A.M(p.self.constructor.name)
p=A.j1(p.self)
s=new A.jk(new A.ez(q,o,A.bA(t.S)))
if(typeof s=="function")A.aB(A.cX("Attempting to rewrap a JS function.",null))
r=function(a,b){return function(c){return a(b,c,arguments.length)}}(A.mw,s)
r[$.jT()]=s
p.onmessage=r
q.$1(B.j.av(t.G.a(A.T(["kind","hello","protocol",2,"build","4e2c7724","backend",o],t.N,t.X)),null))},
jj:function jj(){},
jk:function jk(a){this.a=a},
kY(a){return v.mangledGlobalNames[a]},
nB(a){throw A.Y(new A.cc("Field '"+a+"' has been assigned during initialization."),new Error())},
O(){throw A.Y(A.lI(""),new Error())},
mw(a,b,c){t.h.a(a)
if(A.i(c)>=1)return a.$1(b)
return a.$0()},
kT(a,b,c){A.kN(c,t.H,"T","min")
return Math.min(c.a(a),c.a(b))},
kS(a,b,c){A.kN(c,t.H,"T","max")
return Math.max(c.a(a),c.a(b))},
lz(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e="nationalAi",d="maxCityLevel",c="initialMonth",b=A.d6($.jq())
for(s=new A.aN(a,A.k(a).h("aN<1,2>")).gB(0),r=t.f,q=t.N,p=t.X;s.j();){o=s.d
n=o.a
m=n==="nationalAi"&&r.b(o.b)
l=o.b
if(m){m=A.d6(r.a($.jq().i(0,e)))
k=A.ke(q,p)
k.F(0,m)
k.F(0,A.d6(r.a(l)))
b.u(0,n,k)}else b.u(0,n,A.ju(l))}j=b.i(0,"poorHarvestAdjustmentMin")
i=b.i(0,"poorHarvestAdjustmentMax")
if(!A.j5(j)||!A.j5(i)||j<0||i<j)A.aB(B.ab)
h=b.i(0,"cityUpgradeCosts")
g=b.i(0,"cityDefenseAttackBonuses")
f=b.i(0,"cityDefenseMoraleBonuses")
s=t.j
if(!s.b(h)||J.N(h)!==4||!s.b(g)||J.N(g)!==5||!s.b(f)||J.N(f)!==5)A.aB(B.a6)
if(A.i(b.i(0,d))!==J.N(g)||A.i(b.i(0,d))!==J.N(f))A.aB(B.a7)
if(A.i(b.i(0,c))<1||A.i(b.i(0,c))>12||A.u(b.i(0,"secondsPerMonth"))<=0||A.i(b.i(0,d))<1)A.aB(B.a9)
s=A.jt(b,q,p)
$.ly=s
A.k2(A.ah(A.ah(r.a(s.i(0,e)),q,p),q,t.z))},
d6(a){var s,r,q=A.a4(t.N,t.X)
for(s=a.gaw(),s=s.gB(s);s.j();){r=s.gl()
q.u(0,J.aZ(r.a),A.ju(r.b))}return q},
ju(a){var s,r
A:{if(t.f.b(a)){s=A.d6(a)
break A}if(t.j.b(a)){s=[]
for(r=J.A(a);r.j();)s.push(A.ju(r.gl()))
break A}s=a
break A}return s},
nm(a,b,c,d,e,f,g,h){var s,r,q,p,o,n,m,l=null,k=f.E(a),j=!c
if(j&&k>d*b+80)return l
s=h.a
r=h.b
q=Math.sqrt(s*s+r*r)
p=q<0.01?0:((a.a-f.a)*s+(a.b-f.b)*r)/(Math.max(1,k)*q)
if(j&&k>72){if(p<0.45)return l
o=Math.max(0,k*p)
n=new A.B(f.a+s/q*o,f.b+r/q*o)
if(e.X(n).E(n)>48)return l}m=g.$2(f,e.bX(f,a))
if(isFinite(m))j=!j||m<=b
else j=!1
return j?m:l}},B={}
var w=[A,J,B]
var $={}
A.jw.prototype={}
J.d9.prototype={
ag(a,b){return a===b},
gS(a){return A.ds(a)},
q(a){return"Instance of '"+A.dt(a)+"'"},
gU(a){return A.aX(A.jH(this))}}
J.db.prototype={
q(a){return String(a)},
gS(a){return a?519018:218159},
gU(a){return A.aX(t.y)},
$iC:1,
$ie:1}
J.c7.prototype={
ag(a,b){return null==b},
q(a){return"null"},
gS(a){return 0},
$iC:1}
J.c9.prototype={$iP:1}
J.b3.prototype={
gS(a){return 0},
q(a){return String(a)}}
J.dr.prototype={}
J.bG.prototype={}
J.b2.prototype={
q(a){var s=a[$.l_()]
if(s==null)s=a[$.jT()]
if(s==null)return this.cw(a)
return"JavaScript function for "+J.aZ(s)},
$iaK:1}
J.c8.prototype={
gS(a){return 0},
q(a){return String(a)}}
J.ca.prototype={
gS(a){return 0},
q(a){return String(a)}}
J.r.prototype={
aU(a,b){return new A.aJ(a,A.h(a).h("@<1>").H(b).h("aJ<1,2>"))},
m(a,b){A.h(a).c.a(b)
a.$flags&1&&A.bb(a,29)
a.push(b)},
ar(a,b){var s
a.$flags&1&&A.bb(a,"remove",1)
for(s=0;s<a.length;++s)if(J.aD(a[s],b)){a.splice(s,1)
return!0}return!1},
F(a,b){var s
A.h(a).h("b<1>").a(b)
a.$flags&1&&A.bb(a,"addAll",2)
if(Array.isArray(b)){this.cC(a,b)
return}for(s=J.A(b);s.j();)a.push(s.gl())},
cC(a,b){var s,r
t.V.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.f(A.a3(a))
for(r=0;r<s;++r)a.push(b[r])},
bl(a){a.$flags&1&&A.bb(a,"clear","clear")
a.length=0},
dq(a,b){var s,r=A.jy(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.u(r,s,A.t(a[s]))
return r.join(b)},
a_(a,b){return A.U(a,b,null,A.h(a).c)},
af(a,b){var s,r,q
A.h(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.f(A.a_())
if(0>=s)return A.w(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.f(A.a3(a))}return r},
L(a,b,c,d){var s,r,q
d.a(b)
A.h(a).H(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.f(A.a3(a))}return r},
ao(a,b){var s,r,q
A.h(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.f(A.a3(a))}throw A.f(A.a_())},
M(a,b){if(!(b>=0&&b<a.length))return A.w(a,b)
return a[b]},
gI(a){if(a.length>0)return a[0]
throw A.f(A.a_())},
gT(a){var s=a.length
if(s>0)return a[s-1]
throw A.f(A.a_())},
D(a,b){var s,r
A.h(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.f(A.a3(a))}return!1},
aV(a,b){var s,r
A.h(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.f(A.a3(a))}return!0},
C(a,b){var s,r,q,p,o,n=A.h(a)
n.h("a(1,1)?").a(b)
a.$flags&2&&A.bb(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.mH()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dN()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.dM(b,2))
if(p>0)this.cU(a,p)},
bv(a){return this.C(a,null)},
cU(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
p(a,b){var s
for(s=0;s<a.length;++s)if(J.aD(a[s],b))return!0
return!1},
gO(a){return a.length===0},
ga7(a){return a.length!==0},
q(a){return A.jv(a,"[","]")},
gB(a){return new J.be(a,a.length,A.h(a).h("be<1>"))},
gS(a){return A.ds(a)},
gk(a){return a.length},
sk(a,b){a.$flags&1&&A.bb(a,"set length","change the length of")
if(b<0)throw A.f(A.aP(b,0,null,"newLength",null))
if(b>a.length)A.h(a).c.a(null)
a.length=b},
i(a,b){A.i(b)
if(!(b>=0&&b<a.length))throw A.f(A.jc(a,b))
return a[b]},
u(a,b,c){A.h(a).c.a(c)
a.$flags&2&&A.bb(a)
if(!(b>=0&&b<a.length))throw A.f(A.jc(a,b))
a[b]=c},
$im:1,
$ib:1,
$ip:1}
J.da.prototype={
dH(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.dt(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.hh.prototype={}
J.be.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.x(q)
throw A.f(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iy:1}
J.bz.prototype={
t(a,b){var s
A.u(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaW(b)
if(this.gaW(a)===s)return 0
if(this.gaW(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaW(a){return a===0?1/a<0:a<0},
n(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.f(A.bp(""+a+".toInt()"))},
au(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.f(A.bp(""+a+".ceil()"))},
a6(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.f(A.bp(""+a+".floor()"))},
aL(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.f(A.bp(""+a+".round()"))},
A(a,b,c){if(B.c.t(b,c)>0)throw A.f(A.na(b))
if(this.t(a,b)<0)return b
if(this.t(a,c)>0)return c
return a},
aZ(a,b){var s
if(b>20)throw A.f(A.aP(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaW(a))return"-"+s
return s},
q(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gS(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
az(a,b){return a+b},
cv(a,b){return a-b},
b2(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.bT(a,b)},
bi(a,b){return(a|0)===a?a/b|0:this.bT(a,b)},
bT(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.f(A.bp("Result of truncating division is "+A.t(s)+": "+A.t(a)+" ~/ "+A.t(b)))},
bQ(a,b){var s
if(a>0)s=this.cZ(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cZ(a,b){return b>31?0:a>>>b},
gU(a){return A.aX(t.H)},
$iav:1,
$ij:1,
$iZ:1}
J.c6.prototype={
gU(a){return A.aX(t.S)},
$iC:1,
$ia:1}
J.dc.prototype={
gU(a){return A.aX(t.i)},
$iC:1}
J.bk.prototype={
aN(a,b,c){return a.substring(b,A.lQ(b,c,a.length))},
bs(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.f(B.a1)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
dt(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bs(c,s)+a},
t(a,b){var s
A.M(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
q(a){return a},
gS(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gU(a){return A.aX(t.N)},
gk(a){return a.length},
$iC:1,
$iav:1,
$iD:1}
A.b5.prototype={
gB(a){return new A.bT(J.A(this.ga9()),A.k(this).h("bT<1,2>"))},
gk(a){return J.N(this.ga9())},
gO(a){return J.dO(this.ga9())},
ga7(a){return J.jZ(this.ga9())},
a_(a,b){var s=A.k(this)
return A.k8(J.dP(this.ga9(),b),s.c,s.y[1])},
M(a,b){return A.k(this).y[1].a(J.cU(this.ga9(),b))},
gI(a){return A.k(this).y[1].a(J.cV(this.ga9()))},
gT(a){return A.k(this).y[1].a(J.jr(this.ga9()))},
q(a){return J.aZ(this.ga9())}}
A.bT.prototype={
j(){return this.a.j()},
gl(){return this.$ti.y[1].a(this.a.gl())},
$iy:1}
A.bf.prototype={
ga9(){return this.a}}
A.cx.prototype={$im:1}
A.cw.prototype={
i(a,b){return this.$ti.y[1].a(J.ar(this.a,b))},
u(a,b,c){var s=this.$ti
J.lb(this.a,b,s.c.a(s.y[1].a(c)))},
sk(a,b){J.ld(this.a,b)},
m(a,b){var s=this.$ti
J.jW(this.a,s.c.a(s.y[1].a(b)))},
$im:1,
$ip:1}
A.aJ.prototype={
aU(a,b){return new A.aJ(this.a,this.$ti.h("@<1>").H(b).h("aJ<1,2>"))},
ga9(){return this.a}}
A.cc.prototype={
q(a){return"LateInitializationError: "+this.a}}
A.ij.prototype={}
A.m.prototype={}
A.l.prototype={
gB(a){var s=this
return new A.q(s,s.gk(s),A.k(s).h("q<l.E>"))},
gO(a){return this.gk(this)===0},
gI(a){if(this.gk(this)===0)throw A.f(A.a_())
return this.M(0,0)},
gT(a){var s=this
if(s.gk(s)===0)throw A.f(A.a_())
return s.M(0,s.gk(s)-1)},
aV(a,b){var s,r,q=this
A.k(q).h("e(l.E)").a(b)
s=q.gk(q)
for(r=0;r<s;++r){if(!b.$1(q.M(0,r)))return!1
if(s!==q.gk(q))throw A.f(A.a3(q))}return!0},
c9(a,b,c){var s=A.k(this)
return new A.I(this,s.H(c).h("1(l.E)").a(b),s.h("@<l.E>").H(c).h("I<1,2>"))},
af(a,b){var s,r,q,p=this
A.k(p).h("l.E(l.E,l.E)").a(b)
s=p.gk(p)
if(s===0)throw A.f(A.a_())
r=p.M(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.M(0,q))
if(s!==p.gk(p))throw A.f(A.a3(p))}return r},
L(a,b,c,d){var s,r,q,p=this
d.a(b)
A.k(p).H(d).h("1(1,l.E)").a(c)
s=p.gk(p)
for(r=b,q=0;q<s;++q){r=c.$2(r,p.M(0,q))
if(s!==p.gk(p))throw A.f(A.a3(p))}return r},
a_(a,b){return A.U(this,b,null,A.k(this).h("l.E"))},
dG(a){var s,r=this,q=A.lJ(A.k(r).h("l.E"))
for(s=0;s<r.gk(r);++s)q.m(0,r.M(0,s))
return q}}
A.E.prototype={
a0(a,b,c,d){var s,r=this.b
A.aQ(r,"start")
s=this.c
if(s!=null){A.aQ(s,"end")
if(r>s)throw A.f(A.aP(r,0,s,"start",null))}},
gcK(){var s=J.N(this.a),r=this.c
if(r==null||r>s)return s
return r},
gd0(){var s=J.N(this.a),r=this.b
if(r>s)return s
return r},
gk(a){var s,r=J.N(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
M(a,b){var s=this,r=s.gd0()+b
if(b<0||r>=s.gcK())throw A.f(A.hg(b,s.gk(0),s,"index"))
return J.cU(s.a,r)},
a_(a,b){var s,r,q=this
A.aQ(b,"count")
s=B.c.az(q.b,b)
r=q.c
if(r!=null&&s>=r)return new A.c0(q.$ti.h("c0<1>"))
return A.U(q.a,s,r,q.$ti.c)},
al(a){var s,r,q,p=this,o=p.b,n=p.a,m=J.aG(n),l=m.gk(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.kb(0,p.$ti.c)
return n}r=A.jy(s,m.M(n,o),!0,p.$ti.c)
for(q=1;q<s;++q){B.a.u(r,q,m.M(n,o+q))
if(m.gk(n)<l)throw A.f(A.a3(p))}return r}}
A.q.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=J.aG(q),o=p.gk(q)
if(r.b!==o)throw A.f(A.a3(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.M(q,s);++r.c
return!0},
$iy:1}
A.bm.prototype={
gB(a){return new A.cf(J.A(this.a),this.b,A.k(this).h("cf<1,2>"))},
gk(a){return J.N(this.a)},
gO(a){return J.dO(this.a)},
gI(a){return this.b.$1(J.cV(this.a))},
gT(a){return this.b.$1(J.jr(this.a))},
M(a,b){return this.b.$1(J.cU(this.a,b))}}
A.bZ.prototype={$im:1}
A.cf.prototype={
j(){var s=this,r=s.b
if(r.j()){s.a=s.c.$1(r.gl())
return!0}s.a=null
return!1},
gl(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iy:1}
A.I.prototype={
gk(a){return J.N(this.a)},
M(a,b){return this.b.$1(J.cU(this.a,b))}}
A.d.prototype={
gB(a){return new A.a0(J.A(this.a),this.b,this.$ti.h("a0<1>"))}}
A.a0.prototype={
j(){var s,r
for(s=this.a,r=this.b;s.j();)if(r.$1(s.gl()))return!0
return!1},
gl(){return this.a.gl()},
$iy:1}
A.c3.prototype={
gB(a){return new A.c4(J.A(this.a),this.b,B.H,this.$ti.h("c4<1,2>"))}}
A.c4.prototype={
gl(){var s=this.d
return s==null?this.$ti.y[1].a(s):s},
j(){var s,r,q=this,p=q.c
if(p==null)return!1
for(s=q.a,r=q.b;!p.j();){q.d=null
if(s.j()){q.c=null
p=J.A(r.$1(s.gl()))
q.c=p}else return!1}q.d=q.c.gl()
return!0},
$iy:1}
A.bn.prototype={
gB(a){var s=this.a
return new A.bo(s.gB(s),this.b,A.k(this).h("bo<1>"))}}
A.c_.prototype={
gk(a){var s=this.a,r=s.gk(s)
s=this.b
if(r>s)return s
return r},
$im:1}
A.bo.prototype={
j(){if(--this.b>=0)return this.a.j()
this.b=-1
return!1},
gl(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gl()},
$iy:1}
A.co.prototype={
a_(a,b){this.b.az(0,A.cQ(b))
return void 1},
gB(a){var s=this.a
return new A.cp(s.gB(s),this.b,A.k(this).h("cp<1>"))}}
A.he.prototype={
gk(a){var s=this.a,r=B.c.cv(s.gk(s),this.b)
if(r>=0)return r
return 0},
a_(a,b){this.b.az(0,A.cQ(b))
return void 1},
$im:1}
A.cp.prototype={
j(){var s,r
for(s=this.a,r=0;r<this.b;++r)s.j()
this.b=0
return s.j()},
gl(){return this.a.gl()},
$iy:1}
A.c0.prototype={
gB(a){return B.H},
gO(a){return!0},
gk(a){return 0},
gI(a){throw A.f(A.a_())},
gT(a){throw A.f(A.a_())},
M(a,b){throw A.f(A.aP(b,0,0,"index",null))},
a_(a,b){A.aQ(b,"count")
return this}}
A.c1.prototype={
j(){return!1},
gl(){throw A.f(A.a_())},
$iy:1}
A.cu.prototype={
gB(a){return new A.cv(J.A(this.a),this.$ti.h("cv<1>"))}}
A.cv.prototype={
j(){var s,r
for(s=this.a,r=this.$ti.c;s.j();)if(r.b(s.gl()))return!0
return!1},
gl(){return this.$ti.c.a(this.a.gl())},
$iy:1}
A.c5.prototype={
gk(a){return J.N(this.a)},
gO(a){return J.dO(this.a)},
ga7(a){return J.jZ(this.a)},
gI(a){return new A.aF(this.b,J.cV(this.a))},
M(a,b){return new A.aF(b+this.b,J.cU(this.a,b))},
a_(a,b){J.dP(this.a,A.cQ(b))
b.az(0,this.b)
return void 1},
gB(a){return new A.bj(J.A(this.a),this.b,A.k(this).h("bj<1>"))}}
A.bY.prototype={
gT(a){var s,r=this.a,q=J.aG(r),p=q.gk(r)
if(p<=0)throw A.f(A.a_())
s=q.gT(r)
if(p!==q.gk(r))throw A.f(A.a3(this))
return new A.aF(p-1+this.b,s)},
a_(a,b){J.dP(this.a,A.cQ(b))
B.c.az(this.b,b)
return void 1},
$im:1}
A.bj.prototype={
j(){if(++this.c>=0&&this.a.j())return!0
this.c=-2
return!1},
gl(){var s=this.c
return s>=0?new A.aF(this.b+s,this.a.gl()):A.aB(A.a_())},
$iy:1}
A.K.prototype={
sk(a,b){throw A.f(A.bp("Cannot change the length of a fixed-length list"))},
m(a,b){A.aH(a).h("K.E").a(b)
throw A.f(A.bp("Cannot add to a fixed-length list"))}}
A.L.prototype={
gk(a){return J.N(this.a)},
M(a,b){var s=this.a,r=J.aG(s)
return r.M(s,r.gk(s)-1-b)}}
A.cO.prototype={}
A.aF.prototype={$r:"+(1,2)",$s:1}
A.cF.prototype={$r:"+hero,route(1,2)",$s:2}
A.bu.prototype={$r:"+x,y(1,2)",$s:3}
A.az.prototype={$r:"+breakthrough,lower,teamSize,upper(1,2,3,4)",$s:4}
A.bW.prototype={}
A.bV.prototype={
gO(a){return this.gk(this)===0},
q(a){return A.hp(this)},
gaw(){return new A.aA(this.dj(),A.k(this).h("aA<ab<1,2>>"))},
dj(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gaw(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.gad(),o=o.gB(o),n=A.k(s),m=n.y[1],n=n.h("ab<1,2>")
case 2:if(!o.j()){r=3
break}l=o.gl()
k=s.i(0,l)
r=4
return a.b=new A.ab(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$iaa:1}
A.bX.prototype={
gk(a){return this.b.length},
gbK(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
W(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
i(a,b){if(!this.W(b))return null
return this.b[this.a[b]]},
ac(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbK()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gad(){return new A.cy(this.gbK(),this.$ti.h("cy<1>"))}}
A.cy.prototype={
gk(a){return this.a.length},
gO(a){return 0===this.a.length},
ga7(a){return 0!==this.a.length},
gB(a){var s=this.a
return new A.cz(s,s.length,this.$ti.h("cz<1>"))}}
A.cz.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iy:1}
A.d8.prototype={
ag(a,b){if(b==null)return!1
return b instanceof A.aL&&this.a.ag(0,b.a)&&A.jP(this)===A.jP(b)},
gS(a){return A.jz(this.a,A.jP(this),B.m,B.m)},
q(a){var s=B.a.dq([A.aX(this.$ti.c)],", ")
return this.a.q(0)+" with "+("<"+s+">")}}
A.aL.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.nr(A.jb(this.a),this.$ti)}}
A.hK.prototype={
$0(){return B.b.a6(1000*this.a.now())},
$S:11}
A.cn.prototype={}
A.iz.prototype={
ae(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.ck.prototype={
q(a){return"Null check operator used on a null value"}}
A.dd.prototype={
q(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.dz.prototype={
q(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.hr.prototype={
q(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.c2.prototype={}
A.cH.prototype={
q(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ib4:1}
A.a8.prototype={
q(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.kZ(r==null?"unknown":r)+"'"},
$iaK:1,
gdL(){return this},
$C:"$1",
$R:1,
$D:null}
A.d_.prototype={$C:"$0",$R:0}
A.d0.prototype={$C:"$2",$R:2}
A.dx.prototype={}
A.dw.prototype={
q(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.kZ(s)+"'"}}
A.bx.prototype={
ag(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bx))return!1
return this.$_target===b.$_target&&this.a===b.a},
gS(a){return(A.kU(this.a)^A.ds(this.$_target))>>>0},
q(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.dt(this.a)+"'")}}
A.dv.prototype={
q(a){return"RuntimeError: "+this.a}}
A.aM.prototype={
gk(a){return this.a},
gO(a){return this.a===0},
gad(){return new A.a9(this,A.k(this).h("a9<1>"))},
gaw(){return new A.aN(this,A.k(this).h("aN<1,2>"))},
W(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dl(a)},
dl(a){var s=this.d
if(s==null)return!1
return this.bn(this.bJ(s,a),a)>=0},
F(a,b){A.k(this).h("aa<1,2>").a(b).ac(0,new A.hi(this))},
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
s=this.bJ(q,a)
r=this.bn(s,a)
if(r<0)return null
return s[r].b},
u(a,b,c){var s,r,q=this,p=A.k(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bz(s==null?q.b=q.bf():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bz(r==null?q.c=q.bf():r,b,c)}else q.dn(b,c)},
dn(a,b){var s,r,q,p,o=this,n=A.k(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.bf()
r=o.c8(a)
q=s[r]
if(q==null)s[r]=[o.bg(a,b)]
else{p=o.bn(q,a)
if(p>=0)q[p].b=b
else q.push(o.bg(a,b))}},
bp(a,b){var s,r,q=this,p=A.k(q)
p.c.a(a)
p.h("2()").a(b)
if(q.W(a)){s=q.i(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.u(0,a,r)
return r},
ar(a,b){var s=this.cT(this.b,b)
return s},
bl(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.be()}},
ac(a,b){var s,r,q=this
A.k(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.f(A.a3(q))
s=s.c}},
bz(a,b,c){var s,r=A.k(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.bg(b,c)
else s.b=c},
cT(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.d2(s)
delete a[b]
return s.b},
be(){this.r=this.r+1&1073741823},
bg(a,b){var s=this,r=A.k(s),q=new A.hm(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.be()
return q},
d2(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.be()},
c8(a){return J.ai(a)&1073741823},
bJ(a,b){return a[this.c8(b)]},
bn(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aD(a[r].a,b))return r
return-1},
q(a){return A.hp(this)},
bf(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ikd:1}
A.hi.prototype={
$2(a,b){var s=this.a,r=A.k(s)
s.u(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.k(this.a).h("~(1,2)")}}
A.hm.prototype={}
A.a9.prototype={
gk(a){return this.a.a},
gO(a){return this.a.a===0},
gB(a){var s=this.a
return new A.bl(s,s.r,s.e,this.$ti.h("bl<1>"))},
p(a,b){return this.a.W(b)}}
A.bl.prototype={
gl(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.f(A.a3(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iy:1}
A.Q.prototype={
gk(a){return this.a.a},
gO(a){return this.a.a===0},
gB(a){var s=this.a
return new A.ak(s,s.r,s.e,this.$ti.h("ak<1>"))}}
A.ak.prototype={
gl(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.f(A.a3(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iy:1}
A.aN.prototype={
gk(a){return this.a.a},
gO(a){return this.a.a===0},
gB(a){var s=this.a
return new A.cd(s,s.r,s.e,this.$ti.h("cd<1,2>"))}}
A.cd.prototype={
gl(){var s=this.d
s.toString
return s},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.f(A.a3(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.ab(s.a,s.b,r.$ti.h("ab<1,2>"))
r.c=s.c
return!0}},
$iy:1}
A.jf.prototype={
$1(a){return this.a(a)},
$S:16}
A.jg.prototype={
$2(a,b){return this.a(a,b)},
$S:48}
A.jh.prototype={
$1(a){return this.a(A.M(a))},
$S:43}
A.ay.prototype={
q(a){return this.bV(!1)},
bV(a){var s,r,q,p,o,n=this.cL(),m=this.bd(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.w(m,q)
o=m[q]
l=a?l+A.kg(o):l+A.t(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
cL(){var s,r=this.$s
while($.iV.length<=r)B.a.m($.iV,null)
s=$.iV[r]
if(s==null){s=this.cI()
B.a.u($.iV,r,s)}return s},
cI(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.c(new Array(l),t.L)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.u(k,q,r[s])}}return A.aO(k,t.K)}}
A.b6.prototype={
bd(){return[this.a,this.b]},
ag(a,b){if(b==null)return!1
return b instanceof A.b6&&this.$s===b.$s&&J.aD(this.a,b.a)&&J.aD(this.b,b.b)},
gS(a){return A.jz(this.$s,this.a,this.b,B.m)}}
A.bH.prototype={
bd(){return this.a},
ag(a,b){if(b==null)return!1
return b instanceof A.bH&&this.$s===b.$s&&A.mc(this.a,b.a)},
gS(a){return A.jz(this.$s,A.lL(this.a),B.m,B.m)}}
A.bC.prototype={
gU(a){return B.an},
$iC:1}
A.ci.prototype={}
A.df.prototype={
gU(a){return B.ao},
$iC:1}
A.bD.prototype={
gk(a){return a.length},
$iaj:1}
A.cg.prototype={
i(a,b){A.aW(b,a,a.length)
return a[b]},
u(a,b,c){A.ap(c)
a.$flags&2&&A.bb(a)
A.aW(b,a,a.length)
a[b]=c},
$im:1,
$ib:1,
$ip:1}
A.ch.prototype={
u(a,b,c){A.i(c)
a.$flags&2&&A.bb(a)
A.aW(b,a,a.length)
a[b]=c},
$im:1,
$ib:1,
$ip:1}
A.dg.prototype={
gU(a){return B.ap},
$iC:1}
A.dh.prototype={
gU(a){return B.aq},
$iC:1}
A.di.prototype={
gU(a){return B.ar},
i(a,b){A.aW(b,a,a.length)
return a[b]},
$iC:1}
A.dj.prototype={
gU(a){return B.as},
i(a,b){A.aW(b,a,a.length)
return a[b]},
$iC:1}
A.dk.prototype={
gU(a){return B.at},
i(a,b){A.aW(b,a,a.length)
return a[b]},
$iC:1}
A.dl.prototype={
gU(a){return B.av},
i(a,b){A.aW(b,a,a.length)
return a[b]},
$iC:1}
A.dm.prototype={
gU(a){return B.aw},
i(a,b){A.aW(b,a,a.length)
return a[b]},
$iC:1}
A.cj.prototype={
gU(a){return B.ax},
gk(a){return a.length},
i(a,b){A.aW(b,a,a.length)
return a[b]},
$iC:1}
A.dn.prototype={
gU(a){return B.ay},
gk(a){return a.length},
i(a,b){A.i(b)
A.aW(b,a,a.length)
return a[b]},
$iC:1,
$ijD:1}
A.cB.prototype={}
A.cC.prototype={}
A.cD.prototype={}
A.cE.prototype={}
A.aw.prototype={
h(a){return A.cL(v.typeUniverse,this,a)},
H(a){return A.ky(v.typeUniverse,this,a)}}
A.dE.prototype={}
A.iZ.prototype={
q(a){return A.ad(this.a,null)}}
A.dD.prototype={
q(a){return this.a}}
A.bI.prototype={$iaS:1}
A.iC.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:17}
A.iB.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:39}
A.iD.prototype={
$0(){this.a.$0()},
$S:18}
A.iE.prototype={
$0(){this.a.$0()},
$S:18}
A.iX.prototype={
cA(a,b){if(self.setTimeout!=null)self.setTimeout(A.dM(new A.iY(this,b),0),a)
else throw A.f(A.bp("`setTimeout()` not found."))}}
A.iY.prototype={
$0(){this.b.$0()},
$S:3}
A.dA.prototype={}
A.j2.prototype={
$1(a){return this.a.$2(0,a)},
$S:50}
A.j3.prototype={
$2(a,b){this.a.$2(1,new A.c2(a,t.l.a(b)))},
$S:36}
A.j7.prototype={
$2(a,b){this.a(A.i(a),b)},
$S:38}
A.aV.prototype={
gl(){var s=this.b
return s==null?this.$ti.c.a(s):s},
cV(a,b){var s,r,q
a=A.i(a)
b=b
s=this.a
for(;;)try{r=s(this,a,b)
return r}catch(q){b=q
a=1}},
j(){var s,r,q,p,o=this,n=null,m=0
for(;;){s=o.d
if(s!=null)try{if(s.j()){o.b=s.gl()
return!0}else o.d=null}catch(r){n=r
m=1
o.d=null}q=o.cV(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.ks
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
o.a=A.ks
throw n
return!1}if(0>=p.length)return A.w(p,-1)
o.a=p.pop()
m=1
continue}throw A.f(A.io("sync*"))}return!1},
bW(a){var s,r,q=this
if(a instanceof A.aA){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.m(r,q.a)
q.a=s
return 2}else{q.d=J.A(a)
return 2}},
$iy:1}
A.aA.prototype={
gB(a){return new A.aV(this.a(),this.$ti.h("aV<1>"))}}
A.at.prototype={
q(a){return A.t(this.a)},
$iG:1,
gaM(){return this.b}}
A.hf.prototype={
$0(){this.c.a(null)
this.b.cG(null)},
$S:3}
A.bq.prototype={
dr(a){if((this.c&15)!==6)return!0
return this.b.b.bq(t.al.a(this.d),a.a,t.y,t.K)},
dk(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.dC(q,m,a.b,o,n,t.l)
else p=l.bq(t.A.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.aY(s))){if((r.c&1)!==0)throw A.f(A.cX("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.f(A.cX("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.a1.prototype={
ck(a,b,c){var s,r,q=this.$ti
q.H(c).h("1/(2)").a(a)
s=$.R
if(s===B.k){if(!t.C.b(b)&&!t.A.b(b))throw A.f(A.eA(b,"onError",u.c))}else{c.h("@<0/>").H(q.c).h("1(2)").a(a)
b=A.mZ(b,s)}r=new A.a1(s,c.h("a1<0>"))
this.b3(new A.bq(r,3,a,b,q.h("@<1>").H(c).h("bq<1,2>")))
return r},
bU(a,b,c){var s,r=this.$ti
r.H(c).h("1/(2)").a(a)
s=new A.a1($.R,c.h("a1<0>"))
this.b3(new A.bq(s,19,a,b,r.h("@<1>").H(c).h("bq<1,2>")))
return s},
cX(a){this.a=this.a&1|16
this.c=a},
aO(a){this.a=a.a&30|this.a&1
this.c=a.c},
b3(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.b3(a)
return}r.aO(s)}A.dL(null,null,r.b,t.M.a(new A.iG(r,a)))}},
bO(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.bO(a)
return}m.aO(n)}l.a=m.aQ(a)
A.dL(null,null,m.b,t.M.a(new A.iL(l,m)))}},
aE(){var s=t.F.a(this.c)
this.c=null
return this.aQ(s)},
aQ(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
cG(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("b0<1>").b(a))A.iJ(a,r,!0)
else{s=r.aE()
q.c.a(a)
r.a=8
r.c=a
A.br(r,s)}},
bH(a){var s,r=this
r.$ti.c.a(a)
s=r.aE()
r.a=8
r.c=a
A.br(r,s)},
cH(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aE()
q.aO(a)
A.br(q,r)},
b7(a){var s=this.aE()
this.cX(a)
A.br(this,s)},
cE(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("b0<1>").b(a)){this.bD(a)
return}this.cF(a)},
cF(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dL(null,null,s.b,t.M.a(new A.iI(s,a)))},
bD(a){A.iJ(this.$ti.h("b0<1>").a(a),this,!1)
return},
bB(a){this.a^=2
A.dL(null,null,this.b,t.M.a(new A.iH(this,a)))},
$ib0:1}
A.iG.prototype={
$0(){A.br(this.a,this.b)},
$S:3}
A.iL.prototype={
$0(){A.br(this.b,this.a.a)},
$S:3}
A.iK.prototype={
$0(){A.iJ(this.a.a,this.b,!0)},
$S:3}
A.iI.prototype={
$0(){this.a.bH(this.b)},
$S:3}
A.iH.prototype={
$0(){this.a.b7(this.b)},
$S:3}
A.iO.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dB(t.fO.a(q.d),t.z)}catch(p){s=A.aY(p)
r=A.bQ(p)
if(k.c&&t.u.a(k.b.a.c).a===s){q=k.a
q.c=t.u.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.js(q)
n=k.a
n.c=new A.at(q,o)
q=n}q.b=!0
return}if(j instanceof A.a1&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.u.a(j.c)
q.b=!0}return}if(j instanceof A.a1){m=k.b.a
l=new A.a1(m.b,m.$ti)
j.ck(new A.iP(l,m),new A.iQ(l),t.o)
q=k.a
q.c=l
q.b=!1}},
$S:3}
A.iP.prototype={
$1(a){this.a.cH(this.b)},
$S:17}
A.iQ.prototype={
$2(a,b){A.cP(a)
t.l.a(b)
this.a.b7(new A.at(a,b))},
$S:32}
A.iN.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bq(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aY(l)
r=A.bQ(l)
q=s
p=r
if(p==null)p=A.js(q)
o=this.a
o.c=new A.at(q,p)
o.b=!0}},
$S:3}
A.iM.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.u.a(l.a.a.c)
p=l.b
if(p.a.dr(s)&&p.a.e!=null){p.c=p.a.dk(s)
p.b=!1}}catch(o){r=A.aY(o)
q=A.bQ(o)
p=t.u.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.js(p)
m=l.b
m.c=new A.at(p,n)
p=m}p.b=!0}},
$S:3}
A.dB.prototype={}
A.dJ.prototype={}
A.cN.prototype={$ikn:1}
A.dI.prototype={
dD(a){var s,r,q
t.M.a(a)
try{if(B.k===$.R){a.$0()
return}A.kG(null,null,this,a,t.o)}catch(q){s=A.aY(q)
r=A.bQ(q)
A.jK(A.cP(s),t.l.a(r))}},
bZ(a){return new A.iW(this,t.M.a(a))},
dB(a,b){b.h("0()").a(a)
if($.R===B.k)return a.$0()
return A.kG(null,null,this,a,b)},
bq(a,b,c,d){c.h("@<0>").H(d).h("1(2)").a(a)
d.a(b)
if($.R===B.k)return a.$1(b)
return A.n0(null,null,this,a,b,c,d)},
dC(a,b,c,d,e,f){d.h("@<0>").H(e).H(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.R===B.k)return a.$2(b,c)
return A.n_(null,null,this,a,b,c,d,e,f)},
cj(a,b,c,d){return b.h("@<0>").H(c).H(d).h("1(2,3)").a(a)}}
A.iW.prototype={
$0(){return this.a.dD(this.b)},
$S:3}
A.j6.prototype={
$0(){A.lu(this.a,this.b)},
$S:3}
A.aU.prototype={
cO(){return new A.aU(A.k(this).h("aU<1>"))},
gB(a){var s=this,r=new A.bs(s,s.r,A.k(s).h("bs<1>"))
r.c=s.e
return r},
gk(a){return this.a},
gO(a){return this.a===0},
ga7(a){return this.a!==0},
p(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cJ(b)},
cJ(a){var s=this.d
if(s==null)return!1
return this.bc(s[this.b8(a)],a)>=0},
gI(a){var s=this.e
if(s==null)throw A.f(A.io("No elements"))
return A.k(this).c.a(s.a)},
gT(a){var s=this.f
if(s==null)throw A.f(A.io("No elements"))
return A.k(this).c.a(s.a)},
m(a,b){var s,r,q=this
A.k(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bE(s==null?q.b=A.jE():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bE(r==null?q.c=A.jE():r,b)}else return q.cB(b)},
cB(a){var s,r,q,p=this
A.k(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jE()
r=p.b8(a)
q=s[r]
if(q==null)s[r]=[p.b6(a)]
else{if(p.bc(q,a)>=0)return!1
q.push(p.b6(a))}return!0},
ar(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bF(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bF(s.c,b)
else return s.cS(b)},
cS(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.b8(a)
r=n[s]
q=o.bc(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bG(p)
return!0},
bE(a,b){A.k(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.b6(b)
return!0},
bF(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bG(s)
delete a[b]
return!0},
b5(){this.r=this.r+1&1073741823},
b6(a){var s,r=this,q=new A.dH(A.k(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.b5()
return q},
bG(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.b5()},
b8(a){return J.ai(a)&1073741823},
bc(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aD(a[r].a,b))return r
return-1}}
A.dH.prototype={}
A.bs.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.f(A.a3(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iy:1}
A.hn.prototype={
$2(a,b){this.a.u(0,this.b.a(a),this.c.a(b))},
$S:42}
A.v.prototype={
gB(a){return new A.q(a,this.gk(a),A.aH(a).h("q<v.E>"))},
M(a,b){return this.i(a,b)},
gO(a){return this.gk(a)===0},
ga7(a){return!this.gO(a)},
gI(a){if(this.gk(a)===0)throw A.f(A.a_())
return this.i(a,0)},
gT(a){if(this.gk(a)===0)throw A.f(A.a_())
return this.i(a,this.gk(a)-1)},
a_(a,b){return A.U(a,b,null,A.aH(a).h("v.E"))},
m(a,b){var s
A.aH(a).h("v.E").a(b)
s=this.gk(a)
this.sk(a,s+1)
this.u(a,s,b)},
aU(a,b){return new A.aJ(a,A.aH(a).h("@<v.E>").H(b).h("aJ<1,2>"))},
q(a){return A.jv(a,"[","]")}}
A.H.prototype={
ac(a,b){var s,r,q,p=A.k(this)
p.h("~(H.K,H.V)").a(b)
for(s=this.gad(),s=s.gB(s),p=p.h("H.V");s.j();){r=s.gl()
q=this.i(0,r)
b.$2(r,q==null?p.a(q):q)}},
cl(a,b,c){var s,r=this,q=A.k(r)
q.h("H.K").a(a)
q.h("H.V(H.V)").a(b)
q.h("H.V()?").a(c)
if(r.W(a)){s=r.i(0,a)
q=b.$1(s==null?q.h("H.V").a(s):s)
r.u(0,a,q)
return q}q=c.$0()
r.u(0,a,q)
return q},
gaw(){return this.gad().c9(0,new A.ho(this),A.k(this).h("ab<H.K,H.V>"))},
W(a){return this.gad().p(0,a)},
gk(a){var s=this.gad()
return s.gk(s)},
gO(a){var s=this.gad()
return s.gO(s)},
q(a){return A.hp(this)},
$iaa:1}
A.ho.prototype={
$1(a){var s=this.a,r=A.k(s)
r.h("H.K").a(a)
s=s.i(0,a)
if(s==null)s=r.h("H.V").a(s)
return new A.ab(a,s,r.h("ab<H.K,H.V>"))},
$S(){return A.k(this.a).h("ab<H.K,H.V>(H.K)")}}
A.hq.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.t(a)
r.a=(r.a+=s)+": "
s=A.t(b)
r.a+=s},
$S:19}
A.cM.prototype={}
A.bB.prototype={
i(a,b){return this.a.i(0,b)},
ac(a,b){this.a.ac(0,this.$ti.h("~(1,2)").a(b))},
gO(a){return this.a.a===0},
gk(a){return this.a.a},
q(a){return A.hp(this.a)},
gaw(){var s=this.a
return new A.aN(s,A.k(s).h("aN<1,2>"))},
$iaa:1}
A.cs.prototype={}
A.bE.prototype={
gO(a){return this.a===0},
ga7(a){return this.a!==0},
F(a,b){var s
A.k(this).h("b<1>").a(b)
for(s=b.gB(b);s.j();)this.m(0,s.gl())},
q(a){return A.jv(this,"{","}")},
L(a,b,c,d){var s,r,q,p
d.a(b)
s=A.k(this)
s.H(d).h("1(1,2)").a(c)
for(s=A.cA(this,this.r,s.c),r=s.$ti.c,q=b;s.j();){p=s.d
q=c.$2(q,p==null?r.a(p):p)}return q},
D(a,b){var s,r,q=A.k(this)
q.h("e(1)").a(b)
for(q=A.cA(this,this.r,q.c),s=q.$ti.c;q.j();){r=q.d
if(b.$1(r==null?s.a(r):r))return!0}return!1},
a_(a,b){return A.kj(this,b,A.k(this).c)},
gI(a){var s,r=A.cA(this,this.r,A.k(this).c)
if(!r.j())throw A.f(A.a_())
s=r.d
return s==null?r.$ti.c.a(s):s},
gT(a){var s,r,q=A.cA(this,this.r,A.k(this).c)
if(!q.j())throw A.f(A.a_())
s=q.$ti.c
do{r=q.d
if(r==null)r=s.a(r)}while(q.j())
return r},
M(a,b){var s,r,q,p=this
A.aQ(b,"index")
s=A.cA(p,p.r,A.k(p).c)
for(r=b;s.j();){if(r===0){q=s.d
return q==null?s.$ti.c.a(q):q}--r}throw A.f(A.hg(b,b-r,p,"index"))},
$im:1,
$ib:1,
$ijB:1}
A.cG.prototype={
dg(a){var s,r,q,p=this,o=p.cO()
for(s=A.cA(p,p.r,A.k(p).c),r=s.$ti.c;s.j();){q=s.d
if(q==null)q=r.a(q)
if(!a.p(0,q))o.m(0,q)}return o}}
A.bJ.prototype={}
A.dF.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cQ(b):s}},
gk(a){return this.b==null?this.c.a:this.aD().length},
gO(a){return this.gk(0)===0},
gad(){if(this.b==null){var s=this.c
return new A.a9(s,A.k(s).h("a9<1>"))}return new A.dG(this)},
u(a,b,c){var s,r,q=this
A.M(b)
if(q.b==null)q.c.u(0,b,c)
else if(q.W(b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.d3().u(0,b,c)},
W(a){if(this.b==null)return this.c.W(a)
return!1},
ac(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.ac(0,b)
s=o.aD()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.j4(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.f(A.a3(o))}},
aD(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.c(Object.keys(this.a),t.s)
return s},
d3(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.a4(t.N,t.z)
r=n.aD()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.u(0,o,n.i(0,o))}if(p===0)B.a.m(r,"")
else B.a.bl(r)
n.a=n.b=null
return n.c=s},
cQ(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.j4(this.a[a])
return this.b[a]=s}}
A.dG.prototype={
gk(a){return this.a.gk(0)},
M(a,b){var s=this.a
if(s.b==null)s=s.gad().M(0,b)
else{s=s.aD()
if(!(b>=0&&b<s.length))return A.w(s,b)
s=s[b]}return s},
gB(a){var s=this.a
if(s.b==null){s=s.gad()
s=s.gB(s)}else{s=s.aD()
s=new J.be(s,s.length,A.h(s).h("be<1>"))}return s},
p(a,b){return this.a.W(b)}}
A.d1.prototype={}
A.d3.prototype={}
A.cb.prototype={
q(a){var s=A.d5(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.de.prototype={
q(a){return"Cyclic error in JSON stringify"}}
A.hj.prototype={
dd(a,b){var s=A.mX(a,this.gde().a)
return s},
av(a,b){var s=A.m3(a,this.gdi().b,null)
return s},
gdi(){return B.ak},
gde(){return B.aj}}
A.hl.prototype={}
A.hk.prototype={}
A.iT.prototype={
cn(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.n.aN(a,r,q)
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
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.n.aN(a,r,q)
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
break}}else if(p===34||p===92){if(q>r)s.a+=B.n.aN(a,r,q)
r=q+1
o=A.a5(92)
s.a+=o
o=A.a5(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.n.aN(a,r,m)},
b4(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.f(new A.de(a,null))}B.a.m(s,a)},
b0(a){var s,r,q,p,o=this
if(o.cm(a))return
o.b4(a)
try{s=o.b.$1(a)
if(!o.cm(s)){q=A.kc(a,null,o.gbL())
throw A.f(q)}q=o.a
if(0>=q.length)return A.w(q,-1)
q.pop()}catch(p){r=A.aY(p)
q=A.kc(a,r,o.gbL())
throw A.f(q)}},
cm(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.b.q(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.cn(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.b4(a)
q.dJ(a)
s=q.a
if(0>=s.length)return A.w(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.b4(a)
r=q.dK(a)
s=q.a
if(0>=s.length)return A.w(s,-1)
s.pop()
return r}else return!1},
dJ(a){var s,r,q=this.c
q.a+="["
s=J.aG(a)
if(s.ga7(a)){this.b0(s.i(a,0))
for(r=1;r<s.gk(a);++r){q.a+=","
this.b0(s.i(a,r))}}q.a+="]"},
dK(a){var s,r,q,p,o,n,m=this,l={}
if(a.gO(a)){m.c.a+="{}"
return!0}s=a.gk(a)*2
r=A.jy(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.ac(0,new A.iU(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.cn(A.M(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.w(r,n)
m.b0(r[n])}p.a+="}"
return!0}}
A.iU.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.u(s,r.a++,a)
B.a.u(s,r.a++,b)},
$S:19}
A.iS.prototype={
gbL(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.bi.prototype={
ag(a,b){if(b==null)return!1
return b instanceof A.bi},
gS(a){return B.c.gS(0)},
t(a,b){t.fu.a(b)
return 0},
q(a){return"0:00:00."+B.n.dt(B.c.q(0),6,"0")},
$iav:1}
A.dC.prototype={
q(a){return this.aP()},
$id4:1}
A.G.prototype={
gaM(){return A.lN(this)}}
A.cY.prototype={
q(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.d5(s)
return"Assertion failed"}}
A.aS.prototype={}
A.aE.prototype={
gba(){return"Invalid argument"+(!this.a?"(s)":"")},
gb9(){return""},
q(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gba()+q+o
if(!s.a)return n
return n+s.gb9()+": "+A.d5(s.gbo())},
gbo(){return this.b}}
A.cm.prototype={
gbo(){return A.a2(this.b)},
gba(){return"RangeError"},
gb9(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.t(q):""
else if(q==null)s=": Not greater than or equal to "+A.t(r)
else if(q>r)s=": Not in inclusive range "+A.t(r)+".."+A.t(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.t(r)
return s}}
A.d7.prototype={
gbo(){return A.i(this.b)},
gba(){return"RangeError"},
gb9(){if(A.i(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gk(a){return this.f}}
A.ct.prototype={
q(a){return"Unsupported operation: "+this.a}}
A.dy.prototype={
q(a){return"UnimplementedError: "+this.a}}
A.cr.prototype={
q(a){return"Bad state: "+this.a}}
A.d2.prototype={
q(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.d5(s)+"."}}
A.dq.prototype={
q(a){return"Out of Memory"},
gaM(){return null},
$iG:1}
A.cq.prototype={
q(a){return"Stack Overflow"},
gaM(){return null},
$iG:1}
A.iF.prototype={
q(a){return"Exception: "+this.a}}
A.ag.prototype={
q(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.b.prototype={
aU(a,b){return A.k8(this,A.k(this).h("b.E"),b)},
c9(a,b,c){var s=A.k(this)
return A.lK(this,s.H(c).h("1(b.E)").a(b),s.h("b.E"),c)},
dI(a,b){var s=A.k(this)
return new A.d(this,s.h("e(b.E)").a(b),s.h("d<b.E>"))},
L(a,b,c,d){var s,r
d.a(b)
A.k(this).H(d).h("1(1,b.E)").a(c)
for(s=this.gB(this),r=b;s.j();)r=c.$2(r,s.gl())
return r},
D(a,b){var s
A.k(this).h("e(b.E)").a(b)
for(s=this.gB(this);s.j();)if(b.$1(s.gl()))return!0
return!1},
gk(a){var s,r=this.gB(this)
for(s=0;r.j();)++s
return s},
gO(a){return!this.gB(this).j()},
ga7(a){return!this.gO(this)},
a_(a,b){return A.kj(this,b,A.k(this).h("b.E"))},
gI(a){var s=this.gB(this)
if(!s.j())throw A.f(A.a_())
return s.gl()},
gT(a){var s,r=this.gB(this)
if(!r.j())throw A.f(A.a_())
do s=r.gl()
while(r.j())
return s},
M(a,b){var s,r
A.aQ(b,"index")
s=this.gB(this)
for(r=b;s.j();){if(r===0)return s.gl();--r}throw A.f(A.hg(b,b-r,this,"index"))},
q(a){return A.lE(this,"(",")")}}
A.ab.prototype={
q(a){return"MapEntry("+A.t(this.a)+": "+A.t(this.b)+")"}}
A.ac.prototype={
gS(a){return A.z.prototype.gS.call(this,0)},
q(a){return"null"}}
A.z.prototype={$iz:1,
ag(a,b){return this===b},
gS(a){return A.ds(this)},
q(a){return"Instance of '"+A.dt(this)+"'"},
gU(a){return A.nk(this)},
toString(){return this.q(this)}}
A.dK.prototype={
q(a){return""},
$ib4:1}
A.ip.prototype={
gc4(){var s,r=this.b
if(r==null)r=$.hM.$0()
s=r-this.a
if($.jU()===1e6)return s
return s*1000},
bw(){var s=this,r=s.b
if(r!=null){s.a=s.a+($.hM.$0()-r)
s.b=null}}}
A.bF.prototype={
gk(a){return this.a.length},
q(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ilT:1}
A.ik.prototype={
bC(a){return this.d.bp(a,new A.im(this,a))},
cd(a,b){var s=J.ar(this.bC(a),b)
return new A.bu((s.a+0.5-this.a/2)*16,(s.b+0.5-this.b/2)*16)}}
A.im.prototype={
$0(){var s,r,q,p,o,n,m,l,k,j=this.b+1,i=A.c([],t.c7)
for(s=-j,r=this.a,q=r.b+j,p=r.a+j,r=r.c,o=r.length!==0,n=A.h(r),m=n.h("a(1)"),n=n.h("I<1,a>"),l=s;l<q;++l)for(k=s;k<p;++k)if(o&&new A.I(r,m.a(new A.il(k,l)),n).af(0,B.V)===j)i.push(new A.bu(k,l))
return i},
$S:45}
A.il.prototype={
$1(a){t.bP.a(a)
return Math.max(Math.abs(this.a-a.a),Math.abs(this.b-a.b))},
$S:47}
A.eB.prototype={}
A.bd.prototype={
gd4(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=t.S,f=A.a4(g,g)
for(g=h.x,g=new A.ak(g,g.r,g.e,A.k(g).h("ak<2>")),s=h.a,r=h.y,q=h.z,p=s.b,o=s.a;g.j();){n=g.d
m=s.a2(n.a)
l=!0
if(n.as){k=n.d
if(k!=null)if(m!=null)if(!m.fr)if(!(m.f<=0)){j=m.a
if(!r.p(0,j)){i=m.as
if(!((i===B.f||i===B.d)&&!q.p(0,j)))if(n.y>=p){l=s.G(k)
l=(l==null?null:l.b)!==o}}}}if(l)continue
n=n.d
n.toString
f.cl(n,new A.dU(),new A.dV())}return f},
V(){var s,r=this,q=r.x,p=A.k(q).h("Q<2>")
q=A.n(new A.Q(q,p),p.h("b.E"))
s=A.k0(r.a,r.b,r.c,q)
s.d=r.d
s.e=r.e
s.f=r.f
s.r=r.r
q=s.w
q.bl(0)
q.F(0,r.w)
s.y.F(0,r.y)
s.z.F(0,r.z)
s.Q.F(0,r.Q)
s.as.F(0,r.as)
s.ax.F(0,r.ax)
s.at.F(0,r.at)
s.ay.F(0,r.ay)
return s},
v(a){var s=this.a.v(a),r=A.h(s),q=r.h("d<1>")
s=A.n(new A.d(s,r.h("e(1)").a(new A.e7(this)),q),q.h("b.E"))
return s},
P(a){var s
if(a.cx==null){s=this.w.i(0,a.a)
if(s==null)s=a.d}else s=a.gZ()
return s},
N(a){var s,r=this.v(a).length,q=this.gd4().i(0,a)
if(q==null)q=0
s=this.as.p(0,a)?1:0
return r+q+s},
ab(a){var s=this,r=a.a
if(B.a.D(s.v(r),new A.e6()))return s.a8(a)?1:2
return s.at.p(0,r)||s.a8(a)?0:1},
a8(a){return this.ay.bp(a.a,new A.ee(this,a))},
dv(a){var s,r,q,p,o,n,m=this
t.E.a(a)
s=A.h(a)
r=s.h("d<1>")
q=A.n(new A.d(a,s.h("e(1)").a(new A.e9(m)),r),r.h("b.E"))
if(q.length===0)return A.c([],t.Y)
p=A.a4(t.S,t.i)
s=m.a.gR()
r=s.$ti
o=r.h("d<b.E>")
n=A.n(new A.d(s,r.h("e(b.E)").a(new A.ea(m,p,q)),o),o.h("b.E"))
B.a.C(n,new A.eb(m,p))
return n},
cc(a){var s=this,r=a.a
return!s.at.p(0,r)&&!s.as.p(0,r)&&a.ay&&s.N(r)<s.ab(a)+2},
aG(a){var s,r,q,p,o,n,m,l=this,k=a.c,j=l.a.G(k)
if(j==null)return!1
if(l.a8(j))return a.e!==2
s=l.v(k)
k=A.h(s)
r=k.h("e(1)")
k=k.h("d<1>")
q=A.b1(new A.d(s,r.a(new A.dW()),k),t.r)
if(q!=null){if(s.length<=2||a.a===q.a)return!1
p=A.n(new A.d(s,r.a(new A.dX(q)),k),k.h("b.E"))
B.a.C(p,new A.dY(l,j))
k=B.a.gI(p)
r=l.b
o=l.P(j)
n=r.b.i(0,"soldierLimit")
n.toString
m=A.h(p)
return a.a!==new A.d(p,m.h("e(1)").a(new A.dZ(l,j,A.bR(k,r,o,B.b.n(n)))),m.h("d<1>")).gT(0).a}if(s.length<=1)return!1
o=new A.e1(l,j)
B.a.C(s,new A.e_(o))
n=o.$1(B.a.gI(s))
if(typeof n!=="number")return n.bs()
return a.a!==new A.d(s,r.a(new A.e0(o,n*0.6)),k).gT(0).a},
a5(a){var s,r,q,p,o,n,m=this,l=m.b,k=l.r
l=l.b
s=l.i(0,"monthSeconds")
s.toString
r=l.i(0,"budgetSafety")
r.toString
Math.min(k.p1,s+r)
s=m.a
r=s.r
q=A.h(r)
p=t.S
new A.d(r,q.h("e(1)").a(new A.e2(m)),q.h("d<1>")).L(0,m.r,new A.e3(),p)
q=s.gR()
r=q.$ti
o=r.h("d<b.E>")
n=A.n(new A.d(q,r.h("e(b.E)").a(new A.e4(m)),o),o.h("b.E"))
if(n.length!==0){if(s.gaq().r==null){s=l.i(0,"countryIncome")
s.toString
B.b.n(s)}l=l.i(0,"poorPenalty")
l.toString
B.b.n(l)}B.a.L(n,0,new A.e5(m),p)
return new A.eB(a?0:k.f)},
aH(){return this.a5(!1)},
b_(a,b){var s,r,q,p,o,n,m,l,k=this,j="capacityPerLevel",i=!0
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
n=B.c.A(p[m]-b.x,0,99999)}if(r>=q.ai(k.a.c)||n==null||k.d<=n)return!1
if(a.b===a.c)l=1
else{p=q.b.i(0,"foreignYield")
p.toString
l=p}p=k.f
o=r+1
q=q.b
m=q.i(0,j)
m.toString
m=B.b.a6(o*B.b.n(m)*l)
q=q.i(0,j)
q.toString
k.f=p+(m-B.b.a6(r*B.b.n(q)*l))
k.d=k.d-n
i.u(0,s,o)
k.ax.m(0,s)
return!0},
dh(a){var s,r,q,p,o=this
if(!a.db||a.e===2||o.y.p(0,a.a))return!1
s=a.as
r=s!==B.f
if(!r||s===B.d){q=a.c
q=!o.at.p(0,q)&&o.v(q).length<=1}else q=!1
if(q)return!1
q=a.a
o.y.m(0,q)
o.x.ar(0,q)
o.Q.m(0,q)
o.d=o.d+a.x
q=o.f
p=o.e
o.e=Math.min(q,p+(!r||s===B.d?a.gJ():0))
return!0},
aA(a){var s,r,q,p,o=this,n="soldierCost",m=Math.max(0,o.f-o.e)
if(o.a.gaq().x){s=o.d
r=o.b.b.i(0,n)
r.toString
r=Math.max(0,B.c.b2(s,B.b.n(r)))
s=r}else s=0
r=Math.max(0,o.d-o.a5(a).a)
q=o.b.b.i(0,n)
q.toString
p=Math.min(m,Math.min(s,B.b.b2(r,B.b.n(q))))
return p>0&&o.c_(p)?p:0},
c_(a){var s,r,q=this
if(!q.a.gaq().x)return!1
s=q.b.b.i(0,"soldierCost")
s.toString
r=a*B.b.n(s)
if(a>0){s=q.d
s=s<=0||r>s||q.e+a>q.f}else s=!0
if(s)return!1
q.d-=r
q.e+=a
return!0},
ci(a,b){var s,r,q=this,p=q.b.b.i(0,"drawCost")
p.toString
s=B.b.n(p)
p=!0
if(a.ay){r=q.as
if(!r.p(0,a.a))if(q.a.x>r.a){p=q.d
p=p<=0||p<s+q.a5(b).a}}if(p)return!1
q.d-=s
q.r=q.r+q.a.y
q.as.m(0,a.a)
return!0},
df(a,b){var s,r,q,p=this
if(a.cx){s=a.a
s=p.Q.p(0,s)||p.y.p(0,s)}else s=!0
if(s)return!1
s=a.c
r=!1
if(p.v(s).length<=1){q=p.a
if(q.G(s)!=null){q=q.G(s)
q.toString
q=p.a8(q)}else q=!1
if(!q){r=!(p.at.p(0,s)&&b.b==="evacuate"&&b.as)
s=r}else s=r}else s=r
if(s)return!1
s=p.e
r=p.b.b.i(0,"soldierLimit")
r.toString
p.e=s-Math.min(s,B.b.n(r)-a.gJ())
r=a.a
p.z.m(0,r)
p.Q.m(0,r)
p.x.u(0,r,b)
return!0},
dw(a,b){var s
if(!a.cy||this.Q.p(0,a.a)||a.fr)return!1
s=a.a
this.Q.m(0,s)
this.x.u(0,s,b)
return!0}}
A.dU.prototype={
$1(a){return A.i(a)+1},
$S:20}
A.dV.prototype={
$0(){return 1},
$S:11}
A.e7.prototype={
$1(a){var s=this.a,r=t.r.a(a).a
return!s.y.p(0,r)&&!s.z.p(0,r)},
$S:0}
A.e6.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.ee.prototype={
$0(){var s,r,q=this.b,p=this.a,o=p.a,n=o.a
if(q.b===n){s=q.e
if(s==null)s=null
else{r=s.$ti
r=new A.I(s,r.h("a?(v.E)").a(new A.ec(p)),r.h("I<v.E,a?>"))
s=r}s=A.nA(n,B.a.D(o.r,new A.ed(p,q)),q.cx!=null,s)
q=s}else q=!1
return q},
$S:60}
A.ec.prototype={
$1(a){var s=this.a.a.G(A.i(a))
return s==null?null:s.b},
$S:33}
A.ed.prototype={
$1(a){var s
t.r.a(a)
if(a.b!==this.a.a.a){s=a.as
s=!(s===B.f||s===B.d)&&!a.fr&&a.f>0&&a.k4===this.b.a}else s=!1
return s},
$S:0}
A.e9.prototype={
$1(a){return t.q.a(a).b!==this.a.a.a},
$S:1}
A.ea.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.a
r=a.a
if(s.at.p(0,r)||!a.ay)return!1
if(a.cx!=null&&s.N(r)>=s.P(a))return!1
s=this.c
q=A.h(s)
this.b.u(0,r,new A.I(s,q.h("j(1)").a(new A.e8(a)),q.h("I<1,j>")).af(0,B.u))
return!0},
$S:1}
A.e8.prototype={
$1(a){return this.a.f.E(t.q.a(a).f)},
$S:37}
A.eb.prototype={
$2(a,b){var s,r,q,p,o,n=t.q
n.a(a)
n.a(b)
n=this.a
s=n.a8(a)?1:0
r=B.c.t(s,n.a8(b)?1:0)
if(r!==0)return r
n=this.b
s=a.a
q=n.i(0,s)
q.toString
p=b.a
n=n.i(0,p)
n.toString
o=B.b.t(q,n)
return o!==0?o:B.c.t(s,p)},
$S:4}
A.dW.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.dX.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.dY.prototype={
$2(a,b){var s,r,q,p,o,n="soldierLimit",m=t.r
m.a(a)
m.a(b)
m=this.a
s=m.b
r=this.b
q=m.P(r)
p=s.b
o=p.i(0,n)
o.toString
o=A.bR(b,s,q,B.b.n(o))
r=m.P(r)
p=p.i(0,n)
p.toString
return B.b.t(o,A.bR(a,s,r,B.b.n(p)))},
$S:2}
A.dZ.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=s.b
s=s.P(this.b)
q=r.b.i(0,"soldierLimit")
q.toString
return A.bR(a,r,s,B.b.n(q))>=this.c*0.6},
$S:0}
A.e1.prototype={
$1(a){var s=this.a,r=s.b,q=s.P(this.b),p=r.b.i(0,"soldierLimit")
p.toString
return A.bR(a,r,q,Math.min(B.b.n(p),s.e))},
$S:21}
A.e_.prototype={
$2(a,b){var s,r=t.r
r.a(a)
s=this.a
return J.jY(s.$1(r.a(b)),s.$1(a))},
$S:2}
A.e0.prototype={
$1(a){var s=this.a.$1(t.r.a(a))
if(typeof s!=="number")return s.dM()
return s>=this.b},
$S:0}
A.e2.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.y.p(0,a.a)},
$S:0}
A.e3.prototype={
$2(a,b){return A.i(a)+t.r.a(b).y},
$S:22}
A.e4.prototype={
$1(a){return!this.a.at.p(0,t.q.a(a).a)},
$S:1}
A.e5.prototype={
$2(a,b){var s,r,q
A.i(a)
t.q.a(b)
s=this.a
r=s.w.i(0,b.a)
r.toString
s=s.b.b
q=s.i(0,"incomeStep")
q.toString
q=B.b.n(q)
if(b.b===b.c)s=1
else{s=s.i(0,"foreignYield")
s.toString}return a+B.b.a6((b.ax+(r-1)*q)*s)},
$S:8}
A.eF.prototype={
gaj(){var s=this
return s.a!==s.d.a&&s.b>=s.e.r.w},
gbb(){return Math.max(0,this.b-this.e.r.w)},
gc6(){if(this.gaj()){var s=this.e.r
s=Math.max(0,s.x+this.gbb()*s.y)}else s=0
return s},
br(a,b){return a===0||!this.gaj()||b<=1?a:Math.min(this.e.r.fy,a+1+B.c.bi(this.gbb(),2))}}
A.eG.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.eH.prototype={
$2(a,b){var s,r
A.i(a)
t.q.a(b)
s=this.a
s=s==null?null:s.i(0,b.a)
if(s==null)s=b.d
r=this.b.b.i(0,"incomeStep")
r.toString
return a+b.ax+(s-1)*B.b.n(r)},
$S:8}
A.bh.prototype={
aP(){return"CombatAdvantage."+this.b}}
A.bU.prototype={}
A.eI.prototype={
aJ(a1,a2,a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l=this,k="soldierHp",j=a6==null,i=j?a1.gJ():a6,h=a4==null,g=h?a2.gJ():a4,f=a1.f,e=a1.at,d=a2.f,c=a2.at,b=a1.a+":"+A.t(f)+":"+a1.w+":"+A.t(e)+":"+A.t(a1.ax)+":"+a2.a+":"+A.t(d)+":"+a2.w+":"+A.t(c)+":"+A.t(a2.ax)+":"+a5+":"+a3+":"+a7+":"+i+":"+g,a=l.c,a0=a.i(0,b)
if(a0!=null)return a0
if(!l.b.d5())return B.a4
if(j)j=B.a.L(e,0,new A.eJ(),t.H)
else{j=l.a.b.i(0,k)
j.toString
j=i*B.b.n(j)}if(h)h=B.a.L(c,0,new A.eK(),t.H)
else{h=l.a.b.i(0,k)
h.toString
h=g*B.b.n(h)}s=a5===0&&a3===0
j=(f+j)*l.bM(a1,i,a5,a7,s)
h=(d+h)*l.bM(a2,g,a3,a7,s)
r=Math.max(1,j+h)
q=(j*0.9-h*1.1)/r
p=(j*1.1-h*0.9)/r
o=l.a.r.R8
if(q>o)n=B.e
else n=p<-o?B.v:B.a3
j=A.c([],t.s)
if(a5>0||a3>0)j.push("\u57ce\u9632\u589e\u52a0\u653b\u51fb\u4e0e\u5f00\u573a\u58eb\u6c14")
j.push("\u4f59\u91cf\u4e3a\u9759\u6001\u98ce\u9669\u6307\u6807\uff0c\u5e76\u975e\u80dc\u7387")
m=new A.bU(n,q,p)
if(a.a>=256)a.ar(0,new A.a9(a,A.k(a).h("a9<1>")).gI(0))
a.u(0,b,m)
return m},
d8(a,b,c){return this.aJ(a,b,c,null,0,null,0)},
da(a,b,c,d,e){return this.aJ(a,b,c,d,0,e,0)},
aI(a,b,c,d){return this.aJ(a,b,0,null,c,d,0)},
c1(a,b,c,d){return this.aJ(a,b,c,d,0,null,0)},
d9(a,b,c){return this.aJ(a,b,0,null,0,null,c)},
bM(a,b,c,d,e){var s,r,q=this.a,p=q.bk(a.w,c,e,d),o=q.b.i(0,"soldierPower")
o.toString
o=B.b.n(o)
s=B.b.aL(a.ax)
r=q.cb(s,e?0:c)
return(B.c.bi(p+b*o+2,4)+1)*1.5*(1+B.b.A(r/1000,0,0.1))}}
A.eJ.prototype={
$2(a,b){return A.u(a)+A.ap(b)},
$S:12}
A.eK.prototype={
$2(a,b){return A.u(a)+A.ap(b)},
$S:12}
A.cW.prototype={
K(){var s=this
return A.T(["interval",s.a,"resourceInterval",s.e,"cashBuffer",s.f,"payrollRatio",s.r,"dangerousCountryCities",s.w,"coalitionBudgetBase",s.x,"coalitionBudgetStep",s.y,"coalitionTargetBase",s.z,"coalitionTargetStep",s.Q,"coalitionPayrollCeiling",s.as,"coalitionTravel",s.at,"targetTravelScale",s.ax,"hatredTargetBonus",s.ay,"breakthroughMargin",s.ch,"threat",s.b,"urgent",s.c,"margin",s.d,"commit",s.CW,"rearExtra",s.cy,"candidates",s.db,"assessments",s.dx,"routes",s.dy,"plans",s.fr,"commands",s.fx,"team",s.fy,"fronts",s.k1,"singleFrontMonths",s.k2,"splitForce",s.k3,"splitAdvantage",s.k4,"arrivalSpread",s.ok,"expeditionSeconds",s.p1,"assaultCommitDistance",s.p2,"recallCriticalMargin",s.p3,"attritionCombat",s.p4,"targets",s.go,"slice",s.id,"advantage",s.R8,"expansion",s.RG,"age",s.cx,"timeout",s.rx,"restarts",s.ry,"stagnation",s.to],t.N,t.X)}}
A.ax.prototype={}
A.eL.prototype={
bx(){return new A.aA(this.cu(),t.gL)},
cu(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8
return function $async$bx(j9,k0,k1){if(k0===1){p.push(k1)
r=q}for(;;)switch(r){case 0:j6={}
j7=s.c
j8=s.a
if(j7.b!==j8.a||j7.c!==s.b.a)throw A.f(B.ae)
o=j7.Q
n=o.f
if(n.length>64||o.r.length>256||o.w.length>32)throw A.f(B.af)
m=s.e
m===$&&A.O()
l=s.f
l===$&&A.O()
k=new A.ir(o,j8,m,l)
j=o.gR(),i=J.A(j.a),j=new A.a0(i,j.b,j.$ti.h("a0<1>")),h=s.x
case 3:if(!j.j()){r=4
break}g=i.gl()
h.u(0,g.a,k.dz(g))
r=5
return j9.b=0,1
case 5:r=3
break
case 4:j=A.k(h).h("Q<2>")
f=new A.Q(h,j).D(0,new A.fg())
i=j7.x
g=i===B.o
if(g&&f){j7=s.d
s.w=new A.by("defending",null,0,1,B.L,A.c(["\u4e3b\u89d2\u6240\u5728\u57ce\u5c1a\u6709\u660e\u786e\u751f\u547d\u98ce\u9669\uff0c\u6682\u505c\u65b0\u8fdc\u5f81\uff0c\u4f18\u5148\u5b8c\u6210\u9632\u5b88\u8c03\u5ea6"],t.s),j7.e,j7.c,j7.d,0)
r=1
break}e=j7.as
d=A.h(e)
c=d.h("d<1>")
e=A.n(new A.d(e,d.h("e(1)").a(new A.fh(s)),c),c.h("b.E"))
b=A.k0(o,j8,m,e)
j6.a=b
r=i===B.E?6:7
break
case 6:o=s.r
o===$&&A.O()
s.w=new A.du(j7,j8,o,l,h).ce(b)
r=8
return j9.b=1,1
case 8:r=1
break
case 7:e=t.Z
a=A.c([],e)
d=t.s
a0=A.c([],d)
c=s.d
a1=s.r
a1===$&&A.O()
a2=new A.fA(j7,j8,c,l,a1,h)
a3=j.h("d<b.E>")
a4=A.n(new A.d(new A.Q(h,j),j.h("e(b.E)").a(new A.fi()),a3),a3.h("b.E"))
B.a.C(a4,new A.fs())
j=t.bQ
a5=A.c([new A.ax(j6.a,A.c([],e),A.c([],d),0,0)],j)
a3=g?A.c([],t.bL):a4
a6=a3.length
a7=t.N
a8=t.S
a9=j8.r
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
c1=a2.c0(b6,c0.a),c2=c1.$ti,c1=new A.aV(c1.a(),c2.h("aV<1>")),c3=c0.d,c4=c0.e,c5=c0.c,c6=c0.b,c2=c2.c
case 15:if(!c1.j()){r=16
break}c7=c1.b
if(c7==null)c7=c2.a(c7)
c8=A.n(c6,b1)
B.a.F(c8,c7.b)
if(B.a.L(c8,0,new A.ft(),a8)>b0){c.e=!0
r=15
break}c9=c7.a
d0=A.n(c5,a7)
d1=c7.e
if(d1.length!==0)d0.push(d1)
d1=c7.c
c7=c7.d?1:0
B.a.m(b7,new A.ax(c9,c8,d0,c3+d1,c4+c7))
r=17
return j9.b=1,1
case 17:r=15
break
case 16:case 13:a5.length===b8||(0,A.x)(a5),++b9
r=12
break
case 14:if(b7.length!==0){B.a.C(b7,new A.fu())
b8=A.i(Math.min(4,b4))
c1=new A.E(b7,0,b8,b3)
c1.a0(b7,0,b8,b2)
a5=c1.al(0)}case 10:a3.length===a6||(0,A.x)(a3),++b5
r=9
break
case 11:if(a4.length!==0&&!g){d2=B.a.gI(a5)
j6.a=d2.a
B.a.F(a,d2.b)
B.a.F(a0,d2.c)
j=d2.e
if(j>0){j=""+j
B.a.m(a0,c.e?"\u89c4\u5212\u914d\u989d\u5df2\u7528\u5c3d\uff1a"+j+" \u5ea7\u57ce\u5c1a\u672a\u627e\u5230\u5b8c\u6574\u65b9\u6848\uff0c\u4e0d\u80fd\u636e\u6b64\u65ad\u5b9a\u65e0\u6cd5\u633d\u6551":"unsalvageableDefense\uff1a"+j+" \u5ea7\u57ce\u5728\u5f53\u524d\u9501\u5b9a\u3001\u8d44\u91d1\u6216\u65f6\u9650\u4e0b\u672a\u627e\u5230\u5b8c\u6574\u4fee\u590d\u65b9\u6848")}d3="defending"}else d3="preparing"
if(a4.length!==0)d3="defending"
if(!g){d4=s.cR(j6.a)
if(d4!=null){j6.a=d4.a
B.a.m(a,d4.b)
B.a.m(a0,"\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5176\u4ed6\u5b89\u5168\u57ce\u6c60\u7ee7\u7eed\u7ec4\u7ec7\u8fdb\u653b")}}r=18
return j9.b=2,1
case 18:for(j=o.r,g=A.h(j),a3=g.h("e(1)"),a6=a3.a(new A.fv(s)),g=g.h("d<1>"),b1=g.h("e(b.E)").a(new A.fw(s)),a6=new A.d(j,a6,g).gB(0),b1=new A.a0(a6,b1,g.h("a0<b.E>")),b2=t.w,b3=t.e,b4=t.Y,b8=j8.b;b1.j();){c1=a6.gl()
if(c1.e!==1)continue
d5=o.a2(c1.go)
if(d5==null)continue
d6=o.G(c1.ch)
d7=!1
if(c1.as===B.x)if(d6!=null){c2=j6.a.x.i(0,c1.a)
if((c2==null?null:c2.f)!==!0)if(c1.gJ()<d5.gJ()){c2=d6.cx
if(c2==null)c2=d6.d
else{c3=d6.cy
c4=d6.fx?1:0
c4=B.c.A(c2-c3-c4,0,5)
c2=c4}c2=l.d8(c1,d5,c2).c<0}else c2=d7
else c2=d7
d7=c2}d8=!1
if(c1.f<c1.r*0.25)if(c1.id>=2){c2=c1.k1
if(c2>0){c3=c1.gbm()
c4=d5.gbm()
c5=Math.max(1,c1.k2)
c6=b8.i(0,"retreatSurvivalRatio")
c6.toString
c6=c3/c2<c4/c5*c6
c2=c6}else c2=d8
d8=c2}if(!d7&&!d8)continue
c2=j6.a
c3=c1.a
if(c2.Q.p(0,c3))continue
j6.a.Q.m(0,c3)
c2=d7?"\u9ad8\u7ea7\u5c06\u9886\u5175\u529b\u843d\u540e\uff0c\u5f53\u524d\u5c5e\u6027\u5df2\u4e0d\u9002\u5408\u7ee7\u7eed\u653b\u57ce\uff0c\u8d81\u4ecd\u6709\u751f\u547d\u7533\u8bf7\u5408\u6cd5\u64a4\u9000\u6574\u5907":"\u9ad8\u7ea7\u5c06\u9886\u751f\u547d\u4f4e\u4e8e\u56db\u5206\u4e4b\u4e00\uff0c\u5df2\u53d1\u751f\u7684\u4f24\u5bb3\u663e\u793a\u80dc\u671b\u6e3a\u832b\uff0c\u7533\u8bf7\u6709\u98ce\u9669\u7684\u5408\u6cd5\u64a4\u9000"
c3=A.c([new A.F(B.Q,c3,null,null,0)],b2)
c4=A.c([c1,d5],b3)
c1=o.G(c1.c)
c1.toString
B.a.m(a,new A.S(c2,c3,a1.ak(c4,A.c([c1],b4)),B.p,0,!0))}r=19
return j9.b=3,1
case 19:a6=g.h("b.E")
d9=A.n(new A.d(j,a3.a(new A.fx(j6,s)),g),a6)
b1=d9.length,b8=!f,c1=o.a,c2=o.b,c3=t.m,c4=t.a,c5=a9.to,c6=c5*60,b5=0
case 20:if(!(b5<d9.length)){r=22
break}e0=d9[b5]
c7=e0.a
if(j6.a.Q.p(0,c7)){r=21
break}e1=j6.a.x.i(0,c7)
c8=e0.as
c9=c8===B.q
e2=!1
if(c9)if(e0.k3.length<=1){d0=e0.ay
d0=d0!=null&&e0.z.E(d0)<1
e2=d0}if(c9&&!e2){r=21
break}e3=s.cN(e0,e1)
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
if(d1){if(c8===B.h&&!e0.p1){e7=s.bP(j6.a,e0,e1)
if(e7!=null){j6.a=e7.a
B.a.m(a,e7.b)}}r=21
break}e8=s.bR(j6.a,e0)
if(e8!=null){j6.a=e8.a
B.a.m(a,e8.b)
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
f0=d0&&c8===B.h&&!e0.p1&&e1.x+1>=J.N(e1.w)
d1=!e2
f1=!0
if(d1)if(c8===B.h){if(!e0.p1)if(d0)if(!e4)e5=f0&&B.a.p(A.c(["intercept","standby"],d),e1.b)
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
if(d1){e7=s.bP(j6.a,e0,e1)
if(e7!=null){j6.a=e7.a
B.a.m(a,e7.b)
r=21
break}if(c.e&&e5){r=21
break}}if((c9?null:e1.as)===!0){d1=c9?null:e1.d
d1=e0.ch==d1&&!e4&&!f2}else d1=!1
if(d1){r=21
break}if((c9?null:e1.b)==="intercept")if(o.a2(c9?null:e1.r)!=null){d1=h.i(0,c9?null:e1.d)
if(d1==null)d1=null
else d1=d1.d.length!==0||d1.a.cx!=null
d1=d1!==!0
f3=d1}else f3=!0
else f3=!1
d1=!f2
if(d1&&f3&&e1.z>c2&&e0.f>=e0.r*0.65){r=21
break}if(d0&&d1&&!e4&&!f3&&e1.z>c2&&!A.kK(e0,o,j6.a,j8)&&e0.f>=e0.r*0.5){r=21
break}e6=e0.p1
if(e6&&d0&&!e4&&!e3&&e5){r=21
break}f4=A.jM(e0,o,j6.a)
d0=!1
if(d1)if(A.kK(e0,o,j6.a,j8))d0=e0.f>=e0.r*0.25||o.v(f4.a).length===0
if(d0){B.a.m(a0,c7+"\u5df2\u4e34\u8fd1\u4e3b\u653b\u76ee\u6807\uff0c\u4fdd\u6301\u8fdb\u653b\uff0c\u4e0d\u56e0\u666e\u901a\u9884\u8b66\u6216\u6574\u5907\u9884\u7b97\u6298\u8fd4")
r=21
break}if((c9?null:e1.b)==="expedition"&&d1&&!e4&&e0.f>=e0.r*0.65&&e1.x+1<J.N(e1.w)){r=21
break}if(d1&&!f3&&!e4&&e0.f>=e0.r*0.65&&c8!==B.h){r=21
break}d0=o.gR()
d1=d0.$ti
e5=d1.h("d<b.E>")
f5=A.n(new A.d(d0,d1.h("e(b.E)").a(new A.fy(j6,s,e4,e1)),e5),e5.h("b.E"))
B.a.C(f5,new A.fz(e0))
d0=A.h(f5)
d1=d0.h("E<1>")
e5=new A.E(f5,0,3,d1)
e5.a0(f5,0,3,d0.c)
e5=new A.q(e5,e5.gk(0),d1.h("q<l.E>"))
d0=e0.f<e0.r*0.65
d1=d1.h("l.E")
while(e5.j()){f6=e5.d
if(f6==null)f6=d1.a(f6)
if(!c.a4())break
f7=m.aC(e0,f6.f,o,!0,f6)
f8=j6.a
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
f9=g2===!0?h.i(0,f9).gaa():1/0
g3=a1.co(f8,e0,f7,!0,f9,!0,g0!==!0,g1,"regroup",f6)
if(g3!=null){j6.a=g3.a
B.a.m(a,g3.b)
break}}if((f1||e3||e9)&&!j6.a.Q.p(0,c7)){if(e3)g4="\u968f\u519b\u5175\u529b\u4e0d\u8db3\u4e14\u6682\u65e0\u5b89\u5168\u6574\u5907\u5730\u70b9\uff0c\u505c\u6b62\u63a8\u8fdb\u5e76\u7b49\u5f85\u91cd\u65b0\u8c03\u5ea6"
else g4=e9?"\u539f\u8fdb\u653b\u76ee\u6807\u5df2\u7ecf\u6613\u4e3b\uff0c\u6682\u65e0\u5408\u9002\u7684\u65b0\u76ee\u6807\u6216\u5b89\u5168\u5165\u57ce\u65b9\u6848\uff0c\u505c\u6b62\u65e7\u8fdc\u5f81\u5e76\u7ee7\u7eed\u590d\u67e5":"\u5f53\u524d\u6ca1\u6709\u5408\u9002\u7684\u622a\u51fb\u6216\u8fdb\u653b\u76ee\u6807\uff0c\u53cb\u57ce\u4e5f\u6ca1\u6709\u5b89\u5168\u5165\u57ce\u65b9\u6848\uff0c\u6682\u65f6\u5f85\u547d\u5e76\u7ee7\u7eed\u590d\u67e5"
B.a.m(a0,c7+"\uff1a"+g4)
if((c9?null:e1.b)!=="standby"||e4){if(e3||e9)g5=c8!==B.h||e6
else g5=!1
c8=e0.c
c9=A.c([e0.z],c4)
d0=B.b.aL(c6)
d1=g5?1:0
g6=new A.a7(c7,"standby",g4,c8,null,!1,null,c9,0,c2+d0,c2,0,!1,!1,e0.fy+d1)
j6.a.x.u(0,c7,g6)
d1=A.c([],b2)
if(g5)d1.push(new A.F(B.P,c7,null,null,0))
c7=A.c([g6],c3)
c9=A.c([e0],b3)
c8=o.G(c8)
c8.toString
B.a.m(a,new A.S(g4,d1,a1.ak(c9,A.c([c8],b4)),c7,0,!1))}}r=23
return j9.b=4,1
case 23:case 21:d9.length===b1||(0,A.x)(d9),++b5
r=20
break
case 22:g7=A.n(new A.d(j,a3.a(new A.fj(j6,s,f)),g),a6)
B.a.C(g7,new A.fk(s))
j=j7.y
g=j7.z
g8=A.dp(o,j6.a,j8,g,j)
d=A.a4(a8,a8)
for(a3=g8.f,a6=new A.bl(a3,a3.r,a3.e,A.k(a3).h("bl<1>"));a6.j();){b1=a6.d
b2=a3.i(0,b1)
b2=b2==null?null:J.N(b2)
d.u(0,b1,b2==null?0:b2)}g9=g8.gY()
if(g9==null)g9=g8.gcf()
if(g8.gY()!=null&&a4.length===0)d3="attacking"
a3=g7.length,a6=j7.f,c5=j7.w>c5/a9.a,b1=a9.k4,b2=a9.fy,a9=a9.go,b3=A.h(n),b4=b3.h("e(1)"),b3=b3.h("d<1>"),c1=b3.h("b.E"),h0=0,h1=1,h2=!1,b5=0
case 24:if(!(c2=g7.length,b5<c2)){r=26
break}e0=g7[b5]
h3={}
c2=e0.a
if(j6.a.Q.p(0,c2)||j6.a.y.p(0,c2)){r=25
break}h4=o.G(e0.c)
c2=h4.a
b6=h.i(0,c2)
c3=b6==null
if(c3)c4=null
else c4=b6.d.length!==0||b6.a.cx!=null
if(c4===!0){if(c3)c4=null
else{c4=b6.f
c4=c4==null?null:c4.a}c4=c4!==B.e}else c4=!1
if(c4){r=25
break}if(c3)c4=null
else c4=b6.d.length!==0||b6.a.cx!=null
c6=j6.a
if(c4===!0){c4=c6.ab(h4)
c6=j6.a
c7=h4.cx
if(c7==null){c6=c6.w.i(0,c2)
if(c6==null)c6=h4.d}else{c6=h4.cy
c8=h4.fx?1:0
c8=B.c.A(c7-c6-c8,0,5)
c6=c8}h5=Math.min(c4,c6)}else h5=c6.ab(h4)
if(j6.a.v(c2).length<=h5){r=25
break}if(c3)c2=null
else c2=b6.d.length!==0||b6.a.cx!=null
if(c2===!0&&!s.bh(h4,e0,j6.a)){r=25
break}h6=A.dp(o,j6.a,j8,g,j)
h7=A.n(new A.d(n,b4.a(new A.fl(s,h6,e0,d)),b3),c1)
B.a.C(h7,new A.fm(s,h6,e0))
h3.a=null
c2=A.h(h7)
c3=c2.h("E<1>")
c4=new A.E(h7,0,a9,c3)
c4.a0(h7,0,a9,c2.c)
c4=new A.q(c4,c4.gk(0),c3.h("q<l.E>"))
c3=c3.h("l.E")
h8=null
h9=-1/0
case 27:if(!c4.j()){r=28
break}c2=c4.d
i0=c2==null?c3.a(c2):c2
if(!c.a4()){r=28
break}i1=i0.a
c2=o.v(i1)
c6=A.h(c2).h("L<1>")
c2=new A.L(c2,c6)
c7=i0.cx
if(c7==null)c7=i0.d
else{c8=i0.cy
c9=i0.fx?1:0
c9=B.c.A(c7-c8-c9,0,5)
c7=c9}c8=new A.E(c2,0,c7,c6.h("E<l.E>"))
c8.a0(c2,0,c7,c6.h("l.E"))
i2=c8.al(0)
f7=m.aB(e0,i0.f,o,i0)
if(!f7.d){r=27
break}c2=A.j8(e0,i0,o,j8,l,c5&&j6.a.d>100?0.05:0).a
i3=c2[1]
i4=a1.cg(c2[2],i0,j6.a,e0)
r=i4===0?29:30
break
case 29:if(g9==null){h1=Math.max(1,Math.min(b2,i2.length))
g9=i1}r=31
return j9.b=5,1
case 31:r=27
break
case 30:if(h6.gY()!=null&&i1!==h6.gY())c6=i4!==1||i3<b1
else c6=!1
if(c6){r=27
break}i5=d.i(0,i1)
if(i5==null)i5=0
i6=i4-i5
if(i6<=0){r=27
break}h1=Math.max(h1,i4)
g3=s.bN(j6.a,e0,i0,i6,i5,c2[0])
if(g3==null){i7=j6.a.V()
i7.d=1e6
i8=s.bN(i7,e0,i0,i6,i5,c2[0])
if(i8!=null){if(a4.length===0)d3="saving"
c2=i7.d
c6=i8.a
i9=c2-c6.d+c6.aH().a
h0=h0===0?i9:Math.min(h0,i9)
if(g9==null)g9=i1}else if(a4.length===0)d3="preparing"
r=27
break}c2=f7.b
j0=A.cT(i0,e0,o,j8,a6,c2)-c2*0.4-(j6.a.d-g3.a.d)*0.5+i3*30
if(j0>h9){h3.a=g3
h1=g3.b.d.length
h9=j0
h8=i0}r=32
return j9.b=5,1
case 32:r=27
break
case 28:c2=h3.a
if(c2!=null){c2=B.a.L(a,0,new A.fn(),a8)
c3=h3.a
c2=c2+c3.b.b.length<=b0}else{c3=c2
c2=!1}if(c2){j6.a=c3.a
B.a.m(a,c3.b)
g9=h8.a
d.cl(g9,new A.fo(h3),new A.fp(h3))
h2=!0}r=33
return j9.b=6,1
case 33:case 25:g7.length===a3||(0,A.x)(g7),++b5
r=24
break
case 26:if(b8&&i!==B.r)for(b5=0;b5<g7.length;g7.length===c2||(0,A.x)(g7),++b5){e0=g7[b5]
if(j6.a.Q.p(0,e0.a))continue
h4=o.G(e0.c)
n=h.i(0,h4.a)
if(n==null)n=null
else n=n.d.length!==0||n.a.cx!=null
if(n===!0&&!s.bh(h4,e0,j6.a))continue
if(B.a.L(a,0,new A.fq(),a8)>=b0)break
e8=s.bR(j6.a,e0)
if(e8!=null){j6.a=e8.a
B.a.m(a,e8.b)}}if(!h2&&b8&&B.a.gI(a5).e===0&&i!==B.r){e8=s.d_(j6.a,g8)
if(e8!=null){j6.a=e8.a
B.a.m(a,e8.b)
d3="preparing"}}if(i===B.D&&B.a.L(a,0,new A.fr(),a8)<b0)B.a.F(a,new A.du(j7,j8,a1,l,h).ce(j6.a).e)
if(h2)d3=a4.length===0?"attacking":"defending"
j1=o.G(g9)
if(j1!=null){j2=A.bg(j1.b,o,j8,null)
if(j2.gaj())B.a.m(a0,"\u76ee\u6807\u56fd\u5360\u6709 "+j2.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.au(j2.c*j2.gc6())+" \u91d1\u5e01\uff0c\u51c6\u5907\u8f6e\u653b\u5175\u529b")}if(a.length===0){j7=j6.a
B.a.m(a0,j7.d<j7.aH().a?"\u56fd\u5e93\u5df2\u4f4e\u4e8e\u65e5\u5e38\u5468\u8f6c\u4f59\u989d\uff0c\u7b49\u5f85\u6536\u5165\uff0c\u7d27\u6025\u9632\u5fa1\u4ecd\u53ef\u7528\u6b3e":"\u6ca1\u6709\u6ee1\u8db3\u5b88\u57ce\u3001\u65f6\u9650\u53ca\u9759\u6001\u98ce\u9669\u7ea6\u675f\u7684\u65b0\u589e\u884c\u52a8\uff0c\u4fdd\u6301\u5df2\u6709\u4efb\u52a1")}if(c5)B.a.m(a0,"\u505c\u6ede\u8bca\u65ad\uff1a"+(d3==="saving"?"\u7f3a\u5c11\u6574\u961f\u540e\u52e4\u8d44\u91d1":"\u7f3a\u5c11\u53ef\u5b89\u5168\u6267\u884c\u7684\u6269\u5f20\u6761\u4ef6")+"\uff0c\u4e0d\u901a\u8fc7\u65e0\u9650\u62db\u52df\u6216\u81ea\u6740\u51fa\u51fb\u6253\u7834\u7b49\u5f85")
j3=A.c([],e)
for(j7=a.length,j4=0,b5=0;b5<a.length;a.length===j7||(0,A.x)(a),++b5){j5=a[b5]
j4+=j5.b.length
if(j4>b0){c.e=!0
B.a.m(a0,"\u547d\u4ee4\u914d\u989d\u5230\u8fbe\uff0c\u53ea\u63d0\u4ea4\u524d\u9762\u5b8c\u6574\u7684\u52a8\u4f5c\u7ec4\uff0c\u540e\u7eed\u7559\u5f85\u4e0b\u4e00\u6b21\u89c4\u5212")
break}B.a.m(j3,j5)}s.w=new A.by(d3,g9,h0,h1,j3,A.U(a0,0,A.X(12,"count",a8),a7).al(0),c.e,c.c,c.d,c.b)
case 1:return 0
case 2:return j9.c=p.at(-1),3}}}},
cR(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this
for(s=a2.c.Q,r=s.gR(),q=J.A(r.a),r=new A.a0(q,r.b,r.$ti.h("a0<1>")),p=a2.x,o=a2.d,n=s.r,m=A.h(n),l=m.h("e(1)"),m=m.h("d<1>"),k=m.h("b.E"),j=a3.at;r.j();){i=q.gl()
h=i.a
if(a3.v(h).length!==0||a3.a8(i)||a3.N(h)>0||j.p(0,h))continue
g=A.n(new A.d(n,l.a(new A.eY(a2,a3)),m),k)
B.a.C(g,new A.eZ(i))
f=A.h(g)
e=f.h("E<1>")
d=new A.E(g,0,4,e)
d.a0(g,0,4,f.c)
d=new A.q(d,d.gk(0),e.h("q<l.E>"))
f=i.f
e=e.h("l.E")
while(d.j()){c=d.d
if(c==null)c=e.a(c)
if(!o.a4())return null
b=a2.e
b===$&&A.O()
a=b.aC(c,f,s,!0,i)
b=a2.r
b===$&&A.O()
a0=p.i(0,h)
a0=a0==null?null:a0.gaa()
a1=b.b1(a3,c,a,!0,a0==null?1/0:a0,!0,"\u524d\u7ebf\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5b89\u5168\u540e\u65b9\u65e0\u9700\u4e3a\u7559\u5b88\u7275\u5236\u90e8\u961f","transfer",i)
if(a1!=null)return a1}}return null},
cN(a,b){var s,r,q,p,o,n,m,l=this,k="soldierLimit",j=b==null
if((j?null:b.b)==="expedition"){s=a.gJ()
r=l.a.b.i(0,k)
r.toString
r=s>=B.b.n(r)
s=r}else s=!0
if(s)return!1
s=l.c.Q
q=s.G(j?null:b.d)
if(q==null||q.b===s.a)return!1
j=s.v(q.a)
r=A.h(j).h("L<1>")
p=A.b1(A.U(new A.L(j,r),0,A.X(q.gZ(),"count",t.S),r.h("l.E")),t.r)
if(p==null)return!1
j=B.a.ao(s.w,new A.eM(q))
s=l.f
s===$&&A.O()
r=q.gZ()
o=l.a
n=o.b.i(0,k)
n.toString
m=s.c1(a,p,r,Math.min(B.b.n(n),p.gJ()+j.c))
if(l.d.e)return!1
if(b.f)return m.c<=0||m.b<o.r.ch
return m.a!==B.e},
bP(b4,b5,b6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this,b2=null,b3=b6==null
if((b3?b2:b6.b)==="expedition")s=b3?b2:b6.d
else s=b2
r=b1.c.Q
q=r.f
p=A.h(q)
o=p.h("d<1>")
n=A.n(new A.d(q,p.h("e(1)").a(new A.eU(b1)),o),o.h("b.E"))
B.a.C(n,new A.eV(b1,s,b5))
for(q=b1.a,p=q.r,o=A.U(n,0,A.X(p.go,"count",t.S),A.h(n).c),m=o.$ti,o=new A.q(o,o.gk(0),m.h("q<l.E>")),b3=!b3,l=t.r,k=p.fy,j=b4.x,i=A.k(j).h("Q<2>"),h=i.h("e(b.E)"),g=i.h("d<b.E>"),f=b1.d,m=m.h("l.E"),q=q.b,e=r.w,p=p.ch;o.j();){d=o.d
if(d==null)d=m.a(d)
if(!f.a4())return b2
c=b1.r
c===$&&A.O()
if(!c.ap(d))continue
b=new A.d(new A.Q(j,i),h.a(new A.eW(b1,b5,d)),g).gk(0)
if(b>=k)continue
a=d.a
a0=r.v(a)
a1=A.h(a0).h("L<1>")
a0=new A.L(a0,a1)
a2=d.cx
a3=a2==null
if(a3)a4=d.d
else{a4=d.cy
a5=d.fx?1:0
a5=B.c.A(a2-a4-a5,0,5)
a4=a5}a5=new A.E(a0,0,a4,a1.h("E<l.E>"))
a5.a0(a0,0,a4,a1.h("l.E"))
a6=A.b1(a5,l)
a0=a6!=null
if(a0){a1=B.a.ao(e,new A.eX(d))
a4=b1.f
a4===$&&A.O()
if(a3)a2=d.d
else{a3=d.cy
a5=d.fx?1:0
a5=B.c.A(a2-a3-a5,0,5)
a2=a5}a3=q.i(0,"soldierLimit")
a3.toString
a7=a4.c1(b5,a6,a2,Math.min(B.b.n(a3),a6.gJ()+a1.c))
if(a7.c<=0||a7.b<p){a8=b1.cP(b4,d,a6,b)
if(a8!=null)return a8
continue}}a1=b1.e
a1===$&&A.O()
a9=a1.aB(b5,d.f,r,d)
if(!b3||b6.b!=="expedition")a="\u91ce\u5916\u4efb\u52a1\u7ed3\u675f\u540e\u5229\u7528\u73b0\u6709\u968f\u8eab\u5175\u529b\uff0c\u8f6c\u653b\u53ef\u4ee5\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u654c\u57ce"
else a=a===s?"\u91cd\u65b0\u6838\u5bf9\u5f53\u524d\u5b88\u519b\u4e0e\u8def\u7ebf\u540e\uff0c\u7ee7\u7eed\u8fdb\u653b\u539f\u76ee\u6807":"\u539f\u76ee\u6807\u4e0d\u518d\u9002\u5408\u8fdb\u653b\uff0c\u8f6c\u5411\u9644\u8fd1\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u654c\u57ce"
b0=c.bt(b4,b5,a9,a0,!0,b,a,"expedition",d)
if(b0!=null)return b0}return b2},
cP(b5,b6,b7,b8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=this,a9="soldierPower",b0=a8.c.Q,b1=b0.r,b2=A.h(b1),b3=b2.h("d<1>"),b4=A.n(new A.d(b1,b2.h("e(1)").a(new A.eN(a8,b5,b6)),b3),b3.h("b.E"))
B.a.C(b4,new A.eO())
b1=B.a.ao(b0.w,new A.eP(b6))
b2=a8.a
b3=b2.b
s=b3.i(0,"soldierLimit")
s.toString
r=Math.min(B.b.n(s),b7.gJ()+b1.c)
b1=b2.bj(b7.w,b6.gZ(),!1)
s=b3.i(0,a9)
s.toString
q=b1+r*B.b.n(s)
s=b3.i(0,"soldierHp")
s.toString
p=b7.f+r*B.b.n(s)
o=A.c([],t.h2)
for(b1=b2.r,b2=b1.fy,s=A.U(b4,0,A.X(b2*2,"count",t.S),A.h(b4).c),n=s.$ti,s=new A.q(s,s.gk(0),n.h("q<l.E>")),m=t.H,b1=b1.ok,l=b6.f,b2-=b8,n=n.h("l.E"),k=a8.d,j=b1*2,i=0,h=1/0,g=0;s.j();){f=s.d
if(f==null)f=n.a(f)
if(o.length>=b2||!k.a4())break
e=a8.e
e===$&&A.O()
d=e.aB(f,l,b0,b6)
if(!d.d||d.b>j)continue
e=d.b
c=Math.min(h,e)
b=Math.max(g,e)
if(b-c>b1)continue
e=f.w
e=B.c.A(B.c.a6(e),0,63)
e=B.c.A(e,0,63)
a=f.gJ()
a0=b3.i(0,a9)
a0.toString
a0=B.b.n(a0)
a1=Math.max(1,q)
i+=(f.f+B.a.L(f.at,0,new A.eQ(),m))*((e+a*a0)/a1)*0.85
B.a.m(o,new A.cF(f,d))
if(i>=p)break
g=b
h=c}if(o.length<2||i<p)return null
a2=A.c([],t.w)
a3=A.c([],t.m)
b0=a8.r
b0===$&&A.O()
a4=b0.ak(A.c([b7],t.e),A.c([b6],t.Y))
for(b1=A.lA(o,0,t.bU),b2=J.A(b1.a),b3=b1.b,b1=new A.bj(b2,b3,A.k(b1).h("bj<1>")),a5=b5;b1.j();){s=b1.c
s=s>=0?new A.aF(b3+s,b2.gl()):A.aB(A.a_())
a6=s.b
a7=b0.bt(a5,a6.a,a6.b,!0,!0,b8+s.a,"\u5916\u56f4\u7f16\u961f\u5df2\u5230\u4f4d\uff0c\u6309\u5b9e\u9645\u5175\u529b\u8f6e\u653b\u524d\u6392\uff0c\u5f3a\u5c06\u5148\u653b\u3001\u5176\u4f59\u63a5\u7eed","expedition",b6)
if(a7==null)return null
a5=a7.a
s=a7.b
B.a.F(a2,s.b)
B.a.F(a3,s.d)
a4.F(0,s.c)}return new A.cl(a5,new A.S("\u5916\u56f4\u5175\u529b\u5408\u8ba1\u8db3\u4ee5\u53d1\u8d77\u8f6e\u653b\uff0c\u4e0d\u518d\u8981\u6c42\u6bcf\u540d\u5c06\u9886\u5355\u72ec\u5360\u4f18",a2,a4,a3,a5.d,!0))},
bR(a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=a.c.Q,a1=t.S,a2=a0.gR().L(0,0,new A.f2(a,a7,a8),a1),a3=a0.f,a4=A.h(a3),a5=a4.h("d<1>"),a6=A.n(new A.d(a3,a4.h("e(1)").a(new A.f3(a)),a5),a5.h("b.E"))
B.a.C(a6,new A.f4(a8))
for(a1=A.U(a6,0,A.X(3,"count",a1),A.h(a6).c),a4=a1.$ti,a1=new A.q(a1,a1.gk(0),a4.h("q<l.E>")),a5=a.a.b,s=a.b,r=a7.x,q=A.k(r).h("Q<2>"),p=(a0.r.length/8|0)+1,o=t.a,a4=a4.h("l.E");a1.j();){n=a1.d
if(n==null)n=a4.a(n)
m=n.gct()
l=A.c([],o)
for(k=n.f,j=k.a,k=k.b,i=0;i<=p;++i){h=A.c([],o)
for(g=0;g<J.N(m.bC(i));++g)h.push(new A.B(j+m.cd(i,g).a,k+m.cd(i,g).b))
B.a.C(h,new A.f5(a8))
B.a.F(l,h)}for(k=l.length,f=0;f<l.length;l.length===k||(0,A.x)(l),++f){e=l[f]
if(!s.p(0,e)||B.a.D(a3,new A.f6(e,n))||new A.Q(r,q).D(0,new A.f7(e)))continue
j=a.e
j===$&&A.O()
d=j.dF(a8,e,a0,n)
if(!d.d)continue
j=a.r
j===$&&A.O()
h=a7.f
c=a5.i(0,"soldierLimit")
c.toString
b=j.cr(a7,a8,d,!0,Math.min(a2,Math.max(0,h-B.b.n(c))),"\u91ca\u653e\u540e\u65b9\u53ca\u524d\u7ebf\u591a\u4f59\u5175\u529b\uff0c\u8d34\u7740\u6700\u8fd1\u654c\u57ce\u7684\u5916\u56f4\u683c\u5b50\u96c6\u7ed3\uff0c\u5230\u8fbe\u540e\u4f9d\u6b21\u8f6e\u653b","staging",n)
if(b!=null)return b}}return null},
d_(b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=a5.c.Q,a7=a6.gR(),a8=a7.$ti,a9=a8.h("d<b.E>"),b0=A.n(new A.d(a7,a8.h("e(b.E)").a(new A.f8(a5)),a9),a9.h("b.E"))
if(b0.length<2)return null
a7=a6.f
a8=A.h(a7)
a9=a8.h("d<1>")
s=A.n(new A.d(a7,a8.h("e(1)").a(new A.f9(a5,b2)),a9),a9.h("b.E"))
a7=t.S
a8=t.i
r=A.a4(a7,a8)
for(a9=b0.length,q=A.h(s),p=q.c,q=q.h("E<1>"),o=a5.a,n=o.r,m=n.go,l=0;l<b0.length;b0.length===a9||(0,A.x)(b0),++l){k=b0[l]
B.a.C(s,new A.fa(k))
j=new A.E(s,0,m,q)
j.a0(s,0,m,p)
r.u(0,k.a,j.L(0,1/0,new A.fb(a5,k),a8))}B.a.C(b0,new A.fc(r))
for(a8=A.h(b0),a7=A.U(b0,0,A.X(2,"count",a7),a8.c),a9=a7.$ti,a7=new A.q(a7,a7.gk(0),a9.h("q<l.E>")),a8=a8.h("L<1>"),q=a8.h("q<l.E>"),p=a5.d,m=a6.c,j=a8.h("l.E"),n=n.at,a9=a9.h("l.E");a7.j();){i=a7.d
if(i==null)i=a9.a(i)
h=i.a
g=r.i(0,h)
g.toString
if(g>n)continue
for(g=new A.L(b0,a8),g=new A.q(g,g.gk(0),q),f=i.f,e=i.d;g.j();){d=g.d
if(d==null)d=j.a(d)
c=d.a
b=r.i(0,c)
b.toString
a=r.i(0,h)
a.toString
if(b<a+10)continue
a0=b1.v(c)
if(a0.length<=b1.ab(d))continue
c=A.h(a0)
b=c.h("d<1>")
a1=A.n(new A.d(a0,c.h("e(1)").a(new A.fd(b1)),b),b.h("b.E"))
B.a.C(a1,new A.fe())
c=A.h(a1)
b=c.h("E<1>")
a=new A.E(a1,0,2,b)
a.a0(a1,0,2,c.c)
a=new A.q(a,a.gk(0),b.h("q<l.E>"))
b=b.h("l.E")
d=d.d
while(a.j()){c=a.d
if(c==null)c=b.a(c)
if(c.x<15||e>=o.ai(m)||d<o.ai(m)||B.a.D(b1.v(h),new A.ff(c)))continue
if(!p.a4())return null
a2=a5.e
a2===$&&A.O()
a3=a2.aC(c,f,a6,!0,i)
a2=a5.r
a2===$&&A.O()
a4=a2.cp(b1,c,a3,!0,!0,"\u540e\u65b9\u5efa\u8bbe\u5df2\u5b8c\u6210\uff0c\u5b89\u5168\u8f6c\u79fb\u9ad8\u5185\u653f\u5c06\u9886\u4e3b\u6301\u524d\u7ebf\u57ce\u9632\u5efa\u8bbe","transfer",i)
if(a4!=null)return a4}}}return null},
bh(a,b,c){var s,r,q=a.a,p=this.x.i(0,q),o=p==null?null:p.d
if(o==null)o=A.c([],t.D)
if(o.length===0)return!0
q=c.v(q)
p=A.h(q)
s=p.h("d<1>")
q=A.n(new A.d(q,p.h("e(1)").a(new A.f0(b)),s),s.h("b.E"))
p=A.h(q).h("L<1>")
r=A.U(new A.L(q,p),0,A.X(c.P(a),"count",t.S),p.h("l.E")).al(0)
if(r.length===0)return!1
return B.a.aV(o,new A.f1(this,r,c,a))},
bN(b9,c0,c1,c2,c3,c4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=this,b5=null,b6="soldierLimit",b7=t.e,b8=A.c([],b7)
for(s=b4.c.Q,r=s.gR(),q=J.A(r.a),r=new A.a0(q,r.b,r.$ti.h("a0<1>")),p=b4.x,o=c0.c;r.j();){n=q.gl()
m=n.a
l=p.i(0,m)
if(l==null)l=b5
else l=l.d.length!==0||l.a.cx!=null
if(l===!0&&m!==o)continue
k=b9.ab(n)
j=Math.max(0,b9.v(m).length-k)
n=b9.v(m)
m=A.h(n)
l=m.h("d<1>")
i=A.n(new A.d(n,m.h("e(1)").a(new A.eR(b4,b9,c1)),l),l.h("b.E"))
B.a.C(i,new A.eS(b4))
n=A.h(i)
m=new A.E(i,0,j,n.h("E<1>"))
m.a0(i,0,j,n.c)
B.a.F(b8,m)}if(!B.a.p(b8,c0))return b5
B.a.ar(b8,c0)
B.a.C(b8,new A.eT(b4))
r=b4.e
r===$&&A.O()
q=c1.f
h=r.aB(c0,q,s,c1)
if(!h.d)return b5
g=A.c([c0],b7)
b7=t.N
f=A.T([c0.a,h],b7,t.bJ)
e=h.b
for(o=b4.a,n=o.r,m=t.S,l=A.U(b8,0,A.X(n.fy*2,"count",m),t.r),d=l.$ti,l=new A.q(l,l.gk(0),d.h("q<l.E>")),c=n.ok,d=d.h("l.E"),b=c2+c3,a=e;l.j();){a0=l.d
if(a0==null)a0=d.a(a0)
if(g.length>=c2)break
a1=b4.f
a1===$&&A.O()
a1=A.j8(a0,c1,s,o,a1,0).a[2]
if(a1===0||a1>b)continue
a2=r.aB(a0,q,s,c1)
if(!a2.d)continue
a1=a2.b
a3=Math.min(e,a1)
a4=Math.max(a,a1)
if(a4-a3>c)continue
B.a.m(g,a0)
f.u(0,a0.a,a2)
a=a4
e=a3}if(g.length<c2)return b5
a5=A.c([],t.w)
a6=A.c([],t.m)
a7=A.a4(b7,b7)
b7=s.v(c1.a)
r=A.h(b7).h("L<1>")
a8=A.U(new A.L(b7,r),0,A.X(c1.gZ(),"count",m),r.h("l.E")).al(0)
for(b7=n.fx,o=o.b,r=c2===1,a9=b9,b0=0;b0<g.length;++b0){b1=g[b0]
q=b1.c
n=p.i(0,q)
if(n==null)n=b5
else n=n.d.length!==0||n.a.cx!=null
if(n===!0){n=s.G(q)
n.toString
n=!b4.bh(n,b1,a9)}else n=!1
if(n)return b5
n=f.i(0,b1.a)
n.toString
for(m=s.gR(),l=J.A(m.a),m=new A.a0(l,m.b,m.$ti.h("a0<1>")),b2=0;m.j();){d=l.gl()
b=d.a
a0=a9.v(b).length
d=Math.min(Math.max(0,a0-(b===q?1:0)),a9.ab(d))
a0=o.i(0,b6)
a0.toString
b2+=d*B.b.n(a0)}q=b4.r
q===$&&A.O()
m=r?"\u56f4\u7ed5\u4e3b\u653b\u76ee\u6807\u6295\u5165\u8db3\u591f\u6218\u529b\uff0c\u4fdd\u7559\u5176\u4ed6\u65b9\u5411\u5175\u529b":"\u96c6\u4e2d\u4f18\u52bf\u7f16\u961f\u8f6e\u653b\u540c\u4e00\u5ea7\u57ce\uff0c\u62b5\u8fbe\u95f4\u9694\u4e0d\u8d85\u8fc7"+B.b.n(c)+"\u79d2"
l=a9.f
d=o.i(0,b6)
d.toString
b3=q.bu(a9,b1,n,c4,Math.min(b2,Math.max(0,l-B.b.n(d))),c3+b0,m,"expedition",c1)
if(b3==null)return b5
a9=b3.a
q=b3.b
B.a.F(a5,q.b)
B.a.F(a6,q.d)
a7.F(0,q.c)
if(a5.length>b7){b4.d.e=!0
return b5}}b7=b4.r
b7===$&&A.O()
a7.F(0,b7.ak(a8,A.c([],t.Y)))
if(c4)b7="\u5148\u6d3e\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u5c06\u9886\u8fdb\u653b\u524d\u6392\uff0c\u6301\u7eed\u8f6e\u653b\u5e76\u8865\u5145\u6218\u635f"
else b7=r?"\u6267\u884c\u9759\u6001\u4f18\u52bf\u660e\u786e\u3001\u53ef\u4ee5\u4f9b\u517b\u7684\u6269\u5f20":"\u6574\u961f\u540e\u52e4\u51c6\u5907\u5b8c\u6210\uff0c\u6309\u771f\u5b9e\u6392\u961f\u89c4\u5219\u8f6e\u653b\uff1b\u4e0d\u9884\u6f14\u672a\u6765\u4f24\u4ea1"
return new A.cl(a9,new A.S(b7,a5,a7,a6,a9.aH().a,!1))},
d1(a,b,c){var s=this.c
return A.cT(a,b,s.Q,this.a,s.f,c)},
aS(a,b){return this.d1(a,b,null)}}
A.fg.prototype={
$1(a){return t._.a(a).ga3()},
$S:9}
A.fh.prototype={
$1(a){var s,r,q
t.J.a(a)
s=this.a.c.Q
r=s.a2(a.a)
q=!1
if(r!=null)if(r.b===s.a)if(!r.fr)if(r.f>0){s=r.as
s=!(s===B.f||s===B.d)&&r.fy===a.ax}else s=q
else s=q
else s=q
else s=q
return s},
$S:6}
A.fi.prototype={
$1(a){t._.a(a)
return a.d.length!==0||a.a.cx!=null},
$S:9}
A.fs.prototype={
$2(a,b){var s,r=t._
r.a(a)
r.a(b)
if(a.ga3()!==b.ga3())return a.ga3()?-1:1
s=B.b.t(a.gaa(),b.gaa())
return s!==0?s:B.b.t(b.w+b.a.z*4,a.w+a.a.z*4)},
$S:59}
A.ft.prototype={
$2(a,b){return A.i(a)+t.I.a(b).b.length},
$S:7}
A.fu.prototype={
$2(a,b){var s,r=t.dp
r.a(a)
r.a(b)
r=a.e
s=b.e
return r!==s?B.c.t(r,s):B.b.t(b.d,a.d)},
$S:67}
A.fv.prototype={
$1(a){t.r.a(a)
return a.b===this.a.c.Q.a&&!a.fr&&a.dy},
$S:0}
A.fw.prototype={
$1(a){t.r.a(a)
return this.a.c.x!==B.o},
$S:0}
A.fx.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.Q.a&&a.cy&&s.x!==B.o&&!a.fr&&!this.a.a.Q.p(0,a.a)},
$S:0}
A.fy.prototype={
$1(a){var s,r,q,p,o,n,m,l=this,k=null
t.q.a(a)
s=l.a
r=a.a
q=s.a.N(r)
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
s=m===!0?s.P(a):Math.max(s.P(a),a.at+o.a.r.cy)
if(q-p<s){s=n.i(0,r)
if(s==null)s=k
else s=s.d.length!==0||s.a.cx!=null
if(s===!0){s=n.i(0,r)
if(s==null)s=k
else{s=s.f
s=s==null?k:s.a}s=s===B.e}else s=!0}else s=!1
return s},
$S:1}
A.fz.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(a.f.E(s),b.f.E(s))},
$S:4}
A.fj.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b.c
r=!1
if(a.b===s.Q.a)if(a.cx){r=this.a
s=r.a.aG(a)&&!this.c&&s.x!==B.r&&!a.fr&&!r.a.y.p(0,a.a)}else s=r
else s=r
return s},
$S:0}
A.fk.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.am(b,s.G(b.c).d<q.ai(r)),A.am(a,s.G(a.c).d<q.ai(r)))},
$S:2}
A.fl.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.a
r=!1
if(a.b!==s.c.Q.a)if(this.b.aT(a)){q=s.r
q===$&&A.O()
if(q.ap(a)){r=this.d.i(0,a.a)
if(r==null)r=0
s=r<s.a.r.fy}else s=r}else s=r
else s=r
return s},
$S:1}
A.fm.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.b
if(a.a===r.gY())r=-1
else if(b.a===r.gY())r=1
else{r=this.a
s=this.c
s=B.b.t(r.aS(b,s),r.aS(a,s))
r=s}return r},
$S:4}
A.fn.prototype={
$2(a,b){return A.i(a)+t.I.a(b).b.length},
$S:7}
A.fo.prototype={
$1(a){return A.i(a)+this.a.a.b.d.length},
$S:20}
A.fp.prototype={
$0(){return this.a.a.b.d.length},
$S:11}
A.fq.prototype={
$2(a,b){return A.i(a)+t.I.a(b).b.length},
$S:7}
A.fr.prototype={
$2(a,b){return A.i(a)+t.I.a(b).b.length},
$S:7}
A.eY.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=!1
if(a.b===s.c.Q.a)if(a.cx){q=this.b
if(q.aG(a))if(!q.Q.p(0,a.a)){s=s.x.i(0,a.c)
if(s==null)s=null
else s=s.d.length!==0||s.a.cx!=null
s=s!==!0}else s=r
else s=r}else s=r
else s=r
return s},
$S:0}
A.eZ.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.f
return B.b.t(a.z.E(s),b.z.E(s))},
$S:2}
A.eM.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:5}
A.eU.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.eV.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.b
s=a.a===r
if(s!==(b.a===r))return s?-1:1
r=this.a
s=this.c
return B.b.t(r.aS(b,s),r.aS(a,s))},
$S:4}
A.eW.prototype={
$1(a){var s,r
t.J.a(a)
s=a.a
r=!1
if(s!==this.b.a)if(a.b==="expedition")if(a.d===this.c.a){s=this.a.c.Q.a2(s)
s=(s==null?null:s.fr)===!1}else s=r
else s=r
else s=r
return s},
$S:6}
A.eX.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:5}
A.eN.prototype={
$1(a){var s,r,q,p,o,n,m
t.r.a(a)
s=this.b
r=a.a
q=s.x.i(0,r)
p=this.a
o=!1
if(a.b===p.c.Q.a)if(a.cy)if(a.as===B.h)if(!a.p1)if(!a.fr)if(a.f>=a.r*0.65){n=a.gJ()
m=p.a.b.i(0,"soldierLimit")
m.toString
if(n===B.b.n(m))if(!s.Q.p(0,r)){s=q==null
if((s?null:q.b)==="staging"){s=s?null:q.d
r=this.c
if(s===r.a){s=p.r
s===$&&A.O()
r=s.ap(r)
s=r}else s=o}else s=o}else s=o
else s=o}else s=o
else s=o
else s=o
else s=o
else s=o
else s=o
return s},
$S:0}
A.eO.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(b.w*b.f/b.r,a.w*a.f/a.r)},
$S:2}
A.eP.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:5}
A.eQ.prototype={
$2(a,b){return A.u(a)+A.ap(b)},
$S:12}
A.f2.prototype={
$2(a,b){var s,r,q,p,o
A.i(a)
t.q.a(b)
s=this.b
r=b.a
q=s.v(r).length
p=this.c
o=p.as
s=Math.min(Math.max(0,q-((o===B.f||o===B.d)&&p.c===r?1:0)),s.ab(b))
q=this.a.a.b.i(0,"soldierLimit")
q.toString
return a+s*B.b.n(q)},
$S:8}
A.f3.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.f4.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(s.E(a.f),s.E(b.f))},
$S:4}
A.f5.prototype={
$2(a,b){var s=t.W
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(s.E(a),s.E(b))},
$S:34}
A.f6.prototype={
$1(a){var s,r
t.q.a(a)
s=a.r
r=this.a
if(s.p(0,r))s=a.a!==this.b.a||s.X(r).E(r)>1e-7
else s=!1
return s},
$S:1}
A.f7.prototype={
$1(a){var s,r=t.J.a(a).w,q=J.aG(r)
if(q.ga7(r)){s=this.a
r=Math.abs(q.gT(r).a-s.a)<15.9999999&&Math.abs(q.gT(r).b-s.b)<15.9999999}else r=!1
return r},
$S:6}
A.f8.prototype={
$1(a){var s=this.a.x.i(0,t.q.a(a).a)
if(s==null)s=null
else s=s.d.length!==0||s.a.cx!=null
return s!==!0},
$S:1}
A.f9.prototype={
$1(a){t.q.a(a)
return a.b!==this.a.c.Q.a&&this.b.aT(a)},
$S:1}
A.fa.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.f
return B.b.t(a.f.E(s),b.f.E(s))},
$S:4}
A.fb.prototype={
$2(a,b){var s,r
A.ap(a)
t.q.a(b)
s=this.a.e
s===$&&A.O()
r=this.b.f
return Math.min(a,s.am(r,b.r.X(r)))},
$S:35}
A.fc.prototype={
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
A.fd.prototype={
$1(a){t.r.a(a)
return a.cx&&a.e!==2&&!this.a.Q.p(0,a.a)},
$S:0}
A.fe.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.am(s.a(b),!0),A.am(a,!0))},
$S:2}
A.ff.prototype={
$1(a){return t.r.a(a).x>=this.a.x},
$S:0}
A.f0.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.f1.prototype={
$1(a){var s=this
return B.a.D(s.b,new A.f_(s.a,t.O.a(a),s.c,s.d))},
$S:10}
A.f_.prototype={
$1(a){var s,r,q,p,o,n=this,m="soldierLimit"
t.r.a(a)
s=n.a
r=s.f
r===$&&A.O()
q=n.c
p=q.P(n.d)
s=s.a.b
o=s.i(0,m)
o.toString
o=B.b.n(o)
q=q.e
s=s.i(0,m)
s.toString
return r.aI(a,n.b.a,p,Math.min(o,Math.max(0,q-B.b.n(s)))).a===B.e},
$S:0}
A.eR.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.cx){r=this.b
if(!r.Q.p(0,a.a))if(r.aG(a)){s=this.a.r
s===$&&A.O()
s=s.ap(this.c)}}return s},
$S:0}
A.eS.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.am(b,s.G(b.c).d<q.ai(r)),A.am(a,s.G(a.c).d<q.ai(r)))},
$S:2}
A.eT.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.am(b,s.G(b.c).d<q.ai(r)),A.am(a,s.G(a.c).d<q.ai(r)))},
$S:2}
A.af.prototype={}
A.fA.prototype={
c0(a,b){return new A.aA(this.d7(a,b),t.dT)},
d7(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e
return function $async$c0(c,d,a0){if(d===1){n.push(a0)
p=o}for(;;)switch(p){case 0:i=s.a1(r,q)
h=r.a
g=h.a
f=q.N(g)<=q.P(h)
e=!1
if(f)if(!r.ga3()){m=r.d
if(m.length!==0)if(B.a.aV(m,new A.h9(s,q))){e=q.x
e=!new A.Q(e,A.k(e).h("Q<2>")).D(0,new A.ha(r))}}p=e?3:4
break
case 3:p=5
return c.b=new A.af(q,A.c([],t.Z),s.ah(r,q),!1,"\u5df2\u6709\u622a\u51fb\u90e8\u961f\u80fd\u53ca\u65f6\u63a5\u654c\uff0c\u7b49\u5f85\u6267\u884c\u7ed3\u679c\uff0c\u4e0d\u91cd\u590d\u6d3e\u51fa\u7b2c\u4e8c\u652f\u90e8\u961f","hold"),1
case 5:p=1
break
case 4:e=!1
if(f)if(!r.ga3())e=(i==null?null:i.a)===B.e
p=e?6:7
break
case 6:p=8
return c.b=new A.af(q,A.c([],t.Z),s.ah(r,q),!1,"\u57ce\u9632\u4e0e\u73b0\u6709\u5b88\u5c06\u8db3\u4ee5\u5e94\u5bf9\u53ef\u89c1\u6765\u654c\uff0c\u7ef4\u6301\u8fdc\u5f81\uff0c\u4e0d\u53ec\u56de\u5c06\u9886","hold"),1
case 8:p=1
break
case 7:e=s.bA(r,q)
l=A.n(e,e.$ti.h("b.E"))
e=A.h(l)
m=e.h("e(1)")
e=e.h("d<1>")
k=A.n(new A.d(l,m.a(new A.hb(s,r,i,q)),e),e.h("b.E"))
p=k.length!==0?9:10
break
case 9:p=11
return c.bW(k)
case 11:p=1
break
case 10:p=f&&q.N(g)<q.P(h)?12:13
break
case 12:j=q.V()
p=j.ci(h,!0)&&j.d>=j.a5(!0).a?14:15
break
case 14:p=16
return c.b=s.aF(r,q,j,A.c([new A.F(B.B,null,g,null,0)],t.w),"\u672c\u5730\u4ecd\u6709\u8fce\u6218\u540d\u989d\uff0c\u5148\u62db\u52df\u8865\u5f3a\uff0c\u518d\u6309\u5b9e\u9645\u5230\u4efb\u5c5e\u6027\u590d\u6838\uff0c\u6682\u4e0d\u53ec\u56de\u8fdc\u5f81"),1
case 16:p=1
break
case 15:case 13:p=17
return c.bW(new A.d(l,m.a(new A.hc(B.a.D(l,new A.hd()))),e))
case 17:case 1:return 0
case 2:return c.c=n.at(-1),3}}}},
bA(a,b){return new A.aA(this.cD(a,b),t.dT)},
cD(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e,d,c,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1
return function $async$bA(g2,g3,g4){if(g3===1){n.push(g4)
p=o}for(;;)switch(p){case 0:f5=r.a
f6=f5.a
f7=q.N(f6)>q.P(f5)
f8=t.Z
f9=A.c([],f8)
g0=s.ah(r,q)
g1=!f7
if(g1){m=s.a1(r,q)
m=(m==null?null:m.a)!==B.e}else m=!0
p=3
return g2.b=new A.af(q,f9,g0,m,f7?"unsalvageableDefense\uff1a\u5f53\u524d\u5b89\u5168\u540d\u989d "+q.P(f5)+"\uff0c\u9a7b\u519b "+q.N(f6)+"\uff0c\u7b49\u5f85\u5408\u6cd5\u4fee\u590d":"\u4fdd\u6301\u53ef\u51fa\u573a\u5b88\u519b\uff0c\u7ee7\u7eed\u76d1\u63a7\u5168\u90e8\u6765\u654c","local"),1
case 3:f9=s.c
if(!f9.a4()){p=1
break}l=q.V()
k=l.aA(!0)
p=k>0?4:5
break
case 4:p=6
return g2.b=s.aF(r,q,l,A.c([new A.F(B.i,null,f6,null,k)],t.w),"\u4f18\u5148\u7528\u56fd\u5e93\u8865\u6ee1\u5168\u56fd\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u5224\u65ad\u662f\u5426\u9700\u8981\u5916\u63f4"),1
case 6:case 5:g0=f5.cx
m=g0==null
p=m?7:8
break
case 7:j=q.V()
i=A.c([],t.w)
h=j.v(f6)
g=A.h(h)
f=g.h("d<1>")
e=A.n(new A.d(h,g.h("e(1)").a(new A.fB()),f),f.h("b.E"))
B.a.C(e,new A.fC())
p=e.length!==0?9:10
break
case 9:d=B.a.gI(e)
h=d.a
g=j.w
f=s.b.b
c=f5.d
a0=0
case 11:if(a0<4){a1=g.i(0,f6)
a1.toString
a2=f.i(0,"maxLevel")
a2.toString
a2=a1<B.b.n(a2)
a1=a2}else a1=!1
if(!a1){p=12
break}if(!j.b_(f5,d)||j.d<j.a5(!0).a){p=12
break}B.a.m(i,new A.F(B.l,h,f6,null,0))
a1=j.N(f6)
a2=g.i(0,f6)
if(a2==null)a2=c
p=a1<=a2?13:14
break
case 13:p=15
return g2.b=s.aF(r,q,j,i,"\u4f18\u5148\u7531\u9ad8\u5185\u653f\u5c06\u9886\u5347\u7ea7\uff0c\u4fdd\u62a4\u771f\u5b9e\u8fce\u6218\u540d\u989d"),1
case 15:a1=s.a1(r,j)
if((a1==null?null:a1.a)===B.e||f7){p=12
break}case 14:++a0
p=11
break
case 12:case 10:case 8:p=f7?16:17
break
case 16:h=q.v(f6)
g=A.h(h)
f=g.h("d<1>")
a3=A.n(new A.d(h,g.h("e(1)").a(new A.fD()),f),f.h("b.E"))
B.a.C(a3,new A.fM())
h=A.h(a3),g=A.U(a3,0,A.X(3,"count",t.S),h.c),f=g.$ti,g=new A.q(g,g.gk(0),f.h("q<l.E>")),c=f5.fx,a1=f5.cy,a2=f5.d,a4=t.T,a5=t.w,a6=t.e,a7=h.h("e(1)"),h=h.h("d<1>"),f=f.h("l.E")
case 18:if(!g.j()){p=19
break}a8=g.d
if(a8==null)a8=f.a(a8)
if(!f9.a4()){p=19
break}a9=q.V()
i=A.c([],a5)
b0=A.c([a8],a6)
B.a.F(b0,new A.d(a3,a7.a(new A.fN(a8)),h))
a8=b0.length,b1=a9.w,b2=0
case 20:if(!(b2<b0.length)){p=22
break}b3=b0[b2]
b4=a9.N(f6)
if(m){b5=b1.i(0,f6)
if(b5==null)b5=a2}else{b5=c?1:0
b5=B.c.A(g0-a1-b5,0,5)}if(b4<=b5){p=22
break}if(!a9.dh(b3)){p=21
break}B.a.m(i,new A.F(B.A,b3.a,null,null,0))
p=m?23:24
break
case 23:b6=a9.V()
b7=A.n(i,a4)
b4=b6.v(f6)
b5=A.h(b4)
b8=b5.h("d<1>")
e=A.n(new A.d(b4,b5.h("e(1)").a(new A.fO()),b8),b8.h("b.E"))
B.a.C(e,new A.fP())
p=e.length!==0?25:26
break
case 25:b4=b6.w
b9=0
for(;;){if(b9<3){b5=b6.N(f6)
b8=b4.i(0,f6)
if(b8==null)b8=a2
b8=b5>b8
b5=b8}else b5=!1
if(!b5)break
if(!b6.b_(f5,B.a.gI(e)))break
B.a.m(b7,new A.F(B.l,B.a.gI(e).a,f6,null,0));++b9}b5=b6.N(f6)
b4=b4.i(0,f6)
if(b4==null)b4=a2
p=b5<=b4&&b6.d>=b6.a5(!0).a?27:28
break
case 27:p=29
return g2.b=s.aF(r,q,b6,b7,"\u5148\u89e3\u96c7\u4f4e\u4ea4\u6362\u4ef7\u503c\u6321\u4f4d\u8005\u7b79\u8d44\uff0c\u4fdd\u7559\u4e3b\u6301\u8005\u5b8c\u6210\u6551\u57ce\u5347\u7ea7"),1
case 29:case 28:case 26:case 24:case 21:b0.length===a8||(0,A.x)(b0),++b2
p=20
break
case 22:a8=a9.N(f6)
if(m){b0=b1.i(0,f6)
if(b0==null)b0=a2}else{b0=c?1:0
b0=B.c.A(g0-a1-b0,0,5)}p=a8<=b0?30:31
break
case 30:p=32
return g2.b=s.aF(r,q,a9,i,"\u6ca1\u6709\u53ef\u652f\u4ed8\u4e14\u53ca\u65f6\u7684\u5347\u7ea7\u65b9\u6848\uff0c\u6e05\u51fa\u6321\u4f4d\u5b88\u5c06\u5e76\u4fdd\u7559\u6838\u5fc3\u51fa\u573a"),1
case 32:case 31:p=18
break
case 19:case 17:c0=s.cY(r,q)
h=q.v(f6)
g=A.h(h)
f=g.h("d<1>")
c1=A.n(new A.d(h,g.h("e(1)").a(new A.fQ(q)),f),f.h("b.E"))
B.a.C(c1,new A.fR(s,c0,q,f5))
p=(!g1||c0)&&s.a.Q.gR().gk(0)>1?33:34
break
case 33:c2=q.V()
if(c0)c2.at.m(0,f6)
c3=A.c([],f8)
g1=s.a.Q
h=g1.gR()
g=h.$ti
f=g.h("d<b.E>")
c4=A.n(new A.d(h,g.h("e(b.E)").a(new A.fS(f5)),f),f.h("b.E"))
B.a.C(c4,new A.fT(f5))
h=A.U(c1,0,A.X(s.b.r.fy,"count",t.S),A.h(c1).c),g=h.$ti,h=new A.q(h,h.gk(0),g.h("q<l.E>")),f=f5.fx,c=f5.cy,a1=A.h(c4),a2=a1.c,a1=a1.h("E<1>"),a4=a1.h("q<l.E>"),a5=s.e,a6=a5.c,a7=s.f,a8=a1.h("l.E"),g=g.h("l.E"),b0=f5.d,b1=t.er,b4=t.bo,b5=t.i,b8=t.I
case 35:if(!h.j()){p=36
break}c5=h.d
if(c5==null)c5=g.a(c5)
if(!f9.a4()){p=36
break}c6=new A.E(c4,0,4,a1)
c6.a0(c4,0,4,a2)
c6=new A.q(c6,c6.gk(0),a4)
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
d2=d2==null?null:d2.a}d2=d2!==B.e}else d2=!1
if(d2)continue
d2=c2.N(d0)
d3=c9.cx
if(d3==null){d0=c7.i(0,d0)
if(d0==null)d0=c9.d}else{d0=c9.cy
d4=c9.fx?1:0
d4=B.c.A(d3-d0-d4,0,5)
d0=d4}if(d2>=d0)continue
d5=a6.aC(c5,c9.f,g1,!0,c9)
d0=c0?"evacuate":"transfer"
d2=c0?"\u73b0\u6709\u6838\u5fc3\u4e5f\u660e\u786e\u5904\u4e8e\u52a3\u52bf\uff0c\u5728\u5371\u9669\u7a97\u53e3\u524d\u8f6c\u79fb\u4fdd\u5168\u5c06\u9886\uff0c\u539f\u57ce\u98ce\u9669\u4ecd\u672a\u89e3\u51b3":"\u8f6c\u79fb\u591a\u4f59\u7684\u5f31\u5c06\uff0c\u4e3a\u5f3a\u5c06\u4fdd\u7559\u672c\u57ce\u8fce\u6218\u540d\u989d"
d6=a5.b1(c2,c5,d5,!0,r.gaa(),!0,d2,d0,c9)
if(d6!=null)c9=c8==null||d6.a.d>c8.a.d
else c9=!1
if(c9)c8=d6}if(c8==null){p=35
break}c2=c8.a
B.a.m(c3,c8.b)
c5=c2.N(f6)
if(m){c6=c2.w.i(0,f6)
if(c6==null)c6=b0}else{c6=f?1:0
c6=B.c.A(g0-c-c6,0,5)}p=c5<=c6?37:38
break
case 37:d7=new A.c3(c3,b1.a(new A.fE()),b4).L(0,0,new A.fF(s),b5)
c5=c2.V()
c6=A.n(c3,b8)
c7=s.ah(r,c2)
c9=isFinite(r.gaa())?"\u5b89\u5168\u5224\u65ad\u4ee5\u5b9e\u9645\u8fdb\u9a7b\u53cb\u57ce\u4e3a\u51c6\uff0c\u9014\u4e2d\u539f\u57ce\u5931\u5b88\u4ecd\u4f1a\u6e05\u9664\u90e8\u961f":"\u8f6c\u79fb\u5230\u5b89\u5168\u540e\u65b9\u6574\u5907"
d0=s.a1(r,c2)
d0=d0==null?null:d0.a
d2=c0?"relocation":"local"
p=39
return g2.b=new A.af(c5,c6,c7+d7*0.65,d0!==B.e,c9,d2),1
case 39:if(f7){p=36
break}case 38:p=35
break
case 36:case 34:d8=s.bI(r,q)
d9=new A.fU(s,q)
g1=s.a.Q
h=g1.r
g=A.h(h)
f=g.h("d<1>")
e0=A.n(new A.d(h,g.h("e(1)").a(new A.fG(s,q,d9,d8)),f),f.h("b.E"))
B.a.C(e0,new A.fH(d9,f5))
h=r.d
g=h.length===0?0:s.b.r.fy
g=A.U(e0,0,A.X(g,"count",t.S),A.h(e0).c)
f=g.$ti
g=new A.q(g,g.gk(0),f.h("q<l.E>"))
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
c5=A.h(h)
c6=c5.h("o(1)")
c7=c5.h("I<1,o>")
c9=f5.f
d0=c5.c
c5=c5.h("E<1>")
d2=c5.h("q<l.E>")
d3=c5.h("l.E")
d4=b5==null
case 40:if(!g.j()){p=41
break}e1=g.d
if(e1==null)e1=f.a(e1)
if(!f9.a4()){p=41
break}e2=e1.c
e3=a7.i(0,e2)
e4=r.gaa()
e5=e3==null
if(e5)e6=null
else e6=e3.d.length!==0||e3.a.cx!=null
e6=e6===!0?e3.gaa():1/0
e7=Math.min(e4,e6)
e4=!1
if(!d9.$1(e1)||d8){e6=s.a1(r,q)
if((e6==null?null:e6.a)!==B.e){e4=q.N(f6)
if(m){e6=b4.i(0,f6)
if(e6==null)e6=b1}else{e6=a8?1:0
e6=B.c.A(g0-b0-e6,0,5)}e6=e4<e6
e4=e6}}p=e4?42:43
break
case 42:e8=new A.I(h,c6.a(new A.fI()),c7).af(0,new A.fJ(s))
if(m){e4=b4.i(0,f6)
if(e4==null)e4=b1}else{e4=a8?1:0
e4=B.c.A(g0-b0-e4,0,5)}e6=b8.i(0,"soldierLimit")
e6.toString
e9=a1.aI(e1,e8,e4,Math.min(B.b.n(e6),q.e+e1.gJ()))
e4=d4?null:b5.b
if(e4==null)e4=-1
p=e9.b>e4+0.05?44:45
break
case 44:d5=a2.aC(e1,c9,g1,!0,f5)
if(m){e4=b4.i(0,f6)
if(e4==null)e4=b1}else{e4=a8?1:0
e4=B.c.A(g0-b0-e4,0,5)}e6=s.a1(r,q)
e6=e6==null?null:e6.b
d6=c.b1(q,e1,d5,!0,e7,!0,"\u672c\u5730\u62b5\u6297\u4ecd\u6709\u7f3a\u53e3\uff08\u57ce\u9632"+e4+"\u7ea7\uff0c\u9632\u5b88\u4f59\u91cf"+B.b.aL((e6==null?-1:e6)*100)+"\u70b9\uff09\uff0c\u63f4\u519b\u7ea6"+B.b.aZ(d5.b,1)+"\u79d2\u5230\u8fbe\uff0c\u5371\u9669\u7a97\u53e3"+B.b.aZ(e7,1)+"\u79d2\uff0c\u9884\u7559\u5165\u57ce\u540d\u989d","rescue",f5)
if(d6!=null){e4=s.a1(r,d6.a)
e4=(e4==null?null:e4.a)===B.e}else e4=!1
p=e4?46:47
break
case 46:e4=d6.a
p=48
return g2.b=new A.af(e4,A.c([d6.b],f8),s.ah(r,e4)-A.ae(e1)*0.08,!1,"","recall"),1
case 48:case 47:case 45:case 43:e4=new A.E(h,0,2,c5)
e4.a0(h,0,2,d0)
e4=new A.q(e4,e4.gk(0),d2)
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
f2=f2==null?null:f2.a}f2=f2!==B.e}}if(f2){p=49
break}f2=f1.a
d5=c.c7(e1,f2,q)
if(a1.d9(e1,f2,a4.bY(f2.z)).a!==B.e){p=49
break}f4=d9.$1(e1)?"\u672c\u5730\u624b\u6bb5\u65e0\u6cd5\u62b5\u6321\u660e\u786e\u6765\u88ad\uff0c\u7d27\u6025\u622a\u51fb\u9884\u8ba1"+B.b.aZ(d5.b,1)+"\u79d2\uff0c\u65e9\u4e8e\u654c\u519b"+B.b.aZ(f1.b,1)+"\u79d2\u62b5\u57ce\uff1b\u6700\u540e\u624d\u6539\u6d3e\u8fdc\u5f81":"\u52a8\u7528\u9644\u8fd1\u95f2\u7f6e\u90e8\u961f\u622a\u51fb\u6765\u654c\uff0c\u4e0d\u6253\u65ad\u4e3b\u653b\u4efb\u52a1"
d6=c.cs(q,e1,d5,f1.b,!0,f2,f4,"intercept",f5)
p=d6!=null?51:52
break
case 51:f1=d6.a
p=53
return g2.b=new A.af(f1,A.c([d6.b],f8),s.ah(r,f1)+80-A.ae(e1)*0.08,f7,"","recall"),1
case 53:case 52:p=49
break
case 50:p=40
break
case 41:if(g1.gR().gk(0)===1)h=(d4?null:b5.a)===B.v&&c1.length>1
else h=!1
p=h?54:55
break
case 54:h=g1.f,g=A.h(h),f=g.h("d<1>"),f=A.lU(new A.d(h,g.h("e(1)").a(new A.fK(s)),f),3,f.h("b.E")),g=f.a,f=new A.bo(g.gB(g),f.b,A.k(f).h("bo<1>"))
case 56:if(!f.j()){p=57
break}h=f.gl()
if(!f9.a4()){p=57
break}b3=B.a.af(c1,new A.fL())
d6=c.cq(q,b3,a2.aC(b3,h.f,g1,!0,h),r.gaa(),!0,"\u4fdd\u7559\u539f\u57ce\u5b88\u519b\u62d6\u5ef6\uff0c\u6838\u5fc3\u5728\u5371\u9669\u7a97\u53e3\u524d\u593a\u53d6\u7a7a\u57ce\u5efa\u7acb\u65b0\u636e\u70b9","newBase",h)
p=d6!=null?58:59
break
case 58:h=d6.a
g=A.c([d6.b],f8)
a1=s.ah(r,h)
a4=A.ae(b3)
a5=h.N(f6)
if(m){a6=h.w.i(0,f6)
if(a6==null)a6=b1}else{a6=a8?1:0
a6=B.c.A(g0-b0-a6,0,5)}p=60
return g2.b=new A.af(h,g,a1+a4*1.2,a5>a6,"","relocation"),1
case 60:case 59:p=56
break
case 57:case 55:case 1:return 0
case 2:return g2.c=n.at(-1),3}}}},
aF(a,b,c,d,e){var s,r,q,p,o,n,m,l,k=this
t.f3.a(d)
s=c.V()
r=B.a.D(d,new A.h0())?s.aA(!0):0
q=A.h(d)
p=q.h("o?(1)").a(new A.h1(k))
o=c.y.dg(b.y).L(0,0,new A.h2(k),t.i)
n=A.n(d,t.T)
m=k.e
q=A.n(new A.cu(new A.I(d,p,q.h("I<1,o?>")),t.gn),t.r)
p=a.d
l=A.h(p)
B.a.F(q,new A.I(p,l.h("o(1)").a(new A.h3()),l.h("I<1,o>")))
l=a.a
p=t.Y
q=A.c([new A.S(e,n,m.ak(q,A.c([l],p)),B.p,c.a5(!0).a,!0)],t.Z)
if(r>0)q.push(new A.S("\u57ce\u9632\u5347\u7ea7\u540e\u5728\u540c\u4e00\u6b21\u8865\u5175\u7a97\u53e3\u5185\u5c3d\u91cf\u8865\u6ee1\u5168\u56fd\u5175\u5458\u5bb9\u91cf",A.c([new A.F(B.i,null,l.a,null,r)],t.w),m.ak(A.c([],t.e),A.c([l],p)),B.p,0,!0))
p=k.ah(a,s)
n=Math.max(0,b.d-s.d)
if(s.N(l.a)<=s.P(l)){m=k.a1(a,s)
m=(m==null?null:m.a)!==B.e}else m=!0
return new A.af(s,q,p-o*0.65-n*0.2,m,"","local")},
cM(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=b.x,s=new A.ak(s,s.r,s.e,A.k(s).h("ak<2>")),r=this.e,q=a.a,p=q.a,o=this.a.Q,n=o.b,m=b.y,l=this.b.r.d,k=a.b;s.j();){j=s.d
if(j.b!=="intercept"||j.r!==p||j.y<=n)continue
i=o.a2(j.a)
if(i==null||i.f<=0||i.fr||m.p(0,i.a))continue
if(i.go===p)return!0
if(!i.cy||j.z<=n)continue
h=r.c7(i,q,b)
if(h.d&&h.b+l<k)return!0}return!1},
bI(a,b){var s,r
if(this.c.e)return!1
s=a.a
if(!(s.cx!=null||B.a.D(a.d,new A.fV())))return!1
if(a.ga3())return!0
if(b.v(s.a).length===0)return!0
r=this.a1(a,b)
return r!=null&&r.c<-this.b.r.p3},
cY(a8,a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7=this
if(!a7.bI(a8,a9))return!1
s=a8.a
r=s.a
q=a9.v(r)
p=q.length
if(p===0)return!1
for(o=a8.d,n=a7.b,m=n.b,l=a7.d,k=s.d,j=a9.w,i=a7.c,n=-n.r.p3,h=s.fx,g=s.cy,s=s.cx,f=s==null,e=0;e<q.length;q.length===p||(0,A.x)(q),++e){d=q[e]
for(c=o.length,b=d.as===B.d,a=null,a0=0;a0<o.length;o.length===c||(0,A.x)(o),++a0){a1=o[a0]
if(f){a2=j.i(0,r)
if(a2==null)a2=k}else{a2=h?1:0
a2=B.c.A(s-g-a2,0,5)}a2=Math.max(1,a2)
a3=d.gJ()
if(b)a4=0
else{a4=a9.e
a5=m.i(0,"soldierLimit")
a5.toString
a5=Math.min(a4,B.b.n(a5)-d.gJ())
a4=a5}a6=l.aI(d,a1.a,a2,a3+a4)
if(a6.a===B.y||i.e)return!1
if(a==null||a6.b<a.b)a=a6}if(a==null||a.c>=n)return!1}return!0},
a1(b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this,b2=null,b3=b4.d
if(b3.length===0)return b2
s=b4.a
r=s.a
q=b5.v(r)
p=b5.e
for(o=b5.x,o=new A.ak(o,o.r,o.e,A.k(o).h("ak<2>")),n=t.N,m=t.z,l=t.n,k=b1.e.c,j=b1.a.Q,i=j.b,h=b5.y,g=b1.b,f=g.r.d;o.j();){e=o.d
if(!e.as||e.d!==r||e.y<i)continue
d=j.a2(e.a)
if(d==null||d.fr||d.go!=null||d.f<=0||h.p(0,d.a)||B.a.D(q,new A.fY(d)))continue
c=d.z
for(e=J.dP(e.w,e.x),b=e.$ti,e=new A.q(e,e.gk(0),b.h("q<l.E>")),b=b.h("l.E"),a=0;e.j();c=a1){a0=e.d
a1=a0==null?b.a(a0):a0
a+=k.am(c,a1)}if(!isFinite(a)||a+f>=b4.gaa())continue
p=Math.min(b5.f,p+d.gJ())
e=A.ah(d.K(),n,m)
e.u(0,"hp",d.r)
e.u(0,"troops",A.c([],l))
e.u(0,"s",0)
B.a.m(q,A.k_(e))}B.a.C(q,A.kV())
o=A.h(q)
n=t.r
a2=A.b1(new A.d(q,o.h("e(1)").a(new A.fZ(b4)),o.h("d<1>")),n)
m=A.c([],t.e)
if(a2!=null)m.push(a2)
o=o.h("L<1>")
B.a.F(m,new A.L(q,o).by(0,o.h("e(l.E)").a(new A.h_(a2))))
a3=A.U(m,0,A.X(b5.P(s),"count",t.S),n).al(0)
if(a3.length===0)return b2
for(o=b1.d,n=s.d,m=b5.w,g=g.b,l=s.dx,k=s.fx,j=s.cy,s=s.cx,i=s==null,a4=b2,a5=0;a5<a3.length;++a5){d=a3[a5]
if(d.as===B.d)a6=0
else{h=g.i(0,"soldierLimit")
h.toString
a6=Math.min(p,B.b.n(h)-d.gJ())}p-=a6
for(h=b3.length,a7=b2,a8=0;a8<b3.length;b3.length===h||(0,A.x)(b3),++a8){a9=b3[a8]
if(i){f=m.i(0,r)
if(f==null)f=n}else{f=k?1:0
f=B.c.A(s-j-f,0,5)}b0=o.aI(d,a9.a,Math.max(1,f-a5),d.gJ()+a6)
if(a7==null||b0.b<a7.b)a7=b0}if(d.e===2&&d.a===l)return a7
if(a4==null||a7.b>a4.b)a4=a7}return a4},
ah(a,b){var s,r,q,p=a.a,o=p.a,n=b.N(o),m=Math.max(0,n-b.P(p))
o=b.v(o)
s=A.h(o)
s=new A.d(o,s.h("e(1)").a(new A.fW()),s.h("d<1>")).L(0,0,new A.fX(),t.H)
o=this.a.Q.gR().gk(0)===1?400:0
r=150+p.z*4+a.w*0.5+s+o
q=this.a1(a,b)
p=n===0?r*2:0
o=q==null?null:q.b
if(o==null)o=-0.8
return-m*5000-p+o*r}}
A.h9.prototype={
$1(a){return this.a.cM(t.O.a(a),this.b)},
$S:10}
A.ha.prototype={
$1(a){t.J.a(a)
return a.f&&B.a.D(this.a.d,new A.h8(a))},
$S:6}
A.h8.prototype={
$1(a){return t.O.a(a).a.a===this.a.r},
$S:10}
A.hb.prototype={
$1(a){var s,r,q,p,o,n,m=this
t.x.a(a)
s=!1
if(a.f==="local"){r=a.b
if(r.length!==0)if(B.a.D(r,new A.h6())){q=a.a
p=m.b
o=p.a
if(q.N(o.a)<=q.P(o)){o=m.a
n=o.a1(p,q)
n=n==null?null:n.c
if(n==null)n=-1
if(n>=-o.b.r.p3){s=o.a1(p,q)
s=s==null?null:s.b
if(s==null)s=-1
q=m.c
q=q==null?null:q.b
s=(s>(q==null?-1:q)+0.04||B.a.D(r,new A.h7()))&&a.c>o.ah(p,m.d)}}}}return s},
$S:15}
A.h6.prototype={
$1(a){return B.a.D(t.I.a(a).b,new A.h5())},
$S:23}
A.h5.prototype={
$1(a){var s=t.T.a(a).a
return s===B.l||s===B.A||s===B.i||s===B.C},
$S:13}
A.h7.prototype={
$1(a){return B.a.D(t.I.a(a).d,new A.h4())},
$S:23}
A.h4.prototype={
$1(a){return t.J.a(a).b==="intercept"},
$S:6}
A.hd.prototype={
$1(a){t.x.a(a)
return a.f!=="relocation"&&!a.d},
$S:15}
A.hc.prototype={
$1(a){t.x.a(a)
return!this.a||a.f!=="relocation"},
$S:15}
A.fB.prototype={
$1(a){return t.r.a(a).dx},
$S:0}
A.fC.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fD.prototype={
$1(a){t.r.a(a)
return a.db&&a.e!==2},
$S:0}
A.fM.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.ae(a),A.ae(b))},
$S:2}
A.fN.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fO.prototype={
$1(a){return t.r.a(a).dx},
$S:0}
A.fP.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fQ.prototype={
$1(a){t.r.a(a)
return a.cx&&!this.a.Q.p(0,a.a)},
$S:0}
A.fR.prototype={
$2(a,b){var s,r,q,p,o,n,m=this,l="soldierLimit",k=t.r
k.a(a)
k.a(b)
if(m.b)return B.b.t(A.ae(b),A.ae(a))
k=m.a.b
s=m.c
r=m.d
q=s.P(r)
p=k.b
o=p.i(0,l)
o.toString
o=A.bR(a,k,q,B.b.n(o))
r=s.P(r)
p=p.i(0,l)
p.toString
n=B.b.t(o,A.bR(b,k,r,B.b.n(p)))
return n!==0?n:B.b.t(A.ae(a),A.ae(b))},
$S:2}
A.fS.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:1}
A.fT.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.f
return B.b.t(a.f.E(s),b.f.E(s))},
$S:4}
A.fE.prototype={
$1(a){return t.I.a(a).d},
$S:40}
A.fF.prototype={
$2(a,b){var s
A.ap(a)
s=this.a.a.Q.a2(t.J.a(b).a)
s.toString
return a+A.ae(s)},
$S:41}
A.fU.prototype={
$1(a){var s,r,q=this.a.a.Q,p=this.b
if(A.jM(a,q,p)==null){p=p.x
s=a.a
r=p.i(0,s)
if((r==null?null:r.b)==="intercept"){p=p.i(0,s)
q=q.a2(p==null?null:p.r)
q=q==null?null:q.f
q=(q==null?0:q)>0}else q=!1}else q=!0
return q},
$S:0}
A.fG.prototype={
$1(a){var s,r,q,p,o=this
t.r.a(a)
s=o.a.a.Q
r=!1
if(a.b===s.a){if(!a.cy)if(a.cx){s=s.G(a.c)
s.toString
s=o.b.a8(s)}else s=!1
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
A.fH.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a
if(!J.aD(s.$1(a),s.$1(b)))return s.$1(a)?1:-1
s=this.b.f
return B.b.t(a.z.E(s),b.z.E(s))},
$S:2}
A.fI.prototype={
$1(a){return t.O.a(a).a},
$S:24}
A.fJ.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.kP(a,s)>A.kP(b,s)?a:b},
$S:25}
A.fK.prototype={
$1(a){var s
t.q.a(a)
s=this.a.a.Q
return a.b!==s.a&&s.v(a.a).length===0},
$S:1}
A.fL.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return A.ae(a)>=A.ae(b)?a:b},
$S:25}
A.h0.prototype={
$1(a){return t.T.a(a).a===B.l},
$S:13}
A.h1.prototype={
$1(a){return this.a.a.Q.a2(t.T.a(a).b)},
$S:44}
A.h2.prototype={
$2(a,b){var s
A.ap(a)
s=this.a.a.Q.a2(A.M(b))
s.toString
return a+A.ae(s)},
$S:68}
A.h3.prototype={
$1(a){return t.O.a(a).a},
$S:24}
A.fV.prototype={
$1(a){var s,r,q
t.O.a(a)
s=a.a
r=s.as
if(r!==B.w){q=!1
if(a.c>=0.9)if(r!==B.h){s=s.Q
s=Math.abs(s.a)+Math.abs(s.b)>0.01}else s=q
else s=q}else s=!0
return s},
$S:10}
A.fY.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fZ.prototype={
$1(a){return t.r.a(a).a===this.a.a.dx},
$S:0}
A.h_.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fW.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.fX.prototype={
$2(a,b){return A.u(a)+A.ae(t.r.a(b))},
$S:46}
A.B.prototype={
K(){return A.c([this.a,this.b],t.n)},
E(a){var s=this.a-a.a,r=this.b-a.b
return Math.sqrt(s*s+r*r)},
aK(a,b){var s=this.a,r=this.b
return new A.B(s+(a.a-s)*b,r+(a.b-r)*b)}}
A.en.prototype={
X(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this.a,f=B.a.gI(g)
for(s=a.a,r=a.b,q=1/0,p=0;o=g.length,p<o;){n=g[p];++p
m=g[p%o]
o=n.a
l=m.a-o
k=n.b
j=m.b-k
i=n.aK(m,B.b.A(((s-o)*l+(r-k)*j)/(l*l+j*j),0,1))
h=i.E(a)
if(h<q){q=h
f=i}}return f},
p(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(this.X(b).E(b)<1e-7)return!0
for(s=this.a,r=s.length,q=b.b,p=b.a,o=!1,n=0;n<r;){m=s[n];++n
l=s[n%r]
k=m.b
j=l.b
if(k>q!==j>q){i=m.a
i=p<(l.a-i)*(q-k)/(j-k)+i
k=i}else k=!1
if(k)o=!o}return o},
c5(a,b){var s
if(this.p(0,a))return null
s=this.c2(a,b)
return s.length===0?null:B.a.af(s,B.u)},
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
bX(a,b){var s,r=this
if(r.p(0,a))return r.X(a)
s=r.c5(a,b)
return s==null?r.X(a):a.aK(b,s)},
c3(a,b){var s=a.E(b),r=s<1e-7?new A.B(a.a+4096,a.b+0):a.aK(b,4096/s),q=this.c2(a,r)
return q.length===0?this.X(b):a.aK(r,B.a.af(q,B.F))}}
A.an.prototype={
aP(){return"AiArmyState."+this.b}}
A.o.prototype={
gJ(){var s=this.at,r=A.h(s)
return new A.d(s,r.h("e(1)").a(new A.dT()),r.h("d<1>")).gk(0)},
gbm(){return this.f+B.a.L(this.at,0,new A.dS(),t.H)},
K(){var s,r,q,p,o,n,m,l=this,k=l.z,j=t.n
k=A.c([k.a,k.b],j)
s=l.Q
s=A.c([s.a,s.b],j)
r=l.ay
r=r==null?null:A.c([r.a,r.b],j)
q=A.c([],t.b)
for(p=l.k3,o=p.length,n=0;n<p.length;p.length===o||(0,A.x)(p),++n){m=p[n]
q.push(A.c([m.a,m.b],j))}return A.T(["id",l.a,"c",l.b,"home",l.c,"o",l.d,"t",l.e,"hp",l.f,"max",l.r,"a",l.w,"p",l.x,"pay",l.y,"xy",k,"v",s,"s",l.as.a,"troops",l.at,"m",l.ax,"to",r,"target",l.ch,"return",l.CW,"dispatch",l.cx,"move",l.cy,"dismiss",l.db,"upgrade",l.dx,"retreat",l.dy,"marked",l.fr,"rev",l.fx,"orderRev",l.fy,"opponent",l.go,"clashes",l.id,"received",l.k1,"dealt",l.k2,"returnPath",q,"regionCity",l.k4,"salaryPaidMonth",l.ok,"movementPending",l.p1],t.N,t.X)}}
A.dT.prototype={
$1(a){return A.ap(a)>0},
$S:27}
A.dS.prototype={
$2(a,b){return A.u(a)+A.ap(b)},
$S:12}
A.J.prototype={
gct(){var s,r,q,p,o,n=this,m=n.w
if(m>0&&n.x>0){s=n.x
r=n.y
return A.ki(m,s,J.N(r)===m*s?r:null)}m=n.r.a
s=A.h(m)
r=s.h("j(1)")
s=s.h("I<1,j>")
q=s.h("l.E")
p=A.n(new A.I(m,r.a(new A.dQ()),s),q)
B.a.bv(p)
o=A.n(new A.I(m,r.a(new A.dR()),s),q)
B.a.bv(o)
return A.ki(B.c.A(B.b.au((B.a.gT(p)-B.a.gI(p)-16)/16),1,256),B.c.A(B.b.au((B.a.gT(o)-B.a.gI(o)-16)/16),1,256),null)},
gZ(){var s,r=this,q=r.cx
if(q==null)q=r.d
else{s=r.fx?1:0
s=B.c.A(q-r.cy-s,0,5)
q=s}return q},
K(){var s,r,q,p,o,n=this,m=n.f,l=t.n
m=A.c([m.a,m.b],l)
s=A.c([],t.b)
for(r=n.r.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.x)(r),++p){o=r[p]
s.push(A.c([o.a,o.b],l))}return A.T(["id",n.a,"c",n.b,"native",n.c,"level",n.d,"xy",m,"outline",s,"gridWidth",n.w,"gridHeight",n.x,"gridTiles",n.y,"income",n.z,"baseIncome",n.ax,"poor",n.Q,"cap",n.as,"recruitCap",n.at,"neighbors",n.e,"recruit",n.ay,"upgrade",n.ch,"rev",n.CW,"initial",n.cx,"wins",n.cy,"attacker",n.db,"defender",n.dx,"stage",n.dy,"next",n.fr,"fallen",n.fx,"danger",n.fy],t.N,t.X)}}
A.dQ.prototype={
$1(a){return t.W.a(a).a},
$S:28}
A.dR.prototype={
$1(a){return t.W.a(a).b},
$S:28}
A.bc.prototype={
K(){var s,r,q=this,p=t.N,o=A.a4(p,t.S)
for(s=q.y.gaw(),s=s.gB(s);s.j();){r=s.gl()
o.u(0,""+r.a,r.b)}return A.T(["id",q.a,"gold",q.b,"reserves",q.c,"capacity",q.d,"salary",q.e,"poor",q.f,"baseIncome",q.r,"garrisonAccrued",q.w,"soldierRecruitmentAllowed",q.x,"hate",o],p,t.X)}}
A.eg.prototype={
gaq(){return B.a.ao(this.w,new A.el(this))},
gR(){var s=this.f,r=A.h(s)
return new A.d(s,r.h("e(1)").a(new A.em(this)),r.h("d<1>"))},
v(a){var s=this.r,r=A.h(s),q=r.h("d<1>")
s=A.n(new A.d(s,r.h("e(1)").a(new A.ej(this,a)),q),q.h("b.E"))
B.a.C(s,A.kV())
return s},
a2(a){var s=this.r,r=A.h(s)
return A.b1(new A.d(s,r.h("e(1)").a(new A.ek(a)),r.h("d<1>")),t.r)},
G(a){var s=this.f,r=A.h(s)
return A.b1(new A.d(s,r.h("e(1)").a(new A.eh(a)),r.h("d<1>")),t.q)},
K(){var s,r,q,p,o=this,n=t.d,m=A.c([],n)
for(s=o.f,r=s.length,q=0;q<r;++q)m.push(s[q].K())
s=A.c([],n)
for(r=o.r,p=r.length,q=0;q<p;++q)s.push(r[q].K())
n=A.c([],n)
for(r=o.w,p=r.length,q=0;q<p;++q)n.push(r[q].K())
return A.T(["country",o.a,"tick",o.b,"month",o.e,"cities",m,"heroes",s,"countries",n,"pool",o.x,"salary",o.y,"year",o.c,"monthIndex",o.d],t.N,t.X)}}
A.el.prototype={
$1(a){return t.t.a(a).a===this.a.a},
$S:5}
A.em.prototype={
$1(a){return t.q.a(a).b===this.a.a},
$S:1}
A.ej.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b
if(a.c===s){r=a.as
s=(r===B.f||r===B.d)&&a.f>0&&a.b===B.a.ao(this.a.f,new A.ei(s)).b}else s=!1
return s},
$S:0}
A.ei.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.ek.prototype={
$1(a){return t.r.a(a).a===this.a},
$S:0}
A.eh.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.hs.prototype={
cz(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=this.b,r=s.x,r=new A.ak(r,r.r,r.e,A.k(r).h("ak<2>")),q=this.f,p=this.a,o=p.a,n=p.b,m=s.y,s=s.z;r.j();){l=r.d
k=p.a2(l.a)
j=p.G(l.d)
i=!0
if(l.b==="expedition")if(k!=null)if(j!=null)if(j.b!==o)if(k.b===o)if(!k.fr)if(!(k.f<=0))if(l.y>=n)if(!(k.p1&&l.z<n)){l=k.a
if(!m.p(0,l)){h=k.as
if(h!==B.q)l=(h===B.f||h===B.d)&&!s.p(0,l)
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
J.jW(q.bp(j.a,new A.hu()),k)}},
gaX(){var s,r,q,p=this,o=p.d
if(o==null||p.f.a!==0)return o
s=new A.hy(p)
r=p.a
if(A.bg(o,r,p.c,null).gaj())return s.$1(o)?o:null
r=r.f
q=A.h(r)
return new A.I(r,q.h("a(1)").a(new A.hw()),q.h("I<1,a>")).dG(0).D(0,new A.hx(p,s))?null:o},
gcf(){var s,r=this
if(r.gaX()!=null){s=r.a.G(r.e)
s=s==null?null:s.b
s=s==r.gaX()}else s=!1
return s?r.e:null},
gY(){var s=this.f,r=A.k(s).h("a9<1>"),q=A.n(new A.a9(s,r),r.h("b.E"))
B.a.C(q,new A.hC(this))
return A.b1(q,t.S)},
gca(){var s,r=this,q=r.gY()
if(q!=null){s=r.c.r
s=r.a.d>=s.k2&&r.f.a<s.k1&&r.dc(q)>=s.k3}else s=!0
return s},
aT(a){var s,r,q,p,o=this
if(o.gY()==null)return!0
s=o.f
r=a.a
if(s.W(r))return!0
q=!1
if(o.gaX()!=null)if(a.b!==o.gaX())q=o.gY()==null||!o.gca()
if(q)return!1
p=o.gY()
if(p==null)p=o.gcf()
q=!0
if(p!=null)if(r!==p)s=o.gY()!=null&&!s.W(r)&&o.gca()
else s=q
else s=q
return s},
dc(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this,e="soldierLimit",d=f.a,c=d.G(a)
c.toString
s=f.f.i(0,a)
s=J.A(s==null?A.c([],t.e):s)
r=f.b.z
q=f.c.b
p=0
while(s.j()){o=s.gl()
if(r.p(0,o.a)){n=q.i(0,e)
n.toString
m=B.b.n(n)}else m=o.gJ()
p+=f.bS(o,m,0)}l=B.a.ao(d.w,new A.hv(c)).c
for(d=d.v(a),s=A.h(d).h("L<1>"),s=A.U(new A.L(d,s),0,A.X(c.gZ(),"count",t.S),s.h("l.E")),d=s.$ti,s=new A.q(s,s.gk(0),d.h("q<l.E>")),r=c.fx,o=c.cx,n=c.cy,k=o==null,d=d.h("l.E"),c=c.d,j=0,i=0;s.j();){h=s.d
if(h==null)h=d.a(h)
g=q.i(0,e)
g.toString
m=Math.min(B.b.n(g),h.gJ()+l)
l-=m-h.gJ()
if(k)g=c
else{g=r?1:0
g=B.c.A(o-n-g,0,5)}j+=f.bS(h,m,Math.max(1,g-i));++i}return j===0?1/0:p/j},
bS(a,b,c){var s,r=this.c,q=r.bj(a.w,c,!1)
r=r.b
s=r.i(0,"soldierPower")
s.toString
s=B.b.n(s)
r=r.i(0,"soldierHp")
r.toString
return(a.f+b*B.b.n(r))*(B.c.bi(q+b*s+2,4)+1)*(1+a.ax/1000)}}
A.ht.prototype={
$1(a){var s=t.q.a(a).b
return s===this.a&&s!==this.b.a},
$S:1}
A.hu.prototype={
$0(){return A.c([],t.e)},
$S:49}
A.hy.prototype={
$1(a){var s=this.a,r=s.a.f,q=A.h(r)
return new A.d(r,q.h("e(1)").a(new A.hA(a)),q.h("d<1>")).D(0,new A.hB(s))},
$S:29}
A.hA.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.hB.prototype={
$1(a){var s
t.q.a(a)
s=this.a
return s.a.gR().D(0,new A.hz(s,a))},
$S:1}
A.hz.prototype={
$1(a){var s=this.a,r=t.q.a(a).f
return s.b.c.am(r,this.b.r.X(r))<=s.c.r.at},
$S:1}
A.hw.prototype={
$1(a){return t.q.a(a).b},
$S:51}
A.hx.prototype={
$1(a){var s
A.i(a)
s=this.a
return A.bg(a,s.a,s.c,null).gaj()&&this.b.$1(a)},
$S:29}
A.hC.prototype={
$2(a,b){var s,r,q
A.i(a)
A.i(b)
s=this.a.f
r=s.i(0,b)
r.toString
r=J.N(r)
s=s.i(0,a)
s.toString
q=B.c.t(r,J.N(s))
return q!==0?q:B.c.t(a,b)},
$S:52}
A.hv.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:5}
A.cl.prototype={}
A.hD.prototype={
ap(a){var s=this.a.Q
return!A.bg(a.b,s,this.b,null).gaj()||s.gR().gk(0)>=3||s.gR().D(0,new A.hE(this,a))},
cg(a,b,c,d){var s,r,q,p,o,n,m,l,k=this
if(a===0||b.gZ()<3||k.a.Q.v(b.a).length<2)return a
s=k.a.Q.r
r=A.h(s)
q=r.h("e(1)")
r=r.h("d<1>")
p=new A.d(s,q.a(new A.hH(k)),r).L(0,0,new A.hI(),t.S)
o=d.z
n=k.c.am(o,b.r.X(o))
m=new A.d(s,q.a(new A.hJ(k,p,n,b,c)),r).gk(0)
l=Math.max(0,c.d-c.aH().a-20)
s=k.b
r=s.b.i(0,"soldierLimit")
r.toString
return Math.max(a,Math.min(s.r.fy,Math.min(m,B.c.b2(l,Math.max(1,B.b.n(r))))))},
ak(a,b){var s,r,q,p,o
t.ef.a(a)
t.E.a(b)
s=t.N
s=A.a4(s,s)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.x)(a),++q){p=a[q]
s.u(0,"h:"+p.a,p.fx)}for(r=b.length,q=0;q<b.length;b.length===r||(0,A.x)(b),++q){o=b[q]
s.u(0,"c:"+o.a,o.CW)}return s},
an(a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=this,a4=null,a5=b8==="intercept"
if(a5){s=a7.as
s=s===B.f||s===B.d}else s=!1
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
if(n)m=b9.b===a3.a.Q.a||!a3.ap(b9)
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
i=J.aG(j)
j=i.ga7(j)&&i.gT(j).E(J.jr(a8.a))<32&&a7.as!==B.h}}}}if(j)return a4}h=a6.V()
g=A.c([],t.w)
if(!a9){j=r.b
i=j.i(0,"battleBudget")
i.toString
f=b0?1:b9.gZ()
f=Math.min(f,a3.a.Q.v(b9.a).length)
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
p=B.b.au(isFinite(b1)?b1*60:(Math.max(o,60)+q.cx+p)*60)
c=B.b.aL(q.CW*60)
b=a8.a
a=a9&&b6
if(n||b8==="staging")n=b9.b
else n=a4
a0=new A.a7(m,b8,b7,s,n,b0,i,b,0,d+p,d+c,0,a9,a,a7.fy+1)
p=!1
if(a9){n=h.N(s)
p=(k?a4:l.as)===!0&&l.y>=d&&l.d===s?1:0
q=b6?Math.max(h.P(b9),b9.at+q.cy):h.P(b9)
q=n-p>=q}else q=p
if(q)return a4
q=a7.as
if(q===B.f||q===B.d){q=h.f
r=r.b.i(0,"soldierLimit")
r.toString
a1=Math.max(0,Math.min(q,b4+B.b.n(r)-a7.gJ())-h.e)
if(a1>0){if(f.x===B.o)return a4
a2=h.aA(b2)
if(a2<a1)return a4
B.a.m(g,new A.F(B.i,a4,a7.c,a4,a2))}if(!h.df(a7,a0))return a4
if(h.e<b4)return a4
if(a5||b8==="staging"||J.N(b)>1)a5=a4
else a5=s
B.a.m(g,new A.F(B.C,m,a5,J.cV(b),0))}else{if(!h.dw(a7,a0))return a4
if(a5||b8==="staging"||J.N(b)>1)a5=a4
else a5=s
B.a.m(g,new A.F(B.O,m,a5,J.cV(b),0))}a5=A.c([a7],t.e)
if(!j)a5.push(b3)
s=e.G(a7.c)
s.toString
s=A.c([s],t.Y)
s.push(b9)
return new A.cl(h,new A.S(b7,g,a3.ak(a5,s),A.c([a0],t.m),h.d,b2))},
co(a,b,c,d,e,f,g,h,i,j){return this.an(a,b,c,d,!1,e,f,null,0,0,g,h,i,j)},
cp(a,b,c,d,e,f,g,h){return this.an(a,b,c,d,!1,1/0,!1,null,0,0,e,f,g,h)},
bu(a,b,c,d,e,f,g,h,i){return this.an(a,b,c,!1,d,1/0,!1,null,e,f,!1,g,h,i)},
cr(a,b,c,d,e,f,g,h){return this.an(a,b,c,!1,!1,1/0,d,null,e,0,!1,f,g,h)},
bt(a,b,c,d,e,f,g,h,i){return this.an(a,b,c,!1,d,1/0,e,null,0,f,!1,g,h,i)},
b1(a,b,c,d,e,f,g,h,i){return this.an(a,b,c,d,!1,e,f,null,0,0,!1,g,h,i)},
cs(a,b,c,d,e,f,g,h,i){return this.an(a,b,c,!1,!1,d,e,f,0,0,!1,g,h,i)},
cq(a,b,c,d,e,f,g,h){return this.an(a,b,c,!1,!1,d,e,null,0,0,!1,f,g,h)},
c7(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a5.go!=null)return B.t
s=this.a.Q
r=s.G(a4.c)
r.toString
q=a4.as
p=q===B.f||q===B.d?r.r.c3(r.f,a5.z):a4.z
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
g=h.bY(p)
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
a0=A.n(new A.d(A.c([(m-a)/j,(m+a)/j],t.n),t.db.a(new A.hF()),g),g.h("b.E"))
if(a0.length!==0)b=B.a.af(a0,B.u)}for(m=s.f,a1=B.t,a2=0;a2<3;++a2){a3=new A.B(q+l*b,r+k*b)
if(!h.p(0,a3)||B.a.D(m,new A.hG(a3)))return B.t
a1=i.dE(a4,a3,s)
if(!a1.d)return a1
j=a1.b
if(Math.abs(b-j)<0.1)break
b=(b+j)/2}return a1}}
A.hE.prototype={
$1(a){var s=this.a,r=t.q.a(a).f
return s.c.am(r,this.b.r.X(r))<=s.b.r.at},
$S:1}
A.hH.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a.Q.a&&!a.fr},
$S:0}
A.hI.prototype={
$2(a,b){return Math.max(A.i(a),t.r.a(b).w)},
$S:22}
A.hJ.prototype={
$1(a){var s,r,q,p,o,n=this
t.r.a(a)
s=n.a
r=!1
if(a.b===s.a.Q.a)if(!a.fr)if(a.f>=a.r*0.65)if(a.w>=n.b*0.8){q=!1
if(a.cx){p=n.c
if(p!=null){o=a.z
s=Math.abs(s.c.am(o,n.d.r.X(o))-p)<=s.b.r.ok}else s=!0
if(s){s=n.e
s=s.aG(a)&&!s.Q.p(0,a.a)}else s=q}else s=q
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
A.hF.prototype={
$1(a){return A.ap(a)>=0},
$S:27}
A.hG.prototype={
$1(a){return t.q.a(a).r.p(0,this.a)},
$S:1}
A.aI.prototype={
aP(){return"AiDecisionStage."+this.b}}
A.as.prototype={
aP(){return"AiActionKind."+this.b}}
A.F.prototype={
K(){var s=this,r=s.d
r=r==null?null:A.c([r.a,r.b],t.n)
return A.T(["kind",s.a.a,"hero",s.b,"city",s.c,"point",r,"amount",s.e],t.N,t.X)}}
A.a7.prototype={
K(){var s,r,q,p=this,o=A.c([],t.b)
for(s=J.A(p.w),r=t.n;s.j();){q=s.gl()
o.push(A.c([q.a,q.b],r))}return A.T(["hero",p.a,"role",p.b,"deadline",p.y,"commit",p.z,"city",p.d,"enemy",p.r,"points",o,"leg",p.x,"gold",p.Q,"slot",p.as,"rearStaging",p.at,"reason",p.c,"order",p.ax,"targetCountry",p.e,"attrition",p.f],t.N,t.X)}}
A.S.prototype={
K(){var s,r,q,p=this,o=t.d,n=A.c([],o)
for(s=p.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.x)(s),++q)n.push(s[q].K())
o=A.c([],o)
for(s=p.d,r=s.length,q=0;q<s.length;s.length===r||(0,A.x)(s),++q)o.push(s[q].K())
return A.T(["reason",p.a,"actions",n,"deps",p.c,"tasks",o,"floor",p.e,"emergency",p.f],t.N,t.X)}}
A.by.prototype={
K(){var s,r,q,p=this,o=A.c([],t.d)
for(s=p.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.x)(s),++q)o.push(s[q].K())
return A.T(["phase",p.a,"target",p.b,"gold",p.c,"heroes",p.d,"groups",o,"notes",p.f,"limited",p.r,"assessments",p.w,"routeSteps",p.x,"expansions",p.y],t.N,t.X)}}
A.eq.prototype={
K(){var s,r,q,p=this,o=p.Q.K(),n=A.c([],t.d)
for(s=p.as,r=s.length,q=0;q<s.length;s.length===r||(0,A.x)(s),++q)n.push(s[q].K())
return A.T(["protocol",2,"session",p.a,"id",p.d,"rules",p.b,"map",p.c,"observation",o,"deadline",p.e,"tasks",n,"seed",p.f,"priority",p.r,"idle",p.w,"stage",p.x.b,"offensiveCountry",p.y,"offensiveCity",p.z],t.N,t.X)}}
A.ep.prototype={
K(){var s=this
return A.T(["protocol",2,"session",s.a,"id",s.d,"country",s.e,"rules",s.b,"map",s.c,"tick",s.f,"deadline",s.r,"plan",s.x.K(),"micros",s.w,"error",s.y],t.N,t.X)}}
A.j9.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:5}
A.ja.prototype={
$0(){var s,r=this,q=r.a,p=q.d,o=r.b,n=!1
if(o.length!==0)if(p!=null){n=r.c
n=n.f>=n.r*0.5&&p.c>0&&p.b>=r.d.r.ch}if(n)return new A.az([!0,p.b,1,p.c])
s=B.b.au(q.c/Math.max(1,r.e*0.85))
if(o.length!==0){o=r.c
o=o.f>=o.r*0.65&&s>=2&&s<=r.d.r.fy}else o=!1
if(o)return new A.az([!0,p.b,s,p.c])
return new A.az([!1,q.b,0,q.a])},
$S:53}
A.jm.prototype={
$1(a){return A.V(a)===this.a},
$S:54}
A.du.prototype={
ce(h0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7=this,g8=null,g9={}
g9.a=h0
s=g7.a
r=s.Q
q=g7.e
p=A.k(q).h("Q<2>")
o=new A.Q(q,p).D(0,new A.hR())
n=t.Z
m=A.c([],n)
l=A.c([],t.dZ)
g9.b=g9.c=!1
k=g7.b
j=s.y
s=s.z
i=A.dp(r,h0,k,s,j)
h=r.r
g=A.h(h)
f=g.h("d<1>")
e=A.n(new A.d(h,g.h("e(1)").a(new A.hS(r)),f),f.h("b.E"))
B.a.C(e,new A.hT())
h=r.f
g=A.h(h)
f=g.h("e(1)")
g=g.h("d<1>")
d=g.h("b.E")
c=A.n(new A.d(h,f.a(new A.i3(g7,r,i)),g),d)
if(e.length!==0)B.a.C(c,new A.ia(g7,e,r))
b=A.b1(c,t.q)
a=h0.dv(c)
a0=new A.Q(q,p).D(0,new A.ib())
a1=b==null
a2=a1?g8:A.bg(b.b,r,k,g8)
a3=new A.hQ()
a4=new A.hN(g9,g7,m)
a5=r.gR()
a6=A.n(a5,a5.$ti.h("b.E"))
B.a.C(a6,new A.ic(g9,g7))
a5=t.S
a7=Math.min(g9.a.f,B.a.L(a6,0,new A.id(g9,g7),a5))
if(a6.length!==0){a8=g9.a.V()
a9=a8.aA(a0)
if(a9>0){b0=A.c([new A.F(B.i,g8,B.a.gI(a6).a,g8,a9)],t.w)
b1=a0?"\u906d\u53d7\u653b\u51fb\uff0c\u52a8\u7528\u5168\u90e8\u53ef\u7528\u73b0\u91d1\u8865\u5145\u5168\u56fd\u5175\u5458":"\u4f18\u5148\u8865\u6ee1\u5168\u56fd\u5175\u5458\u5bb9\u91cf\uff0c\u4fdd\u7559\u5c11\u91cf\u5468\u8f6c\u73b0\u91d1"
a4.$5$emergency(a8,b0,b1,B.a.gI(a6),a0)}}for(b0=a6.length,b1=k.r,b2=b1.fx,b3=b2-2,b4=t.w,b5=0;b6=a6.length,b5<b6;a6.length===b0||(0,A.x)(a6),++b5){b7=a6[b5]
if(m.length>=b3)break
b6=b7.a
b8=q.i(0,b6)
if(b8==null)b8=g8
else b8=b8.d.length!==0||b8.a.cx!=null
if(b8!==!0||b7.cx!=null)continue
b9=g9.a.v(b6)
b8=b9.length
c0=g9.a
c1=b7.cx
if(c1==null){c0=c0.w.i(0,b6)
if(c0==null)c0=b7.d}else{c0=b7.fx?1:0
c0=B.c.A(c1-b7.cy-c0,0,5)}c1=!1
if(b8<=c0){b8=q.i(0,b6)
if(b8==null)b8=g8
else{b8=b8.f
b8=b8==null?g8:b8.a}if(b8!==B.v){b8=q.i(0,b6)
b8=(b8==null?g8:b8.ga3())!==!0}else b8=c1}else b8=c1
if(b8)continue
b8=A.h(b9)
c0=b8.h("d<1>")
c2=A.n(new A.d(b9,b8.h("e(1)").a(new A.ie()),c0),c0.h("b.E"))
B.a.C(c2,new A.ig())
if(c2.length===0)continue
c3=B.a.gI(c2)
a8=g9.a.V()
if(a8.b_(b7,c3)&&a8.d>=a8.a5(!0).a)a4.$6$emergency$hero(a8,A.c([new A.F(B.l,c3.a,b6,g8,0)],b4),"\u9632\u5fa1\u7b56\u7565\u53d1\u73b0\u6765\u654c\uff0c\u52a8\u7528\u53ef\u7528\u73b0\u91d1\u63d0\u9ad8\u5fc5\u8981\u57ce\u9632",b7,!0,c3)}c4=new A.ii(g9,g7,a7,a3,r,a4)
for(b5=0;b5<a6.length;a6.length===b6||(0,A.x)(a6),++b5){b7=a6[b5]
if(m.length>=b3)break
b0=b7.a
b9=g9.a.v(b0)
b8=q.i(0,b0)
if(b8==null)b8=g8
else b8=b8.d.length!==0||b8.a.cx!=null
c5=b8===!0
b8=g9.a.N(b0)
c0=g9.a.ab(b7)
c6=!1
if(c5){c1=g9.a.N(b0)
c7=b7.cx
if(c7==null)c7=b7.d
else{c8=b7.fx?1:0
c8=B.c.A(c7-b7.cy-c8,0,5)
c7=c8}if(c1<c7){if(b9.length!==0){b0=q.i(0,b0)
if(b0==null)b0=g8
else{b0=b0.f
b0=b0==null?g8:b0.a}b0=b0!==B.e}else b0=!0
c6=b0}}if(b8<c0||c6)c4.$3$defense$emergency(b7,!0,c5)}for(b0=p.h("e(b.E)").a(new A.ih()),b6=new A.Q(q,p).gB(0),p=new A.a0(b6,b0,p.h("a0<b.E>")),b0=A.h(a6),b8=b0.h("e(1)"),b0=b0.h("d<1>"),c0=b0.h("b.E");p.j();){c1=b6.gl()
c7=g9.a.x
if(new A.Q(c7,A.k(c7).h("Q<2>")).D(0,new A.hU(c1)))continue
c9=A.n(new A.d(a6,b8.a(new A.hV(g9)),b0),c0)
B.a.C(c9,new A.hW(c1))
if(c9.length!==0)c4.$3$defense$emergency(B.a.gI(c9),!0,!0)}for(p=a.length,b5=0;b5<a.length;a.length===p||(0,A.x)(a),++b5){b7=a[b5]
if(m.length>=b3)break
if(o){b0=q.i(0,b7.a)
b0=(b0==null?g8:b0.ga3())===!0}else b0=!0
if(b0&&g9.a.cc(b7)&&!g9.b){b0=q.i(0,b7.a)
if(b0==null)b0=g8
else b0=b0.d.length!==0||b0.a.cx!=null
c5=b0===!0
c4.$3$defense$emergency(b7,c5,c5)}}for(p=a6.length,b5=0;b5<a6.length;a6.length===p||(0,A.x)(a6),++b5){b7=a6[b5]
if(g9.a.a8(b7))continue
b0=b7.a
b9=g9.a.v(b0)
b3=A.h(b9)
b6=b3.h("d<1>")
c2=A.n(new A.d(b9,b3.h("e(1)").a(new A.hX(g9)),b6),b6.h("b.E"))
B.a.C(c2,new A.hY())
d0=B.a.D(a,new A.hZ(b7))&&g9.a.cc(b7)
if(c2.length!==0)if(b7.cx==null){b3=b9.length
b6=g9.a.w.i(0,b0)
b8=!0
if(b6==null)b6=b7.d
if(b3<=b6)if(!B.a.D(b9,new A.i_())){if(d0){b3=b9.length
b6=g9.a.w.i(0,b0)
if(b6==null)b6=b7.d
b6=b3>=b6
b3=b6}else b3=!1
if(!b3){b3=q.i(0,b0)
if(b3==null)b3=g8
else{b3=b3.f
b3=b3==null?g8:b3.a}b3=b3===B.v}else b3=b8}else b3=b8
else b3=b8}else b3=!1
else b3=!1
if(b3){b0=q.i(0,b0)
if(b0==null)b0=g8
else b0=b0.d.length!==0||b0.a.cx!=null
if(b0!==!0)B.a.m(l,new A.aF(b7,B.a.gI(c2)))}}d1=A.c([],t.e)
for(p=a6.length,b5=0;b5<a6.length;a6.length===p||(0,A.x)(a6),++b5){b7=a6[b5]
b0=b7.a
b3=q.i(0,b0)
if(b3==null)b3=g8
else b3=b3.d.length!==0||b3.a.cx!=null
if(b3===!0)continue
b9=g9.a.v(b0)
b0=A.h(b9)
b3=b0.h("d<1>")
d2=A.n(new A.d(b9,b0.h("e(1)").a(new A.i0(g9)),b3),b3.h("b.E"))
B.a.C(d2,new A.i1())
b0=A.i(Math.max(0,b9.length-g9.a.ab(b7)))
b3=A.h(d2)
b6=new A.E(d2,0,b0,b3.h("E<1>"))
b6.a0(d2,0,b0,b3.c)
B.a.F(d1,b6)}B.a.C(d1,new A.i2())
d3=g8
d4=g8
d5=0
d6=1
if(d1.length!==0&&!g9.c&&!o){d7=B.a.gI(d1)
d8=A.dp(r,g9.a,k,s,j)
d9=A.n(new A.d(h,f.a(new A.i4(g9,g7,r)),g),d)
B.a.C(d9,new A.i5(g7,d7,r))
s=A.U(d9,0,A.X(b1.go,"count",a5),A.h(d9).c)
q=s.$ti
s=new A.q(s,s.gk(0),q.h("q<l.E>"))
p=g7.c
j=k.b
h=p.c
g=g7.d
f=b1.ok
d=d8.f
b0=t.aO
b3=t.eO
b6=b3.h("b.E")
q=q.h("l.E")
b1=b1.k4
e0=d5
e1=d3
for(;;){if(!s.j()){d5=e0
d3=e1
break}A:{b8=s.d
if(b8==null)b8=q.a(b8)
e2={}
e3=A.n(new A.d(d1,b0.a(new A.i6(g7,b8)),b3),b6)
if(e3.length===0)break A
d7=B.a.gI(e3)
e4=A.j8(d7,b8,r,k,g,0)
e5=b8.a
c0=d.i(0,e5)
e6=c0==null?g8:J.N(c0)
if(e6==null)e6=0
c0=e4.a
e7=p.cg(c0[2],b8,g9.a,d7)
e8=e7-e6
e9=d8.gY()!=null&&d8.gY()!==e5
c1=!0
if(c0[2]!==0)if(e8>0)if(e8<=e3.length)if(e9)c1=e7!==1||c0[1]<b1
else c1=!1
if(c1)break A
f0=g9.a.V()
f0.d=1e6
e2.a=f0
f1=A.c([],b4)
c1=b8.f
f3=1/0
f4=0
f5=0
for(;;){f2=!1
if(!(f5<e8)){f2=!0
break}if(!(f5<e3.length))return A.w(e3,f5)
f6=e3[f5]
if(A.j8(f6,b8,r,k,g,0).a[2]===0)break
f7=h.aB(f6,c1,r,b8)
c7=f7.b
f3=Math.min(f3,c7)
f4=Math.max(f4,c7)
if(!f7.d||f4-f3>f)break
f8=B.a.L(a6,0,new A.i7(e2,g7,f6),a5)
c7=e2.a
c8=c7.f
f9=j.i(0,"soldierLimit")
f9.toString
f9=Math.min(f8,Math.max(0,c8-B.b.n(f9)))
g0=p.bu(c7,f6,f7,c0[0],f9,e6+f5,"\u6309\u5171\u540c\u653b\u9632\u95e8\u69db\u6838\u7b97\u6574\u961f\u5175\u5458","expedition",b8)
if(g0==null)break
e2.a=g0.a
c7=g0.b.b
c8=A.h(c7)
B.a.F(f1,new A.d(c7,c8.h("e(1)").a(new A.i8()),c8.h("d<1>")));++f5}if(!f2)break A
b8=e2.a
g1=1e6-b8.d+b8.aH().a
b8=g9.a
if(b8.d<g1){if(e0===0||g1<e0){d6=e7
e0=g1
e1=e5}break A}a8=b8.V()
b8=f1.length
b5=0
for(;;){if(!(b5<f1.length)){f2=!0
break}if(!a8.c_(f1[b5].e)){f2=!1
break}f1.length===b8||(0,A.x)(f1);++b5}if(!f2||!a3.$1(a8))break A
if(f1.length!==0){b8=r.G(d7.c)
b8.toString
if(!a4.$4(a8,f1,"\u6309\u76ee\u6807\u57ce\u9632\u4e0e\u5b88\u5c06\u914d\u9f50"+e7+"\u540d\u8fdb\u653b\u5c06\u9886\u7684\u968f\u519b\u5175\u5458\uff0c\u4fdd\u7559\u5468\u8f6c\u4f59\u989d",b8))break A}d4=e5
break}}}s=d3==null
if(s&&!g9.c)for(q=l.length,b5=0;b5<l.length;l.length===q||(0,A.x)(l),++b5){p=l[b5]
b7=p.a
c3=p.b
if(B.a.L(m,0,new A.i9(),a5)>=b2)break
a8=g9.a.V()
if(a8.b_(b7,c3)&&a3.$1(a8))a4.$5$hero(a8,A.c([new A.F(B.l,c3.a,b7.a,g8,0)],b4),"\u5b8c\u6210\u519b\u9700\u5b89\u6392\u540e\u7528\u4f59\u94b1\u5347\u7ea7\u57ce\u9632\uff0c\u4ecd\u4fdd\u7559\u5c11\u91cf\u5468\u8f6c\u4f59\u989d",b7,c3)}q=d4==null
g2=r.G(q?d3:d4)
if(g2==null)g2=b
g3=g2==null?g8:A.bg(g2.b,r,k,g9.a.w)
g4=A.c([],n)
for(p=m.length,g5=0,b5=0;b5<m.length;m.length===p||(0,A.x)(m),++b5){g6=m[b5]
g5+=g6.b.length
if(g5>b2){g7.d.b.e=!0
break}B.a.m(g4,g6)}if(o)s="defending"
else s=s?"preparing":"saving"
q=q?d3:d4
if(q==null)if((a2==null?g8:a2.gaj())===!0)q=a1?g8:b.a
else q=g8
p=g7.d.b
n=p.e
k=p.c
j=p.d
p=p.b
h=A.c([],t.s)
if(o)h.push("\u4e3b\u89d2\u6240\u5728\u57ce\u5b58\u5728\u660e\u786e\u98ce\u9669\uff0c\u519b\u8d39\u4f18\u5148\u7528\u4e8e\u5b88\u519b\u4e0e\u57ce\u9632\uff0c\u6682\u505c\u65b0\u589e\u8fdc\u5f81\u519b\u9700")
if(m.length===0)h.push("\u672c\u8f6e\u65e0\u5fc5\u8981\u4e14\u53ef\u652f\u4ed8\u7684\u91c7\u8d2d\uff0c\u4fdd\u7559\u56fd\u5e93")
if((g3==null?g8:g3.gaj())===!0)h.push("\u76ee\u6807\u56fd\u5360\u6709 "+g3.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.au(g3.c*g3.gc6())+" \u91d1\u5e01\uff0c\u51c6\u5907\u8f6e\u653b\u5175\u529b")
return new A.by(s,q,d5,d6,g4,h,n,k,j,p)}}
A.hR.prototype={
$1(a){return t._.a(a).ga3()},
$S:9}
A.hS.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&a.f>0&&!a.fr},
$S:0}
A.hT.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.am(s.a(b),!0),A.am(a,!0))},
$S:2}
A.i3.prototype={
$1(a){t.q.a(a)
return a.b!==this.b.a&&this.c.aT(a)&&this.a.c.ap(a)},
$S:1}
A.ia.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.cT(o.a(b),B.a.gI(s),r,p,q,null),A.cT(a,B.a.gI(s),r,p,q,null))},
$S:4}
A.ib.prototype={
$1(a){t._.a(a)
return a.d.length!==0||a.a.cx!=null},
$S:9}
A.hQ.prototype={
$2$emergency(a,b){return a.d>=a.a5(b).a},
$1(a){return this.$2$emergency(a,!1)},
$S:55}
A.hN.prototype={
$6$emergency$hero(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k
t.f3.a(b)
s=a.V()
r=B.a.D(b,new A.hO())?s.aA(e):0
q=this.c
p=B.a.L(q,0,new A.hP(),t.S)
o=b.length
n=r>0
m=n?1:0
l=this.b
if(p+o+m>l.b.r.fx){l.d.b.e=!0
return!1}this.a.a=s
o=l.c
m=t.e
l=A.c([],m)
if(f!=null)l.push(f)
k=t.Y
B.a.m(q,new A.S(c,b,o.ak(l,A.c([d],k)),B.p,a.a5(e).a,e))
if(n)B.a.m(q,new A.S("\u5728\u540c\u4e00\u6b21\u8865\u5175\u7a97\u53e3\u5185\u8865\u5145\u5347\u7ea7\u65b0\u589e\u7684\u5168\u56fd\u5175\u5458\u5bb9\u91cf\uff0c\u4e0d\u900f\u652f\u56fd\u5e93",A.c([new A.F(B.i,null,d.a,null,r)],t.w),o.ak(A.c([],m),A.c([d],k)),B.p,a.a5(e).a,e))
return!0},
$4(a,b,c,d){return this.$6$emergency$hero(a,b,c,d,!1,null)},
$5$emergency(a,b,c,d,e){return this.$6$emergency$hero(a,b,c,d,e,null)},
$5$hero(a,b,c,d,e){return this.$6$emergency$hero(a,b,c,d,!1,e)},
$S:56}
A.hO.prototype={
$1(a){return t.T.a(a).a===B.l},
$S:13}
A.hP.prototype={
$2(a,b){return A.i(a)+t.I.a(b).b.length},
$S:7}
A.ic.prototype={
$2(a,b){var s,r,q,p,o,n,m,l=null,k=t.q
k.a(a)
s=this.b.e
k=k.a(b).a
r=s.i(0,k)
r=(r==null?l:r.ga3())===!0?1:0
q=a.a
p=s.i(0,q)
o=B.c.t(r,(p==null?l:p.ga3())===!0?1:0)
if(o!==0)return o
r=this.a
p=r.a.v(k).length===0?1:0
n=B.c.t(p,r.a.v(q).length===0?1:0)
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
$S:4}
A.id.prototype={
$2(a,b){var s,r
A.i(a)
t.q.a(b)
s=this.a.a.v(b.a).length
r=this.b.b.b.i(0,"soldierLimit")
r.toString
return a+s*B.b.n(r)},
$S:8}
A.ie.prototype={
$1(a){return t.r.a(a).dx},
$S:0}
A.ig.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.ii.prototype={
$3$defense$emergency(a,b,c){var s,r,q,p,o,n,m=this,l=null,k=m.a,j=a.a
if(!k.a.as.p(0,j)){s=m.b.e.i(0,j)
if(s==null)s=l
else s=s.d.length!==0||s.a.cx!=null
s=s===!0&&k.a.N(j)>=a.gZ()}else s=!0
if(s)return!1
r=k.a.V()
s=r.f
q=r.as.a
p=m.b.b.b.i(0,"soldierLimit")
p.toString
o=Math.max(0,Math.min(s,m.c+(q+1)*B.b.n(p))-r.e)
n=o>0?r.aA(c):0
if(n<o&&!c)return!1
if(!r.ci(a,c)||!m.d.$2$emergency(r,c)){if(a.ay&&m.e.x>k.a.as.a){k.c=!0
if(b)k.b=!0}return!1}k=A.c([],t.w)
if(n>0)k.push(new A.F(B.i,l,j,l,n))
k.push(new A.F(B.B,l,j,l,0))
j=b?"\u4f18\u5148\u8865\u5145\u9632\u5b88\u7f3a\u53e3\uff0c\u53d7\u88ad\u65f6\u52a8\u7528\u5168\u90e8\u53ef\u7528\u73b0\u91d1":"\u5229\u7528\u672c\u57ce\u6708\u5ea6\u62db\u52df\u673a\u4f1a\u8865\u5145\u524d\u7ebf\uff0c\u540e\u65b9\u65b0\u5c06\u5230\u4efb\u540e\u7ee7\u7eed\u51fa\u5f81"
return m.f.$5$emergency(r,k,j,a,c)},
$S:57}
A.ih.prototype={
$1(a){var s
t._.a(a)
if(a.d.length!==0||a.a.cx!=null){s=a.f
s=(s==null?null:s.a)!==B.e}else s=!1
return s},
$S:9}
A.hU.prototype={
$1(a){t.J.a(a)
return a.b==="rescue"&&a.d===this.a.a.a},
$S:6}
A.hV.prototype={
$1(a){var s
t.q.a(a)
s=this.a
return s.a.a8(a)&&s.a.v(a.a).length===0&&a.ay},
$S:1}
A.hW.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.a.f
return B.b.t(a.f.E(s),b.f.E(s))},
$S:4}
A.hX.prototype={
$1(a){t.r.a(a)
return a.dx&&!this.a.a.Q.p(0,a.a)},
$S:0}
A.hY.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.hZ.prototype={
$1(a){return t.q.a(a).a===this.a.a},
$S:1}
A.i_.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.i0.prototype={
$1(a){t.r.a(a)
return a.cx&&this.a.a.aG(a)},
$S:0}
A.i1.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.am(s.a(b),!0),A.am(a,!0))},
$S:2}
A.i2.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.am(s.a(b),!0),A.am(a,!0))},
$S:2}
A.i4.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.dp(s,this.a.a,r.b,q.z,q.y).aT(a)&&r.c.ap(a)}else s=!1
return s},
$S:1}
A.i5.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.cT(o.a(b),s,r,p,q,null),A.cT(a,s,r,p,q,null))},
$S:4}
A.i6.prototype={
$1(a){t.r.a(a)
return this.a.c.ap(this.b)},
$S:0}
A.i7.prototype={
$2(a,b){var s,r,q
A.i(a)
t.q.a(b)
s=this.a
r=b.a
q=s.a.v(r).length
s=Math.min(Math.max(0,q-(r===this.c.c?1:0)),s.a.ab(b))
q=this.b.b.b.i(0,"soldierLimit")
q.toString
return a+s*B.b.n(q)},
$S:8}
A.i8.prototype={
$1(a){return t.T.a(a).a===B.i},
$S:13}
A.i9.prototype={
$2(a,b){return A.i(a)+t.I.a(b).b.length},
$S:7}
A.b_.prototype={}
A.er.prototype={
am(b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=b1.a,a7=b1.b,a8=A.t(b0.a)+","+A.t(b0.b)+":"+A.t(a6)+","+A.t(a7),a9=a5.d
if(a9.W(a8)){a6=a9.i(0,a8)
a6.toString
return a6}for(s=a5.a,r=s.b,q=s.c,p=r+q+8,o=r-1,--q,n=a5.b,m=n.b,n=n.e,s=s.d,l=s.length,k=n.length,j=a5.c,i=b0,h=0,g=0;g<p;++g){f=i.E(b1)
if(f<1e-7){if(a9.a>=256){e=new A.a9(a9,A.k(a9).h("a9<1>")).gB(0)
if(!e.j())A.aB(A.a_())
a9.ar(0,e.gl())}a9.u(0,a8,h)
return h}if(!j.dA())return 1/0
d=i.a
c=(a6-d)/f
b=i.b
a=(a7-b)/f
a0=B.c.A(B.b.a6((d+c*1e-7)/16),0,o)
a1=B.c.A(B.b.a6((b+a*1e-7)/16),0,q)
a2=new A.es()
a3=a2.$3(d,c,a0)
a2=a2.$3(b,a,a1)
a4=Math.min(f,Math.min(A.kM(a3),A.kM(a2)))
a2=m.i(0,"marchSpeed")
a2.toString
a3=a1*r+a0
if(!(a3>=0&&a3<l))return A.w(s,a3)
a3=s[a3]
if(!(a3<k))return A.w(n,a3)
h+=a4/(a2*n[a3])
i=new A.B(d+c*a4,b+a*a4)}return 1/0},
aY(a7,a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=a9.G(a7.c),a4=a7.as,a5=(a4===B.f||a4===B.d)&&a3!=null?a3.r.c3(a3.f,a8):a7.z,a6=b2==null?a8:b2.r.bX(a5,a8)
a4=this.a
if(!a4.p(0,a6))return B.t
s=new A.et(a9,a7,b2,b1,a6)
r=new A.ev(this,a9,a7)
q=t.a
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
e=new A.B(l-k*f,i+o*f)
if(a4.p(0,e))B.a.m(p,A.c([e,a6],q))}}for(a4=p.length,d=null,g=0;g<p.length;p.length===a4||(0,A.x)(p),++g){c=p[g]
q=B.a.gB(c)
a=a5
a0=0
a1=!1
for(;;){if(!q.j()){b=!0
break}a2=q.gl()
if(s.$2(a,a2)){b=!1
break}a1=a1||r.$2(a,a2)
a0+=this.am(a,a2)
a=a2}q=!0
if(b)if(isFinite(a0))q=b0&&a1
if(q)continue
if(d==null||a0<d.b)d=new A.b_(c,a0,!0)}return d==null?B.T:d},
aC(a,b,c,d,e){return this.aY(a,b,c,d,null,e)},
aB(a,b,c,d){return this.aY(a,b,c,!1,null,d)},
dF(a,b,c,d){return this.aY(a,b,c,!1,d,null)},
dE(a,b,c){return this.aY(a,b,c,!1,null,null)}}
A.es.prototype={
$3(a,b,c){var s
if(Math.abs(b)<1e-12)s=1/0
else s=Math.max(1e-8,((b>0?c+1:c)*16-a)/b)
return s},
$S:58}
A.et.prototype={
$2(a,b){var s=this
return B.a.D(s.a.f,new A.eu(s.b,s.c,a,b,s.d,s.e))},
$S:30}
A.eu.prototype={
$1(a){var s,r,q,p,o=this
t.q.a(a)
if(a.b!==o.a.b){s=o.b
s=s==null?null:s.a
s=a.a===s}else s=!0
if(s)return!1
s=o.d
r=a.r.c5(o.c,s)
if(r!=null){q=o.e
q=q==null?null:q.a
p=!(a.a===q&&s.E(o.f)<1e-7&&r>=0.9999999)
s=p}else s=!1
return s},
$S:1}
A.ev.prototype={
$2(a,b){return B.a.D(this.b.r,new A.ew(this.a,this.c,b,a))},
$S:30}
A.ew.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this
t.r.a(a)
if(a.b!==j.b.b){s=a.as
s=s===B.f||s===B.d||a.fr||a.f<=0}else s=!0
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
l=B.b.A(((k.a-q)*p+(k.b-o)*n)/m,0,1)}s=r.aK(s,l).E(a.z)
r=j.a.b.b.i(0,"encounterDistance")
r.toString
return s<r+12},
$S:0}
A.ex.prototype={
cb(a,b){var s,r=this.b
if(r.i(0,"useMorale")===0)return 0
if(b>0){r=r.i(0,"cityMoraleBonus"+B.c.A(b,1,5))
r=r==null?null:B.b.n(r)
if(r==null)r=0}else r=0
s=a+r
return s<0?0:s},
ds(a){return this.cb(a,0)},
bk(a,b,c,d){var s,r,q,p
if(c){s=this.f
if(!(d<s.length))return A.w(s,d)
s=s[d]}else s=1
s=B.c.A(B.b.a6(a*s),0,63)
if(b>0){r=this.d
q=r.length
p=B.c.A(b-1,0,q-1)
if(!(p>=0&&p<q))return A.w(r,p)
p=r[p]
r=p}else r=0
return B.c.A(s+r,0,63)},
bj(a,b,c){return this.bk(a,b,c,0)},
d6(a,b){return this.bk(a,0,b,0)},
ai(a){var s,r,q="maxLevel",p=this.b,o=p.i(0,"firstYearCityLevel")
if(o==null){o=p.i(0,q)
o.toString
o=B.b.n(o)}o=B.b.n(o)
s=p.i(0,"initialYear")
s=B.b.n(s==null?1:s)
r=p.i(0,q)
r.toString
r=B.c.A(a-s,0,B.b.n(r))
s=p.i(0,"cityLevelsPerYear")
s=B.b.n(s==null?1:s)
p=p.i(0,q)
p.toString
return B.c.A(o+r*s,1,B.b.n(p))},
K(){var s=this
return A.T(["version",s.a,"values",s.b,"upgrades",s.c,"defenseBonuses",s.d,"movement",s.e,"field",s.f,"tuning",s.r.K()],t.N,t.X)}}
A.ef.prototype={
bY(a){var s=this.d,r=this.b
r=B.c.A(B.b.a6(a.b/16),0,this.c-1)*r+B.c.A(B.b.a6(a.a/16),0,r-1)
if(!(r>=0&&r<s.length))return A.w(s,r)
return s[r]},
p(a,b){var s,r=b.a
if(isFinite(r)){s=b.b
r=isFinite(s)&&r>=0&&s>=0&&r<this.b*16&&s<this.c*16}else r=!1
return r},
K(){var s=this
return A.T(["version",s.a,"width",s.b,"height",s.c,"terrain",s.d],t.N,t.X)}}
A.ez.prototype={
du(a){var s,r,q,p,o,n,m,l,k,j,i,h=this
try{s=t.d1.a(B.j.dd(a,null))
switch(J.ar(s,"kind")){case"init":if(!J.aD(J.ar(s,"protocol"),2)||!J.aD(J.ar(s,"build"),"4e2c7724"))throw A.f(B.aa);++h.f
h.e=null
o=h.r
if(o.a>0){o.b=o.c=o.d=o.e=o.f=null
o.a=0
o.b5()}r=J.ar(s,"gameConfig")
o=t.f
if(!o.b(r))throw A.f(B.a5)
n=t.N
m=t.z
A.lz(A.ah(r,n,m))
h.c=A.lj(A.ah(o.a(J.ar(s,"rules")),n,m))
m=A.ah(o.a(J.ar(s,"map")),n,m)
o=A.M(m.i(0,"version"))
l=A.i(m.i(0,"width"))
k=A.i(m.i(0,"height"))
m=A.ce(t.R.a(m.i(0,"terrain")),!0,t.S)
j=new Uint8Array(A.mz(m))
if(l<=0||k<=0||m.length!==l*k)A.aB(B.ad)
h.d=new A.ef(o,l,k,j)
h.a.$1(B.j.av(t.G.a(A.T(["kind","ready","rules",h.c.a,"map",o,"backend",h.b],n,t.X)),null))
break
case"cancel":o=h.e
n=J.ar(s,"id")
if(o==null?n==null:o===n)h.r.m(0,A.i(J.ar(s,"id")))
break
case"plan":if(h.c==null||h.d==null||h.e!=null){o=A.io("AI \u5c1a\u672a\u5c31\u7eea\u6216\u5df2\u6709\u8bf7\u6c42\u6267\u884c\u4e2d")
throw A.f(o)}q=A.li(A.ah(t.f.a(J.ar(s,"request")),t.N,t.z))
h.e=q.d
h.aR(q,h.f)
break
default:throw A.f(B.ac)}}catch(i){p=A.aY(i)
h.a.$1(B.j.av(t.G.a(A.T(["kind","error","message",J.aZ(p)],t.N,t.X)),null))}},
aR(a,b){return this.cW(a,b)},
cW(a3,a4){var s=0,r=A.mV(t.o),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
var $async$aR=A.n9(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:a1=new A.ip()
$.jU()
a1.bw()
m=a1
p=4
i=n.c
i.toString
h=n.d
h.toString
g=new A.ey(i.r)
f=new A.eL(i,h,a3,g,A.a4(t.S,t._))
e=t.N
h=new A.er(h,i,g,A.a4(e,t.i))
f.e=h
f.f=new A.eI(i,g,A.a4(e,t.cM))
f.r=new A.hD(a3,i,h)
l=f
k=0
i=l.bx(),h=i.$ti,i=new A.aV(i.a(),h.h("aV<1>")),h=h.c,g=n.r,d=a3.d,c=t.o
case 7:if(!i.j()){s=8
break}b=i.b
if(b==null)h.a(b)
if(a4!==n.f||g.p(0,d)){if(a4===n.f){n.e=null
g.ar(0,d)
n.a.$1(B.j.av(t.G.a(A.T(["kind","cancelled","id",d],e,t.X)),null))}s=1
break}b=k
if(typeof b!=="number"){q=b.az()
s=1
break}a=b+1
k=a
s=a>=n.c.r.id?9:10
break
case 9:k=0
b=m
if(b.b==null)b.b=$.hM.$0()
s=11
return A.mr(A.lx(B.G,c),$async$aR)
case 11:m.bw()
case 10:s=7
break
case 8:if(a4!==n.f){s=1
break}if(g.ar(0,d)){n.e=null
n.a.$1(B.j.av(t.G.a(A.T(["kind","cancelled","id",d],e,t.X)),null))
s=1
break}n.e=null
i=l.w
i.toString
n.a.$1(B.j.av(t.G.a(A.T(["kind","reply","reply",A.k1(a3,i,null,m.gc4()).K()],e,t.X)),null))
p=2
s=6
break
case 4:p=3
a2=o.pop()
j=A.aY(a2)
if(a4!==n.f){s=1
break}n.e=null
i=A.c(["\u89c4\u5212\u5931\u8d25\uff0c\u4e3b\u73af\u5883\u4fdd\u7559\u6709\u9650\u5b89\u5168\u4fdd\u62a4"],t.s)
h=m.gc4()
n.a.$1(B.j.av(t.G.a(A.T(["kind","reply","reply",A.k1(a3,new A.by("preparing",null,0,1,B.L,i,!1,0,0,0),J.aZ(j),h).K()],t.N,t.X)),null))
s=6
break
case 3:s=2
break
case 6:case 1:return A.mt(q,r)
case 2:return A.ms(o.at(-1),r)}})
return A.mu($async$aR,r)}}
A.jn.prototype={
$1(a){t.r.a(a)
return a.w*3+a.f*0.35+a.gJ()*8},
$S:21}
A.jo.prototype={
$1(a){var s
t.r.a(a)
if(a.c===this.a.a){s=a.as
s=!(s===B.f||s===B.d)}else s=!1
return s},
$S:0}
A.jp.prototype={
$2(a,b){var s
A.ap(a)
t.r.a(b)
s=A.ae(b)
return a+s*(b.go==null?0.12:0.03)},
$S:31}
A.a6.prototype={}
A.au.prototype={
ga3(){var s=this,r=!1
if(B.a.D(s.b,new A.eD()))if(s.a.cx!=null||B.a.D(s.d,new A.eE())){r=s.r
r=r==null||r.a!==B.e}return r},
gaa(){var s,r=this.a
if(r.cx!=null)r=r.fy
else{r=this.d
if(r.length===0)r=1/0
else{s=A.h(r)
s=new A.I(r,s.h("j(1)").a(new A.eC()),s.h("I<1,j>")).af(0,B.u)
r=s}}return r}}
A.eD.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.eE.prototype={
$1(a){return t.O.a(a).c>=0.55},
$S:10}
A.eC.prototype={
$1(a){return t.O.a(a).b},
$S:61}
A.ir.prototype={
dz(c5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9=this,c0="marchSpeed",c1=b9.a,c2=c5.a,c3=c1.v(c2),c4=A.c([],t.D)
for(s=c1.r,r=s.length,q=c5.f,p=c5.r,o=b9.b,n=o.b,o=o.r.b,m=q.a,l=q.b,k=c5.db,j=c5.b,i=0;i<r;++i){h=s[i]
if(h.b!==j){g=h.as
g=g===B.f||g===B.d||h.f<=0}else g=!0
if(g)continue
if(h.a===k){B.a.m(c4,new A.a6(h,0,1))
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
a4=new A.B(g.a+b/a0*a3,g.b+a/a0*a3)
if(p.X(a4).E(a4)>48)continue}d=n.i(0,c0)
d.toString
a5=A.nm(q,o,e,d,p,g,new A.is(b9),c)
if(a5==null)continue
if(h.as===B.h||a1)g=0.35
else if(a2>0.8)g=1
else g=f<72?0.9:0.55
B.a.m(c4,new A.a6(h,a5,g))}B.a.C(c4,new A.it())
c2=A.h(c3)
r=t.r
a6=A.b1(new A.d(c3,c2.h("e(1)").a(new A.iu(c5)),c2.h("d<1>")),r)
q=A.c([],t.e)
if(a6!=null)q.push(a6)
c2=c2.h("L<1>")
B.a.F(q,new A.L(c3,c2).by(0,c2.h("e(l.E)").a(new A.iv(a6))))
c2=t.S
a7=A.U(q,0,A.X(c5.gZ(),"count",c2),r).al(0)
a8=A.a4(t.N,c2)
a9=B.a.ao(c1.w,new A.iw(c5)).c
for(c1=a7.length,i=0;c2=a7.length,i<c2;a7.length===c1||(0,A.x)(a7),++i){b0=a7[i]
if(b0.as===B.d)b1=0
else{c2=n.i(0,"soldierLimit")
c2.toString
b1=Math.min(a9,B.b.n(c2)-b0.gJ())}a9-=b1
a8.u(0,b0.a,b0.gJ()+b1)}c1=c4.length
b2=null
b3=null
if(c1!==0&&c2!==0)for(c2=c5.fx,r=c5.cx,q=c5.cy,p=r==null,o=b9.d,n=c5.d,b4=0;b4<a7.length;++b4,c1=l){b5=a7[b4]
for(m=b5.a,b6=null,i=0;l=c4.length,i<l;c4.length===c1||(0,A.x)(c4),++i){b7=c4[i]
if(p)l=n
else{l=c2?1:0
l=B.c.A(r-q-l,0,5)}b8=o.aI(b5,b7.a,Math.max(1,l-b4),a8.i(0,m))
if(b6==null||b8.b<b6.b)b6=b8}if(b2==null||b6.b>b2.b)b2=b6
if(b5.e===2)b3=b6}c1=A.h(s)
return new A.au(c5,c3,c4,b2,b3,new A.d(s,c1.h("e(1)").a(new A.ix(c5)),c1.h("d<1>")).L(0,0,new A.iy(),t.i))}}
A.is.prototype={
$2(a,b){var s=this.a,r=s.c,q=r.am(a,b)
if(!isFinite(q)&&r.c.e){r=a.E(b)
s=s.b.b.i(0,"marchSpeed")
s.toString
s=r/s}else s=q
return s},
$S:62}
A.it.prototype={
$2(a,b){var s,r=t.O
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.n.t(a.a.a,b.a.a):B.b.t(r,s)},
$S:63}
A.iu.prototype={
$1(a){return t.r.a(a).a===this.a.dx},
$S:0}
A.iv.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.iw.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:5}
A.ix.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=!1
if(a.b===s.b)if(a.c===s.a){s=a.as
s=!(s===B.f||s===B.d)&&!a.fr}else s=r
else s=r
return s},
$S:0}
A.iy.prototype={
$2(a,b){return A.ap(a)+A.ae(t.r.a(b))},
$S:31}
A.ey.prototype={
a4(){var s=this,r=s.b
if(r>=s.a.db){s.e=!0
return!1}s.b=r+1
return!0},
d5(){var s=this,r=s.c
if(r>=s.a.dx){s.e=!0
return!1}s.c=r+1
return!0},
dA(){var s=this,r=s.d
if(r>=s.a.dy){s.e=!0
return!1}s.d=r+1
return!0}}
A.jj.prototype={
$1(a){A.M(a)
return A.j1(v.G.self).postMessage(a)},
$S:64}
A.jk.prototype={
$1(a){return this.a.du(A.M(A.j1(a).data))},
$S:65};(function aliases(){var s=J.b3.prototype
s.cw=s.q
s=A.b.prototype
s.by=s.dI})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_0,q=hunkHelpers._static_1,p=hunkHelpers.installStaticTearOff
s(J,"mH","lH",66)
r(A,"mU","lM",11)
q(A,"nb","m_",14)
q(A,"nc","m0",14)
q(A,"nd","m1",14)
r(A,"kL","n4",3)
q(A,"nf","mx",16)
s(A,"kV","lg",2)
p(A,"kR",2,null,["$1$2","$2"],["kT",function(a,b){return A.kT(a,b,t.H)}],26,0)
p(A,"nx",2,null,["$1$2","$2"],["kS",function(a,b){return A.kS(a,b,t.H)}],26,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.z,null)
q(A.z,[A.jw,J.d9,A.cn,J.be,A.b,A.bT,A.G,A.ij,A.q,A.cf,A.a0,A.c4,A.bo,A.cp,A.c1,A.cv,A.bj,A.K,A.ay,A.bB,A.bV,A.cz,A.a8,A.iz,A.hr,A.c2,A.cH,A.H,A.hm,A.bl,A.ak,A.cd,A.aw,A.dE,A.iZ,A.iX,A.dA,A.aV,A.at,A.bq,A.a1,A.dB,A.dJ,A.cN,A.bE,A.dH,A.bs,A.v,A.cM,A.d1,A.d3,A.iT,A.bi,A.dC,A.dq,A.cq,A.iF,A.ag,A.ab,A.ac,A.dK,A.ip,A.bF,A.ik,A.eB,A.bd,A.eF,A.bU,A.eI,A.cW,A.ax,A.eL,A.af,A.fA,A.B,A.en,A.o,A.J,A.bc,A.eg,A.hs,A.cl,A.hD,A.F,A.a7,A.S,A.by,A.eq,A.ep,A.du,A.b_,A.er,A.ex,A.ef,A.ez,A.a6,A.au,A.ir,A.ey])
q(J.d9,[J.db,J.c7,J.c9,J.c8,J.ca,J.bz,J.bk])
q(J.c9,[J.b3,J.r,A.bC,A.ci])
q(J.b3,[J.dr,J.bG,J.b2])
r(J.da,A.cn)
r(J.hh,J.r)
q(J.bz,[J.c6,J.dc])
q(A.b,[A.b5,A.m,A.bm,A.d,A.c3,A.bn,A.co,A.cu,A.c5,A.cy,A.aA])
q(A.b5,[A.bf,A.cO])
r(A.cx,A.bf)
r(A.cw,A.cO)
r(A.aJ,A.cw)
q(A.G,[A.cc,A.aS,A.dd,A.dz,A.dv,A.dD,A.cb,A.cY,A.aE,A.ct,A.dy,A.cr,A.d2])
q(A.m,[A.l,A.c0,A.a9,A.Q,A.aN])
q(A.l,[A.E,A.I,A.L,A.dG])
r(A.bZ,A.bm)
r(A.c_,A.bn)
r(A.he,A.co)
r(A.bY,A.c5)
q(A.ay,[A.b6,A.bH])
q(A.b6,[A.aF,A.cF,A.bu])
r(A.az,A.bH)
r(A.bJ,A.bB)
r(A.cs,A.bJ)
r(A.bW,A.cs)
r(A.bX,A.bV)
q(A.a8,[A.d8,A.d_,A.d0,A.dx,A.jf,A.jh,A.iC,A.iB,A.j2,A.iP,A.ho,A.il,A.dU,A.e7,A.e6,A.ec,A.ed,A.e9,A.ea,A.e8,A.dW,A.dX,A.dZ,A.e1,A.e0,A.e2,A.e4,A.eG,A.fg,A.fh,A.fi,A.fv,A.fw,A.fx,A.fy,A.fj,A.fl,A.fo,A.eY,A.eM,A.eU,A.eW,A.eX,A.eN,A.eP,A.f3,A.f6,A.f7,A.f8,A.f9,A.fd,A.ff,A.f0,A.f1,A.f_,A.eR,A.h9,A.ha,A.h8,A.hb,A.h6,A.h5,A.h7,A.h4,A.hd,A.hc,A.fB,A.fD,A.fN,A.fO,A.fQ,A.fS,A.fE,A.fU,A.fG,A.fI,A.fK,A.h0,A.h1,A.h3,A.fV,A.fY,A.fZ,A.h_,A.fW,A.dT,A.dQ,A.dR,A.el,A.em,A.ej,A.ei,A.ek,A.eh,A.ht,A.hy,A.hA,A.hB,A.hz,A.hw,A.hx,A.hv,A.hE,A.hH,A.hJ,A.hF,A.hG,A.j9,A.jm,A.hR,A.hS,A.i3,A.ib,A.hQ,A.hN,A.hO,A.ie,A.ii,A.ih,A.hU,A.hV,A.hX,A.hZ,A.i_,A.i0,A.i4,A.i6,A.i8,A.es,A.eu,A.ew,A.jn,A.jo,A.eD,A.eE,A.eC,A.iu,A.iv,A.iw,A.ix,A.jj,A.jk])
r(A.aL,A.d8)
q(A.d_,[A.hK,A.iD,A.iE,A.iY,A.hf,A.iG,A.iL,A.iK,A.iI,A.iH,A.iO,A.iN,A.iM,A.iW,A.j6,A.im,A.dV,A.ee,A.fp,A.hu,A.ja])
r(A.ck,A.aS)
q(A.dx,[A.dw,A.bx])
q(A.H,[A.aM,A.dF])
q(A.d0,[A.hi,A.jg,A.j3,A.j7,A.iQ,A.hn,A.hq,A.iU,A.eb,A.dY,A.e_,A.e3,A.e5,A.eH,A.eJ,A.eK,A.fs,A.ft,A.fu,A.fz,A.fk,A.fm,A.fn,A.fq,A.fr,A.eZ,A.eV,A.eO,A.eQ,A.f2,A.f4,A.f5,A.fa,A.fb,A.fc,A.fe,A.eS,A.eT,A.fC,A.fM,A.fP,A.fR,A.fT,A.fF,A.fH,A.fJ,A.fL,A.h2,A.fX,A.dS,A.hC,A.hI,A.hT,A.ia,A.hP,A.ic,A.id,A.ig,A.hW,A.hY,A.i1,A.i2,A.i5,A.i7,A.i9,A.et,A.ev,A.jp,A.is,A.it,A.iy])
q(A.ci,[A.df,A.bD])
q(A.bD,[A.cB,A.cD])
r(A.cC,A.cB)
r(A.cg,A.cC)
r(A.cE,A.cD)
r(A.ch,A.cE)
q(A.cg,[A.dg,A.dh])
q(A.ch,[A.di,A.dj,A.dk,A.dl,A.dm,A.cj,A.dn])
r(A.bI,A.dD)
r(A.dI,A.cN)
r(A.cG,A.bE)
r(A.aU,A.cG)
r(A.de,A.cb)
r(A.hj,A.d1)
q(A.d3,[A.hl,A.hk])
r(A.iS,A.iT)
q(A.aE,[A.cm,A.d7])
q(A.dC,[A.bh,A.an,A.aI,A.as])
s(A.cO,A.v)
s(A.cB,A.v)
s(A.cC,A.K)
s(A.cD,A.v)
s(A.cE,A.K)
s(A.bJ,A.cM)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",j:"double",Z:"num",D:"String",e:"bool",ac:"Null",p:"List",z:"Object",aa:"Map",P:"JSObject"},mangledNames:{},types:["e(o)","e(J)","a(o,o)","~()","a(J,J)","e(bc)","e(a7)","a(a,S)","a(a,J)","e(au)","e(a6)","a()","j(Z,j)","e(F)","~(~())","e(af)","@(@)","ac(@)","ac()","~(z?,z?)","a(a)","j(o)","a(a,o)","e(S)","o(a6)","o(o,o)","0^(0^,0^)<Z>","e(j)","j(B)","e(a)","e(B,B)","j(j,o)","ac(z,b4)","a?(a)","a(B,B)","j(j,J)","ac(@,b4)","j(J)","~(a,@)","ac(~())","p<a7>(S)","j(j,a7)","~(@,@)","@(D)","o?(F)","p<+x,y(a,a)>()","j(Z,o)","a(+x,y(a,a))","@(@,D)","p<o>()","~(@)","a(J)","a(a,a)","+breakthrough,lower,teamSize,upper(e,j,a,j)()","e(a?)","e(bd{emergency:e})","e(bd,p<F>,D,J{emergency:e,hero:o?})","e(J{defense!e,emergency:e})","j(j,j,a)","a(au,au)","e()","j(a6)","j(B,B)","a(a6,a6)","~(D)","~(P)","a(@,@)","a(ax,ax)","j(j,D)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.aF&&a.b(c.a)&&b.b(c.b),"2;hero,route":(a,b)=>c=>c instanceof A.cF&&a.b(c.a)&&b.b(c.b),"2;x,y":(a,b)=>c=>c instanceof A.bu&&a.b(c.a)&&b.b(c.b),"4;breakthrough,lower,teamSize,upper":a=>b=>b instanceof A.az&&A.ny(a,b.a)}}
A.ml(v.typeUniverse,JSON.parse('{"b2":"b3","dr":"b3","bG":"b3","nJ":"bC","db":{"e":[],"C":[]},"c7":{"C":[]},"c9":{"P":[]},"b3":{"P":[]},"r":{"p":["1"],"m":["1"],"P":[],"b":["1"]},"da":{"cn":[]},"hh":{"r":["1"],"p":["1"],"m":["1"],"P":[],"b":["1"]},"be":{"y":["1"]},"bz":{"j":[],"Z":[],"av":["Z"]},"c6":{"j":[],"a":[],"Z":[],"av":["Z"],"C":[]},"dc":{"j":[],"Z":[],"av":["Z"],"C":[]},"bk":{"D":[],"av":["D"],"C":[]},"b5":{"b":["2"]},"bT":{"y":["2"]},"bf":{"b5":["1","2"],"b":["2"],"b.E":"2"},"cx":{"bf":["1","2"],"b5":["1","2"],"m":["2"],"b":["2"],"b.E":"2"},"cw":{"v":["2"],"p":["2"],"b5":["1","2"],"m":["2"],"b":["2"]},"aJ":{"cw":["1","2"],"v":["2"],"p":["2"],"b5":["1","2"],"m":["2"],"b":["2"],"v.E":"2","b.E":"2"},"cc":{"G":[]},"m":{"b":["1"]},"l":{"m":["1"],"b":["1"]},"E":{"l":["1"],"m":["1"],"b":["1"],"b.E":"1","l.E":"1"},"q":{"y":["1"]},"bm":{"b":["2"],"b.E":"2"},"bZ":{"bm":["1","2"],"m":["2"],"b":["2"],"b.E":"2"},"cf":{"y":["2"]},"I":{"l":["2"],"m":["2"],"b":["2"],"b.E":"2","l.E":"2"},"d":{"b":["1"],"b.E":"1"},"a0":{"y":["1"]},"c3":{"b":["2"],"b.E":"2"},"c4":{"y":["2"]},"bn":{"b":["1"],"b.E":"1"},"c_":{"bn":["1"],"m":["1"],"b":["1"],"b.E":"1"},"bo":{"y":["1"]},"co":{"b":["1"],"b.E":"1"},"he":{"co":["1"],"m":["1"],"b":["1"],"b.E":"1"},"cp":{"y":["1"]},"c0":{"m":["1"],"b":["1"],"b.E":"1"},"c1":{"y":["1"]},"cu":{"b":["1"],"b.E":"1"},"cv":{"y":["1"]},"c5":{"b":["+(a,1)"],"b.E":"+(a,1)"},"bY":{"c5":["1"],"m":["+(a,1)"],"b":["+(a,1)"],"b.E":"+(a,1)"},"bj":{"y":["+(a,1)"]},"L":{"l":["1"],"m":["1"],"b":["1"],"b.E":"1","l.E":"1"},"aF":{"b6":[],"ay":[]},"cF":{"b6":[],"ay":[]},"bu":{"b6":[],"ay":[]},"az":{"bH":[],"ay":[]},"bW":{"cs":["1","2"],"bJ":["1","2"],"bB":["1","2"],"cM":["1","2"],"aa":["1","2"]},"bV":{"aa":["1","2"]},"bX":{"bV":["1","2"],"aa":["1","2"]},"cy":{"b":["1"],"b.E":"1"},"cz":{"y":["1"]},"d8":{"a8":[],"aK":[]},"aL":{"a8":[],"aK":[]},"ck":{"aS":[],"G":[]},"dd":{"G":[]},"dz":{"G":[]},"cH":{"b4":[]},"a8":{"aK":[]},"d_":{"a8":[],"aK":[]},"d0":{"a8":[],"aK":[]},"dx":{"a8":[],"aK":[]},"dw":{"a8":[],"aK":[]},"bx":{"a8":[],"aK":[]},"dv":{"G":[]},"aM":{"H":["1","2"],"kd":["1","2"],"aa":["1","2"],"H.K":"1","H.V":"2"},"a9":{"m":["1"],"b":["1"],"b.E":"1"},"bl":{"y":["1"]},"Q":{"m":["1"],"b":["1"],"b.E":"1"},"ak":{"y":["1"]},"aN":{"m":["ab<1,2>"],"b":["ab<1,2>"],"b.E":"ab<1,2>"},"cd":{"y":["ab<1,2>"]},"b6":{"ay":[]},"bH":{"ay":[]},"bC":{"P":[],"C":[]},"ci":{"P":[]},"df":{"P":[],"C":[]},"bD":{"aj":["1"],"P":[]},"cg":{"v":["j"],"p":["j"],"aj":["j"],"m":["j"],"P":[],"b":["j"],"K":["j"]},"ch":{"v":["a"],"p":["a"],"aj":["a"],"m":["a"],"P":[],"b":["a"],"K":["a"]},"dg":{"v":["j"],"p":["j"],"aj":["j"],"m":["j"],"P":[],"b":["j"],"K":["j"],"C":[],"v.E":"j","K.E":"j"},"dh":{"v":["j"],"p":["j"],"aj":["j"],"m":["j"],"P":[],"b":["j"],"K":["j"],"C":[],"v.E":"j","K.E":"j"},"di":{"v":["a"],"p":["a"],"aj":["a"],"m":["a"],"P":[],"b":["a"],"K":["a"],"C":[],"v.E":"a","K.E":"a"},"dj":{"v":["a"],"p":["a"],"aj":["a"],"m":["a"],"P":[],"b":["a"],"K":["a"],"C":[],"v.E":"a","K.E":"a"},"dk":{"v":["a"],"p":["a"],"aj":["a"],"m":["a"],"P":[],"b":["a"],"K":["a"],"C":[],"v.E":"a","K.E":"a"},"dl":{"v":["a"],"p":["a"],"aj":["a"],"m":["a"],"P":[],"b":["a"],"K":["a"],"C":[],"v.E":"a","K.E":"a"},"dm":{"v":["a"],"p":["a"],"aj":["a"],"m":["a"],"P":[],"b":["a"],"K":["a"],"C":[],"v.E":"a","K.E":"a"},"cj":{"v":["a"],"p":["a"],"aj":["a"],"m":["a"],"P":[],"b":["a"],"K":["a"],"C":[],"v.E":"a","K.E":"a"},"dn":{"jD":[],"v":["a"],"p":["a"],"aj":["a"],"m":["a"],"P":[],"b":["a"],"K":["a"],"C":[],"v.E":"a","K.E":"a"},"dD":{"G":[]},"bI":{"aS":[],"G":[]},"aV":{"y":["1"]},"aA":{"b":["1"],"b.E":"1"},"at":{"G":[]},"a1":{"b0":["1"]},"cN":{"kn":[]},"dI":{"cN":[],"kn":[]},"aU":{"bE":["1"],"jB":["1"],"m":["1"],"b":["1"]},"bs":{"y":["1"]},"H":{"aa":["1","2"]},"bB":{"aa":["1","2"]},"cs":{"bJ":["1","2"],"bB":["1","2"],"cM":["1","2"],"aa":["1","2"]},"bE":{"jB":["1"],"m":["1"],"b":["1"]},"cG":{"bE":["1"],"jB":["1"],"m":["1"],"b":["1"]},"dF":{"H":["D","@"],"aa":["D","@"],"H.K":"D","H.V":"@"},"dG":{"l":["D"],"m":["D"],"b":["D"],"b.E":"D","l.E":"D"},"cb":{"G":[]},"de":{"G":[]},"j":{"Z":[],"av":["Z"]},"bi":{"av":["bi"]},"a":{"Z":[],"av":["Z"]},"p":{"m":["1"],"b":["1"]},"Z":{"av":["Z"]},"D":{"av":["D"]},"dC":{"d4":[]},"cY":{"G":[]},"aS":{"G":[]},"aE":{"G":[]},"cm":{"G":[]},"d7":{"G":[]},"ct":{"G":[]},"dy":{"G":[]},"cr":{"G":[]},"d2":{"G":[]},"dq":{"G":[]},"cq":{"G":[]},"dK":{"b4":[]},"bF":{"lT":[]},"bh":{"d4":[]},"an":{"d4":[]},"aI":{"d4":[]},"as":{"d4":[]},"lD":{"p":["a"],"m":["a"],"b":["a"]},"jD":{"p":["a"],"m":["a"],"b":["a"]},"lY":{"p":["a"],"m":["a"],"b":["a"]},"lB":{"p":["a"],"m":["a"],"b":["a"]},"lW":{"p":["a"],"m":["a"],"b":["a"]},"lC":{"p":["a"],"m":["a"],"b":["a"]},"lX":{"p":["a"],"m":["a"],"b":["a"]},"lv":{"p":["j"],"m":["j"],"b":["j"]},"lw":{"p":["j"],"m":["j"],"b":["j"]}}'))
A.mk(v.typeUniverse,JSON.parse('{"cO":2,"bD":1,"cG":1,"d1":2,"d3":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.bP
return{T:s("F"),q:s("J"),I:s("S"),t:s("bc"),a9:s("aI"),r:s("o"),W:s("B"),bJ:s("b_"),J:s("a7"),u:s("at"),_:s("au"),cM:s("bU"),e8:s("av<@>"),x:s("af"),fu:s("bi"),Q:s("m<@>"),U:s("G"),bo:s("c3<S,a7>"),h:s("aK"),O:s("a6"),B:s("aL<j>"),E:s("b<J>"),ef:s("b<o>"),er:s("b<a7>(S)"),R:s("b<@>"),w:s("r<F>"),Y:s("r<J>"),Z:s("r<S>"),eu:s("r<bc>"),e:s("r<o>"),a:s("r<B>"),m:s("r<a7>"),bL:s("r<au>"),D:s("r<a6>"),a5:s("r<p<B>>"),b:s("r<p<j>>"),d:s("r<aa<D,z?>>"),L:s("r<z>"),dZ:s("r<+(J,o)>"),h2:s("r<+hero,route(o,b_)>"),c7:s("r<+x,y(a,a)>"),s:s("r<D>"),bQ:s("r<ax>"),n:s("r<j>"),V:s("r<@>"),k:s("r<a>"),v:s("c7"),p:s("P"),cj:s("b2"),aU:s("aj<@>"),f3:s("p<F>"),bd:s("p<o>"),gE:s("p<+x,y(a,a)>"),j:s("p<@>"),d1:s("aa<D,@>"),f:s("aa<@,@>"),G:s("aa<D,z?>"),P:s("ac"),K:s("z"),gT:s("nK"),bY:s("+()"),bU:s("+hero,route(o,b_)"),bP:s("+x,y(a,a)"),l:s("b4"),N:s("D"),aQ:s("E<ax>"),dm:s("C"),eK:s("aS"),ak:s("bG"),eO:s("d<o>"),eq:s("d<j>"),gn:s("cu<o>"),c:s("a1<@>"),dp:s("ax"),dT:s("aA<af>"),gL:s("aA<a>"),y:s("e"),aO:s("e(o)"),al:s("e(z)"),db:s("e(j)"),i:s("j"),z:s("@"),fO:s("@()"),A:s("@(z)"),C:s("@(z,b4)"),S:s("a"),eH:s("b0<ac>?"),an:s("P?"),bM:s("p<@>?"),X:s("z?"),dk:s("D?"),F:s("bq<@,@>?"),g:s("dH?"),fQ:s("e?"),cD:s("j?"),h6:s("a?"),cg:s("Z?"),H:s("Z"),o:s("~"),M:s("~()"),cA:s("~(D,@)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.ag=J.d9.prototype
B.a=J.r.prototype
B.c=J.c6.prototype
B.b=J.bz.prototype
B.n=J.bk.prototype
B.ah=J.b2.prototype
B.ai=J.c9.prototype
B.N=J.dr.prototype
B.z=J.bG.prototype
B.l=new A.as(0,"upgrade")
B.A=new A.as(1,"dismiss")
B.B=new A.as(2,"recruit")
B.i=new A.as(3,"soldiers")
B.C=new A.as(4,"dispatch")
B.O=new A.as(5,"move")
B.P=new A.as(6,"camp")
B.Q=new A.as(7,"retreat")
B.f=new A.an(0,"garrison")
B.h=new A.an(2,"camped")
B.w=new A.an(3,"queue")
B.x=new A.an(4,"attacking")
B.d=new A.an(5,"defending")
B.q=new A.an(7,"retreating")
B.D=new A.aI(0,"full")
B.E=new A.aI(1,"resources")
B.r=new A.aI(2,"defense")
B.o=new A.aI(3,"attack")
B.M=s([],t.a)
B.t=new A.b_(B.M,1/0,!1)
B.T=new A.b_(B.M,1/0,!1)
B.U=new A.cW(4,24,6,1.5,10,10,0.65,5,0.5,0.25,45,15,0.8,45,25,90,-0.15,10,3,1,96,160,6000,8,24,4,6,8,2,0,1,0.3,20,900,64,0.25,8,0.12,0.05,2500,2,20)
B.F=new A.aL(A.nx(),t.B)
B.u=new A.aL(A.kR(),t.B)
B.V=new A.aL(A.kR(),A.bP("aL<a>"))
B.G=new A.bi()
B.H=new A.c1(A.bP("c1<0&>"))
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

B.j=new A.hj()
B.a1=new A.dq()
B.m=new A.ij()
B.k=new A.dI()
B.a2=new A.dK()
B.e=new A.bh(0,"favorable")
B.a3=new A.bh(1,"close")
B.v=new A.bh(2,"unfavorable")
B.y=new A.bh(3,"unknown")
B.az=s(["\u9759\u6001\u8bc4\u4f30\u914d\u989d\u8017\u5c3d"],t.s)
B.a4=new A.bU(B.y,-1,1)
B.a5=new A.ag("AI \u521d\u59cb\u5316\u7f3a\u5c11 gameConfig")
B.a6=new A.ag("game_config.json5 \u7684\u57ce\u6c60\u6570\u7ec4\u957f\u5ea6\u4e0d\u6b63\u786e")
B.a7=new A.ag("\u6700\u9ad8\u57ce\u6c60\u7b49\u7ea7\u5fc5\u987b\u4e0e\u57ce\u9632\u52a0\u6210\u6570\u7ec4\u957f\u5ea6\u4e00\u81f4")
B.a8=new A.ag("AI \u534f\u8bae\u7248\u672c\u4e0d\u5339\u914d")
B.a9=new A.ag("game_config.json5 \u5305\u542b\u975e\u6cd5\u7684\u65f6\u95f4\u6216\u57ce\u6c60\u7b49\u7ea7")
B.aa=new A.ag("AI \u6784\u5efa\u7248\u672c\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u751f\u6210 Worker")
B.ab=new A.ag("\u6b20\u6536\u91d1\u5e01\u8303\u56f4\u5fc5\u987b\u4e3a\u975e\u8d1f\u6574\u6570\u4e14\u4e0a\u9650\u4e0d\u5c0f\u4e8e\u4e0b\u9650")
B.ac=new A.ag("\u672a\u77e5 AI \u5de5\u4f5c\u547d\u4ee4")
B.ad=new A.ag("AI \u5730\u56fe\u5c3a\u5bf8\u65e0\u6548")
B.ae=new A.ag("\u56fd\u5bb6\u89c4\u5212\u9759\u6001\u7248\u672c\u4e0d\u5339\u914d")
B.af=new A.ag("\u56fd\u5bb6\u89c2\u5bdf\u8d85\u51fa\u534f\u8bae\u5bb9\u91cf")
B.aj=new A.hk(null)
B.ak=new A.hl(null)
B.R=new A.an(1,"marching")
B.S=new A.an(6,"field")
B.K=s([B.f,B.R,B.h,B.w,B.x,B.d,B.S,B.q],A.bP("r<an>"))
B.al=s([B.D,B.E,B.r,B.o],A.bP("r<aI>"))
B.L=s([],t.Z)
B.p=s([],t.m)
B.am=s([],t.k)
B.an=A.aC("nE")
B.ao=A.aC("nF")
B.ap=A.aC("lv")
B.aq=A.aC("lw")
B.ar=A.aC("lB")
B.as=A.aC("lC")
B.at=A.aC("lD")
B.au=A.aC("z")
B.av=A.aC("lW")
B.aw=A.aC("lX")
B.ax=A.aC("lY")
B.ay=A.aC("jD")})();(function staticFields(){$.iR=null
$.al=A.c([],t.L)
$.kf=null
$.hL=0
$.hM=A.mU()
$.k6=null
$.k5=null
$.kO=null
$.kJ=null
$.kX=null
$.jd=null
$.ji=null
$.jQ=null
$.iV=A.c([],A.bP("r<p<z>?>"))
$.bM=null
$.cR=null
$.cS=null
$.jJ=!1
$.R=B.k})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"nH","l_",()=>A.je("_$dart_dartClosure"))
s($,"nG","jT",()=>A.je("_$dart_dartClosure_dartJSInterop"))
s($,"nZ","la",()=>A.c([new J.da()],A.bP("r<cn>")))
s($,"nN","l0",()=>A.aT(A.iA({
toString:function(){return"$receiver$"}})))
s($,"nO","l1",()=>A.aT(A.iA({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"nP","l2",()=>A.aT(A.iA(null)))
s($,"nQ","l3",()=>A.aT(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"nT","l6",()=>A.aT(A.iA(void 0)))
s($,"nU","l7",()=>A.aT(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"nS","l5",()=>A.aT(A.kl(null)))
s($,"nR","l4",()=>A.aT(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"nW","l9",()=>A.aT(A.kl(void 0)))
s($,"nV","l8",()=>A.aT(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"nX","jV",()=>A.lZ())
s($,"nY","dN",()=>A.kU(B.au))
s($,"nL","jU",()=>{A.lO()
return $.hL})
s($,"nI","jq",()=>{var q=t.k
return A.T(["initialYear",1,"initialMonth",1,"secondsPerMonth",60,"initialGold",50,"countryAiEnabled",!0,"countryAiInitialDelay",0,"countryAiInterval",5,"countryAiMinimumSoldiers",4,"heroOfferValidMonths",2,"aiDepartureInterval",2,"countryAiEmergencyGold",5,"countryAiBudgetSafetySeconds",30,"countryAiBattleBudgetSeconds",30,"countryAiTargetTravelScale",30,"countryAiTargetDistancePower",2,"countryAiStrengthScale",80,"countryAiWeaknessPower",2,"countryHatredPerAttack",20,"countryHatredMaximum",100,"countryHatredWeightPerPoint",0.02,"normalHarvestWeight",2,"poorHarvestWeight",1,"abundantHarvestWeight",1,"cityBaseIncome",10,"cityIncomePerLevel",0,"countryMonthlyIncome",10,"foreignCityYieldFactor",1,"retreatBaseSuccessChance",0.9,"retreatConditionPenalty",0.1,"retreatExitSeconds",1.2,"retreatResultSeconds",0.6,"aiRetreatMinimumClashes",2,"aiRetreatSurvivalRatio",0.6,"aiRetreatHealthRatio",0.25,"aiThreatDistance",320,"aiMaximumRaidHeroes",4,"aiTargetShortlist",3,"aiTravelCacheSize",256,"aiRaidRetrySeconds",15,"harvestAdjustmentMin",5,"harvestAdjustmentMax",10,"poorHarvestAdjustmentMin",10,"poorHarvestAdjustmentMax",20,"chargeHeroSalary",!0,"freeGarrisonHeroes",2,"garrisonUpkeepFactor",0,"maxCityLevel",5,"firstYearCityUpgradeLimit",3,"cityUpgradeLevelsPerYear",1,"cityUpgradeCosts",A.c([30,40,50,60],q),"cityReserveCapacityPerLevel",4,"initialSoldiersPerHero",4,"soldierRecruitCost",1,"soldierRecruitBatchSize",10,"heroSoldierLimit",4,"initialHeroSoldiers",0,"recruitedHeroSoldiers",0,"heroDrawCost",5,"recycleDefeatedHeroes",!0,"cityDefenseAttackBonuses",A.c([1,3,5,8,10],q),"cityDefenseMoraleBonuses",A.c([5,10,15,20,25],q),"battleRecoilDifferenceScale",0.25,"cityDefenseRecoilScale",0,"battleMoralePowerScale",6,"battleUseMorale",!0,"battleMoraleDrainPerSecond",12,"battleMoraleDrainRandomRange",4,"battleWallDamageScale",0.5,"fieldEncounterDistance",16,"mountainHeroAttackFactor",1,"riverHeroAttackFactor",1,"grassHeroAttackFactor",1,"fieldBattleHistoryLimit",16,"baseMarchSpeed",22,"heroWalkFrameSeconds",0.2,"grassSpeedFactor",0.75,"mountainSpeedFactor",0.2,"waterSpeedFactor",0.4,"battleFormationFrames",163,"cityDamageChancePerVictory",1,"nationalAi",B.U.K()],t.N,t.X)})
r($,"ly","nD",()=>A.d6($.jq()))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.bC,SharedArrayBuffer:A.bC,ArrayBufferView:A.ci,DataView:A.df,Float32Array:A.dg,Float64Array:A.dh,Int16Array:A.di,Int32Array:A.dj,Int8Array:A.dk,Uint16Array:A.dl,Uint32Array:A.dm,Uint8ClampedArray:A.cj,CanvasPixelArray:A.cj,Uint8Array:A.dn})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bD.$nativeSuperclassTag="ArrayBufferView"
A.cB.$nativeSuperclassTag="ArrayBufferView"
A.cC.$nativeSuperclassTag="ArrayBufferView"
A.cg.$nativeSuperclassTag="ArrayBufferView"
A.cD.$nativeSuperclassTag="ArrayBufferView"
A.cE.$nativeSuperclassTag="ArrayBufferView"
A.ch.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.nv
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()