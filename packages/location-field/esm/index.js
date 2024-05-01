import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-use-before-define */
import coreUtils from "@opentripplanner/core-utils";
import getGeocoder from "@opentripplanner/geocoder"; // @ts-ignore Not Typescripted Yet

import LocationIcon from "@opentripplanner/location-icon";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormattedList, FormattedMessage, useIntl } from "react-intl";
import { Ban } from "@styled-icons/fa-solid/Ban";
import { Bus } from "@styled-icons/fa-solid/Bus";
import { ExclamationCircle } from "@styled-icons/fa-solid/ExclamationCircle";
import { LocationArrow } from "@styled-icons/fa-solid/LocationArrow";
import { Search } from "@styled-icons/fa-solid/Search";
import { Times } from "@styled-icons/fa-solid/Times";
import { debounce } from "throttle-debounce";
import { GeocodedOptionIcon, ICON_SIZE, Option, TransitStopOption, UserLocationIcon, getRenderData } from "./options";
import * as S from "./styled";
import { addInParentheses, generateLabel, getCombinedLabel, getGeocoderErrorMessage, getMatchingLocations } from "./utils";
var optionIdPrefix = "otpui-locf-option";
/**
 * Formats the option id based on its given index position.
 * This assumes only one location dropdown is shown at a time.
 */

function getOptionId(index) {
  return "".concat(optionIdPrefix, "-").concat(index);
} // FIXME have a better key generator for options


var optionKey = 0;

function DefaultLocationIcon(_ref) {
  var locationType = _ref.locationType;
  return /*#__PURE__*/React.createElement(LocationIcon, {
    size: ICON_SIZE,
    type: locationType
  });
}
/**
 * Helper function that includes or excludes features based om layers.
 */


function filter(list, layers, include, limit) {
  return list.filter(function (feature) {
    return layers.includes(feature.properties.layer) === include;
  }).slice(0, limit);
}
/**
 * Puts the given geocoded features into several categories with upper bounds.
 */


function getFeaturesByCategoryWithLimit(geocodedFeatures, suggestionCount, sortByDistance, preferredLayers) {
  // Split features into those we want to always show above others
  var _geocodedFeatures$red = geocodedFeatures.reduce(function (prev, cur) {
    var _cur$properties;

    prev[preferredLayers.includes(cur === null || cur === void 0 ? void 0 : (_cur$properties = cur.properties) === null || _cur$properties === void 0 ? void 0 : _cur$properties.layer) ? "special" : "normal"].push(cur);
    return prev;
  }, {
    special: [],
    normal: []
  }),
      special = _geocodedFeatures$red.special,
      normal = _geocodedFeatures$red.normal;

  var sortedGeocodedFeatures = [].concat(_toConsumableArray(special), _toConsumableArray(normal.sort(function (a, b) {
    var _b$properties, _a$properties;

    if (!sortByDistance) return 0;
    return (((_b$properties = b.properties) === null || _b$properties === void 0 ? void 0 : _b$properties.distance) || Infinity) - (((_a$properties = a.properties) === null || _a$properties === void 0 ? void 0 : _a$properties.distance) || Infinity);
  }))); // Split out different types of transit results
  // To keep the list tidy, only include a subset of the responses for each category

  var stopFeatures = filter(sortedGeocodedFeatures, ["stops"], true, suggestionCount);
  var stationFeatures = filter(sortedGeocodedFeatures, ["stations"], true, suggestionCount);
  var otherFeatures = filter(sortedGeocodedFeatures, ["stops", "stations"], false, suggestionCount);
  return {
    otherFeatures: otherFeatures,
    stationFeatures: stationFeatures,
    stopFeatures: stopFeatures
  };
}
/**
 * Helper to render and register a user-saved location.
 */


function makeUserOption(userLocation, index, key, activeIndex, selectHandlers) {
  var displayName = userLocation.displayName,
      icon = userLocation.icon,
      locationSelected = userLocation.locationSelected; // Add to the selection handler lookup (for use in onKeyDown)

  selectHandlers[index] = locationSelected;
  return /*#__PURE__*/React.createElement(Option, {
    icon: icon,
    id: getOptionId(index),
    isActive: index === activeIndex,
    key: key,
    onClick: locationSelected,
    title: displayName
  });
}

