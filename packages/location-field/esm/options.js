import { humanizeDistanceStringImperial } from "@opentripplanner/humanize-distance";
import React from "react";
import { Bus } from "@styled-icons/fa-solid/Bus";
import { Briefcase } from "@styled-icons/fa-solid/Briefcase";
import { Home } from "@styled-icons/fa-solid/Home";
import { MapMarker } from "@styled-icons/fa-solid/MapMarker";
import { MapPin } from "@styled-icons/fa-solid/MapPin";
import * as S from "./styled";
import { addInParentheses } from "./utils";
export var ICON_SIZE = 13;
export function GeocodedOptionIcon(_ref) {
  var _ref$feature = _ref.feature,
      feature = _ref$feature === void 0 ? {} : _ref$feature;
  var properties = feature.properties;

  if (feature && properties) {
    var source = properties.source;

    if (source === "transit") {
      return /*#__PURE__*/React.createElement(Bus, {
        size: ICON_SIZE
      });
    }
  }

  return /*#__PURE__*/React.createElement(MapPin, {
    size: ICON_SIZE
  });
}
export var MenuItem = function MenuItem(_ref2) {
  var _ref2$active = _ref2.active,
      active = _ref2$active === void 0 ? false : _ref2$active,
      children = _ref2.children,
      _ref2$disabled = _ref2.disabled,
      disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
      id = _ref2.id,
      _ref2$onClick = _ref2.onClick,
      onClick = _ref2$onClick === void 0 ? null : _ref2$onClick;
  return /*#__PURE__*/React.createElement(S.MenuItemLi, {
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
};
export function Option(_ref3) {
  var _ref3$classes = _ref3.classes,
      classes = _ref3$classes === void 0 ? "" : _ref3$classes,
      _ref3$color = _ref3.color,
      color = _ref3$color === void 0 ? null : _ref3$color,
      _ref3$disabled = _ref3.disabled,
      disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
      _ref3$icon = _ref3.icon,
      icon = _ref3$icon === void 0 ? null : _ref3$icon,
      id = _ref3.id,
      _ref3$isActive = _ref3.isActive,
      isActive = _ref3$isActive === void 0 ? false : _ref3$isActive,
      onClick = _ref3.onClick,
      _ref3$subTitle = _ref3.subTitle,
      subTitle = _ref3$subTitle === void 0 ? null : _ref3$subTitle,
      _ref3$title = _ref3.title,
      title = _ref3$title === void 0 ? null : _ref3$title;
  return /*#__PURE__*/React.createElement(MenuItem, {
    active: isActive,
    disabled: disabled,
    id: id,
    onClick: onClick
  }, /*#__PURE__*/React.createElement(S.OptionContainer, {
    className: classes
  }, /*#__PURE__*/React.createElement(S.OptionIconContainer, {
    style: {
      color: color
    }
  }, icon), /*#__PURE__*/React.createElement(S.OptionContent, null, title, subTitle && /*#__PURE__*/React.createElement(S.OptionSubTitle, null, /*#__PURE__*/React.createElement(S.HiddenContent, null, ", "), subTitle))));
}
export function TransitStopOption(_ref4) {
  var id = _ref4.id,
      _ref4$isActive = _ref4.isActive,
      isActive = _ref4$isActive === void 0 ? false : _ref4$isActive,
      onClick = _ref4.onClick,
      stop = _ref4.stop,
      stopOptionIcon = _ref4.stopOptionIcon;
  return /*#__PURE__*/React.createElement(MenuItem, {
    active: isActive,
    id: id,
    onClick: onClick
  }, /*#__PURE__*/React.createElement(S.StopIconAndDistanceContainer, null, stopOptionIcon, /*#__PURE__*/React.createElement(S.StopDistance, null, humanizeDistanceStringImperial(stop.dist, true))), /*#__PURE__*/React.createElement(S.StopContentContainer, null, /*#__PURE__*/React.createElement(S.StopName, null, stop.name, " (", stop.code, ")"), /*#__PURE__*/React.createElement(S.StopRoutes, null, (stop.routes || []).map(function (route) {
    var name = route.shortName || route.longName;
    return /*#__PURE__*/React.createElement(S.RouteName, {
      key: "route-".concat(name)
    }, name);
  }))), /*#__PURE__*/React.createElement(S.ClearBoth, null));
}
export function UserLocationIcon(_ref5) {
  var userLocation = _ref5.userLocation;
  if (userLocation.icon === "work") return /*#__PURE__*/React.createElement(Briefcase, {
    size: ICON_SIZE
  });
  if (userLocation.icon === "home") return /*#__PURE__*/React.createElement(Home, {
    size: ICON_SIZE
  });
  return /*#__PURE__*/React.createElement(MapMarker, {
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

export function getStoredPlaceName(location, intl) {
  var withDetails = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var detailText;

  if (withDetails) {
    if (location.type === "home" || location.type === "work") {
      detailText = location.name;
    } else if (location.type === "stop") {
      detailText = location.id;
    } // The case below for recent searches is not currently being used.
    // } else if (location.type === "recent" && location.timestamp) {
    //   detailText = moment(location.timestamp).fromNow();

  }

  return addInParentheses(intl, getLocationName(location, intl), detailText);
}
/**
 * Helper to populate the display name for a user-saved location.
 */

export function getRenderData(location, setLocation, Icon, intl) {
  return {
    displayName: getStoredPlaceName(location, intl),
    icon: /*#__PURE__*/React.createElement(Icon, {
      userLocation: location
    }),
    // Create the event handler for when the location is selected
    locationSelected: function locationSelected() {
      return setLocation(location, "SAVED");
    }
  };
}
//# sourceMappingURL=options.js.map