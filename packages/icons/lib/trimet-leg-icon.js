"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _legIcon = _interopRequireDefault(require("./leg-icon"));

var _trimetModeIcon = _interopRequireDefault(require("./trimet-mode-icon"));

var _biketownIcon = _interopRequireDefault(require("./companies/biketown-icon"));

const TriMetLegIcon = ({
  leg,
  ...props
}) => {
  // Custom TriMet icon logic.
  const routeLongName = (0, _itinerary.getLegRouteLongName)(leg);

  if (routeLongName && routeLongName.startsWith("Portland Streetcar")) {
    return /*#__PURE__*/_react.default.createElement(_trimetModeIcon.default, (0, _extends2.default)({
      mode: "STREETCAR"
    }, props));
  }

  if (leg.rentedBike) {
    if (leg.from.networks && leg.from.networks[0] === "GBFS") {
      return /*#__PURE__*/_react.default.createElement(_biketownIcon.default, props);
    }

    return /*#__PURE__*/_react.default.createElement(_trimetModeIcon.default, (0, _extends2.default)({
      mode: "BICYCLE"
    }, props));
  }

  return /*#__PURE__*/_react.default.createElement(_legIcon.default, (0, _extends2.default)({
    leg: leg,
    ModeIcon: _trimetModeIcon.default
  }, props));
};

var _default = TriMetLegIcon;
exports.default = _default;
//# sourceMappingURL=trimet-leg-icon.js.map