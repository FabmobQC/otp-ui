"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MarkerWithPopup", {
  enumerable: true,
  get: function () {
    return _MarkerWithPopup.default;
  }
});
exports.util = exports.Styled = exports.LayerWrapper = exports.Popup = exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _reactMapGl = require("react-map-gl");

var _maplibreGl = _interopRequireDefault(require("maplibre-gl"));

var Styled = _interopRequireWildcard(require("./styled"));

exports.Styled = Styled;

var util = _interopRequireWildcard(require("./util"));

exports.util = util;

var _MarkerWithPopup = _interopRequireDefault(require("./MarkerWithPopup"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const BaseMap = ({
  // These tiles are free to use, but not in production
  baseLayer = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  baseLayerNames,
  center,
  children,
  id,
  mapLibreProps,
  maxZoom,
  onClick,
  onContextMenu,
  onViewportChanged,
  style,
  zoom: initZoom = 12
}) => {
  const [viewState, setViewState] = _react.default.useState({
    latitude: center === null || center === void 0 ? void 0 : center[0],
    longitude: center === null || center === void 0 ? void 0 : center[1],
    zoom: initZoom
  }); // Firefox and Safari on iOS: hover is not triggered when the user touches the layer selector
  // (unlike Firefox or Chromium on Android), so we have to detect touch and trigger hover ourselves.


  const [fakeMobileHover, setFakeHover] = (0, _react.useState)(false);
  const [longPressTimer, setLongPressTimer] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (typeof onViewportChanged === "function") {
      onViewportChanged(viewState);
    }
  }, [viewState]);
  (0, _react.useEffect)(() => {
    if ((center === null || center === void 0 ? void 0 : center[0]) === null || (center === null || center === void 0 ? void 0 : center[1]) === null) return;
    setViewState({ ...viewState,
      latitude: center === null || center === void 0 ? void 0 : center[0],
      longitude: center === null || center === void 0 ? void 0 : center[1]
    });
  }, [center]);
  const toggleableLayers = Array.isArray(children) ? children.flat(10).filter(child => {
    var _child$props, _child$props2;

    return (child === null || child === void 0 ? void 0 : (_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props.id) !== undefined && // Some sources will not have layers as children, and should be ignored
    // from the list.
    (child === null || child === void 0 ? void 0 : (_child$props2 = child.props) === null || _child$props2 === void 0 ? void 0 : _child$props2.alwaysShow) !== true;
  }).map(child => {
    const {
      id: layerId,
      name,
      visible
    } = child.props;
    return {
      id: layerId,
      name,
      visible
    };
  }) : [];
  const [hiddenLayers, setHiddenLayers] = (0, _react.useState)(toggleableLayers.filter(layer => !(layer !== null && layer !== void 0 && layer.visible)).map(layer => layer.id));
  const [activeBaseLayer, setActiveBaseLayer] = (0, _react.useState)(typeof baseLayer === "object" ? baseLayer === null || baseLayer === void 0 ? void 0 : baseLayer[0] : baseLayer);
  const clearLongPressTimer = (0, _react.useCallback)(() => clearTimeout(longPressTimer), [longPressTimer]);
  return /*#__PURE__*/_react.default.createElement(_reactMapGl.Map // eslint-disable-next-line react/jsx-props-no-spreading
  , (0, _extends2.default)({}, mapLibreProps, {
    id: id,
    latitude: viewState.latitude,
    longitude: viewState.longitude,
    mapLib: _maplibreGl.default,
    mapStyle: activeBaseLayer,
    maxZoom: maxZoom,
    onClick: onClick,
    onContextMenu: onContextMenu,
    onMove: evt => {
      setViewState(evt.viewState);
      clearLongPressTimer();
    },
    onTouchStart: e => {
      setFakeHover(false); // Start detecting long presses on screens when there is only one touch point.
      // If the user is pinching the map or does other multi-touch actions, cancel long-press detection.

      const touchPointCount = e.points.length;

      if (touchPointCount === 1) {
        setLongPressTimer(setTimeout(() => onContextMenu(e), 600));
      } else {
        clearLongPressTimer();
      }
    },
    onTouchCancel: clearLongPressTimer,
    onTouchEnd: clearLongPressTimer,
    style: style,
    zoom: viewState.zoom
  }), (toggleableLayers.length > 0 || !!baseLayer && typeof baseLayer === "object" && baseLayer.length > 1) && /*#__PURE__*/_react.default.createElement(Styled.LayerSelector, {
    className: "filter-group",
    id: "filter-group",
    onBlur: () => setFakeHover(false),
    onFocus: () => setFakeHover(true),
    onTouchEnd: () => setFakeHover(true)
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: `maplibregl-ctrl-group layers-list ${fakeMobileHover ? "fake-mobile-hover" : ""}`
  }, !!baseLayer && typeof baseLayer === "object" && baseLayer.map((layer, index) => {
    return /*#__PURE__*/_react.default.createElement("li", {
      key: index
    }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
      checked: activeBaseLayer === layer,
      id: layer,
      name: "base-layer",
      onChange: () => setActiveBaseLayer(layer),
      type: "radio"
    }), (baseLayerNames === null || baseLayerNames === void 0 ? void 0 : baseLayerNames[index]) || layer));
  }), toggleableLayers.map((layer, index) => {
    return /*#__PURE__*/_react.default.createElement("li", {
      key: index
    }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
      checked: !hiddenLayers.includes(layer.id),
      id: layer.id,
      onChange: () => {
        const updatedLayers = [...hiddenLayers]; // Delete the layer id if present, add it otherwise

        updatedLayers.includes(layer.id) ? updatedLayers.splice(updatedLayers.indexOf(layer.id), 1) : updatedLayers.push(layer.id);
        setHiddenLayers(updatedLayers);
      },
      type: "checkbox"
    }), layer.name || layer.id));
  }))), Array.isArray(children) ? children.flat(10).filter(child => {
    var _child$props3;

    return !hiddenLayers.includes(child === null || child === void 0 ? void 0 : (_child$props3 = child.props) === null || _child$props3 === void 0 ? void 0 : _child$props3.id);
  }) : children);
};

var _default = BaseMap;
exports.default = _default;

const LayerWrapper = props => {
  const {
    children,
    visible
  } = props;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, visible && children);
};

exports.LayerWrapper = LayerWrapper;
const Popup = Styled.Popup;
exports.Popup = Popup;
//# sourceMappingURL=index.js.map