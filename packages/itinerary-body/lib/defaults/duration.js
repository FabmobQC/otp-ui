"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Duration;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _util = require("../util");

/**
 * This is a clickable component that summarizes the leg (travel time, stops
 * passed). On click it will expand and show the list of intermediate stops.
 */
function Duration({
  seconds
}) {
  return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.ItineraryBody.common.durationShort"],
    description: "Duration in abbreviated hours (if over one hour) and minutes",
    id: "otpUi.ItineraryBody.common.durationShort",
    values: _coreUtils.default.time.toHoursMinutesSeconds(seconds)
  });
}
//# sourceMappingURL=duration.js.map