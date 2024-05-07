"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _QuestionCircle = require("@styled-icons/fa-solid/QuestionCircle");

var _TimesCircle = require("@styled-icons/fa-solid/TimesCircle");

var _reactAnimateHeight = _interopRequireDefault(require("react-animate-height"));

var _reactIntl = require("react-intl");

var S = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// TODO: Remove these two helper methods by moving to semantically correct HTML

/**
 * Copied from https://stackoverflow.com/questions/50940640/how-to-determine-if-jest-is-running-the-code-or-not
 */
function isRunningJest() {
  return process.env.JEST_WORKER_ID !== undefined;
}

function uuidv4() {
  if (isRunningJest()) return "mocked-random-id";
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    const r = Math.random() * 16 | 0; // eslint-disable-next-line no-bitwise

    const v = c === "x" ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

const TripDetail = ({
  icon,
  summary,
  description
}) => {
  const intl = (0, _reactIntl.useIntl)();
  const [expanded, setExpanded] = (0, _react.useState)(false);
  const id = uuidv4();

  const toggle = () => {
    setExpanded(!expanded);
  };

  return /*#__PURE__*/_react.default.createElement(S.TripDetail, {
    role: "group"
  }, /*#__PURE__*/_react.default.createElement(S.TripDetailIcon, {
    role: "presentation"
  }, icon), /*#__PURE__*/_react.default.createElement(S.TripDetailSummary, null, summary, description && /*#__PURE__*/_react.default.createElement(S.ExpandButton, {
    "aria-label": expanded ? intl.formatMessage({
      id: "otpUi.TripDetails.hideDetail"
    }) : intl.formatMessage({
      id: "otpUi.TripDetails.showDetail"
    }),
    "aria-controls": id,
    "aria-expanded": expanded,
    id: "expand-button",
    onClick: toggle,
    tabIndex: 0
  }, /*#__PURE__*/_react.default.createElement(_QuestionCircle.QuestionCircle, {
    size: "0.92em"
  }))), /*#__PURE__*/_react.default.createElement(_reactAnimateHeight.default, {
    duration: 300,
    height: expanded ? "auto" : 0
  }, /*#__PURE__*/_react.default.createElement(S.TripDetailDescription, {
    "aria-labelledby": "expand-button",
    id: id
  }, /*#__PURE__*/_react.default.createElement(S.HideButton, {
    role: "presentation",
    onClick: () => setExpanded(false)
  }, /*#__PURE__*/_react.default.createElement(_TimesCircle.TimesCircle, {
    size: "0.92em"
  })), description)));
};

var _default = TripDetail;
exports.default = _default;
//# sourceMappingURL=trip-detail.js.map