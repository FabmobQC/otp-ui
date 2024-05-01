import { MarkerWithPopup } from "@opentripplanner/base-map";
import React from "react";
import withCaret from "./WithCaret";
import { Circle, getStyledContainer, RotatingCircle, withRouteColorBackground } from "./styled";
import DefaultVehicleIcon, { RouteNumberIcon } from "./VehicleIcon";
import VehicleTooltip from "./VehicleTooltip";
var DefaultIconContainer = withCaret(Circle, {
  offset: 3.75
});
/**
 * An overlay to view a collection of transit vehicles.
 */

var TransitVehicleOverlay = function TransitVehicleOverlay(_ref) {
  var _ref$defaultMode = _ref.defaultMode,
      defaultMode = _ref$defaultMode === void 0 ? "bus" : _ref$defaultMode,
      _ref$IconContainer = _ref.IconContainer,
      IconContainer = _ref$IconContainer === void 0 ? DefaultIconContainer : _ref$IconContainer,
      _ref$iconPadding = _ref.iconPadding,
      iconPadding = _ref$iconPadding === void 0 ? 2 : _ref$iconPadding,
      _ref$iconPixels = _ref.iconPixels,
      iconPixels = _ref$iconPixels === void 0 ? 20 : _ref$iconPixels,
      ModeIcon = _ref.ModeIcon,
      _ref$TooltipSlot = _ref.TooltipSlot,
      TooltipSlot = _ref$TooltipSlot === void 0 ? VehicleTooltip : _ref$TooltipSlot,
      _ref$VehicleIcon = _ref.VehicleIcon,
      VehicleIcon = _ref$VehicleIcon === void 0 ? DefaultVehicleIcon : _ref$VehicleIcon,
      vehicles = _ref.vehicles;
  var validVehicles = vehicles === null || vehicles === void 0 ? void 0 : vehicles.filter(function (vehicle) {
    return !!(vehicle !== null && vehicle !== void 0 && vehicle.lat) && !!(vehicle !== null && vehicle !== void 0 && vehicle.lon);
  }); // Don't render if no map or no vehicles are defined.
  // (ZoomBasedMarkers will also not render below the minimum zoom threshold defined in the symbols prop.)

  if (!validVehicles || validVehicles.length === 0) {
    return null;
  }

  var StyledContainer = getStyledContainer(IconContainer, iconPadding, iconPixels);
  return validVehicles === null || validVehicles === void 0 ? void 0 : validVehicles.map(function (vehicle) {
    return /*#__PURE__*/React.createElement(MarkerWithPopup, {
      key: vehicle.vehicleId // @ts-expect-error the prop override doesn't require all props to be present
      ,
      popupProps: {
        offset: [-iconPixels / 2 - iconPadding, 0]
      },
      position: [vehicle.lat, vehicle.lon],
      tooltipContents: vehicle.routeShortName && /*#__PURE__*/React.createElement(TooltipSlot, {
        vehicle: vehicle
      })
    }, /*#__PURE__*/React.createElement(StyledContainer, {
      vehicle: vehicle
    }, /*#__PURE__*/React.createElement(VehicleIcon, {
      defaultMode: defaultMode,
      ModeIcon: ModeIcon,
      vehicle: vehicle
    })));
  });
};

export default TransitVehicleOverlay; // Export the other subcomponents.

export { Circle, DefaultIconContainer, DefaultVehicleIcon, RotatingCircle, RouteNumberIcon, withCaret, withRouteColorBackground };
//# sourceMappingURL=index.js.map