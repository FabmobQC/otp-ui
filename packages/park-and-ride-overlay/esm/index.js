import { Styled as BaseMapStyled, MarkerWithPopup } from "@opentripplanner/base-map";
import FromToLocationPicker from "@opentripplanner/from-to-location-picker"; // eslint-disable-next-line @typescript-eslint/no-unused-vars

import React from "react";
import ParkAndRideMarker from "./park-and-ride-marker";

var ParkAndRideOverlay = function ParkAndRideOverlay(props) {
  var parkAndRideLocations = props.parkAndRideLocations,
      setLocation = props.setLocation;
  if (!parkAndRideLocations || parkAndRideLocations.length === 0) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, parkAndRideLocations.map(function (location, k) {
    // TODO: extract park-and-ride names from international "Park-And-Ride" string constructs.
    var name = location.name.startsWith("P+R ") ? location.name.substring(4) : location.name;
    return /*#__PURE__*/React.createElement(MarkerWithPopup // TODO: find a better way to handle popupProps
    // @ts-expect-error lat and lng aren't optional, but are being set by the child
    , {
      popupProps: {
        offset: 10
      },
      popupContents: /*#__PURE__*/React.createElement(BaseMapStyled.MapOverlayPopup, null, /*#__PURE__*/React.createElement(BaseMapStyled.PopupTitle, null, name), /*#__PURE__*/React.createElement(BaseMapStyled.PopupRow, null, /*#__PURE__*/React.createElement(FromToLocationPicker, {
        label: true,
        location: {
          lat: location.y,
          lon: location.x,
          name: name
        },
        setLocation: setLocation
      }))),
      key: k,
      position: [location.y, location.x]
    }, /*#__PURE__*/React.createElement(ParkAndRideMarker, null));
  }));
};

export default ParkAndRideOverlay;
//# sourceMappingURL=index.js.map