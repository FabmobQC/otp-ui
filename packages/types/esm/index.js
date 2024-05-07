/**
 * This file contains type definitions for types
 * used across more than one package in this repo.
 */

/**
 * Shape for a transportation company.
 */

/**
 * Describes some options to help display data about a transit agency that is
 * configured in an opentripplanner instance.
 */

/**
 * Describes a map entity to be rendered.
 */

/**
 * The symbol-representing component to draw; with the signature
 * ({ entity: object; zoom: number }) => Element
 * where entity must have an id attribute and contain coordinates information for placement on the map.
 */

/**
 * Defines which symbol to render based on a zoom level; and optionally by entity type.
 * (Only one symbol is rendered for any zoom level.)
 */

/**
 * Describes the objects from the real-time vehicle service.
 */

/**
 * Represents the expected configuration of the webapp.
 *
 * Note: this is an incomplete type mapping.
 */

/**
 * Represents steps in a leg in an itinerary of an OTP plan response. These are
 * only for non-transit modes.
 * See documentation here: http://otp-docs.ibi-transit.com/api/json_WalkStep.html
 */

/**
 * Describe an origin, destination, or intermediate location in an itinerary.
 */

/**
 * Holds contact info and lead time for flex transit bookings.
 * The information is optional and is for reminding the end-user
 * of any advance reservations required prior to travel.
 */

/** Dropoff-specific flex booking information */

/** Pickup-specific flex booking information */

/** Basic transit route attributes */

/** Transit route attributes from itinerary legs */

/**
 * Represents a leg in an itinerary of an OTP plan response. Each leg represents
 * a portion of the overall itinerary that is done until either reaching the
 * destination or transitioning to another mode of travel. See OTP webservice
 * documentation here:
 * http://otp-docs.ibi-transit.com/api/json_Leg.html
 */

/**
 * Describes the cost of an itinerary leg.
 */

/**
 * Represents an itinerary of an OTP plan response. See detailed documentation
 * in OTP webservice documentation here:
 * http://otp-docs.ibi-transit.com/api/json_Itinerary.html
 */

/**
 * In many places all we need from the Itinerary is the legs,
 * this type makes all the other types optional except legs.
 */

/**
 * Used to model a location that is used in planning a trip.
 */

/**
 * Alias for a commonly used basic type
 */

/**
 * Describes a transit stop entity to be rendered on the map.
 */

/**
 * This models data about a stop and it's associated routes that is obtained
 * from a transit index API.
 */

/**
 * Depending on the geocoder that is used, more properties than just the `label`
 * property might be provided by the geocoder. For example, with the Pelias
 * geocoder, properties such as `id`, `layer`, `source` are also included.
 */

/**
 * Describes a user location such as "home", "work" etc.
 */

/**
 * Associates a location with a type string.
 */

/**
 * Parameters for "clear location" event handlers.
 */

/**
 * Parameters for location actions/event handlers.
 */

/**
 * Supports leg icons for itinerary body and printable itinerary.
 */

/**
 * Supports displaying accessibility ratings as a set of thresholds
 * associated with an icon or text.
 */
export var ModeSettingTypes = {
  CHECKBOX: "CHECKBOX",
  DROPDOWN: "DROPDOWN",
  SLIDER: "SLIDER"
};
//# sourceMappingURL=index.js.map