/// <reference types="react" />
import { Stop } from "@opentripplanner/types";
declare type RouteData = {
    color?: string;
    patterns: Record<string, {
        id: string;
        name?: string;
        geometry?: {
            points: [number, number][];
        };
        stops?: Stop[];
    }>;
};
declare type Props = {
    /**
     * If pattern stops contain polygons, we can request that the routes are not drawn
     * inside of these polygons by setting this prop to true. If true, the layer will
     * check every zone of every stop in a pattern before drawing the route for that pattern
     * and only draw the route outside of the polygon.
     */
    clipToPatternStops?: boolean;
    /**
     * This method is called whenever the bounds are updated to fit a route
     */
    mapCenterCallback: () => void;
    /**
     * Some Leaflet properties that have been mapped to MapLibreGL
     * TODO: expose MapLibre properties?
     */
    path?: {
        color?: string;
        opacity?: number;
        weight?: number;
    };
    /**
     * This represents data about a route as obtained from a transit index.
     * Typically a route has more data than these items, so this is only a list of
     * the properties that this component actually uses.
     */
    routeData: RouteData;
};
/**
 * An overlay that will display all polylines of the patterns of a route.
 */
declare const RouteViewerOverlay: (props: Props) => JSX.Element;
export default RouteViewerOverlay;
//# sourceMappingURL=index.d.ts.map