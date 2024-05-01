import { GradationMap } from "@opentripplanner/types";
import { ReactElement } from "react";
interface Props {
    gradationMap?: GradationMap;
    grayscale?: boolean;
    isLeg?: boolean;
    large?: boolean;
    score: number;
}
/**
 * Component which renders a label with a color and icon depending on
 * a given accessibility score. The color and icon are set by a given gradation map.
 */
declare const AccessibilityRating: ({ gradationMap, grayscale, isLeg, large, score }: Props) => ReactElement;
export default AccessibilityRating;
//# sourceMappingURL=accessibility-rating.d.ts.map