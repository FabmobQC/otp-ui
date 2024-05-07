/* eslint-disable import/prefer-default-export */
import { lazy } from "react";
var companyLookup = {
  biketown: /*#__PURE__*/lazy(function () {
    return import("./biketown-icon");
  }),
  lyft_pdx: /*#__PURE__*/lazy(function () {
    return import("./biketown-icon");
  }),
  bird: /*#__PURE__*/lazy(function () {
    return import("./bird-icon");
  }),
  bolt: /*#__PURE__*/lazy(function () {
    return import("./bolt-icon");
  }),
  boltEu: /*#__PURE__*/lazy(function () {
    return import("./bolt-eu-icon");
  }),
  car2go: /*#__PURE__*/lazy(function () {
    return import("./car2go-icon");
  }),
  gruv: /*#__PURE__*/lazy(function () {
    return import("./gruv-icon");
  }),
  hopr: /*#__PURE__*/lazy(function () {
    return import("./hopr-icon");
  }),
  lime: /*#__PURE__*/lazy(function () {
    return import("./lime-icon");
  }),
  lyft: /*#__PURE__*/lazy(function () {
    return import("./lime-icon");
  }),
  razor: /*#__PURE__*/lazy(function () {
    return import("./razor-icon");
  }),
  reachnow: /*#__PURE__*/lazy(function () {
    return import("./reachnow-icon");
  }),
  shared: /*#__PURE__*/lazy(function () {
    return import("./shared-icon");
  }),
  spin: /*#__PURE__*/lazy(function () {
    return import("./spin-icon");
  }),
  uber: /*#__PURE__*/lazy(function () {
    return import("./uber-icon");
  })
};

function getCompanyIcon(name) {
  var icon = companyLookup[name.toLowerCase()] ||
  /*
  Some company names are lyft_pdx instead of just Lyft. 
  This PR matches based on the first 4 characters to hopefully 
  match more company icons.
  */
  companyLookup[name.toLowerCase().slice(0, 4)];

  if (!icon) {
    console.warn("No Company Icon found for: '".concat(name, "'!"));
  }

  return icon;
}

export { getCompanyIcon };
//# sourceMappingURL=index.js.map