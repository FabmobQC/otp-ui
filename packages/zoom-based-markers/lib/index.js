"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Transforms the symbol and symbols by type from the specified symbolEntry
 * using the specified symbolTransform.
 * TODO: Should this be memoized?
 */
const getTransformedSymbol = (symbolEntry, symbolTransform) => {
  // If no transform function provided, just return symbolEntry.
  if (typeof symbolTransform !== "function") {
    return symbolEntry;
  }

  const {
    symbolByType
  } = symbolEntry;
  const newEntry = (0, _lodash.default)(symbolEntry);

  if (symbolByType) {
    // Transform entries in symbolByType.
    Object.entries(symbolByType).forEach(([key, originalSymbol]) => {
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


const getSymbolEntry = (symbols, zoom) => symbols === null || symbols === void 0 ? void 0 : symbols.reduce((bestMarker, marker) => {
  if (zoom >= marker.minZoom) {
    if (!bestMarker || marker.minZoom > bestMarker.minZoom) {
      return marker;
    }
  }

  return bestMarker;
}, null);

/**
 * A component that renders different components based on zoom level.
 */
const ZoomBasedMarkers = ({
  entities,
  symbols,
  symbolTransform,
  zoom
}) => {
  if (!entities || !entities.length) return null; // Find the deepest symbol for the current zoom level.

  const symbolEntry = getSymbolEntry(symbols, zoom); // With that symbol entry, transform its symbols (if a symbolTransform prop is provided),
  // and use the transformed symbols to render the entities.

  let renderedMarkers = null;

  if (symbolEntry) {
    const transformedEntry = getTransformedSymbol(symbolEntry, symbolTransform);
    const {
      getType,
      symbol: DefaultSymbol,
      symbolByType
    } = transformedEntry; // Note that the result of the transformed symbols can be null (even for DefaultSymbol),
    // hence the null checks before the return statements below.

    renderedMarkers = (0, _react.useMemo)(() => entities.map(entity => {
      const EntitySymbol = getType && symbolByType[getType(entity)] || DefaultSymbol;
      return EntitySymbol && /*#__PURE__*/_react.default.createElement(EntitySymbol, {
        entity: entity,
        key: entity.id,
        zoom: Math.floor(zoom)
      });
    }), [entities, zoom]);
  }

  return renderedMarkers;
};

var _default = ZoomBasedMarkers;
exports.default = _default;
//# sourceMappingURL=index.js.map