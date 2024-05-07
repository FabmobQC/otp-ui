"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouteNumberIcon = RouteNumberIcon;
exports.default = VehicleIcon;

var _react = _interopRequireDefault(require("react"));

/**
 * Renders the route number so it gets fitted into the icon shape.
 */
function RouteNumberIcon({
  vehicle
}) {
  const {
    routeShortName
  } = vehicle;
  const length = (routeShortName === null || routeShortName === void 0 ? void 0 : routeShortName.length) || 0;
  const size = Math.max(length * 8, 20);
  return routeShortName ?
  /*#__PURE__*/
  // Render as SVG to autofit the icon regardless of the ambient font size,
  // while centering horizontally and vertically and reducing size for larger route short names
  // (see for instance https://css-tricks.com/fitting-text-to-a-container/#aa-just-use-svg).
  _react.default.createElement("svg", {
    viewBox: `0 0 ${size} ${size}`
  }, /*#__PURE__*/_react.default.createElement("text", {
    textAnchor: "middle",
    x: "50%",
    y: size / 2 + 4.5
  }, routeShortName)) :
  /*#__PURE__*/
  // Default content is an emoji, but emojis don't work in SVG mode.
  _react.default.createElement(_react.default.Fragment, null, "\uD83D\uDE8C");
}
/**
 * Renders the associated mode icon for the given transit vehicle and ModeIcon component.
 * Falls back to the route short name if no icon is found for the desired mode.
 */


function VehicleIcon({
  defaultMode,
  ModeIcon,
  vehicle
}) {
  // Try to see if content is returned by the ModeIcon function component,
  // if null, fall back to route number.
  return ModeIcon({
    mode: vehicle.routeType || defaultMode
  }) || /*#__PURE__*/_react.default.createElement(RouteNumberIcon, {
    vehicle: vehicle
  });
}
//# sourceMappingURL=VehicleIcon.js.map