"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TNCLeg;

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _itineraryBody = require("@opentripplanner/itinerary-body");

var _util = require("@opentripplanner/itinerary-body/lib/util");

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _accessibilityAnnotation = _interopRequireDefault(require("./accessibility-annotation"));

var S = _interopRequireWildcard(require("./styled"));

var _util2 = require("./util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function TNCLeg({
  accessibilityScoreGradationMap,
  leg,
  LegIcon
}) {
  var _getCompanyForNetwork, _leg$rideHailingEstim;

  const {
    rideHailingEstimate
  } = leg;
  if (!rideHailingEstimate) return null;
  return /*#__PURE__*/_react.default.createElement(S.Leg, null, /*#__PURE__*/_react.default.createElement(_accessibilityAnnotation.default, {
    accessibilityScoreGradationMap: accessibilityScoreGradationMap,
    grayscale: true,
    leg: leg,
    LegIcon: LegIcon
  }), /*#__PURE__*/_react.default.createElement(S.LegBody, null, /*#__PURE__*/_react.default.createElement(S.LegHeader, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util2.defaultMessages["otpUi.PrintableItinerary.TncLeg.header"],
    description: "Summary text for TNC leg",
    id: "otpUi.PrintableItinerary.TncLeg.header",
    values: {
      company: (_getCompanyForNetwork = (0, _itinerary.getCompanyForNetwork)(rideHailingEstimate.provider.id)) === null || _getCompanyForNetwork === void 0 ? void 0 : _getCompanyForNetwork.label,
      place: leg.to.name,
      strong: _util2.strongText
    }
  })), /*#__PURE__*/_react.default.createElement(S.LegDetails, null, typeof (leg === null || leg === void 0 ? void 0 : (_leg$rideHailingEstim = leg.rideHailingEstimate) === null || _leg$rideHailingEstim === void 0 ? void 0 : _leg$rideHailingEstim.arrival) === "string" && /*#__PURE__*/_react.default.createElement(S.LegDetail, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util2.defaultMessages["otpUi.PrintableItinerary.TncLeg.estimatedWaitTime"],
    description: "Describes the estimated TNC wait time.",
    id: "otpUi.PrintableItinerary.TncLeg.estimatedWaitTime",
    values: {
      duration: /*#__PURE__*/_react.default.createElement(_itineraryBody.Defaults.Duration, {
        seconds: parseInt((0, _util.parseOTP2Minute)(leg.rideHailingEstimate.arrival), 10) * 60
      }),
      strong: _util2.strongText
    }
  })), /*#__PURE__*/_react.default.createElement(S.LegDetail, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util2.defaultMessages["otpUi.PrintableItinerary.TncLeg.estimatedTravelTime"],
    description: "Describes the estimated TNC travel time.",
    id: "otpUi.PrintableItinerary.TncLeg.estimatedTravelTime",
    values: {
      duration: /*#__PURE__*/_react.default.createElement(_itineraryBody.Defaults.Duration, {
        seconds: leg.duration
      }),
      strong: _util2.strongText
    }
  })))));
}
//# sourceMappingURL=tnc-leg.js.map