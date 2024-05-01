/**
 * This file contains type definitions for types
 * used across more than one package in this repo.
 */
import React, { FunctionComponent, ReactElement } from "react";
import { StyledIcon } from "@styled-icons/styled-icon";
import { ConfiguredModes } from "./deprecated";
declare type ZeroOrOne = 0 | 1;
/**
 * Shape for a transportation company.
 */
export declare type Company = {
    id: string;
    label: string;
    /** a comma-separated string listing the modes that this company has */
    modes: string;
    /**
     * tells OTP UI to ignore the API provided station names
     * and instead use generic ones.
     */
    overridePlaceNames?: boolean;
};
/**
 * Describes some options to help display data about a transit agency that is
 * configured in an opentripplanner instance.
 */
export declare type TransitOperator = {
    agencyId: string;
    defaultRouteColor?: string;
    defaultRouteTextColor?: string;
    feedId: string;
    logo?: string;
    longNameSplitter?: string;
    name?: string;
    order?: number;
};
/**
 * Describes a map entity to be rendered.
 */
export declare type LayerEntity = {
    id: string;
    lat: number;
    lon: number;
};
export declare type SymbolComponentBaseProps = {
    entity: LayerEntity;
    zoom: number;
};
/**
 * The symbol-representing component to draw; with the signature
 * ({ entity: object; zoom: number }) => Element
 * where entity must have an id attribute and contain coordinates information for placement on the map.
 */
export declare type SymbolComponent = React.ComponentType<SymbolComponentBaseProps>;
/**
 * Defines which symbol to render based on a zoom level; and optionally by entity type.
 * (Only one symbol is rendered for any zoom level.)
 */
export declare type ZoomBasedSymbol = {
    /**
     * A function with the signature (entity: object) => string
     * that determines the type of an entity.
     * symbolByType and getType must be either be both specified or both omitted.
     */
    getType?: (entity: LayerEntity) => string;
    /**
     * The zoom level beginning at which the marker is drawn;
     * unless another marker with a higher minZoom is met.
     */
    minZoom: number;
    /**
     * The symbol-representing component to draw; with the signature
     * ({ entity: object; zoom: number }) => Element
     * where entity must have an id attribute and contain coordinates information for placement on the map.
     */
    symbol: SymbolComponent;
    /**
     * The symbol-representing component to draw for each entity type;
     * with the same signature as symbol. If a type returned by getType() is not listed;
     * then the component defined in the 'symbol' attribute will be rendered by default.
     * symbolByType and getType must be either be both specified or both omitted.
     */
    symbolByType?: {
        [name: string]: SymbolComponent;
    };
};
/**
 * Describes the objects from the real-time vehicle service.
 */
export declare type TransitVehicle = {
    routeShortName?: string;
    routeLongName?: string;
    routeType?: string;
    routeColor?: string;
    status?: string;
    reportDate?: string;
    seconds?: number;
    stopSequence?: number;
    stopId?: string;
    vehicleId?: string;
    tripId?: string;
    blockId?: string;
    lat?: number;
    lon?: number;
    heading?: number;
};
export declare type OTPTransitVehicle = TransitVehicle & {
    label?: string;
    nextStopName?: string;
    speed?: number;
    stopStatus?: string;
};
export declare type VehicleRentalMapOverlaySymbol = {
    dockStrokeColor?: string;
    fillColor?: string;
    minZoom: number;
    pixels?: number;
    type: string;
} | ZoomBasedSymbol;
/**
 * Represents the expected configuration of the webapp.
 *
 * Note: this is an incomplete type mapping.
 */
export declare type Config = {
    companies?: Company[];
    dateTime: {
        timeFormat?: string;
        dateFormat?: string;
        /** @deprecated */
        longDateFormat?: string;
    };
    homeTimezone: string;
    /** @deprecated */
    modes?: ConfiguredModes;
    map?: {
        overlays?: {
            /**
             * The applicable companies this overlay covers. Only applicable in
             * certain vehicle rental overlays.
             */
            companies?: string[];
            name: string;
            /**
             * The applicable map symbols. Only applicable in vehicle rental
             * overlays.
             */
            mapSymbols?: VehicleRentalMapOverlaySymbol[];
            /**
             * Only used during park and ride queries. This will filter out P&Rs
             * that are further than the specified number of meters from a transit
             * stop.
             */
            maxTransitDistance?: number;
            /**
             * The applicable modes this overlay covers. Only applicable in certain
             * vehicle rental overlays.
             */
            modes?: string[];
            /**
             * The type of overlay. Currently valid values include:
             *
             * "bike-rental"; "car-rental"; "micromobility-rental"; "park-and-ride";
             * "stops"; "tile"
             */
            type: string;
        }[];
    };
    transitOperators?: TransitOperator[];
};
export declare type EncodedPolyline = {
    length: number;
    points: string;
};
export declare type ElevationData = {
    first: number;
    second: number;
}[];
export declare type Alert = {
    alertHeaderText?: string;
    alertDescriptionText?: string;
    alertUrl?: string;
    effectiveStartDate?: number;
    /** Returned by OTP2 graphql queries, but not by OTP1 */
    id?: string;
};
/**
 * Represents steps in a leg in an itinerary of an OTP plan response. These are
 * only for non-transit modes.
 * See documentation here: http://otp-docs.ibi-transit.com/api/json_WalkStep.html
 */
