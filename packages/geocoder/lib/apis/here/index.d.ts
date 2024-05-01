import type { AutocompleteQuery, ReverseQuery, SearchQuery } from "../../geocoders/types";
import type { HereResponse } from "./types";
/**
 * Search for an address using
 * Here's {@link https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html|Autocomplete}
 * service.
 *
 * @param  {Object} $0
 * @param  {string} $0.apiKey                     The Here API Key
 * @param  {Object} $0.boundary
 * @param  {Object} $0.focusPoint
 * @param  {Object} $0.options                    options to pass to fetch (e.g., custom headers)
 * @param  {number} [$0.size=20]
 * @param  {string} $0.text                       query text
 * @return {Promise}                              A Promise that'll get resolved with the autocomplete result
 */
declare function autocomplete({ apiKey, boundary, focusPoint, options, size, text }: AutocompleteQuery): Promise<HereResponse>;
/**
 * Search for an address using
 * HERE's {@link https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html|Search}
 * service. NOTE: Here does not support a boundary for Search queries, unlike Pelias.
 *
 * @param  {Object} $0
 * @param  {string} $0.apiKey                    The Here API key
 * @param  {Object} $0.focusPoint
 * @param  {Object} $0.options                  options to pass to fetch (e.g., custom headers)
 * @param  {number} [$0.size=10]
 * @param  {string} $0.text                      The address text to query for
 * @return {Promise}                            A Promise that'll get resolved with search result
 */
declare function search({ apiKey, focusPoint, options, size, text }: SearchQuery): Promise<HereResponse>;
/**
 * Search for an address using
 * HERE's {@link https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html|Search}
 * service.
 *
 * @param  {Object} $0
 * @param  {string} $0.apiKey                   The Here API key
 * @param  {Object} $0.point
 * @param  {Object} $0.options                  options to pass to fetch (e.g., custom headers)
 * @return {Promise}                            A Promise that'll get resolved with search result
 */
declare function reverse({ apiKey, options, point }: ReverseQuery): Promise<HereResponse>;
export { autocomplete, reverse, search };
//# sourceMappingURL=index.d.ts.map