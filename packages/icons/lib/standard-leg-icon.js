"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _legIcon = _interopRequireDefault(require("./leg-icon"));

var _standardModeIcon = _interopRequireDefault(require("./standard-mode-icon"));

const StandardLegIcon = props => /*#__PURE__*/_react.default.createElement(_legIcon.default, (0, _extends2.default)({
  ModeIcon: _standardModeIcon.default
}, props));

var _default = StandardLegIcon;
exports.default = _default;
//# sourceMappingURL=standard-leg-icon.js.map