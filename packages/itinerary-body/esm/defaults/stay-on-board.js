import React from "react";
import { FormattedMessage } from "react-intl";
import { defaultMessages } from "../util";

/**
 * Renders a "Stay on board at <station>" step in an interlined itinerary.
 */
export default function StayOnBoard(_ref) {
  var place = _ref.place;
  return /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.ItineraryBody.stayOnBoard"],
    description: "Instructs riders to stay on board",
    id: "otpUi.ItineraryBody.stayOnBoard",
    values: {
      place: /*#__PURE__*/React.createElement("strong", null, place.name)
    }
  });
}
//# sourceMappingURL=stay-on-board.js.map