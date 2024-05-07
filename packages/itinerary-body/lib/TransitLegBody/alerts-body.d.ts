import { Alert } from "@opentripplanner/types";
import { FunctionComponent, ReactElement } from "react";
interface Props {
    alerts: Alert[];
    AlertIcon?: FunctionComponent;
    timeZone?: string;
}
export default function AlertsBody({ alerts, AlertIcon, timeZone }: Props): ReactElement;
export {};
//# sourceMappingURL=alerts-body.d.ts.map