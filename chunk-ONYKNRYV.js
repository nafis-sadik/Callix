import{a as Zi,b as Xi,c as eo,d as to,e as io,f as oo}from"./chunk-RUQMVUKG.js";import{a as Gi,b as Je,c as en,e as no,f as tn,g as ao,h as ro,i as dt,j as pt}from"./chunk-RDG6L5OL.js";import{a as Zt,b as ct}from"./chunk-RJTDDAVK.js";import"./chunk-WDKUC3SW.js";import{a as an}from"./chunk-FXPUMWHH.js";import{b as Xt,c as Ji,d as Yi}from"./chunk-3G3LNDDJ.js";import{b as It,c as nn,d as on}from"./chunk-K4Y42BJL.js";import{a as Yt}from"./chunk-MYNZUSOY.js";import{$ as re,$a as ue,$b as An,A as xi,Aa as y,Ac as Jt,B,Ba as M,Bc as Oe,C as wi,Ca as K,Cb as Rn,Cc as qe,Da as Se,Dc as Me,Ea as Ut,Ec as ee,F as Ti,Fa as zt,Fb as Ui,Fc as oe,G as it,Ga as Ot,Gc as k,H as l,Ha as qt,Hc as xe,Ia as J,Ib as Ln,K as ki,Ka as ze,Kc as $i,Lb as zi,Lc as Hi,Ma as jt,Mb as Oi,N as E,Na as Bi,Nb as wt,Nc as Qi,O as de,Oa as Fi,Oc as Ki,Pa as $t,Pc as Ee,Qa as Ht,R as Z,Rc as St,S as V,Sa as se,Sb as Nn,Sc as Wi,T as g,Tc as me,U as C,Ua as N,Ub as Tt,Uc as Be,V as Si,Va as Di,W as Ii,Wa as q,X as w,Xa as Pi,Y as T,Ya as Qt,Z as Ke,_ as ae,_a as L,a as Te,aa as s,b as Pn,ba as d,bb as Ie,ca as p,cb as Ri,d as z,da as _,db as Ce,ea as ot,eb as Li,f as rr,fa as at,fb as le,fc as kt,g as _i,ga as pe,gc as qi,ha as fe,hb as A,i as Vt,ia as ge,ib as We,ja as W,k as Pe,ka as F,kc as st,l as Q,la as rt,lb as Kt,m as ce,ma as f,mb as Ni,n as Y,na as c,nb as Gt,o as bi,oa as he,p as h,pa as _e,pb as Ai,q as b,qa as be,r as v,ra as ve,rb as Vi,s as O,sa as S,sc as ie,t as vi,ta as I,tc as j,ua as Mi,uc as Re,va as Ei,vc as X,w as x,wa as Ge,wb as Ct,x as yi,xa as ye,xb as xt,xc as ji,y as D,ya as Ve,yc as Wt,z as Ci,za as Ue,zc as lt}from"./chunk-3EFON6GN.js";var fo=z(($p,mo)=>{"use strict";mo.exports=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}});var je=z(Ye=>{"use strict";var Vn,ur=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];Ye.getSymbolSize=function(i){if(!i)throw new Error('"version" cannot be null or undefined');if(i<1||i>40)throw new Error('"version" should be in range from 1 to 40');return i*4+17};Ye.getSymbolTotalCodewords=function(i){return ur[i]};Ye.getBCHDigit=function(t){let i=0;for(;t!==0;)i++,t>>>=1;return i};Ye.setToSJISFunction=function(i){if(typeof i!="function")throw new Error('"toSJISFunc" is not a valid function.');Vn=i};Ye.isKanjiModeEnabled=function(){return typeof Vn<"u"};Ye.toSJIS=function(i){return Vn(i)}});var ln=z(we=>{"use strict";we.L={bit:1};we.M={bit:0};we.Q={bit:3};we.H={bit:2};function mr(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return we.L;case"m":case"medium":return we.M;case"q":case"quartile":return we.Q;case"h":case"high":return we.H;default:throw new Error("Unknown EC Level: "+t)}}we.isValid=function(i){return i&&typeof i.bit<"u"&&i.bit>=0&&i.bit<4};we.from=function(i,e){if(we.isValid(i))return i;try{return mr(i)}catch{return e}}});var _o=z((Kp,ho)=>{"use strict";function go(){this.buffer=[],this.length=0}go.prototype={get:function(t){let i=Math.floor(t/8);return(this.buffer[i]>>>7-t%8&1)===1},put:function(t,i){for(let e=0;e<i;e++)this.putBit((t>>>i-e-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){let i=Math.floor(this.length/8);this.buffer.length<=i&&this.buffer.push(0),t&&(this.buffer[i]|=128>>>this.length%8),this.length++}};ho.exports=go});var vo=z((Gp,bo)=>{"use strict";function Mt(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}Mt.prototype.set=function(t,i,e,n){let o=t*this.size+i;this.data[o]=e,n&&(this.reservedBit[o]=!0)};Mt.prototype.get=function(t,i){return this.data[t*this.size+i]};Mt.prototype.xor=function(t,i,e){this.data[t*this.size+i]^=e};Mt.prototype.isReserved=function(t,i){return this.reservedBit[t*this.size+i]};bo.exports=Mt});var yo=z(cn=>{"use strict";var fr=je().getSymbolSize;cn.getRowColCoords=function(i){if(i===1)return[];let e=Math.floor(i/7)+2,n=fr(i),o=n===145?26:Math.ceil((n-13)/(2*e-2))*2,a=[n-7];for(let r=1;r<e-1;r++)a[r]=a[r-1]-o;return a.push(6),a.reverse()};cn.getPositions=function(i){let e=[],n=cn.getRowColCoords(i),o=n.length;for(let a=0;a<o;a++)for(let r=0;r<o;r++)a===0&&r===0||a===0&&r===o-1||a===o-1&&r===0||e.push([n[a],n[r]]);return e}});var wo=z(xo=>{"use strict";var gr=je().getSymbolSize,Co=7;xo.getPositions=function(i){let e=gr(i);return[[0,0],[e-Co,0],[0,e-Co]]}});var To=z($=>{"use strict";$.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var Ze={N1:3,N2:3,N3:40,N4:10};$.isValid=function(i){return i!=null&&i!==""&&!isNaN(i)&&i>=0&&i<=7};$.from=function(i){return $.isValid(i)?parseInt(i,10):void 0};$.getPenaltyN1=function(i){let e=i.size,n=0,o=0,a=0,r=null,u=null;for(let m=0;m<e;m++){o=a=0,r=u=null;for(let P=0;P<e;P++){let R=i.get(m,P);R===r?o++:(o>=5&&(n+=Ze.N1+(o-5)),r=R,o=1),R=i.get(P,m),R===u?a++:(a>=5&&(n+=Ze.N1+(a-5)),u=R,a=1)}o>=5&&(n+=Ze.N1+(o-5)),a>=5&&(n+=Ze.N1+(a-5))}return n};$.getPenaltyN2=function(i){let e=i.size,n=0;for(let o=0;o<e-1;o++)for(let a=0;a<e-1;a++){let r=i.get(o,a)+i.get(o,a+1)+i.get(o+1,a)+i.get(o+1,a+1);(r===4||r===0)&&n++}return n*Ze.N2};$.getPenaltyN3=function(i){let e=i.size,n=0,o=0,a=0;for(let r=0;r<e;r++){o=a=0;for(let u=0;u<e;u++)o=o<<1&2047|i.get(r,u),u>=10&&(o===1488||o===93)&&n++,a=a<<1&2047|i.get(u,r),u>=10&&(a===1488||a===93)&&n++}return n*Ze.N3};$.getPenaltyN4=function(i){let e=0,n=i.data.length;for(let a=0;a<n;a++)e+=i.data[a];return Math.abs(Math.ceil(e*100/n/5)-10)*Ze.N4};function hr(t,i,e){switch(t){case $.Patterns.PATTERN000:return(i+e)%2===0;case $.Patterns.PATTERN001:return i%2===0;case $.Patterns.PATTERN010:return e%3===0;case $.Patterns.PATTERN011:return(i+e)%3===0;case $.Patterns.PATTERN100:return(Math.floor(i/2)+Math.floor(e/3))%2===0;case $.Patterns.PATTERN101:return i*e%2+i*e%3===0;case $.Patterns.PATTERN110:return(i*e%2+i*e%3)%2===0;case $.Patterns.PATTERN111:return(i*e%3+(i+e)%2)%2===0;default:throw new Error("bad maskPattern:"+t)}}$.applyMask=function(i,e){let n=e.size;for(let o=0;o<n;o++)for(let a=0;a<n;a++)e.isReserved(a,o)||e.xor(a,o,hr(i,a,o))};$.getBestMask=function(i,e){let n=Object.keys($.Patterns).length,o=0,a=1/0;for(let r=0;r<n;r++){e(r),$.applyMask(r,i);let u=$.getPenaltyN1(i)+$.getPenaltyN2(i)+$.getPenaltyN3(i)+$.getPenaltyN4(i);$.applyMask(r,i),u<a&&(a=u,o=r)}return o}});var zn=z(Un=>{"use strict";var $e=ln(),dn=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],pn=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];Un.getBlocksCount=function(i,e){switch(e){case $e.L:return dn[(i-1)*4+0];case $e.M:return dn[(i-1)*4+1];case $e.Q:return dn[(i-1)*4+2];case $e.H:return dn[(i-1)*4+3];default:return}};Un.getTotalCodewordsCount=function(i,e){switch(e){case $e.L:return pn[(i-1)*4+0];case $e.M:return pn[(i-1)*4+1];case $e.Q:return pn[(i-1)*4+2];case $e.H:return pn[(i-1)*4+3];default:return}}});var ko=z(mn=>{"use strict";var Et=new Uint8Array(512),un=new Uint8Array(256);(function(){let i=1;for(let e=0;e<255;e++)Et[e]=i,un[i]=e,i<<=1,i&256&&(i^=285);for(let e=255;e<512;e++)Et[e]=Et[e-255]})();mn.log=function(i){if(i<1)throw new Error("log("+i+")");return un[i]};mn.exp=function(i){return Et[i]};mn.mul=function(i,e){return i===0||e===0?0:Et[un[i]+un[e]]}});var So=z(Bt=>{"use strict";var On=ko();Bt.mul=function(i,e){let n=new Uint8Array(i.length+e.length-1);for(let o=0;o<i.length;o++)for(let a=0;a<e.length;a++)n[o+a]^=On.mul(i[o],e[a]);return n};Bt.mod=function(i,e){let n=new Uint8Array(i);for(;n.length-e.length>=0;){let o=n[0];for(let r=0;r<e.length;r++)n[r]^=On.mul(e[r],o);let a=0;for(;a<n.length&&n[a]===0;)a++;n=n.slice(a)}return n};Bt.generateECPolynomial=function(i){let e=new Uint8Array([1]);for(let n=0;n<i;n++)e=Bt.mul(e,new Uint8Array([1,On.exp(n)]));return e}});var Eo=z((tu,Mo)=>{"use strict";var Io=So();function qn(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}qn.prototype.initialize=function(i){this.degree=i,this.genPoly=Io.generateECPolynomial(this.degree)};qn.prototype.encode=function(i){if(!this.genPoly)throw new Error("Encoder not initialized");let e=new Uint8Array(i.length+this.degree);e.set(i);let n=Io.mod(e,this.genPoly),o=this.degree-n.length;if(o>0){let a=new Uint8Array(this.degree);return a.set(n,o),a}return n};Mo.exports=qn});var jn=z(Bo=>{"use strict";Bo.isValid=function(i){return!isNaN(i)&&i>=1&&i<=40}});var $n=z(Le=>{"use strict";var Fo="[0-9]+",_r="[A-Z $%*+\\-./:]+",Ft="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";Ft=Ft.replace(/u/g,"\\u");var br="(?:(?![A-Z0-9 $%*+\\-./:]|"+Ft+`)(?:.|[\r
]))+`;Le.KANJI=new RegExp(Ft,"g");Le.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");Le.BYTE=new RegExp(br,"g");Le.NUMERIC=new RegExp(Fo,"g");Le.ALPHANUMERIC=new RegExp(_r,"g");var vr=new RegExp("^"+Ft+"$"),yr=new RegExp("^"+Fo+"$"),Cr=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");Le.testKanji=function(i){return vr.test(i)};Le.testNumeric=function(i){return yr.test(i)};Le.testAlphanumeric=function(i){return Cr.test(i)}});var He=z(te=>{"use strict";var xr=jn(),Hn=$n();te.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]};te.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]};te.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]};te.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]};te.MIXED={bit:-1};te.getCharCountIndicator=function(i,e){if(!i.ccBits)throw new Error("Invalid mode: "+i);if(!xr.isValid(e))throw new Error("Invalid version: "+e);return e>=1&&e<10?i.ccBits[0]:e<27?i.ccBits[1]:i.ccBits[2]};te.getBestModeForData=function(i){return Hn.testNumeric(i)?te.NUMERIC:Hn.testAlphanumeric(i)?te.ALPHANUMERIC:Hn.testKanji(i)?te.KANJI:te.BYTE};te.toString=function(i){if(i&&i.id)return i.id;throw new Error("Invalid mode")};te.isValid=function(i){return i&&i.bit&&i.ccBits};function wr(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return te.NUMERIC;case"alphanumeric":return te.ALPHANUMERIC;case"kanji":return te.KANJI;case"byte":return te.BYTE;default:throw new Error("Unknown mode: "+t)}}te.from=function(i,e){if(te.isValid(i))return i;try{return wr(i)}catch{return e}}});var No=z(Xe=>{"use strict";var fn=je(),Tr=zn(),Do=ln(),Qe=He(),Qn=jn(),Ro=7973,Po=fn.getBCHDigit(Ro);function kr(t,i,e){for(let n=1;n<=40;n++)if(i<=Xe.getCapacity(n,e,t))return n}function Lo(t,i){return Qe.getCharCountIndicator(t,i)+4}function Sr(t,i){let e=0;return t.forEach(function(n){let o=Lo(n.mode,i);e+=o+n.getBitsLength()}),e}function Ir(t,i){for(let e=1;e<=40;e++)if(Sr(t,e)<=Xe.getCapacity(e,i,Qe.MIXED))return e}Xe.from=function(i,e){return Qn.isValid(i)?parseInt(i,10):e};Xe.getCapacity=function(i,e,n){if(!Qn.isValid(i))throw new Error("Invalid QR Code version");typeof n>"u"&&(n=Qe.BYTE);let o=fn.getSymbolTotalCodewords(i),a=Tr.getTotalCodewordsCount(i,e),r=(o-a)*8;if(n===Qe.MIXED)return r;let u=r-Lo(n,i);switch(n){case Qe.NUMERIC:return Math.floor(u/10*3);case Qe.ALPHANUMERIC:return Math.floor(u/11*2);case Qe.KANJI:return Math.floor(u/13);case Qe.BYTE:default:return Math.floor(u/8)}};Xe.getBestVersionForData=function(i,e){let n,o=Do.from(e,Do.M);if(Array.isArray(i)){if(i.length>1)return Ir(i,o);if(i.length===0)return 1;n=i[0]}else n=i;return kr(n.mode,n.getLength(),o)};Xe.getEncodedBits=function(i){if(!Qn.isValid(i)||i<7)throw new Error("Invalid QR Code version");let e=i<<12;for(;fn.getBCHDigit(e)-Po>=0;)e^=Ro<<fn.getBCHDigit(e)-Po;return i<<12|e}});var zo=z(Uo=>{"use strict";var Kn=je(),Vo=1335,Mr=21522,Ao=Kn.getBCHDigit(Vo);Uo.getEncodedBits=function(i,e){let n=i.bit<<3|e,o=n<<10;for(;Kn.getBCHDigit(o)-Ao>=0;)o^=Vo<<Kn.getBCHDigit(o)-Ao;return(n<<10|o)^Mr}});var qo=z((su,Oo)=>{"use strict";var Er=He();function ut(t){this.mode=Er.NUMERIC,this.data=t.toString()}ut.getBitsLength=function(i){return 10*Math.floor(i/3)+(i%3?i%3*3+1:0)};ut.prototype.getLength=function(){return this.data.length};ut.prototype.getBitsLength=function(){return ut.getBitsLength(this.data.length)};ut.prototype.write=function(i){let e,n,o;for(e=0;e+3<=this.data.length;e+=3)n=this.data.substr(e,3),o=parseInt(n,10),i.put(o,10);let a=this.data.length-e;a>0&&(n=this.data.substr(e),o=parseInt(n,10),i.put(o,a*3+1))};Oo.exports=ut});var $o=z((lu,jo)=>{"use strict";var Br=He(),Gn=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function mt(t){this.mode=Br.ALPHANUMERIC,this.data=t}mt.getBitsLength=function(i){return 11*Math.floor(i/2)+6*(i%2)};mt.prototype.getLength=function(){return this.data.length};mt.prototype.getBitsLength=function(){return mt.getBitsLength(this.data.length)};mt.prototype.write=function(i){let e;for(e=0;e+2<=this.data.length;e+=2){let n=Gn.indexOf(this.data[e])*45;n+=Gn.indexOf(this.data[e+1]),i.put(n,11)}this.data.length%2&&i.put(Gn.indexOf(this.data[e]),6)};jo.exports=mt});var Qo=z((cu,Ho)=>{"use strict";var Fr=He();function ft(t){this.mode=Fr.BYTE,typeof t=="string"?this.data=new TextEncoder().encode(t):this.data=new Uint8Array(t)}ft.getBitsLength=function(i){return i*8};ft.prototype.getLength=function(){return this.data.length};ft.prototype.getBitsLength=function(){return ft.getBitsLength(this.data.length)};ft.prototype.write=function(t){for(let i=0,e=this.data.length;i<e;i++)t.put(this.data[i],8)};Ho.exports=ft});var Go=z((du,Ko)=>{"use strict";var Dr=He(),Pr=je();function gt(t){this.mode=Dr.KANJI,this.data=t}gt.getBitsLength=function(i){return i*13};gt.prototype.getLength=function(){return this.data.length};gt.prototype.getBitsLength=function(){return gt.getBitsLength(this.data.length)};gt.prototype.write=function(t){let i;for(i=0;i<this.data.length;i++){let e=Pr.toSJIS(this.data[i]);if(e>=33088&&e<=40956)e-=33088;else if(e>=57408&&e<=60351)e-=49472;else throw new Error("Invalid SJIS character: "+this.data[i]+`
Make sure your charset is UTF-8`);e=(e>>>8&255)*192+(e&255),t.put(e,13)}};Ko.exports=gt});var Wo=z((pu,Wn)=>{"use strict";var Dt={single_source_shortest_paths:function(t,i,e){var n={},o={};o[i]=0;var a=Dt.PriorityQueue.make();a.push(i,0);for(var r,u,m,P,R,ne,H,ke,Ne;!a.empty();){r=a.pop(),u=r.value,P=r.cost,R=t[u]||{};for(m in R)R.hasOwnProperty(m)&&(ne=R[m],H=P+ne,ke=o[m],Ne=typeof o[m]>"u",(Ne||ke>H)&&(o[m]=H,a.push(m,H),n[m]=u))}if(typeof e<"u"&&typeof o[e]>"u"){var Ae=["Could not find a path from ",i," to ",e,"."].join("");throw new Error(Ae)}return n},extract_shortest_path_from_predecessor_list:function(t,i){for(var e=[],n=i,o;n;)e.push(n),o=t[n],n=t[n];return e.reverse(),e},find_path:function(t,i,e){var n=Dt.single_source_shortest_paths(t,i,e);return Dt.extract_shortest_path_from_predecessor_list(n,e)},PriorityQueue:{make:function(t){var i=Dt.PriorityQueue,e={},n;t=t||{};for(n in i)i.hasOwnProperty(n)&&(e[n]=i[n]);return e.queue=[],e.sorter=t.sorter||i.default_sorter,e},default_sorter:function(t,i){return t.cost-i.cost},push:function(t,i){var e={value:t,cost:i};this.queue.push(e),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};typeof Wn<"u"&&(Wn.exports=Dt)});var ia=z(ht=>{"use strict";var U=He(),Zo=qo(),Xo=$o(),ea=Qo(),ta=Go(),Pt=$n(),gn=je(),Rr=Wo();function Jo(t){return unescape(encodeURIComponent(t)).length}function Rt(t,i,e){let n=[],o;for(;(o=t.exec(e))!==null;)n.push({data:o[0],index:o.index,mode:i,length:o[0].length});return n}function na(t){let i=Rt(Pt.NUMERIC,U.NUMERIC,t),e=Rt(Pt.ALPHANUMERIC,U.ALPHANUMERIC,t),n,o;return gn.isKanjiModeEnabled()?(n=Rt(Pt.BYTE,U.BYTE,t),o=Rt(Pt.KANJI,U.KANJI,t)):(n=Rt(Pt.BYTE_KANJI,U.BYTE,t),o=[]),i.concat(e,n,o).sort(function(r,u){return r.index-u.index}).map(function(r){return{data:r.data,mode:r.mode,length:r.length}})}function Jn(t,i){switch(i){case U.NUMERIC:return Zo.getBitsLength(t);case U.ALPHANUMERIC:return Xo.getBitsLength(t);case U.KANJI:return ta.getBitsLength(t);case U.BYTE:return ea.getBitsLength(t)}}function Lr(t){return t.reduce(function(i,e){let n=i.length-1>=0?i[i.length-1]:null;return n&&n.mode===e.mode?(i[i.length-1].data+=e.data,i):(i.push(e),i)},[])}function Nr(t){let i=[];for(let e=0;e<t.length;e++){let n=t[e];switch(n.mode){case U.NUMERIC:i.push([n,{data:n.data,mode:U.ALPHANUMERIC,length:n.length},{data:n.data,mode:U.BYTE,length:n.length}]);break;case U.ALPHANUMERIC:i.push([n,{data:n.data,mode:U.BYTE,length:n.length}]);break;case U.KANJI:i.push([n,{data:n.data,mode:U.BYTE,length:Jo(n.data)}]);break;case U.BYTE:i.push([{data:n.data,mode:U.BYTE,length:Jo(n.data)}])}}return i}function Ar(t,i){let e={},n={start:{}},o=["start"];for(let a=0;a<t.length;a++){let r=t[a],u=[];for(let m=0;m<r.length;m++){let P=r[m],R=""+a+m;u.push(R),e[R]={node:P,lastCount:0},n[R]={};for(let ne=0;ne<o.length;ne++){let H=o[ne];e[H]&&e[H].node.mode===P.mode?(n[H][R]=Jn(e[H].lastCount+P.length,P.mode)-Jn(e[H].lastCount,P.mode),e[H].lastCount+=P.length):(e[H]&&(e[H].lastCount=P.length),n[H][R]=Jn(P.length,P.mode)+4+U.getCharCountIndicator(P.mode,i))}}o=u}for(let a=0;a<o.length;a++)n[o[a]].end=0;return{map:n,table:e}}function Yo(t,i){let e,n=U.getBestModeForData(t);if(e=U.from(i,n),e!==U.BYTE&&e.bit<n.bit)throw new Error('"'+t+'" cannot be encoded with mode '+U.toString(e)+`.
 Suggested mode is: `+U.toString(n));switch(e===U.KANJI&&!gn.isKanjiModeEnabled()&&(e=U.BYTE),e){case U.NUMERIC:return new Zo(t);case U.ALPHANUMERIC:return new Xo(t);case U.KANJI:return new ta(t);case U.BYTE:return new ea(t)}}ht.fromArray=function(i){return i.reduce(function(e,n){return typeof n=="string"?e.push(Yo(n,null)):n.data&&e.push(Yo(n.data,n.mode)),e},[])};ht.fromString=function(i,e){let n=na(i,gn.isKanjiModeEnabled()),o=Nr(n),a=Ar(o,e),r=Rr.find_path(a.map,"start","end"),u=[];for(let m=1;m<r.length-1;m++)u.push(a.table[r[m]].node);return ht.fromArray(Lr(u))};ht.rawSplit=function(i){return ht.fromArray(na(i,gn.isKanjiModeEnabled()))}});var aa=z(oa=>{"use strict";var _n=je(),Yn=ln(),Vr=_o(),Ur=vo(),zr=yo(),Or=wo(),ei=To(),ti=zn(),qr=Eo(),hn=No(),jr=zo(),$r=He(),Zn=ia();function Hr(t,i){let e=t.size,n=Or.getPositions(i);for(let o=0;o<n.length;o++){let a=n[o][0],r=n[o][1];for(let u=-1;u<=7;u++)if(!(a+u<=-1||e<=a+u))for(let m=-1;m<=7;m++)r+m<=-1||e<=r+m||(u>=0&&u<=6&&(m===0||m===6)||m>=0&&m<=6&&(u===0||u===6)||u>=2&&u<=4&&m>=2&&m<=4?t.set(a+u,r+m,!0,!0):t.set(a+u,r+m,!1,!0))}}function Qr(t){let i=t.size;for(let e=8;e<i-8;e++){let n=e%2===0;t.set(e,6,n,!0),t.set(6,e,n,!0)}}function Kr(t,i){let e=zr.getPositions(i);for(let n=0;n<e.length;n++){let o=e[n][0],a=e[n][1];for(let r=-2;r<=2;r++)for(let u=-2;u<=2;u++)r===-2||r===2||u===-2||u===2||r===0&&u===0?t.set(o+r,a+u,!0,!0):t.set(o+r,a+u,!1,!0)}}function Gr(t,i){let e=t.size,n=hn.getEncodedBits(i),o,a,r;for(let u=0;u<18;u++)o=Math.floor(u/3),a=u%3+e-8-3,r=(n>>u&1)===1,t.set(o,a,r,!0),t.set(a,o,r,!0)}function Xn(t,i,e){let n=t.size,o=jr.getEncodedBits(i,e),a,r;for(a=0;a<15;a++)r=(o>>a&1)===1,a<6?t.set(a,8,r,!0):a<8?t.set(a+1,8,r,!0):t.set(n-15+a,8,r,!0),a<8?t.set(8,n-a-1,r,!0):a<9?t.set(8,15-a-1+1,r,!0):t.set(8,15-a-1,r,!0);t.set(n-8,8,1,!0)}function Wr(t,i){let e=t.size,n=-1,o=e-1,a=7,r=0;for(let u=e-1;u>0;u-=2)for(u===6&&u--;;){for(let m=0;m<2;m++)if(!t.isReserved(o,u-m)){let P=!1;r<i.length&&(P=(i[r]>>>a&1)===1),t.set(o,u-m,P),a--,a===-1&&(r++,a=7)}if(o+=n,o<0||e<=o){o-=n,n=-n;break}}}function Jr(t,i,e){let n=new Vr;e.forEach(function(m){n.put(m.mode.bit,4),n.put(m.getLength(),$r.getCharCountIndicator(m.mode,t)),m.write(n)});let o=_n.getSymbolTotalCodewords(t),a=ti.getTotalCodewordsCount(t,i),r=(o-a)*8;for(n.getLengthInBits()+4<=r&&n.put(0,4);n.getLengthInBits()%8!==0;)n.putBit(0);let u=(r-n.getLengthInBits())/8;for(let m=0;m<u;m++)n.put(m%2?17:236,8);return Yr(n,t,i)}function Yr(t,i,e){let n=_n.getSymbolTotalCodewords(i),o=ti.getTotalCodewordsCount(i,e),a=n-o,r=ti.getBlocksCount(i,e),u=n%r,m=r-u,P=Math.floor(n/r),R=Math.floor(a/r),ne=R+1,H=P-R,ke=new qr(H),Ne=0,Ae=new Array(r),gi=new Array(r),Bn=0,ar=new Uint8Array(t.buffer);for(let nt=0;nt<r;nt++){let Dn=nt<m?R:ne;Ae[nt]=ar.slice(Ne,Ne+Dn),gi[nt]=ke.encode(Ae[nt]),Ne+=Dn,Bn=Math.max(Bn,Dn)}let Fn=new Uint8Array(n),hi=0,Fe,De;for(Fe=0;Fe<Bn;Fe++)for(De=0;De<r;De++)Fe<Ae[De].length&&(Fn[hi++]=Ae[De][Fe]);for(Fe=0;Fe<H;Fe++)for(De=0;De<r;De++)Fn[hi++]=gi[De][Fe];return Fn}function Zr(t,i,e,n){let o;if(Array.isArray(t))o=Zn.fromArray(t);else if(typeof t=="string"){let P=i;if(!P){let R=Zn.rawSplit(t);P=hn.getBestVersionForData(R,e)}o=Zn.fromString(t,P||40)}else throw new Error("Invalid data");let a=hn.getBestVersionForData(o,e);if(!a)throw new Error("The amount of data is too big to be stored in a QR Code");if(!i)i=a;else if(i<a)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+a+`.
`);let r=Jr(i,e,o),u=_n.getSymbolSize(i),m=new Ur(u);return Hr(m,i),Qr(m),Kr(m,i),Xn(m,e,0),i>=7&&Gr(m,i),Wr(m,r),isNaN(n)&&(n=ei.getBestMask(m,Xn.bind(null,m,e))),ei.applyMask(n,m),Xn(m,e,n),{modules:m,version:i,errorCorrectionLevel:e,maskPattern:n,segments:o}}oa.create=function(i,e){if(typeof i>"u"||i==="")throw new Error("No input text");let n=Yn.M,o,a;return typeof e<"u"&&(n=Yn.from(e.errorCorrectionLevel,Yn.M),o=hn.from(e.version),a=ei.from(e.maskPattern),e.toSJISFunc&&_n.setToSJISFunction(e.toSJISFunc)),Zr(i,o,n,a)}});var ni=z(et=>{"use strict";function ra(t){if(typeof t=="number"&&(t=t.toString()),typeof t!="string")throw new Error("Color should be defined as hex string");let i=t.slice().replace("#","").split("");if(i.length<3||i.length===5||i.length>8)throw new Error("Invalid hex color: "+t);(i.length===3||i.length===4)&&(i=Array.prototype.concat.apply([],i.map(function(n){return[n,n]}))),i.length===6&&i.push("F","F");let e=parseInt(i.join(""),16);return{r:e>>24&255,g:e>>16&255,b:e>>8&255,a:e&255,hex:"#"+i.slice(0,6).join("")}}et.getOptions=function(i){i||(i={}),i.color||(i.color={});let e=typeof i.margin>"u"||i.margin===null||i.margin<0?4:i.margin,n=i.width&&i.width>=21?i.width:void 0,o=i.scale||4;return{width:n,scale:n?4:o,margin:e,color:{dark:ra(i.color.dark||"#000000ff"),light:ra(i.color.light||"#ffffffff")},type:i.type,rendererOpts:i.rendererOpts||{}}};et.getScale=function(i,e){return e.width&&e.width>=i+e.margin*2?e.width/(i+e.margin*2):e.scale};et.getImageWidth=function(i,e){let n=et.getScale(i,e);return Math.floor((i+e.margin*2)*n)};et.qrToImageData=function(i,e,n){let o=e.modules.size,a=e.modules.data,r=et.getScale(o,n),u=Math.floor((o+n.margin*2)*r),m=n.margin*r,P=[n.color.light,n.color.dark];for(let R=0;R<u;R++)for(let ne=0;ne<u;ne++){let H=(R*u+ne)*4,ke=n.color.light;if(R>=m&&ne>=m&&R<u-m&&ne<u-m){let Ne=Math.floor((R-m)/r),Ae=Math.floor((ne-m)/r);ke=P[a[Ne*o+Ae]?1:0]}i[H++]=ke.r,i[H++]=ke.g,i[H++]=ke.b,i[H]=ke.a}}});var sa=z(bn=>{"use strict";var ii=ni();function Xr(t,i,e){t.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=e,i.width=e,i.style.height=e+"px",i.style.width=e+"px"}function es(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}bn.render=function(i,e,n){let o=n,a=e;typeof o>"u"&&(!e||!e.getContext)&&(o=e,e=void 0),e||(a=es()),o=ii.getOptions(o);let r=ii.getImageWidth(i.modules.size,o),u=a.getContext("2d"),m=u.createImageData(r,r);return ii.qrToImageData(m.data,i,o),Xr(u,a,r),u.putImageData(m,0,0),a};bn.renderToDataURL=function(i,e,n){let o=n;typeof o>"u"&&(!e||!e.getContext)&&(o=e,e=void 0),o||(o={});let a=bn.render(i,e,o),r=o.type||"image/png",u=o.rendererOpts||{};return a.toDataURL(r,u.quality)}});var da=z(ca=>{"use strict";var ts=ni();function la(t,i){let e=t.a/255,n=i+'="'+t.hex+'"';return e<1?n+" "+i+'-opacity="'+e.toFixed(2).slice(1)+'"':n}function oi(t,i,e){let n=t+i;return typeof e<"u"&&(n+=" "+e),n}function ns(t,i,e){let n="",o=0,a=!1,r=0;for(let u=0;u<t.length;u++){let m=Math.floor(u%i),P=Math.floor(u/i);!m&&!a&&(a=!0),t[u]?(r++,u>0&&m>0&&t[u-1]||(n+=a?oi("M",m+e,.5+P+e):oi("m",o,0),o=0,a=!1),m+1<i&&t[u+1]||(n+=oi("h",r),r=0)):o++}return n}ca.render=function(i,e,n){let o=ts.getOptions(e),a=i.modules.size,r=i.modules.data,u=a+o.margin*2,m=o.color.light.a?"<path "+la(o.color.light,"fill")+' d="M0 0h'+u+"v"+u+'H0z"/>':"",P="<path "+la(o.color.dark,"stroke")+' d="'+ns(r,a,o.margin)+'"/>',R='viewBox="0 0 '+u+" "+u+'"',H='<svg xmlns="http://www.w3.org/2000/svg" '+(o.width?'width="'+o.width+'" height="'+o.width+'" ':"")+R+' shape-rendering="crispEdges">'+m+P+`</svg>
`;return typeof n=="function"&&n(null,H),H}});var ua=z(Lt=>{"use strict";var is=fo(),ai=aa(),pa=sa(),os=da();function ri(t,i,e,n,o){let a=[].slice.call(arguments,1),r=a.length,u=typeof a[r-1]=="function";if(!u&&!is())throw new Error("Callback required as last argument");if(u){if(r<2)throw new Error("Too few arguments provided");r===2?(o=e,e=i,i=n=void 0):r===3&&(i.getContext&&typeof o>"u"?(o=n,n=void 0):(o=n,n=e,e=i,i=void 0))}else{if(r<1)throw new Error("Too few arguments provided");return r===1?(e=i,i=n=void 0):r===2&&!i.getContext&&(n=e,e=i,i=void 0),new Promise(function(m,P){try{let R=ai.create(e,n);m(t(R,i,n))}catch(R){P(R)}})}try{let m=ai.create(e,n);o(null,t(m,i,n))}catch(m){o(m)}}Lt.create=ai.create;Lt.toCanvas=ri.bind(null,pa.render);Lt.toDataURL=ri.bind(null,pa.renderToDataURL);Lt.toString=ri.bind(null,function(t,i,e){return os.render(t,e)})});var rn=class t{mediaRecorder=null;recordedChunks=[];isRecording=D(!1);startRecording(i){this.recordedChunks=[];let e=MediaRecorder.isTypeSupported("video/webm;codecs=vp9")?"video/webm;codecs=vp9":"video/webm";this.mediaRecorder=new MediaRecorder(i,{mimeType:e}),this.mediaRecorder.ondataavailable=n=>{n.data.size>0&&this.recordedChunks.push(n.data)},this.mediaRecorder.start(1e3),this.isRecording.set(!0)}stopRecording(){return!this.mediaRecorder||this.mediaRecorder.state==="inactive"?Promise.resolve(null):new Promise(i=>{let e=this.mediaRecorder;e.onstop=()=>{let n=new Blob(this.recordedChunks,{type:e.mimeType});this.recordedChunks=[],i(n)},e.stop(),this.mediaRecorder=null,this.isRecording.set(!1)})}downloadRecording(i,e="recording.webm"){let n=URL.createObjectURL(i),o=document.createElement("a");o.href=n,o.download=e,o.click(),URL.revokeObjectURL(n)}static \u0275fac=function(e){return new(e||t)};static \u0275prov=Q({token:t,factory:t.\u0275fac,providedIn:"root"})};var sn=class t{constructor(i){this.peerService=i}startMediaPlayback(i){let e={type:"media-sync",payload:{action:"load",url:i,currentTime:0},timestamp:Date.now(),senderId:"",encrypted:!1};this.peerService.broadcastMessage(e).catch(n=>console.error("Failed to broadcast media sync:",n))}syncPlayback(i,e){let n={type:"media-sync",payload:{action:i,currentTime:e},timestamp:Date.now(),senderId:"",encrypted:!1};this.peerService.broadcastMessage(n).catch(o=>console.error("Failed to broadcast sync playback:",o))}stopMediaPlayback(){let i={type:"media-sync",payload:{action:"stop"},timestamp:Date.now(),senderId:"",encrypted:!1};this.peerService.broadcastMessage(i).catch(e=>console.error("Failed to broadcast stop media:",e))}static \u0275fac=function(e){return new(e||t)(bi(Xt))};static \u0275prov=Q({token:t,factory:t.\u0275fac,providedIn:"root"})};var sr=["data-p-icon","chevron-left"],so=(()=>{class t extends Ee{static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","chevron-left"]],features:[V],attrs:sr,decls:1,vars:0,consts:[["d","M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z","fill","currentColor"]],template:function(n,o){n&1&&(O(),pe(0,"path",0))},encapsulation:2})}return t})();var lr=["data-p-icon","chevron-right"],lo=(()=>{class t extends Ee{static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","chevron-right"]],features:[V],attrs:lr,decls:1,vars:0,consts:[["d","M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z","fill","currentColor"]],template:function(n,o){n&1&&(O(),pe(0,"path",0))},encapsulation:2})}return t})();var cr=["data-p-icon","minus"],co=(()=>{class t extends Ee{static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","minus"]],features:[V],attrs:cr,decls:1,vars:0,consts:[["d","M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z","fill","currentColor"]],template:function(n,o){n&1&&(O(),pe(0,"path",0))},encapsulation:2})}return t})();var dr=["data-p-icon","plus"],po=(()=>{class t extends Ee{pathId;onInit(){this.pathId="url(#"+st()+")"}static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","plus"]],features:[V],attrs:dr,decls:5,vars:2,consts:[["d","M7.67742 6.32258V0.677419C7.67742 0.497757 7.60605 0.325452 7.47901 0.198411C7.35197 0.0713707 7.17966 0 7 0C6.82034 0 6.64803 0.0713707 6.52099 0.198411C6.39395 0.325452 6.32258 0.497757 6.32258 0.677419V6.32258H0.677419C0.497757 6.32258 0.325452 6.39395 0.198411 6.52099C0.0713707 6.64803 0 6.82034 0 7C0 7.17966 0.0713707 7.35197 0.198411 7.47901C0.325452 7.60605 0.497757 7.67742 0.677419 7.67742H6.32258V13.3226C6.32492 13.5015 6.39704 13.6725 6.52358 13.799C6.65012 13.9255 6.82106 13.9977 7 14C7.17966 14 7.35197 13.9286 7.47901 13.8016C7.60605 13.6745 7.67742 13.5022 7.67742 13.3226V7.67742H13.3226C13.5022 7.67742 13.6745 7.60605 13.8016 7.47901C13.9286 7.35197 14 7.17966 14 7C13.9977 6.82106 13.9255 6.65012 13.799 6.52358C13.6725 6.39704 13.5015 6.32492 13.3226 6.32258H7.67742Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,o){n&1&&(O(),ot(0,"g"),pe(1,"path",0),at(),ot(2,"defs")(3,"clipPath",1),pe(4,"rect",2),at()()),n&2&&(C("clip-path",o.pathId),l(3),rt("id",o.pathId))},encapsulation:2})}return t})();var pr=["data-p-icon","upload"],uo=(()=>{class t extends Ee{pathId;onInit(){this.pathId="url(#"+st()+")"}static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","upload"]],features:[V],attrs:pr,decls:5,vars:2,consts:[["fill-rule","evenodd","clip-rule","evenodd","d","M6.58942 9.82197C6.70165 9.93405 6.85328 9.99793 7.012 10C7.17071 9.99793 7.32234 9.93405 7.43458 9.82197C7.54681 9.7099 7.61079 9.55849 7.61286 9.4V2.04798L9.79204 4.22402C9.84752 4.28011 9.91365 4.32457 9.98657 4.35479C10.0595 4.38502 10.1377 4.40039 10.2167 4.40002C10.2956 4.40039 10.3738 4.38502 10.4467 4.35479C10.5197 4.32457 10.5858 4.28011 10.6413 4.22402C10.7538 4.11152 10.817 3.95902 10.817 3.80002C10.817 3.64102 10.7538 3.48852 10.6413 3.37602L7.45127 0.190618C7.44656 0.185584 7.44176 0.180622 7.43687 0.175736C7.32419 0.063214 7.17136 0 7.012 0C6.85264 0 6.69981 0.063214 6.58712 0.175736C6.58181 0.181045 6.5766 0.186443 6.5715 0.191927L3.38282 3.37602C3.27669 3.48976 3.2189 3.6402 3.22165 3.79564C3.2244 3.95108 3.28746 4.09939 3.39755 4.20932C3.50764 4.31925 3.65616 4.38222 3.81182 4.38496C3.96749 4.3877 4.11814 4.33001 4.23204 4.22402L6.41113 2.04807V9.4C6.41321 9.55849 6.47718 9.7099 6.58942 9.82197ZM11.9952 14H2.02883C1.751 13.9887 1.47813 13.9228 1.22584 13.8061C0.973545 13.6894 0.746779 13.5241 0.558517 13.3197C0.370254 13.1154 0.22419 12.876 0.128681 12.6152C0.0331723 12.3545 -0.00990605 12.0775 0.0019109 11.8V9.40005C0.0019109 9.24092 0.065216 9.08831 0.1779 8.97579C0.290584 8.86326 0.443416 8.80005 0.602775 8.80005C0.762134 8.80005 0.914966 8.86326 1.02765 8.97579C1.14033 9.08831 1.20364 9.24092 1.20364 9.40005V11.8C1.18295 12.0376 1.25463 12.274 1.40379 12.4602C1.55296 12.6463 1.76817 12.7681 2.00479 12.8H11.9952C12.2318 12.7681 12.447 12.6463 12.5962 12.4602C12.7453 12.274 12.817 12.0376 12.7963 11.8V9.40005C12.7963 9.24092 12.8596 9.08831 12.9723 8.97579C13.085 8.86326 13.2378 8.80005 13.3972 8.80005C13.5565 8.80005 13.7094 8.86326 13.8221 8.97579C13.9347 9.08831 13.998 9.24092 13.998 9.40005V11.8C14.022 12.3563 13.8251 12.8996 13.45 13.3116C13.0749 13.7236 12.552 13.971 11.9952 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,o){n&1&&(O(),ot(0,"g"),pe(1,"path",0),at(),ot(2,"defs")(3,"clipPath",1),pe(4,"rect",2),at()()),n&2&&(C("clip-path",o.pathId),l(3),rt("id",o.pathId))},encapsulation:2})}return t})();var _t=rr(ua(),1),as=["qrcElement"],ma=(()=>{class t{allowEmptyString=!1;colorDark="#000000ff";colorLight="#ffffffff";cssClass="qrcode";elementType="canvas";errorCorrectionLevel="M";imageSrc;imageHeight;imageWidth;margin=4;qrdata="";scale=4;version;width=10;alt;ariaLabel;title;qrCodeURL=new x;qrcElement;context=null;centerImage;renderer=h(ki);sanitizer=h(Gt);async ngOnChanges(){await this.createQRCode()}isValidQrCodeText(e){return this.allowEmptyString===!1?!(typeof e>"u"||e===""||e==="null"||e===null):!(typeof e>"u")}toDataURL(e){return new Promise((n,o)=>{(0,_t.toDataURL)(this.qrdata,e,(a,r)=>{a?o(a):n(r)})})}toCanvas(e,n){return new Promise((o,a)=>{(0,_t.toCanvas)(e,this.qrdata,n,r=>{r?a(r):o("success")})})}toSVG(e){return new Promise((n,o)=>{(0,_t.toString)(this.qrdata,e,(a,r)=>{a?o(a):n(r)})})}renderElement(e){for(let n of this.qrcElement.nativeElement.childNodes)this.renderer.removeChild(this.qrcElement.nativeElement,n);this.renderer.appendChild(this.qrcElement.nativeElement,e)}async createQRCode(){this.version&&this.version>40?(console.warn("[angularx-qrcode] max value for `version` is 40"),this.version=40):this.version&&this.version<1?(console.warn("[angularx-qrcode]`min value for `version` is 1"),this.version=1):this.version!==void 0&&isNaN(this.version)&&(console.warn("[angularx-qrcode] version should be a number, defaulting to auto."),this.version=void 0);try{if(!this.isValidQrCodeText(this.qrdata))throw new Error("[angularx-qrcode] Field `qrdata` is empty, set 'allowEmptyString=\"true\"' to overwrite this behaviour.");this.isValidQrCodeText(this.qrdata)&&this.qrdata===""&&(this.qrdata=" ");let e={color:{dark:this.colorDark,light:this.colorLight},errorCorrectionLevel:this.errorCorrectionLevel,margin:this.margin,scale:this.scale,version:this.version,width:this.width},n=this.imageSrc,o=this.imageHeight?+this.imageHeight:40,a=this.imageWidth?+this.imageWidth:40;switch(this.elementType){case"canvas":{let r=this.renderer.createElement("canvas");this.context=r.getContext("2d"),this.toCanvas(r,e).then(()=>{if(this.ariaLabel&&this.renderer.setAttribute(r,"aria-label",`${this.ariaLabel}`),this.title&&this.renderer.setAttribute(r,"title",`${this.title}`),n&&this.context){this.centerImage=new Image(a,o),n!==this.centerImage.src&&(this.centerImage.crossOrigin="anonymous",this.centerImage.src=n),o!==this.centerImage.height&&(this.centerImage.height=o),a!==this.centerImage.width&&(this.centerImage.width=a);let u=this.centerImage;u&&(u.onload=()=>{this.context?.drawImage(u,r.width/2-a/2,r.height/2-o/2,a,o)})}this.renderElement(r),this.emitQRCodeURL(r)}).catch(u=>{console.error("[angularx-qrcode] canvas error:",u)});break}case"svg":{let r=this.renderer.createElement("div");this.toSVG(e).then(u=>{this.renderer.setProperty(r,"innerHTML",u);let m=r.firstChild;this.renderer.setAttribute(m,"height",`${this.width}`),this.renderer.setAttribute(m,"width",`${this.width}`),this.renderElement(m),this.emitQRCodeURL(m)}).catch(u=>{console.error("[angularx-qrcode] svg error:",u)});break}default:{let r=this.renderer.createElement("img");this.toDataURL(e).then(u=>{this.alt&&r.setAttribute("alt",this.alt),this.ariaLabel&&r.setAttribute("aria-label",this.ariaLabel),r.setAttribute("src",u),this.title&&r.setAttribute("title",this.title),this.renderElement(r),this.emitQRCodeURL(r)}).catch(u=>{console.error("[angularx-qrcode] img/url error:",u)})}}}catch(e){console.error("[angularx-qrcode] Error generating QR Code:",e.message)}}convertBase64ImageUrlToBlob(e){let n=e.split(";base64,"),o=n[0].split(":")[1],a=atob(n[1]),r=new Uint8Array(a.length);for(let u=0;u<a.length;++u)r[u]=a.charCodeAt(u);return new Blob([r],{type:o})}emitQRCodeURL(e){let n=e.constructor.name;if(n===SVGSVGElement.name){let m=e.outerHTML,P=new Blob([m],{type:"image/svg+xml"}),R=URL.createObjectURL(P),ne=this.sanitizer.bypassSecurityTrustUrl(R);this.qrCodeURL.emit(ne);return}let o="";n===HTMLCanvasElement.name&&(o=e.toDataURL("image/png")),n===HTMLImageElement.name&&(o=e.src);let a=this.convertBase64ImageUrlToBlob(o),r=URL.createObjectURL(a),u=this.sanitizer.bypassSecurityTrustUrl(r);this.qrCodeURL.emit(u)}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=E({type:t,selectors:[["qrcode"]],viewQuery:function(n,o){if(n&1&&ve(as,7),n&2){let a;S(a=I())&&(o.qrcElement=a.first)}},inputs:{allowEmptyString:"allowEmptyString",colorDark:"colorDark",colorLight:"colorLight",cssClass:"cssClass",elementType:"elementType",errorCorrectionLevel:"errorCorrectionLevel",imageSrc:"imageSrc",imageHeight:"imageHeight",imageWidth:"imageWidth",margin:"margin",qrdata:"qrdata",scale:"scale",version:"version",width:"width",alt:"alt",ariaLabel:"ariaLabel",title:"title"},outputs:{qrCodeURL:"qrCodeURL"},features:[xi],decls:2,vars:2,consts:[["qrcElement",""]],template:function(n,o){n&1&&pe(0,"div",null,0),n&2&&y(o.cssClass)},encapsulation:2,changeDetection:0})}return t})();function rs(t,i){if(t&1){let e=F();d(0,"div",7)(1,"p-button",8),f("onClick",function(){b(e);let o=c();return v(o.copyToClipboard())}),p(),d(2,"p-button",9),f("onClick",function(){b(e);let o=c();return v(o.downloadQR())}),p()()}t&2&&(l(2),s("text",!0))}var vn=class t{alertService=h(Yt);roomId="";show=!1;close=new x;async copyToClipboard(){try{await navigator.clipboard.writeText(this.roomId),this.alertService.showSuccess("Copied!","Room ID copied to clipboard.")}catch(i){console.error("Failed to copy:",i)}}downloadQR(){let i=document.querySelector("canvas");if(i){let e=document.createElement("a");e.download="room-qr-code.png",e.href=i.toDataURL(),e.click()}}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-qr-code-modal"]],inputs:{roomId:"roomId",show:"show"},outputs:{close:"close"},decls:9,vars:8,consts:[["header","Room QR Code",1,"max-w-sm","w-full",3,"visibleChange","visible","modal","draggable","resizable","closable"],[1,"text-center","mb-4"],[1,"text-sm","mb-2","text-muted-color"],[1,"font-mono","text-sm"],[1,"bg-white/90","dark:bg-white/10","p-4","rounded-lg","mb-4","flex","items-center","justify-center"],[1,"mx-auto",3,"qrdata","width"],["pTemplate","footer"],[1,"flex","gap-2"],["label","Copy ID",3,"onClick"],["label","Download","severity","secondary",3,"onClick","text"]],template:function(e,n){e&1&&(d(0,"p-dialog",0),f("visibleChange",function(){return n.close.emit()}),d(1,"div",1)(2,"p",2),M(3,"Room ID"),p(),d(4,"p",3),M(5),p()(),d(6,"div",4),_(7,"qrcode",5),p(),g(8,rs,3,1,"ng-template",6),p()),e&2&&(s("visible",n.show)("modal",!0)("draggable",!1)("resizable",!1)("closable",!0),l(5),K(n.roomId),l(2),s("qrdata",n.roomId)("width",200))},dependencies:[A,pt,dt,ie,Be,me,ma],encapsulation:2,changeDetection:0})};function ls(t,i){if(t&1){let e=F();d(0,"div",3)(1,"p-button",4),f("onClick",function(){b(e);let o=c();return v(o.loadMedia.emit())}),p(),d(2,"p-button",5),f("onClick",function(){b(e);let o=c();return v(o.close.emit())}),p()()}t&2&&(l(2),s("text",!0))}var yn=class t{show=!1;isHost=!1;mediaUrl="";mediaUrlChange=new x;loadMedia=new x;close=new x;static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-media-player-modal"]],inputs:{show:"show",isHost:"isHost",mediaUrl:"mediaUrl"},outputs:{mediaUrlChange:"mediaUrlChange",loadMedia:"loadMedia",close:"close"},decls:3,vars:6,consts:[["header","Media Player",1,"max-w-md","w-full",3,"visibleChange","visible","modal","draggable","resizable","closable"],["pInputText","","type","text","placeholder","Enter media URL (audio/video)",1,"w-full","mb-4",3,"ngModelChange","ngModel"],["pTemplate","footer"],[1,"flex","gap-2","justify-evenly"],["label","Play",3,"onClick"],["label","Cancel","severity","secondary",3,"onClick","text"]],template:function(e,n){e&1&&(d(0,"p-dialog",0),f("visibleChange",function(){return n.close.emit()}),d(1,"input",1),qt("ngModelChange",function(a){return Ot(n.mediaUrl,a)||(n.mediaUrl=a),a}),p(),g(2,ls,3,1,"ng-template",2),p()),e&2&&(s("visible",n.show&&n.isHost)("modal",!0)("draggable",!1)("resizable",!1)("closable",!0),l(),zt("ngModel",n.mediaUrl))},dependencies:[A,Me,lt,Oe,qe,pt,dt,ie,Be,me,ct,Zt],encapsulation:2,changeDetection:0})};var ha=`
    .p-checkbox {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('checkbox.width');
        height: dt('checkbox.height');
    }

    .p-checkbox-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: dt('checkbox.border.radius');
    }

    .p-checkbox-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: dt('checkbox.border.radius');
        border: 1px solid dt('checkbox.border.color');
        background: dt('checkbox.background');
        width: dt('checkbox.width');
        height: dt('checkbox.height');
        transition:
            background dt('checkbox.transition.duration'),
            color dt('checkbox.transition.duration'),
            border-color dt('checkbox.transition.duration'),
            box-shadow dt('checkbox.transition.duration'),
            outline-color dt('checkbox.transition.duration');
        outline-color: transparent;
        box-shadow: dt('checkbox.shadow');
    }

    .p-checkbox-icon {
        transition-duration: dt('checkbox.transition.duration');
        color: dt('checkbox.icon.color');
        font-size: dt('checkbox.icon.size');
        width: dt('checkbox.icon.size');
        height: dt('checkbox.icon.size');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        border-color: dt('checkbox.hover.border.color');
    }

    .p-checkbox-checked .p-checkbox-box {
        border-color: dt('checkbox.checked.border.color');
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked .p-checkbox-icon {
        color: dt('checkbox.icon.checked.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
        border-color: dt('checkbox.checked.hover.border.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
        color: dt('checkbox.icon.checked.hover.color');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.focus.border.color');
        box-shadow: dt('checkbox.focus.ring.shadow');
        outline: dt('checkbox.focus.ring.width') dt('checkbox.focus.ring.style') dt('checkbox.focus.ring.color');
        outline-offset: dt('checkbox.focus.ring.offset');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.checked.focus.border.color');
    }

    .p-checkbox.p-invalid > .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }

    .p-checkbox.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.filled.background');
    }

    .p-checkbox-checked.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
    }

    .p-checkbox.p-disabled {
        opacity: 1;
    }

    .p-checkbox.p-disabled .p-checkbox-box {
        background: dt('checkbox.disabled.background');
        border-color: dt('checkbox.checked.disabled.border.color');
    }

    .p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
        color: dt('checkbox.icon.disabled.color');
    }

    .p-checkbox-sm,
    .p-checkbox-sm .p-checkbox-box {
        width: dt('checkbox.sm.width');
        height: dt('checkbox.sm.height');
    }

    .p-checkbox-sm .p-checkbox-icon {
        font-size: dt('checkbox.icon.sm.size');
        width: dt('checkbox.icon.sm.size');
        height: dt('checkbox.icon.sm.size');
    }

    .p-checkbox-lg,
    .p-checkbox-lg .p-checkbox-box {
        width: dt('checkbox.lg.width');
        height: dt('checkbox.lg.height');
    }

    .p-checkbox-lg .p-checkbox-icon {
        font-size: dt('checkbox.icon.lg.size');
        width: dt('checkbox.icon.lg.size');
        height: dt('checkbox.icon.lg.size');
    }
`;var cs=["icon"],ds=["input"],ps=(t,i,e)=>({checked:t,class:i,dataP:e});function us(t,i){if(t&1&&_(0,"span",8),t&2){let e=c(3);y(e.cx("icon")),s("ngClass",e.checkboxIcon)("pBind",e.ptm("icon")),C("data-p",e.dataP)}}function ms(t,i){if(t&1&&(O(),_(0,"svg",9)),t&2){let e=c(3);y(e.cx("icon")),s("pBind",e.ptm("icon")),C("data-p",e.dataP)}}function fs(t,i){if(t&1&&(fe(0),g(1,us,1,5,"span",6)(2,ms,1,4,"svg",7),ge()),t&2){let e=c(2);l(),s("ngIf",e.checkboxIcon),l(),s("ngIf",!e.checkboxIcon)}}function gs(t,i){if(t&1&&(O(),_(0,"svg",10)),t&2){let e=c(2);y(e.cx("icon")),s("pBind",e.ptm("icon")),C("data-p",e.dataP)}}function hs(t,i){if(t&1&&(fe(0),g(1,fs,3,2,"ng-container",3)(2,gs,1,4,"svg",5),ge()),t&2){let e=c();l(),s("ngIf",e.checked),l(),s("ngIf",e._indeterminate())}}function _s(t,i){}function bs(t,i){t&1&&g(0,_s,0,0,"ng-template")}var vs=`
    ${ha}

    /* For PrimeNG */
    p-checkBox.ng-invalid.ng-dirty .p-checkbox-box,
    p-check-box.ng-invalid.ng-dirty .p-checkbox-box,
    p-checkbox.ng-invalid.ng-dirty .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }
