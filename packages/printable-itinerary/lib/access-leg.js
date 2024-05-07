"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AccessLeg;

var _react = _interopRequireDefault(require("react"));

var _accessibilityAnnotation = _interopRequireDefault(require("./accessibility-annotation"));

var S = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function AccessLeg({
  accessibilityScoreGradationMap,
  config,
  leg,
  LegIcon
}) {
  return /*#__PURE__*/_react.default.createElement(S.Leg, null, /*#__PURE__*/_react.default.createElement(_accessibilityAnnotation.default, {
    accessibilityScoreGradationMap: accessibilityScoreGradationMap,
    grayscale: true,
    leg: leg,
    LegIcon: LegIcon
  }), /*#__PURE__*/_react.default.createElement(S.LegBody, null, /*#__PURE__*/_react.default.createElement(S.AccessLegDescription, {
    config: config,
    leg: leg
  }), !leg.rideHailingEstimate && /*#__PURE__*/_react.default.createElement(S.LegDetails, null, leg.steps.map((step, k) => /*#__PURE__*/_react.default.createElement(S.LegDetail, {
    key: k
  }, /*#__PURE__*/_react.default.createElement(S.AccessLegStep, {
    step: step
  }))))));
}
//# sourceMappingURL=access-leg.js.map