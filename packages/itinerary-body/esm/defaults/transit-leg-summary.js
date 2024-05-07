import React from "react";
import { FormattedMessage } from "react-intl";
import * as S from "../styled";
import { defaultMessages } from "../util";
import Duration from "./duration";
/**
 * This is a clickable component that summarizes the leg (travel time, stops
 * passed). On click it will expand and show the list of intermediate stops.
 */

export default function TransitLegSummary(_ref) {
  var _leg$intermediateStop;

  var leg = _ref.leg,
      onClick = _ref.onClick,
      stopsExpanded = _ref.stopsExpanded;
  return /*#__PURE__*/React.createElement(S.TransitLegSummary, {
    onClick: onClick
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TransitLegBody.rideDurationAndStops"],
    description: "Describes ride duration and number of stops",
    id: "otpUi.TransitLegBody.rideDurationAndStops",
    values: {
      duration: /*#__PURE__*/React.createElement(Duration, {
        seconds: leg.duration
      }),
      numStops: (((_leg$intermediateStop = leg.intermediateStops) === null || _leg$intermediateStop === void 0 ? void 0 : _leg$intermediateStop.length) || 0) + 1
    }
  }), leg.intermediateStops && /*#__PURE__*/React.createElement(S.CaretToggle, {
    expanded: stopsExpanded
  }), /*#__PURE__*/React.createElement(S.InvisibleAdditionalDetails, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TransitLegBody.expandDetails"],
    description: "Screen reader text to expand stops",
    id: "otpUi.TransitLegBody.expandDetails"
  })));
}
//# sourceMappingURL=transit-leg-summary.js.map