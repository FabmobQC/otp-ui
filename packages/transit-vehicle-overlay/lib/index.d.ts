import { TransitVehicle } from "@opentripplanner/types";
import React, { FC, ReactNode } from "react";
import withCaret from "./WithCaret";
import { Circle, RotatingCircle, withRouteColorBackground } from "./styled";
import { VehicleComponentProps } from "./types";
import DefaultVehicleIcon, { ModeIconProps, RouteNumberIcon, VehicleIconProps } from "./VehicleIcon";
declare type Props = {
    /**
     * Default mode to assume if not provided in the vehicle data. Defaults to "bus".
     */
    defaultMode?: string;
    /**
     * Containing component in which route icons/numbers are rendered.
     * Can optionally support a vehicle prop.
     */
    IconContainer?: FC;
    /**
     * Sets the padding between component and icon in IconContainer instances that support it.
     */
    iconPadding?: number;
    /**
     * Sets the size in pixels of the icon in IconContainer instances that support it.
     */
    iconPixels?: number;
    /**
     * Component that renders the icons given transit modes.
     */
    ModeIcon: FC<ModeIconProps>;
    /**
     * A tooltip JSX to render
     */
    TooltipSlot?: FC<VehicleComponentProps>;
    /**
     * Component that renders the icons or other content such as route number for each transit vehicle.
     */
    VehicleIcon?: FC<VehicleIconProps>;
    /**
     * The list of vehicles to create stop markers for.
     */
    vehicles?: TransitVehicle[];
};
declare const DefaultIconContainer: React.FC<React.HTMLAttributes<HTMLDivElement> & VehicleComponentProps>;
/**
 * An overlay to view a collection of transit vehicles.
 */
declare const TransitVehicleOverlay: ({ defaultMode, IconContainer, iconPadding, iconPixels, ModeIcon, TooltipSlot, VehicleIcon, vehicles }: Props) => ReactNode;
export default TransitVehicleOverlay;
export { Circle, DefaultIconContainer, DefaultVehicleIcon, RotatingCircle, RouteNumberIcon, withCaret, withRouteColorBackground };
//# sourceMappingURL=index.d.ts.map