"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryParamProperty = getQueryParamProperty;
exports.ensureSingleAccessMode = ensureSingleAccessMode;
exports.getUrlParams = getUrlParams;
exports.getOtpUrlParams = getOtpUrlParams;
exports.getTripOptionsFromQuery = getTripOptionsFromQuery;
exports.getDefaultQuery = getDefaultQuery;
exports.reduceOtpFlexModes = reduceOtpFlexModes;
exports.expandOtpFlexMode = expandOtpFlexMode;
exports.isNotDefaultQuery = isNotDefaultQuery;
exports.parseLocationString = parseLocationString;
exports.planParamsToQuery = planParamsToQuery;
exports.planParamsToQueryAsync = planParamsToQueryAsync;
exports.getRoutingParams = getRoutingParams;
exports.defaultParams = void 0;

var _dateFns = require("date-fns");

var _lib = _interopRequireDefault(require("@opentripplanner/geocoder/lib"));

var _qs = _interopRequireDefault(require("qs"));

var _itinerary = require("./itinerary");

var _map = require("./map");

var _queryParams = _interopRequireDefault(require("./query-params"));

var _time = require("./time");

/* The list of default parameters considered in the settings panel */
const defaultParams = ["wheelchair", "maxWalkDistance", "walkReluctance", "maxWalkTime", "maxBikeDistance", "maxBikeTime", "bikeSpeed", "optimize", "optimizeBike", "maxEScooterDistance", "watts"];
/**
 * List of time formats to parse when reading query params.
 */

exports.defaultParams = defaultParams;
const TIME_FORMATS = ["HH:mm:ss", "HH:mm", "H:mm", "h:mm:ss a", "h:mm:ssa", "h:mm a", "h:mma", "h:mm", "HHmm", "hmm", "ha"];
/* A function to retrieve a property value from an entry in the query-params
 * table, checking for either a static value or a function */

function getQueryParamProperty(paramInfo, property, query) {
  return typeof paramInfo[property] === "function" ? paramInfo[property](query) : paramInfo[property];
}

function ensureSingleAccessMode(queryModes) {
  // Count the number of access modes
  const accessCount = queryModes.filter(m => (0, _itinerary.isAccessMode)(m)).length; // If multiple access modes are specified, keep only the first one

  if (accessCount > 1) {
    const firstAccess = queryModes.find(m => (0, _itinerary.isAccessMode)(m));
    queryModes = queryModes.filter(m => !(0, _itinerary.isAccessMode)(m) || m === firstAccess); // If no access modes are specified, add 'WALK' as the default
  } else if (accessCount === 0) {
    queryModes.push("WALK");
  }

  return queryModes;
}

function getUrlParams() {
  return _qs.default.parse(window.location.href.split("?")[1]);
}

function getOtpUrlParams() {
  return Object.keys(getUrlParams()).filter(key => !key.startsWith("ui_"));
}

function getTripOptionsFromQuery(query, keepPlace = false) {
  const options = { ...query
  }; // Delete time/date options and from/to

  delete options.time;
  delete options.departArrive;
  delete options.date;

  if (!keepPlace) {
    delete options.from;
    delete options.to;
  }

  return options;
}
/**
 * Gets the query param's default value that is either a constant or by
 * executing the default value function.
 */


function getDefaultQueryParamValue(param) {
  return typeof param.default === "function" ? param.default() : param.default;
}
/**
 * Get the default query to OTP based on the given config.
 */


function getDefaultQuery(config = null) {
  const defaultQuery = {
    routingType: "ITINERARY"
  };

  _queryParams.default.filter(qp => "default" in qp).forEach(qp => {
    defaultQuery[qp.name] = getDefaultQueryParamValue(qp);
  });

  if (config) {
    if (config.routingTypes && config.routingTypes.length > 0) {
      defaultQuery.routingType = config.routingTypes[0].key;
    }

    if (config.defaultQueryParams) {
      Object.keys(config.defaultQueryParams).forEach(key => {
        defaultQuery[key] = config.defaultQueryParams[key];
      });
    }
  }

  return defaultQuery;
}
/**
 * Determine if the specified query param applies to the given query (based on
 * routing type and the param's own applicable function).
 * @param  paramInfo an entry from query-params.js
 * @param  query     the query against which to check if the param applies
 * @param  config    OTP config
 * @return {Boolean}
 */


