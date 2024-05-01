"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _msw = require("msw");

var _autosuggestResponse = _interopRequireDefault(require("./here/autosuggest-response.json"));

var _searchResponse = _interopRequireDefault(require("./here/search-response.json"));

var _reverseResponse = _interopRequireDefault(require("./here/reverse-response.json"));

var _autocompleteResponse = _interopRequireDefault(require("./pelias/autocomplete-response.json"));

var _searchResponse2 = _interopRequireDefault(require("./pelias/search-response.json"));

var _reverseResponse2 = _interopRequireDefault(require("./pelias/reverse-response.json"));

var _default = [_msw.rest.get("https://autosuggest.search.hereapi.com/v1/autosuggest", (req, res, ctx) => {
  return res(ctx.json(_autosuggestResponse.default));
}), _msw.rest.get("https://geocode.search.hereapi.com/v1/geocode", (req, res, ctx) => {
  return res(ctx.json(_searchResponse.default));
}), _msw.rest.get("https://revgeocode.search.hereapi.com/v1/revgeocode", (req, res, ctx) => {
  return res(ctx.json(_reverseResponse.default));
}), _msw.rest.get("https://api.geocode.earth/v1/autocomplete", (req, res, ctx) => {
  return res(ctx.json(_autocompleteResponse.default));
}), _msw.rest.get("https://api.geocode.earth/v1/search", (req, res, ctx) => {
  return res(ctx.json(_searchResponse2.default));
}), _msw.rest.get("https://api.geocode.earth/v1/reverse", (req, res, ctx) => {
  return res(ctx.json(_reverseResponse2.default));
})];
exports.default = _default;
//# sourceMappingURL=handlers.js.map