"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

const StyledParkAndRideIcon = _styledComponents.default.div.withConfig({
  displayName: "park-and-ride-marker__StyledParkAndRideIcon",
  componentId: "sc-3bjx94-0"
})(["background:#000;border-radius:17px;color:#fff;font-size:16px;font-weight:bold;height:12px;line-height:0px;padding-left:7px;padding-top:12px;width:17px;"]);

const ParkAndRideMarker = () => /*#__PURE__*/_react.default.createElement(StyledParkAndRideIcon, null, "P");

var _default = ParkAndRideMarker;
exports.default = _default;
//# sourceMappingURL=park-and-ride-marker.js.map