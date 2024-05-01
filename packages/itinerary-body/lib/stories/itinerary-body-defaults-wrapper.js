"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icons = require("@opentripplanner/icons");

var _react = _interopRequireWildcard(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _ = _interopRequireDefault(require(".."));

var _lineColumnContent = _interopRequireDefault(require("../defaults/line-column-content"));

var _placeName = _interopRequireDefault(require("../defaults/place-name"));

var _routeDescription = _interopRequireDefault(require("../defaults/route-description"));

var _routeDescriptionFooter = require("./route-description-footer");

var _transitLegSummary = _interopRequireDefault(require("../defaults/transit-leg-summary"));

var _demos = require("../demos");

var _itineraryBody = _interopRequireDefault(require("../otp-react-redux/itinerary-body"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for the icons package.
const config = require("../__mocks__/config.json");

class ItineraryBodyDefaultsWrapper extends _react.Component {
  constructor(props) {
    super(props);

    this.setLegDiagram = leg => {
      this.setState({
        diagramVisible: leg
      });
    };

    this.state = {
      diagramVisible: null
    };
  }

  render() {
    const {
      alwaysCollapseAlerts,
      defaultFareSelector,
      hideDrivingDirections = false,
      itinerary,
      LegIcon = _icons.TriMetLegIcon,
      LineColumnContent,
      PlaceName,
      RouteDescription,
      RouteDescriptionFooter = undefined,
      showAgencyInfo,
      showLegIcon,
      showMapButtonColumn = true,
      showViewTripButton,
      styledItinerary,
      TimeColumnContent,
      toRouteAbbreviation = r => {
        var _r$toString;

        return r === null || r === void 0 ? void 0 : (_r$toString = r.toString()) === null || _r$toString === void 0 ? void 0 : _r$toString.substr(0, 2);
      },
      TransitLegSubheader,
      TransitLegSummary,
      AlertToggleIcon,
      AlertBodyIcon
    } = this.props;
    const {
      diagramVisible
    } = this.state;
    let ItineraryBodyComponent;

    switch (styledItinerary) {
      case "pink-legs":
        ItineraryBodyComponent = _demos.StyledItineraryBody;
        break;

      case "otp-rr":
        ItineraryBodyComponent = _itineraryBody.default;
        break;

      default:
        ItineraryBodyComponent = _.default;
    }

    config.itinerary = {
      hideDrivingDirections
    };
    return /*#__PURE__*/_react.default.createElement(ItineraryBodyComponent, {
      AlertBodyIcon: AlertBodyIcon,
      AlertToggleIcon: AlertToggleIcon,
      alwaysCollapseAlerts: alwaysCollapseAlerts,
      config: config,
      defaultFareSelector: defaultFareSelector,
      diagramVisible: diagramVisible,
      frameLeg: (0, _addonActions.action)("frameLeg"),
      itinerary: itinerary,
      LegIcon: LegIcon,
      LineColumnContent: LineColumnContent || _lineColumnContent.default,
      mapillaryKey: "fake key, but ok because the api response is also fake",
      PlaceName: PlaceName || _placeName.default,
      RouteDescription: RouteDescription || _routeDescription.default,
      RouteDescriptionFooter: RouteDescriptionFooter || _routeDescriptionFooter.DefaultRouteDescriptionFooter,
      routingType: "ITINERARY",
      setActiveLeg: (0, _addonActions.action)("setActiveLeg"),
      setLegDiagram: this.setLegDiagram,
      setViewedTrip: (0, _addonActions.action)("setViewedTrip"),
      showAgencyInfo: showAgencyInfo,
      showElevationProfile: true,
      showLegIcon: showLegIcon,
      showMapButtonColumn: showMapButtonColumn,
      showViewTripButton: showViewTripButton,
      TimeColumnContent: TimeColumnContent,
      toRouteAbbreviation: toRouteAbbreviation,
      TransitLegSubheader: TransitLegSubheader,
      TransitLegSummary: TransitLegSummary || _transitLegSummary.default
    });
  }

}

exports.default = ItineraryBodyDefaultsWrapper;
//# sourceMappingURL=itinerary-body-defaults-wrapper.js.map