import React from "react";
import AccessibilityRating from "./accessibility-rating";
import PlaceRow from "./place-row";
import * as S from "../styled";

function noop() {}

function defaultRouteAbbr(arg) {
  return arg.toString();
}

var ItineraryBody = function ItineraryBody(_ref) {
  var accessibilityScoreGradationMap = _ref.accessibilityScoreGradationMap,
      AlertBodyIcon = _ref.AlertBodyIcon,
      AlertToggleIcon = _ref.AlertToggleIcon,
      _ref$alwaysCollapseAl = _ref.alwaysCollapseAlerts,
      alwaysCollapseAlerts = _ref$alwaysCollapseAl === void 0 ? false : _ref$alwaysCollapseAl,
      className = _ref.className,
      config = _ref.config,
      defaultFareSelector = _ref.defaultFareSelector,
      diagramVisible = _ref.diagramVisible,
      _ref$frameLeg = _ref.frameLeg,
      frameLeg = _ref$frameLeg === void 0 ? noop : _ref$frameLeg,
      itinerary = _ref.itinerary,
      LegIcon = _ref.LegIcon,
      LineColumnContent = _ref.LineColumnContent,
      mapillaryCallback = _ref.mapillaryCallback,
      mapillaryKey = _ref.mapillaryKey,
      PlaceName = _ref.PlaceName,
      RouteDescription = _ref.RouteDescription,
      RouteDescriptionFooter = _ref.RouteDescriptionFooter,
      _ref$routingType = _ref.routingType,
      routingType = _ref$routingType === void 0 ? "ITINERARY" : _ref$routingType,
      setActiveLeg = _ref.setActiveLeg,
      setLegDiagram = _ref.setLegDiagram,
      setViewedTrip = _ref.setViewedTrip,
      showAgencyInfo = _ref.showAgencyInfo,
      showElevationProfile = _ref.showElevationProfile,
      showLegIcon = _ref.showLegIcon,
      _ref$showMapButtonCol = _ref.showMapButtonColumn,
      showMapButtonColumn = _ref$showMapButtonCol === void 0 ? true : _ref$showMapButtonCol,
      showViewTripButton = _ref.showViewTripButton,
      TimeColumnContent = _ref.TimeColumnContent,
      _ref$toRouteAbbreviat = _ref.toRouteAbbreviation,
      toRouteAbbreviation = _ref$toRouteAbbreviat === void 0 ? defaultRouteAbbr : _ref$toRouteAbbreviat,
      TransitLegSubheader = _ref.TransitLegSubheader,
      TransitLegSummary = _ref.TransitLegSummary;

  /*
    TODO: replace component should update logic? companies is simply used to
    trigger a rerender of this component itinerary is also another criteria
    that is used to trigger a rerender but has more reuse than companies here
  */
  var rows = [];
  var followsTransit = false;
  var lastLeg;
  itinerary.legs.forEach(function (leg, i) {
    function createPlaceRow(isDestination) {
      // Create a row containing this leg's start place and leg traversal details
      rows.push( /*#__PURE__*/React.createElement(PlaceRow, {
        accessibilityScoreGradationMap: accessibilityScoreGradationMap,
        AlertToggleIcon: AlertToggleIcon,
        AlertBodyIcon: AlertBodyIcon,
        alwaysCollapseAlerts: alwaysCollapseAlerts // eslint-disable-next-line react/no-array-index-key
        ,
        key: i + (isDestination ? 1 : 0),
        config: config,
        defaultFareSelector: defaultFareSelector,
        diagramVisible: diagramVisible,
        followsTransit: followsTransit,
        frameLeg: frameLeg,
        isDestination: isDestination,
        lastLeg: lastLeg,
        leg: leg,
        LegIcon: LegIcon,
        legIndex: i,
        LineColumnContent: LineColumnContent,
        mapillaryCallback: mapillaryCallback,
        mapillaryKey: mapillaryKey,
        PlaceName: PlaceName,
        RouteDescription: RouteDescription,
        RouteDescriptionFooter: RouteDescriptionFooter,
        routingType: routingType,
        setActiveLeg: setActiveLeg,
        setLegDiagram: setLegDiagram,
        setViewedTrip: setViewedTrip,
        showAgencyInfo: showAgencyInfo,
        showElevationProfile: showElevationProfile,
        showLegIcon: showLegIcon,
        showMapButtonColumn: showMapButtonColumn,
        showViewTripButton: showViewTripButton,
        TimeColumnContent: TimeColumnContent,
        toRouteAbbreviation: toRouteAbbreviation,
        TransitLegSubheader: TransitLegSubheader,
        TransitLegSummary: TransitLegSummary
      }));
    }

    createPlaceRow(false); // If this is the last leg, create a special PlaceRow for the destination only.

    if (i === itinerary.legs.length - 1) {
      createPlaceRow(true);
    }

    if (leg.transitLeg) followsTransit = true;
    lastLeg = leg;
  });
  return /*#__PURE__*/React.createElement(S.ItineraryBody, {
    className: className
  }, "TEST", rows);
};

export default ItineraryBody;
export { AccessibilityRating };
//# sourceMappingURL=index.js.map