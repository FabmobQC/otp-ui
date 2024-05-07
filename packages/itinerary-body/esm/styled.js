// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for the icons package.
import { Map } from "@opentripplanner/icons";
import React from "react";
import styled, { css } from "styled-components";
import { CaretDown } from "@styled-icons/fa-solid/CaretDown";
import { CaretUp } from "@styled-icons/fa-solid/CaretUp";
import { ExclamationTriangle } from "@styled-icons/fa-solid/ExclamationTriangle";
import { toModeBorder, toModeColor, toSafeRouteColor } from "./util";

/**
 * This component is needed to give the offset border look to stacked place rows
 * Since the value we have access to is "interlineWithPreviousLeg" then we
 * have to show/hide the top border of the div and apply a small offset
 */
export var LightBorderDiv = styled.div.withConfig({
  displayName: "styled__LightBorderDiv",
  componentId: "sc-1q8npbl-0"
})(["border-top-style:solid;border-top-width:", ";border-top-color:", ";padding-top:", ";padding-bottom:", ";transform:", ";"], function (props) {
  return props.hideBorder === "true" ? "0" : "2px";
}, function (props) {
  return props.theme.borderColor;
}, function (props) {
  return props.hideBorder === "true" ? "0" : "10px";
}, function (props) {
  return props.hideBorder === "true" ? "10px" : "0";
}, function (props) {
  return props.hideBorder === "true" ? "" : "translateY(-12px)";
});
export var TransparentButton = styled.button.withConfig({
  displayName: "styled__TransparentButton",
  componentId: "sc-1q8npbl-1"
})(["background:transparent;border:0;color:inherit;cursor:pointer;font-size:inherit;text-decoration:none;"]);
export var AnchorButton = styled.a.withConfig({
  displayName: "styled__AnchorButton",
  componentId: "sc-1q8npbl-2"
})(["background-color:#fff;background-image:none;border-radius:4px;border:1px solid #ccc;color:#333;cursor:pointer;display:inline-block;font-size:14px;font-weight:400;padding:4px 6px;text-align:center;text-decoration:none;touch-action:manipulation;user-select:none;white-space:nowrap;&:hover{color:#333;background-color:#e6e6e6;border-color:#adadad;}&:active{color:#333;background-color:#e6e6e6;background-image:none;border-color:#adadad;outline:0;box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);}&:focus{color:#333;background-color:#e6e6e6;border-color:#8c8c8c;}&:active:hover{color:#333;background-color:#d4d4d4;border-color:#8c8c8c;}"]);
export var LinkButton = styled.a.withConfig({
  displayName: "styled__LinkButton",
  componentId: "sc-1q8npbl-3"
})(["color:#008;cursor:pointer;margin-left:5px;&:hover{text-decoration:underline;}"]);
export var ViewerButton = styled(LinkButton).withConfig({
  displayName: "styled__ViewerButton",
  componentId: "sc-1q8npbl-4"
})(["padding-left:0px;&:before{content:\"|\";color:black;margin-right:5px;}"]); // ////////////////////////////////////////////////
// /////////////// App components /////////////////
// ////////////////////////////////////////////////

