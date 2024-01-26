import coreUtils from "@opentripplanner/core-utils";
import PropTypes from "prop-types";
import React, { Suspense } from "react";

import { getCompanyIcon as defaultGetCompanyIcon } from "./companies";

const LegIcon = ({ getCompanyIcon, leg, ModeIcon, ...props }) => {
  const company = coreUtils.itinerary.getCompanyFromLeg(leg);
  // Check if the iconStr has a matching company icon. If so, return that.
  if (company && typeof getCompanyIcon === "function") {
    const CompanyIcon = getCompanyIcon(company);
    if (CompanyIcon)
      return (
        <Suspense fallback={<span>{company}</span>}>
          <CompanyIcon {...props} />
        </Suspense>
      );
  }
  let iconStr = leg.mode;
  // Do this for P&R, K&R and TNC trips without company icon
  if (iconStr && iconStr.startsWith("CAR")) iconStr = "CAR";

  const shorterLeg = {
    longName: leg.longName,
    shortName: leg.shortName,
    routeId: leg.routeId
  };

  return <ModeIcon mode={iconStr} leg={shorterLeg} {...props} />;
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
