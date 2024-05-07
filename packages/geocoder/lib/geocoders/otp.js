"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _abstractGeocoder = _interopRequireDefault(require("./abstract-geocoder"));

// Prettier does not support typescript annotation
// eslint-disable-next-line prettier/prettier

/**
 * Allows fetching results from OTP instance with the geocoder endpoint enabled
 */
class OTPGeocoder extends _abstractGeocoder.default {
  getAutocompleteQuery(query) {
    const {
      baseUrl
    } = this.geocoderConfig;
    return {
      url: baseUrl,
      ...query
    };
  }

  rewriteAutocompleteResponse(response) {
    var _response$results;

    return {
      features: response === null || response === void 0 ? void 0 : (_response$results = response.results) === null || _response$results === void 0 ? void 0 : _response$results.map(stop => ({
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
          label: `${stop.name} (${stop.code})`
        },
        type: "Feature"
      })),
      type: "FeatureCollection"
    };
  }

}

exports.default = OTPGeocoder;
//# sourceMappingURL=otp.js.map