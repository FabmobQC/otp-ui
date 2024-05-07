"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

const SvgSnow = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M364.1 204.2l-66.6 38.5L215 195l82.5-47.7 66.6 38.5 10-17.3-56.6-32.7 51.4-29.6-10-17.4-51.4 29.7V53.2h-20V130L205 177.7V82.4l66.6-38.5-10-17.3L205 59.3V0h-20v59.3l-56.6-32.7-10 17.3L185 82.4v95.3L102.5 130V53.2h-20v65.3L31.1 88.8l-10 17.4 51.4 29.6-56.6 32.7 10 17.3 66.6-38.5L175 195l-82.5 47.7-66.6-38.5-10 17.3 56.6 32.7-51.4 29.6 10 17.4 51.4-29.7v65.3h20V260l82.5-47.7v95.3l-66.6 38.5 10 17.3 56.6-32.7V390h20v-59.3l56.6 32.7 10-17.3-66.6-38.5v-95.3l82.5 47.7v76.8h20v-65.3l51.4 29.7 10-17.4-51.4-29.6 56.6-32.7z"
}));

var _default = SvgSnow;
exports.default = _default;
//# sourceMappingURL=Snow.js.map