import { ModeButtonDefinition } from "@opentripplanner/types";
import { ReactElement } from "react";
interface Props {
    /**
     * Accent color override
     */
    accentColor?: string;
    /**
     * Hover color override
     */
    activeHoverColor?: string;
    /**
     * Apply fill color to the mode icons when the button is selected. (default true)
     */
    fillModeIcons?: boolean;
    /**
     * Text that prompts to select a travel mode.
     */
    label?: string;
    /**
     * List of mode buttons to be displayed
     */
    modeButtons?: ModeButtonDefinition[];
    /**
     * Event handler for settings changes
     * @param QueryParamChangeEvent Event from when the mode settings change
     */
    onSettingsUpdate: (QueryParamChangeEvent: any) => void;
    /**
     * Event for when a mode button is toggled
     * @param key Mode button to be toggled
     */
    onToggleModeButton: (key: string, newState: boolean) => void;
}
export default function ModeSelector({ accentColor, activeHoverColor, fillModeIcons, label, modeButtons, onSettingsUpdate, onToggleModeButton }: Props): ReactElement;
export {};
//# sourceMappingURL=index.d.ts.map