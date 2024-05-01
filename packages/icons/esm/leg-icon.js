import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import coreUtils from "@opentripplanner/core-utils";
import PropTypes from "prop-types";
import React, { Suspense } from "react";
import { getCompanyIcon as defaultGetCompanyIcon } from "./companies";

var LegIcon = function LegIcon(_ref) {
  var getCompanyIcon = _ref.getCompanyIcon,
      leg = _ref.leg,
      ModeIcon = _ref.ModeIcon,
      props = _objectWithoutProperties(_ref, ["getCompanyIcon", "leg", "ModeIcon"]);

  var company = coreUtils.itinerary.getCompanyFromLeg(leg); // Check if the iconStr has a matching company icon. If so, return that.

  if (company && typeof getCompanyIcon === "function") {
    var CompanyIcon = getCompanyIcon(company);
    if (CompanyIcon) return /*#__PURE__*/React.createElement(Suspense, {
      fallback: /*#__PURE__*/React.createElement("span", null, company)
    }, /*#__PURE__*/React.createElement(CompanyIcon, props));
  }

  var iconStr = leg.mode; // Do this for P&R, K&R and TNC trips without company icon

  if (iconStr && iconStr.startsWith("CAR")) iconStr = "CAR";
  return /*#__PURE__*/React.createElement(ModeIcon, _extends({
    mode: iconStr
  }, props));
};

LegIcon.propTypes = {
  // Optional override function for deriving the company icon for a given leg.
  getCompanyIcon: PropTypes.func,
  // TYPESCRIPT TODO: restore
  // leg: coreUtils.types.legType.isRequired,
  ModeIcon: PropTypes.elementType.isRequired
};
LegIcon.defaultProps = {
  getCompanyIcon: defaultGetCompanyIcon
};
export default LegIcon;
//# sourceMappingURL=leg-icon.js.map