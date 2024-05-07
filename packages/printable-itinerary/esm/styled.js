import { Defaults, Styled as ItinBodyClasses } from "@opentripplanner/itinerary-body";
import styled from "styled-components";
export var Leg = styled.div.withConfig({
  displayName: "styled__Leg",
  componentId: "sc-1fqxr7x-0"
})(["margin-bottom:10px;border-top:1px solid grey;padding-top:18px;display:flex;"]);
export var CollapsedTop = styled(Leg).withConfig({
  displayName: "styled__CollapsedTop",
  componentId: "sc-1fqxr7x-1"
})(["border-top:none;padding-top:0;"]);
export var LegBody = styled.div.withConfig({
  displayName: "styled__LegBody",
  componentId: "sc-1fqxr7x-2"
})(["margin-left:10px;"]);
export var LegDetail = styled.div.withConfig({
  displayName: "styled__LegDetail",
  componentId: "sc-1fqxr7x-3"
})(["font-size:14px;margin-top:3px;"]);
export var LegDetails = styled.div.withConfig({
  displayName: "styled__LegDetails",
  componentId: "sc-1fqxr7x-4"
})(["margin-top:5px;"]); // TODO Refactor

export var LegHeader = styled.div.withConfig({
  displayName: "styled__LegHeader",
  componentId: "sc-1fqxr7x-5"
})(["font-size:18px;"]);
export var AccessLegDescription = styled(Defaults.AccessLegDescription).withConfig({
  displayName: "styled__AccessLegDescription",
  componentId: "sc-1fqxr7x-6"
})(["font-size:18px;", ",", "{font-weight:bold;}"], ItinBodyClasses.LegDescriptionMode, ItinBodyClasses.LegDescriptionPlace);
export var LegAnnotation = styled.div.withConfig({
  displayName: "styled__LegAnnotation",
  componentId: "sc-1fqxr7x-7"
})(["align-items:center;display:flex;flex-direction:column;height:100%;min-width:70px;"]);
export var AccessLegStep = styled(Defaults.AccessLegStep).withConfig({
  displayName: "styled__AccessLegStep",
  componentId: "sc-1fqxr7x-8"
})(["", "{font-weight:bold;}"], ItinBodyClasses.StepStreetName);
export var RouteLongName = styled(Defaults.RouteLongName).withConfig({
  displayName: "styled__RouteLongName",
  componentId: "sc-1fqxr7x-9"
})(["font-weight:bold;", "{font-weight:normal;}"], ItinBodyClasses.LegDescriptionHeadsignPrefix);
export var ModeIcon = styled.div.withConfig({
  displayName: "styled__ModeIcon",
  componentId: "sc-1fqxr7x-10"
})(["float:left;width:32px;height:32px;"]);
export var PrintableItinerary = styled.div.withConfig({
  displayName: "styled__PrintableItinerary",
  componentId: "sc-1fqxr7x-11"
})([""]);
//# sourceMappingURL=styled.js.map