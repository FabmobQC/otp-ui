import { ReactElement } from "react";
import { Step } from "@opentripplanner/types";
interface Props {
    mapillaryCallback?: (id: string) => void;
    mapillaryKey?: string;
    steps: Step[];
}
/**
 * Renders a turn-by-turn step of an access leg.
 */
export default function AccessLegSteps({ steps, mapillaryCallback, mapillaryKey }: Props): ReactElement;
export {};
//# sourceMappingURL=access-leg-steps.d.ts.map