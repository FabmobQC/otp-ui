"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TNCLeg;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _defaults = require("../defaults");

var S = _interopRequireWildcard(require("../styled"));

var _util = require("../util");

var _accessLegSummary = _interopRequireDefault(require("./access-leg-summary"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function TNCLeg({
  config,
  followsTransit,
  leg,
  LegIcon,
  LYFT_CLIENT_ID = "",
  onSummaryClick,
  showLegIcon,
  UBER_CLIENT_ID = ""
}) {
  var _getCompanyForNetwork;

  const universalLinks = {
    uber: `https://m.uber.com/${_coreUtils.default.ui.isMobile() ? "ul/" : ""}?client_id=${UBER_CLIENT_ID}&action=setPickup&pickup[latitude]=${leg.from.lat}&pickup[longitude]=${leg.from.lon}&pickup[formatted_address]=${encodeURI(leg.from.name)}&dropoff[latitude]=${leg.to.lat}&dropoff[longitude]=${leg.to.lon}&dropoff[formatted_address]=${encodeURI(leg.to.name)}`,
    lyft: `https://lyft.com/ride?id=lyft&partner=${LYFT_CLIENT_ID}&pickup[latitude]=${leg.from.lat}&pickup[longitude]=${leg.from.lon}&destination[latitude]=${leg.to.lat}&destination[longitude]=${leg.to.lon}`
  };
  const {
    rideHailingEstimate
  } = leg;
  if (!rideHailingEstimate) return null;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(S.PlaceSubheader, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.TncLeg.waitForPickup"],
    description: "Action text for waiting for a ride-hail vehicle.",
    id: "otpUi.AccessLegBody.TncLeg.waitForPickup",
    values: {
      company: (_getCompanyForNetwork = (0, _itinerary.getCompanyForNetwork)(rideHailingEstimate.provider.id, config.companies)) === null || _getCompanyForNetwork === void 0 ? void 0 : _getCompanyForNetwork.label,
      minutes: followsTransit ? 0 : parseInt((0, _util.parseOTP2Minute)(leg.rideHailingEstimate.arrival), 10)
    }
  })), /*#__PURE__*/_react.default.createElement(S.LegBody, null, /*#__PURE__*/_react.default.createElement(_accessLegSummary.default, {
    config: config,
    leg: leg,
    LegIcon: LegIcon,
    onSummaryClick: onSummaryClick,
    showLegIcon: showLegIcon
  }), /*#__PURE__*/_react.default.createElement(S.BookTNCRideButtonContainer, null, /*#__PURE__*/_react.default.createElement(S.BookTNCRideButton, {
    href: universalLinks[rideHailingEstimate.provider.id],
    target: _coreUtils.default.ui.isMobile() ? "_self" : "_blank"
  }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.TncLeg.bookRide"],
    description: "Action text to book a ride with a ride-hail company.",
    id: "otpUi.AccessLegBody.TncLeg.bookRide"
  })), followsTransit && /*#__PURE__*/_react.default.createElement(S.BookLaterPointer, null), followsTransit && typeof leg.startTime === "number" && /*#__PURE__*/_react.default.createElement(S.BookLaterContainer, null, /*#__PURE__*/_react.default.createElement(S.BookLaterInnerContainer, null, /*#__PURE__*/_react.default.createElement(S.BookLaterText, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.TncLeg.bookRideLater"],
    description: "Hint text to book a ride at a later time.",
    id: "otpUi.AccessLegBody.TncLeg.bookRideLater",
    values: {
      timeMillis: leg.startTime - parseInt((0, _util.parseOTP2Minute)(rideHailingEstimate.arrival), 10)
    }
  }))))), /*#__PURE__*/_react.default.createElement(S.TNCTravelTime, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.TncLeg.estimatedTravelTime"],
    description: "Describes the estimated travel time.",
    id: "otpUi.AccessLegBody.TncLeg.estimatedTravelTime",
    values: {
      duration: /*#__PURE__*/_react.default.createElement(_defaults.Duration, {
        seconds: leg.duration
      })
    }
  })), rideHailingEstimate.minPrice && /*#__PURE__*/_react.default.createElement(S.TNCCost, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.TncLeg.estimatedCost"],
    description: "Shows the minimum and maximum fares for a TNC ride.",
    id: "otpUi.AccessLegBody.TncLeg.estimatedCost",
    values: {
      maxFare: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedNumber, {
        currency: rideHailingEstimate.maxPrice.currency.code,
        currencyDisplay: "narrowSymbol" // This isn't a "real" style prop
        // eslint-disable-next-line react/style-prop-object
        ,
        style: "currency",
        value: rideHailingEstimate.maxPrice.amount
      }),
      minFare: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedNumber, {
        currency: rideHailingEstimate.minPrice.currency.code,
        currencyDisplay: "narrowSymbol" // This isn't a "real" style prop
        // eslint-disable-next-line react/style-prop-object
        ,
        style: "currency",
        value: rideHailingEstimate.minPrice.amount
      })
    }
  }))));
}
//# sourceMappingURL=tnc-leg.js.map