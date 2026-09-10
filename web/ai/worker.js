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
if(a[b]!==s){A.lz(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.c(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.hU(b)
return new s(c,this)}:function(){if(s===null)s=A.hU(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.hU(a).prototype
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
hZ(a,b,c,d){return{i:a,p:b,e:c,x:d}},
hV(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.hX==null){A.ln()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.e(A.im("Return interceptor for "+A.q(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.h6
if(o==null)o=$.h6=A.hq(n)
p=q[o]}if(p!=null)return p
p=A.ls(a)
if(p!=null)return p
if(typeof a=="function")return B.a6
s=Object.getPrototypeOf(a)
if(s==null)return B.E
if(s===Object.prototype)return B.E
if(typeof q=="function"){o=$.h6
if(o==null)o=$.h6=A.hq(n)
Object.defineProperty(q,o,{value:B.t,enumerable:false,writable:true,configurable:true})
return B.t}return B.t},
jG(a,b){if(a<0||a>4294967295)throw A.e(A.bd(a,0,4294967295,"length",null))
return J.jH(new Array(a),b)},
ia(a,b){if(a<0)throw A.e(A.ct("Length must be a non-negative integer: "+a,null))
return A.c(new Array(a),b.h("p<0>"))},
jH(a,b){var s=A.c(a,b.h("p<0>"))
s.$flags=1
return s},
b2(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bD.prototype
return J.cJ.prototype}if(typeof a=="string")return J.b9.prototype
if(a==null)return J.bE.prototype
if(typeof a=="boolean")return J.cI.prototype
if(Array.isArray(a))return J.p.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aF.prototype
if(typeof a=="symbol")return J.bI.prototype
if(typeof a=="bigint")return J.bG.prototype
return a}if(a instanceof A.u)return a
return J.hV(a)},
cn(a){if(typeof a=="string")return J.b9.prototype
if(a==null)return a
if(Array.isArray(a))return J.p.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aF.prototype
if(typeof a=="symbol")return J.bI.prototype
if(typeof a=="bigint")return J.bG.prototype
return a}if(a instanceof A.u)return a
return J.hV(a)},
bp(a){if(a==null)return a
if(Array.isArray(a))return J.p.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aF.prototype
if(typeof a=="symbol")return J.bI.prototype
if(typeof a=="bigint")return J.bG.prototype
return a}if(a instanceof A.u)return a
return J.hV(a)},
af(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.b2(a).a2(a,b)},
aQ(a,b){if(typeof b==="number")if(Array.isArray(a)||A.lr(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.bp(a).i(a,b)},
hz(a,b){return J.bp(a).N(a,b)},
jc(a,b,c,d){return J.bp(a).F(a,b,c,d)},
dj(a){return J.bp(a).gK(a)},
Y(a){return J.b2(a).gI(a)},
jd(a){return J.cn(a).gU(a)},
je(a){return J.cn(a).gaX(a)},
E(a){return J.bp(a).gt(a)},
jf(a){return J.bp(a).gaY(a)},
b5(a){return J.cn(a).gm(a)},
jg(a){return J.b2(a).gJ(a)},
jh(a,b){return J.bp(a).aB(a,b)},
b6(a){return J.b2(a).n(a)},
cG:function cG(){},
cI:function cI(){},
bE:function bE(){},
bH:function bH(){},
aG:function aG(){},
cW:function cW(){},
c0:function c0(){},
aF:function aF(){},
bG:function bG(){},
bI:function bI(){},
p:function p(a){this.$ti=a},
cH:function cH(){},
fd:function fd(a){this.$ti=a},
aS:function aS(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bF:function bF(){},
bD:function bD(){},
cJ:function cJ(){},
b9:function b9(){}},A={hE:function hE(){},
jI(a){return new A.bK("Field '"+a+"' has not been initialized.")},
ax(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
fG(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
a7(a,b,c){return a},
hY(a){var s,r
for(s=$.ad.length,r=0;r<s;++r)if(a===$.ad[r])return!0
return!1},
ac(a,b,c,d){A.bX(b,"start")
if(c!=null){A.bX(c,"end")
if(b>c)A.cp(A.bd(b,0,c,"start",null))}return new A.J(a,b,c,d.h("J<0>"))},
jK(a,b,c,d){if(t.U.b(a))return new A.bx(a,b,c.h("@<0>").C(d).h("bx<1,2>"))
return new A.aV(a,b,c.h("@<0>").C(d).h("aV<1,2>"))},
jU(a,b,c){A.bX(b,"takeCount")
if(t.U.b(a))return new A.by(a,b,c.h("by<0>"))
return new A.aW(a,b,c.h("aW<0>"))},
av(){return new A.c_("No element")},
bK:function bK(a){this.a=a},
fE:function fE(){},
l:function l(){},
m:function m(){},
J:function J(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
y:function y(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aV:function aV(a,b,c){this.a=a
this.b=b
this.$ti=c},
bx:function bx(a,b,c){this.a=a
this.b=b
this.$ti=c},
bQ:function bQ(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
T:function T(a,b,c){this.a=a
this.b=b
this.$ti=c},
f:function f(a,b,c){this.a=a
this.b=b
this.$ti=c},
H:function H(a,b,c){this.a=a
this.b=b
this.$ti=c},
bB:function bB(a,b,c){this.a=a
this.b=b
this.$ti=c},
bC:function bC(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aW:function aW(a,b,c){this.a=a
this.b=b
this.$ti=c},
by:function by(a,b,c){this.a=a
this.b=b
this.$ti=c},
aX:function aX(a,b,c){this.a=a
this.b=b
this.$ti=c},
bz:function bz(a){this.$ti=a},
c4:function c4(a,b){this.a=a
this.$ti=b},
c5:function c5(a,b){this.a=a
this.$ti=b},
a_:function a_(){},
a3:function a3(a,b){this.a=a
this.$ti=b},
e4(a,b,c){var s,r,q,p,o,n,m,l=A.r(a),k=A.bP(new A.aa(a,l.h("aa<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.v)(k),++i,p=o){r=k[i]
c.a(a.i(0,r))
o=p+1
q[r]=p}n=A.bP(new A.ab(a,l.h("ab<2>")),!0,c)
m=new A.bw(q,n,b.h("@<0>").C(c).h("bw<1,2>"))
m.$keys=k
return m}return new A.bv(A.aq(a,b,c),b.h("@<0>").C(c).h("bv<1,2>"))},
j_(a){var s=A.iZ(a)
if(s!=null)return s
return"minified:"+a},
lr(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
q(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.b6(a)
return s},
cY(a){var s,r=$.ig
if(r==null)r=$.ig=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
jP(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.k(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
cZ(a){var s,r,q,p
if(a instanceof A.u)return A.a4(A.aN(a),null)
s=J.b2(a)
if(s===B.a5||s===B.a7||t.ak.b(a)){r=B.z(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.a4(A.aN(a),null)},
ih(a){var s,r,q
if(a==null||typeof a=="number"||A.hQ(a))return J.b6(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.Z)return a.n(0)
if(a instanceof A.aA)return a.bm(!0)
s=$.jb()
for(r=0;r<1;++r){q=s[r].cM(a)
if(q!=null)return q}return"Instance of '"+A.cZ(a)+"'"},
jM(){return Date.now()},
jO(){var s,r
if($.fC!==0)return
$.fC=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
if(!!s.dartUseDateNowForTicks)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.fC=1e6
$.fD=new A.fB(r)},
U(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.bk(s,10)|55296)>>>0,s&1023|56320)}throw A.e(A.bd(a,0,1114111,null,null))},
jN(a){var s=a.$thrownJsError
if(s==null)return null
return A.bq(s)},
k(a,b){if(a==null)J.b5(a)
throw A.e(A.iQ(a,b))},
iQ(a,b){var s,r="index"
if(!A.iG(b))return new A.an(!0,b,r,null)
s=J.b5(a)
if(b<0||b>=s)return A.hC(b,s,a,r)
return new A.bW(null,null,!0,b,r,"Value not in range")},
la(a){return new A.an(!0,a,null,null)},
iO(a){return a},
e(a){return A.M(a,new Error())},
M(a,b){var s
if(a==null)a=new A.ay()
b.dartException=a
s=A.lA
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
lA(){return J.b6(this.dartException)},
cp(a,b){throw A.M(a,b==null?new Error():b)},
cq(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.cp(A.kz(a,b,c),s)},
kz(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.c2("'"+s+"': Cannot "+o+" "+l+k+n)},
v(a){throw A.e(A.S(a))},
az(a){var s,r,q,p,o,n
a=A.ly(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.c([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.fO(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
fP(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
il(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
hF(a,b){var s=b==null,r=s?null:b.method
return new A.cK(a,r,s?null:b.receiver)},
aD(a){var s
if(a==null)return new A.fo(a)
if(a instanceof A.bA){s=a.a
return A.aO(a,s==null?A.cj(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.aO(a,a.dartException)
return A.l8(a)},
aO(a,b){if(t.V.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
l8(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bk(r,16)&8191)===10)switch(q){case 438:return A.aO(a,A.hF(A.q(s)+" (Error "+q+")",null))
case 445:case 5007:A.q(s)
return A.aO(a,new A.bV())}}if(a instanceof TypeError){p=$.j1()
o=$.j2()
n=$.j3()
m=$.j4()
l=$.j7()
k=$.j8()
j=$.j6()
$.j5()
i=$.ja()
h=$.j9()
g=p.a1(s)
if(g!=null)return A.aO(a,A.hF(A.D(s),g))
else{g=o.a1(s)
if(g!=null){g.method="call"
return A.aO(a,A.hF(A.D(s),g))}else if(n.a1(s)!=null||m.a1(s)!=null||l.a1(s)!=null||k.a1(s)!=null||j.a1(s)!=null||m.a1(s)!=null||i.a1(s)!=null||h.a1(s)!=null){A.D(s)
return A.aO(a,new A.bV())}}return A.aO(a,new A.d3(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.bZ()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.aO(a,new A.an(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.bZ()
return a},
bq(a){var s
if(a instanceof A.bA)return a.b
if(a==null)return new A.cc(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.cc(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
iW(a){if(a==null)return J.Y(a)
if(typeof a=="object")return A.cY(a)
return J.Y(a)},
li(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.u(0,a[s],a[r])}return b},
lj(a,b){var s,r=a.length
for(s=0;s<r;++s)b.k(0,a[s])
return b},
kI(a,b,c,d,e,f){t.h.a(a)
switch(A.d(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.e(new A.fV("Unsupported number of arguments for wrapped closure"))},
dg(a,b){var s=a.$identity
if(!!s)return s
s=A.le(a,b)
a.$identity=s
return s},
le(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.kI)},
jw(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.d0().constructor.prototype):Object.create(new A.b7(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.i8(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.js(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.i8(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
js(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.e("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.jq)}throw A.e("Error in functionType of tearoff")},
jt(a,b,c,d){var s=A.i7
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
i8(a,b,c,d){if(c)return A.jv(a,b,d)
return A.jt(b.length,d,a,b)},
ju(a,b,c,d){var s=A.i7,r=A.jr
switch(b?-1:a){case 0:throw A.e(new A.d_("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
jv(a,b,c){var s,r
if($.i5==null)$.i5=A.i4("interceptor")
if($.i6==null)$.i6=A.i4("receiver")
s=b.length
r=A.ju(s,c,a,b)
return r},
hU(a){return A.jw(a)},
jq(a,b){return A.cg(v.typeUniverse,A.aN(a.a),b)},
i7(a){return a.a},
jr(a){return a.b},
i4(a){var s,r,q,p=new A.b7("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.e(A.ct("Field name "+a+" not found.",null))},
hq(a){return v.getIsolateTag(a)},
ls(a){var s,r,q,p,o,n=A.D($.iR.$1(a)),m=$.hp[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.hv[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.ck($.iM.$2(a,n))
if(q!=null){m=$.hp[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.hv[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.hy(s)
$.hp[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.hv[n]=s
return s}if(p==="-"){o=A.hy(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.iX(a,s)
if(p==="*")throw A.e(A.im(n))
if(v.leafTags[n]===true){o=A.hy(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.iX(a,s)},
iX(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.hZ(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
hy(a){return J.hZ(a,!1,null,!!a.$ia9)},
lu(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.hy(s)
else return J.hZ(s,c,null,null)},
ln(){if(!0===$.hX)return
$.hX=!0
A.lo()},
lo(){var s,r,q,p,o,n,m,l
$.hp=Object.create(null)
$.hv=Object.create(null)
A.lm()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.iY.$1(o)
if(n!=null){m=A.lu(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
lm(){var s,r,q,p,o,n,m=B.Q()
m=A.bo(B.R,A.bo(B.S,A.bo(B.A,A.bo(B.A,A.bo(B.T,A.bo(B.U,A.bo(B.V(B.z),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.iR=new A.hs(p)
$.iM=new A.ht(o)
$.iY=new A.hu(n)},
bo(a,b){return a(b)||b},
kc(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.k(b,s)
if(!J.af(r,b[s]))return!1}return!0},
lg(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
ly(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bi:function bi(a,b,c){this.a=a
this.b=b
this.c=c},
bj:function bj(a){this.a=a},
bv:function bv(a,b){this.a=a
this.$ti=b},
bu:function bu(){},
bw:function bw(a,b,c){this.a=a
this.b=b
this.$ti=c},
b_:function b_(a,b){this.a=a
this.$ti=b},
c6:function c6(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cF:function cF(){},
aT:function aT(a,b){this.a=a
this.$ti=b},
fB:function fB(a){this.a=a},
bY:function bY(){},
fO:function fO(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bV:function bV(){},
cK:function cK(a,b,c){this.a=a
this.b=b
this.c=c},
d3:function d3(a){this.a=a},
fo:function fo(a){this.a=a},
bA:function bA(a,b){this.a=a
this.b=b},
cc:function cc(a){this.a=a
this.b=null},
Z:function Z(){},
cw:function cw(){},
cx:function cx(){},
d1:function d1(){},
d0:function d0(){},
b7:function b7(a,b){this.a=a
this.b=b},
d_:function d_(a){this.a=a},
aw:function aw(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
fe:function fe(a){this.a=a},
fi:function fi(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
aa:function aa(a,b){this.a=a
this.$ti=b},
bM:function bM(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
ab:function ab(a,b){this.a=a
this.$ti=b},
bN:function bN(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aU:function aU(a,b){this.a=a
this.$ti=b},
bL:function bL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
hs:function hs(a){this.a=a},
ht:function ht(a){this.a=a},
hu:function hu(a){this.a=a},
aA:function aA(){},
bg:function bg(){},
bh:function bh(){},
kA(a){return a},
bb:function bb(){},
bT:function bT(){},
cM:function cM(){},
bc:function bc(){},
bR:function bR(){},
bS:function bS(){},
cN:function cN(){},
cO:function cO(){},
cP:function cP(){},
cQ:function cQ(){},
cR:function cR(){},
cS:function cS(){},
cT:function cT(){},
bU:function bU(){},
cU:function cU(){},
c7:function c7(){},
c8:function c8(){},
c9:function c9(){},
ca:function ca(){},
hI(a,b){var s=b.c
return s==null?b.c=A.ce(a,"aE",[b.x]):s},
ii(a){var s=a.w
if(s===6||s===7)return A.ii(a.x)
return s===11||s===12},
jR(a){return a.as},
lx(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
dh(a){return A.hg(v.typeUniverse,a,!1)},
lq(a,b){var s,r,q,p,o
if(a==null)return null
s=b.y
r=a.Q
if(r==null)r=a.Q=new Map()
q=b.as
p=r.get(q)
if(p!=null)return p
o=A.aM(v.typeUniverse,a.x,s,0)
r.set(q,o)
return o},
aM(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.aM(a1,s,a3,a4)
if(r===s)return a2
return A.iw(a1,r,!0)
case 7:s=a2.x
r=A.aM(a1,s,a3,a4)
if(r===s)return a2
return A.iv(a1,r,!0)
case 8:q=a2.y
p=A.bn(a1,q,a3,a4)
if(p===q)return a2
return A.ce(a1,a2.x,p)
case 9:o=a2.x
n=A.aM(a1,o,a3,a4)
m=a2.y
l=A.bn(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.hN(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bn(a1,j,a3,a4)
if(i===j)return a2
return A.ix(a1,k,i)
case 11:h=a2.x
g=A.aM(a1,h,a3,a4)
f=a2.y
e=A.l5(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.iu(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bn(a1,d,a3,a4)
o=a2.x
n=A.aM(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.hO(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.e(A.cv("Attempted to substitute unexpected RTI kind "+a0))}},
bn(a,b,c,d){var s,r,q,p,o=b.length,n=A.hh(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.aM(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
l6(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.hh(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.aM(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
l5(a,b,c,d){var s,r=b.a,q=A.bn(a,r,c,d),p=b.b,o=A.bn(a,p,c,d),n=b.c,m=A.l6(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.d7()
s.a=q
s.b=o
s.c=m
return s},
c(a,b){a[v.arrayRti]=b
return a},
ho(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.ll(s)
return a.$S()}return null},
lp(a,b){var s
if(A.ii(b))if(a instanceof A.Z){s=A.ho(a)
if(s!=null)return s}return A.aN(a)},
aN(a){if(a instanceof A.u)return A.r(a)
if(Array.isArray(a))return A.j(a)
return A.hP(J.b2(a))},
j(a){var s=a[v.arrayRti],r=t.k
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
r(a){var s=a.$ti
return s!=null?s:A.hP(a)},
hP(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.kH(a,s)},
kH(a,b){var s=a instanceof A.Z?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.km(v.typeUniverse,s.name)
b.$ccache=r
return r},
ll(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.hg(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
lk(a){return A.aC(A.r(a))},
hW(a){var s=A.ho(a)
return A.aC(s==null?A.aN(a):s)},
hT(a){var s
if(a instanceof A.aA)return A.lh(a.$r,a.aL())
s=a instanceof A.Z?A.ho(a):null
if(s!=null)return s
if(t.dm.b(a))return J.jg(a).a
if(Array.isArray(a))return A.j(a)
return A.aN(a)},
aC(a){var s=a.r
return s==null?a.r=new A.hf(a):s},
lh(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bY
if(0>=p)return A.k(q,0)
s=A.cg(v.typeUniverse,A.hT(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.k(q,r)
s=A.iz(v.typeUniverse,s,A.hT(q[r]))}return A.cg(v.typeUniverse,s,a)},
al(a){return A.aC(A.hg(v.typeUniverse,a,!1))},
kG(a){var s=this
s.b=A.l3(s)
return s.b(a)},
l3(a){var s,r,q,p,o
if(a===t.K)return A.kO
if(A.b4(a))return A.kS
s=a.w
if(s===6)return A.kE
if(s===1)return A.iI
if(s===7)return A.kJ
r=A.l2(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.b4)){a.f="$i"+q
if(q==="n")return A.kM
if(a===t.A)return A.kL
return A.kR}}else if(s===10){p=A.lg(a.x,a.y)
o=p==null?A.iI:p
return o==null?A.cj(o):o}return A.kC},
l2(a){if(a.w===8){if(a===t.S)return A.iG
if(a===t.i||a===t.H)return A.kN
if(a===t.N)return A.kQ
if(a===t.y)return A.hQ}return null},
kF(a){var s=this,r=A.kB
if(A.b4(s))r=A.kr
else if(s===t.K)r=A.cj
else if(A.br(s)){r=A.kD
if(s===t.h6)r=A.de
else if(s===t.dk)r=A.ck
else if(s===t.fQ)r=A.ko
else if(s===t.cg)r=A.iC
else if(s===t.cD)r=A.kp
else if(s===t.an)r=A.kq}else if(s===t.S)r=A.d
else if(s===t.N)r=A.D
else if(s===t.y)r=A.ak
else if(s===t.H)r=A.t
else if(s===t.i)r=A.as
else if(s===t.A)r=A.hi
s.a=r
return s.a(a)},
kC(a){var s=this
if(a==null)return A.br(s)
return A.iT(v.typeUniverse,A.lp(a,s),s)},
kE(a){if(a==null)return!0
return this.x.b(a)},
kR(a){var s,r=this
if(a==null)return A.br(r)
s=r.f
if(a instanceof A.u)return!!a[s]
return!!J.b2(a)[s]},
kM(a){var s,r=this
if(a==null)return A.br(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.u)return!!a[s]
return!!J.b2(a)[s]},
kL(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.u)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
iH(a){if(typeof a=="object"){if(a instanceof A.u)return t.A.b(a)
return!0}if(typeof a=="function")return!0
return!1},
kB(a){var s=this
if(a==null){if(A.br(s))return a}else if(s.b(a))return a
throw A.M(A.iD(a,s),new Error())},
kD(a){var s=this
if(a==null||s.b(a))return a
throw A.M(A.iD(a,s),new Error())},
iD(a,b){return new A.bk("TypeError: "+A.ip(a,A.a4(b,null)))},
iP(a,b,c,d){if(A.iT(v.typeUniverse,a,b))return a
throw A.M(A.ke("The type argument '"+A.a4(a,null)+"' is not a subtype of the type variable bound '"+A.a4(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
ip(a,b){return A.cD(a)+": type '"+A.a4(A.hT(a),null)+"' is not a subtype of type '"+b+"'"},
ke(a){return new A.bk("TypeError: "+a)},
ae(a,b){return new A.bk("TypeError: "+A.ip(a,b))},
kJ(a){var s=this
return s.x.b(a)||A.hI(v.typeUniverse,s).b(a)},
kO(a){return a!=null},
cj(a){if(a!=null)return a
throw A.M(A.ae(a,"Object"),new Error())},
kS(a){return!0},
kr(a){return a},
iI(a){return!1},
hQ(a){return!0===a||!1===a},
ak(a){if(!0===a)return!0
if(!1===a)return!1
throw A.M(A.ae(a,"bool"),new Error())},
ko(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.M(A.ae(a,"bool?"),new Error())},
as(a){if(typeof a=="number")return a
throw A.M(A.ae(a,"double"),new Error())},
kp(a){if(typeof a=="number")return a
if(a==null)return a
throw A.M(A.ae(a,"double?"),new Error())},
iG(a){return typeof a=="number"&&Math.floor(a)===a},
d(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.M(A.ae(a,"int"),new Error())},
de(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.M(A.ae(a,"int?"),new Error())},
kN(a){return typeof a=="number"},
t(a){if(typeof a=="number")return a
throw A.M(A.ae(a,"num"),new Error())},
iC(a){if(typeof a=="number")return a
if(a==null)return a
throw A.M(A.ae(a,"num?"),new Error())},
kQ(a){return typeof a=="string"},
D(a){if(typeof a=="string")return a
throw A.M(A.ae(a,"String"),new Error())},
ck(a){if(typeof a=="string")return a
if(a==null)return a
throw A.M(A.ae(a,"String?"),new Error())},
hi(a){if(A.iH(a))return a
throw A.M(A.ae(a,"JSObject"),new Error())},
kq(a){if(a==null)return a
if(A.iH(a))return a
throw A.M(A.ae(a,"JSObject?"),new Error())},
iK(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.a4(a[q],b)
return s},
kY(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.iK(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.a4(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
iE(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.c([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.k(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.k(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.a4(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.a4(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.a4(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.a4(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.a4(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
a4(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.a4(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.a4(a.x,b)+">"
if(l===8){p=A.l7(a.x)
o=a.y
return o.length>0?p+("<"+A.iK(o,b)+">"):p}if(l===10)return A.kY(a,b)
if(l===11)return A.iE(a,b,null)
if(l===12)return A.iE(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.k(b,n)
return b[n]}return"?"},
l7(a){var s=A.iZ(a)
if(s!=null)return s
return"minified:"+a},
kn(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
km(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.hg(a,b,!1)
else if(typeof m=="number"){s=m
r=A.cf(a,5,"#")
q=A.hh(s)
for(p=0;p<s;++p)q[p]=r
o=A.ce(a,b,q)
n[b]=o
return o}else return m},
kl(a,b){return A.iA(a.tR,b)},
kk(a,b){return A.iA(a.eT,b)},
hg(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.iy(a,null,b,!1)
r.set(b,s)
return s},
cg(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.iy(a,b,c,!0)
q.set(c,r)
return r},
iz(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.hN(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
iy(a,b,c,d){return A.ka(A.k4(a,b,c,d))},
aL(a,b){b.a=A.kF
b.b=A.kG
return b},
cf(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.ai(null,null)
s.w=b
s.as=c
r=A.aL(a,s)
a.eC.set(c,r)
return r},
iw(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.ki(a,b,r,c)
a.eC.set(r,s)
return s},
ki(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.b4(b))if(!(b===t.P||b===t.T))if(s!==6)r=s===7&&A.br(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.ai(null,null)
q.w=6
q.x=b
q.as=c
return A.aL(a,q)},
iv(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.kg(a,b,r,c)
a.eC.set(r,s)
return s},
kg(a,b,c,d){var s,r
if(d){s=b.w
if(A.b4(b)||b===t.K)return b
else if(s===1)return A.ce(a,"aE",[b])
else if(b===t.P||b===t.T)return t.eH}r=new A.ai(null,null)
r.w=7
r.x=b
r.as=c
return A.aL(a,r)},
kj(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.ai(null,null)
s.w=13
s.x=b
s.as=q
r=A.aL(a,s)
a.eC.set(q,r)
return r},
cd(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
kf(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
ce(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.cd(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.ai(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.aL(a,r)
a.eC.set(p,q)
return q},
hN(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.cd(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.ai(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.aL(a,o)
a.eC.set(q,n)
return n},
ix(a,b,c){var s,r,q="+"+(b+"("+A.cd(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.ai(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.aL(a,s)
a.eC.set(q,r)
return r},
iu(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.cd(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.cd(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.kf(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.ai(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.aL(a,p)
a.eC.set(r,o)
return o},
hO(a,b,c,d){var s,r=b.as+("<"+A.cd(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.kh(a,b,c,r,d)
a.eC.set(r,s)
return s},
kh(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.hh(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.aM(a,b,r,0)
m=A.bn(a,c,r,0)
return A.hO(a,n,m,c!==m)}}l=new A.ai(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.aL(a,l)},
k4(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
ka(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.k6(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.ir(a,r,l,k,!1)
else if(q===46)r=A.ir(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.b1(a.u,a.e,k.pop()))
break
case 94:k.push(A.kj(a.u,k.pop()))
break
case 35:k.push(A.cf(a.u,5,"#"))
break
case 64:k.push(A.cf(a.u,2,"@"))
break
case 126:k.push(A.cf(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.k8(a,k)
break
case 38:A.k7(a,k)
break
case 63:p=a.u
k.push(A.iw(p,A.b1(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.iv(p,A.b1(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.k5(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.is(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.kb(a.u,a.e,o)
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
return A.b1(a.u,a.e,m)},
k6(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
ir(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.kn(s,o.x)[p]
if(n==null)A.cp('No "'+p+'" in "'+A.jR(o)+'"')
d.push(A.cg(s,o,n))}else d.push(p)
return m},
k8(a,b){var s,r=a.u,q=A.iq(a,b),p=b.pop()
if(typeof p=="string")b.push(A.ce(r,p,q))
else{s=A.b1(r,a.e,p)
switch(s.w){case 11:b.push(A.hO(r,s,q,a.n))
break
default:b.push(A.hN(r,s,q))
break}}},
k5(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.iq(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.b1(p,a.e,o)
q=new A.d7()
q.a=s
q.b=n
q.c=m
b.push(A.iu(p,r,q))
return
case-4:b.push(A.ix(p,b.pop(),s))
return
default:throw A.e(A.cv("Unexpected state under `()`: "+A.q(o)))}},
k7(a,b){var s=b.pop()
if(0===s){b.push(A.cf(a.u,1,"0&"))
return}if(1===s){b.push(A.cf(a.u,4,"1&"))
return}throw A.e(A.cv("Unexpected extended operation "+A.q(s)))},
iq(a,b){var s=b.splice(a.p)
A.is(a.u,a.e,s)
a.p=b.pop()
return s},
b1(a,b,c){if(typeof c=="string")return A.ce(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.k9(a,b,c)}else return c},
is(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.b1(a,b,c[s])},
kb(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.b1(a,b,c[s])},
k9(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.e(A.cv("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.e(A.cv("Bad index "+c+" for "+b.n(0)))},
iT(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.L(a,b,null,c,null)
r.set(c,s)}return s},
L(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.b4(d))return!0
s=b.w
if(s===4)return!0
if(A.b4(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.L(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.T){if(q===7)return A.L(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.L(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.L(a,b.x,c,d,e))return!1
return A.L(a,A.hI(a,b),c,d,e)}if(s===6)return A.L(a,p,c,d,e)&&A.L(a,b.x,c,d,e)
if(q===7){if(A.L(a,b,c,d.x,e))return!0
return A.L(a,b,c,A.hI(a,d),e)}if(q===6)return A.L(a,b,c,p,e)||A.L(a,b,c,d.x,e)
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
if(!A.L(a,j,c,i,e)||!A.L(a,i,e,j,c))return!1}return A.iF(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.iF(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.kK(a,b,c,d,e)}if(o&&q===10)return A.kP(a,b,c,d,e)
return!1},
iF(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.L(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.L(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.L(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.L(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.L(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
kK(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.cg(a,b,r[o])
return A.iB(a,p,null,c,d.y,e)}return A.iB(a,b.y,null,c,d.y,e)},
iB(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.L(a,b[s],d,e[s],f))return!1
return!0},
kP(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.L(a,r[s],c,q[s],e))return!1
return!0},
br(a){var s=a.w,r=!0
if(!(a===t.P||a===t.T))if(!A.b4(a))if(s!==6)r=s===7&&A.br(a.x)
return r},
b4(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
iA(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
hh(a){return a>0?new Array(a):v.typeUniverse.sEA},
ai:function ai(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
d7:function d7(){this.c=this.b=this.a=null},
hf:function hf(a){this.a=a},
d6:function d6(){},
bk:function bk(a){this.a=a},
jZ(){var s,r,q
if(self.scheduleImmediate!=null)return A.lb()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.dg(new A.fR(s),1)).observe(r,{childList:true})
return new A.fQ(s,r,q)}else if(self.setImmediate!=null)return A.lc()
return A.ld()},
k_(a){self.scheduleImmediate(A.dg(new A.fS(t.M.a(a)),0))},
k0(a){self.setImmediate(A.dg(new A.fT(t.M.a(a)),0))},
k1(a){A.hK(B.y,t.M.a(a))},
hK(a,b){return A.kd(0,b)},
kd(a,b){var s=new A.hd()
s.bP(a,b)
return s},
kV(a){return new A.d4(new A.O($.I,a.h("O<0>")),a.h("d4<0>"))},
kv(a,b){a.$2(0,null)
b.b=!0
return b.a},
ks(a,b){A.kw(a,b)},
ku(a,b){var s,r,q=b.$ti
q.h("1/?").a(a)
s=a==null?q.c.a(a):a
if(!b.b)b.a.bS(s)
else{r=b.a
if(q.h("aE<1>").b(s))r.b7(s)
else r.bb(s)}},
kt(a,b){var s=A.aD(a),r=A.bq(a),q=b.b,p=b.a
if(q)p.aG(new A.ah(s,r))
else p.b6(new A.ah(s,r))},
kw(a,b){var s,r,q=new A.hj(b),p=new A.hk(b)
if(a instanceof A.O)a.bl(q,p,t.z)
else{s=t.z
if(a instanceof A.O)a.bC(q,p,s)
else{r=new A.O($.I,t._)
r.a=8
r.c=a
r.bl(q,p,s)}}},
l9(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.I.bB(new A.hn(s),t.p,t.S,t.z)},
it(a,b,c){return 0},
hB(a){var s
if(t.V.b(a)){s=a.gaq()
if(s!=null)return s}return B.X},
jB(a,b){var s
if(!b.b(null))throw A.e(A.hA(null,"computation","The type parameter is not nullable"))
s=new A.O($.I,b.h("O<0>"))
A.jV(a,new A.fb(null,s,b))
return s},
fZ(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.jS()
b.b6(new A.ah(new A.an(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bh(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aj()
b.au(o.a)
A.aZ(b,p)
return}b.a^=2
A.df(null,null,b.b,t.M.a(new A.h_(o,b)))},
aZ(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.t,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.hS(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.aZ(d.a,c)
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
A.hS(j.a,j.b)
return}g=$.I
if(g!==h)$.I=h
else g=null
c=c.c
if((c&15)===8)new A.h3(q,d,n).$0()
else if(o){if((c&1)!==0)new A.h2(q,j).$0()}else if((c&2)!==0)new A.h1(d,q).$0()
if(g!=null)$.I=g
c=q.c
if(c instanceof A.O){p=q.a.$ti
p=p.h("aE<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.av(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.fZ(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.av(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
kZ(a,b){var s
if(t.C.b(a))return b.bB(a,t.z,t.K,t.l)
s=t.B
if(s.b(a))return s.a(a)
throw A.e(A.hA(a,"onError",u.c))},
kW(){var s,r
for(s=$.bm;s!=null;s=$.bm){$.cm=null
r=s.b
$.bm=r
if(r==null)$.cl=null
s.a.$0()}},
l4(){$.hR=!0
try{A.kW()}finally{$.cm=null
$.hR=!1
if($.bm!=null)$.i1().$1(A.iN())}},
iL(a){var s=new A.d5(a),r=$.cl
if(r==null){$.bm=$.cl=s
if(!$.hR)$.i1().$1(A.iN())}else $.cl=r.b=s},
l1(a){var s,r,q,p=$.bm
if(p==null){A.iL(a)
$.cm=$.cl
return}s=new A.d5(a)
r=$.cm
if(r==null){s.b=p
$.bm=$.cm=s}else{q=r.b
s.b=q
$.cm=r.b=s
if(q==null)$.cl=s}},
lI(a,b){A.a7(a,"stream",t.K)
return new A.dc(b.h("dc<0>"))},
jV(a,b){var s=$.I
if(s===B.j)return A.hK(a,t.M.a(b))
return A.hK(a,t.M.a(s.bp(b)))},
hS(a,b){A.l1(new A.hm(a,b))},
iJ(a,b,c,d,e){var s,r=$.I
if(r===c)return d.$0()
$.I=c
s=r
try{r=d.$0()
return r}finally{$.I=s}},
l0(a,b,c,d,e,f,g){var s,r=$.I
if(r===c)return d.$1(e)
$.I=c
s=r
try{r=d.$1(e)
return r}finally{$.I=s}},
l_(a,b,c,d,e,f,g,h,i){var s,r=$.I
if(r===c)return d.$2(e,f)
$.I=c
s=r
try{r=d.$2(e,f)
return r}finally{$.I=s}},
df(a,b,c,d){t.M.a(d)
if(B.j!==c){d=c.bp(d)
d=d}A.iL(d)},
fR:function fR(a){this.a=a},
fQ:function fQ(a,b,c){this.a=a
this.b=b
this.c=c},
fS:function fS(a){this.a=a},
fT:function fT(a){this.a=a},
hd:function hd(){},
he:function he(a,b){this.a=a
this.b=b},
d4:function d4(a,b){this.a=a
this.b=!1
this.$ti=b},
hj:function hj(a){this.a=a},
hk:function hk(a){this.a=a},
hn:function hn(a){this.a=a},
aB:function aB(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
ar:function ar(a,b){this.a=a
this.$ti=b},
ah:function ah(a,b){this.a=a
this.b=b},
fb:function fb(a,b,c){this.a=a
this.b=b
this.c=c},
aY:function aY(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
O:function O(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
fW:function fW(a,b){this.a=a
this.b=b},
h0:function h0(a,b){this.a=a
this.b=b},
h_:function h_(a,b){this.a=a
this.b=b},
fY:function fY(a,b){this.a=a
this.b=b},
fX:function fX(a,b){this.a=a
this.b=b},
h3:function h3(a,b,c){this.a=a
this.b=b
this.c=c},
h4:function h4(a,b){this.a=a
this.b=b},
h5:function h5(a){this.a=a},
h2:function h2(a,b){this.a=a
this.b=b},
h1:function h1(a,b){this.a=a
this.b=b},
d5:function d5(a){this.a=a
this.b=null},
dc:function dc(a){this.$ti=a},
ci:function ci(){},
db:function db(){},
hc:function hc(a,b){this.a=a
this.b=b},
hm:function hm(a,b){this.a=a
this.b=b},
hG(a,b){return new A.aw(a.h("@<0>").C(b).h("aw<1,2>"))},
N(a,b,c){return b.h("@<0>").C(c).h("ic<1,2>").a(A.li(a,new A.aw(b.h("@<0>").C(c).h("aw<1,2>"))))},
X(a,b){return new A.aw(a.h("@<0>").C(b).h("aw<1,2>"))},
bO(a){return new A.aK(a.h("aK<0>"))},
jJ(a,b){return b.h("ie<0>").a(A.lj(a,new A.aK(b.h("aK<0>"))))},
hM(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
ha(a,b,c){var s=new A.b0(a,b,c.h("b0<0>"))
s.c=a.e
return s},
fc(a,b){var s=J.E(a.a)
if(new A.H(s,a.b,a.$ti.h("H<1>")).j())return s.gl()
return null},
aq(a,b,c){var s=A.hG(b,c)
a.a_(0,new A.fj(s,b,c))
return s},
id(a,b,c){var s=A.hG(b,c)
s.A(0,a)
return s},
fm(a){var s,r
if(A.hY(a))return"{...}"
s=new A.bf("")
try{r={}
B.a.k($.ad,a)
s.a+="{"
r.a=!0
a.a_(0,new A.fn(r,s))
s.a+="}"}finally{if(0>=$.ad.length)return A.k($.ad,-1)
$.ad.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
aK:function aK(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
da:function da(a){this.a=a
this.c=this.b=null},
b0:function b0(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
fj:function fj(a,b,c){this.a=a
this.b=b
this.c=c},
A:function A(){},
B:function B(){},
fl:function fl(a){this.a=a},
fn:function fn(a,b){this.a=a
this.b=b},
ch:function ch(){},
ba:function ba(){},
c1:function c1(){},
be:function be(){},
cb:function cb(){},
bl:function bl(){},
kX(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aD(r)
q=A.i9(String(s))
throw A.e(q)}q=A.hl(p)
return q},
hl(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.d8(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.hl(a[s])
return a},
ib(a,b,c){return new A.bJ(a,b)},
ky(a){return a.B()},
k2(a,b){return new A.h7(a,[],A.lf())},
k3(a,b,c){var s,r=new A.bf(""),q=A.k2(r,b)
q.aA(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
d8:function d8(a,b){this.a=a
this.b=b
this.c=null},
d9:function d9(a){this.a=a},
cy:function cy(){},
cA:function cA(){},
bJ:function bJ(a,b){this.a=a
this.b=b},
cL:function cL(a,b){this.a=a
this.b=b},
ff:function ff(){},
fh:function fh(a){this.b=a},
fg:function fg(a){this.a=a},
h8:function h8(){},
h9:function h9(a,b){this.a=a
this.b=b},
h7:function h7(a,b,c){this.c=a
this.a=b
this.b=c},
iS(a){var s=A.jP(a,null)
if(s!=null)return s
throw A.e(A.i9(a))},
jx(a,b){a=A.M(a,new Error())
if(a==null)a=A.cj(a)
a.stack=b.n(0)
throw a},
fk(a,b,c,d){var s,r=c?J.ia(a,d):J.jG(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
bP(a,b,c){var s,r=A.c([],c.h("p<0>"))
for(s=J.E(a);s.j();)B.a.k(r,c.a(s.gl()))
if(b)return r
r.$flags=1
return r},
x(a,b){var s,r
if(Array.isArray(a))return A.c(a.slice(0),b.h("p<0>"))
s=A.c([],b.h("p<0>"))
for(r=J.E(a);r.j();)B.a.k(s,r.gl())
return s},
aH(a,b){var s=A.bP(a,!1,b)
s.$flags=3
return s},
ik(a,b,c){var s=J.E(b)
if(!s.j())return a
if(c.length===0){do a+=A.q(s.gl())
while(s.j())}else{a+=A.q(s.gl())
while(s.j())a=a+c+A.q(s.gl())}return a},
jS(){return A.bq(new Error())},
cD(a){if(typeof a=="number"||A.hQ(a)||a==null)return J.b6(a)
if(typeof a=="string")return JSON.stringify(a)
return A.ih(a)},
jy(a,b){A.a7(a,"error",t.K)
A.a7(b,"stackTrace",t.l)
A.jx(a,b)},
cv(a){return new A.cu(a)},
ct(a,b){return new A.an(!1,null,b,a)},
hA(a,b,c){return new A.an(!0,a,b,c)},
bd(a,b,c,d,e){return new A.bW(b,c,!0,a,d,"Invalid value")},
jQ(a,b,c){if(0>a||a>c)throw A.e(A.bd(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.e(A.bd(b,a,c,"end",null))
return b}return c},
bX(a,b){if(a<0)throw A.e(A.bd(a,0,null,b,null))
return a},
hC(a,b,c,d){return new A.cE(b,!0,a,d,"Index out of range")},
c3(a){return new A.c2(a)},
im(a){return new A.d2(a)},
ij(a){return new A.c_(a)},
S(a){return new A.cz(a)},
i9(a){return new A.at(a)},
jF(a,b,c){var s,r
if(A.hY(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.c([],t.s)
B.a.k($.ad,a)
try{A.kT(a,s)}finally{if(0>=$.ad.length)return A.k($.ad,-1)
$.ad.pop()}r=A.ik(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
hD(a,b,c){var s,r
if(A.hY(a))return b+"..."+c
s=new A.bf(b)
B.a.k($.ad,a)
try{r=s
r.a=A.ik(r.a,a,", ")}finally{if(0>=$.ad.length)return A.k($.ad,-1)
$.ad.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
kT(a,b){var s,r,q,p,o,n,m,l=a.gt(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.j())return
s=A.q(l.gl())
B.a.k(b,s)
k+=s.length+2;++j}if(!l.j()){if(j<=5)return
if(0>=b.length)return A.k(b,-1)
r=b.pop()
if(0>=b.length)return A.k(b,-1)
q=b.pop()}else{p=l.gl();++j
if(!l.j()){if(j<=4){B.a.k(b,A.q(p))
return}r=A.q(p)
if(0>=b.length)return A.k(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gl();++j
for(;l.j();p=o,o=n){n=l.gl();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.k(b,-1)
k-=b.pop().length+2;--j}B.a.k(b,"...")
return}}q=A.q(p)
r=A.q(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.k(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.k(b,m)
B.a.k(b,q)
B.a.k(b,r)},
hH(a,b,c,d){var s
if(B.k===c){s=J.Y(a)
b=J.Y(b)
return A.fG(A.ax(A.ax($.di(),s),b))}if(B.k===d){s=J.Y(a)
b=J.Y(b)
c=J.Y(c)
return A.fG(A.ax(A.ax(A.ax($.di(),s),b),c))}s=J.Y(a)
b=J.Y(b)
c=J.Y(c)
d=J.Y(d)
d=A.fG(A.ax(A.ax(A.ax(A.ax($.di(),s),b),c),d))
return d},
jL(a){var s,r,q=$.di()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.v)(a),++r)q=A.ax(q,J.Y(a[r]))
return A.fG(q)},
cC:function cC(){},
fU:function fU(){},
z:function z(){},
cu:function cu(a){this.a=a},
ay:function ay(){},
an:function an(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bW:function bW(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
cE:function cE(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
c2:function c2(a){this.a=a},
d2:function d2(a){this.a=a},
c_:function c_(a){this.a=a},
cz:function cz(a){this.a=a},
cV:function cV(){},
bZ:function bZ(){},
fV:function fV(a){this.a=a},
at:function at(a){this.a=a},
b:function b(){},
a1:function a1(a,b,c){this.a=a
this.b=b
this.$ti=c},
a2:function a2(){},
u:function u(){},
dd:function dd(){},
fF:function fF(){this.b=this.a=0},
bf:function bf(a){this.a=a},
i2(a,b,c,d){var s,r,q,p,o,n=t.N,m=t.S,l=A.c([],t.aD),k=a.gao(),j=a.gao(),i=a.gao(),h=A.id(a.gao().r,m,m),g=A.X(m,m)
for(s=a.gP(),r=J.E(s.a),s=new A.H(r,s.b,s.$ti.h("H<1>"));s.j();){q=r.gl()
g.u(0,q.a,q.d)}s=A.X(n,t.J)
for(r=d.length,p=0;p<d.length;d.length===r||(0,A.v)(d),++p){o=d[p]
s.u(0,o.a,o)}return new A.cr(a,b,c,k.b,j.c,i.d,h,g,s,A.bO(n),A.bO(n),A.bO(n),A.X(m,m),A.bO(m),A.bO(m),l)},
aJ:function aJ(a,b,c){this.a=a
this.b=b
this.c=c},
e_:function e_(a){this.a=a},
cr:function cr(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
dB:function dB(a){this.a=a},
dp:function dp(a){this.a=a},
dq:function dq(a,b){this.a=a
this.b=b},
dr:function dr(a){this.a=a},
ds:function ds(){},
dt:function dt(a){this.a=a},
du:function du(a){this.a=a},
dv:function dv(a){this.a=a},
dw:function dw(a){this.a=a},
dz:function dz(){},
dA:function dA(){},
dm:function dm(){},
dn:function dn(){},
dx:function dx(){},
dy:function dy(){},
dC:function dC(){},
dD:function dD(){},
a8(a){var s=a.e
if(s===2)s=1000
else s=s===1?30:0
return a.w*3+a.r*0.35+a.f*0.15+a.x*1.5-a.y*2+s},
co(a,b){var s=b?a.x*0.75:0,r=a.e
if(r===1)r=30
else r=r===2?-200:0
return a.w*3+a.r*0.35+a.f*0.15-a.y*2-s+r},
b3(a,b){var s=a.gaz(),r=a.gO(),q=b.b.i(0,"soldierPower")
q.toString
return s*(a.w+r*B.b.p(q))+B.a.F(a.ax,0,new A.hr(b,a),t.H)},
b8:function b8(a,b){this.a=a
this.b=b},
bt:function bt(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
e1:function e1(a,b,c){this.a=a
this.b=b
this.c=c},
e2:function e2(){},
e3:function e3(){},
hr:function hr(a,b){this.a=a
this.b=b},
cs:function cs(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1){var _=this
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
aj:function aj(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
e5:function e5(a,b,c,d,e){var _=this
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
eB:function eB(){},
eC:function eC(a){this.a=a},
eD:function eD(a){this.a=a},
eE:function eE(a,b){this.a=a
this.b=b},
eF:function eF(a,b){this.a=a
this.b=b},
eG:function eG(a){this.a=a},
eH:function eH(a,b){this.a=a
this.b=b},
el:function el(a){this.a=a},
em:function em(){},
en:function en(){},
eo:function eo(){},
ep:function ep(a,b){this.a=a
this.b=b},
eq:function eq(a,b){this.a=a
this.b=b},
er:function er(a){this.a=a},
es:function es(a){this.a=a},
et:function et(){},
eu:function eu(a){this.a=a},
ew:function ew(a){this.a=a},
ex:function ex(){},
ey:function ey(a){this.a=a},
ez:function ez(){},
eA:function eA(a){this.a=a},
ec:function ec(a){this.a=a},
ed:function ed(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eb:function eb(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
e7:function e7(a){this.a=a},
e8:function e8(a){this.a=a},
e9:function e9(a){this.a=a},
ea:function ea(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
e6:function e6(a){this.a=a},
ee:function ee(){},
ef:function ef(a){this.a=a},
eg:function eg(a){this.a=a},
eh:function eh(){},
ap:function ap(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eI:function eI(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
eP:function eP(){},
eQ:function eQ(){},
eR:function eR(){},
f1:function f1(){},
f4:function f4(a){this.a=a},
f5:function f5(){},
f6:function f6(){},
f7:function f7(a){this.a=a},
f8:function f8(){},
f9:function f9(a){this.a=a},
fa:function fa(a){this.a=a},
eS:function eS(){},
eT:function eT(a){this.a=a},
eU:function eU(a,b){this.a=a
this.b=b},
eV:function eV(a){this.a=a},
eW:function eW(){},
eX:function eX(a){this.a=a},
eY:function eY(a){this.a=a},
eZ:function eZ(a){this.a=a},
f_:function f_(a){this.a=a},
f0:function f0(){},
f2:function f2(){},
f3:function f3(a){this.a=a},
eM:function eM(a){this.a=a},
eN:function eN(a){this.a=a},
eO:function eO(){},
eJ:function eJ(a){this.a=a},
eK:function eK(){},
eL:function eL(a){this.a=a},
dO(a){var s,r=a.length
if(0>=r)return A.k(a,0)
s=A.t(a[0])
if(1>=r)return A.k(a,1)
return new A.Q(s,A.t(a[1]))},
Q:function Q(a,b){this.a=a
this.b=b},
dN:function dN(a){this.a=a},
jk(c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9=A.D(c3.i(0,"id")),b0=A.d(c3.i(0,"c")),b1=A.d(c3.i(0,"home")),b2=A.d(c3.i(0,"o")),b3=A.d(c3.i(0,"t")),b4=A.t(c3.i(0,"hp")),b5=A.d(c3.i(0,"max")),b6=A.d(c3.i(0,"a")),b7=A.d(c3.i(0,"p")),b8=A.d(c3.i(0,"pay")),b9=t.j,c0=A.dO(b9.a(c3.i(0,"xy"))),c1=A.dO(b9.a(c3.i(0,"v"))),c2=A.d(c3.i(0,"s"))
if(!(c2>=0&&c2<8))return A.k(B.C,c2)
c2=B.C[c2]
s=A.c([],t.n)
for(r=b9.a(c3.i(0,"troops")),q=r.length,p=0;p<r.length;r.length===q||(0,A.v)(r),++p)s.push(A.t(r[p]))
r=t.R
q=t.S
o=A.bP(r.a(c3.i(0,"w")),!0,q)
n=A.t(c3.i(0,"m"))
m=A.t(c3.i(0,"due"))
l=c3.i(0,"to")==null?null:A.dO(b9.a(c3.i(0,"to")))
k=A.de(c3.i(0,"target"))
j=A.t(c3.i(0,"return"))
i=A.ak(c3.i(0,"dispatch"))
h=A.ak(c3.i(0,"move"))
g=A.ak(c3.i(0,"dismiss"))
f=A.ak(c3.i(0,"upgrade"))
e=A.ak(c3.i(0,"retreat"))
d=A.ak(c3.i(0,"marked"))
c=A.D(c3.i(0,"rev"))
b=A.d(c3.i(0,"orderRev"))
a=A.ck(c3.i(0,"opponent"))
a0=A.d(c3.i(0,"clashes"))
a1=A.t(c3.i(0,"received"))
a2=A.t(c3.i(0,"dealt"))
a3=A.ak(c3.i(0,"opening"))
a4=A.ak(c3.i(0,"weaponReady"))
a5=A.c([],t.Z)
for(r=J.E(r.a(c3.i(0,"returnPath")));r.j();){a6=b9.a(r.gl())
a7=a6.length
if(0>=a7)return A.k(a6,0)
a8=A.t(a6[0])
if(1>=a7)return A.k(a6,1)
a5.push(new A.Q(a8,A.t(a6[1])))}return new A.o(a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,c0,c1,c2,A.aH(s,t.i),A.aH(o,q),n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5)},
ji(a){var s,r,q,p,o,n,m=A.d(a.i(0,"id")),l=A.d(a.i(0,"c")),k=A.d(a.i(0,"native")),j=A.d(a.i(0,"level")),i=A.d(a.i(0,"keep")),h=t.j,g=A.dO(h.a(a.i(0,"xy"))),f=A.c([],t.Z)
for(s=h.a(a.i(0,"outline")),r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q){p=h.a(s[q])
o=p.length
if(0>=o)return A.k(p,0)
n=A.t(p[0])
if(1>=o)return A.k(p,1)
f.push(new A.Q(n,A.t(p[1])))}h=A.d(a.i(0,"income"))
s=A.d(a.i(0,"poor"))
r=A.d(a.i(0,"cap"))
p=A.d(a.i(0,"recruitCap"))
o=A.ak(a.i(0,"recruit"))
n=A.D(a.i(0,"rev"))
return new A.a5(m,l,k,j,i,g,new A.dN(f),h,s,r,p,A.d(a.i(0,"baseIncome")),o,n,A.de(a.i(0,"initial")),A.d(a.i(0,"wins")),A.ck(a.i(0,"attacker")),A.ck(a.i(0,"defender")),A.D(a.i(0,"stage")),A.t(a.i(0,"next")),A.t(a.i(0,"danger")))},
jj(a){var s,r,q,p=A.d(a.i(0,"id")),o=A.d(a.i(0,"gold")),n=A.d(a.i(0,"reserves")),m=A.d(a.i(0,"capacity")),l=A.d(a.i(0,"salary")),k=A.d(a.i(0,"poor")),j=t.S,i=A.X(j,j)
for(s=t.f,r=s.a(a.i(0,"stock")).ga6(),r=r.gt(r);r.j();){q=r.gl()
i.u(0,A.iS(A.D(q.a)),A.d(q.b))}r=A.X(j,j)
for(s=s.a(a.i(0,"hate")).ga6(),s=s.gt(s);s.j();){q=s.gl()
r.u(0,A.iS(A.D(q.a)),A.d(q.b))}return new A.aR(p,o,n,m,l,k,A.e4(i,j,j),A.e4(r,j,j))},
jl(a){var s,r,q,p,o,n,m=A.d(a.i(0,"country")),l=A.d(a.i(0,"tick")),k=A.t(a.i(0,"month")),j=A.c([],t.Y)
for(s=t.R,r=J.E(s.a(a.i(0,"cities"))),q=t.f,p=t.N,o=t.z;r.j();)j.push(A.ji(A.aq(q.a(r.gl()),p,o)))
r=A.c([],t.e)
for(n=J.E(s.a(a.i(0,"heroes")));n.j();)r.push(A.jk(A.aq(q.a(n.gl()),p,o)))
n=A.c([],t.eu)
for(s=J.E(s.a(a.i(0,"countries")));s.j();)n.push(A.jj(A.aq(q.a(s.gl()),p,o)))
s=A.d(a.i(0,"pool"))
q=A.d(a.i(0,"salary"))
return new A.dF(m,l,k,A.aH(j,t.q),A.aH(r,t.r),A.aH(n,t.u),s,q)},
ag:function ag(a,b){this.a=a
this.b=b},
o:function o(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5){var _=this
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
dl:function dl(){},
dk:function dk(){},
a5:function a5(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1){var _=this
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
aR:function aR(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
dF:function dF(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
dL:function dL(a){this.a=a},
dM:function dM(a){this.a=a},
dI:function dI(a,b){this.a=a
this.b=b},
dH:function dH(a){this.a=a},
dJ:function dJ(){},
dK:function dK(a){this.a=a},
dG:function dG(a){this.a=a},
cX:function cX(a,b){this.a=a
this.b=b},
fp:function fp(a,b,c){this.a=a
this.b=b
this.c=c},
fs:function fs(a,b){this.a=a
this.b=b},
ft:function ft(){},
fu:function fu(a){this.a=a},
fv:function fv(){},
fw:function fw(a){this.a=a},
fx:function fx(a){this.a=a},
fy:function fy(a){this.a=a},
fz:function fz(){},
fA:function fA(){},
fq:function fq(){},
fr:function fr(a){this.a=a},
jp(a){var s,r,q,p,o,n=A.D(a.i(0,"hero")),m=A.D(a.i(0,"role")),l=A.d(a.i(0,"deadline")),k=A.d(a.i(0,"commit")),j=A.de(a.i(0,"city")),i=A.ck(a.i(0,"enemy")),h=A.c([],t.Z)
for(s=J.E(t.R.a(a.i(0,"points"))),r=t.j;s.j();){q=r.a(s.gl())
p=q.length
if(0>=p)return A.k(q,0)
o=A.t(q[0])
if(1>=p)return A.k(q,1)
h.push(new A.Q(o,A.t(q[1])))}s=A.d(a.i(0,"leg"))
r=A.d(a.i(0,"gold"))
q=A.ak(a.i(0,"slot"))
return new A.a6(n,m,A.D(a.i(0,"reason")),j,i,h,s,l,k,r,q,A.d(a.i(0,"order")))},
jm(a){var s,r,q,p,o,n,m,l,k,j,i
if(!J.af(a.i(0,"protocol"),1))throw A.e(B.a_)
s=A.D(a.i(0,"session"))
r=A.d(a.i(0,"id"))
q=A.D(a.i(0,"rules"))
p=A.D(a.i(0,"map"))
o=t.f
n=t.N
m=t.z
l=A.jl(A.aq(o.a(a.i(0,"observation")),n,m))
k=A.d(a.i(0,"deadline"))
j=A.c([],t.m)
for(i=J.E(t.R.a(a.i(0,"tasks")));i.j();)j.push(A.jp(A.aq(o.a(i.gl()),n,m)))
return new A.dQ(s,q,p,r,k,A.d(a.i(0,"seed")),A.d(a.i(0,"priority")),A.d(a.i(0,"idle")),l,j)},
i3(a,b,c,d){var s=a.x
return new A.dP(a.a,a.b,a.c,a.d,s.a,s.b,a.e,d,b,c)},
am:function am(a,b){this.a=a
this.b=b},
K:function K(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
a6:function a6(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
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
P:function P(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
cB:function cB(a,b,c,d,e,f,g,h,i,j){var _=this
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
dQ:function dQ(a,b,c,d,e,f,g,h,i,j){var _=this
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
dP:function dP(a,b,c,d,e,f,g,h,i,j){var _=this
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
bs:function bs(a,b,c){this.a=a
this.b=b
this.d=c},
dR:function dR(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dS:function dS(){},
dT:function dT(a,b,c){this.a=a
this.b=b
this.c=c},
dU:function dU(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dV:function dV(a,b,c){this.a=a
this.b=b
this.c=c},
dW:function dW(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jn(a,b,c,d,e,f,g){var s,r,q,p,o=A.e4(e,t.N,t.H),n=t.S,m=A.aH(d,n),l=t.i,k=A.aH(b,l)
l=A.aH(a,l)
s=t.z
s=A.X(s,s)
for(r=g.length,q=0;q<g.length;g.length===r||(0,A.v)(g),++q){p=g[q]
s.u(0,p.a,p)}return new A.dX(f,o,m,k,l,A.e4(s,n,t.o),c)},
jo(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=A.D(a5.i(0,"version")),b=t.f,a=t.N,a0=A.aq(b.a(a5.i(0,"values")),a,t.H),a1=t.R,a2=A.bP(a1.a(a5.i(0,"upgrades")),!0,t.S),a3=t.n,a4=A.c([],a3)
for(s=J.E(a1.a(a5.i(0,"movement")));s.j();)a4.push(A.t(s.gl()))
a3=A.c([],a3)
for(s=J.E(a1.a(a5.i(0,"field")));s.j();)a3.push(A.t(s.gl()))
s=A.c([],t.W)
for(a1=J.E(a1.a(a5.i(0,"weapons"))),r=t.j;a1.j();){q=r.a(a1.gl())
p=q.length
if(0>=p)return A.k(q,0)
o=A.d(q[0])
if(1>=p)return A.k(q,1)
n=A.d(q[1])
if(2>=p)return A.k(q,2)
m=A.d(q[2])
if(3>=p)return A.k(q,3)
l=A.d(q[3])
if(4>=p)return A.k(q,4)
k=A.d(q[4])
if(5>=p)return A.k(q,5)
j=A.ak(q[5])
if(6>=p)return A.k(q,6)
s.push(new A.R(o,n,m,l,k,j,A.t(q[6])))}b=A.aq(b.a(a5.i(0,"tuning")),a,t.z)
a=A.t(b.i(0,"interval"))
a1=A.t(b.i(0,"threat"))
r=A.t(b.i(0,"urgent"))
q=A.t(b.i(0,"margin"))
p=A.t(b.i(0,"commit"))
o=A.de(b.i(0,"rearExtra"))
if(o==null)o=1
n=A.d(b.i(0,"candidates"))
m=A.d(b.i(0,"assessments"))
l=A.d(b.i(0,"routes"))
k=A.d(b.i(0,"plans"))
j=A.d(b.i(0,"commands"))
i=A.d(b.i(0,"team"))
h=A.d(b.i(0,"targets"))
g=A.d(b.i(0,"slice"))
f=A.t(b.i(0,"advantage"))
e=A.t(b.i(0,"expansion"))
d=A.t(b.i(0,"credit"))
return A.jn(a3,a4,new A.cs(a,a1,r,q,p,A.t(b.i(0,"age")),o,n,m,l,k,j,i,h,g,f,d,e,A.d(b.i(0,"timeout")),A.d(b.i(0,"restarts")),A.t(b.i(0,"stagnation"))),a2,a0,c,s)},
R:function R(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
dX:function dX(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
dE:function dE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dZ:function dZ(a,b,c){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=0
_.r=c},
W:function W(a,b){this.a=a
this.b=b},
ao:function ao(a,b,c,d){var _=this
_.a=a
_.d=b
_.f=c
_.r=d},
e0:function e0(){},
fH:function fH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fI:function fI(){},
fJ:function fJ(a){this.a=a},
fK:function fK(a){this.a=a},
fL:function fL(a){this.a=a},
fM:function fM(a){this.a=a},
fN:function fN(){},
dY:function dY(a){var _=this
_.a=a
_.d=_.c=_.b=0
_.e=!1},
lt(){var s,r,q=new A.hw(),p=v.G,o="web-worker:"+A.D(p.self.constructor.name)
p=A.hi(p.self)
s=new A.hx(new A.dZ(q,o,A.bO(t.S)))
if(typeof s=="function")A.cp(A.ct("Attempting to rewrap a JS function.",null))
r=function(a,b){return function(c){return a(b,c,arguments.length)}}(A.kx,s)
r[$.i_()]=s
p.onmessage=r
q.$1(B.i.ac(t.G.a(A.N(["kind","hello","protocol",1,"build","d45078fc","backend",o],t.N,t.X)),null))},
hw:function hw(){},
hx:function hx(a){this.a=a},
iZ(a){return v.mangledGlobalNames[a]},
lz(a){throw A.M(new A.bK("Field '"+a+"' has been assigned during initialization."),new Error())},
aP(){throw A.M(A.jI(""),new Error())},
kx(a,b,c){t.h.a(a)
if(A.d(c)>=1)return a.$1(b)
return a.$0()},
iV(a,b,c){A.iP(c,t.H,"T","min")
return Math.min(c.a(a),c.a(b))},
iU(a,b,c){A.iP(c,t.H,"T","max")
return Math.max(c.a(a),c.a(b))}},B={}
var w=[A,J,B]
var $={}
A.hE.prototype={}
J.cG.prototype={
a2(a,b){return a===b},
gI(a){return A.cY(a)},
n(a){return"Instance of '"+A.cZ(a)+"'"},
gJ(a){return A.aC(A.hP(this))}}
J.cI.prototype={
n(a){return String(a)},
gI(a){return a?519018:218159},
gJ(a){return A.aC(t.y)},
$iw:1,
$ii:1}
J.bE.prototype={
a2(a,b){return null==b},
n(a){return"null"},
gI(a){return 0},
$iw:1}
J.bH.prototype={$iG:1}
J.aG.prototype={
gI(a){return 0},
n(a){return String(a)}}
J.cW.prototype={}
J.c0.prototype={}
J.aF.prototype={
n(a){var s=a[$.j0()]
if(s==null)s=a[$.i_()]
if(s==null)return this.bO(a)
return"JavaScript function for "+J.b6(s)},
$iau:1}
J.bG.prototype={
gI(a){return 0},
n(a){return String(a)}}
J.bI.prototype={
gI(a){return 0},
n(a){return String(a)}}
J.p.prototype={
k(a,b){A.j(a).c.a(b)
a.$flags&1&&A.cq(a,29)
a.push(b)},
a7(a,b){var s
a.$flags&1&&A.cq(a,"remove",1)
for(s=0;s<a.length;++s)if(J.af(a[s],b)){a.splice(s,1)
return!0}return!1},
A(a,b){var s
A.j(a).h("b<1>").a(b)
a.$flags&1&&A.cq(a,"addAll",2)
if(Array.isArray(b)){this.bR(a,b)
return}for(s=J.E(b);s.j();)a.push(s.gl())},
bR(a,b){var s,r
t.k.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.e(A.S(a))
for(r=0;r<s;++r)a.push(b[r])},
al(a){a.$flags&1&&A.cq(a,"clear","clear")
a.length=0},
cz(a,b){var s,r=A.fk(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.u(r,s,A.q(a[s]))
return r.join(b)},
aB(a,b){return A.ac(a,b,null,A.j(a).c)},
V(a,b){var s,r,q
A.j(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.e(A.av())
if(0>=s)return A.k(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.e(A.S(a))}return r},
F(a,b,c,d){var s,r,q
d.a(b)
A.j(a).C(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.e(A.S(a))}return r},
am(a,b){var s,r,q
A.j(a).h("i(1)").a(b)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.e(A.S(a))}throw A.e(A.av())},
N(a,b){if(!(b>=0&&b<a.length))return A.k(a,b)
return a[b]},
gK(a){if(a.length>0)return a[0]
throw A.e(A.av())},
gaY(a){var s=a.length
if(s>0)return a[s-1]
throw A.e(A.av())},
W(a,b){var s,r
A.j(a).h("i(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.e(A.S(a))}return!1},
cr(a,b){var s,r
A.j(a).h("i(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.e(A.S(a))}return!0},
H(a,b){var s,r,q,p,o,n=A.j(a)
n.h("a(1,1)?").a(b)
a.$flags&2&&A.cq(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.cS()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.dg(b,2))
if(p>0)this.c2(a,p)},
c2(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
ct(a,b){var s,r=a.length
if(0>=r)return-1
for(s=0;s<r;++s){if(!(s<a.length))return A.k(a,s)
if(J.af(a[s],b))return s}return-1},
q(a,b){var s
for(s=0;s<a.length;++s)if(J.af(a[s],b))return!0
return!1},
gU(a){return a.length===0},
gaX(a){return a.length!==0},
n(a){return A.hD(a,"[","]")},
gt(a){return new J.aS(a,a.length,A.j(a).h("aS<1>"))},
gI(a){return A.cY(a)},
gm(a){return a.length},
u(a,b,c){A.j(a).c.a(c)
a.$flags&2&&A.cq(a)
if(!(b>=0&&b<a.length))throw A.e(A.iQ(a,b))
a[b]=c},
$il:1,
$ib:1,
$in:1}
J.cH.prototype={
cM(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.cZ(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.fd.prototype={}
J.aS.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.v(q)
throw A.e(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iC:1}
J.bF.prototype={
D(a,b){var s
A.t(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaW(b)
if(this.gaW(a)===s)return 0
if(this.gaW(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaW(a){return a===0?1/a<0:a<0},
p(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.e(A.c3(""+a+".toInt()"))},
aS(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.e(A.c3(""+a+".ceil()"))},
T(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.e(A.c3(""+a+".floor()"))},
cG(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.e(A.c3(""+a+".round()"))},
v(a,b,c){if(B.c.D(b,c)>0)throw A.e(A.la(b))
if(this.D(a,b)<0)return b
if(this.D(a,c)>0)return c
return a},
n(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gI(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
c8(a,b){return(a|0)===a?a/b|0:this.c9(a,b)},
c9(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.e(A.c3("Result of truncating division is "+A.q(s)+": "+A.q(a)+" ~/ "+b))},
bk(a,b){var s
if(a>0)s=this.c6(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
c6(a,b){return b>31?0:a>>>b},
gJ(a){return A.aC(t.H)},
$ih:1,
$iV:1}
J.bD.prototype={
gJ(a){return A.aC(t.S)},
$iw:1,
$ia:1}
J.cJ.prototype={
gJ(a){return A.aC(t.i)},
$iw:1}
J.b9.prototype={
ar(a,b,c){return a.substring(b,A.jQ(b,c,a.length))},
bG(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.e(B.W)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
cB(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bG(c,s)+a},
D(a,b){var s
A.D(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
n(a){return a},
gI(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gJ(a){return A.aC(t.N)},
gm(a){return a.length},
$iw:1,
$iF:1}
A.bK.prototype={
n(a){return"LateInitializationError: "+this.a}}
A.fE.prototype={}
A.l.prototype={}
A.m.prototype={
gt(a){var s=this
return new A.y(s,s.gm(s),A.r(s).h("y<m.E>"))},
gU(a){return this.gm(this)===0},
bA(a,b,c){var s=A.r(this)
return new A.T(this,s.C(c).h("1(m.E)").a(b),s.h("@<m.E>").C(c).h("T<1,2>"))},
V(a,b){var s,r,q,p=this
A.r(p).h("m.E(m.E,m.E)").a(b)
s=p.gm(p)
if(s===0)throw A.e(A.av())
r=p.N(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.N(0,q))
if(s!==p.gm(p))throw A.e(A.S(p))}return r},
F(a,b,c,d){var s,r,q,p=this
d.a(b)
A.r(p).C(d).h("1(1,m.E)").a(c)
s=p.gm(p)
for(r=b,q=0;q<s;++q){r=c.$2(r,p.N(0,q))
if(s!==p.gm(p))throw A.e(A.S(p))}return r}}
A.J.prototype={
a3(a,b,c,d){var s,r=this.b
A.bX(r,"start")
s=this.c
if(s!=null){A.bX(s,"end")
if(r>s)throw A.e(A.bd(r,0,s,"start",null))}},
gbY(){var s=J.b5(this.a),r=this.c
if(r==null||r>s)return s
return r},
gc7(){var s=J.b5(this.a),r=this.b
if(r>s)return s
return r},
gm(a){var s,r=J.b5(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
N(a,b){var s=this,r=s.gc7()+b
if(b<0||r>=s.gbY())throw A.e(A.hC(b,s.gm(0),s,"index"))
return J.hz(s.a,r)},
a8(a){var s,r,q,p=this,o=p.b,n=p.a,m=J.cn(n),l=m.gm(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.ia(0,p.$ti.c)
return n}r=A.fk(s,m.N(n,o),!0,p.$ti.c)
for(q=1;q<s;++q){B.a.u(r,q,m.N(n,o+q))
if(m.gm(n)<l)throw A.e(A.S(p))}return r}}
A.y.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=J.cn(q),o=p.gm(q)
if(r.b!==o)throw A.e(A.S(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.N(q,s);++r.c
return!0},
$iC:1}
A.aV.prototype={
gt(a){return new A.bQ(J.E(this.a),this.b,A.r(this).h("bQ<1,2>"))},
gm(a){return J.b5(this.a)}}
A.bx.prototype={$il:1}
A.bQ.prototype={
j(){var s=this,r=s.b
if(r.j()){s.a=s.c.$1(r.gl())
return!0}s.a=null
return!1},
gl(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iC:1}
A.T.prototype={
gm(a){return J.b5(this.a)},
N(a,b){return this.b.$1(J.hz(this.a,b))}}
A.f.prototype={
gt(a){return new A.H(J.E(this.a),this.b,this.$ti.h("H<1>"))}}
A.H.prototype={
j(){var s,r
for(s=this.a,r=this.b;s.j();)if(r.$1(s.gl()))return!0
return!1},
gl(){return this.a.gl()},
$iC:1}
A.bB.prototype={
gt(a){return new A.bC(J.E(this.a),this.b,B.P,this.$ti.h("bC<1,2>"))}}
A.bC.prototype={
gl(){var s=this.d
return s==null?this.$ti.y[1].a(s):s},
j(){var s,r,q=this,p=q.c
if(p==null)return!1
for(s=q.a,r=q.b;!p.j();){q.d=null
if(s.j()){q.c=null
p=J.E(r.$1(s.gl()))
q.c=p}else return!1}q.d=q.c.gl()
return!0},
$iC:1}
A.aW.prototype={
gt(a){var s=this.a
return new A.aX(s.gt(s),this.b,A.r(this).h("aX<1>"))}}
A.by.prototype={
gm(a){var s=this.a,r=s.gm(s)
s=this.b
if(r>s)return s
return r},
$il:1}
A.aX.prototype={
j(){if(--this.b>=0)return this.a.j()
this.b=-1
return!1},
gl(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gl()},
$iC:1}
A.bz.prototype={
j(){return!1},
gl(){throw A.e(A.av())},
$iC:1}
A.c4.prototype={
gt(a){return new A.c5(J.E(this.a),this.$ti.h("c5<1>"))}}
A.c5.prototype={
j(){var s,r
for(s=this.a,r=this.$ti.c;s.j();)if(r.b(s.gl()))return!0
return!1},
gl(){return this.$ti.c.a(this.a.gl())},
$iC:1}
A.a_.prototype={}
A.a3.prototype={
gm(a){return this.a.length},
N(a,b){var s=this.a
return J.hz(s,s.length-1-b)}}
A.bi.prototype={$r:"+(1,2,3)",$s:1}
A.bj.prototype={$r:"+high,low,selfHigh,selfLow(1,2,3,4)",$s:2}
A.bv.prototype={}
A.bu.prototype={
gU(a){return this.gm(this)===0},
n(a){return A.fm(this)},
ga6(){return new A.ar(this.cq(),A.r(this).h("ar<a1<1,2>>"))},
cq(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$ga6(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.ga0(),o=o.gt(o),n=A.r(s),m=n.y[1],n=n.h("a1<1,2>")
case 2:if(!o.j()){r=3
break}l=o.gl()
k=s.i(0,l)
r=4
return a.b=new A.a1(l,k==null?m.a(k):k,n),1
case 4:r=2
break
case 3:return 0
case 1:return a.c=p.at(-1),3}}}},
$ia0:1}
A.bw.prototype={
gm(a){return this.b.length},
gbd(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
Z(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
i(a,b){if(!this.Z(b))return null
return this.b[this.a[b]]},
a_(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbd()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
ga0(){return new A.b_(this.gbd(),this.$ti.h("b_<1>"))},
gb1(){return new A.b_(this.b,this.$ti.h("b_<2>"))}}
A.b_.prototype={
gm(a){return this.a.length},
gt(a){var s=this.a
return new A.c6(s,s.length,this.$ti.h("c6<1>"))}}
A.c6.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iC:1}
A.cF.prototype={
a2(a,b){if(b==null)return!1
return b instanceof A.aT&&this.a.a2(0,b.a)&&A.hW(this)===A.hW(b)},
gI(a){return A.hH(this.a,A.hW(this),B.k,B.k)},
n(a){var s=B.a.cz([A.aC(this.$ti.c)],", ")
return this.a.n(0)+" with "+("<"+s+">")}}
A.aT.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.lq(A.ho(this.a),this.$ti)}}
A.fB.prototype={
$0(){return B.b.T(1000*this.a.now())},
$S:4}
A.bY.prototype={}
A.fO.prototype={
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
A.bV.prototype={
n(a){return"Null check operator used on a null value"}}
A.cK.prototype={
n(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.d3.prototype={
n(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.fo.prototype={
n(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.bA.prototype={}
A.cc.prototype={
n(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iaI:1}
A.Z.prototype={
n(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.j_(r==null?"unknown":r)+"'"},
$iau:1,
gcR(){return this},
$C:"$1",
$R:1,
$D:null}
A.cw.prototype={$C:"$0",$R:0}
A.cx.prototype={$C:"$2",$R:2}
A.d1.prototype={}
A.d0.prototype={
n(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.j_(s)+"'"}}
A.b7.prototype={
a2(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.b7))return!1
return this.$_target===b.$_target&&this.a===b.a},
gI(a){return(A.iW(this.a)^A.cY(this.$_target))>>>0},
n(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.cZ(this.a)+"'")}}
A.d_.prototype={
n(a){return"RuntimeError: "+this.a}}
A.aw.prototype={
gm(a){return this.a},
gU(a){return this.a===0},
ga0(){return new A.aa(this,A.r(this).h("aa<1>"))},
ga6(){return new A.aU(this,A.r(this).h("aU<1,2>"))},
Z(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.cu(a)},
cu(a){var s=this.d
if(s==null)return!1
return this.aU(this.bc(s,a),a)>=0},
A(a,b){A.r(this).h("a0<1,2>").a(b).a_(0,new A.fe(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.cv(b)},
cv(a){var s,r,q=this.d
if(q==null)return null
s=this.bc(q,a)
r=this.aU(s,a)
if(r<0)return null
return s[r].b},
u(a,b,c){var s,r,q=this,p=A.r(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.b5(s==null?q.b=q.aN():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.b5(r==null?q.c=q.aN():r,b,c)}else q.cw(b,c)},
cw(a,b){var s,r,q,p,o=this,n=A.r(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.aN()
r=o.bz(a)
q=s[r]
if(q==null)s[r]=[o.aO(a,b)]
else{p=o.aU(q,a)
if(p>=0)q[p].b=b
else q.push(o.aO(a,b))}},
a7(a,b){var s=this.c1(this.b,b)
return s},
al(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.aM()}},
a_(a,b){var s,r,q=this
A.r(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.e(A.S(q))
s=s.c}},
b5(a,b,c){var s,r=A.r(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.aO(b,c)
else s.b=c},
c1(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.ca(s)
delete a[b]
return s.b},
aM(){this.r=this.r+1&1073741823},
aO(a,b){var s=this,r=A.r(s),q=new A.fi(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.aM()
return q},
ca(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.aM()},
bz(a){return J.Y(a)&1073741823},
bc(a,b){return a[this.bz(b)]},
aU(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.af(a[r].a,b))return r
return-1},
n(a){return A.fm(this)},
aN(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$iic:1}
A.fe.prototype={
$2(a,b){var s=this.a,r=A.r(s)
s.u(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.r(this.a).h("~(1,2)")}}
A.fi.prototype={}
A.aa.prototype={
gm(a){return this.a.a},
gU(a){return this.a.a===0},
gt(a){var s=this.a
return new A.bM(s,s.r,s.e,this.$ti.h("bM<1>"))},
q(a,b){return this.a.Z(b)}}
A.bM.prototype={
gl(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.e(A.S(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iC:1}
A.ab.prototype={
gm(a){return this.a.a},
gt(a){var s=this.a
return new A.bN(s,s.r,s.e,this.$ti.h("bN<1>"))}}
A.bN.prototype={
gl(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.e(A.S(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iC:1}
A.aU.prototype={
gm(a){return this.a.a},
gt(a){var s=this.a
return new A.bL(s,s.r,s.e,this.$ti.h("bL<1,2>"))}}
A.bL.prototype={
gl(){var s=this.d
s.toString
return s},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.e(A.S(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.a1(s.a,s.b,r.$ti.h("a1<1,2>"))
r.c=s.c
return!0}},
$iC:1}
A.hs.prototype={
$1(a){return this.a(a)},
$S:15}
A.ht.prototype={
$2(a,b){return this.a(a,b)},
$S:31}
A.hu.prototype={
$1(a){return this.a(A.D(a))},
$S:29}
A.aA.prototype={
n(a){return this.bm(!1)},
bm(a){var s,r,q,p,o,n=this.bZ(),m=this.aL(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.k(m,q)
o=m[q]
l=a?l+A.ih(o):l+A.q(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
bZ(){var s,r=this.$s
while($.hb.length<=r)B.a.k($.hb,null)
s=$.hb[r]
if(s==null){s=this.bW()
B.a.u($.hb,r,s)}return s},
bW(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.c(new Array(l),t.Q)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.u(k,q,r[s])}}return A.aH(k,t.K)}}
A.bg.prototype={
aL(){return[this.a,this.b,this.c]},
a2(a,b){var s=this
if(b==null)return!1
return b instanceof A.bg&&s.$s===b.$s&&J.af(s.a,b.a)&&J.af(s.b,b.b)&&J.af(s.c,b.c)},
gI(a){var s=this
return A.hH(s.$s,s.a,s.b,s.c)}}
A.bh.prototype={
aL(){return this.a},
a2(a,b){if(b==null)return!1
return b instanceof A.bh&&this.$s===b.$s&&A.kc(this.a,b.a)},
gI(a){return A.hH(this.$s,A.jL(this.a),B.k,B.k)}}
A.bb.prototype={
gJ(a){return B.ab},
$iw:1}
A.bT.prototype={}
A.cM.prototype={
gJ(a){return B.ac},
$iw:1}
A.bc.prototype={
gm(a){return a.length},
$ia9:1}
A.bR.prototype={$il:1,$ib:1,$in:1}
A.bS.prototype={$il:1,$ib:1,$in:1}
A.cN.prototype={
gJ(a){return B.ad},
$iw:1}
A.cO.prototype={
gJ(a){return B.ae},
$iw:1}
A.cP.prototype={
gJ(a){return B.af},
$iw:1}
A.cQ.prototype={
gJ(a){return B.ag},
$iw:1}
A.cR.prototype={
gJ(a){return B.ah},
$iw:1}
A.cS.prototype={
gJ(a){return B.aj},
$iw:1}
A.cT.prototype={
gJ(a){return B.ak},
$iw:1}
A.bU.prototype={
gJ(a){return B.al},
gm(a){return a.length},
$iw:1}
A.cU.prototype={
gJ(a){return B.am},
gm(a){return a.length},
$iw:1,
$ihL:1}
A.c7.prototype={}
A.c8.prototype={}
A.c9.prototype={}
A.ca.prototype={}
A.ai.prototype={
h(a){return A.cg(v.typeUniverse,this,a)},
C(a){return A.iz(v.typeUniverse,this,a)}}
A.d7.prototype={}
A.hf.prototype={
n(a){return A.a4(this.a,null)}}
A.d6.prototype={
n(a){return this.a}}
A.bk.prototype={$iay:1}
A.fR.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:16}
A.fQ.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:26}
A.fS.prototype={
$0(){this.a.$0()},
$S:17}
A.fT.prototype={
$0(){this.a.$0()},
$S:17}
A.hd.prototype={
bP(a,b){if(self.setTimeout!=null)self.setTimeout(A.dg(new A.he(this,b),0),a)
else throw A.e(A.c3("`setTimeout()` not found."))}}
A.he.prototype={
$0(){this.b.$0()},
$S:1}
A.d4.prototype={}
A.hj.prototype={
$1(a){return this.a.$2(0,a)},
$S:36}
A.hk.prototype={
$2(a,b){this.a.$2(1,new A.bA(a,t.l.a(b)))},
$S:38}
A.hn.prototype={
$2(a,b){this.a(A.d(a),b)},
$S:39}
A.aB.prototype={
gl(){var s=this.b
return s==null?this.$ti.c.a(s):s},
c3(a,b){var s,r,q
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
o.d=null}q=o.c3(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.it
return!1}if(0>=p.length)return A.k(p,-1)
o.a=p.pop()
m=0
n=null
continue}if(2===q){m=0
n=null
continue}if(3===q){n=o.c
o.c=null
p=o.e
if(p==null||p.length===0){o.b=null
o.a=A.it
throw n
return!1}if(0>=p.length)return A.k(p,-1)
o.a=p.pop()
m=1
continue}throw A.e(A.ij("sync*"))}return!1},
cT(a){var s,r,q=this
if(a instanceof A.ar){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.k(r,q.a)
q.a=s
return 2}else{q.d=J.E(a)
return 2}},
$iC:1}
A.ar.prototype={
gt(a){return new A.aB(this.a(),this.$ti.h("aB<1>"))}}
A.ah.prototype={
n(a){return A.q(this.a)},
$iz:1,
gaq(){return this.b}}
A.fb.prototype={
$0(){this.c.a(null)
this.b.bU(null)},
$S:1}
A.aY.prototype={
cA(a){if((this.c&15)!==6)return!0
return this.b.b.b_(t.al.a(this.d),a.a,t.y,t.K)},
cs(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.cJ(q,m,a.b,o,n,t.l)
else p=l.b_(t.B.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.aD(s))){if((r.c&1)!==0)throw A.e(A.ct("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.e(A.ct("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.O.prototype={
bC(a,b,c){var s,r,q=this.$ti
q.C(c).h("1/(2)").a(a)
s=$.I
if(s===B.j){if(!t.C.b(b)&&!t.B.b(b))throw A.e(A.hA(b,"onError",u.c))}else{c.h("@<0/>").C(q.c).h("1(2)").a(a)
b=A.kZ(b,s)}r=new A.O(s,c.h("O<0>"))
this.aC(new A.aY(r,3,a,b,q.h("@<1>").C(c).h("aY<1,2>")))
return r},
bl(a,b,c){var s,r=this.$ti
r.C(c).h("1/(2)").a(a)
s=new A.O($.I,c.h("O<0>"))
this.aC(new A.aY(s,19,a,b,r.h("@<1>").C(c).h("aY<1,2>")))
return s},
c5(a){this.a=this.a&1|16
this.c=a},
au(a){this.a=a.a&30|this.a&1
this.c=a.c},
aC(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.aC(a)
return}r.au(s)}A.df(null,null,r.b,t.M.a(new A.fW(r,a)))}},
bh(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.bh(a)
return}m.au(n)}l.a=m.av(a)
A.df(null,null,m.b,t.M.a(new A.h0(l,m)))}},
aj(){var s=t.F.a(this.c)
this.c=null
return this.av(s)},
av(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bU(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("aE<1>").b(a))A.fZ(a,r,!0)
else{s=r.aj()
q.c.a(a)
r.a=8
r.c=a
A.aZ(r,s)}},
bb(a){var s,r=this
r.$ti.c.a(a)
s=r.aj()
r.a=8
r.c=a
A.aZ(r,s)},
bV(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aj()
q.au(a)
A.aZ(q,r)},
aG(a){var s=this.aj()
this.c5(a)
A.aZ(this,s)},
bS(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("aE<1>").b(a)){this.b7(a)
return}this.bT(a)},
bT(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.df(null,null,s.b,t.M.a(new A.fY(s,a)))},
b7(a){A.fZ(this.$ti.h("aE<1>").a(a),this,!1)
return},
b6(a){this.a^=2
A.df(null,null,this.b,t.M.a(new A.fX(this,a)))},
$iaE:1}
A.fW.prototype={
$0(){A.aZ(this.a,this.b)},
$S:1}
A.h0.prototype={
$0(){A.aZ(this.b,this.a.a)},
$S:1}
A.h_.prototype={
$0(){A.fZ(this.a.a,this.b,!0)},
$S:1}
A.fY.prototype={
$0(){this.a.bb(this.b)},
$S:1}
A.fX.prototype={
$0(){this.a.aG(this.b)},
$S:1}
A.h3.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.cI(t.fO.a(q.d),t.z)}catch(p){s=A.aD(p)
r=A.bq(p)
if(k.c&&t.t.a(k.b.a.c).a===s){q=k.a
q.c=t.t.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.hB(q)
n=k.a
n.c=new A.ah(q,o)
q=n}q.b=!0
return}if(j instanceof A.O&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.t.a(j.c)
q.b=!0}return}if(j instanceof A.O){m=k.b.a
l=new A.O(m.b,m.$ti)
j.bC(new A.h4(l,m),new A.h5(l),t.p)
q=k.a
q.c=l
q.b=!1}},
$S:1}
A.h4.prototype={
$1(a){this.a.bV(this.b)},
$S:16}
A.h5.prototype={
$2(a,b){A.cj(a)
t.l.a(b)
this.a.aG(new A.ah(a,b))},
$S:43}
A.h2.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.b_(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aD(l)
r=A.bq(l)
q=s
p=r
if(p==null)p=A.hB(q)
o=this.a
o.c=new A.ah(q,p)
o.b=!0}},
$S:1}
A.h1.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.t.a(l.a.a.c)
p=l.b
if(p.a.cA(s)&&p.a.e!=null){p.c=p.a.cs(s)
p.b=!1}}catch(o){r=A.aD(o)
q=A.bq(o)
p=t.t.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.hB(p)
m=l.b
m.c=new A.ah(p,n)
p=m}p.b=!0}},
$S:1}
A.d5.prototype={}
A.dc.prototype={}
A.ci.prototype={$iio:1}
A.db.prototype={
cK(a){var s,r,q
t.M.a(a)
try{if(B.j===$.I){a.$0()
return}A.iJ(null,null,this,a,t.p)}catch(q){s=A.aD(q)
r=A.bq(q)
A.hS(A.cj(s),t.l.a(r))}},
bp(a){return new A.hc(this,t.M.a(a))},
cI(a,b){b.h("0()").a(a)
if($.I===B.j)return a.$0()
return A.iJ(null,null,this,a,b)},
b_(a,b,c,d){c.h("@<0>").C(d).h("1(2)").a(a)
d.a(b)
if($.I===B.j)return a.$1(b)
return A.l0(null,null,this,a,b,c,d)},
cJ(a,b,c,d,e,f){d.h("@<0>").C(e).C(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.I===B.j)return a.$2(b,c)
return A.l_(null,null,this,a,b,c,d,e,f)},
bB(a,b,c,d){return b.h("@<0>").C(c).C(d).h("1(2,3)").a(a)}}
A.hc.prototype={
$0(){return this.a.cK(this.b)},
$S:1}
A.hm.prototype={
$0(){A.jy(this.a,this.b)},
$S:1}
A.aK.prototype={
gt(a){var s=this,r=new A.b0(s,s.r,s.$ti.h("b0<1>"))
r.c=s.e
return r},
gm(a){return this.a},
q(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.bX(b)},
bX(a){var s=this.d
if(s==null)return!1
return this.aK(s[J.Y(a)&1073741823],a)>=0},
k(a,b){var s,r,q=this
q.$ti.c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.b8(s==null?q.b=A.hM():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.b8(r==null?q.c=A.hM():r,b)}else return q.bQ(b)},
bQ(a){var s,r,q,p=this
p.$ti.c.a(a)
s=p.d
if(s==null)s=p.d=A.hM()
r=J.Y(a)&1073741823
q=s[r]
if(q==null)s[r]=[p.aF(a)]
else{if(p.aK(q,a)>=0)return!1
q.push(p.aF(a))}return!0},
a7(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.b9(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.b9(s.c,b)
else return s.c0(b)},
c0(a){var s,r,q,p,o=this.d
if(o==null)return!1
s=J.Y(a)&1073741823
r=o[s]
q=this.aK(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete o[s]
this.ba(p)
return!0},
b8(a,b){this.$ti.c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.aF(b)
return!0},
b9(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.ba(s)
delete a[b]
return!0},
aE(){this.r=this.r+1&1073741823},
aF(a){var s,r=this,q=new A.da(r.$ti.c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.aE()
return q},
ba(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.aE()},
aK(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.af(a[r].a,b))return r
return-1},
$iie:1}
A.da.prototype={}
A.b0.prototype={
gl(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.e(A.S(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iC:1}
A.fj.prototype={
$2(a,b){this.a.u(0,this.b.a(a),this.c.a(b))},
$S:48}
A.A.prototype={
gt(a){return new A.y(a,a.length,A.aN(a).h("y<A.E>"))},
N(a,b){if(!(b>=0&&b<a.length))return A.k(a,b)
return a[b]},
gU(a){return a.length===0},
gaX(a){return a.length!==0},
gK(a){var s=a.length
if(s===0)throw A.e(A.av())
if(0>=s)return A.k(a,0)
return a[0]},
gaY(a){var s,r=a.length
if(r===0)throw A.e(A.av())
s=r-1
if(!(s>=0))return A.k(a,s)
return a[s]},
F(a,b,c,d){var s,r,q,p
d.a(b)
A.aN(a).C(d).h("1(1,A.E)").a(c)
s=a.length
for(r=s,q=b,p=0;p<s;++p){if(!(p<r))return A.k(a,p)
q=c.$2(q,a[p])
r=a.length
if(s!==r)throw A.e(A.S(a))}return q},
aB(a,b){return A.ac(a,b,null,A.aN(a).h("A.E"))},
n(a){return A.hD(a,"[","]")}}
A.B.prototype={
a_(a,b){var s,r,q,p=A.r(this)
p.h("~(B.K,B.V)").a(b)
for(s=this.ga0(),s=s.gt(s),p=p.h("B.V");s.j();){r=s.gl()
q=this.i(0,r)
b.$2(r,q==null?p.a(q):q)}},
ad(a,b,c){var s,r=this,q=A.r(r)
q.h("B.K").a(a)
q.h("B.V(B.V)").a(b)
q.h("B.V()?").a(c)
if(r.Z(a)){s=r.i(0,a)
q=b.$1(s==null?q.h("B.V").a(s):s)
r.u(0,a,q)
return q}q=c.$0()
r.u(0,a,q)
return q},
ga6(){return this.ga0().bA(0,new A.fl(this),A.r(this).h("a1<B.K,B.V>"))},
Z(a){return this.ga0().q(0,a)},
gm(a){var s=this.ga0()
return s.gm(s)},
gU(a){var s=this.ga0()
return s.gU(s)},
n(a){return A.fm(this)},
$ia0:1}
A.fl.prototype={
$1(a){var s=this.a,r=A.r(s)
r.h("B.K").a(a)
s=s.i(0,a)
if(s==null)s=r.h("B.V").a(s)
return new A.a1(a,s,r.h("a1<B.K,B.V>"))},
$S(){return A.r(this.a).h("a1<B.K,B.V>(B.K)")}}
A.fn.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.q(a)
r.a=(r.a+=s)+": "
s=A.q(b)
r.a+=s},
$S:18}
A.ch.prototype={}
A.ba.prototype={
i(a,b){return this.a.i(0,b)},
a_(a,b){this.a.a_(0,this.$ti.h("~(1,2)").a(b))},
gU(a){return this.a.a===0},
gm(a){return this.a.a},
n(a){return A.fm(this.a)},
gb1(){var s=this.a
return new A.ab(s,A.r(s).h("ab<2>"))},
ga6(){var s=this.a
return new A.aU(s,A.r(s).h("aU<1,2>"))},
$ia0:1}
A.c1.prototype={}
A.be.prototype={
A(a,b){var s,r,q
this.$ti.h("b<1>").a(b)
for(s=A.ha(b,b.r,b.$ti.c),r=s.$ti.c;s.j();){q=s.d
this.k(0,q==null?r.a(q):q)}},
n(a){return A.hD(this,"{","}")},
F(a,b,c,d){var s,r,q,p
d.a(b)
s=this.$ti
s.C(d).h("1(1,2)").a(c)
for(s=A.ha(this,this.r,s.c),r=s.$ti.c,q=b;s.j();){p=s.d
q=c.$2(q,p==null?r.a(p):p)}return q},
$il:1,
$ib:1,
$ihJ:1}
A.cb.prototype={
co(a){var s,r,q=this.$ti,p=new A.aK(q)
for(q=A.ha(this,this.r,q.c),s=q.$ti.c;q.j();){r=q.d
if(r==null)r=s.a(r)
if(!a.q(0,r))p.k(0,r)}return p}}
A.bl.prototype={}
A.d8.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.c_(b):s}},
gm(a){return this.b==null?this.c.a:this.ai().length},
gU(a){return this.gm(0)===0},
ga0(){if(this.b==null){var s=this.c
return new A.aa(s,A.r(s).h("aa<1>"))}return new A.d9(this)},
u(a,b,c){var s,r,q=this
A.D(b)
if(q.b==null)q.c.u(0,b,c)
else if(q.Z(b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.cb().u(0,b,c)},
Z(a){if(this.b==null)return this.c.Z(a)
return!1},
a_(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.a_(0,b)
s=o.ai()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.hl(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.e(A.S(o))}},
ai(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.c(Object.keys(this.a),t.s)
return s},
cb(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.X(t.N,t.z)
r=n.ai()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.u(0,o,n.i(0,o))}if(p===0)B.a.k(r,"")
else B.a.al(r)
n.a=n.b=null
return n.c=s},
c_(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.hl(this.a[a])
return this.b[a]=s}}
A.d9.prototype={
gm(a){return this.a.gm(0)},
N(a,b){var s=this.a
if(s.b==null)s=s.ga0().N(0,b)
else{s=s.ai()
if(!(b>=0&&b<s.length))return A.k(s,b)
s=s[b]}return s},
gt(a){var s=this.a
if(s.b==null){s=s.ga0()
s=s.gt(s)}else{s=s.ai()
s=new J.aS(s,s.length,A.j(s).h("aS<1>"))}return s},
q(a,b){return this.a.Z(b)}}
A.cy.prototype={}
A.cA.prototype={}
A.bJ.prototype={
n(a){var s=A.cD(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.cL.prototype={
n(a){return"Cyclic error in JSON stringify"}}
A.ff.prototype={
cl(a,b){var s=A.kX(a,this.gcm().a)
return s},
ac(a,b){var s=A.k3(a,this.gcp().b,null)
return s},
gcp(){return B.a9},
gcm(){return B.a8}}
A.fh.prototype={}
A.fg.prototype={}
A.h8.prototype={
bF(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.l.ar(a,r,q)
r=q+1
o=A.U(92)
s.a+=o
o=A.U(117)
s.a+=o
o=A.U(100)
s.a+=o
o=p>>>8&15
o=A.U(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.U(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.U(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.l.ar(a,r,q)
r=q+1
o=A.U(92)
s.a+=o
switch(p){case 8:o=A.U(98)
s.a+=o
break
case 9:o=A.U(116)
s.a+=o
break
case 10:o=A.U(110)
s.a+=o
break
case 12:o=A.U(102)
s.a+=o
break
case 13:o=A.U(114)
s.a+=o
break
default:o=A.U(117)
s.a+=o
o=A.U(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.U(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.U(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.l.ar(a,r,q)
r=q+1
o=A.U(92)
s.a+=o
o=A.U(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.l.ar(a,r,m)},
aD(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.e(new A.cL(a,null))}B.a.k(s,a)},
aA(a){var s,r,q,p,o=this
if(o.bE(a))return
o.aD(a)
try{s=o.b.$1(a)
if(!o.bE(s)){q=A.ib(a,null,o.gbe())
throw A.e(q)}q=o.a
if(0>=q.length)return A.k(q,-1)
q.pop()}catch(p){r=A.aD(p)
q=A.ib(a,r,o.gbe())
throw A.e(q)}},
bE(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.b.n(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.bF(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.aD(a)
q.cO(a)
s=q.a
if(0>=s.length)return A.k(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.aD(a)
r=q.cP(a)
s=q.a
if(0>=s.length)return A.k(s,-1)
s.pop()
return r}else return!1},
cO(a){var s,r=this.c
r.a+="["
if(J.je(a)){if(0>=a.length)return A.k(a,0)
this.aA(a[0])
for(s=1;s<a.length;++s){r.a+=","
this.aA(a[s])}}r.a+="]"},
cP(a){var s,r,q,p,o,n,m=this,l={}
if(a.gU(a)){m.c.a+="{}"
return!0}s=a.gm(a)*2
r=A.fk(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.a_(0,new A.h9(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.bF(A.D(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.k(r,n)
m.aA(r[n])}p.a+="}"
return!0}}
A.h9.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.u(s,r.a++,a)
B.a.u(s,r.a++,b)},
$S:18}
A.h7.prototype={
gbe(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.cC.prototype={
a2(a,b){if(b==null)return!1
return b instanceof A.cC},
gI(a){return B.c.gI(0)},
n(a){return"0:00:00."+B.l.cB(B.c.n(0),6,"0")}}
A.fU.prototype={
n(a){return this.aH()}}
A.z.prototype={
gaq(){return A.jN(this)}}
A.cu.prototype={
n(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cD(s)
return"Assertion failed"}}
A.ay.prototype={}
A.an.prototype={
gaJ(){return"Invalid argument"+(!this.a?"(s)":"")},
gaI(){return""},
n(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gaJ()+q+o
if(!s.a)return n
return n+s.gaI()+": "+A.cD(s.gaV())},
gaV(){return this.b}}
A.bW.prototype={
gaV(){return A.iC(this.b)},
gaJ(){return"RangeError"},
gaI(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.q(q):""
else if(q==null)s=": Not greater than or equal to "+A.q(r)
else if(q>r)s=": Not in inclusive range "+A.q(r)+".."+A.q(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.q(r)
return s}}
A.cE.prototype={
gaV(){return A.d(this.b)},
gaJ(){return"RangeError"},
gaI(){if(A.d(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gm(a){return this.f}}
A.c2.prototype={
n(a){return"Unsupported operation: "+this.a}}
A.d2.prototype={
n(a){return"UnimplementedError: "+this.a}}
A.c_.prototype={
n(a){return"Bad state: "+this.a}}
A.cz.prototype={
n(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.cD(s)+"."}}
A.cV.prototype={
n(a){return"Out of Memory"},
gaq(){return null},
$iz:1}
A.bZ.prototype={
n(a){return"Stack Overflow"},
gaq(){return null},
$iz:1}
A.fV.prototype={
n(a){return"Exception: "+this.a}}
A.at.prototype={
n(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.b.prototype={
bA(a,b,c){var s=A.r(this)
return A.jK(this,s.C(c).h("1(b.E)").a(b),s.h("b.E"),c)},
cN(a,b){var s=A.r(this)
return new A.f(this,s.h("i(b.E)").a(b),s.h("f<b.E>"))},
F(a,b,c,d){var s,r
d.a(b)
A.r(this).C(d).h("1(1,b.E)").a(c)
for(s=this.gt(this),r=b;s.j();)r=c.$2(r,s.gl())
return r},
gm(a){var s,r=this.gt(this)
for(s=0;r.j();)++s
return s},
gK(a){var s=this.gt(this)
if(!s.j())throw A.e(A.av())
return s.gl()},
N(a,b){var s,r
A.bX(b,"index")
s=this.gt(this)
for(r=b;s.j();){if(r===0)return s.gl();--r}throw A.e(A.hC(b,b-r,this,"index"))},
n(a){return A.jF(this,"(",")")}}
A.a1.prototype={
n(a){return"MapEntry("+A.q(this.a)+": "+A.q(this.b)+")"}}
A.a2.prototype={
gI(a){return A.u.prototype.gI.call(this,0)},
n(a){return"null"}}
A.u.prototype={$iu:1,
a2(a,b){return this===b},
gI(a){return A.cY(this)},
n(a){return"Instance of '"+A.cZ(this)+"'"},
gJ(a){return A.lk(this)},
toString(){return this.n(this)}}
A.dd.prototype={
n(a){return""},
$iaI:1}
A.fF.prototype={
gbw(){var s,r=this.b
if(r==null)r=$.fD.$0()
s=r-this.a
if($.i0()===1e6)return s
return s*1000},
b3(){var s=this,r=s.b
if(r!=null){s.a=s.a+($.fD.$0()-r)
s.b=null}}}
A.bf.prototype={
gm(a){return this.a.length},
n(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ijT:1}
A.aJ.prototype={}
A.e_.prototype={}
A.cr.prototype={
S(){var s,r=this,q=r.y,p=A.r(q).h("ab<2>")
q=A.x(new A.ab(q,p),p.h("b.E"))
s=A.i2(r.a,r.b,r.c,q)
s.d=r.d
s.e=r.e
s.f=r.f
s.r=r.r
q=s.w
q.al(0)
q.A(0,r.w)
q=s.x
q.al(0)
q.A(0,r.x)
s.z.A(0,r.z)
s.Q.A(0,r.Q)
s.as.A(0,r.as)
s.at.A(0,r.at)
s.ax.A(0,r.ax)
s.ay.A(0,r.ay)
B.a.A(s.ch,r.ch)
return s},
E(a){var s=this.a.E(a),r=A.j(s),q=r.h("f<1>")
s=A.x(new A.f(s,r.h("i(1)").a(new A.dB(this)),q),q.h("b.E"))
return s},
R(a){var s
if(a.ax==null){s=this.x.i(0,a.a)
if(s==null)s=a.d}else s=a.gae()
return s},
L(a){var s,r=this.E(a).length,q=this.at.i(0,a)
if(q==null)q=0
s=this.ax.q(0,a)?1:0
return r+q+s},
ak(c9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1=this,c2="monthSeconds",c3="supplySafety",c4="supplySeconds",c5="battleBudget",c6=c1.b,c7=c6.b,c8=c7.i(0,c2)
c8.toString
s=c7.i(0,c3)
s.toString
r=c8+s
c8=c1.ch
s=A.x(c8,t.gf)
for(q=c1.a,p=q.e,o=A.j(p),n=o.h("i(1)"),m=n.a(new A.dp(c1)),l=B.a.gt(p),m=new A.H(l,m,o.h("H<1>")),k=c1.y,j=c1.c,o=o.h("f<1>"),c6=c6.r,i=c6.e,h=q.b/60,g=c6.d;m.j();){c6=l.gl()
f=k.i(0,c6.a)
e=c6.as
d=e===B.n
if(d&&f==null){c=c7.i(0,"campRate")
c.toString}else c=1
b=c7.i(0,c4)
b.toString
e=e===B.w
if(e&&c6.p2.length!==0){a=c6.z
if(c6.k1!=null){d=c7.i(0,c5)
d.toString
a0=d}else a0=0
for(d=c6.p2,a1=d.length,a2=0;a2<d.length;d.length===a1||(0,A.v)(d),++a2,a=a3){a3=d[a2]
a0+=j.a9(a,a3)}}else{a1=f!=null
if(a1&&f.z){a=c6.z
for(d=J.jh(f.f,f.r),a1=d.$ti,d=new A.y(d,d.gm(0),a1.h("y<m.E>")),a1=a1.h("m.E"),a0=g;d.j();a=a5){a4=d.d
a5=a4==null?a1.a(a4):a4
a0+=j.a9(a,a5)}}else{a4=c6.cx
if(a4!=null){a6=q.M(a4)
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
a8=q.M(a4)
a0=Math.max(r,a7)
if(a8!=null&&a8.b!==c6.b){a9=new A.f(p,n.a(new A.dq(c6,a8)),o).gm(0)
d=a8.ax
d=d==null?a8.d:B.c.v(d-a8.ay,0,5)
b0=Math.max(1,Math.min(d,q.E(a8.a).length))
d=c7.i(0,c5)
d.toString
a1=c7.i(0,c3)
a1.toString
a0=a7+b0*(1+a9)*d+a1}}else a0=r}}}if(!isFinite(a0))a0=600
r=Math.max(r,a0)
b1=f==null&&c6.cx==null&&!e
c6=c6.ch
e=b1?1/0:a0
B.a.k(s,new A.aJ(c6,c/b,e))}for(c6=c8.length,a2=0;a2<c6;++a2)r=Math.max(r,c8[a2].c)
r=Math.min(600,r)
c6=t.S
b2=new A.f(p,n.a(new A.dr(c1)),o).F(0,c1.r,new A.ds(),c6)
o=q.gP()
n=o.$ti
b3=new A.f(o,n.h("i(b.E)").a(new A.dt(c1)),n.h("f<b.E>")).F(0,0,new A.du(c1),c6)
b4=A.jJ([r],t.i)
b5=A.c([],t.n)
b6=q.c
c8=r+1e-9
b7=b6
while(b7<=c8){b4.k(0,b7)
B.a.k(b5,b7)
q=c7.i(0,c2)
q.toString
b7+=q}for(c8=A.ha(b4,b4.r,b4.$ti.c),q=b2-b3,p=c8.$ti.c,b8=0;c8.j();){o=c8.d
if(o==null)o=p.a(o)
b9=B.a.F(s,0,new A.dv(o),c6)
if(o+1e-9<b6)c0=0
else{n=c7.i(0,c2)
n.toString
c0=1+B.b.T((o-b6)/n)}if(B.a.W(b5,new A.dw(o)))b8=Math.max(b8,b9+Math.max(0,c0-1)*q)
b8=Math.max(b8,b9+c0*q)}c6=Math.max(0,b8)
if(c9)c7=0
else{c7=c7.i(0,"emergencyGold")
c7.toString
c7=B.b.p(c7)}return new A.e_(c6+c7)},
Y(){return this.ak(!1)},
b0(a,b){var s,r,q,p,o,n,m,l,k,j=this,i="capacityPerLevel"
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
if(!(l>=0))return A.k(o,l)
m=B.c.v(o[l]-b.x,0,99999)}if(m==null||j.d<m)return!1
if(a.b===a.c)k=1
else{o=p.b.i(0,"foreignYield")
o.toString
k=o}o=j.f
n=q+1
p=p.b
l=p.i(0,i)
l.toString
l=B.b.T(n*B.b.p(l)*k)
p=p.i(0,i)
p.toString
j.f=o+(l-B.b.T(q*B.b.p(p)*k))
j.d=j.d-m
s.u(0,r,n)
return!0},
bv(a){var s,r,q,p,o,n=this
if(!a.dy||a.e===2||n.z.q(0,a.a))return!1
s=a.a
n.z.k(0,s)
n.y.a7(0,s)
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
p=s!==B.f
n.e=Math.min(q,r+(!p||s===B.d?a.gO():0))
if(!p||s===B.d)for(s=a.ax,r=s.length,q=n.w,o=0;o<r;++o)q.ad(s[o],new A.dz(),new A.dA())
return!0},
bq(a){var s,r=this,q=r.b.b.i(0,"soldierCost")
q.toString
s=a*B.b.p(q)
if(a<0||r.e+a>r.f||r.d<s)return!1
r.d-=s
r.e+=a
return!0},
cd(a){var s=this,r=s.b.f.i(0,a)
if(r==null||!r.f||s.a.gP().gm(0)<r.e||s.d<r.b)return!1
s.d=s.d-r.b
s.w.ad(a,new A.dm(),new A.dn())
return!0},
cD(a){var s,r,q,p,o,n,m=this,l=m.b.b,k=l.i(0,"recruitBase")
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
if(a.as){p=m.ax
k=p.q(0,s)||m.a.r<=p.a||m.L(s)>=k+(r-1)*q||m.d<n}else k=!0
if(k)return!1
m.d-=n
m.r=m.r+m.a.w
k=m.f
l=l.i(0,"capacityPerHero")
l.toString
m.f=k+B.b.p(l)
m.ax.k(0,s)
return!0},
cn(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(b)
if(a.db){s=a.a
s=l.as.q(0,s)||l.z.q(0,s)||l.d<=0}else s=!0
if(s)return!1
s=l.w
r=t.S
q=A.id(s,r,r)
r=b.length
p=l.b.b
o=p.i(0,"carryLimit")
o.toString
if(r>B.b.p(o))return!1
for(r=b.length,n=0;n<b.length;b.length===r||(0,A.v)(b),++n){m=b[n]
o=q.i(0,m)
if((o==null?0:o)===0)return!1
o=q.i(0,m)
o.toString
q.u(0,m,o-1)}s.al(0)
s.A(0,q)
s=l.e
r=p.i(0,"soldierLimit")
r.toString
l.e=s-Math.min(s,B.b.p(r)-a.gO())
r=a.a
l.Q.k(0,r)
l.as.k(0,r)
l.y.u(0,r,c)
if(c.z&&c.d!=null){s=c.d
s.toString
l.at.ad(s,new A.dx(),new A.dy())}s=p.i(0,"supplySeconds")
s.toString
B.a.k(l.ch,new A.aJ(a.ch,1/s,d))
return!0},
cE(a,b){var s,r=this
if(!a.dx||r.as.q(0,a.a)||r.d<=0||a.fy)return!1
s=a.a
r.as.k(0,s)
r.y.u(0,s,b)
if(b.z&&b.d!=null){s=b.d
s.toString
r.at.ad(s,new A.dC(),new A.dD())}return!0}}
A.dB.prototype={
$1(a){var s=this.a,r=t.r.a(a).a
return!s.z.q(0,r)&&!s.Q.q(0,r)},
$S:0}
A.dp.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
if(a.b===s.a.a){r=a.as
s=!(r===B.f||r===B.d)&&!a.fy&&!s.z.q(0,a.a)}else s=!1
return s},
$S:0}
A.dq.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=!1
if(a.a!==s.a)if(a.b===s.b){q=this.b
if(a.cx===q.a){r=q.f
r=a.z.G(r)<s.z.G(r)
s=r}else s=r}else s=r
else s=r
return s},
$S:0}
A.dr.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.q(0,a.a)},
$S:0}
A.ds.prototype={
$2(a,b){return A.d(a)+t.r.a(b).y},
$S:30}
A.dt.prototype={
$1(a){return!this.a.ay.q(0,t.q.a(a).a)},
$S:2}
A.du.prototype={
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
s.toString}return a+B.b.T((b.Q+(r-1)*q-p)*s)},
$S:35}
A.dv.prototype={
$2(a,b){A.d(a)
t.gf.a(b)
return a+B.b.T(b.a+b.b*Math.min(this.a,b.c)+1e-9)},
$S:24}
A.dw.prototype={
$1(a){return Math.abs(A.as(a)-this.a)<1e-7},
$S:9}
A.dz.prototype={
$1(a){return A.d(a)+1},
$S:5}
A.dA.prototype={
$0(){return 1},
$S:4}
A.dm.prototype={
$1(a){return A.d(a)+1},
$S:5}
A.dn.prototype={
$0(){return 1},
$S:4}
A.dx.prototype={
$1(a){return A.d(a)+1},
$S:5}
A.dy.prototype={
$0(){return 1},
$S:4}
A.dC.prototype={
$1(a){return A.d(a)+1},
$S:5}
A.dD.prototype={
$0(){return 1},
$S:4}
A.b8.prototype={
aH(){return"CombatAdvantage."+this.b}}
A.bt.prototype={}
A.e1.prototype={
ab(b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=this,b3="soldierHp"
t.eg.a(c0)
s=c0==null?b4.ax:c0
r=b5.ax
q=c3==null
p=q?b4.gO():c3
o=b9==null
n=o?b5.gO():b9
m=b4.f
l=b4.at
k=b5.f
j=b5.at
i=b4.a+":"+A.q(m)+":"+b4.w+":"+A.q(l)+":"+A.q(b4.ay)+":"+b5.a+":"+A.q(k)+":"+b5.w+":"+A.q(j)+":"+A.q(b5.ay)+":"+c1+":"+b6+":"+c4+":"+p+":"+n+":"+A.q(s)+":"+A.q(r)+":"+b8+":"+c2+":"+b7
h=b2.c
g=h.i(0,i)
if(g!=null)return g
if(!b2.b.cc())return B.Z
if(q)q=B.a.F(l,0,new A.e2(),t.H)
else{q=b2.a.b.i(0,b3)
q.toString
q=p*B.b.p(q)}f=m+q
if(o)q=B.a.F(j,0,new A.e3(),t.H)
else{q=b2.a.b.i(0,b3)
q.toString
q=n*B.b.p(q)}e=k+q
q=c1===0
d=b2.bn(s,q&&m>0,c2)
c=b6===0
b=b2.bn(r,c&&k>0,b7)
c=q&&c
a=b2.bf(b4,p,c1,c4,c)
a0=b2.bf(b5,n,b6,c4,c)
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
a9=b2.a.r.ay
if(a1)b0=B.B
else if(a7>a9)b0=B.h
else{q=a8<-a9?B.r:B.Y
b0=q}q=A.c([],t.s)
if(c1>0||b6>0)q.push("\u57ce\u9632\u4ec5\u4fee\u6b63\u653b\u51fb\uff0c\u5b88\u65b9\u6b66\u5668\u8d21\u732e\u4e3a\u96f6")
if(s.length>1)q.push("\u540e\u7eed\u6b66\u5668\u4f9d\u8d56\u78b0\u649e\u548c\u6982\u7387\uff0c\u4e0b\u9650\u4e0d\u8ba1\u5fc5\u8fbe")
if(a1)q.push("\u5b58\u5728\u5148\u624b\u81f4\u547d\u6216\u81ea\u4f24\u98ce\u9669")
q.push("\u4f59\u91cf\u4e3a\u9759\u6001\u98ce\u9669\u6307\u6807\uff0c\u5e76\u975e\u80dc\u7387")
b1=new A.bt(b0,a7,a8,k,l,a1)
if(h.a>=256)h.a7(0,new A.aa(h,A.r(h).h("aa<1>")).gK(0))
h.u(0,i,b1)
return b1},
ck(a,b,c,d,e,f,g,h){return this.ab(a,b,c,d,0,e,f,0,g,h,0)},
ci(a,b,c,d,e,f){return this.ab(a,b,c,!0,0,d,e,0,!0,f,0)},
aT(a,b,c,d){return this.ab(a,b,0,!0,0,null,null,c,!0,d,0)},
cf(a,b,c,d,e){return this.ab(a,b,0,c,0,null,null,0,d,null,e)},
cj(a,b,c,d,e,f,g){return this.ab(a,b,0,c,0,null,d,0,e,f,g)},
cg(a,b,c,d,e){return this.ab(a,b,0,!0,c,null,null,d,!0,e,0)},
bs(a,b,c,d,e,f){return this.ab(a,b,0,c,0,null,null,d,e,f,0)},
bf(a,b,c,d,e){var s,r,q,p,o=this.a
if(e){s=o.e
if(!(d<s.length))return A.k(s,d)
s=s[d]}else s=1
s=B.c.v(B.b.T(a.w*s),0,63)
if(c>0){r=o.b
q=r.i(0,"defenseBase")
q.toString
q=B.b.p(q)
r=r.i(0,"defenseStep")
r.toString
r=q+(c-1)*B.b.p(r)}else r=0
p=B.c.v(s+r,0,63)
o=o.b.i(0,"soldierPower")
o.toString
return(B.c.c8(p+b*B.b.p(o)+2,4)+1)*1.5*(1+B.b.v(a.ay/630,0,0.1))},
bn(a,b,c){var s,r,q,p,o,n,m,l,k,j
t.L.a(a)
if(!b)return new A.bj([0,0,0,0])
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
A:{if(!(m<a.length))return A.k(a,m)
j=s.i(0,a[m])
if(j==null)break A
l=m===0
if(l&&c){q+=j.c
o+=j.d}if(!(l&&c)){l=r.i(0,"weaponChance")
l.toString
l=l>0}else l=!0
if(l){p+=j.c
n+=j.d}}++m}return new A.bj([p,q,n,o])}}
A.e2.prototype={
$2(a,b){return A.t(a)+A.as(b)},
$S:10}
A.e3.prototype={
$2(a,b){return A.t(a)+A.as(b)},
$S:10}
A.hr.prototype={
$2(a,b){var s
A.t(a)
s=this.a.f.i(0,A.d(b))
s=s==null?null:s.c
if(s==null)s=0
return a+s*this.b.w},
$S:46}
A.cs.prototype={
B(){var s=this
return A.N(["interval",s.a,"threat",s.b,"urgent",s.c,"margin",s.d,"commit",s.e,"rearExtra",s.r,"candidates",s.w,"assessments",s.x,"routes",s.y,"plans",s.z,"commands",s.Q,"team",s.as,"targets",s.at,"slice",s.ax,"advantage",s.ay,"expansion",s.CW,"credit",s.ch,"age",s.f,"timeout",s.cx,"restarts",s.cy,"stagnation",s.db],t.N,t.X)}}
A.aj.prototype={}
A.e5.prototype={
b4(){return new A.ar(this.bM(),t.gL)},
bM(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9
return function $async$b4(j0,j1,j2){if(j1===1){p.push(j2)
r=q}for(;;)switch(r){case 0:i7={}
i8=s.c
i9=s.a
if(i8.b!==i9.a||i8.c!==s.b.a)throw A.e(B.a3)
o=i8.x
n=o.d
if(n.length>64||o.e.length>256||o.f.length>32)throw A.e(B.a4)
m=s.e
m===$&&A.aP()
l=s.f
l===$&&A.aP()
k=new A.fH(o,i9,m,l)
j=o.gP(),i=J.E(j.a),j=new A.H(i,j.b,j.$ti.h("H<1>")),h=s.x
case 2:if(!j.j()){r=3
break}g=i.gl()
h.u(0,g.a,k.cF(g))
r=4
return j0.b=0,1
case 4:r=2
break
case 3:j=i8.y
i=A.j(j)
g=i.h("f<1>")
j=A.x(new A.f(j,i.h("i(1)").a(new A.ei(s)),g),g.h("b.E"))
i7.a=A.i2(o,i9,m,j)
j=t.a
f=A.c([],j)
i=t.s
e=A.c([],i)
g=s.d
d=s.r
d===$&&A.aP()
c=new A.eI(i8,i9,g,l,d,h)
b=A.r(h).h("ab<2>")
a=b.h("f<b.E>")
a0=A.x(new A.f(new A.ab(h,b),b.h("i(b.E)").a(new A.ej()),a),a.h("b.E"))
B.a.H(a0,new A.ek())
b=t.bQ
a1=A.c([new A.aj(i7.a,A.c([],j),A.c([],i),0,0)],b)
i=a0.length,a=t.N,a2=t.S,a3=i9.r,a4=a3.Q,a5=t.I,a6=t.dp,a7=t.aQ,a8=a3.z,a9=0
case 5:if(!(b0=a0.length,a9<b0)){r=7
break}b1=a0[a9]
b2=A.c([],b)
b0=a1.length,b3=0
case 8:if(!(b3<a1.length)){r=10
break}b4=a1[b3]
b5=c.br(b1,b4.a),b6=b5.$ti,b5=new A.aB(b5.a(),b6.h("aB<1>")),b7=b4.d,b8=b4.e,b9=b4.c,c0=b4.b,b6=b6.c
case 11:if(!b5.j()){r=12
break}c1=b5.b
if(c1==null)c1=b6.a(c1)
c2=A.x(c0,a5)
B.a.A(c2,c1.b)
if(B.a.F(c2,0,new A.ev(),a2)>a4){g.e=!0
r=11
break}c3=c1.a
c4=A.x(b9,a)
c5=c1.e
if(c5.length!==0)c4.push(c5)
c5=c1.c
c1=c1.d?1:0
B.a.k(b2,new A.aj(c3,c2,c4,b7+c5,b8+c1))
r=13
return j0.b=1,1
case 13:r=11
break
case 12:case 9:a1.length===b0||(0,A.v)(a1),++b3
r=8
break
case 10:if(b2.length!==0){B.a.H(b2,new A.eB())
b0=A.d(Math.min(4,a8))
b5=new A.J(b2,0,b0,a7)
b5.a3(b2,0,b0,a6)
a1=b5.a8(0)}case 6:a0.length===i||(0,A.v)(a0),++a9
r=5
break
case 7:if(b0!==0){c6=B.a.gK(a1)
i7.a=c6.a
B.a.A(f,c6.b)
B.a.A(e,c6.c)
i=c6.e
if(i>0){i=""+i
B.a.k(e,g.e?"\u89c4\u5212\u914d\u989d\u5df2\u7528\u5c3d\uff1a"+i+" \u5ea7\u57ce\u5c1a\u672a\u627e\u5230\u5b8c\u6574\u65b9\u6848\uff0c\u4e0d\u80fd\u636e\u6b64\u65ad\u5b9a\u65e0\u6cd5\u633d\u6551":"unsalvageableDefense\uff1a"+i+" \u5ea7\u57ce\u5728\u5f53\u524d\u9501\u5b9a\u3001\u8d44\u91d1\u6216\u65f6\u9650\u4e0b\u672a\u627e\u5230\u5b8c\u6574\u4fee\u590d\u65b9\u6848")}c7="defending"}else c7="preparing"
r=14
return j0.b=2,1
case 14:for(i=o.e,b=A.j(i),a5=b.h("i(1)"),a6=a5.a(new A.eC(s)),a7=B.a.gt(i),a6=new A.H(a7,a6,b.h("H<1>")),a8=t.w,b0=t.e,b5=t.Y,i9=i9.b;a6.j();){b6=a7.gl()
if(b6.e!==1||b6.f>=b6.r*0.25||b6.k2<2||b6.k3<=0||B.a.W(b6.ax,new A.eD(s)))continue
c8=o.ag(b6.k1)
if(c8!=null){b7=b6.gaz()
b8=b6.k3
b9=c8.gaz()
c0=Math.max(1,b6.k4)
c1=i9.i(0,"retreatSurvivalRatio")
c1.toString
c1=b7/b8>=b9/c0*c1
b7=c1}else b7=!0
if(b7)continue
b7=i7.a
b8=b6.a
if(b7.as.q(0,b8))continue
i7.a.as.k(0,b8)
b7=A.c([new A.K(B.J,b8,null,null,0,B.e)],a8)
b8=A.c([b6,c8],b0)
b6=o.M(b6.c)
b6.toString
B.a.k(f,new A.P("\u9ad8\u7ea7\u5c06\u9886\u751f\u547d\u4f4e\u4e8e\u56db\u5206\u4e4b\u4e00\uff0c\u5df2\u53d1\u751f\u7684\u4f24\u5bb3\u663e\u793a\u80dc\u671b\u6e3a\u832b\uff0c\u7533\u8bf7\u6709\u98ce\u9669\u7684\u5408\u6cd5\u64a4\u9000",b7,d.a5(b8,A.c([b6],b5)),B.m,0,!0))}r=15
return j0.b=3,1
case 15:b=b.h("f<1>")
a6=b.h("b.E")
c9=A.x(new A.f(i,a5.a(new A.eE(i7,s)),b),a6)
a7=c9.length,b6=o.b,a9=0
case 16:if(!(a9<c9.length)){r=18
break}d0=c9[a9]
d1=i7.a.y.i(0,d0.a)
b7=i7.a
d2=b7.d<b7.Y().a
b7=d1==null
if((b7?null:d1.z)===!0){b8=b7?null:d1.d
b8=d0.cx==b8&&!d2}else b8=!1
if(b8){r=17
break}if((b7?null:d1.b)==="intercept")if(o.ag(b7?null:d1.e)!=null){b8=h.i(0,b7?null:d1.d)
if(b8==null)b8=null
else b8=b8.d.length!==0||b8.a.ax!=null
b8=b8!==!0
d3=b8}else d3=!0
else d3=!1
if(d3&&!d2&&d1.x>b6&&d0.f>=d0.r*0.65){r=17
break}d4=!b7&&d1.w<b6
if(!d2&&!d3&&!d4&&d0.f>=d0.r*0.65&&d0.as!==B.n){r=17
break}d5=h.i(0,d0.c)
b7=o.gP()
b8=b7.$ti
b9=b8.h("f<b.E>")
d6=A.x(new A.f(b7,b8.h("i(b.E)").a(new A.eF(i7,s)),b9),b9.h("b.E"))
B.a.H(d6,new A.eG(d0))
b7=A.j(d6)
b8=b7.h("J<1>")
b9=new A.J(d6,0,3,b8)
b9.a3(d6,0,3,b7.c)
b9=new A.y(b9,b9.gm(0),b8.h("y<m.E>"))
b7=d5==null
b8=b8.h("m.E")
while(b9.j()){c0=b9.d
if(c0==null)c0=b8.a(c0)
if(!g.X())break
d7=m.ah(d0,c0.f,o,!0,c0)
c1=i7.a
c2=h.i(0,c0.a)
if(c2==null)c2=null
else c2=c2.d.length!==0||c2.a.ax!=null
c3=d2?"\u56de\u5b89\u5168\u53cb\u57ce\u7f29\u51cf\u7cae\u8349\u652f\u51fa\uff0c\u4fdd\u7559\u5176\u4ed6\u6709\u6548\u8fdc\u5f81":"\u7ed3\u675f\u65e7\u622a\u51fb\u6216\u6574\u5907\u6b8b\u8840\u90e8\u961f\uff0c\u8fdb\u57ce\u8865\u7ed9\u540e\u91cd\u8bc4\u4f30\u76ee\u6807"
if(b7)c4=null
else c4=d5.d.length!==0||d5.a.ax!=null
c4=c4===!0?d5.ga4():1/0
d8=d.bH(c1,d0,d7,!0,c4,!0,c2!==!0,c3,"regroup",c0)
if(d8!=null){i7.a=d8.a
B.a.k(f,d8.b)
break}}r=19
return j0.b=4,1
case 19:case 17:c9.length===a7||(0,A.v)(c9),++a9
r=16
break
case 18:d9=A.x(new A.f(i,a5.a(new A.eH(i7,s)),b),a6)
B.a.H(d9,new A.el(s))
e0=A.X(a2,a2)
for(i=i7.a.y,b=A.r(i).h("ab<2>"),a5=b.h("i(b.E)").a(new A.em()),i=new A.ab(i,b).gt(0),b=new A.H(i,a5,b.h("H<b.E>"));b.j();){a5=i.gl().d
a5.toString
e0.ad(a5,new A.en(),new A.eo())}e1=B.a.gK(a1).e===0
i=d9.length,i8=i8.w>a3.db/a3.a,b=o.f,a5=a3.CW,a6=a3.ay,a7=a3.as,b6=a3.ch,a3=a3.at,b7=A.j(n),b8=b7.h("i(1)"),b7=b7.h("f<1>"),b9=b7.h("b.E"),e2=null,e3=0,e4=1,e5=!1,a9=0
case 20:if(!(a9<d9.length)){r=22
break}d0=d9[a9]
e6={}
if(e1){c0=d0.a
c0=i7.a.as.q(0,c0)||i7.a.z.q(0,c0)}else c0=!0
if(c0){r=21
break}e7=o.M(d0.c)
c0=e7.a
b1=h.i(0,c0)
c1=b1==null
if(c1)c2=null
else c2=b1.d.length!==0||b1.a.ax!=null
if(c2===!0){if(c1)c2=null
else{c2=b1.f
c2=c2==null?null:c2.a}c2=c2!==B.h}else c2=!1
if(c2){r=21
break}if(c1)c2=null
else c2=b1.d.length!==0||b1.a.ax!=null
c3=e7.e
if(c2===!0){c2=i7.a
c4=e7.ax
if(c4==null){c2=c2.x.i(0,c0)
if(c2==null)c2=e7.d}else c2=B.c.v(c4-e7.ay,0,5)
c2=Math.min(c3,c2)}else c2=c3
e8=Math.max(1,c2)
if(i7.a.E(c0).length<=e8){r=21
break}if(c1)c0=null
else c0=b1.d.length!==0||b1.a.ax!=null
if(c0===!0&&!s.bi(e7,d0,i7.a)){r=21
break}e9=A.x(new A.f(n,b8.a(new A.ep(s,e0)),b7),b9)
B.a.H(e9,new A.eq(s,d0))
e6.a=null
c0=A.j(e9)
c1=c0.h("J<1>")
c2=new A.J(e9,0,a3,c1)
c2.a3(e9,0,a3,c0.c)
c2=new A.y(c2,c2.gm(0),c1.h("y<m.E>"))
c0=d0.f>=d0.r*0.8
c1=c1.h("m.E")
f0=null
f1=-1/0
case 23:if(!c2.j()){r=24
break}c3=c2.d
f2=c3==null?c1.a(c3):c3
if(!g.X()){r=24
break}f3=f2.a
c3=o.E(f3)
c4=A.j(c3).h("a3<1>")
c3=new A.a3(c3,c4)
c5=f2.ax
f4=c5==null
f5=f4?f2.d:B.c.v(c5-f2.ay,0,5)
f6=new A.J(c3,0,f5,c4.h("J<m.E>"))
f6.a3(c3,0,f5,c4.h("m.E"))
f7=f6.a8(0)
f8=Math.max(1,Math.min(a7,B.b.aS(f7.length/2)))
c3=e0.i(0,f3)
if((c3==null?0:c3)>=f8){r=23
break}d7=m.bD(d0,f2.f,o,f2)
if(!d7.d){r=23
break}f9=d.aZ(d0,i7.a)
for(c3=f9.length,c4=f2.ay,f5=f2.d,f6=f5<=2,g0=!1,b3=0;b3<f9.length;f9.length===c3||(0,A.v)(f9),++b3){g1=f9[b3]
g2=B.a.am(b,new A.er(f2)).c
for(g3=1,g4=1,g5=0;g6=f7.length,g5<g6;++g5){g7=f7[g5]
g6=i9.i(0,"soldierLimit")
g6.toString
g8=Math.min(B.b.p(g6),g2+g7.gO())
g2=Math.max(0,g2-(g8-g7.gO()))
g6=Math.max(1,(f4?f5:B.c.v(c5-c4,0,5))-g5)
g9=i9.i(0,"soldierLimit")
g9.toString
h0=l.ck(d0,g7,g6,!1,g8,g1,!0,B.b.p(g9))
g3=Math.min(g3,h0.b)
g4=Math.min(g4,h0.c)}g0=!0
h1=i8&&i7.a.d>100?0.05:0
if(g6!==0)h2=g6===1&&f6&&c0&&g3>a5||g3>a6+Math.max(0,g6-1)*0.025-h1
else h2=g0
if(!h2&&g6>1&&g4>a6&&g3>-0.08)h3=Math.min(a7,g6)
else{g0=h2
h3=1}if(!g0)continue
e4=Math.max(e4,h3)
g6=i7.a
g9=e0.i(0,f3)
d8=s.bg(g6,d0,f2,g1,h3,g9==null?0:g9)
if(d8==null){h4=i7.a.S()
h4.d=1e6
g6=e0.i(0,f3)
h5=s.bg(h4,d0,f2,g1,h3,g6==null?0:g6)
if(h5!=null){if(a0.length===0)c7="saving"
g6=h4.d
g9=h5.a
h6=g6-g9.d+g9.Y().a
e3=e3===0?h6:Math.min(e3,h6)
if(e2==null)e2=f3}else if(a0.length===0)c7="preparing"
continue}c3=s.aQ(f2,d0)
c4=i7.a.d
c5=d8.a.d
f4=B.a.aB(g1,1).F(0,0,new A.es(s),a2)
f5=i9.i(0,"weaponChance")
f5.toString
h7=c3-d7.b*0.4-(c4-c5)*0.5+g3*30+f4*b6*f5*0.02
if(h7>f1){e6.a=d8
e4=d8.b.d.length
f1=h7
f0=f2}break}if(!g0&&e2==null){e4=Math.max(1,Math.min(a7,f7.length))
e2=f3}r=25
return j0.b=5,1
case 25:r=23
break
case 24:c0=e6.a
if(c0!=null){c0=B.a.F(f,0,new A.et(),a2)
c1=e6.a
c0=c0+c1.b.b.length<=a4}else{c1=c0
c0=!1}if(c0){i7.a=c1.a
B.a.k(f,c1.b)
e2=f0.a
e0.ad(e2,new A.eu(e6),new A.ew(e6))
e5=!0}r=26
return j0.b=6,1
case 26:case 21:d9.length===i||(0,A.v)(d9),++a9
r=20
break
case 22:r=!e5&&B.a.F(f,0,new A.ex(),a2)<a4-3?27:28
break
case 27:o=o.gP(),m=J.E(o.a),o=new A.H(m,o.b,o.$ti.h("H<1>"))
case 29:if(!o.j()){r=30
break}l=m.gl()
i=l.a
b=h.i(0,i)
if(b==null)b=null
else b=b.d.length!==0||b.a.ax!=null
if(b===!0){r=29
break}if(!g.X()){r=30
break}h8=i7.a.E(i)
b2=i7.a.S()
b=A.j(h8)
a3=b.h("f<1>")
h9=A.x(new A.f(h8,b.h("i(1)").a(new A.ey(i7)),a3),a3.h("b.E"))
B.a.H(h9,new A.ez())
i0=B.a.W(n,new A.eA(s))&&h8.length<Math.max(1,l.e)+e4
if(h9.length!==0){b=h8.length
a3=i7.a
a5=l.ax
if(a5==null){a3=a3.x.i(0,i)
if(a3==null)a3=l.d}else a3=B.c.v(a5-l.ay,0,5)
if(b<a3)b=i0&&h8.length>=l.z
else b=!0}else b=!1
if(b)if(b2.b0(l,B.a.gK(h9))&&b2.d>=b2.Y().a){i7.a=b2
B.a.k(f,new A.P("\u5148\u6269\u5145\u5b89\u5168\u8fce\u6218\u540d\u989d\u548c\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u8003\u8651\u62db\u5c06\u4e0e\u8fdc\u5f81",A.c([new A.K(B.p,B.a.gK(h9).a,i,null,0,B.e)],a8),d.a5(A.c([B.a.gK(h9)],b0),A.c([l],b5)),B.m,b2.Y().a,!1))
r=30
break}if(i0){b=h8.length
a3=i7.a
a5=l.ax
if(a5==null){a3=a3.x.i(0,i)
if(a3==null)a3=l.d}else a3=B.c.v(a5-l.ay,0,5)
b=b<a3&&b2.cD(l)&&b2.d>=b2.Y().a}else b=!1
if(b){i7.a=b2
B.a.k(f,new A.P("\u4e3a\u7559\u5b88\u4e0e\u8fdc\u5f81\u7684\u771f\u5b9e\u7f3a\u53e3\u62bd\u53d6\u82f1\u96c4\uff0c\u9884\u7559\u6700\u9ad8\u624b\u7eed\u8d39\u548c\u6708\u4ff8",A.c([new A.K(B.F,null,i,null,0,B.e)],a8),d.a5(A.c([],b0),A.c([l],b5)),B.m,b2.Y().a,!1))
r=30
break}b=i7.a.f
a3=h8.length
a5=i9.i(0,"soldierLimit")
a5.toString
a5=Math.min(b,a3*B.b.p(a5))
a3=i7.a
i1=a5-a3.e
if(i1>0){i2=a3.S()
b=i9.i(0,"soldierBatch")
b.toString
i3=Math.min(B.b.p(b),i1)
if(i2.bq(i3)&&i2.d>=i2.Y().a){i7.a=i2
B.a.k(f,new A.P("\u8865\u5145\u8fd1\u671f\u5b88\u57ce\u548c\u51fa\u5f81\u6240\u9700\u5175\u5458\uff0c\u4e0d\u586b\u6ee1\u6ca1\u6709\u4efb\u52a1\u7684\u5168\u56fd\u5bb9\u91cf",A.c([new A.K(B.v,null,i,null,i3,B.e)],a8),d.a5(A.c([],b0),A.c([l],b5)),B.m,i2.Y().a,!1))
r=30
break}}r=31
return j0.b=7,1
case 31:r=29
break
case 30:case 28:if(e5)c7=a0.length===0?"attacking":"defending"
if(f.length===0){i9=i7.a
B.a.k(e,i9.d<i9.Y().a?"\u8d44\u91d1\u4e0d\u8db3\u4ee5\u8986\u76d6\u73b0\u6709\u90e8\u961f\u548c\u6b20\u6536\u6708\u4ff8\uff0c\u7b49\u5f85\u6574\u5907":"\u6ca1\u6709\u6ee1\u8db3\u5b88\u57ce\u3001\u65f6\u9650\u53ca\u9759\u6001\u98ce\u9669\u7ea6\u675f\u7684\u65b0\u589e\u884c\u52a8\uff0c\u4fdd\u6301\u5df2\u6709\u4efb\u52a1")}if(i8)B.a.k(e,"\u505c\u6ede\u8bca\u65ad\uff1a"+(c7==="saving"?"\u7f3a\u5c11\u6574\u961f\u540e\u52e4\u8d44\u91d1":"\u7f3a\u5c11\u53ef\u5b89\u5168\u6267\u884c\u7684\u6269\u5f20\u6761\u4ef6")+"\uff0c\u4e0d\u901a\u8fc7\u65e0\u9650\u62db\u52df\u6216\u81ea\u6740\u51fa\u51fb\u6253\u7834\u7b49\u5f85")
i4=A.c([],j)
for(i8=f.length,i5=0,a9=0;a9<f.length;f.length===i8||(0,A.v)(f),++a9){i6=f[a9]
i5+=i6.b.length
if(i5>a4){g.e=!0
B.a.k(e,"\u547d\u4ee4\u914d\u989d\u5230\u8fbe\uff0c\u53ea\u63d0\u4ea4\u524d\u9762\u5b8c\u6574\u7684\u52a8\u4f5c\u7ec4\uff0c\u540e\u7eed\u7559\u5f85\u4e0b\u4e00\u6b21\u89c4\u5212")
break}B.a.k(i4,i6)}s.w=new A.cB(c7,e2,e3,e4,i4,A.ac(e,0,A.a7(12,"count",a2),a).a8(0),g.e,g.c,g.d,g.b)
return 0
case 1:return j0.c=p.at(-1),3}}}},
bi(a,b,c){var s,r,q=a.a,p=this.x.i(0,q),o=p==null?null:p.d
if(o==null)o=A.c([],t.D)
if(o.length===0)return!0
q=c.E(q)
p=A.j(q)
s=p.h("f<1>")
q=A.x(new A.f(q,p.h("i(1)").a(new A.ec(b)),s),s.h("b.E"))
p=A.j(q).h("a3<1>")
r=A.ac(new A.a3(q,p),0,A.a7(c.R(a),"count",t.S),p.h("m.E")).a8(0)
if(r.length===0)return!1
return B.a.cr(o,new A.ed(this,r,c,a))},
bg(b8,b9,c0,c1,c2,c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5=this,b6=null,b7="soldierLimit"
t.L.a(c1)
s=t.e
r=A.c([],s)
for(q=b5.c.x,p=q.gP(),o=J.E(p.a),p=new A.H(o,p.b,p.$ti.h("H<1>")),n=b5.x,m=b9.c;p.j();){l=o.gl()
k=l.a
j=n.i(0,k)
if(j==null)j=b6
else j=j.d.length!==0||j.a.ax!=null
if(j===!0&&k!==m)continue
i=Math.max(1,l.e)
h=Math.max(0,b8.E(k).length-i)
l=b8.E(k)
k=A.j(l)
j=k.h("f<1>")
g=A.x(new A.f(l,k.h("i(1)").a(new A.e7(b8)),j),j.h("b.E"))
B.a.H(g,new A.e8(b5))
l=A.j(g)
k=new A.J(g,0,h,l.h("J<1>"))
k.a3(g,0,h,l.c)
B.a.A(r,k)}if(!B.a.q(r,b9))return b6
B.a.a7(r,b9)
B.a.H(r,new A.e9(b5))
s=A.c([b9],s)
p=t.S
B.a.A(s,A.ac(r,0,A.a7(c2-1,"count",p),t.r))
if(s.length<c2)return b6
f=A.c([],t.w)
e=A.c([],t.m)
o=t.N
d=A.X(o,o)
o=q.E(c0.a)
m=A.j(o).h("a3<1>")
c=A.ac(new A.a3(o,m),0,A.a7(c0.gae(),"count",p),m.h("m.E")).a8(0)
for(p=b5.a,o=p.r.Q,p=p.b,m=c2===1,l=c0.f,k=t.x,b=b8,a=0;a<s.length;++a){a0=s[a]
j=a0.c
a1=n.i(0,j)
if(a1==null)a1=b6
else a1=a1.d.length!==0||a1.a.ax!=null
if(a1===!0){a1=q.M(j)
a1.toString
a1=!b5.bi(a1,a0,b)}else a1=!1
if(a1)return b6
a1=b5.e
a1===$&&A.aP()
a2=a1.bD(a0,l,q,c0)
if(a===0)a1=A.c([c1],k)
else{a1=b5.r
a1===$&&A.aP()
a1=a1.aZ(a0,b)}a3=a1.length
a4=c3+a
a5=a>0
a6=b6
a7=0
for(;a7<a1.length;a1.length===a3||(0,A.v)(a1),++a7){a8=a1[a7]
if(a5&&B.a.W(c,new A.ea(b5,a0,c0,a8)))continue
for(a9=q.gP(),b0=J.E(a9.a),a9=new A.H(b0,a9.b,a9.$ti.h("H<1>")),b1=0;a9.j();){b2=b0.gl()
b3=b2.a
b4=b.E(b3).length
b2=Math.min(Math.max(0,b4-(b3===j?1:0)),Math.max(1,b2.e))
b4=p.i(0,b7)
b4.toString
b1+=b2*B.b.p(b4)}a9=b5.r
a9===$&&A.aP()
b0=m?"\u9ad8\u7ea7\u6218\u529b\u4f18\u5148\u8fdb\u653b\u53ef\u4f9b\u517b\u7684\u5f31\u57ce":"\u5168\u961f\u5b8c\u6210\u88c5\u5907\u3001\u5175\u5458\u4e0e\u961f\u5217\u7cae\u8349\u51c6\u5907\u540e\u534f\u540c\u8f6e\u653b"
b2=b.f
b3=p.i(0,b7)
b3.toString
a6=a9.bL(b,a0,a2,a8,Math.min(b1,Math.max(0,b2-B.b.p(b3))),a4,b0,"expedition",c0)
if(a6!=null)break}if(a6==null)return b6
b=a6.a
j=a6.b
B.a.A(f,j.b)
B.a.A(e,j.d)
d.A(0,j.c)
if(f.length>o){b5.d.e=!0
return b6}}s=b5.r
s===$&&A.aP()
d.A(0,s.a5(c,A.c([],t.Y)))
s=m?"\u6267\u884c\u9759\u6001\u4f18\u52bf\u660e\u786e\u3001\u53ef\u4ee5\u4f9b\u517b\u7684\u6269\u5f20":"\u6574\u961f\u540e\u52e4\u51c6\u5907\u5b8c\u6210\uff0c\u6309\u771f\u5b9e\u6392\u961f\u89c4\u5219\u8f6e\u653b\uff1b\u4e0d\u9884\u6f14\u672a\u6765\u4f24\u4ea1"
return new A.cX(b,new A.P(s,f,d,e,b.Y().a,!1))},
aQ(a,b){var s,r,q,p,o,n,m=this.c,l=m.x,k=a.a,j=l.E(k),i=A.j(j).h("a3<1>"),h=A.ac(new A.a3(j,i),0,A.a7(a.gae(),"count",t.S),i.h("m.E")).a8(0)
if(h.length===0)s=0
else{j=A.j(h)
s=new A.T(h,j.h("h(1)").a(new A.ee()),j.h("T<1,h>")).V(0,B.x)}j=l.d
i=A.j(j)
r=new A.f(j,i.h("i(1)").a(new A.ef(a)),i.h("f<1>")).gm(0)
i=l.e
j=A.j(i)
q=new A.f(i,j.h("i(1)").a(new A.eg(a)),j.h("f<1>")).F(0,0,new A.eh(),t.i)
l=l.gao().w.i(0,a.b)
p=Math.min(0.5,(l==null?0:l)*0.005)
o=r>=3?Math.min(40,r*6):0
n=m.f^k*7919
n^=n<<13
n^=n>>>17
if(a.c===b.b)m=1
else{m=this.a.b.i(0,"foreignYield")
m.toString}return 160+a.Q*m*2+q+o+p*30-s*0.5-a.d*8-b.z.G(a.f)*0.03+((n^n<<5)&65535)/65536*0.000001}}
A.ei.prototype={
$1(a){var s,r,q
t.J.a(a)
s=this.a.c.x
r=s.ag(a.a)
q=!1
if(r!=null)if(r.b===s.a)if(!r.fy)if(r.f>0){s=r.as
s=!(s===B.f||s===B.d)&&r.id===a.Q}else s=q
else s=q
else s=q
else s=q
return s},
$S:19}
A.ej.prototype={
$1(a){t.c.a(a)
return a.d.length!==0||a.a.ax!=null},
$S:53}
A.ek.prototype={
$2(a,b){var s,r=t.c
r.a(a)
r.a(b)
s=B.b.D(a.ga4(),b.ga4())
return s!==0?s:B.b.D(b.r+b.a.w*4,a.r+a.a.w*4)},
$S:25}
A.ev.prototype={
$2(a,b){return A.d(a)+t.I.a(b).b.length},
$S:11}
A.eB.prototype={
$2(a,b){var s,r=t.dp
r.a(a)
r.a(b)
r=a.e
s=b.e
return r!==s?B.c.D(r,s):B.b.D(b.d,a.d)},
$S:27}
A.eC.prototype={
$1(a){t.r.a(a)
return a.b===this.a.c.x.a&&!a.fy&&a.fx},
$S:0}
A.eD.prototype={
$1(a){var s=this.a.a.f.i(0,A.d(a))
return(s==null?null:s.d)===0},
$S:28}
A.eE.prototype={
$1(a){t.r.a(a)
return a.b===this.b.c.x.a&&a.dx&&!a.fy&&!this.a.a.as.q(0,a.a)},
$S:0}
A.eF.prototype={
$1(a){var s,r,q,p,o,n,m=null
t.q.a(a)
s=this.a
r=a.a
q=s.a.L(r)
p=this.b
o=p.x
n=o.i(0,r)
if(n==null)n=m
else n=n.d.length!==0||n.a.ax!=null
s=s.a
if(q<(n===!0?s.R(a):Math.max(s.R(a),a.z+p.a.r.r))){s=o.i(0,r)
if(s==null)s=m
else s=s.d.length!==0||s.a.ax!=null
if(s===!0){s=o.i(0,r)
if(s==null)s=m
else{s=s.f
s=s==null?m:s.a}s=s===B.h}else s=!0}else s=!1
return s},
$S:2}
A.eG.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.D(a.f.G(s),b.f.G(s))},
$S:12}
A.eH.prototype={
$1(a){t.r.a(a)
return a.b===this.b.c.x.a&&a.db&&!a.fy&&!this.a.a.z.q(0,a.a)},
$S:0}
A.el.prototype={
$2(a,b){var s,r,q,p="maxLevel",o=t.r
o.a(a)
o.a(b)
o=this.a
s=o.c.x
r=s.M(b.c).d
o=o.a.b
q=o.i(0,p)
q.toString
q=A.co(b,r<B.b.p(q))
s=s.M(a.c).d
o=o.i(0,p)
o.toString
return B.b.D(q,A.co(a,s<B.b.p(o)))},
$S:3}
A.em.prototype={
$1(a){t.J.a(a)
return a.b==="expedition"&&a.d!=null},
$S:19}
A.en.prototype={
$1(a){return A.d(a)+1},
$S:5}
A.eo.prototype={
$0(){return 1},
$S:4}
A.ep.prototype={
$1(a){var s,r
t.q.a(a)
s=this.a
if(a.b!==s.c.x.a){r=this.b.i(0,a.a)
if(r==null)r=0
s=r<s.a.r.as}else s=!1
return s},
$S:2}
A.eq.prototype={
$2(a,b){var s,r,q=t.q
q.a(a)
s=this.a
r=this.b
return B.b.D(s.aQ(q.a(b),r),s.aQ(a,r))},
$S:12}
A.er.prototype={
$1(a){return t.u.a(a).a===this.a.b},
$S:6}
A.es.prototype={
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
$S:32}
A.et.prototype={
$2(a,b){return A.d(a)+t.I.a(b).b.length},
$S:11}
A.eu.prototype={
$1(a){return A.d(a)+this.a.a.b.d.length},
$S:5}
A.ew.prototype={
$0(){return this.a.a.b.d.length},
$S:4}
A.ex.prototype={
$2(a,b){return A.d(a)+t.I.a(b).b.length},
$S:11}
A.ey.prototype={
$1(a){t.r.a(a)
return a.fr&&!this.a.a.as.q(0,a.a)},
$S:0}
A.ez.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.D(s.a(b).x,a.x)},
$S:3}
A.eA.prototype={
$1(a){return t.q.a(a).b!==this.a.c.x.a},
$S:2}
A.ec.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.ed.prototype={
$1(a){var s=this
return B.a.W(s.b,new A.eb(s.a,t.O.a(a),s.c,s.d))},
$S:33}
A.eb.prototype={
$1(a){var s,r,q,p,o,n=this,m="soldierLimit"
t.r.a(a)
s=n.a
r=s.f
r===$&&A.aP()
q=n.c
p=q.R(n.d)
s=s.a.b
o=s.i(0,m)
o.toString
o=B.b.p(o)
q=q.e
s=s.i(0,m)
s.toString
return r.aT(a,n.b.a,p,Math.min(o,Math.max(0,q-B.b.p(s)))).a===B.h},
$S:0}
A.e7.prototype={
$1(a){t.r.a(a)
return a.db&&!this.a.as.q(0,a.a)},
$S:0}
A.e8.prototype={
$2(a,b){var s,r,q,p="maxLevel",o=t.r
o.a(a)
o.a(b)
o=this.a
s=o.c.x
r=s.M(b.c).d
o=o.a.b
q=o.i(0,p)
q.toString
q=A.co(b,r<B.b.p(q))
s=s.M(a.c).d
o=o.i(0,p)
o.toString
return B.b.D(q,A.co(a,s<B.b.p(o)))},
$S:3}
A.e9.prototype={
$2(a,b){var s,r,q,p="maxLevel",o=t.r
o.a(a)
o.a(b)
o=this.a
s=o.c.x
r=s.M(b.c).d
o=o.a.b
q=o.i(0,p)
q.toString
q=A.co(b,r<B.b.p(q))
s=s.M(a.c).d
o=o.i(0,p)
o.toString
return B.b.D(q,A.co(a,s<B.b.p(o)))},
$S:3}
A.ea.prototype={
$1(a){var s,r,q,p,o,n,m,l,k=this,j="soldierLimit"
t.r.a(a)
s=k.a
r=s.f
r===$&&A.aP()
q=k.c
p=q.gae()
o=s.a
n=o.b
m=n.i(0,j)
m.toString
m=B.b.p(m)
n=n.i(0,j)
n.toString
l=r.ci(k.b,a,p,Math.min(B.b.p(n),B.a.am(s.c.x.f,new A.e6(q)).c),k.d,m)
return l.r||l.c<=o.r.ay||l.b<-0.12},
$S:0}
A.e6.prototype={
$1(a){return t.u.a(a).a===this.a.b},
$S:6}
A.ee.prototype={
$1(a){t.r.a(a)
return a.w*3+a.f*0.35+a.gO()*8},
$S:34}
A.ef.prototype={
$1(a){return t.q.a(a).b===this.a.b},
$S:2}
A.eg.prototype={
$1(a){var s
t.r.a(a)
if(a.c===this.a.a){s=a.as
s=!(s===B.f||s===B.d)}else s=!1
return s},
$S:0}
A.eh.prototype={
$2(a,b){var s
A.as(a)
t.r.a(b)
s=A.a8(b)
return a+s*(b.k1==null?0.12:0.03)},
$S:20}
A.ap.prototype={}
A.eI.prototype={
br(a,b){return new A.ar(this.ce(a,b),t.eV)},
ce(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e,d,c,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6
return function $async$br(h7,h8,h9){if(h8===1){n.push(h9)
p=o}for(;;)switch(p){case 0:h1=r.a
h2=h1.a
h3=q.L(h2)>q.R(h1)
h4=t.a
h5=A.c([],h4)
h6=s.aa(r,q)
p=3
return h7.b=new A.ap(q,h5,h6,h3,h3?"unsalvageableDefense\uff1a\u5f53\u524d\u5b89\u5168\u540d\u989d "+q.R(h1)+"\uff0c\u9a7b\u519b "+q.L(h2)+"\uff0c\u7b49\u5f85\u5408\u6cd5\u4fee\u590d":"\u4fdd\u6301\u53ef\u51fa\u573a\u5b88\u519b\uff0c\u7ee7\u7eed\u76d1\u63a7\u5168\u90e8\u6765\u654c"),1
case 3:h5=s.c
if(!h5.X()){p=1
break}h6=h1.ax
m=h6==null
p=m?4:5
break
case 4:l=q.S()
k=A.c([],t.w)
j=l.E(h2)
i=A.j(j)
h=i.h("f<1>")
g=A.x(new A.f(j,i.h("i(1)").a(new A.eP()),h),h.h("b.E"))
B.a.H(g,new A.eQ())
p=g.length!==0?6:7
break
case 6:f=B.a.gK(g)
j=f.a
i=l.x
h=s.b.b
e=h1.d
d=0
case 8:if(d<4){c=i.i(0,h2)
c.toString
a0=h.i(0,"maxLevel")
a0.toString
a0=c<B.b.p(a0)
c=a0}else c=!1
if(!c){p=9
break}if(!l.b0(h1,f)||l.d<l.ak(!0).a){p=9
break}B.a.k(k,new A.K(B.p,j,h2,null,0,B.e))
c=l.L(h2)
a0=i.i(0,h2)
if(a0==null)a0=e
p=c<=a0?10:11
break
case 10:p=12
return h7.b=s.aP(r,q,l,k,"\u4f18\u5148\u7531\u9ad8\u5185\u653f\u5c06\u9886\u5347\u7ea7\uff0c\u4fdd\u62a4\u771f\u5b9e\u8fce\u6218\u540d\u989d"),1
case 12:c=s.bj(r,l)
if((c==null?null:c.a)===B.h||h3){p=9
break}case 11:++d
p=8
break
case 9:case 7:case 5:p=h3?13:14
break
case 13:j=q.E(h2)
i=A.j(j)
h=i.h("f<1>")
a1=A.x(new A.f(j,i.h("i(1)").a(new A.eR()),h),h.h("b.E"))
B.a.H(a1,new A.f1())
j=A.j(a1),i=A.ac(a1,0,A.a7(3,"count",t.S),j.c),h=i.$ti,i=new A.y(i,i.gm(0),h.h("y<m.E>")),e=h1.ay,c=h1.d,a0=t.v,a2=t.w,a3=t.e,a4=j.h("i(1)"),j=j.h("f<1>"),h=h.h("m.E")
case 15:if(!i.j()){p=16
break}a5=i.d
if(a5==null)a5=h.a(a5)
if(!h5.X()){p=16
break}a6=q.S()
k=A.c([],a2)
a7=A.c([a5],a3)
B.a.A(a7,new A.f(a1,a4.a(new A.f4(a5)),j))
a5=a7.length,a8=a6.x,a9=0
case 17:if(!(a9<a7.length)){p=19
break}b0=a7[a9]
b1=a6.L(h2)
if(m){b2=a8.i(0,h2)
if(b2==null)b2=c}else b2=B.c.v(h6-e,0,5)
if(b1<=b2){p=19
break}if(!a6.bv(b0)){p=18
break}B.a.k(k,new A.K(B.u,b0.a,null,null,0,B.e))
p=m?20:21
break
case 20:b3=a6.S()
b4=A.x(k,a0)
b1=b3.E(h2)
b2=A.j(b1)
b5=b2.h("f<1>")
g=A.x(new A.f(b1,b2.h("i(1)").a(new A.f5()),b5),b5.h("b.E"))
B.a.H(g,new A.f6())
p=g.length!==0?22:23
break
case 22:b1=b3.x
b6=0
for(;;){if(b6<3){b2=b3.L(h2)
b5=b1.i(0,h2)
if(b5==null)b5=c
b5=b2>b5
b2=b5}else b2=!1
if(!b2)break
if(!b3.b0(h1,B.a.gK(g)))break
B.a.k(b4,new A.K(B.p,B.a.gK(g).a,h2,null,0,B.e));++b6}b2=b3.L(h2)
b1=b1.i(0,h2)
if(b1==null)b1=c
p=b2<=b1&&b3.d>=b3.ak(!0).a?24:25
break
case 24:p=26
return h7.b=s.aP(r,q,b3,b4,"\u5148\u89e3\u96c7\u4f4e\u4ea4\u6362\u4ef7\u503c\u6321\u4f4d\u8005\u7b79\u8d44\uff0c\u4fdd\u7559\u4e3b\u6301\u8005\u5b8c\u6210\u6551\u57ce\u5347\u7ea7"),1
case 26:case 25:case 23:case 21:case 18:a7.length===a5||(0,A.v)(a7),++a9
p=17
break
case 19:a5=a6.L(h2)
if(m){a7=a8.i(0,h2)
if(a7==null)a7=c}else a7=B.c.v(h6-e,0,5)
p=a5<=a7?27:28
break
case 27:p=29
return h7.b=s.aP(r,q,a6,k,"\u6ca1\u6709\u53ef\u652f\u4ed8\u4e14\u53ca\u65f6\u7684\u5347\u7ea7\u65b9\u6848\uff0c\u6e05\u51fa\u6321\u4f4d\u5b88\u5c06\u5e76\u4fdd\u7559\u6838\u5fc3\u51fa\u573a"),1
case 29:case 28:p=15
break
case 16:case 14:j=q.E(h2)
i=A.j(j)
h=i.h("f<1>")
b7=A.x(new A.f(j,i.h("i(1)").a(new A.f7(q)),h),h.h("b.E"))
B.a.H(b7,new A.f8())
if(!h3){j=r.f
j=(j==null?null:j.a)!==B.h}else j=!0
p=j&&s.a.x.gP().gm(0)>1?30:31
break
case 30:b8=q.S()
j=r.f
if((j==null?null:j.a)===B.r)b8.ay.k(0,h2)
b9=A.c([],h4)
j=s.a.x
i=j.gP()
h=i.$ti
e=h.h("f<b.E>")
c0=A.x(new A.f(i,h.h("i(b.E)").a(new A.f9(h1)),e),e.h("b.E"))
B.a.H(c0,new A.fa(h1))
i=A.ac(b7,0,A.a7(s.b.r.as,"count",t.S),A.j(b7).c),h=i.$ti,i=new A.y(i,i.gm(0),h.h("y<m.E>")),e=h1.ay,c=A.j(c0),a0=c.c,c=c.h("J<1>"),a2=c.h("y<m.E>"),a3=s.e,a4=a3.c,a5=s.f,a7=c.h("m.E"),h=h.h("m.E"),a8=h1.d,b1=t.er,b2=t.bo,b5=t.i,c1=t.I
case 32:if(!i.j()){p=33
break}c2=i.d
if(c2==null)c2=h.a(c2)
if(!h5.X()){p=33
break}c3=new A.J(c0,0,4,c)
c3.a3(c0,0,4,a0)
c3=new A.y(c3,c3.gm(0),a2)
c4=b8.x
c5=null
while(c3.j()){c6=c3.d
if(c6==null)c6=a7.a(c6)
c7=c6.a
c8=a5.i(0,c7)
c9=c8==null
if(c9)d0=null
else d0=c8.d.length!==0||c8.a.ax!=null
if(d0===!0){if(c9)c9=null
else{c9=c8.f
c9=c9==null?null:c9.a}c9=c9!==B.h}else c9=!1
if(c9)continue
c9=b8.L(c7)
d0=c6.ax
if(d0==null){c7=c4.i(0,c7)
if(c7==null)c7=c6.d}else c7=B.c.v(d0-c6.ay,0,5)
if(c9>=c7)continue
d1=a4.ah(c2,c6.f,j,!0,c6)
c7=h3?"transfer":"evacuate"
d2=a3.b2(b8,c2,d1,!0,r.ga4(),!0,"\u5728\u539f\u57ce\u5371\u9669\u7a97\u53e3\u524d\u8fdb\u9a7b\u5b89\u5168\u53cb\u57ce\uff0c\u6539\u53d8\u6240\u5c5e\u57ce\u4ee5\u4fdd\u5168\u5c06\u9886",c7,c6)
if(d2!=null)c6=c5==null||d2.a.d>c5.a.d
else c6=!1
if(c6)c5=d2}if(c5==null){p=32
break}b8=c5.a
B.a.k(b9,c5.b)
c2=b8.L(h2)
if(m){c3=b8.x.i(0,h2)
if(c3==null)c3=a8}else c3=B.c.v(h6-e,0,5)
p=c2<=c3?34:35
break
case 34:d3=new A.bB(b9,b1.a(new A.eS()),b2).F(0,0,new A.eT(s),b5)
c2=b8.S()
c3=A.x(b9,c1)
c4=s.aa(r,b8)
c6=isFinite(r.ga4())?"\u5b89\u5168\u5224\u65ad\u4ee5\u5b9e\u9645\u8fdb\u9a7b\u53cb\u57ce\u4e3a\u51c6\uff0c\u9014\u4e2d\u539f\u57ce\u5931\u5b88\u4ecd\u4f1a\u6e05\u9664\u90e8\u961f":"\u8f6c\u79fb\u5230\u5b89\u5168\u540e\u65b9\u6574\u5907"
p=36
return h7.b=new A.ap(c2,c3,c4+d3*0.65,!1,c6),1
case 36:if(h3){p=33
break}case 35:p=32
break
case 33:case 31:j=s.a.x
i=j.e
h=A.j(i)
e=h.h("f<1>")
d4=A.x(new A.f(i,h.h("i(1)").a(new A.eU(s,q)),e),e.h("b.E"))
B.a.H(d4,new A.eV(h1))
i=r.d
h=i.length===0?0:s.b.r.as
e=t.S
h=A.ac(d4,0,A.a7(h,"count",e),A.j(d4).c)
c=h.$ti
h=new A.y(h,h.gm(0),c.h("y<m.E>"))
a0=s.e
a2=s.d
a3=a0.c
a4=a3.a
a5=h1.ay
a7=s.f
c=c.h("m.E")
a8=h1.d
b1=q.x
b2=r.f
b5=s.b
c1=b5.b
c2=A.j(i)
c3=c2.h("o(1)")
c4=c2.h("T<1,o>")
c6=h1.f
c7=c2.c
c2=c2.h("J<1>")
c9=c2.h("y<m.E>")
d0=c2.h("m.E")
d5=b2==null
case 37:if(!h.j()){p=38
break}d6=h.d
if(d6==null)d6=c.a(d6)
if(!h5.X()){p=38
break}d7=d6.c
d8=a7.i(0,d7)
d9=r.ga4()
e0=d8==null
if(e0)e1=null
else e1=d8.d.length!==0||d8.a.ax!=null
e1=e1===!0?d8.ga4():1/0
e2=Math.min(d9,e1)
d9=q.L(h2)
if(m){e1=b1.i(0,h2)
if(e1==null)e1=a8}else e1=B.c.v(h6-a5,0,5)
p=d9<e1?39:40
break
case 39:e3=new A.T(i,c3.a(new A.eW()),c4).V(0,new A.eX(s))
if(m){d9=b1.i(0,h2)
if(d9==null)d9=a8}else d9=B.c.v(h6-a5,0,5)
e1=c1.i(0,"soldierLimit")
e1.toString
e4=a2.aT(d6,e3,d9,Math.min(B.b.p(e1),q.e+d6.gO()))
d9=d5?null:b2.b
if(d9==null)d9=-1
p=e4.b>d9+0.05?41:42
break
case 41:d2=a0.b2(q,d6,a3.ah(d6,c6,j,!0,h1),!0,e2,!0,"\u53ec\u56de\u80fd\u53ca\u65f6\u589e\u5f3a\u9632\u7ebf\u7684\u5728\u5916\u5c06\u9886\uff0c\u5e76\u9884\u7559\u5165\u57ce\u540d\u989d","rescue",h1)
p=d2!=null?43:44
break
case 43:d9=d2.a
p=45
return h7.b=new A.ap(d9,A.c([d2.b],h4),s.aa(r,d9)+200+A.a8(d6)*0.25,!1,""),1
case 45:case 44:case 42:case 40:d9=new A.J(i,0,2,c2)
d9.a3(i,0,2,c7)
d9=new A.y(d9,d9.gm(0),c9)
e1=d6.ok
d7=d7!==h2
case 46:if(!d9.j()){p=47
break}e5=d9.d
if(e5==null)e5=d0.a(e5)
e6=!1
if(d7){if(e0)e7=null
else e7=d8.d.length!==0||d8.a.ax!=null
if(e7===!0){if(e0)e6=null
else{e6=d8.f
e6=e6==null?null:e6.a}e6=e6!==B.h}}if(e6){p=46
break}e6=e5.a
d1=a0.by(d6,e6,q)
if(a2.cf(d6,e6,e6.ok,e1,a4.aR(e6.z)).a!==B.h){p=46
break}d2=a0.bK(q,d6,d1,e5.b,!0,e6,"\u56de\u63f4\u91c7\u53d6\u57ce\u5916\u622a\u51fb\uff0c\u907f\u514d\u5165\u57ce\u6324\u5360\u5b89\u5168\u540d\u989d","intercept",h1)
p=d2!=null?48:49
break
case 48:e5=d2.a
p=50
return h7.b=new A.ap(e5,A.c([d2.b],h4),s.aa(r,e5)+180+A.a8(e6)*0.3,h3,""),1
case 50:case 49:p=46
break
case 47:p=37
break
case 38:h=A.ac(i,0,A.a7(2,"count",e),c7),e=h.$ti,h=new A.y(h,h.gm(0),e.h("y<m.E>")),c=A.j(b7),a7=c.c,c=c.h("J<1>"),b1=c.h("y<m.E>"),c2=t.H,c3=t.N,c4=t.Y,c6=t.v,c7=t.w,c9=t.e,d0=t.dT,d6=c.h("m.E"),b5=b5.r.d,e=e.h("m.E")
case 51:if(!h.j()){p=52
break}d7=h.d
if(d7==null)d7=e.a(d7)
d9=d7.a
if(d9.k1!=null){p=51
break}e0=new A.J(b7,0,4,c)
e0.a3(b7,0,4,a7)
e0=new A.y(e0,e0.gm(0),b1)
d7=d7.b
e1=d9.z
e5=d9.ok
case 53:if(!e0.j()){p=54
break}e6=e0.d
if(e6==null)e6=d6.a(e6)
if(!h5.X()){p=54
break}e7=q.E(h2)
e8=A.j(e7)
e9=e8.h("f<1>")
f0=A.x(new A.f(e7,e8.h("i(1)").a(new A.eY(e6)),e9),e9.h("b.E"))
f1=f0.length===0?null:B.a.V(f0,new A.eZ(s))
d1=a0.by(e6,d9,q)
if(!d1.d||d1.b+b5>=d7){p=53
break}f2=A.c([new A.bi(q,A.c([],c7),A.c([],c9))],d0)
if(h3){e7=q.d
e8=c1.i(0,"emergencyGold")
e8.toString
e8=e7<B.b.p(e8)+4
e7=e8}else e7=!1
if(e7){e7=A.j(f0)
e8=e7.h("f<1>")
f3=A.x(new A.f(f0,e7.h("i(1)").a(new A.f_(f1)),e8),e8.h("b.E"))
B.a.H(f3,new A.f0())
if(f3.length!==0&&h5.X()){b3=q.S()
if(b3.bv(B.a.gK(f3)))B.a.k(f2,new A.bi(b3,A.c([new A.K(B.u,B.a.gK(f3).a,null,null,0,B.e)],c7),A.c([B.a.gK(f3)],c9)))}}e7=f2.length,e8=f1==null,e9=!e8,f4=e6.f,a9=0
case 55:if(!(a9<f2.length)){p=57
break}f5=f2[a9]
f6=f5.a
f7=a0.aZ(e6,f6),f8=f7.length,f9=f6.x,g0=0
case 58:if(!(g0<f7.length)){p=60
break}g1=f7[g0]
g2=a4.aR(e1)
g3=c1.i(0,"soldierLimit")
g3.toString
e4=a2.cj(e6,d9,e5,g1,!0,Math.min(B.b.p(g3),f6.e),g2)
g4=e4.a===B.h
g2=!g4
g3=!1
if(g2)if(e9)if(e4.d>0){g3=c1.i(0,"soldierLimit")
g3.toString
g3=Math.min(B.b.p(g3),f6.e)
g5=c1.i(0,"soldierHp")
g5.toString
g5=e4.f<f4+g3*B.b.p(g5)
g3=g5}if(g3){g3=f6.e
g5=c1.i(0,"soldierLimit")
g5.toString
g6=Math.max(0,g3-B.b.p(g5))
if(m){g3=f9.i(0,h2)
if(g3==null)g3=a8}else g3=B.c.v(h6-a5,0,5)
g5=c1.i(0,"soldierLimit")
g5.toString
g7=a2.aT(f1,d9,g3,Math.min(B.b.p(g5),g6))
if(m){g3=f9.i(0,h2)
if(g3==null)g3=a8}else g3=B.c.v(h6-a5,0,5)
g5=c1.i(0,"soldierLimit")
g5.toString
g8=a2.cg(f1,d9,e4.d,g3,Math.min(B.b.p(g5),g6))
g9=g8.b-g7.b
g4=g8.a===B.h&&g9>0.12}else g9=0
if(!g4){p=59
break}if(f0.length===0)g2=i.length>1||g2
else g2=!1
if(g2){p=59
break}g2=g9>0
g3=g2?"\u914d\u5907\u53ef\u5151\u73b0\u7684\u9996\u4ef6\u6b66\u5668\u622a\u51fb\uff0c\u4fdd\u7559\u6838\u5fc3\u5b88\u519b\u5175\u5458\u5e76\u6539\u5584\u9632\u5fa1\u4f59\u91cf":"\u6838\u5fc3\u5c06\u9886\u5728\u6b66\u5668\u548c\u5730\u5f62\u6709\u5229\u7684\u57ce\u5916\u8fce\u6218\uff0c\u76d1\u63a7\u7ed5\u8fc7\u622a\u51fb\u7684\u6765\u654c"
if(e8)g5=0
else{g5=c1.i(0,"soldierLimit")
g5.toString
g5=Math.min(B.b.p(g5),f6.e)}d2=a0.bI(f6,e6,d1,d7,!0,d9,g1,g5,g3,"intercept",h1)
if(d2==null){p=59
break}f7=d2.a
h0=f7.L(h2)
f8=d2.b
f9=A.x(f5.b,c6)
B.a.A(f9,f8.b)
g3=A.hG(c3,c3)
g3.A(0,f8.c)
g5=f5.c
g3.A(0,a0.a5(g5,A.c([],c4)))
f8=A.c([new A.P(f8.a,f9,g3,f8.d,f8.e,!0)],h4)
g3=s.aa(r,f7)
f9=g2?A.a8(e6)*0.5:0
g5=J.jc(g5,0,new A.f2(),c2)
if(m){g2=f7.x.i(0,h2)
if(g2==null)g2=a8}else g2=B.c.v(h6-a5,0,5)
p=61
return h7.b=new A.ap(f7,f8,g3+200+g9*500-f9-g5,h0>g2,""),1
case 61:p=60
break
case 59:f7.length===f8||(0,A.v)(f7),++g0
p=58
break
case 60:case 56:f2.length===e7||(0,A.v)(f2),++a9
p=55
break
case 57:p=53
break
case 54:p=51
break
case 52:if(j.gP().gm(0)===1)i=(d5?null:b2.a)===B.r&&b7.length>1
else i=!1
p=i?62:63
break
case 62:i=j.d,h=A.j(i),e=h.h("f<1>"),e=A.jU(new A.f(i,h.h("i(1)").a(new A.f3(s)),e),3,e.h("b.E")),h=e.a,e=new A.aX(h.gt(h),e.b,A.r(e).h("aX<1>"))
case 64:if(!e.j()){p=65
break}i=e.gl()
if(!h5.X()){p=65
break}b0=B.a.gK(b7)
d2=a0.bJ(q,b0,a3.ah(b0,i.f,j,!0,i),r.ga4(),!0,"\u4fdd\u7559\u539f\u57ce\u5b88\u519b\u62d6\u5ef6\uff0c\u6838\u5fc3\u5728\u5371\u9669\u7a97\u53e3\u524d\u593a\u53d6\u7a7a\u57ce\u5efa\u7acb\u65b0\u636e\u70b9","newBase",i)
p=d2!=null?66:67
break
case 66:i=d2.a
h=A.c([d2.b],h4)
c=s.aa(r,i)
a2=A.a8(b0)
a4=i.L(h2)
if(m){a7=i.x.i(0,h2)
if(a7==null)a7=a8}else a7=B.c.v(h6-a5,0,5)
p=68
return h7.b=new A.ap(i,h,c+a2*1.2,a4>a7,""),1
case 68:case 67:p=64
break
case 65:case 63:case 1:return 0
case 2:return h7.c=n.at(-1),3}}}},
aP(a,b,c,d,e){var s,r,q,p,o,n,m=this
t.f3.a(d)
s=A.j(d)
r=s.h("o?(1)").a(new A.eM(m))
q=c.z.co(b.z).F(0,0,new A.eN(m),t.i)
p=c.S()
o=A.x(d,t.v)
s=A.x(new A.c4(new A.T(d,r,s.h("T<1,o?>")),t.gn),t.r)
r=a.d
n=A.j(r)
B.a.A(s,new A.T(r,n.h("o(1)").a(new A.eO()),n.h("T<1,o>")))
return new A.ap(p,A.c([new A.P(e,o,m.e.a5(s,A.c([a.a],t.Y)),B.m,c.ak(!0).a,!0)],t.a),m.aa(a,c)-q*0.65-Math.max(0,b.d-c.d)*0.2,!1,"")},
bj(a,b){var s,r,q,p,o,n,m=this,l=a.d
if(l.length===0)return null
s=a.a
r=b.E(s.a)
q=A.j(r).h("a3<1>")
p=A.ac(new A.a3(r,q),0,A.a7(b.R(s),"count",t.S),q.h("m.E")).a8(0)
if(p.length===0)return null
o=B.a.V(p,new A.eJ(m))
r=A.j(l)
n=new A.T(l,r.h("o(1)").a(new A.eK()),r.h("T<1,o>")).V(0,new A.eL(m))
s=Math.max(1,b.R(s)-B.a.ct(p,o))
r=m.b.b.i(0,"soldierLimit")
r.toString
return m.d.bs(o,n,n.ok,s,!1,Math.min(B.b.p(r),b.e+o.gO()))},
aa(a,b){var s=a.a,r=b.L(s.a),q=Math.max(0,r-b.R(s)),p=this.a.x.gP().gm(0)===1?400:0,o=150+s.w*4+a.r*0.5+p,n=this.bj(a,b)
s=r===0?o*2:0
p=n==null?null:n.b
if(p==null)p=-0.8
return-q*5000-s+p*o}}
A.eP.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.eQ.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.D(s.a(b).x,a.x)},
$S:3}
A.eR.prototype={
$1(a){t.r.a(a)
return a.dy&&a.e!==2},
$S:0}
A.f1.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.D(A.a8(a),A.a8(b))},
$S:3}
A.f4.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.f5.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.f6.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.D(s.a(b).x,a.x)},
$S:3}
A.f7.prototype={
$1(a){t.r.a(a)
return a.db&&!this.a.as.q(0,a.a)},
$S:0}
A.f8.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.D(A.a8(s.a(b)),A.a8(a))},
$S:3}
A.f9.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:2}
A.fa.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.f
return B.b.D(a.f.G(s),b.f.G(s))},
$S:12}
A.eS.prototype={
$1(a){return t.I.a(a).d},
$S:54}
A.eT.prototype={
$2(a,b){var s
A.as(a)
s=this.a.a.x.ag(t.J.a(b).a)
s.toString
return a+A.a8(s)},
$S:37}
A.eU.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a.x.a&&a.dx&&!a.fy&&!this.b.as.q(0,a.a)},
$S:0}
A.eV.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.f
return B.b.D(a.z.G(s),b.z.G(s))},
$S:3}
A.eW.prototype={
$1(a){return t.O.a(a).a},
$S:13}
A.eX.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.b3(a,s)>A.b3(b,s)?a:b},
$S:7}
A.eY.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.eZ.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.b3(a,s)>A.b3(b,s)?a:b},
$S:7}
A.f_.prototype={
$1(a){t.r.a(a)
return a!==this.a&&a.dy&&a.e!==2},
$S:0}
A.f0.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.D(A.a8(a),A.a8(b))},
$S:3}
A.f2.prototype={
$2(a,b){return A.t(a)+A.a8(t.r.a(b))*0.65},
$S:40}
A.f3.prototype={
$1(a){var s
t.q.a(a)
s=this.a.a.x
return a.b!==s.a&&s.E(a.a).length===0},
$S:2}
A.eM.prototype={
$1(a){return this.a.a.x.ag(t.v.a(a).b)},
$S:41}
A.eN.prototype={
$2(a,b){var s
A.as(a)
s=this.a.a.x.ag(A.D(b))
s.toString
return a+A.a8(s)},
$S:42}
A.eO.prototype={
$1(a){return t.O.a(a).a},
$S:13}
A.eJ.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.b3(a,s)>A.b3(b,s)?a:b},
$S:7}
A.eK.prototype={
$1(a){return t.O.a(a).a},
$S:13}
A.eL.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.b3(a,s)>A.b3(b,s)?a:b},
$S:7}
A.Q.prototype={
B(){return A.c([this.a,this.b],t.n)},
G(a){var s=this.a-a.a,r=this.b-a.b
return Math.sqrt(s*s+r*r)},
an(a,b){var s=this.a,r=this.b
return new A.Q(s+(a.a-s)*b,r+(a.b-r)*b)}}
A.dN.prototype={
ap(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this.a,f=B.a.gK(g)
for(s=a.a,r=a.b,q=1/0,p=0;o=g.length,p<o;){n=g[p];++p
m=g[p%o]
o=n.a
l=m.a-o
k=n.b
j=m.b-k
i=n.an(m,B.b.v(((s-o)*l+(r-k)*j)/(l*l+j*j),0,1))
h=i.G(a)
if(h<q){q=h
f=i}}return f},
q(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(this.ap(b).G(b)<1e-7)return!0
for(s=this.a,r=s.length,q=b.b,p=b.a,o=!1,n=0;n<r;){m=s[n];++n
l=s[n%r]
k=m.b
j=l.b
if(k>q!==j>q){i=m.a
i=p<(l.a-i)*(q-k)/(j-k)+i
k=i}else k=!1
if(k)o=!o}return o},
bx(a,b){var s
if(this.q(0,a))return null
s=this.bt(a,b)
return s.length===0?null:B.a.V(s,B.q)},
bt(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.a,g=b.a-h,f=a.b,e=b.b-f,d=A.c([],t.n)
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
bo(a,b){var s,r=this
if(r.q(0,a))return r.ap(a)
s=r.bx(a,b)
return s==null?r.ap(a):a.an(b,s)},
bu(a,b){var s=a.G(b),r=s<1e-7?new A.Q(a.a+4096,a.b+0):a.an(b,4096/s),q=this.bt(a,r)
return q.length===0?this.ap(b):a.an(r,B.a.V(q,B.x))}}
A.ag.prototype={
aH(){return"AiArmyState."+this.b}}
A.o.prototype={
gO(){var s=this.at,r=A.j(s)
return new A.f(s,r.h("i(1)").a(new A.dl()),r.h("f<1>")).gm(0)},
gaz(){return this.f+B.a.F(this.at,0,new A.dk(),t.H)},
B(){var s,r,q,p,o,n,m,l=this,k=l.z,j=t.n
k=A.c([k.a,k.b],j)
s=l.Q
s=A.c([s.a,s.b],j)
r=l.CW
r=r==null?null:A.c([r.a,r.b],j)
q=A.c([],t.b)
for(p=l.p2,o=p.length,n=0;n<p.length;p.length===o||(0,A.v)(p),++n){m=p[n]
q.push(A.c([m.a,m.b],j))}return A.N(["id",l.a,"c",l.b,"home",l.c,"o",l.d,"t",l.e,"hp",l.f,"max",l.r,"a",l.w,"p",l.x,"pay",l.y,"xy",k,"v",s,"s",l.as.a,"troops",l.at,"w",l.ax,"m",l.ay,"due",l.ch,"to",r,"target",l.cx,"return",l.cy,"dispatch",l.db,"move",l.dx,"dismiss",l.dy,"upgrade",l.fr,"retreat",l.fx,"marked",l.fy,"rev",l.go,"orderRev",l.id,"opponent",l.k1,"clashes",l.k2,"received",l.k3,"dealt",l.k4,"opening",l.ok,"weaponReady",l.p1,"returnPath",q],t.N,t.X)}}
A.dl.prototype={
$1(a){return A.as(a)>0},
$S:9}
A.dk.prototype={
$2(a,b){return A.t(a)+A.as(b)},
$S:10}
A.a5.prototype={
gae(){var s=this.ax
return s==null?this.d:B.c.v(s-this.ay,0,5)},
B(){var s,r,q,p,o,n=this,m=n.f,l=t.n
m=A.c([m.a,m.b],l)
s=A.c([],t.b)
for(r=n.r.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.v)(r),++p){o=r[p]
s.push(A.c([o.a,o.b],l))}return A.N(["id",n.a,"c",n.b,"native",n.c,"level",n.d,"keep",n.e,"xy",m,"outline",s,"income",n.w,"baseIncome",n.Q,"poor",n.x,"cap",n.y,"recruitCap",n.z,"recruit",n.as,"rev",n.at,"initial",n.ax,"wins",n.ay,"attacker",n.ch,"defender",n.CW,"stage",n.cx,"next",n.cy,"danger",n.db],t.N,t.X)}}
A.aR.prototype={
B(){var s,r,q=this,p=t.N,o=t.S,n=A.X(p,o)
for(s=q.r.ga6(),s=s.gt(s);s.j();){r=s.gl()
n.u(0,""+r.a,r.b)}o=A.X(p,o)
for(s=q.w.ga6(),s=s.gt(s);s.j();){r=s.gl()
o.u(0,""+r.a,r.b)}return A.N(["id",q.a,"gold",q.b,"reserves",q.c,"capacity",q.d,"salary",q.e,"poor",q.f,"stock",n,"hate",o],p,t.X)}}
A.dF.prototype={
gao(){return B.a.am(this.f,new A.dL(this))},
gP(){var s=this.d,r=A.j(s)
return new A.f(s,r.h("i(1)").a(new A.dM(this)),r.h("f<1>"))},
E(a){var s=this.e,r=A.j(s),q=r.h("f<1>")
s=A.x(new A.f(s,r.h("i(1)").a(new A.dI(this,a)),q),q.h("b.E"))
B.a.H(s,new A.dJ())
return s},
ag(a){var s=this.e,r=A.j(s)
return A.fc(new A.f(s,r.h("i(1)").a(new A.dK(a)),r.h("f<1>")),t.r)},
M(a){var s=this.d,r=A.j(s)
return A.fc(new A.f(s,r.h("i(1)").a(new A.dG(a)),r.h("f<1>")),t.q)},
B(){var s,r,q,p,o=this,n=t.d,m=A.c([],n)
for(s=o.d,r=s.length,q=0;q<r;++q)m.push(s[q].B())
s=A.c([],n)
for(r=o.e,p=r.length,q=0;q<p;++q)s.push(r[q].B())
n=A.c([],n)
for(r=o.f,p=r.length,q=0;q<p;++q)n.push(r[q].B())
return A.N(["country",o.a,"tick",o.b,"month",o.c,"cities",m,"heroes",s,"countries",n,"pool",o.r,"salary",o.w],t.N,t.X)}}
A.dL.prototype={
$1(a){return t.u.a(a).a===this.a.a},
$S:6}
A.dM.prototype={
$1(a){return t.q.a(a).b===this.a.a},
$S:2}
A.dI.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b
if(a.c===s){r=a.as
s=(r===B.f||r===B.d)&&a.f>0&&a.b===B.a.am(this.a.d,new A.dH(s)).b}else s=!1
return s},
$S:0}
A.dH.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:2}
A.dJ.prototype={
$2(a,b){var s=t.r
return B.c.D(s.a(a).d,s.a(b).d)},
$S:3}
A.dK.prototype={
$1(a){return t.r.a(a).a===this.a},
$S:0}
A.dG.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:2}
A.cX.prototype={}
A.fp.prototype={
aZ(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.as
if(!(h===B.f||h===B.d))return A.c([a.ax],t.x)
h=this.b
s=h.f.gb1()
r=A.r(s)
q=r.h("f<b.E>")
p=A.x(new A.f(s,r.h("i(b.E)").a(new A.fs(this,b)),q),q.h("b.E"))
B.a.H(p,new A.ft())
s=t.dC
o=A.c([A.c([],s)],t.x)
for(r=t.S,q=A.j(p),n=A.ac(p,0,A.a7(5,"count",r),q.c),m=n.$ti,n=new A.y(n,n.gm(0),m.h("y<m.E>")),m=m.h("m.E");n.j();){l=n.d
B.a.k(o,A.c([(l==null?m.a(l):l).a],s))}if(p.length!==0){n=q.h("i(1)")
q=q.h("f<1>")
k=A.x(new A.f(p,n.a(new A.fu(a)),q),q.h("b.E"))
m=k.length===0?p:k
j=B.a.V(m,new A.fv())
if(!B.a.W(o,new A.fw(j)))B.a.k(o,A.c([j.a],s))
h=h.b.i(0,"carryLimit")
h.toString
B.a.k(o,A.fk(Math.min(3,B.b.p(h)),j.a,!1,r))
i=A.fc(new A.f(p,n.a(new A.fx(b)),q),t.o)
if(i!=null&&!B.a.W(o,new A.fy(i)))B.a.k(o,A.c([i.a],s))}return o},
a5(a,b){var s,r,q,p,o
t.ef.a(a)
t.fy.a(b)
s=t.N
s=A.X(s,s)
for(r=a.length,q=0;q<a.length;a.length===r||(0,A.v)(a),++q){p=a[q]
s.u(0,"h:"+p.a,p.go)}for(r=b.length,q=0;q<b.length;b.length===r||(0,A.v)(b),++q){o=b[q]
s.u(0,"c:"+o.a,o.at)}return s},
af(a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=this,a5=null
t.L.a(b3)
if(!a8.d||!isFinite(a8.b)||J.jd(a8.a)||a7.fy||a6.as.q(0,a7.a))return a5
s=a8.b
r=a4.b
q=r.r
p=s+q.d
if(p>=b0)return a5
o=a7.a
n=a6.y.i(0,o)
if(n!=null&&n.x>a4.a.x.b){if(!b1)return a5
m=!1
if(n.b===b8){l=n.d
if(l===b9.a){l=n.e
if(l==(b2==null?a5:b2.a)){m=n.f
l=J.cn(m)
m=l.gaX(m)&&l.gaY(m).G(J.jf(a8.a))<32&&a7.as!==B.n}}}if(m)return a5}k=a6.S()
j=A.c([],t.w)
m=!a9
if(m){l=r.b
i=l.i(0,"battleBudget")
i.toString
h=Math.min(b9.gae(),a4.a.x.E(b9.a).length)
h=Math.max(1,h)
l=l.i(0,"supplySafety")
l.toString
p+=i*(b5+1)*h+s+l}if(p>600)return a5
s=b9.a
l=b2==null
i=l?a5:b2.a
h=a4.a.x
g=h.b
f=B.b.aS(isFinite(b0)?b0*60:Math.max(p,60)*60)
e=B.b.cG(q.e*60)
d=a8.a
r=r.b
c=r.i(0,"supplySeconds")
c.toString
b=new A.a6(o,b8,b7,s,i,d,0,g+f,g+e,B.b.aS(p/c),a9,a7.id+1)
i=!1
if(a9){g=k.L(s)
q=g>=(b6?Math.max(k.R(b9),b9.z+q.r):k.R(b9))}else q=i
if(q)return a5
q=a7.as
if(q===B.f||q===B.d){q=k.f
r=r.i(0,"soldierLimit")
r.toString
a=Math.max(0,Math.min(q,b4+B.b.p(r)-a7.gO())-k.e)
if(a>0){if(!k.bq(a))return a5
B.a.k(j,new A.K(B.v,a5,a7.c,a5,a,B.e))}r=t.S
a0=A.X(r,r)
for(r=b3.length,q=k.w,a1=0;a1<b3.length;b3.length===r||(0,A.v)(b3),++a1){a2=b3[a1]
a0.ad(a2,new A.fz(),new A.fA())
i=q.i(0,a2)
if(i==null)i=0
g=a0.i(0,a2)
g.toString
if(i<g){if(!k.cd(a2))return a5
B.a.k(j,new A.K(B.G,a5,a5,a5,a2,B.e))}}if(!k.cn(a7,b3,b,p))return a5
if(k.e<b4)return a5
if(b8==="intercept"||d.length>1)s=a5
B.a.k(j,new A.K(B.H,o,s,J.dj(d),0,b3))}else{if(!k.cE(a7,b))return a5
if(b8==="intercept"||d.length>1)s=a5
B.a.k(j,new A.K(B.I,o,s,J.dj(d),0,B.e))}a3=k.ak(b1).a
s=k.d
if(s>=a3)s=m&&s===0
else s=!0
if(s)return a5
s=A.c([a7],t.e)
if(!l)s.push(b2)
r=h.M(a7.c)
r.toString
r=A.c([r],t.Y)
r.push(b9)
return new A.cX(k,new A.P(b7,j,a4.a5(s,r),A.c([b],t.m),a3,b1))},
bH(a,b,c,d,e,f,g,h,i,j){return this.af(a,b,c,d,e,f,null,B.e,0,0,g,h,i,j)},
bL(a,b,c,d,e,f,g,h,i){return this.af(a,b,c,!1,1/0,!1,null,d,e,f,!1,g,h,i)},
b2(a,b,c,d,e,f,g,h,i){return this.af(a,b,c,d,e,f,null,B.e,0,0,!1,g,h,i)},
bK(a,b,c,d,e,f,g,h,i){return this.af(a,b,c,!1,d,e,f,B.e,0,0,!1,g,h,i)},
bI(a,b,c,d,e,f,g,h,i,j,k){return this.af(a,b,c,!1,d,e,f,g,h,0,!1,i,j,k)},
bJ(a,b,c,d,e,f,g,h){return this.af(a,b,c,!1,d,e,null,B.e,0,0,!1,f,g,h)},
by(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a5.k1!=null)return B.o
s=this.a.x
r=s.M(a4.c)
r.toString
q=a4.as
p=q===B.f||q===B.d?r.r.bu(r.f,a5.z):a4.z
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
g=h.aR(p)
if(!(g<m.length))return A.k(m,g)
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
a0=A.x(new A.f(A.c([(m-a)/j,(m+a)/j],t.n),t.db.a(new A.fq()),g),g.h("b.E"))
if(a0.length!==0)b=B.a.V(a0,B.q)}for(m=s.d,a1=B.o,a2=0;a2<3;++a2){a3=new A.Q(q+l*b,r+k*b)
if(!h.q(0,a3)||B.a.W(m,new A.fr(a3)))return B.o
a1=i.cL(a4,a3,s)
if(!a1.d)return a1
j=a1.b
if(Math.abs(b-j)<0.1)break
b=(b+j)/2}return a1}}
A.fs.prototype={
$1(a){var s
t.o.a(a)
s=this.b.w.i(0,a.a)
if((s==null?0:s)<=0)s=a.f&&this.a.a.x.gP().gm(0)>=a.e
else s=!0
return s},
$S:14}
A.ft.prototype={
$2(a,b){var s,r=t.o
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.c.D(a.a,b.a):B.c.D(r,s)},
$S:44}
A.fu.prototype={
$1(a){return t.o.a(a).d<this.a.gaz()},
$S:14}
A.fv.prototype={
$2(a,b){var s=t.o
s.a(a)
s.a(b)
return a.c-a.d>b.c-b.d?a:b},
$S:45}
A.fw.prototype={
$1(a){t.L.a(a)
return a.length===1&&J.dj(a)===this.a.a},
$S:22}
A.fx.prototype={
$1(a){var s
t.o.a(a)
if(a.d>0){s=this.a.w.i(0,a.a)
s=(s==null?0:s)>0}else s=!1
return s},
$S:14}
A.fy.prototype={
$1(a){t.L.a(a)
return a.length===1&&J.dj(a)===this.a.a},
$S:22}
A.fz.prototype={
$1(a){return A.d(a)+1},
$S:5}
A.fA.prototype={
$0(){return 1},
$S:4}
A.fq.prototype={
$1(a){return A.as(a)>=0},
$S:9}
A.fr.prototype={
$1(a){return t.q.a(a).r.q(0,this.a)},
$S:2}
A.am.prototype={
aH(){return"AiActionKind."+this.b}}
A.K.prototype={
B(){var s=this,r=s.d
r=r==null?null:A.c([r.a,r.b],t.n)
return A.N(["kind",s.a.a,"hero",s.b,"city",s.c,"point",r,"amount",s.e,"weapons",s.f],t.N,t.X)}}
A.a6.prototype={
B(){var s,r,q,p,o,n=this,m=A.c([],t.b)
for(s=n.f,r=s.length,q=t.n,p=0;p<s.length;s.length===r||(0,A.v)(s),++p){o=s[p]
m.push(A.c([o.a,o.b],q))}return A.N(["hero",n.a,"role",n.b,"deadline",n.w,"commit",n.x,"city",n.d,"enemy",n.e,"points",m,"leg",n.r,"gold",n.y,"slot",n.z,"reason",n.c,"order",n.Q],t.N,t.X)}}
A.P.prototype={
B(){var s,r,q,p=this,o=t.d,n=A.c([],o)
for(s=p.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)n.push(s[q].B())
o=A.c([],o)
for(s=p.d,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)o.push(s[q].B())
return A.N(["reason",p.a,"actions",n,"deps",p.c,"tasks",o,"floor",p.e,"emergency",p.f],t.N,t.X)}}
A.cB.prototype={
B(){var s,r,q,p=this,o=A.c([],t.d)
for(s=p.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)o.push(s[q].B())
return A.N(["phase",p.a,"target",p.b,"gold",p.c,"heroes",p.d,"groups",o,"notes",p.f,"limited",p.r,"assessments",p.w,"routeSteps",p.x,"expansions",p.y],t.N,t.X)}}
A.dQ.prototype={
B(){var s,r,q,p=this,o=p.x.B(),n=A.c([],t.d)
for(s=p.y,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)n.push(s[q].B())
return A.N(["protocol",1,"session",p.a,"id",p.d,"rules",p.b,"map",p.c,"observation",o,"deadline",p.e,"tasks",n,"seed",p.f,"priority",p.r,"idle",p.w],t.N,t.X)}}
A.dP.prototype={
B(){var s=this
return A.N(["protocol",1,"session",s.a,"id",s.d,"country",s.e,"rules",s.b,"map",s.c,"tick",s.f,"deadline",s.r,"plan",s.x.B(),"micros",s.w,"error",s.y],t.N,t.X)}}
A.bs.prototype={}
A.dR.prototype={
a9(b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=b1.a,a7=b1.b,a8=A.q(b0.a)+","+A.q(b0.b)+":"+A.q(a6)+","+A.q(a7),a9=a5.d
if(a9.Z(a8)){a6=a9.i(0,a8)
a6.toString
return a6}for(s=a5.a,r=s.b,q=s.c,p=r+q+8,o=r-1,--q,n=a5.b,m=n.b,n=n.d,s=s.d,l=s.length,k=n.length,j=a5.c,i=b0,h=0,g=0;g<p;++g){f=i.G(b1)
if(f<1e-7){if(a9.a>=256){e=new A.aa(a9,A.r(a9).h("aa<1>")).gt(0)
if(!e.j())A.cp(A.av())
a9.a7(0,e.gl())}a9.u(0,a8,h)
return h}if(!j.cH())return 1/0
d=i.a
c=(a6-d)/f
b=i.b
a=(a7-b)/f
a0=B.c.v(B.b.T((d+c*1e-7)/16),0,o)
a1=B.c.v(B.b.T((b+a*1e-7)/16),0,q)
a2=new A.dS()
a3=a2.$3(d,c,a0)
a2=a2.$3(b,a,a1)
a4=Math.min(f,Math.min(A.iO(a3),A.iO(a2)))
a2=m.i(0,"marchSpeed")
a2.toString
a3=a1*r+a0
if(!(a3>=0&&a3<l))return A.k(s,a3)
a3=s[a3]
if(!(a3<k))return A.k(n,a3)
h+=a4/(a2*n[a3])
i=new A.Q(d+c*a4,b+a*a4)}return 1/0},
ah(a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=b0.M(a8.c),a5=a8.as,a6=(a5===B.f||a5===B.d)&&a4!=null?a4.r.bu(a4.f,a9):a8.z,a7=b2==null?a9:b2.r.bo(a6,a9)
a5=this.a
if(!a5.q(0,a7))return B.o
s=new A.dT(b0,a8,b2)
r=new A.dV(this,b0,a8)
q=t.Z
p=A.c([A.c([a7],q)],t.a5)
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
e=new A.Q(l-k*f,i+o*f)
if(a5.q(0,e))B.a.k(p,A.c([e,a7],q))}}for(a5=p.length,d=null,g=0;g<p.length;p.length===a5||(0,A.v)(p),++g){c=p[g]
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
c.length===q||(0,A.v)(c);++a2
a=a3}q=!0
if(b)if(isFinite(a0))q=b1&&a1
if(q)continue
if(d==null||a0<d.b)d=new A.bs(c,a0,!0)}return d==null?B.O:d},
bD(a,b,c,d){return this.ah(a,b,c,!1,d)},
cL(a,b,c){return this.ah(a,b,c,!1,null)}}
A.dS.prototype={
$3(a,b,c){var s
if(Math.abs(b)<1e-12)s=1/0
else s=Math.max(1e-8,((b>0?c+1:c)*16-a)/b)
return s},
$S:47}
A.dT.prototype={
$2(a,b){return B.a.W(this.a.d,new A.dU(this.b,this.c,a,b))},
$S:23}
A.dU.prototype={
$1(a){var s,r=this
t.q.a(a)
if(a.b!==r.a.b){s=r.b
s=s==null?null:s.a
s=a.a!==s&&a.r.bx(r.c,r.d)!=null}else s=!1
return s},
$S:2}
A.dV.prototype={
$2(a,b){return B.a.W(this.b.e,new A.dW(this.a,this.c,b,a))},
$S:23}
A.dW.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this
t.r.a(a)
if(a.b!==j.b.b){s=a.as
s=s===B.f||s===B.d||a.fy||a.f<=0}else s=!0
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
l=B.b.v(((k.a-q)*p+(k.b-o)*n)/m,0,1)}s=r.an(s,l).G(a.z)
r=j.a.b.b.i(0,"encounterDistance")
r.toString
return s<r+12},
$S:0}
A.R.prototype={
B(){var s=this
return A.c([s.a,s.b,s.c,s.d,s.e,s.f,s.r],t.Q)}}
A.dX.prototype={
B(){var s,r,q,p=this,o=A.c([],t.eG)
for(s=p.f.gb1(),s=s.gt(s),r=t.Q;s.j();){q=s.gl()
o.push(A.c([q.a,q.b,q.c,q.d,q.e,q.f,q.r],r))}return A.N(["version",p.a,"values",p.b,"upgrades",p.c,"movement",p.d,"field",p.e,"weapons",o,"tuning",p.r.B()],t.N,t.X)}}
A.dE.prototype={
aR(a){var s=this.d,r=this.b
r=B.c.v(B.b.T(a.b/16),0,this.c-1)*r+B.c.v(B.b.T(a.a/16),0,r-1)
if(!(r>=0&&r<s.length))return A.k(s,r)
return s[r]},
q(a,b){var s,r=b.a
if(isFinite(r)){s=b.b
r=isFinite(s)&&r>=0&&s>=0&&r<this.b*16&&s<this.c*16}else r=!1
return r},
B(){var s=this
return A.N(["version",s.a,"width",s.b,"height",s.c,"terrain",s.d],t.N,t.X)}}
A.dZ.prototype={
cC(a){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=t.d1.a(B.i.cl(a,null))
switch(J.aQ(s,"kind")){case"init":if(!J.af(J.aQ(s,"protocol"),1)||!J.af(J.aQ(s,"build"),"d45078fc"))throw A.e(B.a0);++i.f
i.e=null
p=i.r
if(p.a>0){p.b=p.c=p.d=p.e=p.f=null
p.a=0
p.aE()}p=t.f
o=t.N
n=t.z
i.c=A.jo(A.aq(p.a(J.aQ(s,"rules")),o,n))
n=A.aq(p.a(J.aQ(s,"map")),o,n)
p=A.D(n.i(0,"version"))
m=A.d(n.i(0,"width"))
l=A.d(n.i(0,"height"))
n=A.bP(t.R.a(n.i(0,"terrain")),!0,t.S)
k=new Uint8Array(A.kA(n))
if(m<=0||l<=0||n.length!==m*l)A.cp(B.a2)
i.d=new A.dE(p,m,l,k)
i.a.$1(B.i.ac(t.G.a(A.N(["kind","ready","rules",i.c.a,"map",p,"backend",i.b],o,t.X)),null))
break
case"cancel":p=i.e
o=J.aQ(s,"id")
if(p==null?o==null:p===o)i.r.k(0,A.d(J.aQ(s,"id")))
break
case"plan":if(i.c==null||i.d==null||i.e!=null){p=A.ij("AI \u5c1a\u672a\u5c31\u7eea\u6216\u5df2\u6709\u8bf7\u6c42\u6267\u884c\u4e2d")
throw A.e(p)}r=A.jm(A.aq(t.f.a(J.aQ(s,"request")),t.N,t.z))
i.e=r.d
i.aw(r,i.f)
break
default:throw A.e(B.a1)}}catch(j){q=A.aD(j)
i.a.$1(B.i.ac(t.G.a(A.N(["kind","error","message",J.b6(q)],t.N,t.X)),null))}},
aw(a,b){return this.c4(a,b)},
c4(a3,a4){var s=0,r=A.kV(t.p),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
var $async$aw=A.l9(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:a1=new A.fF()
$.i0()
a1.b3()
m=a1
p=4
i=n.c
i.toString
h=n.d
h.toString
g=new A.dY(i.r)
f=new A.e5(i,h,a3,g,A.X(t.S,t.c))
e=t.N
h=new A.dR(h,i,g,A.X(e,t.i))
f.e=h
f.f=new A.e1(i,g,A.X(e,t.cM))
f.r=new A.fp(a3,i,h)
l=f
k=0
i=l.b4(),h=i.$ti,i=new A.aB(i.a(),h.h("aB<1>")),h=h.c,g=n.r,d=a3.d,c=t.p
case 7:if(!i.j()){s=8
break}b=i.b
if(b==null)h.a(b)
if(a4!==n.f||g.q(0,d)){if(a4===n.f){n.e=null
g.a7(0,d)
n.a.$1(B.i.ac(t.G.a(A.N(["kind","cancelled","id",d],e,t.X)),null))}s=1
break}b=k
if(typeof b!=="number"){q=b.cQ()
s=1
break}a=b+1
k=a
s=a>=n.c.r.ax?9:10
break
case 9:k=0
b=m
if(b.b==null)b.b=$.fD.$0()
s=11
return A.ks(A.jB(B.y,c),$async$aw)
case 11:m.b3()
case 10:s=7
break
case 8:if(a4!==n.f){s=1
break}if(g.a7(0,d)){n.e=null
n.a.$1(B.i.ac(t.G.a(A.N(["kind","cancelled","id",d],e,t.X)),null))
s=1
break}n.e=null
i=l.w
i.toString
n.a.$1(B.i.ac(t.G.a(A.N(["kind","reply","reply",A.i3(a3,i,null,m.gbw()).B()],e,t.X)),null))
p=2
s=6
break
case 4:p=3
a2=o.pop()
j=A.aD(a2)
if(a4!==n.f){s=1
break}n.e=null
i=A.c(["\u89c4\u5212\u5931\u8d25\uff0c\u4e3b\u73af\u5883\u4fdd\u7559\u6709\u9650\u5b89\u5168\u4fdd\u62a4"],t.s)
h=m.gbw()
n.a.$1(B.i.ac(t.G.a(A.N(["kind","reply","reply",A.i3(a3,new A.cB("preparing",null,0,1,B.aa,i,!1,0,0,0),J.b6(j),h).B()],t.N,t.X)),null))
s=6
break
case 3:s=2
break
case 6:case 1:return A.ku(q,r)
case 2:return A.kt(o.at(-1),r)}})
return A.kv($async$aw,r)}}
A.W.prototype={}
A.ao.prototype={
ga4(){var s,r=this.a
if(r.ax!=null)r=r.db
else{r=this.d
if(r.length===0)r=1/0
else{s=A.j(r)
s=new A.T(r,s.h("h(1)").a(new A.e0()),s.h("T<1,h>")).V(0,B.q)
r=s}}return r}}
A.e0.prototype={
$1(a){return t.O.a(a).b},
$S:49}
A.fH.prototype={
cF(c1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6=this,b7="marchSpeed",b8=b6.a,b9=b8.E(c1.a),c0=A.c([],t.D)
for(s=b8.e,r=s.length,q=b6.b,p=q.r.b,o=c1.r,n=c1.f,m=b6.c,l=n.a,k=n.b,q=q.b,j=c1.ch,i=c1.b,h=m.c,g=0;g<r;++g){f=s[g]
if(f.b!==i){e=f.as
e=e===B.f||e===B.d||f.f<=0}else e=!0
if(e)continue
if(f.a===j){B.a.k(c0,new A.W(f,0))
continue}if(f.fy)continue
e=f.z
d=e.G(n)
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
if(o.ap(a2).G(a2)>48)continue}a3=o.bo(e,n)
a4=m.a9(e,a3)
if(!isFinite(a4)&&h.e){e=e.G(a3)
c=q.i(0,b7)
c.toString
a4=e/c}if(a4>p||!isFinite(a4))continue
B.a.k(c0,new A.W(f,a4))}B.a.H(c0,new A.fI())
r=A.j(b9)
p=t.r
a5=A.fc(new A.f(b9,r.h("i(1)").a(new A.fJ(c1)),r.h("f<1>")),p)
o=A.c([],t.e)
if(a5!=null)o.push(a5)
r=r.h("a3<1>")
B.a.A(o,new A.a3(b9,r).bN(0,r.h("i(m.E)").a(new A.fK(a5))))
r=t.S
a6=A.ac(o,0,A.a7(c1.gae(),"count",r),p).a8(0)
a7=A.X(t.N,r)
a8=B.a.am(b8.f,new A.fL(c1)).c
for(b8=a6.length,g=0;r=a6.length,g<r;a6.length===b8||(0,A.v)(a6),++g){a9=a6[g]
if(a9.as===B.d)b0=0
else{r=q.i(0,"soldierLimit")
r.toString
b0=Math.min(a8,B.b.p(r)-a9.gO())}a8-=b0
a7.u(0,a9.a,a9.gO()+b0)}b8=c0.length
b1=null
if(b8!==0&&r!==0)for(r=c1.ax,q=c1.ay,p=r==null,o=b6.d,n=c1.d,b2=0;b2<a6.length;++b2,b8=l){b3=a6[b2]
for(m=b3.a,b4=null,g=0;l=c0.length,g<l;c0.length===b8||(0,A.v)(c0),++g){l=c0[g].a
b5=o.bs(b3,l,l.ok,Math.max(1,(p?n:B.c.v(r-q,0,5))-b2),!1,a7.i(0,m))
if(b4==null||b5.b<b4.b)b4=b5}if(b1==null||b4.b>b1.b)b1=b4}b8=A.j(s)
return new A.ao(c1,c0,b1,new A.f(s,b8.h("i(1)").a(new A.fM(c1)),b8.h("f<1>")).F(0,0,new A.fN(),t.i))}}
A.fI.prototype={
$2(a,b){var s,r=t.O
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.l.D(a.a.a,b.a.a):B.b.D(r,s)},
$S:50}
A.fJ.prototype={
$1(a){return t.r.a(a).a===this.a.CW},
$S:0}
A.fK.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fL.prototype={
$1(a){return t.u.a(a).a===this.a.b},
$S:6}
A.fM.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=!1
if(a.b===s.b)if(a.c===s.a){s=a.as
s=!(s===B.f||s===B.d)&&!a.fy}else s=r
else s=r
return s},
$S:0}
A.fN.prototype={
$2(a,b){return A.as(a)+A.a8(t.r.a(b))},
$S:20}
A.dY.prototype={
X(){var s=this,r=s.b
if(r>=s.a.w){s.e=!0
return!1}s.b=r+1
return!0},
cc(){var s=this,r=s.c
if(r>=s.a.x){s.e=!0
return!1}s.c=r+1
return!0},
cH(){var s=this,r=s.d
if(r>=s.a.y){s.e=!0
return!1}s.d=r+1
return!0}}
A.hw.prototype={
$1(a){A.D(a)
return A.hi(v.G.self).postMessage(a)},
$S:51}
A.hx.prototype={
$1(a){return this.a.cC(A.D(A.hi(a).data))},
$S:52};(function aliases(){var s=J.aG.prototype
s.bO=s.n
s=A.b.prototype
s.bN=s.cN})();(function installTearOffs(){var s=hunkHelpers._static_0,r=hunkHelpers._static_1,q=hunkHelpers.installStaticTearOff
s(A,"kU","jM",4)
r(A,"lb","k_",8)
r(A,"lc","k0",8)
r(A,"ld","k1",8)
s(A,"iN","l4",1)
r(A,"lf","ky",15)
q(A,"lw",2,null,["$1$2","$2"],["iV",function(a,b){return A.iV(a,b,t.H)}],21,0)
q(A,"lv",2,null,["$1$2","$2"],["iU",function(a,b){return A.iU(a,b,t.H)}],21,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.u,null)
q(A.u,[A.hE,J.cG,A.bY,J.aS,A.z,A.fE,A.b,A.y,A.bQ,A.H,A.bC,A.aX,A.bz,A.c5,A.a_,A.aA,A.ba,A.bu,A.c6,A.Z,A.fO,A.fo,A.bA,A.cc,A.B,A.fi,A.bM,A.bN,A.bL,A.ai,A.d7,A.hf,A.hd,A.d4,A.aB,A.ah,A.aY,A.O,A.d5,A.dc,A.ci,A.be,A.da,A.b0,A.A,A.ch,A.cy,A.cA,A.h8,A.cC,A.fU,A.cV,A.bZ,A.fV,A.at,A.a1,A.a2,A.dd,A.fF,A.bf,A.aJ,A.e_,A.cr,A.bt,A.e1,A.cs,A.aj,A.e5,A.ap,A.eI,A.Q,A.dN,A.o,A.a5,A.aR,A.dF,A.cX,A.fp,A.K,A.a6,A.P,A.cB,A.dQ,A.dP,A.bs,A.dR,A.R,A.dX,A.dE,A.dZ,A.W,A.ao,A.fH,A.dY])
q(J.cG,[J.cI,J.bE,J.bH,J.bG,J.bI,J.bF,J.b9])
q(J.bH,[J.aG,J.p,A.bb,A.bT])
q(J.aG,[J.cW,J.c0,J.aF])
r(J.cH,A.bY)
r(J.fd,J.p)
q(J.bF,[J.bD,J.cJ])
q(A.z,[A.bK,A.ay,A.cK,A.d3,A.d_,A.d6,A.bJ,A.cu,A.an,A.c2,A.d2,A.c_,A.cz])
q(A.b,[A.l,A.aV,A.f,A.bB,A.aW,A.c4,A.b_,A.ar])
q(A.l,[A.m,A.aa,A.ab,A.aU])
q(A.m,[A.J,A.T,A.a3,A.d9])
r(A.bx,A.aV)
r(A.by,A.aW)
q(A.aA,[A.bg,A.bh])
r(A.bi,A.bg)
r(A.bj,A.bh)
r(A.bl,A.ba)
r(A.c1,A.bl)
r(A.bv,A.c1)
r(A.bw,A.bu)
q(A.Z,[A.cF,A.cw,A.cx,A.d1,A.hs,A.hu,A.fR,A.fQ,A.hj,A.h4,A.fl,A.dB,A.dp,A.dq,A.dr,A.dt,A.dw,A.dz,A.dm,A.dx,A.dC,A.ei,A.ej,A.eC,A.eD,A.eE,A.eF,A.eH,A.em,A.en,A.ep,A.er,A.eu,A.ey,A.eA,A.ec,A.ed,A.eb,A.e7,A.ea,A.e6,A.ee,A.ef,A.eg,A.eP,A.eR,A.f4,A.f5,A.f7,A.f9,A.eS,A.eU,A.eW,A.eY,A.f_,A.f3,A.eM,A.eO,A.eK,A.dl,A.dL,A.dM,A.dI,A.dH,A.dK,A.dG,A.fs,A.fu,A.fw,A.fx,A.fy,A.fz,A.fq,A.fr,A.dS,A.dU,A.dW,A.e0,A.fJ,A.fK,A.fL,A.fM,A.hw,A.hx])
r(A.aT,A.cF)
q(A.cw,[A.fB,A.fS,A.fT,A.he,A.fb,A.fW,A.h0,A.h_,A.fY,A.fX,A.h3,A.h2,A.h1,A.hc,A.hm,A.dA,A.dn,A.dy,A.dD,A.eo,A.ew,A.fA])
r(A.bV,A.ay)
q(A.d1,[A.d0,A.b7])
q(A.B,[A.aw,A.d8])
q(A.cx,[A.fe,A.ht,A.hk,A.hn,A.h5,A.fj,A.fn,A.h9,A.ds,A.du,A.dv,A.e2,A.e3,A.hr,A.ek,A.ev,A.eB,A.eG,A.el,A.eq,A.es,A.et,A.ex,A.ez,A.e8,A.e9,A.eh,A.eQ,A.f1,A.f6,A.f8,A.fa,A.eT,A.eV,A.eX,A.eZ,A.f0,A.f2,A.eN,A.eJ,A.eL,A.dk,A.dJ,A.ft,A.fv,A.dT,A.dV,A.fI,A.fN])
q(A.bT,[A.cM,A.bc])
q(A.bc,[A.c7,A.c9])
r(A.c8,A.c7)
r(A.bR,A.c8)
r(A.ca,A.c9)
r(A.bS,A.ca)
q(A.bR,[A.cN,A.cO])
q(A.bS,[A.cP,A.cQ,A.cR,A.cS,A.cT,A.bU,A.cU])
r(A.bk,A.d6)
r(A.db,A.ci)
r(A.cb,A.be)
r(A.aK,A.cb)
r(A.cL,A.bJ)
r(A.ff,A.cy)
q(A.cA,[A.fh,A.fg])
r(A.h7,A.h8)
q(A.an,[A.bW,A.cE])
q(A.fU,[A.b8,A.ag,A.am])
s(A.c7,A.A)
s(A.c8,A.a_)
s(A.c9,A.A)
s(A.ca,A.a_)
s(A.bl,A.ch)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{a:"int",h:"double",V:"num",F:"String",i:"bool",a2:"Null",n:"List",u:"Object",a0:"Map",G:"JSObject"},mangledNames:{},types:["i(o)","~()","i(a5)","a(o,o)","a()","a(a)","i(aR)","o(o,o)","~(~())","i(h)","h(V,h)","a(a,P)","a(a5,a5)","o(W)","i(R)","@(@)","a2(@)","a2()","~(u?,u?)","i(a6)","h(h,o)","0^(0^,0^)<V>","i(n<a>)","i(Q,Q)","a(a,aJ)","a(ao,ao)","a2(~())","a(aj,aj)","i(a)","@(F)","a(a,o)","@(@,F)","a(a,a)","i(W)","h(o)","a(a,a5)","~(@)","h(h,a6)","a2(@,aI)","~(a,@)","h(V,o)","o?(K)","h(h,F)","a2(u,aI)","a(R,R)","R(R,R)","V(V,a)","h(h,h,a)","~(@,@)","h(W)","a(W,W)","~(F)","~(G)","i(ao)","n<a6>(P)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"3;":(a,b,c)=>d=>d instanceof A.bi&&a.b(d.a)&&b.b(d.b)&&c.b(d.c),"4;high,low,selfHigh,selfLow":a=>b=>b instanceof A.bj&&A.lx(a,b.a)}}
A.kl(v.typeUniverse,JSON.parse('{"aF":"aG","cW":"aG","c0":"aG","lF":"bb","cI":{"i":[],"w":[]},"bE":{"w":[]},"bH":{"G":[]},"aG":{"G":[]},"p":{"n":["1"],"l":["1"],"G":[],"b":["1"]},"cH":{"bY":[]},"fd":{"p":["1"],"n":["1"],"l":["1"],"G":[],"b":["1"]},"aS":{"C":["1"]},"bF":{"h":[],"V":[]},"bD":{"h":[],"a":[],"V":[],"w":[]},"cJ":{"h":[],"V":[],"w":[]},"b9":{"F":[],"w":[]},"bK":{"z":[]},"l":{"b":["1"]},"m":{"l":["1"],"b":["1"]},"J":{"m":["1"],"l":["1"],"b":["1"],"b.E":"1","m.E":"1"},"y":{"C":["1"]},"aV":{"b":["2"],"b.E":"2"},"bx":{"aV":["1","2"],"l":["2"],"b":["2"],"b.E":"2"},"bQ":{"C":["2"]},"T":{"m":["2"],"l":["2"],"b":["2"],"b.E":"2","m.E":"2"},"f":{"b":["1"],"b.E":"1"},"H":{"C":["1"]},"bB":{"b":["2"],"b.E":"2"},"bC":{"C":["2"]},"aW":{"b":["1"],"b.E":"1"},"by":{"aW":["1"],"l":["1"],"b":["1"],"b.E":"1"},"aX":{"C":["1"]},"bz":{"C":["1"]},"c4":{"b":["1"],"b.E":"1"},"c5":{"C":["1"]},"a3":{"m":["1"],"l":["1"],"b":["1"],"b.E":"1","m.E":"1"},"bi":{"bg":[],"aA":[]},"bj":{"bh":[],"aA":[]},"bv":{"c1":["1","2"],"bl":["1","2"],"ba":["1","2"],"ch":["1","2"],"a0":["1","2"]},"bu":{"a0":["1","2"]},"bw":{"bu":["1","2"],"a0":["1","2"]},"b_":{"b":["1"],"b.E":"1"},"c6":{"C":["1"]},"cF":{"Z":[],"au":[]},"aT":{"Z":[],"au":[]},"bV":{"ay":[],"z":[]},"cK":{"z":[]},"d3":{"z":[]},"cc":{"aI":[]},"Z":{"au":[]},"cw":{"Z":[],"au":[]},"cx":{"Z":[],"au":[]},"d1":{"Z":[],"au":[]},"d0":{"Z":[],"au":[]},"b7":{"Z":[],"au":[]},"d_":{"z":[]},"aw":{"B":["1","2"],"ic":["1","2"],"a0":["1","2"],"B.K":"1","B.V":"2"},"aa":{"l":["1"],"b":["1"],"b.E":"1"},"bM":{"C":["1"]},"ab":{"l":["1"],"b":["1"],"b.E":"1"},"bN":{"C":["1"]},"aU":{"l":["a1<1,2>"],"b":["a1<1,2>"],"b.E":"a1<1,2>"},"bL":{"C":["a1<1,2>"]},"bg":{"aA":[]},"bh":{"aA":[]},"bb":{"G":[],"w":[]},"bT":{"G":[]},"cM":{"G":[],"w":[]},"bc":{"a9":["1"],"G":[]},"bR":{"A":["h"],"n":["h"],"a9":["h"],"l":["h"],"G":[],"b":["h"],"a_":["h"]},"bS":{"A":["a"],"n":["a"],"a9":["a"],"l":["a"],"G":[],"b":["a"],"a_":["a"]},"cN":{"A":["h"],"n":["h"],"a9":["h"],"l":["h"],"G":[],"b":["h"],"a_":["h"],"w":[],"A.E":"h"},"cO":{"A":["h"],"n":["h"],"a9":["h"],"l":["h"],"G":[],"b":["h"],"a_":["h"],"w":[],"A.E":"h"},"cP":{"A":["a"],"n":["a"],"a9":["a"],"l":["a"],"G":[],"b":["a"],"a_":["a"],"w":[],"A.E":"a"},"cQ":{"A":["a"],"n":["a"],"a9":["a"],"l":["a"],"G":[],"b":["a"],"a_":["a"],"w":[],"A.E":"a"},"cR":{"A":["a"],"n":["a"],"a9":["a"],"l":["a"],"G":[],"b":["a"],"a_":["a"],"w":[],"A.E":"a"},"cS":{"A":["a"],"n":["a"],"a9":["a"],"l":["a"],"G":[],"b":["a"],"a_":["a"],"w":[],"A.E":"a"},"cT":{"A":["a"],"n":["a"],"a9":["a"],"l":["a"],"G":[],"b":["a"],"a_":["a"],"w":[],"A.E":"a"},"bU":{"A":["a"],"n":["a"],"a9":["a"],"l":["a"],"G":[],"b":["a"],"a_":["a"],"w":[],"A.E":"a"},"cU":{"hL":[],"A":["a"],"n":["a"],"a9":["a"],"l":["a"],"G":[],"b":["a"],"a_":["a"],"w":[],"A.E":"a"},"d6":{"z":[]},"bk":{"ay":[],"z":[]},"aB":{"C":["1"]},"ar":{"b":["1"],"b.E":"1"},"ah":{"z":[]},"O":{"aE":["1"]},"ci":{"io":[]},"db":{"ci":[],"io":[]},"aK":{"be":["1"],"ie":["1"],"hJ":["1"],"l":["1"],"b":["1"]},"b0":{"C":["1"]},"B":{"a0":["1","2"]},"ba":{"a0":["1","2"]},"c1":{"bl":["1","2"],"ba":["1","2"],"ch":["1","2"],"a0":["1","2"]},"be":{"hJ":["1"],"l":["1"],"b":["1"]},"cb":{"be":["1"],"hJ":["1"],"l":["1"],"b":["1"]},"d8":{"B":["F","@"],"a0":["F","@"],"B.K":"F","B.V":"@"},"d9":{"m":["F"],"l":["F"],"b":["F"],"b.E":"F","m.E":"F"},"bJ":{"z":[]},"cL":{"z":[]},"h":{"V":[]},"a":{"V":[]},"n":{"l":["1"],"b":["1"]},"cu":{"z":[]},"ay":{"z":[]},"an":{"z":[]},"bW":{"z":[]},"cE":{"z":[]},"c2":{"z":[]},"d2":{"z":[]},"c_":{"z":[]},"cz":{"z":[]},"cV":{"z":[]},"bZ":{"z":[]},"dd":{"aI":[]},"bf":{"jT":[]},"jE":{"n":["a"],"l":["a"],"b":["a"]},"hL":{"n":["a"],"l":["a"],"b":["a"]},"jY":{"n":["a"],"l":["a"],"b":["a"]},"jC":{"n":["a"],"l":["a"],"b":["a"]},"jW":{"n":["a"],"l":["a"],"b":["a"]},"jD":{"n":["a"],"l":["a"],"b":["a"]},"jX":{"n":["a"],"l":["a"],"b":["a"]},"jz":{"n":["h"],"l":["h"],"b":["h"]},"jA":{"n":["h"],"l":["h"],"b":["h"]}}'))
A.kk(v.typeUniverse,JSON.parse('{"l":1,"bc":1,"cb":1,"cy":2,"cA":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.dh
return{v:s("K"),q:s("a5"),I:s("P"),u:s("aR"),r:s("o"),o:s("R"),J:s("a6"),t:s("ah"),c:s("ao"),cM:s("bt"),U:s("l<@>"),V:s("z"),bo:s("bB<P,a6>"),h:s("au"),O:s("W"),E:s("aT<h>"),fy:s("b<a5>"),ef:s("b<o>"),er:s("b<a6>(P)"),R:s("b<@>"),w:s("p<K>"),Y:s("p<a5>"),a:s("p<P>"),eu:s("p<aR>"),e:s("p<o>"),Z:s("p<Q>"),W:s("p<R>"),m:s("p<a6>"),D:s("p<W>"),a5:s("p<n<Q>>"),eG:s("p<n<u>>"),b:s("p<n<h>>"),x:s("p<n<a>>"),d:s("p<a0<F,u?>>"),Q:s("p<u>"),dT:s("p<+(cr,n<K>,n<o>)>"),s:s("p<F>"),aD:s("p<aJ>"),bQ:s("p<aj>"),n:s("p<h>"),k:s("p<@>"),dC:s("p<a>"),T:s("bE"),A:s("G"),cj:s("aF"),aU:s("a9<@>"),f3:s("n<K>"),j:s("n<@>"),L:s("n<a>"),d1:s("a0<F,@>"),f:s("a0<@,@>"),G:s("a0<F,u?>"),P:s("a2"),K:s("u"),gT:s("lG"),bY:s("+()"),l:s("aI"),N:s("F"),aQ:s("J<aj>"),gf:s("aJ"),dm:s("w"),eK:s("ay"),ak:s("c0"),eq:s("f<h>"),gn:s("c4<o>"),_:s("O<@>"),dp:s("aj"),eV:s("ar<ap>"),gL:s("ar<a>"),y:s("i"),al:s("i(u)"),db:s("i(h)"),i:s("h"),z:s("@"),fO:s("@()"),B:s("@(u)"),C:s("@(u,aI)"),S:s("a"),eH:s("aE<a2>?"),an:s("G?"),bM:s("n<@>?"),eg:s("n<a>?"),X:s("u?"),dk:s("F?"),F:s("aY<@,@>?"),g:s("da?"),fQ:s("i?"),cD:s("h?"),h6:s("a?"),cg:s("V?"),H:s("V"),p:s("~"),M:s("~()"),cA:s("~(F,@)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.a5=J.cG.prototype
B.a=J.p.prototype
B.c=J.bD.prototype
B.b=J.bF.prototype
B.l=J.b9.prototype
B.a6=J.aF.prototype
B.a7=J.bH.prototype
B.E=J.cW.prototype
B.t=J.c0.prototype
B.p=new A.am(0,"upgrade")
B.u=new A.am(1,"dismiss")
B.F=new A.am(2,"recruit")
B.v=new A.am(3,"soldiers")
B.G=new A.am(4,"buyWeapon")
B.H=new A.am(5,"dispatch")
B.I=new A.am(6,"move")
B.J=new A.am(8,"retreat")
B.f=new A.ag(0,"garrison")
B.n=new A.ag(2,"camped")
B.d=new A.ag(5,"defending")
B.w=new A.ag(7,"retreating")
B.D=s([],t.Z)
B.o=new A.bs(B.D,1/0,!1)
B.O=new A.bs(B.D,1/0,!1)
B.an=new A.cs(5,24,6,1.5,10,3,1,96,160,6000,8,24,4,6,8,0.12,0.35,0.05,2500,2,60)
B.x=new A.aT(A.lv(),t.E)
B.q=new A.aT(A.lw(),t.E)
B.y=new A.cC()
B.P=new A.bz(A.dh("bz<0&>"))
B.z=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.Q=function() {
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
B.V=function(getTagFallback) {
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
B.R=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.U=function(hooks) {
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
B.T=function(hooks) {
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
B.S=function(hooks) {
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
B.A=function(hooks) { return hooks; }

B.i=new A.ff()
B.W=new A.cV()
B.k=new A.fE()
B.j=new A.db()
B.X=new A.dd()
B.h=new A.b8(0,"favorable")
B.Y=new A.b8(1,"close")
B.r=new A.b8(2,"unfavorable")
B.B=new A.b8(3,"unknown")
B.ao=s(["\u9759\u6001\u8bc4\u4f30\u914d\u989d\u8017\u5c3d"],t.s)
B.Z=new A.bt(B.B,-1,1,0,0,!1)
B.a_=new A.at("AI \u534f\u8bae\u7248\u672c\u4e0d\u5339\u914d")
B.a0=new A.at("AI \u6784\u5efa\u7248\u672c\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u751f\u6210 Worker")
B.a1=new A.at("\u672a\u77e5 AI \u5de5\u4f5c\u547d\u4ee4")
B.a2=new A.at("AI \u5730\u56fe\u5c3a\u5bf8\u65e0\u6548")
B.a3=new A.at("\u56fd\u5bb6\u89c4\u5212\u9759\u6001\u7248\u672c\u4e0d\u5339\u914d")
B.a4=new A.at("\u56fd\u5bb6\u89c2\u5bdf\u8d85\u51fa\u534f\u8bae\u5bb9\u91cf")
B.a8=new A.fg(null)
B.a9=new A.fh(null)
B.K=new A.ag(1,"marching")
B.L=new A.ag(3,"queue")
B.M=new A.ag(4,"attacking")
B.N=new A.ag(6,"field")
B.C=s([B.f,B.K,B.n,B.L,B.M,B.d,B.N,B.w],A.dh("p<ag>"))
B.aa=s([],t.a)
B.ap=s([],t.W)
B.m=s([],t.m)
B.e=s([],t.dC)
B.ab=A.al("lB")
B.ac=A.al("lC")
B.ad=A.al("jz")
B.ae=A.al("jA")
B.af=A.al("jC")
B.ag=A.al("jD")
B.ah=A.al("jE")
B.ai=A.al("u")
B.aj=A.al("jW")
B.ak=A.al("jX")
B.al=A.al("jY")
B.am=A.al("hL")})();(function staticFields(){$.h6=null
$.ad=A.c([],t.Q)
$.ig=null
$.fC=0
$.fD=A.kU()
$.i6=null
$.i5=null
$.iR=null
$.iM=null
$.iY=null
$.hp=null
$.hv=null
$.hX=null
$.hb=A.c([],A.dh("p<n<u>?>"))
$.bm=null
$.cl=null
$.cm=null
$.hR=!1
$.I=B.j})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"lE","j0",()=>A.hq("_$dart_dartClosure"))
s($,"lD","i_",()=>A.hq("_$dart_dartClosure_dartJSInterop"))
s($,"lV","jb",()=>A.c([new J.cH()],A.dh("p<bY>")))
s($,"lJ","j1",()=>A.az(A.fP({
toString:function(){return"$receiver$"}})))
s($,"lK","j2",()=>A.az(A.fP({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"lL","j3",()=>A.az(A.fP(null)))
s($,"lM","j4",()=>A.az(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"lP","j7",()=>A.az(A.fP(void 0)))
s($,"lQ","j8",()=>A.az(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"lO","j6",()=>A.az(A.il(null)))
s($,"lN","j5",()=>A.az(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"lS","ja",()=>A.az(A.il(void 0)))
s($,"lR","j9",()=>A.az(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"lT","i1",()=>A.jZ())
s($,"lU","di",()=>A.iW(B.ai))
s($,"lH","i0",()=>{A.jO()
return $.fC})})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.bb,SharedArrayBuffer:A.bb,ArrayBufferView:A.bT,DataView:A.cM,Float32Array:A.cN,Float64Array:A.cO,Int16Array:A.cP,Int32Array:A.cQ,Int8Array:A.cR,Uint16Array:A.cS,Uint32Array:A.cT,Uint8ClampedArray:A.bU,CanvasPixelArray:A.bU,Uint8Array:A.cU})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bc.$nativeSuperclassTag="ArrayBufferView"
A.c7.$nativeSuperclassTag="ArrayBufferView"
A.c8.$nativeSuperclassTag="ArrayBufferView"
A.bR.$nativeSuperclassTag="ArrayBufferView"
A.c9.$nativeSuperclassTag="ArrayBufferView"
A.ca.$nativeSuperclassTag="ArrayBufferView"
A.bS.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.lt
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()