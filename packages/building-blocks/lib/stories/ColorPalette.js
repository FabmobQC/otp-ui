"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _route = require("@opentripplanner/core-utils/lib/route");

const ColorBlock = _styledComponents.default.div.withConfig({
  displayName: "ColorPalette__ColorBlock",
  componentId: "sc-fil65c-0"
})(["align-items:center;background-color:", ";color:", ";text-shadow:", ";display:flex;font-family:Arial,Helvetica,sans-serif;height:40px;justify-content:space-between;margin:0;padding:10px;width:300px;&:first-of-type{border-radius:8px 8px 0 0;}&:last-of-type{border-radius:0 0 8px 8px;}"], props => props.hex, props => (0, _route.getMostReadableTextColor)(props.hex, "#ffffff"), props => (0, _route.getMostReadableTextColor)(props.hex, "#ffffff") === "#ffffff" ? "1px 1px 2px black" : "");

const ColorPalette = ({
  color
}) => {
  const colorArray = Object.entries(color);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, colorArray.map(hue => {
    return /*#__PURE__*/_react.default.createElement(ColorBlock, {
      key: hue[0],
      hex: hue[1]
    }, /*#__PURE__*/_react.default.createElement("p", null, hue[0]), /*#__PURE__*/_react.default.createElement("p", null, hue[1]));
  }));
};

var _default = ColorPalette;
exports.default = _default;
//# sourceMappingURL=ColorPalette.js.map