function isParamApplicable(paramInfo, query, config) {
  const {
    applicable,
    routingTypes
  } = paramInfo;
  if (!routingTypes.includes(query.routingType)) return false;

  if (typeof applicable === "function" && !applicable(query, config)) {
    return false;
  }

  return true;
}
/**
 * Helper method which replaces OTP flex modes with single FLEX mode that's
 * more useful and easier to work with.
 */


function reduceOtpFlexModes(modes, enabled = true) {
  if (!enabled) return modes;
  return modes.reduce((prev, cur) => {
    const newModes = prev; // Add the current mode if it is not a flex mode

    if (!cur.includes("FLEX")) {
      newModes.push(cur); // If it is a flex mode, do not add it but rather add the custom flex mode
      // if not already present
    } else if (!newModes.includes("FLEX")) {
      newModes.push("FLEX");
    }

    return newModes;
  }, []);
}
/**
 * Helper method to process a mode string, replacing all instances of FLEX
 * with the full set of FLEX modes used by otp-2
 * @param {*} mode a mode String, not an array
 * @returns a mode String, not an array (with flex modes expanded)
 */


function expandOtpFlexMode(mode) {
  const modes = reduceOtpFlexModes(mode.split(","));
  return modes.map(m => {
    // If both the expanded and shrunk modes are included, remove the expanded one
    if (m === "FLEX_EGRESS" || m === "FLEX_ACCESS" || m === "FLEX_DIRECT") {
      if (mode.includes("FLEX")) return "";
    }

    if (m === "FLEX") {
      return "FLEX_EGRESS,FLEX_ACCESS,FLEX_DIRECT";
    }

    return m;
  }).join(",");
}
/**
 * Determines whether the specified query differs from the default query, i.e.,
 * whether the user has modified any trip options (including mode) from their
 * default values.
 */


function isNotDefaultQuery(query, config) {
  var _config$modes;

  const activeModes = reduceOtpFlexModes(query.mode.split(",").sort(), (_config$modes = config.modes) === null || _config$modes === void 0 ? void 0 : _config$modes.mergeFlex);

  if (activeModes.length !== 2 || activeModes[0] !== "TRANSIT" || activeModes[1] !== "WALK") {
    // Default mode is TRANSIT,WALK. If general TRANSIT is not used, check
    // against available transit modes in config.
    const defaultModes = (0, _itinerary.getTransitModes)(config).concat(["WALK"]).sort();
    const modesEqual = activeModes.length === defaultModes.length && activeModes.every((value, index) => {
      return value === defaultModes[index];
    });
    if (!modesEqual) return true;
  } // If modes are equal, check the remaining params.


  const defaultQuery = getDefaultQuery(config);

  for (let i = 0; i < defaultParams.length; i++) {
    const param = defaultParams[i];

    const paramInfo = _queryParams.default.find(qp => qp.name === param); // If the parameter applies to the query and does not match the default
    // value, the query is not default.


    if (isParamApplicable(paramInfo, query, config) && query[param] !== defaultQuery[param]) {
      return true;
    }
  }

  return false;
}
/**
 * Geocode utility for returning the first result for the provided place name text.
 * @param  {string} text - text to search
 * @param  {Object} geocoderConfig
 * @return {Location}
 */


async function getFirstGeocodeResult(text, geocoderConfig) {
  const geocoder = (0, _lib.default)(geocoderConfig); // Attempt to geocode search text and return first result if found.
  // TODO: Import geocoder from @opentripplanner

  return geocoder.search({
    text
  }).then(result => {
    const firstResult = result.features && result.features[0];

    if (firstResult) {
      return geocoder.getLocationFromGeocodedFeature(firstResult);
    }

    return null;
  });
}
/**
 * OTP allows passing a location in the form '123 Main St::lat,lon', so we check
 * for the double colon and parse the coordinates accordingly.
 * @param  {string} value - query param for place described above
 * @return {Location} - location or null if the value is falsey or the parsed
 *                      coordinates do not result in both a lat and lon
 */


