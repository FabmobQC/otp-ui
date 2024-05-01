import type { HereResponse } from "../apis/here/types";
import type { MultiGeocoderResponse, SingleOrMultiGeocoderResponse } from "./types";
import Geocoder from "./abstract-geocoder";
export default class HereGeocoder extends Geocoder {
    rewriteReverseResponse({ items, point }: HereResponse): SingleOrMultiGeocoderResponse;
    rewriteAutocompleteResponse(response: HereResponse): MultiGeocoderResponse;
    rewriteSearchResponse({ items }: HereResponse): MultiGeocoderResponse;
}
//# sourceMappingURL=here.d.ts.map