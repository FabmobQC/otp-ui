import { Config, Leg, LegIconComponent } from "@opentripplanner/types";
import { Component, FunctionComponent, ReactElement } from "react";
import * as S from "../styled";
import { SetActiveLegFunction, TransitLegSubheaderProps } from "../types";
import AccessLegSteps from "./access-leg-steps";
import AccessLegSummary from "./access-leg-summary";
import LegDiagramPreview from "./leg-diagram-preview";
import RentedVehicleSubheader from "./rented-vehicle-subheader";
import TNCLeg from "./tnc-leg";
interface Props {
    config: Config & {
        itinerary?: {
            hideDrivingDirections?: boolean;
        };
    };
    /**
     * Should be either null or a legType. Indicates that a particular leg diagram
     * has been selected and is active.
     */
    diagramVisible?: Leg;
    followsTransit?: boolean;
    leg: Leg;
    LegIcon: LegIconComponent;
    legIndex: number;
    mapillaryCallback?: (id: string) => void;
    mapillaryKey?: string;
    setActiveLeg: SetActiveLegFunction;
    setLegDiagram: (leg: Leg) => void;
    showElevationProfile: boolean;
    showLegIcon: boolean;
    TransitLegSubheader?: FunctionComponent<TransitLegSubheaderProps>;
}
interface State {
    expanded: boolean;
}
/**
 * Component for access (e.g. walk/bike/etc.) leg in narrative itinerary. This
 * particular component is used in the line-itin (i.e., trimet-mod-otp) version
 * of the narrative itinerary.
 */
declare class AccessLegBody extends Component<Props, State> {
    constructor(props: Props);
    onStepsHeaderClick: () => void;
    onSummaryClick: () => void;
    render(): ReactElement;
}
export default AccessLegBody;
export { AccessLegSteps, AccessLegSummary, LegDiagramPreview, RentedVehicleSubheader, S as Styled, TNCLeg };
//# sourceMappingURL=index.d.ts.map