function parseLocationString(value) {
  if (!value) return null;
  const parts = value.split("::");
  const coordinates = parts[1] ? (0, _map.stringToCoords)(parts[1]) : (0, _map.stringToCoords)(parts[0]);
  const name = parts[1] ? parts[0] : (0, _map.coordsToString)(coordinates);
  return coordinates.length === 2 ? {
    name: name || null,
    lat: coordinates[0] || null,
    lon: coordinates[1] || null
  } : null;
}
/**
 * Convert a string query param for a from or to place into a location. If
 * coordinates not provided and geocoder config is present, use the first
 * geocoded result.
 * @param  {string} value
 * @param  {Object} [geocoderConfig=null]
 * @return {Location}
 */


async function queryParamToLocation(value, geocoderConfig) {
  let location = parseLocationString(value);

  if (!location && value && geocoderConfig) {
    // If a valid location was not found, but the place name text exists,
    // attempt to geocode the name.
    location = await getFirstGeocodeResult(value, geocoderConfig);
  }

  return location;
}
/**
 * Create a otp query based on a the url params.
 *
 * @param  {Object} params An object representing the parsed querystring of url
 *    params.
 */


function planParamsToQuery(params) {
  const query = {};
  Object.keys(params).forEach(key => {
    switch (key) {
      case "fromPlace":
        query.from = parseLocationString(params.fromPlace);
        break;

      case "toPlace":
        query.to = parseLocationString(params.toPlace);
        break;

      case "arriveBy":
        query.departArrive = params.arriveBy === "true" ? "ARRIVE" : params.arriveBy === "false" ? "DEPART" : "NOW";
        break;

      case "date":
        query.date = params.date || (0, _time.getCurrentDate)();
        break;

      case "time":
        {
          // Match one of the supported time formats
          const matchedTimeFormat = TIME_FORMATS.find(timeFormat => (0, _dateFns.isMatch)(params.time, timeFormat));
          query.time = matchedTimeFormat ? (0, _dateFns.format)((0, _dateFns.parse)(params.time, matchedTimeFormat, new Date()), _time.OTP_API_TIME_FORMAT) : (0, _time.getCurrentTime)();
        }
        break;

      case "intermediatePlaces":
        // If query has intermediate places, ensure that they are parsed
        // as locations.
        query.intermediatePlaces = params.intermediatePlaces ? params.intermediatePlaces.map(parseLocationString) : [];
        break;

      default:
        {
          const maybeNumber = Number(params[key]); // If the param value is an empty string literal and is not a number,
          // use string value. Else, use parsed number value.
          // See https://github.com/opentripplanner/otp-ui/issues/50

          query[key] = params[key] === "" || Number.isNaN(maybeNumber) ? params[key] : maybeNumber;
          break;
        }
    }
  });
  return query;
}
/**
 * Async method to create a otp query based on a the url params. This provides
 * the same functionality as planParamsToQuery, except that it will also attempt
 * to geocode the input from and to strings if no lat/lng values were provided.
 *
 * @param  {Object} params An object representing the parsed querystring of url
 *    params.
 * @param config the config in the otp-rr store.
 */