var LocationField = function LocationField(_ref2) {
  var _ref2$addLocationSear = _ref2.addLocationSearch,
      addLocationSearch = _ref2$addLocationSear === void 0 ? function () {} : _ref2$addLocationSear,
      _ref2$autoFocus = _ref2.autoFocus,
      autoFocus = _ref2$autoFocus === void 0 ? false : _ref2$autoFocus,
      _ref2$className = _ref2.className,
      className = _ref2$className === void 0 ? null : _ref2$className,
      _ref2$clearButtonIcon = _ref2.clearButtonIcon,
      clearButtonIcon = _ref2$clearButtonIcon === void 0 ? /*#__PURE__*/React.createElement(Times, {
    size: ICON_SIZE
  }) : _ref2$clearButtonIcon,
      _ref2$clearLocation = _ref2.clearLocation,
      clearLocation = _ref2$clearLocation === void 0 ? function () {} : _ref2$clearLocation,
      _ref2$currentPosition = _ref2.currentPosition,
      currentPosition = _ref2$currentPosition === void 0 ? null : _ref2$currentPosition,
      _ref2$currentPosition2 = _ref2.currentPositionIcon,
      currentPositionIcon = _ref2$currentPosition2 === void 0 ? /*#__PURE__*/React.createElement(LocationArrow, {
    size: ICON_SIZE
  }) : _ref2$currentPosition2,
      _ref2$currentPosition3 = _ref2.currentPositionUnavailableIcon,
      currentPositionUnavailableIcon = _ref2$currentPosition3 === void 0 ? /*#__PURE__*/React.createElement(Ban, {
    size: ICON_SIZE
  }) : _ref2$currentPosition3,
      _ref2$findNearbyStops = _ref2.findNearbyStops,
      findNearbyStops = _ref2$findNearbyStops === void 0 ? function () {} : _ref2$findNearbyStops,
      _ref2$GeocodedOptionI = _ref2.GeocodedOptionIconComponent,
      GeocodedOptionIconComponent = _ref2$GeocodedOptionI === void 0 ? GeocodedOptionIcon : _ref2$GeocodedOptionI,
      geocoderConfig = _ref2.geocoderConfig,
      getCurrentPosition = _ref2.getCurrentPosition,
      _ref2$hideExistingVal = _ref2.hideExistingValue,
      hideExistingValue = _ref2$hideExistingVal === void 0 ? false : _ref2$hideExistingVal,
      _ref2$initialSearchRe = _ref2.initialSearchResults,
      initialSearchResults = _ref2$initialSearchRe === void 0 ? null : _ref2$initialSearchRe,
      _ref2$inputPlaceholde = _ref2.inputPlaceholder,
      inputPlaceholder = _ref2$inputPlaceholde === void 0 ? null : _ref2$inputPlaceholde,
      _ref2$isRequired = _ref2.isRequired,
      isRequired = _ref2$isRequired === void 0 ? false : _ref2$isRequired,
      _ref2$isStatic = _ref2.isStatic,
      isStatic = _ref2$isStatic === void 0 ? false : _ref2$isStatic,
      _ref2$isValid = _ref2.isValid,
      isValid = _ref2$isValid === void 0 ? true : _ref2$isValid,
      _ref2$layerColorMap = _ref2.layerColorMap,
      layerColorMap = _ref2$layerColorMap === void 0 ? {} : _ref2$layerColorMap,
      _ref2$location = _ref2.location,
      location = _ref2$location === void 0 ? null : _ref2$location,
      _ref2$LocationIconCom = _ref2.LocationIconComponent,
      LocationIconComponent = _ref2$LocationIconCom === void 0 ? DefaultLocationIcon : _ref2$LocationIconCom,
      locationType = _ref2.locationType,
      _ref2$nearbyStops = _ref2.nearbyStops,
      nearbyStops = _ref2$nearbyStops === void 0 ? [] : _ref2$nearbyStops,
      onLocationSelected = _ref2.onLocationSelected,
      _ref2$onTextInputClic = _ref2.onTextInputClick,
      onTextInputClick = _ref2$onTextInputClic === void 0 ? null : _ref2$onTextInputClic,
      _ref2$operatorIconMap = _ref2.operatorIconMap,
      operatorIconMap = _ref2$operatorIconMap === void 0 ? {} : _ref2$operatorIconMap,
      _ref2$preferredLayers = _ref2.preferredLayers,
      preferredLayers = _ref2$preferredLayers === void 0 ? [] : _ref2$preferredLayers,
      _ref2$sessionOptionIc = _ref2.sessionOptionIcon,
      sessionOptionIcon = _ref2$sessionOptionIc === void 0 ? /*#__PURE__*/React.createElement(Search, {
    size: ICON_SIZE
  }) : _ref2$sessionOptionIc,
      _ref2$sessionSearches = _ref2.sessionSearches,
      sessionSearches = _ref2$sessionSearches === void 0 ? [] : _ref2$sessionSearches,
      _ref2$showClearButton = _ref2.showClearButton,
      showClearButton = _ref2$showClearButton === void 0 ? true : _ref2$showClearButton,
      _ref2$showUserSetting = _ref2.showUserSettings,
      showUserSettings = _ref2$showUserSetting === void 0 ? false : _ref2$showUserSetting,
      _ref2$sortByDistance = _ref2.sortByDistance,
      sortByDistance = _ref2$sortByDistance === void 0 ? false : _ref2$sortByDistance,
      _ref2$stopOptionIcon = _ref2.stopOptionIcon,
      stopOptionIcon = _ref2$stopOptionIcon === void 0 ? /*#__PURE__*/React.createElement(Bus, {
    size: ICON_SIZE
  }) : _ref2$stopOptionIcon,
      _ref2$stopsIndex = _ref2.stopsIndex,
      stopsIndex = _ref2$stopsIndex === void 0 ? null : _ref2$stopsIndex,
      _ref2$suggestionCount = _ref2.suggestionCount,
      suggestionCount = _ref2$suggestionCount === void 0 ? 3 : _ref2$suggestionCount,
      headingType = _ref2.suggestionHeadingType,
      _ref2$suppressNearby = _ref2.suppressNearby,
      suppressNearby = _ref2$suppressNearby === void 0 ? false : _ref2$suppressNearby,
      _ref2$UserLocationIco = _ref2.UserLocationIconComponent,
      UserLocationIconComponent = _ref2$UserLocationIco === void 0 ? UserLocationIcon : _ref2$UserLocationIco,
      _ref2$userLocationsAn = _ref2.userLocationsAndRecentPlaces,
      userLocationsAndRecentPlaces = _ref2$userLocationsAn === void 0 ? [] : _ref2$userLocationsAn;

  /**
   * Gets the initial value to place in the input field.
   */
  var getValueFromLocation = function getValueFromLocation() {
    var label = (location === null || location === void 0 ? void 0 : location.name) || "";
    return location && !hideExistingValue ? label : "";
  };

  var formControlClassname = "".concat(locationType, "-form-control");
  var listBoxId = "".concat(locationType, "-listbox");
  var intl = useIntl();

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      activeIndex = _useState2[0],
      setActiveIndex = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      stateGeocodedFeatures = _useState4[0],
      setGeocodedFeatures = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      menuVisible = _useState6[0],
      setMenuVisible = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isFetching = _useState8[0],
      setFetching = _useState8[1];

  var _useState9 = useState(null),
      _useState10 = _slicedToArray(_useState9, 2),
      stateMessage = _useState10[0],
      setMessage = _useState10[1];

  var _useState11 = useState(getValueFromLocation()),
      _useState12 = _slicedToArray(_useState11, 2),
      stateValue = _useState12[0],
      setValue = _useState12[1];

  var _useState13 = useState([]),
      _useState14 = _slicedToArray(_useState13, 2),
      abortControllers = _useState14[0],
      setAbortController = _useState14[1];

  var inputRef = useRef(null);
  useEffect(function () {
    // location could be null if none is set
    setValue((location === null || location === void 0 ? void 0 : location.name) || "");
    setGeocodedFeatures([]);
  }, [location]);
  useEffect(function () {
    if (initialSearchResults) {
      setGeocodedFeatures(initialSearchResults);
      setMenuVisible(true);
    }
  }, [initialSearchResults]); // TODO: is it possible to restore the useCallback while also setting
  // a new abort controller?

  var geocodeAutocomplete = debounce(300, function (text) {
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
    var newController = new AbortController();
    setAbortController([].concat(_toConsumableArray(abortControllers), [newController]));
    getGeocoder(geocoderConfig).autocomplete({
      text: text,
      options: {
        signal: newController.signal
      }
    }) // TODO: Better type?
    .then(function (result) {
      var message; // If no features found in response, default to empty array.

      var geocodedFeatures = result === null || result === void 0 ? void 0 : result.features;

      if (!geocodedFeatures) {
        var _result$results, _result$results$error;

        // Get the Pelias error message if exists.
        // TODO: determine how other geocoders return error messages.
        var errorMessage = result === null || result === void 0 ? void 0 : (_result$results = result.results) === null || _result$results === void 0 ? void 0 : (_result$results$error = _result$results.error) === null || _result$results$error === void 0 ? void 0 : _result$results$error.message; // If the result did not contain a list of features, add special note.

        message = getGeocoderErrorMessage(intl, errorMessage);
        geocodedFeatures = [];
      } else {
        var _getFeaturesByCategor = getFeaturesByCategoryWithLimit(geocodedFeatures, suggestionCount, sortByDistance, preferredLayers),
            otherFeatures = _getFeaturesByCategor.otherFeatures,
            stationFeatures = _getFeaturesByCategor.stationFeatures,
            stopFeatures = _getFeaturesByCategor.stopFeatures; // Breakdown results found by type.


        var parts = [];

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

        var hasResults = parts.length !== 0;
        var results = hasResults ? intl.formatList(parts, {
          type: "conjunction"
        }) : intl.formatMessage({
          description: "Indicates no results",
          id: "otpUi.LocationField.noResults"
        });
        var resultsFoundText = intl.formatMessage({
          description: "Text about geocoder results found",
          id: "otpUi.LocationField.resultsFound"
        }, {
          input: text,
          results: results
        });

        if (hasResults) {
          // If there are results, concatenate sentences about results found and
          // instructions for assistive technology users on how to access results.
          var instructions = intl.formatMessage({
            description: "Instructions on accessing geocoder results",
            id: "otpUi.LocationField.howToAccessResults"
          });
          message = "".concat(resultsFoundText, " ").concat(instructions);
        } else {
          message = resultsFoundText;
        }
      }

      setGeocodedFeatures(geocodedFeatures);
      setMessage(message);
      setFetching(false);
    })["catch"](function (err) {
      console.error(err);
      var message = getGeocoderErrorMessage(intl, err.toString());
      setMessage(message);
    });
  });
  /** Clear selection & hide the menu. */

  var closeMenu = useCallback(function () {
    setMenuVisible(false);
    setActiveIndex(null);
  }, [setMessage, setMenuVisible, setActiveIndex]);

  var setLocation = function setLocation(newLocation, resultType) {
    onLocationSelected({
      location: newLocation,
      locationType: locationType,
      resultType: resultType
    });
    closeMenu();
    setMessage(null);
  };

  var useCurrentLocation = function useCurrentLocation() {
    var newLocation = coreUtils.map.currentPositionToLocation(currentPosition);

    if (newLocation) {
      // If geolocation is successful (i.e., user has granted app geolocation
      // permission and coords exist), set location.
      onLocationSelected({
        location: newLocation,
        locationType: locationType,
        resultType: "CURRENT_LOCATION"
      });
    } else {
      // Call geolocation.getCurrentPosition and set as from/to locationType
      getCurrentPosition(intl, locationType);
    }

    setMenuVisible(false);
  };

  var onClearButtonClick = function onClearButtonClick() {
    clearLocation({
      locationType: locationType
    });
    setValue("");
    setMessage(null);
    setGeocodedFeatures([]);
    inputRef.current.focus();
    handleTextInputClick();
  };

  var onDropdownToggle = function onDropdownToggle() {
    setMenuVisible(!menuVisible);
  };
  /**
   * Only hide menu if the target clicked is not a menu item in the dropdown.
   * Otherwise, the click will not "finish" and the menu will hide without the
   * user having made a selection.
   */


  var onBlurFormGroup = function onBlurFormGroup(e) {
    // IE does not use relatedTarget, so this check handles cross-browser support.
    // see https://stackoverflow.com/a/49325196/915811
    var target = e.relatedTarget !== null ? e.relatedTarget : document.activeElement;

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

  var onTextInputChange = function onTextInputChange(evt) {
    var value = evt.target.value;
    setValue(value);
    setMenuVisible(true); // Cancel all pending requests

    abortControllers.forEach(function (ac) {
      return ac.abort();
    });
    geocodeAutocomplete(value);
  };

  var handleTextInputClick = function handleTextInputClick() {
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

  var onKeyDown = function onKeyDown(evt) {
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
          var _locationSelected = locationSelectedLookup[activeIndex];
          if (_locationSelected) _locationSelected();
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

  var geocodeSearch = function geocodeSearch(text) {
    if (!text) {
      console.warn("No text entry provided for geocode search.");
      return;
    }

    getGeocoder(geocoderConfig).search({
      text: text
    }).then(function (result) {
      var _result$features;

      if ((result === null || result === void 0 ? void 0 : (_result$features = result.features) === null || _result$features === void 0 ? void 0 : _result$features.length) > 0) {
        // Only replace geocode items if results were found
        setGeocodedFeatures(result.features);
        setMessage(null);
      } else {
        console.warn("No results found for geocode search. Not replacing results.");
      }
    })["catch"](function (err) {
      console.error(err);
    });
  };

  var renderFeature = function renderFeature(itemIndex, feature) {
    // generate the friendly labels for this feature
    var _generateLabel = generateLabel(feature.properties),
        main = _generateLabel.main,
        secondary = _generateLabel.secondary; // Create the selection handler


    var locationSelected = function locationSelected() {
      getGeocoder(geocoderConfig).getLocationFromGeocodedFeature(feature).then(function (geocodedLocation) {
        // add the friendly location labels for use later on
        geocodedLocation.main = main;
        geocodedLocation.secondary = secondary;
        geocodedLocation.name = getCombinedLabel(feature.properties); // Set the current location

        setLocation(geocodedLocation, "GEOCODE"); // Add to the location search history. This is intended to
        // populate the sessionSearches array.

        addLocationSearch({
          location: geocodedLocation
        });
      });
    }; // Add to the selection handler lookup (for use in onKeyDown)


    locationSelectedLookup[itemIndex] = locationSelected; // Extract GTFS/POI info and assign to class

    var _feature$properties = feature.properties,
        id = _feature$properties.id,
        source = _feature$properties.source,
        layer = _feature$properties.layer;
    var classNames = [];
    var operatorIcon; // Operator only exists on transit features

    var featureIdComponents = source === "transit" && id.split("::");

    if (featureIdComponents.length > 1 && (featureIdComponents === null || featureIdComponents === void 0 ? void 0 : featureIdComponents[1].length) > 0) {
      var operatorName = featureIdComponents[1].replace(/ /g, "-").toLowerCase();
      classNames.push("operator-".concat(operatorName));
      operatorIcon = operatorIconMap[operatorName];
    }

    classNames.push("source-".concat(source));
    classNames.push("layer-".concat(layer)); // Create and return the option menu item

    return /*#__PURE__*/React.createElement(Option, {
      classes: classNames.join(" "),
      color: layerColorMap[layer],
      icon: operatorIcon || /*#__PURE__*/React.createElement(GeocodedOptionIconComponent, {
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

  var message = stateMessage;
  var geocodedFeatures = stateGeocodedFeatures;
  if (sessionSearches.length > 5) sessionSearches = sessionSearches.slice(0, 5); // Assemble menu contents, to be displayed either as dropdown or static panel.
  // Menu items are created in four phases: (1) the current location, (2) any
  // geocoder search results; (3) nearby transit stops; and (4) saved searches

  var statusMessages = [];
  var menuItems = []; // array of menu items for display (may include non-selectable items e.g. dividers/headings)

  var itemIndex = 0; // the index of the current location-associated menu item (excluding non-selectable items)

  var locationSelectedLookup = {}; // maps itemIndex to a location selection handler (for use by the onKeyDown method)

  var userLocationRenderData = showUserSettings ? userLocationsAndRecentPlaces.map(function (loc) {
    return getRenderData(loc, setLocation, UserLocationIconComponent, intl);
  }) : [];
  /* 0) Include user saved locations if the typed text contains those locations name. */

  if (showUserSettings) {
    var matchingLocations = getMatchingLocations(userLocationRenderData, stateValue);

    if (matchingLocations.length) {
      // Iterate through any saved locations
      menuItems = menuItems.concat(matchingLocations.map(function (userLocation) {
        return makeUserOption(userLocation, itemIndex++, optionKey++, itemIndex === activeIndex, locationSelectedLookup);
      }));
    }
  }
  /* 1) Process geocode search result option(s) */


  if (geocodedFeatures.length > 0) {
    var _getFeaturesByCategor2 = getFeaturesByCategoryWithLimit(geocodedFeatures, suggestionCount, sortByDistance, preferredLayers),
        otherFeatures = _getFeaturesByCategor2.otherFeatures,
        stationFeatures = _getFeaturesByCategor2.stationFeatures,
        stopFeatures = _getFeaturesByCategor2.stopFeatures; // If no categories of features are returned, this variable is used to
    // avoid displaying headers


    var transitFeaturesPresent = stopFeatures.length > 0 || stationFeatures.length > 0; // Iterate through the geocoder results

    menuItems = menuItems.concat(stationFeatures.length > 0 && /*#__PURE__*/React.createElement(S.MenuGroupHeader, {
      as: headingType,
      bgColor: layerColorMap.stations,
      key: "gtfs-stations-header"
    }, /*#__PURE__*/React.createElement(FormattedMessage, {
      description: "Text for header above Stations",
      id: "otpUi.LocationField.stations"
    })), stationFeatures.map(function (feature) {
      return renderFeature(itemIndex++, feature);
    }), stopFeatures.length > 0 && /*#__PURE__*/React.createElement(S.MenuGroupHeader, {
      as: headingType,
      bgColor: layerColorMap.stops,
      key: "gtfs-stops-header"
    }, /*#__PURE__*/React.createElement(FormattedMessage, {
      description: "Text for header above Stops",
      id: "otpUi.LocationField.stops"
    })), stopFeatures.map(function (feature) {
      return renderFeature(itemIndex++, feature);
    }), transitFeaturesPresent && otherFeatures.length > 0 && /*#__PURE__*/React.createElement(S.MenuGroupHeader, {
      as: headingType,
      bgColor: "#333",
      key: "other-header"
    }, /*#__PURE__*/React.createElement(FormattedMessage, {
      description: "Text for header above the 'other'",
      id: "otpUi.LocationField.other"
    })), otherFeatures.map(function (feature) {
      return renderFeature(itemIndex++, feature);
    }));
  }
  /* 2) Process nearby transit stop options */


  if (nearbyStops.length > 0 && !suppressNearby) {
    // Add the menu sub-heading (not a selectable item)
    menuItems.push( /*#__PURE__*/React.createElement(S.MenuGroupHeader, {
      as: headingType,
      key: "ns-header"
    }, /*#__PURE__*/React.createElement(FormattedMessage, {
      description: "Text for header above nearby stops",
      id: "otpUi.LocationField.nearby"
    }))); // Iterate through the found nearby stops

    menuItems = menuItems.concat(nearbyStops.map(function (stopId) {
      // Construct the location
      var stop = stopsIndex[stopId];
      var stopLocation = {
        id: stopId,
        lat: stop.lat,
        lon: stop.lon,
        name: stop.name
      }; // Create the location selected handler

      var locationSelected = function locationSelected() {
        setLocation(stopLocation, "STOP");
      }; // Add to the selection handler lookup (for use in onKeyDown)


      locationSelectedLookup[itemIndex] = locationSelected; // Create and return the option menu item

      var option = /*#__PURE__*/React.createElement(TransitStopOption, {
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
    menuItems.push( /*#__PURE__*/React.createElement(S.MenuGroupHeader, {
      as: headingType,
      key: "ss-header"
    }, /*#__PURE__*/React.createElement(FormattedMessage, {
      description: "Text for header above recently searched items",
      id: "otpUi.LocationField.recentlySearched"
    }))); // Iterate through any saved locations

    menuItems = menuItems.concat(sessionSearches.map(function (sessionLocation) {
      // Create the location-selected handler
      var locationSelected = function locationSelected() {
        setLocation(sessionLocation, "SESSION");
      }; // Add to the selection handler lookup (for use in onKeyDown)


      locationSelectedLookup[itemIndex] = locationSelected; // Create and return the option menu item

      var option = /*#__PURE__*/React.createElement(Option, {
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
    menuItems.push( /*#__PURE__*/React.createElement(S.MenuGroupHeader, {
      as: headingType,
      key: "mp-header"
    }, /*#__PURE__*/React.createElement(FormattedMessage, {
      description: "Text for header above user-saved places",
      id: "otpUi.LocationField.myPlaces"
    }))); // Iterate through any saved locations

    menuItems = menuItems.concat(userLocationRenderData.map(function (userLocation) {
      return makeUserOption(userLocation, itemIndex++, optionKey++, itemIndex === activeIndex, locationSelectedLookup);
    }));
  }
  /* 4) Process the current location */


  var locationSelected;
  var optionIcon;
  var optionTitle;
  var positionUnavailable;

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
    var locationUnavailableText = intl.formatMessage({
      description: "Current location unavailable status",
      id: "otpUi.LocationField.currentLocationUnavailable"
    });
    var errorText = !currentPosition ? undefined : typeof currentPosition.error === "string" ? currentPosition.error : currentPosition.error.message;
    optionTitle = addInParentheses(intl, locationUnavailableText, errorText);
    positionUnavailable = true;
    statusMessages.push(optionTitle);
  } // Add to the selection handler lookup (for use in onKeyDown)


  locationSelectedLookup[itemIndex] = locationSelected;

  if (!suppressNearby) {
    // Create and add the option item to the menu items array
    menuItems.push( /*#__PURE__*/React.createElement(Option, {
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
      var icon = isFetching ? /*#__PURE__*/React.createElement(S.Spinner, {
        size: ICON_SIZE
      }) : /*#__PURE__*/React.createElement(ExclamationCircle, {
        size: ICON_SIZE
      });
      menuItems.unshift( /*#__PURE__*/React.createElement(Option, {
        disabled: true,
        icon: icon,
        key: optionKey++,
        title: message
      }));
    }

    statusMessages.push(message);
  } // Store the number of location-associated items for reference in the onKeyDown method


  var menuItemCount = itemIndex;
  /** the text input element * */
  // Use this text for aria-label below.

  var defaultPlaceholder = inputPlaceholder || locationType;
  var placeholder = currentPosition && currentPosition.fetching ? intl.formatMessage({
    id: "otpUi.LocationField.fetchingLocation"
  }) : defaultPlaceholder;
  var hasNoEnabledOptions = menuItemCount === 0;
  var isExpanded = isStatic || menuVisible;
  var textControl = /*#__PURE__*/React.createElement(S.Input, {
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

  var clearButton = showClearButton && location ? /*#__PURE__*/React.createElement(S.ClearButton, {
    "aria-label": intl.formatMessage({
      id: "otpUi.LocationField.clearLocation"
    }),
    onClick: onClearButtonClick
  }, clearButtonIcon) : null;
  var ItemList = isStatic ? S.StaticMenuItemList : S.MenuItemList;
  return /*#__PURE__*/React.createElement(S.InputGroup, {
    className: className,
    onBlur: onBlurFormGroup,
    role: "group"
  }, /*#__PURE__*/React.createElement(S.DropdownButton, {
    "aria-controls": listBoxId,
    "aria-expanded": isExpanded,
    "aria-label": intl.formatMessage({
      defaultMessage: "Open the list of location suggestions",
      description: "Text to show as a a11y label for the button that opens the dropdown list of locations",
      id: "otpUi.LocationField.suggestedLocationsLong"
    }),
    onClick: onDropdownToggle,
    tabIndex: -1
  }, /*#__PURE__*/React.createElement(LocationIconComponent, {
    locationType: locationType
  })), textControl, clearButton, /*#__PURE__*/React.createElement(S.HiddenContent, {
    role: "status"
  }, isExpanded && /*#__PURE__*/React.createElement(FormattedList // eslint-disable-next-line react/style-prop-object
  , {
    style: "narrow",
    type: "conjunction",
    value: statusMessages
  })), /*#__PURE__*/React.createElement(ItemList // Hide the list from screen readers if no enabled options are shown.
  , {
    "aria-hidden": hasNoEnabledOptions,
    "aria-label": intl.formatMessage({
      defaultMessage: "Suggested locations",
      description: "Text to show as a label for the dropdown list of locations",
      id: "otpUi.LocationField.suggestedLocations"
    }),
    id: listBoxId
  }, isStatic ? menuItems.length > 0 ? // Show typing prompt to avoid empty screen
  menuItems : /*#__PURE__*/React.createElement(S.MenuGroupHeader, {
    as: "div"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: "Begin typing to search for locations",
    description: "Text to show as initial placeholder in location search field",
    id: "otpUi.LocationField.beginTypingPrompt"
  })) : menuVisible && menuItems));
};

export default LocationField; // Rename styled components for export.

export { S as Styled };
//# sourceMappingURL=index.js.map