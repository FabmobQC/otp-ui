"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgencyInfo = exports.DefaultAlertBodyIcon = exports.DefaultAlertToggleIcon = exports.TransitLegSummary = exports.TransitLegFare = exports.TransitLegExpandedBody = exports.TransitLegDetailsHeader = exports.TransitLegDetails = exports.TransitAlertToggle = exports.TransitAlerts = exports.TransitAlertIconContainer = exports.TransitAlertHeader = exports.TransitAlertEffectiveDate = exports.TransitAlertBody = exports.TransitAlert = exports.StopRow = exports.StopName = exports.StopMarker = exports.StopIdSpan = exports.StepLength = exports.StepStreetName = exports.StepRow = exports.StepIconContainer = exports.StepsHeaderSpan = exports.StepsHeaderButton = exports.StepsHeaderAndMapLink = exports.StepDescriptionContainer = exports.Steps = exports.SRHidden = exports.SROnly = exports.RouteBadge = exports.PreviewDiagramTitle = exports.PreviewDiagramElevationLoss = exports.PreviewDiagramElevationGain = exports.PreviewDiagramElevationChange = exports.PreviewDiagram = exports.PlaceSubheader = exports.PlaceName = exports.PlaceHeader = exports.PlaceDetails = exports.MapIcon = exports.MapButtonColumn = exports.MapButton = exports.TimeColumn = exports.PreviewContainer = exports.PlaceRowWrapper = exports.LegDetails = exports.LineColumn = exports.LineBadgeContainer = exports.LegLine = exports.LegIconAndRouteShortName = exports.LegIconContainer = exports.LegDescriptionForTransit = exports.LegDescriptionRouteShortName = exports.LegDescriptionRouteLongName = exports.LegDescriptionPlace = exports.LegDescriptionMode = exports.LegDescriptionHeadsignPrefix = exports.InvisibleAdditionalDetails = exports.LegDescription = exports.LegClickableButton = exports.LegClickable = exports.LegBody = exports.ItineraryBody = exports.IntermediateStops = exports.InterlineName = exports.InterlineDot = exports.InnerLine = exports.Destination = exports.CaretToggle = exports.CaretToggleBase = exports.TNCCost = exports.TNCTravelTime = exports.BookTNCRideButtonContainer = exports.BookTNCRideButton = exports.BookLaterText = exports.BookLaterPointer = exports.BookLaterInnerContainer = exports.BookLaterContainer = exports.CallAheadWarning = exports.ArrivalTimeContainer = exports.AccessBadge = exports.ViewerButton = exports.LinkButton = exports.AnchorButton = exports.TransparentButton = exports.LightBorderDiv = void 0;

var _icons = require("@opentripplanner/icons");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _CaretDown = require("@styled-icons/fa-solid/CaretDown");

var _CaretUp = require("@styled-icons/fa-solid/CaretUp");

var _ExclamationTriangle = require("@styled-icons/fa-solid/ExclamationTriangle");

