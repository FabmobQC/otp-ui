"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withRouteColorBackground = withRouteColorBackground;
exports.getStyledContainer = exports.OuterCaret = exports.InnerCaret = exports.Caret = exports.defaultCaretHalfWidth = exports.defaultCaretHeight = exports.RotatingCircle = exports.Circle = void 0;

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// CSS helper functions.
const getForegroundColor = props => props.foregroundColor;
/**
 * Computes color props to simplify the CSS filler code.
 */


function getColorProps(options) {
  const defaultColor = (options === null || options === void 0 ? void 0 : options.defaultColor) || "#9999ee";
  return props => {
    const routeColor = props.vehicle.routeColor || defaultColor;
    return {
      backgroundColor: `${routeColor}${(options === null || options === void 0 ? void 0 : options.alphaHex) || ""}`,
      foregroundColor: _coreUtils.default.route.getMostReadableTextColor(routeColor)
    };
  };
}
/**
 * Displays a circle with basic settings.
 */


const Circle = _styledComponents.default.div.withConfig({
  displayName: "styled__Circle",
  componentId: "sc-wxby8t-0"
})(["background:#eee;border:2px solid #333;border-radius:10000px;cursor:default;height:15px;line-height:15px;padding:15px;position:relative;text-align:center;transition:all 0.2s ease-in-out;width:15px;"]);
/**
 * Displays a circle with contents that is rotated according to vehicle heading.
 */


exports.Circle = Circle;
const RotatingCircle = (0, _styledComponents.default)(Circle).withConfig({
  displayName: "styled__RotatingCircle",
  componentId: "sc-wxby8t-1"
})(["transform:rotate(", "deg);"], props => props.vehicle.heading || 0);
exports.RotatingCircle = RotatingCircle;
const defaultCaretHeight = 5;
exports.defaultCaretHeight = defaultCaretHeight;
const defaultCaretHalfWidth = 6;
/**
 * Renders a caret that fits within another component and indicates the heading.
 */

exports.defaultCaretHalfWidth = defaultCaretHalfWidth;

const Caret = _styledComponents.default.div.withConfig({
  displayName: "styled__Caret",
  componentId: "sc-wxby8t-2"
})(["height:100%;left:0;position:absolute;top:0;transform:rotate(", "deg);width:100%;&::before{border-bottom:", "px solid #333;border-left:", "px solid transparent;border-right:", "px solid transparent;content:\"\";height:0;left:50%;margin-left:", "px;position:absolute;top:0px;width:0;}"], props => props.rotate || 0, defaultCaretHeight, defaultCaretHalfWidth, defaultCaretHalfWidth, -defaultCaretHalfWidth); // Inner/OuterCaret are used for determining whether to apply foreground color with route colors.


exports.Caret = Caret;
const InnerCaret = (0, _styledComponents.default)(Caret).withConfig({
  displayName: "styled__InnerCaret",
  componentId: "sc-wxby8t-3"
})([""]);
exports.InnerCaret = InnerCaret;
const OuterCaret = (0, _styledComponents.default)(Caret).withConfig({
  displayName: "styled__OuterCaret",
  componentId: "sc-wxby8t-4"
})(["&::before{top:", "px;}"], -defaultCaretHeight);
exports.OuterCaret = OuterCaret;
const routeColorBackgroundCss = (0, _styledComponents.css)(["background:", ";color:", ";& svg path,& svg text{fill:", ";}", "{&::before{border-bottom-color:", ";}}"], props => props.backgroundColor, getForegroundColor, getForegroundColor, InnerCaret, getForegroundColor);
/**
 * Applies the vehicle's route color to a component
 * and a foreground color that is contrast-compatible with that color.
 */

function withRouteColorBackground(Container, options) {
  const innerCss = (options === null || options === void 0 ? void 0 : options.display) === "onhover" ? (0, _styledComponents.css)(["&:hover{", "}"], routeColorBackgroundCss) : routeColorBackgroundCss;
  return (0, _styledComponents.default)(Container).attrs(getColorProps(options)).withConfig({
    displayName: "styled",
    componentId: "sc-wxby8t-5"
  })(["", ""], innerCss);
}
/**
 * Generate and memoize a container component once per set of container/pixels/padding parameters.
 */


const getStyledContainer = (0, _lodash.default)((IconContainer, padding, pixels) => {
  return (0, _styledComponents.default)(IconContainer).withConfig({
    displayName: "styled",
    componentId: "sc-wxby8t-6"
  })(["height:", "px;line-height:", "px;padding:", "px;width:", "px;"], pixels, pixels, padding, pixels);
});
exports.getStyledContainer = getStyledContainer;
//# sourceMappingURL=styled.js.map