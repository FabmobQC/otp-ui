"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggregateModes = aggregateModes;
exports.filterModeDefitionsByKey = filterModeDefitionsByKey;
exports.convertModeSettingValue = convertModeSettingValue;
exports.extractModeSettingDefaultsToObject = extractModeSettingDefaultsToObject;
exports.checkIfModeSettingApplies = checkIfModeSettingApplies;
exports.setModeButtonEnabled = exports.addSettingsToButton = exports.populateSettingWithValue = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

const {
  queryGen
} = _coreUtils.default;
const {
  TRANSIT_SUBMODES_AND_TRANSIT
} = queryGen;
/**
 * Aggregates all the modes from the input mode button definitions
 * Should probably filter unique values, but it's not possible with a Set due to them being objects
 * @param modeButtonDefinitions Array of mode buttons
 * @returns All the (unique) modes from the buttons
 */

function aggregateModes(modeButtonDefinitions) {
  return modeButtonDefinitions.reduce((array, combo) => {
    var _combo$modes;

    combo === null || combo === void 0 ? void 0 : (_combo$modes = combo.modes) === null || _combo$modes === void 0 ? void 0 : _combo$modes.forEach(mode => array.push(mode));
    return array;
  }, new Array());
}
/**
 * Filters mode buttons by list of keys, used to find enabled buttons.
 * TODO: Remove this function? Is it needed?
 * @param modeButtonDefinitions All mode definitions
 * @param keys List of keys of buttons to include
 * @returns Filtered list of buttons
 */


function filterModeDefitionsByKey(modeButtonDefinitions, keys) {
  return modeButtonDefinitions.filter(def => keys.includes(def.key));
}
/**
 * Sometimes we might get a string when we want a boolean or number,
 * since the URL state is stored as a string. This method helps convert
 * those values into the correct type.
 */


function convertModeSettingValue(setting, value) {
  // Assume the type of the output value based on the type of the default value.
  if (setting.default) {
    switch (typeof setting.default) {
      case "bigint":
      case "number":
        return Number(value);

      case "boolean":
        return value === "true" || value === true;

      default:
        return value;
    }
  } // In case no default is provided.


  switch (setting.type) {
    case "CHECKBOX":
    case "SUBMODE":
      return value === "true" || value === true;

    case "SLIDER":
      return Number(value);

    default:
      return value;
  }
}
/**
 * Connects the mode setting value from a values object, where each key corresponds
 * to a mode setting in the modeSettings parameter.
 * @param modeSettings The mode setting with an empty `value` param
 * @param values An object containing setting values
 * @returns Mode Setting with populated value
 */


const populateSettingWithValue = values => setting => {
  const value = values[setting.key];
  const convertedValue = convertModeSettingValue(setting, value);
  return { ...setting,
    value: convertedValue
  };
};
/**
 * Extracts the defaults from each mode setting into an object
 * where the keys correspond with the keys from the mode setting.
 * @param modeSetting Mode settings with `default`s populated
 * @returns Object containing just the keys and values from defaults
 */


exports.populateSettingWithValue = populateSettingWithValue;

function extractModeSettingDefaultsToObject(modeSettings) {
  return modeSettings === null || modeSettings === void 0 ? void 0 : modeSettings.reduce((prev, cur) => {
    prev[cur.key] = cur.default;

    if (cur.type === "SLIDER" && cur.inverseKey && cur.default) {
      prev[cur.inverseKey] = cur.high - cur.default + cur.low;
    }

    return prev;
  }, {});
}
/**
 * This function is used to apply the ModeSettings to the ModeButtons by checking
 * each setting against all the transport modes in the button. It also handles the special
 * case of a "TRANSIT" mode setting, which can apply to all of the different possible TRANSIT_MODES.
 * @param setting Mode setting to check
 * @param mode TransportMode to check against
 * @returns Whether this mode setting applies to this TransportMode
 */


function checkIfModeSettingApplies(setting, mode) {
  if (setting.applicableMode === "TRANSIT") {
    return TRANSIT_SUBMODES_AND_TRANSIT.includes(mode.mode);
  }

  return setting.applicableMode === mode.mode;
}
/**
 * Higher order function that can be used in `map` to add mode settings to mode button definitions.
 * @param settings Mode settings to be added to button
 * @returns Function that accepts a mode button definition, returning mode button def with populated settings
 */


const addSettingsToButton = settings => button => {
  var _button$modes;

  const settingsForThisCombination = Array.from(new Set((_button$modes = button.modes) === null || _button$modes === void 0 ? void 0 : _button$modes.reduce((prev, mode) => {
    return [...prev, ...settings.filter(def => checkIfModeSettingApplies(def, mode))];
  }, [])));
  return { ...button,
    modeSettings: settingsForThisCombination
  };
};
/**
 * Provides a function that sets mode buttons' enabled state
 * Intended to be composed in a map
 * @param initialState Initial State object
 * @param enabledKeys Array of enabled keys, if not provided default to initial state
 * @returns Function that accepts mode button and returns a mode button with enabled key set
 */


exports.addSettingsToButton = addSettingsToButton;

const setModeButtonEnabled = enabledKeys => modeButton => {
  return { ...modeButton,
    enabled: enabledKeys.includes(modeButton.key)
  };
};

exports.setModeButtonEnabled = setModeButtonEnabled;
//# sourceMappingURL=utils.js.map