async function planParamsToQueryAsync(params, config = {}) {
  // Construct query from plan params.
  const query = planParamsToQuery(params); // Attempt to geocode from and to params if the string parsing does not return
  // valid locations.

  if (!query.from) {
    query.from = await queryParamToLocation(params.fromPlace, config.geocoder);
  }

  if (!query.to) {
    query.to = await queryParamToLocation(params.toPlace, config.geocoder);
  }

  return query;
}
/**
 * Create an object that can be used as a querystring in making an OTP
 * PlannerResource request.
 *
 * See http://otp-docs.ibi-transit.com/api/resource_PlannerResource.html
 *
 * @param  {Object} config  The OTP application config. See types#configType
 * @param  {Object} currentQuery  The current query parameters as saved in the
 *   application state. This method does some extra logic on top of this data
 *   in order to create a request suitable for OTP. See __tests__/query.js#L14 for more.
 * @param  {boolean} ignoreRealtimeUpdates  If true, will create a request that
 *   does not use realtime data.
 */


function getRoutingParams(config, currentQuery, ignoreRealtimeUpdates) {
  var _config$modes2;

  const routingType = currentQuery.routingType;
  const isItinerary = routingType === "ITINERARY";
  let params = {}; // Start with the universe of OTP parameters defined in query-params.js:

  _queryParams.default.filter(qp => {
    // A given parameter is included in the request if all of the following:
    // 1. Must apply to the active routing type (ITINERARY or PROFILE)
    // 2. Must be included in the current user-defined query
    // 3. Must pass the parameter's applicability test, if one is specified
    return qp.routingTypes.indexOf(routingType) !== -1 && qp.name in currentQuery && (typeof qp.applicable !== "function" || qp.applicable(currentQuery, config));
  }).forEach(qp => {
    // Translate the applicable parameters according to their rewrite
    // functions (if provided)
    const rewriteFunction = isItinerary ? qp.itineraryRewrite : qp.profileRewrite;
    params = Object.assign(params, rewriteFunction ? rewriteFunction(currentQuery[qp.name]) : {
      [qp.name]: currentQuery[qp.name]
    });
  }); // Additional processing specific to ITINERARY mode


  if (isItinerary) {
    // override ignoreRealtimeUpdates if provided
    if (typeof ignoreRealtimeUpdates === "boolean") {
      params.ignoreRealtimeUpdates = ignoreRealtimeUpdates;
    } // check date/time validity; ignore both if either is invalid


    const dateValid = (0, _dateFns.isMatch)(params.date, _time.OTP_API_DATE_FORMAT);
    const timeValid = (0, _dateFns.isMatch)(params.time, _time.OTP_API_TIME_FORMAT);

    if (!dateValid || !timeValid) {
      delete params.time;
      delete params.date;
    } // temp: set additional parameters for CAR_HAIL or CAR_RENT trips


    if (params.mode && (params.mode.includes("CAR_HAIL") || params.mode.includes("CAR_RENT"))) {
      params.minTransitDistance = "50%"; // increase search timeout because these queries can take a while

      params.searchTimeout = 10000;
    } // set onlyTransitTrips for car rental searches


    if (params.mode && params.mode.includes("CAR_RENT")) {
      params.onlyTransitTrips = true;
    } // Additional processing specific to PROFILE mode

  } else {
    // check start and end time validity; ignore both if either is invalid
    const startTimeValid = (0, _dateFns.isMatch)(params.startTime, _time.OTP_API_TIME_FORMAT);
    const endTimeValid = (0, _dateFns.isMatch)(params.endTime, _time.OTP_API_TIME_FORMAT);

    if (!startTimeValid || !endTimeValid) {
      delete params.startTimeValid;
      delete params.endTimeValid;
    }
  } // TODO: check that valid from/to locations are provided
  // hack to add walking to driving/TNC trips


  if ((0, _itinerary.hasCar)(params.mode)) {
    params.mode += ",WALK";
  } // Replace FLEX placeholder with OTP flex modes
  // Explicit false check allows avoiding a breaking change -- undefined is true


  if (params.mode && ((_config$modes2 = config.modes) === null || _config$modes2 === void 0 ? void 0 : _config$modes2.mergeFlex) !== false) {
    // Ensure query is in reduced format to avoid replacing twice
    const reducedMode = reduceOtpFlexModes(params.mode.split(",")).join(",");
    params.mode = expandOtpFlexMode(reducedMode);
  }

  return params;
}
//# sourceMappingURL=query.js.map