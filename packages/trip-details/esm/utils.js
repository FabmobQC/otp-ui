import React from "react";
import { FormattedNumber } from "react-intl";
/**
 * Format text bold (used with FormattedMessage).
 */

export function boldText(contents) {
  return /*#__PURE__*/React.createElement("strong", null, contents);
}
/**
 * Render formatted fare.
 * @param currencyCode The ISO currency code to use (USD, GBP, EUR).
 * @param fare The fare value, in currency units, to be shown.
 * @returns The formatted fare value according to the selected locale.
 */

export function renderFare(currencyCode, fare) {
  return /*#__PURE__*/React.createElement(FormattedNumber, {
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