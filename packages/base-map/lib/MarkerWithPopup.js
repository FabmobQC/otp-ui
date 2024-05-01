"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _reactMapGl = require("react-map-gl");

var _styled = require("./styled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable react/jsx-props-no-spreading */

/**
 * A MapLibre marker with a connected popup or tooltip
 */
const MarkerWithPopup = ({
  children,
  popupContents,
  popupProps,
  position,
  tooltipContents
}) => {
  const [showPopup, setShowPopup] = (0, _react.useState)(false);
  const [showTooltip, setShowTooltip] = (0, _react.useState)(false);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _react.default.createElement(_reactMapGl.Marker, {
      latitude: position[0],
      longitude: position[1],
      onClick: () => setShowPopup(true),
      style: {
        cursor: popupContents ? "pointer" : "inherit"
      }
    }, /*#__PURE__*/_react.default.createElement("span", {
      onMouseEnter: () => setShowTooltip(true),
      onMouseLeave: () => setShowTooltip(false)
    }, children || /*#__PURE__*/_react.default.createElement(_styled.LeafletStyleMarker, null)), showTooltip && tooltipContents && /*#__PURE__*/_react.default.createElement(_styled.Popup // eslint-disable-next-line react/jsx-props-no-spreading
    , (0, _extends2.default)({}, popupProps, {
      anchor: "right",
      closeButton: false,
      closeOnClick: false,
      latitude: position[0],
      longitude: position[1]
    }), tooltipContents), showPopup && popupContents && /*#__PURE__*/_react.default.createElement(_styled.Popup // eslint-disable-next-line react/jsx-props-no-spreading
    , (0, _extends2.default)({}, popupProps, {
      latitude: position[0],
      longitude: position[1],
      maxWidth: "100%",
      onClose: () => setShowPopup(false)
    }), popupContents))
  );
};

var _default = MarkerWithPopup;
exports.default = _default;
//# sourceMappingURL=MarkerWithPopup.js.map