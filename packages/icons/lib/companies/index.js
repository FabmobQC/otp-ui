"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompanyIcon = getCompanyIcon;

var _react = require("react");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const companyLookup = {
  biketown: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./biketown-icon")))),
  lyft_pdx: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./biketown-icon")))),
  bird: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./bird-icon")))),
  bolt: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./bolt-icon")))),
  boltEu: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./bolt-eu-icon")))),
  car2go: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./car2go-icon")))),
  gruv: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./gruv-icon")))),
  hopr: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./hopr-icon")))),
  lime: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./lime-icon")))),
  lyft: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./lime-icon")))),
  razor: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./razor-icon")))),
  reachnow: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./reachnow-icon")))),
  shared: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./shared-icon")))),
  spin: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./spin-icon")))),
  uber: /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require("./uber-icon"))))
};

function getCompanyIcon(name) {
  const icon = companyLookup[name.toLowerCase()] ||
  /*
  Some company names are lyft_pdx instead of just Lyft. 
  This PR matches based on the first 4 characters to hopefully 
  match more company icons.
  */
  companyLookup[name.toLowerCase().slice(0, 4)];

  if (!icon) {
    console.warn(`No Company Icon found for: '${name}'!`);
  }

  return icon;
}
//# sourceMappingURL=index.js.map