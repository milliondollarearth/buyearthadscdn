// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.15/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/decorateHelper ../../../../core/tsSupport/assignHelper ../../../../core/tsSupport/generatorHelper ../../../../core/tsSupport/awaiterHelper ../../../../Graphic ../../../../core/Accessor ../../../../core/Collection ../../../../core/Handles ../../../../core/promiseUtils ../../../../core/watchUtils ../../../../core/accessorSupport/decorators ../../../../core/accessorSupport/diffUtils ../../../../layers/Layer ../../../../layers/graphics/dehydratedFeatures ../../../../tasks/support/Query ./constants ./Graphics3DCore ./Graphics3DElevationAlignment ./Graphics3DObjectStates ./Graphics3DScaleVisibility ./graphicUtils ../../../support/WatchUpdatingTracking".split(" "),
function(H,I,n,e,g,p,q,h,r,t,u,k,v,d,w,x,y,z,A,B,C,D,E,F,G){var l={remove:function(){},pause:function(){},resume:function(){}};return function(m){function b(a){a=m.call(this,a)||this;a.graphicsCore=null;a.elevationAlignment=new C;a.watchUpdatingTracking=new G.WatchUpdatingTracking;a.handles=new u;a.suspendResumeExtent=null;return a}n(b,m);b.prototype.normalizeCtorArgs=function(a){var b=null;a.scaleVisibilityEnabled&&(a=g({},a),delete a.scaleVisibilityEnabled,b=new E);var c=new B.Graphics3DCore({owner:a.owner,
layer:a.layer,preferredUpdatePolicy:0,graphicSymbolSupported:!0});return g({},a,{graphicsCore:c,scaleVisibility:b})};b.prototype.initialize=function(){var a=this;this.scaleVisibility&&"minScale"in this.layer&&this.watchUpdatingTracking.add(this.layer,"scaleRangeId",function(){return a.scaleVisibility.layerMinMaxScaleChangeHandler()});this.elevationAlignment&&"elevationInfo"in this.layer&&this.watchUpdatingTracking.add(this.layer,"elevationInfo",function(b,c){w.diff(b,c)&&a.watchUpdatingTracking.addPromise(a.graphicsCore.elevationInfoChange())})};
b.prototype.setup=function(){return q(this,void 0,void 0,function(){var a,b,c,d=this;return p(this,function(f){switch(f.label){case 0:a=function(a,b,f){return d.graphicsCore.spatialIndex.queryGraphicUIDsInExtent(a,b,f)},this.elevationAlignment.setup(this.owner,a,this.graphicsCore,this.view.elevationProvider),this.scaleVisibility&&"minScale"in this.layer&&(b=this.owner.view.basemapTerrain,this.scaleVisibility.setup(this.owner,this.layer,a,this.graphicsCore,b)),this._set("objectStates",new D.Graphics3DObjectStates(this.graphicsCore)),
f.label=1;case 1:return f.trys.push([1,3,,4]),[4,this.graphicsCore.setup({elevationAlignment:this.elevationAlignment,scaleVisibility:this.scaleVisibility,objectStates:this.objectStates})];case 2:return f.sent(),[3,4];case 3:c=f.sent();if(k.isAbortError(c))return[2];throw c;case 4:return this.handles.add(this.view.watch("clippingArea",function(){return d.updateClippingExtent()},!0)),this.updateClippingExtent(),this.setupSuspendResumeExtent(),this.graphicsCore.startCreateGraphics(),[2]}})})};b.prototype.destroy=
function(){this.handles&&(this.handles.destroy(),this.handles=null);this.watchUpdatingTracking.destroy();this.elevationAlignment&&(this.elevationAlignment.destroy(),this._set("elevationAlignment",null));this.scaleVisibility&&(this.scaleVisibility.destroy(),this._set("scaleVisibility",null));this.objectStates&&(this.objectStates.destroy(),this._set("objectStates",null));this.graphicsCore&&(this.graphicsCore.destroy(),this._set("graphicsCore",null))};Object.defineProperty(b.prototype,"suspended",{get:function(){return!(!this.scaleVisibility||
!this.scaleVisibility.suspended)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"updating",{get:function(){return!!(this.graphicsCore&&this.graphicsCore.updating||this.scaleVisibility&&this.scaleVisibility.updating||this.watchUpdatingTracking&&this.watchUpdatingTracking.updating)},enumerable:!0,configurable:!0});b.prototype.getGraphicFromGraphicUid=function(a){if(this.owner.loadedGraphics){var b=this.owner.loadedGraphics.find(function(b){return b.uid===a});if(b)return y.hydrateGraphic(b,
this.layer instanceof x?this.layer:null)}};b.prototype.whenGraphicBounds=function(a,b){return this.graphicsCore?this.graphicsCore.whenGraphicBounds(a,b):k.reject()};b.prototype.computeAttachmentOrigin=function(a,b){return this.graphicsCore?this.graphicsCore.computeAttachmentOrigin(a,b):null};b.prototype.getSymbolLayerSize=function(a,b){return this.graphicsCore?this.graphicsCore.getSymbolLayerSize(a,b):null};b.prototype.occlude=function(a){var b=this.objectStates.acquireSet(1,null),c=b.handle;this.objectStates.setUid(b.set,
a.uid);return c};b.prototype.highlight=function(a){if(a instanceof z)return l;if("number"===typeof a||a instanceof h)return this.highlight([a]);a instanceof t&&(a=a.toArray());if(Array.isArray(a)&&0<a.length){if(a[0]instanceof h){var b=a.map(function(a){return a.uid}),c=this.objectStates.acquireSet(0,null);a=c.set;c=c.handle;this.objectStates.setUids(a,b);return c}if("number"===typeof a[0])return b=a,c=this.objectStates.acquireSet(0,null),a=c.set,c=c.handle,this.objectStates.setObjectIds(a,b),c}return l};
b.prototype.updateClippingExtent=function(){this.graphicsCore.setClippingExtent(this.view.clippingArea,this.view.spatialReference)&&this.graphicsCore.recreateAllGraphics()};b.prototype.setupSuspendResumeExtent=function(){var a=this;this.scaleVisibility&&v.init(this.graphicsCore,"computedExtent",function(b){a.suspendResumeExtent=F.enlargeExtent(b,a.suspendResumeExtent,A.SUSPEND_RESUME_EXTENT_OPTIMISM);a.scaleVisibility.setExtent(a.suspendResumeExtent)},!0)};e([d.property({constructOnly:!0})],b.prototype,
"owner",void 0);e([d.property({constructOnly:!0})],b.prototype,"layer",void 0);e([d.property({readOnly:!0,aliasOf:"owner.view"})],b.prototype,"view",void 0);e([d.property({constructOnly:!0})],b.prototype,"graphicsCore",void 0);e([d.property({constructOnly:!0})],b.prototype,"scaleVisibility",void 0);e([d.property({readOnly:!0})],b.prototype,"elevationAlignment",void 0);e([d.property({readOnly:!0})],b.prototype,"objectStates",void 0);e([d.property({readOnly:!0})],b.prototype,"watchUpdatingTracking",
void 0);e([d.property({readOnly:!0,dependsOn:["scaleVisibility.suspended"]})],b.prototype,"suspended",null);e([d.property({readOnly:!0,dependsOn:["graphicsCore.updating","scaleVisibility.updating","watchUpdatingTracking.updating"]})],b.prototype,"updating",null);return b=e([d.subclass("esri.views.3d.layers.graphics.Graphics3DGraphicLikeLayerView")],b)}(d.declared(r))});