import { getLegRouteLongName } from "@opentripplanner/core-utils/lib/itinerary";
import React from "react";
import { FormattedMessage } from "react-intl";
import { compareTwoStrings } from "string-similarity";
import * as S from "../styled";
import { defaultMessages } from "../util";

/**
 * Helper function to format the "to" separator.
 */
function toPrefix(contents) {
  return /*#__PURE__*/React.createElement(S.LegDescriptionHeadsignPrefix, null, contents);
}

export default function RouteLongName(_ref) {
  var className = _ref.className,
      leg = _ref.leg,
      style = _ref.style;
  var otp1Headsign = leg.headsign,
      trip = leg.trip;
  var headsign = (trip === null || trip === void 0 ? void 0 : trip.tripHeadsign) || otp1Headsign;
  var routeLongName = getLegRouteLongName(leg); // Hide route long name if it contains similar information to the headsign

  var hideRouteLongName = compareTwoStrings(headsign || "", routeLongName || "") > 0.25 || !routeLongName;
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: style
  }, !hideRouteLongName && headsign ? /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TransitLegBody.routeDescription"],
    description: "Displays the route name and destination",
    id: "otpUi.TransitLegBody.routeDescription",
    values: {
      headsign: headsign,
      routeName: routeLongName,
      toPrefix: toPrefix
    }
  }) : headsign || routeLongName);
}
//# sourceMappingURL=route-long-name.js.map