var _util = require("./util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for the icons package.

/**
 * This component is needed to give the offset border look to stacked place rows
 * Since the value we have access to is "interlineWithPreviousLeg" then we
 * have to show/hide the top border of the div and apply a small offset
 */
const LightBorderDiv = _styledComponents.default.div.withConfig({
  displayName: "styled__LightBorderDiv",
  componentId: "sc-1q8npbl-0"
})(["border-top-style:solid;border-top-width:", ";border-top-color:", ";padding-top:", ";padding-bottom:", ";transform:", ";"], props => props.hideBorder === "true" ? "0" : "2px", props => props.theme.borderColor, props => props.hideBorder === "true" ? "0" : "10px", props => props.hideBorder === "true" ? "10px" : "0", props => props.hideBorder === "true" ? "" : "translateY(-12px)");

exports.LightBorderDiv = LightBorderDiv;

const TransparentButton = _styledComponents.default.button.withConfig({
  displayName: "styled__TransparentButton",
  componentId: "sc-1q8npbl-1"
})(["background:transparent;border:0;color:inherit;cursor:pointer;font-size:inherit;text-decoration:none;"]);

exports.TransparentButton = TransparentButton;

const AnchorButton = _styledComponents.default.a.withConfig({
  displayName: "styled__AnchorButton",
  componentId: "sc-1q8npbl-2"
})(["background-color:#fff;background-image:none;border-radius:4px;border:1px solid #ccc;color:#333;cursor:pointer;display:inline-block;font-size:14px;font-weight:400;padding:4px 6px;text-align:center;text-decoration:none;touch-action:manipulation;user-select:none;white-space:nowrap;&:hover{color:#333;background-color:#e6e6e6;border-color:#adadad;}&:active{color:#333;background-color:#e6e6e6;background-image:none;border-color:#adadad;outline:0;box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);}&:focus{color:#333;background-color:#e6e6e6;border-color:#8c8c8c;}&:active:hover{color:#333;background-color:#d4d4d4;border-color:#8c8c8c;}"]);

exports.AnchorButton = AnchorButton;

const LinkButton = _styledComponents.default.a.withConfig({
  displayName: "styled__LinkButton",
  componentId: "sc-1q8npbl-3"
})(["color:#008;cursor:pointer;margin-left:5px;&:hover{text-decoration:underline;}"]);

exports.LinkButton = LinkButton;
const ViewerButton = (0, _styledComponents.default)(LinkButton).withConfig({
  displayName: "styled__ViewerButton",
  componentId: "sc-1q8npbl-4"
})(["padding-left:0px;&:before{content:\"|\";color:black;margin-right:5px;}"]); // ////////////////////////////////////////////////
// /////////////// App components /////////////////
// ////////////////////////////////////////////////

exports.ViewerButton = ViewerButton;

// TODO: Can we turn this into a more abstract element to inherit from for other badges?
const AccessBadge = _styledComponents.default.div.withConfig({
  displayName: "styled__AccessBadge",
  componentId: "sc-1q8npbl-5"
})(["color:black;background-color:", ";border:2px solid #bbb;text-align:center;width:25px;height:25px;font-size:1.2em;border-radius:50%;display:flex;align-items:center;justify-content:center;padding-left:1px;"], props => (0, _util.toModeColor)(props.mode, props.routeColor));

exports.AccessBadge = AccessBadge;

const ArrivalTimeContainer = _styledComponents.default.button.withConfig({
  displayName: "styled__ArrivalTimeContainer",
  componentId: "sc-1q8npbl-6"
})(["align-items:center;background:none;border:none;color:#007899;cursor:pointer;display:flex;font-size:0.9em;font-family:inherit;margin:0;margin-top:5px;outline:inherit;padding:0;text-align:inherit;"]);

exports.ArrivalTimeContainer = ArrivalTimeContainer;

const CallAheadWarning = _styledComponents.default.div.withConfig({
  displayName: "styled__CallAheadWarning",
  componentId: "sc-1q8npbl-7"
})(["color:#b22727;margin-top:5px;"]);

exports.CallAheadWarning = CallAheadWarning;

const BookLaterContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__BookLaterContainer",
  componentId: "sc-1q8npbl-8"
})(["bottom:0;left:110px;position:absolute;right:0;top:0;"]);

exports.BookLaterContainer = BookLaterContainer;

const BookLaterInnerContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__BookLaterInnerContainer",
  componentId: "sc-1q8npbl-9"
})(["background-color:#fcf9d3;display:table;height:100%;width:100%;"]);

exports.BookLaterInnerContainer = BookLaterInnerContainer;

const BookLaterPointer = _styledComponents.default.div.withConfig({
  displayName: "styled__BookLaterPointer",
  componentId: "sc-1q8npbl-10"
})(["border-bottom:16px solid transparent;border-right:16px solid #fcf9d3;border-top:16px solid transparent;height:0;left:94px;position:absolute;top:0;width:0;"]);

