import { Step } from "@opentripplanner/types";
import { HTMLAttributes, ReactElement } from "react";
interface Props extends HTMLAttributes<HTMLSpanElement> {
    step: Step;
}
/**
 * Renders a step of an access leg.
 */
export default function AccessLegStep({ className, step, style }: Props): ReactElement;
export {};
//# sourceMappingURL=access-leg-step.d.ts.map