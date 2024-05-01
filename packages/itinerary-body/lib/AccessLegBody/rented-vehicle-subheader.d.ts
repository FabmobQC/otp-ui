import { Config, Leg } from "@opentripplanner/types";
import { ReactElement } from "react";
interface Props {
    config: Config;
    leg: Leg;
}
/**
 * A component to display vehicle rental instructions, such as
 *   Pick up REACHNOW rented car XYZNDB OR
 *   Pick up SPIN E-scooter
 *   Pick up shared bike
 *
 * The word "Vehicle" has been used
 * because a future refactor is intended to combine car rental, bike rental
 * and micromobility rental all within this component. The future refactor is
 * assuming that the leg.rentedCar and leg.rentedBike response elements from OTP
 * will eventually be merged into the leg.rentedVehicle element.
 */
export default function RentedVehicleSubheader({ config, leg }: Props): ReactElement;
export {};
//# sourceMappingURL=rented-vehicle-subheader.d.ts.map