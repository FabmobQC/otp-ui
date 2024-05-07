import polyline from "@mapbox/polyline";
import { LngLatBounds } from "maplibre-gl";
import { util } from "@opentripplanner/base-map";
import { Layer, Source, useMap } from "react-map-gl";
import React, { useEffect, useMemo } from "react";

var TripViewerOverlay = function TripViewerOverlay(props) {
  var path = props.path,
      tripData = props.tripData,
      visible = props.visible;
  if (!tripData) return null;
  var geometry = tripData.geometry;
  if (!geometry) return null;
  var pts = polyline.decode(geometry.points).map(function (pt) {
    return pt.reverse();
  });
  var bounds = useMemo(function () {
    return pts.reduce(function (bnds, coord) {
      return bnds.extend(coord);
    }, new LngLatBounds(pts[0], pts[0]));
  }, [pts]);

  var _useMap = useMap(),
      map = _useMap.current;

  useEffect(function () {
    if (map && bounds.length === 4 && bounds.every(Number.isFinite)) {
      util.fitMapBounds(map, bounds);
    }
  }, [map, bounds]);
  if (!visible || !pts) return null;
  var geojson = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: pts
    },
    properties: []
  };
  return /*#__PURE__*/React.createElement(Source, {
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
      "line-color": (path === null || path === void 0 ? void 0 : path.color) || "#00bfff",
      "line-opacity": (path === null || path === void 0 ? void 0 : path.opacity) || 0.6,
      "line-width": (path === null || path === void 0 ? void 0 : path.weight) || 8
    },
    type: "line"
  }));
};

export default TripViewerOverlay;
//# sourceMappingURL=index.js.map