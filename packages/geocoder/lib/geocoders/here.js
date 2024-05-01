"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _abstractGeocoder = _interopRequireDefault(require("./abstract-geocoder"));

// Prettier does not support typescript annotation
// eslint-disable-next-line prettier/prettier
const hereResultTypeToPeliasLayerMap = {
  houseNumber: "address",
  place: "venue"
};

const convertHereToGeojson = hereFeature => {
  const {
    scoring,
    categories,
    address,
    resultType,
    title,
    position
  } = hereFeature;
  const extraFields = {};

  if (scoring) {
    extraFields.confidence = scoring.queryScore;
  }

  if (categories) {
    extraFields.addendum = {
      categories
    };
  }

  return {
    geometry: {
      type: "Point",
      coordinates: [position.lng, position.lat]
    },
    properties: {
      country: address.countryName,
      country_a: address.countryCode,
      country_code: address.countryCode,
      county: address.county,
      housenumber: address.houseNumber,
      label: address.label,
      layer: hereResultTypeToPeliasLayerMap[resultType] ? hereResultTypeToPeliasLayerMap[resultType] : resultType,
      ...extraFields,
      locality: address.city,
      name: title,
      neighbourhood: address.district,
      postalcode: address.postalCode,
      region: address.state,
      source: "here",
      street: address.street
    },
    type: "Feature"
  };
};

class HereGeocoder extends _abstractGeocoder.default {
  rewriteReverseResponse({
    items,
    point
  }) {
    var _this$geocoderConfig;

    if ((_this$geocoderConfig = this.geocoderConfig) !== null && _this$geocoderConfig !== void 0 && _this$geocoderConfig.reverseUseFeatureCollection) {
      return {
        features: items.map(convertHereToGeojson),
        type: "FeatureCollection"
      };
    } // Render the result as a single geocoder response


    const firstItem = items[0];
    return { ...point,
      name: firstItem.title,
      rawGeocodedFeature: convertHereToGeojson(firstItem)
    };
  }

  rewriteAutocompleteResponse(response) {
    const {
      items
    } = response;
    return {
      features: items // Here has various types of responses, some of which are not locations.
      // We only want the actual places, so throw out any without a position.
      === null || items // Here has various types of responses, some of which are not locations.
      // We only want the actual places, so throw out any without a position.
      === void 0 ? void 0 : items // Here has various types of responses, some of which are not locations.
      // We only want the actual places, so throw out any without a position.
      .filter(item => !!item.position).map(convertHereToGeojson),
      type: "FeatureCollection"
    };
  }

  rewriteSearchResponse({
    items
  }) {
    return {
      features: items.map(convertHereToGeojson),
      type: "FeatureCollection"
    };
  }

}

exports.default = HereGeocoder;
//# sourceMappingURL=here.js.map