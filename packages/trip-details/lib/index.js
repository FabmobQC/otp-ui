"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TripDetails = TripDetails;
Object.defineProperty(exports, "FareLegTable", {
  enumerable: true,
  get: function () {
    return _fareTable.default;
  }
});
exports.Styled = exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _CalendarAlt = require("@styled-icons/fa-solid/CalendarAlt");

var _Heartbeat = require("@styled-icons/fa-solid/Heartbeat");

var _MoneyBillAlt = require("@styled-icons/fa-solid/MoneyBillAlt");

var _Leaf = require("@styled-icons/fa-solid/Leaf");

var _Route = require("@styled-icons/fa-solid/Route");

var _flat = require("flat");

var S = _interopRequireWildcard(require("./styled"));

exports.Styled = S;

var _tripDetail = _interopRequireDefault(require("./trip-detail"));

var _fareTable = _interopRequireDefault(require("./fare-table"));

var _utils = require("./utils");

var _enUS = _interopRequireDefault(require("../i18n/en-US.yml"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Load the default messages.
// HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.
const defaultMessages = (0, _flat.flatten)(_enUS.default);

function CO2DescriptionLink(contents) {
  return /*#__PURE__*/_react.default.createElement("a", {
    href: "https://www.itf-oecd.org/sites/default/files/life-cycle-assessment-calculations-2020.xlsx",
    rel: "noopener noreferrer",
    target: "_blank"
  }, contents);
}
/**
 * Default rendering if no component is provided for the TimeActiveDetails
 * slot in the TripDetails component.
 */


function DefaultTimeActiveDetails({
  bikeMinutes,
  walkMinutes
}) {
  return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TripDetails.timeActiveDescription"],
    description: "Text describing the walking and biking durations of a trip.",
    id: "otpUi.TripDetails.timeActiveDescription",
    values: {
      bikeMinutes,
      strong: _utils.boldText,
      walkMinutes
    }
  });
}
/**
 * Renders trip details such as departure instructions, fare amount, and minutes active.
 */


