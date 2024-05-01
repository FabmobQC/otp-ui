import coreUtils from "@opentripplanner/core-utils"; // eslint-disable-next-line import/prefer-default-export

export function makeDefaultGetEntityName(intl, defaultEnglishMessages) {
  return function defaultGetEntityName(entity, configCompanies) {
    var _entity$networks;

    var stationNetworks = "networks" in entity && (coreUtils.itinerary.getCompaniesLabelFromNetworks((entity === null || entity === void 0 ? void 0 : entity.networks) || [], configCompanies) || (entity === null || entity === void 0 ? void 0 : (_entity$networks = entity.networks) === null || _entity$networks === void 0 ? void 0 : _entity$networks[0]));
    var stationName = entity.name || entity.id; // If the station name or id is a giant UUID (with more than 3 "-" characters)
    // best not to show that at all. The company name will still be shown.

    if ((stationName.match(/-/g) || []).length > 3) {
      stationName = null;
    }

    if ("isFloatingBike" in entity && entity.isFloatingBike) {
      stationName = intl.formatMessage({
        defaultMessage: defaultEnglishMessages["otpUi.MapPopup.floatingBike"],
        description: "Popup title for a free-floating bike",
        id: "otpUi.MapPopup.floatingBike"
      }, {
        name: stationName || stationNetworks
      });
    } else if ("isFloatingCar" in entity && entity.isFloatingCar) {
      stationName = intl.formatMessage({
        defaultMessage: defaultEnglishMessages["otpUi.MapPopup.floatingCar"],
        description: "Popup title for a free-floating car",
        id: "otpUi.MapPopup.floatingCar"
      }, {
        company: stationNetworks,
        name: stationName
      });
    } else if ("isFloatingVehicle" in entity && entity.isFloatingVehicle) {
      // assumes that all floating vehicles are E-scooters
      stationName = intl.formatMessage({
        defaultMessage: defaultEnglishMessages["otpUi.MapPopup.floatingEScooter"],
        description: "Popup title for a free-floating e-scooter",
        id: "otpUi.MapPopup.floatingEScooter"
      }, {
        name: stationName || stationNetworks
      });
    }

    return stationName;
  };
}
//# sourceMappingURL=util.js.map