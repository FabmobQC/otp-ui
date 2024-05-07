import type { AutocompleteQuery } from "../../geocoders/types";
declare type OTPGeocoderResponse = {
    results: {
        coordinate: {
            lat: number;
            lon: number;
        };
        code: string;
        name: string;
        id: string;
        modes: string[];
    }[];
} | undefined;
/**
 * Search for an address using
 * OTP Geocoder
 *
 * @param  {Object} $0
 * @param  {string} $0.url  The OTP instance, ending with /default/
 * @param  {string} $0.text query
 * @return {Promise}        A Promise that'll get resolved with the autocomplete result
 */
declare function autocomplete({ url, text }: AutocompleteQuery): Promise<OTPGeocoderResponse>;
declare function search(): Promise<unknown>;
declare function reverse(): Promise<unknown>;
export { autocomplete, reverse, search };
export type { OTPGeocoderResponse };
//# sourceMappingURL=index.d.ts.map