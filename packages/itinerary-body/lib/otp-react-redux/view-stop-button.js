"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var S = _interopRequireWildcard(require("../styled"));

var _util = require("../util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class ViewStopButton extends _react.Component {
  constructor(...args) {
    super(...args);

    this.onClick = () => {
      const {
        onStopClick,
        stop,
        stopId
      } = this.props;
      onStopClick({ ...stop,
        stopId: "gtfsId" in stop ? stop.gtfsId : stopId
      });
    };
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(S.ViewerButton, {
      onClick: this.onClick
    }, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: _util.defaultMessages["otpUi.TransitLegBody.stopViewer"],
      description: "Text for link that opens the stop viewer",
      id: "otpUi.TransitLegBody.stopViewer"
    }));
  }

}

exports.default = ViewStopButton;
//# sourceMappingURL=view-stop-button.js.map