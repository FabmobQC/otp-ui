"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

const SvgPlane = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M355.3 366.5L232.8 228.4l-47.5 82.3 18.3 47.1L185 390l-44.8-48.2-63.7-14.5L95 295.2l49.9-7.8 47.4-82.2L11.5 168l23.4-40.6 204.1-5 64.1-110.8c15.2-26.6 55.9-2.8 40.4 24L279.7 146l98.8 179.8-23.2 40.7z"
}));

var _default = SvgPlane;
exports.default = _default;
//# sourceMappingURL=Plane.js.map