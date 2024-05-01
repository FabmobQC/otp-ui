"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFromToAnchors = getFromToAnchors;
exports.itineraryToTransitive = itineraryToTransitive;
exports.default = exports.drawArc = void 0;

var _lineArc = _interopRequireDefault(require("@turf/line-arc"));

var _lineDistance = _interopRequireDefault(require("@turf/line-distance"));

var _midpoint = _interopRequireDefault(require("@turf/midpoint"));

var _destination = _interopRequireDefault(require("@turf/destination"));

var _bearing = _interopRequireDefault(require("@turf/bearing"));

var _distance = _interopRequireDefault(require("@turf/distance"));

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _itineraryBody = require("@opentripplanner/itinerary-body");

const CAR_PARK_ITIN_PREFIX = "itin_car_";
/**
 * Helper function to convert a stop from an itinerary leg
 * to a TransitiveStop for rendering on the map.
 */

function stopToTransitive(stop, knownStopNames) {
  // Collapse case and spaces for comparison.
  // ("Midtown Station" and "Midtown   STATION" are considered the same name.)
  const normalizedStopName = stop.name.trim().replace(/\s+/g, " ");
  const normalizedStopNameKey = normalizedStopName.toLowerCase();
  const stopNameExists = knownStopNames[normalizedStopNameKey];
  if (!stopNameExists) knownStopNames[normalizedStopNameKey] = stop;
  return {
    stop_id: stop.stopId,
    // Don't render this stop name if another one or similar exists.
    stop_name: stopNameExists ? null : normalizedStopName,
    stop_lat: stop.lat,
    stop_lon: stop.lon
  };
}
/**
 * Helper function to add a stop, checking whether a stop id and name has already been added.
 */


function addStop(stop, stops, knownStopNames) {
  const {
    stopId
  } = stop;

  if (!stops[stopId]) {
    stops[stopId] = stopToTransitive(stop, knownStopNames);
  }
}
/**
 * Helper function to add the origin and destination locations.
 */


function makeFromToPlace(place, id) {
  return {
    placeId: id,
    place_lat: place.lat,
    place_lon: place.lon,
    place_name: place.name,
    type: id
  };
}

function getFromToAnchors(transitiveData) {
  const fromPlace = transitiveData.places.find(pl => pl.placeId === "from");
  const toPlace = transitiveData.places.find(pl => pl.placeId === "to"); // Compute general direction of travel to better position from/to markers.

  let direction;

  if (fromPlace && toPlace) {
    const directionLat = fromPlace.place_lat < toPlace.place_lat ? "N" : "S";
    const directionLon = fromPlace.place_lon < toPlace.place_lon ? "E" : "W";
    direction = `${directionLat}${directionLon}`;
  }

  let fromAnchor;
  let toAnchor;

  switch (direction) {
    case "NE":
      fromAnchor = "top-right";
      toAnchor = "bottom-left";
      break;

    case "NW":
      fromAnchor = "top-left";
      toAnchor = "bottom-right";
      break;

    case "SE":
      fromAnchor = "bottom-right";
      toAnchor = "top-left";
      break;

    case "SW":
      fromAnchor = "bottom-left";
      toAnchor = "top-right";
      break;

    default:
  }

  return {
    fromAnchor,
    toAnchor
  };
}
/**
 * Builds a from/to place id string for the given leg.
 */


function getPlaceId(fromTo, streetEdgeId, leg, otherLeg, forcedVertexType) {
  const {
    mode
  } = leg;
  const {
    bikeShareId,
    name,
    vertexType: legVertexType
  } = leg[fromTo];
  const vertexType = forcedVertexType || legVertexType;
  let placeId;

  if (bikeShareId) {
    placeId = `bicycle_rent_station_${bikeShareId}`;

    if ( // OTP2 Scooter case
    mode === "SCOOTER") {
      placeId = `escooter_rent_station_${bikeShareId}`;
    }
  } else if (vertexType === "VEHICLERENTAL") {
    // OTP1 Scooter case
    placeId = `escooter_rent_station_${name}`;
  } else if (mode === "CAR" && (otherLeg === null || otherLeg === void 0 ? void 0 : otherLeg.mode) === "WALK") {
    // create a special place ID for car legs preceded/followed by walking legs
    placeId = `${CAR_PARK_ITIN_PREFIX}${streetEdgeId}_${fromTo}`;
  } else {
    placeId = `itin_street_${streetEdgeId}_${fromTo}`;
  }

  return placeId;
}
/**
 * Helper function that overrides stop coordinates with those provided, if any.
 */


function makeStop(stop, coordinate) {
  return coordinate ? { ...stop,
    lat: coordinate[0],
    lon: coordinate[1]
  } : stop;
}
/**
 * Converts an OTP itinerary object to a transtive.js itinerary object.
 * @param {*} itin Required OTP itinerary (see @opentripplanner/core-utils/types#itineraryType) to convert.
 * @param {*} companies Optional list of companies, used for labeling vehicle rental locations.
 * @param {*} getRouteLabel Optional function that takes an itinerary leg (see @opentripplanner/core-utils/types#legType)
 *                          and returns a string representing the route label to display for that leg.
 * @returns An itinerary in the transitive.js format.
 */


