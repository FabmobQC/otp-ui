import type { AutocompleteQuery, ReverseQuery, SearchQuery } from "../../geocoders/types";
import type { PhotonResponse } from "./types";
/**
 * Search for an address using
 * Komoot's Photon {@link https://github.com/komoot/photon}
 * service.
 *
 * @param  {Object} $0
 * @param  {Object} $0.boundary
 * @param  {Object} $0.focusPoint
 * @param  {Object} $0.options                    options to pass to fetch (e.g., custom headers)
 * @param  {number} [$0.size=20]
 * @param  {string} $0.text                       query text
 * @return {Promise}                              A Promise that'll get resolved with the autocomplete result
 */
declare function autocomplete({ boundary, focusPoint, options, size, text }: AutocompleteQuery): Promise<PhotonResponse>;
/**
 * Search for an address using
 * Komoot's Photon {@link https://github.com/komoot/photon}
 * service.
 *
 * @param  {Object} $0
 * @param  {Object} $0.focusPoint
 * @param  {Object} $0.options                  options to pass to fetch (e.g., custom headers)
 * @param  {number} [$0.size=10]
 * @param  {string} $0.text                      The address text to query for
 * @return {Promise}                            A Promise that'll get resolved with search result
 */
declare function search({ focusPoint, options, size, text }: SearchQuery): Promise<PhotonResponse>;
/**
 * Search for an address using
 * Komoot's Photon {@link https://github.com/komoot/photon} reverse
 * service.
 *
 * @param  {Object} $0
 * @param  {Object} $0.point
 * @param  {Object} $0.options                  options to pass to fetch (e.g., custom headers)
 * @return {Promise}                            A Promise that'll get resolved with search result
 */
declare function reverse({ options, point }: ReverseQuery): Promise<PhotonResponse>;
export { autocomplete, reverse, search };
//# sourceMappingURL=index.d.ts.map