// TODO: Can we turn this into a more abstract element to inherit from for other badges?
export var AccessBadge = styled.div.withConfig({
  displayName: "styled__AccessBadge",
  componentId: "sc-1q8npbl-5"
})(["color:black;background-color:", ";border:2px solid #bbb;text-align:center;width:25px;height:25px;font-size:1.2em;border-radius:50%;display:flex;align-items:center;justify-content:center;padding-left:1px;"], function (props) {
  return toModeColor(props.mode, props.routeColor);
});
export var ArrivalTimeContainer = styled.button.withConfig({
  displayName: "styled__ArrivalTimeContainer",
  componentId: "sc-1q8npbl-6"
})(["align-items:center;background:none;border:none;color:#007899;cursor:pointer;display:flex;font-size:0.9em;font-family:inherit;margin:0;margin-top:5px;outline:inherit;padding:0;text-align:inherit;"]);
export var CallAheadWarning = styled.div.withConfig({
  displayName: "styled__CallAheadWarning",
  componentId: "sc-1q8npbl-7"
})(["color:#b22727;margin-top:5px;"]);
export var BookLaterContainer = styled.div.withConfig({
  displayName: "styled__BookLaterContainer",
  componentId: "sc-1q8npbl-8"
})(["bottom:0;left:110px;position:absolute;right:0;top:0;"]);
export var BookLaterInnerContainer = styled.div.withConfig({
  displayName: "styled__BookLaterInnerContainer",
  componentId: "sc-1q8npbl-9"
})(["background-color:#fcf9d3;display:table;height:100%;width:100%;"]);
export var BookLaterPointer = styled.div.withConfig({
  displayName: "styled__BookLaterPointer",
  componentId: "sc-1q8npbl-10"
})(["border-bottom:16px solid transparent;border-right:16px solid #fcf9d3;border-top:16px solid transparent;height:0;left:94px;position:absolute;top:0;width:0;"]);
export var BookLaterText = styled.div.withConfig({
  displayName: "styled__BookLaterText",
  componentId: "sc-1q8npbl-11"
})(["color:#444;display:table-cell;font-style:italic;line-height:0.95;padding:0px 2px;vertical-align:middle;"]);
export var BookTNCRideButton = styled(AnchorButton).withConfig({
  displayName: "styled__BookTNCRideButton",
  componentId: "sc-1q8npbl-12"
})([""]);
export var BookTNCRideButtonContainer = styled.div.withConfig({
  displayName: "styled__BookTNCRideButtonContainer",
  componentId: "sc-1q8npbl-13"
})(["height:32px;margin-bottom:10px;margin-top:10px;position:relative;"]);
export var TNCTravelTime = styled.div.withConfig({
  displayName: "styled__TNCTravelTime",
  componentId: "sc-1q8npbl-14"
})([""]);
export var TNCCost = styled.div.withConfig({
  displayName: "styled__TNCCost",
  componentId: "sc-1q8npbl-15"
})([""]);
export var CaretToggleBase = function CaretToggleBase(_ref) {
  var className = _ref.className,
      expanded = _ref.expanded;
  return /*#__PURE__*/React.createElement("span", {
    className: className
  }, expanded ? /*#__PURE__*/React.createElement(CaretUp, {
    size: 15
  }) : /*#__PURE__*/React.createElement(CaretDown, {
    size: 15
  }));
};
export var CaretToggle = styled(CaretToggleBase).withConfig({
  displayName: "styled__CaretToggle",
  componentId: "sc-1q8npbl-16"
})(["&::before{content:\"\";margin:0 0.125em;}"]);
export var Destination = styled.div.withConfig({
  displayName: "styled__Destination",
  componentId: "sc-1q8npbl-17"
})(["text-align:center;"]);
export var InnerLine = styled.div.withConfig({
  displayName: "styled__InnerLine",
  componentId: "sc-1q8npbl-18"
})(["border-left:", ";height:100%;width:0;position:absolute;left:50%;transform:translateX(-50%);"], function (props) {
  return toModeBorder(props.mode, props.routeColor);
});
export var InterlineDot = styled.div.withConfig({
  displayName: "styled__InterlineDot",
  componentId: "sc-1q8npbl-19"
})(["color:#fff;flex:0 0 15px;margin-left:-33px;margin-right:18px;position:relative;z-index:30;"]);
export var InterlineName = styled.div.withConfig({
  displayName: "styled__InterlineName",
  componentId: "sc-1q8npbl-20"
})([""]);
export var IntermediateStops = styled.ol.withConfig({
  displayName: "styled__IntermediateStops",
  componentId: "sc-1q8npbl-21"
})(["display:block;font-size:13px;list-style:none;padding:0;"]);
export var ItineraryBody = styled.ol.withConfig({
  displayName: "styled__ItineraryBody",
  componentId: "sc-1q8npbl-22"
})(["list-style:none;padding:0;"]);
export var LegBody = styled.div.withConfig({
  displayName: "styled__LegBody",
  componentId: "sc-1q8npbl-23"
})(["color:#676767;font-size:13px;padding-bottom:12px;"]);
export var LegClickable = styled.div.withConfig({
  displayName: "styled__LegClickable",
  componentId: "sc-1q8npbl-24"
})([""]);
/**
 * Transparent button, clickable by all, with an invisible text about zooming to a leg on the map.
 * The button sits on top of LegDescription, so that the button's text visually appears to be
 * that of LegDescription.
 */

