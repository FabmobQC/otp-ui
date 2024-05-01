import { FC } from "react";
import { VehicleComponentProps } from "./types";
interface RouteColorBackgroundOptions {
    /**
     * The alpha component of a color in hexadecimal.
     */
    alphaHex?: string;
    defaultColor?: string;
    display?: "fixed" | "onhover";
}
/**
 * Displays a circle with basic settings.
 */
export declare const Circle: import("styled-components").StyledComponent<"div", any, {}, never>;
/**
 * Displays a circle with contents that is rotated according to vehicle heading.
 */
export declare const RotatingCircle: import("styled-components").StyledComponent<"div", any, VehicleComponentProps, never>;
export declare const defaultCaretHeight = 5;
export declare const defaultCaretHalfWidth = 6;
/**
 * Renders a caret that fits within another component and indicates the heading.
 */
export declare const Caret: import("styled-components").StyledComponent<"div", any, {
    rotate: number;
}, never>;
export declare const InnerCaret: import("styled-components").StyledComponent<"div", any, {
    rotate: number;
}, never>;
export declare const OuterCaret: import("styled-components").StyledComponent<"div", any, {
    rotate: number;
}, never>;
/**
 * Applies the vehicle's route color to a component
 * and a foreground color that is contrast-compatible with that color.
 */
export declare function withRouteColorBackground(Container: FC, options?: RouteColorBackgroundOptions): FC;
/**
 * Generate and memoize a container component once per set of container/pixels/padding parameters.
 */
export declare const getStyledContainer: any;
export {};
//# sourceMappingURL=styled.d.ts.map