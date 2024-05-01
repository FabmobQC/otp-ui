import { Stop } from "@opentripplanner/types";
import React from "react";
export declare type StopContainer = {
    stop: Stop;
};
/**
 * This overlay is intended to highlight a specific stop on a map typically in
 * conjunction with some kind of stop viewer.
 */
declare const StopViewerOverlay: ({ stop, StopMarker, visible }: {
    stop: Stop;
    StopMarker: React.FunctionComponent<StopContainer>;
    visible?: boolean;
}) => JSX.Element;
export default StopViewerOverlay;
//# sourceMappingURL=index.d.ts.map