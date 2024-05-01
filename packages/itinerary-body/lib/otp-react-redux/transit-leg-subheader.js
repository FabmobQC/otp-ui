"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TransitLegSubheader;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var S = _interopRequireWildcard(require("../styled"));

var _util = require("../util");

var _viewStopButton = _interopRequireDefault(require("./view-stop-button"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  getDisplayedStopId,
  isFlex
} = _coreUtils.default.itinerary;

function TransitLegSubheader({
  leg,
  onStopClick
}) {
  const {
    from
  } = leg;
  return /*#__PURE__*/_react.default.createElement(S.PlaceSubheader, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.TransitLegBody.stopId"],
    description: "Displays the stop ID",
    id: "otpUi.TransitLegBody.stopId",
    values: {
      stopId: getDisplayedStopId(from)
    }
  }), !isFlex(leg) && /*#__PURE__*/_react.default.createElement(_viewStopButton.default, {
    onStopClick: onStopClick,
    stop: from.stop
  }));
}
//# sourceMappingURL=transit-leg-subheader.js.map