"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _abstractGeocoder = _interopRequireDefault(require("./abstract-geocoder"));

const DEFAULT_LAYERS = "address,venue,street,intersection";
/**
 * Geocoder implementation for the Pelias geocoder.
 * See https://pelias.io
 *
 * @extends Geocoder
 */

class PeliasGeocoder extends _abstractGeocoder.default {
  /**
   * Generate an autocomplete query specifically for the Pelias API. The
   * `sources` parameter is a Pelias-specific option.
   * This function fills in some more fields of the query
   * from the existing values in the GeocoderConfig. 
   */
  getAutocompleteQuery(query) {
    const {
      apiKey,
      baseUrl,
      boundary,
      focusPoint,
      layers = DEFAULT_LAYERS,
      options,
      sources
    } = this.geocoderConfig;
    return {
      apiKey,
      boundary,
      focusPoint,
      layers,
      options,
      // explicitly send over null for sources if provided sources is not truthy
      // in order to avoid default isomorphic-mapzen-search sources form being
      // applied
      sources: sources || null,
      url: baseUrl ? `${baseUrl}/autocomplete` : undefined,
      ...query
    };
  }
  /**
   * Generate a search query specifically for the Pelias API. The
   * `sources` parameter is a Pelias-specific option.
   * This function fills in some more fields of the query
   * from the existing values in the GeocoderConfig. 
   */


  getSearchQuery(query) {
    const {
      apiKey,
      baseUrl,
      boundary,
      layers = DEFAULT_LAYERS,
      focusPoint,
      options,
      sources
    } = this.geocoderConfig;
    return {
      apiKey,
      boundary,
      layers,
      focusPoint,
      options,
      // explicitly send over null for sources if provided sources is not truthy
      // in order to avoid default isomorphic-mapzen-search sources form being
      // applied
      sources: sources || null,
      url: baseUrl ? `${baseUrl}/search` : undefined,
      format: false,
      // keep as returned GeoJSON,
      ...query
    };
  }
  /**
   * Rewrite the response into an application-specific data format using the
   * first feature returned from the geocoder.
   */


  rewriteReverseResponse(response) {
    var _this$geocoderConfig;

    if ((_this$geocoderConfig = this.geocoderConfig) !== null && _this$geocoderConfig !== void 0 && _this$geocoderConfig.reverseUseFeatureCollection) return response;
    const {
      lat,
      lon
    } = response.isomorphicMapzenSearchQuery.point;
    const firstFeature = response[0];
    return {
      lat,
      lon,
      name: firstFeature.label,
      rawGeocodedFeature: firstFeature
    };
  }

}

exports.default = PeliasGeocoder;
//# sourceMappingURL=pelias.js.map