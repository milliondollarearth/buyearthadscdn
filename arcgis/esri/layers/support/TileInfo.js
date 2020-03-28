// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/assignHelper ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../geometry ../../core/jsonMap ../../core/JSONSupport ../../core/unitUtils ../../core/accessorSupport/decorators ../../core/accessorSupport/ensureType ../../geometry/support/aaBoundingRect ../../geometry/support/spatialReferenceUtils ../../geometry/support/webMercatorUtils ./LOD".split(" "),function(C,D,v,w,f,k,x,y,z,c,q,r,l,A,B){var t=new x.default({PNG:"png",
PNG8:"png8",PNG24:"png24",PNG32:"png32",JPEG:"jpg",JPG:"jpg",DIB:"dib",TIFF:"tiff",EMF:"emf",PS:"ps",PDF:"pdf",GIF:"gif",SVG:"svg",SVGZ:"svgz",Mixed:"mixed",MIXED:"mixed",LERC:"lerc",pbf:"pbf"});return function(u){function b(a){a=u.call(this,a)||this;a.dpi=96;a.format=null;a.origin=null;a.minScale=0;a.maxScale=0;a.size=null;a.spatialReference=null;return a}w(b,u);m=b;b.create=function(a){void 0===a&&(a={size:256,spatialReference:k.SpatialReference.WebMercator});var d=a.resolutionFactor||1,h=a.scales,
e=a.size||256;a=a.spatialReference||k.SpatialReference.WebMercator;if(!l.isValid(a)){d=[];if(h)for(var b=0;b<h.length;b++){var g=h[b];d.push({level:b,scale:g,resolution:g})}else for(var c=5E-4,b=23;0<=b;b--)d.unshift({level:b,scale:c,resolution:c}),c*=2;return new m({dpi:96,lods:d,origin:new k.Point(0,0,a),size:[e,e],spatialReference:a})}var f=(b=l.getInfo(a))?new k.Point(b.origin[0],b.origin[1],a):new k.Point(0,0,a),p=1/(39.37*z.getMetersPerUnitForSR(a)*96),n=[];if(h)for(b=0;b<h.length;b++)g=h[b],
c=g*p,n.push({level:b,scale:g,resolution:c});else for(g=l.isGeographic(a)?512/e*5.916575275917094E8:256/e*5.91657527591555E8,h=Math.ceil(24/d),n.push({level:0,scale:g,resolution:g*p}),b=1;b<h;b++)g/=Math.pow(2,d),c=g*p,n.push({level:b,scale:g,resolution:c});return new m({dpi:96,lods:n,origin:f,size:[e,e],spatialReference:a})};Object.defineProperty(b.prototype,"isWrappable",{get:function(){var a=this.spatialReference,d=this.origin;if(a&&d){var b=l.getInfo(a);return a.isWrappable&&Math.abs(b.origin[0]-
d.x)<=b.dx}return!1},enumerable:!0,configurable:!0});b.prototype.readOrigin=function(a,d){return k.Point.fromJSON(v({spatialReference:d.spatialReference},a))};Object.defineProperty(b.prototype,"lods",{set:function(a){var d=this,b=0,e=0,c=[];this._levelToLOD={};a&&(b=-Infinity,e=Infinity,a.forEach(function(a){c.push(a.scale);b=a.scale>b?a.scale:b;e=a.scale<e?a.scale:e;d._levelToLOD[a.level]=a}));this._set("scales",c);this._set("minScale",b);this._set("maxScale",e);this._set("lods",a);this._initializeUpsampleLevels()},
enumerable:!0,configurable:!0});b.prototype.readSize=function(a,d){return[d.cols,d.rows]};b.prototype.writeSize=function(a,d){d.cols=a[0];d.rows=a[0]};b.prototype.zoomToScale=function(a){var d=this.scales;if(0>=a)return d[0];if(a>=d.length)return d[d.length-1];var b=Math.round(a);return d[b]+(b-a)*(d[Math.round(a-.5)]-d[b])};b.prototype.scaleToZoom=function(a){for(var d=this.scales,b=d.length-1,e=0;e<b;e++){var c=d[e],g=d[e+1];if(c<=a)break;if(g===a)return e+1;if(c>a&&g<a)return e+1-(a-g)/(c-g)}return e};
b.prototype.snapScale=function(a,b){void 0===b&&(b=.95);a=this.scaleToZoom(a);return a%Math.floor(a)>=b?this.zoomToScale(Math.ceil(a)):this.zoomToScale(Math.floor(a))};b.prototype.tileAt=function(a,b,c,e){var d=this.lodAt(a);if(!d)return null;var h;if("number"===typeof b)h=b,b=c;else{if(l.equals(b.spatialReference,this.spatialReference))h=b.x,b=b.y;else{e=A.project(b,this.spatialReference);if(!e)return null;h=e.x;b=e.y}e=c}c=d.resolution*this.size[0];d=d.resolution*this.size[1];e||(e={id:null,level:0,
row:0,col:0,extent:r.create()});e.level=a;e.row=Math.floor((this.origin.y-b)/d+.001);e.col=Math.floor((h-this.origin.x)/c+.001);this.updateTileInfo(e);return e};b.prototype.updateTileInfo=function(a){var b=this.lodAt(a.level);if(b){var c=b.resolution*this.size[0],b=b.resolution*this.size[1];a.id=a.level+"/"+a.row+"/"+a.col;a.extent||(a.extent=r.create());a.extent[0]=this.origin.x+a.col*c;a.extent[1]=this.origin.y-(a.row+1)*b;a.extent[2]=a.extent[0]+c;a.extent[3]=a.extent[1]+b}};b.prototype.upsampleTile=
function(a){var b=this._upsampleLevels[a.level];if(!b||-1===b.parentLevel)return!1;a.level=b.parentLevel;a.row=Math.floor(a.row/b.factor+.001);a.col=Math.floor(a.col/b.factor+.001);this.updateTileInfo(a);return!0};b.prototype.getTileBounds=function(a,b){var d=this.lodAt(b.level).resolution,e=d*this.size[0],d=d*this.size[1];a[0]=this.origin.x+b.col*e;a[1]=this.origin.y-(b.row+1)*d;a[2]=a[0]+e;a[3]=a[1]+d;return a};b.prototype.lodAt=function(a){return this._levelToLOD&&this._levelToLOD[a]||null};b.prototype.clone=
function(){return m.fromJSON(this.write({}))};b.prototype._initializeUpsampleLevels=function(){var a=this.lods;this._upsampleLevels=[];for(var b=null,c=0;c<a.length;c++){var e=a[c];this._upsampleLevels[e.level]={parentLevel:b?b.level:-1,factor:b?b.resolution/e.resolution:0};b=e}};var m;f([c.property({type:Number,json:{write:!0}})],b.prototype,"compressionQuality",void 0);f([c.property({type:Number,json:{write:!0}})],b.prototype,"dpi",void 0);f([c.property({type:String,json:{read:t.read,write:t.write,
origins:{"web-scene":{read:!1,write:!1}}}})],b.prototype,"format",void 0);f([c.property({readOnly:!0,dependsOn:["spatialReference","origin"]})],b.prototype,"isWrappable",null);f([c.property({type:k.Point,json:{write:!0}})],b.prototype,"origin",void 0);f([c.reader("origin")],b.prototype,"readOrigin",null);f([c.property({type:[B],value:null,json:{write:!0}})],b.prototype,"lods",null);f([c.property({readOnly:!0})],b.prototype,"minScale",void 0);f([c.property({readOnly:!0})],b.prototype,"maxScale",void 0);
f([c.property({readOnly:!0})],b.prototype,"scales",void 0);f([c.property({cast:function(a){return Array.isArray(a)?a:"number"===typeof a?[a,a]:[256,256]}})],b.prototype,"size",void 0);f([c.reader("size",["rows","cols"])],b.prototype,"readSize",null);f([c.writer("size",{cols:{type:q.Integer},rows:{type:q.Integer}})],b.prototype,"writeSize",null);f([c.property({type:k.SpatialReference,json:{write:!0}})],b.prototype,"spatialReference",void 0);return b=m=f([c.subclass("esri.layers.support.TileInfo")],
b)}(c.declared(y.JSONSupport))});