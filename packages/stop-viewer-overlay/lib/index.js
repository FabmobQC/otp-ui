"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactMapGl = require("react-map-gl");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * This overlay is intended to highlight a specific stop on a map typically in
 * conjunction with some kind of stop viewer.
 */
const StopViewerOverlay = ({
  stop,
  StopMarker,
  visible
}) => {
  const {
    current
  } = (0, _reactMapGl.useMap)();
  /**
   * Only reset map view if a new stop is selected. This prevents resetting the
   * bounds if, for example, the arrival times have changed for the same stop
   * in the viewer.
   */

  (0, _react.useEffect)(() => {
    current === null || current === void 0 ? void 0 : current.flyTo({
      center: [stop.lon, stop.lat]
    });
  }, [stop.lat, stop.lon]); // Null can't be returned here -- react-map-gl dislikes null values as children

  if (visible === false || !stop || !StopMarker) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  return /*#__PURE__*/_react.default.createElement(StopMarker, {
    stop: stop
  });
};

var _default = StopViewerOverlay;
exports.default = _default;
//# sourceMappingURL=index.js.map