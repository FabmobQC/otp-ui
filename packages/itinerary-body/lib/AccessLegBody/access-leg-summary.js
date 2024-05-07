"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AccessLegSummary;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _defaults = require("../defaults");

var _util = require("../util");

var S = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function AccessLegSummary({
  config,
  leg,
  LegIcon,
  onSummaryClick,
  showLegIcon
}) {
  return /*#__PURE__*/_react.default.createElement(S.LegClickable, null, /*#__PURE__*/_react.default.createElement(S.LegDescription, null, /*#__PURE__*/_react.default.createElement(S.LegIconAndRouteShortName, null, showLegIcon && /*#__PURE__*/_react.default.createElement(S.LegIconContainer, null, /*#__PURE__*/_react.default.createElement(LegIcon, {
    leg: leg
  }))), /*#__PURE__*/_react.default.createElement(S.InvisibleAdditionalDetails, null, " - "), /*#__PURE__*/_react.default.createElement(_defaults.AccessLegDescription, {
    config: config,
    leg: leg
  }), /*#__PURE__*/_react.default.createElement(S.LegClickableButton, {
    onClick: onSummaryClick
  }, /*#__PURE__*/_react.default.createElement(S.InvisibleAdditionalDetails, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.TransitLegBody.zoomToLeg"],
    description: "Identifies behavior of button",
    id: "otpUi.TransitLegBody.zoomToLeg"
  })))));
}
//# sourceMappingURL=access-leg-summary.js.map