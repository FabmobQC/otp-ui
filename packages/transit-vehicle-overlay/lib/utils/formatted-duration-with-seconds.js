"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormattedDurationWithSeconds;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _defaultMessages = _interopRequireDefault(require("./default-messages"));

/**
 * Formats hours/minutes/seconds.
 */
function FormattedDurationWithSeconds({
  seconds
}) {
  return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _defaultMessages.default["otpUi.TransitVehicleOverlay.durationWithSeconds"],
    description: "Formats a duration in hours, minutes, and seconds",
    id: "otpUi.TransitVehicleOverlay.durationWithSeconds",
    values: _coreUtils.default.time.toHoursMinutesSeconds(seconds)
  });
}
//# sourceMappingURL=formatted-duration-with-seconds.js.map