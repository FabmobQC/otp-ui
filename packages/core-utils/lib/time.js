"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHoursMinutesSeconds = toHoursMinutesSeconds;
exports.getTimeFormat = getTimeFormat;
exports.getDateFormat = getDateFormat;
exports.getLongDateFormat = getLongDateFormat;
exports.offsetTime = offsetTime;
exports.formatSecondsAfterMidnight = formatSecondsAfterMidnight;
exports.getUserTimezone = getUserTimezone;
exports.getCurrentTime = getCurrentTime;
exports.getCurrentDate = getCurrentDate;
exports.OTP_API_TIME_FORMAT = exports.OTP_API_DATE_FORMAT = void 0;

var _dateFns = require("date-fns");

var _dateFnsTz = require("date-fns-tz");

// Date/time formats (per date-fns) when sending/receiving date from OTP
// regardless of whatever the user has configured as the display format.
const OTP_API_DATE_FORMAT = "yyyy-MM-dd";
exports.OTP_API_DATE_FORMAT = OTP_API_DATE_FORMAT;
const OTP_API_TIME_FORMAT = "HH:mm";
/**
 * Breaks up a duration in seconds into hours, minutes, and seconds.
 * @param {number} seconds The number of seconds to break up
 * @returns an object with fields with the corresponding, hours, minutes, seconds.
 */

exports.OTP_API_TIME_FORMAT = OTP_API_TIME_FORMAT;

function toHoursMinutesSeconds(seconds) {
  return {
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60
  };
}
/**
 * @param  {[type]} config the OTP config object found in store
 * @return {string}        the config-defined time formatter or HH:mm (24-hr time)
 */


function getTimeFormat(config) {
  var _config$dateTime;

  return (config === null || config === void 0 ? void 0 : (_config$dateTime = config.dateTime) === null || _config$dateTime === void 0 ? void 0 : _config$dateTime.timeFormat) || OTP_API_TIME_FORMAT;
}

function getDateFormat(config) {
  var _config$dateTime2;

  return (config === null || config === void 0 ? void 0 : (_config$dateTime2 = config.dateTime) === null || _config$dateTime2 === void 0 ? void 0 : _config$dateTime2.dateFormat) || OTP_API_DATE_FORMAT;
}
/** @deprecated */


function getLongDateFormat(config) {
  var _config$dateTime3;

  return (config === null || config === void 0 ? void 0 : (_config$dateTime3 = config.dateTime) === null || _config$dateTime3 === void 0 ? void 0 : _config$dateTime3.longDateFormat) || "D MMMM YYYY";
}
/**
 * Offsets a time according to the provided time options
 * and returns the result.
 */


function offsetTime(ms, options) {
  return ms + ((options === null || options === void 0 ? void 0 : options.offset) || 0);
}
/**
 * Formats a seconds after midnight value for display in narrative
 * @param  {number} seconds  time since midnight in seconds
 * @param  {string} timeFormat  A valid date-fns time format
 * @return {string}                   formatted text representation
 */


function formatSecondsAfterMidnight(seconds, timeFormat) {
  const time = (0, _dateFns.add)((0, _dateFns.startOfDay)(new Date()), {
    seconds
  });
  return (0, _dateFns.format)(time, timeFormat);
}
/**
 * Uses Intl.DateTimeFormat() api to get the user's time zone. In a test
 * environment, pulls timezone information from an env variable. Default to
 * GMT+0 if the Intl API is unavailable.
 */


function getUserTimezone(fallbackTimezone = "Etc/Greenwich") {
  var _Intl;

  if (process.env.NODE_ENV === "test") return process.env.TZ;
  return ((_Intl = Intl) === null || _Intl === void 0 ? void 0 : _Intl.DateTimeFormat().resolvedOptions().timeZone) || fallbackTimezone;
}
/**
 * Formats current time for use in OTP query
 * The conversion to the user's timezone is needed for testing purposes.
 */


function getCurrentTime(timezone = getUserTimezone()) {
  return (0, _dateFns.format)((0, _dateFnsTz.utcToZonedTime)(Date.now(), timezone), OTP_API_TIME_FORMAT);
}
/**
 * Formats current date for use in OTP query
 * The conversion to the user's timezone is needed for testing purposes.
 */


function getCurrentDate(timezone = getUserTimezone()) {
  return (0, _dateFns.format)((0, _dateFnsTz.utcToZonedTime)(Date.now(), timezone), OTP_API_DATE_FORMAT);
}
//# sourceMappingURL=time.js.map