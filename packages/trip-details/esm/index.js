import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import coreUtils from "@opentripplanner/core-utils";
import React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { CalendarAlt } from "@styled-icons/fa-solid/CalendarAlt";
import { Heartbeat } from "@styled-icons/fa-solid/Heartbeat";
import { MoneyBillAlt } from "@styled-icons/fa-solid/MoneyBillAlt";
import { Leaf } from "@styled-icons/fa-solid/Leaf";
import { Route } from "@styled-icons/fa-solid/Route";
import { flatten } from "flat";
import * as S from "./styled";
import TripDetail from "./trip-detail";
import FareLegTable from "./fare-table";
import { boldText, renderFare } from "./utils";
// Load the default messages.
import defaultEnglishMessages from "../i18n/en-US.yml"; // HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.

var defaultMessages = flatten(defaultEnglishMessages);

function CO2DescriptionLink(contents) {
  return /*#__PURE__*/React.createElement("a", {
    href: "https://www.itf-oecd.org/sites/default/files/life-cycle-assessment-calculations-2020.xlsx",
    rel: "noopener noreferrer",
    target: "_blank"
  }, contents);
}
/**
 * Default rendering if no component is provided for the TimeActiveDetails
 * slot in the TripDetails component.
 */


function DefaultTimeActiveDetails(_ref) {
  var bikeMinutes = _ref.bikeMinutes,
      walkMinutes = _ref.walkMinutes;
  return /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TripDetails.timeActiveDescription"],
    description: "Text describing the walking and biking durations of a trip.",
    id: "otpUi.TripDetails.timeActiveDescription",
    values: {
      bikeMinutes: bikeMinutes,
      strong: boldText,
      walkMinutes: walkMinutes
    }
  });
}
/**
 * Renders trip details such as departure instructions, fare amount, and minutes active.
 */


