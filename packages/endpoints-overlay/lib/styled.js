"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconWrapper = exports.ToIcon = exports.StackedIconContainer = exports.StackedToIcon = exports.StackedLocationIcon = exports.StackedCircle = exports.Button = void 0;

var _locationIcon = _interopRequireDefault(require("@opentripplanner/location-icon"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Circle = require("@styled-icons/fa-solid/Circle");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Button = _styledComponents.default.button.withConfig({
  displayName: "styled__Button",
  componentId: "sc-50mmra-0"
})(["background:none;border:none;color:navy;font-family:inherit;font-size:inherit;line-height:inherit;padding-left:0.2em;:hover{text-decoration:underline;cursor:pointer;}"]);

exports.Button = Button;
const stacked = (0, _styledComponents.css)(["cursor:pointer;left:0;position:absolute;"]);
const StackedCircle = (0, _styledComponents.default)(_Circle.Circle).withConfig({
  displayName: "styled__StackedCircle",
  componentId: "sc-50mmra-1"
})(["color:#fff;", ""], stacked);
exports.StackedCircle = StackedCircle;
const StackedLocationIcon = (0, _styledComponents.default)(_locationIcon.default).withConfig({
  displayName: "styled__StackedLocationIcon",
  componentId: "sc-50mmra-2"
})(["", ""], stacked);
exports.StackedLocationIcon = StackedLocationIcon;
const StackedToIcon = (0, _styledComponents.default)(StackedLocationIcon).withConfig({
  displayName: "styled__StackedToIcon",
  componentId: "sc-50mmra-3"
})(["color:#333;margin-left:-3px;margin-top:-2px;"]);
exports.StackedToIcon = StackedToIcon;

const StackedIconContainer = _styledComponents.default.span.withConfig({
  displayName: "styled__StackedIconContainer",
  componentId: "sc-50mmra-4"
})(["display:inline-block;height:20px;margin-top:2px;width:20px;"]);

exports.StackedIconContainer = StackedIconContainer;
const ToIcon = (0, _styledComponents.default)(_locationIcon.default).withConfig({
  displayName: "styled__ToIcon",
  componentId: "sc-50mmra-5"
})(["", ""], stacked);
exports.ToIcon = ToIcon;

const IconWrapper = _styledComponents.default.span.withConfig({
  displayName: "styled__IconWrapper",
  componentId: "sc-50mmra-6"
})(["&::after{content:\"\";margin:0 0.125em;}"]);

exports.IconWrapper = IconWrapper;
//# sourceMappingURL=styled.js.map