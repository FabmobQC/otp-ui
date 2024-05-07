import React from "react";
import { FormattedMessage } from "react-intl";
import { defaultMessages } from "../util";

/**
 * Returns the street name, or "Unnamed path/street" in the correct language if applicable.
 */
export default function StreetName(_ref) {
  var rawStreetName = _ref.rawStreetName;

  switch (rawStreetName) {
    case "road":
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.AccessLegBody.unnamedRoad"],
        description: "Text for an unnamed road",
        id: "otpUi.AccessLegBody.unnamedRoad"
      });

    case "path":
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.AccessLegBody.unnamedPath"],
        description: "Text for an unnamed path",
        id: "otpUi.AccessLegBody.unnamedPath"
      });

    default:
      return /*#__PURE__*/React.createElement(React.Fragment, null, rawStreetName);
  }
}
//# sourceMappingURL=street-name.js.map