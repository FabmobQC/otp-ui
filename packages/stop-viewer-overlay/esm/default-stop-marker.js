import { MarkerWithPopup, Styled as BaseMapStyled } from "@opentripplanner/base-map";
import React from "react";
export default function DefaultStopMarker(_ref) {
  var _ref$radius = _ref.radius,
      radius = _ref$radius === void 0 ? 9 : _ref$radius,
      stop = _ref.stop;
  return /*#__PURE__*/React.createElement(MarkerWithPopup, {
    key: stop.id,
    popupContents: /*#__PURE__*/React.createElement("div", null, stop.name),
    position: [stop.lat, stop.lon]
  }, /*#__PURE__*/React.createElement(BaseMapStyled.LeafletStyleMarker, {
    color: "#00FFFF",
    size: radius * 2,
    stroke: radius / 3,
    strokeColor: "#333"
  }));
}
//# sourceMappingURL=default-stop-marker.js.map