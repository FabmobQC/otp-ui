"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToIcon = exports.PlaceIcon = exports.FromIcon = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Circle = require("@styled-icons/fa-regular/Circle");

var _DotCircle = require("@styled-icons/fa-regular/DotCircle");

var _MapMarkerAlt = require("@styled-icons/fa-solid/MapMarkerAlt");

const FromIcon = (0, _styledComponents.default)(_DotCircle.DotCircle).withConfig({
  displayName: "styled__FromIcon",
  componentId: "sc-n5xcvc-0"
})(["color:#333;"]);
exports.FromIcon = FromIcon;
const PlaceIcon = (0, _styledComponents.default)(_Circle.Circle).withConfig({
  displayName: "styled__PlaceIcon",
  componentId: "sc-n5xcvc-1"
})(["color:#333;"]);
exports.PlaceIcon = PlaceIcon;
const ToIcon = (0, _styledComponents.default)(_MapMarkerAlt.MapMarkerAlt).withConfig({
  displayName: "styled__ToIcon",
  componentId: "sc-n5xcvc-2"
})(["color:#f44256;"]);
exports.ToIcon = ToIcon;
//# sourceMappingURL=styled.js.map