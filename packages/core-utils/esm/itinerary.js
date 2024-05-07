import _typeof from "@babel/runtime/helpers/typeof";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import polyline from "@mapbox/polyline";
import turfAlong from "@turf/along"; // All OTP transit modes

export var transitModes = ["TRAM", "TROLLEYBUS", "BUS", "SUBWAY", "FERRY", "RAIL", "GONDOLA"];
/**
 * @param  {config} config OTP-RR configuration object
 * @return {Array}  List of all transit modes defined in config; otherwise default mode list
 */

export function getTransitModes(config) {
  if (!config || !config.modes || !config.modes.transitModes) return transitModes;
  return config.modes.transitModes.map(function (tm) {
    return typeof tm !== "string" ? tm.mode : tm;
  });
}
export function isTransit(mode) {
  return transitModes.includes(mode) || mode === "TRANSIT";
}
/**
 * Returns true if the leg pickup rules enabled which require
 * calling ahead for the service to run. "mustPhone" is the only
 * property which encodes this info.
 */

export function isReservationRequired(leg) {
  return leg.boardRule === "mustPhone" || leg.alightRule === "mustPhone";
}
/**
 * Returns true if a user must ask the driver to let the user off
 * or if the user must flag the driver down for pickup.
 * "coordinateWithDriver" in board/alight rule encodes this info.
 */

export function isCoordinationRequired(leg) {
  return leg.boardRule === "coordinateWithDriver" || leg.alightRule === "coordinateWithDriver";
}
/**
 * The two rules checked by the above two functions are the only values
 * returned by OTP when a leg is a flex leg.
 */

export function isFlex(leg) {
  return isReservationRequired(leg) || isCoordinationRequired(leg);
}
export function isAdvanceBookingRequired(info) {
  var _info$latestBookingTi;

  return (info === null || info === void 0 ? void 0 : (_info$latestBookingTi = info.latestBookingTime) === null || _info$latestBookingTi === void 0 ? void 0 : _info$latestBookingTi.daysPrior) > 0;
}
export function legDropoffRequiresAdvanceBooking(leg) {
  return isAdvanceBookingRequired(leg.dropOffBookingInfo);
}
export function isRideshareLeg(leg) {
  var _leg$rideHailingEstim, _leg$rideHailingEstim2;

  return !!((_leg$rideHailingEstim = leg.rideHailingEstimate) !== null && _leg$rideHailingEstim !== void 0 && (_leg$rideHailingEstim2 = _leg$rideHailingEstim.provider) !== null && _leg$rideHailingEstim2 !== void 0 && _leg$rideHailingEstim2.id);
}
export function isWalk(mode) {
  if (!mode) return false;
  return mode === "WALK";
}
export function isBicycle(mode) {
  if (!mode) return false;
  return mode === "BICYCLE";
}
export function isBicycleRent(mode) {
  if (!mode) return false;
  return mode === "BICYCLE_RENT";
}
export function isCar(mode) {
  if (!mode) return false;
  return mode.startsWith("CAR");
}
export function isMicromobility(mode) {
  if (!mode) return false;
  return mode.startsWith("MICROMOBILITY") || mode.startsWith("SCOOTER");
}
export function isAccessMode(mode) {
  return isWalk(mode) || isBicycle(mode) || isBicycleRent(mode) || isCar(mode) || isMicromobility(mode);
}
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes are transit modes
 */

export function hasTransit(modesStr) {
  return modesStr.split(",").some(function (mode) {
    return isTransit(mode);
  });
}
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes are car-based modes
 */

export function hasCar(modesStr) {
  return modesStr.split(",").some(function (mode) {
    return isCar(mode);
  });
}
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes are bicycle-based modes
 */

export function hasBike(modesStr) {
  return modesStr.split(",").some(function (mode) {
    return isBicycle(mode) || isBicycleRent(mode);
  });
}
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes are micromobility-based modes
 */

export function hasMicromobility(modesStr) {
  return modesStr.split(",").some(function (mode) {
    return isMicromobility(mode);
  });
}
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes is a hailing mode
 */

