import memoize from "lodash.memoize";
import coreUtils from "@opentripplanner/core-utils";
import styled, { css } from "styled-components";

// CSS helper functions.
var getForegroundColor = function getForegroundColor(props) {
  return props.foregroundColor;
};
/**
 * Computes color props to simplify the CSS filler code.
 */


function getColorProps(options) {
  var defaultColor = (options === null || options === void 0 ? void 0 : options.defaultColor) || "#9999ee";
  return function (props) {
    var routeColor = props.vehicle.routeColor || defaultColor;
    return {
      backgroundColor: "".concat(routeColor).concat((options === null || options === void 0 ? void 0 : options.alphaHex) || ""),
      foregroundColor: coreUtils.route.getMostReadableTextColor(routeColor)
    };
  };
}
/**
 * Displays a circle with basic settings.
 */


export var Circle = styled.div.withConfig({
  displayName: "styled__Circle",
  componentId: "sc-wxby8t-0"
})(["background:#eee;border:2px solid #333;border-radius:10000px;cursor:default;height:15px;line-height:15px;padding:15px;position:relative;text-align:center;transition:all 0.2s ease-in-out;width:15px;"]);
/**
 * Displays a circle with contents that is rotated according to vehicle heading.
 */

export var RotatingCircle = styled(Circle).withConfig({
  displayName: "styled__RotatingCircle",
  componentId: "sc-wxby8t-1"
})(["transform:rotate(", "deg);"], function (props) {
  return props.vehicle.heading || 0;
});
export var defaultCaretHeight = 5;
export var defaultCaretHalfWidth = 6;
/**
 * Renders a caret that fits within another component and indicates the heading.
 */

export var Caret = styled.div.withConfig({
  displayName: "styled__Caret",
  componentId: "sc-wxby8t-2"
})(["height:100%;left:0;position:absolute;top:0;transform:rotate(", "deg);width:100%;&::before{border-bottom:", "px solid #333;border-left:", "px solid transparent;border-right:", "px solid transparent;content:\"\";height:0;left:50%;margin-left:", "px;position:absolute;top:0px;width:0;}"], function (props) {
  return props.rotate || 0;
}, defaultCaretHeight, defaultCaretHalfWidth, defaultCaretHalfWidth, -defaultCaretHalfWidth); // Inner/OuterCaret are used for determining whether to apply foreground color with route colors.

export var InnerCaret = styled(Caret).withConfig({
  displayName: "styled__InnerCaret",
  componentId: "sc-wxby8t-3"
})([""]);
export var OuterCaret = styled(Caret).withConfig({
  displayName: "styled__OuterCaret",
  componentId: "sc-wxby8t-4"
})(["&::before{top:", "px;}"], -defaultCaretHeight);
var routeColorBackgroundCss = css(["background:", ";color:", ";& svg path,& svg text{fill:", ";}", "{&::before{border-bottom-color:", ";}}"], function (props) {
  return props.backgroundColor;
}, getForegroundColor, getForegroundColor, InnerCaret, getForegroundColor);
/**
 * Applies the vehicle's route color to a component
 * and a foreground color that is contrast-compatible with that color.
 */

export function withRouteColorBackground(Container, options) {
  var innerCss = (options === null || options === void 0 ? void 0 : options.display) === "onhover" ? css(["&:hover{", "}"], routeColorBackgroundCss) : routeColorBackgroundCss;
  return styled(Container).attrs(getColorProps(options)).withConfig({
    displayName: "styled",
    componentId: "sc-wxby8t-5"
  })(["", ""], innerCss);
}
/**
 * Generate and memoize a container component once per set of container/pixels/padding parameters.
 */

export var getStyledContainer = memoize(function (IconContainer, padding, pixels) {
  return styled(IconContainer).withConfig({
    displayName: "styled",
    componentId: "sc-wxby8t-6"
  })(["height:", "px;line-height:", "px;padding:", "px;width:", "px;"], pixels, pixels, padding, pixels);
});
//# sourceMappingURL=styled.js.map