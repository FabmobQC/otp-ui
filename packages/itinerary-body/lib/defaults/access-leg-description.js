"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSummaryMode = getSummaryMode;
exports.default = AccessLegDescription;

var _humanizeDistance = require("@opentripplanner/humanize-distance");

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var S = _interopRequireWildcard(require("../styled"));

var _util = require("../util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Gets the summary mode in the ambient language.
 */
function getSummaryMode(leg, intl) {
  switch (leg.mode) {
    case "BICYCLE":
      return intl.formatMessage({
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.summaryMode.bike"],
        description: "Bike to somewhere",
        id: "otpUi.AccessLegBody.summaryMode.bike"
      });

    case "BICYCLE_RENT":
      return intl.formatMessage({
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.summaryMode.bikeshare"],
        description: "Bikeshare to somewhere",
        id: "otpUi.AccessLegBody.summaryMode.bikeshare"
      });

    case "CAR":
      return leg.rideHailingEstimate ? intl.formatMessage({
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.summaryMode.carHail"],
        description: "Ride in a car/taxi to somewhere",
        id: "otpUi.AccessLegBody.summaryMode.carHail"
      }) : intl.formatMessage({
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.summaryMode.carDrive"],
        description: "Drive somewhere",
        id: "otpUi.AccessLegBody.summaryMode.carDrive"
      });

    case "MICROMOBILITY":
    case "MICROMOBILITY_RENT":
    case "SCOOTER":
      return intl.formatMessage({
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.summaryMode.escooter"],
        description: "Use an e-scooter",
        id: "otpUi.AccessLegBody.summaryMode.escooter"
      });

    case "WALK":
      return intl.formatMessage({
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.summaryMode.walk"],
        description: "Walk to somewhere",
        id: "otpUi.AccessLegBody.summaryMode.walk"
      });

    default:
      return leg.mode;
  }
}
/**
 * Renders leg description text, e.g. "Walk 0.5 mi to..."
 * while letting others style the mode and place text.
 */


function AccessLegDescription({
  className,
  config,
  leg,
  style
}) {
  const intl = (0, _reactIntl.useIntl)(); // Replace the Vertex Type for BIKESHARE with VEHICLE as we do not know that
  // it is a bike yet because that information is in the next leg with OTP2.

  const toPlace = { ...leg.to,
    vertexType: leg.to.vertexType === "BIKESHARE" ? "VEHICLE" : leg.to.vertexType
  };
  const modeContent = getSummaryMode(leg, intl);

  const placeContent = /*#__PURE__*/_react.default.createElement(S.LegDescriptionPlace, null, (0, _util.getPlaceName)(toPlace, config.companies, intl));

  return (
    /*#__PURE__*/
    // Return an HTML element which is passed a className (and style props)
    // for styled-components support.
    _react.default.createElement("span", {
      className: className,
      style: style
    }, leg.distance > 0 ? /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: "{mode} {distance} to {place}",
      description: "Summarizes an access leg, including distance",
      id: "otpUi.AccessLegBody.summaryAndDistance",
      values: {
        // TODO: Implement metric vs imperial (up until now it's just imperial).
        distance: (0, _humanizeDistance.humanizeDistanceString)(leg.distance, false, intl),
        mode: modeContent,
        place: placeContent
      }
    }) : /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: "{mode} to {place}",
      description: "Summarizes an access leg",
      id: "otpUi.AccessLegBody.summary",
      values: {
        mode: modeContent,
        place: placeContent
      }
    }))
  );
}
//# sourceMappingURL=access-leg-description.js.map