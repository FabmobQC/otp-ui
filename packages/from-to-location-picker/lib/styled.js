"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = exports.FromToPickerSpan = exports.LocationPickerSpan = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

const LocationPickerSpan = _styledComponents.default.span.withConfig({
  displayName: "styled__LocationPickerSpan",
  componentId: "sc-vb4790-0"
})([":first-of-type{border-left:none;}"]);

exports.LocationPickerSpan = LocationPickerSpan;

const FromToPickerSpan = _styledComponents.default.span.withConfig({
  displayName: "styled__FromToPickerSpan",
  componentId: "sc-vb4790-1"
})(["> *{padding-left:0.4em;border-left:1px solid black;}"]);

exports.FromToPickerSpan = FromToPickerSpan;

const Button = _styledComponents.default.button.withConfig({
  displayName: "styled__Button",
  componentId: "sc-vb4790-2"
})(["background:none;border:none;color:navy;font-family:inherit;font-size:inherit;line-height:inherit;padding-left:0.2em;:hover{text-decoration:underline;cursor:pointer;}"]);

exports.Button = Button;
//# sourceMappingURL=styled.js.map