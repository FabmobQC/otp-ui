"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Styled = exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _geocoder = _interopRequireDefault(require("@opentripplanner/geocoder"));

var _locationIcon = _interopRequireDefault(require("@opentripplanner/location-icon"));

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _Ban = require("@styled-icons/fa-solid/Ban");

var _Bus = require("@styled-icons/fa-solid/Bus");

var _ExclamationCircle = require("@styled-icons/fa-solid/ExclamationCircle");

var _LocationArrow = require("@styled-icons/fa-solid/LocationArrow");

var _Search = require("@styled-icons/fa-solid/Search");

var _Times = require("@styled-icons/fa-solid/Times");

var _throttleDebounce = require("throttle-debounce");

var _options = require("./options");

var S = _interopRequireWildcard(require("./styled"));

exports.Styled = S;

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-use-before-define */
// @ts-ignore Not Typescripted Yet
const optionIdPrefix = "otpui-locf-option";
/**
 * Formats the option id based on its given index position.
 * This assumes only one location dropdown is shown at a time.
 */

function getOptionId(index) {
  return `${optionIdPrefix}-${index}`;
} // FIXME have a better key generator for options


let optionKey = 0;

function DefaultLocationIcon({
  locationType
}) {
  return /*#__PURE__*/_react.default.createElement(_locationIcon.default, {
    size: _options.ICON_SIZE,
    type: locationType
  });
}
/**
 * Helper function that includes or excludes features based om layers.
 */


function filter(list, layers, include, limit) {
  return list.filter(feature => layers.includes(feature.properties.layer) === include).slice(0, limit);
}
/**
 * Puts the given geocoded features into several categories with upper bounds.
 */


function getFeaturesByCategoryWithLimit(geocodedFeatures, suggestionCount, sortByDistance, preferredLayers) {
  // Split features into those we want to always show above others
  const {
    special,
    normal
  } = geocodedFeatures.reduce((prev, cur) => {
    var _cur$properties;

    prev[preferredLayers.includes(cur === null || cur === void 0 ? void 0 : (_cur$properties = cur.properties) === null || _cur$properties === void 0 ? void 0 : _cur$properties.layer) ? "special" : "normal"].push(cur);
    return prev;
  }, {
    special: [],
    normal: []
  });
  const sortedGeocodedFeatures = [...special, ...normal.sort((a, b) => {
    var _b$properties, _a$properties;

    if (!sortByDistance) return 0;
    return (((_b$properties = b.properties) === null || _b$properties === void 0 ? void 0 : _b$properties.distance) || Infinity) - (((_a$properties = a.properties) === null || _a$properties === void 0 ? void 0 : _a$properties.distance) || Infinity);
  })]; // Split out different types of transit results
  // To keep the list tidy, only include a subset of the responses for each category

  const stopFeatures = filter(sortedGeocodedFeatures, ["stops"], true, suggestionCount);
  const stationFeatures = filter(sortedGeocodedFeatures, ["stations"], true, suggestionCount);
  const otherFeatures = filter(sortedGeocodedFeatures, ["stops", "stations"], false, suggestionCount);
  return {
    otherFeatures,
    stationFeatures,
    stopFeatures
  };
}
/**
 * Helper to render and register a user-saved location.
 */


function makeUserOption(userLocation, index, key, activeIndex, selectHandlers) {
  const {
    displayName,
    icon,
    locationSelected
  } = userLocation; // Add to the selection handler lookup (for use in onKeyDown)

  selectHandlers[index] = locationSelected;
  return /*#__PURE__*/_react.default.createElement(_options.Option, {
    icon: icon,
    id: getOptionId(index),
    isActive: index === activeIndex,
    key: key,
    onClick: locationSelected,
    title: displayName
  });
}

