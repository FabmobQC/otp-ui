"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _validateI18n = _interopRequireDefault(require("./validate-i18n"));

/**
 * Checks that message ids gathered by the formatjs extract command are present in the specified folder(s).
 */
// Example usage for one package in this repo:
//   node path-to/lib/run-validate-i18n.js ../trip-details/src ../trip-details/i18n
// Example usage for all packages in this repo:
//   node path-to/lib/run-validate-i18n.js ../**/src ../**/i18n
(0, _validateI18n.default)();
//# sourceMappingURL=run-validate-i18n.js.map