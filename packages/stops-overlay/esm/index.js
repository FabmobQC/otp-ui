import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Popup } from "@opentripplanner/base-map";
import { Layer, Source, useMap } from "react-map-gl";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import StopPopup from "@opentripplanner/map-popup";
import { isGeoJsonFlex } from "./utils";

/**
 * An overlay to view a collection of stops.
 */
var StopsOverlay = function StopsOverlay(props) {
  var _useMap = useMap(),
      map = _useMap.current;

  var activeStop = props.activeStop,
      color = props.color,
      highlightedStop = props.highlightedStop,
      highlightedStopColor = props.highlightedStopColor,
      minZoom = props.minZoom,
      refreshStops = props.refreshStops,
      _setLocation = props.setLocation,
      _setViewedStop = props.setViewedStop,
      stops = props.stops,
      visible = props.visible;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      clickedStop = _useState2[0],
      setClickedStop = _useState2[1];

  var onLayerEnter = useCallback(function () {
    map.getCanvas().style.cursor = "pointer";
  }, [map]);
  var onLayerLeave = useCallback(function () {
    map.getCanvas().style.cursor = "";
  }, [map]);
  var onLayerClick = useCallback(function (event) {
    var _event$features;

    setClickedStop((_event$features = event.features) === null || _event$features === void 0 ? void 0 : _event$features[0].properties);
  }, [setClickedStop]);
  var onZoomEnd = useCallback(function (event) {
    if (event.viewState.zoom < minZoom) setClickedStop(null);
  }, [setClickedStop, minZoom]);
  useEffect(function () {
    setClickedStop(activeStop);
  }, [activeStop]);
  useEffect(function () {
    var STOP_LAYERS = ["stops", "flex-stops"];
    STOP_LAYERS.forEach(function (stopLayer) {
      map === null || map === void 0 ? void 0 : map.on("mouseenter", stopLayer, onLayerEnter);
      map === null || map === void 0 ? void 0 : map.on("mouseleave", stopLayer, onLayerLeave);
      map === null || map === void 0 ? void 0 : map.on("click", stopLayer, onLayerClick);
    });
    if (visible && refreshStops) refreshStops();
    map === null || map === void 0 ? void 0 : map.on("zoomend", onZoomEnd); // Remove event handlers when component unmounts
    // (prevents error messages about performing state updates on unmounted component)

    return function () {
      STOP_LAYERS.forEach(function (stopLayer) {
        map === null || map === void 0 ? void 0 : map.off("mouseenter", stopLayer, onLayerEnter);
        map === null || map === void 0 ? void 0 : map.off("mouseleave", stopLayer, onLayerLeave);
        map === null || map === void 0 ? void 0 : map.off("click", stopLayer, onLayerClick);
      });
      map === null || map === void 0 ? void 0 : map.off("zoomend", onZoomEnd);
    };
  }, [map, visible]);
  var setNullStop = useCallback(function () {
    setClickedStop(null);
  }, [clickedStop]);
  var flexStops = useMemo(function () {
    return stops.filter(function (stop) {
      var _stop$geometries;

      return isGeoJsonFlex(stop === null || stop === void 0 ? void 0 : (_stop$geometries = stop.geometries) === null || _stop$geometries === void 0 ? void 0 : _stop$geometries.geoJson);
    });
  }, [stops]);
  var stopsGeoJSON = useMemo(function () {
    return {
      type: "FeatureCollection",
      features: stops.map(function (stop) {
        var _stop$geometries2;

        return {
          type: "Feature",
          properties: _objectSpread(_objectSpread({}, stop), {}, {
            flex: isGeoJsonFlex(stop === null || stop === void 0 ? void 0 : (_stop$geometries2 = stop.geometries) === null || _stop$geometries2 === void 0 ? void 0 : _stop$geometries2.geoJson),
            highlighted: stop.id === highlightedStop
          }),
          geometry: {
            type: "Point",
            coordinates: [stop.lon, stop.lat]
          }
        };
      })
    };
  }, [stops, highlightedStop]); // Don't render if no map or no stops are defined.
  // (ZoomBasedMarkers will also not render below the minimum zoom threshold defined in the symbols prop.)

  if (visible === false || !stops || stops.length === 0) {
    // Null can't be returned here -- react-map-gl dislikes null values as children
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Source, {
    type: "geojson",
    data: stopsGeoJSON
  }, /*#__PURE__*/React.createElement(Layer, {
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
  }), /*#__PURE__*/React.createElement(Layer, {
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
  }), /*#__PURE__*/React.createElement(Layer, {
    filter: ["==", "flex", true],
    id: "flex-stops",
    paint: {
      "circle-color": ["get", "color"],
      "circle-opacity": 0.9,
      "circle-stroke-color": "#333",
      "circle-stroke-width": 2
    },
    type: "circle"
  })), clickedStop && /*#__PURE__*/React.createElement(Popup, {
    latitude: clickedStop.lat,
    longitude: clickedStop.lon,
    maxWidth: "100%",
    onClose: setNullStop
  }, /*#__PURE__*/React.createElement(StopPopup, {
    setLocation: function setLocation(location) {
      setNullStop();

      _setLocation(location);
    },
    setViewedStop: function setViewedStop(stop) {
      setNullStop();

      _setViewedStop(stop);
    },
    entity: clickedStop
  })), flexStops.map(function (stop) {
    return /*#__PURE__*/React.createElement(Source, {
      data: stop.geometries.geoJson,
      id: stop.id,
      key: stop.id,
      type: "geojson"
    }, /*#__PURE__*/React.createElement(Layer, {
      id: stop.id,
      paint: {
        "fill-color": stop.color,
        "fill-opacity": 0.5,
        "fill-outline-color": stop.color
      },
      type: "fill"
    }), /*#__PURE__*/React.createElement(Layer, {
      id: "".concat(stop.id, "-outline"),
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
    }));
  }));
};

export default StopsOverlay;
//# sourceMappingURL=index.js.map