"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lonlat = require("@conveyal/lonlat");

var _abstractGeocoder = _interopRequireDefault(require("./abstract-geocoder"));

/**
 * An implementation that doesn't use an API for geocoding. Merely allows
 * clicking on the map and finding GPS coordinates by typing them in.
 *
 * @extends Geocoder
 */
class NoApiGeocoder extends _abstractGeocoder.default {
  /**
   * Use coordinate string parser.
   */
  autocomplete(query) {
    return this.parseCoordinateString(query.text);
  }
  /**
   * Always return the lat/lon.
   */


  reverse(query) {
    var _this$geocoderConfig;

    let {
      lat,
      lon
    } = query.point;
    lat = this.roundGPSDecimal(lat);
    lon = this.roundGPSDecimal(lon);
    const feature = {
      geometry: {
        coordinates: [lat, lon],
        type: "Point"
      },
      properties: {
        name: `${lat}, ${lon}`
      },
      type: "Feature"
    };

    if ((_this$geocoderConfig = this.geocoderConfig) !== null && _this$geocoderConfig !== void 0 && _this$geocoderConfig.reverseUseFeatureCollection) {
      return Promise.resolve({
        type: "FeatureCollection",
        features: [feature],
        rawGeocodedFeature: feature
      });
    }

    return Promise.resolve({
      lat,
      lon,
      name: feature.properties.name,
      rawGeocodedFeature: feature
    });
  }
  /**
   * Use coordinate string parser.
   */


  search(query) {
    return this.parseCoordinateString(query.text);
  }
  /**
   * Attempt to parse the input as a GPS coordinate. If parseable, return a
   * feature.
   */


  parseCoordinateString(string) {
    let feature;

    try {
      feature = {
        geometry: {
          coordinates: (0, _lonlat.toCoordinates)((0, _lonlat.fromLatFirstString)(string)),
          type: "Point"
        },
        properties: {
          label: string
        }
      };
    } catch (e) {
      return Promise.resolve({
        features: [],
        type: "FeatureCollection"
      });
    }

    return Promise.resolve({
      features: [feature],
      type: "FeatureCollection"
    });
  }

  roundGPSDecimal(number) {
    const roundFactor = 100000;
    return Math.round(number * roundFactor) / roundFactor;
  }

}

exports.default = NoApiGeocoder;
//# sourceMappingURL=noapi.js.map