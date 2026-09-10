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
if(a[b]!==s){A.m_(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.b(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.il(b)
return new s(c,this)}:function(){if(s===null)s=A.il(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.il(a).prototype
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
ir(a,b,c,d){return{i:a,p:b,e:c,x:d}},
im(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.ip==null){A.lO()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.h(A.iQ("Return interceptor for "+A.r(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.hq
if(o==null)o=$.hq=A.hL(n)
p=q[o]}if(p!=null)return p
p=A.lT(a)
if(p!=null)return p
if(typeof a=="function")return B.aa
s=Object.getPrototypeOf(a)
if(s==null)return B.K
if(s===Object.prototype)return B.K
if(typeof q=="function"){o=$.hq
if(o==null)o=$.hq=A.hL(n)
Object.defineProperty(q,o,{value:B.w,enumerable:false,writable:true,configurable:true})
return B.w}return B.w},
k7(a,b){if(a<0||a>4294967295)throw A.h(A.b0(a,0,4294967295,"length",null))
return J.k8(new Array(a),b)},
iF(a,b){if(a<0)throw A.h(A.cx("Length must be a non-negative integer: "+a,null))
return A.b(new Array(a),b.h("o<0>"))},
k8(a,b){var s=A.b(a,b.h("o<0>"))
s.$flags=1
return s},
b9(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bJ.prototype
return J.cO.prototype}if(typeof a=="string")return J.be.prototype
if(a==null)return J.bK.prototype
if(typeof a=="boolean")return J.cN.prototype
if(Array.isArray(a))return J.o.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aK.prototype
if(typeof a=="symbol")return J.bO.prototype
if(typeof a=="bigint")return J.bM.prototype
return a}if(a instanceof A.x)return a
return J.im(a)},
ct(a){if(typeof a=="string")return J.be.prototype
if(a==null)return a
if(Array.isArray(a))return J.o.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aK.prototype
if(typeof a=="symbol")return J.bO.prototype
if(typeof a=="bigint")return J.bM.prototype
return a}if(a instanceof A.x)return a
return J.im(a)},
bu(a){if(a==null)return a
if(Array.isArray(a))return J.o.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aK.prototype
if(typeof a=="symbol")return J.bO.prototype
if(typeof a=="bigint")return J.bM.prototype
return a}if(a instanceof A.x)return a
return J.im(a)},
aq(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.b9(a).a2(a,b)},
aU(a,b){if(typeof b==="number")if(Array.isArray(a)||A.lS(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.bu(a).i(a,b)},
hZ(a,b){return J.bu(a).T(a,b)},
jF(a,b,c,d){return J.bu(a).H(a,b,c,d)},
dp(a){return J.bu(a).gG(a)},
a_(a){return J.b9(a).gL(a)},
jG(a){return J.ct(a).gW(a)},
jH(a){return J.ct(a).gb_(a)},
G(a){return J.bu(a).gu(a)},
jI(a){return J.bu(a).gb0(a)},
bb(a){return J.ct(a).gm(a)},
jJ(a){return J.b9(a).gM(a)},
iv(a,b){return J.bu(a).aI(a,b)},
bc(a){return J.b9(a).n(a)},
cK:function cK(){},
cN:function cN(){},
bK:function bK(){},
bN:function bN(){},
aL:function aL(){},
d0:function d0(){},
c5:function c5(){},
aK:function aK(){},
bM:function bM(){},
bO:function bO(){},
o:function o(a){this.$ti=a},
cM:function cM(){},
fj:function fj(a){this.$ti=a},
aW:function aW(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bL:function bL(){},
bJ:function bJ(){},
cO:function cO(){},
be:function be(){}},A={i2:function i2(){},
k9(a){return new A.bQ("Field '"+a+"' has not been initialized.")},
aA(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
h0(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
Z(a,b,c){return a},
iq(a){var s,r
for(s=$.ae.length,r=0;r<s;++r)if(a===$.ae[r])return!0
return!1},
a6(a,b,c,d){A.c1(b,"start")
if(c!=null){A.c1(c,"end")
if(b>c)A.cu(A.b0(b,0,c,"start",null))}return new A.I(a,b,c,d.h("I<0>"))},
kb(a,b,c,d){if(t.U.b(a))return new A.bD(a,b,c.h("@<0>").E(d).h("bD<1,2>"))
return new A.b_(a,b,c.h("@<0>").E(d).h("b_<1,2>"))},
kl(a,b,c){A.c1(b,"takeCount")
if(t.U.b(a))return new A.bE(a,b,c.h("bE<0>"))
return new A.b1(a,b,c.h("b1<0>"))},
ax(){return new A.c4("No element")},
bQ:function bQ(a){this.a=a},
fZ:function fZ(){},
m:function m(){},
k:function k(){},
I:function I(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
w:function w(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
b_:function b_(a,b,c){this.a=a
this.b=b
this.$ti=c},
bD:function bD(a,b,c){this.a=a
this.b=b
this.$ti=c},
bV:function bV(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
a4:function a4(a,b,c){this.a=a
this.b=b
this.$ti=c},
e:function e(a,b,c){this.a=a
this.b=b
this.$ti=c},
J:function J(a,b,c){this.a=a
this.b=b
this.$ti=c},
bH:function bH(a,b,c){this.a=a
this.b=b
this.$ti=c},
bI:function bI(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b1:function b1(a,b,c){this.a=a
this.b=b
this.$ti=c},
bE:function bE(a,b,c){this.a=a
this.b=b
this.$ti=c},
b2:function b2(a,b,c){this.a=a
this.b=b
this.$ti=c},
bF:function bF(a){this.$ti=a},
c9:function c9(a,b){this.a=a
this.$ti=b},
ca:function ca(a,b){this.a=a
this.$ti=b},
a1:function a1(){},
U:function U(a,b){this.a=a
this.$ti=b},
e8(a,b,c){var s,r,q,p,o,n,m,l=A.q(a),k=A.bU(new A.ac(a,l.h("ac<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.u)(k),++i,p=o){r=k[i]
c.a(a.i(0,r))
o=p+1
q[r]=p}n=A.bU(new A.ad(a,l.h("ad<2>")),!0,c)
m=new A.bB(q,n,b.h("@<0>").E(c).h("bB<1,2>"))
m.$keys=k
return m}return new A.bA(A.ak(a,b,c),b.h("@<0>").E(c).h("bA<1,2>"))},
js(a){var s=A.jr(a)
if(s!=null)return s
return"minified:"+a},
lS(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
r(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.bc(a)
return s},
d2(a){var s,r=$.iK
if(r==null)r=$.iK=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
kg(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.l(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
d3(a){var s,r,q,p
if(a instanceof A.x)return A.a7(A.aS(a),null)
s=J.b9(a)
if(s===B.a9||s===B.ab||t.ak.b(a)){r=B.F(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.a7(A.aS(a),null)},
iL(a){var s,r,q
if(a==null||typeof a=="number"||A.ig(a))return J.bc(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a0)return a.n(0)
if(a instanceof A.as)return a.bt(!0)
s=$.jE()
for(r=0;r<1;++r){q=s[r].cR(a)
if(q!=null)return q}return"Instance of '"+A.d3(a)+"'"},
kd(){return Date.now()},
kf(){var s,r
if($.fI!==0)return
$.fI=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
if(!!s.dartUseDateNowForTicks)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.fI=1e6
$.fJ=new A.fH(r)},
T(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.bq(s,10)|55296)>>>0,s&1023|56320)}throw A.h(A.b0(a,0,1114111,null,null))},
ke(a){var s=a.$thrownJsError
if(s==null)return null
return A.bv(s)},
l(a,b){if(a==null)J.bb(a)
throw A.h(A.ji(a,b))},
ji(a,b){var s,r="index"
if(!A.j8(b))return new A.ar(!0,b,r,null)
s=J.bb(a)
if(b<0||b>=s)return A.i0(b,s,a,r)
return new A.c0(null,null,!0,b,r,"Value not in range")},
lB(a){return new A.ar(!0,a,null,null)},
jg(a){return a},
h(a){return A.N(a,new Error())},
N(a,b){var s
if(a==null)a=new A.aB()
b.dartException=a
s=A.m0
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
m0(){return J.bc(this.dartException)},
cu(a,b){throw A.N(a,b==null?new Error():b)},
cv(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.cu(A.l_(a,b,c),s)},
l_(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.c7("'"+s+"': Cannot "+o+" "+l+k+n)},
u(a){throw A.h(A.S(a))},
aC(a){var s,r,q,p,o,n
a=A.lZ(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.b([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.h8(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
h9(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
iP(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
i3(a,b){var s=b==null,r=s?null:b.method
return new A.cP(a,r,s?null:b.receiver)},
aH(a){var s
if(a==null)return new A.fu(a)
if(a instanceof A.bG){s=a.a
return A.aT(a,s==null?A.cp(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.aT(a,a.dartException)
return A.lz(a)},
aT(a,b){if(t.V.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
lz(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bq(r,16)&8191)===10)switch(q){case 438:return A.aT(a,A.i3(A.r(s)+" (Error "+q+")",null))
case 445:case 5007:A.r(s)
return A.aT(a,new A.c_())}}if(a instanceof TypeError){p=$.ju()
o=$.jv()
n=$.jw()
m=$.jx()
l=$.jA()
k=$.jB()
j=$.jz()
$.jy()
i=$.jD()
h=$.jC()
g=p.a1(s)
if(g!=null)return A.aT(a,A.i3(A.F(s),g))
else{g=o.a1(s)
if(g!=null){g.method="call"
return A.aT(a,A.i3(A.F(s),g))}else if(n.a1(s)!=null||m.a1(s)!=null||l.a1(s)!=null||k.a1(s)!=null||j.a1(s)!=null||m.a1(s)!=null||i.a1(s)!=null||h.a1(s)!=null){A.F(s)
return A.aT(a,new A.c_())}}return A.aT(a,new A.d8(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.c3()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.aT(a,new A.ar(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.c3()
return a},
bv(a){var s
if(a instanceof A.bG)return a.b
if(a==null)return new A.ch(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.ch(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
jo(a){if(a==null)return J.a_(a)
if(typeof a=="object")return A.d2(a)
return J.a_(a)},
lJ(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.t(0,a[s],a[r])}return b},
lK(a,b){var s,r=a.length
for(s=0;s<r;++s)b.k(0,a[s])
return b},
l8(a,b,c,d,e,f){t.h.a(a)
switch(A.d(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.h(new A.he("Unsupported number of arguments for wrapped closure"))},
dl(a,b){var s=a.$identity
if(!!s)return s
s=A.lF(a,b)
a.$identity=s
return s},
lF(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.l8)},
jX(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.d5().constructor.prototype):Object.create(new A.bd(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.iD(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.jT(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.iD(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
jT(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.h("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.jR)}throw A.h("Error in functionType of tearoff")},
jU(a,b,c,d){var s=A.iC
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
iD(a,b,c,d){if(c)return A.jW(a,b,d)
return A.jU(b.length,d,a,b)},
jV(a,b,c,d){var s=A.iC,r=A.jS
switch(b?-1:a){case 0:throw A.h(new A.d4("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
jW(a,b,c){var s,r
if($.iA==null)$.iA=A.iz("interceptor")
if($.iB==null)$.iB=A.iz("receiver")
s=b.length
r=A.jV(s,c,a,b)
return r},
il(a){return A.jX(a)},
jR(a,b){return A.cl(v.typeUniverse,A.aS(a.a),b)},
iC(a){return a.a},
jS(a){return a.b},
iz(a){var s,r,q,p=new A.bd("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.h(A.cx("Field name "+a+" not found.",null))},
hL(a){return v.getIsolateTag(a)},
lT(a){var s,r,q,p,o,n=A.F($.jj.$1(a)),m=$.hK[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.hR[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bq($.je.$2(a,n))
if(q!=null){m=$.hK[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.hR[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.hU(s)
$.hK[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.hR[n]=s
return s}if(p==="-"){o=A.hU(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.jp(a,s)
if(p==="*")throw A.h(A.iQ(n))
if(v.leafTags[n]===true){o=A.hU(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.jp(a,s)},
jp(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.ir(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
hU(a){return J.ir(a,!1,null,!!a.$iab)},
lV(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.hU(s)
else return J.ir(s,c,null,null)},
lO(){if(!0===$.ip)return
$.ip=!0
A.lP()},
lP(){var s,r,q,p,o,n,m,l
$.hK=Object.create(null)
$.hR=Object.create(null)
A.lN()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.jq.$1(o)
if(n!=null){m=A.lV(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
lN(){var s,r,q,p,o,n,m=B.U()
m=A.bt(B.V,A.bt(B.W,A.bt(B.G,A.bt(B.G,A.bt(B.X,A.bt(B.Y,A.bt(B.Z(B.F),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.jj=new A.hO(p)
$.je=new A.hP(o)
$.jq=new A.hQ(n)},
bt(a,b){return a(b)||b},
kE(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.l(b,s)
if(!J.aq(r,b[s]))return!1}return!0},
lH(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
lZ(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bl:function bl(a,b,c){this.a=a
this.b=b
this.c=c},
bm:function bm(a,b,c){this.a=a
this.b=b
this.c=c},
bn:function bn(a){this.a=a},
bA:function bA(a,b){this.a=a
this.$ti=b},
bz:function bz(){},
bB:function bB(a,b,c){this.a=a
this.b=b
this.$ti=c},
b5:function b5(a,b){this.a=a
this.$ti=b},
cb:function cb(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cJ:function cJ(){},
aY:function aY(a,b){this.a=a
this.$ti=b},
fH:function fH(a){this.a=a},
c2:function c2(){},
h8:function h8(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
c_:function c_(){},
cP:function cP(a,b,c){this.a=a
this.b=b
this.c=c},
d8:function d8(a){this.a=a},
fu:function fu(a){this.a=a},
bG:function bG(a,b){this.a=a
this.b=b},
ch:function ch(a){this.a=a
this.b=null},
a0:function a0(){},
cA:function cA(){},
cB:function cB(){},
d6:function d6(){},
d5:function d5(){},
bd:function bd(a,b){this.a=a
this.b=b},
d4:function d4(a){this.a=a},
ay:function ay(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
fk:function fk(a){this.a=a},
fo:function fo(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
ac:function ac(a,b){this.a=a
this.$ti=b},
bS:function bS(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
ad:function ad(a,b){this.a=a
this.$ti=b},
az:function az(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aZ:function aZ(a,b){this.a=a
this.$ti=b},
bR:function bR(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
hO:function hO(a){this.a=a},
hP:function hP(a){this.a=a},
hQ:function hQ(a){this.a=a},
as:function as(){},
b8:function b8(){},
bk:function bk(){},
l0(a){return a},
bg:function bg(){},
bY:function bY(){},
cR:function cR(){},
bh:function bh(){},
bW:function bW(){},
bX:function bX(){},
cS:function cS(){},
cT:function cT(){},
cU:function cU(){},
cV:function cV(){},
cW:function cW(){},
cX:function cX(){},
cY:function cY(){},
bZ:function bZ(){},
cZ:function cZ(){},
cc:function cc(){},
cd:function cd(){},
ce:function ce(){},
cf:function cf(){},
i6(a,b){var s=b.c
return s==null?b.c=A.cj(a,"aJ",[b.x]):s},
iM(a){var s=a.w
if(s===6||s===7)return A.iM(a.x)
return s===11||s===12},
ki(a){return a.as},
lY(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
cs(a){return A.hA(v.typeUniverse,a,!1)},
lR(a,b){var s,r,q,p,o
if(a==null)return null
s=b.y
r=a.Q
if(r==null)r=a.Q=new Map()
q=b.as
p=r.get(q)
if(p!=null)return p
o=A.aR(v.typeUniverse,a.x,s,0)
r.set(q,o)
return o},
aR(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.aR(a1,s,a3,a4)
if(r===s)return a2
return A.iZ(a1,r,!0)
case 7:s=a2.x
r=A.aR(a1,s,a3,a4)
if(r===s)return a2
return A.iY(a1,r,!0)
case 8:q=a2.y
p=A.bs(a1,q,a3,a4)
if(p===q)return a2
return A.cj(a1,a2.x,p)
case 9:o=a2.x
n=A.aR(a1,o,a3,a4)
m=a2.y
l=A.bs(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.ib(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bs(a1,j,a3,a4)
if(i===j)return a2
return A.j_(a1,k,i)
case 11:h=a2.x
g=A.aR(a1,h,a3,a4)
f=a2.y
e=A.lw(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.iX(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bs(a1,d,a3,a4)
o=a2.x
n=A.aR(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.ic(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.h(A.cz("Attempted to substitute unexpected RTI kind "+a0))}},
bs(a,b,c,d){var s,r,q,p,o=b.length,n=A.hB(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.aR(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
lx(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.hB(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.aR(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
lw(a,b,c,d){var s,r=b.a,q=A.bs(a,r,c,d),p=b.b,o=A.bs(a,p,c,d),n=b.c,m=A.lx(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dd()
s.a=q
s.b=o
s.c=m
return s},
b(a,b){a[v.arrayRti]=b
return a},
hJ(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.lM(s)
return a.$S()}return null},
lQ(a,b){var s
if(A.iM(b))if(a instanceof A.a0){s=A.hJ(a)
if(s!=null)return s}return A.aS(a)},
aS(a){if(a instanceof A.x)return A.q(a)
if(Array.isArray(a))return A.j(a)
return A.ie(J.b9(a))},
j(a){var s=a[v.arrayRti],r=t.k
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
q(a){var s=a.$ti
return s!=null?s:A.ie(a)},
ie(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.l7(a,s)},
l7(a,b){var s=a instanceof A.a0?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.kO(v.typeUniverse,s.name)
b.$ccache=r
return r},
lM(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.hA(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
lL(a){return A.aE(A.q(a))},
io(a){var s=A.hJ(a)
return A.aE(s==null?A.aS(a):s)},
ij(a){var s
if(a instanceof A.as)return A.lI(a.$r,a.aR())
s=a instanceof A.a0?A.hJ(a):null
if(s!=null)return s
if(t.dm.b(a))return J.jJ(a).a
if(Array.isArray(a))return A.j(a)
return A.aS(a)},
aE(a){var s=a.r
return s==null?a.r=new A.hz(a):s},
lI(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bY
if(0>=p)return A.l(q,0)
s=A.cl(v.typeUniverse,A.ij(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.l(q,r)
s=A.j1(v.typeUniverse,s,A.ij(q[r]))}return A.cl(v.typeUniverse,s,a)},
ap(a){return A.aE(A.hA(v.typeUniverse,a,!1))},
l6(a){var s=this
s.b=A.lu(s)
return s.b(a)},
lu(a){var s,r,q,p,o
if(a===t.K)return A.le
if(A.ba(a))return A.li
s=a.w
if(s===6)return A.l4
if(s===1)return A.ja
if(s===7)return A.l9
r=A.lt(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.ba)){a.f="$i"+q
if(q==="n")return A.lc
if(a===t.A)return A.lb
return A.lh}}else if(s===10){p=A.lH(a.x,a.y)
o=p==null?A.ja:p
return o==null?A.cp(o):o}return A.l2},
lt(a){if(a.w===8){if(a===t.S)return A.j8
if(a===t.i||a===t.H)return A.ld
if(a===t.N)return A.lg
if(a===t.y)return A.ig}return null},
l5(a){var s=this,r=A.l1
if(A.ba(s))r=A.kS
else if(s===t.K)r=A.cp
else if(A.bw(s)){r=A.l3
if(s===t.h6)r=A.co
else if(s===t.dk)r=A.bq
else if(s===t.fQ)r=A.j4
else if(s===t.cg)r=A.id
else if(s===t.cD)r=A.kQ
else if(s===t.an)r=A.kR}else if(s===t.S)r=A.d
else if(s===t.N)r=A.F
else if(s===t.y)r=A.ao
else if(s===t.H)r=A.t
else if(s===t.i)r=A.at
else if(s===t.A)r=A.hC
s.a=r
return s.a(a)},
l2(a){var s=this
if(a==null)return A.bw(s)
return A.jl(v.typeUniverse,A.lQ(a,s),s)},
l4(a){if(a==null)return!0
return this.x.b(a)},
lh(a){var s,r=this
if(a==null)return A.bw(r)
s=r.f
if(a instanceof A.x)return!!a[s]
return!!J.b9(a)[s]},
lc(a){var s,r=this
if(a==null)return A.bw(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.x)return!!a[s]
return!!J.b9(a)[s]},
lb(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.x)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
j9(a){if(typeof a=="object"){if(a instanceof A.x)return t.A.b(a)
return!0}if(typeof a=="function")return!0
return!1},
l1(a){var s=this
if(a==null){if(A.bw(s))return a}else if(s.b(a))return a
throw A.N(A.j5(a,s),new Error())},
l3(a){var s=this
if(a==null||s.b(a))return a
throw A.N(A.j5(a,s),new Error())},
j5(a,b){return new A.bo("TypeError: "+A.iS(a,A.a7(b,null)))},
jh(a,b,c,d){if(A.jl(v.typeUniverse,a,b))return a
throw A.N(A.kG("The type argument '"+A.a7(a,null)+"' is not a subtype of the type variable bound '"+A.a7(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
iS(a,b){return A.cH(a)+": type '"+A.a7(A.ij(a),null)+"' is not a subtype of type '"+b+"'"},
kG(a){return new A.bo("TypeError: "+a)},
ag(a,b){return new A.bo("TypeError: "+A.iS(a,b))},
l9(a){var s=this
return s.x.b(a)||A.i6(v.typeUniverse,s).b(a)},
le(a){return a!=null},
cp(a){if(a!=null)return a
throw A.N(A.ag(a,"Object"),new Error())},
li(a){return!0},
kS(a){return a},
ja(a){return!1},
ig(a){return!0===a||!1===a},
ao(a){if(!0===a)return!0
if(!1===a)return!1
throw A.N(A.ag(a,"bool"),new Error())},
j4(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.N(A.ag(a,"bool?"),new Error())},
at(a){if(typeof a=="number")return a
throw A.N(A.ag(a,"double"),new Error())},
kQ(a){if(typeof a=="number")return a
if(a==null)return a
throw A.N(A.ag(a,"double?"),new Error())},
j8(a){return typeof a=="number"&&Math.floor(a)===a},
d(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.N(A.ag(a,"int"),new Error())},
co(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.N(A.ag(a,"int?"),new Error())},
ld(a){return typeof a=="number"},
t(a){if(typeof a=="number")return a
throw A.N(A.ag(a,"num"),new Error())},
id(a){if(typeof a=="number")return a
if(a==null)return a
throw A.N(A.ag(a,"num?"),new Error())},
lg(a){return typeof a=="string"},
F(a){if(typeof a=="string")return a
throw A.N(A.ag(a,"String"),new Error())},
bq(a){if(typeof a=="string")return a
if(a==null)return a
throw A.N(A.ag(a,"String?"),new Error())},
hC(a){if(A.j9(a))return a
throw A.N(A.ag(a,"JSObject"),new Error())},
kR(a){if(a==null)return a
if(A.j9(a))return a
throw A.N(A.ag(a,"JSObject?"),new Error())},
jc(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.a7(a[q],b)
return s},
lo(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.jc(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.a7(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
j6(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.b([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.k(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.l(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.a7(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.a7(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.a7(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.a7(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.a7(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
a7(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.a7(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.a7(a.x,b)+">"
if(l===8){p=A.ly(a.x)
o=a.y
return o.length>0?p+("<"+A.jc(o,b)+">"):p}if(l===10)return A.lo(a,b)
if(l===11)return A.j6(a,b,null)
if(l===12)return A.j6(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.l(b,n)
return b[n]}return"?"},
ly(a){var s=A.jr(a)
if(s!=null)return s
return"minified:"+a},
kP(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
kO(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.hA(a,b,!1)
else if(typeof m=="number"){s=m
r=A.ck(a,5,"#")
q=A.hB(s)
for(p=0;p<s;++p)q[p]=r
o=A.cj(a,b,q)
n[b]=o
return o}else return m},
kN(a,b){return A.j2(a.tR,b)},
kM(a,b){return A.j2(a.eT,b)},
hA(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.j0(a,null,b,!1)
r.set(b,s)
return s},
cl(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.j0(a,b,c,!0)
q.set(c,r)
return r},
j1(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.ib(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
j0(a,b,c,d){return A.kC(A.kw(a,b,c,d))},
aQ(a,b){b.a=A.l5
b.b=A.l6
return b},
ck(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.al(null,null)
s.w=b
s.as=c
r=A.aQ(a,s)
a.eC.set(c,r)
return r},
iZ(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.kK(a,b,r,c)
a.eC.set(r,s)
return s},
kK(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.ba(b))if(!(b===t.P||b===t.v))if(s!==6)r=s===7&&A.bw(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.al(null,null)
q.w=6
q.x=b
q.as=c
return A.aQ(a,q)},
iY(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.kI(a,b,r,c)
a.eC.set(r,s)
return s},
kI(a,b,c,d){var s,r
if(d){s=b.w
if(A.ba(b)||b===t.K)return b
else if(s===1)return A.cj(a,"aJ",[b])
else if(b===t.P||b===t.v)return t.eH}r=new A.al(null,null)
r.w=7
r.x=b
r.as=c
return A.aQ(a,r)},
kL(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.al(null,null)
s.w=13
s.x=b
s.as=q
r=A.aQ(a,s)
a.eC.set(q,r)
return r},
ci(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
kH(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
cj(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.ci(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.al(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.aQ(a,r)
a.eC.set(p,q)
return q},
ib(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.ci(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.al(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.aQ(a,o)
a.eC.set(q,n)
return n},
j_(a,b,c){var s,r,q="+"+(b+"("+A.ci(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.al(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.aQ(a,s)
a.eC.set(q,r)
return r},
iX(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.ci(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.ci(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.kH(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.al(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.aQ(a,p)
a.eC.set(r,o)
return o},
ic(a,b,c,d){var s,r=b.as+("<"+A.ci(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.kJ(a,b,c,r,d)
a.eC.set(r,s)
return s},
kJ(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.hB(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.aR(a,b,r,0)
m=A.bs(a,c,r,0)
return A.ic(a,n,m,c!==m)}}l=new A.al(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.aQ(a,l)},
kw(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
kC(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.ky(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.iU(a,r,l,k,!1)
else if(q===46)r=A.iU(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.b7(a.u,a.e,k.pop()))
break
case 94:k.push(A.kL(a.u,k.pop()))
break
case 35:k.push(A.ck(a.u,5,"#"))
break
case 64:k.push(A.ck(a.u,2,"@"))
break
case 126:k.push(A.ck(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.kA(a,k)
break
case 38:A.kz(a,k)
break
case 63:p=a.u
k.push(A.iZ(p,A.b7(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.iY(p,A.b7(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.kx(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.iV(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.kD(a.u,a.e,o)
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
return A.b7(a.u,a.e,m)},
ky(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
iU(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.kP(s,o.x)[p]
if(n==null)A.cu('No "'+p+'" in "'+A.ki(o)+'"')
d.push(A.cl(s,o,n))}else d.push(p)
return m},
kA(a,b){var s,r=a.u,q=A.iT(a,b),p=b.pop()
if(typeof p=="string")b.push(A.cj(r,p,q))
else{s=A.b7(r,a.e,p)
switch(s.w){case 11:b.push(A.ic(r,s,q,a.n))
break
default:b.push(A.ib(r,s,q))
break}}},
kx(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.iT(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.b7(p,a.e,o)
q=new A.dd()
q.a=s
q.b=n
q.c=m
b.push(A.iX(p,r,q))
return
case-4:b.push(A.j_(p,b.pop(),s))
return
default:throw A.h(A.cz("Unexpected state under `()`: "+A.r(o)))}},
kz(a,b){var s=b.pop()
if(0===s){b.push(A.ck(a.u,1,"0&"))
return}if(1===s){b.push(A.ck(a.u,4,"1&"))
return}throw A.h(A.cz("Unexpected extended operation "+A.r(s)))},
iT(a,b){var s=b.splice(a.p)
A.iV(a.u,a.e,s)
a.p=b.pop()
return s},
b7(a,b,c){if(typeof c=="string")return A.cj(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.kB(a,b,c)}else return c},
iV(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.b7(a,b,c[s])},
kD(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.b7(a,b,c[s])},
kB(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.h(A.cz("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.h(A.cz("Bad index "+c+" for "+b.n(0)))},
jl(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.M(a,b,null,c,null)
r.set(c,s)}return s},
M(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.ba(d))return!0
s=b.w
if(s===4)return!0
if(A.ba(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.M(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.v){if(q===7)return A.M(a,b,c,d.x,e)
return d===p||d===t.v||q===6}if(d===t.K){if(s===7)return A.M(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.M(a,b.x,c,d,e))return!1
return A.M(a,A.i6(a,b),c,d,e)}if(s===6)return A.M(a,p,c,d,e)&&A.M(a,b.x,c,d,e)
if(q===7){if(A.M(a,b,c,d.x,e))return!0
return A.M(a,b,c,A.i6(a,d),e)}if(q===6)return A.M(a,b,c,p,e)||A.M(a,b,c,d.x,e)
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
if(!A.M(a,j,c,i,e)||!A.M(a,i,e,j,c))return!1}return A.j7(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.j7(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.la(a,b,c,d,e)}if(o&&q===10)return A.lf(a,b,c,d,e)
return!1},
j7(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.M(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.M(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.M(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.M(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.M(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
la(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.cl(a,b,r[o])
return A.j3(a,p,null,c,d.y,e)}return A.j3(a,b.y,null,c,d.y,e)},
j3(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.M(a,b[s],d,e[s],f))return!1
return!0},
lf(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.M(a,r[s],c,q[s],e))return!1
return!0},
bw(a){var s=a.w,r=!0
if(!(a===t.P||a===t.v))if(!A.ba(a))if(s!==6)r=s===7&&A.bw(a.x)
return r},
ba(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
j2(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
hB(a){return a>0?new Array(a):v.typeUniverse.sEA},
al:function al(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dd:function dd(){this.c=this.b=this.a=null},
hz:function hz(a){this.a=a},
dc:function dc(){},
bo:function bo(a){this.a=a},
kq(){var s,r,q
if(self.scheduleImmediate!=null)return A.lC()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.dl(new A.hb(s),1)).observe(r,{childList:true})
return new A.ha(s,r,q)}else if(self.setImmediate!=null)return A.lD()
return A.lE()},
kr(a){self.scheduleImmediate(A.dl(new A.hc(t.M.a(a)),0))},
ks(a){self.setImmediate(A.dl(new A.hd(t.M.a(a)),0))},
kt(a){A.i8(B.E,t.M.a(a))},
i8(a,b){return A.kF(0,b)},
kF(a,b){var s=new A.hx()
s.bX(a,b)
return s},
ll(a){return new A.d9(new A.P($.K,a.h("P<0>")),a.h("d9<0>"))},
kW(a,b){a.$2(0,null)
b.b=!0
return b.a},
kT(a,b){A.kX(a,b)},
kV(a,b){var s,r,q=b.$ti
q.h("1/?").a(a)
s=a==null?q.c.a(a):a
if(!b.b)b.a.c0(s)
else{r=b.a
if(q.h("aJ<1>").b(s))r.be(s)
else r.bi(s)}},
kU(a,b){var s=A.aH(a),r=A.bv(a),q=b.b,p=b.a
if(q)p.aN(new A.ai(s,r))
else p.bd(new A.ai(s,r))},
kX(a,b){var s,r,q=new A.hD(b),p=new A.hE(b)
if(a instanceof A.P)a.bs(q,p,t.z)
else{s=t.z
if(a instanceof A.P)a.bM(q,p,s)
else{r=new A.P($.K,t.c)
r.a=8
r.c=a
r.bs(q,p,s)}}},
lA(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.K.bK(new A.hH(s),t.p,t.S,t.z)},
iW(a,b,c){return 0},
i_(a){var s
if(t.V.b(a)){s=a.gau()
if(s!=null)return s}return B.a0},
k2(a,b){var s
if(!b.b(null))throw A.h(A.e2(null,"computation","The type parameter is not nullable"))
s=new A.P($.K,b.h("P<0>"))
A.km(a,new A.fi(null,s,b))
return s},
hi(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.kj()
b.bd(new A.ai(new A.ar(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bo(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.al()
b.aw(o.a)
A.b4(b,p)
return}b.a^=2
A.dk(null,null,b.b,t.M.a(new A.hj(o,b)))},
b4(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.t,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.ii(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.b4(d.a,c)
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
A.ii(j.a,j.b)
return}g=$.K
if(g!==h)$.K=h
else g=null
c=c.c
if((c&15)===8)new A.hn(q,d,n).$0()
else if(o){if((c&1)!==0)new A.hm(q,j).$0()}else if((c&2)!==0)new A.hl(d,q).$0()
if(g!=null)$.K=g
c=q.c
if(c instanceof A.P){p=q.a.$ti
p=p.h("aJ<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aA(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.hi(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.aA(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
lp(a,b){var s
if(t.C.b(a))return b.bK(a,t.z,t.K,t.l)
s=t.B
if(s.b(a))return s.a(a)
throw A.h(A.e2(a,"onError",u.c))},
lm(){var s,r
for(s=$.br;s!=null;s=$.br){$.cr=null
r=s.b
$.br=r
if(r==null)$.cq=null
s.a.$0()}},
lv(){$.ih=!0
try{A.lm()}finally{$.cr=null
$.ih=!1
if($.br!=null)$.iu().$1(A.jf())}},
jd(a){var s=new A.da(a),r=$.cq
if(r==null){$.br=$.cq=s
if(!$.ih)$.iu().$1(A.jf())}else $.cq=r.b=s},
ls(a){var s,r,q,p=$.br
if(p==null){A.jd(a)
$.cr=$.cq
return}s=new A.da(a)
r=$.cr
if(r==null){s.b=p
$.br=$.cr=s}else{q=r.b
s.b=q
$.cr=r.b=s
if(q==null)$.cq=s}},
m8(a,b){A.Z(a,"stream",t.K)
return new A.di(b.h("di<0>"))},
km(a,b){var s=$.K
if(s===B.j)return A.i8(a,t.M.a(b))
return A.i8(a,t.M.a(s.bx(b)))},
ii(a,b){A.ls(new A.hG(a,b))},
jb(a,b,c,d,e){var s,r=$.K
if(r===c)return d.$0()
$.K=c
s=r
try{r=d.$0()
return r}finally{$.K=s}},
lr(a,b,c,d,e,f,g){var s,r=$.K
if(r===c)return d.$1(e)
$.K=c
s=r
try{r=d.$1(e)
return r}finally{$.K=s}},
lq(a,b,c,d,e,f,g,h,i){var s,r=$.K
if(r===c)return d.$2(e,f)
$.K=c
s=r
try{r=d.$2(e,f)
return r}finally{$.K=s}},
dk(a,b,c,d){t.M.a(d)
if(B.j!==c){d=c.bx(d)
d=d}A.jd(d)},
hb:function hb(a){this.a=a},
ha:function ha(a,b,c){this.a=a
this.b=b
this.c=c},
hc:function hc(a){this.a=a},
hd:function hd(a){this.a=a},
hx:function hx(){},
hy:function hy(a,b){this.a=a
this.b=b},
d9:function d9(a,b){this.a=a
this.b=!1
this.$ti=b},
hD:function hD(a){this.a=a},
hE:function hE(a){this.a=a},
hH:function hH(a){this.a=a},
aD:function aD(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
an:function an(a,b){this.a=a
this.$ti=b},
ai:function ai(a,b){this.a=a
this.b=b},
fi:function fi(a,b,c){this.a=a
this.b=b
this.c=c},
b3:function b3(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
P:function P(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
hf:function hf(a,b){this.a=a
this.b=b},
hk:function hk(a,b){this.a=a
this.b=b},
hj:function hj(a,b){this.a=a
this.b=b},
hh:function hh(a,b){this.a=a
this.b=b},
hg:function hg(a,b){this.a=a
this.b=b},
hn:function hn(a,b,c){this.a=a
this.b=b
this.c=c},
ho:function ho(a,b){this.a=a
this.b=b},
hp:function hp(a){this.a=a},
hm:function hm(a,b){this.a=a
this.b=b},
hl:function hl(a,b){this.a=a
this.b=b},
da:function da(a){this.a=a
this.b=null},
di:function di(a){this.$ti=a},
cn:function cn(){},
dh:function dh(){},
hw:function hw(a,b){this.a=a
this.b=b},
hG:function hG(a,b){this.a=a
this.b=b},
i4(a,b){return new A.ay(a.h("@<0>").E(b).h("ay<1,2>"))},
O(a,b,c){return b.h("@<0>").E(c).h("iH<1,2>").a(A.lJ(a,new A.ay(b.h("@<0>").E(c).h("ay<1,2>"))))},
Y(a,b){return new A.ay(a.h("@<0>").E(b).h("ay<1,2>"))},
bT(a){return new A.aP(a.h("aP<0>"))},
ka(a,b){return b.h("iJ<0>").a(A.lK(a,new A.aP(b.h("aP<0>"))))},
ia(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
hu(a,b,c){var s=new A.b6(a,b,c.h("b6<0>"))
s.c=a.e
return s},
cL(a,b){var s=J.G(a.a)
if(new A.J(s,a.b,a.$ti.h("J<1>")).j())return s.gl()
return null},
ak(a,b,c){var s=A.i4(b,c)
a.a_(0,new A.fp(s,b,c))
return s},
iI(a,b,c){var s=A.i4(b,c)
s.B(0,a)
return s},
fs(a){var s,r
if(A.iq(a))return"{...}"
s=new A.bj("")
try{r={}
B.a.k($.ae,a)
s.a+="{"
r.a=!0
a.a_(0,new A.ft(r,s))
s.a+="}"}finally{if(0>=$.ae.length)return A.l($.ae,-1)
$.ae.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
aP:function aP(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dg:function dg(a){this.a=a
this.c=this.b=null},
b6:function b6(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
fp:function fp(a,b,c){this.a=a
this.b=b
this.c=c},
B:function B(){},
C:function C(){},
fr:function fr(a){this.a=a},
ft:function ft(a,b){this.a=a
this.b=b},
cm:function cm(){},
bf:function bf(){},
c6:function c6(){},
bi:function bi(){},
cg:function cg(){},
bp:function bp(){},
ln(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aH(r)
q=A.iE(String(s))
throw A.h(q)}q=A.hF(p)
return q},
hF(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.de(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.hF(a[s])
return a},
iG(a,b,c){return new A.bP(a,b)},
kZ(a){return a.D()},
ku(a,b){return new A.hr(a,[],A.lG())},
kv(a,b,c){var s,r=new A.bj(""),q=A.ku(r,b)
q.aH(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
de:function de(a,b){this.a=a
this.b=b
this.c=null},
df:function df(a){this.a=a},
cC:function cC(){},
cE:function cE(){},
bP:function bP(a,b){this.a=a
this.b=b},
cQ:function cQ(a,b){this.a=a
this.b=b},
fl:function fl(){},
fn:function fn(a){this.b=a},
fm:function fm(a){this.a=a},
hs:function hs(){},
ht:function ht(a,b){this.a=a
this.b=b},
hr:function hr(a,b,c){this.c=a
this.a=b
this.b=c},
jk(a){var s=A.kg(a,null)
if(s!=null)return s
throw A.h(A.iE(a))},
jZ(a,b){a=A.N(a,new Error())
if(a==null)a=A.cp(a)
a.stack=b.n(0)
throw a},
fq(a,b,c,d){var s,r=c?J.iF(a,d):J.k7(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
bU(a,b,c){var s,r=A.b([],c.h("o<0>"))
for(s=J.G(a);s.j();)B.a.k(r,c.a(s.gl()))
if(b)return r
r.$flags=1
return r},
v(a,b){var s,r
if(Array.isArray(a))return A.b(a.slice(0),b.h("o<0>"))
s=A.b([],b.h("o<0>"))
for(r=J.G(a);r.j();)B.a.k(s,r.gl())
return s},
aM(a,b){var s=A.bU(a,!1,b)
s.$flags=3
return s},
iO(a,b,c){var s=J.G(b)
if(!s.j())return a
if(c.length===0){do a+=A.r(s.gl())
while(s.j())}else{a+=A.r(s.gl())
while(s.j())a=a+c+A.r(s.gl())}return a},
kj(){return A.bv(new Error())},
jY(a,b,c){var s,r
for(s=0;s<4;++s){r=a[s]
if(r.b===b)return r}throw A.h(A.e2(b,"name","No enum value with that name"))},
cH(a){if(typeof a=="number"||A.ig(a)||a==null)return J.bc(a)
if(typeof a=="string")return JSON.stringify(a)
return A.iL(a)},
k_(a,b){A.Z(a,"error",t.K)
A.Z(b,"stackTrace",t.l)
A.jZ(a,b)},
cz(a){return new A.cy(a)},
cx(a,b){return new A.ar(!1,null,b,a)},
e2(a,b,c){return new A.ar(!0,a,b,c)},
b0(a,b,c,d,e){return new A.c0(b,c,!0,a,d,"Invalid value")},
kh(a,b,c){if(0>a||a>c)throw A.h(A.b0(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.h(A.b0(b,a,c,"end",null))
return b}return c},
c1(a,b){if(a<0)throw A.h(A.b0(a,0,null,b,null))
return a},
i0(a,b,c,d){return new A.cI(b,!0,a,d,"Index out of range")},
c8(a){return new A.c7(a)},
iQ(a){return new A.d7(a)},
iN(a){return new A.c4(a)},
S(a){return new A.cD(a)},
iE(a){return new A.av(a)},
k6(a,b,c){var s,r
if(A.iq(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.b([],t.s)
B.a.k($.ae,a)
try{A.lj(a,s)}finally{if(0>=$.ae.length)return A.l($.ae,-1)
$.ae.pop()}r=A.iO(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
i1(a,b,c){var s,r
if(A.iq(a))return b+"..."+c
s=new A.bj(b)
B.a.k($.ae,a)
try{r=s
r.a=A.iO(r.a,a,", ")}finally{if(0>=$.ae.length)return A.l($.ae,-1)
$.ae.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
lj(a,b){var s,r,q,p,o,n,m,l=a.gu(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.j())return
s=A.r(l.gl())
B.a.k(b,s)
k+=s.length+2;++j}if(!l.j()){if(j<=5)return
if(0>=b.length)return A.l(b,-1)
r=b.pop()
if(0>=b.length)return A.l(b,-1)
q=b.pop()}else{p=l.gl();++j
if(!l.j()){if(j<=4){B.a.k(b,A.r(p))
return}r=A.r(p)
if(0>=b.length)return A.l(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gl();++j
for(;l.j();p=o,o=n){n=l.gl();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.l(b,-1)
k-=b.pop().length+2;--j}B.a.k(b,"...")
return}}q=A.r(p)
r=A.r(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.l(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.k(b,m)
B.a.k(b,q)
B.a.k(b,r)},
i5(a,b,c,d){var s
if(B.l===c){s=J.a_(a)
b=J.a_(b)
return A.h0(A.aA(A.aA($.dn(),s),b))}if(B.l===d){s=J.a_(a)
b=J.a_(b)
c=J.a_(c)
return A.h0(A.aA(A.aA(A.aA($.dn(),s),b),c))}s=J.a_(a)
b=J.a_(b)
c=J.a_(c)
d=J.a_(d)
d=A.h0(A.aA(A.aA(A.aA(A.aA($.dn(),s),b),c),d))
return d},
kc(a){var s,r,q=$.dn()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.u)(a),++r)q=A.aA(q,J.a_(a[r]))
return A.h0(q)},
cF:function cF(){},
db:function db(){},
A:function A(){},
cy:function cy(a){this.a=a},
aB:function aB(){},
ar:function ar(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
c0:function c0(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
cI:function cI(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
c7:function c7(a){this.a=a},
d7:function d7(a){this.a=a},
c4:function c4(a){this.a=a},
cD:function cD(a){this.a=a},
d_:function d_(){},
c3:function c3(){},
he:function he(a){this.a=a},
av:function av(a){this.a=a},
c:function c(){},
a3:function a3(a,b,c){this.a=a
this.b=b
this.$ti=c},
a5:function a5(){},
x:function x(){},
dj:function dj(){},
h_:function h_(){this.b=this.a=0},
bj:function bj(a){this.a=a},
ix(a,b,c,d){var s,r,q,p,o,n=t.N,m=t.S,l=A.b([],t.aD),k=a.gaq(),j=a.gaq(),i=a.gaq(),h=A.iI(a.gaq().r,m,m),g=A.Y(m,m)
for(s=a.gU(),r=J.G(s.a),s=new A.J(r,s.b,s.$ti.h("J<1>"));s.j();){q=r.gl()
g.t(0,q.a,q.d)}s=A.Y(n,t.J)
for(r=d.length,p=0;p<d.length;d.length===r||(0,A.u)(d),++p){o=d[p]
s.t(0,o.a,o)}return new A.aI(a,b,c,k.b,j.c,i.d,h,g,s,A.bT(n),A.bT(n),A.bT(n),A.bT(m),A.bT(m),l)},
aO:function aO(a,b,c){this.a=a
this.b=b
this.c=c},
e3:function e3(a){this.a=a},
aI:function aI(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
ds:function ds(){},
dt:function dt(){},
dG:function dG(a){this.a=a},
dw:function dw(a){this.a=a},
dx:function dx(a,b){this.a=a
this.b=b},
dy:function dy(a){this.a=a},
dz:function dz(){},
dA:function dA(a){this.a=a},
dB:function dB(a){this.a=a},
dC:function dC(a){this.a=a},
dD:function dD(a){this.a=a},
dE:function dE(){},
dF:function dF(){},
du:function du(){},
dv:function dv(){},
aa(a){var s=a.e
if(s===2)s=1000
else s=s===1?30:0
return a.w*3+a.r*0.35+a.f*0.15+a.x*1.5-a.y*2+s},
aF(a,b){var s=b?a.x*0.75:0,r=a.e
if(r===1)r=30
else r=r===2?-200:0
return a.w*3+a.r*0.35+a.f*0.15-a.y*2-s+r},
hM(a,b){var s=a.gaD(),r=a.gP(),q=b.b.i(0,"soldierPower")
q.toString
return s*(a.w+r*B.b.p(q))+B.a.H(a.ax,0,new A.hN(b,a),t.H)},
aX:function aX(a,b){this.a=a
this.b=b},
by:function by(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
e5:function e5(a,b,c){this.a=a
this.b=b
this.c=c},
e6:function e6(){},
e7:function e7(){},
hN:function hN(a,b){this.a=a
this.b=b},
cw:function cw(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3){var _=this
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
_.dy=a3},
am:function am(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
e9:function e9(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.r=_.f=_.e=$
_.w=null
_.x=e},
ei:function ei(a){this.a=a},
ej:function ej(){},
ek:function ek(){},
ev:function ev(){},
eC:function eC(){},
eD:function eD(a){this.a=a},
eE:function eE(a){this.a=a},
eF:function eF(a){this.a=a},
eG:function eG(a,b){this.a=a
this.b=b},
eH:function eH(a,b){this.a=a
this.b=b},
eI:function eI(a){this.a=a},
el:function el(a,b){this.a=a
this.b=b},
em:function em(a){this.a=a},
en:function en(){},
eo:function eo(){},
ep:function ep(){},
eq:function eq(){},
er:function er(a,b){this.a=a
this.b=b},
es:function es(a,b){this.a=a
this.b=b},
et:function et(a){this.a=a},
eu:function eu(){},
ew:function ew(a){this.a=a},
ex:function ex(a){this.a=a},
ey:function ey(){},
ez:function ez(a){this.a=a},
eA:function eA(){},
eB:function eB(a){this.a=a},
eg:function eg(a){this.a=a},
eh:function eh(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ef:function ef(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eb:function eb(a){this.a=a},
ec:function ec(a){this.a=a},
ed:function ed(a){this.a=a},
ee:function ee(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ea:function ea(a){this.a=a},
a9:function a9(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
eJ:function eJ(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fh:function fh(a,b,c){this.a=a
this.b=b
this.c=c},
ff:function ff(){},
fe:function fe(){},
fg:function fg(){},
fd:function fd(){},
eK:function eK(){},
eL:function eL(){},
eM:function eM(){},
eX:function eX(){},
f_:function f_(a){this.a=a},
f0:function f0(){},
f1:function f1(){},
f2:function f2(a){this.a=a},
f3:function f3(){},
f4:function f4(a){this.a=a},
f5:function f5(a){this.a=a},
eN:function eN(){},
eO:function eO(a){this.a=a},
eP:function eP(a,b){this.a=a
this.b=b},
eQ:function eQ(a){this.a=a},
eR:function eR(){},
eS:function eS(a){this.a=a},
eT:function eT(a){this.a=a},
eU:function eU(a){this.a=a},
eV:function eV(a){this.a=a},
eW:function eW(){},
eY:function eY(){},
eZ:function eZ(a){this.a=a},
fa:function fa(a){this.a=a},
fb:function fb(a){this.a=a},
fc:function fc(){},
f6:function f6(a){this.a=a},
f7:function f7(){},
f8:function f8(a){this.a=a},
f9:function f9(a){this.a=a},
dR(a){var s,r=a.length
if(0>=r)return A.l(a,0)
s=A.t(a[0])
if(1>=r)return A.l(a,1)
return new A.Q(s,A.t(a[1]))},
Q:function Q(a,b){this.a=a
this.b=b},
dQ:function dQ(a){this.a=a},
iw(c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9=A.F(c3.i(0,"id")),b0=A.d(c3.i(0,"c")),b1=A.d(c3.i(0,"home")),b2=A.d(c3.i(0,"o")),b3=A.d(c3.i(0,"t")),b4=A.t(c3.i(0,"hp")),b5=A.d(c3.i(0,"max")),b6=A.d(c3.i(0,"a")),b7=A.d(c3.i(0,"p")),b8=A.d(c3.i(0,"pay")),b9=t.j,c0=A.dR(b9.a(c3.i(0,"xy"))),c1=A.dR(b9.a(c3.i(0,"v"))),c2=A.d(c3.i(0,"s"))
if(!(c2>=0&&c2<8))return A.l(B.I,c2)
c2=B.I[c2]
s=A.b([],t.n)
for(r=b9.a(c3.i(0,"troops")),q=r.length,p=0;p<r.length;r.length===q||(0,A.u)(r),++p)s.push(A.t(r[p]))
r=t.R
q=t.S
o=A.bU(r.a(c3.i(0,"w")),!0,q)
n=A.t(c3.i(0,"m"))
m=A.t(c3.i(0,"due"))
l=c3.i(0,"to")==null?null:A.dR(b9.a(c3.i(0,"to")))
k=A.co(c3.i(0,"target"))
j=A.t(c3.i(0,"return"))
i=A.ao(c3.i(0,"dispatch"))
h=A.ao(c3.i(0,"move"))
g=A.ao(c3.i(0,"dismiss"))
f=A.ao(c3.i(0,"upgrade"))
e=A.ao(c3.i(0,"retreat"))
d=A.ao(c3.i(0,"marked"))
c=A.F(c3.i(0,"rev"))
b=A.d(c3.i(0,"orderRev"))
a=A.bq(c3.i(0,"opponent"))
a0=A.d(c3.i(0,"clashes"))
a1=A.t(c3.i(0,"received"))
a2=A.t(c3.i(0,"dealt"))
a3=A.ao(c3.i(0,"opening"))
a4=A.ao(c3.i(0,"weaponReady"))
a5=A.b([],t._)
for(r=J.G(r.a(c3.i(0,"returnPath")));r.j();){a6=b9.a(r.gl())
a7=a6.length
if(0>=a7)return A.l(a6,0)
a8=A.t(a6[0])
if(1>=a7)return A.l(a6,1)
a5.push(new A.Q(a8,A.t(a6[1])))}return new A.p(a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,c0,c1,c2,A.aM(s,t.i),A.aM(o,q),n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5)},
jK(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=A.d(a3.i(0,"id")),d=A.d(a3.i(0,"c")),c=A.d(a3.i(0,"native")),b=A.d(a3.i(0,"level")),a=A.d(a3.i(0,"keep")),a0=t.j,a1=A.dR(a0.a(a3.i(0,"xy"))),a2=A.b([],t._)
for(s=a0.a(a3.i(0,"outline")),r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q){p=a0.a(s[q])
o=p.length
if(0>=o)return A.l(p,0)
n=A.t(p[0])
if(1>=o)return A.l(p,1)
a2.push(new A.Q(n,A.t(p[1])))}a0=A.d(a3.i(0,"income"))
s=A.d(a3.i(0,"poor"))
r=A.d(a3.i(0,"cap"))
p=A.d(a3.i(0,"recruitCap"))
o=A.ao(a3.i(0,"recruit"))
n=A.F(a3.i(0,"rev"))
m=A.d(a3.i(0,"baseIncome"))
l=A.co(a3.i(0,"initial"))
k=A.d(a3.i(0,"wins"))
j=A.bq(a3.i(0,"attacker"))
i=A.bq(a3.i(0,"defender"))
h=A.F(a3.i(0,"stage"))
g=A.t(a3.i(0,"next"))
f=A.j4(a3.i(0,"fallen"))
return new A.W(e,d,c,b,a,a1,new A.dQ(a2),a0,s,r,p,m,o,n,l,k,j,i,h,g,f===!0,A.t(a3.i(0,"danger")))},
jL(a){var s,r,q,p=A.d(a.i(0,"id")),o=A.d(a.i(0,"gold")),n=A.d(a.i(0,"reserves")),m=A.d(a.i(0,"capacity")),l=A.d(a.i(0,"salary")),k=A.d(a.i(0,"poor")),j=t.S,i=A.Y(j,j)
for(s=t.f,r=s.a(a.i(0,"stock")).gab(),r=r.gu(r);r.j();){q=r.gl()
i.t(0,A.jk(A.F(q.a)),A.d(q.b))}r=A.Y(j,j)
for(s=s.a(a.i(0,"hate")).gab(),s=s.gu(s);s.j();){q=s.gl()
r.t(0,A.jk(A.F(q.a)),A.d(q.b))}return new A.aV(p,o,n,m,l,k,A.e8(i,j,j),A.e8(r,j,j))},
jM(a){var s,r,q,p,o,n,m=A.d(a.i(0,"country")),l=A.d(a.i(0,"tick")),k=A.t(a.i(0,"month")),j=A.b([],t.Y)
for(s=t.R,r=J.G(s.a(a.i(0,"cities"))),q=t.f,p=t.N,o=t.z;r.j();)j.push(A.jK(A.ak(q.a(r.gl()),p,o)))
r=A.b([],t.e)
for(n=J.G(s.a(a.i(0,"heroes")));n.j();)r.push(A.iw(A.ak(q.a(n.gl()),p,o)))
n=A.b([],t.eu)
for(s=J.G(s.a(a.i(0,"countries")));s.j();)n.push(A.jL(A.ak(q.a(s.gl()),p,o)))
s=A.d(a.i(0,"pool"))
q=A.d(a.i(0,"salary"))
return new A.dI(m,l,k,A.aM(j,t.q),A.aM(r,t.r),A.aM(n,t.u),s,q)},
af:function af(a,b){this.a=a
this.b=b},
p:function p(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5){var _=this
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
_.p2=b5},
dr:function dr(){},
dq:function dq(){},
W:function W(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2){var _=this
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
aV:function aV(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
dI:function dI(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
dO:function dO(a){this.a=a},
dP:function dP(a){this.a=a},
dL:function dL(a,b){this.a=a
this.b=b},
dK:function dK(a){this.a=a},
dM:function dM(){},
dN:function dN(a){this.a=a},
dJ:function dJ(a){this.a=a},
d1:function d1(a,b){this.a=a
this.b=b},
fv:function fv(a,b,c){this.a=a
this.b=b
this.c=c},
fy:function fy(a,b){this.a=a
this.b=b},
fz:function fz(){},
fA:function fA(a){this.a=a},
fB:function fB(){},
fC:function fC(a){this.a=a},
fD:function fD(a){this.a=a},
fE:function fE(a){this.a=a},
fF:function fF(){},
fG:function fG(){},
fw:function fw(){},
fx:function fx(a){this.a=a},
jQ(a){var s,r,q,p,o,n=A.F(a.i(0,"hero")),m=A.F(a.i(0,"role")),l=A.d(a.i(0,"deadline")),k=A.d(a.i(0,"commit")),j=A.co(a.i(0,"city")),i=A.bq(a.i(0,"enemy")),h=A.b([],t._)
for(s=J.G(t.R.a(a.i(0,"points"))),r=t.j;s.j();){q=r.a(s.gl())
p=q.length
if(0>=p)return A.l(q,0)
o=A.t(q[0])
if(1>=p)return A.l(q,1)
h.push(new A.Q(o,A.t(q[1])))}s=A.d(a.i(0,"leg"))
r=A.d(a.i(0,"gold"))
q=A.ao(a.i(0,"slot"))
return new A.a8(n,m,A.F(a.i(0,"reason")),j,i,h,s,l,k,r,q,A.d(a.i(0,"order")))},
jN(a){var s,r,q,p,o,n,m,l,k,j,i
if(!J.aq(a.i(0,"protocol"),1))throw A.h(B.a3)
s=A.F(a.i(0,"session"))
r=A.d(a.i(0,"id"))
q=A.F(a.i(0,"rules"))
p=A.F(a.i(0,"map"))
o=t.f
n=t.N
m=t.z
l=A.jM(A.ak(o.a(a.i(0,"observation")),n,m))
k=A.d(a.i(0,"deadline"))
j=A.b([],t.m)
for(i=J.G(t.R.a(a.i(0,"tasks")));i.j();)j.push(A.jQ(A.ak(o.a(i.gl()),n,m)))
o=A.d(a.i(0,"seed"))
n=A.d(a.i(0,"priority"))
m=A.d(a.i(0,"idle"))
i=A.bq(a.i(0,"stage"))
if(i==null)i="full"
return new A.dT(s,q,p,r,k,o,n,m,A.jY(B.ae,i,t.a9),l,j)},
iy(a,b,c,d){var s=a.y
return new A.dS(a.a,a.b,a.c,a.d,s.a,s.b,a.e,d,b,c)},
au:function au(a,b){this.a=a
this.b=b},
ah:function ah(a,b){this.a=a
this.b=b},
z:function z(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
a8:function a8(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
_.Q=l},
L:function L(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bC:function bC(a,b,c,d,e,f,g,h,i,j){var _=this
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
dT:function dT(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
_.z=k},
dS:function dS(a,b,c,d,e,f,g,h,i,j){var _=this
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
ik(a,b,a0,a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g="soldierLimit",f=a0.C(b.a),e=A.j(f).h("U<1>"),d=A.a6(new A.U(f,e),0,A.Z(b.ga8(),"count",t.S),e.h("k.E")).a7(0),c=B.a.ao(a0.f,new A.hI(b)).c
for(f=a1.b,e=b.db,s=b.ax,r=b.ay,q=s==null,p=b.d,o=1,n=1,m=0;l=d.length,m<l;++m){k=d[m]
l=f.i(0,g)
l.toString
j=Math.min(B.b.p(l),c+k.gP())
c=Math.max(0,c-(j-k.gP()))
if(q)l=p
else{l=e?1:0
l=B.c.A(s-r-l,0,5)}l=Math.max(1,l-m)
i=f.i(0,g)
i.toString
h=a2.cs(a,k,l,!1,j,a3,!0,B.b.p(i))
o=Math.min(o,h.b)
n=Math.min(n,h.c)}if(l!==0)f=l===1&&p<=2&&a.f>=a.r*0.8&&o>a1.r.cy||o>a1.r.CW+Math.max(0,l-1)*0.025-a4
else f=!0
if(f)return new A.bm(o,1,n)
return new A.bm(o,l>1&&n>a1.r.CW&&o>-0.08?Math.min(a1.r.ax,l):0,n)},
hI:function hI(a){this.a=a},
fK:function fK(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
fM:function fM(a){this.a=a},
fL:function fL(a,b,c){this.a=a
this.b=b
this.c=c},
fN:function fN(a){this.a=a},
fO:function fO(a,b){this.a=a
this.b=b},
fP:function fP(){},
fR:function fR(){},
fS:function fS(a){this.a=a},
fT:function fT(){},
fU:function fU(){},
fV:function fV(){},
fW:function fW(a){this.a=a},
fX:function fX(a,b,c){this.a=a
this.b=b
this.c=c},
fY:function fY(a,b,c){this.a=a
this.b=b
this.c=c},
fQ:function fQ(){},
bx:function bx(a,b,c){this.a=a
this.b=b
this.d=c},
dU:function dU(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dV:function dV(){},
dW:function dW(a,b,c){this.a=a
this.b=b
this.c=c},
dX:function dX(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dY:function dY(a,b,c){this.a=a
this.b=b
this.c=c},
dZ:function dZ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jO(a,b,c,d,e,f,g){var s,r,q,p,o=A.e8(e,t.N,t.H),n=t.S,m=A.aM(d,n),l=t.i,k=A.aM(b,l)
l=A.aM(a,l)
s=t.z
s=A.Y(s,s)
for(r=g.length,q=0;q<g.length;g.length===r||(0,A.u)(g),++q){p=g[q]
s.t(0,p.a,p)}return new A.e_(f,o,m,k,l,A.e8(s,n,t.o),c)},
jP(a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=A.F(a7.i(0,"version")),a0=t.f,a1=t.N,a2=A.ak(a0.a(a7.i(0,"values")),a1,t.H),a3=t.R,a4=A.bU(a3.a(a7.i(0,"upgrades")),!0,t.S),a5=t.n,a6=A.b([],a5)
for(s=J.G(a3.a(a7.i(0,"movement")));s.j();)a6.push(A.t(s.gl()))
a5=A.b([],a5)
for(s=J.G(a3.a(a7.i(0,"field")));s.j();)a5.push(A.t(s.gl()))
s=A.b([],t.W)
for(a3=J.G(a3.a(a7.i(0,"weapons"))),r=t.j;a3.j();){q=r.a(a3.gl())
p=q.length
if(0>=p)return A.l(q,0)
o=A.d(q[0])
if(1>=p)return A.l(q,1)
n=A.d(q[1])
if(2>=p)return A.l(q,2)
m=A.d(q[2])
if(3>=p)return A.l(q,3)
l=A.d(q[3])
if(4>=p)return A.l(q,4)
k=A.d(q[4])
if(5>=p)return A.l(q,5)
j=A.ao(q[5])
if(6>=p)return A.l(q,6)
s.push(new A.R(o,n,m,l,k,j,A.t(q[6])))}a0=A.ak(a0.a(a7.i(0,"tuning")),a1,t.z)
a1=A.t(a0.i(0,"interval"))
a3=A.id(a0.i(0,"resourceInterval"))
if(a3==null)a3=30
r=A.co(a0.i(0,"cashBuffer"))
if(r==null)r=12
q=A.t(a0.i(0,"threat"))
p=A.t(a0.i(0,"urgent"))
o=A.t(a0.i(0,"margin"))
n=A.t(a0.i(0,"commit"))
m=A.co(a0.i(0,"rearExtra"))
if(m==null)m=1
l=A.d(a0.i(0,"candidates"))
k=A.d(a0.i(0,"assessments"))
j=A.d(a0.i(0,"routes"))
i=A.d(a0.i(0,"plans"))
h=A.d(a0.i(0,"commands"))
g=A.d(a0.i(0,"team"))
f=A.d(a0.i(0,"targets"))
e=A.d(a0.i(0,"slice"))
d=A.t(a0.i(0,"advantage"))
c=A.t(a0.i(0,"expansion"))
b=A.t(a0.i(0,"credit"))
return A.jO(a5,a6,new A.cw(a1,q,p,o,a3,r,n,A.t(a0.i(0,"age")),m,l,k,j,i,h,g,f,e,d,b,c,A.d(a0.i(0,"timeout")),A.d(a0.i(0,"restarts")),A.t(a0.i(0,"stagnation"))),a4,a2,a,s)},
R:function R(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
e_:function e_(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
dH:function dH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
e1:function e1(a,b,c){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=0
_.r=c},
dm(a,b,c,d,e){var s,r,q,p,o,n,m=a.a,l=c.C(m),k=A.j(l).h("U<1>"),j=A.a6(new A.U(l,k),0,A.Z(a.ga8(),"count",t.S),k.h("k.E")).a7(0)
if(j.length===0)s=0
else{l=A.j(j)
s=new A.a4(j,l.h("i(1)").a(new A.hV()),l.h("a4<1,i>")).a6(0,B.D)}l=c.d
k=A.j(l)
r=new A.e(l,k.h("f(1)").a(new A.hW(a)),k.h("e<1>")).gm(0)
k=c.e
l=A.j(k)
q=new A.e(k,l.h("f(1)").a(new A.hX(a)),l.h("e<1>")).H(0,0,new A.hY(),t.i)
l=c.gaq().w.i(0,a.b)
p=Math.min(0.5,(l==null?0:l)*0.005)
o=r>=3?Math.min(40,r*6):0
n=e^m*7919
n^=n<<13
n^=n>>>17
if(a.c===b.b)m=1
else{m=d.b.i(0,"foreignYield")
m.toString}return 160+a.Q*m*2+q+o+p*30-s*0.5-a.d*8-b.z.J(a.f)*0.03+((n^n<<5)&65535)/65536*0.000001},
hV:function hV(){},
hW:function hW(a){this.a=a},
hX:function hX(a){this.a=a},
hY:function hY(){},
X:function X(a,b){this.a=a
this.b=b},
aj:function aj(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.d=c
_.f=d
_.r=e},
e4:function e4(){},
h1:function h1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h2:function h2(){},
h3:function h3(a){this.a=a},
h4:function h4(a){this.a=a},
h5:function h5(a){this.a=a},
h6:function h6(a){this.a=a},
h7:function h7(){},
e0:function e0(a){var _=this
_.a=a
_.d=_.c=_.b=0
_.e=!1},
lU(){var s,r,q=new A.hS(),p=v.G,o="web-worker:"+A.F(p.self.constructor.name)
p=A.hC(p.self)
s=new A.hT(new A.e1(q,o,A.bT(t.S)))
if(typeof s=="function")A.cu(A.cx("Attempting to rewrap a JS function.",null))
r=function(a,b){return function(c){return a(b,c,arguments.length)}}(A.kY,s)
r[$.is()]=s
p.onmessage=r
q.$1(B.i.ag(t.G.a(A.O(["kind","hello","protocol",1,"build","28093e66","backend",o],t.N,t.X)),null))},
hS:function hS(){},
hT:function hT(a){this.a=a},
jr(a){return v.mangledGlobalNames[a]},
m_(a){throw A.N(new A.bQ("Field '"+a+"' has been assigned during initialization."),new Error())},
aG(){throw A.N(A.k9(""),new Error())},
kY(a,b,c){t.h.a(a)
if(A.d(c)>=1)return a.$1(b)
return a.$0()},
jn(a,b,c){A.jh(c,t.H,"T","min")
return Math.min(c.a(a),c.a(b))},
jm(a,b,c){A.jh(c,t.H,"T","max")
return Math.max(c.a(a),c.a(b))}},B={}
var w=[A,J,B]
var $={}
A.i2.prototype={}
J.cK.prototype={
a2(a,b){return a===b},
gL(a){return A.d2(a)},
n(a){return"Instance of '"+A.d3(a)+"'"},
gM(a){return A.aE(A.ie(this))}}
J.cN.prototype={
n(a){return String(a)},
gL(a){return a?519018:218159},
gM(a){return A.aE(t.y)},
$iy:1,
$if:1}
J.bK.prototype={
a2(a,b){return null==b},
n(a){return"null"},
gL(a){return 0},
$iy:1}
J.bN.prototype={$iH:1}
J.aL.prototype={
gL(a){return 0},
n(a){return String(a)}}
J.d0.prototype={}
J.c5.prototype={}
J.aK.prototype={
n(a){var s=a[$.jt()]
if(s==null)s=a[$.is()]
if(s==null)return this.bW(a)
return"JavaScript function for "+J.bc(s)},
$iaw:1}
J.bM.prototype={
gL(a){return 0},
n(a){return String(a)}}
J.bO.prototype={
gL(a){return 0},
n(a){return String(a)}}
J.o.prototype={
k(a,b){A.j(a).c.a(b)
a.$flags&1&&A.cv(a,29)
a.push(b)},
ad(a,b){var s
a.$flags&1&&A.cv(a,"remove",1)
for(s=0;s<a.length;++s)if(J.aq(a[s],b)){a.splice(s,1)
return!0}return!1},
B(a,b){var s
A.j(a).h("c<1>").a(b)
a.$flags&1&&A.cv(a,"addAll",2)
if(Array.isArray(b)){this.bZ(a,b)
return}for(s=J.G(b);s.j();)a.push(s.gl())},
bZ(a,b){var s,r
t.k.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.h(A.S(a))
for(r=0;r<s;++r)a.push(b[r])},
an(a){a.$flags&1&&A.cv(a,"clear","clear")
a.length=0},
cF(a,b){var s,r=A.fq(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.t(r,s,A.r(a[s]))
return r.join(b)},
aI(a,b){return A.a6(a,b,null,A.j(a).c)},
a6(a,b){var s,r,q
A.j(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.h(A.ax())
if(0>=s)return A.l(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.h(A.S(a))}return r},
H(a,b,c,d){var s,r,q
d.a(b)
A.j(a).E(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.h(A.S(a))}return r},
ao(a,b){var s,r,q
A.j(a).h("f(1)").a(b)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.h(A.S(a))}throw A.h(A.ax())},
T(a,b){if(!(b>=0&&b<a.length))return A.l(a,b)
return a[b]},
gG(a){if(a.length>0)return a[0]
throw A.h(A.ax())},
gb0(a){var s=a.length
if(s>0)return a[s-1]
throw A.h(A.ax())},
N(a,b){var s,r
A.j(a).h("f(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.h(A.S(a))}return!1},
bG(a,b){var s,r
A.j(a).h("f(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.h(A.S(a))}return!0},
F(a,b){var s,r,q,p,o,n=A.j(a)
n.h("a(1,1)?").a(b)
a.$flags&2&&A.cv(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.cX()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.dl(b,2))
if(p>0)this.cb(a,p)},
cb(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
q(a,b){var s
for(s=0;s<a.length;++s)if(J.aq(a[s],b))return!0
return!1},
gW(a){return a.length===0},
gb_(a){return a.length!==0},
n(a){return A.i1(a,"[","]")},
gu(a){return new J.aW(a,a.length,A.j(a).h("aW<1>"))},
gL(a){return A.d2(a)},
gm(a){return a.length},
t(a,b,c){A.j(a).c.a(c)
a.$flags&2&&A.cv(a)
if(!(b>=0&&b<a.length))throw A.h(A.ji(a,b))
a[b]=c},
$im:1,
$ic:1,
$in:1}
J.cM.prototype={
cR(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.d3(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.fj.prototype={}
J.aW.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.u(q)
throw A.h(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iD:1}
J.bL.prototype={
v(a,b){var s
A.t(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaE(b)
if(this.gaE(a)===s)return 0
if(this.gaE(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaE(a){return a===0?1/a<0:a<0},
p(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.h(A.c8(""+a+".toInt()"))},
aW(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.h(A.c8(""+a+".ceil()"))},
V(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.h(A.c8(""+a+".floor()"))},
bL(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.h(A.c8(""+a+".round()"))},
A(a,b,c){if(B.c.v(b,c)>0)throw A.h(A.lB(b))
if(this.v(a,b)<0)return b
if(this.v(a,c)>0)return c
return a},
bN(a,b){var s
if(b>20)throw A.h(A.b0(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaE(a))return"-"+s
return s},
n(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gL(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
ba(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.br(a,b)},
ci(a,b){return(a|0)===a?a/b|0:this.br(a,b)},
br(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.h(A.c8("Result of truncating division is "+A.r(s)+": "+A.r(a)+" ~/ "+b))},
bq(a,b){var s
if(a>0)s=this.cf(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cf(a,b){return b>31?0:a>>>b},
gM(a){return A.aE(t.H)},
$ii:1,
$iV:1}
J.bJ.prototype={
gM(a){return A.aE(t.S)},
$iy:1,
$ia:1}
J.cO.prototype={
gM(a){return A.aE(t.i)},
$iy:1}
J.be.prototype={
av(a,b,c){return a.substring(b,A.kh(b,c,a.length))},
bQ(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.h(B.a_)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
cH(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bQ(c,s)+a},
v(a,b){var s
A.F(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
n(a){return a},
gL(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gM(a){return A.aE(t.N)},
gm(a){return a.length},
$iy:1,
$iE:1}
A.bQ.prototype={
n(a){return"LateInitializationError: "+this.a}}
A.fZ.prototype={}
A.m.prototype={}
A.k.prototype={
gu(a){var s=this
return new A.w(s,s.gm(s),A.q(s).h("w<k.E>"))},
gW(a){return this.gm(this)===0},
bJ(a,b,c){var s=A.q(this)
return new A.a4(this,s.E(c).h("1(k.E)").a(b),s.h("@<k.E>").E(c).h("a4<1,2>"))},
a6(a,b){var s,r,q,p=this
A.q(p).h("k.E(k.E,k.E)").a(b)
s=p.gm(p)
if(s===0)throw A.h(A.ax())
r=p.T(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.T(0,q))
if(s!==p.gm(p))throw A.h(A.S(p))}return r},
H(a,b,c,d){var s,r,q,p=this
d.a(b)
A.q(p).E(d).h("1(1,k.E)").a(c)
s=p.gm(p)
for(r=b,q=0;q<s;++q){r=c.$2(r,p.T(0,q))
if(s!==p.gm(p))throw A.h(A.S(p))}return r}}
A.I.prototype={
a3(a,b,c,d){var s,r=this.b
A.c1(r,"start")
s=this.c
if(s!=null){A.c1(s,"end")
if(r>s)throw A.h(A.b0(r,0,s,"start",null))}},
gc6(){var s=J.bb(this.a),r=this.c
if(r==null||r>s)return s
return r},
gcg(){var s=J.bb(this.a),r=this.b
if(r>s)return s
return r},
gm(a){var s,r=J.bb(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
T(a,b){var s=this,r=s.gcg()+b
if(b<0||r>=s.gc6())throw A.h(A.i0(b,s.gm(0),s,"index"))
return J.hZ(s.a,r)},
a7(a){var s,r,q,p=this,o=p.b,n=p.a,m=J.ct(n),l=m.gm(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.iF(0,p.$ti.c)
return n}r=A.fq(s,m.T(n,o),!0,p.$ti.c)
for(q=1;q<s;++q){B.a.t(r,q,m.T(n,o+q))
if(m.gm(n)<l)throw A.h(A.S(p))}return r}}
A.w.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=J.ct(q),o=p.gm(q)
if(r.b!==o)throw A.h(A.S(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.T(q,s);++r.c
return!0},
$iD:1}
A.b_.prototype={
gu(a){return new A.bV(J.G(this.a),this.b,A.q(this).h("bV<1,2>"))},
gm(a){return J.bb(this.a)}}
A.bD.prototype={$im:1}
A.bV.prototype={
j(){var s=this,r=s.b
if(r.j()){s.a=s.c.$1(r.gl())
return!0}s.a=null
return!1},
gl(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iD:1}
A.a4.prototype={
gm(a){return J.bb(this.a)},
T(a,b){return this.b.$1(J.hZ(this.a,b))}}
A.e.prototype={
gu(a){return new A.J(J.G(this.a),this.b,this.$ti.h("J<1>"))}}
A.J.prototype={
j(){var s,r
for(s=this.a,r=this.b;s.j();)if(r.$1(s.gl()))return!0
return!1},
gl(){return this.a.gl()},
$iD:1}
A.bH.prototype={
gu(a){return new A.bI(J.G(this.a),this.b,B.T,this.$ti.h("bI<1,2>"))}}
A.bI.prototype={
gl(){var s=this.d
return s==null?this.$ti.y[1].a(s):s},
j(){var s,r,q=this,p=q.c
if(p==null)return!1
for(s=q.a,r=q.b;!p.j();){q.d=null
if(s.j()){q.c=null
p=J.G(r.$1(s.gl()))
q.c=p}else return!1}q.d=q.c.gl()
return!0},
$iD:1}
A.b1.prototype={
gu(a){var s=this.a
return new A.b2(s.gu(s),this.b,A.q(this).h("b2<1>"))}}
A.bE.prototype={
gm(a){var s=this.a,r=s.gm(s)
s=this.b
if(r>s)return s
return r},
$im:1}
A.b2.prototype={
j(){if(--this.b>=0)return this.a.j()
this.b=-1
return!1},
gl(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gl()},
$iD:1}
A.bF.prototype={
j(){return!1},
gl(){throw A.h(A.ax())},
$iD:1}
A.c9.prototype={
gu(a){return new A.ca(J.G(this.a),this.$ti.h("ca<1>"))}}
A.ca.prototype={
j(){var s,r
for(s=this.a,r=this.$ti.c;s.j();)if(r.b(s.gl()))return!0
return!1},
gl(){return this.$ti.c.a(this.a.gl())},
$iD:1}
A.a1.prototype={}
A.U.prototype={
gm(a){return this.a.length},
T(a,b){var s=this.a
return J.hZ(s,s.length-1-b)}}
A.bl.prototype={$r:"+(1,2,3)",$s:1}
A.bm.prototype={$r:"+lower,teamSize,upper(1,2,3)",$s:2}
A.bn.prototype={$r:"+high,low,selfHigh,selfLow(1,2,3,4)",$s:3}
A.bA.prototype={}
A.bz.prototype={
gW(a){return this.gm(this)===0},
n(a){return A.fs(this)},
gab(){return new A.an(this.cA(),A.q(this).h("an<a3<1,2>>"))},
cA(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gab(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.ga0(),o=o.gu(o),n=A.q(s),m=n.y[1],n=n.h("a3<1,2>")
case 2:if(!o.j()){r=3
break}l=o.gl()
k=s.i(0,l)
r=4
return a.b=new A.a3(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$ia2:1}
A.bB.prototype={
gm(a){return this.b.length},
gbk(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
Z(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
i(a,b){if(!this.Z(b))return null
return this.b[this.a[b]]},
a_(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbk()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
ga0(){return new A.b5(this.gbk(),this.$ti.h("b5<1>"))},
gb4(){return new A.b5(this.b,this.$ti.h("b5<2>"))}}
A.b5.prototype={
gm(a){return this.a.length},
gu(a){var s=this.a
return new A.cb(s,s.length,this.$ti.h("cb<1>"))}}
A.cb.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iD:1}
A.cJ.prototype={
a2(a,b){if(b==null)return!1
return b instanceof A.aY&&this.a.a2(0,b.a)&&A.io(this)===A.io(b)},
gL(a){return A.i5(this.a,A.io(this),B.l,B.l)},
n(a){var s=B.a.cF([A.aE(this.$ti.c)],", ")
return this.a.n(0)+" with "+("<"+s+">")}}
A.aY.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.lR(A.hJ(this.a),this.$ti)}}
A.fH.prototype={
$0(){return B.b.V(1000*this.a.now())},
$S:4}
A.c2.prototype={}
A.h8.prototype={
a1(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.c_.prototype={
n(a){return"Null check operator used on a null value"}}
A.cP.prototype={
n(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.d8.prototype={
n(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.fu.prototype={
n(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.bG.prototype={}
A.ch.prototype={
n(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iaN:1}
A.a0.prototype={
n(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.js(r==null?"unknown":r)+"'"},
$iaw:1,
gcW(){return this},
$C:"$1",
$R:1,
$D:null}
A.cA.prototype={$C:"$0",$R:0}
A.cB.prototype={$C:"$2",$R:2}
A.d6.prototype={}
A.d5.prototype={
n(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.js(s)+"'"}}
A.bd.prototype={
a2(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bd))return!1
return this.$_target===b.$_target&&this.a===b.a},
gL(a){return(A.jo(this.a)^A.d2(this.$_target))>>>0},
n(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.d3(this.a)+"'")}}
A.d4.prototype={
n(a){return"RuntimeError: "+this.a}}
A.ay.prototype={
gm(a){return this.a},
gW(a){return this.a===0},
ga0(){return new A.ac(this,A.q(this).h("ac<1>"))},
gab(){return new A.aZ(this,A.q(this).h("aZ<1,2>"))},
Z(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.cC(a)},
cC(a){var s=this.d
if(s==null)return!1
return this.aY(this.bj(s,a),a)>=0},
B(a,b){A.q(this).h("a2<1,2>").a(b).a_(0,new A.fk(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.cD(b)},
cD(a){var s,r,q=this.d
if(q==null)return null
s=this.bj(q,a)
r=this.aY(s,a)
if(r<0)return null
return s[r].b},
t(a,b,c){var s,r,q=this,p=A.q(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bb(s==null?q.b=q.aT():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bb(r==null?q.c=q.aT():r,b,c)}else q.cE(b,c)},
cE(a,b){var s,r,q,p,o=this,n=A.q(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.aT()
r=o.bI(a)
q=s[r]
if(q==null)s[r]=[o.aU(a,b)]
else{p=o.aY(q,a)
if(p>=0)q[p].b=b
else q.push(o.aU(a,b))}},
ad(a,b){var s=this.ca(this.b,b)
return s},
an(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aS()}},
a_(a,b){var s,r,q=this
A.q(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.h(A.S(q))
s=s.c}},
bb(a,b,c){var s,r=A.q(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.aU(b,c)
else s.b=c},
ca(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.cj(s)
delete a[b]
return s.b},
aS(){this.r=this.r+1&1073741823},
aU(a,b){var s=this,r=A.q(s),q=new A.fo(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.aS()
return q},
cj(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.aS()},
bI(a){return J.a_(a)&1073741823},
bj(a,b){return a[this.bI(b)]},
aY(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aq(a[r].a,b))return r
return-1},
n(a){return A.fs(this)},
aT(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$iiH:1}
A.fk.prototype={
$2(a,b){var s=this.a,r=A.q(s)
s.t(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.q(this.a).h("~(1,2)")}}
A.fo.prototype={}
A.ac.prototype={
gm(a){return this.a.a},
gW(a){return this.a.a===0},
gu(a){var s=this.a
return new A.bS(s,s.r,s.e,this.$ti.h("bS<1>"))},
q(a,b){return this.a.Z(b)}}
A.bS.prototype={
gl(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.h(A.S(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iD:1}
A.ad.prototype={
gm(a){return this.a.a},
gu(a){var s=this.a
return new A.az(s,s.r,s.e,this.$ti.h("az<1>"))}}
A.az.prototype={
gl(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.h(A.S(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iD:1}
A.aZ.prototype={
gm(a){return this.a.a},
gu(a){var s=this.a
return new A.bR(s,s.r,s.e,this.$ti.h("bR<1,2>"))}}
A.bR.prototype={
gl(){var s=this.d
s.toString
return s},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.h(A.S(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.a3(s.a,s.b,r.$ti.h("a3<1,2>"))
r.c=s.c
return!0}},
$iD:1}
A.hO.prototype={
$1(a){return this.a(a)},
$S:18}
A.hP.prototype={
$2(a,b){return this.a(a,b)},
$S:58}
A.hQ.prototype={
$1(a){return this.a(A.F(a))},
$S:43}
A.as.prototype={
n(a){return this.bt(!1)},
bt(a){var s,r,q,p,o,n=this.c7(),m=this.aR(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.l(m,q)
o=m[q]
l=a?l+A.iL(o):l+A.r(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
c7(){var s,r=this.$s
while($.hv.length<=r)B.a.k($.hv,null)
s=$.hv[r]
if(s==null){s=this.c4()
B.a.t($.hv,r,s)}return s},
c4(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.b(new Array(l),t.Q)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.t(k,q,r[s])}}return A.aM(k,t.K)}}
A.b8.prototype={
aR(){return[this.a,this.b,this.c]},
a2(a,b){var s=this
if(b==null)return!1
return b instanceof A.b8&&s.$s===b.$s&&J.aq(s.a,b.a)&&J.aq(s.b,b.b)&&J.aq(s.c,b.c)},
gL(a){var s=this
return A.i5(s.$s,s.a,s.b,s.c)}}
A.bk.prototype={
aR(){return this.a},
a2(a,b){if(b==null)return!1
return b instanceof A.bk&&this.$s===b.$s&&A.kE(this.a,b.a)},
gL(a){return A.i5(this.$s,A.kc(this.a),B.l,B.l)}}
A.bg.prototype={
gM(a){return B.ah},
$iy:1}
A.bY.prototype={}
A.cR.prototype={
gM(a){return B.ai},
$iy:1}
A.bh.prototype={
gm(a){return a.length},
$iab:1}
A.bW.prototype={$im:1,$ic:1,$in:1}
A.bX.prototype={$im:1,$ic:1,$in:1}
A.cS.prototype={
gM(a){return B.aj},
$iy:1}
A.cT.prototype={
gM(a){return B.ak},
$iy:1}
A.cU.prototype={
gM(a){return B.al},
$iy:1}
A.cV.prototype={
gM(a){return B.am},
$iy:1}
A.cW.prototype={
gM(a){return B.an},
$iy:1}
A.cX.prototype={
gM(a){return B.ap},
$iy:1}
A.cY.prototype={
gM(a){return B.aq},
$iy:1}
A.bZ.prototype={
gM(a){return B.ar},
gm(a){return a.length},
$iy:1}
A.cZ.prototype={
gM(a){return B.as},
gm(a){return a.length},
$iy:1,
$ii9:1}
A.cc.prototype={}
A.cd.prototype={}
A.ce.prototype={}
A.cf.prototype={}
A.al.prototype={
h(a){return A.cl(v.typeUniverse,this,a)},
E(a){return A.j1(v.typeUniverse,this,a)}}
A.dd.prototype={}
A.hz.prototype={
n(a){return A.a7(this.a,null)}}
A.dc.prototype={
n(a){return this.a}}
A.bo.prototype={$iaB:1}
A.hb.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:25}
A.ha.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:38}
A.hc.prototype={
$0(){this.a.$0()},
$S:17}
A.hd.prototype={
$0(){this.a.$0()},
$S:17}
A.hx.prototype={
bX(a,b){if(self.setTimeout!=null)self.setTimeout(A.dl(new A.hy(this,b),0),a)
else throw A.h(A.c8("`setTimeout()` not found."))}}
A.hy.prototype={
$0(){this.b.$0()},
$S:3}
A.d9.prototype={}
A.hD.prototype={
$1(a){return this.a.$2(0,a)},
$S:39}
A.hE.prototype={
$2(a,b){this.a.$2(1,new A.bG(a,t.l.a(b)))},
$S:33}
A.hH.prototype={
$2(a,b){this.a(A.d(a),b)},
$S:59}
A.aD.prototype={
gl(){var s=this.b
return s==null?this.$ti.c.a(s):s},
cc(a,b){var s,r,q
a=A.d(a)
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
o.d=null}q=o.cc(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.iW
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
o.a=A.iW
throw n
return!1}if(0>=p.length)return A.l(p,-1)
o.a=p.pop()
m=1
continue}throw A.h(A.iN("sync*"))}return!1},
bv(a){var s,r,q=this
if(a instanceof A.an){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.k(r,q.a)
q.a=s
return 2}else{q.d=J.G(a)
return 2}},
$iD:1}
A.an.prototype={
gu(a){return new A.aD(this.a(),this.$ti.h("aD<1>"))}}
A.ai.prototype={
n(a){return A.r(this.a)},
$iA:1,
gau(){return this.b}}
A.fi.prototype={
$0(){this.c.a(null)
this.b.c2(null)},
$S:3}
A.b3.prototype={
cG(a){if((this.c&15)!==6)return!0
return this.b.b.b2(t.al.a(this.d),a.a,t.y,t.K)},
cB(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.cO(q,m,a.b,o,n,t.l)
else p=l.b2(t.B.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.aH(s))){if((r.c&1)!==0)throw A.h(A.cx("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.h(A.cx("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.P.prototype={
bM(a,b,c){var s,r,q=this.$ti
q.E(c).h("1/(2)").a(a)
s=$.K
if(s===B.j){if(!t.C.b(b)&&!t.B.b(b))throw A.h(A.e2(b,"onError",u.c))}else{c.h("@<0/>").E(q.c).h("1(2)").a(a)
b=A.lp(b,s)}r=new A.P(s,c.h("P<0>"))
this.aJ(new A.b3(r,3,a,b,q.h("@<1>").E(c).h("b3<1,2>")))
return r},
bs(a,b,c){var s,r=this.$ti
r.E(c).h("1/(2)").a(a)
s=new A.P($.K,c.h("P<0>"))
this.aJ(new A.b3(s,19,a,b,r.h("@<1>").E(c).h("b3<1,2>")))
return s},
ce(a){this.a=this.a&1|16
this.c=a},
aw(a){this.a=a.a&30|this.a&1
this.c=a.c},
aJ(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.aJ(a)
return}r.aw(s)}A.dk(null,null,r.b,t.M.a(new A.hf(r,a)))}},
bo(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.bo(a)
return}m.aw(n)}l.a=m.aA(a)
A.dk(null,null,m.b,t.M.a(new A.hk(l,m)))}},
al(){var s=t.F.a(this.c)
this.c=null
return this.aA(s)},
aA(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
c2(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("aJ<1>").b(a))A.hi(a,r,!0)
else{s=r.al()
q.c.a(a)
r.a=8
r.c=a
A.b4(r,s)}},
bi(a){var s,r=this
r.$ti.c.a(a)
s=r.al()
r.a=8
r.c=a
A.b4(r,s)},
c3(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.al()
q.aw(a)
A.b4(q,r)},
aN(a){var s=this.al()
this.ce(a)
A.b4(this,s)},
c0(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("aJ<1>").b(a)){this.be(a)
return}this.c1(a)},
c1(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dk(null,null,s.b,t.M.a(new A.hh(s,a)))},
be(a){A.hi(this.$ti.h("aJ<1>").a(a),this,!1)
return},
bd(a){this.a^=2
A.dk(null,null,this.b,t.M.a(new A.hg(this,a)))},
$iaJ:1}
A.hf.prototype={
$0(){A.b4(this.a,this.b)},
$S:3}
A.hk.prototype={
$0(){A.b4(this.b,this.a.a)},
$S:3}
A.hj.prototype={
$0(){A.hi(this.a.a,this.b,!0)},
$S:3}
A.hh.prototype={
$0(){this.a.bi(this.b)},
$S:3}
A.hg.prototype={
$0(){this.a.aN(this.b)},
$S:3}
A.hn.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.cN(t.fO.a(q.d),t.z)}catch(p){s=A.aH(p)
r=A.bv(p)
if(k.c&&t.t.a(k.b.a.c).a===s){q=k.a
q.c=t.t.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.i_(q)
n=k.a
n.c=new A.ai(q,o)
q=n}q.b=!0
return}if(j instanceof A.P&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.t.a(j.c)
q.b=!0}return}if(j instanceof A.P){m=k.b.a
l=new A.P(m.b,m.$ti)
j.bM(new A.ho(l,m),new A.hp(l),t.p)
q=k.a
q.c=l
q.b=!1}},
$S:3}
A.ho.prototype={
$1(a){this.a.c3(this.b)},
$S:25}
A.hp.prototype={
$2(a,b){A.cp(a)
t.l.a(b)
this.a.aN(new A.ai(a,b))},
$S:46}
A.hm.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.b2(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aH(l)
r=A.bv(l)
q=s
p=r
if(p==null)p=A.i_(q)
o=this.a
o.c=new A.ai(q,p)
o.b=!0}},
$S:3}
A.hl.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.t.a(l.a.a.c)
p=l.b
if(p.a.cG(s)&&p.a.e!=null){p.c=p.a.cB(s)
p.b=!1}}catch(o){r=A.aH(o)
q=A.bv(o)
p=t.t.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.i_(p)
m=l.b
m.c=new A.ai(p,n)
p=m}p.b=!0}},
$S:3}
A.da.prototype={}
A.di.prototype={}
A.cn.prototype={$iiR:1}
A.dh.prototype={
cP(a){var s,r,q
t.M.a(a)
try{if(B.j===$.K){a.$0()
return}A.jb(null,null,this,a,t.p)}catch(q){s=A.aH(q)
r=A.bv(q)
A.ii(A.cp(s),t.l.a(r))}},
bx(a){return new A.hw(this,t.M.a(a))},
cN(a,b){b.h("0()").a(a)
if($.K===B.j)return a.$0()
return A.jb(null,null,this,a,b)},
b2(a,b,c,d){c.h("@<0>").E(d).h("1(2)").a(a)
d.a(b)
if($.K===B.j)return a.$1(b)
return A.lr(null,null,this,a,b,c,d)},
cO(a,b,c,d,e,f){d.h("@<0>").E(e).E(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.K===B.j)return a.$2(b,c)
return A.lq(null,null,this,a,b,c,d,e,f)},
bK(a,b,c,d){return b.h("@<0>").E(c).E(d).h("1(2,3)").a(a)}}
A.hw.prototype={
$0(){return this.a.cP(this.b)},
$S:3}
A.hG.prototype={
$0(){A.k_(this.a,this.b)},
$S:3}
A.aP.prototype={
gu(a){var s=this,r=new A.b6(s,s.r,s.$ti.h("b6<1>"))
r.c=s.e
return r},
gm(a){return this.a},
q(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.c5(b)},
c5(a){var s=this.d
if(s==null)return!1
return this.aQ(s[J.a_(a)&1073741823],a)>=0},
k(a,b){var s,r,q=this
q.$ti.c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bf(s==null?q.b=A.ia():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bf(r==null?q.c=A.ia():r,b)}else return q.bY(b)},
bY(a){var s,r,q,p=this
p.$ti.c.a(a)
s=p.d
if(s==null)s=p.d=A.ia()
r=J.a_(a)&1073741823
q=s[r]
if(q==null)s[r]=[p.aM(a)]
else{if(p.aQ(q,a)>=0)return!1
q.push(p.aM(a))}return!0},
ad(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bg(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bg(s.c,b)
else return s.c9(b)},
c9(a){var s,r,q,p,o=this.d
if(o==null)return!1
s=J.a_(a)&1073741823
r=o[s]
q=this.aQ(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete o[s]
this.bh(p)
return!0},
bf(a,b){this.$ti.c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.aM(b)
return!0},
bg(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bh(s)
delete a[b]
return!0},
aL(){this.r=this.r+1&1073741823},
aM(a){var s,r=this,q=new A.dg(r.$ti.c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.aL()
return q},
bh(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.aL()},
aQ(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.aq(a[r].a,b))return r
return-1},
$iiJ:1}
A.dg.prototype={}
A.b6.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.h(A.S(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iD:1}
A.fp.prototype={
$2(a,b){this.a.t(0,this.b.a(a),this.c.a(b))},
$S:27}
A.B.prototype={
gu(a){return new A.w(a,a.length,A.aS(a).h("w<B.E>"))},
T(a,b){if(!(b>=0&&b<a.length))return A.l(a,b)
return a[b]},
gW(a){return a.length===0},
gb_(a){return a.length!==0},
gG(a){var s=a.length
if(s===0)throw A.h(A.ax())
if(0>=s)return A.l(a,0)
return a[0]},
gb0(a){var s,r=a.length
if(r===0)throw A.h(A.ax())
s=r-1
if(!(s>=0))return A.l(a,s)
return a[s]},
H(a,b,c,d){var s,r,q,p
d.a(b)
A.aS(a).E(d).h("1(1,B.E)").a(c)
s=a.length
for(r=s,q=b,p=0;p<s;++p){if(!(p<r))return A.l(a,p)
q=c.$2(q,a[p])
r=a.length
if(s!==r)throw A.h(A.S(a))}return q},
aI(a,b){return A.a6(a,b,null,A.aS(a).h("B.E"))},
n(a){return A.i1(a,"[","]")}}
A.C.prototype={
a_(a,b){var s,r,q,p=A.q(this)
p.h("~(C.K,C.V)").a(b)
for(s=this.ga0(),s=s.gu(s),p=p.h("C.V");s.j();){r=s.gl()
q=this.i(0,r)
b.$2(r,q==null?p.a(q):q)}},
aj(a,b,c){var s,r=this,q=A.q(r)
q.h("C.K").a(a)
q.h("C.V(C.V)").a(b)
q.h("C.V()?").a(c)
if(r.Z(a)){s=r.i(0,a)
q=b.$1(s==null?q.h("C.V").a(s):s)
r.t(0,a,q)
return q}q=c.$0()
r.t(0,a,q)
return q},
gab(){return this.ga0().bJ(0,new A.fr(this),A.q(this).h("a3<C.K,C.V>"))},
Z(a){return this.ga0().q(0,a)},
gm(a){var s=this.ga0()
return s.gm(s)},
gW(a){var s=this.ga0()
return s.gW(s)},
n(a){return A.fs(this)},
$ia2:1}
A.fr.prototype={
$1(a){var s=this.a,r=A.q(s)
r.h("C.K").a(a)
s=s.i(0,a)
if(s==null)s=r.h("C.V").a(s)
return new A.a3(a,s,r.h("a3<C.K,C.V>"))},
$S(){return A.q(this.a).h("a3<C.K,C.V>(C.K)")}}
A.ft.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.r(a)
r.a=(r.a+=s)+": "
s=A.r(b)
r.a+=s},
$S:21}
A.cm.prototype={}
A.bf.prototype={
i(a,b){return this.a.i(0,b)},
a_(a,b){this.a.a_(0,this.$ti.h("~(1,2)").a(b))},
gW(a){return this.a.a===0},
gm(a){return this.a.a},
n(a){return A.fs(this.a)},
gb4(){var s=this.a
return new A.ad(s,A.q(s).h("ad<2>"))},
gab(){var s=this.a
return new A.aZ(s,A.q(s).h("aZ<1,2>"))},
$ia2:1}
A.c6.prototype={}
A.bi.prototype={
B(a,b){var s,r,q
this.$ti.h("c<1>").a(b)
for(s=A.hu(b,b.r,b.$ti.c),r=s.$ti.c;s.j();){q=s.d
this.k(0,q==null?r.a(q):q)}},
n(a){return A.i1(this,"{","}")},
H(a,b,c,d){var s,r,q,p
d.a(b)
s=this.$ti
s.E(d).h("1(1,2)").a(c)
for(s=A.hu(this,this.r,s.c),r=s.$ti.c,q=b;s.j();){p=s.d
q=c.$2(q,p==null?r.a(p):p)}return q},
$im:1,
$ic:1,
$ii7:1}
A.cg.prototype={
cw(a){var s,r,q=this.$ti,p=new A.aP(q)
for(q=A.hu(this,this.r,q.c),s=q.$ti.c;q.j();){r=q.d
if(r==null)r=s.a(r)
if(!a.q(0,r))p.k(0,r)}return p}}
A.bp.prototype={}
A.de.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.c8(b):s}},
gm(a){return this.b==null?this.c.a:this.ak().length},
gW(a){return this.gm(0)===0},
ga0(){if(this.b==null){var s=this.c
return new A.ac(s,A.q(s).h("ac<1>"))}return new A.df(this)},
t(a,b,c){var s,r,q=this
A.F(b)
if(q.b==null)q.c.t(0,b,c)
else if(q.Z(b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.ck().t(0,b,c)},
Z(a){if(this.b==null)return this.c.Z(a)
return!1},
a_(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.a_(0,b)
s=o.ak()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.hF(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.h(A.S(o))}},
ak(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.b(Object.keys(this.a),t.s)
return s},
ck(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.Y(t.N,t.z)
r=n.ak()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.t(0,o,n.i(0,o))}if(p===0)B.a.k(r,"")
else B.a.an(r)
n.a=n.b=null
return n.c=s},
c8(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.hF(this.a[a])
return this.b[a]=s}}
A.df.prototype={
gm(a){return this.a.gm(0)},
T(a,b){var s=this.a
if(s.b==null)s=s.ga0().T(0,b)
else{s=s.ak()
if(!(b>=0&&b<s.length))return A.l(s,b)
s=s[b]}return s},
gu(a){var s=this.a
if(s.b==null){s=s.ga0()
s=s.gu(s)}else{s=s.ak()
s=new J.aW(s,s.length,A.j(s).h("aW<1>"))}return s},
q(a,b){return this.a.Z(b)}}
A.cC.prototype={}
A.cE.prototype={}
A.bP.prototype={
n(a){var s=A.cH(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.cQ.prototype={
n(a){return"Cyclic error in JSON stringify"}}
A.fl.prototype={
ct(a,b){var s=A.ln(a,this.gcu().a)
return s},
ag(a,b){var s=A.kv(a,this.gcz().b,null)
return s},
gcz(){return B.ad},
gcu(){return B.ac}}
A.fn.prototype={}
A.fm.prototype={}
A.hs.prototype={
bP(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.m.av(a,r,q)
r=q+1
o=A.T(92)
s.a+=o
o=A.T(117)
s.a+=o
o=A.T(100)
s.a+=o
o=p>>>8&15
o=A.T(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.T(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.T(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.m.av(a,r,q)
r=q+1
o=A.T(92)
s.a+=o
switch(p){case 8:o=A.T(98)
s.a+=o
break
case 9:o=A.T(116)
s.a+=o
break
case 10:o=A.T(110)
s.a+=o
break
case 12:o=A.T(102)
s.a+=o
break
case 13:o=A.T(114)
s.a+=o
break
default:o=A.T(117)
s.a+=o
o=A.T(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.T(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.T(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.m.av(a,r,q)
r=q+1
o=A.T(92)
s.a+=o
o=A.T(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.m.av(a,r,m)},
aK(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.h(new A.cQ(a,null))}B.a.k(s,a)},
aH(a){var s,r,q,p,o=this
if(o.bO(a))return
o.aK(a)
try{s=o.b.$1(a)
if(!o.bO(s)){q=A.iG(a,null,o.gbl())
throw A.h(q)}q=o.a
if(0>=q.length)return A.l(q,-1)
q.pop()}catch(p){r=A.aH(p)
q=A.iG(a,r,o.gbl())
throw A.h(q)}},
bO(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.b.n(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.bP(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.aK(a)
q.cT(a)
s=q.a
if(0>=s.length)return A.l(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.aK(a)
r=q.cU(a)
s=q.a
if(0>=s.length)return A.l(s,-1)
s.pop()
return r}else return!1},
cT(a){var s,r=this.c
r.a+="["
if(J.jH(a)){if(0>=a.length)return A.l(a,0)
this.aH(a[0])
for(s=1;s<a.length;++s){r.a+=","
this.aH(a[s])}}r.a+="]"},
cU(a){var s,r,q,p,o,n,m=this,l={}
if(a.gW(a)){m.c.a+="{}"
return!0}s=a.gm(a)*2
r=A.fq(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.a_(0,new A.ht(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.bP(A.F(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.l(r,n)
m.aH(r[n])}p.a+="}"
return!0}}
A.ht.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.t(s,r.a++,a)
B.a.t(s,r.a++,b)},
$S:21}
A.hr.prototype={
gbl(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.cF.prototype={
a2(a,b){if(b==null)return!1
return b instanceof A.cF},
gL(a){return B.c.gL(0)},
n(a){return"0:00:00."+B.m.cH(B.c.n(0),6,"0")}}
A.db.prototype={
n(a){return this.az()},
$icG:1}
A.A.prototype={
gau(){return A.ke(this)}}
A.cy.prototype={
n(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cH(s)
return"Assertion failed"}}
A.aB.prototype={}
A.ar.prototype={
gaP(){return"Invalid argument"+(!this.a?"(s)":"")},
gaO(){return""},
n(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gaP()+q+o
if(!s.a)return n
return n+s.gaO()+": "+A.cH(s.gaZ())},
gaZ(){return this.b}}
A.c0.prototype={
gaZ(){return A.id(this.b)},
gaP(){return"RangeError"},
gaO(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.r(q):""
else if(q==null)s=": Not greater than or equal to "+A.r(r)
else if(q>r)s=": Not in inclusive range "+A.r(r)+".."+A.r(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.r(r)
return s}}
A.cI.prototype={
gaZ(){return A.d(this.b)},
gaP(){return"RangeError"},
gaO(){if(A.d(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gm(a){return this.f}}
A.c7.prototype={
n(a){return"Unsupported operation: "+this.a}}
A.d7.prototype={
n(a){return"UnimplementedError: "+this.a}}
A.c4.prototype={
n(a){return"Bad state: "+this.a}}
A.cD.prototype={
n(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.cH(s)+"."}}
A.d_.prototype={
n(a){return"Out of Memory"},
gau(){return null},
$iA:1}
A.c3.prototype={
n(a){return"Stack Overflow"},
gau(){return null},
$iA:1}
A.he.prototype={
n(a){return"Exception: "+this.a}}
A.av.prototype={
n(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.c.prototype={
bJ(a,b,c){var s=A.q(this)
return A.kb(this,s.E(c).h("1(c.E)").a(b),s.h("c.E"),c)},
cS(a,b){var s=A.q(this)
return new A.e(this,s.h("f(c.E)").a(b),s.h("e<c.E>"))},
H(a,b,c,d){var s,r
d.a(b)
A.q(this).E(d).h("1(1,c.E)").a(c)
for(s=this.gu(this),r=b;s.j();)r=c.$2(r,s.gl())
return r},
gm(a){var s,r=this.gu(this)
for(s=0;r.j();)++s
return s},
gG(a){var s=this.gu(this)
if(!s.j())throw A.h(A.ax())
return s.gl()},
T(a,b){var s,r
A.c1(b,"index")
s=this.gu(this)
for(r=b;s.j();){if(r===0)return s.gl();--r}throw A.h(A.i0(b,b-r,this,"index"))},
n(a){return A.k6(this,"(",")")}}
A.a3.prototype={
n(a){return"MapEntry("+A.r(this.a)+": "+A.r(this.b)+")"}}
A.a5.prototype={
gL(a){return A.x.prototype.gL.call(this,0)},
n(a){return"null"}}
A.x.prototype={$ix:1,
a2(a,b){return this===b},
gL(a){return A.d2(this)},
n(a){return"Instance of '"+A.d3(this)+"'"},
gM(a){return A.lL(this)},
toString(){return this.n(this)}}
A.dj.prototype={
n(a){return""},
$iaN:1}
A.h_.prototype={
gbE(){var s,r=this.b
if(r==null)r=$.fJ.$0()
s=r-this.a
if($.it()===1e6)return s
return s*1000},
b7(){var s=this,r=s.b
if(r!=null){s.a=s.a+($.fJ.$0()-r)
s.b=null}}}
A.bj.prototype={
gm(a){return this.a.length},
n(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ikk:1}
A.aO.prototype={}
A.e3.prototype={}
A.aI.prototype={
gcl(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=t.S,f=A.Y(g,g)
for(g=h.y,g=new A.az(g,g.r,g.e,A.q(g).h("az<2>")),s=h.a,r=h.z,q=h.Q,p=s.b,o=s.a;g.j();){n=g.d
m=s.ac(n.a)
l=!0
if(n.z){k=n.d
if(k!=null)if(m!=null)if(!m.fy)if(!(m.f<=0)){j=m.a
if(!r.q(0,j)){i=m.as
if(!((i===B.h||i===B.e)&&!q.q(0,j)))if(n.w>=p){l=s.O(k)
l=(l==null?null:l.b)!==o}}}}if(l)continue
n=n.d
n.toString
f.aj(n,new A.ds(),new A.dt())}return f},
K(){var s,r=this,q=r.y,p=A.q(q).h("ad<2>")
q=A.v(new A.ad(q,p),p.h("c.E"))
s=A.ix(r.a,r.b,r.c,q)
s.d=r.d
s.e=r.e
s.f=r.f
s.r=r.r
q=s.w
q.an(0)
q.B(0,r.w)
q=s.x
q.an(0)
q.B(0,r.x)
s.z.B(0,r.z)
s.Q.B(0,r.Q)
s.as.B(0,r.as)
s.at.B(0,r.at)
s.ax.B(0,r.ax)
B.a.B(s.ay,r.ay)
return s},
C(a){var s=this.a.C(a),r=A.j(s),q=r.h("e<1>")
s=A.v(new A.e(s,r.h("f(1)").a(new A.dG(this)),q),q.h("c.E"))
return s},
R(a){var s
if(a.ax==null){s=this.x.i(0,a.a)
if(s==null)s=a.d}else s=a.ga8()
return s},
I(a){var s,r=this.C(a).length,q=this.gcl().i(0,a)
if(q==null)q=0
s=this.at.q(0,a)?1:0
return r+q+s},
ae(c9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1=this,c2="monthSeconds",c3="supplySafety",c4="supplySeconds",c5="battleBudget",c6=c1.b,c7=c6.b,c8=c7.i(0,c2)
c8.toString
s=c7.i(0,c3)
s.toString
r=c8+s
c8=c1.ay
s=A.v(c8,t.gf)
for(q=c1.a,p=q.e,o=A.j(p),n=o.h("f(1)"),m=n.a(new A.dw(c1)),l=B.a.gu(p),m=new A.J(l,m,o.h("J<1>")),k=c1.y,j=c1.c,o=o.h("e<1>"),c6=c6.r,i=c6.r,h=q.b/60,g=c6.d;m.j();){c6=l.gl()
f=k.i(0,c6.a)
e=c6.as
d=e===B.q
if(d&&f==null){c=c7.i(0,"campRate")
c.toString}else c=1
b=c7.i(0,c4)
b.toString
e=e===B.z
if(e&&c6.p2.length!==0){a=c6.z
if(c6.k1!=null){d=c7.i(0,c5)
d.toString
a0=d}else a0=0
for(d=c6.p2,a1=d.length,a2=0;a2<d.length;d.length===a1||(0,A.u)(d),++a2,a=a3){a3=d[a2]
a0+=j.a9(a,a3)}}else{a1=f!=null
if(a1&&f.z){a=c6.z
for(d=J.iv(f.f,f.r),a1=d.$ti,d=new A.w(d,d.gm(0),a1.h("w<k.E>")),a1=a1.h("k.E"),a0=g;d.j();a=a5){a4=d.d
a5=a4==null?a1.a(a4):a4
a0+=j.a9(a,a5)}}else{a4=c6.cx
if(a4!=null){a6=q.O(a4)
a6=a6==null?null:a6.b
a6=a6===c6.b&&c6.CW!=null}else a6=!1
if(a6){d=c6.z
a1=c6.CW
a1.toString
a0=j.a9(d,a1)+g}else if(a1&&!f.z){d=f.x
a1=f.y
a4=c7.i(0,c4)
a4.toString
a0=Math.max(0,d/60-i+a1*a4-h)
d=c6.CW
if(d!=null)a0=Math.max(a0,j.a9(c6.z,d))}else{a1=c6.CW
if(a1!=null&&!d){a7=j.a9(c6.z,a1)
a8=q.O(a4)
a0=Math.max(r,a7)
if(a8!=null&&a8.b!==c6.b){a9=new A.e(p,n.a(new A.dx(c6,a8)),o).gm(0)
d=a8.ax
if(d==null)d=a8.d
else{a1=a8.ay
a4=a8.db?1:0
a4=B.c.A(d-a1-a4,0,5)
d=a4}b0=Math.max(1,Math.min(d,q.C(a8.a).length))
d=c7.i(0,c5)
d.toString
a1=c7.i(0,c3)
a1.toString
a0=a7+b0*(1+a9)*d+a1}}else a0=r}}}if(!isFinite(a0))a0=600
r=Math.max(r,a0)
b1=f==null&&c6.cx==null&&!e
c6=c6.ch
e=b1?1/0:a0
B.a.k(s,new A.aO(c6,c/b,e))}for(c6=c8.length,a2=0;a2<c6;++a2)r=Math.max(r,c8[a2].c)
r=Math.min(600,r)
c6=t.S
b2=new A.e(p,n.a(new A.dy(c1)),o).H(0,c1.r,new A.dz(),c6)
o=q.gU()
n=o.$ti
b3=new A.e(o,n.h("f(c.E)").a(new A.dA(c1)),n.h("e<c.E>")).H(0,0,new A.dB(c1),c6)
b4=A.ka([r],t.i)
b5=A.b([],t.n)
b6=q.c
c8=r+1e-9
b7=b6
while(b7<=c8){b4.k(0,b7)
B.a.k(b5,b7)
q=c7.i(0,c2)
q.toString
b7+=q}for(c8=A.hu(b4,b4.r,b4.$ti.c),q=b2-b3,p=c8.$ti.c,b8=0;c8.j();){o=c8.d
if(o==null)o=p.a(o)
b9=B.a.H(s,0,new A.dC(o),c6)
if(o+1e-9<b6)c0=0
else{n=c7.i(0,c2)
n.toString
c0=1+B.b.V((o-b6)/n)}if(B.a.N(b5,new A.dD(o)))b8=Math.max(b8,b9+Math.max(0,c0-1)*q)
b8=Math.max(b8,b9+c0*q)}c6=Math.max(0,b8)
if(c9)c7=0
else{c7=c7.i(0,"emergencyGold")
c7.toString
c7=B.b.p(c7)}return new A.e3(c6+c7)},
S(){return this.ae(!1)},
aG(a,b){var s,r,q,p,o,n,m,l,k,j=this,i="capacityPerLevel"
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
if(!(l>=0))return A.l(o,l)
m=B.c.A(o[l]-b.x,0,99999)}if(m==null||j.d<m)return!1
if(a.b===a.c)k=1
else{o=p.b.i(0,"foreignYield")
o.toString
k=o}o=j.f
n=q+1
p=p.b
l=p.i(0,i)
l.toString
l=B.b.V(n*B.b.p(l)*k)
p=p.i(0,i)
p.toString
j.f=o+(l-B.b.V(q*B.b.p(p)*k))
j.d=j.d-m
s.t(0,r,n)
return!0},
bD(a){var s,r,q,p,o,n=this
if(!a.dy||a.e===2||n.z.q(0,a.a))return!1
s=a.a
n.z.k(0,s)
n.y.ad(0,s)
n.as.k(0,s)
s=n.d
r=a.e===1?"advancedDismissal":"normalDismissal"
q=n.b.b
r=q.i(0,r)
r.toString
n.d=s+(B.b.p(r)+a.x)
r=n.f
q=q.i(0,"capacityPerHero")
q.toString
q=Math.max(0,r-B.b.p(q))
n.f=q
r=n.e
s=a.as
p=s!==B.h
n.e=Math.min(q,r+(!p||s===B.e?a.gP():0))
if(!p||s===B.e)for(s=a.ax,r=s.length,q=n.w,o=0;o<r;++o)q.aj(s[o],new A.dE(),new A.dF())
return!0},
aC(a){var s,r=this,q=r.b.b.i(0,"soldierCost")
q.toString
s=a*B.b.p(q)
if(a<0||r.e+a>r.f||r.d<s)return!1
r.d-=s
r.e+=a
return!0},
by(a){var s=this,r=s.b.f.i(0,a)
if(r==null||!r.f||s.a.gU().gm(0)<r.e||s.d<r.b)return!1
s.d=s.d-r.b
s.w.aj(a,new A.du(),new A.dv())
return!0},
b1(a){var s,r,q,p,o,n,m=this,l=m.b.b,k=l.i(0,"recruitBase")
k.toString
k=B.b.p(k)
s=a.a
r=m.x.i(0,s)
r.toString
q=l.i(0,"recruitStep")
q.toString
q=B.b.p(q)
p=l.i(0,"drawCost")
p.toString
p=B.b.p(p)
o=l.i(0,"signingFee")
o.toString
n=p+B.b.p(o)
if(a.as){p=m.at
k=p.q(0,s)||m.a.r<=p.a||m.I(s)>=k+(r-1)*q||m.d<n}else k=!0
if(k)return!1
m.d-=n
m.r=m.r+m.a.w
k=m.f
l=l.i(0,"capacityPerHero")
l.toString
m.f=k+B.b.p(l)
m.at.k(0,s)
return!0},
cv(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(b)
if(a.db){s=a.a
s=l.as.q(0,s)||l.z.q(0,s)||l.d<=0}else s=!0
if(s)return!1
s=l.w
r=t.S
q=A.iI(s,r,r)
r=b.length
p=l.b.b
o=p.i(0,"carryLimit")
o.toString
if(r>B.b.p(o))return!1
for(r=b.length,n=0;n<b.length;b.length===r||(0,A.u)(b),++n){m=b[n]
o=q.i(0,m)
if((o==null?0:o)===0)return!1
o=q.i(0,m)
o.toString
q.t(0,m,o-1)}s.an(0)
s.B(0,q)
s=l.e
r=p.i(0,"soldierLimit")
r.toString
l.e=s-Math.min(s,B.b.p(r)-a.gP())
r=a.a
l.Q.k(0,r)
l.as.k(0,r)
l.y.t(0,r,c)
p=p.i(0,"supplySeconds")
p.toString
B.a.k(l.ay,new A.aO(a.ch,1/p,d))
return!0},
cK(a,b){var s,r=this
if(!a.dx||r.as.q(0,a.a)||r.d<=0||a.fy)return!1
s=a.a
r.as.k(0,s)
r.y.t(0,s,b)
return!0}}
A.ds.prototype={
$1(a){return A.d(a)+1},
$S:5}
A.dt.prototype={
$0(){return 1},
$S:4}
A.dG.prototype={
$1(a){var s=this.a,r=t.r.a(a).a
return!s.z.q(0,r)&&!s.Q.q(0,r)},
$S:0}
A.dw.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
if(a.b===s.a.a){r=a.as
s=!(r===B.h||r===B.e)&&!a.fy&&!s.z.q(0,a.a)}else s=!1
return s},
$S:0}
A.dx.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=!1
if(a.a!==s.a)if(a.b===s.b){q=this.b
if(a.cx===q.a){r=q.f
r=a.z.J(r)<s.z.J(r)
s=r}else s=r}else s=r
else s=r
return s},
$S:0}
A.dy.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.q(0,a.a)},
$S:0}
A.dz.prototype={
$2(a,b){return A.d(a)+t.r.a(b).y},
$S:30}
A.dA.prototype={
$1(a){return!this.a.ax.q(0,t.q.a(a).a)},
$S:2}
A.dB.prototype={
$2(a,b){var s,r,q,p
A.d(a)
t.q.a(b)
s=this.a
r=s.x.i(0,b.a)
r.toString
s=s.b.b
q=s.i(0,"incomeStep")
q.toString
q=B.b.p(q)
p=s.i(0,"poorPenalty")
p.toString
p=B.b.p(p)
if(b.b===b.c)s=1
else{s=s.i(0,"foreignYield")
s.toString}return a+B.b.V((b.Q+(r-1)*q-p)*s)},
$S:10}
A.dC.prototype={
$2(a,b){A.d(a)
t.gf.a(b)
return a+B.b.V(b.a+b.b*Math.min(this.a,b.c)+1e-9)},
$S:29}
A.dD.prototype={
$1(a){return Math.abs(A.at(a)-this.a)<1e-7},
$S:11}
A.dE.prototype={
$1(a){return A.d(a)+1},
$S:5}
A.dF.prototype={
$0(){return 1},
$S:4}
A.du.prototype={
$1(a){return A.d(a)+1},
$S:5}
A.dv.prototype={
$0(){return 1},
$S:4}
A.aX.prototype={
az(){return"CombatAdvantage."+this.b}}
A.by.prototype={}
A.e5.prototype={
af(b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=this,b3="soldierHp"
t.eg.a(c0)
s=c0==null?b4.ax:c0
r=b5.ax
q=c3==null
p=q?b4.gP():c3
o=b9==null
n=o?b5.gP():b9
m=b4.f
l=b4.at
k=b5.f
j=b5.at
i=b4.a+":"+A.r(m)+":"+b4.w+":"+A.r(l)+":"+A.r(b4.ay)+":"+b5.a+":"+A.r(k)+":"+b5.w+":"+A.r(j)+":"+A.r(b5.ay)+":"+c1+":"+b6+":"+c4+":"+p+":"+n+":"+A.r(s)+":"+A.r(r)+":"+b8+":"+c2+":"+b7
h=b2.c
g=h.i(0,i)
if(g!=null)return g
if(!b2.b.cm())return B.a2
if(q)q=B.a.H(l,0,new A.e6(),t.H)
else{q=b2.a.b.i(0,b3)
q.toString
q=p*B.b.p(q)}f=m+q
if(o)q=B.a.H(j,0,new A.e7(),t.H)
else{q=b2.a.b.i(0,b3)
q.toString
q=n*B.b.p(q)}e=k+q
q=c1===0
d=b2.bu(s,q&&m>0,c2)
c=b6===0
b=b2.bu(r,c&&k>0,b7)
c=q&&c
a=b2.bm(b4,p,c1,c4,c)
a0=b2.bm(b5,n,b6,c4,c)
q=d.a
o=q[0]
a1=o>=e&&b.a[0]>=f||q[2]>=f
m=b.a
l=m[0]
a2=Math.max(0,f-l-q[2])
k=q[1]
a3=Math.max(0,e-k-m[3]-b8)
a4=Math.max(0,f-m[1]-q[3])
a5=Math.max(0,e-o-m[2]-b8)
a6=Math.max(1,f*a+e*a0)
a7=(a2*a*0.9-a3*a0*1.1)/a6
a8=(a4*a*1.1-a5*a0*0.9)/a6
a9=b2.a.r.CW
if(a1)b0=B.H
else if(a7>a9)b0=B.f
else{q=a8<-a9?B.t:B.a1
b0=q}q=A.b([],t.s)
if(c1>0||b6>0)q.push("\u57ce\u9632\u4ec5\u4fee\u6b63\u653b\u51fb\uff0c\u5b88\u65b9\u6b66\u5668\u8d21\u732e\u4e3a\u96f6")
if(s.length>1)q.push("\u540e\u7eed\u6b66\u5668\u4f9d\u8d56\u78b0\u649e\u548c\u6982\u7387\uff0c\u4e0b\u9650\u4e0d\u8ba1\u5fc5\u8fbe")
if(a1)q.push("\u5b58\u5728\u5148\u624b\u81f4\u547d\u6216\u81ea\u4f24\u98ce\u9669")
q.push("\u4f59\u91cf\u4e3a\u9759\u6001\u98ce\u9669\u6307\u6807\uff0c\u5e76\u975e\u80dc\u7387")
b1=new A.by(b0,a7,a8,k,l,a1)
if(h.a>=256)h.ad(0,new A.ac(h,A.q(h).h("ac<1>")).gG(0))
h.t(0,i,b1)
return b1},
cq(a,b,c,d,e,f){return this.af(a,b,c,!0,0,d,e,0,!0,f,0)},
cs(a,b,c,d,e,f,g,h){return this.af(a,b,c,d,0,e,f,0,g,h,0)},
bA(a,b,c,d){return this.af(a,b,0,!0,0,null,null,c,!0,d,0)},
aX(a,b,c,d,e,f){return this.af(a,b,0,c,0,null,null,d,e,f,0)},
co(a,b,c,d,e){return this.af(a,b,0,c,0,null,null,0,d,null,e)},
cr(a,b,c,d,e,f,g){return this.af(a,b,0,c,0,null,d,0,e,f,g)},
cp(a,b,c,d,e){return this.af(a,b,0,!0,c,null,null,d,!0,e,0)},
bm(a,b,c,d,e){var s,r,q,p,o=this.a
if(e){s=o.e
if(!(d<s.length))return A.l(s,d)
s=s[d]}else s=1
s=B.c.A(B.b.V(a.w*s),0,63)
if(c>0){r=o.b
q=r.i(0,"defenseBase")
q.toString
q=B.b.p(q)
r=r.i(0,"defenseStep")
r.toString
r=q+(c-1)*B.b.p(r)}else r=0
p=B.c.A(s+r,0,63)
o=o.b.i(0,"soldierPower")
o.toString
return(B.c.ci(p+b*B.b.p(o)+2,4)+1)*1.5*(1+B.b.A(a.ay/630,0,0.1))},
bu(a,b,c){var s,r,q,p,o,n,m,l,k,j
t.L.a(a)
if(!b)return new A.bn([0,0,0,0])
s=this.a
r=s.b
s=s.f
q=0
p=0
o=0
n=0
m=0
for(;;){l=a.length
k=r.i(0,"carryLimit")
k.toString
if(!(m<Math.min(l,B.b.p(k))))break
A:{if(!(m<a.length))return A.l(a,m)
j=s.i(0,a[m])
if(j==null)break A
l=m===0
if(l&&c){q+=j.c
o+=j.d}if(!(l&&c)){l=r.i(0,"weaponChance")
l.toString
l=l>0}else l=!0
if(l){p+=j.c
n+=j.d}}++m}return new A.bn([p,q,n,o])}}
A.e6.prototype={
$2(a,b){return A.t(a)+A.at(b)},
$S:12}
A.e7.prototype={
$2(a,b){return A.t(a)+A.at(b)},
$S:12}
A.hN.prototype={
$2(a,b){var s
A.t(a)
s=this.a.f.i(0,A.d(b))
s=s==null?null:s.c
if(s==null)s=0
return a+s*this.b.w},
$S:35}
A.cw.prototype={
D(){var s=this
return A.O(["interval",s.a,"resourceInterval",s.e,"cashBuffer",s.f,"threat",s.b,"urgent",s.c,"margin",s.d,"commit",s.r,"rearExtra",s.x,"candidates",s.y,"assessments",s.z,"routes",s.Q,"plans",s.as,"commands",s.at,"team",s.ax,"targets",s.ay,"slice",s.ch,"advantage",s.CW,"expansion",s.cy,"credit",s.cx,"age",s.w,"timeout",s.db,"restarts",s.dx,"stagnation",s.dy],t.N,t.X)}}
A.am.prototype={}
A.e9.prototype={
b8(){return new A.an(this.bV(),t.gL)},
bV(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1
return function $async$b8(i2,i3,i4){if(i3===1){p.push(i4)
r=q}for(;;)switch(r){case 0:h9={}
i0=s.c
i1=s.a
if(i0.b!==i1.a||i0.c!==s.b.a)throw A.h(B.a7)
o=i0.y
n=o.d
if(n.length>64||o.e.length>256||o.f.length>32)throw A.h(B.a8)
m=s.e
m===$&&A.aG()
l=s.f
l===$&&A.aG()
k=new A.h1(o,i1,m,l)
j=o.gU(),i=J.G(j.a),j=new A.J(i,j.b,j.$ti.h("J<1>")),h=s.x
case 3:if(!j.j()){r=4
break}g=i.gl()
h.t(0,g.a,k.cL(g))
r=5
return i2.b=0,1
case 5:r=3
break
case 4:j=i0.z
i=A.j(j)
g=i.h("e<1>")
j=A.v(new A.e(j,i.h("f(1)").a(new A.ei(s)),g),g.h("c.E"))
f=A.ix(o,i1,m,j)
h9.a=f
j=i0.x
r=j===B.B?6:7
break
case 6:o=s.r
o===$&&A.aG()
s.w=new A.fK(i0,i1,o,l,h).cI(f)
r=8
return i2.b=1,1
case 8:r=1
break
case 7:i=t.Z
e=A.b([],i)
g=t.s
d=A.b([],g)
c=s.d
b=s.r
b===$&&A.aG()
a=new A.eJ(i0,i1,c,l,b,h)
a0=A.q(h).h("ad<2>")
a1=a0.h("e<c.E>")
a2=A.v(new A.e(new A.ad(h,a0),a0.h("f(c.E)").a(new A.ej()),a1),a1.h("c.E"))
B.a.F(a2,new A.ek())
a0=t.bQ
a3=A.b([new A.am(h9.a,A.b([],i),A.b([],g),0,0)],a0)
g=j===B.k
a1=g?A.b([],t.bL):a2
a4=a1.length
a5=t.N
a6=t.S
a7=i1.r
a8=a7.at
a9=t.I
b0=t.dp
b1=t.aQ
b2=a7.as
b3=0
case 9:if(!(b3<a1.length)){r=11
break}b4=a1[b3]
b5=A.b([],a0)
b6=a3.length,b7=0
case 12:if(!(b7<a3.length)){r=14
break}b8=a3[b7]
b9=a.bz(b4,b8.a),c0=b9.$ti,b9=new A.aD(b9.a(),c0.h("aD<1>")),c1=b8.d,c2=b8.e,c3=b8.c,c4=b8.b,c0=c0.c
case 15:if(!b9.j()){r=16
break}c5=b9.b
if(c5==null)c5=c0.a(c5)
c6=A.v(c4,a9)
B.a.B(c6,c5.b)
if(B.a.H(c6,0,new A.ev(),a6)>a8){c.e=!0
r=15
break}c7=c5.a
c8=A.v(c3,a5)
c9=c5.e
if(c9.length!==0)c8.push(c9)
c9=c5.c
c5=c5.d?1:0
B.a.k(b5,new A.am(c7,c6,c8,c1+c9,c2+c5))
r=17
return i2.b=1,1
case 17:r=15
break
case 16:case 13:a3.length===b6||(0,A.u)(a3),++b7
r=12
break
case 14:if(b5.length!==0){B.a.F(b5,new A.eC())
b6=A.d(Math.min(4,b2))
b9=new A.I(b5,0,b6,b1)
b9.a3(b5,0,b6,b0)
a3=b9.a7(0)}case 10:a1.length===a4||(0,A.u)(a1),++b3
r=9
break
case 11:if(a2.length!==0&&!g){d0=B.a.gG(a3)
h9.a=d0.a
B.a.B(e,d0.b)
B.a.B(d,d0.c)
a0=d0.e
if(a0>0){a0=""+a0
B.a.k(d,c.e?"\u89c4\u5212\u914d\u989d\u5df2\u7528\u5c3d\uff1a"+a0+" \u5ea7\u57ce\u5c1a\u672a\u627e\u5230\u5b8c\u6574\u65b9\u6848\uff0c\u4e0d\u80fd\u636e\u6b64\u65ad\u5b9a\u65e0\u6cd5\u633d\u6551":"unsalvageableDefense\uff1a"+a0+" \u5ea7\u57ce\u5728\u5f53\u524d\u9501\u5b9a\u3001\u8d44\u91d1\u6216\u65f6\u9650\u4e0b\u672a\u627e\u5230\u5b8c\u6574\u4fee\u590d\u65b9\u6848")}d1="defending"}else d1="preparing"
if(a2.length!==0)d1="defending"
r=18
return i2.b=2,1
case 18:for(a0=o.e,a1=A.j(a0),a4=a1.h("f(1)"),a9=a4.a(new A.eD(s)),a1=a1.h("e<1>"),b0=a1.h("f(c.E)").a(new A.eE(s)),a9=new A.e(a0,a9,a1).gu(0),b0=new A.J(a9,b0,a1.h("J<c.E>")),b1=t.w,b2=t.e,b6=t.Y,b9=i1.b;b0.j();){c0=a9.gl()
if(c0.e!==1||c0.f>=c0.r*0.25||c0.k2<2||c0.k3<=0||B.a.N(c0.ax,new A.eF(s)))continue
d2=o.ac(c0.k1)
if(d2!=null){c1=c0.gaD()
c2=c0.k3
c3=d2.gaD()
c4=Math.max(1,c0.k4)
c5=b9.i(0,"retreatSurvivalRatio")
c5.toString
c5=c1/c2>=c3/c4*c5
c1=c5}else c1=!0
if(c1)continue
c1=h9.a
c2=c0.a
if(c1.as.q(0,c2))continue
h9.a.as.k(0,c2)
c1=A.b([new A.z(B.N,c2,null,null,0,B.d)],b1)
c2=A.b([c0,d2],b2)
c0=o.O(c0.c)
c0.toString
B.a.k(e,new A.L("\u9ad8\u7ea7\u5c06\u9886\u751f\u547d\u4f4e\u4e8e\u56db\u5206\u4e4b\u4e00\uff0c\u5df2\u53d1\u751f\u7684\u4f24\u5bb3\u663e\u793a\u80dc\u671b\u6e3a\u832b\uff0c\u7533\u8bf7\u6709\u98ce\u9669\u7684\u5408\u6cd5\u64a4\u9000",c1,b.a5(c2,A.b([c0],b6)),B.n,0,!0))}r=19
return i2.b=3,1
case 19:a9=a1.h("c.E")
d3=A.v(new A.e(a0,a4.a(new A.eG(h9,s)),a1),a9)
b0=d3.length,c0=o.b,b3=0
case 20:if(!(b3<d3.length)){r=22
break}d4=d3[b3]
d5=h9.a.y.i(0,d4.a)
c1=h9.a
d6=c1.d<c1.S().a
c1=d5==null
if((c1?null:d5.z)===!0){c2=c1?null:d5.d
c2=d4.cx==c2&&!d6}else c2=!1
if(c2){r=21
break}if((c1?null:d5.b)==="intercept")if(o.ac(c1?null:d5.e)!=null){c2=h.i(0,c1?null:d5.d)
if(c2==null)c2=null
else c2=c2.d.length!==0||c2.a.ax!=null
c2=c2!==!0
d7=c2}else d7=!0
else d7=!1
if(d7&&!d6&&d5.x>c0&&d4.f>=d4.r*0.65){r=21
break}d8=!c1&&d5.w<c0
if(!d6&&!d7&&!d8&&d4.f>=d4.r*0.65&&d4.as!==B.q){r=21
break}d9=h.i(0,d4.c)
c1=o.gU()
c2=c1.$ti
c3=c2.h("e<c.E>")
e0=A.v(new A.e(c1,c2.h("f(c.E)").a(new A.eH(h9,s)),c3),c3.h("c.E"))
B.a.F(e0,new A.eI(d4))
c1=A.j(e0)
c2=c1.h("I<1>")
c3=new A.I(e0,0,3,c2)
c3.a3(e0,0,3,c1.c)
c3=new A.w(c3,c3.gm(0),c2.h("w<k.E>"))
c1=d9==null
c2=c2.h("k.E")
while(c3.j()){c4=c3.d
if(c4==null)c4=c2.a(c4)
if(!c.Y())break
e1=m.ai(d4,c4.f,o,!0,c4)
c5=h9.a
c6=h.i(0,c4.a)
if(c6==null)c6=null
else c6=c6.d.length!==0||c6.a.ax!=null
c7=d6?"\u56de\u5b89\u5168\u53cb\u57ce\u7f29\u51cf\u7cae\u8349\u652f\u51fa\uff0c\u4fdd\u7559\u5176\u4ed6\u6709\u6548\u8fdc\u5f81":"\u7ed3\u675f\u65e7\u622a\u51fb\u6216\u6574\u5907\u6b8b\u8840\u90e8\u961f\uff0c\u8fdb\u57ce\u8865\u7ed9\u540e\u91cd\u8bc4\u4f30\u76ee\u6807"
if(c1)c8=null
else c8=d9.d.length!==0||d9.a.ax!=null
c8=c8===!0?d9.ga4():1/0
e2=b.bR(c5,d4,e1,!0,c8,!0,c6!==!0,c7,"regroup",c4)
if(e2!=null){h9.a=e2.a
B.a.k(e,e2.b)
break}}r=23
return i2.b=4,1
case 23:case 21:d3.length===b0||(0,A.u)(d3),++b3
r=20
break
case 22:e3=A.v(new A.e(a0,a4.a(new A.el(h9,s)),a1),a9)
B.a.F(e3,new A.em(s))
e4=A.Y(a6,a6)
for(a0=h9.a.y,a1=A.q(a0).h("ad<2>"),a4=a1.h("f(c.E)").a(new A.en()),a0=new A.ad(a0,a1).gu(0),a1=new A.J(a0,a4,a1.h("J<c.E>"));a1.j();){a4=a0.gl().d
a4.toString
e4.aj(a4,new A.eo(),new A.ep())}if(B.a.gG(a3).e===0)e5=!g||B.a.bG(a2,new A.eq())
else e5=!1
g=e3.length,a0=i0.w>a7.dy/a7.a,a1=a7.ax,i0=i0.f,a4=a7.cx,a7=a7.ay,a9=A.j(n),b0=a9.h("f(1)"),a9=a9.h("e<1>"),c0=a9.h("c.E"),e6=null,e7=0,e8=1,e9=!1,b3=0
case 24:if(!(b3<e3.length)){r=26
break}d4=e3[b3]
f0={}
if(e5){c1=d4.a
c1=h9.a.as.q(0,c1)||h9.a.z.q(0,c1)}else c1=!0
if(c1){r=25
break}f1=o.O(d4.c)
c1=f1.a
b4=h.i(0,c1)
c2=b4==null
if(c2)c3=null
else c3=b4.d.length!==0||b4.a.ax!=null
if(c3===!0){if(c2)c3=null
else{c3=b4.f
c3=c3==null?null:c3.a}c3=c3!==B.f}else c3=!1
if(c3){r=25
break}if(c2)c3=null
else c3=b4.d.length!==0||b4.a.ax!=null
c4=f1.e
if(c3===!0){c3=h9.a
c5=f1.ax
if(c5==null){c3=c3.x.i(0,c1)
if(c3==null)c3=f1.d}else{c3=f1.ay
c6=f1.db?1:0
c6=B.c.A(c5-c3-c6,0,5)
c3=c6}c3=Math.min(c4,c3)}else c3=c4
f2=Math.max(1,c3)
if(h9.a.C(c1).length<=f2){r=25
break}if(c2)c1=null
else c1=b4.d.length!==0||b4.a.ax!=null
if(c1===!0&&!s.bp(f1,d4,h9.a)){r=25
break}f3=A.v(new A.e(n,b0.a(new A.er(s,e4)),a9),c0)
B.a.F(f3,new A.es(s,d4))
f0.a=null
c1=A.j(f3)
c2=c1.h("I<1>")
c3=new A.I(f3,0,a7,c2)
c3.a3(f3,0,a7,c1.c)
c3=new A.w(c3,c3.gm(0),c2.h("w<k.E>"))
c2=c2.h("k.E")
f4=null
f5=-1/0
case 27:if(!c3.j()){r=28
break}c1=c3.d
f6=c1==null?c2.a(c1):c1
if(!c.Y()){r=28
break}f7=f6.a
c1=o.C(f7)
c4=A.j(c1).h("U<1>")
c1=new A.U(c1,c4)
c5=f6.ax
if(c5==null)c5=f6.d
else{c6=f6.ay
c7=f6.db?1:0
c7=B.c.A(c5-c6-c7,0,5)
c5=c7}c6=new A.I(c1,0,c5,c4.h("I<k.E>"))
c6.a3(c1,0,c5,c4.h("k.E"))
f8=c6.a7(0)
f9=Math.max(1,Math.min(a1,B.b.aW(f8.length/2)))
c1=e4.i(0,f7)
if((c1==null?0:c1)>=f9){r=27
break}e1=m.b3(d4,f6.f,o,f6)
if(!e1.d){r=27
break}g0=b.aF(d4,h9.a)
for(c1=g0.length,g1=!1,b7=0;b7<g0.length;g0.length===c1||(0,A.u)(g0),++b7){g2=g0[b7]
g3=A.ik(d4,f6,o,i1,l,g2,a0&&h9.a.d>100?0.05:0)
g4=g3.a
g5=g3.b
g1=g5>0
if(!g1)continue
e8=Math.max(e8,g5)
c4=h9.a
c5=e4.i(0,f7)
e2=s.bn(c4,d4,f6,g2,g5,c5==null?0:c5)
if(e2==null){g6=h9.a.K()
g6.d=1e6
c4=e4.i(0,f7)
g7=s.bn(g6,d4,f6,g2,g5,c4==null?0:c4)
if(g7!=null){if(a2.length===0)d1="saving"
c4=g6.d
c5=g7.a
g8=c4-c5.d+c5.S().a
e7=e7===0?g8:Math.min(e7,g8)
if(e6==null)e6=f7}else if(a2.length===0)d1="preparing"
continue}c1=A.dm(f6,d4,o,i1,i0)
c4=h9.a.d
c5=e2.a.d
c6=B.a.aI(g2,1).H(0,0,new A.et(s),a6)
c7=b9.i(0,"weaponChance")
c7.toString
g9=c1-e1.b*0.4-(c4-c5)*0.5+g4*30+c6*a4*c7*0.02
if(g9>f5){f0.a=e2
e8=e2.b.d.length
f5=g9
f4=f6}break}if(!g1&&e6==null){e8=Math.max(1,Math.min(a1,f8.length))
e6=f7}r=29
return i2.b=5,1
case 29:r=27
break
case 28:c1=f0.a
if(c1!=null){c1=B.a.H(e,0,new A.eu(),a6)
c2=f0.a
c1=c1+c2.b.b.length<=a8}else{c2=c1
c1=!1}if(c1){h9.a=c2.a
B.a.k(e,c2.b)
e6=f4.a
e4.aj(e6,new A.ew(f0),new A.ex(f0))
e9=!0}r=30
return i2.b=6,1
case 30:case 25:e3.length===g||(0,A.u)(e3),++b3
r=24
break
case 26:r=j===B.A&&!e9&&B.a.H(e,0,new A.ey(),a6)<a8-3?31:32
break
case 31:i0=o.gU(),i1=J.G(i0.a),i0=new A.J(i1,i0.b,i0.$ti.h("J<1>"))
case 33:if(!i0.j()){r=34
break}o=i1.gl()
m=o.a
l=h.i(0,m)
if(l==null)l=null
else l=l.d.length!==0||l.a.ax!=null
if(l===!0){r=33
break}if(!c.Y()){r=34
break}h0=h9.a.C(m)
b5=h9.a.K()
l=A.j(h0)
j=l.h("e<1>")
h1=A.v(new A.e(h0,l.h("f(1)").a(new A.ez(h9)),j),j.h("c.E"))
B.a.F(h1,new A.eA())
h2=B.a.N(n,new A.eB(s))&&h0.length<Math.max(1,o.e)+e8
if(h1.length!==0){l=h0.length
j=h9.a
g=o.ax
if(g==null){j=j.x.i(0,m)
if(j==null)j=o.d}else{j=o.ay
a1=o.db?1:0
a1=B.c.A(g-j-a1,0,5)
j=a1}if(l<j)l=h2&&h0.length>=o.z
else l=!0}else l=!1
if(l)if(b5.aG(o,B.a.gG(h1))&&b5.d>=b5.S().a){h9.a=b5
B.a.k(e,new A.L("\u5148\u6269\u5145\u5b89\u5168\u8fce\u6218\u540d\u989d\u548c\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u8003\u8651\u62db\u5c06\u4e0e\u8fdc\u5f81",A.b([new A.z(B.o,B.a.gG(h1).a,m,null,0,B.d)],b1),b.a5(A.b([B.a.gG(h1)],b2),A.b([o],b6)),B.n,b5.S().a,!1))
r=34
break}if(h2){l=h0.length
j=h9.a
g=o.ax
if(g==null){j=j.x.i(0,m)
if(j==null)j=o.d}else{j=o.ay
a1=o.db?1:0
a1=B.c.A(g-j-a1,0,5)
j=a1}l=l<j&&b5.b1(o)&&b5.d>=b5.S().a}else l=!1
if(l){h9.a=b5
B.a.k(e,new A.L("\u4e3a\u7559\u5b88\u4e0e\u8fdc\u5f81\u7684\u771f\u5b9e\u7f3a\u53e3\u62bd\u53d6\u82f1\u96c4\uff0c\u9884\u7559\u6700\u9ad8\u624b\u7eed\u8d39\u548c\u6708\u4ff8",A.b([new A.z(B.u,null,m,null,0,B.d)],b1),b.a5(A.b([],b2),A.b([o],b6)),B.n,b5.S().a,!1))
r=34
break}l=h9.a.f
j=h0.length
g=b9.i(0,"soldierLimit")
g.toString
g=Math.min(l,j*B.b.p(g))
j=h9.a
h3=g-j.e
if(h3>0){h4=j.K()
l=b9.i(0,"soldierBatch")
l.toString
h5=Math.min(B.b.p(l),h3)
if(h4.aC(h5)&&h4.d>=h4.S().a){h9.a=h4
B.a.k(e,new A.L("\u8865\u5145\u8fd1\u671f\u5b88\u57ce\u548c\u51fa\u5f81\u6240\u9700\u5175\u5458\uff0c\u4e0d\u586b\u6ee1\u6ca1\u6709\u4efb\u52a1\u7684\u5168\u56fd\u5bb9\u91cf",A.b([new A.z(B.p,null,m,null,h5,B.d)],b1),b.a5(A.b([],b2),A.b([o],b6)),B.n,h4.S().a,!1))
r=34
break}}r=35
return i2.b=7,1
case 35:r=33
break
case 34:case 32:if(e9)d1=a2.length===0?"attacking":"defending"
if(e.length===0){i0=h9.a
B.a.k(d,i0.d<i0.S().a?"\u8d44\u91d1\u4e0d\u8db3\u4ee5\u8986\u76d6\u73b0\u6709\u90e8\u961f\u548c\u6b20\u6536\u6708\u4ff8\uff0c\u7b49\u5f85\u6574\u5907":"\u6ca1\u6709\u6ee1\u8db3\u5b88\u57ce\u3001\u65f6\u9650\u53ca\u9759\u6001\u98ce\u9669\u7ea6\u675f\u7684\u65b0\u589e\u884c\u52a8\uff0c\u4fdd\u6301\u5df2\u6709\u4efb\u52a1")}if(a0)B.a.k(d,"\u505c\u6ede\u8bca\u65ad\uff1a"+(d1==="saving"?"\u7f3a\u5c11\u6574\u961f\u540e\u52e4\u8d44\u91d1":"\u7f3a\u5c11\u53ef\u5b89\u5168\u6267\u884c\u7684\u6269\u5f20\u6761\u4ef6")+"\uff0c\u4e0d\u901a\u8fc7\u65e0\u9650\u62db\u52df\u6216\u81ea\u6740\u51fa\u51fb\u6253\u7834\u7b49\u5f85")
h6=A.b([],i)
for(i0=e.length,h7=0,b3=0;b3<e.length;e.length===i0||(0,A.u)(e),++b3){h8=e[b3]
h7+=h8.b.length
if(h7>a8){c.e=!0
B.a.k(d,"\u547d\u4ee4\u914d\u989d\u5230\u8fbe\uff0c\u53ea\u63d0\u4ea4\u524d\u9762\u5b8c\u6574\u7684\u52a8\u4f5c\u7ec4\uff0c\u540e\u7eed\u7559\u5f85\u4e0b\u4e00\u6b21\u89c4\u5212")
break}B.a.k(h6,h8)}s.w=new A.bC(d1,e6,e7,e8,h6,A.a6(d,0,A.Z(12,"count",a6),a5).a7(0),c.e,c.c,c.d,c.b)
case 1:return 0
case 2:return i2.c=p.at(-1),3}}}},
bp(a,b,c){var s,r,q=a.a,p=this.x.i(0,q),o=p==null?null:p.d
if(o==null)o=A.b([],t.D)
if(o.length===0)return!0
q=c.C(q)
p=A.j(q)
s=p.h("e<1>")
q=A.v(new A.e(q,p.h("f(1)").a(new A.eg(b)),s),s.h("c.E"))
p=A.j(q).h("U<1>")
r=A.a6(new A.U(q,p),0,A.Z(c.R(a),"count",t.S),p.h("k.E")).a7(0)
if(r.length===0)return!1
return B.a.bG(o,new A.eh(this,r,c,a))},
bn(b8,b9,c0,c1,c2,c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5=this,b6=null,b7="soldierLimit"
t.L.a(c1)
s=t.e
r=A.b([],s)
for(q=b5.c.y,p=q.gU(),o=J.G(p.a),p=new A.J(o,p.b,p.$ti.h("J<1>")),n=b5.x,m=b9.c;p.j();){l=o.gl()
k=l.a
j=n.i(0,k)
if(j==null)j=b6
else j=j.d.length!==0||j.a.ax!=null
if(j===!0&&k!==m)continue
i=Math.max(1,l.e)
h=Math.max(0,b8.C(k).length-i)
l=b8.C(k)
k=A.j(l)
j=k.h("e<1>")
g=A.v(new A.e(l,k.h("f(1)").a(new A.eb(b8)),j),j.h("c.E"))
B.a.F(g,new A.ec(b5))
l=A.j(g)
k=new A.I(g,0,h,l.h("I<1>"))
k.a3(g,0,h,l.c)
B.a.B(r,k)}if(!B.a.q(r,b9))return b6
B.a.ad(r,b9)
B.a.F(r,new A.ed(b5))
s=A.b([b9],s)
p=t.S
B.a.B(s,A.a6(r,0,A.Z(c2-1,"count",p),t.r))
if(s.length<c2)return b6
f=A.b([],t.w)
e=A.b([],t.m)
o=t.N
d=A.Y(o,o)
o=q.C(c0.a)
m=A.j(o).h("U<1>")
c=A.a6(new A.U(o,m),0,A.Z(c0.ga8(),"count",p),m.h("k.E")).a7(0)
for(p=b5.a,o=p.r.at,p=p.b,m=c2===1,l=c0.f,k=t.x,b=b8,a=0;a<s.length;++a){a0=s[a]
j=a0.c
a1=n.i(0,j)
if(a1==null)a1=b6
else a1=a1.d.length!==0||a1.a.ax!=null
if(a1===!0){a1=q.O(j)
a1.toString
a1=!b5.bp(a1,a0,b)}else a1=!1
if(a1)return b6
a1=b5.e
a1===$&&A.aG()
a2=a1.b3(a0,l,q,c0)
if(a===0)a1=A.b([c1],k)
else{a1=b5.r
a1===$&&A.aG()
a1=a1.aF(a0,b)}a3=a1.length
a4=c3+a
a5=a>0
a6=b6
a7=0
for(;a7<a1.length;a1.length===a3||(0,A.u)(a1),++a7){a8=a1[a7]
if(a5&&B.a.N(c,new A.ee(b5,a0,c0,a8)))continue
for(a9=q.gU(),b0=J.G(a9.a),a9=new A.J(b0,a9.b,a9.$ti.h("J<1>")),b1=0;a9.j();){b2=b0.gl()
b3=b2.a
b4=b.C(b3).length
b2=Math.min(Math.max(0,b4-(b3===j?1:0)),Math.max(1,b2.e))
b4=p.i(0,b7)
b4.toString
b1+=b2*B.b.p(b4)}a9=b5.r
a9===$&&A.aG()
b0=m?"\u9ad8\u7ea7\u6218\u529b\u4f18\u5148\u8fdb\u653b\u53ef\u4f9b\u517b\u7684\u5f31\u57ce":"\u5168\u961f\u5b8c\u6210\u88c5\u5907\u3001\u5175\u5458\u4e0e\u961f\u5217\u7cae\u8349\u51c6\u5907\u540e\u534f\u540c\u8f6e\u653b"
b2=b.f
b3=p.i(0,b7)
b3.toString
a6=a9.b6(b,a0,a2,a8,Math.min(b1,Math.max(0,b2-B.b.p(b3))),a4,b0,"expedition",c0)
if(a6!=null)break}if(a6==null)return b6
b=a6.a
j=a6.b
B.a.B(f,j.b)
B.a.B(e,j.d)
d.B(0,j.c)
if(f.length>o){b5.d.e=!0
return b6}}s=b5.r
s===$&&A.aG()
d.B(0,s.a5(c,A.b([],t.Y)))
s=m?"\u6267\u884c\u9759\u6001\u4f18\u52bf\u660e\u786e\u3001\u53ef\u4ee5\u4f9b\u517b\u7684\u6269\u5f20":"\u6574\u961f\u540e\u52e4\u51c6\u5907\u5b8c\u6210\uff0c\u6309\u771f\u5b9e\u6392\u961f\u89c4\u5219\u8f6e\u653b\uff1b\u4e0d\u9884\u6f14\u672a\u6765\u4f24\u4ea1"
return new A.d1(b,new A.L(s,f,d,e,b.S().a,!1))}}
A.ei.prototype={
$1(a){var s,r,q
t.J.a(a)
s=this.a.c.y
r=s.ac(a.a)
q=!1
if(r!=null)if(r.b===s.a)if(!r.fy)if(r.f>0){s=r.as
s=!(s===B.h||s===B.e)&&r.id===a.Q}else s=q
else s=q
else s=q
else s=q
return s},
$S:7}
A.ej.prototype={
$1(a){t.a.a(a)
return a.d.length!==0||a.a.ax!=null},
$S:20}
A.ek.prototype={
$2(a,b){var s,r=t.a
r.a(a)
r.a(b)
s=B.b.v(a.ga4(),b.ga4())
return s!==0?s:B.b.v(b.r+b.a.w*4,a.r+a.a.w*4)},
$S:44}
A.ev.prototype={
$2(a,b){return A.d(a)+t.I.a(b).b.length},
$S:13}
A.eC.prototype={
$2(a,b){var s,r=t.dp
r.a(a)
r.a(b)
r=a.e
s=b.e
return r!==s?B.c.v(r,s):B.b.v(b.d,a.d)},
$S:53}
A.eD.prototype={
$1(a){t.r.a(a)
return a.b===this.a.c.y.a&&!a.fy&&a.fx},
$S:0}
A.eE.prototype={
$1(a){t.r.a(a)
return this.a.c.x!==B.k},
$S:0}
A.eF.prototype={
$1(a){var s=this.a.a.f.i(0,A.d(a))
return(s==null?null:s.d)===0},
$S:28}
A.eG.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.y.a&&a.dx&&s.x!==B.k&&!a.fy&&!this.a.a.as.q(0,a.a)},
$S:0}
A.eH.prototype={
$1(a){var s,r,q,p,o,n,m=null
t.q.a(a)
s=this.a
r=a.a
q=s.a.I(r)
p=this.b
o=p.x
n=o.i(0,r)
if(n==null)n=m
else n=n.d.length!==0||n.a.ax!=null
s=s.a
if(q<(n===!0?s.R(a):Math.max(s.R(a),a.z+p.a.r.x))){s=o.i(0,r)
if(s==null)s=m
else s=s.d.length!==0||s.a.ax!=null
if(s===!0){s=o.i(0,r)
if(s==null)s=m
else{s=s.f
s=s==null?m:s.a}s=s===B.f}else s=!0}else s=!1
return s},
$S:2}
A.eI.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.v(a.f.J(s),b.f.J(s))},
$S:6}
A.el.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.y.a&&a.db&&s.x!==B.C&&!a.fy&&!this.a.a.z.q(0,a.a)},
$S:0}
A.em.prototype={
$2(a,b){var s,r,q,p="maxLevel",o=t.r
o.a(a)
o.a(b)
o=this.a
s=o.c.y
r=s.O(b.c).d
o=o.a.b
q=o.i(0,p)
q.toString
q=A.aF(b,r<B.b.p(q))
s=s.O(a.c).d
o=o.i(0,p)
o.toString
return B.b.v(q,A.aF(a,s<B.b.p(o)))},
$S:1}
A.en.prototype={
$1(a){t.J.a(a)
return a.b==="expedition"&&a.d!=null},
$S:7}
A.eo.prototype={
$1(a){return A.d(a)+1},
$S:5}
A.ep.prototype={
$0(){return 1},
$S:4}
A.eq.prototype={
$1(a){var s
t.a.a(a)
if(Math.max(0,a.b.length-a.a.ga8())===0){s=a.f
s=(s==null?null:s.a)===B.f}else s=!1
return s},
$S:20}
A.er.prototype={
$1(a){var s,r
t.q.a(a)
s=this.a
if(a.b!==s.c.y.a){r=this.b.i(0,a.a)
if(r==null)r=0
s=r<s.a.r.ax}else s=!1
return s},
$S:2}
A.es.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.a
r=this.b
q=s.c
p=q.y
s=s.a
q=q.f
return B.b.v(A.dm(o.a(b),r,p,s,q),A.dm(a,r,p,s,q))},
$S:6}
A.et.prototype={
$2(a,b){var s,r
A.d(a)
A.d(b)
s=this.a.a.f
r=s.i(0,b)
r=r==null?null:r.c
if(r==null)r=0
s=s.i(0,b)
s=s==null?null:s.d
return a+Math.max(0,r-(s==null?0:s))},
$S:31}
A.eu.prototype={
$2(a,b){return A.d(a)+t.I.a(b).b.length},
$S:13}
A.ew.prototype={
$1(a){return A.d(a)+this.a.a.b.d.length},
$S:5}
A.ex.prototype={
$0(){return this.a.a.b.d.length},
$S:4}
A.ey.prototype={
$2(a,b){return A.d(a)+t.I.a(b).b.length},
$S:13}
A.ez.prototype={
$1(a){t.r.a(a)
return a.fr&&!this.a.a.as.q(0,a.a)},
$S:0}
A.eA.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.v(s.a(b).x,a.x)},
$S:1}
A.eB.prototype={
$1(a){return t.q.a(a).b!==this.a.c.y.a},
$S:2}
A.eg.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.eh.prototype={
$1(a){var s=this
return B.a.N(s.b,new A.ef(s.a,t.O.a(a),s.c,s.d))},
$S:32}
A.ef.prototype={
$1(a){var s,r,q,p,o,n=this,m="soldierLimit"
t.r.a(a)
s=n.a
r=s.f
r===$&&A.aG()
q=n.c
p=q.R(n.d)
s=s.a.b
o=s.i(0,m)
o.toString
o=B.b.p(o)
q=q.e
s=s.i(0,m)
s.toString
return r.bA(a,n.b.a,p,Math.min(o,Math.max(0,q-B.b.p(s)))).a===B.f},
$S:0}
A.eb.prototype={
$1(a){t.r.a(a)
return a.db&&!this.a.as.q(0,a.a)},
$S:0}
A.ec.prototype={
$2(a,b){var s,r,q,p="maxLevel",o=t.r
o.a(a)
o.a(b)
o=this.a
s=o.c.y
r=s.O(b.c).d
o=o.a.b
q=o.i(0,p)
q.toString
q=A.aF(b,r<B.b.p(q))
s=s.O(a.c).d
o=o.i(0,p)
o.toString
return B.b.v(q,A.aF(a,s<B.b.p(o)))},
$S:1}
A.ed.prototype={
$2(a,b){var s,r,q,p="maxLevel",o=t.r
o.a(a)
o.a(b)
o=this.a
s=o.c.y
r=s.O(b.c).d
o=o.a.b
q=o.i(0,p)
q.toString
q=A.aF(b,r<B.b.p(q))
s=s.O(a.c).d
o=o.i(0,p)
o.toString
return B.b.v(q,A.aF(a,s<B.b.p(o)))},
$S:1}
A.ee.prototype={
$1(a){var s,r,q,p,o,n,m,l,k=this,j="soldierLimit"
t.r.a(a)
s=k.a
r=s.f
r===$&&A.aG()
q=k.c
p=q.ga8()
o=s.a
n=o.b
m=n.i(0,j)
m.toString
m=B.b.p(m)
n=n.i(0,j)
n.toString
l=r.cq(k.b,a,p,Math.min(B.b.p(n),B.a.ao(s.c.y.f,new A.ea(q)).c),k.d,m)
return l.r||l.c<=o.r.CW||l.b<-0.12},
$S:0}
A.ea.prototype={
$1(a){return t.u.a(a).a===this.a.b},
$S:8}
A.a9.prototype={}
A.eJ.prototype={
bz(a,b){return new A.an(this.cn(a,b),t.dT)},
cn(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e
return function $async$bz(c,d,a0){if(d===1){n.push(a0)
p=o}for(;;)switch(p){case 0:h=s.X(r,q)
g=r.a
f=g.a
e=q.I(f)<=q.R(g)
if(e)m=(h==null?null:h.a)===B.f
else m=!1
p=m?3:4
break
case 3:p=5
return c.b=new A.a9(q,A.b([],t.Z),s.aa(r,q),!1,"\u57ce\u9632\u4e0e\u73b0\u6709\u5b88\u5c06\u8db3\u4ee5\u5e94\u5bf9\u53ef\u89c1\u6765\u654c\uff0c\u7ef4\u6301\u8fdc\u5f81\uff0c\u4e0d\u53ec\u56de\u5c06\u9886","hold"),1
case 5:p=1
break
case 4:m=s.bc(r,q)
l=A.v(m,m.$ti.h("c.E"))
m=A.j(l)
k=m.h("e<1>")
j=A.v(new A.e(l,m.h("f(1)").a(new A.fh(s,r,h)),k),k.h("c.E"))
p=j.length!==0?6:7
break
case 6:p=8
return c.bv(j)
case 8:p=1
break
case 7:p=e&&q.I(f)<q.R(g)?9:10
break
case 9:i=q.K()
p=i.b1(g)&&i.d>=i.ae(!0).a?11:12
break
case 11:p=13
return c.b=s.am(r,q,i,A.b([new A.z(B.u,null,f,null,0,B.d)],t.w),"\u672c\u5730\u4ecd\u6709\u8fce\u6218\u540d\u989d\uff0c\u5148\u62db\u52df\u8865\u5f3a\uff0c\u518d\u6309\u5b9e\u9645\u5230\u4efb\u5c5e\u6027\u590d\u6838\uff0c\u6682\u4e0d\u53ec\u56de\u8fdc\u5f81"),1
case 13:p=1
break
case 12:case 10:p=14
return c.bv(l)
case 14:case 1:return 0
case 2:return c.c=n.at(-1),3}}}},
bc(a,b){return new A.an(this.c_(a,b),t.dT)},
c_(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e,d,c,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0
return function $async$bc(i1,i2,i3){if(i2===1){n.push(i3)
p=o}for(;;)switch(p){case 0:h4=r.a
h5=h4.a
h6=q.I(h5)>q.R(h4)
h7=t.Z
h8=A.b([],h7)
h9=s.aa(r,q)
i0=!h6
if(i0){m=s.X(r,q)
m=(m==null?null:m.a)!==B.f}else m=!0
p=3
return i1.b=new A.a9(q,h8,h9,m,h6?"unsalvageableDefense\uff1a\u5f53\u524d\u5b89\u5168\u540d\u989d "+q.R(h4)+"\uff0c\u9a7b\u519b "+q.I(h5)+"\uff0c\u7b49\u5f85\u5408\u6cd5\u4fee\u590d":"\u4fdd\u6301\u53ef\u51fa\u573a\u5b88\u519b\uff0c\u7ee7\u7eed\u76d1\u63a7\u5168\u90e8\u6765\u654c","local"),1
case 3:h8=s.c
if(!h8.Y()){p=1
break}h9=q.f
m=q.C(h5).length
l=s.b
k=l.b
j=k.i(0,"soldierLimit")
j.toString
i=Math.max(0,Math.min(h9,m*B.b.p(j))-q.e)
p=i>0?4:5
break
case 4:h=q.K()
h9=h.d
m=h.ae(!0)
j=k.i(0,"soldierCost")
j.toString
g=Math.min(i,Math.max(0,B.c.ba(h9-m.a,B.b.p(j))))
p=g>0&&h.aC(g)?6:7
break
case 6:p=8
return i1.b=s.am(r,q,h,A.b([new A.z(B.p,null,h5,null,g,B.d)],t.w),"\u4f18\u5148\u7528\u56fd\u5e93\u8865\u8db3\u73b0\u6709\u5b88\u519b\u5175\u5458\uff0c\u518d\u5224\u65ad\u662f\u5426\u9700\u8981\u5916\u63f4"),1
case 8:case 7:case 5:h9=h4.ax
m=h9==null
p=m?9:10
break
case 9:f=q.K()
e=A.b([],t.w)
j=f.C(h5)
d=A.j(j)
c=d.h("e<1>")
a0=A.v(new A.e(j,d.h("f(1)").a(new A.eK()),c),c.h("c.E"))
B.a.F(a0,new A.eL())
p=a0.length!==0?11:12
break
case 11:a1=B.a.gG(a0)
j=a1.a
d=f.x
c=h4.d
a2=0
case 13:if(a2<4){a3=d.i(0,h5)
a3.toString
a4=k.i(0,"maxLevel")
a4.toString
a4=a3<B.b.p(a4)
a3=a4}else a3=!1
if(!a3){p=14
break}if(!f.aG(h4,a1)||f.d<f.ae(!0).a){p=14
break}B.a.k(e,new A.z(B.o,j,h5,null,0,B.d))
a3=f.I(h5)
a4=d.i(0,h5)
if(a4==null)a4=c
p=a3<=a4?15:16
break
case 15:p=17
return i1.b=s.am(r,q,f,e,"\u4f18\u5148\u7531\u9ad8\u5185\u653f\u5c06\u9886\u5347\u7ea7\uff0c\u4fdd\u62a4\u771f\u5b9e\u8fce\u6218\u540d\u989d"),1
case 17:a3=s.X(r,f)
if((a3==null?null:a3.a)===B.f||h6){p=14
break}case 16:++a2
p=13
break
case 14:case 12:case 10:p=h6?18:19
break
case 18:j=q.C(h5)
d=A.j(j)
c=d.h("e<1>")
a5=A.v(new A.e(j,d.h("f(1)").a(new A.eM()),c),c.h("c.E"))
B.a.F(a5,new A.eX())
j=A.j(a5),d=A.a6(a5,0,A.Z(3,"count",t.S),j.c),c=d.$ti,d=new A.w(d,d.gm(0),c.h("w<k.E>")),a3=h4.db,a4=h4.ay,a6=h4.d,a7=t.T,a8=t.w,a9=t.e,b0=j.h("f(1)"),j=j.h("e<1>"),c=c.h("k.E")
case 20:if(!d.j()){p=21
break}b1=d.d
if(b1==null)b1=c.a(b1)
if(!h8.Y()){p=21
break}b2=q.K()
e=A.b([],a8)
b3=A.b([b1],a9)
B.a.B(b3,new A.e(a5,b0.a(new A.f_(b1)),j))
b1=b3.length,b4=b2.x,b5=0
case 22:if(!(b5<b3.length)){p=24
break}b6=b3[b5]
b7=b2.I(h5)
if(m){b8=b4.i(0,h5)
if(b8==null)b8=a6}else{b8=a3?1:0
b8=B.c.A(h9-a4-b8,0,5)}if(b7<=b8){p=24
break}if(!b2.bD(b6)){p=23
break}B.a.k(e,new A.z(B.x,b6.a,null,null,0,B.d))
p=m?25:26
break
case 25:b9=b2.K()
c0=A.v(e,a7)
b7=b9.C(h5)
b8=A.j(b7)
c1=b8.h("e<1>")
a0=A.v(new A.e(b7,b8.h("f(1)").a(new A.f0()),c1),c1.h("c.E"))
B.a.F(a0,new A.f1())
p=a0.length!==0?27:28
break
case 27:b7=b9.x
c2=0
for(;;){if(c2<3){b8=b9.I(h5)
c1=b7.i(0,h5)
if(c1==null)c1=a6
c1=b8>c1
b8=c1}else b8=!1
if(!b8)break
if(!b9.aG(h4,B.a.gG(a0)))break
B.a.k(c0,new A.z(B.o,B.a.gG(a0).a,h5,null,0,B.d));++c2}b8=b9.I(h5)
b7=b7.i(0,h5)
if(b7==null)b7=a6
p=b8<=b7&&b9.d>=b9.ae(!0).a?29:30
break
case 29:p=31
return i1.b=s.am(r,q,b9,c0,"\u5148\u89e3\u96c7\u4f4e\u4ea4\u6362\u4ef7\u503c\u6321\u4f4d\u8005\u7b79\u8d44\uff0c\u4fdd\u7559\u4e3b\u6301\u8005\u5b8c\u6210\u6551\u57ce\u5347\u7ea7"),1
case 31:case 30:case 28:case 26:case 23:b3.length===b1||(0,A.u)(b3),++b5
p=22
break
case 24:b1=b2.I(h5)
if(m){b3=b4.i(0,h5)
if(b3==null)b3=a6}else{b3=a3?1:0
b3=B.c.A(h9-a4-b3,0,5)}p=b1<=b3?32:33
break
case 32:p=34
return i1.b=s.am(r,q,b2,e,"\u6ca1\u6709\u53ef\u652f\u4ed8\u4e14\u53ca\u65f6\u7684\u5347\u7ea7\u65b9\u6848\uff0c\u6e05\u51fa\u6321\u4f4d\u5b88\u5c06\u5e76\u4fdd\u7559\u6838\u5fc3\u51fa\u573a"),1
case 34:case 33:p=20
break
case 21:case 19:j=q.C(h5)
d=A.j(j)
c=d.h("e<1>")
c3=A.v(new A.e(j,d.h("f(1)").a(new A.f2(q)),c),c.h("c.E"))
B.a.F(c3,new A.f3())
if(i0){i0=r.f
i0=(i0==null?null:i0.a)!==B.f}else i0=!0
p=i0&&s.a.y.gU().gm(0)>1?35:36
break
case 35:c4=q.K()
i0=r.f
if((i0==null?null:i0.a)===B.t)c4.ax.k(0,h5)
c5=A.b([],h7)
i0=s.a.y
j=i0.gU()
d=j.$ti
c=d.h("e<c.E>")
c6=A.v(new A.e(j,d.h("f(c.E)").a(new A.f4(h4)),c),c.h("c.E"))
B.a.F(c6,new A.f5(h4))
j=A.a6(c3,0,A.Z(l.r.ax,"count",t.S),A.j(c3).c),d=j.$ti,j=new A.w(j,j.gm(0),d.h("w<k.E>")),c=h4.db,a3=h4.ay,a4=A.j(c6),a6=a4.c,a4=a4.h("I<1>"),a7=a4.h("w<k.E>"),a8=s.e,a9=a8.c,b0=s.f,b1=a4.h("k.E"),d=d.h("k.E"),b3=h4.d,b4=t.er,b7=t.bo,b8=t.i,c1=t.I
case 37:if(!j.j()){p=38
break}c7=j.d
if(c7==null)c7=d.a(c7)
if(!h8.Y()){p=38
break}c8=new A.I(c6,0,4,a4)
c8.a3(c6,0,4,a6)
c8=new A.w(c8,c8.gm(0),a7)
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
d4=d4==null?null:d4.a}d4=d4!==B.f}else d4=!1
if(d4)continue
d4=c4.I(d2)
d5=d1.ax
if(d5==null){d2=c9.i(0,d2)
if(d2==null)d2=d1.d}else{d2=d1.ay
d6=d1.db?1:0
d6=B.c.A(d5-d2-d6,0,5)
d2=d6}if(d4>=d2)continue
d7=a9.ai(c7,d1.f,i0,!0,d1)
d2=h6?"transfer":"evacuate"
d8=a8.b5(c4,c7,d7,!0,r.ga4(),!0,"\u5728\u539f\u57ce\u5371\u9669\u7a97\u53e3\u524d\u8fdb\u9a7b\u5b89\u5168\u53cb\u57ce\uff0c\u6539\u53d8\u6240\u5c5e\u57ce\u4ee5\u4fdd\u5168\u5c06\u9886",d2,d1)
if(d8!=null)d1=d0==null||d8.a.d>d0.a.d
else d1=!1
if(d1)d0=d8}if(d0==null){p=37
break}c4=d0.a
B.a.k(c5,d0.b)
c7=c4.I(h5)
if(m){c8=c4.x.i(0,h5)
if(c8==null)c8=b3}else{c8=c?1:0
c8=B.c.A(h9-a3-c8,0,5)}p=c7<=c8?39:40
break
case 39:d9=new A.bH(c5,b4.a(new A.eN()),b7).H(0,0,new A.eO(s),b8)
c7=c4.K()
c8=A.v(c5,c1)
c9=s.aa(r,c4)
d1=isFinite(r.ga4())?"\u5b89\u5168\u5224\u65ad\u4ee5\u5b9e\u9645\u8fdb\u9a7b\u53cb\u57ce\u4e3a\u51c6\uff0c\u9014\u4e2d\u539f\u57ce\u5931\u5b88\u4ecd\u4f1a\u6e05\u9664\u90e8\u961f":"\u8f6c\u79fb\u5230\u5b89\u5168\u540e\u65b9\u6574\u5907"
p=41
return i1.b=new A.a9(c7,c8,c9+d9*0.65,!1,d1,"relocation"),1
case 41:if(h6){p=38
break}case 40:p=37
break
case 38:case 36:i0=s.a.y
j=i0.e
d=A.j(j)
c=d.h("e<1>")
e0=A.v(new A.e(j,d.h("f(1)").a(new A.eP(s,q)),c),c.h("c.E"))
B.a.F(e0,new A.eQ(h4))
j=r.d
d=j.length===0?0:l.r.ax
c=t.S
d=A.a6(e0,0,A.Z(d,"count",c),A.j(e0).c)
a3=d.$ti
d=new A.w(d,d.gm(0),a3.h("w<k.E>"))
a4=s.e
a6=s.d
a7=a4.c
a8=a7.a
a9=s.f
a3=a3.h("k.E")
b0=h4.db
b1=h4.ay
b3=h4.d
b4=q.x
b7=r.f
b8=A.j(j)
c1=b8.h("p(1)")
c7=b8.h("a4<1,p>")
c8=h4.f
c9=b8.c
b8=b8.h("I<1>")
d1=b8.h("w<k.E>")
d2=b8.h("k.E")
d4=b7==null
case 42:if(!d.j()){p=43
break}d5=d.d
if(d5==null)d5=a3.a(d5)
if(!h8.Y()){p=43
break}d6=d5.c
e1=a9.i(0,d6)
e2=r.ga4()
e3=e1==null
if(e3)e4=null
else e4=e1.d.length!==0||e1.a.ax!=null
e4=e4===!0?e1.ga4():1/0
e5=Math.min(e2,e4)
e2=s.X(r,q)
if((e2==null?null:e2.a)!==B.f){e2=q.I(h5)
if(m){e4=b4.i(0,h5)
if(e4==null)e4=b3}else{e4=b0?1:0
e4=B.c.A(h9-b1-e4,0,5)}e4=e2<e4
e2=e4}else e2=!1
p=e2?44:45
break
case 44:e6=new A.a4(j,c1.a(new A.eR()),c7).a6(0,new A.eS(s))
if(m){e2=b4.i(0,h5)
if(e2==null)e2=b3}else{e2=b0?1:0
e2=B.c.A(h9-b1-e2,0,5)}e4=k.i(0,"soldierLimit")
e4.toString
e7=a6.aX(d5,e6,e6.ok,e2,!1,Math.min(B.b.p(e4),q.e+d5.gP()))
e2=d4?null:b7.b
if(e2==null)e2=-1
p=e7.b>e2+0.05?46:47
break
case 46:d7=a7.ai(d5,c8,i0,!0,h4)
if(m){e2=b4.i(0,h5)
if(e2==null)e2=b3}else{e2=b0?1:0
e2=B.c.A(h9-b1-e2,0,5)}e4=s.X(r,q)
e4=e4==null?null:e4.b
d8=a4.b5(q,d5,d7,!0,e5,!0,"\u672c\u5730\u62b5\u6297\u4ecd\u6709\u7f3a\u53e3\uff08\u57ce\u9632"+e2+"\u7ea7\uff0c\u9632\u5b88\u4f59\u91cf"+B.b.bL((e4==null?-1:e4)*100)+"\u70b9\uff09\uff0c\u63f4\u519b\u7ea6"+B.b.bN(d7.b,1)+"\u79d2\u5230\u8fbe\uff0c\u5371\u9669\u7a97\u53e3"+B.b.bN(e5,1)+"\u79d2\uff0c\u9884\u7559\u5165\u57ce\u540d\u989d","rescue",h4)
if(d8!=null){e2=s.X(r,d8.a)
e2=(e2==null?null:e2.a)===B.f}else e2=!1
p=e2?48:49
break
case 48:e2=d8.a
p=50
return i1.b=new A.a9(e2,A.b([d8.b],h7),s.aa(r,e2)-A.aa(d5)*0.08,!1,"","recall"),1
case 50:case 49:case 47:case 45:e2=new A.I(j,0,2,b8)
e2.a3(j,0,2,c9)
e2=new A.w(e2,e2.gm(0),d1)
e4=d5.ok
d6=d6!==h5
case 51:if(!e2.j()){p=52
break}e8=e2.d
if(e8==null)e8=d2.a(e8)
e9=!1
if(d6){if(e3)f0=null
else f0=e1.d.length!==0||e1.a.ax!=null
if(f0===!0){if(e3)e9=null
else{e9=e1.f
e9=e9==null?null:e9.a}e9=e9!==B.f}}if(e9){p=51
break}e9=e8.a
d7=a4.bH(d5,e9,q)
if(a6.co(d5,e9,e9.ok,e4,a8.aV(e9.z)).a!==B.f){p=51
break}d8=a4.bU(q,d5,d7,e8.b,!0,e9,"\u56de\u63f4\u91c7\u53d6\u57ce\u5916\u622a\u51fb\uff0c\u907f\u514d\u5165\u57ce\u6324\u5360\u5b89\u5168\u540d\u989d","intercept",h4)
p=d8!=null?53:54
break
case 53:e8=d8.a
p=55
return i1.b=new A.a9(e8,A.b([d8.b],h7),s.aa(r,e8)+80-A.aa(d5)*0.08,h6,"","recall"),1
case 55:case 54:p=51
break
case 52:p=42
break
case 43:d=A.a6(j,0,A.Z(2,"count",c),c9),c=d.$ti,d=new A.w(d,d.gm(0),c.h("w<k.E>")),a3=A.j(c3),a9=a3.c,a3=a3.h("I<1>"),b4=a3.h("w<k.E>"),b8=t.H,c1=t.N,c7=t.Y,c8=t.T,c9=t.w,d1=t.e,d2=t.eV,d5=a3.h("k.E"),l=l.r.d,c=c.h("k.E")
case 56:if(!d.j()){p=57
break}d6=d.d
if(d6==null)d6=c.a(d6)
e2=d6.a
if(e2.k1!=null){p=56
break}e3=new A.I(c3,0,4,a3)
e3.a3(c3,0,4,a9)
e3=new A.w(e3,e3.gm(0),b4)
d6=d6.b
e4=e2.z
e8=e2.ok
case 58:if(!e3.j()){p=59
break}e9=e3.d
if(e9==null)e9=d5.a(e9)
if(!h8.Y()){p=59
break}f0=q.C(h5)
f1=A.j(f0)
f2=f1.h("e<1>")
f3=A.v(new A.e(f0,f1.h("f(1)").a(new A.eT(e9)),f2),f2.h("c.E"))
f4=f3.length===0?null:B.a.a6(f3,new A.eU(s))
d7=a4.bH(e9,e2,q)
if(!d7.d||d7.b+l>=d6){p=58
break}f5=A.b([new A.bl(q,A.b([],c9),A.b([],d1))],d2)
if(h6){f0=q.d
f1=k.i(0,"emergencyGold")
f1.toString
f1=f0<B.b.p(f1)+4
f0=f1}else f0=!1
if(f0){f0=A.j(f3)
f1=f0.h("e<1>")
f6=A.v(new A.e(f3,f0.h("f(1)").a(new A.eV(f4)),f1),f1.h("c.E"))
B.a.F(f6,new A.eW())
if(f6.length!==0&&h8.Y()){b9=q.K()
if(b9.bD(B.a.gG(f6)))B.a.k(f5,new A.bl(b9,A.b([new A.z(B.x,B.a.gG(f6).a,null,null,0,B.d)],c9),A.b([B.a.gG(f6)],d1)))}}f0=f5.length,f1=f4==null,f2=!f1,f7=e9.f,b5=0
case 60:if(!(b5<f5.length)){p=62
break}f8=f5[b5]
f9=f8.a
g0=a4.aF(e9,f9),g1=g0.length,g2=f9.x,g3=0
case 63:if(!(g3<g0.length)){p=65
break}g4=g0[g3]
g5=a8.aV(e4)
g6=k.i(0,"soldierLimit")
g6.toString
e7=a6.cr(e9,e2,e8,g4,!0,Math.min(B.b.p(g6),f9.e),g5)
g7=e7.a===B.f
g5=!g7
g6=!1
if(g5)if(f2)if(e7.d>0){g6=k.i(0,"soldierLimit")
g6.toString
g6=Math.min(B.b.p(g6),f9.e)
g8=k.i(0,"soldierHp")
g8.toString
g8=e7.f<f7+g6*B.b.p(g8)
g6=g8}if(g6){g6=f9.e
g8=k.i(0,"soldierLimit")
g8.toString
g9=Math.max(0,g6-B.b.p(g8))
if(m){g6=g2.i(0,h5)
if(g6==null)g6=b3}else{g6=b0?1:0
g6=B.c.A(h9-b1-g6,0,5)}g8=k.i(0,"soldierLimit")
g8.toString
h0=a6.bA(f4,e2,g6,Math.min(B.b.p(g8),g9))
if(m){g6=g2.i(0,h5)
if(g6==null)g6=b3}else{g6=b0?1:0
g6=B.c.A(h9-b1-g6,0,5)}g8=k.i(0,"soldierLimit")
g8.toString
h1=a6.cp(f4,e2,e7.d,g6,Math.min(B.b.p(g8),g9))
h2=h1.b-h0.b
g7=h1.a===B.f&&h2>0.12}else h2=0
if(!g7){p=64
break}if(f3.length===0)g5=j.length>1||g5
else g5=!1
if(g5){p=64
break}g5=h2>0
g6=g5?"\u914d\u5907\u53ef\u5151\u73b0\u7684\u9996\u4ef6\u6b66\u5668\u622a\u51fb\uff0c\u4fdd\u7559\u6838\u5fc3\u5b88\u519b\u5175\u5458\u5e76\u6539\u5584\u9632\u5fa1\u4f59\u91cf":"\u6838\u5fc3\u5c06\u9886\u5728\u6b66\u5668\u548c\u5730\u5f62\u6709\u5229\u7684\u57ce\u5916\u8fce\u6218\uff0c\u76d1\u63a7\u7ed5\u8fc7\u622a\u51fb\u7684\u6765\u654c"
if(f1)g8=0
else{g8=k.i(0,"soldierLimit")
g8.toString
g8=Math.min(B.b.p(g8),f9.e)}d8=a4.bS(f9,e9,d7,d6,!0,e2,g4,g8,g6,"intercept",h4)
if(d8==null){p=64
break}g0=d8.a
h3=g0.I(h5)
g1=d8.b
g2=A.v(f8.b,c8)
B.a.B(g2,g1.b)
g6=A.i4(c1,c1)
g6.B(0,g1.c)
g8=f8.c
g6.B(0,a4.a5(g8,A.b([],c7)))
g1=A.b([new A.L(g1.a,g2,g6,g1.d,g1.e,!0)],h7)
g6=s.aa(r,g0)
g2=g5?A.aa(e9)*0.5:0
g8=J.jF(g8,0,new A.eY(),b8)
if(m){g5=g0.x.i(0,h5)
if(g5==null)g5=b3}else{g5=b0?1:0
g5=B.c.A(h9-b1-g5,0,5)}p=66
return i1.b=new A.a9(g0,g1,g6+200+h2*500-g2-g8,h3>g5,"","local"),1
case 66:p=65
break
case 64:g0.length===g1||(0,A.u)(g0),++g3
p=63
break
case 65:case 61:f5.length===f0||(0,A.u)(f5),++b5
p=60
break
case 62:p=58
break
case 59:p=56
break
case 57:if(i0.gU().gm(0)===1)l=(d4?null:b7.a)===B.t&&c3.length>1
else l=!1
p=l?67:68
break
case 67:l=i0.d,k=A.j(l),j=k.h("e<1>"),j=A.kl(new A.e(l,k.h("f(1)").a(new A.eZ(s)),j),3,j.h("c.E")),k=j.a,j=new A.b2(k.gu(k),j.b,A.q(j).h("b2<1>"))
case 69:if(!j.j()){p=70
break}l=j.gl()
if(!h8.Y()){p=70
break}b6=B.a.gG(c3)
d8=a4.bT(q,b6,a7.ai(b6,l.f,i0,!0,l),r.ga4(),!0,"\u4fdd\u7559\u539f\u57ce\u5b88\u519b\u62d6\u5ef6\uff0c\u6838\u5fc3\u5728\u5371\u9669\u7a97\u53e3\u524d\u593a\u53d6\u7a7a\u57ce\u5efa\u7acb\u65b0\u636e\u70b9","newBase",l)
p=d8!=null?71:72
break
case 71:l=d8.a
k=A.b([d8.b],h7)
d=s.aa(r,l)
c=A.aa(b6)
a3=l.I(h5)
if(m){a6=l.x.i(0,h5)
if(a6==null)a6=b3}else{a6=b0?1:0
a6=B.c.A(h9-b1-a6,0,5)}p=73
return i1.b=new A.a9(l,k,d+c*1.2,a3>a6,"","relocation"),1
case 73:case 72:p=69
break
case 70:case 68:case 1:return 0
case 2:return i1.c=n.at(-1),3}}}},
am(a,b,c,d,e){var s,r,q,p,o,n,m=this
t.f3.a(d)
s=A.j(d)
r=s.h("p?(1)").a(new A.fa(m))
q=c.z.cw(b.z).H(0,0,new A.fb(m),t.i)
p=c.K()
o=A.v(d,t.T)
s=A.v(new A.c9(new A.a4(d,r,s.h("a4<1,p?>")),t.gn),t.r)
r=a.d
n=A.j(r)
B.a.B(s,new A.a4(r,n.h("p(1)").a(new A.fc()),n.h("a4<1,p>")))
n=a.a
s=A.b([new A.L(e,o,m.e.a5(s,A.b([n],t.Y)),B.n,c.ae(!0).a,!0)],t.Z)
o=m.aa(a,c)
r=Math.max(0,b.d-c.d)
if(c.I(n.a)<=c.R(n)){n=m.X(a,c)
n=(n==null?null:n.a)!==B.f}else n=!0
return new A.a9(p,s,o-q*0.65-r*0.2,n,"","local")},
X(b3,b4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1=null,b2=b3.d
if(b2.length===0)return b1
s=b3.a
r=s.a
q=b4.C(r)
p=b4.e
for(o=b4.y,o=new A.az(o,o.r,o.e,A.q(o).h("az<2>")),n=t.N,m=t.z,l=t.n,k=b0.e.c,j=b0.a.y,i=j.b,h=b4.z,g=b0.b,f=g.r.d;o.j();){e=o.d
if(!e.z||e.d!==r||e.w<i)continue
d=j.ac(e.a)
if(d==null||d.fy||d.k1!=null||d.f<=0||h.q(0,d.a)||B.a.N(q,new A.f6(d)))continue
c=d.z
for(e=J.iv(e.f,e.r),b=e.$ti,e=new A.w(e,e.gm(0),b.h("w<k.E>")),b=b.h("k.E"),a=0;e.j();c=a1){a0=e.d
a1=a0==null?b.a(a0):a0
a+=k.a9(c,a1)}if(!isFinite(a)||a+f>=b3.ga4())continue
p=Math.min(b4.f,p+d.gP())
e=A.ak(d.D(),n,m)
e.t(0,"hp",d.r)
e.t(0,"troops",A.b([],l))
e.t(0,"s",0)
B.a.k(q,A.iw(e))}B.a.F(q,new A.f7())
o=A.j(q)
n=t.r
a2=A.cL(new A.e(q,o.h("f(1)").a(new A.f8(b3)),o.h("e<1>")),n)
m=A.b([],t.e)
if(a2!=null)m.push(a2)
o=o.h("U<1>")
B.a.B(m,new A.U(q,o).b9(0,o.h("f(k.E)").a(new A.f9(a2))))
a3=A.a6(m,0,A.Z(b4.R(s),"count",t.S),n).a7(0)
if(a3.length===0)return b1
for(o=b0.d,n=s.d,m=b4.x,g=g.b,l=s.db,k=s.ay,s=s.ax,j=s==null,a4=b1,a5=0;a5<a3.length;++a5){d=a3[a5]
if(d.as===B.e)a6=0
else{i=g.i(0,"soldierLimit")
i.toString
a6=Math.min(p,B.b.p(i)-d.gP())}p-=a6
for(i=b2.length,a7=b1,a8=0;a8<b2.length;b2.length===i||(0,A.u)(b2),++a8){h=b2[a8].a
if(j){f=m.i(0,r)
if(f==null)f=n}else{f=l?1:0
f=B.c.A(s-k-f,0,5)}a9=o.aX(d,h,h.ok,Math.max(1,f-a5),!1,d.gP()+a6)
if(a7==null||a9.b<a7.b)a7=a9}if(a4==null||a7.b>a4.b)a4=a7}return a4},
aa(a,b){var s=a.a,r=b.I(s.a),q=Math.max(0,r-b.R(s)),p=this.a.y.gU().gm(0)===1?400:0,o=150+s.w*4+a.r*0.5+p,n=this.X(a,b)
s=r===0?o*2:0
p=n==null?null:n.b
if(p==null)p=-0.8
return-q*5000-s+p*o}}
A.fh.prototype={
$1(a){var s,r,q,p,o,n,m
t.cs.a(a)
s=!1
if(a.f==="local"){r=a.b
if(r.length!==0){q=a.a
p=this.b
o=p.a
if(q.I(o.a)<=q.R(o)){o=this.a
n=o.X(p,q)
n=n==null?null:n.b
if(n==null)n=-1
m=this.c
m=m==null?null:m.b
if(n>(m==null?-1:m)+0.04||B.a.N(r,new A.ff())){s=o.X(p,q)
s=s==null?null:s.c
if(s==null)s=-1
s=s>-o.b.r.CW||B.a.N(r,new A.fg())}}}}return s},
$S:34}
A.ff.prototype={
$1(a){return B.a.N(t.I.a(a).d,new A.fe())},
$S:22}
A.fe.prototype={
$1(a){return t.J.a(a).b==="intercept"},
$S:7}
A.fg.prototype={
$1(a){return B.a.N(t.I.a(a).d,new A.fd())},
$S:22}
A.fd.prototype={
$1(a){return t.J.a(a).b==="intercept"},
$S:7}
A.eK.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.eL.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.v(s.a(b).x,a.x)},
$S:1}
A.eM.prototype={
$1(a){t.r.a(a)
return a.dy&&a.e!==2},
$S:0}
A.eX.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.v(A.aa(a),A.aa(b))},
$S:1}
A.f_.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.f0.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.f1.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.v(s.a(b).x,a.x)},
$S:1}
A.f2.prototype={
$1(a){t.r.a(a)
return a.db&&!this.a.as.q(0,a.a)},
$S:0}
A.f3.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.v(A.aa(s.a(b)),A.aa(a))},
$S:1}
A.f4.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:2}
A.f5.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.f
return B.b.v(a.f.J(s),b.f.J(s))},
$S:6}
A.eN.prototype={
$1(a){return t.I.a(a).d},
$S:36}
A.eO.prototype={
$2(a,b){var s
A.at(a)
s=this.a.a.y.ac(t.J.a(b).a)
s.toString
return a+A.aa(s)},
$S:37}
A.eP.prototype={
$1(a){var s,r,q
t.r.a(a)
s=!1
if(a.b===this.a.a.y.a)if(a.dx)if(!a.fy){s=this.b
r=a.a
q=s.y.i(0,r)
s=(q==null?null:q.z)!==!0&&!s.as.q(0,r)}return s},
$S:0}
A.eQ.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.f
return B.b.v(a.z.J(s),b.z.J(s))},
$S:1}
A.eR.prototype={
$1(a){return t.O.a(a).a},
$S:23}
A.eS.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.hM(a,s)>A.hM(b,s)?a:b},
$S:15}
A.eT.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.eU.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.hM(a,s)>A.hM(b,s)?a:b},
$S:15}
A.eV.prototype={
$1(a){t.r.a(a)
return a!==this.a&&a.dy&&a.e!==2},
$S:0}
A.eW.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.v(A.aa(a),A.aa(b))},
$S:1}
A.eY.prototype={
$2(a,b){return A.t(a)+A.aa(t.r.a(b))*0.65},
$S:40}
A.eZ.prototype={
$1(a){var s
t.q.a(a)
s=this.a.a.y
return a.b!==s.a&&s.C(a.a).length===0},
$S:2}
A.fa.prototype={
$1(a){return this.a.a.y.ac(t.T.a(a).b)},
$S:41}
A.fb.prototype={
$2(a,b){var s
A.at(a)
s=this.a.a.y.ac(A.F(b))
s.toString
return a+A.aa(s)},
$S:42}
A.fc.prototype={
$1(a){return t.O.a(a).a},
$S:23}
A.f6.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.f7.prototype={
$2(a,b){var s=t.r
return B.c.v(s.a(a).d,s.a(b).d)},
$S:1}
A.f8.prototype={
$1(a){return t.r.a(a).a===this.a.a.CW},
$S:0}
A.f9.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.Q.prototype={
D(){return A.b([this.a,this.b],t.n)},
J(a){var s=this.a-a.a,r=this.b-a.b
return Math.sqrt(s*s+r*r)},
ap(a,b){var s=this.a,r=this.b
return new A.Q(s+(a.a-s)*b,r+(a.b-r)*b)}}
A.dQ.prototype={
ar(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this.a,f=B.a.gG(g)
for(s=a.a,r=a.b,q=1/0,p=0;o=g.length,p<o;){n=g[p];++p
m=g[p%o]
o=n.a
l=m.a-o
k=n.b
j=m.b-k
i=n.ap(m,B.b.A(((s-o)*l+(r-k)*j)/(l*l+j*j),0,1))
h=i.J(a)
if(h<q){q=h
f=i}}return f},
q(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(this.ar(b).J(b)<1e-7)return!0
for(s=this.a,r=s.length,q=b.b,p=b.a,o=!1,n=0;n<r;){m=s[n];++n
l=s[n%r]
k=m.b
j=l.b
if(k>q!==j>q){i=m.a
i=p<(l.a-i)*(q-k)/(j-k)+i
k=i}else k=!1
if(k)o=!o}return o},
bF(a,b){var s
if(this.q(0,a))return null
s=this.bB(a,b)
return s.length===0?null:B.a.a6(s,B.v)},
bB(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.a,g=b.a-h,f=a.b,e=b.b-f,d=A.b([],t.n)
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
if(j>=-1e-7&&j<=1.0000001&&i>=-1e-7&&i<=1.0000001)B.a.k(d,B.b.A(j,0,1))}return d},
bw(a,b){var s,r=this
if(r.q(0,a))return r.ar(a)
s=r.bF(a,b)
return s==null?r.ar(a):a.ap(b,s)},
bC(a,b){var s=a.J(b),r=s<1e-7?new A.Q(a.a+4096,a.b+0):a.ap(b,4096/s),q=this.bB(a,r)
return q.length===0?this.ar(b):a.ap(r,B.a.a6(q,B.D))}}
A.af.prototype={
az(){return"AiArmyState."+this.b}}
A.p.prototype={
gP(){var s=this.at,r=A.j(s)
return new A.e(s,r.h("f(1)").a(new A.dr()),r.h("e<1>")).gm(0)},
gaD(){return this.f+B.a.H(this.at,0,new A.dq(),t.H)},
D(){var s,r,q,p,o,n,m,l=this,k=l.z,j=t.n
k=A.b([k.a,k.b],j)
s=l.Q
s=A.b([s.a,s.b],j)
r=l.CW
r=r==null?null:A.b([r.a,r.b],j)
q=A.b([],t.b)
for(p=l.p2,o=p.length,n=0;n<p.length;p.length===o||(0,A.u)(p),++n){m=p[n]
q.push(A.b([m.a,m.b],j))}return A.O(["id",l.a,"c",l.b,"home",l.c,"o",l.d,"t",l.e,"hp",l.f,"max",l.r,"a",l.w,"p",l.x,"pay",l.y,"xy",k,"v",s,"s",l.as.a,"troops",l.at,"w",l.ax,"m",l.ay,"due",l.ch,"to",r,"target",l.cx,"return",l.cy,"dispatch",l.db,"move",l.dx,"dismiss",l.dy,"upgrade",l.fr,"retreat",l.fx,"marked",l.fy,"rev",l.go,"orderRev",l.id,"opponent",l.k1,"clashes",l.k2,"received",l.k3,"dealt",l.k4,"opening",l.ok,"weaponReady",l.p1,"returnPath",q],t.N,t.X)}}
A.dr.prototype={
$1(a){return A.at(a)>0},
$S:11}
A.dq.prototype={
$2(a,b){return A.t(a)+A.at(b)},
$S:12}
A.W.prototype={
ga8(){var s,r=this,q=r.ax
if(q==null)q=r.d
else{s=r.db?1:0
s=B.c.A(q-r.ay-s,0,5)
q=s}return q},
D(){var s,r,q,p,o,n=this,m=n.f,l=t.n
m=A.b([m.a,m.b],l)
s=A.b([],t.b)
for(r=n.r.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.u)(r),++p){o=r[p]
s.push(A.b([o.a,o.b],l))}return A.O(["id",n.a,"c",n.b,"native",n.c,"level",n.d,"keep",n.e,"xy",m,"outline",s,"income",n.w,"baseIncome",n.Q,"poor",n.x,"cap",n.y,"recruitCap",n.z,"recruit",n.as,"rev",n.at,"initial",n.ax,"wins",n.ay,"attacker",n.ch,"defender",n.CW,"stage",n.cx,"next",n.cy,"fallen",n.db,"danger",n.dx],t.N,t.X)}}
A.aV.prototype={
D(){var s,r,q=this,p=t.N,o=t.S,n=A.Y(p,o)
for(s=q.r.gab(),s=s.gu(s);s.j();){r=s.gl()
n.t(0,""+r.a,r.b)}o=A.Y(p,o)
for(s=q.w.gab(),s=s.gu(s);s.j();){r=s.gl()
o.t(0,""+r.a,r.b)}return A.O(["id",q.a,"gold",q.b,"reserves",q.c,"capacity",q.d,"salary",q.e,"poor",q.f,"stock",n,"hate",o],p,t.X)}}
A.dI.prototype={
gaq(){return B.a.ao(this.f,new A.dO(this))},
gU(){var s=this.d,r=A.j(s)
return new A.e(s,r.h("f(1)").a(new A.dP(this)),r.h("e<1>"))},
C(a){var s=this.e,r=A.j(s),q=r.h("e<1>")
s=A.v(new A.e(s,r.h("f(1)").a(new A.dL(this,a)),q),q.h("c.E"))
B.a.F(s,new A.dM())
return s},
ac(a){var s=this.e,r=A.j(s)
return A.cL(new A.e(s,r.h("f(1)").a(new A.dN(a)),r.h("e<1>")),t.r)},
O(a){var s=this.d,r=A.j(s)
return A.cL(new A.e(s,r.h("f(1)").a(new A.dJ(a)),r.h("e<1>")),t.q)},
D(){var s,r,q,p,o=this,n=t.d,m=A.b([],n)
for(s=o.d,r=s.length,q=0;q<r;++q)m.push(s[q].D())
s=A.b([],n)
for(r=o.e,p=r.length,q=0;q<p;++q)s.push(r[q].D())
n=A.b([],n)
for(r=o.f,p=r.length,q=0;q<p;++q)n.push(r[q].D())
return A.O(["country",o.a,"tick",o.b,"month",o.c,"cities",m,"heroes",s,"countries",n,"pool",o.r,"salary",o.w],t.N,t.X)}}
A.dO.prototype={
$1(a){return t.u.a(a).a===this.a.a},
$S:8}
A.dP.prototype={
$1(a){return t.q.a(a).b===this.a.a},
$S:2}
A.dL.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b
if(a.c===s){r=a.as
s=(r===B.h||r===B.e)&&a.f>0&&a.b===B.a.ao(this.a.d,new A.dK(s)).b}else s=!1
return s},
$S:0}
A.dK.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:2}
A.dM.prototype={
$2(a,b){var s=t.r
return B.c.v(s.a(a).d,s.a(b).d)},
$S:1}
A.dN.prototype={
$1(a){return t.r.a(a).a===this.a},
$S:0}
A.dJ.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:2}
A.d1.prototype={}
A.fv.prototype={
aF(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.as
if(!(h===B.h||h===B.e))return A.b([a.ax],t.x)
h=this.b
s=h.f.gb4()
r=A.q(s)
q=r.h("e<c.E>")
p=A.v(new A.e(s,r.h("f(c.E)").a(new A.fy(this,b)),q),q.h("c.E"))
B.a.F(p,new A.fz())
s=t.dC
o=A.b([A.b([],s)],t.x)
for(r=t.S,q=A.j(p),n=A.a6(p,0,A.Z(5,"count",r),q.c),m=n.$ti,n=new A.w(n,n.gm(0),m.h("w<k.E>")),m=m.h("k.E");n.j();){l=n.d
B.a.k(o,A.b([(l==null?m.a(l):l).a],s))}if(p.length!==0){n=q.h("f(1)")
q=q.h("e<1>")
k=A.v(new A.e(p,n.a(new A.fA(a)),q),q.h("c.E"))
m=k.length===0?p:k
j=B.a.a6(m,new A.fB())
if(!B.a.N(o,new A.fC(j)))B.a.k(o,A.b([j.a],s))
h=h.b.i(0,"carryLimit")
h.toString
B.a.k(o,A.fq(Math.min(3,B.b.p(h)),j.a,!1,r))
i=A.cL(new A.e(p,n.a(new A.fD(b)),q),t.o)
if(i!=null&&!B.a.N(o,new A.fE(i)))B.a.k(o,A.b([i.a],s))}return o},
a5(a,b){var s,r,q,p,o
t.ef.a(a)
t.fy.a(b)
s=t.N
s=A.Y(s,s)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.u)(a),++q){p=a[q]
s.t(0,"h:"+p.a,p.go)}for(r=b.length,q=0;q<b.length;b.length===r||(0,A.u)(b),++q){o=b[q]
s.t(0,"c:"+o.a,o.at)}return s},
ah(a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6=this,a7=null
t.L.a(b5)
if(!b0.d||!isFinite(b0.b)||J.jG(b0.a)||a9.fy||a8.as.q(0,a9.a))return a7
s=b0.b
r=a6.b
q=r.r
p=s+q.d
if(p>=b2)return a7
o=a9.a
n=a8.y.i(0,o)
m=n==null
if(!m){if(n.x>a6.a.y.b&&!b3)return a7
l=!1
if(n.b===c0){k=n.d
if(k===c1.a){k=n.e
if(k==(b4==null?a7:b4.a)){l=n.f
k=J.ct(l)
l=k.gb_(l)&&k.gb0(l).J(J.jI(b0.a))<32&&a9.as!==B.q}}}if(l)return a7}j=a8.K()
i=A.b([],t.w)
l=!b1
if(l){k=r.b
h=k.i(0,"battleBudget")
h.toString
g=Math.min(c1.ga8(),a6.a.y.C(c1.a).length)
g=Math.max(1,g)
k=k.i(0,"supplySafety")
k.toString
p+=h*(b7+1)*g+s+k}if(p>600)return a7
s=c1.a
k=b4==null
h=k?a7:b4.a
g=a6.a
f=g.y
e=f.b
d=B.b.aW(isFinite(b2)?b2*60:Math.max(p,60)*60)
c=B.b.bL(q.r*60)
b=b0.a
r=r.b
a=r.i(0,"supplySeconds")
a.toString
a0=new A.a8(o,c0,b9,s,h,b,0,e+d,e+c,B.b.aW(p/a),b1,a9.id+1)
h=!1
if(b1){e=j.I(s)
if((m?a7:n.z)===!0){h=(m?a7:n.d)===s
m=h}else m=!1
m=m?1:0
q=b8?Math.max(j.R(c1),c1.z+q.x):j.R(c1)
q=e-m>=q}else q=h
if(q)return a7
q=a9.as
if(q===B.h||q===B.e){q=j.f
r=r.i(0,"soldierLimit")
r.toString
a1=Math.max(0,Math.min(q,b6+B.b.p(r)-a9.gP())-j.e)
if(a1>0){if(g.x===B.k)return a7
if(!j.aC(a1))return a7
B.a.k(i,new A.z(B.p,a7,a9.c,a7,a1,B.d))}r=t.S
a2=A.Y(r,r)
for(r=b5.length,q=j.w,g=g.x===B.k,a3=0;a3<b5.length;b5.length===r||(0,A.u)(b5),++a3){a4=b5[a3]
a2.aj(a4,new A.fF(),new A.fG())
m=q.i(0,a4)
if(m==null)m=0
h=a2.i(0,a4)
h.toString
if(m<h){if(g)return a7
if(!j.by(a4))return a7
B.a.k(i,new A.z(B.y,a7,a7,a7,a4,B.d))}}if(!j.cv(a9,b5,a0,p))return a7
if(j.e<b6)return a7
if(c0==="intercept"||b.length>1)s=a7
B.a.k(i,new A.z(B.L,o,s,J.dp(b),0,b5))}else{if(!j.cK(a9,a0))return a7
if(c0==="intercept"||b.length>1)s=a7
B.a.k(i,new A.z(B.M,o,s,J.dp(b),0,B.d))}a5=j.ae(b3).a
s=j.d
if(s>=a5)s=l&&s===0
else s=!0
if(s)return a7
s=A.b([a9],t.e)
if(!k)s.push(b4)
r=f.O(a9.c)
r.toString
r=A.b([r],t.Y)
r.push(c1)
return new A.d1(j,new A.L(b9,i,a6.a5(s,r),A.b([a0],t.m),a5,b3))},
bR(a,b,c,d,e,f,g,h,i,j){return this.ah(a,b,c,d,e,f,null,B.d,0,0,g,h,i,j)},
b6(a,b,c,d,e,f,g,h,i){return this.ah(a,b,c,!1,1/0,!1,null,d,e,f,!1,g,h,i)},
b5(a,b,c,d,e,f,g,h,i){return this.ah(a,b,c,d,e,f,null,B.d,0,0,!1,g,h,i)},
bU(a,b,c,d,e,f,g,h,i){return this.ah(a,b,c,!1,d,e,f,B.d,0,0,!1,g,h,i)},
bS(a,b,c,d,e,f,g,h,i,j,k){return this.ah(a,b,c,!1,d,e,f,g,h,0,!1,i,j,k)},
bT(a,b,c,d,e,f,g,h){return this.ah(a,b,c,!1,d,e,null,B.d,0,0,!1,f,g,h)},
bH(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a5.k1!=null)return B.r
s=this.a.y
r=s.O(a4.c)
r.toString
q=a4.as
p=q===B.h||q===B.e?r.r.bC(r.f,a5.z):a4.z
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
g=h.aV(p)
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
a0=A.v(new A.e(A.b([(m-a)/j,(m+a)/j],t.n),t.db.a(new A.fw()),g),g.h("c.E"))
if(a0.length!==0)b=B.a.a6(a0,B.v)}for(m=s.d,a1=B.r,a2=0;a2<3;++a2){a3=new A.Q(q+l*b,r+k*b)
if(!h.q(0,a3)||B.a.N(m,new A.fx(a3)))return B.r
a1=i.cQ(a4,a3,s)
if(!a1.d)return a1
j=a1.b
if(Math.abs(b-j)<0.1)break
b=(b+j)/2}return a1}}
A.fy.prototype={
$1(a){var s
t.o.a(a)
s=this.b.w.i(0,a.a)
if((s==null?0:s)<=0){s=this.a.a
s=s.x!==B.k&&a.f&&s.y.gU().gm(0)>=a.e}else s=!0
return s},
$S:14}
A.fz.prototype={
$2(a,b){var s,r=t.o
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.c.v(a.a,b.a):B.c.v(r,s)},
$S:51}
A.fA.prototype={
$1(a){return t.o.a(a).d<this.a.gaD()},
$S:14}
A.fB.prototype={
$2(a,b){var s=t.o
s.a(a)
s.a(b)
return a.c-a.d>b.c-b.d?a:b},
$S:45}
A.fC.prototype={
$1(a){t.L.a(a)
return a.length===1&&J.dp(a)===this.a.a},
$S:26}
A.fD.prototype={
$1(a){var s
t.o.a(a)
if(a.d>0){s=this.a.w.i(0,a.a)
s=(s==null?0:s)>0}else s=!1
return s},
$S:14}
A.fE.prototype={
$1(a){t.L.a(a)
return a.length===1&&J.dp(a)===this.a.a},
$S:26}
A.fF.prototype={
$1(a){return A.d(a)+1},
$S:5}
A.fG.prototype={
$0(){return 1},
$S:4}
A.fw.prototype={
$1(a){return A.at(a)>=0},
$S:11}
A.fx.prototype={
$1(a){return t.q.a(a).r.q(0,this.a)},
$S:2}
A.au.prototype={
az(){return"AiDecisionStage."+this.b}}
A.ah.prototype={
az(){return"AiActionKind."+this.b}}
A.z.prototype={
D(){var s=this,r=s.d
r=r==null?null:A.b([r.a,r.b],t.n)
return A.O(["kind",s.a.a,"hero",s.b,"city",s.c,"point",r,"amount",s.e,"weapons",s.f],t.N,t.X)}}
A.a8.prototype={
D(){var s,r,q,p,o,n=this,m=A.b([],t.b)
for(s=n.f,r=s.length,q=t.n,p=0;p<s.length;s.length===r||(0,A.u)(s),++p){o=s[p]
m.push(A.b([o.a,o.b],q))}return A.O(["hero",n.a,"role",n.b,"deadline",n.w,"commit",n.x,"city",n.d,"enemy",n.e,"points",m,"leg",n.r,"gold",n.y,"slot",n.z,"reason",n.c,"order",n.Q],t.N,t.X)}}
A.L.prototype={
D(){var s,r,q,p=this,o=t.d,n=A.b([],o)
for(s=p.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q)n.push(s[q].D())
o=A.b([],o)
for(s=p.d,r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q)o.push(s[q].D())
return A.O(["reason",p.a,"actions",n,"deps",p.c,"tasks",o,"floor",p.e,"emergency",p.f],t.N,t.X)}}
A.bC.prototype={
D(){var s,r,q,p=this,o=A.b([],t.d)
for(s=p.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q)o.push(s[q].D())
return A.O(["phase",p.a,"target",p.b,"gold",p.c,"heroes",p.d,"groups",o,"notes",p.f,"limited",p.r,"assessments",p.w,"routeSteps",p.x,"expansions",p.y],t.N,t.X)}}
A.dT.prototype={
D(){var s,r,q,p=this,o=p.y.D(),n=A.b([],t.d)
for(s=p.z,r=s.length,q=0;q<s.length;s.length===r||(0,A.u)(s),++q)n.push(s[q].D())
return A.O(["protocol",1,"session",p.a,"id",p.d,"rules",p.b,"map",p.c,"observation",o,"deadline",p.e,"tasks",n,"seed",p.f,"priority",p.r,"idle",p.w,"stage",p.x.b],t.N,t.X)}}
A.dS.prototype={
D(){var s=this
return A.O(["protocol",1,"session",s.a,"id",s.d,"country",s.e,"rules",s.b,"map",s.c,"tick",s.f,"deadline",s.r,"plan",s.x.D(),"micros",s.w,"error",s.y],t.N,t.X)}}
A.hI.prototype={
$1(a){return t.u.a(a).a===this.a.b},
$S:8}
A.fK.prototype={
cI(d9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6=this,d7=null,d8={}
d8.a=d9
s=d6.a.y
r=A.b([],t.Z)
q=new A.fM(d6)
p=new A.fL(d8,d6,r)
o=s.gU()
n=A.v(o,o.$ti.h("c.E"))
B.a.F(n,new A.fN(d6))
o=t.S
m=Math.min(d8.a.f,B.a.H(n,0,new A.fO(d8,d6),o))
if(n.length!==0&&m>d8.a.e){l=d8.a.K()
k=d6.b
j=Math.max(0,l.d-Math.max(l.S().a,k.r.f))
i=l.e
k=k.b.i(0,"soldierCost")
k.toString
h=Math.min(m-i,B.b.ba(j,B.b.p(k)))
if(h>0&&l.aC(h)&&q.$1(l))p.$4(l,A.b([new A.z(B.p,d7,B.a.gG(n).a,d7,h,B.d)],t.w),"\u6309\u5168\u56fd\u73b0\u6709\u5b88\u5c06\u548c\u5f85\u51fa\u5f81\u5c06\u9886\u8865\u5175\uff0c\u4fdd\u7559\u7cae\u8349\u3001\u6708\u4ff8\u548c\u6d41\u52a8\u8d44\u91d1",B.a.gG(n))}for(k=n.length,i=s.d,g=d6.b,f=g.r,e=f.at-2,d=d6.e,c=t.w,b=0;b<n.length;n.length===k||(0,A.u)(n),++b){a=n[b]
if(r.length>=e)break
a0=a.a
a1=d8.a.C(a0)
a2=A.j(a1)
a3=a2.h("e<1>")
a4=A.v(new A.e(a1,a2.h("f(1)").a(new A.fP()),a3),a3.h("c.E"))
B.a.F(a4,new A.fR())
a5=B.a.N(i,new A.fS(s))&&d8.a.I(a0)<Math.max(1,a.e)+1
if(a4.length!==0)if(a.ax==null){a2=a1.length
a3=d8.a.x.i(0,a0)
a6=!0
if(a3==null)a3=a.d
if(a2<=a3){if(a5){a2=a1.length
a3=d8.a.x.i(0,a0)
if(a3==null)a3=a.d
a3=a2>=a3
a2=a3}else a2=!1
if(!a2){a2=d.i(0,a0)
if(a2==null)a2=d7
else{a2=a2.f
a2=a2==null?d7:a2.a}a2=a2===B.t}else a2=a6}else a2=a6}else a2=!1
else a2=!1
if(a2){l=d8.a.K()
if(l.aG(a,B.a.gG(a4))&&q.$1(l))p.$5$hero(l,A.b([new A.z(B.o,B.a.gG(a4).a,a0,d7,0,B.d)],c),"\u63d0\u9ad8\u5fc5\u8981\u57ce\u9632\u4e0e\u8fce\u6218\u540d\u989d\uff0c\u4fdd\u7559\u5df2\u51fa\u5f81\u90e8\u961f\u7684\u540e\u52e4\u8d44\u91d1",a,B.a.gG(a4))}if(a5){a2=d8.a.I(a0)
a3=a.ax
if(a3==null)a3=a.d
else{a6=a.db?1:0
a6=B.c.A(a3-a.ay-a6,0,5)
a3=a6}a3=a2<a3
a2=a3}else a2=!1
if(a2){l=d8.a.K()
if(l.b1(a)&&q.$1(l))p.$4(l,A.b([new A.z(B.u,d7,a0,d7,0,B.d)],c),"\u8865\u5145\u7559\u5b88\u548c\u540e\u7eed\u6269\u5f20\u6240\u9700\u5c06\u9886\uff0c\u7b7e\u7ea6\u4e0e\u6708\u4ff8\u6309\u6700\u9ad8\u8d39\u7528\u9884\u7559",a)}}a7=A.b([],t.e)
for(k=n.length,b=0;b<n.length;n.length===k||(0,A.u)(n),++b){a=n[b]
e=a.a
a0=d.i(0,e)
if(a0==null)a0=d7
else a0=a0.d.length!==0||a0.a.ax!=null
if(a0===!0)continue
a1=d8.a.C(e)
e=A.j(a1)
a0=e.h("e<1>")
a8=A.v(new A.e(a1,e.h("f(1)").a(new A.fT()),a0),a0.h("c.E"))
B.a.F(a8,new A.fU())
e=A.d(Math.max(0,a1.length-Math.max(1,a.e)))
a0=A.j(a8)
a2=new A.I(a8,0,e,a0.h("I<1>"))
a2.a3(a8,0,e,a0.c)
B.a.B(a7,a2)}B.a.F(a7,new A.fV())
a9=d7
b0=0
b1=1
if(a7.length!==0){b2=B.a.gG(a7)
k=A.j(i)
e=k.h("e<1>")
b3=A.v(new A.e(i,k.h("f(1)").a(new A.fW(s)),e),e.h("c.E"))
B.a.F(b3,new A.fX(d6,b2,s))
k=A.a6(b3,0,A.Z(f.ay,"count",o),A.j(b3).c)
i=k.$ti
k=new A.w(k,k.gm(0),i.h("w<k.E>"))
f=d6.c
e=f.c
d=g.b
a0=d6.d
i=i.h("k.E")
a2=b2.c
b4=b0
b5=a9
b6=!1
for(;;){if(!k.j()){b0=b4
a9=b5
break}a3=k.d
if(a3==null)a3=i.a(a3)
for(a6=f.aF(b2,d8.a),b7=a6.length,b8=a3.f,b9=a3.a,b=0;b<a6.length;a6.length===b7||(0,A.u)(a6),++b){c0=a6[b]
c1={}
c2=A.ik(b2,a3,s,g,a0,c0,0).b
if(c2===0||c2>a7.length)continue
c3=d8.a.K()
c3.d=1e6
c1.a=c3
c4=A.b([],c)
c6=0
for(;;){c5=!1
if(!(c6<c2)){c5=!0
break}if(!(c6<a7.length))return A.l(a7,c6)
c7=a7[c6]
if(A.ik(c7,a3,s,g,a0,c0,0).b===0)break
c8=e.b3(c7,b8,s,a3)
c9=B.a.H(n,0,new A.fY(c1,d6,c7),o)
d0=c1.a
d1=d0.f
d2=d.i(0,"soldierLimit")
d2.toString
d3=f.b6(d0,c7,c8,c0,Math.min(c9,Math.max(0,d1-B.b.p(d2))),c6,"\u6309\u5171\u540c\u653b\u9632\u95e8\u69db\u6838\u7b97\u6574\u961f\u6b66\u5668\u4e0e\u8def\u8d39","expedition",a3)
if(d3==null)break
c1.a=d3.a
d0=d3.b.b
d1=A.j(d0)
B.a.B(c4,new A.e(d0,d1.h("f(1)").a(new A.fQ()),d1.h("e<1>")));++c6}if(!c5)continue
d0=c1.a
d4=1e6-d0.d+d0.S().a
d0=d8.a
if(d0.d<d4){if(b4===0||d4<b4){b1=c2
b4=d4
b5=b9}continue}l=d0.K()
d0=c4.length
d5=0
for(;;){if(!(d5<c4.length)){c5=!0
break}if(!l.by(c4[d5].e)){c5=!1
break}c4.length===d0||(0,A.u)(c4);++d5}if(!c5||!q.$1(l))continue
if(c4.length!==0){a3=s.O(a2)
a3.toString
p.$4(l,c4,"\u6309\u76ee\u6807\u57ce\u9632\u4e0e\u5b88\u5c06\u914d\u9f50"+c2+"\u540d\u8fdb\u653b\u5c06\u9886\u7684\u6b66\u5668\uff0c\u9884\u7559\u6574\u961f\u7cae\u8349",a3)}b4=b0
b5=a9
b6=!0
break}if(b6){b0=b4
a9=b5
break}}}o=a9==null?"preparing":"saving"
k=d6.d.b
i=k.e
g=k.c
f=k.d
k=k.b
return new A.bC(o,a9,b0,b1,r,r.length===0?A.b(["\u672c\u8f6e\u65e0\u5fc5\u8981\u4e14\u53ef\u652f\u4ed8\u7684\u91c7\u8d2d\uff0c\u4fdd\u7559\u56fd\u5e93"],t.s):B.ag,i,g,f,k)}}
A.fM.prototype={
$1(a){return a.d>=Math.max(a.S().a,this.a.b.r.f)},
$S:47}
A.fL.prototype={
$5$hero(a,b,c,d,e){var s,r
t.f3.a(b)
this.a.a=a
s=this.b
r=A.b([],t.e)
if(e!=null)r.push(e)
B.a.k(this.c,new A.L(c,b,s.c.a5(r,A.b([d],t.Y)),B.n,Math.max(a.S().a,s.b.r.f),!1))},
$4(a,b,c,d){return this.$5$hero(a,b,c,d,null)},
$S:48}
A.fN.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.a.e
o=o.a(b).a
r=s.i(0,o)
if(r==null)r=null
else r=r.d.length!==0||r.a.ax!=null
r=r===!0?1:0
q=a.a
s=s.i(0,q)
if(s==null)s=null
else s=s.d.length!==0||s.a.ax!=null
p=B.c.v(r,s===!0?1:0)
return p!==0?p:B.c.v(q,o)},
$S:6}
A.fO.prototype={
$2(a,b){var s,r
A.d(a)
t.q.a(b)
s=this.a.a.C(b.a).length
r=this.b.b.b.i(0,"soldierLimit")
r.toString
return a+s*B.b.p(r)},
$S:10}
A.fP.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.fR.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.v(s.a(b).x,a.x)},
$S:1}
A.fS.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:2}
A.fT.prototype={
$1(a){return t.r.a(a).db},
$S:0}
A.fU.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.v(A.aF(s.a(b),!0),A.aF(a,!0))},
$S:1}
A.fV.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.v(A.aF(s.a(b),!0),A.aF(a,!0))},
$S:1}
A.fW.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:2}
A.fX.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.v(A.dm(o.a(b),s,r,p,q),A.dm(a,s,r,p,q))},
$S:6}
A.fY.prototype={
$2(a,b){var s,r,q
A.d(a)
t.q.a(b)
s=b.a
r=this.a.a.C(s).length
r=Math.min(Math.max(0,r-(s===this.c.c?1:0)),Math.max(1,b.e))
q=this.b.b.b.i(0,"soldierLimit")
q.toString
return a+r*B.b.p(q)},
$S:10}
A.fQ.prototype={
$1(a){return t.T.a(a).a===B.y},
$S:49}
A.bx.prototype={}
A.dU.prototype={
a9(b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=b1.a,a7=b1.b,a8=A.r(b0.a)+","+A.r(b0.b)+":"+A.r(a6)+","+A.r(a7),a9=a5.d
if(a9.Z(a8)){a6=a9.i(0,a8)
a6.toString
return a6}for(s=a5.a,r=s.b,q=s.c,p=r+q+8,o=r-1,--q,n=a5.b,m=n.b,n=n.d,s=s.d,l=s.length,k=n.length,j=a5.c,i=b0,h=0,g=0;g<p;++g){f=i.J(b1)
if(f<1e-7){if(a9.a>=256){e=new A.ac(a9,A.q(a9).h("ac<1>")).gu(0)
if(!e.j())A.cu(A.ax())
a9.ad(0,e.gl())}a9.t(0,a8,h)
return h}if(!j.cM())return 1/0
d=i.a
c=(a6-d)/f
b=i.b
a=(a7-b)/f
a0=B.c.A(B.b.V((d+c*1e-7)/16),0,o)
a1=B.c.A(B.b.V((b+a*1e-7)/16),0,q)
a2=new A.dV()
a3=a2.$3(d,c,a0)
a2=a2.$3(b,a,a1)
a4=Math.min(f,Math.min(A.jg(a3),A.jg(a2)))
a2=m.i(0,"marchSpeed")
a2.toString
a3=a1*r+a0
if(!(a3>=0&&a3<l))return A.l(s,a3)
a3=s[a3]
if(!(a3<k))return A.l(n,a3)
h+=a4/(a2*n[a3])
i=new A.Q(d+c*a4,b+a*a4)}return 1/0},
ai(a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=b0.O(a8.c),a5=a8.as,a6=(a5===B.h||a5===B.e)&&a4!=null?a4.r.bC(a4.f,a9):a8.z,a7=b2==null?a9:b2.r.bw(a6,a9)
a5=this.a
if(!a5.q(0,a7))return B.r
s=new A.dW(b0,a8,b2)
r=new A.dY(this,b0,a8)
q=t._
p=A.b([A.b([a7],q)],t.a5)
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
e=new A.Q(l-k*f,i+o*f)
if(a5.q(0,e))B.a.k(p,A.b([e,a7],q))}}for(a5=p.length,d=null,g=0;g<p.length;p.length===a5||(0,A.u)(p),++g){c=p[g]
q=c.length
a=a6
a0=0
a1=!1
a2=0
for(;;){if(!(a2<c.length)){b=!0
break}a3=c[a2]
if(s.$2(a,a3)){b=!1
break}a1=a1||r.$2(a,a3)
a0+=this.a9(a,a3)
c.length===q||(0,A.u)(c);++a2
a=a3}q=!0
if(b)if(isFinite(a0))q=b1&&a1
if(q)continue
if(d==null||a0<d.b)d=new A.bx(c,a0,!0)}return d==null?B.S:d},
b3(a,b,c,d){return this.ai(a,b,c,!1,d)},
cQ(a,b,c){return this.ai(a,b,c,!1,null)}}
A.dV.prototype={
$3(a,b,c){var s
if(Math.abs(b)<1e-12)s=1/0
else s=Math.max(1e-8,((b>0?c+1:c)*16-a)/b)
return s},
$S:50}
A.dW.prototype={
$2(a,b){return B.a.N(this.a.d,new A.dX(this.b,this.c,a,b))},
$S:19}
A.dX.prototype={
$1(a){var s,r=this
t.q.a(a)
if(a.b!==r.a.b){s=r.b
s=s==null?null:s.a
s=a.a!==s&&a.r.bF(r.c,r.d)!=null}else s=!1
return s},
$S:2}
A.dY.prototype={
$2(a,b){return B.a.N(this.b.e,new A.dZ(this.a,this.c,b,a))},
$S:19}
A.dZ.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this
t.r.a(a)
if(a.b!==j.b.b){s=a.as
s=s===B.h||s===B.e||a.fy||a.f<=0}else s=!0
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
l=B.b.A(((k.a-q)*p+(k.b-o)*n)/m,0,1)}s=r.ap(s,l).J(a.z)
r=j.a.b.b.i(0,"encounterDistance")
r.toString
return s<r+12},
$S:0}
A.R.prototype={
D(){var s=this
return A.b([s.a,s.b,s.c,s.d,s.e,s.f,s.r],t.Q)}}
A.e_.prototype={
D(){var s,r,q,p=this,o=A.b([],t.eG)
for(s=p.f.gb4(),s=s.gu(s),r=t.Q;s.j();){q=s.gl()
o.push(A.b([q.a,q.b,q.c,q.d,q.e,q.f,q.r],r))}return A.O(["version",p.a,"values",p.b,"upgrades",p.c,"movement",p.d,"field",p.e,"weapons",o,"tuning",p.r.D()],t.N,t.X)}}
A.dH.prototype={
aV(a){var s=this.d,r=this.b
r=B.c.A(B.b.V(a.b/16),0,this.c-1)*r+B.c.A(B.b.V(a.a/16),0,r-1)
if(!(r>=0&&r<s.length))return A.l(s,r)
return s[r]},
q(a,b){var s,r=b.a
if(isFinite(r)){s=b.b
r=isFinite(s)&&r>=0&&s>=0&&r<this.b*16&&s<this.c*16}else r=!1
return r},
D(){var s=this
return A.O(["version",s.a,"width",s.b,"height",s.c,"terrain",s.d],t.N,t.X)}}
A.e1.prototype={
cJ(a){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=t.d1.a(B.i.ct(a,null))
switch(J.aU(s,"kind")){case"init":if(!J.aq(J.aU(s,"protocol"),1)||!J.aq(J.aU(s,"build"),"28093e66"))throw A.h(B.a4);++i.f
i.e=null
p=i.r
if(p.a>0){p.b=p.c=p.d=p.e=p.f=null
p.a=0
p.aL()}p=t.f
o=t.N
n=t.z
i.c=A.jP(A.ak(p.a(J.aU(s,"rules")),o,n))
n=A.ak(p.a(J.aU(s,"map")),o,n)
p=A.F(n.i(0,"version"))
m=A.d(n.i(0,"width"))
l=A.d(n.i(0,"height"))
n=A.bU(t.R.a(n.i(0,"terrain")),!0,t.S)
k=new Uint8Array(A.l0(n))
if(m<=0||l<=0||n.length!==m*l)A.cu(B.a6)
i.d=new A.dH(p,m,l,k)
i.a.$1(B.i.ag(t.G.a(A.O(["kind","ready","rules",i.c.a,"map",p,"backend",i.b],o,t.X)),null))
break
case"cancel":p=i.e
o=J.aU(s,"id")
if(p==null?o==null:p===o)i.r.k(0,A.d(J.aU(s,"id")))
break
case"plan":if(i.c==null||i.d==null||i.e!=null){p=A.iN("AI \u5c1a\u672a\u5c31\u7eea\u6216\u5df2\u6709\u8bf7\u6c42\u6267\u884c\u4e2d")
throw A.h(p)}r=A.jN(A.ak(t.f.a(J.aU(s,"request")),t.N,t.z))
i.e=r.d
i.aB(r,i.f)
break
default:throw A.h(B.a5)}}catch(j){q=A.aH(j)
i.a.$1(B.i.ag(t.G.a(A.O(["kind","error","message",J.bc(q)],t.N,t.X)),null))}},
aB(a,b){return this.cd(a,b)},
cd(a3,a4){var s=0,r=A.ll(t.p),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
var $async$aB=A.lA(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:a1=new A.h_()
$.it()
a1.b7()
m=a1
p=4
i=n.c
i.toString
h=n.d
h.toString
g=new A.e0(i.r)
f=new A.e9(i,h,a3,g,A.Y(t.S,t.a))
e=t.N
h=new A.dU(h,i,g,A.Y(e,t.i))
f.e=h
f.f=new A.e5(i,g,A.Y(e,t.cM))
f.r=new A.fv(a3,i,h)
l=f
k=0
i=l.b8(),h=i.$ti,i=new A.aD(i.a(),h.h("aD<1>")),h=h.c,g=n.r,d=a3.d,c=t.p
case 7:if(!i.j()){s=8
break}b=i.b
if(b==null)h.a(b)
if(a4!==n.f||g.q(0,d)){if(a4===n.f){n.e=null
g.ad(0,d)
n.a.$1(B.i.ag(t.G.a(A.O(["kind","cancelled","id",d],e,t.X)),null))}s=1
break}b=k
if(typeof b!=="number"){q=b.cV()
s=1
break}a=b+1
k=a
s=a>=n.c.r.ch?9:10
break
case 9:k=0
b=m
if(b.b==null)b.b=$.fJ.$0()
s=11
return A.kT(A.k2(B.E,c),$async$aB)
case 11:m.b7()
case 10:s=7
break
case 8:if(a4!==n.f){s=1
break}if(g.ad(0,d)){n.e=null
n.a.$1(B.i.ag(t.G.a(A.O(["kind","cancelled","id",d],e,t.X)),null))
s=1
break}n.e=null
i=l.w
i.toString
n.a.$1(B.i.ag(t.G.a(A.O(["kind","reply","reply",A.iy(a3,i,null,m.gbE()).D()],e,t.X)),null))
p=2
s=6
break
case 4:p=3
a2=o.pop()
j=A.aH(a2)
if(a4!==n.f){s=1
break}n.e=null
i=A.b(["\u89c4\u5212\u5931\u8d25\uff0c\u4e3b\u73af\u5883\u4fdd\u7559\u6709\u9650\u5b89\u5168\u4fdd\u62a4"],t.s)
h=m.gbE()
n.a.$1(B.i.ag(t.G.a(A.O(["kind","reply","reply",A.iy(a3,new A.bC("preparing",null,0,1,B.af,i,!1,0,0,0),J.bc(j),h).D()],t.N,t.X)),null))
s=6
break
case 3:s=2
break
case 6:case 1:return A.kV(q,r)
case 2:return A.kU(o.at(-1),r)}})
return A.kW($async$aB,r)}}
A.hV.prototype={
$1(a){t.r.a(a)
return a.w*3+a.f*0.35+a.gP()*8},
$S:52}
A.hW.prototype={
$1(a){return t.q.a(a).b===this.a.b},
$S:2}
A.hX.prototype={
$1(a){var s
t.r.a(a)
if(a.c===this.a.a){s=a.as
s=!(s===B.h||s===B.e)}else s=!1
return s},
$S:0}
A.hY.prototype={
$2(a,b){var s
A.at(a)
t.r.a(b)
s=A.aa(b)
return a+s*(b.k1==null?0.12:0.03)},
$S:16}
A.X.prototype={}
A.aj.prototype={
ga4(){var s,r=this.a
if(r.ax!=null)r=r.dx
else{r=this.d
if(r.length===0)r=1/0
else{s=A.j(r)
s=new A.a4(r,s.h("i(1)").a(new A.e4()),s.h("a4<1,i>")).a6(0,B.v)
r=s}}return r}}
A.e4.prototype={
$1(a){return t.O.a(a).b},
$S:54}
A.h1.prototype={
cL(c1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6=this,b7="marchSpeed",b8=b6.a,b9=b8.C(c1.a),c0=A.b([],t.D)
for(s=b8.e,r=s.length,q=b6.b,p=q.r.b,o=c1.r,n=c1.f,m=b6.c,l=n.a,k=n.b,q=q.b,j=c1.ch,i=c1.b,h=m.c,g=0;g<r;++g){f=s[g]
if(f.b!==i){e=f.as
e=e===B.h||e===B.e||f.f<=0}else e=!0
if(e)continue
if(f.a===j){B.a.k(c0,new A.X(f,0))
continue}if(f.fy)continue
e=f.z
d=e.J(n)
c=q.i(0,b7)
c.toString
if(d>c*p+80)continue
c=f.Q
b=c.a
c=c.b
a=Math.sqrt(b*b+c*c)
a0=a<0.01?0:((l-e.a)*b+(k-e.b)*c)/(Math.max(1,d)*a)
if(a0<0.45&&d>72)continue
if(d>72){a1=Math.max(0,d*a0)
a2=new A.Q(e.a+b/a*a1,e.b+c/a*a1)
if(o.ar(a2).J(a2)>48)continue}a3=o.bw(e,n)
a4=m.a9(e,a3)
if(!isFinite(a4)&&h.e){e=e.J(a3)
c=q.i(0,b7)
c.toString
a4=e/c}if(a4>p||!isFinite(a4))continue
B.a.k(c0,new A.X(f,a4))}B.a.F(c0,new A.h2())
r=A.j(b9)
p=t.r
a5=A.cL(new A.e(b9,r.h("f(1)").a(new A.h3(c1)),r.h("e<1>")),p)
o=A.b([],t.e)
if(a5!=null)o.push(a5)
r=r.h("U<1>")
B.a.B(o,new A.U(b9,r).b9(0,r.h("f(k.E)").a(new A.h4(a5))))
r=t.S
a6=A.a6(o,0,A.Z(c1.ga8(),"count",r),p).a7(0)
a7=A.Y(t.N,r)
a8=B.a.ao(b8.f,new A.h5(c1)).c
for(b8=a6.length,g=0;r=a6.length,g<r;a6.length===b8||(0,A.u)(a6),++g){a9=a6[g]
if(a9.as===B.e)b0=0
else{r=q.i(0,"soldierLimit")
r.toString
b0=Math.min(a8,B.b.p(r)-a9.gP())}a8-=b0
a7.t(0,a9.a,a9.gP()+b0)}b8=c0.length
b1=null
if(b8!==0&&r!==0)for(r=c1.db,q=c1.ax,p=c1.ay,o=q==null,n=b6.d,m=c1.d,b2=0;b2<a6.length;++b2,b8=k){b3=a6[b2]
for(l=b3.a,b4=null,g=0;k=c0.length,g<k;c0.length===b8||(0,A.u)(c0),++g){k=c0[g].a
if(o)j=m
else{j=r?1:0
j=B.c.A(q-p-j,0,5)}b5=n.aX(b3,k,k.ok,Math.max(1,j-b2),!1,a7.i(0,l))
if(b4==null||b5.b<b4.b)b4=b5}if(b1==null||b4.b>b1.b)b1=b4}b8=A.j(s)
return new A.aj(c1,b9,c0,b1,new A.e(s,b8.h("f(1)").a(new A.h6(c1)),b8.h("e<1>")).H(0,0,new A.h7(),t.i))}}
A.h2.prototype={
$2(a,b){var s,r=t.O
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.m.v(a.a.a,b.a.a):B.b.v(r,s)},
$S:55}
A.h3.prototype={
$1(a){return t.r.a(a).a===this.a.CW},
$S:0}
A.h4.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.h5.prototype={
$1(a){return t.u.a(a).a===this.a.b},
$S:8}
A.h6.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=!1
if(a.b===s.b)if(a.c===s.a){s=a.as
s=!(s===B.h||s===B.e)&&!a.fy}else s=r
else s=r
return s},
$S:0}
A.h7.prototype={
$2(a,b){return A.at(a)+A.aa(t.r.a(b))},
$S:16}
A.e0.prototype={
Y(){var s=this,r=s.b
if(r>=s.a.y){s.e=!0
return!1}s.b=r+1
return!0},
cm(){var s=this,r=s.c
if(r>=s.a.z){s.e=!0
return!1}s.c=r+1
return!0},
cM(){var s=this,r=s.d
if(r>=s.a.Q){s.e=!0
return!1}s.d=r+1
return!0}}
A.hS.prototype={
$1(a){A.F(a)
return A.hC(v.G.self).postMessage(a)},
$S:56}
A.hT.prototype={
$1(a){return this.a.cJ(A.F(A.hC(a).data))},
$S:57};(function aliases(){var s=J.aL.prototype
s.bW=s.n
s=A.c.prototype
s.b9=s.cS})();(function installTearOffs(){var s=hunkHelpers._static_0,r=hunkHelpers._static_1,q=hunkHelpers.installStaticTearOff
s(A,"lk","kd",4)
r(A,"lC","kr",9)
r(A,"lD","ks",9)
r(A,"lE","kt",9)
s(A,"jf","lv",3)
r(A,"lG","kZ",18)
q(A,"lX",2,null,["$1$2","$2"],["jn",function(a,b){return A.jn(a,b,t.H)}],24,0)
q(A,"lW",2,null,["$1$2","$2"],["jm",function(a,b){return A.jm(a,b,t.H)}],24,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.x,null)
q(A.x,[A.i2,J.cK,A.c2,J.aW,A.A,A.fZ,A.c,A.w,A.bV,A.J,A.bI,A.b2,A.bF,A.ca,A.a1,A.as,A.bf,A.bz,A.cb,A.a0,A.h8,A.fu,A.bG,A.ch,A.C,A.fo,A.bS,A.az,A.bR,A.al,A.dd,A.hz,A.hx,A.d9,A.aD,A.ai,A.b3,A.P,A.da,A.di,A.cn,A.bi,A.dg,A.b6,A.B,A.cm,A.cC,A.cE,A.hs,A.cF,A.db,A.d_,A.c3,A.he,A.av,A.a3,A.a5,A.dj,A.h_,A.bj,A.aO,A.e3,A.aI,A.by,A.e5,A.cw,A.am,A.e9,A.a9,A.eJ,A.Q,A.dQ,A.p,A.W,A.aV,A.dI,A.d1,A.fv,A.z,A.a8,A.L,A.bC,A.dT,A.dS,A.fK,A.bx,A.dU,A.R,A.e_,A.dH,A.e1,A.X,A.aj,A.h1,A.e0])
q(J.cK,[J.cN,J.bK,J.bN,J.bM,J.bO,J.bL,J.be])
q(J.bN,[J.aL,J.o,A.bg,A.bY])
q(J.aL,[J.d0,J.c5,J.aK])
r(J.cM,A.c2)
r(J.fj,J.o)
q(J.bL,[J.bJ,J.cO])
q(A.A,[A.bQ,A.aB,A.cP,A.d8,A.d4,A.dc,A.bP,A.cy,A.ar,A.c7,A.d7,A.c4,A.cD])
q(A.c,[A.m,A.b_,A.e,A.bH,A.b1,A.c9,A.b5,A.an])
q(A.m,[A.k,A.ac,A.ad,A.aZ])
q(A.k,[A.I,A.a4,A.U,A.df])
r(A.bD,A.b_)
r(A.bE,A.b1)
q(A.as,[A.b8,A.bk])
q(A.b8,[A.bl,A.bm])
r(A.bn,A.bk)
r(A.bp,A.bf)
r(A.c6,A.bp)
r(A.bA,A.c6)
r(A.bB,A.bz)
q(A.a0,[A.cJ,A.cA,A.cB,A.d6,A.hO,A.hQ,A.hb,A.ha,A.hD,A.ho,A.fr,A.ds,A.dG,A.dw,A.dx,A.dy,A.dA,A.dD,A.dE,A.du,A.ei,A.ej,A.eD,A.eE,A.eF,A.eG,A.eH,A.el,A.en,A.eo,A.eq,A.er,A.ew,A.ez,A.eB,A.eg,A.eh,A.ef,A.eb,A.ee,A.ea,A.fh,A.ff,A.fe,A.fg,A.fd,A.eK,A.eM,A.f_,A.f0,A.f2,A.f4,A.eN,A.eP,A.eR,A.eT,A.eV,A.eZ,A.fa,A.fc,A.f6,A.f8,A.f9,A.dr,A.dO,A.dP,A.dL,A.dK,A.dN,A.dJ,A.fy,A.fA,A.fC,A.fD,A.fE,A.fF,A.fw,A.fx,A.hI,A.fM,A.fL,A.fP,A.fS,A.fT,A.fW,A.fQ,A.dV,A.dX,A.dZ,A.hV,A.hW,A.hX,A.e4,A.h3,A.h4,A.h5,A.h6,A.hS,A.hT])
r(A.aY,A.cJ)
q(A.cA,[A.fH,A.hc,A.hd,A.hy,A.fi,A.hf,A.hk,A.hj,A.hh,A.hg,A.hn,A.hm,A.hl,A.hw,A.hG,A.dt,A.dF,A.dv,A.ep,A.ex,A.fG])
r(A.c_,A.aB)
q(A.d6,[A.d5,A.bd])
q(A.C,[A.ay,A.de])
q(A.cB,[A.fk,A.hP,A.hE,A.hH,A.hp,A.fp,A.ft,A.ht,A.dz,A.dB,A.dC,A.e6,A.e7,A.hN,A.ek,A.ev,A.eC,A.eI,A.em,A.es,A.et,A.eu,A.ey,A.eA,A.ec,A.ed,A.eL,A.eX,A.f1,A.f3,A.f5,A.eO,A.eQ,A.eS,A.eU,A.eW,A.eY,A.fb,A.f7,A.dq,A.dM,A.fz,A.fB,A.fN,A.fO,A.fR,A.fU,A.fV,A.fX,A.fY,A.dW,A.dY,A.hY,A.h2,A.h7])
q(A.bY,[A.cR,A.bh])
q(A.bh,[A.cc,A.ce])
r(A.cd,A.cc)
r(A.bW,A.cd)
r(A.cf,A.ce)
r(A.bX,A.cf)
q(A.bW,[A.cS,A.cT])
q(A.bX,[A.cU,A.cV,A.cW,A.cX,A.cY,A.bZ,A.cZ])
r(A.bo,A.dc)
r(A.dh,A.cn)
r(A.cg,A.bi)
r(A.aP,A.cg)
r(A.cQ,A.bP)
r(A.fl,A.cC)
q(A.cE,[A.fn,A.fm])
r(A.hr,A.hs)
q(A.ar,[A.c0,A.cI])
q(A.db,[A.aX,A.af,A.au,A.ah])
s(A.cc,A.B)
s(A.cd,A.a1)
s(A.ce,A.B)
s(A.cf,A.a1)
s(A.bp,A.cm)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",i:"double",V:"num",E:"String",f:"bool",a5:"Null",n:"List",x:"Object",a2:"Map",H:"JSObject"},mangledNames:{},types:["f(p)","a(p,p)","f(W)","~()","a()","a(a)","a(W,W)","f(a8)","f(aV)","~(~())","a(a,W)","f(i)","i(V,i)","a(a,L)","f(R)","p(p,p)","i(i,p)","a5()","@(@)","f(Q,Q)","f(aj)","~(x?,x?)","f(L)","p(X)","0^(0^,0^)<V>","a5(@)","f(n<a>)","~(@,@)","f(a)","a(a,aO)","a(a,p)","a(a,a)","f(X)","a5(@,aN)","f(a9)","V(V,a)","n<a8>(L)","i(i,a8)","a5(~())","~(@)","i(V,p)","p?(z)","i(i,E)","@(E)","a(aj,aj)","R(R,R)","a5(x,aN)","f(aI)","~(aI,n<z>,E,W{hero:p?})","f(z)","i(i,i,a)","a(R,R)","i(p)","a(am,am)","i(X)","a(X,X)","~(E)","~(H)","@(@,E)","~(a,@)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"3;":(a,b,c)=>d=>d instanceof A.bl&&a.b(d.a)&&b.b(d.b)&&c.b(d.c),"3;lower,teamSize,upper":(a,b,c)=>d=>d instanceof A.bm&&a.b(d.a)&&b.b(d.b)&&c.b(d.c),"4;high,low,selfHigh,selfLow":a=>b=>b instanceof A.bn&&A.lY(a,b.a)}}
A.kN(v.typeUniverse,JSON.parse('{"aK":"aL","d0":"aL","c5":"aL","m5":"bg","cN":{"f":[],"y":[]},"bK":{"y":[]},"bN":{"H":[]},"aL":{"H":[]},"o":{"n":["1"],"m":["1"],"H":[],"c":["1"]},"cM":{"c2":[]},"fj":{"o":["1"],"n":["1"],"m":["1"],"H":[],"c":["1"]},"aW":{"D":["1"]},"bL":{"i":[],"V":[]},"bJ":{"i":[],"a":[],"V":[],"y":[]},"cO":{"i":[],"V":[],"y":[]},"be":{"E":[],"y":[]},"bQ":{"A":[]},"m":{"c":["1"]},"k":{"m":["1"],"c":["1"]},"I":{"k":["1"],"m":["1"],"c":["1"],"c.E":"1","k.E":"1"},"w":{"D":["1"]},"b_":{"c":["2"],"c.E":"2"},"bD":{"b_":["1","2"],"m":["2"],"c":["2"],"c.E":"2"},"bV":{"D":["2"]},"a4":{"k":["2"],"m":["2"],"c":["2"],"c.E":"2","k.E":"2"},"e":{"c":["1"],"c.E":"1"},"J":{"D":["1"]},"bH":{"c":["2"],"c.E":"2"},"bI":{"D":["2"]},"b1":{"c":["1"],"c.E":"1"},"bE":{"b1":["1"],"m":["1"],"c":["1"],"c.E":"1"},"b2":{"D":["1"]},"bF":{"D":["1"]},"c9":{"c":["1"],"c.E":"1"},"ca":{"D":["1"]},"U":{"k":["1"],"m":["1"],"c":["1"],"c.E":"1","k.E":"1"},"bl":{"b8":[],"as":[]},"bm":{"b8":[],"as":[]},"bn":{"bk":[],"as":[]},"bA":{"c6":["1","2"],"bp":["1","2"],"bf":["1","2"],"cm":["1","2"],"a2":["1","2"]},"bz":{"a2":["1","2"]},"bB":{"bz":["1","2"],"a2":["1","2"]},"b5":{"c":["1"],"c.E":"1"},"cb":{"D":["1"]},"cJ":{"a0":[],"aw":[]},"aY":{"a0":[],"aw":[]},"c_":{"aB":[],"A":[]},"cP":{"A":[]},"d8":{"A":[]},"ch":{"aN":[]},"a0":{"aw":[]},"cA":{"a0":[],"aw":[]},"cB":{"a0":[],"aw":[]},"d6":{"a0":[],"aw":[]},"d5":{"a0":[],"aw":[]},"bd":{"a0":[],"aw":[]},"d4":{"A":[]},"ay":{"C":["1","2"],"iH":["1","2"],"a2":["1","2"],"C.K":"1","C.V":"2"},"ac":{"m":["1"],"c":["1"],"c.E":"1"},"bS":{"D":["1"]},"ad":{"m":["1"],"c":["1"],"c.E":"1"},"az":{"D":["1"]},"aZ":{"m":["a3<1,2>"],"c":["a3<1,2>"],"c.E":"a3<1,2>"},"bR":{"D":["a3<1,2>"]},"b8":{"as":[]},"bk":{"as":[]},"bg":{"H":[],"y":[]},"bY":{"H":[]},"cR":{"H":[],"y":[]},"bh":{"ab":["1"],"H":[]},"bW":{"B":["i"],"n":["i"],"ab":["i"],"m":["i"],"H":[],"c":["i"],"a1":["i"]},"bX":{"B":["a"],"n":["a"],"ab":["a"],"m":["a"],"H":[],"c":["a"],"a1":["a"]},"cS":{"B":["i"],"n":["i"],"ab":["i"],"m":["i"],"H":[],"c":["i"],"a1":["i"],"y":[],"B.E":"i"},"cT":{"B":["i"],"n":["i"],"ab":["i"],"m":["i"],"H":[],"c":["i"],"a1":["i"],"y":[],"B.E":"i"},"cU":{"B":["a"],"n":["a"],"ab":["a"],"m":["a"],"H":[],"c":["a"],"a1":["a"],"y":[],"B.E":"a"},"cV":{"B":["a"],"n":["a"],"ab":["a"],"m":["a"],"H":[],"c":["a"],"a1":["a"],"y":[],"B.E":"a"},"cW":{"B":["a"],"n":["a"],"ab":["a"],"m":["a"],"H":[],"c":["a"],"a1":["a"],"y":[],"B.E":"a"},"cX":{"B":["a"],"n":["a"],"ab":["a"],"m":["a"],"H":[],"c":["a"],"a1":["a"],"y":[],"B.E":"a"},"cY":{"B":["a"],"n":["a"],"ab":["a"],"m":["a"],"H":[],"c":["a"],"a1":["a"],"y":[],"B.E":"a"},"bZ":{"B":["a"],"n":["a"],"ab":["a"],"m":["a"],"H":[],"c":["a"],"a1":["a"],"y":[],"B.E":"a"},"cZ":{"i9":[],"B":["a"],"n":["a"],"ab":["a"],"m":["a"],"H":[],"c":["a"],"a1":["a"],"y":[],"B.E":"a"},"dc":{"A":[]},"bo":{"aB":[],"A":[]},"aD":{"D":["1"]},"an":{"c":["1"],"c.E":"1"},"ai":{"A":[]},"P":{"aJ":["1"]},"cn":{"iR":[]},"dh":{"cn":[],"iR":[]},"aP":{"bi":["1"],"iJ":["1"],"i7":["1"],"m":["1"],"c":["1"]},"b6":{"D":["1"]},"C":{"a2":["1","2"]},"bf":{"a2":["1","2"]},"c6":{"bp":["1","2"],"bf":["1","2"],"cm":["1","2"],"a2":["1","2"]},"bi":{"i7":["1"],"m":["1"],"c":["1"]},"cg":{"bi":["1"],"i7":["1"],"m":["1"],"c":["1"]},"de":{"C":["E","@"],"a2":["E","@"],"C.K":"E","C.V":"@"},"df":{"k":["E"],"m":["E"],"c":["E"],"c.E":"E","k.E":"E"},"bP":{"A":[]},"cQ":{"A":[]},"i":{"V":[]},"a":{"V":[]},"n":{"m":["1"],"c":["1"]},"db":{"cG":[]},"cy":{"A":[]},"aB":{"A":[]},"ar":{"A":[]},"c0":{"A":[]},"cI":{"A":[]},"c7":{"A":[]},"d7":{"A":[]},"c4":{"A":[]},"cD":{"A":[]},"d_":{"A":[]},"c3":{"A":[]},"dj":{"aN":[]},"bj":{"kk":[]},"aX":{"cG":[]},"af":{"cG":[]},"au":{"cG":[]},"ah":{"cG":[]},"k5":{"n":["a"],"m":["a"],"c":["a"]},"i9":{"n":["a"],"m":["a"],"c":["a"]},"kp":{"n":["a"],"m":["a"],"c":["a"]},"k3":{"n":["a"],"m":["a"],"c":["a"]},"kn":{"n":["a"],"m":["a"],"c":["a"]},"k4":{"n":["a"],"m":["a"],"c":["a"]},"ko":{"n":["a"],"m":["a"],"c":["a"]},"k0":{"n":["i"],"m":["i"],"c":["i"]},"k1":{"n":["i"],"m":["i"],"c":["i"]}}'))
A.kM(v.typeUniverse,JSON.parse('{"m":1,"bh":1,"cg":1,"cC":2,"cE":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.cs
return{T:s("z"),q:s("W"),I:s("L"),u:s("aV"),a9:s("au"),r:s("p"),o:s("R"),J:s("a8"),t:s("ai"),a:s("aj"),cM:s("by"),cs:s("a9"),U:s("m<@>"),V:s("A"),bo:s("bH<L,a8>"),h:s("aw"),O:s("X"),E:s("aY<i>"),fy:s("c<W>"),ef:s("c<p>"),er:s("c<a8>(L)"),R:s("c<@>"),w:s("o<z>"),Y:s("o<W>"),Z:s("o<L>"),eu:s("o<aV>"),e:s("o<p>"),_:s("o<Q>"),W:s("o<R>"),m:s("o<a8>"),bL:s("o<aj>"),D:s("o<X>"),a5:s("o<n<Q>>"),eG:s("o<n<x>>"),b:s("o<n<i>>"),x:s("o<n<a>>"),d:s("o<a2<E,x?>>"),Q:s("o<x>"),eV:s("o<+(aI,n<z>,n<p>)>"),s:s("o<E>"),aD:s("o<aO>"),bQ:s("o<am>"),n:s("o<i>"),k:s("o<@>"),dC:s("o<a>"),v:s("bK"),A:s("H"),cj:s("aK"),aU:s("ab<@>"),f3:s("n<z>"),j:s("n<@>"),L:s("n<a>"),d1:s("a2<E,@>"),f:s("a2<@,@>"),G:s("a2<E,x?>"),P:s("a5"),K:s("x"),gT:s("m6"),bY:s("+()"),l:s("aN"),N:s("E"),aQ:s("I<am>"),gf:s("aO"),dm:s("y"),eK:s("aB"),ak:s("c5"),eq:s("e<i>"),gn:s("c9<p>"),c:s("P<@>"),dp:s("am"),dT:s("an<a9>"),gL:s("an<a>"),y:s("f"),al:s("f(x)"),db:s("f(i)"),i:s("i"),z:s("@"),fO:s("@()"),B:s("@(x)"),C:s("@(x,aN)"),S:s("a"),eH:s("aJ<a5>?"),an:s("H?"),bM:s("n<@>?"),eg:s("n<a>?"),X:s("x?"),dk:s("E?"),F:s("b3<@,@>?"),g:s("dg?"),fQ:s("f?"),cD:s("i?"),h6:s("a?"),cg:s("V?"),H:s("V"),p:s("~"),M:s("~()"),cA:s("~(E,@)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.a9=J.cK.prototype
B.a=J.o.prototype
B.c=J.bJ.prototype
B.b=J.bL.prototype
B.m=J.be.prototype
B.aa=J.aK.prototype
B.ab=J.bN.prototype
B.K=J.d0.prototype
B.w=J.c5.prototype
B.o=new A.ah(0,"upgrade")
B.x=new A.ah(1,"dismiss")
B.u=new A.ah(2,"recruit")
B.p=new A.ah(3,"soldiers")
B.y=new A.ah(4,"buyWeapon")
B.L=new A.ah(5,"dispatch")
B.M=new A.ah(6,"move")
B.N=new A.ah(8,"retreat")
B.h=new A.af(0,"garrison")
B.q=new A.af(2,"camped")
B.e=new A.af(5,"defending")
B.z=new A.af(7,"retreating")
B.A=new A.au(0,"full")
B.B=new A.au(1,"resources")
B.C=new A.au(2,"defense")
B.k=new A.au(3,"attack")
B.J=s([],t._)
B.r=new A.bx(B.J,1/0,!1)
B.S=new A.bx(B.J,1/0,!1)
B.at=new A.cw(8,24,6,1.5,30,12,10,3,1,96,160,6000,8,24,4,6,8,0.12,0.35,0.05,2500,2,60)
B.D=new A.aY(A.lW(),t.E)
B.v=new A.aY(A.lX(),t.E)
B.E=new A.cF()
B.T=new A.bF(A.cs("bF<0&>"))
B.F=function getTagFallback(o) {
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
B.G=function(hooks) { return hooks; }

B.i=new A.fl()
B.a_=new A.d_()
B.l=new A.fZ()
B.j=new A.dh()
B.a0=new A.dj()
B.f=new A.aX(0,"favorable")
B.a1=new A.aX(1,"close")
B.t=new A.aX(2,"unfavorable")
B.H=new A.aX(3,"unknown")
B.au=s(["\u9759\u6001\u8bc4\u4f30\u914d\u989d\u8017\u5c3d"],t.s)
B.a2=new A.by(B.H,-1,1,0,0,!1)
B.a3=new A.av("AI \u534f\u8bae\u7248\u672c\u4e0d\u5339\u914d")
B.a4=new A.av("AI \u6784\u5efa\u7248\u672c\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u751f\u6210 Worker")
B.a5=new A.av("\u672a\u77e5 AI \u5de5\u4f5c\u547d\u4ee4")
B.a6=new A.av("AI \u5730\u56fe\u5c3a\u5bf8\u65e0\u6548")
B.a7=new A.av("\u56fd\u5bb6\u89c4\u5212\u9759\u6001\u7248\u672c\u4e0d\u5339\u914d")
B.a8=new A.av("\u56fd\u5bb6\u89c2\u5bdf\u8d85\u51fa\u534f\u8bae\u5bb9\u91cf")
B.ac=new A.fm(null)
B.ad=new A.fn(null)
B.O=new A.af(1,"marching")
B.P=new A.af(3,"queue")
B.Q=new A.af(4,"attacking")
B.R=new A.af(6,"field")
B.I=s([B.h,B.O,B.q,B.P,B.Q,B.e,B.R,B.z],A.cs("o<af>"))
B.ae=s([B.A,B.B,B.C,B.k],A.cs("o<au>"))
B.af=s([],t.Z)
B.av=s([],t.W)
B.n=s([],t.m)
B.ag=s([],t.s)
B.d=s([],t.dC)
B.ah=A.ap("m1")
B.ai=A.ap("m2")
B.aj=A.ap("k0")
B.ak=A.ap("k1")
B.al=A.ap("k3")
B.am=A.ap("k4")
B.an=A.ap("k5")
B.ao=A.ap("x")
B.ap=A.ap("kn")
B.aq=A.ap("ko")
B.ar=A.ap("kp")
B.as=A.ap("i9")})();(function staticFields(){$.hq=null
$.ae=A.b([],t.Q)
$.iK=null
$.fI=0
$.fJ=A.lk()
$.iB=null
$.iA=null
$.jj=null
$.je=null
$.jq=null
$.hK=null
$.hR=null
$.ip=null
$.hv=A.b([],A.cs("o<n<x>?>"))
$.br=null
$.cq=null
$.cr=null
$.ih=!1
$.K=B.j})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"m4","jt",()=>A.hL("_$dart_dartClosure"))
s($,"m3","is",()=>A.hL("_$dart_dartClosure_dartJSInterop"))
s($,"ml","jE",()=>A.b([new J.cM()],A.cs("o<c2>")))
s($,"m9","ju",()=>A.aC(A.h9({
toString:function(){return"$receiver$"}})))
s($,"ma","jv",()=>A.aC(A.h9({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"mb","jw",()=>A.aC(A.h9(null)))
s($,"mc","jx",()=>A.aC(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"mf","jA",()=>A.aC(A.h9(void 0)))
s($,"mg","jB",()=>A.aC(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"me","jz",()=>A.aC(A.iP(null)))
s($,"md","jy",()=>A.aC(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"mi","jD",()=>A.aC(A.iP(void 0)))
s($,"mh","jC",()=>A.aC(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"mj","iu",()=>A.kq())
s($,"mk","dn",()=>A.jo(B.ao))
s($,"m7","it",()=>{A.kf()
return $.fI})})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.bg,SharedArrayBuffer:A.bg,ArrayBufferView:A.bY,DataView:A.cR,Float32Array:A.cS,Float64Array:A.cT,Int16Array:A.cU,Int32Array:A.cV,Int8Array:A.cW,Uint16Array:A.cX,Uint32Array:A.cY,Uint8ClampedArray:A.bZ,CanvasPixelArray:A.bZ,Uint8Array:A.cZ})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bh.$nativeSuperclassTag="ArrayBufferView"
A.cc.$nativeSuperclassTag="ArrayBufferView"
A.cd.$nativeSuperclassTag="ArrayBufferView"
A.bW.$nativeSuperclassTag="ArrayBufferView"
A.ce.$nativeSuperclassTag="ArrayBufferView"
A.cf.$nativeSuperclassTag="ArrayBufferView"
A.bX.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.lU
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()