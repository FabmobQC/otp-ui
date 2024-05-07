"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

const SvgCircleClockwise = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
  viewBox: "0 0 261 261"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M30.5 120.5h60a40 40 0 0180 0c0 20.22-10.51 37.32-30 40 15 5 25 20 25 50 37.37-14.48 65-47.51 65-90a100 100 0 00-200 0z"
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M.5 140.5h32a100.12 100.12 0 0068 75.41v44.59h60v-60c0-20-15-40-40-40-10.05 0-20.09-8-25.62-20h25.62l-60-60z"
}));

var _default = SvgCircleClockwise;
exports.default = _default;
//# sourceMappingURL=CircleClockwise.js.map