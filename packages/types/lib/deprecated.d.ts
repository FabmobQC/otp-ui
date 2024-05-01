/// <reference types="react" />
export declare type ModeOption = {
    id: string;
    selected?: boolean;
    showTitle?: boolean;
    text: JSX.Element;
    title?: string;
};
export declare type ModeSelectorOptions = {
    primary: ModeOption;
    secondary?: ModeOption[];
    tertiary?: ModeOption[];
};
export declare type ConfiguredMode = string | {
    mode: string;
    label: string;
    company?: string;
};
export declare type ConfiguredModes = {
    transitModes: ConfiguredMode[];
    accessModes: ConfiguredMode[];
    exlcusiveModes: ConfiguredMode[];
    bicycleModes: ConfiguredMode[];
    micromobilityModes: ConfiguredMode[];
};
//# sourceMappingURL=deprecated.d.ts.map