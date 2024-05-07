"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boldText = boldText;
exports.renderFare = renderFare;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

/**
 * Format text bold (used with FormattedMessage).
 */
function boldText(contents) {
  return /*#__PURE__*/_react.default.createElement("strong", null, contents);
}
/**
 * Render formatted fare.
 * @param currencyCode The ISO currency code to use (USD, GBP, EUR).
 * @param fare The fare value, in currency units, to be shown.
 * @returns The formatted fare value according to the selected locale.
 */


function renderFare(currencyCode, fare) {
  return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedNumber, {
    currency: currencyCode // For dollars in locales such as 'fr',
    // this will limit the display to just the dollar sign
    // (otherwise it will render e.g. '2,50 $US' instead of '2,50 $').
    ,
    currencyDisplay: "narrowSymbol",
    value: fare // eslint-disable-next-line react/style-prop-object
    ,
    style: "currency"
  });
}
//# sourceMappingURL=utils.js.map