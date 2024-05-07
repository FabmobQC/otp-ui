import { Company, Place } from "@opentripplanner/types";
import { IntlShape } from "react-intl";
export declare const defaultMessages: Record<string, string>;
/**
 * the GTFS spec indicates that the route color should not have a leading hash
 * symbol, so add one if the routeColor exists and doesn't start with a hash
 * symbol.
 */
export declare const toSafeRouteColor: (routeColor: string) => string;
export declare const toModeColor: (mode: string, routeColor: string) => string;
export declare const toModeBorderColor: (mode: string, routeColor: string) => string;
export declare const toModeBorder: (mode: string, routeColor: string) => string;
/**
 * Gets a localized version of a vehicle type.
 */
export declare function getVehicleType(type: string, intl: IntlShape): string;
/**
 * Generates a new place name for micromobility stations
 * @param place OTP Place from micromobility location
 * @param companies Configured micromobility companies
 * @param intl IntlShape object
 * @returns User facing string for place
 */
export declare function getPlaceName(place: Place, companies?: Company[], intl?: IntlShape): string;
export declare const parseOTP2Minute: (otp2Minute: string) => string;
//# sourceMappingURL=util.d.ts.map