"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TimeColumnContent;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

/**
 * This is the default component for displaying the time with the specified format
 * of the given leg in the time column of the ItineraryBody -> PlaceRow component.
 */
function TimeColumnContent({
  isDestination,
  leg
}) {
  const time = isDestination ? leg.endTime : leg.startTime;
  return time && /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedTime, {
    value: time
  });
}
//# sourceMappingURL=time-column-content.js.map