/// <reference types="react" />
/**
 * Adds a box shadow and tweaks border radius to make popups easier to read.
 */
export declare const Popup: import("styled-components").StyledComponent<import("react").MemoExoticComponent<(props: import("react-map-gl").PopupProps) => any>, any, {}, never>;
export declare const MapOverlayPopup: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const PopupRow: import("styled-components").StyledComponent<"p", any, {}, never>;
export declare const PopupTitle: import("styled-components").StyledComponent<"header", any, {}, never>;
declare type LeafletStyleMarkerProps = {
    color?: string;
    size?: number;
    stroke?: number;
    strokeColor?: string;
};
/**
 * @deprecated this marker was created to make the transition from Leaflet more manageable,
 * but in most cases this marker should not be used -- use a MapLibreGL Circle instead
 *
 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
 */
export declare const LeafletStyleMarker: import("styled-components").StyledComponent<"div", any, LeafletStyleMarkerProps, never>;
export declare const LayerSelector: import("styled-components").StyledComponent<"aside", any, {}, never>;
/**
 * Map container for use with storybook across various packages in this repo.
 */
export declare const StoryMapContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
export {};
//# sourceMappingURL=styled.d.ts.map