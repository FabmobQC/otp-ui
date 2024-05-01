import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import coreUtils from "@opentripplanner/core-utils";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for the icons package.
import { TriMetModeIcon } from "@opentripplanner/icons";
import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import ModeSelector from "../ModeSelector";
import SubmodeSelector from "../SubmodeSelector";
import GeneralSettingsPanel from "../GeneralSettingsPanel";
import * as S from "../styled";
import { getModeOptions, getTransitSubmodeOptions, getCompaniesForModeId, getCompaniesOptions, getBicycleOrMicromobilityModeOptions, getModeString, isBike } from "../util"; // eslint-disable-next-line prettier/prettier

import { defaultMessages, getQueryParamMessagesWithI18n } from "./query-params-i18n";
var _coreUtils$itinerary = coreUtils.itinerary,
    isMicromobility = _coreUtils$itinerary.isMicromobility,
    isTransit = _coreUtils$itinerary.isTransit;

function getSelectedCompanies(queryParams) {
  var companies = queryParams.companies;
  return companies ? companies.split(",") : [];
}

function getSelectedModes(queryParams) {
  var mode = queryParams.mode;
  var modes = mode ? mode.split(",") : []; // Map OTP Flex modes to custom flex mode

  return coreUtils.query.reduceOtpFlexModes(modes);
}
/**
 * The Settings Selector Panel allows the user to set trip search preferences,
 * such as modes, providers, and speed preferences.
 */


