"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ItineraryBody = _interopRequireDefault(require("../ItineraryBody"));

var ItineraryBodyClasses = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const StyledItineraryBody = (0, _styledComponents.default)(_ItineraryBody.default).withConfig({
  displayName: "itinerary-body__StyledItineraryBody",
  componentId: "sc-1aqc6e3-0"
})(["font-size:16px;*:not(.fa){box-sizing:border-box;font-family:Hind,sans-serif;}", "{margin-left:-18px;margin-right:3px;}", "{background-color:rgb(15,106,172);border-color:white;border-image:initial;border-radius:12px;border-style:solid;border-width:1px;box-shadow:rgb(0,0,0) 0px 0px 0.25em;color:white;display:inline-block;font-size:14px;font-weight:500;height:24px;line-height:1.5;margin-right:8px;min-width:24px;padding:2px 3px;text-align:center;}", "{display:table-cell;max-width:20px;width:20px;padding:0;position:relative;}", "{color:#000;font-size:18px;font-weight:500;line-height:20px;}", "{height:inherit;white-space:normal;}", "{width:100%;}", "{margin-left:-23px;}", "{color:#676767;display:table-cell;font-size:14px;padding-right:4px;padding-top:2px;text-align:right;vertical-align:top;width:60px;}"], ItineraryBodyClasses.InterlineDot, ItineraryBodyClasses.LegDescriptionRouteShortName, ItineraryBodyClasses.LineColumn, ItineraryBodyClasses.PlaceHeader, ItineraryBodyClasses.PlaceName, ItineraryBodyClasses.PlaceRowWrapper, ItineraryBodyClasses.StopMarker, ItineraryBodyClasses.TimeColumn);
var _default = StyledItineraryBody;
exports.default = _default;
//# sourceMappingURL=itinerary-body.js.map