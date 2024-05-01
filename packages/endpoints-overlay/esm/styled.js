import LocationIcon from "@opentripplanner/location-icon";
import styled, { css } from "styled-components";
import { Circle } from "@styled-icons/fa-solid/Circle";
export var Button = styled.button.withConfig({
  displayName: "styled__Button",
  componentId: "sc-50mmra-0"
})(["background:none;border:none;color:navy;font-family:inherit;font-size:inherit;line-height:inherit;padding-left:0.2em;:hover{text-decoration:underline;cursor:pointer;}"]);
var stacked = css(["cursor:pointer;left:0;position:absolute;"]);
export var StackedCircle = styled(Circle).withConfig({
  displayName: "styled__StackedCircle",
  componentId: "sc-50mmra-1"
})(["color:#fff;", ""], stacked);
export var StackedLocationIcon = styled(LocationIcon).withConfig({
  displayName: "styled__StackedLocationIcon",
  componentId: "sc-50mmra-2"
})(["", ""], stacked);
export var StackedToIcon = styled(StackedLocationIcon).withConfig({
  displayName: "styled__StackedToIcon",
  componentId: "sc-50mmra-3"
})(["color:#333;margin-left:-3px;margin-top:-2px;"]);
export var StackedIconContainer = styled.span.withConfig({
  displayName: "styled__StackedIconContainer",
  componentId: "sc-50mmra-4"
})(["display:inline-block;height:20px;margin-top:2px;width:20px;"]);
export var ToIcon = styled(LocationIcon).withConfig({
  displayName: "styled__ToIcon",
  componentId: "sc-50mmra-5"
})(["", ""], stacked);
export var IconWrapper = styled.span.withConfig({
  displayName: "styled__IconWrapper",
  componentId: "sc-50mmra-6"
})(["&::after{content:\"\";margin:0 0.125em;}"]);
//# sourceMappingURL=styled.js.map