import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { print } from "graphql";
var DefaultPlanQuery = { kind: "Document", definitions: [{ kind: "OperationDefinition", operation: "query", name: { kind: "Name", value: "Plan" }, variableDefinitions: [{ kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "arriveBy" } }, type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }, directives: [] }, { kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "banned" } }, type: { kind: "NamedType", name: { kind: "Name", value: "InputBanned" } }, directives: [] }, { kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "bikeReluctance" } }, type: { kind: "NamedType", name: { kind: "Name", value: "Float" } }, directives: [] }, { kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "carReluctance" } }, type: { kind: "NamedType", name: { kind: "Name", value: "Float" } }, directives: [] }, { kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "date" } }, type: { kind: "NamedType", name: { kind: "Name", value: "String" } }, directives: [] }, { kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "fromPlace" } }, type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } }, directives: [] }, { kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "modes" } }, type: { kind: "ListType", type: { kind: "NamedType", name: { kind: "Name", value: "TransportMode" } } }, directives: [] }, { kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "numItineraries" } }, type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }, directives: [] }, { kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "preferred" } }, type: { kind: "NamedType", name: { kind: "Name", value: "InputPreferred" } }, directives: [] }, { kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "time" } }, type: { kind: "NamedType", name: { kind: "Name", value: "String" } }, directives: [] }, { kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "toPlace" } }, type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } }, directives: [] }, { kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "unpreferred" } }, type: { kind: "NamedType", name: { kind: "Name", value: "InputUnpreferred" } }, directives: [] }, { kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "walkReluctance" } }, type: { kind: "NamedType", name: { kind: "Name", value: "Float" } }, directives: [] }, { kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "walkSpeed" } }, type: { kind: "NamedType", name: { kind: "Name", value: "Float" } }, directives: [] }, { kind: "VariableDefinition", variable: { kind: "Variable", name: { kind: "Name", value: "wheelchair" } }, type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }, directives: [] }], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "plan" }, arguments: [{ kind: "Argument", name: { kind: "Name", value: "arriveBy" }, value: { kind: "Variable", name: { kind: "Name", value: "arriveBy" } } }, { kind: "Argument", name: { kind: "Name", value: "banned" }, value: { kind: "Variable", name: { kind: "Name", value: "banned" } } }, { kind: "Argument", name: { kind: "Name", value: "bikeReluctance" }, value: { kind: "Variable", name: { kind: "Name", value: "bikeReluctance" } } }, { kind: "Argument", name: { kind: "Name", value: "carReluctance" }, value: { kind: "Variable", name: { kind: "Name", value: "carReluctance" } } }, { kind: "Argument", name: { kind: "Name", value: "date" }, value: { kind: "Variable", name: { kind: "Name", value: "date" } } }, { kind: "Argument", name: { kind: "Name", value: "fromPlace" }, value: { kind: "Variable", name: { kind: "Name", value: "fromPlace" } } }, { kind: "Argument", name: { kind: "Name", value: "locale" }, value: { kind: "StringValue", value: "en", block: false } }, { kind: "Argument", name: { kind: "Name", value: "numItineraries" }, value: { kind: "Variable", name: { kind: "Name", value: "numItineraries" } } }, { kind: "Argument", name: { kind: "Name", value: "preferred" }, value: { kind: "Variable", name: { kind: "Name", value: "preferred" } } }, { kind: "Argument", name: { kind: "Name", value: "time" }, value: { kind: "Variable", name: { kind: "Name", value: "time" } } }, { kind: "Argument", name: { kind: "Name", value: "toPlace" }, value: { kind: "Variable", name: { kind: "Name", value: "toPlace" } } }, { kind: "Argument", name: { kind: "Name", value: "transportModes" }, value: { kind: "Variable", name: { kind: "Name", value: "modes" } } }, { kind: "Argument", name: { kind: "Name", value: "unpreferred" }, value: { kind: "Variable", name: { kind: "Name", value: "unpreferred" } } }, { kind: "Argument", name: { kind: "Name", value: "walkReluctance" }, value: { kind: "Variable", name: { kind: "Name", value: "walkReluctance" } } }, { kind: "Argument", name: { kind: "Name", value: "walkSpeed" }, value: { kind: "Variable", name: { kind: "Name", value: "walkSpeed" } } }, { kind: "Argument", name: { kind: "Name", value: "wheelchair" }, value: { kind: "Variable", name: { kind: "Name", value: "wheelchair" } } }], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "itineraries" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "accessibilityScore" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "duration" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "endTime" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "legs" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "accessibilityScore" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "agency" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "alerts" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "alertDescriptionText" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "alertHeaderText" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "alertUrl" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "effectiveStartDate" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "gtfsId" }, arguments: [], directives: [] }, { kind: "Field", alias: { kind: "Name", value: "id" }, name: { kind: "Name", value: "gtfsId" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "name" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "timezone" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "url" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "alerts" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "alertDescriptionText" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "alertHeaderText" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "alertUrl" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "effectiveStartDate" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "arrivalDelay" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "departureDelay" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "distance" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "dropoffType" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "duration" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "endTime" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "fareProducts" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "product" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "__typename" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "medium" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "name" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "name" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "riderCategory" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "name" }, arguments: [], directives: [] }] } }, { kind: "InlineFragment", typeCondition: { kind: "NamedType", name: { kind: "Name", value: "DefaultFareProduct" } }, directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "price" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "amount" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "currency" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "code" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "digits" }, arguments: [], directives: [] }] } }] } }] } }] } }] } }, { kind: "Field", name: { kind: "Name", value: "from" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "lat" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "lon" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "name" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "rentalVehicle" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "network" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "stop" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "alerts" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "alertDescriptionText" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "alertHeaderText" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "alertUrl" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "effectiveStartDate" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "code" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "gtfsId" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "lat" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "lon" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "vertexType" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "headsign" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "interlineWithPreviousLeg" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "intermediateStops" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "lat" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "locationType" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "lon" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "name" }, arguments: [], directives: [] }, { kind: "Field", alias: { kind: "Name", value: "stopCode" }, name: { kind: "Name", value: "code" }, arguments: [], directives: [] }, { kind: "Field", alias: { kind: "Name", value: "stopId" }, name: { kind: "Name", value: "id" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "legGeometry" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "length" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "points" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "mode" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "pickupBookingInfo" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "earliestBookingTime" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "daysPrior" }, arguments: [], directives: [] }] } }] } }, { kind: "Field", name: { kind: "Name", value: "pickupType" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "realTime" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "realtimeState" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "rentedBike" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "rideHailingEstimate" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "arrival" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "maxPrice" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "amount" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "currency" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "code" }, arguments: [], directives: [] }] } }] } }, { kind: "Field", name: { kind: "Name", value: "minPrice" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "amount" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "currency" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "code" }, arguments: [], directives: [] }] } }] } }, { kind: "Field", name: { kind: "Name", value: "provider" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }] } }] } }, { kind: "Field", name: { kind: "Name", value: "route" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "alerts" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "alertDescriptionText" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "alertHeaderText" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "alertUrl" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "effectiveStartDate" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "color" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "gtfsId" }, arguments: [], directives: [] }, { kind: "Field", alias: { kind: "Name", value: "id" }, name: { kind: "Name", value: "gtfsId" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "longName" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "shortName" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "textColor" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "type" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "startTime" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "steps" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "absoluteDirection" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "alerts" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "alertDescriptionText" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "alertHeaderText" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "alertUrl" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "effectiveStartDate" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "area" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "distance" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "elevationProfile" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "distance" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "elevation" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "lat" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "lon" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "relativeDirection" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "stayOn" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "streetName" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "to" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "lat" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "lon" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "name" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "rentalVehicle" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "network" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "stop" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "alerts" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "alertDescriptionText" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "alertHeaderText" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "alertUrl" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "effectiveStartDate" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "code" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "gtfsId" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "lat" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "lon" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "vertexType" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "transitLeg" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "trip" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "arrivalStoptime" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "stop" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "gtfsId" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "stopPosition" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "departureStoptime" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "stop" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "gtfsId" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "stopPosition" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "gtfsId" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "id" }, arguments: [], directives: [] }] } }] } }, { kind: "Field", name: { kind: "Name", value: "startTime" }, arguments: [], directives: [] }, { kind: "Field", alias: { kind: "Name", value: "transfers" }, name: { kind: "Name", value: "numberOfTransfers" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "waitingTime" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "walkTime" }, arguments: [], directives: [] }] } }, { kind: "Field", name: { kind: "Name", value: "routingErrors" }, arguments: [], directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "code" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "description" }, arguments: [], directives: [] }, { kind: "Field", name: { kind: "Name", value: "inputField" }, arguments: [], directives: [] }] } }] } }] } }], loc: { start: 0, end: 4950, source: { body: "query Plan(\n  $arriveBy: Boolean\n  $banned: InputBanned\n  $bikeReluctance: Float\n  $carReluctance: Float\n  $date: String\n  $fromPlace: String!\n  $modes: [TransportMode]\n  $numItineraries: Int\n  $preferred: InputPreferred\n  $time: String\n  $toPlace: String!\n  $unpreferred: InputUnpreferred\n  $walkReluctance: Float\n  $walkSpeed: Float\n  $wheelchair: Boolean\n) {\n  plan(\n    arriveBy: $arriveBy\n    banned: $banned\n    bikeReluctance: $bikeReluctance\n    carReluctance: $carReluctance\n    date: $date\n    fromPlace: $fromPlace\n    # Currently only supporting EN locale, used for times and text\n    locale: \"en\"\n    numItineraries: $numItineraries\n    preferred: $preferred\n    time: $time\n    toPlace: $toPlace\n    transportModes: $modes\n    unpreferred: $unpreferred\n    walkReluctance: $walkReluctance\n    walkSpeed: $walkSpeed\n    wheelchair: $wheelchair\n  ) {\n    itineraries {\n      accessibilityScore\n      duration\n      endTime\n      legs {\n        accessibilityScore\n        agency {\n          alerts {\n            alertDescriptionText\n            alertHeaderText\n            alertUrl\n            effectiveStartDate\n            id\n          }\n          gtfsId\n          id: gtfsId\n          name\n          timezone\n          url\n        }\n        alerts {\n          alertDescriptionText\n          alertHeaderText\n          alertUrl\n          effectiveStartDate\n          id\n        }\n        arrivalDelay\n        departureDelay\n        distance\n        dropoffType\n        duration\n        endTime\n        fareProducts {\n          id\n          product {\n            __typename\n            id\n            medium {\n              id\n              name\n            }\n            name\n            riderCategory {\n              id\n              name\n            }\n            ... on DefaultFareProduct {\n              price {\n                amount\n                currency {\n                  code\n                  digits\n                }\n              }\n            }\n          }\n        }\n        from {\n          lat\n          lon\n          name\n          rentalVehicle {\n            id\n            network\n          }\n          stop {\n            alerts {\n              alertDescriptionText\n              alertHeaderText\n              alertUrl\n              effectiveStartDate\n              id\n            }\n            code\n            gtfsId\n            id\n            lat\n            lon\n          }\n          vertexType\n        }\n        headsign\n        interlineWithPreviousLeg\n        intermediateStops {\n          lat\n          locationType\n          lon\n          name\n          stopCode: code\n          stopId: id\n        }\n        legGeometry {\n          length\n          points\n        }\n        mode\n        pickupBookingInfo {\n          earliestBookingTime {\n            daysPrior\n          }\n        }\n        pickupType\n        realTime\n        realtimeState\n        rentedBike\n        rideHailingEstimate {\n          arrival\n          maxPrice {\n            amount\n            currency {\n              code\n            }\n          }\n          minPrice {\n            amount\n            currency {\n              code\n            }\n          }\n          provider {\n            id\n          }\n        }\n        route {\n          alerts {\n            alertDescriptionText\n            alertHeaderText\n            alertUrl\n            effectiveStartDate\n            id\n          }\n          color\n          gtfsId\n          id: gtfsId\n          longName\n          shortName\n          textColor\n          type\n        }\n        startTime\n        steps {\n          absoluteDirection\n          alerts {\n            alertDescriptionText\n            alertHeaderText\n            alertUrl\n            effectiveStartDate\n            id\n          }\n          area\n          distance\n          elevationProfile {\n            distance\n            elevation\n          }\n          lat\n          lon\n          relativeDirection\n          stayOn\n          streetName\n        }\n        to {\n          lat\n          lon\n          name\n          rentalVehicle {\n            id\n            network\n          }\n          stop {\n            alerts {\n              alertDescriptionText\n              alertHeaderText\n              alertUrl\n              effectiveStartDate\n              id\n            }\n            code\n            gtfsId\n            id\n            lat\n            lon\n          }\n          vertexType\n        }\n        transitLeg\n        trip {\n          arrivalStoptime {\n            stop {\n              gtfsId\n              id\n            }\n            stopPosition\n          }\n          departureStoptime {\n            stop {\n              gtfsId\n              id\n            }\n            stopPosition\n          }\n          gtfsId\n          id\n        }\n      }\n      startTime\n      transfers: numberOfTransfers\n      waitingTime\n      walkTime\n    }\n    routingErrors {\n      code\n      description\n      inputField\n    }\n  }\n}\n", name: "GraphQL request", locationOffset: { line: 1, column: 1 } } } };

