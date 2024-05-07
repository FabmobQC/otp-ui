import React from "react";
import { FormattedMessage } from "react-intl";
import * as S from "../styled";
import { defaultMessages } from "../util";
import BasicPlaceName from "./basic-place-name";
export default function PlaceName(_ref) {
  var config = _ref.config,
      interline = _ref.interline,
      place = _ref.place;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BasicPlaceName, {
    config: config,
    interline: interline,
    place: place
  }), place.stopId && !interline && /*#__PURE__*/React.createElement(S.StopIdSpan, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TransitLegBody.stopIdBasic"],
    description: "Displays a stop id",
    id: "otpUi.TransitLegBody.stopIdBasic",
    values: {
      stopId: place.stopId.split(":")[1]
    }
  }))
  /*
    TODO: There is no explicit stop button on the mocks.
    Have a question out to marketing as to whether the above StopID
    is a button to navigate the user to the arrival list for the stop
    that's what the button below does
  */

  /* <ViewStopButton stopId={place.stopId} /> */
  );
}
//# sourceMappingURL=place-name.js.map