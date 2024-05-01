// A mapping of Pelias layers to display modes. The label generator will run the generator
// based on the layer of the feature. Adding a new method to this mapping will support
// more layer types with custom rendering.
var layerDisplayMap = {
  address: function address(properties) {
    var housenumber = properties.housenumber,
        locality = properties.locality,
        name = properties.name,
        neighbourhood = properties.neighbourhood,
        state = properties.region_a,
        region = properties.region,
        street = properties.street;
    return {
      // if the housenumber is available, combining that with the street can
      // avoid duplicates which might be present in the name
      main: housenumber ? "".concat(housenumber, " ").concat(street) : name,
      secondary: [locality, neighbourhood, state || region].filter(function (item) {
        return !!item;
      }).join(", ")
    };
  },
  venue: function venue(properties) {
    var locality = properties.locality,
        name = properties.name,
        neighbourhood = properties.neighbourhood,
        state = properties.region_a,
        street = properties.street;
    return {
      main: name,
      secondary: [street, neighbourhood, locality, state].filter(function (item) {
        return !!item;
      }).join(", ")
    };
  },
  neighbourhood: function neighbourhood(properties) {
    var name = properties.name,
        county = properties.county,
        locality = properties.locality,
        state = properties.region_a;
    return {
      main: name,
      secondary: [county, locality, state].filter(function (item) {
        return !!item;
      }).join(", ")
    };
  }
};
/**
 * Given a GeoJSON property with a layer, this method will use the layerDisplayMap
 * to generate an appropriate title subtitle pair, or return the label if the layer is
 * unknown.
 */

export var generateLabel = function generateLabel(properties) {
  var labelGenerator = layerDisplayMap[properties.layer];
  if (!labelGenerator) return {
    main: properties.label
  };
  return labelGenerator(properties);
};
/**
 * Generates a combined label from main and secondary for display in the main input field
 */

export var getCombinedLabel = function getCombinedLabel(properties) {
  var _generateLabel = generateLabel(properties),
      main = _generateLabel.main,
      secondary = _generateLabel.secondary;

  if (main && secondary) {
    return "".concat(main, ", ").concat(secondary);
  }

  return (properties === null || properties === void 0 ? void 0 : properties.label) || "";
};
/**
 * Helper method to append text in parentheses to some other text,
 * if the added text is not null or blank.
 */

export var addInParentheses = function addInParentheses(intl, mainText, extraText) {
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

export var getGeocoderErrorMessage = function getGeocoderErrorMessage(intl, errorText) {
  var geocoderUnreachableText = intl.formatMessage({
    description: "Geocoder unreachable status",
    id: "otpUi.LocationField.geocoderUnreachable"
  });
  return addInParentheses(intl, geocoderUnreachableText, errorText);
};
/**
 * Helper to compute matching user locations as you type.
 */

export function getMatchingLocations(places, text) {
  if ((places === null || places === void 0 ? void 0 : places.length) > 0 && text && text !== "") {
    var lowerCaseText = text.toLowerCase();
    return places.filter(function (place) {
      return place.displayName.toLowerCase().indexOf(lowerCaseText) !== -1;
    });
  }

  return [];
}
//# sourceMappingURL=utils.js.map