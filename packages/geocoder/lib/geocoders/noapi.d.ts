import type { AutocompleteQuery, ReverseQuery, SearchQuery } from "..";
import type { MultiGeocoderResponse, SingleOrMultiGeocoderResponse } from "./types";
import Geocoder from "./abstract-geocoder";
/**
 * An implementation that doesn't use an API for geocoding. Merely allows
 * clicking on the map and finding GPS coordinates by typing them in.
 *
 * @extends Geocoder
 */
export default class NoApiGeocoder extends Geocoder {
    /**
     * Use coordinate string parser.
     */
    autocomplete(query: AutocompleteQuery): Promise<MultiGeocoderResponse>;
    /**
     * Always return the lat/lon.
     */
    reverse(query: ReverseQuery): Promise<SingleOrMultiGeocoderResponse>;
    /**
     * Use coordinate string parser.
     */
    search(query: SearchQuery): Promise<MultiGeocoderResponse>;
    /**
     * Attempt to parse the input as a GPS coordinate. If parseable, return a
     * feature.
     */
    parseCoordinateString(string: string): Promise<MultiGeocoderResponse>;
    roundGPSDecimal(number: number): number;
}
//# sourceMappingURL=noapi.d.ts.map