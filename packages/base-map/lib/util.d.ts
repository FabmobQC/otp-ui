/// <reference types="mapbox-gl" />
import { LngLatBoundsLike, MapRef, PaddingOptions } from "react-map-gl";
/**
 * Computes padding dimensions based on roughly 1/20 of the map's canvas dimensions
 * (under a 2:1 canvas-to-screen pixel ratio).
 * @param map The map where the bounds fitting is to occur.
 * @param paddingRatio The ratio of the canvas dimensions set aside for padding.
 * @returns The object with the computed padding dimensions.
 */
export declare function getFitBoundsPadding(map: MapRef, paddingRatio?: number): PaddingOptions;
/**
 * Helper function used in several packages to fit a map to the given bounds,
 * using padding based on map canvas size.
 * @param map The map where the bounds fitting is to occur.
 * @param bounds The bounds to be fit.
 */
export declare function fitMapBounds(map: MapRef, bounds: LngLatBoundsLike): void;
//# sourceMappingURL=util.d.ts.map