import { getDisplayedStopId, getLegRouteShortName } from "@opentripplanner/core-utils/lib/itinerary";
import { Defaults } from "@opentripplanner/itinerary-body";
import React from "react";
import { FormattedMessage } from "react-intl";
import AccessibilityAnnotation from "./accessibility-annotation";
import * as S from "./styled";
import { defaultMessages, strongText } from "./util";
export default function TransitLeg(_ref) {
  var accessibilityScoreGradationMap = _ref.accessibilityScoreGradationMap,
      leg = _ref.leg,
      LegIcon = _ref.LegIcon,
      interlineFollows = _ref.interlineFollows;
  var stopIdFrom = getDisplayedStopId(leg.from);
  var stopIdTo = getDisplayedStopId(leg.to); // TODO: core-utils needs some larger-scale type fixes
  // null is an object, so we need to redefine it as undefined to prevent
  // it from being read as an object. The long term solution is to avoid
  // using type checks for this purpose

  if (leg.route === null) leg.route = undefined;
  var routeDescription = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("strong", null, getLegRouteShortName(leg)), " ", /*#__PURE__*/React.createElement(S.RouteLongName, {
    leg: leg
  }));
  var alightMessage = /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.PrintableItinerary.TransitLeg.alight"],
    description: "Instructs to alight/exit a transit vehicle",
    id: "otpUi.PrintableItinerary.TransitLeg.alight",
    values: {
      place: leg.to.name,
      stopId: stopIdTo,
      strong: strongText,
      time: leg.endTime
    }
  }); // Handle case of transit leg interlined w/ previous

  if (leg.interlineWithPreviousLeg) {
    return /*#__PURE__*/React.createElement(S.CollapsedTop, null, /*#__PURE__*/React.createElement(S.LegBody, null, /*#__PURE__*/React.createElement(S.LegHeader, null, /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.PrintableItinerary.TransitLeg.continuesAs"],
      description: "Informs of an interlined transit route",
      id: "otpUi.PrintableItinerary.TransitLeg.continuesAs",
      values: {
        routeDescription: routeDescription
      }
    })), /*#__PURE__*/React.createElement(S.LegDetails, null, /*#__PURE__*/React.createElement(S.LegDetail, null, alightMessage))));
  }

  return /*#__PURE__*/React.createElement(S.Leg, null, /*#__PURE__*/React.createElement(AccessibilityAnnotation, {
    accessibilityScoreGradationMap: accessibilityScoreGradationMap,
    grayscale: true,
    leg: leg,
    LegIcon: LegIcon
  }), /*#__PURE__*/React.createElement(S.LegBody, null, /*#__PURE__*/React.createElement(S.LegHeader, null, routeDescription), /*#__PURE__*/React.createElement(S.LegDetails, null, /*#__PURE__*/React.createElement(S.LegDetail, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.PrintableItinerary.TransitLeg.board"],
    description: "Instructs to board a transit vehicle",
    id: "otpUi.PrintableItinerary.TransitLeg.board",
    values: {
      place: leg.from.name,
      stopId: stopIdFrom,
      strong: strongText,
      time: leg.startTime
    }
  })), /*#__PURE__*/React.createElement(S.LegDetail, null, interlineFollows ? /*#__PURE__*/React.createElement(Defaults.StayOnBoard, {
    place: leg.to
  }) : alightMessage))));
}
//# sourceMappingURL=transit-leg.js.map