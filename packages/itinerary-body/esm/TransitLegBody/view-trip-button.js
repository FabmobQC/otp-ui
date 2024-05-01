import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import * as S from "../styled";
import { defaultMessages } from "../util";

var ViewTripButton = /*#__PURE__*/function (_Component) {
  _inherits(ViewTripButton, _Component);

  var _super = _createSuper(ViewTripButton);

  function ViewTripButton() {
    var _this;

    _classCallCheck(this, ViewTripButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.onClick = function () {
      var _this$props = _this.props,
          fromIndex = _this$props.fromIndex,
          fromStopId = _this$props.fromStopId,
          setViewedTrip = _this$props.setViewedTrip,
          toIndex = _this$props.toIndex,
          toStopId = _this$props.toStopId,
          tripId = _this$props.tripId;

      if (fromIndex || toIndex) {
        setViewedTrip({
          fromIndex: fromIndex,
          toIndex: toIndex,
          tripId: tripId
        });
      } else {
        setViewedTrip({
          fromStopId: fromStopId,
          toStopId: toStopId,
          tripId: tripId
        });
      }
    };

    return _this;
  }

  _createClass(ViewTripButton, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(S.ViewerButton, {
        onClick: this.onClick,
        type: "button"
      }, /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TransitLegBody.tripViewer"],
        description: "Link text to the trip viewer",
        id: "otpUi.TransitLegBody.tripViewer"
      }));
    }
  }]);

  return ViewTripButton;
}(Component);

export default ViewTripButton;
//# sourceMappingURL=view-trip-button.js.map