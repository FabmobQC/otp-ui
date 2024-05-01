"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _msw = require("msw");

var _tilejson = _interopRequireDefault(require("./tilejson.json"));

var _ = _interopRequireDefault(require("!url-loader!./4770-6206.pbf"));

var _2 = _interopRequireDefault(require("!url-loader!./4771-6206.pbf"));

var _3 = _interopRequireDefault(require("!url-loader!./4772-6206.pbf"));

/* eslint-disable import/no-webpack-loader-syntax */
var _default = [_msw.rest.get("https://fake-otp-server.com/otp/routers/default/vectorTiles/stops/tilejson.json", (req, res, ctx) => {
  return res(ctx.json(_tilejson.default));
}), _msw.rest.get("https://fake-otp-server.com/otp/routers/default/vectorTiles/stops/14/4770/6206.pbf", async (req, res, ctx) => {
  const buffer = await fetch(_.default).then(resp => resp.arrayBuffer());
  return res(ctx.set("Content-Length", buffer.byteLength.toString()), ctx.set("Content-Type", "application/x-protobuf"), ctx.body(buffer));
}), _msw.rest.get("https://fake-otp-server.com/otp/routers/default/vectorTiles/stops/14/4771/6206.pbf", async (req, res, ctx) => {
  const buffer = await fetch(_2.default).then(resp => resp.arrayBuffer());
  return res(ctx.set("Content-Length", buffer.byteLength.toString()), ctx.set("Content-Type", "application/x-protobuf"), ctx.body(buffer));
}), _msw.rest.get("https://fake-otp-server.com/otp/routers/default/vectorTiles/stops/14/4772/6206.pbf", async (req, res, ctx) => {
  const buffer = await fetch(_3.default).then(resp => resp.arrayBuffer());
  return res(ctx.set("Content-Length", buffer.byteLength.toString()), ctx.set("Content-Type", "application/x-protobuf"), ctx.body(buffer));
})];
exports.default = _default;
//# sourceMappingURL=handlers.js.map