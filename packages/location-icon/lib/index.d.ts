import { ReactElement } from "react";
import * as S from "./styled";
declare type Props = {
    className?: string;
    /**
     * Can be either a number or a string.
     * See https://github.com/jacobwgillespie/styled-icons#props
     */
    size: number | string;
    /**
     * `from` or `to` or some other string value to trigger generic place icon.
     */
    type: string;
};
/**
 * LocationIcon provides a consistent icon for rendering from, to, or generic
 * place icons in form components like LocationField and in map overlays/popups.
 */
export declare function LocationIcon({ className, size, type }: Props): ReactElement;
export default LocationIcon;
export { S as Styled };
//# sourceMappingURL=index.d.ts.map