"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AccessLegSteps;

var _icons = require("@opentripplanner/icons");

var _react = _interopRequireDefault(require("react"));

var S = _interopRequireWildcard(require("../styled"));

var _mapillaryButton = _interopRequireDefault(require("./mapillary-button"));

var _accessLegStep = _interopRequireDefault(require("../defaults/access-leg-step"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for the icons package.

/**
 * Renders a turn-by-turn step of an access leg.
 */
function AccessLegSteps({
  steps,
  mapillaryCallback,
  mapillaryKey
}) {
  return /*#__PURE__*/_react.default.createElement(S.Steps, null, steps.map((step, k) => {
    const {
      lat,
      lon,
      relativeDirection
    } = step;
    return /*#__PURE__*/_react.default.createElement(S.StepRow, {
      key: k
    }, /*#__PURE__*/_react.default.createElement(S.StepIconContainer, null, /*#__PURE__*/_react.default.createElement(_icons.DirectionIcon, {
      relativeDirection: relativeDirection
    })), /*#__PURE__*/_react.default.createElement(S.StepDescriptionContainer, null, /*#__PURE__*/_react.default.createElement(_accessLegStep.default, {
      step: step
    }), /*#__PURE__*/_react.default.createElement(_mapillaryButton.default, {
      clickCallback: mapillaryCallback,
      coords: {
        lat,
        lon
      },
      mapillaryKey: mapillaryKey
    })));
  }));
}
//# sourceMappingURL=access-leg-steps.js.map