import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import coreUtils from "@opentripplanner/core-utils";
import React, { Component } from "react";
import AnimateHeight from "react-animate-height";
import { FormattedMessage, FormattedNumber, injectIntl } from "react-intl";
import { Duration } from "../defaults";
import * as S from "../styled";
import { defaultMessages } from "../util";
import AlertsBody from "./alerts-body";
import IntermediateStops from "./intermediate-stops";
import ViewTripButton from "./view-trip-button";
var maximumAlertCountToShowUncollapsed = 2;
/**
 * Helper function that assembles values for flex pickup/dropoff messages.
 */

function getFlexMessageValues(info) {
  var _info$contactInfo, _info$latestBookingTi, _info$contactInfo2;

  // There used to be a variable `hasLeadTime` here. This should be brought back
  // if the leadTime check is ever to be more than just checking the value of
  // daysPrior (which can be done within react-intl)
  var hasPhone = !!(info !== null && info !== void 0 && (_info$contactInfo = info.contactInfo) !== null && _info$contactInfo !== void 0 && _info$contactInfo.phoneNumber);
  var leadDays = info === null || info === void 0 ? void 0 : (_info$latestBookingTi = info.latestBookingTime) === null || _info$latestBookingTi === void 0 ? void 0 : _info$latestBookingTi.daysPrior;
  var phoneNumber = info === null || info === void 0 ? void 0 : (_info$contactInfo2 = info.contactInfo) === null || _info$contactInfo2 === void 0 ? void 0 : _info$contactInfo2.phoneNumber;
  return {
    action: hasPhone ? /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.ItineraryBody.flexCallNumber"],
      description: "For calling a phone number.",
      id: "otpUi.ItineraryBody.flexCallNumber",
      values: {
        phoneNumber: phoneNumber
      }
    }) : /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.ItineraryBody.flexCallAhead"],
      description: "For calling ahead.",
      id: "otpUi.ItineraryBody.flexCallAhead"
    }),
    advanceNotice: leadDays > 0 ? /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.ItineraryBody.flexAdvanceNotice"],
      description: "Advance notice for flex service.",
      id: "otpUi.ItineraryBody.flexAdvanceNotice",
      values: {
        leadDays: leadDays
      }
    }) : ""
  };
}

