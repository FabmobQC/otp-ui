import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from "react";
import styled from "styled-components";
import { Transfer } from "@styled-icons/boxicons-regular/Transfer";
import { getItineraryCost, getLegCost, getLegRouteName } from "@opentripplanner/core-utils/lib/itinerary";
import { useIntl } from "react-intl";
import { flatten } from "flat";
import { boldText, renderFare } from "./utils";
// Load the default messages.
import defaultEnglishMessages from "../i18n/en-US.yml"; // HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.

var defaultMessages = flatten(defaultEnglishMessages);
var TableHeader = styled.thead.withConfig({
  displayName: "fare-table__TableHeader",
  componentId: "sc-i0o2oh-0"
})(["th{font-weight:normal;min-width:5ch;padding:0.75em 1.5em;text-align:center;}th:nth-of-type(2n + 1){background:#cccccc22;}th.main{background:#333333;color:#ffffffcc;}"]);
var Table = styled.table.withConfig({
  displayName: "fare-table__Table",
  componentId: "sc-i0o2oh-1"
})(["border-collapse:collapse;display:block;margin-bottom:16px;padding:0;td{text-align:right;}td:nth-of-type(2n + 1){background:#cccccc22;}td.no-zebra{background:none;}th:first-of-type{height:40px;}"]);
var TransferIcon = styled(Transfer).withConfig({
  displayName: "fare-table__TransferIcon",
  componentId: "sc-i0o2oh-2"
})(["padding-left:4px;"]);

var useGetHeaderString = function useGetHeaderString(headerKey) {
  var intl = useIntl();
  return intl.formatMessage({
    id: "otpUi.TripDetails.FareTable.".concat(headerKey),
    description: "Fare leg table header for key ".concat(headerKey),
    defaultMessage: defaultEnglishMessages["otpUi.TripDetails.FareTable.".concat(headerKey)]
  });
};

var FareTypeTable = function FareTypeTable(_ref) {
  var cols = _ref.cols,
      headerKey = _ref.headerKey,
      legs = _ref.legs;
  var intl = useIntl(); // FIXME: Is there a nicer way to do this?

  var colsToRender = cols.map(function (col) {
    return _objectSpread(_objectSpread({}, col), {}, {
      total: getItineraryCost(legs, col.mediumId, col.riderCategoryId)
    });
  }).filter(function (col) {
    return col.total !== undefined;
  });
  var headerString = useGetHeaderString(headerKey);
  var filteredLegs = legs.filter(function (leg) {
    var _leg$fareProducts;

    return ((_leg$fareProducts = leg.fareProducts) === null || _leg$fareProducts === void 0 ? void 0 : _leg$fareProducts.length) > 0;
  });

  if (colsToRender.length) {
    return /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement("th", {
      className: "main",
      scope: "col"
    }, boldText(headerString)), colsToRender.map(function (col) {
      var _fare$currency;

      var fare = col.total;
      return /*#__PURE__*/React.createElement("th", {
        scope: "col",
        key: col.columnHeaderKey || "".concat(col.mediumId, "-").concat(col.riderCategoryId)
      }, boldText(useGetHeaderString(col.columnHeaderKey)), /*#__PURE__*/React.createElement("br", null), renderFare(fare === null || fare === void 0 ? void 0 : (_fare$currency = fare.currency) === null || _fare$currency === void 0 ? void 0 : _fare$currency.code, (fare === null || fare === void 0 ? void 0 : fare.amount) || 0));
    })), filteredLegs.map(function (leg, index) {
      return /*#__PURE__*/React.createElement("tr", {
        key: index
      }, /*#__PURE__*/React.createElement("td", {
        className: "no-zebra"
      }, getLegRouteName(leg)), colsToRender.map(function (col) {
        var _fare$transferAmount, _fare$transferAmount2, _fare$price, _fare$price$currency, _fare$transferAmount3, _fare$price2, _fare$price2$currency, _fare$price3;

        var fare = getLegCost(leg, col.mediumId, col.riderCategoryId);
        return /*#__PURE__*/React.createElement("td", {
          key: col.columnHeaderKey,
          title: "transferAmount" in fare && (fare === null || fare === void 0 ? void 0 : (_fare$transferAmount = fare.transferAmount) === null || _fare$transferAmount === void 0 ? void 0 : _fare$transferAmount.amount) > 0 && intl.formatMessage({
            defaultMessage: defaultMessages["otpUi.TripDetails.transferDiscountExplanation"],
            description: "Text explaining the transfer discount applied to this fare.",
            id: "otpUi.TripDetails.transferDiscountExplanation"
          }, {
            transferAmount: intl.formatNumber(fare === null || fare === void 0 ? void 0 : (_fare$transferAmount2 = fare.transferAmount) === null || _fare$transferAmount2 === void 0 ? void 0 : _fare$transferAmount2.amount, {
              currency: fare === null || fare === void 0 ? void 0 : (_fare$price = fare.price) === null || _fare$price === void 0 ? void 0 : (_fare$price$currency = _fare$price.currency) === null || _fare$price$currency === void 0 ? void 0 : _fare$price$currency.code,
              currencyDisplay: "narrowSymbol",
              style: "currency"
            })
          })
        }, "transferAmount" in fare && (fare === null || fare === void 0 ? void 0 : (_fare$transferAmount3 = fare.transferAmount) === null || _fare$transferAmount3 === void 0 ? void 0 : _fare$transferAmount3.amount) > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TransferIcon, {
          size: 16
        }), " "), renderFare(fare === null || fare === void 0 ? void 0 : (_fare$price2 = fare.price) === null || _fare$price2 === void 0 ? void 0 : (_fare$price2$currency = _fare$price2.currency) === null || _fare$price2$currency === void 0 ? void 0 : _fare$price2$currency.code, (fare === null || fare === void 0 ? void 0 : (_fare$price3 = fare.price) === null || _fare$price3 === void 0 ? void 0 : _fare$price3.amount) || 0));
      }));
    }));
  }

  return null;
};

var FareLegTable = function FareLegTable(_ref2) {
  var layout = _ref2.layout,
      legs = _ref2.legs;
  // the layout argument contains an object for every table to be displayed
  return /*#__PURE__*/React.createElement("div", null, layout.map(function (config) {
    return /*#__PURE__*/React.createElement(FareTypeTable, {
      cols: config.cols,
      headerKey: config.headerKey,
      key: config.headerKey,
      legs: legs
    });
  }));
};

export default FareLegTable;
//# sourceMappingURL=fare-table.js.map