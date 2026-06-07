import React, { ReactElement } from "react";

import ItineraryBody from "..";

import ItineraryBodyDefaultsWrapper from "./itinerary-body-defaults-wrapper";

// import mock itinaries. These are all trip plan outputs from OTP.
import walkTransitWalkItinerary from "../__mocks__/itineraries/walk-transit-walk.json";

export default {
  title: "ItineraryBody/FabMob",
  component: ItineraryBody
};

export const BikeStopBikeItinerary = (): ReactElement => (
  <ItineraryBodyDefaultsWrapper itinerary={walkTransitWalkItinerary} />
);
