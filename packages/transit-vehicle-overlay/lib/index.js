"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withCaret", {
  enumerable: true,
  get: function () {
    return _WithCaret.default;
  }
});
Object.defineProperty(exports, "Circle", {
  enumerable: true,
  get: function () {
    return _styled.Circle;
  }
});
Object.defineProperty(exports, "RotatingCircle", {
  enumerable: true,
  get: function () {
    return _styled.RotatingCircle;
  }
});
Object.defineProperty(exports, "withRouteColorBackground", {
  enumerable: true,
  get: function () {
    return _styled.withRouteColorBackground;
  }
});
Object.defineProperty(exports, "DefaultVehicleIcon", {
  enumerable: true,
  get: function () {
    return _VehicleIcon.default;
  }
});
Object.defineProperty(exports, "RouteNumberIcon", {
  enumerable: true,
  get: function () {
    return _VehicleIcon.RouteNumberIcon;
  }
});
exports.DefaultIconContainer = exports.default = void 0;

var _baseMap = require("@opentripplanner/base-map");

var _react = _interopRequireDefault(require("react"));

var _WithCaret = _interopRequireDefault(require("./WithCaret"));

var _styled = require("./styled");

var _VehicleIcon = _interopRequireWildcard(require("./VehicleIcon"));

var _VehicleTooltip = _interopRequireDefault(require("./VehicleTooltip"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DefaultIconContainer = (0, _WithCaret.default)(_styled.Circle, {
  offset: 3.75
});
/**
 * An overlay to view a collection of transit vehicles.
 */

exports.DefaultIconContainer = DefaultIconContainer;

const TransitVehicleOverlay = ({
  defaultMode = "bus",
  IconContainer = DefaultIconContainer,
  iconPadding = 2,
  iconPixels = 20,
  ModeIcon,
  TooltipSlot = _VehicleTooltip.default,
  VehicleIcon = _VehicleIcon.default,
  vehicles
}) => {
  const validVehicles = vehicles === null || vehicles === void 0 ? void 0 : vehicles.filter(vehicle => !!(vehicle !== null && vehicle !== void 0 && vehicle.lat) && !!(vehicle !== null && vehicle !== void 0 && vehicle.lon)); // Don't render if no map or no vehicles are defined.
  // (ZoomBasedMarkers will also not render below the minimum zoom threshold defined in the symbols prop.)

  if (!validVehicles || validVehicles.length === 0) {
    return null;
  }

  const StyledContainer = (0, _styled.getStyledContainer)(IconContainer, iconPadding, iconPixels);
  return validVehicles === null || validVehicles === void 0 ? void 0 : validVehicles.map(vehicle => /*#__PURE__*/_react.default.createElement(_baseMap.MarkerWithPopup, {
    key: vehicle.vehicleId // @ts-expect-error the prop override doesn't require all props to be present
    ,
    popupProps: {
      offset: [-iconPixels / 2 - iconPadding, 0]
    },
    position: [vehicle.lat, vehicle.lon],
    tooltipContents: vehicle.routeShortName && /*#__PURE__*/_react.default.createElement(TooltipSlot, {
      vehicle: vehicle
    })
  }, /*#__PURE__*/_react.default.createElement(StyledContainer, {
    vehicle: vehicle
  }, /*#__PURE__*/_react.default.createElement(VehicleIcon, {
    defaultMode: defaultMode,
    ModeIcon: ModeIcon,
    vehicle: vehicle
  }))));
};

var _default = TransitVehicleOverlay; // Export the other subcomponents.

exports.default = _default;
//# sourceMappingURL=index.js.map