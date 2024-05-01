"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PlaceRow;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _timeColumnContent = _interopRequireDefault(require("../defaults/time-column-content"));

var _AccessLegBody = _interopRequireDefault(require("../AccessLegBody"));

var S = _interopRequireWildcard(require("../styled"));

var _TransitLegBody = _interopRequireDefault(require("../TransitLegBody"));

var _accessibilityRating = _interopRequireDefault(require("./accessibility-rating"));

var _util = require("../util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
  TODO: Wondering if it's possible for us to destructure the time
  preferences from the config object and avoid making the props list so long
*/
function PlaceRow({
  accessibilityScoreGradationMap,
  AlertBodyIcon,
  AlertToggleIcon,
  alwaysCollapseAlerts,
  config,
  defaultFareSelector,
  diagramVisible,
  followsTransit,
  frameLeg,
  isDestination,
  lastLeg,
  leg,
  LegIcon,
  legIndex,
  LineColumnContent,
  mapillaryCallback,
  mapillaryKey,
  PlaceName,
  RouteDescription,
  RouteDescriptionFooter,
  setActiveLeg,
  setLegDiagram,
  setViewedTrip,
  showAgencyInfo,
  showElevationProfile,
  showLegIcon,
  showMapButtonColumn,
  showViewTripButton,
  TimeColumnContent = _timeColumnContent.default,
  toRouteAbbreviation,
  TransitLegSubheader,
  TransitLegSummary
}) {
  // NOTE: Previously there was a check for itineraries that changed vehicles
  // at a single stop, which would render the stop place the same as the
  // interline stop. However, this prevents the user from being able to click
  // on the stop viewer in this case, which they may want to do in order to
  // check the real-time arrival information for the next leg of their journey.
  const interline = !!(!isDestination && leg.interlineWithPreviousLeg); // const hideBorder = interline || !legIndex;

  const place = isDestination ? { ...leg.to
  } : { ...leg.from
  }; // OTP2 marks both bikes and scooters as BIKESHARE in the vertextype
  // To get the right label, we need to fix scooters to be "VEHICLERENTAL"

  place.vertexType = leg.mode === "SCOOTER" && !isDestination ? "VEHICLERENTAL" : place.vertexType;
  const intl = (0, _reactIntl.useIntl)();
  const viewOnMapMessage = intl.formatMessage({
    defaultMessage: _util.defaultMessages["otpUi.ItineraryBody.viewOnMap"],
    description: "Text describing the view-on-map button",
    id: "otpUi.ItineraryBody.viewOnMap"
  });

  const formattedPlace = direction => /*#__PURE__*/_react.default.createElement(PlaceName, {
    config: config,
    interline: interline,
    place: direction
  });

  return /*#__PURE__*/_react.default.createElement(S.PlaceRowWrapper, {
    key: legIndex || "destination-place"
  }, /*#__PURE__*/_react.default.createElement(S.LineColumn, null, /*#__PURE__*/_react.default.createElement(LineColumnContent, {
    interline: interline,
    isDestination: isDestination,
    lastLeg: lastLeg,
    leg: leg,
    LegIcon: LegIcon,
    legIndex: legIndex,
    toRouteAbbreviation: toRouteAbbreviation
  })), /*#__PURE__*/_react.default.createElement(S.PlaceHeader, null, interline && /*#__PURE__*/_react.default.createElement(S.InterlineDot, null, "\u2022"), /*#__PURE__*/_react.default.createElement(S.PlaceName, {
    "aria-hidden": true
  }, /*#__PURE__*/_react.default.createElement(PlaceName, {
    config: config,
    interline: interline,
    place: place
  }))), /*#__PURE__*/_react.default.createElement(S.TimeColumn, null, /*#__PURE__*/_react.default.createElement(TimeColumnContent, {
    isDestination: isDestination,
    leg: leg
  }), !isDestination && leg.accessibilityScore &&
  /*#__PURE__*/
  // TODO: Reorder markup so accessibility info doesn't fall between time and destination.
  _react.default.createElement(_accessibilityRating.default, {
    gradationMap: accessibilityScoreGradationMap,
    isLeg: true,
    score: leg.accessibilityScore
  })), /*#__PURE__*/_react.default.createElement(S.InvisibleAdditionalDetails, null, !isDestination ? /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    description: "Add starting location for access legs",
    id: "otpUi.TransitLegBody.fromLocation",
    values: {
      location: formattedPlace(leg.from)
    }
  }) : /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    id: "otpUi.TransitLegBody.arriveAt",
    defaultMessage: _util.defaultMessages["otpUi.TransitLegBody.arriveAt"],
    description: "Identifies end of the trip to screenreaders",
    values: {
      place: formattedPlace(leg.to)
    }
  })), /*#__PURE__*/_react.default.createElement(S.PlaceDetails, null, !isDestination && (leg.transitLeg ?
  /*#__PURE__*/

  /* This is a transit leg */
  _react.default.createElement(_TransitLegBody.default, {
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
    transitOperator: _coreUtils.default.route.getTransitOperatorFromLeg(leg, config.transitOperators)
  }) :
  /*#__PURE__*/

  /* This is an access (e.g. walk/bike/etc.) leg */
  _react.default.createElement(_AccessLegBody.default, {
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
  }))), showMapButtonColumn && /*#__PURE__*/_react.default.createElement(S.MapButtonColumn, {
    hideBorder: "true"
  }, /*#__PURE__*/_react.default.createElement(S.MapButton, {
    "aria-label": viewOnMapMessage,
    onClick: () => frameLeg({
      isDestination,
      leg,
      legIndex,
      place
    }),
    title: viewOnMapMessage
  }, /*#__PURE__*/_react.default.createElement(S.MapIcon, {
    title: viewOnMapMessage
  }))));
}
//# sourceMappingURL=place-row.js.map