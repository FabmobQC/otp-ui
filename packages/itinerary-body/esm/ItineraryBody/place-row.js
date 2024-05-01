import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import coreUtils from "@opentripplanner/core-utils";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import DefaultTimeColumnContent from "../defaults/time-column-content";
import AccessLegBody from "../AccessLegBody";
import * as S from "../styled";
import TransitLegBody from "../TransitLegBody";
import AccessibilityRating from "./accessibility-rating";
import { defaultMessages } from "../util";
/*
  TODO: Wondering if it's possible for us to destructure the time
  preferences from the config object and avoid making the props list so long
*/

export default function PlaceRow(_ref) {
  var accessibilityScoreGradationMap = _ref.accessibilityScoreGradationMap,
      AlertBodyIcon = _ref.AlertBodyIcon,
      AlertToggleIcon = _ref.AlertToggleIcon,
      alwaysCollapseAlerts = _ref.alwaysCollapseAlerts,
      config = _ref.config,
      defaultFareSelector = _ref.defaultFareSelector,
      diagramVisible = _ref.diagramVisible,
      followsTransit = _ref.followsTransit,
      frameLeg = _ref.frameLeg,
      isDestination = _ref.isDestination,
      lastLeg = _ref.lastLeg,
      leg = _ref.leg,
      LegIcon = _ref.LegIcon,
      legIndex = _ref.legIndex,
      LineColumnContent = _ref.LineColumnContent,
      mapillaryCallback = _ref.mapillaryCallback,
      mapillaryKey = _ref.mapillaryKey,
      PlaceName = _ref.PlaceName,
      RouteDescription = _ref.RouteDescription,
      RouteDescriptionFooter = _ref.RouteDescriptionFooter,
      setActiveLeg = _ref.setActiveLeg,
      setLegDiagram = _ref.setLegDiagram,
      setViewedTrip = _ref.setViewedTrip,
      showAgencyInfo = _ref.showAgencyInfo,
      showElevationProfile = _ref.showElevationProfile,
      showLegIcon = _ref.showLegIcon,
      showMapButtonColumn = _ref.showMapButtonColumn,
      showViewTripButton = _ref.showViewTripButton,
      _ref$TimeColumnConten = _ref.TimeColumnContent,
      TimeColumnContent = _ref$TimeColumnConten === void 0 ? DefaultTimeColumnContent : _ref$TimeColumnConten,
      toRouteAbbreviation = _ref.toRouteAbbreviation,
      TransitLegSubheader = _ref.TransitLegSubheader,
      TransitLegSummary = _ref.TransitLegSummary;
  // NOTE: Previously there was a check for itineraries that changed vehicles
  // at a single stop, which would render the stop place the same as the
  // interline stop. However, this prevents the user from being able to click
  // on the stop viewer in this case, which they may want to do in order to
  // check the real-time arrival information for the next leg of their journey.
  var interline = !!(!isDestination && leg.interlineWithPreviousLeg); // const hideBorder = interline || !legIndex;

  var place = isDestination ? _objectSpread({}, leg.to) : _objectSpread({}, leg.from); // OTP2 marks both bikes and scooters as BIKESHARE in the vertextype
  // To get the right label, we need to fix scooters to be "VEHICLERENTAL"

  place.vertexType = leg.mode === "SCOOTER" && !isDestination ? "VEHICLERENTAL" : place.vertexType;
  var intl = useIntl();
  var viewOnMapMessage = intl.formatMessage({
    defaultMessage: defaultMessages["otpUi.ItineraryBody.viewOnMap"],
    description: "Text describing the view-on-map button",
    id: "otpUi.ItineraryBody.viewOnMap"
  });

  var formattedPlace = function formattedPlace(direction) {
    return /*#__PURE__*/React.createElement(PlaceName, {
      config: config,
      interline: interline,
      place: direction
    });
  };

  return /*#__PURE__*/React.createElement(S.PlaceRowWrapper, {
    key: legIndex || "destination-place"
  }, /*#__PURE__*/React.createElement(S.LineColumn, null, /*#__PURE__*/React.createElement(LineColumnContent, {
    interline: interline,
    isDestination: isDestination,
    lastLeg: lastLeg,
    leg: leg,
    LegIcon: LegIcon,
    legIndex: legIndex,
    toRouteAbbreviation: toRouteAbbreviation
  })), /*#__PURE__*/React.createElement(S.PlaceHeader, null, interline && /*#__PURE__*/React.createElement(S.InterlineDot, null, "\u2022"), /*#__PURE__*/React.createElement(S.PlaceName, {
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement(PlaceName, {
    config: config,
    interline: interline,
    place: place
  }))), /*#__PURE__*/React.createElement(S.TimeColumn, null, /*#__PURE__*/React.createElement(TimeColumnContent, {
    isDestination: isDestination,
    leg: leg
  }), !isDestination && leg.accessibilityScore &&
  /*#__PURE__*/
  // TODO: Reorder markup so accessibility info doesn't fall between time and destination.
  React.createElement(AccessibilityRating, {
    gradationMap: accessibilityScoreGradationMap,
    isLeg: true,
    score: leg.accessibilityScore
  })), /*#__PURE__*/React.createElement(S.InvisibleAdditionalDetails, null, !isDestination ? /*#__PURE__*/React.createElement(FormattedMessage, {
    description: "Add starting location for access legs",
    id: "otpUi.TransitLegBody.fromLocation",
    values: {
      location: formattedPlace(leg.from)
    }
  }) : /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "otpUi.TransitLegBody.arriveAt",
    defaultMessage: defaultMessages["otpUi.TransitLegBody.arriveAt"],
    description: "Identifies end of the trip to screenreaders",
    values: {
      place: formattedPlace(leg.to)
    }
  })), /*#__PURE__*/React.createElement(S.PlaceDetails, null, !isDestination && (leg.transitLeg ?
  /*#__PURE__*/

  /* This is a transit leg */
  React.createElement(TransitLegBody, {
    AlertBodyIcon: AlertBodyIcon,
    AlertToggleIcon: AlertToggleIcon,
    alwaysCollapseAlerts: alwaysCollapseAlerts,
    defaultFareSelector: defaultFareSelector,
    leg: leg,
    legDestination: formattedPlace(leg.to),
    LegIcon: LegIcon,
    legIndex: legIndex,
    RouteDescription: RouteDescription,
    RouteDescriptionFooter: RouteDescriptionFooter,
    setActiveLeg: setActiveLeg,
    setViewedTrip: setViewedTrip,
    showAgencyInfo: showAgencyInfo,
    showViewTripButton: showViewTripButton,
    timeZone: config.homeTimezone,
    TransitLegSubheader: TransitLegSubheader,
    TransitLegSummary: TransitLegSummary,
    transitOperator: coreUtils.route.getTransitOperatorFromLeg(leg, config.transitOperators)
  }) :
  /*#__PURE__*/

  /* This is an access (e.g. walk/bike/etc.) leg */
  React.createElement(AccessLegBody, {
    config: config,
    diagramVisible: diagramVisible,
    followsTransit: followsTransit,
    leg: leg,
    LegIcon: LegIcon,
    legIndex: legIndex,
    mapillaryCallback: mapillaryCallback,
    mapillaryKey: mapillaryKey,
    setActiveLeg: setActiveLeg,
    setLegDiagram: setLegDiagram,
    showElevationProfile: showElevationProfile,
    showLegIcon: showLegIcon,
    TransitLegSubheader: TransitLegSubheader
  }))), showMapButtonColumn && /*#__PURE__*/React.createElement(S.MapButtonColumn, {
    hideBorder: "true"
  }, /*#__PURE__*/React.createElement(S.MapButton, {
    "aria-label": viewOnMapMessage,
    onClick: function onClick() {
      return frameLeg({
        isDestination: isDestination,
        leg: leg,
        legIndex: legIndex,
        place: place
      });
    },
    title: viewOnMapMessage
  }, /*#__PURE__*/React.createElement(S.MapIcon, {
    title: viewOnMapMessage
  }))));
}
//# sourceMappingURL=place-row.js.map