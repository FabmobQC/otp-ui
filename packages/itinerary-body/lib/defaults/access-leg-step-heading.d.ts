import { ReactElement } from "react";
export declare enum Heading {
    east = "EAST",
    north = "NORTH",
    northeast = "NORTHEAST",
    northwest = "NORTHWEST",
    south = "SOUTH",
    southeast = "SOUTHEAST",
    southwest = "SOUTHWEST",
    west = "WEST"
}
interface Props {
    heading: Heading;
}
/**
 * Displays text for a compass direction.
 */
export default function AccessLegStepHeading({ heading }: Props): ReactElement;
export {};
//# sourceMappingURL=access-leg-step-heading.d.ts.map