exports.BookLaterPointer = BookLaterPointer;

const BookLaterText = _styledComponents.default.div.withConfig({
  displayName: "styled__BookLaterText",
  componentId: "sc-1q8npbl-11"
})(["color:#444;display:table-cell;font-style:italic;line-height:0.95;padding:0px 2px;vertical-align:middle;"]);

exports.BookLaterText = BookLaterText;
const BookTNCRideButton = (0, _styledComponents.default)(AnchorButton).withConfig({
  displayName: "styled__BookTNCRideButton",
  componentId: "sc-1q8npbl-12"
})([""]);
exports.BookTNCRideButton = BookTNCRideButton;

const BookTNCRideButtonContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__BookTNCRideButtonContainer",
  componentId: "sc-1q8npbl-13"
})(["height:32px;margin-bottom:10px;margin-top:10px;position:relative;"]);

exports.BookTNCRideButtonContainer = BookTNCRideButtonContainer;

const TNCTravelTime = _styledComponents.default.div.withConfig({
  displayName: "styled__TNCTravelTime",
  componentId: "sc-1q8npbl-14"
})([""]);

exports.TNCTravelTime = TNCTravelTime;

const TNCCost = _styledComponents.default.div.withConfig({
  displayName: "styled__TNCCost",
  componentId: "sc-1q8npbl-15"
})([""]);

exports.TNCCost = TNCCost;

const CaretToggleBase = ({
  className,
  expanded
}) => /*#__PURE__*/_react.default.createElement("span", {
  className: className
}, expanded ? /*#__PURE__*/_react.default.createElement(_CaretUp.CaretUp, {
  size: 15
}) : /*#__PURE__*/_react.default.createElement(_CaretDown.CaretDown, {
  size: 15
}));

exports.CaretToggleBase = CaretToggleBase;
const CaretToggle = (0, _styledComponents.default)(CaretToggleBase).withConfig({
  displayName: "styled__CaretToggle",
  componentId: "sc-1q8npbl-16"
})(["&::before{content:\"\";margin:0 0.125em;}"]);
exports.CaretToggle = CaretToggle;

const Destination = _styledComponents.default.div.withConfig({
  displayName: "styled__Destination",
  componentId: "sc-1q8npbl-17"
})(["text-align:center;"]);

exports.Destination = Destination;

const InnerLine = _styledComponents.default.div.withConfig({
  displayName: "styled__InnerLine",
  componentId: "sc-1q8npbl-18"
})(["border-left:", ";height:100%;width:0;position:absolute;left:50%;transform:translateX(-50%);"], props => (0, _util.toModeBorder)(props.mode, props.routeColor));

exports.InnerLine = InnerLine;

const InterlineDot = _styledComponents.default.div.withConfig({
  displayName: "styled__InterlineDot",
  componentId: "sc-1q8npbl-19"
})(["color:#fff;flex:0 0 15px;margin-left:-33px;margin-right:18px;position:relative;z-index:30;"]);

exports.InterlineDot = InterlineDot;

const InterlineName = _styledComponents.default.div.withConfig({
  displayName: "styled__InterlineName",
  componentId: "sc-1q8npbl-20"
})([""]);

exports.InterlineName = InterlineName;

const IntermediateStops = _styledComponents.default.ol.withConfig({
  displayName: "styled__IntermediateStops",
  componentId: "sc-1q8npbl-21"
})(["display:block;font-size:13px;list-style:none;padding:0;"]);

exports.IntermediateStops = IntermediateStops;

const ItineraryBody = _styledComponents.default.ol.withConfig({
  displayName: "styled__ItineraryBody",
  componentId: "sc-1q8npbl-22"
})(["list-style:none;padding:0;"]);

