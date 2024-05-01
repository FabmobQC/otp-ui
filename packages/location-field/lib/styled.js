"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spinner = exports.StopRoutes = exports.StopName = exports.StopIconAndDistanceContainer = exports.StopDistance = exports.StopContentContainer = exports.StaticMenuItemList = exports.RouteName = exports.OptionIconContainer = exports.OptionContent = exports.OptionSubTitle = exports.OptionContainer = exports.MenuItemLi = exports.MenuGroupHeader = exports.InputGroup = exports.Input = exports.MenuItemList = exports.DropdownButton = exports.ClearBoth = exports.ClearButton = exports.BaseButton = exports.HiddenContent = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Spinner = require("@styled-icons/fa-solid/Spinner");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const hiddenCss = (0, _styledComponents.css)(["clip:rect(0,0,0,0);display:inline-block;height:0;overflow:hidden;width:0;"]);

const HiddenContent = _styledComponents.default.span.withConfig({
  displayName: "styled__HiddenContent",
  componentId: "sc-xahsq2-0"
})(["", ""], hiddenCss);

exports.HiddenContent = HiddenContent;

const BaseButton = _styledComponents.default.button.withConfig({
  displayName: "styled__BaseButton",
  componentId: "sc-xahsq2-1"
})(["border:none;background:none;"]);

exports.BaseButton = BaseButton;
const ClearButton = (0, _styledComponents.default)(BaseButton).withConfig({
  displayName: "styled__ClearButton",
  componentId: "sc-xahsq2-2"
})(["color:#888;cursor:pointer;width:30px;"]);
exports.ClearButton = ClearButton;

const ClearBoth = _styledComponents.default.div.withConfig({
  displayName: "styled__ClearBoth",
  componentId: "sc-xahsq2-3"
})(["clear:both;"]);

exports.ClearBoth = ClearBoth;
const DropdownButton = (0, _styledComponents.default)(BaseButton).withConfig({
  displayName: "styled__DropdownButton",
  componentId: "sc-xahsq2-4"
})(["width:30px;"]);
exports.DropdownButton = DropdownButton;

const MenuItemList = _styledComponents.default.ul.attrs({
  role: "listbox"
}).withConfig({
  displayName: "styled__MenuItemList",
  componentId: "sc-xahsq2-5"
})(["background-clip:padding-box;background-color:#fff;border-radius:4px;border:1px solid rgba(0,0,0,0.15);box-shadow:0 6px 12px rgba(0,0,0,0.175);float:left;font-size:14px;left:0;list-style:none;margin:2px 0 0;min-width:160px;padding:5px 0;position:absolute;text-align:left;top:100%;z-index:1000000;input[aria-expanded=\"false\"] ~ &{", "}"], hiddenCss);

exports.MenuItemList = MenuItemList;

const Input = _styledComponents.default.input.withConfig({
  displayName: "styled__Input",
  componentId: "sc-xahsq2-6"
})(["border:none;box-shadow:none;font-size:17px;outline:none;"]);

exports.Input = Input;

const InputGroup = _styledComponents.default.div.withConfig({
  displayName: "styled__InputGroup",
  componentId: "sc-xahsq2-7"
})(["border-bottom:1px solid #000;border-collapse:separate;display:table;margin-bottom:15px;position:relative;"]);

exports.InputGroup = InputGroup;

const MenuGroupHeader = _styledComponents.default.h2.withConfig({
  displayName: "styled__MenuGroupHeader",
  componentId: "sc-xahsq2-8"
})(["color:", ";background-color:", ";font-size:12px;font-weight:normal;line-height:1.42857143;margin:0;padding:0px 10px;text-align:center;white-space:nowrap;"], props => props.fgColor || "#eee", props => props.bgColor || "#333");

exports.MenuGroupHeader = MenuGroupHeader;

const MenuItemLi = _styledComponents.default.li.withConfig({
  displayName: "styled__MenuItemLi",
  componentId: "sc-xahsq2-9"
})(["&:hover{background-color:#f5f5f5;cursor:pointer;}&[aria-hidden=\"true\"]:hover{background-color:unset;cursor:default;}background-color:", ";clear:both;color:", ";display:block;font-weight:400;line-height:1.42857143;padding:3px 20px;text-decoration:none;white-space:nowrap;"], props => props.active ? "#337ab7" : "transparent", props => props.active ? "#fff" : "#333");

exports.MenuItemLi = MenuItemLi;

const OptionContainer = _styledComponents.default.span.withConfig({
  displayName: "styled__OptionContainer",
  componentId: "sc-xahsq2-10"
})(["display:block;padding-top:5px;padding-bottom:3px;"]);

exports.OptionContainer = OptionContainer;

const OptionSubTitle = _styledComponents.default.span.withConfig({
  displayName: "styled__OptionSubTitle",
  componentId: "sc-xahsq2-11"
})(["color:#686868;font-size:12px;margin-left:6px;"]);

exports.OptionSubTitle = OptionSubTitle;

const OptionContent = _styledComponents.default.span.withConfig({
  displayName: "styled__OptionContent",
  componentId: "sc-xahsq2-12"
})(["margin-left:30px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);

exports.OptionContent = OptionContent;

const OptionIconContainer = _styledComponents.default.span.withConfig({
  displayName: "styled__OptionIconContainer",
  componentId: "sc-xahsq2-13"
})(["float:left;"]);

exports.OptionIconContainer = OptionIconContainer;

const RouteName = _styledComponents.default.span.withConfig({
  displayName: "styled__RouteName",
  componentId: "sc-xahsq2-14"
})(["background-color:gray;color:white;padding:2px 3px 0px;margin-right:5px;"]);

exports.RouteName = RouteName;
const StaticMenuItemList = (0, _styledComponents.default)(MenuItemList).withConfig({
  displayName: "styled__StaticMenuItemList",
  componentId: "sc-xahsq2-15"
})(["border:none;box-shadow:none;display:block;"]);
exports.StaticMenuItemList = StaticMenuItemList;

const StopContentContainer = _styledComponents.default.span.withConfig({
  displayName: "styled__StopContentContainer",
  componentId: "sc-xahsq2-16"
})(["margin-left:30px;"]);

exports.StopContentContainer = StopContentContainer;

const StopDistance = _styledComponents.default.span.withConfig({
  displayName: "styled__StopDistance",
  componentId: "sc-xahsq2-17"
})(["font-size:8px;"]);

exports.StopDistance = StopDistance;

const StopIconAndDistanceContainer = _styledComponents.default.span.withConfig({
  displayName: "styled__StopIconAndDistanceContainer",
  componentId: "sc-xahsq2-18"
})(["float:left;padding-top:3px;"]);

exports.StopIconAndDistanceContainer = StopIconAndDistanceContainer;

const StopName = _styledComponents.default.span.withConfig({
  displayName: "styled__StopName",
  componentId: "sc-xahsq2-19"
})([""]);

exports.StopName = StopName;

const StopRoutes = _styledComponents.default.span.withConfig({
  displayName: "styled__StopRoutes",
  componentId: "sc-xahsq2-20"
})(["font-size:9px;"]);

exports.StopRoutes = StopRoutes;
const rotateAnimation = (0, _styledComponents.keyframes)(["0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}"]);
const Spinner = (0, _styledComponents.default)(_Spinner.Spinner).withConfig({
  displayName: "styled__Spinner",
  componentId: "sc-xahsq2-21"
})(["animation:", " 1.2s linear infinite;"], rotateAnimation);
exports.Spinner = Spinner;
//# sourceMappingURL=styled.js.map