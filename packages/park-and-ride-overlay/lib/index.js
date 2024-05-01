"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseMap = require("@opentripplanner/base-map");

var _fromToLocationPicker = _interopRequireDefault(require("@opentripplanner/from-to-location-picker"));

var _react = _interopRequireDefault(require("react"));

var _parkAndRideMarker = _interopRequireDefault(require("./park-and-ride-marker"));

const ParkAndRideOverlay = props => {
  const {
    parkAndRideLocations,
    setLocation
  } = props;
  if (!parkAndRideLocations || parkAndRideLocations.length === 0) return null;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, parkAndRideLocations.map((location, k) => {
    // TODO: extract park-and-ride names from international "Park-And-Ride" string constructs.
    const name = location.name.startsWith("P+R ") ? location.name.substring(4) : location.name;
    return /*#__PURE__*/_react.default.createElement(_baseMap.MarkerWithPopup // TODO: find a better way to handle popupProps
    // @ts-expect-error lat and lng aren't optional, but are being set by the child
    , {
      popupProps: {
        offset: 10
      },
      popupContents: /*#__PURE__*/_react.default.createElement(_baseMap.Styled.MapOverlayPopup, null, /*#__PURE__*/_react.default.createElement(_baseMap.Styled.PopupTitle, null, name), /*#__PURE__*/_react.default.createElement(_baseMap.Styled.PopupRow, null, /*#__PURE__*/_react.default.createElement(_fromToLocationPicker.default, {
        label: true,
        location: {
          lat: location.y,
          lon: location.x,
          name
        },
        setLocation: setLocation
      }))),
      key: k,
      position: [location.y, location.x]
    }, /*#__PURE__*/_react.default.createElement(_parkAndRideMarker.default, null));
  }));
};

var _default = ParkAndRideOverlay;
exports.default = _default;
//# sourceMappingURL=index.js.map