import React from "react";
import { ComponentMeta } from "@storybook/react";

import LocationField from "..";
import {
  currentPosition,
  geocoderConfig,
  getCurrentPosition,
  onLocationSelected,
  selectedLocation
} from "./common";

export default {
  component: LocationField,
  parameters: {
    // Hide all controls
    // (there are no args that the user can interactively change for this component).
    controls: {
      hideNoControlsWarning: true,
      include: []
    }
  },
  title: "LocationField/Fabmob"
} as ComponentMeta<typeof LocationField>;

export const AdditionalPlace = (): JSX.Element => (
  <LocationField
    currentPosition={currentPosition}
    geocoderConfig={geocoderConfig}
    getCurrentPosition={getCurrentPosition}
    location={selectedLocation}
    locationType="additional-place-1"
    onLocationSelected={onLocationSelected}
  />
);
