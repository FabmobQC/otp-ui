import { useMap } from "react-map-gl";
import React, { useEffect } from "react";

/**
 * This overlay is intended to highlight a specific stop on a map typically in
 * conjunction with some kind of stop viewer.
 */
var StopViewerOverlay = function StopViewerOverlay(_ref) {
  var stop = _ref.stop,
      StopMarker = _ref.StopMarker,
      visible = _ref.visible;

  var _useMap = useMap(),
      current = _useMap.current;
  /**
   * Only reset map view if a new stop is selected. This prevents resetting the
   * bounds if, for example, the arrival times have changed for the same stop
   * in the viewer.
   */


  useEffect(function () {
    current === null || current === void 0 ? void 0 : current.flyTo({
      center: [stop.lon, stop.lat]
    });
  }, [stop.lat, stop.lon]); // Null can't be returned here -- react-map-gl dislikes null values as children

  if (visible === false || !stop || !StopMarker) return /*#__PURE__*/React.createElement(React.Fragment, null);
  return /*#__PURE__*/React.createElement(StopMarker, {
    stop: stop
  });
};

export default StopViewerOverlay;
//# sourceMappingURL=index.js.map