exports.ItineraryBody = ItineraryBody;

const LegBody = _styledComponents.default.div.withConfig({
  displayName: "styled__LegBody",
  componentId: "sc-1q8npbl-23"
})(["color:#676767;font-size:13px;padding-bottom:12px;"]);

exports.LegBody = LegBody;

const LegClickable = _styledComponents.default.div.withConfig({
  displayName: "styled__LegClickable",
  componentId: "sc-1q8npbl-24"
})([""]);
/**
 * Transparent button, clickable by all, with an invisible text about zooming to a leg on the map.
 * The button sits on top of LegDescription, so that the button's text visually appears to be
 * that of LegDescription.
 */


exports.LegClickable = LegClickable;
const LegClickableButton = (0, _styledComponents.default)(TransparentButton).withConfig({
  displayName: "styled__LegClickableButton",
  componentId: "sc-1q8npbl-25"
})(["bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0;width:100%;z-index:1;"]); // Use <span> for correct semantics as it is the contents of a button or a link.

exports.LegClickableButton = LegClickableButton;

const LegDescription = _styledComponents.default.span.withConfig({
  displayName: "styled__LegDescription",
  componentId: "sc-1q8npbl-26"
})(["align-items:center;display:inline-flex;line-height:16px;min-height:31px;position:relative;"]); // additional description added to ClickableLeg for screenreaders


exports.LegDescription = LegDescription;

const InvisibleAdditionalDetails = _styledComponents.default.span.withConfig({
  displayName: "styled__InvisibleAdditionalDetails",
  componentId: "sc-1q8npbl-27"
})(["display:inline-block;grid-row-start:2;grid-column-start:1;height:0;overflow:hidden;width:0;"]);

exports.InvisibleAdditionalDetails = InvisibleAdditionalDetails;

const LegDescriptionHeadsignPrefix = _styledComponents.default.span.withConfig({
  displayName: "styled__LegDescriptionHeadsignPrefix",
  componentId: "sc-1q8npbl-28"
})(["font-weight:200;"]);
/**
 * Lets others apply styles to the mode text in
 * "Bicycle 0.5 miles to City Hall"
 */


exports.LegDescriptionHeadsignPrefix = LegDescriptionHeadsignPrefix;

const LegDescriptionMode = _styledComponents.default.span.withConfig({
  displayName: "styled__LegDescriptionMode",
  componentId: "sc-1q8npbl-29"
})(["font-weight:inherit;"]);
/**
 * Lets others apply styles to the place text in
 * "Bicycle 0.5 miles to City Hall"
 */


exports.LegDescriptionMode = LegDescriptionMode;

const LegDescriptionPlace = _styledComponents.default.span.withConfig({
  displayName: "styled__LegDescriptionPlace",
  componentId: "sc-1q8npbl-30"
})(["font-weight:inherit;"]);

exports.LegDescriptionPlace = LegDescriptionPlace;

const LegDescriptionRouteLongName = _styledComponents.default.span.withConfig({
  displayName: "styled__LegDescriptionRouteLongName",
  componentId: "sc-1q8npbl-31"
})(["font-size:13px;font-weight:500;"]);

exports.LegDescriptionRouteLongName = LegDescriptionRouteLongName;

const LegDescriptionRouteShortName = _styledComponents.default.span.withConfig({
  displayName: "styled__LegDescriptionRouteShortName",
  componentId: "sc-1q8npbl-32"
})(["font-weight:800;margin-right:6px;"]);

exports.LegDescriptionRouteShortName = LegDescriptionRouteShortName;
const LegDescriptionForTransit = (0, _styledComponents.default)(LegDescription).withConfig({
  displayName: "styled__LegDescriptionForTransit",
  componentId: "sc-1q8npbl-33"
})(["color:#807373;margin-top:5px;"]);
exports.LegDescriptionForTransit = LegDescriptionForTransit;

