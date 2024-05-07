import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { util } from "@opentripplanner/base-map";
import React, { useEffect } from "react";
import { Layer, Source, useMap } from "react-map-gl";
import polyline from "@mapbox/polyline";
import bbox from "@turf/bbox";
import { getRouteLayerLayout, patternToRouteFeature } from "./route-layers";
import { drawArc, getFromToAnchors, itineraryToTransitive } from "./util";
export { itineraryToTransitive }; // TODO: BETTER COLORS

var modeColorMap = {
  CAR: "#888",
  BICYCLE: "#f00",
  SCOOTER: "#f5a729",
  MICROMOBILITY: "#f5a729",
  MICROMOBILITY_RENT: "#f5a729",
  WALK: "#86cdf9"
};
/**
 * Apply a thin, white halo around the (black) text.
 */

var defaultTextPaintParams = {
  "text-halo-blur": 1,
  "text-halo-color": "#ffffff",
  "text-halo-width": 2
};
/**
 * Common text settings.
 */

var commonTextLayoutParams = {
  "symbol-placement": "point",
  "text-allow-overlap": false,
  "text-field": ["get", "name"],
  "text-justify": "auto",
  "text-radial-offset": 1,
  "text-size": 15
};
/**
 * Text size and layout that lets maplibre relocate text space permitting.
 */

var defaultTextLayoutParams = _objectSpread(_objectSpread({}, commonTextLayoutParams), {}, {
  "text-variable-anchor": ["left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"]
});
/**
 * Default text + bold default fonts
 */


var defaultBoldTextLayoutParams = _objectSpread(_objectSpread({}, commonTextLayoutParams), {}, {
  // FIXME: find a better way to set a bold font
  "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
  "text-overlap": "never"
});

var routeFilter = ["==", "type", "route"];
var stopFilter = ["==", "type", "stop"];
var accessLegFilter = ["match", ["get", "type"], ["BICYCLE", "SCOOTER", "MICROMOBILITY", "MICROMOBILITY_RENT", "CAR"], true, false];

