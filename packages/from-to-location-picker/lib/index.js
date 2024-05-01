"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Styled = exports.default = void 0;

var _flat = _interopRequireDefault(require("flat"));

var _locationIcon = _interopRequireDefault(require("@opentripplanner/location-icon"));

var _reactIntl = require("react-intl");

var _react = _interopRequireDefault(require("react"));

var S = _interopRequireWildcard(require("./styled"));

exports.Styled = S;

var _enUS = _interopRequireDefault(require("../i18n/en-US.yml"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Load the default messages.
const iconSize = "0.9em"; // HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.

const defaultMessages = (0, _flat.default)(_enUS.default);

const FromToLocationPicker = ({
  label = null,
  location = null,
  onFromClick = null,
  onToClick = null,
  setLocation = null,
  showIcons = true
}) => {
  const handleFromClick = () => {
    if (onFromClick) {
      onFromClick();
      return;
    }

    setLocation({
      location,
      locationType: "from",
      reverseGeocode: false
    });
  };

  const handleToClick = () => {
    if (onToClick) {
      onToClick();
      return;
    }

    setLocation({
      location,
      locationType: "to",
      reverseGeocode: false
    });
  };

  const labelIfAny = label === true ? /*#__PURE__*/_react.default.createElement("strong", null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.FromToLocationPicker.planATrip"],
    description: "Label to prompt the user to plan a trip",
    id: "otpUi.FromToLocationPicker.planATrip"
  })) : label;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, labelIfAny, /*#__PURE__*/_react.default.createElement(S.FromToPickerSpan, null, /*#__PURE__*/_react.default.createElement(S.LocationPickerSpan, null, showIcons && /*#__PURE__*/_react.default.createElement(_locationIcon.default, {
    type: "from",
    size: iconSize
  }), /*#__PURE__*/_react.default.createElement(S.Button, {
    onClick: handleFromClick
  }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.FromToLocationPicker.from"],
    description: "Text for the 'from' button of the picker",
    id: "otpUi.FromToLocationPicker.from"
  }))), /*#__PURE__*/_react.default.createElement(S.LocationPickerSpan, null, showIcons && /*#__PURE__*/_react.default.createElement(_locationIcon.default, {
    type: "to",
    size: iconSize
  }), /*#__PURE__*/_react.default.createElement(S.Button, {
    onClick: handleToClick
  }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.FromToLocationPicker.to"],
    description: "Text for the 'to' button of the picker",
    id: "otpUi.FromToLocationPicker.to"
  })))));
};

var _default = FromToLocationPicker; // Rename styled components for export.

exports.default = _default;
//# sourceMappingURL=index.js.map