export declare type Step = {
    absoluteDirection?: string;
    alerts?: Alert[];
    area: boolean;
    bogusName: boolean;
    distance: number;
    elevation: ElevationData;
    lat: number;
    lon: number;
    relativeDirection: string;
    stayOn: boolean;
    streetName: string;
};
/**
 * Describe an origin, destination, or intermediate location in an itinerary.
 */
export declare type Place = {
    address?: string;
    arrival?: number;
    bikeShareId?: string;
    departure?: number;
    lat: number;
    lon: number;
    name: string;
    networks?: string[];
    rentalVehicle?: {
        network: string;
    };
    stop?: Stop;
    /**
     * @deprecated Only for OTP1 support, removal is immenent
     */
    stopCode?: string;
    /**
     * @deprecated Only for OTP1 support, removal is immenent
     */
    stopId?: string;
    /**
     * @deprecated Only for OTP1 support, removal is immenent
     */
    stopIndex?: number;
    /**
     * @deprecated Only for OTP1 support, removal is immenent
     */
    stopSequence?: number;
    vertexType: string;
    zoneId?: string;
};
/**
 * Holds contact info and lead time for flex transit bookings.
 * The information is optional and is for reminding the end-user
 * of any advance reservations required prior to travel.
 */
export declare type FlexBookingInfo = {
    contactInfo?: {
        phoneNumber: string;
    };
    latestBookingTime?: {
        daysPrior: number;
    };
    message?: string;
};
/** Dropoff-specific flex booking information */
declare type FlexDropOffBookingInfo = {
    dropOffMessage?: string;
} & FlexBookingInfo;
/** Pickup-specific flex booking information */
declare type FlexPickupBookingInfo = {
    pickupMessage?: string;
} & FlexBookingInfo;
/** Basic transit route attributes */
interface BasicRouteInfo {
    color?: string;
    id: string;
    longName?: string;
    shortName: string;
    textColor?: string;
    type?: number;
}
/** Transit route attributes from itinerary legs */
export declare type LegRoute = BasicRouteInfo & {
    alerts?: Alert[];
};
/**
 * Represents a leg in an itinerary of an OTP plan response. Each leg represents
 * a portion of the overall itinerary that is done until either reaching the
 * destination or transitioning to another mode of travel. See OTP webservice
 * documentation here:
 * http://otp-docs.ibi-transit.com/api/json_Leg.html
 */
export declare type Leg = {
    accessibilityScore?: number;
    agencyBrandingUrl?: string;
    agencyId?: string;
    agencyName?: string;
    agencyTimeZoneOffset: number;
    agencyUrl?: string;
    alerts?: Alert[];
    boardRule?: string;
    alightRule?: string;
    arrivalDelay: number;
    averageWait?: number;
    departureDelay: number;
    distance: number;
    dropOffBookingInfo?: FlexDropOffBookingInfo;
    duration: number;
    endTime: number;
    fareProducts?: {
        id: string;
        product: FareProduct;
    }[];
    from: Place;
    headsign?: string;
    interlineWithPreviousLeg: boolean;
    intermediateStops: Place[];
    interStopGeometry?: EncodedPolyline[];
    legGeometry: EncodedPolyline;
    mode: string;
    pathway: boolean;
    pickupBookingInfo?: FlexPickupBookingInfo;
    rideHailingEstimate?: {
        provider: {
            id: string;
        };
        arrival: string;
        minPrice: TemporaryTNCPriceType;
        maxPrice: TemporaryTNCPriceType;
        productName?: string;
    };
    realTime: boolean;
    rentedBike: boolean;
    rentedCar: boolean;
    rentedVehicle: boolean;
    route?: string | LegRoute;
    routeColor?: string;
    routeId?: string;
    routeLongName?: string;
    routeShortName?: string;
    routeTextColor?: string;
    routeType?: number;
    serviceDate?: string;
    startTime: number | string;
    steps: Step[];
    to: Place;
    transitLeg: boolean;
    trip?: {
        arrivalStoptime?: TripStopTime;
        departureStoptime?: TripStopTime;
        gtfsId?: string;
        id: string;
        tripHeadsign?: string;
    };
    tripBlockId?: string;
    tripId?: string;
    walkingBike?: boolean;
};
declare type TripStopTime = {
    stopPosition: number;
    stop: {
        gtfsId: string;
        id: string;
    };
};
declare type TemporaryTNCPriceType = {
    currency: {
        code: string;
    };
    amount: number;
};
/**
 * Describes the cost of an itinerary leg.
 */
