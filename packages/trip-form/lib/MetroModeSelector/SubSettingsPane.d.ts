import { ModeButtonDefinition, ModeSetting } from "@opentripplanner/types";
import { ReactElement } from "react";
import CheckboxSelector from "../CheckboxSelector";
export declare const defaultMessages: Record<string, string>;
export declare const SubSettingsCheckbox: import("styled-components").StyledComponent<typeof CheckboxSelector, any, {
    flexbox: boolean;
}, never>;
/**
 * Renders a mode setting definition
 * @param onChange function for when the value changes, and the setting to be rendered
 * @returns JSX Element to render
 */
export declare const ModeSettingRenderer: ({ onChange, setting }: {
    onChange: (QueryParamChangeEvent: any) => void;
    setting: ModeSetting;
}) => JSX.Element;
interface Props {
    modeButton: ModeButtonDefinition;
    onSettingUpdate: (QueryParamChangeEvent: any) => void;
}
export default function SubSettingsPane({ modeButton, onSettingUpdate }: Props): ReactElement;
export {};
//# sourceMappingURL=SubSettingsPane.d.ts.map