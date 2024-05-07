"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AlertsBody;

var _dateFns = require("date-fns");

var _dateFnsTz = require("date-fns-tz");

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var S = _interopRequireWildcard(require("../styled"));

var _util = require("../util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  getUserTimezone,
  getCurrentDate
} = _coreUtils.default.time;

/**
 * Displays today/yesterday/tomorrow in the correct language.
 */
function AlertDay({
  dayDiff
}) {
  switch (dayDiff) {
    case -1:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.TransitLegBody.AlertsBody.yesterday"],
        description: "Yesterday",
        id: "otpUi.TransitLegBody.AlertsBody.yesterday"
      });

    case 0:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.TransitLegBody.AlertsBody.today"],
        description: "Today",
        id: "otpUi.TransitLegBody.AlertsBody.today"
      });

    case 1:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.TransitLegBody.AlertsBody.tomorrow"],
        description: "Tomorrow",
        id: "otpUi.TransitLegBody.AlertsBody.tomorrow"
      });

    default:
      // Not used.
      return null;
  }
}

function AlertsBody({
  alerts,
  AlertIcon = S.DefaultAlertBodyIcon,
  timeZone = getUserTimezone()
}) {
  if (typeof alerts !== "object") return null;
  return /*#__PURE__*/_react.default.createElement(S.TransitAlerts, null, alerts.sort((a, b) => b.effectiveStartDate - a.effectiveStartDate).map(({
    alertDescriptionText: description,
    alertHeaderText: header,
    alertUrl,
    effectiveStartDate
  }, i) => {
    // If alert is effective as of +/- one day, use today, tomorrow, or
    // yesterday with time. Otherwise, use long date format.
    // The difference is expressed in calendar days based on the agency's time zone.
    // Note: Previously, we used moment.diff(..., "days"), which reports the number of whole 24-hour periods
    // between two timestamps/dates (not considering timezones or daylight time changes).
    const today = (0, _dateFnsTz.toDate)(getCurrentDate(timeZone));
    const compareDate = (0, _dateFnsTz.utcToZonedTime)(new Date(effectiveStartDate), timeZone);
    const dayDiff = (0, _dateFns.differenceInCalendarDays)(compareDate, today);
    return /*#__PURE__*/_react.default.createElement(S.TransitAlert, {
      key: i,
      href: alertUrl
    }, /*#__PURE__*/_react.default.createElement(S.TransitAlertIconContainer, null, /*#__PURE__*/_react.default.createElement(AlertIcon, null)), header && /*#__PURE__*/_react.default.createElement(S.TransitAlertHeader, null, header), /*#__PURE__*/_react.default.createElement(S.TransitAlertBody, null, description), /*#__PURE__*/_react.default.createElement(S.TransitAlertEffectiveDate, null, Math.abs(dayDiff) <= 1 ? /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: _util.defaultMessages["otpUi.TransitLegBody.AlertsBody.effectiveTimeAndDate"],
      description: "Text with the time and date an alert takes effect",
      id: "otpUi.TransitLegBody.AlertsBody.effectiveTimeAndDate",
      values: {
        dateTime: effectiveStartDate * 1000,
        day: /*#__PURE__*/_react.default.createElement(AlertDay, {
          dayDiff: dayDiff
        })
      }
    }) : /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: _util.defaultMessages["otpUi.TransitLegBody.AlertsBody.effectiveDate"],
      description: "Text with the date an alert takes effect",
      id: "otpUi.TransitLegBody.AlertsBody.effectiveDate",
      values: {
        dateTime: effectiveStartDate * 1000
      }
    })));
  }));
}
//# sourceMappingURL=alerts-body.js.map