"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AccessibilityAnnotation;

var _itineraryBody = require("@opentripplanner/itinerary-body");

var _react = _interopRequireDefault(require("react"));

var S = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function AccessibilityAnnotation({
  accessibilityScoreGradationMap,
  grayscale,
  leg,
  LegIcon
}) {
  return /*#__PURE__*/_react.default.createElement(S.LegAnnotation, null, /*#__PURE__*/_react.default.createElement(S.ModeIcon, null, /*#__PURE__*/_react.default.createElement(LegIcon, {
    leg: leg
  })), leg.accessibilityScore && /*#__PURE__*/_react.default.createElement(_itineraryBody.AccessibilityRating, {
    gradationMap: accessibilityScoreGradationMap,
    grayscale: grayscale,
    score: leg.accessibilityScore
  }));
}
//# sourceMappingURL=accessibility-annotation.js.map