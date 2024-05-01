import _typeof from "@babel/runtime/helpers/typeof";
import { differenceInCalendarDays } from "date-fns";
import { toDate, utcToZonedTime } from "date-fns-tz";
import coreUtils from "@opentripplanner/core-utils";
import React from "react";
import { FormattedMessage } from "react-intl";
import * as S from "../styled";
import { defaultMessages } from "../util";
var _coreUtils$time = coreUtils.time,
    getUserTimezone = _coreUtils$time.getUserTimezone,
    getCurrentDate = _coreUtils$time.getCurrentDate;

/**
 * Displays today/yesterday/tomorrow in the correct language.
 */
function AlertDay(_ref) {
  var dayDiff = _ref.dayDiff;

  switch (dayDiff) {
    case -1:
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TransitLegBody.AlertsBody.yesterday"],
        description: "Yesterday",
        id: "otpUi.TransitLegBody.AlertsBody.yesterday"
      });

    case 0:
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TransitLegBody.AlertsBody.today"],
        description: "Today",
        id: "otpUi.TransitLegBody.AlertsBody.today"
      });

    case 1:
      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TransitLegBody.AlertsBody.tomorrow"],
        description: "Tomorrow",
        id: "otpUi.TransitLegBody.AlertsBody.tomorrow"
      });

    default:
      // Not used.
      return null;
  }
}

export default function AlertsBody(_ref2) {
  var alerts = _ref2.alerts,
      _ref2$AlertIcon = _ref2.AlertIcon,
      AlertIcon = _ref2$AlertIcon === void 0 ? S.DefaultAlertBodyIcon : _ref2$AlertIcon,
      _ref2$timeZone = _ref2.timeZone,
      timeZone = _ref2$timeZone === void 0 ? getUserTimezone() : _ref2$timeZone;
  if (_typeof(alerts) !== "object") return null;
  return /*#__PURE__*/React.createElement(S.TransitAlerts, null, alerts.sort(function (a, b) {
    return b.effectiveStartDate - a.effectiveStartDate;
  }).map(function (_ref3, i) {
    var description = _ref3.alertDescriptionText,
        header = _ref3.alertHeaderText,
        alertUrl = _ref3.alertUrl,
        effectiveStartDate = _ref3.effectiveStartDate;
    // If alert is effective as of +/- one day, use today, tomorrow, or
    // yesterday with time. Otherwise, use long date format.
    // The difference is expressed in calendar days based on the agency's time zone.
    // Note: Previously, we used moment.diff(..., "days"), which reports the number of whole 24-hour periods
    // between two timestamps/dates (not considering timezones or daylight time changes).
    var today = toDate(getCurrentDate(timeZone));
    var compareDate = utcToZonedTime(new Date(effectiveStartDate), timeZone);
    var dayDiff = differenceInCalendarDays(compareDate, today);
    return /*#__PURE__*/React.createElement(S.TransitAlert, {
      key: i,
      href: alertUrl
    }, /*#__PURE__*/React.createElement(S.TransitAlertIconContainer, null, /*#__PURE__*/React.createElement(AlertIcon, null)), header && /*#__PURE__*/React.createElement(S.TransitAlertHeader, null, header), /*#__PURE__*/React.createElement(S.TransitAlertBody, null, description), /*#__PURE__*/React.createElement(S.TransitAlertEffectiveDate, null, Math.abs(dayDiff) <= 1 ? /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TransitLegBody.AlertsBody.effectiveTimeAndDate"],
      description: "Text with the time and date an alert takes effect",
      id: "otpUi.TransitLegBody.AlertsBody.effectiveTimeAndDate",
      values: {
        dateTime: effectiveStartDate * 1000,
        day: /*#__PURE__*/React.createElement(AlertDay, {
          dayDiff: dayDiff
        })
      }
    }) : /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TransitLegBody.AlertsBody.effectiveDate"],
      description: "Text with the date an alert takes effect",
      id: "otpUi.TransitLegBody.AlertsBody.effectiveDate",
      values: {
        dateTime: effectiveStartDate * 1000
      }
    })));
  }));
}
//# sourceMappingURL=alerts-body.js.map