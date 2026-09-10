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
if(a[b]!==s){A.nd(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.c(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.jv(b)
return new s(c,this)}:function(){if(s===null)s=A.jv(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.jv(a).prototype
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
jw(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.jz==null){A.n2()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.j(A.jZ("Return interceptor for "+A.v(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.iy
if(o==null)o=$.iy=A.iV(n)
p=q[o]}if(p!=null)return p
p=A.n7(a)
if(p!=null)return p
if(typeof a=="function")return B.aa
s=Object.getPrototypeOf(a)
if(s==null)return B.N
if(s===Object.prototype)return B.N
if(typeof q=="function"){o=$.iy
if(o==null)o=$.iy=A.iV(n)
Object.defineProperty(q,o,{value:B.z,enumerable:false,writable:true,configurable:true})
return B.z}return B.z},
lk(a,b){if(a<0||a>4294967295)throw A.j(A.b9(a,0,4294967295,"length",null))
return J.ll(new Array(a),b)},
jO(a,b){if(a<0)throw A.j(A.cE("Length must be a non-negative integer: "+a,null))
return A.c(new Array(a),b.h("t<0>"))},
ll(a,b){var s=A.c(a,b.h("t<0>"))
s.$flags=1
return s},
bj(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bT.prototype
return J.cU.prototype}if(typeof a=="string")return J.b5.prototype
if(a==null)return J.bU.prototype
if(typeof a=="boolean")return J.cT.prototype
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aR.prototype
if(typeof a=="symbol")return J.bX.prototype
if(typeof a=="bigint")return J.bV.prototype
return a}if(a instanceof A.y)return a
return J.jw(a)},
cA(a){if(typeof a=="string")return J.b5.prototype
if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aR.prototype
if(typeof a=="symbol")return J.bX.prototype
if(typeof a=="bigint")return J.bV.prototype
return a}if(a instanceof A.y)return a
return J.jw(a)},
aD(a){if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aR.prototype
if(typeof a=="symbol")return J.bX.prototype
if(typeof a=="bigint")return J.bV.prototype
return a}if(a instanceof A.y)return a
return J.jw(a)},
mY(a){if(typeof a=="number")return J.bq.prototype
if(typeof a=="string")return J.b5.prototype
if(a==null)return a
if(!(a instanceof A.y))return J.bw.prototype
return a},
an(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bj(a).ac(a,b)},
b_(a,b){if(typeof b==="number")if(Array.isArray(a)||A.n6(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.aD(a).i(a,b)},
kR(a,b){return J.aD(a).l(a,b)},
kS(a,b){return J.aD(a).I(a,b)},
j6(a,b){return J.mY(a).t(a,b)},
j7(a,b){return J.aD(a).U(a,b)},
kT(a,b,c,d){return J.aD(a).G(a,b,c,d)},
dv(a){return J.aD(a).gD(a)},
af(a){return J.bj(a).gR(a)},
j8(a){return J.cA(a).ga3(a)},
kU(a){return J.cA(a).gap(a)},
E(a){return J.aD(a).gC(a)},
kV(a){return J.aD(a).gaD(a)},
bm(a){return J.cA(a).gm(a)},
kW(a){return J.bj(a).gS(a)},
j9(a,b){return J.aD(a).bo(a,b)},
bn(a){return J.bj(a).q(a)},
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
h_:function h_(a){this.$ti=a},
b1:function b1(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bq:function bq(){},
bT:function bT(){},
cU:function cU(){},
b5:function b5(){}},A={jd:function jd(){},
lm(a){return new A.bZ("Field '"+a+"' has not been initialized.")},
aJ(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
i5(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
W(a,b,c){return a},
jA(a){var s,r
for(s=$.aj.length,r=0;r<s;++r)if(a===$.aj[r])return!0
return!1},
Z(a,b,c,d){A.cb(b,"start")
if(c!=null){A.cb(c,"end")
if(b>c)A.cB(A.b9(b,0,c,"start",null))}return new A.x(a,b,c,d.h("x<0>"))},
lp(a,b,c,d){if(t.U.b(a))return new A.bN(a,b,c.h("@<0>").E(d).h("bN<1,2>"))
return new A.b8(a,b,c.h("@<0>").E(d).h("b8<1,2>"))},
lz(a,b,c){A.cb(b,"takeCount")
if(t.U.b(a))return new A.bO(a,b,c.h("bO<0>"))
return new A.ba(a,b,c.h("ba<0>"))},
aB(){return new A.ce("No element")},
bZ:function bZ(a){this.a=a},
i3:function i3(){},
q:function q(){},
k:function k(){},
x:function x(a,b,c,d){var _=this
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
b8:function b8(a,b,c){this.a=a
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
P:function P(a,b,c){this.a=a
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
ba:function ba(a,b,c){this.a=a
this.b=b
this.$ti=c},
bO:function bO(a,b,c){this.a=a
this.b=b
this.$ti=c},
bb:function bb(a,b,c){this.a=a
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
ew(a,b,c){var s,r,q,p,o,n,m,l=A.l(a),k=A.c2(new A.a7(a,l.h("a7<1>")),!0,b),j=k.length,i=0
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
return m}return new A.bK(A.ar(a,b,c),b.h("@<0>").E(c).h("bK<1,2>"))},
kE(a){var s=A.kD(a)
if(s!=null)return s
return"minified:"+a},
n6(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
v(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.bn(a)
return s},
d8(a){var s,r=$.jT
if(r==null)r=$.jT=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
lu(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.n(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
d9(a){var s,r,q,p
if(a instanceof A.y)return A.ab(A.ay(a),null)
s=J.bj(a)
if(s===B.a9||s===B.ab||t.ak.b(a)){r=B.I(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.ab(A.ay(a),null)},
jU(a){var s,r,q
if(a==null||typeof a=="number"||A.jq(a))return J.bn(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a5)return a.q(0)
if(a instanceof A.aC)return a.bM(!0)
s=$.kQ()
for(r=0;r<1;++r){q=s[r].dv(a)
if(q!=null)return q}return"Instance of '"+A.d9(a)+"'"},
lr(){return Date.now()},
lt(){var s,r
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
a0(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.bH(s,10)|55296)>>>0,s&1023|56320)}throw A.j(A.b9(a,0,1114111,null,null))},
ls(a){var s=a.$thrownJsError
if(s==null)return null
return A.bG(s)},
jy(a){throw A.j(A.kn(a))},
n(a,b){if(a==null)J.bm(a)
throw A.j(A.ks(a,b))},
ks(a,b){var s,r="index"
if(!A.kg(b))return new A.aA(!0,b,r,null)
s=J.bm(a)
if(b<0||b>=s)return A.jb(b,s,a,r)
return new A.ca(null,null,!0,b,r,"Value not in range")},
kn(a){return new A.aA(!0,a,null,null)},
kq(a){return a},
j(a){return A.U(a,new Error())},
U(a,b){var s
if(a==null)a=new A.aK()
b.dartException=a
s=A.ne
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
ne(){return J.bn(this.dartException)},
cB(a,b){throw A.U(a,b==null?new Error():b)},
cC(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.cB(A.md(a,b,c),s)},
md(a,b,c){var s,r,q,p,o,n,m,l,k
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
a=A.nc(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.c([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.ie(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
ig(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
jY(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
je(a,b){var s=b==null,r=s?null:b.method
return new A.cV(a,r,s?null:b.receiver)},
aP(a){var s
if(a==null)return new A.h9(a)
if(a instanceof A.bQ){s=a.a
return A.aZ(a,s==null?A.cv(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.aZ(a,a.dartException)
return A.mN(a)},
aZ(a,b){if(t.V.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
mN(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bH(r,16)&8191)===10)switch(q){case 438:return A.aZ(a,A.je(A.v(s)+" (Error "+q+")",null))
case 445:case 5007:A.v(s)
return A.aZ(a,new A.c8())}}if(a instanceof TypeError){p=$.kG()
o=$.kH()
n=$.kI()
m=$.kJ()
l=$.kM()
k=$.kN()
j=$.kL()
$.kK()
i=$.kP()
h=$.kO()
g=p.a9(s)
if(g!=null)return A.aZ(a,A.je(A.H(s),g))
else{g=o.a9(s)
if(g!=null){g.method="call"
return A.aZ(a,A.je(A.H(s),g))}else if(n.a9(s)!=null||m.a9(s)!=null||l.a9(s)!=null||k.a9(s)!=null||j.a9(s)!=null||m.a9(s)!=null||i.a9(s)!=null||h.a9(s)!=null){A.H(s)
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
kz(a){if(a==null)return J.af(a)
if(typeof a=="object")return A.d8(a)
return J.af(a)},
mW(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.v(0,a[s],a[r])}return b},
mX(a,b){var s,r=a.length
for(s=0;s<r;++s)b.l(0,a[s])
return b},
mm(a,b,c,d,e,f){t.k.a(a)
switch(A.f(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.j(new A.il("Unsupported number of arguments for wrapped closure"))},
ds(a,b){var s=a.$identity
if(!!s)return s
s=A.mS(a,b)
a.$identity=s
return s},
mS(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.mm)},
l9(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.db().constructor.prototype):Object.create(new A.bp(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.jM(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.l5(a1,h,g)
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
l5(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.j("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.l3)}throw A.j("Error in functionType of tearoff")},
l6(a,b,c,d){var s=A.jL
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
jM(a,b,c,d){if(c)return A.l8(a,b,d)
return A.l6(b.length,d,a,b)},
l7(a,b,c,d){var s=A.jL,r=A.l4
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
l8(a,b,c){var s,r
if($.jJ==null)$.jJ=A.jI("interceptor")
if($.jK==null)$.jK=A.jI("receiver")
s=b.length
r=A.l7(s,c,a,b)
return r},
jv(a){return A.l9(a)},
l3(a,b){return A.cs(v.typeUniverse,A.ay(a.a),b)},
jL(a){return a.a},
l4(a){return a.b},
jI(a){var s,r,q,p=new A.bp("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.j(A.cE("Field name "+a+" not found.",null))},
iV(a){return v.getIsolateTag(a)},
n7(a){var s,r,q,p,o,n=A.H($.kt.$1(a)),m=$.iU[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.j_[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bC($.km.$2(a,n))
if(q!=null){m=$.iU[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.j_[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.j2(s)
$.iU[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.j_[n]=s
return s}if(p==="-"){o=A.j2(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.kB(a,s)
if(p==="*")throw A.j(A.jZ(n))
if(v.leafTags[n]===true){o=A.j2(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.kB(a,s)},
kB(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.jB(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
j2(a){return J.jB(a,!1,null,!!a.$iag)},
n9(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.j2(s)
else return J.jB(s,c,null,null)},
n2(){if(!0===$.jz)return
$.jz=!0
A.n3()},
n3(){var s,r,q,p,o,n,m,l
$.iU=Object.create(null)
$.j_=Object.create(null)
A.n1()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.kC.$1(o)
if(n!=null){m=A.n9(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
n1(){var s,r,q,p,o,n,m=B.U()
m=A.bF(B.V,A.bF(B.W,A.bF(B.J,A.bF(B.J,A.bF(B.X,A.bF(B.Y,A.bF(B.Z(B.I),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.kt=new A.iX(p)
$.km=new A.iY(o)
$.kC=new A.iZ(n)},
bF(a,b){return a(b)||b},
lS(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.n(b,s)
if(!J.an(r,b[s]))return!1}return!0},
mU(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
nc(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
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
bf:function bf(a,b){this.a=a
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
hC:function hC(a){this.a=a},
cc:function cc(){},
ie:function ie(a,b,c,d,e,f){var _=this
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
h9:function h9(a){this.a=a},
bQ:function bQ(a,b){this.a=a
this.b=b},
co:function co(a){this.a=a
this.b=null},
a5:function a5(){},
cH:function cH(){},
cI:function cI(){},
dc:function dc(){},
db:function db(){},
bp:function bp(a,b){this.a=a
this.b=b},
da:function da(a){this.a=a},
aI:function aI(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
h0:function h0(a){this.a=a},
h4:function h4(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
a7:function a7(a,b){this.a=a
this.$ti=b},
b7:function b7(a,b,c,d){var _=this
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
b6:function b6(a,b){this.a=a
this.$ti=b},
c_:function c_(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
iX:function iX(a){this.a=a},
iY:function iY(a){this.a=a},
iZ:function iZ(a){this.a=a},
aC:function aC(){},
by:function by(){},
bi:function bi(){},
me(a){return a},
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
ji(a,b){var s=b.c
return s==null?b.c=A.cq(a,"aQ",[b.x]):s},
jV(a){var s=a.w
if(s===6||s===7)return A.jV(a.x)
return s===11||s===12},
lw(a){return a.as},
kA(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
cz(a){return A.iI(v.typeUniverse,a,!1)},
n5(a,b){var s,r,q,p,o
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
return A.jn(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bE(a1,j,a3,a4)
if(i===j)return a2
return A.k8(a1,k,i)
case 11:h=a2.x
g=A.aY(a1,h,a3,a4)
f=a2.y
e=A.mK(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.k5(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bE(a1,d,a3,a4)
o=a2.x
n=A.aY(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jo(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.j(A.cG("Attempted to substitute unexpected RTI kind "+a0))}},
bE(a,b,c,d){var s,r,q,p,o=b.length,n=A.iJ(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.aY(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
mL(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.iJ(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.aY(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
mK(a,b,c,d){var s,r=b.a,q=A.bE(a,r,c,d),p=b.b,o=A.bE(a,p,c,d),n=b.c,m=A.mL(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dj()
s.a=q
s.b=o
s.c=m
return s},
c(a,b){a[v.arrayRti]=b
return a},
iT(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.n_(s)
return a.$S()}return null},
n4(a,b){var s
if(A.jV(b))if(a instanceof A.a5){s=A.iT(a)
if(s!=null)return s}return A.ay(a)},
ay(a){if(a instanceof A.y)return A.l(a)
if(Array.isArray(a))return A.h(a)
return A.jp(J.bj(a))},
h(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
l(a){var s=a.$ti
return s!=null?s:A.jp(a)},
jp(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.ml(a,s)},
ml(a,b){var s=a instanceof A.a5?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.m1(v.typeUniverse,s.name)
b.$ccache=r
return r},
n_(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.iI(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
mZ(a){return A.aO(A.l(a))},
jx(a){var s=A.iT(a)
return A.aO(s==null?A.ay(a):s)},
jt(a){var s
if(a instanceof A.aC)return A.mV(a.$r,a.b7())
s=a instanceof A.a5?A.iT(a):null
if(s!=null)return s
if(t.dm.b(a))return J.kW(a).a
if(Array.isArray(a))return A.h(a)
return A.ay(a)},
aO(a){var s=a.r
return s==null?a.r=new A.iH(a):s},
mV(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bY
if(0>=p)return A.n(q,0)
s=A.cs(v.typeUniverse,A.jt(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.n(q,r)
s=A.ka(v.typeUniverse,s,A.jt(q[r]))}return A.cs(v.typeUniverse,s,a)},
az(a){return A.aO(A.iI(v.typeUniverse,a,!1))},
mk(a){var s=this
s.b=A.mI(s)
return s.b(a)},
mI(a){var s,r,q,p,o
if(a===t.K)return A.ms
if(A.bk(a))return A.mw
s=a.w
if(s===6)return A.mi
if(s===1)return A.ki
if(s===7)return A.mn
r=A.mH(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bk)){a.f="$i"+q
if(q==="m")return A.mq
if(a===t.A)return A.mp
return A.mv}}else if(s===10){p=A.mU(a.x,a.y)
o=p==null?A.ki:p
return o==null?A.cv(o):o}return A.mg},
mH(a){if(a.w===8){if(a===t.S)return A.kg
if(a===t.i||a===t.H)return A.mr
if(a===t.N)return A.mu
if(a===t.y)return A.jq}return null},
mj(a){var s=this,r=A.mf
if(A.bk(s))r=A.m5
else if(s===t.K)r=A.cv
else if(A.bH(s)){r=A.mh
if(s===t.h6)r=A.a3
else if(s===t.dk)r=A.bC
else if(s===t.fQ)r=A.iK
else if(s===t.cg)r=A.S
else if(s===t.cD)r=A.m3
else if(s===t.an)r=A.m4}else if(s===t.S)r=A.f
else if(s===t.N)r=A.H
else if(s===t.y)r=A.aw
else if(s===t.H)r=A.w
else if(s===t.i)r=A.ax
else if(s===t.A)r=A.iL
s.a=r
return s.a(a)},
mg(a){var s=this
if(a==null)return A.bH(s)
return A.kw(v.typeUniverse,A.n4(a,s),s)},
mi(a){if(a==null)return!0
return this.x.b(a)},
mv(a){var s,r=this
if(a==null)return A.bH(r)
s=r.f
if(a instanceof A.y)return!!a[s]
return!!J.bj(a)[s]},
mq(a){var s,r=this
if(a==null)return A.bH(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.y)return!!a[s]
return!!J.bj(a)[s]},
mp(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.y)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
kh(a){if(typeof a=="object"){if(a instanceof A.y)return t.A.b(a)
return!0}if(typeof a=="function")return!0
return!1},
mf(a){var s=this
if(a==null){if(A.bH(s))return a}else if(s.b(a))return a
throw A.U(A.kd(a,s),new Error())},
mh(a){var s=this
if(a==null||s.b(a))return a
throw A.U(A.kd(a,s),new Error())},
kd(a,b){return new A.bA("TypeError: "+A.k0(a,A.ab(b,null)))},
kr(a,b,c,d){if(A.kw(v.typeUniverse,a,b))return a
throw A.U(A.lU("The type argument '"+A.ab(a,null)+"' is not a subtype of the type variable bound '"+A.ab(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
k0(a,b){return A.cO(a)+": type '"+A.ab(A.jt(a),null)+"' is not a subtype of type '"+b+"'"},
lU(a){return new A.bA("TypeError: "+a)},
am(a,b){return new A.bA("TypeError: "+A.k0(a,b))},
mn(a){var s=this
return s.x.b(a)||A.ji(v.typeUniverse,s).b(a)},
ms(a){return a!=null},
cv(a){if(a!=null)return a
throw A.U(A.am(a,"Object"),new Error())},
mw(a){return!0},
m5(a){return a},
ki(a){return!1},
jq(a){return!0===a||!1===a},
aw(a){if(!0===a)return!0
if(!1===a)return!1
throw A.U(A.am(a,"bool"),new Error())},
iK(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.U(A.am(a,"bool?"),new Error())},
ax(a){if(typeof a=="number")return a
throw A.U(A.am(a,"double"),new Error())},
m3(a){if(typeof a=="number")return a
if(a==null)return a
throw A.U(A.am(a,"double?"),new Error())},
kg(a){return typeof a=="number"&&Math.floor(a)===a},
f(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.U(A.am(a,"int"),new Error())},
a3(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.U(A.am(a,"int?"),new Error())},
mr(a){return typeof a=="number"},
w(a){if(typeof a=="number")return a
throw A.U(A.am(a,"num"),new Error())},
S(a){if(typeof a=="number")return a
if(a==null)return a
throw A.U(A.am(a,"num?"),new Error())},
mu(a){return typeof a=="string"},
H(a){if(typeof a=="string")return a
throw A.U(A.am(a,"String"),new Error())},
bC(a){if(typeof a=="string")return a
if(a==null)return a
throw A.U(A.am(a,"String?"),new Error())},
iL(a){if(A.kh(a))return a
throw A.U(A.am(a,"JSObject"),new Error())},
m4(a){if(a==null)return a
if(A.kh(a))return a
throw A.U(A.am(a,"JSObject?"),new Error())},
kk(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.ab(a[q],b)
return s},
mC(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.kk(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.ab(l[n],b)
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
if(l===8){p=A.mM(a.x)
o=a.y
return o.length>0?p+("<"+A.kk(o,b)+">"):p}if(l===10)return A.mC(a,b)
if(l===11)return A.ke(a,b,null)
if(l===12)return A.ke(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.n(b,n)
return b[n]}return"?"},
mM(a){var s=A.kD(a)
if(s!=null)return s
return"minified:"+a},
m2(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
m1(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.iI(a,b,!1)
else if(typeof m=="number"){s=m
r=A.cr(a,5,"#")
q=A.iJ(s)
for(p=0;p<s;++p)q[p]=r
o=A.cq(a,b,q)
n[b]=o
return o}else return m},
m0(a,b){return A.kb(a.tR,b)},
m_(a,b){return A.kb(a.eT,b)},
iI(a,b,c){var s,r=a.eC,q=r.get(b)
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
q=A.jn(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
k9(a,b,c,d){return A.lQ(A.lK(a,b,c,d))},
aX(a,b){b.a=A.mj
b.b=A.mk
return b},
cr(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.as(null,null)
s.w=b
s.as=c
r=A.aX(a,s)
a.eC.set(c,r)
return r},
k7(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.lY(a,b,r,c)
a.eC.set(r,s)
return s},
lY(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bk(b))if(!(b===t.P||b===t.v))if(s!==6)r=s===7&&A.bH(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.as(null,null)
q.w=6
q.x=b
q.as=c
return A.aX(a,q)},
k6(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.lW(a,b,r,c)
a.eC.set(r,s)
return s},
lW(a,b,c,d){var s,r
if(d){s=b.w
if(A.bk(b)||b===t.K)return b
else if(s===1)return A.cq(a,"aQ",[b])
else if(b===t.P||b===t.v)return t.eH}r=new A.as(null,null)
r.w=7
r.x=b
r.as=c
return A.aX(a,r)},
lZ(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.as(null,null)
s.w=13
s.x=b
s.as=q
r=A.aX(a,s)
a.eC.set(q,r)
return r},
cp(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
lV(a){var s,r,q,p,o,n=a.length
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
q=A.aX(a,r)
a.eC.set(p,q)
return q},
jn(a,b,c){var s,r,q,p,o,n
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
n=A.aX(a,o)
a.eC.set(q,n)
return n},
k8(a,b,c){var s,r,q="+"+(b+"("+A.cp(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.as(null,null)
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
g+=s+"{"+A.lV(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.as(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.aX(a,p)
a.eC.set(r,o)
return o},
jo(a,b,c,d){var s,r=b.as+("<"+A.cp(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.lX(a,b,c,r,d)
a.eC.set(r,s)
return s},
lX(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.iJ(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.aY(a,b,r,0)
m=A.bE(a,c,r,0)
return A.jo(a,n,m,c!==m)}}l=new A.as(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.aX(a,l)},
lK(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
lQ(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.lM(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.k2(a,r,l,k,!1)
else if(q===46)r=A.k2(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bh(a.u,a.e,k.pop()))
break
case 94:k.push(A.lZ(a.u,k.pop()))
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
case 62:A.lO(a,k)
break
case 38:A.lN(a,k)
break
case 63:p=a.u
k.push(A.k7(p,A.bh(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.k6(p,A.bh(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.lL(a,k)
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
A.lR(a.u,a.e,o)
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
return A.bh(a.u,a.e,m)},
lM(a,b,c,d){var s,r,q=b-48
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
n=A.m2(s,o.x)[p]
if(n==null)A.cB('No "'+p+'" in "'+A.lw(o)+'"')
d.push(A.cs(s,o,n))}else d.push(p)
return m},
lO(a,b){var s,r=a.u,q=A.k1(a,b),p=b.pop()
if(typeof p=="string")b.push(A.cq(r,p,q))
else{s=A.bh(r,a.e,p)
switch(s.w){case 11:b.push(A.jo(r,s,q,a.n))
break
default:b.push(A.jn(r,s,q))
break}}},
lL(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
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
r=A.bh(p,a.e,o)
q=new A.dj()
q.a=s
q.b=n
q.c=m
b.push(A.k5(p,r,q))
return
case-4:b.push(A.k8(p,b.pop(),s))
return
default:throw A.j(A.cG("Unexpected state under `()`: "+A.v(o)))}},
lN(a,b){var s=b.pop()
if(0===s){b.push(A.cr(a.u,1,"0&"))
return}if(1===s){b.push(A.cr(a.u,4,"1&"))
return}throw A.j(A.cG("Unexpected extended operation "+A.v(s)))},
k1(a,b){var s=b.splice(a.p)
A.k3(a.u,a.e,s)
a.p=b.pop()
return s},
bh(a,b,c){if(typeof c=="string")return A.cq(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.lP(a,b,c)}else return c},
k3(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bh(a,b,c[s])},
lR(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bh(a,b,c[s])},
lP(a,b,c){var s,r,q=b.w
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
throw A.j(A.cG("Bad index "+c+" for "+b.q(0)))},
kw(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.T(a,b,null,c,null)
r.set(c,s)}return s},
T(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bk(d))return!0
s=b.w
if(s===4)return!0
if(A.bk(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.T(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.v){if(q===7)return A.T(a,b,c,d.x,e)
return d===p||d===t.v||q===6}if(d===t.K){if(s===7)return A.T(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.T(a,b.x,c,d,e))return!1
return A.T(a,A.ji(a,b),c,d,e)}if(s===6)return A.T(a,p,c,d,e)&&A.T(a,b.x,c,d,e)
if(q===7){if(A.T(a,b,c,d.x,e))return!0
return A.T(a,b,c,A.ji(a,d),e)}if(q===6)return A.T(a,b,c,p,e)||A.T(a,b,c,d.x,e)
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
if(!A.T(a,j,c,i,e)||!A.T(a,i,e,j,c))return!1}return A.kf(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.kf(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.mo(a,b,c,d,e)}if(o&&q===10)return A.mt(a,b,c,d,e)
return!1},
kf(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
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
mo(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
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
for(s=0;s<r;++s)if(!A.T(a,b[s],d,e[s],f))return!1
return!0},
mt(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.T(a,r[s],c,q[s],e))return!1
return!0},
bH(a){var s=a.w,r=!0
if(!(a===t.P||a===t.v))if(!A.bk(a))if(s!==6)r=s===7&&A.bH(a.x)
return r},
bk(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
kb(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
iJ(a){return a>0?new Array(a):v.typeUniverse.sEA},
as:function as(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dj:function dj(){this.c=this.b=this.a=null},
iH:function iH(a){this.a=a},
di:function di(){},
bA:function bA(a){this.a=a},
lE(){var s,r,q
if(self.scheduleImmediate!=null)return A.mP()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.ds(new A.ii(s),1)).observe(r,{childList:true})
return new A.ih(s,r,q)}else if(self.setImmediate!=null)return A.mQ()
return A.mR()},
lF(a){self.scheduleImmediate(A.ds(new A.ij(t.M.a(a)),0))},
lG(a){self.setImmediate(A.ds(new A.ik(t.M.a(a)),0))},
lH(a){A.jk(B.H,t.M.a(a))},
jk(a,b){return A.lT(0,b)},
lT(a,b){var s=new A.iF()
s.cp(a,b)
return s},
mz(a){return new A.df(new A.V($.M,a.h("V<0>")),a.h("df<0>"))},
m9(a,b){a.$2(0,null)
b.b=!0
return b.a},
m6(a,b){A.ma(a,b)},
m8(a,b){var s,r,q=b.$ti
q.h("1/?").a(a)
s=a==null?q.c.a(a):a
if(!b.b)b.a.cv(s)
else{r=b.a
if(q.h("aQ<1>").b(s))r.bv(s)
else r.bx(s)}},
m7(a,b){var s=A.aP(a),r=A.bG(a),q=b.b,p=b.a
if(q)p.b1(new A.ap(s,r))
else p.bu(new A.ap(s,r))},
ma(a,b){var s,r,q=new A.iM(b),p=new A.iN(b)
if(a instanceof A.V)a.bL(q,p,t.z)
else{s=t.z
if(a instanceof A.V)a.cc(q,p,s)
else{r=new A.V($.M,t.c)
r.a=8
r.c=a
r.bL(q,p,s)}}},
mO(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.M.c9(new A.iQ(s),t.x,t.S,t.z)},
k4(a,b,c){return 0},
ja(a){var s
if(t.V.b(a)){s=a.gaI()
if(s!=null)return s}return B.a0},
lf(a,b){var s
if(!b.b(null))throw A.j(A.en(null,"computation","The type parameter is not nullable"))
s=new A.V($.M,b.h("V<0>"))
A.lA(a,new A.fZ(null,s,b))
return s},
iq(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.lx()
b.bu(new A.ap(new A.aA(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bE(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.av()
b.aK(o.a)
A.be(b,p)
return}b.a^=2
A.dr(null,null,b.b,t.M.a(new A.ir(o,b)))},
be(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.u,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.js(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.be(d.a,c)
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
A.js(j.a,j.b)
return}g=$.M
if(g!==h)$.M=h
else g=null
c=c.c
if((c&15)===8)new A.iv(q,d,n).$0()
else if(o){if((c&1)!==0)new A.iu(q,j).$0()}else if((c&2)!==0)new A.it(d,q).$0()
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
continue}else A.iq(c,f,!0)
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
mD(a,b){var s
if(t.C.b(a))return b.c9(a,t.z,t.K,t.l)
s=t.B
if(s.b(a))return s.a(a)
throw A.j(A.en(a,"onError",u.c))},
mA(){var s,r
for(s=$.bD;s!=null;s=$.bD){$.cx=null
r=s.b
$.bD=r
if(r==null)$.cw=null
s.a.$0()}},
mJ(){$.jr=!0
try{A.mA()}finally{$.cx=null
$.jr=!1
if($.bD!=null)$.jE().$1(A.kp())}},
kl(a){var s=new A.dg(a),r=$.cw
if(r==null){$.bD=$.cw=s
if(!$.jr)$.jE().$1(A.kp())}else $.cw=r.b=s},
mG(a){var s,r,q,p=$.bD
if(p==null){A.kl(a)
$.cx=$.cw
return}s=new A.dg(a)
r=$.cx
if(r==null){s.b=p
$.bD=$.cx=s}else{q=r.b
s.b=q
$.cx=r.b=s
if(q==null)$.cw=s}},
nm(a,b){A.W(a,"stream",t.K)
return new A.dp(b.h("dp<0>"))},
lA(a,b){var s=$.M
if(s===B.j)return A.jk(a,t.M.a(b))
return A.jk(a,t.M.a(s.bT(b)))},
js(a,b){A.mG(new A.iP(a,b))},
kj(a,b,c,d,e){var s,r=$.M
if(r===c)return d.$0()
$.M=c
s=r
try{r=d.$0()
return r}finally{$.M=s}},
mF(a,b,c,d,e,f,g){var s,r=$.M
if(r===c)return d.$1(e)
$.M=c
s=r
try{r=d.$1(e)
return r}finally{$.M=s}},
mE(a,b,c,d,e,f,g,h,i){var s,r=$.M
if(r===c)return d.$2(e,f)
$.M=c
s=r
try{r=d.$2(e,f)
return r}finally{$.M=s}},
dr(a,b,c,d){t.M.a(d)
if(B.j!==c){d=c.bT(d)
d=d}A.kl(d)},
ii:function ii(a){this.a=a},
ih:function ih(a,b,c){this.a=a
this.b=b
this.c=c},
ij:function ij(a){this.a=a},
ik:function ik(a){this.a=a},
iF:function iF(){},
iG:function iG(a,b){this.a=a
this.b=b},
df:function df(a,b){this.a=a
this.b=!1
this.$ti=b},
iM:function iM(a){this.a=a},
iN:function iN(a){this.a=a},
iQ:function iQ(a){this.a=a},
aN:function aN(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
av:function av(a,b){this.a=a
this.$ti=b},
ap:function ap(a,b){this.a=a
this.b=b},
fZ:function fZ(a,b,c){this.a=a
this.b=b
this.c=c},
bd:function bd(a,b,c,d,e){var _=this
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
im:function im(a,b){this.a=a
this.b=b},
is:function is(a,b){this.a=a
this.b=b},
ir:function ir(a,b){this.a=a
this.b=b},
ip:function ip(a,b){this.a=a
this.b=b},
io:function io(a,b){this.a=a
this.b=b},
iv:function iv(a,b,c){this.a=a
this.b=b
this.c=c},
iw:function iw(a,b){this.a=a
this.b=b},
ix:function ix(a){this.a=a},
iu:function iu(a,b){this.a=a
this.b=b},
it:function it(a,b){this.a=a
this.b=b},
dg:function dg(a){this.a=a
this.b=null},
dp:function dp(a){this.$ti=a},
cu:function cu(){},
dn:function dn(){},
iE:function iE(a,b){this.a=a
this.b=b},
iP:function iP(a,b){this.a=a
this.b=b},
jf(a,b){return new A.aI(a.h("@<0>").E(b).h("aI<1,2>"))},
R(a,b,c){return b.h("@<0>").E(c).h("jQ<1,2>").a(A.mW(a,new A.aI(b.h("@<0>").E(c).h("aI<1,2>"))))},
Y(a,b){return new A.aI(a.h("@<0>").E(b).h("aI<1,2>"))},
ln(a){return new A.at(a.h("at<0>"))},
c0(a){return new A.at(a.h("at<0>"))},
lo(a,b){return b.h("jS<0>").a(A.mX(a,new A.at(b.h("at<0>"))))},
jm(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
iC(a,b,c){var s=new A.bg(a,b,c.h("bg<0>"))
s.c=a.e
return s},
b4(a,b){var s=J.E(a)
if(s.j())return s.gn()
return null},
ar(a,b,c){var s=A.jf(b,c)
a.a7(0,new A.h5(s,b,c))
return s},
jR(a,b,c){var s=A.jf(b,c)
s.F(0,a)
return s},
h7(a){var s,r
if(A.jA(a))return"{...}"
s=new A.bv("")
try{r={}
B.a.l($.aj,a)
s.a+="{"
r.a=!0
a.a7(0,new A.h8(r,s))
s.a+="}"}finally{if(0>=$.aj.length)return A.n($.aj,-1)
$.aj.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
at:function at(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dm:function dm(a){this.a=a
this.c=this.b=null},
bg:function bg(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
h5:function h5(a,b,c){this.a=a
this.b=b
this.c=c},
B:function B(){},
D:function D(){},
h6:function h6(a){this.a=a},
h8:function h8(a,b){this.a=a
this.b=b},
ct:function ct(){},
br:function br(){},
cf:function cf(){},
bu:function bu(){},
cn:function cn(){},
bB:function bB(){},
mB(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aP(r)
q=A.jN(String(s))
throw A.j(q)}q=A.iO(p)
return q},
iO(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.dk(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.iO(a[s])
return a},
jP(a,b,c){return new A.bY(a,b)},
mc(a){return a.H()},
lI(a,b){return new A.iz(a,[],A.mT())},
lJ(a,b,c){var s,r=new A.bv(""),q=A.lI(r,b)
q.aV(a)
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
h1:function h1(){},
h3:function h3(a){this.b=a},
h2:function h2(a){this.a=a},
iA:function iA(){},
iB:function iB(a,b){this.a=a
this.b=b},
iz:function iz(a,b,c){this.c=a
this.a=b
this.b=c},
kv(a){var s=A.lu(a,null)
if(s!=null)return s
throw A.j(A.jN(a))},
lb(a,b){a=A.U(a,new Error())
if(a==null)a=A.cv(a)
a.stack=b.q(0)
throw a},
c1(a,b,c,d){var s,r=c?J.jO(a,d):J.lk(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
c2(a,b,c){var s,r=A.c([],c.h("t<0>"))
for(s=J.E(a);s.j();)B.a.l(r,c.a(s.gn()))
if(b)return r
r.$flags=1
return r},
o(a,b){var s,r
if(Array.isArray(a))return A.c(a.slice(0),b.h("t<0>"))
s=A.c([],b.h("t<0>"))
for(r=J.E(a);r.j();)B.a.l(s,r.gn())
return s},
aT(a,b){var s=A.c2(a,!1,b)
s.$flags=3
return s},
jX(a,b,c){var s=J.E(b)
if(!s.j())return a
if(c.length===0){do a+=A.v(s.gn())
while(s.j())}else{a+=A.v(s.gn())
while(s.j())a=a+c+A.v(s.gn())}return a},
lx(){return A.bG(new Error())},
la(a,b,c){var s,r
for(s=0;s<4;++s){r=a[s]
if(r.b===b)return r}throw A.j(A.en(b,"name","No enum value with that name"))},
cO(a){if(typeof a=="number"||A.jq(a)||a==null)return J.bn(a)
if(typeof a=="string")return JSON.stringify(a)
return A.jU(a)},
lc(a,b){A.W(a,"error",t.K)
A.W(b,"stackTrace",t.l)
A.lb(a,b)},
cG(a){return new A.cF(a)},
cE(a,b){return new A.aA(!1,null,b,a)},
en(a,b,c){return new A.aA(!0,a,b,c)},
b9(a,b,c,d,e){return new A.ca(b,c,!0,a,d,"Invalid value")},
lv(a,b,c){if(0>a||a>c)throw A.j(A.b9(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.j(A.b9(b,a,c,"end",null))
return b}return c},
cb(a,b){if(a<0)throw A.j(A.b9(a,0,null,b,null))
return a},
jb(a,b,c,d){return new A.cP(b,!0,a,d,"Index out of range")},
bc(a){return new A.cg(a)},
jZ(a){return new A.dd(a)},
jW(a){return new A.ce(a)},
X(a){return new A.cK(a)},
jN(a){return new A.aG(a)},
lj(a,b,c){var s,r
if(A.jA(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.c([],t.s)
B.a.l($.aj,a)
try{A.mx(a,s)}finally{if(0>=$.aj.length)return A.n($.aj,-1)
$.aj.pop()}r=A.jX(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
jc(a,b,c){var s,r
if(A.jA(a))return b+"..."+c
s=new A.bv(b)
B.a.l($.aj,a)
try{r=s
r.a=A.jX(r.a,a,", ")}finally{if(0>=$.aj.length)return A.n($.aj,-1)
$.aj.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
mx(a,b){var s,r,q,p,o,n,m,l=a.gC(a),k=0,j=0
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
jh(a,b,c,d){var s
if(B.o===c){s=J.af(a)
b=J.af(b)
return A.i5(A.aJ(A.aJ($.du(),s),b))}if(B.o===d){s=J.af(a)
b=J.af(b)
c=J.af(c)
return A.i5(A.aJ(A.aJ(A.aJ($.du(),s),b),c))}s=J.af(a)
b=J.af(b)
c=J.af(c)
d=J.af(d)
d=A.i5(A.aJ(A.aJ(A.aJ(A.aJ($.du(),s),b),c),d))
return d},
lq(a){var s,r,q=$.du()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.u)(a),++r)q=A.aJ(q,J.af(a[r]))
return A.i5(q)},
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
il:function il(a){this.a=a},
aG:function aG(a){this.a=a},
b:function b(){},
a9:function a9(a,b,c){this.a=a
this.b=b
this.$ti=c},
aa:function aa(){},
y:function y(){},
dq:function dq(){},
i4:function i4(){this.b=this.a=0},
bv:function bv(a){this.a=a},
jG(a,b,c,d){var s,r,q,p,o,n=t.N,m=t.S,l=A.c([],t.aD),k=a.gaq(),j=a.gaq(),i=a.gaq(),h=A.jR(a.gaq().w,m,m),g=A.Y(m,m)
for(s=a.gN(),r=J.E(s.a),s=new A.P(r,s.b,s.$ti.h("P<1>"));s.j();){q=r.gn()
g.v(0,q.a,q.d)}s=A.Y(n,t.J)
for(r=d.length,p=0;p<d.length;d.length===r||(0,A.u)(d),++p){o=d[p]
s.v(0,o.a,o)}return new A.aF(a,b,c,k.b,j.c,i.d,h,g,s,A.c0(n),A.c0(n),A.c0(n),A.c0(m),A.c0(m),l)},
aV:function aV(a,b,c){this.a=a
this.b=b
this.c=c},
eo:function eo(a){this.a=a},
aF:function aF(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
dy:function dy(){},
dz:function dz(){},
dW:function dW(a){this.a=a},
dA:function dA(a,b){this.a=a
this.b=b},
dD:function dD(a){this.a=a},
dE:function dE(){},
dH:function dH(a,b){this.a=a
this.b=b},
dF:function dF(a){this.a=a},
dG:function dG(a,b){this.a=a
this.b=b},
dI:function dI(a){this.a=a},
dJ:function dJ(a,b){this.a=a
this.b=b},
dK:function dK(a){this.a=a},
dL:function dL(){},
dM:function dM(a){this.a=a},
dN:function dN(){},
dO:function dO(a){this.a=a},
dP:function dP(a){this.a=a},
dQ:function dQ(a){this.a=a},
dT:function dT(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dR:function dR(a){this.a=a},
dS:function dS(a){this.a=a},
dX:function dX(a){this.a=a},
dU:function dU(){},
dV:function dV(){},
dB:function dB(){},
dC:function dC(){},
dY:function dY(a){this.a=a},
dZ:function dZ(){},
e_:function e_(a){this.a=a},
e0:function e0(a){this.a=a},
al(a,b,c,d){var s,r=b.f,q=A.h(r)
q=new A.d(r,q.h("e(1)").a(new A.er(a)),q.h("d<1>")).gm(0)
r=b.gN()
if(!b.gN().gC(0).j())s=0
else{s=c.b.i(0,"countryIncome")
s.toString
s=B.b.k(s)}return new A.eq(a,q,r.G(0,s,new A.es(d,c),t.S),b,c)},
eq:function eq(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
er:function er(a){this.a=a},
es:function es(a,b){this.a=a
this.b=b},
ae(a){var s=a.e
if(s===2)s=1000
else s=s===1?30:0
return a.w*3+a.r*0.35+a.f*0.15+a.x*1.5-a.y*2+s},
ac(a,b){var s=b?a.x*0.75:0,r=a.e
if(r===1)r=30
else r=r===2?-200:0
return a.w*3+a.r*0.35+a.f*0.15-a.y*2-s+r},
ku(a,b){var s=a.gaQ(),r=a.gP(),q=b.b.i(0,"soldierPower")
q.toString
return s*(a.w+r*B.b.k(q))+B.a.G(a.ax,0,new A.iW(b,a),t.H)},
dt(a,b,c,d){var s,r=b.b,q=r.i(0,"soldierHp")
q.toString
q=B.b.k(q)
s=b.bd(a.w,c,!1)
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
et:function et(a,b,c){this.a=a
this.b=b
this.c=c},
eu:function eu(){},
ev:function ev(){},
iW:function iW(a,b){this.a=a
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
au:function au(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ex:function ex(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.r=_.f=_.e=$
_.w=null
_.x=e},
eP:function eP(a){this.a=a},
eQ:function eQ(){},
eR:function eR(){},
f1:function f1(){},
f4:function f4(){},
f5:function f5(a){this.a=a},
f6:function f6(a){this.a=a},
f7:function f7(a){this.a=a},
f8:function f8(a,b){this.a=a
this.b=b},
f9:function f9(a,b){this.a=a
this.b=b},
fa:function fa(a){this.a=a},
eS:function eS(a,b){this.a=a
this.b=b},
eT:function eT(a){this.a=a},
eU:function eU(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eV:function eV(a,b,c){this.a=a
this.b=b
this.c=c},
eW:function eW(a){this.a=a},
eX:function eX(){},
eY:function eY(a){this.a=a},
eZ:function eZ(a){this.a=a},
f_:function f_(){},
f0:function f0(a){this.a=a},
f2:function f2(){},
f3:function f3(a){this.a=a},
eD:function eD(a,b){this.a=a
this.b=b},
eE:function eE(a){this.a=a},
eI:function eI(a){this.a=a},
eJ:function eJ(a,b){this.a=a
this.b=b},
eK:function eK(a){this.a=a},
eL:function eL(a,b){this.a=a
this.b=b},
eM:function eM(a){this.a=a},
eN:function eN(a){this.a=a},
eO:function eO(){},
eG:function eG(a){this.a=a},
eH:function eH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eF:function eF(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ez:function ez(a,b,c){this.a=a
this.b=b
this.c=c},
eA:function eA(a){this.a=a},
eB:function eB(a){this.a=a},
eC:function eC(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ey:function ey(a){this.a=a},
a6:function a6(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fb:function fb(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fW:function fW(a,b){this.a=a
this.b=b},
fX:function fX(a){this.a=a},
fV:function fV(a){this.a=a},
fY:function fY(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fT:function fT(){},
fS:function fS(){},
fU:function fU(){},
fR:function fR(){},
fc:function fc(){},
fd:function fd(){},
fe:function fe(){},
fp:function fp(){},
fA:function fA(a){this.a=a},
fC:function fC(){},
fD:function fD(){},
fE:function fE(a){this.a=a},
fF:function fF(){},
fG:function fG(a){this.a=a},
fH:function fH(a){this.a=a},
ff:function ff(){},
fg:function fg(a){this.a=a},
fI:function fI(a,b){this.a=a
this.b=b},
fh:function fh(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fi:function fi(a,b){this.a=a
this.b=b},
fj:function fj(){},
fk:function fk(a){this.a=a},
fl:function fl(a){this.a=a},
fm:function fm(a,b,c){this.a=a
this.b=b
this.c=c},
fn:function fn(a){this.a=a},
fo:function fo(a,b,c){this.a=a
this.b=b
this.c=c},
fq:function fq(a){this.a=a},
fr:function fr(){},
fs:function fs(){},
ft:function ft(){},
fu:function fu(a,b){this.a=a
this.b=b},
fv:function fv(){},
fw:function fw(a){this.a=a},
fx:function fx(a){this.a=a},
fy:function fy(a){this.a=a},
fz:function fz(){},
fB:function fB(a){this.a=a},
fO:function fO(a){this.a=a},
fP:function fP(a){this.a=a},
fQ:function fQ(){},
fJ:function fJ(){},
fK:function fK(a){this.a=a},
fL:function fL(){},
fM:function fM(a){this.a=a},
fN:function fN(a){this.a=a},
eb(a){var s,r=a.length
if(0>=r)return A.n(a,0)
s=A.w(a[0])
if(1>=r)return A.n(a,1)
return new A.J(s,A.w(a[1]))},
J:function J(a,b){this.a=a
this.b=b},
ea:function ea(a){this.a=a},
jF(c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9=A.H(c3.i(0,"id")),b0=A.f(c3.i(0,"c")),b1=A.f(c3.i(0,"home")),b2=A.f(c3.i(0,"o")),b3=A.f(c3.i(0,"t")),b4=A.w(c3.i(0,"hp")),b5=A.f(c3.i(0,"max")),b6=A.f(c3.i(0,"a")),b7=A.f(c3.i(0,"p")),b8=A.f(c3.i(0,"pay")),b9=t.j,c0=A.eb(b9.a(c3.i(0,"xy"))),c1=A.eb(b9.a(c3.i(0,"v"))),c2=A.f(c3.i(0,"s"))
if(!(c2>=0&&c2<8))return A.n(B.L,c2)
c2=B.L[c2]
s=A.c([],t.n)
for(r=b9.a(c3.i(0,"troops")),q=r.length,p=0;p<r.length;r.length===q||(0,A.u)(r),++p)s.push(A.w(r[p]))
r=t.R
q=t.S
o=A.c2(r.a(c3.i(0,"w")),!0,q)
n=A.w(c3.i(0,"m"))
m=A.w(c3.i(0,"due"))
l=c3.i(0,"to")==null?null:A.eb(b9.a(c3.i(0,"to")))
k=A.a3(c3.i(0,"target"))
j=A.w(c3.i(0,"return"))
i=A.aw(c3.i(0,"dispatch"))
h=A.aw(c3.i(0,"move"))
g=A.aw(c3.i(0,"dismiss"))
f=A.aw(c3.i(0,"upgrade"))
e=A.aw(c3.i(0,"retreat"))
d=A.aw(c3.i(0,"marked"))
c=A.H(c3.i(0,"rev"))
b=A.f(c3.i(0,"orderRev"))
a=A.bC(c3.i(0,"opponent"))
a0=A.f(c3.i(0,"clashes"))
a1=A.w(c3.i(0,"received"))
a2=A.w(c3.i(0,"dealt"))
a3=A.aw(c3.i(0,"opening"))
a4=A.aw(c3.i(0,"weaponReady"))
a5=A.c([],t._)
for(r=J.E(r.a(c3.i(0,"returnPath")));r.j();){a6=b9.a(r.gn())
a7=a6.length
if(0>=a7)return A.n(a6,0)
a8=A.w(a6[0])
if(1>=a7)return A.n(a6,1)
a5.push(new A.J(a8,A.w(a6[1])))}b9=A.a3(c3.i(0,"regionCity"))
r=A.a3(c3.i(0,"salaryPaidMonth"))
if(r==null)r=-1
a6=A.iK(c3.i(0,"movementPending"))
return new A.r(a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,c0,c1,c2,A.aT(s,t.i),A.aT(o,q),n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,b9,r,a6===!0)},
kX(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=A.f(a2.i(0,"id")),d=A.f(a2.i(0,"c")),c=A.f(a2.i(0,"native")),b=A.f(a2.i(0,"level")),a=t.j,a0=A.eb(a.a(a2.i(0,"xy"))),a1=A.c([],t._)
for(s=a.a(a2.i(0,"outline")),r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q){p=a.a(s[q])
o=p.length
if(0>=o)return A.n(p,0)
n=A.w(p[0])
if(1>=o)return A.n(p,1)
a1.push(new A.J(n,A.w(p[1])))}a=A.f(a2.i(0,"income"))
s=A.f(a2.i(0,"poor"))
r=A.f(a2.i(0,"cap"))
p=A.f(a2.i(0,"recruitCap"))
o=A.aw(a2.i(0,"recruit"))
n=A.H(a2.i(0,"rev"))
m=A.f(a2.i(0,"baseIncome"))
l=A.a3(a2.i(0,"initial"))
k=A.f(a2.i(0,"wins"))
j=A.bC(a2.i(0,"attacker"))
i=A.bC(a2.i(0,"defender"))
h=A.H(a2.i(0,"stage"))
g=A.w(a2.i(0,"next"))
f=A.iK(a2.i(0,"fallen"))
return new A.Q(e,d,c,b,a0,new A.ea(a1),a,s,r,p,m,o,n,l,k,j,i,h,g,f===!0,A.w(a2.i(0,"danger")))},
kY(a){var s,r,q,p,o,n=A.f(a.i(0,"id")),m=A.f(a.i(0,"gold")),l=A.f(a.i(0,"reserves")),k=A.f(a.i(0,"capacity")),j=A.f(a.i(0,"salary")),i=A.f(a.i(0,"poor")),h=A.S(a.i(0,"garrisonAccrued"))
if(h==null)h=0
s=t.S
r=A.Y(s,s)
for(q=t.f,p=q.a(a.i(0,"stock")).gah(),p=p.gC(p);p.j();){o=p.gn()
r.v(0,A.kv(A.H(o.a)),A.f(o.b))}p=A.Y(s,s)
for(q=q.a(a.i(0,"hate")).gah(),q=q.gC(q);q.j();){o=q.gn()
p.v(0,A.kv(A.H(o.a)),A.f(o.b))}return new A.b0(n,m,l,k,j,i,h,A.ew(r,s,s),A.ew(p,s,s))},
kZ(a){var s,r,q,p,o,n,m=A.f(a.i(0,"country")),l=A.f(a.i(0,"tick")),k=A.w(a.i(0,"month")),j=A.c([],t.Y)
for(s=t.R,r=J.E(s.a(a.i(0,"cities"))),q=t.f,p=t.N,o=t.z;r.j();)j.push(A.kX(A.ar(q.a(r.gn()),p,o)))
r=A.c([],t.e)
for(n=J.E(s.a(a.i(0,"heroes")));n.j();)r.push(A.jF(A.ar(q.a(n.gn()),p,o)))
n=A.c([],t.eu)
for(s=J.E(s.a(a.i(0,"countries")));s.j();)n.push(A.kY(A.ar(q.a(s.gn()),p,o)))
s=A.f(a.i(0,"pool"))
q=A.f(a.i(0,"salary"))
p=A.a3(a.i(0,"year"))
if(p==null)p=1
o=A.a3(a.i(0,"monthIndex"))
if(o==null)o=0
return new A.e2(m,l,p,o,k,A.aT(j,t.q),A.aT(r,t.r),A.aT(n,t.t),s,q)},
ak:function ak(a,b){this.a=a
this.b=b},
r:function r(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8){var _=this
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
Q:function Q(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1){var _=this
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
e2:function e2(a,b,c,d,e,f,g,h,i,j){var _=this
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
e8:function e8(a){this.a=a},
e9:function e9(a){this.a=a},
e5:function e5(a,b){this.a=a
this.b=b},
e4:function e4(a){this.a=a},
e6:function e6(){},
e7:function e7(a){this.a=a},
e3:function e3(a){this.a=a},
ju(a,b,c){var s,r,q=null,p=a.as
if(p===B.f||p===B.e||p===B.t)return q
s=c.y.i(0,a.a)
p=s==null
if((p?q:s.b)==="expedition")p=p?q:s.d
else p=a.cx
r=b.K(p)
return r!=null&&r.b!==a.b?r:q},
ko(a,b,c,d){var s,r,q=A.ju(a,b,c)
if(q==null)return!1
s=a.as
r=!0
if(s!==B.w)if(s!==B.D){s=a.z
s=q.f.a4(s).J(s)<=d.r.p2}else s=r
else s=r
return s},
c9(a,b,c,d,e){var s=B.a.I(a.f,new A.hb(e,a))?e:null
s=new A.ha(a,b,c,s,d,A.Y(t.S,t.bd))
s.co(a,b,c,d,e)
return s},
ha:function ha(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hb:function hb(a,b){this.a=a
this.b=b},
hc:function hc(){},
hg:function hg(a){this.a=a},
hi:function hi(a){this.a=a},
hj:function hj(a){this.a=a},
hh:function hh(a,b){this.a=a
this.b=b},
he:function he(){},
hf:function hf(a,b){this.a=a
this.b=b},
hk:function hk(a){this.a=a},
hd:function hd(a){this.a=a},
d7:function d7(a,b){this.a=a
this.b=b},
hl:function hl(a,b,c){this.a=a
this.b=b
this.c=c},
hm:function hm(a,b){this.a=a
this.b=b},
hp:function hp(a,b,c){this.a=a
this.b=b
this.c=c},
hq:function hq(){},
hr:function hr(a){this.a=a},
hs:function hs(){},
ht:function ht(a){this.a=a},
hu:function hu(a){this.a=a},
hv:function hv(a){this.a=a},
hx:function hx(a){this.a=a},
hy:function hy(a){this.a=a},
hz:function hz(a){this.a=a},
hw:function hw(a,b){this.a=a
this.b=b},
hA:function hA(){},
hB:function hB(){},
hn:function hn(){},
ho:function ho(a){this.a=a},
l2(a){var s,r,q,p,o,n,m,l=A.H(a.i(0,"hero")),k=A.H(a.i(0,"role")),j=A.f(a.i(0,"deadline")),i=A.f(a.i(0,"commit")),h=A.a3(a.i(0,"city")),g=A.bC(a.i(0,"enemy")),f=A.c([],t._)
for(s=J.E(t.R.a(a.i(0,"points"))),r=t.j;s.j();){q=r.a(s.gn())
p=q.length
if(0>=p)return A.n(q,0)
o=A.w(q[0])
if(1>=p)return A.n(q,1)
f.push(new A.J(o,A.w(q[1])))}s=A.f(a.i(0,"leg"))
r=A.f(a.i(0,"gold"))
q=A.aw(a.i(0,"slot"))
p=A.H(a.i(0,"reason"))
o=A.f(a.i(0,"order"))
n=A.a3(a.i(0,"targetCountry"))
m=A.iK(a.i(0,"attrition"))
return new A.ad(l,k,p,h,n,m===!0,g,f,s,j,i,r,q,o)},
l_(a){var s,r,q,p,o,n,m,l,k,j,i
if(!J.an(a.i(0,"protocol"),1))throw A.j(B.a3)
s=A.H(a.i(0,"session"))
r=A.f(a.i(0,"id"))
q=A.H(a.i(0,"rules"))
p=A.H(a.i(0,"map"))
o=t.f
n=t.N
m=t.z
l=A.kZ(A.ar(o.a(a.i(0,"observation")),n,m))
k=A.f(a.i(0,"deadline"))
j=A.c([],t.m)
for(i=J.E(t.R.a(a.i(0,"tasks")));i.j();)j.push(A.l2(A.ar(o.a(i.gn()),n,m)))
o=A.f(a.i(0,"seed"))
n=A.f(a.i(0,"priority"))
m=A.f(a.i(0,"idle"))
i=A.bC(a.i(0,"stage"))
if(i==null)i="full"
return new A.ed(s,q,p,r,k,o,n,m,A.la(B.ae,i,t.a9),A.a3(a.i(0,"offensiveCountry")),A.a3(a.i(0,"offensiveCity")),l,j)},
jH(a,b,c,d){var s=a.Q
return new A.ec(a.a,a.b,a.c,a.d,s.a,s.b,a.e,d,b,c)},
aE:function aE(a,b){this.a=a
this.b=b},
ao:function ao(a,b){this.a=a
this.b=b},
z:function z(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
ad:function ad(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var _=this
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
ed:function ed(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
cy(a9,b0,b1,b2,b3,b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="soldierLimit",a2="soldierPower",a3="soldierHp",a4={},a5=b1.u(b0.a),a6=A.h(a5).h("L<1>"),a7=A.Z(new A.L(a5,a6),0,A.W(b0.gad(),"count",t.S),a6.h("k.E")).ab(0),a8=A.al(b0.b,b1,b2,null)
a4.a=a4.b=1
a4.c=null
a6=b2.cU(a9.w,!1)
a5=b2.b
s=a5.i(0,a1)
s.toString
s=B.b.k(s)
r=a5.i(0,a2)
r.toString
q=a6+s*B.b.k(r)
p=B.a.ao(b1.w,new A.iR(b0)).c
for(a6=b0.cy,s=b0.at,r=b0.ax,o=s==null,n=b0.d,m=t.a,l=0,k=0;k<a7.length;++k){j=a7[k]
i=a5.i(0,a1)
i.toString
h=Math.min(B.b.k(i),p+j.gP())
p=Math.max(0,p-(h-j.gP()))
if(o)i=n
else{i=a6?1:0
i=B.c.B(s-r-i,0,5)}i=Math.max(1,i-k)
g=a5.i(0,a1)
g.toString
g=B.b.k(g)
f=b3.d_(a9,j,i,!1,h,k<b4.length?A.c([b4[k]],m):B.d,!0,g)
a4.b=Math.min(a4.b,f.b)
if(k===0)a4.c=f
a4.a=Math.min(a4.a,f.c)
if(o)i=n
else{i=a6?1:0
i=B.c.B(s-r-i,0,5)}i=b2.bd(j.w,Math.max(1,i-k),!1)
g=a5.i(0,a2)
g.toString
e=(i+h*B.b.k(g))/Math.max(1,q)
g=a5.i(0,a3)
g.toString
l+=(j.f+h*B.b.k(g))*e*e}for(a6=b2.f,s=b2.r,r=s.rx,d=0,k=0;o=b4.length,k<Math.min(o,a7.length);++k){if(!(k<o))return A.n(b4,k)
c=a6.i(0,b4[k])
if(c!=null){o=Math.max(0,c.c-c.d)
d+=o*(k===0?1:r)}}a6=a9.f
r=a5.i(0,a1)
r.toString
r=B.b.k(r)
a5=a5.i(0,a3)
a5.toString
b=Math.max(1,B.b.ag(l/Math.max(1,(a6+r*B.b.k(a5)+d)*0.85)))
a5=new A.iS(a4,a7,a9,b2)
a=a5.$0()
if(a.a[2]>0)return a
if(a7.length!==0&&J.j8(b4)&&a4.b<s.k4)return new A.aM([!1,a4.b,0,a4.a])
r=s.fy
if(b>r)return a5.$0()
o=a7.length
m=o===0
if(!m)a6=o===1&&n<=2&&a6>=a9.r*0.8&&a4.b>s.ry||a4.b>s.RG+Math.max(0,o-1)*0.025-b5
else a6=!0
if(a6){a5=a4.b
a6=a4.a
return new A.aM([!1,a5,a8.cb(a5>=s.k4||m?b:Math.max(2,b),o),a6])}a0=o>1&&a4.a>s.RG&&a4.b>-0.08?Math.min(r,o):0
if(a0===0)return a5.$0()
a5=a4.b
a6=a4.a
return new A.aM([!1,a5,a8.cb(a0,o),a6])},
iR:function iR(a){this.a=a},
iS:function iS(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hF:function hF(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hI:function hI(a){this.a=a},
hJ:function hJ(){},
hK:function hK(a,b,c){this.a=a
this.b=b
this.c=c},
hV:function hV(a,b,c){this.a=a
this.b=b
this.c=c},
hH:function hH(a,b){this.a=a
this.b=b},
hG:function hG(a,b,c){this.a=a
this.b=b
this.c=c},
hX:function hX(a,b){this.a=a
this.b=b},
hY:function hY(a,b){this.a=a
this.b=b},
hZ:function hZ(){},
i_:function i_(){},
i0:function i0(){},
i1:function i1(a){this.a=a},
i2:function i2(){},
hL:function hL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hM:function hM(a,b,c){this.a=a
this.b=b
this.c=c},
hN:function hN(a){this.a=a},
hO:function hO(a){this.a=a},
hP:function hP(){},
hQ:function hQ(){},
hR:function hR(a,b,c){this.a=a
this.b=b
this.c=c},
hS:function hS(a,b,c){this.a=a
this.b=b
this.c=c},
hT:function hT(a,b){this.a=a
this.b=b},
hU:function hU(a,b,c){this.a=a
this.b=b
this.c=c},
hW:function hW(){},
bo:function bo(a,b,c){this.a=a
this.b=b
this.d=c},
ee:function ee(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ef:function ef(){},
eg:function eg(a,b,c){this.a=a
this.b=b
this.c=c},
eh:function eh(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ei:function ei(a,b,c){this.a=a
this.b=b
this.c=c},
ej:function ej(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
l0(a,b,c,d,e,f,g){var s,r,q,p,o=A.ew(e,t.N,t.H),n=t.S,m=A.aT(d,n),l=t.i,k=A.aT(b,l)
l=A.aT(a,l)
s=t.z
s=A.Y(s,s)
for(r=g.length,q=0;q<g.length;g.length===r||(0,A.u)(g),++q){p=g[q]
s.v(0,p.a,p)}return new A.ek(f,o,m,k,l,A.ew(s,n,t.o),c)},
l1(c8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0=A.H(c8.i(0,"version")),c1=t.f,c2=t.N,c3=A.ar(c1.a(c8.i(0,"values")),c2,t.H),c4=t.R,c5=A.c2(c4.a(c8.i(0,"upgrades")),!0,t.S),c6=t.n,c7=A.c([],c6)
for(s=J.E(c4.a(c8.i(0,"movement")));s.j();)c7.push(A.w(s.gn()))
c6=A.c([],c6)
for(s=J.E(c4.a(c8.i(0,"field")));s.j();)c6.push(A.w(s.gn()))
s=A.c([],t.W)
for(c4=J.E(c4.a(c8.i(0,"weapons"))),r=t.j;c4.j();){q=r.a(c4.gn())
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
j=A.aw(q[5])
if(6>=p)return A.n(q,6)
s.push(new A.a_(o,n,m,l,k,j,A.w(q[6])))}c1=A.ar(c1.a(c8.i(0,"tuning")),c2,t.z)
c2=A.w(c1.i(0,"interval"))
c4=A.S(c1.i(0,"resourceInterval"))
if(c4==null)c4=30
r=A.a3(c1.i(0,"cashBuffer"))
if(r==null)r=12
q=A.S(c1.i(0,"payrollRatio"))
if(q==null)q=0.5
p=A.a3(c1.i(0,"dangerousCountryCities"))
if(p==null)p=3
o=A.S(c1.i(0,"coalitionBudgetBase"))
if(o==null)o=0.5
n=A.S(c1.i(0,"coalitionBudgetStep"))
if(n==null)n=0.25
m=A.S(c1.i(0,"coalitionTargetBase"))
if(m==null)m=45
l=A.S(c1.i(0,"coalitionTargetStep"))
if(l==null)l=15
k=A.S(c1.i(0,"coalitionPayrollCeiling"))
if(k==null)k=0.8
j=A.S(c1.i(0,"coalitionTravel"))
if(j==null)j=45
i=A.S(c1.i(0,"targetTravelScale"))
if(i==null)i=25
h=A.S(c1.i(0,"hatredTargetBonus"))
if(h==null)h=90
g=A.S(c1.i(0,"breakthroughMargin"))
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
a7=A.S(c1.i(0,"splitForce"))
if(a7==null)a7=2.25
a8=A.S(c1.i(0,"splitAdvantage"))
if(a8==null)a8=0.3
a9=A.S(c1.i(0,"arrivalSpread"))
if(a9==null)a9=20
b0=A.S(c1.i(0,"expeditionSeconds"))
if(b0==null)b0=900
b1=A.S(c1.i(0,"assaultCommitDistance"))
if(b1==null)b1=64
b2=A.S(c1.i(0,"recallCriticalMargin"))
if(b2==null)b2=0.25
b3=A.a3(c1.i(0,"attritionCombat"))
if(b3==null)b3=8
b4=A.S(c1.i(0,"attritionGain"))
if(b4==null)b4=0.06
b5=A.f(c1.i(0,"targets"))
b6=A.f(c1.i(0,"slice"))
b7=A.w(c1.i(0,"advantage"))
b8=A.w(c1.i(0,"expansion"))
b9=A.w(c1.i(0,"credit"))
return A.l0(c6,c7,new A.cD(c2,f,e,d,c4,r,q,p,o,n,m,l,k,j,i,h,g,c,A.w(c1.i(0,"age")),b,a,a0,a1,a2,a3,a4,b5,b6,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b7,b9,b8,A.f(c1.i(0,"timeout")),A.f(c1.i(0,"restarts")),A.w(c1.i(0,"stagnation"))),c5,c3,c0,s)},
a_:function a_(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
ek:function ek(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
e1:function e1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
em:function em(a,b,c){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=0
_.r=c},
bl(a,b,c,d,e,f){var s,r,q,p,o,n,m=a.a,l=c.u(m),k=A.h(l).h("L<1>"),j=A.Z(new A.L(l,k),0,A.W(a.gad(),"count",t.S),k.h("k.E")).ab(0)
if(j.length===0)s=0
else{l=A.h(j)
s=new A.O(j,l.h("i(1)").a(new A.j3()),l.h("O<1,i>")).aa(0,B.G)}l=c.r
k=A.h(l)
r=new A.d(l,k.h("e(1)").a(new A.j4(a)),k.h("d<1>")).G(0,0,new A.j5(),t.i)
k=a.b
l=c.gaq().x.i(0,k)
l=B.c.B(l==null?0:l,0,100)
k=A.al(k,c,d,null)
if(k.gW()){q=k.e.r
p=q.z+k.gb5()*q.Q}else p=0
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
j3:function j3(){},
j4:function j4(a){this.a=a},
j5:function j5(){},
a2:function a2(a,b,c){this.a=a
this.b=b
this.c=c},
aq:function aq(a,b,c,d){var _=this
_.a=a
_.d=b
_.f=c
_.r=d},
ep:function ep(){},
i6:function i6(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
i7:function i7(a){this.a=a},
i8:function i8(){},
i9:function i9(a){this.a=a},
ia:function ia(a){this.a=a},
ib:function ib(a){this.a=a},
ic:function ic(a){this.a=a},
id:function id(){},
el:function el(a){var _=this
_.a=a
_.d=_.c=_.b=0
_.e=!1},
n8(){var s,r,q=new A.j0(),p=v.G,o="web-worker:"+A.H(p.self.constructor.name)
p=A.iL(p.self)
s=new A.j1(new A.em(q,o,A.c0(t.S)))
if(typeof s=="function")A.cB(A.cE("Attempting to rewrap a JS function.",null))
r=function(a,b){return function(c){return a(b,c,arguments.length)}}(A.mb,s)
r[$.jC()]=s
p.onmessage=r
q.$1(B.i.an(t.G.a(A.R(["kind","hello","protocol",1,"build","588b9f95","backend",o],t.N,t.X)),null))},
j0:function j0(){},
j1:function j1(a){this.a=a},
kD(a){return v.mangledGlobalNames[a]},
nd(a){throw A.U(new A.bZ("Field '"+a+"' has been assigned during initialization."),new Error())},
a4(){throw A.U(A.lm(""),new Error())},
mb(a,b,c){t.k.a(a)
if(A.f(c)>=1)return a.$1(b)
return a.$0()},
ky(a,b,c){A.kr(c,t.H,"T","min")
return Math.min(c.a(a),c.a(b))},
kx(a,b,c){A.kr(c,t.H,"T","max")
return Math.max(c.a(a),c.a(b))},
n0(a,b,c,d,e,f,g,h){var s,r,q,p,o,n,m,l=null,k=f.J(a),j=!c
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
jg(a,b,c){var s=Math.max(0,a-c)
return s*s*b}},B={}
var w=[A,J,B]
var $={}
A.jd.prototype={}
J.cR.prototype={
ac(a,b){return a===b},
gR(a){return A.d8(a)},
q(a){return"Instance of '"+A.d9(a)+"'"},
gS(a){return A.aO(A.jp(this))}}
J.cT.prototype={
q(a){return String(a)},
gR(a){return a?519018:218159},
gS(a){return A.aO(t.y)},
$iA:1,
$ie:1}
J.bU.prototype={
ac(a,b){return null==b},
q(a){return"null"},
gR(a){return 0},
$iA:1}
J.bW.prototype={$iK:1}
J.aS.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.d6.prototype={}
J.bw.prototype={}
J.aR.prototype={
q(a){var s=a[$.kF()]
if(s==null)s=a[$.jC()]
if(s==null)return this.cn(a)
return"JavaScript function for "+J.bn(s)},
$iaH:1}
J.bV.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.bX.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.t.prototype={
l(a,b){A.h(a).c.a(b)
a.$flags&1&&A.cC(a,29)
a.push(b)},
ai(a,b){var s
a.$flags&1&&A.cC(a,"remove",1)
for(s=0;s<a.length;++s)if(J.an(a[s],b)){a.splice(s,1)
return!0}return!1},
F(a,b){var s
A.h(a).h("b<1>").a(b)
a.$flags&1&&A.cC(a,"addAll",2)
if(Array.isArray(b)){this.ct(a,b)
return}for(s=J.E(b);s.j();)a.push(s.gn())},
ct(a,b){var s,r
t.gn.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.j(A.X(a))
for(r=0;r<s;++r)a.push(b[r])},
aB(a){a.$flags&1&&A.cC(a,"clear","clear")
a.length=0},
aF(a,b,c){var s=A.h(a)
return new A.O(a,s.E(c).h("1(2)").a(b),s.h("@<1>").E(c).h("O<1,2>"))},
dd(a,b){var s,r=A.c1(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.v(r,s,A.v(a[s]))
return r.join(b)},
bo(a,b){return A.Z(a,b,null,A.h(a).c)},
aa(a,b){var s,r,q
A.h(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.j(A.aB())
if(0>=s)return A.n(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.j(A.X(a))}return r},
G(a,b,c,d){var s,r,q
d.a(b)
A.h(a).E(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.j(A.X(a))}return r},
ao(a,b){var s,r,q
A.h(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.j(A.X(a))}throw A.j(A.aB())},
U(a,b){if(!(b>=0&&b<a.length))return A.n(a,b)
return a[b]},
gD(a){if(a.length>0)return a[0]
throw A.j(A.aB())},
gaD(a){var s=a.length
if(s>0)return a[s-1]
throw A.j(A.aB())},
I(a,b){var s,r
A.h(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.j(A.X(a))}return!1},
c1(a,b){var s,r
A.h(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.j(A.X(a))}return!0},
A(a,b){var s,r,q,p,o,n=A.h(a)
n.h("a(1,1)?").a(b)
a.$flags&2&&A.cC(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dD()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.ds(b,2))
if(p>0)this.cK(a,p)},
cK(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
p(a,b){var s
for(s=0;s<a.length;++s)if(J.an(a[s],b))return!0
return!1},
ga3(a){return a.length===0},
gap(a){return a.length!==0},
q(a){return A.jc(a,"[","]")},
gC(a){return new J.b1(a,a.length,A.h(a).h("b1<1>"))},
gR(a){return A.d8(a)},
gm(a){return a.length},
v(a,b,c){A.h(a).c.a(c)
a.$flags&2&&A.cC(a)
if(!(b>=0&&b<a.length))throw A.j(A.ks(a,b))
a[b]=c},
d8(a,b){var s
A.h(a).h("e(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$iq:1,
$ib:1,
$im:1}
J.cS.prototype={
dv(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.d9(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.h_.prototype={}
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
$iF:1}
J.bq.prototype={
t(a,b){var s
A.w(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaR(b)
if(this.gaR(a)===s)return 0
if(this.gaR(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaR(a){return a===0?1/a<0:a<0},
k(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.j(A.bc(""+a+".toInt()"))},
ag(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.j(A.bc(""+a+".ceil()"))},
X(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.j(A.bc(""+a+".floor()"))},
ca(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.j(A.bc(""+a+".round()"))},
B(a,b,c){if(B.c.t(b,c)>0)throw A.j(A.kn(b))
if(this.t(a,b)<0)return b
if(this.t(a,c)>0)return c
return a},
aU(a,b){var s
if(b>20)throw A.j(A.b9(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaR(a))return"-"+s
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
aX(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.bK(a,b)},
bb(a,b){return(a|0)===a?a/b|0:this.bK(a,b)},
bK(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.j(A.bc("Result of truncating division is "+A.v(s)+": "+A.v(a)+" ~/ "+b))},
bH(a,b){var s
if(a>0)s=this.cO(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cO(a,b){return b>31?0:a>>>b},
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
J.b5.prototype={
aJ(a,b,c){return a.substring(b,A.lv(b,c,a.length))},
bm(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.j(B.a_)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
df(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bm(c,s)+a},
t(a,b){var s
A.H(b)
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
gm(a){return a.length},
$iA:1,
$iG:1}
A.bZ.prototype={
q(a){return"LateInitializationError: "+this.a}}
A.i3.prototype={}
A.q.prototype={}
A.k.prototype={
gC(a){var s=this
return new A.p(s,s.gm(s),A.l(s).h("p<k.E>"))},
ga3(a){return this.gm(this)===0},
I(a,b){var s,r,q=this
A.l(q).h("e(k.E)").a(b)
s=q.gm(q)
for(r=0;r<s;++r){if(b.$1(q.U(0,r)))return!0
if(s!==q.gm(q))throw A.j(A.X(q))}return!1},
aF(a,b,c){var s=A.l(this)
return new A.O(this,s.E(c).h("1(k.E)").a(b),s.h("@<k.E>").E(c).h("O<1,2>"))},
aa(a,b){var s,r,q,p=this
A.l(p).h("k.E(k.E,k.E)").a(b)
s=p.gm(p)
if(s===0)throw A.j(A.aB())
r=p.U(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.U(0,q))
if(s!==p.gm(p))throw A.j(A.X(p))}return r},
G(a,b,c,d){var s,r,q,p=this
d.a(b)
A.l(p).E(d).h("1(1,k.E)").a(c)
s=p.gm(p)
for(r=b,q=0;q<s;++q){r=c.$2(r,p.U(0,q))
if(s!==p.gm(p))throw A.j(A.X(p))}return r},
du(a){var s,r=this,q=A.ln(A.l(r).h("k.E"))
for(s=0;s<r.gm(r);++s)q.l(0,r.U(0,s))
return q}}
A.x.prototype={
V(a,b,c,d){var s,r=this.b
A.cb(r,"start")
s=this.c
if(s!=null){A.cb(s,"end")
if(r>s)throw A.j(A.b9(r,0,s,"start",null))}},
gcE(){var s=J.bm(this.a),r=this.c
if(r==null||r>s)return s
return r},
gcQ(){var s=J.bm(this.a),r=this.b
if(r>s)return s
return r},
gm(a){var s,r=J.bm(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
U(a,b){var s=this,r=s.gcQ()+b
if(b<0||r>=s.gcE())throw A.j(A.jb(b,s.gm(0),s,"index"))
return J.j7(s.a,r)},
ab(a){var s,r,q,p=this,o=p.b,n=p.a,m=J.cA(n),l=m.gm(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.jO(0,p.$ti.c)
return n}r=A.c1(s,m.U(n,o),!0,p.$ti.c)
for(q=1;q<s;++q){B.a.v(r,q,m.U(n,o+q))
if(m.gm(n)<l)throw A.j(A.X(p))}return r}}
A.p.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=J.cA(q),o=p.gm(q)
if(r.b!==o)throw A.j(A.X(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.U(q,s);++r.c
return!0},
$iF:1}
A.b8.prototype={
gC(a){return new A.c3(J.E(this.a),this.b,A.l(this).h("c3<1,2>"))},
gm(a){return J.bm(this.a)}}
A.bN.prototype={$iq:1}
A.c3.prototype={
j(){var s=this,r=s.b
if(r.j()){s.a=s.c.$1(r.gn())
return!0}s.a=null
return!1},
gn(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iF:1}
A.O.prototype={
gm(a){return J.bm(this.a)},
U(a,b){return this.b.$1(J.j7(this.a,b))}}
A.d.prototype={
gC(a){return new A.P(J.E(this.a),this.b,this.$ti.h("P<1>"))}}
A.P.prototype={
j(){var s,r
for(s=this.a,r=this.b;s.j();)if(r.$1(s.gn()))return!0
return!1},
gn(){return this.a.gn()},
$iF:1}
A.bR.prototype={
gC(a){return new A.bS(J.E(this.a),this.b,B.T,this.$ti.h("bS<1,2>"))}}
A.bS.prototype={
gn(){var s=this.d
return s==null?this.$ti.y[1].a(s):s},
j(){var s,r,q=this,p=q.c
if(p==null)return!1
for(s=q.a,r=q.b;!p.j();){q.d=null
if(s.j()){q.c=null
p=J.E(r.$1(s.gn()))
q.c=p}else return!1}q.d=q.c.gn()
return!0},
$iF:1}
A.ba.prototype={
gC(a){var s=this.a
return new A.bb(s.gC(s),this.b,A.l(this).h("bb<1>"))}}
A.bO.prototype={
gm(a){var s=this.a,r=s.gm(s)
s=this.b
if(r>s)return s
return r},
$iq:1}
A.bb.prototype={
j(){if(--this.b>=0)return this.a.j()
this.b=-1
return!1},
gn(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gn()},
$iF:1}
A.bP.prototype={
j(){return!1},
gn(){throw A.j(A.aB())},
$iF:1}
A.bx.prototype={
gC(a){return new A.ch(J.E(this.a),this.$ti.h("ch<1>"))}}
A.ch.prototype={
j(){var s,r
for(s=this.a,r=this.$ti.c;s.j();)if(r.b(s.gn()))return!0
return!1},
gn(){return this.$ti.c.a(this.a.gn())},
$iF:1}
A.I.prototype={
sm(a,b){throw A.j(A.bc("Cannot change the length of a fixed-length list"))},
l(a,b){A.ay(a).h("I.E").a(b)
throw A.j(A.bc("Cannot add to a fixed-length list"))}}
A.L.prototype={
gm(a){return this.a.length},
U(a,b){var s=this.a
return J.j7(s,s.length-1-b)}}
A.aW.prototype={$r:"+(1,2,3)",$s:1}
A.aM.prototype={$r:"+breakthrough,lower,teamSize,upper(1,2,3,4)",$s:2}
A.bz.prototype={$r:"+high,low,selfHigh,selfLow(1,2,3,4)",$s:3}
A.bK.prototype={}
A.bJ.prototype={
ga3(a){return this.gm(this)===0},
gap(a){return this.gm(this)!==0},
q(a){return A.h7(this)},
gah(){return new A.av(this.d6(),A.l(this).h("av<a9<1,2>>"))},
d6(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gah(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.ga8(),o=o.gC(o),n=A.l(s),m=n.y[1],n=n.h("a9<1,2>")
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
A.bL.prototype={
gm(a){return this.b.length},
gbA(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
a0(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
i(a,b){if(!this.a0(b))return null
return this.b[this.a[b]]},
a7(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbA()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
ga8(){return new A.bf(this.gbA(),this.$ti.h("bf<1>"))},
gar(){return new A.bf(this.b,this.$ti.h("bf<2>"))}}
A.bf.prototype={
gm(a){return this.a.length},
gC(a){var s=this.a
return new A.ci(s,s.length,this.$ti.h("ci<1>"))}}
A.ci.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iF:1}
A.cQ.prototype={
ac(a,b){if(b==null)return!1
return b instanceof A.b3&&this.a.ac(0,b.a)&&A.jx(this)===A.jx(b)},
gR(a){return A.jh(this.a,A.jx(this),B.o,B.o)},
q(a){var s=B.a.dd([A.aO(this.$ti.c)],", ")
return this.a.q(0)+" with "+("<"+s+">")}}
A.b3.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.n5(A.iT(this.a),this.$ti)}}
A.hC.prototype={
$0(){return B.b.X(1000*this.a.now())},
$S:5}
A.cc.prototype={}
A.ie.prototype={
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
A.h9.prototype={
q(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.bQ.prototype={}
A.co.prototype={
q(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iaU:1}
A.a5.prototype={
q(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.kE(r==null?"unknown":r)+"'"},
$iaH:1,
gdB(){return this},
$C:"$1",
$R:1,
$D:null}
A.cH.prototype={$C:"$0",$R:0}
A.cI.prototype={$C:"$2",$R:2}
A.dc.prototype={}
A.db.prototype={
q(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.kE(s)+"'"}}
A.bp.prototype={
ac(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bp))return!1
return this.$_target===b.$_target&&this.a===b.a},
gR(a){return(A.kz(this.a)^A.d8(this.$_target))>>>0},
q(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.d9(this.a)+"'")}}
A.da.prototype={
q(a){return"RuntimeError: "+this.a}}
A.aI.prototype={
gm(a){return this.a},
ga3(a){return this.a===0},
ga8(){return new A.a7(this,A.l(this).h("a7<1>"))},
gah(){return new A.b6(this,A.l(this).h("b6<1,2>"))},
a0(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.d9(a)},
d9(a){var s=this.d
if(s==null)return!1
return this.bh(this.by(s,a),a)>=0},
F(a,b){A.l(this).h("a8<1,2>").a(b).a7(0,new A.h0(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.da(b)},
da(a){var s,r,q=this.d
if(q==null)return null
s=this.by(q,a)
r=this.bh(s,a)
if(r<0)return null
return s[r].b},
v(a,b,c){var s,r,q=this,p=A.l(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bs(s==null?q.b=q.b9():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bs(r==null?q.c=q.b9():r,b,c)}else q.dc(b,c)},
dc(a,b){var s,r,q,p,o=this,n=A.l(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.b9()
r=o.c3(a)
q=s[r]
if(q==null)s[r]=[o.ba(a,b)]
else{p=o.bh(q,a)
if(p>=0)q[p].b=b
else q.push(o.ba(a,b))}},
dh(a,b){var s,r,q=this,p=A.l(q)
p.c.a(a)
p.h("2()").a(b)
if(q.a0(a)){s=q.i(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.v(0,a,r)
return r},
ai(a,b){var s=this.cq(this.b,b)
return s},
aB(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.b8()}},
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
if(s==null)a[b]=this.ba(b,c)
else s.b=c},
cq(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.cr(s)
delete a[b]
return s.b},
b8(){this.r=this.r+1&1073741823},
ba(a,b){var s=this,r=A.l(s),q=new A.h4(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.b8()
return q},
cr(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.b8()},
c3(a){return J.af(a)&1073741823},
by(a,b){return a[this.c3(b)]},
bh(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.an(a[r].a,b))return r
return-1},
q(a){return A.h7(this)},
b9(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ijQ:1}
A.h0.prototype={
$2(a,b){var s=this.a,r=A.l(s)
s.v(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.l(this.a).h("~(1,2)")}}
A.h4.prototype={}
A.a7.prototype={
gm(a){return this.a.a},
ga3(a){return this.a.a===0},
gC(a){var s=this.a
return new A.b7(s,s.r,s.e,this.$ti.h("b7<1>"))},
p(a,b){return this.a.a0(b)}}
A.b7.prototype={
gn(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.X(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iF:1}
A.ai.prototype={
gm(a){return this.a.a},
gC(a){var s=this.a
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
$iF:1}
A.b6.prototype={
gm(a){return this.a.a},
gC(a){var s=this.a
return new A.c_(s,s.r,s.e,this.$ti.h("c_<1,2>"))}}
A.c_.prototype={
gn(){var s=this.d
s.toString
return s},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.X(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.a9(s.a,s.b,r.$ti.h("a9<1,2>"))
r.c=s.c
return!0}},
$iF:1}
A.iX.prototype={
$1(a){return this.a(a)},
$S:26}
A.iY.prototype={
$2(a,b){return this.a(a,b)},
$S:38}
A.iZ.prototype={
$1(a){return this.a(A.H(a))},
$S:51}
A.aC.prototype={
q(a){return this.bM(!1)},
bM(a){var s,r,q,p,o,n=this.cF(),m=this.b7(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.n(m,q)
o=m[q]
l=a?l+A.jU(o):l+A.v(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
cF(){var s,r=this.$s
while($.iD.length<=r)B.a.l($.iD,null)
s=$.iD[r]
if(s==null){s=this.cB()
B.a.v($.iD,r,s)}return s},
cB(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.c(new Array(l),t.Q)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.v(k,q,r[s])}}return A.aT(k,t.K)}}
A.by.prototype={
b7(){return[this.a,this.b,this.c]},
ac(a,b){var s=this
if(b==null)return!1
return b instanceof A.by&&s.$s===b.$s&&J.an(s.a,b.a)&&J.an(s.b,b.b)&&J.an(s.c,b.c)},
gR(a){var s=this
return A.jh(s.$s,s.a,s.b,s.c)}}
A.bi.prototype={
b7(){return this.a},
ac(a,b){if(b==null)return!1
return b instanceof A.bi&&this.$s===b.$s&&A.lS(this.a,b.a)},
gR(a){return A.jh(this.$s,A.lq(this.a),B.o,B.o)}}
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
A.c4.prototype={$iq:1,$ib:1,$im:1}
A.c5.prototype={$iq:1,$ib:1,$im:1}
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
$ijl:1}
A.cj.prototype={}
A.ck.prototype={}
A.cl.prototype={}
A.cm.prototype={}
A.as.prototype={
h(a){return A.cs(v.typeUniverse,this,a)},
E(a){return A.ka(v.typeUniverse,this,a)}}
A.dj.prototype={}
A.iH.prototype={
q(a){return A.ab(this.a,null)}}
A.di.prototype={
q(a){return this.a}}
A.bA.prototype={$iaK:1}
A.ii.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:24}
A.ih.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:43}
A.ij.prototype={
$0(){this.a.$0()},
$S:25}
A.ik.prototype={
$0(){this.a.$0()},
$S:25}
A.iF.prototype={
cp(a,b){if(self.setTimeout!=null)self.setTimeout(A.ds(new A.iG(this,b),0),a)
else throw A.j(A.bc("`setTimeout()` not found."))}}
A.iG.prototype={
$0(){this.b.$0()},
$S:3}
A.df.prototype={}
A.iM.prototype={
$1(a){return this.a.$2(0,a)},
$S:48}
A.iN.prototype={
$2(a,b){this.a.$2(1,new A.bQ(a,t.l.a(b)))},
$S:60}
A.iQ.prototype={
$2(a,b){this.a(A.f(a),b)},
$S:35}
A.aN.prototype={
gn(){var s=this.b
return s==null?this.$ti.c.a(s):s},
cL(a,b){var s,r,q
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
o.d=null}q=o.cL(m,n)
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
if(a instanceof A.av){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.l(r,q.a)
q.a=s
return 2}else{q.d=J.E(a)
return 2}},
$iF:1}
A.av.prototype={
gC(a){return new A.aN(this.a(),this.$ti.h("aN<1>"))}}
A.ap.prototype={
q(a){return A.v(this.a)},
$iC:1,
gaI(){return this.b}}
A.fZ.prototype={
$0(){this.c.a(null)
this.b.cz(null)},
$S:3}
A.bd.prototype={
de(a){if((this.c&15)!==6)return!0
return this.b.b.bl(t.al.a(this.d),a.a,t.y,t.K)},
d7(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.dr(q,m,a.b,o,n,t.l)
else p=l.bl(t.B.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.aP(s))){if((r.c&1)!==0)throw A.j(A.cE("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.j(A.cE("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.V.prototype={
cc(a,b,c){var s,r,q=this.$ti
q.E(c).h("1/(2)").a(a)
s=$.M
if(s===B.j){if(!t.C.b(b)&&!t.B.b(b))throw A.j(A.en(b,"onError",u.c))}else{c.h("@<0/>").E(q.c).h("1(2)").a(a)
b=A.mD(b,s)}r=new A.V(s,c.h("V<0>"))
this.aY(new A.bd(r,3,a,b,q.h("@<1>").E(c).h("bd<1,2>")))
return r},
bL(a,b,c){var s,r=this.$ti
r.E(c).h("1/(2)").a(a)
s=new A.V($.M,c.h("V<0>"))
this.aY(new A.bd(s,19,a,b,r.h("@<1>").E(c).h("bd<1,2>")))
return s},
cN(a){this.a=this.a&1|16
this.c=a},
aK(a){this.a=a.a&30|this.a&1
this.c=a.c},
aY(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.aY(a)
return}r.aK(s)}A.dr(null,null,r.b,t.M.a(new A.im(r,a)))}},
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
A.dr(null,null,m.b,t.M.a(new A.is(l,m)))}},
av(){var s=t.F.a(this.c)
this.c=null
return this.aM(s)},
aM(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
cz(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("aQ<1>").b(a))A.iq(a,r,!0)
else{s=r.av()
q.c.a(a)
r.a=8
r.c=a
A.be(r,s)}},
bx(a){var s,r=this
r.$ti.c.a(a)
s=r.av()
r.a=8
r.c=a
A.be(r,s)},
cA(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.av()
q.aK(a)
A.be(q,r)},
b1(a){var s=this.av()
this.cN(a)
A.be(this,s)},
cv(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("aQ<1>").b(a)){this.bv(a)
return}this.cw(a)},
cw(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dr(null,null,s.b,t.M.a(new A.ip(s,a)))},
bv(a){A.iq(this.$ti.h("aQ<1>").a(a),this,!1)
return},
bu(a){this.a^=2
A.dr(null,null,this.b,t.M.a(new A.io(this,a)))},
$iaQ:1}
A.im.prototype={
$0(){A.be(this.a,this.b)},
$S:3}
A.is.prototype={
$0(){A.be(this.b,this.a.a)},
$S:3}
A.ir.prototype={
$0(){A.iq(this.a.a,this.b,!0)},
$S:3}
A.ip.prototype={
$0(){this.a.bx(this.b)},
$S:3}
A.io.prototype={
$0(){this.a.b1(this.b)},
$S:3}
A.iv.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dq(t.fO.a(q.d),t.z)}catch(p){s=A.aP(p)
r=A.bG(p)
if(k.c&&t.u.a(k.b.a.c).a===s){q=k.a
q.c=t.u.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.ja(q)
n=k.a
n.c=new A.ap(q,o)
q=n}q.b=!0
return}if(j instanceof A.V&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.u.a(j.c)
q.b=!0}return}if(j instanceof A.V){m=k.b.a
l=new A.V(m.b,m.$ti)
j.cc(new A.iw(l,m),new A.ix(l),t.x)
q=k.a
q.c=l
q.b=!1}},
$S:3}
A.iw.prototype={
$1(a){this.a.cA(this.b)},
$S:24}
A.ix.prototype={
$2(a,b){A.cv(a)
t.l.a(b)
this.a.b1(new A.ap(a,b))},
$S:59}
A.iu.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bl(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aP(l)
r=A.bG(l)
q=s
p=r
if(p==null)p=A.ja(q)
o=this.a
o.c=new A.ap(q,p)
o.b=!0}},
$S:3}
A.it.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.u.a(l.a.a.c)
p=l.b
if(p.a.de(s)&&p.a.e!=null){p.c=p.a.d7(s)
p.b=!1}}catch(o){r=A.aP(o)
q=A.bG(o)
p=t.u.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.ja(p)
m=l.b
m.c=new A.ap(p,n)
p=m}p.b=!0}},
$S:3}
A.dg.prototype={}
A.dp.prototype={}
A.cu.prototype={$ik_:1}
A.dn.prototype={
ds(a){var s,r,q
t.M.a(a)
try{if(B.j===$.M){a.$0()
return}A.kj(null,null,this,a,t.x)}catch(q){s=A.aP(q)
r=A.bG(q)
A.js(A.cv(s),t.l.a(r))}},
bT(a){return new A.iE(this,t.M.a(a))},
dq(a,b){b.h("0()").a(a)
if($.M===B.j)return a.$0()
return A.kj(null,null,this,a,b)},
bl(a,b,c,d){c.h("@<0>").E(d).h("1(2)").a(a)
d.a(b)
if($.M===B.j)return a.$1(b)
return A.mF(null,null,this,a,b,c,d)},
dr(a,b,c,d,e,f){d.h("@<0>").E(e).E(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.M===B.j)return a.$2(b,c)
return A.mE(null,null,this,a,b,c,d,e,f)},
c9(a,b,c,d){return b.h("@<0>").E(c).E(d).h("1(2,3)").a(a)}}
A.iE.prototype={
$0(){return this.a.ds(this.b)},
$S:3}
A.iP.prototype={
$0(){A.lc(this.a,this.b)},
$S:3}
A.at.prototype={
cG(){return new A.at(A.l(this).h("at<1>"))},
gC(a){var s=this,r=new A.bg(s,s.r,A.l(s).h("bg<1>"))
r.c=s.e
return r},
gm(a){return this.a},
p(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cC(b)},
cC(a){var s=this.d
if(s==null)return!1
return this.b6(s[this.b2(a)],a)>=0},
l(a,b){var s,r,q=this
A.l(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bw(s==null?q.b=A.jm():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bw(r==null?q.c=A.jm():r,b)}else return q.cs(b)},
cs(a){var s,r,q,p=this
A.l(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jm()
r=p.b2(a)
q=s[r]
if(q==null)s[r]=[p.b0(a)]
else{if(p.b6(q,a)>=0)return!1
q.push(p.b0(a))}return!0},
ai(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bG(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bG(s.c,b)
else return s.cJ(b)},
cJ(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.b2(a)
r=n[s]
q=o.b6(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bN(p)
return!0},
bw(a,b){A.l(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.b0(b)
return!0},
bG(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bN(s)
delete a[b]
return!0},
b_(){this.r=this.r+1&1073741823},
b0(a){var s,r=this,q=new A.dm(A.l(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.b_()
return q},
bN(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.b_()},
b2(a){return J.af(a)&1073741823},
b6(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.an(a[r].a,b))return r
return-1},
$ijS:1}
A.dm.prototype={}
A.bg.prototype={
gn(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.j(A.X(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iF:1}
A.h5.prototype={
$2(a,b){this.a.v(0,this.b.a(a),this.c.a(b))},
$S:45}
A.B.prototype={
gC(a){return new A.p(a,a.length,A.ay(a).h("p<B.E>"))},
U(a,b){if(!(b>=0&&b<a.length))return A.n(a,b)
return a[b]},
ga3(a){return a.length===0},
gap(a){return a.length!==0},
gD(a){var s=a.length
if(s===0)throw A.j(A.aB())
if(0>=s)return A.n(a,0)
return a[0]},
gaD(a){var s,r=a.length
if(r===0)throw A.j(A.aB())
s=r-1
if(!(s>=0))return A.n(a,s)
return a[s]},
aF(a,b,c){var s=A.ay(a)
return new A.O(a,s.E(c).h("1(B.E)").a(b),s.h("@<B.E>").E(c).h("O<1,2>"))},
G(a,b,c,d){var s,r,q,p
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
q(a){return A.jc(a,"[","]")}}
A.D.prototype={
a7(a,b){var s,r,q,p=A.l(this)
p.h("~(D.K,D.V)").a(b)
for(s=this.ga8(),s=s.gC(s),p=p.h("D.V");s.j();){r=s.gn()
q=this.i(0,r)
b.$2(r,q==null?p.a(q):q)}},
aG(a,b,c){var s,r=this,q=A.l(r)
q.h("D.K").a(a)
q.h("D.V(D.V)").a(b)
q.h("D.V()?").a(c)
if(r.a0(a)){s=r.i(0,a)
q=b.$1(s==null?q.h("D.V").a(s):s)
r.v(0,a,q)
return q}q=c.$0()
r.v(0,a,q)
return q},
gah(){return this.ga8().aF(0,new A.h6(this),A.l(this).h("a9<D.K,D.V>"))},
a0(a){return this.ga8().p(0,a)},
gm(a){var s=this.ga8()
return s.gm(s)},
ga3(a){var s=this.ga8()
return s.ga3(s)},
q(a){return A.h7(this)},
$ia8:1}
A.h6.prototype={
$1(a){var s=this.a,r=A.l(s)
r.h("D.K").a(a)
s=s.i(0,a)
if(s==null)s=r.h("D.V").a(s)
return new A.a9(a,s,r.h("a9<D.K,D.V>"))},
$S(){return A.l(this.a).h("a9<D.K,D.V>(D.K)")}}
A.h8.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.v(a)
r.a=(r.a+=s)+": "
s=A.v(b)
r.a+=s},
$S:22}
A.ct.prototype={}
A.br.prototype={
i(a,b){return this.a.i(0,b)},
a7(a,b){this.a.a7(0,this.$ti.h("~(1,2)").a(b))},
ga3(a){return this.a.a===0},
gap(a){return this.a.a!==0},
gm(a){return this.a.a},
q(a){return A.h7(this.a)},
gar(){var s=this.a
return new A.ai(s,A.l(s).h("ai<2>"))},
gah(){var s=this.a
return new A.b6(s,A.l(s).h("b6<1,2>"))},
$ia8:1}
A.cf.prototype={}
A.bu.prototype={
F(a,b){var s
A.l(this).h("b<1>").a(b)
for(s=b.gC(b);s.j();)this.l(0,s.gn())},
q(a){return A.jc(this,"{","}")},
G(a,b,c,d){var s,r,q,p
d.a(b)
s=A.l(this)
s.E(d).h("1(1,2)").a(c)
for(s=A.iC(this,this.r,s.c),r=s.$ti.c,q=b;s.j();){p=s.d
q=c.$2(q,p==null?r.a(p):p)}return q},
I(a,b){var s,r,q=A.l(this)
q.h("e(1)").a(b)
for(q=A.iC(this,this.r,q.c),s=q.$ti.c;q.j();){r=q.d
if(b.$1(r==null?s.a(r):r))return!0}return!1},
$iq:1,
$ib:1,
$ijj:1}
A.cn.prototype={
d4(a){var s,r,q,p=this,o=p.cG()
for(s=A.iC(p,p.r,A.l(p).c),r=s.$ti.c;s.j();){q=s.d
if(q==null)q=r.a(q)
if(!a.p(0,q))o.l(0,q)}return o}}
A.bB.prototype={}
A.dk.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cH(b):s}},
gm(a){return this.b==null?this.c.a:this.au().length},
ga3(a){return this.gm(0)===0},
ga8(){if(this.b==null){var s=this.c
return new A.a7(s,A.l(s).h("a7<1>"))}return new A.dl(this)},
v(a,b,c){var s,r,q=this
A.H(b)
if(q.b==null)q.c.v(0,b,c)
else if(q.a0(b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.cS().v(0,b,c)},
a0(a){if(this.b==null)return this.c.a0(a)
return!1},
a7(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.a7(0,b)
s=o.au()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.iO(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.j(A.X(o))}},
au(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.c(Object.keys(this.a),t.s)
return s},
cS(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.Y(t.N,t.z)
r=n.au()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.v(0,o,n.i(0,o))}if(p===0)B.a.l(r,"")
else B.a.aB(r)
n.a=n.b=null
return n.c=s},
cH(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.iO(this.a[a])
return this.b[a]=s}}
A.dl.prototype={
gm(a){return this.a.gm(0)},
U(a,b){var s=this.a
if(s.b==null)s=s.ga8().U(0,b)
else{s=s.au()
if(!(b>=0&&b<s.length))return A.n(s,b)
s=s[b]}return s},
gC(a){var s=this.a
if(s.b==null){s=s.ga8()
s=s.gC(s)}else{s=s.au()
s=new J.b1(s,s.length,A.h(s).h("b1<1>"))}return s},
p(a,b){return this.a.a0(b)}}
A.cJ.prototype={}
A.cL.prototype={}
A.bY.prototype={
q(a){var s=A.cO(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.cW.prototype={
q(a){return"Cyclic error in JSON stringify"}}
A.h1.prototype={
d1(a,b){var s=A.mB(a,this.gd2().a)
return s},
an(a,b){var s=A.lJ(a,this.gd5().b,null)
return s},
gd5(){return B.ad},
gd2(){return B.ac}}
A.h3.prototype={}
A.h2.prototype={}
A.iA.prototype={
ce(a){var s,r,q,p,o,n,m=a.length
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
aZ(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.j(new A.cW(a,null))}B.a.l(s,a)},
aV(a){var s,r,q,p,o=this
if(o.cd(a))return
o.aZ(a)
try{s=o.b.$1(a)
if(!o.cd(s)){q=A.jP(a,null,o.gbB())
throw A.j(q)}q=o.a
if(0>=q.length)return A.n(q,-1)
q.pop()}catch(p){r=A.aP(p)
q=A.jP(a,r,o.gbB())
throw A.j(q)}},
cd(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.b.q(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.ce(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.aZ(a)
q.dz(a)
s=q.a
if(0>=s.length)return A.n(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.aZ(a)
r=q.dA(a)
s=q.a
if(0>=s.length)return A.n(s,-1)
s.pop()
return r}else return!1},
dz(a){var s,r=this.c
r.a+="["
if(J.kU(a)){if(0>=a.length)return A.n(a,0)
this.aV(a[0])
for(s=1;s<a.length;++s){r.a+=","
this.aV(a[s])}}r.a+="]"},
dA(a){var s,r,q,p,o,n,m=this,l={}
if(a.ga3(a)){m.c.a+="{}"
return!0}s=a.gm(a)*2
r=A.c1(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.a7(0,new A.iB(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.ce(A.H(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.n(r,n)
m.aV(r[n])}p.a+="}"
return!0}}
A.iB.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.v(s,r.a++,a)
B.a.v(s,r.a++,b)},
$S:22}
A.iz.prototype={
gbB(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.cM.prototype={
ac(a,b){if(b==null)return!1
return b instanceof A.cM},
gR(a){return B.c.gR(0)},
q(a){return"0:00:00."+B.q.df(B.c.q(0),6,"0")}}
A.dh.prototype={
q(a){return this.aL()},
$icN:1}
A.C.prototype={
gaI(){return A.ls(this)}}
A.cF.prototype={
q(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cO(s)
return"Assertion failed"}}
A.aK.prototype={}
A.aA.prototype={
gb4(){return"Invalid argument"+(!this.a?"(s)":"")},
gb3(){return""},
q(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gb4()+q+o
if(!s.a)return n
return n+s.gb3()+": "+A.cO(s.gbi())},
gbi(){return this.b}}
A.ca.prototype={
gbi(){return A.S(this.b)},
gb4(){return"RangeError"},
gb3(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.v(q):""
else if(q==null)s=": Not greater than or equal to "+A.v(r)
else if(q>r)s=": Not in inclusive range "+A.v(r)+".."+A.v(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.v(r)
return s}}
A.cP.prototype={
gbi(){return A.f(this.b)},
gb4(){return"RangeError"},
gb3(){if(A.f(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gm(a){return this.f}}
A.cg.prototype={
q(a){return"Unsupported operation: "+this.a}}
A.dd.prototype={
q(a){return"UnimplementedError: "+this.a}}
A.ce.prototype={
q(a){return"Bad state: "+this.a}}
A.cK.prototype={
q(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.cO(s)+"."}}
A.d5.prototype={
q(a){return"Out of Memory"},
gaI(){return null},
$iC:1}
A.cd.prototype={
q(a){return"Stack Overflow"},
gaI(){return null},
$iC:1}
A.il.prototype={
q(a){return"Exception: "+this.a}}
A.aG.prototype={
q(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.b.prototype={
aF(a,b,c){var s=A.l(this)
return A.lp(this,s.E(c).h("1(b.E)").a(b),s.h("b.E"),c)},
dw(a,b){var s=A.l(this)
return new A.d(this,s.h("e(b.E)").a(b),s.h("d<b.E>"))},
G(a,b,c,d){var s,r
d.a(b)
A.l(this).E(d).h("1(1,b.E)").a(c)
for(s=this.gC(this),r=b;s.j();)r=c.$2(r,s.gn())
return r},
I(a,b){var s
A.l(this).h("e(b.E)").a(b)
for(s=this.gC(this);s.j();)if(b.$1(s.gn()))return!0
return!1},
gm(a){var s,r=this.gC(this)
for(s=0;r.j();)++s
return s},
gD(a){var s=this.gC(this)
if(!s.j())throw A.j(A.aB())
return s.gn()},
gaD(a){var s,r=this.gC(this)
if(!r.j())throw A.j(A.aB())
do s=r.gn()
while(r.j())
return s},
U(a,b){var s,r
A.cb(b,"index")
s=this.gC(this)
for(r=b;s.j();){if(r===0)return s.gn();--r}throw A.j(A.jb(b,b-r,this,"index"))},
q(a){return A.lj(this,"(",")")}}
A.a9.prototype={
q(a){return"MapEntry("+A.v(this.a)+": "+A.v(this.b)+")"}}
A.aa.prototype={
gR(a){return A.y.prototype.gR.call(this,0)},
q(a){return"null"}}
A.y.prototype={$iy:1,
ac(a,b){return this===b},
gR(a){return A.d8(this)},
q(a){return"Instance of '"+A.d9(this)+"'"},
gS(a){return A.mZ(this)},
toString(){return this.q(this)}}
A.dq.prototype={
q(a){return""},
$iaU:1}
A.i4.prototype={
gc_(){var s,r=this.b
if(r==null)r=$.hE.$0()
s=r-this.a
if($.jD()===1e6)return s
return s*1000},
bp(){var s=this,r=s.b
if(r!=null){s.a=s.a+($.hE.$0()-r)
s.b=null}}}
A.bv.prototype={
gm(a){return this.a.length},
q(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ily:1}
A.aV.prototype={}
A.eo.prototype={}
A.aF.prototype={
gbR(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=t.S,f=A.Y(g,g)
for(g=h.y,g=new A.ah(g,g.r,g.e,A.l(g).h("ah<2>")),s=h.a,r=h.z,q=h.Q,p=s.b,o=s.a;g.j();){n=g.d
m=s.a1(n.a)
l=!0
if(n.as){k=n.d
if(k!=null)if(m!=null)if(!m.fy)if(!(m.f<=0)){j=m.a
if(!r.p(0,j)){i=m.as
if(!((i===B.f||i===B.e)&&!q.p(0,j)))if(n.y>=p){l=s.K(k)
l=(l==null?null:l.b)!==o}}}}if(l)continue
n=n.d
n.toString
f.aG(n,new A.dy(),new A.dz())}return f},
M(){var s,r=this,q=r.y,p=A.l(q).h("ai<2>")
q=A.o(new A.ai(q,p),p.h("b.E"))
s=A.jG(r.a,r.b,r.c,q)
s.d=r.d
s.e=r.e
s.f=r.f
s.r=r.r
q=s.w
q.aB(0)
q.F(0,r.w)
q=s.x
q.aB(0)
q.F(0,r.x)
s.z.F(0,r.z)
s.Q.F(0,r.Q)
s.as.F(0,r.as)
s.at.F(0,r.at)
s.ax.F(0,r.ax)
B.a.F(s.ay,r.ay)
return s},
u(a){var s=this.a.u(a),r=A.h(s),q=r.h("d<1>")
s=A.o(new A.d(s,r.h("e(1)").a(new A.dW(this)),q),q.h("b.E"))
return s},
O(a){var s
if(a.at==null){s=this.x.i(0,a.a)
if(s==null)s=a.d}else s=a.gad()
return s},
L(a){var s,r=this.u(a).length,q=this.gbR().i(0,a)
if(q==null)q=0
s=this.at.p(0,a)?1:0
return r+q+s},
bS(a){var s,r=this,q=r.a.r,p=A.h(q)
p=new A.d(q,p.h("e(1)").a(new A.dA(r,a)),p.h("d<1>")).gm(0)
q=r.gbR().i(0,a)
if(q==null)q=0
s=r.at.p(0,a)?1:0
return p+q+s},
aP(a){var s,r,q,p,o=this.a,n=a.c,m=o.K(n)
if(m==null)return!1
o=o.u(n)
n=A.h(o)
s=n.h("d<1>")
r=A.o(new A.d(o,n.h("e(1)").a(new A.dD(this)),s),s.h("b.E"))
if(r.length<=1)return!1
o=A.h(r)
n=o.h("e(1)")
o=o.h("d<1>")
q=A.b4(new A.d(r,n.a(new A.dE()),o),t.r)
if(q!=null)return a.a!==q.a
s=new A.dH(this,m)
B.a.A(r,new A.dF(s))
p=s.$1(B.a.gD(r))
if(typeof p!=="number")return p.bm()
return a.a!==new A.d(r,n.a(new A.dG(s,p*0.6)),o).gaD(0).a},
ae(d2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4=this,c5="monthSeconds",c6="supplySafety",c7="supplySeconds",c8="battleBudget",c9=c4.b,d0=c9.b,d1=d0.i(0,c5)
d1.toString
s=d0.i(0,c6)
s.toString
r=d1+s
d1=c4.ay
s=A.o(d1,t.gf)
for(q=c4.a,p=q.r,o=A.h(p),n=o.h("e(1)"),m=n.a(new A.dI(c4)),l=B.a.gC(p),m=new A.P(l,m,o.h("P<1>")),k=c4.y,j=c4.c,o=o.h("d<1>"),c9=c9.r,i=c9.CW,h=q.b/60,g=c9.d,f=c9.p1;m.j();){c9=l.gn()
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
a1+=j.Z(a0,a4)}}else{a2=e!=null
if(a2&&e.as){a0=c9.z
for(c=J.j9(e.w,e.x),a2=c.$ti,c=new A.p(c,c.gm(0),a2.h("p<k.E>")),a2=a2.h("k.E"),a1=g;c.j();a0=a6){a5=c.d
a6=a5==null?a2.a(a5):a5
a1+=j.Z(a0,a6)}}else{a5=c9.cx
if(a5!=null){a7=q.K(a5)
a7=a7==null?null:a7.b
a7=a7===c9.b&&c9.CW!=null}else a7=!1
if(a7){c=c9.z
a2=c9.CW
a2.toString
a1=j.Z(c,a2)+g}else if(a2&&!e.as){c=e.z
a2=e.Q
a5=d0.i(0,c7)
a5.toString
a1=Math.max(0,c/60-i+a2*a5-h)
c=c9.CW
if(c!=null)a1=Math.max(a1,j.Z(c9.z,c))}else{a2=c9.CW
if(a2!=null&&!c){a8=j.Z(c9.z,a2)
a9=q.K(a5)
a1=Math.max(r,a8)
if(a9!=null&&a9.b!==c9.b){b0=new A.d(p,n.a(new A.dJ(c9,a9)),o).gm(0)
c=a9.at
if(c==null)c=a9.d
else{a2=a9.ax
a5=a9.cy?1:0
a5=B.c.B(c-a2-a5,0,5)
c=a5}b1=Math.max(1,Math.min(c,q.u(a9.a).length))
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
b3=new A.d(p,n.a(new A.dK(c4)),o).G(0,c4.r,new A.dL(),c9)
b4=new A.d(p,n.a(new A.dM(c4)),o).G(0,c4.r,new A.dN(),c9)
o=q.gN()
n=o.$ti
p=n.h("d<b.E>")
b5=A.o(new A.d(o,n.h("e(b.E)").a(new A.dO(c4)),p),p.h("b.E"))
if(b5.length===0)d1=0
else{d1=d0.i(0,"countryIncome")
d1.toString
d1=B.b.k(d1)
p=d0.i(0,"poorPenalty")
p.toString
p=d1-B.b.k(p)
d1=p}p=A.h(b5)
b6=new A.dT(c4,b3,d1+new A.d(b5,p.h("e(1)").a(new A.dP(c4)),p.h("d<1>")).G(0,0,new A.dQ(c4),c9),b4,c4.gc6())
b7=A.lo([r],t.i)
b8=A.c([],t.n)
b9=q.e
d1=r+1e-9
c0=b9
while(c0<=d1){b7.l(0,c0)
B.a.l(b8,c0)
q=d0.i(0,c5)
q.toString
c0+=q}for(d1=A.iC(b7,b7.r,b7.$ti.c),q=d1.$ti.c,c1=0;d1.j();){p=d1.d
if(p==null)p=q.a(p)
c2=B.a.G(s,0,new A.dR(p),c9)
if(p+1e-9<b9)c3=0
else{o=d0.i(0,c5)
o.toString
c3=1+B.b.X((p-b9)/o)}if(B.a.I(b8,new A.dS(p))){p=b6.$1(Math.max(0,c3-1))
if(typeof p!=="number")return A.jy(p)
c1=Math.max(c1,c2+p)}p=b6.$1(c3)
if(typeof p!=="number")return A.jy(p)
c1=Math.max(c1,c2+p)}c9=Math.max(0,c1)
if(d2)d0=s.length===0?0:1
else{d0=d0.i(0,"emergencyGold")
d0.toString
d0=B.b.k(d0)}return new A.eo(c9+d0)},
T(){return this.ae(!1)},
aH(a,b){var s,r,q,p,o,n,m,l,k,j=this,i="capacityPerLevel"
if(b.fr){s=b.a
s=j.z.p(0,s)||j.Q.p(0,s)}else s=!0
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
m=B.c.B(o[l]-b.x,0,99999)}if(q>=p.al(j.a.c)||m==null||j.d<m)return!1
if(a.b===a.c)k=1
else{o=p.b.i(0,"foreignYield")
o.toString
k=o}o=j.f
n=q+1
p=p.b
l=p.i(0,i)
l.toString
l=B.b.X(n*B.b.k(l)*k)
p=p.i(0,i)
p.toString
j.f=o+(l-B.b.X(q*B.b.k(p)*k))
j.d=j.d-m
s.v(0,r,n)
return!0},
gc6(){return this.a.gN().G(0,0,new A.dX(this),t.S)},
bZ(a){var s,r,q,p,o,n=this
if(!a.dy||a.e===2||n.z.p(0,a.a))return!1
s=a.as
r=s!==B.f
if(!r||s===B.e){q=a.c
q=!n.ax.p(0,q)&&n.u(q).length<=1}else q=!1
if(q)return!1
q=a.a
n.z.l(0,q)
n.y.ai(0,q)
n.as.l(0,q)
n.d=n.d+a.x
q=n.f
p=n.e
n.e=Math.min(q,p+(!r||s===B.e?a.gP():0))
if(!r||s===B.e)for(s=a.ax,r=s.length,q=n.w,o=0;o<r;++o)q.aG(s[o],new A.dU(),new A.dV())
return!0},
aA(a){var s,r=this,q=r.b.b.i(0,"soldierCost")
q.toString
s=a*B.b.k(q)
if(a<0||r.e+a>r.f||r.d<s)return!1
r.d-=s
r.e+=a
return!0},
bU(a){var s=this,r=s.b.f.i(0,a)
if(r==null||!r.f||s.a.c<r.e||s.d<r.b)return!1
s.d=s.d-r.b
s.w.aG(a,new A.dB(),new A.dC())
return!0},
bk(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=g.b,e=f.b,d=e.i(0,"drawCost")
d.toString
s=g.a
r=s.y
q=B.b.k(d)+r
d=s.r
p=A.h(d)
o=t.S
n=new A.d(d,p.h("e(1)").a(new A.dY(g)),p.h("d<1>")).G(0,g.r+r,new A.dZ(),o)
p=e.i(0,"countryIncome")
p.toString
p=B.b.k(p)
d=s.gN()
m=d.$ti
l=p+new A.d(d,m.h("e(b.E)").a(new A.e_(g)),m.h("d<b.E>")).G(0,0,new A.e0(g),o)
o=e.i(0,"garrisonFree")
k=B.b.k(o==null?2:o)
e=e.i(0,"garrisonFactor")
j=B.b.k(e==null?0:e)
e=a.a
i=g.L(e)
d=g.gc6()
p=A.jg(i+1,j,k)
o=A.jg(i,j,k)
m=!0
if(a.Q){h=g.at
if(!h.p(0,e))if(s.x>h.a)if(g.d>=q){h=b?1.3:1.1
if(!(n+(d+p-o)>l*h)){if(b)f=1
else if(c==null)f=f.r.r
else{f=A.al(c,s,f,null)
d=f.e.r
if(f.gW()){s=d.r
f=Math.max(s,Math.min(d.as,s+f.gaC()*0.2))}else f=d.r}f=n>l*f}else f=m}else f=m
else f=m
else f=m}else f=m
if(f)return!1
g.d-=q
g.r+=r
g.at.l(0,e)
return!0},
dk(a,b){return this.bk(a,!1,b)},
dj(a,b){return this.bk(a,b,null)},
d3(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(b)
if(a.db){s=a.a
s=l.as.p(0,s)||l.z.p(0,s)||l.d<=0}else s=!0
if(s)return!1
s=a.c
if(l.u(s).length<=1){r=!(l.ax.p(0,s)&&c.b==="evacuate"&&c.as)
s=r}else s=!1
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
q.v(0,m,o-1)}s.aB(0)
s.F(0,q)
s=l.e
r=p.i(0,"soldierLimit")
r.toString
l.e=s-Math.min(s,B.b.k(r)-a.gP())
r=a.a
l.Q.l(0,r)
l.as.l(0,r)
l.y.v(0,r,c)
p=p.i(0,"supplySeconds")
p.toString
B.a.l(l.ay,new A.aV(a.ch,1/p,d))
return!0},
dl(a,b){var s,r=this
if(!a.dx||r.as.p(0,a.a)||r.d<=0||a.fy)return!1
s=a.a
r.as.l(0,s)
r.y.v(0,s,b)
return!0}}
A.dy.prototype={
$1(a){return A.f(a)+1},
$S:6}
A.dz.prototype={
$0(){return 1},
$S:5}
A.dW.prototype={
$1(a){var s=this.a,r=t.r.a(a).a
return!s.z.p(0,r)&&!s.Q.p(0,r)},
$S:0}
A.dA.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.c===this.b&&a.f>0&&!a.fy&&!s.z.p(0,a.a)},
$S:0}
A.dD.prototype={
$1(a){return!this.a.z.p(0,t.r.a(a).a)},
$S:0}
A.dE.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.dH.prototype={
$1(a){var s=this.a,r=s.b,q=s.O(this.b),p=r.b.i(0,"soldierLimit")
p.toString
return A.dt(a,r,q,Math.min(B.b.k(p),s.e))},
$S:23}
A.dF.prototype={
$2(a,b){var s,r=t.r
r.a(a)
s=this.a
return J.j6(s.$1(r.a(b)),s.$1(a))},
$S:2}
A.dG.prototype={
$1(a){var s=this.a.$1(t.r.a(a))
if(typeof s!=="number")return s.dC()
return s>=this.b},
$S:0}
A.dI.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
if(a.b===s.a.a){r=a.as
s=!(r===B.f||r===B.e)&&!a.fy&&!s.z.p(0,a.a)}else s=!1
return s},
$S:0}
A.dJ.prototype={
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
A.dK.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.p(0,a.a)},
$S:0}
A.dL.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:12}
A.dM.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=s.a
return a.b===r.a&&a.f>0&&!s.z.p(0,a.a)&&a.p4===r.d},
$S:0}
A.dN.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:12}
A.dO.prototype={
$1(a){return!this.a.ax.p(0,t.q.a(a).a)},
$S:1}
A.dP.prototype={
$1(a){return!this.a.ax.p(0,t.q.a(a).a)},
$S:1}
A.dQ.prototype={
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
s.toString}return a+B.b.X((b.z+(r-1)*q)*s)},
$S:7}
A.dT.prototype={
$1(a){var s,r,q,p=this
if(a===0)s=0
else{s=p.a
r=s.a
q=r.gaq()
s=s.b.b.i(0,"monthSeconds")
s.toString
s=a*(p.b-p.c)-p.d+B.b.ag(q.r+p.e*(r.e/s+a-1))}return s},
$S:6}
A.dR.prototype={
$2(a,b){A.f(a)
t.gf.a(b)
return a+B.b.X(b.a+b.b*Math.min(this.a,b.c)+1e-9)},
$S:34}
A.dS.prototype={
$1(a){return Math.abs(A.ax(a)-this.a)<1e-7},
$S:19}
A.dX.prototype={
$2(a,b){var s,r,q
A.f(a)
s=this.a
r=s.L(t.q.a(b).a)
s=s.b.b
q=s.i(0,"garrisonFree")
q=B.b.k(q==null?2:q)
s=s.i(0,"garrisonFactor")
return a+A.jg(r,B.b.k(s==null?0:s),q)},
$S:7}
A.dU.prototype={
$1(a){return A.f(a)+1},
$S:6}
A.dV.prototype={
$0(){return 1},
$S:5}
A.dB.prototype={
$1(a){return A.f(a)+1},
$S:6}
A.dC.prototype={
$0(){return 1},
$S:5}
A.dY.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.p(0,a.a)},
$S:0}
A.dZ.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:12}
A.e_.prototype={
$1(a){return!this.a.ax.p(0,t.q.a(a).a)},
$S:1}
A.e0.prototype={
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
A.eq.prototype={
gW(){var s=this
return s.a!==s.d.a&&s.b>=s.e.r.w},
gb5(){return Math.max(0,this.b-this.e.r.w)},
gaC(){if(this.gW()){var s=this.e.r
s=Math.max(0,s.x+this.gb5()*s.y)}else s=0
return s},
cb(a,b){return a===0||!this.gW()||b<=1?a:Math.min(this.e.r.fy,a+1+B.c.bb(this.gb5(),2))}}
A.er.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.es.prototype={
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
A.et.prototype={
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
if(!b6.b.cT())return B.a2
if(q)q=B.a.G(l,0,new A.eu(),t.H)
else{q=b6.a.b.i(0,b7)
q.toString
q=p*B.b.k(q)}f=m+q
q=b6.a
l=q.b
e=l.i(0,b7)
e.toString
d=B.b.k(e)
c=Math.min(n,B.b.X(c2/d))
b=c*d+Math.max(0,c2-n*d)
if(o&&c2===0)o=B.a.G(j,0,new A.ev(),t.H)
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
if(h.a>=256)h.ai(0,new A.a7(h,A.l(h).h("a7<1>")).gD(0))
h.v(0,i,b5)
return b5},
cY(a,b,c,d,e,f){return this.am(a,b,c,!0,0,d,e,0,!0,f,0)},
d_(a,b,c,d,e,f,g,h){return this.am(a,b,c,d,0,e,f,0,g,h,0)},
bW(a,b,c,d){return this.am(a,b,0,!0,0,null,null,c,!0,d,0)},
bf(a,b,c,d,e,f){return this.am(a,b,0,c,0,null,null,d,e,f,0)},
cW(a,b,c,d,e){return this.am(a,b,0,c,0,null,null,0,d,null,e)},
cZ(a,b,c,d,e,f,g){return this.am(a,b,0,c,0,null,d,0,e,f,g)},
cX(a,b,c,d,e){return this.am(a,b,0,!0,c,null,null,d,!0,e,0)},
bC(a,b,c,d,e){var s=this.a,r=s.be(a.w,c,e,d)
s=s.b.i(0,"soldierPower")
s.toString
return(B.c.bb(r+b*B.b.k(s)+2,4)+1)*1.5*(1+B.b.B(a.ay/1000,0,0.1))},
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
A.eu.prototype={
$2(a,b){return A.w(a)+A.ax(b)},
$S:14}
A.ev.prototype={
$2(a,b){return A.w(a)+A.ax(b)},
$S:14}
A.iW.prototype={
$2(a,b){var s
A.w(a)
s=this.a.f.i(0,A.f(b))
s=s==null?null:s.c
if(s==null)s=0
return a+s*this.b.w},
$S:37}
A.cD.prototype={
H(){var s=this
return A.R(["interval",s.a,"resourceInterval",s.e,"cashBuffer",s.f,"payrollRatio",s.r,"dangerousCountryCities",s.w,"coalitionBudgetBase",s.x,"coalitionBudgetStep",s.y,"coalitionTargetBase",s.z,"coalitionTargetStep",s.Q,"coalitionPayrollCeiling",s.as,"coalitionTravel",s.at,"targetTravelScale",s.ax,"hatredTargetBonus",s.ay,"breakthroughMargin",s.ch,"threat",s.b,"urgent",s.c,"margin",s.d,"commit",s.CW,"rearExtra",s.cy,"candidates",s.db,"assessments",s.dx,"routes",s.dy,"plans",s.fr,"commands",s.fx,"team",s.fy,"fronts",s.k1,"singleFrontMonths",s.k2,"splitForce",s.k3,"splitAdvantage",s.k4,"arrivalSpread",s.ok,"expeditionSeconds",s.p1,"assaultCommitDistance",s.p2,"recallCriticalMargin",s.p3,"attritionCombat",s.p4,"attritionGain",s.R8,"targets",s.go,"slice",s.id,"advantage",s.RG,"expansion",s.ry,"credit",s.rx,"age",s.cx,"timeout",s.to,"restarts",s.x1,"stagnation",s.x2],t.N,t.X)}}
A.au.prototype={}
A.ex.prototype={
bq(){return new A.av(this.cm(),t.gL)},
cm(){var s=this
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
m===$&&A.a4()
l=s.f
l===$&&A.a4()
k=new A.i6(o,i9,m,l)
j=o.gN(),i=J.E(j.a),j=new A.P(i,j.b,j.$ti.h("P<1>")),h=s.x
case 3:if(!j.j()){r=4
break}g=i.gn()
h.v(0,g.a,k.dm(g))
r=5
return j0.b=0,1
case 5:r=3
break
case 4:j=i8.as
i=A.h(j)
g=i.h("d<1>")
j=A.o(new A.d(j,i.h("e(1)").a(new A.eP(s)),g),g.h("b.E"))
f=A.jG(o,i9,m,j)
i7.a=f
j=i8.x
r=j===B.F?6:7
break
case 6:o=s.r
o===$&&A.a4()
s.w=new A.hF(i8,i9,o,l,h).dg(f)
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
b===$&&A.a4()
a=new A.fb(i8,i9,c,l,b,h)
a0=A.l(h).h("ai<2>")
a1=a0.h("d<b.E>")
a2=A.o(new A.d(new A.ai(h,a0),a0.h("e(b.E)").a(new A.eQ()),a1),a1.h("b.E"))
B.a.A(a2,new A.eR())
a0=t.bQ
a3=A.c([new A.au(i7.a,A.c([],i),A.c([],g),0,0)],a0)
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
b9=a.bV(b4,b8.a),c0=b9.$ti,b9=new A.aN(b9.a(),c0.h("aN<1>")),c1=b8.d,c2=b8.e,c3=b8.c,c4=b8.b,c0=c0.c
case 15:if(!b9.j()){r=16
break}c5=b9.b
if(c5==null)c5=c0.a(c5)
c6=A.o(c4,a9)
B.a.F(c6,c5.b)
if(B.a.G(c6,0,new A.f1(),a6)>a8){c.e=!0
r=15
break}c7=c5.a
c8=A.o(c3,a5)
c9=c5.e
if(c9.length!==0)c8.push(c9)
c9=c5.c
c5=c5.d?1:0
B.a.l(b5,new A.au(c7,c6,c8,c1+c9,c2+c5))
r=17
return j0.b=1,1
case 17:r=15
break
case 16:case 13:a3.length===b6||(0,A.u)(a3),++b7
r=12
break
case 14:if(b5.length!==0){B.a.A(b5,new A.f4())
b6=A.f(Math.min(4,b2))
b9=new A.x(b5,0,b6,b1)
b9.V(b5,0,b6,b0)
a3=b9.ab(0)}case 10:a1.length===a4||(0,A.u)(a1),++b3
r=9
break
case 11:if(a2.length!==0&&!g){d0=B.a.gD(a3)
i7.a=d0.a
B.a.F(e,d0.b)
B.a.F(d,d0.c)
a0=d0.e
if(a0>0){a0=""+a0
B.a.l(d,c.e?"\u89c4\u5212\u914d\u989d\u5df2\u7528\u5c3d\uff1a"+a0+" \u5ea7\u57ce\u5c1a\u672a\u627e\u5230\u5b8c\u6574\u65b9\u6848\uff0c\u4e0d\u80fd\u636e\u6b64\u65ad\u5b9a\u65e0\u6cd5\u633d\u6551":"unsalvageableDefense\uff1a"+a0+" \u5ea7\u57ce\u5728\u5f53\u524d\u9501\u5b9a\u3001\u8d44\u91d1\u6216\u65f6\u9650\u4e0b\u672a\u627e\u5230\u5b8c\u6574\u4fee\u590d\u65b9\u6848")}d1="defending"}else d1="preparing"
if(a2.length!==0)d1="defending"
if(!g){d2=s.cI(i7.a)
if(d2!=null){i7.a=d2.a
B.a.l(e,d2.b)
B.a.l(d,"\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5176\u4ed6\u5b89\u5168\u57ce\u6c60\u7ee7\u7eed\u7ec4\u7ec7\u8fdb\u653b")}}r=18
return j0.b=2,1
case 18:for(g=o.r,a0=A.h(g),a1=a0.h("e(1)"),a4=a1.a(new A.f5(s)),a0=a0.h("d<1>"),a9=a0.h("e(b.E)").a(new A.f6(s)),a4=new A.d(g,a4,a0).gC(0),a9=new A.P(a4,a9,a0.h("P<b.E>")),b0=t.w,b1=t.e,b2=t.Y,b6=i9.b;a9.j();){b9=a4.gn()
if(b9.e!==1||b9.f>=b9.r*0.25||b9.k2<2||b9.k3<=0||B.a.I(b9.ax,new A.f7(s)))continue
d3=o.a1(b9.k1)
if(d3!=null){c0=b9.gaQ()
c1=b9.k3
c2=d3.gaQ()
c3=Math.max(1,b9.k4)
c4=b6.i(0,"retreatSurvivalRatio")
c4.toString
c4=c0/c1>=c2/c3*c4
c0=c4}else c0=!0
if(c0)continue
c0=i7.a
c1=b9.a
if(c0.as.p(0,c1))continue
i7.a.as.l(0,c1)
c0=A.c([new A.z(B.P,c1,null,null,0,B.d)],b0)
c1=A.c([b9,d3],b1)
b9=o.K(b9.c)
b9.toString
B.a.l(e,new A.N("\u9ad8\u7ea7\u5c06\u9886\u751f\u547d\u4f4e\u4e8e\u56db\u5206\u4e4b\u4e00\uff0c\u5df2\u53d1\u751f\u7684\u4f24\u5bb3\u663e\u793a\u80dc\u671b\u6e3a\u832b\uff0c\u7533\u8bf7\u6709\u98ce\u9669\u7684\u5408\u6cd5\u64a4\u9000",c0,b.af(c1,A.c([b9],b2)),B.r,0,!0))}r=19
return j0.b=3,1
case 19:a4=a0.h("b.E")
d4=A.o(new A.d(g,a1.a(new A.f8(i7,s)),a0),a4)
a9=d4.length,b9=o.b,b3=0
case 20:if(!(b3<d4.length)){r=22
break}d5=d4[b3]
c0=d5.a
d6=i7.a.y.i(0,c0)
c1=i7.a
d7=c1.d<c1.T().a
c1=d6==null
if((c1?null:d6.as)===!0){c2=c1?null:d6.d
c2=d5.cx==c2&&!d7}else c2=!1
if(c2){r=21
break}if((c1?null:d6.b)==="intercept")if(o.a1(c1?null:d6.r)!=null){c2=h.i(0,c1?null:d6.d)
if(c2==null)c2=null
else c2=c2.d.length!==0||c2.a.at!=null
c2=c2!==!0
d8=c2}else d8=!0
else d8=!1
if(d8&&!d7&&d6.z>b9&&d5.f>=d5.r*0.65){r=21
break}c2=!c1
d9=c2&&d6.y<b9
if(c2&&!d9&&!d7&&!d8&&d6.z>b9&&!A.ko(d5,o,i7.a,i9)&&d5.f>=d5.r*0.5){r=21
break}if(d5.R8&&c2&&!d9&&i7.a.d>0){r=21
break}e0=A.ju(d5,o,i7.a)
c2=!1
if(A.ko(d5,o,i7.a,i9))if(i7.a.d>0)c2=d5.f>=d5.r*0.25||o.u(e0.a).length===0
if(c2){B.a.l(d,c0+"\u5df2\u4e34\u8fd1\u4e3b\u653b\u76ee\u6807\uff0c\u4fdd\u6301\u8fdb\u653b\uff0c\u4e0d\u56e0\u666e\u901a\u9884\u8b66\u6216\u6574\u5907\u9884\u7b97\u6298\u8fd4")
r=21
break}if((c1?null:d6.b)==="expedition"&&!d9&&!d7&&d5.f>=d5.r*0.65&&d6.x+1<d6.w.length){r=21
break}if(!d7&&!d8&&!d9&&d5.f>=d5.r*0.65&&d5.as!==B.n){r=21
break}e1=h.i(0,d5.c)
c0=o.gN()
c1=c0.$ti
c2=c1.h("d<b.E>")
e2=A.o(new A.d(c0,c1.h("e(b.E)").a(new A.f9(i7,s)),c2),c2.h("b.E"))
B.a.A(e2,new A.fa(d5))
c0=A.h(e2)
c1=c0.h("x<1>")
c2=new A.x(e2,0,3,c1)
c2.V(e2,0,3,c0.c)
c2=new A.p(c2,c2.gm(0),c1.h("p<k.E>"))
c0=e1==null
c3=d5.f<d5.r*0.65
c1=c1.h("k.E")
while(c2.j()){c4=c2.d
if(c4==null)c4=c1.a(c4)
if(!c.a_())break
e3=m.aj(d5,c4.e,o,!0,c4)
c5=i7.a
c6=h.i(0,c4.a)
if(c6==null)c6=null
else c6=c6.d.length!==0||c6.a.at!=null
if(d7)c7="\u73b0\u6709\u56fd\u5e93\u4e0d\u8db3\u4ee5\u7ee7\u7eed\u4f9b\u517b\u8fdc\u7a0b\u4efb\u52a1\uff0c\u56de\u57ce\u7f29\u51cf\u7cae\u8349\u652f\u51fa"
else if(c3)c7="\u5c06\u9886\u53d7\u4f24\uff0c\u56de\u57ce\u6062\u590d\u751f\u547d\u540e\u518d\u6218"
else if(d9)c7="\u539f\u4efb\u52a1\u5df2\u8d85\u8fc7\u6267\u884c\u65f6\u9650\uff0c\u56de\u57ce\u91cd\u65b0\u6574\u5907"
else c7=d8?"\u622a\u51fb\u76ee\u6807\u5df2\u6d88\u5931\uff0c\u56de\u57ce\u7ed3\u675f\u672c\u6b21\u4efb\u52a1":"\u91ce\u5916\u6307\u4ee4\u5df2\u5b8c\u6210\uff0c\u56de\u57ce\u7b49\u5f85\u65b0\u4efb\u52a1"
if(c0)c8=null
else c8=e1.d.length!==0||e1.a.at!=null
c8=c8===!0?e1.ga6():1/0
e4=b.cg(c5,d5,e3,!0,c8,!0,c6!==!0,c7,"regroup",c4)
if(e4!=null){i7.a=e4.a
B.a.l(e,e4.b)
break}}r=23
return j0.b=4,1
case 23:case 21:d4.length===a9||(0,A.u)(d4),++b3
r=20
break
case 22:e5=A.o(new A.d(g,a1.a(new A.eS(i7,s)),a0),a4)
B.a.A(e5,new A.eT(s))
g=i8.y
a0=i8.z
e6=A.c9(o,i7.a,i9,a0,g)
a1=A.Y(a6,a6)
for(a4=e6.f,a9=new A.b7(a4,a4.r,a4.e,A.l(a4).h("b7<1>"));a9.j();){b9=a9.d
c0=a4.i(0,b9)
c0=c0==null?null:c0.length
a1.v(0,b9,c0==null?0:c0)}e7=e6.gY()
if(e7==null)e7=e6.gc7()
if(e6.gY()!=null&&a2.length===0)d1="attacking"
a4=e5.length,a9=i8.w>a7.x2/a7.a,b9=a7.k4,i8=i8.f,c0=a7.rx,c1=a7.fy,a7=a7.go,c2=A.h(n),c3=c2.h("e(1)"),c2=c2.h("d<1>"),c4=c2.h("b.E"),e8=0,e9=1,f0=!1,b3=0
case 24:if(!(b3<e5.length)){r=26
break}d5=e5[b3]
f1={}
c5=d5.a
if(i7.a.as.p(0,c5)||i7.a.z.p(0,c5)){r=25
break}f2=o.K(d5.c)
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
if(c7===!0){c7=c8.ax.p(0,c5)?0:1
c8=i7.a
c9=f2.at
if(c9==null){c8=c8.x.i(0,c5)
if(c8==null)c8=f2.d}else{c8=f2.ax
f3=f2.cy?1:0
f3=B.c.B(c9-c8-f3,0,5)
c8=f3}f4=Math.min(c7,c8)}else f4=c8.ax.p(0,c5)?0:1
if(i7.a.u(c5).length<=f4){r=25
break}if(c6)c5=null
else c5=b4.d.length!==0||b4.a.at!=null
if(c5===!0&&!s.bF(f2,d5,i7.a)){r=25
break}f5=A.c9(o,i7.a,i9,a0,g)
f6=A.o(new A.d(n,c3.a(new A.eU(s,f5,d5,a1)),c2),c4)
B.a.A(f6,new A.eV(s,f5,d5))
f1.a=null
c5=A.h(f6)
c6=c5.h("x<1>")
c7=new A.x(f6,0,a7,c6)
c7.V(f6,0,a7,c5.c)
c7=new A.p(c7,c7.gm(0),c6.h("p<k.E>"))
c6=c6.h("k.E")
f7=null
f8=-1/0
case 27:if(!c7.j()){r=28
break}c5=c7.d
f9=c5==null?c6.a(c5):c5
if(!c.a_()){r=28
break}g0=f9.a
c5=o.u(g0)
c8=A.h(c5).h("L<1>")
c5=new A.L(c5,c8)
c9=f9.at
if(c9==null)c9=f9.d
else{f3=f9.ax
g1=f9.cy?1:0
g1=B.c.B(c9-f3-g1,0,5)
c9=g1}f3=new A.x(c5,0,c9,c8.h("x<k.E>"))
f3.V(c5,0,c9,c8.h("k.E"))
g2=f3.ab(0)
e3=m.aT(d5,f9.e,o,f9)
if(!e3.d){r=27
break}g3=b.c8(d5,i7.a,f9,l)
for(c5=g3.length,g4=!1,b7=0;b7<g3.length;g3.length===c5||(0,A.u)(g3),++b7){g5=g3[b7]
c8=A.cy(d5,f9,o,i9,l,g5,a9&&i7.a.d>100?0.05:0).a
g6=c8[1]
g7=c8[2]
g4=g7>0
if(!g4)continue
if(f5.gY()!=null&&g0!==f5.gY())c9=g7!==1||g6<b9
else c9=!1
if(c9)continue
g8=a1.i(0,g0)
if(g8==null)g8=0
g9=g7-g8
if(g9<=0)continue
e9=Math.max(e9,g7)
e4=s.bD(i7.a,d5,f9,g5,g9,g8,c8[0])
if(e4==null){h0=i7.a.M()
h0.d=1e6
h1=s.bD(h0,d5,f9,g5,g9,g8,c8[0])
if(h1!=null){if(a2.length===0)d1="saving"
c8=h0.d
c9=h1.a
h2=c8-c9.d+c9.T().a
e8=e8===0?h2:Math.min(e8,h2)
if(e7==null)e7=g0}else if(a2.length===0)d1="preparing"
continue}c5=e3.b
c8=A.bl(f9,d5,o,i9,i8,c5)
c9=i7.a.d
f3=e4.a.d
g1=J.j9(g5,1).G(0,0,new A.eW(s),a6)
h3=b6.i(0,"weaponChance")
h3.toString
h4=c8-c5*0.4-(c9-f3)*0.5+g6*30+g1*c0*h3*0.02
if(h4>f8){f1.a=e4
e9=e4.b.d.length
f8=h4
f7=f9}break}if(!g4&&e7==null){e9=Math.max(1,Math.min(c1,g2.length))
e7=g0}r=29
return j0.b=5,1
case 29:r=27
break
case 28:c5=f1.a
if(c5!=null){c5=B.a.G(e,0,new A.eX(),a6)
c6=f1.a
c5=c5+c6.b.b.length<=a8}else{c6=c5
c5=!1}if(c5){i7.a=c6.a
B.a.l(e,c6.b)
e7=f7.a
a1.aG(e7,new A.eY(f1),new A.eZ(f1))
f0=!0}r=30
return j0.b=6,1
case 30:case 25:e5.length===a4||(0,A.u)(e5),++b3
r=24
break
case 26:i8=!f0
if(i8&&B.a.gD(a3).e===0&&j!==B.x){h5=s.cP(i7.a,e6)
if(h5!=null){i7.a=h5.a
B.a.l(e,h5.b)
d1="preparing"}}r=j===B.E&&i8&&B.a.G(e,0,new A.f_(),a6)<a8-3?31:32
break
case 31:i8=o.gN(),m=J.E(i8.a),i8=new A.P(m,i8.b,i8.$ti.h("P<1>"))
case 33:if(!i8.j()){r=34
break}l=m.gn()
j=l.a
g=h.i(0,j)
if(g==null)g=null
else g=g.d.length!==0||g.a.at!=null
if(g===!0){r=33
break}if(!c.a_()){r=34
break}h6=i7.a.u(j)
b5=i7.a.M()
g=A.h(h6)
a0=g.h("d<1>")
h7=A.o(new A.d(h6,g.h("e(1)").a(new A.f0(i7)),a0),a0.h("b.E"))
B.a.A(h7,new A.f2())
if(B.a.I(n,new A.f3(s)))if(h6.length!==0){g=i7.a.bS(j)
g=g<(i7.a.ax.p(0,j)?0:1)+e9
h8=g}else h8=!0
else h8=!1
if(h7.length!==0){g=h6.length
a0=i7.a
a1=l.at
if(a1==null){a0=a0.x.i(0,j)
if(a0==null)a0=l.d}else{a0=l.ax
a4=l.cy?1:0
a4=B.c.B(a1-a0-a4,0,5)
a0=a4}if(g<a0)g=h8&&h6.length>=l.y
else g=!0}else g=!1
if(g)if(b5.aH(l,B.a.gD(h7))&&b5.d>=b5.T().a){i7.a=b5
B.a.l(e,new A.N("\u5148\u6269\u5145\u5b89\u5168\u8fce\u6218\u540d\u989d\u548c\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u8003\u8651\u62db\u5c06\u4e0e\u8fdc\u5f81",A.c([new A.z(B.l,B.a.gD(h7).a,j,null,0,B.d)],b0),b.af(A.c([B.a.gD(h7)],b1),A.c([l],b2)),B.r,b5.T().a,!1))
r=34
break}if(h8){g=o.K(e7)
g=b5.dk(l,g==null?null:g.b)&&b5.d>=b5.T().a}else g=!1
if(g){i7.a=b5
B.a.l(e,new A.N("\u4e3a\u7559\u5b88\u4e0e\u8fdc\u5f81\u7684\u771f\u5b9e\u7f3a\u53e3\u62bd\u53d6\u82f1\u96c4\uff0c\u9884\u7559\u6700\u9ad8\u624b\u7eed\u8d39\u548c\u6708\u4ff8",A.c([new A.z(B.v,null,j,null,0,B.d)],b0),b.af(A.c([],b1),A.c([l],b2)),B.r,b5.T().a,!1))
r=34
break}g=i7.a.f
a0=h6.length
a1=b6.i(0,"soldierLimit")
a1.toString
a1=Math.min(g,a0*B.b.k(a1))
a0=i7.a
h9=a1-a0.e
if(h9>0){i0=a0.M()
g=b6.i(0,"soldierBatch")
g.toString
i1=Math.min(B.b.k(g),h9)
if(i0.aA(i1)&&i0.d>=i0.T().a){i7.a=i0
B.a.l(e,new A.N("\u8865\u5145\u8fd1\u671f\u5b88\u57ce\u548c\u51fa\u5f81\u6240\u9700\u5175\u5458\uff0c\u4e0d\u586b\u6ee1\u6ca1\u6709\u4efb\u52a1\u7684\u5168\u56fd\u5bb9\u91cf",A.c([new A.z(B.m,null,j,null,i1,B.d)],b0),b.af(A.c([],b1),A.c([l],b2)),B.r,i0.T().a,!1))
r=34
break}}r=35
return j0.b=7,1
case 35:r=33
break
case 34:case 32:if(f0)d1=a2.length===0?"attacking":"defending"
i2=o.K(e7)
if(i2!=null){i3=A.al(i2.b,o,i9,null)
if(i3.gW())B.a.l(d,"\u76ee\u6807\u56fd\u5360\u6709 "+i3.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.ag(i3.c*i3.gaC())+" \u91d1\u5e01\uff0c\u51c6\u5907\u5f3a\u5316\u6b66\u5668\u548c\u8f6e\u653b\u5175\u529b")}if(e.length===0){i8=i7.a
B.a.l(d,i8.d<i8.T().a?"\u8d44\u91d1\u4e0d\u8db3\u4ee5\u8986\u76d6\u73b0\u6709\u90e8\u961f\u548c\u6b20\u6536\u6708\u4ff8\uff0c\u7b49\u5f85\u6574\u5907":"\u6ca1\u6709\u6ee1\u8db3\u5b88\u57ce\u3001\u65f6\u9650\u53ca\u9759\u6001\u98ce\u9669\u7ea6\u675f\u7684\u65b0\u589e\u884c\u52a8\uff0c\u4fdd\u6301\u5df2\u6709\u4efb\u52a1")}if(a9)B.a.l(d,"\u505c\u6ede\u8bca\u65ad\uff1a"+(d1==="saving"?"\u7f3a\u5c11\u6574\u961f\u540e\u52e4\u8d44\u91d1":"\u7f3a\u5c11\u53ef\u5b89\u5168\u6267\u884c\u7684\u6269\u5f20\u6761\u4ef6")+"\uff0c\u4e0d\u901a\u8fc7\u65e0\u9650\u62db\u52df\u6216\u81ea\u6740\u51fa\u51fb\u6253\u7834\u7b49\u5f85")
i4=A.c([],i)
for(i8=e.length,i5=0,b3=0;b3<e.length;e.length===i8||(0,A.u)(e),++b3){i6=e[b3]
i5+=i6.b.length
if(i5>a8){c.e=!0
B.a.l(d,"\u547d\u4ee4\u914d\u989d\u5230\u8fbe\uff0c\u53ea\u63d0\u4ea4\u524d\u9762\u5b8c\u6574\u7684\u52a8\u4f5c\u7ec4\uff0c\u540e\u7eed\u7559\u5f85\u4e0b\u4e00\u6b21\u89c4\u5212")
break}B.a.l(i4,i6)}s.w=new A.bM(d1,e7,e8,e9,i4,A.Z(d,0,A.W(12,"count",a6),a5).ab(0),c.e,c.c,c.d,c.b)
case 1:return 0
case 2:return j0.c=p.at(-1),3}}}},
cI(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this
for(s=a2.c.Q,r=s.gN(),q=J.E(r.a),r=new A.P(q,r.b,r.$ti.h("P<1>")),p=a2.x,o=a2.d,n=s.r,m=A.h(n),l=m.h("e(1)"),m=m.h("d<1>"),k=m.h("b.E"),j=a3.ax;r.j();){i=q.gn()
h=i.a
if(a3.u(h).length!==0||a3.L(h)>0||j.p(0,h))continue
g=A.o(new A.d(n,l.a(new A.eD(a2,a3)),m),k)
B.a.A(g,new A.eE(i))
f=A.h(g)
e=f.h("x<1>")
d=new A.x(g,0,4,e)
d.V(g,0,4,f.c)
d=new A.p(d,d.gm(0),e.h("p<k.E>"))
f=i.e
e=e.h("k.E")
while(d.j()){c=d.d
if(c==null)c=e.a(c)
if(!o.a_())return null
b=a2.e
b===$&&A.a4()
a=b.aj(c,f,s,!0,i)
b=a2.r
b===$&&A.a4()
a0=p.i(0,h)
a0=a0==null?null:a0.ga6()
a1=b.aW(a3,c,a,!0,a0==null?1/0:a0,!0,"\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u63f4\u519b\u51fa\u53d1\u57ce\u4fdd\u7559\u5b9e\u9645\u5b88\u5c06","transfer",i)
if(a1!=null)return a1}}return null},
cP(a8,a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this,a3=a2.c.Q,a4=a3.gN(),a5=a4.$ti,a6=a5.h("d<b.E>"),a7=A.o(new A.d(a4,a5.h("e(b.E)").a(new A.eI(a2)),a6),a6.h("b.E"))
if(a7.length<2)return null
a4=a3.f
a5=A.h(a4)
a6=a5.h("d<1>")
s=A.o(new A.d(a4,a5.h("e(1)").a(new A.eJ(a2,a9)),a6),a6.h("b.E"))
a4=t.S
a5=t.i
r=A.Y(a4,a5)
for(a6=a7.length,q=A.h(s),p=q.c,q=q.h("x<1>"),o=a2.a.r,n=o.go,m=0;m<a7.length;a7.length===a6||(0,A.u)(a7),++m){l=a7[m]
B.a.A(s,new A.eK(l))
k=new A.x(s,0,n,q)
k.V(s,0,n,p)
r.v(0,l.a,k.G(0,1/0,new A.eL(a2,l),a5))}B.a.A(a7,new A.eM(r))
for(a5=A.h(a7),a4=A.Z(a7,0,A.W(2,"count",a4),a5.c),a6=a4.$ti,a4=new A.p(a4,a4.gm(0),a6.h("p<k.E>")),a5=a5.h("L<1>"),q=a5.h("p<k.E>"),p=a2.d,n=a8.ax,k=a5.h("k.E"),o=o.at,a6=a6.h("k.E");a4.j();){j=a4.d
if(j==null)j=a6.a(j)
i=j.a
h=r.i(0,i)
h.toString
if(h>o)continue
for(h=new A.L(a7,a5),h=new A.p(h,h.gm(0),q),g=j.e;h.j();){f=h.d
f=(f==null?k.a(f):f).a
e=r.i(0,f)
e.toString
d=r.i(0,i)
d.toString
if(e<d+10)continue
c=a8.u(f)
e=c.length
if(e<=(n.p(0,f)?0:1))continue
f=A.h(c)
e=f.h("d<1>")
b=A.o(new A.d(c,f.h("e(1)").a(new A.eN(a8)),e),e.h("b.E"))
B.a.A(b,new A.eO())
f=A.h(b)
e=f.h("x<1>")
d=new A.x(b,0,2,e)
d.V(b,0,2,f.c)
d=new A.p(d,d.gm(0),e.h("p<k.E>"))
e=e.h("k.E")
while(d.j()){f=d.d
if(f==null)f=e.a(f)
if(!p.a_())return null
a=a2.e
a===$&&A.a4()
a0=a.aj(f,g,a3,!0,j)
a=a2.r
a===$&&A.a4()
a1=a.cj(a8,f,a0,!0,!0,"\u5c06\u540e\u65b9\u95f2\u7f6e\u4e3b\u529b\u524d\u79fb\u5230\u5b89\u5168\u524d\u6cbf\u636e\u70b9\uff0c\u7f29\u77ed\u540e\u7eed\u5f81\u670d\u7684\u884c\u519b\u4e0e\u7cae\u8349\u6210\u672c","transfer",j)
if(a1!=null)return a1}}}return null},
bF(a,b,c){var s,r,q=a.a,p=this.x.i(0,q),o=p==null?null:p.d
if(o==null)o=A.c([],t.D)
if(o.length===0)return!0
q=c.u(q)
p=A.h(q)
s=p.h("d<1>")
q=A.o(new A.d(q,p.h("e(1)").a(new A.eG(b)),s),s.h("b.E"))
p=A.h(q).h("L<1>")
r=A.Z(new A.L(q,p),0,A.W(c.O(a),"count",t.S),p.h("k.E")).ab(0)
if(r.length===0)return!1
return B.a.c1(o,new A.eH(this,r,c,a))},
bD(c9,d0,d1,d2,d3,d4,d5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6=this,c7=null,c8="soldierLimit"
t.L.a(d2)
s=t.e
r=A.c([],s)
for(q=c6.c.Q,p=q.gN(),o=J.E(p.a),p=new A.P(o,p.b,p.$ti.h("P<1>")),n=c9.ax,m=c6.x,l=d0.c;p.j();){k=o.gn().a
j=m.i(0,k)
if(j==null)j=c7
else j=j.d.length!==0||j.a.at!=null
if(j===!0&&k!==l)continue
i=n.p(0,k)?0:1
h=Math.max(0,c9.u(k).length-i)
k=c9.u(k)
j=A.h(k)
g=j.h("d<1>")
f=A.o(new A.d(k,j.h("e(1)").a(new A.ez(c6,c9,d1)),g),g.h("b.E"))
B.a.A(f,new A.eA(c6))
k=A.h(f)
j=new A.x(f,0,h,k.h("x<1>"))
j.V(f,0,h,k.c)
B.a.F(r,j)}if(!B.a.p(r,d0))return c7
B.a.ai(r,d0)
B.a.A(r,new A.eB(c6))
p=c6.e
p===$&&A.a4()
o=d1.e
e=p.aT(d0,o,q,d1)
if(!e.d)return c7
d=A.c([d0],s)
s=t.N
c=A.R([d0.a,e],s,t.bJ)
b=e.b
for(n=c6.a,l=n.r,k=t.S,j=A.Z(r,0,A.W(l.fy*2,"count",k),t.r),g=j.$ti,j=new A.p(j,j.gm(0),g.h("p<k.E>")),a=l.ok,g=g.h("k.E"),a0=b;j.j();){a1=j.d
if(a1==null)a1=g.a(a1)
if(d.length>=d3)break
a2=p.aT(a1,o,q,d1)
if(!a2.d)continue
a3=a2.b
a4=Math.min(b,a3)
a5=Math.max(a0,a3)
if(a5-a4>a)continue
B.a.l(d,a1)
c.v(0,a1.a,a2)
a0=a5
b=a4}if(d.length<d3)return c7
a6=A.c([],t.w)
a7=A.c([],t.m)
a8=A.Y(s,s)
s=q.u(d1.a)
p=A.h(s).h("L<1>")
a9=A.Z(new A.L(s,p),0,A.W(d1.gad(),"count",k),p.h("k.E")).ab(0)
for(s=l.fx,p=n.b,o=d3===1,l=A.h(a9),k=l.c,l=l.h("x<1>"),j=d1.b,g=t.p,b0=c9,b1=0;b1<d.length;++b1){b2=d[b1]
a1=b2.c
a3=m.i(0,a1)
if(a3==null)a3=c7
else a3=a3.d.length!==0||a3.a.at!=null
if(a3===!0){a3=q.K(a1)
a3.toString
a3=!c6.bF(a3,b2,b0)}else a3=!1
if(a3)return c7
a3=c.i(0,b2.a)
a3.toString
if(b1!==0){b3=A.al(j,q,n,c7)
b3=b3.a!==b3.d.a&&b3.b>=b3.e.r.w}else b3=!0
if(b3)b3=A.c([d2],g)
else{b3=c6.r
b3===$&&A.a4()
b3=b3.bj(b2,b0)}b4=b3.length
b5=d4+b1
b6=b0.ax
b7=b1>0
b8=c7
b9=0
for(;b9<b3.length;b3.length===b4||(0,A.u)(b3),++b9){c0=b3[b9]
if(b7){if(d5){c1=new A.x(a9,0,1,l)
c1.V(a9,0,1,k)}else c1=a9
c1=J.kS(c1,new A.eC(c6,b2,d1,c0))}else c1=!1
if(c1)continue
for(c1=q.gN(),c2=J.E(c1.a),c1=new A.P(c2,c1.b,c1.$ti.h("P<1>")),c3=0;c1.j();){c4=c2.gn().a
c5=b0.u(c4).length
c5=Math.max(0,c5-(c4===a1?1:0))
c4=b6.p(0,c4)?0:1
c4=Math.min(c5,c4)
c5=p.i(0,c8)
c5.toString
c3+=c4*B.b.k(c5)}c1=c6.r
c1===$&&A.a4()
c2=o?"\u56f4\u7ed5\u4e3b\u653b\u76ee\u6807\u6295\u5165\u8db3\u591f\u6218\u529b\uff0c\u4fdd\u7559\u5176\u4ed6\u65b9\u5411\u5175\u529b":"\u96c6\u4e2d\u4f18\u52bf\u7f16\u961f\u8f6e\u653b\u540c\u4e00\u5ea7\u57ce\uff0c\u62b5\u8fbe\u95f4\u9694\u4e0d\u8d85\u8fc7"+B.b.k(a)+"\u79d2"
c4=b0.f
c5=p.i(0,c8)
c5.toString
b8=c1.bn(b0,b2,a3,d5,c0,Math.min(c3,Math.max(0,c4-B.b.k(c5))),b5,c2,"expedition",d1)
if(b8!=null)break}if(b8==null)return c7
b0=b8.a
a1=b8.b
B.a.F(a6,a1.b)
B.a.F(a7,a1.d)
a8.F(0,a1.c)
if(a6.length>s){c6.d.e=!0
return c7}}s=c6.r
s===$&&A.a4()
a8.F(0,s.af(a9,A.c([],t.Y)))
if(d5)s="\u5148\u6d3e\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u5c06\u9886\u8fdb\u653b\u524d\u6392\uff0c\u6301\u7eed\u8f6e\u653b\u5e76\u8865\u5145\u6218\u635f"
else s=o?"\u6267\u884c\u9759\u6001\u4f18\u52bf\u660e\u786e\u3001\u53ef\u4ee5\u4f9b\u517b\u7684\u6269\u5f20":"\u6574\u961f\u540e\u52e4\u51c6\u5907\u5b8c\u6210\uff0c\u6309\u771f\u5b9e\u6392\u961f\u89c4\u5219\u8f6e\u653b\uff1b\u4e0d\u9884\u6f14\u672a\u6765\u4f24\u4ea1"
return new A.d7(b0,new A.N(s,a6,a8,a7,b0.T().a,!1))},
cR(a,b,c){var s=this.c
return A.bl(a,b,s.Q,this.a,s.f,c)},
bJ(a,b){return this.cR(a,b,null)}}
A.eP.prototype={
$1(a){var s,r,q
t.J.a(a)
s=this.a.c.Q
r=s.a1(a.a)
q=!1
if(r!=null)if(r.b===s.a)if(!r.fy)if(r.f>0){s=r.as
s=!(s===B.f||s===B.e)&&r.id===a.at}else s=q
else s=q
else s=q
else s=q
return s},
$S:15}
A.eQ.prototype={
$1(a){t.h.a(a)
return a.d.length!==0||a.a.at!=null},
$S:41}
A.eR.prototype={
$2(a,b){var s,r=t.h
r.a(a)
r.a(b)
s=B.b.t(a.ga6(),b.ga6())
return s!==0?s:B.b.t(b.r+b.a.r*4,a.r+a.a.r*4)},
$S:42}
A.f1.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:16}
A.f4.prototype={
$2(a,b){var s,r=t.dp
r.a(a)
r.a(b)
r=a.e
s=b.e
return r!==s?B.c.t(r,s):B.b.t(b.d,a.d)},
$S:44}
A.f5.prototype={
$1(a){t.r.a(a)
return a.b===this.a.c.Q.a&&!a.fy&&a.fx},
$S:0}
A.f6.prototype={
$1(a){t.r.a(a)
return this.a.c.x!==B.k},
$S:0}
A.f7.prototype={
$1(a){var s=this.a.a.f.i(0,A.f(a))
return(s==null?null:s.d)===0},
$S:13}
A.f8.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.Q.a&&a.dx&&s.x!==B.k&&!a.fy&&!this.a.a.as.p(0,a.a)},
$S:0}
A.f9.prototype={
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
A.fa.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(a.e.J(s),b.e.J(s))},
$S:4}
A.eS.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b.c
r=!1
if(a.b===s.Q.a)if(a.db){r=this.a
s=r.a.aP(a)&&s.x!==B.x&&!a.fy&&!r.a.z.p(0,a.a)}else s=r
else s=r
return s},
$S:0}
A.eT.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ac(b,s.K(b.c).d<q.al(r)),A.ac(a,s.K(a.c).d<q.al(r)))},
$S:2}
A.eU.prototype={
$1(a){var s,r,q,p=this
t.q.a(a)
s=p.a
r=!1
if(a.b!==s.c.Q.a)if(p.b.az(a)){q=s.r
q===$&&A.a4()
if(q.aO(p.c,a)){r=p.d.i(0,a.a)
if(r==null)r=0
s=r<s.a.r.fy}else s=r}else s=r
else s=r
return s},
$S:1}
A.eV.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.b
if(a.a===r.gY())r=-1
else if(b.a===r.gY())r=1
else{r=this.a
s=this.c
s=B.b.t(r.bJ(b,s),r.bJ(a,s))
r=s}return r},
$S:4}
A.eW.prototype={
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
$S:17}
A.eX.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:16}
A.eY.prototype={
$1(a){return A.f(a)+this.a.a.b.d.length},
$S:6}
A.eZ.prototype={
$0(){return this.a.a.b.d.length},
$S:5}
A.f_.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:16}
A.f0.prototype={
$1(a){t.r.a(a)
return a.fr&&!this.a.a.as.p(0,a.a)},
$S:0}
A.f2.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.f3.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.eD.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=!1
if(a.b===s.c.Q.a)if(a.db){q=this.b
if(q.aP(a))if(!q.as.p(0,a.a)){s=s.x.i(0,a.c)
if(s==null)s=null
else s=s.d.length!==0||s.a.at!=null
s=s!==!0}else s=r
else s=r}else s=r
else s=r
return s},
$S:0}
A.eE.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.z.J(s),b.z.J(s))},
$S:2}
A.eI.prototype={
$1(a){var s=this.a.x.i(0,t.q.a(a).a)
if(s==null)s=null
else s=s.d.length!==0||s.a.at!=null
return s!==!0},
$S:1}
A.eJ.prototype={
$1(a){t.q.a(a)
return a.b!==this.a.c.Q.a&&this.b.az(a)},
$S:1}
A.eK.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.J(s),b.e.J(s))},
$S:4}
A.eL.prototype={
$2(a,b){var s,r
A.ax(a)
t.q.a(b)
s=this.a.e
s===$&&A.a4()
r=this.b.e
return Math.min(a,s.Z(r,b.f.a4(r)))},
$S:67}
A.eM.prototype={
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
A.eN.prototype={
$1(a){t.r.a(a)
return a.db&&a.e!==2&&!this.a.as.p(0,a.a)},
$S:0}
A.eO.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.eG.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.eH.prototype={
$1(a){var s=this
return B.a.I(s.b,new A.eF(s.a,t.O.a(a),s.c,s.d))},
$S:10}
A.eF.prototype={
$1(a){var s,r,q,p,o,n=this,m="soldierLimit"
t.r.a(a)
s=n.a
r=s.f
r===$&&A.a4()
q=n.c
p=q.O(n.d)
s=s.a.b
o=s.i(0,m)
o.toString
o=B.b.k(o)
q=q.e
s=s.i(0,m)
s.toString
return r.bW(a,n.b.a,p,Math.min(o,Math.max(0,q-B.b.k(s)))).a===B.h},
$S:0}
A.ez.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.db){r=this.b
if(!r.as.p(0,a.a))if(r.aP(a)){s=this.a.r
s===$&&A.a4()
s=s.aO(a,this.c)}}return s},
$S:0}
A.eA.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ac(b,s.K(b.c).d<q.al(r)),A.ac(a,s.K(a.c).d<q.al(r)))},
$S:2}
A.eB.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ac(b,s.K(b.c).d<q.al(r)),A.ac(a,s.K(a.c).d<q.al(r)))},
$S:2}
A.eC.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this,i="soldierLimit"
t.r.a(a)
s=j.a
r=s.f
r===$&&A.a4()
q=j.c
p=q.gad()
o=s.a
n=o.b
m=n.i(0,i)
m.toString
m=B.b.k(m)
n=n.i(0,i)
n.toString
l=j.d
k=r.cY(j.b,a,p,Math.min(B.b.k(n),B.a.ao(s.c.Q.w,new A.ey(q)).c),l,m)
return J.j8(l)&&k.b<o.r.k4||k.r||k.c<=o.r.RG||k.b<-0.12},
$S:0}
A.ey.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:9}
A.a6.prototype={}
A.fb.prototype={
bV(a,b){return new A.av(this.cV(a,b),t.dT)},
cV(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e
return function $async$bV(c,d,a0){if(d===1){n.push(a0)
p=o}for(;;)switch(p){case 0:i=s.a2(r,q)
h=r.a
g=h.a
f=q.L(g)<=q.O(h)
e=!1
if(f){m=r.d
if(m.length!==0)if(B.a.c1(m,new A.fW(s,q))){e=q.y
e=!new A.ai(e,A.l(e).h("ai<2>")).I(0,new A.fX(r))}}p=e?3:4
break
case 3:p=5
return c.b=new A.a6(q,A.c([],t.Z),s.a5(r,q),!1,"\u5df2\u6709\u622a\u51fb\u90e8\u961f\u80fd\u53ca\u65f6\u63a5\u654c\uff0c\u7b49\u5f85\u6267\u884c\u7ed3\u679c\uff0c\u4e0d\u91cd\u590d\u6d3e\u51fa\u7b2c\u4e8c\u652f\u90e8\u961f","hold"),1
case 5:p=1
break
case 4:if(f)e=(i==null?null:i.a)===B.h
else e=!1
p=e?6:7
break
case 6:p=8
return c.b=new A.a6(q,A.c([],t.Z),s.a5(r,q),!1,"\u57ce\u9632\u4e0e\u73b0\u6709\u5b88\u5c06\u8db3\u4ee5\u5e94\u5bf9\u53ef\u89c1\u6765\u654c\uff0c\u7ef4\u6301\u8fdc\u5f81\uff0c\u4e0d\u53ec\u56de\u5c06\u9886","hold"),1
case 8:p=1
break
case 7:e=s.bt(r,q)
l=A.o(e,e.$ti.h("b.E"))
e=A.h(l)
m=e.h("d<1>")
k=A.o(new A.d(l,e.h("e(1)").a(new A.fY(s,r,i,q)),m),m.h("b.E"))
p=k.length!==0?9:10
break
case 9:p=11
return c.bP(k)
case 11:p=1
break
case 10:p=f&&q.L(g)<q.O(h)?12:13
break
case 12:j=q.M()
p=j.dj(h,!0)&&j.d>=j.ae(!0).a?14:15
break
case 14:p=16
return c.b=s.aw(r,q,j,A.c([new A.z(B.v,null,g,null,0,B.d)],t.w),"\u672c\u5730\u4ecd\u6709\u8fce\u6218\u540d\u989d\uff0c\u5148\u62db\u52df\u8865\u5f3a\uff0c\u518d\u6309\u5b9e\u9645\u5230\u4efb\u5c5e\u6027\u590d\u6838\uff0c\u6682\u4e0d\u53ec\u56de\u8fdc\u5f81"),1
case 16:p=1
break
case 15:case 13:p=17
return c.bP(l)
case 17:case 1:return 0
case 2:return c.c=n.at(-1),3}}}},
bt(a,b){return new A.av(this.cu(a,b),t.dT)},
cu(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e,d,c,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9,k0,k1,k2,k3,k4,k5,k6
return function $async$bt(k7,k8,k9){if(k8===1){n.push(k9)
p=o}for(;;)switch(p){case 0:k0=r.a
k1=k0.a
k2=q.L(k1)>q.O(k0)
k3=t.Z
k4=A.c([],k3)
k5=s.a5(r,q)
k6=!k2
if(k6){m=s.a2(r,q)
m=(m==null?null:m.a)!==B.h}else m=!0
p=3
return k7.b=new A.a6(q,k4,k5,m,k2?"unsalvageableDefense\uff1a\u5f53\u524d\u5b89\u5168\u540d\u989d "+q.O(k0)+"\uff0c\u9a7b\u519b "+q.L(k1)+"\uff0c\u7b49\u5f85\u5408\u6cd5\u4fee\u590d":"\u4fdd\u6301\u53ef\u51fa\u573a\u5b88\u519b\uff0c\u7ee7\u7eed\u76d1\u63a7\u5168\u90e8\u6765\u654c","local"),1
case 3:k4=s.c
if(!k4.a_()){p=1
break}k5=q.f
m=q.u(k1).length
l=s.b
k=l.b
j=k.i(0,"soldierLimit")
j.toString
i=Math.max(0,Math.min(k5,m*B.b.k(j))-q.e)
p=i>0?4:5
break
case 4:h=q.M()
k5=h.d
m=h.ae(!0)
j=k.i(0,"soldierCost")
j.toString
g=Math.min(i,Math.max(0,B.c.aX(k5-m.a,B.b.k(j))))
p=g>0&&h.aA(g)?6:7
break
case 6:p=8
return k7.b=s.aw(r,q,h,A.c([new A.z(B.m,null,k1,null,g,B.d)],t.w),"\u4f18\u5148\u7528\u56fd\u5e93\u8865\u8db3\u73b0\u6709\u5b88\u519b\u5175\u5458\uff0c\u518d\u5224\u65ad\u662f\u5426\u9700\u8981\u5916\u63f4"),1
case 8:case 7:case 5:k5=k0.at
m=k5==null
p=m?9:10
break
case 9:f=q.M()
e=A.c([],t.w)
j=f.u(k1)
d=A.h(j)
c=d.h("d<1>")
a0=A.o(new A.d(j,d.h("e(1)").a(new A.fc()),c),c.h("b.E"))
B.a.A(a0,new A.fd())
p=a0.length!==0?11:12
break
case 11:a1=B.a.gD(a0)
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
break}if(!f.aH(k0,a1)||f.d<f.ae(!0).a){p=14
break}B.a.l(e,new A.z(B.l,j,k1,null,0,B.d))
a3=f.L(k1)
a4=d.i(0,k1)
if(a4==null)a4=c
p=a3<=a4?15:16
break
case 15:p=17
return k7.b=s.aw(r,q,f,e,"\u4f18\u5148\u7531\u9ad8\u5185\u653f\u5c06\u9886\u5347\u7ea7\uff0c\u4fdd\u62a4\u771f\u5b9e\u8fce\u6218\u540d\u989d"),1
case 17:a3=s.a2(r,f)
if((a3==null?null:a3.a)===B.h||k2){p=14
break}case 16:++a2
p=13
break
case 14:case 12:case 10:p=k2?18:19
break
case 18:j=q.u(k1)
d=A.h(j)
c=d.h("d<1>")
a5=A.o(new A.d(j,d.h("e(1)").a(new A.fe()),c),c.h("b.E"))
B.a.A(a5,new A.fp())
j=A.h(a5),d=A.Z(a5,0,A.W(3,"count",t.S),j.c),c=d.$ti,d=new A.p(d,d.gm(0),c.h("p<k.E>")),a3=k0.cy,a4=k0.ax,a6=k0.d,a7=t.T,a8=t.w,a9=t.e,b0=j.h("e(1)"),j=j.h("d<1>"),c=c.h("k.E")
case 20:if(!d.j()){p=21
break}b1=d.d
if(b1==null)b1=c.a(b1)
if(!k4.a_()){p=21
break}b2=q.M()
e=A.c([],a8)
b3=A.c([b1],a9)
B.a.F(b3,new A.d(a5,b0.a(new A.fA(b1)),j))
b1=b3.length,b4=b2.x,b5=0
case 22:if(!(b5<b3.length)){p=24
break}b6=b3[b5]
b7=b2.L(k1)
if(m){b8=b4.i(0,k1)
if(b8==null)b8=a6}else{b8=a3?1:0
b8=B.c.B(k5-a4-b8,0,5)}if(b7<=b8){p=24
break}if(!b2.bZ(b6)){p=23
break}B.a.l(e,new A.z(B.A,b6.a,null,null,0,B.d))
p=m?25:26
break
case 25:b9=b2.M()
c0=A.o(e,a7)
b7=b9.u(k1)
b8=A.h(b7)
c1=b8.h("d<1>")
a0=A.o(new A.d(b7,b8.h("e(1)").a(new A.fC()),c1),c1.h("b.E"))
B.a.A(a0,new A.fD())
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
if(!b9.aH(k0,B.a.gD(a0)))break
B.a.l(c0,new A.z(B.l,B.a.gD(a0).a,k1,null,0,B.d));++c2}b8=b9.L(k1)
b7=b7.i(0,k1)
if(b7==null)b7=a6
p=b8<=b7&&b9.d>=b9.ae(!0).a?29:30
break
case 29:p=31
return k7.b=s.aw(r,q,b9,c0,"\u5148\u89e3\u96c7\u4f4e\u4ea4\u6362\u4ef7\u503c\u6321\u4f4d\u8005\u7b79\u8d44\uff0c\u4fdd\u7559\u4e3b\u6301\u8005\u5b8c\u6210\u6551\u57ce\u5347\u7ea7"),1
case 31:case 30:case 28:case 26:case 23:b3.length===b1||(0,A.u)(b3),++b5
p=22
break
case 24:b1=b2.L(k1)
if(m){b3=b4.i(0,k1)
if(b3==null)b3=a6}else{b3=a3?1:0
b3=B.c.B(k5-a4-b3,0,5)}p=b1<=b3?32:33
break
case 32:p=34
return k7.b=s.aw(r,q,b2,e,"\u6ca1\u6709\u53ef\u652f\u4ed8\u4e14\u53ca\u65f6\u7684\u5347\u7ea7\u65b9\u6848\uff0c\u6e05\u51fa\u6321\u4f4d\u5b88\u5c06\u5e76\u4fdd\u7559\u6838\u5fc3\u51fa\u573a"),1
case 34:case 33:p=20
break
case 21:case 19:j=q.u(k1)
d=A.h(j)
c=d.h("d<1>")
c3=A.o(new A.d(j,d.h("e(1)").a(new A.fE(q)),c),c.h("b.E"))
B.a.A(c3,new A.fF())
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
c6=A.o(new A.d(j,d.h("e(b.E)").a(new A.fG(k0)),c),c.h("b.E"))
B.a.A(c6,new A.fH(k0))
j=A.Z(c3,0,A.W(l.r.fy,"count",t.S),A.h(c3).c),d=j.$ti,j=new A.p(j,j.gm(0),d.h("p<k.E>")),c=k0.cy,a3=k0.ax,a4=A.h(c6),a6=a4.c,a4=a4.h("x<1>"),a7=a4.h("p<k.E>"),a8=s.e,a9=a8.c,b0=s.f,b1=a4.h("k.E"),d=d.h("k.E"),b3=k0.d,b4=t.er,b7=t.bo,b8=t.i,c1=t.I
case 37:if(!j.j()){p=38
break}c7=j.d
if(c7==null)c7=d.a(c7)
if(!k4.a_()){p=38
break}c8=new A.x(c6,0,4,a4)
c8.V(c6,0,4,a6)
c8=new A.p(c8,c8.gm(0),a7)
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
d6=B.c.B(d5-d2-d6,0,5)
d2=d6}if(d4>=d2)continue
d7=a9.aj(c7,d1.e,k6,!0,d1)
d2=k2?"transfer":"evacuate"
d8=a8.aW(c4,c7,d7,!0,r.ga6(),!0,"\u5728\u539f\u57ce\u5371\u9669\u7a97\u53e3\u524d\u8fdb\u9a7b\u5b89\u5168\u53cb\u57ce\uff0c\u6539\u53d8\u6240\u5c5e\u57ce\u4ee5\u4fdd\u5168\u5c06\u9886",d2,d1)
if(d8!=null)d1=d0==null||d8.a.d>d0.a.d
else d1=!1
if(d1)d0=d8}if(d0==null){p=37
break}c4=d0.a
B.a.l(c5,d0.b)
c7=c4.L(k1)
if(m){c8=c4.x.i(0,k1)
if(c8==null)c8=b3}else{c8=c?1:0
c8=B.c.B(k5-a3-c8,0,5)}p=c7<=c8?39:40
break
case 39:d9=new A.bR(c5,b4.a(new A.ff()),b7).G(0,0,new A.fg(s),b8)
c7=c4.M()
c8=A.o(c5,c1)
c9=s.a5(r,c4)
d1=isFinite(r.ga6())?"\u5b89\u5168\u5224\u65ad\u4ee5\u5b9e\u9645\u8fdb\u9a7b\u53cb\u57ce\u4e3a\u51c6\uff0c\u9014\u4e2d\u539f\u57ce\u5931\u5b88\u4ecd\u4f1a\u6e05\u9664\u90e8\u961f":"\u8f6c\u79fb\u5230\u5b89\u5168\u540e\u65b9\u6574\u5907"
p=41
return k7.b=new A.a6(c7,c8,c9+d9*0.65,!1,d1,"relocation"),1
case 41:if(k2){p=38
break}case 40:p=37
break
case 38:case 36:e0=s.cD(r,q)
e1=new A.fI(s,q)
k6=s.a.Q
j=k6.r
d=A.h(j)
c=d.h("d<1>")
e2=A.o(new A.d(j,d.h("e(1)").a(new A.fh(s,q,e1,e0)),c),c.h("b.E"))
B.a.A(e2,new A.fi(e1,k0))
j=r.d
d=j.length===0?0:l.r.fy
c=t.S
d=A.Z(e2,0,A.W(d,"count",c),A.h(e2).c)
a3=d.$ti
d=new A.p(d,d.gm(0),a3.h("p<k.E>"))
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
c8=c7.h("r(1)")
c9=c7.h("O<1,r>")
d1=k0.e
d2=c7.c
c7=c7.h("x<1>")
d4=c7.h("p<k.E>")
d5=c7.h("k.E")
d6=c1==null
case 42:if(!d.j()){p=43
break}e3=d.d
if(e3==null)e3=a3.a(e3)
if(!k4.a_()){p=43
break}e4=e3.c
e5=b1.i(0,e4)
e6=r.ga6()
e7=e5==null
if(e7)e8=null
else e8=e5.d.length!==0||e5.a.at!=null
e8=e8===!0?e5.ga6():1/0
e9=Math.min(e6,e8)
e6=!1
if(!e1.$1(e3)||e0){e8=s.a2(r,q)
if((e8==null?null:e8.a)!==B.h){e6=q.L(k1)
if(m){e8=b8.i(0,k1)
if(e8==null)e8=b7}else{e8=b3?1:0
e8=B.c.B(k5-b4-e8,0,5)}e8=e6<e8
e6=e8}}p=e6?44:45
break
case 44:f0=new A.O(j,c8.a(new A.fj()),c9).aa(0,new A.fk(s))
if(m){e6=b8.i(0,k1)
if(e6==null)e6=b7}else{e6=b3?1:0
e6=B.c.B(k5-b4-e6,0,5)}e8=k.i(0,"soldierLimit")
e8.toString
f1=a6.bf(e3,f0,f0.ok,e6,!1,Math.min(B.b.k(e8),q.e+e3.gP()))
e6=d6?null:c1.b
if(e6==null)e6=-1
p=f1.b>e6+0.05?46:47
break
case 46:d7=a7.aj(e3,d1,k6,!0,k0)
if(m){e6=b8.i(0,k1)
if(e6==null)e6=b7}else{e6=b3?1:0
e6=B.c.B(k5-b4-e6,0,5)}e8=s.a2(r,q)
e8=e8==null?null:e8.b
d8=a4.aW(q,e3,d7,!0,e9,!0,"\u672c\u5730\u62b5\u6297\u4ecd\u6709\u7f3a\u53e3\uff08\u57ce\u9632"+e6+"\u7ea7\uff0c\u9632\u5b88\u4f59\u91cf"+B.b.ca((e8==null?-1:e8)*100)+"\u70b9\uff09\uff0c\u63f4\u519b\u7ea6"+B.b.aU(d7.b,1)+"\u79d2\u5230\u8fbe\uff0c\u5371\u9669\u7a97\u53e3"+B.b.aU(e9,1)+"\u79d2\uff0c\u9884\u7559\u5165\u57ce\u540d\u989d","rescue",k0)
if(d8!=null){e6=s.a2(r,d8.a)
e6=(e6==null?null:e6.a)===B.h}else e6=!1
p=e6?48:49
break
case 48:e6=d8.a
p=50
return k7.b=new A.a6(e6,A.c([d8.b],k3),s.a5(r,e6)-A.ae(e3)*0.08,!1,"","recall"),1
case 50:case 49:case 47:case 45:e6=new A.x(j,0,2,c7)
e6.V(j,0,2,d2)
e6=new A.p(e6,e6.gm(0),d4)
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
d7=a4.bg(e3,f4,q)
if(a6.cW(e3,f4,f4.ok,e8,a8.bc(f4.z)).a!==B.h){p=51
break}f6=e1.$1(e3)?"\u672c\u5730\u624b\u6bb5\u65e0\u6cd5\u62b5\u6321\u660e\u786e\u6765\u88ad\uff0c\u7d27\u6025\u622a\u51fb\u9884\u8ba1"+B.b.aU(d7.b,1)+"\u79d2\uff0c\u65e9\u4e8e\u654c\u519b"+B.b.aU(f3.b,1)+"\u79d2\u62b5\u57ce\uff1b\u6700\u540e\u624d\u6539\u6d3e\u8fdc\u5f81":"\u52a8\u7528\u9644\u8fd1\u95f2\u7f6e\u90e8\u961f\u622a\u51fb\u6765\u654c\uff0c\u4e0d\u6253\u65ad\u4e3b\u653b\u4efb\u52a1"
d8=a4.cl(q,e3,d7,f3.b,!0,f4,f6,"intercept",k0)
p=d8!=null?53:54
break
case 53:f3=d8.a
p=55
return k7.b=new A.a6(f3,A.c([d8.b],k3),s.a5(r,f3)+80-A.ae(e3)*0.08,k2,"","recall"),1
case 55:case 54:p=51
break
case 52:p=42
break
case 43:d=A.h(c3)
a3=d.h("d<1>")
f7=A.o(new A.d(c3,d.h("e(1)").a(new A.fl(s)),a3),a3.h("b.E"))
B.a.A(f7,new A.fm(s,q,k0))
if(c3.length>1){d=s.a2(r,q)
f8=(d==null?null:d.a)===B.p}else f8=!1
d=A.Z(j,0,A.W(2,"count",c),d2),c=d.$ti,d=new A.p(d,d.gm(0),c.h("p<k.E>")),a3=A.h(f7),a9=a3.c,a3=a3.h("x<1>"),b0=a3.h("p<k.E>"),b1=t.a,b8=t.H,c7=t.N,c8=t.dg,c9=t.cO,d1=t.Y,d2=t.T,d4=l.r,d5=d4.p4,e3=d4.R8,l=l.f,e4=t.fR,e6=t.w,e7=t.e,e8=t.eV,f2=a3.h("k.E"),d4=d4.d,c=c.h("k.E")
case 56:if(!d.j()){p=57
break}f3=d.d
if(f3==null)f3=c.a(f3)
if(!f8||f3.a.k1!=null||s.bz(f3,q)){p=56
break}f4=new A.x(f7,0,4,a3)
f4.V(f7,0,4,a9)
f4=new A.p(f4,f4.gm(0),b0)
f6=f3.a
f3=f3.b
f9=f6.z
g0=f6.ok
case 58:if(!f4.j()){p=59
break}g1=f4.d
if(g1==null)g1=f2.a(g1)
if(!k4.a_()){p=59
break}g2=q.u(k1)
g3=A.h(g2)
g4=g3.h("d<1>")
g5=A.o(new A.d(g2,g3.h("e(1)").a(new A.fn(g1)),g4),g4.h("b.E"))
if(g5.length===0){p=58
break}g6=B.a.aa(g5,new A.fo(s,q,k0))
d7=a4.bg(g1,f6,q)
if(!d7.d||d7.b+d4>=f3){p=58
break}g7=A.c([new A.aW(q,A.c([],e6),A.c([],e7))],e8)
if(k2){g2=q.d
g3=k.i(0,"emergencyGold")
g3.toString
g3=g2<B.b.k(g3)+4
g2=g3}else g2=!1
if(g2){g2=A.h(g5)
g3=g2.h("d<1>")
g8=A.o(new A.d(g5,g2.h("e(1)").a(new A.fq(g6)),g3),g3.h("b.E"))
B.a.A(g8,new A.fr())
if(g8.length!==0&&k4.a_()){b9=q.M()
if(b9.bZ(B.a.gD(g8)))B.a.l(g7,new A.aW(b9,A.c([new A.z(B.A,B.a.gD(g8).a,null,null,0,B.d)],e6),A.c([B.a.gD(g8)],e7)))}}if(m){g2=q.u(k1)
g3=A.h(g2)
g4=g3.h("d<1>")
a0=A.o(new A.d(g2,g3.h("e(1)").a(new A.fs()),g4),g4.h("b.E"))
B.a.A(a0,new A.ft())
f=q.M()
if(a0.length!==0&&f.aH(k0,B.a.gD(a0))&&f.d>=f.ae(!0).a)B.a.l(g7,new A.aW(f,A.c([new A.z(B.l,B.a.gD(a0).a,k1,null,0,B.d)],e6),A.c([],e7)))}g2=A.o(g7,e4)
g3=g2.length
b5=0
for(;b5<g2.length;g2.length===g3||(0,A.u)(g2),++b5){g9=g2[b5]
h=g9.a.M()
if(m){g4=h.x.i(0,k1)
if(g4==null)g4=b7}else{g4=b3?1:0
g4=B.c.B(k5-b4-g4,0,5)}h0=Math.min(g4,h.u(k1).length-1)
g4=h.f
h1=k.i(0,"soldierLimit")
h1.toString
h2=Math.min(g4,(h0+1)*B.b.k(h1))-h.e
if(h2>0&&h.aA(h2)&&h.d>=h.ae(!0).a){g4=A.o(g9.b,d2)
g4.push(new A.z(B.m,null,k1,null,h2,B.d))
B.a.l(g7,new A.aW(h,g4,g9.c))}}g2=g7.length,g3=g1.w<=d5,g4=g1.f,h1=g6===null,h3=!h1,b5=0
case 60:if(!(b5<g7.length)){p=62
break}h4=g7[b5]
h5=h4.a
h6=l.gar()
h7=A.l(h6)
h8=h7.h("d<b.E>")
h9=A.o(new A.d(h6,h7.h("e(b.E)").a(new A.fu(s,h5)),h8),h8.h("b.E"))
B.a.A(h9,new A.fv())
if(h9.length===0){p=61
break}h6=[A.c([B.a.gD(h9).a],b1)],h7=h4.c,h8=J.aD(h7),i0=h4.b,i1=J.aD(i0),i2=h5.x,i3=0
case 63:if(!(i3<1)){p=65
break}i4=h6[i3]
i5=a8.bc(f9)
i6=k.i(0,"soldierLimit")
i6.toString
f1=a6.cZ(g1,f6,g0,i4,!0,Math.min(B.b.k(i6),h5.e),i5)
i7=f1.a===B.h
i5=!i7
i6=!1
if(i5)if(g3)if(h3)if(f1.d>0){i6=k.i(0,"soldierLimit")
i6.toString
i6=Math.min(B.b.k(i6),h5.e)
i8=k.i(0,"soldierHp")
i8.toString
i8=f1.f<g4+i6*B.b.k(i8)
i6=i8}if(i6){i6=h5.u(k1)
i8=A.h(i6)
i9=i8.h("d<1>")
i6=A.o(new A.d(i6,i8.h("e(1)").a(new A.fw(g1)),i9),i9.h("b.E"))
i7=!1
i8=A.h(i6).h("L<1>")
i6=new A.L(i6,i8)
if(m){i9=i2.i(0,k1)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.B(k5-b4-i9,0,5)}j0=new A.x(i6,0,i9,i8.h("x<k.E>"))
j0.V(i6,0,i9,i8.h("k.E"))
j1=B.a.d8(j0.ab(0),new A.fx(g6))
if(j1<0){p=64
break}i6=h5.e
i8=k.i(0,"soldierLimit")
i8.toString
j2=Math.max(0,i6-(j1+1)*B.b.k(i8))
if(m){i6=i2.i(0,k1)
if(i6==null)i6=b7}else{i6=b3?1:0
i6=B.c.B(k5-b4-i6,0,5)}i8=k.i(0,"soldierLimit")
i8.toString
j3=a6.bW(g6,f6,i6,Math.min(B.b.k(i8),j2))
if(m){i6=i2.i(0,k1)
if(i6==null)i6=b7}else{i6=b3?1:0
i6=B.c.B(k5-b4-i6,0,5)}i8=k.i(0,"soldierLimit")
i8.toString
i9=f1.d
j4=a6.cX(g6,f6,i9,i6,Math.min(B.b.k(i8),j2))
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
i8=Math.min(B.b.k(i8),h5.e)}d8=a4.ci(h5,g1,d7,i5,f3,!0,f6,i4,i8,i6,"intercept",k0)
if(d8==null){p=64
break}i6=d8.a
j7=i6.L(k1)
i8=d8.b
i9=A.o(i0,d2)
B.a.F(i9,i8.b)
j0=A.jf(c7,c7)
j0.F(0,i8.c)
j0.F(0,a4.af(new A.bx(i1.aF(i0,new A.fy(s),c8),c9),A.c([],d1)))
i8=A.c([new A.N(i8.a,i9,j0,i8.d,i8.e,!0)],k3)
j0=s.a5(r,i6)
i9=Math.max(0,q.d-i6.d)
i5=i5?A.ae(g1)*0.5:0
j8=h8.G(h7,0,new A.fz(),b8)
if(m){j9=i6.x.i(0,k1)
if(j9==null)j9=b7}else{j9=b3?1:0
j9=B.c.B(k5-b4-j9,0,5)}j9=j7>j9||!j6
p=66
return k7.b=new A.a6(i6,i8,j0+200+j5*500-i9*0.25-i5-j8,j9,"","local"),1
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
case 67:l=k6.f,k=A.h(l),j=k.h("d<1>"),j=A.lz(new A.d(l,k.h("e(1)").a(new A.fB(s)),j),3,j.h("b.E")),k=j.a,j=new A.bb(k.gC(k),j.b,A.l(j).h("bb<1>"))
case 69:if(!j.j()){p=70
break}l=j.gn()
if(!k4.a_()){p=70
break}b6=B.a.gD(c3)
d8=a4.ck(q,b6,a7.aj(b6,l.e,k6,!0,l),r.ga6(),!0,"\u4fdd\u7559\u539f\u57ce\u5b88\u519b\u62d6\u5ef6\uff0c\u6838\u5fc3\u5728\u5371\u9669\u7a97\u53e3\u524d\u593a\u53d6\u7a7a\u57ce\u5efa\u7acb\u65b0\u636e\u70b9","newBase",l)
p=d8!=null?71:72
break
case 71:l=d8.a
k=A.c([d8.b],k3)
d=s.a5(r,l)
c=A.ae(b6)
a3=l.L(k1)
if(m){a6=l.x.i(0,k1)
if(a6==null)a6=b7}else{a6=b3?1:0
a6=B.c.B(k5-b4-a6,0,5)}p=73
return k7.b=new A.a6(l,k,d+c*1.2,a3>a6,"","relocation"),1
case 73:case 72:p=69
break
case 70:case 68:case 1:return 0
case 2:return k7.c=n.at(-1),3}}}},
aw(a,b,c,d,e){var s,r,q,p,o,n,m=this
t.f3.a(d)
s=A.h(d)
r=s.h("r?(1)").a(new A.fO(m))
q=c.z.d4(b.z).G(0,0,new A.fP(m),t.i)
p=c.M()
o=A.o(d,t.T)
s=A.o(new A.bx(new A.O(d,r,s.h("O<1,r?>")),t.cO),t.r)
r=a.d
n=A.h(r)
B.a.F(s,new A.O(r,n.h("r(1)").a(new A.fQ()),n.h("O<1,r>")))
n=a.a
s=A.c([new A.N(e,o,m.e.af(s,A.c([n],t.Y)),B.r,c.ae(!0).a,!0)],t.Z)
o=m.a5(a,c)
r=Math.max(0,b.d-c.d)
if(c.L(n.a)<=c.O(n)){n=m.a2(a,c)
n=(n==null?null:n.a)!==B.h}else n=!0
return new A.a6(p,s,o-q*0.65-r*0.2,n,"","local")},
bz(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=b.y,s=new A.ah(s,s.r,s.e,A.l(s).h("ah<2>")),r=this.e,q=a.a,p=q.a,o=this.a.Q,n=o.b,m=b.z,l=this.b.r.d,k=a.b;s.j();){j=s.d
if(j.b!=="intercept"||j.r!==p||j.y<=n)continue
i=o.a1(j.a)
if(i==null||i.f<=0||i.fy||m.p(0,i.a))continue
if(i.k1===p)return!0
if(!i.dx||j.z<=n)continue
h=r.bg(i,q,b)
if(h.d&&h.b+l<k)return!0}return!1},
cD(a,b){var s,r
if(this.c.e)return!1
s=a.a
if(!(s.at!=null||B.a.I(a.d,new A.fJ())))return!1
if(b.u(s.a).length===0)return!0
r=this.a2(a,b)
return r!=null&&r.c<-this.b.r.p3},
a2(b3,b4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1=null,b2=b3.d
if(b2.length===0)return b1
s=b3.a
r=s.a
q=b4.u(r)
p=b4.e
for(o=b4.y,o=new A.ah(o,o.r,o.e,A.l(o).h("ah<2>")),n=t.N,m=t.z,l=t.n,k=b0.e.c,j=b0.a.Q,i=j.b,h=b4.z,g=b0.b,f=g.r.d;o.j();){e=o.d
if(!e.as||e.d!==r||e.y<i)continue
d=j.a1(e.a)
if(d==null||d.fy||d.k1!=null||d.f<=0||h.p(0,d.a)||B.a.I(q,new A.fK(d)))continue
c=d.z
for(e=J.j9(e.w,e.x),b=e.$ti,e=new A.p(e,e.gm(0),b.h("p<k.E>")),b=b.h("k.E"),a=0;e.j();c=a1){a0=e.d
a1=a0==null?b.a(a0):a0
a+=k.Z(c,a1)}if(!isFinite(a)||a+f>=b3.ga6())continue
p=Math.min(b4.f,p+d.gP())
e=A.ar(d.H(),n,m)
e.v(0,"hp",d.r)
e.v(0,"troops",A.c([],l))
e.v(0,"s",0)
B.a.l(q,A.jF(e))}B.a.A(q,new A.fL())
o=A.h(q)
n=t.r
a2=A.b4(new A.d(q,o.h("e(1)").a(new A.fM(b3)),o.h("d<1>")),n)
m=A.c([],t.e)
if(a2!=null)m.push(a2)
o=o.h("L<1>")
B.a.F(m,new A.L(q,o).br(0,o.h("e(k.E)").a(new A.fN(a2))))
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
f=B.c.B(s-k-f,0,5)}a9=o.bf(d,h,h.ok,Math.max(1,f-a5),!1,d.gP()+a6)
if(a7==null||a9.b<a7.b)a7=a9}if(a4==null||a7.b>a4.b)a4=a7}return a4},
a5(a,b){var s=a.a,r=b.L(s.a),q=Math.max(0,r-b.O(s)),p=this.a.Q.gN().gm(0)===1?400:0,o=150+s.r*4+a.r*0.5+p,n=this.a2(a,b)
s=r===0?o*2:0
p=n==null?null:n.b
if(p==null)p=-0.8
return-q*5000-s+p*o}}
A.fW.prototype={
$1(a){return this.a.bz(t.O.a(a),this.b)},
$S:10}
A.fX.prototype={
$1(a){t.J.a(a)
return a.f&&B.a.I(this.a.d,new A.fV(a))},
$S:15}
A.fV.prototype={
$1(a){return t.O.a(a).a.a===this.a.r},
$S:10}
A.fY.prototype={
$1(a){var s,r,q,p,o,n=this
t.cs.a(a)
s=!1
if(a.f==="local"){r=a.b
if(r.length!==0)if(B.a.I(r,new A.fT())){q=a.a
p=n.b
o=p.a
if(q.L(o.a)<=q.O(o)){s=n.a
q=s.a2(p,q)
q=q==null?null:q.b
if(q==null)q=-1
o=n.c
o=o==null?null:o.b
s=(q>(o==null?-1:o)+0.04||B.a.I(r,new A.fU()))&&a.c>s.a5(p,n.d)}}}return s},
$S:36}
A.fT.prototype={
$1(a){return B.a.I(t.I.a(a).b,new A.fS())},
$S:27}
A.fS.prototype={
$1(a){var s=t.T.a(a).a
return s===B.l||s===B.m||s===B.C},
$S:28}
A.fU.prototype={
$1(a){return B.a.I(t.I.a(a).d,new A.fR())},
$S:27}
A.fR.prototype={
$1(a){return t.J.a(a).b==="intercept"},
$S:15}
A.fc.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.fd.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fe.prototype={
$1(a){t.r.a(a)
return a.dy&&a.e!==2},
$S:0}
A.fp.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.ae(a),A.ae(b))},
$S:2}
A.fA.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fC.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.fD.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fE.prototype={
$1(a){t.r.a(a)
return a.db&&!this.a.as.p(0,a.a)},
$S:0}
A.fF.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ae(s.a(b)),A.ae(a))},
$S:2}
A.fG.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:1}
A.fH.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.J(s),b.e.J(s))},
$S:4}
A.ff.prototype={
$1(a){return t.I.a(a).d},
$S:39}
A.fg.prototype={
$2(a,b){var s
A.ax(a)
s=this.a.a.Q.a1(t.J.a(b).a)
s.toString
return a+A.ae(s)},
$S:40}
A.fI.prototype={
$1(a){var s,r,q=this.a.a.Q,p=this.b
if(A.ju(a,q,p)==null){p=p.y
s=a.a
r=p.i(0,s)
if((r==null?null:r.b)==="intercept"){p=p.i(0,s)
q=q.a1(p==null?null:p.r)
q=q==null?null:q.f
q=(q==null?0:q)>0}else q=!1}else q=!0
return q},
$S:0}
A.fh.prototype={
$1(a){var s,r,q,p,o=this
t.r.a(a)
s=!1
if(a.b===o.a.a.Q.a)if(a.dx)if(!a.fy){r=o.b
q=a.a
p=r.y.i(0,q)
if((p==null?null:p.as)!==!0)if(!r.as.p(0,q))s=!o.c.$1(a)||o.d}return s},
$S:0}
A.fi.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a
if(!J.an(s.$1(a),s.$1(b)))return s.$1(a)?1:-1
s=this.b.e
return B.b.t(a.z.J(s),b.z.J(s))},
$S:2}
A.fj.prototype={
$1(a){return t.O.a(a).a},
$S:29}
A.fk.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.ku(a,s)>A.ku(b,s)?a:b},
$S:18}
A.fl.prototype={
$1(a){return t.r.a(a).w<=this.a.b.r.p4},
$S:0}
A.fm.prototype={
$2(a,b){var s,r,q,p=t.r
p.a(a)
p.a(b)
p=this.a.b
s=p.r.p4
r=a.w<=s
if(r!==b.w<=s)return r?-1:1
s=this.b
q=this.c
return B.b.t(A.dt(a,p,s.O(q),4),A.dt(b,p,s.O(q),4))},
$S:2}
A.fn.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fo.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a.b
s=this.b
r=this.c
return A.dt(a,q,s.O(r),4)>A.dt(b,q,s.O(r),4)?a:b},
$S:18}
A.fq.prototype={
$1(a){t.r.a(a)
return a!==this.a&&a.dy&&a.e!==2},
$S:0}
A.fr.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.ae(a),A.ae(b))},
$S:2}
A.fs.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.ft.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fu.prototype={
$1(a){var s
t.o.a(a)
s=this.b.w.i(0,a.a)
if((s==null?0:s)<=0)s=a.f&&this.a.a.Q.c>=a.e
else s=!0
return s},
$S:8}
A.fv.prototype={
$2(a,b){var s=t.o
s.a(a)
return B.c.t(s.a(b).c,a.c)},
$S:11}
A.fw.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fx.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fy.prototype={
$1(a){return this.a.a.Q.a1(t.T.a(a).b)},
$S:31}
A.fz.prototype={
$2(a,b){return A.w(a)+A.ae(t.r.a(b))*0.65},
$S:46}
A.fB.prototype={
$1(a){var s
t.q.a(a)
s=this.a.a.Q
return a.b!==s.a&&s.u(a.a).length===0},
$S:1}
A.fO.prototype={
$1(a){return this.a.a.Q.a1(t.T.a(a).b)},
$S:31}
A.fP.prototype={
$2(a,b){var s
A.ax(a)
s=this.a.a.Q.a1(A.H(b))
s.toString
return a+A.ae(s)},
$S:47}
A.fQ.prototype={
$1(a){return t.O.a(a).a},
$S:29}
A.fJ.prototype={
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
A.fK.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fL.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.fM.prototype={
$1(a){return t.r.a(a).a===this.a.a.ch},
$S:0}
A.fN.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.J.prototype={
H(){return A.c([this.a,this.b],t.n)},
J(a){var s=this.a-a.a,r=this.b-a.b
return Math.sqrt(s*s+r*r)},
aE(a,b){var s=this.a,r=this.b
return new A.J(s+(a.a-s)*b,r+(a.b-r)*b)}}
A.ea.prototype={
a4(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this.a,f=B.a.gD(g)
for(s=a.a,r=a.b,q=1/0,p=0;o=g.length,p<o;){n=g[p];++p
m=g[p%o]
o=n.a
l=m.a-o
k=n.b
j=m.b-k
i=n.aE(m,B.b.B(((s-o)*l+(r-k)*j)/(l*l+j*j),0,1))
h=i.J(a)
if(h<q){q=h
f=i}}return f},
p(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(this.a4(b).J(b)<1e-7)return!0
for(s=this.a,r=s.length,q=b.b,p=b.a,o=!1,n=0;n<r;){m=s[n];++n
l=s[n%r]
k=m.b
j=l.b
if(k>q!==j>q){i=m.a
i=p<(l.a-i)*(q-k)/(j-k)+i
k=i}else k=!1
if(k)o=!o}return o},
c0(a,b){var s
if(this.p(0,a))return null
s=this.bX(a,b)
return s.length===0?null:B.a.aa(s,B.y)},
bX(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.a,g=b.a-h,f=a.b,e=b.b-f,d=A.c([],t.n)
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
if(j>=-1e-7&&j<=1.0000001&&i>=-1e-7&&i<=1.0000001)B.a.l(d,B.b.B(j,0,1))}return d},
bQ(a,b){var s,r=this
if(r.p(0,a))return r.a4(a)
s=r.c0(a,b)
return s==null?r.a4(a):a.aE(b,s)},
bY(a,b){var s=a.J(b),r=s<1e-7?new A.J(a.a+4096,a.b+0):a.aE(b,4096/s),q=this.bX(a,r)
return q.length===0?this.a4(b):a.aE(r,B.a.aa(q,B.G))}}
A.ak.prototype={
aL(){return"AiArmyState."+this.b}}
A.r.prototype={
gP(){var s=this.at,r=A.h(s)
return new A.d(s,r.h("e(1)").a(new A.dx()),r.h("d<1>")).gm(0)},
gaQ(){return this.f+B.a.G(this.at,0,new A.dw(),t.H)},
H(){var s,r,q,p,o,n,m,l=this,k=l.z,j=t.n
k=A.c([k.a,k.b],j)
s=l.Q
s=A.c([s.a,s.b],j)
r=l.CW
r=r==null?null:A.c([r.a,r.b],j)
q=A.c([],t.b)
for(p=l.p2,o=p.length,n=0;n<p.length;p.length===o||(0,A.u)(p),++n){m=p[n]
q.push(A.c([m.a,m.b],j))}return A.R(["id",l.a,"c",l.b,"home",l.c,"o",l.d,"t",l.e,"hp",l.f,"max",l.r,"a",l.w,"p",l.x,"pay",l.y,"xy",k,"v",s,"s",l.as.a,"troops",l.at,"w",l.ax,"m",l.ay,"due",l.ch,"to",r,"target",l.cx,"return",l.cy,"dispatch",l.db,"move",l.dx,"dismiss",l.dy,"upgrade",l.fr,"retreat",l.fx,"marked",l.fy,"rev",l.go,"orderRev",l.id,"opponent",l.k1,"clashes",l.k2,"received",l.k3,"dealt",l.k4,"opening",l.ok,"weaponReady",l.p1,"returnPath",q,"regionCity",l.p3,"salaryPaidMonth",l.p4,"movementPending",l.R8],t.N,t.X)}}
A.dx.prototype={
$1(a){return A.ax(a)>0},
$S:19}
A.dw.prototype={
$2(a,b){return A.w(a)+A.ax(b)},
$S:14}
A.Q.prototype={
gad(){var s,r=this,q=r.at
if(q==null)q=r.d
else{s=r.cy?1:0
s=B.c.B(q-r.ax-s,0,5)
q=s}return q},
H(){var s,r,q,p,o,n=this,m=n.e,l=t.n
m=A.c([m.a,m.b],l)
s=A.c([],t.b)
for(r=n.f.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.u)(r),++p){o=r[p]
s.push(A.c([o.a,o.b],l))}return A.R(["id",n.a,"c",n.b,"native",n.c,"level",n.d,"xy",m,"outline",s,"income",n.r,"baseIncome",n.z,"poor",n.w,"cap",n.x,"recruitCap",n.y,"recruit",n.Q,"rev",n.as,"initial",n.at,"wins",n.ax,"attacker",n.ay,"defender",n.ch,"stage",n.CW,"next",n.cx,"fallen",n.cy,"danger",n.db],t.N,t.X)}}
A.b0.prototype={
H(){var s,r,q=this,p=t.N,o=t.S,n=A.Y(p,o)
for(s=q.w.gah(),s=s.gC(s);s.j();){r=s.gn()
n.v(0,""+r.a,r.b)}o=A.Y(p,o)
for(s=q.x.gah(),s=s.gC(s);s.j();){r=s.gn()
o.v(0,""+r.a,r.b)}return A.R(["id",q.a,"gold",q.b,"reserves",q.c,"capacity",q.d,"salary",q.e,"poor",q.f,"garrisonAccrued",q.r,"stock",n,"hate",o],p,t.X)}}
A.e2.prototype={
gaq(){return B.a.ao(this.w,new A.e8(this))},
gN(){var s=this.f,r=A.h(s)
return new A.d(s,r.h("e(1)").a(new A.e9(this)),r.h("d<1>"))},
u(a){var s=this.r,r=A.h(s),q=r.h("d<1>")
s=A.o(new A.d(s,r.h("e(1)").a(new A.e5(this,a)),q),q.h("b.E"))
B.a.A(s,new A.e6())
return s},
a1(a){var s=this.r,r=A.h(s)
return A.b4(new A.d(s,r.h("e(1)").a(new A.e7(a)),r.h("d<1>")),t.r)},
K(a){var s=this.f,r=A.h(s)
return A.b4(new A.d(s,r.h("e(1)").a(new A.e3(a)),r.h("d<1>")),t.q)},
H(){var s,r,q,p,o=this,n=t.d,m=A.c([],n)
for(s=o.f,r=s.length,q=0;q<r;++q)m.push(s[q].H())
s=A.c([],n)
for(r=o.r,p=r.length,q=0;q<p;++q)s.push(r[q].H())
n=A.c([],n)
for(r=o.w,p=r.length,q=0;q<p;++q)n.push(r[q].H())
return A.R(["country",o.a,"tick",o.b,"month",o.e,"cities",m,"heroes",s,"countries",n,"pool",o.x,"salary",o.y,"year",o.c,"monthIndex",o.d],t.N,t.X)}}
A.e8.prototype={
$1(a){return t.t.a(a).a===this.a.a},
$S:9}
A.e9.prototype={
$1(a){return t.q.a(a).b===this.a.a},
$S:1}
A.e5.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b
if(a.c===s){r=a.as
s=(r===B.f||r===B.e)&&a.f>0&&a.b===B.a.ao(this.a.f,new A.e4(s)).b}else s=!1
return s},
$S:0}
A.e4.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.e6.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.e7.prototype={
$1(a){return t.r.a(a).a===this.a},
$S:0}
A.e3.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.ha.prototype={
co(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
for(s=this.b,r=s.y,r=new A.ah(r,r.r,r.e,A.l(r).h("ah<2>")),q=this.f,p=this.a,o=p.a,n=s.z,s=s.Q;r.j();){m=r.d
l=p.a1(m.a)
k=p.K(m.d)
j=!0
if(m.b==="expedition")if(l!=null)if(k!=null)if(k.b!==o)if(l.b===o)if(!l.fy)if(!(l.f<=0)){m=l.a
if(!n.p(0,m)){i=l.as
if(i!==B.t)m=(i===B.f||i===B.e)&&!s.p(0,m)
else m=j}else m=j}else m=j
else m=j
else m=j
else m=j
else m=j
else m=j
else m=j
if(m)continue
J.kR(q.dh(k.a,new A.hc()),l)}},
gaS(){var s,r,q,p=this,o=p.d
if(o==null||p.f.a!==0)return o
s=new A.hg(p)
r=p.a
if(A.al(o,r,p.c,null).gW())return s.$1(o)?o:null
r=r.f
q=A.h(r)
return new A.O(r,q.h("a(1)").a(new A.he()),q.h("O<1,a>")).du(0).I(0,new A.hf(p,s))?null:o},
gc7(){var s,r=this
if(r.gaS()!=null){s=r.a.K(r.e)
s=s==null?null:s.b
s=s==r.gaS()}else s=!1
return s?r.e:null},
gY(){var s=this.f,r=A.l(s).h("a7<1>"),q=A.o(new A.a7(s,r),r.h("b.E"))
B.a.A(q,new A.hk(this))
return A.b4(q,t.S)},
gc5(){var s,r=this,q=r.gY()
if(q!=null){s=r.c.r
s=r.a.d>=s.k2&&r.f.a<s.k1&&r.d0(q)>=s.k3}else s=!0
return s},
az(a){var s,r,q,p=this
if(p.gY()==null)return!0
s=!1
if(p.gaS()!=null)if(a.b!==p.gaS())s=p.gY()==null||!p.gc5()
if(s)return!1
r=p.gY()
if(r==null)r=p.gc7()
s=!0
if(r!=null){q=a.a
if(q!==r)s=p.gY()!=null&&!p.f.a0(q)&&p.gc5()}return s},
d0(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c="soldierLimit",b=d.a,a=b.K(a0)
a.toString
s=d.f.i(0,a0)
if(s==null)s=A.c([],t.e)
r=s.length
q=d.b.Q
p=d.c.b
o=0
n=0
for(;n<s.length;s.length===r||(0,A.u)(s),++n){m=s[n]
if(q.p(0,m.a)){l=p.i(0,c)
l.toString
k=B.b.k(l)}else k=m.gP()
o+=d.bI(m,k,0)}j=B.a.ao(b.w,new A.hd(a)).c
for(b=b.u(a0),s=A.h(b).h("L<1>"),s=A.Z(new A.L(b,s),0,A.W(a.gad(),"count",t.S),s.h("k.E")),b=s.$ti,s=new A.p(s,s.gm(0),b.h("p<k.E>")),r=a.cy,q=a.at,l=a.ax,i=q==null,b=b.h("k.E"),a=a.d,h=0,g=0;s.j();){f=s.d
if(f==null)f=b.a(f)
e=p.i(0,c)
e.toString
k=Math.min(B.b.k(e),f.gP()+j)
j-=k-f.gP()
if(i)e=a
else{e=r?1:0
e=B.c.B(q-l-e,0,5)}h+=d.bI(f,k,Math.max(1,e-g));++g}return h===0?1/0:o/h},
bI(a,b,c){var s,r=this.c,q=r.bd(a.w,c,!1)
r=r.b
s=r.i(0,"soldierPower")
s.toString
s=B.b.k(s)
r=r.i(0,"soldierHp")
r.toString
return(a.f+b*B.b.k(r))*(B.c.bb(q+b*s+2,4)+1)*(1+a.ay/1000)}}
A.hb.prototype={
$1(a){var s=t.q.a(a).b
return s===this.a&&s!==this.b.a},
$S:1}
A.hc.prototype={
$0(){return A.c([],t.e)},
$S:66}
A.hg.prototype={
$1(a){var s=this.a,r=s.a.f,q=A.h(r)
return new A.d(r,q.h("e(1)").a(new A.hi(a)),q.h("d<1>")).I(0,new A.hj(s))},
$S:13}
A.hi.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.hj.prototype={
$1(a){var s
t.q.a(a)
s=this.a
return s.a.gN().I(0,new A.hh(s,a))},
$S:1}
A.hh.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.b.c.Z(r,this.b.f.a4(r))<=s.c.r.at},
$S:1}
A.he.prototype={
$1(a){return t.q.a(a).b},
$S:49}
A.hf.prototype={
$1(a){var s
A.f(a)
s=this.a
return A.al(a,s.a,s.c,null).gW()&&this.b.$1(a)},
$S:13}
A.hk.prototype={
$2(a,b){var s,r
A.f(a)
A.f(b)
s=this.a.f
r=B.c.t(s.i(0,b).length,s.i(0,a).length)
return r!==0?r:B.c.t(a,b)},
$S:17}
A.hd.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:9}
A.d7.prototype={}
A.hl.prototype={
c2(a){var s=this.a.Q
return!A.al(a.b,s,this.b,null).gW()||s.gN().I(0,new A.hm(this,a))},
aO(a,b){var s,r=this.b
if(A.al(b.b,this.a.Q,r,null).gW()){s=a.z
r=this.c.Z(s,b.f.a4(s))<=r.r.at}else r=!0
return r},
c4(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h=a.as
if(!(h===B.f||h===B.e))return A.c([a.ax],t.p)
h=this.b
s=h.f.gar()
r=A.l(s)
q=r.h("d<b.E>")
p=A.o(new A.d(s,r.h("e(b.E)").a(new A.hp(this,b,c)),q),q.h("b.E"))
B.a.A(p,new A.hq())
s=t.a
o=A.c([A.c([],s)],t.p)
for(r=t.S,q=A.h(p),n=A.Z(p,0,A.W(5,"count",r),q.c),m=n.$ti,n=new A.p(n,n.gm(0),m.h("p<k.E>")),m=m.h("k.E");n.j();){l=n.d
B.a.l(o,A.c([(l==null?m.a(l):l).a],s))}if(p.length!==0){n=q.h("e(1)")
q=q.h("d<1>")
k=A.o(new A.d(p,n.a(new A.hr(a)),q),q.h("b.E"))
m=k.length===0?p:k
j=B.a.aa(m,new A.hs())
if(!B.a.I(o,new A.ht(j)))B.a.l(o,A.c([j.a],s))
h=h.b.i(0,"carryLimit")
h.toString
B.a.l(o,A.c1(Math.min(3,B.b.k(h)),j.a,!1,r))
i=A.b4(new A.d(p,n.a(new A.hu(b)),q),t.o)
if(i!=null&&!B.a.I(o,new A.hv(i)))B.a.l(o,A.c([i.a],s))}return o},
bj(a,b){return this.c4(a,b,!1)},
c8(a8,a9,b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=this,a4=a3.a.Q,a5=a3.b,a6=A.al(b0.b,a4,a5,a9.x),a7=a8.as
if(!(a7===B.f||a7===B.e))return a3.bj(a8,a9)
a7=a6.c
s=Math.max(0,a9.d-a9.T().a-a7*2)
if(!a6.gW()&&s===0)return a3.bj(a8,a9)
r=Math.min(a4.u(b0.a).length,b0.gad())
if(r===0)return A.c([B.d],t.p)
q=a3.c4(a8,a9,!0)
p=new A.hx(a3)
for(o=q.length,n=null,m=1,l=0;l<q.length;q.length===o||(0,A.u)(q),++l){k=q[l]
j=A.cy(a8,b0,a4,a5,b1,k,0).a
if(j[2]>0)if(n!=null){i=p.$1(k)
h=p.$1(n)
if(typeof i!=="number")return i.dE()
if(typeof h!=="number")return A.jy(h)
h=i<h
i=h}else i=!0
else i=!1
if(i){m=j[2]
n=k}}if(n==null)return q
o=p.$1(n)
a7=B.c.aX(B.b.ag(a7*a6.gaC())+B.b.X(s*0.15),m)
if(typeof o!=="number")return o.cf()
g=o+a7
a7=t.p
f=A.c([n],a7)
for(o=a5.f.gar(),o=o.gC(o),j=a5.b,i=a9.w,h=a8.f,e=t.S,d=a4.c;o.j();){c=o.gn()
b=c.a
a=i.i(0,b)
if((a==null?0:a)===0)a=!(c.f&&d>=c.e)
else a=!1
if(a)continue
a=c.b
c=c.d
a0=1
for(;;){a1=j.i(0,"carryLimit")
a1.toString
if(!(a0<=Math.min(r,B.b.k(a1))))break
if(!(a*a0<=g)){a1=i.i(0,b)
a1=(a1==null?0:a1)>=a0}else a1=!0
if(a1){a1=j.i(0,"soldierLimit")
a1.toString
a1=B.b.k(a1)
a2=j.i(0,"soldierHp")
a2.toString
a2=c<h+a1*B.b.k(a2)
a1=a2}else a1=!1
if(a1)B.a.l(f,A.c1(a0,b,!1,e));++a0}}B.a.A(f,new A.hw(new A.hz(a3),p))
for(o=A.Z(f,0,A.W(a5.r.fy,"count",e),t.L),j=o.$ti,o=new A.p(o,o.gm(0),j.h("p<k.E>")),j=j.h("k.E");o.j();){i=o.d
if(i==null)i=j.a(i)
if(A.cy(a8,b0,a4,a5,b1,i,0).a[2]>0)return A.c([i],a7)}return A.c([n],a7)},
af(a,b){var s,r,q,p,o
t.ef.a(a)
t.fy.a(b)
s=t.N
s=A.Y(s,s)
for(r=J.E(a);r.j();){q=r.gn()
s.v(0,"h:"+q.a,q.go)}for(r=b.length,p=0;p<b.length;b.length===r||(0,A.u)(b),++p){o=b[p]
s.v(0,"c:"+o.a,o.as)}return s},
ak(a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7=this,a8=null
t.L.a(b7)
if(!b1.d||!isFinite(b1.b)||J.j8(b1.a)||b0.fy||a9.as.p(0,b0.a))return a8
s=b1.b
r=a7.b
q=r.r
p=q.d
o=s+p
if(o>=b4)return a8
n=c2==="expedition"
if(n&&A.al(c3.b,a7.a.Q,r,a8).gW()&&s>q.at)return a8
m=b0.a
l=a9.y.i(0,m)
k=l==null
if(!k){if(l.z>a7.a.Q.b&&!b5)return a8
j=!1
if(l.b===c2){i=l.d
if(i===c3.a){i=l.r
if(i==(b6==null?a8:b6.a)){j=l.w
i=J.cA(j)
j=i.gap(j)&&i.gaD(j).J(J.kV(b1.a))<32&&b0.as!==B.n}}}if(j)return a8}h=a9.M()
g=A.c([],t.w)
j=!b2
if(j){i=r.b
f=i.i(0,"battleBudget")
f.toString
e=b3?1:c3.gad()
e=Math.min(e,a7.a.Q.u(c3.a).length)
e=Math.max(1,e)
i=i.i(0,"supplySafety")
i.toString
o+=f*(b9+1)*e+s+i}if(o>q.p1)return a8
s=c3.a
i=b6==null
f=i?a8:b6.a
e=a7.a
d=e.Q
c=d.b
p=B.b.ag(isFinite(b4)?b4*60:(Math.max(o,60)+q.cx+p)*60)
b=B.b.ca(q.CW*60)
a=b1.a
r=r.b
a0=r.i(0,"supplySeconds")
a0.toString
a0=B.b.ag(o/a0)
if(n)n=c3.b
else n=a8
a1=new A.ad(m,c2,c1,s,n,b3,f,a,0,c+p,c+b,a0,b2,b0.id+1)
p=!1
if(b2){n=h.L(s)
if((k?a8:l.as)===!0)p=(k?a8:l.d)===s
else p=!1
p=p?1:0
q=c0?Math.max(h.O(c3),c3.y+q.cy):h.O(c3)
q=n-p>=q}else q=p
if(q)return a8
q=b0.as
if(q===B.f||q===B.e){q=h.f
r=r.i(0,"soldierLimit")
r.toString
a2=Math.max(0,Math.min(q,b8+B.b.k(r)-b0.gP())-h.e)
if(a2>0){if(e.x===B.k)return a8
if(!h.aA(a2))return a8
B.a.l(g,new A.z(B.m,a8,b0.c,a8,a2,B.d))}r=t.S
a3=A.Y(r,r)
for(r=b7.length,q=h.w,e=e.x===B.k,a4=0;a4<b7.length;b7.length===r||(0,A.u)(b7),++a4){a5=b7[a4]
a3.aG(a5,new A.hA(),new A.hB())
p=q.i(0,a5)
if(p==null)p=0
n=a3.i(0,a5)
n.toString
if(p<n){if(e)return a8
if(!h.bU(a5))return a8
B.a.l(g,new A.z(B.B,a8,a8,a8,a5,B.d))}}if(!h.d3(b0,b7,a1,o))return a8
if(h.e<b8)return a8
if(c2==="intercept"||a.length>1)s=a8
B.a.l(g,new A.z(B.C,m,s,J.dv(a),0,b7))}else{if(!h.dl(b0,a1))return a8
if(c2==="intercept"||a.length>1)s=a8
B.a.l(g,new A.z(B.O,m,s,J.dv(a),0,B.d))}a6=h.ae(b5).a
s=h.d
if(s>=a6)s=j&&s===0
else s=!0
if(s)return a8
s=A.c([b0],t.e)
if(!i)s.push(b6)
r=d.K(b0.c)
r.toString
r=A.c([r],t.Y)
r.push(c3)
return new A.d7(h,new A.N(c1,g,a7.af(s,r),A.c([a1],t.m),a6,b5))},
cg(a,b,c,d,e,f,g,h,i,j){return this.ak(a,b,c,d,!1,e,f,null,B.d,0,0,g,h,i,j)},
cj(a,b,c,d,e,f,g,h){return this.ak(a,b,c,d,!1,1/0,!1,null,B.d,0,0,e,f,g,h)},
bn(a,b,c,d,e,f,g,h,i,j){return this.ak(a,b,c,!1,d,1/0,!1,null,e,f,g,!1,h,i,j)},
aW(a,b,c,d,e,f,g,h,i){return this.ak(a,b,c,d,!1,e,f,null,B.d,0,0,!1,g,h,i)},
cl(a,b,c,d,e,f,g,h,i){return this.ak(a,b,c,!1,!1,d,e,f,B.d,0,0,!1,g,h,i)},
ci(a,b,c,d,e,f,g,h,i,j,k,l){return this.ak(a,b,c,!1,d,e,f,g,h,i,0,!1,j,k,l)},
ck(a,b,c,d,e,f,g,h){return this.ak(a,b,c,!1,!1,d,e,null,B.d,0,0,!1,f,g,h)},
bg(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a5.k1!=null)return B.u
s=this.a.Q
r=s.K(a4.c)
r.toString
q=a4.as
p=q===B.f||q===B.e?r.f.bY(r.e,a5.z):a4.z
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
g=h.bc(p)
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
a0=A.o(new A.d(A.c([(m-a)/j,(m+a)/j],t.n),t.db.a(new A.hn()),g),g.h("b.E"))
if(a0.length!==0)b=B.a.aa(a0,B.y)}for(m=s.f,a1=B.u,a2=0;a2<3;++a2){a3=new A.J(q+l*b,r+k*b)
if(!h.p(0,a3)||B.a.I(m,new A.ho(a3)))return B.u
a1=i.dt(a4,a3,s)
if(!a1.d)return a1
j=a1.b
if(Math.abs(b-j)<0.1)break
b=(b+j)/2}return a1}}
A.hm.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.c.Z(r,this.b.f.a4(r))<=s.b.r.at},
$S:1}
A.hp.prototype={
$1(a){var s
t.o.a(a)
s=this.b.w.i(0,a.a)
if((s==null?0:s)<=0){s=this.a.a
s=(s.x!==B.k||this.c)&&a.f&&s.Q.c>=a.e}else s=!0
return s},
$S:8}
A.hq.prototype={
$2(a,b){var s,r=t.o
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.c.t(a.a,b.a):B.c.t(r,s)},
$S:11}
A.hr.prototype={
$1(a){return t.o.a(a).d<this.a.gaQ()},
$S:8}
A.hs.prototype={
$2(a,b){var s=t.o
s.a(a)
s.a(b)
return a.c-a.d>b.c-b.d?a:b},
$S:50}
A.ht.prototype={
$1(a){t.L.a(a)
return a.length===1&&J.dv(a)===this.a.a},
$S:32}
A.hu.prototype={
$1(a){var s
t.o.a(a)
if(a.d>0){s=this.a.w.i(0,a.a)
s=(s==null?0:s)>0}else s=!1
return s},
$S:8}
A.hv.prototype={
$1(a){t.L.a(a)
return a.length===1&&J.dv(a)===this.a.a},
$S:32}
A.hx.prototype={
$1(a){return J.kT(t.L.a(a),0,new A.hy(this.a),t.S)},
$S:52}
A.hy.prototype={
$2(a,b){return A.f(a)+this.a.b.f.i(0,A.f(b)).b},
$S:17}
A.hz.prototype={
$1(a){var s,r,q,p,o,n,m,l
t.L.a(a)
for(s=this.a.b,r=s.r.rx,s=s.f,q=0,p=0;p<a.length;++p){o=s.i(0,a[p])
n=o.c
m=o.d
l=p===0?1:r
q+=(n-m)*l}return q},
$S:53}
A.hw.prototype={
$2(a,b){var s,r=t.L
r.a(a)
r.a(b)
r=this.a
s=J.j6(r.$1(b),r.$1(a))
if(s!==0)r=s
else{r=this.b
r=J.j6(r.$1(a),r.$1(b))}return r},
$S:54}
A.hA.prototype={
$1(a){return A.f(a)+1},
$S:6}
A.hB.prototype={
$0(){return 1},
$S:5}
A.hn.prototype={
$1(a){return A.ax(a)>=0},
$S:19}
A.ho.prototype={
$1(a){return t.q.a(a).f.p(0,this.a)},
$S:1}
A.aE.prototype={
aL(){return"AiDecisionStage."+this.b}}
A.ao.prototype={
aL(){return"AiActionKind."+this.b}}
A.z.prototype={
H(){var s=this,r=s.d
r=r==null?null:A.c([r.a,r.b],t.n)
return A.R(["kind",s.a.a,"hero",s.b,"city",s.c,"point",r,"amount",s.e,"weapons",s.f],t.N,t.X)}}
A.ad.prototype={
H(){var s,r,q,p,o,n=this,m=A.c([],t.b)
for(s=n.w,r=s.length,q=t.n,p=0;p<s.length;s.length===r||(0,A.u)(s),++p){o=s[p]
m.push(A.c([o.a,o.b],q))}return A.R(["hero",n.a,"role",n.b,"deadline",n.y,"commit",n.z,"city",n.d,"enemy",n.r,"points",m,"leg",n.x,"gold",n.Q,"slot",n.as,"reason",n.c,"order",n.at,"targetCountry",n.e,"attrition",n.f],t.N,t.X)}}
A.N.prototype={
H(){var s,r,q,p=this,o=t.d,n=A.c([],o)
for(s=p.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q)n.push(s[q].H())
o=A.c([],o)
for(s=p.d,r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q)o.push(s[q].H())
return A.R(["reason",p.a,"actions",n,"deps",p.c,"tasks",o,"floor",p.e,"emergency",p.f],t.N,t.X)}}
A.bM.prototype={
H(){var s,r,q,p=this,o=A.c([],t.d)
for(s=p.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q)o.push(s[q].H())
return A.R(["phase",p.a,"target",p.b,"gold",p.c,"heroes",p.d,"groups",o,"notes",p.f,"limited",p.r,"assessments",p.w,"routeSteps",p.x,"expansions",p.y],t.N,t.X)}}
A.ed.prototype={
H(){var s,r,q,p=this,o=p.Q.H(),n=A.c([],t.d)
for(s=p.as,r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q)n.push(s[q].H())
return A.R(["protocol",1,"session",p.a,"id",p.d,"rules",p.b,"map",p.c,"observation",o,"deadline",p.e,"tasks",n,"seed",p.f,"priority",p.r,"idle",p.w,"stage",p.x.b,"offensiveCountry",p.y,"offensiveCity",p.z],t.N,t.X)}}
A.ec.prototype={
H(){var s=this
return A.R(["protocol",1,"session",s.a,"id",s.d,"country",s.e,"rules",s.b,"map",s.c,"tick",s.f,"deadline",s.r,"plan",s.x.H(),"micros",s.w,"error",s.y],t.N,t.X)}}
A.iR.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:9}
A.iS.prototype={
$0(){var s=this,r=s.a,q=r.c,p=!1
if(s.b.length!==0)if(q!=null)if(!q.r){p=s.c
p=p.f>=p.r*0.5&&q.c>0&&q.b>=s.d.r.ch}if(p)return new A.aM([!0,q.b,1,q.c])
return new A.aM([!1,r.b,0,r.a])},
$S:55}
A.hF.prototype={
dg(g6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3=this,g4=null,g5={}
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
j=A.o(new A.d(m,l.h("e(1)").a(new A.hI(r)),k),k.h("b.E"))
B.a.A(j,new A.hJ())
m=r.f
l=A.h(m)
k=l.h("e(1)")
l=l.h("d<1>")
i=l.h("b.E")
h=A.o(new A.d(m,k.a(new A.hK(g3,r,n)),l),i)
if(j.length!==0)B.a.A(h,new A.hV(g3,j,r))
g=A.b4(h,t.q)
f=g==null
e=f?g4:A.al(g.b,r,p,g4)
d=e==null
c=new A.hH(g3,(d?g4:e.gW())===!0?Math.min(B.b.ag(e.c*e.gaC()),Math.max(0,g6.d-g6.T().a)):0)
b=new A.hG(g5,g3,q)
a=r.gN()
a0=A.o(a,a.$ti.h("b.E"))
B.a.A(a0,new A.hX(g5,g3))
a=t.S
a1=Math.min(g5.a.f,B.a.G(a0,0,new A.hY(g5,g3),a))
if(a0.length!==0&&a1>g5.a.e){a2=g5.a.M()
a3=Math.max(0,a2.d-Math.max(a2.T().a,p.r.f))
a4=a2.e
a5=p.b.i(0,"soldierCost")
a5.toString
a6=Math.min(a1-a4,B.b.aX(a3,B.b.k(a5)))
if(a6>0&&a2.aA(a6)&&c.$1(a2))b.$4(a2,A.c([new A.z(B.m,g4,B.a.gD(a0).a,g4,a6,B.d)],t.w),"\u6309\u5168\u56fd\u73b0\u6709\u5b88\u5c06\u548c\u5f85\u51fa\u5f81\u5c06\u9886\u8865\u5175\uff0c\u4fdd\u7559\u7cae\u8349\u3001\u6708\u4ff8\u548c\u6d41\u52a8\u8d44\u91d1",B.a.gD(a0))}for(a4=a0.length,a5=p.r,a7=a5.fx-2,a8=p.f,a9=p.b,b0=g3.d,b1=t.a,b2=g3.e,b3=t.w,b4=0;b4<a0.length;a0.length===a4||(0,A.u)(a0),++b4){b5=a0[b4]
if(q.length>=a7)break
b6=b5.a
b7=g5.a.u(b6)
b8=A.h(b7)
b9=b8.h("d<1>")
c0=A.o(new A.d(b7,b8.h("e(1)").a(new A.hZ()),b9),b9.h("b.E"))
B.a.A(c0,new A.i_())
if(b7.length!==0&&a8.gap(a8)){c1=B.a.aa(b7,new A.i0())
b8=a8.gar()
b9=A.l(b8)
c2=b9.h("d<b.E>")
c3=A.o(new A.d(b8,b9.h("e(b.E)").a(new A.i1(r)),c2),c2.h("b.E"))
B.a.A(c3,new A.i2())
c4=A.o(new A.d(m,k.a(new A.hL(g5,g3,r,c1)),l),i)
B.a.A(c4,new A.hM(g3,c1,r))
c5=c4.length===0?0:2
b8=A.h(c4)
b9=b8.h("x<1>")
c2=new A.x(c4,0,3,b9)
c2.V(c4,0,3,b8.c)
c2=new A.p(c2,c2.gm(0),b9.h("p<k.E>"))
b9=b9.h("k.E")
while(c2.j()){b8=c2.d
if(b8==null)b8=b9.a(b8)
if(c3.length===0)c6=A.c([],b1)
else{c6=a9.i(0,"carryLimit")
c6.toString
c6=A.c1(B.b.k(c6),B.a.gD(c3).a,!1,a)}c7=A.cy(c1,b8,r,p,b0,c6,0).a[2]
if(c7>0){if(d)b9=g4
else b9=e.a!==e.d.a&&e.b>=e.e.r.w
if(b9===!0){b8=b8.b
b8=b8===(f?g4:g.b)}else b8=!1
if(b8){c5=c7
break}c5=c7
break}}c8=c5}else c8=1
c9=!1
if(B.a.I(m,new A.hN(r)))if(b7.length!==0){if(c8>0){b8=g5.a.bS(b6)
b8=b8<(g5.a.ax.p(0,b6)?0:1)+c8}else b8=c9
c9=b8}else c9=!0
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
if(a2.aH(b5,B.a.gD(c0))){b8=b2.i(0,b6)
if(b8==null)b8=g4
else b8=b8.d.length!==0||b8.a.at!=null
b8=c.$2$civilian(a2,b8!==!0)}else b8=!1
if(b8)b.$5$hero(a2,A.c([new A.z(B.l,B.a.gD(c0).a,b6,g4,0,B.d)],b3),"\u63d0\u9ad8\u5fc5\u8981\u57ce\u9632\u4e0e\u8fce\u6218\u540d\u989d\uff0c\u4fdd\u7559\u5df2\u51fa\u5f81\u90e8\u961f\u7684\u540e\u52e4\u8d44\u91d1",b5,B.a.gD(c0))}if(c9){b8=b2.i(0,b6)
if(b8==null)b8=g4
else b8=b8.d.length!==0||b8.a.at!=null
if(b8===!0){b8=g5.a.L(b6)
b9=b5.at
if(b9==null)b9=b5.d
else{c2=b5.cy?1:0
c2=B.c.B(b9-b5.ax-c2,0,5)
b9=c2}b9=b8<b9
b8=b9}else b8=!0}else b8=!1
if(b8){a2=g5.a.M()
b8=b2.i(0,b6)
if(b8==null)b8=g4
else b8=b8.d.length!==0||b8.a.at!=null
b9=f?g4:g.b
if(a2.bk(b5,b8===!0,b9)&&c.$1(a2))b.$4(a2,A.c([new A.z(B.v,g4,b6,g4,0,B.d)],b3),"\u8865\u5145\u7559\u5b88\u548c\u540e\u7eed\u6269\u5f20\u6240\u9700\u5c06\u9886\uff0c\u7b7e\u7ea6\u4e0e\u6708\u4ff8\u6309\u6700\u9ad8\u8d39\u7528\u9884\u7559",b5)}}d0=A.c([],t.e)
for(a4=a0.length,b4=0;b4<a0.length;a0.length===a4||(0,A.u)(a0),++b4){a7=a0[b4].a
a8=b2.i(0,a7)
if(a8==null)a8=g4
else a8=a8.d.length!==0||a8.a.at!=null
if(a8===!0)continue
b7=g5.a.u(a7)
a8=A.h(b7)
b1=a8.h("d<1>")
d1=A.o(new A.d(b7,a8.h("e(1)").a(new A.hO(g5)),b1),b1.h("b.E"))
B.a.A(d1,new A.hP())
a8=b7.length
a8=A.f(Math.max(0,a8-(g5.a.ax.p(0,a7)?0:1)))
a7=A.h(d1)
b1=new A.x(d1,0,a8,a7.h("x<1>"))
b1.V(d1,0,a8,a7.c)
B.a.F(d0,b1)}B.a.A(d0,new A.hQ())
d2=g4
d3=g4
d4=0
d5=1
if(d0.length!==0){d6=B.a.gD(d0)
d7=A.c9(r,g5.a,p,s,o)
c4=A.o(new A.d(m,k.a(new A.hR(g5,g3,r)),l),i)
B.a.A(c4,new A.hS(g3,d6,r))
s=A.Z(c4,0,A.W(a5.go,"count",a),A.h(c4).c)
o=s.$ti
s=new A.p(s,s.gm(0),o.h("p<k.E>"))
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
e1=A.o(new A.d(d0,a4.a(new A.hT(g3,b1)),a7),a8)
if(e1.length===0)break A
d6=B.a.gD(e1)
for(b2=m.c8(d6,g5.a,b1,b0),b6=b2.length,b8=b1.e,e2=b1.a,b4=0;b4<b2.length;b2.length===b6||(0,A.u)(b2),++b4){c3=b2[b4]
e3={}
e4=A.cy(d6,b1,r,p,b0,c3,0)
b9=i.i(0,e2)
e5=b9==null?g4:b9.length
if(e5==null)e5=0
b9=e4.a
e6=b9[2]-e5
e7=d7.gY()!=null&&d7.gY()!==e2
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
f5=l.aT(f4,b8,r,b1)
c2=f5.b
f1=Math.min(f1,c2)
f2=Math.max(f2,c2)
if(!f5.d||f2-f1>k)break
f6=B.a.G(a0,0,new A.hU(e3,g3,f4),a)
c2=e3.a
c6=c2.f
f7=a9.i(0,"soldierLimit")
f7.toString
f7=Math.min(f6,Math.max(0,c6-B.b.k(f7)))
f8=m.bn(c2,f4,f5,b9[0],c3,f7,e5+f3,"\u6309\u5171\u540c\u653b\u9632\u95e8\u69db\u6838\u7b97\u6574\u961f\u6b66\u5668\u4e0e\u8def\u8d39","expedition",b1)
if(f8==null)break
e3.a=f8.a
c2=f8.b.b
c6=A.h(c2)
B.a.F(e9,new A.d(c2,c6.h("e(1)").a(new A.hW()),c6.h("d<1>")));++f3}if(!f0)continue
c2=e3.a
f9=1e6-c2.d+c2.T().a
c2=g5.a
if(c2.d<f9){if(d8===0||f9<d8){d5=b9[2]
d8=f9
d9=e2}continue}a2=c2.M()
c2=e9.length
g0=0
for(;;){if(!(g0<e9.length)){f0=!0
break}if(!a2.bU(e9[g0].e)){f0=!1
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
g2=g1==null?g4:A.al(g1.b,r,p,g5.a.x)
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
if((g2==null?g4:g2.gW())===!0)k.push("\u76ee\u6807\u56fd\u5360\u6709 "+g2.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.ag(g2.c*g2.gaC())+" \u91d1\u5e01\uff0c\u51c6\u5907\u5f3a\u5316\u6b66\u5668\u548c\u8f6e\u653b\u5175\u529b")
return new A.bM(p,s,d4,d5,q,k,o,m,l,b0)}}
A.hI.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&a.f>0&&!a.fy},
$S:0}
A.hJ.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.hK.prototype={
$1(a){t.q.a(a)
return a.b!==this.b.a&&this.c.az(a)&&this.a.c.c2(a)},
$S:1}
A.hV.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bl(o.a(b),B.a.gD(s),r,p,q,null),A.bl(a,B.a.gD(s),r,p,q,null))},
$S:4}
A.hH.prototype={
$2$civilian(a,b){var s=a.d,r=Math.max(a.T().a,this.a.b.r.f)
return s>=r+(b?this.b:0)},
$1(a){return this.$2$civilian(a,!1)},
$S:56}
A.hG.prototype={
$5$hero(a,b,c,d,e){var s,r
t.f3.a(b)
this.a.a=a
s=this.b
r=A.c([],t.e)
if(e!=null)r.push(e)
B.a.l(this.c,new A.N(c,b,s.c.af(r,A.c([d],t.Y)),B.r,Math.max(a.T().a,s.b.r.f),!1))},
$4(a,b,c,d){return this.$5$hero(a,b,c,d,null)},
$S:57}
A.hX.prototype={
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
A.hY.prototype={
$2(a,b){var s,r
A.f(a)
t.q.a(b)
s=this.a.a.u(b.a).length
r=this.b.b.b.i(0,"soldierLimit")
r.toString
return a+s*B.b.k(r)},
$S:7}
A.hZ.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.i_.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.i0.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return A.ac(a,!0)>A.ac(b,!0)?a:b},
$S:18}
A.i1.prototype={
$1(a){t.o.a(a)
return a.f&&a.d===0&&this.a.c>=a.e},
$S:8}
A.i2.prototype={
$2(a,b){var s=t.o
s.a(a)
return B.c.t(s.a(b).c,a.c)},
$S:11}
A.hL.prototype={
$1(a){var s,r,q,p=this
t.q.a(a)
s=p.c
if(a.b!==s.a){r=p.b
q=r.a
s=A.c9(s,p.a.a,r.b,q.z,q.y).az(a)&&r.c.aO(p.d,a)}else s=!1
return s},
$S:1}
A.hM.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bl(o.a(b),s,r,p,q,null),A.bl(a,s,r,p,q,null))},
$S:4}
A.hN.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.hO.prototype={
$1(a){t.r.a(a)
return a.db&&this.a.a.aP(a)},
$S:0}
A.hP.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.hQ.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ac(s.a(b),!0),A.ac(a,!0))},
$S:2}
A.hR.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.c9(s,this.a.a,r.b,q.z,q.y).az(a)&&r.c.c2(a)}else s=!1
return s},
$S:1}
A.hS.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bl(o.a(b),s,r,p,q,null),A.bl(a,s,r,p,q,null))},
$S:4}
A.hT.prototype={
$1(a){return this.a.c.aO(t.r.a(a),this.b)},
$S:0}
A.hU.prototype={
$2(a,b){var s,r,q
A.f(a)
s=this.a
r=t.q.a(b).a
q=s.a.u(r).length
q=Math.max(0,q-(r===this.c.c?1:0))
s=s.a.ax.p(0,r)?0:1
s=Math.min(q,s)
q=this.b.b.b.i(0,"soldierLimit")
q.toString
return a+s*B.b.k(q)},
$S:7}
A.hW.prototype={
$1(a){return t.T.a(a).a===B.B},
$S:28}
A.bo.prototype={}
A.ee.prototype={
Z(b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=b1.a,a7=b1.b,a8=A.v(b0.a)+","+A.v(b0.b)+":"+A.v(a6)+","+A.v(a7),a9=a5.d
if(a9.a0(a8)){a6=a9.i(0,a8)
a6.toString
return a6}for(s=a5.a,r=s.b,q=s.c,p=r+q+8,o=r-1,--q,n=a5.b,m=n.b,n=n.d,s=s.d,l=s.length,k=n.length,j=a5.c,i=b0,h=0,g=0;g<p;++g){f=i.J(b1)
if(f<1e-7){if(a9.a>=256){e=new A.a7(a9,A.l(a9).h("a7<1>")).gC(0)
if(!e.j())A.cB(A.aB())
a9.ai(0,e.gn())}a9.v(0,a8,h)
return h}if(!j.dn())return 1/0
d=i.a
c=(a6-d)/f
b=i.b
a=(a7-b)/f
a0=B.c.B(B.b.X((d+c*1e-7)/16),0,o)
a1=B.c.B(B.b.X((b+a*1e-7)/16),0,q)
a2=new A.ef()
a3=a2.$3(d,c,a0)
a2=a2.$3(b,a,a1)
a4=Math.min(f,Math.min(A.kq(a3),A.kq(a2)))
a2=m.i(0,"marchSpeed")
a2.toString
a3=a1*r+a0
if(!(a3>=0&&a3<l))return A.n(s,a3)
a3=s[a3]
if(!(a3<k))return A.n(n,a3)
h+=a4/(a2*n[a3])
i=new A.J(d+c*a4,b+a*a4)}return 1/0},
aj(a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=b0.K(a8.c),a5=a8.as,a6=(a5===B.f||a5===B.e)&&a4!=null?a4.f.bY(a4.e,a9):a8.z,a7=b2==null?a9:b2.f.bQ(a6,a9)
a5=this.a
if(!a5.p(0,a7))return B.u
s=new A.eg(b0,a8,b2)
r=new A.ei(this,b0,a8)
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
if(a5.p(0,e))B.a.l(p,A.c([e,a7],q))}}for(a5=p.length,d=null,g=0;g<p.length;p.length===a5||(0,A.u)(p),++g){c=p[g]
q=c.length
a=a6
a0=0
a1=!1
a2=0
for(;;){if(!(a2<c.length)){b=!0
break}a3=c[a2]
if(s.$2(a,a3)){b=!1
break}a1=a1||r.$2(a,a3)
a0+=this.Z(a,a3)
c.length===q||(0,A.u)(c);++a2
a=a3}q=!0
if(b)if(isFinite(a0))q=b1&&a1
if(q)continue
if(d==null||a0<d.b)d=new A.bo(c,a0,!0)}return d==null?B.S:d},
aT(a,b,c,d){return this.aj(a,b,c,!1,d)},
dt(a,b,c){return this.aj(a,b,c,!1,null)}}
A.ef.prototype={
$3(a,b,c){var s
if(Math.abs(b)<1e-12)s=1/0
else s=Math.max(1e-8,((b>0?c+1:c)*16-a)/b)
return s},
$S:58}
A.eg.prototype={
$2(a,b){return B.a.I(this.a.f,new A.eh(this.b,this.c,a,b))},
$S:33}
A.eh.prototype={
$1(a){var s,r=this
t.q.a(a)
if(a.b!==r.a.b){s=r.b
s=s==null?null:s.a
s=a.a!==s&&a.f.c0(r.c,r.d)!=null}else s=!1
return s},
$S:1}
A.ei.prototype={
$2(a,b){return B.a.I(this.b.r,new A.ej(this.a,this.c,b,a))},
$S:33}
A.ej.prototype={
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
l=B.b.B(((k.a-q)*p+(k.b-o)*n)/m,0,1)}s=r.aE(s,l).J(a.z)
r=j.a.b.b.i(0,"encounterDistance")
r.toString
return s<r+12},
$S:0}
A.a_.prototype={
H(){var s=this
return A.c([s.a,s.b,s.c,s.d,s.e,s.f,s.r],t.Q)}}
A.ek.prototype={
be(a,b,c,d){var s,r,q
if(c){s=this.e
if(!(d<s.length))return A.n(s,d)
s=s[d]}else s=1
s=B.c.B(B.b.X(a*s),0,63)
if(b>0){r=this.b
q=r.i(0,"defenseBase")
q.toString
q=B.b.k(q)
r=r.i(0,"defenseStep")
r.toString
r=q+(b-1)*B.b.k(r)}else r=0
return B.c.B(s+r,0,63)},
bd(a,b,c){return this.be(a,b,c,0)},
cU(a,b){return this.be(a,0,b,0)},
al(a){var s,r,q="maxLevel",p=this.b,o=p.i(0,"firstYearCityLevel")
if(o==null){o=p.i(0,q)
o.toString
o=B.b.k(o)}o=B.b.k(o)
s=p.i(0,"initialYear")
s=B.b.k(s==null?1:s)
r=p.i(0,q)
r.toString
r=B.c.B(a-s,0,B.b.k(r))
s=p.i(0,"cityLevelsPerYear")
s=B.b.k(s==null?1:s)
p=p.i(0,q)
p.toString
return B.c.B(o+r*s,1,B.b.k(p))},
H(){var s,r,q,p=this,o=A.c([],t.eG)
for(s=p.f.gar(),s=s.gC(s),r=t.Q;s.j();){q=s.gn()
o.push(A.c([q.a,q.b,q.c,q.d,q.e,q.f,q.r],r))}return A.R(["version",p.a,"values",p.b,"upgrades",p.c,"movement",p.d,"field",p.e,"weapons",o,"tuning",p.r.H()],t.N,t.X)}}
A.e1.prototype={
bc(a){var s=this.d,r=this.b
r=B.c.B(B.b.X(a.b/16),0,this.c-1)*r+B.c.B(B.b.X(a.a/16),0,r-1)
if(!(r>=0&&r<s.length))return A.n(s,r)
return s[r]},
p(a,b){var s,r=b.a
if(isFinite(r)){s=b.b
r=isFinite(s)&&r>=0&&s>=0&&r<this.b*16&&s<this.c*16}else r=!1
return r},
H(){var s=this
return A.R(["version",s.a,"width",s.b,"height",s.c,"terrain",s.d],t.N,t.X)}}
A.em.prototype={
di(a){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=t.d1.a(B.i.d1(a,null))
switch(J.b_(s,"kind")){case"init":if(!J.an(J.b_(s,"protocol"),1)||!J.an(J.b_(s,"build"),"588b9f95"))throw A.j(B.a4);++i.f
i.e=null
p=i.r
if(p.a>0){p.b=p.c=p.d=p.e=p.f=null
p.a=0
p.b_()}p=t.f
o=t.N
n=t.z
i.c=A.l1(A.ar(p.a(J.b_(s,"rules")),o,n))
n=A.ar(p.a(J.b_(s,"map")),o,n)
p=A.H(n.i(0,"version"))
m=A.f(n.i(0,"width"))
l=A.f(n.i(0,"height"))
n=A.c2(t.R.a(n.i(0,"terrain")),!0,t.S)
k=new Uint8Array(A.me(n))
if(m<=0||l<=0||n.length!==m*l)A.cB(B.a6)
i.d=new A.e1(p,m,l,k)
i.a.$1(B.i.an(t.G.a(A.R(["kind","ready","rules",i.c.a,"map",p,"backend",i.b],o,t.X)),null))
break
case"cancel":p=i.e
o=J.b_(s,"id")
if(p==null?o==null:p===o)i.r.l(0,A.f(J.b_(s,"id")))
break
case"plan":if(i.c==null||i.d==null||i.e!=null){p=A.jW("AI \u5c1a\u672a\u5c31\u7eea\u6216\u5df2\u6709\u8bf7\u6c42\u6267\u884c\u4e2d")
throw A.j(p)}r=A.l_(A.ar(t.f.a(J.b_(s,"request")),t.N,t.z))
i.e=r.d
i.aN(r,i.f)
break
default:throw A.j(B.a5)}}catch(j){q=A.aP(j)
i.a.$1(B.i.an(t.G.a(A.R(["kind","error","message",J.bn(q)],t.N,t.X)),null))}},
aN(a,b){return this.cM(a,b)},
cM(a3,a4){var s=0,r=A.mz(t.x),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
var $async$aN=A.mO(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:a1=new A.i4()
$.jD()
a1.bp()
m=a1
p=4
i=n.c
i.toString
h=n.d
h.toString
g=new A.el(i.r)
f=new A.ex(i,h,a3,g,A.Y(t.S,t.h))
e=t.N
h=new A.ee(h,i,g,A.Y(e,t.i))
f.e=h
f.f=new A.et(i,g,A.Y(e,t.cM))
f.r=new A.hl(a3,i,h)
l=f
k=0
i=l.bq(),h=i.$ti,i=new A.aN(i.a(),h.h("aN<1>")),h=h.c,g=n.r,d=a3.d,c=t.x
case 7:if(!i.j()){s=8
break}b=i.b
if(b==null)h.a(b)
if(a4!==n.f||g.p(0,d)){if(a4===n.f){n.e=null
g.ai(0,d)
n.a.$1(B.i.an(t.G.a(A.R(["kind","cancelled","id",d],e,t.X)),null))}s=1
break}b=k
if(typeof b!=="number"){q=b.cf()
s=1
break}a=b+1
k=a
s=a>=n.c.r.id?9:10
break
case 9:k=0
b=m
if(b.b==null)b.b=$.hE.$0()
s=11
return A.m6(A.lf(B.H,c),$async$aN)
case 11:m.bp()
case 10:s=7
break
case 8:if(a4!==n.f){s=1
break}if(g.ai(0,d)){n.e=null
n.a.$1(B.i.an(t.G.a(A.R(["kind","cancelled","id",d],e,t.X)),null))
s=1
break}n.e=null
i=l.w
i.toString
n.a.$1(B.i.an(t.G.a(A.R(["kind","reply","reply",A.jH(a3,i,null,m.gc_()).H()],e,t.X)),null))
p=2
s=6
break
case 4:p=3
a2=o.pop()
j=A.aP(a2)
if(a4!==n.f){s=1
break}n.e=null
i=A.c(["\u89c4\u5212\u5931\u8d25\uff0c\u4e3b\u73af\u5883\u4fdd\u7559\u6709\u9650\u5b89\u5168\u4fdd\u62a4"],t.s)
h=m.gc_()
n.a.$1(B.i.an(t.G.a(A.R(["kind","reply","reply",A.jH(a3,new A.bM("preparing",null,0,1,B.af,i,!1,0,0,0),J.bn(j),h).H()],t.N,t.X)),null))
s=6
break
case 3:s=2
break
case 6:case 1:return A.m8(q,r)
case 2:return A.m7(o.at(-1),r)}})
return A.m9($async$aN,r)}}
A.j3.prototype={
$1(a){t.r.a(a)
return a.w*3+a.f*0.35+a.gP()*8},
$S:23}
A.j4.prototype={
$1(a){var s
t.r.a(a)
if(a.c===this.a.a){s=a.as
s=!(s===B.f||s===B.e)}else s=!1
return s},
$S:0}
A.j5.prototype={
$2(a,b){var s
A.ax(a)
t.r.a(b)
s=A.ae(b)
return a+s*(b.k1==null?0.12:0.03)},
$S:21}
A.a2.prototype={}
A.aq.prototype={
ga6(){var s,r=this.a
if(r.at!=null)r=r.db
else{r=this.d
if(r.length===0)r=1/0
else{s=A.h(r)
s=new A.O(r,s.h("i(1)").a(new A.ep()),s.h("O<1,i>")).aa(0,B.y)
r=s}}return r}}
A.ep.prototype={
$1(a){return t.O.a(a).b},
$S:61}
A.i6.prototype={
dm(c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7=this,b8="marchSpeed",b9=b7.a,c0=c3.a,c1=b9.u(c0),c2=A.c([],t.D)
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
a5=A.n0(q,o,e,d,p,g,new A.i7(b7),c)
if(a5==null)continue
if(h.as===B.n||a1)g=0.35
else if(a2>0.8)g=1
else g=f<72?0.9:0.55
B.a.l(c2,new A.a2(h,a5,g))}B.a.A(c2,new A.i8())
c0=A.h(c1)
r=t.r
a6=A.b4(new A.d(c1,c0.h("e(1)").a(new A.i9(c3)),c0.h("d<1>")),r)
q=A.c([],t.e)
if(a6!=null)q.push(a6)
c0=c0.h("L<1>")
B.a.F(q,new A.L(c1,c0).br(0,c0.h("e(k.E)").a(new A.ia(a6))))
c0=t.S
a7=A.Z(q,0,A.W(c3.gad(),"count",c0),r).ab(0)
a8=A.Y(t.N,c0)
a9=B.a.ao(b9.w,new A.ib(c3)).c
for(b9=a7.length,i=0;c0=a7.length,i<c0;a7.length===b9||(0,A.u)(a7),++i){b0=a7[i]
if(b0.as===B.e)b1=0
else{c0=n.i(0,"soldierLimit")
c0.toString
b1=Math.min(a9,B.b.k(c0)-b0.gP())}a9-=b1
a8.v(0,b0.a,b0.gP()+b1)}b9=c2.length
b2=null
if(b9!==0&&c0!==0)for(c0=c3.cy,r=c3.at,q=c3.ax,p=r==null,o=b7.d,n=c3.d,b3=0;b3<a7.length;++b3,b9=l){b4=a7[b3]
for(m=b4.a,b5=null,i=0;l=c2.length,i<l;c2.length===b9||(0,A.u)(c2),++i){l=c2[i].a
if(p)k=n
else{k=c0?1:0
k=B.c.B(r-q-k,0,5)}b6=o.bf(b4,l,l.ok,Math.max(1,k-b3),!1,a8.i(0,m))
if(b5==null||b6.b<b5.b)b5=b6}if(b2==null||b5.b>b2.b)b2=b5}b9=A.h(s)
return new A.aq(c3,c2,b2,new A.d(s,b9.h("e(1)").a(new A.ic(c3)),b9.h("d<1>")).G(0,0,new A.id(),t.i))}}
A.i7.prototype={
$2(a,b){var s=this.a,r=s.c,q=r.Z(a,b)
if(!isFinite(q)&&r.c.e){r=a.J(b)
s=s.b.b.i(0,"marchSpeed")
s.toString
s=r/s}else s=q
return s},
$S:62}
A.i8.prototype={
$2(a,b){var s,r=t.O
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.q.t(a.a.a,b.a.a):B.b.t(r,s)},
$S:63}
A.i9.prototype={
$1(a){return t.r.a(a).a===this.a.ch},
$S:0}
A.ia.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.ib.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:9}
A.ic.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=!1
if(a.b===s.b)if(a.c===s.a){s=a.as
s=!(s===B.f||s===B.e)&&!a.fy}else s=r
else s=r
return s},
$S:0}
A.id.prototype={
$2(a,b){return A.ax(a)+A.ae(t.r.a(b))},
$S:21}
A.el.prototype={
a_(){var s=this,r=s.b
if(r>=s.a.db){s.e=!0
return!1}s.b=r+1
return!0},
cT(){var s=this,r=s.c
if(r>=s.a.dx){s.e=!0
return!1}s.c=r+1
return!0},
dn(){var s=this,r=s.d
if(r>=s.a.dy){s.e=!0
return!1}s.d=r+1
return!0}}
A.j0.prototype={
$1(a){A.H(a)
return A.iL(v.G.self).postMessage(a)},
$S:64}
A.j1.prototype={
$1(a){return this.a.di(A.H(A.iL(a).data))},
$S:65};(function aliases(){var s=J.aS.prototype
s.cn=s.q
s=A.b.prototype
s.br=s.dw})();(function installTearOffs(){var s=hunkHelpers._static_0,r=hunkHelpers._static_1,q=hunkHelpers.installStaticTearOff
s(A,"my","lr",5)
r(A,"mP","lF",20)
r(A,"mQ","lG",20)
r(A,"mR","lH",20)
s(A,"kp","mJ",3)
r(A,"mT","mc",26)
q(A,"nb",2,null,["$1$2","$2"],["ky",function(a,b){return A.ky(a,b,t.H)}],30,0)
q(A,"na",2,null,["$1$2","$2"],["kx",function(a,b){return A.kx(a,b,t.H)}],30,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.y,null)
q(A.y,[A.jd,J.cR,A.cc,J.b1,A.C,A.i3,A.b,A.p,A.c3,A.P,A.bS,A.bb,A.bP,A.ch,A.I,A.aC,A.br,A.bJ,A.ci,A.a5,A.ie,A.h9,A.bQ,A.co,A.D,A.h4,A.b7,A.ah,A.c_,A.as,A.dj,A.iH,A.iF,A.df,A.aN,A.ap,A.bd,A.V,A.dg,A.dp,A.cu,A.bu,A.dm,A.bg,A.B,A.ct,A.cJ,A.cL,A.iA,A.cM,A.dh,A.d5,A.cd,A.il,A.aG,A.a9,A.aa,A.dq,A.i4,A.bv,A.aV,A.eo,A.aF,A.eq,A.bI,A.et,A.cD,A.au,A.ex,A.a6,A.fb,A.J,A.ea,A.r,A.Q,A.b0,A.e2,A.ha,A.d7,A.hl,A.z,A.ad,A.N,A.bM,A.ed,A.ec,A.hF,A.bo,A.ee,A.a_,A.ek,A.e1,A.em,A.a2,A.aq,A.i6,A.el])
q(J.cR,[J.cT,J.bU,J.bW,J.bV,J.bX,J.bq,J.b5])
q(J.bW,[J.aS,J.t,A.bs,A.c6])
q(J.aS,[J.d6,J.bw,J.aR])
r(J.cS,A.cc)
r(J.h_,J.t)
q(J.bq,[J.bT,J.cU])
q(A.C,[A.bZ,A.aK,A.cV,A.de,A.da,A.di,A.bY,A.cF,A.aA,A.cg,A.dd,A.ce,A.cK])
q(A.b,[A.q,A.b8,A.d,A.bR,A.ba,A.bx,A.bf,A.av])
q(A.q,[A.k,A.a7,A.ai,A.b6])
q(A.k,[A.x,A.O,A.L,A.dl])
r(A.bN,A.b8)
r(A.bO,A.ba)
q(A.aC,[A.by,A.bi])
r(A.aW,A.by)
q(A.bi,[A.aM,A.bz])
r(A.bB,A.br)
r(A.cf,A.bB)
r(A.bK,A.cf)
r(A.bL,A.bJ)
q(A.a5,[A.cQ,A.cH,A.cI,A.dc,A.iX,A.iZ,A.ii,A.ih,A.iM,A.iw,A.h6,A.dy,A.dW,A.dA,A.dD,A.dE,A.dH,A.dG,A.dI,A.dJ,A.dK,A.dM,A.dO,A.dP,A.dT,A.dS,A.dU,A.dB,A.dY,A.e_,A.er,A.eP,A.eQ,A.f5,A.f6,A.f7,A.f8,A.f9,A.eS,A.eU,A.eY,A.f0,A.f3,A.eD,A.eI,A.eJ,A.eN,A.eG,A.eH,A.eF,A.ez,A.eC,A.ey,A.fW,A.fX,A.fV,A.fY,A.fT,A.fS,A.fU,A.fR,A.fc,A.fe,A.fA,A.fC,A.fE,A.fG,A.ff,A.fI,A.fh,A.fj,A.fl,A.fn,A.fq,A.fs,A.fu,A.fw,A.fx,A.fy,A.fB,A.fO,A.fQ,A.fJ,A.fK,A.fM,A.fN,A.dx,A.e8,A.e9,A.e5,A.e4,A.e7,A.e3,A.hb,A.hg,A.hi,A.hj,A.hh,A.he,A.hf,A.hd,A.hm,A.hp,A.hr,A.ht,A.hu,A.hv,A.hx,A.hz,A.hA,A.hn,A.ho,A.iR,A.hI,A.hK,A.hH,A.hG,A.hZ,A.i1,A.hL,A.hN,A.hO,A.hR,A.hT,A.hW,A.ef,A.eh,A.ej,A.j3,A.j4,A.ep,A.i9,A.ia,A.ib,A.ic,A.j0,A.j1])
r(A.b3,A.cQ)
q(A.cH,[A.hC,A.ij,A.ik,A.iG,A.fZ,A.im,A.is,A.ir,A.ip,A.io,A.iv,A.iu,A.it,A.iE,A.iP,A.dz,A.dV,A.dC,A.eZ,A.hc,A.hB,A.iS])
r(A.c8,A.aK)
q(A.dc,[A.db,A.bp])
q(A.D,[A.aI,A.dk])
q(A.cI,[A.h0,A.iY,A.iN,A.iQ,A.ix,A.h5,A.h8,A.iB,A.dF,A.dL,A.dN,A.dQ,A.dR,A.dX,A.dZ,A.e0,A.es,A.eu,A.ev,A.iW,A.eR,A.f1,A.f4,A.fa,A.eT,A.eV,A.eW,A.eX,A.f_,A.f2,A.eE,A.eK,A.eL,A.eM,A.eO,A.eA,A.eB,A.fd,A.fp,A.fD,A.fF,A.fH,A.fg,A.fi,A.fk,A.fm,A.fo,A.fr,A.ft,A.fv,A.fz,A.fP,A.fL,A.dw,A.e6,A.hk,A.hq,A.hs,A.hy,A.hw,A.hJ,A.hV,A.hX,A.hY,A.i_,A.i0,A.i2,A.hM,A.hP,A.hQ,A.hS,A.hU,A.eg,A.ei,A.j5,A.i7,A.i8,A.id])
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
r(A.at,A.cn)
r(A.cW,A.bY)
r(A.h1,A.cJ)
q(A.cL,[A.h3,A.h2])
r(A.iz,A.iA)
q(A.aA,[A.ca,A.cP])
q(A.dh,[A.b2,A.ak,A.aE,A.ao])
s(A.cj,A.B)
s(A.ck,A.I)
s(A.cl,A.B)
s(A.cm,A.I)
s(A.bB,A.ct)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",i:"double",a1:"num",G:"String",e:"bool",aa:"Null",m:"List",y:"Object",a8:"Map",K:"JSObject"},mangledNames:{},types:["e(r)","e(Q)","a(r,r)","~()","a(Q,Q)","a()","a(a)","a(a,Q)","e(a_)","e(b0)","e(a2)","a(a_,a_)","a(a,r)","e(a)","i(a1,i)","e(ad)","a(a,N)","a(a,a)","r(r,r)","e(i)","~(~())","i(i,r)","~(y?,y?)","i(r)","aa(@)","aa()","@(@)","e(N)","e(z)","r(a2)","0^(0^,0^)<a1>","r?(z)","e(m<a>)","e(J,J)","a(a,aV)","~(a,@)","e(a6)","a1(a1,a)","@(@,G)","m<ad>(N)","i(i,ad)","e(aq)","a(aq,aq)","aa(~())","a(au,au)","~(@,@)","i(a1,r)","i(i,G)","~(@)","a(Q)","a_(a_,a_)","@(G)","a(m<a>)","i(m<a>)","a(m<a>,m<a>)","+breakthrough,lower,teamSize,upper(e,i,a,i)()","e(aF{civilian:e})","~(aF,m<z>,G,Q{hero:r?})","i(i,i,a)","aa(y,aU)","aa(@,aU)","i(a2)","i(J,J)","a(a2,a2)","~(G)","~(K)","m<r>()","i(i,Q)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"3;":(a,b,c)=>d=>d instanceof A.aW&&a.b(d.a)&&b.b(d.b)&&c.b(d.c),"4;breakthrough,lower,teamSize,upper":a=>b=>b instanceof A.aM&&A.kA(a,b.a),"4;high,low,selfHigh,selfLow":a=>b=>b instanceof A.bz&&A.kA(a,b.a)}}
A.m0(v.typeUniverse,JSON.parse('{"aR":"aS","d6":"aS","bw":"aS","nj":"bs","cT":{"e":[],"A":[]},"bU":{"A":[]},"bW":{"K":[]},"aS":{"K":[]},"t":{"m":["1"],"q":["1"],"K":[],"b":["1"]},"cS":{"cc":[]},"h_":{"t":["1"],"m":["1"],"q":["1"],"K":[],"b":["1"]},"b1":{"F":["1"]},"bq":{"i":[],"a1":[]},"bT":{"i":[],"a":[],"a1":[],"A":[]},"cU":{"i":[],"a1":[],"A":[]},"b5":{"G":[],"A":[]},"bZ":{"C":[]},"q":{"b":["1"]},"k":{"q":["1"],"b":["1"]},"x":{"k":["1"],"q":["1"],"b":["1"],"b.E":"1","k.E":"1"},"p":{"F":["1"]},"b8":{"b":["2"],"b.E":"2"},"bN":{"b8":["1","2"],"q":["2"],"b":["2"],"b.E":"2"},"c3":{"F":["2"]},"O":{"k":["2"],"q":["2"],"b":["2"],"b.E":"2","k.E":"2"},"d":{"b":["1"],"b.E":"1"},"P":{"F":["1"]},"bR":{"b":["2"],"b.E":"2"},"bS":{"F":["2"]},"ba":{"b":["1"],"b.E":"1"},"bO":{"ba":["1"],"q":["1"],"b":["1"],"b.E":"1"},"bb":{"F":["1"]},"bP":{"F":["1"]},"bx":{"b":["1"],"b.E":"1"},"ch":{"F":["1"]},"L":{"k":["1"],"q":["1"],"b":["1"],"b.E":"1","k.E":"1"},"aW":{"by":[],"aC":[]},"aM":{"bi":[],"aC":[]},"bz":{"bi":[],"aC":[]},"bK":{"cf":["1","2"],"bB":["1","2"],"br":["1","2"],"ct":["1","2"],"a8":["1","2"]},"bJ":{"a8":["1","2"]},"bL":{"bJ":["1","2"],"a8":["1","2"]},"bf":{"b":["1"],"b.E":"1"},"ci":{"F":["1"]},"cQ":{"a5":[],"aH":[]},"b3":{"a5":[],"aH":[]},"c8":{"aK":[],"C":[]},"cV":{"C":[]},"de":{"C":[]},"co":{"aU":[]},"a5":{"aH":[]},"cH":{"a5":[],"aH":[]},"cI":{"a5":[],"aH":[]},"dc":{"a5":[],"aH":[]},"db":{"a5":[],"aH":[]},"bp":{"a5":[],"aH":[]},"da":{"C":[]},"aI":{"D":["1","2"],"jQ":["1","2"],"a8":["1","2"],"D.K":"1","D.V":"2"},"a7":{"q":["1"],"b":["1"],"b.E":"1"},"b7":{"F":["1"]},"ai":{"q":["1"],"b":["1"],"b.E":"1"},"ah":{"F":["1"]},"b6":{"q":["a9<1,2>"],"b":["a9<1,2>"],"b.E":"a9<1,2>"},"c_":{"F":["a9<1,2>"]},"by":{"aC":[]},"bi":{"aC":[]},"bs":{"K":[],"A":[]},"c6":{"K":[]},"cX":{"K":[],"A":[]},"bt":{"ag":["1"],"K":[]},"c4":{"B":["i"],"m":["i"],"ag":["i"],"q":["i"],"K":[],"b":["i"],"I":["i"]},"c5":{"B":["a"],"m":["a"],"ag":["a"],"q":["a"],"K":[],"b":["a"],"I":["a"]},"cY":{"B":["i"],"m":["i"],"ag":["i"],"q":["i"],"K":[],"b":["i"],"I":["i"],"A":[],"B.E":"i","I.E":"i"},"cZ":{"B":["i"],"m":["i"],"ag":["i"],"q":["i"],"K":[],"b":["i"],"I":["i"],"A":[],"B.E":"i","I.E":"i"},"d_":{"B":["a"],"m":["a"],"ag":["a"],"q":["a"],"K":[],"b":["a"],"I":["a"],"A":[],"B.E":"a","I.E":"a"},"d0":{"B":["a"],"m":["a"],"ag":["a"],"q":["a"],"K":[],"b":["a"],"I":["a"],"A":[],"B.E":"a","I.E":"a"},"d1":{"B":["a"],"m":["a"],"ag":["a"],"q":["a"],"K":[],"b":["a"],"I":["a"],"A":[],"B.E":"a","I.E":"a"},"d2":{"B":["a"],"m":["a"],"ag":["a"],"q":["a"],"K":[],"b":["a"],"I":["a"],"A":[],"B.E":"a","I.E":"a"},"d3":{"B":["a"],"m":["a"],"ag":["a"],"q":["a"],"K":[],"b":["a"],"I":["a"],"A":[],"B.E":"a","I.E":"a"},"c7":{"B":["a"],"m":["a"],"ag":["a"],"q":["a"],"K":[],"b":["a"],"I":["a"],"A":[],"B.E":"a","I.E":"a"},"d4":{"jl":[],"B":["a"],"m":["a"],"ag":["a"],"q":["a"],"K":[],"b":["a"],"I":["a"],"A":[],"B.E":"a","I.E":"a"},"di":{"C":[]},"bA":{"aK":[],"C":[]},"aN":{"F":["1"]},"av":{"b":["1"],"b.E":"1"},"ap":{"C":[]},"V":{"aQ":["1"]},"cu":{"k_":[]},"dn":{"cu":[],"k_":[]},"at":{"bu":["1"],"jS":["1"],"jj":["1"],"q":["1"],"b":["1"]},"bg":{"F":["1"]},"D":{"a8":["1","2"]},"br":{"a8":["1","2"]},"cf":{"bB":["1","2"],"br":["1","2"],"ct":["1","2"],"a8":["1","2"]},"bu":{"jj":["1"],"q":["1"],"b":["1"]},"cn":{"bu":["1"],"jj":["1"],"q":["1"],"b":["1"]},"dk":{"D":["G","@"],"a8":["G","@"],"D.K":"G","D.V":"@"},"dl":{"k":["G"],"q":["G"],"b":["G"],"b.E":"G","k.E":"G"},"bY":{"C":[]},"cW":{"C":[]},"i":{"a1":[]},"a":{"a1":[]},"m":{"q":["1"],"b":["1"]},"dh":{"cN":[]},"cF":{"C":[]},"aK":{"C":[]},"aA":{"C":[]},"ca":{"C":[]},"cP":{"C":[]},"cg":{"C":[]},"dd":{"C":[]},"ce":{"C":[]},"cK":{"C":[]},"d5":{"C":[]},"cd":{"C":[]},"dq":{"aU":[]},"bv":{"ly":[]},"b2":{"cN":[]},"ak":{"cN":[]},"aE":{"cN":[]},"ao":{"cN":[]},"li":{"m":["a"],"q":["a"],"b":["a"]},"jl":{"m":["a"],"q":["a"],"b":["a"]},"lD":{"m":["a"],"q":["a"],"b":["a"]},"lg":{"m":["a"],"q":["a"],"b":["a"]},"lB":{"m":["a"],"q":["a"],"b":["a"]},"lh":{"m":["a"],"q":["a"],"b":["a"]},"lC":{"m":["a"],"q":["a"],"b":["a"]},"ld":{"m":["i"],"q":["i"],"b":["i"]},"le":{"m":["i"],"q":["i"],"b":["i"]}}'))
A.m_(v.typeUniverse,JSON.parse('{"q":1,"bt":1,"cn":1,"cJ":2,"cL":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.cz
return{T:s("z"),q:s("Q"),I:s("N"),t:s("b0"),a9:s("aE"),r:s("r"),bJ:s("bo"),o:s("a_"),J:s("ad"),u:s("ap"),h:s("aq"),cM:s("bI"),cs:s("a6"),U:s("q<@>"),V:s("C"),bo:s("bR<N,ad>"),k:s("aH"),O:s("a2"),E:s("b3<i>"),fy:s("b<Q>"),ef:s("b<r>"),er:s("b<ad>(N)"),R:s("b<@>"),w:s("t<z>"),Y:s("t<Q>"),Z:s("t<N>"),eu:s("t<b0>"),e:s("t<r>"),_:s("t<J>"),W:s("t<a_>"),m:s("t<ad>"),bL:s("t<aq>"),D:s("t<a2>"),a5:s("t<m<J>>"),eG:s("t<m<y>>"),b:s("t<m<i>>"),p:s("t<m<a>>"),d:s("t<a8<G,y?>>"),Q:s("t<y>"),eV:s("t<+(aF,m<z>,m<r>)>"),s:s("t<G>"),aD:s("t<aV>"),bQ:s("t<au>"),n:s("t<i>"),gn:s("t<@>"),a:s("t<a>"),v:s("bU"),A:s("K"),cj:s("aR"),aU:s("ag<@>"),f3:s("m<z>"),bd:s("m<r>"),j:s("m<@>"),L:s("m<a>"),d1:s("a8<G,@>"),f:s("a8<@,@>"),G:s("a8<G,y?>"),P:s("aa"),K:s("y"),gT:s("nk"),bY:s("+()"),fR:s("+(aF,m<z>,m<r>)"),l:s("aU"),N:s("G"),aQ:s("x<au>"),gf:s("aV"),dm:s("A"),eK:s("aK"),ak:s("bw"),eO:s("d<r>"),eq:s("d<i>"),cO:s("bx<r>"),c:s("V<@>"),dp:s("au"),dT:s("av<a6>"),gL:s("av<a>"),y:s("e"),aO:s("e(r)"),al:s("e(y)"),db:s("e(i)"),i:s("i"),z:s("@"),fO:s("@()"),B:s("@(y)"),C:s("@(y,aU)"),S:s("a"),dg:s("r?"),eH:s("aQ<aa>?"),an:s("K?"),bM:s("m<@>?"),eg:s("m<a>?"),X:s("y?"),dk:s("G?"),F:s("bd<@,@>?"),g:s("dm?"),fQ:s("e?"),cD:s("i?"),h6:s("a?"),cg:s("a1?"),H:s("a1"),x:s("~"),M:s("~()"),cA:s("~(G,@)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.a9=J.cR.prototype
B.a=J.t.prototype
B.c=J.bT.prototype
B.b=J.bq.prototype
B.q=J.b5.prototype
B.aa=J.aR.prototype
B.ab=J.bW.prototype
B.N=J.d6.prototype
B.z=J.bw.prototype
B.l=new A.ao(0,"upgrade")
B.A=new A.ao(1,"dismiss")
B.v=new A.ao(2,"recruit")
B.m=new A.ao(3,"soldiers")
B.B=new A.ao(4,"buyWeapon")
B.C=new A.ao(5,"dispatch")
B.O=new A.ao(6,"move")
B.P=new A.ao(8,"retreat")
B.f=new A.ak(0,"garrison")
B.n=new A.ak(2,"camped")
B.w=new A.ak(3,"queue")
B.D=new A.ak(4,"attacking")
B.e=new A.ak(5,"defending")
B.t=new A.ak(7,"retreating")
B.E=new A.aE(0,"full")
B.F=new A.aE(1,"resources")
B.x=new A.aE(2,"defense")
B.k=new A.aE(3,"attack")
B.M=s([],t._)
B.u=new A.bo(B.M,1/0,!1)
B.S=new A.bo(B.M,1/0,!1)
B.as=new A.cD(4,24,6,1.5,10,12,0.65,3,0.5,0.25,45,15,0.8,45,25,90,-0.15,10,3,1,96,160,6000,8,24,4,6,8,2,0,1,0.3,20,900,64,0.25,8,0.06,0.12,0.35,0.05,2500,2,20)
B.G=new A.b3(A.na(),t.E)
B.y=new A.b3(A.nb(),t.E)
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

B.i=new A.h1()
B.a_=new A.d5()
B.o=new A.i3()
B.j=new A.dn()
B.a0=new A.dq()
B.h=new A.b2(0,"favorable")
B.a1=new A.b2(1,"close")
B.p=new A.b2(2,"unfavorable")
B.K=new A.b2(3,"unknown")
B.at=s(["\u9759\u6001\u8bc4\u4f30\u914d\u989d\u8017\u5c3d"],t.s)
B.a2=new A.bI(B.K,-1,1,0,0,!1)
B.a3=new A.aG("AI \u534f\u8bae\u7248\u672c\u4e0d\u5339\u914d")
B.a4=new A.aG("AI \u6784\u5efa\u7248\u672c\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u751f\u6210 Worker")
B.a5=new A.aG("\u672a\u77e5 AI \u5de5\u4f5c\u547d\u4ee4")
B.a6=new A.aG("AI \u5730\u56fe\u5c3a\u5bf8\u65e0\u6548")
B.a7=new A.aG("\u56fd\u5bb6\u89c4\u5212\u9759\u6001\u7248\u672c\u4e0d\u5339\u914d")
B.a8=new A.aG("\u56fd\u5bb6\u89c2\u5bdf\u8d85\u51fa\u534f\u8bae\u5bb9\u91cf")
B.ac=new A.h2(null)
B.ad=new A.h3(null)
B.Q=new A.ak(1,"marching")
B.R=new A.ak(6,"field")
B.L=s([B.f,B.Q,B.n,B.w,B.D,B.e,B.R,B.t],A.cz("t<ak>"))
B.ae=s([B.E,B.F,B.x,B.k],A.cz("t<aE>"))
B.af=s([],t.Z)
B.au=s([],t.W)
B.r=s([],t.m)
B.d=s([],t.a)
B.ag=A.az("nf")
B.ah=A.az("ng")
B.ai=A.az("ld")
B.aj=A.az("le")
B.ak=A.az("lg")
B.al=A.az("lh")
B.am=A.az("li")
B.an=A.az("y")
B.ao=A.az("lB")
B.ap=A.az("lC")
B.aq=A.az("lD")
B.ar=A.az("jl")})();(function staticFields(){$.iy=null
$.aj=A.c([],t.Q)
$.jT=null
$.hD=0
$.hE=A.my()
$.jK=null
$.jJ=null
$.kt=null
$.km=null
$.kC=null
$.iU=null
$.j_=null
$.jz=null
$.iD=A.c([],A.cz("t<m<y>?>"))
$.bD=null
$.cw=null
$.cx=null
$.jr=!1
$.M=B.j})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"ni","kF",()=>A.iV("_$dart_dartClosure"))
s($,"nh","jC",()=>A.iV("_$dart_dartClosure_dartJSInterop"))
s($,"nz","kQ",()=>A.c([new J.cS()],A.cz("t<cc>")))
s($,"nn","kG",()=>A.aL(A.ig({
toString:function(){return"$receiver$"}})))
s($,"no","kH",()=>A.aL(A.ig({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"np","kI",()=>A.aL(A.ig(null)))
s($,"nq","kJ",()=>A.aL(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nt","kM",()=>A.aL(A.ig(void 0)))
s($,"nu","kN",()=>A.aL(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"ns","kL",()=>A.aL(A.jY(null)))
s($,"nr","kK",()=>A.aL(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"nw","kP",()=>A.aL(A.jY(void 0)))
s($,"nv","kO",()=>A.aL(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"nx","jE",()=>A.lE())
s($,"ny","du",()=>A.kz(B.an))
s($,"nl","jD",()=>{A.lt()
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
var s=A.n8
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()