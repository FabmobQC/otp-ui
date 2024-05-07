import React from "react";
import * as S from "../styled";
export default function RouteBadge(_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? "#084c8d" : _ref$color,
      abbreviation = _ref.abbreviation,
      name = _ref.name;
  return /*#__PURE__*/React.createElement(S.RouteBadge, {
    routeColor: color
  }, /*#__PURE__*/React.createElement(S.SRHidden, null, abbreviation), /*#__PURE__*/React.createElement(S.SROnly, null, name));
}
//# sourceMappingURL=index.js.map