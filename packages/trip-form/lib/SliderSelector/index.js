"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SliderSelector;

var _react = _interopRequireWildcard(require("react"));

var S = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * A wrapper that includes an <input type="range" /> control and a <label> for the input control.
 */
function SliderSelector({
  className = null,
  max = 20,
  label = null,
  labelLow,
  labelHigh,
  min = 0,
  name = null,
  step = 1,
  onChange = null,
  value = 1,
  style
}) {
  const handleChange = (0, _react.useCallback)(evt => {
    if (typeof onChange === "function") {
      onChange({
        [name]: evt.target.value
      });
    }
  }, [onChange]);
  const id = `id-query-param-${name}`;
  return /*#__PURE__*/_react.default.createElement(S.SliderSelector, {
    "aria-label": label,
    className: className,
    role: "group",
    style: style
  }, !labelLow && !labelHigh && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(S.SettingLabel, {
    "aria-hidden": "true",
    as: "span"
  }, label)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(S.SettingLabel, {
    "aria-hidden": "true",
    as: "span"
  }, labelLow), /*#__PURE__*/_react.default.createElement("input", {
    "aria-label": `${label}: ${labelLow} (${min}) - ${labelHigh} (${max})`,
    id: id,
    max: max,
    min: min,
    onChange: handleChange,
    step: step,
    type: "range",
    value: value
  }), /*#__PURE__*/_react.default.createElement(S.SettingLabel, {
    "aria-hidden": "true",
    as: "span",
    style: {
      paddingLeft: 0
    }
  }, labelHigh)));
}
//# sourceMappingURL=index.js.map