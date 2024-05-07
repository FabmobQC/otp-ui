"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TripDetailSummary = exports.TripDetailsHeader = exports.TripDetailsBody = exports.TripDetails = exports.TripDetailIcon = exports.TripDetailDescription = exports.TripDetail = exports.FlexSummary = exports.TransitFareSingle = exports.TransitFare = exports.Timing = exports.TNCFareCompanies = exports.TNCFare = exports.HideButton = exports.Fare = exports.ExpandButton = exports.CO2Summary = exports.CO2Description = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

const BaseButton = _styledComponents.default.button.withConfig({
  displayName: "styled__BaseButton",
  componentId: "sc-6q2ok2-0"
})(["background:transparent;border:0;cursor:pointer;display:inline-block;font-size:14px;font-weight:400;line-height:1.42857143;margin:0;padding:0;text-decoration:none;touch-action:manipulation;user-select:none;vertical-align:middle;white-space:nowrap;"]);

const CO2Description = _styledComponents.default.span.withConfig({
  displayName: "styled__CO2Description",
  componentId: "sc-6q2ok2-1"
})([""]);

exports.CO2Description = CO2Description;

const CO2Summary = _styledComponents.default.span.withConfig({
  displayName: "styled__CO2Summary",
  componentId: "sc-6q2ok2-2"
})([""]);

exports.CO2Summary = CO2Summary;
const ExpandButton = (0, _styledComponents.default)(BaseButton).withConfig({
  displayName: "styled__ExpandButton",
  componentId: "sc-6q2ok2-3"
})(["color:#00f;font-size:16px;margin-left:6px;margin-top:-2px;"]);
exports.ExpandButton = ExpandButton;

const Fare = _styledComponents.default.span.withConfig({
  displayName: "styled__Fare",
  componentId: "sc-6q2ok2-4"
})([""]);

exports.Fare = Fare;
const HideButton = (0, _styledComponents.default)(BaseButton).withConfig({
  displayName: "styled__HideButton",
  componentId: "sc-6q2ok2-5"
})(["float:right;"]);
exports.HideButton = HideButton;

const TNCFare = _styledComponents.default.span.withConfig({
  displayName: "styled__TNCFare",
  componentId: "sc-6q2ok2-6"
})([""]);

exports.TNCFare = TNCFare;

const TNCFareCompanies = _styledComponents.default.span.withConfig({
  displayName: "styled__TNCFareCompanies",
  componentId: "sc-6q2ok2-7"
})(["text-transform:capitalize;"]);

exports.TNCFareCompanies = TNCFareCompanies;

const Timing = _styledComponents.default.span.withConfig({
  displayName: "styled__Timing",
  componentId: "sc-6q2ok2-8"
})([""]);

exports.Timing = Timing;

const TransitFare = _styledComponents.default.details.withConfig({
  displayName: "styled__TransitFare",
  componentId: "sc-6q2ok2-9"
})(["display:inline-block;> span{display:block;padding-left:1.75ch;}"]);

exports.TransitFare = TransitFare;

const TransitFareSingle = _styledComponents.default.span.withConfig({
  displayName: "styled__TransitFareSingle",
  componentId: "sc-6q2ok2-10"
})([""]);

exports.TransitFareSingle = TransitFareSingle;

const FlexSummary = _styledComponents.default.span.withConfig({
  displayName: "styled__FlexSummary",
  componentId: "sc-6q2ok2-11"
})([""]);

exports.FlexSummary = FlexSummary;

const TripDetail = _styledComponents.default.div.withConfig({
  displayName: "styled__TripDetail",
  componentId: "sc-6q2ok2-12"
})(["margin-top:6px;"]);

exports.TripDetail = TripDetail;

const TripDetailDescription = _styledComponents.default.div.withConfig({
  displayName: "styled__TripDetailDescription",
  componentId: "sc-6q2ok2-13"
})(["background-color:#fff;border:1px solid #888;font-size:12px;margin-top:2px;padding:8px;"]);

exports.TripDetailDescription = TripDetailDescription;

const TripDetailIcon = _styledComponents.default.div.withConfig({
  displayName: "styled__TripDetailIcon",
  componentId: "sc-6q2ok2-14"
})(["float:left;font-size:17px;"]);

exports.TripDetailIcon = TripDetailIcon;

const TripDetails = _styledComponents.default.div.withConfig({
  displayName: "styled__TripDetails",
  componentId: "sc-6q2ok2-15"
})(["background-color:#eee;border-radius:6px;margin-bottom:15px;margin-top:16px;padding:10px 16px;"]);

exports.TripDetails = TripDetails;

const TripDetailsBody = _styledComponents.default.div.withConfig({
  displayName: "styled__TripDetailsBody",
  componentId: "sc-6q2ok2-16"
})([""]);

exports.TripDetailsBody = TripDetailsBody;

const TripDetailsHeader = _styledComponents.default.h2.withConfig({
  displayName: "styled__TripDetailsHeader",
  componentId: "sc-6q2ok2-17"
})(["font-size:18px;font-weight:600;margin:0;"]);

exports.TripDetailsHeader = TripDetailsHeader;

const TripDetailSummary = _styledComponents.default.div.withConfig({
  displayName: "styled__TripDetailSummary",
  componentId: "sc-6q2ok2-18"
})(["margin-left:28px;padding-top:2px;display:flex;align-items:baseline;white-space:pre;"]);

exports.TripDetailSummary = TripDetailSummary;
//# sourceMappingURL=styled.js.map