import { LatLngArray, Location, UserPosition } from "@opentripplanner/types";
export declare function currentPositionToLocation(currentPosition: UserPosition): Location;
export declare function coordsToString(coords: number[]): string;
export declare function stringToCoords(str: string): number[];
export declare function constructLocation(latlng: {
    lat: number;
    lng: number;
}): Location;
export declare function matchLatLon(location1: Location, location2: Location): boolean;
declare type TransitivePlaceRaw = {
    place_id: string;
};
export declare function isBikeshareStation(place: TransitivePlaceRaw): boolean;
export declare function isEScooterStation(place: TransitivePlaceRaw): boolean;
export declare function isCarWalkTransition(place: TransitivePlaceRaw): boolean;
export declare function isValidLat(lat: number): boolean;
export declare function isValidLng(lng: number): boolean;
export declare function isValidLatLng(arr: LatLngArray): boolean;
export {};
//# sourceMappingURL=map.d.ts.map