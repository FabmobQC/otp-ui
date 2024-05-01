"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomPlaceName = CustomPlaceName;
exports.CustomTimeColumnContent = CustomTimeColumnContent;
exports.customToRouteAbbreviation = customToRouteAbbreviation;
exports.CustomTransitLegSummary = CustomTransitLegSummary;
exports.WrappedOtpRRTransitLegSubheader = WrappedOtpRRTransitLegSubheader;
exports.StyledItineraryBody = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _addonActions = require("@storybook/addon-actions");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ExclamationTriangle = require("@styled-icons/fa-solid/ExclamationTriangle");

var _ = _interopRequireDefault(require(".."));

var _transitLegSubheader = _interopRequireDefault(require("../otp-react-redux/transit-leg-subheader"));

var ItineraryBodyClasses = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function CustomPlaceName({
  place
}) {
  return `🎉✨🎊 ${place.name} 🎉✨🎊`;
}
/**
 * Custom component, for illustration purposes only, for displaying the time and other info
 * of the given leg in the time column of the ItineraryBody -> PlaceRow component.
 */


function CustomTimeColumnContent({
  isDestination,
  leg
}) {
  const time = isDestination ? leg.endTime : leg.startTime;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: "#E60000"
    }
  }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedTime, {
    value: time
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      fontSize: "80%",
      lineHeight: "1em"
    }
  }, /*#__PURE__*/_react.default.createElement(_ExclamationTriangle.ExclamationTriangle, {
    style: {
      height: "1em"
    }
  }), " Delayed xx\xA0min."));
}

function customToRouteAbbreviation(route) {
  if (route.toString().length < 3) {
    return route.toString();
  }

  return undefined;
}

function CustomTransitLegSummary({
  leg,
  onClick,
  stopsExpanded
}) {
  return (
    /*#__PURE__*/

    /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    _react.default.createElement("div", {
      onClick: onClick
    }, leg.duration && /*#__PURE__*/_react.default.createElement("span", null, "Ride for a custom duration of ", (leg.duration / 60).toFixed(3), " minutes"), leg.intermediateStops && /*#__PURE__*/_react.default.createElement("span", null, ` (${leg.intermediateStops.length + 1} stops)`, /*#__PURE__*/_react.default.createElement(ItineraryBodyClasses.CaretToggle, {
      expanded: stopsExpanded
    })))
  );
}

const StyledItineraryBody = (0, _styledComponents.default)(_.default).withConfig({
  displayName: "demos__StyledItineraryBody",
  componentId: "sc-1ckuiy0-0"
})(["", "{background-color:pink;}", "{color:#676767;font-size:14px;padding-right:4px;padding-top:1px;text-align:right;vertical-align:top;width:60px;}"], ItineraryBodyClasses.LegBody, ItineraryBodyClasses.TimeColumn);
exports.StyledItineraryBody = StyledItineraryBody;

function WrappedOtpRRTransitLegSubheader({
  leg
}) {
  return /*#__PURE__*/_react.default.createElement(_transitLegSubheader.default, {
    leg: leg,
    onStopClick: (0, _addonActions.action)("Transit Stop Click")
  });
}
//# sourceMappingURL=index.js.map