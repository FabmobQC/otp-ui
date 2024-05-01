"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseMap = require("@opentripplanner/base-map");

var _reactMapGl = require("react-map-gl");

var _react = _interopRequireWildcard(require("react"));

var _mapPopup = _interopRequireDefault(require("@opentripplanner/map-popup"));

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * An overlay to view a collection of stops.
 */
const StopsOverlay = props => {
  const {
    current: map
  } = (0, _reactMapGl.useMap)();
  const {
    activeStop,
    color,
    highlightedStop,
    highlightedStopColor,
    minZoom,
    refreshStops,
    setLocation,
    setViewedStop,
    stops,
    visible
  } = props;
  const [clickedStop, setClickedStop] = (0, _react.useState)(null);
  const onLayerEnter = (0, _react.useCallback)(() => {
    map.getCanvas().style.cursor = "pointer";
  }, [map]);
  const onLayerLeave = (0, _react.useCallback)(() => {
    map.getCanvas().style.cursor = "";
  }, [map]);
  const onLayerClick = (0, _react.useCallback)(event => {
    var _event$features;

    setClickedStop((_event$features = event.features) === null || _event$features === void 0 ? void 0 : _event$features[0].properties);
  }, [setClickedStop]);
  const onZoomEnd = (0, _react.useCallback)(event => {
    if (event.viewState.zoom < minZoom) setClickedStop(null);
  }, [setClickedStop, minZoom]);
  (0, _react.useEffect)(() => {
    setClickedStop(activeStop);
  }, [activeStop]);
  (0, _react.useEffect)(() => {
    const STOP_LAYERS = ["stops", "flex-stops"];
    STOP_LAYERS.forEach(stopLayer => {
      map === null || map === void 0 ? void 0 : map.on("mouseenter", stopLayer, onLayerEnter);
      map === null || map === void 0 ? void 0 : map.on("mouseleave", stopLayer, onLayerLeave);
      map === null || map === void 0 ? void 0 : map.on("click", stopLayer, onLayerClick);
    });
    if (visible && refreshStops) refreshStops();
    map === null || map === void 0 ? void 0 : map.on("zoomend", onZoomEnd); // Remove event handlers when component unmounts
    // (prevents error messages about performing state updates on unmounted component)

    return () => {
      STOP_LAYERS.forEach(stopLayer => {
        map === null || map === void 0 ? void 0 : map.off("mouseenter", stopLayer, onLayerEnter);
        map === null || map === void 0 ? void 0 : map.off("mouseleave", stopLayer, onLayerLeave);
        map === null || map === void 0 ? void 0 : map.off("click", stopLayer, onLayerClick);
      });
      map === null || map === void 0 ? void 0 : map.off("zoomend", onZoomEnd);
    };
  }, [map, visible]);
  const setNullStop = (0, _react.useCallback)(() => {
    setClickedStop(null);
  }, [clickedStop]);
  const flexStops = (0, _react.useMemo)(() => stops.filter(stop => {
    var _stop$geometries;

    return (0, _utils.isGeoJsonFlex)(stop === null || stop === void 0 ? void 0 : (_stop$geometries = stop.geometries) === null || _stop$geometries === void 0 ? void 0 : _stop$geometries.geoJson);
  }), [stops]);
  const stopsGeoJSON = (0, _react.useMemo)(() => ({
    type: "FeatureCollection",
    features: stops.map(stop => {
      var _stop$geometries2;

      return {
        type: "Feature",
        properties: { ...stop,
          flex: (0, _utils.isGeoJsonFlex)(stop === null || stop === void 0 ? void 0 : (_stop$geometries2 = stop.geometries) === null || _stop$geometries2 === void 0 ? void 0 : _stop$geometries2.geoJson),
          highlighted: stop.id === highlightedStop
        },
        geometry: {
          type: "Point",
          coordinates: [stop.lon, stop.lat]
        }
      };
    })
  }), [stops, highlightedStop]); // Don't render if no map or no stops are defined.
  // (ZoomBasedMarkers will also not render below the minimum zoom threshold defined in the symbols prop.)

  if (visible === false || !stops || stops.length === 0) {
    // Null can't be returned here -- react-map-gl dislikes null values as children
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactMapGl.Source, {
    type: "geojson",
    data: stopsGeoJSON
  }, /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
    id: "stops",
    minzoom: minZoom || 10,
    paint: {
      "circle-color": color || "#fff",
      "circle-opacity": 0.9,
      // TODO: Use tinycolor to generate outline with appropriate contrast.
      "circle-stroke-color": color ? "#fff" : "#333",
      "circle-stroke-width": 2
    },
    type: "circle"
  }), /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
    filter: ["==", "highlighted", true],
    id: "higlightedStop",
    paint: {
      "circle-color": highlightedStopColor || "#ff0000",
      "circle-opacity": 1,
      "circle-radius": 10,
      // TODO: Use tinycolor to generate outline with appropriate contrast.
      "circle-stroke-color": color ? "#fff" : "#333",
      "circle-stroke-width": 2
    },
    type: "circle"
  }), /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
    filter: ["==", "flex", true],
    id: "flex-stops",
    paint: {
      "circle-color": ["get", "color"],
      "circle-opacity": 0.9,
      "circle-stroke-color": "#333",
      "circle-stroke-width": 2
    },
    type: "circle"
  })), clickedStop && /*#__PURE__*/_react.default.createElement(_baseMap.Popup, {
    latitude: clickedStop.lat,
    longitude: clickedStop.lon,
    maxWidth: "100%",
    onClose: setNullStop
  }, /*#__PURE__*/_react.default.createElement(_mapPopup.default, {
    setLocation: location => {
      setNullStop();
      setLocation(location);
    },
    setViewedStop: stop => {
      setNullStop();
      setViewedStop(stop);
    },
    entity: clickedStop
  })), flexStops.map(stop => /*#__PURE__*/_react.default.createElement(_reactMapGl.Source, {
    data: stop.geometries.geoJson,
    id: stop.id,
    key: stop.id,
    type: "geojson"
  }, /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
    id: stop.id,
    paint: {
      "fill-color": stop.color,
      "fill-opacity": 0.5,
      "fill-outline-color": stop.color
    },
    type: "fill"
  }), /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
    id: `${stop.id}-outline`,
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": stop.color,
      "line-opacity": 1,
      "line-width": 4
    },
    type: "line"
  }))));
};

var _default = StopsOverlay;
exports.default = _default;
//# sourceMappingURL=index.js.map