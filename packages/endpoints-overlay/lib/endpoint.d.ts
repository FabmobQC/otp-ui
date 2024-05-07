import { ClearLocationArg, Location, MapLocationActionArg, UserLocationAndType } from "@opentripplanner/types";
import { ComponentType } from "react";
interface Props {
    clearLocation: (arg: ClearLocationArg) => void;
    forgetPlace: (type: string) => void;
    location?: Location;
    locations: Location[];
    MapMarkerIcon: ComponentType<UserLocationAndType>;
    rememberPlace: (arg: UserLocationAndType) => void;
    setLocation: (arg: MapLocationActionArg) => void;
    showUserSettings: boolean;
    type: string;
}
declare const Endpoint: (props: Props) => JSX.Element;
export default Endpoint;
//# sourceMappingURL=endpoint.d.ts.map