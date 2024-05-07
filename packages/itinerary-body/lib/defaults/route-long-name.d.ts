import { Leg } from "@opentripplanner/types";
import { HTMLAttributes, ReactElement } from "react";
interface Props extends HTMLAttributes<HTMLSpanElement> {
    leg: Leg;
}
export default function RouteLongName({ className, leg, style }: Props): ReactElement;
export {};
//# sourceMappingURL=route-long-name.d.ts.map