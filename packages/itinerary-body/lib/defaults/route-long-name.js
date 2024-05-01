"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RouteLongName;

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _stringSimilarity = require("string-similarity");

var S = _interopRequireWildcard(require("../styled"));

var _util = require("../util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Helper function to format the "to" separator.
 */
function toPrefix(contents) {
  return /*#__PURE__*/_react.default.createElement(S.LegDescriptionHeadsignPrefix, null, contents);
}

function RouteLongName({
  className,
  leg,
  style
}) {
  const {
    headsign: otp1Headsign,
    trip
  } = leg;
  const headsign = (trip === null || trip === void 0 ? void 0 : trip.tripHeadsign) || otp1Headsign;
  const routeLongName = (0, _itinerary.getLegRouteLongName)(leg); // Hide route long name if it contains similar information to the headsign

  const hideRouteLongName = (0, _stringSimilarity.compareTwoStrings)(headsign || "", routeLongName || "") > 0.25 || !routeLongName;
  return /*#__PURE__*/_react.default.createElement("span", {
    className: className,
    style: style
  }, !hideRouteLongName && headsign ? /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.TransitLegBody.routeDescription"],
    description: "Displays the route name and destination",
    id: "otpUi.TransitLegBody.routeDescription",
    values: {
      headsign,
      routeName: routeLongName,
      toPrefix
    }
  }) : headsign || routeLongName);
}
//# sourceMappingURL=route-long-name.js.map