export declare type Money = {
    amount: number;
    currency: {
        code: string;
        digits: number;
    };
};
/**
 * Represents an itinerary of an OTP plan response. See detailed documentation
 * in OTP webservice documentation here:
 * http://otp-docs.ibi-transit.com/api/json_Itinerary.html
 */
export declare type Itinerary = {
    co2?: number;
    co2VsBaseline?: number;
    duration: number;
    elevationGained: number;
    elevationLost: number;
    endTime: number;
    legs: Leg[];
    startTime: number;
    tooSloped?: boolean;
    transfers: number;
    transitTime: number;
    waitingTime: number;
    walkDistance: number;
    walkLimitExceeded: boolean;
    walkTime: number;
};
/**
 * In many places all we need from the Itinerary is the legs,
 * this type makes all the other types optional except legs.
 */
export declare type ItineraryOnlyLegsRequired = Partial<Itinerary> & Pick<Itinerary, "legs">;
export declare type ElevationProfile = {
    maxElev: number;
    minElev: number;
    points: number[];
    traversed: number;
    gain: number;
    loss: number;
};
/**
 * Used to model a location that is used in planning a trip.
 */
export declare type Location = {
    lat: number;
    lon: number;
    name?: string;
    /**
     * This is only used location that a user has saved. Can be either:
     * One of: 'home', 'work', 'stop' or 'recent'
     */
    type?: "home" | "work" | "stop" | "recent" | string;
    category?: string;
    /**
     * This represents the last time that this location was selected in a
     * search
     */
    timestamp?: number;
    main?: string;
    secondary?: string;
};
/**
 * Alias for a commonly used basic type
 */
export declare type LatLngArray = [number, number];
/**
 * Describes a transit stop entity to be rendered on the map.
 */
export declare type StopLayerStop = LayerEntity & {
    name: string;
};
export declare type StopEventHandler = (stop: Stop | {
    stopId: string;
}) => void;
/**
 * This models data about a stop and it's associated routes that is obtained
 * from a transit index API.
 */
export declare type Stop = {
    /**
     * The stop code if the stop has one
     */
    code?: string;
    color?: string;
    dist?: number;
    geometries?: {
        geoJson?: GeoJSON.Polygon;
    };
    gtfsId: string;
    id: string;
    lat?: number;
    lon?: number;
    name: string;
    routes?: Route[];
};
export declare type Agency = {
    id: string;
    name?: string;
    url?: string;
    timezone?: string;
    lang?: string;
    phone?: string;
    fareUrl?: string;
};
export declare type Route = BasicRouteInfo & {
    agency: Agency;
    agencyId?: string | number;
    agencyName?: string | number;
    bikesAllowed?: ZeroOrOne;
    eligibilityRestricted?: ZeroOrOne;
    mode?: string;
    routeBikesAllowed?: ZeroOrOne;
    sortOrder: number;
    sortOrderSet: boolean;
};
export declare type TransitivePlace = {
    place_lat?: number;
    place_lon?: number;
    place_name?: string;
    placeId?: string;
    type: string;
};
export declare type TransitiveJourney = {
    journey_id: string;
    journey_name: string;
    segments: {
        arc?: boolean;
        from: TransitivePlace;
        patterns?: {
            pattern_id: string;
            from_stop_index: number;
            to_stop_index: number;
        }[];
        streetEdges: number[];
        to: TransitivePlace;
        type: string;
    }[];
};
export declare type TransitivePattern = {
    pattern_id: string;
    pattern_name: string;
    route_id: string;
    stops: {
        geometry?: string;
        stop_id: string;
    }[];
};
export declare type TransitiveRoute = {
    agency_id: string;
    route_color?: string;
    route_id: string;
    route_long_name: string;
    route_short_name: string;
    route_text_color?: string;
    route_type: number;
};
export declare type TransitiveStop = {
    stop_id: string;
    stop_name: string;
    stop_lat: number;
    stop_lon: number;
};
export declare type TransitiveStreetEdge = {
    edge_id: number;
    geometry: EncodedPolyline;
};
export declare type TransitiveData = {
    journeys: TransitiveJourney[];
    patterns: TransitivePattern[];
    places: TransitivePlace[];
    routes: TransitiveRoute[];
    stops: TransitiveStop[];
    streetEdges: TransitiveStreetEdge[];
};
export declare type Station = {
    bikesAvailable?: number;
    id: string;
    isFloatingBike?: boolean;
    isFloatingCar?: boolean;
    isFloatingVehicle?: boolean;
    name?: string;
    networks: string[];
    spacesAvailable?: number;
    x: number;
    y: number;
};
/**
 * Depending on the geocoder that is used, more properties than just the `label`
 * property might be provided by the geocoder. For example, with the Pelias
 * geocoder, properties such as `id`, `layer`, `source` are also included.
 */
