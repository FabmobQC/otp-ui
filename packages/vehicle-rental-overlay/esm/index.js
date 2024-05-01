import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { MarkerWithPopup, Popup } from "@opentripplanner/base-map";
import React, { useEffect, useState } from "react";
import { Layer, Source, useMap } from "react-map-gl";
import StationPopup from "@opentripplanner/map-popup";
import { BaseBikeRentalIcon, StationMarker } from "./styled"; // TODO: Make configurable?

var DETAILED_MARKER_CUTOFF = 16;

var getColorForStation = function getColorForStation(v) {
  if (v.isFloatingCar) return "#009cde";
  if (v.isFloatingVehicle) return "#f5a729"; // TODO: nicer color to match transitive

  if (v.bikesAvailable !== undefined || v.isFloatingBike) return "#f00";
  return "gray";
};

var checkIfPositionInViewport = function checkIfPositionInViewport(bounds, lat, lng) {
  var PADDING = 0.001; // @ts-expect-error types appear to be wrong? version issue?
  // eslint-disable-next-line no-underscore-dangle

  var _ref = [bounds._sw, bounds._ne],
      sw = _ref[0],
      ne = _ref[1];
  if (!sw || !ne) return false;
  return lat >= sw.lat - PADDING && lat <= ne.lat + PADDING && lng >= sw.lng - PADDING && lng <= ne.lng + PADDING;
};

/**
 * This vehicle rental overlay can be used to render vehicle rentals of various
 * types. This layer can be configured to show different styles of markers at
 * different zoom levels.
 */
var VehicleRentalOverlay = function VehicleRentalOverlay(_ref2) {
  var companies = _ref2.companies,
      configCompanies = _ref2.configCompanies,
      getStationName = _ref2.getStationName,
      id = _ref2.id,
      refreshVehicles = _ref2.refreshVehicles,
      _setLocation = _ref2.setLocation,
      stations = _ref2.stations,
      visible = _ref2.visible;

  var _useMap = useMap(),
      map = _useMap.current;

  var zoom = map === null || map === void 0 ? void 0 : map.getZoom();
  var bounds = map === null || map === void 0 ? void 0 : map.getBounds();
  var layerId = "rental-vehicles-".concat(id);

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      clickedVehicle = _useState2[0],
      setClickedVehicle = _useState2[1];

  useEffect(function () {
    // TODO: Make 30s configurable?
    if (!refreshVehicles || typeof refreshVehicles !== "function") {
      return;
    }

    refreshVehicles();
    setInterval(refreshVehicles, 30000);
  }, [refreshVehicles]);
  useEffect(function () {
    var VEHICLE_LAYERS = [layerId];
    VEHICLE_LAYERS.forEach(function (stopLayer) {
      map === null || map === void 0 ? void 0 : map.on("mouseenter", stopLayer, function () {
        map.getCanvas().style.cursor = "pointer";
      });
      map === null || map === void 0 ? void 0 : map.on("mouseleave", stopLayer, function () {
        map.getCanvas().style.cursor = "";
      });
      map === null || map === void 0 ? void 0 : map.on("click", stopLayer, function (event) {
        var _event$features;

        setClickedVehicle((_event$features = event.features) === null || _event$features === void 0 ? void 0 : _event$features[0].properties);
      });
    });
  }, [map]); // Don't render if no map or no stops are defined.

  if (visible === false || !stations || stations.length === 0) {
    // Null can't be returned here -- react-map-gl dislikes null values as children
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }

  var vehiclesGeoJSON = {
    type: "FeatureCollection",
    features: stations.filter(function (vehicle) {
      return (// Include specified companies only if companies is specified and network info is available
        !companies || !vehicle.networks || companies.includes(vehicle.networks[0])
      );
    }).map(function (vehicle) {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [vehicle.x, vehicle.y]
        },
        properties: _objectSpread(_objectSpread({}, vehicle), {}, {
          networks: JSON.stringify(vehicle.networks),
          "stroke-width": vehicle.isFloatingBike || vehicle.isFloatingVehicle ? 1 : 2,
          color: getColorForStation(vehicle)
        })
      };
    })
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, zoom < DETAILED_MARKER_CUTOFF && /*#__PURE__*/React.createElement(Source, {
    type: "geojson",
    data: vehiclesGeoJSON
  }, /*#__PURE__*/React.createElement(Layer, {
    id: layerId,
    paint: {
      "circle-color": ["get", "color"],
      "circle-opacity": 0.9,
      "circle-stroke-color": "#333",
      "circle-stroke-width": ["get", "stroke-width"]
    },
    type: "circle"
  })), zoom >= DETAILED_MARKER_CUTOFF && stations.filter(function (station) {
    return checkIfPositionInViewport(bounds, station.y, station.x);
  }).map(function (station) {
    return /*#__PURE__*/React.createElement(MarkerWithPopup, {
      key: station.id,
      popupContents: /*#__PURE__*/React.createElement(StationPopup, {
        configCompanies: configCompanies,
        setLocation: function setLocation(location) {
          setClickedVehicle(null);

          _setLocation(location);
        },
        getEntityName: // @ts-expect-error no stop support. Avoid a breaking change
        getStationName && function (s, cc) {
          return getStationName(cc, s);
        },
        entity: station
      }),
      position: [station.y, station.x]
    }, station.bikesAvailable !== undefined && !station.isFloatingBike && !station.isFloatingVehicle && station.spacesAvailable !== undefined ? /*#__PURE__*/React.createElement(BaseBikeRentalIcon, {
      percent: (station === null || station === void 0 ? void 0 : station.bikesAvailable) / ((station === null || station === void 0 ? void 0 : station.bikesAvailable) + (station === null || station === void 0 ? void 0 : station.spacesAvailable))
    }) : /*#__PURE__*/React.createElement(StationMarker, {
      width: 12,
      color: getColorForStation(station)
    }));
  }), clickedVehicle && /*#__PURE__*/React.createElement(Popup, {
    latitude: clickedVehicle.y,
    longitude: clickedVehicle.x,
    maxWidth: "100%",
    onClose: function onClose() {
      setClickedVehicle(null);
    }
  }, /*#__PURE__*/React.createElement(StationPopup, {
    configCompanies: configCompanies,
    getEntityName: // @ts-expect-error no stop support. Avoid a breaking change
    getStationName && function (s, cc) {
      return getStationName(cc, s);
    },
    setLocation: function setLocation(location) {
      setClickedVehicle(null);

      _setLocation(location);
    },
    entity: _objectSpread(_objectSpread({}, clickedVehicle), {}, {
      networks: JSON.parse(clickedVehicle.networks)
    })
  })));
};

export default VehicleRentalOverlay;
export { StationPopup };
//# sourceMappingURL=index.js.map