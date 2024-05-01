import { Config, Leg, LegIconComponent } from "@opentripplanner/types";
import { ReactElement } from "react";
interface Props {
    config: Config;
    leg: Leg;
    LegIcon: LegIconComponent;
    onSummaryClick: () => void;
    showLegIcon: boolean;
}
export default function AccessLegSummary({ config, leg, LegIcon, onSummaryClick, showLegIcon }: Props): ReactElement;
export {};
//# sourceMappingURL=access-leg-summary.d.ts.map