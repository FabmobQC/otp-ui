import Geocoder from "./abstract-geocoder";
import type { AutocompleteQuery, SearchQuery } from "..";
import type { SingleOrMultiGeocoderResponse } from "./types";
import { MultiGeocoderResponse } from "./types";
/**
 * Geocoder implementation for the Photon geocoder.
 * See https://photon.io
 *
 * @extends Geocoder
 */
export default class PhotonGeocoder extends Geocoder {
    getAutocompleteQuery(query: AutocompleteQuery): AutocompleteQuery;
    getSearchQuery(query: SearchQuery): SearchQuery;
    rewriteAutocompleteResponse(response: MultiGeocoderResponse): MultiGeocoderResponse;
    /**
     * Rewrite the response into an application-specific data format using the
     * first feature returned from the geocoder.
     */
    rewriteReverseResponse(response: any): SingleOrMultiGeocoderResponse;
    rewriteSearchResponse(response: MultiGeocoderResponse): MultiGeocoderResponse;
}
//# sourceMappingURL=photon.d.ts.map