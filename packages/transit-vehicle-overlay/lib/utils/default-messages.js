"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flat = _interopRequireDefault(require("flat"));

var _enUS = _interopRequireDefault(require("../../i18n/en-US.yml"));

// Load the default messages.
// HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.
var _default = (0, _flat.default)(_enUS.default);

exports.default = _default;
//# sourceMappingURL=default-messages.js.map