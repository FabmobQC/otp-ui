import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for the icons package.
import { TriMetLegIcon } from "@opentripplanner/icons";
import React, { Component } from "react";
import { action } from "@storybook/addon-actions";
import ItineraryBody from "..";
import DefaultLineColumnContent from "../defaults/line-column-content";
import DefaultPlaceName from "../defaults/place-name";
import DefaultRouteDescription from "../defaults/route-description";
import { DefaultRouteDescriptionFooter } from "./route-description-footer";
import DefaultTransitLegSummary from "../defaults/transit-leg-summary";
import { StyledItineraryBody } from "../demos";
import OtpRRStyledItineraryBody from "../otp-react-redux/itinerary-body";

var config = require("../__mocks__/config.json");

var ItineraryBodyDefaultsWrapper = /*#__PURE__*/function (_Component) {
  _inherits(ItineraryBodyDefaultsWrapper, _Component);

  var _super = _createSuper(ItineraryBodyDefaultsWrapper);

  function ItineraryBodyDefaultsWrapper(props) {
    var _this;

    _classCallCheck(this, ItineraryBodyDefaultsWrapper);

    _this = _super.call(this, props);

    _this.setLegDiagram = function (leg) {
      _this.setState({
        diagramVisible: leg
      });
    };

    _this.state = {
      diagramVisible: null
    };
    return _this;
  }

  _createClass(ItineraryBodyDefaultsWrapper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          alwaysCollapseAlerts = _this$props.alwaysCollapseAlerts,
          defaultFareSelector = _this$props.defaultFareSelector,
          _this$props$hideDrivi = _this$props.hideDrivingDirections,
          hideDrivingDirections = _this$props$hideDrivi === void 0 ? false : _this$props$hideDrivi,
          itinerary = _this$props.itinerary,
          _this$props$LegIcon = _this$props.LegIcon,
          LegIcon = _this$props$LegIcon === void 0 ? TriMetLegIcon : _this$props$LegIcon,
          LineColumnContent = _this$props.LineColumnContent,
          PlaceName = _this$props.PlaceName,
          RouteDescription = _this$props.RouteDescription,
          _this$props$RouteDesc = _this$props.RouteDescriptionFooter,
          RouteDescriptionFooter = _this$props$RouteDesc === void 0 ? undefined : _this$props$RouteDesc,
          showAgencyInfo = _this$props.showAgencyInfo,
          showLegIcon = _this$props.showLegIcon,
          _this$props$showMapBu = _this$props.showMapButtonColumn,
          showMapButtonColumn = _this$props$showMapBu === void 0 ? true : _this$props$showMapBu,
          showViewTripButton = _this$props.showViewTripButton,
          styledItinerary = _this$props.styledItinerary,
          TimeColumnContent = _this$props.TimeColumnContent,
          _this$props$toRouteAb = _this$props.toRouteAbbreviation,
          toRouteAbbreviation = _this$props$toRouteAb === void 0 ? function (r) {
        var _r$toString;

        return r === null || r === void 0 ? void 0 : (_r$toString = r.toString()) === null || _r$toString === void 0 ? void 0 : _r$toString.substr(0, 2);
      } : _this$props$toRouteAb,
          TransitLegSubheader = _this$props.TransitLegSubheader,
          TransitLegSummary = _this$props.TransitLegSummary,
          AlertToggleIcon = _this$props.AlertToggleIcon,
          AlertBodyIcon = _this$props.AlertBodyIcon;
      var diagramVisible = this.state.diagramVisible;
      var ItineraryBodyComponent;

      switch (styledItinerary) {
        case "pink-legs":
          ItineraryBodyComponent = StyledItineraryBody;
          break;

        case "otp-rr":
          ItineraryBodyComponent = OtpRRStyledItineraryBody;
          break;

        default:
          ItineraryBodyComponent = ItineraryBody;
      }

      config.itinerary = {
        hideDrivingDirections: hideDrivingDirections
      };
      return /*#__PURE__*/React.createElement(ItineraryBodyComponent, {
        AlertBodyIcon: AlertBodyIcon,
        AlertToggleIcon: AlertToggleIcon,
        alwaysCollapseAlerts: alwaysCollapseAlerts,
        config: config,
        defaultFareSelector: defaultFareSelector,
        diagramVisible: diagramVisible,
        frameLeg: action("frameLeg"),
        itinerary: itinerary,
        LegIcon: LegIcon,
        LineColumnContent: LineColumnContent || DefaultLineColumnContent,
        mapillaryKey: "fake key, but ok because the api response is also fake",
        PlaceName: PlaceName || DefaultPlaceName,
        RouteDescription: RouteDescription || DefaultRouteDescription,
        RouteDescriptionFooter: RouteDescriptionFooter || DefaultRouteDescriptionFooter,
        routingType: "ITINERARY",
        setActiveLeg: action("setActiveLeg"),
        setLegDiagram: this.setLegDiagram,
        setViewedTrip: action("setViewedTrip"),
        showAgencyInfo: showAgencyInfo,
        showElevationProfile: true,
        showLegIcon: showLegIcon,
        showMapButtonColumn: showMapButtonColumn,
        showViewTripButton: showViewTripButton,
        TimeColumnContent: TimeColumnContent,
        toRouteAbbreviation: toRouteAbbreviation,
        TransitLegSubheader: TransitLegSubheader,
        TransitLegSummary: TransitLegSummary || DefaultTransitLegSummary
      });
    }
  }]);

  return ItineraryBodyDefaultsWrapper;
}(Component);

export { ItineraryBodyDefaultsWrapper as default };
//# sourceMappingURL=itinerary-body-defaults-wrapper.js.map