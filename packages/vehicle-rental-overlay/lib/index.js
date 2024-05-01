"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "StationPopup", {
  enumerable: true,
  get: function () {
    return _mapPopup.default;
  }
});
exports.default = void 0;

var _baseMap = require("@opentripplanner/base-map");

var _react = _interopRequireWildcard(require("react"));

var _reactMapGl = require("react-map-gl");

var _mapPopup = _interopRequireDefault(require("@opentripplanner/map-popup"));

var _styled = require("./styled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// TODO: Make configurable?
const DETAILED_MARKER_CUTOFF = 16;

const getColorForStation = v => {
  if (v.isFloatingCar) return "#009cde";
  if (v.isFloatingVehicle) return "#f5a729"; // TODO: nicer color to match transitive

  if (v.bikesAvailable !== undefined || v.isFloatingBike) return "#f00";
  return "gray";
};

const checkIfPositionInViewport = (bounds, lat, lng) => {
  const PADDING = 0.001; // @ts-expect-error types appear to be wrong? version issue?
  // eslint-disable-next-line no-underscore-dangle

  const [sw, ne] = [bounds._sw, bounds._ne];
  if (!sw || !ne) return false;
  return lat >= sw.lat - PADDING && lat <= ne.lat + PADDING && lng >= sw.lng - PADDING && lng <= ne.lng + PADDING;
};

/**
 * This vehicle rental overlay can be used to render vehicle rentals of various
 * types. This layer can be configured to show different styles of markers at
 * different zoom levels.
 */
const VehicleRentalOverlay = ({
  companies,
  configCompanies,
  getStationName,
  id,
  refreshVehicles,
  setLocation,
  stations,
  visible
}) => {
  const {
    current: map
  } = (0, _reactMapGl.useMap)();
  const zoom = map === null || map === void 0 ? void 0 : map.getZoom();
  const bounds = map === null || map === void 0 ? void 0 : map.getBounds();
  const layerId = `rental-vehicles-${id}`;
  const [clickedVehicle, setClickedVehicle] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    // TODO: Make 30s configurable?
    if (!refreshVehicles || typeof refreshVehicles !== "function") {
      return;
    }

    refreshVehicles();
    setInterval(refreshVehicles, 30_000);
  }, [refreshVehicles]);
  (0, _react.useEffect)(() => {
    const VEHICLE_LAYERS = [layerId];
    VEHICLE_LAYERS.forEach(stopLayer => {
      map === null || map === void 0 ? void 0 : map.on("mouseenter", stopLayer, () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map === null || map === void 0 ? void 0 : map.on("mouseleave", stopLayer, () => {
        map.getCanvas().style.cursor = "";
      });
      map === null || map === void 0 ? void 0 : map.on("click", stopLayer, event => {
        var _event$features;

        setClickedVehicle((_event$features = event.features) === null || _event$features === void 0 ? void 0 : _event$features[0].properties);
      });
    });
  }, [map]); // Don't render if no map or no stops are defined.

  if (visible === false || !stations || stations.length === 0) {
    // Null can't be returned here -- react-map-gl dislikes null values as children
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  }

  const vehiclesGeoJSON = {
    type: "FeatureCollection",
    features: stations.filter(vehicle => // Include specified companies only if companies is specified and network info is available
    !companies || !vehicle.networks || companies.includes(vehicle.networks[0])).map(vehicle => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [vehicle.x, vehicle.y]
      },
      properties: { ...vehicle,
        networks: JSON.stringify(vehicle.networks),
        "stroke-width": vehicle.isFloatingBike || vehicle.isFloatingVehicle ? 1 : 2,
        color: getColorForStation(vehicle)
      }
    }))
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, zoom < DETAILED_MARKER_CUTOFF && /*#__PURE__*/_react.default.createElement(_reactMapGl.Source, {
    type: "geojson",
    data: vehiclesGeoJSON
  }, /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
    id: layerId,
    paint: {
      "circle-color": ["get", "color"],
      "circle-opacity": 0.9,
      "circle-stroke-color": "#333",
      "circle-stroke-width": ["get", "stroke-width"]
    },
    type: "circle"
  })), zoom >= DETAILED_MARKER_CUTOFF && stations.filter(station => checkIfPositionInViewport(bounds, station.y, station.x)).map(station => /*#__PURE__*/_react.default.createElement(_baseMap.MarkerWithPopup, {
    key: station.id,
    popupContents: /*#__PURE__*/_react.default.createElement(_mapPopup.default, {
      configCompanies: configCompanies,
      setLocation: location => {
        setClickedVehicle(null);
        setLocation(location);
      },
      getEntityName: // @ts-expect-error no stop support. Avoid a breaking change
      getStationName && ((s, cc) => getStationName(cc, s)),
      entity: station
    }),
    position: [station.y, station.x]
  }, station.bikesAvailable !== undefined && !station.isFloatingBike && !station.isFloatingVehicle && station.spacesAvailable !== undefined ? /*#__PURE__*/_react.default.createElement(_styled.BaseBikeRentalIcon, {
    percent: (station === null || station === void 0 ? void 0 : station.bikesAvailable) / ((station === null || station === void 0 ? void 0 : station.bikesAvailable) + (station === null || station === void 0 ? void 0 : station.spacesAvailable))
  }) : /*#__PURE__*/_react.default.createElement(_styled.StationMarker, {
    width: 12,
    color: getColorForStation(station)
  }))), clickedVehicle && /*#__PURE__*/_react.default.createElement(_baseMap.Popup, {
    latitude: clickedVehicle.y,
    longitude: clickedVehicle.x,
    maxWidth: "100%",
    onClose: () => {
      setClickedVehicle(null);
    }
  }, /*#__PURE__*/_react.default.createElement(_mapPopup.default, {
    configCompanies: configCompanies,
    getEntityName: // @ts-expect-error no stop support. Avoid a breaking change
    getStationName && ((s, cc) => getStationName(cc, s)),
    setLocation: location => {
      setClickedVehicle(null);
      setLocation(location);
    },
    entity: { ...clickedVehicle,
      networks: JSON.parse(clickedVehicle.networks)
    }
  })));
};

var _default = VehicleRentalOverlay;
exports.default = _default;
//# sourceMappingURL=index.js.map