function itineraryToTransitive(itin, options) {
  const {
    companies,
    getRouteLabel,
    disableFlexArc,
    intl
  } = options;
  const tdata = {
    journeys: [],
    streetEdges: [],
    places: [],
    patterns: [],
    routes: [],
    stops: []
  };
  const routes = {};
  const knownStopNames = {};
  let patternId = 0;
  const journey = {
    journey_id: "itin",
    // This string is not shown in the UI
    journey_name: "Itinerary-derived Journey",
    segments: []
  };
  const newPlaces = [];
  const newStops = {};
  newPlaces.push(makeFromToPlace(itin.legs[0].from, "from"));
  newPlaces.push(makeFromToPlace(itin.legs[itin.legs.length - 1].to, "to"));
  itin.legs.forEach((leg, idx) => {
    var _itin$legs;

    // OTP2 puts "BIKESHARE" as the vertexType for scooter share legs.
    // Here we fix that by looking ahead at the next leg to find out if it is a scooter.
    const toVertexType = ((_itin$legs = itin.legs[idx + 1]) === null || _itin$legs === void 0 ? void 0 : _itin$legs.mode) === "SCOOTER" ? "VEHICLERENTAL" : leg.to.vertexType;
    const fromVertexType = leg.mode === "SCOOTER" ? "VEHICLERENTAL" : leg.from.vertexType;
    const streetEdgeId = idx; // Show on the map the labels for:
    // - all transit stops for legs with valid geometry (where to get on and get off, including transfer points)
    // - locations of rental bike/scoooter pickup, including floating vehicles
    // - location for dropping off rental vehicles that should be docked
    // - park-and-ride facilities (with a lower display priority than transit stations)
    // - origin/destination, but with a lower display priority than anything above
    //   (i.e. the labels will not be drawn if other text is already rendered there).

    if ((0, _itinerary.isAccessMode)(leg.mode)) {
      const fromPlaceId = getPlaceId("from", streetEdgeId, leg, idx > 0 ? itin.legs[idx - 1] : null);
      const toPlaceId = getPlaceId("to", streetEdgeId, leg, idx < itin.legs.length - 1 ? itin.legs[idx + 1] : null, toVertexType);
      let addFromPlace = false;
      let addToPlace = false;

      if (leg.rentedBike || leg.rentedVehicle || leg.rentedCar) {
        addFromPlace = true; // Only add the "to" portion of rental legs if they involve docking a vehicle on arrival
        // (this is to avoid https://github.com/conveyal/trimet-mod-otp/issues/152).

        if (leg.to.vertexType !== "NORMAL") {
          addToPlace = true;
        }
      } // Add a place and label for park-and-ride facilities in driving legs.
      // Park-and-ride facilities are hinted by car (not TNC, so don't use isCar()) legs followed by walk legs.


      if (leg.mode === "CAR") {
        if (fromPlaceId.startsWith(CAR_PARK_ITIN_PREFIX)) {
          addFromPlace = true;
        }

        if (toPlaceId.startsWith(CAR_PARK_ITIN_PREFIX)) {
          addToPlace = true;
        }
      }

      if (addFromPlace) {
        newPlaces.push({
          placeId: fromPlaceId,
          place_name: (0, _itineraryBody.getPlaceName)({ ...leg.from,
            vertexType: fromVertexType
          }, companies || [], intl),
          place_lat: leg.from.lat,
          place_lon: leg.from.lon,
          type: leg.mode
        });
      }

      if (addToPlace) {
        newPlaces.push({
          placeId: toPlaceId,
          place_name: (0, _itineraryBody.getPlaceName)( // replace the vertex type since we tweaked it above
          { ...leg.to,
            vertexType: toVertexType
          }, companies || [], intl),
          place_lat: leg.to.lat,
          place_lon: leg.to.lon,
          type: leg.mode
        });
      }

      const segment = {
        arc: leg.mode === "CAR" && (0, _itinerary.isRideshareLeg)(leg),
        type: leg.mode,
        streetEdges: [streetEdgeId],
        from: {
          type: "PLACE",
          place_id: fromPlaceId
        },
        to: {
          type: "PLACE",
          place_id: toPlaceId
        }
      };
      journey.segments.push(segment);
      tdata.streetEdges.push({
        edge_id: streetEdgeId,
        geometry: leg.legGeometry
      });
    }

    if (leg.transitLeg || (0, _itinerary.isTransit)(leg.mode)) {
      var _leg$legGeometry;

      // Flex routes sometimes have the same from and to IDs, but
      // these stops still need to be rendered separately!
      if ((0, _itinerary.isFlex)(leg)) {
        leg.to.stopId = `${leg.to.stopId}_flexed_to`;
      } // determine if we have valid inter-stop geometry


      const hasInterStopGeometry = !!leg.interStopGeometry;
      const hasLegGeometry = !!((_leg$legGeometry = leg.legGeometry) !== null && _leg$legGeometry !== void 0 && _leg$legGeometry.points);
      const hasIntermediateStopGeometry = hasInterStopGeometry && leg.intermediateStops && leg.interStopGeometry.length === leg.intermediateStops.length + 1; // Coordinates of the leg geometry, used to draw the stop marker on the line,
      // otherwise the logical stop is often times off the line.

      const legCoords = (0, _itinerary.getLegBounds)(leg); // create leg-specific pattern

      const ptnId = `ptn_${patternId}`;
      const pattern = {
        pattern_id: ptnId,
        // This string is not shown in the UI
        pattern_name: `Pattern ${patternId}`,
        route_id: leg.routeId,
        stops: []
      }; // Add the "from" end of transit legs to the list of stops.

      const fromStop = makeStop(leg.from, hasLegGeometry && legCoords[0]);
      addStop(fromStop, newStops, knownStopNames);
      pattern.stops.push({
        stop_id: leg.from.stopId
      }); // add intermediate stops to stops dictionary and pattern object
      // If there is no intermediateStopGeometry, do not add the intermediate stops
      // as it will be straight lines instead of the nice legGeometry (but only if
      // the legGeometry exists).

      if (leg.intermediateStops && (hasIntermediateStopGeometry || !hasLegGeometry)) {
        leg.intermediateStops.forEach((stop, i) => {
          // FIXME: line up the coordinates of the stops so they appear on the line.
          addStop(stop, newStops, knownStopNames);
          pattern.stops.push({
            stop_id: stop.stopId,
            geometry: hasIntermediateStopGeometry && leg.interStopGeometry[i].points
          });
        });
      } // Add the "to" end of transit legs to the list of stops.
      // (Do not label stop names if they repeat.)


      const lastCoord = hasLegGeometry && legCoords[legCoords.length - 1];
      const toStop = makeStop(leg.to, lastCoord);
      addStop(toStop, newStops, knownStopNames);
      pattern.stops.push({
        stop_id: leg.to.stopId,
        geometry: // Some legs don't have intermediateStopGeometry, but do have valid legGeometry
        (hasInterStopGeometry || hasLegGeometry) && (hasIntermediateStopGeometry ? leg.interStopGeometry[leg.interStopGeometry.length - 1].points : leg.legGeometry.points)
      }); // add route to the route dictionary
      // with a custom route label if specified.

      const routeLabel = typeof getRouteLabel === "function" ? getRouteLabel(leg) : (0, _itinerary.getLegRouteShortName)(leg);
      routes[leg.routeId] = {
        agency_id: leg.agencyId,
        route_id: leg.routeId,
        route_short_name: routeLabel || "",
        route_long_name: (0, _itinerary.getLegRouteLongName)(leg) || "",
        route_type: leg.routeType,
        route_color: leg.routeColor,
        route_text_color: leg.routeTextColor
      }; // add the pattern to the tdata patterns array

      tdata.patterns.push(pattern); // add the pattern reference to the journey object

      journey.segments.push({
        arc: typeof disableFlexArc === "undefined" ? (0, _itinerary.isFlex)(leg) : !disableFlexArc,
        type: "TRANSIT",
        patterns: [{
          pattern_id: ptnId,
          from_stop_index: 0,
          to_stop_index: hasIntermediateStopGeometry ? leg.intermediateStops.length + 2 - 1 : 1
        }]
      });
      patternId++;
    }
  }); // add the routes and stops to the tdata arrays

  tdata.routes = Object.values(routes);
  tdata.stops = Object.values(newStops); // add the journey to the tdata journeys array

  tdata.journeys.push(journey);
  tdata.places = newPlaces; // console.log("derived tdata", tdata);

  return tdata;
} // typescript TODO: TYPE


const drawArc = straight => {
  // Create clone of plain route that only includes first and last point
  straight.coordinates = [straight.coordinates[0], straight.coordinates[straight.coordinates.length - 1]];
  const orig = straight.coordinates[0];
  const dest = straight.coordinates[1]; // Adapted from https://github.com/Turfjs/turf/issues/1218#issuecomment-592421977

  const length = (0, _lineDistance.default)(straight, "kilometers");
  const mp = (0, _midpoint.default)(orig, dest);
  const center = (0, _destination.default)(mp, length, (0, _bearing.default)(orig, dest) - 90);
  return (0, _lineArc.default)(center, (0, _distance.default)(center, orig), (0, _bearing.default)(center, dest), (0, _bearing.default)(center, orig), {
    steps: 500
  }).geometry;
};

exports.drawArc = drawArc;
var _default = {
  itineraryToTransitive
};
exports.default = _default;
//# sourceMappingURL=util.js.map