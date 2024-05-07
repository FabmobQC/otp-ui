"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _msw = require("msw");

var _autocomplete = _interopRequireDefault(require("./autocomplete.json"));

var _hereAutocomplete = _interopRequireDefault(require("./hereAutocomplete.json"));

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

var _default = [_msw.rest.get("https://ws-st.trimet.org/pelias/v1/autocomplete", (req, res, ctx) => {
  return res(ctx.json(_autocomplete.default));
}), _msw.rest.get("https://slow.trimet.org/pelias/v1/autocomplete", async (req, res, ctx) => {
  await sleep(3000);
  return res(ctx.json(_autocomplete.default));
}), _msw.rest.get("https://autosuggest.search.hereapi.com/v1/autosuggest", (req, res, ctx) => {
  return res(ctx.json(_hereAutocomplete.default));
})];
exports.default = _default;
//# sourceMappingURL=handlers.js.map