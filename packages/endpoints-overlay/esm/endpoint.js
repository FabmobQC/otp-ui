import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Briefcase } from "@styled-icons/fa-solid/Briefcase";
import { Popup } from "@opentripplanner/base-map";
import { FormattedMessage, useIntl } from "react-intl";
import { Home } from "@styled-icons/fa-solid/Home";
import { MapMarkerAlt } from "@styled-icons/fa-solid/MapMarkerAlt";
import { Marker } from "react-map-gl";
import { Sync } from "@styled-icons/fa-solid/Sync";
import { Times } from "@styled-icons/fa-solid/Times";
import coreUtils from "@opentripplanner/core-utils";
import flatten from "flat";
import React, { useState } from "react";
import * as S from "./styled"; // Load the default messages.

import defaultEnglishMessages from "../i18n/en-US.yml";
// HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.
var defaultMessages = flatten(defaultEnglishMessages);
/**
 * These icons are used to render common icons for user locations. These will
 * only show up in applications that allow saving user locations.
 */

function UserLocationInnerIcon(_ref) {
  var type = _ref.type;

  switch (type) {
    case "briefcase":
      return /*#__PURE__*/React.createElement(Briefcase, {
        size: 12
      });

    case "home":
      return /*#__PURE__*/React.createElement(Home, {
        size: 12
      });

    case "map-marker":
      return /*#__PURE__*/React.createElement(MapMarkerAlt, {
        size: 12
      });

    case "refresh":
      return /*#__PURE__*/React.createElement(Sync, {
        size: 12
      });

    case "times":
      return /*#__PURE__*/React.createElement(Times, {
        size: 12
      });

    default:
      return null;
  }
}
/**
 * Wrapper for icon that includes spacing.
 */


function UserLocationIcon(_ref2) {
  var type = _ref2.type;
  return /*#__PURE__*/React.createElement(S.IconWrapper, null, /*#__PURE__*/React.createElement(UserLocationInnerIcon, {
    type: type
  }));
}

