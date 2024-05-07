"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentPositionToLocation = currentPositionToLocation;
exports.coordsToString = coordsToString;
exports.stringToCoords = stringToCoords;
exports.constructLocation = constructLocation;
exports.matchLatLon = matchLatLon;
exports.isBikeshareStation = isBikeshareStation;
exports.isEScooterStation = isEScooterStation;
exports.isCarWalkTransition = isCarWalkTransition;
exports.isValidLat = isValidLat;
exports.isValidLng = isValidLng;
exports.isValidLatLng = isValidLatLng;

function currentPositionToLocation(currentPosition) {
  if (currentPosition.error || !currentPosition.coords) {
    console.warn("Cannot construct location from current position due to geolocation error or missing coordinates.");
    return null;
  }

  return {
    lat: currentPosition.coords.latitude,
    lon: currentPosition.coords.longitude,
    category: "CURRENT_LOCATION"
  };
} // TRICKY: This method is used in query.js and in the context of
// otp-rr actions where the intl context is not available/does not apply.


function coordsToString(coords) {
  return coords.length && coords.map(c => (+c).toFixed(5)).join(", ");
}

function stringToCoords(str) {
  return str && str.split(",").map(c => +c) || [];
}

function constructLocation(latlng) {
  return {
    lat: latlng.lat,
    lon: latlng.lng
  };
}

function matchLatLon(location1, location2) {
  if (!location1 || !location2) return location1 === location2;
  return location1.lat === location2.lat && location1.lon === location2.lon;
}

function isBikeshareStation(place) {
  return place.place_id.lastIndexOf("bicycle_rent_station") !== -1;
}

function isEScooterStation(place) {
  return place.place_id.lastIndexOf("escooter_rent_station") !== -1;
}

function isCarWalkTransition(place) {
  return place.place_id.lastIndexOf("itin_car_") !== -1;
}

function isValidLat(lat) {
  return Number.isFinite(lat) && lat >= -90 && lat <= 90;
}

function isValidLng(lng) {
  return Number.isFinite(lng) && lng >= -180 && lng <= 180;
}

function isValidLatLng(arr) {
  return Array.isArray(arr) && arr.length === 2 && isValidLat(arr[0]) && isValidLng(arr[1]);
}
//# sourceMappingURL=map.js.map