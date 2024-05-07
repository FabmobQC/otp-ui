import coreUtils from "@opentripplanner/core-utils";
import React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { getCompanyForNetwork } from "@opentripplanner/core-utils/lib/itinerary";
import { Duration } from "../defaults";
import * as S from "../styled";
import { defaultMessages, parseOTP2Minute } from "../util";
import AccessLegSummary from "./access-leg-summary";
export default function TNCLeg(_ref) {
  var _getCompanyForNetwork;

  var config = _ref.config,
      followsTransit = _ref.followsTransit,
      leg = _ref.leg,
      LegIcon = _ref.LegIcon,
      _ref$LYFT_CLIENT_ID = _ref.LYFT_CLIENT_ID,
      LYFT_CLIENT_ID = _ref$LYFT_CLIENT_ID === void 0 ? "" : _ref$LYFT_CLIENT_ID,
      onSummaryClick = _ref.onSummaryClick,
      showLegIcon = _ref.showLegIcon,
      _ref$UBER_CLIENT_ID = _ref.UBER_CLIENT_ID,
      UBER_CLIENT_ID = _ref$UBER_CLIENT_ID === void 0 ? "" : _ref$UBER_CLIENT_ID;
  var universalLinks = {
    uber: "https://m.uber.com/".concat(coreUtils.ui.isMobile() ? "ul/" : "", "?client_id=").concat(UBER_CLIENT_ID, "&action=setPickup&pickup[latitude]=").concat(leg.from.lat, "&pickup[longitude]=").concat(leg.from.lon, "&pickup[formatted_address]=").concat(encodeURI(leg.from.name), "&dropoff[latitude]=").concat(leg.to.lat, "&dropoff[longitude]=").concat(leg.to.lon, "&dropoff[formatted_address]=").concat(encodeURI(leg.to.name)),
    lyft: "https://lyft.com/ride?id=lyft&partner=".concat(LYFT_CLIENT_ID, "&pickup[latitude]=").concat(leg.from.lat, "&pickup[longitude]=").concat(leg.from.lon, "&destination[latitude]=").concat(leg.to.lat, "&destination[longitude]=").concat(leg.to.lon)
  };
  var rideHailingEstimate = leg.rideHailingEstimate;
  if (!rideHailingEstimate) return null;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(S.PlaceSubheader, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.AccessLegBody.TncLeg.waitForPickup"],
    description: "Action text for waiting for a ride-hail vehicle.",
    id: "otpUi.AccessLegBody.TncLeg.waitForPickup",
    values: {
      company: (_getCompanyForNetwork = getCompanyForNetwork(rideHailingEstimate.provider.id, config.companies)) === null || _getCompanyForNetwork === void 0 ? void 0 : _getCompanyForNetwork.label,
      minutes: followsTransit ? 0 : parseInt(parseOTP2Minute(leg.rideHailingEstimate.arrival), 10)
    }
  })), /*#__PURE__*/React.createElement(S.LegBody, null, /*#__PURE__*/React.createElement(AccessLegSummary, {
    config: config,
    leg: leg,
    LegIcon: LegIcon,
    onSummaryClick: onSummaryClick,
    showLegIcon: showLegIcon
  }), /*#__PURE__*/React.createElement(S.BookTNCRideButtonContainer, null, /*#__PURE__*/React.createElement(S.BookTNCRideButton, {
    href: universalLinks[rideHailingEstimate.provider.id],
    target: coreUtils.ui.isMobile() ? "_self" : "_blank"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.AccessLegBody.TncLeg.bookRide"],
    description: "Action text to book a ride with a ride-hail company.",
    id: "otpUi.AccessLegBody.TncLeg.bookRide"
  })), followsTransit && /*#__PURE__*/React.createElement(S.BookLaterPointer, null), followsTransit && typeof leg.startTime === "number" && /*#__PURE__*/React.createElement(S.BookLaterContainer, null, /*#__PURE__*/React.createElement(S.BookLaterInnerContainer, null, /*#__PURE__*/React.createElement(S.BookLaterText, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.AccessLegBody.TncLeg.bookRideLater"],
    description: "Hint text to book a ride at a later time.",
    id: "otpUi.AccessLegBody.TncLeg.bookRideLater",
    values: {
      timeMillis: leg.startTime - parseInt(parseOTP2Minute(rideHailingEstimate.arrival), 10)
    }
  }))))), /*#__PURE__*/React.createElement(S.TNCTravelTime, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.AccessLegBody.TncLeg.estimatedTravelTime"],
    description: "Describes the estimated travel time.",
    id: "otpUi.AccessLegBody.TncLeg.estimatedTravelTime",
    values: {
      duration: /*#__PURE__*/React.createElement(Duration, {
        seconds: leg.duration
      })
    }
  })), rideHailingEstimate.minPrice && /*#__PURE__*/React.createElement(S.TNCCost, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.AccessLegBody.TncLeg.estimatedCost"],
    description: "Shows the minimum and maximum fares for a TNC ride.",
    id: "otpUi.AccessLegBody.TncLeg.estimatedCost",
    values: {
      maxFare: /*#__PURE__*/React.createElement(FormattedNumber, {
        currency: rideHailingEstimate.maxPrice.currency.code,
        currencyDisplay: "narrowSymbol" // This isn't a "real" style prop
        // eslint-disable-next-line react/style-prop-object
        ,
        style: "currency",
        value: rideHailingEstimate.maxPrice.amount
      }),
      minFare: /*#__PURE__*/React.createElement(FormattedNumber, {
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