export function TripDetails(_ref2) {
  var _ref2$className = _ref2.className,
      className = _ref2$className === void 0 ? "" : _ref2$className,
      co2Config = _ref2.co2Config,
      defaultFareType = _ref2.defaultFareType,
      _ref2$DepartureDetail = _ref2.DepartureDetails,
      DepartureDetails = _ref2$DepartureDetail === void 0 ? null : _ref2$DepartureDetail,
      _ref2$displayTimeActi = _ref2.displayTimeActive,
      displayTimeActive = _ref2$displayTimeActi === void 0 ? true : _ref2$displayTimeActi,
      _ref2$FareDetails = _ref2.FareDetails,
      FareDetails = _ref2$FareDetails === void 0 ? null : _ref2$FareDetails,
      fareDetailsLayout = _ref2.fareDetailsLayout,
      _ref2$fareKeyNameMap = _ref2.fareKeyNameMap,
      fareKeyNameMap = _ref2$fareKeyNameMap === void 0 ? {} : _ref2$fareKeyNameMap,
      itinerary = _ref2.itinerary,
      _ref2$TimeActiveDetai = _ref2.TimeActiveDetails,
      TimeActiveDetails = _ref2$TimeActiveDetai === void 0 ? DefaultTimeActiveDetails : _ref2$TimeActiveDetai;
  // process the transit fare
  var fareResult = coreUtils.itinerary.calculateTncFares(itinerary);
  var currencyCode = fareResult.currencyCode,
      maxTNCFare = fareResult.maxTNCFare,
      minTNCFare = fareResult.minTNCFare;

  var _itinerary$legs$reduc = itinerary.legs.reduce(function (prev, leg) {
    if (leg.rideHailingEstimate) {
      prev.companies = leg.rideHailingEstimate.provider.id;
    }

    if (leg.fareProducts) {
      leg.fareProducts.forEach(function (fp) {
        var _fp$product$medium, _fp$product$riderCate;

        var mediumId = (_fp$product$medium = fp.product.medium) === null || _fp$product$medium === void 0 ? void 0 : _fp$product$medium.id;
        var riderCategoryId = (_fp$product$riderCate = fp.product.riderCategory) === null || _fp$product$riderCate === void 0 ? void 0 : _fp$product$riderCate.id;

        if (!prev.fareTypes.find(function (ft) {
          return ft.mediumId === mediumId && ft.riderCategoryId === riderCategoryId;
        })) {
          prev.fareTypes.push({
            mediumId: mediumId,
            riderCategoryId: riderCategoryId
          });
        }
      });
    }

    return prev;
  }, {
    companies: "",
    fareTypes: []
  }),
      companies = _itinerary$legs$reduc.companies,
      fareTypes = _itinerary$legs$reduc.fareTypes;

  var fare;

  if (fareTypes.length > 0 && defaultFareType) {
    var _defaultFareTotal$cur;

    var defaultFareTotal = coreUtils.itinerary.getItineraryCost(itinerary.legs, defaultFareType.mediumId, defaultFareType.riderCategoryId); // Depending on if there are additional fares to display either render a <span> or a <details>

    var TransitFareWrapper = fareTypes.length > 1 ? S.TransitFare : S.TransitFareSingle;
    var fareNameFallback = /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TripDetails.transitFare"],
      description: "Text showing the price of tickets on public transportation.",
      id: "otpUi.TripDetails.transitFare"
    });
    fare = defaultFareTotal !== undefined && /*#__PURE__*/React.createElement(S.Fare, null, /*#__PURE__*/React.createElement(TransitFareWrapper, null, /*#__PURE__*/React.createElement("summary", {
      style: {
        display: fareTypes.length > 1 ? "list-item" : ""
      }
    }, /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TripDetails.transitFareEntry"],
      description: "Text showing the price of tickets on public transportation.",
      id: "otpUi.TripDetails.transitFareEntry",
      values: {
        name: fareKeyNameMap[defaultFareType.headerKey] || fareNameFallback,
        strong: boldText,
        value: renderFare(((_defaultFareTotal$cur = defaultFareTotal.currency) === null || _defaultFareTotal$cur === void 0 ? void 0 : _defaultFareTotal$cur.code) || "USD", defaultFareTotal === null || defaultFareTotal === void 0 ? void 0 : defaultFareTotal.amount)
      }
    })), fareDetailsLayout ?
    /*#__PURE__*/
    // Show full ƒare details by leg
    React.createElement(FareLegTable, {
      layout: fareDetailsLayout,
      legs: itinerary.legs
    }) : // Just show the fares for each payment type
    fareTypes.map(function (fareType) {
      var _defaultFareTotal$cur2, _defaultFareTotal$cur3;

      // Don't show the default fare twice!
      if (fareType) {
        return null;
      }

      return /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TripDetails.transitFareEntry"],
        description: "Text showing the price of tickets on public transportation.",
        id: "otpUi.TripDetails.transitFareEntry",
        key: Object.values(fareType).join("-"),
        values: {
          name: fareKeyNameMap[defaultFareType.headerKey] || fareNameFallback,
          strong: boldText,
          value: renderFare(((_defaultFareTotal$cur2 = defaultFareTotal.currency) === null || _defaultFareTotal$cur2 === void 0 ? void 0 : _defaultFareTotal$cur2.code) || "USD", (defaultFareTotal === null || defaultFareTotal === void 0 ? void 0 : defaultFareTotal.amount) / (defaultFareTotal === null || defaultFareTotal === void 0 ? void 0 : (_defaultFareTotal$cur3 = defaultFareTotal.currency) === null || _defaultFareTotal$cur3 === void 0 ? void 0 : _defaultFareTotal$cur3.digits))
        }
      });
    })));
  }

  var tncFare = minTNCFare !== 0 && /*#__PURE__*/React.createElement(S.Fare, null, /*#__PURE__*/React.createElement(S.TNCFare, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TripDetails.tncFare"],
    description: "Text showing the price paid to transportation network companies.",
    id: "otpUi.TripDetails.tncFare",
    values: {
      companies:
      /*#__PURE__*/
      // S.TNCFareCompanies capitalizes the TNC company ID (e.g. "COMPANY")
      // after it is converted to lowercase, so it renders as "Company".
      React.createElement(S.TNCFareCompanies, null, companies.toLowerCase()),
      maxTNCFare: renderFare(currencyCode, maxTNCFare),
      minTNCFare: renderFare(currencyCode, minTNCFare),
      strong: boldText
    }
  })));
  var departureDate = new Date(itinerary.startTime); // Compute total time spent active.
  // TODO: separate into two reducers

  var walkDurationSeconds = 0;
  var bikeDurationSeconds = 0;
  itinerary.legs.forEach(function (leg) {
    if (leg.mode.startsWith("WALK")) walkDurationSeconds += leg.duration;
    if (leg.mode.startsWith("BICYCLE")) bikeDurationSeconds += leg.duration;
  });
  var bikeMinutes = Math.round(bikeDurationSeconds / 60);
  var walkMinutes = Math.round(walkDurationSeconds / 60);
  var minutesActive = bikeMinutes + walkMinutes; // Calculate CO₂ if it's not provided by the itinerary

  var co2 = itinerary.co2 || (co2Config === null || co2Config === void 0 ? void 0 : co2Config.enabled) && coreUtils.itinerary.calculateEmissions(itinerary, co2Config === null || co2Config === void 0 ? void 0 : co2Config.carbonIntensity, co2Config === null || co2Config === void 0 ? void 0 : co2Config.units); // Parse flex info and generate appropriate strings

  var containsFlex = itinerary.legs.some(coreUtils.itinerary.isFlex);
  var pickupBookingInfo = itinerary.legs.map(function (leg) {
    return leg.pickupBookingInfo;
  }).filter(function (info) {
    return !!info;
  });
  var dropOffBookingInfo = itinerary.legs.map(function (leg) {
    return leg.dropOffBookingInfo;
  }).filter(function (info) {
    return !!info;
  });
  var totalDistance = itinerary.legs.reduce(function (total, leg) {
    return total + leg.distance;
  }, 0);
  return /*#__PURE__*/React.createElement(S.TripDetails, {
    className: className
  }, /*#__PURE__*/React.createElement(S.TripDetailsHeader, {
    id: "trip-details-header"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TripDetails.title"],
    description: "Title (heading) text of the component.",
    id: "otpUi.TripDetails.title"
  })), /*#__PURE__*/React.createElement(S.TripDetailsBody, null, /*#__PURE__*/React.createElement(TripDetail // Any custom description for the Departure message needs to be handled by the slot.
  , {
    description: DepartureDetails && /*#__PURE__*/React.createElement(DepartureDetails, {
      departureDate: departureDate
    }),
    icon: /*#__PURE__*/React.createElement(CalendarAlt, {
      size: 17
    }),
    summary: /*#__PURE__*/React.createElement(S.Timing, null, /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TripDetails.departure"],
      description: "Text showing the departure date/time for a trip.",
      id: "otpUi.TripDetails.departure",
      values: {
        departureDate: departureDate,
        strong: boldText
      }
    }))
  }), !!fare && /*#__PURE__*/React.createElement(TripDetail // Any custom description for the transit fare needs to be handled by the slot.
  , {
    description: FareDetails && /*#__PURE__*/React.createElement(FareDetails, {
      legs: itinerary.legs,
      maxTNCFare: maxTNCFare,
      minTNCFare: minTNCFare
    }),
    icon: /*#__PURE__*/React.createElement(MoneyBillAlt, {
      size: 17
    }),
    summary: fare
  }), tncFare && /*#__PURE__*/React.createElement(TripDetail // Any custom description for the transit fare needs to be handled by the slot.
  , {
    description: FareDetails && /*#__PURE__*/React.createElement(FareDetails, {
      legs: itinerary.legs,
      maxTNCFare: maxTNCFare,
      minTNCFare: minTNCFare
    }),
    icon: /*#__PURE__*/React.createElement(MoneyBillAlt, {
      size: 17
    }),
    summary: tncFare
  }), displayTimeActive && minutesActive > 0 && /*#__PURE__*/React.createElement(TripDetail, {
    icon: /*#__PURE__*/React.createElement(Heartbeat, {
      size: 17
    }),
    summary: /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TripDetails.minutesActive"],
      description: "Text showing the number of minutes spent walking or biking throughout trip.",
      id: "otpUi.TripDetails.minutesActive",
      values: {
        minutes: minutesActive,
        strong: boldText
      }
    }),
    description: TimeActiveDetails && /*#__PURE__*/React.createElement(TimeActiveDetails, {
      bikeMinutes: bikeMinutes,
      walkMinutes: walkMinutes
    })
  }), co2 > 0 && (co2Config === null || co2Config === void 0 ? void 0 : co2Config.enabled) && /*#__PURE__*/React.createElement(TripDetail, {
    icon: /*#__PURE__*/React.createElement(Leaf, {
      size: 17
    }),
    summary: /*#__PURE__*/React.createElement(S.CO2Summary, null, /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TripDetails.co2"],
      description: "Text showing the quantity of CO\u2082 emitted by this trip.",
      id: "otpUi.TripDetails.co2",
      values: {
        co2: /*#__PURE__*/React.createElement(FormattedNumber, {
          value: Math.round(co2) // eslint-disable-next-line react/style-prop-object
          ,
          style: "unit",
          unit: (co2Config === null || co2Config === void 0 ? void 0 : co2Config.units) || "gram",
          unitDisplay: "narrow"
        }),
        strong: boldText
      }
    })),
    description: /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TripDetails.co2description"],
      description: "Text explaining how the CO\u2082 emissions are calculated.",
      id: "otpUi.TripDetails.co2description",
      values: {
        link: CO2DescriptionLink,
        totalDistance: totalDistance
      }
    })
  }), containsFlex && /*#__PURE__*/React.createElement(TripDetail, {
    summary: /*#__PURE__*/React.createElement(S.FlexSummary, null, /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TripDetails.tripIncludesFlex"],
      description: "Text stating that portions of the trip include a flex (on-demand) transit service.",
      id: "otpUi.TripDetails.tripIncludesFlex",
      values: {
        extraMessage: _toConsumableArray(new Set([].concat(_toConsumableArray(pickupBookingInfo.map(function (info) {
          return info.message;
        })), _toConsumableArray(dropOffBookingInfo.map(function (info) {
          return info.message;
        }))))).join(" ")
      }
    })),
    icon: /*#__PURE__*/React.createElement(Route, {
      size: 17
    })
  })));
}
export default TripDetails; // Rename styled components for export.

export { S as Styled, FareLegTable };
//# sourceMappingURL=index.js.map