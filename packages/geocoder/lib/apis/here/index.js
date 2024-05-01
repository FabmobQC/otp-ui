"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autocomplete = autocomplete;
exports.reverse = reverse;
exports.search = search;

var _lonlat = require("@conveyal/lonlat");

var _querystring = require("querystring");

const AUTOCOMPLETE_URL = "https://autosuggest.search.hereapi.com/v1/autosuggest";
const GEOCODE_URL = "https://geocode.search.hereapi.com/v1/geocode";
const REVERSE_URL = "https://revgeocode.search.hereapi.com/v1/revgeocode";

function GeocoderException(message) {
  this.message = message;
  this.name = "GeocoderException";
}

function run({
  options,
  query,
  url
}) {
  return fetch(`${url}?${(0, _querystring.stringify)(query)}`, options).then(res => res.json());
}

const checkItemInBoundary = ({
  rect
}) => ({
  position
}) => {
  if (!position) return true; // Chain queries might not have position, ignore them

  const {
    maxLat,
    maxLon,
    minLat,
    minLon
  } = rect;
  const {
    lat,
    lng
  } = position;
  return lng <= maxLon && lng >= minLon && lat <= maxLat && lat >= minLat;
};
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


async function autocomplete({
  apiKey,
  boundary,
  focusPoint,
  options,
  size = 20,
  text
}) {
  // build query
  const query = {
    apiKey,
    limit: size,
    q: text,
    show: "details"
  };

  if (focusPoint) {
    const {
      lat,
      lon
    } = (0, _lonlat.normalize)(focusPoint);
    query.at = `${lat},${lon}`;
    const res = await run({
      options,
      query,
      url: AUTOCOMPLETE_URL
    });

    if (boundary !== null && boundary !== void 0 && boundary.rect) {
      // HERE does not support a boundary when you use a focus point
      // This workaround filters the results internally to the boundary
      res.items = res.items.filter(checkItemInBoundary(boundary));
    }

    return res;
  }

  if (boundary) {
    const {
      country,
      rect
    } = boundary;
    if (country) query.in = `countryCode:${country}`;

    if (rect) {
      query.in = `bbox:${[rect.minLon, rect.minLat, rect.maxLon, rect.maxLat].join(",")}`;
    }
  }

  return run({
    options,
    query,
    url: AUTOCOMPLETE_URL
  });
}
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


function search({
  apiKey,
  focusPoint,
  options,
  size = 10,
  text
}) {
  if (!text) return Promise.resolve({
    items: []
  });
  const query = {
    apiKey,
    limit: size,
    q: text
  };

  if (focusPoint) {
    const {
      lat,
      lon
    } = (0, _lonlat.normalize)(focusPoint);
    query.at = `${lat},${lon}`;
  }

  return run({
    options,
    query,
    url: GEOCODE_URL
  });
}
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


function reverse({
  apiKey,
  options,
  point
}) {
  const query = {
    apiKey
  };

  if (point) {
    const {
      lat,
      lon
    } = (0, _lonlat.normalize)(point);
    query.at = `${lat},${lon}`;
  } else {
    throw new GeocoderException("No point provided for reverse geocoder.");
  }

  return run({
    options,
    query,
    url: REVERSE_URL
  }).then(res => ({ ...res,
    point
  }));
}
//# sourceMappingURL=index.js.map