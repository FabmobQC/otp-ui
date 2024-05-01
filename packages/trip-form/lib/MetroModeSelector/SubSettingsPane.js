"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SubSettingsPane;
exports.ModeSettingRenderer = exports.SubSettingsCheckbox = exports.defaultMessages = void 0;

var _flat = require("flat");

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _CheckboxSelector = _interopRequireDefault(require("../CheckboxSelector"));

var _DropdownSelector = _interopRequireDefault(require("../DropdownSelector"));

var _SliderSelector = _interopRequireDefault(require("../SliderSelector"));

var _i18n = _interopRequireWildcard(require("./i18n"));

var _enUS = _interopRequireDefault(require("../../i18n/en-US.yml"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.
const defaultMessages = (0, _flat.flatten)(_enUS.default);
exports.defaultMessages = defaultMessages;

const SubmodeGrid = _styledComponents.default.div.withConfig({
  displayName: "SubSettingsPane__SubmodeGrid",
  componentId: "sc-ug95jb-0"
})(["display:grid;grid-column:span 2;grid-template-columns:1fr 1fr;width:100%;"]);

const SettingsPanel = _styledComponents.default.fieldset.withConfig({
  displayName: "SubSettingsPane__SettingsPanel",
  componentId: "sc-ug95jb-1"
})(["border:none;pointer-events:auto;div{padding:5px 0;}.wide{grid-column:span 2;}.slim{font-size:125%;font-weight:125%;}legend{font-size:1.5em;margin-bottom:0.5rem;padding-top:15px;}"]);

const SubSettingsCheckbox = (0, _styledComponents.default)(_CheckboxSelector.default).withConfig({
  displayName: "SubSettingsPane__SubSettingsCheckbox",
  componentId: "sc-ug95jb-2"
})(["", ";display:", ";margin-left:4px;input{flex-shrink:0;}"], props => props.flexbox ? "align-items: baseline;" : "", props => props.flexbox ? "flex" : "inherit");
exports.SubSettingsCheckbox = SubSettingsCheckbox;

const FormLabelIconWrapper = _styledComponents.default.span.withConfig({
  displayName: "SubSettingsPane__FormLabelIconWrapper",
  componentId: "sc-ug95jb-3"
})(["align-items:baseline;display:flex;gap:4px;svg{width:16px;height:16px;display:inline-block;margin-bottom:4px;vertical-align:middle;overflow:hidden;}"]);
/**
 * Renders a mode setting definition
 * @param onChange function for when the value changes, and the setting to be rendered
 * @returns JSX Element to render
 */


const ModeSettingRenderer = ({
  onChange,
  setting
}) => {
  const intl = (0, _reactIntl.useIntl)();
  const {
    label,
    labelHigh,
    labelLow
  } = (0, _i18n.generateModeSettingLabels)(setting.type, setting.key, intl, setting.label);
  const labelWithIcon = "icon" in setting ? /*#__PURE__*/_react.default.createElement(FormLabelIconWrapper, null, setting.icon && /*#__PURE__*/_react.default.createElement("div", {
    role: "none"
  }, setting.icon), /*#__PURE__*/_react.default.createElement("div", null, label)) : label;

  switch (setting.type) {
    case "CHECKBOX":
    case "SUBMODE":
      return /*#__PURE__*/_react.default.createElement(SubSettingsCheckbox, {
        flexbox: setting.type === "SUBMODE",
        label: labelWithIcon,
        name: setting.key,
        onChange: onChange,
        value: setting.value
      });

    case "DROPDOWN":
      return /*#__PURE__*/_react.default.createElement(_DropdownSelector.default, {
        label: labelWithIcon,
        name: setting.key,
        onChange: onChange,
        options: setting.options.map(o => ({ ...o,
          text: intl.formatMessage({
            description: `Metro Mode Selector Setting (${setting.key}) Option Label (${o.value})`,
            id: `otpUi.ModeSelector.settings.${setting.key}-options-${o.value}`,
            defaultMessage: o.text
          })
        })),
        value: setting.value
      });

    case "SLIDER":
      return /*#__PURE__*/_react.default.createElement(_SliderSelector.default, {
        label: label,
        labelHigh: labelHigh,
        labelLow: labelLow,
        max: setting.high,
        min: setting.low,
        name: setting.key,
        onChange: onChange,
        step: setting.step,
        value: setting.value
      });

    default:
      return null;
  }
};

exports.ModeSettingRenderer = ModeSettingRenderer;

function SubSettingsPane({
  modeButton,
  onSettingUpdate
}) {
  const intl = (0, _reactIntl.useIntl)();
  const label = (0, _i18n.default)(modeButton.key, intl, modeButton.label); // Split the mode settings out based on whether they're submodes or not
  // This is so we can display submodes in a grid at the top

  const {
    settingsNoSubmodes,
    settingsOnlySubmodes
  } = modeButton.modeSettings.reduce((accumulator, cur) => {
    if (cur.type === "SUBMODE") {
      accumulator.settingsOnlySubmodes.push(cur);
    } else {
      accumulator.settingsNoSubmodes.push(cur);
    }

    return accumulator;
  }, {
    settingsNoSubmodes: [],
    settingsOnlySubmodes: []
  });
  return /*#__PURE__*/_react.default.createElement(SettingsPanel, null, /*#__PURE__*/_react.default.createElement("legend", null, /*#__PURE__*/_react.default.createElement("span", {
    id: `metro-mode-selector-${modeButton.key}-button-label`
  }, label)), /*#__PURE__*/_react.default.createElement(SubmodeGrid, null, settingsOnlySubmodes.map(setting => /*#__PURE__*/_react.default.createElement(ModeSettingRenderer, {
    key: setting.key,
    onChange: onSettingUpdate,
    setting: setting
  }))), settingsNoSubmodes.map(setting => /*#__PURE__*/_react.default.createElement(ModeSettingRenderer, {
    key: setting.key,
    onChange: onSettingUpdate,
    setting: setting
  })));
}
//# sourceMappingURL=SubSettingsPane.js.map