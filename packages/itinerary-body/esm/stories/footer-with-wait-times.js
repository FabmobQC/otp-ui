import React from "react";
import { differenceInMinutes } from "date-fns";
import { DefaultRouteDescriptionFooter } from "./route-description-footer";
/**
 * This method returns a RouteDescriptionFooter element with falsy wait-times
 * generated from legs' to and from arrival-times. It is only meant for
 * illustrative purposes.
 */

var RouteDescriptionFooterWithWaitTimes = function RouteDescriptionFooterWithWaitTimes(_ref) {
  var leg = _ref.leg;
  var toTime = leg.to.arrival || 0;
  var fromTime = leg.from.arrival || 0;
  var waitMinutes = differenceInMinutes(new Date(toTime), new Date(fromTime));
  var TypedRouteDescriptionFooter = DefaultRouteDescriptionFooter;
  return /*#__PURE__*/React.createElement(TypedRouteDescriptionFooter, {
    leg: leg,
    waitMinutes: waitMinutes
  });
};

export default RouteDescriptionFooterWithWaitTimes;
//# sourceMappingURL=footer-with-wait-times.js.map