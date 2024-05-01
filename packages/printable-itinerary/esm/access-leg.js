import React from "react";
import AccessibilityAnnotation from "./accessibility-annotation";
import * as S from "./styled";
export default function AccessLeg(_ref) {
  var accessibilityScoreGradationMap = _ref.accessibilityScoreGradationMap,
      config = _ref.config,
      leg = _ref.leg,
      LegIcon = _ref.LegIcon;
  return /*#__PURE__*/React.createElement(S.Leg, null, /*#__PURE__*/React.createElement(AccessibilityAnnotation, {
    accessibilityScoreGradationMap: accessibilityScoreGradationMap,
    grayscale: true,
    leg: leg,
    LegIcon: LegIcon
  }), /*#__PURE__*/React.createElement(S.LegBody, null, /*#__PURE__*/React.createElement(S.AccessLegDescription, {
    config: config,
    leg: leg
  }), !leg.rideHailingEstimate && /*#__PURE__*/React.createElement(S.LegDetails, null, leg.steps.map(function (step, k) {
    return /*#__PURE__*/React.createElement(S.LegDetail, {
      key: k
    }, /*#__PURE__*/React.createElement(S.AccessLegStep, {
      step: step
    }));
  }))));
}
//# sourceMappingURL=access-leg.js.map