/**
 * Mode Settings can contain additional modes to add to the query,
 * this function extracts those additional modes from the settings
 * and returns them in an array.
 * @param modeSettings List of mode settings with values populated
 * @returns Additional transport modes to add to query
 */
export function extractAdditionalModes(modeSettings, enabledModes) {
  return modeSettings.reduce(function (prev, cur) {
    // First, ensure that the mode associated with this setting is even enabled
    if (!enabledModes.map(function (m) {
      return m.mode;
    }).includes(cur.applicableMode)) {
      return prev;
    } // In checkboxes, mode must be enabled and have a transport mode in it


    if ((cur.type === "CHECKBOX" || cur.type === "SUBMODE") && cur.addTransportMode && cur.value) {
      var newTransportModes = Array.isArray(cur.addTransportMode) ? cur.addTransportMode : [cur.addTransportMode];
      return [].concat(_toConsumableArray(prev), _toConsumableArray(newTransportModes));
    }

    if (cur.type === "DROPDOWN") {
      var _cur$options$find;

      var transportMode = (_cur$options$find = cur.options.find(function (o) {
        return o.value === cur.value;
      })) === null || _cur$options$find === void 0 ? void 0 : _cur$options$find.addTransportMode;

      if (transportMode) {
        return [].concat(_toConsumableArray(prev), [transportMode]);
      }
    }

    return prev;
  }, []);
}
/**
 * Generates every possible mathematical subset of the input TransportModes.
 * Uses code from:
 * https://stackoverflow.com/questions/5752002/find-all-possible-subset-combos-in-an-array
 * @param array Array of input transport modes
 * @returns 2D array representing every possible subset of transport modes from input
 */

