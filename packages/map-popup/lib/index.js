"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapPopup = MapPopup;
exports.Styled = exports.default = exports.defaultMessages = void 0;

var _react = _interopRequireWildcard(require("react"));

var _baseMap = require("@opentripplanner/base-map");

var _fromToLocationPicker = _interopRequireDefault(require("@opentripplanner/from-to-location-picker"));

var _reactIntl = require("react-intl");

var _flat = require("flat");

var S = _interopRequireWildcard(require("./styled"));

exports.Styled = S;

var _enUS = _interopRequireDefault(require("../i18n/en-US.yml"));

var _util = require("./util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Load the default messages.
// HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.
const defaultMessages = (0, _flat.flatten)(_enUS.default);
exports.defaultMessages = defaultMessages;

const generateLocation = (entity, name) => {
  // @ts-expect-error some of these values may be null, but that's ok
  const {
    lon: entityLon,
    lat: entityLat,
    x,
    y
  } = entity;
  const lat = entityLat || y;
  const lon = entityLon || x;
  if (!lat || !lon) return null;
  return {
    lat,
    lon,
    name
  };
};

const StationHubDetails = ({
  station
}) => {
  return /*#__PURE__*/_react.default.createElement(_baseMap.Styled.PopupRow, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.MapPopup.availableBikes"],
    description: "Label text for the number of bikes available",
    id: "otpUi.MapPopup.availableBikes",
    values: {
      value: station.bikesAvailable
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.MapPopup.availableDocks"],
    description: "Label text for the number of docks available",
    id: "otpUi.MapPopup.availableDocks",
    values: {
      value: station.spacesAvailable
    }
  })));
};

const StopDetails = ({
  id,
  setViewedStop
}) => {
  return /*#__PURE__*/_react.default.createElement(_baseMap.Styled.PopupRow, null, /*#__PURE__*/_react.default.createElement("strong", null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.MapPopup.stopId"],
    description: "Displays the stop id",
    id: "otpUi.MapPopup.stopId",
    values: {
      stopId: id
    }
  })), /*#__PURE__*/_react.default.createElement(S.ViewStopButton, {
    onClick: setViewedStop
  }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
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


function MapPopup({
  configCompanies,
  entity,
  getEntityName,
  setLocation,
  setViewedStop
}) {
  const intl = (0, _reactIntl.useIntl)();
  if (!entity) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  const getNameFunc = getEntityName || (0, _util.makeDefaultGetEntityName)(intl, defaultMessages);
  const name = getNameFunc(entity, configCompanies);
  const bikesAvailablePresent = entityIsStation(entity);
  const entityIsStationHub = bikesAvailablePresent && (entity === null || entity === void 0 ? void 0 : entity.bikesAvailable) !== undefined && !(entity !== null && entity !== void 0 && entity.isFloatingBike);
  const stopId = !bikesAvailablePresent && (entity === null || entity === void 0 ? void 0 : entity.code) || entity.id.split(":")[1] || entity.id;
  return /*#__PURE__*/_react.default.createElement(_baseMap.Styled.MapOverlayPopup, null, /*#__PURE__*/_react.default.createElement(_baseMap.Styled.PopupTitle, null, name), entityIsStationHub && /*#__PURE__*/_react.default.createElement(StationHubDetails, {
    station: entity
  }), setViewedStop && !bikesAvailablePresent && /*#__PURE__*/_react.default.createElement(StopDetails, {
    id: stopId,
    setViewedStop: (0, _react.useCallback)(() => setViewedStop(entity), [entity])
  }), setLocation && /*#__PURE__*/_react.default.createElement(_baseMap.Styled.PopupRow, null, /*#__PURE__*/_react.default.createElement(_fromToLocationPicker.default, {
    label: true,
    location: generateLocation(entity, name),
    setLocation: setLocation
  })));
}

var _default = MapPopup; // Rename styled components for export.

exports.default = _default;
//# sourceMappingURL=index.js.map