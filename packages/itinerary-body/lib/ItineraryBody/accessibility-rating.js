"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Wheelchair = require("@styled-icons/foundation/Wheelchair");

var _reactIntl = require("react-intl");

var _styled = require("../styled");

const Wrapper = _styledComponents.default.div.withConfig({
  displayName: "accessibility-rating__Wrapper",
  componentId: "sc-7g85t2-0"
})(["align-items:center;border:", ";background-color:", ";border-radius:", ";display:flex;justify-content:space-between;margin-top:0.25em;max-width:75px;height:", ";padding:0.25em 0.6em 0.25em 0.4em;word-wrap:anywhere;"], props => props.border ? "1px solid #333" : "none", props => props.color, props => props.large ? "4px" : "20px", props => props.large ? "40px" : "30px");

const StatusWrapper = _styledComponents.default.span.withConfig({
  displayName: "accessibility-rating__StatusWrapper",
  componentId: "sc-7g85t2-1"
})(["flex:1;span{display:block;}"]);

const TextWrapper = _styledComponents.default.span.withConfig({
  displayName: "accessibility-rating__TextWrapper",
  componentId: "sc-7g85t2-2"
})(["padding-top:3px;font-weight:600;"]);

/**
 * Component which renders a label with a color and icon depending on
 * a given accessibility score. The color and icon are set by a given gradation map.
 */
const AccessibilityRating = ({
  gradationMap,
  grayscale = false,
  isLeg = false,
  large = false,
  score
}) => {
  const intl = (0, _reactIntl.useIntl)(); // Provide default mapping

  const mapping = gradationMap || {
    0.0: {
      color: "#ffe4e5",
      icon: "❌",
      text: intl.formatMessage({
        id: `otpUi.ItineraryBody.tripAccessibility.inaccessible`
      })
    },
    0.5: {
      color: "#dbe9ff",
      icon: "？",
      text: intl.formatMessage({
        id: `otpUi.ItineraryBody.tripAccessibility.unclear`
      })
    },
    0.9: {
      color: "#bfffb5",
      icon: "✅",
      text: intl.formatMessage({
        id: `otpUi.ItineraryBody.tripAccessibility.likelyAccessible`
      })
    }
  }; // Find the highest (including equality) key for our score.

  const mappedKey = parseFloat(Object.keys(mapping).sort() // Start at the top, so the first one that is less/equal to our score is the correct label
  .reverse().find(key => parseFloat(key) <= score)); // External configuration may report "0.0" as 0, so include fallback

  const mapped = mapping[mappedKey] || mapping[0.0];
  const accessibilityPreface = intl.formatMessage({
    id: `otpUi.ItineraryBody.tripAccessibility.${isLeg ? "legAccessibility" : "itineraryAccessibility"}`
  });
  const accessibilityScore = mapped.text;
  const accessibilityLabel = accessibilityPreface + accessibilityScore;
  return /*#__PURE__*/_react.default.createElement(Wrapper, {
    border: grayscale,
    color: grayscale ? "transparent" : mapped.color,
    large: large,
    title: accessibilityLabel
  }, /*#__PURE__*/_react.default.createElement(_styled.InvisibleAdditionalDetails, null, accessibilityLabel), /*#__PURE__*/_react.default.createElement(_Wheelchair.Wheelchair, {
    style: {
      flex: "2",
      height: "100%",
      minWidth: "20px"
    }
  }), /*#__PURE__*/_react.default.createElement(StatusWrapper, {
    "aria-hidden": true
  }, mapped.icon || /*#__PURE__*/_react.default.createElement(TextWrapper, null, mapped.text)));
};

var _default = AccessibilityRating;
exports.default = _default;
//# sourceMappingURL=accessibility-rating.js.map