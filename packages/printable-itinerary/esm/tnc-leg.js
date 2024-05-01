import { getCompanyForNetwork } from "@opentripplanner/core-utils/lib/itinerary";
import { Defaults } from "@opentripplanner/itinerary-body";
import { parseOTP2Minute } from "@opentripplanner/itinerary-body/lib/util";
import React from "react";
import { FormattedMessage } from "react-intl";
import AccessibilityAnnotation from "./accessibility-annotation";
import * as S from "./styled";
import { defaultMessages, strongText } from "./util";
export default function TNCLeg(_ref) {
  var _getCompanyForNetwork, _leg$rideHailingEstim;

  var accessibilityScoreGradationMap = _ref.accessibilityScoreGradationMap,
      leg = _ref.leg,
      LegIcon = _ref.LegIcon;
  var rideHailingEstimate = leg.rideHailingEstimate;
  if (!rideHailingEstimate) return null;
  return /*#__PURE__*/React.createElement(S.Leg, null, /*#__PURE__*/React.createElement(AccessibilityAnnotation, {
    accessibilityScoreGradationMap: accessibilityScoreGradationMap,
    grayscale: true,
    leg: leg,
    LegIcon: LegIcon
  }), /*#__PURE__*/React.createElement(S.LegBody, null, /*#__PURE__*/React.createElement(S.LegHeader, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.PrintableItinerary.TncLeg.header"],
    description: "Summary text for TNC leg",
    id: "otpUi.PrintableItinerary.TncLeg.header",
    values: {
      company: (_getCompanyForNetwork = getCompanyForNetwork(rideHailingEstimate.provider.id)) === null || _getCompanyForNetwork === void 0 ? void 0 : _getCompanyForNetwork.label,
      place: leg.to.name,
      strong: strongText
    }
  })), /*#__PURE__*/React.createElement(S.LegDetails, null, typeof (leg === null || leg === void 0 ? void 0 : (_leg$rideHailingEstim = leg.rideHailingEstimate) === null || _leg$rideHailingEstim === void 0 ? void 0 : _leg$rideHailingEstim.arrival) === "string" && /*#__PURE__*/React.createElement(S.LegDetail, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.PrintableItinerary.TncLeg.estimatedWaitTime"],
    description: "Describes the estimated TNC wait time.",
    id: "otpUi.PrintableItinerary.TncLeg.estimatedWaitTime",
    values: {
      duration: /*#__PURE__*/React.createElement(Defaults.Duration, {
        seconds: parseInt(parseOTP2Minute(leg.rideHailingEstimate.arrival), 10) * 60
      }),
      strong: strongText
    }
  })), /*#__PURE__*/React.createElement(S.LegDetail, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.PrintableItinerary.TncLeg.estimatedTravelTime"],
    description: "Describes the estimated TNC travel time.",
    id: "otpUi.PrintableItinerary.TncLeg.estimatedTravelTime",
    values: {
      duration: /*#__PURE__*/React.createElement(Defaults.Duration, {
        seconds: leg.duration
      }),
      strong: strongText
    }
  })))));
}
//# sourceMappingURL=tnc-leg.js.map