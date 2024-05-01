import { Component, ReactElement } from "react";
import { Stop, StopEventHandler } from "@opentripplanner/types";
interface Props {
    onStopClick: StopEventHandler;
    stopId?: string;
    stop?: Stop;
}
export default class ViewStopButton extends Component<Props> {
    onClick: () => void;
    render(): ReactElement;
}
export {};
//# sourceMappingURL=view-stop-button.d.ts.map