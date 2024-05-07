// eslint-disable-next-line import/prefer-default-export
export var isGeoJsonFlex = function isGeoJsonFlex(geoJson) {
  return (geoJson === null || geoJson === void 0 ? void 0 : geoJson.type) === "Polygon" || (geoJson === null || geoJson === void 0 ? void 0 : geoJson.type) === "GeometryCollection";
};
//# sourceMappingURL=utils.js.map