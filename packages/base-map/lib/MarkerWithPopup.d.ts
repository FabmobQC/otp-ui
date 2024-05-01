import React from "react";
import { PopupProps } from "react-map-gl";
declare type Props = React.ComponentPropsWithoutRef<React.ElementType> & {
    popupContents?: React.ReactNode;
    popupProps?: PopupProps;
    position: [number, number];
    tooltipContents?: React.ReactNode;
};
/**
 * A MapLibre marker with a connected popup or tooltip
 */
declare const MarkerWithPopup: ({ children, popupContents, popupProps, position, tooltipContents }: Props) => JSX.Element;
export default MarkerWithPopup;
//# sourceMappingURL=MarkerWithPopup.d.ts.map