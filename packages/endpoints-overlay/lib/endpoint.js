"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Briefcase = require("@styled-icons/fa-solid/Briefcase");

var _baseMap = require("@opentripplanner/base-map");

var _reactIntl = require("react-intl");

var _Home = require("@styled-icons/fa-solid/Home");

var _MapMarkerAlt = require("@styled-icons/fa-solid/MapMarkerAlt");

var _reactMapGl = require("react-map-gl");

var _Sync = require("@styled-icons/fa-solid/Sync");

var _Times = require("@styled-icons/fa-solid/Times");

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _flat = _interopRequireDefault(require("flat"));

var _react = _interopRequireWildcard(require("react"));

var S = _interopRequireWildcard(require("./styled"));

var _enUS = _interopRequireDefault(require("../i18n/en-US.yml"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Load the default messages.
// HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.
const defaultMessages = (0, _flat.default)(_enUS.default);
/**
 * These icons are used to render common icons for user locations. These will
 * only show up in applications that allow saving user locations.
 */

function UserLocationInnerIcon({
  type
}) {
  switch (type) {
    case "briefcase":
      return /*#__PURE__*/_react.default.createElement(_Briefcase.Briefcase, {
        size: 12
      });

    case "home":
      return /*#__PURE__*/_react.default.createElement(_Home.Home, {
        size: 12
      });

    case "map-marker":
      return /*#__PURE__*/_react.default.createElement(_MapMarkerAlt.MapMarkerAlt, {
        size: 12
      });

    case "refresh":
      return /*#__PURE__*/_react.default.createElement(_Sync.Sync, {
        size: 12
      });

    case "times":
      return /*#__PURE__*/_react.default.createElement(_Times.Times, {
        size: 12
      });

    default:
      return null;
  }
}
/**
 * Wrapper for icon that includes spacing.
 */


function UserLocationIcon({
  type
}) {
  return /*#__PURE__*/_react.default.createElement(S.IconWrapper, null, /*#__PURE__*/_react.default.createElement(UserLocationInnerIcon, {
    type: type
  }));
}

const Endpoint = props => {
  const intl = (0, _reactIntl.useIntl)();

  const rememberAsHome = () => {
    const {
      location: propsLocation,
      rememberPlace
    } = props;
    const location = { ...propsLocation,
      icon: "home",
      id: "home",
      type: "home"
    };
    rememberPlace({
      type: "home",
      location
    });
  };

  const rememberAsWork = () => {
    const {
      location: propsLocation,
      rememberPlace
    } = props;
    const location = { ...propsLocation,
      icon: "briefcase",
      id: "work",
      type: "work"
    };
    rememberPlace({
      type: "work",
      location
    });
  };

  const forgetHome = () => {
    const {
      forgetPlace
    } = props;
    forgetPlace("home");
  };

  const forgetWork = () => {
    const {
      forgetPlace
    } = props;
    forgetPlace("work");
  };

  const clearLocation = () => {
    const {
      clearLocation: propsClearLocation,
      type
    } = props;
    propsClearLocation({
      locationType: type
    });
  };

  const swapLocation = () => {
    const {
      location,
      setLocation,
      type
    } = props;
    clearLocation();
    const otherType = type === "from" ? "to" : "from";
    setLocation({
      locationType: otherType,
      location
    });
  };

  const onDragEnd = e => {
    const {
      setLocation,
      type
    } = props;
    const rawLocation = e.lngLat;
    const coordinates = {
      lat: rawLocation.lat,
      lon: rawLocation.lng
    };
    const location = { ...coordinates,
      name: intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.EndpointsOverlay.coordinates"],
        description: "Formats rendering coordinates for a locale using the correct number separator",
        // FIXME: Combine with the same method at
        // https://github.com/opentripplanner/otp-react-redux/blob/6d5bc90e57843822809b0dff397bad19d66aeb43/lib/components/form/user-settings.js#L34
        // and move this potentially shared message to an appropriate package.
        id: "otpUi.EndpointsOverlay.coordinates"
      }, coordinates)
    };
    setLocation({
      locationType: type,
      location,
      reverseGeocode: true
    });
  };

  const [showPopup, setShowPopup] = (0, _react.useState)(false);
  const {
    location,
    locations,
    MapMarkerIcon,
    showUserSettings,
    type
  } = props;
  if (!(location && location.lat && location.lon)) return null;
  const match = locations.find(l => _coreUtils.default.map.matchLatLon(l, location));
  const isWork = match && match.type === "work";
  const isHome = match && match.type === "home";

  const iconHtml = /*#__PURE__*/_react.default.createElement(MapMarkerIcon, {
    location: location,
    type: type
  });

  const otherType = type === "from" ? "to" : "from";
  const icon = isWork ? "briefcase" : isHome ? "home" : "map-marker";
  return (
    /*#__PURE__*/
    // We have to use the standard marker here since we need to adjust state
    // after and during drag
    _react.default.createElement(_reactMapGl.Marker, {
      anchor: "center",
      draggable: true,
      latitude: location.lat,
      longitude: location.lon,
      onDragEnd: onDragEnd,
      onDragStart: () => setShowPopup(false),
      onClick: () => setShowPopup(true)
    }, iconHtml, showPopup && showUserSettings && /*#__PURE__*/_react.default.createElement(_baseMap.Popup, {
      onClose: () => setShowPopup(false),
      latitude: location.lat,
      longitude: location.lon
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("strong", null, /*#__PURE__*/_react.default.createElement(UserLocationIcon, {
      type: icon
    }), location.name), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(S.Button, {
      disabled: isWork,
      onClick: isHome ? forgetHome : rememberAsHome
    }, isHome ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(UserLocationIcon, {
      type: "times"
    }), /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.EndpointsOverlay.forgetHome"],
      description: "Button text to forget the home location",
      id: "otpUi.EndpointsOverlay.forgetHome"
    })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(UserLocationIcon, {
      type: "home"
    }), /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.EndpointsOverlay.saveAsHome"],
      description: "Button text to save the location as home location",
      id: "otpUi.EndpointsOverlay.saveAsHome"
    })))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(S.Button, {
      disabled: isHome,
      onClick: isWork ? forgetWork : rememberAsWork
    }, isWork ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(UserLocationIcon, {
      type: "times"
    }), /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.EndpointsOverlay.forgetWork"],
      description: "Button text to forget the work location",
      id: "otpUi.EndpointsOverlay.forgetWork"
    })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(UserLocationIcon, {
      type: "briefcase"
    }), /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.EndpointsOverlay.saveAsWork"],
      description: "Button text to save the location as work location",
      id: "otpUi.EndpointsOverlay.saveAsWork"
    })))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(S.Button, {
      onClick: clearLocation
    }, /*#__PURE__*/_react.default.createElement(UserLocationIcon, {
      type: "times"
    }), /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.EndpointsOverlay.clearLocation"],
      description: "Button text to clear the from/to location",
      id: "otpUi.EndpointsOverlay.clearLocation",
      values: {
        locationType: type
      }
    }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(S.Button, {
      onClick: swapLocation
    }, /*#__PURE__*/_react.default.createElement(UserLocationIcon, {
      type: "refresh"
    }), /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.EndpointsOverlay.swapLocation"],
      description: "Button text to swap the from/to location",
      id: "otpUi.EndpointsOverlay.swapLocation",
      values: {
        locationType: otherType
      }
    }))))))
  );
};

var _default = Endpoint;
exports.default = _default;
//# sourceMappingURL=endpoint.js.map