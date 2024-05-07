"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

const SvgUTurnLeft = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
  viewBox: "0 0 261 261"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M108.5 120.5v-20c0-34.81 3.93-40.31 35.36-40s34.64 4.46 34.64 40v160h60v-160c0-74.12-22.85-97.25-94.64-97.5S48.5 25 48.5 100.5v20h-40l70 100 70-100h-40z"
}));

var _default = SvgUTurnLeft;
exports.default = _default;
//# sourceMappingURL=UTurnLeft.js.map