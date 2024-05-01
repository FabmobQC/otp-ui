import { Leg } from "@opentripplanner/types";
import React from "react";
import { IntlShape } from "react-intl";
interface Props {
    diagramVisible?: Leg;
    intl: IntlShape;
    leg: Leg;
    setLegDiagram: (leg: Leg) => void;
    showElevationProfile: boolean;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<Props>> & {
    WrappedComponent: React.ComponentType<Props>;
};
export default _default;
//# sourceMappingURL=leg-diagram-preview.d.ts.map