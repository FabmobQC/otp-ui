import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { flatten } from "flat";
import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import CheckboxSelector from "../CheckboxSelector";
import DropdownSelector from "../DropdownSelector";
import SliderSelector from "../SliderSelector";
import generateModeButtonLabel, { generateModeSettingLabels } from "./i18n";
import defaultEnglishMessages from "../../i18n/en-US.yml"; // HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.

export var defaultMessages = flatten(defaultEnglishMessages);
var SubmodeGrid = styled.div.withConfig({
  displayName: "SubSettingsPane__SubmodeGrid",
  componentId: "sc-ug95jb-0"
})(["display:grid;grid-column:span 2;grid-template-columns:1fr 1fr;width:100%;"]);
var SettingsPanel = styled.fieldset.withConfig({
  displayName: "SubSettingsPane__SettingsPanel",
  componentId: "sc-ug95jb-1"
})(["border:none;pointer-events:auto;div{padding:5px 0;}.wide{grid-column:span 2;}.slim{font-size:125%;font-weight:125%;}legend{font-size:1.5em;margin-bottom:0.5rem;padding-top:15px;}"]);
export var SubSettingsCheckbox = styled(CheckboxSelector).withConfig({
  displayName: "SubSettingsPane__SubSettingsCheckbox",
  componentId: "sc-ug95jb-2"
})(["", ";display:", ";margin-left:4px;input{flex-shrink:0;}"], function (props) {
  return props.flexbox ? "align-items: baseline;" : "";
}, function (props) {
  return props.flexbox ? "flex" : "inherit";
});
var FormLabelIconWrapper = styled.span.withConfig({
  displayName: "SubSettingsPane__FormLabelIconWrapper",
  componentId: "sc-ug95jb-3"
})(["align-items:baseline;display:flex;gap:4px;svg{width:16px;height:16px;display:inline-block;margin-bottom:4px;vertical-align:middle;overflow:hidden;}"]);
/**
 * Renders a mode setting definition
 * @param onChange function for when the value changes, and the setting to be rendered
 * @returns JSX Element to render
 */

export var ModeSettingRenderer = function ModeSettingRenderer(_ref) {
  var onChange = _ref.onChange,
      setting = _ref.setting;
  var intl = useIntl();

  var _generateModeSettingL = generateModeSettingLabels(setting.type, setting.key, intl, setting.label),
      label = _generateModeSettingL.label,
      labelHigh = _generateModeSettingL.labelHigh,
      labelLow = _generateModeSettingL.labelLow;

  var labelWithIcon = "icon" in setting ? /*#__PURE__*/React.createElement(FormLabelIconWrapper, null, setting.icon && /*#__PURE__*/React.createElement("div", {
    role: "none"
  }, setting.icon), /*#__PURE__*/React.createElement("div", null, label)) : label;

  switch (setting.type) {
    case "CHECKBOX":
    case "SUBMODE":
      return /*#__PURE__*/React.createElement(SubSettingsCheckbox, {
        flexbox: setting.type === "SUBMODE",
        label: labelWithIcon,
        name: setting.key,
        onChange: onChange,
        value: setting.value
      });

    case "DROPDOWN":
      return /*#__PURE__*/React.createElement(DropdownSelector, {
        label: labelWithIcon,
        name: setting.key,
        onChange: onChange,
        options: setting.options.map(function (o) {
          return _objectSpread(_objectSpread({}, o), {}, {
            text: intl.formatMessage({
              description: "Metro Mode Selector Setting (".concat(setting.key, ") Option Label (").concat(o.value, ")"),
              id: "otpUi.ModeSelector.settings.".concat(setting.key, "-options-").concat(o.value),
              defaultMessage: o.text
            })
          });
        }),
        value: setting.value
      });

    case "SLIDER":
      return /*#__PURE__*/React.createElement(SliderSelector, {
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
export default function SubSettingsPane(_ref2) {
  var modeButton = _ref2.modeButton,
      onSettingUpdate = _ref2.onSettingUpdate;
  var intl = useIntl();
  var label = generateModeButtonLabel(modeButton.key, intl, modeButton.label); // Split the mode settings out based on whether they're submodes or not
  // This is so we can display submodes in a grid at the top

  var _modeButton$modeSetti = modeButton.modeSettings.reduce(function (accumulator, cur) {
    if (cur.type === "SUBMODE") {
      accumulator.settingsOnlySubmodes.push(cur);
    } else {
      accumulator.settingsNoSubmodes.push(cur);
    }

    return accumulator;
  }, {
    settingsNoSubmodes: [],
    settingsOnlySubmodes: []
  }),
      settingsNoSubmodes = _modeButton$modeSetti.settingsNoSubmodes,
      settingsOnlySubmodes = _modeButton$modeSetti.settingsOnlySubmodes;

  return /*#__PURE__*/React.createElement(SettingsPanel, null, /*#__PURE__*/React.createElement("legend", null, /*#__PURE__*/React.createElement("span", {
    id: "metro-mode-selector-".concat(modeButton.key, "-button-label")
  }, label)), /*#__PURE__*/React.createElement(SubmodeGrid, null, settingsOnlySubmodes.map(function (setting) {
    return /*#__PURE__*/React.createElement(ModeSettingRenderer, {
      key: setting.key,
      onChange: onSettingUpdate,
      setting: setting
    });
  })), settingsNoSubmodes.map(function (setting) {
    return /*#__PURE__*/React.createElement(ModeSettingRenderer, {
      key: setting.key,
      onChange: onSettingUpdate,
      setting: setting
    });
  }));
}
//# sourceMappingURL=SubSettingsPane.js.map