function combinations(array) {
  if (!array) return [];
  return (// eslint-disable-next-line no-bitwise
    new Array(1 << array.length).fill(null) // eslint-disable-next-line no-bitwise
    .map(function (e1, i) {
      return array.filter(function (e2, j) {
        return i & 1 << j;
      });
    })
  );
}
/**
 * This constant maps all the transport mode to a broader mode type,
 * which is used to determine the valid combinations of modes used in query generation.
 */


export var SIMPLIFICATIONS = {
  AIRPLANE: "TRANSIT",
  BICYCLE: "PERSONAL",
  BUS: "TRANSIT",
  CABLE_CAR: "TRANSIT",
  CAR: "CAR",
  FERRY: "TRANSIT",
  FLEX: "SHARED",
  // TODO: this allows FLEX+WALK. Is this reasonable?
  FUNICULAR: "TRANSIT",
  GONDOLA: "TRANSIT",
  RAIL: "TRANSIT",
  SCOOTER: "PERSONAL",
  SUBWAY: "TRANSIT",
  TROLLEYBUS: "TRANSIT",
  TRAM: "TRANSIT",
  TRANSIT: "TRANSIT",
  WALK: "WALK"
}; // Inclusion of "TRANSIT" alone automatically implies "WALK" in OTP

var VALID_COMBOS = [["WALK"], ["PERSONAL"], ["TRANSIT", "SHARED"], ["WALK", "SHARED"], ["TRANSIT"], ["TRANSIT", "PERSONAL"], ["TRANSIT", "CAR"]];
var BANNED_TOGETHER = ["SCOOTER", "BICYCLE", "CAR"];
export var TRANSIT_SUBMODES = Object.keys(SIMPLIFICATIONS).filter(function (mode) {
  return SIMPLIFICATIONS[mode] === "TRANSIT" && mode !== "TRANSIT";
});
export var TRANSIT_SUBMODES_AND_TRANSIT = Object.keys(SIMPLIFICATIONS).filter(function (mode) {
  return SIMPLIFICATIONS[mode] === "TRANSIT";
});

