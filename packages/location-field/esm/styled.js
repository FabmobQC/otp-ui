import styled, { css, keyframes } from "styled-components";
import { Spinner as FASpinner } from "@styled-icons/fa-solid/Spinner";
var hiddenCss = css(["clip:rect(0,0,0,0);display:inline-block;height:0;overflow:hidden;width:0;"]);
export var HiddenContent = styled.span.withConfig({
  displayName: "styled__HiddenContent",
  componentId: "sc-xahsq2-0"
})(["", ""], hiddenCss);
export var BaseButton = styled.button.withConfig({
  displayName: "styled__BaseButton",
  componentId: "sc-xahsq2-1"
})(["border:none;background:none;"]);
export var ClearButton = styled(BaseButton).withConfig({
  displayName: "styled__ClearButton",
  componentId: "sc-xahsq2-2"
})(["color:#888;cursor:pointer;width:30px;"]);
export var ClearBoth = styled.div.withConfig({
  displayName: "styled__ClearBoth",
  componentId: "sc-xahsq2-3"
})(["clear:both;"]);
export var DropdownButton = styled(BaseButton).withConfig({
  displayName: "styled__DropdownButton",
  componentId: "sc-xahsq2-4"
})(["width:30px;"]);
export var MenuItemList = styled.ul.attrs({
  role: "listbox"
}).withConfig({
  displayName: "styled__MenuItemList",
  componentId: "sc-xahsq2-5"
})(["background-clip:padding-box;background-color:#fff;border-radius:4px;border:1px solid rgba(0,0,0,0.15);box-shadow:0 6px 12px rgba(0,0,0,0.175);float:left;font-size:14px;left:0;list-style:none;margin:2px 0 0;min-width:160px;padding:5px 0;position:absolute;text-align:left;top:100%;z-index:1000000;input[aria-expanded=\"false\"] ~ &{", "}"], hiddenCss);
export var Input = styled.input.withConfig({
  displayName: "styled__Input",
  componentId: "sc-xahsq2-6"
})(["border:none;box-shadow:none;font-size:17px;outline:none;"]);
export var InputGroup = styled.div.withConfig({
  displayName: "styled__InputGroup",
  componentId: "sc-xahsq2-7"
})(["border-bottom:1px solid #000;border-collapse:separate;display:table;margin-bottom:15px;position:relative;"]);
export var MenuGroupHeader = styled.h2.withConfig({
  displayName: "styled__MenuGroupHeader",
  componentId: "sc-xahsq2-8"
})(["color:", ";background-color:", ";font-size:12px;font-weight:normal;line-height:1.42857143;margin:0;padding:0px 10px;text-align:center;white-space:nowrap;"], function (props) {
  return props.fgColor || "#eee";
}, function (props) {
  return props.bgColor || "#333";
});
export var MenuItemLi = styled.li.withConfig({
  displayName: "styled__MenuItemLi",
  componentId: "sc-xahsq2-9"
})(["&:hover{background-color:#f5f5f5;cursor:pointer;}&[aria-hidden=\"true\"]:hover{background-color:unset;cursor:default;}background-color:", ";clear:both;color:", ";display:block;font-weight:400;line-height:1.42857143;padding:3px 20px;text-decoration:none;white-space:nowrap;"], function (props) {
  return props.active ? "#337ab7" : "transparent";
}, function (props) {
  return props.active ? "#fff" : "#333";
});
export var OptionContainer = styled.span.withConfig({
  displayName: "styled__OptionContainer",
  componentId: "sc-xahsq2-10"
})(["display:block;padding-top:5px;padding-bottom:3px;"]);
export var OptionSubTitle = styled.span.withConfig({
  displayName: "styled__OptionSubTitle",
  componentId: "sc-xahsq2-11"
})(["color:#686868;font-size:12px;margin-left:6px;"]);
export var OptionContent = styled.span.withConfig({
  displayName: "styled__OptionContent",
  componentId: "sc-xahsq2-12"
})(["margin-left:30px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);
export var OptionIconContainer = styled.span.withConfig({
  displayName: "styled__OptionIconContainer",
  componentId: "sc-xahsq2-13"
})(["float:left;"]);
export var RouteName = styled.span.withConfig({
  displayName: "styled__RouteName",
  componentId: "sc-xahsq2-14"
})(["background-color:gray;color:white;padding:2px 3px 0px;margin-right:5px;"]);
export var StaticMenuItemList = styled(MenuItemList).withConfig({
  displayName: "styled__StaticMenuItemList",
  componentId: "sc-xahsq2-15"
})(["border:none;box-shadow:none;display:block;"]);
export var StopContentContainer = styled.span.withConfig({
  displayName: "styled__StopContentContainer",
  componentId: "sc-xahsq2-16"
})(["margin-left:30px;"]);
export var StopDistance = styled.span.withConfig({
  displayName: "styled__StopDistance",
  componentId: "sc-xahsq2-17"
})(["font-size:8px;"]);
export var StopIconAndDistanceContainer = styled.span.withConfig({
  displayName: "styled__StopIconAndDistanceContainer",
  componentId: "sc-xahsq2-18"
})(["float:left;padding-top:3px;"]);
export var StopName = styled.span.withConfig({
  displayName: "styled__StopName",
  componentId: "sc-xahsq2-19"
})([""]);
export var StopRoutes = styled.span.withConfig({
  displayName: "styled__StopRoutes",
  componentId: "sc-xahsq2-20"
})(["font-size:9px;"]);
var rotateAnimation = keyframes(["0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}"]);
export var Spinner = styled(FASpinner).withConfig({
  displayName: "styled__Spinner",
  componentId: "sc-xahsq2-21"
})(["animation:", " 1.2s linear infinite;"], rotateAnimation);
//# sourceMappingURL=styled.js.map