var Endpoint = function Endpoint(props) {
  var intl = useIntl();

  var rememberAsHome = function rememberAsHome() {
    var propsLocation = props.location,
        rememberPlace = props.rememberPlace;

    var location = _objectSpread(_objectSpread({}, propsLocation), {}, {
      icon: "home",
      id: "home",
      type: "home"
    });

    rememberPlace({
      type: "home",
      location: location
    });
  };

  var rememberAsWork = function rememberAsWork() {
    var propsLocation = props.location,
        rememberPlace = props.rememberPlace;

    var location = _objectSpread(_objectSpread({}, propsLocation), {}, {
      icon: "briefcase",
      id: "work",
      type: "work"
    });

    rememberPlace({
      type: "work",
      location: location
    });
  };

  var forgetHome = function forgetHome() {
    var forgetPlace = props.forgetPlace;
    forgetPlace("home");
  };

  var forgetWork = function forgetWork() {
    var forgetPlace = props.forgetPlace;
    forgetPlace("work");
  };

  var clearLocation = function clearLocation() {
    var propsClearLocation = props.clearLocation,
        type = props.type;
    propsClearLocation({
      locationType: type
    });
  };

  var swapLocation = function swapLocation() {
    var location = props.location,
        setLocation = props.setLocation,
        type = props.type;
    clearLocation();
    var otherType = type === "from" ? "to" : "from";
    setLocation({
      locationType: otherType,
      location: location
    });
  };

  var onDragEnd = function onDragEnd(e) {
    var setLocation = props.setLocation,
        type = props.type;
    var rawLocation = e.lngLat;
    var coordinates = {
      lat: rawLocation.lat,
      lon: rawLocation.lng
    };

    var location = _objectSpread(_objectSpread({}, coordinates), {}, {
      name: intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.EndpointsOverlay.coordinates"],
        description: "Formats rendering coordinates for a locale using the correct number separator",
        // FIXME: Combine with the same method at
        // https://github.com/opentripplanner/otp-react-redux/blob/6d5bc90e57843822809b0dff397bad19d66aeb43/lib/components/form/user-settings.js#L34
        // and move this potentially shared message to an appropriate package.
        id: "otpUi.EndpointsOverlay.coordinates"
      }, coordinates)
    });

    setLocation({
      locationType: type,
      location: location,
      reverseGeocode: true
    });
  };

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showPopup = _useState2[0],
      setShowPopup = _useState2[1];

  var location = props.location,
      locations = props.locations,
      MapMarkerIcon = props.MapMarkerIcon,
      showUserSettings = props.showUserSettings,
      type = props.type;
  if (!(location && location.lat && location.lon)) return null;
  var match = locations.find(function (l) {
    return coreUtils.map.matchLatLon(l, location);
  });
  var isWork = match && match.type === "work";
  var isHome = match && match.type === "home";
  var iconHtml = /*#__PURE__*/React.createElement(MapMarkerIcon, {
    location: location,
    type: type
  });
  var otherType = type === "from" ? "to" : "from";
  var icon = isWork ? "briefcase" : isHome ? "home" : "map-marker";
  return (
    /*#__PURE__*/
    // We have to use the standard marker here since we need to adjust state
    // after and during drag
    React.createElement(Marker, {
      anchor: "center",
      draggable: true,
      latitude: location.lat,
      longitude: location.lon,
      onDragEnd: onDragEnd,
      onDragStart: function onDragStart() {
        return setShowPopup(false);
      },
      onClick: function onClick() {
        return setShowPopup(true);
      }
    }, iconHtml, showPopup && showUserSettings && /*#__PURE__*/React.createElement(Popup, {
      onClose: function onClose() {
        return setShowPopup(false);
      },
      latitude: location.lat,
      longitude: location.lon
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(UserLocationIcon, {
      type: icon
    }), location.name), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(S.Button, {
      disabled: isWork,
      onClick: isHome ? forgetHome : rememberAsHome
    }, isHome ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(UserLocationIcon, {
      type: "times"
    }), /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.EndpointsOverlay.forgetHome"],
      description: "Button text to forget the home location",
      id: "otpUi.EndpointsOverlay.forgetHome"
    })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(UserLocationIcon, {
      type: "home"
    }), /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.EndpointsOverlay.saveAsHome"],
      description: "Button text to save the location as home location",
      id: "otpUi.EndpointsOverlay.saveAsHome"
    })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(S.Button, {
      disabled: isHome,
      onClick: isWork ? forgetWork : rememberAsWork
    }, isWork ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(UserLocationIcon, {
      type: "times"
    }), /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.EndpointsOverlay.forgetWork"],
      description: "Button text to forget the work location",
      id: "otpUi.EndpointsOverlay.forgetWork"
    })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(UserLocationIcon, {
      type: "briefcase"
    }), /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.EndpointsOverlay.saveAsWork"],
      description: "Button text to save the location as work location",
      id: "otpUi.EndpointsOverlay.saveAsWork"
    })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(S.Button, {
      onClick: clearLocation
    }, /*#__PURE__*/React.createElement(UserLocationIcon, {
      type: "times"
    }), /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.EndpointsOverlay.clearLocation"],
      description: "Button text to clear the from/to location",
      id: "otpUi.EndpointsOverlay.clearLocation",
      values: {
        locationType: type
      }
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(S.Button, {
      onClick: swapLocation
    }, /*#__PURE__*/React.createElement(UserLocationIcon, {
      type: "refresh"
    }), /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.EndpointsOverlay.swapLocation"],
      description: "Button text to swap the from/to location",
      id: "otpUi.EndpointsOverlay.swapLocation",
      values: {
        locationType: otherType
      }
    }))))))
  );
};

export default Endpoint;
//# sourceMappingURL=endpoint.js.map