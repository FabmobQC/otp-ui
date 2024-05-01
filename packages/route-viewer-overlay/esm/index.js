import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { util } from "@opentripplanner/base-map";
import { LngLatBounds } from "maplibre-gl";
import { Layer, Source, useMap } from "react-map-gl";
import React, { useEffect } from "react";
import polyline from "@mapbox/polyline";
import pointInPolygon from "point-in-polygon";
import { objectExistsAndPopulated } from "./util";

// helper fn to check if geometry has been populated for all patterns in route
var isGeometryComplete = function isGeometryComplete(routeData) {
  return (routeData === null || routeData === void 0 ? void 0 : routeData.patterns) && Object.values(routeData.patterns).every(function (ptn) {
    return typeof (ptn === null || ptn === void 0 ? void 0 : ptn.geometry) !== "undefined";
  });
};
/**
 * helper function that removes all points from array of points that are
 * within flex zones defined in an array of stops
 * @param {*} stops   OTP stops response
 * @param {*} points  Array of coordinates to clip
 * @returns           The array of coordinates without coordinates within the stops
 */


var removePointsInFlexZone = function removePointsInFlexZone(stops, points) {
  // First, go through all stops to find flex zones
  var bboxes = (stops // Although it is less clean, doing a single map with many if conditions
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
  .map(function (stop) {
    var _stop$geometries, _stop$geometries$geoJ, _stop$geometries$geoJ2;

    if (((_stop$geometries = stop.geometries) === null || _stop$geometries === void 0 ? void 0 : (_stop$geometries$geoJ = _stop$geometries.geoJson) === null || _stop$geometries$geoJ === void 0 ? void 0 : _stop$geometries$geoJ.type) !== "Polygon") {
      return null;
    }

    return ((_stop$geometries$geoJ2 = stop.geometries.geoJson.coordinates) === null || _stop$geometries$geoJ2 === void 0 ? void 0 : _stop$geometries$geoJ2[0]) || null;
  }) // Remove the null entries
  // This filter is required, as there is no way to have map not return a value
  .filter(function (bbox) {
    return !!bbox;
  })) || []; // Points we keep can't be in any of the flex zones

  return points.filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        y = _ref2[0],
        x = _ref2[1];

    return bboxes.every(function (bbox) {
      return !pointInPolygon([x, y], bbox);
    });
  });
};
/**
 * Reducer helper for computing the bounds of a geometry.
 */


var reduceBounds = function reduceBounds(bnds, coord) {
  return bnds.extend(coord);
};
/**
 * An overlay that will display all polylines of the patterns of a route.
 */


var RouteViewerOverlay = function RouteViewerOverlay(props) {
  var _useMap = useMap(),
      current = _useMap.current;

  var routeData = props.routeData;
  var patterns = Object.values(routeData.patterns);
  useEffect(function () {
    // if pattern geometry updated, update the map points
    var bounds;
    var timeout;

    if (isGeometryComplete(routeData)) {
      var allPoints = patterns.reduce(function (acc, ptn) {
        return acc.concat(polyline.decode(ptn.geometry.points));
      }, []);

      if (allPoints.length > 0) {
        var geoJsonedPoints = allPoints.map(function (c) {
          return [c[1], c[0]];
        });
        bounds = geoJsonedPoints.reduce(reduceBounds, new LngLatBounds(geoJsonedPoints[0], geoJsonedPoints[0]));
      }
    }

    patterns.forEach(function (ptn) {
      var _ptn$stops;

      (_ptn$stops = ptn.stops) === null || _ptn$stops === void 0 ? void 0 : _ptn$stops.forEach(function (stop) {
        var _ref3 = stop.geometries || {},
            geoJson = _ref3.geoJson;

        if ((geoJson === null || geoJson === void 0 ? void 0 : geoJson.type) === "Polygon") {
          // If flex location, add the polygon (the first and only entry in coordinates) to the route bounds.
          var coordsArray = geoJson.coordinates[0];
          bounds = coordsArray.reduce(reduceBounds, bounds || new LngLatBounds(coordsArray[0], coordsArray[0]));
        } else if (geoJson) {
          // Regular stops might be (well) outside of route pattern shapes, so add them.
          var coords = geoJson.coordinates;
          bounds = bounds ? bounds.extend(coords) : new LngLatBounds(coords, coords);
        }
      });
    });

    if (objectExistsAndPopulated(bounds) && current) {
      // Try to fit the map to route bounds immediately. If other overlays are still populating contents
      // and/or the map skips/aborts fitting for any reason, try fitting bounds again after a short delay.
      var fitBounds = function fitBounds() {
        return util.fitMapBounds(current, bounds);
      };

      fitBounds();
      timeout = setTimeout(fitBounds, 250);

      if (props.mapCenterCallback) {
        props.mapCenterCallback();
      }
    } // Clear any timeouts when the component unmounts.


    return function () {
      return clearTimeout(timeout);
    };
  }, [routeData, patterns, current]);
  var clipToPatternStops = props.clipToPatternStops,
      path = props.path; // Null can't be returned here -- react-map-gl dislikes null values as children

  if (!routeData || !routeData.patterns) return /*#__PURE__*/React.createElement(React.Fragment, null);
  var routeColor = routeData.color ? "#".concat(routeData.color) : (path === null || path === void 0 ? void 0 : path.color) || "#00bfff";
  var segments = patterns.filter(function (pattern) {
    return objectExistsAndPopulated(pattern === null || pattern === void 0 ? void 0 : pattern.geometry);
  }).map(function (pattern) {
    var pts = polyline.decode(pattern.geometry.points);
    var clippedPts = clipToPatternStops ? removePointsInFlexZone(pattern === null || pattern === void 0 ? void 0 : pattern.stops, pts) : pts;
    return clippedPts.map(function (pt) {
      return [pt[1], pt[0]];
    });
  });
  var geojson = {
    type: "FeatureCollection",
    features: segments.map(function (segment) {
      return {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: segment
        },
        properties: []
      };
    })
  };
  return segments.length > 0 ? /*#__PURE__*/React.createElement(Source, {
    id: "route",
    type: "geojson",
    data: geojson
  }, /*#__PURE__*/React.createElement(Layer, {
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
  })) : /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default RouteViewerOverlay;
//# sourceMappingURL=index.js.map