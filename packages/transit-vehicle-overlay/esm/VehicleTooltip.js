import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import defaultMessages from "./utils/default-messages";
import FormattedDurationWithSeconds from "./utils/formatted-duration-with-seconds";
var Title = styled.span.withConfig({
  displayName: "VehicleTooltip__Title",
  componentId: "sc-57cvce-0"
})(["font-size:110%;font-weight:bold;"]);
export default function VehicleTooltip(_ref) {
  var vehicle = _ref.vehicle;
  var routeShortName = vehicle.routeShortName,
      routeType = vehicle.routeType,
      seconds = vehicle.seconds;
  var name = /*#__PURE__*/React.createElement(React.Fragment, null, routeShortName); // This condition avoids processing long route names such as "Portland Streetcar".

  if ((routeShortName === null || routeShortName === void 0 ? void 0 : routeShortName.length) <= 5) {
    // This produces text such as "MAX Green", "BUS 157",
    // or "Line A" if no routeType is provided.
    name = /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.routeTitle"],
      description: "Formats a route title",
      id: "otpUi.TransitVehicleOverlay.routeTitle",
      values: {
        name: routeShortName,
        type: routeType || /*#__PURE__*/React.createElement(FormattedMessage, {
          defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.transitLine"],
          description: "Generic transit line",
          id: "otpUi.TransitVehicleOverlay.transitLine"
        })
      }
    });
  }

  if (!seconds) return name;
  return /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.defaultTooltip"],
    description: "Realtime vehicle info shown in a tooltip",
    id: "otpUi.TransitVehicleOverlay.defaultTooltip",
    values: {
      duration: /*#__PURE__*/React.createElement(FormattedDurationWithSeconds, {
        seconds: seconds
      }),
      route: /*#__PURE__*/React.createElement(Title, null, name)
    }
  });
}
//# sourceMappingURL=VehicleTooltip.js.map