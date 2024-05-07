import { ReactElement, ReactNode } from "react";
/**
 * Format text bold (used with FormattedMessage).
 */
export declare function boldText(contents: ReactNode): ReactElement;
/**
 * Render formatted fare.
 * @param currencyCode The ISO currency code to use (USD, GBP, EUR).
 * @param fare The fare value, in currency units, to be shown.
 * @returns The formatted fare value according to the selected locale.
 */
export declare function renderFare(currencyCode: string, fare: number): ReactElement;
//# sourceMappingURL=utils.d.ts.map