import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { humanizeDistanceString } from "@opentripplanner/humanize-distance";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import * as S from "../styled";
import { defaultMessages, getPlaceName } from "../util";

/**
 * Gets the summary mode in the ambient language.
 */
export function getSummaryMode(leg, intl) {
  switch (leg.mode) {
    case "BICYCLE":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.AccessLegBody.summaryMode.bike"],
        description: "Bike to somewhere",
        id: "otpUi.AccessLegBody.summaryMode.bike"
      });

    case "BICYCLE_RENT":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.AccessLegBody.summaryMode.bikeshare"],
        description: "Bikeshare to somewhere",
        id: "otpUi.AccessLegBody.summaryMode.bikeshare"
      });

    case "CAR":
      return leg.rideHailingEstimate ? intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.AccessLegBody.summaryMode.carHail"],
        description: "Ride in a car/taxi to somewhere",
        id: "otpUi.AccessLegBody.summaryMode.carHail"
      }) : intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.AccessLegBody.summaryMode.carDrive"],
        description: "Drive somewhere",
        id: "otpUi.AccessLegBody.summaryMode.carDrive"
      });

    case "MICROMOBILITY":
    case "MICROMOBILITY_RENT":
    case "SCOOTER":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.AccessLegBody.summaryMode.escooter"],
        description: "Use an e-scooter",
        id: "otpUi.AccessLegBody.summaryMode.escooter"
      });

    case "WALK":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.AccessLegBody.summaryMode.walk"],
        description: "Walk to somewhere",
        id: "otpUi.AccessLegBody.summaryMode.walk"
      });

    default:
      return leg.mode;
  }
}
/**
 * Renders leg description text, e.g. "Walk 0.5 mi to..."
 * while letting others style the mode and place text.
 */

export default function AccessLegDescription(_ref) {
  var className = _ref.className,
      config = _ref.config,
      leg = _ref.leg,
      style = _ref.style;
  var intl = useIntl(); // Replace the Vertex Type for BIKESHARE with VEHICLE as we do not know that
  // it is a bike yet because that information is in the next leg with OTP2.

  var toPlace = _objectSpread(_objectSpread({}, leg.to), {}, {
    vertexType: leg.to.vertexType === "BIKESHARE" ? "VEHICLE" : leg.to.vertexType
  });

  var modeContent = getSummaryMode(leg, intl);
  var placeContent = /*#__PURE__*/React.createElement(S.LegDescriptionPlace, null, getPlaceName(toPlace, config.companies, intl));
  return (
    /*#__PURE__*/
    // Return an HTML element which is passed a className (and style props)
    // for styled-components support.
    React.createElement("span", {
      className: className,
      style: style
    }, leg.distance > 0 ? /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: "{mode} {distance} to {place}",
      description: "Summarizes an access leg, including distance",
      id: "otpUi.AccessLegBody.summaryAndDistance",
      values: {
        // TODO: Implement metric vs imperial (up until now it's just imperial).
        distance: humanizeDistanceString(leg.distance, false, intl),
        mode: modeContent,
        place: placeContent
      }
    }) : /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: "{mode} to {place}",
      description: "Summarizes an access leg",
      id: "otpUi.AccessLegBody.summary",
      values: {
        mode: modeContent,
        place: placeContent
      }
    }))
  );
}
//# sourceMappingURL=access-leg-description.js.map