export function hasHail(modesStr) {
  return modesStr.split(",").some(function (mode) {
    return mode.indexOf("_HAIL") > -1;
  });
}
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes is a rental mode
 */

export function hasRental(modesStr) {
  return modesStr.split(",").some(function (mode) {
    return mode.indexOf("_RENT") > -1;
  });
}
export function getMapColor(mode) {
  mode = mode || this.get("mode");
  if (mode === "WALK") return "#444";
  if (mode === "BICYCLE") return "#0073e5";
  if (mode === "SUBWAY") return "#e60000";
  if (mode === "RAIL") return "#b00";
  if (mode === "BUS") return "#080";
  if (mode === "TROLLEYBUS") return "#080";
  if (mode === "TRAM") return "#800";
  if (mode === "FERRY") return "#008";
  if (mode === "CAR") return "#444";
  if (mode === "MICROMOBILITY" || mode === "SCOOTER") return "#f5a729";
  return "#aaa";
}
export function toSentenceCase(str) {
  if (str == null) {
    return "";
  }

  str = String(str);
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}
/**
 * Derive the company string based on mode and network associated with leg.
 */

export function getCompanyFromLeg(leg) {
  if (!leg) return null;
  var from = leg.from,
      mode = leg.mode,
      rentedBike = leg.rentedBike,
      rentedCar = leg.rentedCar,
      rentedVehicle = leg.rentedVehicle,
      rideHailingEstimate = leg.rideHailingEstimate;

  if (mode === "CAR" && rentedCar) {
    return from.networks[0];
  }

  if (mode === "CAR" && rideHailingEstimate) {
    return rideHailingEstimate.provider.id;
  }

  if (mode === "BICYCLE" && rentedBike && from.networks) {
    return from.networks[0];
  }

  if (from.rentalVehicle) {
    return from.rentalVehicle.network;
  }

  if ((mode === "MICROMOBILITY" || mode === "SCOOTER") && rentedVehicle && from.networks) {
    return from.networks[0];
  }

  return null;
}
export function getItineraryBounds(itinerary) {
  var coords = [];
  itinerary.legs.forEach(function (leg) {
    var legCoords = polyline.toGeoJSON(leg.legGeometry.points).coordinates.map(function (c) {
      return [c[1], c[0]];
    });
    coords = [].concat(_toConsumableArray(coords), _toConsumableArray(legCoords));
  });
  return coords;
}
/**
 * Return a coords object that encloses the given leg's geometry.
 */

export function getLegBounds(leg) {
  var coords = polyline.toGeoJSON(leg.legGeometry.points).coordinates.map(function (c) {
    return [c[1], c[0]];
  }); // in certain cases, there might be zero-length coordinates in the leg
  // geometry. In these cases, build us an array of coordinates using the from
  // and to data of the leg.

  if (coords.length === 0) {
    coords.push([leg.from.lat, leg.from.lon], [leg.to.lat, leg.to.lon]);
  }

  return coords;
}
/* Returns an interpolated lat-lon at a specified distance along a leg */

export function legLocationAtDistance(leg, distance) {
  if (!leg.legGeometry) return null;

  try {
    var line = polyline.toGeoJSON(leg.legGeometry.points);
    var pt = turfAlong(line, distance, {
      units: "meters"
    });

    if (pt && pt.geometry && pt.geometry.coordinates) {
      return [pt.geometry.coordinates[1], pt.geometry.coordinates[0]];
    }
  } catch (e) {// FIXME handle error!
  }

  return null;
}
/* Returns an interpolated elevation at a specified distance along a leg */

