import React from "react";
import * as S from "../styled";
export default function IntermediateStops(_ref) {
  var stops = _ref.stops;
  return /*#__PURE__*/React.createElement(S.IntermediateStops, null, stops.map(function (stop, k) {
    return /*#__PURE__*/React.createElement(S.StopRow, {
      key: k
    }, /*#__PURE__*/React.createElement(S.StopMarker, null, "\u2022"), /*#__PURE__*/React.createElement(S.StopName, null, stop.name));
  }));
}
//# sourceMappingURL=intermediate-stops.js.map