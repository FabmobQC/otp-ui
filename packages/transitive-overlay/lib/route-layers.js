"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patternToRouteFeature = patternToRouteFeature;
exports.getRouteLayerLayout = getRouteLayerLayout;

var _polyline = _interopRequireDefault(require("@mapbox/polyline"));

var _util = require("./util");

/**
 * Create a labeled-line feature for the given transit route pattern.
 */
function patternToRouteFeature(pattern, routes) {
  var _pattern$stops$stop_i;

  const route = routes.find(r => r.route_id === pattern.route_id); // Concatenate geometries (arrays of coordinates) to help maplibre spread out labels (not perfect).

  const concatenatedLines = pattern.stops.map(stop => stop.geometry).filter(geometry => !!geometry).reduce((result, geom, index) => {
    const coords = _polyline.default.decode(geom); // Remove the first element (except for the first array) because it is a duplicate
    // of the last element of the previous array.


    if (index !== 0) coords.shift();
    return result.concat(coords);
  }, []);
  const routeName = route.route_short_name || route.route_long_name || ""; // HACK: Create an uppercase version of the route name to paint the background, where
  // - spaces are replaced with '!' (~same width as space)
  // - "+", "-", certain letters and numbers are replaced with "E" to create a background with a uniform height and fill.
  // Also, ensure there is a minimum background width (3 characters).
  // Disclaimer: height of substitution characters can vary from font to font.

  const routeNameUpper = (routeName.length < 3 ? "EEE" : routeName).toUpperCase().replace(/\s/g, "!").replace(/[+-0124679FHJLPTVXYZ]/g, "E");
  const properties = {
    color: `#${route.route_color || "000080"}`,
    name: routeName,
    nameUpper: routeNameUpper,
    routeType: route.route_type,
    textColor: `#${route.route_text_color || "eee"}`,
    type: "route"
  };
  const isFlex = (_pattern$stops$stop_i = pattern.stops[pattern.stops.length - 1].stop_id) === null || _pattern$stops$stop_i === void 0 ? void 0 : _pattern$stops$stop_i.endsWith("flexed_to");

  const straight = _polyline.default.toGeoJSON(_polyline.default.encode(concatenatedLines));

  return {
    geometry: isFlex ? (0, _util.drawArc)(straight) : straight,
    properties,
    type: "Feature"
  };
}
/**
 * Obtains common layout options for route label layers.
 */


function getRouteLayerLayout(textField) {
  return {
    "symbol-placement": "line-center",
    "text-allow-overlap": true,
    "text-field": ["get", textField],
    "text-ignore-placement": true,
    "text-rotation-alignment": "viewport",
    "text-size": 16
  };
}
//# sourceMappingURL=route-layers.js.map