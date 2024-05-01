"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LineColumnContent;

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _locationIcon = _interopRequireDefault(require("@opentripplanner/location-icon"));

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _RouteBadge = _interopRequireDefault(require("../RouteBadge"));

var S = _interopRequireWildcard(require("../styled"));

var _util = require("../util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Gets the travel mode in the ambient language.
 */
function getTravelMode(modeId, intl) {
  switch (modeId) {
    case "BICYCLE":
      return intl.formatMessage({
        defaultMessage: _util.defaultMessages["otpUi.ItineraryBody.travelByMode.bike"],
        description: "Travel by bike",
        id: "otpUi.ItineraryBody.travelByMode.bike"
      });

    case "CAR":
      return intl.formatMessage({
        defaultMessage: _util.defaultMessages["otpUi.ItineraryBody.travelByMode.car"],
        description: "Travel by car",
        id: "otpUi.ItineraryBody.travelByMode.car"
      });

    case "MICROMOBILITY":
    case "SCOOTER":
      return intl.formatMessage({
        defaultMessage: _util.defaultMessages["otpUi.ItineraryBody.travelByMode.escooter"],
        description: "Travel by e-scooter",
        id: "otpUi.ItineraryBody.travelByMode.escooter"
      });

    case "WALK":
      return intl.formatMessage({
        defaultMessage: _util.defaultMessages["otpUi.ItineraryBody.travelByMode.walk"],
        description: "Travel by walking",
        id: "otpUi.ItineraryBody.travelByMode.walk"
      });

    default:
      return modeId;
  }
}

function LineColumnContent({
  interline,
  isDestination,
  leg,
  LegIcon,
  toRouteAbbreviation
}) {
  const {
    mode,
    routeColor,
    transitLeg
  } = leg;
  const intl = (0, _reactIntl.useIntl)();
  const travelByMessage = intl.formatMessage({
    defaultMessage: _util.defaultMessages["otpUi.ItineraryBody.travelBy"],
    description: "Instructs to travel using a mode",
    id: "otpUi.ItineraryBody.travelBy"
  }, {
    mode: getTravelMode(mode, intl)
  });
  const routeShortName = (0, _itinerary.getLegRouteShortName)(leg);
  return /*#__PURE__*/_react.default.createElement(S.LegLine, null, !isDestination && /*#__PURE__*/_react.default.createElement(S.InnerLine, {
    mode: mode,
    routeColor: routeColor
  }), /*#__PURE__*/_react.default.createElement(S.LineBadgeContainer, null, !interline && !isDestination && transitLeg && /*#__PURE__*/_react.default.createElement(_RouteBadge.default, {
    abbreviation: toRouteAbbreviation(parseInt(routeShortName, 10) || routeShortName),
    color: routeColor,
    name: (0, _itinerary.getLegRouteLongName)(leg) || ""
  }), !interline && !isDestination && !transitLeg && /*#__PURE__*/_react.default.createElement(S.AccessBadge, {
    "aria-label": travelByMessage,
    mode: mode,
    routeColor: routeColor
  }, /*#__PURE__*/_react.default.createElement(LegIcon, {
    leg: leg,
    title: travelByMessage,
    width: "66%"
  })), isDestination && /*#__PURE__*/_react.default.createElement(S.Destination, null, /*#__PURE__*/_react.default.createElement(_locationIcon.default, {
    size: 25,
    type: "to"
  }))));
}
//# sourceMappingURL=line-column-content.js.map