`,ys={root:({instance:t})=>["p-checkbox p-component",{"p-checkbox-checked p-highlight":t.checked,"p-disabled":t.$disabled(),"p-invalid":t.invalid(),"p-variant-filled":t.$variant()==="filled","p-checkbox-sm p-inputfield-sm":t.size()==="small","p-checkbox-lg p-inputfield-lg":t.size()==="large"}],box:"p-checkbox-box",input:"p-checkbox-input",icon:"p-checkbox-icon"},_a=(()=>{class t extends X{name="checkbox";style=vs;classes=ys;static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275prov=Q({token:t,factory:t.\u0275fac})}return t})();var ba=new Y("CHECKBOX_INSTANCE"),Cs={provide:Wt,useExisting:Pe(()=>Cn),multi:!0},Cn=(()=>{class t extends en{componentName="Checkbox";hostName="";value;binary;ariaLabelledBy;ariaLabel;tabindex;inputId;inputStyle;styleClass;inputClass;indeterminate=!1;formControl;checkboxIcon;readonly;autofocus;trueValue=!0;falseValue=!1;variant=q();size=q();onChange=new x;onFocus=new x;onBlur=new x;inputViewChild;get checked(){return this._indeterminate()?!1:this.binary?this.modelValue()===this.trueValue:qi(this.value,this.modelValue())}_indeterminate=D(void 0);checkboxIconTemplate;templates;_checkboxIconTemplate;focused=!1;_componentStyle=h(_a);bindDirectiveInstance=h(k,{self:!0});$pcCheckbox=h(ba,{optional:!0,skipSelf:!0})??void 0;$variant=N(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"icon":this._checkboxIconTemplate=e.template;break;case"checkboxicon":this._checkboxIconTemplate=e.template;break}})}onChanges(e){e.indeterminate&&this._indeterminate.set(e.indeterminate.currentValue)}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}updateModel(e){let n,o=this.injector.get(Jt,null,{optional:!0,self:!0}),a=o&&!this.formControl?o.value:this.modelValue();this.binary?(n=this._indeterminate()?this.trueValue:this.checked?this.falseValue:this.trueValue,this.writeModelValue(n),this.onModelChange(n)):(this.checked||this._indeterminate()?n=a.filter(r=>!kt(r,this.value)):n=a?[...a,this.value]:[this.value],this.onModelChange(n),this.writeModelValue(n),this.formControl&&this.formControl.setValue(n)),this._indeterminate()&&this._indeterminate.set(!1),this.onChange.emit({checked:n,originalEvent:e})}handleChange(e){this.readonly||this.updateModel(e)}onInputFocus(e){this.focused=!0,this.onFocus.emit(e)}onInputBlur(e){this.focused=!1,this.onBlur.emit(e),this.onModelTouched()}focus(){this.inputViewChild?.nativeElement.focus()}writeControlValue(e,n){n(e),this.cd.markForCheck()}get dataP(){return this.cn({invalid:this.invalid(),checked:this.checked,disabled:this.$disabled(),filled:this.$variant()==="filled",[this.size()]:this.size()})}static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["p-checkbox"],["p-checkBox"],["p-check-box"]],contentQueries:function(n,o,a){if(n&1&&be(a,cs,4)(a,ie,4),n&2){let r;S(r=I())&&(o.checkboxIconTemplate=r.first),S(r=I())&&(o.templates=r)}},viewQuery:function(n,o){if(n&1&&ve(ds,5),n&2){let a;S(a=I())&&(o.inputViewChild=a.first)}},hostVars:6,hostBindings:function(n,o){n&2&&(C("data-p-highlight",o.checked)("data-p-checked",o.checked)("data-p-disabled",o.$disabled())("data-p",o.dataP),y(o.cn(o.cx("root"),o.styleClass)))},inputs:{hostName:"hostName",value:"value",binary:[2,"binary","binary",L],ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:[2,"tabindex","tabindex",ue],inputId:"inputId",inputStyle:"inputStyle",styleClass:"styleClass",inputClass:"inputClass",indeterminate:[2,"indeterminate","indeterminate",L],formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:[2,"readonly","readonly",L],autofocus:[2,"autofocus","autofocus",L],trueValue:"trueValue",falseValue:"falseValue",variant:[1,"variant"],size:[1,"size"]},outputs:{onChange:"onChange",onFocus:"onFocus",onBlur:"onBlur"},features:[J([Cs,_a,{provide:ba,useExisting:t},{provide:ee,useExisting:t}]),Z([k]),V],decls:5,vars:26,consts:[["input",""],["type","checkbox",3,"focus","blur","change","checked","pBind"],[3,"pBind"],[4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","minus",3,"class","pBind",4,"ngIf"],[3,"class","ngClass","pBind",4,"ngIf"],["data-p-icon","check",3,"class","pBind",4,"ngIf"],[3,"ngClass","pBind"],["data-p-icon","check",3,"pBind"],["data-p-icon","minus",3,"pBind"]],template:function(n,o){n&1&&(d(0,"input",1,0),f("focus",function(r){return o.onInputFocus(r)})("blur",function(r){return o.onInputBlur(r)})("change",function(r){return o.handleChange(r)}),p(),d(2,"div",2),g(3,hs,3,2,"ng-container",3)(4,bs,1,0,null,4),p()),n&2&&(Ue(o.inputStyle),y(o.cn(o.cx("input"),o.inputClass)),s("checked",o.checked)("pBind",o.ptm("input")),C("id",o.inputId)("value",o.value)("name",o.name())("tabindex",o.tabindex)("required",o.required()?"":void 0)("readonly",o.readonly?"":void 0)("disabled",o.$disabled()?"":void 0)("aria-labelledby",o.ariaLabelledBy)("aria-label",o.ariaLabel),l(2),y(o.cx("box")),s("pBind",o.ptm("box")),C("data-p",o.dataP),l(),s("ngIf",!o.checkboxIconTemplate&&!o._checkboxIconTemplate),l(),s("ngTemplateOutlet",o.checkboxIconTemplate||o._checkboxIconTemplate)("ngTemplateOutletContext",jt(22,ps,o.checked,o.cx("icon"),o.dataP)))},dependencies:[A,Ie,Ce,le,j,Gi,co,xe,k],encapsulation:2,changeDetection:0})}return t})(),va=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=de({type:t});static \u0275inj=ce({imports:[Cn,j,j]})}return t})();var ya=`
    .p-radiobutton {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('radiobutton.width');
        height: dt('radiobutton.height');
    }

    .p-radiobutton-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: 50%;
    }

    .p-radiobutton-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 1px solid dt('radiobutton.border.color');
        background: dt('radiobutton.background');
        width: dt('radiobutton.width');
        height: dt('radiobutton.height');
        transition:
            background dt('radiobutton.transition.duration'),
            color dt('radiobutton.transition.duration'),
            border-color dt('radiobutton.transition.duration'),
            box-shadow dt('radiobutton.transition.duration'),
            outline-color dt('radiobutton.transition.duration');
        outline-color: transparent;
        box-shadow: dt('radiobutton.shadow');
    }

    .p-radiobutton-icon {
        transition-duration: dt('radiobutton.transition.duration');
        background: transparent;
        font-size: dt('radiobutton.icon.size');
        width: dt('radiobutton.icon.size');
        height: dt('radiobutton.icon.size');
        border-radius: 50%;
        backface-visibility: hidden;
        transform: translateZ(0) scale(0.1);
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
        border-color: dt('radiobutton.hover.border.color');
    }

    .p-radiobutton-checked .p-radiobutton-box {
        border-color: dt('radiobutton.checked.border.color');
        background: dt('radiobutton.checked.background');
    }

    .p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.checked.color');
        transform: translateZ(0) scale(1, 1);
        visibility: visible;
    }

    .p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
        border-color: dt('radiobutton.checked.hover.border.color');
        background: dt('radiobutton.checked.hover.background');
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.checked.hover.color');
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
        border-color: dt('radiobutton.focus.border.color');
        box-shadow: dt('radiobutton.focus.ring.shadow');
        outline: dt('radiobutton.focus.ring.width') dt('radiobutton.focus.ring.style') dt('radiobutton.focus.ring.color');
        outline-offset: dt('radiobutton.focus.ring.offset');
    }

    .p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
        border-color: dt('radiobutton.checked.focus.border.color');
    }

    .p-radiobutton.p-invalid > .p-radiobutton-box {
        border-color: dt('radiobutton.invalid.border.color');
    }

    .p-radiobutton.p-variant-filled .p-radiobutton-box {
        background: dt('radiobutton.filled.background');
    }

    .p-radiobutton.p-variant-filled.p-radiobutton-checked .p-radiobutton-box {
        background: dt('radiobutton.checked.background');
    }

    .p-radiobutton.p-variant-filled:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box {
        background: dt('radiobutton.checked.hover.background');
    }

    .p-radiobutton.p-disabled {
        opacity: 1;
    }

    .p-radiobutton.p-disabled .p-radiobutton-box {
        background: dt('radiobutton.disabled.background');
        border-color: dt('radiobutton.checked.disabled.border.color');
    }

    .p-radiobutton-checked.p-disabled .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.disabled.color');
    }

    .p-radiobutton-sm,
    .p-radiobutton-sm .p-radiobutton-box {
        width: dt('radiobutton.sm.width');
        height: dt('radiobutton.sm.height');
    }

    .p-radiobutton-sm .p-radiobutton-icon {
        font-size: dt('radiobutton.icon.sm.size');
        width: dt('radiobutton.icon.sm.size');
        height: dt('radiobutton.icon.sm.size');
    }

    .p-radiobutton-lg,
    .p-radiobutton-lg .p-radiobutton-box {
        width: dt('radiobutton.lg.width');
        height: dt('radiobutton.lg.height');
    }

    .p-radiobutton-lg .p-radiobutton-icon {
        font-size: dt('radiobutton.icon.lg.size');
        width: dt('radiobutton.icon.lg.size');
        height: dt('radiobutton.icon.lg.size');
    }
