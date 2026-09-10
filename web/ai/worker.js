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
if(a[b]!==s){A.np(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.d(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.jE(b)
return new s(c,this)}:function(){if(s===null)s=A.jE(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.jE(a).prototype
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
jJ(a,b,c,d){return{i:a,p:b,e:c,x:d}},
jF(a){var s,r,q,p,o,n="_$dart_js",m=a[v.dispatchPropertyName]
if(m==null)if($.jH==null){A.ne()
m=a[v.dispatchPropertyName]}if(m!=null){s=m.p
if(!1===s)return m.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return m.i
if(m.e===r)throw A.j(A.k8("Return interceptor for "+A.u(s(a,m))))}q=a.constructor
if(q==null)p=null
else{o=$.iJ
if(o==null)o=$.iJ=A.j5(n)
p=q[o]}if(p!=null)return p
p=A.nj(a)
if(p!=null)return p
if(typeof a=="function")return B.aa
s=Object.getPrototypeOf(a)
if(s==null)return B.N
if(s===Object.prototype)return B.N
if(typeof q=="function"){o=$.iJ
if(o==null)o=$.iJ=A.j5(n)
Object.defineProperty(q,o,{value:B.A,enumerable:false,writable:true,configurable:true})
return B.A}return B.A},
lv(a,b){if(a<0||a>4294967295)throw A.j(A.b9(a,0,4294967295,"length",null))
return J.lw(new Array(a),b)},
jY(a,b){if(a<0)throw A.j(A.cC("Length must be a non-negative integer: "+a,null))
return A.d(new Array(a),b.h("t<0>"))},
lw(a,b){var s=A.d(a,b.h("t<0>"))
s.$flags=1
return s},
bj(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bU.prototype
return J.cS.prototype}if(typeof a=="string")return J.b5.prototype
if(a==null)return J.bV.prototype
if(typeof a=="boolean")return J.cR.prototype
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aS.prototype
if(typeof a=="symbol")return J.bY.prototype
if(typeof a=="bigint")return J.bW.prototype
return a}if(a instanceof A.z)return a
return J.jF(a)},
cy(a){if(typeof a=="string")return J.b5.prototype
if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aS.prototype
if(typeof a=="symbol")return J.bY.prototype
if(typeof a=="bigint")return J.bW.prototype
return a}if(a instanceof A.z)return a
return J.jF(a)},
aP(a){if(a==null)return a
if(Array.isArray(a))return J.t.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aS.prototype
if(typeof a=="symbol")return J.bY.prototype
if(typeof a=="bigint")return J.bW.prototype
return a}if(a instanceof A.z)return a
return J.jF(a)},
n9(a){if(typeof a=="number")return J.bq.prototype
if(typeof a=="string")return J.b5.prototype
if(a==null)return a
if(!(a instanceof A.z))return J.bx.prototype
return a},
am(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bj(a).ac(a,b)},
b_(a,b){if(typeof b==="number")if(Array.isArray(a)||A.ni(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.aP(a).i(a,b)},
l1(a,b){return J.aP(a).m(a,b)},
l2(a,b){return J.aP(a).I(a,b)},
l3(a,b){return J.n9(a).t(a,b)},
jh(a,b){return J.aP(a).V(a,b)},
jN(a){return J.aP(a).gD(a)},
af(a){return J.bj(a).gR(a)},
ji(a){return J.cy(a).ga0(a)},
l4(a){return J.cy(a).gar(a)},
E(a){return J.aP(a).gC(a)},
l5(a){return J.aP(a).gau(a)},
bm(a){return J.cy(a).gl(a)},
l6(a){return J.bj(a).gS(a)},
jO(a,b){return J.aP(a).b_(a,b)},
bn(a){return J.bj(a).q(a)},
cP:function cP(){},
cR:function cR(){},
bV:function bV(){},
bX:function bX(){},
aT:function aT(){},
d4:function d4(){},
bx:function bx(){},
aS:function aS(){},
bW:function bW(){},
bY:function bY(){},
t:function t(a){this.$ti=a},
cQ:function cQ(){},
h5:function h5(a){this.$ti=a},
b1:function b1(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bq:function bq(){},
bU:function bU(){},
cS:function cS(){},
b5:function b5(){}},A={jm:function jm(){},
lx(a){return new A.c_("Field '"+a+"' has not been initialized.")},
aJ(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
ih(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
Z(a,b,c){return a},
jI(a){var s,r
for(s=$.aj.length,r=0;r<s;++r)if(a===$.aj[r])return!0
return!1},
a0(a,b,c,d){A.ca(b,"start")
if(c!=null){A.ca(c,"end")
if(b>c)A.cz(A.b9(b,0,c,"start",null))}return new A.w(a,b,c,d.h("w<0>"))},
lA(a,b,c,d){if(t.U.b(a))return new A.bO(a,b,c.h("@<0>").F(d).h("bO<1,2>"))
return new A.b8(a,b,c.h("@<0>").F(d).h("b8<1,2>"))},
lK(a,b,c){A.ca(b,"takeCount")
if(t.U.b(a))return new A.bP(a,b,c.h("bP<0>"))
return new A.ba(a,b,c.h("ba<0>"))},
aB(){return new A.cd("No element")},
c_:function c_(a){this.a=a},
ie:function ie(){},
o:function o(){},
k:function k(){},
w:function w(a,b,c,d){var _=this
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
b8:function b8(a,b,c){this.a=a
this.b=b
this.$ti=c},
bO:function bO(a,b,c){this.a=a
this.b=b
this.$ti=c},
c2:function c2(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
O:function O(a,b,c){this.a=a
this.b=b
this.$ti=c},
c:function c(a,b,c){this.a=a
this.b=b
this.$ti=c},
P:function P(a,b,c){this.a=a
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
ba:function ba(a,b,c){this.a=a
this.b=b
this.$ti=c},
bP:function bP(a,b,c){this.a=a
this.b=b
this.$ti=c},
bb:function bb(a,b,c){this.a=a
this.b=b
this.$ti=c},
bQ:function bQ(a){this.$ti=a},
by:function by(a,b){this.a=a
this.$ti=b},
cg:function cg(a,b){this.a=a
this.$ti=b},
I:function I(){},
J:function J(a,b){this.a=a
this.$ti=b},
ey(a,b,c){var s,r,q,p,o,n,m,l=A.l(a),k=A.br(new A.a8(a,l.h("a8<1>")),!0,b),j=k.length,i=0
for(;;){if(!(i<j)){s=!0
break}r=k[i]
if(typeof r!="string"||"__proto__"===r){s=!1
break}++i}if(s){q={}
for(p=0,i=0;i<k.length;k.length===j||(0,A.v)(k),++i,p=o){r=k[i]
c.a(a.i(0,r))
o=p+1
q[r]=p}n=A.br(new A.a9(a,l.h("a9<2>")),!0,c)
m=new A.bM(q,n,b.h("@<0>").F(c).h("bM<1,2>"))
m.$keys=k
return m}return new A.bL(A.aq(a,b,c),b.h("@<0>").F(c).h("bL<1,2>"))},
kP(a){var s=A.kO(a)
if(s!=null)return s
return"minified:"+a},
ni(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
u(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.bn(a)
return s},
d6(a){var s,r=$.k2
if(r==null)r=$.k2=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
lF(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.m(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
d7(a){var s,r,q,p
if(a instanceof A.z)return A.ad(A.ax(a),null)
s=J.bj(a)
if(s===B.a9||s===B.ab||t.ak.b(a)){r=B.I(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.ad(A.ax(a),null)},
k3(a){var s,r,q
if(a==null||typeof a=="number"||A.jz(a))return J.bn(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.a6)return a.q(0)
if(a instanceof A.aC)return a.bQ(!0)
s=$.l0()
for(r=0;r<1;++r){q=s[r].dA(a)
if(q!=null)return q}return"Instance of '"+A.d7(a)+"'"},
lC(){return Date.now()},
lE(){var s,r
if($.hI!==0)return
$.hI=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
if(!!s.dartUseDateNowForTicks)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.hI=1e6
$.hJ=new A.hH(r)},
a_(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.bM(s,10)|55296)>>>0,s&1023|56320)}throw A.j(A.b9(a,0,1114111,null,null))},
lD(a){var s=a.$thrownJsError
if(s==null)return null
return A.bH(s)},
kF(a){throw A.j(A.kx(a))},
m(a,b){if(a==null)J.bm(a)
throw A.j(A.kC(a,b))},
kC(a,b){var s,r="index"
if(!A.kq(b))return new A.az(!0,b,r,null)
s=J.bm(a)
if(b<0||b>=s)return A.jk(b,s,a,r)
return new A.c9(null,null,!0,b,r,"Value not in range")},
kx(a){return new A.az(!0,a,null,null)},
kA(a){return a},
j(a){return A.U(a,new Error())},
U(a,b){var s
if(a==null)a=new A.aK()
b.dartException=a
s=A.nq
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
nq(){return J.bn(this.dartException)},
cz(a,b){throw A.U(a,b==null?new Error():b)},
cA(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.cz(A.mo(a,b,c),s)},
mo(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.cf("'"+s+"': Cannot "+o+" "+l+k+n)},
v(a){throw A.j(A.X(a))},
aL(a){var s,r,q,p,o,n
a=A.no(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.d([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.ir(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
is(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
k7(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
jn(a,b){var s=b==null,r=s?null:b.method
return new A.cT(a,r,s?null:b.receiver)},
aQ(a){var s
if(a==null)return new A.hg(a)
if(a instanceof A.bR){s=a.a
return A.aZ(a,s==null?A.cu(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.aZ(a,a.dartException)
return A.mY(a)},
aZ(a,b){if(t.V.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
mY(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bM(r,16)&8191)===10)switch(q){case 438:return A.aZ(a,A.jn(A.u(s)+" (Error "+q+")",null))
case 445:case 5007:A.u(s)
return A.aZ(a,new A.c7())}}if(a instanceof TypeError){p=$.kR()
o=$.kS()
n=$.kT()
m=$.kU()
l=$.kX()
k=$.kY()
j=$.kW()
$.kV()
i=$.l_()
h=$.kZ()
g=p.aa(s)
if(g!=null)return A.aZ(a,A.jn(A.H(s),g))
else{g=o.aa(s)
if(g!=null){g.method="call"
return A.aZ(a,A.jn(A.H(s),g))}else if(n.aa(s)!=null||m.aa(s)!=null||l.aa(s)!=null||k.aa(s)!=null||j.aa(s)!=null||m.aa(s)!=null||i.aa(s)!=null||h.aa(s)!=null){A.H(s)
return A.aZ(a,new A.c7())}}return A.aZ(a,new A.dc(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.cc()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.aZ(a,new A.az(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.cc()
return a},
bH(a){var s
if(a instanceof A.bR)return a.b
if(a==null)return new A.cn(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.cn(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
kK(a){if(a==null)return J.af(a)
if(typeof a=="object")return A.d6(a)
return J.af(a)},
n7(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.A(0,a[s],a[r])}return b},
n8(a,b){var s,r=a.length
for(s=0;s<r;++s)b.m(0,a[s])
return b},
mx(a,b,c,d,e,f){t.k.a(a)
switch(A.f(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.j(new A.ix("Unsupported number of arguments for wrapped closure"))},
dr(a,b){var s=a.$identity
if(!!s)return s
s=A.n3(a,b)
a.$identity=s
return s},
n3(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.mx)},
lk(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.d9().constructor.prototype):Object.create(new A.bp(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.jW(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.lg(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.jW(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
lg(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.j("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.le)}throw A.j("Error in functionType of tearoff")},
lh(a,b,c,d){var s=A.jV
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
jW(a,b,c,d){if(c)return A.lj(a,b,d)
return A.lh(b.length,d,a,b)},
li(a,b,c,d){var s=A.jV,r=A.lf
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
lj(a,b,c){var s,r
if($.jT==null)$.jT=A.jS("interceptor")
if($.jU==null)$.jU=A.jS("receiver")
s=b.length
r=A.li(s,c,a,b)
return r},
jE(a){return A.lk(a)},
le(a,b){return A.cr(v.typeUniverse,A.ax(a.a),b)},
jV(a){return a.a},
lf(a){return a.b},
jS(a){var s,r,q,p=new A.bp("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.j(A.cC("Field name "+a+" not found.",null))},
j5(a){return v.getIsolateTag(a)},
nj(a){var s,r,q,p,o,n=A.H($.kD.$1(a)),m=$.j4[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.ja[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.bD($.kw.$2(a,n))
if(q!=null){m=$.j4[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.ja[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.jd(s)
$.j4[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.ja[n]=s
return s}if(p==="-"){o=A.jd(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.kM(a,s)
if(p==="*")throw A.j(A.k8(n))
if(v.leafTags[n]===true){o=A.jd(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.kM(a,s)},
kM(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.jJ(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
jd(a){return J.jJ(a,!1,null,!!a.$iah)},
nl(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.jd(s)
else return J.jJ(s,c,null,null)},
ne(){if(!0===$.jH)return
$.jH=!0
A.nf()},
nf(){var s,r,q,p,o,n,m,l
$.j4=Object.create(null)
$.ja=Object.create(null)
A.nd()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.kN.$1(o)
if(n!=null){m=A.nl(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
nd(){var s,r,q,p,o,n,m=B.U()
m=A.bG(B.V,A.bG(B.W,A.bG(B.J,A.bG(B.J,A.bG(B.X,A.bG(B.Y,A.bG(B.Z(B.I),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.kD=new A.j7(p)
$.kw=new A.j8(o)
$.kN=new A.j9(n)},
bG(a,b){return a(b)||b},
m2(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.m(b,s)
if(!J.am(r,b[s]))return!1}return!0},
n5(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
no(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
aW:function aW(a,b,c){this.a=a
this.b=b
this.c=c},
aM:function aM(a){this.a=a},
bA:function bA(a){this.a=a},
bL:function bL(a,b){this.a=a
this.$ti=b},
bK:function bK(){},
bM:function bM(a,b,c){this.a=a
this.b=b
this.$ti=c},
bf:function bf(a,b){this.a=a
this.$ti=b},
ch:function ch(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cO:function cO(){},
b3:function b3(a,b){this.a=a
this.$ti=b},
hH:function hH(a){this.a=a},
cb:function cb(){},
ir:function ir(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
c7:function c7(){},
cT:function cT(a,b,c){this.a=a
this.b=b
this.c=c},
dc:function dc(a){this.a=a},
hg:function hg(a){this.a=a},
bR:function bR(a,b){this.a=a
this.b=b},
cn:function cn(a){this.a=a
this.b=null},
a6:function a6(){},
cF:function cF(){},
cG:function cG(){},
da:function da(){},
d9:function d9(){},
bp:function bp(a,b){this.a=a
this.b=b},
d8:function d8(a){this.a=a},
aH:function aH(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
h6:function h6(a){this.a=a},
ha:function ha(a,b){var _=this
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
c0:function c0(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
j7:function j7(a){this.a=a},
j8:function j8(a){this.a=a},
j9:function j9(a){this.a=a},
aC:function aC(){},
bz:function bz(){},
bi:function bi(){},
mp(a){return a},
bt:function bt(){},
c5:function c5(){},
cV:function cV(){},
bu:function bu(){},
c3:function c3(){},
c4:function c4(){},
cW:function cW(){},
cX:function cX(){},
cY:function cY(){},
cZ:function cZ(){},
d_:function d_(){},
d0:function d0(){},
d1:function d1(){},
c6:function c6(){},
d2:function d2(){},
ci:function ci(){},
cj:function cj(){},
ck:function ck(){},
cl:function cl(){},
jr(a,b){var s=b.c
return s==null?b.c=A.cp(a,"aR",[b.x]):s},
k4(a){var s=a.w
if(s===6||s===7)return A.k4(a.x)
return s===11||s===12},
lH(a){return a.as},
kL(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
cx(a){return A.iT(v.typeUniverse,a,!1)},
nh(a,b){var s,r,q,p,o
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
return A.kh(a1,r,!0)
case 7:s=a2.x
r=A.aY(a1,s,a3,a4)
if(r===s)return a2
return A.kg(a1,r,!0)
case 8:q=a2.y
p=A.bF(a1,q,a3,a4)
if(p===q)return a2
return A.cp(a1,a2.x,p)
case 9:o=a2.x
n=A.aY(a1,o,a3,a4)
m=a2.y
l=A.bF(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.jw(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bF(a1,j,a3,a4)
if(i===j)return a2
return A.ki(a1,k,i)
case 11:h=a2.x
g=A.aY(a1,h,a3,a4)
f=a2.y
e=A.mV(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.kf(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bF(a1,d,a3,a4)
o=a2.x
n=A.aY(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.jx(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.j(A.cE("Attempted to substitute unexpected RTI kind "+a0))}},
bF(a,b,c,d){var s,r,q,p,o=b.length,n=A.iU(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.aY(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
mW(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.iU(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.aY(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
mV(a,b,c,d){var s,r=b.a,q=A.bF(a,r,c,d),p=b.b,o=A.bF(a,p,c,d),n=b.c,m=A.mW(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dh()
s.a=q
s.b=o
s.c=m
return s},
d(a,b){a[v.arrayRti]=b
return a},
j3(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.nb(s)
return a.$S()}return null},
ng(a,b){var s
if(A.k4(b))if(a instanceof A.a6){s=A.j3(a)
if(s!=null)return s}return A.ax(a)},
ax(a){if(a instanceof A.z)return A.l(a)
if(Array.isArray(a))return A.h(a)
return A.jy(J.bj(a))},
h(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
l(a){var s=a.$ti
return s!=null?s:A.jy(a)},
jy(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.mw(a,s)},
mw(a,b){var s=a instanceof A.a6?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.mc(v.typeUniverse,s.name)
b.$ccache=r
return r},
nb(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.iT(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
na(a){return A.aO(A.l(a))},
jG(a){var s=A.j3(a)
return A.aO(s==null?A.ax(a):s)},
jC(a){var s
if(a instanceof A.aC)return A.n6(a.$r,a.ba())
s=a instanceof A.a6?A.j3(a):null
if(s!=null)return s
if(t.dm.b(a))return J.l6(a).a
if(Array.isArray(a))return A.h(a)
return A.ax(a)},
aO(a){var s=a.r
return s==null?a.r=new A.iS(a):s},
n6(a,b){var s,r,q=b,p=q.length
if(p===0)return t.bY
if(0>=p)return A.m(q,0)
s=A.cr(v.typeUniverse,A.jC(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.m(q,r)
s=A.kk(v.typeUniverse,s,A.jC(q[r]))}return A.cr(v.typeUniverse,s,a)},
ay(a){return A.aO(A.iT(v.typeUniverse,a,!1))},
mv(a){var s=this
s.b=A.mT(s)
return s.b(a)},
mT(a){var s,r,q,p,o
if(a===t.K)return A.mD
if(A.bk(a))return A.mH
s=a.w
if(s===6)return A.mt
if(s===1)return A.ks
if(s===7)return A.my
r=A.mS(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bk)){a.f="$i"+q
if(q==="q")return A.mB
if(a===t.A)return A.mA
return A.mG}}else if(s===10){p=A.n5(a.x,a.y)
o=p==null?A.ks:p
return o==null?A.cu(o):o}return A.mr},
mS(a){if(a.w===8){if(a===t.S)return A.kq
if(a===t.i||a===t.H)return A.mC
if(a===t.N)return A.mF
if(a===t.y)return A.jz}return null},
mu(a){var s=this,r=A.mq
if(A.bk(s))r=A.mg
else if(s===t.K)r=A.cu
else if(A.bI(s)){r=A.ms
if(s===t.h6)r=A.a3
else if(s===t.dk)r=A.bD
else if(s===t.fQ)r=A.dp
else if(s===t.cg)r=A.S
else if(s===t.cD)r=A.me
else if(s===t.an)r=A.mf}else if(s===t.S)r=A.f
else if(s===t.N)r=A.H
else if(s===t.y)r=A.av
else if(s===t.H)r=A.x
else if(s===t.i)r=A.aw
else if(s===t.A)r=A.iV
s.a=r
return s.a(a)},
mr(a){var s=this
if(a==null)return A.bI(s)
return A.kH(v.typeUniverse,A.ng(a,s),s)},
mt(a){if(a==null)return!0
return this.x.b(a)},
mG(a){var s,r=this
if(a==null)return A.bI(r)
s=r.f
if(a instanceof A.z)return!!a[s]
return!!J.bj(a)[s]},
mB(a){var s,r=this
if(a==null)return A.bI(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.z)return!!a[s]
return!!J.bj(a)[s]},
mA(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.z)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
kr(a){if(typeof a=="object"){if(a instanceof A.z)return t.A.b(a)
return!0}if(typeof a=="function")return!0
return!1},
mq(a){var s=this
if(a==null){if(A.bI(s))return a}else if(s.b(a))return a
throw A.U(A.kn(a,s),new Error())},
ms(a){var s=this
if(a==null||s.b(a))return a
throw A.U(A.kn(a,s),new Error())},
kn(a,b){return new A.bB("TypeError: "+A.ka(a,A.ad(b,null)))},
kB(a,b,c,d){if(A.kH(v.typeUniverse,a,b))return a
throw A.U(A.m4("The type argument '"+A.ad(a,null)+"' is not a subtype of the type variable bound '"+A.ad(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
ka(a,b){return A.cM(a)+": type '"+A.ad(A.jC(a),null)+"' is not a subtype of type '"+b+"'"},
m4(a){return new A.bB("TypeError: "+a)},
al(a,b){return new A.bB("TypeError: "+A.ka(a,b))},
my(a){var s=this
return s.x.b(a)||A.jr(v.typeUniverse,s).b(a)},
mD(a){return a!=null},
cu(a){if(a!=null)return a
throw A.U(A.al(a,"Object"),new Error())},
mH(a){return!0},
mg(a){return a},
ks(a){return!1},
jz(a){return!0===a||!1===a},
av(a){if(!0===a)return!0
if(!1===a)return!1
throw A.U(A.al(a,"bool"),new Error())},
dp(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.U(A.al(a,"bool?"),new Error())},
aw(a){if(typeof a=="number")return a
throw A.U(A.al(a,"double"),new Error())},
me(a){if(typeof a=="number")return a
if(a==null)return a
throw A.U(A.al(a,"double?"),new Error())},
kq(a){return typeof a=="number"&&Math.floor(a)===a},
f(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.U(A.al(a,"int"),new Error())},
a3(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.U(A.al(a,"int?"),new Error())},
mC(a){return typeof a=="number"},
x(a){if(typeof a=="number")return a
throw A.U(A.al(a,"num"),new Error())},
S(a){if(typeof a=="number")return a
if(a==null)return a
throw A.U(A.al(a,"num?"),new Error())},
mF(a){return typeof a=="string"},
H(a){if(typeof a=="string")return a
throw A.U(A.al(a,"String"),new Error())},
bD(a){if(typeof a=="string")return a
if(a==null)return a
throw A.U(A.al(a,"String?"),new Error())},
iV(a){if(A.kr(a))return a
throw A.U(A.al(a,"JSObject"),new Error())},
mf(a){if(a==null)return a
if(A.kr(a))return a
throw A.U(A.al(a,"JSObject?"),new Error())},
ku(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.ad(a[q],b)
return s},
mN(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.ku(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.ad(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
ko(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
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
if(l===8){p=A.mX(a.x)
o=a.y
return o.length>0?p+("<"+A.ku(o,b)+">"):p}if(l===10)return A.mN(a,b)
if(l===11)return A.ko(a,b,null)
if(l===12)return A.ko(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.m(b,n)
return b[n]}return"?"},
mX(a){var s=A.kO(a)
if(s!=null)return s
return"minified:"+a},
md(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
mc(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.iT(a,b,!1)
else if(typeof m=="number"){s=m
r=A.cq(a,5,"#")
q=A.iU(s)
for(p=0;p<s;++p)q[p]=r
o=A.cp(a,b,q)
n[b]=o
return o}else return m},
mb(a,b){return A.kl(a.tR,b)},
ma(a,b){return A.kl(a.eT,b)},
iT(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.kj(a,null,b,!1)
r.set(b,s)
return s},
cr(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.kj(a,b,c,!0)
q.set(c,r)
return r},
kk(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.jw(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
kj(a,b,c,d){return A.m0(A.lV(a,b,c,d))},
aX(a,b){b.a=A.mu
b.b=A.mv
return b},
cq(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.ar(null,null)
s.w=b
s.as=c
r=A.aX(a,s)
a.eC.set(c,r)
return r},
kh(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.m8(a,b,r,c)
a.eC.set(r,s)
return s},
m8(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bk(b))if(!(b===t.P||b===t.v))if(s!==6)r=s===7&&A.bI(b.x)
if(r)return b
else if(s===1)return t.P}q=new A.ar(null,null)
q.w=6
q.x=b
q.as=c
return A.aX(a,q)},
kg(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.m6(a,b,r,c)
a.eC.set(r,s)
return s},
m6(a,b,c,d){var s,r
if(d){s=b.w
if(A.bk(b)||b===t.K)return b
else if(s===1)return A.cp(a,"aR",[b])
else if(b===t.P||b===t.v)return t.eH}r=new A.ar(null,null)
r.w=7
r.x=b
r.as=c
return A.aX(a,r)},
m9(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.ar(null,null)
s.w=13
s.x=b
s.as=q
r=A.aX(a,s)
a.eC.set(q,r)
return r},
co(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
m5(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
cp(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.co(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.ar(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.aX(a,r)
a.eC.set(p,q)
return q},
jw(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.co(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.ar(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.aX(a,o)
a.eC.set(q,n)
return n},
ki(a,b,c){var s,r,q="+"+(b+"("+A.co(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.ar(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.aX(a,s)
a.eC.set(q,r)
return r},
kf(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.co(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.co(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.m5(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.ar(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.aX(a,p)
a.eC.set(r,o)
return o},
jx(a,b,c,d){var s,r=b.as+("<"+A.co(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.m7(a,b,c,r,d)
a.eC.set(r,s)
return s},
m7(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.iU(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.aY(a,b,r,0)
m=A.bF(a,c,r,0)
return A.jx(a,n,m,c!==m)}}l=new A.ar(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.aX(a,l)},
lV(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
m0(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.lX(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.kc(a,r,l,k,!1)
else if(q===46)r=A.kc(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bh(a.u,a.e,k.pop()))
break
case 94:k.push(A.m9(a.u,k.pop()))
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
case 62:A.lZ(a,k)
break
case 38:A.lY(a,k)
break
case 63:p=a.u
k.push(A.kh(p,A.bh(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.kg(p,A.bh(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.lW(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.kd(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.m1(a.u,a.e,o)
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
lX(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
kc(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.md(s,o.x)[p]
if(n==null)A.cz('No "'+p+'" in "'+A.lH(o)+'"')
d.push(A.cr(s,o,n))}else d.push(p)
return m},
lZ(a,b){var s,r=a.u,q=A.kb(a,b),p=b.pop()
if(typeof p=="string")b.push(A.cp(r,p,q))
else{s=A.bh(r,a.e,p)
switch(s.w){case 11:b.push(A.jx(r,s,q,a.n))
break
default:b.push(A.jw(r,s,q))
break}}},
lW(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.kb(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bh(p,a.e,o)
q=new A.dh()
q.a=s
q.b=n
q.c=m
b.push(A.kf(p,r,q))
return
case-4:b.push(A.ki(p,b.pop(),s))
return
default:throw A.j(A.cE("Unexpected state under `()`: "+A.u(o)))}},
lY(a,b){var s=b.pop()
if(0===s){b.push(A.cq(a.u,1,"0&"))
return}if(1===s){b.push(A.cq(a.u,4,"1&"))
return}throw A.j(A.cE("Unexpected extended operation "+A.u(s)))},
kb(a,b){var s=b.splice(a.p)
A.kd(a.u,a.e,s)
a.p=b.pop()
return s},
bh(a,b,c){if(typeof c=="string")return A.cp(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.m_(a,b,c)}else return c},
kd(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bh(a,b,c[s])},
m1(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bh(a,b,c[s])},
m_(a,b,c){var s,r,q=b.w
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
kH(a,b,c){var s,r=b.d
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
return A.T(a,A.jr(a,b),c,d,e)}if(s===6)return A.T(a,p,c,d,e)&&A.T(a,b.x,c,d,e)
if(q===7){if(A.T(a,b,c,d.x,e))return!0
return A.T(a,b,c,A.jr(a,d),e)}if(q===6)return A.T(a,b,c,p,e)||A.T(a,b,c,d.x,e)
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
if(!A.T(a,j,c,i,e)||!A.T(a,i,e,j,c))return!1}return A.kp(a,b.x,c,d.x,e)}if(q===11){if(b===t.cj)return!0
if(p)return!1
return A.kp(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.mz(a,b,c,d,e)}if(o&&q===10)return A.mE(a,b,c,d,e)
return!1},
kp(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
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
mz(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.cr(a,b,r[o])
return A.km(a,p,null,c,d.y,e)}return A.km(a,b.y,null,c,d.y,e)},
km(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.T(a,b[s],d,e[s],f))return!1
return!0},
mE(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.T(a,r[s],c,q[s],e))return!1
return!0},
bI(a){var s=a.w,r=!0
if(!(a===t.P||a===t.v))if(!A.bk(a))if(s!==6)r=s===7&&A.bI(a.x)
return r},
bk(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
kl(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
iU(a){return a>0?new Array(a):v.typeUniverse.sEA},
ar:function ar(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dh:function dh(){this.c=this.b=this.a=null},
iS:function iS(a){this.a=a},
dg:function dg(){},
bB:function bB(a){this.a=a},
lP(){var s,r,q
if(self.scheduleImmediate!=null)return A.n_()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.dr(new A.iu(s),1)).observe(r,{childList:true})
return new A.it(s,r,q)}else if(self.setImmediate!=null)return A.n0()
return A.n1()},
lQ(a){self.scheduleImmediate(A.dr(new A.iv(t.M.a(a)),0))},
lR(a){self.setImmediate(A.dr(new A.iw(t.M.a(a)),0))},
lS(a){A.jt(B.H,t.M.a(a))},
jt(a,b){return A.m3(0,b)},
m3(a,b){var s=new A.iQ()
s.co(a,b)
return s},
mK(a){return new A.dd(new A.W($.N,a.h("W<0>")),a.h("dd<0>"))},
mk(a,b){a.$2(0,null)
b.b=!0
return b.a},
mh(a,b){A.ml(a,b)},
mj(a,b){var s,r,q=b.$ti
q.h("1/?").a(a)
s=a==null?q.c.a(a):a
if(!b.b)b.a.cu(s)
else{r=b.a
if(q.h("aR<1>").b(s))r.bA(s)
else r.bC(s)}},
mi(a,b){var s=A.aQ(a),r=A.bH(a),q=b.b,p=b.a
if(q)p.b4(new A.ao(s,r))
else p.bz(new A.ao(s,r))},
ml(a,b){var s,r,q=new A.iW(b),p=new A.iX(b)
if(a instanceof A.W)a.bP(q,p,t.z)
else{s=t.z
if(a instanceof A.W)a.cb(q,p,s)
else{r=new A.W($.N,t.c)
r.a=8
r.c=a
r.bP(q,p,s)}}},
mZ(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.N.c9(new A.j_(s),t.x,t.S,t.z)},
ke(a,b,c){return 0},
jj(a){var s
if(t.V.b(a)){s=a.gaK()
if(s!=null)return s}return B.a0},
lq(a,b){var s
if(!b.b(null))throw A.j(A.ep(null,"computation","The type parameter is not nullable"))
s=new A.W($.N,b.h("W<0>"))
A.lL(a,new A.h4(null,s,b))
return s},
iB(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t.c;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.lI()
b.bz(new A.ao(new A.az(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bJ(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.az()
b.aN(o.a)
A.be(b,p)
return}b.a^=2
A.dq(null,null,b.b,t.M.a(new A.iC(o,b)))},
be(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.u,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.jB(m.a,m.b)}return}q.a=b
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
A.jB(j.a,j.b)
return}g=$.N
if(g!==h)$.N=h
else g=null
c=c.c
if((c&15)===8)new A.iG(q,d,n).$0()
else if(o){if((c&1)!==0)new A.iF(q,j).$0()}else if((c&2)!==0)new A.iE(d,q).$0()
if(g!=null)$.N=g
c=q.c
if(c instanceof A.W){p=q.a.$ti
p=p.h("aR<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.aP(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.iB(c,f,!0)
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
mO(a,b){var s
if(t.C.b(a))return b.c9(a,t.z,t.K,t.l)
s=t.B
if(s.b(a))return s.a(a)
throw A.j(A.ep(a,"onError",u.c))},
mL(){var s,r
for(s=$.bE;s!=null;s=$.bE){$.cw=null
r=s.b
$.bE=r
if(r==null)$.cv=null
s.a.$0()}},
mU(){$.jA=!0
try{A.mL()}finally{$.cw=null
$.jA=!1
if($.bE!=null)$.jM().$1(A.kz())}},
kv(a){var s=new A.de(a),r=$.cv
if(r==null){$.bE=$.cv=s
if(!$.jA)$.jM().$1(A.kz())}else $.cv=r.b=s},
mR(a){var s,r,q,p=$.bE
if(p==null){A.kv(a)
$.cw=$.cv
return}s=new A.de(a)
r=$.cw
if(r==null){s.b=p
$.bE=$.cw=s}else{q=r.b
s.b=q
$.cw=r.b=s
if(q==null)$.cv=s}},
nz(a,b){A.Z(a,"stream",t.K)
return new A.dm(b.h("dm<0>"))},
lL(a,b){var s=$.N
if(s===B.j)return A.jt(a,t.M.a(b))
return A.jt(a,t.M.a(s.bY(b)))},
jB(a,b){A.mR(new A.iZ(a,b))},
kt(a,b,c,d,e){var s,r=$.N
if(r===c)return d.$0()
$.N=c
s=r
try{r=d.$0()
return r}finally{$.N=s}},
mQ(a,b,c,d,e,f,g){var s,r=$.N
if(r===c)return d.$1(e)
$.N=c
s=r
try{r=d.$1(e)
return r}finally{$.N=s}},
mP(a,b,c,d,e,f,g,h,i){var s,r=$.N
if(r===c)return d.$2(e,f)
$.N=c
s=r
try{r=d.$2(e,f)
return r}finally{$.N=s}},
dq(a,b,c,d){t.M.a(d)
if(B.j!==c){d=c.bY(d)
d=d}A.kv(d)},
iu:function iu(a){this.a=a},
it:function it(a,b,c){this.a=a
this.b=b
this.c=c},
iv:function iv(a){this.a=a},
iw:function iw(a){this.a=a},
iQ:function iQ(){},
iR:function iR(a,b){this.a=a
this.b=b},
dd:function dd(a,b){this.a=a
this.b=!1
this.$ti=b},
iW:function iW(a){this.a=a},
iX:function iX(a){this.a=a},
j_:function j_(a){this.a=a},
aN:function aN(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
au:function au(a,b){this.a=a
this.$ti=b},
ao:function ao(a,b){this.a=a
this.b=b},
h4:function h4(a,b,c){this.a=a
this.b=b
this.c=c},
bd:function bd(a,b,c,d,e){var _=this
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
iy:function iy(a,b){this.a=a
this.b=b},
iD:function iD(a,b){this.a=a
this.b=b},
iC:function iC(a,b){this.a=a
this.b=b},
iA:function iA(a,b){this.a=a
this.b=b},
iz:function iz(a,b){this.a=a
this.b=b},
iG:function iG(a,b,c){this.a=a
this.b=b
this.c=c},
iH:function iH(a,b){this.a=a
this.b=b},
iI:function iI(a){this.a=a},
iF:function iF(a,b){this.a=a
this.b=b},
iE:function iE(a,b){this.a=a
this.b=b},
de:function de(a){this.a=a
this.b=null},
dm:function dm(a){this.$ti=a},
ct:function ct(){},
dl:function dl(){},
iP:function iP(a,b){this.a=a
this.b=b},
iZ:function iZ(a,b){this.a=a
this.b=b},
jo(a,b){return new A.aH(a.h("@<0>").F(b).h("aH<1,2>"))},
R(a,b,c){return b.h("@<0>").F(c).h("k_<1,2>").a(A.n7(a,new A.aH(b.h("@<0>").F(c).h("aH<1,2>"))))},
Y(a,b){return new A.aH(a.h("@<0>").F(b).h("aH<1,2>"))},
ly(a){return new A.as(a.h("as<0>"))},
c1(a){return new A.as(a.h("as<0>"))},
lz(a,b){return b.h("k1<0>").a(A.n8(a,new A.as(b.h("as<0>"))))},
jv(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
iN(a,b,c){var s=new A.bg(a,b,c.h("bg<0>"))
s.c=a.e
return s},
b4(a,b){var s=J.E(a)
if(s.j())return s.gp()
return null},
aq(a,b,c){var s=A.jo(b,c)
a.a8(0,new A.hb(s,b,c))
return s},
k0(a,b,c){var s=A.jo(b,c)
s.G(0,a)
return s},
he(a){var s,r
if(A.jI(a))return"{...}"
s=new A.bw("")
try{r={}
B.a.m($.aj,a)
s.a+="{"
r.a=!0
a.a8(0,new A.hf(r,s))
s.a+="}"}finally{if(0>=$.aj.length)return A.m($.aj,-1)
$.aj.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
as:function as(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dk:function dk(a){this.a=a
this.c=this.b=null},
bg:function bg(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
hb:function hb(a,b,c){this.a=a
this.b=b
this.c=c},
B:function B(){},
D:function D(){},
hd:function hd(a){this.a=a},
hf:function hf(a,b){this.a=a
this.b=b},
cs:function cs(){},
bs:function bs(){},
ce:function ce(){},
bv:function bv(){},
cm:function cm(){},
bC:function bC(){},
mM(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aQ(r)
q=A.jX(String(s))
throw A.j(q)}q=A.iY(p)
return q},
iY(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.di(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.iY(a[s])
return a},
jZ(a,b,c){return new A.bZ(a,b)},
mn(a){return a.H()},
lT(a,b){return new A.iK(a,[],A.n4())},
lU(a,b,c){var s,r=new A.bw(""),q=A.lT(r,b)
q.aY(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
di:function di(a,b){this.a=a
this.b=b
this.c=null},
dj:function dj(a){this.a=a},
cH:function cH(){},
cJ:function cJ(){},
bZ:function bZ(a,b){this.a=a
this.b=b},
cU:function cU(a,b){this.a=a
this.b=b},
h7:function h7(){},
h9:function h9(a){this.b=a},
h8:function h8(a){this.a=a},
iL:function iL(){},
iM:function iM(a,b){this.a=a
this.b=b},
iK:function iK(a,b,c){this.c=a
this.a=b
this.b=c},
kG(a){var s=A.lF(a,null)
if(s!=null)return s
throw A.j(A.jX(a))},
lm(a,b){a=A.U(a,new Error())
if(a==null)a=A.cu(a)
a.stack=b.q(0)
throw a},
hc(a,b,c,d){var s,r=c?J.jY(a,d):J.lv(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
br(a,b,c){var s,r=A.d([],c.h("t<0>"))
for(s=J.E(a);s.j();)B.a.m(r,c.a(s.gp()))
if(b)return r
r.$flags=1
return r},
n(a,b){var s,r
if(Array.isArray(a))return A.d(a.slice(0),b.h("t<0>"))
s=A.d([],b.h("t<0>"))
for(r=J.E(a);r.j();)B.a.m(s,r.gp())
return s},
aI(a,b){var s=A.br(a,!1,b)
s.$flags=3
return s},
k6(a,b,c){var s=J.E(b)
if(!s.j())return a
if(c.length===0){do a+=A.u(s.gp())
while(s.j())}else{a+=A.u(s.gp())
while(s.j())a=a+c+A.u(s.gp())}return a},
lI(){return A.bH(new Error())},
ll(a,b,c){var s,r
for(s=0;s<4;++s){r=a[s]
if(r.b===b)return r}throw A.j(A.ep(b,"name","No enum value with that name"))},
cM(a){if(typeof a=="number"||A.jz(a)||a==null)return J.bn(a)
if(typeof a=="string")return JSON.stringify(a)
return A.k3(a)},
ln(a,b){A.Z(a,"error",t.K)
A.Z(b,"stackTrace",t.l)
A.lm(a,b)},
cE(a){return new A.cD(a)},
cC(a,b){return new A.az(!1,null,b,a)},
ep(a,b,c){return new A.az(!0,a,b,c)},
b9(a,b,c,d,e){return new A.c9(b,c,!0,a,d,"Invalid value")},
lG(a,b,c){if(0>a||a>c)throw A.j(A.b9(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.j(A.b9(b,a,c,"end",null))
return b}return c},
ca(a,b){if(a<0)throw A.j(A.b9(a,0,null,b,null))
return a},
jk(a,b,c,d){return new A.cN(b,!0,a,d,"Index out of range")},
bc(a){return new A.cf(a)},
k8(a){return new A.db(a)},
k5(a){return new A.cd(a)},
X(a){return new A.cI(a)},
jX(a){return new A.aF(a)},
lu(a,b,c){var s,r
if(A.jI(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.d([],t.s)
B.a.m($.aj,a)
try{A.mI(a,s)}finally{if(0>=$.aj.length)return A.m($.aj,-1)
$.aj.pop()}r=A.k6(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
jl(a,b,c){var s,r
if(A.jI(a))return b+"..."+c
s=new A.bw(b)
B.a.m($.aj,a)
try{r=s
r.a=A.k6(r.a,a,", ")}finally{if(0>=$.aj.length)return A.m($.aj,-1)
$.aj.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
mI(a,b){var s,r,q,p,o,n,m,l=a.gC(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.j())return
s=A.u(l.gp())
B.a.m(b,s)
k+=s.length+2;++j}if(!l.j()){if(j<=5)return
if(0>=b.length)return A.m(b,-1)
r=b.pop()
if(0>=b.length)return A.m(b,-1)
q=b.pop()}else{p=l.gp();++j
if(!l.j()){if(j<=4){B.a.m(b,A.u(p))
return}r=A.u(p)
if(0>=b.length)return A.m(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gp();++j
for(;l.j();p=o,o=n){n=l.gp();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.m(b,-1)
k-=b.pop().length+2;--j}B.a.m(b,"...")
return}}q=A.u(p)
r=A.u(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.m(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.m(b,m)
B.a.m(b,q)
B.a.m(b,r)},
jq(a,b,c,d){var s
if(B.o===c){s=J.af(a)
b=J.af(b)
return A.ih(A.aJ(A.aJ($.dt(),s),b))}if(B.o===d){s=J.af(a)
b=J.af(b)
c=J.af(c)
return A.ih(A.aJ(A.aJ(A.aJ($.dt(),s),b),c))}s=J.af(a)
b=J.af(b)
c=J.af(c)
d=J.af(d)
d=A.ih(A.aJ(A.aJ(A.aJ(A.aJ($.dt(),s),b),c),d))
return d},
lB(a){var s,r,q=$.dt()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.v)(a),++r)q=A.aJ(q,J.af(a[r]))
return A.ih(q)},
cK:function cK(){},
df:function df(){},
C:function C(){},
cD:function cD(a){this.a=a},
aK:function aK(){},
az:function az(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
c9:function c9(a,b,c,d,e,f){var _=this
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
cf:function cf(a){this.a=a},
db:function db(a){this.a=a},
cd:function cd(a){this.a=a},
cI:function cI(a){this.a=a},
d3:function d3(){},
cc:function cc(){},
ix:function ix(a){this.a=a},
aF:function aF(a){this.a=a},
a:function a(){},
ab:function ab(a,b,c){this.a=a
this.b=b
this.$ti=c},
ac:function ac(){},
z:function z(){},
dn:function dn(){},
ig:function ig(){this.b=this.a=0},
bw:function bw(a){this.a=a},
jQ(a,b,c,d){var s,r,q,p,o,n=t.N,m=t.S,l=A.d([],t.aD),k=a.gav(),j=a.gav(),i=a.gav(),h=A.k0(a.gav().w,m,m),g=A.Y(m,m)
for(s=a.gN(),r=J.E(s.a),s=new A.P(r,s.b,s.$ti.h("P<1>"));s.j();){q=r.gp()
g.A(0,q.a,q.d)}s=A.Y(n,t.J)
for(r=d.length,p=0;p<d.length;d.length===r||(0,A.v)(d),++p){o=d[p]
s.A(0,o.a,o)}return new A.aE(a,b,c,k.b,j.c,i.d,h,g,s,A.c1(n),A.c1(n),A.c1(n),A.c1(m),A.c1(m),l)},
aV:function aV(a,b,c){this.a=a
this.b=b
this.c=c},
eq:function eq(a){this.a=a},
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
dw:function dw(){},
dx:function dx(){},
dY:function dY(a){this.a=a},
dy:function dy(a,b){this.a=a
this.b=b},
dB:function dB(a){this.a=a},
dC:function dC(){},
dJ:function dJ(a,b){this.a=a
this.b=b},
dD:function dD(a){this.a=a},
dE:function dE(){},
dF:function dF(a,b){this.a=a
this.b=b},
dG:function dG(a){this.a=a},
dH:function dH(a,b){this.a=a
this.b=b},
dI:function dI(a,b){this.a=a
this.b=b},
dK:function dK(a){this.a=a},
dL:function dL(a,b){this.a=a
this.b=b},
dM:function dM(a){this.a=a},
dN:function dN(){},
dO:function dO(a){this.a=a},
dP:function dP(){},
dQ:function dQ(a){this.a=a},
dR:function dR(a){this.a=a},
dS:function dS(a){this.a=a},
dV:function dV(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
dT:function dT(a){this.a=a},
dU:function dU(a){this.a=a},
dZ:function dZ(a){this.a=a},
dW:function dW(){},
dX:function dX(){},
dz:function dz(){},
dA:function dA(){},
e_:function e_(a){this.a=a},
e0:function e0(){},
e1:function e1(a){this.a=a},
e2:function e2(a){this.a=a},
aA(a,b,c,d){var s,r=b.f,q=A.h(r)
q=new A.c(r,q.h("e(1)").a(new A.et(a)),q.h("c<1>")).gl(0)
r=b.gN()
if(!b.gN().gC(0).j())s=0
else{s=c.b.i(0,"countryIncome")
s.toString
s=B.b.k(s)}return new A.es(a,q,r.E(0,s,new A.eu(d,c),t.S),b,c)},
es:function es(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
et:function et(a){this.a=a},
eu:function eu(a,b){this.a=a
this.b=b},
a4(a){var s=a.x,r=s>=15?500:0,q=a.e
if(q===2)q=1000
else q=q===1?30:0
return a.w*3+a.r*0.35+a.f*0.15+s*1.5-a.y*2+r+q},
ae(a,b){var s=b?a.x*0.75:0,r=a.e
if(r===1)r=30
else r=r===2?-200:0
return a.w*100+a.r*0.35+a.f*0.15-a.y*2-s+r},
nr(a){return t.r.a(a).x>=15},
kE(a,b){var s=a.gbk(),r=a.gP(),q=b.b.i(0,"soldierPower")
q.toString
return s*(a.w+r*B.b.k(q))+B.a.E(a.ax,0,new A.j6(b,a),t.H)},
ds(a,b,c,d){var s,r=b.b,q=r.i(0,"soldierHp")
q.toString
q=B.b.k(q)
s=b.bX(a.w,c,!1)
r=r.i(0,"soldierPower")
r.toString
return(a.f+d*q)*(s+d*B.b.k(r))*(1+a.ay/1000)},
b2:function b2(a,b){this.a=a
this.b=b},
bJ:function bJ(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=e
_.r=f},
ev:function ev(a,b,c){this.a=a
this.b=b
this.c=c},
ew:function ew(){},
ex:function ex(){},
j6:function j6(a,b){this.a=a
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
at:function at(a,b,c,d,e){var _=this
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
eV:function eV(a){this.a=a},
eW:function eW(){},
eX:function eX(){},
f7:function f7(){},
fa:function fa(){},
fb:function fb(a){this.a=a},
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
eY:function eY(a,b){this.a=a
this.b=b},
eZ:function eZ(a){this.a=a},
f_:function f_(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
f0:function f0(a,b,c){this.a=a
this.b=b
this.c=c},
f1:function f1(a){this.a=a},
f2:function f2(){},
f3:function f3(a){this.a=a},
f4:function f4(a){this.a=a},
f5:function f5(){},
f6:function f6(a){this.a=a},
f8:function f8(){},
f9:function f9(a){this.a=a},
eJ:function eJ(a,b){this.a=a
this.b=b},
eK:function eK(a){this.a=a},
eF:function eF(a){this.a=a},
eG:function eG(a,b,c){this.a=a
this.b=b
this.c=c},
eH:function eH(a,b,c){this.a=a
this.b=b
this.c=c},
eI:function eI(a){this.a=a},
eO:function eO(a){this.a=a},
eP:function eP(a,b){this.a=a
this.b=b},
eQ:function eQ(a){this.a=a},
eR:function eR(a,b){this.a=a
this.b=b},
eS:function eS(a){this.a=a},
eT:function eT(a){this.a=a},
eU:function eU(){},
eM:function eM(a){this.a=a},
eN:function eN(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eL:function eL(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eB:function eB(a,b,c){this.a=a
this.b=b
this.c=c},
eC:function eC(a){this.a=a},
eD:function eD(a){this.a=a},
eE:function eE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eA:function eA(a){this.a=a},
a7:function a7(a,b,c,d,e,f){var _=this
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
h1:function h1(a,b){this.a=a
this.b=b},
h2:function h2(a){this.a=a},
h0:function h0(a){this.a=a},
h3:function h3(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
fZ:function fZ(){},
fY:function fY(){},
h_:function h_(){},
fX:function fX(){},
fi:function fi(){},
fj:function fj(){},
fk:function fk(){},
fv:function fv(){},
fG:function fG(a){this.a=a},
fI:function fI(){},
fJ:function fJ(){},
fK:function fK(a){this.a=a},
fL:function fL(){},
fM:function fM(a){this.a=a},
fN:function fN(a){this.a=a},
fl:function fl(){},
fm:function fm(a){this.a=a},
fO:function fO(a,b){this.a=a
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
fs:function fs(a,b,c){this.a=a
this.b=b
this.c=c},
ft:function ft(a){this.a=a},
fu:function fu(a,b,c){this.a=a
this.b=b
this.c=c},
fw:function fw(a){this.a=a},
fx:function fx(){},
fy:function fy(){},
fz:function fz(){},
fA:function fA(a,b){this.a=a
this.b=b},
fB:function fB(){},
fC:function fC(a){this.a=a},
fD:function fD(a){this.a=a},
fE:function fE(a){this.a=a},
fF:function fF(){},
fH:function fH(a){this.a=a},
fU:function fU(a){this.a=a},
fV:function fV(a){this.a=a},
fW:function fW(){},
fP:function fP(){},
fQ:function fQ(a){this.a=a},
fR:function fR(){},
fS:function fS(a){this.a=a},
fT:function fT(a){this.a=a},
ed(a){var s,r=a.length
if(0>=r)return A.m(a,0)
s=A.x(a[0])
if(1>=r)return A.m(a,1)
return new A.K(s,A.x(a[1]))},
K:function K(a,b){this.a=a
this.b=b},
ec:function ec(a){this.a=a},
jP(c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9=A.H(c3.i(0,"id")),b0=A.f(c3.i(0,"c")),b1=A.f(c3.i(0,"home")),b2=A.f(c3.i(0,"o")),b3=A.f(c3.i(0,"t")),b4=A.x(c3.i(0,"hp")),b5=A.f(c3.i(0,"max")),b6=A.f(c3.i(0,"a")),b7=A.f(c3.i(0,"p")),b8=A.f(c3.i(0,"pay")),b9=t.j,c0=A.ed(b9.a(c3.i(0,"xy"))),c1=A.ed(b9.a(c3.i(0,"v"))),c2=A.f(c3.i(0,"s"))
if(!(c2>=0&&c2<8))return A.m(B.L,c2)
c2=B.L[c2]
s=A.d([],t.n)
for(r=b9.a(c3.i(0,"troops")),q=r.length,p=0;p<r.length;r.length===q||(0,A.v)(r),++p)s.push(A.x(r[p]))
r=t.R
q=t.S
o=A.br(r.a(c3.i(0,"w")),!0,q)
n=A.x(c3.i(0,"m"))
m=A.x(c3.i(0,"due"))
l=c3.i(0,"to")==null?null:A.ed(b9.a(c3.i(0,"to")))
k=A.a3(c3.i(0,"target"))
j=A.x(c3.i(0,"return"))
i=A.av(c3.i(0,"dispatch"))
h=A.av(c3.i(0,"move"))
g=A.av(c3.i(0,"dismiss"))
f=A.av(c3.i(0,"upgrade"))
e=A.av(c3.i(0,"retreat"))
d=A.av(c3.i(0,"marked"))
c=A.H(c3.i(0,"rev"))
b=A.f(c3.i(0,"orderRev"))
a=A.bD(c3.i(0,"opponent"))
a0=A.f(c3.i(0,"clashes"))
a1=A.x(c3.i(0,"received"))
a2=A.x(c3.i(0,"dealt"))
a3=A.av(c3.i(0,"opening"))
a4=A.av(c3.i(0,"weaponReady"))
a5=A.d([],t._)
for(r=J.E(r.a(c3.i(0,"returnPath")));r.j();){a6=b9.a(r.gp())
a7=a6.length
if(0>=a7)return A.m(a6,0)
a8=A.x(a6[0])
if(1>=a7)return A.m(a6,1)
a5.push(new A.K(a8,A.x(a6[1])))}b9=A.a3(c3.i(0,"regionCity"))
r=A.a3(c3.i(0,"salaryPaidMonth"))
if(r==null)r=-1
a6=A.dp(c3.i(0,"movementPending"))
return new A.p(a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,c0,c1,c2,A.aI(s,t.i),A.aI(o,q),n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,b9,r,a6===!0)},
l7(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=A.f(a2.i(0,"id")),d=A.f(a2.i(0,"c")),c=A.f(a2.i(0,"native")),b=A.f(a2.i(0,"level")),a=t.j,a0=A.ed(a.a(a2.i(0,"xy"))),a1=A.d([],t._)
for(s=a.a(a2.i(0,"outline")),r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q){p=a.a(s[q])
o=p.length
if(0>=o)return A.m(p,0)
n=A.x(p[0])
if(1>=o)return A.m(p,1)
a1.push(new A.K(n,A.x(p[1])))}a=A.f(a2.i(0,"income"))
s=A.f(a2.i(0,"poor"))
r=A.f(a2.i(0,"cap"))
p=A.f(a2.i(0,"recruitCap"))
o=A.av(a2.i(0,"recruit"))
n=A.H(a2.i(0,"rev"))
m=A.f(a2.i(0,"baseIncome"))
l=A.a3(a2.i(0,"initial"))
k=A.f(a2.i(0,"wins"))
j=A.bD(a2.i(0,"attacker"))
i=A.bD(a2.i(0,"defender"))
h=A.H(a2.i(0,"stage"))
g=A.x(a2.i(0,"next"))
f=A.dp(a2.i(0,"fallen"))
return new A.Q(e,d,c,b,a0,new A.ec(a1),a,s,r,p,m,o,n,l,k,j,i,h,g,f===!0,A.x(a2.i(0,"danger")))},
l8(a){var s,r,q,p,o,n=A.f(a.i(0,"id")),m=A.f(a.i(0,"gold")),l=A.f(a.i(0,"reserves")),k=A.f(a.i(0,"capacity")),j=A.f(a.i(0,"salary")),i=A.f(a.i(0,"poor")),h=A.S(a.i(0,"garrisonAccrued"))
if(h==null)h=0
s=t.S
r=A.Y(s,s)
for(q=t.f,p=q.a(a.i(0,"stock")).gai(),p=p.gC(p);p.j();){o=p.gp()
r.A(0,A.kG(A.H(o.a)),A.f(o.b))}p=A.Y(s,s)
for(q=q.a(a.i(0,"hate")).gai(),q=q.gC(q);q.j();){o=q.gp()
p.A(0,A.kG(A.H(o.a)),A.f(o.b))}return new A.b0(n,m,l,k,j,i,h,A.ey(r,s,s),A.ey(p,s,s))},
l9(a){var s,r,q,p,o,n,m=A.f(a.i(0,"country")),l=A.f(a.i(0,"tick")),k=A.x(a.i(0,"month")),j=A.d([],t.Y)
for(s=t.R,r=J.E(s.a(a.i(0,"cities"))),q=t.f,p=t.N,o=t.z;r.j();)j.push(A.l7(A.aq(q.a(r.gp()),p,o)))
r=A.d([],t.e)
for(n=J.E(s.a(a.i(0,"heroes")));n.j();)r.push(A.jP(A.aq(q.a(n.gp()),p,o)))
n=A.d([],t.eu)
for(s=J.E(s.a(a.i(0,"countries")));s.j();)n.push(A.l8(A.aq(q.a(s.gp()),p,o)))
s=A.f(a.i(0,"pool"))
q=A.f(a.i(0,"salary"))
p=A.a3(a.i(0,"year"))
if(p==null)p=1
o=A.a3(a.i(0,"monthIndex"))
if(o==null)o=0
return new A.e4(m,l,p,o,k,A.aI(j,t.q),A.aI(r,t.r),A.aI(n,t.t),s,q)},
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
dv:function dv(){},
du:function du(){},
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
ea:function ea(a){this.a=a},
eb:function eb(a){this.a=a},
e7:function e7(a,b){this.a=a
this.b=b},
e6:function e6(a){this.a=a},
e8:function e8(){},
e9:function e9(a){this.a=a},
e5:function e5(a){this.a=a},
jD(a,b,c){var s,r,q=null,p=a.as
if(p===B.f||p===B.e||p===B.t)return q
s=c.y.i(0,a.a)
p=s==null
if((p?q:s.b)==="expedition")p=p?q:s.d
else p=a.cx
r=b.J(p)
return r!=null&&r.b!==a.b?r:q},
ky(a,b,c,d){var s,r,q=A.jD(a,b,c)
if(q==null)return!1
s=a.as
r=!0
if(s!==B.x)if(s!==B.D){s=a.z
s=q.f.a3(s).K(s)<=d.w.p2}else s=r
else s=r
return s},
c8(a,b,c,d,e){var s=B.a.I(a.f,new A.hi(e,a))?e:null
s=new A.hh(a,b,c,s,d,A.Y(t.S,t.bd))
s.cn(a,b,c,d,e)
return s},
hh:function hh(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
hi:function hi(a,b){this.a=a
this.b=b},
hj:function hj(){},
hn:function hn(a){this.a=a},
hp:function hp(a){this.a=a},
hq:function hq(a){this.a=a},
ho:function ho(a,b){this.a=a
this.b=b},
hl:function hl(){},
hm:function hm(a,b){this.a=a
this.b=b},
hr:function hr(a){this.a=a},
hk:function hk(a){this.a=a},
d5:function d5(a,b){this.a=a
this.b=b},
hs:function hs(a,b,c){this.a=a
this.b=b
this.c=c},
hv:function hv(a,b){this.a=a
this.b=b},
hy:function hy(a,b,c){this.a=a
this.b=b
this.c=c},
hz:function hz(){},
hA:function hA(a){this.a=a},
hB:function hB(){},
hD:function hD(a){this.a=a},
hE:function hE(){},
hC:function hC(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ht:function ht(a){this.a=a},
hu:function hu(){},
hF:function hF(){},
hG:function hG(){},
hw:function hw(){},
hx:function hx(a){this.a=a},
ld(a){var s,r,q,p,o,n,m,l,k=A.H(a.i(0,"hero")),j=A.H(a.i(0,"role")),i=A.f(a.i(0,"deadline")),h=A.f(a.i(0,"commit")),g=A.a3(a.i(0,"city")),f=A.bD(a.i(0,"enemy")),e=A.d([],t._)
for(s=J.E(t.R.a(a.i(0,"points"))),r=t.j;s.j();){q=r.a(s.gp())
p=q.length
if(0>=p)return A.m(q,0)
o=A.x(q[0])
if(1>=p)return A.m(q,1)
e.push(new A.K(o,A.x(q[1])))}s=A.f(a.i(0,"leg"))
r=A.f(a.i(0,"gold"))
q=A.av(a.i(0,"slot"))
p=A.dp(a.i(0,"rearStaging"))
o=A.H(a.i(0,"reason"))
n=A.f(a.i(0,"order"))
m=A.a3(a.i(0,"targetCountry"))
l=A.dp(a.i(0,"attrition"))
return new A.a5(k,j,o,g,m,l===!0,f,e,s,i,h,r,q,p===!0,n)},
la(a){var s,r,q,p,o,n,m,l,k,j,i
if(!J.am(a.i(0,"protocol"),1))throw A.j(B.a3)
s=A.H(a.i(0,"session"))
r=A.f(a.i(0,"id"))
q=A.H(a.i(0,"rules"))
p=A.H(a.i(0,"map"))
o=t.f
n=t.N
m=t.z
l=A.l9(A.aq(o.a(a.i(0,"observation")),n,m))
k=A.f(a.i(0,"deadline"))
j=A.d([],t.m)
for(i=J.E(t.R.a(a.i(0,"tasks")));i.j();)j.push(A.ld(A.aq(o.a(i.gp()),n,m)))
o=A.f(a.i(0,"seed"))
n=A.f(a.i(0,"priority"))
m=A.f(a.i(0,"idle"))
i=A.bD(a.i(0,"stage"))
if(i==null)i="full"
return new A.ef(s,q,p,r,k,o,n,m,A.ll(B.ae,i,t.a9),A.a3(a.i(0,"offensiveCountry")),A.a3(a.i(0,"offensiveCity")),l,j)},
jR(a,b,c,d){var s=a.Q
return new A.ee(a.a,a.b,a.c,a.d,s.a,s.b,a.e,d,b,c)},
aD:function aD(a,b){this.a=a
this.b=b},
an:function an(a,b){this.a=a
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
M:function M(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bN:function bN(a,b,c,d,e,f,g,h,i,j){var _=this
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
ef:function ef(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
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
ee:function ee(a,b,c,d,e,f,g,h,i,j){var _=this
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
j0(b1,b2,b3,b4,b5,b6,b7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3="soldierLimit",a4="soldierPower",a5="soldierHp",a6={},a7=b3.v(b2.a),a8=A.h(a7).h("J<1>"),a9=A.a0(new A.J(a7,a8),0,A.Z(b2.gad(),"count",t.S),a8.h("k.E")).ab(0),b0=A.aA(b2.b,b3,b4,null)
a6.a=a6.b=1
a6.c=null
a8=b4.cU(b1.w,!1)
a7=b4.b
s=a7.i(0,a3)
s.toString
s=B.b.k(s)
r=a7.i(0,a4)
r.toString
q=a8+s*B.b.k(r)
p=B.a.ap(b3.w,new A.j1(b2)).c
for(a8=b2.cy,s=b2.at,r=b2.ax,o=s==null,n=b2.d,m=t.a,l=b4.d,k=0,j=0;j<a9.length;++j){i=a9[j]
h=a7.i(0,a3)
h.toString
g=Math.min(B.b.k(h),p+i.gP())
p=Math.max(0,p-(g-i.gP()))
if(o)h=n
else{h=a8?1:0
h=B.c.u(s-r-h,0,5)}h=Math.max(1,h-j)
f=a7.i(0,a3)
f.toString
f=B.b.k(f)
e=b5.d1(b1,i,h,!1,g,j<b6.length?A.d([b6[j]],m):B.d,!0,f)
a6.b=Math.min(a6.b,e.b)
if(j===0)a6.c=e
a6.a=Math.min(a6.a,e.c)
if(o)h=n
else{h=a8?1:0
h=B.c.u(s-r-h,0,5)}h=A.f(Math.max(1,h-j))
f=B.c.u(B.c.Z(i.w),0,63)
if(h>0){d=l.length
h=B.c.u(h-1,0,d-1)
if(!(h>=0&&h<d))return A.m(l,h)
h=l[h]}else h=0
h=B.c.u(f+h,0,63)
f=a7.i(0,a4)
f.toString
c=(h+g*B.b.k(f))/Math.max(1,q)
f=a7.i(0,a5)
f.toString
k+=(i.f+g*B.b.k(f))*c*c}for(a8=b4.r,s=b4.w,r=s.rx,b=0,j=0;o=b6.length,j<Math.min(o,a9.length);++j){if(!(j<o))return A.m(b6,j)
a=a8.i(0,b6[j])
if(a!=null){o=Math.max(0,a.c-a.d)
b+=o*(j===0?1:r)}}a8=b1.f
r=a7.i(0,a3)
r.toString
r=B.b.k(r)
a7=a7.i(0,a5)
a7.toString
a0=Math.max(1,B.b.am(k/Math.max(1,(a8+r*B.b.k(a7)+b)*0.85)))
a7=new A.j2(a6,a9,b1,b4)
a1=a7.$0()
if(a1.a[2]>0)return a1
if(a9.length!==0&&J.ji(b6)&&a6.b<s.k4)return new A.aM([!1,a6.b,0,a6.a])
r=s.fy
if(a0>r)return a7.$0()
o=a9.length
m=o===0
if(!m)a8=o===1&&n<=2&&a8>=b1.r*0.8&&a6.b>s.ry||a6.b>s.RG+Math.max(0,o-1)*0.025-b7
else a8=!0
if(a8){a7=a6.b
a8=a6.a
return new A.aM([!1,a7,b0.ca(a7>=s.k4||m?a0:Math.max(2,a0),o),a8])}a2=o>1&&a6.a>s.RG&&a6.b>-0.08?Math.min(r,o):0
if(a2===0)return a7.$0()
a7=a6.b
a8=a6.a
return new A.aM([!1,a7,b0.ca(a2,o),a8])},
j1:function j1(a){this.a=a},
j2:function j2(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hK:function hK(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
hN:function hN(a){this.a=a},
hO:function hO(){},
hP:function hP(a,b,c){this.a=a
this.b=b
this.c=c},
i_:function i_(a,b,c){this.a=a
this.b=b
this.c=c},
hM:function hM(a,b){this.a=a
this.b=b},
hL:function hL(a,b,c){this.a=a
this.b=b
this.c=c},
i7:function i7(a,b){this.a=a
this.b=b},
i8:function i8(a,b){this.a=a
this.b=b},
ia:function ia(a){this.a=a},
ib:function ib(){},
i9:function i9(a,b,c){this.a=a
this.b=b
this.c=c},
ic:function ic(a){this.a=a},
id:function id(a,b){this.a=a
this.b=b},
hQ:function hQ(){},
hR:function hR(){},
hS:function hS(){},
hT:function hT(){},
hU:function hU(a){this.a=a},
hV:function hV(){},
hW:function hW(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
hX:function hX(a,b,c){this.a=a
this.b=b
this.c=c},
hY:function hY(a){this.a=a},
hZ:function hZ(a){this.a=a},
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
i6:function i6(){},
bo:function bo(a,b,c){this.a=a
this.b=b
this.d=c},
eg:function eg(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eh:function eh(){},
ei:function ei(a,b,c){this.a=a
this.b=b
this.c=c},
ej:function ej(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ek:function ek(a,b,c){this.a=a
this.b=b
this.c=c},
el:function el(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
lb(a,b,c,d,e,f,g,h){var s,r,q,p,o=A.ey(f,t.N,t.H),n=t.S,m=A.aI(e,n),l=A.aI(a,n),k=t.i,j=A.aI(c,k)
k=A.aI(b,k)
s=t.z
s=A.Y(s,s)
for(r=h.length,q=0;q<h.length;h.length===r||(0,A.v)(h),++q){p=h[q]
s.A(0,p.a,p)}return new A.em(g,o,m,l,j,k,A.ey(s,n,t.o),d)},
lc(c9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2=A.H(c9.i(0,"version")),c3=t.f,c4=t.N,c5=A.aq(c3.a(c9.i(0,"values")),c4,t.H),c6=t.R,c7=t.S,c8=A.br(c6.a(c9.i(0,"upgrades")),!0,c7)
c7=A.br(c6.a(c9.i(0,"defenseBonuses")),!0,c7)
s=t.n
r=A.d([],s)
for(q=J.E(c6.a(c9.i(0,"movement")));q.j();)r.push(A.x(q.gp()))
s=A.d([],s)
for(q=J.E(c6.a(c9.i(0,"field")));q.j();)s.push(A.x(q.gp()))
q=A.d([],t.W)
for(c6=J.E(c6.a(c9.i(0,"weapons"))),p=t.j;c6.j();){o=p.a(c6.gp())
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
h=A.av(o[5])
if(6>=n)return A.m(o,6)
q.push(new A.ag(m,l,k,j,i,h,A.x(o[6])))}c3=A.aq(c3.a(c9.i(0,"tuning")),c4,t.z)
c4=A.x(c3.i(0,"interval"))
c6=A.S(c3.i(0,"resourceInterval"))
if(c6==null)c6=30
p=A.a3(c3.i(0,"cashBuffer"))
if(p==null)p=12
o=A.S(c3.i(0,"payrollRatio"))
if(o==null)o=0.5
n=A.a3(c3.i(0,"dangerousCountryCities"))
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
d=A.x(c3.i(0,"threat"))
c=A.x(c3.i(0,"urgent"))
b=A.x(c3.i(0,"margin"))
a=A.x(c3.i(0,"commit"))
a0=A.a3(c3.i(0,"rearExtra"))
if(a0==null)a0=1
a1=A.f(c3.i(0,"candidates"))
a2=A.f(c3.i(0,"assessments"))
a3=A.f(c3.i(0,"routes"))
a4=A.f(c3.i(0,"plans"))
a5=A.f(c3.i(0,"commands"))
a6=A.f(c3.i(0,"team"))
a7=A.a3(c3.i(0,"fronts"))
if(a7==null)a7=2
a8=A.a3(c3.i(0,"singleFrontMonths"))
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
b5=A.a3(c3.i(0,"attritionCombat"))
if(b5==null)b5=8
b6=A.S(c3.i(0,"attritionGain"))
if(b6==null)b6=0.06
b7=A.f(c3.i(0,"targets"))
b8=A.f(c3.i(0,"slice"))
b9=A.x(c3.i(0,"advantage"))
c0=A.x(c3.i(0,"expansion"))
c1=A.x(c3.i(0,"credit"))
return A.lb(c7,s,r,new A.cB(c4,d,c,b,c6,p,o,n,m,l,k,j,i,h,g,f,e,a,A.x(c3.i(0,"age")),a0,a1,a2,a3,a4,a5,a6,b7,b8,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b9,c1,c0,A.f(c3.i(0,"timeout")),A.f(c3.i(0,"restarts")),A.x(c3.i(0,"stagnation"))),c8,c5,c2,q)},
ag:function ag(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
em:function em(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
e3:function e3(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eo:function eo(a,b,c){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null
_.f=0
_.r=c},
bl(a,b,c,d,e,f){var s,r,q,p,o,n,m=a.a,l=c.v(m),k=A.h(l).h("J<1>"),j=A.a0(new A.J(l,k),0,A.Z(a.gad(),"count",t.S),k.h("k.E")).ab(0)
if(j.length===0)s=0
else{l=A.h(j)
s=new A.O(j,l.h("i(1)").a(new A.je()),l.h("O<1,i>")).ag(0,B.G)}l=c.r
k=A.h(l)
r=new A.c(l,k.h("e(1)").a(new A.jf(a)),k.h("c<1>")).E(0,0,new A.jg(),t.i)
k=a.b
l=c.gav().x.i(0,k)
l=B.c.u(l==null?0:l,0,100)
k=A.aA(k,c,d,null)
if(k.gY()){q=k.e.w
p=q.z+k.gb8()*q.Q}else p=0
o=e^m*7919
o^=o<<13
o^=o>>>17
if(f==null){m=b.z.K(a.e)
k=d.b.i(0,"marchSpeed")
k.toString
q=d.e
if(0>=q.length)return A.m(q,0)
n=m/(k*q[0])}else n=f
if(a.c===b.b)m=1
else{m=d.b.i(0,"foreignYield")
m.toString}k=d.w
return Math.max(1,160+a.z*m*2+r+p+l/100*k.ay-s*0.25-a.d*6)/Math.pow(1+n/k.ax,1.5)+((o^o<<5)&65535)/65536*0.000001},
je:function je(){},
jf:function jf(a){this.a=a},
jg:function jg(){},
a2:function a2(a,b,c){this.a=a
this.b=b
this.c=c},
ap:function ap(a,b,c,d){var _=this
_.a=a
_.d=b
_.f=c
_.r=d},
er:function er(){},
ii:function ii(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ij:function ij(a){this.a=a},
ik:function ik(){},
il:function il(a){this.a=a},
im:function im(a){this.a=a},
io:function io(a){this.a=a},
ip:function ip(a){this.a=a},
iq:function iq(){},
en:function en(a){var _=this
_.a=a
_.d=_.c=_.b=0
_.e=!1},
nk(){var s,r,q=new A.jb(),p=v.G,o="web-worker:"+A.H(p.self.constructor.name)
p=A.iV(p.self)
s=new A.jc(new A.eo(q,o,A.c1(t.S)))
if(typeof s=="function")A.cz(A.cC("Attempting to rewrap a JS function.",null))
r=function(a,b){return function(c){return a(b,c,arguments.length)}}(A.mm,s)
r[$.jK()]=s
p.onmessage=r
q.$1(B.i.ao(t.G.a(A.R(["kind","hello","protocol",1,"build","af74e625","backend",o],t.N,t.X)),null))},
jb:function jb(){},
jc:function jc(a){this.a=a},
kO(a){return v.mangledGlobalNames[a]},
np(a){throw A.U(new A.c_("Field '"+a+"' has been assigned during initialization."),new Error())},
V(){throw A.U(A.lx(""),new Error())},
mm(a,b,c){t.k.a(a)
if(A.f(c)>=1)return a.$1(b)
return a.$0()},
kJ(a,b,c){A.kB(c,t.H,"T","min")
return Math.min(c.a(a),c.a(b))},
kI(a,b,c){A.kB(c,t.H,"T","max")
return Math.max(c.a(a),c.a(b))},
nc(a,b,c,d,e,f,g,h){var s,r,q,p,o,n,m,l=null,k=f.K(a),j=!c
if(j&&k>d*b+80)return l
s=h.a
r=h.b
q=Math.sqrt(s*s+r*r)
p=q<0.01?0:((a.a-f.a)*s+(a.b-f.b)*r)/(Math.max(1,k)*q)
if(j&&k>72){if(p<0.45)return l
o=Math.max(0,k*p)
n=new A.K(f.a+s/q*o,f.b+r/q*o)
if(e.a3(n).K(n)>48)return l}m=g.$2(f,e.bU(f,a))
if(isFinite(m))j=!j||m<=b
else j=!1
return j?m:l},
jp(a,b,c){var s=Math.max(0,a-c)
return s*s*b}},B={}
var w=[A,J,B]
var $={}
A.jm.prototype={}
J.cP.prototype={
ac(a,b){return a===b},
gR(a){return A.d6(a)},
q(a){return"Instance of '"+A.d7(a)+"'"},
gS(a){return A.aO(A.jy(this))}}
J.cR.prototype={
q(a){return String(a)},
gR(a){return a?519018:218159},
gS(a){return A.aO(t.y)},
$iA:1,
$ie:1}
J.bV.prototype={
ac(a,b){return null==b},
q(a){return"null"},
gR(a){return 0},
$iA:1}
J.bX.prototype={$iL:1}
J.aT.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.d4.prototype={}
J.bx.prototype={}
J.aS.prototype={
q(a){var s=a[$.kQ()]
if(s==null)s=a[$.jK()]
if(s==null)return this.cm(a)
return"JavaScript function for "+J.bn(s)},
$iaG:1}
J.bW.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.bY.prototype={
gR(a){return 0},
q(a){return String(a)}}
J.t.prototype={
m(a,b){A.h(a).c.a(b)
a.$flags&1&&A.cA(a,29)
a.push(b)},
aj(a,b){var s
a.$flags&1&&A.cA(a,"remove",1)
for(s=0;s<a.length;++s)if(J.am(a[s],b)){a.splice(s,1)
return!0}return!1},
G(a,b){var s
A.h(a).h("a<1>").a(b)
a.$flags&1&&A.cA(a,"addAll",2)
if(Array.isArray(b)){this.cs(a,b)
return}for(s=J.E(b);s.j();)a.push(s.gp())},
cs(a,b){var s,r
t.gn.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.j(A.X(a))
for(r=0;r<s;++r)a.push(b[r])},
aE(a){a.$flags&1&&A.cA(a,"clear","clear")
a.length=0},
aG(a,b,c){var s=A.h(a)
return new A.O(a,s.F(c).h("1(2)").a(b),s.h("@<1>").F(c).h("O<1,2>"))},
dg(a,b){var s,r=A.hc(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.A(r,s,A.u(a[s]))
return r.join(b)},
b_(a,b){return A.a0(a,b,null,A.h(a).c)},
ag(a,b){var s,r,q
A.h(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.j(A.aB())
if(0>=s)return A.m(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.j(A.X(a))}return r},
E(a,b,c,d){var s,r,q
d.a(b)
A.h(a).F(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.j(A.X(a))}return r},
ap(a,b){var s,r,q
A.h(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.j(A.X(a))}throw A.j(A.aB())},
V(a,b){if(!(b>=0&&b<a.length))return A.m(a,b)
return a[b]},
gD(a){if(a.length>0)return a[0]
throw A.j(A.aB())},
gau(a){var s=a.length
if(s>0)return a[s-1]
throw A.j(A.aB())},
I(a,b){var s,r
A.h(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.j(A.X(a))}return!1},
aS(a,b){var s,r
A.h(a).h("e(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.j(A.X(a))}return!0},
B(a,b){var s,r,q,p,o,n=A.h(a)
n.h("b(1,1)?").a(b)
a.$flags&2&&A.cA(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dH()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.dr(b,2))
if(p>0)this.cK(a,p)},
cK(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
n(a,b){var s
for(s=0;s<a.length;++s)if(J.am(a[s],b))return!0
return!1},
ga0(a){return a.length===0},
gar(a){return a.length!==0},
q(a){return A.jl(a,"[","]")},
gC(a){return new J.b1(a,a.length,A.h(a).h("b1<1>"))},
gR(a){return A.d6(a)},
gl(a){return a.length},
A(a,b,c){A.h(a).c.a(c)
a.$flags&2&&A.cA(a)
if(!(b>=0&&b<a.length))throw A.j(A.kC(a,b))
a[b]=c},
dc(a,b){var s
A.h(a).h("e(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$io:1,
$ia:1,
$iq:1}
J.cQ.prototype={
dA(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.d7(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.h5.prototype={}
J.b1.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.v(q)
throw A.j(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iF:1}
J.bq.prototype={
t(a,b){var s
A.x(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaU(b)
if(this.gaU(a)===s)return 0
if(this.gaU(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaU(a){return a===0?1/a<0:a<0},
k(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.j(A.bc(""+a+".toInt()"))},
am(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.j(A.bc(""+a+".ceil()"))},
Z(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.j(A.bc(""+a+".floor()"))},
bq(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.j(A.bc(""+a+".round()"))},
u(a,b,c){if(B.c.t(b,c)>0)throw A.j(A.kx(b))
if(this.t(a,b)<0)return b
if(this.t(a,c)>0)return c
return a},
aX(a,b){var s
if(b>20)throw A.j(A.b9(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaU(a))return"-"+s
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
aM(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.bO(a,b)},
be(a,b){return(a|0)===a?a/b|0:this.bO(a,b)},
bO(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.j(A.bc("Result of truncating division is "+A.u(s)+": "+A.u(a)+" ~/ "+A.u(b)))},
bM(a,b){var s
if(a>0)s=this.cO(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cO(a,b){return b>31?0:a>>>b},
gS(a){return A.aO(t.H)},
$ii:1,
$ia1:1}
J.bU.prototype={
gS(a){return A.aO(t.S)},
$iA:1,
$ib:1}
J.cS.prototype={
gS(a){return A.aO(t.i)},
$iA:1}
J.b5.prototype={
aL(a,b,c){return a.substring(b,A.lG(b,c,a.length))},
bs(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.j(B.a_)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
di(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bs(c,s)+a},
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
gl(a){return a.length},
$iA:1,
$iG:1}
A.c_.prototype={
q(a){return"LateInitializationError: "+this.a}}
A.ie.prototype={}
A.o.prototype={}
A.k.prototype={
gC(a){var s=this
return new A.r(s,s.gl(s),A.l(s).h("r<k.E>"))},
ga0(a){return this.gl(this)===0},
I(a,b){var s,r,q=this
A.l(q).h("e(k.E)").a(b)
s=q.gl(q)
for(r=0;r<s;++r){if(b.$1(q.V(0,r)))return!0
if(s!==q.gl(q))throw A.j(A.X(q))}return!1},
aG(a,b,c){var s=A.l(this)
return new A.O(this,s.F(c).h("1(k.E)").a(b),s.h("@<k.E>").F(c).h("O<1,2>"))},
ag(a,b){var s,r,q,p=this
A.l(p).h("k.E(k.E,k.E)").a(b)
s=p.gl(p)
if(s===0)throw A.j(A.aB())
r=p.V(0,0)
for(q=1;q<s;++q){r=b.$2(r,p.V(0,q))
if(s!==p.gl(p))throw A.j(A.X(p))}return r},
E(a,b,c,d){var s,r,q,p=this
d.a(b)
A.l(p).F(d).h("1(1,k.E)").a(c)
s=p.gl(p)
for(r=b,q=0;q<s;++q){r=c.$2(r,p.V(0,q))
if(s!==p.gl(p))throw A.j(A.X(p))}return r},
dz(a){var s,r=this,q=A.ly(A.l(r).h("k.E"))
for(s=0;s<r.gl(r);++s)q.m(0,r.V(0,s))
return q}}
A.w.prototype={
U(a,b,c,d){var s,r=this.b
A.ca(r,"start")
s=this.c
if(s!=null){A.ca(s,"end")
if(r>s)throw A.j(A.b9(r,0,s,"start",null))}},
gcD(){var s=J.bm(this.a),r=this.c
if(r==null||r>s)return s
return r},
gcQ(){var s=J.bm(this.a),r=this.b
if(r>s)return s
return r},
gl(a){var s,r=J.bm(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
V(a,b){var s=this,r=s.gcQ()+b
if(b<0||r>=s.gcD())throw A.j(A.jk(b,s.gl(0),s,"index"))
return J.jh(s.a,r)},
ab(a){var s,r,q,p=this,o=p.b,n=p.a,m=J.cy(n),l=m.gl(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=J.jY(0,p.$ti.c)
return n}r=A.hc(s,m.V(n,o),!0,p.$ti.c)
for(q=1;q<s;++q){B.a.A(r,q,m.V(n,o+q))
if(m.gl(n)<l)throw A.j(A.X(p))}return r}}
A.r.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s,r=this,q=r.a,p=J.cy(q),o=p.gl(q)
if(r.b!==o)throw A.j(A.X(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.V(q,s);++r.c
return!0},
$iF:1}
A.b8.prototype={
gC(a){return new A.c2(J.E(this.a),this.b,A.l(this).h("c2<1,2>"))},
gl(a){return J.bm(this.a)}}
A.bO.prototype={$io:1}
A.c2.prototype={
j(){var s=this,r=s.b
if(r.j()){s.a=s.c.$1(r.gp())
return!0}s.a=null
return!1},
gp(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iF:1}
A.O.prototype={
gl(a){return J.bm(this.a)},
V(a,b){return this.b.$1(J.jh(this.a,b))}}
A.c.prototype={
gC(a){return new A.P(J.E(this.a),this.b,this.$ti.h("P<1>"))}}
A.P.prototype={
j(){var s,r
for(s=this.a,r=this.b;s.j();)if(r.$1(s.gp()))return!0
return!1},
gp(){return this.a.gp()},
$iF:1}
A.bS.prototype={
gC(a){return new A.bT(J.E(this.a),this.b,B.T,this.$ti.h("bT<1,2>"))}}
A.bT.prototype={
gp(){var s=this.d
return s==null?this.$ti.y[1].a(s):s},
j(){var s,r,q=this,p=q.c
if(p==null)return!1
for(s=q.a,r=q.b;!p.j();){q.d=null
if(s.j()){q.c=null
p=J.E(r.$1(s.gp()))
q.c=p}else return!1}q.d=q.c.gp()
return!0},
$iF:1}
A.ba.prototype={
gC(a){var s=this.a
return new A.bb(s.gC(s),this.b,A.l(this).h("bb<1>"))}}
A.bP.prototype={
gl(a){var s=this.a,r=s.gl(s)
s=this.b
if(r>s)return s
return r},
$io:1}
A.bb.prototype={
j(){if(--this.b>=0)return this.a.j()
this.b=-1
return!1},
gp(){if(this.b<0){this.$ti.c.a(null)
return null}return this.a.gp()},
$iF:1}
A.bQ.prototype={
j(){return!1},
gp(){throw A.j(A.aB())},
$iF:1}
A.by.prototype={
gC(a){return new A.cg(J.E(this.a),this.$ti.h("cg<1>"))}}
A.cg.prototype={
j(){var s,r
for(s=this.a,r=this.$ti.c;s.j();)if(r.b(s.gp()))return!0
return!1},
gp(){return this.$ti.c.a(this.a.gp())},
$iF:1}
A.I.prototype={
sl(a,b){throw A.j(A.bc("Cannot change the length of a fixed-length list"))},
m(a,b){A.ax(a).h("I.E").a(b)
throw A.j(A.bc("Cannot add to a fixed-length list"))}}
A.J.prototype={
gl(a){return this.a.length},
V(a,b){var s=this.a
return J.jh(s,s.length-1-b)}}
A.aW.prototype={$r:"+(1,2,3)",$s:1}
A.aM.prototype={$r:"+breakthrough,lower,teamSize,upper(1,2,3,4)",$s:2}
A.bA.prototype={$r:"+high,low,selfHigh,selfLow(1,2,3,4)",$s:3}
A.bL.prototype={}
A.bK.prototype={
ga0(a){return this.gl(this)===0},
gar(a){return this.gl(this)!==0},
q(a){return A.he(this)},
gai(){return new A.au(this.d9(),A.l(this).h("au<ab<1,2>>"))},
d9(){var s=this
return function(){var r=0,q=1,p=[],o,n,m,l,k
return function $async$gai(a,b,c){if(b===1){p.push(c)
r=q}for(;;)switch(r){case 0:o=s.ga9(),o=o.gC(o),n=A.l(s),m=n.y[1],n=n.h("ab<1,2>")
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
A.bM.prototype={
gl(a){return this.b.length},
gbF(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
a2(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
i(a,b){if(!this.a2(b))return null
return this.b[this.a[b]]},
a8(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gbF()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
ga9(){return new A.bf(this.gbF(),this.$ti.h("bf<1>"))},
gaq(){return new A.bf(this.b,this.$ti.h("bf<2>"))}}
A.bf.prototype={
gl(a){return this.a.length},
gC(a){var s=this.a
return new A.ch(s,s.length,this.$ti.h("ch<1>"))}}
A.ch.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iF:1}
A.cO.prototype={
ac(a,b){if(b==null)return!1
return b instanceof A.b3&&this.a.ac(0,b.a)&&A.jG(this)===A.jG(b)},
gR(a){return A.jq(this.a,A.jG(this),B.o,B.o)},
q(a){var s=B.a.dg([A.aO(this.$ti.c)],", ")
return this.a.q(0)+" with "+("<"+s+">")}}
A.b3.prototype={
$2(a,b){return this.a.$1$2(a,b,this.$ti.y[0])},
$S(){return A.nh(A.j3(this.a),this.$ti)}}
A.hH.prototype={
$0(){return B.b.Z(1000*this.a.now())},
$S:5}
A.cb.prototype={}
A.ir.prototype={
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
A.c7.prototype={
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
A.hg.prototype={
q(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.bR.prototype={}
A.cn.prototype={
q(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iaU:1}
A.a6.prototype={
q(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.kP(r==null?"unknown":r)+"'"},
$iaG:1,
gdF(){return this},
$C:"$1",
$R:1,
$D:null}
A.cF.prototype={$C:"$0",$R:0}
A.cG.prototype={$C:"$2",$R:2}
A.da.prototype={}
A.d9.prototype={
q(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.kP(s)+"'"}}
A.bp.prototype={
ac(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bp))return!1
return this.$_target===b.$_target&&this.a===b.a},
gR(a){return(A.kK(this.a)^A.d6(this.$_target))>>>0},
q(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.d7(this.a)+"'")}}
A.d8.prototype={
q(a){return"RuntimeError: "+this.a}}
A.aH.prototype={
gl(a){return this.a},
ga0(a){return this.a===0},
ga9(){return new A.a8(this,A.l(this).h("a8<1>"))},
gai(){return new A.b6(this,A.l(this).h("b6<1,2>"))},
a2(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.dd(a)},
dd(a){var s=this.d
if(s==null)return!1
return this.bm(this.bD(s,a),a)>=0},
G(a,b){A.l(this).h("aa<1,2>").a(b).a8(0,new A.h6(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.de(b)},
de(a){var s,r,q=this.d
if(q==null)return null
s=this.bD(q,a)
r=this.bm(s,a)
if(r<0)return null
return s[r].b},
A(a,b,c){var s,r,q=this,p=A.l(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bx(s==null?q.b=q.bc():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bx(r==null?q.c=q.bc():r,b,c)}else q.df(b,c)},
df(a,b){var s,r,q,p,o=this,n=A.l(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.bc()
r=o.c5(a)
q=s[r]
if(q==null)s[r]=[o.bd(a,b)]
else{p=o.bm(q,a)
if(p>=0)q[p].b=b
else q.push(o.bd(a,b))}},
dk(a,b){var s,r,q=this,p=A.l(q)
p.c.a(a)
p.h("2()").a(b)
if(q.a2(a)){s=q.i(0,a)
return s==null?p.y[1].a(s):s}r=b.$0()
q.A(0,a,r)
return r},
aj(a,b){var s=this.cp(this.b,b)
return s},
aE(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.bb()}},
a8(a,b){var s,r,q=this
A.l(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.j(A.X(q))
s=s.c}},
bx(a,b,c){var s,r=A.l(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.bd(b,c)
else s.b=c},
cp(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.cq(s)
delete a[b]
return s.b},
bb(){this.r=this.r+1&1073741823},
bd(a,b){var s=this,r=A.l(s),q=new A.ha(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.bb()
return q},
cq(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.bb()},
c5(a){return J.af(a)&1073741823},
bD(a,b){return a[this.c5(b)]},
bm(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.am(a[r].a,b))return r
return-1},
q(a){return A.he(this)},
bc(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ik_:1}
A.h6.prototype={
$2(a,b){var s=this.a,r=A.l(s)
s.A(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.l(this.a).h("~(1,2)")}}
A.ha.prototype={}
A.a8.prototype={
gl(a){return this.a.a},
ga0(a){return this.a.a===0},
gC(a){var s=this.a
return new A.b7(s,s.r,s.e,this.$ti.h("b7<1>"))},
n(a,b){return this.a.a2(b)}}
A.b7.prototype={
gp(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.X(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iF:1}
A.a9.prototype={
gl(a){return this.a.a},
gC(a){var s=this.a
return new A.ai(s,s.r,s.e,this.$ti.h("ai<1>"))}}
A.ai.prototype={
gp(){return this.d},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.X(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iF:1}
A.b6.prototype={
gl(a){return this.a.a},
gC(a){var s=this.a
return new A.c0(s,s.r,s.e,this.$ti.h("c0<1,2>"))}}
A.c0.prototype={
gp(){var s=this.d
s.toString
return s},
j(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.j(A.X(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.ab(s.a,s.b,r.$ti.h("ab<1,2>"))
r.c=s.c
return!0}},
$iF:1}
A.j7.prototype={
$1(a){return this.a(a)},
$S:25}
A.j8.prototype={
$2(a,b){return this.a(a,b)},
$S:56}
A.j9.prototype={
$1(a){return this.a(A.H(a))},
$S:37}
A.aC.prototype={
q(a){return this.bQ(!1)},
bQ(a){var s,r,q,p,o,n=this.cE(),m=this.ba(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.m(m,q)
o=m[q]
l=a?l+A.k3(o):l+A.u(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
cE(){var s,r=this.$s
while($.iO.length<=r)B.a.m($.iO,null)
s=$.iO[r]
if(s==null){s=this.cA()
B.a.A($.iO,r,s)}return s},
cA(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=A.d(new Array(l),t.Q)
for(s=0;s<l;++s)k[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.a.A(k,q,r[s])}}return A.aI(k,t.K)}}
A.bz.prototype={
ba(){return[this.a,this.b,this.c]},
ac(a,b){var s=this
if(b==null)return!1
return b instanceof A.bz&&s.$s===b.$s&&J.am(s.a,b.a)&&J.am(s.b,b.b)&&J.am(s.c,b.c)},
gR(a){var s=this
return A.jq(s.$s,s.a,s.b,s.c)}}
A.bi.prototype={
ba(){return this.a},
ac(a,b){if(b==null)return!1
return b instanceof A.bi&&this.$s===b.$s&&A.m2(this.a,b.a)},
gR(a){return A.jq(this.$s,A.lB(this.a),B.o,B.o)}}
A.bt.prototype={
gS(a){return B.ag},
$iA:1}
A.c5.prototype={}
A.cV.prototype={
gS(a){return B.ah},
$iA:1}
A.bu.prototype={
gl(a){return a.length},
$iah:1}
A.c3.prototype={$io:1,$ia:1,$iq:1}
A.c4.prototype={$io:1,$ia:1,$iq:1}
A.cW.prototype={
gS(a){return B.ai},
$iA:1}
A.cX.prototype={
gS(a){return B.aj},
$iA:1}
A.cY.prototype={
gS(a){return B.ak},
$iA:1}
A.cZ.prototype={
gS(a){return B.al},
$iA:1}
A.d_.prototype={
gS(a){return B.am},
$iA:1}
A.d0.prototype={
gS(a){return B.ao},
$iA:1}
A.d1.prototype={
gS(a){return B.ap},
$iA:1}
A.c6.prototype={
gS(a){return B.aq},
gl(a){return a.length},
$iA:1}
A.d2.prototype={
gS(a){return B.ar},
gl(a){return a.length},
$iA:1,
$iju:1}
A.ci.prototype={}
A.cj.prototype={}
A.ck.prototype={}
A.cl.prototype={}
A.ar.prototype={
h(a){return A.cr(v.typeUniverse,this,a)},
F(a){return A.kk(v.typeUniverse,this,a)}}
A.dh.prototype={}
A.iS.prototype={
q(a){return A.ad(this.a,null)}}
A.dg.prototype={
q(a){return this.a}}
A.bB.prototype={$iaK:1}
A.iu.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:24}
A.it.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:42}
A.iv.prototype={
$0(){this.a.$0()},
$S:26}
A.iw.prototype={
$0(){this.a.$0()},
$S:26}
A.iQ.prototype={
co(a,b){if(self.setTimeout!=null)self.setTimeout(A.dr(new A.iR(this,b),0),a)
else throw A.j(A.bc("`setTimeout()` not found."))}}
A.iR.prototype={
$0(){this.b.$0()},
$S:3}
A.dd.prototype={}
A.iW.prototype={
$1(a){return this.a.$2(0,a)},
$S:48}
A.iX.prototype={
$2(a,b){this.a.$2(1,new A.bR(a,t.l.a(b)))},
$S:34}
A.j_.prototype={
$2(a,b){this.a(A.f(a),b)},
$S:63}
A.aN.prototype={
gp(){var s=this.b
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
if(s!=null)try{if(s.j()){o.b=s.gp()
return!0}else o.d=null}catch(r){n=r
m=1
o.d=null}q=o.cL(m,n)
if(1===q)return!0
if(0===q){o.b=null
p=o.e
if(p==null||p.length===0){o.a=A.ke
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
o.a=A.ke
throw n
return!1}if(0>=p.length)return A.m(p,-1)
o.a=p.pop()
m=1
continue}throw A.j(A.k5("sync*"))}return!1},
bT(a){var s,r,q=this
if(a instanceof A.au){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.a.m(r,q.a)
q.a=s
return 2}else{q.d=J.E(a)
return 2}},
$iF:1}
A.au.prototype={
gC(a){return new A.aN(this.a(),this.$ti.h("aN<1>"))}}
A.ao.prototype={
q(a){return A.u(this.a)},
$iC:1,
gaK(){return this.b}}
A.h4.prototype={
$0(){this.c.a(null)
this.b.cw(null)},
$S:3}
A.bd.prototype={
dh(a){if((this.c&15)!==6)return!0
return this.b.b.br(t.al.a(this.d),a.a,t.y,t.K)},
da(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.C.b(q))p=l.du(q,m,a.b,o,n,t.l)
else p=l.br(t.B.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.aQ(s))){if((r.c&1)!==0)throw A.j(A.cC("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.j(A.cC("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.W.prototype={
cb(a,b,c){var s,r,q=this.$ti
q.F(c).h("1/(2)").a(a)
s=$.N
if(s===B.j){if(!t.C.b(b)&&!t.B.b(b))throw A.j(A.ep(b,"onError",u.c))}else{c.h("@<0/>").F(q.c).h("1(2)").a(a)
b=A.mO(b,s)}r=new A.W(s,c.h("W<0>"))
this.b0(new A.bd(r,3,a,b,q.h("@<1>").F(c).h("bd<1,2>")))
return r},
bP(a,b,c){var s,r=this.$ti
r.F(c).h("1/(2)").a(a)
s=new A.W($.N,c.h("W<0>"))
this.b0(new A.bd(s,19,a,b,r.h("@<1>").F(c).h("bd<1,2>")))
return s},
cN(a){this.a=this.a&1|16
this.c=a},
aN(a){this.a=a.a&30|this.a&1
this.c=a.c},
b0(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.b0(a)
return}r.aN(s)}A.dq(null,null,r.b,t.M.a(new A.iy(r,a)))}},
bJ(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.bJ(a)
return}m.aN(n)}l.a=m.aP(a)
A.dq(null,null,m.b,t.M.a(new A.iD(l,m)))}},
az(){var s=t.F.a(this.c)
this.c=null
return this.aP(s)},
aP(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
cw(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("aR<1>").b(a))A.iB(a,r,!0)
else{s=r.az()
q.c.a(a)
r.a=8
r.c=a
A.be(r,s)}},
bC(a){var s,r=this
r.$ti.c.a(a)
s=r.az()
r.a=8
r.c=a
A.be(r,s)},
cz(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.az()
q.aN(a)
A.be(q,r)},
b4(a){var s=this.az()
this.cN(a)
A.be(this,s)},
cu(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("aR<1>").b(a)){this.bA(a)
return}this.cv(a)},
cv(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dq(null,null,s.b,t.M.a(new A.iA(s,a)))},
bA(a){A.iB(this.$ti.h("aR<1>").a(a),this,!1)
return},
bz(a){this.a^=2
A.dq(null,null,this.b,t.M.a(new A.iz(this,a)))},
$iaR:1}
A.iy.prototype={
$0(){A.be(this.a,this.b)},
$S:3}
A.iD.prototype={
$0(){A.be(this.b,this.a.a)},
$S:3}
A.iC.prototype={
$0(){A.iB(this.a.a,this.b,!0)},
$S:3}
A.iA.prototype={
$0(){this.a.bC(this.b)},
$S:3}
A.iz.prototype={
$0(){this.a.b4(this.b)},
$S:3}
A.iG.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dt(t.fO.a(q.d),t.z)}catch(p){s=A.aQ(p)
r=A.bH(p)
if(k.c&&t.u.a(k.b.a.c).a===s){q=k.a
q.c=t.u.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.jj(q)
n=k.a
n.c=new A.ao(q,o)
q=n}q.b=!0
return}if(j instanceof A.W&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.u.a(j.c)
q.b=!0}return}if(j instanceof A.W){m=k.b.a
l=new A.W(m.b,m.$ti)
j.cb(new A.iH(l,m),new A.iI(l),t.x)
q=k.a
q.c=l
q.b=!1}},
$S:3}
A.iH.prototype={
$1(a){this.a.cz(this.b)},
$S:24}
A.iI.prototype={
$2(a,b){A.cu(a)
t.l.a(b)
this.a.b4(new A.ao(a,b))},
$S:50}
A.iF.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.br(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.aQ(l)
r=A.bH(l)
q=s
p=r
if(p==null)p=A.jj(q)
o=this.a
o.c=new A.ao(q,p)
o.b=!0}},
$S:3}
A.iE.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.u.a(l.a.a.c)
p=l.b
if(p.a.dh(s)&&p.a.e!=null){p.c=p.a.da(s)
p.b=!1}}catch(o){r=A.aQ(o)
q=A.bH(o)
p=t.u.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.jj(p)
m=l.b
m.c=new A.ao(p,n)
p=m}p.b=!0}},
$S:3}
A.de.prototype={}
A.dm.prototype={}
A.ct.prototype={$ik9:1}
A.dl.prototype={
dv(a){var s,r,q
t.M.a(a)
try{if(B.j===$.N){a.$0()
return}A.kt(null,null,this,a,t.x)}catch(q){s=A.aQ(q)
r=A.bH(q)
A.jB(A.cu(s),t.l.a(r))}},
bY(a){return new A.iP(this,t.M.a(a))},
dt(a,b){b.h("0()").a(a)
if($.N===B.j)return a.$0()
return A.kt(null,null,this,a,b)},
br(a,b,c,d){c.h("@<0>").F(d).h("1(2)").a(a)
d.a(b)
if($.N===B.j)return a.$1(b)
return A.mQ(null,null,this,a,b,c,d)},
du(a,b,c,d,e,f){d.h("@<0>").F(e).F(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.N===B.j)return a.$2(b,c)
return A.mP(null,null,this,a,b,c,d,e,f)},
c9(a,b,c,d){return b.h("@<0>").F(c).F(d).h("1(2,3)").a(a)}}
A.iP.prototype={
$0(){return this.a.dv(this.b)},
$S:3}
A.iZ.prototype={
$0(){A.ln(this.a,this.b)},
$S:3}
A.as.prototype={
cF(){return new A.as(A.l(this).h("as<1>"))},
gC(a){var s=this,r=new A.bg(s,s.r,A.l(s).h("bg<1>"))
r.c=s.e
return r},
gl(a){return this.a},
n(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.cB(b)},
cB(a){var s=this.d
if(s==null)return!1
return this.b9(s[this.b5(a)],a)>=0},
m(a,b){var s,r,q=this
A.l(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bB(s==null?q.b=A.jv():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bB(r==null?q.c=A.jv():r,b)}else return q.cr(b)},
cr(a){var s,r,q,p=this
A.l(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.jv()
r=p.b5(a)
q=s[r]
if(q==null)s[r]=[p.b3(a)]
else{if(p.b9(q,a)>=0)return!1
q.push(p.b3(a))}return!0},
aj(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bL(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bL(s.c,b)
else return s.cJ(b)},
cJ(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.b5(a)
r=n[s]
q=o.b9(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bR(p)
return!0},
bB(a,b){A.l(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.b3(b)
return!0},
bL(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bR(s)
delete a[b]
return!0},
b2(){this.r=this.r+1&1073741823},
b3(a){var s,r=this,q=new A.dk(A.l(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.b2()
return q},
bR(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.b2()},
b5(a){return J.af(a)&1073741823},
b9(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.am(a[r].a,b))return r
return-1},
$ik1:1}
A.dk.prototype={}
A.bg.prototype={
gp(){var s=this.d
return s==null?this.$ti.c.a(s):s},
j(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.j(A.X(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iF:1}
A.hb.prototype={
$2(a,b){this.a.A(0,this.b.a(a),this.c.a(b))},
$S:44}
A.B.prototype={
gC(a){return new A.r(a,a.length,A.ax(a).h("r<B.E>"))},
V(a,b){if(!(b>=0&&b<a.length))return A.m(a,b)
return a[b]},
ga0(a){return a.length===0},
gar(a){return a.length!==0},
gD(a){var s=a.length
if(s===0)throw A.j(A.aB())
if(0>=s)return A.m(a,0)
return a[0]},
gau(a){var s,r=a.length
if(r===0)throw A.j(A.aB())
s=r-1
if(!(s>=0))return A.m(a,s)
return a[s]},
aG(a,b,c){var s=A.ax(a)
return new A.O(a,s.F(c).h("1(B.E)").a(b),s.h("@<B.E>").F(c).h("O<1,2>"))},
E(a,b,c,d){var s,r,q,p
d.a(b)
A.ax(a).F(d).h("1(1,B.E)").a(c)
s=a.length
for(r=s,q=b,p=0;p<s;++p){if(!(p<r))return A.m(a,p)
q=c.$2(q,a[p])
r=a.length
if(s!==r)throw A.j(A.X(a))}return q},
b_(a,b){return A.a0(a,b,null,A.ax(a).h("B.E"))},
m(a,b){var s
A.ax(a).h("B.E").a(b)
s=a.length
this.sl(a,s+1)
if(!(s<a.length))return A.m(a,s)
a[s]=b},
q(a){return A.jl(a,"[","]")}}
A.D.prototype={
a8(a,b){var s,r,q,p=A.l(this)
p.h("~(D.K,D.V)").a(b)
for(s=this.ga9(),s=s.gC(s),p=p.h("D.V");s.j();){r=s.gp()
q=this.i(0,r)
b.$2(r,q==null?p.a(q):q)}},
aI(a,b,c){var s,r=this,q=A.l(r)
q.h("D.K").a(a)
q.h("D.V(D.V)").a(b)
q.h("D.V()?").a(c)
if(r.a2(a)){s=r.i(0,a)
q=b.$1(s==null?q.h("D.V").a(s):s)
r.A(0,a,q)
return q}q=c.$0()
r.A(0,a,q)
return q},
gai(){return this.ga9().aG(0,new A.hd(this),A.l(this).h("ab<D.K,D.V>"))},
a2(a){return this.ga9().n(0,a)},
gl(a){var s=this.ga9()
return s.gl(s)},
ga0(a){var s=this.ga9()
return s.ga0(s)},
q(a){return A.he(this)},
$iaa:1}
A.hd.prototype={
$1(a){var s=this.a,r=A.l(s)
r.h("D.K").a(a)
s=s.i(0,a)
if(s==null)s=r.h("D.V").a(s)
return new A.ab(a,s,r.h("ab<D.K,D.V>"))},
$S(){return A.l(this.a).h("ab<D.K,D.V>(D.K)")}}
A.hf.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.u(a)
r.a=(r.a+=s)+": "
s=A.u(b)
r.a+=s},
$S:22}
A.cs.prototype={}
A.bs.prototype={
i(a,b){return this.a.i(0,b)},
a8(a,b){this.a.a8(0,this.$ti.h("~(1,2)").a(b))},
ga0(a){return this.a.a===0},
gar(a){return this.a.a!==0},
gl(a){return this.a.a},
q(a){return A.he(this.a)},
gaq(){var s=this.a
return new A.a9(s,A.l(s).h("a9<2>"))},
gai(){var s=this.a
return new A.b6(s,A.l(s).h("b6<1,2>"))},
$iaa:1}
A.ce.prototype={}
A.bv.prototype={
G(a,b){var s
A.l(this).h("a<1>").a(b)
for(s=b.gC(b);s.j();)this.m(0,s.gp())},
q(a){return A.jl(this,"{","}")},
E(a,b,c,d){var s,r,q,p
d.a(b)
s=A.l(this)
s.F(d).h("1(1,2)").a(c)
for(s=A.iN(this,this.r,s.c),r=s.$ti.c,q=b;s.j();){p=s.d
q=c.$2(q,p==null?r.a(p):p)}return q},
I(a,b){var s,r,q=A.l(this)
q.h("e(1)").a(b)
for(q=A.iN(this,this.r,q.c),s=q.$ti.c;q.j();){r=q.d
if(b.$1(r==null?s.a(r):r))return!0}return!1},
$io:1,
$ia:1,
$ijs:1}
A.cm.prototype={
d7(a){var s,r,q,p=this,o=p.cF()
for(s=A.iN(p,p.r,A.l(p).c),r=s.$ti.c;s.j();){q=s.d
if(q==null)q=r.a(q)
if(!a.n(0,q))o.m(0,q)}return o}}
A.bC.prototype={}
A.di.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cG(b):s}},
gl(a){return this.b==null?this.c.a:this.aw().length},
ga0(a){return this.gl(0)===0},
ga9(){if(this.b==null){var s=this.c
return new A.a8(s,A.l(s).h("a8<1>"))}return new A.dj(this)},
A(a,b,c){var s,r,q=this
A.H(b)
if(q.b==null)q.c.A(0,b,c)
else if(q.a2(b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.cS().A(0,b,c)},
a2(a){if(this.b==null)return this.c.a2(a)
return!1},
a8(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.a8(0,b)
s=o.aw()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.iY(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.j(A.X(o))}},
aw(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.d(Object.keys(this.a),t.s)
return s},
cS(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.Y(t.N,t.z)
r=n.aw()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.A(0,o,n.i(0,o))}if(p===0)B.a.m(r,"")
else B.a.aE(r)
n.a=n.b=null
return n.c=s},
cG(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.iY(this.a[a])
return this.b[a]=s}}
A.dj.prototype={
gl(a){return this.a.gl(0)},
V(a,b){var s=this.a
if(s.b==null)s=s.ga9().V(0,b)
else{s=s.aw()
if(!(b>=0&&b<s.length))return A.m(s,b)
s=s[b]}return s},
gC(a){var s=this.a
if(s.b==null){s=s.ga9()
s=s.gC(s)}else{s=s.aw()
s=new J.b1(s,s.length,A.h(s).h("b1<1>"))}return s},
n(a,b){return this.a.a2(b)}}
A.cH.prototype={}
A.cJ.prototype={}
A.bZ.prototype={
q(a){var s=A.cM(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.cU.prototype={
q(a){return"Cyclic error in JSON stringify"}}
A.h7.prototype={
d3(a,b){var s=A.mM(a,this.gd4().a)
return s},
ao(a,b){var s=A.lU(a,this.gd8().b,null)
return s},
gd8(){return B.ad},
gd4(){return B.ac}}
A.h9.prototype={}
A.h8.prototype={}
A.iL.prototype={
cd(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.p.aL(a,r,q)
r=q+1
o=A.a_(92)
s.a+=o
o=A.a_(117)
s.a+=o
o=A.a_(100)
s.a+=o
o=p>>>8&15
o=A.a_(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.a_(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.a_(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.p.aL(a,r,q)
r=q+1
o=A.a_(92)
s.a+=o
switch(p){case 8:o=A.a_(98)
s.a+=o
break
case 9:o=A.a_(116)
s.a+=o
break
case 10:o=A.a_(110)
s.a+=o
break
case 12:o=A.a_(102)
s.a+=o
break
case 13:o=A.a_(114)
s.a+=o
break
default:o=A.a_(117)
s.a+=o
o=A.a_(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.a_(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.a_(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.p.aL(a,r,q)
r=q+1
o=A.a_(92)
s.a+=o
o=A.a_(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.p.aL(a,r,m)},
b1(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.j(new A.cU(a,null))}B.a.m(s,a)},
aY(a){var s,r,q,p,o=this
if(o.cc(a))return
o.b1(a)
try{s=o.b.$1(a)
if(!o.cc(s)){q=A.jZ(a,null,o.gbG())
throw A.j(q)}q=o.a
if(0>=q.length)return A.m(q,-1)
q.pop()}catch(p){r=A.aQ(p)
q=A.jZ(a,r,o.gbG())
throw A.j(q)}},
cc(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.b.q(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.cd(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.b1(a)
q.dC(a)
s=q.a
if(0>=s.length)return A.m(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.b1(a)
r=q.dD(a)
s=q.a
if(0>=s.length)return A.m(s,-1)
s.pop()
return r}else return!1},
dC(a){var s,r=this.c
r.a+="["
if(J.l4(a)){if(0>=a.length)return A.m(a,0)
this.aY(a[0])
for(s=1;s<a.length;++s){r.a+=","
this.aY(a[s])}}r.a+="]"},
dD(a){var s,r,q,p,o,n,m=this,l={}
if(a.ga0(a)){m.c.a+="{}"
return!0}s=a.gl(a)*2
r=A.hc(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.a8(0,new A.iM(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.cd(A.H(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.m(r,n)
m.aY(r[n])}p.a+="}"
return!0}}
A.iM.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.A(s,r.a++,a)
B.a.A(s,r.a++,b)},
$S:22}
A.iK.prototype={
gbG(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.cK.prototype={
ac(a,b){if(b==null)return!1
return b instanceof A.cK},
gR(a){return B.c.gR(0)},
q(a){return"0:00:00."+B.p.di(B.c.q(0),6,"0")}}
A.df.prototype={
q(a){return this.aO()},
$icL:1}
A.C.prototype={
gaK(){return A.lD(this)}}
A.cD.prototype={
q(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cM(s)
return"Assertion failed"}}
A.aK.prototype={}
A.az.prototype={
gb7(){return"Invalid argument"+(!this.a?"(s)":"")},
gb6(){return""},
q(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gb7()+q+o
if(!s.a)return n
return n+s.gb6()+": "+A.cM(s.gbn())},
gbn(){return this.b}}
A.c9.prototype={
gbn(){return A.S(this.b)},
gb7(){return"RangeError"},
gb6(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.u(q):""
else if(q==null)s=": Not greater than or equal to "+A.u(r)
else if(q>r)s=": Not in inclusive range "+A.u(r)+".."+A.u(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.u(r)
return s}}
A.cN.prototype={
gbn(){return A.f(this.b)},
gb7(){return"RangeError"},
gb6(){if(A.f(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gl(a){return this.f}}
A.cf.prototype={
q(a){return"Unsupported operation: "+this.a}}
A.db.prototype={
q(a){return"UnimplementedError: "+this.a}}
A.cd.prototype={
q(a){return"Bad state: "+this.a}}
A.cI.prototype={
q(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.cM(s)+"."}}
A.d3.prototype={
q(a){return"Out of Memory"},
gaK(){return null},
$iC:1}
A.cc.prototype={
q(a){return"Stack Overflow"},
gaK(){return null},
$iC:1}
A.ix.prototype={
q(a){return"Exception: "+this.a}}
A.aF.prototype={
q(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException"
return r}}
A.a.prototype={
aG(a,b,c){var s=A.l(this)
return A.lA(this,s.F(c).h("1(a.E)").a(b),s.h("a.E"),c)},
dB(a,b){var s=A.l(this)
return new A.c(this,s.h("e(a.E)").a(b),s.h("c<a.E>"))},
E(a,b,c,d){var s,r
d.a(b)
A.l(this).F(d).h("1(1,a.E)").a(c)
for(s=this.gC(this),r=b;s.j();)r=c.$2(r,s.gp())
return r},
aS(a,b){var s
A.l(this).h("e(a.E)").a(b)
for(s=this.gC(this);s.j();)if(!b.$1(s.gp()))return!1
return!0},
I(a,b){var s
A.l(this).h("e(a.E)").a(b)
for(s=this.gC(this);s.j();)if(b.$1(s.gp()))return!0
return!1},
gl(a){var s,r=this.gC(this)
for(s=0;r.j();)++s
return s},
gD(a){var s=this.gC(this)
if(!s.j())throw A.j(A.aB())
return s.gp()},
gau(a){var s,r=this.gC(this)
if(!r.j())throw A.j(A.aB())
do s=r.gp()
while(r.j())
return s},
V(a,b){var s,r
A.ca(b,"index")
s=this.gC(this)
for(r=b;s.j();){if(r===0)return s.gp();--r}throw A.j(A.jk(b,b-r,this,"index"))},
q(a){return A.lu(this,"(",")")}}
A.ab.prototype={
q(a){return"MapEntry("+A.u(this.a)+": "+A.u(this.b)+")"}}
A.ac.prototype={
gR(a){return A.z.prototype.gR.call(this,0)},
q(a){return"null"}}
A.z.prototype={$iz:1,
ac(a,b){return this===b},
gR(a){return A.d6(this)},
q(a){return"Instance of '"+A.d7(this)+"'"},
gS(a){return A.na(this)},
toString(){return this.q(this)}}
A.dn.prototype={
q(a){return""},
$iaU:1}
A.ig.prototype={
gc2(){var s,r=this.b
if(r==null)r=$.hJ.$0()
s=r-this.a
if($.jL()===1e6)return s
return s*1000},
bu(){var s=this,r=s.b
if(r!=null){s.a=s.a+($.hJ.$0()-r)
s.b=null}}}
A.bw.prototype={
gl(a){return this.a.length},
q(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ilJ:1}
A.aV.prototype={}
A.eq.prototype={}
A.aE.prototype={
gbV(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=t.S,f=A.Y(g,g)
for(g=h.y,g=new A.ai(g,g.r,g.e,A.l(g).h("ai<2>")),s=h.a,r=h.z,q=h.Q,p=s.b,o=s.a;g.j();){n=g.d
m=s.a_(n.a)
l=!0
if(n.as){k=n.d
if(k!=null)if(m!=null)if(!m.fy)if(!(m.f<=0)){j=m.a
if(!r.n(0,j)){i=m.as
if(!((i===B.f||i===B.e)&&!q.n(0,j)))if(n.y>=p){l=s.J(k)
l=(l==null?null:l.b)!==o}}}}if(l)continue
n=n.d
n.toString
f.aI(n,new A.dw(),new A.dx())}return f},
M(){var s,r=this,q=r.y,p=A.l(q).h("a9<2>")
q=A.n(new A.a9(q,p),p.h("a.E"))
s=A.jQ(r.a,r.b,r.c,q)
s.d=r.d
s.e=r.e
s.f=r.f
s.r=r.r
q=s.w
q.aE(0)
q.G(0,r.w)
q=s.x
q.aE(0)
q.G(0,r.x)
s.z.G(0,r.z)
s.Q.G(0,r.Q)
s.as.G(0,r.as)
s.at.G(0,r.at)
s.ax.G(0,r.ax)
B.a.G(s.ay,r.ay)
return s},
v(a){var s=this.a.v(a),r=A.h(s),q=r.h("c<1>")
s=A.n(new A.c(s,r.h("e(1)").a(new A.dY(this)),q),q.h("a.E"))
return s},
O(a){var s
if(a.at==null){s=this.x.i(0,a.a)
if(s==null)s=a.d}else s=a.gad()
return s},
L(a){var s,r=this.v(a).length,q=this.gbV().i(0,a)
if(q==null)q=0
s=this.at.n(0,a)?1:0
return r+q+s},
bW(a){var s,r=this,q=r.a.r,p=A.h(q)
p=new A.c(q,p.h("e(1)").a(new A.dy(r,a)),p.h("c<1>")).gl(0)
q=r.gbV().i(0,a)
if(q==null)q=0
s=r.at.n(0,a)?1:0
return p+q+s},
al(a){var s,r,q,p,o,n,m=this,l=m.a,k=a.c,j=l.J(k)
if(j==null)return!1
k=l.v(k)
s=A.h(k)
r=s.h("c<1>")
q=A.n(new A.c(k,s.h("e(1)").a(new A.dB(m)),r),r.h("a.E"))
if(q.length<=1)return!1
k=A.h(q)
s=k.h("e(1)")
k=k.h("c<1>")
p=A.b4(new A.c(q,s.a(new A.dC()),k),t.r)
if(p!=null)return a.a!==p.a
r=new A.dJ(m,j)
B.a.B(q,new A.dD(r))
o=A.n(new A.c(q,s.a(A.n2()),k),k.h("a.E"))
B.a.B(o,new A.dE())
if(o.length!==0)return a.a!==B.a.gD(o).a
n=!1
if(l.c>=3)if(j.at==null)if(!B.a.I(l.r,new A.dF(m,j))){l=l.f
n=A.h(l)
n=new A.c(l,n.h("e(1)").a(new A.dG(m)),n.h("c<1>")).aS(0,new A.dH(m,j))
l=n}else l=n
else l=n
else l=n
if(l)return a.a!==B.a.gau(q).a
l=r.$1(B.a.gD(q))
if(typeof l!=="number")return l.bs()
return a.a!==new A.c(q,s.a(new A.dI(r,l*0.6)),k).gau(0).a},
ae(d2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4=this,c5="monthSeconds",c6="supplySafety",c7="supplySeconds",c8="battleBudget",c9=c4.b,d0=c9.b,d1=d0.i(0,c5)
d1.toString
s=d0.i(0,c6)
s.toString
r=d1+s
d1=c4.ay
s=A.n(d1,t.gf)
for(q=c4.a,p=q.r,o=A.h(p),n=o.h("e(1)"),m=n.a(new A.dK(c4)),l=B.a.gC(p),m=new A.P(l,m,o.h("P<1>")),k=c4.y,j=c4.c,o=o.h("c<1>"),c9=c9.w,i=c9.CW,h=q.b/60,g=c9.d,f=c9.p1;m.j();){c9=l.gp()
e=k.i(0,c9.a)
d=c9.as
c=d===B.k
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
for(c=J.jO(e.w,e.x),a2=c.$ti,c=new A.r(c,c.gl(0),a2.h("r<k.E>")),a2=a2.h("k.E"),a1=g;c.j();a0=a6){a5=c.d
a6=a5==null?a2.a(a5):a5
a1+=j.W(a0,a6)}}else{a5=c9.cx
if(a5!=null){a7=q.J(a5)
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
a9=q.J(a5)
a1=Math.max(r,a8)
if(a9!=null&&a9.b!==c9.b){b0=new A.c(p,n.a(new A.dL(c9,a9)),o).gl(0)
c=a9.at
if(c==null)c=a9.d
else{a2=a9.ax
a5=a9.cy?1:0
a5=B.c.u(c-a2-a5,0,5)
c=a5}b1=Math.max(1,Math.min(c,q.v(a9.a).length))
c=d0.i(0,c8)
c.toString
a2=d0.i(0,c6)
a2.toString
a1=a8+b1*(1+b0)*c+a2}}else a1=r}}}if(!isFinite(a1))a1=f
r=Math.max(r,a1)
b2=(e==null||e.b==="standby")&&c9.cx==null&&!d
c9=c9.ch
d=b2?1/0:a1
B.a.m(s,new A.aV(c9,b/a,d))}for(c9=d1.length,a3=0;a3<c9;++a3)r=Math.max(r,d1[a3].c)
r=Math.min(f,r)
c9=t.S
b3=new A.c(p,n.a(new A.dM(c4)),o).E(0,c4.r,new A.dN(),c9)
b4=new A.c(p,n.a(new A.dO(c4)),o).E(0,c4.r,new A.dP(),c9)
o=q.gN()
n=o.$ti
p=n.h("c<a.E>")
b5=A.n(new A.c(o,n.h("e(a.E)").a(new A.dQ(c4)),p),p.h("a.E"))
if(b5.length===0)d1=0
else{d1=d0.i(0,"countryIncome")
d1.toString
d1=B.b.k(d1)
p=d0.i(0,"poorPenalty")
p.toString
p=d1-B.b.k(p)
d1=p}p=A.h(b5)
b6=new A.dV(c4,b3,d1+new A.c(b5,p.h("e(1)").a(new A.dR(c4)),p.h("c<1>")).E(0,0,new A.dS(c4),c9),b4,c4.gc7())
b7=A.lz([r],t.i)
b8=A.d([],t.n)
b9=q.e
d1=r+1e-9
c0=b9
while(c0<=d1){b7.m(0,c0)
B.a.m(b8,c0)
q=d0.i(0,c5)
q.toString
c0+=q}for(d1=A.iN(b7,b7.r,b7.$ti.c),q=d1.$ti.c,c1=0;d1.j();){p=d1.d
if(p==null)p=q.a(p)
c2=B.a.E(s,0,new A.dT(p),c9)
if(p+1e-9<b9)c3=0
else{o=d0.i(0,c5)
o.toString
c3=1+B.b.Z((p-b9)/o)}if(B.a.I(b8,new A.dU(p))){p=b6.$1(Math.max(0,c3-1))
if(typeof p!=="number")return A.kF(p)
c1=Math.max(c1,c2+p)}p=b6.$1(c3)
if(typeof p!=="number")return A.kF(p)
c1=Math.max(c1,c2+p)}c9=Math.max(0,c1)
if(d2)d0=s.length===0?0:1
else{d0=d0.i(0,"emergencyGold")
d0.toString
d0=B.b.k(d0)}return new A.eq(c9+d0)},
T(){return this.ae(!1)},
aJ(a,b){var s,r,q,p,o,n,m,l,k,j=this,i="capacityPerLevel"
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
if(!(l>=0))return A.m(o,l)
m=B.c.u(o[l]-b.x,0,99999)}if(q>=p.an(j.a.c)||m==null||j.d<m)return!1
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
s.A(0,r,n)
return!0},
gc7(){return this.a.gN().E(0,0,new A.dZ(this),t.S)},
bj(a){var s,r,q,p,o,n=this
if(!a.dy||a.e===2||n.z.n(0,a.a))return!1
s=a.as
r=s!==B.f
if(!r||s===B.e){q=a.c
q=!n.ax.n(0,q)&&n.v(q).length<=1}else q=!1
if(q)return!1
q=a.a
n.z.m(0,q)
n.y.aj(0,q)
n.as.m(0,q)
n.d=n.d+a.x
q=n.f
p=n.e
n.e=Math.min(q,p+(!r||s===B.e?a.gP():0))
if(!r||s===B.e)for(s=a.ax,r=s.length,q=n.w,o=0;o<r;++o)q.aI(s[o],new A.dW(),new A.dX())
return!0},
aC(a){var s,r=this,q=r.b.b.i(0,"soldierCost")
q.toString
s=a*B.b.k(q)
if(a<0||r.e+a>r.f||r.d<s)return!1
r.d-=s
r.e+=a
return!0},
bZ(a){var s=this,r=s.b.r.i(0,a)
if(r==null||!r.f||s.a.c<r.e||s.d<r.b)return!1
s.d=s.d-r.b
s.w.aI(a,new A.dz(),new A.dA())
return!0},
bp(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=g.b,e=f.b,d=e.i(0,"drawCost")
d.toString
s=g.a
r=s.y
q=B.b.k(d)+r
d=s.r
p=A.h(d)
o=t.S
n=new A.c(d,p.h("e(1)").a(new A.e_(g)),p.h("c<1>")).E(0,g.r+r,new A.e0(),o)
p=e.i(0,"countryIncome")
p.toString
p=B.b.k(p)
d=s.gN()
m=d.$ti
l=p+new A.c(d,m.h("e(a.E)").a(new A.e1(g)),m.h("c<a.E>")).E(0,0,new A.e2(g),o)
o=e.i(0,"garrisonFree")
k=B.b.k(o==null?2:o)
e=e.i(0,"garrisonFactor")
j=B.b.k(e==null?0:e)
e=a.a
i=g.L(e)
d=g.gc7()
p=A.jp(i+1,j,k)
o=A.jp(i,j,k)
m=!0
if(a.Q){h=g.at
if(!h.n(0,e))if(s.x>h.a)if(g.d>=q){h=b?1.3:1.1
if(!(n+(d+p-o)>l*h)){if(b)f=1
else if(c==null)f=f.w.r
else{f=A.aA(c,s,f,null)
d=f.e.w
if(f.gY()){s=d.r
f=Math.max(s,Math.min(d.as,s+f.gaT()*0.2))}else f=d.r}f=n>l*f}else f=m}else f=m
else f=m
else f=m}else f=m
if(f)return!1
g.d-=q
g.r+=r
g.at.m(0,e)
return!0},
dn(a,b){return this.bp(a,!1,b)},
dm(a,b){return this.bp(a,b,null)},
d5(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(b)
if(a.db){s=a.a
s=l.as.n(0,s)||l.z.n(0,s)||l.d<=0}else s=!0
if(s)return!1
s=a.c
if(l.v(s).length<=1){r=!(l.ax.n(0,s)&&c.b==="evacuate"&&c.as)
s=r}else s=!1
if(s)return!1
s=l.w
r=t.S
q=A.k0(s,r,r)
r=b.length
p=l.b.b
o=p.i(0,"carryLimit")
o.toString
if(r>B.b.k(o))return!1
for(r=b.length,n=0;n<b.length;b.length===r||(0,A.v)(b),++n){m=b[n]
o=q.i(0,m)
if((o==null?0:o)===0)return!1
o=q.i(0,m)
o.toString
q.A(0,m,o-1)}s.aE(0)
s.G(0,q)
s=l.e
r=p.i(0,"soldierLimit")
r.toString
l.e=s-Math.min(s,B.b.k(r)-a.gP())
r=a.a
l.Q.m(0,r)
l.as.m(0,r)
l.y.A(0,r,c)
p=p.i(0,"supplySeconds")
p.toString
B.a.m(l.ay,new A.aV(a.ch,1/p,d))
return!0},
dq(a,b){var s,r=this
if(!a.dx||r.as.n(0,a.a)||r.d<=0||a.fy)return!1
s=a.a
r.as.m(0,s)
r.y.A(0,s,b)
return!0}}
A.dw.prototype={
$1(a){return A.f(a)+1},
$S:6}
A.dx.prototype={
$0(){return 1},
$S:5}
A.dY.prototype={
$1(a){var s=this.a,r=t.r.a(a).a
return!s.z.n(0,r)&&!s.Q.n(0,r)},
$S:0}
A.dy.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.c===this.b&&a.f>0&&!a.fy&&!s.z.n(0,a.a)},
$S:0}
A.dB.prototype={
$1(a){return!this.a.z.n(0,t.r.a(a).a)},
$S:0}
A.dC.prototype={
$1(a){return t.r.a(a).e===2},
$S:0}
A.dJ.prototype={
$1(a){var s=this.a,r=s.b,q=s.O(this.b),p=r.b.i(0,"soldierLimit")
p.toString
return A.ds(a,r,q,Math.min(B.b.k(p),s.e))},
$S:31}
A.dD.prototype={
$2(a,b){var s,r=t.r
r.a(a)
s=this.a
return J.l3(s.$1(r.a(b)),s.$1(a))},
$S:2}
A.dE.prototype={
$2(a,b){var s,r=t.r
r.a(a)
r.a(b)
s=B.c.t(b.x,a.x)
return s!==0?s:B.c.t(a.w,b.w)},
$S:2}
A.dF.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.b!==this.a.a.a){r=a.as
if(!(r===B.f||r===B.e)){s=this.b
s=a.p3===s.a||a.z.K(s.e)<100}}return s},
$S:0}
A.dG.prototype={
$1(a){return t.q.a(a).b!==this.a.a.a},
$S:1}
A.dH.prototype={
$1(a){var s=this.a,r=this.b.e
return s.c.W(r,t.q.a(a).f.a3(r))>s.b.w.b},
$S:1}
A.dI.prototype={
$1(a){var s=this.a.$1(t.r.a(a))
if(typeof s!=="number")return s.dG()
return s>=this.b},
$S:0}
A.dK.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
if(a.b===s.a.a){r=a.as
s=!(r===B.f||r===B.e)&&!a.fy&&!s.z.n(0,a.a)}else s=!1
return s},
$S:0}
A.dL.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=!1
if(a.a!==s.a)if(a.b===s.b){q=this.b
if(a.cx===q.a){r=q.e
r=a.z.K(r)<s.z.K(r)
s=r}else s=r}else s=r
else s=r
return s},
$S:0}
A.dM.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.n(0,a.a)},
$S:0}
A.dN.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:9}
A.dO.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=s.a
return a.b===r.a&&a.f>0&&!s.z.n(0,a.a)&&a.p4===r.d},
$S:0}
A.dP.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:9}
A.dQ.prototype={
$1(a){return!this.a.ax.n(0,t.q.a(a).a)},
$S:1}
A.dR.prototype={
$1(a){return!this.a.ax.n(0,t.q.a(a).a)},
$S:1}
A.dS.prototype={
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
A.dV.prototype={
$1(a){var s,r,q,p=this
if(a===0)s=0
else{s=p.a
r=s.a
q=r.gav()
s=s.b.b.i(0,"monthSeconds")
s.toString
s=a*(p.b-p.c)-p.d+B.b.am(q.r+p.e*(r.e/s+a-1))}return s},
$S:6}
A.dT.prototype={
$2(a,b){A.f(a)
t.gf.a(b)
return a+B.b.Z(b.a+b.b*Math.min(this.a,b.c)+1e-9)},
$S:35}
A.dU.prototype={
$1(a){return Math.abs(A.aw(a)-this.a)<1e-7},
$S:14}
A.dZ.prototype={
$2(a,b){var s,r,q
A.f(a)
s=this.a
r=s.L(t.q.a(b).a)
s=s.b.b
q=s.i(0,"garrisonFree")
q=B.b.k(q==null?2:q)
s=s.i(0,"garrisonFactor")
return a+A.jp(r,B.b.k(s==null?0:s),q)},
$S:7}
A.dW.prototype={
$1(a){return A.f(a)+1},
$S:6}
A.dX.prototype={
$0(){return 1},
$S:5}
A.dz.prototype={
$1(a){return A.f(a)+1},
$S:6}
A.dA.prototype={
$0(){return 1},
$S:5}
A.e_.prototype={
$1(a){var s
t.r.a(a)
s=this.a
return a.b===s.a.a&&a.f>0&&!s.z.n(0,a.a)},
$S:0}
A.e0.prototype={
$2(a,b){return A.f(a)+t.r.a(b).y},
$S:9}
A.e1.prototype={
$1(a){return!this.a.ax.n(0,t.q.a(a).a)},
$S:1}
A.e2.prototype={
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
A.es.prototype={
gY(){var s=this
return s.a!==s.d.a&&s.b>=s.e.w.w},
gb8(){return Math.max(0,this.b-this.e.w.w)},
gaT(){if(this.gY()){var s=this.e.w
s=Math.max(0,s.x+this.gb8()*s.y)}else s=0
return s},
ca(a,b){return a===0||!this.gY()||b<=1?a:Math.min(this.e.w.fy,a+1+B.c.be(this.gb8(),2))}}
A.et.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.eu.prototype={
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
aO(){return"CombatAdvantage."+this.b}}
A.bJ.prototype={}
A.ev.prototype={
af(b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5=this,b6="soldierHp",b7=t.eg
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
j=b8.a+":"+A.u(n)+":"+b8.w+":"+A.u(m)+":"+A.u(b8.ay)+":"+b9.a+":"+A.u(l)+":"+b9.w+":"+A.u(k)+":"+A.u(b9.ay)+":"+c6+":"+c0+":"+c9+":"+q+":"+o+":"+A.u(s)+":"+A.u(r)+":"+c3+":"+c7+":"+c2
i=b5.c
h=i.i(0,j)
if(h!=null)return h
if(!b5.b.cT())return B.a2
if(b7)b7=B.a.E(m,0,new A.ew(),t.H)
else{b7=b5.a.b.i(0,b6)
b7.toString
b7=q*B.b.k(b7)}g=n+b7
b7=b5.a
m=b7.b
f=m.i(0,b6)
f.toString
e=B.b.k(f)
d=Math.min(o,B.b.Z(c3/e))
c=d*e+Math.max(0,c3-o*e)
if(p&&c3===0)p=B.a.E(k,0,new A.ex(),t.H)
else{p=m.i(0,b6)
p.toString
p=o*B.b.k(p)}b=l+p
p=c6===0
a=b5.bS(s,p&&n>0,c7)
a0=c0===0
a1=b5.bS(r,a0&&l>0,c2)
a0=p&&a0
a2=b5.bH(b8,q,c6,c9,a0)
a3=b5.bH(b9,o-d,c0,c9,a0)
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
b4=new A.bJ(b3,b0,b1,k,l,a4)
if(i.a>=256)i.aj(0,new A.a8(i,A.l(i).h("a8<1>")).gD(0))
i.A(0,j,b4)
return b4},
cZ(a,b,c,d,e,f){return this.af(a,b,c,null,!0,0,d,e,0,!0,f,0)},
d1(a,b,c,d,e,f,g,h){return this.af(a,b,c,null,d,0,e,f,0,g,h,0)},
bh(a,b,c,d){return this.af(a,b,0,null,!0,0,null,null,c,!0,d,0)},
cW(a,b,c,d,e){return this.af(a,b,c,null,d,0,e,null,0,!0,null,0)},
bi(a,b,c,d,e,f){return this.af(a,b,0,null,c,0,null,null,d,e,f,0)},
cX(a,b,c,d,e){var s=null
return this.af(a,b,0,s,c,0,s,s,0,d,s,e)},
d0(a,b,c,d,e,f,g){return this.af(a,b,0,null,c,0,null,d,0,e,f,g)},
d_(a,b,c,d,e,f){return this.af(a,b,0,c,d,0,null,null,e,!0,f,0)},
cY(a,b,c,d,e){return this.af(a,b,0,null,!0,c,null,null,d,!0,e,0)},
bH(a,b,c,d,e){var s=this.a,r=s.bg(a.w,c,e,d)
s=s.b.i(0,"soldierPower")
s.toString
return(B.c.be(r+b*B.b.k(s)+2,4)+1)*1.5*(1+B.b.u(a.ay/1000,0,0.1))},
bS(a,b,c){var s,r,q,p,o,n,m,l,k
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
A.ew.prototype={
$2(a,b){return A.x(a)+A.aw(b)},
$S:15}
A.ex.prototype={
$2(a,b){return A.x(a)+A.aw(b)},
$S:15}
A.j6.prototype={
$2(a,b){var s
A.x(a)
s=this.a.r.i(0,A.f(b))
s=s==null?null:s.c
if(s==null)s=0
return a+s*this.b.w},
$S:45}
A.cB.prototype={
H(){var s=this
return A.R(["interval",s.a,"resourceInterval",s.e,"cashBuffer",s.f,"payrollRatio",s.r,"dangerousCountryCities",s.w,"coalitionBudgetBase",s.x,"coalitionBudgetStep",s.y,"coalitionTargetBase",s.z,"coalitionTargetStep",s.Q,"coalitionPayrollCeiling",s.as,"coalitionTravel",s.at,"targetTravelScale",s.ax,"hatredTargetBonus",s.ay,"breakthroughMargin",s.ch,"threat",s.b,"urgent",s.c,"margin",s.d,"commit",s.CW,"rearExtra",s.cy,"candidates",s.db,"assessments",s.dx,"routes",s.dy,"plans",s.fr,"commands",s.fx,"team",s.fy,"fronts",s.k1,"singleFrontMonths",s.k2,"splitForce",s.k3,"splitAdvantage",s.k4,"arrivalSpread",s.ok,"expeditionSeconds",s.p1,"assaultCommitDistance",s.p2,"recallCriticalMargin",s.p3,"attritionCombat",s.p4,"attritionGain",s.R8,"targets",s.go,"slice",s.id,"advantage",s.RG,"expansion",s.ry,"credit",s.rx,"age",s.cx,"timeout",s.to,"restarts",s.x1,"stagnation",s.x2],t.N,t.X)}}
A.at.prototype={}
A.ez.prototype={
bv(){return new A.au(this.cl(),t.gL)},
cl(){var s=this
return function(){var r=0,q=2,p=[],o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9
return function $async$bv(k0,k1,k2){if(k1===1){p.push(k2)
r=q}for(;;)switch(r){case 0:j7={}
j8=s.c
j9=s.a
if(j8.b!==j9.a||j8.c!==s.b.a)throw A.j(B.a7)
o=j8.Q
n=o.f
if(n.length>64||o.r.length>256||o.w.length>32)throw A.j(B.a8)
m=s.e
m===$&&A.V()
l=s.f
l===$&&A.V()
k=new A.ii(o,j9,m,l)
j=o.gN(),i=J.E(j.a),j=new A.P(i,j.b,j.$ti.h("P<1>")),h=s.x
case 3:if(!j.j()){r=4
break}g=i.gp()
h.A(0,g.a,k.dr(g))
r=5
return k0.b=0,1
case 5:r=3
break
case 4:j=j8.as
i=A.h(j)
g=i.h("c<1>")
j=A.n(new A.c(j,i.h("e(1)").a(new A.eV(s)),g),g.h("a.E"))
f=A.jQ(o,j9,m,j)
j7.a=f
j=j8.x
r=j===B.F?6:7
break
case 6:o=s.r
o===$&&A.V()
s.w=new A.hK(j8,j9,o,l,h).dj(f)
r=8
return k0.b=1,1
case 8:r=1
break
case 7:i=t.Z
e=A.d([],i)
g=t.s
d=A.d([],g)
c=s.d
b=s.r
b===$&&A.V()
a=new A.fh(j8,j9,c,l,b,h)
a0=A.l(h).h("a9<2>")
a1=a0.h("c<a.E>")
a2=A.n(new A.c(new A.a9(h,a0),a0.h("e(a.E)").a(new A.eW()),a1),a1.h("a.E"))
B.a.B(a2,new A.eX())
a0=t.bQ
a3=A.d([new A.at(j7.a,A.d([],i),A.d([],g),0,0)],a0)
a1=j===B.n
a4=a1?A.d([],t.bL):a2
a5=a4.length
a6=t.N
a7=t.S
a8=j9.w
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
c0=a.c_(b5,b9.a),c1=c0.$ti,c0=new A.aN(c0.a(),c1.h("aN<1>")),c2=b9.d,c3=b9.e,c4=b9.c,c5=b9.b,c1=c1.c
case 15:if(!c0.j()){r=16
break}c6=c0.b
if(c6==null)c6=c1.a(c6)
c7=A.n(c5,b0)
B.a.G(c7,c6.b)
if(B.a.E(c7,0,new A.f7(),a7)>a9){c.e=!0
r=15
break}c8=c6.a
c9=A.n(c4,a6)
d0=c6.e
if(d0.length!==0)c9.push(d0)
d0=c6.c
c6=c6.d?1:0
B.a.m(b6,new A.at(c8,c7,c9,c2+d0,c3+c6))
r=17
return k0.b=1,1
case 17:r=15
break
case 16:case 13:a3.length===b7||(0,A.v)(a3),++b8
r=12
break
case 14:if(b6.length!==0){B.a.B(b6,new A.fa())
b7=A.f(Math.min(4,b3))
c0=new A.w(b6,0,b7,b2)
c0.U(b6,0,b7,b1)
a3=c0.ab(0)}case 10:a4.length===a5||(0,A.v)(a4),++b4
r=9
break
case 11:if(a2.length!==0&&!a1){d1=B.a.gD(a3)
j7.a=d1.a
B.a.G(e,d1.b)
B.a.G(d,d1.c)
a0=d1.e
if(a0>0){a0=""+a0
B.a.m(d,c.e?"\u89c4\u5212\u914d\u989d\u5df2\u7528\u5c3d\uff1a"+a0+" \u5ea7\u57ce\u5c1a\u672a\u627e\u5230\u5b8c\u6574\u65b9\u6848\uff0c\u4e0d\u80fd\u636e\u6b64\u65ad\u5b9a\u65e0\u6cd5\u633d\u6551":"unsalvageableDefense\uff1a"+a0+" \u5ea7\u57ce\u5728\u5f53\u524d\u9501\u5b9a\u3001\u8d44\u91d1\u6216\u65f6\u9650\u4e0b\u672a\u627e\u5230\u5b8c\u6574\u4fee\u590d\u65b9\u6848")}d2="defending"}else d2="preparing"
if(a2.length!==0)d2="defending"
if(!a1){d3=s.cI(j7.a)
if(d3!=null){j7.a=d3.a
B.a.m(e,d3.b)
B.a.m(d,"\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u5176\u4ed6\u5b89\u5168\u57ce\u6c60\u7ee7\u7eed\u7ec4\u7ec7\u8fdb\u653b")}}r=18
return k0.b=2,1
case 18:for(a0=o.r,a1=A.h(a0),a4=a1.h("e(1)"),a5=a4.a(new A.fb(s)),a1=a1.h("c<1>"),b0=a1.h("e(a.E)").a(new A.fc(s)),a5=new A.c(a0,a5,a1).gC(0),b0=new A.P(a5,b0,a1.h("P<a.E>")),b1=t.w,b2=t.e,b3=t.Y,b7=j9.b;b0.j();){c0=a5.gp()
if(c0.e!==1||c0.f>=c0.r*0.25||c0.k2<2||c0.k3<=0||B.a.I(c0.ax,new A.fd(s)))continue
d4=o.a_(c0.k1)
if(d4!=null){c1=c0.gbk()
c2=c0.k3
c3=d4.gbk()
c4=Math.max(1,c0.k4)
c5=b7.i(0,"retreatSurvivalRatio")
c5.toString
c5=c1/c2>=c3/c4*c5
c1=c5}else c1=!0
if(c1)continue
c1=j7.a
c2=c0.a
if(c1.as.n(0,c2))continue
j7.a.as.m(0,c2)
c1=A.d([new A.y(B.P,c2,null,null,0,B.d)],b1)
c2=A.d([c0,d4],b2)
c0=o.J(c0.c)
c0.toString
B.a.m(e,new A.M("\u9ad8\u7ea7\u5c06\u9886\u751f\u547d\u4f4e\u4e8e\u56db\u5206\u4e4b\u4e00\uff0c\u5df2\u53d1\u751f\u7684\u4f24\u5bb3\u663e\u793a\u80dc\u671b\u6e3a\u832b\uff0c\u7533\u8bf7\u6709\u98ce\u9669\u7684\u5408\u6cd5\u64a4\u9000",c1,b.a7(c2,A.d([c0],b3)),B.q,0,!0))}r=19
return k0.b=3,1
case 19:a5=a1.h("a.E")
d5=A.n(new A.c(a0,a4.a(new A.fe(j7,s)),a1),a5)
b0=d5.length,c0=o.b,c1=o.a,c2=t._,c3=a8.x2,c4=c3*60,c5=t.m,b4=0
case 20:if(!(b4<d5.length)){r=22
break}d6=d5[b4]
c6=d6.a
d7=j7.a.y.i(0,c6)
c7=j7.a
d8=c7.d<c7.T().a
c7=d7==null
c8=!c7
d9=c8&&d7.y<c0
e0=!1
if((c7?null:d7.b)==="expedition")if((c7?null:d7.e)!=null){c9=o.J(c7?null:d7.d)
c9=c9==null?null:c9.b
if(c9!=(c7?null:d7.e)){c9=o.J(c7?null:d7.d)
c9=(c9==null?null:c9.b)!==c1}else c9=e0
e0=c9}e1=c8&&d6.as===B.k&&!d6.R8&&d7.x+1>=d7.w.length
c9=d6.as===B.k
if(c9)if(!d6.R8){e2=!0
if(c8)if(!d9)d0=e1&&B.a.n(A.d(["intercept","standby"],g),d7.b)
else d0=e2
else d0=e2
e2=d0}else e2=!1
else e2=!1
d0=!e0
e3=!d0||e1||e2
if(d0)d0=e1&&d7.b==="expedition"||e2
else d0=!0
if(d0)d0=(e2||!d8)&&d6.f>=d6.r*0.65
else d0=!1
if(d0){e4=s.cH(j7.a,d6,d7)
if(e4!=null){j7.a=e4.a
B.a.m(e,e4.b)
r=21
break}if(c.e){r=21
break}}if((c7?null:d7.as)===!0){d0=c7?null:d7.d
d0=d6.cx==d0&&!d9&&!e3&&!d8}else d0=!1
if(d0){r=21
break}if((c7?null:d7.b)==="intercept")if(o.a_(c7?null:d7.r)!=null){d0=h.i(0,c7?null:d7.d)
if(d0==null)d0=null
else d0=d0.d.length!==0||d0.a.at!=null
d0=d0!==!0
e5=d0}else e5=!0
else e5=!1
d0=!e3
if(d0&&e5&&!d8&&d7.z>c0&&d6.f>=d6.r*0.65){r=21
break}if(c8&&d0&&!d9&&!d8&&!e5&&d7.z>c0&&!A.ky(d6,o,j7.a,j9)&&d6.f>=d6.r*0.5){r=21
break}if(d6.R8&&c8&&!d9&&j7.a.d>0){r=21
break}e6=A.jD(d6,o,j7.a)
c8=!1
if(d0)if(A.ky(d6,o,j7.a,j9))if(j7.a.d>0)c8=d6.f>=d6.r*0.25||o.v(e6.a).length===0
if(c8){B.a.m(d,c6+"\u5df2\u4e34\u8fd1\u4e3b\u653b\u76ee\u6807\uff0c\u4fdd\u6301\u8fdb\u653b\uff0c\u4e0d\u56e0\u666e\u901a\u9884\u8b66\u6216\u6574\u5907\u9884\u7b97\u6298\u8fd4")
r=21
break}if((c7?null:d7.b)==="expedition"&&d0&&!d9&&!d8&&d6.f>=d6.r*0.65&&d7.x+1<d7.w.length){r=21
break}if(!d8&&d0&&!e5&&!d9&&d6.f>=d6.r*0.65&&!c9){r=21
break}c8=o.gN()
c9=c8.$ti
d0=c9.h("c<a.E>")
e7=A.n(new A.c(c8,c9.h("e(a.E)").a(new A.ff(j7,s,d9,d7)),d0),d0.h("a.E"))
B.a.B(e7,new A.fg(d6))
c8=A.h(e7)
c9=c8.h("w<1>")
d0=new A.w(e7,0,3,c9)
d0.U(e7,0,3,c8.c)
d0=new A.r(d0,d0.gl(0),c9.h("r<k.E>"))
c8=d6.f<d6.r*0.65
c9=c9.h("k.E")
while(d0.j()){e8=d0.d
if(e8==null)e8=c9.a(e8)
if(!c.X())break
e9=m.ak(d6,e8.e,o,!0,e8)
f0=j7.a
f1=e8.a
f2=h.i(0,f1)
if(f2==null)f2=null
else f2=f2.d.length!==0||f2.a.at!=null
if(d8)f3="\u73b0\u6709\u56fd\u5e93\u4e0d\u8db3\u4ee5\u7ee7\u7eed\u4f9b\u517b\u8fdc\u7a0b\u4efb\u52a1\uff0c\u56de\u57ce\u7f29\u51cf\u7cae\u8349\u652f\u51fa"
else if(c8)f3="\u5c06\u9886\u53d7\u4f24\uff0c\u56de\u57ce\u6062\u590d\u751f\u547d\u540e\u518d\u6218"
else if(e0)f3="\u76ee\u6807\u6613\u4e3b\u540e\u539f\u57ce\u4e0e\u9644\u8fd1\u654c\u57ce\u5747\u4e0d\u9002\u5408\u7ee7\u7eed\u8fdb\u653b\uff0c\u56de\u57ce\u6574\u5907"
else if(e1)f3="\u539f\u8def\u7ebf\u6301\u7eed\u53d7\u963b\uff0c\u91cd\u65b0\u9009\u62e9\u6709\u5b89\u5168\u540d\u989d\u7684\u57ce\u6c60\u6574\u5907"
else if(d9)f3="\u539f\u4efb\u52a1\u5df2\u8d85\u8fc7\u6267\u884c\u65f6\u9650\uff0c\u56de\u57ce\u91cd\u65b0\u6574\u5907"
else f3=e5?"\u622a\u51fb\u76ee\u6807\u5df2\u6d88\u5931\uff0c\u56de\u57ce\u7ed3\u675f\u672c\u6b21\u4efb\u52a1":"\u91ce\u5916\u6307\u4ee4\u5df2\u5b8c\u6210\uff0c\u56de\u57ce\u7b49\u5f85\u65b0\u4efb\u52a1"
f4=h.i(0,f1)
if(f4==null)f4=null
else f4=f4.d.length!==0||f4.a.at!=null
f1=f4===!0?h.i(0,f1).ga6():1/0
f5=b.ce(f0,d6,e9,!0,f1,!0,f2!==!0,f3,"regroup",e8)
if(f5!=null){j7.a=f5.a
B.a.m(e,f5.b)
break}}if(e2&&!j7.a.as.n(0,c6)){f6=d8?"\u5f53\u524d\u91d1\u5e01\u4e0d\u8db3\u4ee5\u627f\u62c5\u53ef\u6267\u884c\u7684\u65b0\u884c\u7a0b\uff0c\u6682\u65f6\u5f85\u547d\u5e76\u7ee7\u7eed\u590d\u67e5\u8865\u7ed9\u548c\u5165\u57ce\u540d\u989d":"\u5f53\u524d\u6ca1\u6709\u5408\u9002\u7684\u622a\u51fb\u6216\u8fdb\u653b\u76ee\u6807\uff0c\u53cb\u57ce\u4e5f\u6ca1\u6709\u5b89\u5168\u5165\u57ce\u65b9\u6848\uff0c\u6682\u65f6\u5f85\u547d\u5e76\u7ee7\u7eed\u590d\u67e5"
B.a.m(d,c6+"\uff1a"+f6)
if((c7?null:d7.b)!=="standby"||d9){c7=d6.c
f7=new A.a5(c6,"standby",f6,c7,null,!1,null,A.d([d6.z],c2),0,c0+B.b.bq(c4),c0,0,!1,!1,d6.id)
j7.a.y.A(0,c6,f7)
c6=A.d([],b1)
c8=A.d([f7],c5)
c9=A.d([d6],b2)
c7=o.J(c7)
c7.toString
B.a.m(e,new A.M(f6,c6,b.a7(c9,A.d([c7],b3)),c8,0,!1))}}r=23
return k0.b=4,1
case 23:case 21:d5.length===b0||(0,A.v)(d5),++b4
r=20
break
case 22:f8=A.n(new A.c(a0,a4.a(new A.eY(j7,s)),a1),a5)
B.a.B(f8,new A.eZ(s))
g=j8.y
a0=j8.z
f9=A.c8(o,j7.a,j9,a0,g)
a1=A.Y(a7,a7)
for(a4=f9.f,a5=new A.b7(a4,a4.r,a4.e,A.l(a4).h("b7<1>"));a5.j();){b0=a5.d
c0=a4.i(0,b0)
c0=c0==null?null:c0.length
a1.A(0,b0,c0==null?0:c0)}g0=f9.ga1()
if(g0==null)g0=f9.gc8()
if(f9.ga1()!=null&&a2.length===0)d2="attacking"
a4=f8.length,c3=j8.w>c3/a8.a,a5=a8.k4,j8=j8.f,b0=a8.rx,c0=a8.fy,a8=a8.go,c1=A.h(n),c2=c1.h("e(1)"),c1=c1.h("c<1>"),c4=c1.h("a.E"),g1=0,g2=1,g3=!1,b4=0
case 24:if(!(b4<f8.length)){r=26
break}d6=f8[b4]
g4={}
c5=d6.a
if(j7.a.as.n(0,c5)||j7.a.z.n(0,c5)){r=25
break}g5=o.J(d6.c)
c5=g5.a
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
c8=j7.a
if(c7===!0){c7=c8.ax.n(0,c5)?0:1
c8=j7.a
c9=g5.at
if(c9==null){c8=c8.x.i(0,c5)
if(c8==null)c8=g5.d}else{c8=g5.ax
d0=g5.cy?1:0
d0=B.c.u(c9-c8-d0,0,5)
c8=d0}g6=Math.min(c7,c8)}else g6=c8.ax.n(0,c5)?0:1
if(j7.a.v(c5).length<=g6){r=25
break}if(c6)c5=null
else c5=b5.d.length!==0||b5.a.at!=null
if(c5===!0&&!s.bK(g5,d6,j7.a)){r=25
break}g7=A.c8(o,j7.a,j9,a0,g)
g8=A.n(new A.c(n,c2.a(new A.f_(s,g7,d6,a1)),c1),c4)
B.a.B(g8,new A.f0(s,g7,d6))
g4.a=null
c5=A.h(g8)
c6=c5.h("w<1>")
c7=new A.w(g8,0,a8,c6)
c7.U(g8,0,a8,c5.c)
c7=new A.r(c7,c7.gl(0),c6.h("r<k.E>"))
c6=c6.h("k.E")
g9=null
h0=-1/0
case 27:if(!c7.j()){r=28
break}c5=c7.d
h1=c5==null?c6.a(c5):c5
if(!c.X()){r=28
break}h2=h1.a
c5=o.v(h2)
c8=A.h(c5).h("J<1>")
c5=new A.J(c5,c8)
c9=h1.at
if(c9==null)c9=h1.d
else{d0=h1.ax
e8=h1.cy?1:0
e8=B.c.u(c9-d0-e8,0,5)
c9=e8}d0=new A.w(c5,0,c9,c8.h("w<k.E>"))
d0.U(c5,0,c9,c8.h("k.E"))
h3=d0.ab(0)
e9=m.aH(d6,h1.e,o,h1)
if(!e9.d){r=27
break}h4=b.bo(d6,j7.a,h1,l)
for(c5=h4.length,h5=!1,b8=0;b8<h4.length;h4.length===c5||(0,A.v)(h4),++b8){h6=h4[b8]
c8=A.j0(d6,h1,o,j9,l,h6,c3&&j7.a.d>100?0.05:0).a
h7=c8[1]
h8=b.aW(c8[2],h1,j7.a)
h5=h8>0
if(!h5)continue
if(g7.ga1()!=null&&h2!==g7.ga1())c9=h8!==1||h7<a5
else c9=!1
if(c9)continue
h9=a1.i(0,h2)
if(h9==null)h9=0
i0=h8-h9
if(i0<=0)continue
g2=Math.max(g2,h8)
f5=s.bI(j7.a,d6,h1,h6,i0,h9,c8[0])
if(f5==null){i1=j7.a.M()
i1.d=1e6
i2=s.bI(i1,d6,h1,h6,i0,h9,c8[0])
if(i2!=null){if(a2.length===0)d2="saving"
c8=i1.d
c9=i2.a
i3=c8-c9.d+c9.T().a
g1=g1===0?i3:Math.min(g1,i3)
if(g0==null)g0=h2}else if(a2.length===0)d2="preparing"
continue}c5=e9.b
c8=A.bl(h1,d6,o,j9,j8,c5)
c9=j7.a.d
d0=f5.a.d
e8=B.a.b_(h6,1).E(0,0,new A.f1(s),a7)
f0=b7.i(0,"weaponChance")
f0.toString
i4=c8-c5*0.4-(c9-d0)*0.5+h7*30+e8*b0*f0*0.02
if(i4>h0){g4.a=f5
g2=f5.b.d.length
h0=i4
g9=h1}break}if(!h5&&g0==null){g2=Math.max(1,Math.min(c0,h3.length))
g0=h2}r=29
return k0.b=5,1
case 29:r=27
break
case 28:c5=g4.a
if(c5!=null){c5=B.a.E(e,0,new A.f2(),a7)
c6=g4.a
c5=c5+c6.b.b.length<=a9}else{c6=c5
c5=!1}if(c5){j7.a=c6.a
B.a.m(e,c6.b)
g0=g9.a
a1.aI(g0,new A.f3(g4),new A.f4(g4))
g3=!0}r=30
return k0.b=6,1
case 30:case 25:f8.length===a4||(0,A.v)(f8),++b4
r=24
break
case 26:j8=!g3
if(j8&&B.a.gD(a3).e===0&&j!==B.y){i5=s.cP(j7.a,f9)
if(i5!=null){j7.a=i5.a
B.a.m(e,i5.b)
d2="preparing"}}r=j===B.E&&j8&&B.a.E(e,0,new A.f5(),a7)<a9-3?31:32
break
case 31:j8=o.gN(),m=J.E(j8.a),j8=new A.P(m,j8.b,j8.$ti.h("P<1>"))
case 33:if(!j8.j()){r=34
break}l=m.gp()
j=l.a
g=h.i(0,j)
if(g==null)g=null
else g=g.d.length!==0||g.a.at!=null
if(g===!0){r=33
break}if(!c.X()){r=34
break}i6=j7.a.v(j)
b6=j7.a.M()
g=A.h(i6)
a0=g.h("c<1>")
i7=A.n(new A.c(i6,g.h("e(1)").a(new A.f6(j7)),a0),a0.h("a.E"))
B.a.B(i7,new A.f8())
if(B.a.I(n,new A.f9(s)))if(i6.length!==0){g=j7.a.bW(j)
g=g<(j7.a.ax.n(0,j)?0:1)+g2
i8=g}else i8=!0
else i8=!1
if(i7.length!==0){g=i6.length
a0=j7.a
a1=l.at
if(a1==null){a0=a0.x.i(0,j)
if(a0==null)a0=l.d}else{a0=l.ax
a4=l.cy?1:0
a4=B.c.u(a1-a0-a4,0,5)
a0=a4}if(g<a0)g=i8&&i6.length>=l.y
else g=!0}else g=!1
if(g)if(b6.aJ(l,B.a.gD(i7))&&b6.d>=b6.T().a){j7.a=b6
B.a.m(e,new A.M("\u5148\u6269\u5145\u5b89\u5168\u8fce\u6218\u540d\u989d\u548c\u5175\u5458\u5bb9\u91cf\uff0c\u518d\u8003\u8651\u62db\u5c06\u4e0e\u8fdc\u5f81",A.d([new A.y(B.l,B.a.gD(i7).a,j,null,0,B.d)],b1),b.a7(A.d([B.a.gD(i7)],b2),A.d([l],b3)),B.q,b6.T().a,!1))
r=34
break}if(i8){g=o.J(g0)
g=b6.dn(l,g==null?null:g.b)&&b6.d>=b6.T().a}else g=!1
if(g){j7.a=b6
B.a.m(e,new A.M("\u4e3a\u7559\u5b88\u4e0e\u8fdc\u5f81\u7684\u771f\u5b9e\u7f3a\u53e3\u62bd\u53d6\u82f1\u96c4\uff0c\u9884\u7559\u6700\u9ad8\u624b\u7eed\u8d39\u548c\u6708\u4ff8",A.d([new A.y(B.w,null,j,null,0,B.d)],b1),b.a7(A.d([],b2),A.d([l],b3)),B.q,b6.T().a,!1))
r=34
break}g=j7.a.f
a0=i6.length
a1=b7.i(0,"soldierLimit")
a1.toString
a1=Math.min(g,a0*B.b.k(a1))
a0=j7.a
i9=a1-a0.e
if(i9>0){j0=a0.M()
g=b7.i(0,"soldierBatch")
g.toString
j1=Math.min(B.b.k(g),i9)
if(j0.aC(j1)&&j0.d>=j0.T().a){j7.a=j0
B.a.m(e,new A.M("\u8865\u5145\u8fd1\u671f\u5b88\u57ce\u548c\u51fa\u5f81\u6240\u9700\u5175\u5458\uff0c\u4e0d\u586b\u6ee1\u6ca1\u6709\u4efb\u52a1\u7684\u5168\u56fd\u5bb9\u91cf",A.d([new A.y(B.m,null,j,null,j1,B.d)],b1),b.a7(A.d([],b2),A.d([l],b3)),B.q,j0.T().a,!1))
r=34
break}}r=35
return k0.b=7,1
case 35:r=33
break
case 34:case 32:if(g3)d2=a2.length===0?"attacking":"defending"
j2=o.J(g0)
if(j2!=null){j3=A.aA(j2.b,o,j9,null)
if(j3.gY())B.a.m(d,"\u76ee\u6807\u56fd\u5360\u6709 "+j3.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.am(j3.c*j3.gaT())+" \u91d1\u5e01\uff0c\u51c6\u5907\u5f3a\u5316\u6b66\u5668\u548c\u8f6e\u653b\u5175\u529b")}if(e.length===0){j8=j7.a
B.a.m(d,j8.d<j8.T().a?"\u8d44\u91d1\u4e0d\u8db3\u4ee5\u8986\u76d6\u73b0\u6709\u90e8\u961f\u548c\u6b20\u6536\u6708\u4ff8\uff0c\u7b49\u5f85\u6574\u5907":"\u6ca1\u6709\u6ee1\u8db3\u5b88\u57ce\u3001\u65f6\u9650\u53ca\u9759\u6001\u98ce\u9669\u7ea6\u675f\u7684\u65b0\u589e\u884c\u52a8\uff0c\u4fdd\u6301\u5df2\u6709\u4efb\u52a1")}if(c3)B.a.m(d,"\u505c\u6ede\u8bca\u65ad\uff1a"+(d2==="saving"?"\u7f3a\u5c11\u6574\u961f\u540e\u52e4\u8d44\u91d1":"\u7f3a\u5c11\u53ef\u5b89\u5168\u6267\u884c\u7684\u6269\u5f20\u6761\u4ef6")+"\uff0c\u4e0d\u901a\u8fc7\u65e0\u9650\u62db\u52df\u6216\u81ea\u6740\u51fa\u51fb\u6253\u7834\u7b49\u5f85")
j4=A.d([],i)
for(j8=e.length,j5=0,b4=0;b4<e.length;e.length===j8||(0,A.v)(e),++b4){j6=e[b4]
j5+=j6.b.length
if(j5>a9){c.e=!0
B.a.m(d,"\u547d\u4ee4\u914d\u989d\u5230\u8fbe\uff0c\u53ea\u63d0\u4ea4\u524d\u9762\u5b8c\u6574\u7684\u52a8\u4f5c\u7ec4\uff0c\u540e\u7eed\u7559\u5f85\u4e0b\u4e00\u6b21\u89c4\u5212")
break}B.a.m(j4,j6)}s.w=new A.bN(d2,g0,g1,g2,j4,A.a0(d,0,A.Z(12,"count",a7),a6).ab(0),c.e,c.c,c.d,c.b)
case 1:return 0
case 2:return k0.c=p.at(-1),3}}}},
cI(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this
for(s=a2.c.Q,r=s.gN(),q=J.E(r.a),r=new A.P(q,r.b,r.$ti.h("P<1>")),p=a2.x,o=a2.d,n=s.r,m=A.h(n),l=m.h("e(1)"),m=m.h("c<1>"),k=m.h("a.E"),j=a3.ax;r.j();){i=q.gp()
h=i.a
if(a3.v(h).length!==0||a3.L(h)>0||j.n(0,h))continue
g=A.n(new A.c(n,l.a(new A.eJ(a2,a3)),m),k)
B.a.B(g,new A.eK(i))
f=A.h(g)
e=f.h("w<1>")
d=new A.w(g,0,4,e)
d.U(g,0,4,f.c)
d=new A.r(d,d.gl(0),e.h("r<k.E>"))
f=i.e
e=e.h("k.E")
while(d.j()){c=d.d
if(c==null)c=e.a(c)
if(!o.X())return null
b=a2.e
b===$&&A.V()
a=b.ak(c,f,s,!0,i)
b=a2.r
b===$&&A.V()
a0=p.i(0,h)
a0=a0==null?null:a0.ga6()
a1=b.aZ(a3,c,a,!0,a0==null?1/0:a0,!0,"\u7a7a\u57ce\u4f18\u5148\u63a5\u9632\uff0c\u63f4\u519b\u51fa\u53d1\u57ce\u4fdd\u7559\u5b9e\u9645\u5b88\u5c06","transfer",i)
if(a1!=null)return a1}}return null},
cH(b3,b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this,b2=null
if(b4.ax.length===0)return b2
s=b5==null
if((s?b2:b5.b)==="expedition")r=s?b2:b5.d
else r=b2
q=b1.c.Q
p=q.f
o=A.h(p)
n=o.h("c<1>")
m=A.n(new A.c(p,o.h("e(1)").a(new A.eF(b1)),n),n.h("a.E"))
B.a.B(m,new A.eG(b1,r,b4))
for(p=b1.a,o=p.w,n=A.a0(m,0,A.Z(o.go,"count",t.S),A.h(m).c),l=n.$ti,n=new A.r(n,n.gl(0),l.h("r<k.E>")),s=!s,k=t.r,j=o.fy,i=b3.y,h=A.l(i).h("a9<2>"),g=h.h("e(a.E)"),f=h.h("c<a.E>"),e=b1.d,l=l.h("k.E"),p=p.b,d=q.w,o=o.ch;n.j();){c=n.d
if(c==null)c=l.a(c)
if(!e.X())return b2
b=b1.r
b===$&&A.V()
if(!b.aD(b4,c))continue
a=new A.c(new A.a9(i,h),g.a(new A.eH(b1,b4,c)),f).gl(0)
if(a>=j)continue
a0=c.a
a1=q.v(a0)
a2=A.h(a1).h("J<1>")
a1=new A.J(a1,a2)
a3=c.at
a4=a3==null
if(a4)a5=c.d
else{a5=c.ax
a6=c.cy?1:0
a6=B.c.u(a3-a5-a6,0,5)
a5=a6}a6=new A.w(a1,0,a5,a2.h("w<k.E>"))
a6.U(a1,0,a5,a2.h("k.E"))
a7=A.b4(a6,k)
a1=a7!=null
if(a1){a2=B.a.ap(d,new A.eI(c))
a5=b1.f
a5===$&&A.V()
if(a4)a3=c.d
else{a4=c.ax
a6=c.cy?1:0
a6=B.c.u(a3-a4-a6,0,5)
a3=a6}a4=p.i(0,"soldierLimit")
a4.toString
a8=a5.cW(b4,a7,a3,!1,Math.min(B.b.k(a4),a7.gP()+a2.c))
if(a8.r||a8.c<=0||a8.b<o)continue}a2=b1.e
a2===$&&A.V()
a9=a2.aH(b4,c.e,q,c)
if(!s||b5.b!=="expedition")a0="\u91ce\u5916\u4efb\u52a1\u7ed3\u675f\u540e\u5229\u7528\u73b0\u6709\u968f\u8eab\u5175\u529b\uff0c\u8f6c\u653b\u53ef\u4ee5\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u654c\u57ce"
else a0=a0===r?"\u91cd\u65b0\u6838\u5bf9\u5f53\u524d\u5b88\u519b\u4e0e\u8def\u8d39\u540e\uff0c\u7ee7\u7eed\u8fdb\u653b\u539f\u76ee\u6807":"\u539f\u76ee\u6807\u4e0d\u518d\u9002\u5408\u8fdb\u653b\uff0c\u8f6c\u5411\u9644\u8fd1\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u654c\u57ce"
b0=b.cj(b3,b4,a9,a1,!0,a,a0,"expedition",c)
if(b0!=null)return b0}return b2},
cP(a8,a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this,a3=a2.c.Q,a4=a3.gN(),a5=a4.$ti,a6=a5.h("c<a.E>"),a7=A.n(new A.c(a4,a5.h("e(a.E)").a(new A.eO(a2)),a6),a6.h("a.E"))
if(a7.length<2)return null
a4=a3.f
a5=A.h(a4)
a6=a5.h("c<1>")
s=A.n(new A.c(a4,a5.h("e(1)").a(new A.eP(a2,a9)),a6),a6.h("a.E"))
a4=t.S
a5=t.i
r=A.Y(a4,a5)
for(a6=a7.length,q=A.h(s),p=q.c,q=q.h("w<1>"),o=a2.a.w,n=o.go,m=0;m<a7.length;a7.length===a6||(0,A.v)(a7),++m){l=a7[m]
B.a.B(s,new A.eQ(l))
k=new A.w(s,0,n,q)
k.U(s,0,n,p)
r.A(0,l.a,k.E(0,1/0,new A.eR(a2,l),a5))}B.a.B(a7,new A.eS(r))
for(a5=A.h(a7),a4=A.a0(a7,0,A.Z(2,"count",a4),a5.c),a6=a4.$ti,a4=new A.r(a4,a4.gl(0),a6.h("r<k.E>")),a5=a5.h("J<1>"),q=a5.h("r<k.E>"),p=a2.d,n=a8.ax,k=a5.h("k.E"),o=o.at,a6=a6.h("k.E");a4.j();){j=a4.d
if(j==null)j=a6.a(j)
i=j.a
h=r.i(0,i)
h.toString
if(h>o)continue
for(h=new A.J(a7,a5),h=new A.r(h,h.gl(0),q),g=j.e;h.j();){f=h.d
f=(f==null?k.a(f):f).a
e=r.i(0,f)
e.toString
d=r.i(0,i)
d.toString
if(e<d+10)continue
c=a8.v(f)
e=c.length
if(e<=(n.n(0,f)?0:1))continue
f=A.h(c)
e=f.h("c<1>")
b=A.n(new A.c(c,f.h("e(1)").a(new A.eT(a8)),e),e.h("a.E"))
B.a.B(b,new A.eU())
f=A.h(b)
e=f.h("w<1>")
d=new A.w(b,0,2,e)
d.U(b,0,2,f.c)
d=new A.r(d,d.gl(0),e.h("r<k.E>"))
e=e.h("k.E")
while(d.j()){f=d.d
if(f==null)f=e.a(f)
if(!p.X())return null
a=a2.e
a===$&&A.V()
a0=a.ak(f,g,a3,!0,j)
a=a2.r
a===$&&A.V()
a1=a.cg(a8,f,a0,!0,!0,"\u5c06\u540e\u65b9\u95f2\u7f6e\u4e3b\u529b\u524d\u79fb\u5230\u5b89\u5168\u524d\u6cbf\u636e\u70b9\uff0c\u7f29\u77ed\u540e\u7eed\u5f81\u670d\u7684\u884c\u519b\u4e0e\u7cae\u8349\u6210\u672c","transfer",j)
if(a1!=null)return a1}}}return null},
bK(a,b,c){var s,r,q=a.a,p=this.x.i(0,q),o=p==null?null:p.d
if(o==null)o=A.d([],t.D)
if(o.length===0)return!0
q=c.v(q)
p=A.h(q)
s=p.h("c<1>")
q=A.n(new A.c(q,p.h("e(1)").a(new A.eM(b)),s),s.h("a.E"))
p=A.h(q).h("J<1>")
r=A.a0(new A.J(q,p),0,A.Z(c.O(a),"count",t.S),p.h("k.E")).ab(0)
if(r.length===0)return!1
return B.a.aS(o,new A.eN(this,r,c,a))},
bI(c7,c8,c9,d0,d1,d2,d3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4=this,c5=null,c6="soldierLimit"
t.L.a(d0)
s=t.e
r=A.d([],s)
for(q=c4.c.Q,p=q.gN(),o=J.E(p.a),p=new A.P(o,p.b,p.$ti.h("P<1>")),n=c7.ax,m=c4.x,l=c8.c;p.j();){k=o.gp().a
j=m.i(0,k)
if(j==null)j=c5
else j=j.d.length!==0||j.a.at!=null
if(j===!0&&k!==l)continue
i=n.n(0,k)?0:1
h=Math.max(0,c7.v(k).length-i)
k=c7.v(k)
j=A.h(k)
g=j.h("c<1>")
f=A.n(new A.c(k,j.h("e(1)").a(new A.eB(c4,c7,c9)),g),g.h("a.E"))
B.a.B(f,new A.eC(c4))
k=A.h(f)
j=new A.w(f,0,h,k.h("w<1>"))
j.U(f,0,h,k.c)
B.a.G(r,j)}if(!B.a.n(r,c8))return c5
B.a.aj(r,c8)
B.a.B(r,new A.eD(c4))
p=c4.e
p===$&&A.V()
o=c9.e
e=p.aH(c8,o,q,c9)
if(!e.d)return c5
d=A.d([c8],s)
s=t.N
c=A.R([c8.a,e],s,t.bJ)
b=e.b
for(n=c4.a,l=n.w,k=t.S,j=A.a0(r,0,A.Z(l.fy*2,"count",k),t.r),g=j.$ti,j=new A.r(j,j.gl(0),g.h("r<k.E>")),a=l.ok,g=g.h("k.E"),a0=b;j.j();){a1=j.d
if(a1==null)a1=g.a(a1)
if(d.length>=d1)break
a2=p.aH(a1,o,q,c9)
if(!a2.d)continue
a3=a2.b
a4=Math.min(b,a3)
a5=Math.max(a0,a3)
if(a5-a4>a)continue
B.a.m(d,a1)
c.A(0,a1.a,a2)
a0=a5
b=a4}if(d.length<d1)return c5
a6=A.d([],t.w)
a7=A.d([],t.m)
a8=A.Y(s,s)
s=q.v(c9.a)
p=A.h(s).h("J<1>")
a9=A.a0(new A.J(s,p),0,A.Z(c9.gad(),"count",k),p.h("k.E")).ab(0)
for(s=l.fx,n=n.b,p=d1===1,o=A.h(a9),l=o.c,o=o.h("w<1>"),k=t.p,b0=c7,b1=0;b1<d.length;++b1){b2=d[b1]
j=b2.c
g=m.i(0,j)
if(g==null)g=c5
else g=g.d.length!==0||g.a.at!=null
if(g===!0){g=q.J(j)
g.toString
g=!c4.bK(g,b2,b0)}else g=!1
if(g)return c5
g=c.i(0,b2.a)
g.toString
if(b1===0)a1=A.d([d0],k)
else{a1=c4.r
a1===$&&A.V()
a3=c4.f
a3===$&&A.V()
a3=a1.bo(b2,b0,c9,a3)
a1=a3}a3=a1.length
b3=d2+b1
b4=b0.ax
b5=b1>0
b6=c5
b7=0
for(;b7<a1.length;a1.length===a3||(0,A.v)(a1),++b7){b8=a1[b7]
if(b5){if(d3){b9=new A.w(a9,0,1,o)
b9.U(a9,0,1,l)}else b9=a9
b9=J.l2(b9,new A.eE(c4,b2,c9,b8))}else b9=!1
if(b9)continue
for(b9=q.gN(),c0=J.E(b9.a),b9=new A.P(c0,b9.b,b9.$ti.h("P<1>")),c1=0;b9.j();){c2=c0.gp().a
c3=b0.v(c2).length
c3=Math.max(0,c3-(c2===j?1:0))
c2=b4.n(0,c2)?0:1
c2=Math.min(c3,c2)
c3=n.i(0,c6)
c3.toString
c1+=c2*B.b.k(c3)}b9=c4.r
b9===$&&A.V()
c0=p?"\u56f4\u7ed5\u4e3b\u653b\u76ee\u6807\u6295\u5165\u8db3\u591f\u6218\u529b\uff0c\u4fdd\u7559\u5176\u4ed6\u65b9\u5411\u5175\u529b":"\u96c6\u4e2d\u4f18\u52bf\u7f16\u961f\u8f6e\u653b\u540c\u4e00\u5ea7\u57ce\uff0c\u62b5\u8fbe\u95f4\u9694\u4e0d\u8d85\u8fc7"+B.b.k(a)+"\u79d2"
c2=b0.f
c3=n.i(0,c6)
c3.toString
b6=b9.bt(b0,b2,g,d3,b8,Math.min(c1,Math.max(0,c2-B.b.k(c3))),b3,c0,"expedition",c9)
if(b6!=null)break}if(b6==null)return c5
b0=b6.a
j=b6.b
B.a.G(a6,j.b)
B.a.G(a7,j.d)
a8.G(0,j.c)
if(a6.length>s){c4.d.e=!0
return c5}}s=c4.r
s===$&&A.V()
a8.G(0,s.a7(a9,A.d([],t.Y)))
if(d3)s="\u5148\u6d3e\u53ef\u5f62\u6210\u6709\u6548\u4ea4\u6362\u7684\u5c06\u9886\u8fdb\u653b\u524d\u6392\uff0c\u6301\u7eed\u8f6e\u653b\u5e76\u8865\u5145\u6218\u635f"
else s=p?"\u6267\u884c\u9759\u6001\u4f18\u52bf\u660e\u786e\u3001\u53ef\u4ee5\u4f9b\u517b\u7684\u6269\u5f20":"\u6574\u961f\u540e\u52e4\u51c6\u5907\u5b8c\u6210\uff0c\u6309\u771f\u5b9e\u6392\u961f\u89c4\u5219\u8f6e\u653b\uff1b\u4e0d\u9884\u6f14\u672a\u6765\u4f24\u4ea1"
return new A.d5(b0,new A.M(s,a6,a8,a7,b0.T().a,!1))},
cR(a,b,c){var s=this.c
return A.bl(a,b,s.Q,this.a,s.f,c)},
aR(a,b){return this.cR(a,b,null)}}
A.eV.prototype={
$1(a){var s,r,q
t.J.a(a)
s=this.a.c.Q
r=s.a_(a.a)
q=!1
if(r!=null)if(r.b===s.a)if(!r.fy)if(r.f>0){s=r.as
s=!(s===B.f||s===B.e)&&r.id===a.ax}else s=q
else s=q
else s=q
else s=q
return s},
$S:11}
A.eW.prototype={
$1(a){t.h.a(a)
return a.d.length!==0||a.a.at!=null},
$S:43}
A.eX.prototype={
$2(a,b){var s,r=t.h
r.a(a)
r.a(b)
s=B.b.t(a.ga6(),b.ga6())
return s!==0?s:B.b.t(b.r+b.a.r*4,a.r+a.a.r*4)},
$S:41}
A.f7.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:16}
A.fa.prototype={
$2(a,b){var s,r=t.dp
r.a(a)
r.a(b)
r=a.e
s=b.e
return r!==s?B.c.t(r,s):B.b.t(b.d,a.d)},
$S:38}
A.fb.prototype={
$1(a){t.r.a(a)
return a.b===this.a.c.Q.a&&!a.fy&&a.fx},
$S:0}
A.fc.prototype={
$1(a){t.r.a(a)
return this.a.c.x!==B.n},
$S:0}
A.fd.prototype={
$1(a){var s=this.a.a.r.i(0,A.f(a))
return(s==null?null:s.d)===0},
$S:17}
A.fe.prototype={
$1(a){var s
t.r.a(a)
s=this.b.c
return a.b===s.Q.a&&a.dx&&s.x!==B.n&&!a.fy&&!this.a.a.as.n(0,a.a)},
$S:0}
A.ff.prototype={
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
A.fg.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.z
return B.b.t(a.e.K(s),b.e.K(s))},
$S:4}
A.eY.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b.c
r=!1
if(a.b===s.Q.a)if(a.db){r=this.a
s=r.a.al(a)&&s.x!==B.y&&!a.fy&&!r.a.z.n(0,a.a)}else s=r
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
return B.b.t(A.ae(b,s.J(b.c).d<q.an(r)),A.ae(a,s.J(a.c).d<q.an(r)))},
$S:2}
A.f_.prototype={
$1(a){var s,r,q,p=this
t.q.a(a)
s=p.a
r=!1
if(a.b!==s.c.Q.a)if(p.b.aB(a)){q=s.r
q===$&&A.V()
if(q.aD(p.c,a)){r=p.d.i(0,a.a)
if(r==null)r=0
s=r<s.a.w.fy}else s=r}else s=r
else s=r
return s},
$S:1}
A.f0.prototype={
$2(a,b){var s,r=t.q
r.a(a)
r.a(b)
r=this.b
if(a.a===r.ga1())r=-1
else if(b.a===r.ga1())r=1
else{r=this.a
s=this.c
s=B.b.t(r.aR(b,s),r.aR(a,s))
r=s}return r},
$S:4}
A.f1.prototype={
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
$S:23}
A.f2.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:16}
A.f3.prototype={
$1(a){return A.f(a)+this.a.a.b.d.length},
$S:6}
A.f4.prototype={
$0(){return this.a.a.b.d.length},
$S:5}
A.f5.prototype={
$2(a,b){return A.f(a)+t.I.a(b).b.length},
$S:16}
A.f6.prototype={
$1(a){t.r.a(a)
return a.fr&&!this.a.a.as.n(0,a.a)},
$S:0}
A.f8.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.f9.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.eJ.prototype={
$1(a){var s,r,q
t.r.a(a)
s=this.a
r=!1
if(a.b===s.c.Q.a)if(a.db){q=this.b
if(q.al(a))if(!q.as.n(0,a.a)){s=s.x.i(0,a.c)
if(s==null)s=null
else s=s.d.length!==0||s.a.at!=null
s=s!==!0}else s=r
else s=r}else s=r
else s=r
return s},
$S:0}
A.eK.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.z.K(s),b.z.K(s))},
$S:2}
A.eF.prototype={
$1(a){return t.q.a(a).b!==this.a.c.Q.a},
$S:1}
A.eG.prototype={
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
A.eH.prototype={
$1(a){var s,r
t.J.a(a)
s=a.a
r=!1
if(s!==this.b.a)if(a.b==="expedition")if(a.d===this.c.a){s=this.a.c.Q.a_(s)
s=(s==null?null:s.fy)===!1}else s=r
else s=r
else s=r
return s},
$S:11}
A.eI.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:8}
A.eO.prototype={
$1(a){var s=this.a.x.i(0,t.q.a(a).a)
if(s==null)s=null
else s=s.d.length!==0||s.a.at!=null
return s!==!0},
$S:1}
A.eP.prototype={
$1(a){t.q.a(a)
return a.b!==this.a.c.Q.a&&this.b.aB(a)},
$S:1}
A.eQ.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.K(s),b.e.K(s))},
$S:4}
A.eR.prototype={
$2(a,b){var s,r
A.aw(a)
t.q.a(b)
s=this.a.e
s===$&&A.V()
r=this.b.e
return Math.min(a,s.W(r,b.f.a3(r)))},
$S:62}
A.eS.prototype={
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
A.eT.prototype={
$1(a){t.r.a(a)
return a.db&&a.e!==2&&!this.a.as.n(0,a.a)},
$S:0}
A.eU.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ae(s.a(b),!0),A.ae(a,!0))},
$S:2}
A.eM.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.eN.prototype={
$1(a){var s=this
return B.a.I(s.b,new A.eL(s.a,t.O.a(a),s.c,s.d))},
$S:12}
A.eL.prototype={
$1(a){var s,r,q,p,o,n=this,m="soldierLimit"
t.r.a(a)
s=n.a
r=s.f
r===$&&A.V()
q=n.c
p=q.O(n.d)
s=s.a.b
o=s.i(0,m)
o.toString
o=B.b.k(o)
q=q.e
s=s.i(0,m)
s.toString
return r.bh(a,n.b.a,p,Math.min(o,Math.max(0,q-B.b.k(s)))).a===B.h},
$S:0}
A.eB.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.db){r=this.b
if(!r.as.n(0,a.a))if(r.al(a)){s=this.a.r
s===$&&A.V()
s=s.aD(a,this.c)}}return s},
$S:0}
A.eC.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ae(b,s.J(b.c).d<q.an(r)),A.ae(a,s.J(a.c).d<q.an(r)))},
$S:2}
A.eD.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a
s=q.c.Q
q=q.a
r=s.c
return B.b.t(A.ae(b,s.J(b.c).d<q.an(r)),A.ae(a,s.J(a.c).d<q.an(r)))},
$S:2}
A.eE.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this,i="soldierLimit"
t.r.a(a)
s=j.a
r=s.f
r===$&&A.V()
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
k=r.cZ(j.b,a,p,Math.min(B.b.k(n),B.a.ap(s.c.Q.w,new A.eA(q)).c),l,m)
return J.ji(l)&&k.b<o.w.k4||k.r||k.c<=o.w.RG||k.b<-0.12},
$S:0}
A.eA.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:8}
A.a7.prototype={}
A.fh.prototype={
c_(a,b){return new A.au(this.cV(a,b),t.dT)},
cV(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e
return function $async$c_(c,d,a0){if(d===1){n.push(a0)
p=o}for(;;)switch(p){case 0:i=s.a4(r,q)
h=r.a
g=h.a
f=q.L(g)<=q.O(h)
e=!1
if(f){m=r.d
if(m.length!==0)if(B.a.aS(m,new A.h1(s,q))){e=q.y
e=!new A.a9(e,A.l(e).h("a9<2>")).I(0,new A.h2(r))}}p=e?3:4
break
case 3:p=5
return c.b=new A.a7(q,A.d([],t.Z),s.a5(r,q),!1,"\u5df2\u6709\u622a\u51fb\u90e8\u961f\u80fd\u53ca\u65f6\u63a5\u654c\uff0c\u7b49\u5f85\u6267\u884c\u7ed3\u679c\uff0c\u4e0d\u91cd\u590d\u6d3e\u51fa\u7b2c\u4e8c\u652f\u90e8\u961f","hold"),1
case 5:p=1
break
case 4:if(f)e=(i==null?null:i.a)===B.h
else e=!1
p=e?6:7
break
case 6:p=8
return c.b=new A.a7(q,A.d([],t.Z),s.a5(r,q),!1,"\u57ce\u9632\u4e0e\u73b0\u6709\u5b88\u5c06\u8db3\u4ee5\u5e94\u5bf9\u53ef\u89c1\u6765\u654c\uff0c\u7ef4\u6301\u8fdc\u5f81\uff0c\u4e0d\u53ec\u56de\u5c06\u9886","hold"),1
case 8:p=1
break
case 7:e=s.by(r,q)
l=A.n(e,e.$ti.h("a.E"))
e=A.h(l)
m=e.h("c<1>")
k=A.n(new A.c(l,e.h("e(1)").a(new A.h3(s,r,i,q)),m),m.h("a.E"))
p=k.length!==0?9:10
break
case 9:p=11
return c.bT(k)
case 11:p=1
break
case 10:p=f&&q.L(g)<q.O(h)?12:13
break
case 12:j=q.M()
p=j.dm(h,!0)&&j.d>=j.ae(!0).a?14:15
break
case 14:p=16
return c.b=s.aA(r,q,j,A.d([new A.y(B.w,null,g,null,0,B.d)],t.w),"\u672c\u5730\u4ecd\u6709\u8fce\u6218\u540d\u989d\uff0c\u5148\u62db\u52df\u8865\u5f3a\uff0c\u518d\u6309\u5b9e\u9645\u5230\u4efb\u5c5e\u6027\u590d\u6838\uff0c\u6682\u4e0d\u53ec\u56de\u8fdc\u5f81"),1
case 16:p=1
break
case 15:case 13:p=17
return c.bT(l)
case 17:case 1:return 0
case 2:return c.c=n.at(-1),3}}}},
by(a,b){return new A.au(this.ct(a,b),t.dT)},
ct(a,b){var s=this
return function(){var r=a,q=b
var p=0,o=2,n=[],m,l,k,j,i,h,g,f,e,d,c,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0,h1,h2,h3,h4,h5,h6,h7,h8,h9,i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,j0,j1,j2,j3,j4,j5,j6,j7,j8,j9,k0,k1,k2,k3,k4,k5,k6,k7,k8,k9
return function $async$by(l0,l1,l2){if(l1===1){n.push(l2)
p=o}for(;;)switch(p){case 0:k3=r.a
k4=k3.a
k5=q.L(k4)>q.O(k3)
k6=t.Z
k7=A.d([],k6)
k8=s.a5(r,q)
k9=!k5
if(k9){m=s.a4(r,q)
m=(m==null?null:m.a)!==B.h}else m=!0
p=3
return l0.b=new A.a7(q,k7,k8,m,k5?"unsalvageableDefense\uff1a\u5f53\u524d\u5b89\u5168\u540d\u989d "+q.O(k3)+"\uff0c\u9a7b\u519b "+q.L(k4)+"\uff0c\u7b49\u5f85\u5408\u6cd5\u4fee\u590d":"\u4fdd\u6301\u53ef\u51fa\u573a\u5b88\u519b\uff0c\u7ee7\u7eed\u76d1\u63a7\u5168\u90e8\u6765\u654c","local"),1
case 3:k7=s.c
if(!k7.X()){p=1
break}k8=q.f
m=q.v(k4).length
l=s.b
k=l.b
j=k.i(0,"soldierLimit")
j.toString
i=Math.max(0,Math.min(k8,m*B.b.k(j))-q.e)
p=i>0?4:5
break
case 4:h=q.M()
k8=h.d
m=h.ae(!0)
j=k.i(0,"soldierCost")
j.toString
g=Math.min(i,Math.max(0,B.c.aM(k8-m.a,B.b.k(j))))
p=g>0&&h.aC(g)?6:7
break
case 6:p=8
return l0.b=s.aA(r,q,h,A.d([new A.y(B.m,null,k4,null,g,B.d)],t.w),"\u4f18\u5148\u7528\u56fd\u5e93\u8865\u8db3\u73b0\u6709\u5b88\u519b\u5175\u5458\uff0c\u518d\u5224\u65ad\u662f\u5426\u9700\u8981\u5916\u63f4"),1
case 8:case 7:case 5:k8=k3.at
m=k8==null
p=m?9:10
break
case 9:f=q.M()
e=A.d([],t.w)
j=f.v(k4)
d=A.h(j)
c=d.h("c<1>")
a0=A.n(new A.c(j,d.h("e(1)").a(new A.fi()),c),c.h("a.E"))
B.a.B(a0,new A.fj())
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
break}if(!f.aJ(k3,a1)||f.d<f.ae(!0).a){p=14
break}B.a.m(e,new A.y(B.l,j,k4,null,0,B.d))
a3=f.L(k4)
a4=d.i(0,k4)
if(a4==null)a4=c
p=a3<=a4?15:16
break
case 15:p=17
return l0.b=s.aA(r,q,f,e,"\u4f18\u5148\u7531\u9ad8\u5185\u653f\u5c06\u9886\u5347\u7ea7\uff0c\u4fdd\u62a4\u771f\u5b9e\u8fce\u6218\u540d\u989d"),1
case 17:a3=s.a4(r,f)
if((a3==null?null:a3.a)===B.h||k5){p=14
break}case 16:++a2
p=13
break
case 14:case 12:case 10:p=k5?18:19
break
case 18:j=q.v(k4)
d=A.h(j)
c=d.h("c<1>")
a5=A.n(new A.c(j,d.h("e(1)").a(new A.fk()),c),c.h("a.E"))
B.a.B(a5,new A.fv())
j=A.h(a5),d=A.a0(a5,0,A.Z(3,"count",t.S),j.c),c=d.$ti,d=new A.r(d,d.gl(0),c.h("r<k.E>")),a3=k3.cy,a4=k3.ax,a6=k3.d,a7=t.T,a8=t.w,a9=t.e,b0=j.h("e(1)"),j=j.h("c<1>"),c=c.h("k.E")
case 20:if(!d.j()){p=21
break}b1=d.d
if(b1==null)b1=c.a(b1)
if(!k7.X()){p=21
break}b2=q.M()
e=A.d([],a8)
b3=A.d([b1],a9)
B.a.G(b3,new A.c(a5,b0.a(new A.fG(b1)),j))
b1=b3.length,b4=b2.x,b5=0
case 22:if(!(b5<b3.length)){p=24
break}b6=b3[b5]
b7=b2.L(k4)
if(m){b8=b4.i(0,k4)
if(b8==null)b8=a6}else{b8=a3?1:0
b8=B.c.u(k8-a4-b8,0,5)}if(b7<=b8){p=24
break}if(!b2.bj(b6)){p=23
break}B.a.m(e,new A.y(B.v,b6.a,null,null,0,B.d))
p=m?25:26
break
case 25:b9=b2.M()
c0=A.n(e,a7)
b7=b9.v(k4)
b8=A.h(b7)
c1=b8.h("c<1>")
a0=A.n(new A.c(b7,b8.h("e(1)").a(new A.fI()),c1),c1.h("a.E"))
B.a.B(a0,new A.fJ())
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
if(!b9.aJ(k3,B.a.gD(a0)))break
B.a.m(c0,new A.y(B.l,B.a.gD(a0).a,k4,null,0,B.d));++c2}b8=b9.L(k4)
b7=b7.i(0,k4)
if(b7==null)b7=a6
p=b8<=b7&&b9.d>=b9.ae(!0).a?29:30
break
case 29:p=31
return l0.b=s.aA(r,q,b9,c0,"\u5148\u89e3\u96c7\u4f4e\u4ea4\u6362\u4ef7\u503c\u6321\u4f4d\u8005\u7b79\u8d44\uff0c\u4fdd\u7559\u4e3b\u6301\u8005\u5b8c\u6210\u6551\u57ce\u5347\u7ea7"),1
case 31:case 30:case 28:case 26:case 23:b3.length===b1||(0,A.v)(b3),++b5
p=22
break
case 24:b1=b2.L(k4)
if(m){b3=b4.i(0,k4)
if(b3==null)b3=a6}else{b3=a3?1:0
b3=B.c.u(k8-a4-b3,0,5)}p=b1<=b3?32:33
break
case 32:p=34
return l0.b=s.aA(r,q,b2,e,"\u6ca1\u6709\u53ef\u652f\u4ed8\u4e14\u53ca\u65f6\u7684\u5347\u7ea7\u65b9\u6848\uff0c\u6e05\u51fa\u6321\u4f4d\u5b88\u5c06\u5e76\u4fdd\u7559\u6838\u5fc3\u51fa\u573a"),1
case 34:case 33:p=20
break
case 21:case 19:j=q.v(k4)
d=A.h(j)
c=d.h("c<1>")
c3=A.n(new A.c(j,d.h("e(1)").a(new A.fK(q)),c),c.h("a.E"))
B.a.B(c3,new A.fL())
if(k9){k9=r.f
k9=(k9==null?null:k9.a)!==B.h}else k9=!0
p=k9&&s.a.Q.gN().gl(0)>1?35:36
break
case 35:c4=q.M()
k9=r.f
if((k9==null?null:k9.a)===B.r)c4.ax.m(0,k4)
c5=A.d([],k6)
k9=s.a.Q
j=k9.gN()
d=j.$ti
c=d.h("c<a.E>")
c6=A.n(new A.c(j,d.h("e(a.E)").a(new A.fM(k3)),c),c.h("a.E"))
B.a.B(c6,new A.fN(k3))
j=A.a0(c3,0,A.Z(l.w.fy,"count",t.S),A.h(c3).c),d=j.$ti,j=new A.r(j,j.gl(0),d.h("r<k.E>")),c=k3.cy,a3=k3.ax,a4=A.h(c6),a6=a4.c,a4=a4.h("w<1>"),a7=a4.h("r<k.E>"),a8=s.e,a9=a8.c,b0=s.f,b1=a4.h("k.E"),d=d.h("k.E"),b3=k3.d,b4=t.er,b7=t.bo,b8=t.i,c1=t.I
case 37:if(!j.j()){p=38
break}c7=j.d
if(c7==null)c7=d.a(c7)
if(!k7.X()){p=38
break}c8=new A.w(c6,0,4,a4)
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
d6=B.c.u(d5-d2-d6,0,5)
d2=d6}if(d4>=d2)continue
d7=a9.ak(c7,d1.e,k9,!0,d1)
d2=k5?"transfer":"evacuate"
d8=a8.aZ(c4,c7,d7,!0,r.ga6(),!0,"\u5728\u539f\u57ce\u5371\u9669\u7a97\u53e3\u524d\u8fdb\u9a7b\u5b89\u5168\u53cb\u57ce\uff0c\u6539\u53d8\u6240\u5c5e\u57ce\u4ee5\u4fdd\u5168\u5c06\u9886",d2,d1)
if(d8!=null)d1=d0==null||d8.a.d>d0.a.d
else d1=!1
if(d1)d0=d8}if(d0==null){p=37
break}c4=d0.a
B.a.m(c5,d0.b)
c7=c4.L(k4)
if(m){c8=c4.x.i(0,k4)
if(c8==null)c8=b3}else{c8=c?1:0
c8=B.c.u(k8-a3-c8,0,5)}p=c7<=c8?39:40
break
case 39:d9=new A.bS(c5,b4.a(new A.fl()),b7).E(0,0,new A.fm(s),b8)
c7=c4.M()
c8=A.n(c5,c1)
c9=s.a5(r,c4)
d1=isFinite(r.ga6())?"\u5b89\u5168\u5224\u65ad\u4ee5\u5b9e\u9645\u8fdb\u9a7b\u53cb\u57ce\u4e3a\u51c6\uff0c\u9014\u4e2d\u539f\u57ce\u5931\u5b88\u4ecd\u4f1a\u6e05\u9664\u90e8\u961f":"\u8f6c\u79fb\u5230\u5b89\u5168\u540e\u65b9\u6574\u5907"
p=41
return l0.b=new A.a7(c7,c8,c9+d9*0.65,!1,d1,"relocation"),1
case 41:if(k5){p=38
break}case 40:p=37
break
case 38:case 36:e0=s.cC(r,q)
e1=new A.fO(s,q)
k9=s.a.Q
j=k9.r
d=A.h(j)
c=d.h("c<1>")
e2=A.n(new A.c(j,d.h("e(1)").a(new A.fn(s,q,e1,e0)),c),c.h("a.E"))
B.a.B(e2,new A.fo(e1,k3))
j=r.d
d=j.length===0?0:l.w.fy
c=t.S
d=A.a0(e2,0,A.Z(d,"count",c),A.h(e2).c)
a3=d.$ti
d=new A.r(d,d.gl(0),a3.h("r<k.E>"))
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
c7=A.h(j)
c8=c7.h("p(1)")
c9=c7.h("O<1,p>")
d1=k3.e
d2=c7.c
c7=c7.h("w<1>")
d4=c7.h("r<k.E>")
d5=c7.h("k.E")
d6=c1==null
case 42:if(!d.j()){p=43
break}e3=d.d
if(e3==null)e3=a3.a(e3)
if(!k7.X()){p=43
break}e4=e3.c
e5=b1.i(0,e4)
e6=r.ga6()
e7=e5==null
if(e7)e8=null
else e8=e5.d.length!==0||e5.a.at!=null
e8=e8===!0?e5.ga6():1/0
e9=Math.min(e6,e8)
e6=!1
if(!e1.$1(e3)||e0){e8=s.a4(r,q)
if((e8==null?null:e8.a)!==B.h){e6=q.L(k4)
if(m){e8=b8.i(0,k4)
if(e8==null)e8=b7}else{e8=b3?1:0
e8=B.c.u(k8-b4-e8,0,5)}e8=e6<e8
e6=e8}}p=e6?44:45
break
case 44:f0=new A.O(j,c8.a(new A.fp()),c9).ag(0,new A.fq(s))
if(m){e6=b8.i(0,k4)
if(e6==null)e6=b7}else{e6=b3?1:0
e6=B.c.u(k8-b4-e6,0,5)}e8=k.i(0,"soldierLimit")
e8.toString
f1=a6.bi(e3,f0,f0.ok,e6,!1,Math.min(B.b.k(e8),q.e+e3.gP()))
e6=d6?null:c1.b
if(e6==null)e6=-1
p=f1.b>e6+0.05?46:47
break
case 46:d7=a7.ak(e3,d1,k9,!0,k3)
if(m){e6=b8.i(0,k4)
if(e6==null)e6=b7}else{e6=b3?1:0
e6=B.c.u(k8-b4-e6,0,5)}e8=s.a4(r,q)
e8=e8==null?null:e8.b
d8=a4.aZ(q,e3,d7,!0,e9,!0,"\u672c\u5730\u62b5\u6297\u4ecd\u6709\u7f3a\u53e3\uff08\u57ce\u9632"+e6+"\u7ea7\uff0c\u9632\u5b88\u4f59\u91cf"+B.b.bq((e8==null?-1:e8)*100)+"\u70b9\uff09\uff0c\u63f4\u519b\u7ea6"+B.b.aX(d7.b,1)+"\u79d2\u5230\u8fbe\uff0c\u5371\u9669\u7a97\u53e3"+B.b.aX(e9,1)+"\u79d2\uff0c\u9884\u7559\u5165\u57ce\u540d\u989d","rescue",k3)
if(d8!=null){e6=s.a4(r,d8.a)
e6=(e6==null?null:e6.a)===B.h}else e6=!1
p=e6?48:49
break
case 48:e6=d8.a
p=50
return l0.b=new A.a7(e6,A.d([d8.b],k6),s.a5(r,e6)-A.a4(e3)*0.08,!1,"","recall"),1
case 50:case 49:case 47:case 45:e6=new A.w(j,0,2,c7)
e6.U(j,0,2,d2)
e6=new A.r(e6,e6.gl(0),d4)
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
d7=a4.bl(e3,f4,q)
if(a6.cX(e3,f4,f4.ok,e8,a8.bf(f4.z)).a!==B.h){p=51
break}f6=e1.$1(e3)?"\u672c\u5730\u624b\u6bb5\u65e0\u6cd5\u62b5\u6321\u660e\u786e\u6765\u88ad\uff0c\u7d27\u6025\u622a\u51fb\u9884\u8ba1"+B.b.aX(d7.b,1)+"\u79d2\uff0c\u65e9\u4e8e\u654c\u519b"+B.b.aX(f3.b,1)+"\u79d2\u62b5\u57ce\uff1b\u6700\u540e\u624d\u6539\u6d3e\u8fdc\u5f81":"\u52a8\u7528\u9644\u8fd1\u95f2\u7f6e\u90e8\u961f\u622a\u51fb\u6765\u654c\uff0c\u4e0d\u6253\u65ad\u4e3b\u653b\u4efb\u52a1"
d8=a4.ck(q,e3,d7,f3.b,!0,f4,f6,"intercept",k3)
p=d8!=null?53:54
break
case 53:f3=d8.a
p=55
return l0.b=new A.a7(f3,A.d([d8.b],k6),s.a5(r,f3)+80-A.a4(e3)*0.08,k5,"","recall"),1
case 55:case 54:p=51
break
case 52:p=42
break
case 43:d=A.h(c3)
a3=d.h("c<1>")
f7=A.n(new A.c(c3,d.h("e(1)").a(new A.fr(s)),a3),a3.h("a.E"))
B.a.B(f7,new A.fs(s,q,k3))
if(c3.length>1){d=s.a4(r,q)
f8=(d==null?null:d.a)!==B.h}else f8=!1
d=A.a0(j,0,A.Z(2,"count",c),d2),c=d.$ti,d=new A.r(d,d.gl(0),c.h("r<k.E>")),a3=A.h(f7),a9=a3.c,a3=a3.h("w<1>"),b0=a3.h("r<k.E>"),b1=t.a,b8=t.H,c7=t.N,c8=t.dg,c9=t.cO,d1=t.Y,d2=t.T,d4=l.w,d5=d4.R8,e3=d4.p4,e4=t.p,l=l.r,e6=t.fR,e7=t.w,e8=t.e,f2=t.eV,f3=a3.h("k.E"),d4=d4.d,c=c.h("k.E")
case 56:if(!d.j()){p=57
break}f4=d.d
if(f4==null)f4=c.a(f4)
if(!f8||f4.a.k1!=null||s.bE(f4,q)){p=56
break}f6=new A.w(f7,0,4,a3)
f6.U(f7,0,4,a9)
f6=new A.r(f6,f6.gl(0),b0)
f9=f4.a
f4=f4.b
g0=f9.z
g1=f9.ok
g2=f9.p1
case 58:if(!f6.j()){p=59
break}g3=f6.d
if(g3==null)g3=f3.a(g3)
if(!k7.X()){p=59
break}g4=q.v(k4)
g5=A.h(g4)
g6=g5.h("c<1>")
g7=A.n(new A.c(g4,g5.h("e(1)").a(new A.ft(g3)),g6),g6.h("a.E"))
if(g7.length===0){p=58
break}g8=B.a.ag(g7,new A.fu(s,q,k3))
d7=a4.bl(g3,f9,q)
if(!d7.d||d7.b+d4>=f4){p=58
break}g9=A.d([new A.aW(q,A.d([],e7),A.d([],e8))],f2)
if(k5){g4=q.d
g5=k.i(0,"emergencyGold")
g5.toString
g5=g4<B.b.k(g5)+4
g4=g5}else g4=!1
if(g4){g4=A.h(g7)
g5=g4.h("c<1>")
h0=A.n(new A.c(g7,g4.h("e(1)").a(new A.fw(g8)),g5),g5.h("a.E"))
B.a.B(h0,new A.fx())
if(h0.length!==0&&k7.X()){b9=q.M()
if(b9.bj(B.a.gD(h0)))B.a.m(g9,new A.aW(b9,A.d([new A.y(B.v,B.a.gD(h0).a,null,null,0,B.d)],e7),A.d([B.a.gD(h0)],e8)))}}if(m){g4=q.v(k4)
g5=A.h(g4)
g6=g5.h("c<1>")
a0=A.n(new A.c(g4,g5.h("e(1)").a(new A.fy()),g6),g6.h("a.E"))
B.a.B(a0,new A.fz())
f=q.M()
if(a0.length!==0&&f.aJ(k3,B.a.gD(a0))&&f.d>=f.ae(!0).a)B.a.m(g9,new A.aW(f,A.d([new A.y(B.l,B.a.gD(a0).a,k4,null,0,B.d)],e7),A.d([],e8)))}g4=A.n(g9,e6)
g5=g4.length
b5=0
for(;b5<g4.length;g4.length===g5||(0,A.v)(g4),++b5){h1=g4[b5]
h=h1.a.M()
if(m){g6=h.x.i(0,k4)
if(g6==null)g6=b7}else{g6=b3?1:0
g6=B.c.u(k8-b4-g6,0,5)}h2=Math.min(g6,h.v(k4).length-1)
g6=h.f
h3=k.i(0,"soldierLimit")
h3.toString
h4=Math.min(g6,(h2+1)*B.b.k(h3))-h.e
if(h4>0&&h.aC(h4)&&h.d>=h.ae(!0).a){g6=A.n(h1.b,d2)
g6.push(new A.y(B.m,null,k4,null,h4,B.d))
B.a.m(g9,new A.aW(h,g6,h1.c))}}g4=g9.length,g5=g3.w<=e3,g6=g3.f,h3=g8===null,h5=!h3,b5=0
case 60:if(!(b5<g9.length)){p=62
break}h6=g9[b5]
h7=h6.a
h8=l.gaq()
h9=A.l(h8)
i0=h9.h("c<a.E>")
i1=A.n(new A.c(h8,h9.h("e(a.E)").a(new A.fA(s,h7)),i0),i0.h("a.E"))
B.a.B(i1,new A.fB())
h8=A.d([],e4)
if(i1.length!==0)h8.push(A.d([B.a.gD(i1).a],b1))
h8.push(A.d([],b1))
h9=h8.length
i0=h6.c
i2=J.aP(i0)
i3=h6.b
i4=J.aP(i3)
i5=h7.x
i6=0
case 63:if(!(i6<h8.length)){p=65
break}i7=h8[i6]
i8=a8.bf(g0)
i9=k.i(0,"soldierLimit")
i9.toString
f1=a6.d0(g3,f9,g1,i7,!0,Math.min(B.b.k(i9),h7.e),i8)
j0=f1.a===B.h
i8=!j0
i9=!1
if(i8)if(B.a.ga0(i7))if(h5)if(g1)if(g2){i9=k.i(0,"soldierHp")
i9.toString
i9=f1.f>=B.b.k(i9)}if(i9){if(m){i9=i5.i(0,k4)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.u(k8-b4-i9,0,5)}j1=k.i(0,"soldierLimit")
j1.toString
j2=a6.bh(g8,f9,i9,B.b.k(j1))
if(m){i9=i5.i(0,k4)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.u(k8-b4-i9,0,5)}j1=k.i(0,"soldierLimit")
j1.toString
j3=a6.d_(g8,f9,B.d,!1,i9,B.b.k(j1)).b-j2.b
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
i9=j1}if(i9){i9=h7.v(k4)
j1=A.h(i9)
j5=j1.h("c<1>")
i9=A.n(new A.c(i9,j1.h("e(1)").a(new A.fC(g3)),j5),j5.h("a.E"))
j0=!1
j1=A.h(i9).h("J<1>")
i9=new A.J(i9,j1)
if(m){j5=i5.i(0,k4)
if(j5==null)j5=b7}else{j5=b3?1:0
j5=B.c.u(k8-b4-j5,0,5)}j6=new A.w(i9,0,j5,j1.h("w<k.E>"))
j6.U(i9,0,j5,j1.h("k.E"))
j7=B.a.dc(j6.ab(0),new A.fD(g8))
if(j7<0){p=64
break}i9=h7.e
j1=k.i(0,"soldierLimit")
j1.toString
j8=Math.max(0,i9-(j7+1)*B.b.k(j1))
if(m){i9=i5.i(0,k4)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.u(k8-b4-i9,0,5)}j1=k.i(0,"soldierLimit")
j1.toString
j2=a6.bh(g8,f9,i9,Math.min(B.b.k(j1),j8))
if(m){i9=i5.i(0,k4)
if(i9==null)i9=b7}else{i9=b3?1:0
i9=B.c.u(k8-b4-i9,0,5)}j1=k.i(0,"soldierLimit")
j1.toString
j5=f1.d
j9=a6.cY(g8,f9,j5,i9,Math.min(B.b.k(j1),j8))
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
break}if(B.a.ga0(i7)&&j3>0)i8="\u4f4e\u653b\u51fb\u4e14\u975e\u9ad8\u5185\u653f\u5c06\u9886\u51fa\u57ce\u5438\u6536\u6765\u654c\u5f00\u573a\u6b66\u5668\uff0c\u4fdd\u7559\u4e3b\u529b\u548c\u57ce\u9632\uff0c\u7b49\u5f85\u5b9e\u9645\u6218\u679c\u518d\u590d\u6838"
else i8=j3>0?"\u4f4e\u653b\u51fb\u5c06\u9886\u643a\u4e00\u4ef6\u5f3a\u6b66\u5668\u6d88\u8017\u6765\u654c\uff0c\u4fdd\u7559\u9ad8\u653b\u51fb\u5b88\u5c06\u4e0e\u57ce\u9632\u63a5\u6218":"\u4f4e\u653b\u51fb\u4f59\u5c06\u643a\u5f53\u524d\u6700\u5f3a\u6b66\u5668\u8fce\u6218\uff0c\u4fdd\u7559\u57ce\u5185\u4e3b\u529b\u63a5\u654c"
i9=j3>0
if(h3)j1=0
else{j1=k.i(0,"soldierLimit")
j1.toString
j1=Math.min(B.b.k(j1),h7.e)}d8=a4.cf(h7,g3,d7,i9,f4,!0,f9,i7,j1,i8,"intercept",k3)
if(d8==null){p=64
break}i8=d8.a
k0=i8.L(k4)
j1=d8.b
j5=A.n(i3,d2)
B.a.G(j5,j1.b)
j6=A.jo(c7,c7)
j6.G(0,j1.c)
j6.G(0,a4.a7(new A.by(i4.aG(i3,new A.fE(s),c8),c9),A.d([],d1)))
j1=A.d([new A.M(j1.a,j5,j6,j1.d,j1.e,!0)],k6)
j6=s.a5(r,i8)
j5=Math.max(0,q.d-i8.d)
i9=i9?A.a4(g3)*0.5:0
k1=i2.E(i0,0,new A.fF(),b8)
if(m){k2=i8.x.i(0,k4)
if(k2==null)k2=b7}else{k2=b3?1:0
k2=B.c.u(k8-b4-k2,0,5)}k2=k0>k2||!j4
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
case 57:if(k9.gN().gl(0)===1)l=(d6?null:c1.a)===B.r&&c3.length>1
else l=!1
p=l?67:68
break
case 67:l=k9.f,k=A.h(l),j=k.h("c<1>"),j=A.lK(new A.c(l,k.h("e(1)").a(new A.fH(s)),j),3,j.h("a.E")),k=j.a,j=new A.bb(k.gC(k),j.b,A.l(j).h("bb<1>"))
case 69:if(!j.j()){p=70
break}l=j.gp()
if(!k7.X()){p=70
break}b6=B.a.gD(c3)
d8=a4.ci(q,b6,a7.ak(b6,l.e,k9,!0,l),r.ga6(),!0,"\u4fdd\u7559\u539f\u57ce\u5b88\u519b\u62d6\u5ef6\uff0c\u6838\u5fc3\u5728\u5371\u9669\u7a97\u53e3\u524d\u593a\u53d6\u7a7a\u57ce\u5efa\u7acb\u65b0\u636e\u70b9","newBase",l)
p=d8!=null?71:72
break
case 71:l=d8.a
k=A.d([d8.b],k6)
d=s.a5(r,l)
c=A.a4(b6)
a3=l.L(k4)
if(m){a6=l.x.i(0,k4)
if(a6==null)a6=b7}else{a6=b3?1:0
a6=B.c.u(k8-b4-a6,0,5)}p=73
return l0.b=new A.a7(l,k,d+c*1.2,a3>a6,"","relocation"),1
case 73:case 72:p=69
break
case 70:case 68:case 1:return 0
case 2:return l0.c=n.at(-1),3}}}},
aA(a,b,c,d,e){var s,r,q,p,o,n,m=this
t.f3.a(d)
s=A.h(d)
r=s.h("p?(1)").a(new A.fU(m))
q=c.z.d7(b.z).E(0,0,new A.fV(m),t.i)
p=c.M()
o=A.n(d,t.T)
s=A.n(new A.by(new A.O(d,r,s.h("O<1,p?>")),t.cO),t.r)
r=a.d
n=A.h(r)
B.a.G(s,new A.O(r,n.h("p(1)").a(new A.fW()),n.h("O<1,p>")))
n=a.a
s=A.d([new A.M(e,o,m.e.a7(s,A.d([n],t.Y)),B.q,c.ae(!0).a,!0)],t.Z)
o=m.a5(a,c)
r=Math.max(0,b.d-c.d)
if(c.L(n.a)<=c.O(n)){n=m.a4(a,c)
n=(n==null?null:n.a)!==B.h}else n=!0
return new A.a7(p,s,o-q*0.65-r*0.2,n,"","local")},
bE(a,b){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=b.y,s=new A.ai(s,s.r,s.e,A.l(s).h("ai<2>")),r=this.e,q=a.a,p=q.a,o=this.a.Q,n=o.b,m=b.z,l=this.b.w.d,k=a.b;s.j();){j=s.d
if(j.b!=="intercept"||j.r!==p||j.y<=n)continue
i=o.a_(j.a)
if(i==null||i.f<=0||i.fy||m.n(0,i.a))continue
if(i.k1===p)return!0
if(!i.dx||j.z<=n)continue
h=r.bl(i,q,b)
if(h.d&&h.b+l<k)return!0}return!1},
cC(a,b){var s,r
if(this.c.e)return!1
s=a.a
if(!(s.at!=null||B.a.I(a.d,new A.fP())))return!1
if(b.v(s.a).length===0)return!0
r=this.a4(a,b)
return r!=null&&r.c<-this.b.w.p3},
a4(b3,b4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1=null,b2=b3.d
if(b2.length===0)return b1
s=b3.a
r=s.a
q=b4.v(r)
p=b4.e
for(o=b4.y,o=new A.ai(o,o.r,o.e,A.l(o).h("ai<2>")),n=t.N,m=t.z,l=t.n,k=b0.e.c,j=b0.a.Q,i=j.b,h=b4.z,g=b0.b,f=g.w.d;o.j();){e=o.d
if(!e.as||e.d!==r||e.y<i)continue
d=j.a_(e.a)
if(d==null||d.fy||d.k1!=null||d.f<=0||h.n(0,d.a)||B.a.I(q,new A.fQ(d)))continue
c=d.z
for(e=J.jO(e.w,e.x),b=e.$ti,e=new A.r(e,e.gl(0),b.h("r<k.E>")),b=b.h("k.E"),a=0;e.j();c=a1){a0=e.d
a1=a0==null?b.a(a0):a0
a+=k.W(c,a1)}if(!isFinite(a)||a+f>=b3.ga6())continue
p=Math.min(b4.f,p+d.gP())
e=A.aq(d.H(),n,m)
e.A(0,"hp",d.r)
e.A(0,"troops",A.d([],l))
e.A(0,"s",0)
B.a.m(q,A.jP(e))}B.a.B(q,new A.fR())
o=A.h(q)
n=t.r
a2=A.b4(new A.c(q,o.h("e(1)").a(new A.fS(b3)),o.h("c<1>")),n)
m=A.d([],t.e)
if(a2!=null)m.push(a2)
o=o.h("J<1>")
B.a.G(m,new A.J(q,o).bw(0,o.h("e(k.E)").a(new A.fT(a2))))
a3=A.a0(m,0,A.Z(b4.O(s),"count",t.S),n).ab(0)
if(a3.length===0)return b1
for(o=b0.d,n=s.d,m=b4.x,g=g.b,l=s.cy,k=s.ax,s=s.at,j=s==null,a4=b1,a5=0;a5<a3.length;++a5){d=a3[a5]
if(d.as===B.e)a6=0
else{i=g.i(0,"soldierLimit")
i.toString
a6=Math.min(p,B.b.k(i)-d.gP())}p-=a6
for(i=b2.length,a7=b1,a8=0;a8<b2.length;b2.length===i||(0,A.v)(b2),++a8){h=b2[a8].a
if(j){f=m.i(0,r)
if(f==null)f=n}else{f=l?1:0
f=B.c.u(s-k-f,0,5)}a9=o.bi(d,h,h.ok,Math.max(1,f-a5),!1,d.gP()+a6)
if(a7==null||a9.b<a7.b)a7=a9}if(a4==null||a7.b>a4.b)a4=a7}return a4},
a5(a,b){var s=a.a,r=b.L(s.a),q=Math.max(0,r-b.O(s)),p=this.a.Q.gN().gl(0)===1?400:0,o=150+s.r*4+a.r*0.5+p,n=this.a4(a,b)
s=r===0?o*2:0
p=n==null?null:n.b
if(p==null)p=-0.8
return-q*5000-s+p*o}}
A.h1.prototype={
$1(a){return this.a.bE(t.O.a(a),this.b)},
$S:12}
A.h2.prototype={
$1(a){t.J.a(a)
return a.f&&B.a.I(this.a.d,new A.h0(a))},
$S:11}
A.h0.prototype={
$1(a){return t.O.a(a).a.a===this.a.r},
$S:12}
A.h3.prototype={
$1(a){var s,r,q,p,o,n=this
t.cs.a(a)
s=!1
if(a.f==="local"){r=a.b
if(r.length!==0)if(B.a.I(r,new A.fZ())){q=a.a
p=n.b
o=p.a
if(q.L(o.a)<=q.O(o)){s=n.a
q=s.a4(p,q)
q=q==null?null:q.b
if(q==null)q=-1
o=n.c
o=o==null?null:o.b
s=(q>(o==null?-1:o)+0.04||B.a.I(r,new A.h_()))&&a.c>s.a5(p,n.d)}}}return s},
$S:36}
A.fZ.prototype={
$1(a){return B.a.I(t.I.a(a).b,new A.fY())},
$S:30}
A.fY.prototype={
$1(a){var s=t.T.a(a).a
return s===B.l||s===B.m||s===B.C},
$S:29}
A.h_.prototype={
$1(a){return B.a.I(t.I.a(a).d,new A.fX())},
$S:30}
A.fX.prototype={
$1(a){return t.J.a(a).b==="intercept"},
$S:11}
A.fi.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.fj.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fk.prototype={
$1(a){t.r.a(a)
return a.dy&&a.e!==2},
$S:0}
A.fv.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.a4(a),A.a4(b))},
$S:2}
A.fG.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fI.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.fJ.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fK.prototype={
$1(a){t.r.a(a)
return a.db&&!this.a.as.n(0,a.a)},
$S:0}
A.fL.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.a4(s.a(b)),A.a4(a))},
$S:2}
A.fM.prototype={
$1(a){return t.q.a(a).a!==this.a.a},
$S:1}
A.fN.prototype={
$2(a,b){var s=t.q
s.a(a)
s.a(b)
s=this.a.e
return B.b.t(a.e.K(s),b.e.K(s))},
$S:4}
A.fl.prototype={
$1(a){return t.I.a(a).d},
$S:39}
A.fm.prototype={
$2(a,b){var s
A.aw(a)
s=this.a.a.Q.a_(t.J.a(b).a)
s.toString
return a+A.a4(s)},
$S:40}
A.fO.prototype={
$1(a){var s,r,q=this.a.a.Q,p=this.b
if(A.jD(a,q,p)==null){p=p.y
s=a.a
r=p.i(0,s)
if((r==null?null:r.b)==="intercept"){p=p.i(0,s)
q=q.a_(p==null?null:p.r)
q=q==null?null:q.f
q=(q==null?0:q)>0}else q=!1}else q=!0
return q},
$S:0}
A.fn.prototype={
$1(a){var s,r,q,p,o=this
t.r.a(a)
s=!1
if(a.b===o.a.a.Q.a)if(a.dx)if(!a.fy){r=o.b
q=a.a
p=r.y.i(0,q)
if((p==null?null:p.as)!==!0)if(!r.as.n(0,q))s=!o.c.$1(a)||o.d}return s},
$S:0}
A.fo.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a
if(!J.am(s.$1(a),s.$1(b)))return s.$1(a)?1:-1
s=this.b.e
return B.b.t(a.z.K(s),b.z.K(s))},
$S:2}
A.fp.prototype={
$1(a){return t.O.a(a).a},
$S:20}
A.fq.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
s=this.a.b
return A.kE(a,s)>A.kE(b,s)?a:b},
$S:18}
A.fr.prototype={
$1(a){t.r.a(a)
return a.w<=this.a.b.w.p4&&a.x<15},
$S:0}
A.fs.prototype={
$2(a,b){var s,r,q,p=t.r
p.a(a)
p.a(b)
p=this.a.b
s=p.w.p4
r=a.w<=s
if(r!==b.w<=s)return r?-1:1
s=this.b
q=this.c
return B.b.t(A.ds(a,p,s.O(q),4),A.ds(b,p,s.O(q),4))},
$S:2}
A.ft.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fu.prototype={
$2(a,b){var s,r,q=t.r
q.a(a)
q.a(b)
q=this.a.b
s=this.b
r=this.c
return A.ds(a,q,s.O(r),4)>A.ds(b,q,s.O(r),4)?a:b},
$S:18}
A.fw.prototype={
$1(a){t.r.a(a)
return a!==this.a&&a.dy&&a.e!==2},
$S:0}
A.fx.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.a4(a),A.a4(b))},
$S:2}
A.fy.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.fz.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.fA.prototype={
$1(a){var s
t.o.a(a)
s=this.b.w.i(0,a.a)
if((s==null?0:s)<=0)s=a.f&&this.a.a.Q.c>=a.e
else s=!0
return s},
$S:10}
A.fB.prototype={
$2(a,b){var s=t.o
s.a(a)
return B.c.t(s.a(b).c,a.c)},
$S:19}
A.fC.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.fD.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fE.prototype={
$1(a){return this.a.a.Q.a_(t.T.a(a).b)},
$S:33}
A.fF.prototype={
$2(a,b){return A.x(a)+A.a4(t.r.a(b))*0.65},
$S:46}
A.fH.prototype={
$1(a){var s
t.q.a(a)
s=this.a.a.Q
return a.b!==s.a&&s.v(a.a).length===0},
$S:1}
A.fU.prototype={
$1(a){return this.a.a.Q.a_(t.T.a(a).b)},
$S:33}
A.fV.prototype={
$2(a,b){var s
A.aw(a)
s=this.a.a.Q.a_(A.H(b))
s.toString
return a+A.a4(s)},
$S:47}
A.fW.prototype={
$1(a){return t.O.a(a).a},
$S:20}
A.fP.prototype={
$1(a){var s,r,q
t.O.a(a)
s=a.a
r=s.as
if(r!==B.x){q=!1
if(a.c>=0.9)if(r!==B.k){s=s.Q
s=Math.abs(s.a)+Math.abs(s.b)>0.01}else s=q
else s=q}else s=!0
return s},
$S:12}
A.fQ.prototype={
$1(a){return t.r.a(a).a===this.a.a},
$S:0}
A.fR.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.fS.prototype={
$1(a){return t.r.a(a).a===this.a.a.ch},
$S:0}
A.fT.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.K.prototype={
H(){return A.d([this.a,this.b],t.n)},
K(a){var s=this.a-a.a,r=this.b-a.b
return Math.sqrt(s*s+r*r)},
aF(a,b){var s=this.a,r=this.b
return new A.K(s+(a.a-s)*b,r+(a.b-r)*b)}}
A.ec.prototype={
a3(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this.a,f=B.a.gD(g)
for(s=a.a,r=a.b,q=1/0,p=0;o=g.length,p<o;){n=g[p];++p
m=g[p%o]
o=n.a
l=m.a-o
k=n.b
j=m.b-k
i=n.aF(m,B.b.u(((s-o)*l+(r-k)*j)/(l*l+j*j),0,1))
h=i.K(a)
if(h<q){q=h
f=i}}return f},
n(a,b){var s,r,q,p,o,n,m,l,k,j,i
if(this.a3(b).K(b)<1e-7)return!0
for(s=this.a,r=s.length,q=b.b,p=b.a,o=!1,n=0;n<r;){m=s[n];++n
l=s[n%r]
k=m.b
j=l.b
if(k>q!==j>q){i=m.a
i=p<(l.a-i)*(q-k)/(j-k)+i
k=i}else k=!1
if(k)o=!o}return o},
c3(a,b){var s
if(this.n(0,a))return null
s=this.c0(a,b)
return s.length===0?null:B.a.ag(s,B.z)},
c0(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=a.a,g=b.a-h,f=a.b,e=b.b-f,d=A.d([],t.n)
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
if(j>=-1e-7&&j<=1.0000001&&i>=-1e-7&&i<=1.0000001)B.a.m(d,B.b.u(j,0,1))}return d},
bU(a,b){var s,r=this
if(r.n(0,a))return r.a3(a)
s=r.c3(a,b)
return s==null?r.a3(a):a.aF(b,s)},
c1(a,b){var s=a.K(b),r=s<1e-7?new A.K(a.a+4096,a.b+0):a.aF(b,4096/s),q=this.c0(a,r)
return q.length===0?this.a3(b):a.aF(r,B.a.ag(q,B.G))}}
A.ak.prototype={
aO(){return"AiArmyState."+this.b}}
A.p.prototype={
gP(){var s=this.at,r=A.h(s)
return new A.c(s,r.h("e(1)").a(new A.dv()),r.h("c<1>")).gl(0)},
gbk(){return this.f+B.a.E(this.at,0,new A.du(),t.H)},
H(){var s,r,q,p,o,n,m,l=this,k=l.z,j=t.n
k=A.d([k.a,k.b],j)
s=l.Q
s=A.d([s.a,s.b],j)
r=l.CW
r=r==null?null:A.d([r.a,r.b],j)
q=A.d([],t.b)
for(p=l.p2,o=p.length,n=0;n<p.length;p.length===o||(0,A.v)(p),++n){m=p[n]
q.push(A.d([m.a,m.b],j))}return A.R(["id",l.a,"c",l.b,"home",l.c,"o",l.d,"t",l.e,"hp",l.f,"max",l.r,"a",l.w,"p",l.x,"pay",l.y,"xy",k,"v",s,"s",l.as.a,"troops",l.at,"w",l.ax,"m",l.ay,"due",l.ch,"to",r,"target",l.cx,"return",l.cy,"dispatch",l.db,"move",l.dx,"dismiss",l.dy,"upgrade",l.fr,"retreat",l.fx,"marked",l.fy,"rev",l.go,"orderRev",l.id,"opponent",l.k1,"clashes",l.k2,"received",l.k3,"dealt",l.k4,"opening",l.ok,"weaponReady",l.p1,"returnPath",q,"regionCity",l.p3,"salaryPaidMonth",l.p4,"movementPending",l.R8],t.N,t.X)}}
A.dv.prototype={
$1(a){return A.aw(a)>0},
$S:14}
A.du.prototype={
$2(a,b){return A.x(a)+A.aw(b)},
$S:15}
A.Q.prototype={
gad(){var s,r=this,q=r.at
if(q==null)q=r.d
else{s=r.cy?1:0
s=B.c.u(q-r.ax-s,0,5)
q=s}return q},
H(){var s,r,q,p,o,n=this,m=n.e,l=t.n
m=A.d([m.a,m.b],l)
s=A.d([],t.b)
for(r=n.f.a,q=r.length,p=0;p<r.length;r.length===q||(0,A.v)(r),++p){o=r[p]
s.push(A.d([o.a,o.b],l))}return A.R(["id",n.a,"c",n.b,"native",n.c,"level",n.d,"xy",m,"outline",s,"income",n.r,"baseIncome",n.z,"poor",n.w,"cap",n.x,"recruitCap",n.y,"recruit",n.Q,"rev",n.as,"initial",n.at,"wins",n.ax,"attacker",n.ay,"defender",n.ch,"stage",n.CW,"next",n.cx,"fallen",n.cy,"danger",n.db],t.N,t.X)}}
A.b0.prototype={
H(){var s,r,q=this,p=t.N,o=t.S,n=A.Y(p,o)
for(s=q.w.gai(),s=s.gC(s);s.j();){r=s.gp()
n.A(0,""+r.a,r.b)}o=A.Y(p,o)
for(s=q.x.gai(),s=s.gC(s);s.j();){r=s.gp()
o.A(0,""+r.a,r.b)}return A.R(["id",q.a,"gold",q.b,"reserves",q.c,"capacity",q.d,"salary",q.e,"poor",q.f,"garrisonAccrued",q.r,"stock",n,"hate",o],p,t.X)}}
A.e4.prototype={
gav(){return B.a.ap(this.w,new A.ea(this))},
gN(){var s=this.f,r=A.h(s)
return new A.c(s,r.h("e(1)").a(new A.eb(this)),r.h("c<1>"))},
v(a){var s=this.r,r=A.h(s),q=r.h("c<1>")
s=A.n(new A.c(s,r.h("e(1)").a(new A.e7(this,a)),q),q.h("a.E"))
B.a.B(s,new A.e8())
return s},
a_(a){var s=this.r,r=A.h(s)
return A.b4(new A.c(s,r.h("e(1)").a(new A.e9(a)),r.h("c<1>")),t.r)},
J(a){var s=this.f,r=A.h(s)
return A.b4(new A.c(s,r.h("e(1)").a(new A.e5(a)),r.h("c<1>")),t.q)},
H(){var s,r,q,p,o=this,n=t.d,m=A.d([],n)
for(s=o.f,r=s.length,q=0;q<r;++q)m.push(s[q].H())
s=A.d([],n)
for(r=o.r,p=r.length,q=0;q<p;++q)s.push(r[q].H())
n=A.d([],n)
for(r=o.w,p=r.length,q=0;q<p;++q)n.push(r[q].H())
return A.R(["country",o.a,"tick",o.b,"month",o.e,"cities",m,"heroes",s,"countries",n,"pool",o.x,"salary",o.y,"year",o.c,"monthIndex",o.d],t.N,t.X)}}
A.ea.prototype={
$1(a){return t.t.a(a).a===this.a.a},
$S:8}
A.eb.prototype={
$1(a){return t.q.a(a).b===this.a.a},
$S:1}
A.e7.prototype={
$1(a){var s,r
t.r.a(a)
s=this.b
if(a.c===s){r=a.as
s=(r===B.f||r===B.e)&&a.f>0&&a.b===B.a.ap(this.a.f,new A.e6(s)).b}else s=!1
return s},
$S:0}
A.e6.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.e8.prototype={
$2(a,b){var s=t.r
return B.c.t(s.a(a).d,s.a(b).d)},
$S:2}
A.e9.prototype={
$1(a){return t.r.a(a).a===this.a},
$S:0}
A.e5.prototype={
$1(a){return t.q.a(a).a===this.a},
$S:1}
A.hh.prototype={
cn(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
for(s=this.b,r=s.y,r=new A.ai(r,r.r,r.e,A.l(r).h("ai<2>")),q=this.f,p=this.a,o=p.a,n=s.z,s=s.Q;r.j();){m=r.d
l=p.a_(m.a)
k=p.J(m.d)
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
J.l1(q.dk(k.a,new A.hj()),l)}},
gaV(){var s,r,q,p=this,o=p.d
if(o==null||p.f.a!==0)return o
s=new A.hn(p)
r=p.a
if(A.aA(o,r,p.c,null).gY())return s.$1(o)?o:null
r=r.f
q=A.h(r)
return new A.O(r,q.h("b(1)").a(new A.hl()),q.h("O<1,b>")).dz(0).I(0,new A.hm(p,s))?null:o},
gc8(){var s,r=this
if(r.gaV()!=null){s=r.a.J(r.e)
s=s==null?null:s.b
s=s==r.gaV()}else s=!1
return s?r.e:null},
ga1(){var s=this.f,r=A.l(s).h("a8<1>"),q=A.n(new A.a8(s,r),r.h("a.E"))
B.a.B(q,new A.hr(this))
return A.b4(q,t.S)},
gc6(){var s,r=this,q=r.ga1()
if(q!=null){s=r.c.w
s=r.a.d>=s.k2&&r.f.a<s.k1&&r.d2(q)>=s.k3}else s=!0
return s},
aB(a){var s,r,q,p=this
if(p.ga1()==null)return!0
s=!1
if(p.gaV()!=null)if(a.b!==p.gaV())s=p.ga1()==null||!p.gc6()
if(s)return!1
r=p.ga1()
if(r==null)r=p.gc8()
s=!0
if(r!=null){q=a.a
if(q!==r)s=p.ga1()!=null&&!p.f.a2(q)&&p.gc6()}return s},
d2(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c="soldierLimit",b=d.a,a=b.J(a0)
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
o+=d.bN(m,k,0)}j=B.a.ap(b.w,new A.hk(a)).c
for(b=b.v(a0),s=A.h(b).h("J<1>"),s=A.a0(new A.J(b,s),0,A.Z(a.gad(),"count",t.S),s.h("k.E")),b=s.$ti,s=new A.r(s,s.gl(0),b.h("r<k.E>")),r=a.cy,q=a.at,l=a.ax,i=q==null,b=b.h("k.E"),a=a.d,h=0,g=0;s.j();){f=s.d
if(f==null)f=b.a(f)
e=p.i(0,c)
e.toString
k=Math.min(B.b.k(e),f.gP()+j)
j-=k-f.gP()
if(i)e=a
else{e=r?1:0
e=B.c.u(q-l-e,0,5)}h+=d.bN(f,k,Math.max(1,e-g));++g}return h===0?1/0:o/h},
bN(a,b,c){var s,r=this.c,q=r.bX(a.w,c,!1)
r=r.b
s=r.i(0,"soldierPower")
s.toString
s=B.b.k(s)
r=r.i(0,"soldierHp")
r.toString
return(a.f+b*B.b.k(r))*(B.c.be(q+b*s+2,4)+1)*(1+a.ay/1000)}}
A.hi.prototype={
$1(a){var s=t.q.a(a).b
return s===this.a&&s!==this.b.a},
$S:1}
A.hj.prototype={
$0(){return A.d([],t.e)},
$S:55}
A.hn.prototype={
$1(a){var s=this.a,r=s.a.f,q=A.h(r)
return new A.c(r,q.h("e(1)").a(new A.hp(a)),q.h("c<1>")).I(0,new A.hq(s))},
$S:17}
A.hp.prototype={
$1(a){return t.q.a(a).b===this.a},
$S:1}
A.hq.prototype={
$1(a){var s
t.q.a(a)
s=this.a
return s.a.gN().I(0,new A.ho(s,a))},
$S:1}
A.ho.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.b.c.W(r,this.b.f.a3(r))<=s.c.w.at},
$S:1}
A.hl.prototype={
$1(a){return t.q.a(a).b},
$S:49}
A.hm.prototype={
$1(a){var s
A.f(a)
s=this.a
return A.aA(a,s.a,s.c,null).gY()&&this.b.$1(a)},
$S:17}
A.hr.prototype={
$2(a,b){var s,r
A.f(a)
A.f(b)
s=this.a.f
r=B.c.t(s.i(0,b).length,s.i(0,a).length)
return r!==0?r:B.c.t(a,b)},
$S:23}
A.hk.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:8}
A.d5.prototype={}
A.hs.prototype={
c4(a){var s=this.a.Q
return!A.aA(a.b,s,this.b,null).gY()||s.gN().I(0,new A.hv(this,a))},
aD(a,b){var s,r=this.b
if(A.aA(b.b,this.a.Q,r,null).gY()){s=a.z
r=this.c.W(s,b.f.a3(s))<=r.w.at}else r=!0
return r},
bo(a,b,c,d){var s,r,q,p=a.as
if(!(p===B.f||p===B.e)){p=a.ax
s=t.p
return p.length===0?A.d([],s):A.d([p],s)}p=this.b.r.gaq()
s=A.l(p)
r=s.h("c<a.E>")
q=A.n(new A.c(p,s.h("e(a.E)").a(new A.hy(this,b,a)),r),r.h("a.E"))
B.a.B(q,new A.hz())
if(q.length===0)return A.d([],t.p)
return A.d([A.d([B.a.gD(q).a],t.a)],t.p)},
aW(a,b,c){var s,r,q,p,o,n,m,l,k=this
if(a!==0){s=k.a.Q
s=s.c<3||b.gad()<3||s.v(b.a).length<2}else s=!0
if(s)return a
s=k.b
r=s.r.gaq()
q=A.l(r)
p=t.S
o=new A.c(r,q.h("e(a.E)").a(new A.hA(k)),q.h("c<a.E>")).E(0,0,new A.hB(),p)
q=k.a.Q.r
r=A.h(q)
n=r.h("e(1)")
r=r.h("c<1>")
m=new A.c(q,n.a(new A.hC(k,new A.c(q,n.a(new A.hD(k)),r).E(0,0,new A.hE(),p),c,b)),r).gl(0)
l=Math.max(0,c.d-c.T().a-20)
r=s.b.i(0,"soldierLimit")
r.toString
return Math.max(a,Math.min(s.w.fy,Math.min(m,B.c.aM(l,Math.max(1,o+B.b.k(r))))))},
d6(a){var s,r,q,p,o,n=this.a.Q
if(n.c<3)return 1
s=this.b
r=s.r.gaq()
q=A.l(r)
p=new A.c(r,q.h("e(a.E)").a(new A.ht(this)),q.h("c<a.E>")).E(0,0,new A.hu(),t.S)
q=s.w
r=Math.max(0,a.d-a.T().a-q.f)
s=s.b
o=s.i(0,"drawCost")
o.toString
o=B.b.k(o)
s=s.i(0,"soldierLimit")
s.toString
return Math.max(1,Math.min(q.fy,B.b.aM(r,Math.max(1,p+o+n.y+B.b.k(s)))))},
a7(a,b){var s,r,q,p,o
t.ef.a(a)
t.fy.a(b)
s=t.N
s=A.Y(s,s)
for(r=J.E(a);r.j();){q=r.gp()
s.A(0,"h:"+q.a,q.go)}for(r=b.length,p=0;p<b.length;b.length===r||(0,A.v)(b),++p){o=b[p]
s.A(0,"c:"+o.a,o.as)}return s},
ah(b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=this,a9=null
t.L.a(b8)
if(!b2.d||!isFinite(b2.b)||J.ji(b2.a)||b1.fy||b0.as.n(0,b1.a))return a9
s=b2.b
r=a8.b
q=r.w
p=q.d
o=s+p
if(o>=b5)return a9
n=c3==="expedition"
if(n&&A.aA(c4.b,a8.a.Q,r,a9).gY()&&s>q.at)return a9
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
i=J.cy(j)
j=i.gar(j)&&i.gau(j).K(J.l5(b2.a))<32&&b1.as!==B.k}}}}if(j)return a9}h=b0.M()
g=A.d([],t.w)
j=!b3
if(j){i=r.b
f=i.i(0,"battleBudget")
f.toString
e=b4?1:c4.gad()
e=Math.min(e,a8.a.Q.v(c4.a).length)
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
p=B.b.am(isFinite(b5)?b5*60:(Math.max(o,60)+q.cx+p)*60)
b=B.b.bq(q.CW*60)
a=b2.a
r=r.b
a0=r.i(0,"supplySeconds")
a0.toString
a0=B.b.am(o/a0)
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
if(a3>0){if(e.x===B.n)return a9
if(!h.aC(a3))return a9
B.a.m(g,new A.y(B.m,a9,b1.c,a9,a3,B.d))}r=t.S
a4=A.Y(r,r)
for(r=b8.length,q=h.w,e=e.x===B.n,a5=0;a5<b8.length;b8.length===r||(0,A.v)(b8),++a5){a6=b8[a5]
a4.aI(a6,new A.hF(),new A.hG())
p=q.i(0,a6)
if(p==null)p=0
n=a4.i(0,a6)
n.toString
if(p<n){if(e)return a9
if(!h.bZ(a6))return a9
B.a.m(g,new A.y(B.B,a9,a9,a9,a6,B.d))}}if(!h.d5(b1,b8,a2,o))return a9
if(h.e<b9)return a9
if(c3==="intercept"||a.length>1)s=a9
B.a.m(g,new A.y(B.C,m,s,J.jN(a),0,b8))}else{if(!h.dq(b1,a2))return a9
if(c3==="intercept"||a.length>1)s=a9
B.a.m(g,new A.y(B.O,m,s,J.jN(a),0,B.d))}a7=h.ae(b6).a
s=h.d
if(s>=a7)s=j&&s===0
else s=!0
if(s)return a9
s=A.d([b1],t.e)
if(!i)s.push(b7)
r=d.J(b1.c)
r.toString
r=A.d([r],t.Y)
r.push(c4)
return new A.d5(h,new A.M(c2,g,a8.a7(s,r),A.d([a2],t.m),a7,b6))},
ce(a,b,c,d,e,f,g,h,i,j){return this.ah(a,b,c,d,!1,e,f,null,B.d,0,0,g,h,i,j)},
cg(a,b,c,d,e,f,g,h){return this.ah(a,b,c,d,!1,1/0,!1,null,B.d,0,0,e,f,g,h)},
bt(a,b,c,d,e,f,g,h,i,j){return this.ah(a,b,c,!1,d,1/0,!1,null,e,f,g,!1,h,i,j)},
cj(a,b,c,d,e,f,g,h,i){return this.ah(a,b,c,!1,d,1/0,e,null,B.d,0,f,!1,g,h,i)},
aZ(a,b,c,d,e,f,g,h,i){return this.ah(a,b,c,d,!1,e,f,null,B.d,0,0,!1,g,h,i)},
ck(a,b,c,d,e,f,g,h,i){return this.ah(a,b,c,!1,!1,d,e,f,B.d,0,0,!1,g,h,i)},
cf(a,b,c,d,e,f,g,h,i,j,k,l){return this.ah(a,b,c,!1,d,e,f,g,h,i,0,!1,j,k,l)},
ci(a,b,c,d,e,f,g,h){return this.ah(a,b,c,!1,!1,d,e,null,B.d,0,0,!1,f,g,h)},
bl(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
if(a5.k1!=null)return B.u
s=this.a.Q
r=s.J(a4.c)
r.toString
q=a4.as
p=q===B.f||q===B.e?r.f.c1(r.e,a5.z):a4.z
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
g=h.bf(p)
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
a0=A.n(new A.c(A.d([(m-a)/j,(m+a)/j],t.n),t.db.a(new A.hw()),g),g.h("a.E"))
if(a0.length!==0)b=B.a.ag(a0,B.z)}for(m=s.f,a1=B.u,a2=0;a2<3;++a2){a3=new A.K(q+l*b,r+k*b)
if(!h.n(0,a3)||B.a.I(m,new A.hx(a3)))return B.u
a1=i.dw(a4,a3,s)
if(!a1.d)return a1
j=a1.b
if(Math.abs(b-j)<0.1)break
b=(b+j)/2}return a1}}
A.hv.prototype={
$1(a){var s=this.a,r=t.q.a(a).e
return s.c.W(r,this.b.f.a3(r))<=s.b.w.at},
$S:1}
A.hy.prototype={
$1(a){var s,r,q=this
t.o.a(a)
s=q.b.w.i(0,a.a)
if((s==null?0:s)<=0)s=a.f&&q.a.a.Q.c>=a.e
else s=!0
if(s){s=q.a.b.b
r=s.i(0,"soldierLimit")
r.toString
r=B.b.k(r)
s=s.i(0,"soldierHp")
s.toString
s=a.d<q.c.f+r*B.b.k(s)}else s=!1
return s},
$S:10}
A.hz.prototype={
$2(a,b){var s,r=t.o
r.a(a)
r.a(b)
s=B.c.t(b.c-b.d,a.c-a.d)
return s!==0?s:B.c.t(a.b,b.b)},
$S:19}
A.hA.prototype={
$1(a){t.o.a(a)
return a.f&&this.a.a.Q.c>=a.e},
$S:10}
A.hB.prototype={
$2(a,b){return Math.max(A.f(a),t.o.a(b).b)},
$S:32}
A.hD.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a.Q.a&&!a.fy},
$S:0}
A.hE.prototype={
$2(a,b){return Math.max(A.f(a),t.r.a(b).w)},
$S:9}
A.hC.prototype={
$1(a){var s,r,q,p,o=this
t.r.a(a)
s=!1
if(a.b===o.a.a.Q.a)if(!a.fy)if(a.f>=a.r*0.65)if(a.w>=o.b*0.8){if(a.db){r=o.c
r=r.al(a)&&!r.as.n(0,a.a)}else r=!1
if(!r){r=o.c.y
q=a.a
p=r.i(0,q)
if((p==null?null:p.b)==="expedition"){s=r.i(0,q)
s=s==null?null:s.d
s=s===o.d.a}}else s=!0}return s},
$S:0}
A.ht.prototype={
$1(a){t.o.a(a)
return a.f&&this.a.a.Q.c>=a.e},
$S:10}
A.hu.prototype={
$2(a,b){return Math.max(A.f(a),t.o.a(b).b)},
$S:32}
A.hF.prototype={
$1(a){return A.f(a)+1},
$S:6}
A.hG.prototype={
$0(){return 1},
$S:5}
A.hw.prototype={
$1(a){return A.aw(a)>=0},
$S:14}
A.hx.prototype={
$1(a){return t.q.a(a).f.n(0,this.a)},
$S:1}
A.aD.prototype={
aO(){return"AiDecisionStage."+this.b}}
A.an.prototype={
aO(){return"AiActionKind."+this.b}}
A.y.prototype={
H(){var s=this,r=s.d
r=r==null?null:A.d([r.a,r.b],t.n)
return A.R(["kind",s.a.a,"hero",s.b,"city",s.c,"point",r,"amount",s.e,"weapons",s.f],t.N,t.X)}}
A.a5.prototype={
H(){var s,r,q,p,o,n=this,m=A.d([],t.b)
for(s=n.w,r=s.length,q=t.n,p=0;p<s.length;s.length===r||(0,A.v)(s),++p){o=s[p]
m.push(A.d([o.a,o.b],q))}return A.R(["hero",n.a,"role",n.b,"deadline",n.y,"commit",n.z,"city",n.d,"enemy",n.r,"points",m,"leg",n.x,"gold",n.Q,"slot",n.as,"rearStaging",n.at,"reason",n.c,"order",n.ax,"targetCountry",n.e,"attrition",n.f],t.N,t.X)}}
A.M.prototype={
H(){var s,r,q,p=this,o=t.d,n=A.d([],o)
for(s=p.b,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)n.push(s[q].H())
o=A.d([],o)
for(s=p.d,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)o.push(s[q].H())
return A.R(["reason",p.a,"actions",n,"deps",p.c,"tasks",o,"floor",p.e,"emergency",p.f],t.N,t.X)}}
A.bN.prototype={
H(){var s,r,q,p=this,o=A.d([],t.d)
for(s=p.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)o.push(s[q].H())
return A.R(["phase",p.a,"target",p.b,"gold",p.c,"heroes",p.d,"groups",o,"notes",p.f,"limited",p.r,"assessments",p.w,"routeSteps",p.x,"expansions",p.y],t.N,t.X)}}
A.ef.prototype={
H(){var s,r,q,p=this,o=p.Q.H(),n=A.d([],t.d)
for(s=p.as,r=s.length,q=0;q<s.length;s.length===r||(0,A.v)(s),++q)n.push(s[q].H())
return A.R(["protocol",1,"session",p.a,"id",p.d,"rules",p.b,"map",p.c,"observation",o,"deadline",p.e,"tasks",n,"seed",p.f,"priority",p.r,"idle",p.w,"stage",p.x.b,"offensiveCountry",p.y,"offensiveCity",p.z],t.N,t.X)}}
A.ee.prototype={
H(){var s=this
return A.R(["protocol",1,"session",s.a,"id",s.d,"country",s.e,"rules",s.b,"map",s.c,"tick",s.f,"deadline",s.r,"plan",s.x.H(),"micros",s.w,"error",s.y],t.N,t.X)}}
A.j1.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:8}
A.j2.prototype={
$0(){var s=this,r=s.a,q=r.c,p=!1
if(s.b.length!==0)if(q!=null)if(!q.r){p=s.c
p=p.f>=p.r*0.5&&q.c>0&&q.b>=s.d.w.ch}if(p)return new A.aM([!0,q.b,1,q.c])
return new A.aM([!1,r.b,0,r.a])},
$S:51}
A.hK.prototype={
dj(h3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2,g3,g4,g5,g6,g7,g8,g9,h0=this,h1=null,h2={}
h2.a=h3
s=h0.a
r=s.Q
q=A.d([],t.Z)
p=h0.b
o=s.y
s=s.z
n=A.c8(r,h3,p,s,o)
m=r.r
l=A.h(m)
k=l.h("e(1)")
l=l.h("c<1>")
j=A.n(new A.c(m,k.a(new A.hN(r)),l),l.h("a.E"))
B.a.B(j,new A.hO())
i=r.f
h=A.h(i)
g=h.h("e(1)")
h=h.h("c<1>")
f=h.h("a.E")
e=A.n(new A.c(i,g.a(new A.hP(h0,r,n)),h),f)
if(j.length!==0)B.a.B(e,new A.i_(h0,j,r))
d=A.b4(e,t.q)
c=d==null
b=c?h1:A.aA(d.b,r,p,h1)
a=b==null
a0=new A.hM(h0,(a?h1:b.gY())===!0?Math.min(B.b.am(b.c*b.gaT()),Math.max(0,h3.d-h3.T().a)):0)
a1=new A.hL(h2,h0,q)
a2=r.gN()
a3=A.n(a2,a2.$ti.h("a.E"))
B.a.B(a3,new A.i7(h2,h0))
a2=t.S
a4=Math.min(h2.a.f,B.a.E(a3,0,new A.i8(h2,h0),a2))
if(a3.length!==0&&a4>h2.a.e){a5=h2.a.M()
a6=Math.max(0,a5.d-Math.max(a5.T().a,p.w.f))
a7=a5.e
a8=p.b.i(0,"soldierCost")
a8.toString
a9=Math.min(a4-a7,B.b.aM(a6,B.b.k(a8)))
if(a9>0&&a5.aC(a9)&&a0.$1(a5))a1.$4(a5,A.d([new A.y(B.m,h1,B.a.gD(a3).a,h1,a9,B.d)],t.w),"\u6309\u5168\u56fd\u73b0\u6709\u5b88\u5c06\u548c\u5f85\u51fa\u5f81\u5c06\u9886\u8865\u5175\uff0c\u4fdd\u7559\u7cae\u8349\u3001\u6708\u4ff8\u548c\u6d41\u52a8\u8d44\u91d1",B.a.gD(a3))}for(a7=a3.length,a8=h0.c,b0=p.w,b1=b0.fx-2,b2=h0.e,b3=t.w,b4=p.r,b5=p.b,b6=h0.d,b7=t.a,b8=0;b8<a3.length;a3.length===a7||(0,A.v)(a3),++b8){b9=a3[b8]
if(q.length>=b1)break
c0=a8.d6(h2.a)
c1=new A.c(m,k.a(new A.i9(h2,r,Math.max(12,new A.c(m,k.a(new A.ia(r)),l).E(0,0,new A.ib(),a2)*0.8))),l).gl(0)
c2=c0>=2&&c1+h2.a.at.a<c0&&B.a.I(i,new A.ic(r))
if(c2){c3=b9.a
c4=b2.i(0,c3)
if(c4==null)c4=h1
else c4=c4.d.length!==0||c4.a.at!=null
c3=c4!==!0&&h2.a.v(c3).length>=b9.y}else c3=!1
if(c3){c3=h2.a.v(b9.a)
c4=A.h(c3)
c5=c4.h("c<1>")
c6=A.n(new A.c(c3,c4.h("e(1)").a(new A.id(h2,h0)),c5),c5.h("a.E"))
B.a.B(c6,new A.hQ())
if(c6.length!==0){a5=h2.a.M()
c7=B.a.gD(c6)
if(a5.bj(c7))a1.$5$hero(a5,A.d([new A.y(B.v,c7.a,h1,h1,0,B.d)],b3),"\u5b89\u5168\u540e\u65b9\u6e05\u7406\u4f4e\u4ef7\u503c\u5197\u4f59\u7f16\u5236\uff0c\u4fdd\u7559\u5b9e\u9645\u5b88\u5c06\u548c\u5185\u653f\u5c06\u9886\uff0c\u4e3a\u5f3a\u653b\u4e3b\u529b\u8865\u5458",b9,c7)}}c3=b9.a
c8=h2.a.v(c3)
c4=A.h(c8)
c5=c4.h("c<1>")
c9=A.n(new A.c(c8,c4.h("e(1)").a(new A.hR()),c5),c5.h("a.E"))
B.a.B(c9,new A.hS())
if(c8.length!==0&&b4.gar(b4)){d0=B.a.ag(c8,new A.hT())
c4=b4.gaq()
c5=A.l(c4)
d1=c5.h("c<a.E>")
d2=A.n(new A.c(c4,c5.h("e(a.E)").a(new A.hU(r)),d1),d1.h("a.E"))
B.a.B(d2,new A.hV())
d3=A.n(new A.c(i,g.a(new A.hW(h2,h0,r,d0)),h),f)
B.a.B(d3,new A.hX(h0,d0,r))
d4=d3.length===0?0:2
c4=A.h(d3)
c5=c4.h("w<1>")
d1=new A.w(d3,0,3,c5)
d1.U(d3,0,3,c4.c)
d1=new A.r(d1,d1.gl(0),c5.h("r<k.E>"))
c5=c5.h("k.E")
while(d1.j()){c4=d1.d
if(c4==null)c4=c5.a(c4)
if(d2.length===0)d5=A.d([],b7)
else{d5=b5.i(0,"carryLimit")
d5.toString
d5=A.hc(B.b.k(d5),B.a.gD(d2).a,!1,a2)}d5=A.j0(d0,c4,r,p,b6,d5,0).a[2]
if(d5>0){if(a)c5=h1
else c5=b.a!==b.d.a&&b.b>=b.e.w.w
if(c5===!0){c5=c4.b
c5=c5===(c?h1:d.b)}else c5=!1
if(c5){d4=a8.aW(d5,c4,h2.a)
break}d4=a8.aW(d5,c4,h2.a)
break}}d6=d4}else d6=1
d7=!1
if(B.a.I(i,new A.hY(r)))if(!c2){if(c8.length!==0)if(d6>0){c4=h2.a.bW(c3)
c4=c4<(h2.a.ax.n(0,c3)?0:1)+d6}else c4=d7
else c4=!0
d7=c4}else d7=!0
if(c9.length!==0)if(b9.at==null){c4=c8.length
c5=h2.a.x.i(0,c3)
d1=!0
if(c5==null)c5=b9.d
if(c4<=c5){if(d7){c4=c8.length
c5=h2.a.x.i(0,c3)
if(c5==null)c5=b9.d
c5=c4>=c5
c4=c5}else c4=!1
if(!c4){c4=b2.i(0,c3)
if(c4==null)c4=h1
else{c4=c4.f
c4=c4==null?h1:c4.a}c4=c4===B.r}else c4=d1}else c4=d1}else c4=!1
else c4=!1
if(c4){a5=h2.a.M()
if(a5.aJ(b9,B.a.gD(c9))){c4=b2.i(0,c3)
if(c4==null)c4=h1
else c4=c4.d.length!==0||c4.a.at!=null
c4=a0.$2$civilian(a5,c4!==!0)}else c4=!1
if(c4)a1.$5$hero(a5,A.d([new A.y(B.l,B.a.gD(c9).a,c3,h1,0,B.d)],b3),"\u63d0\u9ad8\u5fc5\u8981\u57ce\u9632\u4e0e\u8fce\u6218\u540d\u989d\uff0c\u4fdd\u7559\u5df2\u51fa\u5f81\u90e8\u961f\u7684\u540e\u52e4\u8d44\u91d1",b9,B.a.gD(c9))}if(d7){c4=b2.i(0,c3)
if(c4==null)c4=h1
else c4=c4.d.length!==0||c4.a.at!=null
if(c4===!0){c4=h2.a.L(c3)
c5=b9.at
if(c5==null)c5=b9.d
else{d1=b9.cy?1:0
d1=B.c.u(c5-b9.ax-d1,0,5)
c5=d1}c5=c4<c5
c4=c5}else c4=!0}else c4=!1
if(c4){a5=h2.a.M()
c4=b2.i(0,c3)
if(c4==null)c4=h1
else c4=c4.d.length!==0||c4.a.at!=null
c5=c?h1:d.b
if(a5.bp(b9,c4===!0,c5)&&a0.$1(a5))a1.$4(a5,A.d([new A.y(B.w,h1,c3,h1,0,B.d)],b3),"\u8865\u5145\u7559\u5b88\u548c\u540e\u7eed\u6269\u5f20\u6240\u9700\u5c06\u9886\uff0c\u7b7e\u7ea6\u4e0e\u6708\u4ff8\u6309\u6700\u9ad8\u8d39\u7528\u9884\u7559",b9)}}d8=A.d([],t.e)
for(m=a3.length,b8=0;b8<a3.length;a3.length===m||(0,A.v)(a3),++b8){l=a3[b8].a
k=b2.i(0,l)
if(k==null)k=h1
else k=k.d.length!==0||k.a.at!=null
if(k===!0)continue
c8=h2.a.v(l)
k=A.h(c8)
a7=k.h("c<1>")
d9=A.n(new A.c(c8,k.h("e(1)").a(new A.hZ(h2)),a7),a7.h("a.E"))
B.a.B(d9,new A.i0())
k=c8.length
k=A.f(Math.max(0,k-(h2.a.ax.n(0,l)?0:1)))
l=A.h(d9)
a7=new A.w(d9,0,k,l.h("w<1>"))
a7.U(d9,0,k,l.c)
B.a.G(d8,a7)}B.a.B(d8,new A.i1())
e0=h1
e1=h1
e2=0
e3=1
if(d8.length!==0){c7=B.a.gD(d8)
e4=A.c8(r,h2.a,p,s,o)
d3=A.n(new A.c(i,g.a(new A.i2(h2,h0,r)),h),f)
B.a.B(d3,new A.i3(h0,c7,r))
s=A.a0(d3,0,A.Z(b0.go,"count",a2),A.h(d3).c)
o=s.$ti
s=new A.r(s,s.gl(0),o.h("r<k.E>"))
m=a8.c
l=b0.ok
k=e4.f
b0=b0.k4
i=t.aO
h=t.eO
g=h.h("a.E")
o=o.h("k.E")
e5=e2
e6=e0
e7=!1
for(;;){if(!s.j()){e2=e5
e0=e6
break}A:{f=s.d
if(f==null)f=o.a(f)
e8=A.n(new A.c(d8,i.a(new A.i4(h0,f)),h),g)
if(e8.length===0)break A
c7=B.a.gD(e8)
for(a7=a8.bo(c7,h2.a,f,b6),b1=a7.length,b2=f.e,e9=f.a,b8=0;b8<a7.length;a7.length===b1||(0,A.v)(a7),++b8){d2=a7[b8]
f0={}
f1=A.j0(c7,f,r,p,b6,d2,0)
b4=k.i(0,e9)
f2=b4==null?h1:b4.length
if(f2==null)f2=0
b4=f1.a
f3=a8.aW(b4[2],f,h2.a)
f4=f3-f2
f5=e4.ga1()!=null&&e4.ga1()!==e9
b7=!0
if(b4[2]!==0)if(f4>0)if(f4<=e8.length)if(f5)b7=f3!==1||b4[1]<b0
else b7=!1
if(b7)continue
f6=h2.a.M()
f6.d=1e6
f0.a=f6
f7=A.d([],b3)
f9=1/0
g0=0
g1=0
for(;;){f8=!1
if(!(g1<f4)){f8=!0
break}if(!(g1<e8.length))return A.m(e8,g1)
g2=e8[g1]
if(A.j0(g2,f,r,p,b6,d2,0).a[2]===0)break
g3=m.aH(g2,b2,r,f)
b7=g3.b
f9=Math.min(f9,b7)
g0=Math.max(g0,b7)
if(!g3.d||g0-f9>l)break
g4=B.a.E(a3,0,new A.i5(f0,h0,g2),a2)
b7=f0.a
c3=b7.f
c4=b5.i(0,"soldierLimit")
c4.toString
c4=Math.min(g4,Math.max(0,c3-B.b.k(c4)))
g5=a8.bt(b7,g2,g3,b4[0],d2,c4,f2+g1,"\u6309\u5171\u540c\u653b\u9632\u95e8\u69db\u6838\u7b97\u6574\u961f\u6b66\u5668\u4e0e\u8def\u8d39","expedition",f)
if(g5==null)break
f0.a=g5.a
b7=g5.b.b
c3=A.h(b7)
B.a.G(f7,new A.c(b7,c3.h("e(1)").a(new A.i6()),c3.h("c<1>")));++g1}if(!f8)continue
b4=f0.a
g6=1e6-b4.d+b4.T().a
b4=h2.a
if(b4.d<g6){if(e5===0||g6<e5){e3=f3
e5=g6
e6=e9}continue}a5=b4.M()
b4=f7.length
g7=0
for(;;){if(!(g7<f7.length)){f8=!0
break}if(!a5.bZ(f7[g7].e)){f8=!1
break}f7.length===b4||(0,A.v)(f7);++g7}if(!f8||!a0.$1(a5))continue
if(f7.length!==0){f=r.J(c7.c)
f.toString
a1.$4(a5,f7,"\u6309\u76ee\u6807\u57ce\u9632\u4e0e\u5b88\u5c06\u914d\u9f50"+f3+"\u540d\u8fdb\u653b\u5c06\u9886\u7684\u9ad8\u7ea7\u6b66\u5668\uff0c\u9884\u7559\u6574\u961f\u7cae\u8349",f)}e5=e2
e1=e9
e6=e0
e7=!0
break}if(e7){e2=e5
e0=e6
break}}}}s=e1==null
g8=r.J(s?e0:e1)
if(g8==null)g8=d
g9=g8==null?h1:A.aA(g8.b,r,p,h2.a.x)
p=e0==null?"preparing":"saving"
s=s?e0:e1
if(s==null)if((a?h1:b.gY())===!0)s=c?h1:d.a
else s=h1
b6=b6.b
o=b6.e
m=b6.c
l=b6.d
b6=b6.b
k=A.d([],t.s)
if(q.length===0)k.push("\u672c\u8f6e\u65e0\u5fc5\u8981\u4e14\u53ef\u652f\u4ed8\u7684\u91c7\u8d2d\uff0c\u4fdd\u7559\u56fd\u5e93")
if((g9==null?h1:g9.gY())===!0)k.push("\u76ee\u6807\u56fd\u5360\u6709 "+g9.b+" \u5ea7\u57ce\uff0c\u5217\u4e3a\u5371\u9669\u56fd\u5bb6\uff1b\u8ffd\u52a0\u8fdb\u653b\u9884\u7b97 "+B.b.am(g9.c*g9.gaT())+" \u91d1\u5e01\uff0c\u51c6\u5907\u5f3a\u5316\u6b66\u5668\u548c\u8f6e\u653b\u5175\u529b")
return new A.bN(p,s,e2,e3,q,k,o,m,l,b6)}}
A.hN.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&a.f>0&&!a.fy},
$S:0}
A.hO.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ae(s.a(b),!0),A.ae(a,!0))},
$S:2}
A.hP.prototype={
$1(a){t.q.a(a)
return a.b!==this.b.a&&this.c.aB(a)&&this.a.c.c4(a)},
$S:1}
A.i_.prototype={
$2(a,b){var s,r,q,p,o=t.q
o.a(a)
s=this.b
r=this.c
q=this.a
p=q.b
q=q.a.f
return B.b.t(A.bl(o.a(b),B.a.gD(s),r,p,q,null),A.bl(a,B.a.gD(s),r,p,q,null))},
$S:4}
A.hM.prototype={
$2$civilian(a,b){var s=a.d,r=Math.max(a.T().a,this.a.b.w.f)
return s>=r+(b?this.b:0)},
$1(a){return this.$2$civilian(a,!1)},
$S:52}
A.hL.prototype={
$5$hero(a,b,c,d,e){var s,r
t.f3.a(b)
this.a.a=a
s=this.b
r=A.d([],t.e)
if(e!=null)r.push(e)
B.a.m(this.c,new A.M(c,b,s.c.a7(r,A.d([d],t.Y)),B.q,Math.max(a.T().a,s.b.w.f),!1))},
$4(a,b,c,d){return this.$5$hero(a,b,c,d,null)},
$S:53}
A.i7.prototype={
$2(a,b){var s,r,q,p,o,n=t.q
n.a(a)
s=this.a
n=n.a(b).a
r=s.a.v(n).length===0?1:0
q=a.a
p=B.c.t(r,s.a.v(q).length===0?1:0)
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
A.i8.prototype={
$2(a,b){var s,r
A.f(a)
t.q.a(b)
s=this.a.a.v(b.a).length
r=this.b.b.b.i(0,"soldierLimit")
r.toString
return a+s*B.b.k(r)},
$S:7}
A.ia.prototype={
$1(a){t.r.a(a)
return a.b===this.a.a&&!a.fy},
$S:0}
A.ib.prototype={
$2(a,b){return Math.max(A.f(a),t.r.a(b).w)},
$S:9}
A.i9.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.b===this.b.a)if(!a.fy){r=this.a
if(!r.a.z.n(0,a.a))if(a.f>=a.r*0.65)if(a.w>=this.c){s=a.as
s=!(s===B.f||s===B.e)||r.a.al(a)}}return s},
$S:0}
A.ic.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.id.prototype={
$1(a){var s,r
t.r.a(a)
s=!1
if(a.dy){r=this.b.b
if(a.w<=r.w.p4){s=a.x
r=r.b.i(0,"drawCost")
r.toString
s=s<=B.b.k(r)&&s<15&&this.a.a.al(a)}}return s},
$S:0}
A.hQ.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return B.b.t(A.a4(a),A.a4(b))},
$S:2}
A.hR.prototype={
$1(a){return t.r.a(a).fr},
$S:0}
A.hS.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.c.t(s.a(b).x,a.x)},
$S:2}
A.hT.prototype={
$2(a,b){var s=t.r
s.a(a)
s.a(b)
return A.ae(a,!0)>A.ae(b,!0)?a:b},
$S:18}
A.hU.prototype={
$1(a){t.o.a(a)
return a.f&&a.d===0&&this.a.c>=a.e},
$S:10}
A.hV.prototype={
$2(a,b){var s=t.o
s.a(a)
return B.c.t(s.a(b).c,a.c)},
$S:19}
A.hW.prototype={
$1(a){var s,r,q,p=this
t.q.a(a)
s=p.c
if(a.b!==s.a){r=p.b
q=r.a
s=A.c8(s,p.a.a,r.b,q.z,q.y).aB(a)&&r.c.aD(p.d,a)}else s=!1
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
return B.b.t(A.bl(o.a(b),s,r,p,q,null),A.bl(a,s,r,p,q,null))},
$S:4}
A.hY.prototype={
$1(a){return t.q.a(a).b!==this.a.a},
$S:1}
A.hZ.prototype={
$1(a){t.r.a(a)
return a.db&&this.a.a.al(a)},
$S:0}
A.i0.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ae(s.a(b),!0),A.ae(a,!0))},
$S:2}
A.i1.prototype={
$2(a,b){var s=t.r
s.a(a)
return B.b.t(A.ae(s.a(b),!0),A.ae(a,!0))},
$S:2}
A.i2.prototype={
$1(a){var s,r,q
t.q.a(a)
s=this.c
if(a.b!==s.a){r=this.b
q=r.a
s=A.c8(s,this.a.a,r.b,q.z,q.y).aB(a)&&r.c.c4(a)}else s=!1
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
return B.b.t(A.bl(o.a(b),s,r,p,q,null),A.bl(a,s,r,p,q,null))},
$S:4}
A.i4.prototype={
$1(a){return this.a.c.aD(t.r.a(a),this.b)},
$S:0}
A.i5.prototype={
$2(a,b){var s,r,q
A.f(a)
s=this.a
r=t.q.a(b).a
q=s.a.v(r).length
q=Math.max(0,q-(r===this.c.c?1:0))
s=s.a.ax.n(0,r)?0:1
s=Math.min(q,s)
q=this.b.b.b.i(0,"soldierLimit")
q.toString
return a+s*B.b.k(q)},
$S:7}
A.i6.prototype={
$1(a){return t.T.a(a).a===B.B},
$S:29}
A.bo.prototype={}
A.eg.prototype={
W(b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=b1.a,a7=b1.b,a8=A.u(b0.a)+","+A.u(b0.b)+":"+A.u(a6)+","+A.u(a7),a9=a5.d
if(a9.a2(a8)){a6=a9.i(0,a8)
a6.toString
return a6}for(s=a5.a,r=s.b,q=s.c,p=r+q+8,o=r-1,--q,n=a5.b,m=n.b,n=n.e,s=s.d,l=s.length,k=n.length,j=a5.c,i=b0,h=0,g=0;g<p;++g){f=i.K(b1)
if(f<1e-7){if(a9.a>=256){e=new A.a8(a9,A.l(a9).h("a8<1>")).gC(0)
if(!e.j())A.cz(A.aB())
a9.aj(0,e.gp())}a9.A(0,a8,h)
return h}if(!j.ds())return 1/0
d=i.a
c=(a6-d)/f
b=i.b
a=(a7-b)/f
a0=B.c.u(B.b.Z((d+c*1e-7)/16),0,o)
a1=B.c.u(B.b.Z((b+a*1e-7)/16),0,q)
a2=new A.eh()
a3=a2.$3(d,c,a0)
a2=a2.$3(b,a,a1)
a4=Math.min(f,Math.min(A.kA(a3),A.kA(a2)))
a2=m.i(0,"marchSpeed")
a2.toString
a3=a1*r+a0
if(!(a3>=0&&a3<l))return A.m(s,a3)
a3=s[a3]
if(!(a3<k))return A.m(n,a3)
h+=a4/(a2*n[a3])
i=new A.K(d+c*a4,b+a*a4)}return 1/0},
ak(a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=b0.J(a8.c),a5=a8.as,a6=(a5===B.f||a5===B.e)&&a4!=null?a4.f.c1(a4.e,a9):a8.z,a7=b2==null?a9:b2.f.bU(a6,a9)
a5=this.a
if(!a5.n(0,a7))return B.u
s=new A.ei(b0,a8,b2)
r=new A.ek(this,b0,a8)
q=t._
p=A.d([A.d([a7],q)],t.a5)
if(!s.$2(a6,a7))o=b1&&r.$2(a6,a7)
else o=!0
if(o){n=a6.K(a7)
o=a6.a
m=a7.a
l=(o+m)/2
k=a6.b
j=a7.b
i=(k+j)/2
if(n>0)for(h=[-96,96,-192,192],k=(j-k)/n,o=(m-o)/n,g=0;g<4;++g){f=h[g]
e=new A.K(l-k*f,i+o*f)
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
if(d==null||a0<d.b)d=new A.bo(c,a0,!0)}return d==null?B.S:d},
aH(a,b,c,d){return this.ak(a,b,c,!1,d)},
dw(a,b,c){return this.ak(a,b,c,!1,null)}}
A.eh.prototype={
$3(a,b,c){var s
if(Math.abs(b)<1e-12)s=1/0
else s=Math.max(1e-8,((b>0?c+1:c)*16-a)/b)
return s},
$S:54}
A.ei.prototype={
$2(a,b){return B.a.I(this.a.f,new A.ej(this.b,this.c,a,b))},
$S:27}
A.ej.prototype={
$1(a){var s,r=this
t.q.a(a)
if(a.b!==r.a.b){s=r.b
s=s==null?null:s.a
s=a.a!==s&&a.f.c3(r.c,r.d)!=null}else s=!1
return s},
$S:1}
A.ek.prototype={
$2(a,b){return B.a.I(this.b.r,new A.el(this.a,this.c,b,a))},
$S:27}
A.el.prototype={
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
l=B.b.u(((k.a-q)*p+(k.b-o)*n)/m,0,1)}s=r.aF(s,l).K(a.z)
r=j.a.b.b.i(0,"encounterDistance")
r.toString
return s<r+12},
$S:0}
A.ag.prototype={
H(){var s=this
return A.d([s.a,s.b,s.c,s.d,s.e,s.f,s.r],t.Q)}}
A.em.prototype={
bg(a,b,c,d){var s,r,q,p
if(c){s=this.f
if(!(d<s.length))return A.m(s,d)
s=s[d]}else s=1
s=B.c.u(B.b.Z(a*s),0,63)
if(b>0){r=this.d
q=r.length
p=B.c.u(b-1,0,q-1)
if(!(p>=0&&p<q))return A.m(r,p)
p=r[p]
r=p}else r=0
return B.c.u(s+r,0,63)},
bX(a,b,c){return this.bg(a,b,c,0)},
cU(a,b){return this.bg(a,0,b,0)},
an(a){var s,r,q="maxLevel",p=this.b,o=p.i(0,"firstYearCityLevel")
if(o==null){o=p.i(0,q)
o.toString
o=B.b.k(o)}o=B.b.k(o)
s=p.i(0,"initialYear")
s=B.b.k(s==null?1:s)
r=p.i(0,q)
r.toString
r=B.c.u(a-s,0,B.b.k(r))
s=p.i(0,"cityLevelsPerYear")
s=B.b.k(s==null?1:s)
p=p.i(0,q)
p.toString
return B.c.u(o+r*s,1,B.b.k(p))},
H(){var s,r,q,p=this,o=A.d([],t.eG)
for(s=p.r.gaq(),s=s.gC(s),r=t.Q;s.j();){q=s.gp()
o.push(A.d([q.a,q.b,q.c,q.d,q.e,q.f,q.r],r))}return A.R(["version",p.a,"values",p.b,"upgrades",p.c,"defenseBonuses",p.d,"movement",p.e,"field",p.f,"weapons",o,"tuning",p.w.H()],t.N,t.X)}}
A.e3.prototype={
bf(a){var s=this.d,r=this.b
r=B.c.u(B.b.Z(a.b/16),0,this.c-1)*r+B.c.u(B.b.Z(a.a/16),0,r-1)
if(!(r>=0&&r<s.length))return A.m(s,r)
return s[r]},
n(a,b){var s,r=b.a
if(isFinite(r)){s=b.b
r=isFinite(s)&&r>=0&&s>=0&&r<this.b*16&&s<this.c*16}else r=!1
return r},
H(){var s=this
return A.R(["version",s.a,"width",s.b,"height",s.c,"terrain",s.d],t.N,t.X)}}
A.eo.prototype={
dl(a){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=t.d1.a(B.i.d3(a,null))
switch(J.b_(s,"kind")){case"init":if(!J.am(J.b_(s,"protocol"),1)||!J.am(J.b_(s,"build"),"af74e625"))throw A.j(B.a4);++i.f
i.e=null
p=i.r
if(p.a>0){p.b=p.c=p.d=p.e=p.f=null
p.a=0
p.b2()}p=t.f
o=t.N
n=t.z
i.c=A.lc(A.aq(p.a(J.b_(s,"rules")),o,n))
n=A.aq(p.a(J.b_(s,"map")),o,n)
p=A.H(n.i(0,"version"))
m=A.f(n.i(0,"width"))
l=A.f(n.i(0,"height"))
n=A.br(t.R.a(n.i(0,"terrain")),!0,t.S)
k=new Uint8Array(A.mp(n))
if(m<=0||l<=0||n.length!==m*l)A.cz(B.a6)
i.d=new A.e3(p,m,l,k)
i.a.$1(B.i.ao(t.G.a(A.R(["kind","ready","rules",i.c.a,"map",p,"backend",i.b],o,t.X)),null))
break
case"cancel":p=i.e
o=J.b_(s,"id")
if(p==null?o==null:p===o)i.r.m(0,A.f(J.b_(s,"id")))
break
case"plan":if(i.c==null||i.d==null||i.e!=null){p=A.k5("AI \u5c1a\u672a\u5c31\u7eea\u6216\u5df2\u6709\u8bf7\u6c42\u6267\u884c\u4e2d")
throw A.j(p)}r=A.la(A.aq(t.f.a(J.b_(s,"request")),t.N,t.z))
i.e=r.d
i.aQ(r,i.f)
break
default:throw A.j(B.a5)}}catch(j){q=A.aQ(j)
i.a.$1(B.i.ao(t.G.a(A.R(["kind","error","message",J.bn(q)],t.N,t.X)),null))}},
aQ(a,b){return this.cM(a,b)},
cM(a3,a4){var s=0,r=A.mK(t.x),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
var $async$aQ=A.mZ(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:a1=new A.ig()
$.jL()
a1.bu()
m=a1
p=4
i=n.c
i.toString
h=n.d
h.toString
g=new A.en(i.w)
f=new A.ez(i,h,a3,g,A.Y(t.S,t.h))
e=t.N
h=new A.eg(h,i,g,A.Y(e,t.i))
f.e=h
f.f=new A.ev(i,g,A.Y(e,t.cM))
f.r=new A.hs(a3,i,h)
l=f
k=0
i=l.bv(),h=i.$ti,i=new A.aN(i.a(),h.h("aN<1>")),h=h.c,g=n.r,d=a3.d,c=t.x
case 7:if(!i.j()){s=8
break}b=i.b
if(b==null)h.a(b)
if(a4!==n.f||g.n(0,d)){if(a4===n.f){n.e=null
g.aj(0,d)
n.a.$1(B.i.ao(t.G.a(A.R(["kind","cancelled","id",d],e,t.X)),null))}s=1
break}b=k
if(typeof b!=="number"){q=b.dE()
s=1
break}a=b+1
k=a
s=a>=n.c.w.id?9:10
break
case 9:k=0
b=m
if(b.b==null)b.b=$.hJ.$0()
s=11
return A.mh(A.lq(B.H,c),$async$aQ)
case 11:m.bu()
case 10:s=7
break
case 8:if(a4!==n.f){s=1
break}if(g.aj(0,d)){n.e=null
n.a.$1(B.i.ao(t.G.a(A.R(["kind","cancelled","id",d],e,t.X)),null))
s=1
break}n.e=null
i=l.w
i.toString
n.a.$1(B.i.ao(t.G.a(A.R(["kind","reply","reply",A.jR(a3,i,null,m.gc2()).H()],e,t.X)),null))
p=2
s=6
break
case 4:p=3
a2=o.pop()
j=A.aQ(a2)
if(a4!==n.f){s=1
break}n.e=null
i=A.d(["\u89c4\u5212\u5931\u8d25\uff0c\u4e3b\u73af\u5883\u4fdd\u7559\u6709\u9650\u5b89\u5168\u4fdd\u62a4"],t.s)
h=m.gc2()
n.a.$1(B.i.ao(t.G.a(A.R(["kind","reply","reply",A.jR(a3,new A.bN("preparing",null,0,1,B.af,i,!1,0,0,0),J.bn(j),h).H()],t.N,t.X)),null))
s=6
break
case 3:s=2
break
case 6:case 1:return A.mj(q,r)
case 2:return A.mi(o.at(-1),r)}})
return A.mk($async$aQ,r)}}
A.je.prototype={
$1(a){t.r.a(a)
return a.w*3+a.f*0.35+a.gP()*8},
$S:31}
A.jf.prototype={
$1(a){var s
t.r.a(a)
if(a.c===this.a.a){s=a.as
s=!(s===B.f||s===B.e)}else s=!1
return s},
$S:0}
A.jg.prototype={
$2(a,b){var s
A.aw(a)
t.r.a(b)
s=A.a4(b)
return a+s*(b.k1==null?0.12:0.03)},
$S:28}
A.a2.prototype={}
A.ap.prototype={
ga6(){var s,r=this.a
if(r.at!=null)r=r.db
else{r=this.d
if(r.length===0)r=1/0
else{s=A.h(r)
s=new A.O(r,s.h("i(1)").a(new A.er()),s.h("O<1,i>")).ag(0,B.z)
r=s}}return r}}
A.er.prototype={
$1(a){return t.O.a(a).b},
$S:57}
A.ii.prototype={
dr(c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7=this,b8="marchSpeed",b9=b7.a,c0=c3.a,c1=b9.v(c0),c2=A.d([],t.D)
for(s=b9.r,r=s.length,q=c3.e,p=c3.f,o=b7.b,n=o.b,o=o.w.b,m=q.a,l=q.b,k=c3.ay,j=c3.b,i=0;i<r;++i){h=s[i]
if(h.b!==j){g=h.as
g=g===B.f||g===B.e||h.f<=0}else g=!0
if(g)continue
if(h.a===k){B.a.m(c2,new A.a2(h,0,1))
continue}if(h.fy)continue
g=h.z
f=g.K(q)
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
a4=new A.K(g.a+b/a0*a3,g.b+a/a0*a3)
if(p.a3(a4).K(a4)>48)continue}d=n.i(0,b8)
d.toString
a5=A.nc(q,o,e,d,p,g,new A.ij(b7),c)
if(a5==null)continue
if(h.as===B.k||a1)g=0.35
else if(a2>0.8)g=1
else g=f<72?0.9:0.55
B.a.m(c2,new A.a2(h,a5,g))}B.a.B(c2,new A.ik())
c0=A.h(c1)
r=t.r
a6=A.b4(new A.c(c1,c0.h("e(1)").a(new A.il(c3)),c0.h("c<1>")),r)
q=A.d([],t.e)
if(a6!=null)q.push(a6)
c0=c0.h("J<1>")
B.a.G(q,new A.J(c1,c0).bw(0,c0.h("e(k.E)").a(new A.im(a6))))
c0=t.S
a7=A.a0(q,0,A.Z(c3.gad(),"count",c0),r).ab(0)
a8=A.Y(t.N,c0)
a9=B.a.ap(b9.w,new A.io(c3)).c
for(b9=a7.length,i=0;c0=a7.length,i<c0;a7.length===b9||(0,A.v)(a7),++i){b0=a7[i]
if(b0.as===B.e)b1=0
else{c0=n.i(0,"soldierLimit")
c0.toString
b1=Math.min(a9,B.b.k(c0)-b0.gP())}a9-=b1
a8.A(0,b0.a,b0.gP()+b1)}b9=c2.length
b2=null
if(b9!==0&&c0!==0)for(c0=c3.cy,r=c3.at,q=c3.ax,p=r==null,o=b7.d,n=c3.d,b3=0;b3<a7.length;++b3,b9=l){b4=a7[b3]
for(m=b4.a,b5=null,i=0;l=c2.length,i<l;c2.length===b9||(0,A.v)(c2),++i){l=c2[i].a
if(p)k=n
else{k=c0?1:0
k=B.c.u(r-q-k,0,5)}b6=o.bi(b4,l,l.ok,Math.max(1,k-b3),!1,a8.i(0,m))
if(b5==null||b6.b<b5.b)b5=b6}if(b2==null||b5.b>b2.b)b2=b5}b9=A.h(s)
return new A.ap(c3,c2,b2,new A.c(s,b9.h("e(1)").a(new A.ip(c3)),b9.h("c<1>")).E(0,0,new A.iq(),t.i))}}
A.ij.prototype={
$2(a,b){var s=this.a,r=s.c,q=r.W(a,b)
if(!isFinite(q)&&r.c.e){r=a.K(b)
s=s.b.b.i(0,"marchSpeed")
s.toString
s=r/s}else s=q
return s},
$S:58}
A.ik.prototype={
$2(a,b){var s,r=t.O
r.a(a)
r.a(b)
r=a.b
s=b.b
return r===s?B.p.t(a.a.a,b.a.a):B.b.t(r,s)},
$S:59}
A.il.prototype={
$1(a){return t.r.a(a).a===this.a.ch},
$S:0}
A.im.prototype={
$1(a){return t.r.a(a)!==this.a},
$S:0}
A.io.prototype={
$1(a){return t.t.a(a).a===this.a.b},
$S:8}
A.ip.prototype={
$1(a){var s,r
t.r.a(a)
s=this.a
r=!1
if(a.b===s.b)if(a.c===s.a){s=a.as
s=!(s===B.f||s===B.e)&&!a.fy}else s=r
else s=r
return s},
$S:0}
A.iq.prototype={
$2(a,b){return A.aw(a)+A.a4(t.r.a(b))},
$S:28}
A.en.prototype={
X(){var s=this,r=s.b
if(r>=s.a.db){s.e=!0
return!1}s.b=r+1
return!0},
cT(){var s=this,r=s.c
if(r>=s.a.dx){s.e=!0
return!1}s.c=r+1
return!0},
ds(){var s=this,r=s.d
if(r>=s.a.dy){s.e=!0
return!1}s.d=r+1
return!0}}
A.jb.prototype={
$1(a){A.H(a)
return A.iV(v.G.self).postMessage(a)},
$S:60}
A.jc.prototype={
$1(a){return this.a.dl(A.H(A.iV(a).data))},
$S:61};(function aliases(){var s=J.aT.prototype
s.cm=s.q
s=A.a.prototype
s.bw=s.dB})();(function installTearOffs(){var s=hunkHelpers._static_0,r=hunkHelpers._static_1,q=hunkHelpers.installStaticTearOff
s(A,"mJ","lC",5)
r(A,"n_","lQ",13)
r(A,"n0","lR",13)
r(A,"n1","lS",13)
s(A,"kz","mU",3)
r(A,"n4","mn",25)
r(A,"n2","nr",0)
q(A,"nn",2,null,["$1$2","$2"],["kJ",function(a,b){return A.kJ(a,b,t.H)}],21,0)
q(A,"nm",2,null,["$1$2","$2"],["kI",function(a,b){return A.kI(a,b,t.H)}],21,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.z,null)
q(A.z,[A.jm,J.cP,A.cb,J.b1,A.C,A.ie,A.a,A.r,A.c2,A.P,A.bT,A.bb,A.bQ,A.cg,A.I,A.aC,A.bs,A.bK,A.ch,A.a6,A.ir,A.hg,A.bR,A.cn,A.D,A.ha,A.b7,A.ai,A.c0,A.ar,A.dh,A.iS,A.iQ,A.dd,A.aN,A.ao,A.bd,A.W,A.de,A.dm,A.ct,A.bv,A.dk,A.bg,A.B,A.cs,A.cH,A.cJ,A.iL,A.cK,A.df,A.d3,A.cc,A.ix,A.aF,A.ab,A.ac,A.dn,A.ig,A.bw,A.aV,A.eq,A.aE,A.es,A.bJ,A.ev,A.cB,A.at,A.ez,A.a7,A.fh,A.K,A.ec,A.p,A.Q,A.b0,A.e4,A.hh,A.d5,A.hs,A.y,A.a5,A.M,A.bN,A.ef,A.ee,A.hK,A.bo,A.eg,A.ag,A.em,A.e3,A.eo,A.a2,A.ap,A.ii,A.en])
q(J.cP,[J.cR,J.bV,J.bX,J.bW,J.bY,J.bq,J.b5])
q(J.bX,[J.aT,J.t,A.bt,A.c5])
q(J.aT,[J.d4,J.bx,J.aS])
r(J.cQ,A.cb)
r(J.h5,J.t)
q(J.bq,[J.bU,J.cS])
q(A.C,[A.c_,A.aK,A.cT,A.dc,A.d8,A.dg,A.bZ,A.cD,A.az,A.cf,A.db,A.cd,A.cI])
q(A.a,[A.o,A.b8,A.c,A.bS,A.ba,A.by,A.bf,A.au])
q(A.o,[A.k,A.a8,A.a9,A.b6])
q(A.k,[A.w,A.O,A.J,A.dj])
r(A.bO,A.b8)
r(A.bP,A.ba)
q(A.aC,[A.bz,A.bi])
r(A.aW,A.bz)
q(A.bi,[A.aM,A.bA])
r(A.bC,A.bs)
r(A.ce,A.bC)
r(A.bL,A.ce)
r(A.bM,A.bK)
q(A.a6,[A.cO,A.cF,A.cG,A.da,A.j7,A.j9,A.iu,A.it,A.iW,A.iH,A.hd,A.dw,A.dY,A.dy,A.dB,A.dC,A.dJ,A.dF,A.dG,A.dH,A.dI,A.dK,A.dL,A.dM,A.dO,A.dQ,A.dR,A.dV,A.dU,A.dW,A.dz,A.e_,A.e1,A.et,A.eV,A.eW,A.fb,A.fc,A.fd,A.fe,A.ff,A.eY,A.f_,A.f3,A.f6,A.f9,A.eJ,A.eF,A.eH,A.eI,A.eO,A.eP,A.eT,A.eM,A.eN,A.eL,A.eB,A.eE,A.eA,A.h1,A.h2,A.h0,A.h3,A.fZ,A.fY,A.h_,A.fX,A.fi,A.fk,A.fG,A.fI,A.fK,A.fM,A.fl,A.fO,A.fn,A.fp,A.fr,A.ft,A.fw,A.fy,A.fA,A.fC,A.fD,A.fE,A.fH,A.fU,A.fW,A.fP,A.fQ,A.fS,A.fT,A.dv,A.ea,A.eb,A.e7,A.e6,A.e9,A.e5,A.hi,A.hn,A.hp,A.hq,A.ho,A.hl,A.hm,A.hk,A.hv,A.hy,A.hA,A.hD,A.hC,A.ht,A.hF,A.hw,A.hx,A.j1,A.hN,A.hP,A.hM,A.hL,A.ia,A.i9,A.ic,A.id,A.hR,A.hU,A.hW,A.hY,A.hZ,A.i2,A.i4,A.i6,A.eh,A.ej,A.el,A.je,A.jf,A.er,A.il,A.im,A.io,A.ip,A.jb,A.jc])
r(A.b3,A.cO)
q(A.cF,[A.hH,A.iv,A.iw,A.iR,A.h4,A.iy,A.iD,A.iC,A.iA,A.iz,A.iG,A.iF,A.iE,A.iP,A.iZ,A.dx,A.dX,A.dA,A.f4,A.hj,A.hG,A.j2])
r(A.c7,A.aK)
q(A.da,[A.d9,A.bp])
q(A.D,[A.aH,A.di])
q(A.cG,[A.h6,A.j8,A.iX,A.j_,A.iI,A.hb,A.hf,A.iM,A.dD,A.dE,A.dN,A.dP,A.dS,A.dT,A.dZ,A.e0,A.e2,A.eu,A.ew,A.ex,A.j6,A.eX,A.f7,A.fa,A.fg,A.eZ,A.f0,A.f1,A.f2,A.f5,A.f8,A.eK,A.eG,A.eQ,A.eR,A.eS,A.eU,A.eC,A.eD,A.fj,A.fv,A.fJ,A.fL,A.fN,A.fm,A.fo,A.fq,A.fs,A.fu,A.fx,A.fz,A.fB,A.fF,A.fV,A.fR,A.du,A.e8,A.hr,A.hz,A.hB,A.hE,A.hu,A.hO,A.i_,A.i7,A.i8,A.ib,A.hQ,A.hS,A.hT,A.hV,A.hX,A.i0,A.i1,A.i3,A.i5,A.ei,A.ek,A.jg,A.ij,A.ik,A.iq])
q(A.c5,[A.cV,A.bu])
q(A.bu,[A.ci,A.ck])
r(A.cj,A.ci)
r(A.c3,A.cj)
r(A.cl,A.ck)
r(A.c4,A.cl)
q(A.c3,[A.cW,A.cX])
q(A.c4,[A.cY,A.cZ,A.d_,A.d0,A.d1,A.c6,A.d2])
r(A.bB,A.dg)
r(A.dl,A.ct)
r(A.cm,A.bv)
r(A.as,A.cm)
r(A.cU,A.bZ)
r(A.h7,A.cH)
q(A.cJ,[A.h9,A.h8])
r(A.iK,A.iL)
q(A.az,[A.c9,A.cN])
q(A.df,[A.b2,A.ak,A.aD,A.an])
s(A.ci,A.B)
s(A.cj,A.I)
s(A.ck,A.B)
s(A.cl,A.I)
s(A.bC,A.cs)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{b:"int",i:"double",a1:"num",G:"String",e:"bool",ac:"Null",q:"List",z:"Object",aa:"Map",L:"JSObject"},mangledNames:{},types:["e(p)","e(Q)","b(p,p)","~()","b(Q,Q)","b()","b(b)","b(b,Q)","e(b0)","b(b,p)","e(ag)","e(a5)","e(a2)","~(~())","e(i)","i(a1,i)","b(b,M)","e(b)","p(p,p)","b(ag,ag)","p(a2)","0^(0^,0^)<a1>","~(z?,z?)","b(b,b)","ac(@)","@(@)","ac()","e(K,K)","i(i,p)","e(y)","e(M)","i(p)","b(b,ag)","p?(y)","ac(@,aU)","b(b,aV)","e(a7)","@(G)","b(at,at)","q<a5>(M)","i(i,a5)","b(ap,ap)","ac(~())","e(ap)","~(@,@)","a1(a1,b)","i(a1,p)","i(i,G)","~(@)","b(Q)","ac(z,aU)","+breakthrough,lower,teamSize,upper(e,i,b,i)()","e(aE{civilian:e})","~(aE,q<y>,G,Q{hero:p?})","i(i,i,b)","q<p>()","@(@,G)","i(a2)","i(K,K)","b(a2,a2)","~(G)","~(L)","i(i,Q)","~(b,@)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"3;":(a,b,c)=>d=>d instanceof A.aW&&a.b(d.a)&&b.b(d.b)&&c.b(d.c),"4;breakthrough,lower,teamSize,upper":a=>b=>b instanceof A.aM&&A.kL(a,b.a),"4;high,low,selfHigh,selfLow":a=>b=>b instanceof A.bA&&A.kL(a,b.a)}}
A.mb(v.typeUniverse,JSON.parse('{"aS":"aT","d4":"aT","bx":"aT","nw":"bt","cR":{"e":[],"A":[]},"bV":{"A":[]},"bX":{"L":[]},"aT":{"L":[]},"t":{"q":["1"],"o":["1"],"L":[],"a":["1"]},"cQ":{"cb":[]},"h5":{"t":["1"],"q":["1"],"o":["1"],"L":[],"a":["1"]},"b1":{"F":["1"]},"bq":{"i":[],"a1":[]},"bU":{"i":[],"b":[],"a1":[],"A":[]},"cS":{"i":[],"a1":[],"A":[]},"b5":{"G":[],"A":[]},"c_":{"C":[]},"o":{"a":["1"]},"k":{"o":["1"],"a":["1"]},"w":{"k":["1"],"o":["1"],"a":["1"],"a.E":"1","k.E":"1"},"r":{"F":["1"]},"b8":{"a":["2"],"a.E":"2"},"bO":{"b8":["1","2"],"o":["2"],"a":["2"],"a.E":"2"},"c2":{"F":["2"]},"O":{"k":["2"],"o":["2"],"a":["2"],"a.E":"2","k.E":"2"},"c":{"a":["1"],"a.E":"1"},"P":{"F":["1"]},"bS":{"a":["2"],"a.E":"2"},"bT":{"F":["2"]},"ba":{"a":["1"],"a.E":"1"},"bP":{"ba":["1"],"o":["1"],"a":["1"],"a.E":"1"},"bb":{"F":["1"]},"bQ":{"F":["1"]},"by":{"a":["1"],"a.E":"1"},"cg":{"F":["1"]},"J":{"k":["1"],"o":["1"],"a":["1"],"a.E":"1","k.E":"1"},"aW":{"bz":[],"aC":[]},"aM":{"bi":[],"aC":[]},"bA":{"bi":[],"aC":[]},"bL":{"ce":["1","2"],"bC":["1","2"],"bs":["1","2"],"cs":["1","2"],"aa":["1","2"]},"bK":{"aa":["1","2"]},"bM":{"bK":["1","2"],"aa":["1","2"]},"bf":{"a":["1"],"a.E":"1"},"ch":{"F":["1"]},"cO":{"a6":[],"aG":[]},"b3":{"a6":[],"aG":[]},"c7":{"aK":[],"C":[]},"cT":{"C":[]},"dc":{"C":[]},"cn":{"aU":[]},"a6":{"aG":[]},"cF":{"a6":[],"aG":[]},"cG":{"a6":[],"aG":[]},"da":{"a6":[],"aG":[]},"d9":{"a6":[],"aG":[]},"bp":{"a6":[],"aG":[]},"d8":{"C":[]},"aH":{"D":["1","2"],"k_":["1","2"],"aa":["1","2"],"D.K":"1","D.V":"2"},"a8":{"o":["1"],"a":["1"],"a.E":"1"},"b7":{"F":["1"]},"a9":{"o":["1"],"a":["1"],"a.E":"1"},"ai":{"F":["1"]},"b6":{"o":["ab<1,2>"],"a":["ab<1,2>"],"a.E":"ab<1,2>"},"c0":{"F":["ab<1,2>"]},"bz":{"aC":[]},"bi":{"aC":[]},"bt":{"L":[],"A":[]},"c5":{"L":[]},"cV":{"L":[],"A":[]},"bu":{"ah":["1"],"L":[]},"c3":{"B":["i"],"q":["i"],"ah":["i"],"o":["i"],"L":[],"a":["i"],"I":["i"]},"c4":{"B":["b"],"q":["b"],"ah":["b"],"o":["b"],"L":[],"a":["b"],"I":["b"]},"cW":{"B":["i"],"q":["i"],"ah":["i"],"o":["i"],"L":[],"a":["i"],"I":["i"],"A":[],"B.E":"i","I.E":"i"},"cX":{"B":["i"],"q":["i"],"ah":["i"],"o":["i"],"L":[],"a":["i"],"I":["i"],"A":[],"B.E":"i","I.E":"i"},"cY":{"B":["b"],"q":["b"],"ah":["b"],"o":["b"],"L":[],"a":["b"],"I":["b"],"A":[],"B.E":"b","I.E":"b"},"cZ":{"B":["b"],"q":["b"],"ah":["b"],"o":["b"],"L":[],"a":["b"],"I":["b"],"A":[],"B.E":"b","I.E":"b"},"d_":{"B":["b"],"q":["b"],"ah":["b"],"o":["b"],"L":[],"a":["b"],"I":["b"],"A":[],"B.E":"b","I.E":"b"},"d0":{"B":["b"],"q":["b"],"ah":["b"],"o":["b"],"L":[],"a":["b"],"I":["b"],"A":[],"B.E":"b","I.E":"b"},"d1":{"B":["b"],"q":["b"],"ah":["b"],"o":["b"],"L":[],"a":["b"],"I":["b"],"A":[],"B.E":"b","I.E":"b"},"c6":{"B":["b"],"q":["b"],"ah":["b"],"o":["b"],"L":[],"a":["b"],"I":["b"],"A":[],"B.E":"b","I.E":"b"},"d2":{"ju":[],"B":["b"],"q":["b"],"ah":["b"],"o":["b"],"L":[],"a":["b"],"I":["b"],"A":[],"B.E":"b","I.E":"b"},"dg":{"C":[]},"bB":{"aK":[],"C":[]},"aN":{"F":["1"]},"au":{"a":["1"],"a.E":"1"},"ao":{"C":[]},"W":{"aR":["1"]},"ct":{"k9":[]},"dl":{"ct":[],"k9":[]},"as":{"bv":["1"],"k1":["1"],"js":["1"],"o":["1"],"a":["1"]},"bg":{"F":["1"]},"D":{"aa":["1","2"]},"bs":{"aa":["1","2"]},"ce":{"bC":["1","2"],"bs":["1","2"],"cs":["1","2"],"aa":["1","2"]},"bv":{"js":["1"],"o":["1"],"a":["1"]},"cm":{"bv":["1"],"js":["1"],"o":["1"],"a":["1"]},"di":{"D":["G","@"],"aa":["G","@"],"D.K":"G","D.V":"@"},"dj":{"k":["G"],"o":["G"],"a":["G"],"a.E":"G","k.E":"G"},"bZ":{"C":[]},"cU":{"C":[]},"i":{"a1":[]},"b":{"a1":[]},"q":{"o":["1"],"a":["1"]},"df":{"cL":[]},"cD":{"C":[]},"aK":{"C":[]},"az":{"C":[]},"c9":{"C":[]},"cN":{"C":[]},"cf":{"C":[]},"db":{"C":[]},"cd":{"C":[]},"cI":{"C":[]},"d3":{"C":[]},"cc":{"C":[]},"dn":{"aU":[]},"bw":{"lJ":[]},"b2":{"cL":[]},"ak":{"cL":[]},"aD":{"cL":[]},"an":{"cL":[]},"lt":{"q":["b"],"o":["b"],"a":["b"]},"ju":{"q":["b"],"o":["b"],"a":["b"]},"lO":{"q":["b"],"o":["b"],"a":["b"]},"lr":{"q":["b"],"o":["b"],"a":["b"]},"lM":{"q":["b"],"o":["b"],"a":["b"]},"ls":{"q":["b"],"o":["b"],"a":["b"]},"lN":{"q":["b"],"o":["b"],"a":["b"]},"lo":{"q":["i"],"o":["i"],"a":["i"]},"lp":{"q":["i"],"o":["i"],"a":["i"]}}'))
A.ma(v.typeUniverse,JSON.parse('{"o":1,"bu":1,"cm":1,"cH":2,"cJ":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.cx
return{T:s("y"),q:s("Q"),I:s("M"),t:s("b0"),a9:s("aD"),r:s("p"),bJ:s("bo"),o:s("ag"),J:s("a5"),u:s("ao"),h:s("ap"),cM:s("bJ"),cs:s("a7"),U:s("o<@>"),V:s("C"),bo:s("bS<M,a5>"),k:s("aG"),O:s("a2"),E:s("b3<i>"),fy:s("a<Q>"),ef:s("a<p>"),er:s("a<a5>(M)"),R:s("a<@>"),w:s("t<y>"),Y:s("t<Q>"),Z:s("t<M>"),eu:s("t<b0>"),e:s("t<p>"),_:s("t<K>"),W:s("t<ag>"),m:s("t<a5>"),bL:s("t<ap>"),D:s("t<a2>"),a5:s("t<q<K>>"),eG:s("t<q<z>>"),b:s("t<q<i>>"),p:s("t<q<b>>"),d:s("t<aa<G,z?>>"),Q:s("t<z>"),eV:s("t<+(aE,q<y>,q<p>)>"),s:s("t<G>"),aD:s("t<aV>"),bQ:s("t<at>"),n:s("t<i>"),gn:s("t<@>"),a:s("t<b>"),v:s("bV"),A:s("L"),cj:s("aS"),aU:s("ah<@>"),f3:s("q<y>"),bd:s("q<p>"),j:s("q<@>"),L:s("q<b>"),d1:s("aa<G,@>"),f:s("aa<@,@>"),G:s("aa<G,z?>"),P:s("ac"),K:s("z"),gT:s("nx"),bY:s("+()"),fR:s("+(aE,q<y>,q<p>)"),l:s("aU"),N:s("G"),aQ:s("w<at>"),gf:s("aV"),dm:s("A"),eK:s("aK"),ak:s("bx"),eO:s("c<p>"),eq:s("c<i>"),cO:s("by<p>"),c:s("W<@>"),dp:s("at"),dT:s("au<a7>"),gL:s("au<b>"),y:s("e"),aO:s("e(p)"),al:s("e(z)"),db:s("e(i)"),i:s("i"),z:s("@"),fO:s("@()"),B:s("@(z)"),C:s("@(z,aU)"),S:s("b"),dg:s("p?"),eH:s("aR<ac>?"),an:s("L?"),bM:s("q<@>?"),eg:s("q<b>?"),X:s("z?"),dk:s("G?"),F:s("bd<@,@>?"),g:s("dk?"),fQ:s("e?"),cD:s("i?"),h6:s("b?"),cg:s("a1?"),H:s("a1"),x:s("~"),M:s("~()"),cA:s("~(G,@)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.a9=J.cP.prototype
B.a=J.t.prototype
B.c=J.bU.prototype
B.b=J.bq.prototype
B.p=J.b5.prototype
B.aa=J.aS.prototype
B.ab=J.bX.prototype
B.N=J.d4.prototype
B.A=J.bx.prototype
B.l=new A.an(0,"upgrade")
B.v=new A.an(1,"dismiss")
B.w=new A.an(2,"recruit")
B.m=new A.an(3,"soldiers")
B.B=new A.an(4,"buyWeapon")
B.C=new A.an(5,"dispatch")
B.O=new A.an(6,"move")
B.P=new A.an(8,"retreat")
B.f=new A.ak(0,"garrison")
B.k=new A.ak(2,"camped")
B.x=new A.ak(3,"queue")
B.D=new A.ak(4,"attacking")
B.e=new A.ak(5,"defending")
B.t=new A.ak(7,"retreating")
B.E=new A.aD(0,"full")
B.F=new A.aD(1,"resources")
B.y=new A.aD(2,"defense")
B.n=new A.aD(3,"attack")
B.M=s([],t._)
B.u=new A.bo(B.M,1/0,!1)
B.S=new A.bo(B.M,1/0,!1)
B.as=new A.cB(4,24,6,1.5,10,12,0.65,3,0.5,0.25,45,15,0.8,45,25,90,-0.15,10,3,1,96,160,6000,8,24,4,6,8,2,0,1,0.3,20,900,64,0.25,8,0.06,0.12,0.35,0.05,2500,2,20)
B.G=new A.b3(A.nm(),t.E)
B.z=new A.b3(A.nn(),t.E)
B.H=new A.cK()
B.T=new A.bQ(A.cx("bQ<0&>"))
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

B.i=new A.h7()
B.a_=new A.d3()
B.o=new A.ie()
B.j=new A.dl()
B.a0=new A.dn()
B.h=new A.b2(0,"favorable")
B.a1=new A.b2(1,"close")
B.r=new A.b2(2,"unfavorable")
B.K=new A.b2(3,"unknown")
B.at=s(["\u9759\u6001\u8bc4\u4f30\u914d\u989d\u8017\u5c3d"],t.s)
B.a2=new A.bJ(B.K,-1,1,0,0,!1)
B.a3=new A.aF("AI \u534f\u8bae\u7248\u672c\u4e0d\u5339\u914d")
B.a4=new A.aF("AI \u6784\u5efa\u7248\u672c\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u751f\u6210 Worker")
B.a5=new A.aF("\u672a\u77e5 AI \u5de5\u4f5c\u547d\u4ee4")
B.a6=new A.aF("AI \u5730\u56fe\u5c3a\u5bf8\u65e0\u6548")
B.a7=new A.aF("\u56fd\u5bb6\u89c4\u5212\u9759\u6001\u7248\u672c\u4e0d\u5339\u914d")
B.a8=new A.aF("\u56fd\u5bb6\u89c2\u5bdf\u8d85\u51fa\u534f\u8bae\u5bb9\u91cf")
B.ac=new A.h8(null)
B.ad=new A.h9(null)
B.Q=new A.ak(1,"marching")
B.R=new A.ak(6,"field")
B.L=s([B.f,B.Q,B.k,B.x,B.D,B.e,B.R,B.t],A.cx("t<ak>"))
B.ae=s([B.E,B.F,B.y,B.n],A.cx("t<aD>"))
B.af=s([],t.Z)
B.au=s([],t.W)
B.q=s([],t.m)
B.d=s([],t.a)
B.ag=A.ay("ns")
B.ah=A.ay("nt")
B.ai=A.ay("lo")
B.aj=A.ay("lp")
B.ak=A.ay("lr")
B.al=A.ay("ls")
B.am=A.ay("lt")
B.an=A.ay("z")
B.ao=A.ay("lM")
B.ap=A.ay("lN")
B.aq=A.ay("lO")
B.ar=A.ay("ju")})();(function staticFields(){$.iJ=null
$.aj=A.d([],t.Q)
$.k2=null
$.hI=0
$.hJ=A.mJ()
$.jU=null
$.jT=null
$.kD=null
$.kw=null
$.kN=null
$.j4=null
$.ja=null
$.jH=null
$.iO=A.d([],A.cx("t<q<z>?>"))
$.bE=null
$.cv=null
$.cw=null
$.jA=!1
$.N=B.j})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"nv","kQ",()=>A.j5("_$dart_dartClosure"))
s($,"nu","jK",()=>A.j5("_$dart_dartClosure_dartJSInterop"))
s($,"nM","l0",()=>A.d([new J.cQ()],A.cx("t<cb>")))
s($,"nA","kR",()=>A.aL(A.is({
toString:function(){return"$receiver$"}})))
s($,"nB","kS",()=>A.aL(A.is({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"nC","kT",()=>A.aL(A.is(null)))
s($,"nD","kU",()=>A.aL(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nG","kX",()=>A.aL(A.is(void 0)))
s($,"nH","kY",()=>A.aL(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nF","kW",()=>A.aL(A.k7(null)))
s($,"nE","kV",()=>A.aL(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"nJ","l_",()=>A.aL(A.k7(void 0)))
s($,"nI","kZ",()=>A.aL(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"nK","jM",()=>A.lP())
s($,"nL","dt",()=>A.kK(B.an))
s($,"ny","jL",()=>{A.lE()
return $.hI})})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.bt,SharedArrayBuffer:A.bt,ArrayBufferView:A.c5,DataView:A.cV,Float32Array:A.cW,Float64Array:A.cX,Int16Array:A.cY,Int32Array:A.cZ,Int8Array:A.d_,Uint16Array:A.d0,Uint32Array:A.d1,Uint8ClampedArray:A.c6,CanvasPixelArray:A.c6,Uint8Array:A.d2})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.bu.$nativeSuperclassTag="ArrayBufferView"
A.ci.$nativeSuperclassTag="ArrayBufferView"
A.cj.$nativeSuperclassTag="ArrayBufferView"
A.c3.$nativeSuperclassTag="ArrayBufferView"
A.ck.$nativeSuperclassTag="ArrayBufferView"
A.cl.$nativeSuperclassTag="ArrayBufferView"
A.c4.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.nk
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()