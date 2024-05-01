"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _legIcon = _interopRequireDefault(require("./leg-icon"));

var _classicModeIcon = _interopRequireDefault(require("./classic-mode-icon"));

const ClassicLegIcon = props => /*#__PURE__*/_react.default.createElement(_legIcon.default, (0, _extends2.default)({
  ModeIcon: _classicModeIcon.default
}, props));

var _default = ClassicLegIcon;
exports.default = _default;
//# sourceMappingURL=classic-leg-icon.js.map