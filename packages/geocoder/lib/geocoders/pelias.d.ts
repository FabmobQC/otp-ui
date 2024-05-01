import Geocoder from "./abstract-geocoder";
import type { AutocompleteQuery, SearchQuery } from "..";
import type { SingleOrMultiGeocoderResponse } from "./types";
/**
 * Geocoder implementation for the Pelias geocoder.
 * See https://pelias.io
 *
 * @extends Geocoder
 */
export default class PeliasGeocoder extends Geocoder {
    /**
     * Generate an autocomplete query specifically for the Pelias API. The
     * `sources` parameter is a Pelias-specific option.
     * This function fills in some more fields of the query
     * from the existing values in the GeocoderConfig.
     */
    getAutocompleteQuery(query: AutocompleteQuery): AutocompleteQuery;
    /**
     * Generate a search query specifically for the Pelias API. The
     * `sources` parameter is a Pelias-specific option.
     * This function fills in some more fields of the query
     * from the existing values in the GeocoderConfig.
     */
    getSearchQuery(query: SearchQuery): SearchQuery;
    /**
     * Rewrite the response into an application-specific data format using the
     * first feature returned from the geocoder.
     */
    rewriteReverseResponse(response: any): SingleOrMultiGeocoderResponse;
}
//# sourceMappingURL=pelias.d.ts.map