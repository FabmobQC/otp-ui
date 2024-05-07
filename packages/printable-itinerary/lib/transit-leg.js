"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TransitLeg;

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _itineraryBody = require("@opentripplanner/itinerary-body");

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _accessibilityAnnotation = _interopRequireDefault(require("./accessibility-annotation"));

var S = _interopRequireWildcard(require("./styled"));

var _util = require("./util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function TransitLeg({
  accessibilityScoreGradationMap,
  leg,
  LegIcon,
  interlineFollows
}) {
  const stopIdFrom = (0, _itinerary.getDisplayedStopId)(leg.from);
  const stopIdTo = (0, _itinerary.getDisplayedStopId)(leg.to); // TODO: core-utils needs some larger-scale type fixes
  // null is an object, so we need to redefine it as undefined to prevent
  // it from being read as an object. The long term solution is to avoid
  // using type checks for this purpose

  if (leg.route === null) leg.route = undefined;

  const routeDescription = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("strong", null, (0, _itinerary.getLegRouteShortName)(leg)), " ", /*#__PURE__*/_react.default.createElement(S.RouteLongName, {
    leg: leg
  }));

  const alightMessage = /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.PrintableItinerary.TransitLeg.alight"],
    description: "Instructs to alight/exit a transit vehicle",
    id: "otpUi.PrintableItinerary.TransitLeg.alight",
    values: {
      place: leg.to.name,
      stopId: stopIdTo,
      strong: _util.strongText,
      time: leg.endTime
    }
  }); // Handle case of transit leg interlined w/ previous


  if (leg.interlineWithPreviousLeg) {
    return /*#__PURE__*/_react.default.createElement(S.CollapsedTop, null, /*#__PURE__*/_react.default.createElement(S.LegBody, null, /*#__PURE__*/_react.default.createElement(S.LegHeader, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: _util.defaultMessages["otpUi.PrintableItinerary.TransitLeg.continuesAs"],
      description: "Informs of an interlined transit route",
      id: "otpUi.PrintableItinerary.TransitLeg.continuesAs",
      values: {
        routeDescription
      }
    })), /*#__PURE__*/_react.default.createElement(S.LegDetails, null, /*#__PURE__*/_react.default.createElement(S.LegDetail, null, alightMessage))));
  }

  return /*#__PURE__*/_react.default.createElement(S.Leg, null, /*#__PURE__*/_react.default.createElement(_accessibilityAnnotation.default, {
    accessibilityScoreGradationMap: accessibilityScoreGradationMap,
    grayscale: true,
    leg: leg,
    LegIcon: LegIcon
  }), /*#__PURE__*/_react.default.createElement(S.LegBody, null, /*#__PURE__*/_react.default.createElement(S.LegHeader, null, routeDescription), /*#__PURE__*/_react.default.createElement(S.LegDetails, null, /*#__PURE__*/_react.default.createElement(S.LegDetail, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.PrintableItinerary.TransitLeg.board"],
    description: "Instructs to board a transit vehicle",
    id: "otpUi.PrintableItinerary.TransitLeg.board",
    values: {
      place: leg.from.name,
      stopId: stopIdFrom,
      strong: _util.strongText,
      time: leg.startTime
    }
  })), /*#__PURE__*/_react.default.createElement(S.LegDetail, null, interlineFollows ? /*#__PURE__*/_react.default.createElement(_itineraryBody.Defaults.StayOnBoard, {
    place: leg.to
  }) : alightMessage))));
}
//# sourceMappingURL=transit-leg.js.map