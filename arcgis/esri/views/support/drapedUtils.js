// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.14/esri/copyright.txt for details.
//>>built
define("require exports ../../geometry ../../core/maybe ../../core/unitUtils ../../renderers/support/clickToleranceUtils".split(" "),function(r,h,k,n,l,p){function m(a,d,b,c){void 0===c&&(c=new k.Extent);var g;if("2d"===b.type)g=d*b.resolution;else if("3d"===b.type){var e=b.basemapTerrain,f=e.overlayManager,f=f?f.overlayPixelSizeInMapUnits(a):1;g=e&&!e.spatialReference.equals(b.spatialReference)?l.getMetersPerUnitForSR(e.spatialReference)/l.getMetersPerUnitForSR(b.spatialReference):d*f}d=a.x-g;e=
a.y-g;f=a.x+g;a=a.y+g;b=b.spatialReference;c.xmin=Math.min(d,f);c.ymin=Math.min(e,a);c.xmax=Math.max(d,f);c.ymax=Math.max(e,a);c.spatialReference=b;return c}Object.defineProperty(h,"__esModule",{value:!0});h.createQueryGeometry=m;h.intersectsDrapedGeometry=function(a,d,b){a=b.toMap(a);if(n.isNone(a))return null;var c=p.calculateTolerance();return m(a,c,b,q).intersects(d)?a:null};var q=new k.Extent});