"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TransitLegSummary;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var S = _interopRequireWildcard(require("../styled"));

var _util = require("../util");

var _duration = _interopRequireDefault(require("./duration"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * This is a clickable component that summarizes the leg (travel time, stops
 * passed). On click it will expand and show the list of intermediate stops.
 */
function TransitLegSummary({
  leg,
  onClick,
  stopsExpanded
}) {
  var _leg$intermediateStop;

  return /*#__PURE__*/_react.default.createElement(S.TransitLegSummary, {
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.TransitLegBody.rideDurationAndStops"],
    description: "Describes ride duration and number of stops",
    id: "otpUi.TransitLegBody.rideDurationAndStops",
    values: {
      duration: /*#__PURE__*/_react.default.createElement(_duration.default, {
        seconds: leg.duration
      }),
      numStops: (((_leg$intermediateStop = leg.intermediateStops) === null || _leg$intermediateStop === void 0 ? void 0 : _leg$intermediateStop.length) || 0) + 1
    }
  }), leg.intermediateStops && /*#__PURE__*/_react.default.createElement(S.CaretToggle, {
    expanded: stopsExpanded
  }), /*#__PURE__*/_react.default.createElement(S.InvisibleAdditionalDetails, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.TransitLegBody.expandDetails"],
    description: "Screen reader text to expand stops",
    id: "otpUi.TransitLegBody.expandDetails"
  })));
}
//# sourceMappingURL=transit-leg-summary.js.map