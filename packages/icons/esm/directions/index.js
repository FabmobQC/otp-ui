import React from "react";
import CircleClockwise from "./CircleClockwise";
import CircleCounterclockwise from "./CircleCounterclockwise";
import Elevator from "./Elevator";
import HardLeft from "./HardLeft";
import HardRight from "./HardRight";
import Left from "./Left";
import Right from "./Right";
import SlightLeft from "./SlightLeft";
import SlightRight from "./SlightRight";
import Straight from "./Straight";
import UTurnLeft from "./UTurnLeft";
import UTurnRight from "./UTurnRight";
/**
 * Renders the appropriate direction icon given the OTP relative turn direction
 */

function DirectionIcon(_ref) {
  var relativeDirection = _ref.relativeDirection;
  if (!relativeDirection) return null;

  switch (relativeDirection.toUpperCase()) {
    case "DEPART":
    case "CONTINUE":
      return /*#__PURE__*/React.createElement(Straight, null);

    case "LEFT":
      return /*#__PURE__*/React.createElement(Left, null);

    case "RIGHT":
      return /*#__PURE__*/React.createElement(Right, null);

    case "SLIGHTLY_LEFT":
      return /*#__PURE__*/React.createElement(SlightLeft, null);

    case "SLIGHTLY_RIGHT":
      return /*#__PURE__*/React.createElement(SlightRight, null);

    case "HARD_LEFT":
      return /*#__PURE__*/React.createElement(HardLeft, null);

    case "HARD_RIGHT":
      return /*#__PURE__*/React.createElement(HardRight, null);

    case "UTURN_LEFT":
      return /*#__PURE__*/React.createElement(UTurnLeft, null);

    case "UTURN_RIGHT":
      return /*#__PURE__*/React.createElement(UTurnRight, null);

    case "CIRCLE_CLOCKWISE":
      return /*#__PURE__*/React.createElement(CircleClockwise, null);

    case "CIRCLE_COUNTERCLOCKWISE":
      return /*#__PURE__*/React.createElement(CircleCounterclockwise, null);

    case "ELEVATOR":
      return /*#__PURE__*/React.createElement(Elevator, null);

    case "FOLLOW_SIGNS":
      // TODO: Better/custom icon?
      return /*#__PURE__*/React.createElement(Straight, null);

    case "ENTER_STATION":
    case "EXIT_STATION":
      // TODO: Better/custom icon?
      return /*#__PURE__*/React.createElement(Straight, null);

    default:
      return null;
  }
}

export { CircleClockwise, CircleCounterclockwise, DirectionIcon, Elevator, HardLeft, HardRight, Left, Right, SlightLeft, SlightRight, Straight, UTurnLeft, UTurnRight };
//# sourceMappingURL=index.js.map