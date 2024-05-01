import React from "react";
import Endpoint from "./endpoint";
import * as S from "./styled";

var noop = function noop() {};

function DefaultMapMarkerIcon(_ref) {
  var location = _ref.location,
      type = _ref.type;
  var PIXELS = 20;
  var inner;

  switch (type) {
    case "to":
      {
        // The fa-solid's "location-dot" icon used here has a width-height ratio of 3/4,
        // so the desired width for the outline/"stacked" element is 4/3 of the "apparent" width.
        var toPixels = PIXELS * 1.3;
        inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(S.StackedToIcon, {
          size: toPixels,
          type: type
        }), /*#__PURE__*/React.createElement(S.ToIcon, {
          size: toPixels - 6,
          type: type
        }));
        break;
      }

    default:
      // Default to the location icon on top of a white background.
      inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(S.StackedCircle, {
        size: PIXELS
      }), /*#__PURE__*/React.createElement(S.StackedLocationIcon, {
        size: PIXELS,
        type: type
      }));
      break;
  }

  return /*#__PURE__*/React.createElement(S.StackedIconContainer, {
    title: location.name
  }, inner);
}

var EndpointsOverlay = function EndpointsOverlay(_ref2) {
  var _ref2$clearLocation = _ref2.clearLocation,
      clearLocation = _ref2$clearLocation === void 0 ? noop : _ref2$clearLocation,
      _ref2$forgetPlace = _ref2.forgetPlace,
      forgetPlace = _ref2$forgetPlace === void 0 ? noop : _ref2$forgetPlace,
      fromLocation = _ref2.fromLocation,
      _ref2$intermediatePla = _ref2.intermediatePlaces,
      intermediatePlaces = _ref2$intermediatePla === void 0 ? [] : _ref2$intermediatePla,
      _ref2$locations = _ref2.locations,
      locations = _ref2$locations === void 0 ? [] : _ref2$locations,
      _ref2$MapMarkerIcon = _ref2.MapMarkerIcon,
      MapMarkerIcon = _ref2$MapMarkerIcon === void 0 ? DefaultMapMarkerIcon : _ref2$MapMarkerIcon,
      _ref2$rememberPlace = _ref2.rememberPlace,
      rememberPlace = _ref2$rememberPlace === void 0 ? noop : _ref2$rememberPlace,
      setLocation = _ref2.setLocation,
      showUserSettings = _ref2.showUserSettings,
      toLocation = _ref2.toLocation;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Endpoint, {
    clearLocation: clearLocation,
    forgetPlace: forgetPlace,
    location: fromLocation,
    locations: locations,
    MapMarkerIcon: MapMarkerIcon,
    rememberPlace: rememberPlace,
    setLocation: setLocation,
    showUserSettings: showUserSettings,
    type: "from"
  }), intermediatePlaces.map(function (place, index) {
    return /*#__PURE__*/React.createElement(Endpoint, {
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
  }), /*#__PURE__*/React.createElement(Endpoint, {
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
};

export default EndpointsOverlay; // Rename styled components for export.

export { S as Styled };
//# sourceMappingURL=index.js.map