const LegIconContainer = _styledComponents.default.span.withConfig({
  displayName: "styled__LegIconContainer",
  componentId: "sc-1q8npbl-34"
})(["img,svg{margin-right:6px;height:24px;width:24px;vertical-align:bottom;}"]);

exports.LegIconContainer = LegIconContainer;

const LegIconAndRouteShortName = _styledComponents.default.span.withConfig({
  displayName: "styled__LegIconAndRouteShortName",
  componentId: "sc-1q8npbl-35"
})(["flex-shrink:0;"]);

exports.LegIconAndRouteShortName = LegIconAndRouteShortName;

const LegLine = _styledComponents.default.div.withConfig({
  displayName: "styled__LegLine",
  componentId: "sc-1q8npbl-36"
})(["position:relative;left:50%;transform:translateX(-50%);height:100%;"]);

exports.LegLine = LegLine;

const LineBadgeContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__LineBadgeContainer",
  componentId: "sc-1q8npbl-37"
})(["width:30px;height:30px;border-radius:50%;position:absolute;left:50%;top:0;transform:translate(-51%,-10%);"]);

exports.LineBadgeContainer = LineBadgeContainer;

const LineColumn = _styledComponents.default.div.withConfig({
  displayName: "styled__LineColumn",
  componentId: "sc-1q8npbl-38"
})(["grid-column-start:2;grid-row:span 2;padding-right:5px;"]);

exports.LineColumn = LineColumn;

const LegDetails = _styledComponents.default.span.withConfig({
  displayName: "styled__LegDetails",
  componentId: "sc-1q8npbl-39"
})(["display:grid;grid-template-columns:100px auto;"]);

exports.LegDetails = LegDetails;

const PlaceRowWrapper = _styledComponents.default.li.withConfig({
  displayName: "styled__PlaceRowWrapper",
  componentId: "sc-1q8npbl-40"
})(["max-width:500px;display:grid;grid-template-columns:65px 30px auto;"]);

exports.PlaceRowWrapper = PlaceRowWrapper;

const PreviewContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__PreviewContainer",
  componentId: "sc-1q8npbl-41"
})(["background-color:", ";border-color:", ";border-radius:5px;border-style:solid;border-width:1px;display:inline-block;font-style:normal;grid-column:2;grid-row:1;margin:0 4px;position:relative;text-align:center;text-decoration:none;vertical-align:middle;width:75%;&:hover{border-color:#d1d5da;background-color:#f6f8fa;}"], props => props.active && "#eee", props => props.active ? "#d1d5da" : "#fff");

exports.PreviewContainer = PreviewContainer;

const TimeColumn = _styledComponents.default.div.withConfig({
  displayName: "styled__TimeColumn",
  componentId: "sc-1q8npbl-42"
})(["grid-column-start:1;grid-row:1 / span 2;padding-right:5px;font-size:0.9em;"]);

exports.TimeColumn = TimeColumn;
const MapButton = (0, _styledComponents.default)(LinkButton).withConfig({
  displayName: "styled__MapButton",
  componentId: "sc-1q8npbl-43"
})(["padding:3px 10px 3px 10px;border:0;margin-top:-15px;width:35px;height:35px;&:hover{cursor:pointer;}"]);
exports.MapButton = MapButton;
const MapButtonColumn = (0, _styledComponents.default)(LightBorderDiv).withConfig({
  displayName: "styled__MapButtonColumn",
  componentId: "sc-1q8npbl-44"
})(["flex:0 0 25px;grid-column:-1;"]);
exports.MapButtonColumn = MapButtonColumn;
const MapIcon = (0, _styledComponents.default)(_icons.Map).attrs(props => ({
  fill: props.theme.secondaryColor,
  width: 15,
  height: 15,
  role: "img"
})).withConfig({
  displayName: "styled__MapIcon",
  componentId: "sc-1q8npbl-45"
})([""]);
exports.MapIcon = MapIcon;

