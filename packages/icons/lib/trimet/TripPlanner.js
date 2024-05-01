"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

const SvgTripplanner = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M343.2 255.9l-9.8-16.9c-10.9 6.3-22.3 11.6-33.9 15.5l6.4 18.5c12.8-4.4 25.3-10.2 37.3-17.1zM40.7 144.2l11.3 16c12.7-9 26-16.5 39.3-22.4l-7.9-17.9c-14.6 6.4-28.9 14.5-42.7 24.3zM179.5 125l-11.1 16.1c12.9 8.9 21.8 20.8 28.2 37.7l18.3-6.9c-7.8-20.7-19-35.7-35.4-46.9zM224.2 205.5c-1.2-5-2.4-10.2-3.8-15.5l-18.9 5c1.4 4.9 2.5 10 3.7 15 3.2 13.8 6.2 26.7 12 38.5l17.6-8.6c-4.9-9.8-7.7-21.7-10.6-34.4z"
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M260.4 54.2L129.6 0 6.6 50.9v335.8l123-50.9L260.4 390l123-50.9V3.3l-123 50.9zM25.9 357.9v-294l94.1-39v82.7c-7 1.6-14.2 3.7-21.2 6.2l6.5 18.5c4.9-1.7 9.8-3.2 14.8-4.4v191l-94.2 39zm113.3-39v-191c5.4 1.5 10.4 3.4 15.1 5.4l7.9-17.9c-6.9-3.1-14.7-5.7-23.1-7.8V25l111.5 46.2v187.1c-2.9-1.7-5.4-3.8-7.7-6.1l-14.1 13.6c6 6.2 13.2 10.9 21.8 14.2v85.1l-111.4-46.2zm224.9 7.2l-94.1 39v-83.2c7.6-1.2 15.2-2.8 22.7-4.8l-5.1-18.9c-5.8 1.5-11.7 2.9-17.6 3.9V71.2l94.1-39v293.9z"
}));

var _default = SvgTripplanner;
exports.default = _default;
//# sourceMappingURL=TripPlanner.js.map