import { getLegRouteLongName, getLegRouteShortName } from "@opentripplanner/core-utils/lib/itinerary";
import LocationIcon from "@opentripplanner/location-icon";
import React from "react";
import { useIntl } from "react-intl";
import RouteBadge from "../RouteBadge";
import * as S from "../styled";
import { defaultMessages } from "../util";
/**
 * Gets the travel mode in the ambient language.
 */

function getTravelMode(modeId, intl) {
  switch (modeId) {
    case "BICYCLE":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ItineraryBody.travelByMode.bike"],
        description: "Travel by bike",
        id: "otpUi.ItineraryBody.travelByMode.bike"
      });

    case "CAR":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ItineraryBody.travelByMode.car"],
        description: "Travel by car",
        id: "otpUi.ItineraryBody.travelByMode.car"
      });

    case "MICROMOBILITY":
    case "SCOOTER":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ItineraryBody.travelByMode.escooter"],
        description: "Travel by e-scooter",
        id: "otpUi.ItineraryBody.travelByMode.escooter"
      });

    case "WALK":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ItineraryBody.travelByMode.walk"],
        description: "Travel by walking",
        id: "otpUi.ItineraryBody.travelByMode.walk"
      });

    default:
      return modeId;
  }
}

export default function LineColumnContent(_ref) {
  var interline = _ref.interline,
      isDestination = _ref.isDestination,
      leg = _ref.leg,
      LegIcon = _ref.LegIcon,
      toRouteAbbreviation = _ref.toRouteAbbreviation;
  var mode = leg.mode,
      routeColor = leg.routeColor,
      transitLeg = leg.transitLeg;
  var intl = useIntl();
  var travelByMessage = intl.formatMessage({
    defaultMessage: defaultMessages["otpUi.ItineraryBody.travelBy"],
    description: "Instructs to travel using a mode",
    id: "otpUi.ItineraryBody.travelBy"
  }, {
    mode: getTravelMode(mode, intl)
  });
  var routeShortName = getLegRouteShortName(leg);
  return /*#__PURE__*/React.createElement(S.LegLine, null, !isDestination && /*#__PURE__*/React.createElement(S.InnerLine, {
    mode: mode,
    routeColor: routeColor
  }), /*#__PURE__*/React.createElement(S.LineBadgeContainer, null, !interline && !isDestination && transitLeg && /*#__PURE__*/React.createElement(RouteBadge, {
    abbreviation: toRouteAbbreviation(parseInt(routeShortName, 10) || routeShortName),
    color: routeColor,
    name: getLegRouteLongName(leg) || ""
  }), !interline && !isDestination && !transitLeg && /*#__PURE__*/React.createElement(S.AccessBadge, {
    "aria-label": travelByMessage,
    mode: mode,
    routeColor: routeColor
  }, /*#__PURE__*/React.createElement(LegIcon, {
    leg: leg,
    title: travelByMessage,
    width: "66%"
  })), isDestination && /*#__PURE__*/React.createElement(S.Destination, null, /*#__PURE__*/React.createElement(LocationIcon, {
    size: 25,
    type: "to"
  }))));
}
//# sourceMappingURL=line-column-content.js.map