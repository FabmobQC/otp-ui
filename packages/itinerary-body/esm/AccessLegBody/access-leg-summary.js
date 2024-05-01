import React from "react";
import { FormattedMessage } from "react-intl";
import { AccessLegDescription } from "../defaults";
import { defaultMessages } from "../util";
import * as S from "../styled";
export default function AccessLegSummary(_ref) {
  var config = _ref.config,
      leg = _ref.leg,
      LegIcon = _ref.LegIcon,
      onSummaryClick = _ref.onSummaryClick,
      showLegIcon = _ref.showLegIcon;
  return /*#__PURE__*/React.createElement(S.LegClickable, null, /*#__PURE__*/React.createElement(S.LegDescription, null, /*#__PURE__*/React.createElement(S.LegIconAndRouteShortName, null, showLegIcon && /*#__PURE__*/React.createElement(S.LegIconContainer, null, /*#__PURE__*/React.createElement(LegIcon, {
    leg: leg
  }))), /*#__PURE__*/React.createElement(S.InvisibleAdditionalDetails, null, " - "), /*#__PURE__*/React.createElement(AccessLegDescription, {
    config: config,
    leg: leg
  }), /*#__PURE__*/React.createElement(S.LegClickableButton, {
    onClick: onSummaryClick
  }, /*#__PURE__*/React.createElement(S.InvisibleAdditionalDetails, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TransitLegBody.zoomToLeg"],
    description: "Identifies behavior of button",
    id: "otpUi.TransitLegBody.zoomToLeg"
  })))));
}
//# sourceMappingURL=access-leg-summary.js.map