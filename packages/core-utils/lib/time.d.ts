import { Config } from "@opentripplanner/types";
export declare const OTP_API_DATE_FORMAT = "yyyy-MM-dd";
export declare const OTP_API_TIME_FORMAT = "HH:mm";
/**
 * Breaks up a duration in seconds into hours, minutes, and seconds.
 * @param {number} seconds The number of seconds to break up
 * @returns an object with fields with the corresponding, hours, minutes, seconds.
 */
export declare function toHoursMinutesSeconds(seconds: number): {
    hours: number;
    minutes: number;
    seconds: number;
};
/**
 * @param  {[type]} config the OTP config object found in store
 * @return {string}        the config-defined time formatter or HH:mm (24-hr time)
 */
export declare function getTimeFormat(config: Config): string;
export declare function getDateFormat(config: Config): string;
/** @deprecated */
export declare function getLongDateFormat(config: Config): string;
/**
 * Offsets a time according to the provided time options
 * and returns the result.
 */
export declare function offsetTime(ms: any, options: any): any;
/**
 * Formats a seconds after midnight value for display in narrative
 * @param  {number} seconds  time since midnight in seconds
 * @param  {string} timeFormat  A valid date-fns time format
 * @return {string}                   formatted text representation
 */
export declare function formatSecondsAfterMidnight(seconds: number, timeFormat: string): string;
/**
 * Uses Intl.DateTimeFormat() api to get the user's time zone. In a test
 * environment, pulls timezone information from an env variable. Default to
 * GMT+0 if the Intl API is unavailable.
 */
export declare function getUserTimezone(fallbackTimezone?: string): string;
/**
 * Formats current time for use in OTP query
 * The conversion to the user's timezone is needed for testing purposes.
 */
export declare function getCurrentTime(timezone?: string): string;
/**
 * Formats current date for use in OTP query
 * The conversion to the user's timezone is needed for testing purposes.
 */
export declare function getCurrentDate(timezone?: string): string;
//# sourceMappingURL=time.d.ts.map