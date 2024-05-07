"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVehicleType = getVehicleType;
exports.getPlaceName = getPlaceName;
exports.parseOTP2Minute = exports.toModeBorder = exports.toModeBorderColor = exports.toModeColor = exports.toSafeRouteColor = exports.defaultMessages = void 0;

var _flat = _interopRequireDefault(require("flat"));

var _enUS = _interopRequireDefault(require("../i18n/en-US.yml"));

// Load the default messages.
// HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.
const defaultMessages = (0, _flat.default)(_enUS.default);
/**
 * the GTFS spec indicates that the route color should not have a leading hash
 * symbol, so add one if the routeColor exists and doesn't start with a hash
 * symbol.
 */

exports.defaultMessages = defaultMessages;

const toSafeRouteColor = routeColor => {
  return routeColor && (routeColor.startsWith("#") ? routeColor : `#${routeColor}`);
};

exports.toSafeRouteColor = toSafeRouteColor;

const toModeColor = (mode, routeColor) => {
  switch (mode) {
    case "WALK":
      return `#e9e9e9`;

    case "BICYCLE":
    case "BICYCLE_RENT":
      return `red`;

    case "CAR":
      return `grey`;

    case "MICROMOBILITY":
    case "MICROMOBILITY_RENT":
    case "SCOOTER":
      return `#f5a729`;

    default:
      return toSafeRouteColor(routeColor) || "#084c8d";
  }
};

exports.toModeColor = toModeColor;

const toModeBorderColor = (mode, routeColor) => {
  switch (mode) {
    case "WALK":
      return `#484848`;

    case "BICYCLE":
    case "BICYCLE_RENT":
      return `red`;

    case "CAR":
      return `grey`;

    case "MICROMOBILITY":
    case "MICROMOBILITY_RENT":
    case "SCOOTER":
      return `#f5a729`;

    default:
      return toSafeRouteColor(routeColor) || "#008ab0";
  }
};

exports.toModeBorderColor = toModeBorderColor;

const toModeBorder = (mode, routeColor) => {
  switch (mode) {
    case "WALK":
    case "BICYCLE":
    case "BICYCLE_RENT":
    case "CAR":
    case "MICROMOBILITY":
    case "MICROMOBILITY_RENT":
    case "SCOOTER":
      return `dotted 4px ${toModeBorderColor(mode, routeColor)}`;

    default:
      return `solid 8px ${toModeBorderColor(mode, routeColor)}`;
  }
};
/**
 * FIXME: Move this method back to core-utils when package is localized.
 */


exports.toModeBorder = toModeBorder;

function getCompanyForNetwork(networkString, companies = []) {
  const company = companies.find(co => co.id === networkString);

  if (!company) {
    console.warn(`No company found in config.yml that matches rented vehicle network: ${networkString}`, companies);
  }

  return company;
}
/**
 * Gets a localized version of a vehicle type.
 */


function getVehicleType(type, intl) {
  switch (type) {
    case "BIKEPARK":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.AccessLegBody.vehicleType.bike"],
        description: "Bike vehicle type",
        id: "otpUi.AccessLegBody.vehicleType.bike"
      });

    case "BIKESHARE":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.AccessLegBody.vehicleType.bikeshare"],
        description: "Bike share vehicle type",
        id: "otpUi.AccessLegBody.vehicleType.bikeshare"
      });

    case "CARSHARE":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.AccessLegBody.vehicleType.car"],
        description: "Car vehicle type",
        id: "otpUi.AccessLegBody.vehicleType.car"
      });

    case "VEHICLERENTAL":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.AccessLegBody.vehicleType.escooter"],
        description: "E-scooter vehicle type",
        id: "otpUi.AccessLegBody.vehicleType.escooter"
      });

    default:
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.AccessLegBody.vehicleType.vehicle"],
        description: "Generic vehicle type",
        id: "otpUi.AccessLegBody.vehicleType.vehicle"
      });
  }
}
/**
 * Generates a new place name for micromobility stations
 * @param place OTP Place from micromobility location
 * @param companies Configured micromobility companies
 * @param intl IntlShape object
 * @returns User facing string for place
 */


function getPlaceName(place, companies = [], intl) {
  var _place$address$split, _place$networks, _place$rentalVehicle;

  // If address is provided (i.e. for carshare station, use it)
  if (place.address) return (_place$address$split = place.address.split(",")) === null || _place$address$split === void 0 ? void 0 : _place$address$split[0]; // Some vehicle rental pick up locations are just a UUID.
  // Other times, it can be a name with relevant information for the user.
  // Here we detect if the name is just a UUID and generate a better name.
  // It is also possible to configure station name overrides in the config using overridePlaceNames.

  const company = getCompanyForNetwork(((_place$networks = place.networks) === null || _place$networks === void 0 ? void 0 : _place$networks[0]) || (place === null || place === void 0 ? void 0 : (_place$rentalVehicle = place.rentalVehicle) === null || _place$rentalVehicle === void 0 ? void 0 : _place$rentalVehicle.network), companies);

  if ((place.name.match(/-/g) || []).length > 3 || company !== null && company !== void 0 && company.overridePlaceNames) {
    if (company && intl) {
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.AccessLegBody.vehicleTitle"],
        description: "Formats rental vehicle company and type",
        id: "otpUi.AccessLegBody.vehicleTitle"
      }, {
        company: company.label,
        vehicleType: getVehicleType(place.vertexType, intl)
      });
    }
  } // Default to place name


  return place.name;
} // TODO: is this the best way to do this?


const parseOTP2Minute = otp2Minute => {
  return otp2Minute.split("PT")[1].split("M")[0];
};

exports.parseOTP2Minute = parseOTP2Minute;
//# sourceMappingURL=util.js.map