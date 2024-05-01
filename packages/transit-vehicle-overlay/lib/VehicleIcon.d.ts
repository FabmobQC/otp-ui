import { FC, ReactElement } from "react";
import { VehicleComponentProps } from "./types";
/**
 * Fill-in type for the icons package.
 */
export interface ModeIconProps {
    mode?: string;
}
export interface VehicleIconProps extends VehicleComponentProps {
    defaultMode?: string;
    ModeIcon: FC<ModeIconProps>;
}
/**
 * Renders the route number so it gets fitted into the icon shape.
 */
export declare function RouteNumberIcon({ vehicle }: VehicleComponentProps): ReactElement;
/**
 * Renders the associated mode icon for the given transit vehicle and ModeIcon component.
 * Falls back to the route short name if no icon is found for the desired mode.
 */
export default function VehicleIcon({ defaultMode, ModeIcon, vehicle }: VehicleIconProps): ReactElement;
//# sourceMappingURL=VehicleIcon.d.ts.map