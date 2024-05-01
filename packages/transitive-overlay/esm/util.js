import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import lineArc from "@turf/line-arc";
import lineDistance from "@turf/line-distance";
import midpoint from "@turf/midpoint";
import destination from "@turf/destination";
import bearing from "@turf/bearing";
import distance from "@turf/distance";
import { getLegBounds, getLegRouteLongName, getLegRouteShortName, isAccessMode, isFlex, isRideshareLeg, isTransit } from "@opentripplanner/core-utils/lib/itinerary";
import { getPlaceName } from "@opentripplanner/itinerary-body";
var CAR_PARK_ITIN_PREFIX = "itin_car_";
/**
 * Helper function to convert a stop from an itinerary leg
 * to a TransitiveStop for rendering on the map.
 */

function stopToTransitive(stop, knownStopNames) {
  // Collapse case and spaces for comparison.
  // ("Midtown Station" and "Midtown   STATION" are considered the same name.)
  var normalizedStopName = stop.name.trim().replace(/\s+/g, " ");
  var normalizedStopNameKey = normalizedStopName.toLowerCase();
  var stopNameExists = knownStopNames[normalizedStopNameKey];
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
  var stopId = stop.stopId;

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

export function getFromToAnchors(transitiveData) {
  var fromPlace = transitiveData.places.find(function (pl) {
    return pl.placeId === "from";
  });
  var toPlace = transitiveData.places.find(function (pl) {
    return pl.placeId === "to";
  }); // Compute general direction of travel to better position from/to markers.

  var direction;

  if (fromPlace && toPlace) {
    var directionLat = fromPlace.place_lat < toPlace.place_lat ? "N" : "S";
    var directionLon = fromPlace.place_lon < toPlace.place_lon ? "E" : "W";
    direction = "".concat(directionLat).concat(directionLon);
  }

  var fromAnchor;
  var toAnchor;

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
    fromAnchor: fromAnchor,
    toAnchor: toAnchor
  };
}
/**
 * Builds a from/to place id string for the given leg.
 */

function getPlaceId(fromTo, streetEdgeId, leg, otherLeg, forcedVertexType) {
  var mode = leg.mode;
  var _leg$fromTo = leg[fromTo],
      bikeShareId = _leg$fromTo.bikeShareId,
      name = _leg$fromTo.name,
      legVertexType = _leg$fromTo.vertexType;
  var vertexType = forcedVertexType || legVertexType;
  var placeId;

  if (bikeShareId) {
    placeId = "bicycle_rent_station_".concat(bikeShareId);

    if ( // OTP2 Scooter case
    mode === "SCOOTER") {
      placeId = "escooter_rent_station_".concat(bikeShareId);
    }
  } else if (vertexType === "VEHICLERENTAL") {
    // OTP1 Scooter case
    placeId = "escooter_rent_station_".concat(name);
  } else if (mode === "CAR" && (otherLeg === null || otherLeg === void 0 ? void 0 : otherLeg.mode) === "WALK") {
    // create a special place ID for car legs preceded/followed by walking legs
    placeId = "".concat(CAR_PARK_ITIN_PREFIX).concat(streetEdgeId, "_").concat(fromTo);
  } else {
    placeId = "itin_street_".concat(streetEdgeId, "_").concat(fromTo);
  }

  return placeId;
}
/**
 * Helper function that overrides stop coordinates with those provided, if any.
 */


function makeStop(stop, coordinate) {
  return coordinate ? _objectSpread(_objectSpread({}, stop), {}, {
    lat: coordinate[0],
    lon: coordinate[1]
  }) : stop;
}
/**
 * Converts an OTP itinerary object to a transtive.js itinerary object.
 * @param {*} itin Required OTP itinerary (see @opentripplanner/core-utils/types#itineraryType) to convert.
 * @param {*} companies Optional list of companies, used for labeling vehicle rental locations.
 * @param {*} getRouteLabel Optional function that takes an itinerary leg (see @opentripplanner/core-utils/types#legType)
 *                          and returns a string representing the route label to display for that leg.
 * @returns An itinerary in the transitive.js format.
 */


