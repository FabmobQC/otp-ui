"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _trimet = require("./trimet-2021");

/**
 * These icons are not an entire set and are only used in the 2021
 * custom TriMet mode selector component
 */
function TriMetModeIcon({
  mode,
  ...props
}) {
  if (!mode) return null;

  switch (mode.toLowerCase()) {
    case "bicycle":
    case "bicycle_rent":
      return /*#__PURE__*/_react.default.createElement(_trimet.Bicycle, props);

    case "car":
    case "car_park":
    case "car_hail":
      return /*#__PURE__*/_react.default.createElement(_trimet.Car, props);

    case "micromobility":
    case "micromobility_rent":
    case "scooter":
      return /*#__PURE__*/_react.default.createElement(_trimet.Micromobility, props);

    case "walk":
      return /*#__PURE__*/_react.default.createElement(_trimet.Walk, props);

    default:
      return null;
  }
}

var _default = TriMetModeIcon;
exports.default = _default;
//# sourceMappingURL=trimet-mode-icon-2021.js.map