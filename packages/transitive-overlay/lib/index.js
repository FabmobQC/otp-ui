"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "itineraryToTransitive", {
  enumerable: true,
  get: function () {
    return _util.itineraryToTransitive;
  }
});
exports.default = void 0;

var _baseMap = require("@opentripplanner/base-map");

var _react = _interopRequireWildcard(require("react"));

var _reactMapGl = require("react-map-gl");

var _polyline = _interopRequireDefault(require("@mapbox/polyline"));

var _bbox = _interopRequireDefault(require("@turf/bbox"));

var _routeLayers = require("./route-layers");

var _util = require("./util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// TODO: BETTER COLORS
const modeColorMap = {
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

const defaultTextPaintParams = {
  "text-halo-blur": 1,
  "text-halo-color": "#ffffff",
  "text-halo-width": 2
};
/**
 * Common text settings.
 */

const commonTextLayoutParams = {
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

const defaultTextLayoutParams = { ...commonTextLayoutParams,
  "text-variable-anchor": ["left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"]
};
/**
 * Default text + bold default fonts
 */

const defaultBoldTextLayoutParams = { ...commonTextLayoutParams,
  // FIXME: find a better way to set a bold font
  "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
  "text-overlap": "never"
};
const routeFilter = ["==", "type", "route"];
const stopFilter = ["==", "type", "stop"];
const accessLegFilter = ["match", ["get", "type"], ["BICYCLE", "SCOOTER", "MICROMOBILITY", "MICROMOBILITY_RENT", "CAR"], true, false];

const TransitiveCanvasOverlay = ({
  activeLeg,
  transitiveData
}) => {
  const {
    current: map
  } = (0, _reactMapGl.useMap)();
  const geojson = {
    type: "FeatureCollection",
    // @ts-expect-error TODO: fix the type above for geojson
    features: transitiveData ? [...(transitiveData.places || []).flatMap(place => {
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
    }), ...(transitiveData.journeys || []).flatMap(journey => journey.segments.filter(segment => {
      var _segment$streetEdges;

      return ((_segment$streetEdges = segment.streetEdges) === null || _segment$streetEdges === void 0 ? void 0 : _segment$streetEdges.length) > 0;
    }).map(segment => ({ ...segment,
      geometries: segment.streetEdges.map(edge => {
        return transitiveData.streetEdges.find(entry => entry.edge_id === edge);
      })
    })).flatMap(segment => {
      return segment.geometries.map(geometry => {
        const straight = _polyline.default.toGeoJSON(geometry.geometry.points);

        return {
          type: "Feature",
          properties: {
            type: "street-edge",
            color: modeColorMap[segment.type] || "#008",
            mode: segment.type
          },
          geometry: segment.arc ? (0, _util.drawArc)(straight) : straight
        };
      });
    })), // Extract the first and last stops of each transit segment for display.
    ...(transitiveData.journeys || []).flatMap(journey => journey.segments).filter(segment => segment.type === "TRANSIT").map(segment => transitiveData.patterns.find(p => {
      var _segment$patterns$;

      return p.pattern_id === ((_segment$patterns$ = segment.patterns[0]) === null || _segment$patterns$ === void 0 ? void 0 : _segment$patterns$.pattern_id);
    })).filter(pattern => !!pattern).flatMap(pattern => pattern.stops.filter((_, index, stopsArr) => index === 0 || index === stopsArr.length - 1)).map(pStop => // pStop (from pattern.stops) only has an id (and sometimes line geometry)
    transitiveData.stops.find(stop => stop.stop_id === pStop.stop_id)).map(stop => ({
      type: "Feature",
      properties: {
        name: stop.stop_name,
        type: "stop"
      },
      geometry: {
        type: "Point",
        coordinates: [stop.stop_lon, stop.stop_lat]
      }
    })), ...(transitiveData.patterns || []).flatMap(pattern => (0, _routeLayers.patternToRouteFeature)(pattern, transitiveData.routes))] : []
  };

  const zoomToGeoJSON = geoJson => {
    const b = (0, _bbox.default)(geoJson);
    const bounds = [b[0], b[1], b[2], b[3]];

    if (map && bounds.length === 4 && bounds.every(Number.isFinite)) {
      map.fitBounds(bounds, {
        duration: 500,
        padding: _baseMap.util.getFitBoundsPadding(map, 0.2)
      });
    }
  };

  (0, _react.useEffect)(() => {
    zoomToGeoJSON(geojson);
  }, [transitiveData]);
  (0, _react.useEffect)(() => {
    if (!(activeLeg !== null && activeLeg !== void 0 && activeLeg.legGeometry)) return;
    zoomToGeoJSON(_polyline.default.toGeoJSON(activeLeg.legGeometry.points));
  }, [activeLeg]);
  if (!transitiveData) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  const {
    fromAnchor,
    toAnchor
  } = (0, _util.getFromToAnchors)(transitiveData); // Generally speaking, text/symbol layers placed first will be rendered in a lower layer
  // (or, if it is text, rendered with a lower priority or not at all if higher-priority text overlaps).

  return /*#__PURE__*/_react.default.createElement(_reactMapGl.Source, {
    data: geojson,
    id: "itinerary",
    type: "geojson"
  }, /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer // This layer is for WALK modes - dotted path
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
  }), /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer // This layer is for other modes - dashed path
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
  }), /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
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
  }), /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
    filter: accessLegFilter,
    id: "access-leg-circles",
    paint: {
      "circle-color": ["get", "color"],
      "circle-radius": 8,
      "circle-stroke-color": "#fff",
      "circle-stroke-width": 3
    },
    type: "circle"
  }), /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
    filter: stopFilter,
    id: "stops-circles",
    paint: {
      "circle-color": "#fff",
      "circle-radius": 7,
      "circle-stroke-width": 3
    },
    type: "circle"
  }), /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
    filter: accessLegFilter,
    id: "access-leg-labels",
    layout: defaultTextLayoutParams,
    paint: defaultTextPaintParams,
    type: "symbol"
  }), /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
    filter: stopFilter,
    id: "stops-labels",
    layout: defaultTextLayoutParams,
    paint: defaultTextPaintParams,
    type: "symbol"
  }), /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer // Render a solid background of fixed height using the uppercase route name.
  , {
    filter: routeFilter,
    id: "routes-labels-background",
    layout: (0, _routeLayers.getRouteLayerLayout)("nameUpper"),
    paint: {
      "text-color": ["get", "color"],
      "text-halo-color": ["get", "color"],
      "text-halo-width": 4 // Max value is 1/4 of text size per maplibre docs.

    },
    type: "symbol"
  }), /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer // This layer renders transit route names (foreground).
  , {
    filter: routeFilter,
    id: "routes-labels",
    layout: (0, _routeLayers.getRouteLayerLayout)("name"),
    paint: {
      "text-color": ["get", "textColor"]
    },
    type: "symbol"
  }), /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
    filter: ["==", "type", "from"],
    id: "from-label",
    layout: { ...defaultBoldTextLayoutParams,
      "text-anchor": fromAnchor
    },
    paint: defaultTextPaintParams,
    type: "symbol"
  }), /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
    filter: ["==", "type", "to"],
    id: "to-label",
    layout: { ...defaultBoldTextLayoutParams,
      "text-anchor": toAnchor
    },
    paint: { ...defaultTextPaintParams,
      "text-color": "#910818"
    },
    type: "symbol"
  }));
};

var _default = TransitiveCanvasOverlay;
exports.default = _default;
//# sourceMappingURL=index.js.map