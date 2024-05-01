"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrintableItinerary = exports.ModeIcon = exports.RouteLongName = exports.AccessLegStep = exports.LegAnnotation = exports.AccessLegDescription = exports.LegHeader = exports.LegDetails = exports.LegDetail = exports.LegBody = exports.CollapsedTop = exports.Leg = void 0;

var _itineraryBody = require("@opentripplanner/itinerary-body");

var _styledComponents = _interopRequireDefault(require("styled-components"));

const Leg = _styledComponents.default.div.withConfig({
  displayName: "styled__Leg",
  componentId: "sc-1fqxr7x-0"
})(["margin-bottom:10px;border-top:1px solid grey;padding-top:18px;display:flex;"]);

exports.Leg = Leg;
const CollapsedTop = (0, _styledComponents.default)(Leg).withConfig({
  displayName: "styled__CollapsedTop",
  componentId: "sc-1fqxr7x-1"
})(["border-top:none;padding-top:0;"]);
exports.CollapsedTop = CollapsedTop;

const LegBody = _styledComponents.default.div.withConfig({
  displayName: "styled__LegBody",
  componentId: "sc-1fqxr7x-2"
})(["margin-left:10px;"]);

exports.LegBody = LegBody;

const LegDetail = _styledComponents.default.div.withConfig({
  displayName: "styled__LegDetail",
  componentId: "sc-1fqxr7x-3"
})(["font-size:14px;margin-top:3px;"]);

exports.LegDetail = LegDetail;

const LegDetails = _styledComponents.default.div.withConfig({
  displayName: "styled__LegDetails",
  componentId: "sc-1fqxr7x-4"
})(["margin-top:5px;"]); // TODO Refactor


exports.LegDetails = LegDetails;

const LegHeader = _styledComponents.default.div.withConfig({
  displayName: "styled__LegHeader",
  componentId: "sc-1fqxr7x-5"
})(["font-size:18px;"]);

exports.LegHeader = LegHeader;
const AccessLegDescription = (0, _styledComponents.default)(_itineraryBody.Defaults.AccessLegDescription).withConfig({
  displayName: "styled__AccessLegDescription",
  componentId: "sc-1fqxr7x-6"
})(["font-size:18px;", ",", "{font-weight:bold;}"], _itineraryBody.Styled.LegDescriptionMode, _itineraryBody.Styled.LegDescriptionPlace);
exports.AccessLegDescription = AccessLegDescription;

const LegAnnotation = _styledComponents.default.div.withConfig({
  displayName: "styled__LegAnnotation",
  componentId: "sc-1fqxr7x-7"
})(["align-items:center;display:flex;flex-direction:column;height:100%;min-width:70px;"]);

exports.LegAnnotation = LegAnnotation;
const AccessLegStep = (0, _styledComponents.default)(_itineraryBody.Defaults.AccessLegStep).withConfig({
  displayName: "styled__AccessLegStep",
  componentId: "sc-1fqxr7x-8"
})(["", "{font-weight:bold;}"], _itineraryBody.Styled.StepStreetName);
exports.AccessLegStep = AccessLegStep;
const RouteLongName = (0, _styledComponents.default)(_itineraryBody.Defaults.RouteLongName).withConfig({
  displayName: "styled__RouteLongName",
  componentId: "sc-1fqxr7x-9"
})(["font-weight:bold;", "{font-weight:normal;}"], _itineraryBody.Styled.LegDescriptionHeadsignPrefix);
exports.RouteLongName = RouteLongName;

const ModeIcon = _styledComponents.default.div.withConfig({
  displayName: "styled__ModeIcon",
  componentId: "sc-1fqxr7x-10"
})(["float:left;width:32px;height:32px;"]);

exports.ModeIcon = ModeIcon;

const PrintableItinerary = _styledComponents.default.div.withConfig({
  displayName: "styled__PrintableItinerary",
  componentId: "sc-1fqxr7x-11"
})([""]);

exports.PrintableItinerary = PrintableItinerary;
//# sourceMappingURL=styled.js.map