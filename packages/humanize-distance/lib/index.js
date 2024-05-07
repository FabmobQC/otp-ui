"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.humanizeDistanceStringImperial = humanizeDistanceStringImperial;
exports.humanizeDistanceStringMetric = humanizeDistanceStringMetric;
exports.humanizeDistanceString = humanizeDistanceString;

function roundToOneDecimalPlace(number) {
  return Math.round(number * 10) / 10;
}

function humanizeDistanceStringImperial(meters, abbreviate, intl) {
  const feet = meters * 3.28084;
  let unit = "mile";
  let unitIfNoIntl = abbreviate ? "mi" : "miles";
  let value = roundToOneDecimalPlace(feet / 5280);

  if (feet < 528) {
    unit = "foot";
    unitIfNoIntl = abbreviate ? "ft" : "feet";
    value = Math.round(feet);
  }

  return intl ? intl.formatNumber(value, {
    style: "unit",
    unit,
    unitDisplay: abbreviate ? "short" : "long"
  }) : `${value} ${unitIfNoIntl}`;
}

function humanizeDistanceStringMetric(meters, intl) {
  const km = meters / 1000;
  let unit = "meter";
  let shortUnit = "m";
  let value = Math.round(meters);

  if (km > 1) {
    unit = "kilometer";
    shortUnit = "km";
    value = km > 100 ? // 100 km and over
    Math.round(km) : // 1.1 km => 99.9 km
    roundToOneDecimalPlace(km);
  }

  return intl ? intl.formatNumber(value, {
    style: "unit",
    unit,
    unitDisplay: "short"
  }) : `${value} ${shortUnit}`;
}

function humanizeDistanceString(meters, outputMetricUnits = false, intl) {
  return outputMetricUnits ? humanizeDistanceStringMetric(meters, intl) : humanizeDistanceStringImperial(meters, null, intl);
}
//# sourceMappingURL=index.js.map