import { getLegRouteShortName } from "@opentripplanner/core-utils/lib/itinerary";
import React from "react";
import RouteLongName from "../defaults/route-long-name";
import * as S from "../styled";
export default function RouteDescription(_ref) {
  var leg = _ref.leg,
      LegIcon = _ref.LegIcon;
  var routeShortName = getLegRouteShortName(leg);
  return /*#__PURE__*/React.createElement(S.LegDescriptionForTransit, null, /*#__PURE__*/React.createElement(S.LegIconAndRouteShortName, null, /*#__PURE__*/React.createElement(S.LegIconContainer, null, /*#__PURE__*/React.createElement(LegIcon, {
    leg: leg
  })), routeShortName && /*#__PURE__*/React.createElement(S.LegDescriptionRouteShortName, null, routeShortName)), /*#__PURE__*/React.createElement(S.LegDescriptionRouteLongName, null, /*#__PURE__*/React.createElement(RouteLongName, {
    leg: leg
  })));
}
//# sourceMappingURL=route-description.js.map