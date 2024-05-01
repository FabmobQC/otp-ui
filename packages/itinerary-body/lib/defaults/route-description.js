"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RouteDescription;

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _react = _interopRequireDefault(require("react"));

var S = _interopRequireWildcard(require("../styled"));

var _routeLongName = _interopRequireDefault(require("./route-long-name"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function RouteDescription({
  leg
}) {
  const routeShortName = (0, _itinerary.getLegRouteShortName)(leg);
  return /*#__PURE__*/_react.default.createElement(S.LegDescriptionForTransit, null, routeShortName && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(S.LegDescriptionRouteShortName, null, routeShortName)), /*#__PURE__*/_react.default.createElement(S.LegDescriptionRouteLongName, null, /*#__PURE__*/_react.default.createElement(_routeLongName.default, {
    leg: leg
  })));
}
//# sourceMappingURL=route-description.js.map