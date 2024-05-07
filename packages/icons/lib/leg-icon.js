"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _companies = require("./companies");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const LegIcon = ({
  getCompanyIcon,
  leg,
  ModeIcon,
  ...props
}) => {
  const company = _coreUtils.default.itinerary.getCompanyFromLeg(leg); // Check if the iconStr has a matching company icon. If so, return that.


  if (company && typeof getCompanyIcon === "function") {
    const CompanyIcon = getCompanyIcon(company);
    if (CompanyIcon) return /*#__PURE__*/_react.default.createElement(_react.Suspense, {
      fallback: /*#__PURE__*/_react.default.createElement("span", null, company)
    }, /*#__PURE__*/_react.default.createElement(CompanyIcon, props));
  }

  let iconStr = leg.mode; // Do this for P&R, K&R and TNC trips without company icon

  if (iconStr && iconStr.startsWith("CAR")) iconStr = "CAR";
  return /*#__PURE__*/_react.default.createElement(ModeIcon, (0, _extends2.default)({
    mode: iconStr
  }, props));
};

LegIcon.propTypes = {
  // Optional override function for deriving the company icon for a given leg.
  getCompanyIcon: _propTypes.default.func,
  // TYPESCRIPT TODO: restore
  // leg: coreUtils.types.legType.isRequired,
  ModeIcon: _propTypes.default.elementType.isRequired
};
LegIcon.defaultProps = {
  getCompanyIcon: _companies.getCompanyIcon
};
var _default = LegIcon;
exports.default = _default;
//# sourceMappingURL=leg-icon.js.map