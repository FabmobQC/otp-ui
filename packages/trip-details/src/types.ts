// Prettier does not recognize the import type syntax.
// eslint-disable-next-line prettier/prettier
import type { FareDetails, Money, Itinerary, Leg, Fare, } from "@opentripplanner/types";
import type { ReactElement } from "react";

export interface CaloriesDetailsProps {
  bikeSeconds: number;
  calories: number;
  walkSeconds: number;
}

export interface DepartureDetailsProps {
  departureDate: Date;
}

export interface FareDetailsLayout {
  cols: {
    i18nKey: string;
    key: string;
  }[];
  headeri18nKey: string;
}
export interface TransitFareData {
  [key: string]: Money
}

export interface FareDetailsProps {
  transitFares?: TransitFareData;
  transitFareDetails?: FareDetails;
  legs?: Leg[];
  layout?: FareDetailsLayout[];
}

export interface TransitFareProps {
  fareKey: string;
  fareNameFallback?: ReactElement;
  fareKeyNameMap: {
    [key: string]: string;
  };
  transitFares: Fare;
}

export interface TripDetailsProps {
  /**
   * Slot for a custom component to render the expandable section for calories.
   */
  CaloriesDetails?: React.ElementType<CaloriesDetailsProps>;
  /**
   * Used for additional styling with styled components for example.
   */
  className?: string;
  /**
   * Determines which transit fare should be displayed by default, should there be multiple transit fare types.
   */
  defaultFareKey?: string;
  /**
   * Slot for a custom component to render the expandable section for departure.
   */
  DepartureDetails?: React.ElementType<DepartureDetailsProps>;
  /**
  * Slot for a custom component to render the expandable section for fares.
  */
  FareDetails?: React.ElementType<FareDetailsProps>;
  /**
   * Mapping between fare keys and human-readable names for them.
   */
  fareKeyNameMap?: {
    [name: string]: string;
  };
  /**
   * Column and table configuration for fare details/fare by leg table.
   */
  fareDetailsLayout?: FareDetailsLayout[];
  /**
   * Itinerary that the user has selected to view, contains multiple legs.
   */
  itinerary: Itinerary;
}
