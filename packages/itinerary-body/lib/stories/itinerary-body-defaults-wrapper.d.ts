import { Leg } from "@opentripplanner/types";
import { Component, ReactElement } from "react";
import { ItineraryBodyProps } from "../types";
declare type Props = ItineraryBodyProps & {
    hideDrivingDirections?: boolean;
    styledItinerary?: string;
};
interface State {
    diagramVisible: Leg;
}
export default class ItineraryBodyDefaultsWrapper extends Component<Props, State> {
    constructor(props: Props);
    setLegDiagram: (leg: Leg) => void;
    render(): ReactElement;
}
export {};
//# sourceMappingURL=itinerary-body-defaults-wrapper.d.ts.map