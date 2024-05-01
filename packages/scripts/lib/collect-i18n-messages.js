"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTranslationTable = buildTranslationTable;
exports.default = run;

var _cli = require("@formatjs/cli");

var _flat = _interopRequireDefault(require("flat"));

var _util = require("./util");

/* eslint-disable no-console */

/**
 * Collect all messages in a translation table.
 */
async function buildTranslationTable(ymlFilesByLocale, messagesFromCode, groups) {
  const messageIdsFromCode = Object.keys(messagesFromCode);
  const allLocales = Object.keys(ymlFilesByLocale); // Will contain id, description, and a column for each selected language.

  const messageData = {};
  const idsFromGroups = (0, _util.expandGroupIds)(groups);
  const messagesToReport = [...messageIdsFromCode, ...idsFromGroups];
  await Promise.all(allLocales.map(async locale => {
    const allI18nPromises = ymlFilesByLocale[locale].map(_util.loadYamlFile);
    const allI18nMessages = await Promise.all(allI18nPromises);
    let allI18nMessagesFlattened = {};
    allI18nMessages.forEach(i18nMessages => {
      const flattenedMessages = (0, _flat.default)(i18nMessages);
      allI18nMessagesFlattened = { ...allI18nMessagesFlattened,
        ...flattenedMessages
      };
    });
    messagesToReport.filter(_util.isNotSpecialId).forEach(id => {
      var _allI18nMessagesFlatt;

      const {
        description
      } = messagesFromCode[id] || {};
      const message = ((_allI18nMessagesFlatt = allI18nMessagesFlattened[id]) === null || _allI18nMessagesFlatt === void 0 ? void 0 : _allI18nMessagesFlatt.trim()) || undefined;

      if (!messageData[id]) {
        messageData[id] = {
          description
        };
      }

      messageData[id][locale] = message;
    });
  }));
  return messageData;
}
/**
 * Collect all messages and create a formatted output.
 */


async function collectAndPrintOutMessages({
  exceptionFiles,
  sourceFiles,
  ymlFilesByLocale
}) {
  // Gather message ids from code.
  const messagesFromCode = JSON.parse(await (0, _cli.extract)(sourceFiles, {}));
  const {
    groups
  } = await (0, _util.combineExceptionFiles)(exceptionFiles); // Will contain id, description, and a column for each selected language.

  const messageData = await buildTranslationTable(ymlFilesByLocale, messagesFromCode, groups);
  const allLocales = Object.keys(ymlFilesByLocale); // CSV heading

  console.log(`ID,Description,${allLocales.join(",")}`);
  Object.keys(messageData).forEach(id => {
    const row = messageData[id];
    const messages = allLocales.map(locale => row[locale]);
    console.log(`${id},"${row.description}","${messages.join('","')}"`);
  });
}
/**
 * This script collects message ids gathered by the formatjs extract command in the specified files and folder(s)
 * and creates a CSV file with the id, description, and messages in the selected language(s).
 * This script is shipped as part of a package so it can be used in other code bases as needed.
 */


function run() {
  return (0, _util.sortSourceAndYmlFiles)(process.argv).then(collectAndPrintOutMessages);
}
//# sourceMappingURL=collect-i18n-messages.js.map