const PlaceDetails = _styledComponents.default.div.withConfig({
  displayName: "styled__PlaceDetails",
  componentId: "sc-1q8npbl-46"
})(["grid-row-start:2;grid-column-start:3;"]);

exports.PlaceDetails = PlaceDetails;

const PlaceHeader = _styledComponents.default.div.withConfig({
  displayName: "styled__PlaceHeader",
  componentId: "sc-1q8npbl-47"
})(["display:flex;font-size:1.2em;grid-row-start:1;grid-column-start:3;"]);

exports.PlaceHeader = PlaceHeader;

const PlaceName = _styledComponents.default.span.withConfig({
  displayName: "styled__PlaceName",
  componentId: "sc-1q8npbl-48"
})(["font-size:inherit;font-weight:bold;height:1.2em;margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1 1 auto;padding:3px 0 10px 0;"]);

exports.PlaceName = PlaceName;

const PlaceSubheader = _styledComponents.default.div.withConfig({
  displayName: "styled__PlaceSubheader",
  componentId: "sc-1q8npbl-49"
})(["color:#807373;font-size:13px;font-weight:300;padding-top:1px;margin-bottom:10px;margin-top:-14px;"]);

exports.PlaceSubheader = PlaceSubheader;
const PreviewDiagram = (0, _styledComponents.default)(TransparentButton).withConfig({
  displayName: "styled__PreviewDiagram",
  componentId: "sc-1q8npbl-50"
})(["padding:2px;width:100%;"]);
exports.PreviewDiagram = PreviewDiagram;

const PreviewDiagramElevationChange = _styledComponents.default.span.withConfig({
  displayName: "styled__PreviewDiagramElevationChange",
  componentId: "sc-1q8npbl-51"
})(["font-size:xx-small;&::before{content:\"\";margin:0 0.125em;}"]);

exports.PreviewDiagramElevationChange = PreviewDiagramElevationChange;
const PreviewDiagramElevationGain = (0, _styledComponents.default)(PreviewDiagramElevationChange).withConfig({
  displayName: "styled__PreviewDiagramElevationGain",
  componentId: "sc-1q8npbl-52"
})(["color:#e60000;"]);
exports.PreviewDiagramElevationGain = PreviewDiagramElevationGain;
const PreviewDiagramElevationLoss = (0, _styledComponents.default)(PreviewDiagramElevationChange).withConfig({
  displayName: "styled__PreviewDiagramElevationLoss",
  componentId: "sc-1q8npbl-53"
})(["color:green;"]);
exports.PreviewDiagramElevationLoss = PreviewDiagramElevationLoss;

const PreviewDiagramTitle = _styledComponents.default.div.withConfig({
  displayName: "styled__PreviewDiagramTitle",
  componentId: "sc-1q8npbl-54"
})(["font-size:small;"]);

exports.PreviewDiagramTitle = PreviewDiagramTitle;

const RouteBadge = _styledComponents.default.div.withConfig({
  displayName: "styled__RouteBadge",
  componentId: "sc-1q8npbl-55"
})(["text-align:center;min-width:30px;min-height:30px;font-size:1.2em;background-color:", ";color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;padding-left:1px;border:1px solid ", ";user-select:none;cursor:default;"], props => (0, _util.toSafeRouteColor)(props.routeColor) || props.theme.mainColor, props => props.theme.badgeBorderColor);

exports.RouteBadge = RouteBadge;

const SROnly = _styledComponents.default.span.withConfig({
  displayName: "styled__SROnly",
  componentId: "sc-1q8npbl-56"
})(["position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;"]);

exports.SROnly = SROnly;

const SRHidden = _styledComponents.default.span.attrs({
  "aria-hidden": true
}).withConfig({
  displayName: "styled__SRHidden",
  componentId: "sc-1q8npbl-57"
})([""]);

exports.SRHidden = SRHidden;

