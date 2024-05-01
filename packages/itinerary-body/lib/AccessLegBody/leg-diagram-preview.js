"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _reactResizeDetector = _interopRequireDefault(require("react-resize-detector"));

var S = _interopRequireWildcard(require("../styled"));

var _util = require("../util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const METERS_TO_FEET = 3.28084;

function generateSvg(profile, width) {
  const height = 30;
  const {
    points: ptArr,
    traversed
  } = profile;
  let {
    minElev,
    maxElev
  } = profile; // Pad the min-max range by 25m on either side

  minElev -= 25;
  maxElev += 25; // Transform the point array and store it as an SVG-ready string

  const pts = ptArr.map(pt => {
    const x = pt[0] / traversed * width;
    const y = height - height * (pt[1] - minElev) / (maxElev - minElev);
    return `${x},${y}`;
  }).join(" "); // Render the SVG

  return /*#__PURE__*/_react.default.createElement("svg", {
    height: height,
    width: width
  }, /*#__PURE__*/_react.default.createElement("polyline", {
    points: pts,
    fill: "none",
    stroke: "black",
    strokeWidth: 1.3
  }));
}

class LegDiagramPreview extends _react.Component {
  constructor(props) {
    super(props);

    this.onResize = width => {
      if (width > 0) {
        this.setState({
          width
        });
      }
    };

    this.isActive = () => {
      const {
        diagramVisible,
        leg
      } = this.props;
      return diagramVisible && diagramVisible.startTime === leg.startTime;
    };

    this.onExpandClick = () => {
      const {
        leg,
        setLegDiagram
      } = this.props;
      if (this.isActive()) setLegDiagram(null);else setLegDiagram(leg);
    };

    this.formatElevation = elev => `${Math.round(elev)}'`;

    this.state = {
      width: null
    };
  }

  render() {
    const {
      intl,
      leg,
      showElevationProfile
    } = this.props;
    const {
      width
    } = this.state;
    if (!showElevationProfile) return null;

    const profile = _coreUtils.default.itinerary.getElevationProfile(leg.steps); // Don't show for very short legs


    if (leg.distance < 500 || leg.mode === "CAR") return null;
    return /*#__PURE__*/_react.default.createElement(S.PreviewContainer, {
      active: this.isActive()
    }, /*#__PURE__*/_react.default.createElement(S.PreviewDiagram, {
      onClick: this.onExpandClick,
      role: "button",
      tabIndex: 0 // This is shown in a tooltip, so use intl.formatMessage.
      ,
      title: intl.formatMessage({
        defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.LegDiagramPreview.toggleElevationChart"],
        description: "Tooltip text describing the toggling of the elevation chart.",
        id: "otpUi.AccessLegBody.LegDiagramPreview.toggleElevationChart"
      })
    }, /*#__PURE__*/_react.default.createElement(S.PreviewDiagramTitle, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.LegDiagramPreview.elevationChart"],
      description: "Title text for elevation chart",
      id: "otpUi.AccessLegBody.LegDiagramPreview.elevationChart"
    }), /*#__PURE__*/_react.default.createElement(S.PreviewDiagramElevationGain, null, "\u2191", this.formatElevation(profile.gain * METERS_TO_FEET)), /*#__PURE__*/_react.default.createElement(S.PreviewDiagramElevationLoss, null, "\u2193", this.formatElevation(-profile.loss * METERS_TO_FEET))), profile.points.length > 0 ? generateSvg(profile, width) : /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.LegDiagramPreview.noElevationData"],
      description: "Text shown if no elevation data is available.",
      id: "otpUi.AccessLegBody.LegDiagramPreview.noElevationData"
    }), /*#__PURE__*/_react.default.createElement(_reactResizeDetector.default, {
      handleWidth: true,
      onResize: this.onResize
    })));
  }

}

var _default = (0, _reactIntl.injectIntl)(LegDiagramPreview);

exports.default = _default;
//# sourceMappingURL=leg-diagram-preview.js.map