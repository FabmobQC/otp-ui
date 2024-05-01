import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import EntityPopup from "@opentripplanner/map-popup";
import React, { useCallback, useEffect, useState } from "react";
import { Layer, Popup, Source, useMap } from "react-map-gl"; // eslint-disable-next-line prettier/prettier

import { generateLayerPaint } from "./util";
var SOURCE_ID = "otp2-tiles";

var OTP2TileLayerWithPopup = function OTP2TileLayerWithPopup(_ref) {
  var color = _ref.color,
      configCompanies = _ref.configCompanies,
      id = _ref.id,
      network = _ref.network,
      onMapClick = _ref.onMapClick,
      setLocation = _ref.setLocation,
      setViewedStop = _ref.setViewedStop,
      type = _ref.type;

  var _useMap = useMap(),
      map = _useMap.current; // TODO: handle this complex type: it can be a stop, a station, and some extra fields too


  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      clickedEntity = _useState2[0],
      setClickedEntity = _useState2[1];

  var defaultClickHandler = function defaultClickHandler(event) {
    var _event$features, _event$features2;

    var _event$features$ = (_event$features = event.features) === null || _event$features === void 0 ? void 0 : _event$features[0],
        sourceLayer = _event$features$.sourceLayer;

    var synthesizedEntity = _objectSpread(_objectSpread({}, (_event$features2 = event.features) === null || _event$features2 === void 0 ? void 0 : _event$features2[0].properties), {}, {
      lat: event.lngLat.lat,
      lon: event.lngLat.lng,
      sourceLayer: sourceLayer
    }); // TODO: once the popup converges into a single one that can handle
    // stops, stations, and vehicles, this re-writing will not be needed
    // See: https://github.com/opentripplanner/otp-ui/pull/472#discussion_r1023124055


    if (sourceLayer === "stops" || sourceLayer === "stations") {
      setClickedEntity(synthesizedEntity);
    }

    if (sourceLayer === "rentalVehicles" || sourceLayer === "rentalStations") {
      setClickedEntity(_objectSpread(_objectSpread({
        // GraphQL field not in the tile info, but we can deduce it
        isFloatingBike: sourceLayer === "rentalVehicles" && synthesizedEntity.formFactor === "BICYCLE",
        // GraphQL field not in the tile info, but we can deduce it
        isFloatingVehicle: sourceLayer === "rentalVehicles" && synthesizedEntity.formFactor === "SCOOTER",
        // OTP1 compatibility -- will get overwritten if possible
        networks: [synthesizedEntity.network]
      }, synthesizedEntity), {}, {
        // OTP1 compatibility
        bikesAvailable: synthesizedEntity.vehiclesAvailable,
        // OTP1 compatibility
        x: synthesizedEntity.lon,
        // OTP1 compatibility
        y: synthesizedEntity.lat
      }));
    }
  };

  var onLayerEnter = useCallback(function () {
    map.getCanvas().style.cursor = "pointer";
  }, [map]);
  var onLayerLeave = useCallback(function () {
    map.getCanvas().style.cursor = "";
  }, [map]);
  useEffect(function () {
    map === null || map === void 0 ? void 0 : map.on("mouseenter", id, onLayerEnter);
    map === null || map === void 0 ? void 0 : map.on("mouseleave", id, onLayerLeave);
    map === null || map === void 0 ? void 0 : map.on("click", id, onMapClick || defaultClickHandler);
    return function () {
      map === null || map === void 0 ? void 0 : map.off("mouseenter", id, onLayerEnter);
      map === null || map === void 0 ? void 0 : map.off("mouseleave", id, onLayerLeave);
      map === null || map === void 0 ? void 0 : map.off("click", id, onMapClick || defaultClickHandler);
    };
  }, [id, map]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Layer, {
    filter: network ? ["all", ["==", "network", network]] : ["all"],
    id: id,
    key: id,
    paint: generateLayerPaint(color)[type],
    source: SOURCE_ID,
    "source-layer": type,
    type: "circle"
  }), clickedEntity && /*#__PURE__*/React.createElement(Popup, {
    latitude: clickedEntity.lat,
    longitude: clickedEntity.lon,
    maxWidth: "100%" // TODO: only set null if the x is clicked, not a new stop
    ,
    onClose: function onClose() {
      return setClickedEntity(null);
    }
  }, /*#__PURE__*/React.createElement(EntityPopup, {
    configCompanies: configCompanies,
    entity: _objectSpread(_objectSpread({}, clickedEntity), {}, {
      id: (clickedEntity === null || clickedEntity === void 0 ? void 0 : clickedEntity.id) || (clickedEntity === null || clickedEntity === void 0 ? void 0 : clickedEntity.gtfsId)
    }),
    setLocation: setLocation ? function (location) {
      setClickedEntity(null);
      setLocation(location);
    } : null,
    setViewedStop: setViewedStop
  })));
};
/**
 * Generates an array of MapLibreGL Source and Layer components with included popups for 
 * rendering OTP2 tile data.
 * 
 * @param layers          A list of layers, with some minimal config, matching what is configured on the server.
 *                        This list will be used to craft the tilejson request to OTP.
 * @param endpoint        The OTP endpoint to make the requests to
 * @param setLocation     An optional method to make from/to buttons functional. See component for more detail.
 * @param setViewedStop   An optional method to make stop viewer button functional. See component for more detail. 
 * @param configCompanies An optional list of companies used to prettify network information.
 * @returns               Array of <Source> and <OTP2TileLayerWithPopup> components
 */


var generateOTP2TileLayers = function generateOTP2TileLayers(layers, endpoint, setLocation, setViewedStop, configCompanies) {
  return [/*#__PURE__*/React.createElement(Source // @ts-expect-error we use a nonstandard prop
  , {
    alwaysShow: true,
    id: SOURCE_ID,
    key: SOURCE_ID,
    type: "vector" // Only grab the data we need based on layers defined
    ,
    url: "".concat(endpoint, "/").concat(layers.map(function (l) {
      return l.type;
    }).join(","), "/tilejson.json")
  })].concat(_toConsumableArray(layers.map(function (layer) {
    var color = layer.color,
        name = layer.name,
        network = layer.network,
        type = layer.type,
        initiallyVisible = layer.initiallyVisible;
    var id = "".concat(type).concat(network ? "-".concat(network) : "");
    return /*#__PURE__*/React.createElement(OTP2TileLayerWithPopup, {
      color: color,
      configCompanies: configCompanies,
      id: id,
      key: id,
      name: name || id,
      network: network,
      setLocation: setLocation,
      setViewedStop: setViewedStop,
      type: type,
      visible: initiallyVisible
    });
  })));
};

export default generateOTP2TileLayers;
//# sourceMappingURL=index.js.map