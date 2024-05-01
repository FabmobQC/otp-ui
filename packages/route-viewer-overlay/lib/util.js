"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectExistsAndPopulated = void 0;

/**
 * Method to test if an object not only exists but contains entries
 */
// eslint-disable-next-line import/prefer-default-export
const objectExistsAndPopulated = o => {
  return !!o && Object.keys(o).length > 0;
};

exports.objectExistsAndPopulated = objectExistsAndPopulated;
//# sourceMappingURL=util.js.map