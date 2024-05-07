"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autocomplete = autocomplete;
exports.reverse = reverse;
exports.search = search;

// eslint-disable-next-line prettier/prettier
function run({
  query,
  url
}) {
  return fetch(`${url}/geocode/stopClusters?query=${query}`).then(res => res.text()).then(res => JSON.parse(`{"results": ${res}}`));
}
/**
 * Search for an address using
 * OTP Geocoder
 *
 * @param  {Object} $0
 * @param  {string} $0.url  The OTP instance, ending with /default/
 * @param  {string} $0.text query
 * @return {Promise}        A Promise that'll get resolved with the autocomplete result
 */


async function autocomplete({
  url,
  text
}) {
  return run({
    query: text,
    url
  });
}

function search() {
  console.warn("Not implemented");
  return null;
}

function reverse() {
  console.warn("Not implemented");
  return null;
}
//# sourceMappingURL=index.js.map