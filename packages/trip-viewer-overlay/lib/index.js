"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _polyline = _interopRequireDefault(require("@mapbox/polyline"));

var _maplibreGl = require("maplibre-gl");

var _baseMap = require("@opentripplanner/base-map");

var _reactMapGl = require("react-map-gl");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const TripViewerOverlay = props => {
  const {
    path,
    tripData,
    visible
  } = props;
  if (!tripData) return null;
  const {
    geometry
  } = tripData;
  if (!geometry) return null;

  const pts = _polyline.default.decode(geometry.points).map(pt => pt.reverse());

  const bounds = (0, _react.useMemo)(() => {
    return pts.reduce((bnds, coord) => {
      return bnds.extend(coord);
    }, new _maplibreGl.LngLatBounds(pts[0], pts[0]));
  }, [pts]);
  const {
    current: map
  } = (0, _reactMapGl.useMap)();
  (0, _react.useEffect)(() => {
    if (map && bounds.length === 4 && bounds.every(Number.isFinite)) {
      _baseMap.util.fitMapBounds(map, bounds);
    }
  }, [map, bounds]);
  if (!visible || !pts) return null;
  const geojson = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: pts
    },
    properties: []
  };
  return /*#__PURE__*/_react.default.createElement(_reactMapGl.Source, {
    id: "route",
    type: "geojson",
    data: geojson
  }, /*#__PURE__*/_react.default.createElement(_reactMapGl.Layer, {
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

var _default = TripViewerOverlay;
exports.default = _default;
//# sourceMappingURL=index.js.map