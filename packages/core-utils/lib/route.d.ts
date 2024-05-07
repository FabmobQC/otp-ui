import { Leg, Route, TransitOperator } from "@opentripplanner/types";
/**
 * Returns the transit operator (if an exact match is found) from the transit
 * operators config value. It is critical to use both the feedId and agencyId in
 * this method because it is possible in OTP for there to be a duplicate
 * agencyId in separate feeds.
 *
 * @param  {string} feedId The feedId that this transit agency belongs to
 * @param  {string} agencyId The agencyId of the transit agency
 * @param  {array} transitOperators The transitOperators list from the config
 * @return {object} The transitOperator if a match was found or null if no match
 *    was found
 */
export declare function getTransitOperatorFromFeedIdAndAgencyId(feedId: string, agencyId: string | number, transitOperators: TransitOperator[]): TransitOperator;
/**
 * Looks up an operator from the provided leg.
 *
 * @param  {object} leg The Itinerary Leg from which to find the transit
 *    operator
 * @param  {object} transitOperators transitOperators from config.
 * @return {object} the operator if one was found or null if no match was found
 */
export declare function getTransitOperatorFromLeg(leg: Leg, transitOperators: TransitOperator[]): TransitOperator;
/**
 * Looks up an operator from the provided configuration given an OTP route.
 * NOTE: this assumes the use of the OTP Route model or a modified OTP
 * RouteShort model (such as the one found in the IBI fork of OTP) that also
 * returns the agencyId.
 *
 * @param  {object} route Either an OTP Route or RouteShort model
 * @param  {array} transitOperators transitOperators from config
 * @return {object} the operator if one was found or null if no match was found
 */
export declare function getTransitOperatorFromOtpRoute(route: Route, transitOperators: TransitOperator[]): TransitOperator;
/**
 * Checks whether an appropriate comparison of numeric values can be made for
 * sorting purposes. If both values are not valid numbers according to the
 * isNaN check, then this function returns undefined which indicates that a
 * secondary sorting criteria should be used instead. If one value is valid and
 * the other is not, then the valid value will be given sorting priority. If
 * both values are valid numbers, the difference is obtained as the sort value.
 *
 * An optional argument can be provided which will be used to obtain the
 * comparison value from the comparison function arguments.
 *
 * IMPORTANT: the comparison values must be numeric values or at least be
 * attempted to be converted to numeric values! If one of the arguments is
 * something crazy like an empty string, unexpected behavior will occur because
 * JavaScript.
 *
 * @param  {function} [objGetterFn] An optional function to obtain the
 *  comparison value from the comparator function arguments
 */
export declare function makeNumericValueComparator(objGetterFn?: (item: Route) => number): (a: number, b: number) => number;
/**
 * Create a comparator function that compares string values. The comparison
 * values feed to the sort comparator function are assumed to be objects that
 * will have either undefined, null or string values at the given key. If one
 * object has undefined, null or an empty string, but the other does have a
 * string with length > 0, then that string will get priority.
 *
 * @param  {function} [objGetterFn] An optional function to obtain the
 *  comparison value from the comparator function arguments
 */
export declare function makeStringValueComparator(objGetterFn?: (item: Route) => string): (a: string, b: string) => number;
/**
 * Creates a sort comparator function to compares routes for the purposes of
 * sorting and displaying in a user interface. This takes in a single optional
 * argument which should be a list of transitOperators as defined in the config
 * file. Due to GTFS feeds having varying levels of data quality, a multi-
 * criteria sort is needed to account for various differences. The criteria
 * included here are each applied to the routes in the order listed. If a given
 * sort criterion yields equivalence (e.g., two routes have the short name
 * "20"), the comparator falls back onto the next sort criterion (e.g., long
 * name). The sort operates on the following values (in order):
 *
 *  1. Transit Operator. The transit operator will be attempted to be obtained
 *    for each route. If no argument is provided when creating this comparator
 *    function, then routes will be sorted by their agency's name. If an
 *    argument is provided and a match is found based off of the route's feed_id
 *    and agency_id and a transitOperator's feed_id and agency_id, then the
 *    field transitOperator.order will be used as the comparator value as long
 *    as it is numeric. If it is not numeric, a value is returned indicating
 *    that this transit operator should be placed at the end of the list.
 *  2. sortOrder. Routes that do not have a valid sortOrder will be placed
 *    beneath those that do.
 *  3. route type (OTP mode). See routeTypeComparator code for prioritization of
 *    route types.
 *  4. shortNames that begin with alphabetic characters. shortNames that do not
 *    start with alphabetic characters will be place beneath those that do.
 *  5. shortName as integer. shortNames that cannot be parsed as integers will
 *    be placed beneath those that are valid.
 *  6. shortName as string. Routes without shortNames will be placed beneath
 *    those with shortNames.
 *  7. longName as string.
 */
export declare function makeRouteComparator(transitOperators: TransitOperator[]): (a: number, b: number) => number;
/**
 * Tests if a pair of colors is readable. If it is, that readable color is returned.
 * If it is not, a more appropriate alternative is returned.
 *
 * Uses algorithm based on combined luminance. Values have been derived from
 * looking at real agency color pairings. These pairings are difficult to
 * generate for, as some colors see both white and black used by different agencies.
 *
 * This method therefore can accept multiple colors (including black and white) for the same background color.
 *
 * @param backgroundColor     A hex string, usually the "routeColor"
 * @param proposedTextColor   A hex string, usually the "routeTextColor"
 */
export declare function getMostReadableTextColor(backgroundColor: string, proposedTextColor?: string): string;
//# sourceMappingURL=route.d.ts.map