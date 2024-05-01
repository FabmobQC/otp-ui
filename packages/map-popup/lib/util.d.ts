import { Company, Station, Stop } from "@opentripplanner/types";
import { IntlShape } from "react-intl";
export declare function makeDefaultGetEntityName(intl: IntlShape, defaultEnglishMessages: {
    [key: string]: string;
}): (entity: Station | Stop, configCompanies: Company[]) => string | null;
//# sourceMappingURL=util.d.ts.map