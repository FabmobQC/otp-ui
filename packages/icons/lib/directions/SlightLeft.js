"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

const SvgSlightLeft = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
  viewBox: "0 0 261 261"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M86.5 90.5l40 40c10 10 20 20 20 40v90h60v-90c0-40-20-60-40-80l-40-40 30-30-120-20 20 120z"
}));

var _default = SvgSlightLeft;
exports.default = _default;
//# sourceMappingURL=SlightLeft.js.map