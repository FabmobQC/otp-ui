import React from "react";
import styled from "styled-components";
import { defaultCaretHalfWidth, defaultCaretHeight, InnerCaret, OuterCaret } from "./styled";

/**
 * Adds a caret to a component.
 */
export default function withCaret(Component, options) {
  var isInner = (options === null || options === void 0 ? void 0 : options.position) === "inner";
  var height = (options === null || options === void 0 ? void 0 : options.height) || defaultCaretHeight;
  var width = (options === null || options === void 0 ? void 0 : options.width) || defaultCaretHalfWidth * 2;
  var halfWidth = width / 2;
  var offset = (options === null || options === void 0 ? void 0 : options.offset) || 0;
  var RawCaret = isInner ? InnerCaret : OuterCaret;
  var SizedCaret = options !== null && options !== void 0 && options.height || offset ? styled(RawCaret).withConfig({
    displayName: "WithCaret__SizedCaret",
    componentId: "sc-1th2rf7-0"
  })(["&::before{border-bottom-width:", "px;border-left-width:", "px;border-right-width:", "px;margin-left:-", "px;top:-", "px;}"], Math.max(0, height), halfWidth, halfWidth, halfWidth, offset + (isInner ? 0 : height)) : RawCaret;
  /**
   * Displays a circle, content, and an arrow pointing in the direction
   * the specified transit vehicle is heading. If no heading is defined,
   * no arrow/caret is displayed
   */

  var WrappedComponent = function WrappedComponent(_ref) {
    var className = _ref.className,
        children = _ref.children,
        style = _ref.style,
        vehicle = _ref.vehicle;
    return /*#__PURE__*/React.createElement(Component, {
      className: className,
      style: style,
      vehicle: vehicle
    }, children, vehicle.heading !== null && vehicle.heading !== undefined && /*#__PURE__*/React.createElement(SizedCaret, {
      rotate: vehicle.heading
    }));
  };

  return WrappedComponent;
}
//# sourceMappingURL=WithCaret.js.map