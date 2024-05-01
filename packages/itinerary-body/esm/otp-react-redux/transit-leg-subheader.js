import coreUtils from "@opentripplanner/core-utils";
import React from "react";
import { FormattedMessage } from "react-intl";
import * as S from "../styled";
import { defaultMessages } from "../util";
import ViewStopButton from "./view-stop-button";
var _coreUtils$itinerary = coreUtils.itinerary,
    getDisplayedStopId = _coreUtils$itinerary.getDisplayedStopId,
    isFlex = _coreUtils$itinerary.isFlex;
export default function TransitLegSubheader(_ref) {
  var leg = _ref.leg,
      onStopClick = _ref.onStopClick;
  var from = leg.from;
  return /*#__PURE__*/React.createElement(S.PlaceSubheader, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TransitLegBody.stopId"],
    description: "Displays the stop ID",
    id: "otpUi.TransitLegBody.stopId",
    values: {
      stopId: getDisplayedStopId(from)
    }
  }), !isFlex(leg) && /*#__PURE__*/React.createElement(ViewStopButton, {
    onStopClick: onStopClick,
    stop: from.stop
  }));
}
//# sourceMappingURL=transit-leg-subheader.js.map