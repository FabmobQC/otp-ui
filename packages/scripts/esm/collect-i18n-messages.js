import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-disable no-console */
import { extract } from "@formatjs/cli";
import flatten from "flat";
import { combineExceptionFiles, expandGroupIds, isNotSpecialId, loadYamlFile, sortSourceAndYmlFiles } from "./util"; // The data that corresponds to rows in the CSV output.

/**
 * Collect all messages in a translation table.
 */
export function buildTranslationTable(_x, _x2, _x3) {
  return _buildTranslationTable.apply(this, arguments);
}
/**
 * Collect all messages and create a formatted output.
 */

function _buildTranslationTable() {
  _buildTranslationTable = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(ymlFilesByLocale, messagesFromCode, groups) {
    var messageIdsFromCode, allLocales, messageData, idsFromGroups, messagesToReport;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            messageIdsFromCode = Object.keys(messagesFromCode);
            allLocales = Object.keys(ymlFilesByLocale); // Will contain id, description, and a column for each selected language.

            messageData = {};
            idsFromGroups = expandGroupIds(groups);
            messagesToReport = [].concat(_toConsumableArray(messageIdsFromCode), _toConsumableArray(idsFromGroups));
            _context2.next = 7;
            return Promise.all(allLocales.map( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(locale) {
                var allI18nPromises, allI18nMessages, allI18nMessagesFlattened;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        allI18nPromises = ymlFilesByLocale[locale].map(loadYamlFile);
                        _context.next = 3;
                        return Promise.all(allI18nPromises);

                      case 3:
                        allI18nMessages = _context.sent;
                        allI18nMessagesFlattened = {};
                        allI18nMessages.forEach(function (i18nMessages) {
                          var flattenedMessages = flatten(i18nMessages);
                          allI18nMessagesFlattened = _objectSpread(_objectSpread({}, allI18nMessagesFlattened), flattenedMessages);
                        });
                        messagesToReport.filter(isNotSpecialId).forEach(function (id) {
                          var _allI18nMessagesFlatt;

                          var _ref3 = messagesFromCode[id] || {},
                              description = _ref3.description;

                          var message = ((_allI18nMessagesFlatt = allI18nMessagesFlattened[id]) === null || _allI18nMessagesFlatt === void 0 ? void 0 : _allI18nMessagesFlatt.trim()) || undefined;

                          if (!messageData[id]) {
                            messageData[id] = {
                              description: description
                            };
                          }

                          messageData[id][locale] = message;
                        });

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 7:
            return _context2.abrupt("return", messageData);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _buildTranslationTable.apply(this, arguments);
}

function collectAndPrintOutMessages(_x4) {
  return _collectAndPrintOutMessages.apply(this, arguments);
}
/**
 * This script collects message ids gathered by the formatjs extract command in the specified files and folder(s)
 * and creates a CSV file with the id, description, and messages in the selected language(s).
 * This script is shipped as part of a package so it can be used in other code bases as needed.
 */


function _collectAndPrintOutMessages() {
  _collectAndPrintOutMessages = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(_ref) {
    var exceptionFiles, sourceFiles, ymlFilesByLocale, messagesFromCode, _yield$combineExcepti, groups, messageData, allLocales;

    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            exceptionFiles = _ref.exceptionFiles, sourceFiles = _ref.sourceFiles, ymlFilesByLocale = _ref.ymlFilesByLocale;
            _context3.t0 = JSON;
            _context3.next = 4;
            return extract(sourceFiles, {});

          case 4:
            _context3.t1 = _context3.sent;
            messagesFromCode = _context3.t0.parse.call(_context3.t0, _context3.t1);
            _context3.next = 8;
            return combineExceptionFiles(exceptionFiles);

          case 8:
            _yield$combineExcepti = _context3.sent;
            groups = _yield$combineExcepti.groups;
            _context3.next = 12;
            return buildTranslationTable(ymlFilesByLocale, messagesFromCode, groups);

          case 12:
            messageData = _context3.sent;
            allLocales = Object.keys(ymlFilesByLocale); // CSV heading

            console.log("ID,Description,".concat(allLocales.join(",")));
            Object.keys(messageData).forEach(function (id) {
              var row = messageData[id];
              var messages = allLocales.map(function (locale) {
                return row[locale];
              });
              console.log("".concat(id, ",\"").concat(row.description, "\",\"").concat(messages.join('","'), "\""));
            });

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _collectAndPrintOutMessages.apply(this, arguments);
}

export default function run() {
  return sortSourceAndYmlFiles(process.argv).then(collectAndPrintOutMessages);
}
//# sourceMappingURL=collect-i18n-messages.js.map