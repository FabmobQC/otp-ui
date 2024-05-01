import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from "react";
import { AerialTram, Bicycle, Bus, Car, Ferry, Max, Micromobility, Streetcar, TriMet, Walk, Wes } from "./trimet";
/**
 * Icons for all TriMet modes.
 * Any hail and rental modes managed by one or multiple companies
 * are optional (by default, the company logo will be displayed)
 * but can be overridden here using the pattern
 * <otp_mode>_<company_id> (e.g. 'car_hail_uber').
 * Furthermore, any hail or rental modes managed by a single company
 * are optional (by default, the company logo will be displayed)
 * but can be overridden here using the pattern
 * <otp_mode> (e.g. 'bicycle_rent').
 */

function TriMetModeIcon(_ref) {
  var mode = _ref.mode,
      props = _objectWithoutProperties(_ref, ["mode"]);

  if (!mode) return null;

  switch (mode.toLowerCase()) {
    case "bicycle":
      // case "bicycle_rent": // Commented means using the company logo instead.
      return /*#__PURE__*/React.createElement(Bicycle, props);

    case "bus":
    case "trolleybus":
      return /*#__PURE__*/React.createElement(Bus, props);

    case "car":
    case "car_park":
      return /*#__PURE__*/React.createElement(Car, props);

    case "ferry":
      return /*#__PURE__*/React.createElement(Ferry, props);

    case "gondola":
      return /*#__PURE__*/React.createElement(AerialTram, props);

    case "micromobility":
    case "micromobility_rent":
    case "scooter":
      return /*#__PURE__*/React.createElement(Micromobility, props);

    case "rail":
      return /*#__PURE__*/React.createElement(Wes, props);

    case "streetcar":
      return /*#__PURE__*/React.createElement(Streetcar, props);

    case "subway":
    case "tram":
      return /*#__PURE__*/React.createElement(Max, props);

    case "transit":
      return /*#__PURE__*/React.createElement(TriMet, props);

    case "walk":
      return /*#__PURE__*/React.createElement(Walk, props);

    default:
      return null;
  }
}

export default TriMetModeIcon;
//# sourceMappingURL=trimet-mode-icon.js.map