function TripDetails({
  className = "",
  co2Config,
  defaultFareType,
  DepartureDetails = null,
  displayTimeActive = true,
  FareDetails = null,
  fareDetailsLayout,
  fareKeyNameMap = {},
  itinerary,
  TimeActiveDetails = DefaultTimeActiveDetails
}) {
  // process the transit fare
  const fareResult = _coreUtils.default.itinerary.calculateTncFares(itinerary);

  const {
    currencyCode,
    maxTNCFare,
    minTNCFare
  } = fareResult;
  const {
    companies,
    fareTypes
  } = itinerary.legs.reduce((prev, leg) => {
    if (leg.rideHailingEstimate) {
      prev.companies = leg.rideHailingEstimate.provider.id;
    }

    if (leg.fareProducts) {
      leg.fareProducts.forEach(fp => {
        var _fp$product$medium, _fp$product$riderCate;

        const mediumId = (_fp$product$medium = fp.product.medium) === null || _fp$product$medium === void 0 ? void 0 : _fp$product$medium.id;
        const riderCategoryId = (_fp$product$riderCate = fp.product.riderCategory) === null || _fp$product$riderCate === void 0 ? void 0 : _fp$product$riderCate.id;

        if (!prev.fareTypes.find(ft => ft.mediumId === mediumId && ft.riderCategoryId === riderCategoryId)) {
          prev.fareTypes.push({
            mediumId,
            riderCategoryId
          });
        }
      });
    }

    return prev;
  }, {
    companies: "",
    fareTypes: []
  });
  let fare;

  if (fareTypes.length > 0 && defaultFareType) {
    var _defaultFareTotal$cur;

    const defaultFareTotal = _coreUtils.default.itinerary.getItineraryCost(itinerary.legs, defaultFareType.mediumId, defaultFareType.riderCategoryId); // Depending on if there are additional fares to display either render a <span> or a <details>


    const TransitFareWrapper = fareTypes.length > 1 ? S.TransitFare : S.TransitFareSingle;

    const fareNameFallback = /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TripDetails.transitFare"],
      description: "Text showing the price of tickets on public transportation.",
      id: "otpUi.TripDetails.transitFare"
    });

    fare = defaultFareTotal !== undefined && /*#__PURE__*/_react.default.createElement(S.Fare, null, /*#__PURE__*/_react.default.createElement(TransitFareWrapper, null, /*#__PURE__*/_react.default.createElement("summary", {
      style: {
        display: fareTypes.length > 1 ? "list-item" : ""
      }
    }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TripDetails.transitFareEntry"],
      description: "Text showing the price of tickets on public transportation.",
      id: "otpUi.TripDetails.transitFareEntry",
      values: {
        name: fareKeyNameMap[defaultFareType.headerKey] || fareNameFallback,
        strong: _utils.boldText,
        value: (0, _utils.renderFare)(((_defaultFareTotal$cur = defaultFareTotal.currency) === null || _defaultFareTotal$cur === void 0 ? void 0 : _defaultFareTotal$cur.code) || "USD", defaultFareTotal === null || defaultFareTotal === void 0 ? void 0 : defaultFareTotal.amount)
      }
    })), fareDetailsLayout ?
    /*#__PURE__*/
    // Show full ƒare details by leg
    _react.default.createElement(_fareTable.default, {
      layout: fareDetailsLayout,
      legs: itinerary.legs
    }) : // Just show the fares for each payment type
    fareTypes.map(fareType => {
      var _defaultFareTotal$cur2, _defaultFareTotal$cur3;

      // Don't show the default fare twice!
      if (fareType) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TripDetails.transitFareEntry"],
        description: "Text showing the price of tickets on public transportation.",
        id: "otpUi.TripDetails.transitFareEntry",
        key: Object.values(fareType).join("-"),
        values: {
          name: fareKeyNameMap[defaultFareType.headerKey] || fareNameFallback,
          strong: _utils.boldText,
          value: (0, _utils.renderFare)(((_defaultFareTotal$cur2 = defaultFareTotal.currency) === null || _defaultFareTotal$cur2 === void 0 ? void 0 : _defaultFareTotal$cur2.code) || "USD", (defaultFareTotal === null || defaultFareTotal === void 0 ? void 0 : defaultFareTotal.amount) / (defaultFareTotal === null || defaultFareTotal === void 0 ? void 0 : (_defaultFareTotal$cur3 = defaultFareTotal.currency) === null || _defaultFareTotal$cur3 === void 0 ? void 0 : _defaultFareTotal$cur3.digits))
        }
      });
    })));
  }

  const tncFare = minTNCFare !== 0 && /*#__PURE__*/_react.default.createElement(S.Fare, null, /*#__PURE__*/_react.default.createElement(S.TNCFare, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TripDetails.tncFare"],
    description: "Text showing the price paid to transportation network companies.",
    id: "otpUi.TripDetails.tncFare",
    values: {
      companies:
      /*#__PURE__*/
      // S.TNCFareCompanies capitalizes the TNC company ID (e.g. "COMPANY")
      // after it is converted to lowercase, so it renders as "Company".
      _react.default.createElement(S.TNCFareCompanies, null, companies.toLowerCase()),
      maxTNCFare: (0, _utils.renderFare)(currencyCode, maxTNCFare),
      minTNCFare: (0, _utils.renderFare)(currencyCode, minTNCFare),
      strong: _utils.boldText
    }
  })));

  const departureDate = new Date(itinerary.startTime); // Compute total time spent active.
  // TODO: separate into two reducers

  let walkDurationSeconds = 0;
  let bikeDurationSeconds = 0;
  itinerary.legs.forEach(leg => {
    if (leg.mode.startsWith("WALK")) walkDurationSeconds += leg.duration;
    if (leg.mode.startsWith("BICYCLE")) bikeDurationSeconds += leg.duration;
  });
  const bikeMinutes = Math.round(bikeDurationSeconds / 60);
  const walkMinutes = Math.round(walkDurationSeconds / 60);
  const minutesActive = bikeMinutes + walkMinutes; // Calculate CO₂ if it's not provided by the itinerary

  const co2 = itinerary.co2 || (co2Config === null || co2Config === void 0 ? void 0 : co2Config.enabled) && _coreUtils.default.itinerary.calculateEmissions(itinerary, co2Config === null || co2Config === void 0 ? void 0 : co2Config.carbonIntensity, co2Config === null || co2Config === void 0 ? void 0 : co2Config.units); // Parse flex info and generate appropriate strings


  const containsFlex = itinerary.legs.some(_coreUtils.default.itinerary.isFlex);
  const pickupBookingInfo = itinerary.legs.map(leg => leg.pickupBookingInfo).filter(info => !!info);
  const dropOffBookingInfo = itinerary.legs.map(leg => leg.dropOffBookingInfo).filter(info => !!info);
  const totalDistance = itinerary.legs.reduce((total, leg) => total + leg.distance, 0);
  return /*#__PURE__*/_react.default.createElement(S.TripDetails, {
    className: className
  }, /*#__PURE__*/_react.default.createElement(S.TripDetailsHeader, {
    id: "trip-details-header"
  }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TripDetails.title"],
    description: "Title (heading) text of the component.",
    id: "otpUi.TripDetails.title"
  })), /*#__PURE__*/_react.default.createElement(S.TripDetailsBody, null, /*#__PURE__*/_react.default.createElement(_tripDetail.default // Any custom description for the Departure message needs to be handled by the slot.
  , {
    description: DepartureDetails && /*#__PURE__*/_react.default.createElement(DepartureDetails, {
      departureDate: departureDate
    }),
    icon: /*#__PURE__*/_react.default.createElement(_CalendarAlt.CalendarAlt, {
      size: 17
    }),
    summary: /*#__PURE__*/_react.default.createElement(S.Timing, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TripDetails.departure"],
      description: "Text showing the departure date/time for a trip.",
      id: "otpUi.TripDetails.departure",
      values: {
        departureDate,
        strong: _utils.boldText
      }
    }))
  }), !!fare && /*#__PURE__*/_react.default.createElement(_tripDetail.default // Any custom description for the transit fare needs to be handled by the slot.
  , {
    description: FareDetails && /*#__PURE__*/_react.default.createElement(FareDetails, {
      legs: itinerary.legs,
      maxTNCFare: maxTNCFare,
      minTNCFare: minTNCFare
    }),
    icon: /*#__PURE__*/_react.default.createElement(_MoneyBillAlt.MoneyBillAlt, {
      size: 17
    }),
    summary: fare
  }), tncFare && /*#__PURE__*/_react.default.createElement(_tripDetail.default // Any custom description for the transit fare needs to be handled by the slot.
  , {
    description: FareDetails && /*#__PURE__*/_react.default.createElement(FareDetails, {
      legs: itinerary.legs,
      maxTNCFare: maxTNCFare,
      minTNCFare: minTNCFare
    }),
    icon: /*#__PURE__*/_react.default.createElement(_MoneyBillAlt.MoneyBillAlt, {
      size: 17
    }),
    summary: tncFare
  }), displayTimeActive && minutesActive > 0 && /*#__PURE__*/_react.default.createElement(_tripDetail.default, {
    icon: /*#__PURE__*/_react.default.createElement(_Heartbeat.Heartbeat, {
      size: 17
    }),
    summary: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TripDetails.minutesActive"],
      description: "Text showing the number of minutes spent walking or biking throughout trip.",
      id: "otpUi.TripDetails.minutesActive",
      values: {
        minutes: minutesActive,
        strong: _utils.boldText
      }
    }),
    description: TimeActiveDetails && /*#__PURE__*/_react.default.createElement(TimeActiveDetails, {
      bikeMinutes: bikeMinutes,
      walkMinutes: walkMinutes
    })
  }), co2 > 0 && (co2Config === null || co2Config === void 0 ? void 0 : co2Config.enabled) && /*#__PURE__*/_react.default.createElement(_tripDetail.default, {
    icon: /*#__PURE__*/_react.default.createElement(_Leaf.Leaf, {
      size: 17
    }),
    summary: /*#__PURE__*/_react.default.createElement(S.CO2Summary, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TripDetails.co2"],
      description: "Text showing the quantity of CO\u2082 emitted by this trip.",
      id: "otpUi.TripDetails.co2",
      values: {
        co2: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedNumber, {
          value: Math.round(co2) // eslint-disable-next-line react/style-prop-object
          ,
          style: "unit",
          unit: (co2Config === null || co2Config === void 0 ? void 0 : co2Config.units) || "gram",
          unitDisplay: "narrow"
        }),
        strong: _utils.boldText
      }
    })),
    description: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TripDetails.co2description"],
      description: "Text explaining how the CO\u2082 emissions are calculated.",
      id: "otpUi.TripDetails.co2description",
      values: {
        link: CO2DescriptionLink,
        totalDistance
      }
    })
  }), containsFlex && /*#__PURE__*/_react.default.createElement(_tripDetail.default, {
    summary: /*#__PURE__*/_react.default.createElement(S.FlexSummary, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TripDetails.tripIncludesFlex"],
      description: "Text stating that portions of the trip include a flex (on-demand) transit service.",
      id: "otpUi.TripDetails.tripIncludesFlex",
      values: {
        extraMessage: [...new Set([...pickupBookingInfo.map(info => info.message), ...dropOffBookingInfo.map(info => info.message)])].join(" ")
      }
    })),
    icon: /*#__PURE__*/_react.default.createElement(_Route.Route, {
      size: 17
    })
  })));
}

var _default = TripDetails; // Rename styled components for export.

exports.default = _default;
//# sourceMappingURL=index.js.map