const LocationField = ({
  addLocationSearch = () => {},
  autoFocus = false,
  className = null,
  clearButtonIcon = /*#__PURE__*/_react.default.createElement(_Times.Times, {
    size: _options.ICON_SIZE
  }),
  clearLocation = () => {},
  currentPosition = null,
  currentPositionIcon = /*#__PURE__*/_react.default.createElement(_LocationArrow.LocationArrow, {
    size: _options.ICON_SIZE
  }),
  currentPositionUnavailableIcon = /*#__PURE__*/_react.default.createElement(_Ban.Ban, {
    size: _options.ICON_SIZE
  }),
  findNearbyStops = () => {},
  GeocodedOptionIconComponent = _options.GeocodedOptionIcon,
  geocoderConfig,
  getCurrentPosition,
  hideExistingValue = false,
  initialSearchResults = null,
  inputPlaceholder = null,
  isRequired = false,
  isStatic = false,
  isValid = true,
  layerColorMap = {},
  location = null,
  LocationIconComponent = DefaultLocationIcon,
  locationType,
  nearbyStops = [],
  onLocationSelected,
  onTextInputClick = null,
  operatorIconMap = {},
  preferredLayers = [],
  sessionOptionIcon = /*#__PURE__*/_react.default.createElement(_Search.Search, {
    size: _options.ICON_SIZE
  }),
  sessionSearches = [],
  showClearButton = true,
  showUserSettings = false,
  sortByDistance = false,
  stopOptionIcon = /*#__PURE__*/_react.default.createElement(_Bus.Bus, {
    size: _options.ICON_SIZE
  }),
  stopsIndex = null,
  suggestionCount = 3,
  suggestionHeadingType: headingType,
  suppressNearby = false,
  UserLocationIconComponent = _options.UserLocationIcon,
  userLocationsAndRecentPlaces = []
}) => {
  /**
   * Gets the initial value to place in the input field.
   */
  const getValueFromLocation = () => {
    const label = (location === null || location === void 0 ? void 0 : location.name) || "";
    return location && !hideExistingValue ? label : "";
  };

  const formControlClassname = `${locationType}-form-control`;
  const listBoxId = `${locationType}-listbox`;
  const intl = (0, _reactIntl.useIntl)();
  const [activeIndex, setActiveIndex] = (0, _react.useState)(null);
  const [stateGeocodedFeatures, setGeocodedFeatures] = (0, _react.useState)([]);
  const [menuVisible, setMenuVisible] = (0, _react.useState)(false);
  const [isFetching, setFetching] = (0, _react.useState)(false);
  const [stateMessage, setMessage] = (0, _react.useState)(null);
  const [stateValue, setValue] = (0, _react.useState)(getValueFromLocation());
  const [abortControllers, setAbortController] = (0, _react.useState)([]);
  const inputRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    // location could be null if none is set
    setValue((location === null || location === void 0 ? void 0 : location.name) || "");
    setGeocodedFeatures([]);
  }, [location]);
  (0, _react.useEffect)(() => {
    if (initialSearchResults) {
      setGeocodedFeatures(initialSearchResults);
      setMenuVisible(true);
    }
  }, [initialSearchResults]); // TODO: is it possible to restore the useCallback while also setting
  // a new abort controller?

  const geocodeAutocomplete = (0, _throttleDebounce.debounce)(300, text => {
    if (!text) {
      console.warn("No text entry provided for geocode autocomplete search.");
      setMessage(null);
      return;
    }

    setFetching(true);
    setMessage(intl.formatMessage({
      defaultMessage: "Fetching suggestions…",
      description: "Hint shown while geocoder suggestions are being fetched",
      id: "otpUi.LocationField.fetchingSuggestions"
    }));
    const newController = new AbortController();
    setAbortController([...abortControllers, newController]);
    (0, _geocoder.default)(geocoderConfig).autocomplete({
      text,
      options: {
        signal: newController.signal
      }
    }) // TODO: Better type?
    .then(result => {
      let message; // If no features found in response, default to empty array.

      let geocodedFeatures = result === null || result === void 0 ? void 0 : result.features;

      if (!geocodedFeatures) {
        var _result$results, _result$results$error;

        // Get the Pelias error message if exists.
        // TODO: determine how other geocoders return error messages.
        const errorMessage = result === null || result === void 0 ? void 0 : (_result$results = result.results) === null || _result$results === void 0 ? void 0 : (_result$results$error = _result$results.error) === null || _result$results$error === void 0 ? void 0 : _result$results$error.message; // If the result did not contain a list of features, add special note.

        message = (0, _utils.getGeocoderErrorMessage)(intl, errorMessage);
        geocodedFeatures = [];
      } else {
        const {
          otherFeatures,
          stationFeatures,
          stopFeatures
        } = getFeaturesByCategoryWithLimit(geocodedFeatures, suggestionCount, sortByDistance, preferredLayers); // Breakdown results found by type.

        const parts = [];

        if (stopFeatures.length) {
          parts.push(intl.formatMessage({
            description: "Shows the count of transit stops",
            id: "otpUi.LocationField.stopCount"
          }, {
            count: stopFeatures.length
          }));
        }

        if (stationFeatures.length) {
          parts.push(intl.formatMessage({
            description: "Shows the count of stations",
            id: "otpUi.LocationField.stationCount"
          }, {
            count: stationFeatures.length
          }));
        }

        if (otherFeatures.length) {
          parts.push(intl.formatMessage({
            description: "Shows the count of other places",
            id: "otpUi.LocationField.otherCount"
          }, {
            count: otherFeatures.length
          }));
        }

        const hasResults = parts.length !== 0;
        const results = hasResults ? intl.formatList(parts, {
          type: "conjunction"
        }) : intl.formatMessage({
          description: "Indicates no results",
          id: "otpUi.LocationField.noResults"
        });
        const resultsFoundText = intl.formatMessage({
          description: "Text about geocoder results found",
          id: "otpUi.LocationField.resultsFound"
        }, {
          input: text,
          results
        });

        if (hasResults) {
          // If there are results, concatenate sentences about results found and
          // instructions for assistive technology users on how to access results.
          const instructions = intl.formatMessage({
            description: "Instructions on accessing geocoder results",
            id: "otpUi.LocationField.howToAccessResults"
          });
          message = `${resultsFoundText} ${instructions}`;
        } else {
          message = resultsFoundText;
        }
      }

      setGeocodedFeatures(geocodedFeatures);
      setMessage(message);
      setFetching(false);
    }).catch(err => {
      console.error(err);
      const message = (0, _utils.getGeocoderErrorMessage)(intl, err.toString());
      setMessage(message);
    });
  });
  /** Clear selection & hide the menu. */

  const closeMenu = (0, _react.useCallback)(() => {
    setMenuVisible(false);
    setActiveIndex(null);
  }, [setMessage, setMenuVisible, setActiveIndex]);

  const setLocation = (newLocation, resultType) => {
    onLocationSelected({
      location: newLocation,
      locationType,
      resultType
    });
    closeMenu();
    setMessage(null);
  };

  const useCurrentLocation = () => {
    const newLocation = _coreUtils.default.map.currentPositionToLocation(currentPosition);

    if (newLocation) {
      // If geolocation is successful (i.e., user has granted app geolocation
      // permission and coords exist), set location.
      onLocationSelected({
        location: newLocation,
        locationType,
        resultType: "CURRENT_LOCATION"
      });
    } else {
      // Call geolocation.getCurrentPosition and set as from/to locationType
      getCurrentPosition(intl, locationType);
    }

    setMenuVisible(false);
  };

  const onClearButtonClick = () => {
    clearLocation({
      locationType
    });
    setValue("");
    setMessage(null);
    setGeocodedFeatures([]);
    inputRef.current.focus();
    handleTextInputClick();
  };

  const onDropdownToggle = () => {
    setMenuVisible(!menuVisible);
  };
  /**
   * Only hide menu if the target clicked is not a menu item in the dropdown.
   * Otherwise, the click will not "finish" and the menu will hide without the
   * user having made a selection.
   */


  const onBlurFormGroup = e => {
    // IE does not use relatedTarget, so this check handles cross-browser support.
    // see https://stackoverflow.com/a/49325196/915811
    const target = e.relatedTarget !== null ? e.relatedTarget : document.activeElement;

    if (!target || target.getAttribute("role") !== "option") {
      // Hide the menu and messages, but:
      // - don't remove features,
      //   so that when the component gets focus again later, these features are shown
      //   (unless the location prop changed, in which case the features will be cleared by other code),
      // - don't revert the input text to previous location, so that users don't have to re-enter their text
      //   (unless the location prop changed, in which case the text will be updated by other code).
      closeMenu();
    }
  };

  const onTextInputChange = evt => {
    const {
      value
    } = evt.target;
    setValue(value);
    setMenuVisible(true); // Cancel all pending requests

    abortControllers.forEach(ac => ac.abort());
    geocodeAutocomplete(value);
  };

  const handleTextInputClick = () => {
    if (typeof onTextInputClick === "function") onTextInputClick();
    setMenuVisible(true);

    if (nearbyStops.length === 0 && currentPosition && currentPosition.coords) {
      findNearbyStops({
        lat: currentPosition.coords.latitude,
        lon: currentPosition.coords.longitude,
        max: geocoderConfig.maxNearbyStops || 4
      });
    }
  };

  const onKeyDown = evt => {
    switch (evt.key) {
      // 'Down' arrow key pressed: move selected menu item down by one position
      case "ArrowDown":
        // Suppress default 'ArrowDown' behavior which moves cursor to end
        evt.preventDefault();

        if (!menuVisible) {
          // If the menu is not visible, simulate a text input click to show it.
          handleTextInputClick();
        } else if (activeIndex === menuItemCount - 1) {
          setActiveIndex(null);
        } else {
          setActiveIndex(activeIndex === null ? 0 : activeIndex + 1);
        }

        break;
      // 'Up' arrow key pressed: move selection up by one position

      case "ArrowUp":
        // Suppress default 'ArrowUp' behavior which moves cursor to beginning
        evt.preventDefault();

        if (activeIndex === 0) {
          setActiveIndex(null);
        } else {
          setActiveIndex(activeIndex === null ? menuItemCount - 1 : activeIndex - 1);
        }

        break;
      // 'Enter' keypress serves two purposes:
      //  - If pressed when typing in search string, switch from 'autocomplete'
      //    to 'search' geocoding
      //  - If pressed when dropdown results menu is active, apply the location
      //    associated with current selected menu item

      case "Enter":
        if (typeof activeIndex === "number") {
          // Menu is active
          // Retrieve location selection handler from lookup object and invoke
          const locationSelected = locationSelectedLookup[activeIndex];
          if (locationSelected) locationSelected();
          closeMenu();
          setMessage(null);
        } else {
          // Menu not active; get geocode 'search' results
          geocodeSearch(evt.target.value); // Ensure menu is visible.

          setMenuVisible(true);
        } // Suppress default 'Enter' behavior which causes page to reload


        evt.preventDefault();
        break;

      case "Escape":
      case "Tab":
        closeMenu();
        break;
      // Any other key pressed: clear active selection

      default:
        setActiveIndex(null);
        break;
    }
  };

  const geocodeSearch = text => {
    if (!text) {
      console.warn("No text entry provided for geocode search.");
      return;
    }

    (0, _geocoder.default)(geocoderConfig).search({
      text
    }).then(result => {
      var _result$features;

      if ((result === null || result === void 0 ? void 0 : (_result$features = result.features) === null || _result$features === void 0 ? void 0 : _result$features.length) > 0) {
        // Only replace geocode items if results were found
        setGeocodedFeatures(result.features);
        setMessage(null);
      } else {
        console.warn("No results found for geocode search. Not replacing results.");
      }
    }).catch(err => {
      console.error(err);
    });
  };

  const renderFeature = (itemIndex, feature) => {
    // generate the friendly labels for this feature
    const {
      main,
      secondary
    } = (0, _utils.generateLabel)(feature.properties); // Create the selection handler

    const locationSelected = () => {
      (0, _geocoder.default)(geocoderConfig).getLocationFromGeocodedFeature(feature).then(geocodedLocation => {
        // add the friendly location labels for use later on
        geocodedLocation.main = main;
        geocodedLocation.secondary = secondary;
        geocodedLocation.name = (0, _utils.getCombinedLabel)(feature.properties); // Set the current location

        setLocation(geocodedLocation, "GEOCODE"); // Add to the location search history. This is intended to
        // populate the sessionSearches array.

        addLocationSearch({
          location: geocodedLocation
        });
      });
    }; // Add to the selection handler lookup (for use in onKeyDown)


    locationSelectedLookup[itemIndex] = locationSelected; // Extract GTFS/POI info and assign to class

    const {
      id,
      source,
      layer
    } = feature.properties;
    const classNames = [];
    let operatorIcon; // Operator only exists on transit features

    const featureIdComponents = source === "transit" && id.split("::");

    if (featureIdComponents.length > 1 && (featureIdComponents === null || featureIdComponents === void 0 ? void 0 : featureIdComponents[1].length) > 0) {
      const operatorName = featureIdComponents[1].replace(/ /g, "-").toLowerCase();
      classNames.push(`operator-${operatorName}`);
      operatorIcon = operatorIconMap[operatorName];
    }

    classNames.push(`source-${source}`);
    classNames.push(`layer-${layer}`); // Create and return the option menu item

    return /*#__PURE__*/_react.default.createElement(_options.Option, {
      classes: classNames.join(" "),
      color: layerColorMap[layer],
      icon: operatorIcon || /*#__PURE__*/_react.default.createElement(GeocodedOptionIconComponent, {
        feature: feature
      }),
      id: getOptionId(itemIndex),
      isActive: itemIndex === activeIndex,
      key: optionKey++,
      onClick: locationSelected,
      title: main,
      subTitle: secondary
    });
  };

  const message = stateMessage;
  const geocodedFeatures = stateGeocodedFeatures;
  if (sessionSearches.length > 5) sessionSearches = sessionSearches.slice(0, 5); // Assemble menu contents, to be displayed either as dropdown or static panel.
  // Menu items are created in four phases: (1) the current location, (2) any
  // geocoder search results; (3) nearby transit stops; and (4) saved searches

  const statusMessages = [];
  let menuItems = []; // array of menu items for display (may include non-selectable items e.g. dividers/headings)

  let itemIndex = 0; // the index of the current location-associated menu item (excluding non-selectable items)

  const locationSelectedLookup = {}; // maps itemIndex to a location selection handler (for use by the onKeyDown method)

  const userLocationRenderData = showUserSettings ? userLocationsAndRecentPlaces.map(loc => (0, _options.getRenderData)(loc, setLocation, UserLocationIconComponent, intl)) : [];
  /* 0) Include user saved locations if the typed text contains those locations name. */

  if (showUserSettings) {
    const matchingLocations = (0, _utils.getMatchingLocations)(userLocationRenderData, stateValue);

    if (matchingLocations.length) {
      // Iterate through any saved locations
      menuItems = menuItems.concat(matchingLocations.map(userLocation => makeUserOption(userLocation, itemIndex++, optionKey++, itemIndex === activeIndex, locationSelectedLookup)));
    }
  }
  /* 1) Process geocode search result option(s) */


  if (geocodedFeatures.length > 0) {
    const {
      otherFeatures,
      stationFeatures,
      stopFeatures
    } = getFeaturesByCategoryWithLimit(geocodedFeatures, suggestionCount, sortByDistance, preferredLayers); // If no categories of features are returned, this variable is used to
    // avoid displaying headers

    const transitFeaturesPresent = stopFeatures.length > 0 || stationFeatures.length > 0; // Iterate through the geocoder results

    menuItems = menuItems.concat(stationFeatures.length > 0 && /*#__PURE__*/_react.default.createElement(S.MenuGroupHeader, {
      as: headingType,
      bgColor: layerColorMap.stations,
      key: "gtfs-stations-header"
    }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      description: "Text for header above Stations",
      id: "otpUi.LocationField.stations"
    })), stationFeatures.map(feature => renderFeature(itemIndex++, feature)), stopFeatures.length > 0 && /*#__PURE__*/_react.default.createElement(S.MenuGroupHeader, {
      as: headingType,
      bgColor: layerColorMap.stops,
      key: "gtfs-stops-header"
    }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      description: "Text for header above Stops",
      id: "otpUi.LocationField.stops"
    })), stopFeatures.map(feature => renderFeature(itemIndex++, feature)), transitFeaturesPresent && otherFeatures.length > 0 && /*#__PURE__*/_react.default.createElement(S.MenuGroupHeader, {
      as: headingType,
      bgColor: "#333",
      key: "other-header"
    }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      description: "Text for header above the 'other'",
      id: "otpUi.LocationField.other"
    })), otherFeatures.map(feature => renderFeature(itemIndex++, feature)));
  }
  /* 2) Process nearby transit stop options */


  if (nearbyStops.length > 0 && !suppressNearby) {
    // Add the menu sub-heading (not a selectable item)
    menuItems.push( /*#__PURE__*/_react.default.createElement(S.MenuGroupHeader, {
      as: headingType,
      key: "ns-header"
    }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      description: "Text for header above nearby stops",
      id: "otpUi.LocationField.nearby"
    }))); // Iterate through the found nearby stops

    menuItems = menuItems.concat(nearbyStops.map(stopId => {
      // Construct the location
      const stop = stopsIndex[stopId];
      const stopLocation = {
        id: stopId,
        lat: stop.lat,
        lon: stop.lon,
        name: stop.name
      }; // Create the location selected handler

      const locationSelected = () => {
        setLocation(stopLocation, "STOP");
      }; // Add to the selection handler lookup (for use in onKeyDown)


      locationSelectedLookup[itemIndex] = locationSelected; // Create and return the option menu item

      const option = /*#__PURE__*/_react.default.createElement(_options.TransitStopOption, {
        id: getOptionId(itemIndex),
        isActive: itemIndex === activeIndex,
        key: optionKey++,
        onClick: locationSelected,
        stop: stop,
        stopOptionIcon: stopOptionIcon
      });

      itemIndex++;
      return option;
    }));
  }
  /* 3) Process recent search history options */


  if (sessionSearches.length > 0) {
    // Add the menu sub-heading (not a selectable item)
    menuItems.push( /*#__PURE__*/_react.default.createElement(S.MenuGroupHeader, {
      as: headingType,
      key: "ss-header"
    }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      description: "Text for header above recently searched items",
      id: "otpUi.LocationField.recentlySearched"
    }))); // Iterate through any saved locations

    menuItems = menuItems.concat(sessionSearches.map(sessionLocation => {
      // Create the location-selected handler
      const locationSelected = () => {
        setLocation(sessionLocation, "SESSION");
      }; // Add to the selection handler lookup (for use in onKeyDown)


      locationSelectedLookup[itemIndex] = locationSelected; // Create and return the option menu item

      const option = /*#__PURE__*/_react.default.createElement(_options.Option, {
        icon: sessionOptionIcon,
        id: getOptionId(itemIndex),
        isActive: itemIndex === activeIndex,
        key: optionKey++,
        onClick: locationSelected,
        subTitle: sessionLocation.secondary || "" // just use the name if there is no main/secondary field
        ,
        title: sessionLocation.main || sessionLocation.name
      });

      itemIndex++;
      return option;
    }));
  }
  /* 3b) Process stored user locations */


  if (userLocationsAndRecentPlaces.length > 0 && showUserSettings) {
    // Add the menu sub-heading (not a selectable item)
    menuItems.push( /*#__PURE__*/_react.default.createElement(S.MenuGroupHeader, {
      as: headingType,
      key: "mp-header"
    }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      description: "Text for header above user-saved places",
      id: "otpUi.LocationField.myPlaces"
    }))); // Iterate through any saved locations

    menuItems = menuItems.concat(userLocationRenderData.map(userLocation => makeUserOption(userLocation, itemIndex++, optionKey++, itemIndex === activeIndex, locationSelectedLookup)));
  }
  /* 4) Process the current location */


  let locationSelected;
  let optionIcon;
  let optionTitle;
  let positionUnavailable;

  if (currentPosition && !currentPosition.error) {
    // current position detected successfully
    locationSelected = useCurrentLocation;
    optionIcon = currentPositionIcon;
    optionTitle = intl.formatMessage({
      id: "otpUi.LocationField.useCurrentLocation"
    });
    positionUnavailable = false;
  } else {
    // Error detecting current position.
    // If there is an error, concatenate the error message in parentheses.
    optionIcon = currentPositionUnavailableIcon;
    const locationUnavailableText = intl.formatMessage({
      description: "Current location unavailable status",
      id: "otpUi.LocationField.currentLocationUnavailable"
    });
    const errorText = !currentPosition ? undefined : typeof currentPosition.error === "string" ? currentPosition.error : currentPosition.error.message;
    optionTitle = (0, _utils.addInParentheses)(intl, locationUnavailableText, errorText);
    positionUnavailable = true;
    statusMessages.push(optionTitle);
  } // Add to the selection handler lookup (for use in onKeyDown)


  locationSelectedLookup[itemIndex] = locationSelected;

  if (!suppressNearby) {
    // Create and add the option item to the menu items array
    menuItems.push( /*#__PURE__*/_react.default.createElement(_options.Option, {
      disabled: positionUnavailable,
      icon: optionIcon,
      id: getOptionId(itemIndex),
      isActive: itemIndex === activeIndex,
      key: optionKey++,
      onClick: locationSelected,
      title: optionTitle
    }));
    if (!positionUnavailable) itemIndex++;
  }

  if (message) {
    if (geocodedFeatures.length === 0) {
      const icon = isFetching ? /*#__PURE__*/_react.default.createElement(S.Spinner, {
        size: _options.ICON_SIZE
      }) : /*#__PURE__*/_react.default.createElement(_ExclamationCircle.ExclamationCircle, {
        size: _options.ICON_SIZE
      });
      menuItems.unshift( /*#__PURE__*/_react.default.createElement(_options.Option, {
        disabled: true,
        icon: icon,
        key: optionKey++,
        title: message
      }));
    }

    statusMessages.push(message);
  } // Store the number of location-associated items for reference in the onKeyDown method


  let menuItemCount = itemIndex;
  /** the text input element * */
  // Use this text for aria-label below.

  const defaultPlaceholder = inputPlaceholder || locationType;
  const placeholder = currentPosition && currentPosition.fetching ? intl.formatMessage({
    id: "otpUi.LocationField.fetchingLocation"
  }) : defaultPlaceholder;
  const hasNoEnabledOptions = menuItemCount === 0;
  const isExpanded = isStatic || menuVisible;

  const textControl = /*#__PURE__*/_react.default.createElement(S.Input, {
    "aria-activedescendant": activeIndex !== null ? getOptionId(activeIndex) : null,
    "aria-autocomplete": "list",
    "aria-controls": listBoxId,
    "aria-expanded": isExpanded,
    "aria-haspopup": "listbox",
    "aria-invalid": !isValid,
    "aria-label": defaultPlaceholder,
    "aria-required": isRequired,
    autoFocus: autoFocus,
    className: formControlClassname,
    onChange: onTextInputChange,
    onClick: handleTextInputClick,
    onKeyDown: onKeyDown,
    placeholder: placeholder,
    ref: inputRef,
    role: "combobox",
    value: stateValue
  }); // Only include the clear ('X') button add-on if a location is selected
  // or if the input field has text.


  const clearButton = showClearButton && location ? /*#__PURE__*/_react.default.createElement(S.ClearButton, {
    "aria-label": intl.formatMessage({
      id: "otpUi.LocationField.clearLocation"
    }),
    onClick: onClearButtonClick
  }, clearButtonIcon) : null;
  const ItemList = isStatic ? S.StaticMenuItemList : S.MenuItemList;
  return /*#__PURE__*/_react.default.createElement(S.InputGroup, {
    className: className,
    onBlur: onBlurFormGroup,
    role: "group"
  }, /*#__PURE__*/_react.default.createElement(S.DropdownButton, {
    "aria-controls": listBoxId,
    "aria-expanded": isExpanded,
    "aria-label": intl.formatMessage({
      defaultMessage: "Open the list of location suggestions",
      description: "Text to show as a a11y label for the button that opens the dropdown list of locations",
      id: "otpUi.LocationField.suggestedLocationsLong"
    }),
    onClick: onDropdownToggle,
    tabIndex: -1
  }, /*#__PURE__*/_react.default.createElement(LocationIconComponent, {
    locationType: locationType
  })), textControl, clearButton, /*#__PURE__*/_react.default.createElement(S.HiddenContent, {
    role: "status"
  }, isExpanded && /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedList // eslint-disable-next-line react/style-prop-object
  , {
    style: "narrow",
    type: "conjunction",
    value: statusMessages
  })), /*#__PURE__*/_react.default.createElement(ItemList // Hide the list from screen readers if no enabled options are shown.
  , {
    "aria-hidden": hasNoEnabledOptions,
    "aria-label": intl.formatMessage({
      defaultMessage: "Suggested locations",
      description: "Text to show as a label for the dropdown list of locations",
      id: "otpUi.LocationField.suggestedLocations"
    }),
    id: listBoxId
  }, isStatic ? menuItems.length > 0 ? // Show typing prompt to avoid empty screen
  menuItems : /*#__PURE__*/_react.default.createElement(S.MenuGroupHeader, {
    as: "div"
  }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: "Begin typing to search for locations",
    description: "Text to show as initial placeholder in location search field",
    id: "otpUi.LocationField.beginTypingPrompt"
  })) : menuVisible && menuItems));
};

var _default = LocationField; // Rename styled components for export.

exports.default = _default;
//# sourceMappingURL=index.js.map