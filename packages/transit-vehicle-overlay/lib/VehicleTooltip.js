"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VehicleTooltip;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _defaultMessages = _interopRequireDefault(require("./utils/default-messages"));

var _formattedDurationWithSeconds = _interopRequireDefault(require("./utils/formatted-duration-with-seconds"));

const Title = _styledComponents.default.span.withConfig({
  displayName: "VehicleTooltip__Title",
  componentId: "sc-57cvce-0"
})(["font-size:110%;font-weight:bold;"]);

function VehicleTooltip({
  vehicle
}) {
  const {
    routeShortName,
    routeType,
    seconds
  } = vehicle;

  let name = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, routeShortName); // This condition avoids processing long route names such as "Portland Streetcar".


  if ((routeShortName === null || routeShortName === void 0 ? void 0 : routeShortName.length) <= 5) {
    // This produces text such as "MAX Green", "BUS 157",
    // or "Line A" if no routeType is provided.
    name = /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: _defaultMessages.default["otpUi.TransitVehicleOverlay.routeTitle"],
      description: "Formats a route title",
      id: "otpUi.TransitVehicleOverlay.routeTitle",
      values: {
        name: routeShortName,
        type: routeType || /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
          defaultMessage: _defaultMessages.default["otpUi.TransitVehicleOverlay.transitLine"],
          description: "Generic transit line",
          id: "otpUi.TransitVehicleOverlay.transitLine"
        })
      }
    });
  }

  if (!seconds) return name;
  return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _defaultMessages.default["otpUi.TransitVehicleOverlay.defaultTooltip"],
    description: "Realtime vehicle info shown in a tooltip",
    id: "otpUi.TransitVehicleOverlay.defaultTooltip",
    values: {
      duration: /*#__PURE__*/_react.default.createElement(_formattedDurationWithSeconds.default, {
        seconds: seconds
      }),
      route: /*#__PURE__*/_react.default.createElement(Title, null, name)
    }
  });
}
//# sourceMappingURL=VehicleTooltip.js.map