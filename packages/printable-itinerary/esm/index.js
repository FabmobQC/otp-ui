import React from "react";
import { FormattedMessage } from "react-intl";
import AccessLeg from "./access-leg";
import * as S from "./styled";
import TNCLeg from "./tnc-leg";
import TransitLeg from "./transit-leg";
import { defaultMessages, strongText } from "./util";

function PrintableItinerary(_ref) {
  var className = _ref.className,
      config = _ref.config,
      itinerary = _ref.itinerary,
      LegIcon = _ref.LegIcon;
  return /*#__PURE__*/React.createElement(S.PrintableItinerary, {
    className: className
  }, itinerary.legs.length > 0 && /*#__PURE__*/React.createElement(S.CollapsedTop, null, /*#__PURE__*/React.createElement(S.LegBody, null, /*#__PURE__*/React.createElement(S.LegHeader, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.PrintableItinerary.depart"],
    description: "Indicates where to depart from",
    id: "otpUi.PrintableItinerary.depart",
    values: {
      place: itinerary.legs[0].from.name,
      strong: strongText
    }
  })))), itinerary.legs.map(function (leg, k) {
    return leg.transitLeg ? /*#__PURE__*/React.createElement(TransitLeg, {
      interlineFollows: k < itinerary.legs.length - 1 && itinerary.legs[k + 1].interlineWithPreviousLeg,
      key: k,
      leg: leg,
      LegIcon: LegIcon
    }) : leg.rideHailingEstimate ? /*#__PURE__*/React.createElement(TNCLeg, {
      leg: leg,
      LegIcon: LegIcon,
      key: k
    }) : /*#__PURE__*/React.createElement(AccessLeg, {
      config: config,
      key: k,
      leg: leg,
      LegIcon: LegIcon
    });
  }));
}

export default PrintableItinerary; // Rename styled components for export.

export { S as Styled };
//# sourceMappingURL=index.js.map