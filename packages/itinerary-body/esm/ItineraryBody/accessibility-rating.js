import React from "react";
import styled from "styled-components";
import { Wheelchair } from "@styled-icons/foundation/Wheelchair";
import { useIntl } from "react-intl";
import { InvisibleAdditionalDetails } from "../styled";
var Wrapper = styled.div.withConfig({
  displayName: "accessibility-rating__Wrapper",
  componentId: "sc-7g85t2-0"
})(["align-items:center;border:", ";background-color:", ";border-radius:", ";display:flex;justify-content:space-between;margin-top:0.25em;max-width:75px;height:", ";padding:0.25em 0.6em 0.25em 0.4em;word-wrap:anywhere;"], function (props) {
  return props.border ? "1px solid #333" : "none";
}, function (props) {
  return props.color;
}, function (props) {
  return props.large ? "4px" : "20px";
}, function (props) {
  return props.large ? "40px" : "30px";
});
var StatusWrapper = styled.span.withConfig({
  displayName: "accessibility-rating__StatusWrapper",
  componentId: "sc-7g85t2-1"
})(["flex:1;span{display:block;}"]);
var TextWrapper = styled.span.withConfig({
  displayName: "accessibility-rating__TextWrapper",
  componentId: "sc-7g85t2-2"
})(["padding-top:3px;font-weight:600;"]);

/**
 * Component which renders a label with a color and icon depending on
 * a given accessibility score. The color and icon are set by a given gradation map.
 */
var AccessibilityRating = function AccessibilityRating(_ref) {
  var gradationMap = _ref.gradationMap,
      _ref$grayscale = _ref.grayscale,
      grayscale = _ref$grayscale === void 0 ? false : _ref$grayscale,
      _ref$isLeg = _ref.isLeg,
      isLeg = _ref$isLeg === void 0 ? false : _ref$isLeg,
      _ref$large = _ref.large,
      large = _ref$large === void 0 ? false : _ref$large,
      score = _ref.score;
  var intl = useIntl(); // Provide default mapping

  var mapping = gradationMap || {
    0.0: {
      color: "#ffe4e5",
      icon: "❌",
      text: intl.formatMessage({
        id: "otpUi.ItineraryBody.tripAccessibility.inaccessible"
      })
    },
    0.5: {
      color: "#dbe9ff",
      icon: "？",
      text: intl.formatMessage({
        id: "otpUi.ItineraryBody.tripAccessibility.unclear"
      })
    },
    0.9: {
      color: "#bfffb5",
      icon: "✅",
      text: intl.formatMessage({
        id: "otpUi.ItineraryBody.tripAccessibility.likelyAccessible"
      })
    }
  }; // Find the highest (including equality) key for our score.

  var mappedKey = parseFloat(Object.keys(mapping).sort() // Start at the top, so the first one that is less/equal to our score is the correct label
  .reverse().find(function (key) {
    return parseFloat(key) <= score;
  })); // External configuration may report "0.0" as 0, so include fallback

  var mapped = mapping[mappedKey] || mapping[0.0];
  var accessibilityPreface = intl.formatMessage({
    id: "otpUi.ItineraryBody.tripAccessibility.".concat(isLeg ? "legAccessibility" : "itineraryAccessibility")
  });
  var accessibilityScore = mapped.text;
  var accessibilityLabel = accessibilityPreface + accessibilityScore;
  return /*#__PURE__*/React.createElement(Wrapper, {
    border: grayscale,
    color: grayscale ? "transparent" : mapped.color,
    large: large,
    title: accessibilityLabel
  }, /*#__PURE__*/React.createElement(InvisibleAdditionalDetails, null, accessibilityLabel), /*#__PURE__*/React.createElement(Wheelchair, {
    style: {
      flex: "2",
      height: "100%",
      minWidth: "20px"
    }
  }), /*#__PURE__*/React.createElement(StatusWrapper, {
    "aria-hidden": true
  }, mapped.icon || /*#__PURE__*/React.createElement(TextWrapper, null, mapped.text)));
};

export default AccessibilityRating;
//# sourceMappingURL=accessibility-rating.js.map