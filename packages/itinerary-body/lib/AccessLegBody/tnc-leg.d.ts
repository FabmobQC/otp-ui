import { Config, Leg, LegIconComponent } from "@opentripplanner/types";
import { ReactElement } from "react";
interface Props {
    config: Config;
    followsTransit: boolean;
    leg: Leg;
    LegIcon: LegIconComponent;
    LYFT_CLIENT_ID?: string;
    onSummaryClick: () => void;
    showLegIcon: boolean;
    UBER_CLIENT_ID?: string;
}
export default function TNCLeg({ config, followsTransit, leg, LegIcon, LYFT_CLIENT_ID, onSummaryClick, showLegIcon, UBER_CLIENT_ID }: Props): ReactElement;
export {};
//# sourceMappingURL=tnc-leg.d.ts.map