import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";

/* eslint-disable no-console */
import flatten from "flat";
import { extract } from "@formatjs/cli";
import { combineExceptionFiles, expandGroupIds, isNotSpecialId, loadYamlFile, sortSourceAndYmlFiles } from "./util";
/**
 * Computes the unused ids from code or YML file for a given locale.
 */

export function checkLocale(_x, _x2, _x3, _x4) {
  return _checkLocale.apply(this, arguments);
}
/**
 * Checks message ids completeness between code and yml files for all locales in repo.
 */

function _checkLocale() {
  _checkLocale = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(ymlFilesForLocale, messageIdsFromCode, ignoredIds, groups) {
    var idsChecked, idsNotInCode, allI18nPromises, allI18nMessages, idsFromGroupsArray, idsFromGroups, idsFromGroupsNotInYml, missingIdsForLocale;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            idsChecked = new Set();
            idsNotInCode = [];
            allI18nPromises = ymlFilesForLocale.map(loadYamlFile);
            _context.next = 5;
            return Promise.all(allI18nPromises);

          case 5:
            allI18nMessages = _context.sent;
            idsFromGroupsArray = expandGroupIds(groups);
            idsFromGroups = new Set(idsFromGroupsArray);
            idsFromGroupsNotInYml = new Set(idsFromGroupsArray);
            allI18nMessages.forEach(function (i18nMessages) {
              var flattenedMessages = flatten(i18nMessages); // Message ids from code must be present in yml (except those in ignoredIds).

              messageIdsFromCode.filter(function (id) {
                return flattenedMessages[id];
              }).forEach(function (id) {
                return idsChecked.add(id);
              }); // Message ids from yml must be present in code,
              // except those starting with "_" or those in ignoredIds or groups.

              var messageKeys = Object.keys(flattenedMessages);
              messageKeys.filter(isNotSpecialId).filter(function (id) {
                return !ignoredIds.has(id);
              }).filter(function (id) {
                return !idsFromGroups.has(id);
              }).filter(function (id) {
                return !messageIdsFromCode.includes(id);
              }).filter(function (id) {
                return !idsNotInCode.includes(id);
              }).forEach(function (id) {
                return idsNotInCode.push(id);
              }); // Filter out ids from groups found in YML file.

              messageKeys.forEach(function (id) {
                return idsFromGroupsNotInYml["delete"](id);
              });
            }); // Collect ids in code and groups not found in yml.

            missingIdsForLocale = [].concat(_toConsumableArray(messageIdsFromCode), _toConsumableArray(idsFromGroupsNotInYml)).filter(function (id) {
              return !ignoredIds.has(id);
            }).filter(function (id) {
              return !idsChecked.has(id);
            });
            return _context.abrupt("return", {
              idsNotInCode: idsNotInCode,
              missingIdsForLocale: missingIdsForLocale
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _checkLocale.apply(this, arguments);
}

function checkI18n(_x5) {
  return _checkI18n.apply(this, arguments);
}
/**
 * Checks that message ids gathered by the formatjs extract command are present in the specified folder(s).
 * Produces a process error if message ids are present in a language but not another,
 * or if message ids are found in i18n yml files but not in the code or vice-versa.
 * This script is shipped as part of a package so it can be used in other code bases as needed.
 */


function _checkI18n() {
  _checkI18n = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(_ref) {
    var exceptionFiles, sourceFiles, ymlFilesByLocale, messagesFromCode, messageIdsFromCode, englishUsYmls, _yield$combineExcepti, groups, ignoredIds, errorCount;

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
            messageIdsFromCode = messagesFromCode ? Object.keys(messagesFromCode) : [];
            englishUsYmls = ymlFilesByLocale["en-US"];
            console.log("Checking ".concat(messageIdsFromCode.length, " strings from ").concat(englishUsYmls ? Object.keys(englishUsYmls).length : 0, " message files against ").concat(sourceFiles.length, " source files (").concat(exceptionFiles.length, " exception files)."));
            _context3.next = 11;
            return combineExceptionFiles(exceptionFiles);

          case 11:
            _yield$combineExcepti = _context3.sent;
            groups = _yield$combineExcepti.groups;
            ignoredIds = _yield$combineExcepti.ignoredIds;
            errorCount = 0; // For each locale, check that all ids in messages are in the yml files.
            // Accessorily, log message ids from yml files that are not used in the code.

            _context3.next = 17;
            return Promise.all(Object.keys(ymlFilesByLocale).map( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(locale) {
                var _yield$checkLocale, idsNotInCode, missingIdsForLocale;

                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return checkLocale(ymlFilesByLocale[locale], messageIdsFromCode, ignoredIds, groups);

                      case 2:
                        _yield$checkLocale = _context2.sent;
                        idsNotInCode = _yield$checkLocale.idsNotInCode;
                        missingIdsForLocale = _yield$checkLocale.missingIdsForLocale;
                        // Print errors.
                        missingIdsForLocale.forEach(function (id) {
                          console.error("Message '".concat(id, "' is missing from locale ").concat(locale, "."));
                        });
                        idsNotInCode.forEach(function (id) {
                          console.error("Message '".concat(id, "' from locale ").concat(locale, " is not used in code."));
                        });
                        errorCount += missingIdsForLocale.length + idsNotInCode.length;

                      case 8:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x6) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 17:
            console.log("There were ".concat(errorCount, " error(s)."));

            if (errorCount > 0) {
              process.exit(1);
            }

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _checkI18n.apply(this, arguments);
}

export default function run() {
  return sortSourceAndYmlFiles(process.argv).then(checkI18n);
}
//# sourceMappingURL=validate-i18n.js.map