"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IconRenderer;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

const StyledTable = _styledComponents.default.table.withConfig({
  displayName: "icon-renderer__StyledTable",
  componentId: "sc-epf3ui-0"
})(["border-collapse:collapse;border-spacing:0;font-family:system-ui;vertical-align:middle;div{width:50px;}td,th{padding:10px;}tr{border:1px solid gray;}tbody tr:nth-child(even){background-color:#eaeaea;}"]);

function IconRenderer({
  examples,
  renderComponentFn,
  typeTitle
}) {
  return /*#__PURE__*/_react.default.createElement(StyledTable, null, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, typeTitle), /*#__PURE__*/_react.default.createElement("th", null, "Result"))), /*#__PURE__*/_react.default.createElement("tbody", null, examples.map((example, index) => /*#__PURE__*/_react.default.createElement("tr", {
    key: index
  }, /*#__PURE__*/_react.default.createElement("td", null, example.type || example), /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("div", null, renderComponentFn(example)))))));
}
//# sourceMappingURL=icon-renderer.js.map