function isCombinationValid(combo, queryTransitSubmodes) {
  if (combo.length === 0) return false; // All current qualifiers currently simplify to "SHARED"

  var simplifiedModes = Array.from(new Set(combo.map(function (c) {
    return c.qualifier ? "SHARED" : SIMPLIFICATIONS[c.mode];
  }))); // Ensure that if we have one transit mode, then we include ALL transit modes

  if (simplifiedModes.includes("TRANSIT")) {
    // Don't allow TRANSIT along with any other submodes
    if (queryTransitSubmodes.length && combo.find(function (c) {
      return c.mode === "TRANSIT";
    })) {
      return false;
    }

    if (combo.reduce(function (prev, cur) {
      if (queryTransitSubmodes.includes(cur.mode)) {
        return prev - 1;
      }

      return prev;
    }, queryTransitSubmodes.length) !== 0) {
      return false;
    } // Continue to the other checks

  } // OTP doesn't support multiple non-walk modes


  if (BANNED_TOGETHER.filter(function (m) {
    return combo.find(function (c) {
      return c.mode === m;
    });
  }).length > 1) {
    return false;
  }

  return !!VALID_COMBOS.find(function (vc) {
    return simplifiedModes.every(function (m) {
      return vc.includes(m);
    }) && vc.every(function (m) {
      return simplifiedModes.includes(m);
    });
  });
}
/**
 * Generates a list of queries for OTP to get a comprehensive
 * set of results based on the modes input.
 * @param params OTP Query Params
 * @returns Set of parameters to generate queries
 */


