/// <reference types="react" />
import { MapLocationActionArg, Stop, StopEventHandler } from "@opentripplanner/types";
declare type Props = {
    /**
     * Custom stop color passed from user config
     */
    color?: string;
    /**
     * An optional id to override the active stop with
     */
    activeStop?: string;
    /**
     * An optional id to highlight a stop on the map
     */
    highlightedStop?: string;
    /**
     * A color to use for the highlighted stop
     */
    highlightedStopColor?: string;
    /**
     * The list of stops to create stop markers for.
     */
    stops?: Stop[];
    /**
     * Whether or not to display the overlay
     */
    visible?: boolean;
    /**
     * The lowest zoom level the stop markers should be visible at
     */
    minZoom?: number;
    /**
     * A method to be fired when the map is moved
     */
    refreshStops?: () => void;
    /**
     * A method fired when a stop is selected as from or to in the popup
     */
    setLocation?: (location: MapLocationActionArg) => void;
    /**
     * A method fired when the stop viewer is opened in the popup
     */
    setViewedStop?: StopEventHandler;
};
/**
 * An overlay to view a collection of stops.
 */
declare const StopsOverlay: (props: Props) => JSX.Element;
export default StopsOverlay;
export { Props as StopProps };
//# sourceMappingURL=index.d.ts.map