import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { useCallback } from "react";
import * as S from "../styled"; // eslint-disable-next-line prettier/prettier

/**
 * A wrapper that includes an <input type="range" /> control and a <label> for the input control.
 */
export default function SliderSelector(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? null : _ref$className,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 20 : _ref$max,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? null : _ref$label,
      labelLow = _ref.labelLow,
      labelHigh = _ref.labelHigh,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 0 : _ref$min,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? null : _ref$name,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? null : _ref$onChange,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? 1 : _ref$value,
      style = _ref.style;
  var handleChange = useCallback(function (evt) {
    if (typeof onChange === "function") {
      onChange(_defineProperty({}, name, evt.target.value));
    }
  }, [onChange]);
  var id = "id-query-param-".concat(name);
  return /*#__PURE__*/React.createElement(S.SliderSelector, {
    "aria-label": label,
    className: className,
    role: "group",
    style: style
  }, !labelLow && !labelHigh && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(S.SettingLabel, {
    "aria-hidden": "true",
    as: "span"
  }, label)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(S.SettingLabel, {
    "aria-hidden": "true",
    as: "span"
  }, labelLow), /*#__PURE__*/React.createElement("input", {
    "aria-label": "".concat(label, ": ").concat(labelLow, " (").concat(min, ") - ").concat(labelHigh, " (").concat(max, ")"),
    id: id,
    max: max,
    min: min,
    onChange: handleChange,
    step: step,
    type: "range",
    value: value
  }), /*#__PURE__*/React.createElement(S.SettingLabel, {
    "aria-hidden": "true",
    as: "span",
    style: {
      paddingLeft: 0
    }
  }, labelHigh)));
}
//# sourceMappingURL=index.js.map