"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AccessLegStep;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _humanizeDistance = require("@opentripplanner/humanize-distance");

var _util = require("../util");

var S = _interopRequireWildcard(require("../styled"));

var _accessLegStepAction = _interopRequireDefault(require("./access-leg-step-action"));

var _accessLegStepHeading = _interopRequireDefault(require("./access-leg-step-heading"));

var _streetName = _interopRequireDefault(require("./street-name"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable no-case-declarations */

/**
 * Renders a step of an access leg.
 */
function AccessLegStep({
  className,
  step,
  style
}) {
  const {
    absoluteDirection,
    relativeDirection,
    streetName
  } = step;
  const intl = (0, _reactIntl.useIntl)();

  const street = /*#__PURE__*/_react.default.createElement(S.StepStreetName, null, /*#__PURE__*/_react.default.createElement(_streetName.default, {
    rawStreetName: streetName
  }));

  let stepContent;
  const action = relativeDirection;

  switch (relativeDirection) {
    case "ELEVATOR":
      stepContent = /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.stepElevator"],
        description: "Text for taking an elevator",
        id: "otpUi.AccessLegBody.stepElevator",
        values: {
          street
        }
      });
      break;

    case "DEPART":
      const heading = absoluteDirection;
      stepContent = /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.stepDepart"],
        description: "Describes the initial action to take for an itinerary",
        id: "otpUi.AccessLegBody.stepDepart",
        values: {
          heading: /*#__PURE__*/_react.default.createElement(_accessLegStepHeading.default, {
            heading: heading
          }),
          street
        }
      });
      break;

    case "ENTER_STATION":
    case "EXIT_STATION":
      stepContent = /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.stepStation"],
        description: "Describes an action to progress through an itinerary",
        id: "otpUi.AccessLegBody.stepStation",
        values: {
          step: /*#__PURE__*/_react.default.createElement(_accessLegStepAction.default, {
            action: action
          }),
          street
        }
      });
      break;

    case "FOLLOW_SIGNS":
      stepContent = /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.stepFollowSigns"],
        description: "Describes an action to progress through an itinerary",
        id: "otpUi.AccessLegBody.stepFollowSigns",
        values: {
          street
        }
      });
      break;

    default:
      stepContent = /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.stepGeneric"],
        description: "Describes an action to progress through an itinerary",
        id: "otpUi.AccessLegBody.stepGeneric",
        values: {
          step: /*#__PURE__*/_react.default.createElement(_accessLegStepAction.default, {
            action: action
          }),
          street
        }
      });
  }

  return (
    /*#__PURE__*/
    // Return an HTML element which is passed a className (and style props)
    // for styled-components support.
    _react.default.createElement("span", {
      className: className,
      style: style
    }, stepContent, (step === null || step === void 0 ? void 0 : step.distance) > 0 && /*#__PURE__*/_react.default.createElement(S.StepLength, null, (0, _humanizeDistance.humanizeDistanceString)(step.distance, false, intl)))
  );
}
//# sourceMappingURL=access-leg-step.js.map