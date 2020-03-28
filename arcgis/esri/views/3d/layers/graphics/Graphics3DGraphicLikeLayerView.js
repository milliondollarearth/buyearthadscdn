// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/decorateHelper ../../../../core/tsSupport/assignHelper ../../../../core/tsSupport/generatorHelper ../../../../core/tsSupport/awaiterHelper ../../../../Graphic ../../../../core/Accessor ../../../../core/Collection ../../../../core/Handles ../../../../core/promiseUtils ../../../../core/watchUtils ../../../../core/accessorSupport/decorators ../../../../core/accessorSupport/diffUtils ../../../../layers/Layer ../../../../layers/graphics/dehydratedFeatures ../../../../tasks/support/Query ./constants ./Graphics3DCore ./Graphics3DElevationAlignment ./Graphics3DHighlights ./Graphics3DScaleVisibility ./graphicUtils ../../../support/WatchUpdatingTracking".split(" "),
function(H,I,m,e,g,n,p,h,q,r,t,u,v,d,w,x,y,z,A,B,C,D,E,F,G){var k={remove:function(){},pause:function(){},resume:function(){}};return function(l){function a(b){b=l.call(this,b)||this;b.graphicsCore=null;b.elevationAlignment=new C;b.highlights=new D;b.watchUpdatingTracking=new G.WatchUpdatingTracking;b.handles=new t;b.suspendResumeExtent=null;return b}m(a,l);a.prototype.normalizeCtorArgs=function(b){var f=null;b.scaleVisibilityEnabled&&(b=g({},b),delete b.scaleVisibilityEnabled,f=new E);var a=new B({owner:b.owner,
layer:b.layer,preferredUpdatePolicy:0,graphicSymbolSupported:!0});return g({},b,{graphicsCore:a,scaleVisibility:f})};a.prototype.initialize=function(){var b=this;this.scaleVisibility&&"minScale"in this.layer&&this.watchUpdatingTracking.add(this.layer,"scaleRangeId",function(){return b.scaleVisibility.layerMinMaxScaleChangeHandler()});this.elevationAlignment&&"elevationInfo"in this.layer&&this.watchUpdatingTracking.add(this.layer,"elevationInfo",function(a,c){w.diff(a,c)&&b.watchUpdatingTracking.addPromise(b.graphicsCore.elevationInfoChange())})};
a.prototype.setup=function(){return p(this,void 0,void 0,function(){var b,a,c=this;return n(this,function(f){switch(f.label){case 0:return b=function(b,a,f){return c.graphicsCore.spatialIndex.queryGraphicUIDsInExtent(b,a,f)},this.elevationAlignment.setup(this.owner,b,this.graphicsCore,this.view.elevationProvider),this.scaleVisibility&&"minScale"in this.layer&&(a=this.owner.view.basemapTerrain,this.scaleVisibility.setup(this.owner,this.layer,b,this.graphicsCore,a)),this.highlights&&this.highlights.setup(this.graphicsCore),
[4,this.graphicsCore.setup({elevationAlignment:this.elevationAlignment,scaleVisibility:this.scaleVisibility,highlights:this.highlights})];case 1:return f.sent(),this.handles.add(this.view.watch("clippingArea",function(){return c.updateClippingExtent()},!0)),this.updateClippingExtent(),this.setupSuspendResumeExtent(),this.graphicsCore.startCreateGraphics(),[2]}})})};a.prototype.destroy=function(){this.handles&&(this.handles.destroy(),this.handles=null);this.watchUpdatingTracking.destroy();this.elevationAlignment&&
(this.elevationAlignment.destroy(),this._set("elevationAlignment",null));this.scaleVisibility&&(this.scaleVisibility.destroy(),this._set("scaleVisibility",null));this.highlights&&(this.highlights.destroy(),this._set("highlights",null));this.graphicsCore&&(this.graphicsCore.destroy(),this._set("graphicsCore",null))};Object.defineProperty(a.prototype,"suspended",{get:function(){return!(!this.scaleVisibility||!this.scaleVisibility.suspended)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,
"updating",{get:function(){return!!(this.graphicsCore&&this.graphicsCore.updating||this.scaleVisibility&&this.scaleVisibility.updating||this.watchUpdatingTracking&&this.watchUpdatingTracking.updating)},enumerable:!0,configurable:!0});a.prototype.getGraphicFromGraphicUid=function(b){if(this.owner.loadedGraphics){var a=this.owner.loadedGraphics.find(function(a){return a.uid===b});if(a)return y.hydrateGraphic(a,this.layer instanceof x?this.layer:null)}};a.prototype.whenGraphicBounds=function(b,a){return this.graphicsCore?
this.graphicsCore.whenGraphicBounds(b,a):u.reject()};a.prototype.computeAttachmentOrigin=function(b,a){return this.graphicsCore?this.graphicsCore.computeAttachmentOrigin(b,a):null};a.prototype.getSymbolLayerSize=function(b,a){return this.graphicsCore?this.graphicsCore.getSymbolLayerSize(b,a):null};a.prototype.highlight=function(b,a){void 0===a&&(a={});if(b instanceof z)return k;if("number"===typeof b||b instanceof h)return this.highlight([b],a);b instanceof r&&(b=b.toArray());if(Array.isArray(b)&&
0<b.length){if(b[0]instanceof h){b=b.map(function(a){return a.uid});var c=this.highlights.acquireSet(a,null);a=c.set;c=c.handle;this.highlights.setUids(a,b);return c}if("number"===typeof b[0])return c=this.highlights.acquireSet(a,null),a=c.set,c=c.handle,this.highlights.setObjectIds(a,b),c}return k};a.prototype.updateClippingExtent=function(){this.graphicsCore.setClippingExtent(this.view.clippingArea,this.view.spatialReference)&&this.graphicsCore.recreateAllGraphics()};a.prototype.setupSuspendResumeExtent=
function(){var a=this;this.scaleVisibility&&v.init(this.graphicsCore,"computedExtent",function(b){a.suspendResumeExtent=F.enlargeExtent(b,a.suspendResumeExtent,A.SUSPEND_RESUME_EXTENT_OPTIMISM);a.scaleVisibility.setExtent(a.suspendResumeExtent)},!0)};e([d.property({constructOnly:!0})],a.prototype,"owner",void 0);e([d.property({constructOnly:!0})],a.prototype,"layer",void 0);e([d.property({readOnly:!0,aliasOf:"owner.view"})],a.prototype,"view",void 0);e([d.property({constructOnly:!0})],a.prototype,
"graphicsCore",void 0);e([d.property({constructOnly:!0})],a.prototype,"scaleVisibility",void 0);e([d.property({readOnly:!0})],a.prototype,"elevationAlignment",void 0);e([d.property({readOnly:!0})],a.prototype,"highlights",void 0);e([d.property({readOnly:!0})],a.prototype,"watchUpdatingTracking",void 0);e([d.property({readOnly:!0,dependsOn:["scaleVisibility.suspended"]})],a.prototype,"suspended",null);e([d.property({readOnly:!0,dependsOn:["graphicsCore.updating","scaleVisibility.updating","watchUpdatingTracking.updating"]})],
a.prototype,"updating",null);return a=e([d.subclass("esri.views.3d.layers.graphics.Graphics3DGraphicLikeLayerView")],a)}(d.declared(q))});