const Steps = _styledComponents.default.ol.withConfig({
  displayName: "styled__Steps",
  componentId: "sc-1q8npbl-58"
})(["display:block;list-style:none;padding:0;"]);

exports.Steps = Steps;

const StepDescriptionContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__StepDescriptionContainer",
  componentId: "sc-1q8npbl-59"
})(["margin-left:24px;line-height:1.25em;padding-top:1px;& > span{margin-right:1ch;}"]);

exports.StepDescriptionContainer = StepDescriptionContainer;

const StepsHeaderAndMapLink = _styledComponents.default.span.withConfig({
  displayName: "styled__StepsHeaderAndMapLink",
  componentId: "sc-1q8npbl-60"
})(["display:inline-flex;align-self:center;margin-top:10px;a{display:flex;align-items:center;justify-content:center;}"]);

exports.StepsHeaderAndMapLink = StepsHeaderAndMapLink;
const stepsHeaderStyling = (0, _styledComponents.css)(["color:#676767;font-size:13px;font-style:normal;padding:0;"]);
const StepsHeaderButton = (0, _styledComponents.default)(TransparentButton).withConfig({
  displayName: "styled__StepsHeaderButton",
  componentId: "sc-1q8npbl-61"
})(["", ""], stepsHeaderStyling);
exports.StepsHeaderButton = StepsHeaderButton;

const StepsHeaderSpan = _styledComponents.default.span.withConfig({
  displayName: "styled__StepsHeaderSpan",
  componentId: "sc-1q8npbl-62"
})(["", " margin-right:0.4em;"], stepsHeaderStyling);

exports.StepsHeaderSpan = StepsHeaderSpan;

const StepIconContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__StepIconContainer",
  componentId: "sc-1q8npbl-63"
})(["fill:#676767;float:left;height:16px;width:16px;"]);

exports.StepIconContainer = StepIconContainer;

const StepRow = _styledComponents.default.li.withConfig({
  displayName: "styled__StepRow",
  componentId: "sc-1q8npbl-64"
})(["font-size:13px;margin-top:8px;color:#676767;font-style:normal;"]);

exports.StepRow = StepRow;

const StepStreetName = _styledComponents.default.span.withConfig({
  displayName: "styled__StepStreetName",
  componentId: "sc-1q8npbl-65"
})(["font-weight:500;"]);

exports.StepStreetName = StepStreetName;

const StepLength = _styledComponents.default.span.withConfig({
  displayName: "styled__StepLength",
  componentId: "sc-1q8npbl-66"
})(["font-weight:200;opacity:0.8975;padding-left:1ch;"]);

exports.StepLength = StepLength;

const StopIdSpan = _styledComponents.default.span.withConfig({
  displayName: "styled__StopIdSpan",
  componentId: "sc-1q8npbl-67"
})(["font-weight:200;font-size:0.9em;margin-left:10px;"]);

exports.StopIdSpan = StopIdSpan;

const StopMarker = _styledComponents.default.div.withConfig({
  displayName: "styled__StopMarker",
  componentId: "sc-1q8npbl-68"
})(["float:left;margin-left:-36px;color:#fff;"]);

exports.StopMarker = StopMarker;

const StopName = _styledComponents.default.div.withConfig({
  displayName: "styled__StopName",
  componentId: "sc-1q8npbl-69"
})(["color:#676767;margin-top:3px;"]);

exports.StopName = StopName;

const StopRow = _styledComponents.default.li.withConfig({
  displayName: "styled__StopRow",
  componentId: "sc-1q8npbl-70"
})(["z-index:30;position:relative;"]);

exports.StopRow = StopRow;

const TransitAlert = _styledComponents.default.a.withConfig({
  displayName: "styled__TransitAlert",
  componentId: "sc-1q8npbl-71"
})(["background-color:#eee;border-radius:4px;color:#000;display:block;margin-top:5px;padding:8px;text-decoration:none;"]);

