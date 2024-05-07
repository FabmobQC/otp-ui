import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _typeof from "@babel/runtime/helpers/typeof";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import coreUtils from "@opentripplanner/core-utils";
var queryGen = coreUtils.queryGen;
var TRANSIT_SUBMODES_AND_TRANSIT = queryGen.TRANSIT_SUBMODES_AND_TRANSIT;
/**
 * Aggregates all the modes from the input mode button definitions
 * Should probably filter unique values, but it's not possible with a Set due to them being objects
 * @param modeButtonDefinitions Array of mode buttons
 * @returns All the (unique) modes from the buttons
 */

export function aggregateModes(modeButtonDefinitions) {
  return modeButtonDefinitions.reduce(function (array, combo) {
    var _combo$modes;

    combo === null || combo === void 0 ? void 0 : (_combo$modes = combo.modes) === null || _combo$modes === void 0 ? void 0 : _combo$modes.forEach(function (mode) {
      return array.push(mode);
    });
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

export function filterModeDefitionsByKey(modeButtonDefinitions, keys) {
  return modeButtonDefinitions.filter(function (def) {
    return keys.includes(def.key);
  });
}
/**
 * Sometimes we might get a string when we want a boolean or number,
 * since the URL state is stored as a string. This method helps convert
 * those values into the correct type.
 */

export function convertModeSettingValue(setting, value) {
  // Assume the type of the output value based on the type of the default value.
  if (setting["default"]) {
    switch (_typeof(setting["default"])) {
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

export var populateSettingWithValue = function populateSettingWithValue(values) {
  return function (setting) {
    var value = values[setting.key];
    var convertedValue = convertModeSettingValue(setting, value);
    return _objectSpread(_objectSpread({}, setting), {}, {
      value: convertedValue
    });
  };
};
/**
 * Extracts the defaults from each mode setting into an object
 * where the keys correspond with the keys from the mode setting.
 * @param modeSetting Mode settings with `default`s populated
 * @returns Object containing just the keys and values from defaults
 */

export function extractModeSettingDefaultsToObject(modeSettings) {
  return modeSettings === null || modeSettings === void 0 ? void 0 : modeSettings.reduce(function (prev, cur) {
    prev[cur.key] = cur["default"];

    if (cur.type === "SLIDER" && cur.inverseKey && cur["default"]) {
      prev[cur.inverseKey] = cur.high - cur["default"] + cur.low;
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

export function checkIfModeSettingApplies(setting, mode) {
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

export var addSettingsToButton = function addSettingsToButton(settings) {
  return function (button) {
    var _button$modes;

    var settingsForThisCombination = Array.from(new Set((_button$modes = button.modes) === null || _button$modes === void 0 ? void 0 : _button$modes.reduce(function (prev, mode) {
      return [].concat(_toConsumableArray(prev), _toConsumableArray(settings.filter(function (def) {
        return checkIfModeSettingApplies(def, mode);
      })));
    }, [])));
    return _objectSpread(_objectSpread({}, button), {}, {
      modeSettings: settingsForThisCombination
    });
  };
};
/**
 * Provides a function that sets mode buttons' enabled state
 * Intended to be composed in a map
 * @param initialState Initial State object
 * @param enabledKeys Array of enabled keys, if not provided default to initial state
 * @returns Function that accepts mode button and returns a mode button with enabled key set
 */

export var setModeButtonEnabled = function setModeButtonEnabled(enabledKeys) {
  return function (modeButton) {
    return _objectSpread(_objectSpread({}, modeButton), {}, {
      enabled: enabledKeys.includes(modeButton.key)
    });
  };
};
//# sourceMappingURL=utils.js.map