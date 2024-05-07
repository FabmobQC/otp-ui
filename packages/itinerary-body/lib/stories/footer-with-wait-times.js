"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _dateFns = require("date-fns");

var _routeDescriptionFooter = require("./route-description-footer");

/**
 * This method returns a RouteDescriptionFooter element with falsy wait-times
 * generated from legs' to and from arrival-times. It is only meant for
 * illustrative purposes.
 */
const RouteDescriptionFooterWithWaitTimes = ({
  leg
}) => {
  const toTime = leg.to.arrival || 0;
  const fromTime = leg.from.arrival || 0;
  const waitMinutes = (0, _dateFns.differenceInMinutes)(new Date(toTime), new Date(fromTime));
  const TypedRouteDescriptionFooter = _routeDescriptionFooter.DefaultRouteDescriptionFooter;
  return /*#__PURE__*/_react.default.createElement(TypedRouteDescriptionFooter, {
    leg: leg,
    waitMinutes: waitMinutes
  });
};

var _default = RouteDescriptionFooterWithWaitTimes;
exports.default = _default;
//# sourceMappingURL=footer-with-wait-times.js.map