export function itineraryToTransitive(itin, options) {
  var companies = options.companies,
      getRouteLabel = options.getRouteLabel,
      disableFlexArc = options.disableFlexArc,
      intl = options.intl;
  var tdata = {
    journeys: [],
    streetEdges: [],
    places: [],
    patterns: [],
    routes: [],
    stops: []
  };
  var routes = {};
  var knownStopNames = {};
  var patternId = 0;
  var journey = {
    journey_id: "itin",
    // This string is not shown in the UI
    journey_name: "Itinerary-derived Journey",
    segments: []
  };
  var newPlaces = [];
  var newStops = {};
  newPlaces.push(makeFromToPlace(itin.legs[0].from, "from"));
  newPlaces.push(makeFromToPlace(itin.legs[itin.legs.length - 1].to, "to"));
  itin.legs.forEach(function (leg, idx) {
    var _itin$legs;

    // OTP2 puts "BIKESHARE" as the vertexType for scooter share legs.
    // Here we fix that by looking ahead at the next leg to find out if it is a scooter.
    var toVertexType = ((_itin$legs = itin.legs[idx + 1]) === null || _itin$legs === void 0 ? void 0 : _itin$legs.mode) === "SCOOTER" ? "VEHICLERENTAL" : leg.to.vertexType;
    var fromVertexType = leg.mode === "SCOOTER" ? "VEHICLERENTAL" : leg.from.vertexType;
    var streetEdgeId = idx; // Show on the map the labels for:
    // - all transit stops for legs with valid geometry (where to get on and get off, including transfer points)
    // - locations of rental bike/scoooter pickup, including floating vehicles
    // - location for dropping off rental vehicles that should be docked
    // - park-and-ride facilities (with a lower display priority than transit stations)
    // - origin/destination, but with a lower display priority than anything above
    //   (i.e. the labels will not be drawn if other text is already rendered there).

    if (isAccessMode(leg.mode)) {
      var fromPlaceId = getPlaceId("from", streetEdgeId, leg, idx > 0 ? itin.legs[idx - 1] : null);
      var toPlaceId = getPlaceId("to", streetEdgeId, leg, idx < itin.legs.length - 1 ? itin.legs[idx + 1] : null, toVertexType);
      var addFromPlace = false;
      var addToPlace = false;

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
          place_name: getPlaceName(_objectSpread(_objectSpread({}, leg.from), {}, {
            vertexType: fromVertexType
          }), companies || [], intl),
          place_lat: leg.from.lat,
          place_lon: leg.from.lon,
          type: leg.mode
        });
      }

      if (addToPlace) {
        newPlaces.push({
          placeId: toPlaceId,
          place_name: getPlaceName( // replace the vertex type since we tweaked it above
          _objectSpread(_objectSpread({}, leg.to), {}, {
            vertexType: toVertexType
          }), companies || [], intl),
          place_lat: leg.to.lat,
          place_lon: leg.to.lon,
          type: leg.mode
        });
      }

      var segment = {
        arc: leg.mode === "CAR" && isRideshareLeg(leg),
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

    if (leg.transitLeg || isTransit(leg.mode)) {
      var _leg$legGeometry;

      // Flex routes sometimes have the same from and to IDs, but
      // these stops still need to be rendered separately!
      if (isFlex(leg)) {
        leg.to.stopId = "".concat(leg.to.stopId, "_flexed_to");
      } // determine if we have valid inter-stop geometry


      var hasInterStopGeometry = !!leg.interStopGeometry;
      var hasLegGeometry = !!((_leg$legGeometry = leg.legGeometry) !== null && _leg$legGeometry !== void 0 && _leg$legGeometry.points);
      var hasIntermediateStopGeometry = hasInterStopGeometry && leg.intermediateStops && leg.interStopGeometry.length === leg.intermediateStops.length + 1; // Coordinates of the leg geometry, used to draw the stop marker on the line,
      // otherwise the logical stop is often times off the line.

      var legCoords = getLegBounds(leg); // create leg-specific pattern

      var ptnId = "ptn_".concat(patternId);
      var pattern = {
        pattern_id: ptnId,
        // This string is not shown in the UI
        pattern_name: "Pattern ".concat(patternId),
        route_id: leg.routeId,
        stops: []
      }; // Add the "from" end of transit legs to the list of stops.

      var fromStop = makeStop(leg.from, hasLegGeometry && legCoords[0]);
      addStop(fromStop, newStops, knownStopNames);
      pattern.stops.push({
        stop_id: leg.from.stopId
      }); // add intermediate stops to stops dictionary and pattern object
      // If there is no intermediateStopGeometry, do not add the intermediate stops
      // as it will be straight lines instead of the nice legGeometry (but only if
      // the legGeometry exists).

      if (leg.intermediateStops && (hasIntermediateStopGeometry || !hasLegGeometry)) {
        leg.intermediateStops.forEach(function (stop, i) {
          // FIXME: line up the coordinates of the stops so they appear on the line.
          addStop(stop, newStops, knownStopNames);
          pattern.stops.push({
            stop_id: stop.stopId,
            geometry: hasIntermediateStopGeometry && leg.interStopGeometry[i].points
          });
        });
      } // Add the "to" end of transit legs to the list of stops.
      // (Do not label stop names if they repeat.)


      var lastCoord = hasLegGeometry && legCoords[legCoords.length - 1];
      var toStop = makeStop(leg.to, lastCoord);
      addStop(toStop, newStops, knownStopNames);
      pattern.stops.push({
        stop_id: leg.to.stopId,
        geometry: // Some legs don't have intermediateStopGeometry, but do have valid legGeometry
        (hasInterStopGeometry || hasLegGeometry) && (hasIntermediateStopGeometry ? leg.interStopGeometry[leg.interStopGeometry.length - 1].points : leg.legGeometry.points)
      }); // add route to the route dictionary
      // with a custom route label if specified.

      var routeLabel = typeof getRouteLabel === "function" ? getRouteLabel(leg) : getLegRouteShortName(leg);
      routes[leg.routeId] = {
        agency_id: leg.agencyId,
        route_id: leg.routeId,
        route_short_name: routeLabel || "",
        route_long_name: getLegRouteLongName(leg) || "",
        route_type: leg.routeType,
        route_color: leg.routeColor,
        route_text_color: leg.routeTextColor
      }; // add the pattern to the tdata patterns array

      tdata.patterns.push(pattern); // add the pattern reference to the journey object

      journey.segments.push({
        arc: typeof disableFlexArc === "undefined" ? isFlex(leg) : !disableFlexArc,
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

var drawArc = function drawArc(straight) {
  // Create clone of plain route that only includes first and last point
  straight.coordinates = [straight.coordinates[0], straight.coordinates[straight.coordinates.length - 1]];
  var orig = straight.coordinates[0];
  var dest = straight.coordinates[1]; // Adapted from https://github.com/Turfjs/turf/issues/1218#issuecomment-592421977

  var length = lineDistance(straight, "kilometers");
  var mp = midpoint(orig, dest);
  var center = destination(mp, length, bearing(orig, dest) - 90);
  return lineArc(center, distance(center, orig), bearing(center, dest), bearing(center, orig), {
    steps: 500
  }).geometry;
};

export { drawArc };
export default {
  itineraryToTransitive: itineraryToTransitive
};
//# sourceMappingURL=util.js.map