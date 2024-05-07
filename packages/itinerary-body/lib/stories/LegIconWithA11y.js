"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _icons = require("@opentripplanner/icons");

var _react = _interopRequireDefault(require("react"));

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

/**
 * For illustration only. Component where the transit leg icons have an (untranslated) aria-label.
 */
const LegIconWithA11y = props => {
  const {
    leg
  } = props;
  const {
    mode
  } = leg;
  const ariaLabel = _coreUtils.default.itinerary.isTransit(mode) ? mode : undefined; // eslint-disable-next-line react/jsx-props-no-spreading

  return /*#__PURE__*/_react.default.createElement(_icons.ClassicLegIcon, (0, _extends2.default)({}, props, {
    "aria-label": ariaLabel
  }));
};

var _default = LegIconWithA11y;
exports.default = _default;
//# sourceMappingURL=LegIconWithA11y.js.map