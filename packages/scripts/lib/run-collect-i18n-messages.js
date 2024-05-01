"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _collectI18nMessages = _interopRequireDefault(require("./collect-i18n-messages"));

/**
 * This script collects message ids gathered by the formatjs extract command in the specified files and folder(s)
 * and creates a CSV file with the id, description, and messages in the selected language(s).
 */
// Example usage for all packages and all languages in this repo:
//   node path-to/lib/run-collect-i18n-messages.js ../**/src ../**/i18n
// Example usage for all packages and one language in this repo:
//   node path-to-lib/run-collect-i18n-messages.js ../**/src ../**/i18n/en-US.yml
(0, _collectI18nMessages.default)();
//# sourceMappingURL=run-collect-i18n-messages.js.map