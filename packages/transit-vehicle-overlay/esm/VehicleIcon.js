import React from "react";

/**
 * Renders the route number so it gets fitted into the icon shape.
 */
export function RouteNumberIcon(_ref) {
  var vehicle = _ref.vehicle;
  var routeShortName = vehicle.routeShortName;
  var length = (routeShortName === null || routeShortName === void 0 ? void 0 : routeShortName.length) || 0;
  var size = Math.max(length * 8, 20);
  return routeShortName ?
  /*#__PURE__*/
  // Render as SVG to autofit the icon regardless of the ambient font size,
  // while centering horizontally and vertically and reducing size for larger route short names
  // (see for instance https://css-tricks.com/fitting-text-to-a-container/#aa-just-use-svg).
  React.createElement("svg", {
    viewBox: "0 0 ".concat(size, " ").concat(size)
  }, /*#__PURE__*/React.createElement("text", {
    textAnchor: "middle",
    x: "50%",
    y: size / 2 + 4.5
  }, routeShortName)) :
  /*#__PURE__*/
  // Default content is an emoji, but emojis don't work in SVG mode.
  React.createElement(React.Fragment, null, "\uD83D\uDE8C");
}
/**
 * Renders the associated mode icon for the given transit vehicle and ModeIcon component.
 * Falls back to the route short name if no icon is found for the desired mode.
 */

export default function VehicleIcon(_ref2) {
  var defaultMode = _ref2.defaultMode,
      ModeIcon = _ref2.ModeIcon,
      vehicle = _ref2.vehicle;
  // Try to see if content is returned by the ModeIcon function component,
  // if null, fall back to route number.
  return ModeIcon({
    mode: vehicle.routeType || defaultMode
  }) || /*#__PURE__*/React.createElement(RouteNumberIcon, {
    vehicle: vehicle
  });
}
//# sourceMappingURL=VehicleIcon.js.map