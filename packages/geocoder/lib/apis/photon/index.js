"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autocomplete = autocomplete;
exports.reverse = reverse;
exports.search = search;

var _lonlat = require("@conveyal/lonlat");

var _querystring = require("querystring");

const AUTOCOMPLETE_URL = "https://photon.komoot.io/api";
const GEOCODE_URL = "https://photon.komoot.io/api";
const REVERSE_URL = "https://photon.komoot.io/reverse";

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


async function autocomplete({
  boundary,
  focusPoint,
  options,
  size = 20,
  text
}) {
  // build query
  const query = {
    limit: size,
    q: text
  };

  if (focusPoint) {
    const {
      lat,
      lon
    } = (0, _lonlat.normalize)(focusPoint);
    query.lat = lat.toString();
    query.lon = lon.toString();
    const res = await run({
      options,
      query,
      url: AUTOCOMPLETE_URL
    });
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


function search({
  focusPoint,
  options,
  size = 10,
  text
}) {
  if (!text) return Promise.resolve({
    items: []
  });
  const query = {
    limit: size,
    q: text
  };

  if (focusPoint) {
    const {
      lat,
      lon
    } = (0, _lonlat.normalize)(focusPoint);
    query.lat = lat.toString();
    query.lon = lon.toString();
  }

  return run({
    options,
    query,
    url: GEOCODE_URL
  });
}
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


function reverse({
  options,
  point
}) {
  const query = {};

  if (point) {
    const {
      lat,
      lon
    } = (0, _lonlat.normalize)(point);
    query.lat = lat.toString();
    query.lon = lon.toString();
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