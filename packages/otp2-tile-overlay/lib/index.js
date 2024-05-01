"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mapPopup = _interopRequireDefault(require("@opentripplanner/map-popup"));

var _react = _interopRequireWildcard(require("react"));

var _reactMapGl = require("react-map-gl");

var _util = require("./util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line prettier/prettier
const SOURCE_ID = "otp2-tiles";

const OTP2TileLayerWithPopup = ({
  color,
  configCompanies,
  id,
  network,
  onMapClick,
  setLocation,
  setViewedStop,
  type
}) => {
  const {
    current: map
  } = (0, _reactMapGl.useMap)(); // TODO: handle this complex type: it can be a stop, a station, and some extra fields too

  const [clickedEntity, setClickedEntity] = (0, _react.useState)(null);

  const defaultClickHandler = event => {
    var _event$features, _event$features2;

    const {
      sourceLayer
    } = (_event$features = event.features) === null || _event$features === void 0 ? void 0 : _event$features[0];
    const synthesizedEntity = { ...((_event$features2 = event.features) === null || _event$features2 === void 0 ? void 0 : _event$features2[0].properties),
      lat: event.lngLat.lat,
      lon: event.lngLat.lng,
      sourceLayer
    }; // TODO: once the popup converges into a single one that can handle
    // stops, stations, and vehicles, this re-writing will not be needed
    // See: https://github.com/opentripplanner/otp-ui/pull/472#discussion_r1023124055

    if (sourceLayer === "stops" || sourceLayer === "stations") {
      setClickedEntity(synthesizedEntity);
    }

    if (sourceLayer === "rentalVehicles" || sourceLayer === "rentalStations") {
      setClickedEntity({
        // GraphQL field not in the tile info, but we can deduce it
        isFloatingBike: sourceLayer === "rentalVehicles" && synthesizedEntity.formFactor === "BICYCLE",
        // GraphQL field not in the tile info, but we can deduce it
        isFloatingVehicle: sourceLayer === "rentalVehicles" && synthesizedEntity.formFactor === "SCOOTER",
        // OTP1 compatibility -- will get overwritten if possible
        networks: [synthesizedEntity.network],
        ...synthesizedEntity,
        // OTP1 compatibility
        bikesAvailable: synthesizedEntity.vehiclesAvailable,
        // OTP1 compatibility
        x: synthesizedEntity.lon,
        // OTP1 compatibility
        y: synthesizedEntity.lat
      });
    }
  };

  const onLayerEnter = (0, _react.useCallback)(() => {
    map.getCanvas().style.cursor = "pointer";
  }, [map]);
  const onLayerLeave = (0, _react.useCallback)(() => {
    map.getCanvas().style.cursor = "";
  }, [map]);
  (0, _react.useEffect)(() => {
    map === null || map === void 0 ? void 0 : map.on("mouseenter", id, onLayerEnter);
    map === null || map === void 0 ? void 0 : map.on("mouseleave", id, onLayerLeave);
    map === null || map === void 0 ? void 0 : map.on("click", id, onMapClick || defaultClickHandler);
    return () => {
      map === null || map === void 0 ? void 0 : map.off("mouseenter", id, onLayerEnter);
      map === null || map === void 0 ? void 0 : map.off("mouseleave", id, onLayerLeave);
      map === null || map === void 0 ? void 0 : map.off("click", id, onMapClick || defaultClickHandler);
    };
  }, [id, map]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
    filter: network ? ["all", ["==", "network", network]] : ["all"],
    id: id,
    key: id,
    paint: (0, _util.generateLayerPaint)(color)[type],
    source: SOURCE_ID,
    "source-layer": type,
    type: "circle"
  }), clickedEntity && /*#__PURE__*/_react.default.createElement(_reactMapGl.Popup, {
    latitude: clickedEntity.lat,
    longitude: clickedEntity.lon,
    maxWidth: "100%" // TODO: only set null if the x is clicked, not a new stop
    ,
    onClose: () => setClickedEntity(null)
  }, /*#__PURE__*/_react.default.createElement(_mapPopup.default, {
    configCompanies: configCompanies,
    entity: { ...clickedEntity,
      id: (clickedEntity === null || clickedEntity === void 0 ? void 0 : clickedEntity.id) || (clickedEntity === null || clickedEntity === void 0 ? void 0 : clickedEntity.gtfsId)
    },
    setLocation: setLocation ? location => {
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


const generateOTP2TileLayers = (layers, endpoint, setLocation, setViewedStop, configCompanies) => {
  return [/*#__PURE__*/_react.default.createElement(_reactMapGl.Source // @ts-expect-error we use a nonstandard prop
  , {
    alwaysShow: true,
    id: SOURCE_ID,
    key: SOURCE_ID,
    type: "vector" // Only grab the data we need based on layers defined
    ,
    url: `${endpoint}/${layers.map(l => l.type).join(",")}/tilejson.json`
  }), ...layers.map(layer => {
    const {
      color,
      name,
      network,
      type,
      initiallyVisible
    } = layer;
    const id = `${type}${network ? `-${network}` : ""}`;
    return /*#__PURE__*/_react.default.createElement(OTP2TileLayerWithPopup, {
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
  })];
};

var _default = generateOTP2TileLayers;
exports.default = _default;
//# sourceMappingURL=index.js.map