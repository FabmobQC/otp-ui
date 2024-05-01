import { SymbolLayout } from "mapbox-gl";
import { TransitivePattern, TransitiveRoute } from "@opentripplanner/types";
/**
 * Create a labeled-line feature for the given transit route pattern.
 */
export declare function patternToRouteFeature(pattern: TransitivePattern, routes: TransitiveRoute[]): GeoJSON.Feature<GeoJSON.Geometry, Record<string, unknown>>;
/**
 * Obtains common layout options for route label layers.
 */
export declare function getRouteLayerLayout(textField: string): SymbolLayout;
//# sourceMappingURL=route-layers.d.ts.map