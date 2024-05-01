import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// Prettier does not support typescript annotation
// eslint-disable-next-line prettier/prettier
import Geocoder from "./abstract-geocoder";

/**
 * Allows fetching results from OTP instance with the geocoder endpoint enabled
 */
var OTPGeocoder = /*#__PURE__*/function (_Geocoder) {
  _inherits(OTPGeocoder, _Geocoder);

  var _super = _createSuper(OTPGeocoder);

  function OTPGeocoder() {
    _classCallCheck(this, OTPGeocoder);

    return _super.apply(this, arguments);
  }

  _createClass(OTPGeocoder, [{
    key: "getAutocompleteQuery",
    value: function getAutocompleteQuery(query) {
      var baseUrl = this.geocoderConfig.baseUrl;
      return _objectSpread({
        url: baseUrl
      }, query);
    }
  }, {
    key: "rewriteAutocompleteResponse",
    value: function rewriteAutocompleteResponse(response) {
      var _response$results;

      return {
        features: response === null || response === void 0 ? void 0 : (_response$results = response.results) === null || _response$results === void 0 ? void 0 : _response$results.map(function (stop) {
          return {
            geometry: {
              type: "Point",
              coordinates: [stop.coordinate.lon, stop.coordinate.lat]
            },
            id: stop.id,
            // TODO: if non-stops are supported, these need to be detected here and 
            // this layer property updated accordingly
            properties: {
              layer: "stops",
              source: "otp",
              modes: stop.modes,
              name: stop.name,
              label: "".concat(stop.name, " (").concat(stop.code, ")")
            },
            type: "Feature"
          };
        }),
        type: "FeatureCollection"
      };
    }
  }]);

  return OTPGeocoder;
}(Geocoder);

export { OTPGeocoder as default };
//# sourceMappingURL=otp.js.map