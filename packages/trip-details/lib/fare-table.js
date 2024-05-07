"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Transfer = require("@styled-icons/boxicons-regular/Transfer");

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _reactIntl = require("react-intl");

var _flat = require("flat");

var _utils = require("./utils");

var _enUS = _interopRequireDefault(require("../i18n/en-US.yml"));

// Load the default messages.
// HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.
const defaultMessages = (0, _flat.flatten)(_enUS.default);

const TableHeader = _styledComponents.default.thead.withConfig({
  displayName: "fare-table__TableHeader",
  componentId: "sc-i0o2oh-0"
})(["th{font-weight:normal;min-width:5ch;padding:0.75em 1.5em;text-align:center;}th:nth-of-type(2n + 1){background:#cccccc22;}th.main{background:#333333;color:#ffffffcc;}"]);

const Table = _styledComponents.default.table.withConfig({
  displayName: "fare-table__Table",
  componentId: "sc-i0o2oh-1"
})(["border-collapse:collapse;display:block;margin-bottom:16px;padding:0;td{text-align:right;}td:nth-of-type(2n + 1){background:#cccccc22;}td.no-zebra{background:none;}th:first-of-type{height:40px;}"]);

const TransferIcon = (0, _styledComponents.default)(_Transfer.Transfer).withConfig({
  displayName: "fare-table__TransferIcon",
  componentId: "sc-i0o2oh-2"
})(["padding-left:4px;"]);

const useGetHeaderString = headerKey => {
  const intl = (0, _reactIntl.useIntl)();
  return intl.formatMessage({
    id: `otpUi.TripDetails.FareTable.${headerKey}`,
    description: `Fare leg table header for key ${headerKey}`,
    defaultMessage: _enUS.default[`otpUi.TripDetails.FareTable.${headerKey}`]
  });
};

const FareTypeTable = ({
  cols,
  headerKey,
  legs
}) => {
  const intl = (0, _reactIntl.useIntl)(); // FIXME: Is there a nicer way to do this?

  const colsToRender = cols.map(col => ({ ...col,
    total: (0, _itinerary.getItineraryCost)(legs, col.mediumId, col.riderCategoryId)
  })).filter(col => col.total !== undefined);
  const headerString = useGetHeaderString(headerKey);
  const filteredLegs = legs.filter(leg => {
    var _leg$fareProducts;

    return ((_leg$fareProducts = leg.fareProducts) === null || _leg$fareProducts === void 0 ? void 0 : _leg$fareProducts.length) > 0;
  });

  if (colsToRender.length) {
    return /*#__PURE__*/_react.default.createElement(Table, null, /*#__PURE__*/_react.default.createElement(TableHeader, null, /*#__PURE__*/_react.default.createElement("th", {
      className: "main",
      scope: "col"
    }, (0, _utils.boldText)(headerString)), colsToRender.map(col => {
      var _fare$currency;

      const fare = col.total;
      return /*#__PURE__*/_react.default.createElement("th", {
        scope: "col",
        key: col.columnHeaderKey || `${col.mediumId}-${col.riderCategoryId}`
      }, (0, _utils.boldText)(useGetHeaderString(col.columnHeaderKey)), /*#__PURE__*/_react.default.createElement("br", null), (0, _utils.renderFare)(fare === null || fare === void 0 ? void 0 : (_fare$currency = fare.currency) === null || _fare$currency === void 0 ? void 0 : _fare$currency.code, (fare === null || fare === void 0 ? void 0 : fare.amount) || 0));
    })), filteredLegs.map((leg, index) => /*#__PURE__*/_react.default.createElement("tr", {
      key: index
    }, /*#__PURE__*/_react.default.createElement("td", {
      className: "no-zebra"
    }, (0, _itinerary.getLegRouteName)(leg)), colsToRender.map(col => {
      var _fare$transferAmount, _fare$transferAmount2, _fare$price, _fare$price$currency, _fare$transferAmount3, _fare$price2, _fare$price2$currency, _fare$price3;

      const fare = (0, _itinerary.getLegCost)(leg, col.mediumId, col.riderCategoryId);
      return /*#__PURE__*/_react.default.createElement("td", {
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
      }, "transferAmount" in fare && (fare === null || fare === void 0 ? void 0 : (_fare$transferAmount3 = fare.transferAmount) === null || _fare$transferAmount3 === void 0 ? void 0 : _fare$transferAmount3.amount) > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(TransferIcon, {
        size: 16
      }), " "), (0, _utils.renderFare)(fare === null || fare === void 0 ? void 0 : (_fare$price2 = fare.price) === null || _fare$price2 === void 0 ? void 0 : (_fare$price2$currency = _fare$price2.currency) === null || _fare$price2$currency === void 0 ? void 0 : _fare$price2$currency.code, (fare === null || fare === void 0 ? void 0 : (_fare$price3 = fare.price) === null || _fare$price3 === void 0 ? void 0 : _fare$price3.amount) || 0));
    }))));
  }

  return null;
};

const FareLegTable = ({
  layout,
  legs
}) => {
  // the layout argument contains an object for every table to be displayed
  return /*#__PURE__*/_react.default.createElement("div", null, layout.map(config => /*#__PURE__*/_react.default.createElement(FareTypeTable, {
    cols: config.cols,
    headerKey: config.headerKey,
    key: config.headerKey,
    legs: legs
  })));
};

var _default = FareLegTable;
exports.default = _default;
//# sourceMappingURL=fare-table.js.map