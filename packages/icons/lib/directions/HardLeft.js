"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

const SvgHardLeft = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
  viewBox: "0 0 261 261"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M72.5 100.5l50-50c40-40 110-20 110 50v160h-60v-160c0-10 0-20-10-10l-50 50 30 30-120 20 20-120z"
}));

var _default = SvgHardLeft;
exports.default = _default;
//# sourceMappingURL=HardLeft.js.map