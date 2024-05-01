"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocationIcon = LocationIcon;
exports.Styled = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var S = _interopRequireWildcard(require("./styled"));

exports.Styled = S;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * LocationIcon provides a consistent icon for rendering from, to, or generic
 * place icons in form components like LocationField and in map overlays/popups.
 */
function LocationIcon({
  className = "",
  size = 10,
  type = ""
}) {
  switch (type) {
    case "from":
      return /*#__PURE__*/_react.default.createElement(S.FromIcon, {
        className: className,
        size: size
      });

    case "to":
      return /*#__PURE__*/_react.default.createElement(S.ToIcon, {
        className: className,
        size: size
      });

    default:
      return /*#__PURE__*/_react.default.createElement(S.PlaceIcon, {
        className: className,
        size: size
      });
  }
}

var _default = LocationIcon; // Rename styled components for export

exports.default = _default;
//# sourceMappingURL=index.js.map