export function legElevationAtDistance(points, distance) {
  // Iterate through the combined elevation profile
  var traversed = 0; // If first point distance is not zero, insert starting point at zero with
  // null elevation. Encountering this value should trigger the warning below.

  if (points[0][0] > 0) {
    points.unshift([0, null]);
  }

  for (var i = 1; i < points.length; i++) {
    var start = points[i - 1];
    var elevDistanceSpan = points[i][0] - start[0];

    if (distance >= traversed && distance <= traversed + elevDistanceSpan) {
      // Distance falls within this point and the previous one;
      // compute & return interpolated elevation value
      if (start[1] === null) {
        console.warn("Elevation value does not exist for distance.", distance, traversed);
        return null;
      }

      var pct = (distance - traversed) / elevDistanceSpan;
      var elevSpan = points[i][1] - start[1];
      return start[1] + elevSpan * pct;
    }

    traversed += elevDistanceSpan;
  }

  console.warn("Elevation value does not exist for distance.", distance, traversed);
  return null;
} // Iterate through the steps, building the array of elevation points and
// keeping track of the minimum and maximum elevations reached

export function getElevationProfile(steps) {
  var unitConversion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var minElev = 100000;
  var maxElev = -100000;
  var traversed = 0;
  var gain = 0;
  var loss = 0;
  var previous = null;
  var points = [];
  steps.forEach(function (step) {
    if (!step.elevation || step.elevation.length === 0) {
      traversed += step.distance;
      return;
    }

    for (var i = 0; i < step.elevation.length; i++) {
      var elev = step.elevation[i];

      if (previous) {
        var diff = (elev.second - previous.second) * unitConversion;
        if (diff > 0) gain += diff;else loss += diff;
      }

      if (i === 0 && elev.first !== 0) {// console.warn(`No elevation data available for step ${stepIndex}-${i} at beginning of segment`, elev)
      }

      var convertedElevation = elev.second * unitConversion;
      if (convertedElevation < minElev) minElev = convertedElevation;
      if (convertedElevation > maxElev) maxElev = convertedElevation;
      points.push([traversed + elev.first, elev.second]); // Insert "filler" point if the last point in elevation profile does not
      // reach the full distance of the step.

      if (i === step.elevation.length - 1 && elev.first !== step.distance) {// points.push([traversed + step.distance, elev.second])
      }

      previous = elev;
    }

    traversed += step.distance;
  });
  return {
    maxElev: maxElev,
    minElev: minElev,
    points: points,
    traversed: traversed,
    gain: gain,
    loss: loss
  };
}
/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {string} text The text to be rendered.
 * @param {string} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */

export function getTextWidth(text) {
  var font = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "22px Arial";
  // reuse canvas object for better performance
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}
/**
 * Get the configured company object for the given network string if the company
 * has been defined in the provided companies array config.
 */

export function getCompanyForNetwork(networkString) {
  var companies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var company = companies.find(function (co) {
    return co.id === networkString;
  });

  if (!company) {
    console.warn("No company found in config.yml that matches rented vehicle network: ".concat(networkString), companies);
  }

  return company;
}
/**
 * Get a string label to display from a list of vehicle rental networks.
 *
 * @param  {Array<string>} networks  A list of network ids.
 * @param  {Array<object>}  [companies=[]] An optional list of the companies config.
 * @return {string}  A label for use in presentation on a website.
 */

export function getCompaniesLabelFromNetworks(networks) {
  var companies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return networks.map(function (network) {
    return getCompanyForNetwork(network, companies);
  }).filter(function (co) {
    return !!co;
  }).map(function (co) {
    return co.label;
  }).join("/");
}
export function getTNCLocation(leg, type) {
  var location = leg[type];
  return "".concat(location.lat.toFixed(5), ",").concat(location.lon.toFixed(5));
}
export function calculatePhysicalActivity(itinerary) {
  var walkDuration = 0;
  var bikeDuration = 0;
  itinerary.legs.forEach(function (leg) {
    if (leg.mode.startsWith("WALK")) walkDuration += leg.duration;
    if (leg.mode.startsWith("BICYCLE")) bikeDuration += leg.duration;
  });
  var caloriesBurned = walkDuration / 3600 * 280 + bikeDuration / 3600 * 290;
  return {
    bikeDuration: bikeDuration,
    caloriesBurned: caloriesBurned,
    walkDuration: walkDuration
  };
}
/**
 * For an itinerary, calculates the TNC fares and returns an object with
 * these values and currency info.
 * It is assumed that the same currency is used for all TNC legs.
 */

