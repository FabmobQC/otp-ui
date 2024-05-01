"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var arcgis = _interopRequireWildcard(require("@conveyal/geocoder-arcgis-geojson"));

var pelias = _interopRequireWildcard(require("isomorphic-mapzen-search"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var here = _interopRequireWildcard(require("./apis/here"));

var photon = _interopRequireWildcard(require("./apis/photon"));

var otp = _interopRequireWildcard(require("./apis/otp"));

var _arcgis = _interopRequireDefault(require("./geocoders/arcgis"));

var _noapi = _interopRequireDefault(require("./geocoders/noapi"));

var _pelias = _interopRequireDefault(require("./geocoders/pelias"));

var _here2 = _interopRequireDefault(require("./geocoders/here"));

var _photon2 = _interopRequireDefault(require("./geocoders/photon"));

var _otp2 = _interopRequireDefault(require("./geocoders/otp"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Create a memoized getter to avoid recreating new geocoders each time.
const getGeocoder = (0, _lodash.default)(geocoderConfig => {
  if (!geocoderConfig || !geocoderConfig.type) {
    return new _noapi.default();
  }

  const {
    type
  } = geocoderConfig;

  switch (type) {
    case "ARCGIS":
      return new _arcgis.default(arcgis, geocoderConfig);

    case "PELIAS":
      return new _pelias.default(pelias, geocoderConfig);

    case "HERE":
      return new _here2.default(here, geocoderConfig);

    case "PHOTON":
      return new _photon2.default(photon, geocoderConfig);

    case "OTP":
      return new _otp2.default(otp, geocoderConfig);

    default:
      console.error(`Unknown geocoder type: "${type}". Using NoApiGeocoder.`);
      return new _noapi.default();
  }
});
var _default = getGeocoder;
exports.default = _default;
//# sourceMappingURL=index.js.map