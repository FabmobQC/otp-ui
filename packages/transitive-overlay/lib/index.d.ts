/// <reference types="react" />
import { Leg, TransitiveData } from "@opentripplanner/types";
import { itineraryToTransitive } from "./util";
export { itineraryToTransitive };
declare type Props = {
    activeLeg?: Leg;
    transitiveData?: TransitiveData;
};
declare const TransitiveCanvasOverlay: ({ activeLeg, transitiveData }: Props) => JSX.Element;
export default TransitiveCanvasOverlay;
//# sourceMappingURL=index.d.ts.map