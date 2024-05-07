import { ModeButtonDefinition, ModeSetting, ModeSettingValues, TransportMode } from "@opentripplanner/types";
/**
 * Aggregates all the modes from the input mode button definitions
 * Should probably filter unique values, but it's not possible with a Set due to them being objects
 * @param modeButtonDefinitions Array of mode buttons
 * @returns All the (unique) modes from the buttons
 */
export declare function aggregateModes(modeButtonDefinitions: ModeButtonDefinition[]): TransportMode[];
/**
 * Filters mode buttons by list of keys, used to find enabled buttons.
 * TODO: Remove this function? Is it needed?
 * @param modeButtonDefinitions All mode definitions
 * @param keys List of keys of buttons to include
 * @returns Filtered list of buttons
 */
export declare function filterModeDefitionsByKey(modeButtonDefinitions: ModeButtonDefinition[], keys: string[]): ModeButtonDefinition[];
/**
 * Sometimes we might get a string when we want a boolean or number,
 * since the URL state is stored as a string. This method helps convert
 * those values into the correct type.
 */
export declare function convertModeSettingValue(setting: ModeSetting, value: string | boolean | number): string | boolean | number;
/**
 * Connects the mode setting value from a values object, where each key corresponds
 * to a mode setting in the modeSettings parameter.
 * @param modeSettings The mode setting with an empty `value` param
 * @param values An object containing setting values
 * @returns Mode Setting with populated value
 */
export declare const populateSettingWithValue: (values: ModeSettingValues) => (setting: ModeSetting) => ModeSetting;
/**
 * Extracts the defaults from each mode setting into an object
 * where the keys correspond with the keys from the mode setting.
 * @param modeSetting Mode settings with `default`s populated
 * @returns Object containing just the keys and values from defaults
 */
export declare function extractModeSettingDefaultsToObject(modeSettings: ModeSetting[]): ModeSettingValues;
/**
 * This function is used to apply the ModeSettings to the ModeButtons by checking
 * each setting against all the transport modes in the button. It also handles the special
 * case of a "TRANSIT" mode setting, which can apply to all of the different possible TRANSIT_MODES.
 * @param setting Mode setting to check
 * @param mode TransportMode to check against
 * @returns Whether this mode setting applies to this TransportMode
 */
export declare function checkIfModeSettingApplies(setting: ModeSetting, mode: TransportMode): boolean;
/**
 * Higher order function that can be used in `map` to add mode settings to mode button definitions.
 * @param settings Mode settings to be added to button
 * @returns Function that accepts a mode button definition, returning mode button def with populated settings
 */
export declare const addSettingsToButton: (settings: ModeSetting[]) => (button: ModeButtonDefinition) => ModeButtonDefinition;
/**
 * Provides a function that sets mode buttons' enabled state
 * Intended to be composed in a map
 * @param initialState Initial State object
 * @param enabledKeys Array of enabled keys, if not provided default to initial state
 * @returns Function that accepts mode button and returns a mode button with enabled key set
 */
export declare const setModeButtonEnabled: (enabledKeys: string[]) => (modeButton: ModeButtonDefinition) => ModeButtonDefinition;
//# sourceMappingURL=utils.d.ts.map