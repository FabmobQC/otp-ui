import { getLegRouteShortName } from "@opentripplanner/core-utils/lib/itinerary";
import React from "react";
import * as S from "../styled";
import RouteLongName from "./route-long-name";
export default function RouteDescription(_ref) {
  var leg = _ref.leg;
  var routeShortName = getLegRouteShortName(leg);
  return /*#__PURE__*/React.createElement(S.LegDescriptionForTransit, null, routeShortName && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(S.LegDescriptionRouteShortName, null, routeShortName)), /*#__PURE__*/React.createElement(S.LegDescriptionRouteLongName, null, /*#__PURE__*/React.createElement(RouteLongName, {
    leg: leg
  })));
}
//# sourceMappingURL=route-description.js.map