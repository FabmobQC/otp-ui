import { ClearLocationArg, Location, MapLocationActionArg, UserLocationAndType } from "@opentripplanner/types";
import { ComponentType, ReactElement } from "react";
import * as S from "./styled";
interface Props {
    /**
     * Dispatched when a user clicks on the clear location button in the user
     * settings. Not needed unless user settings is activated. Dispatched with an
     * argument in the form of:
     *
     * { type: "from/to" }
     */
    clearLocation?: (arg: ClearLocationArg) => void;
    /**
     * Dispatched when a user clicks on the forget location button in the user
     * settings. Not needed unless user settings is activated. Dispatched with a
     * string argument representing the type of saved location.
     */
    forgetPlace?: (type: string) => void;
    /**
     * The from location.
     */
    fromLocation?: Location;
    /**
     * Intermediate places along a journey.
     */
    intermediatePlaces?: Location[];
    /**
     * An array of location that the user has saved. Not needed unless user
     * settings is activated.
     */
    locations?: Location[];
    /**
     * An optional custom component that can be used to create custom html that
     * is used in a leaflet divIcon to render the map marker icon for each
     * endpoint.
     *
     * See https://leafletjs.com/reference-1.6.0.html#divicon
     *
     * This component is passed 2 props:
     * - location: either the from or to location depending on the endpoint
     * - type: either "from" or "to"
     */
    MapMarkerIcon?: ComponentType<UserLocationAndType>;
    /**
     * Dispatched when a user clicks on the remember place button in the user
     * settings. Not needed unless user settings is activated. Dispatched with an
     * argument in the form of:
     *
     * { location: {...location}, type: "home/work" }
     */
    rememberPlace?: (arg: UserLocationAndType) => void;
    /**
     * Dispatched when a location is dragged somewhere else on the map. Dispatched
     * with an argument in the form of:
     *
     * { location: {...location}, reverseGeocode: true, type: "from/to" }
     */
    setLocation: (arg: MapLocationActionArg) => void;
    /**
     * Whether or not to show the user settings popup when an endpoint is clicked.
     */
    showUserSettings?: boolean;
    /**
     * To to location
     */
    toLocation?: Location;
}
declare const EndpointsOverlay: ({ clearLocation, forgetPlace, fromLocation, intermediatePlaces, locations, MapMarkerIcon, rememberPlace, setLocation, showUserSettings, toLocation }: Props) => ReactElement;
export default EndpointsOverlay;
export { S as Styled };
//# sourceMappingURL=index.d.ts.map