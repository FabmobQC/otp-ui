import React, { useCallback } from "react";
import { Styled as BaseMapStyled } from "@opentripplanner/base-map";
import FromToLocationPicker from "@opentripplanner/from-to-location-picker"; // eslint-disable-next-line prettier/prettier

import { FormattedMessage, useIntl } from "react-intl";
import { flatten } from "flat";
import * as S from "./styled"; // Load the default messages.

import defaultEnglishMessages from "../i18n/en-US.yml";
import { makeDefaultGetEntityName } from "./util"; // HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.

export var defaultMessages = flatten(defaultEnglishMessages);

var generateLocation = function generateLocation(entity, name) {
  // @ts-expect-error some of these values may be null, but that's ok
  var entityLon = entity.lon,
      entityLat = entity.lat,
      x = entity.x,
      y = entity.y;
  var lat = entityLat || y;
  var lon = entityLon || x;
  if (!lat || !lon) return null;
  return {
    lat: lat,
    lon: lon,
    name: name
  };
};

var StationHubDetails = function StationHubDetails(_ref) {
  var station = _ref.station;
  return /*#__PURE__*/React.createElement(BaseMapStyled.PopupRow, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.MapPopup.availableBikes"],
    description: "Label text for the number of bikes available",
    id: "otpUi.MapPopup.availableBikes",
    values: {
      value: station.bikesAvailable
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.MapPopup.availableDocks"],
    description: "Label text for the number of docks available",
    id: "otpUi.MapPopup.availableDocks",
    values: {
      value: station.spacesAvailable
    }
  })));
};

var StopDetails = function StopDetails(_ref2) {
  var id = _ref2.id,
      setViewedStop = _ref2.setViewedStop;
  return /*#__PURE__*/React.createElement(BaseMapStyled.PopupRow, null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.MapPopup.stopId"],
    description: "Displays the stop id",
    id: "otpUi.MapPopup.stopId",
    values: {
      stopId: id
    }
  })), /*#__PURE__*/React.createElement(S.ViewStopButton, {
    onClick: setViewedStop
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.MapPopup.stopViewer"],
    description: "Text for link that opens the stop viewer",
    id: "otpUi.MapPopup.stopViewer"
  })));
};

function entityIsStation(entity) {
  return "bikesAvailable" in entity;
}
/**
 * Renders a map popup for a stop, scooter, or shared bike
 */


export function MapPopup(_ref3) {
  var configCompanies = _ref3.configCompanies,
      entity = _ref3.entity,
      getEntityName = _ref3.getEntityName,
      setLocation = _ref3.setLocation,
      setViewedStop = _ref3.setViewedStop;
  var intl = useIntl();
  if (!entity) return /*#__PURE__*/React.createElement(React.Fragment, null);
  var getNameFunc = getEntityName || makeDefaultGetEntityName(intl, defaultMessages);
  var name = getNameFunc(entity, configCompanies);
  var bikesAvailablePresent = entityIsStation(entity);
  var entityIsStationHub = bikesAvailablePresent && (entity === null || entity === void 0 ? void 0 : entity.bikesAvailable) !== undefined && !(entity !== null && entity !== void 0 && entity.isFloatingBike);
  var stopId = !bikesAvailablePresent && (entity === null || entity === void 0 ? void 0 : entity.code) || entity.id.split(":")[1] || entity.id;
  return /*#__PURE__*/React.createElement(BaseMapStyled.MapOverlayPopup, null, /*#__PURE__*/React.createElement(BaseMapStyled.PopupTitle, null, name), entityIsStationHub && /*#__PURE__*/React.createElement(StationHubDetails, {
    station: entity
  }), setViewedStop && !bikesAvailablePresent && /*#__PURE__*/React.createElement(StopDetails, {
    id: stopId,
    setViewedStop: useCallback(function () {
      return setViewedStop(entity);
    }, [entity])
  }), setLocation && /*#__PURE__*/React.createElement(BaseMapStyled.PopupRow, null, /*#__PURE__*/React.createElement(FromToLocationPicker, {
    label: true,
    location: generateLocation(entity, name),
    setLocation: setLocation
  })));
}
export default MapPopup; // Rename styled components for export.

export { S as Styled };
//# sourceMappingURL=index.js.map