export function calculateTncFares(itinerary) {
  return itinerary.legs.filter(function (leg) {
    return leg.mode === "CAR" && leg.rideHailingEstimate;
  }).reduce(function (_ref, _ref2) {
    var maxTNCFare = _ref.maxTNCFare,
        minTNCFare = _ref.minTNCFare;
    var rideHailingEstimate = _ref2.rideHailingEstimate;
    var minPrice = rideHailingEstimate.minPrice,
        maxPrice = rideHailingEstimate.maxPrice;
    return {
      // Assumes a single currency for entire itinerary.
      currencyCode: minPrice.currency.code,
      maxTNCFare: maxTNCFare + maxPrice.amount,
      minTNCFare: minTNCFare + minPrice.amount
    };
  }, {
    currencyCode: null,
    maxTNCFare: 0,
    minTNCFare: 0
  });
}
/**
 * Sources:
 * - https://www.itf-oecd.org/sites/default/files/docs/environmental-performance-new-mobility.pdf
 * - https://www.thrustcarbon.com/insights/how-to-calculate-emissions-from-a-ferry-journey
 * - https://www.itf-oecd.org/sites/default/files/life-cycle-assessment-calculations-2020.xlsx
 * Other values extrapolated.
 */

var CARBON_INTENSITY_DEFAULTS = {
  walk: 0.026,
  bicycle: 0.017,
  car: 0.162,
  tram: 0.066,
  trolleybus: 0.066,
  subway: 0.066,
  rail: 0.066,
  bus: 0.09,
  ferry: 0.082,
  cable_car: 0.021,
  gondola: 0.021,
  funicular: 0.066,
  transit: 0.066,
  leg_switch: 0,
  airplane: 0.382,
  micromobility: 0.095
};
/**
 * @param {itinerary} itinerary OTP trip itinierary, only legs is required.
 * @param {carbonIntensity} carbonIntensity carbon intensity by mode in grams/meter
 * @param {units} units units to be used in return value
 * @return Amount of carbon in chosen unit
 */

export function calculateEmissions( // This type makes all the properties from Itinerary optional except legs.
itinerary) {
  var _itinerary$legs;

  var carbonIntensity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var units = arguments.length > 2 ? arguments[2] : undefined;

  // Apply defaults for any values that we don't have.
  var carbonIntensityWithDefaults = _objectSpread(_objectSpread({}, CARBON_INTENSITY_DEFAULTS), carbonIntensity); // Distance is in meters, totalCarbon is in grams


  var totalCarbon = (itinerary === null || itinerary === void 0 ? void 0 : (_itinerary$legs = itinerary.legs) === null || _itinerary$legs === void 0 ? void 0 : _itinerary$legs.reduce(function (total, leg) {
    return (leg.distance * carbonIntensityWithDefaults[leg.mode.toLowerCase()] || 0) + total;
  }, 0)) || 0;

  switch (units) {
    case "ounce":
      return totalCarbon / 28.35;

    case "kilogram":
      return totalCarbon / 1000;

    case "pound":
      return totalCarbon / 454;

    case "gram":
    default:
      return totalCarbon;
  }
}
/**
 * Returns the user-facing stop id to display for a stop or place, using the following priority:
 * 1. stop code,
 * 2. stop id without the agency id portion, if stop id contains an agency portion,
 * 3. stop id, whether null or not (this is the fallback case).
 */

export function getDisplayedStopId(placeOrStop) {
  var _stopId;

  var stopId;
  var stopCode;

  if ("stopId" in placeOrStop) {
    stopCode = placeOrStop.stopCode;
    stopId = placeOrStop.stopId;
  } else if ("id" in placeOrStop) {
    stopCode = placeOrStop.code;
    stopId = placeOrStop.id;
  }

  return stopCode || ((_stopId = stopId) === null || _stopId === void 0 ? void 0 : _stopId.split(":")[1]) || stopId;
}
/**
 * Extracts useful data from the fare products on a leg, such as the leg cost and transfer info.
 * @param leg Leg with fare products (must have used getLegsWithFares)
 * @param category Rider category
 * @param container Fare container (cash, electronic)
 * @returns Object containing price as well as the transfer discount amount, if a transfer was used.
 */

