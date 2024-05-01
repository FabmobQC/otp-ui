"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PlaceName;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var S = _interopRequireWildcard(require("../styled"));

var _util = require("../util");

var _basicPlaceName = _interopRequireDefault(require("./basic-place-name"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function PlaceName({
  config,
  interline,
  place
}) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_basicPlaceName.default, {
    config: config,
    interline: interline,
    place: place
  }), place.stopId && !interline && /*#__PURE__*/_react.default.createElement(S.StopIdSpan, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _util.defaultMessages["otpUi.TransitLegBody.stopIdBasic"],
    description: "Displays a stop id",
    id: "otpUi.TransitLegBody.stopIdBasic",
    values: {
      stopId: place.stopId.split(":")[1]
    }
  }))
  /*
    TODO: There is no explicit stop button on the mocks.
    Have a question out to marketing as to whether the above StopID
    is a button to navigate the user to the arrival list for the stop
    that's what the button below does
  */

  /* <ViewStopButton stopId={place.stopId} /> */
  );
}
//# sourceMappingURL=place-name.js.map