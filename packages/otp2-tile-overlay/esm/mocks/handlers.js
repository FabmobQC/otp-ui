import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";

/* eslint-disable import/no-webpack-loader-syntax */
import { rest } from "msw";
import tilejson from "./tilejson.json";
import seventy from "!url-loader!./4770-6206.pbf";
import seventyOne from "!url-loader!./4771-6206.pbf";
import seventyTwo from "!url-loader!./4772-6206.pbf";
export default [rest.get("https://fake-otp-server.com/otp/routers/default/vectorTiles/stops/tilejson.json", function (req, res, ctx) {
  return res(ctx.json(tilejson));
}), rest.get("https://fake-otp-server.com/otp/routers/default/vectorTiles/stops/14/4770/6206.pbf", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(req, res, ctx) {
    var buffer;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(seventy).then(function (resp) {
              return resp.arrayBuffer();
            });

          case 2:
            buffer = _context.sent;
            return _context.abrupt("return", res(ctx.set("Content-Length", buffer.byteLength.toString()), ctx.set("Content-Type", "application/x-protobuf"), ctx.body(buffer)));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()), rest.get("https://fake-otp-server.com/otp/routers/default/vectorTiles/stops/14/4771/6206.pbf", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(req, res, ctx) {
    var buffer;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch(seventyOne).then(function (resp) {
              return resp.arrayBuffer();
            });

          case 2:
            buffer = _context2.sent;
            return _context2.abrupt("return", res(ctx.set("Content-Length", buffer.byteLength.toString()), ctx.set("Content-Type", "application/x-protobuf"), ctx.body(buffer)));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}()), rest.get("https://fake-otp-server.com/otp/routers/default/vectorTiles/stops/14/4772/6206.pbf", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(req, res, ctx) {
    var buffer;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetch(seventyTwo).then(function (resp) {
              return resp.arrayBuffer();
            });

          case 2:
            buffer = _context3.sent;
            return _context3.abrupt("return", res(ctx.set("Content-Length", buffer.byteLength.toString()), ctx.set("Content-Type", "application/x-protobuf"), ctx.body(buffer)));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}())];
//# sourceMappingURL=handlers.js.map