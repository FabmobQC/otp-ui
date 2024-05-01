"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _msw = require("msw");

var _mapillary = _interopRequireDefault(require("./mapillary.json"));

// This faked endpoint will always return the same ID
var _default = [_msw.rest.get("https://graph.mapillary.com/images", (req, res, ctx) => {
  return res(ctx.json(_mapillary.default));
})];
exports.default = _default;
//# sourceMappingURL=handlers.js.map