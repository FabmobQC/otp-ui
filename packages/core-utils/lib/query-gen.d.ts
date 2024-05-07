import { LonLatOutput } from "@conveyal/lonlat";
import { ModeSetting, TransportMode } from "@opentripplanner/types";
declare type InputBanned = {
    routes?: string;
    agencies?: string;
    trips?: string;
    stops?: string;
    stopsHard?: string;
};
declare type InputPreferred = {
    routes?: string;
    agencies?: string;
    unpreferredCost?: string;
};
declare type OTPQueryParams = {
    arriveBy: boolean;
    date?: string;
    from: LonLatOutput & {
        name?: string;
    };
    modes: TransportMode[];
    modeSettings: ModeSetting[];
    time?: string;
    numItineraries?: number;
    to: LonLatOutput & {
        name?: string;
    };
    banned?: InputBanned;
    preferred?: InputPreferred;
};
declare type GraphQLQuery = {
    query: string;
    variables: Record<string, unknown>;
};
/**
 * Mode Settings can contain additional modes to add to the query,
 * this function extracts those additional modes from the settings
 * and returns them in an array.
 * @param modeSettings List of mode settings with values populated
 * @returns Additional transport modes to add to query
 */
export declare function extractAdditionalModes(modeSettings: ModeSetting[], enabledModes: TransportMode[]): TransportMode[];
/**
 * This constant maps all the transport mode to a broader mode type,
 * which is used to determine the valid combinations of modes used in query generation.
 */
export declare const SIMPLIFICATIONS: {
    AIRPLANE: string;
    BICYCLE: string;
    BUS: string;
    CABLE_CAR: string;
    CAR: string;
    FERRY: string;
    FLEX: string;
    FUNICULAR: string;
    GONDOLA: string;
    RAIL: string;
    SCOOTER: string;
    SUBWAY: string;
    TROLLEYBUS: string;
    TRAM: string;
    TRANSIT: string;
    WALK: string;
};
export declare const TRANSIT_SUBMODES: string[];
export declare const TRANSIT_SUBMODES_AND_TRANSIT: string[];
/**
 * Generates a list of queries for OTP to get a comprehensive
 * set of results based on the modes input.
 * @param params OTP Query Params
 * @returns Set of parameters to generate queries
 */
export declare function generateCombinations(params: OTPQueryParams): OTPQueryParams[];
/**
 * Generates a query for OTP GraphQL API based on parameters.
 * @param param0 OTP2 Parameters for the query
 * @param planQuery Override the default query for OTP
 * @returns A fully formed query+variables ready to be sent to GraphQL backend
 */
export declare function generateOtp2Query({ arriveBy, banned, date, from, modes, modeSettings, numItineraries, preferred, time, to }: OTPQueryParams, planQuery?: import("graphql").DocumentNode): GraphQLQuery;
export {};
//# sourceMappingURL=query-gen.d.ts.map