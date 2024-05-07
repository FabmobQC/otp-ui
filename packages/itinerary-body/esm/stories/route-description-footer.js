/* eslint-disable import/prefer-default-export */
import React from "react";
import * as S from "../styled";
export function DefaultRouteDescriptionFooter(_ref) {
  var _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? null : _ref$onClick,
      waitMinutes = _ref.waitMinutes;
  return waitMinutes > 0 ? /*#__PURE__*/React.createElement(S.ArrivalTimeContainer, {
    onClick: onClick
  }, "Arrives in ", waitMinutes, " minutes") : null;
}
//# sourceMappingURL=route-description-footer.js.map