export function getLegCost(leg, mediumId, riderCategoryId) {
  if (!leg.fareProducts) return {
    price: undefined
  };
  var relevantFareProducts = leg.fareProducts.filter(function (_ref3) {
    var product = _ref3.product;
    // riderCategory and medium can be specifically defined as null to handle
    // generic GTFS based fares from OTP when there is no fare model
    return (product.riderCategory === null ? null : product.riderCategory.id) === riderCategoryId && (product.medium === null ? null : product.medium.id) === mediumId;
  }); // Custom fare models return "rideCost", generic GTFS fares return "regular"

  var totalCostProduct = relevantFareProducts.find(function (fp) {
    return fp.product.name === "rideCost" || fp.product.name === "regular";
  });
  var transferFareProduct = relevantFareProducts.find(function (fp) {
    return fp.product.name === "transfer";
  });
  return {
    price: totalCostProduct === null || totalCostProduct === void 0 ? void 0 : totalCostProduct.product.price,
    transferAmount: transferFareProduct === null || transferFareProduct === void 0 ? void 0 : transferFareProduct.product.price,
    productUseId: totalCostProduct === null || totalCostProduct === void 0 ? void 0 : totalCostProduct.id
  };
}
/**
 * Returns the total itinerary cost for a given set of legs.
 * @param legs Itinerary legs with fare products (must have used getLegsWithFares)
 * @param category Rider category (youth, regular, senior)
 * @param container Fare container (cash, electronic)
 * @returns Money object for the total itinerary cost.
 */

export function getItineraryCost(legs, mediumId, riderCategoryId) {
  var legCosts = legs // Only legs with fares (no walking legs)
  .filter(function (leg) {
    var _leg$fareProducts;

    return ((_leg$fareProducts = leg.fareProducts) === null || _leg$fareProducts === void 0 ? void 0 : _leg$fareProducts.length) > 0;
  }) // Get the leg cost object of each leg
  .map(function (leg) {
    return getLegCost(leg, mediumId, riderCategoryId);
  }).filter(function (cost) {
    return cost.price !== undefined;
  }) // Filter out duplicate use IDs
  // One fare product can be used on multiple legs,
  // and we don't want to count it more than once.
  .reduce(function (prev, cur) {
    if (!prev.some(function (p) {
      return p.productUseId === cur.productUseId;
    })) {
      prev.push({
        productUseId: cur.productUseId,
        price: cur.price
      });
    }

    return prev;
  }, []).map(function (productUse) {
    return productUse.price;
  });
  if (legCosts.length === 0) return undefined; // Calculate the total

  return legCosts.reduce(function (prev, cur) {
    var _prev$currency;

    return {
      amount: prev.amount + (cur === null || cur === void 0 ? void 0 : cur.amount) || 0,
      currency: (_prev$currency = prev.currency) !== null && _prev$currency !== void 0 ? _prev$currency : cur === null || cur === void 0 ? void 0 : cur.currency
    };
  }, {
    amount: 0,
    currency: null
  });
}

var pickupDropoffTypeToOtp1 = function pickupDropoffTypeToOtp1(otp2Type) {
  switch (otp2Type) {
    case "COORDINATE_WITH_DRIVER":
      return "coordinateWithDriver";

    case "CALL_AGENCY":
      return "mustPhone";

    case "SCHEDULED":
      return "scheduled";

    case "NONE":
      return "none";

    default:
      return null;
  }
};

