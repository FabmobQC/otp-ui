import coreUtils from "@opentripplanner/core-utils";
import LocationIcon from "@opentripplanner/location-icon";
import React from "react";
import styled, { css } from "styled-components";
import { Circle } from "@styled-icons/fa-solid/Circle";
var cssWalk = css(["background:radial-gradient(ellipse at center,#87cefa 40%,transparent 10%);background-position:center -5px;background-repeat:repeat-y;background-size:12px 12px;left:6px;right:6px;"]);
var cssBicycle = css(["background:repeating-linear-gradient( 0deg,red,red 8px,white 8px,white 12.5px );left:7.5px;right:7.5px;"]);
var cssCar = css(["background:repeating-linear-gradient( 0deg,grey,grey 8px,white 8px,white 12.5px );left:7.5px;right:7.5px;"]);
var cssMicromobility = css(["background:repeating-linear-gradient( 0deg,#f5a729,#f5a729 8px,white 8px,white 12.5px );left:7.5px;right:7.5px;"]);
var cssTransit = css(["background-color:gray;left:5px;right:5px;"]);

function getLegCSS(mode) {
  switch (mode) {
    case "WALK":
      return cssWalk;

    case "BICYCLE":
    case "BICYCLE_RENT":
      return cssBicycle;

    case "CAR":
      return cssCar;

    case "MICROMOBILITY":
    case "MICROMOBILITY_RENT":
    case "SCOOTER":
      return cssMicromobility;

    default:
      return cssTransit;
  }
}

var IconStacker = styled.span.withConfig({
  displayName: "line-column-content__IconStacker",
  componentId: "sc-1wcbb7o-0"
})(["position:absolute;width:100%;top:3px;z-index:20;"]);

var legLineBackgroundColor = function legLineBackgroundColor(_ref) {
  var leg = _ref.leg,
      routeColor = _ref.routeColor;
  var mode = leg.mode;
  return leg.transitLeg || coreUtils.itinerary.isTransit(mode) ? routeColor ? "#".concat(routeColor) : "#000088" : undefined;
};
/**
 * Generates background-image CSS for "barber pole" effect
 * @param routeColor  the background color. Assumed to be hex.
 */


export var barberPole = function barberPole(routeColor) {
  var gap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  return "repeating-linear-gradient( \n  -45deg, \n  ".concat(routeColor, "30, \n  ").concat(routeColor, "30 ").concat(gap, "px, \n  ").concat(routeColor, " ").concat(gap, "px, \n  ").concat(routeColor, " ").concat(gap * 2, "px\n  );");
};
var LegLine = styled.div.withConfig({
  displayName: "line-column-content__LegLine",
  componentId: "sc-1wcbb7o-1"
})(["", " background-color:", ";background:", ";bottom:-11px;position:absolute;top:11px;z-index:10;"], function (props) {
  return getLegCSS(props.leg.mode);
}, function (props) {
  return legLineBackgroundColor(props);
}, function (props) {
  return coreUtils.itinerary.isFlex(props.leg) ? barberPole(legLineBackgroundColor(props)) : undefined;
});
var StackedCircle = styled(Circle).withConfig({
  displayName: "line-column-content__StackedCircle",
  componentId: "sc-1wcbb7o-2"
})(["left:0;line-height:inherit;position:absolute;text-align:center;width:100%;"]);
var StackedCircleInner = styled(StackedCircle).withConfig({
  displayName: "line-column-content__StackedCircleInner",
  componentId: "sc-1wcbb7o-3"
})(["top:3px;"]);
var StyledLocationIcon = styled(LocationIcon).withConfig({
  displayName: "line-column-content__StyledLocationIcon",
  componentId: "sc-1wcbb7o-4"
})(["left:0;position:absolute;text-align:center;width:100%;"]);
export default function LineColumnContent(_ref2) {
  var interline = _ref2.interline,
      isDestination = _ref2.isDestination,
      lastLeg = _ref2.lastLeg,
      leg = _ref2.leg,
      legIndex = _ref2.legIndex;
  var legBadge;

  if (interline) {// Interlined. Don't create a leg badge as a stop marker should be inserted
    // from the place name
  } else if (isDestination) {
    // Destination
    legBadge = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StackedCircleInner, {
      size: 14,
      color: "white"
    }), /*#__PURE__*/React.createElement(StyledLocationIcon, {
      size: 20,
      type: "to"
    }));
  } else if (legIndex === 0) {
    // Origin
    legBadge = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StackedCircleInner, {
      size: 14,
      color: "white"
    }), /*#__PURE__*/React.createElement(StyledLocationIcon, {
      size: 20,
      type: "from"
    }));
  } else if ((leg.from.bikeShareId || leg.from.rentalVehicle) && leg.mode.startsWith("BICYCLE") || lastLeg.from.bikeShareId && leg.mode === "WALK") {
    // start or end of a bike rental leg (not including origin or
    // destination)
    legBadge = /*#__PURE__*/React.createElement(StackedCircle, {
      size: 17,
      color: "red"
    });
  } else if (leg.from.vertexType === "VEHICLERENTAL" || leg.from.vertexType === "BIKESHARE" || lastLeg.from.vertexType === "VEHICLERENTAL" && leg.mode === "WALK" || lastLeg.from.vertexType === "BIKESHARE" && leg.mode === "WALK") {
    // start or end of a vehicle rental leg (not including origin or
    // destination)
    legBadge = /*#__PURE__*/React.createElement(StackedCircle, {
      size: 17,
      color: "#f5a729"
    });
  } else if (leg.mode === "CAR" && lastLeg.mode === "WALK" || lastLeg.mode === "CAR" && leg.mode === "WALK") {
    // start or end of a car rental/TNC/P&R leg (not including origin or
    // destination)
    legBadge = /*#__PURE__*/React.createElement(StackedCircle, {
      size: 17,
      color: "#888"
    });
  } else {
    legBadge = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StackedCircle, {
      size: 20,
      color: "black"
    }), /*#__PURE__*/React.createElement(StackedCircleInner, {
      size: 14,
      color: "white"
    }));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, !isDestination && /*#__PURE__*/React.createElement(LegLine, {
    leg: leg,
    routeColor: leg.routeColor
  }), /*#__PURE__*/React.createElement(IconStacker, null, legBadge));
}
//# sourceMappingURL=line-column-content.js.map