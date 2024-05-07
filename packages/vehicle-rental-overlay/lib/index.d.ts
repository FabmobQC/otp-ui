/// <reference types="react" />
import { Company, ConfiguredCompany, MapLocationActionArg, Station } from "@opentripplanner/types";
import StationPopup from "@opentripplanner/map-popup";
declare type Props = {
    /**
     * A list of companies that are applicable to just this instance of the
     * overlay.
     */
    companies?: string[];
    /**
     * The entire companies config array.
     */
    configCompanies: ConfiguredCompany[];
    /**
     * An id, used to make this layer uniquely identifiable
     */
    id: string;
    /**
     * An optional custom function to create a string name of a particular vehicle
     * rental station. This function takes two arguments of the configCompanies
     * prop and a vehicle rental station. The function must return a string.
     */
    getStationName?: (configCompanies: Company[], station: Station) => string;
    /**
     * If specified, a function that will be triggered every 30 seconds whenever this layer is
     * visible.
     */
    refreshVehicles?: () => void;
    /**
     * A callback for when a user clicks on setting this stop as either the from
     * or to location of a new search.
     *
     * This will be dispatched with the following argument:
     *
     * ```js
     *  {
     *    location: {
     *      lat: number,
     *      lon: number,
     *      name: string
     *    },
     *    locationType: "from" or "to"
     *  }
     * ```
     */
    setLocation?: (arg: MapLocationActionArg) => void;
    /**
     * A list of the vehicle rental stations specific to this overlay instance.
     */
    stations: Station[];
    /**
     * Whether the overlay is currently visible.
     */
    visible?: boolean;
};
/**
 * This vehicle rental overlay can be used to render vehicle rentals of various
 * types. This layer can be configured to show different styles of markers at
 * different zoom levels.
 */
declare const VehicleRentalOverlay: ({ companies, configCompanies, getStationName, id, refreshVehicles, setLocation, stations, visible }: Props) => JSX.Element;
export default VehicleRentalOverlay;
export { StationPopup };
//# sourceMappingURL=index.d.ts.map