import coreUtils from "@opentripplanner/core-utils";
import React from "react";
import { FormattedMessage } from "react-intl";
import * as S from "../styled";
import { defaultMessages } from "../util";

/**
 * Although similar to utils/getVehicleType, this version accommodates gendered articles
 * for Spanish and French, so sentences literally read like "Pickup the scooter ABC".
 */
function VehicleType(_ref) {
  var type = _ref.type;

  switch (type) {
    case "BIKEPARK":
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.bike"],
        description: "Bike vehicle type",
        id: "otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.bike"
      });

    case "BIKESHARE":
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.bikeshare"],
        description: "Bike vehicle type",
        id: "otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.bikeshare"
      });

    case "CARSHARE":
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.car"],
        description: "Bike vehicle type",
        id: "otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.car"
      });

    case "VEHICLERENTAL":
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.escooter"],
        description: "Bike vehicle type",
        id: "otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.escooter"
      });

    default:
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.vehicleType.vehicle"],
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


export default function RentedVehicleSubheader(_ref2) {
  var config = _ref2.config,
      leg = _ref2.leg;
  var configCompanies = config.companies || [];
  var from = leg.from,
      mode = leg.mode,
      rentedBike = leg.rentedBike,
      walkingBike = leg.walkingBike;
  var legName = from.name,
      networks = from.networks,
      vertexType = from.vertexType; // in OTP2 scooters are BIKERENTALs, so we need to override this

  var modeType = mode === "SCOOTER" ? "VEHICLERENTAL" : vertexType; // Sometimes rented vehicles can be walked over things like stairs or other
  // ways that forbid the main mode of travel.

  if (mode === "WALK" || walkingBike) {
    return /*#__PURE__*/React.createElement(S.PlaceSubheader, null, /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.walkVehicle"],
      description: "Instructs to walk with a bike or scooter along a place.",
      id: "otpUi.AccessLegBody.RentedVehicleSubheader.walkVehicle",
      values: {
        place: legName
      }
    }));
  }

  var rentalDescription; // The networks attribute of the from data will only appear at the very
  // beginning of the rental. It is possible that there will be some forced
  // walking that occurs in the middle of the rental, so once the main mode
  // resumes there won't be any network info. In that case we simply return
  // that the rental is continuing.

  if (networks || rentedBike) {
    // Add company and vehicle labels.
    var company = coreUtils.itinerary.getCompaniesLabelFromNetworks(networks || [], configCompanies); // Only show vehicle name for car rentals. For bikes and E-scooters, these
    // IDs/names tend to be less relevant (or entirely useless) in this context.

    var vehicleName = leg.rentedCar && legName ? legName : "";
    rentalDescription = /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.pickupRental"],
      description: "Instructs to pick up a rental vehicle",
      id: "otpUi.AccessLegBody.RentedVehicleSubheader.pickupRental",
      values: {
        company: company,
        vehicleName: vehicleName,
        vehicleType: /*#__PURE__*/React.createElement(VehicleType, {
          type: modeType
        })
      }
    });
  } else {
    rentalDescription = /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.AccessLegBody.RentedVehicleSubheader.resumeRentalRide"],
      description: "Instructs to continue riding with a rental vehicle",
      id: "otpUi.AccessLegBody.RentedVehicleSubheader.resumeRentalRide"
    });
  }

  return /*#__PURE__*/React.createElement(S.PlaceSubheader, null, rentalDescription);
}
//# sourceMappingURL=rented-vehicle-subheader.js.map