`;var ws=["input"],Ts=`
    ${ya}

    /* For PrimeNG */
    p-radioButton.ng-invalid.ng-dirty .p-radiobutton-box,
    p-radio-button.ng-invalid.ng-dirty .p-radiobutton-box,
    p-radiobutton.ng-invalid.ng-dirty .p-radiobutton-box {
        border-color: dt('radiobutton.invalid.border.color');
    }
`,ks={root:({instance:t})=>["p-radiobutton p-component",{"p-radiobutton-checked":t.checked,"p-disabled":t.$disabled(),"p-invalid":t.invalid(),"p-variant-filled":t.$variant()==="filled","p-radiobutton-sm p-inputfield-sm":t.size()==="small","p-radiobutton-lg p-inputfield-lg":t.size()==="large"}],box:"p-radiobutton-box",input:"p-radiobutton-input",icon:"p-radiobutton-icon"},Ca=(()=>{class t extends X{name="radiobutton";style=Ts;classes=ks;static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275prov=Q({token:t,factory:t.\u0275fac})}return t})();var xa=new Y("RADIOBUTTON_INSTANCE"),Ss={provide:Wt,useExisting:Pe(()=>xn),multi:!0},Is=(()=>{class t{accessors=[];add(e,n){this.accessors.push([e,n])}remove(e){this.accessors=this.accessors.filter(n=>n[1]!==e)}select(e){this.accessors.forEach(n=>{this.isSameGroup(n,e)&&n[1]!==e&&n[1].writeValue(e.value)})}isSameGroup(e,n){return e[0].control?e[0].control.root===n.control.control.root&&e[1].name()===n.name():!1}static \u0275fac=function(n){return new(n||t)};static \u0275prov=Q({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),xn=(()=>{class t extends en{componentName="RadioButton";$pcRadioButton=h(xa,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(k,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}value;tabindex;inputId;ariaLabelledBy;ariaLabel;styleClass;autofocus;binary;variant=q();size=q();onClick=new x;onFocus=new x;onBlur=new x;inputViewChild;$variant=N(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());checked;focused;control;_componentStyle=h(Ca);injector=h(vi);registry=h(Is);onInit(){this.control=this.injector.get(Jt),this.registry.add(this.control,this)}onChange(e){this.$disabled()||this.select(e)}select(e){this.$disabled()||(this.checked=!0,this.writeModelValue(this.checked),this.onModelChange(this.value),this.registry.select(this),this.onClick.emit({originalEvent:e,value:this.value}))}onInputFocus(e){this.focused=!0,this.onFocus.emit(e)}onInputBlur(e){this.focused=!1,this.onModelTouched(),this.onBlur.emit(e)}focus(){this.inputViewChild.nativeElement.focus()}writeControlValue(e,n){this.checked=this.binary?!!e:e==this.value,n(this.checked),this.cd.markForCheck()}onDestroy(){this.registry.remove(this)}get dataP(){return this.cn({invalid:this.invalid(),checked:this.checked,disabled:this.$disabled(),filled:this.$variant()==="filled",[this.size()]:this.size()})}static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["p-radioButton"],["p-radiobutton"],["p-radio-button"]],viewQuery:function(n,o){if(n&1&&ve(ws,5),n&2){let a;S(a=I())&&(o.inputViewChild=a.first)}},hostVars:5,hostBindings:function(n,o){n&2&&(C("data-p-disabled",o.$disabled())("data-p-checked",o.checked)("data-p",o.dataP),y(o.cx("root")))},inputs:{value:"value",tabindex:[2,"tabindex","tabindex",ue],inputId:"inputId",ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",styleClass:"styleClass",autofocus:[2,"autofocus","autofocus",L],binary:[2,"binary","binary",L],variant:[1,"variant"],size:[1,"size"]},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[J([Ss,Ca,{provide:xa,useExisting:t},{provide:ee,useExisting:t}]),Z([k]),V],decls:4,vars:20,consts:[["input",""],["type","radio",3,"focus","blur","change","checked","pAutoFocus","pBind"],[3,"pBind"]],template:function(n,o){n&1&&(d(0,"input",1,0),f("focus",function(r){return o.onInputFocus(r)})("blur",function(r){return o.onInputBlur(r)})("change",function(r){return o.onChange(r)}),p(),d(2,"div",2),_(3,"div",2),p()),n&2&&(y(o.cx("input")),s("checked",o.checked)("pAutoFocus",o.autofocus)("pBind",o.ptm("input")),C("id",o.inputId)("name",o.name())("required",o.required()?"":void 0)("disabled",o.$disabled()?"":void 0)("value",o.modelValue())("aria-labelledby",o.ariaLabelledBy)("aria-label",o.ariaLabel)("aria-checked",o.checked)("tabindex",o.tabindex),l(2),y(o.cx("box")),s("pBind",o.ptm("box")),l(),y(o.cx("icon")),s("pBind",o.ptm("icon")))},dependencies:[A,Qi,j,xe,k],encapsulation:2,changeDetection:0})}return t})(),wa=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=de({type:t});static \u0275inj=ce({imports:[xn,j,j]})}return t})();var Es=(t,i)=>i.label;function Bs(t,i){if(t&1){let e=F();d(0,"div",9)(1,"p-radioButton",10),f("onClick",function(){let o=b(e).$index,a=c(2);return v(a.onResolutionChange(o))}),p(),d(2,"label",11),M(3),p(),d(4,"span",12),M(5),p()()}if(t&2){let e=i.$implicit,n=i.$index,o=c(2);Ve("bg-highlight",o.settings.resolutionIndex===n),l(),s("value",n)("ngModel",o.settings.resolutionIndex)("inputId","res-"+n),l(),s("for","res-"+n),l(),K(e.label),l(2),Ut("",e.width,"\xD7",e.height)}}function Fs(t,i){if(t&1&&(d(0,"div",5)(1,"label",7),M(2,"Resolution"),p(),ae(3,Bs,6,9,"div",8,Es),p()),t&2){let e=c();l(3),re(e.presets)}}function Ds(t,i){if(t&1){let e=F();d(0,"div",13)(1,"p-button",14),f("onClick",function(){b(e);let o=c();return v(o.apply.emit())}),p(),d(2,"p-button",15),f("onClick",function(){b(e);let o=c();return v(o.close.emit())}),p()()}t&2&&(l(2),s("text",!0))}var wn=class t{show=!1;settings;presets=[];settingsChange=new x;apply=new x;close=new x;onCustomChange(){this.settingsChange.emit(Pn(Te({},this.settings),{custom:!this.settings.custom}))}onResolutionChange(i){this.settingsChange.emit(Pn(Te({},this.settings),{resolutionIndex:i}))}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-video-settings-modal"]],inputs:{show:"show",settings:"settings",presets:"presets"},outputs:{settingsChange:"settingsChange",apply:"apply",close:"close"},decls:8,vars:8,consts:[["header","Video Settings",1,"max-w-sm","w-full",3,"visibleChange","visible","modal","draggable","resizable","closable"],[1,"flex","flex-col","gap-5"],[1,"flex","items-center","gap-3"],["inputId","auto-res",3,"onChange","binary","ngModel"],["for","auto-res",1,"text-sm"],[1,"flex","flex-col","gap-1"],["pTemplate","footer"],[1,"text-xs","font-medium","mb-1"],[1,"flex","items-center","gap-3","py-1.5","px-3","rounded-lg","cursor-pointer",3,"bg-highlight"],[1,"flex","items-center","gap-3","py-1.5","px-3","rounded-lg","cursor-pointer"],[3,"onClick","value","ngModel","inputId"],[1,"text-sm","cursor-pointer","flex-1",3,"for"],[1,"text-xs","text-muted-color"],[1,"flex","gap-2","justify-end"],["label","Apply",3,"onClick"],["label","Cancel","severity","secondary",3,"onClick","text"]],template:function(e,n){e&1&&(d(0,"p-dialog",0),f("visibleChange",function(){return n.close.emit()}),d(1,"div",1)(2,"div",2)(3,"p-checkbox",3),f("onChange",function(){return n.onCustomChange()}),p(),d(4,"label",4),M(5,"Auto (browser default)"),p()(),w(6,Fs,5,0,"div",5),p(),g(7,Ds,3,1,"ng-template",6),p()),e&2&&(s("visible",n.show)("modal",!0)("draggable",!1)("resizable",!1)("closable",!0),l(3),s("binary",!0)("ngModel",!n.settings.custom),l(3),T(n.settings.custom?6:-1))},dependencies:[A,Me,Oe,qe,pt,dt,ie,Be,me,va,Cn,wa,xn],encapsulation:2,changeDetection:0})};var Ta=`
    .p-drawer {
        display: flex;
        flex-direction: column;
        transform: translate3d(0px, 0px, 0px);
        position: relative;
        transition: transform 0.3s;
        background: dt('drawer.background');
        color: dt('drawer.color');
        border-style: solid;
        border-color: dt('drawer.border.color');
        box-shadow: dt('drawer.shadow');
    }

    .p-drawer-content {
        overflow-y: auto;
        flex-grow: 1;
        padding: dt('drawer.content.padding');
    }

    .p-drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        padding: dt('drawer.header.padding');
    }

    .p-drawer-footer {
        padding: dt('drawer.footer.padding');
    }

    .p-drawer-title {
        font-weight: dt('drawer.title.font.weight');
        font-size: dt('drawer.title.font.size');
    }

    .p-drawer-full .p-drawer {
        transition: none;
        transform: none;
        width: 100vw !important;
        height: 100vh !important;
        max-height: 100%;
        top: 0px !important;
        left: 0px !important;
        border-width: 1px;
    }

    .p-drawer-left .p-drawer-enter-active {
        animation: p-animate-drawer-enter-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-left .p-drawer-leave-active {
        animation: p-animate-drawer-leave-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-right .p-drawer-enter-active {
        animation: p-animate-drawer-enter-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-right .p-drawer-leave-active {
        animation: p-animate-drawer-leave-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-top .p-drawer-enter-active {
        animation: p-animate-drawer-enter-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-top .p-drawer-leave-active {
        animation: p-animate-drawer-leave-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-bottom .p-drawer-enter-active {
        animation: p-animate-drawer-enter-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-bottom .p-drawer-leave-active {
        animation: p-animate-drawer-leave-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-full .p-drawer-enter-active {
        animation: p-animate-drawer-enter-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-full .p-drawer-leave-active {
        animation: p-animate-drawer-leave-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    
    .p-drawer-left .p-drawer {
        width: 20rem;
        height: 100%;
        border-inline-end-width: 1px;
    }

    .p-drawer-right .p-drawer {
        width: 20rem;
        height: 100%;
        border-inline-start-width: 1px;
    }

    .p-drawer-top .p-drawer {
        height: 10rem;
        width: 100%;
        border-block-end-width: 1px;
    }

    .p-drawer-bottom .p-drawer {
        height: 10rem;
        width: 100%;
        border-block-start-width: 1px;
    }

    .p-drawer-left .p-drawer-content,
    .p-drawer-right .p-drawer-content,
    .p-drawer-top .p-drawer-content,
    .p-drawer-bottom .p-drawer-content {
        width: 100%;
        height: 100%;
    }

    .p-drawer-open {
        display: flex;
    }

    .p-drawer-mask:dir(rtl) {
        flex-direction: row-reverse;
    }

    @keyframes p-animate-drawer-enter-left {
        from {
            transform: translate3d(-100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-left {
        to {
            transform: translate3d(-100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-right {
        from {
            transform: translate3d(100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-right {
        to {
            transform: translate3d(100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-top {
        from {
            transform: translate3d(0px, -100%, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-top {
        to {
            transform: translate3d(0px, -100%, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-bottom {
        from {
            transform: translate3d(0px, 100%, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-bottom {
        to {
            transform: translate3d(0px, 100%, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-full {
        from {
            opacity: 0;
            transform: scale(0.93);
        }
    }

    @keyframes p-animate-drawer-leave-full {
        to {
            opacity: 0;
            transform: scale(0.93);
        }
    }
`;var Ps=["header"],Rs=["footer"],Ls=["content"],Ns=["closeicon"],As=["headless"],Vs=["container"],Us=["closeButton"],zs=["*"];function Os(t,i){t&1&&W(0)}function qs(t,i){if(t&1&&g(0,Os,1,0,"ng-container",4),t&2){let e=c(2);s("ngTemplateOutlet",e.headlessTemplate||e._headlessTemplate)}}function js(t,i){t&1&&W(0)}function $s(t,i){if(t&1&&(d(0,"div",9),M(1),p()),t&2){let e=c(3);y(e.cx("title")),s("pBind",e.ptm("title")),l(),K(e.header)}}function Hs(t,i){t&1&&(O(),_(0,"svg",12)),t&2&&C("data-pc-section","closeicon")}function Qs(t,i){}function Ks(t,i){t&1&&g(0,Qs,0,0,"ng-template")}function Gs(t,i){if(t&1&&g(0,Hs,1,1,"svg",11)(1,Ks,1,0,null,4),t&2){let e=c(4);s("ngIf",!e.closeIconTemplate&&!e._closeIconTemplate),l(),s("ngTemplateOutlet",e.closeIconTemplate||e._closeIconTemplate)}}function Ws(t,i){if(t&1){let e=F();d(0,"p-button",10),f("onClick",function(o){b(e);let a=c(3);return v(a.close(o))})("keydown.enter",function(o){b(e);let a=c(3);return v(a.close(o))}),g(1,Gs,2,2,"ng-template",null,1,se),p()}if(t&2){let e=c(3);s("pt",e.ptm("pcCloseButton"))("ngClass",e.cx("pcCloseButton"))("buttonProps",e.closeButtonProps)("ariaLabel",e.ariaCloseLabel)("unstyled",e.unstyled()),C("data-pc-group-section","iconcontainer")}}function Js(t,i){t&1&&W(0)}function Ys(t,i){t&1&&W(0)}function Zs(t,i){if(t&1&&(fe(0),d(1,"div",5),g(2,Ys,1,0,"ng-container",4),p(),ge()),t&2){let e=c(3);l(),s("pBind",e.ptm("footer"))("ngClass",e.cx("footer")),C("data-pc-section","footer"),l(),s("ngTemplateOutlet",e.footerTemplate||e._footerTemplate)}}function Xs(t,i){if(t&1&&(d(0,"div",5),g(1,js,1,0,"ng-container",4)(2,$s,2,4,"div",6)(3,Ws,3,6,"p-button",7),p(),d(4,"div",5),_e(5),g(6,Js,1,0,"ng-container",4),p(),g(7,Zs,3,4,"ng-container",8)),t&2){let e=c(2);s("pBind",e.ptm("header"))("ngClass",e.cx("header")),C("data-pc-section","header"),l(),s("ngTemplateOutlet",e.headerTemplate||e._headerTemplate),l(),s("ngIf",e.header),l(),s("ngIf",e.showCloseIcon&&e.closable),l(),s("pBind",e.ptm("content"))("ngClass",e.cx("content")),C("data-pc-section","content"),l(2),s("ngTemplateOutlet",e.contentTemplate||e._contentTemplate),l(),s("ngIf",e.footerTemplate||e._footerTemplate)}}function el(t,i){if(t&1){let e=F();d(0,"div",3,0),f("pMotionOnBeforeEnter",function(o){b(e);let a=c();return v(a.onBeforeEnter(o))})("pMotionOnAfterLeave",function(o){b(e);let a=c();return v(a.onAfterLeave(o))})("keydown",function(o){b(e);let a=c();return v(a.onKeyDown(o))}),w(2,qs,1,1,"ng-container")(3,Xs,8,11),p()}if(t&2){let e=c();Ue(e.style),y(e.cn(e.cx("root"),e.styleClass)),s("pBind",e.ptm("root"))("pMotion",e.visible)("pMotionAppear",!0)("pMotionEnterActiveClass",e.$enterAnimation())("pMotionLeaveActiveClass",e.$leaveAnimation())("pMotionOptions",e.computedMotionOptions()),C("data-p",e.dataP)("data-p-open",e.visible),l(2),T(e.headlessTemplate||e._headlessTemplate?2:3)}}var tl=`
${Ta}

/** For PrimeNG **/
.p-drawer {
    position: fixed;
}

.p-drawer-left {
    top: 0;
    left: 0;
    width: 20rem;
    height: 100%;
    border-inline-end-width: 1px;
}

.p-drawer-right {
    top: 0;
    right: 0;
    width: 20rem;
    height: 100%;
    border-inline-start-width: 1px;
}

.p-drawer-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-block-end-width: 1px;
}

.p-drawer-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-block-start-width: 1px;
}

.p-drawer-full {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    -webkit-transition: none;
    transition: none;
}

/* Animations */
.p-drawer-enter-left {
    animation: p-animate-drawer-enter-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-left {
    animation: p-animate-drawer-leave-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-right {
    animation: p-animate-drawer-enter-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-right {
    animation: p-animate-drawer-leave-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-top {
    animation: p-animate-drawer-enter-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-top {
    animation: p-animate-drawer-leave-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-bottom {
    animation: p-animate-drawer-enter-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-bottom {
    animation: p-animate-drawer-leave-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-full {
    animation: p-animate-drawer-enter-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-full {
    animation: p-animate-drawer-leave-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}
`,nl={mask:({instance:t})=>["p-drawer-mask",{"p-overlay-mask p-overlay-mask-enter-active":t.modal},{"p-drawer-full":t.fullScreen()}],root:({instance:t})=>["p-drawer p-component",{"p-drawer-full":t.fullScreen(),"p-drawer-open":t.visible},`p-drawer-${t.position()}`],header:"p-drawer-header",title:"p-drawer-title",pcCloseButton:"p-drawer-close-button",content:"p-drawer-content",footer:"p-drawer-footer"},ka=(()=>{class t extends X{name="drawer";style=tl;classes=nl;static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275prov=Q({token:t,factory:t.\u0275fac})}return t})();var Sa=new Y("DRAWER_INSTANCE"),Nt=(()=>{class t extends oe{componentName="Drawer";$pcDrawer=h(Sa,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(k,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}appendTo=q(void 0);motionOptions=q(void 0);computedMotionOptions=N(()=>Te(Te({},this.ptm("motion")),this.motionOptions()));blockScroll=!1;style;styleClass;ariaCloseLabel;autoZIndex=!0;baseZIndex=0;modal=!0;closeButtonProps={severity:"secondary",text:!0,rounded:!0};dismissible=!0;showCloseIcon=!0;closeOnEscape=!0;transitionOptions="150ms cubic-bezier(0, 0, 0.2, 1)";get visible(){return this._visible??!1}set visible(e){this._visible=e,this._visible&&!this.modalVisible&&(this.modalVisible=!0)}position=q("left");fullScreen=q(!1);$enterAnimation=N(()=>this.fullScreen()?"p-drawer-enter-full":`p-drawer-enter-${this.position()}`);$leaveAnimation=N(()=>this.fullScreen()?"p-drawer-leave-full":`p-drawer-leave-${this.position()}`);header;maskStyle;closable=!0;onShow=new x;onHide=new x;visibleChange=new x;containerViewChild;closeButtonViewChild;initialized;_visible;_position="left";_fullScreen=!1;modalVisible=!1;container;mask;maskClickListener;documentEscapeListener;animationEndListener;_componentStyle=h(ka);onAfterViewInit(){this.initialized=!0}headerTemplate;footerTemplate;contentTemplate;closeIconTemplate;headlessTemplate;$appendTo=N(()=>this.appendTo()||this.config.overlayAppendTo());_headerTemplate;_footerTemplate;_contentTemplate;_closeIconTemplate;_headlessTemplate;templates;onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break;case"header":this._headerTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;case"closeicon":this._closeIconTemplate=e.template;break;case"headless":this._headlessTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}onKeyDown(e){e.code==="Escape"&&this.hide(!1)}show(){this.container?.setAttribute(this.$attrSelector,""),this.autoZIndex&&It.set("modal",this.container,this.baseZIndex||this.config.zIndex.modal),this.modal&&this.enableModality(),this.onShow.emit({}),this.visibleChange.emit(!0)}hide(e=!0){e&&this.onHide.emit({}),this.modal&&this.disableModality()}close(e){this.hide(),this.visibleChange.emit(!1),this.cd.markForCheck(),e.preventDefault()}enableModality(){let e=this.document.querySelectorAll('[data-p-open="true"]'),n=e.length,o=n==1?String(parseInt(this.container.style.zIndex)-1):String(parseInt(e[n-1].style.zIndex)-1);if(!this.mask){if(this.mask=this.renderer.createElement("div"),this.mask){let a=`z-index: ${o};${this.getMaskStyle()}`;An(this.mask,"style",a),An(this.mask,"data-p",this.dataP),Ct(this.mask,this.cx("mask"))}this.dismissible&&(this.maskClickListener=this.renderer.listen(this.mask,"click",a=>{this.dismissible&&this.close(a)})),this.renderer.appendChild(this.document.body,this.mask),this.blockScroll&&$i()}}getMaskStyle(){return this.maskStyle?Object.entries(this.maskStyle).map(([e,n])=>`${e}: ${n}`).join("; "):""}disableModality(){this.mask&&(!this.$unstyled()&&xt(this.mask,"p-overlay-mask-enter-active"),!this.$unstyled()&&Ct(this.mask,"p-overlay-mask-leave-active"),this.animationEndListener=this.renderer.listen(this.mask,"animationend",this.destroyModal.bind(this)))}destroyModal(){this.unbindMaskClickListener(),this.mask&&this.renderer.removeChild(this.document.body,this.mask),this.blockScroll&&Hi(),this.unbindAnimationEndListener(),this.mask=null}onBeforeEnter(e){this.container=e.element,this.appendContainer(),this.show(),this.closeOnEscape&&this.bindDocumentEscapeListener()}onAfterLeave(){this.hide(!1),It.clear(this.container),this.unbindGlobalListeners(),this.modalVisible=!1,this.container=null}appendContainer(){this.$appendTo()&&this.$appendTo()!=="self"&&(this.$appendTo()==="body"?Ln(this.document.body,this.container):Ln(this.$appendTo(),this.container))}bindDocumentEscapeListener(){let e=this.el?this.el.nativeElement.ownerDocument:this.document;this.documentEscapeListener=this.renderer.listen(e,"keydown",n=>{n.which==27&&parseInt(this.container?.style.zIndex)===It.get(this.container)&&this.close(n)})}unbindDocumentEscapeListener(){this.documentEscapeListener&&(this.documentEscapeListener(),this.documentEscapeListener=null)}unbindMaskClickListener(){this.maskClickListener&&(this.maskClickListener(),this.maskClickListener=null)}unbindGlobalListeners(){this.unbindMaskClickListener(),this.unbindDocumentEscapeListener()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}onDestroy(){this.initialized=!1,this.visible&&this.modal&&this.destroyModal(),this.$appendTo()&&this.container&&this.renderer.appendChild(this.el.nativeElement,this.container),this.container&&this.autoZIndex&&It.clear(this.container),this.container=null,this.unbindGlobalListeners(),this.unbindAnimationEndListener()}get dataP(){return this.cn({"full-screen":this.position()==="full",[this.position()]:this.position(),open:this.visible,modal:this.modal})}static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["p-drawer"]],contentQueries:function(n,o,a){if(n&1&&be(a,Ps,4)(a,Rs,4)(a,Ls,4)(a,Ns,4)(a,As,4)(a,ie,4),n&2){let r;S(r=I())&&(o.headerTemplate=r.first),S(r=I())&&(o.footerTemplate=r.first),S(r=I())&&(o.contentTemplate=r.first),S(r=I())&&(o.closeIconTemplate=r.first),S(r=I())&&(o.headlessTemplate=r.first),S(r=I())&&(o.templates=r)}},viewQuery:function(n,o){if(n&1&&ve(Vs,5)(Us,5),n&2){let a;S(a=I())&&(o.containerViewChild=a.first),S(a=I())&&(o.closeButtonViewChild=a.first)}},inputs:{appendTo:[1,"appendTo"],motionOptions:[1,"motionOptions"],blockScroll:[2,"blockScroll","blockScroll",L],style:"style",styleClass:"styleClass",ariaCloseLabel:"ariaCloseLabel",autoZIndex:[2,"autoZIndex","autoZIndex",L],baseZIndex:[2,"baseZIndex","baseZIndex",ue],modal:[2,"modal","modal",L],closeButtonProps:"closeButtonProps",dismissible:[2,"dismissible","dismissible",L],showCloseIcon:[2,"showCloseIcon","showCloseIcon",L],closeOnEscape:[2,"closeOnEscape","closeOnEscape",L],transitionOptions:"transitionOptions",visible:"visible",position:[1,"position"],fullScreen:[1,"fullScreen"],header:"header",maskStyle:"maskStyle",closable:[2,"closable","closable",L]},outputs:{onShow:"onShow",onHide:"onHide",visibleChange:"visibleChange"},features:[J([ka,{provide:Sa,useExisting:t},{provide:ee,useExisting:t}]),Z([k]),V],ngContentSelectors:zs,decls:1,vars:1,consts:[["container",""],["icon",""],["role","complementary","pFocusTrap","",3,"pBind","pMotion","pMotionAppear","pMotionEnterActiveClass","pMotionLeaveActiveClass","pMotionOptions","class","style"],["role","complementary","pFocusTrap","",3,"pMotionOnBeforeEnter","pMotionOnAfterLeave","keydown","pBind","pMotion","pMotionAppear","pMotionEnterActiveClass","pMotionLeaveActiveClass","pMotionOptions"],[4,"ngTemplateOutlet"],[3,"pBind","ngClass"],[3,"pBind","class",4,"ngIf"],[3,"pt","ngClass","buttonProps","ariaLabel","unstyled","onClick","keydown.enter",4,"ngIf"],[4,"ngIf"],[3,"pBind"],[3,"onClick","keydown.enter","pt","ngClass","buttonProps","ariaLabel","unstyled"],["data-p-icon","times",4,"ngIf"],["data-p-icon","times"]],template:function(n,o){n&1&&(he(),w(0,el,4,13,"div",2)),n&2&&T(o.modalVisible?0:-1)},dependencies:[A,Ie,Ce,le,me,Je,j,k,ro,ao,tn,no],encapsulation:2,changeDetection:0})}return t})(),Tn=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=de({type:t});static \u0275inj=ce({imports:[Nt,j,j]})}return t})();var Ma=`
    .p-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: dt('avatar.width');
        height: dt('avatar.height');
        font-size: dt('avatar.font.size');
        background: dt('avatar.background');
        color: dt('avatar.color');
        border-radius: dt('avatar.border.radius');
    }

    .p-avatar-image {
        background: transparent;
    }

    .p-avatar-circle {
        border-radius: 50%;
    }

    .p-avatar-circle img {
        border-radius: 50%;
    }

    .p-avatar-icon {
        font-size: dt('avatar.icon.size');
        width: dt('avatar.icon.size');
        height: dt('avatar.icon.size');
    }

    .p-avatar img {
        width: 100%;
        height: 100%;
    }

    .p-avatar-lg {
        width: dt('avatar.lg.width');
        height: dt('avatar.lg.width');
        font-size: dt('avatar.lg.font.size');
    }

    .p-avatar-lg .p-avatar-icon {
        font-size: dt('avatar.lg.icon.size');
        width: dt('avatar.lg.icon.size');
        height: dt('avatar.lg.icon.size');
    }

    .p-avatar-xl {
        width: dt('avatar.xl.width');
        height: dt('avatar.xl.width');
        font-size: dt('avatar.xl.font.size');
    }

    .p-avatar-xl .p-avatar-icon {
        font-size: dt('avatar.xl.icon.size');
        width: dt('avatar.xl.icon.size');
        height: dt('avatar.xl.icon.size');
    }

    .p-avatar-group {
        display: flex;
        align-items: center;
    }

    .p-avatar-group .p-avatar + .p-avatar {
        margin-inline-start: dt('avatar.group.offset');
    }

    .p-avatar-group .p-avatar {
        border: 2px solid dt('avatar.group.border.color');
    }

    .p-avatar-group .p-avatar-lg + .p-avatar-lg {
        margin-inline-start: dt('avatar.lg.group.offset');
    }

    .p-avatar-group .p-avatar-xl + .p-avatar-xl {
        margin-inline-start: dt('avatar.xl.group.offset');
    }
`;var il=["*"];function ol(t,i){if(t&1&&(d(0,"span",3),M(1),p()),t&2){let e=c();y(e.cx("label")),s("pBind",e.ptm("label")),C("data-p",e.dataP),l(),K(e.label)}}function al(t,i){if(t&1&&_(0,"span",5),t&2){let e=c(2);y(e.icon),s("pBind",e.ptm("icon"))("ngClass",e.cx("icon")),C("data-p",e.dataP)}}function rl(t,i){if(t&1&&g(0,al,1,5,"span",4),t&2){let e=c(),n=Ge(5);s("ngIf",e.icon)("ngIfElse",n)}}function sl(t,i){if(t&1){let e=F();d(0,"img",7),f("error",function(o){b(e);let a=c(2);return v(a.imageError(o))}),p()}if(t&2){let e=c(2);s("pBind",e.ptm("image"))("src",e.image,it),C("aria-label",e.ariaLabel)("data-p",e.dataP)}}function ll(t,i){if(t&1&&g(0,sl,1,4,"img",6),t&2){let e=c();s("ngIf",e.image)}}var cl={root:({instance:t})=>["p-avatar p-component",{"p-avatar-image":t.image!=null,"p-avatar-circle":t.shape==="circle","p-avatar-lg":t.size==="large","p-avatar-xl":t.size==="xlarge"}],label:"p-avatar-label",icon:"p-avatar-icon"},Ea=(()=>{class t extends X{name="avatar";style=Ma;classes=cl;static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275prov=Q({token:t,factory:t.\u0275fac})}return t})();var Ba=new Y("AVATAR_INSTANCE"),ci=(()=>{class t extends oe{componentName="Avatar";$pcAvatar=h(Ba,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(k,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}label;icon;image;size="normal";shape="square";styleClass;ariaLabel;ariaLabelledBy;onImageError=new x;_componentStyle=h(Ea);imageError(e){this.onImageError.emit(e)}get dataP(){return this.cn({[this.shape]:this.shape,[this.size]:this.size})}static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["p-avatar"]],hostVars:5,hostBindings:function(n,o){n&2&&(C("aria-label",o.ariaLabel)("aria-labelledby",o.ariaLabelledBy)("data-p",o.dataP),y(o.cn(o.cx("root"),o.styleClass)))},inputs:{label:"label",icon:"icon",image:"image",size:"size",shape:"shape",styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy"},outputs:{onImageError:"onImageError"},features:[J([Ea,{provide:Ba,useExisting:t},{provide:ee,useExisting:t}]),Z([k]),V],ngContentSelectors:il,decls:6,vars:2,consts:[["iconTemplate",""],["imageTemplate",""],[3,"pBind","class",4,"ngIf","ngIfElse"],[3,"pBind"],[3,"pBind","class","ngClass",4,"ngIf","ngIfElse"],[3,"pBind","ngClass"],[3,"pBind","src","error",4,"ngIf"],[3,"error","pBind","src"]],template:function(n,o){if(n&1&&(he(),_e(0),g(1,ol,2,5,"span",2)(2,rl,1,2,"ng-template",null,0,se)(4,ll,1,1,"ng-template",null,1,se)),n&2){let a=Ge(3);l(),s("ngIf",o.label)("ngIfElse",a)}},dependencies:[A,Ie,Ce,j,k],encapsulation:2,changeDetection:0})}return t})(),Fa=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=de({type:t});static \u0275inj=ce({imports:[ci,j,j]})}return t})();var Da=`
    .p-tabs {
        display: flex;
        flex-direction: column;
    }

    .p-tablist {
        display: flex;
        position: relative;
        overflow: hidden;
        background: dt('tabs.tablist.background');
    }

    .p-tablist-viewport {
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tablist-viewport::-webkit-scrollbar {
        display: none;
    }

    .p-tablist-tab-list {
        position: relative;
        display: flex;
        border-style: solid;
        border-color: dt('tabs.tablist.border.color');
        border-width: dt('tabs.tablist.border.width');
    }

    .p-tablist-content {
        flex-grow: 1;
    }

    .p-tablist-nav-button {
        all: unset;
        position: absolute !important;
        flex-shrink: 0;
        inset-block-start: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabs.nav.button.background');
        color: dt('tabs.nav.button.color');
        width: dt('tabs.nav.button.width');
        transition:
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        box-shadow: dt('tabs.nav.button.shadow');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-tablist-nav-button:focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.nav.button.focus.ring.shadow');
        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');
        outline-offset: dt('tabs.nav.button.focus.ring.offset');
    }

    .p-tablist-nav-button:hover {
        color: dt('tabs.nav.button.hover.color');
    }

    .p-tablist-prev-button {
        inset-inline-start: 0;
    }

    .p-tablist-next-button {
        inset-inline-end: 0;
    }

    .p-tablist-prev-button:dir(rtl),
    .p-tablist-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-tab {
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-style: solid;
        white-space: nowrap;
        gap: dt('tabs.tab.gap');
        background: dt('tabs.tab.background');
        border-width: dt('tabs.tab.border.width');
        border-color: dt('tabs.tab.border.color');
        color: dt('tabs.tab.color');
        padding: dt('tabs.tab.padding');
        font-weight: dt('tabs.tab.font.weight');
        transition:
            background dt('tabs.transition.duration'),
            border-color dt('tabs.transition.duration'),
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        margin: dt('tabs.tab.margin');
        outline-color: transparent;
    }

    .p-tab:not(.p-disabled):focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.tab.focus.ring.shadow');
        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');
        outline-offset: dt('tabs.tab.focus.ring.offset');
    }

    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
        background: dt('tabs.tab.hover.background');
        border-color: dt('tabs.tab.hover.border.color');
        color: dt('tabs.tab.hover.color');
    }

    .p-tab-active {
        background: dt('tabs.tab.active.background');
        border-color: dt('tabs.tab.active.border.color');
        color: dt('tabs.tab.active.color');
    }

    .p-tabpanels {
        background: dt('tabs.tabpanel.background');
        color: dt('tabs.tabpanel.color');
        padding: dt('tabs.tabpanel.padding');
        outline: 0 none;
    }

    .p-tabpanel:focus-visible {
        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');
        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');
        outline-offset: dt('tabs.tabpanel.focus.ring.offset');
    }

    .p-tablist-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        inset-block-end: dt('tabs.active.bar.bottom');
        height: dt('tabs.active.bar.height');
        background: dt('tabs.active.bar.background');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
`;var At=["*"],pl=["previcon"],ul=["nexticon"],ja=["content"],ml=["prevButton"],fl=["nextButton"],gl=["inkbar"],hl=["tabs"];function _l(t,i){t&1&&W(0)}function bl(t,i){if(t&1&&g(0,_l,1,0,"ng-container",11),t&2){let e=c(2);s("ngTemplateOutlet",e.prevIconTemplate||e._prevIconTemplate)}}function vl(t,i){t&1&&(O(),_(0,"svg",10))}function yl(t,i){if(t&1){let e=F();d(0,"button",9,3),f("click",function(){b(e);let o=c();return v(o.onPrevButtonClick())}),w(2,bl,1,1,"ng-container")(3,vl,1,0,":svg:svg",10),p()}if(t&2){let e=c();y(e.cx("prevButton")),s("pBind",e.ptm("prevButton")),C("aria-label",e.prevButtonAriaLabel)("tabindex",e.tabindex())("data-pc-group-section","navigator"),l(2),T(e.prevIconTemplate||e._prevIconTemplate?2:3)}}function Cl(t,i){t&1&&W(0)}function xl(t,i){if(t&1&&g(0,Cl,1,0,"ng-container",11),t&2){let e=c(2);s("ngTemplateOutlet",e.nextIconTemplate||e._nextIconTemplate)}}function wl(t,i){t&1&&(O(),_(0,"svg",12))}function Tl(t,i){if(t&1){let e=F();d(0,"button",9,4),f("click",function(){b(e);let o=c();return v(o.onNextButtonClick())}),w(2,xl,1,1,"ng-container")(3,wl,1,0,":svg:svg",12),p()}if(t&2){let e=c();y(e.cx("nextButton")),s("pBind",e.ptm("nextButton")),C("aria-label",e.nextButtonAriaLabel)("tabindex",e.tabindex())("data-pc-group-section","navigator"),l(2),T(e.nextIconTemplate||e._nextIconTemplate?2:3)}}function kl(t,i){t&1&&_e(0)}function Sl(t,i){t&1&&W(0)}function Il(t,i){if(t&1&&g(0,Sl,1,0,"ng-container",1),t&2){let e=c(),n=Ge(1);s("ngTemplateOutlet",e.content()?e.content():n)}}var Ml={root:({instance:t})=>["p-tabs p-component",{"p-tabs-scrollable":t.scrollable()}]},Pa=(()=>{class t extends X{name="tabs";style=Da;classes=Ml;static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275prov=Q({token:t,factory:t.\u0275fac})}return t})();var Ra=new Y("TABS_INSTANCE"),yt=(()=>{class t extends oe{componentName="Tabs";$pcTabs=h(Ra,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(k,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}value=Qt(void 0);scrollable=q(!1,{transform:L});lazy=q(!1,{transform:L});selectOnFocus=q(!1,{transform:L});showNavigators=q(!0,{transform:L});tabindex=q(0,{transform:ue});id=D(st("pn_id_"));_componentStyle=h(Pa);updateValue(e){this.value.update(()=>e)}static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["p-tabs"]],hostVars:3,hostBindings:function(n,o){n&2&&(C("id",o.id()),y(o.cx("root")))},inputs:{value:[1,"value"],scrollable:[1,"scrollable"],lazy:[1,"lazy"],selectOnFocus:[1,"selectOnFocus"],showNavigators:[1,"showNavigators"],tabindex:[1,"tabindex"]},outputs:{value:"valueChange"},features:[J([Pa,{provide:Ra,useExisting:t},{provide:ee,useExisting:t}]),Z([k]),V],ngContentSelectors:At,decls:1,vars:0,template:function(n,o){n&1&&(he(),_e(0))},dependencies:[A,xe],encapsulation:2,changeDetection:0})}return t})(),El={root:({instance:t})=>["p-tab",{"p-tab-active":t.active(),"p-disabled":t.disabled()}]},La=(()=>{class t extends X{name="tab";classes=El;static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275prov=Q({token:t,factory:t.\u0275fac})}return t})();var Bl={root:"p-tablist",content:"p-tablist-content p-tablist-viewport",tabList:"p-tablist-tab-list",activeBar:"p-tablist-active-bar",prevButton:"p-tablist-prev-button p-tablist-nav-button",nextButton:"p-tablist-next-button p-tablist-nav-button"},Na=(()=>{class t extends X{name="tablist";classes=Bl;static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275prov=Q({token:t,factory:t.\u0275fac})}return t})();var Aa=new Y("TABLIST_INSTANCE"),kn=(()=>{class t extends oe{componentName="TabList";$pcTabList=h(Aa,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(k,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}prevIconTemplate;nextIconTemplate;templates;content;prevButton;nextButton;inkbar;tabs;pcTabs=h(Pe(()=>yt));isPrevButtonEnabled=D(!1);isNextButtonEnabled=D(!1);resizeObserver;showNavigators=N(()=>this.pcTabs.showNavigators());tabindex=N(()=>this.pcTabs.tabindex());scrollable=N(()=>this.pcTabs.scrollable());_componentStyle=h(Na);constructor(){super(),Ci(()=>{this.pcTabs.value(),We(this.platformId)&&setTimeout(()=>{this.updateInkBar()})})}get prevButtonAriaLabel(){return this.config?.translation?.aria?.previous}get nextButtonAriaLabel(){return this.config?.translation?.aria?.next}onAfterViewInit(){this.showNavigators()&&We(this.platformId)&&(this.updateButtonState(),this.bindResizeObserver())}_prevIconTemplate;_nextIconTemplate;onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"previcon":this._prevIconTemplate=e.template;break;case"nexticon":this._nextIconTemplate=e.template;break}})}onDestroy(){this.unbindResizeObserver()}onScroll(e){this.showNavigators()&&this.updateButtonState(),e.preventDefault()}onPrevButtonClick(){let e=this.content.nativeElement,n=Tt(e),o=Math.abs(e.scrollLeft)-n,a=o<=0?0:o;e.scrollLeft=Rn(e)?-1*a:a}onNextButtonClick(){let e=this.content.nativeElement,n=Tt(e)-this.getVisibleButtonWidths(),o=e.scrollLeft+n,a=e.scrollWidth-n,r=o>=a?a:o;e.scrollLeft=Rn(e)?-1*r:r}updateButtonState(){let e=this.content?.nativeElement,n=this.el?.nativeElement,{scrollWidth:o,offsetWidth:a}=e,r=Math.abs(e.scrollLeft),u=Tt(e);this.isPrevButtonEnabled.set(r!==0),this.isNextButtonEnabled.set(n.offsetWidth>=a&&Math.abs(r-o+u)>1)}updateInkBar(){let e=this.content?.nativeElement,n=this.inkbar?.nativeElement,o=this.tabs?.nativeElement,a=zi(e,'[data-pc-name="tab"][data-p-active="true"]');n&&(n.style.width=Ui(a)+"px",n.style.left=Nn(a).left-Nn(o).left+"px")}getVisibleButtonWidths(){let e=this.prevButton?.nativeElement,n=this.nextButton?.nativeElement;return[e,n].reduce((o,a)=>a?o+Tt(a):o,0)}bindResizeObserver(){this.resizeObserver=new ResizeObserver(()=>this.updateButtonState()),this.resizeObserver.observe(this.el.nativeElement)}unbindResizeObserver(){this.resizeObserver&&(this.resizeObserver.unobserve(this.el.nativeElement),this.resizeObserver=null)}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=E({type:t,selectors:[["p-tablist"]],contentQueries:function(n,o,a){if(n&1&&be(a,pl,4)(a,ul,4)(a,ie,4),n&2){let r;S(r=I())&&(o.prevIconTemplate=r.first),S(r=I())&&(o.nextIconTemplate=r.first),S(r=I())&&(o.templates=r)}},viewQuery:function(n,o){if(n&1&&ve(ja,5)(ml,5)(fl,5)(gl,5)(hl,5),n&2){let a;S(a=I())&&(o.content=a.first),S(a=I())&&(o.prevButton=a.first),S(a=I())&&(o.nextButton=a.first),S(a=I())&&(o.inkbar=a.first),S(a=I())&&(o.tabs=a.first)}},hostVars:2,hostBindings:function(n,o){n&2&&y(o.cx("root"))},features:[J([Na,{provide:Aa,useExisting:t},{provide:ee,useExisting:t}]),Z([k]),V],ngContentSelectors:At,decls:9,vars:11,consts:[["content",""],["tabs",""],["inkbar",""],["prevButton",""],["nextButton",""],["type","button","pRipple","",3,"pBind","class"],[3,"scroll","pBind"],["role","tablist",3,"pBind"],["role","presentation",3,"pBind"],["type","button","pRipple","",3,"click","pBind"],["data-p-icon","chevron-left"],[4,"ngTemplateOutlet"],["data-p-icon","chevron-right"]],template:function(n,o){n&1&&(he(),w(0,yl,4,7,"button",5),d(1,"div",6,0),f("scroll",function(r){return o.onScroll(r)}),d(3,"div",7,1),_e(5),_(6,"span",8,2),p()(),w(8,Tl,4,7,"button",5)),n&2&&(T(o.showNavigators()&&o.isPrevButtonEnabled()?0:-1),l(),y(o.cx("content")),s("pBind",o.ptm("content")),l(2),y(o.cx("tabList")),s("pBind",o.ptm("tabList")),l(3),y(o.cx("activeBar")),s("pBind",o.ptm("activeBar")),l(2),T(o.showNavigators()&&o.isNextButtonEnabled()?8:-1))},dependencies:[A,le,so,lo,Wi,St,j,xe,k],encapsulation:2,changeDetection:0})}return t})(),Va=new Y("TAB_INSTANCE"),di=(()=>{class t extends oe{componentName="Tab";$pcTab=h(Va,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(k,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}value=Qt();disabled=q(!1,{transform:L});pcTabs=h(Pe(()=>yt));pcTabList=h(Pe(()=>kn));el=h(wi);_componentStyle=h(La);ripple=N(()=>this.config.ripple());id=N(()=>`${this.pcTabs.id()}_tab_${this.value()}`);ariaControls=N(()=>`${this.pcTabs.id()}_tabpanel_${this.value()}`);active=N(()=>kt(this.pcTabs.value(),this.value()));tabindex=N(()=>this.disabled()?-1:this.active()?this.pcTabs.tabindex():-1);mutationObserver;onFocus(e){this.disabled()||this.pcTabs.selectOnFocus()&&this.changeActiveValue()}onClick(e){this.disabled()||this.changeActiveValue()}onKeyDown(e){switch(e.code){case"ArrowRight":this.onArrowRightKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"PageDown":this.onPageDownKey(e);break;case"PageUp":this.onPageUpKey(e);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(e);break;default:break}e.stopPropagation()}onAfterViewInit(){this.bindMutationObserver()}onArrowRightKey(e){let n=this.findNextTab(e.currentTarget);n?this.changeFocusedTab(e,n):this.onHomeKey(e),e.preventDefault()}onArrowLeftKey(e){let n=this.findPrevTab(e.currentTarget);n?this.changeFocusedTab(e,n):this.onEndKey(e),e.preventDefault()}onHomeKey(e){let n=this.findFirstTab();this.changeFocusedTab(e,n),e.preventDefault()}onEndKey(e){let n=this.findLastTab();this.changeFocusedTab(e,n),e.preventDefault()}onPageDownKey(e){this.scrollInView(this.findLastTab()),e.preventDefault()}onPageUpKey(e){this.scrollInView(this.findFirstTab()),e.preventDefault()}onEnterKey(e){this.disabled()||this.changeActiveValue(),e.preventDefault()}findNextTab(e,n=!1){let o=n?e:e.nextElementSibling;return o?wt(o,"data-p-disabled")||wt(o,"data-pc-section")==="activebar"?this.findNextTab(o):o:null}findPrevTab(e,n=!1){let o=n?e:e.previousElementSibling;return o?wt(o,"data-p-disabled")||wt(o,"data-pc-section")==="activebar"?this.findPrevTab(o):o:null}findFirstTab(){return this.findNextTab(this.pcTabList?.tabs?.nativeElement?.firstElementChild,!0)}findLastTab(){return this.findPrevTab(this.pcTabList?.tabs?.nativeElement?.lastElementChild,!0)}changeActiveValue(){this.pcTabs.updateValue(this.value())}changeFocusedTab(e,n){Oi(n),this.scrollInView(n)}scrollInView(e){e?.scrollIntoView?.({block:"nearest"})}bindMutationObserver(){We(this.platformId)&&(this.mutationObserver=new MutationObserver(e=>{e.forEach(()=>{this.active()&&this.pcTabList?.updateInkBar()})}),this.mutationObserver.observe(this.el.nativeElement,{childList:!0,characterData:!0,subtree:!0}))}unbindMutationObserver(){this.mutationObserver?.disconnect()}onDestroy(){this.mutationObserver&&this.unbindMutationObserver()}static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["p-tab"]],hostVars:10,hostBindings:function(n,o){n&1&&f("focus",function(r){return o.onFocus(r)})("click",function(r){return o.onClick(r)})("keydown",function(r){return o.onKeyDown(r)}),n&2&&(C("id",o.id())("aria-controls",o.ariaControls())("role","tab")("aria-selected",o.active())("aria-disabled",o.disabled())("data-p-disabled",o.disabled())("data-p-active",o.active())("tabindex",o.tabindex()),y(o.cx("root")))},inputs:{value:[1,"value"],disabled:[1,"disabled"]},outputs:{value:"valueChange"},features:[J([La,{provide:Va,useExisting:t},{provide:ee,useExisting:t}]),Z([St,k]),V],ngContentSelectors:At,decls:1,vars:0,template:function(n,o){n&1&&(he(),_e(0))},dependencies:[A,j,xe],encapsulation:2,changeDetection:0})}return t})(),Fl={root:({instance:t})=>["p-tabpanel",{"p-tabpanel-active":t.active()}]},Ua=(()=>{class t extends X{name="tabpanel";classes=Fl;static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275prov=Q({token:t,factory:t.\u0275fac})}return t})();var za=new Y("TABPANEL_INSTANCE"),pi=(()=>{class t extends oe{componentName="TabPanel";$pcTabPanel=h(za,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(k,{self:!0});pcTabs=h(Pe(()=>yt));onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}lazy=q(!1,{transform:L});value=Qt(void 0);content=Pi("content");id=N(()=>`${this.pcTabs.id()}_tabpanel_${this.value()}`);ariaLabelledby=N(()=>`${this.pcTabs.id()}_tab_${this.value()}`);active=N(()=>kt(this.pcTabs.value(),this.value()));isLazyEnabled=N(()=>this.pcTabs.lazy()||this.lazy());hasBeenRendered=!1;shouldRender=N(()=>!this.isLazyEnabled()||this.hasBeenRendered?!0:this.active()?(this.hasBeenRendered=!0,!0):!1);_componentStyle=h(Ua);static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["p-tabpanel"]],contentQueries:function(n,o,a){n&1&&Mi(a,o.content,ja,5),n&2&&Ei()},hostVars:7,hostBindings:function(n,o){n&2&&(rt("hidden",!o.active()),C("id",o.id())("role","tabpanel")("aria-labelledby",o.ariaLabelledby())("data-p-active",o.active()),y(o.cx("root")))},inputs:{lazy:[1,"lazy"],value:[1,"value"]},outputs:{value:"valueChange"},features:[J([Ua,{provide:za,useExisting:t},{provide:ee,useExisting:t}]),Z([k]),V],ngContentSelectors:At,decls:3,vars:1,consts:[["defaultContent",""],[4,"ngTemplateOutlet"]],template:function(n,o){n&1&&(he(),g(0,kl,1,0,"ng-template",null,0,se),w(2,Il,1,1,"ng-container")),n&2&&(l(2),T(o.shouldRender()?2:-1))},dependencies:[le,xe],encapsulation:2,changeDetection:0})}return t})(),Dl={root:"p-tabpanels"},Oa=(()=>{class t extends X{name="tabpanels";classes=Dl;static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275prov=Q({token:t,factory:t.\u0275fac})}return t})();var qa=new Y("TABPANELS_INSTANCE"),ui=(()=>{class t extends oe{componentName="TabPanels";$pcTabPanels=h(qa,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(k,{self:!0});_componentStyle=h(Oa);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["p-tabpanels"]],hostVars:3,hostBindings:function(n,o){n&2&&(C("role","presentation"),y(o.cx("root")))},features:[J([Oa,{provide:qa,useExisting:t},{provide:ee,useExisting:t}]),Z([k]),V],ngContentSelectors:At,decls:1,vars:0,template:function(n,o){n&1&&(he(),_e(0))},dependencies:[A,xe],encapsulation:2,changeDetection:0})}return t})(),$a=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=de({type:t});static \u0275inj=ce({imports:[yt,ui,pi,kn,di,xe,xe]})}return t})();var Rl=t=>({background:t}),Ll=(t,i)=>i.id,Nl=(t,i)=>i.userId;function Al(t,i){t&1&&(d(0,"p-tab",11),_(1,"i",12),M(2,"Requests"),p(),d(3,"p-tab",13),_(4,"i",14),M(5,"Banned"),p())}function Vl(t,i){t&1&&_(0,"p-tag",18)}function Ul(t,i){if(t&1){let e=F();d(0,"p-button",20),f("onClick",function(){b(e);let o=c().$implicit,a=c();return v(a.kick.emit(o.id))}),p()}if(t&2){let e=c().$implicit,n=c();s("text",!0)("disabled",n.pendingKicks.includes(e.id))}}function zl(t,i){if(t&1&&(d(0,"div",9)(1,"div",15),_(2,"p-avatar",16),d(3,"div")(4,"span",17),M(5),p(),w(6,Vl,1,0,"p-tag",18),p()(),w(7,Ul,1,2,"p-button",19),p()),t&2){let e=i.$implicit,n=c();l(2),Ue(ze(6,Rl,e.isHost?"var(--color-primary)":"var(--color-accent)")),s("label",e.displayName.charAt(0).toUpperCase()),l(3),K(e.displayName),l(),T(e.isHost?6:-1),l(),T(n.isHost&&e.id!==n.currentUserId?7:-1)}}function Ol(t,i){t&1&&(d(0,"p",10),M(1,"No participants found"),p())}function ql(t,i){if(t&1){let e=F();d(0,"div",23)(1,"div",28)(2,"span",29),M(3),p(),d(4,"span",30),M(5),$t(6,"timeAgo"),p()(),d(7,"div",31)(8,"p-button",32),f("onClick",function(){let o=b(e).$implicit,a=c(2);return v(a.approve.emit(o.userId))}),p(),d(9,"p-button",33),f("onClick",function(){let o=b(e).$implicit,a=c(2);return v(a.deny.emit(o.userId))}),p()()()}if(t&2){let e=i.$implicit;l(3),K(e.displayName),l(2),K(Ht(6,2,e.timestamp))}}function jl(t,i){t&1&&(d(0,"p",10),M(1,"No pending requests"),p())}function $l(t,i){if(t&1){let e=F();d(0,"div",24)(1,"p-button",34),f("onClick",function(){b(e);let o=c(2);return v(o.approveAll.emit())}),p(),d(2,"p-button",35),f("onClick",function(){b(e);let o=c(2);return v(o.denyAll.emit())}),p()()}}function Hl(t,i){if(t&1){let e=F();d(0,"div",9)(1,"span",36),M(2),p(),d(3,"p-button",37),f("onClick",function(){let o=b(e).$implicit,a=c(2);return v(a.unban.emit(o))}),p()()}if(t&2){let e=i.$implicit;l(2),K(e)}}function Ql(t,i){t&1&&(d(0,"p",10),M(1,"No banned users"),p())}function Kl(t,i){if(t&1){let e=F();d(0,"p-button",38),f("onClick",function(){b(e);let o=c(2);return v(o.unbanAll.emit())}),p()}}function Gl(t,i){if(t&1){let e=F();d(0,"p-tabpanel",21)(1,"div",6)(2,"p-iconfield"),_(3,"p-inputicon",7),d(4,"input",22),f("ngModelChange",function(o){b(e);let a=c();return v(a.searchQuery.set(o))}),p()(),ae(5,ql,10,4,"div",23,Nl),w(7,jl,2,0,"p",10),w(8,$l,3,0,"div",24),p()(),d(9,"p-tabpanel",25)(10,"div",6)(11,"p-iconfield"),_(12,"p-inputicon",7),d(13,"input",26),f("ngModelChange",function(o){b(e);let a=c();return v(a.searchQuery.set(o))}),p()(),ae(14,Hl,4,1,"div",9,Ke),w(16,Ql,2,0,"p",10),w(17,Kl,1,0,"p-button",27),p()()}if(t&2){let e=c();l(4),s("ngModel",e.searchQuery()),l(),re(e.filteredRequests()),l(2),T(e.filteredRequests().length===0&&e.isHost?7:-1),l(),T(e.filteredRequests().length>1&&e.isHost?8:-1),l(5),s("ngModel",e.searchQuery()),l(),re(e.filteredBanList()),l(2),T(e.filteredBanList().length===0?16:-1),l(),T(e.filteredBanList().length>0?17:-1)}}var Sn=class t{show=!1;set participants(i){this.#e.set(i)}set requests(i){this.#t.set(i)}set banList(i){this.#n.set(i)}isHost=!1;currentUserId="";pendingKicks=[];kick=new x;approve=new x;deny=new x;approveAll=new x;denyAll=new x;unban=new x;unbanAll=new x;close=new x;#e=D([]);#t=D([]);#n=D([]);searchQuery=D("");filteredParticipants=N(()=>{let i=this.searchQuery().toLowerCase(),e=this.#e();return i?e.filter(n=>n.displayName.toLowerCase().includes(i)):e});filteredRequests=N(()=>{let i=this.searchQuery().toLowerCase(),e=this.#t();return i?e.filter(n=>n.displayName.toLowerCase().includes(i)):e});filteredBanList=N(()=>{let i=this.searchQuery().toLowerCase(),e=this.#n();return i?e.filter(n=>n.toLowerCase().includes(i)):e});onVisibleChange(i){i||(this.close.emit(),this.searchQuery.set(""))}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-participants-panel"]],inputs:{show:"show",participants:"participants",requests:"requests",banList:"banList",isHost:"isHost",currentUserId:"currentUserId",pendingKicks:"pendingKicks"},outputs:{kick:"kick",approve:"approve",deny:"deny",approveAll:"approveAll",denyAll:"denyAll",unban:"unban",unbanAll:"unbanAll",close:"close"},decls:18,vars:7,consts:[["id","ParticipantsPanel"],["header","Room",3,"visibleChange","visible","position"],[3,"value"],["value","0",1,"p-tab-compact"],[1,"pi","pi-users","mr-1"],["value","0"],[1,"flex","flex-col","gap-3"],["styleClass","pi pi-search"],["pInputText","","type","text","placeholder","Search participants...",1,"w-full",3,"ngModelChange","ngModel"],[1,"flex","items-center","justify-between","p-3","rounded-lg","surface-ground"],[1,"text-center","py-8","text-muted-color"],["value","1",1,"p-tab-compact"],[1,"pi","pi-user-plus","mr-1"],["value","2",1,"p-tab-compact"],[1,"pi","pi-ban","mr-1"],[1,"flex","items-center","gap-3"],["size","normal","shape","circle",3,"label"],[1,"text-sm","font-medium"],["value","Host","severity","info",1,"ml-1"],["label","Kick","severity","danger","size","small",3,"text","disabled"],["label","Kick","severity","danger","size","small",3,"onClick","text","disabled"],["value","1"],["pInputText","","type","text","placeholder","Search requests...",1,"w-full",3,"ngModelChange","ngModel"],[1,"flex","flex-col","gap-2","p-3","rounded-lg","surface-ground"],[1,"flex","gap-2","mt-2"],["value","2"],["pInputText","","type","text","placeholder","Search banned users...",1,"w-full",3,"ngModelChange","ngModel"],["label","Unban All","severity","warn",1,"w-full","mt-2"],[1,"flex","justify-between","items-center"],[1,"font-medium"],[1,"text-xs","text-muted-color"],[1,"flex","gap-2"],["label","Approve","severity","success","size","small",1,"flex-1",3,"onClick"],["label","Deny","severity","danger","size","small",1,"flex-1",3,"onClick"],["label","Approve All","severity","success",1,"flex-1",3,"onClick"],["label","Deny All","severity","danger",1,"flex-1",3,"onClick"],[1,"text-sm","truncate","font-mono"],["label","Unban","severity","warn","size","small",3,"onClick"],["label","Unban All","severity","warn",1,"w-full","mt-2",3,"onClick"]],template:function(e,n){e&1&&(d(0,"section",0)(1,"p-drawer",1),f("visibleChange",function(a){return n.onVisibleChange(a)}),d(2,"p-tabs",2)(3,"p-tablist")(4,"p-tab",3),_(5,"i",4),M(6,"Participants"),p(),w(7,Al,6,0),p(),d(8,"p-tabpanels")(9,"p-tabpanel",5)(10,"div",6)(11,"p-iconfield"),_(12,"p-inputicon",7),d(13,"input",8),f("ngModelChange",function(a){return n.searchQuery.set(a)}),p()(),ae(14,zl,8,8,"div",9,Ll),w(16,Ol,2,0,"p",10),p()(),w(17,Gl,18,6),p()()()()),e&2&&(l(),s("visible",n.show)("position","right"),l(),s("value","0"),l(5),T(n.isHost?7:-1),l(6),s("ngModel",n.searchQuery()),l(),re(n.filteredParticipants()),l(2),T(n.filteredParticipants().length===0?16:-1),l(),T(n.isHost?17:-1))},dependencies:[A,Me,lt,Oe,qe,Tn,Nt,Be,me,Fa,ci,oo,io,$a,yt,ui,pi,kn,di,ct,Zt,Xi,Zi,to,eo,an],styles:[".p-tab-compact[_ngcontent-%COMP%]{padding:.5rem .75rem!important;font-size:.875rem;white-space:nowrap}.p-drawer-right[_ngcontent-%COMP%]{width:40vw!important}#ParticipantsPanel[_ngcontent-%COMP%]   .p-tablist-tab-list[_ngcontent-%COMP%]{justify-content:center}"],changeDetection:0})};var Ha=`
    .p-message {
        display: grid;
        grid-template-rows: 1fr;
        border-radius: dt('message.border.radius');
        outline-width: dt('message.border.width');
        outline-style: solid;
    }

    .p-message-content-wrapper {
        min-height: 0;
    }

    .p-message-content {
        display: flex;
        align-items: center;
        padding: dt('message.content.padding');
        gap: dt('message.content.gap');
    }

    .p-message-icon {
        flex-shrink: 0;
    }

    .p-message-close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-inline-start: auto;
        overflow: hidden;
        position: relative;
        width: dt('message.close.button.width');
        height: dt('message.close.button.height');
        border-radius: dt('message.close.button.border.radius');
        background: transparent;
        transition:
            background dt('message.transition.duration'),
            color dt('message.transition.duration'),
            outline-color dt('message.transition.duration'),
            box-shadow dt('message.transition.duration'),
            opacity 0.3s;
        outline-color: transparent;
        color: inherit;
        padding: 0;
        border: none;
        cursor: pointer;
        user-select: none;
    }

    .p-message-close-icon {
        font-size: dt('message.close.icon.size');
        width: dt('message.close.icon.size');
        height: dt('message.close.icon.size');
    }

    .p-message-close-button:focus-visible {
        outline-width: dt('message.close.button.focus.ring.width');
        outline-style: dt('message.close.button.focus.ring.style');
        outline-offset: dt('message.close.button.focus.ring.offset');
    }

    .p-message-info {
        background: dt('message.info.background');
        outline-color: dt('message.info.border.color');
        color: dt('message.info.color');
        box-shadow: dt('message.info.shadow');
    }

    .p-message-info .p-message-close-button:focus-visible {
        outline-color: dt('message.info.close.button.focus.ring.color');
        box-shadow: dt('message.info.close.button.focus.ring.shadow');
    }

    .p-message-info .p-message-close-button:hover {
        background: dt('message.info.close.button.hover.background');
    }

    .p-message-info.p-message-outlined {
        color: dt('message.info.outlined.color');
        outline-color: dt('message.info.outlined.border.color');
    }

    .p-message-info.p-message-simple {
        color: dt('message.info.simple.color');
    }

    .p-message-success {
        background: dt('message.success.background');
        outline-color: dt('message.success.border.color');
        color: dt('message.success.color');
        box-shadow: dt('message.success.shadow');
    }

    .p-message-success .p-message-close-button:focus-visible {
        outline-color: dt('message.success.close.button.focus.ring.color');
        box-shadow: dt('message.success.close.button.focus.ring.shadow');
    }

    .p-message-success .p-message-close-button:hover {
        background: dt('message.success.close.button.hover.background');
    }

    .p-message-success.p-message-outlined {
        color: dt('message.success.outlined.color');
        outline-color: dt('message.success.outlined.border.color');
    }

    .p-message-success.p-message-simple {
        color: dt('message.success.simple.color');
    }

    .p-message-warn {
        background: dt('message.warn.background');
        outline-color: dt('message.warn.border.color');
        color: dt('message.warn.color');
        box-shadow: dt('message.warn.shadow');
    }

    .p-message-warn .p-message-close-button:focus-visible {
        outline-color: dt('message.warn.close.button.focus.ring.color');
        box-shadow: dt('message.warn.close.button.focus.ring.shadow');
    }

    .p-message-warn .p-message-close-button:hover {
        background: dt('message.warn.close.button.hover.background');
    }

    .p-message-warn.p-message-outlined {
        color: dt('message.warn.outlined.color');
        outline-color: dt('message.warn.outlined.border.color');
    }

    .p-message-warn.p-message-simple {
        color: dt('message.warn.simple.color');
    }

    .p-message-error {
        background: dt('message.error.background');
        outline-color: dt('message.error.border.color');
        color: dt('message.error.color');
        box-shadow: dt('message.error.shadow');
    }

    .p-message-error .p-message-close-button:focus-visible {
        outline-color: dt('message.error.close.button.focus.ring.color');
        box-shadow: dt('message.error.close.button.focus.ring.shadow');
    }

    .p-message-error .p-message-close-button:hover {
        background: dt('message.error.close.button.hover.background');
    }

    .p-message-error.p-message-outlined {
        color: dt('message.error.outlined.color');
        outline-color: dt('message.error.outlined.border.color');
    }

    .p-message-error.p-message-simple {
        color: dt('message.error.simple.color');
    }

    .p-message-secondary {
        background: dt('message.secondary.background');
        outline-color: dt('message.secondary.border.color');
        color: dt('message.secondary.color');
        box-shadow: dt('message.secondary.shadow');
    }

    .p-message-secondary .p-message-close-button:focus-visible {
        outline-color: dt('message.secondary.close.button.focus.ring.color');
        box-shadow: dt('message.secondary.close.button.focus.ring.shadow');
    }

    .p-message-secondary .p-message-close-button:hover {
        background: dt('message.secondary.close.button.hover.background');
    }

    .p-message-secondary.p-message-outlined {
        color: dt('message.secondary.outlined.color');
        outline-color: dt('message.secondary.outlined.border.color');
    }

    .p-message-secondary.p-message-simple {
        color: dt('message.secondary.simple.color');
    }

    .p-message-contrast {
        background: dt('message.contrast.background');
        outline-color: dt('message.contrast.border.color');
        color: dt('message.contrast.color');
        box-shadow: dt('message.contrast.shadow');
    }

    .p-message-contrast .p-message-close-button:focus-visible {
        outline-color: dt('message.contrast.close.button.focus.ring.color');
        box-shadow: dt('message.contrast.close.button.focus.ring.shadow');
    }

    .p-message-contrast .p-message-close-button:hover {
        background: dt('message.contrast.close.button.hover.background');
    }

    .p-message-contrast.p-message-outlined {
        color: dt('message.contrast.outlined.color');
        outline-color: dt('message.contrast.outlined.border.color');
    }

    .p-message-contrast.p-message-simple {
        color: dt('message.contrast.simple.color');
    }

    .p-message-text {
        font-size: dt('message.text.font.size');
        font-weight: dt('message.text.font.weight');
    }

    .p-message-icon {
        font-size: dt('message.icon.size');
        width: dt('message.icon.size');
        height: dt('message.icon.size');
    }

    .p-message-sm .p-message-content {
        padding: dt('message.content.sm.padding');
    }

    .p-message-sm .p-message-text {
        font-size: dt('message.text.sm.font.size');
    }

    .p-message-sm .p-message-icon {
        font-size: dt('message.icon.sm.size');
        width: dt('message.icon.sm.size');
        height: dt('message.icon.sm.size');
    }

    .p-message-sm .p-message-close-icon {
        font-size: dt('message.close.icon.sm.size');
        width: dt('message.close.icon.sm.size');
        height: dt('message.close.icon.sm.size');
    }

    .p-message-lg .p-message-content {
        padding: dt('message.content.lg.padding');
    }

    .p-message-lg .p-message-text {
        font-size: dt('message.text.lg.font.size');
    }

    .p-message-lg .p-message-icon {
        font-size: dt('message.icon.lg.size');
        width: dt('message.icon.lg.size');
        height: dt('message.icon.lg.size');
    }

    .p-message-lg .p-message-close-icon {
        font-size: dt('message.close.icon.lg.size');
        width: dt('message.close.icon.lg.size');
        height: dt('message.close.icon.lg.size');
    }

    .p-message-outlined {
        background: transparent;
        outline-width: dt('message.outlined.border.width');
    }

    .p-message-simple {
        background: transparent;
        outline-color: transparent;
        box-shadow: none;
    }

    .p-message-simple .p-message-content {
        padding: dt('message.simple.content.padding');
    }

    .p-message-outlined .p-message-close-button:hover,
    .p-message-simple .p-message-close-button:hover {
        background: transparent;
    }

    .p-message-enter-active {
        animation: p-animate-message-enter 0.3s ease-out forwards;
        overflow: hidden;
    }

    .p-message-leave-active {
        animation: p-animate-message-leave 0.15s ease-in forwards;
        overflow: hidden;
    }

    @keyframes p-animate-message-enter {
        from {
            opacity: 0;
            grid-template-rows: 0fr;
        }
        to {
            opacity: 1;
            grid-template-rows: 1fr;
        }
    }

    @keyframes p-animate-message-leave {
        from {
            opacity: 1;
            grid-template-rows: 1fr;
        }
        to {
            opacity: 0;
            margin: 0;
            grid-template-rows: 0fr;
        }
    }
`;var Wl=["container"],Jl=["icon"],Yl=["closeicon"],Zl=["*"],Xl=t=>({closeCallback:t});function ec(t,i){t&1&&W(0)}function tc(t,i){if(t&1&&g(0,ec,1,0,"ng-container",4),t&2){let e=c();s("ngTemplateOutlet",e.iconTemplate||e._iconTemplate)}}function nc(t,i){if(t&1&&_(0,"i",1),t&2){let e=c();y(e.cn(e.cx("icon"),e.icon)),s("pBind",e.ptm("icon")),C("data-p",e.dataP)}}function ic(t,i){t&1&&W(0)}function oc(t,i){if(t&1&&g(0,ic,1,0,"ng-container",5),t&2){let e=c();s("ngTemplateOutlet",e.containerTemplate||e._containerTemplate)("ngTemplateOutletContext",ze(2,Xl,e.closeCallback))}}function ac(t,i){if(t&1&&_(0,"span",9),t&2){let e=c(3);s("pBind",e.ptm("text"))("ngClass",e.cx("text"))("innerHTML",e.text,Ti),C("data-p",e.dataP)}}function rc(t,i){if(t&1&&(d(0,"div"),g(1,ac,1,4,"span",8),p()),t&2){let e=c(2);l(),s("ngIf",!e.escape)}}function sc(t,i){if(t&1&&(d(0,"span",7),M(1),p()),t&2){let e=c(3);s("pBind",e.ptm("text"))("ngClass",e.cx("text")),C("data-p",e.dataP),l(),K(e.text)}}function lc(t,i){if(t&1&&g(0,sc,2,4,"span",10),t&2){let e=c(2);s("ngIf",e.escape&&e.text)}}function cc(t,i){if(t&1&&(g(0,rc,2,1,"div",6)(1,lc,1,1,"ng-template",null,0,se),d(3,"span",7),_e(4),p()),t&2){let e=Ge(2),n=c();s("ngIf",!n.escape)("ngIfElse",e),l(3),s("pBind",n.ptm("text"))("ngClass",n.cx("text")),C("data-p",n.dataP)}}function dc(t,i){if(t&1&&_(0,"i",7),t&2){let e=c(2);y(e.cn(e.cx("closeIcon"),e.closeIcon)),s("pBind",e.ptm("closeIcon"))("ngClass",e.closeIcon),C("data-p",e.dataP)}}function pc(t,i){t&1&&W(0)}function uc(t,i){if(t&1&&g(0,pc,1,0,"ng-container",4),t&2){let e=c(2);s("ngTemplateOutlet",e.closeIconTemplate||e._closeIconTemplate)}}function mc(t,i){if(t&1&&(O(),_(0,"svg",14)),t&2){let e=c(2);y(e.cx("closeIcon")),s("pBind",e.ptm("closeIcon")),C("data-p",e.dataP)}}function fc(t,i){if(t&1){let e=F();d(0,"button",11),f("click",function(o){b(e);let a=c();return v(a.close(o))}),w(1,dc,1,5,"i",12),w(2,uc,1,1,"ng-container"),w(3,mc,1,4,":svg:svg",13),p()}if(t&2){let e=c();y(e.cx("closeButton")),s("pBind",e.ptm("closeButton")),C("aria-label",e.closeAriaLabel)("data-p",e.dataP),l(),T(e.closeIcon?1:-1),l(),T(e.closeIconTemplate||e._closeIconTemplate?2:-1),l(),T(!e.closeIconTemplate&&!e._closeIconTemplate&&!e.closeIcon?3:-1)}}var gc={root:({instance:t})=>["p-message p-component p-message-"+t.severity,t.variant&&"p-message-"+t.variant,{"p-message-sm":t.size==="small","p-message-lg":t.size==="large"}],contentWrapper:"p-message-content-wrapper",content:"p-message-content",icon:"p-message-icon",text:"p-message-text",closeButton:"p-message-close-button",closeIcon:"p-message-close-icon"},Qa=(()=>{class t extends X{name="message";style=Ha;classes=gc;static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275prov=Q({token:t,factory:t.\u0275fac})}return t})();var Ka=new Y("MESSAGE_INSTANCE"),Ga=(()=>{class t extends oe{componentName="Message";_componentStyle=h(Qa);bindDirectiveInstance=h(k,{self:!0});$pcMessage=h(Ka,{optional:!0,skipSelf:!0})??void 0;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}severity="info";text;escape=!0;style;styleClass;closable=!1;icon;closeIcon;life;showTransitionOptions="300ms ease-out";hideTransitionOptions="200ms cubic-bezier(0.86, 0, 0.07, 1)";size;variant;motionOptions=q(void 0);computedMotionOptions=N(()=>Te(Te({},this.ptm("motion")),this.motionOptions()));onClose=new x;get closeAriaLabel(){return this.config.translation.aria?this.config.translation.aria.close:void 0}visible=D(!0);containerTemplate;iconTemplate;closeIconTemplate;templates;_containerTemplate;_iconTemplate;_closeIconTemplate;closeCallback=e=>{this.close(e)};onInit(){this.life&&setTimeout(()=>{this.visible.set(!1)},this.life)}onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"container":this._containerTemplate=e.template;break;case"icon":this._iconTemplate=e.template;break;case"closeicon":this._closeIconTemplate=e.template;break}})}close(e){this.visible.set(!1),this.onClose.emit({originalEvent:e})}get dataP(){return this.cn({outlined:this.variant==="outlined",simple:this.variant==="simple",[this.severity]:this.severity,[this.size]:this.size})}static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["p-message"]],contentQueries:function(n,o,a){if(n&1&&be(a,Wl,4)(a,Jl,4)(a,Yl,4)(a,ie,4),n&2){let r;S(r=I())&&(o.containerTemplate=r.first),S(r=I())&&(o.iconTemplate=r.first),S(r=I())&&(o.closeIconTemplate=r.first),S(r=I())&&(o.templates=r)}},hostAttrs:["role","alert","aria-live","polite"],hostVars:5,hostBindings:function(n,o){n&1&&(Si(function(){return"p-message-enter-active"}),Ii(function(){return"p-message-leave-active"})),n&2&&(C("data-p",o.dataP),y(o.cn(o.cx("root"),o.styleClass)),Ve("p-message-leave-active",!o.visible()))},inputs:{severity:"severity",text:"text",escape:[2,"escape","escape",L],style:"style",styleClass:"styleClass",closable:[2,"closable","closable",L],icon:"icon",closeIcon:"closeIcon",life:"life",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",size:"size",variant:"variant",motionOptions:[1,"motionOptions"]},outputs:{onClose:"onClose"},features:[J([Qa,{provide:Ka,useExisting:t},{provide:ee,useExisting:t}]),Z([k]),V],ngContentSelectors:Zl,decls:7,vars:12,consts:[["escapeOut",""],[3,"pBind"],[3,"pBind","class"],["pRipple","","type","button",3,"pBind","class"],[4,"ngTemplateOutlet"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngIf","ngIfElse"],[3,"pBind","ngClass"],[3,"pBind","ngClass","innerHTML",4,"ngIf"],[3,"pBind","ngClass","innerHTML"],[3,"pBind","ngClass",4,"ngIf"],["pRipple","","type","button",3,"click","pBind"],[3,"pBind","class","ngClass"],["data-p-icon","times",3,"pBind","class"],["data-p-icon","times",3,"pBind"]],template:function(n,o){n&1&&(he(),d(0,"div",1)(1,"div",1),w(2,tc,1,1,"ng-container"),w(3,nc,1,4,"i",2),w(4,oc,1,4,"ng-container")(5,cc,5,5),w(6,fc,4,8,"button",3),p()()),n&2&&(y(o.cx("contentWrapper")),s("pBind",o.ptm("contentWrapper")),C("data-p",o.dataP),l(),y(o.cx("content")),s("pBind",o.ptm("content")),C("data-p",o.dataP),l(),T(o.iconTemplate||o._iconTemplate?2:-1),l(),T(o.icon?3:-1),l(),T(o.containerTemplate||o._containerTemplate?4:5),l(2),T(o.closable?6:-1))},dependencies:[A,Ie,Ce,le,Je,St,j,k,tn],encapsulation:2,changeDetection:0})}return t})();var Wa=`
    .p-progressbar {
        display: block;
        position: relative;
        overflow: hidden;
        height: dt('progressbar.height');
        background: dt('progressbar.background');
        border-radius: dt('progressbar.border.radius');
    }

    .p-progressbar-value {
        margin: 0;
        background: dt('progressbar.value.background');
    }

    .p-progressbar-label {
        color: dt('progressbar.label.color');
        font-size: dt('progressbar.label.font.size');
        font-weight: dt('progressbar.label.font.weight');
    }

    .p-progressbar-determinate .p-progressbar-value {
        height: 100%;
        width: 0%;
        position: absolute;
        display: none;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: width 1s ease-in-out;
    }

    .p-progressbar-determinate .p-progressbar-label {
        display: inline-flex;
    }

    .p-progressbar-indeterminate .p-progressbar-value::before {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .p-progressbar-indeterminate .p-progressbar-value::after {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        animation-delay: 1.15s;
    }

    @keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }

    @keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
`;var hc=["content"],_c=t=>({$implicit:t});function bc(t,i){if(t&1&&(d(0,"div"),M(1),p()),t&2){let e=c(2);ye("display",e.value!=null&&e.value!==0?"flex":"none"),l(),Ut("",e.value,"",e.unit)}}function vc(t,i){t&1&&W(0)}function yc(t,i){if(t&1&&(d(0,"div",2)(1,"div",2),g(2,bc,2,4,"div",3)(3,vc,1,0,"ng-container",4),p()()),t&2){let e=c();y(e.cn(e.cx("value"),e.valueStyleClass)),ye("width",e.value+"%")("display","flex")("background",e.color),s("pBind",e.ptm("value")),C("data-p",e.dataP),l(),y(e.cx("label")),s("pBind",e.ptm("label")),C("data-p",e.dataP),l(),s("ngIf",e.showValue&&!e.contentTemplate&&!e._contentTemplate),l(),s("ngTemplateOutlet",e.contentTemplate||e._contentTemplate)("ngTemplateOutletContext",ze(17,_c,e.value))}}function Cc(t,i){if(t&1&&_(0,"div",2),t&2){let e=c();y(e.cn(e.cx("value"),e.valueStyleClass)),ye("background",e.color),s("pBind",e.ptm("value")),C("data-p",e.dataP)}}var xc={root:({instance:t})=>["p-progressbar p-component",{"p-progressbar-determinate":t.mode=="determinate","p-progressbar-indeterminate":t.mode=="indeterminate"}],value:"p-progressbar-value",label:"p-progressbar-label"},Ja=(()=>{class t extends X{name="progressbar";style=Wa;classes=xc;static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275prov=Q({token:t,factory:t.\u0275fac})}return t})();var Ya=new Y("PROGRESSBAR_INSTANCE"),Za=(()=>{class t extends oe{componentName="ProgressBar";$pcProgressBar=h(Ya,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(k,{self:!0});value;showValue=!0;styleClass;valueStyleClass;unit="%";mode="determinate";color;contentTemplate;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=h(Ja);templates;_contentTemplate;onAfterContentInit(){this.templates?.forEach(e=>{e.getType()==="content"?this._contentTemplate=e.template:this._contentTemplate=e.template})}get dataP(){return this.cn({determinate:this.mode==="determinate",indeterminate:this.mode==="indeterminate"})}static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["p-progressBar"],["p-progressbar"],["p-progress-bar"]],contentQueries:function(n,o,a){if(n&1&&be(a,hc,4)(a,ie,4),n&2){let r;S(r=I())&&(o.contentTemplate=r.first),S(r=I())&&(o.templates=r)}},hostAttrs:["role","progressbar"],hostVars:7,hostBindings:function(n,o){n&2&&(C("aria-valuemin",0)("aria-valuenow",o.value)("aria-valuemax",100)("aria-level",o.value+o.unit)("data-p",o.dataP),y(o.cn(o.cx("root"),o.styleClass)))},inputs:{value:[2,"value","value",ue],showValue:[2,"showValue","showValue",L],styleClass:"styleClass",valueStyleClass:"valueStyleClass",unit:"unit",mode:"mode",color:"color"},features:[J([Ja,{provide:Ya,useExisting:t},{provide:ee,useExisting:t}]),Z([k]),V],decls:2,vars:2,consts:[[3,"class","pBind","width","display","background",4,"ngIf"],[3,"class","pBind","background",4,"ngIf"],[3,"pBind"],[3,"display",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(n,o){n&1&&g(0,yc,4,19,"div",0)(1,Cc,1,6,"div",1),n&2&&(s("ngIf",o.mode==="determinate"),l(),s("ngIf",o.mode==="indeterminate"))},dependencies:[A,Ce,le,j,k],encapsulation:2,changeDetection:0})}return t})();var Xa=`
    .p-fileupload input[type='file'] {
        display: none;
    }

    .p-fileupload-advanced {
        border: 1px solid dt('fileupload.border.color');
        border-radius: dt('fileupload.border.radius');
        background: dt('fileupload.background');
        color: dt('fileupload.color');
    }

    .p-fileupload-header {
        display: flex;
        align-items: center;
        padding: dt('fileupload.header.padding');
        background: dt('fileupload.header.background');
        color: dt('fileupload.header.color');
        border-style: solid;
        border-width: dt('fileupload.header.border.width');
        border-color: dt('fileupload.header.border.color');
        border-radius: dt('fileupload.header.border.radius');
        gap: dt('fileupload.header.gap');
    }

    .p-fileupload-content {
        border: 1px solid transparent;
        display: flex;
        flex-direction: column;
        gap: dt('fileupload.content.gap');
        transition: border-color dt('fileupload.transition.duration');
        padding: dt('fileupload.content.padding');
    }

    .p-fileupload-content .p-progressbar {
        width: 100%;
        height: dt('fileupload.progressbar.height');
    }

    .p-fileupload-file-list {
        display: flex;
        flex-direction: column;
        gap: dt('fileupload.filelist.gap');
    }

    .p-fileupload-file {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: dt('fileupload.file.padding');
        border-block-end: 1px solid dt('fileupload.file.border.color');
        gap: dt('fileupload.file.gap');
    }

    .p-fileupload-file:last-child {
        border-block-end: 0;
    }

    .p-fileupload-file-info {
        display: flex;
        flex-direction: column;
        gap: dt('fileupload.file.info.gap');
    }

    .p-fileupload-file-thumbnail {
        flex-shrink: 0;
    }

    .p-fileupload-file-actions {
        margin-inline-start: auto;
    }

    .p-fileupload-highlight {
        border: 1px dashed dt('fileupload.content.highlight.border.color');
    }

    .p-fileupload-basic .p-message {
        margin-block-end: dt('fileupload.basic.gap');
    }

    .p-fileupload-basic-content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: dt('fileupload.basic.gap');
    }
`;var wc=["pFileContent",""],Tc=(t,i,e)=>({class:t,file:i,index:e}),kc=(t,i)=>(i==null?null:i.name)+"-"+t;function Sc(t,i){}function Ic(t,i){t&1&&g(0,Sc,0,0,"ng-template")}function Mc(t,i){if(t&1&&g(0,Ic,1,0,null,7),t&2){let e=c().class,n=c(),o=n.$implicit,a=n.$index,r=c();s("ngTemplateOutlet",r.fileRemoveIconTemplate())("ngTemplateOutletContext",jt(2,Tc,e,o,a))}}function Ec(t,i){if(t&1&&(O(),_(0,"svg",8)),t&2){let e=c().class;y(e),C("aria-hidden",!0)}}function Bc(t,i){if(t&1&&w(0,Mc,1,6)(1,Ec,1,3,":svg:svg",6),t&2){let e=c(2);T(e.fileRemoveIconTemplate()?0:1)}}function Fc(t,i){if(t&1){let e=F();d(0,"div",2),_(1,"img",3),d(2,"div",2)(3,"div",2),M(4),p(),d(5,"span",2),M(6),p()(),_(7,"p-badge",4),d(8,"div",2)(9,"p-button",5),f("onClick",function(o){let a=b(e).$index,r=c();return v(r.onRemoveClick(o,a))}),g(10,Bc,2,1,"ng-template",null,0,se),p()()()}if(t&2){let e=i.$implicit,n=c();y(n.cx("file")),s("pBind",n.$pcFileUpload.ptm("file")),l(),y(n.cx("fileThumbnail")),s("src",e.objectURL,it)("width",n.previewWidth())("pBind",n.$pcFileUpload.ptm("fileThumbnail")),C("alt",e.name),l(),y(n.cx("fileInfo")),s("pBind",n.$pcFileUpload.ptm("fileInfo")),l(),y(n.cx("fileName")),s("pBind",n.$pcFileUpload.ptm("fileName")),l(),K(e.name),l(),y(n.cx("fileSize")),s("pBind",n.$pcFileUpload.ptm("fileSize")),l(),K(n.formatSize(e.size)),l(),y(n.cx("pcFileBadge")),s("value",n.badgeValue())("severity",n.badgeSeverity())("pt",n.$pcFileUpload.ptm("pcFileBadge"))("unstyled",n.unstyled()),l(),y(n.cx("fileActions")),s("pBind",n.$pcFileUpload.ptm("fileActions")),l(),s("styleClass",n.cx("pcFileRemoveButton"))("pt",n.$pcFileUpload.ptm("pcFileRemoveButton"))("unstyled",n.unstyled())}}var Dc=["file"],Pc=["header"],er=["content"],Rc=["toolbar"],Lc=["chooseicon"],Nc=["filelabel"],Ac=["uploadicon"],Vc=["cancelicon"],Uc=["empty"],zc=["advancedfileinput"],Oc=["basicfileinput"],qc=(t,i,e,n,o)=>({$implicit:t,uploadedFiles:i,chooseCallback:e,clearCallback:n,uploadCallback:o}),jc=(t,i,e,n,o,a,r,u)=>({$implicit:t,uploadedFiles:i,chooseCallback:e,clearCallback:n,removeUploadedFileCallback:o,removeFileCallback:a,progress:r,messages:u}),$c=t=>({$implicit:t});function Hc(t,i){if(t&1&&_(0,"span",8),t&2){let e,n=c(4);y(n.chooseIcon),s("pBind",(e=n.ptm("pcChooseButton"))==null?null:e.icon),C("aria-label",!0)}}function Qc(t,i){if(t&1&&(O(),_(0,"svg",17)),t&2){let e,n=c(5);s("pBind",(e=n.ptm("pcChooseButton"))==null?null:e.icon),C("aria-label",!0)}}function Kc(t,i){}function Gc(t,i){t&1&&g(0,Kc,0,0,"ng-template")}function Wc(t,i){if(t&1&&(d(0,"span",8),g(1,Gc,1,0,null,11),p()),t&2){let e,n=c(5);s("pBind",(e=n.ptm("pcChooseButton"))==null?null:e.icon),C("aria-label",!0),l(),s("ngTemplateOutlet",n.chooseIconTemplate||n._chooseIconTemplate)}}function Jc(t,i){if(t&1&&(fe(0),g(1,Qc,1,2,"svg",15)(2,Wc,2,3,"span",16),ge()),t&2){let e=c(4);l(),s("ngIf",!e.chooseIconTemplate&&!e._chooseIconTemplate),l(),s("ngIf",e.chooseIconTemplate||e._chooseIconTemplate)}}function Yc(t,i){if(t&1&&g(0,Hc,1,4,"span",5)(1,Jc,3,2,"ng-container",9),t&2){let e=c(3);s("ngIf",e.chooseIcon),l(),s("ngIf",!e.chooseIcon)}}function Zc(t,i){if(t&1&&_(0,"span",20),t&2){let e,n=c(5);s("ngClass",n.uploadIcon)("pBind",(e=n.ptm("pcUploadButton"))==null?null:e.icon),C("aria-hidden",!0)}}function Xc(t,i){if(t&1&&(O(),_(0,"svg",22)),t&2){let e,n=c(6);s("pBind",(e=n.ptm("pcUploadButton"))==null?null:e.icon)}}function ed(t,i){}function td(t,i){t&1&&g(0,ed,0,0,"ng-template")}function nd(t,i){if(t&1&&(d(0,"span",8),g(1,td,1,0,null,11),p()),t&2){let e,n=c(6);s("pBind",(e=n.ptm("pcUploadButton"))==null?null:e.icon),C("aria-hidden",!0),l(),s("ngTemplateOutlet",n.uploadIconTemplate||n._uploadIconTemplate)}}function id(t,i){if(t&1&&(fe(0),g(1,Xc,1,1,"svg",21)(2,nd,2,3,"span",16),ge()),t&2){let e=c(5);l(),s("ngIf",!e.uploadIconTemplate&&!e._uploadIconTemplate),l(),s("ngIf",e.uploadIconTemplate||e._uploadIconTemplate)}}function od(t,i){if(t&1&&g(0,Zc,1,3,"span",19)(1,id,3,2,"ng-container",9),t&2){let e=c(4);s("ngIf",e.uploadIcon),l(),s("ngIf",!e.uploadIcon)}}function ad(t,i){if(t&1){let e=F();d(0,"p-button",18),f("onClick",function(){b(e);let o=c(3);return v(o.upload())}),g(1,od,2,2,"ng-template",null,2,se),p()}if(t&2){let e=c(3);s("label",e.uploadButtonLabel)("disabled",!e.hasFiles()||e.isFileLimitExceeded())("styleClass",e.cn(e.cx("pcUploadButton"),e.uploadStyleClass))("buttonProps",e.uploadButtonProps)("pt",e.ptm("pcUploadButton"))("unstyled",e.unstyled())}}function rd(t,i){if(t&1&&_(0,"span",24),t&2){let e=c(5);s("ngClass",e.cancelIcon)}}function sd(t,i){t&1&&(O(),_(0,"svg",26)),t&2&&C("aria-hidden",!0)}function ld(t,i){}function cd(t,i){t&1&&g(0,ld,0,0,"ng-template")}function dd(t,i){if(t&1&&(d(0,"span"),g(1,cd,1,0,null,11),p()),t&2){let e=c(6);C("aria-hidden",!0),l(),s("ngTemplateOutlet",e.cancelIconTemplate||e._cancelIconTemplate)}}function pd(t,i){if(t&1&&(fe(0),g(1,sd,1,1,"svg",25)(2,dd,2,2,"span",9),ge()),t&2){let e=c(5);l(),s("ngIf",!e.cancelIconTemplate&&!e._cancelIconTemplate),l(),s("ngIf",e.cancelIconTemplate||e._cancelIconTemplate)}}function ud(t,i){if(t&1&&g(0,rd,1,1,"span",23)(1,pd,3,2,"ng-container",9),t&2){let e=c(4);s("ngIf",e.cancelIcon),l(),s("ngIf",!e.cancelIcon)}}function md(t,i){if(t&1){let e=F();d(0,"p-button",18),f("onClick",function(){b(e);let o=c(3);return v(o.clear())}),g(1,ud,2,2,"ng-template",null,2,se),p()}if(t&2){let e=c(3);s("label",e.cancelButtonLabel)("disabled",!e.hasFiles()||e.uploading)("styleClass",e.cn(e.cx("pcCancelButton"),e.cancelStyleClass))("buttonProps",e.cancelButtonProps)("pt",e.ptm("pcCancelButton"))("unstyled",e.unstyled())}}function fd(t,i){if(t&1){let e=F();fe(0),d(1,"p-button",13),f("focus",function(){b(e);let o=c(2);return v(o.onFocus())})("blur",function(){b(e);let o=c(2);return v(o.onBlur())})("onClick",function(){b(e);let o=c(2);return v(o.choose())})("keydown.enter",function(){b(e);let o=c(2);return v(o.choose())}),d(2,"input",7,0),f("change",function(o){b(e);let a=c(2);return v(a.onFileSelect(o))}),p(),g(4,Yc,2,2,"ng-template",null,2,se),p(),g(6,ad,3,6,"p-button",14)(7,md,3,6,"p-button",14),ge()}if(t&2){let e=c(2);l(),s("styleClass",e.cn(e.cx("pcChooseButton"),e.chooseStyleClass))("disabled",e.disabled||e.isChooseDisabled())("label",e.chooseButtonLabel)("buttonProps",e.chooseButtonProps)("pt",e.ptm("pcChooseButton"))("unstyled",e.unstyled()),l(),s("multiple",e.multiple)("accept",e.accept)("disabled",e.disabled||e.isChooseDisabled())("pBind",e.ptm("input")),C("aria-label",e.browseFilesLabel)("title",""),l(4),s("ngIf",!e.auto&&e.showUploadButton),l(),s("ngIf",!e.auto&&e.showCancelButton)}}function gd(t,i){t&1&&W(0)}function hd(t,i){t&1&&W(0)}function _d(t,i){t&1&&W(0)}function bd(t,i){if(t&1&&g(0,_d,1,0,"ng-container",10),t&2){let e=c(2);s("ngTemplateOutlet",e.contentTemplate||e._contentTemplate)("ngTemplateOutletContext",Fi(2,jc,e.files,e.uploadedFiles,e.choose.bind(e),e.clear.bind(e),e.removeUploadedFile.bind(e),e.remove.bind(e),e.progress,e.msgs))}}function vd(t,i){if(t&1&&_(0,"p-progressbar",30),t&2){let e=c(3);s("value",e.progress)("showValue",!1)("pt",e.ptm("pcProgressBar"))}}function yd(t,i){if(t&1&&_(0,"p-message",28),t&2){let e=i.$implicit,n=c(3);s("severity",e.severity)("text",e.text)("pt",n.ptm("pcMessage"))("unstyled",n.unstyled())}}function Cd(t,i){}function xd(t,i){if(t&1){let e=F();d(0,"div",33),f("onRemove",function(o){b(e);let a=c(4);return v(a.onRemoveClick(o))}),p()}if(t&2){let e=c(4);s("unstyled",e.unstyled())("files",e.files)("badgeValue",e.pendingLabel)("previewWidth",e.previewWidth)("fileRemoveIconTemplate",e.cancelIconTemplate||e._cancelIconTemplate)}}function wd(t,i){if(t&1&&(d(0,"div",8),g(1,Cd,0,0,"ng-template",31),w(2,xd,1,5,"div",32),p()),t&2){let e=c(3);y(e.cx("fileList")),s("pBind",e.ptm("fileList")),l(),s("ngForOf",e.files)("ngForTemplate",e.fileTemplate||e._fileTemplate),l(),T(!e.fileTemplate&&!e._fileTemplate?2:-1)}}function Td(t,i){}function kd(t,i){if(t&1){let e=F();d(0,"div",35),f("onRemove",function(o){b(e);let a=c(4);return v(a.onRemoveUploadedFileClick(o))}),p()}if(t&2){let e=c(4);s("unstyled",e.unstyled())("files",e.uploadedFiles)("badgeValue",e.completedLabel())("previewWidth",e.previewWidth)("fileRemoveIconTemplate",e.cancelIconTemplate||e._cancelIconTemplate)}}function Sd(t,i){if(t&1&&(d(0,"div",8),g(1,Td,0,0,"ng-template",31),w(2,kd,1,5,"div",34),p()),t&2){let e=c(3);y(e.cx("fileList")),s("pBind",e.ptm("fileList")),l(),s("ngForOf",e.uploadedFiles)("ngForTemplate",e.fileTemplate||e._fileTemplate),l(),T(!e.fileTemplate&&!e._fileTemplate?2:-1)}}function Id(t,i){if(t&1&&(g(0,vd,1,3,"p-progressbar",27),ae(1,yd,1,4,"p-message",28,Ke),w(3,wd,3,6,"div",29),w(4,Sd,3,6,"div",29)),t&2){let e=c(2);s("ngIf",e.hasFiles()),l(),re(e.msgs),l(2),T(e.hasFiles()?3:-1),l(),T(e.hasUploadedFiles()?4:-1)}}function Md(t,i){if(t&1&&W(0,8),t&2){let e=c(3);s("pBind",e.ptm("empty"))}}function Ed(t,i){if(t&1&&g(0,Md,1,1,"ng-container",36),t&2){let e=c(2);s("ngTemplateOutlet",e.emptyTemplate||e._emptyTemplate)}}function Bd(t,i){if(t&1){let e=F();d(0,"div",6)(1,"input",7,0),f("change",function(o){b(e);let a=c();return v(a.onFileSelect(o))}),p(),d(3,"div",8),g(4,fd,8,14,"ng-container",9)(5,gd,1,0,"ng-container",10)(6,hd,1,0,"ng-container",11),p(),d(7,"div",12,1),f("dragenter",function(o){b(e);let a=c();return v(a.onDragEnter(o))})("dragleave",function(o){b(e);let a=c();return v(a.onDragLeave(o))})("drop",function(o){b(e);let a=c();return v(a.onDrop(o))}),w(9,bd,1,11,"ng-container")(10,Id,5,3),w(11,Ed,1,1,"ng-container",8),p()()}if(t&2){let e=c();y(e.cn(e.cx("root"),e.styleClass)),s("ngStyle",e.style)("pBind",e.ptm("root")),l(),s("multiple",e.multiple)("accept",e.accept)("disabled",e.disabled||e.isChooseDisabled())("pBind",e.ptm("input")),C("aria-label",e.browseFilesLabel)("title",""),l(2),y(e.cx("header")),s("pBind",e.ptm("header")),l(),s("ngIf",!e.headerTemplate&&!e._headerTemplate),l(),s("ngTemplateOutlet",e.headerTemplate||e._headerTemplate)("ngTemplateOutletContext",Bi(22,qc,e.files,e.uploadedFiles,e.choose.bind(e),e.clear.bind(e),e.upload.bind(e))),l(),s("ngTemplateOutlet",e.toolbarTemplate||e._toolbarTemplate),l(),y(e.cx("content")),s("pBind",e.ptm("content")),l(2),T(e.contentTemplate||e._contentTemplate?9:10),l(2),T((e.emptyTemplate||e._emptyTemplate)&&!e.hasFiles()&&!e.hasUploadedFiles()?11:-1)}}function Fd(t,i){if(t&1&&_(0,"p-message",28),t&2){let e=i.$implicit,n=c(2);s("severity",e.severity)("text",e.text)("pt",n.ptm("pcMessage"))("unstyled",n.unstyled())}}function Dd(t,i){if(t&1&&_(0,"span",40),t&2){let e,n=c(4);s("ngClass",n.uploadIcon)("pBind",(e=n.ptm("pcChooseButton"))==null?null:e.icon)}}function Pd(t,i){if(t&1&&(O(),_(0,"svg",22)),t&2){let e,n=c(5);y("p-button-icon p-button-icon-left"),s("pBind",(e=n.ptm("pcChooseButton"))==null?null:e.icon)}}function Rd(t,i){}function Ld(t,i){t&1&&g(0,Rd,0,0,"ng-template")}function Nd(t,i){if(t&1&&(d(0,"span",43),g(1,Ld,1,0,null,11),p()),t&2){let e,n=c(5);s("pBind",(e=n.ptm("pcChooseButton"))==null?null:e.icon),l(),s("ngTemplateOutlet",n._uploadIconTemplate||n.uploadIconTemplate)}}function Ad(t,i){if(t&1&&(fe(0),g(1,Pd,1,3,"svg",41)(2,Nd,2,2,"span",42),ge()),t&2){let e=c(4);l(),s("ngIf",!e.uploadIconTemplate&&!e._uploadIconTemplate),l(),s("ngIf",e._uploadIconTemplate||e.uploadIconTemplate)}}function Vd(t,i){if(t&1&&g(0,Dd,1,2,"span",39)(1,Ad,3,2,"ng-container",9),t&2){let e=c(3);s("ngIf",e.uploadIcon),l(),s("ngIf",!e.uploadIcon)}}function Ud(t,i){if(t&1&&_(0,"span",45),t&2){let e,n=c(4);s("ngClass",n.chooseIcon)("pBind",(e=n.ptm("pcChooseButton"))==null?null:e.icon)}}function zd(t,i){if(t&1&&(O(),_(0,"svg",17)),t&2){let e,n=c(5);s("pBind",(e=n.ptm("pcChooseButton"))==null?null:e.icon)}}function Od(t,i){}function qd(t,i){t&1&&g(0,Od,0,0,"ng-template")}function jd(t,i){if(t&1&&(fe(0),g(1,zd,1,1,"svg",15)(2,qd,1,0,null,11),ge()),t&2){let e=c(4);l(),s("ngIf",!e.chooseIconTemplate&&!e._chooseIconTemplate),l(),s("ngTemplateOutlet",e.chooseIconTemplate||e._chooseIconTemplate)}}function $d(t,i){if(t&1&&g(0,Ud,1,2,"span",44)(1,jd,3,2,"ng-container",9),t&2){let e=c(3);s("ngIf",e.chooseIcon),l(),s("ngIf",!e.chooseIcon)}}function Hd(t,i){if(t&1&&w(0,Vd,2,2)(1,$d,2,2),t&2){let e=c(2);T(e.hasFiles()&&!e.auto?0:1)}}function Qd(t,i){if(t&1&&(d(0,"span"),M(1),p()),t&2){let e=c(3);l(),Se(" ",e.basicFileChosenLabel()," ")}}function Kd(t,i){t&1&&W(0)}function Gd(t,i){if(t&1&&g(0,Kd,1,0,"ng-container",10),t&2){let e=c(3);s("ngTemplateOutlet",e.fileLabelTemplate||e._fileLabelTemplate)("ngTemplateOutletContext",ze(2,$c,e.files))}}function Wd(t,i){if(t&1&&w(0,Qd,2,1,"span")(1,Gd,1,4,"ng-container"),t&2){let e=c(2);T(!e.fileLabelTemplate&&!e._fileLabelTemplate?0:1)}}function Jd(t,i){if(t&1){let e=F();d(0,"div",8),ae(1,Fd,1,4,"p-message",28,Ke),d(3,"div",8)(4,"p-button",37),f("onClick",function(){b(e);let o=c();return v(o.onBasicUploaderClick())})("keydown",function(o){b(e);let a=c();return v(a.onBasicKeydown(o))}),g(5,Hd,2,1,"ng-template",null,2,se),d(7,"input",38,3),f("change",function(o){b(e);let a=c();return v(a.onFileSelect(o))})("focus",function(){b(e);let o=c();return v(o.onFocus())})("blur",function(){b(e);let o=c();return v(o.onBlur())}),p()(),w(9,Wd,2,1),p()()}if(t&2){let e=c();y(e.cn(e.cx("root"),e.styleClass)),s("pBind",e.ptm("root")),l(),re(e.msgs),l(2),y(e.cx("basicContent")),s("pBind",e.ptm("basicContent")),l(),Ue(e.style),s("styleClass",e.cn(e.cx("pcChooseButton"),e.chooseStyleClass))("disabled",e.disabled)("label",e.chooseButtonLabel)("buttonProps",e.chooseButtonProps)("pt",e.ptm("pcChooseButton"))("unstyled",e.unstyled()),l(3),s("accept",e.accept)("multiple",e.multiple)("disabled",e.disabled)("pBind",e.ptm("input")),C("aria-label",e.browseFilesLabel),l(2),T(e.auto?-1:9)}}var Yd={root:({instance:t})=>`p-fileupload p-fileupload-${t.mode} p-component`,header:"p-fileupload-header",pcChooseButton:"p-fileupload-choose-button",pcUploadButton:"p-fileupload-upload-button",pcCancelButton:"p-fileupload-cancel-button",content:"p-fileupload-content",fileList:"p-fileupload-file-list",file:"p-fileupload-file",fileThumbnail:"p-fileupload-file-thumbnail",fileInfo:"p-fileupload-file-info",fileName:"p-fileupload-file-name",fileSize:"p-fileupload-file-size",pcFileBadge:"p-fileupload-file-badge",fileActions:"p-fileupload-file-actions",pcFileRemoveButton:"p-fileupload-file-remove-button",basicContent:"p-fileupload-basic-content"},In=(()=>{class t extends X{name="fileupload";style=Xa;classes=Yd;static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275prov=Q({token:t,factory:t.\u0275fac})}return t})();var tr=new Y("FILEUPLOAD_INSTANCE"),Zd=(()=>{class t extends oe{_componentStyle=h(In);$pcFileUpload=h(tr);onRemove=Di();files=q();badgeSeverity=q("warn");badgeValue=q();previewWidth=q(50);fileRemoveIconTemplate=q();onRemoveClick(e,n){this.onRemove.emit({event:e,index:n})}formatSize(e){let a=this.config.getTranslation(Re.FILE_SIZE_TYPES);if(e===0)return`0 ${a[0]}`;let r=Math.floor(Math.log(e)/Math.log(1024));return`${(e/Math.pow(1024,r)).toFixed(3)} ${a[r]}`}static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["","pFileContent",""]],inputs:{files:[1,"files"],badgeSeverity:[1,"badgeSeverity"],badgeValue:[1,"badgeValue"],previewWidth:[1,"previewWidth"],fileRemoveIconTemplate:[1,"fileRemoveIconTemplate"]},outputs:{onRemove:"onRemove"},features:[J([In]),V],attrs:wc,decls:2,vars:0,consts:[["icon",""],[3,"class","pBind"],[3,"pBind"],["role","presentation",3,"src","width","pBind"],[3,"value","severity","pt","unstyled"],["text","","rounded","","severity","danger",3,"onClick","styleClass","pt","unstyled"],["data-p-icon","times",3,"class"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","times"]],template:function(n,o){n&1&&ae(0,Fc,12,32,"div",1,kc),n&2&&re(o.files())},dependencies:[A,le,Ki,me,Je,k],encapsulation:2,changeDetection:0})}return t})(),mi=(()=>{class t extends oe{componentName="FileUpload";bindDirectiveInstance=h(k,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}name;url;method="post";multiple;accept;disabled;auto;withCredentials;maxFileSize;invalidFileSizeMessageSummary="{0}: Invalid file size, ";invalidFileSizeMessageDetail="maximum upload size is {0}.";invalidFileTypeMessageSummary="{0}: Invalid file type, ";invalidFileTypeMessageDetail="allowed file types: {0}.";invalidFileLimitMessageDetail="limit is {0} at most.";invalidFileLimitMessageSummary="Maximum number of files exceeded, ";style;styleClass;previewWidth=50;chooseLabel;uploadLabel;cancelLabel;chooseIcon;uploadIcon;cancelIcon;showUploadButton=!0;showCancelButton=!0;mode="advanced";headers;customUpload;fileLimit;uploadStyleClass;cancelStyleClass;removeStyleClass;chooseStyleClass;chooseButtonProps;uploadButtonProps={severity:"secondary"};cancelButtonProps={severity:"secondary"};onBeforeUpload=new x;onSend=new x;onUpload=new x;onError=new x;onClear=new x;onRemove=new x;onSelect=new x;onProgress=new x;uploadHandler=new x;onImageError=new x;onRemoveUploadedFile=new x;fileTemplate;headerTemplate;contentTemplate;toolbarTemplate;chooseIconTemplate;fileLabelTemplate;uploadIconTemplate;cancelIconTemplate;emptyTemplate;advancedFileInput;basicFileInput;content;set files(e){this._files=[];for(let n=0;n<e.length;n++){let o=e[n];this.validate(o)&&(this.isImage(o)&&(o.objectURL=this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(e[n]))),this._files.push(e[n]))}}get files(){return this._files}get basicButtonLabel(){return this.auto||!this.hasFiles()?this.chooseLabel:this.uploadLabel??this.files[0].name}_files=[];progress=0;dragHighlight;msgs;uploadedFileCount=0;focus;uploading;duplicateIEEvent;translationSubscription;dragOverListener;uploadedFiles=[];sanitizer=h(Gt);zone=h(yi);http=h(Ni);_componentStyle=h(In);onInit(){this.translationSubscription=this.config.translationObserver.subscribe(()=>{this.cd.markForCheck()})}onAfterViewInit(){We(this.platformId)&&this.mode==="advanced"&&this.zone.runOutsideAngular(()=>{this.content&&(this.dragOverListener=this.renderer.listen(this.content.nativeElement,"dragover",this.onDragOver.bind(this)))})}_headerTemplate;_contentTemplate;_toolbarTemplate;_chooseIconTemplate;_uploadIconTemplate;_cancelIconTemplate;_emptyTemplate;_fileTemplate;_fileLabelTemplate;templates;onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"header":this._headerTemplate=e.template;break;case"file":this._fileTemplate=e.template;break;case"content":this._contentTemplate=e.template;break;case"toolbar":this._toolbarTemplate=e.template;break;case"chooseicon":this._chooseIconTemplate=e.template;break;case"uploadicon":this._uploadIconTemplate=e.template;break;case"cancelicon":this._cancelIconTemplate=e.template;break;case"empty":this._emptyTemplate=e.template;break;case"filelabel":this._fileLabelTemplate=e.template;break;default:this._fileTemplate=e.template;break}})}basicFileChosenLabel(){return this.auto?this.chooseButtonLabel:this.hasFiles()?this.files&&this.files.length===1?this.files[0].name:this.config.getTranslation("fileChosenMessage")?.replace("{0}",this.files.length):this.config.getTranslation("noFileChosenMessage")||""}completedLabel(){return this.config.getTranslation("completed")||""}getTranslation(e){return this.config.getTranslation(e)}choose(){this.advancedFileInput?.nativeElement.click()}onFileSelect(e){if(e.type!=="drop"&&this.isIE11()&&this.duplicateIEEvent){this.duplicateIEEvent=!1;return}this.multiple||(this.files=[]),this.msgs=[],this.files=this.files||[];let n=e.dataTransfer?e.dataTransfer.files:e.target.files;for(let o=0;o<n.length;o++){let a=n[o];this.isFileSelected(a)||this.validate(a)&&(this.isImage(a)&&(a.objectURL=this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(n[o]))),this.files.push(n[o]))}this.onSelect.emit({originalEvent:e,files:n,currentFiles:this.files}),this.checkFileLimit(n),this.hasFiles()&&this.auto&&(this.mode!=="advanced"||!this.isFileLimitExceeded())&&this.upload(),e.type!=="drop"&&this.isIE11()?this.clearIEInput():this.clearInputElement()}isFileSelected(e){for(let n of this.files)if(n.name+n.type+n.size===e.name+e.type+e.size)return!0;return!1}isIE11(){if(We(this.platformId))return!!this.document.defaultView.MSInputMethodContext&&!!this.document.documentMode}validate(e){if(this.msgs=this.msgs||[],this.accept&&!this.isFileTypeValid(e)){let n=`${this.invalidFileTypeMessageSummary.replace("{0}",e.name)} ${this.invalidFileTypeMessageDetail.replace("{0}",this.accept)}`;return this.msgs.push({severity:"error",text:n}),!1}if(this.maxFileSize&&e.size>this.maxFileSize){let n=`${this.invalidFileSizeMessageSummary.replace("{0}",e.name)} ${this.invalidFileSizeMessageDetail.replace("{0}",this.formatSize(this.maxFileSize))}`;return this.msgs.push({severity:"error",text:n}),!1}return!0}isFileTypeValid(e){let n=this.accept?.split(",").map(o=>o.trim());for(let o of n)if(this.isWildcard(o)?this.getTypeClass(e.type)===this.getTypeClass(o):e.type==o||this.getFileExtension(e).toLowerCase()===o.toLowerCase())return!0;return!1}getTypeClass(e){return e.substring(0,e.indexOf("/"))}isWildcard(e){return e.indexOf("*")!==-1}getFileExtension(e){return"."+e.name.split(".").pop()}isImage(e){return/^image\//.test(e.type)}onImageLoad(e){window.URL.revokeObjectURL(e.src)}uploader(){if(this.customUpload)this.fileLimit&&(this.uploadedFileCount+=this.files.length),this.uploadHandler.emit({files:this.files}),this.cd.markForCheck();else{this.uploading=!0,this.msgs=[];let e=new FormData;this.onBeforeUpload.emit({formData:e});for(let n=0;n<this.files.length;n++)e.append(this.name,this.files[n],this.files[n].name);this.http.request(this.method,this.url,{body:e,headers:this.headers,reportProgress:!0,observe:"events",withCredentials:this.withCredentials}).subscribe(n=>{switch(n.type){case Kt.Sent:this.onSend.emit({originalEvent:n,formData:e});break;case Kt.Response:this.uploading=!1,this.progress=0,n.status>=200&&n.status<300?(this.fileLimit&&(this.uploadedFileCount+=this.files.length),this.onUpload.emit({originalEvent:n,files:this.files})):this.onError.emit({files:this.files}),this.uploadedFiles=[...this.uploadedFiles,...this.files],this.clear();break;case Kt.UploadProgress:{n.loaded&&(this.progress=Math.round(n.loaded*100/n.total)),this.onProgress.emit({originalEvent:n,progress:this.progress});break}}this.cd.markForCheck()},n=>{this.uploading=!1,this.onError.emit({files:this.files,error:n})})}}onRemoveClick(e){let{event:n,index:o}=e;this.hasFiles()&&this.remove(n,o)}onRemoveUploadedFileClick(e){let{index:n}=e;this.hasUploadedFiles()&&this.removeUploadedFile(n)}clear(){this.files=[],this.onClear.emit(),this.clearInputElement(),this.msgs=[],this.cd.markForCheck()}remove(e,n){this.clearInputElement(),this.onRemove.emit({originalEvent:e,file:this.files[n]}),this.files.splice(n,1),this.checkFileLimit(this.files)}removeUploadedFile(e){let n=this.uploadedFiles.splice(e,1)[0];this.uploadedFiles=[...this.uploadedFiles],this.onRemoveUploadedFile.emit({file:n,files:this.uploadedFiles})}isFileLimitExceeded(){let n=this.auto?this.files.length:this.files.length+this.uploadedFileCount;return this.fileLimit&&this.fileLimit<=n&&this.focus&&(this.focus=!1),this.fileLimit&&this.fileLimit<n}isChooseDisabled(){return this.auto?this.fileLimit&&this.fileLimit<=this.files.length:this.fileLimit&&this.fileLimit<=this.files.length+this.uploadedFileCount}checkFileLimit(e){this.msgs??=[];let n=this.msgs.length>0&&this.fileLimit&&this.fileLimit<e.length;if(this.isFileLimitExceeded()||n){let o=`${this.invalidFileLimitMessageSummary.replace("{0}",this.fileLimit.toString())} ${this.invalidFileLimitMessageDetail.replace("{0}",this.fileLimit.toString())}`;this.msgs.push({severity:"error",text:o})}else this.msgs=this.msgs.filter(o=>!o.text.includes(this.invalidFileLimitMessageSummary))}clearInputElement(){this.advancedFileInput&&this.advancedFileInput.nativeElement&&(this.advancedFileInput.nativeElement.value=""),this.basicFileInput&&this.basicFileInput.nativeElement&&(this.basicFileInput.nativeElement.value="")}clearIEInput(){this.advancedFileInput&&this.advancedFileInput.nativeElement&&(this.duplicateIEEvent=!0,this.advancedFileInput.nativeElement.value="")}hasFiles(){return this.files&&this.files.length>0}hasUploadedFiles(){return this.uploadedFiles&&this.uploadedFiles.length>0}onDragEnter(e){this.disabled||(e.stopPropagation(),e.preventDefault())}onDragOver(e){this.disabled||(!this.$unstyled()&&Ct(this.content?.nativeElement,"p-fileupload-highlight"),this.content?.nativeElement.setAttribute("data-p-highlight",!0),this.dragHighlight=!0,e.stopPropagation(),e.preventDefault())}onDragLeave(e){this.disabled||(!this.$unstyled()&&xt(this.content?.nativeElement,"p-fileupload-highlight"),this.content?.nativeElement.setAttribute("data-p-highlight",!1))}onDrop(e){if(!this.disabled){!this.$unstyled()&&xt(this.content?.nativeElement,"p-fileupload-highlight"),this.content?.nativeElement.setAttribute("data-p-highlight",!1),e.stopPropagation(),e.preventDefault();let n=e.dataTransfer?e.dataTransfer.files:e.target.files;(this.multiple||n&&n.length===1)&&this.onFileSelect(e)}}onFocus(){this.focus=!0}onBlur(){this.focus=!1}formatSize(e){let a=this.getTranslation(Re.FILE_SIZE_TYPES);if(e===0)return`0 ${a[0]}`;let r=Math.floor(Math.log(e)/Math.log(1024));return`${(e/Math.pow(1024,r)).toFixed(3)} ${a[r]}`}upload(){this.hasFiles()&&this.uploader()}onBasicUploaderClick(){this.basicFileInput?.nativeElement.click()}onBasicKeydown(e){switch(e.code){case"Space":case"Enter":this.onBasicUploaderClick(),e.preventDefault();break}}imageError(e){this.onImageError.emit(e)}getBlockableElement(){return this.el.nativeElement.children[0]}get chooseButtonLabel(){return this.chooseLabel||this.config.getTranslation(Re.CHOOSE)}get uploadButtonLabel(){return this.uploadLabel||this.config.getTranslation(Re.UPLOAD)}get cancelButtonLabel(){return this.cancelLabel||this.config.getTranslation(Re.CANCEL)}get browseFilesLabel(){return this.config.getTranslation(Re.ARIA)[Re.BROWSE_FILES]}get pendingLabel(){return this.config.getTranslation(Re.PENDING)}onDestroy(){this.content&&this.content.nativeElement&&this.dragOverListener&&(this.dragOverListener(),this.dragOverListener=null),this.translationSubscription&&this.translationSubscription.unsubscribe()}static \u0275fac=(()=>{let e;return function(o){return(e||(e=B(t)))(o||t)}})();static \u0275cmp=E({type:t,selectors:[["p-fileupload"],["p-fileUpload"]],contentQueries:function(n,o,a){if(n&1&&be(a,Dc,4)(a,Pc,4)(a,er,4)(a,Rc,4)(a,Lc,4)(a,Nc,4)(a,Ac,4)(a,Vc,4)(a,Uc,4)(a,ie,4),n&2){let r;S(r=I())&&(o.fileTemplate=r.first),S(r=I())&&(o.headerTemplate=r.first),S(r=I())&&(o.contentTemplate=r.first),S(r=I())&&(o.toolbarTemplate=r.first),S(r=I())&&(o.chooseIconTemplate=r.first),S(r=I())&&(o.fileLabelTemplate=r.first),S(r=I())&&(o.uploadIconTemplate=r.first),S(r=I())&&(o.cancelIconTemplate=r.first),S(r=I())&&(o.emptyTemplate=r.first),S(r=I())&&(o.templates=r)}},viewQuery:function(n,o){if(n&1&&ve(zc,5)(Oc,5)(er,5),n&2){let a;S(a=I())&&(o.advancedFileInput=a.first),S(a=I())&&(o.basicFileInput=a.first),S(a=I())&&(o.content=a.first)}},inputs:{name:"name",url:"url",method:"method",multiple:[2,"multiple","multiple",L],accept:"accept",disabled:[2,"disabled","disabled",L],auto:[2,"auto","auto",L],withCredentials:[2,"withCredentials","withCredentials",L],maxFileSize:[2,"maxFileSize","maxFileSize",ue],invalidFileSizeMessageSummary:"invalidFileSizeMessageSummary",invalidFileSizeMessageDetail:"invalidFileSizeMessageDetail",invalidFileTypeMessageSummary:"invalidFileTypeMessageSummary",invalidFileTypeMessageDetail:"invalidFileTypeMessageDetail",invalidFileLimitMessageDetail:"invalidFileLimitMessageDetail",invalidFileLimitMessageSummary:"invalidFileLimitMessageSummary",style:"style",styleClass:"styleClass",previewWidth:[2,"previewWidth","previewWidth",ue],chooseLabel:"chooseLabel",uploadLabel:"uploadLabel",cancelLabel:"cancelLabel",chooseIcon:"chooseIcon",uploadIcon:"uploadIcon",cancelIcon:"cancelIcon",showUploadButton:[2,"showUploadButton","showUploadButton",L],showCancelButton:[2,"showCancelButton","showCancelButton",L],mode:"mode",headers:"headers",customUpload:[2,"customUpload","customUpload",L],fileLimit:[2,"fileLimit","fileLimit",e=>ue(e,void 0)],uploadStyleClass:"uploadStyleClass",cancelStyleClass:"cancelStyleClass",removeStyleClass:"removeStyleClass",chooseStyleClass:"chooseStyleClass",chooseButtonProps:"chooseButtonProps",uploadButtonProps:"uploadButtonProps",cancelButtonProps:"cancelButtonProps",files:"files"},outputs:{onBeforeUpload:"onBeforeUpload",onSend:"onSend",onUpload:"onUpload",onError:"onError",onClear:"onClear",onRemove:"onRemove",onSelect:"onSelect",onProgress:"onProgress",uploadHandler:"uploadHandler",onImageError:"onImageError",onRemoveUploadedFile:"onRemoveUploadedFile"},features:[J([In,{provide:tr,useExisting:t},{provide:ee,useExisting:t}]),Z([k]),V],decls:2,vars:2,consts:[["advancedfileinput",""],["content",""],["icon",""],["basicfileinput",""],[3,"class","ngStyle","pBind",4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"ngStyle","pBind"],["type","file",3,"change","multiple","accept","disabled","pBind"],[3,"pBind"],[4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngTemplateOutlet"],[3,"dragenter","dragleave","drop","pBind"],[3,"focus","blur","onClick","keydown.enter","styleClass","disabled","label","buttonProps","pt","unstyled"],[3,"label","disabled","styleClass","buttonProps","pt","unstyled","onClick",4,"ngIf"],["data-p-icon","plus",3,"pBind",4,"ngIf"],[3,"pBind",4,"ngIf"],["data-p-icon","plus",3,"pBind"],[3,"onClick","label","disabled","styleClass","buttonProps","pt","unstyled"],[3,"ngClass","pBind",4,"ngIf"],[3,"ngClass","pBind"],["data-p-icon","upload",3,"pBind",4,"ngIf"],["data-p-icon","upload",3,"pBind"],[3,"ngClass",4,"ngIf"],[3,"ngClass"],["data-p-icon","times",4,"ngIf"],["data-p-icon","times"],[3,"value","showValue","pt",4,"ngIf"],[3,"severity","text","pt","unstyled"],[3,"class","pBind"],[3,"value","showValue","pt"],["ngFor","",3,"ngForOf","ngForTemplate"],["pFileContent","",3,"unstyled","files","badgeValue","previewWidth","fileRemoveIconTemplate"],["pFileContent","",3,"onRemove","unstyled","files","badgeValue","previewWidth","fileRemoveIconTemplate"],["pFileContent","","badgeSeverity","success",3,"unstyled","files","badgeValue","previewWidth","fileRemoveIconTemplate"],["pFileContent","","badgeSeverity","success",3,"onRemove","unstyled","files","badgeValue","previewWidth","fileRemoveIconTemplate"],[3,"pBind",4,"ngTemplateOutlet"],[3,"onClick","keydown","styleClass","disabled","label","buttonProps","pt","unstyled"],["type","file",3,"change","focus","blur","accept","multiple","disabled","pBind"],["class","p-button-icon p-button-icon-left",3,"ngClass","pBind",4,"ngIf"],[1,"p-button-icon","p-button-icon-left",3,"ngClass","pBind"],["data-p-icon","upload",3,"class","pBind",4,"ngIf"],["class","p-button-icon p-button-icon-left",3,"pBind",4,"ngIf"],[1,"p-button-icon","p-button-icon-left",3,"pBind"],["class","p-button-icon p-button-icon-left pi",3,"ngClass","pBind",4,"ngIf"],[1,"p-button-icon","p-button-icon-left","pi",3,"ngClass","pBind"]],template:function(n,o){n&1&&g(0,Bd,12,28,"div",4)(1,Jd,10,20,"div",5),n&2&&(s("ngIf",o.mode==="advanced"),l(),s("ngIf",o.mode==="basic"))},dependencies:[A,Ie,Ri,Ce,le,Li,me,Za,Ga,po,uo,Je,j,Zd,k],encapsulation:2,changeDetection:0})}return t})(),nr=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=de({type:t});static \u0275inj=ce({imports:[mi,j,j]})}return t})();var Mn=class t{fileSelected=new x;onFileSelect(i){let e=i.files?.[0]||i.target?.files?.[0];e&&this.fileSelected.emit(e)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-file-upload"]],outputs:{fileSelected:"fileSelected"},decls:1,vars:2,consts:[["mode","basic","chooseLabel","Share File",3,"onSelect","auto","accept"]],template:function(e,n){e&1&&(d(0,"p-fileUpload",0),f("onSelect",function(a){return n.onFileSelect(a)}),p()),e&2&&s("auto",!1)("accept","*")},dependencies:[nr,mi],encapsulation:2,changeDetection:0})};var tp=(t,i)=>i.id;function np(t,i){if(t&1){let e=F();d(0,"button",19),f("click",function(){let o=b(e),a=c(3);return v(a.onDownloadFile(o))}),M(1," Download "),p()}}function ip(t,i){if(t&1&&(d(0,"div",16)(1,"span"),_(2,"i",17),M(3),p(),w(4,np,2,0,"button",18),p()),t&2){let e,n=c().$implicit,o=c();l(3),Se(" ",n.content),l(),T((e=o.getFileById(n.id))?4:-1,e)}}function op(t,i){if(t&1&&(d(0,"p",16),M(1),p()),t&2){let e=c().$implicit;l(),K(e.content)}}function ap(t,i){if(t&1&&(d(0,"div",3)(1,"div",13)(2,"span",14),M(3),p(),d(4,"span",15),M(5),$t(6,"timeAgo"),p()(),w(7,ip,5,2,"div",16)(8,op,2,1,"p",16),p()),t&2){let e=i.$implicit;l(3),K(e.senderName),l(2),K(Ht(6,3,e.timestamp)),l(2),T(e.type==="file"?7:8)}}function rp(t,i){if(t&1){let e=F();d(0,"button",20),f("click",function(){let o=b(e).$implicit,a=c();return v(a.insertEmoji(o))}),M(1),p()}if(t&2){let e=i.$implicit;s("pTooltip","Insert "+e),l(),Se(" ",e," ")}}var En=class t{show=!1;messages=[];getFileById=()=>{};currentUserId="";isHost=!1;close=new x;sendMessage=new x;fileSelected=new x;downloadFile=new x;messageText=D("");static EMOJIS=["\u{1F60A}","\u{1F602}","\u2764\uFE0F","\u{1F44D}","\u{1F389}","\u{1F525}","\u{1F44B}","\u{1F60E}"];EMOJIS=t.EMOJIS;onVisibleChange(i){i||this.close.emit()}onSend(){let i=this.messageText().trim();i&&(this.sendMessage.emit(i),this.messageText.set(""))}insertEmoji(i){this.messageText.update(e=>e+i)}onFileSelected(i){this.fileSelected.emit(i)}onDownloadFile(i){i&&this.downloadFile.emit(i)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-chat-panel"]],inputs:{show:"show",messages:"messages",getFileById:"getFileById",currentUserId:"currentUserId",isHost:"isHost"},outputs:{close:"close",sendMessage:"sendMessage",fileSelected:"fileSelected",downloadFile:"downloadFile"},decls:16,vars:3,consts:[["header","Chat",3,"visibleChange","visible","position"],[1,"flex","flex-col","h-full"],[1,"flex-1","overflow-y-auto","space-y-3"],[1,"p-3","rounded-lg","surface-ground"],[1,"mt-2"],[3,"fileSelected"],[1,"pt-3"],[1,"flex","flex-col","gap-2"],[1,"flex","gap-1","flex-wrap"],[1,"text-sm","hover:scale-110","transition-transform",3,"pTooltip"],[1,"flex","gap-2"],["type","text","placeholder","Type a message...",1,"flex-1","px-3","py-2","rounded-lg","border","bg-transparent","text-sm",2,"border-color","var(--color-glass-border)","color","var(--color-text-primary)",3,"ngModelChange","keydown.enter","ngModel"],["pTooltip","Send message",1,"px-4","py-2","rounded-lg","text-sm","text-white",2,"background-color","var(--color-primary)",3,"click"],[1,"flex","items-center","gap-2","mb-1"],[1,"text-xs","font-medium","text-primary"],[1,"text-xs","text-muted-color"],[1,"text-sm","text-color"],[1,"pi","pi-paperclip"],["pTooltip","Download file",1,"ml-2","px-2","py-1","text-xs","rounded","text-white",2,"background-color","var(--color-primary)"],["pTooltip","Download file",1,"ml-2","px-2","py-1","text-xs","rounded","text-white",2,"background-color","var(--color-primary)",3,"click"],[1,"text-sm","hover:scale-110","transition-transform",3,"click","pTooltip"]],template:function(e,n){e&1&&(d(0,"p-drawer",0),f("visibleChange",function(a){return n.onVisibleChange(a)}),d(1,"div",1)(2,"div",2),ae(3,ap,9,5,"div",3,tp),p(),d(5,"div",4)(6,"app-file-upload",5),f("fileSelected",function(a){return n.onFileSelected(a)}),p()(),d(7,"div",6)(8,"div",7)(9,"div",8),ae(10,rp,2,2,"button",9,Ke),p(),d(12,"div",10)(13,"input",11),f("ngModelChange",function(a){return n.messageText.set(a)})("keydown.enter",function(a){return n.onSend(),a.preventDefault()}),p(),d(14,"button",12),f("click",function(){return n.onSend()}),M(15," Send "),p()()()()()()),e&2&&(s("visible",n.show)("position","right"),l(3),re(n.messages),l(7),re(n.EMOJIS),l(3),s("ngModel",n.messageText()))},dependencies:[A,Me,lt,Oe,qe,Tn,Nt,Be,ct,on,nn,Mn,an],styles:[".p-drawer-right[_ngcontent-%COMP%]{width:40vw!important}"],changeDetection:0})};var sp=(t,i)=>i.id;function lp(t,i){if(t&1&&_(0,"video",37),t&2){let e=c(2);s("srcObject",e.screenStream())}}function cp(t,i){t&1&&(d(0,"p",38),M(1,"Screen Share Active"),p())}function dp(t,i){if(t&1&&(d(0,"div",4),w(1,lp,1,1,"video",37)(2,cp,2,0,"p",38),p()),t&2){let e=c();l(),T(e.screenStream()?1:2)}}function pp(t,i){if(t&1&&(d(0,"div",4),_(1,"video",39),p()),t&2){let e=c();l(),s("src",e.mediaUrl(),it)}}function up(t,i){if(t&1&&(d(0,"div",4),_(1,"video",37),p()),t&2){let e=c();l(),s("srcObject",e.bigScreenStream())}}function mp(t,i){if(t&1&&_(0,"video",40),t&2){let e=c(2);s("srcObject",e.localStream())}}function fp(t,i){t&1&&(d(0,"div",41)(1,"p",42),M(2,"Camera is off"),p()())}function gp(t,i){if(t&1&&(d(0,"div",5),w(1,mp,1,1,"video",40)(2,fp,3,0,"div",41),p()),t&2){let e=c();l(),T(e.localStream()?1:2)}}function hp(t,i){t&1&&(d(0,"div",6),M(1," Pinned "),p())}function _p(t,i){if(t&1&&_(0,"video",44),t&2){let e=c().$implicit;s("srcObject",e.stream)("muted",e.isLocal)}}function bp(t,i){if(t&1&&(d(0,"div",45)(1,"div",47)(2,"span",48),M(3),p()()()),t&2){let e=c().$implicit;l(3),Se(" ",e.displayName.charAt(0).toUpperCase()," ")}}function vp(t,i){if(t&1){let e=F();d(0,"div",43),f("click",function(){let o=b(e).$implicit,a=c();return v(a.pinParticipant(o.peerId))}),w(1,_p,1,2,"video",44)(2,bp,4,1,"div",45),d(3,"span",46),M(4),p()()}if(t&2){let e=i.$implicit,n=c();Ve("ring-2",n.pinnedParticipantId()===e.peerId),l(),T(e.stream?1:2),l(3),Se(" ",e.displayName," ")}}function yp(t,i){t&1&&_(0,"i",22)}function Cp(t,i){t&1&&_(0,"i",49)(1,"div",50)}function xp(t,i){if(t&1&&(d(0,"div",25),M(1),p()),t&2){let e=c();l(),Se(" ",e.roomService.messages().length," ")}}function wp(t,i){if(t&1&&(d(0,"div",27),M(1),p()),t&2){let e=c();l(),Se(" ",e.roomService.participants().length," ")}}function Tp(t,i){if(t&1){let e=F();d(0,"button",29),f("click",function(){b(e);let o=c();return v(o.toggleMediaPlayer())}),_(1,"i",51),p()}t&2&&s("pTooltip","Media player")}function kp(t,i){if(t&1){let e=F();d(0,"button",29),f("click",function(){b(e);let o=c();return v(o.showRoomInfo.update(a=>!a))}),_(1,"i",52),p()}t&2&&s("pTooltip","Room info and QR code")}function Sp(t,i){if(t&1){let e=F();d(0,"app-participants-panel",53),f("kick",function(o){b(e);let a=c();return v(a.kickParticipant(o))})("approve",function(o){b(e);let a=c();return v(a.approveRequest(o))})("deny",function(o){b(e);let a=c();return v(a.denyRequest(o))})("approveAll",function(){b(e);let o=c();return v(o.roomService.approveAll())})("denyAll",function(){b(e);let o=c();return v(o.roomService.denyAll())})("unban",function(o){b(e);let a=c();return v(a.unbanUser(o))})("unbanAll",function(){b(e);let o=c();return v(o.unbanAll())})("close",function(){b(e);let o=c();return v(o.showParticipants.set(!1))}),p()}if(t&2){let e=c();s("show",e.showParticipants())("participants",e.roomService.participants())("requests",e.roomService.pendingRequests())("banList",e.roomService.banList())("isHost",e.isHost())("currentUserId",e.currentUserId())("pendingKicks",e.roomService.pendingKicks())}}var fi=[{label:"480p (SD)",width:640,height:480},{label:"720p (HD)",width:1280,height:720},{label:"1080p (Full HD)",width:1920,height:1080},{label:"1440p (QHD)",width:2560,height:1440},{label:"4K (UHD)",width:3840,height:2160}],ir="callix-video-settings",or=class t{destroy$=new _i;route=h(Ai);router=h(Vi);roomService=h(Yi);peerService=h(Xt);authService=h(ji);recordingService=h(rn);mediaSyncService=h(sn);fileTransferService=h(Ji);alertService=h(Yt);roomId=D("");isHost=D(!1);showChat=D(!1);showParticipants=D(!1);participantsPanelOpenOnce=D(!1);showRoomInfo=D(!1);showMediaPlayer=D(!1);showVideoSettings=D(!1);carouselCollapsed=D(!1);mediaUrl=D("");activeSpeakerId=D(null);pinnedParticipantId=D(null);videoSettings=D(this.loadSettings());resolutionPresets=fi;micOn=D(!0);cameraOn=D(!0);screenSharing=D(!1);recording=D(!1);localStream=D(null);screenStream=D(null);remoteStreams=D([]);calledPeers=new Set;pendingCalls=[];currentUserId=N(()=>this.authService.currentUser()?.id??"");carouselParticipants=N(()=>{let i=this.roomService.participants(),e=this.remoteStreams(),n=this.localStream(),o=this.currentUserId();return i.map(a=>({id:a.id,peerId:a.peerId,displayName:a.displayName,isHost:a.isHost,stream:a.id===o?n:e.find(r=>r.peerId===a.peerId)?.stream??null,isLocal:a.id===o}))});bigScreenStream=N(()=>{let i=this.pinnedParticipantId();if(i){let o=this.remoteStreams().find(a=>a.peerId===i);if(o)return o.stream}let e=this.activeSpeakerId();if(e){let o=this.remoteStreams().find(a=>a.peerId===e);if(o)return o.stream}let n=this.remoteStreams();return n.length>0?n[0].stream:null});ngOnInit(){this.roomId.set(this.route.snapshot.paramMap.get("roomId")||""),this.isHost.set(this.roomService.isHost()),this.peerService.onRemoteStream$.pipe(Vt(this.destroy$)).subscribe(({peerId:i,stream:e})=>{this.remoteStreams.update(n=>{let o=n.findIndex(a=>a.peerId===i);if(o>=0){let a=[...n];return a[o]={peerId:i,stream:e},a}return[...n,{peerId:i,stream:e}]})}),this.peerService.onIncomingCall$.pipe(Vt(this.destroy$)).subscribe(({call:i})=>{let e=this.localStream();e?this.peerService.answerCall(i,e):this.pendingCalls.push(i)}),this.peerService.onMessage$.pipe(Vt(this.destroy$)).subscribe(i=>{i.type==="participant-update"&&Array.isArray(i.payload?.participants)&&this.callParticipants(i.payload.participants)}),this.initMedia().then(()=>{for(let i of this.pendingCalls)this.peerService.answerCall(i,this.localStream());this.pendingCalls=[],this.callAllParticipants()})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete(),this.calledPeers.clear(),this.pendingCalls.length=0}async initMedia(){try{let i=this.videoSettings(),e={audio:!0};if(i.custom){let o=fi[i.resolutionIndex];e.video={width:{ideal:o.width},height:{ideal:o.height}}}else e.video={width:{ideal:1280},height:{ideal:720}};let n=await navigator.mediaDevices.getUserMedia(e);this.localStream.set(n)}catch(i){console.error("Failed to get media:",i)}}async applyVideoSettings(){let i=this.videoSettings();if(this.saveSettings(i),!this.localStream()){this.initMedia(),this.showVideoSettings.set(!1);return}let n=this.localStream().getAudioTracks()[0]?.enabled??!0,o=this.cameraOn();this.localStream().getTracks().forEach(a=>a.stop());try{let a={audio:!0};if(i.custom){let m=fi[i.resolutionIndex];a.video={width:{ideal:m.width},height:{ideal:m.height}}}else a.video={width:{ideal:1280},height:{ideal:720}};let r=await navigator.mediaDevices.getUserMedia(a);r.getAudioTracks()[0].enabled=n,this.micOn.set(n),r.getVideoTracks()[0].enabled=o,this.cameraOn.set(o),this.localStream.set(r),this.peerService.closeMediaConnections();let u=this.roomService.participants().filter(m=>m.id!==this.authService.currentUser()?.id).map(m=>m.peerId);for(let m of u)this.peerService.callPeer(m,this.localStream())}catch(a){console.error("Failed to reinitialize media:",a)}this.showVideoSettings.set(!1)}loadSettings(){try{let i=localStorage.getItem(ir);if(i){let e=JSON.parse(i);return Te({custom:!1,resolutionIndex:2},e)}}catch{}return{custom:!1,resolutionIndex:2}}saveSettings(i){try{localStorage.setItem(ir,JSON.stringify(i))}catch{}}toggleMic(){let i=this.localStream();if(!i)return;let e=i.getAudioTracks()[0];e&&(e.enabled=!e.enabled,this.micOn.update(n=>!n))}toggleCamera(){let i=this.localStream();if(!i)return;let e=i.getVideoTracks()[0];e&&(e.enabled=!e.enabled,this.cameraOn.update(n=>!n))}async toggleScreenShare(){this.screenSharing()?this.stopScreenShare():await this.startScreenShare()}async startScreenShare(){try{let i=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});this.screenStream.set(i),this.screenSharing.set(!0);let e={type:"screen-share-start",payload:{},timestamp:Date.now(),senderId:this.authService.currentUser()?.id||"",encrypted:!1};this.peerService.broadcastMessage(e)}catch(i){console.error("Failed to start screen share:",i)}}stopScreenShare(){let i=this.screenStream();if(i){i.getTracks().forEach(n=>n.stop()),this.screenStream.set(null),this.screenSharing.set(!1);let e={type:"screen-share-stop",payload:{},timestamp:Date.now(),senderId:this.authService.currentUser()?.id||"",encrypted:!1};this.peerService.broadcastMessage(e)}}async toggleRecording(){if(this.recording()){let i=await this.recordingService.stopRecording();i&&this.recordingService.downloadRecording(i),this.recording.set(!1)}else{let i=this.localStream()||this.screenStream();i&&(this.recordingService.startRecording(i),this.recording.set(!0))}}pinParticipant(i){this.pinnedParticipantId.update(e=>e===i?null:i)}toggleMediaPlayer(){this.showMediaPlayer.update(i=>!i)}loadMedia(){this.mediaUrl().trim()&&(this.mediaSyncService.startMediaPlayback(this.mediaUrl()),this.showMediaPlayer.set(!0))}async onFileSelected(i){try{i.size>this.fileTransferService.LARGE_FILE_THRESHOLD?await this.alertService.showLargeFileWarning(i.name,i.size)&&await this.sendFile(i):await this.sendFile(i)}catch(e){console.error("File transfer failed:",e)}}async sendFile(i){let e=this.authService.currentUser();if(!e)return;let n=this.roomService.participants().filter(o=>o.id!==e.id).map(o=>o.peerId);n.length>0&&await this.fileTransferService.sendFile(i,n,e.id)}leaveRoom(){this.roomService.leaveRoom(),this.stopMedia(),this.router.navigate(["/home"])}stopMedia(){let i=this.localStream();i&&(i.getTracks().forEach(n=>n.stop()),this.localStream.set(null));let e=this.screenStream();e&&(e.getTracks().forEach(n=>n.stop()),this.screenStream.set(null)),this.remoteStreams.set([])}callAllParticipants(){this.callParticipants(this.roomService.participants())}callParticipants(i){let e=this.localStream();if(!e)return;let n=this.authService.currentUser();for(let o of i)o.id!==n?.id&&!this.calledPeers.has(o.peerId)&&(this.calledPeers.add(o.peerId),this.peerService.callPeer(o.peerId,e))}approveRequest(i){this.roomService.approveRequest(i);let e=this.roomService.participants().find(o=>o.id===i),n=this.localStream();e&&n&&!this.calledPeers.has(e.peerId)&&(this.calledPeers.add(e.peerId),this.peerService.callPeer(e.peerId,n))}denyRequest(i){this.roomService.denyRequest(i)}kickParticipant(i){this.roomService.kickParticipant(i)}unbanUser(i){this.roomService.unbanUser(i)}unbanAll(){this.roomService.unbanAll()}async copyToClipboard(i){try{await navigator.clipboard.writeText(i),this.alertService.showSuccess("Copied!","Room ID copied to clipboard.")}catch(e){console.error("Failed to copy:",e)}}closeRoomInfo(){this.showRoomInfo.set(!1)}getFileById=i=>this.fileTransferService.getFileById(i);downloadFile(i){if(i.data){let e=new Blob([i.data],{type:i.mimeType}),n=URL.createObjectURL(e),o=document.createElement("a");o.href=n,o.download=i.name,o.click(),URL.revokeObjectURL(n)}}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-meeting-room"]],decls:46,vars:52,consts:[[1,"h-screen","flex","flex-col","bg-[var(--color-surface)]"],[1,"flex-1","flex","overflow-hidden"],[1,"flex-1","flex","flex-col","p-4"],[1,"flex-1","glass-card","mb-4","overflow-hidden","relative"],[1,"w-full","h-full","flex","items-center","justify-center","bg-black"],[1,"w-full","h-full","flex","items-center","justify-center"],[1,"absolute","top-2","left-2","px-2","py-1","rounded","text-xs","text-white",2,"background","var(--color-primary)"],[1,"absolute","bottom-0","left-0","right-0","z-10","transition-transform","duration-300","ease-in-out",2,"transform-origin","bottom"],[1,"backdrop-blur-xl","bg-black/50","p-4","pt-6","rounded-t-[16px]",2,"border-top","1px solid rgba(255,255,255,0.12)"],[1,"flex","items-center","gap-3","overflow-x-auto"],[1,"flex-shrink-0","w-28","h-28","flex","flex-col","items-center","justify-center","cursor-pointer","rounded-xl",2,"--tw-ring-color","var(--color-primary)","background","rgba(255,255,255,0.06)","border","1px solid rgba(255,255,255,0.08)","overflow","hidden",3,"ring-2"],[1,"flex","justify-center","-mt-4","relative","z-20","cursor-pointer","select-none",3,"click","pTooltip"],[1,"w-8","h-8","flex","items-center","justify-center","rounded-full","transition-all","duration-150","shadow-lg"],[1,"transition-colors","duration-150"],[3,"close","sendMessage","fileSelected","downloadFile","show","messages","getFileById","currentUserId"],[1,"glass-card","rounded-none","border-x-0","border-b-0"],[1,"flex","items-center","justify-center","gap-3","p-4"],["tooltipPosition","top",1,"h-10","px-5","rounded-full","inline-flex","items-center","justify-center","gap-2","border","border-transparent","transition","duration-150","hover:bg-[var(--color-glass-bg)]","hover:border-[var(--color-glass-border)]","hover:text-[var(--color-primary)]",3,"click","pTooltip"],[1,"pi","pi-microphone"],[1,"pi","pi-camera"],[1,"pi","pi-desktop"],["tooltipPosition","top",1,"h-10","px-5","rounded-full","inline-flex","items-center","justify-center","gap-2","border","border-transparent","transition","duration-150","hover:bg-[var(--color-glass-bg)]","hover:border-[var(--color-glass-border)]","hover:text-[var(--color-primary)]","relative",3,"click","pTooltip"],[1,"pi","pi-circle-fill"],["tooltipPosition","top",1,"h-10","px-5","rounded-full","inline-flex","items-center","justify-center","gap-2","border","border-transparent","transition","duration-150","hover:bg-[var(--color-glass-bg)]","hover:border-[var(--color-glass-border)]","hover:text-[var(--color-primary)]","relative",2,"color","var(--color-text-secondary)",3,"click","pTooltip"],[1,"pi","pi-comments"],[1,"absolute","-top-1","-right-1","w-5","h-5","rounded-full","bg-blue-500","text-white","text-xs","flex","items-center","justify-center"],[1,"pi","pi-users"],[1,"absolute","-top-1","-right-1","w-5","h-5","rounded-full","bg-green-500","text-white","text-xs","flex","items-center","justify-center"],["tooltipPosition","top",1,"h-10","px-5","rounded-full","inline-flex","items-center","justify-center","gap-2","border","border-transparent","transition","duration-150","hover:bg-[var(--color-glass-bg)]","hover:border-[var(--color-glass-border)]","hover:text-[var(--color-primary)]",2,"color","var(--color-text-secondary)",3,"pTooltip"],["tooltipPosition","top",1,"h-10","px-5","rounded-full","inline-flex","items-center","justify-center","gap-2","border","border-transparent","transition","duration-150","hover:bg-[var(--color-glass-bg)]","hover:border-[var(--color-glass-border)]","hover:text-[var(--color-primary)]",2,"color","var(--color-text-secondary)",3,"click","pTooltip"],[1,"pi","pi-cog"],["tooltipPosition","top",1,"h-10","px-5","rounded-full","inline-flex","items-center","justify-center","gap-2","border","border-transparent","transition","duration-150","ml-4","font-medium","hover:bg-red-500/10","hover:border-red-500/20",2,"color","var(--color-danger)",3,"click","pTooltip"],[1,"pi","pi-sign-out"],[3,"mediaUrlChange","loadMedia","close","show","isHost","mediaUrl"],[3,"settingsChange","apply","close","show","settings","presets"],[3,"close","roomId","show"],[3,"show","participants","requests","banList","isHost","currentUserId","pendingKicks"],["autoplay","",1,"w-full","h-full","object-cover","rounded-lg",3,"srcObject"],[2,"color","white"],["controls","",1,"w-full","h-full","object-cover","rounded-lg",3,"src"],["autoplay","","muted","",1,"w-full","h-full","object-cover","rounded-lg",3,"srcObject"],[1,"text-center",2,"color","var(--color-text-secondary)"],[1,"text-xl"],[1,"flex-shrink-0","w-28","h-28","flex","flex-col","items-center","justify-center","cursor-pointer","rounded-xl",2,"--tw-ring-color","var(--color-primary)","background","rgba(255,255,255,0.06)","border","1px solid rgba(255,255,255,0.08)","overflow","hidden",3,"click"],["autoplay","",1,"w-full","flex-1","object-cover","rounded-t-xl",3,"srcObject","muted"],[1,"flex-1","flex","items-center","justify-center","w-full"],[1,"text-xs","py-1","px-2","w-full","text-center","truncate",2,"color","var(--color-text-secondary)","background","rgba(0,0,0,0.4)"],[1,"w-12","h-12","rounded-full","bg-gray-500","flex","items-center","justify-center"],[1,"text-sm","font-bold",2,"color","var(--color-text-primary)"],[1,"pi","pi-stop-circle"],[1,"absolute","-top-1","-right-1","w-3","h-3","bg-red-500","rounded-full","animate-pulse"],[1,"pi","pi-video"],[1,"pi","pi-info-circle"],[3,"kick","approve","deny","approveAll","denyAll","unban","unbanAll","close","show","participants","requests","banList","isHost","currentUserId","pendingKicks"]],template:function(e,n){e&1&&(d(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),w(4,dp,3,1,"div",4)(5,pp,2,1,"div",4)(6,up,2,1,"div",4)(7,gp,3,1,"div",5),w(8,hp,2,0,"div",6),d(9,"div",7)(10,"div",8)(11,"div",9),ae(12,vp,5,4,"div",10,sp),p()()()(),d(14,"div",11),f("click",function(){return n.carouselCollapsed.set(!n.carouselCollapsed())}),d(15,"div",12),_(16,"i",13),p()()(),d(17,"app-chat-panel",14),f("close",function(){return n.showChat.set(!1)})("sendMessage",function(a){return n.roomService.addMessage(a)})("fileSelected",function(a){return n.onFileSelected(a)})("downloadFile",function(a){return n.downloadFile(a)}),p()(),d(18,"div",15)(19,"div",16)(20,"button",17),f("click",function(){return n.toggleMic()}),_(21,"i",18),p(),d(22,"button",17),f("click",function(){return n.toggleCamera()}),_(23,"i",19),p(),d(24,"button",17),f("click",function(){return n.toggleScreenShare()}),_(25,"i",20),p(),d(26,"button",21),f("click",function(){return n.toggleRecording()}),w(27,yp,1,0,"i",22),w(28,Cp,2,0),p(),d(29,"button",23),f("click",function(){return n.showChat.update(a=>!a)}),_(30,"i",24),w(31,xp,2,1,"div",25),p(),d(32,"button",23),f("click",function(){return n.showParticipants.update(a=>!a),n.participantsPanelOpenOnce.set(!0)}),_(33,"i",26),w(34,wp,2,1,"div",27),p(),w(35,Tp,2,1,"button",28),w(36,kp,2,1,"button",28),d(37,"button",29),f("click",function(){return n.showVideoSettings.set(!0)}),_(38,"i",30),p(),d(39,"button",31),f("click",function(){return n.leaveRoom()}),_(40,"i",32),M(41," Leave "),p()()(),d(42,"app-media-player-modal",33),qt("mediaUrlChange",function(a){return Ot(n.mediaUrl,a)||(n.mediaUrl=a),a}),f("loadMedia",function(){return n.loadMedia()})("close",function(){return n.showMediaPlayer.set(!1)}),p(),d(43,"app-video-settings-modal",34),f("settingsChange",function(a){return n.videoSettings.set(a)})("apply",function(){return n.applyVideoSettings()})("close",function(){return n.showVideoSettings.set(!1)}),p(),d(44,"app-qr-code-modal",35),f("close",function(){return n.closeRoomInfo()}),p(),w(45,Sp,1,7,"app-participants-panel",36),p()),e&2&&(l(4),T(n.screenSharing()?4:n.mediaUrl()&&n.showMediaPlayer()?5:n.bigScreenStream()?6:7),l(4),T(n.pinnedParticipantId()?8:-1),l(),ye("transform",n.carouselCollapsed()?"translateY(100%)":"translateY(0)"),l(3),re(n.carouselParticipants()),l(2),s("pTooltip",n.carouselCollapsed()?"Show participants":"Hide participants"),l(),ye("background",n.carouselCollapsed()?"var(--color-glass-bg)":"var(--color-primary)")("border","1px solid "+(n.carouselCollapsed()?"var(--color-glass-border)":"transparent")),l(),y("pi "+(n.carouselCollapsed()?"pi-chevron-up":"pi-chevron-down")),ye("color",n.carouselCollapsed()?"var(--color-text-secondary)":"white"),l(),s("show",n.showChat())("messages",n.roomService.messages())("getFileById",n.getFileById)("currentUserId",n.currentUserId()),l(3),ye("color",n.micOn()?"var(--color-text-secondary)":"var(--color-danger)"),s("pTooltip","Microphone"),l(),Ve("icon-slash",!n.micOn()),l(),ye("color",n.cameraOn()?"var(--color-text-secondary)":"var(--color-danger)"),s("pTooltip","Camera"),l(),Ve("icon-slash",!n.cameraOn()),l(),ye("color",n.screenSharing()?"var(--color-primary)":"var(--color-text-secondary)"),s("pTooltip","Share Screen"),l(2),ye("color",n.recording()?"var(--color-danger)":"var(--color-text-secondary)"),s("pTooltip","Record Session"),l(),T(n.recording()?-1:27),l(),T(n.recording()?28:-1),l(),s("pTooltip","Chat"),l(2),T(n.roomService.messages().length>0?31:-1),l(),s("pTooltip","Participants"),l(2),T(n.roomService.participants().length>0?34:-1),l(),T(n.isHost()?35:-1),l(),T(n.isHost()?36:-1),l(),s("pTooltip","Video settings"),l(2),s("pTooltip","Leave Room"),l(3),s("show",n.showMediaPlayer())("isHost",n.isHost()),zt("mediaUrl",n.mediaUrl),l(),s("show",n.showVideoSettings())("settings",n.videoSettings())("presets",n.resolutionPresets),l(),s("roomId",n.roomId())("show",n.showRoomInfo()),l(),T(n.showParticipants()||n.participantsPanelOpenOnce()?45:-1))},dependencies:[A,Me,vn,yn,wn,Sn,En,on,nn],styles:['[_nghost-%COMP%]{display:block;height:100vh}input[_ngcontent-%COMP%]:focus{border-color:var(--color-primary)!important}button[_ngcontent-%COMP%]:hover{transform:translateY(-1px);transition:transform .15s ease}video[_ngcontent-%COMP%]{max-width:100%;max-height:100%;object-fit:contain}[_ngcontent-%COMP%]::-webkit-scrollbar{width:6px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:var(--color-text-secondary);border-radius:3px}.icon-slash[_ngcontent-%COMP%]{position:relative}.icon-slash[_ngcontent-%COMP%]:after{content:"";position:absolute;left:50%;top:-2px;bottom:-2px;width:2px;background:currentColor;transform:translate(-50%) rotate(40deg);border-radius:1px}'],changeDetection:0})};export{or as MeetingRoomComponent,fi as RESOLUTION_PRESETS};
