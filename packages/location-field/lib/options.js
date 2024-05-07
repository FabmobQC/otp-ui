"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeocodedOptionIcon = GeocodedOptionIcon;
exports.Option = Option;
exports.TransitStopOption = TransitStopOption;
exports.UserLocationIcon = UserLocationIcon;
exports.getStoredPlaceName = getStoredPlaceName;
exports.getRenderData = getRenderData;
exports.MenuItem = exports.ICON_SIZE = void 0;

var _humanizeDistance = require("@opentripplanner/humanize-distance");

var _react = _interopRequireDefault(require("react"));

var _Bus = require("@styled-icons/fa-solid/Bus");

var _Briefcase = require("@styled-icons/fa-solid/Briefcase");

var _Home = require("@styled-icons/fa-solid/Home");

var _MapMarker = require("@styled-icons/fa-solid/MapMarker");

var _MapPin = require("@styled-icons/fa-solid/MapPin");

var S = _interopRequireWildcard(require("./styled"));

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ICON_SIZE = 13;
exports.ICON_SIZE = ICON_SIZE;

function GeocodedOptionIcon({
  feature = {}
}) {
  const {
    properties
  } = feature;

  if (feature && properties) {
    const {
      source
    } = properties;

    if (source === "transit") {
      return /*#__PURE__*/_react.default.createElement(_Bus.Bus, {
        size: ICON_SIZE
      });
    }
  }

  return /*#__PURE__*/_react.default.createElement(_MapPin.MapPin, {
    size: ICON_SIZE
  });
}

const MenuItem = ({
  active = false,
  children,
  disabled = false,
  id,
  onClick = null
}) => /*#__PURE__*/_react.default.createElement(S.MenuItemLi, {
  // Hide disabled choices from screen readers (a relevant status is already provided).
  "aria-hidden": disabled || undefined
  /* A known issue prevents combobox results to be read out on Voiceover. This is a hack to ensure 
  AT hear all options - see https://react-spectrum.adobe.com/blog/building-a-combobox.html#voiceover */
  ,
  "aria-live": active ? "assertive" : "off",
  active: active,
  id: id,
  onClick: disabled ? null : onClick,
  role: "option",
  "aria-selected": active,
  tabIndex: -1
}, children);

exports.MenuItem = MenuItem;

function Option({
  classes = "",
  color = null,
  disabled = false,
  icon = null,
  id,
  isActive = false,
  onClick,
  subTitle = null,
  title = null
}) {
  return /*#__PURE__*/_react.default.createElement(MenuItem, {
    active: isActive,
    disabled: disabled,
    id: id,
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement(S.OptionContainer, {
    className: classes
  }, /*#__PURE__*/_react.default.createElement(S.OptionIconContainer, {
    style: {
      color
    }
  }, icon), /*#__PURE__*/_react.default.createElement(S.OptionContent, null, title, subTitle && /*#__PURE__*/_react.default.createElement(S.OptionSubTitle, null, /*#__PURE__*/_react.default.createElement(S.HiddenContent, null, ", "), subTitle))));
}

function TransitStopOption({
  id,
  isActive = false,
  onClick,
  stop,
  stopOptionIcon
}) {
  return /*#__PURE__*/_react.default.createElement(MenuItem, {
    active: isActive,
    id: id,
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement(S.StopIconAndDistanceContainer, null, stopOptionIcon, /*#__PURE__*/_react.default.createElement(S.StopDistance, null, (0, _humanizeDistance.humanizeDistanceStringImperial)(stop.dist, true))), /*#__PURE__*/_react.default.createElement(S.StopContentContainer, null, /*#__PURE__*/_react.default.createElement(S.StopName, null, stop.name, " (", stop.code, ")"), /*#__PURE__*/_react.default.createElement(S.StopRoutes, null, (stop.routes || []).map(route => {
    const name = route.shortName || route.longName;
    return /*#__PURE__*/_react.default.createElement(S.RouteName, {
      key: `route-${name}`
    }, name);
  }))), /*#__PURE__*/_react.default.createElement(S.ClearBoth, null));
}

function UserLocationIcon({
  userLocation
}) {
  if (userLocation.icon === "work") return /*#__PURE__*/_react.default.createElement(_Briefcase.Briefcase, {
    size: ICON_SIZE
  });
  if (userLocation.icon === "home") return /*#__PURE__*/_react.default.createElement(_Home.Home, {
    size: ICON_SIZE
  });
  return /*#__PURE__*/_react.default.createElement(_MapMarker.MapMarker, {
    size: ICON_SIZE
  });
}

function getLocationName(location, intl) {
  switch (location.type) {
    case "home":
      return intl.formatMessage({
        defaultMessage: "Home",
        description: "The home location",
        id: "otpUi.LocationField.homeLocation"
      });

    case "work":
      return intl.formatMessage({
        defaultMessage: "Work",
        description: "The work location",
        id: "otpUi.LocationField.workLocation"
      });

    default:
      return location.name;
  }
}

function getStoredPlaceName(location, intl, withDetails = true) {
  let detailText;

  if (withDetails) {
    if (location.type === "home" || location.type === "work") {
      detailText = location.name;
    } else if (location.type === "stop") {
      detailText = location.id;
    } // The case below for recent searches is not currently being used.
    // } else if (location.type === "recent" && location.timestamp) {
    //   detailText = moment(location.timestamp).fromNow();

  }

  return (0, _utils.addInParentheses)(intl, getLocationName(location, intl), detailText);
}
/**
 * Helper to populate the display name for a user-saved location.
 */


function getRenderData(location, setLocation, Icon, intl) {
  return {
    displayName: getStoredPlaceName(location, intl),
    icon: /*#__PURE__*/_react.default.createElement(Icon, {
      userLocation: location
    }),
    // Create the event handler for when the location is selected
    locationSelected: () => setLocation(location, "SAVED")
  };
}
//# sourceMappingURL=options.js.map