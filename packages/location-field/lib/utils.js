"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMatchingLocations = getMatchingLocations;
exports.getGeocoderErrorMessage = exports.addInParentheses = exports.getCombinedLabel = exports.generateLabel = void 0;
// A mapping of Pelias layers to display modes. The label generator will run the generator
// based on the layer of the feature. Adding a new method to this mapping will support
// more layer types with custom rendering.
const layerDisplayMap = {
  address: properties => {
    const {
      housenumber,
      locality,
      name,
      neighbourhood,
      region_a: state,
      region,
      street
    } = properties;
    return {
      // if the housenumber is available, combining that with the street can
      // avoid duplicates which might be present in the name
      main: housenumber ? `${housenumber} ${street}` : name,
      secondary: [locality, neighbourhood, state || region].filter(item => !!item).join(", ")
    };
  },
  venue: properties => {
    const {
      locality,
      name,
      neighbourhood,
      region_a: state,
      street
    } = properties;
    return {
      main: name,
      secondary: [street, neighbourhood, locality, state].filter(item => !!item).join(", ")
    };
  },
  neighbourhood: properties => {
    const {
      name,
      county,
      locality,
      region_a: state
    } = properties;
    return {
      main: name,
      secondary: [county, locality, state].filter(item => !!item).join(", ")
    };
  }
};
/**
 * Given a GeoJSON property with a layer, this method will use the layerDisplayMap
 * to generate an appropriate title subtitle pair, or return the label if the layer is
 * unknown.
 */

const generateLabel = properties => {
  const labelGenerator = layerDisplayMap[properties.layer];
  if (!labelGenerator) return {
    main: properties.label
  };
  return labelGenerator(properties);
};
/**
 * Generates a combined label from main and secondary for display in the main input field
 */


exports.generateLabel = generateLabel;

const getCombinedLabel = properties => {
  const {
    main,
    secondary
  } = generateLabel(properties);

  if (main && secondary) {
    return `${main}, ${secondary}`;
  }

  return (properties === null || properties === void 0 ? void 0 : properties.label) || "";
};
/**
 * Helper method to append text in parentheses to some other text,
 * if the added text is not null or blank.
 */


exports.getCombinedLabel = getCombinedLabel;

const addInParentheses = (intl, mainText, extraText) => {
  return extraText && extraText !== "" ? intl.formatMessage({
    id: "otpUi.LocationField.parenthesisFormat"
  }, {
    detail: extraText,
    main: mainText
  }) : mainText;
};
/**
 * Helper function to assemble a geocoder error message.
 */


exports.addInParentheses = addInParentheses;

const getGeocoderErrorMessage = (intl, errorText) => {
  const geocoderUnreachableText = intl.formatMessage({
    description: "Geocoder unreachable status",
    id: "otpUi.LocationField.geocoderUnreachable"
  });
  return addInParentheses(intl, geocoderUnreachableText, errorText);
};
/**
 * Helper to compute matching user locations as you type.
 */


exports.getGeocoderErrorMessage = getGeocoderErrorMessage;

function getMatchingLocations(places, text) {
  if ((places === null || places === void 0 ? void 0 : places.length) > 0 && text && text !== "") {
    const lowerCaseText = text.toLowerCase();
    return places.filter(place => place.displayName.toLowerCase().indexOf(lowerCaseText) !== -1);
  }

  return [];
}
//# sourceMappingURL=utils.js.map