exports.TransitAlert = TransitAlert;

const TransitAlertBody = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitAlertBody",
  componentId: "sc-1q8npbl-72"
})(["font-size:12px;margin-left:30px;white-space:pre-wrap;"]);

exports.TransitAlertBody = TransitAlertBody;

const TransitAlertEffectiveDate = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitAlertEffectiveDate",
  componentId: "sc-1q8npbl-73"
})(["margin-top:5px;margin-left:30px;font-size:12px;font-style:italic;"]);

exports.TransitAlertEffectiveDate = TransitAlertEffectiveDate;

const TransitAlertHeader = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitAlertHeader",
  componentId: "sc-1q8npbl-74"
})(["font-size:14px;margin-left:30px;font-weight:600;"]);

exports.TransitAlertHeader = TransitAlertHeader;

const TransitAlertIconContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitAlertIconContainer",
  componentId: "sc-1q8npbl-75"
})(["float:left;font-size:18px;"]);

exports.TransitAlertIconContainer = TransitAlertIconContainer;

const TransitAlerts = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitAlerts",
  componentId: "sc-1q8npbl-76"
})(["display:block;margin-top:3px;"]);

exports.TransitAlerts = TransitAlerts;
const TransitAlertToggle = (0, _styledComponents.default)(TransparentButton).withConfig({
  displayName: "styled__TransitAlertToggle",
  componentId: "sc-1q8npbl-77"
})(["color:#d14727;cursor:pointer;display:inline-block;font-weight:400;margin-top:8px;padding:0;"]);
exports.TransitAlertToggle = TransitAlertToggle;

const TransitLegDetails = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitLegDetails",
  componentId: "sc-1q8npbl-78"
})(["margin-top:5px;"]);

exports.TransitLegDetails = TransitLegDetails;

const TransitLegDetailsHeader = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitLegDetailsHeader",
  componentId: "sc-1q8npbl-79"
})(["color:#676767;display:flex;"]);

exports.TransitLegDetailsHeader = TransitLegDetailsHeader;

const TransitLegExpandedBody = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitLegExpandedBody",
  componentId: "sc-1q8npbl-80"
})(["font-size:14px;"]);

exports.TransitLegExpandedBody = TransitLegExpandedBody;

const TransitLegFare = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitLegFare",
  componentId: "sc-1q8npbl-81"
})([""]);

exports.TransitLegFare = TransitLegFare;
const TransitLegSummary = (0, _styledComponents.default)(TransparentButton).withConfig({
  displayName: "styled__TransitLegSummary",
  componentId: "sc-1q8npbl-82"
})(["padding:0;"]);
exports.TransitLegSummary = TransitLegSummary;
const DefaultAlertToggleIcon = (0, _styledComponents.default)(_ExclamationTriangle.ExclamationTriangle).attrs({
  size: 15
}).withConfig({
  displayName: "styled__DefaultAlertToggleIcon",
  componentId: "sc-1q8npbl-83"
})([""]);
exports.DefaultAlertToggleIcon = DefaultAlertToggleIcon;
const DefaultAlertBodyIcon = (0, _styledComponents.default)(_ExclamationTriangle.ExclamationTriangle).attrs({
  size: 18
}).withConfig({
  displayName: "styled__DefaultAlertBodyIcon",
  componentId: "sc-1q8npbl-84"
})([""]);
exports.DefaultAlertBodyIcon = DefaultAlertBodyIcon;

const AgencyInfo = _styledComponents.default.div.withConfig({
  displayName: "styled__AgencyInfo",
  componentId: "sc-1q8npbl-85"
})(["margin-top:5px;a{color:#337ab7;text-decoration:none;}a:hover{text-decoration:underline;}img{margin-left:5px;vertical-align:middle;}"]);

exports.AgencyInfo = AgencyInfo;
//# sourceMappingURL=styled.js.map