"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strongText = strongText;
exports.defaultMessages = void 0;

var _flat = _interopRequireDefault(require("flat"));

var _react = _interopRequireDefault(require("react"));

var _enUS = _interopRequireDefault(require("../i18n/en-US.yml"));

// Load the default messages.
// HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.
const defaultMessages = (0, _flat.default)(_enUS.default);
exports.defaultMessages = defaultMessages;

function strongText(content) {
  return /*#__PURE__*/_react.default.createElement("strong", null, content);
}
//# sourceMappingURL=util.js.map