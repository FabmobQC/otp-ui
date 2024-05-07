"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BasicPlaceName;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _util = require("../util");

var _stayOnBoard = _interopRequireDefault(require("./stay-on-board"));

function BasicPlaceName({
  config,
  interline,
  place
}) {
  const intl = (0, _reactIntl.useIntl)();
  return interline ? /*#__PURE__*/_react.default.createElement(_stayOnBoard.default, {
    place: place
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (0, _util.getPlaceName)(place, config.companies, intl));
}
//# sourceMappingURL=basic-place-name.js.map