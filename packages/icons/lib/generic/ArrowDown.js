"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

const SvgArrowDown = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
  viewBox: "0 0 24 24"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M0 7.33L2.829 4.5l9.175 9.339L21.171 4.5 24 7.33 12.004 19.5z"
}));

var _default = SvgArrowDown;
exports.default = _default;
//# sourceMappingURL=ArrowDown.js.map