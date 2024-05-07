"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Styled = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _accessLeg = _interopRequireDefault(require("./access-leg"));

var S = _interopRequireWildcard(require("./styled"));

exports.Styled = S;

var _tncLeg = _interopRequireDefault(require("./tnc-leg"));

var _transitLeg = _interopRequireDefault(require("./transit-leg"));

var _util = require("./util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function PrintableItinerary({
  className,
  config,
  itinerary,
  LegIcon
}) {
  return /*#__PURE__*/_react.default.createElement(S.PrintableItinerary, {
    className: className
  }, itinerary.legs.length > 0 && /*#__PURE__*/_react.default.createElement(S.CollapsedTop, null, /*#__PURE__*/_react.default.createElement(S.LegBody, null, /*#__PURE__*/_react.default.createElement(S.LegHeader, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.PrintableItinerary.depart"],
    description: "Indicates where to depart from",
    id: "otpUi.PrintableItinerary.depart",
    values: {
      place: itinerary.legs[0].from.name,
      strong: _util.strongText
    }
  })))), itinerary.legs.map((leg, k) => leg.transitLeg ? /*#__PURE__*/_react.default.createElement(_transitLeg.default, {
    interlineFollows: k < itinerary.legs.length - 1 && itinerary.legs[k + 1].interlineWithPreviousLeg,
    key: k,
    leg: leg,
    LegIcon: LegIcon
  }) : leg.rideHailingEstimate ? /*#__PURE__*/_react.default.createElement(_tncLeg.default, {
    leg: leg,
    LegIcon: LegIcon,
    key: k
  }) : /*#__PURE__*/_react.default.createElement(_accessLeg.default, {
    config: config,
    key: k,
    leg: leg,
    LegIcon: LegIcon
  })));
}

var _default = PrintableItinerary; // Rename styled components for export.

exports.default = _default;
//# sourceMappingURL=index.js.map