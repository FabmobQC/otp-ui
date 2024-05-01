"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StayOnBoard;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _util = require("../util");

/**
 * Renders a "Stay on board at <station>" step in an interlined itinerary.
 */
function StayOnBoard({
  place
}) {
  return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.ItineraryBody.stayOnBoard"],
    description: "Instructs riders to stay on board",
    id: "otpUi.ItineraryBody.stayOnBoard",
    values: {
      place: /*#__PURE__*/_react.default.createElement("strong", null, place.name)
    }
  });
}
//# sourceMappingURL=stay-on-board.js.map