import { FC, HTMLAttributes } from "react";
import { VehicleComponentProps } from "./types";
interface CaretOptions {
    height?: number;
    offset?: number;
    position?: "inner" | "outer";
    width?: number;
}
declare type IconContainerProps = HTMLAttributes<HTMLDivElement> & VehicleComponentProps;
/**
 * Adds a caret to a component.
 */
export default function withCaret(Component: FC<IconContainerProps>, options?: CaretOptions): FC<IconContainerProps>;
export {};
//# sourceMappingURL=WithCaret.d.ts.map