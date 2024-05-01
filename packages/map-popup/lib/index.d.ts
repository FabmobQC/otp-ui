/// <reference types="react" />
import type { Company, ConfiguredCompany, Location, Station, Stop, StopEventHandler } from "@opentripplanner/types";
import * as S from "./styled";
export declare const defaultMessages: {
    [key: string]: string;
};
declare type Entity = Stop | Station;
declare type Props = {
    configCompanies?: ConfiguredCompany[];
    entity: Entity;
    getEntityName?: (entity: Entity, configCompanies: Company[]) => string;
    setLocation?: ({ location, locationType }: {
        location: Location;
        locationType: string;
    }) => void;
    setViewedStop?: StopEventHandler;
};
/**
 * Renders a map popup for a stop, scooter, or shared bike
 */
export declare function MapPopup({ configCompanies, entity, getEntityName, setLocation, setViewedStop }: Props): JSX.Element;
export default MapPopup;
export { S as Styled };
//# sourceMappingURL=index.d.ts.map