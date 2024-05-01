import { Stop, UserLocation } from "@opentripplanner/types";
import React from "react";
import { IntlShape } from "react-intl";
import { UserLocationIconType, UserLocationSelectedHandler, UserLocationRenderData, UserLocationIconProps } from "./types";
export declare const ICON_SIZE = 13;
export declare function GeocodedOptionIcon({ feature }: {
    feature: {
        properties?: {
            source: string;
        };
    };
}): React.ReactElement;
export declare const MenuItem: ({ active, children, disabled, id, onClick }: {
    active?: boolean;
    children: React.ReactNode;
    disabled?: boolean;
    id?: string;
    onClick?: () => void;
}) => React.ReactElement;
export declare function Option({ classes, color, disabled, icon, id, isActive, onClick, subTitle, title }: {
    classes?: string;
    color?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    id?: string;
    isActive?: boolean;
    onClick?: () => void;
    subTitle?: React.ReactNode;
    title?: React.ReactNode;
}): React.ReactElement;
export declare function TransitStopOption({ id, isActive, onClick, stop, stopOptionIcon }: {
    id?: string;
    isActive?: boolean;
    onClick: () => void;
    stop: Stop;
    stopOptionIcon: React.ReactNode;
}): React.ReactElement;
export declare function UserLocationIcon({ userLocation }: UserLocationIconProps): React.ReactElement;
export declare function getStoredPlaceName(location: UserLocation, intl: IntlShape, withDetails?: boolean): string;
/**
 * Helper to populate the display name for a user-saved location.
 */
export declare function getRenderData(location: UserLocation, setLocation: UserLocationSelectedHandler, Icon: UserLocationIconType, intl: IntlShape): UserLocationRenderData;
//# sourceMappingURL=options.d.ts.map