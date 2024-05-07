"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseMap = require("@opentripplanner/base-map");

var _maplibreGl = require("maplibre-gl");

var _reactMapGl = require("react-map-gl");

var _react = _interopRequireWildcard(require("react"));

var _polyline = _interopRequireDefault(require("@mapbox/polyline"));

var _pointInPolygon = _interopRequireDefault(require("point-in-polygon"));

var _util = require("./util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// helper fn to check if geometry has been populated for all patterns in route
const isGeometryComplete = routeData => (routeData === null || routeData === void 0 ? void 0 : routeData.patterns) && Object.values(routeData.patterns).every(ptn => typeof (ptn === null || ptn === void 0 ? void 0 : ptn.geometry) !== "undefined");
/**
 * helper function that removes all points from array of points that are
 * within flex zones defined in an array of stops
 * @param {*} stops   OTP stops response
 * @param {*} points  Array of coordinates to clip
 * @returns           The array of coordinates without coordinates within the stops
 */


const removePointsInFlexZone = (stops, points) => {
  // First, go through all stops to find flex zones
  const bboxes = (stops // Although it is less clean, doing a single map with many if conditions
  // is much faster than adding multiple filters (as the array is iterated over fewer times)
  // Adding a separate filter would increase the time spent processing the array, which
  // needs to be kept to a minimum as this is happening inside render()
  // For more detail see https://github.com/dg92/Performance-Analysis-JS/blob/master/small_data_set_result.png
  === null || stops // Although it is less clean, doing a single map with many if conditions
  // is much faster than adding multiple filters (as the array is iterated over fewer times)
  // Adding a separate filter would increase the time spent processing the array, which
  // needs to be kept to a minimum as this is happening inside render()
  // For more detail see https://github.com/dg92/Performance-Analysis-JS/blob/master/small_data_set_result.png
  === void 0 ? void 0 : stops // Although it is less clean, doing a single map with many if conditions
  // is much faster than adding multiple filters (as the array is iterated over fewer times)
  // Adding a separate filter would increase the time spent processing the array, which
  // needs to be kept to a minimum as this is happening inside render()
  // For more detail see https://github.com/dg92/Performance-Analysis-JS/blob/master/small_data_set_result.png
  .map(stop => {
    var _stop$geometries, _stop$geometries$geoJ, _stop$geometries$geoJ2;

    if (((_stop$geometries = stop.geometries) === null || _stop$geometries === void 0 ? void 0 : (_stop$geometries$geoJ = _stop$geometries.geoJson) === null || _stop$geometries$geoJ === void 0 ? void 0 : _stop$geometries$geoJ.type) !== "Polygon") {
      return null;
    }

    return ((_stop$geometries$geoJ2 = stop.geometries.geoJson.coordinates) === null || _stop$geometries$geoJ2 === void 0 ? void 0 : _stop$geometries$geoJ2[0]) || null;
  }) // Remove the null entries
  // This filter is required, as there is no way to have map not return a value
  .filter(bbox => !!bbox)) || []; // Points we keep can't be in any of the flex zones

  return points.filter(([y, x]) => bboxes.every(bbox => !(0, _pointInPolygon.default)([x, y], bbox)));
};
/**
 * Reducer helper for computing the bounds of a geometry.
 */


const reduceBounds = (bnds, coord) => bnds.extend(coord);
/**
 * An overlay that will display all polylines of the patterns of a route.
 */


const RouteViewerOverlay = props => {
  const {
    current
  } = (0, _reactMapGl.useMap)();
  const {
    routeData
  } = props;
  const patterns = Object.values(routeData.patterns);
  (0, _react.useEffect)(() => {
    // if pattern geometry updated, update the map points
    let bounds;
    let timeout;

    if (isGeometryComplete(routeData)) {
      const allPoints = patterns.reduce((acc, ptn) => {
        return acc.concat(_polyline.default.decode(ptn.geometry.points));
      }, []);

      if (allPoints.length > 0) {
        const geoJsonedPoints = allPoints.map(c => {
          return [c[1], c[0]];
        });
        bounds = geoJsonedPoints.reduce(reduceBounds, new _maplibreGl.LngLatBounds(geoJsonedPoints[0], geoJsonedPoints[0]));
      }
    }

    patterns.forEach(ptn => {
      var _ptn$stops;

      (_ptn$stops = ptn.stops) === null || _ptn$stops === void 0 ? void 0 : _ptn$stops.forEach(stop => {
        const {
          geoJson
        } = stop.geometries || {};

        if ((geoJson === null || geoJson === void 0 ? void 0 : geoJson.type) === "Polygon") {
          // If flex location, add the polygon (the first and only entry in coordinates) to the route bounds.
          const coordsArray = geoJson.coordinates[0];
          bounds = coordsArray.reduce(reduceBounds, bounds || new _maplibreGl.LngLatBounds(coordsArray[0], coordsArray[0]));
        } else if (geoJson) {
          // Regular stops might be (well) outside of route pattern shapes, so add them.
          const coords = geoJson.coordinates;
          bounds = bounds ? bounds.extend(coords) : new _maplibreGl.LngLatBounds(coords, coords);
        }
      });
    });

    if ((0, _util.objectExistsAndPopulated)(bounds) && current) {
      // Try to fit the map to route bounds immediately. If other overlays are still populating contents
      // and/or the map skips/aborts fitting for any reason, try fitting bounds again after a short delay.
      const fitBounds = () => _baseMap.util.fitMapBounds(current, bounds);

      fitBounds();
      timeout = setTimeout(fitBounds, 250);

      if (props.mapCenterCallback) {
        props.mapCenterCallback();
      }
    } // Clear any timeouts when the component unmounts.


    return () => clearTimeout(timeout);
  }, [routeData, patterns, current]);
  const {
    clipToPatternStops,
    path
  } = props; // Null can't be returned here -- react-map-gl dislikes null values as children

  if (!routeData || !routeData.patterns) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  const routeColor = routeData.color ? `#${routeData.color}` : (path === null || path === void 0 ? void 0 : path.color) || "#00bfff";
  const segments = patterns.filter(pattern => (0, _util.objectExistsAndPopulated)(pattern === null || pattern === void 0 ? void 0 : pattern.geometry)).map(pattern => {
    const pts = _polyline.default.decode(pattern.geometry.points);

    const clippedPts = clipToPatternStops ? removePointsInFlexZone(pattern === null || pattern === void 0 ? void 0 : pattern.stops, pts) : pts;
    return clippedPts.map(pt => [pt[1], pt[0]]);
  });
  const geojson = {
    type: "FeatureCollection",
    features: segments.map(segment => ({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: segment
      },
      properties: []
    }))
  };
  return segments.length > 0 ? /*#__PURE__*/_react.default.createElement(_reactMapGl.Source, {
    id: "route",
    type: "geojson",
    data: geojson
  }, /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
    id: "route",
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": (path === null || path === void 0 ? void 0 : path.color) || routeColor,
      "line-opacity": (path === null || path === void 0 ? void 0 : path.opacity) || 1,
      "line-width": (path === null || path === void 0 ? void 0 : path.weight) || 3
    },
    type: "line"
  })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
};

var _default = RouteViewerOverlay;
exports.default = _default;
//# sourceMappingURL=index.js.map