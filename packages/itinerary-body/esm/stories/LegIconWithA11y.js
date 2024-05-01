import _extends from "@babel/runtime/helpers/extends";

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import coreUtils from "@opentripplanner/core-utils";
import { ClassicLegIcon } from "@opentripplanner/icons";
import React from "react";

/**
 * For illustration only. Component where the transit leg icons have an (untranslated) aria-label.
 */
var LegIconWithA11y = function LegIconWithA11y(props) {
  var leg = props.leg;
  var mode = leg.mode;
  var ariaLabel = coreUtils.itinerary.isTransit(mode) ? mode : undefined; // eslint-disable-next-line react/jsx-props-no-spreading

  return /*#__PURE__*/React.createElement(ClassicLegIcon, _extends({}, props, {
    "aria-label": ariaLabel
  }));
};

export default LegIconWithA11y;
//# sourceMappingURL=LegIconWithA11y.js.map