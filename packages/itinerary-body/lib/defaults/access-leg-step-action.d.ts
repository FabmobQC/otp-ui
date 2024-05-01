import { ReactElement } from "react";
export declare enum Action {
    circleClockwise = "CIRCLE_CLOCKWISE",
    circleCounterClockwise = "CIRCLE_COUNTERCLOCKWISE",
    continue = "CONTINUE",
    enterStation = "ENTER_STATION",
    exitStation = "EXIT_STATION",
    followSigns = "FOLLOW_SIGNS",
    hardLeft = "HARD_LEFT",
    hardRight = "HARD_RIGHT",
    left = "LEFT",
    right = "RIGHT",
    slightlyLeft = "SLIGHTLY_LEFT",
    slightlyRight = "SLIGHTLY_RIGHT",
    uTurnLeft = "UTURN_LEFT",
    uTurnRight = "UTURN_RIGHT"
}
interface Props {
    action: Action;
}
/**
 * Helper component that display localized strings for the given action string.
 */
export default function AccessLegStepAction({ action }: Props): ReactElement;
export {};
//# sourceMappingURL=access-leg-step-action.d.ts.map