"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lonlat = require("@conveyal/lonlat");

/**
 * Create customized geocoder functions given a certain geocoding API, the
 * config for the geocoder and response rewrite functions specific to this
 * application. Any geocoder API that is added is expected to have an API that
 * behaves very closely to https://github.com/conveyal/isomorphic-mapzen-search
 */
class Geocoder {
  constructor(geocoderApi, geocoderConfig) {
    this.geocoderConfig = void 0;
    this.api = void 0;
    this.api = geocoderApi;
    this.geocoderConfig = geocoderConfig;
  }
  /**
   * Perform an autocomplete query, e.g. using partial text of a possible
   * address or POI, attempt to find possible matches.
   */


  autocomplete(query) {
    return this.api.autocomplete(this.getAutocompleteQuery(query)).then(this.rewriteAutocompleteResponse.bind(this));
  }
  /**
   * Get an application-specific data structure from a given feature. The
   * feature is either the result of an autocomplete or a search query. This
   * function returns a Promise because sometimes an asynchronous action
   * needs to be taken to translate a feature into a location. For example,
   * the ArcGIS autocomplete service returns results that lack full address
   * data and GPS and it is expected that an extra call to the `search` API is
   * done to obtain that detailed data.
   */


  getLocationFromGeocodedFeature(feature) {
    if (feature.geometry.type === "Point") {
      const location = { ...(0, _lonlat.fromCoordinates)(feature.geometry.coordinates),
        name: feature.properties.label,
        rawGeocodedFeature: feature
      };
      return Promise.resolve(location);
    }

    return Promise.reject(new Error("Feature is not of type Point."));
  }
  /**
   * Do a reverse-geocode, i.e. get address information and attributes given a
   * GPS coordinate.
   */


  reverse(query) {
    return this.api.reverse(this.getReverseQuery(query)).then(this.rewriteReverseResponse.bind(this));
  }
  /**
   * Perform a search query. A search query is different from autocomplete in
   * that it is assumed that the text provided is more or less a complete
   * well-formatted address.
   */


  search(query) {
    return this.api.search(this.getSearchQuery(query)).then(this.rewriteSearchResponse.bind(this));
  }
  /**
   * Default autocomplete query generator
   */


  getAutocompleteQuery(query) {
    const {
      apiKey,
      baseUrl,
      boundary,
      focusPoint,
      options
    } = this.geocoderConfig;
    return {
      apiKey,
      boundary,
      focusPoint,
      options,
      // TODO: Hard coding something like an /autocomplete endpoint path in here is not very abstract.
      url: baseUrl ? `${baseUrl}/autocomplete` : undefined,
      ...query
    };
  }
  /**
   * Default reverse query generator
   */


  getReverseQuery(query) {
    var _this$geocoderConfig;

    const {
      apiKey,
      baseUrl,
      options
    } = this.geocoderConfig;
    return {
      apiKey,
      format: !((_this$geocoderConfig = this.geocoderConfig) !== null && _this$geocoderConfig !== void 0 && _this$geocoderConfig.reverseUseFeatureCollection),
      // keep result as GeoJSON if we're supposed to have a feature collection
      options,
      url: baseUrl ? `${baseUrl}/reverse` : undefined,
      ...query
    };
  }
  /**
   * Default search query generator.
   */


  getSearchQuery(query) {
    const {
      apiKey,
      baseUrl,
      boundary,
      focusPoint,
      options
    } = this.geocoderConfig;
    return {
      apiKey,
      boundary,
      focusPoint,
      options,
      url: baseUrl ? `${baseUrl}/search` : undefined,
      format: false,
      // keep as returned GeoJSON,
      ...query
    };
  }
  /**
   * Default rewriter for autocomplete responses
   * Response type is unknown because it depends on the specific Geocoder implementation.
   */


  rewriteAutocompleteResponse(response) {
    return response;
  }
  /**
   * Default rewriter for reverse responses
   * Response type is unknown because it depends on the specific Geocoder implementation.
   * Reverse response can use either Single or MultiGeocoderResponse based on GeocoderConfig.reverseUseFeatureCollection
   */


  rewriteReverseResponse(response) {
    return response;
  }
  /**
   * Default rewriter for search responses
   * Response type is unknown because it depends on the specific Geocoder implementation.
   */


  rewriteSearchResponse(response) {
    return response;
  }

}

exports.default = Geocoder;
//# sourceMappingURL=abstract-geocoder.js.map