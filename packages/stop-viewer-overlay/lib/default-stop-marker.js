"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DefaultStopMarker;

var _baseMap = require("@opentripplanner/base-map");

var _react = _interopRequireDefault(require("react"));

function DefaultStopMarker({
  // leafletPath, TODO Re-add the path settings?
  radius = 9,
  stop
}) {
  return /*#__PURE__*/_react.default.createElement(_baseMap.MarkerWithPopup, {
    key: stop.id,
    popupContents: /*#__PURE__*/_react.default.createElement("div", null, stop.name),
    position: [stop.lat, stop.lon]
  }, /*#__PURE__*/_react.default.createElement(_baseMap.Styled.LeafletStyleMarker, {
    color: "#00FFFF",
    size: radius * 2,
    stroke: radius / 3,
    strokeColor: "#333"
  }));
}
//# sourceMappingURL=default-stop-marker.js.map