var TransitiveCanvasOverlay = function TransitiveCanvasOverlay(_ref) {
  var activeLeg = _ref.activeLeg,
      transitiveData = _ref.transitiveData;

  var _useMap = useMap(),
      map = _useMap.current;

  var geojson = {
    type: "FeatureCollection",
    // @ts-expect-error TODO: fix the type above for geojson
    features: transitiveData ? [].concat(_toConsumableArray((transitiveData.places || []).flatMap(function (place) {
      return {
        type: "Feature",
        properties: {
          color: modeColorMap[place.type] || "#008",
          name: place.place_name,
          type: place.type || "place"
        },
        geometry: {
          type: "Point",
          coordinates: [place.place_lon, place.place_lat]
        }
      };
    })), _toConsumableArray((transitiveData.journeys || []).flatMap(function (journey) {
      return journey.segments.filter(function (segment) {
        var _segment$streetEdges;

        return ((_segment$streetEdges = segment.streetEdges) === null || _segment$streetEdges === void 0 ? void 0 : _segment$streetEdges.length) > 0;
      }).map(function (segment) {
        return _objectSpread(_objectSpread({}, segment), {}, {
          geometries: segment.streetEdges.map(function (edge) {
            return transitiveData.streetEdges.find(function (entry) {
              return entry.edge_id === edge;
            });
          })
        });
      }).flatMap(function (segment) {
        return segment.geometries.map(function (geometry) {
          var straight = polyline.toGeoJSON(geometry.geometry.points);
          return {
            type: "Feature",
            properties: {
              type: "street-edge",
              color: modeColorMap[segment.type] || "#008",
              mode: segment.type
            },
            geometry: segment.arc ? drawArc(straight) : straight
          };
        });
      });
    })), _toConsumableArray((transitiveData.journeys || []).flatMap(function (journey) {
      return journey.segments;
    }).filter(function (segment) {
      return segment.type === "TRANSIT";
    }).map(function (segment) {
      return transitiveData.patterns.find(function (p) {
        var _segment$patterns$;

        return p.pattern_id === ((_segment$patterns$ = segment.patterns[0]) === null || _segment$patterns$ === void 0 ? void 0 : _segment$patterns$.pattern_id);
      });
    }).filter(function (pattern) {
      return !!pattern;
    }).flatMap(function (pattern) {
      return pattern.stops.filter(function (_, index, stopsArr) {
        return index === 0 || index === stopsArr.length - 1;
      });
    }).map(function (pStop) {
      return (// pStop (from pattern.stops) only has an id (and sometimes line geometry)
        transitiveData.stops.find(function (stop) {
          return stop.stop_id === pStop.stop_id;
        })
      );
    }).map(function (stop) {
      return {
        type: "Feature",
        properties: {
          name: stop.stop_name,
          type: "stop"
        },
        geometry: {
          type: "Point",
          coordinates: [stop.stop_lon, stop.stop_lat]
        }
      };
    })), _toConsumableArray((transitiveData.patterns || []).flatMap(function (pattern) {
      return patternToRouteFeature(pattern, transitiveData.routes);
    }))) : []
  };

  var zoomToGeoJSON = function zoomToGeoJSON(geoJson) {
    var b = bbox(geoJson);
    var bounds = [b[0], b[1], b[2], b[3]];

    if (map && bounds.length === 4 && bounds.every(Number.isFinite)) {
      map.fitBounds(bounds, {
        duration: 500,
        padding: util.getFitBoundsPadding(map, 0.2)
      });
    }
  };

  useEffect(function () {
    zoomToGeoJSON(geojson);
  }, [transitiveData]);
  useEffect(function () {
    if (!(activeLeg !== null && activeLeg !== void 0 && activeLeg.legGeometry)) return;
    zoomToGeoJSON(polyline.toGeoJSON(activeLeg.legGeometry.points));
  }, [activeLeg]);
  if (!transitiveData) return /*#__PURE__*/React.createElement(React.Fragment, null);

  var _getFromToAnchors = getFromToAnchors(transitiveData),
      fromAnchor = _getFromToAnchors.fromAnchor,
      toAnchor = _getFromToAnchors.toAnchor; // Generally speaking, text/symbol layers placed first will be rendered in a lower layer
  // (or, if it is text, rendered with a lower priority or not at all if higher-priority text overlaps).


  return /*#__PURE__*/React.createElement(Source, {
    data: geojson,
    id: "itinerary",
    type: "geojson"
  }, /*#__PURE__*/React.createElement(Layer // This layer is for WALK modes - dotted path
  , {
    filter: ["all", ["==", "type", "street-edge"], ["==", "mode", "WALK"]],
    id: "street-edges-walk",
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      // TODO: get from transitive properties
      "line-color": ["get", "color"],
      // First parameter of array is the length of the dash which is set to zero,
      // so that maplibre simply adds the rounded ends to make things look like dots.
      // Even so, note that maplibre still renders beans instead of dots
      // (as if maplibre fuses dots together).
      "line-dasharray": [0, 1.3],
      "line-opacity": 0.9,
      "line-width": 6
    },
    type: "line"
  }), /*#__PURE__*/React.createElement(Layer // This layer is for other modes - dashed path
  , {
    filter: ["all", ["==", "type", "street-edge"], ["!=", "mode", "WALK"]],
    id: "street-edges",
    layout: {
      "line-cap": "butt"
    },
    paint: {
      // TODO: get from transitive properties
      "line-color": ["get", "color"],
      "line-dasharray": [2, 1],
      // TODO: get from transitive properties
      "line-width": 4,
      "line-opacity": 0.9
    },
    type: "line"
  }), /*#__PURE__*/React.createElement(Layer, {
    filter: routeFilter,
    id: "routes",
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": ["get", "color"],
      // Apply a thinner line (width = 6) for bus routes (route_type = 3), set width to 10 otherwise.
      "line-width": ["match", ["get", "routeType"], 3, 6, 10],
      "line-opacity": 1
    },
    type: "line"
  }), /*#__PURE__*/React.createElement(Layer, {
    filter: accessLegFilter,
    id: "access-leg-circles",
    paint: {
      "circle-color": ["get", "color"],
      "circle-radius": 8,
      "circle-stroke-color": "#fff",
      "circle-stroke-width": 3
    },
    type: "circle"
  }), /*#__PURE__*/React.createElement(Layer, {
    filter: stopFilter,
    id: "stops-circles",
    paint: {
      "circle-color": "#fff",
      "circle-radius": 7,
      "circle-stroke-width": 3
    },
    type: "circle"
  }), /*#__PURE__*/React.createElement(Layer, {
    filter: accessLegFilter,
    id: "access-leg-labels",
    layout: defaultTextLayoutParams,
    paint: defaultTextPaintParams,
    type: "symbol"
  }), /*#__PURE__*/React.createElement(Layer, {
    filter: stopFilter,
    id: "stops-labels",
    layout: defaultTextLayoutParams,
    paint: defaultTextPaintParams,
    type: "symbol"
  }), /*#__PURE__*/React.createElement(Layer // Render a solid background of fixed height using the uppercase route name.
  , {
    filter: routeFilter,
    id: "routes-labels-background",
    layout: getRouteLayerLayout("nameUpper"),
    paint: {
      "text-color": ["get", "color"],
      "text-halo-color": ["get", "color"],
      "text-halo-width": 4 // Max value is 1/4 of text size per maplibre docs.

    },
    type: "symbol"
  }), /*#__PURE__*/React.createElement(Layer // This layer renders transit route names (foreground).
  , {
    filter: routeFilter,
    id: "routes-labels",
    layout: getRouteLayerLayout("name"),
    paint: {
      "text-color": ["get", "textColor"]
    },
    type: "symbol"
  }), /*#__PURE__*/React.createElement(Layer, {
    filter: ["==", "type", "from"],
    id: "from-label",
    layout: _objectSpread(_objectSpread({}, defaultBoldTextLayoutParams), {}, {
      "text-anchor": fromAnchor
    }),
    paint: defaultTextPaintParams,
    type: "symbol"
  }), /*#__PURE__*/React.createElement(Layer, {
    filter: ["==", "type", "to"],
    id: "to-label",
    layout: _objectSpread(_objectSpread({}, defaultBoldTextLayoutParams), {}, {
      "text-anchor": toAnchor
    }),
    paint: _objectSpread(_objectSpread({}, defaultTextPaintParams), {}, {
      "text-color": "#910818"
    }),
    type: "symbol"
  }));
};

export default TransitiveCanvasOverlay;
//# sourceMappingURL=index.js.map