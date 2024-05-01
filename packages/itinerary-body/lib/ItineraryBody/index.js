"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AccessibilityRating", {
  enumerable: true,
  get: function () {
    return _accessibilityRating.default;
  }
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _accessibilityRating = _interopRequireDefault(require("./accessibility-rating"));

var _placeRow = _interopRequireDefault(require("./place-row"));

var S = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function noop() {}

function defaultRouteAbbr(arg) {
  return arg.toString();
}

const ItineraryBody = ({
  accessibilityScoreGradationMap,
  AlertBodyIcon,
  AlertToggleIcon,
  alwaysCollapseAlerts = false,
  className,
  config,
  defaultFareSelector,
  diagramVisible,
  frameLeg = noop,
  itinerary,
  LegIcon,
  LineColumnContent,
  mapillaryCallback,
  mapillaryKey,
  PlaceName,
  RouteDescription,
  RouteDescriptionFooter,
  routingType = "ITINERARY",
  setActiveLeg,
  setLegDiagram,
  setViewedTrip,
  showAgencyInfo,
  showElevationProfile,
  showLegIcon,
  showMapButtonColumn = true,
  showViewTripButton,
  TimeColumnContent,
  toRouteAbbreviation = defaultRouteAbbr,
  TransitLegSubheader,
  TransitLegSummary
}) => {
  /*
    TODO: replace component should update logic? companies is simply used to
    trigger a rerender of this component itinerary is also another criteria
    that is used to trigger a rerender but has more reuse than companies here
  */
  const rows = [];
  let followsTransit = false;
  let lastLeg;
  itinerary.legs.forEach((leg, i) => {
    function createPlaceRow(isDestination) {
      // Create a row containing this leg's start place and leg traversal details
      rows.push( /*#__PURE__*/_react.default.createElement(_placeRow.default, {
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
  return /*#__PURE__*/_react.default.createElement(S.ItineraryBody, {
    className: className
  }, "TEST", rows);
};

var _default = ItineraryBody;
exports.default = _default;
//# sourceMappingURL=index.js.map