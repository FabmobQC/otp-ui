import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { StreetView } from "@styled-icons/fa-solid/StreetView";
import { defaultMessages } from "../util";
/**
 * Helper method to generate bounding box from a location. Adding the WINDOW to the coordinate
 * creates a bounding box of approximately 1 meter around the coordinate, which is likely to
 * encompass any imagery available.
 * @param coord     The coordinate to convert to a bounding box
 * @returns         A bounding box 1 meter around the passed coordinate
 */

var generateBoundingBoxFromCoordinate = function generateBoundingBoxFromCoordinate(_ref) {
  var lat = _ref.lat,
      lon = _ref.lon;
  var WINDOW = 0.000075;
  var south = lat - WINDOW;
  var north = lat + WINDOW;
  var west = lon - WINDOW;
  var east = lon + WINDOW;
  return [west, south, east, north];
};

var Container = styled.a.withConfig({
  displayName: "mapillary-button__Container",
  componentId: "sc-l7gdsc-0"
})(["&:hover{cursor:pointer;text-decoration:none;}&:active{color:#111;}&::before{content:\"|\";cursor:auto;margin:0 0.25em;}"]);
var Icon = styled(StreetView).withConfig({
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

var MapillaryButton = function MapillaryButton(_ref2) {
  var clickCallback = _ref2.clickCallback,
      coords = _ref2.coords,
      mapillaryKey = _ref2.mapillaryKey;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      imageId = _useState2[0],
      setImageId = _useState2[1];

  var intl = useIntl();
  useEffect(function () {
    // useEffect only supports async actions as a child function
    var getMapillaryId = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _json$data;

        var bounds, raw, json;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                bounds = generateBoundingBoxFromCoordinate(coords).join(",");
                _context.next = 3;
                return fetch("https://graph.mapillary.com/images?fields=id&limit=1&access_token=".concat(mapillaryKey, "&bbox=").concat(bounds));

              case 3:
                raw = _context.sent;
                _context.next = 6;
                return raw.json();

              case 6:
                json = _context.sent;

                if ((json === null || json === void 0 ? void 0 : (_json$data = json.data) === null || _json$data === void 0 ? void 0 : _json$data.length) > 0) {
                  setImageId(json.data[0].id);
                }

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function getMapillaryId() {
        return _ref3.apply(this, arguments);
      };
    }();

    if (!imageId && !!mapillaryKey) getMapillaryId();
  }, [coords]);

  var handleClick = function handleClick() {
    if (clickCallback) clickCallback(imageId);else {
      window.open("https://www.mapillary.com/embed?image_key=".concat(imageId), "_blank", "location=no,height=600,width=600,scrollbars=no,status=no");
    }
  };

  if (!imageId) return null;
  var mapilaryLabel = intl.formatMessage({
    defaultMessage: defaultMessages["otpUi.AccessLegBody.mapillaryTooltip"],
    description: "Tooltip text describing the street view icon.",
    id: "otpUi.AccessLegBody.mapillaryTooltip"
  });
  return /*#__PURE__*/React.createElement(Container, {
    "aria-label": mapilaryLabel,
    onClick: handleClick,
    role: "link",
    title: mapilaryLabel
  }, /*#__PURE__*/React.createElement(Icon, {
    style: {
      paddingBottom: 1
    }
  }));
};

export default MapillaryButton;
//# sourceMappingURL=mapillary-button.js.map