"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Styled = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _endpoint = _interopRequireDefault(require("./endpoint"));

var S = _interopRequireWildcard(require("./styled"));

exports.Styled = S;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const noop = () => {};

function DefaultMapMarkerIcon({
  location,
  type
}) {
  const PIXELS = 20;
  let inner;

  switch (type) {
    case "to":
      {
        // The fa-solid's "location-dot" icon used here has a width-height ratio of 3/4,
        // so the desired width for the outline/"stacked" element is 4/3 of the "apparent" width.
        const toPixels = PIXELS * 1.3;
        inner = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(S.StackedToIcon, {
          size: toPixels,
          type: type
        }), /*#__PURE__*/_react.default.createElement(S.ToIcon, {
          size: toPixels - 6,
          type: type
        }));
        break;
      }

    default:
      // Default to the location icon on top of a white background.
      inner = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(S.StackedCircle, {
        size: PIXELS
      }), /*#__PURE__*/_react.default.createElement(S.StackedLocationIcon, {
        size: PIXELS,
        type: type
      }));
      break;
  }

  return /*#__PURE__*/_react.default.createElement(S.StackedIconContainer, {
    title: location.name
  }, inner);
}

const EndpointsOverlay = ({
  clearLocation = noop,
  forgetPlace = noop,
  fromLocation,
  intermediatePlaces = [],
  locations = [],
  MapMarkerIcon = DefaultMapMarkerIcon,
  rememberPlace = noop,
  setLocation,
  showUserSettings,
  toLocation
}) => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_endpoint.default, {
  clearLocation: clearLocation,
  forgetPlace: forgetPlace,
  location: fromLocation,
  locations: locations,
  MapMarkerIcon: MapMarkerIcon,
  rememberPlace: rememberPlace,
  setLocation: setLocation,
  showUserSettings: showUserSettings,
  type: "from"
}), intermediatePlaces.map((place, index) => {
  return /*#__PURE__*/_react.default.createElement(_endpoint.default, {
    clearLocation: clearLocation,
    forgetPlace: forgetPlace,
    key: index,
    location: place,
    locations: locations,
    MapMarkerIcon: MapMarkerIcon,
    rememberPlace: rememberPlace,
    setLocation: setLocation,
    showUserSettings: showUserSettings,
    type: place.type
  });
}), /*#__PURE__*/_react.default.createElement(_endpoint.default, {
  clearLocation: clearLocation,
  forgetPlace: forgetPlace,
  location: toLocation,
  locations: locations,
  MapMarkerIcon: MapMarkerIcon,
  rememberPlace: rememberPlace,
  setLocation: setLocation,
  showUserSettings: showUserSettings,
  type: "to"
}));

var _default = EndpointsOverlay; // Rename styled components for export.

exports.default = _default;
//# sourceMappingURL=index.js.map