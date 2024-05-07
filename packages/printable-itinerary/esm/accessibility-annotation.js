import { AccessibilityRating } from "@opentripplanner/itinerary-body";
import React from "react";
import * as S from "./styled";
export default function AccessibilityAnnotation(_ref) {
  var accessibilityScoreGradationMap = _ref.accessibilityScoreGradationMap,
      grayscale = _ref.grayscale,
      leg = _ref.leg,
      LegIcon = _ref.LegIcon;
  return /*#__PURE__*/React.createElement(S.LegAnnotation, null, /*#__PURE__*/React.createElement(S.ModeIcon, null, /*#__PURE__*/React.createElement(LegIcon, {
    leg: leg
  })), leg.accessibilityScore && /*#__PURE__*/React.createElement(AccessibilityRating, {
    gradationMap: accessibilityScoreGradationMap,
    grayscale: grayscale,
    score: leg.accessibilityScore
  }));
}
//# sourceMappingURL=accessibility-annotation.js.map