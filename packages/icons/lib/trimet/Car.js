"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

const SvgCar = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M371.2 175.3l-3.7-12.1-29.8-95.7c-5.8-18.6-22.9-31.2-42.4-31.2H94.7c-19.5 0-36.5 12.6-42.4 31.2l-29.8 95.7-3.7 12.1C7.6 181.4 0 193.1 0 206.5v76.2c0 7.8 6.4 14.2 14.2 14.2h12.4v35.5c0 11.7 9.6 21.3 21.3 21.3H62c11.7 0 21.3-9.6 21.3-21.3v-35.5h223.4v35.5c0 11.7 9.6 21.3 21.3 21.3h14.2c11.7 0 21.3-9.6 21.3-21.3v-35.5h12.4c7.8 0 14.2-6.4 14.2-14.2v-76.2c-.1-13.3-7.7-25.1-18.9-31.2zM55 252.8c-14.7 0-26.6-11.9-26.6-26.6s11.9-26.6 26.6-26.6 26.6 11.9 26.6 26.6-11.9 26.6-26.6 26.6zm240.7-81.6c-9-14.9-25.4-24.8-44-24.8s-34.9 9.9-44 24.8H47.9l29.8-95.6c2.3-7.4 9.2-12.4 16.8-12.4h200.9c7.8 0 14.5 5 16.8 12.4l29.8 95.7-46.3-.1zm39.3 81.6c-14.7 0-26.6-11.9-26.6-26.6s11.9-26.6 26.6-26.6c14.7 0 26.6 11.9 26.6 26.6s-11.8 26.6-26.6 26.6z"
}), /*#__PURE__*/_react.default.createElement("circle", {
  cx: 251.7,
  cy: 107.4,
  r: 33.7
}));

var _default = SvgCar;
exports.default = _default;
//# sourceMappingURL=Car.js.map