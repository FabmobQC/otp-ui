import CSS from "csstype";
import { ReactElement } from "react";
import type { QueryParamChangeEvent } from "../types";
interface SliderSelectorProps {
    /**
     * The CSS class name(s) to apply to this element.
     */
    className?: string;
    /**
     * The contents of the contained <label> control.
     * Also used as the aria label when high and low labels are provided.
     */
    label?: string;
    /**
     * The label for the right end of the slider.
     */
    labelHigh?: string;
    /**
     * The label for the left end of the slider
     */
    labelLow?: string;
    /**
     * The initial max value for the contained <input> control.
     */
    max: number;
    /**
     * The initial min value for the contained <input> control.
     */
    min: number;
    /**
     * A unique name for the setting.
     */
    name?: string;
    /**
     * Triggered when the value of the <input> control changes.
     */
    onChange?: (evt: QueryParamChangeEvent) => void;
    /**
     * How fine each step should be. Identical to html range step parameter.
     */
    step?: number;
    /**
     * Standard React inline style prop.
     */
    style?: CSS.Properties;
    /**
     * Value to set slider to.
     */
    value?: number;
}
/**
 * A wrapper that includes an <input type="range" /> control and a <label> for the input control.
 */
export default function SliderSelector({ className, max, label, labelLow, labelHigh, min, name, step, onChange, value, style, }: SliderSelectorProps): ReactElement;
export {};
//# sourceMappingURL=index.d.ts.map