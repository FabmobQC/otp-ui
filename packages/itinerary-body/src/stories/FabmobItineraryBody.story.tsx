import React, { ReactElement } from "react";

import ItineraryBody from "..";

import ItineraryBodyDefaultsWrapper from "./itinerary-body-defaults-wrapper";

// import mock itinaries. These are all trip plan outputs from OTP.
const walkTransitWalkItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/fabmob/bike-stop-bike.json");

export default {
  title: "ItineraryBody/FabMob",
  component: ItineraryBody
};

export const BikeStopBikeItinerary = (): ReactElement => (
  <ItineraryBodyDefaultsWrapper itinerary={walkTransitWalkItinerary} />
);
