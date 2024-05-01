/// <reference types="react" />
export interface Hue {
    [key: number]: string;
}
interface Props {
    color: Hue;
}
declare const ColorPalette: ({ color }: Props) => JSX.Element;
export default ColorPalette;
//# sourceMappingURL=ColorPalette.d.ts.map