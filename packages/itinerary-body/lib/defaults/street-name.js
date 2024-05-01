"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StreetName;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _util = require("../util");

/**
 * Returns the street name, or "Unnamed path/street" in the correct language if applicable.
 */
function StreetName({
  rawStreetName
}) {
  switch (rawStreetName) {
    case "road":
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.unnamedRoad"],
        description: "Text for an unnamed road",
        id: "otpUi.AccessLegBody.unnamedRoad"
      });

    case "path":
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.unnamedPath"],
        description: "Text for an unnamed path",
        id: "otpUi.AccessLegBody.unnamedPath"
      });

    default:
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, rawStreetName);
  }
}
//# sourceMappingURL=street-name.js.map