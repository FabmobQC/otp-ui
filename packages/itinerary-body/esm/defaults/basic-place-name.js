import React from "react";
import { useIntl } from "react-intl";
import { getPlaceName } from "../util";
import StayOnBoard from "./stay-on-board";
export default function BasicPlaceName(_ref) {
  var config = _ref.config,
      interline = _ref.interline,
      place = _ref.place;
  var intl = useIntl();
  return interline ? /*#__PURE__*/React.createElement(StayOnBoard, {
    place: place
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, getPlaceName(place, config.companies, intl));
}
//# sourceMappingURL=basic-place-name.js.map