export default function SettingsSelectorPanel(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? null : _ref$className,
      _ref$ModeIcon = _ref.ModeIcon,
      ModeIcon = _ref$ModeIcon === void 0 ? TriMetModeIcon : _ref$ModeIcon,
      _ref$onQueryParamChan = _ref.onQueryParamChange,
      onQueryParamChange = _ref$onQueryParamChan === void 0 ? null : _ref$onQueryParamChan,
      _ref$queryParams = _ref.queryParams,
      queryParams = _ref$queryParams === void 0 ? null : _ref$queryParams,
      _ref$queryParamMessag = _ref.queryParamMessages,
      queryParamMessages = _ref$queryParamMessag === void 0 ? null : _ref$queryParamMessag,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? null : _ref$style,
      _ref$supportedCompani = _ref.supportedCompanies,
      supportedCompanies = _ref$supportedCompani === void 0 ? [] : _ref$supportedCompani,
      _ref$supportedModes = _ref.supportedModes,
      supportedModes = _ref$supportedModes === void 0 ? null : _ref$supportedModes;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      defaultAccessModeCompany = _useState2[0],
      setDefaultAccessModeCompany = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      lastTransitModes = _useState4[0],
      setLastTransitModes = _useState4[1];

  var selectedModes = getSelectedModes(queryParams);
  var selectedCompanies = getSelectedCompanies(queryParams);
  var handleQueryParamChange = useCallback(function (queryParam) {
    if (typeof onQueryParamChange === "function") {
      onQueryParamChange(queryParam);
    }
  }, [onQueryParamChange]);
  var toggleSubmode = useCallback(function (name, id, submodes) {
    var filter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (o) {
      return o;
    };
    var after = arguments.length > 4 ? arguments[4] : undefined;
    var newSubmodes = [].concat(submodes);
    var idx = newSubmodes.indexOf(id); // If the clicked mode is selected, then unselect it, o/w select it.
    // Leave at least one selected, as in newplanner.trimet.org.

    if (idx >= 0) {
      var subset = newSubmodes.filter(filter);

      if (subset.length >= 2) {
        newSubmodes.splice(idx, 1);
      }
    } else {
      newSubmodes.push(id);
    }

    if (newSubmodes.length !== submodes.length) {
      handleQueryParamChange(_defineProperty({}, name, newSubmodes.join(",")));
      if (after) after(newSubmodes);
    }
  }, [onQueryParamChange]);
  var handleMainModeChange = useCallback(function (id) {
    var newModes = id.split("+");

    if (newModes[0] === "TRANSIT") {
      var activeTransitModes = selectedModes.filter(isTransit);
      var lastOrAllTransitModes = lastTransitModes.length === 0 ? supportedModes.transitModes.map(getModeString) : lastTransitModes;

      var _getCompaniesForModeI = getCompaniesForModeId(id, supportedCompanies),
          defAccessModeCompany = _getCompaniesForModeI.defaultAccessModeCompany,
          _companies = _getCompaniesForModeI.companies,
          _nonTransitModes = _getCompaniesForModeI.nonTransitModes; // Add previously selected transit modes only if none were active.


      var finalModes = (activeTransitModes.length > 0 ? activeTransitModes : lastOrAllTransitModes).concat(_nonTransitModes);
      handleQueryParamChange({
        companies: _companies.join(","),
        mode: finalModes.join(",")
      });
      setDefaultAccessModeCompany(defAccessModeCompany && defAccessModeCompany[0]);
    } else {
      handleQueryParamChange({
        companies: "",
        // New req: Don't list companies with this mode?
        mode: newModes.join(",")
      });
    }
  }, [onQueryParamChange, queryParams, lastTransitModes]);
  var handleTransitModeChange = useCallback(function (id) {
    return toggleSubmode("mode", id, selectedModes, isTransit, function (newModes) {
      return setLastTransitModes(newModes.filter(isTransit));
    });
  }, [onQueryParamChange, queryParams]);
  var handleCompanyChange = useCallback(function (id) {
    return toggleSubmode("companies", id, selectedCompanies, undefined, function () {});
  }, [onQueryParamChange, queryParams]);
  var intl = useIntl();

  var queryParamMessagesWithI18nAndCustomizations = _objectSpread(_objectSpread({}, getQueryParamMessagesWithI18n(intl)), queryParamMessages);

  var modeOptions = getModeOptions(ModeIcon, supportedModes, selectedModes, selectedCompanies, supportedCompanies, intl, defaultMessages);
  var transitModes = getTransitSubmodeOptions(ModeIcon, supportedModes, selectedModes);
  var nonTransitModes = selectedModes.filter(function (m) {
    return !isTransit(m);
  });
  var companies = getCompaniesOptions(supportedCompanies.filter(function (comp) {
    return defaultAccessModeCompany ? comp.id === defaultAccessModeCompany : true;
  }), nonTransitModes, selectedCompanies);
  var bikeModes = getBicycleOrMicromobilityModeOptions(ModeIcon, supportedModes.bicycleModes, selectedModes);
  var scooterModes = getBicycleOrMicromobilityModeOptions(ModeIcon, supportedModes.micromobilityModes, selectedModes);
  var submodeLabel = intl.formatMessage({
    defaultMessage: defaultMessages["otpUi.SettingsSelectorPanel.use"],
    description: "Text announcing a list of submodes to use.",
    id: "otpUi.SettingsSelectorPanel.use"
  });
  var submodeCompaniesLabel = intl.formatMessage({
    defaultMessage: defaultMessages["otpUi.SettingsSelectorPanel.useCompanies"],
    description: "Text announcing a list of rental companies to use.",
    id: "otpUi.SettingsSelectorPanel.useCompanies"
  });
  var settingsHeader = intl.formatMessage({
    defaultMessage: defaultMessages["otpUi.SettingsSelectorPanel.travelPreferences"],
    description: "Header text for the travel preferences.",
    id: "otpUi.SettingsSelectorPanel.travelPreferences"
  });
  return /*#__PURE__*/React.createElement(S.SettingsSelectorPanel, {
    "aria-label": settingsHeader,
    className: className,
    role: "group",
    style: style
  }, /*#__PURE__*/React.createElement(ModeSelector, {
    modes: modeOptions,
    onChange: handleMainModeChange,
    style: {
      margin: "0px -5px",
      paddingBottom: "8px"
    }
  }), /*#__PURE__*/React.createElement(S.SettingsHeader, null, settingsHeader), selectedModes.some(isTransit) && transitModes.length >= 2 && /*#__PURE__*/React.createElement(SubmodeSelector, {
    label: submodeLabel,
    modes: transitModes,
    onChange: handleTransitModeChange
  }), selectedModes.some(isBike) && !selectedModes.some(isTransit) && /*#__PURE__*/React.createElement(SubmodeSelector, {
    label: submodeLabel,
    inline: true,
    modes: bikeModes,
    onChange: handleMainModeChange
  }), selectedModes.some(isMicromobility) && !selectedModes.some(isTransit) && /*#__PURE__*/React.createElement(SubmodeSelector, {
    label: submodeLabel,
    inline: true,
    modes: scooterModes,
    onChange: handleMainModeChange
  }), companies.length >= 2 && /*#__PURE__*/React.createElement(SubmodeSelector, {
    label: submodeCompaniesLabel,
    modes: companies,
    onChange: handleCompanyChange
  }), /*#__PURE__*/React.createElement(GeneralSettingsPanel, {
    query: queryParams,
    queryParamMessages: queryParamMessagesWithI18nAndCustomizations,
    supportedModes: supportedModes,
    onQueryParamChange: handleQueryParamChange
  }));
}
//# sourceMappingURL=index.js.map