import _extends from "@babel/runtime/helpers/extends";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _typeof from "@babel/runtime/helpers/typeof";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useCallback, useEffect, useState } from "react";
import { Map } from "react-map-gl";
import maplibregl from "maplibre-gl";
import * as Styled from "./styled";
import * as util from "./util";
import MarkerWithPopup from "./MarkerWithPopup";
/**
 * The BaseMap component renders a MapLibre map
 * as well as markers that are declared as child elements of the BaseMap element.
 *
 * As BaseMap wraps a react-map-gl Map component, any control which can be added as a child of a react-map-gl map is supported.
 * See https://visgl.github.io/react-map-gl/docs/api-reference/map to see which react-map-gl
 * children are shipped by default. Others are also supported.
 *
 * Overlays are groups of similar MapLibre markers, e.g. vehicle location
 * markers, bus stop markers, etc.
 *
 * Overlays are automatically added to the overlay control displayed by the
 * BaseMap. The user uses that control to turn overlays on or off. Only overlays
 * with an id are added to the control.
 */

var BaseMap = function BaseMap(_ref) {
  var _ref$baseLayer = _ref.baseLayer,
      baseLayer = _ref$baseLayer === void 0 ? "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" : _ref$baseLayer,
      baseLayerNames = _ref.baseLayerNames,
      center = _ref.center,
      children = _ref.children,
      id = _ref.id,
      mapLibreProps = _ref.mapLibreProps,
      maxZoom = _ref.maxZoom,
      onClick = _ref.onClick,
      onContextMenu = _ref.onContextMenu,
      onViewportChanged = _ref.onViewportChanged,
      style = _ref.style,
      _ref$zoom = _ref.zoom,
      initZoom = _ref$zoom === void 0 ? 12 : _ref$zoom;

  var _React$useState = React.useState({
    latitude: center === null || center === void 0 ? void 0 : center[0],
    longitude: center === null || center === void 0 ? void 0 : center[1],
    zoom: initZoom
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      viewState = _React$useState2[0],
      setViewState = _React$useState2[1]; // Firefox and Safari on iOS: hover is not triggered when the user touches the layer selector
  // (unlike Firefox or Chromium on Android), so we have to detect touch and trigger hover ourselves.


  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      fakeMobileHover = _useState2[0],
      setFakeHover = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      longPressTimer = _useState4[0],
      setLongPressTimer = _useState4[1];

  useEffect(function () {
    if (typeof onViewportChanged === "function") {
      onViewportChanged(viewState);
    }
  }, [viewState]);
  useEffect(function () {
    if ((center === null || center === void 0 ? void 0 : center[0]) === null || (center === null || center === void 0 ? void 0 : center[1]) === null) return;
    setViewState(_objectSpread(_objectSpread({}, viewState), {}, {
      latitude: center === null || center === void 0 ? void 0 : center[0],
      longitude: center === null || center === void 0 ? void 0 : center[1]
    }));
  }, [center]);
  var toggleableLayers = Array.isArray(children) ? children.flat(10).filter(function (child) {
    var _child$props, _child$props2;

    return (child === null || child === void 0 ? void 0 : (_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props.id) !== undefined && // Some sources will not have layers as children, and should be ignored
    // from the list.
    (child === null || child === void 0 ? void 0 : (_child$props2 = child.props) === null || _child$props2 === void 0 ? void 0 : _child$props2.alwaysShow) !== true;
  }).map(function (child) {
    var _child$props3 = child.props,
        layerId = _child$props3.id,
        name = _child$props3.name,
        visible = _child$props3.visible;
    return {
      id: layerId,
      name: name,
      visible: visible
    };
  }) : [];

  var _useState5 = useState(toggleableLayers.filter(function (layer) {
    return !(layer !== null && layer !== void 0 && layer.visible);
  }).map(function (layer) {
    return layer.id;
  })),
      _useState6 = _slicedToArray(_useState5, 2),
      hiddenLayers = _useState6[0],
      setHiddenLayers = _useState6[1];

  var _useState7 = useState(_typeof(baseLayer) === "object" ? baseLayer === null || baseLayer === void 0 ? void 0 : baseLayer[0] : baseLayer),
      _useState8 = _slicedToArray(_useState7, 2),
      activeBaseLayer = _useState8[0],
      setActiveBaseLayer = _useState8[1];

  var clearLongPressTimer = useCallback(function () {
    return clearTimeout(longPressTimer);
  }, [longPressTimer]);
  return /*#__PURE__*/React.createElement(Map // eslint-disable-next-line react/jsx-props-no-spreading
  , _extends({}, mapLibreProps, {
    id: id,
    latitude: viewState.latitude,
    longitude: viewState.longitude,
    mapLib: maplibregl,
    mapStyle: activeBaseLayer,
    maxZoom: maxZoom,
    onClick: onClick,
    onContextMenu: onContextMenu,
    onMove: function onMove(evt) {
      setViewState(evt.viewState);
      clearLongPressTimer();
    },
    onTouchStart: function onTouchStart(e) {
      setFakeHover(false); // Start detecting long presses on screens when there is only one touch point.
      // If the user is pinching the map or does other multi-touch actions, cancel long-press detection.

      var touchPointCount = e.points.length;

      if (touchPointCount === 1) {
        setLongPressTimer(setTimeout(function () {
          return onContextMenu(e);
        }, 600));
      } else {
        clearLongPressTimer();
      }
    },
    onTouchCancel: clearLongPressTimer,
    onTouchEnd: clearLongPressTimer,
    style: style,
    zoom: viewState.zoom
  }), (toggleableLayers.length > 0 || !!baseLayer && _typeof(baseLayer) === "object" && baseLayer.length > 1) && /*#__PURE__*/React.createElement(Styled.LayerSelector, {
    className: "filter-group",
    id: "filter-group",
    onBlur: function onBlur() {
      return setFakeHover(false);
    },
    onFocus: function onFocus() {
      return setFakeHover(true);
    },
    onTouchEnd: function onTouchEnd() {
      return setFakeHover(true);
    }
  }, /*#__PURE__*/React.createElement("ul", {
    className: "maplibregl-ctrl-group layers-list ".concat(fakeMobileHover ? "fake-mobile-hover" : "")
  }, !!baseLayer && _typeof(baseLayer) === "object" && baseLayer.map(function (layer, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index
    }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      checked: activeBaseLayer === layer,
      id: layer,
      name: "base-layer",
      onChange: function onChange() {
        return setActiveBaseLayer(layer);
      },
      type: "radio"
    }), (baseLayerNames === null || baseLayerNames === void 0 ? void 0 : baseLayerNames[index]) || layer));
  }), toggleableLayers.map(function (layer, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index
    }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      checked: !hiddenLayers.includes(layer.id),
      id: layer.id,
      onChange: function onChange() {
        var updatedLayers = _toConsumableArray(hiddenLayers); // Delete the layer id if present, add it otherwise


        updatedLayers.includes(layer.id) ? updatedLayers.splice(updatedLayers.indexOf(layer.id), 1) : updatedLayers.push(layer.id);
        setHiddenLayers(updatedLayers);
      },
      type: "checkbox"
    }), layer.name || layer.id));
  }))), Array.isArray(children) ? children.flat(10).filter(function (child) {
    var _child$props4;

    return !hiddenLayers.includes(child === null || child === void 0 ? void 0 : (_child$props4 = child.props) === null || _child$props4 === void 0 ? void 0 : _child$props4.id);
  }) : children);
};

export default BaseMap;

var LayerWrapper = function LayerWrapper(props) {
  var children = props.children,
      visible = props.visible;
  return /*#__PURE__*/React.createElement(React.Fragment, null, visible && children);
};

export var Popup = Styled.Popup;
export { LayerWrapper, MarkerWithPopup, Styled, util };
//# sourceMappingURL=index.js.map