"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _StreetView = require("@styled-icons/fa-solid/StreetView");

var _util = require("../util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Helper method to generate bounding box from a location. Adding the WINDOW to the coordinate
 * creates a bounding box of approximately 1 meter around the coordinate, which is likely to
 * encompass any imagery available.
 * @param coord     The coordinate to convert to a bounding box
 * @returns         A bounding box 1 meter around the passed coordinate
 */
const generateBoundingBoxFromCoordinate = ({
  lat,
  lon
}) => {
  const WINDOW = 0.000075;
  const south = lat - WINDOW;
  const north = lat + WINDOW;
  const west = lon - WINDOW;
  const east = lon + WINDOW;
  return [west, south, east, north];
};

const Container = _styledComponents.default.a.withConfig({
  displayName: "mapillary-button__Container",
  componentId: "sc-l7gdsc-0"
})(["&:hover{cursor:pointer;text-decoration:none;}&:active{color:#111;}&::before{content:\"|\";cursor:auto;margin:0 0.25em;}"]);

const Icon = (0, _styledComponents.default)(_StreetView.StreetView).withConfig({
  displayName: "mapillary-button__Icon",
  componentId: "sc-l7gdsc-1"
})(["height:16px;padding-left:5px;"]);
/**
 * A component which shows a "street view" button if a Mapillary image is available for a
 * passed coordinate
 *
 * @param coords        The coordinates to find imagery for in the format [lat, lon]
 * @param mapillaryKey  A Mapillary api key used to check for imagery.
 * @param clickCallback A method to fire when the button is clicked, which accepts an ID.
 *  If it is not passed, a popup window will be opened. */

const MapillaryButton = ({
  clickCallback,
  coords,
  mapillaryKey
}) => {
  const [imageId, setImageId] = (0, _react.useState)(null);
  const intl = (0, _reactIntl.useIntl)();
  (0, _react.useEffect)(() => {
    // useEffect only supports async actions as a child function
    const getMapillaryId = async () => {
      var _json$data;

      const bounds = generateBoundingBoxFromCoordinate(coords).join(",");
      const raw = await fetch(`https://graph.mapillary.com/images?fields=id&limit=1&access_token=${mapillaryKey}&bbox=${bounds}`);
      const json = await raw.json();

      if ((json === null || json === void 0 ? void 0 : (_json$data = json.data) === null || _json$data === void 0 ? void 0 : _json$data.length) > 0) {
        setImageId(json.data[0].id);
      }
    };

    if (!imageId && !!mapillaryKey) getMapillaryId();
  }, [coords]);

  const handleClick = () => {
    if (clickCallback) clickCallback(imageId);else {
      window.open(`https://www.mapillary.com/embed?image_key=${imageId}`, "_blank", "location=no,height=600,width=600,scrollbars=no,status=no");
    }
  };

  if (!imageId) return null;
  const mapilaryLabel = intl.formatMessage({
    defaultMessage: _util.defaultMessages["otpUi.AccessLegBody.mapillaryTooltip"],
    description: "Tooltip text describing the street view icon.",
    id: "otpUi.AccessLegBody.mapillaryTooltip"
  });
  return /*#__PURE__*/_react.default.createElement(Container, {
    "aria-label": mapilaryLabel,
    onClick: handleClick,
    role: "link",
    title: mapilaryLabel
  }, /*#__PURE__*/_react.default.createElement(Icon, {
    style: {
      paddingBottom: 1
    }
  }));
};

var _default = MapillaryButton;
exports.default = _default;
//# sourceMappingURL=mapillary-button.js.map