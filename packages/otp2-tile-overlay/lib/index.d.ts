/// <reference types="react" />
import { ConfiguredCompany, MapLocationActionArg, Stop } from "@opentripplanner/types";
/**
 * Generates an array of MapLibreGL Source and Layer components with included popups for
 * rendering OTP2 tile data.
 *
 * @param layers          A list of layers, with some minimal config, matching what is configured on the server.
 *                        This list will be used to craft the tilejson request to OTP.
 * @param endpoint        The OTP endpoint to make the requests to
 * @param setLocation     An optional method to make from/to buttons functional. See component for more detail.
 * @param setViewedStop   An optional method to make stop viewer button functional. See component for more detail.
 * @param configCompanies An optional list of companies used to prettify network information.
 * @returns               Array of <Source> and <OTP2TileLayerWithPopup> components
 */
declare const generateOTP2TileLayers: (layers: {
    color?: string;
    name?: string;
    network?: string;
    type: string;
    initiallyVisible?: boolean;
}[], endpoint: string, setLocation?: (location: MapLocationActionArg) => void, setViewedStop?: (stop: Stop) => void, configCompanies?: ConfiguredCompany[]) => JSX.Element[];
export default generateOTP2TileLayers;
//# sourceMappingURL=index.d.ts.map