export declare type GeocodedFeature = {
    geometry: {
        coordinates: LatLngArray;
        type: string;
    };
    properties: {
        label: string;
        layer?: string;
        source?: string;
    };
};
export declare type TncFare = {
    currencyCode: string;
    maxTNCFare: number;
    minTNCFare: number;
};
export declare type UserPosition = {
    coords?: {
        latitude: number;
        longitude: number;
    };
    error?: {
        message: string;
    } | string;
    fetching?: boolean;
};
/**
 * Describes a user location such as "home", "work" etc.
 */
export interface UserLocation extends Location {
    icon?: string;
    id?: string;
}
/**
 * Associates a location with a type string.
 */
export interface UserLocationAndType {
    location: UserLocation;
    type: string;
}
/**
 * Parameters for "clear location" event handlers.
 */
export interface ClearLocationArg {
    locationType: string;
}
/**
 * Parameters for location actions/event handlers.
 */
export interface MapLocationActionArg {
    location: UserLocation;
    locationType: string;
    reverseGeocode?: boolean;
}
/**
 * Supports leg icons for itinerary body and printable itinerary.
 */
export declare type LegIconComponent = FunctionComponent<{
    leg: Leg;
    title?: string;
    width?: string;
}>;
export declare type ConfiguredCompany = {
    /**
     * The id of the company. This is typically in all-caps.
     */
    id: string;
    /**
     * A human readable text value that can be displayed to users.
     */
    label: string;
    /**
     * A comma-separated list of applicable modes of travel that the company
     * offers.
     */
    modes: string;
};
/**
 * Supports displaying accessibility ratings as a set of thresholds
 * associated with an icon or text.
 */
export declare type GradationMap = Record<number, {
    color: string;
    icon?: ReactElement;
    text?: string;
}>;
export declare const ModeSettingTypes: {
    CHECKBOX: string;
    DROPDOWN: string;
    SLIDER: string;
};
export declare type DropdownOptions = {
    default?: string;
    label: string;
    options: {
        text: string;
        value: string;
        addTransportMode?: TransportMode;
    }[];
    type: "DROPDOWN";
    value?: string;
};
export declare type SliderOptions = {
    default?: number;
    high: number;
    inverseKey?: string;
    label: string;
    labelHigh: string;
    labelLow: string;
    low: number;
    step: number;
    type: "SLIDER";
    value?: number;
};
export declare type CheckboxOptions = {
    addTransportMode?: TransportMode | TransportMode[];
    default?: boolean;
    label: string;
    type: "CHECKBOX";
    truthValue?: boolean | string | number;
    falseValue?: boolean | string | number;
    value?: boolean;
};
export declare type TransitSubmodeCheckboxOption = {
    addTransportMode: TransportMode;
    default?: boolean;
    label: string;
    type: "SUBMODE";
    value?: boolean;
};
export declare type ModeSettingBase = {
    applicableMode: string;
    iconName?: string;
    icon?: JSX.Element;
    key: string;
};
export declare type ModeSetting = (CheckboxOptions | SliderOptions | DropdownOptions | TransitSubmodeCheckboxOption) & ModeSettingBase;
export declare type ModeSettingValues = Record<string, number | string | boolean>;
/**
 * TransportModes correspond with the OTP GraphQL TransportMode.
 * Could be anything from walk, bike (qualifier: rent) to transit, tram, or bus.
 */
export declare type TransportMode = {
    mode: string;
    qualifier?: string;
};
/**
 * This is a combination of transportation modes,
 * with a label to describe them. These are designed
 * to appear in the mode selector as discrete options.
 */
export declare type ModeButtonDefinition = {
    enabled?: boolean;
    Icon: StyledIcon | React.ComponentType;
    iconName: string;
    key: string;
    label: string;
    modes?: TransportMode[];
    modeSettings?: ModeSetting[];
};
/**
 * Definition for a fare product used to pay the fare for a leg in a transit journey
 */
export declare type FareProduct = {
    id: string;
    medium?: {
        id: string;
        name: string;
    };
    name: string;
    price: Money;
    riderCategory?: {
        id: string;
        name: string;
    };
};
export declare type FareProductSelector = {
    mediumId: string;
    riderCategoryId: string;
};
/**
 * Options for units of mass (used in CO₂ calculation config)
 */
export declare type MassUnitOption = "ounce" | "kilogram" | "pound" | "gram";
export {};
//# sourceMappingURL=index.d.ts.map