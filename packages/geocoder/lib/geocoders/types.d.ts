import type { LonLatInput } from "@conveyal/lonlat";
import type { Feature, FeatureCollection } from "geojson";
declare type Rect = {
    maxLat: number;
    maxLon: number;
    minLat: number;
    minLon: number;
};
declare type Boundary = {
    country?: string;
    rect?: Rect;
};
export declare type GeocoderConfig = {
    apiKey?: string;
    baseUrl?: string;
    boundary?: Boundary;
    focusPoint?: LonLatInput;
    layers?: string;
    options?: RequestInit;
    sources?: string;
    size?: number;
    reverseUseFeatureCollection?: boolean;
};
export declare type ReverseQuery = {
    apiKey?: string;
    format?: boolean;
    options?: RequestInit;
    point?: LonLatInput;
    url?: string;
    sources?: string;
};
export declare type AutocompleteQuery = {
    apiKey?: string;
    boundary?: Boundary;
    focusPoint?: LonLatInput;
    format?: boolean;
    layers?: string;
    options?: RequestInit;
    size?: number;
    sources?: string;
    text?: string;
    url?: string;
};
export declare type SearchQuery = {
    apiKey?: string;
    boundary?: Boundary;
    layers?: string;
    focusPoint?: LonLatInput;
    format?: boolean;
    options?: RequestInit;
    size?: number;
    text?: string;
    url?: string;
    sources?: string;
};
export declare type AnyGeocoderQuery = SearchQuery & AutocompleteQuery & ReverseQuery;
export declare type MultiGeocoderResponse = FeatureCollection & {
    isomorphicMapzenSearchQuery?: AnyGeocoderQuery;
};
export declare type SingleGeocoderResponse = {
    isomorphicMapzenSearchQuery?: AnyGeocoderQuery;
    lat: number;
    lon: number;
    name: string;
    rawGeocodedFeature: Feature;
};
export declare type SingleOrMultiGeocoderResponse = MultiGeocoderResponse | SingleGeocoderResponse;
export {};
//# sourceMappingURL=types.d.ts.map