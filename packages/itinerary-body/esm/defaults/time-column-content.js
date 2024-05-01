import React from "react";
import { FormattedTime } from "react-intl";

/**
 * This is the default component for displaying the time with the specified format
 * of the given leg in the time column of the ItineraryBody -> PlaceRow component.
 */
export default function TimeColumnContent(_ref) {
  var isDestination = _ref.isDestination,
      leg = _ref.leg;
  var time = isDestination ? leg.endTime : leg.startTime;
  return time && /*#__PURE__*/React.createElement(FormattedTime, {
    value: time
  });
}
//# sourceMappingURL=time-column-content.js.map