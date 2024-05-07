"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _abstractGeocoder = _interopRequireDefault(require("./abstract-geocoder"));

const generateLabel = properties => {
  const propertyList = [];
  ["name", "street", "district", "state", "postcode", "city", "country"].forEach(propertyName => {
    if (typeof properties[propertyName] === "undefined") {
      return;
    }

    const value = `${properties[propertyName]}`;

    if (value.length > 0) {
      propertyList.push(value);
    }
  });
  return propertyList.join(", ");
};
/**
 * Geocoder implementation for the Photon geocoder.
 * See https://photon.io
 *
 * @extends Geocoder
 */


class PhotonGeocoder extends _abstractGeocoder.default {
  getAutocompleteQuery(query) {
    const {
      baseUrl,
      boundary,
      focusPoint,
      options,
      size
    } = this.geocoderConfig;
    return {
      boundary,
      focusPoint,
      options,
      size,
      url: baseUrl ? `${baseUrl}/autocomplete` : undefined,
      ...query
    };
  }

  getSearchQuery(query) {
    const {
      baseUrl,
      boundary,
      focusPoint,
      options,
      size
    } = this.geocoderConfig;
    return {
      boundary,
      focusPoint,
      options,
      size,
      url: baseUrl ? `${baseUrl}/search` : undefined,
      ...query
    };
  }

  rewriteAutocompleteResponse(response) {
    response.features.forEach(value => {
      value.properties.label = generateLabel(value.properties);
    });
    return response;
  }
  /**
   * Rewrite the response into an application-specific data format using the
   * first feature returned from the geocoder.
   */


  rewriteReverseResponse(response) {
    var _this$geocoderConfig;

    if ((_this$geocoderConfig = this.geocoderConfig) !== null && _this$geocoderConfig !== void 0 && _this$geocoderConfig.reverseUseFeatureCollection) {
      response.features.forEach(value => {
        value.properties.label = generateLabel(value.properties);
      });
      return response;
    }

    const {
      lat,
      lon
    } = response.point;
    const firstFeature = response.features[0];
    return {
      lat,
      lon,
      name: generateLabel(firstFeature.properties),
      rawGeocodedFeature: firstFeature
    };
  }

  rewriteSearchResponse(response) {
    return this.rewriteAutocompleteResponse(response);
  }

}

exports.default = PhotonGeocoder;
//# sourceMappingURL=photon.js.map