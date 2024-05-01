import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { action } from "@storybook/addon-actions";
export var currentPosition = {
  coords: {
    latitude: 45.508246,
    longitude: -122.711574
  }
};
export var geocoderConfig = {
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
export var unreachableGeocoderConfig = _objectSpread(_objectSpread({}, geocoderConfig), {}, {
  // Putting an erroneous URL on purpose.
  baseUrl: "https://www.example.com/pelias/v1"
});
export var slowGeocoderConfig = _objectSpread(_objectSpread({}, geocoderConfig), {}, {
  // URL to a simulated slow geocoder (see handlers.js).
  baseUrl: "https://slow.trimet.org/pelias/v1"
});
export var hereGeocoderConfig = {
  type: "HERE",
  apiKey: "placeholder_here_key",
  focusPoint: {
    lat: 47.67552,
    lng: -122.31831
  }
};
export var badGeocoderConfig = {
  type: "BAD",
  apiKey: "placeholder_here_key",
  focusPoint: {
    lat: 47.67552,
    lng: -122.31831
  }
};
export var getCurrentPosition = action("getCurrentPosition");
export var onLocationSelected = action("onLocationSelected");
export var selectedLocation = {
  lat: 0,
  lon: 0,
  name: "123 Main St"
};
export var layerColorMap = {
  stops: "purple",
  stations: "navy",
  locality: "orange"
};
export var userLocationsAndRecentPlaces = [{
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
//# sourceMappingURL=common.js.map