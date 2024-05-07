"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userLocationsAndRecentPlaces = exports.layerColorMap = exports.selectedLocation = exports.onLocationSelected = exports.getCurrentPosition = exports.badGeocoderConfig = exports.hereGeocoderConfig = exports.slowGeocoderConfig = exports.unreachableGeocoderConfig = exports.geocoderConfig = exports.currentPosition = void 0;

var _addonActions = require("@storybook/addon-actions");

const currentPosition = {
  coords: {
    latitude: 45.508246,
    longitude: -122.711574
  }
};
exports.currentPosition = currentPosition;
const geocoderConfig = {
  baseUrl: "https://ws-st.trimet.org/pelias/v1",
  // TriMet-specific default
  boundary: {
    // TriMet-specific default
    rect: {
      minLon: -123.2034,
      maxLon: -122.135,
      minLat: 45.273,
      maxLat: 45.7445
    }
  },
  maxNearbyStops: 4,
  type: "PELIAS"
};
exports.geocoderConfig = geocoderConfig;
const unreachableGeocoderConfig = { ...geocoderConfig,
  // Putting an erroneous URL on purpose.
  baseUrl: "https://www.example.com/pelias/v1"
};
exports.unreachableGeocoderConfig = unreachableGeocoderConfig;
const slowGeocoderConfig = { ...geocoderConfig,
  // URL to a simulated slow geocoder (see handlers.js).
  baseUrl: "https://slow.trimet.org/pelias/v1"
};
exports.slowGeocoderConfig = slowGeocoderConfig;
const hereGeocoderConfig = {
  type: "HERE",
  apiKey: "placeholder_here_key",
  focusPoint: {
    lat: 47.67552,
    lng: -122.31831
  }
};
exports.hereGeocoderConfig = hereGeocoderConfig;
const badGeocoderConfig = {
  type: "BAD",
  apiKey: "placeholder_here_key",
  focusPoint: {
    lat: 47.67552,
    lng: -122.31831
  }
};
exports.badGeocoderConfig = badGeocoderConfig;
const getCurrentPosition = (0, _addonActions.action)("getCurrentPosition");
exports.getCurrentPosition = getCurrentPosition;
const onLocationSelected = (0, _addonActions.action)("onLocationSelected");
exports.onLocationSelected = onLocationSelected;
const selectedLocation = {
  lat: 0,
  lon: 0,
  name: "123 Main St"
};
exports.selectedLocation = selectedLocation;
const layerColorMap = {
  stops: "purple",
  stations: "navy",
  locality: "orange"
};
exports.layerColorMap = layerColorMap;
const userLocationsAndRecentPlaces = [{
  icon: "home",
  lat: 45.89,
  lon: 67.12,
  name: "456 Suburb St",
  type: "home"
}, {
  icon: "work",
  lat: 54.32,
  lon: 43.21,
  name: "789 Busy St",
  type: "work"
}, {
  icon: "map-marker",
  lat: 34.22,
  lon: -84.11,
  name: "Coffee Roasters Shop, 55 Coffee Street",
  type: "custom"
}, {
  lat: 12.34,
  lon: 34.45,
  name: "123 Main St",
  type: "recent"
}];
exports.userLocationsAndRecentPlaces = userLocationsAndRecentPlaces;
//# sourceMappingURL=common.js.map