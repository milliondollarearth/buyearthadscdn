// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
require({cache:{"esri/core/requireUtils":function(){define(["require","exports","./deprecate","./Logger","./promiseUtils"],function(u,a,t,r,p){function m(a,k){t.deprecatedFunction(n,"when",{moduleName:"requireUtils",replacement:"Use `promiseUtils.create()` instead.",version:"4.10",warnOnce:!0});return Array.isArray(k)?p.create(function(g){a(k,function(){for(var a=[],k=0;k<arguments.length;k++)a[k]=arguments[k];g(a)})}):m(a,[k]).then(function(a){return a[0]})}Object.defineProperty(a,"__esModule",{value:!0});
var n=r.getLogger("esri.core.requireUtils");a.when=m;a.getAbsMid=function(a,k,n){return k.toAbsMid?k.toAbsMid(a):n.id.replace(/\/[^\/]*$/gi,"/")+a}})},"esri/core/workers":function(){define(["require","exports","./workers/workers"],function(u,a,t){Object.defineProperty(a,"__esModule",{value:!0});for(var r in t)a.hasOwnProperty(r)||(a[r]=t[r])})},"esri/core/workers/workers":function(){define("require exports ../tsSupport/generatorHelper ../tsSupport/awaiterHelper ../Error ../has ../promiseUtils ./Connection ./RemoteClient ./WorkerOwner".split(" "),
function(u,a,t,r,p,m,n,g,k,x){function v(){return r(this,void 0,void 0,function(){var a,c,l;return t(this,function(g){if(d)return[2,d];q=n.createAbortController();a=[];c=function(l){var c=x.create(l).then(function(a){return e[l]=a});a.push(c)};for(l=0;l<w;l++)c(l);d=n.all(a);return[2,d]})})}Object.defineProperty(a,"__esModule",{value:!0});a.Connection=g;a.RemoteClient=k;var w=m("esri-workers-debug")?1:m("host-browser")?navigator.hardwareConcurrency-1:0;w||(w=m("safari")&&m("mac")||m("trident")?7:
2);var c=0,e=[];a.initialize=function(){v()};a.openWithPorts=function(c,e){return new a.Connection(c.map(function(l){return new a.RemoteClient(l,e,{})}))};a.open=function(g,d){void 0===d&&(d={});return r(this,void 0,void 0,function(){var l,E,k,q,A,B,y;return t(this,function(F){switch(F.label){case 0:if("string"!==typeof g)throw new p("workers:undefined-module","modulePath is missing");l=d.signal;E=d.strategy||"distributed";m("host-webworker")&&!m("esri-workers")&&(E="local");return"local"!==E?[3,
2]:[4,n.create(function(a){return u([g],a)})];case 1:return k=F.sent(),n.throwIfAborted(l),q=d.client||k,A=a.RemoteClient.connect(k),[2,new a.Connection([new a.RemoteClient(A,q,d)])];case 2:return[4,v()];case 3:F.sent();n.throwIfAborted(l);if("dedicated"!==E)return[3,5];B=c++;c%=w;return[4,e[B].open(g,d)];case 4:return A=F.sent(),[2,new a.Connection([new a.RemoteClient(A,d.client,d)])];case 5:return[4,n.all(e.map(function(a){return a.open(g,d)}))];case 6:return y=F.sent(),[2,new a.Connection(y.map(function(l){return new a.RemoteClient(l,
d.client,d)}))]}})})};a.terminate=function(){d&&(q.abort(),d=null);for(var a=0;a<e.length;a++)e[a]&&e[a].terminate();e.length=0};var d=null,q})},"esri/core/workers/Connection":function(){define(["require","exports","../Logger","../promiseUtils","../accessorSupport/utils"],function(u,a,t,r,p){var m=t.getLogger("esri.core.workers.Connection");return function(){function a(a){this._clientIdx=0;this._clients=a}a.prototype.broadcast=function(a,k,m){for(var g=[],n=0,c=this._clients;n<c.length;n++)g.push(c[n].invoke(a,
k,m));return g};a.prototype.close=function(){for(var a=0,k=this._clients;a<k.length;a++)k[a].close();this._clients=[]};a.prototype.getAvailableClient=function(){var a;this._clients.some(function(g){return g.isBusy()?!1:(a=g,!0)})||(this._clientIdx=(this._clientIdx+1)%this._clients.length,a=this._clients[this._clientIdx]);return a};a.prototype.invoke=function(a,k,n){var g=null;Array.isArray(n)?(m.warn("invoke()","The transferList parameter is deprecated, use the options object instead"),g={transferList:n}):
g=n;return this._clients&&this._clients.length?this.getAvailableClient().invoke(a,k,g):r.reject(Error("Connection closed"))};a.prototype.on=function(a,k){var g=this._clients.map(function(g){return g.on(a,k)});return p.handlesGroup(g)};a.prototype.openPorts=function(){return this._clients.map(function(a){return a.openPort()})};return a}()})},"esri/core/workers/WorkerOwner":function(){define("require exports ../tsSupport/generatorHelper ../tsSupport/awaiterHelper ../../kernel ../Error ../Logger ../promiseUtils ./utils ./workerFactory".split(" "),
function(u,a,t,r,p,m,n,g,k,x){function v(a,l){a["delete"](l)}var w=n.getLogger("esri.core.workers"),c=k.MessageType.ABORT,e=k.MessageType.INVOKE,d=k.MessageType.OPEN,q=k.MessageType.OPENED,C=k.MessageType.RESPONSE;return function(){function a(a,c){this._outJobs=new Map;this._inJobs=new Map;this.worker=a;this.id=c;a.addEventListener("message",this._onMessage.bind(this));a.addEventListener("error",function(a){a.preventDefault();w.error(a)})}a.create=function(l){return r(this,void 0,void 0,function(){var c;
return t(this,function(d){switch(d.label){case 0:return[4,x.createWorker()];case 1:return c=d.sent(),[2,new a(c,l)]}})})};a.prototype.terminate=function(){this.worker.terminate()};a.prototype.open=function(a,e){void 0===e&&(e={});return r(this,void 0,void 0,function(){var l,q,n=this;return t(this,function(m){l=e.signal;q=k.newJobId();return[2,g.create(function(e,k){e={resolve:e,reject:k};g.onAbortOrThrow(l,function(){v(n._outJobs,q);n._post({type:c,jobId:q})});n._outJobs.set(q,e);n._post({type:d,
jobId:q,modulePath:a})})]})})};a.prototype._onMessage=function(a){if(a=k.receiveMessage(a))switch(a.type){case q:this._onOpenedMessage(a);break;case C:this._onResponseMessage(a);break;case c:this._onAbortMessage(a);break;case e:this._onInvokeMessage(a)}};a.prototype._onAbortMessage=function(a){var c=this._inJobs;a=a.jobId;var l=c.get(a);l&&(l.controller&&l.controller.abort(),v(c,a))};a.prototype._onInvokeMessage=function(a){var c=this,e=a.methodName,d=a.jobId,l=a.data;a=a.abortable?g.createAbortController():
null;var q=this._inJobs,n=p.workerMessages[e],m;try{if("function"!==typeof n)throw new TypeError(e+" is not a function");m=n.call(null,l,{signal:a?a.signal:null})}catch(K){this._post({type:C,jobId:d,error:k.toInvokeError(K)});return}if(g.isPromiseLike(m)){q.set(d,{controller:a,promise:m});if(a&&"cancel"in m)g.onAbort(a.signal,function(){return m.cancel()});m.then(function(a){q.has(d)&&(v(q,d),c._post({type:C,jobId:d},a))},function(a){q.has(d)&&(v(q,d),a||(a={message:"Error encountered at method"+
e}),g.isAbortError(a)||c._post({type:C,jobId:d,error:k.toInvokeError(a||{message:"Error encountered at method "+e})}))})}else this._post({type:C,jobId:d},m)};a.prototype._onOpenedMessage=function(a){var c=a.jobId;a=a.data;var d=this._outJobs.get(c);d&&(v(this._outJobs,c),d.resolve(a))};a.prototype._onResponseMessage=function(a){var c=a.jobId,d=a.error;a=a.data;var e=this._outJobs.get(c);e&&(v(this._outJobs,c),d?e.reject(m.fromJSON(JSON.parse(d))):e.resolve(a))};a.prototype._post=function(a,c,d){return k.postMessage(this.worker,
a,c,d)};return a}()})},"esri/core/workers/workerFactory":function(){define("require exports ../tsSupport/assignHelper ../tsSupport/generatorHelper ../tsSupport/awaiterHelper dojo/_base/kernel ../../config ../has ../Logger ../promiseUtils ./loaderConfig ./utils ./WorkerFallback".split(" "),function(u,a,t,r,p,m,n,g,k,x,v,w,c){function e(a){return p(this,void 0,void 0,function(){return r(this,function(e){return[2,x.create(function(e){function l(c){if(c=w.receiveMessage(c))switch(c.type){case A:c=a;var d=
n.workers.loaderUrl||v.DEFAULT_LOADER_URL,p;null!=n["default"]?(p=t({},n),delete p["default"],p=JSON.parse(JSON.stringify(p))):p=JSON.parse(JSON.stringify(n));var y=n.workers.loaderConfig,y=v.default({baseUrl:y.baseUrl,locale:m.locale,has:t({"config-deferredInstrumentation":0,"csp-restrictions":g("csp-restrictions"),"dojo-test-sniff":0,"esri-native-promise":g("esri-native-promise"),"esri-secure-context":g("esri-secure-context"),"esri-workers-arraybuffer-transfer":g("esri-workers-arraybuffer-transfer"),
"events-keypress-typed":0,"host-webworker":1,"esri-webgl-texture-float":g("esri-webgl-texture-float"),"esri-shared-array-buffer":g("esri-shared-array-buffer"),"esri-atomics":g("esri-atomics"),"esri-2d-debug":0,"esri-webgl-max-texture-size":g("esri-webgl-max-texture-size")},y.has),map:t({},y.map),paths:t({},y.paths),packages:y.packages||[]});c.postMessage({type:C,configure:{esriConfig:p,loaderUrl:d,loaderConfig:y}});break;case q:a.removeEventListener("message",l),a.removeEventListener("error",k),e(a)}}
function k(e){e.preventDefault();a.removeEventListener("message",l);a.removeEventListener("error",k);d.warn("Failed to create Worker. Fallback to execute module in main thread",e);a=new c;a.addEventListener("message",l);a.addEventListener("error",k)}a.addEventListener("message",l);a.addEventListener("error",k)})]})})}Object.defineProperty(a,"__esModule",{value:!0});var d=k.getLogger("esri.core.workers");g.add("esri-workers-arraybuffer-transfer",!g("safari")||12<=g("safari"));var q=w.MessageType.CONFIGURED,
C=w.MessageType.CONFIGURE,A=w.MessageType.HANDSHAKE,l;try{l=URL.createObjectURL(new Blob(['var globalId\x3d0;var outgoing\x3dnew Map;var configured\x3dfalse;var HANDSHAKE\x3d0;var CONFIGURE\x3d1;var CONFIGURED\x3d2;var OPEN\x3d3;var OPENED\x3d4;var RESPONSE\x3d5;var INVOKE\x3d6;var ABORT\x3d7;function mapDelete(map,key){map["delete"](key)}function createAbortError(){var error\x3dnew Error("AbortError");error.dojoType\x3d"cancel";return error}function receiveMessage(event){if(!event||!event.data){return null}if(typeof event.data\x3d\x3d\x3d"string"){return JSON.parse(event.data)}return event.data}function invokeStaticMessage(methodName,data,options){var signal\x3doptions\x26\x26options.signal;var Deferred\x3drequire("dojo/Deferred");var jobId\x3dglobalId++;var abort\x3dfunction(){var outJob\x3doutgoing.get(jobId);if(!outJob){return}mapDelete(outgoing,jobId);self.postMessage({type:ABORT,jobId:jobId});outJob.reject(createAbortError())};var deferred\x3dnew Deferred(abort);if(signal){if(signal.aborted){return deferred.reject(createAbortError())}signal.addEventListener("abort",function(){abort();deferred.reject(createAbortError())})}outgoing.set(jobId,deferred);self.postMessage({type:INVOKE,jobId:jobId,methodName:methodName,abortable:true,data:data});return deferred.promise}function messageHandler(event){var message\x3dreceiveMessage(event);if(!message){return}var jobId\x3dmessage.jobId;switch(message.type){case CONFIGURE:var configuration\x3dmessage.configure;if(configured){return}self.dojoConfig\x3dconfiguration.loaderConfig;self.importScripts(configuration.loaderUrl);if(typeof require.config\x3d\x3d\x3d"function"){require.config(configuration.loaderConfig)}require(["esri/config"],function(esriConfig){for(var name in configuration.esriConfig){if(Object.prototype.hasOwnProperty.call(configuration.esriConfig,name)){esriConfig[name]\x3dconfiguration.esriConfig[name]}}self.postMessage({type:CONFIGURED})});break;case OPEN:var modulePath\x3dmessage.modulePath;require(["esri/core/workers/RemoteClient",modulePath],function(RemoteClient,Module){var port\x3dRemoteClient.connect(Module);self.postMessage({type:OPENED,jobId:jobId,data:port},[port])});break;case RESPONSE:if(outgoing.has(jobId)){var deferred\x3doutgoing.get(jobId);mapDelete(outgoing,jobId);if(message.error){deferred.reject(JSON.parse(message.error))}else{deferred.resolve(message.data)}}break}}self.addEventListener("message",messageHandler);self.postMessage({type:HANDSHAKE});'],
{type:"text/javascript"}))}catch(E){}a.createWorker=function(){return p(this,void 0,void 0,function(){var a;return r(this,function(q){if(!g("esri-workers"))return[2,e(new c)];if(l)try{a=new Worker(l)}catch(P){d.warn("Failed to create Worker. Fallback to execute module in main thread",event),a=new c}else d.warn("Failed to create Worker. Fallback to execute module in main thread",event),a=new c;return[2,e(a)]})})}})},"esri/core/workers/loaderConfig":function(){define(["require","exports","../tsSupport/assignHelper",
"../has","../urlUtils"],function(u,a,t,r,p){Object.defineProperty(a,"__esModule",{value:!0});r=r("esri-built")?"dojo/dojo-lite.js":"dojo/dojo.js";a.DEFAULT_LOADER_URL=p.makeAbsolute(p.removeQueryParameters(u.toUrl(r)));a.DEFAULT_CONFIG={baseUrl:function(){var a=p.removeQueryParameters(u.toUrl("dojo/x.js"));return p.makeAbsolute(a.slice(0,a.length-5))}(),packages:[{name:"esri"},{name:"dojo"},{name:"dojox"},{name:"dstore"},{name:"moment",main:"moment"},{name:"@dojo"},{name:"cldrjs",main:"dist/cldr"},
{name:"globalize",main:"dist/globalize"},{name:"maquette-css-transitions",main:"dist/maquette-css-transitions.umd"},{name:"maquette-jsx",main:"dist/maquette-jsx.umd"},{name:"tslib",main:"tslib"}],map:{globalize:{cldr:"cldrjs/dist/cldr","cldr/event":"cldrjs/dist/cldr/event","cldr/supplemental":"cldrjs/dist/cldr/supplemental","cldr/unresolved":"cldrjs/dist/cldr/unresolved"}}};a.default=function(m){var n={async:m.async,isDebug:m.isDebug,locale:m.locale,baseUrl:m.baseUrl,has:t({},m.has),map:t({},m.map),
packages:m.packages&&m.packages.concat()||[],paths:t({},m.paths)};m.hasOwnProperty("async")||(n.async=!0);m.hasOwnProperty("isDebug")||(n.isDebug=!1);m.baseUrl||(n.baseUrl=a.DEFAULT_CONFIG.baseUrl);a.DEFAULT_CONFIG.packages.forEach(function(a){a:{for(var g=n.packages,c=0;c<g.length;c++)if(g[c].name===a.name)break a;a=t({},a);c=p.removeQueryParameters(u.toUrl(a.name+"/x.js"));c=c.slice(0,c.length-5);a.location=p.makeAbsolute(c);g.push(a)}});m=n.map=n.map||{};for(var g=0,k=Object.keys(a.DEFAULT_CONFIG.map);g<
k.length;g++){var r=k[g];m[r]||(m[r]=a.DEFAULT_CONFIG.map[r])}return n}})},"esri/core/urlUtils":function(){define("require exports ./tsSupport/assignHelper ../config ../kernel ./Error ./global ./Logger ./string".split(" "),function(u,a,t,r,p,m,n,g,k){function x(b){var a={path:null,query:null},h=new G(b),z=b.indexOf("?");null===h.query?a.path=b:(a.path=b.substring(0,z),a.query=v(h.query));h.fragment&&(a.hash=h.fragment,null===h.query&&(a.path=a.path.substring(0,a.path.length-(h.fragment.length+1))));
return a}function v(b){var a={},h=0;for(b=b.split("\x26");h<b.length;h++){var z=b[h];if(z){var c=z.indexOf("\x3d"),d=void 0,e=void 0;0>c?(d=decodeURIComponent(z),e=""):(d=decodeURIComponent(z.slice(0,c)),e=decodeURIComponent(z.slice(c+1)));z=a[d];"string"===typeof z&&(z=a[d]=[z]);Array.isArray(z)?z.push(e):a[d]=e}}return a}function w(b){return b&&"object"===typeof b&&"toJSON"in b&&"function"===typeof b.toJSON}function c(b,a){return b?a&&"function"===typeof a?Object.keys(b).map(function(f){return encodeURIComponent(f)+
"\x3d"+encodeURIComponent(a(f,b[f]))}).join("\x26"):Object.keys(b).map(function(f){var h=b[f];if(null==h)return"";var c=encodeURIComponent(f)+"\x3d";return(f=a&&a[f])?c+encodeURIComponent(f(h)):Array.isArray(h)?h.map(function(b){return w(b)?c+encodeURIComponent(JSON.stringify(b)):c+encodeURIComponent(b)}).join("\x26"):w(h)?c+encodeURIComponent(JSON.stringify(h)):c+encodeURIComponent(h)}).filter(function(b){return b}).join("\x26"):""}function e(b){var a=b.indexOf("?");-1!==a?(J.path=b.slice(0,a),J.query=
b.slice(a+1)):(J.path=b,J.query=null);return J}function d(b){b=e(b).path;b&&"/"===b[b.length-1]||(b+="/");b=L(b,!0);return b=b.toLowerCase()}function q(b){var a=I.proxyRules;b=d(b);for(var h=0;h<a.length;h++)if(0===b.indexOf(a[h].urlPrefix))return a[h]}function C(b){b=H(b);var a=b.indexOf("/sharing");return 0<a?b.substring(0,a):b.replace(/\/+$/,"")}function A(b,a,h){void 0===h&&(h=!1);b=R(b);a=R(a);return h||b.scheme===a.scheme?b.host.toLowerCase()===a.host.toLowerCase()&&b.port===a.port:!1}function l(b,
f,h){void 0===f&&(f=a.appBaseUrl);if(D(b))return h&&h.preserveProtocolRelative?b:"http"===a.appUrl.scheme&&a.appUrl.authority===U(b).slice(2)?"http:"+b:"https:"+b;if(!M(b)){h=P;if("/"===b[0]){var c=f.indexOf("//"),c=f.indexOf("/",c+2);f=-1===c?f:f.slice(0,c)}return h(f,b)}return b}function E(b,f,h){void 0===f&&(f=a.appBaseUrl);if(!B(b))return b;var c=H(b),d=c.toLowerCase();f=H(f).toLowerCase().replace(/\/+$/,"");if((h=h?H(h).toLowerCase().replace(/\/+$/,""):null)&&0!==f.indexOf(h))return b;for(var e=
function(b,a,f){f=b.indexOf(a,f);return-1===f?b.length:f},g=e(d,"/",d.indexOf("//")+2),q=-1;d.slice(0,g+1)===f.slice(0,g)+"/";){q=g+1;if(g===d.length)break;g=e(d,"/",g+1)}if(-1===q||h&&q<h.length)return b;b=c.slice(q);c=f.slice(q-1).replace(/[^/]+/g,"").length;if(0<c)for(d=0;d<c;d++)b="../"+b;else b="./"+b;return b}function H(b){b=b.trim();b=l(b);if(/^https?:\/\//i.test(b)){var a=e(b);b=a.path.replace(/\/{2,}/g,"/");b=b.replace("/","//");a.query&&(b+="?"+a.query)}b=b.replace(/^(https?:\/\/)(arcgis\.com)/i,
"$1www.$2");return b=ba(b)}function P(){for(var b=[],a=0;a<arguments.length;a++)b[a]=arguments[a];if(b&&b.length){a=[];if(B(b[0])){var h=b[0],c=h.indexOf("//");-1!==c&&(a.push(h.slice(0,c+1)),ca.test(b[0])&&(a[0]+="/"),b[0]=h.slice(c+2))}else"/"===b[0][0]&&a.push("");b=b.reduce(function(b,a){return a?b.concat(a.split("/")):b},[]);for(h=0;h<b.length;h++)c=b[h],".."===c&&0<a.length&&".."!==a[a.length-1]?a.pop():(!c&&h===b.length-1||c&&("."!==c||0===a.length))&&a.push(c);return a.join("/")}}function U(b,
a){void 0===a&&(a=!1);if(y(b)||F(b))return null;var f=b.indexOf("://");if(-1===f&&D(b))f=2;else if(-1!==f)f+=3;else return null;f=b.indexOf("/",f);-1!==f&&(b=b.slice(0,f));a&&(b=L(b,!0));return b}function B(b){return D(b)||M(b)}function y(b){return"blob:"===b.slice(0,5)}function F(b){return"data:"===b.slice(0,5)}function K(b){b=Q(b);if(!b||!b.isBase64)return null;b=atob(b.data);for(var a=new Uint8Array(b.length),h=0;h<b.length;h++)a[h]=b.charCodeAt(h);return a.buffer}function Q(a){return(a=a.match(da))?
{mediaType:a[1],isBase64:!!a[2],data:a[3]}:null}function S(a){var b=K(a);if(!b)return null;a=Q(a);return new Blob([b],{type:a.mediaType})}function D(a){return a&&"/"===a[0]&&"/"===a[1]}function M(a){return V.test(a)}function ea(b){return W.test(b)||"http"===a.appUrl.scheme&&D(b)}function T(a){return D(a)?"https:"+a:a.replace(W,"https:")}function N(){return"https"===a.appUrl.scheme}function L(a,f){void 0===f&&(f=!1);if(D(a))return a.slice(2);a=a.replace(V,"");f&&1<a.length&&"/"===a[0]&&"/"===a[1]&&
(a=a.slice(2));return a}function ba(b){var f=I.httpsDomains;if(!ea(b))return b;var h=b.indexOf("/",7),c;c=-1===h?b:b.slice(0,h);c=c.toLowerCase().slice(7);if(fa.test(c))if(k.endsWith(c,":80"))c=c.slice(0,-3),b=b.replace(":80","");else return b;if("http"===a.appUrl.scheme&&c===a.appUrl.authority&&!ga.test(b))return b;if(N()&&c===a.appUrl.authority||f&&f.some(function(a){return c===a||k.endsWith(c,"."+a)})||N()&&!q(b))b=T(b);return b}function O(a,f,c){if(!(f&&c&&a&&B(a)))return a;var b=a.indexOf("//"),
h=a.indexOf("/",b+2),d=a.indexOf(":",b+2),h=Math.min(0>h?a.length:h,0>d?a.length:d);if(a.slice(b+2,h).toLowerCase()!==f.toLowerCase())return a;f=a.slice(0,b+2);a=a.slice(h);return""+f+c+a}function R(b){if("string"===typeof b)return new G(l(b));b.scheme||(b.scheme=a.appUrl.scheme);return b}function X(b,f){var c=f&&f.url&&f.url.path;b&&c&&(b=l(b,c,{preserveProtocolRelative:!0}));(f=f&&f.portal)&&!f.isPortal&&f.urlKey&&f.customBaseUrl?(c=f.urlKey+"."+f.customBaseUrl,f=A(a.appUrl,a.appUrl.scheme+"://"+
c)?O(b,f.portalHostname,c):O(b,c,f.portalHostname)):f=b;return f}function Y(a,f){if(!a)return a;!B(a)&&f&&f.blockedRelativeUrls&&f.blockedRelativeUrls.push(a);var b=l(a);if(f){var c=f.verifyItemRelativeUrls&&f.verifyItemRelativeUrls.rootPath||f.url&&f.url.path;c&&(b=E(b,c,c),b!==a&&f.verifyItemRelativeUrls&&f.verifyItemRelativeUrls.writtenUrls.push(b))}a=b;b=(f=f&&f.portal)&&!f.isPortal&&f.urlKey&&f.customBaseUrl?O(a,f.urlKey+"."+f.customBaseUrl,f.portalHostname):a;B(b)&&(b=H(b));return b}function Z(a,
f,h){a=x(a);var b=a.query||{};b[f]=String(h);return a.path+"?"+c(b)}Object.defineProperty(a,"__esModule",{value:!0});var ha=g.getLogger("esri.core.urlUtils"),I=r.request,V=/^\s*[a-z][a-z0-9-+.]*:(?![0-9])/i,W=/^\s*http:/i,aa=/^\s*https:/i,ca=/^\s*file:/i,fa=/:\d+$/,ga=/^https?:\/\/[^/]+\.arcgis.com\/sharing(\/|$)/i,ia=/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/,ja=/^((([^\[:]+):)?([^@]+)@)?(\[([^\]]+)\]|([^\[:]*))(:([0-9]+))?$/,G=function(){function a(a){void 0===a&&(a="");this.uri=
a;this.port=this.host=this.password=this.user=this.fragment=this.query=this.path=this.authority=this.scheme=null;a=this.uri.match(ia);this.scheme=a[2]||(a[1]?"":null);this.authority=a[4]||(a[3]?"":null);this.path=a[5];this.query=a[7]||(a[6]?"":null);this.fragment=a[9]||(a[8]?"":null);null!=this.authority&&(a=this.authority.match(ja),this.user=a[3]||null,this.password=a[4]||null,this.host=a[6]||a[7],this.port=a[9]||null)}a.prototype.toString=function(){return this.uri};return a}();a.Url=G;a.appUrl=
new G(r.applicationUrl);a.trustedServersUrlCache={};a.appBaseUrl=function(){var b=a.appUrl.path,b=b.substring(0,b.lastIndexOf(b.split("/")[b.split("/").length-1]));return""+(a.appUrl.scheme+"://"+a.appUrl.host+(null!=a.appUrl.port?":"+a.appUrl.port:""))+b}();a.urlToObject=x;a.queryToObject=v;a.objectToQuery=c;a.getProxyUrl=function(b){void 0===b&&(b=!1);var c,h=I.proxyUrl;if("string"===typeof b){if(c=b,c=aa.test(c)||"https"===a.appUrl.scheme&&D(c),b=q(b))h=b.proxyUrl}else c=!!b;if(!h)throw ha.warn("esri/config: esriConfig.request.proxyUrl is not set."),
new m("urlutils:proxy-not-set","esri/config: esriConfig.request.proxyUrl is not set.");c&&N()&&(h=T(h));return x(h)};a.addProxy=function(a){var b=q(a),h,d;b&&(d=e(b.proxyUrl),h=d.path,d=d.query?v(d.query):null);h&&(b=x(a),a=h+"?"+b.path,(h=c(t({},d,b.query)))&&(a=a+"?"+h));return a};var J={path:"",query:""};a.addProxyRule=function(a){a={proxyUrl:a.proxyUrl,urlPrefix:d(a.urlPrefix)};for(var b=I.proxyRules,c=a.urlPrefix,e=b.length,g=0;g<b.length;g++){var q=b[g].urlPrefix;if(0===c.indexOf(q)){if(c.length===
q.length)return-1;e=g;break}0===q.indexOf(c)&&(e=g+1)}b.splice(e,0,a);return e};a.getProxyRule=q;a.hasSamePortal=function(a,c){a=C(a);c=C(c);return L(a)===L(c)};a.getInterceptor=function(a){var b=function(b){return null==b||b instanceof RegExp&&b.test(a)||"string"===typeof b&&k.startsWith(a,b)},c=I.interceptors;if(c)for(var d=0;d<c.length;d++){var e=c[d];if(Array.isArray(e.urls)){if(e.urls.some(b))return e}else if(b(e.urls))return e}return null};a.hasSameOrigin=A;a.isTrustedServer=function(b){if("string"===
typeof b)if(B(b))b=R(b);else return!0;if(A(b,a.appUrl))return!0;for(var c=I.trustedServers||[],d=0;d<c.length;d++){var e;e=c[d];a.trustedServersUrlCache[e]||(M(e)||D(e)?a.trustedServersUrlCache[e]=[new G(l(e))]:a.trustedServersUrlCache[e]=[new G("http://"+e),new G("https://"+e)]);e=a.trustedServersUrlCache[e];for(var g=0;g<e.length;g++)if(A(b,e[g]))return!0}return!1};a.makeAbsolute=l;a.makeRelative=E;a.normalize=H;a.join=P;a.getOrigin=U;a.isAbsolute=B;a.isBlobProtocol=y;a.isDataProtocol=F;a.dataToArrayBuffer=
K;var da=/^data:(.*?)(;base64)?,(.*)$/;a.dataComponents=Q;a.makeData=function(a){return a.isBase64?"data:"+a.mediaType+";base64,"+a.data:"data:"+a.mediaType+","+a.data};a.dataToBlob=S;a.downloadDataAsFile=function(a,c){var b;a:if(b=document.createElement("a"),"download"in b){var d=null;if(n.URL&&n.URL.createObjectURL){d=S(a);if(!d){b=!1;break a}d=n.URL.createObjectURL(d)}b.download=c;b.href=d||a;b.style.display="none";document.body.appendChild(b);b.click();document.body.removeChild(b);d&&n.URL.revokeObjectURL(d);
b=void 0}else b=!1;b||window.navigator.msSaveOrOpenBlob&&window.navigator.msSaveOrOpenBlob(S(a),c)};a.isProtocolRelative=D;a.hasProtocol=M;a.toHTTP=function(a){return D(a)?"http:"+a:a.replace(aa,"http:")};a.toHTTPS=T;a.isAppHTTPS=N;a.removeFile=function(a){var b=0;if(B(a)){var c=a.indexOf("//");-1!==c&&(b=c+2)}c=a.lastIndexOf("/");return c<b?a:a.slice(0,c+1)};a.removeTrailingSlash=function(a){return a.replace(/\/+$/,"")};a.changeDomain=O;a.fromJSON=X;a.read=function(a,c,d){return X(a,d)};a.toJSON=
Y;a.write=function(a,c,d,e){(a=Y(a,e))&&(c[d]=a)};a.isSVG=function(a){return ka.test(a)};a.removeQueryParameters=function(a,c){a=x(a);var b=Object.keys(a.query||{});0<b.length&&c&&c.warn("removeQueryParameters()","Url query parameters are not supported, the following parameters have been removed: "+b.join(", ")+".");return a.path};a.addQueryParameter=Z;a.addQueryParameters=function(a,d){a=x(a);var b=a.query||{},e;for(e in d)b[e]=d[e];return(d=c(b))?a.path+"?"+d:a.path};a.removeQueryParameter=function(a,
d){var b=x(a),e=b.path,b=b.query;if(!b)return a;delete b[d];return(a=c(b))?e+"?"+a:e};a.addTokenParameter=function(a){var b=p.id&&p.id.findCredential(a);return b&&b.token?Z(a,"token",b.token):a};var ka=/(^data:image\/svg|\.svg$)/i})},"esri/core/workers/WorkerFallback":function(){define("require exports ../tsSupport/generatorHelper ../tsSupport/awaiterHelper ../global ../has ../promiseUtils ./utils @dojo/framework/shim/Promise".split(" "),function(u,a,t,r,p,m,n,g){var k=function(){return function(){var a=
this,e=document.createDocumentFragment();["addEventListener","dispatchEvent","removeEventListener"].forEach(function(c){a[c]=function(){for(var a=[],d=0;d<arguments.length;d++)a[d]=arguments[d];return e[c].apply(e,a)}})}}(),x=p.MutationObserver||p.WebKitMutationObserver,v=function(){var a;if(p.process&&p.process.nextTick)a=function(a){p.process.nextTick(a)};else if(p.Promise)a=function(a){p.Promise.resolve().then(a)};else if(x){var e=[],d=document.createElement("div");(new x(function(){for(;0<e.length;)e.shift()()})).observe(d,
{attributes:!0});a=function(a){e.push(a);d.setAttribute("queueStatus","1")}}return a}(),w=function(){var a=p.MessageEvent;try{new a("message",{data:null})}catch(e){return function(a,c){void 0===c&&(c={});var d=c.data,e=c.bubbles,e=void 0===e?!1:e;c=c.cancelable;c=void 0===c?!1:c;var g=document.createEvent("Event");g.initEvent(a,e,c);g.data=d;return g}}return function(c,d){return new a(c,d)}}();return function(){function a(){this._dispatcher=new k;this._isInitialized=!1;this._workerPostMessage({type:g.MessageType.HANDSHAKE})}
a.prototype.terminate=function(){};Object.defineProperty(a.prototype,"onmessage",{get:function(){return this._onmessageHandler},set:function(a){this._onmessageHandler&&this.removeEventListener("message",this._onmessageHandler);(this._onmessageHandler=a)&&this.addEventListener("message",a)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"onerror",{get:function(){return this._onerrorHandler},set:function(a){this._onerrorHandler&&this.removeEventListener("error",this._onerrorHandler);
(this._onerrorHandler=a)&&this.addEventListener("error",a)},enumerable:!0,configurable:!0});a.prototype.postMessage=function(a){var c=this;v(function(){c._workerMessageHandler(w("message",{data:a}))})};a.prototype.dispatchEvent=function(a){return this._dispatcher.dispatchEvent(a)};a.prototype.addEventListener=function(a,c,g){this._dispatcher.addEventListener(a,c,g)};a.prototype.removeEventListener=function(a,c,g){this._dispatcher.removeEventListener(a,c,g)};a.prototype._workerPostMessage=function(a){var c=
this;v(function(){c.dispatchEvent(w("message",{data:a}))})};a.prototype._workerMessageHandler=function(a){return r(this,void 0,void 0,function(){var c,e,k,m,l,p,r,v,w=this;return t(this,function(d){switch(d.label){case 0:c=g.receiveMessage(a);if(!c)return[2];e=c.type;switch(e){case g.MessageType.CONFIGURE:return[3,1];case g.MessageType.OPEN:return[3,2]}return[3,27];case 1:return this._isInitialized||this._workerPostMessage({type:g.MessageType.CONFIGURED}),[3,27];case 2:return k=c.modulePath,m=c.jobId,
[3,25];case 3:p=d.sent();r=k;switch(r){case "esri/tasks/operations/PBFWorker":return[3,4];case "esri/views/2d/engine/vectorTiles/WorkerTileHandler":return[3,6];case "esri/views/2d/layers/features/Pipeline":return[3,8];case "esri/views/3d/layers/PointCloudWorker":return[3,10];case "esri/views/3d/layers/SceneLayerWorker":return[3,12];case "esri/layers/graphics/sources/support/CSVSourceWorker":return[3,14];case "esri/layers/support/LercWorker":return[3,16];case "esri/views/3d/webgl-engine/lib/edgeRendering/EdgeProcessingWorker":return[3,
18];case "esri/geometry/support/meshUtils/ElevationSamplerWorker":return[3,20]}return[3,22];case 4:return[4,new Promise(function(a,c){u(["esri/tasks/operations/PBFWorker"],a,c)})];case 5:return l=d.sent(),[3,24];case 6:return[4,new Promise(function(a,c){u(["esri/views/2d/engine/vectorTiles/WorkerTileHandler"],a,c)})];case 7:return l=d.sent(),[3,24];case 8:return[4,new Promise(function(a,c){u(["esri/views/2d/layers/features/Pipeline"],a,c)})];case 9:return l=d.sent(),[3,24];case 10:return[4,new Promise(function(a,
c){u(["esri/views/3d/layers/PointCloudWorker"],a,c)})];case 11:return l=d.sent(),[3,24];case 12:return[4,new Promise(function(a,c){u(["esri/views/3d/layers/SceneLayerWorker"],a,c)})];case 13:return l=d.sent(),[3,24];case 14:return[4,new Promise(function(a,c){u(["esri/layers/graphics/sources/support/CSVSourceWorker"],a,c)})];case 15:return l=d.sent(),[3,24];case 16:return[4,new Promise(function(a,c){u(["esri/layers/support/LercWorker"],a,c)})];case 17:return l=d.sent(),[3,24];case 18:return[4,new Promise(function(a,
c){u(["esri/views/3d/webgl-engine/lib/edgeRendering/EdgeProcessingWorker"],a,c)})];case 19:return l=d.sent(),[3,24];case 20:return[4,new Promise(function(a,c){u(["esri/geometry/support/meshUtils/ElevationSamplerWorker"],a,c)})];case 21:return l=d.sent(),[3,24];case 22:return[4,n.create(function(a){return u([k],a)})];case 23:l=d.sent(),d.label=24;case 24:return v=p.connect(l),this._workerPostMessage({type:g.MessageType.OPENED,jobId:m,data:v}),[3,26];case 25:u(["esri/core/workers/RemoteClient",k],function(a,
c){a=a.connect(c);w._workerPostMessage({type:g.MessageType.OPENED,jobId:m,data:a})}),d.label=26;case 26:return[3,27];case 27:return[2]}})})};return a}()})},"*noref":1}});
define("require exports ../../core/tsSupport/assignHelper ../../core/tsSupport/extendsHelper ../../core/promiseUtils ../../core/requireUtils ../../core/workers module".split(" "),function(u,a,t,r,p,m,n,g){function k(){return p.create(function(a){return u(["./rasterFormats/LercCodec"],a)})}Object.defineProperty(a,"__esModule",{value:!0});var x=function(){function a(){}a.prototype._decode=function(a){return k().then(function(c){c=c.decode;c=c(a.buffer,a.options);return{result:c,transferList:[c.pixelData.buffer]}})};
return a}(),v=function(a){function c(c){var d=a.call(this)||this;d.scheduler=c;d._threadInitialized=p.create(function(a){n.open(m.getAbsMid("./LercWorker",u,g),{strategy:"dedicated",scheduler:c}).then(function(c){void 0===d._thread?d._thread=c:c.close();a()},function(){return a()})});return d}r(c,a);c.prototype.destroy=function(){this._thread&&this._thread.close();this._thread=null};Object.defineProperty(c.prototype,"test",{get:function(){return{threadInitialized:this._threadInitialized}},enumerable:!0,
configurable:!0});c.prototype.decode=function(a,c,e){return a&&0!==a.byteLength?this._thread?this._thread.invoke("_decode",{buffer:a,options:c},{transferList:[a],signal:e}):k().then(function(d){d=d.decode;p.throwIfAborted(e);return d(a,c)}):p.resolve(null)};return c}(x);a.LercWorkerMaster=v;var w=new Map;a.acquireInstance=function(a){var c=w.get(a);c||(c={instance:new v(a),ref:0},w.set(a,c));++c.ref;return c.instance};a.releaseInstance=function(a){if(null!=a){a=a.scheduler;var c=w.get(a);c&&0>=--c.ref&&
(c.instance.destroy(),w.delete(a))}};a.default=function(){return new x}});