export declare const currentPosition: {
    coords: {
        latitude: number;
        longitude: number;
    };
};
export declare const geocoderConfig: {
    baseUrl: string;
    boundary: {
        rect: {
            minLon: number;
            maxLon: number;
            minLat: number;
            maxLat: number;
        };
    };
    maxNearbyStops: number;
    type: string;
};
export declare const unreachableGeocoderConfig: {
    baseUrl: string;
    boundary: {
        rect: {
            minLon: number;
            maxLon: number;
            minLat: number;
            maxLat: number;
        };
    };
    maxNearbyStops: number;
    type: string;
};
export declare const slowGeocoderConfig: {
    baseUrl: string;
    boundary: {
        rect: {
            minLon: number;
            maxLon: number;
            minLat: number;
            maxLat: number;
        };
    };
    maxNearbyStops: number;
    type: string;
};
export declare const hereGeocoderConfig: {
    type: string;
    apiKey: string;
    focusPoint: {
        lat: number;
        lng: number;
    };
};
export declare const badGeocoderConfig: {
    type: string;
    apiKey: string;
    focusPoint: {
        lat: number;
        lng: number;
    };
};
export declare const getCurrentPosition: import("@storybook/addon-actions").HandlerFunction;
export declare const onLocationSelected: import("@storybook/addon-actions").HandlerFunction;
export declare const selectedLocation: {
    lat: number;
    lon: number;
    name: string;
};
export declare const layerColorMap: {
    stops: string;
    stations: string;
    locality: string;
};
export declare const userLocationsAndRecentPlaces: ({
    icon: string;
    lat: number;
    lon: number;
    name: string;
    type: string;
} | {
    lat: number;
    lon: number;
    name: string;
    type: string;
    icon?: undefined;
})[];
//# sourceMappingURL=common.d.ts.map