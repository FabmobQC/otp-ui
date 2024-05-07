"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

const SvgAlert = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M195.1 44.9L357.6 370H32.5L195.1 44.9m0-44.9L0 390h390L195.1 0z"
}), /*#__PURE__*/_react.default.createElement("circle", {
  cx: 195.1,
  cy: 317.4,
  r: 18.4
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M179.7 143.8h30.6v133.7h-30.6z"
}));

var _default = SvgAlert;
exports.default = _default;
//# sourceMappingURL=Alert.js.map