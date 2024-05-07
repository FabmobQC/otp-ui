// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for the icons package.
import { DirectionIcon } from "@opentripplanner/icons";
import React from "react";
import * as S from "../styled";
import MapillaryButton from "./mapillary-button";
import AccessLegStep from "../defaults/access-leg-step";

/**
 * Renders a turn-by-turn step of an access leg.
 */
export default function AccessLegSteps(_ref) {
  var steps = _ref.steps,
      mapillaryCallback = _ref.mapillaryCallback,
      mapillaryKey = _ref.mapillaryKey;
  return /*#__PURE__*/React.createElement(S.Steps, null, steps.map(function (step, k) {
    var lat = step.lat,
        lon = step.lon,
        relativeDirection = step.relativeDirection;
    return /*#__PURE__*/React.createElement(S.StepRow, {
      key: k
    }, /*#__PURE__*/React.createElement(S.StepIconContainer, null, /*#__PURE__*/React.createElement(DirectionIcon, {
      relativeDirection: relativeDirection
    })), /*#__PURE__*/React.createElement(S.StepDescriptionContainer, null, /*#__PURE__*/React.createElement(AccessLegStep, {
      step: step
    }), /*#__PURE__*/React.createElement(MapillaryButton, {
      clickCallback: mapillaryCallback,
      coords: {
        lat: lat,
        lon: lon
      },
      mapillaryKey: mapillaryKey
    })));
  }));
}
//# sourceMappingURL=access-leg-steps.js.map