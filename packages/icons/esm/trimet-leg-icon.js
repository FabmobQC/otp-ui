import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from "react";
import { getLegRouteLongName } from "@opentripplanner/core-utils/lib/itinerary";
import LegIcon from "./leg-icon";
import TriMetModeIcon from "./trimet-mode-icon";
import BiketownIcon from "./companies/biketown-icon";

var TriMetLegIcon = function TriMetLegIcon(_ref) {
  var leg = _ref.leg,
      props = _objectWithoutProperties(_ref, ["leg"]);

  // Custom TriMet icon logic.
  var routeLongName = getLegRouteLongName(leg);

  if (routeLongName && routeLongName.startsWith("Portland Streetcar")) {
    return /*#__PURE__*/React.createElement(TriMetModeIcon, _extends({
      mode: "STREETCAR"
    }, props));
  }

  if (leg.rentedBike) {
    if (leg.from.networks && leg.from.networks[0] === "GBFS") {
      return /*#__PURE__*/React.createElement(BiketownIcon, props);
    }

    return /*#__PURE__*/React.createElement(TriMetModeIcon, _extends({
      mode: "BICYCLE"
    }, props));
  }

  return /*#__PURE__*/React.createElement(LegIcon, _extends({
    leg: leg,
    ModeIcon: TriMetModeIcon
  }, props));
};

export default TriMetLegIcon;
//# sourceMappingURL=trimet-leg-icon.js.map