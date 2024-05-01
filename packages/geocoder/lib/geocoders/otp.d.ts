import type { AutocompleteQuery, MultiGeocoderResponse } from "./types";
import Geocoder from "./abstract-geocoder";
import { OTPGeocoderResponse } from "../apis/otp";
/**
 * Allows fetching results from OTP instance with the geocoder endpoint enabled
 */
export default class OTPGeocoder extends Geocoder {
    getAutocompleteQuery(query: AutocompleteQuery): AutocompleteQuery;
    rewriteAutocompleteResponse(response: OTPGeocoderResponse): MultiGeocoderResponse;
}
//# sourceMappingURL=otp.d.ts.map