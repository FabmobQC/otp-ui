import React from "react";
import { FormattedTime } from "react-intl";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import { ExclamationTriangle } from "@styled-icons/fa-solid/ExclamationTriangle";
import ItineraryBody from "..";
import OtpRRTransitLegSubheader from "../otp-react-redux/transit-leg-subheader";
import * as ItineraryBodyClasses from "../styled";
export function CustomPlaceName(_ref) {
  var place = _ref.place;
  return "\uD83C\uDF89\u2728\uD83C\uDF8A ".concat(place.name, " \uD83C\uDF89\u2728\uD83C\uDF8A");
}
/**
 * Custom component, for illustration purposes only, for displaying the time and other info
 * of the given leg in the time column of the ItineraryBody -> PlaceRow component.
 */

export function CustomTimeColumnContent(_ref2) {
  var isDestination = _ref2.isDestination,
      leg = _ref2.leg;
  var time = isDestination ? leg.endTime : leg.startTime;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#E60000"
    }
  }, /*#__PURE__*/React.createElement(FormattedTime, {
    value: time
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "80%",
      lineHeight: "1em"
    }
  }, /*#__PURE__*/React.createElement(ExclamationTriangle, {
    style: {
      height: "1em"
    }
  }), " Delayed xx\xA0min."));
}
export function customToRouteAbbreviation(route) {
  if (route.toString().length < 3) {
    return route.toString();
  }

  return undefined;
}
export function CustomTransitLegSummary(_ref3) {
  var leg = _ref3.leg,
      onClick = _ref3.onClick,
      stopsExpanded = _ref3.stopsExpanded;
  return (
    /*#__PURE__*/

    /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    React.createElement("div", {
      onClick: onClick
    }, leg.duration && /*#__PURE__*/React.createElement("span", null, "Ride for a custom duration of ", (leg.duration / 60).toFixed(3), " minutes"), leg.intermediateStops && /*#__PURE__*/React.createElement("span", null, " (".concat(leg.intermediateStops.length + 1, " stops)"), /*#__PURE__*/React.createElement(ItineraryBodyClasses.CaretToggle, {
      expanded: stopsExpanded
    })))
  );
}
export var StyledItineraryBody = styled(ItineraryBody).withConfig({
  displayName: "demos__StyledItineraryBody",
  componentId: "sc-1ckuiy0-0"
})(["", "{background-color:pink;}", "{color:#676767;font-size:14px;padding-right:4px;padding-top:1px;text-align:right;vertical-align:top;width:60px;}"], ItineraryBodyClasses.LegBody, ItineraryBodyClasses.TimeColumn);
export function WrappedOtpRRTransitLegSubheader(_ref4) {
  var leg = _ref4.leg;
  return /*#__PURE__*/React.createElement(OtpRRTransitLegSubheader, {
    leg: leg,
    onStopClick: action("Transit Stop Click")
  });
}
//# sourceMappingURL=index.js.map