export var convertGraphQLResponseToLegacy = function convertGraphQLResponseToLegacy(leg) {
  var _leg$agency, _leg$agency2, _leg$agency3, _leg$agency4, _leg$from$stop, _leg$from$stop2, _leg$route, _leg$route2, _leg$route3, _leg$route4, _leg$route5, _leg$route6, _leg$to$stop, _leg$to$stop2, _leg$trip, _leg$trip2;

  return _objectSpread(_objectSpread({}, leg), {}, {
    agencyBrandingUrl: (_leg$agency = leg.agency) === null || _leg$agency === void 0 ? void 0 : _leg$agency.url,
    agencyId: (_leg$agency2 = leg.agency) === null || _leg$agency2 === void 0 ? void 0 : _leg$agency2.id,
    agencyName: (_leg$agency3 = leg.agency) === null || _leg$agency3 === void 0 ? void 0 : _leg$agency3.name,
    agencyUrl: (_leg$agency4 = leg.agency) === null || _leg$agency4 === void 0 ? void 0 : _leg$agency4.url,
    alightRule: pickupDropoffTypeToOtp1(leg.dropoffType),
    boardRule: pickupDropoffTypeToOtp1(leg.pickupType),
    dropOffBookingInfo: {
      latestBookingTime: leg.dropOffBookingInfo
    },
    from: _objectSpread(_objectSpread({}, leg.from), {}, {
      stopCode: (_leg$from$stop = leg.from.stop) === null || _leg$from$stop === void 0 ? void 0 : _leg$from$stop.code,
      stopId: (_leg$from$stop2 = leg.from.stop) === null || _leg$from$stop2 === void 0 ? void 0 : _leg$from$stop2.gtfsId
    }),
    route: (_leg$route = leg.route) === null || _leg$route === void 0 ? void 0 : _leg$route.shortName,
    routeColor: (_leg$route2 = leg.route) === null || _leg$route2 === void 0 ? void 0 : _leg$route2.color,
    routeId: (_leg$route3 = leg.route) === null || _leg$route3 === void 0 ? void 0 : _leg$route3.gtfsId,
    routeLongName: (_leg$route4 = leg.route) === null || _leg$route4 === void 0 ? void 0 : _leg$route4.longName,
    routeShortName: (_leg$route5 = leg.route) === null || _leg$route5 === void 0 ? void 0 : _leg$route5.shortName,
    routeTextColor: (_leg$route6 = leg.route) === null || _leg$route6 === void 0 ? void 0 : _leg$route6.textColor,
    to: _objectSpread(_objectSpread({}, leg.to), {}, {
      stopCode: (_leg$to$stop = leg.to.stop) === null || _leg$to$stop === void 0 ? void 0 : _leg$to$stop.code,
      stopId: (_leg$to$stop2 = leg.to.stop) === null || _leg$to$stop2 === void 0 ? void 0 : _leg$to$stop2.gtfsId
    }),
    tripHeadsign: (_leg$trip = leg.trip) === null || _leg$trip === void 0 ? void 0 : _leg$trip.tripHeadsign,
    tripId: (_leg$trip2 = leg.trip) === null || _leg$trip2 === void 0 ? void 0 : _leg$trip2.gtfsId
  });
};
/** Extracts the route number for a leg returned from OTP1 or OTP2. */

export var getLegRouteShortName = function getLegRouteShortName(leg) {
  var route = leg.route,
      routeShortName = leg.routeShortName; // typeof route === "object" denotes newer OTP2 responses. routeShortName and route as string is OTP1.

  return _typeof(route) === "object" ? route === null || route === void 0 ? void 0 : route.shortName : routeShortName || route;
};
/** Extract the route long name for a leg returned from OTP1 or OTP2. */

export var getLegRouteLongName = function getLegRouteLongName(leg) {
  var route = leg.route,
      routeLongName = leg.routeLongName; // typeof route === "object" denotes newer OTP2 responses. routeLongName is OTP1.

  return _typeof(route) === "object" ? route === null || route === void 0 ? void 0 : route.longName : routeLongName;
};
/**
 * Returns the route short name, or the route long name if no short name is provided.
 * This is happens with Seattle area streetcars and ferries.
 */

export var getLegRouteName = function getLegRouteName(leg) {
  return getLegRouteShortName(leg) || getLegRouteLongName(leg);
};
//# sourceMappingURL=itinerary.js.map