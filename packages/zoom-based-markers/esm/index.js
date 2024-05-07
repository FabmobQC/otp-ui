import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import cloneDeep from "lodash.clonedeep";
import React, { useMemo } from "react";

/**
 * Transforms the symbol and symbols by type from the specified symbolEntry
 * using the specified symbolTransform.
 * TODO: Should this be memoized?
 */
var getTransformedSymbol = function getTransformedSymbol(symbolEntry, symbolTransform) {
  // If no transform function provided, just return symbolEntry.
  if (typeof symbolTransform !== "function") {
    return symbolEntry;
  }

  var symbolByType = symbolEntry.symbolByType;
  var newEntry = cloneDeep(symbolEntry);

  if (symbolByType) {
    // Transform entries in symbolByType.
    Object.entries(symbolByType).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          originalSymbol = _ref2[1];

      newEntry.symbolByType[key] = symbolTransform(originalSymbol);
    });
  } // Transform the main (default) symbol.


  newEntry.symbol = symbolTransform(symbolEntry.symbol);
  return newEntry;
};
/**
 * Finds the deepest symbol (the symbol associated with the highest minZoom)
 * for the specified symbols and zoom level.
 */


var getSymbolEntry = function getSymbolEntry(symbols, zoom) {
  return symbols === null || symbols === void 0 ? void 0 : symbols.reduce(function (bestMarker, marker) {
    if (zoom >= marker.minZoom) {
      if (!bestMarker || marker.minZoom > bestMarker.minZoom) {
        return marker;
      }
    }

    return bestMarker;
  }, null);
};

/**
 * A component that renders different components based on zoom level.
 */
var ZoomBasedMarkers = function ZoomBasedMarkers(_ref3) {
  var entities = _ref3.entities,
      symbols = _ref3.symbols,
      symbolTransform = _ref3.symbolTransform,
      zoom = _ref3.zoom;
  if (!entities || !entities.length) return null; // Find the deepest symbol for the current zoom level.

  var symbolEntry = getSymbolEntry(symbols, zoom); // With that symbol entry, transform its symbols (if a symbolTransform prop is provided),
  // and use the transformed symbols to render the entities.

  var renderedMarkers = null;

  if (symbolEntry) {
    var transformedEntry = getTransformedSymbol(symbolEntry, symbolTransform);
    var getType = transformedEntry.getType,
        DefaultSymbol = transformedEntry.symbol,
        symbolByType = transformedEntry.symbolByType; // Note that the result of the transformed symbols can be null (even for DefaultSymbol),
    // hence the null checks before the return statements below.

    renderedMarkers = useMemo(function () {
      return entities.map(function (entity) {
        var EntitySymbol = getType && symbolByType[getType(entity)] || DefaultSymbol;
        return EntitySymbol && /*#__PURE__*/React.createElement(EntitySymbol, {
          entity: entity,
          key: entity.id,
          zoom: Math.floor(zoom)
        });
      });
    }, [entities, zoom]);
  }

  return renderedMarkers;
};

export default ZoomBasedMarkers;
//# sourceMappingURL=index.js.map