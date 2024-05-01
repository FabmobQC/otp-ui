/// <reference types="react" />
import { LayerEntity, SymbolComponent, ZoomBasedSymbol } from "@opentripplanner/types";
declare type Props = {
    /**
     * A list of objects (entities) to be rendered on the map.
     * Entities must have an id attribute and contain coordinates information for correct placement.
     */
    entities: LayerEntity[];
    /**
     * A list of symbols that represent the entities at the associated zoom level.
     * The symbols must be able to obtain the position of the specified entities.
     * (The list does not need to be sorted.)
     */
    symbols: ZoomBasedSymbol[];
    /**
     * An optional function(Component) to transforms components defined in the symbols prop prior to rendering,
     * in cases you need to wrap symbols or inject children.
     * The function must return a component that accepts these props: ({ entity, zoom }).
     * In addition, to inject children, the returned component must explicitly render any applicable children passed to it.
     */
    symbolTransform?: (symbol: SymbolComponent) => SymbolComponent;
    /**
     * The current zoom level for rendering.
     */
    zoom: number;
};
/**
 * A component that renders different components based on zoom level.
 */
declare const ZoomBasedMarkers: ({ entities, symbols, symbolTransform, zoom }: Props) => JSX.Element;
export default ZoomBasedMarkers;
//# sourceMappingURL=index.d.ts.map