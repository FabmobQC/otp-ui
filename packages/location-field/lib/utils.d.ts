import { IntlShape } from "react-intl";
import { Properties, Label, UserLocationRenderData } from "./types";
/**
 * Given a GeoJSON property with a layer, this method will use the layerDisplayMap
 * to generate an appropriate title subtitle pair, or return the label if the layer is
 * unknown.
 */
export declare const generateLabel: (properties: Properties) => Label;
/**
 * Generates a combined label from main and secondary for display in the main input field
 */
export declare const getCombinedLabel: (properties: Properties) => string;
/**
 * Helper method to append text in parentheses to some other text,
 * if the added text is not null or blank.
 */
export declare const addInParentheses: (intl: IntlShape, mainText: string, extraText?: string) => string;
/**
 * Helper function to assemble a geocoder error message.
 */
export declare const getGeocoderErrorMessage: (intl: IntlShape, errorText?: string) => string;
/**
 * Helper to compute matching user locations as you type.
 */
export declare function getMatchingLocations(places: UserLocationRenderData[], text: string): UserLocationRenderData[];
//# sourceMappingURL=utils.d.ts.map