"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldProcessFile = shouldProcessFile;
exports.isNotSpecialId = isNotSpecialId;
exports.sortSourceAndYmlFiles = sortSourceAndYmlFiles;
exports.loadYamlFile = loadYamlFile;
exports.expandGroupIds = expandGroupIds;
exports.combineExceptionFiles = combineExceptionFiles;

var _fs = require("fs");

var _jsYaml = require("js-yaml");

var _globPromise = _interopRequireDefault(require("glob-promise"));

var _path = _interopRequireDefault(require("path"));

function shouldProcessFile(fileName, folder) {
  return (!fileName.includes("/__") || folder.includes("/__")) && !fileName.includes("node_modules") && !fileName.endsWith(".d.ts");
}
/**
 * @returns true if the id is not special or reserved (i.e. doesn't start with "_").
 */


function isNotSpecialId(id) {
  return !id.startsWith("_");
}

const exceptionFileName = "i18n-exceptions.json";
/**
 * Helper function that sorts yml, source, and exception files into different buckets.
 * @param argv The value from process.argv.
 * @returns A composite object with a list for yml files by locale, and a list for source files.
 */

async function sortSourceAndYmlFiles(argv) {
  const sourceFiles = [];
  const ymlFilesByLocale = {};
  const exceptionFiles = []; // Places the given file into the source, yml, or ignoredId file bucket above.

  function sortFile(fileName) {
    const parsedArg = _path.default.parse(fileName);

    const baseName = parsedArg.name;

    if (parsedArg.base === exceptionFileName) {
      exceptionFiles.push(fileName);
    } else if (parsedArg.ext === ".json") {// Ignore other JSON files.
    } else if (parsedArg.ext === ".yml") {
      const locale = baseName;

      if (!ymlFilesByLocale[locale]) {
        ymlFilesByLocale[locale] = [];
      }

      const ymlFilesForLocale = ymlFilesByLocale[locale];

      if (!ymlFilesForLocale.includes(fileName)) {
        ymlFilesForLocale.push(fileName);
      }

      ymlFilesByLocale[locale].push(fileName);
    } else if (!sourceFiles.includes(fileName)) {
      sourceFiles.push(fileName);
    }
  } // Note: reminder that node.js provides the first two argv values:
  // - argv[0] is the name of the executable file.
  // - argv[1] is the path to the script file.
  // - argv[2] and beyond are the files and folders passed to the script.


  const allGlobPromises = [];
  const allGlobs = [];
  const allStatPromises = [];
  const allStatFiles = [];

  for (let i = 2; i < argv.length; i++) {
    // List the files recursively (glob) for this folder.
    const arg = argv[i];

    if (arg.endsWith(".yml")) {
      // If argument ends with .yml, treat as a file.
      sortFile(arg); // Also include any exception file in that folder, if it exists.

      const parsedArg = _path.default.parse(arg);

      const exceptionFile = `${parsedArg.dir}/${exceptionFileName}`;
      allStatFiles.push(exceptionFile);
      allStatPromises.push(_fs.promises.stat(exceptionFile));
    } else {
      // Otherwise, it is a folder, and use glob to get files recursively.
      // For glob argument info, see their docs at https://github.com/ahmadnassri/node-glob-promise#api.
      allGlobs.push(arg);
      allGlobPromises.push((0, _globPromise.default)(`${arg}/**/*.{{j,t}s{,x},yml,json}`));
    }
  }

  const allStats = await Promise.allSettled(allStatPromises);
  allStats.forEach((stat, i) => {
    if (stat.status === "fulfilled") {
      sortFile(allStatFiles[i]);
    }
  });
  const allFileLists = await Promise.all(allGlobPromises);
  allFileLists.forEach((files, i) => files.filter(f => shouldProcessFile(f, allGlobs[i])).forEach(sortFile));
  return {
    exceptionFiles,
    sourceFiles,
    ymlFilesByLocale
  };
}
/**
 * Load yaml from a file into a js object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any


async function loadYamlFile(filename) {
  return (0, _jsYaml.load)(await _fs.promises.readFile(filename));
}
/**
 * Convert a groups object into a list of corresponding message ids.
 */


function expandGroupIds(groups) {
  return Object.keys(groups).reduce((result, group) => result.concat(groups[group].map(key => group.replace("*", key))), []);
}

/**
 * Combines exception files into a single exception object.
 */
async function combineExceptionFiles(exceptionFiles) {
  let allIgnoredIds = [];
  const allGroups = [];
  await Promise.all(exceptionFiles.map(async file => {
    const rawJson = (await _fs.promises.readFile(file)).toString();
    const jsonObject = JSON.parse(rawJson);
    allIgnoredIds = allIgnoredIds.concat(jsonObject.ignoredIds);

    if (jsonObject.groups) {
      allGroups.push(jsonObject.groups);
    }
  }));
  const groups = allGroups.reduce((result, group) => ({ ...result,
    ...group
  }), {});
  return {
    groups,
    // Make sure ignored ids are unique
    ignoredIds: new Set(allIgnoredIds)
  };
}
//# sourceMappingURL=util.js.map