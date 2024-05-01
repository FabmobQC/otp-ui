import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import * as S from "../styled";
import { defaultMessages } from "../util";

var ViewStopButton = /*#__PURE__*/function (_Component) {
  _inherits(ViewStopButton, _Component);

  var _super = _createSuper(ViewStopButton);

  function ViewStopButton() {
    var _this;

    _classCallCheck(this, ViewStopButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.onClick = function () {
      var _this$props = _this.props,
          onStopClick = _this$props.onStopClick,
          stop = _this$props.stop,
          stopId = _this$props.stopId;
      onStopClick(_objectSpread(_objectSpread({}, stop), {}, {
        stopId: "gtfsId" in stop ? stop.gtfsId : stopId
      }));
    };

    return _this;
  }

  _createClass(ViewStopButton, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(S.ViewerButton, {
        onClick: this.onClick
      }, /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TransitLegBody.stopViewer"],
        description: "Text for link that opens the stop viewer",
        id: "otpUi.TransitLegBody.stopViewer"
      }));
    }
  }]);

  return ViewStopButton;
}(Component);

export { ViewStopButton as default };
//# sourceMappingURL=view-stop-button.js.map