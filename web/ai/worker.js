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
if(a[b]!==s){A.nA(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.c(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.jP(b)
return new s(c,this)}:function(){if(s===null)s=A.jP(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.jP(a).prototype
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
jU(a,b,c,d){return{i:a,p:b,e:c,x:d}},
jQ(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.jS==null){A.no()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.j(A.kj("Return interceptor for "+A.w(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.iS
if(o==null)o=$.iS=A.jf(n)
p=q[o]}if(p!=null)return p
p=A.nt(a)
if(p!=null)return p
if(typeof a=="function")return B.ab
s=Object.getPrototypeOf(a)
if(s==null)return B.N
if(s===Object.prototype)return B.N
if(typeof q=="function"){o=$.iS
if(o==null)o=$.iS=A.jf(n)
Object.defineProperty(q,o,{value:B.C,enumerable:false,writable:true,configurable:true})
return B.C}return B.C},
lF(a,b){if(a<0||a>4294967295)throw A.j(A.b9(a,0,4294967295,"length",null))
return J.lG(new Array(a),b)},
k7(a,b){if(a<0)throw A.j(A.cE("Length must be a non-negative integer: "+a,null))
return A.c(new Array(a),b.h("u<0>"))},
lG(a,b){var s=A.c(a,b.h("u<0>"))
s.$flags=1
return s},
bk(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bW.prototype
return J.cU.prototype}if(typeof a=="string")return J.b5.prototype
if(a==null)return J.bX.prototype
if(typeof a=="boolean")return J.cT.prototype
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aU.prototype
if(typeof a=="symbol")return J.c_.prototype
if(typeof a=="bigint")return J.bY.prototype
return a}if(a instanceof A.A)return a
return J.jQ(a)},
cA(a){if(typeof a=="string")return J.b5.prototype
if(a==null)return a
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aU.prototype
if(typeof a=="symbol")return J.c_.prototype
if(typeof a=="bigint")return J.bY.prototype
return a}if(a instanceof A.A)return a
return J.jQ(a)},
aE(a){if(a==null)return a
if(Array.isArray(a))return J.u.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aU.prototype
if(typeof a=="symbol")return J.c_.prototype
if(typeof a=="bigint")return J.bY.prototype
return a}if(a instanceof A.A)return a
return J.jQ(a)},
nj(a){if(typeof a=="number")return J.br.prototype
if(typeof a=="string")return J.b5.prototype
if(a==null)return a
if(!(a instanceof A.A))return J.by.prototype
return a},
af(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bk(a).a7(a,b)},
b0(a,b){if(typeof b==="number")if(Array.isArray(a)||A.ns(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.aE(a).i(a,b)},
l9(a,b){return J.aE(a).l(a,b)},
la(a,b){return J.aE(a).I(a,b)},
lb(a,b){return J.nj(a).t(a,b)},
jt(a,b){return J.aE(a).U(a,b)},
jY(a){return J.aE(a).gD(a)},
ag(a){return J.bk(a).gR(a)},
ju(a){return J.cA(a).ga_(a)},
lc(a){return J.cA(a).gaz(a)},
H(a){return J.aE(a).gC(a)},
ld(a){return J.aE(a).gaH(a)},
bn(a){return J.cA(a).gm(a)},
le(a){return J.bk(a).gS(a)},
lf(a,b){return J.aE(a).b2(a,b)},
lg(a,b){return J.aE(a).cg(a,b)},
bo(a){return J.bk(a).q(a)},
cR:function cR(){},
cT:function cT(){},
bX:function bX(){},
bZ:function bZ(){},
aV:function aV(){},
d6:function d6(){},
by:function by(){},
aU:function aU(){},
bY:function bY(){},
c_:function c_(){},
u:function u(a){this.$ti=a},
cS:function cS(){},
hc:function hc(a){this.$ti=a},
b2:function b2(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
br:function br(){},
bW:function bW(){},
cU:function cU(){},
b5:function b5(){}},A={jy:function jy(){},
lH(a){return new A.c1("Field '"+a+"' has not been initialized.")},
aL(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
ir(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
U(a,b,c){return a},
jT(a){var s,r
for(s=$.aj.length,r=0;r<s;++r)if(a===$.aj[r])return!0
return!1},
X(a,b,c,d){A.cb(b,"start")
if(c!=null){A.cb(c,"end")
if(b>c)A.cB(A.b9(b,0,c,"start",null))}return new A.x(a,b,c,d.h("x<0>"))},
lK(a,b,c,d){if(t.U.b(a))return new A.bQ(a,b,c.h("@<0>").F(d).h("bQ<1,2>"))
return new A.at(a,b,c.h("@<0>").F(d).h("at<1,2>"))},
kh(a,b,c){A.cb(b,"takeCount")
if(t.U.b(a))return new A.bR(a,b,c.h("bR<0>"))
return new A.ba(a,b,c.h("ba<0>"))},
aC(){return new A.ce("No element")},
c1:function c1(a){this.a=a},
ip:function ip(){},
p:function p(){},
k:function k(){},
x:function x(a,b,c,d){var _=this
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
at:function at(a,b,c){this.a=a
this.b=b
this.$ti=c},
bQ:function bQ(a,b,c){this.a=a
this.b=b
this.$ti=c},
c3:function c3(a,b,c){var _=this
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
Y:function Y(a,b,c){this.a=a
this.b=b
this.$ti=c},
bU:function bU(a,b,c){this.a=a
this.b=b
this.$ti=c},
bV:function bV(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
ba:function ba(a,b,c){this.a=a
this.b=b
this.$ti=c},
bR:function bR(a,b,c){this.a=a
this.b=b
this.$ti=c},
bb:function bb(a,b,c){this.a=a
this.b=b
this.$ti=c},
bS:function bS(a){this.$ti=a},
bz:function bz(a,b){this.a=a
this.$ti=b},
ch:function ch(a,b){this.a=a
this.$ti=b},
L:function L(){},
G:function G(a,b){this.a=a
this.$ti=b},
eC(a,b,c){var s,r,q,p,o,n,m,l=A.l(a),k=A.bs(new A.a8(a,l.h("a8<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.t)(k),++i,p=o){r=k[i]
c.a(a.i(0,r))
o=p+1
q[r]=p}n=A.bs(new A.a9(a,l.h("a9<2>")),!0,c)
m=new A.bO(q,n,b.h("@<0>").F(c).h("bO<1,2>"))
m.$keys=k
return m}return new A.bN(A.as(a,b,c),b.h("@<0>").F(c).h("bN<1,2>"))},
kX(a){var s=A.kW(a)
if(s!=null)return s
return"minified:"+a},
ns(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
w(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.bo(a)
return s},
d8(a){var s,r=$.kc
if(r==null)r=$.kc=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
lP(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.n(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
d9(a){var s,r,q,p
if(a instanceof A.A)return A.ad(A.az(a),null)
s=J.bk(a)
if(s===B.aa||s===B.ac||t.ak.b(a)){r=B.I(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.ad(A.az(a),null)},
kd(a){var s,r,q
if(a==null||typeof a=="number"||A.jK(a))return J.bo(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a6)return a.q(0)
if(a instanceof A.am)return a.bT(!0)
s=$.l8()
for(r=0;r<1;++r){q=s[r].dJ(a)
if(q!=null)return q}return"Instance of '"+A.d9(a)+"'"},
lM(){return Date.now()},
lO(){var s,r
if($.hN!==0)return
$.hN=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
if(!!s.dartUseDateNowForTicks)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.hN=1e6
$.hO=new A.hM(r)},
a0(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.bP(s,10)|55296)>>>0,s&1023|56320)}throw A.j(A.b9(a,0,1114111,null,null))},
lN(a){var s=a.$thrownJsError
if(s==null)return null
return A.bJ(s)},
n(a,b){if(a==null)J.bn(a)
throw A.j(A.kL(a,b))},
kL(a,b){var s,r="index"
if(!A.kB(b))return new A.aB(!0,b,r,null)
s=J.bn(a)
if(b<0||b>=s)return A.jw(b,s,a,r)
return new A.ca(null,null,!0,b,r,"Value not in range")},
n8(a){return new A.aB(!0,a,null,null)},
jc(a){return a},
j(a){return A.V(a,new Error())},
V(a,b){var s
if(a==null)a=new A.aM()
b.dartException=a
s=A.nB
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
nB(){return J.bo(this.dartException)},
cB(a,b){throw A.V(a,b==null?new Error():b)},
cC(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.cB(A.mx(a,b,c),s)},
mx(a,b,c){var s,r,q,p,o,n,m,l,k
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
t(a){throw A.j(A.a_(a))},
aN(a){var s,r,q,p,o,n
a=A.ny(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.c([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.iA(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
iB(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
ki(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
jz(a,b){var s=b==null,r=s?null:b.method
return new A.cV(a,r,s?null:b.receiver)},
aR(a){var s
if(a==null)return new A.hn(a)
if(a instanceof A.bT){s=a.a
return A.b_(a,s==null?A.cw(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.b_(a,a.dartException)
return A.n6(a)},
b_(a,b){if(t.V.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
n6(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bP(r,16)&8191)===10)switch(q){case 438:return A.b_(a,A.jz(A.w(s)+" (Error "+q+")",null))
case 445:case 5007:A.w(s)
return A.b_(a,new A.c8())}}if(a instanceof TypeError){p=$.kZ()
o=$.l_()
n=$.l0()
m=$.l1()
l=$.l4()
k=$.l5()
j=$.l3()
$.l2()
i=$.l7()
h=$.l6()
g=p.ad(s)
if(g!=null)return A.b_(a,A.jz(A.K(s),g))
else{g=o.ad(s)
if(g!=null){g.method="call"
return A.b_(a,A.jz(A.K(s),g))}else if(n.ad(s)!=null||m.ad(s)!=null||l.ad(s)!=null||k.ad(s)!=null||j.ad(s)!=null||m.ad(s)!=null||i.ad(s)!=null||h.ad(s)!=null){A.K(s)
return A.b_(a,new A.c8())}}return A.b_(a,new A.de(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.cd()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.b_(a,new A.aB(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.cd()
return a},
bJ(a){var s
if(a instanceof A.bT)return a.b
if(a==null)return new A.co(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.co(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
kS(a){if(a==null)return J.ag(a)
if(typeof a=="object")return A.d8(a)
return J.ag(a)},
nh(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.B(0,a[s],a[r])}return b},
ni(a,b){var s,r=a.length
for(s=0;s<r;++s)b.l(0,a[s])
return b},
mG(a,b,c,d,e,f){t.k.a(a)
switch(A.h(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.j(new A.iG("Unsupported number of arguments for wrapped closure"))},
ds(a,b){var s=a.$identity
if(!!s)return s
s=A.nd(a,b)
a.$identity=s
return s},
nd(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.mG)},
lu(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.db().constructor.prototype):Object.create(new A.bq(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.k5(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.lq(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.k5(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
lq(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.j("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.lo)}throw A.j("Error in functionType of tearoff")},
lr(a,b,c,d){var s=A.k4
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
k5(a,b,c,d){if(c)return A.lt(a,b,d)
return A.lr(b.length,d,a,b)},
ls(a,b,c,d){var s=A.k4,r=A.lp
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
lt(a,b,c){var s,r
if($.k2==null)$.k2=A.k1("interceptor")
if($.k3==null)$.k3=A.k1("receiver")
s=b.length
r=A.ls(s,c,a,b)
return r},
jP(a){return A.lu(a)},
lo(a,b){return A.cs(v.typeUniverse,A.az(a.a),b)},
k4(a){return a.a},
lp(a){return a.b},
k1(a){var s,r,q,p=new A.bq("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.j(A.cE("Field name "+a+" not found.",null))},
jf(a){return v.getIsolateTag(a)},
nt(a){var s,r,q,p,o,n=A.K($.kM.$1(a)),m=$.je[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jk[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bF($.kH.$2(a,n))
if(q!=null){m=$.je[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.jk[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.jn(s)
$.je[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.jk[n]=s
return s}if(p==="-"){o=A.jn(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.kU(a,s)
if(p==="*")throw A.j(A.kj(n))
if(v.leafTags[n]===true){o=A.jn(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.kU(a,s)},
kU(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.jU(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
jn(a){return J.jU(a,!1,null,!!a.$iah)},
nv(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.jn(s)
else return J.jU(s,c,null,null)},
no(){if(!0===$.jS)return
$.jS=!0
A.np()},
np(){var s,r,q,p,o,n,m,l
$.je=Object.create(null)
$.jk=Object.create(null)
A.nn()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.kV.$1(o)
if(n!=null){m=A.nv(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
nn(){var s,r,q,p,o,n,m=B.V()
m=A.bI(B.W,A.bI(B.X,A.bI(B.J,A.bI(B.J,A.bI(B.Y,A.bI(B.Z,A.bI(B.a_(B.I),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.kM=new A.jh(p)
$.kH=new A.ji(o)
$.kV=new A.jj(n)},
bI(a,b){return a(b)||b},
mb(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.n(b,s)
if(!J.af(r,b[s]))return!1}return!0},
nf(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
ny(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bj:function bj(a,b){this.a=a
this.b=b},
aX:function aX(a,b,c){this.a=a
this.b=b
this.c=c},
aO:function aO(a){this.a=a},
bC:function bC(a){this.a=a},
bN:function bN(a,b){this.a=a
this.$ti=b},
bM:function bM(){},
bO:function bO(a,b,c){this.a=a
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
b4:function b4(a,b){this.a=a
this.$ti=b},
hM:function hM(a){this.a=a},
cc:function cc(){},
iA:function iA(a,b,c,d,e,f){var _=this
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
hn:function hn(a){this.a=a},
bT:function bT(a,b){this.a=a
this.b=b},
co:function co(a){this.a=a
this.b=null},
a6:function a6(){},
cH:function cH(){},
cI:function cI(){},
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
hd:function hd(a){this.a=a},
hh:function hh(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
a8:function a8(a,b){this.a=a
this.$ti=b},
b7:function b7(a,b,c,d){var _=this
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
b6:function b6(a,b){this.a=a
this.$ti=b},
c2:function c2(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
jh:function jh(a){this.a=a},
ji:function ji(a){this.a=a},
jj:function jj(a){this.a=a},
am:function am(){},
bA:function bA(){},
bB:function bB(){},
bi:function bi(){},
my(a){return a},
bu:function bu(){},
c6:function c6(){},
cX:function cX(){},
bv:function bv(){},
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
jC(a,b){var s=b.c
return s==null?b.c=A.cq(a,"aT",[b.x]):s},
ke(a){var s=a.w
if(s===6||s===7)return A.ke(a.x)
return s===11||s===12},
lR(a){return a.as},
kT(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
cz(a){return A.j1(v.typeUniverse,a,!1)},
nr(a,b){var s,r,q,p,o
if(a==null)return null
s=b.y
r=a.Q
if(r==null)r=a.Q=new Map()
q=b.as
p=r.get(q)
if(p!=null)return p
o=A.aZ(v.typeUniverse,a.x,s,0)
r.set(q,o)
return o},
aZ(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.aZ(a1,s,a3,a4)
if(r===s)return a2
return A.ks(a1,r,!0)
case 7:s=a2.x
r=A.aZ(a1,s,a3,a4)
if(r===s)return a2
return A.kr(a1,r,!0)
case 8:q=a2.y
p=A.bH(a1,q,a3,a4)
if(p===q)return a2
return A.cq(a1,a2.x,p)
case 9:o=a2.x
n=A.aZ(a1,o,a3,a4)
m=a2.y
l=A.bH(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.jH(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bH(a1,j,a3,a4)
if(i===j)return a2
return A.kt(a1,k,i)
case 11:h=a2.x
g=A.aZ(a1,h,a3,a4)
f=a2.y
e=A.n3(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.kq(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bH(a1,d,a3,a4)
o=a2.x
n=A.aZ(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jI(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.j(A.cG("Attempted to substitute unexpected RTI kind "+a0))}},
bH(a,b,c,d){var s,r,q,p,o=b.length,n=A.j2(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.aZ(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
n4(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.j2(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.aZ(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
n3(a,b,c,d){var s,r=b.a,q=A.bH(a,r,c,d),p=b.b,o=A.bH(a,p,c,d),n=b.c,m=A.n4(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dj()
s.a=q
s.b=o
s.c=m
return s},
c(a,b){a[v.arrayRti]=b
return a},
jd(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.nl(s)
return a.$S()}return null},
nq(a,b){var s
if(A.ke(b))if(a instanceof A.a6){s=A.jd(a)
if(s!=null)return s}return A.az(a)},
az(a){if(a instanceof A.A)return A.l(a)
if(Array.isArray(a))return A.f(a)
return A.jJ(J.bk(a))},
f(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
l(a){var s=a.$ti
return s!=null?s:A.jJ(a)},
jJ(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.mF(a,s)},
mF(a,b){var s=a instanceof A.a6?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.ml(v.typeUniverse,s.name)
b.$ccache=r
return r},
nl(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.j1(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
nk(a){return A.aQ(A.l(a))},
jR(a){var s=A.jd(a)
return A.aQ(s==null?A.az(a):s)},
jN(a){var s
if(a instanceof A.am)return A.ng(a.$r,a.aS())
s=a instanceof A.a6?A.jd(a):null
if(s!=null)return s
if(t.dm.b(a))return J.le(a).a
if(Array.isArray(a))return A.f(a)
return A.az(a)},
aQ(a){var s=a.r
return s==null?a.r=new A.j0(a):s},
ng(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bY
if(0>=p)return A.n(q,0)
s=A.cs(v.typeUniverse,A.jN(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.n(q,r)
s=A.kv(v.typeUniverse,s,A.jN(q[r]))}return A.cs(v.typeUniverse,s,a)},
aA(a){return A.aQ(A.j1(v.typeUniverse,a,!1))},
mE(a){var s=this
s.b=A.n1(s)
return s.b(a)},
n1(a){var s,r,q,p,o
if(a===t.K)return A.mM
if(A.bl(a))return A.mQ
s=a.w
if(s===6)return A.mC
if(s===1)return A.kD
if(s===7)return A.mH
r=A.n0(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bl)){a.f="$i"+q
if(q==="q")return A.mK
if(a===t.A)return A.mJ
return A.mP}}else if(s===10){p=A.nf(a.x,a.y)
o=p==null?A.kD:p
return o==null?A.cw(o):o}return A.mA},
n0(a){if(a.w===8){if(a===t.S)return A.kB
if(a===t.i||a===t.H)return A.mL
if(a===t.N)return A.mO
if(a===t.y)return A.jK}return null},
mD(a){var s=this,r=A.mz
if(A.bl(s))r=A.mp
else if(s===t.K)r=A.cw
else if(A.bK(s)){r=A.mB
if(s===t.h6)r=A.a1
else if(s===t.dk)r=A.bF
else if(s===t.fQ)r=A.cv
else if(s===t.cg)r=A.S
else if(s===t.cD)r=A.mn
else if(s===t.an)r=A.mo}else if(s===t.S)r=A.h
else if(s===t.N)r=A.K
else if(s===t.y)r=A.ay
else if(s===t.H)r=A.z
else if(s===t.i)r=A.ao
else if(s===t.A)r=A.j3
s.a=r
return s.a(a)},
mA(a){var s=this
if(a==null)return A.bK(s)
return A.kP(v.typeUniverse,A.nq(a,s),s)},
mC(a){if(a==null)return!0
return this.x.b(a)},
mP(a){var s,r=this
if(a==null)return A.bK(r)
s=r.f
if(a instanceof A.A)return!!a[s]
return!!J.bk(a)[s]},
mK(a){var s,r=this
if(a==null)return A.bK(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.A)return!!a[s]
return!!J.bk(a)[s]},
mJ(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.A)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
kC(a){if(typeof a=="object"){if(a instanceof A.A)return t.A.b(a)
return!0}if(typeof a=="function")return!0
return!1},
mz(a){var s=this
if(a==null){if(A.bK(s))return a}else if(s.b(a))return a
throw A.V(A.ky(a,s),new Error())},
mB(a){var s=this
if(a==null||s.b(a))return a
throw A.V(A.ky(a,s),new Error())},
ky(a,b){return new A.bD("TypeError: "+A.kl(a,A.ad(b,null)))},
kK(a,b,c,d){if(A.kP(v.typeUniverse,a,b))return a
throw A.V(A.md("The type argument '"+A.ad(a,null)+"' is not a subtype of the type variable bound '"+A.ad(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
kl(a,b){return A.cO(a)+": type '"+A.ad(A.jN(a),null)+"' is not a subtype of type '"+b+"'"},
md(a){return new A.bD("TypeError: "+a)},
an(a,b){return new A.bD("TypeError: "+A.kl(a,b))},
mH(a){var s=this
return s.x.b(a)||A.jC(v.typeUniverse,s).b(a)},
mM(a){return a!=null},
cw(a){if(a!=null)return a
throw A.V(A.an(a,"Object"),new Error())},
mQ(a){return!0},
mp(a){return a},
kD(a){return!1},
jK(a){return!0===a||!1===a},
ay(a){if(!0===a)return!0
if(!1===a)return!1
throw A.V(A.an(a,"bool"),new Error())},
cv(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.V(A.an(a,"bool?"),new Error())},
ao(a){if(typeof a=="number")return a
throw A.V(A.an(a,"double"),new Error())},
mn(a){if(typeof a=="number")return a
if(a==null)return a
throw A.V(A.an(a,"double?"),new Error())},
kB(a){return typeof a=="number"&&Math.floor(a)===a},
h(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.V(A.an(a,"int"),new Error())},
a1(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.V(A.an(a,"int?"),new Error())},
mL(a){return typeof a=="number"},
z(a){if(typeof a=="number")return a
throw A.V(A.an(a,"num"),new Error())},
S(a){if(typeof a=="number")return a
if(a==null)return a
throw A.V(A.an(a,"num?"),new Error())},
mO(a){return typeof a=="string"},
K(a){if(typeof a=="string")return a
throw A.V(A.an(a,"String"),new Error())},
bF(a){if(typeof a=="string")return a
if(a==null)return a
throw A.V(A.an(a,"String?"),new Error())},
j3(a){if(A.kC(a))return a
throw A.V(A.an(a,"JSObject"),new Error())},
mo(a){if(a==null)return a
if(A.kC(a))return a
throw A.V(A.an(a,"JSObject?"),new Error())},
kF(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.ad(a[q],b)
return s},
mW(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.kF(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.ad(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
kz(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
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
if(l===8){p=A.n5(a.x)
o=a.y
return o.length>0?p+("<"+A.kF(o,b)+">"):p}if(l===10)return A.mW(a,b)
if(l===11)return A.kz(a,b,null)
if(l===12)return A.kz(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.n(b,n)
return b[n]}return"?"},
n5(a){var s=A.kW(a)
if(s!=null)return s
return"minified:"+a},
mm(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
ml(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.j1(a,b,!1)
else if(typeof m=="number"){s=m
r=A.cr(a,5,"#")
q=A.j2(s)
for(p=0;p<s;++p)q[p]=r
o=A.cq(a,b,q)
n[b]=o
return o}else return m},
mk(a,b){return A.kw(a.tR,b)},
mj(a,b){return A.kw(a.eT,b)},
j1(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.ku(a,null,b,!1)
r.set(b,s)
return s},
cs(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.ku(a,b,c,!0)
q.set(c,r)
return r},
kv(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.jH(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
ku(a,b,c,d){return A.m9(A.m3(a,b,c,d))},
aY(a,b){b.a=A.mD
b.b=A.mE
return b},
cr(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.au(null,null)
s.w=b
s.as=c
r=A.aY(a,s)
a.eC.set(c,r)
return r},
ks(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.mh(a,b,r,c)
a.eC.set(r,s)
return s},
mh(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bl(b))if(!(b===t.P||b===t.v))if(s!==6)r=s===7&&A.bK(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.au(null,null)
q.w=6
q.x=b
q.as=c
return A.aY(a,q)},
kr(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.mf(a,b,r,c)
a.eC.set(r,s)
return s},
mf(a,b,c,d){var s,r
if(d){s=b.w
if(A.bl(b)||b===t.K)return b
else if(s===1)return A.cq(a,"aT",[b])
else if(b===t.P||b===t.v)return t.eH}r=new A.au(null,null)
r.w=7
r.x=b
r.as=c
return A.aY(a,r)},
mi(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.au(null,null)
s.w=13
s.x=b
s.as=q
r=A.aY(a,s)
a.eC.set(q,r)
return r},
cp(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
me(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
cq(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.cp(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.au(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.aY(a,r)
a.eC.set(p,q)
return q},
jH(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.cp(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.au(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.aY(a,o)
a.eC.set(q,n)
return n},
kt(a,b,c){var s,r,q="+"+(b+"("+A.cp(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.au(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.aY(a,s)
a.eC.set(q,r)
return r},
kq(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.cp(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.cp(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.me(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.au(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.aY(a,p)
a.eC.set(r,o)
return o},
jI(a,b,c,d){var s,r=b.as+("<"+A.cp(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.mg(a,b,c,r,d)
a.eC.set(r,s)
return s},
mg(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.j2(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.aZ(a,b,r,0)
m=A.bH(a,c,r,0)
return A.jI(a,n,m,c!==m)}}l=new A.au(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.aY(a,l)},
m3(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
m9(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.m5(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.kn(a,r,l,k,!1)
else if(q===46)r=A.kn(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bh(a.u,a.e,k.pop()))
break
case 94:k.push(A.mi(a.u,k.pop()))
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
case 62:A.m7(a,k)
break
case 38:A.m6(a,k)
break
case 63:p=a.u
k.push(A.ks(p,A.bh(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.kr(p,A.bh(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.m4(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.ko(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.ma(a.u,a.e,o)
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
m5(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
kn(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.mm(s,o.x)[p]
if(n==null)A.cB('No "'+p+'" in "'+A.lR(o)+'"')
d.push(A.cs(s,o,n))}else d.push(p)
return m},
m7(a,b){var s,r=a.u,q=A.km(a,b),p=b.pop()
if(typeof p=="string")b.push(A.cq(r,p,q))
else{s=A.bh(r,a.e,p)
switch(s.w){case 11:b.push(A.jI(r,s,q,a.n))
break
default:b.push(A.jH(r,s,q))
break}}},
m4(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.km(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bh(p,a.e,o)
q=new A.dj()
q.a=s
q.b=n
q.c=m
b.push(A.kq(p,r,q))
return
case-4:b.push(A.kt(p,b.pop(),s))
return
default:throw A.j(A.cG("Unexpected state under `()`: "+A.w(o)))}},
m6(a,b){var s=b.pop()
if(0===s){b.push(A.cr(a.u,1,"0&"))
return}if(1===s){b.push(A.cr(a.u,4,"1&"))
return}throw A.j(A.cG("Unexpected extended operation "+A.w(s)))},
km(a,b){var s=b.splice(a.p)
A.ko(a.u,a.e,s)
a.p=b.pop()
return s},
bh(a,b,c){if(typeof c=="string")return A.cq(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.m8(a,b,c)}else return c},
ko(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bh(a,b,c[s])},
ma(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bh(a,b,c[s])},
m8(a,b,c){var s,r,q=b.w
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
kP(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.T(a,b,null,c,null)
r.set(c,s)}return s},
T(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bl(d))return!0
s=b.w
if(s===4)return!0
if(A.bl(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.T(a,c[b.x],c,d,e))return!0
q=d.w
p=t.P
if(b===p||b===t.v){if(q===7)return A.T(a,b,c,d.x,e)
return d===p||d===t.v||q===6}if(d===t.K){if(s===7)return A.T(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.T(a,b.x,c,d,e))return!1
return A.T(a,A.jC(a,b),c,d,e)}if(s===6)return A.T(a,p,c,d,e)&&A.T(a,b.x,c,d,e)
if(q===7){if(A.T(a,b,c,d.x,e))return!0
return A.T(a,b,c,A.jC(a,d),e)}if(q===6)return A.T(a,b,c,p,e)||A.T(a,b,c,d.x,e)
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
if(!A.T(a,j,c,i,e)||!A.T(a,i,e,j,c))return!1}return A.kA(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.kA(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.mI(a,b,c,d,e)}if(o&&q===10)return A.mN(a,b,c,d,e)
return!1},
kA(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
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
mI(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.cs(a,b,r[o])
return A.kx(a,p,null,c,d.y,e)}return A.kx(a,b.y,null,c,d.y,e)},
kx(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.T(a,b[s],d,e[s],f))return!1
return!0},
mN(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.T(a,r[s],c,q[s],e))return!1
return!0},
bK(a){var s=a.w,r=!0
if(!(a===t.P||a===t.v))if(!A.bl(a))if(s!==6)r=s===7&&A.bK(a.x)
return r},
bl(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
kw(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
j2(a){return a>0?new Array(a):v.typeUniverse.sEA},
au:function au(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dj:function dj(){this.c=this.b=this.a=null},
j0:function j0(a){this.a=a},
di:function di(){},
bD:function bD(a){this.a=a},
lY(){var s,r,q
if(self.scheduleImmediate!=null)return A.n9()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.ds(new A.iD(s),1)).observe(r,{childList:true})
return new A.iC(s,r,q)}else if(self.setImmediate!=null)return A.na()
return A.nb()},
lZ(a){self.scheduleImmediate(A.ds(new A.iE(t.M.a(a)),0))},
m_(a){self.setImmediate(A.ds(new A.iF(t.M.a(a)),0))},
m0(a){A.jE(B.H,t.M.a(a))},
jE(a,b){return A.mc(0,b)},
mc(a,b){var s=new A.iZ()
s.cv(a,b)
return s},
mT(a){return new A.df(new A.Z($.O,a.h("Z<0>")),a.h("df<0>"))},
mt(a,b){a.$2(0,null)
b.b=!0
return b.a},
mq(a,b){A.mu(a,b)},
ms(a,b){var s,r,q=b.$ti
q.h("1/?").a(a)
s=a==null?q.c.a(a):a
if(!b.b)b.a.cD(s)
else{r=b.a
if(q.h("aT<1>").b(s))r.bD(s)
else r.bF(s)}},
mr(a,b){var s=A.aR(a),r=A.bJ(a),q=b.b,p=b.a
if(q)p.b7(new A.aq(s,r))
else p.bC(new A.aq(s,r))},
mu(a,b){var s,r,q=new A.j4(b),p=new A.j5(b)
if(a instanceof A.Z)a.bS(q,p,t.z)
else{s=t.z
if(a instanceof A.Z)a.cj(q,p,s)
else{r=new A.Z($.O,t.c)
r.a=8
r.c=a
r.bS(q,p,s)}}},
n7(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.O.cf(new A.j8(s),t.x,t.S,t.z)},
kp(a,b,c){return 0},
jv(a){var s
if(t.V.b(a)){s=a.gaO()
if(s!=null)return s}return B.a1},
lA(a,b){var s
if(!b.b(null))throw A.j(A.et(null,"computation","The type parameter is not nullable"))
s=new A.Z($.O,b.h("Z<0>"))
A.lU(a,new A.hb(null,s,b))
return s},
iK(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.lS()
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
if(n){p=b.aD()
b.aQ(o.a)
A.be(b,p)
return}b.a^=2
A.dr(null,null,b.b,t.M.a(new A.iL(o,b)))},
be(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.u,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.jM(m.a,m.b)}return}q.a=b
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
A.jM(j.a,j.b)
return}g=$.O
if(g!==h)$.O=h
else g=null
c=c.c
if((c&15)===8)new A.iP(q,d,n).$0()
else if(o){if((c&1)!==0)new A.iO(q,j).$0()}else if((c&2)!==0)new A.iN(d,q).$0()
if(g!=null)$.O=g
c=q.c
if(c instanceof A.Z){p=q.a.$ti
p=p.h("aT<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aT(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.iK(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.aT(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
mX(a,b){var s
if(t.C.b(a))return b.cf(a,t.z,t.K,t.l)
s=t.B
if(s.b(a))return s.a(a)
throw A.j(A.et(a,"onError",u.c))},
mU(){var s,r
for(s=$.bG;s!=null;s=$.bG){$.cy=null
r=s.b
$.bG=r
if(r==null)$.cx=null
s.a.$0()}},
n2(){$.jL=!0
try{A.mU()}finally{$.cy=null
$.jL=!1
if($.bG!=null)$.jX().$1(A.kJ())}},
kG(a){var s=new A.dg(a),r=$.cx
if(r==null){$.bG=$.cx=s
if(!$.jL)$.jX().$1(A.kJ())}else $.cx=r.b=s},
n_(a){var s,r,q,p=$.bG
if(p==null){A.kG(a)
$.cy=$.cx
return}s=new A.dg(a)
r=$.cy
if(r==null){s.b=p
$.bG=$.cy=s}else{q=r.b
s.b=q
$.cy=r.b=s
if(q==null)$.cx=s}},
nK(a,b){A.U(a,"stream",t.K)
return new A.dp(b.h("dp<0>"))},
lU(a,b){var s=$.O
if(s===B.j)return A.jE(a,t.M.a(b))
return A.jE(a,t.M.a(s.c1(b)))},
jM(a,b){A.n_(new A.j7(a,b))},
kE(a,b,c,d,e){var s,r=$.O
if(r===c)return d.$0()
$.O=c
s=r
try{r=d.$0()
return r}finally{$.O=s}},
mZ(a,b,c,d,e,f,g){var s,r=$.O
if(r===c)return d.$1(e)
$.O=c
s=r
try{r=d.$1(e)
return r}finally{$.O=s}},
mY(a,b,c,d,e,f,g,h,i){var s,r=$.O
if(r===c)return d.$2(e,f)
$.O=c
s=r
try{r=d.$2(e,f)
return r}finally{$.O=s}},
dr(a,b,c,d){t.M.a(d)
if(B.j!==c){d=c.c1(d)
d=d}A.kG(d)},
iD:function iD(a){this.a=a},
iC:function iC(a,b,c){this.a=a
this.b=b
this.c=c},
iE:function iE(a){this.a=a},
iF:function iF(a){this.a=a},
iZ:function iZ(){},
j_:function j_(a,b){this.a=a
this.b=b},
df:function df(a,b){this.a=a
this.b=!1
this.$ti=b},
j4:function j4(a){this.a=a},
j5:function j5(a){this.a=a},
j8:function j8(a){this.a=a},
aP:function aP(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
ax:function ax(a,b){this.a=a
this.$ti=b},
aq:function aq(a,b){this.a=a
this.b=b},
hb:function hb(a,b,c){this.a=a
this.b=b
this.c=c},
bd:function bd(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
Z:function Z(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
iH:function iH(a,b){this.a=a
this.b=b},
iM:function iM(a,b){this.a=a
this.b=b},
iL:function iL(a,b){this.a=a
this.b=b},
iJ:function iJ(a,b){this.a=a
this.b=b},
iI:function iI(a,b){this.a=a
this.b=b},
iP:function iP(a,b,c){this.a=a
this.b=b
this.c=c},
iQ:function iQ(a,b){this.a=a
this.b=b},
iR:function iR(a){this.a=a},
iO:function iO(a,b){this.a=a
this.b=b},
iN:function iN(a,b){this.a=a
this.b=b},
dg:function dg(a){this.a=a
this.b=null},
dp:function dp(a){this.$ti=a},
cu:function cu(){},
dn:function dn(){},
iY:function iY(a,b){this.a=a
this.b=b},
j7:function j7(a,b){this.a=a
this.b=b},
jA(a,b){return new A.aJ(a.h("@<0>").F(b).h("aJ<1,2>"))},
R(a,b,c){return b.h("@<0>").F(c).h("k9<1,2>").a(A.nh(a,new A.aJ(b.h("@<0>").F(c).h("aJ<1,2>"))))},
W(a,b){return new A.aJ(a.h("@<0>").F(b).h("aJ<1,2>"))},
lI(a){return new A.av(a.h("av<0>"))},
b8(a){return new A.av(a.h("av<0>"))},
lJ(a,b){return b.h("kb<0>").a(A.ni(a,new A.av(b.h("av<0>"))))},
jG(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
iW(a,b,c){var s=new A.bg(a,b,c.h("bg<0>"))
s.c=a.e
return s},
aD(a,b){var s=J.H(a)
if(s.j())return s.gp()
return null},
as(a,b,c){var s=A.jA(b,c)
a.ab(0,new A.hi(s,b,c))
return s},
ka(a,b,c){var s=A.jA(b,c)
s.G(0,a)
return s},
hl(a){var s,r
if(A.jT(a))return"{...}"
s=new A.bx("")
try{r={}
B.a.l($.aj,a)
s.a+="{"
r.a=!0
a.ab(0,new A.hm(r,s))
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
bg:function bg(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
hi:function hi(a,b,c){this.a=a
this.b=b
this.c=c},
C:function C(){},
F:function F(){},
hk:function hk(a){this.a=a},
hm:function hm(a,b){this.a=a
this.b=b},
ct:function ct(){},
bt:function bt(){},
cf:function cf(){},
bw:function bw(){},
cn:function cn(){},
bE:function bE(){},
mV(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aR(r)
q=A.k6(String(s))
throw A.j(q)}q=A.j6(p)
return q},
j6(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.dk(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.j6(a[s])
return a},
k8(a,b,c){return new A.c0(a,b)},
mw(a){return a.K()},
m1(a,b){return new A.iT(a,[],A.ne())},
m2(a,b,c){var s,r=new A.bx(""),q=A.m1(r,b)
q.b0(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
dk:function dk(a,b){this.a=a
this.b=b
this.c=null},
dl:function dl(a){this.a=a},
cJ:function cJ(){},
cL:function cL(){},
c0:function c0(a,b){this.a=a
this.b=b},
cW:function cW(a,b){this.a=a
this.b=b},
he:function he(){},
hg:function hg(a){this.b=a},
hf:function hf(a){this.a=a},
iU:function iU(){},
iV:function iV(a,b){this.a=a
this.b=b},
iT:function iT(a,b,c){this.c=a
this.a=b
this.b=c},
kO(a){var s=A.lP(a,null)
if(s!=null)return s
throw A.j(A.k6(a))},
lw(a,b){a=A.V(a,new Error())
if(a==null)a=A.cw(a)
a.stack=b.q(0)
throw a},
hj(a,b,c,d){var s,r=c?J.k7(a,d):J.lF(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
bs(a,b,c){var s,r=A.c([],c.h("u<0>"))
for(s=J.H(a);s.j();)B.a.l(r,c.a(s.gp()))
if(b)return r
r.$flags=1
return r},
m(a,b){var s,r
if(Array.isArray(a))return A.c(a.slice(0),b.h("u<0>"))
s=A.c([],b.h("u<0>"))
for(r=J.H(a);r.j();)B.a.l(s,r.gp())
return s},
aK(a,b){var s=A.bs(a,!1,b)
s.$flags=3
return s},
kg(a,b,c){var s=J.H(b)
if(!s.j())return a
if(c.length===0){do a+=A.w(s.gp())
while(s.j())}else{a+=A.w(s.gp())
while(s.j())a=a+c+A.w(s.gp())}return a},
lS(){return A.bJ(new Error())},
lv(a,b,c){var s,r
for(s=0;s<4;++s){r=a[s]
if(r.b===b)return r}throw A.j(A.et(b,"name","No enum value with that name"))},
cO(a){if(typeof a=="number"||A.jK(a)||a==null)return J.bo(a)
if(typeof a=="string")return JSON.stringify(a)
return A.kd(a)},
lx(a,b){A.U(a,"error",t.K)
A.U(b,"stackTrace",t.l)
A.lw(a,b)},
cG(a){return new A.cF(a)},
cE(a,b){return new A.aB(!1,null,b,a)},
et(a,b,c){return new A.aB(!0,a,b,c)},
b9(a,b,c,d,e){return new A.ca(b,c,!0,a,d,"Invalid value")},
lQ(a,b,c){if(0>a||a>c)throw A.j(A.b9(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.j(A.b9(b,a,c,"end",null))
return b}return c},
cb(a,b){if(a<0)throw A.j(A.b9(a,0,null,b,null))
return a},
jw(a,b,c,d){return new A.cP(b,!0,a,d,"Index out of range")},
bc(a){return new A.cg(a)},
kj(a){return new A.dd(a)},
kf(a){return new A.ce(a)},
a_(a){return new A.cK(a)},
k6(a){return new A.aH(a)},
lE(a,b,c){var s,r
if(A.jT(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.c([],t.s)
B.a.l($.aj,a)
try{A.mR(a,s)}finally{if(0>=$.aj.length)return A.n($.aj,-1)
$.aj.pop()}r=A.kg(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
jx(a,b,c){var s,r
if(A.jT(a))return b+"..."+c
s=new A.bx(b)
B.a.l($.aj,a)
try{r=s
r.a=A.kg(r.a,a,", ")}finally{if(0>=$.aj.length)return A.n($.aj,-1)
$.aj.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
mR(a,b){var s,r,q,p,o,n,m,l=a.gC(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.j())return
s=A.w(l.gp())
B.a.l(b,s)
k+=s.length+2;++j}if(!l.j()){if(j<=5)return
if(0>=b.length)return A.n(b,-1)
r=b.pop()
if(0>=b.length)return A.n(b,-1)
q=b.pop()}else{p=l.gp();++j
if(!l.j()){if(j<=4){B.a.l(b,A.w(p))
return}r=A.w(p)
if(0>=b.length)return A.n(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gp();++j
for(;l.j();p=o,o=n){n=l.gp();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.n(b,-1)
k-=b.pop().length+2;--j}B.a.l(b,"...")
return}}q=A.w(p)
r=A.w(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.n(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.l(b,m)
B.a.l(b,q)
B.a.l(b,r)},
ho(a,b,c,d){var s
if(B.m===c){s=J.ag(a)
b=J.ag(b)
return A.ir(A.aL(A.aL($.du(),s),b))}if(B.m===d){s=J.ag(a)
b=J.ag(b)
c=J.ag(c)
return A.ir(A.aL(A.aL(A.aL($.du(),s),b),c))}s=J.ag(a)
b=J.ag(b)
c=J.ag(c)
d=J.ag(d)
d=A.ir(A.aL(A.aL(A.aL(A.aL($.du(),s),b),c),d))
return d},
lL(a){var s,r,q=$.du()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.t)(a),++r)q=A.aL(q,J.ag(a[r]))
return A.ir(q)},
cM:function cM(){},
dh:function dh(){},
D:function D(){},
cF:function cF(a){this.a=a},
aM:function aM(){},
aB:function aB(a,b,c,d){var _=this
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
iG:function iG(a){this.a=a},
aH:function aH(a){this.a=a},
a:function a(){},
ab:function ab(a,b,c){this.a=a
this.b=b
this.$ti=c},
ac:function ac(){},
A:function A(){},
dq:function dq(){},
iq:function iq(){this.b=this.a=0},
bx:function bx(a){this.a=a},
k_(a,b,c,d){var s,r,q,p,o,n=t.N,m=t.S,l=a.gak(),k=a.gak(),j=a.gak(),i=A.ka(a.gak().x,m,m),h=A.W(m,m)
for(s=a.gM(),r=J.H(s.a),s=new A.Y(r,s.b,s.$ti.h("Y<1>"));s.j();){q=r.gp()
h.B(0,q.a,q.d)}s=A.W(n,t.J)
for(r=d.length,p=0;p<d.length;d.length===r||(0,A.t)(d),++p){o=d[p]
s.B(0,o.a,o)}return new A.aG(a,b,c,l.b,k.c,j.d,i,h,s,A.b8(n),A.b8(n),A.b8(n),A.b8(m),A.b8(m),A.b8(m),A.W(m,t.y))},
eu:function eu(a){this.a=a},
aG:function aG(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var _=this
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
dT:function dT(a){this.a=a},
dz:function dz(a,b){this.a=a
this.b=b},
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
dC:function dC(a){this.a=a},
dD:function dD(){},
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
dO:function dO(a){this.a=a},
dQ:function dQ(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dP:function dP(a){this.a=a},
dU:function dU(a){this.a=a},
dR:function dR(){},
dS:function dS(){},
dA:function dA(){},
dB:function dB(){},
dV:function dV(a){this.a=a},
dW:function dW(){},
dX:function dX(a){this.a=a},
dY:function dY(a){this.a=a},
aS(a,b,c,d){var s,r=b.f,q=A.f(r)
q=new A.b(r,q.h("e(1)").a(new A.ex(a)),q.h("b<1>")).gm(0)
r=b.gM()
if(!b.gM().gC(0).j())s=0
else{s=b.gak().r
if(s==null){s=c.b.i(0,"countryIncome")
s.toString
s=B.b.k(s)}}return new A.ew(a,q,r.E(0,s,new A.ey(d,c),t.S),b,c)},
ew:function ew(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ex:function ex(a){this.a=a},
ey:function ey(a,b){this.a=a
this.b=b},
a4(a){var s=a.x,r=s>=15?500:0,q=a.e
if(q===2)q=1000
else q=q===1?30:0
return a.w*3+a.r*0.35+a.f*0.15+s*1.5-a.y*2+r+q},
ae(a,b){var s=b?a.x*0.75:0,r=a.e
if(r===1)r=30
else r=r===2?-200:0
return a.w*100+a.r*0.35+a.f*0.15-a.y*2-s+r},
nC(a){return t.r.a(a).x>=15},
kN(a,b){var s=a.gbn(),r=a.gP(),q=b.b.i(0,"soldierPower")
q.toString
return s*(a.w+r*B.b.k(q))+B.a.E(a.ax,0,new A.jg(b,a),t.H)},
dt(a,b,c,d){var s,r=b.b,q=r.i(0,"soldierHp")
q.toString
q=B.b.k(q)
s=b.c0(a.w,c,!1)
r=r.i(0,"soldierPower")
r.toString
return(a.f+d*q)*(s+d*B.b.k(r))*(1+b.dt(B.b.aK(a.ay))/1000)},
b3:function b3(a,b){this.a=a
this.b=b},
bL:function bL(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
ez:function ez(a,b,c){this.a=a
this.b=b
this.c=c},
eA:function eA(){},
eB:function eB(){},
jg:function jg(a,b){this.a=a
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
aw:function aw(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eD:function eD(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.r=_.f=_.e=$
_.w=null
_.x=e},
f0:function f0(a){this.a=a},
f1:function f1(){},
f2:function f2(){},
fd:function fd(){},
fh:function fh(){},
fi:function fi(a){this.a=a},
fj:function fj(a){this.a=a},
fk:function fk(a){this.a=a},
fl:function fl(a,b){this.a=a
this.b=b},
fm:function fm(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fn:function fn(a){this.a=a},
f3:function f3(a,b){this.a=a
this.b=b},
f4:function f4(a){this.a=a},
f5:function f5(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
f6:function f6(a,b,c){this.a=a
this.b=b
this.c=c},
f7:function f7(a){this.a=a},
f8:function f8(){},
f9:function f9(a){this.a=a},
fa:function fa(a){this.a=a},
fb:function fb(){},
fc:function fc(a,b){this.a=a
this.b=b},
fe:function fe(a){this.a=a},
ff:function ff(){},
fg:function fg(a){this.a=a},
eO:function eO(a,b){this.a=a
this.b=b},
eP:function eP(a){this.a=a},
eE:function eE(a){this.a=a},
eK:function eK(a){this.a=a},
eL:function eL(a,b,c){this.a=a
this.b=b
this.c=c},
eM:function eM(a,b,c){this.a=a
this.b=b
this.c=c},
eN:function eN(a){this.a=a},
eT:function eT(a){this.a=a},
eU:function eU(a,b){this.a=a
this.b=b},
eV:function eV(a){this.a=a},
eW:function eW(a,b){this.a=a
this.b=b},
eX:function eX(a){this.a=a},
eY:function eY(a){this.a=a},
eZ:function eZ(){},
f_:function f_(a){this.a=a},
eR:function eR(a){this.a=a},
eS:function eS(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eQ:function eQ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eG:function eG(a,b,c){this.a=a
this.b=b
this.c=c},
eH:function eH(a){this.a=a},
eI:function eI(a){this.a=a},
eJ:function eJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eF:function eF(a){this.a=a},
a7:function a7(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
fo:function fo(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
h8:function h8(a,b){this.a=a
this.b=b},
h9:function h9(a){this.a=a},
h7:function h7(a){this.a=a},
ha:function ha(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h5:function h5(){},
h4:function h4(){},
h6:function h6(){},
h3:function h3(){},
fp:function fp(){},
fq:function fq(){},
fr:function fr(){},
fC:function fC(){},
fN:function fN(a){this.a=a},
fP:function fP(){},
fQ:function fQ(){},
fR:function fR(a){this.a=a},
fS:function fS(){},
fT:function fT(a){this.a=a},
fU:function fU(a){this.a=a},
fs:function fs(){},
ft:function ft(a){this.a=a},
fV:function fV(a,b){this.a=a
this.b=b},
fu:function fu(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fv:function fv(a,b){this.a=a
this.b=b},
fw:function fw(){},
fx:function fx(a){this.a=a},
fy:function fy(a){this.a=a},
fz:function fz(a,b,c){this.a=a
this.b=b
this.c=c},
fA:function fA(a){this.a=a},
fB:function fB(a,b,c){this.a=a
this.b=b
this.c=c},
fD:function fD(a){this.a=a},
fE:function fE(){},
fF:function fF(){},
fG:function fG(){},
fH:function fH(a,b){this.a=a
this.b=b},
fI:function fI(){},
fJ:function fJ(a){this.a=a},
fK:function fK(a){this.a=a},
fL:function fL(a){this.a=a},
fM:function fM(){},
fO:function fO(a){this.a=a},
h0:function h0(a){this.a=a},
h1:function h1(a){this.a=a},
h2:function h2(){},
fW:function fW(){},
fX:function fX(a){this.a=a},
fY:function fY(){},
fZ:function fZ(a){this.a=a},
h_:function h_(a){this.a=a},
eh(a){var s,r=a.length
if(0>=r)return A.n(a,0)
s=A.z(a[0])
if(1>=r)return A.n(a,1)
return new A.v(s,A.z(a[1]))},
v:function v(a,b){this.a=a
this.b=b},
eg:function eg(a){this.a=a},
jZ(c2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=A.K(c2.i(0,"id")),a9=A.h(c2.i(0,"c")),b0=A.h(c2.i(0,"home")),b1=A.h(c2.i(0,"o")),b2=A.h(c2.i(0,"t")),b3=A.z(c2.i(0,"hp")),b4=A.h(c2.i(0,"max")),b5=A.h(c2.i(0,"a")),b6=A.h(c2.i(0,"p")),b7=A.h(c2.i(0,"pay")),b8=t.j,b9=A.eh(b8.a(c2.i(0,"xy"))),c0=A.eh(b8.a(c2.i(0,"v"))),c1=A.h(c2.i(0,"s"))
if(!(c1>=0&&c1<8))return A.n(B.L,c1)
c1=B.L[c1]
s=A.c([],t.n)
for(r=b8.a(c2.i(0,"troops")),q=r.length,p=0;p<r.length;r.length===q||(0,A.t)(r),++p)s.push(A.z(r[p]))
r=t.R
q=t.S
o=A.bs(r.a(c2.i(0,"w")),!0,q)
n=A.z(c2.i(0,"m"))
m=c2.i(0,"to")==null?null:A.eh(b8.a(c2.i(0,"to")))
l=A.a1(c2.i(0,"target"))
k=A.z(c2.i(0,"return"))
j=A.ay(c2.i(0,"dispatch"))
i=A.ay(c2.i(0,"move"))
h=A.ay(c2.i(0,"dismiss"))
g=A.ay(c2.i(0,"upgrade"))
f=A.ay(c2.i(0,"retreat"))
e=A.ay(c2.i(0,"marked"))
d=A.K(c2.i(0,"rev"))
c=A.h(c2.i(0,"orderRev"))
b=A.bF(c2.i(0,"opponent"))
a=A.h(c2.i(0,"clashes"))
a0=A.z(c2.i(0,"received"))
a1=A.z(c2.i(0,"dealt"))
a2=A.ay(c2.i(0,"opening"))
a3=A.ay(c2.i(0,"weaponReady"))
a4=A.c([],t._)
for(r=J.H(r.a(c2.i(0,"returnPath")));r.j();){a5=b8.a(r.gp())
a6=a5.length
if(0>=a6)return A.n(a5,0)
a7=A.z(a5[0])
if(1>=a6)return A.n(a5,1)
a4.push(new A.v(a7,A.z(a5[1])))}b8=A.a1(c2.i(0,"regionCity"))
r=A.a1(c2.i(0,"salaryPaidMonth"))
if(r==null)r=-1
a5=A.cv(c2.i(0,"movementPending"))
return new A.o(a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b9,c0,c1,A.aK(s,t.i),A.aK(o,q),n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,b8,r,a5===!0)},
lh(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=A.h(a3.i(0,"id")),c=A.h(a3.i(0,"c")),b=A.h(a3.i(0,"native")),a=A.h(a3.i(0,"level")),a0=t.j,a1=A.eh(a0.a(a3.i(0,"xy"))),a2=A.c([],t._)
for(s=a0.a(a3.i(0,"outline")),r=s.length,q=0;q<s.length;s.length===r||(0,A.t)(s),++q){p=a0.a(s[q])
o=p.length
if(0>=o)return A.n(p,0)
n=A.z(p[0])
if(1>=o)return A.n(p,1)
a2.push(new A.v(n,A.z(p[1])))}a0=A.h(a3.i(0,"income"))
s=A.h(a3.i(0,"poor"))
r=A.h(a3.i(0,"cap"))
p=A.h(a3.i(0,"recruitCap"))
o=A.ay(a3.i(0,"recruit"))
n=A.cv(a3.i(0,"upgrade"))
m=A.K(a3.i(0,"rev"))
l=A.h(a3.i(0,"baseIncome"))
k=A.a1(a3.i(0,"initial"))
j=A.h(a3.i(0,"wins"))
i=A.bF(a3.i(0,"attacker"))
h=A.bF(a3.i(0,"defender"))
g=A.K(a3.i(0,"stage"))
f=A.z(a3.i(0,"next"))
e=A.cv(a3.i(0,"fallen"))
return new A.E(d,c,b,a,a1,new A.eg(a2),a0,s,r,p,l,o,n!==!1,m,k,j,i,h,g,f,e===!0,A.z(a3.i(0,"danger")))},
li(a){var s,r,q,p,o,n=A.h(a.i(0,"id")),m=A.h(a.i(0,"gold")),l=A.h(a.i(0,"reserves")),k=A.h(a.i(0,"capacity")),j=A.h(a.i(0,"salary")),i=A.h(a.i(0,"poor")),h=A.a1(a.i(0,"baseIncome")),g=A.S(a.i(0,"garrisonAccrued"))
if(g==null)g=0
s=t.S
r=A.W(s,s)
for(q=t.f,p=q.a(a.i(0,"stock")).gam(),p=p.gC(p);p.j();){o=p.gp()
r.B(0,A.kO(A.K(o.a)),A.h(o.b))}p=A.W(s,s)
for(q=q.a(a.i(0,"hate")).gam(),q=q.gC(q);q.j();){o=q.gp()
p.B(0,A.kO(A.K(o.a)),A.h(o.b))}return new A.b1(n,m,l,k,j,i,h,g,A.eC(r,s,s),A.eC(p,s,s))},
lj(a){var s,r,q,p,o,n,m=A.h(a.i(0,"country")),l=A.h(a.i(0,"tick")),k=A.z(a.i(0,"month")),j=A.c([],t.Y)
for(s=t.R,r=J.H(s.a(a.i(0,"cities"))),q=t.f,p=t.N,o=t.z;r.j();)j.push(A.lh(A.as(q.a(r.gp()),p,o)))
r=A.c([],t.e)
for(n=J.H(s.a(a.i(0,"heroes")));n.j();)r.push(A.jZ(A.as(q.a(n.gp()),p,o)))
n=A.c([],t.eu)
for(s=J.H(s.a(a.i(0,"countries")));s.j();)n.push(A.li(A.as(q.a(s.gp()),p,o)))
s=A.h(a.i(0,"pool"))
q=A.h(a.i(0,"salary"))
p=A.a1(a.i(0,"year"))
if(p==null)p=1
o=A.a1(a.i(0,"monthIndex"))
if(o==null)o=0
return new A.e8(m,l,p,o,k,A.aK(j,t.q),A.aK(r,t.r),A.aK(n,t.t),s,q)},
al:function al(a,b){this.a=a
this.b=b},
o:function o(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7){var _=this
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
E:function E(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,a0,a1,a2){var _=this
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
b1:function b1(a,b,c,d,e,f,g,h,i,j){var _=this
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
jO(a,b,c){var s,r,q=null,p=a.as
if(p===B.h||p===B.e||p===B.y)return q
s=c.y.i(0,a.a)
p=s==null
if((p?q:s.b)==="expedition")p=p?q:s.d
else p=a.CW
r=b.J(p)
return r!=null&&r.b!==a.b?r:q},
kI(a,b,c,d){var s,r,q=A.jO(a,b,c)
if(q==null)return!1
s=a.as
r=!0
if(s!==B.x)if(s!==B.E){s=a.z
s=q.f.a0(s).H(s)<=d.w.p2}else s=r
else s=r
return s},
c9(a,b,c,d,e){var s=B.a.I(a.f,new A.hq(e,a))?e:null
s=new A.hp(a,b,c,s,d,A.W(t.S,t.bd))
s.cu(a,b,c,d,e)
return s},
hp:function hp(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hq:function hq(a,b){this.a=a
this.b=b},
hr:function hr(){},
hv:function hv(a){this.a=a},
hx:function hx(a){this.a=a},
hy:function hy(a){this.a=a},
hw:function hw(a,b){this.a=a
this.b=b},
ht:function ht(){},
hu:function hu(a,b){this.a=a
this.b=b},
hz:function hz(a){this.a=a},
hs:function hs(a){this.a=a},
d7:function d7(a,b){this.a=a
this.b=b},
hA:function hA(a,b,c){this.a=a
this.b=b
this.c=c},
hD:function hD(a,b){this.a=a
this.b=b},
hB:function hB(a,b,c){this.a=a
this.b=b
this.c=c},
hC:function hC(){},
hG:function hG(a){this.a=a},
hH:function hH(){},
hI:function hI(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hJ:function hJ(){},
hK:function hK(){},
hL:function hL(){},
hE:function hE(){},
hF:function hF(a){this.a=a},
ln(a){var s,r,q,p,o,n,m,l,k=A.K(a.i(0,"hero")),j=A.K(a.i(0,"role")),i=A.h(a.i(0,"deadline")),h=A.h(a.i(0,"commit")),g=A.a1(a.i(0,"city")),f=A.bF(a.i(0,"enemy")),e=A.c([],t._)
for(s=J.H(t.R.a(a.i(0,"points"))),r=t.j;s.j();){q=r.a(s.gp())
p=q.length
if(0>=p)return A.n(q,0)
o=A.z(q[0])
if(1>=p)return A.n(q,1)
e.push(new A.v(o,A.z(q[1])))}s=A.h(a.i(0,"leg"))
r=A.h(a.i(0,"gold"))
q=A.ay(a.i(0,"slot"))
p=A.cv(a.i(0,"rearStaging"))
o=A.K(a.i(0,"reason"))
n=A.h(a.i(0,"order"))
m=A.a1(a.i(0,"targetCountry"))
l=A.cv(a.i(0,"attrition"))
return new A.a5(k,j,o,g,m,l===!0,f,e,s,i,h,r,q,p===!0,n)},
lk(a){var s,r,q,p,o,n,m,l,k,j,i
if(!J.af(a.i(0,"protocol"),1))throw A.j(B.a4)
s=A.K(a.i(0,"session"))
r=A.h(a.i(0,"id"))
q=A.K(a.i(0,"rules"))
p=A.K(a.i(0,"map"))
o=t.f
n=t.N
m=t.z
l=A.lj(A.as(o.a(a.i(0,"observation")),n,m))
k=A.h(a.i(0,"deadline"))
j=A.c([],t.m)
for(i=J.H(t.R.a(a.i(0,"tasks")));i.j();)j.push(A.ln(A.as(o.a(i.gp()),n,m)))
o=A.h(a.i(0,"seed"))
n=A.h(a.i(0,"priority"))
m=A.h(a.i(0,"idle"))
i=A.bF(a.i(0,"stage"))
if(i==null)i="full"
return new A.ej(s,q,p,r,k,o,n,m,A.lv(B.af,i,t.a9),A.a1(a.i(0,"offensiveCountry")),A.a1(a.i(0,"offensiveCity")),l,j)},
k0(a,b,c,d){var s=a.Q
return new A.ei(a.a,a.b,a.c,a.d,s.a,s.b,a.e,d,b,c)},
aF:function aF(a,b){this.a=a
this.b=b},
ak:function ak(a,b){this.a=a
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
N:function N(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bP:function bP(a,b,c,d,e,f,g,h,i,j){var _=this
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
j9(b0,b1,b2,b3,b4,b5,b6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2="soldierLimit",a3="soldierPower",a4="soldierHp",a5={},a6=b2.u(b1.a),a7=A.f(a6).h("G<1>"),a8=A.X(new A.G(a6,a7),0,A.U(b1.ga2(),"count",t.S),a7.h("k.E")).af(0),a9=A.aS(b1.b,b2,b3,null)
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
p=B.a.an(b2.w,new A.ja(b1)).c
for(a7=b1.db,s=b1.ax,r=b1.ay,o=s==null,n=b1.d,m=t.a,l=b3.d,k=0,j=0;j<a8.length;++j){i=a8[j]
h=a6.i(0,a2)
h.toString
g=Math.min(B.b.k(h),p+i.gP())
p=Math.max(0,p-(g-i.gP()))
if(o)h=n
else{h=a7?1:0
h=B.c.v(s-r-h,0,5)}h=Math.max(1,h-j)
f=a6.i(0,a2)
f.toString
f=B.b.k(f)
e=b4.d9(b0,i,h,!1,g,j<b5.length?A.c([b5[j]],m):B.d,!0,f)
a5.b=Math.min(a5.b,e.b)
if(j===0)a5.c=e
a5.a=Math.min(a5.a,e.c)
if(o)h=n
else{h=a7?1:0
h=B.c.v(s-r-h,0,5)}h=A.h(Math.max(1,h-j))
f=B.c.v(B.c.Y(i.w),0,63)
if(h>0){d=l.length
h=B.c.v(h-1,0,d-1)
if(!(h>=0&&h<d))return A.n(l,h)
h=l[h]}else h=0
h=B.c.v(f+h,0,63)
f=a6.i(0,a3)
f.toString
c=(h+g*B.b.k(f))/Math.max(1,q)
f=a6.i(0,a4)
f.toString
k+=(i.f+g*B.b.k(f))*c*c}for(a7=b3.r,s=b3.w,r=s.rx,b=0,j=0;o=b5.length,j<Math.min(o,a8.length);++j){if(!(j<o))return A.n(b5,j)
a=a7.i(0,b5[j])
if(a!=null){o=Math.max(0,a.c-a.d)
b+=o*(j===0?1:r)}}a7=b0.f
r=a6.i(0,a2)
r.toString
r=B.b.k(r)
a6=a6.i(0,a4)
a6.toString
a0=Math.max(1,B.b.aw(k/Math.max(1,(a7+r*B.b.k(a6)+b)*0.85)))
a6=new A.jb(a5,a8,b0,b3)
if(a8.length!==0&&J.ju(b5)&&a5.b<s.k4)return new A.aO([!1,a5.b,0,a5.a])
r=s.fy
if(a0>r)return a6.$0()
o=a8.length
m=o===0
if(!m)a7=o===1&&n<=2&&a7>=b0.r*0.8&&a5.b>s.ry||a5.b>s.RG+Math.max(0,o-1)*0.025-b6
else a7=!0
if(a7){a6=a5.b
a7=a5.a
return new A.aO([!1,a6,a9.ci(a6>=s.k4||m?a0:Math.max(2,a0),o),a7])}a1=o>1&&a5.a>s.RG&&a5.b>-0.08?Math.min(r,o):0
if(a1===0)return a6.$0()
a6=a5.b
a7=a5.a
return new A.aO([!1,a6,a9.ci(a1,o),a7])},
ja:function ja(a){this.a=a},
jb:function jb(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
nz(a,b,c,d,e,f,g,h){var s
if(f<3||e)return!1
s=d*h+80+g
return c.aG(0,new A.jo(a,s))&&b.aG(0,new A.jp(a,s))},
jo:function jo(a,b){this.a=a
this.b=b},
jp:function jp(a,b){this.a=a
this.b=b},
hP:function hP(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hS:function hS(a){this.a=a},
hT:function hT(){},
hU:function hU(a,b,c){this.a=a
this.b=b
this.c=c},
i4:function i4(a,b,c){this.a=a
this.b=b
this.c=c},
hR:function hR(a,b){this.a=a
this.b=b},
hQ:function hQ(a,b,c){this.a=a
this.b=b
this.c=c},
ig:function ig(a,b){this.a=a
this.b=b},
ih:function ih(a,b){this.a=a
this.b=b},
ii:function ii(){},
ij:function ij(){},
io:function io(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
il:function il(a){this.a=a},
im:function im(){},
ik:function ik(a,b,c){this.a=a
this.b=b
this.c=c},
hV:function hV(a){this.a=a},
hW:function hW(a,b){this.a=a
this.b=b},
hX:function hX(){},
hY:function hY(){},
hZ:function hZ(){},
i_:function i_(){},
i0:function i0(a){this.a=a},
i1:function i1(){},
i2:function i2(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
i3:function i3(a,b,c){this.a=a
this.b=b
this.c=c},
i5:function i5(a){this.a=a},
i6:function i6(a){this.a=a},
i7:function i7(){},
i8:function i8(){},
i9:function i9(a,b,c){this.a=a
this.b=b
this.c=c},
ia:function ia(a,b,c){this.a=a
this.b=b
this.c=c},
ib:function ib(a,b){this.a=a
this.b=b},
ic:function ic(a,b,c){this.a=a
this.b=b
this.c=c},
id:function id(){},
ie:function ie(){},
bp:function bp(a,b,c){this.a=a
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
ll(a,b,c,d,e,f,g,h){var s,r,q,p,o=A.eC(f,t.N,t.H),n=t.S,m=A.aK(e,n),l=A.aK(a,n),k=t.i,j=A.aK(c,k)
k=A.aK(b,k)
s=t.z
s=A.W(s,s)
for(r=h.length,q=0;q<h.length;h.length===r||(0,A.t)(h),++q){p=h[q]
s.B(0,p.a,p)}return new A.eq(g,o,m,l,j,k,A.eC(s,n,t.o),d)},
lm(c9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2=A.K(c9.i(0,"version")),c3=t.f,c4=t.N,c5=A.as(c3.a(c9.i(0,"values")),c4,t.H),c6=t.R,c7=t.S,c8=A.bs(c6.a(c9.i(0,"upgrades")),!0,c7)
c7=A.bs(c6.a(c9.i(0,"defenseBonuses")),!0,c7)
s=t.n
r=A.c([],s)
for(q=J.H(c6.a(c9.i(0,"movement")));q.j();)r.push(A.z(q.gp()))
s=A.c([],s)
for(q=J.H(c6.a(c9.i(0,"field")));q.j();)s.push(A.z(q.gp()))
q=A.c([],t.b8)
for(c6=J.H(c6.a(c9.i(0,"weapons"))),p=t.j;c6.j();){o=p.a(c6.gp())
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
c6=A.S(c3.i(0,"resourceInterval"))
if(c6==null)c6=30
p=A.a1(c3.i(0,"cashBuffer"))
if(p==null)p=12
o=A.S(c3.i(0,"payrollRatio"))
if(o==null)o=0.5
n=A.a1(c3.i(0,"dangerousCountryCities"))
if(n==null)n=3
m=A.S(c3.i(0,"coalitionBudgetBase"))
if(m==null)m=0.5
l=A.S(c3.i(0,"coalitionBudgetStep"))
if(l==null)l=0.25
k=A.S(c3.i(0,"coalitionTargetBase"))
if(k==null)k=45
j=A.S(c3.i(0,"coalitionTargetStep"))
if(j==null)j=15
i=A.S(c3.i(0,"coalitionPayrollCeiling"))
if(i==null)i=0.8
h=A.S(c3.i(0,"coalitionTravel"))
if(h==null)h=45
g=A.S(c3.i(0,"targetTravelScale"))
if(g==null)g=25
f=A.S(c3.i(0,"hatredTargetBonus"))
if(f==null)f=90
e=A.S(c3.i(0,"breakthroughMargin"))
if(e==null)e=0.1
d=A.z(c3.i(0,"threat"))
c=A.z(c3.i(0,"urgent"))
b=A.z(c3.i(0,"margin"))
a=A.z(c3.i(0,"commit"))
a0=A.a1(c3.i(0,"rearExtra"))
if(a0==null)a0=1
a1=A.h(c3.i(0,"candidates"))
a2=A.h(c3.i(0,"assessments"))
a3=A.h(c3.i(0,"routes"))
a4=A.h(c3.i(0,"plans"))
a5=A.h(c3.i(0,"commands"))
a6=A.h(c3.i(0,"team"))
a7=A.a1(c3.i(0,"fronts"))
if(a7==null)a7=2
a8=A.a1(c3.i(0,"singleFrontMonths"))
if(a8==null)a8=12
a9=A.S(c3.i(0,"splitForce"))
if(a9==null)a9=2.25
b0=A.S(c3.i(0,"splitAdvantage"))
if(b0==null)b0=0.3
b1=A.S(c3.i(0,"arrivalSpread"))
if(b1==null)b1=20
b2=A.S(c3.i(0,"expeditionSeconds"))
if(b2==null)b2=900
b3=A.S(c3.i(0,"assaultCommitDistance"))
if(b3==null)b3=64
b4=A.S(c3.i(0,"recallCriticalMargin"))
if(b4==null)b4=0.25
b5=A.a1(c3.i(0,"attritionCombat"))
if(b5==null)b5=8
b6=A.S(c3.i(0,"attritionGain"))
if(b6==null)b6=0.06
b7=A.h(c3.i(0,"targets"))
b8=A.h(c3.i(0,"slice"))
b9=A.z(c3.i(0,"advantage"))
c0=A.z(c3.i(0,"expansion"))
c1=A.z(c3.i(0,"credit"))
return A.ll(c7,s,r,new A.cD(c4,d,c,b,c6,p,o,n,m,l,k,j,i,h,g,f,e,a,A.z(c3.i(0,"age")),a0,a1,a2,a3,a4,a5,a6,b7,b8,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b9,c1,c0,A.h(c3.i(0,"timeout")),A.h(c3.i(0,"restarts")),A.z(c3.i(0,"stagnation"))),c8,c5,c2,q)},
ap:function ap(a,b,c,d,e,f,g){var _=this
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
bm(a,b,c,d,e,f){var s,r,q,p,o,n,m=a.a,l=c.u(m),k=A.f(l).h("G<1>"),j=A.X(new A.G(l,k),0,A.U(a.ga2(),"count",t.S),k.h("k.E")).af(0)
if(j.length===0)s=0
else{l=A.f(j)
s=new A.Q(j,l.h("i(1)").a(new A.jq()),l.h("Q<1,i>")).ae(0,B.A)}l=c.r
k=A.f(l)
r=new A.b(l,k.h("e(1)").a(new A.jr(a)),k.h("b<1>")).E(0,0,new A.js(),t.i)
k=a.b
l=c.gak().y.i(0,k)
l=B.c.v(l==null?0:l,0,100)
k=A.aS(k,c,d,null)
if(k.ga6()){q=k.e.w
p=q.z+k.gbb()*q.Q}else p=0
o=e^m*7919
o^=o<<13
o^=o>>>17
if(f==null){m=b.z.H(a.e)
k=d.b.i(0,"marchSpeed")
k.toString
q=d.e
if(0>=q.length)return A.n(q,0)
n=m/(k*q[0])}else n=f
if(a.c===b.b)m=1
else{m=d.b.i(0,"foreignYield")
m.toString}k=d.w
return Math.max(1,160+a.z*m*2+r+p+l/100*k.ay-s*0.25-a.d*6)/Math.pow(1+n/k.ax,1.5)+((o^o<<5)&65535)/65536*0.000001},
jq:function jq(){},
jr:function jr(a){this.a=a},
js:function js(){},
a3:function a3(a,b,c){this.a=a
this.b=b
this.c=c},
ar:function ar(a,b,c,d){var _=this
_.a=a
_.d=b
_.f=c
_.r=d},
ev:function ev(){},
is:function is(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
it:function it(a){this.a=a},
iu:function iu(){},
iv:function iv(a){this.a=a},
iw:function iw(a){this.a=a},
ix:function ix(a){this.a=a},
iy:function iy(a){this.a=a},
iz:function iz(){},
er:function er(a){var _=this
_.a=a
_.d=_.c=_.b=0
_.e=!1},
nu(){var s,r,q=new A.jl(),p=v.G,o="web-worker:"+A.K(p.self.constructor.name)
p=A.j3(p.self)
s=new A.jm(new A.es(q,o,A.b8(t.S)))
if(typeof s=="function")A.cB(A.cE("Attempting to rewrap a JS function.",null))
r=function(a,b){return function(c){return a(b,c,arguments.length)}}(A.mv,s)
r[$.jV()]=s
p.onmessage=r
q.$1(B.i.ar(t.G.a(A.R(["kind","hello","protocol",1,"build","b28d4f34","backend",o],t.N,t.X)),null))},
jl:function jl(){},
jm:function jm(a){this.a=a},
kW(a){return v.mangledGlobalNames[a]},
nA(a){throw A.V(new A.c1("Field '"+a+"' has been assigned during initialization."),new Error())},
P(){throw A.V(A.lH(""),new Error())},
mv(a,b,c){t.k.a(a)
if(A.h(c)>=1)return a.$1(b)
return a.$0()},
kR(a,b,c){A.kK(c,t.H,"T","min")
return Math.min(c.a(a),c.a(b))},
kQ(a,b,c){A.kK(c,t.H,"T","max")
return Math.max(c.a(a),c.a(b))},
nm(a,b,c,d,e,f,g,h){var s,r,q,p,o,n,m,l=null,k=f.H(a),j=!c
if(j&&k>d*b+80)return l
s=h.a
r=h.b
q=Math.sqrt(s*s+r*r)
p=q<0.01?0:((a.a-f.a)*s+(a.b-f.b)*r)/(Math.max(1,k)*q)
if(j&&k>72){if(p<0.45)return l
o=Math.max(0,k*p)
n=new A.v(f.a+s/q*o,f.b+r/q*o)
if(e.a0(n).H(n)>48)return l}m=g.$2(f,e.bY(f,a))
if(isFinite(m))j=!j||m<=b
else j=!1
return j?m:l},
jB(a,b,c){var s=Math.max(0,a-c)
return s*s*b}},B={}
var w=[A,J,B]
var $={}
A.jy.prototype={}
J.cR.prototype={
a7(a,b){return a===b},
gR(a){return A.d8(a)},
q(a){return"Instance of '"+A.d9(a)+"'"},
gS(a){return A.aQ(A.jJ(this))}}
J.cT.prototype={
q(a){return String(a)},
gR(a){return a?519018:218159},
gS(a){return A.aQ(t.y)},
$iB:1,
$ie:1}
J.bX.prototype={
a7(a,b){return null==b},
q(a){return"null"},
gR(a){return 0},
$iB:1}
J.bZ.prototype={$iM:1}
J.aV.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.d6.prototype={}
J.by.prototype={}
J.aU.prototype={
q(a){var s=a[$.kY()]
if(s==null)s=a[$.jV()]
if(s==null)return this.ct(a)
return"JavaScript function for "+J.bo(s)},
$iaI:1}
J.bY.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.c_.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.u.prototype={
l(a,b){A.f(a).c.a(b)
a.$flags&1&&A.cC(a,29)
a.push(b)},
ao(a,b){var s
a.$flags&1&&A.cC(a,"remove",1)
for(s=0;s<a.length;++s)if(J.af(a[s],b)){a.splice(s,1)
return!0}return!1},
G(a,b){var s
A.f(a).h("a<1>").a(b)
a.$flags&1&&A.cC(a,"addAll",2)
if(Array.isArray(b)){this.cB(a,b)
return}for(s=J.H(b);s.j();)a.push(s.gp())},
cB(a,b){var s,r
t.gn.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.j(A.a_(a))
for(r=0;r<s;++r)a.push(b[r])},
aF(a){a.$flags&1&&A.cC(a,"clear","clear")
a.length=0},
aJ(a,b,c){var s=A.f(a)
return new A.Q(a,s.F(c).h("1(2)").a(b),s.h("@<1>").F(c).h("Q<1,2>"))},
dr(a,b){var s,r=A.hj(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.B(r,s,A.w(a[s]))
return r.join(b)},
cg(a,b){return A.X(a,0,A.U(b,"count",t.S),A.f(a).c)},
b2(a,b){return A.X(a,b,null,A.f(a).c)},
ae(a,b){var s,r,q
A.f(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.j(A.aC())
if(0>=s)return A.n(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.j(A.a_(a))}return r},
E(a,b,c,d){var s,r,q
d.a(b)
A.f(a).F(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.j(A.a_(a))}return r},
an(a,b){var s,r,q
A.f(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.j(A.a_(a))}throw A.j(A.aC())},
U(a,b){if(!(b>=0&&b<a.length))return A.n(a,b)
return a[b]},
gD(a){if(a.length>0)return a[0]
throw A.j(A.aC())},
gaH(a){var s=a.length
if(s>0)return a[s-1]
throw A.j(A.aC())},
I(a,b){var s,r
A.f(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.j(A.a_(a))}return!1},
aG(a,b){var s,r
A.f(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.j(A.a_(a))}return!0},
A(a,b){var s,r,q,p,o,n=A.f(a)
n.h("d(1,1)?").a(b)
a.$flags&2&&A.cC(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dQ()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.ds(b,2))
if(p>0)this.cS(a,p)},
cS(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
n(a,b){var s
for(s=0;s<a.length;++s)if(J.af(a[s],b))return!0
return!1},
ga_(a){return a.length===0},
gaz(a){return a.length!==0},
q(a){return A.jx(a,"[","]")},
gC(a){return new J.b2(a,a.length,A.f(a).h("b2<1>"))},
gR(a){return A.d8(a)},
gm(a){return a.length},
B(a,b,c){A.f(a).c.a(c)
a.$flags&2&&A.cC(a)
if(!(b>=0&&b<a.length))throw A.j(A.kL(a,b))
a[b]=c},
dl(a,b){var s
A.f(a).h("e(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$ip:1,
$ia:1,
$iq:1}
J.cS.prototype={
dJ(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.d9(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.hc.prototype={}
J.b2.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.t(q)
throw A.j(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iI:1}
J.br.prototype={
t(a,b){var s
A.z(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaX(b)
if(this.gaX(a)===s)return 0
if(this.gaX(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaX(a){return a===0?1/a<0:a<0},
k(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.j(A.bc(""+a+".toInt()"))},
aw(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.j(A.bc(""+a+".ceil()"))},
Y(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.j(A.bc(""+a+".floor()"))},
aK(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.j(A.bc(""+a+".round()"))},
v(a,b,c){if(B.c.t(b,c)>0)throw A.j(A.n8(b))
if(this.t(a,b)<0)return b
if(this.t(a,c)>0)return c
return a},
b_(a,b){var s
if(b>20)throw A.j(A.b9(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaX(a))return"-"+s
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
aB(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.bR(a,b)},
bh(a,b){return(a|0)===a?a/b|0:this.bR(a,b)},
bR(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.j(A.bc("Result of truncating division is "+A.w(s)+": "+A.w(a)+" ~/ "+A.w(b)))},
bP(a,b){var s
if(a>0)s=this.cW(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cW(a,b){return b>31?0:a>>>b},
gS(a){return A.aQ(t.H)},
$ii:1,
$ia2:1}
J.bW.prototype={
gS(a){return A.aQ(t.S)},
$iB:1,
$id:1}
J.cU.prototype={
gS(a){return A.aQ(t.i)},
$iB:1}
J.b5.prototype={
aP(a,b,c){return a.substring(b,A.lQ(b,c,a.length))},
bv(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.j(B.a0)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
du(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bv(c,s)+a},
t(a,b){var s
A.K(b)
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
gS(a){return A.aQ(t.N)},
gm(a){return a.length},
$iB:1,
$iJ:1}
A.c1.prototype={
q(a){return"LateInitializationError: "+this.a}}
A.ip.prototype={}
A.p.prototype={}
A.k.prototype={
gC(a){var s=this
return new A.r(s,s.gm(s),A.l(s).h("r<k.E>"))},
ga_(a){return this.gm(this)===0},
I(a,b){var s,r,q=this
A.l(q).h("e(k.E)").a(b)
s=q.gm(q)
for(r=0;r<s;++r){if(b.$1(q.U(0,r)))return!0
if(s!==q.gm(q))throw A.j(A.a_(q))}return!1},
aJ(a,b,c){var s=A.l(this)
return new A.Q(this,s.F(c).h("1(k.E)").a(b),s.h("@<k.E>").F(c).h("Q<1,2>"))},
ae(a,b){var s,r,q,p=this
A.l(p).h("k.E(k.E,k.E)").a(b)
s=p.gm(p)
if(s===0)throw A.j(A.aC())
r=p.U(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.U(0,q))
if(s!==p.gm(p))throw A.j(A.a_(p))}return r},
E(a,b,c,d){var s,r,q,p=this
d.a(b)
A.l(p).F(d).h("1(1,k.E)").a(c)
s=p.gm(p)
for(r=b,q=0;q<s;++q){r=c.$2(r,p.U(0,q))
if(s!==p.gm(p))throw A.j(A.a_(p))}return r},
dI(a){var s,r=this,q=A.lI(A.l(r).h("k.E"))
for(s=0;s<r.gm(r);++s)q.l(0,r.U(0,s))
return q}}
A.x.prototype={
T(a,b,c,d){var s,r=this.b
A.cb(r,"start")
s=this.c
if(s!=null){A.cb(s,"end")
if(r>s)throw A.j(A.b9(r,0,s,"start",null))}},
gcK(){var s=J.bn(this.a),r=this.c
if(r==null||r>s)return s
return r},
gcZ(){var s=J.bn(this.a),r=this.b
if(r>s)return s
return r},
gm(a){var s,r=J.bn(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
U(a,b){var s=this,r=s.gcZ()+b
if(b<0||r>=s.gcK())throw A.j(A.jw(b,s.gm(0),s,"index"))
return J.jt(s.a,r)},
af(a){var s,r,q,p=this,o=p.b,n=p.a,m=J.cA(n),l=m.gm(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.k7(0,p.$ti.c)
return n}r=A.hj(s,m.U(n,o),!0,p.$ti.c)
for(q=1;q<s;++q){B.a.B(r,q,m.U(n,o+q))
if(m.gm(n)<l)throw A.j(A.a_(p))}return r}}
A.r.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=J.cA(q),o=p.gm(q)
if(r.b!==o)throw A.j(A.a_(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.U(q,s);++r.c
return!0},
$iI:1}
A.at.prototype={
gC(a){return new A.c3(J.H(this.a),this.b,A.l(this).h("c3<1,2>"))},
gm(a){return J.bn(this.a)}}
A.bQ.prototype={$ip:1}
A.c3.prototype={
j(){var s=this,r=s.b
if(r.j()){s.a=s.c.$1(r.gp())
return!0}s.a=null
return!1},
gp(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iI:1}
A.Q.prototype={
gm(a){return J.bn(this.a)},
U(a,b){return this.b.$1(J.jt(this.a,b))}}
A.b.prototype={
gC(a){return new A.Y(J.H(this.a),this.b,this.$ti.h("Y<1>"))}}
A.Y.prototype={
j(){var s,r
for(s=this.a,r=this.b;s.j();)if(r.$1(s.gp()))return!0
return!1},
gp(){return this.a.gp()},
$iI:1}
A.bU.prototype={
gC(a){return new A.bV(J.H(this.a),this.b,B.U,this.$ti.h("bV<1,2>"))}}
A.bV.prototype={
gp(){var s=this.d
return s==null?this.$ti.y[1].a(s):s},
j(){var s,r,q=this,p=q.c
if(p==null)return!1
for(s=q.a,r=q.b;!p.j();){q.d=null
if(s.j()){q.c=null
p=J.H(r.$1(s.gp()))
q.c=p}else return!1}q.d=q.c.gp()
return!0},
$iI:1}
A.ba.prototype={
gC(a){var s=this.a
return new A.bb(s.gC(s),this.b,A.l(this).h("bb<1>"))}}
A.bR.prototype={
gm(a){var s=this.a,r=s.gm(s)
s=this.b
if(r>s)return s
return r},
$ip:1}
A.bb.prototype={
j(){if(--this.b>=0)return this.a.j()
this.b=-1
return!1},
gp(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gp()},
$iI:1}
A.bS.prototype={
j(){return!1},
gp(){throw A.j(A.aC())},
$iI:1}
A.bz.prototype={
gC(a){return new A.ch(J.H(this.a),this.$ti.h("ch<1>"))}}
A.ch.prototype={
j(){var s,r
for(s=this.a,r=this.$ti.c;s.j();)if(r.b(s.gp()))return!0
return!1},
gp(){return this.$ti.c.a(this.a.gp())},
$iI:1}
A.L.prototype={
sm(a,b){throw A.j(A.bc("Cannot change the length of a fixed-length list"))},
l(a,b){A.az(a).h("L.E").a(b)
throw A.j(A.bc("Cannot add to a fixed-length list"))}}
A.G.prototype={
gm(a){return this.a.length},
U(a,b){var s=this.a
return J.jt(s,s.length-1-b)}}
A.bj.prototype={$r:"+(1,2)",$s:1}
A.aX.prototype={$r:"+(1,2,3)",$s:2}
A.aO.prototype={$r:"+breakthrough,lower,teamSize,upper(1,2,3,4)",$s:3}
A.bC.prototype={$r:"+high,low,selfHigh,selfLow(1,2,3,4)",$s:4}
A.bN.prototype={}
A.bM.prototype={
ga_(a){return this.gm(this)===0},
gaz(a){return this.gm(this)!==0},
q(a){return A.hl(this)},
gam(){return new A.ax(this.dj(),A.l(this).h("ax<ab<1,2>>"))},
dj(){var s=this
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
A.bO.prototype={
gm(a){return this.b.length},
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
gac(){return new A.bf(this.gbI(),this.$ti.h("bf<1>"))},
gaN(){return new A.bf(this.b,this.$ti.h("bf<2>"))}}
A.bf.prototype={
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
$iI:1}
A.cQ.prototype={
a7(a,b){if(b==null)return!1
return b instanceof A.b4&&this.a.a7(0,b.a)&&A.jR(this)===A.jR(b)},
gR(a){return A.ho(this.a,A.jR(this),B.m,B.m)},
q(a){var s=B.a.dr([A.aQ(this.$ti.c)],", ")
return this.a.q(0)+" with "+("<"+s+">")}}
A.b4.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.nr(A.jd(this.a),this.$ti)}}
A.hM.prototype={
$0(){return B.b.Y(1000*this.a.now())},
$S:5}
A.cc.prototype={}
A.iA.prototype={
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
A.hn.prototype={
q(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.bT.prototype={}
A.co.prototype={
q(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iaW:1}
A.a6.prototype={
q(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.kX(r==null?"unknown":r)+"'"},
$iaI:1,
gdO(){return this},
$C:"$1",
$R:1,
$D:null}
A.cH.prototype={$C:"$0",$R:0}
A.cI.prototype={$C:"$2",$R:2}
A.dc.prototype={}
A.db.prototype={
q(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.kX(s)+"'"}}
A.bq.prototype={
a7(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bq))return!1
return this.$_target===b.$_target&&this.a===b.a},
gR(a){return(A.kS(this.a)^A.d8(this.$_target))>>>0},
q(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.d9(this.a)+"'")}}
A.da.prototype={
q(a){return"RuntimeError: "+this.a}}
A.aJ.prototype={
gm(a){return this.a},
ga_(a){return this.a===0},
gac(){return new A.a8(this,A.l(this).h("a8<1>"))},
gam(){return new A.b6(this,A.l(this).h("b6<1,2>"))},
a3(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dm(a)},
dm(a){var s=this.d
if(s==null)return!1
return this.bp(this.bG(s,a),a)>=0},
G(a,b){A.l(this).h("aa<1,2>").a(b).ab(0,new A.hd(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.dn(b)},
dn(a){var s,r,q=this.d
if(q==null)return null
s=this.bG(q,a)
r=this.bp(s,a)
if(r<0)return null
return s[r].b},
B(a,b,c){var s,r,q=this,p=A.l(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bA(s==null?q.b=q.be():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bA(r==null?q.c=q.be():r,b,c)}else q.dq(b,c)},
dq(a,b){var s,r,q,p,o=this,n=A.l(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.be()
r=o.c9(a)
q=s[r]
if(q==null)s[r]=[o.bf(a,b)]
else{p=o.bp(q,a)
if(p>=0)q[p].b=b
else q.push(o.bf(a,b))}},
cd(a,b){var s,r,q=this,p=A.l(q)
p.c.a(a)
p.h("2()").a(b)
if(q.a3(a)){s=q.i(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.B(0,a,r)
return r},
ao(a,b){var s=this.cw(this.b,b)
return s},
aF(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.bd()}},
ab(a,b){var s,r,q=this
A.l(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.j(A.a_(q))
s=s.c}},
bA(a,b,c){var s,r=A.l(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.bf(b,c)
else s.b=c},
cw(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.cz(s)
delete a[b]
return s.b},
bd(){this.r=this.r+1&1073741823},
bf(a,b){var s=this,r=A.l(s),q=new A.hh(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.bd()
return q},
cz(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.bd()},
c9(a){return J.ag(a)&1073741823},
bG(a,b){return a[this.c9(b)]},
bp(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.af(a[r].a,b))return r
return-1},
q(a){return A.hl(this)},
be(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ik9:1}
A.hd.prototype={
$2(a,b){var s=this.a,r=A.l(s)
s.B(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.l(this.a).h("~(1,2)")}}
A.hh.prototype={}
A.a8.prototype={
gm(a){return this.a.a},
ga_(a){return this.a.a===0},
gC(a){var s=this.a
return new A.b7(s,s.r,s.e,this.$ti.h("b7<1>"))},
n(a,b){return this.a.a3(b)}}
A.b7.prototype={
gp(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.a_(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iI:1}
A.a9.prototype={
gm(a){return this.a.a},
gC(a){var s=this.a
return new A.ai(s,s.r,s.e,this.$ti.h("ai<1>"))}}
A.ai.prototype={
gp(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.a_(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iI:1}
A.b6.prototype={
gm(a){return this.a.a},
gC(a){var s=this.a
return new A.c2(s,s.r,s.e,this.$ti.h("c2<1,2>"))}}
A.c2.prototype={
gp(){var s=this.d
s.toString
return s},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.a_(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.ab(s.a,s.b,r.$ti.h("ab<1,2>"))
r.c=s.c
return!0}},
$iI:1}
A.jh.prototype={
$1(a){return this.a(a)},
$S:24}
A.ji.prototype={
$2(a,b){return this.a(a,b)},
$S:35}
A.jj.prototype={
$1(a){return this.a(A.K(a))},
$S:37}
A.am.prototype={
q(a){return this.bT(!1)},
bT(a){var s,r,q,p,o,n=this.cL(),m=this.aS(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.n(m,q)
o=m[q]
l=a?l+A.kd(o):l+A.w(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
cL(){var s,r=this.$s
while($.iX.length<=r)B.a.l($.iX,null)
s=$.iX[r]
if(s==null){s=this.cH()
B.a.B($.iX,r,s)}return s},
cH(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.c(new Array(l),t.Q)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.B(k,q,r[s])}}return A.aK(k,t.K)}}
A.bA.prototype={
aS(){return[this.a,this.b]},
a7(a,b){if(b==null)return!1
return b instanceof A.bA&&this.$s===b.$s&&J.af(this.a,b.a)&&J.af(this.b,b.b)},
gR(a){return A.ho(this.$s,this.a,this.b,B.m)}}
A.bB.prototype={
aS(){return[this.a,this.b,this.c]},
a7(a,b){var s=this
if(b==null)return!1
return b instanceof A.bB&&s.$s===b.$s&&J.af(s.a,b.a)&&J.af(s.b,b.b)&&J.af(s.c,b.c)},
gR(a){var s=this
return A.ho(s.$s,s.a,s.b,s.c)}}
A.bi.prototype={
aS(){return this.a},
a7(a,b){if(b==null)return!1
return b instanceof A.bi&&this.$s===b.$s&&A.mb(this.a,b.a)},
gR(a){return A.ho(this.$s,A.lL(this.a),B.m,B.m)}}
A.bu.prototype={
gS(a){return B.ah},
$iB:1}
A.c6.prototype={}
A.cX.prototype={
gS(a){return B.ai},
$iB:1}
A.bv.prototype={
gm(a){return a.length},
$iah:1}
A.c4.prototype={$ip:1,$ia:1,$iq:1}
A.c5.prototype={$ip:1,$ia:1,$iq:1}
A.cY.prototype={
gS(a){return B.aj},
$iB:1}
A.cZ.prototype={
gS(a){return B.ak},
$iB:1}
A.d_.prototype={
gS(a){return B.al},
$iB:1}
A.d0.prototype={
gS(a){return B.am},
$iB:1}
A.d1.prototype={
gS(a){return B.an},
$iB:1}
A.d2.prototype={
gS(a){return B.ap},
$iB:1}
A.d3.prototype={
gS(a){return B.aq},
$iB:1}
A.c7.prototype={
gS(a){return B.ar},
gm(a){return a.length},
$iB:1}
A.d4.prototype={
gS(a){return B.as},
gm(a){return a.length},
$iB:1,
$ijF:1}
A.cj.prototype={}
A.ck.prototype={}
A.cl.prototype={}
A.cm.prototype={}
A.au.prototype={
h(a){return A.cs(v.typeUniverse,this,a)},
F(a){return A.kv(v.typeUniverse,this,a)}}
A.dj.prototype={}
A.j0.prototype={
q(a){return A.ad(this.a,null)}}
A.di.prototype={
q(a){return this.a}}
A.bD.prototype={$iaM:1}
A.iD.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:27}
A.iC.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:38}
A.iE.prototype={
$0(){this.a.$0()},
$S:23}
A.iF.prototype={
$0(){this.a.$0()},
$S:23}
A.iZ.prototype={
cv(a,b){if(self.setTimeout!=null)self.setTimeout(A.ds(new A.j_(this,b),0),a)
else throw A.j(A.bc("`setTimeout()` not found."))}}
A.j_.prototype={
$0(){this.b.$0()},
$S:3}
A.df.prototype={}
A.j4.prototype={
$1(a){return this.a.$2(0,a)},
$S:62}
A.j5.prototype={
$2(a,b){this.a.$2(1,new A.bT(a,t.l.a(b)))},
$S:49}
A.j8.prototype={
$2(a,b){this.a(A.h(a),b)},
$S:47}
A.aP.prototype={
gp(){var s=this.b
return s==null?this.$ti.c.a(s):s},
cT(a,b){var s,r,q
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
o.d=null}q=o.cT(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.kp
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
o.a=A.kp
throw n
return!1}if(0>=p.length)return A.n(p,-1)
o.a=p.pop()
m=1
continue}throw A.j(A.kf("sync*"))}return!1},
bW(a){var s,r,q=this
if(a instanceof A.ax){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.l(r,q.a)
q.a=s
return 2}else{q.d=J.H(a)
return 2}},
$iI:1}
A.ax.prototype={
gC(a){return new A.aP(this.a(),this.$ti.h("aP<1>"))}}
A.aq.prototype={
q(a){return A.w(this.a)},
$iD:1,
gaO(){return this.b}}
A.hb.prototype={
$0(){this.c.a(null)
this.b.cF(null)},
$S:3}
A.bd.prototype={
ds(a){if((this.c&15)!==6)return!0
return this.b.b.bu(t.al.a(this.d),a.a,t.y,t.K)},
dk(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.dF(q,m,a.b,o,n,t.l)
else p=l.bu(t.B.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.aR(s))){if((r.c&1)!==0)throw A.j(A.cE("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.j(A.cE("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.Z.prototype={
cj(a,b,c){var s,r,q=this.$ti
q.F(c).h("1/(2)").a(a)
s=$.O
if(s===B.j){if(!t.C.b(b)&&!t.B.b(b))throw A.j(A.et(b,"onError",u.c))}else{c.h("@<0/>").F(q.c).h("1(2)").a(a)
b=A.mX(b,s)}r=new A.Z(s,c.h("Z<0>"))
this.b3(new A.bd(r,3,a,b,q.h("@<1>").F(c).h("bd<1,2>")))
return r},
bS(a,b,c){var s,r=this.$ti
r.F(c).h("1/(2)").a(a)
s=new A.Z($.O,c.h("Z<0>"))
this.b3(new A.bd(s,19,a,b,r.h("@<1>").F(c).h("bd<1,2>")))
return s},
cV(a){this.a=this.a&1|16
this.c=a},
aQ(a){this.a=a.a&30|this.a&1
this.c=a.c},
b3(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.b3(a)
return}r.aQ(s)}A.dr(null,null,r.b,t.M.a(new A.iH(r,a)))}},
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
return}m.aQ(n)}l.a=m.aT(a)
A.dr(null,null,m.b,t.M.a(new A.iM(l,m)))}},
aD(){var s=t.F.a(this.c)
this.c=null
return this.aT(s)},
aT(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
cF(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("aT<1>").b(a))A.iK(a,r,!0)
else{s=r.aD()
q.c.a(a)
r.a=8
r.c=a
A.be(r,s)}},
bF(a){var s,r=this
r.$ti.c.a(a)
s=r.aD()
r.a=8
r.c=a
A.be(r,s)},
cG(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aD()
q.aQ(a)
A.be(q,r)},
b7(a){var s=this.aD()
this.cV(a)
A.be(this,s)},
cD(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("aT<1>").b(a)){this.bD(a)
return}this.cE(a)},
cE(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dr(null,null,s.b,t.M.a(new A.iJ(s,a)))},
bD(a){A.iK(this.$ti.h("aT<1>").a(a),this,!1)
return},
bC(a){this.a^=2
A.dr(null,null,this.b,t.M.a(new A.iI(this,a)))},
$iaT:1}
A.iH.prototype={
$0(){A.be(this.a,this.b)},
$S:3}
A.iM.prototype={
$0(){A.be(this.b,this.a.a)},
$S:3}
A.iL.prototype={
$0(){A.iK(this.a.a,this.b,!0)},
$S:3}
A.iJ.prototype={
$0(){this.a.bF(this.b)},
$S:3}
A.iI.prototype={
$0(){this.a.b7(this.b)},
$S:3}
A.iP.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dE(t.fO.a(q.d),t.z)}catch(p){s=A.aR(p)
r=A.bJ(p)
if(k.c&&t.u.a(k.b.a.c).a===s){q=k.a
q.c=t.u.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.jv(q)
n=k.a
n.c=new A.aq(q,o)
q=n}q.b=!0
return}if(j instanceof A.Z&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.u.a(j.c)
q.b=!0}return}if(j instanceof A.Z){m=k.b.a
l=new A.Z(m.b,m.$ti)
j.cj(new A.iQ(l,m),new A.iR(l),t.x)
q=k.a
q.c=l
q.b=!1}},
$S:3}
A.iQ.prototype={
$1(a){this.a.cG(this.b)},
$S:27}
A.iR.prototype={
$2(a,b){A.cw(a)
t.l.a(b)
this.a.b7(new A.aq(a,b))},
$S:34}
A.iO.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bu(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aR(l)
r=A.bJ(l)
q=s
p=r
if(p==null)p=A.jv(q)
o=this.a
o.c=new A.aq(q,p)
o.b=!0}},
$S:3}
A.iN.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.u.a(l.a.a.c)
p=l.b
if(p.a.ds(s)&&p.a.e!=null){p.c=p.a.dk(s)
p.b=!1}}catch(o){r=A.aR(o)
q=A.bJ(o)
p=t.u.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.jv(p)
m=l.b
m.c=new A.aq(p,n)
p=m}p.b=!0}},
$S:3}
A.dg.prototype={}
A.dp.prototype={}
A.cu.prototype={$ikk:1}
A.dn.prototype={
dG(a){var s,r,q
t.M.a(a)
try{if(B.j===$.O){a.$0()
return}A.kE(null,null,this,a,t.x)}catch(q){s=A.aR(q)
r=A.bJ(q)
A.jM(A.cw(s),t.l.a(r))}},
c1(a){return new A.iY(this,t.M.a(a))},
dE(a,b){b.h("0()").a(a)
if($.O===B.j)return a.$0()
return A.kE(null,null,this,a,b)},
bu(a,b,c,d){c.h("@<0>").F(d).h("1(2)").a(a)
d.a(b)
if($.O===B.j)return a.$1(b)
return A.mZ(null,null,this,a,b,c,d)},
dF(a,b,c,d,e,f){d.h("@<0>").F(e).F(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.O===B.j)return a.$2(b,c)
return A.mY(null,null,this,a,b,c,d,e,f)},
cf(a,b,c,d){return b.h("@<0>").F(c).F(d).h("1(2,3)").a(a)}}
A.iY.prototype={
$0(){return this.a.dG(this.b)},
$S:3}
A.j7.prototype={
$0(){A.lx(this.a,this.b)},
$S:3}
A.av.prototype={
cN(){return new A.av(A.l(this).h("av<1>"))},
gC(a){var s=this,r=new A.bg(s,s.r,A.l(s).h("bg<1>"))
r.c=s.e
return r},
gm(a){return this.a},
n(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cI(b)},
cI(a){var s=this.d
if(s==null)return!1
return this.bc(s[this.b8(a)],a)>=0},
l(a,b){var s,r,q=this
A.l(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bE(s==null?q.b=A.jG():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bE(r==null?q.c=A.jG():r,b)}else return q.cA(b)},
cA(a){var s,r,q,p=this
A.l(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jG()
r=p.b8(a)
q=s[r]
if(q==null)s[r]=[p.b6(a)]
else{if(p.bc(q,a)>=0)return!1
q.push(p.b6(a))}return!0},
ao(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bO(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bO(s.c,b)
else return s.cR(b)},
cR(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.b8(a)
r=n[s]
q=o.bc(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bU(p)
return!0},
bE(a,b){A.l(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.b6(b)
return!0},
bO(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bU(s)
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
bU(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.b5()},
b8(a){return J.ag(a)&1073741823},
bc(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.af(a[r].a,b))return r
return-1},
$ikb:1}
A.dm.prototype={}
A.bg.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.j(A.a_(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iI:1}
A.hi.prototype={
$2(a,b){this.a.B(0,this.b.a(a),this.c.a(b))},
$S:41}
A.C.prototype={
gC(a){return new A.r(a,a.length,A.az(a).h("r<C.E>"))},
U(a,b){if(!(b>=0&&b<a.length))return A.n(a,b)
return a[b]},
ga_(a){return a.length===0},
gaz(a){return a.length!==0},
gD(a){var s=a.length
if(s===0)throw A.j(A.aC())
if(0>=s)return A.n(a,0)
return a[0]},
gaH(a){var s,r=a.length
if(r===0)throw A.j(A.aC())
s=r-1
if(!(s>=0))return A.n(a,s)
return a[s]},
aJ(a,b,c){var s=A.az(a)
return new A.Q(a,s.F(c).h("1(C.E)").a(b),s.h("@<C.E>").F(c).h("Q<1,2>"))},
E(a,b,c,d){var s,r,q,p
d.a(b)
A.az(a).F(d).h("1(1,C.E)").a(c)
s=a.length
for(r=s,q=b,p=0;p<s;++p){if(!(p<r))return A.n(a,p)
q=c.$2(q,a[p])
r=a.length
if(s!==r)throw A.j(A.a_(a))}return q},
b2(a,b){return A.X(a,b,null,A.az(a).h("C.E"))},
l(a,b){var s
A.az(a).h("C.E").a(b)
s=a.length
this.sm(a,s+1)
if(!(s<a.length))return A.n(a,s)
a[s]=b},
q(a){return A.jx(a,"[","]")}}
A.F.prototype={
ab(a,b){var s,r,q,p=A.l(this)
p.h("~(F.K,F.V)").a(b)
for(s=this.gac(),s=s.gC(s),p=p.h("F.V");s.j();){r=s.gp()
q=this.i(0,r)
b.$2(r,q==null?p.a(q):q)}},
aM(a,b,c){var s,r=this,q=A.l(r)
q.h("F.K").a(a)
q.h("F.V(F.V)").a(b)
q.h("F.V()?").a(c)
if(r.a3(a)){s=r.i(0,a)
q=b.$1(s==null?q.h("F.V").a(s):s)
r.B(0,a,q)
return q}q=c.$0()
r.B(0,a,q)
return q},
gam(){return this.gac().aJ(0,new A.hk(this),A.l(this).h("ab<F.K,F.V>"))},
a3(a){return this.gac().n(0,a)},
gm(a){var s=this.gac()
return s.gm(s)},
ga_(a){var s=this.gac()
return s.ga_(s)},
q(a){return A.hl(this)},
$iaa:1}
A.hk.prototype={
$1(a){var s=this.a,r=A.l(s)
r.h("F.K").a(a)
s=s.i(0,a)
if(s==null)s=r.h("F.V").a(s)
return new A.ab(a,s,r.h("ab<F.K,F.V>"))},
$S(){return A.l(this.a).h("ab<F.K,F.V>(F.K)")}}
A.hm.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.w(a)
r.a=(r.a+=s)+": "
s=A.w(b)
r.a+=s},
$S:32}
A.ct.prototype={}
A.bt.prototype={
i(a,b){return this.a.i(0,b)},
ab(a,b){this.a.ab(0,this.$ti.h("~(1,2)").a(b))},
ga_(a){return this.a.a===0},
gaz(a){return this.a.a!==0},
gm(a){return this.a.a},
q(a){return A.hl(this.a)},
gaN(){var s=this.a
return new A.a9(s,A.l(s).h("a9<2>"))},
gam(){var s=this.a
return new A.b6(s,A.l(s).h("b6<1,2>"))},
$iaa:1}
A.cf.prototype={}
A.bw.prototype={
G(a,b){var s
A.l(this).h("a<1>").a(b)
for(s=b.gC(b);s.j();)this.l(0,s.gp())},
q(a){return A.jx(this,"{","}")},
E(a,b,c,d){var s,r,q,p
d.a(b)
s=A.l(this)
s.F(d).h("1(1,2)").a(c)
for(s=A.iW(this,this.r,s.c),r=s.$ti.c,q=b;s.j();){p=s.d
q=c.$2(q,p==null?r.a(p):p)}return q},
I(a,b){var s,r,q=A.l(this)
q.h("e(1)").a(b)
for(q=A.iW(this,this.r,q.c),s=q.$ti.c;q.j();){r=q.d
if(b.$1(r==null?s.a(r):r))return!0}return!1},
$ip:1,
$ia:1,
$ijD:1}
A.cn.prototype={
dh(a){var s,r,q,p=this,o=p.cN()
for(s=A.iW(p,p.r,A.l(p).c),r=s.$ti.c;s.j();){q=s.d
if(q==null)q=r.a(q)
if(!a.n(0,q))o.l(0,q)}return o}}
A.bE.prototype={}
A.dk.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cO(b):s}},
gm(a){return this.b==null?this.c.a:this.aC().length},
ga_(a){return this.gm(0)===0},
gac(){if(this.b==null){var s=this.c
return new A.a8(s,A.l(s).h("a8<1>"))}return new A.dl(this)},
B(a,b,c){var s,r,q=this
A.K(b)
if(q.b==null)q.c.B(0,b,c)
else if(q.a3(b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.d0().B(0,b,c)},
a3(a){if(this.b==null)return this.c.a3(a)
return!1},
ab(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.ab(0,b)
s=o.aC()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.j6(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.j(A.a_(o))}},
aC(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.c(Object.keys(this.a),t.s)
return s},
d0(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.W(t.N,t.z)
r=n.aC()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.B(0,o,n.i(0,o))}if(p===0)B.a.l(r,"")
else B.a.aF(r)
n.a=n.b=null
return n.c=s},
cO(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.j6(this.a[a])
return this.b[a]=s}}
A.dl.prototype={
gm(a){return this.a.gm(0)},
U(a,b){var s=this.a
if(s.b==null)s=s.gac().U(0,b)
else{s=s.aC()
if(!(b>=0&&b<s.length))return A.n(s,b)
s=s[b]}return s},
gC(a){var s=this.a
if(s.b==null){s=s.gac()
s=s.gC(s)}else{s=s.aC()
s=new J.b2(s,s.length,A.f(s).h("b2<1>"))}return s},
n(a,b){return this.a.a3(b)}}
A.cJ.prototype={}
A.cL.prototype={}
A.c0.prototype={
q(a){var s=A.cO(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.cW.prototype={
q(a){return"Cyclic error in JSON stringify"}}
A.he.prototype={
dc(a,b){var s=A.mV(a,this.gdd().a)
return s},
ar(a,b){var s=A.m2(a,this.gdi().b,null)
return s},
gdi(){return B.ae},
gdd(){return B.ad}}
A.hg.prototype={}
A.hf.prototype={}
A.iU.prototype={
cl(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.q.aP(a,r,q)
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
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.q.aP(a,r,q)
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
break}}else if(p===34||p===92){if(q>r)s.a+=B.q.aP(a,r,q)
r=q+1
o=A.a0(92)
s.a+=o
o=A.a0(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.q.aP(a,r,m)},
b4(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.j(new A.cW(a,null))}B.a.l(s,a)},
b0(a){var s,r,q,p,o=this
if(o.ck(a))return
o.b4(a)
try{s=o.b.$1(a)
if(!o.ck(s)){q=A.k8(a,null,o.gbJ())
throw A.j(q)}q=o.a
if(0>=q.length)return A.n(q,-1)
q.pop()}catch(p){r=A.aR(p)
q=A.k8(a,r,o.gbJ())
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
q.dL(a)
s=q.a
if(0>=s.length)return A.n(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.b4(a)
r=q.dM(a)
s=q.a
if(0>=s.length)return A.n(s,-1)
s.pop()
return r}else return!1},
dL(a){var s,r=this.c
r.a+="["
if(J.lc(a)){if(0>=a.length)return A.n(a,0)
this.b0(a[0])
for(s=1;s<a.length;++s){r.a+=","
this.b0(a[s])}}r.a+="]"},
dM(a){var s,r,q,p,o,n,m=this,l={}
if(a.ga_(a)){m.c.a+="{}"
return!0}s=a.gm(a)*2
r=A.hj(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.ab(0,new A.iV(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.cl(A.K(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.n(r,n)
m.b0(r[n])}p.a+="}"
return!0}}
A.iV.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.B(s,r.a++,a)
B.a.B(s,r.a++,b)},
$S:32}
A.iT.prototype={
gbJ(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.cM.prototype={
a7(a,b){if(b==null)return!1
return b instanceof A.cM},
gR(a){return B.c.gR(0)},
q(a){return"0:00:00."+B.q.du(B.c.q(0),6,"0")}}
A.dh.prototype={
q(a){return this.aR()},
$icN:1}
A.D.prototype={
gaO(){return A.lN(this)}}
A.cF.prototype={
q(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cO(s)
return"Assertion failed"}}
A.aM.prototype={}
A.aB.prototype={
gba(){return"Invalid argument"+(!this.a?"(s)":"")},
gb9(){return""},
q(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gba()+q+o
if(!s.a)return n
return n+s.gb9()+": "+A.cO(s.gbq())},
gbq(){return this.b}}
A.ca.prototype={
gbq(){return A.S(this.b)},
gba(){return"RangeError"},
gb9(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.w(q):""
else if(q==null)s=": Not greater than or equal to "+A.w(r)
else if(q>r)s=": Not in inclusive range "+A.w(r)+".."+A.w(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.w(r)
return s}}
A.cP.prototype={
gbq(){return A.h(this.b)},
gba(){return"RangeError"},
gb9(){if(A.h(this.b)<0)return": index must not be negative"
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
gaO(){return null},
$iD:1}
A.cd.prototype={
q(a){return"Stack Overflow"},
gaO(){return null},
$iD:1}
A.iG.prototype={
q(a){return"Exception: "+this.a}}
A.aH.prototype={
q(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.a.prototype={
aJ(a,b,c){var s=A.l(this)
return A.lK(this,s.F(c).h("1(a.E)").a(b),s.h("a.E"),c)},
dK(a,b){var s=A.l(this)
return new A.b(this,s.h("e(a.E)").a(b),s.h("b<a.E>"))},
E(a,b,c,d){var s,r
d.a(b)
A.l(this).F(d).h("1(1,a.E)").a(c)
for(s=this.gC(this),r=b;s.j();)r=c.$2(r,s.gp())
return r},
aG(a,b){var s
A.l(this).h("e(a.E)").a(b)
for(s=this.gC(this);s.j();)if(!b.$1(s.gp()))return!1
return!0},
I(a,b){var s
A.l(this).h("e(a.E)").a(b)
for(s=this.gC(this);s.j();)if(b.$1(s.gp()))return!0
return!1},
gm(a){var s,r=this.gC(this)
for(s=0;r.j();)++s
return s},
cg(a,b){return A.kh(this,b,A.l(this).h("a.E"))},
gD(a){var s=this.gC(this)
if(!s.j())throw A.j(A.aC())
return s.gp()},
gaH(a){var s,r=this.gC(this)
if(!r.j())throw A.j(A.aC())
do s=r.gp()
while(r.j())
return s},
U(a,b){var s,r
A.cb(b,"index")
s=this.gC(this)
for(r=b;s.j();){if(r===0)return s.gp();--r}throw A.j(A.jw(b,b-r,this,"index"))},
q(a){return A.lE(this,"(",")")}}
A.ab.prototype={
q(a){return"MapEntry("+A.w(this.a)+": "+A.w(this.b)+")"}}
A.ac.prototype={
gR(a){return A.A.prototype.gR.call(this,0)},
q(a){return"null"}}
A.A.prototype={$iA:1,
a7(a,b){return this===b},
gR(a){return A.d8(this)},
q(a){return"Instance of '"+A.d9(this)+"'"},
gS(a){return A.nk(this)},
toString(){return this.q(this)}}
A.dq.prototype={
q(a){return""},
$iaW:1}
A.iq.prototype={
gc7(){var s,r=this.b
if(r==null)r=$.hO.$0()
s=r-this.a
if($.jW()===1e6)return s
return s*1000},
bx(){var s=this,r=s.b
if(r!=null){s.a=s.a+($.hO.$0()-r)
s.b=null}}}
A.bx.prototype={
gm(a){return this.a.length},
q(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ilT:1}
A.eu.prototype={}
A.aG.prototype={
gbZ(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=t.S,f=A.W(g,g)
for(g=h.y,g=new A.ai(g,g.r,g.e,A.l(g).h("ai<2>")),s=h.a,r=h.z,q=h.Q,p=s.b,o=s.a;g.j();){n=g.d
m=s.Z(n.a)
l=!0
if(n.as){k=n.d
if(k!=null)if(m!=null)if(!m.fx)if(!(m.f<=0)){j=m.a
if(!r.n(0,j)){i=m.as
if(!((i===B.h||i===B.e)&&!q.n(0,j)))if(n.y>=p){l=s.J(k)
l=(l==null?null:l.b)!==o}}}}if(l)continue
n=n.d
n.toString
f.aM(n,new A.dx(),new A.dy())}return f},
N(){var s,r=this,q=r.y,p=A.l(q).h("a9<2>")
q=A.m(new A.a9(q,p),p.h("a.E"))
s=A.k_(r.a,r.b,r.c,q)
s.d=r.d
s.e=r.e
s.f=r.f
s.r=r.r
q=s.w
q.aF(0)
q.G(0,r.w)
q=s.x
q.aF(0)
q.G(0,r.x)
s.z.G(0,r.z)
s.Q.G(0,r.Q)
s.as.G(0,r.as)
s.at.G(0,r.at)
s.ay.G(0,r.ay)
s.ax.G(0,r.ax)
s.ch.G(0,r.ch)
return s},
u(a){var s=this.a.u(a),r=A.f(s),q=r.h("b<1>")
s=A.m(new A.b(s,r.h("e(1)").a(new A.dT(this)),q),q.h("a.E"))
return s},
O(a){var s
if(a.ax==null){s=this.x.i(0,a.a)
if(s==null)s=a.d}else s=a.ga2()
return s},
L(a){var s,r=this.u(a).length,q=this.gbZ().i(0,a)
if(q==null)q=0
s=this.at.n(0,a)?1:0
return r+q+s},
c_(a){var s,r=this,q=r.a.r,p=A.f(q)
p=new A.b(q,p.h("e(1)").a(new A.dz(r,a)),p.h("b<1>")).gm(0)
q=r.gbZ().i(0,a)
if(q==null)q=0
s=r.at.n(0,a)?1:0
return p+q+s},
de(a){return this.ax.n(0,a.a)||this.W(a)?0:1},
W(a){return this.ch.cd(a.a,new A.e5(this,a))},
ce(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=A.b8(t.S)
for(s=J.lg(t.W.a(a),g.b.w.go),s=s.gC(s),r=g.c,q=g.a;s.j();){p=s.gp()
o=q.gM()
n=o.$ti
m=n.h("b<a.E>")
l=A.m(new A.b(o,n.h("e(a.E)").a(new A.dZ(g)),m),m.h("a.E"))
B.a.A(l,new A.e_(p))
o=A.f(l)
n=o.h("x<1>")
m=new A.x(l,0,3,n)
m.T(l,0,3,o.c)
m=new A.r(m,m.gm(0),n.h("r<k.E>"))
p=p.f
n=n.h("k.E")
k=null
j=1/0
while(m.j()){o=m.d
i=o==null?n.a(o):o
o=i.e
h=r.ag(o,p.a0(o))
if(h<j){j=h
k=i}}if(k!=null)f.l(0,k.a)}return f},
aq(a){var s,r,q,p,o,n=this,m=n.a,l=a.c,k=m.J(l)
if(k==null)return!1
if(n.W(k)){if(a.e!==2)m=!(a.x>=15&&a.w<12)
else m=!1
return m}m=m.u(l)
l=A.f(m)
s=l.h("b<1>")
r=A.m(new A.b(m,l.h("e(1)").a(new A.dC(n)),s),s.h("a.E"))
if(r.length<=1)return!1
m=A.f(r)
l=m.h("e(1)")
m=m.h("b<1>")
q=A.aD(new A.b(r,l.a(new A.dD()),m),t.r)
if(q!=null)return a.a!==q.a
s=new A.dH(n,k)
B.a.A(r,new A.dE(s))
p=A.m(new A.b(r,l.a(A.nc()),m),m.h("a.E"))
B.a.A(p,new A.dF())
if(p.length!==0)return a.a!==B.a.gD(p).a
o=s.$1(B.a.gD(r))
if(typeof o!=="number")return o.bv()
return a.a!==new A.b(r,l.a(new A.dG(s,o*0.6)),m).gaH(0).a},
a5(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d="monthSeconds",c=e.b,b=c.b,a=b.i(0,d)
a.toString
s=b.i(0,"budgetSafety")
s.toString
r=Math.min(c.w.p1,a+s)
c=e.a
a=c.r
s=A.f(a)
q=s.h("e(1)")
s=s.h("b<1>")
p=t.S
o=new A.b(a,q.a(new A.dI(e)),s).E(0,e.r,new A.dJ(),p)
n=new A.b(a,q.a(new A.dK(e)),s).E(0,e.r,new A.dL(),p)
s=c.gM()
q=s.$ti
a=q.h("b<a.E>")
m=A.m(new A.b(s,q.h("e(a.E)").a(new A.dM(e)),a),a.h("a.E"))
if(m.length===0)a=0
else{a=c.gak().r
if(a==null){a=b.i(0,"countryIncome")
a.toString
a=B.b.k(a)}}s=A.f(m)
l=new A.dQ(e,o,a+new A.b(m,s.h("e(1)").a(new A.dN(e)),s.h("b<1>")).E(0,0,new A.dO(e),p),n,e.gbr())
k=A.lJ([r],t.i)
j=A.c([],t.n)
i=c.e
c=r+1e-9
h=i
while(h<=c){k.l(0,h)
B.a.l(j,h)
a=b.i(0,d)
a.toString
h+=a}for(c=A.iW(k,k.r,k.$ti.c),a=c.$ti.c,g=0;c.j();){s=c.d
if(s==null)s=a.a(s)
if(s+1e-9<i)f=0
else{q=b.i(0,d)
q.toString
f=1+B.b.Y((s-i)/q)}if(B.a.I(j,new A.dP(s)))g=Math.max(g,A.jc(l.$1(Math.max(0,f-1))))
g=Math.max(g,A.jc(l.$1(f)))}c=Math.max(0,g)
if(a0)b=0
else{b=b.i(0,"emergencyGold")
b.toString
b=B.b.k(b)}return new A.eu(c+b)},
V(){return this.a5(!1)},
aA(a,b){var s,r,q,p,o,n,m,l,k=this,j="capacityPerLevel",i=!0
if(a.as)if(!k.ay.n(0,a.a))if(b.dy){i=b.a
i=k.z.n(0,i)||k.Q.n(0,i)}if(i)return!1
i=k.x
s=a.a
r=i.i(0,s)
r.toString
q=k.b
p=q.c
o=p.length
if(r>o)n=null
else{m=r-1
if(!(m>=0))return A.n(p,m)
n=B.c.v(p[m]-b.x,0,99999)}if(r>=q.ah(k.a.c)||n==null||k.d<=n)return!1
if(a.b===a.c)l=1
else{p=q.b.i(0,"foreignYield")
p.toString
l=p}p=k.f
o=r+1
q=q.b
m=q.i(0,j)
m.toString
m=B.b.Y(o*B.b.k(m)*l)
q=q.i(0,j)
q.toString
k.f=p+(m-B.b.Y(r*B.b.k(q)*l))
k.d=k.d-n
i.B(0,s,o)
k.ay.l(0,s)
return!0},
gbr(){return this.a.gM().E(0,0,new A.dU(this),t.S)},
bm(a){var s,r,q,p,o,n=this
if(!a.dx||a.e===2||n.z.n(0,a.a))return!1
s=a.as
r=s!==B.h
if(!r||s===B.e){q=a.c
q=!n.ax.n(0,q)&&n.u(q).length<=1}else q=!1
if(q)return!1
q=a.a
n.z.l(0,q)
n.y.ao(0,q)
n.as.l(0,q)
n.d=n.d+a.x
q=n.f
p=n.e
n.e=Math.min(q,p+(!r||s===B.e?a.gP():0))
if(!r||s===B.e)for(s=a.ax,r=s.length,q=n.w,o=0;o<r;++o)q.aM(s[o],new A.dR(),new A.dS())
return!0},
gbX(){var s=this.d,r=this.b.b.i(0,"soldierCost")
r.toString
return Math.max(0,B.c.aB(s,B.b.k(r)))},
av(a){var s,r=this,q=r.b.b.i(0,"soldierCost")
q.toString
s=a*B.b.k(q)
if(a>0){q=r.d
q=q<=0||s>q||r.e+a>r.f}else q=!0
if(q)return!1
r.d-=s
r.e+=a
return!0},
c2(a){var s=this,r=s.b.r.i(0,a),q=!0
if(r!=null)if(r.f)if(s.a.c>=r.e){q=s.d
q=q<=0||q<r.b}if(q)return!1
s.d=s.d-r.b
s.w.aM(a,new A.dA(),new A.dB())
return!0},
bt(a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d="drawCost",c=e.b,b=c.b,a=b.i(0,d)
a.toString
s=e.a
r=s.y
q=B.b.k(a)+r
a=s.r
p=A.f(a)
o=t.S
n=new A.b(a,p.h("e(1)").a(new A.dV(e)),p.h("b<1>")).E(0,e.r+r,new A.dW(),o)
p=s.gak().r
if(p==null){a=b.i(0,"countryIncome")
a.toString
a=B.b.k(a)}else a=p
p=s.gM()
m=p.$ti
l=a+new A.b(p,m.h("e(a.E)").a(new A.dX(e)),m.h("b<a.E>")).E(0,0,new A.dY(e),o)
o=b.i(0,"garrisonFree")
k=B.b.k(o==null?2:o)
a=b.i(0,"garrisonFactor")
j=B.b.k(a==null?0:a)
a=a0.a
i=e.L(a)
h=e.gbr()+A.jB(i+1,j,k)-A.jB(i,j,k)
p=a1?1.3:1.1
if(n+h<=l*p){if(a1)c=1
else if(a2==null)c=c.w.r
else{c=A.aS(a2,s,c,null)
p=c.e.w
if(c.ga6()){o=p.r
c=Math.max(o,Math.min(p.as,o+c.gaW()*0.2))}else c=p.r}g=n<=l*c}else g=!1
f=(s.c>=3||a1)&&e.d-q>=e.a5(a1).a+r+Math.max(0,h-e.gbr())
c=!0
if(a0.Q){p=e.at
if(!p.n(0,a))if(s.x>p.a){s=e.d
b=b.i(0,d)
b.toString
if(s>B.b.k(b))if(e.d>=q)c=!(g||f)}}if(c)return!1
e.d-=q
e.r+=r
e.at.l(0,a)
return!0},
dA(a,b){return this.bt(a,!1,b)},
dz(a,b){return this.bt(a,b,null)},
df(a,b,c){var s,r,q,p,o,n,m,l=this
t.L.a(b)
if(a.cy){s=a.a
s=l.as.n(0,s)||l.z.n(0,s)}else s=!0
if(s)return!1
s=a.c
r=!1
if(l.u(s).length<=1){q=l.a
if(q.J(s)!=null){q=q.J(s)
q.toString
q=l.W(q)}else q=!1
if(!q){r=!(l.ax.n(0,s)&&c.b==="evacuate"&&c.as)
s=r}else s=r}else s=r
if(s)return!1
s=l.w
r=t.S
p=A.ka(s,r,r)
r=b.length
q=l.b.b
o=q.i(0,"carryLimit")
o.toString
if(r>B.b.k(o))return!1
for(r=b.length,n=0;n<b.length;b.length===r||(0,A.t)(b),++n){m=b[n]
o=p.i(0,m)
if((o==null?0:o)===0)return!1
o=p.i(0,m)
o.toString
p.B(0,m,o-1)}s.aF(0)
s.G(0,p)
s=l.e
q=q.i(0,"soldierLimit")
q.toString
l.e=s-Math.min(s,B.b.k(q)-a.gP())
q=a.a
l.Q.l(0,q)
l.as.l(0,q)
l.y.B(0,q,c)
return!0},
dB(a,b){var s
if(!a.db||this.as.n(0,a.a)||a.fx)return!1
s=a.a
this.as.l(0,s)
this.y.B(0,s,b)
return!0}}
A.dx.prototype={
$1(a){return A.h(a)+1},
$S:7}
A.dy.prototype={
$0(){return 1},
$S:5}
A.dT.prototype={
$1(a){var s=this.a,r=t.r.a(a).a
return!s.z.n(0,r)&&!s.Q.n(0,r)},
$S:0}
A.dz.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.c===this.b&&a.f>0&&!a.fx&&!s.z.n(0,a.a)},
$S:0}
A.e5.prototype={
$0(){var s,r,q,p,o,n,m,l,k,j=new A.e6(),i=this.b,h=this.a,g=h.a
if(i.b===g.a){s=g.gM().gm(0)
r=j.$1(i)
q=h.b
p=q.b.i(0,"marchSpeed")
p.toString
o=B.a.ae(q.e,B.A)
n=g.f
m=A.f(n)
l=m.h("e(1)").a(new A.e0(h))
j=m.h("+(v,i)(1)").a(new A.e1(j))
g=g.r
k=A.f(g)
q=A.nz(i.e,new A.at(new A.b(g,k.h("e(1)").a(new A.e2(h)),k.h("b<1>")),k.h("+(v,e)(1)").a(new A.e3(i)),k.h("at<1,+(v,e)>")),new A.at(new A.b(n,l,m.h("b<1>")),j,m.h("at<1,+(v,i)>")),p*o,i.ax!=null,s,r,q.w.b)
j=q}else j=!1
return j},
$S:39}
A.e6.prototype={
$1(a){return B.a.E(a.f.a,0,new A.e4(a),t.i)},
$S:42}
A.e4.prototype={
$2(a,b){return Math.max(A.ao(a),this.a.e.H(t.c1.a(b)))},
$S:46}
A.e0.prototype={
$1(a){return t.q.a(a).b!==this.a.a.a},
$S:1}
A.e1.prototype={
$1(a){t.q.a(a)
return new A.bj(a.e,this.a.$1(a))},
$S:48}
A.e2.prototype={
$1(a){var s
t.r.a(a)
if(a.b!==this.a.a.a){s=a.as
s=!(s===B.h||s===B.e)&&!a.fx&&a.f>0}else s=!1
return s},
$S:0}
A.e3.prototype={
$1(a){t.r.a(a)
return new A.bj(a.z,a.p2===this.a.a)},
$S:52}
A.dZ.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.a
r=a.a
q=!1
if(!s.ax.n(0,r))if(a.Q)s=a.ax==null||s.L(r)<s.O(a)
else s=q
else s=q
return s},
$S:1}
A.e_.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.H(s),b.e.H(s))},
$S:4}
A.dC.prototype={
$1(a){return!this.a.z.n(0,t.r.a(a).a)},
$S:0}
A.dD.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.dH.prototype={
$1(a){var s=this.a,r=s.b,q=s.O(this.b),p=r.b.i(0,"soldierLimit")
p.toString
return A.dt(a,r,q,Math.min(B.b.k(p),s.e))},
$S:25}
A.dE.prototype={
$2(a,b){var s,r=t.r
r.a(a)
s=this.a
return J.lb(s.$1(r.a(b)),s.$1(a))},
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
if(typeof s!=="number")return s.dP()
return s>=this.b},
$S:0}
A.dI.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.n(0,a.a)},
$S:0}
A.dJ.prototype={
$2(a,b){return A.h(a)+t.r.a(b).y},
$S:9}
A.dK.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=s.a
return a.b===r.a&&a.f>0&&!s.z.n(0,a.a)&&a.p3===r.d},
$S:0}
A.dL.prototype={
$2(a,b){return A.h(a)+t.r.a(b).y},
$S:9}
A.dM.prototype={
$1(a){return!this.a.ax.n(0,t.q.a(a).a)},
$S:1}
A.dN.prototype={
$1(a){return!this.a.ax.n(0,t.q.a(a).a)},
$S:1}
A.dO.prototype={
$2(a,b){var s,r,q,p
A.h(a)
t.q.a(b)
s=this.a
r=s.x.i(0,b.a)
r.toString
s=s.b.b
q=s.i(0,"incomeStep")
q.toString
q=B.b.k(q)
if(b.b===b.c)p=1
else{p=s.i(0,"foreignYield")
p.toString}p=B.b.Y((b.z+(r-1)*q)*p)
s=s.i(0,"poorPenalty")
s.toString
return a+p-B.b.k(s)},
$S:8}
A.dQ.prototype={
$1(a){var s,r,q,p=this
if(a===0)s=0
else{s=p.a
r=s.a
q=r.gak()
s=s.b.b.i(0,"monthSeconds")
s.toString
s=a*(p.b-p.c)-p.d+B.b.aw(q.w+p.e*(r.e/s+a-1))}return s},
$S:7}
A.dP.prototype={
$1(a){return Math.abs(A.ao(a)-this.a)<1e-7},
$S:14}
A.dU.prototype={
$2(a,b){var s,r,q
A.h(a)
s=this.a
r=s.L(t.q.a(b).a)
s=s.b.b
q=s.i(0,"garrisonFree")
q=B.b.k(q==null?2:q)
s=s.i(0,"garrisonFactor")
return a+A.jB(r,B.b.k(s==null?0:s),q)},
$S:8}
A.dR.prototype={
$1(a){return A.h(a)+1},
$S:7}
A.dS.prototype={
$0(){return 1},
$S:5}
A.dA.prototype={
$1(a){return A.h(a)+1},
$S:7}
A.dB.prototype={
$0(){return 1},
$S:5}
A.dV.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.n(0,a.a)},
$S:0}
A.dW.prototype={
$2(a,b){return A.h(a)+t.r.a(b).y},
$S:9}
A.dX.prototype={
$1(a){return!this.a.ax.n(0,t.q.a(a).a)},
$S:1}
A.dY.prototype={
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
$S:8}
A.ew.prototype={
ga6(){var s=this
return s.a!==s.d.a&&s.b>=s.e.w.w},
gbb(){return Math.max(0,this.b-this.e.w.w)},
gaW(){if(this.ga6()){var s=this.e.w
s=Math.max(0,s.x+this.gbb()*s.y)}else s=0
return s},
ci(a,b){return a===0||!this.ga6()||b<=1?a:Math.min(this.e.w.fy,a+1+B.c.bh(this.gbb(),2))}}
A.ex.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.ey.prototype={
$2(a,b){var s,r
A.h(a)
t.q.a(b)
s=this.a
s=s==null?null:s.i(0,b.a)
if(s==null)s=b.d
r=this.b.b.i(0,"incomeStep")
r.toString
return a+b.z+(s-1)*B.b.k(r)},
$S:8}
A.b3.prototype={
aR(){return"CombatAdvantage."+this.b}}
A.bL.prototype={}
A.ez.prototype={
ai(b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5=this,b6="soldierHp",b7=t.eg
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
j=b8.a+":"+A.w(n)+":"+b8.w+":"+A.w(m)+":"+A.w(b8.ay)+":"+b9.a+":"+A.w(l)+":"+b9.w+":"+A.w(k)+":"+A.w(b9.ay)+":"+c6+":"+c0+":"+c9+":"+q+":"+o+":"+A.w(s)+":"+A.w(r)+":"+c3+":"+c7+":"+c2
i=b5.c
h=i.i(0,j)
if(h!=null)return h
if(!b5.b.d1())return B.a3
if(b7)b7=B.a.E(m,0,new A.eA(),t.H)
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
if(p&&c3===0)p=B.a.E(k,0,new A.eB(),t.H)
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
else if(b0>b2)b3=B.f
else{b7=b1<-b2?B.p:B.a2
b3=b7}b7=A.c([],t.s)
if(c6>0||c0>0)b7.push("\u57ce\u9632\u589e\u52a0\u653b\u51fb\u4e0e\u5f00\u573a\u58eb\u6c14\uff0c\u5b88\u65b9\u6b66\u5668\u8d21\u732e\u4e3a\u96f6")
if(s.length>1)b7.push("\u672c\u6b21\u5bf9\u9635\u53ea\u8ba1\u9996\u4ef6\u6b66\u5668\uff0c\u5176\u4f59\u7559\u5f85\u4e0b\u4e00\u4f4d\u5b88\u5c06")
if(a4)b7.push("\u5b58\u5728\u5148\u624b\u81f4\u547d\u6216\u81ea\u4f24\u98ce\u9669")
b7.push("\u4f59\u91cf\u4e3a\u9759\u6001\u98ce\u9669\u6307\u6807\uff0c\u5e76\u975e\u80dc\u7387")
b4=new A.bL(b3,b0,b1,k,l,a4)
if(i.a>=256)i.ao(0,new A.a8(i,A.l(i).h("a8<1>")).gD(0))
i.B(0,j,b4)
return b4},
d6(a,b,c,d,e,f){return this.ai(a,b,c,null,!0,0,d,e,0,!0,f,0)},
d9(a,b,c,d,e,f,g,h){return this.ai(a,b,c,null,d,0,e,f,0,g,h,0)},
bk(a,b,c,d){return this.ai(a,b,0,null,!0,0,null,null,c,!0,d,0)},
c4(a,b,c,d,e){return this.ai(a,b,c,null,d,0,e,null,0,!0,null,0)},
bl(a,b,c,d,e,f){return this.ai(a,b,0,null,c,0,null,null,d,e,f,0)},
d4(a,b,c,d,e){var s=null
return this.ai(a,b,0,s,c,0,s,s,0,d,s,e)},
d8(a,b,c,d,e,f,g){return this.ai(a,b,0,null,c,0,null,d,0,e,f,g)},
d7(a,b,c,d,e,f){return this.ai(a,b,0,c,d,0,null,null,e,!0,f,0)},
d5(a,b,c,d,e){return this.ai(a,b,0,null,!0,c,null,null,d,!0,e,0)},
bK(a,b,c,d,e){var s,r,q=this.a,p=q.bj(a.w,c,e,d),o=q.b.i(0,"soldierPower")
o.toString
o=B.b.k(o)
s=B.b.aK(a.ay)
r=q.cb(s,e?0:c)
return(B.c.bh(p+b*o+2,4)+1)*1.5*(1+B.b.v(r/1000,0,0.1))},
bV(a,b,c){var s,r,q,p,o,n,m,l,k
t.L.a(a)
if(!b)return new A.bC([0,0,0,0])
for(s=this.a,r=s.r,s=s.b,q=0,p=0,o=0,n=0,m=0;l=a.length,m<Math.min(l,1);++m){if(!(m<l))return A.n(a,m)
k=r.i(0,a[m])
if(k==null)continue
l=m===0
if(l&&c){q+=k.c
o+=k.d}if(!(l&&c)){l=s.i(0,"weaponChance")
l.toString
l=l>0}else l=!0
if(l){p+=k.c
n+=k.d}}return new A.bC([p,q,n,o])}}
A.eA.prototype={
$2(a,b){return A.z(a)+A.ao(b)},
$S:15}
A.eB.prototype={
$2(a,b){return A.z(a)+A.ao(b)},
$S:15}
A.jg.prototype={
$2(a,b){var s
A.z(a)
s=this.a.r.i(0,A.h(b))
s=s==null?null:s.c
if(s==null)s=0
return a+s*this.b.w},
$S:68}
A.cD.prototype={
K(){var s=this
return A.R(["interval",s.a,"resourceInterval",s.e,"cashBuffer",s.f,"payrollRatio",s.r,"dangerousCountryCities",s.w,"coalitionBudgetBase",s.x,"coalitionBudgetStep",s.y,"coalitionTargetBase",s.z,"coalitionTargetStep",s.Q,"coalitionPayrollCeiling",s.as,"coalitionTravel",s.at,"targetTravelScale",s.ax,"hatredTargetBonus",s.ay,"breakthroughMargin",s.ch,"threat",s.b,"urgent",s.c,"margin",s.d,"commit",s.CW,"rearExtra",s.cy,"candidates",s.db,"assessments",s.dx,"routes",s.dy,"plans",s.fr,"commands",s.fx,"team",s.fy,"fronts",s.k1,"singleFrontMonths",s.k2,"splitForce",s.k3,"splitAdvantage",s.k4,"arrivalSpread",s.ok,"expeditionSeconds",s.p1,"assaultCommitDistance",s.p2,"recallCriticalMargin",s.p3,"attritionCombat",s.p4,"attritionGain",s.R8,"targets",s.go,"slice",s.id,"advantage",s.RG,"expansion",s.ry,"credit",s.rx,"age",s.cx,"timeout",s.to,"restarts",s.x1,"stagnation",s.x2],t.N,t.X)}}
A.aw.prototype={}
A.eD.prototype={
by(){return new A.ax(this.cs(),t.gL)},
cs(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9,k0,k1,k2,k3
return function $async$by(k4,k5,k6){if(k5===1){p.push(k6)
r=q}for(;;)switch(r){case 0:k1={}
k2=s.c
k3=s.a
if(k2.b!==k3.a||k2.c!==s.b.a)throw A.j(B.a8)
o=k2.Q
n=o.f
if(n.length>64||o.r.length>256||o.w.length>32)throw A.j(B.a9)
m=s.e
m===$&&A.P()
l=s.f
l===$&&A.P()
k=new A.is(o,k3,m,l)
j=o.gM(),i=J.H(j.a),j=new A.Y(i,j.b,j.$ti.h("Y<1>")),h=s.x
case 3:if(!j.j()){r=4
break}g=i.gp()
h.B(0,g.a,k.dC(g))
r=5
return k4.b=0,1
case 5:r=3
break
case 4:j=k2.as
i=A.f(j)
g=i.h("b<1>")
j=A.m(new A.b(j,i.h("e(1)").a(new A.f0(s)),g),g.h("a.E"))
f=A.k_(o,k3,m,j)
k1.a=f
j=k2.x
r=j===B.G?6:7
break
case 6:o=s.r
o===$&&A.P()
s.w=new A.hP(k2,k3,o,l,h).dv(f)
r=8
return k4.b=1,1
case 8:r=1
break
case 7:i=t.Z
e=A.c([],i)
g=t.s
d=A.c([],g)
c=s.d
b=s.r
b===$&&A.P()
a=new A.fo(k2,k3,c,l,b,h)
a0=A.l(h).h("a9<2>")
a1=a0.h("b<a.E>")
a2=A.m(new A.b(new A.a9(h,a0),a0.h("e(a.E)").a(new A.f1()),a1),a1.h("a.E"))
B.a.A(a2,new A.f2())
a0=t.bQ
a3=A.c([new A.aw(k1.a,A.c([],i),A.c([],g),0,0)],a0)
a1=j===B.o
a4=a1?A.c([],t.bL):a2
a5=a4.length
a6=t.N
a7=t.S
a8=k3.w
a9=a8.fx
b0=t.I
b1=t.dp
b2=t.aQ
b3=a8.fr
b4=0
case 9:if(!(b4<a4.length)){r=11
break}b5=a4[b4]
b6=A.c([],a0)
b7=a3.length,b8=0
case 12:if(!(b8<a3.length)){r=14
break}b9=a3[b8]
c0=a.c3(b5,b9.a),c1=c0.$ti,c0=new A.aP(c0.a(),c1.h("aP<1>")),c2=b9.d,c3=b9.e,c4=b9.c,c5=b9.b,c1=c1.c
case 15:if(!c0.j()){r=16
break}c6=c0.b
if(c6==null)c6=c1.a(c6)
c7=A.m(c5,b0)
B.a.G(c7,c6.b)
if(B.a.E(c7,0,new A.fd(),a7)>a9){c.e=!0
r=15
break}c8=c6.a
c9=A.m(c4,a6)
d0=c6.e
if(d0.length!==0)c9.push(d0)
d0=c6.c
c6=c6.d?1:0
B.a.l(b6,new A.aw(c8,c7,c9,c2+d0,c3+c6))
r=17
return k4.b=1,1
case 17:r=15
break
case 16:case 13:a3.length===b7||(0,A.t)(a3),++b8
r=12
break
case 14:if(b6.length!==0){B.a.A(b6,new A.fh())
b7=A.h(Math.min(4,b3))
c0=new A.x(b6,0,b7,b2)
c0.T(b6,0,b7,b1)
a3=c0.af(0)}case 10:a4.length===a5||(0,A.t)(a4),++b4
r=9
break
case 11:if(a2.length!==0&&!a1){d1=B.a.gD(a3)
k1.a=d1.a
B.a.G(e,d1.b)
B.a.G(d,d1.c)
a0=d1.e
if(a0>0){a0=""+a0
B.a.l(d,c.e?"\u89c4\u5212\u914d\u989d\u5df2\u7528\u5c3d\uff1a"+a0+" \u5ea7\u57ce\u5c1a\u672a\u627e\u5230\u5b8c\u6574\u65b9\u6848\uff0c\u4e0d\u80fd\u636e\u6b64\u65ad\u5b9a\u65e0\u6cd5\u633d\u6551":"unsalvageableDefense\uff1a"+a0+" \u5ea7\u57ce\u5728\u5f53\u524d\u9501\u5b9a\u3001\u8d44\u91d1\u6216\u65f6\u9650\u4e0b\u672a\u627e\u5230\u5b8c\u6574\u4fee\u590d\u65b9\u6848")}d2="defending"}else d2="preparing"
if(a2.length!==0)d2="defending"
if(!a1){d3=s.cQ(k1.a)
if(d3!=null){k1.a=d3.a
B.a.l(e,d3.b)
B.a.l(d,"\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5176\u4ed6\u5b89\u5168\u57ce\u6c60\u7ee7\u7eed\u7ec4\u7ec7\u8fdb\u653b")}}r=18
return k4.b=2,1
case 18:for(a0=o.r,a1=A.f(a0),a4=a1.h("e(1)"),a5=a4.a(new A.fi(s)),a1=a1.h("b<1>"),b0=a1.h("e(a.E)").a(new A.fj(s)),a5=new A.b(a0,a5,a1).gC(0),b0=new A.Y(a5,b0,a1.h("Y<a.E>")),b1=t.w,b2=t.e,b3=t.Y,b7=k3.b;b0.j();){c0=a5.gp()
if(c0.e!==1||c0.f>=c0.r*0.25||c0.k1<2||c0.k2<=0||B.a.I(c0.ax,new A.fk(s)))continue
d4=o.Z(c0.id)
if(d4!=null){c1=c0.gbn()
c2=c0.k2
c3=d4.gbn()
c4=Math.max(1,c0.k3)
c5=b7.i(0,"retreatSurvivalRatio")
c5.toString
c5=c1/c2>=c3/c4*c5
c1=c5}else c1=!0
if(c1)continue
c1=k1.a
c2=c0.a
if(c1.as.n(0,c2))continue
k1.a.as.l(0,c2)
c1=A.c([new A.y(B.Q,c2,null,null,0,B.d)],b1)
c2=A.c([c0,d4],b2)
c0=o.J(c0.c)
c0.toString
B.a.l(e,new A.N("\u9ad8\u7ea7\u5c06\u9886\u751f\u547d\u4f4e\u4e8e\u56db\u5206\u4e4b\u4e00\uff0c\u5df2\u53d1\u751f\u7684\u4f24\u5bb3\u663e\u793a\u80dc\u671b\u6e3a\u832b\uff0c\u7533\u8bf7\u6709\u98ce\u9669\u7684\u5408\u6cd5\u64a4\u9000",c1,b.aa(c2,A.c([c0],b3)),B.r,0,!0))}r=19
return k4.b=3,1
case 19:a5=a1.h("a.E")
d5=A.m(new A.b(a0,a4.a(new A.fl(k1,s)),a1),a5)
b0=d5.length,c0=o.b,c1=o.a,c2=t.m,c3=t._,c4=a8.x2,c5=c4*60,b4=0
case 20:if(!(b4<d5.length)){r=22
break}d6=d5[b4]
c6=d6.a
if(k1.a.as.n(0,c6)){r=21
break}d7=k1.a.y.i(0,c6)
d8=s.cM(d6,d7)
c7=d7==null
c8=!c7
d9=c8&&d7.y<c0
e0=!1
if((c7?null:d7.b)==="expedition")if((c7?null:d7.e)!=null){c9=o.J(c7?null:d7.d)
c9=c9==null?null:c9.b
if(c9!=(c7?null:d7.e)){c9=o.J(c7?null:d7.d)
c9=(c9==null?null:c9.b)!==c1}else c9=e0
e0=c9}e1=c8&&d6.as===B.n&&!d6.p4&&d7.x+1>=d7.w.length
c9=d6.as===B.n
if(c9)if(!d6.p4){e2=!0
if(c8)if(!d9)d0=e1&&B.a.n(A.c(["intercept","standby"],g),d7.b)
else d0=e2
else d0=e2
e2=d0}else e2=!1
else e2=!1
d0=!e0
e3=!d0||e1||e2||d8
if(d0)d0=e1&&d7.b==="expedition"||e2
else d0=!0
if(d0&&d6.f>=d6.r*0.65){e4=s.cP(k1.a,d6,d7)
if(e4!=null){k1.a=e4.a
B.a.l(e,e4.b)
r=21
break}if(c.e){r=21
break}}if((c7?null:d7.as)===!0){d0=c7?null:d7.d
d0=d6.CW==d0&&!d9&&!e3}else d0=!1
if(d0){r=21
break}if((c7?null:d7.b)==="intercept")if(o.Z(c7?null:d7.r)!=null){d0=h.i(0,c7?null:d7.d)
if(d0==null)d0=null
else d0=d0.d.length!==0||d0.a.ax!=null
d0=d0!==!0
e5=d0}else e5=!0
else e5=!1
d0=!e3
if(d0&&e5&&d7.z>c0&&d6.f>=d6.r*0.65){r=21
break}if(c8&&d0&&!d9&&!e5&&d7.z>c0&&!A.kI(d6,o,k1.a,k3)&&d6.f>=d6.r*0.5){r=21
break}e6=d6.p4
if(e6&&c8&&!d9&&!d8){r=21
break}e7=A.jO(d6,o,k1.a)
c8=!1
if(d0)if(A.kI(d6,o,k1.a,k3))c8=d6.f>=d6.r*0.25||o.u(e7.a).length===0
if(c8){B.a.l(d,c6+"\u5df2\u4e34\u8fd1\u4e3b\u653b\u76ee\u6807\uff0c\u4fdd\u6301\u8fdb\u653b\uff0c\u4e0d\u56e0\u666e\u901a\u9884\u8b66\u6216\u6574\u5907\u9884\u7b97\u6298\u8fd4")
r=21
break}if((c7?null:d7.b)==="expedition"&&d0&&!d9&&d6.f>=d6.r*0.65&&d7.x+1<d7.w.length){r=21
break}if(d0&&!e5&&!d9&&d6.f>=d6.r*0.65&&!c9){r=21
break}c8=o.gM()
d0=c8.$ti
e8=d0.h("b<a.E>")
e9=A.m(new A.b(c8,d0.h("e(a.E)").a(new A.fm(k1,s,d9,d7)),e8),e8.h("a.E"))
B.a.A(e9,new A.fn(d6))
c8=A.f(e9)
d0=c8.h("x<1>")
e8=new A.x(e9,0,3,d0)
e8.T(e9,0,3,c8.c)
e8=new A.r(e8,e8.gm(0),d0.h("r<k.E>"))
c8=d6.f<d6.r*0.65
d0=d0.h("k.E")
while(e8.j()){f0=e8.d
if(f0==null)f0=d0.a(f0)
if(!c.X())break
f1=m.ap(d6,f0.e,o,!0,f0)
f2=k1.a
f3=f0.a
f4=h.i(0,f3)
if(f4==null)f4=null
else f4=f4.d.length!==0||f4.a.ax!=null
if(d8)f5="\u653b\u57ce\u6b66\u5668\u5df2\u6d88\u8017\uff0c\u5f53\u524d\u968f\u519b\u5175\u529b\u4e0d\u8db3\u4ee5\u5b89\u5168\u7ee7\u7eed\uff0c\u56de\u57ce\u8865\u88c5\u540e\u91cd\u65b0\u7ec4\u7ec7\u8fdb\u653b"
else if(c8)f5="\u5c06\u9886\u53d7\u4f24\uff0c\u56de\u57ce\u6062\u590d\u751f\u547d\u540e\u518d\u6218"
else if(e0)f5="\u76ee\u6807\u6613\u4e3b\u540e\u539f\u57ce\u4e0e\u9644\u8fd1\u654c\u57ce\u5747\u4e0d\u9002\u5408\u7ee7\u7eed\u8fdb\u653b\uff0c\u56de\u57ce\u6574\u5907"
else if(e1)f5="\u539f\u8def\u7ebf\u6301\u7eed\u53d7\u963b\uff0c\u91cd\u65b0\u9009\u62e9\u6709\u5b89\u5168\u540d\u989d\u7684\u57ce\u6c60\u6574\u5907"
else if(d9)f5="\u539f\u4efb\u52a1\u5df2\u8d85\u8fc7\u6267\u884c\u65f6\u9650\uff0c\u56de\u57ce\u91cd\u65b0\u6574\u5907"
else f5=e5?"\u622a\u51fb\u76ee\u6807\u5df2\u6d88\u5931\uff0c\u56de\u57ce\u7ed3\u675f\u672c\u6b21\u4efb\u52a1":"\u91ce\u5916\u6307\u4ee4\u5df2\u5b8c\u6210\uff0c\u56de\u57ce\u7b49\u5f85\u65b0\u4efb\u52a1"
f6=h.i(0,f3)
if(f6==null)f6=null
else f6=f6.d.length!==0||f6.a.ax!=null
f3=f6===!0?h.i(0,f3).ga9():1/0
f7=b.cm(f2,d6,f1,!0,f3,!0,f4!==!0,f5,"regroup",f0)
if(f7!=null){k1.a=f7.a
B.a.l(e,f7.b)
break}}if((e2||d8)&&!k1.a.as.n(0,c6)){f8=d8?"\u653b\u57ce\u6b66\u5668\u5df2\u6d88\u8017\u4e14\u6682\u65e0\u5b89\u5168\u8865\u88c5\u5730\u70b9\uff0c\u505c\u6b62\u63a8\u8fdb\u5e76\u7b49\u5f85\u91cd\u65b0\u8c03\u5ea6":"\u5f53\u524d\u6ca1\u6709\u5408\u9002\u7684\u622a\u51fb\u6216\u8fdb\u653b\u76ee\u6807\uff0c\u53cb\u57ce\u4e5f\u6ca1\u6709\u5b89\u5168\u5165\u57ce\u65b9\u6848\uff0c\u6682\u65f6\u5f85\u547d\u5e76\u7ee7\u7eed\u590d\u67e5"
B.a.l(d,c6+"\uff1a"+f8)
if((c7?null:d7.b)!=="standby"||d9){if(d8)f9=!c9||e6
else f9=!1
c7=d6.c
c8=A.c([d6.z],c3)
c9=B.b.aK(c5)
d0=f9?1:0
g0=new A.a5(c6,"standby",f8,c7,null,!1,null,c8,0,c0+c9,c0,0,!1,!1,d6.go+d0)
k1.a.y.B(0,c6,g0)
d0=A.c([],b1)
if(f9)d0.push(new A.y(B.P,c6,null,null,0,B.d))
c6=A.c([g0],c2)
c8=A.c([d6],b2)
c7=o.J(c7)
c7.toString
B.a.l(e,new A.N(f8,d0,b.aa(c8,A.c([c7],b3)),c6,0,!1))}}r=23
return k4.b=4,1
case 23:case 21:d5.length===b0||(0,A.t)(d5),++b4
r=20
break
case 22:g1=A.m(new A.b(a0,a4.a(new A.f3(k1,s)),a1),a5)
B.a.A(g1,new A.f4(s))
g=k2.y
a0=k2.z
g2=A.c9(o,k1.a,k3,a0,g)
a1=A.W(a7,a7)
for(a4=g2.f,a5=new A.b7(a4,a4.r,a4.e,A.l(a4).h("b7<1>"));a5.j();){b0=a5.d
c0=a4.i(0,b0)
c0=c0==null?null:c0.length
a1.B(0,b0,c0==null?0:c0)}g3=g2.ga1()
if(g3==null)g3=g2.gcc()
if(g2.ga1()!=null&&a2.length===0)d2="attacking"
a4=g1.length,c4=k2.w>c4/a8.a,a5=a8.k4,k2=k2.f,b0=a8.rx,c0=a8.fy,a8=a8.go,c1=A.f(n),c2=c1.h("e(1)"),c1=c1.h("b<1>"),c3=c1.h("a.E"),g4=0,g5=1,g6=!1,b4=0
case 24:if(!(b4<g1.length)){r=26
break}d6=g1[b4]
g7={}
c5=d6.a
if(k1.a.as.n(0,c5)||k1.a.z.n(0,c5)){r=25
break}g8=o.J(d6.c)
c5=g8.a
b5=h.i(0,c5)
c6=b5==null
if(c6)c7=null
else c7=b5.d.length!==0||b5.a.ax!=null
if(c7===!0){if(c6)c7=null
else{c7=b5.f
c7=c7==null?null:c7.a}c7=c7!==B.f}else c7=!1
if(c7){r=25
break}if(c6)c7=null
else c7=b5.d.length!==0||b5.a.ax!=null
c8=k1.a
if(c7===!0){c7=c8.ax.n(0,c5)||c8.W(g8)?0:1
c8=k1.a
c9=g8.ax
if(c9==null){c8=c8.x.i(0,c5)
if(c8==null)c8=g8.d}else{c8=g8.ay
d0=g8.db?1:0
d0=B.c.v(c9-c8-d0,0,5)
c8=d0}g9=Math.min(c7,c8)}else g9=c8.ax.n(0,c5)||c8.W(g8)?0:1
if(k1.a.u(c5).length<=g9){r=25
break}if(c6)c5=null
else c5=b5.d.length!==0||b5.a.ax!=null
if(c5===!0&&!s.bN(g8,d6,k1.a)){r=25
break}h0=A.c9(o,k1.a,k3,a0,g)
h1=A.m(new A.b(n,c2.a(new A.f5(s,h0,d6,a1)),c1),c3)
B.a.A(h1,new A.f6(s,h0,d6))
g7.a=null
c5=A.f(h1)
c6=c5.h("x<1>")
c7=new A.x(h1,0,a8,c6)
c7.T(h1,0,a8,c5.c)
c7=new A.r(c7,c7.gm(0),c6.h("r<k.E>"))
c6=c6.h("k.E")
h2=null
h3=-1/0
case 27:if(!c7.j()){r=28
break}c5=c7.d
h4=c5==null?c6.a(c5):c5
if(!c.X()){r=28
break}h5=h4.a
c5=o.u(h5)
c8=A.f(c5).h("G<1>")
c5=new A.G(c5,c8)
c9=h4.ax
if(c9==null)c9=h4.d
else{d0=h4.ay
e6=h4.db?1:0
e6=B.c.v(c9-d0-e6,0,5)
c9=e6}d0=new A.x(c5,0,c9,c8.h("x<k.E>"))
d0.T(c5,0,c9,c8.h("k.E"))
h6=d0.af(0)
f1=m.aL(d6,h4.e,o,h4)
if(!f1.d){r=27
break}h7=b.bs(d6,k1.a,h4,l)
for(c5=h7.length,h8=!1,b8=0;b8<h7.length;h7.length===c5||(0,A.t)(h7),++b8){h9=h7[b8]
c8=A.j9(d6,h4,o,k3,l,h9,c4&&k1.a.d>100?0.05:0).a
i0=c8[1]
i1=b.aZ(c8[2],h4,k1.a,d6)
h8=i1>0
if(!h8)continue
if(h0.ga1()!=null&&h5!==h0.ga1())c9=i1!==1||i0<a5
else c9=!1
if(c9)continue
i2=a1.i(0,h5)
if(i2==null)i2=0
i3=i1-i2
if(i3<=0)continue
g5=Math.max(g5,i1)
f7=s.bL(k1.a,d6,h4,h9,i3,i2,c8[0])
if(f7==null){i4=k1.a.N()
i4.d=1e6
i5=s.bL(i4,d6,h4,h9,i3,i2,c8[0])
if(i5!=null){if(a2.length===0)d2="saving"
c8=i4.d
c9=i5.a
i6=c8-c9.d+c9.V().a
g4=g4===0?i6:Math.min(g4,i6)
if(g3==null)g3=h5}else if(a2.length===0)d2="preparing"
continue}c5=f1.b
c8=A.bm(h4,d6,o,k3,k2,c5)
c9=k1.a.d
d0=f7.a.d
e6=B.a.b2(h9,1).E(0,0,new A.f7(s),a7)
e8=b7.i(0,"weaponChance")
e8.toString
i7=c8-c5*0.4-(c9-d0)*0.5+i0*30+e6*b0*e8*0.02
if(i7>h3){g7.a=f7
g5=f7.b.d.length
h3=i7
h2=h4}break}if(!h8&&g3==null){g5=Math.max(1,Math.min(c0,h6.length))
g3=h5}r=29
return k4.b=5,1
case 29:r=27
break
case 28:c5=g7.a
if(c5!=null){c5=B.a.E(e,0,new A.f8(),a7)
c6=g7.a
c5=c5+c6.b.b.length<=a9}else{c6=c5
c5=!1}if(c5){k1.a=c6.a
B.a.l(e,c6.b)
g3=h2.a
a1.aM(g3,new A.f9(g7),new A.fa(g7))
g6=!0}r=30
return k4.b=6,1
case 30:case 25:g1.length===a4||(0,A.t)(g1),++b4
r=24
break
case 26:k2=!g6
if(k2&&B.a.gD(a3).e===0&&j!==B.z){i8=s.cY(k1.a,g2)
if(i8!=null){k1.a=i8.a
B.a.l(e,i8.b)
d2="preparing"}}r=j===B.F&&k2&&B.a.E(e,0,new A.fb(),a7)<a9-3?31:32
break
case 31:i9=k1.a.ce(new A.b(n,c2.a(new A.fc(s,g2)),c1))
k2=o.gM(),m=J.H(k2.a),k2=new A.Y(m,k2.b,k2.$ti.h("Y<1>"))
case 33:if(!k2.j()){r=34
break}l=m.gp()
j=l.a
g=h.i(0,j)
if(g==null)g=null
else g=g.d.length!==0||g.a.ax!=null
if(g===!0){r=33
break}if(!c.X()){r=34
break}j0=k1.a.u(j)
b6=k1.a.N()
g=A.f(j0)
a0=g.h("b<1>")
j1=A.m(new A.b(j0,g.h("e(1)").a(new A.fe(k1)),a0),a0.h("a.E"))
B.a.A(j1,new A.ff())
j2=!1
if(i9.n(0,j))if(B.a.I(n,new A.fg(s))){if(j0.length!==0){g=k1.a.c_(j)
a0=k1.a
g=g<(a0.ax.n(0,j)||a0.W(l)?0:1)+g5}else g=!0
j2=g}if(j1.length!==0){g=j0.length
a0=k1.a
a1=l.ax
if(a1==null){a0=a0.x.i(0,j)
if(a0==null)a0=l.d}else{a0=l.ay
a4=l.db?1:0
a4=B.c.v(a1-a0-a4,0,5)
a0=a4}if(g<a0)g=j2&&j0.length>=l.y
else g=!0}else g=!1
if(g)if(b6.aA(l,B.a.gD(j1))&&b6.d>=b6.V().a){k1.a=b6
B.a.l(e,new A.N("\u5148\u6269\u5145\u5b89\u5168\u8fce\u6218\u540d\u989d\u548c\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u8003\u8651\u62db\u5c06\u4e0e\u8fdc\u5f81",A.c([new A.y(B.k,B.a.gD(j1).a,j,null,0,B.d)],b1),b.aa(A.c([B.a.gD(j1)],b2),A.c([l],b3)),B.r,b6.V().a,!1))
r=34
break}if(j2){g=o.J(g3)
g=b6.dA(l,g==null?null:g.b)&&b6.d>=b6.V().a}else g=!1
if(g){k1.a=b6
B.a.l(e,new A.N("\u4e3a\u7559\u5b88\u4e0e\u8fdc\u5f81\u7684\u771f\u5b9e\u7f3a\u53e3\u62bd\u53d6\u82f1\u96c4\uff0c\u9884\u7559\u6700\u9ad8\u624b\u7eed\u8d39\u548c\u6708\u4ff8",A.c([new A.y(B.v,null,j,null,0,B.d)],b1),b.aa(A.c([],b2),A.c([l],b3)),B.r,b6.V().a,!1))
r=34
break}g=k1.a.f
a0=j0.length
a1=b7.i(0,"soldierLimit")
a1.toString
a1=Math.min(g,a0*B.b.k(a1))
a0=k1.a
j3=a1-a0.e
if(j3>0){j4=a0.N()
g=j4.d
a0=j4.b.b.i(0,"soldierCost")
a0.toString
a0=Math.max(0,B.c.aB(g,B.b.k(a0)))
g=b7.i(0,"soldierBatch")
g.toString
j5=Math.min(a0,Math.min(B.b.k(g),j3))
if(j5>0&&j4.av(j5)){k1.a=j4
B.a.l(e,new A.N("\u8865\u5145\u8fd1\u671f\u5b88\u57ce\u548c\u51fa\u5f81\u6240\u9700\u5175\u5458\uff0c\u4e0d\u586b\u6ee1\u6ca1\u6709\u4efb\u52a1\u7684\u5168\u56fd\u5bb9\u91cf",A.c([new A.y(B.l,null,j,null,j5,B.d)],b1),b.aa(A.c([],b2),A.c([l],b3)),B.r,j4.V().a,!1))
r=34
break}}r=35
return k4.b=7,1
case 35:r=33
break
case 34:case 32:if(g6)d2=a2.length===0?"attacking":"defending"
j6=o.J(g3)
if(j6!=null){j7=A.aS(j6.b,o,k3,null)
if(j7.ga6())B.a.l(d,"\u76ee\u6807\u56fd\u5360\u6709 "+j7.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.aw(j7.c*j7.gaW())+" \u91d1\u5e01\uff0c\u51c6\u5907\u5f3a\u5316\u6b66\u5668\u548c\u8f6e\u653b\u5175\u529b")}if(e.length===0){k2=k1.a
B.a.l(d,k2.d<k2.V().a?"\u8d44\u91d1\u4e0d\u8db3\u4ee5\u8986\u76d6\u73b0\u6709\u90e8\u961f\u548c\u6b20\u6536\u6708\u4ff8\uff0c\u7b49\u5f85\u6574\u5907":"\u6ca1\u6709\u6ee1\u8db3\u5b88\u57ce\u3001\u65f6\u9650\u53ca\u9759\u6001\u98ce\u9669\u7ea6\u675f\u7684\u65b0\u589e\u884c\u52a8\uff0c\u4fdd\u6301\u5df2\u6709\u4efb\u52a1")}if(c4)B.a.l(d,"\u505c\u6ede\u8bca\u65ad\uff1a"+(d2==="saving"?"\u7f3a\u5c11\u6574\u961f\u540e\u52e4\u8d44\u91d1":"\u7f3a\u5c11\u53ef\u5b89\u5168\u6267\u884c\u7684\u6269\u5f20\u6761\u4ef6")+"\uff0c\u4e0d\u901a\u8fc7\u65e0\u9650\u62db\u52df\u6216\u81ea\u6740\u51fa\u51fb\u6253\u7834\u7b49\u5f85")
j8=A.c([],i)
for(k2=e.length,j9=0,b4=0;b4<e.length;e.length===k2||(0,A.t)(e),++b4){k0=e[b4]
j9+=k0.b.length
if(j9>a9){c.e=!0
B.a.l(d,"\u547d\u4ee4\u914d\u989d\u5230\u8fbe\uff0c\u53ea\u63d0\u4ea4\u524d\u9762\u5b8c\u6574\u7684\u52a8\u4f5c\u7ec4\uff0c\u540e\u7eed\u7559\u5f85\u4e0b\u4e00\u6b21\u89c4\u5212")
break}B.a.l(j8,k0)}s.w=new A.bP(d2,g3,g4,g5,j8,A.X(d,0,A.U(12,"count",a7),a6).af(0),c.e,c.c,c.d,c.b)
case 1:return 0
case 2:return k4.c=p.at(-1),3}}}},
cQ(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this
for(s=a2.c.Q,r=s.gM(),q=J.H(r.a),r=new A.Y(q,r.b,r.$ti.h("Y<1>")),p=a2.x,o=a2.d,n=s.r,m=A.f(n),l=m.h("e(1)"),m=m.h("b<1>"),k=m.h("a.E"),j=a3.ax;r.j();){i=q.gp()
h=i.a
if(a3.u(h).length!==0||a3.W(i)||a3.L(h)>0||j.n(0,h))continue
g=A.m(new A.b(n,l.a(new A.eO(a2,a3)),m),k)
B.a.A(g,new A.eP(i))
f=A.f(g)
e=f.h("x<1>")
d=new A.x(g,0,4,e)
d.T(g,0,4,f.c)
d=new A.r(d,d.gm(0),e.h("r<k.E>"))
f=i.e
e=e.h("k.E")
while(d.j()){c=d.d
if(c==null)c=e.a(c)
if(!o.X())return null
b=a2.e
b===$&&A.P()
a=b.ap(c,f,s,!0,i)
b=a2.r
b===$&&A.P()
a0=p.i(0,h)
a0=a0==null?null:a0.ga9()
a1=b.b1(a3,c,a,!0,a0==null?1/0:a0,!0,"\u524d\u7ebf\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5b89\u5168\u540e\u65b9\u65e0\u9700\u4e3a\u7559\u5b88\u7275\u5236\u90e8\u961f","transfer",i)
if(a1!=null)return a1}}return null},
cM(a,b){var s,r,q,p,o,n,m=this,l=b==null
if((l?null:b.b)!=="expedition"||a.ax.length!==0)return!1
s=m.c.Q
r=s.J(l?null:b.d)
if(r==null||r.b===s.a)return!1
l=s.u(r.a)
q=A.f(l).h("G<1>")
p=A.aD(A.X(new A.G(l,q),0,A.U(r.ga2(),"count",t.S),q.h("k.E")),t.r)
if(p==null)return!1
l=B.a.an(s.w,new A.eE(r))
s=m.f
s===$&&A.P()
q=r.ga2()
o=m.a.b.i(0,"soldierLimit")
o.toString
n=s.c4(a,p,q,!1,Math.min(B.b.k(o),p.gP()+l.c))
return!m.d.e&&n.a!==B.f},
cP(b3,b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this,b2=null
if(b4.ax.length===0)return b2
s=b5==null
if((s?b2:b5.b)==="expedition")r=s?b2:b5.d
else r=b2
q=b1.c.Q
p=q.f
o=A.f(p)
n=o.h("b<1>")
m=A.m(new A.b(p,o.h("e(1)").a(new A.eK(b1)),n),n.h("a.E"))
B.a.A(m,new A.eL(b1,r,b4))
for(p=b1.a,o=p.w,n=A.X(m,0,A.U(o.go,"count",t.S),A.f(m).c),l=n.$ti,n=new A.r(n,n.gm(0),l.h("r<k.E>")),s=!s,k=t.r,j=o.fy,i=b3.y,h=A.l(i).h("a9<2>"),g=h.h("e(a.E)"),f=h.h("b<a.E>"),e=b1.d,l=l.h("k.E"),p=p.b,d=q.w,o=o.ch;n.j();){c=n.d
if(c==null)c=l.a(c)
if(!e.X())return b2
b=b1.r
b===$&&A.P()
if(!b.aj(c))continue
a=new A.b(new A.a9(i,h),g.a(new A.eM(b1,b4,c)),f).gm(0)
if(a>=j)continue
a0=c.a
a1=q.u(a0)
a2=A.f(a1).h("G<1>")
a1=new A.G(a1,a2)
a3=c.ax
a4=a3==null
if(a4)a5=c.d
else{a5=c.ay
a6=c.db?1:0
a6=B.c.v(a3-a5-a6,0,5)
a5=a6}a6=new A.x(a1,0,a5,a2.h("x<k.E>"))
a6.T(a1,0,a5,a2.h("k.E"))
a7=A.aD(a6,k)
a1=a7!=null
if(a1){a2=B.a.an(d,new A.eN(c))
a5=b1.f
a5===$&&A.P()
if(a4)a3=c.d
else{a4=c.ay
a6=c.db?1:0
a6=B.c.v(a3-a4-a6,0,5)
a3=a6}a4=p.i(0,"soldierLimit")
a4.toString
a8=a5.c4(b4,a7,a3,!1,Math.min(B.b.k(a4),a7.gP()+a2.c))
if(a8.r||a8.c<=0||a8.b<o)continue}a2=b1.e
a2===$&&A.P()
a9=a2.aL(b4,c.e,q,c)
if(!s||b5.b!=="expedition")a0="\u91ce\u5916\u4efb\u52a1\u7ed3\u675f\u540e\u5229\u7528\u73b0\u6709\u968f\u8eab\u5175\u529b\uff0c\u8f6c\u653b\u53ef\u4ee5\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u654c\u57ce"
else a0=a0===r?"\u91cd\u65b0\u6838\u5bf9\u5f53\u524d\u5b88\u519b\u4e0e\u8def\u7ebf\u540e\uff0c\u7ee7\u7eed\u8fdb\u653b\u539f\u76ee\u6807":"\u539f\u76ee\u6807\u4e0d\u518d\u9002\u5408\u8fdb\u653b\uff0c\u8f6c\u5411\u9644\u8fd1\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u654c\u57ce"
b0=b.cq(b3,b4,a9,a1,!0,a,a0,"expedition",c)
if(b0!=null)return b0}return b2},
cY(b2,b3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6=this,a7=a6.c.Q,a8=a7.gM(),a9=a8.$ti,b0=a9.h("b<a.E>"),b1=A.m(new A.b(a8,a9.h("e(a.E)").a(new A.eT(a6)),b0),b0.h("a.E"))
if(b1.length<2)return null
a8=a7.f
a9=A.f(a8)
b0=a9.h("b<1>")
s=A.m(new A.b(a8,a9.h("e(1)").a(new A.eU(a6,b3)),b0),b0.h("a.E"))
a8=t.S
a9=t.i
r=A.W(a8,a9)
for(b0=b1.length,q=A.f(s),p=q.c,q=q.h("x<1>"),o=a6.a,n=o.w,m=n.go,l=0;l<b1.length;b1.length===b0||(0,A.t)(b1),++l){k=b1[l]
B.a.A(s,new A.eV(k))
j=new A.x(s,0,m,q)
j.T(s,0,m,p)
r.B(0,k.a,j.E(0,1/0,new A.eW(a6,k),a9))}B.a.A(b1,new A.eX(r))
for(a9=A.f(b1),a8=A.X(b1,0,A.U(2,"count",a8),a9.c),b0=a8.$ti,a8=new A.r(a8,a8.gm(0),b0.h("r<k.E>")),a9=a9.h("G<1>"),q=a9.h("r<k.E>"),p=a6.d,m=a7.c,j=b2.ax,i=a9.h("k.E"),n=n.at,b0=b0.h("k.E");a8.j();){h=a8.d
if(h==null)h=b0.a(h)
g=h.a
f=r.i(0,g)
f.toString
if(f>n)continue
for(f=new A.G(b1,a9),f=new A.r(f,f.gm(0),q),e=h.e,d=h.d;f.j();){c=f.d
if(c==null)c=i.a(c)
b=c.a
a=r.i(0,b)
a.toString
a0=r.i(0,g)
a0.toString
if(a<a0+10)continue
a1=b2.u(b)
a=a1.length
if(a<=(j.n(0,b)||b2.W(c)?0:1))continue
b=A.f(a1)
a=b.h("b<1>")
a2=A.m(new A.b(a1,b.h("e(1)").a(new A.eY(b2)),a),a.h("a.E"))
B.a.A(a2,new A.eZ())
b=A.f(a2)
a=b.h("x<1>")
a0=new A.x(a2,0,2,a)
a0.T(a2,0,2,b.c)
a0=new A.r(a0,a0.gm(0),a.h("r<k.E>"))
a=a.h("k.E")
c=c.d
while(a0.j()){b=a0.d
if(b==null)b=a.a(b)
if(b.x<15||d>=o.ah(m)||c<o.ah(m)||B.a.I(b2.u(g),new A.f_(b)))continue
if(!p.X())return null
a3=a6.e
a3===$&&A.P()
a4=a3.ap(b,e,a7,!0,h)
a3=a6.r
a3===$&&A.P()
a5=a3.co(b2,b,a4,!0,!0,"\u540e\u65b9\u5efa\u8bbe\u5df2\u5b8c\u6210\uff0c\u5b89\u5168\u8f6c\u79fb\u9ad8\u5185\u653f\u5c06\u9886\u4e3b\u6301\u524d\u7ebf\u57ce\u9632\u5efa\u8bbe","transfer",h)
if(a5!=null)return a5}}}return null},
bN(a,b,c){var s,r,q=a.a,p=this.x.i(0,q),o=p==null?null:p.d
if(o==null)o=A.c([],t.D)
if(o.length===0)return!0
q=c.u(q)
p=A.f(q)
s=p.h("b<1>")
q=A.m(new A.b(q,p.h("e(1)").a(new A.eR(b)),s),s.h("a.E"))
p=A.f(q).h("G<1>")
r=A.X(new A.G(q,p),0,A.U(c.O(a),"count",t.S),p.h("k.E")).af(0)
if(r.length===0)return!1
return B.a.aG(o,new A.eS(this,r,c,a))},
bL(c8,c9,d0,d1,d2,d3,d4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5=this,c6=null,c7="soldierLimit"
t.L.a(d1)
s=t.e
r=A.c([],s)
for(q=c5.c.Q,p=q.gM(),o=J.H(p.a),p=new A.Y(o,p.b,p.$ti.h("Y<1>")),n=c8.ax,m=c5.x,l=c9.c;p.j();){k=o.gp()
j=k.a
i=m.i(0,j)
if(i==null)i=c6
else i=i.d.length!==0||i.a.ax!=null
if(i===!0&&j!==l)continue
h=n.n(0,j)||c8.W(k)?0:1
g=Math.max(0,c8.u(j).length-h)
k=c8.u(j)
j=A.f(k)
i=j.h("b<1>")
f=A.m(new A.b(k,j.h("e(1)").a(new A.eG(c5,c8,d0)),i),i.h("a.E"))
B.a.A(f,new A.eH(c5))
k=A.f(f)
j=new A.x(f,0,g,k.h("x<1>"))
j.T(f,0,g,k.c)
B.a.G(r,j)}if(!B.a.n(r,c9))return c6
B.a.ao(r,c9)
B.a.A(r,new A.eI(c5))
p=c5.e
p===$&&A.P()
o=d0.e
e=p.aL(c9,o,q,d0)
if(!e.d)return c6
d=A.c([c9],s)
s=t.N
c=A.R([c9.a,e],s,t.bJ)
b=e.b
for(n=c5.a,l=n.w,k=t.S,j=A.X(r,0,A.U(l.fy*2,"count",k),t.r),i=j.$ti,j=new A.r(j,j.gm(0),i.h("r<k.E>")),a=l.ok,i=i.h("k.E"),a0=b;j.j();){a1=j.d
if(a1==null)a1=i.a(a1)
if(d.length>=d2)break
a2=p.aL(a1,o,q,d0)
if(!a2.d)continue
a3=a2.b
a4=Math.min(b,a3)
a5=Math.max(a0,a3)
if(a5-a4>a)continue
B.a.l(d,a1)
c.B(0,a1.a,a2)
a0=a5
b=a4}if(d.length<d2)return c6
a6=A.c([],t.w)
a7=A.c([],t.m)
a8=A.W(s,s)
s=q.u(d0.a)
p=A.f(s).h("G<1>")
a9=A.X(new A.G(s,p),0,A.U(d0.ga2(),"count",k),p.h("k.E")).af(0)
for(s=l.fx,n=n.b,p=d2===1,o=A.f(a9),l=o.c,o=o.h("x<1>"),k=t.p,b0=c8,b1=0;b1<d.length;++b1){b2=d[b1]
j=b2.c
i=m.i(0,j)
if(i==null)i=c6
else i=i.d.length!==0||i.a.ax!=null
if(i===!0){i=q.J(j)
i.toString
i=!c5.bN(i,b2,b0)}else i=!1
if(i)return c6
i=c.i(0,b2.a)
i.toString
if(b1===0)a1=A.c([d1],k)
else{a1=c5.r
a1===$&&A.P()
a3=c5.f
a3===$&&A.P()
a3=a1.bs(b2,b0,d0,a3)
a1=a3}a3=a1.length
b3=d3+b1
b4=b0.ax
b5=b1>0
b6=c6
b7=0
for(;b7<a1.length;a1.length===a3||(0,A.t)(a1),++b7){b8=a1[b7]
if(b5){if(d4){b9=new A.x(a9,0,1,o)
b9.T(a9,0,1,l)}else b9=a9
b9=J.la(b9,new A.eJ(c5,b2,d0,b8))}else b9=!1
if(b9)continue
for(b9=q.gM(),c0=J.H(b9.a),b9=new A.Y(c0,b9.b,b9.$ti.h("Y<1>")),c1=0;b9.j();){c2=c0.gp()
c3=c2.a
c4=b0.u(c3).length
c4=Math.max(0,c4-(c3===j?1:0))
c2=b4.n(0,c3)||b0.W(c2)?0:1
c2=Math.min(c4,c2)
c4=n.i(0,c7)
c4.toString
c1+=c2*B.b.k(c4)}b9=c5.r
b9===$&&A.P()
c0=p?"\u56f4\u7ed5\u4e3b\u653b\u76ee\u6807\u6295\u5165\u8db3\u591f\u6218\u529b\uff0c\u4fdd\u7559\u5176\u4ed6\u65b9\u5411\u5175\u529b":"\u96c6\u4e2d\u4f18\u52bf\u7f16\u961f\u8f6e\u653b\u540c\u4e00\u5ea7\u57ce\uff0c\u62b5\u8fbe\u95f4\u9694\u4e0d\u8d85\u8fc7"+B.b.k(a)+"\u79d2"
c2=b0.f
c3=n.i(0,c7)
c3.toString
b6=b9.bw(b0,b2,i,d4,b8,Math.min(c1,Math.max(0,c2-B.b.k(c3))),b3,c0,"expedition",d0)
if(b6!=null)break}if(b6==null)return c6
b0=b6.a
j=b6.b
B.a.G(a6,j.b)
B.a.G(a7,j.d)
a8.G(0,j.c)
if(a6.length>s){c5.d.e=!0
return c6}}s=c5.r
s===$&&A.P()
a8.G(0,s.aa(a9,A.c([],t.Y)))
if(d4)s="\u5148\u6d3e\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u5c06\u9886\u8fdb\u653b\u524d\u6392\uff0c\u6301\u7eed\u8f6e\u653b\u5e76\u8865\u5145\u6218\u635f"
else s=p?"\u6267\u884c\u9759\u6001\u4f18\u52bf\u660e\u786e\u3001\u53ef\u4ee5\u4f9b\u517b\u7684\u6269\u5f20":"\u6574\u961f\u540e\u52e4\u51c6\u5907\u5b8c\u6210\uff0c\u6309\u771f\u5b9e\u6392\u961f\u89c4\u5219\u8f6e\u653b\uff1b\u4e0d\u9884\u6f14\u672a\u6765\u4f24\u4ea1"
return new A.d7(b0,new A.N(s,a6,a8,a7,b0.V().a,!1))},
d_(a,b,c){var s=this.c
return A.bm(a,b,s.Q,this.a,s.f,c)},
aV(a,b){return this.d_(a,b,null)}}
A.f0.prototype={
$1(a){var s,r,q
t.J.a(a)
s=this.a.c.Q
r=s.Z(a.a)
q=!1
if(r!=null)if(r.b===s.a)if(!r.fx)if(r.f>0){s=r.as
s=!(s===B.h||s===B.e)&&r.go===a.ax}else s=q
else s=q
else s=q
else s=q
return s},
$S:10}
A.f1.prototype={
$1(a){t.h.a(a)
return a.d.length!==0||a.a.ax!=null},
$S:36}
A.f2.prototype={
$2(a,b){var s,r=t.h
r.a(a)
r.a(b)
s=B.b.t(a.ga9(),b.ga9())
return s!==0?s:B.b.t(b.r+b.a.r*4,a.r+a.a.r*4)},
$S:33}
A.fd.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:11}
A.fh.prototype={
$2(a,b){var s,r=t.dp
r.a(a)
r.a(b)
r=a.e
s=b.e
return r!==s?B.c.t(r,s):B.b.t(b.d,a.d)},
$S:69}
A.fi.prototype={
$1(a){t.r.a(a)
return a.b===this.a.c.Q.a&&!a.fx&&a.fr},
$S:0}
A.fj.prototype={
$1(a){t.r.a(a)
return this.a.c.x!==B.o},
$S:0}
A.fk.prototype={
$1(a){var s=this.a.a.r.i(0,A.h(a))
return(s==null?null:s.d)===0},
$S:16}
A.fl.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.Q.a&&a.db&&s.x!==B.o&&!a.fx&&!this.a.a.as.n(0,a.a)},
$S:0}
A.fm.prototype={
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
s=s==null?k:s.a}s=s===B.f}else s=!0}else s=!1
return s},
$S:1}
A.fn.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(a.e.H(s),b.e.H(s))},
$S:4}
A.f3.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b.c
r=!1
if(a.b===s.Q.a)if(a.cy){r=this.a
s=r.a.aq(a)&&s.x!==B.z&&!a.fx&&!r.a.z.n(0,a.a)}else s=r
else s=r
return s},
$S:0}
A.f4.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ae(b,s.J(b.c).d<q.ah(r)),A.ae(a,s.J(a.c).d<q.ah(r)))},
$S:2}
A.f5.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.a
r=!1
if(a.b!==s.c.Q.a)if(this.b.au(a)){q=s.r
q===$&&A.P()
if(q.aj(a)){r=this.d.i(0,a.a)
if(r==null)r=0
s=r<s.a.w.fy}else s=r}else s=r
else s=r
return s},
$S:1}
A.f6.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.b
if(a.a===r.ga1())r=-1
else if(b.a===r.ga1())r=1
else{r=this.a
s=this.c
s=B.b.t(r.aV(b,s),r.aV(a,s))
r=s}return r},
$S:4}
A.f7.prototype={
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
$S:31}
A.f8.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:11}
A.f9.prototype={
$1(a){return A.h(a)+this.a.a.b.d.length},
$S:7}
A.fa.prototype={
$0(){return this.a.a.b.d.length},
$S:5}
A.fb.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:11}
A.fc.prototype={
$1(a){var s,r
t.q.a(a)
s=this.a
r=!1
if(a.b!==s.c.Q.a)if(this.b.au(a)){s=s.r
s===$&&A.P()
s=s.aj(a)}else s=r
else s=r
return s},
$S:1}
A.fe.prototype={
$1(a){t.r.a(a)
return a.dy&&!this.a.a.as.n(0,a.a)},
$S:0}
A.ff.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fg.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.eO.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=!1
if(a.b===s.c.Q.a)if(a.cy){q=this.b
if(q.aq(a))if(!q.as.n(0,a.a)){s=s.x.i(0,a.c)
if(s==null)s=null
else s=s.d.length!==0||s.a.ax!=null
s=s!==!0}else s=r
else s=r}else s=r
else s=r
return s},
$S:0}
A.eP.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.z.H(s),b.z.H(s))},
$S:2}
A.eE.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.eK.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.eL.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.b
s=a.a===r
if(s!==(b.a===r))return s?-1:1
r=this.a
s=this.c
return B.b.t(r.aV(b,s),r.aV(a,s))},
$S:4}
A.eM.prototype={
$1(a){var s,r
t.J.a(a)
s=a.a
r=!1
if(s!==this.b.a)if(a.b==="expedition")if(a.d===this.c.a){s=this.a.c.Q.Z(s)
s=(s==null?null:s.fx)===!1}else s=r
else s=r
else s=r
return s},
$S:10}
A.eN.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.eT.prototype={
$1(a){var s=this.a.x.i(0,t.q.a(a).a)
if(s==null)s=null
else s=s.d.length!==0||s.a.ax!=null
return s!==!0},
$S:1}
A.eU.prototype={
$1(a){t.q.a(a)
return a.b!==this.a.c.Q.a&&this.b.au(a)},
$S:1}
A.eV.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.H(s),b.e.H(s))},
$S:4}
A.eW.prototype={
$2(a,b){var s,r
A.ao(a)
t.q.a(b)
s=this.a.e
s===$&&A.P()
r=this.b.e
return Math.min(a,s.ag(r,b.f.a0(r)))},
$S:45}
A.eX.prototype={
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
A.eY.prototype={
$1(a){t.r.a(a)
return a.cy&&a.e!==2&&!this.a.as.n(0,a.a)},
$S:0}
A.eZ.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ae(s.a(b),!0),A.ae(a,!0))},
$S:2}
A.f_.prototype={
$1(a){return t.r.a(a).x>=this.a.x},
$S:0}
A.eR.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.eS.prototype={
$1(a){var s=this
return B.a.I(s.b,new A.eQ(s.a,t.O.a(a),s.c,s.d))},
$S:12}
A.eQ.prototype={
$1(a){var s,r,q,p,o,n=this,m="soldierLimit"
t.r.a(a)
s=n.a
r=s.f
r===$&&A.P()
q=n.c
p=q.O(n.d)
s=s.a.b
o=s.i(0,m)
o.toString
o=B.b.k(o)
q=q.e
s=s.i(0,m)
s.toString
return r.bk(a,n.b.a,p,Math.min(o,Math.max(0,q-B.b.k(s)))).a===B.f},
$S:0}
A.eG.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.cy){r=this.b
if(!r.as.n(0,a.a))if(r.aq(a)){s=this.a.r
s===$&&A.P()
s=s.aj(this.c)}}return s},
$S:0}
A.eH.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ae(b,s.J(b.c).d<q.ah(r)),A.ae(a,s.J(a.c).d<q.ah(r)))},
$S:2}
A.eI.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ae(b,s.J(b.c).d<q.ah(r)),A.ae(a,s.J(a.c).d<q.ah(r)))},
$S:2}
A.eJ.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this,i="soldierLimit"
t.r.a(a)
s=j.a
r=s.f
r===$&&A.P()
q=j.c
p=q.ga2()
o=s.a
n=o.b
m=n.i(0,i)
m.toString
m=B.b.k(m)
n=n.i(0,i)
n.toString
l=j.d
k=r.d6(j.b,a,p,Math.min(B.b.k(n),B.a.an(s.c.Q.w,new A.eF(q)).c),l,m)
return J.ju(l)&&k.b<o.w.k4||k.r||k.c<=o.w.RG||k.b<-0.12},
$S:0}
A.eF.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.a7.prototype={}
A.fo.prototype={
c3(a,b){return new A.ax(this.d3(a,b),t.dT)},
d3(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e
return function $async$c3(c,d,a0){if(d===1){n.push(a0)
p=o}for(;;)switch(p){case 0:i=s.a4(r,q)
h=r.a
g=h.a
f=q.L(g)<=q.O(h)
e=!1
if(f){m=r.d
if(m.length!==0)if(B.a.aG(m,new A.h8(s,q))){e=q.y
e=!new A.a9(e,A.l(e).h("a9<2>")).I(0,new A.h9(r))}}p=e?3:4
break
case 3:p=5
return c.b=new A.a7(q,A.c([],t.Z),s.a8(r,q),!1,"\u5df2\u6709\u622a\u51fb\u90e8\u961f\u80fd\u53ca\u65f6\u63a5\u654c\uff0c\u7b49\u5f85\u6267\u884c\u7ed3\u679c\uff0c\u4e0d\u91cd\u590d\u6d3e\u51fa\u7b2c\u4e8c\u652f\u90e8\u961f","hold"),1
case 5:p=1
break
case 4:if(f)e=(i==null?null:i.a)===B.f
else e=!1
p=e?6:7
break
case 6:p=8
return c.b=new A.a7(q,A.c([],t.Z),s.a8(r,q),!1,"\u57ce\u9632\u4e0e\u73b0\u6709\u5b88\u5c06\u8db3\u4ee5\u5e94\u5bf9\u53ef\u89c1\u6765\u654c\uff0c\u7ef4\u6301\u8fdc\u5f81\uff0c\u4e0d\u53ec\u56de\u5c06\u9886","hold"),1
case 8:p=1
break
case 7:e=s.bB(r,q)
l=A.m(e,e.$ti.h("a.E"))
e=A.f(l)
m=e.h("b<1>")
k=A.m(new A.b(l,e.h("e(1)").a(new A.ha(s,r,i,q)),m),m.h("a.E"))
p=k.length!==0?9:10
break
case 9:p=11
return c.bW(k)
case 11:p=1
break
case 10:p=f&&q.L(g)<q.O(h)?12:13
break
case 12:j=q.N()
p=j.dz(h,!0)&&j.d>=j.a5(!0).a?14:15
break
case 14:p=16
return c.b=s.aE(r,q,j,A.c([new A.y(B.v,null,g,null,0,B.d)],t.w),"\u672c\u5730\u4ecd\u6709\u8fce\u6218\u540d\u989d\uff0c\u5148\u62db\u52df\u8865\u5f3a\uff0c\u518d\u6309\u5b9e\u9645\u5230\u4efb\u5c5e\u6027\u590d\u6838\uff0c\u6682\u4e0d\u53ec\u56de\u8fdc\u5f81"),1
case 16:p=1
break
case 15:case 13:p=17
return c.bW(l)
case 17:case 1:return 0
case 2:return c.c=n.at(-1),3}}}},
bB(a,b){return new A.ax(this.cC(a,b),t.dT)},
cC(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e,d,c,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9,k0,k1,k2,k3,k4,k5,k6,k7,k8,k9
return function $async$bB(l0,l1,l2){if(l1===1){n.push(l2)
p=o}for(;;)switch(p){case 0:k3=r.a
k4=k3.a
k5=q.L(k4)>q.O(k3)
k6=t.Z
k7=A.c([],k6)
k8=s.a8(r,q)
k9=!k5
if(k9){m=s.a4(r,q)
m=(m==null?null:m.a)!==B.f}else m=!0
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
g=Math.min(i,h.gbX())
p=g>0&&h.av(g)?6:7
break
case 6:p=8
return l0.b=s.aE(r,q,h,A.c([new A.y(B.l,null,k4,null,g,B.d)],t.w),"\u4f18\u5148\u7528\u56fd\u5e93\u8865\u8db3\u73b0\u6709\u5b88\u519b\u5175\u5458\uff0c\u518d\u5224\u65ad\u662f\u5426\u9700\u8981\u5916\u63f4"),1
case 8:case 7:case 5:k8=k3.ax
m=k8==null
p=m?9:10
break
case 9:f=q.N()
e=A.c([],t.w)
j=f.u(k4)
d=A.f(j)
c=d.h("b<1>")
a0=A.m(new A.b(j,d.h("e(1)").a(new A.fp()),c),c.h("a.E"))
B.a.A(a0,new A.fq())
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
break}if(!f.aA(k3,a1)||f.d<f.a5(!0).a){p=14
break}B.a.l(e,new A.y(B.k,j,k4,null,0,B.d))
a3=f.L(k4)
a4=d.i(0,k4)
if(a4==null)a4=c
p=a3<=a4?15:16
break
case 15:p=17
return l0.b=s.aE(r,q,f,e,"\u4f18\u5148\u7531\u9ad8\u5185\u653f\u5c06\u9886\u5347\u7ea7\uff0c\u4fdd\u62a4\u771f\u5b9e\u8fce\u6218\u540d\u989d"),1
case 17:a3=s.a4(r,f)
if((a3==null?null:a3.a)===B.f||k5){p=14
break}case 16:++a2
p=13
break
case 14:case 12:case 10:p=k5?18:19
break
case 18:j=q.u(k4)
d=A.f(j)
c=d.h("b<1>")
a5=A.m(new A.b(j,d.h("e(1)").a(new A.fr()),c),c.h("a.E"))
B.a.A(a5,new A.fC())
j=A.f(a5),d=A.X(a5,0,A.U(3,"count",t.S),j.c),c=d.$ti,d=new A.r(d,d.gm(0),c.h("r<k.E>")),a3=k3.db,a4=k3.ay,a6=k3.d,a7=t.T,a8=t.w,a9=t.e,b0=j.h("e(1)"),j=j.h("b<1>"),c=c.h("k.E")
case 20:if(!d.j()){p=21
break}b1=d.d
if(b1==null)b1=c.a(b1)
if(!k7.X()){p=21
break}b2=q.N()
e=A.c([],a8)
b3=A.c([b1],a9)
B.a.G(b3,new A.b(a5,b0.a(new A.fN(b1)),j))
b1=b3.length,b4=b2.x,b5=0
case 22:if(!(b5<b3.length)){p=24
break}b6=b3[b5]
b7=b2.L(k4)
if(m){b8=b4.i(0,k4)
if(b8==null)b8=a6}else{b8=a3?1:0
b8=B.c.v(k8-a4-b8,0,5)}if(b7<=b8){p=24
break}if(!b2.bm(b6)){p=23
break}B.a.l(e,new A.y(B.u,b6.a,null,null,0,B.d))
p=m?25:26
break
case 25:b9=b2.N()
c0=A.m(e,a7)
b7=b9.u(k4)
b8=A.f(b7)
c1=b8.h("b<1>")
a0=A.m(new A.b(b7,b8.h("e(1)").a(new A.fP()),c1),c1.h("a.E"))
B.a.A(a0,new A.fQ())
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
if(!b9.aA(k3,B.a.gD(a0)))break
B.a.l(c0,new A.y(B.k,B.a.gD(a0).a,k4,null,0,B.d));++c2}b8=b9.L(k4)
b7=b7.i(0,k4)
if(b7==null)b7=a6
p=b8<=b7&&b9.d>=b9.a5(!0).a?29:30
break
case 29:p=31
return l0.b=s.aE(r,q,b9,c0,"\u5148\u89e3\u96c7\u4f4e\u4ea4\u6362\u4ef7\u503c\u6321\u4f4d\u8005\u7b79\u8d44\uff0c\u4fdd\u7559\u4e3b\u6301\u8005\u5b8c\u6210\u6551\u57ce\u5347\u7ea7"),1
case 31:case 30:case 28:case 26:case 23:b3.length===b1||(0,A.t)(b3),++b5
p=22
break
case 24:b1=b2.L(k4)
if(m){b3=b4.i(0,k4)
if(b3==null)b3=a6}else{b3=a3?1:0
b3=B.c.v(k8-a4-b3,0,5)}p=b1<=b3?32:33
break
case 32:p=34
return l0.b=s.aE(r,q,b2,e,"\u6ca1\u6709\u53ef\u652f\u4ed8\u4e14\u53ca\u65f6\u7684\u5347\u7ea7\u65b9\u6848\uff0c\u6e05\u51fa\u6321\u4f4d\u5b88\u5c06\u5e76\u4fdd\u7559\u6838\u5fc3\u51fa\u573a"),1
case 34:case 33:p=20
break
case 21:case 19:j=q.u(k4)
d=A.f(j)
c=d.h("b<1>")
c3=A.m(new A.b(j,d.h("e(1)").a(new A.fR(q)),c),c.h("a.E"))
B.a.A(c3,new A.fS())
if(k9){k9=r.f
k9=(k9==null?null:k9.a)!==B.f}else k9=!0
p=k9&&s.a.Q.gM().gm(0)>1?35:36
break
case 35:c4=q.N()
k9=r.f
if((k9==null?null:k9.a)===B.p)c4.ax.l(0,k4)
c5=A.c([],k6)
k9=s.a.Q
j=k9.gM()
d=j.$ti
c=d.h("b<a.E>")
c6=A.m(new A.b(j,d.h("e(a.E)").a(new A.fT(k3)),c),c.h("a.E"))
B.a.A(c6,new A.fU(k3))
j=A.X(c3,0,A.U(l.w.fy,"count",t.S),A.f(c3).c),d=j.$ti,j=new A.r(j,j.gm(0),d.h("r<k.E>")),c=k3.db,a3=k3.ay,a4=A.f(c6),a6=a4.c,a4=a4.h("x<1>"),a7=a4.h("r<k.E>"),a8=s.e,a9=a8.c,b0=s.f,b1=a4.h("k.E"),d=d.h("k.E"),b3=k3.d,b4=t.er,b7=t.bo,b8=t.i,c1=t.I
case 37:if(!j.j()){p=38
break}c7=j.d
if(c7==null)c7=d.a(c7)
if(!k7.X()){p=38
break}c8=new A.x(c6,0,4,a4)
c8.T(c6,0,4,a6)
c8=new A.r(c8,c8.gm(0),a7)
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
d4=c4.L(d2)
d5=d1.ax
if(d5==null){d2=c9.i(0,d2)
if(d2==null)d2=d1.d}else{d2=d1.ay
d6=d1.db?1:0
d6=B.c.v(d5-d2-d6,0,5)
d2=d6}if(d4>=d2)continue
d7=a9.ap(c7,d1.e,k9,!0,d1)
d2=k5?"transfer":"evacuate"
d8=a8.b1(c4,c7,d7,!0,r.ga9(),!0,"\u5728\u539f\u57ce\u5371\u9669\u7a97\u53e3\u524d\u8fdb\u9a7b\u5b89\u5168\u53cb\u57ce\uff0c\u6539\u53d8\u6240\u5c5e\u57ce\u4ee5\u4fdd\u5168\u5c06\u9886",d2,d1)
if(d8!=null)d1=d0==null||d8.a.d>d0.a.d
else d1=!1
if(d1)d0=d8}if(d0==null){p=37
break}c4=d0.a
B.a.l(c5,d0.b)
c7=c4.L(k4)
if(m){c8=c4.x.i(0,k4)
if(c8==null)c8=b3}else{c8=c?1:0
c8=B.c.v(k8-a3-c8,0,5)}p=c7<=c8?39:40
break
case 39:d9=new A.bU(c5,b4.a(new A.fs()),b7).E(0,0,new A.ft(s),b8)
c7=c4.N()
c8=A.m(c5,c1)
c9=s.a8(r,c4)
d1=isFinite(r.ga9())?"\u5b89\u5168\u5224\u65ad\u4ee5\u5b9e\u9645\u8fdb\u9a7b\u53cb\u57ce\u4e3a\u51c6\uff0c\u9014\u4e2d\u539f\u57ce\u5931\u5b88\u4ecd\u4f1a\u6e05\u9664\u90e8\u961f":"\u8f6c\u79fb\u5230\u5b89\u5168\u540e\u65b9\u6574\u5907"
p=41
return l0.b=new A.a7(c7,c8,c9+d9*0.65,!1,d1,"relocation"),1
case 41:if(k5){p=38
break}case 40:p=37
break
case 38:case 36:e0=s.cJ(r,q)
e1=new A.fV(s,q)
k9=s.a.Q
j=k9.r
d=A.f(j)
c=d.h("b<1>")
e2=A.m(new A.b(j,d.h("e(1)").a(new A.fu(s,q,e1,e0)),c),c.h("a.E"))
B.a.A(e2,new A.fv(e1,k3))
j=r.d
d=j.length===0?0:l.w.fy
c=t.S
d=A.X(e2,0,A.U(d,"count",c),A.f(e2).c)
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
b3=k3.db
b4=k3.ay
b7=k3.d
b8=q.x
c1=r.f
c7=A.f(j)
c8=c7.h("o(1)")
c9=c7.h("Q<1,o>")
d1=k3.e
d2=c7.c
c7=c7.h("x<1>")
d4=c7.h("r<k.E>")
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
else e8=e5.d.length!==0||e5.a.ax!=null
e8=e8===!0?e5.ga9():1/0
e9=Math.min(e6,e8)
e6=!1
if(!e1.$1(e3)||e0){e8=s.a4(r,q)
if((e8==null?null:e8.a)!==B.f){e6=q.L(k4)
if(m){e8=b8.i(0,k4)
if(e8==null)e8=b7}else{e8=b3?1:0
e8=B.c.v(k8-b4-e8,0,5)}e8=e6<e8
e6=e8}}p=e6?44:45
break
case 44:f0=new A.Q(j,c8.a(new A.fw()),c9).ae(0,new A.fx(s))
if(m){e6=b8.i(0,k4)
if(e6==null)e6=b7}else{e6=b3?1:0
e6=B.c.v(k8-b4-e6,0,5)}e8=k.i(0,"soldierLimit")
e8.toString
f1=a6.bl(e3,f0,f0.k4,e6,!1,Math.min(B.b.k(e8),q.e+e3.gP()))
e6=d6?null:c1.b
if(e6==null)e6=-1
p=f1.b>e6+0.05?46:47
break
case 46:d7=a7.ap(e3,d1,k9,!0,k3)
if(m){e6=b8.i(0,k4)
if(e6==null)e6=b7}else{e6=b3?1:0
e6=B.c.v(k8-b4-e6,0,5)}e8=s.a4(r,q)
e8=e8==null?null:e8.b
d8=a4.b1(q,e3,d7,!0,e9,!0,"\u672c\u5730\u62b5\u6297\u4ecd\u6709\u7f3a\u53e3\uff08\u57ce\u9632"+e6+"\u7ea7\uff0c\u9632\u5b88\u4f59\u91cf"+B.b.aK((e8==null?-1:e8)*100)+"\u70b9\uff09\uff0c\u63f4\u519b\u7ea6"+B.b.b_(d7.b,1)+"\u79d2\u5230\u8fbe\uff0c\u5371\u9669\u7a97\u53e3"+B.b.b_(e9,1)+"\u79d2\uff0c\u9884\u7559\u5165\u57ce\u540d\u989d","rescue",k3)
if(d8!=null){e6=s.a4(r,d8.a)
e6=(e6==null?null:e6.a)===B.f}else e6=!1
p=e6?48:49
break
case 48:e6=d8.a
p=50
return l0.b=new A.a7(e6,A.c([d8.b],k6),s.a8(r,e6)-A.a4(e3)*0.08,!1,"","recall"),1
case 50:case 49:case 47:case 45:e6=new A.x(j,0,2,c7)
e6.T(j,0,2,d2)
e6=new A.r(e6,e6.gm(0),d4)
e8=e3.k4
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
else f6=e5.d.length!==0||e5.a.ax!=null
if(f6===!0){if(e7)f4=null
else{f4=e5.f
f4=f4==null?null:f4.a}f4=f4!==B.f}}if(f4){p=51
break}f4=f3.a
d7=a4.bo(e3,f4,q)
if(a6.d4(e3,f4,f4.k4,e8,a8.bi(f4.z)).a!==B.f){p=51
break}f6=e1.$1(e3)?"\u672c\u5730\u624b\u6bb5\u65e0\u6cd5\u62b5\u6321\u660e\u786e\u6765\u88ad\uff0c\u7d27\u6025\u622a\u51fb\u9884\u8ba1"+B.b.b_(d7.b,1)+"\u79d2\uff0c\u65e9\u4e8e\u654c\u519b"+B.b.b_(f3.b,1)+"\u79d2\u62b5\u57ce\uff1b\u6700\u540e\u624d\u6539\u6d3e\u8fdc\u5f81":"\u52a8\u7528\u9644\u8fd1\u95f2\u7f6e\u90e8\u961f\u622a\u51fb\u6765\u654c\uff0c\u4e0d\u6253\u65ad\u4e3b\u653b\u4efb\u52a1"
d8=a4.cr(q,e3,d7,f3.b,!0,f4,f6,"intercept",k3)
p=d8!=null?53:54
break
case 53:f3=d8.a
p=55
return l0.b=new A.a7(f3,A.c([d8.b],k6),s.a8(r,f3)+80-A.a4(e3)*0.08,k5,"","recall"),1
case 55:case 54:p=51
break
case 52:p=42
break
case 43:d=A.f(c3)
a3=d.h("b<1>")
f7=A.m(new A.b(c3,d.h("e(1)").a(new A.fy(s)),a3),a3.h("a.E"))
B.a.A(f7,new A.fz(s,q,k3))
if(c3.length>1){d=s.a4(r,q)
f8=(d==null?null:d.a)!==B.f}else f8=!1
d=A.X(j,0,A.U(2,"count",c),d2),c=d.$ti,d=new A.r(d,d.gm(0),c.h("r<k.E>")),a3=A.f(f7),a9=a3.c,a3=a3.h("x<1>"),b0=a3.h("r<k.E>"),b1=t.a,b8=t.H,c7=t.N,c8=t.dg,c9=t.cO,d1=t.Y,d2=t.T,d4=l.w,d5=d4.R8,e3=d4.p4,e4=t.p,l=l.r,e6=t.fR,e7=t.w,e8=t.e,f2=t.eV,f3=a3.h("k.E"),d4=d4.d,c=c.h("k.E")
case 56:if(!d.j()){p=57
break}f4=d.d
if(f4==null)f4=c.a(f4)
if(!f8||f4.a.id!=null||s.bH(f4,q)){p=56
break}f6=new A.x(f7,0,4,a3)
f6.T(f7,0,4,a9)
f6=new A.r(f6,f6.gm(0),b0)
f9=f4.a
f4=f4.b
g0=f9.z
g1=f9.k4
g2=f9.ok
case 58:if(!f6.j()){p=59
break}g3=f6.d
if(g3==null)g3=f3.a(g3)
if(!k7.X()){p=59
break}g4=q.u(k4)
g5=A.f(g4)
g6=g5.h("b<1>")
g7=A.m(new A.b(g4,g5.h("e(1)").a(new A.fA(g3)),g6),g6.h("a.E"))
if(g7.length===0){p=58
break}g8=B.a.ae(g7,new A.fB(s,q,k3))
d7=a4.bo(g3,f9,q)
if(!d7.d||d7.b+d4>=f4){p=58
break}g9=A.c([new A.aX(q,A.c([],e7),A.c([],e8))],f2)
if(k5){g4=q.d
g5=k.i(0,"emergencyGold")
g5.toString
g5=g4<B.b.k(g5)+4
g4=g5}else g4=!1
if(g4){g4=A.f(g7)
g5=g4.h("b<1>")
h0=A.m(new A.b(g7,g4.h("e(1)").a(new A.fD(g8)),g5),g5.h("a.E"))
B.a.A(h0,new A.fE())
if(h0.length!==0&&k7.X()){b9=q.N()
if(b9.bm(B.a.gD(h0)))B.a.l(g9,new A.aX(b9,A.c([new A.y(B.u,B.a.gD(h0).a,null,null,0,B.d)],e7),A.c([B.a.gD(h0)],e8)))}}if(m){g4=q.u(k4)
g5=A.f(g4)
g6=g5.h("b<1>")
a0=A.m(new A.b(g4,g5.h("e(1)").a(new A.fF()),g6),g6.h("a.E"))
B.a.A(a0,new A.fG())
f=q.N()
if(a0.length!==0&&f.aA(k3,B.a.gD(a0))&&f.d>=f.a5(!0).a)B.a.l(g9,new A.aX(f,A.c([new A.y(B.k,B.a.gD(a0).a,k4,null,0,B.d)],e7),A.c([],e8)))}g4=A.m(g9,e6)
g5=g4.length
b5=0
for(;b5<g4.length;g4.length===g5||(0,A.t)(g4),++b5){h1=g4[b5]
h=h1.a.N()
if(m){g6=h.x.i(0,k4)
if(g6==null)g6=b7}else{g6=b3?1:0
g6=B.c.v(k8-b4-g6,0,5)}h2=Math.min(g6,h.u(k4).length-1)
g6=h.d
h3=h.b.b.i(0,"soldierCost")
h3.toString
h3=Math.max(0,B.c.aB(g6,B.b.k(h3)))
g6=h.f
h4=k.i(0,"soldierLimit")
h4.toString
h5=Math.min(h3,Math.min(g6,(h2+1)*B.b.k(h4))-h.e)
if(h5>0&&h.av(h5)&&h.d>=h.a5(!0).a){g6=A.m(h1.b,d2)
g6.push(new A.y(B.l,null,k4,null,h5,B.d))
B.a.l(g9,new A.aX(h,g6,h1.c))}}g4=g9.length,g5=g3.w<=e3,g6=g3.f,h3=g8===null,h4=!h3,b5=0
case 60:if(!(b5<g9.length)){p=62
break}h6=g9[b5]
h7=h6.a
h8=l.gaN()
h9=A.l(h8)
i0=h9.h("b<a.E>")
i1=A.m(new A.b(h8,h9.h("e(a.E)").a(new A.fH(s,h7)),i0),i0.h("a.E"))
B.a.A(i1,new A.fI())
h8=A.c([],e4)
if(i1.length!==0)h8.push(A.c([B.a.gD(i1).a],b1))
h8.push(A.c([],b1))
h9=h8.length
i0=h6.c
i2=J.aE(i0)
i3=h6.b
i4=J.aE(i3)
i5=h7.x
i6=0
case 63:if(!(i6<h8.length)){p=65
break}i7=h8[i6]
i8=a8.bi(g0)
i9=k.i(0,"soldierLimit")
i9.toString
f1=a6.d8(g3,f9,g1,i7,!0,Math.min(B.b.k(i9),h7.e),i8)
j0=f1.a===B.f
i8=!j0
i9=!1
if(i8)if(B.a.ga_(i7))if(h4)if(g1)if(g2){i9=k.i(0,"soldierHp")
i9.toString
i9=f1.f>=B.b.k(i9)}if(i9){if(m){i9=i5.i(0,k4)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.v(k8-b4-i9,0,5)}j1=k.i(0,"soldierLimit")
j1.toString
j2=a6.bk(g8,f9,i9,B.b.k(j1))
if(m){i9=i5.i(0,k4)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.v(k8-b4-i9,0,5)}j1=k.i(0,"soldierLimit")
j1.toString
j3=a6.d7(g8,f9,B.d,!1,i9,B.b.k(j1)).b-j2.b
if(j3>=d5)if(!j2.r){i9=(d6?null:c1.a)===B.p
j0=i9}else j0=!0
else j0=!1
j4=!1}else{j4=j0
j3=0}i9=!1
if(!j0)if(g5)if(h4)if(f1.d>0){i9=k.i(0,"soldierLimit")
i9.toString
i9=Math.min(B.b.k(i9),h7.e)
j1=k.i(0,"soldierHp")
j1.toString
j1=f1.f<g6+i9*B.b.k(j1)
i9=j1}if(i9){i9=h7.u(k4)
j1=A.f(i9)
j5=j1.h("b<1>")
i9=A.m(new A.b(i9,j1.h("e(1)").a(new A.fJ(g3)),j5),j5.h("a.E"))
j0=!1
j1=A.f(i9).h("G<1>")
i9=new A.G(i9,j1)
if(m){j5=i5.i(0,k4)
if(j5==null)j5=b7}else{j5=b3?1:0
j5=B.c.v(k8-b4-j5,0,5)}j6=new A.x(i9,0,j5,j1.h("x<k.E>"))
j6.T(i9,0,j5,j1.h("k.E"))
j7=B.a.dl(j6.af(0),new A.fK(g8))
if(j7<0){p=64
break}i9=h7.e
j1=k.i(0,"soldierLimit")
j1.toString
j8=Math.max(0,i9-(j7+1)*B.b.k(j1))
if(m){i9=i5.i(0,k4)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.v(k8-b4-i9,0,5)}j1=k.i(0,"soldierLimit")
j1.toString
j2=a6.bk(g8,f9,i9,Math.min(B.b.k(j1),j8))
if(m){i9=i5.i(0,k4)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.v(k8-b4-i9,0,5)}j1=k.i(0,"soldierLimit")
j1.toString
j5=f1.d
j9=a6.d5(g8,f9,j5,i9,Math.min(B.b.k(j1),j8))
j3=j9.b-j2.b
j4=j9.a===B.f
i9=k.i(0,"soldierHp")
i9.toString
if(j5>=B.b.k(i9))if(j3>=d5){if(!j4)i9=(d6?null:c1.a)!==B.f
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
j1=Math.min(B.b.k(j1),h7.e)}d8=a4.cn(h7,g3,d7,i9,f4,!0,f9,i7,j1,i8,"intercept",k3)
if(d8==null){p=64
break}i8=d8.a
k0=i8.L(k4)
j1=d8.b
j5=A.m(i3,d2)
B.a.G(j5,j1.b)
j6=A.jA(c7,c7)
j6.G(0,j1.c)
j6.G(0,a4.aa(new A.bz(i4.aJ(i3,new A.fL(s),c8),c9),A.c([],d1)))
j1=A.c([new A.N(j1.a,j5,j6,j1.d,j1.e,!0)],k6)
j6=s.a8(r,i8)
j5=Math.max(0,q.d-i8.d)
i9=i9?A.a4(g3)*0.5:0
k1=i2.E(i0,0,new A.fM(),b8)
if(m){k2=i8.x.i(0,k4)
if(k2==null)k2=b7}else{k2=b3?1:0
k2=B.c.v(k8-b4-k2,0,5)}k2=k0>k2||!j4
p=66
return l0.b=new A.a7(i8,j1,j6+200+j3*500-j5*0.25-i9-k1,k2,"","local"),1
case 66:case 64:h8.length===h9||(0,A.t)(h8),++i6
p=63
break
case 65:case 61:g9.length===g4||(0,A.t)(g9),++b5
p=60
break
case 62:p=58
break
case 59:p=56
break
case 57:if(k9.gM().gm(0)===1)l=(d6?null:c1.a)===B.p&&c3.length>1
else l=!1
p=l?67:68
break
case 67:l=k9.f,k=A.f(l),j=k.h("b<1>"),j=A.kh(new A.b(l,k.h("e(1)").a(new A.fO(s)),j),3,j.h("a.E")),k=j.a,j=new A.bb(k.gC(k),j.b,A.l(j).h("bb<1>"))
case 69:if(!j.j()){p=70
break}l=j.gp()
if(!k7.X()){p=70
break}b6=B.a.gD(c3)
d8=a4.cp(q,b6,a7.ap(b6,l.e,k9,!0,l),r.ga9(),!0,"\u4fdd\u7559\u539f\u57ce\u5b88\u519b\u62d6\u5ef6\uff0c\u6838\u5fc3\u5728\u5371\u9669\u7a97\u53e3\u524d\u593a\u53d6\u7a7a\u57ce\u5efa\u7acb\u65b0\u636e\u70b9","newBase",l)
p=d8!=null?71:72
break
case 71:l=d8.a
k=A.c([d8.b],k6)
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
aE(a,b,c,d,e){var s,r,q,p,o,n,m=this
t.f3.a(d)
s=A.f(d)
r=s.h("o?(1)").a(new A.h0(m))
q=c.z.dh(b.z).E(0,0,new A.h1(m),t.i)
p=c.N()
o=A.m(d,t.T)
s=A.m(new A.bz(new A.Q(d,r,s.h("Q<1,o?>")),t.cO),t.r)
r=a.d
n=A.f(r)
B.a.G(s,new A.Q(r,n.h("o(1)").a(new A.h2()),n.h("Q<1,o>")))
n=a.a
s=A.c([new A.N(e,o,m.e.aa(s,A.c([n],t.Y)),B.r,c.a5(!0).a,!0)],t.Z)
o=m.a8(a,c)
r=Math.max(0,b.d-c.d)
if(c.L(n.a)<=c.O(n)){n=m.a4(a,c)
n=(n==null?null:n.a)!==B.f}else n=!0
return new A.a7(p,s,o-q*0.65-r*0.2,n,"","local")},
bH(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=b.y,s=new A.ai(s,s.r,s.e,A.l(s).h("ai<2>")),r=this.e,q=a.a,p=q.a,o=this.a.Q,n=o.b,m=b.z,l=this.b.w.d,k=a.b;s.j();){j=s.d
if(j.b!=="intercept"||j.r!==p||j.y<=n)continue
i=o.Z(j.a)
if(i==null||i.f<=0||i.fx||m.n(0,i.a))continue
if(i.id===p)return!0
if(!i.db||j.z<=n)continue
h=r.bo(i,q,b)
if(h.d&&h.b+l<k)return!0}return!1},
cJ(a,b){var s,r
if(this.c.e)return!1
s=a.a
if(!(s.ax!=null||B.a.I(a.d,new A.fW())))return!1
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
if(d==null||d.fx||d.id!=null||d.f<=0||h.n(0,d.a)||B.a.I(q,new A.fX(d)))continue
c=d.z
for(e=J.lf(e.w,e.x),b=e.$ti,e=new A.r(e,e.gm(0),b.h("r<k.E>")),b=b.h("k.E"),a=0;e.j();c=a1){a0=e.d
a1=a0==null?b.a(a0):a0
a+=k.ag(c,a1)}if(!isFinite(a)||a+f>=b3.ga9())continue
p=Math.min(b4.f,p+d.gP())
e=A.as(d.K(),n,m)
e.B(0,"hp",d.r)
e.B(0,"troops",A.c([],l))
e.B(0,"s",0)
B.a.l(q,A.jZ(e))}B.a.A(q,new A.fY())
o=A.f(q)
n=t.r
a2=A.aD(new A.b(q,o.h("e(1)").a(new A.fZ(b3)),o.h("b<1>")),n)
m=A.c([],t.e)
if(a2!=null)m.push(a2)
o=o.h("G<1>")
B.a.G(m,new A.G(q,o).bz(0,o.h("e(k.E)").a(new A.h_(a2))))
a3=A.X(m,0,A.U(b4.O(s),"count",t.S),n).af(0)
if(a3.length===0)return b1
for(o=b0.d,n=s.d,m=b4.x,g=g.b,l=s.db,k=s.ay,s=s.ax,j=s==null,a4=b1,a5=0;a5<a3.length;++a5){d=a3[a5]
if(d.as===B.e)a6=0
else{i=g.i(0,"soldierLimit")
i.toString
a6=Math.min(p,B.b.k(i)-d.gP())}p-=a6
for(i=b2.length,a7=b1,a8=0;a8<b2.length;b2.length===i||(0,A.t)(b2),++a8){h=b2[a8].a
if(j){f=m.i(0,r)
if(f==null)f=n}else{f=l?1:0
f=B.c.v(s-k-f,0,5)}a9=o.bl(d,h,h.k4,Math.max(1,f-a5),!1,d.gP()+a6)
if(a7==null||a9.b<a7.b)a7=a9}if(a4==null||a7.b>a4.b)a4=a7}return a4},
a8(a,b){var s=a.a,r=b.L(s.a),q=Math.max(0,r-b.O(s)),p=this.a.Q.gM().gm(0)===1?400:0,o=150+s.r*4+a.r*0.5+p,n=this.a4(a,b)
s=r===0?o*2:0
p=n==null?null:n.b
if(p==null)p=-0.8
return-q*5000-s+p*o}}
A.h8.prototype={
$1(a){return this.a.bH(t.O.a(a),this.b)},
$S:12}
A.h9.prototype={
$1(a){t.J.a(a)
return a.f&&B.a.I(this.a.d,new A.h7(a))},
$S:10}
A.h7.prototype={
$1(a){return t.O.a(a).a.a===this.a.r},
$S:12}
A.ha.prototype={
$1(a){var s,r,q,p,o,n=this
t.cs.a(a)
s=!1
if(a.f==="local"){r=a.b
if(r.length!==0)if(B.a.I(r,new A.h5())){q=a.a
p=n.b
o=p.a
if(q.L(o.a)<=q.O(o)){s=n.a
q=s.a4(p,q)
q=q==null?null:q.b
if(q==null)q=-1
o=n.c
o=o==null?null:o.b
s=(q>(o==null?-1:o)+0.04||B.a.I(r,new A.h6()))&&a.c>s.a8(p,n.d)}}}return s},
$S:40}
A.h5.prototype={
$1(a){return B.a.I(t.I.a(a).b,new A.h4())},
$S:30}
A.h4.prototype={
$1(a){var s=t.T.a(a).a
return s===B.k||s===B.l||s===B.D},
$S:17}
A.h6.prototype={
$1(a){return B.a.I(t.I.a(a).d,new A.h3())},
$S:30}
A.h3.prototype={
$1(a){return t.J.a(a).b==="intercept"},
$S:10}
A.fp.prototype={
$1(a){return t.r.a(a).dy},
$S:0}
A.fq.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fr.prototype={
$1(a){t.r.a(a)
return a.dx&&a.e!==2},
$S:0}
A.fC.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.a4(a),A.a4(b))},
$S:2}
A.fN.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fP.prototype={
$1(a){return t.r.a(a).dy},
$S:0}
A.fQ.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fR.prototype={
$1(a){t.r.a(a)
return a.cy&&!this.a.as.n(0,a.a)},
$S:0}
A.fS.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.a4(s.a(b)),A.a4(a))},
$S:2}
A.fT.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:1}
A.fU.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.H(s),b.e.H(s))},
$S:4}
A.fs.prototype={
$1(a){return t.I.a(a).d},
$S:43}
A.ft.prototype={
$2(a,b){var s
A.ao(a)
s=this.a.a.Q.Z(t.J.a(b).a)
s.toString
return a+A.a4(s)},
$S:44}
A.fV.prototype={
$1(a){var s,r,q=this.a.a.Q,p=this.b
if(A.jO(a,q,p)==null){p=p.y
s=a.a
r=p.i(0,s)
if((r==null?null:r.b)==="intercept"){p=p.i(0,s)
q=q.Z(p==null?null:p.r)
q=q==null?null:q.f
q=(q==null?0:q)>0}else q=!1}else q=!0
return q},
$S:0}
A.fu.prototype={
$1(a){var s,r,q,p,o=this
t.r.a(a)
s=!1
if(a.b===o.a.a.Q.a)if(a.db)if(!a.fx){r=o.b
q=a.a
p=r.y.i(0,q)
if((p==null?null:p.as)!==!0)if(!r.as.n(0,q))s=!o.c.$1(a)||o.d}return s},
$S:0}
A.fv.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a
if(!J.af(s.$1(a),s.$1(b)))return s.$1(a)?1:-1
s=this.b.e
return B.b.t(a.z.H(s),b.z.H(s))},
$S:2}
A.fw.prototype={
$1(a){return t.O.a(a).a},
$S:21}
A.fx.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.kN(a,s)>A.kN(b,s)?a:b},
$S:18}
A.fy.prototype={
$1(a){t.r.a(a)
return a.w<=this.a.b.w.p4&&a.x<15},
$S:0}
A.fz.prototype={
$2(a,b){var s,r,q,p=t.r
p.a(a)
p.a(b)
p=this.a.b
s=p.w.p4
r=a.w<=s
if(r!==b.w<=s)return r?-1:1
s=this.b
q=this.c
return B.b.t(A.dt(a,p,s.O(q),4),A.dt(b,p,s.O(q),4))},
$S:2}
A.fA.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fB.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a.b
s=this.b
r=this.c
return A.dt(a,q,s.O(r),4)>A.dt(b,q,s.O(r),4)?a:b},
$S:18}
A.fD.prototype={
$1(a){t.r.a(a)
return a!==this.a&&a.dx&&a.e!==2},
$S:0}
A.fE.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.a4(a),A.a4(b))},
$S:2}
A.fF.prototype={
$1(a){return t.r.a(a).dy},
$S:0}
A.fG.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fH.prototype={
$1(a){var s
t.o.a(a)
s=this.b.w.i(0,a.a)
if((s==null?0:s)<=0)s=a.f&&this.a.a.Q.c>=a.e
else s=!0
return s},
$S:19}
A.fI.prototype={
$2(a,b){var s=t.o
s.a(a)
return B.c.t(s.a(b).c,a.c)},
$S:20}
A.fJ.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fK.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fL.prototype={
$1(a){return this.a.a.Q.Z(t.T.a(a).b)},
$S:29}
A.fM.prototype={
$2(a,b){return A.z(a)+A.a4(t.r.a(b))*0.65},
$S:50}
A.fO.prototype={
$1(a){var s
t.q.a(a)
s=this.a.a.Q
return a.b!==s.a&&s.u(a.a).length===0},
$S:1}
A.h0.prototype={
$1(a){return this.a.a.Q.Z(t.T.a(a).b)},
$S:29}
A.h1.prototype={
$2(a,b){var s
A.ao(a)
s=this.a.a.Q.Z(A.K(b))
s.toString
return a+A.a4(s)},
$S:51}
A.h2.prototype={
$1(a){return t.O.a(a).a},
$S:21}
A.fW.prototype={
$1(a){var s,r,q
t.O.a(a)
s=a.a
r=s.as
if(r!==B.x){q=!1
if(a.c>=0.9)if(r!==B.n){s=s.Q
s=Math.abs(s.a)+Math.abs(s.b)>0.01}else s=q
else s=q}else s=!0
return s},
$S:12}
A.fX.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fY.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.fZ.prototype={
$1(a){return t.r.a(a).a===this.a.a.CW},
$S:0}
A.h_.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.v.prototype={
K(){return A.c([this.a,this.b],t.n)},
H(a){var s=this.a-a.a,r=this.b-a.b
return Math.sqrt(s*s+r*r)},
aI(a,b){var s=this.a,r=this.b
return new A.v(s+(a.a-s)*b,r+(a.b-r)*b)}}
A.eg.prototype={
a0(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this.a,f=B.a.gD(g)
for(s=a.a,r=a.b,q=1/0,p=0;o=g.length,p<o;){n=g[p];++p
m=g[p%o]
o=n.a
l=m.a-o
k=n.b
j=m.b-k
i=n.aI(m,B.b.v(((s-o)*l+(r-k)*j)/(l*l+j*j),0,1))
h=i.H(a)
if(h<q){q=h
f=i}}return f},
n(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(this.a0(b).H(b)<1e-7)return!0
for(s=this.a,r=s.length,q=b.b,p=b.a,o=!1,n=0;n<r;){m=s[n];++n
l=s[n%r]
k=m.b
j=l.b
if(k>q!==j>q){i=m.a
i=p<(l.a-i)*(q-k)/(j-k)+i
k=i}else k=!1
if(k)o=!o}return o},
c8(a,b){var s
if(this.n(0,a))return null
s=this.c5(a,b)
return s.length===0?null:B.a.ae(s,B.B)},
c5(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.a,g=b.a-h,f=a.b,e=b.b-f,d=A.c([],t.n)
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
bY(a,b){var s,r=this
if(r.n(0,a))return r.a0(a)
s=r.c8(a,b)
return s==null?r.a0(a):a.aI(b,s)},
c6(a,b){var s=a.H(b),r=s<1e-7?new A.v(a.a+4096,a.b+0):a.aI(b,4096/s),q=this.c5(a,r)
return q.length===0?this.a0(b):a.aI(r,B.a.ae(q,B.A))}}
A.al.prototype={
aR(){return"AiArmyState."+this.b}}
A.o.prototype={
gP(){var s=this.at,r=A.f(s)
return new A.b(s,r.h("e(1)").a(new A.dw()),r.h("b<1>")).gm(0)},
gbn(){return this.f+B.a.E(this.at,0,new A.dv(),t.H)},
K(){var s,r,q,p,o,n,m,l=this,k=l.z,j=t.n
k=A.c([k.a,k.b],j)
s=l.Q
s=A.c([s.a,s.b],j)
r=l.ch
r=r==null?null:A.c([r.a,r.b],j)
q=A.c([],t.b)
for(p=l.p1,o=p.length,n=0;n<p.length;p.length===o||(0,A.t)(p),++n){m=p[n]
q.push(A.c([m.a,m.b],j))}return A.R(["id",l.a,"c",l.b,"home",l.c,"o",l.d,"t",l.e,"hp",l.f,"max",l.r,"a",l.w,"p",l.x,"pay",l.y,"xy",k,"v",s,"s",l.as.a,"troops",l.at,"w",l.ax,"m",l.ay,"to",r,"target",l.CW,"return",l.cx,"dispatch",l.cy,"move",l.db,"dismiss",l.dx,"upgrade",l.dy,"retreat",l.fr,"marked",l.fx,"rev",l.fy,"orderRev",l.go,"opponent",l.id,"clashes",l.k1,"received",l.k2,"dealt",l.k3,"opening",l.k4,"weaponReady",l.ok,"returnPath",q,"regionCity",l.p2,"salaryPaidMonth",l.p3,"movementPending",l.p4],t.N,t.X)}}
A.dw.prototype={
$1(a){return A.ao(a)>0},
$S:14}
A.dv.prototype={
$2(a,b){return A.z(a)+A.ao(b)},
$S:15}
A.E.prototype={
ga2(){var s,r=this,q=r.ax
if(q==null)q=r.d
else{s=r.db?1:0
s=B.c.v(q-r.ay-s,0,5)
q=s}return q},
K(){var s,r,q,p,o,n=this,m=n.e,l=t.n
m=A.c([m.a,m.b],l)
s=A.c([],t.b)
for(r=n.f.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.t)(r),++p){o=r[p]
s.push(A.c([o.a,o.b],l))}return A.R(["id",n.a,"c",n.b,"native",n.c,"level",n.d,"xy",m,"outline",s,"income",n.r,"baseIncome",n.z,"poor",n.w,"cap",n.x,"recruitCap",n.y,"recruit",n.Q,"upgrade",n.as,"rev",n.at,"initial",n.ax,"wins",n.ay,"attacker",n.ch,"defender",n.CW,"stage",n.cx,"next",n.cy,"fallen",n.db,"danger",n.dx],t.N,t.X)}}
A.b1.prototype={
K(){var s,r,q=this,p=t.N,o=t.S,n=A.W(p,o)
for(s=q.x.gam(),s=s.gC(s);s.j();){r=s.gp()
n.B(0,""+r.a,r.b)}o=A.W(p,o)
for(s=q.y.gam(),s=s.gC(s);s.j();){r=s.gp()
o.B(0,""+r.a,r.b)}return A.R(["id",q.a,"gold",q.b,"reserves",q.c,"capacity",q.d,"salary",q.e,"poor",q.f,"baseIncome",q.r,"garrisonAccrued",q.w,"stock",n,"hate",o],p,t.X)}}
A.e8.prototype={
gak(){return B.a.an(this.w,new A.ee(this))},
gM(){var s=this.f,r=A.f(s)
return new A.b(s,r.h("e(1)").a(new A.ef(this)),r.h("b<1>"))},
u(a){var s=this.r,r=A.f(s),q=r.h("b<1>")
s=A.m(new A.b(s,r.h("e(1)").a(new A.eb(this,a)),q),q.h("a.E"))
B.a.A(s,new A.ec())
return s},
Z(a){var s=this.r,r=A.f(s)
return A.aD(new A.b(s,r.h("e(1)").a(new A.ed(a)),r.h("b<1>")),t.r)},
J(a){var s=this.f,r=A.f(s)
return A.aD(new A.b(s,r.h("e(1)").a(new A.e9(a)),r.h("b<1>")),t.q)},
K(){var s,r,q,p,o=this,n=t.d,m=A.c([],n)
for(s=o.f,r=s.length,q=0;q<r;++q)m.push(s[q].K())
s=A.c([],n)
for(r=o.r,p=r.length,q=0;q<p;++q)s.push(r[q].K())
n=A.c([],n)
for(r=o.w,p=r.length,q=0;q<p;++q)n.push(r[q].K())
return A.R(["country",o.a,"tick",o.b,"month",o.e,"cities",m,"heroes",s,"countries",n,"pool",o.x,"salary",o.y,"year",o.c,"monthIndex",o.d],t.N,t.X)}}
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
s=(r===B.h||r===B.e)&&a.f>0&&a.b===B.a.an(this.a.f,new A.ea(s)).b}else s=!1
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
A.hp.prototype={
cu(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
for(s=this.b,r=s.y,r=new A.ai(r,r.r,r.e,A.l(r).h("ai<2>")),q=this.f,p=this.a,o=p.a,n=s.z,s=s.Q;r.j();){m=r.d
l=p.Z(m.a)
k=p.J(m.d)
j=!0
if(m.b==="expedition")if(l!=null)if(k!=null)if(k.b!==o)if(l.b===o)if(!l.fx)if(!(l.f<=0)){m=l.a
if(!n.n(0,m)){i=l.as
if(i!==B.y)m=(i===B.h||i===B.e)&&!s.n(0,m)
else m=j}else m=j}else m=j
else m=j
else m=j
else m=j
else m=j
else m=j
else m=j
if(m)continue
J.l9(q.cd(k.a,new A.hr()),l)}},
gaY(){var s,r,q,p=this,o=p.d
if(o==null||p.f.a!==0)return o
s=new A.hv(p)
r=p.a
if(A.aS(o,r,p.c,null).ga6())return s.$1(o)?o:null
r=r.f
q=A.f(r)
return new A.Q(r,q.h("d(1)").a(new A.ht()),q.h("Q<1,d>")).dI(0).I(0,new A.hu(p,s))?null:o},
gcc(){var s,r=this
if(r.gaY()!=null){s=r.a.J(r.e)
s=s==null?null:s.b
s=s==r.gaY()}else s=!1
return s?r.e:null},
ga1(){var s=this.f,r=A.l(s).h("a8<1>"),q=A.m(new A.a8(s,r),r.h("a.E"))
B.a.A(q,new A.hz(this))
return A.aD(q,t.S)},
gca(){var s,r=this,q=r.ga1()
if(q!=null){s=r.c.w
s=r.a.d>=s.k2&&r.f.a<s.k1&&r.da(q)>=s.k3}else s=!0
return s},
au(a){var s,r,q,p=this
if(p.ga1()==null)return!0
s=!1
if(p.gaY()!=null)if(a.b!==p.gaY())s=p.ga1()==null||!p.gca()
if(s)return!1
r=p.ga1()
if(r==null)r=p.gcc()
s=!0
if(r!=null){q=a.a
if(q!==r)s=p.ga1()!=null&&!p.f.a3(q)&&p.gca()}return s},
da(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c="soldierLimit",b=d.a,a=b.J(a0)
a.toString
s=d.f.i(0,a0)
if(s==null)s=A.c([],t.e)
r=s.length
q=d.b.Q
p=d.c.b
o=0
n=0
for(;n<s.length;s.length===r||(0,A.t)(s),++n){m=s[n]
if(q.n(0,m.a)){l=p.i(0,c)
l.toString
k=B.b.k(l)}else k=m.gP()
o+=d.bQ(m,k,0)}j=B.a.an(b.w,new A.hs(a)).c
for(b=b.u(a0),s=A.f(b).h("G<1>"),s=A.X(new A.G(b,s),0,A.U(a.ga2(),"count",t.S),s.h("k.E")),b=s.$ti,s=new A.r(s,s.gm(0),b.h("r<k.E>")),r=a.db,q=a.ax,l=a.ay,i=q==null,b=b.h("k.E"),a=a.d,h=0,g=0;s.j();){f=s.d
if(f==null)f=b.a(f)
e=p.i(0,c)
e.toString
k=Math.min(B.b.k(e),f.gP()+j)
j-=k-f.gP()
if(i)e=a
else{e=r?1:0
e=B.c.v(q-l-e,0,5)}h+=d.bQ(f,k,Math.max(1,e-g));++g}return h===0?1/0:o/h},
bQ(a,b,c){var s,r=this.c,q=r.c0(a.w,c,!1)
r=r.b
s=r.i(0,"soldierPower")
s.toString
s=B.b.k(s)
r=r.i(0,"soldierHp")
r.toString
return(a.f+b*B.b.k(r))*(B.c.bh(q+b*s+2,4)+1)*(1+a.ay/1000)}}
A.hq.prototype={
$1(a){var s=t.q.a(a).b
return s===this.a&&s!==this.b.a},
$S:1}
A.hr.prototype={
$0(){return A.c([],t.e)},
$S:61}
A.hv.prototype={
$1(a){var s=this.a,r=s.a.f,q=A.f(r)
return new A.b(r,q.h("e(1)").a(new A.hx(a)),q.h("b<1>")).I(0,new A.hy(s))},
$S:16}
A.hx.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.hy.prototype={
$1(a){var s
t.q.a(a)
s=this.a
return s.a.gM().I(0,new A.hw(s,a))},
$S:1}
A.hw.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.b.c.ag(r,this.b.f.a0(r))<=s.c.w.at},
$S:1}
A.ht.prototype={
$1(a){return t.q.a(a).b},
$S:53}
A.hu.prototype={
$1(a){var s
A.h(a)
s=this.a
return A.aS(a,s.a,s.c,null).ga6()&&this.b.$1(a)},
$S:16}
A.hz.prototype={
$2(a,b){var s,r
A.h(a)
A.h(b)
s=this.a.f
r=B.c.t(s.i(0,b).length,s.i(0,a).length)
return r!==0?r:B.c.t(a,b)},
$S:31}
A.hs.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.d7.prototype={}
A.hA.prototype={
aj(a){var s=this.a.Q
return!A.aS(a.b,s,this.b,null).ga6()||s.gM().gm(0)>=3||s.gM().I(0,new A.hD(this,a))},
bs(a,b,c,d){var s,r,q=a.as
if(!(q===B.h||q===B.e)){q=a.ax
s=t.p
return q.length===0?A.c([],s):A.c([q],s)}r=this.bg(b,a)
if(r.length===0)return A.c([],t.p)
return A.c([A.c([B.a.gD(r).a],t.a)],t.p)},
bg(a,b){var s=this.b.r.gaN(),r=A.l(s),q=r.h("b<a.E>"),p=A.m(new A.b(s,r.h("e(a.E)").a(new A.hB(this,a,b)),q),q.h("a.E"))
B.a.A(p,new A.hC())
return p},
cX(a){return this.bg(a,null)},
aZ(a,b,c,d){var s,r,q,p,o,n,m,l,k,j=this
if(a===0||b.ga2()<3||j.a.Q.u(b.a).length<2)return a
s=A.aD(j.bg(c,d),t.o)
r=s==null?null:s.b
if(r==null)r=0
s=j.a.Q.r
q=A.f(s)
p=q.h("e(1)")
q=q.h("b<1>")
o=new A.b(s,p.a(new A.hG(j)),q).E(0,0,new A.hH(),t.S)
n=d.z
m=j.c.ag(n,b.f.a0(n))
l=new A.b(s,p.a(new A.hI(j,o,m,b,c)),q).gm(0)
k=Math.max(0,c.d-c.V().a-20)
s=j.b
q=s.b.i(0,"soldierLimit")
q.toString
return Math.max(a,Math.min(s.w.fy,Math.min(l,B.c.aB(k,Math.max(1,r+B.b.k(q))))))},
dg(a){var s,r,q,p,o,n=this.a.Q
if(n.c<3)return 1
s=A.aD(this.cX(a),t.o)
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
return Math.max(1,Math.min(q.fy,B.b.aB(p,Math.max(1,r+o+n.y+B.b.k(s)))))},
aa(a,b){var s,r,q,p,o
t.ef.a(a)
t.W.a(b)
s=t.N
s=A.W(s,s)
for(r=J.H(a);r.j();){q=r.gp()
s.B(0,"h:"+q.a,q.fy)}for(r=b.length,p=0;p<b.length;b.length===r||(0,A.t)(b),++p){o=b[p]
s.B(0,"c:"+o.a,o.at)}return s},
al(a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7=this,a8=null
t.L.a(b7)
if(!b1.d||!isFinite(b1.b)||J.ju(b1.a)||b0.fx||a9.as.n(0,b0.a))return a8
s=b1.b
r=a7.b
q=r.w
p=q.d
o=s+p
if(o>=b4)return a8
n=c2==="expedition"
if(n)m=!a7.aj(c3)
else m=!1
if(m)return a8
m=b0.a
l=a9.y.i(0,m)
k=l==null
if(!k){if(l.z>a7.a.Q.b&&!b5)return a8
j=!1
if(l.b===c2){i=l.d
if(i===c3.a){if(n){i=l.e
i=i===c3.b}else i=!0
if(i){i=l.r
if(i==(b6==null?a8:b6.a)){j=l.w
i=J.cA(j)
j=i.gaz(j)&&i.gaH(j).H(J.ld(b1.a))<32&&b0.as!==B.n}}}}if(j)return a8}h=a9.N()
g=A.c([],t.w)
if(!b2){j=r.b
i=j.i(0,"battleBudget")
i.toString
f=b3?1:c3.ga2()
f=Math.min(f,a7.a.Q.u(c3.a).length)
f=Math.max(1,f)
j=j.i(0,"budgetSafety")
j.toString
o+=i*(b9+1)*f+s+j}if(o>q.p1)return a8
s=c3.a
j=b6==null
i=j?a8:b6.a
f=a7.a
e=f.Q
d=e.b
p=B.b.aw(isFinite(b4)?b4*60:(Math.max(o,60)+q.cx+p)*60)
c=B.b.aK(q.CW*60)
b=b1.a
a=b2&&c0
if(n)n=c3.b
else n=a8
a0=new A.a5(m,c2,c1,s,n,b3,i,b,0,d+p,d+c,0,b2,a,b0.go+1)
p=!1
if(b2){n=h.L(s)
p=(k?a8:l.as)===!0&&l.y>=d&&l.d===s?1:0
q=c0?Math.max(h.O(c3),c3.y+q.cy):h.O(c3)
q=n-p>=q}else q=p
if(q)return a8
q=b0.as
if(q===B.h||q===B.e){q=h.f
r=r.b.i(0,"soldierLimit")
r.toString
a1=Math.max(0,Math.min(q,b8+B.b.k(r)-b0.gP())-h.e)
if(a1>0){if(f.x===B.o)return a8
if(!h.av(a1))return a8
B.a.l(g,new A.y(B.l,a8,b0.c,a8,a1,B.d))}r=t.S
a2=A.W(r,r)
for(r=b7.length,q=h.w,f=f.x===B.o,a3=0;a3<b7.length;b7.length===r||(0,A.t)(b7),++a3){a4=b7[a3]
a2.aM(a4,new A.hJ(),new A.hK())
p=q.i(0,a4)
if(p==null)p=0
n=a2.i(0,a4)
n.toString
if(p<n){if(f)return a8
if(!h.c2(a4))return a8
B.a.l(g,new A.y(B.w,a8,a8,a8,a4,B.d))}}if(!h.df(b0,b7,a0))return a8
if(h.e<b8)return a8
if(c2==="intercept"||b.length>1)s=a8
B.a.l(g,new A.y(B.D,m,s,J.jY(b),0,b7))}else{if(!h.dB(b0,a0))return a8
if(c2==="intercept"||b.length>1)s=a8
B.a.l(g,new A.y(B.O,m,s,J.jY(b),0,B.d))}a5=h.a5(b5).a
a6=B.a.I(g,new A.hL())
if(a6&&h.d<a5)return a8
s=A.c([b0],t.e)
if(!j)s.push(b6)
r=e.J(b0.c)
r.toString
r=A.c([r],t.Y)
r.push(c3)
s=a7.aa(s,r)
r=A.c([a0],t.m)
return new A.d7(h,new A.N(c1,g,s,r,a6?a5:h.d,b5))},
cm(a,b,c,d,e,f,g,h,i,j){return this.al(a,b,c,d,!1,e,f,null,B.d,0,0,g,h,i,j)},
co(a,b,c,d,e,f,g,h){return this.al(a,b,c,d,!1,1/0,!1,null,B.d,0,0,e,f,g,h)},
bw(a,b,c,d,e,f,g,h,i,j){return this.al(a,b,c,!1,d,1/0,!1,null,e,f,g,!1,h,i,j)},
cq(a,b,c,d,e,f,g,h,i){return this.al(a,b,c,!1,d,1/0,e,null,B.d,0,f,!1,g,h,i)},
b1(a,b,c,d,e,f,g,h,i){return this.al(a,b,c,d,!1,e,f,null,B.d,0,0,!1,g,h,i)},
cr(a,b,c,d,e,f,g,h,i){return this.al(a,b,c,!1,!1,d,e,f,B.d,0,0,!1,g,h,i)},
cn(a,b,c,d,e,f,g,h,i,j,k,l){return this.al(a,b,c,!1,d,e,f,g,h,i,0,!1,j,k,l)},
cp(a,b,c,d,e,f,g,h){return this.al(a,b,c,!1,!1,d,e,null,B.d,0,0,!1,f,g,h)},
bo(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a5.id!=null)return B.t
s=this.a.Q
r=s.J(a4.c)
r.toString
q=a4.as
p=q===B.h||q===B.e?r.f.c6(r.e,a5.z):a4.z
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
g=h.bi(p)
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
a0=A.m(new A.b(A.c([(m-a)/j,(m+a)/j],t.n),t.db.a(new A.hE()),g),g.h("a.E"))
if(a0.length!==0)b=B.a.ae(a0,B.B)}for(m=s.f,a1=B.t,a2=0;a2<3;++a2){a3=new A.v(q+l*b,r+k*b)
if(!h.n(0,a3)||B.a.I(m,new A.hF(a3)))return B.t
a1=i.dH(a4,a3,s)
if(!a1.d)return a1
j=a1.b
if(Math.abs(b-j)<0.1)break
b=(b+j)/2}return a1}}
A.hD.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.c.ag(r,this.b.f.a0(r))<=s.b.w.at},
$S:1}
A.hB.prototype={
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
$S:19}
A.hC.prototype={
$2(a,b){var s,r=t.o
r.a(a)
r.a(b)
s=B.c.t(b.c-b.d,a.c-a.d)
return s!==0?s:B.c.t(a.b,b.b)},
$S:20}
A.hG.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a.Q.a&&!a.fx},
$S:0}
A.hH.prototype={
$2(a,b){return Math.max(A.h(a),t.r.a(b).w)},
$S:9}
A.hI.prototype={
$1(a){var s,r,q,p,o,n=this
t.r.a(a)
s=n.a
r=!1
if(a.b===s.a.Q.a)if(!a.fx)if(a.f>=a.r*0.65)if(a.w>=n.b*0.8){q=!1
if(a.cy){p=n.c
if(p!=null){o=a.z
s=Math.abs(s.c.ag(o,n.d.f.a0(o))-p)<=s.b.w.ok}else s=!0
if(s){s=n.e
s=s.aq(a)&&!s.as.n(0,a.a)}else s=q}else s=q
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
A.hJ.prototype={
$1(a){return A.h(a)+1},
$S:7}
A.hK.prototype={
$0(){return 1},
$S:5}
A.hL.prototype={
$1(a){return t.T.a(a).a===B.w},
$S:17}
A.hE.prototype={
$1(a){return A.ao(a)>=0},
$S:14}
A.hF.prototype={
$1(a){return t.q.a(a).f.n(0,this.a)},
$S:1}
A.aF.prototype={
aR(){return"AiDecisionStage."+this.b}}
A.ak.prototype={
aR(){return"AiActionKind."+this.b}}
A.y.prototype={
K(){var s=this,r=s.d
r=r==null?null:A.c([r.a,r.b],t.n)
return A.R(["kind",s.a.a,"hero",s.b,"city",s.c,"point",r,"amount",s.e,"weapons",s.f],t.N,t.X)}}
A.a5.prototype={
K(){var s,r,q,p,o,n=this,m=A.c([],t.b)
for(s=n.w,r=s.length,q=t.n,p=0;p<s.length;s.length===r||(0,A.t)(s),++p){o=s[p]
m.push(A.c([o.a,o.b],q))}return A.R(["hero",n.a,"role",n.b,"deadline",n.y,"commit",n.z,"city",n.d,"enemy",n.r,"points",m,"leg",n.x,"gold",n.Q,"slot",n.as,"rearStaging",n.at,"reason",n.c,"order",n.ax,"targetCountry",n.e,"attrition",n.f],t.N,t.X)}}
A.N.prototype={
K(){var s,r,q,p=this,o=t.d,n=A.c([],o)
for(s=p.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.t)(s),++q)n.push(s[q].K())
o=A.c([],o)
for(s=p.d,r=s.length,q=0;q<s.length;s.length===r||(0,A.t)(s),++q)o.push(s[q].K())
return A.R(["reason",p.a,"actions",n,"deps",p.c,"tasks",o,"floor",p.e,"emergency",p.f],t.N,t.X)}}
A.bP.prototype={
K(){var s,r,q,p=this,o=A.c([],t.d)
for(s=p.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.t)(s),++q)o.push(s[q].K())
return A.R(["phase",p.a,"target",p.b,"gold",p.c,"heroes",p.d,"groups",o,"notes",p.f,"limited",p.r,"assessments",p.w,"routeSteps",p.x,"expansions",p.y],t.N,t.X)}}
A.ej.prototype={
K(){var s,r,q,p=this,o=p.Q.K(),n=A.c([],t.d)
for(s=p.as,r=s.length,q=0;q<s.length;s.length===r||(0,A.t)(s),++q)n.push(s[q].K())
return A.R(["protocol",1,"session",p.a,"id",p.d,"rules",p.b,"map",p.c,"observation",o,"deadline",p.e,"tasks",n,"seed",p.f,"priority",p.r,"idle",p.w,"stage",p.x.b,"offensiveCountry",p.y,"offensiveCity",p.z],t.N,t.X)}}
A.ei.prototype={
K(){var s=this
return A.R(["protocol",1,"session",s.a,"id",s.d,"country",s.e,"rules",s.b,"map",s.c,"tick",s.f,"deadline",s.r,"plan",s.x.K(),"micros",s.w,"error",s.y],t.N,t.X)}}
A.ja.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.jb.prototype={
$0(){var s=this,r=s.a,q=r.c,p=!1
if(s.b.length!==0)if(q!=null)if(!q.r){p=s.c
p=p.f>=p.r*0.5&&q.c>0&&q.b>=s.d.w.ch}if(p)return new A.aO([!0,q.b,1,q.c])
return new A.aO([!1,r.b,0,r.a])},
$S:54}
A.jo.prototype={
$1(a){t.cJ.a(a)
return this.a.H(a.a)>this.b+a.b},
$S:55}
A.jp.prototype={
$1(a){t.fg.a(a)
return!a.b&&this.a.H(a.a)>this.b},
$S:56}
A.hP.prototype={
dv(i2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9=this,i0=null,i1={}
i1.a=i2
s=h9.a
r=s.Q
q=t.Z
p=A.c([],q)
o=A.c([],t.dZ)
i1.b=i1.c=!1
n=h9.b
m=s.y
s=s.z
l=A.c9(r,i2,n,s,m)
k=r.r
j=A.f(k)
i=j.h("e(1)")
j=j.h("b<1>")
h=A.m(new A.b(k,i.a(new A.hS(r)),j),j.h("a.E"))
B.a.A(h,new A.hT())
g=r.f
f=A.f(g)
e=f.h("e(1)")
f=f.h("b<1>")
d=f.h("a.E")
c=A.m(new A.b(g,e.a(new A.hU(h9,r,l)),f),d)
if(h.length!==0)B.a.A(c,new A.i4(h9,h,r))
b=A.aD(c,t.q)
a=i2.ce(c)
a0=b==null
a1=a0?i0:A.aS(b.b,r,n,i0)
a2=a1==null
a3=new A.hR(h9,(a2?i0:a1.ga6())===!0?Math.min(B.b.aw(a1.c*a1.gaW()),Math.max(0,i2.d-i2.V().a)):0)
a4=new A.hQ(i1,h9,p)
a5=r.gM()
a6=A.m(a5,a5.$ti.h("a.E"))
B.a.A(a6,new A.ig(i1,h9))
a5=t.S
a7=Math.min(i1.a.f,B.a.E(a6,0,new A.ih(i1,h9),a5))
if(a6.length!==0&&a7>i1.a.e){a8=i1.a.N()
a9=Math.min(a7-a8.e,a8.gbX())
if(a9>0&&a8.av(a9))a4.$4(a8,A.c([new A.y(B.l,i0,B.a.gD(a6).a,i0,a9,B.d)],t.w),"\u4f18\u5148\u7528\u73b0\u6709\u4f59\u989d\u8865\u5145\u5b88\u5c06\u548c\u5f85\u51fa\u5f81\u5c06\u9886\u7684\u5175\u5458\uff0c\u4e70\u5f97\u8d77\u591a\u5c11\u8865\u591a\u5c11\uff0c\u4e0d\u900f\u652f",B.a.gD(a6))}for(b0=a6.length,b1=h9.e,b2=n.w,b3=b2.fx,b4=b3-2,b5=t.w,b6=0;b7=a6.length,b6<b7;a6.length===b0||(0,A.t)(a6),++b6){b8=a6[b6]
if(p.length>=b4)break
b7=b8.a
b9=b1.i(0,b7)
if(b9==null)b9=i0
else b9=b9.d.length!==0||b9.a.ax!=null
if(b9!==!0||b8.ax!=null)continue
c0=i1.a.u(b7)
b9=c0.length
c1=i1.a
c2=b8.ax
if(c2==null){c1=c1.x.i(0,b7)
if(c1==null)c1=b8.d}else{c1=b8.db?1:0
c1=B.c.v(c2-b8.ay-c1,0,5)}if(b9<=c1){b9=b1.i(0,b7)
if(b9==null)b9=i0
else{b9=b9.f
b9=b9==null?i0:b9.a}b9=b9!==B.p}else b9=!1
if(b9)continue
b9=A.f(c0)
c1=b9.h("b<1>")
c3=A.m(new A.b(c0,b9.h("e(1)").a(new A.ii()),c1),c1.h("a.E"))
B.a.A(c3,new A.ij())
if(c3.length===0)continue
c4=B.a.gD(c3)
a8=i1.a.N()
if(a8.aA(b8,c4)&&a8.d>=a8.a5(!0).a)a4.$6$emergency$hero(a8,A.c([new A.y(B.k,c4.a,b7,i0,0,B.d)],b5),"\u9632\u5fa1\u7b56\u7565\u53d1\u73b0\u6765\u654c\uff0c\u4f18\u5148\u63d0\u9ad8\u5fc5\u8981\u57ce\u9632\uff0c\u5347\u7ea7\u540e\u4ecd\u4fdd\u7559\u4f59\u989d",b8,!0,c4)}c5=new A.io(i1,h9,a7,b,a3,r,a4)
for(b6=0;b0=a6.length,b6<b0;a6.length===b7||(0,A.t)(a6),++b6){b8=a6[b6]
if(p.length>=b4)break
b0=b8.a
c0=i1.a.u(b0)
b9=b1.i(0,b0)
if(b9==null)b9=i0
else b9=b9.d.length!==0||b9.a.ax!=null
c1=i1.a.L(b0)
c2=i1.a
c2=c2.ax.n(0,b0)||c2.W(b8)?0:1
c6=!1
if(b9===!0){b9=i1.a.L(b0)
c7=b8.ax
if(c7==null)c7=b8.d
else{c8=b8.db?1:0
c8=B.c.v(c7-b8.ay-c8,0,5)
c7=c8}if(b9<c7){if(c0.length!==0){b0=b1.i(0,b0)
if(b0==null)b0=i0
else{b0=b0.f
b0=b0==null?i0:b0.a}b0=b0!==B.f}else b0=!0
c6=b0}}if(c1<c2||c6)c5.$2$defense(b8,!0)}for(b7=h9.c,b9=n.r,c1=n.b,c2=h9.d,c7=t.a,b6=0;b6<a6.length;a6.length===b0||(0,A.t)(a6),++b6){b8=a6[b6]
if(p.length>=b4)break
c9=b7.dg(i1.a)
d0=new A.b(k,i.a(new A.ik(i1,r,Math.max(12,new A.b(k,i.a(new A.il(r)),j).E(0,0,new A.im(),a5)*0.8))),j).gm(0)
d1=c9>=2&&d0+i1.a.at.a<c9&&B.a.I(g,new A.hV(r))
if(d1){c8=b8.a
d2=b1.i(0,c8)
if(d2==null)d2=i0
else d2=d2.d.length!==0||d2.a.ax!=null
c8=d2!==!0&&i1.a.u(c8).length>=b8.y}else c8=!1
if(c8){c8=i1.a.u(b8.a)
d2=A.f(c8)
d3=d2.h("b<1>")
d4=A.m(new A.b(c8,d2.h("e(1)").a(new A.hW(i1,h9)),d3),d3.h("a.E"))
B.a.A(d4,new A.hX())
if(d4.length!==0){a8=i1.a.N()
d5=B.a.gD(d4)
if(a8.bm(d5))a4.$5$hero(a8,A.c([new A.y(B.u,d5.a,i0,i0,0,B.d)],b5),"\u5b89\u5168\u540e\u65b9\u6e05\u7406\u4f4e\u4ef7\u503c\u5197\u4f59\u7f16\u5236\uff0c\u4fdd\u7559\u5b9e\u9645\u5b88\u5c06\u548c\u5185\u653f\u5c06\u9886\uff0c\u4e3a\u5f3a\u653b\u4e3b\u529b\u8865\u5458",b8,d5)}}c8=b8.a
c0=i1.a.u(c8)
d2=A.f(c0)
d3=d2.h("b<1>")
c3=A.m(new A.b(c0,d2.h("e(1)").a(new A.hY()),d3),d3.h("a.E"))
B.a.A(c3,new A.hZ())
if(c0.length!==0&&b9.gaz(b9)){d6=B.a.ae(c0,new A.i_())
d2=b9.gaN()
d3=A.l(d2)
d7=d3.h("b<a.E>")
d8=A.m(new A.b(d2,d3.h("e(a.E)").a(new A.i0(r)),d7),d7.h("a.E"))
B.a.A(d8,new A.i1())
d9=A.m(new A.b(g,e.a(new A.i2(i1,h9,r,d6)),f),d)
B.a.A(d9,new A.i3(h9,d6,r))
e0=d9.length===0?0:2
d2=A.f(d9)
d3=d2.h("x<1>")
d7=new A.x(d9,0,3,d3)
d7.T(d9,0,3,d2.c)
d7=new A.r(d7,d7.gm(0),d3.h("r<k.E>"))
d3=d3.h("k.E")
while(d7.j()){d2=d7.d
if(d2==null)d2=d3.a(d2)
if(d8.length===0)e1=A.c([],c7)
else{e1=c1.i(0,"carryLimit")
e1.toString
e1=A.hj(B.b.k(e1),B.a.gD(d8).a,!1,a5)}e1=A.j9(d6,d2,r,n,c2,e1,0).a[2]
if(e1>0){if(a2)d3=i0
else d3=a1.a!==a1.d.a&&a1.b>=a1.e.w.w
if(d3===!0){d3=d2.b
d3=d3===(a0?i0:b.b)}else d3=!1
if(d3){e0=b7.aZ(e1,d2,i1.a,d6)
break}e0=b7.aZ(e1,d2,i1.a,d6)
break}}e2=e0}else e2=1
if(!a.n(0,c8)){d2=b1.i(0,c8)
if(d2==null)d2=i0
else d2=d2.d.length!==0||d2.a.ax!=null
d2=d2===!0}else d2=!0
e3=!1
if(d2)if(B.a.I(g,new A.i5(r))){if(!d1)if(c0.length!==0)if(e2>0){d2=i1.a.c_(c8)
d3=i1.a
d2=d2<(d3.ax.n(0,c8)||d3.W(b8)?0:1)+e2}else d2=e3
else d2=!0
else d2=!0
e3=d2}if(c3.length!==0)if(b8.ax==null){d2=c0.length
d3=i1.a.x.i(0,c8)
d7=!0
if(d3==null)d3=b8.d
if(d2<=d3){if(e3){d2=c0.length
d3=i1.a.x.i(0,c8)
if(d3==null)d3=b8.d
d3=d2>=d3
d2=d3}else d2=!1
if(!d2){d2=b1.i(0,c8)
if(d2==null)d2=i0
else{d2=d2.f
d2=d2==null?i0:d2.a}d2=d2===B.p}else d2=d7}else d2=d7}else d2=!1
else d2=!1
if(d2){d2=b1.i(0,c8)
if(d2==null)d2=i0
else d2=d2.d.length!==0||d2.a.ax!=null
if(d2!==!0)B.a.l(o,new A.bj(b8,B.a.gD(c3)))}if(e3&&!i1.b){c8=b1.i(0,c8)
if(c8==null)c8=i0
else c8=c8.d.length!==0||c8.a.ax!=null
c5.$2$defense(b8,c8===!0)}}e4=A.c([],t.e)
for(k=a6.length,b6=0;b6<a6.length;a6.length===k||(0,A.t)(a6),++b6){b8=a6[b6]
j=b8.a
i=b1.i(0,j)
if(i==null)i=i0
else i=i.d.length!==0||i.a.ax!=null
if(i===!0)continue
c0=i1.a.u(j)
i=A.f(c0)
b0=i.h("b<1>")
e5=A.m(new A.b(c0,i.h("e(1)").a(new A.i6(i1)),b0),b0.h("a.E"))
B.a.A(e5,new A.i7())
i=c0.length
b0=i1.a
i=A.h(Math.max(0,i-(b0.ax.n(0,j)||b0.W(b8)?0:1)))
j=A.f(e5)
b0=new A.x(e5,0,i,j.h("x<1>"))
b0.T(e5,0,i,j.c)
B.a.G(e4,b0)}B.a.A(e4,new A.i8())
e6=i0
e7=i0
e8=0
e9=1
if(e4.length!==0&&!i1.c){d5=B.a.gD(e4)
f0=A.c9(r,i1.a,n,s,m)
d9=A.m(new A.b(g,e.a(new A.i9(i1,h9,r)),f),d)
B.a.A(d9,new A.ia(h9,d5,r))
s=A.X(d9,0,A.U(b2.go,"count",a5),A.f(d9).c)
m=s.$ti
s=new A.r(s,s.gm(0),m.h("r<k.E>"))
k=b7.c
j=b2.ok
i=f0.f
b2=b2.k4
g=t.aO
f=t.eO
e=f.h("a.E")
m=m.h("k.E")
f1=e8
f2=e6
f3=!1
for(;;){if(!s.j()){e8=f1
e6=f2
break}A:{d=s.d
if(d==null)d=m.a(d)
f4=A.m(new A.b(e4,g.a(new A.ib(h9,d)),f),e)
if(f4.length===0)break A
d5=B.a.gD(f4)
for(b0=b7.bs(d5,i1.a,d,c2),b1=b0.length,b4=d.e,f5=d.a,b6=0;b6<b0.length;b0.length===b1||(0,A.t)(b0),++b6){d8=b0[b6]
f6={}
f7=A.j9(d5,d,r,n,c2,d8,0)
b9=i.i(0,f5)
f8=b9==null?i0:b9.length
if(f8==null)f8=0
b9=f7.a
f9=b7.aZ(b9[2],d,i1.a,d5)
g0=f9-f8
g1=f0.ga1()!=null&&f0.ga1()!==f5
c7=!0
if(b9[2]!==0)if(g0>0)if(g0<=f4.length)if(g1)c7=f9!==1||b9[1]<b2
else c7=!1
if(c7)continue
g2=i1.a.N()
g2.d=1e6
f6.a=g2
g3=A.c([],b5)
g5=1/0
g6=0
g7=0
for(;;){g4=!1
if(!(g7<g0)){g4=!0
break}if(!(g7<f4.length))return A.n(f4,g7)
g8=f4[g7]
if(A.j9(g8,d,r,n,c2,d8,0).a[2]===0)break
g9=k.aL(g8,b4,r,d)
c7=g9.b
g5=Math.min(g5,c7)
g6=Math.max(g6,c7)
if(!g9.d||g6-g5>j)break
h0=B.a.E(a6,0,new A.ic(f6,h9,g8),a5)
c7=f6.a
c8=c7.f
d2=c1.i(0,"soldierLimit")
d2.toString
d2=Math.min(h0,Math.max(0,c8-B.b.k(d2)))
h1=b7.bw(c7,g8,g9,b9[0],d8,d2,f8+g7,"\u6309\u5171\u540c\u653b\u9632\u95e8\u69db\u6838\u7b97\u6574\u961f\u6b66\u5668\u4e0e\u5175\u5458","expedition",d)
if(h1==null)break
f6.a=h1.a
c7=h1.b.b
c8=A.f(c7)
B.a.G(g3,new A.b(c7,c8.h("e(1)").a(new A.id()),c8.h("b<1>")));++g7}if(!g4)continue
b9=f6.a
h2=1e6-b9.d+b9.V().a
b9=i1.a
if(b9.d<h2){if(f1===0||h2<f1){e9=f9
f1=h2
f2=f5}continue}a8=b9.N()
b9=g3.length
h3=0
for(;;){if(!(h3<g3.length)){g4=!0
break}if(!a8.c2(g3[h3].e)){g4=!1
break}g3.length===b9||(0,A.t)(g3);++h3}if(!g4||!a3.$1(a8))continue
if(g3.length!==0){d=r.J(d5.c)
d.toString
a4.$4(a8,g3,"\u6309\u76ee\u6807\u57ce\u9632\u4e0e\u5b88\u5c06\u914d\u9f50"+f9+"\u540d\u8fdb\u653b\u5c06\u9886\u7684\u9ad8\u7ea7\u6b66\u5668\uff0c\u4fdd\u7559\u6708\u4ff8\u9884\u7b97",d)}f1=e8
e7=f5
f2=e6
f3=!0
break}if(f3){e8=f1
e6=f2
break}}}}s=e6==null
if(s&&!i1.c)for(m=o.length,b6=0;b6<o.length;o.length===m||(0,A.t)(o),++b6){k=o[b6]
b8=k.a
c4=k.b
if(B.a.E(p,0,new A.ie(),a5)>=b3)break
a8=i1.a.N()
if(a8.aA(b8,c4)&&a3.$2$civilian(a8,!0))a4.$5$hero(a8,A.c([new A.y(B.k,c4.a,b8.a,i0,0,B.d)],b5),"\u5b8c\u6210\u519b\u9700\u5b89\u6392\u540e\u7528\u4f59\u94b1\u5347\u7ea7\u57ce\u9632\uff0c\u4ecd\u4fdd\u7559\u6708\u4ff8\u4e0e\u5468\u8f6c\u4f59\u989d",b8,c4)}m=e7==null
h4=r.J(m?e6:e7)
if(h4==null)h4=b
h5=h4==null?i0:A.aS(h4.b,r,n,i1.a.x)
h6=A.c([],q)
for(q=p.length,h7=0,b6=0;b6<p.length;p.length===q||(0,A.t)(p),++b6){h8=p[b6]
h7+=h8.b.length
if(h7>b3){c2.b.e=!0
break}B.a.l(h6,h8)}s=s?"preparing":"saving"
q=m?e6:e7
if(q==null)if((a2?i0:a1.ga6())===!0)q=a0?i0:b.a
else q=i0
c2=c2.b
n=c2.e
m=c2.c
k=c2.d
c2=c2.b
j=A.c([],t.s)
if(p.length===0)j.push("\u672c\u8f6e\u65e0\u5fc5\u8981\u4e14\u53ef\u652f\u4ed8\u7684\u91c7\u8d2d\uff0c\u4fdd\u7559\u56fd\u5e93")
if((h5==null?i0:h5.ga6())===!0)j.push("\u76ee\u6807\u56fd\u5360\u6709 "+h5.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.aw(h5.c*h5.gaW())+" \u91d1\u5e01\uff0c\u51c6\u5907\u5f3a\u5316\u6b66\u5668\u548c\u8f6e\u653b\u5175\u529b")
return new A.bP(s,q,e8,e9,h6,j,n,m,k,c2)}}
A.hS.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&a.f>0&&!a.fx},
$S:0}
A.hT.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ae(s.a(b),!0),A.ae(a,!0))},
$S:2}
A.hU.prototype={
$1(a){t.q.a(a)
return a.b!==this.b.a&&this.c.au(a)&&this.a.c.aj(a)},
$S:1}
A.i4.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bm(o.a(b),B.a.gD(s),r,p,q,null),A.bm(a,B.a.gD(s),r,p,q,null))},
$S:4}
A.hR.prototype={
$2$civilian(a,b){var s=a.d,r=Math.max(a.V().a,this.a.b.w.f)
return s>=r+(b?this.b:0)},
$1(a){return this.$2$civilian(a,!1)},
$S:57}
A.hQ.prototype={
$6$emergency$hero(a,b,c,d,e,f){var s,r
t.f3.a(b)
this.a.a=a
s=this.b
r=A.c([],t.e)
if(f!=null)r.push(f)
r=s.c.aa(r,A.c([d],t.Y))
s=e?a.a5(!0).a:Math.max(a.V().a,s.b.w.f)
B.a.l(this.c,new A.N(c,b,r,B.r,s,e))},
$4(a,b,c,d){return this.$6$emergency$hero(a,b,c,d,!1,null)},
$5$hero(a,b,c,d,e){return this.$6$emergency$hero(a,b,c,d,!1,e)},
$S:58}
A.ig.prototype={
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
else r=r.d.length!==0||r.a.ax!=null
r=r===!0?1:0
s=s.i(0,q)
if(s==null)s=null
else s=s.d.length!==0||s.a.ax!=null
o=B.c.t(r,s===!0?1:0)
return o!==0?o:B.c.t(q,n)},
$S:4}
A.ih.prototype={
$2(a,b){var s,r
A.h(a)
t.q.a(b)
s=this.a.a.u(b.a).length
r=this.b.b.b.i(0,"soldierLimit")
r.toString
return a+s*B.b.k(r)},
$S:8}
A.ii.prototype={
$1(a){return t.r.a(a).dy},
$S:0}
A.ij.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.io.prototype={
$2$defense(a,b){var s,r,q,p,o,n,m=this,l=null,k=m.a,j=a.a
if(!k.a.at.n(0,j)){s=m.b.e.i(0,j)
if(s==null)s=l
else s=s.d.length!==0||s.a.ax!=null
s=s===!0&&k.a.L(j)>=a.ga2()}else s=!0
if(s)return!1
r=k.a.N()
s=r.f
q=r.at.a
p=m.b
o=p.b.b.i(0,"soldierLimit")
o.toString
n=Math.max(0,Math.min(s,m.c+(q+1)*B.b.k(o))-r.e)
s=n>0
if(s&&!r.av(n))return!1
if(!b){q=p.e.i(0,j)
if(q==null)q=l
else q=q.d.length!==0||q.a.ax!=null
q=q===!0}else q=!0
p=m.d
if(!r.bt(a,q,p==null?l:p.b)||!m.e.$1(r)){if(a.Q&&m.f.x>k.a.at.a){k.c=!0
if(b)k.b=!0}return!1}k=A.c([],t.w)
if(s)k.push(new A.y(B.l,l,j,l,n,B.d))
k.push(new A.y(B.v,l,j,l,0,B.d))
j=b?"\u4f18\u5148\u8865\u5145\u672c\u56fd\u5b88\u57ce\u7f3a\u53e3\uff0c\u5e76\u5907\u9f50\u65b0\u5c06\u5175\u5458\u4e0e\u6708\u4ff8":"\u5b88\u57ce\u7f3a\u53e3\u5df2\u4f18\u5148\u5904\u7406\uff0c\u518d\u8865\u524d\u7ebf\u8fdb\u653b\u5c06\u9886\u53ca\u5176\u5175\u5458"
m.r.$4(r,k,j,a)
return!0},
$S:59}
A.il.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&!a.fx},
$S:0}
A.im.prototype={
$2(a,b){return Math.max(A.h(a),t.r.a(b).w)},
$S:9}
A.ik.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.b===this.b.a)if(!a.fx){r=this.a
if(!r.a.z.n(0,a.a))if(a.f>=a.r*0.65)if(a.w>=this.c){s=a.as
s=!(s===B.h||s===B.e)||r.a.aq(a)}}return s},
$S:0}
A.hV.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.hW.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.dx){r=this.b.b
if(a.w<=r.w.p4){s=a.x
r=r.b.i(0,"drawCost")
r.toString
s=s<=B.b.k(r)&&s<15&&this.a.a.aq(a)}}return s},
$S:0}
A.hX.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.a4(a),A.a4(b))},
$S:2}
A.hY.prototype={
$1(a){return t.r.a(a).dy},
$S:0}
A.hZ.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.i_.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return A.ae(a,!0)>A.ae(b,!0)?a:b},
$S:18}
A.i0.prototype={
$1(a){t.o.a(a)
return a.f&&a.d===0&&this.a.c>=a.e},
$S:19}
A.i1.prototype={
$2(a,b){var s=t.o
s.a(a)
return B.c.t(s.a(b).c,a.c)},
$S:20}
A.i2.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.c9(s,this.a.a,r.b,q.z,q.y).au(a)&&r.c.aj(a)}else s=!1
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
return B.b.t(A.bm(o.a(b),s,r,p,q,null),A.bm(a,s,r,p,q,null))},
$S:4}
A.i5.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.i6.prototype={
$1(a){t.r.a(a)
return a.cy&&this.a.a.aq(a)},
$S:0}
A.i7.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ae(s.a(b),!0),A.ae(a,!0))},
$S:2}
A.i8.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ae(s.a(b),!0),A.ae(a,!0))},
$S:2}
A.i9.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.c9(s,this.a.a,r.b,q.z,q.y).au(a)&&r.c.aj(a)}else s=!1
return s},
$S:1}
A.ia.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bm(o.a(b),s,r,p,q,null),A.bm(a,s,r,p,q,null))},
$S:4}
A.ib.prototype={
$1(a){t.r.a(a)
return this.a.c.aj(this.b)},
$S:0}
A.ic.prototype={
$2(a,b){var s,r,q
A.h(a)
t.q.a(b)
s=this.a
r=b.a
q=s.a.u(r).length
s=Math.min(Math.max(0,q-(r===this.c.c?1:0)),s.a.de(b))
q=this.b.b.b.i(0,"soldierLimit")
q.toString
return a+s*B.b.k(q)},
$S:8}
A.id.prototype={
$1(a){return t.T.a(a).a===B.w},
$S:17}
A.ie.prototype={
$2(a,b){return A.h(a)+t.I.a(b).b.length},
$S:11}
A.bp.prototype={}
A.ek.prototype={
ag(b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=b1.a,a7=b1.b,a8=A.w(b0.a)+","+A.w(b0.b)+":"+A.w(a6)+","+A.w(a7),a9=a5.d
if(a9.a3(a8)){a6=a9.i(0,a8)
a6.toString
return a6}for(s=a5.a,r=s.b,q=s.c,p=r+q+8,o=r-1,--q,n=a5.b,m=n.b,n=n.e,s=s.d,l=s.length,k=n.length,j=a5.c,i=b0,h=0,g=0;g<p;++g){f=i.H(b1)
if(f<1e-7){if(a9.a>=256){e=new A.a8(a9,A.l(a9).h("a8<1>")).gC(0)
if(!e.j())A.cB(A.aC())
a9.ao(0,e.gp())}a9.B(0,a8,h)
return h}if(!j.dD())return 1/0
d=i.a
c=(a6-d)/f
b=i.b
a=(a7-b)/f
a0=B.c.v(B.b.Y((d+c*1e-7)/16),0,o)
a1=B.c.v(B.b.Y((b+a*1e-7)/16),0,q)
a2=new A.el()
a3=a2.$3(d,c,a0)
a2=a2.$3(b,a,a1)
a4=Math.min(f,Math.min(A.jc(a3),A.jc(a2)))
a2=m.i(0,"marchSpeed")
a2.toString
a3=a1*r+a0
if(!(a3>=0&&a3<l))return A.n(s,a3)
a3=s[a3]
if(!(a3<k))return A.n(n,a3)
h+=a4/(a2*n[a3])
i=new A.v(d+c*a4,b+a*a4)}return 1/0},
ap(a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=b0.J(a8.c),a5=a8.as,a6=(a5===B.h||a5===B.e)&&a4!=null?a4.f.c6(a4.e,a9):a8.z,a7=b2==null?a9:b2.f.bY(a6,a9)
a5=this.a
if(!a5.n(0,a7))return B.t
s=new A.em(b0,a8,b2)
r=new A.eo(this,b0,a8)
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
e=new A.v(l-k*f,i+o*f)
if(a5.n(0,e))B.a.l(p,A.c([e,a7],q))}}for(a5=p.length,d=null,g=0;g<p.length;p.length===a5||(0,A.t)(p),++g){c=p[g]
q=c.length
a=a6
a0=0
a1=!1
a2=0
for(;;){if(!(a2<c.length)){b=!0
break}a3=c[a2]
if(s.$2(a,a3)){b=!1
break}a1=a1||r.$2(a,a3)
a0+=this.ag(a,a3)
c.length===q||(0,A.t)(c);++a2
a=a3}q=!0
if(b)if(isFinite(a0))q=b1&&a1
if(q)continue
if(d==null||a0<d.b)d=new A.bp(c,a0,!0)}return d==null?B.T:d},
aL(a,b,c,d){return this.ap(a,b,c,!1,d)},
dH(a,b,c){return this.ap(a,b,c,!1,null)}}
A.el.prototype={
$3(a,b,c){var s
if(Math.abs(b)<1e-12)s=1/0
else s=Math.max(1e-8,((b>0?c+1:c)*16-a)/b)
return s},
$S:60}
A.em.prototype={
$2(a,b){return B.a.I(this.a.f,new A.en(this.b,this.c,a,b))},
$S:22}
A.en.prototype={
$1(a){var s,r=this
t.q.a(a)
if(a.b!==r.a.b){s=r.b
s=s==null?null:s.a
s=a.a!==s&&a.f.c8(r.c,r.d)!=null}else s=!1
return s},
$S:1}
A.eo.prototype={
$2(a,b){return B.a.I(this.b.r,new A.ep(this.a,this.c,b,a))},
$S:22}
A.ep.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this
t.r.a(a)
if(a.b!==j.b.b){s=a.as
s=s===B.h||s===B.e||a.fx||a.f<=0}else s=!0
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
l=B.b.v(((k.a-q)*p+(k.b-o)*n)/m,0,1)}s=r.aI(s,l).H(a.z)
r=j.a.b.b.i(0,"encounterDistance")
r.toString
return s<r+12},
$S:0}
A.ap.prototype={
K(){var s=this
return A.c([s.a,s.b,s.c,s.d,s.e,s.f,s.r],t.Q)}}
A.eq.prototype={
cb(a,b){var s,r=this.b
if(r.i(0,"useMorale")===0)return 0
if(b>0){r=r.i(0,"cityMoraleBonus"+B.c.v(b,1,5))
r=r==null?null:B.b.k(r)
if(r==null)r=0}else r=0
s=a+r
return s<0?0:s},
dt(a){return this.cb(a,0)},
bj(a,b,c,d){var s,r,q,p
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
c0(a,b,c){return this.bj(a,b,c,0)},
d2(a,b){return this.bj(a,0,b,0)},
ah(a){var s,r,q="maxLevel",p=this.b,o=p.i(0,"firstYearCityLevel")
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
K(){var s,r,q,p=this,o=A.c([],t.eG)
for(s=p.r.gaN(),s=s.gC(s),r=t.Q;s.j();){q=s.gp()
o.push(A.c([q.a,q.b,q.c,q.d,q.e,q.f,q.r],r))}return A.R(["version",p.a,"values",p.b,"upgrades",p.c,"defenseBonuses",p.d,"movement",p.e,"field",p.f,"weapons",o,"tuning",p.w.K()],t.N,t.X)}}
A.e7.prototype={
bi(a){var s=this.d,r=this.b
r=B.c.v(B.b.Y(a.b/16),0,this.c-1)*r+B.c.v(B.b.Y(a.a/16),0,r-1)
if(!(r>=0&&r<s.length))return A.n(s,r)
return s[r]},
n(a,b){var s,r=b.a
if(isFinite(r)){s=b.b
r=isFinite(s)&&r>=0&&s>=0&&r<this.b*16&&s<this.c*16}else r=!1
return r},
K(){var s=this
return A.R(["version",s.a,"width",s.b,"height",s.c,"terrain",s.d],t.N,t.X)}}
A.es.prototype={
dw(a){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=t.d1.a(B.i.dc(a,null))
switch(J.b0(s,"kind")){case"init":if(!J.af(J.b0(s,"protocol"),1)||!J.af(J.b0(s,"build"),"b28d4f34"))throw A.j(B.a5);++i.f
i.e=null
p=i.r
if(p.a>0){p.b=p.c=p.d=p.e=p.f=null
p.a=0
p.b5()}p=t.f
o=t.N
n=t.z
i.c=A.lm(A.as(p.a(J.b0(s,"rules")),o,n))
n=A.as(p.a(J.b0(s,"map")),o,n)
p=A.K(n.i(0,"version"))
m=A.h(n.i(0,"width"))
l=A.h(n.i(0,"height"))
n=A.bs(t.R.a(n.i(0,"terrain")),!0,t.S)
k=new Uint8Array(A.my(n))
if(m<=0||l<=0||n.length!==m*l)A.cB(B.a7)
i.d=new A.e7(p,m,l,k)
i.a.$1(B.i.ar(t.G.a(A.R(["kind","ready","rules",i.c.a,"map",p,"backend",i.b],o,t.X)),null))
break
case"cancel":p=i.e
o=J.b0(s,"id")
if(p==null?o==null:p===o)i.r.l(0,A.h(J.b0(s,"id")))
break
case"plan":if(i.c==null||i.d==null||i.e!=null){p=A.kf("AI \u5c1a\u672a\u5c31\u7eea\u6216\u5df2\u6709\u8bf7\u6c42\u6267\u884c\u4e2d")
throw A.j(p)}r=A.lk(A.as(t.f.a(J.b0(s,"request")),t.N,t.z))
i.e=r.d
i.aU(r,i.f)
break
default:throw A.j(B.a6)}}catch(j){q=A.aR(j)
i.a.$1(B.i.ar(t.G.a(A.R(["kind","error","message",J.bo(q)],t.N,t.X)),null))}},
aU(a,b){return this.cU(a,b)},
cU(a3,a4){var s=0,r=A.mT(t.x),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
var $async$aU=A.n7(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:a1=new A.iq()
$.jW()
a1.bx()
m=a1
p=4
i=n.c
i.toString
h=n.d
h.toString
g=new A.er(i.w)
f=new A.eD(i,h,a3,g,A.W(t.S,t.h))
e=t.N
h=new A.ek(h,i,g,A.W(e,t.i))
f.e=h
f.f=new A.ez(i,g,A.W(e,t.cM))
f.r=new A.hA(a3,i,h)
l=f
k=0
i=l.by(),h=i.$ti,i=new A.aP(i.a(),h.h("aP<1>")),h=h.c,g=n.r,d=a3.d,c=t.x
case 7:if(!i.j()){s=8
break}b=i.b
if(b==null)h.a(b)
if(a4!==n.f||g.n(0,d)){if(a4===n.f){n.e=null
g.ao(0,d)
n.a.$1(B.i.ar(t.G.a(A.R(["kind","cancelled","id",d],e,t.X)),null))}s=1
break}b=k
if(typeof b!=="number"){q=b.dN()
s=1
break}a=b+1
k=a
s=a>=n.c.w.id?9:10
break
case 9:k=0
b=m
if(b.b==null)b.b=$.hO.$0()
s=11
return A.mq(A.lA(B.H,c),$async$aU)
case 11:m.bx()
case 10:s=7
break
case 8:if(a4!==n.f){s=1
break}if(g.ao(0,d)){n.e=null
n.a.$1(B.i.ar(t.G.a(A.R(["kind","cancelled","id",d],e,t.X)),null))
s=1
break}n.e=null
i=l.w
i.toString
n.a.$1(B.i.ar(t.G.a(A.R(["kind","reply","reply",A.k0(a3,i,null,m.gc7()).K()],e,t.X)),null))
p=2
s=6
break
case 4:p=3
a2=o.pop()
j=A.aR(a2)
if(a4!==n.f){s=1
break}n.e=null
i=A.c(["\u89c4\u5212\u5931\u8d25\uff0c\u4e3b\u73af\u5883\u4fdd\u7559\u6709\u9650\u5b89\u5168\u4fdd\u62a4"],t.s)
h=m.gc7()
n.a.$1(B.i.ar(t.G.a(A.R(["kind","reply","reply",A.k0(a3,new A.bP("preparing",null,0,1,B.ag,i,!1,0,0,0),J.bo(j),h).K()],t.N,t.X)),null))
s=6
break
case 3:s=2
break
case 6:case 1:return A.ms(q,r)
case 2:return A.mr(o.at(-1),r)}})
return A.mt($async$aU,r)}}
A.jq.prototype={
$1(a){t.r.a(a)
return a.w*3+a.f*0.35+a.gP()*8},
$S:25}
A.jr.prototype={
$1(a){var s
t.r.a(a)
if(a.c===this.a.a){s=a.as
s=!(s===B.h||s===B.e)}else s=!1
return s},
$S:0}
A.js.prototype={
$2(a,b){var s
A.ao(a)
t.r.a(b)
s=A.a4(b)
return a+s*(b.id==null?0.12:0.03)},
$S:28}
A.a3.prototype={}
A.ar.prototype={
ga9(){var s,r=this.a
if(r.ax!=null)r=r.dx
else{r=this.d
if(r.length===0)r=1/0
else{s=A.f(r)
s=new A.Q(r,s.h("i(1)").a(new A.ev()),s.h("Q<1,i>")).ae(0,B.B)
r=s}}return r}}
A.ev.prototype={
$1(a){return t.O.a(a).b},
$S:63}
A.is.prototype={
dC(c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7=this,b8="marchSpeed",b9=b7.a,c0=c3.a,c1=b9.u(c0),c2=A.c([],t.D)
for(s=b9.r,r=s.length,q=c3.e,p=c3.f,o=b7.b,n=o.b,o=o.w.b,m=q.a,l=q.b,k=c3.ch,j=c3.b,i=0;i<r;++i){h=s[i]
if(h.b!==j){g=h.as
g=g===B.h||g===B.e||h.f<=0}else g=!0
if(g)continue
if(h.a===k){B.a.l(c2,new A.a3(h,0,1))
continue}if(h.fx)continue
g=h.z
f=g.H(q)
e=h.p2===c0
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
a4=new A.v(g.a+b/a0*a3,g.b+a/a0*a3)
if(p.a0(a4).H(a4)>48)continue}d=n.i(0,b8)
d.toString
a5=A.nm(q,o,e,d,p,g,new A.it(b7),c)
if(a5==null)continue
if(h.as===B.n||a1)g=0.35
else if(a2>0.8)g=1
else g=f<72?0.9:0.55
B.a.l(c2,new A.a3(h,a5,g))}B.a.A(c2,new A.iu())
c0=A.f(c1)
r=t.r
a6=A.aD(new A.b(c1,c0.h("e(1)").a(new A.iv(c3)),c0.h("b<1>")),r)
q=A.c([],t.e)
if(a6!=null)q.push(a6)
c0=c0.h("G<1>")
B.a.G(q,new A.G(c1,c0).bz(0,c0.h("e(k.E)").a(new A.iw(a6))))
c0=t.S
a7=A.X(q,0,A.U(c3.ga2(),"count",c0),r).af(0)
a8=A.W(t.N,c0)
a9=B.a.an(b9.w,new A.ix(c3)).c
for(b9=a7.length,i=0;c0=a7.length,i<c0;a7.length===b9||(0,A.t)(a7),++i){b0=a7[i]
if(b0.as===B.e)b1=0
else{c0=n.i(0,"soldierLimit")
c0.toString
b1=Math.min(a9,B.b.k(c0)-b0.gP())}a9-=b1
a8.B(0,b0.a,b0.gP()+b1)}b9=c2.length
b2=null
if(b9!==0&&c0!==0)for(c0=c3.db,r=c3.ax,q=c3.ay,p=r==null,o=b7.d,n=c3.d,b3=0;b3<a7.length;++b3,b9=l){b4=a7[b3]
for(m=b4.a,b5=null,i=0;l=c2.length,i<l;c2.length===b9||(0,A.t)(c2),++i){l=c2[i].a
if(p)k=n
else{k=c0?1:0
k=B.c.v(r-q-k,0,5)}b6=o.bl(b4,l,l.k4,Math.max(1,k-b3),!1,a8.i(0,m))
if(b5==null||b6.b<b5.b)b5=b6}if(b2==null||b5.b>b2.b)b2=b5}b9=A.f(s)
return new A.ar(c3,c2,b2,new A.b(s,b9.h("e(1)").a(new A.iy(c3)),b9.h("b<1>")).E(0,0,new A.iz(),t.i))}}
A.it.prototype={
$2(a,b){var s=this.a,r=s.c,q=r.ag(a,b)
if(!isFinite(q)&&r.c.e){r=a.H(b)
s=s.b.b.i(0,"marchSpeed")
s.toString
s=r/s}else s=q
return s},
$S:64}
A.iu.prototype={
$2(a,b){var s,r=t.O
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.q.t(a.a.a,b.a.a):B.b.t(r,s)},
$S:65}
A.iv.prototype={
$1(a){return t.r.a(a).a===this.a.CW},
$S:0}
A.iw.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.ix.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:6}
A.iy.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=!1
if(a.b===s.b)if(a.c===s.a){s=a.as
s=!(s===B.h||s===B.e)&&!a.fx}else s=r
else s=r
return s},
$S:0}
A.iz.prototype={
$2(a,b){return A.ao(a)+A.a4(t.r.a(b))},
$S:28}
A.er.prototype={
X(){var s=this,r=s.b
if(r>=s.a.db){s.e=!0
return!1}s.b=r+1
return!0},
d1(){var s=this,r=s.c
if(r>=s.a.dx){s.e=!0
return!1}s.c=r+1
return!0},
dD(){var s=this,r=s.d
if(r>=s.a.dy){s.e=!0
return!1}s.d=r+1
return!0}}
A.jl.prototype={
$1(a){A.K(a)
return A.j3(v.G.self).postMessage(a)},
$S:66}
A.jm.prototype={
$1(a){return this.a.dw(A.K(A.j3(a).data))},
$S:67};(function aliases(){var s=J.aV.prototype
s.ct=s.q
s=A.a.prototype
s.bz=s.dK})();(function installTearOffs(){var s=hunkHelpers._static_0,r=hunkHelpers._static_1,q=hunkHelpers.installStaticTearOff
s(A,"mS","lM",5)
r(A,"n9","lZ",13)
r(A,"na","m_",13)
r(A,"nb","m0",13)
s(A,"kJ","n2",3)
r(A,"ne","mw",24)
r(A,"nc","nC",0)
q(A,"nx",2,null,["$1$2","$2"],["kR",function(a,b){return A.kR(a,b,t.H)}],26,0)
q(A,"nw",2,null,["$1$2","$2"],["kQ",function(a,b){return A.kQ(a,b,t.H)}],26,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.A,null)
q(A.A,[A.jy,J.cR,A.cc,J.b2,A.D,A.ip,A.a,A.r,A.c3,A.Y,A.bV,A.bb,A.bS,A.ch,A.L,A.am,A.bt,A.bM,A.ci,A.a6,A.iA,A.hn,A.bT,A.co,A.F,A.hh,A.b7,A.ai,A.c2,A.au,A.dj,A.j0,A.iZ,A.df,A.aP,A.aq,A.bd,A.Z,A.dg,A.dp,A.cu,A.bw,A.dm,A.bg,A.C,A.ct,A.cJ,A.cL,A.iU,A.cM,A.dh,A.d5,A.cd,A.iG,A.aH,A.ab,A.ac,A.dq,A.iq,A.bx,A.eu,A.aG,A.ew,A.bL,A.ez,A.cD,A.aw,A.eD,A.a7,A.fo,A.v,A.eg,A.o,A.E,A.b1,A.e8,A.hp,A.d7,A.hA,A.y,A.a5,A.N,A.bP,A.ej,A.ei,A.hP,A.bp,A.ek,A.ap,A.eq,A.e7,A.es,A.a3,A.ar,A.is,A.er])
q(J.cR,[J.cT,J.bX,J.bZ,J.bY,J.c_,J.br,J.b5])
q(J.bZ,[J.aV,J.u,A.bu,A.c6])
q(J.aV,[J.d6,J.by,J.aU])
r(J.cS,A.cc)
r(J.hc,J.u)
q(J.br,[J.bW,J.cU])
q(A.D,[A.c1,A.aM,A.cV,A.de,A.da,A.di,A.c0,A.cF,A.aB,A.cg,A.dd,A.ce,A.cK])
q(A.a,[A.p,A.at,A.b,A.bU,A.ba,A.bz,A.bf,A.ax])
q(A.p,[A.k,A.a8,A.a9,A.b6])
q(A.k,[A.x,A.Q,A.G,A.dl])
r(A.bQ,A.at)
r(A.bR,A.ba)
q(A.am,[A.bA,A.bB,A.bi])
r(A.bj,A.bA)
r(A.aX,A.bB)
q(A.bi,[A.aO,A.bC])
r(A.bE,A.bt)
r(A.cf,A.bE)
r(A.bN,A.cf)
r(A.bO,A.bM)
q(A.a6,[A.cQ,A.cH,A.cI,A.dc,A.jh,A.jj,A.iD,A.iC,A.j4,A.iQ,A.hk,A.dx,A.dT,A.dz,A.e6,A.e0,A.e1,A.e2,A.e3,A.dZ,A.dC,A.dD,A.dH,A.dG,A.dI,A.dK,A.dM,A.dN,A.dQ,A.dP,A.dR,A.dA,A.dV,A.dX,A.ex,A.f0,A.f1,A.fi,A.fj,A.fk,A.fl,A.fm,A.f3,A.f5,A.f9,A.fc,A.fe,A.fg,A.eO,A.eE,A.eK,A.eM,A.eN,A.eT,A.eU,A.eY,A.f_,A.eR,A.eS,A.eQ,A.eG,A.eJ,A.eF,A.h8,A.h9,A.h7,A.ha,A.h5,A.h4,A.h6,A.h3,A.fp,A.fr,A.fN,A.fP,A.fR,A.fT,A.fs,A.fV,A.fu,A.fw,A.fy,A.fA,A.fD,A.fF,A.fH,A.fJ,A.fK,A.fL,A.fO,A.h0,A.h2,A.fW,A.fX,A.fZ,A.h_,A.dw,A.ee,A.ef,A.eb,A.ea,A.ed,A.e9,A.hq,A.hv,A.hx,A.hy,A.hw,A.ht,A.hu,A.hs,A.hD,A.hB,A.hG,A.hI,A.hJ,A.hL,A.hE,A.hF,A.ja,A.jo,A.jp,A.hS,A.hU,A.hR,A.hQ,A.ii,A.io,A.il,A.ik,A.hV,A.hW,A.hY,A.i0,A.i2,A.i5,A.i6,A.i9,A.ib,A.id,A.el,A.en,A.ep,A.jq,A.jr,A.ev,A.iv,A.iw,A.ix,A.iy,A.jl,A.jm])
r(A.b4,A.cQ)
q(A.cH,[A.hM,A.iE,A.iF,A.j_,A.hb,A.iH,A.iM,A.iL,A.iJ,A.iI,A.iP,A.iO,A.iN,A.iY,A.j7,A.dy,A.e5,A.dS,A.dB,A.fa,A.hr,A.hK,A.jb])
r(A.c8,A.aM)
q(A.dc,[A.db,A.bq])
q(A.F,[A.aJ,A.dk])
q(A.cI,[A.hd,A.ji,A.j5,A.j8,A.iR,A.hi,A.hm,A.iV,A.e4,A.e_,A.dE,A.dF,A.dJ,A.dL,A.dO,A.dU,A.dW,A.dY,A.ey,A.eA,A.eB,A.jg,A.f2,A.fd,A.fh,A.fn,A.f4,A.f6,A.f7,A.f8,A.fb,A.ff,A.eP,A.eL,A.eV,A.eW,A.eX,A.eZ,A.eH,A.eI,A.fq,A.fC,A.fQ,A.fS,A.fU,A.ft,A.fv,A.fx,A.fz,A.fB,A.fE,A.fG,A.fI,A.fM,A.h1,A.fY,A.dv,A.ec,A.hz,A.hC,A.hH,A.hT,A.i4,A.ig,A.ih,A.ij,A.im,A.hX,A.hZ,A.i_,A.i1,A.i3,A.i7,A.i8,A.ia,A.ic,A.ie,A.em,A.eo,A.js,A.it,A.iu,A.iz])
q(A.c6,[A.cX,A.bv])
q(A.bv,[A.cj,A.cl])
r(A.ck,A.cj)
r(A.c4,A.ck)
r(A.cm,A.cl)
r(A.c5,A.cm)
q(A.c4,[A.cY,A.cZ])
q(A.c5,[A.d_,A.d0,A.d1,A.d2,A.d3,A.c7,A.d4])
r(A.bD,A.di)
r(A.dn,A.cu)
r(A.cn,A.bw)
r(A.av,A.cn)
r(A.cW,A.c0)
r(A.he,A.cJ)
q(A.cL,[A.hg,A.hf])
r(A.iT,A.iU)
q(A.aB,[A.ca,A.cP])
q(A.dh,[A.b3,A.al,A.aF,A.ak])
s(A.cj,A.C)
s(A.ck,A.L)
s(A.cl,A.C)
s(A.cm,A.L)
s(A.bE,A.ct)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{d:"int",i:"double",a2:"num",J:"String",e:"bool",ac:"Null",q:"List",A:"Object",aa:"Map",M:"JSObject"},mangledNames:{},types:["e(o)","e(E)","d(o,o)","~()","d(E,E)","d()","e(b1)","d(d)","d(d,E)","d(d,o)","e(a5)","d(d,N)","e(a3)","~(~())","e(i)","i(a2,i)","e(d)","e(y)","o(o,o)","e(ap)","d(ap,ap)","o(a3)","e(v,v)","ac()","@(@)","i(o)","0^(0^,0^)<a2>","ac(@)","i(i,o)","o?(y)","e(N)","d(d,d)","~(A?,A?)","d(ar,ar)","ac(A,aW)","@(@,J)","e(ar)","@(J)","ac(~())","e()","e(a7)","~(@,@)","i(E)","q<a5>(N)","i(i,a5)","i(i,E)","i(i,v)","~(d,@)","+(v,i)(E)","ac(@,aW)","i(a2,o)","i(i,J)","+(v,e)(o)","d(E)","+breakthrough,lower,teamSize,upper(e,i,d,i)()","e(+(v,i))","e(+(v,e))","e(aG{civilian:e})","~(aG,q<y>,J,E{emergency:e,hero:o?})","e(E{defense!e})","i(i,i,d)","q<o>()","~(@)","i(a3)","i(v,v)","d(a3,a3)","~(J)","~(M)","a2(a2,d)","d(aw,aw)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.bj&&a.b(c.a)&&b.b(c.b),"3;":(a,b,c)=>d=>d instanceof A.aX&&a.b(d.a)&&b.b(d.b)&&c.b(d.c),"4;breakthrough,lower,teamSize,upper":a=>b=>b instanceof A.aO&&A.kT(a,b.a),"4;high,low,selfHigh,selfLow":a=>b=>b instanceof A.bC&&A.kT(a,b.a)}}
A.mk(v.typeUniverse,JSON.parse('{"aU":"aV","d6":"aV","by":"aV","nH":"bu","cT":{"e":[],"B":[]},"bX":{"B":[]},"bZ":{"M":[]},"aV":{"M":[]},"u":{"q":["1"],"p":["1"],"M":[],"a":["1"]},"cS":{"cc":[]},"hc":{"u":["1"],"q":["1"],"p":["1"],"M":[],"a":["1"]},"b2":{"I":["1"]},"br":{"i":[],"a2":[]},"bW":{"i":[],"d":[],"a2":[],"B":[]},"cU":{"i":[],"a2":[],"B":[]},"b5":{"J":[],"B":[]},"c1":{"D":[]},"p":{"a":["1"]},"k":{"p":["1"],"a":["1"]},"x":{"k":["1"],"p":["1"],"a":["1"],"a.E":"1","k.E":"1"},"r":{"I":["1"]},"at":{"a":["2"],"a.E":"2"},"bQ":{"at":["1","2"],"p":["2"],"a":["2"],"a.E":"2"},"c3":{"I":["2"]},"Q":{"k":["2"],"p":["2"],"a":["2"],"a.E":"2","k.E":"2"},"b":{"a":["1"],"a.E":"1"},"Y":{"I":["1"]},"bU":{"a":["2"],"a.E":"2"},"bV":{"I":["2"]},"ba":{"a":["1"],"a.E":"1"},"bR":{"ba":["1"],"p":["1"],"a":["1"],"a.E":"1"},"bb":{"I":["1"]},"bS":{"I":["1"]},"bz":{"a":["1"],"a.E":"1"},"ch":{"I":["1"]},"G":{"k":["1"],"p":["1"],"a":["1"],"a.E":"1","k.E":"1"},"bj":{"bA":[],"am":[]},"aX":{"bB":[],"am":[]},"aO":{"bi":[],"am":[]},"bC":{"bi":[],"am":[]},"bN":{"cf":["1","2"],"bE":["1","2"],"bt":["1","2"],"ct":["1","2"],"aa":["1","2"]},"bM":{"aa":["1","2"]},"bO":{"bM":["1","2"],"aa":["1","2"]},"bf":{"a":["1"],"a.E":"1"},"ci":{"I":["1"]},"cQ":{"a6":[],"aI":[]},"b4":{"a6":[],"aI":[]},"c8":{"aM":[],"D":[]},"cV":{"D":[]},"de":{"D":[]},"co":{"aW":[]},"a6":{"aI":[]},"cH":{"a6":[],"aI":[]},"cI":{"a6":[],"aI":[]},"dc":{"a6":[],"aI":[]},"db":{"a6":[],"aI":[]},"bq":{"a6":[],"aI":[]},"da":{"D":[]},"aJ":{"F":["1","2"],"k9":["1","2"],"aa":["1","2"],"F.K":"1","F.V":"2"},"a8":{"p":["1"],"a":["1"],"a.E":"1"},"b7":{"I":["1"]},"a9":{"p":["1"],"a":["1"],"a.E":"1"},"ai":{"I":["1"]},"b6":{"p":["ab<1,2>"],"a":["ab<1,2>"],"a.E":"ab<1,2>"},"c2":{"I":["ab<1,2>"]},"bA":{"am":[]},"bB":{"am":[]},"bi":{"am":[]},"bu":{"M":[],"B":[]},"c6":{"M":[]},"cX":{"M":[],"B":[]},"bv":{"ah":["1"],"M":[]},"c4":{"C":["i"],"q":["i"],"ah":["i"],"p":["i"],"M":[],"a":["i"],"L":["i"]},"c5":{"C":["d"],"q":["d"],"ah":["d"],"p":["d"],"M":[],"a":["d"],"L":["d"]},"cY":{"C":["i"],"q":["i"],"ah":["i"],"p":["i"],"M":[],"a":["i"],"L":["i"],"B":[],"C.E":"i","L.E":"i"},"cZ":{"C":["i"],"q":["i"],"ah":["i"],"p":["i"],"M":[],"a":["i"],"L":["i"],"B":[],"C.E":"i","L.E":"i"},"d_":{"C":["d"],"q":["d"],"ah":["d"],"p":["d"],"M":[],"a":["d"],"L":["d"],"B":[],"C.E":"d","L.E":"d"},"d0":{"C":["d"],"q":["d"],"ah":["d"],"p":["d"],"M":[],"a":["d"],"L":["d"],"B":[],"C.E":"d","L.E":"d"},"d1":{"C":["d"],"q":["d"],"ah":["d"],"p":["d"],"M":[],"a":["d"],"L":["d"],"B":[],"C.E":"d","L.E":"d"},"d2":{"C":["d"],"q":["d"],"ah":["d"],"p":["d"],"M":[],"a":["d"],"L":["d"],"B":[],"C.E":"d","L.E":"d"},"d3":{"C":["d"],"q":["d"],"ah":["d"],"p":["d"],"M":[],"a":["d"],"L":["d"],"B":[],"C.E":"d","L.E":"d"},"c7":{"C":["d"],"q":["d"],"ah":["d"],"p":["d"],"M":[],"a":["d"],"L":["d"],"B":[],"C.E":"d","L.E":"d"},"d4":{"jF":[],"C":["d"],"q":["d"],"ah":["d"],"p":["d"],"M":[],"a":["d"],"L":["d"],"B":[],"C.E":"d","L.E":"d"},"di":{"D":[]},"bD":{"aM":[],"D":[]},"aP":{"I":["1"]},"ax":{"a":["1"],"a.E":"1"},"aq":{"D":[]},"Z":{"aT":["1"]},"cu":{"kk":[]},"dn":{"cu":[],"kk":[]},"av":{"bw":["1"],"kb":["1"],"jD":["1"],"p":["1"],"a":["1"]},"bg":{"I":["1"]},"F":{"aa":["1","2"]},"bt":{"aa":["1","2"]},"cf":{"bE":["1","2"],"bt":["1","2"],"ct":["1","2"],"aa":["1","2"]},"bw":{"jD":["1"],"p":["1"],"a":["1"]},"cn":{"bw":["1"],"jD":["1"],"p":["1"],"a":["1"]},"dk":{"F":["J","@"],"aa":["J","@"],"F.K":"J","F.V":"@"},"dl":{"k":["J"],"p":["J"],"a":["J"],"a.E":"J","k.E":"J"},"c0":{"D":[]},"cW":{"D":[]},"i":{"a2":[]},"d":{"a2":[]},"q":{"p":["1"],"a":["1"]},"dh":{"cN":[]},"cF":{"D":[]},"aM":{"D":[]},"aB":{"D":[]},"ca":{"D":[]},"cP":{"D":[]},"cg":{"D":[]},"dd":{"D":[]},"ce":{"D":[]},"cK":{"D":[]},"d5":{"D":[]},"cd":{"D":[]},"dq":{"aW":[]},"bx":{"lT":[]},"b3":{"cN":[]},"al":{"cN":[]},"aF":{"cN":[]},"ak":{"cN":[]},"lD":{"q":["d"],"p":["d"],"a":["d"]},"jF":{"q":["d"],"p":["d"],"a":["d"]},"lX":{"q":["d"],"p":["d"],"a":["d"]},"lB":{"q":["d"],"p":["d"],"a":["d"]},"lV":{"q":["d"],"p":["d"],"a":["d"]},"lC":{"q":["d"],"p":["d"],"a":["d"]},"lW":{"q":["d"],"p":["d"],"a":["d"]},"ly":{"q":["i"],"p":["i"],"a":["i"]},"lz":{"q":["i"],"p":["i"],"a":["i"]}}'))
A.mj(v.typeUniverse,JSON.parse('{"p":1,"bv":1,"cn":1,"cJ":2,"cL":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.cz
return{T:s("y"),q:s("E"),I:s("N"),t:s("b1"),a9:s("aF"),r:s("o"),c1:s("v"),bJ:s("bp"),o:s("ap"),J:s("a5"),u:s("aq"),h:s("ar"),cM:s("bL"),cs:s("a7"),U:s("p<@>"),V:s("D"),bo:s("bU<N,a5>"),k:s("aI"),O:s("a3"),E:s("b4<i>"),W:s("a<E>"),ef:s("a<o>"),er:s("a<a5>(N)"),R:s("a<@>"),w:s("u<y>"),Y:s("u<E>"),Z:s("u<N>"),eu:s("u<b1>"),e:s("u<o>"),_:s("u<v>"),b8:s("u<ap>"),m:s("u<a5>"),bL:s("u<ar>"),D:s("u<a3>"),a5:s("u<q<v>>"),eG:s("u<q<A>>"),b:s("u<q<i>>"),p:s("u<q<d>>"),d:s("u<aa<J,A?>>"),Q:s("u<A>"),dZ:s("u<+(E,o)>"),eV:s("u<+(aG,q<y>,q<o>)>"),s:s("u<J>"),bQ:s("u<aw>"),n:s("u<i>"),gn:s("u<@>"),a:s("u<d>"),v:s("bX"),A:s("M"),cj:s("aU"),aU:s("ah<@>"),f3:s("q<y>"),bd:s("q<o>"),j:s("q<@>"),L:s("q<d>"),d1:s("aa<J,@>"),f:s("aa<@,@>"),G:s("aa<J,A?>"),P:s("ac"),K:s("A"),gT:s("nI"),bY:s("+()"),fg:s("+(v,e)"),cJ:s("+(v,i)"),fR:s("+(aG,q<y>,q<o>)"),l:s("aW"),N:s("J"),aQ:s("x<aw>"),dm:s("B"),eK:s("aM"),ak:s("by"),eO:s("b<o>"),eq:s("b<i>"),cO:s("bz<o>"),c:s("Z<@>"),dp:s("aw"),dT:s("ax<a7>"),gL:s("ax<d>"),y:s("e"),aO:s("e(o)"),al:s("e(A)"),db:s("e(i)"),i:s("i"),z:s("@"),fO:s("@()"),B:s("@(A)"),C:s("@(A,aW)"),S:s("d"),dg:s("o?"),eH:s("aT<ac>?"),an:s("M?"),bM:s("q<@>?"),eg:s("q<d>?"),X:s("A?"),dk:s("J?"),F:s("bd<@,@>?"),g:s("dm?"),fQ:s("e?"),cD:s("i?"),h6:s("d?"),cg:s("a2?"),H:s("a2"),x:s("~"),M:s("~()"),cA:s("~(J,@)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.aa=J.cR.prototype
B.a=J.u.prototype
B.c=J.bW.prototype
B.b=J.br.prototype
B.q=J.b5.prototype
B.ab=J.aU.prototype
B.ac=J.bZ.prototype
B.N=J.d6.prototype
B.C=J.by.prototype
B.k=new A.ak(0,"upgrade")
B.u=new A.ak(1,"dismiss")
B.v=new A.ak(2,"recruit")
B.l=new A.ak(3,"soldiers")
B.w=new A.ak(4,"buyWeapon")
B.D=new A.ak(5,"dispatch")
B.O=new A.ak(6,"move")
B.P=new A.ak(7,"camp")
B.Q=new A.ak(8,"retreat")
B.h=new A.al(0,"garrison")
B.n=new A.al(2,"camped")
B.x=new A.al(3,"queue")
B.E=new A.al(4,"attacking")
B.e=new A.al(5,"defending")
B.y=new A.al(7,"retreating")
B.F=new A.aF(0,"full")
B.G=new A.aF(1,"resources")
B.z=new A.aF(2,"defense")
B.o=new A.aF(3,"attack")
B.M=s([],t._)
B.t=new A.bp(B.M,1/0,!1)
B.T=new A.bp(B.M,1/0,!1)
B.at=new A.cD(4,24,6,1.5,10,12,0.65,3,0.5,0.25,45,15,0.8,45,25,90,-0.15,10,3,1,96,160,6000,8,24,4,6,8,2,0,1,0.3,20,900,64,0.25,8,0.06,0.12,0.35,0.05,2500,2,20)
B.A=new A.b4(A.nw(),t.E)
B.B=new A.b4(A.nx(),t.E)
B.H=new A.cM()
B.U=new A.bS(A.cz("bS<0&>"))
B.I=function getTagFallback(o) {
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
B.J=function(hooks) { return hooks; }

B.i=new A.he()
B.a0=new A.d5()
B.m=new A.ip()
B.j=new A.dn()
B.a1=new A.dq()
B.f=new A.b3(0,"favorable")
B.a2=new A.b3(1,"close")
B.p=new A.b3(2,"unfavorable")
B.K=new A.b3(3,"unknown")
B.au=s(["\u9759\u6001\u8bc4\u4f30\u914d\u989d\u8017\u5c3d"],t.s)
B.a3=new A.bL(B.K,-1,1,0,0,!1)
B.a4=new A.aH("AI \u534f\u8bae\u7248\u672c\u4e0d\u5339\u914d")
B.a5=new A.aH("AI \u6784\u5efa\u7248\u672c\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u751f\u6210 Worker")
B.a6=new A.aH("\u672a\u77e5 AI \u5de5\u4f5c\u547d\u4ee4")
B.a7=new A.aH("AI \u5730\u56fe\u5c3a\u5bf8\u65e0\u6548")
B.a8=new A.aH("\u56fd\u5bb6\u89c4\u5212\u9759\u6001\u7248\u672c\u4e0d\u5339\u914d")
B.a9=new A.aH("\u56fd\u5bb6\u89c2\u5bdf\u8d85\u51fa\u534f\u8bae\u5bb9\u91cf")
B.ad=new A.hf(null)
B.ae=new A.hg(null)
B.R=new A.al(1,"marching")
B.S=new A.al(6,"field")
B.L=s([B.h,B.R,B.n,B.x,B.E,B.e,B.S,B.y],A.cz("u<al>"))
B.af=s([B.F,B.G,B.z,B.o],A.cz("u<aF>"))
B.ag=s([],t.Z)
B.av=s([],t.b8)
B.r=s([],t.m)
B.d=s([],t.a)
B.ah=A.aA("nD")
B.ai=A.aA("nE")
B.aj=A.aA("ly")
B.ak=A.aA("lz")
B.al=A.aA("lB")
B.am=A.aA("lC")
B.an=A.aA("lD")
B.ao=A.aA("A")
B.ap=A.aA("lV")
B.aq=A.aA("lW")
B.ar=A.aA("lX")
B.as=A.aA("jF")})();(function staticFields(){$.iS=null
$.aj=A.c([],t.Q)
$.kc=null
$.hN=0
$.hO=A.mS()
$.k3=null
$.k2=null
$.kM=null
$.kH=null
$.kV=null
$.je=null
$.jk=null
$.jS=null
$.iX=A.c([],A.cz("u<q<A>?>"))
$.bG=null
$.cx=null
$.cy=null
$.jL=!1
$.O=B.j})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"nG","kY",()=>A.jf("_$dart_dartClosure"))
s($,"nF","jV",()=>A.jf("_$dart_dartClosure_dartJSInterop"))
s($,"nX","l8",()=>A.c([new J.cS()],A.cz("u<cc>")))
s($,"nL","kZ",()=>A.aN(A.iB({
toString:function(){return"$receiver$"}})))
s($,"nM","l_",()=>A.aN(A.iB({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"nN","l0",()=>A.aN(A.iB(null)))
s($,"nO","l1",()=>A.aN(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nR","l4",()=>A.aN(A.iB(void 0)))
s($,"nS","l5",()=>A.aN(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nQ","l3",()=>A.aN(A.ki(null)))
s($,"nP","l2",()=>A.aN(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"nU","l7",()=>A.aN(A.ki(void 0)))
s($,"nT","l6",()=>A.aN(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"nV","jX",()=>A.lY())
s($,"nW","du",()=>A.kS(B.ao))
s($,"nJ","jW",()=>{A.lO()
return $.hN})})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.bu,SharedArrayBuffer:A.bu,ArrayBufferView:A.c6,DataView:A.cX,Float32Array:A.cY,Float64Array:A.cZ,Int16Array:A.d_,Int32Array:A.d0,Int8Array:A.d1,Uint16Array:A.d2,Uint32Array:A.d3,Uint8ClampedArray:A.c7,CanvasPixelArray:A.c7,Uint8Array:A.d4})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bv.$nativeSuperclassTag="ArrayBufferView"
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
Function.prototype.$1$1=function(a){return this(a)}
Function.prototype.$1$2=function(a,b){return this(a,b)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.nu
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()