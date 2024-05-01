import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import _regeneratorRuntime from "@babel/runtime/regenerator";
import { promises as fs } from "fs";
import { load } from "js-yaml";
import glob from "glob-promise";
import path from "path";
export function shouldProcessFile(fileName, folder) {
  return (!fileName.includes("/__") || folder.includes("/__")) && !fileName.includes("node_modules") && !fileName.endsWith(".d.ts");
}
/**
 * @returns true if the id is not special or reserved (i.e. doesn't start with "_").
 */

export function isNotSpecialId(id) {
  return !id.startsWith("_");
}
var exceptionFileName = "i18n-exceptions.json";
/**
 * Helper function that sorts yml, source, and exception files into different buckets.
 * @param argv The value from process.argv.
 * @returns A composite object with a list for yml files by locale, and a list for source files.
 */

export function sortSourceAndYmlFiles(_x) {
  return _sortSourceAndYmlFiles.apply(this, arguments);
}
/**
 * Load yaml from a file into a js object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

function _sortSourceAndYmlFiles() {
  _sortSourceAndYmlFiles = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(argv) {
    var sourceFiles, ymlFilesByLocale, exceptionFiles, sortFile, allGlobPromises, allGlobs, allStatPromises, allStatFiles, i, arg, parsedArg, exceptionFile, allStats, allFileLists;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sortFile = function _sortFile(fileName) {
              var parsedArg = path.parse(fileName);
              var baseName = parsedArg.name;

              if (parsedArg.base === exceptionFileName) {
                exceptionFiles.push(fileName);
              } else if (parsedArg.ext === ".json") {// Ignore other JSON files.
              } else if (parsedArg.ext === ".yml") {
                var locale = baseName;

                if (!ymlFilesByLocale[locale]) {
                  ymlFilesByLocale[locale] = [];
                }

                var ymlFilesForLocale = ymlFilesByLocale[locale];

                if (!ymlFilesForLocale.includes(fileName)) {
                  ymlFilesForLocale.push(fileName);
                }

                ymlFilesByLocale[locale].push(fileName);
              } else if (!sourceFiles.includes(fileName)) {
                sourceFiles.push(fileName);
              }
            };

            sourceFiles = [];
            ymlFilesByLocale = {};
            exceptionFiles = []; // Places the given file into the source, yml, or ignoredId file bucket above.

            // Note: reminder that node.js provides the first two argv values:
            // - argv[0] is the name of the executable file.
            // - argv[1] is the path to the script file.
            // - argv[2] and beyond are the files and folders passed to the script.
            allGlobPromises = [];
            allGlobs = [];
            allStatPromises = [];
            allStatFiles = [];

            for (i = 2; i < argv.length; i++) {
              // List the files recursively (glob) for this folder.
              arg = argv[i];

              if (arg.endsWith(".yml")) {
                // If argument ends with .yml, treat as a file.
                sortFile(arg); // Also include any exception file in that folder, if it exists.

                parsedArg = path.parse(arg);
                exceptionFile = "".concat(parsedArg.dir, "/").concat(exceptionFileName);
                allStatFiles.push(exceptionFile);
                allStatPromises.push(fs.stat(exceptionFile));
              } else {
                // Otherwise, it is a folder, and use glob to get files recursively.
                // For glob argument info, see their docs at https://github.com/ahmadnassri/node-glob-promise#api.
                allGlobs.push(arg);
                allGlobPromises.push(glob("".concat(arg, "/**/*.{{j,t}s{,x},yml,json}")));
              }
            }

            _context.next = 11;
            return Promise.allSettled(allStatPromises);

          case 11:
            allStats = _context.sent;
            allStats.forEach(function (stat, i) {
              if (stat.status === "fulfilled") {
                sortFile(allStatFiles[i]);
              }
            });
            _context.next = 15;
            return Promise.all(allGlobPromises);

          case 15:
            allFileLists = _context.sent;
            allFileLists.forEach(function (files, i) {
              return files.filter(function (f) {
                return shouldProcessFile(f, allGlobs[i]);
              }).forEach(sortFile);
            });
            return _context.abrupt("return", {
              exceptionFiles: exceptionFiles,
              sourceFiles: sourceFiles,
              ymlFilesByLocale: ymlFilesByLocale
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sortSourceAndYmlFiles.apply(this, arguments);
}

export function loadYamlFile(_x2) {
  return _loadYamlFile.apply(this, arguments);
}
/**
 * Convert a groups object into a list of corresponding message ids.
 */

function _loadYamlFile() {
  _loadYamlFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(filename) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = load;
            _context2.next = 3;
            return fs.readFile(filename);

          case 3:
            _context2.t1 = _context2.sent;
            return _context2.abrupt("return", (0, _context2.t0)(_context2.t1));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadYamlFile.apply(this, arguments);
}

export function expandGroupIds(groups) {
  return Object.keys(groups).reduce(function (result, group) {
    return result.concat(groups[group].map(function (key) {
      return group.replace("*", key);
    }));
  }, []);
}

/**
 * Combines exception files into a single exception object.
 */
export function combineExceptionFiles(_x3) {
  return _combineExceptionFiles.apply(this, arguments);
}

function _combineExceptionFiles() {
  _combineExceptionFiles = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(exceptionFiles) {
    var allIgnoredIds, allGroups, groups;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            allIgnoredIds = [];
            allGroups = [];
            _context4.next = 4;
            return Promise.all(exceptionFiles.map( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(file) {
                var rawJson, jsonObject;
                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return fs.readFile(file);

                      case 2:
                        rawJson = _context3.sent.toString();
                        jsonObject = JSON.parse(rawJson);
                        allIgnoredIds = allIgnoredIds.concat(jsonObject.ignoredIds);

                        if (jsonObject.groups) {
                          allGroups.push(jsonObject.groups);
                        }

                      case 6:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x4) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 4:
            groups = allGroups.reduce(function (result, group) {
              return _objectSpread(_objectSpread({}, result), group);
            }, {});
            return _context4.abrupt("return", {
              groups: groups,
              // Make sure ignored ids are unique
              ignoredIds: new Set(allIgnoredIds)
            });

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _combineExceptionFiles.apply(this, arguments);
}
//# sourceMappingURL=util.js.map