var TransitLegBody = /*#__PURE__*/function (_Component) {
  _inherits(TransitLegBody, _Component);

  var _super = _createSuper(TransitLegBody);

  function TransitLegBody(props) {
    var _this;

    _classCallCheck(this, TransitLegBody);

    _this = _super.call(this, props);

    _this.onToggleStopsClick = function () {
      var stopsExpanded = _this.state.stopsExpanded;

      _this.setState({
        stopsExpanded: !stopsExpanded
      });
    };

    _this.onToggleAlertsClick = function () {
      var alertsExpanded = _this.state.alertsExpanded;

      _this.setState({
        alertsExpanded: !alertsExpanded
      });
    };

    _this.onSummaryClick = function () {
      var _this$props = _this.props,
          leg = _this$props.leg,
          legIndex = _this$props.legIndex,
          setActiveLeg = _this$props.setActiveLeg;
      setActiveLeg(legIndex, leg);
    };

    _this.state = {
      alertsExpanded: false,
      stopsExpanded: false
    };
    return _this;
  }

  _createClass(TransitLegBody, [{
    key: "render",
    value: function render() {
      var _leg$alerts, _leg$from, _leg$from2, _leg$to, _leg$to2;

      var _this$props2 = this.props,
          AlertBodyIcon = _this$props2.AlertBodyIcon,
          _this$props2$AlertTog = _this$props2.AlertToggleIcon,
          AlertToggleIcon = _this$props2$AlertTog === void 0 ? S.DefaultAlertToggleIcon : _this$props2$AlertTog,
          alwaysCollapseAlerts = _this$props2.alwaysCollapseAlerts,
          defaultFareSelector = _this$props2.defaultFareSelector,
          intl = _this$props2.intl,
          leg = _this$props2.leg,
          legDestination = _this$props2.legDestination,
          LegIcon = _this$props2.LegIcon,
          RouteDescription = _this$props2.RouteDescription,
          RouteDescriptionFooter = _this$props2.RouteDescriptionFooter,
          setViewedTrip = _this$props2.setViewedTrip,
          showAgencyInfo = _this$props2.showAgencyInfo,
          showViewTripButton = _this$props2.showViewTripButton,
          timeZone = _this$props2.timeZone,
          TransitLegSubheader = _this$props2.TransitLegSubheader,
          TransitLegSummary = _this$props2.TransitLegSummary,
          transitOperator = _this$props2.transitOperator;
      var agencyBrandingUrl = leg.agencyBrandingUrl,
          agencyName = leg.agencyName,
          agencyUrl = leg.agencyUrl,
          alerts = leg.alerts;
      var _this$state = this.state,
          alertsExpanded = _this$state.alertsExpanded,
          stopsExpanded = _this$state.stopsExpanded;
      var isReservationRequired = coreUtils.itinerary.isReservationRequired(leg); // If the config contains an operator name, prefer that one over the
      // one provided by OTP

      var transitOperatorName = (transitOperator === null || transitOperator === void 0 ? void 0 : transitOperator.name) || agencyName; // If the config contains an operator with a logo URL, prefer that over the
      // one provided by OTP (which is derived from agency.txt#agency_branding_url)

      var logoUrl = transitOperator && transitOperator.logo ? transitOperator.logo : agencyBrandingUrl;
      var shouldCollapseDueToAlertCount = ((_leg$alerts = leg.alerts) === null || _leg$alerts === void 0 ? void 0 : _leg$alerts.length) > maximumAlertCountToShowUncollapsed; // The alerts expansion triangle is shown when `!shouldOnlyShowAlertsExpanded`.
      // `!leg.alerts` is needed here so the triangle isn't shown when there are 0 alerts.

      var shouldOnlyShowAlertsExpanded = !(shouldCollapseDueToAlertCount || alwaysCollapseAlerts) || !leg.alerts;
      var expandAlerts = alertsExpanded || shouldOnlyShowAlertsExpanded;
      var legCost = defaultFareSelector && coreUtils.itinerary.getLegCost(leg, defaultFareSelector.mediumId, defaultFareSelector.riderCategoryId);
      return /*#__PURE__*/React.createElement(React.Fragment, null, TransitLegSubheader && /*#__PURE__*/React.createElement(TransitLegSubheader, {
        leg: leg
      }), /*#__PURE__*/React.createElement(S.LegBody, null, /*#__PURE__*/React.createElement(S.LegClickable, null, /*#__PURE__*/React.createElement(S.LegDescription, null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(S.InvisibleAdditionalDetails, null, " - ", /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TransitLegBody.ride"],
        description: "Prompt to ride a transit vehicle.",
        id: "otpUi.TransitLegBody.ride"
      })), /*#__PURE__*/React.createElement(RouteDescription, {
        leg: leg,
        LegIcon: LegIcon,
        transitOperator: transitOperator
      }), /*#__PURE__*/React.createElement(S.InvisibleAdditionalDetails, null, " - ", /*#__PURE__*/React.createElement(FormattedMessage // TODO: Accommodate interline itineraries with "Stay on board" instructions.
      , {
        defaultMessage: defaultMessages["otpUi.TransitLegBody.disembarkAt"],
        description: "Prompt to exit a transit vehicle.",
        id: "otpUi.TransitLegBody.disembarkAt",
        values: {
          legDestination: legDestination
        }
      }))), /*#__PURE__*/React.createElement(S.LegClickableButton, {
        onClick: this.onSummaryClick
      }, /*#__PURE__*/React.createElement(S.InvisibleAdditionalDetails, null, /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TransitLegBody.zoomToLeg"],
        description: "Identifies behavior of button",
        id: "otpUi.TransitLegBody.zoomToLeg"
      }))))), RouteDescriptionFooter && /*#__PURE__*/React.createElement(RouteDescriptionFooter, {
        leg: leg
      }), /*#__PURE__*/React.createElement("div", {
        // Creates a group of leg details for screenreaders after the initial leg description.
        "aria-label": intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.TransitLegBody.legDetails"],
          description: "Identifies this section as trip leg details",
          id: "otpUi.TransitLegBody.legDetails"
        }),
        role: "group"
      }, showAgencyInfo && /*#__PURE__*/React.createElement(S.AgencyInfo, null, /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TransitLegBody.operatedBy"],
        description: "Tells which agency operates the service",
        id: "otpUi.TransitLegBody.operatedBy",
        values: {
          agencyLink: /*#__PURE__*/React.createElement("a", {
            "aria-label": intl.formatMessage({
              id: "otpUi.TransitLegBody.agencyExternalLink"
            }, {
              agencyName: agencyName
            }),
            href: agencyUrl || "#",
            rel: "noopener noreferrer",
            target: "_blank"
          }, transitOperatorName, logoUrl && /*#__PURE__*/React.createElement("img", {
            alt: "",
            src: logoUrl,
            height: 25
          }))
        }
      })), isReservationRequired && leg.pickupBookingInfo && /*#__PURE__*/React.createElement(S.CallAheadWarning, null, /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.ItineraryBody.flexPickupMessage"],
        description: "Instructions for booking and boarding the flex (on-demand) transit service.",
        id: "otpUi.ItineraryBody.flexPickupMessage",
        values: getFlexMessageValues(leg.pickupBookingInfo)
      })), (alerts === null || alerts === void 0 ? void 0 : alerts.length) > 0 && /*#__PURE__*/React.createElement(S.TransitAlertToggle, {
        onClick: this.onToggleAlertsClick
      }, /*#__PURE__*/React.createElement(AlertToggleIcon, null), " ", /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TransitLegBody.alertsHeader"],
        description: "Number of alerts header",
        id: "otpUi.TransitLegBody.alertsHeader",
        values: {
          alertCount: alerts.length
        }
      }), !shouldOnlyShowAlertsExpanded && /*#__PURE__*/React.createElement(S.CaretToggle, {
        expanded: alertsExpanded
      })), /*#__PURE__*/React.createElement(AnimateHeight, {
        duration: 500,
        height: expandAlerts ? "auto" : 0
      }, /*#__PURE__*/React.createElement(AlertsBody, {
        alerts: leg.alerts,
        AlertIcon: AlertBodyIcon,
        timeZone: timeZone
      })), leg.intermediateStops && leg.intermediateStops.length > 0 && /*#__PURE__*/React.createElement(S.TransitLegDetails, null, /*#__PURE__*/React.createElement(S.TransitLegDetailsHeader, null, /*#__PURE__*/React.createElement(TransitLegSummary, {
        leg: leg,
        onClick: this.onToggleStopsClick,
        stopsExpanded: stopsExpanded
      }), showViewTripButton && /*#__PURE__*/React.createElement(ViewTripButton, {
        fromIndex: (_leg$from = leg.from) === null || _leg$from === void 0 ? void 0 : _leg$from.stopIndex,
        fromStopId: leg === null || leg === void 0 ? void 0 : (_leg$from2 = leg.from) === null || _leg$from2 === void 0 ? void 0 : _leg$from2.stopId,
        setViewedTrip: setViewedTrip,
        toIndex: (_leg$to = leg.to) === null || _leg$to === void 0 ? void 0 : _leg$to.stopIndex,
        toStopId: leg === null || leg === void 0 ? void 0 : (_leg$to2 = leg.to) === null || _leg$to2 === void 0 ? void 0 : _leg$to2.stopId,
        tripId: leg.tripId
      })), /*#__PURE__*/React.createElement(AnimateHeight, {
        duration: 500,
        height: stopsExpanded ? "auto" : 0
      }, /*#__PURE__*/React.createElement(S.TransitLegExpandedBody, null, /*#__PURE__*/React.createElement(IntermediateStops, {
        stops: leg.intermediateStops
      }), (legCost === null || legCost === void 0 ? void 0 : legCost.price) && /*#__PURE__*/React.createElement(S.TransitLegFare, null, /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TransitLegBody.fare"],
        description: "Describes the fare for a leg",
        id: "otpUi.TransitLegBody.fare",
        values: {
          fare: /*#__PURE__*/React.createElement(FormattedNumber, {
            currency: legCost.price.currency.code,
            currencyDisplay: "narrowSymbol" // This isn't a "real" style prop
            // eslint-disable-next-line react/style-prop-object
            ,
            style: "currency",
            value: legCost.price.amount
          })
        }
      })))), leg.averageWait && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TransitLegBody.typicalWait"],
        description: "Describes the typical wait for a transit leg",
        id: "otpUi.TransitLegBody.typicalWait",
        values: {
          waitTime: /*#__PURE__*/React.createElement(Duration, {
            seconds: leg.averageWait
          })
        }
      }))))));
    }
  }]);

  return TransitLegBody;
}(Component);

export default injectIntl(TransitLegBody);
export { AlertsBody, IntermediateStops, ViewTripButton };
//# sourceMappingURL=index.js.map