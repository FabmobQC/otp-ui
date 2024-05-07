import { Anchor } from "mapbox-gl";
import { Company, Itinerary, Leg, TransitiveData } from "@opentripplanner/types";
import { IntlShape } from "react-intl";
export declare function getFromToAnchors(transitiveData: TransitiveData): {
    fromAnchor?: Anchor;
    toAnchor?: Anchor;
};
/**
 * Converts an OTP itinerary object to a transtive.js itinerary object.
 * @param {*} itin Required OTP itinerary (see @opentripplanner/core-utils/types#itineraryType) to convert.
 * @param {*} companies Optional list of companies, used for labeling vehicle rental locations.
 * @param {*} getRouteLabel Optional function that takes an itinerary leg (see @opentripplanner/core-utils/types#legType)
 *                          and returns a string representing the route label to display for that leg.
 * @returns An itinerary in the transitive.js format.
 */
export declare function itineraryToTransitive(itin: Itinerary, options: {
    companies?: Company[];
    getRouteLabel?: (leg: Leg) => string;
    disableFlexArc?: boolean;
    intl?: IntlShape;
}): TransitiveData;
declare const drawArc: (straight: any) => import("@turf/helpers").LineString;
export { drawArc };
declare const _default: {
    itineraryToTransitive: typeof itineraryToTransitive;
};
export default _default;
//# sourceMappingURL=util.d.ts.map