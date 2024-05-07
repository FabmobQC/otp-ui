"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withCaret;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styled = require("./styled");

/**
 * Adds a caret to a component.
 */
function withCaret(Component, options) {
  const isInner = (options === null || options === void 0 ? void 0 : options.position) === "inner";
  const height = (options === null || options === void 0 ? void 0 : options.height) || _styled.defaultCaretHeight;
  const width = (options === null || options === void 0 ? void 0 : options.width) || _styled.defaultCaretHalfWidth * 2;
  const halfWidth = width / 2;
  const offset = (options === null || options === void 0 ? void 0 : options.offset) || 0;
  const RawCaret = isInner ? _styled.InnerCaret : _styled.OuterCaret;
  const SizedCaret = options !== null && options !== void 0 && options.height || offset ? (0, _styledComponents.default)(RawCaret).withConfig({
    displayName: "WithCaret__SizedCaret",
    componentId: "sc-1th2rf7-0"
  })(["&::before{border-bottom-width:", "px;border-left-width:", "px;border-right-width:", "px;margin-left:-", "px;top:-", "px;}"], Math.max(0, height), halfWidth, halfWidth, halfWidth, offset + (isInner ? 0 : height)) : RawCaret;
  /**
   * Displays a circle, content, and an arrow pointing in the direction
   * the specified transit vehicle is heading. If no heading is defined,
   * no arrow/caret is displayed
   */

  const WrappedComponent = ({
    className,
    children,
    style,
    vehicle
  }) => /*#__PURE__*/_react.default.createElement(Component, {
    className: className,
    style: style,
    vehicle: vehicle
  }, children, vehicle.heading !== null && vehicle.heading !== undefined && /*#__PURE__*/_react.default.createElement(SizedCaret, {
    rotate: vehicle.heading
  }));

  return WrappedComponent;
}
//# sourceMappingURL=WithCaret.js.map