export function generateCombinations(params) {
  var completeModeList = [].concat(_toConsumableArray(extractAdditionalModes(params.modeSettings, params.modes)), _toConsumableArray(params.modes)); // List of the transit *submodes* that are included in the input params

  var queryTransitSubmodes = completeModeList.filter(function (mode) {
    return TRANSIT_SUBMODES.includes(mode.mode);
  }).map(function (mode) {
    return mode.mode;
  });
  return combinations(completeModeList).filter(function (combo) {
    return isCombinationValid(combo, queryTransitSubmodes);
  }).map(function (combo) {
    return _objectSpread(_objectSpread({}, params), {}, {
      modes: combo
    });
  });
}
/**
 * Generates a query for OTP GraphQL API based on parameters.
 * @param param0 OTP2 Parameters for the query
 * @param planQuery Override the default query for OTP
 * @returns A fully formed query+variables ready to be sent to GraphQL backend
 */

export function generateOtp2Query(_ref) {
  var arriveBy = _ref.arriveBy,
      banned = _ref.banned,
      date = _ref.date,
      from = _ref.from,
      modes = _ref.modes,
      modeSettings = _ref.modeSettings,
      numItineraries = _ref.numItineraries,
      preferred = _ref.preferred,
      time = _ref.time,
      to = _ref.to;
  var planQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DefaultPlanQuery;
  // This extracts the values from the mode settings to key value pairs
  var modeSettingValues = modeSettings.reduce(function (prev, cur) {
    if (cur.type === "SLIDER" && cur.inverseKey) {
      prev[cur.inverseKey] = cur.high - cur.value + cur.low;
    }

    prev[cur.key] = cur.value; // If we assign a value on true, return the value (or null) instead of a boolean.

    if (cur.type === "CHECKBOX" && cur.truthValue) {
      var _cur$falseValue;

      prev[cur.key] = cur.value === true ? cur.truthValue : (_cur$falseValue = cur.falseValue) !== null && _cur$falseValue !== void 0 ? _cur$falseValue : null;
    }

    return prev;
  }, {});
  var bikeReluctance = modeSettingValues.bikeReluctance,
      carReluctance = modeSettingValues.carReluctance,
      walkSpeed = modeSettingValues.walkSpeed,
      walkReluctance = modeSettingValues.walkReluctance,
      wheelchair = modeSettingValues.wheelchair;
  return {
    query: print(planQuery),
    variables: {
      arriveBy: arriveBy,
      banned: banned,
      bikeReluctance: bikeReluctance,
      carReluctance: carReluctance,
      date: date,
      fromPlace: "".concat(from.name, "::").concat(from.lat, ",").concat(from.lon, "}"),
      modes: modes,
      numItineraries: numItineraries,
      preferred: preferred,
      time: time,
      toPlace: "".concat(to.name, "::").concat(to.lat, ",").concat(to.lon, "}"),
      walkReluctance: walkReluctance,
      walkSpeed: walkSpeed,
      wheelchair: wheelchair
    }
  };
}
//# sourceMappingURL=query-gen.js.map