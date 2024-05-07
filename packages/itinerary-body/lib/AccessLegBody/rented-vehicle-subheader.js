"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RentedVehicleSubheader;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var S = _interopRequireWildcard(require("../styled"));

var _util = require("../util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Although similar to utils/getVehicleType, this version accommodates gendered articles
 * for Spanish and French, so sentences literally read like "Pickup the scooter ABC".
 */
function VehicleType({
  type
}) {
  switch (type) {
    case "BIKEPARK":
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.bike"],
        description: "Bike vehicle type",
        id: "otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.bike"
      });

    case "BIKESHARE":
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.bikeshare"],
        description: "Bike vehicle type",
        id: "otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.bikeshare"
      });

    case "CARSHARE":
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.car"],
        description: "Bike vehicle type",
        id: "otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.car"
      });

    case "VEHICLERENTAL":
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.escooter"],
        description: "Bike vehicle type",
        id: "otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.escooter"
      });

    default:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.vehicle"],
        description: "Bike vehicle type",
        id: "otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.vehicle"
      });
  }
}
/**
 * A component to display vehicle rental instructions, such as
 *   Pick up REACHNOW rented car XYZNDB OR
 *   Pick up SPIN E-scooter
 *   Pick up shared bike
 *
 * The word "Vehicle" has been used
 * because a future refactor is intended to combine car rental, bike rental
 * and micromobility rental all within this component. The future refactor is
 * assuming that the leg.rentedCar and leg.rentedBike response elements from OTP
 * will eventually be merged into the leg.rentedVehicle element.
 */


function RentedVehicleSubheader({
  config,
  leg
}) {
  const configCompanies = config.companies || [];
  const {
    from,
    mode,
    rentedBike,
    walkingBike
  } = leg;
  const {
    name: legName,
    networks,
    vertexType
  } = from; // in OTP2 scooters are BIKERENTALs, so we need to override this

  const modeType = mode === "SCOOTER" ? "VEHICLERENTAL" : vertexType; // Sometimes rented vehicles can be walked over things like stairs or other
  // ways that forbid the main mode of travel.

  if (mode === "WALK" || walkingBike) {
    return /*#__PURE__*/_react.default.createElement(S.PlaceSubheader, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.walkVehicle"],
      description: "Instructs to walk with a bike or scooter along a place.",
      id: "otpUi.AccessLegBody.RentedVehicleSubheader.walkVehicle",
      values: {
        place: legName
      }
    }));
  }

  let rentalDescription; // The networks attribute of the from data will only appear at the very
  // beginning of the rental. It is possible that there will be some forced
  // walking that occurs in the middle of the rental, so once the main mode
  // resumes there won't be any network info. In that case we simply return
  // that the rental is continuing.

  if (networks || rentedBike) {
    // Add company and vehicle labels.
    const company = _coreUtils.default.itinerary.getCompaniesLabelFromNetworks(networks || [], configCompanies); // Only show vehicle name for car rentals. For bikes and E-scooters, these
    // IDs/names tend to be less relevant (or entirely useless) in this context.


    const vehicleName = leg.rentedCar && legName ? legName : "";
    rentalDescription = /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.pickupRental"],
      description: "Instructs to pick up a rental vehicle",
      id: "otpUi.AccessLegBody.RentedVehicleSubheader.pickupRental",
      values: {
        company,
        vehicleName,
        vehicleType: /*#__PURE__*/_react.default.createElement(VehicleType, {
          type: modeType
        })
      }
    });
  } else {
    rentalDescription = /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.resumeRentalRide"],
      description: "Instructs to continue riding with a rental vehicle",
      id: "otpUi.AccessLegBody.RentedVehicleSubheader.resumeRentalRide"
    });
  }

  return /*#__PURE__*/_react.default.createElement(S.PlaceSubheader, null, rentalDescription);
}
//# sourceMappingURL=rented-vehicle-subheader.js.map