import React from "react";
import { FormattedMessage } from "react-intl";
export var Heading;

(function (Heading) {
  Heading["east"] = "EAST";
  Heading["north"] = "NORTH";
  Heading["northeast"] = "NORTHEAST";
  Heading["northwest"] = "NORTHWEST";
  Heading["south"] = "SOUTH";
  Heading["southeast"] = "SOUTHEAST";
  Heading["southwest"] = "SOUTHWEST";
  Heading["west"] = "WEST";
})(Heading || (Heading = {}));

/**
 * Displays text for a compass direction.
 */
export default function AccessLegStepHeading(_ref) {
  var heading = _ref.heading;

  // Note that we don't make use of dynamic message ids,
  // so that formatjs CLI tools can pick the strings up for analysis.
  switch (heading) {
    case Heading.east:
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: heading,
        description: "Compass direction east",
        id: "otpUi.AccessLegBody.stepHeading.east"
      });

    case Heading.north:
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: heading,
        description: "Compass direction north",
        id: "otpUi.AccessLegBody.stepHeading.north"
      });

    case Heading.northeast:
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: heading,
        description: "Compass direction northeast",
        id: "otpUi.AccessLegBody.stepHeading.northeast"
      });

    case Heading.northwest:
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: heading,
        description: "Compass direction northwest",
        id: "otpUi.AccessLegBody.stepHeading.northwest"
      });

    case Heading.south:
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: heading,
        description: "Compass direction south",
        id: "otpUi.AccessLegBody.stepHeading.south"
      });

    case Heading.southeast:
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: heading,
        description: "Compass direction southeast",
        id: "otpUi.AccessLegBody.stepHeading.southeast"
      });

    case Heading.southwest:
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: heading,
        description: "Compass direction southwest",
        id: "otpUi.AccessLegBody.stepHeading.southwest"
      });

    case Heading.west:
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: heading,
        description: "Compass direction west",
        id: "otpUi.AccessLegBody.stepHeading.west"
      });

    default:
      throw new Error("Invalid heading: ".concat(heading));
  }
}
//# sourceMappingURL=access-leg-step-heading.js.map