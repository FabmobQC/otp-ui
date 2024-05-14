/* eslint-disable import/no-webpack-loader-syntax */
import { rest } from "msw";

import tilejson from "./tilejson.json";

const seventy = new URL("./4770-6206.pbf", import.meta.url);
const seventyOne = new URL("./4771-6206.pbf", import.meta.url);
const seventyTwo = new URL("./4772-6206.pbf", import.meta.url);

export default [
  rest.get(
    "https://fake-otp-server.com/otp/routers/default/vectorTiles/stops/tilejson.json",
    (req, res, ctx) => {
      return res(ctx.json(tilejson));
    }
  ),
  rest.get(
    "https://fake-otp-server.com/otp/routers/default/vectorTiles/stops/14/4770/6206.pbf",
    async (req, res, ctx) => {
      const buffer = await fetch(seventy).then(resp => resp.arrayBuffer());
      return res(
        ctx.set("Content-Length", buffer.byteLength.toString()),
        ctx.set("Content-Type", "application/x-protobuf"),
        ctx.body(buffer)
      );
    }
  ),
  rest.get(
    "https://fake-otp-server.com/otp/routers/default/vectorTiles/stops/14/4771/6206.pbf",
    async (req, res, ctx) => {
      const buffer = await fetch(seventyOne).then(resp => resp.arrayBuffer());
      return res(
        ctx.set("Content-Length", buffer.byteLength.toString()),
        ctx.set("Content-Type", "application/x-protobuf"),
        ctx.body(buffer)
      );
    }
  ),

  rest.get(
    "https://fake-otp-server.com/otp/routers/default/vectorTiles/stops/14/4772/6206.pbf",
    async (req, res, ctx) => {
      const buffer = await fetch(seventyTwo).then(resp => resp.arrayBuffer());
      return res(
        ctx.set("Content-Length", buffer.byteLength.toString()),
        ctx.set("Content-Type", "application/x-protobuf"),
        ctx.body(buffer)
      );
    }
  )
];
