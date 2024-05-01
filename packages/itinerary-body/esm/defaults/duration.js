import coreUtils from "@opentripplanner/core-utils";
import React from "react";
import { FormattedMessage } from "react-intl";
import { defaultMessages } from "../util";

/**
 * This is a clickable component that summarizes the leg (travel time, stops
 * passed). On click it will expand and show the list of intermediate stops.
 */
export default function Duration(_ref) {
  var seconds = _ref.seconds;
  return /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.ItineraryBody.common.durationShort"],
    description: "Duration in abbreviated hours (if over one hour) and minutes",
    id: "otpUi.ItineraryBody.common.durationShort",
    values: coreUtils.time.toHoursMinutesSeconds(seconds)
  });
}
//# sourceMappingURL=duration.js.map