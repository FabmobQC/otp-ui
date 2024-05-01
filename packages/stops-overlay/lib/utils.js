"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isGeoJsonFlex = void 0;

// eslint-disable-next-line import/prefer-default-export
const isGeoJsonFlex = geoJson => (geoJson === null || geoJson === void 0 ? void 0 : geoJson.type) === "Polygon" || (geoJson === null || geoJson === void 0 ? void 0 : geoJson.type) === "GeometryCollection";

exports.isGeoJsonFlex = isGeoJsonFlex;
//# sourceMappingURL=utils.js.map