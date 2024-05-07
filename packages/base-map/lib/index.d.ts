import React from "react";
import { MapProps } from "react-map-gl";
import { Event } from "maplibre-gl";
import * as Styled from "./styled";
import * as util from "./util";
import MarkerWithPopup from "./MarkerWithPopup";
/**
 * The BaseMap component renders a MapLibre map
 * as well as markers that are declared as child elements of the BaseMap element.
 *
 * As BaseMap wraps a react-map-gl Map component, any control which can be added as a child of a react-map-gl map is supported.
 * See https://visgl.github.io/react-map-gl/docs/api-reference/map to see which react-map-gl
 * children are shipped by default. Others are also supported.
 *
 * Overlays are groups of similar MapLibre markers, e.g. vehicle location
 * markers, bus stop markers, etc.
 *
 * Overlays are automatically added to the overlay control displayed by the
 * BaseMap. The user uses that control to turn overlays on or off. Only overlays
 * with an id are added to the control.
 */
declare type Props = React.ComponentPropsWithoutRef<React.ElementType> & {
    /** A URL, or list of URLs pointing to the vector tile specification which should be used as the main map.  */
    baseLayer?: string | string[];
    /** A list of names to match onto the base layers. Used only if there are multiple entries defined for `BaseLayer` */
    baseLayerNames?: string[];
    /** A [lat, lon] position to center the map at. */
    center?: [number, number];
    /** A unique identifier for the map (useful when using MapProvider) */
    id?: string;
    /** An object of props which should be passed down to MapLibre */
    mapLibreProps?: MapProps;
    /** The maximum zoom level the map should allow */
    maxZoom?: number;
    /** A callback method which is fired when the map is clicked with the left mouse button/tapped */
    onClick?: (evt: Event) => void;
    /** A callback method which is fired when the map is clicked with the right mouse button/long tapped */
    onContextMenu?: (e: unknown) => void;
    /** A callback method which is fired when the map zoom or map bounds change */
    onViewportChanged?: (e: State) => void;
    /** An initial zoom value for the map */
    zoom?: number;
};
declare type State = {
    latitude: number;
    longitude: number;
    zoom: number;
};
declare const BaseMap: ({ baseLayer, baseLayerNames, center, children, id, mapLibreProps, maxZoom, onClick, onContextMenu, onViewportChanged, style, zoom: initZoom }: Props) => JSX.Element;
export default BaseMap;
declare type LayerProps = React.ComponentPropsWithoutRef<React.ElementType> & {
    id: string;
    name?: string;
    visible?: boolean;
};
declare const LayerWrapper: (props: LayerProps) => JSX.Element;
export declare const Popup: import("styled-components").StyledComponent<React.MemoExoticComponent<(props: import("react-map-gl").PopupProps) => any>, any, {}, never>;
export { LayerWrapper, MarkerWithPopup, Styled, util };
//# sourceMappingURL=index.d.ts.map