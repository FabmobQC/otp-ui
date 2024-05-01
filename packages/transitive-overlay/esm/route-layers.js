import polyline from "@mapbox/polyline";
import { drawArc } from "./util";
/**
 * Create a labeled-line feature for the given transit route pattern.
 */

export function patternToRouteFeature(pattern, routes) {
  var _pattern$stops$stop_i;

  var route = routes.find(function (r) {
    return r.route_id === pattern.route_id;
  }); // Concatenate geometries (arrays of coordinates) to help maplibre spread out labels (not perfect).

  var concatenatedLines = pattern.stops.map(function (stop) {
    return stop.geometry;
  }).filter(function (geometry) {
    return !!geometry;
  }).reduce(function (result, geom, index) {
    var coords = polyline.decode(geom); // Remove the first element (except for the first array) because it is a duplicate
    // of the last element of the previous array.

    if (index !== 0) coords.shift();
    return result.concat(coords);
  }, []);
  var routeName = route.route_short_name || route.route_long_name || ""; // HACK: Create an uppercase version of the route name to paint the background, where
  // - spaces are replaced with '!' (~same width as space)
  // - "+", "-", certain letters and numbers are replaced with "E" to create a background with a uniform height and fill.
  // Also, ensure there is a minimum background width (3 characters).
  // Disclaimer: height of substitution characters can vary from font to font.

  var routeNameUpper = (routeName.length < 3 ? "EEE" : routeName).toUpperCase().replace(/\s/g, "!").replace(/[+-0124679FHJLPTVXYZ]/g, "E");
  var properties = {
    color: "#".concat(route.route_color || "000080"),
    name: routeName,
    nameUpper: routeNameUpper,
    routeType: route.route_type,
    textColor: "#".concat(route.route_text_color || "eee"),
    type: "route"
  };
  var isFlex = (_pattern$stops$stop_i = pattern.stops[pattern.stops.length - 1].stop_id) === null || _pattern$stops$stop_i === void 0 ? void 0 : _pattern$stops$stop_i.endsWith("flexed_to");
  var straight = polyline.toGeoJSON(polyline.encode(concatenatedLines));
  return {
    geometry: isFlex ? drawArc(straight) : straight,
    properties: properties,
    type: "Feature"
  };
}
/**
 * Obtains common layout options for route label layers.
 */

export function getRouteLayerLayout(textField) {
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