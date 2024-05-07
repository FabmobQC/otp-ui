"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ModeIconRenderer;

var _react = _interopRequireDefault(require("react"));

var _iconRenderer = _interopRequireDefault(require("../icon-renderer"));

const exampleModes = ["BICYCLE", "BICYCLE_RENT", "BUS", "CAR", "CAR_PARK", "FERRY", "GONDOLA", "MICROMOBILITY", "MICROMOBILITY_RENT", "SCOOTER", "RAIL", "STREETCAR", "SUBWAY", "TRAM", "TRANSIT", "WALK", "NONE_OF_THE_ABOVE"];

function ModeIconRenderer({
  component: Component
}) {
  return /*#__PURE__*/_react.default.createElement(_iconRenderer.default, {
    examples: exampleModes,
    renderComponentFn: example => /*#__PURE__*/_react.default.createElement(Component, {
      mode: example
    }),
    typeTitle: "Mode Type"
  });
}
//# sourceMappingURL=mode-icon-renderer.js.map