import { Company, Config, ElevationProfile, FlexBookingInfo, ItineraryOnlyLegsRequired, LatLngArray, Leg, MassUnitOption, Money, Place, Step, Stop, TncFare } from "@opentripplanner/types";
export declare const transitModes: string[];
/**
 * @param  {config} config OTP-RR configuration object
 * @return {Array}  List of all transit modes defined in config; otherwise default mode list
 */
export declare function getTransitModes(config: Config): string[];
export declare function isTransit(mode: string): boolean;
/**
 * Returns true if the leg pickup rules enabled which require
 * calling ahead for the service to run. "mustPhone" is the only
 * property which encodes this info.
 */
export declare function isReservationRequired(leg: Leg): boolean;
/**
 * Returns true if a user must ask the driver to let the user off
 * or if the user must flag the driver down for pickup.
 * "coordinateWithDriver" in board/alight rule encodes this info.
 */
export declare function isCoordinationRequired(leg: Leg): boolean;
/**
 * The two rules checked by the above two functions are the only values
 * returned by OTP when a leg is a flex leg.
 */
export declare function isFlex(leg: Leg): boolean;
export declare function isAdvanceBookingRequired(info: FlexBookingInfo): boolean;
export declare function legDropoffRequiresAdvanceBooking(leg: Leg): boolean;
export declare function isRideshareLeg(leg: Leg): boolean;
export declare function isWalk(mode: string): boolean;
export declare function isBicycle(mode: string): boolean;
export declare function isBicycleRent(mode: string): boolean;
export declare function isCar(mode: string): boolean;
export declare function isMicromobility(mode: string): boolean;
export declare function isAccessMode(mode: string): boolean;
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes are transit modes
 */
export declare function hasTransit(modesStr: string): boolean;
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes are car-based modes
 */
export declare function hasCar(modesStr: string): boolean;
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes are bicycle-based modes
 */
export declare function hasBike(modesStr: string): boolean;
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes are micromobility-based modes
 */
export declare function hasMicromobility(modesStr: string): boolean;
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes is a hailing mode
 */
export declare function hasHail(modesStr: string): boolean;
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes is a rental mode
 */
export declare function hasRental(modesStr: string): boolean;
export declare function getMapColor(mode: string): string;
export declare function toSentenceCase(str: string): string;
/**
 * Derive the company string based on mode and network associated with leg.
 */
export declare function getCompanyFromLeg(leg: Leg): string;
export declare function getItineraryBounds(itinerary: ItineraryOnlyLegsRequired): LatLngArray[];
/**
 * Return a coords object that encloses the given leg's geometry.
 */
export declare function getLegBounds(leg: Leg): number[][];
export declare function legLocationAtDistance(leg: Leg, distance: number): number[];
export declare function legElevationAtDistance(points: number[][], distance: number): number;
export declare function getElevationProfile(steps: Step[], unitConversion?: number): ElevationProfile;
/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {string} text The text to be rendered.
 * @param {string} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
export declare function getTextWidth(text: string, font?: string): number;
/**
 * Get the configured company object for the given network string if the company
 * has been defined in the provided companies array config.
 */
export declare function getCompanyForNetwork(networkString: string, companies?: Company[]): Company;
/**
 * Get a string label to display from a list of vehicle rental networks.
 *
 * @param  {Array<string>} networks  A list of network ids.
 * @param  {Array<object>}  [companies=[]] An optional list of the companies config.
 * @return {string}  A label for use in presentation on a website.
 */
export declare function getCompaniesLabelFromNetworks(networks: string[], companies?: Company[]): string;
export declare function getTNCLocation(leg: Leg, type: string): string;
export declare function calculatePhysicalActivity(itinerary: ItineraryOnlyLegsRequired): {
    bikeDuration: number;
    caloriesBurned: number;
    walkDuration: number;
};
/**
 * For an itinerary, calculates the TNC fares and returns an object with
 * these values and currency info.
 * It is assumed that the same currency is used for all TNC legs.
 */
export declare function calculateTncFares(itinerary: ItineraryOnlyLegsRequired): TncFare;
/**
 * @param {itinerary} itinerary OTP trip itinierary, only legs is required.
 * @param {carbonIntensity} carbonIntensity carbon intensity by mode in grams/meter
 * @param {units} units units to be used in return value
 * @return Amount of carbon in chosen unit
 */
export declare function calculateEmissions(itinerary: ItineraryOnlyLegsRequired, carbonIntensity?: Record<string, number>, units?: MassUnitOption): number;
/**
 * Returns the user-facing stop id to display for a stop or place, using the following priority:
 * 1. stop code,
 * 2. stop id without the agency id portion, if stop id contains an agency portion,
 * 3. stop id, whether null or not (this is the fallback case).
 */
export declare function getDisplayedStopId(placeOrStop: Place | Stop): string;
/**
 * Extracts useful data from the fare products on a leg, such as the leg cost and transfer info.
 * @param leg Leg with fare products (must have used getLegsWithFares)
 * @param category Rider category
 * @param container Fare container (cash, electronic)
 * @returns Object containing price as well as the transfer discount amount, if a transfer was used.
 */
export declare function getLegCost(leg: Leg, mediumId: string | null, riderCategoryId: string | null): {
    price?: Money;
    transferAmount?: Money | undefined;
    productUseId?: string;
};
/**
 * Returns the total itinerary cost for a given set of legs.
 * @param legs Itinerary legs with fare products (must have used getLegsWithFares)
 * @param category Rider category (youth, regular, senior)
 * @param container Fare container (cash, electronic)
 * @returns Money object for the total itinerary cost.
 */
export declare function getItineraryCost(legs: Leg[], mediumId: string | null, riderCategoryId: string | null): Money | undefined;
export declare const convertGraphQLResponseToLegacy: (leg: any) => any;
/** Extracts the route number for a leg returned from OTP1 or OTP2. */
export declare const getLegRouteShortName: (leg: Pick<Leg, "route" | "routeShortName">) => string | null;
/** Extract the route long name for a leg returned from OTP1 or OTP2. */
export declare const getLegRouteLongName: (leg: Pick<Leg, "route" | "routeLongName">) => string | null;
/**
 * Returns the route short name, or the route long name if no short name is provided.
 * This is happens with Seattle area streetcars and ferries.
 */
export declare const getLegRouteName: (leg: Pick<Leg, "route" | "routeLongName" | "routeShortName">) => string;
//# sourceMappingURL=itinerary.d.ts.map