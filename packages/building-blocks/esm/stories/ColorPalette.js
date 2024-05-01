import React from "react";
import styled from "styled-components";
import { getMostReadableTextColor } from "@opentripplanner/core-utils/lib/route";
var ColorBlock = styled.div.withConfig({
  displayName: "ColorPalette__ColorBlock",
  componentId: "sc-fil65c-0"
})(["align-items:center;background-color:", ";color:", ";text-shadow:", ";display:flex;font-family:Arial,Helvetica,sans-serif;height:40px;justify-content:space-between;margin:0;padding:10px;width:300px;&:first-of-type{border-radius:8px 8px 0 0;}&:last-of-type{border-radius:0 0 8px 8px;}"], function (props) {
  return props.hex;
}, function (props) {
  return getMostReadableTextColor(props.hex, "#ffffff");
}, function (props) {
  return getMostReadableTextColor(props.hex, "#ffffff") === "#ffffff" ? "1px 1px 2px black" : "";
});

var ColorPalette = function ColorPalette(_ref) {
  var color = _ref.color;
  var colorArray = Object.entries(color);
  return /*#__PURE__*/React.createElement(React.Fragment, null, colorArray.map(function (hue) {
    return /*#__PURE__*/React.createElement(ColorBlock, {
      key: hue[0],
      hex: hue[1]
    }, /*#__PURE__*/React.createElement("p", null, hue[0]), /*#__PURE__*/React.createElement("p", null, hue[1]));
  }));
};

export default ColorPalette;
//# sourceMappingURL=ColorPalette.js.map