"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

const SvgParking = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M195 0C87.3 0 0 87.3 0 195s87.3 195 195 195 195-87.3 195-195S302.7 0 195 0zm97.6 182.4c-4.7 11.8-11.4 20-20.2 26.5-8.8 6.6-17.4 11-25 13.1-8.3 2.2-20.6 3.6-38.1 3.6h-40.1v90.6h-57.8V73.6h95.9c20.9 0 37.8 2.3 49.1 6.8 11.2 4.6 20.9 12.1 29.9 24.4 8.9 11.6 13.3 25.6 13.3 42.9-.1 11.7-2.4 23.1-7 34.7z"
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M232.4 125.6c-6.5-5.9-15.9-8.9-29-8.9h-36.5v64.9h36.6c14.7 0 24.3-2.9 30.3-9.6 5.2-6.6 8.7-14.6 8.7-22.4.1-10.4-3.6-17.8-10.1-24z"
}));

var _default = SvgParking;
exports.default = _default;
//# sourceMappingURL=Parking.js.map