export var LegClickableButton = styled(TransparentButton).withConfig({
  displayName: "styled__LegClickableButton",
  componentId: "sc-1q8npbl-25"
})(["bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0;width:100%;z-index:1;"]); // Use <span> for correct semantics as it is the contents of a button or a link.

export var LegDescription = styled.span.withConfig({
  displayName: "styled__LegDescription",
  componentId: "sc-1q8npbl-26"
})(["align-items:center;display:inline-flex;line-height:16px;min-height:31px;position:relative;"]); // additional description added to ClickableLeg for screenreaders

export var InvisibleAdditionalDetails = styled.span.withConfig({
  displayName: "styled__InvisibleAdditionalDetails",
  componentId: "sc-1q8npbl-27"
})(["display:inline-block;grid-row-start:2;grid-column-start:1;height:0;overflow:hidden;width:0;"]);
export var LegDescriptionHeadsignPrefix = styled.span.withConfig({
  displayName: "styled__LegDescriptionHeadsignPrefix",
  componentId: "sc-1q8npbl-28"
})(["font-weight:200;"]);
/**
 * Lets others apply styles to the mode text in
 * "Bicycle 0.5 miles to City Hall"
 */

export var LegDescriptionMode = styled.span.withConfig({
  displayName: "styled__LegDescriptionMode",
  componentId: "sc-1q8npbl-29"
})(["font-weight:inherit;"]);
/**
 * Lets others apply styles to the place text in
 * "Bicycle 0.5 miles to City Hall"
 */

