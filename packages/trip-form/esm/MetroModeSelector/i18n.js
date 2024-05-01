import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { flatten } from "flat";
import defaultEnglishMessages from "../../i18n/en-US.yml"; // HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.

var defaultMessages = flatten(defaultEnglishMessages);
export default function generateModeButtonLabel(key, intl, defaultLabel) {
  switch (key.toLocaleLowerCase()) {
    case "transit":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.labels.transit"],
        description: "Metro Mode Selector Label (transit)",
        id: "otpUi.ModeSelector.labels.transit"
      });

    case "walk":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.labels.walk"],
        description: "Metro Mode Selector Label (walk)",
        id: "otpUi.ModeSelector.labels.walk"
      });

    case "bicycle":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.labels.bicycle"],
        description: "Metro Mode Selector Label (bicycle)",
        id: "otpUi.ModeSelector.labels.bicycle"
      });

    case "car":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.labels.car"],
        description: "Metro Mode Selector Label (car)",
        id: "otpUi.ModeSelector.labels.car"
      });

    case "rent":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.labels.rent"],
        description: "Metro Mode Selector Label (rent)",
        id: "otpUi.ModeSelector.labels.rent"
      });
    // Default case adds support for custom mode buttons

    default:
      return intl.formatMessage({
        defaultMessage: defaultLabel || defaultMessages["otpUi.ModeSelector.labels.".concat(key)],
        description: "Metro Mode Selector Label (".concat(key, ")"),
        id: "otpUi.ModeSelector.labels.".concat(key)
      });
  }
}

function generateMainSettingLabel(key, intl) {
  switch (key) {
    case "walkReluctance":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.settings.walkReluctance-label"],
        description: "Metro Mode Selector Setting Label (Walk Reluctance)",
        id: "otpUi.ModeSelector.settings.walkReluctance-label"
      });

    case "walkTolerance":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.settings.walkTolerance-label"],
        description: "Metro Mode Selector Setting Label (Walk Tolerance)",
        id: "otpUi.ModeSelector.settings.walkTolerance-label"
      });

    case "carTolerance":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.settings.carTolerance-label"],
        description: "Metro Mode Selector Setting Label (Car Tolerance)",
        id: "otpUi.ModeSelector.settings.carTolerance-label"
      });

    case "bikeTolerance":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.settings.bikeTolerance-label"],
        description: "Metro Mode Selector Setting Label (Bike Tolerance)",
        id: "otpUi.ModeSelector.settings.bikeTolerance-label"
      });

    case "wheelchair":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.settings.wheelchair-label"],
        description: "Metro Mode Selector Setting Label (wheelchair)",
        id: "otpUi.ModeSelector.settings.wheelchair-label"
      });

    case "bus":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.settings.bus-label"],
        description: "Metro Mode Selector Setting Label (bus)",
        id: "otpUi.ModeSelector.settings.bus-label"
      });

    case "ferry":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.settings.ferry-label"],
        description: "Metro Mode Selector Setting Label (ferry)",
        id: "otpUi.ModeSelector.settings.ferry-label"
      });

    case "subway":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.settings.subway-label"],
        description: "Metro Mode Selector Setting Label (subway)",
        id: "otpUi.ModeSelector.settings.subway-label"
      });

    case "tram":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.settings.tram-label"],
        description: "Metro Mode Selector Setting Label (tram)",
        id: "otpUi.ModeSelector.settings.tram-label"
      });

    case "rail":
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.settings.rail-label"],
        description: "Metro Mode Selector Setting Label (rail)",
        id: "otpUi.ModeSelector.settings.rail-label"
      });

    default:
      return intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.ModeSelector.settings.".concat(key, "-label")],
        description: "Metro Mode Selector Setting Label (".concat(key, ")"),
        id: "otpUi.ModeSelector.settings.".concat(key, "-label")
      });
  }
}

function generateSliderLabels(key, intl) {
  switch (key) {
    case "bikeTolerance":
      return {
        labelLow: intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.ModeSelector.settings.bikeTolerance-labelLow"],
          description: "Metro Mode Selector Setting Slider Label Low (Bike Tolerance)",
          id: "otpUi.ModeSelector.settings.bikeTolerance-labelLow"
        }),
        labelHigh: intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.ModeSelector.settings.bikeTolerance-labelHigh"],
          description: "Metro Mode Selector Setting Slider Label High (Bike Tolerance)",
          id: "otpUi.ModeSelector.settings.bikeTolerance-labelHigh"
        })
      };

    case "carTolerance":
      return {
        labelLow: intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.ModeSelector.settings.carTolerance-labelLow"],
          description: "Metro Mode Selector Setting Slider Label Low (Car Tolerance)",
          id: "otpUi.ModeSelector.settings.carTolerance-labelLow"
        }),
        labelHigh: intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.ModeSelector.settings.carTolerance-labelHigh"],
          description: "Metro Mode Selector Setting Slider Label High (Car Tolerance)",
          id: "otpUi.ModeSelector.settings.carTolerance-labelHigh"
        })
      };

    case "walkTolerance":
      return {
        labelLow: intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.ModeSelector.settings.walkTolerance-labelLow"],
          description: "Metro Mode Selector Setting Slider Label Low (Walk Tolerance)",
          id: "otpUi.ModeSelector.settings.walkTolerance-labelLow"
        }),
        labelHigh: intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.ModeSelector.settings.walkTolerance-labelHigh"],
          description: "Metro Mode Selector Setting Slider Label High (Walk Tolerance)",
          id: "otpUi.ModeSelector.settings.walkTolerance-labelHigh"
        })
      };

    default:
      return {
        labelLow: intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.ModeSelector.settings.".concat(key, "-labelLow")],
          description: "Metro Mode Selector Slider Label High (".concat(key, ")"),
          id: "otpUi.ModeSelector.settings.".concat(key, "-labelLow")
        }),
        labelHigh: intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.ModeSelector.settings.".concat(key, "-labelHigh")],
          description: "Metro Mode Selector Slider Label Low (".concat(key, ")"),
          id: "otpUi.ModeSelector.settings.".concat(key, "-labelHigh")
        })
      };
  }
}

export function generateModeSettingLabels(type, key, intl, defaultLabel) {
  switch (type) {
    case "SLIDER":
      return _objectSpread({
        label: defaultLabel || generateMainSettingLabel(key, intl)
      }, generateSliderLabels(key, intl));

    case "CHECKBOX":
    case "SUBMODE":
    case "DROPDOWN":
    default:
      return {
        label: defaultLabel || generateMainSettingLabel(key, intl)
      };
  }
}
//# sourceMappingURL=i18n.js.map