"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AccessLegStepAction;
exports.Action = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

let Action;
exports.Action = Action;

(function (Action) {
  Action["circleClockwise"] = "CIRCLE_CLOCKWISE";
  Action["circleCounterClockwise"] = "CIRCLE_COUNTERCLOCKWISE";
  Action["continue"] = "CONTINUE";
  Action["enterStation"] = "ENTER_STATION";
  Action["exitStation"] = "EXIT_STATION";
  Action["followSigns"] = "FOLLOW_SIGNS";
  Action["hardLeft"] = "HARD_LEFT";
  Action["hardRight"] = "HARD_RIGHT";
  Action["left"] = "LEFT";
  Action["right"] = "RIGHT";
  Action["slightlyLeft"] = "SLIGHTLY_LEFT";
  Action["slightlyRight"] = "SLIGHTLY_RIGHT";
  Action["uTurnLeft"] = "UTURN_LEFT";
  Action["uTurnRight"] = "UTURN_RIGHT";
})(Action || (exports.Action = Action = {}));

/**
 * Helper component that display localized strings for the given action string.
 */
function AccessLegStepAction({
  action
}) {
  // Note that we don't make use of dynamic message ids,
  // so that formatjs CLI tools can pick the strings up for analysis.
  switch (action) {
    case Action.circleClockwise:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: action,
        description: "Step action circle clockwise",
        id: "otpUi.AccessLegBody.step.circleClockwise"
      });

    case Action.circleCounterClockwise:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: action,
        description: "Step action circle counter-clockwise",
        id: "otpUi.AccessLegBody.step.circleCounterClockwise"
      });

    case Action.continue:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: action,
        description: "Step action continue",
        id: "otpUi.AccessLegBody.step.continue"
      });

    case Action.hardLeft:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: action,
        description: "Step action hard left",
        id: "otpUi.AccessLegBody.step.hardLeft"
      });

    case Action.hardRight:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: action,
        description: "Step action hard right",
        id: "otpUi.AccessLegBody.step.hardRight"
      });

    case Action.left:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: action,
        description: "Step action left",
        id: "otpUi.AccessLegBody.step.left"
      });

    case Action.right:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: action,
        description: "Step action right",
        id: "otpUi.AccessLegBody.step.right"
      });

    case Action.slightlyLeft:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: action,
        description: "Step action slightly left",
        id: "otpUi.AccessLegBody.step.slightlyLeft"
      });

    case Action.slightlyRight:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: action,
        description: "Step action slightly right",
        id: "otpUi.AccessLegBody.step.slightlyRight"
      });

    case Action.uTurnLeft:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: action,
        description: "Step action u-turn left",
        id: "otpUi.AccessLegBody.step.uTurnLeft"
      });

    case Action.uTurnRight:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: action,
        description: "Step action u-turn right",
        id: "otpUi.AccessLegBody.step.uTurnRight"
      });

    case Action.enterStation:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: action,
        description: "Step action enter station",
        id: "otpUi.AccessLegBody.step.enterStation"
      });

    case Action.exitStation:
      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: action,
        description: "Step action exit station",
        id: "otpUi.AccessLegBody.step.exitStation"
      });

    default:
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  }
}
//# sourceMappingURL=access-leg-step-action.js.map