export var LegDescriptionPlace = styled.span.withConfig({
  displayName: "styled__LegDescriptionPlace",
  componentId: "sc-1q8npbl-30"
})(["font-weight:inherit;"]);
export var LegDescriptionRouteLongName = styled.span.withConfig({
  displayName: "styled__LegDescriptionRouteLongName",
  componentId: "sc-1q8npbl-31"
})(["font-size:13px;font-weight:500;"]);
export var LegDescriptionRouteShortName = styled.span.withConfig({
  displayName: "styled__LegDescriptionRouteShortName",
  componentId: "sc-1q8npbl-32"
})(["font-weight:800;margin-right:6px;"]);
export var LegDescriptionForTransit = styled(LegDescription).withConfig({
  displayName: "styled__LegDescriptionForTransit",
  componentId: "sc-1q8npbl-33"
})(["color:#807373;margin-top:5px;"]);
export var LegIconContainer = styled.span.withConfig({
  displayName: "styled__LegIconContainer",
  componentId: "sc-1q8npbl-34"
})(["img,svg{margin-right:6px;height:24px;width:24px;vertical-align:bottom;}"]);
export var LegIconAndRouteShortName = styled.span.withConfig({
  displayName: "styled__LegIconAndRouteShortName",
  componentId: "sc-1q8npbl-35"
})(["flex-shrink:0;"]);
export var LegLine = styled.div.withConfig({
  displayName: "styled__LegLine",
  componentId: "sc-1q8npbl-36"
})(["position:relative;left:50%;transform:translateX(-50%);height:100%;"]);
export var LineBadgeContainer = styled.div.withConfig({
  displayName: "styled__LineBadgeContainer",
  componentId: "sc-1q8npbl-37"
})(["width:30px;height:30px;border-radius:50%;position:absolute;left:50%;top:0;transform:translate(-51%,-10%);"]);
export var LineColumn = styled.div.withConfig({
  displayName: "styled__LineColumn",
  componentId: "sc-1q8npbl-38"
})(["grid-column-start:2;grid-row:span 2;padding-right:5px;"]);
export var LegDetails = styled.span.withConfig({
  displayName: "styled__LegDetails",
  componentId: "sc-1q8npbl-39"
})(["display:grid;grid-template-columns:100px auto;"]);
export var PlaceRowWrapper = styled.li.withConfig({
  displayName: "styled__PlaceRowWrapper",
  componentId: "sc-1q8npbl-40"
})(["max-width:500px;display:grid;grid-template-columns:65px 30px auto;"]);
export var PreviewContainer = styled.div.withConfig({
  displayName: "styled__PreviewContainer",
  componentId: "sc-1q8npbl-41"
})(["background-color:", ";border-color:", ";border-radius:5px;border-style:solid;border-width:1px;display:inline-block;font-style:normal;grid-column:2;grid-row:1;margin:0 4px;position:relative;text-align:center;text-decoration:none;vertical-align:middle;width:75%;&:hover{border-color:#d1d5da;background-color:#f6f8fa;}"], function (props) {
  return props.active && "#eee";
}, function (props) {
  return props.active ? "#d1d5da" : "#fff";
});
export var TimeColumn = styled.div.withConfig({
  displayName: "styled__TimeColumn",
  componentId: "sc-1q8npbl-42"
})(["grid-column-start:1;grid-row:1 / span 2;padding-right:5px;font-size:0.9em;"]);
export var MapButton = styled(LinkButton).withConfig({
  displayName: "styled__MapButton",
  componentId: "sc-1q8npbl-43"
})(["padding:3px 10px 3px 10px;border:0;margin-top:-15px;width:35px;height:35px;&:hover{cursor:pointer;}"]);
export var MapButtonColumn = styled(LightBorderDiv).withConfig({
  displayName: "styled__MapButtonColumn",
  componentId: "sc-1q8npbl-44"
})(["flex:0 0 25px;grid-column:-1;"]);
export var MapIcon = styled(Map).attrs(function (props) {
  return {
    fill: props.theme.secondaryColor,
    width: 15,
    height: 15,
    role: "img"
  };
}).withConfig({
  displayName: "styled__MapIcon",
  componentId: "sc-1q8npbl-45"
})([""]);
export var PlaceDetails = styled.div.withConfig({
  displayName: "styled__PlaceDetails",
  componentId: "sc-1q8npbl-46"
})(["grid-row-start:2;grid-column-start:3;"]);
export var PlaceHeader = styled.div.withConfig({
  displayName: "styled__PlaceHeader",
  componentId: "sc-1q8npbl-47"
})(["display:flex;font-size:1.2em;grid-row-start:1;grid-column-start:3;"]);
export var PlaceName = styled.span.withConfig({
  displayName: "styled__PlaceName",
  componentId: "sc-1q8npbl-48"
})(["font-size:inherit;font-weight:bold;height:1.2em;margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1 1 auto;padding:3px 0 10px 0;"]);
export var PlaceSubheader = styled.div.withConfig({
  displayName: "styled__PlaceSubheader",
  componentId: "sc-1q8npbl-49"
})(["color:#807373;font-size:13px;font-weight:300;padding-top:1px;margin-bottom:10px;margin-top:-14px;"]);
export var PreviewDiagram = styled(TransparentButton).withConfig({
  displayName: "styled__PreviewDiagram",
  componentId: "sc-1q8npbl-50"
})(["padding:2px;width:100%;"]);
export var PreviewDiagramElevationChange = styled.span.withConfig({
  displayName: "styled__PreviewDiagramElevationChange",
  componentId: "sc-1q8npbl-51"
})(["font-size:xx-small;&::before{content:\"\";margin:0 0.125em;}"]);
export var PreviewDiagramElevationGain = styled(PreviewDiagramElevationChange).withConfig({
  displayName: "styled__PreviewDiagramElevationGain",
  componentId: "sc-1q8npbl-52"
})(["color:#e60000;"]);
export var PreviewDiagramElevationLoss = styled(PreviewDiagramElevationChange).withConfig({
  displayName: "styled__PreviewDiagramElevationLoss",
  componentId: "sc-1q8npbl-53"
})(["color:green;"]);
export var PreviewDiagramTitle = styled.div.withConfig({
  displayName: "styled__PreviewDiagramTitle",
  componentId: "sc-1q8npbl-54"
})(["font-size:small;"]);
export var RouteBadge = styled.div.withConfig({
  displayName: "styled__RouteBadge",
  componentId: "sc-1q8npbl-55"
})(["text-align:center;min-width:30px;min-height:30px;font-size:1.2em;background-color:", ";color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;padding-left:1px;border:1px solid ", ";user-select:none;cursor:default;"], function (props) {
  return toSafeRouteColor(props.routeColor) || props.theme.mainColor;
}, function (props) {
  return props.theme.badgeBorderColor;
});
export var SROnly = styled.span.withConfig({
  displayName: "styled__SROnly",
  componentId: "sc-1q8npbl-56"
})(["position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;"]);
export var SRHidden = styled.span.attrs({
  "aria-hidden": true
}).withConfig({
  displayName: "styled__SRHidden",
  componentId: "sc-1q8npbl-57"
})([""]);
export var Steps = styled.ol.withConfig({
  displayName: "styled__Steps",
  componentId: "sc-1q8npbl-58"
})(["display:block;list-style:none;padding:0;"]);
export var StepDescriptionContainer = styled.div.withConfig({
  displayName: "styled__StepDescriptionContainer",
  componentId: "sc-1q8npbl-59"
})(["margin-left:24px;line-height:1.25em;padding-top:1px;& > span{margin-right:1ch;}"]);
export var StepsHeaderAndMapLink = styled.span.withConfig({
  displayName: "styled__StepsHeaderAndMapLink",
  componentId: "sc-1q8npbl-60"
})(["display:inline-flex;align-self:center;margin-top:10px;a{display:flex;align-items:center;justify-content:center;}"]);
var stepsHeaderStyling = css(["color:#676767;font-size:13px;font-style:normal;padding:0;"]);
export var StepsHeaderButton = styled(TransparentButton).withConfig({
  displayName: "styled__StepsHeaderButton",
  componentId: "sc-1q8npbl-61"
})(["", ""], stepsHeaderStyling);
export var StepsHeaderSpan = styled.span.withConfig({
  displayName: "styled__StepsHeaderSpan",
  componentId: "sc-1q8npbl-62"
})(["", " margin-right:0.4em;"], stepsHeaderStyling);
export var StepIconContainer = styled.div.withConfig({
  displayName: "styled__StepIconContainer",
  componentId: "sc-1q8npbl-63"
})(["fill:#676767;float:left;height:16px;width:16px;"]);
export var StepRow = styled.li.withConfig({
  displayName: "styled__StepRow",
  componentId: "sc-1q8npbl-64"
})(["font-size:13px;margin-top:8px;color:#676767;font-style:normal;"]);
export var StepStreetName = styled.span.withConfig({
  displayName: "styled__StepStreetName",
  componentId: "sc-1q8npbl-65"
})(["font-weight:500;"]);
export var StepLength = styled.span.withConfig({
  displayName: "styled__StepLength",
  componentId: "sc-1q8npbl-66"
})(["font-weight:200;opacity:0.8975;padding-left:1ch;"]);
export var StopIdSpan = styled.span.withConfig({
  displayName: "styled__StopIdSpan",
  componentId: "sc-1q8npbl-67"
})(["font-weight:200;font-size:0.9em;margin-left:10px;"]);
export var StopMarker = styled.div.withConfig({
  displayName: "styled__StopMarker",
  componentId: "sc-1q8npbl-68"
})(["float:left;margin-left:-36px;color:#fff;"]);
export var StopName = styled.div.withConfig({
  displayName: "styled__StopName",
  componentId: "sc-1q8npbl-69"
})(["color:#676767;margin-top:3px;"]);
export var StopRow = styled.li.withConfig({
  displayName: "styled__StopRow",
  componentId: "sc-1q8npbl-70"
})(["z-index:30;position:relative;"]);
export var TransitAlert = styled.a.withConfig({
  displayName: "styled__TransitAlert",
  componentId: "sc-1q8npbl-71"
})(["background-color:#eee;border-radius:4px;color:#000;display:block;margin-top:5px;padding:8px;text-decoration:none;"]);
export var TransitAlertBody = styled.div.withConfig({
  displayName: "styled__TransitAlertBody",
  componentId: "sc-1q8npbl-72"
})(["font-size:12px;margin-left:30px;white-space:pre-wrap;"]);
export var TransitAlertEffectiveDate = styled.div.withConfig({
  displayName: "styled__TransitAlertEffectiveDate",
  componentId: "sc-1q8npbl-73"
})(["margin-top:5px;margin-left:30px;font-size:12px;font-style:italic;"]);
export var TransitAlertHeader = styled.div.withConfig({
  displayName: "styled__TransitAlertHeader",
  componentId: "sc-1q8npbl-74"
})(["font-size:14px;margin-left:30px;font-weight:600;"]);
export var TransitAlertIconContainer = styled.div.withConfig({
  displayName: "styled__TransitAlertIconContainer",
  componentId: "sc-1q8npbl-75"
})(["float:left;font-size:18px;"]);
export var TransitAlerts = styled.div.withConfig({
  displayName: "styled__TransitAlerts",
  componentId: "sc-1q8npbl-76"
})(["display:block;margin-top:3px;"]);
export var TransitAlertToggle = styled(TransparentButton).withConfig({
  displayName: "styled__TransitAlertToggle",
  componentId: "sc-1q8npbl-77"
})(["color:#d14727;cursor:pointer;display:inline-block;font-weight:400;margin-top:8px;padding:0;"]);
export var TransitLegDetails = styled.div.withConfig({
  displayName: "styled__TransitLegDetails",
  componentId: "sc-1q8npbl-78"
})(["margin-top:5px;"]);
export var TransitLegDetailsHeader = styled.div.withConfig({
  displayName: "styled__TransitLegDetailsHeader",
  componentId: "sc-1q8npbl-79"
})(["color:#676767;display:flex;"]);
export var TransitLegExpandedBody = styled.div.withConfig({
  displayName: "styled__TransitLegExpandedBody",
  componentId: "sc-1q8npbl-80"
})(["font-size:14px;"]);
export var TransitLegFare = styled.div.withConfig({
  displayName: "styled__TransitLegFare",
  componentId: "sc-1q8npbl-81"
})([""]);
export var TransitLegSummary = styled(TransparentButton).withConfig({
  displayName: "styled__TransitLegSummary",
  componentId: "sc-1q8npbl-82"
})(["padding:0;"]);
export var DefaultAlertToggleIcon = styled(ExclamationTriangle).attrs({
  size: 15
}).withConfig({
  displayName: "styled__DefaultAlertToggleIcon",
  componentId: "sc-1q8npbl-83"
})([""]);
export var DefaultAlertBodyIcon = styled(ExclamationTriangle).attrs({
  size: 18
}).withConfig({
  displayName: "styled__DefaultAlertBodyIcon",
  componentId: "sc-1q8npbl-84"
})([""]);
export var AgencyInfo = styled.div.withConfig({
  displayName: "styled__AgencyInfo",
  componentId: "sc-1q8npbl-85"
})(["margin-top:5px;a{color:#337ab7;text-decoration:none;}a:hover{text-decoration:underline;}img{margin-left:5px;vertical-align:middle;}"]);
//# sourceMappingURL=styled.js.map