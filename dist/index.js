"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod2, secondTarget) => (__copyProps(target, mod2, "default"), secondTarget && __copyProps(secondTarget, mod2, "default"));
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js
function isTracingSuppressed(context) {
  return context.getValue(SUPPRESS_TRACING_KEY) === true;
}
var import_api, SUPPRESS_TRACING_KEY;
var init_suppress_tracing = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js"() {
    "use strict";
    import_api = require("@opentelemetry/api");
    SUPPRESS_TRACING_KEY = (0, import_api.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
    __name(isTracingSuppressed, "isTracingSuppressed");
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/baggage/constants.js
var BAGGAGE_KEY_PAIR_SEPARATOR, BAGGAGE_PROPERTIES_SEPARATOR, BAGGAGE_ITEMS_SEPARATOR, BAGGAGE_HEADER, BAGGAGE_MAX_NAME_VALUE_PAIRS, BAGGAGE_MAX_PER_NAME_VALUE_PAIRS, BAGGAGE_MAX_TOTAL_LENGTH;
var init_constants = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/baggage/constants.js"() {
    "use strict";
    BAGGAGE_KEY_PAIR_SEPARATOR = "=";
    BAGGAGE_PROPERTIES_SEPARATOR = ";";
    BAGGAGE_ITEMS_SEPARATOR = ",";
    BAGGAGE_HEADER = "baggage";
    BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
    BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
    BAGGAGE_MAX_TOTAL_LENGTH = 8192;
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/baggage/utils.js
var utils_exports = {};
__export(utils_exports, {
  getKeyPairs: () => getKeyPairs,
  parseKeyPairsIntoRecord: () => parseKeyPairsIntoRecord,
  parsePairKeyValue: () => parsePairKeyValue,
  serializeKeyPairs: () => serializeKeyPairs
});
function serializeKeyPairs(keyPairs) {
  return keyPairs.reduce(function(hValue, current) {
    var value = "" + hValue + (hValue !== "" ? BAGGAGE_ITEMS_SEPARATOR : "") + current;
    return value.length > BAGGAGE_MAX_TOTAL_LENGTH ? hValue : value;
  }, "");
}
function getKeyPairs(baggage) {
  return baggage.getAllEntries().map(function(_a2) {
    var _b = __read(_a2, 2), key = _b[0], value = _b[1];
    var entry = encodeURIComponent(key) + "=" + encodeURIComponent(value.value);
    if (value.metadata !== void 0) {
      entry += BAGGAGE_PROPERTIES_SEPARATOR + value.metadata.toString();
    }
    return entry;
  });
}
function parsePairKeyValue(entry) {
  var valueProps = entry.split(BAGGAGE_PROPERTIES_SEPARATOR);
  if (valueProps.length <= 0)
    return;
  var keyPairPart = valueProps.shift();
  if (!keyPairPart)
    return;
  var separatorIndex = keyPairPart.indexOf(BAGGAGE_KEY_PAIR_SEPARATOR);
  if (separatorIndex <= 0)
    return;
  var key = decodeURIComponent(keyPairPart.substring(0, separatorIndex).trim());
  var value = decodeURIComponent(keyPairPart.substring(separatorIndex + 1).trim());
  var metadata;
  if (valueProps.length > 0) {
    metadata = (0, import_api2.baggageEntryMetadataFromString)(valueProps.join(BAGGAGE_PROPERTIES_SEPARATOR));
  }
  return { key, value, metadata };
}
function parseKeyPairsIntoRecord(value) {
  if (typeof value !== "string" || value.length === 0)
    return {};
  return value.split(BAGGAGE_ITEMS_SEPARATOR).map(function(entry) {
    return parsePairKeyValue(entry);
  }).filter(function(keyPair) {
    return keyPair !== void 0 && keyPair.value.length > 0;
  }).reduce(function(headers, keyPair) {
    headers[keyPair.key] = keyPair.value;
    return headers;
  }, {});
}
var import_api2, __read;
var init_utils = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/baggage/utils.js"() {
    "use strict";
    import_api2 = require("@opentelemetry/api");
    init_constants();
    __read = function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
        return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
          ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"]))
            m.call(i);
        } finally {
          if (e)
            throw e.error;
        }
      }
      return ar;
    };
    __name(serializeKeyPairs, "serializeKeyPairs");
    __name(getKeyPairs, "getKeyPairs");
    __name(parsePairKeyValue, "parsePairKeyValue");
    __name(parseKeyPairsIntoRecord, "parseKeyPairsIntoRecord");
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/baggage/propagation/W3CBaggagePropagator.js
var import_api3, W3CBaggagePropagator;
var init_W3CBaggagePropagator = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/baggage/propagation/W3CBaggagePropagator.js"() {
    "use strict";
    import_api3 = require("@opentelemetry/api");
    init_suppress_tracing();
    init_constants();
    init_utils();
    W3CBaggagePropagator = /** @class */
    function() {
      function W3CBaggagePropagator2() {
      }
      __name(W3CBaggagePropagator2, "W3CBaggagePropagator");
      W3CBaggagePropagator2.prototype.inject = function(context, carrier, setter) {
        var baggage = import_api3.propagation.getBaggage(context);
        if (!baggage || isTracingSuppressed(context))
          return;
        var keyPairs = getKeyPairs(baggage).filter(function(pair) {
          return pair.length <= BAGGAGE_MAX_PER_NAME_VALUE_PAIRS;
        }).slice(0, BAGGAGE_MAX_NAME_VALUE_PAIRS);
        var headerValue = serializeKeyPairs(keyPairs);
        if (headerValue.length > 0) {
          setter.set(carrier, BAGGAGE_HEADER, headerValue);
        }
      };
      W3CBaggagePropagator2.prototype.extract = function(context, carrier, getter) {
        var headerValue = getter.get(carrier, BAGGAGE_HEADER);
        var baggageString = Array.isArray(headerValue) ? headerValue.join(BAGGAGE_ITEMS_SEPARATOR) : headerValue;
        if (!baggageString)
          return context;
        var baggage = {};
        if (baggageString.length === 0) {
          return context;
        }
        var pairs = baggageString.split(BAGGAGE_ITEMS_SEPARATOR);
        pairs.forEach(function(entry) {
          var keyPair = parsePairKeyValue(entry);
          if (keyPair) {
            var baggageEntry = { value: keyPair.value };
            if (keyPair.metadata) {
              baggageEntry.metadata = keyPair.metadata;
            }
            baggage[keyPair.key] = baggageEntry;
          }
        });
        if (Object.entries(baggage).length === 0) {
          return context;
        }
        return import_api3.propagation.setBaggage(context, import_api3.propagation.createBaggage(baggage));
      };
      W3CBaggagePropagator2.prototype.fields = function() {
        return [BAGGAGE_HEADER];
      };
      return W3CBaggagePropagator2;
    }();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/anchored-clock.js
var AnchoredClock;
var init_anchored_clock = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/anchored-clock.js"() {
    "use strict";
    AnchoredClock = /** @class */
    function() {
      function AnchoredClock2(systemClock, monotonicClock) {
        this._monotonicClock = monotonicClock;
        this._epochMillis = systemClock.now();
        this._performanceMillis = monotonicClock.now();
      }
      __name(AnchoredClock2, "AnchoredClock");
      AnchoredClock2.prototype.now = function() {
        var delta = this._monotonicClock.now() - this._performanceMillis;
        return this._epochMillis + delta;
      };
      return AnchoredClock2;
    }();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/attributes.js
var import_api4;
var init_attributes = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/attributes.js"() {
    "use strict";
    import_api4 = require("@opentelemetry/api");
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/logging-error-handler.js
function loggingErrorHandler() {
  return function(ex) {
    import_api5.diag.error(stringifyException(ex));
  };
}
function stringifyException(ex) {
  if (typeof ex === "string") {
    return ex;
  } else {
    return JSON.stringify(flattenException(ex));
  }
}
function flattenException(ex) {
  var result = {};
  var current = ex;
  while (current !== null) {
    Object.getOwnPropertyNames(current).forEach(function(propertyName) {
      if (result[propertyName])
        return;
      var value = current[propertyName];
      if (value) {
        result[propertyName] = String(value);
      }
    });
    current = Object.getPrototypeOf(current);
  }
  return result;
}
var import_api5;
var init_logging_error_handler = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/logging-error-handler.js"() {
    "use strict";
    import_api5 = require("@opentelemetry/api");
    __name(loggingErrorHandler, "loggingErrorHandler");
    __name(stringifyException, "stringifyException");
    __name(flattenException, "flattenException");
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/global-error-handler.js
function globalErrorHandler(ex) {
  try {
    delegateHandler(ex);
  } catch (_a2) {
  }
}
var delegateHandler;
var init_global_error_handler = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/global-error-handler.js"() {
    "use strict";
    init_logging_error_handler();
    delegateHandler = loggingErrorHandler();
    __name(globalErrorHandler, "globalErrorHandler");
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/sampling.js
var TracesSamplerValues;
var init_sampling = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/sampling.js"() {
    "use strict";
    (function(TracesSamplerValues2) {
      TracesSamplerValues2["AlwaysOff"] = "always_off";
      TracesSamplerValues2["AlwaysOn"] = "always_on";
      TracesSamplerValues2["ParentBasedAlwaysOff"] = "parentbased_always_off";
      TracesSamplerValues2["ParentBasedAlwaysOn"] = "parentbased_always_on";
      TracesSamplerValues2["ParentBasedTraceIdRatio"] = "parentbased_traceidratio";
      TracesSamplerValues2["TraceIdRatio"] = "traceidratio";
    })(TracesSamplerValues || (TracesSamplerValues = {}));
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/environment.js
function isEnvVarABoolean(key) {
  return ENVIRONMENT_BOOLEAN_KEYS.indexOf(key) > -1;
}
function isEnvVarANumber(key) {
  return ENVIRONMENT_NUMBERS_KEYS.indexOf(key) > -1;
}
function isEnvVarAList(key) {
  return ENVIRONMENT_LISTS_KEYS.indexOf(key) > -1;
}
function parseBoolean(key, environment, values) {
  if (typeof values[key] === "undefined") {
    return;
  }
  var value = String(values[key]);
  environment[key] = value.toLowerCase() === "true";
}
function parseNumber(name, environment, values, min, max) {
  if (min === void 0) {
    min = -Infinity;
  }
  if (max === void 0) {
    max = Infinity;
  }
  if (typeof values[name] !== "undefined") {
    var value = Number(values[name]);
    if (!isNaN(value)) {
      if (value < min) {
        environment[name] = min;
      } else if (value > max) {
        environment[name] = max;
      } else {
        environment[name] = value;
      }
    }
  }
}
function parseStringList(name, output, input, separator) {
  if (separator === void 0) {
    separator = DEFAULT_LIST_SEPARATOR;
  }
  var givenValue = input[name];
  if (typeof givenValue === "string") {
    output[name] = givenValue.split(separator).map(function(v) {
      return v.trim();
    });
  }
}
function setLogLevelFromEnv(key, environment, values) {
  var value = values[key];
  if (typeof value === "string") {
    var theLevel = logLevelMap[value.toUpperCase()];
    if (theLevel != null) {
      environment[key] = theLevel;
    }
  }
}
function parseEnvironment(values) {
  var environment = {};
  for (var env in DEFAULT_ENVIRONMENT) {
    var key = env;
    switch (key) {
      case "OTEL_LOG_LEVEL":
        setLogLevelFromEnv(key, environment, values);
        break;
      default:
        if (isEnvVarABoolean(key)) {
          parseBoolean(key, environment, values);
        } else if (isEnvVarANumber(key)) {
          parseNumber(key, environment, values);
        } else if (isEnvVarAList(key)) {
          parseStringList(key, environment, values);
        } else {
          var value = values[key];
          if (typeof value !== "undefined" && value !== null) {
            environment[key] = String(value);
          }
        }
    }
  }
  return environment;
}
var import_api6, DEFAULT_LIST_SEPARATOR, ENVIRONMENT_BOOLEAN_KEYS, ENVIRONMENT_NUMBERS_KEYS, ENVIRONMENT_LISTS_KEYS, DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT, DEFAULT_ATTRIBUTE_COUNT_LIMIT, DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT, DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT, DEFAULT_ENVIRONMENT, logLevelMap;
var init_environment = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/environment.js"() {
    "use strict";
    import_api6 = require("@opentelemetry/api");
    init_sampling();
    DEFAULT_LIST_SEPARATOR = ",";
    ENVIRONMENT_BOOLEAN_KEYS = ["OTEL_SDK_DISABLED"];
    __name(isEnvVarABoolean, "isEnvVarABoolean");
    ENVIRONMENT_NUMBERS_KEYS = [
      "OTEL_BSP_EXPORT_TIMEOUT",
      "OTEL_BSP_MAX_EXPORT_BATCH_SIZE",
      "OTEL_BSP_MAX_QUEUE_SIZE",
      "OTEL_BSP_SCHEDULE_DELAY",
      "OTEL_BLRP_EXPORT_TIMEOUT",
      "OTEL_BLRP_MAX_EXPORT_BATCH_SIZE",
      "OTEL_BLRP_MAX_QUEUE_SIZE",
      "OTEL_BLRP_SCHEDULE_DELAY",
      "OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT",
      "OTEL_ATTRIBUTE_COUNT_LIMIT",
      "OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT",
      "OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT",
      "OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT",
      "OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT",
      "OTEL_SPAN_EVENT_COUNT_LIMIT",
      "OTEL_SPAN_LINK_COUNT_LIMIT",
      "OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT",
      "OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT",
      "OTEL_EXPORTER_OTLP_TIMEOUT",
      "OTEL_EXPORTER_OTLP_TRACES_TIMEOUT",
      "OTEL_EXPORTER_OTLP_METRICS_TIMEOUT",
      "OTEL_EXPORTER_OTLP_LOGS_TIMEOUT",
      "OTEL_EXPORTER_JAEGER_AGENT_PORT"
    ];
    __name(isEnvVarANumber, "isEnvVarANumber");
    ENVIRONMENT_LISTS_KEYS = [
      "OTEL_NO_PATCH_MODULES",
      "OTEL_PROPAGATORS"
    ];
    __name(isEnvVarAList, "isEnvVarAList");
    DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = Infinity;
    DEFAULT_ATTRIBUTE_COUNT_LIMIT = 128;
    DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT = 128;
    DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT = 128;
    DEFAULT_ENVIRONMENT = {
      OTEL_SDK_DISABLED: false,
      CONTAINER_NAME: "",
      ECS_CONTAINER_METADATA_URI_V4: "",
      ECS_CONTAINER_METADATA_URI: "",
      HOSTNAME: "",
      KUBERNETES_SERVICE_HOST: "",
      NAMESPACE: "",
      OTEL_BSP_EXPORT_TIMEOUT: 3e4,
      OTEL_BSP_MAX_EXPORT_BATCH_SIZE: 512,
      OTEL_BSP_MAX_QUEUE_SIZE: 2048,
      OTEL_BSP_SCHEDULE_DELAY: 5e3,
      OTEL_BLRP_EXPORT_TIMEOUT: 3e4,
      OTEL_BLRP_MAX_EXPORT_BATCH_SIZE: 512,
      OTEL_BLRP_MAX_QUEUE_SIZE: 2048,
      OTEL_BLRP_SCHEDULE_DELAY: 5e3,
      OTEL_EXPORTER_JAEGER_AGENT_HOST: "",
      OTEL_EXPORTER_JAEGER_AGENT_PORT: 6832,
      OTEL_EXPORTER_JAEGER_ENDPOINT: "",
      OTEL_EXPORTER_JAEGER_PASSWORD: "",
      OTEL_EXPORTER_JAEGER_USER: "",
      OTEL_EXPORTER_OTLP_ENDPOINT: "",
      OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "",
      OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: "",
      OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: "",
      OTEL_EXPORTER_OTLP_HEADERS: "",
      OTEL_EXPORTER_OTLP_TRACES_HEADERS: "",
      OTEL_EXPORTER_OTLP_METRICS_HEADERS: "",
      OTEL_EXPORTER_OTLP_LOGS_HEADERS: "",
      OTEL_EXPORTER_OTLP_TIMEOUT: 1e4,
      OTEL_EXPORTER_OTLP_TRACES_TIMEOUT: 1e4,
      OTEL_EXPORTER_OTLP_METRICS_TIMEOUT: 1e4,
      OTEL_EXPORTER_OTLP_LOGS_TIMEOUT: 1e4,
      OTEL_EXPORTER_ZIPKIN_ENDPOINT: "http://localhost:9411/api/v2/spans",
      OTEL_LOG_LEVEL: import_api6.DiagLogLevel.INFO,
      OTEL_NO_PATCH_MODULES: [],
      OTEL_PROPAGATORS: ["tracecontext", "baggage"],
      OTEL_RESOURCE_ATTRIBUTES: "",
      OTEL_SERVICE_NAME: "",
      OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
      OTEL_ATTRIBUTE_COUNT_LIMIT: DEFAULT_ATTRIBUTE_COUNT_LIMIT,
      OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
      OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: DEFAULT_ATTRIBUTE_COUNT_LIMIT,
      OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT: DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
      OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT: DEFAULT_ATTRIBUTE_COUNT_LIMIT,
      OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
      OTEL_SPAN_LINK_COUNT_LIMIT: 128,
      OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT: DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
      OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT: DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT,
      OTEL_TRACES_EXPORTER: "",
      OTEL_TRACES_SAMPLER: TracesSamplerValues.ParentBasedAlwaysOn,
      OTEL_TRACES_SAMPLER_ARG: "",
      OTEL_LOGS_EXPORTER: "",
      OTEL_EXPORTER_OTLP_INSECURE: "",
      OTEL_EXPORTER_OTLP_TRACES_INSECURE: "",
      OTEL_EXPORTER_OTLP_METRICS_INSECURE: "",
      OTEL_EXPORTER_OTLP_LOGS_INSECURE: "",
      OTEL_EXPORTER_OTLP_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_TRACES_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_METRICS_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_LOGS_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_COMPRESSION: "",
      OTEL_EXPORTER_OTLP_TRACES_COMPRESSION: "",
      OTEL_EXPORTER_OTLP_METRICS_COMPRESSION: "",
      OTEL_EXPORTER_OTLP_LOGS_COMPRESSION: "",
      OTEL_EXPORTER_OTLP_CLIENT_KEY: "",
      OTEL_EXPORTER_OTLP_TRACES_CLIENT_KEY: "",
      OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY: "",
      OTEL_EXPORTER_OTLP_LOGS_CLIENT_KEY: "",
      OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_LOGS_CLIENT_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
      OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: "http/protobuf",
      OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: "http/protobuf",
      OTEL_EXPORTER_OTLP_LOGS_PROTOCOL: "http/protobuf",
      OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: "cumulative"
    };
    __name(parseBoolean, "parseBoolean");
    __name(parseNumber, "parseNumber");
    __name(parseStringList, "parseStringList");
    logLevelMap = {
      ALL: import_api6.DiagLogLevel.ALL,
      VERBOSE: import_api6.DiagLogLevel.VERBOSE,
      DEBUG: import_api6.DiagLogLevel.DEBUG,
      INFO: import_api6.DiagLogLevel.INFO,
      WARN: import_api6.DiagLogLevel.WARN,
      ERROR: import_api6.DiagLogLevel.ERROR,
      NONE: import_api6.DiagLogLevel.NONE
    };
    __name(setLogLevelFromEnv, "setLogLevelFromEnv");
    __name(parseEnvironment, "parseEnvironment");
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/environment.js
function getEnv() {
  var processEnv = parseEnvironment(process.env);
  return Object.assign({}, DEFAULT_ENVIRONMENT, processEnv);
}
var init_environment2 = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/environment.js"() {
    "use strict";
    init_environment();
    __name(getEnv, "getEnv");
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/globalThis.js
var _globalThis;
var init_globalThis = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/globalThis.js"() {
    "use strict";
    _globalThis = typeof globalThis === "object" ? globalThis : global;
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/hex-to-binary.js
function intValue(charCode) {
  if (charCode >= 48 && charCode <= 57) {
    return charCode - 48;
  }
  if (charCode >= 97 && charCode <= 102) {
    return charCode - 87;
  }
  return charCode - 55;
}
function hexToBinary(hexStr) {
  var buf = new Uint8Array(hexStr.length / 2);
  var offset = 0;
  for (var i = 0; i < hexStr.length; i += 2) {
    var hi = intValue(hexStr.charCodeAt(i));
    var lo = intValue(hexStr.charCodeAt(i + 1));
    buf[offset++] = hi << 4 | lo;
  }
  return buf;
}
var init_hex_to_binary = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/hex-to-binary.js"() {
    "use strict";
    __name(intValue, "intValue");
    __name(hexToBinary, "hexToBinary");
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/hex-to-base64.js
var init_hex_to_base64 = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/hex-to-base64.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/RandomIdGenerator.js
var TRACE_ID_BYTES, SHARED_BUFFER;
var init_RandomIdGenerator = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/RandomIdGenerator.js"() {
    "use strict";
    TRACE_ID_BYTES = 16;
    SHARED_BUFFER = Buffer.allocUnsafe(TRACE_ID_BYTES);
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/performance.js
var init_performance = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/performance.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/version.js
var VERSION;
var init_version = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/version.js"() {
    "use strict";
    VERSION = "1.24.1";
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/sdk-info.js
var import_semantic_conventions, _a, SDK_INFO;
var init_sdk_info = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/sdk-info.js"() {
    "use strict";
    init_version();
    import_semantic_conventions = require("@opentelemetry/semantic-conventions");
    SDK_INFO = (_a = {}, _a[import_semantic_conventions.SemanticResourceAttributes.TELEMETRY_SDK_NAME] = "opentelemetry", _a[import_semantic_conventions.SemanticResourceAttributes.PROCESS_RUNTIME_NAME] = "node", _a[import_semantic_conventions.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE] = import_semantic_conventions.TelemetrySdkLanguageValues.NODEJS, _a[import_semantic_conventions.SemanticResourceAttributes.TELEMETRY_SDK_VERSION] = VERSION, _a);
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/timer-util.js
var init_timer_util = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/timer-util.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/index.js
var init_node = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/node/index.js"() {
    "use strict";
    init_environment2();
    init_globalThis();
    init_hex_to_base64();
    init_RandomIdGenerator();
    init_performance();
    init_sdk_info();
    init_timer_util();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/index.js
var init_platform = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/index.js"() {
    "use strict";
    init_node();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/time.js
function hrTimeToNanoseconds(time) {
  return time[0] * SECOND_TO_NANOSECONDS + time[1];
}
var NANOSECOND_DIGITS, NANOSECOND_DIGITS_IN_MILLIS, MILLISECONDS_TO_NANOSECONDS, SECOND_TO_NANOSECONDS;
var init_time = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/time.js"() {
    "use strict";
    NANOSECOND_DIGITS = 9;
    NANOSECOND_DIGITS_IN_MILLIS = 6;
    MILLISECONDS_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS_IN_MILLIS);
    SECOND_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS);
    __name(hrTimeToNanoseconds, "hrTimeToNanoseconds");
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/types.js
var init_types = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/types.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/ExportResult.js
var ExportResultCode;
var init_ExportResult = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/ExportResult.js"() {
    "use strict";
    (function(ExportResultCode2) {
      ExportResultCode2[ExportResultCode2["SUCCESS"] = 0] = "SUCCESS";
      ExportResultCode2[ExportResultCode2["FAILED"] = 1] = "FAILED";
    })(ExportResultCode || (ExportResultCode = {}));
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/propagation/composite.js
var import_api7, __values, CompositePropagator;
var init_composite = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/propagation/composite.js"() {
    "use strict";
    import_api7 = require("@opentelemetry/api");
    __values = function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m)
        return m.call(o);
      if (o && typeof o.length === "number")
        return {
          next: function() {
            if (o && i >= o.length)
              o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    CompositePropagator = /** @class */
    function() {
      function CompositePropagator2(config5) {
        if (config5 === void 0) {
          config5 = {};
        }
        var _a2;
        this._propagators = (_a2 = config5.propagators) !== null && _a2 !== void 0 ? _a2 : [];
        this._fields = Array.from(new Set(this._propagators.map(function(p) {
          return typeof p.fields === "function" ? p.fields() : [];
        }).reduce(function(x, y) {
          return x.concat(y);
        }, [])));
      }
      __name(CompositePropagator2, "CompositePropagator");
      CompositePropagator2.prototype.inject = function(context, carrier, setter) {
        var e_1, _a2;
        try {
          for (var _b = __values(this._propagators), _c = _b.next(); !_c.done; _c = _b.next()) {
            var propagator = _c.value;
            try {
              propagator.inject(context, carrier, setter);
            } catch (err) {
              import_api7.diag.warn("Failed to inject with " + propagator.constructor.name + ". Err: " + err.message);
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b.return))
              _a2.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
      };
      CompositePropagator2.prototype.extract = function(context, carrier, getter) {
        return this._propagators.reduce(function(ctx, propagator) {
          try {
            return propagator.extract(ctx, carrier, getter);
          } catch (err) {
            import_api7.diag.warn("Failed to inject with " + propagator.constructor.name + ". Err: " + err.message);
          }
          return ctx;
        }, context);
      };
      CompositePropagator2.prototype.fields = function() {
        return this._fields.slice();
      };
      return CompositePropagator2;
    }();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/internal/validators.js
function validateKey(key) {
  return VALID_KEY_REGEX.test(key);
}
function validateValue(value) {
  return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
}
var VALID_KEY_CHAR_RANGE, VALID_KEY, VALID_VENDOR_KEY, VALID_KEY_REGEX, VALID_VALUE_BASE_REGEX, INVALID_VALUE_COMMA_EQUAL_REGEX;
var init_validators = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/internal/validators.js"() {
    "use strict";
    VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
    VALID_KEY = "[a-z]" + VALID_KEY_CHAR_RANGE + "{0,255}";
    VALID_VENDOR_KEY = "[a-z0-9]" + VALID_KEY_CHAR_RANGE + "{0,240}@[a-z]" + VALID_KEY_CHAR_RANGE + "{0,13}";
    VALID_KEY_REGEX = new RegExp("^(?:" + VALID_KEY + "|" + VALID_VENDOR_KEY + ")$");
    VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
    INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
    __name(validateKey, "validateKey");
    __name(validateValue, "validateValue");
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/TraceState.js
var MAX_TRACE_STATE_ITEMS, MAX_TRACE_STATE_LEN, LIST_MEMBERS_SEPARATOR, LIST_MEMBER_KEY_VALUE_SPLITTER, TraceState;
var init_TraceState = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/TraceState.js"() {
    "use strict";
    init_validators();
    MAX_TRACE_STATE_ITEMS = 32;
    MAX_TRACE_STATE_LEN = 512;
    LIST_MEMBERS_SEPARATOR = ",";
    LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
    TraceState = /** @class */
    function() {
      function TraceState2(rawTraceState) {
        this._internalState = /* @__PURE__ */ new Map();
        if (rawTraceState)
          this._parse(rawTraceState);
      }
      __name(TraceState2, "TraceState");
      TraceState2.prototype.set = function(key, value) {
        var traceState = this._clone();
        if (traceState._internalState.has(key)) {
          traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
      };
      TraceState2.prototype.unset = function(key) {
        var traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
      };
      TraceState2.prototype.get = function(key) {
        return this._internalState.get(key);
      };
      TraceState2.prototype.serialize = function() {
        var _this = this;
        return this._keys().reduce(function(agg, key) {
          agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + _this.get(key));
          return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR);
      };
      TraceState2.prototype._parse = function(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN)
          return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse().reduce(function(agg, part) {
          var listMember = part.trim();
          var i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
          if (i !== -1) {
            var key = listMember.slice(0, i);
            var value = listMember.slice(i + 1, part.length);
            if (validateKey(key) && validateValue(value)) {
              agg.set(key, value);
            } else {
            }
          }
          return agg;
        }, /* @__PURE__ */ new Map());
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
          this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
        }
      };
      TraceState2.prototype._keys = function() {
        return Array.from(this._internalState.keys()).reverse();
      };
      TraceState2.prototype._clone = function() {
        var traceState = new TraceState2();
        traceState._internalState = new Map(this._internalState);
        return traceState;
      };
      return TraceState2;
    }();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/W3CTraceContextPropagator.js
function parseTraceParent(traceParent) {
  var match = TRACE_PARENT_REGEX.exec(traceParent);
  if (!match)
    return null;
  if (match[1] === "00" && match[5])
    return null;
  return {
    traceId: match[2],
    spanId: match[3],
    traceFlags: parseInt(match[4], 16)
  };
}
var import_api8, TRACE_PARENT_HEADER, TRACE_STATE_HEADER, VERSION2, VERSION_PART, TRACE_ID_PART, PARENT_ID_PART, FLAGS_PART, TRACE_PARENT_REGEX, W3CTraceContextPropagator;
var init_W3CTraceContextPropagator = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/W3CTraceContextPropagator.js"() {
    "use strict";
    import_api8 = require("@opentelemetry/api");
    init_suppress_tracing();
    init_TraceState();
    TRACE_PARENT_HEADER = "traceparent";
    TRACE_STATE_HEADER = "tracestate";
    VERSION2 = "00";
    VERSION_PART = "(?!ff)[\\da-f]{2}";
    TRACE_ID_PART = "(?![0]{32})[\\da-f]{32}";
    PARENT_ID_PART = "(?![0]{16})[\\da-f]{16}";
    FLAGS_PART = "[\\da-f]{2}";
    TRACE_PARENT_REGEX = new RegExp("^\\s?(" + VERSION_PART + ")-(" + TRACE_ID_PART + ")-(" + PARENT_ID_PART + ")-(" + FLAGS_PART + ")(-.*)?\\s?$");
    __name(parseTraceParent, "parseTraceParent");
    W3CTraceContextPropagator = /** @class */
    function() {
      function W3CTraceContextPropagator2() {
      }
      __name(W3CTraceContextPropagator2, "W3CTraceContextPropagator");
      W3CTraceContextPropagator2.prototype.inject = function(context, carrier, setter) {
        var spanContext = import_api8.trace.getSpanContext(context);
        if (!spanContext || isTracingSuppressed(context) || !(0, import_api8.isSpanContextValid)(spanContext))
          return;
        var traceParent = VERSION2 + "-" + spanContext.traceId + "-" + spanContext.spanId + "-0" + Number(spanContext.traceFlags || import_api8.TraceFlags.NONE).toString(16);
        setter.set(carrier, TRACE_PARENT_HEADER, traceParent);
        if (spanContext.traceState) {
          setter.set(carrier, TRACE_STATE_HEADER, spanContext.traceState.serialize());
        }
      };
      W3CTraceContextPropagator2.prototype.extract = function(context, carrier, getter) {
        var traceParentHeader = getter.get(carrier, TRACE_PARENT_HEADER);
        if (!traceParentHeader)
          return context;
        var traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
        if (typeof traceParent !== "string")
          return context;
        var spanContext = parseTraceParent(traceParent);
        if (!spanContext)
          return context;
        spanContext.isRemote = true;
        var traceStateHeader = getter.get(carrier, TRACE_STATE_HEADER);
        if (traceStateHeader) {
          var state = Array.isArray(traceStateHeader) ? traceStateHeader.join(",") : traceStateHeader;
          spanContext.traceState = new TraceState(typeof state === "string" ? state : void 0);
        }
        return import_api8.trace.setSpanContext(context, spanContext);
      };
      W3CTraceContextPropagator2.prototype.fields = function() {
        return [TRACE_PARENT_HEADER, TRACE_STATE_HEADER];
      };
      return W3CTraceContextPropagator2;
    }();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/IdGenerator.js
var init_IdGenerator = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/IdGenerator.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/rpc-metadata.js
var import_api9, RPC_METADATA_KEY, RPCType;
var init_rpc_metadata = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/rpc-metadata.js"() {
    "use strict";
    import_api9 = require("@opentelemetry/api");
    RPC_METADATA_KEY = (0, import_api9.createContextKey)("OpenTelemetry SDK Context Key RPC_METADATA");
    (function(RPCType2) {
      RPCType2["HTTP"] = "http";
    })(RPCType || (RPCType = {}));
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/sampler/AlwaysOffSampler.js
var import_api10, AlwaysOffSampler;
var init_AlwaysOffSampler = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/sampler/AlwaysOffSampler.js"() {
    "use strict";
    import_api10 = require("@opentelemetry/api");
    AlwaysOffSampler = /** @class */
    function() {
      function AlwaysOffSampler2() {
      }
      __name(AlwaysOffSampler2, "AlwaysOffSampler");
      AlwaysOffSampler2.prototype.shouldSample = function() {
        return {
          decision: import_api10.SamplingDecision.NOT_RECORD
        };
      };
      AlwaysOffSampler2.prototype.toString = function() {
        return "AlwaysOffSampler";
      };
      return AlwaysOffSampler2;
    }();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/sampler/AlwaysOnSampler.js
var import_api11, AlwaysOnSampler;
var init_AlwaysOnSampler = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/sampler/AlwaysOnSampler.js"() {
    "use strict";
    import_api11 = require("@opentelemetry/api");
    AlwaysOnSampler = /** @class */
    function() {
      function AlwaysOnSampler2() {
      }
      __name(AlwaysOnSampler2, "AlwaysOnSampler");
      AlwaysOnSampler2.prototype.shouldSample = function() {
        return {
          decision: import_api11.SamplingDecision.RECORD_AND_SAMPLED
        };
      };
      AlwaysOnSampler2.prototype.toString = function() {
        return "AlwaysOnSampler";
      };
      return AlwaysOnSampler2;
    }();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/sampler/ParentBasedSampler.js
var import_api12, ParentBasedSampler;
var init_ParentBasedSampler = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/sampler/ParentBasedSampler.js"() {
    "use strict";
    import_api12 = require("@opentelemetry/api");
    init_global_error_handler();
    init_AlwaysOffSampler();
    init_AlwaysOnSampler();
    ParentBasedSampler = /** @class */
    function() {
      function ParentBasedSampler2(config5) {
        var _a2, _b, _c, _d;
        this._root = config5.root;
        if (!this._root) {
          globalErrorHandler(new Error("ParentBasedSampler must have a root sampler configured"));
          this._root = new AlwaysOnSampler();
        }
        this._remoteParentSampled = (_a2 = config5.remoteParentSampled) !== null && _a2 !== void 0 ? _a2 : new AlwaysOnSampler();
        this._remoteParentNotSampled = (_b = config5.remoteParentNotSampled) !== null && _b !== void 0 ? _b : new AlwaysOffSampler();
        this._localParentSampled = (_c = config5.localParentSampled) !== null && _c !== void 0 ? _c : new AlwaysOnSampler();
        this._localParentNotSampled = (_d = config5.localParentNotSampled) !== null && _d !== void 0 ? _d : new AlwaysOffSampler();
      }
      __name(ParentBasedSampler2, "ParentBasedSampler");
      ParentBasedSampler2.prototype.shouldSample = function(context, traceId, spanName, spanKind, attributes, links) {
        var parentContext = import_api12.trace.getSpanContext(context);
        if (!parentContext || !(0, import_api12.isSpanContextValid)(parentContext)) {
          return this._root.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.isRemote) {
          if (parentContext.traceFlags & import_api12.TraceFlags.SAMPLED) {
            return this._remoteParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
          }
          return this._remoteParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.traceFlags & import_api12.TraceFlags.SAMPLED) {
          return this._localParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        return this._localParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
      };
      ParentBasedSampler2.prototype.toString = function() {
        return "ParentBased{root=" + this._root.toString() + ", remoteParentSampled=" + this._remoteParentSampled.toString() + ", remoteParentNotSampled=" + this._remoteParentNotSampled.toString() + ", localParentSampled=" + this._localParentSampled.toString() + ", localParentNotSampled=" + this._localParentNotSampled.toString() + "}";
      };
      return ParentBasedSampler2;
    }();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/sampler/TraceIdRatioBasedSampler.js
var import_api13, TraceIdRatioBasedSampler;
var init_TraceIdRatioBasedSampler = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/sampler/TraceIdRatioBasedSampler.js"() {
    "use strict";
    import_api13 = require("@opentelemetry/api");
    TraceIdRatioBasedSampler = /** @class */
    function() {
      function TraceIdRatioBasedSampler2(_ratio) {
        if (_ratio === void 0) {
          _ratio = 0;
        }
        this._ratio = _ratio;
        this._ratio = this._normalize(_ratio);
        this._upperBound = Math.floor(this._ratio * 4294967295);
      }
      __name(TraceIdRatioBasedSampler2, "TraceIdRatioBasedSampler");
      TraceIdRatioBasedSampler2.prototype.shouldSample = function(context, traceId) {
        return {
          decision: (0, import_api13.isValidTraceId)(traceId) && this._accumulate(traceId) < this._upperBound ? import_api13.SamplingDecision.RECORD_AND_SAMPLED : import_api13.SamplingDecision.NOT_RECORD
        };
      };
      TraceIdRatioBasedSampler2.prototype.toString = function() {
        return "TraceIdRatioBased{" + this._ratio + "}";
      };
      TraceIdRatioBasedSampler2.prototype._normalize = function(ratio) {
        if (typeof ratio !== "number" || isNaN(ratio))
          return 0;
        return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
      };
      TraceIdRatioBasedSampler2.prototype._accumulate = function(traceId) {
        var accumulation = 0;
        for (var i = 0; i < traceId.length / 8; i++) {
          var pos = i * 8;
          var part = parseInt(traceId.slice(pos, pos + 8), 16);
          accumulation = (accumulation ^ part) >>> 0;
        }
        return accumulation;
      };
      return TraceIdRatioBasedSampler2;
    }();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/merge.js
var init_merge = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/merge.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/timeout.js
var __extends, TimeoutError;
var init_timeout = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/timeout.js"() {
    "use strict";
    __extends = /* @__PURE__ */ function() {
      var extendStatics = /* @__PURE__ */ __name(function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      }, "extendStatics");
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        __name(__, "__");
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    TimeoutError = /** @class */
    function(_super) {
      __extends(TimeoutError2, _super);
      function TimeoutError2(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, TimeoutError2.prototype);
        return _this;
      }
      __name(TimeoutError2, "TimeoutError");
      return TimeoutError2;
    }(Error);
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/url.js
var init_url = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/url.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/wrap.js
var init_wrap = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/wrap.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/promise.js
var Deferred;
var init_promise = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/promise.js"() {
    "use strict";
    Deferred = /** @class */
    function() {
      function Deferred2() {
        var _this = this;
        this._promise = new Promise(function(resolve, reject) {
          _this._resolve = resolve;
          _this._reject = reject;
        });
      }
      __name(Deferred2, "Deferred");
      Object.defineProperty(Deferred2.prototype, "promise", {
        get: function() {
          return this._promise;
        },
        enumerable: false,
        configurable: true
      });
      Deferred2.prototype.resolve = function(val) {
        this._resolve(val);
      };
      Deferred2.prototype.reject = function(err) {
        this._reject(err);
      };
      return Deferred2;
    }();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/callback.js
var __read2, __spreadArray, BindOnceFuture;
var init_callback = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/callback.js"() {
    "use strict";
    init_promise();
    __read2 = function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
        return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
          ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"]))
            m.call(i);
        } finally {
          if (e)
            throw e.error;
        }
      }
      return ar;
    };
    __spreadArray = function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    BindOnceFuture = /** @class */
    function() {
      function BindOnceFuture2(_callback, _that) {
        this._callback = _callback;
        this._that = _that;
        this._isCalled = false;
        this._deferred = new Deferred();
      }
      __name(BindOnceFuture2, "BindOnceFuture");
      Object.defineProperty(BindOnceFuture2.prototype, "isCalled", {
        get: function() {
          return this._isCalled;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(BindOnceFuture2.prototype, "promise", {
        get: function() {
          return this._deferred.promise;
        },
        enumerable: false,
        configurable: true
      });
      BindOnceFuture2.prototype.call = function() {
        var _a2;
        var _this = this;
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args2[_i] = arguments[_i];
        }
        if (!this._isCalled) {
          this._isCalled = true;
          try {
            Promise.resolve((_a2 = this._callback).call.apply(_a2, __spreadArray([this._that], __read2(args2), false))).then(function(val) {
              return _this._deferred.resolve(val);
            }, function(err) {
              return _this._deferred.reject(err);
            });
          } catch (err) {
            this._deferred.reject(err);
          }
        }
        return this._deferred.promise;
      };
      return BindOnceFuture2;
    }();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/index.js
var init_esm = __esm({
  "../../node_modules/.pnpm/@opentelemetry+core@1.24.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/index.js"() {
    "use strict";
    init_W3CBaggagePropagator();
    init_anchored_clock();
    init_attributes();
    init_global_error_handler();
    init_logging_error_handler();
    init_time();
    init_types();
    init_hex_to_binary();
    init_ExportResult();
    init_utils();
    init_platform();
    init_composite();
    init_W3CTraceContextPropagator();
    init_IdGenerator();
    init_rpc_metadata();
    init_AlwaysOffSampler();
    init_AlwaysOnSampler();
    init_ParentBasedSampler();
    init_TraceIdRatioBasedSampler();
    init_suppress_tracing();
    init_TraceState();
    init_environment();
    init_merge();
    init_sampling();
    init_timeout();
    init_url();
    init_wrap();
    init_callback();
    init_version();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/util.js
function parseHeaders(partialHeaders) {
  if (partialHeaders === void 0) {
    partialHeaders = {};
  }
  var headers = {};
  Object.entries(partialHeaders).forEach(function(_a2) {
    var _b = __read3(_a2, 2), key = _b[0], value = _b[1];
    if (typeof value !== "undefined") {
      headers[key] = String(value);
    } else {
      import_api14.diag.warn('Header "' + key + '" has invalid value (' + value + ") and will be ignored");
    }
  });
  return headers;
}
function appendResourcePathToUrl(url2, path) {
  if (!url2.endsWith("/")) {
    url2 = url2 + "/";
  }
  return url2 + path;
}
function appendRootPathToUrlIfNeeded(url2) {
  try {
    var parsedUrl = new URL(url2);
    if (parsedUrl.pathname === "") {
      parsedUrl.pathname = parsedUrl.pathname + "/";
    }
    return parsedUrl.toString();
  } catch (_a2) {
    import_api14.diag.warn("Could not parse export URL: '" + url2 + "'");
    return url2;
  }
}
function configureExporterTimeout(timeoutMillis) {
  if (typeof timeoutMillis === "number") {
    if (timeoutMillis <= 0) {
      return invalidTimeout(timeoutMillis, DEFAULT_TRACE_TIMEOUT);
    }
    return timeoutMillis;
  } else {
    return getExporterTimeoutFromEnv();
  }
}
function getExporterTimeoutFromEnv() {
  var _a2;
  var definedTimeout = Number((_a2 = getEnv().OTEL_EXPORTER_OTLP_TRACES_TIMEOUT) !== null && _a2 !== void 0 ? _a2 : getEnv().OTEL_EXPORTER_OTLP_TIMEOUT);
  if (definedTimeout <= 0) {
    return invalidTimeout(definedTimeout, DEFAULT_TRACE_TIMEOUT);
  } else {
    return definedTimeout;
  }
}
function invalidTimeout(timeout, defaultTimeout) {
  import_api14.diag.warn("Timeout must be greater than 0", timeout);
  return defaultTimeout;
}
function isExportRetryable(statusCode) {
  var retryCodes = [429, 502, 503, 504];
  return retryCodes.includes(statusCode);
}
function parseRetryAfterToMills(retryAfter) {
  if (retryAfter == null) {
    return -1;
  }
  var seconds = Number.parseInt(retryAfter, 10);
  if (Number.isInteger(seconds)) {
    return seconds > 0 ? seconds * 1e3 : -1;
  }
  var delay = new Date(retryAfter).getTime() - Date.now();
  if (delay >= 0) {
    return delay;
  }
  return 0;
}
var import_api14, __read3, DEFAULT_TRACE_TIMEOUT, DEFAULT_EXPORT_MAX_ATTEMPTS, DEFAULT_EXPORT_INITIAL_BACKOFF, DEFAULT_EXPORT_MAX_BACKOFF, DEFAULT_EXPORT_BACKOFF_MULTIPLIER;
var init_util = __esm({
  "../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/util.js"() {
    "use strict";
    import_api14 = require("@opentelemetry/api");
    init_esm();
    __read3 = function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
        return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
          ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"]))
            m.call(i);
        } finally {
          if (e)
            throw e.error;
        }
      }
      return ar;
    };
    DEFAULT_TRACE_TIMEOUT = 1e4;
    DEFAULT_EXPORT_MAX_ATTEMPTS = 5;
    DEFAULT_EXPORT_INITIAL_BACKOFF = 1e3;
    DEFAULT_EXPORT_MAX_BACKOFF = 5e3;
    DEFAULT_EXPORT_BACKOFF_MULTIPLIER = 1.5;
    __name(parseHeaders, "parseHeaders");
    __name(appendResourcePathToUrl, "appendResourcePathToUrl");
    __name(appendRootPathToUrlIfNeeded, "appendRootPathToUrlIfNeeded");
    __name(configureExporterTimeout, "configureExporterTimeout");
    __name(getExporterTimeoutFromEnv, "getExporterTimeoutFromEnv");
    __name(invalidTimeout, "invalidTimeout");
    __name(isExportRetryable, "isExportRetryable");
    __name(parseRetryAfterToMills, "parseRetryAfterToMills");
  }
});

// ../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/OTLPExporterBase.js
var import_api15, OTLPExporterBase;
var init_OTLPExporterBase = __esm({
  "../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/OTLPExporterBase.js"() {
    "use strict";
    import_api15 = require("@opentelemetry/api");
    init_esm();
    init_util();
    OTLPExporterBase = /** @class */
    function() {
      function OTLPExporterBase2(config5) {
        if (config5 === void 0) {
          config5 = {};
        }
        this._sendingPromises = [];
        this.url = this.getDefaultUrl(config5);
        if (typeof config5.hostname === "string") {
          this.hostname = config5.hostname;
        }
        this.shutdown = this.shutdown.bind(this);
        this._shutdownOnce = new BindOnceFuture(this._shutdown, this);
        this._concurrencyLimit = typeof config5.concurrencyLimit === "number" ? config5.concurrencyLimit : 30;
        this.timeoutMillis = configureExporterTimeout(config5.timeoutMillis);
        this.onInit(config5);
      }
      __name(OTLPExporterBase2, "OTLPExporterBase");
      OTLPExporterBase2.prototype.export = function(items, resultCallback) {
        if (this._shutdownOnce.isCalled) {
          resultCallback({
            code: ExportResultCode.FAILED,
            error: new Error("Exporter has been shutdown")
          });
          return;
        }
        if (this._sendingPromises.length >= this._concurrencyLimit) {
          resultCallback({
            code: ExportResultCode.FAILED,
            error: new Error("Concurrent export limit reached")
          });
          return;
        }
        this._export(items).then(function() {
          resultCallback({ code: ExportResultCode.SUCCESS });
        }).catch(function(error) {
          resultCallback({ code: ExportResultCode.FAILED, error });
        });
      };
      OTLPExporterBase2.prototype._export = function(items) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          try {
            import_api15.diag.debug("items to be sent", items);
            _this.send(items, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };
      OTLPExporterBase2.prototype.shutdown = function() {
        return this._shutdownOnce.call();
      };
      OTLPExporterBase2.prototype.forceFlush = function() {
        return Promise.all(this._sendingPromises).then(function() {
        });
      };
      OTLPExporterBase2.prototype._shutdown = function() {
        import_api15.diag.debug("shutdown started");
        this.onShutdown();
        return this.forceFlush();
      };
      return OTLPExporterBase2;
    }();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/platform/node/types.js
var CompressionAlgorithm;
var init_types2 = __esm({
  "../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/platform/node/types.js"() {
    "use strict";
    (function(CompressionAlgorithm2) {
      CompressionAlgorithm2["NONE"] = "none";
      CompressionAlgorithm2["GZIP"] = "gzip";
    })(CompressionAlgorithm || (CompressionAlgorithm = {}));
  }
});

// ../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/types.js
var __extends2, OTLPExporterError;
var init_types3 = __esm({
  "../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/types.js"() {
    "use strict";
    __extends2 = /* @__PURE__ */ function() {
      var extendStatics = /* @__PURE__ */ __name(function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      }, "extendStatics");
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        __name(__, "__");
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    OTLPExporterError = /** @class */
    function(_super) {
      __extends2(OTLPExporterError2, _super);
      function OTLPExporterError2(message, code, data) {
        var _this = _super.call(this, message) || this;
        _this.name = "OTLPExporterError";
        _this.data = data;
        _this.code = code;
        return _this;
      }
      __name(OTLPExporterError2, "OTLPExporterError");
      return OTLPExporterError2;
    }(Error);
  }
});

// ../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/platform/node/util.js
function sendWithHttp(collector, data, contentType, onSuccess, onError) {
  var exporterTimeout = collector.timeoutMillis;
  var parsedUrl = new url.URL(collector.url);
  var nodeVersion = Number(process.versions.node.split(".")[0]);
  var retryTimer;
  var req;
  var reqIsDestroyed = false;
  var exporterTimer = setTimeout(function() {
    clearTimeout(retryTimer);
    reqIsDestroyed = true;
    if (req.destroyed) {
      var err = new OTLPExporterError("Request Timeout");
      onError(err);
    } else {
      nodeVersion >= 14 ? req.destroy() : req.abort();
    }
  }, exporterTimeout);
  var options3 = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.pathname,
    method: "POST",
    headers: __assign({ "Content-Type": contentType }, collector.headers),
    agent: collector.agent
  };
  var request3 = parsedUrl.protocol === "http:" ? http.request : https.request;
  var sendWithRetry = /* @__PURE__ */ __name(function(retries, minDelay) {
    if (retries === void 0) {
      retries = DEFAULT_EXPORT_MAX_ATTEMPTS;
    }
    if (minDelay === void 0) {
      minDelay = DEFAULT_EXPORT_INITIAL_BACKOFF;
    }
    req = request3(options3, function(res) {
      var responseData = "";
      res.on("data", function(chunk) {
        return responseData += chunk;
      });
      res.on("aborted", function() {
        if (reqIsDestroyed) {
          var err = new OTLPExporterError("Request Timeout");
          onError(err);
        }
      });
      res.on("end", function() {
        if (reqIsDestroyed === false) {
          if (res.statusCode && res.statusCode < 299) {
            import_api16.diag.debug("statusCode: " + res.statusCode, responseData);
            onSuccess();
            clearTimeout(exporterTimer);
            clearTimeout(retryTimer);
          } else if (res.statusCode && isExportRetryable(res.statusCode) && retries > 0) {
            var retryTime = void 0;
            minDelay = DEFAULT_EXPORT_BACKOFF_MULTIPLIER * minDelay;
            if (res.headers["retry-after"]) {
              retryTime = parseRetryAfterToMills(res.headers["retry-after"]);
            } else {
              retryTime = Math.round(Math.random() * (DEFAULT_EXPORT_MAX_BACKOFF - minDelay) + minDelay);
            }
            retryTimer = setTimeout(function() {
              sendWithRetry(retries - 1, minDelay);
            }, retryTime);
          } else {
            var error = new OTLPExporterError(res.statusMessage, res.statusCode, responseData);
            onError(error);
            clearTimeout(exporterTimer);
            clearTimeout(retryTimer);
          }
        }
      });
    });
    req.on("error", function(error) {
      if (reqIsDestroyed) {
        var err = new OTLPExporterError("Request Timeout", error.code);
        onError(err);
      } else {
        onError(error);
      }
      clearTimeout(exporterTimer);
      clearTimeout(retryTimer);
    });
    req.on("abort", function() {
      if (reqIsDestroyed) {
        var err = new OTLPExporterError("Request Timeout");
        onError(err);
      }
      clearTimeout(exporterTimer);
      clearTimeout(retryTimer);
    });
    switch (collector.compression) {
      case CompressionAlgorithm.GZIP: {
        req.setHeader("Content-Encoding", "gzip");
        var dataStream = readableFromBuffer(data);
        dataStream.on("error", onError).pipe(zlib.createGzip()).on("error", onError).pipe(req);
        break;
      }
      default:
        req.end(data);
        break;
    }
  }, "sendWithRetry");
  sendWithRetry();
}
function readableFromBuffer(buff) {
  var readable = new import_stream.Readable();
  readable.push(buff);
  readable.push(null);
  return readable;
}
function createHttpAgent(config5) {
  if (config5.httpAgentOptions && config5.keepAlive === false) {
    import_api16.diag.warn("httpAgentOptions is used only when keepAlive is true");
    return void 0;
  }
  if (config5.keepAlive === false || !config5.url)
    return void 0;
  try {
    var parsedUrl = new url.URL(config5.url);
    var Agent3 = parsedUrl.protocol === "http:" ? http.Agent : https.Agent;
    return new Agent3(__assign({ keepAlive: true }, config5.httpAgentOptions));
  } catch (err) {
    import_api16.diag.error("collector exporter failed to create http agent. err: " + err.message);
    return void 0;
  }
}
function configureCompression(compression) {
  if (compression) {
    return compression;
  } else {
    var definedCompression = getEnv().OTEL_EXPORTER_OTLP_TRACES_COMPRESSION || getEnv().OTEL_EXPORTER_OTLP_COMPRESSION;
    return definedCompression === CompressionAlgorithm.GZIP ? CompressionAlgorithm.GZIP : CompressionAlgorithm.NONE;
  }
}
var url, http, https, zlib, import_stream, import_api16, __assign;
var init_util2 = __esm({
  "../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/platform/node/util.js"() {
    "use strict";
    url = __toESM(require("url"));
    http = __toESM(require("http"));
    https = __toESM(require("https"));
    zlib = __toESM(require("zlib"));
    import_stream = require("stream");
    import_api16 = require("@opentelemetry/api");
    init_types2();
    init_esm();
    init_types3();
    init_util();
    __assign = function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    __name(sendWithHttp, "sendWithHttp");
    __name(readableFromBuffer, "readableFromBuffer");
    __name(createHttpAgent, "createHttpAgent");
    __name(configureCompression, "configureCompression");
  }
});

// ../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/platform/node/OTLPExporterNodeBase.js
var import_api17, __extends3, OTLPExporterNodeBase;
var init_OTLPExporterNodeBase = __esm({
  "../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/platform/node/OTLPExporterNodeBase.js"() {
    "use strict";
    init_OTLPExporterBase();
    init_util();
    init_util2();
    import_api17 = require("@opentelemetry/api");
    init_esm();
    __extends3 = /* @__PURE__ */ function() {
      var extendStatics = /* @__PURE__ */ __name(function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      }, "extendStatics");
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        __name(__, "__");
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    OTLPExporterNodeBase = /** @class */
    function(_super) {
      __extends3(OTLPExporterNodeBase2, _super);
      function OTLPExporterNodeBase2(config5) {
        if (config5 === void 0) {
          config5 = {};
        }
        var _this = _super.call(this, config5) || this;
        _this.DEFAULT_HEADERS = {};
        if (config5.metadata) {
          import_api17.diag.warn("Metadata cannot be set when using http");
        }
        _this.headers = Object.assign(_this.DEFAULT_HEADERS, parseHeaders(config5.headers), utils_exports.parseKeyPairsIntoRecord(getEnv().OTEL_EXPORTER_OTLP_HEADERS));
        _this.agent = createHttpAgent(config5);
        _this.compression = configureCompression(config5.compression);
        return _this;
      }
      __name(OTLPExporterNodeBase2, "OTLPExporterNodeBase");
      OTLPExporterNodeBase2.prototype.onInit = function(_config) {
      };
      OTLPExporterNodeBase2.prototype.send = function(objects, onSuccess, onError) {
        var _this = this;
        if (this._shutdownOnce.isCalled) {
          import_api17.diag.debug("Shutdown already started. Cannot send objects");
          return;
        }
        var serviceRequest = this.convert(objects);
        var promise = new Promise(function(resolve, reject) {
          sendWithHttp(_this, JSON.stringify(serviceRequest), "application/json", resolve, reject);
        }).then(onSuccess, onError);
        this._sendingPromises.push(promise);
        var popPromise = /* @__PURE__ */ __name(function() {
          var index = _this._sendingPromises.indexOf(promise);
          _this._sendingPromises.splice(index, 1);
        }, "popPromise");
        promise.then(popPromise, popPromise);
      };
      OTLPExporterNodeBase2.prototype.onShutdown = function() {
      };
      return OTLPExporterNodeBase2;
    }(OTLPExporterBase);
  }
});

// ../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/platform/node/index.js
var init_node2 = __esm({
  "../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/platform/node/index.js"() {
    "use strict";
    init_OTLPExporterNodeBase();
    init_util2();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/platform/index.js
var init_platform2 = __esm({
  "../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/platform/index.js"() {
    "use strict";
    init_node2();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/index.js
var init_esm2 = __esm({
  "../../node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/index.js"() {
    "use strict";
    init_platform2();
    init_types3();
    init_util();
  }
});

// ../../node_modules/.pnpm/@protobufjs+aspromise@1.1.2/node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "../../node_modules/.pnpm/@protobufjs+aspromise@1.1.2/node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    module2.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
      while (index < arguments.length)
        params[offset++] = arguments[index++];
      return new Promise(/* @__PURE__ */ __name(function executor(resolve, reject) {
        params[offset] = /* @__PURE__ */ __name(function callback(err) {
          if (pending) {
            pending = false;
            if (err)
              reject(err);
            else {
              var params2 = new Array(arguments.length - 1), offset2 = 0;
              while (offset2 < params2.length)
                params2[offset2++] = arguments[offset2];
              resolve.apply(null, params2);
            }
          }
        }, "callback");
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      }, "executor"));
    }
    __name(asPromise, "asPromise");
  }
});

// ../../node_modules/.pnpm/@protobufjs+base64@1.1.2/node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "../../node_modules/.pnpm/@protobufjs+base64@1.1.2/node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    var base64 = exports2;
    base64.length = /* @__PURE__ */ __name(function length(string) {
      var p = string.length;
      if (!p)
        return 0;
      var n = 0;
      while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
      return Math.ceil(string.length * 3) / 4 - n;
    }, "length");
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    base64.encode = /* @__PURE__ */ __name(function encode(buffer, start, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start < end) {
        var b = buffer[start++];
        switch (j) {
          case 0:
            chunk[i2++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i2++] = b64[t | b >> 4];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i2++] = b64[t | b >> 6];
            chunk[i2++] = b64[b & 63];
            j = 0;
            break;
        }
        if (i2 > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i2 = 0;
        }
      }
      if (j) {
        chunk[i2++] = b64[t];
        chunk[i2++] = 61;
        if (j === 1)
          chunk[i2++] = 61;
      }
      if (parts) {
        if (i2)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i2));
    }, "encode");
    var invalidEncoding = "invalid encoding";
    base64.decode = /* @__PURE__ */ __name(function decode(string, buffer, offset) {
      var start = offset;
      var j = 0, t;
      for (var i2 = 0; i2 < string.length; ) {
        var c = string.charCodeAt(i2++);
        if (c === 61 && j > 1)
          break;
        if ((c = s64[c]) === void 0)
          throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer[offset++] = t << 2 | (c & 48) >> 4;
            t = c;
            j = 2;
            break;
          case 2:
            buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
            t = c;
            j = 3;
            break;
          case 3:
            buffer[offset++] = (t & 3) << 6 | c;
            j = 0;
            break;
        }
      }
      if (j === 1)
        throw Error(invalidEncoding);
      return offset - start;
    }, "decode");
    base64.test = /* @__PURE__ */ __name(function test(string) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
    }, "test");
  }
});

// ../../node_modules/.pnpm/@protobufjs+eventemitter@1.1.0/node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "../../node_modules/.pnpm/@protobufjs+eventemitter@1.1.0/node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    module2.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = {};
    }
    __name(EventEmitter, "EventEmitter");
    EventEmitter.prototype.on = /* @__PURE__ */ __name(function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    }, "on");
    EventEmitter.prototype.off = /* @__PURE__ */ __name(function off(evt, fn) {
      if (evt === void 0)
        this._listeners = {};
      else {
        if (fn === void 0)
          this._listeners[evt] = [];
        else {
          var listeners = this._listeners[evt];
          for (var i = 0; i < listeners.length; )
            if (listeners[i].fn === fn)
              listeners.splice(i, 1);
            else
              ++i;
        }
      }
      return this;
    }, "off");
    EventEmitter.prototype.emit = /* @__PURE__ */ __name(function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args2 = [], i = 1;
        for (; i < arguments.length; )
          args2.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args2);
      }
      return this;
    }, "emit");
  }
});

// ../../node_modules/.pnpm/@protobufjs+float@1.0.2/node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "../../node_modules/.pnpm/@protobufjs+float@1.0.2/node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    module2.exports = factory(factory);
    function factory(exports3) {
      if (typeof Float32Array !== "undefined")
        (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          __name(writeFloat_f32_cpy, "writeFloat_f32_cpy");
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          __name(writeFloat_f32_rev, "writeFloat_f32_rev");
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          __name(readFloat_f32_cpy, "readFloat_f32_cpy");
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          __name(readFloat_f32_rev, "readFloat_f32_rev");
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
      else
        (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          __name(writeFloat_ieee754, "writeFloat_ieee754");
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          __name(readFloat_ieee754, "readFloat_ieee754");
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
      if (typeof Float64Array !== "undefined")
        (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          __name(writeDouble_f64_cpy, "writeDouble_f64_cpy");
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          __name(writeDouble_f64_rev, "writeDouble_f64_rev");
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          __name(readDouble_f64_cpy, "readDouble_f64_cpy");
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          __name(readDouble_f64_rev, "readDouble_f64_rev");
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
      else
        (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          __name(writeDouble_ieee754, "writeDouble_ieee754");
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          __name(readDouble_ieee754, "readDouble_ieee754");
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports3;
    }
    __name(factory, "factory");
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    __name(writeUintLE, "writeUintLE");
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = val >>> 16 & 255;
      buf[pos + 2] = val >>> 8 & 255;
      buf[pos + 3] = val & 255;
    }
    __name(writeUintBE, "writeUintBE");
    function readUintLE(buf, pos) {
      return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
    }
    __name(readUintLE, "readUintLE");
    function readUintBE(buf, pos) {
      return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
    }
    __name(readUintBE, "readUintBE");
  }
});

// ../../node_modules/.pnpm/@protobufjs+inquire@1.1.0/node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "../../node_modules/.pnpm/@protobufjs+inquire@1.1.0/node_modules/@protobufjs/inquire/index.js"(exports, module) {
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
          return mod;
      } catch (e) {
      }
      return null;
    }
    __name(inquire, "inquire");
  }
});

// ../../node_modules/.pnpm/@protobufjs+utf8@1.1.0/node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "../../node_modules/.pnpm/@protobufjs+utf8@1.1.0/node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    var utf8 = exports2;
    utf8.length = /* @__PURE__ */ __name(function utf8_length(string) {
      var len = 0, c = 0;
      for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
          len += 1;
        else if (c < 2048)
          len += 2;
        else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
          ++i;
          len += 4;
        } else
          len += 3;
      }
      return len;
    }, "utf8_length");
    utf8.read = /* @__PURE__ */ __name(function utf8_read(buffer, start, end) {
      var len = end - start;
      if (len < 1)
        return "";
      var parts = null, chunk = [], i = 0, t;
      while (start < end) {
        t = buffer[start++];
        if (t < 128)
          chunk[i++] = t;
        else if (t > 191 && t < 224)
          chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
          t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
          chunk[i++] = 55296 + (t >> 10);
          chunk[i++] = 56320 + (t & 1023);
        } else
          chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i = 0;
        }
      }
      if (parts) {
        if (i)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i));
    }, "utf8_read");
    utf8.write = /* @__PURE__ */ __name(function utf8_write(string, buffer, offset) {
      var start = offset, c1, c2;
      for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
          buffer[offset++] = c1;
        } else if (c1 < 2048) {
          buffer[offset++] = c1 >> 6 | 192;
          buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer[offset++] = c1 >> 18 | 240;
          buffer[offset++] = c1 >> 12 & 63 | 128;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        } else {
          buffer[offset++] = c1 >> 12 | 224;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        }
      }
      return offset - start;
    }, "utf8_write");
  }
});

// ../../node_modules/.pnpm/@protobufjs+pool@1.1.0/node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "../../node_modules/.pnpm/@protobufjs+pool@1.1.0/node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    module2.exports = pool;
    function pool(alloc, slice, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return /* @__PURE__ */ __name(function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX)
          return alloc(size2);
        if (offset + size2 > SIZE) {
          slab = alloc(SIZE);
          offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf;
      }, "pool_alloc");
    }
    __name(pool, "pool");
  }
});

// ../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    module2.exports = LongBits;
    var util = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    __name(LongBits, "LongBits");
    var zero = LongBits.zero = new LongBits(0, 0);
    zero.toNumber = function() {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function() {
      return this;
    };
    zero.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    LongBits.fromNumber = /* @__PURE__ */ __name(function fromNumber(value) {
      if (value === 0)
        return zero;
      var sign = value < 0;
      if (sign)
        value = -value;
      var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295)
            hi = 0;
        }
      }
      return new LongBits(lo, hi);
    }, "fromNumber");
    LongBits.from = /* @__PURE__ */ __name(function from(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util.isString(value)) {
        if (util.Long)
          value = util.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    }, "from");
    LongBits.prototype.toNumber = /* @__PURE__ */ __name(function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    }, "toNumber");
    LongBits.prototype.toLong = /* @__PURE__ */ __name(function toLong(unsigned) {
      return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    }, "toLong");
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = /* @__PURE__ */ __name(function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits(
        (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
        (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
      );
    }, "fromHash");
    LongBits.prototype.toHash = /* @__PURE__ */ __name(function toHash() {
      return String.fromCharCode(
        this.lo & 255,
        this.lo >>> 8 & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24,
        this.hi & 255,
        this.hi >>> 8 & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
      );
    }, "toHash");
    LongBits.prototype.zzEncode = /* @__PURE__ */ __name(function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    }, "zzEncode");
    LongBits.prototype.zzDecode = /* @__PURE__ */ __name(function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    }, "zzDecode");
    LongBits.prototype.length = /* @__PURE__ */ __name(function length() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    }, "length");
  }
});

// ../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    var util = exports2;
    util.asPromise = require_aspromise();
    util.base64 = require_base64();
    util.EventEmitter = require_eventemitter();
    util.float = require_float();
    util.inquire = require_inquire();
    util.utf8 = require_utf8();
    util.pool = require_pool();
    util.LongBits = require_longbits();
    util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
    util.emptyArray = Object.freeze ? Object.freeze([]) : (
      /* istanbul ignore next */
      []
    );
    util.emptyObject = Object.freeze ? Object.freeze({}) : (
      /* istanbul ignore next */
      {}
    );
    util.isInteger = Number.isInteger || /* istanbul ignore next */
    /* @__PURE__ */ __name(function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    }, "isInteger");
    util.isString = /* @__PURE__ */ __name(function isString(value) {
      return typeof value === "string" || value instanceof String;
    }, "isString");
    util.isObject = /* @__PURE__ */ __name(function isObject2(value) {
      return value && typeof value === "object";
    }, "isObject");
    util.isset = /**
     * Checks if a property on a message is considered to be present.
     * @param {Object} obj Plain object or message instance
     * @param {string} prop Property name
     * @returns {boolean} `true` if considered to be present, otherwise `false`
     */
    util.isSet = /* @__PURE__ */ __name(function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    }, "isSet");
    util.Buffer = function() {
      try {
        var Buffer2 = util.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : (
          /* istanbul ignore next */
          null
        );
      } catch (e) {
        return null;
      }
    }();
    util._Buffer_from = null;
    util._Buffer_allocUnsafe = null;
    util.newBuffer = /* @__PURE__ */ __name(function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    }, "newBuffer");
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util.Long = /* istanbul ignore next */
    util.global.dcodeIO && /* istanbul ignore next */
    util.global.dcodeIO.Long || /* istanbul ignore next */
    util.global.Long || util.inquire("long");
    util.key2Re = /^true|false|0|1$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util.longToHash = /* @__PURE__ */ __name(function longToHash(value) {
      return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    }, "longToHash");
    util.longFromHash = /* @__PURE__ */ __name(function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    }, "longFromHash");
    function merge(dst, src, ifNotSet) {
      for (var keys4 = Object.keys(src), i = 0; i < keys4.length; ++i)
        if (dst[keys4[i]] === void 0 || !ifNotSet)
          dst[keys4[i]] = src[keys4[i]];
      return dst;
    }
    __name(merge, "merge");
    util.merge = merge;
    util.lcFirst = /* @__PURE__ */ __name(function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    }, "lcFirst");
    function newError(name) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge(this, properties);
      }
      __name(CustomError, "CustomError");
      CustomError.prototype = Object.create(Error.prototype, {
        constructor: {
          value: CustomError,
          writable: true,
          enumerable: false,
          configurable: true
        },
        name: {
          get: /* @__PURE__ */ __name(function get() {
            return name;
          }, "get"),
          set: void 0,
          enumerable: false,
          // configurable: false would accurately preserve the behavior of
          // the original, but I'm guessing that was not intentional.
          // For an actual error subclass, this property would
          // be configurable.
          configurable: true
        },
        toString: {
          value: /* @__PURE__ */ __name(function value() {
            return this.name + ": " + this.message;
          }, "value"),
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      return CustomError;
    }
    __name(newError, "newError");
    util.newError = newError;
    util.ProtocolError = newError("ProtocolError");
    util.oneOfGetter = /* @__PURE__ */ __name(function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys4 = Object.keys(this), i2 = keys4.length - 1; i2 > -1; --i2)
          if (fieldMap[keys4[i2]] === 1 && this[keys4[i2]] !== void 0 && this[keys4[i2]] !== null)
            return keys4[i2];
      };
    }, "getOneOf");
    util.oneOfSetter = /* @__PURE__ */ __name(function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    }, "setOneOf");
    util.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util._configure = function() {
      var Buffer2 = util.Buffer;
      if (!Buffer2) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
      }
      util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || /* istanbul ignore next */
      /* @__PURE__ */ __name(function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      }, "Buffer_from");
      util._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
      /* @__PURE__ */ __name(function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      }, "Buffer_allocUnsafe");
    };
  }
});

// ../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    module2.exports = Writer;
    var util = require_minimal();
    var BufferWriter;
    var LongBits = util.LongBits;
    var base64 = util.base64;
    var utf8 = util.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    __name(Op, "Op");
    function noop() {
    }
    __name(noop, "noop");
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    __name(State, "State");
    function Writer() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    __name(Writer, "Writer");
    var create = /* @__PURE__ */ __name(function create2() {
      return util.Buffer ? /* @__PURE__ */ __name(function create_buffer_setup() {
        return (Writer.create = /* @__PURE__ */ __name(function create_buffer() {
          return new BufferWriter();
        }, "create_buffer"))();
      }, "create_buffer_setup") : /* @__PURE__ */ __name(function create_array() {
        return new Writer();
      }, "create_array");
    }, "create");
    Writer.create = create();
    Writer.alloc = /* @__PURE__ */ __name(function alloc(size) {
      return new util.Array(size);
    }, "alloc");
    if (util.Array !== Array)
      Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
    Writer.prototype._push = /* @__PURE__ */ __name(function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    }, "push");
    function writeByte(val, buf, pos) {
      buf[pos] = val & 255;
    }
    __name(writeByte, "writeByte");
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf[pos] = val;
    }
    __name(writeVarint32, "writeVarint32");
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    __name(VarintOp, "VarintOp");
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer.prototype.uint32 = /* @__PURE__ */ __name(function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
        value
      )).len;
      return this;
    }, "write_uint32");
    Writer.prototype.int32 = /* @__PURE__ */ __name(function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    }, "write_int32");
    Writer.prototype.sint32 = /* @__PURE__ */ __name(function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    }, "write_sint32");
    function writeVarint64(val, buf, pos) {
      while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
      }
      while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
      }
      buf[pos++] = val.lo;
    }
    __name(writeVarint64, "writeVarint64");
    Writer.prototype.uint64 = /* @__PURE__ */ __name(function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    }, "write_uint64");
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = /* @__PURE__ */ __name(function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    }, "write_sint64");
    Writer.prototype.bool = /* @__PURE__ */ __name(function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    }, "write_bool");
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    __name(writeFixed32, "writeFixed32");
    Writer.prototype.fixed32 = /* @__PURE__ */ __name(function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    }, "write_fixed32");
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = /* @__PURE__ */ __name(function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    }, "write_fixed64");
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = /* @__PURE__ */ __name(function write_float(value) {
      return this._push(util.float.writeFloatLE, 4, value);
    }, "write_float");
    Writer.prototype.double = /* @__PURE__ */ __name(function write_double(value) {
      return this._push(util.float.writeDoubleLE, 8, value);
    }, "write_double");
    var writeBytes = util.Array.prototype.set ? /* @__PURE__ */ __name(function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    }, "writeBytes_set") : /* @__PURE__ */ __name(function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    }, "writeBytes_for");
    Writer.prototype.bytes = /* @__PURE__ */ __name(function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    }, "write_bytes");
    Writer.prototype.string = /* @__PURE__ */ __name(function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    }, "write_string");
    Writer.prototype.fork = /* @__PURE__ */ __name(function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    }, "fork");
    Writer.prototype.reset = /* @__PURE__ */ __name(function reset() {
      if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
      } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
      }
      return this;
    }, "reset");
    Writer.prototype.ldelim = /* @__PURE__ */ __name(function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    }, "ldelim");
    Writer.prototype.finish = /* @__PURE__ */ __name(function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    }, "finish");
    Writer._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer.create = create();
      BufferWriter._configure();
    };
  }
});

// ../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferWriter;
    var Writer = require_writer();
    (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
    var util = require_minimal();
    function BufferWriter() {
      Writer.call(this);
    }
    __name(BufferWriter, "BufferWriter");
    BufferWriter._configure = function() {
      BufferWriter.alloc = util._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? /* @__PURE__ */ __name(function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos);
      }, "writeBytesBuffer_set") : /* @__PURE__ */ __name(function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy)
          val.copy(buf, pos, 0, val.length);
        else
          for (var i = 0; i < val.length; )
            buf[pos++] = val[i++];
      }, "writeBytesBuffer_copy");
    };
    BufferWriter.prototype.bytes = /* @__PURE__ */ __name(function write_bytes_buffer(value) {
      if (util.isString(value))
        value = util._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    }, "write_bytes_buffer");
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    __name(writeStringBuffer, "writeStringBuffer");
    BufferWriter.prototype.string = /* @__PURE__ */ __name(function write_string_buffer(value) {
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    }, "write_string_buffer");
    BufferWriter._configure();
  }
});

// ../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    module2.exports = Reader;
    var util = require_minimal();
    var BufferReader;
    var LongBits = util.LongBits;
    var utf8 = util.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    __name(indexOutOfRange, "indexOutOfRange");
    function Reader(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
    }
    __name(Reader, "Reader");
    var create_array = typeof Uint8Array !== "undefined" ? /* @__PURE__ */ __name(function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    }, "create_typed_array") : /* @__PURE__ */ __name(function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    }, "create_array");
    var create = /* @__PURE__ */ __name(function create2() {
      return util.Buffer ? /* @__PURE__ */ __name(function create_buffer_setup(buffer) {
        return (Reader.create = /* @__PURE__ */ __name(function create_buffer(buffer2) {
          return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        }, "create_buffer"))(buffer);
      }, "create_buffer_setup") : create_array;
    }, "create");
    Reader.create = create();
    Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */
    util.Array.prototype.slice;
    Reader.prototype.uint32 = (/* @__PURE__ */ __name(function read_uint32_setup() {
      var value = 4294967295;
      return /* @__PURE__ */ __name(function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        if ((this.pos += 5) > this.len) {
          this.pos = this.len;
          throw indexOutOfRange(this, 10);
        }
        return value;
      }, "read_uint32");
    }, "read_uint32_setup"))();
    Reader.prototype.int32 = /* @__PURE__ */ __name(function read_int32() {
      return this.uint32() | 0;
    }, "read_int32");
    Reader.prototype.sint32 = /* @__PURE__ */ __name(function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    }, "read_sint32");
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      }
      throw Error("invalid varint encoding");
    }
    __name(readLongVarint, "readLongVarint");
    Reader.prototype.bool = /* @__PURE__ */ __name(function read_bool() {
      return this.uint32() !== 0;
    }, "read_bool");
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    __name(readFixed32_end, "readFixed32_end");
    Reader.prototype.fixed32 = /* @__PURE__ */ __name(function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    }, "read_fixed32");
    Reader.prototype.sfixed32 = /* @__PURE__ */ __name(function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    }, "read_sfixed32");
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    __name(readFixed64, "readFixed64");
    Reader.prototype.float = /* @__PURE__ */ __name(function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    }, "read_float");
    Reader.prototype.double = /* @__PURE__ */ __name(function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    }, "read_double");
    Reader.prototype.bytes = /* @__PURE__ */ __name(function read_bytes() {
      var length = this.uint32(), start = this.pos, end = this.pos + length;
      if (end > this.len)
        throw indexOutOfRange(this, length);
      this.pos += length;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      if (start === end) {
        var nativeBuffer = util.Buffer;
        return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
      }
      return this._slice.call(this.buf, start, end);
    }, "read_bytes");
    Reader.prototype.string = /* @__PURE__ */ __name(function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    }, "read_string");
    Reader.prototype.skip = /* @__PURE__ */ __name(function skip(length) {
      if (typeof length === "number") {
        if (this.pos + length > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
      } else {
        do {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
      }
      return this;
    }, "skip");
    Reader.prototype.skipType = function(wireType) {
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while ((wireType = this.uint32() & 7) !== 4) {
            this.skipType(wireType);
          }
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error("invalid wire type " + wireType + " at offset " + this.pos);
      }
      return this;
    };
    Reader._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader.create = create();
      BufferReader._configure();
      var fn = util.Long ? "toLong" : (
        /* istanbul ignore next */
        "toNumber"
      );
      util.merge(Reader.prototype, {
        int64: /* @__PURE__ */ __name(function read_int64() {
          return readLongVarint.call(this)[fn](false);
        }, "read_int64"),
        uint64: /* @__PURE__ */ __name(function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        }, "read_uint64"),
        sint64: /* @__PURE__ */ __name(function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        }, "read_sint64"),
        fixed64: /* @__PURE__ */ __name(function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        }, "read_fixed64"),
        sfixed64: /* @__PURE__ */ __name(function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        }, "read_sfixed64")
      });
    };
  }
});

// ../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferReader;
    var Reader = require_reader();
    (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
    var util = require_minimal();
    function BufferReader(buffer) {
      Reader.call(this, buffer);
    }
    __name(BufferReader, "BufferReader");
    BufferReader._configure = function() {
      if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = /* @__PURE__ */ __name(function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    }, "read_string_buffer");
    BufferReader._configure();
  }
});

// ../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var util = require_minimal();
    (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    __name(Service, "Service");
    Service.prototype.rpcCall = /* @__PURE__ */ __name(function rpcCall(method, requestCtor, responseCtor, request3, callback) {
      if (!request3)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request3);
      if (!self2.rpcImpl) {
        setTimeout(function() {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(
          method,
          requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request3).finish(),
          /* @__PURE__ */ __name(function rpcCallback(err, response) {
            if (err) {
              self2.emit("error", err, method);
              return callback(err);
            }
            if (response === null) {
              self2.end(
                /* endedByRPC */
                true
              );
              return void 0;
            }
            if (!(response instanceof responseCtor)) {
              try {
                response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
              } catch (err2) {
                self2.emit("error", err2, method);
                return callback(err2);
              }
            }
            self2.emit("data", response, method);
            return callback(null, response);
          }, "rpcCallback")
        );
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function() {
          callback(err);
        }, 0);
        return void 0;
      }
    }, "rpcCall");
    Service.prototype.end = /* @__PURE__ */ __name(function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    }, "end");
  }
});

// ../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});

// ../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// ../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    var protobuf = exports2;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure;
    function configure() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    __name(configure, "configure");
    configure();
  }
});

// ../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/minimal.js
var require_minimal2 = __commonJS({
  "../../node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/minimal.js"(exports2, module2) {
    "use strict";
    module2.exports = require_index_minimal();
  }
});

// ../../node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/generated/root.js
var require_root = __commonJS({
  "../../node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/generated/root.js"(exports2, module2) {
    "use strict";
    var $protobuf = require_minimal2();
    var $Reader = $protobuf.Reader;
    var $Writer = $protobuf.Writer;
    var $util = $protobuf.util;
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    $root.opentelemetry = function() {
      var opentelemetry2 = {};
      opentelemetry2.proto = function() {
        var proto = {};
        proto.common = function() {
          var common = {};
          common.v1 = function() {
            var v1 = {};
            v1.AnyValue = function() {
              function AnyValue(properties) {
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(AnyValue, "AnyValue");
              AnyValue.prototype.stringValue = null;
              AnyValue.prototype.boolValue = null;
              AnyValue.prototype.intValue = null;
              AnyValue.prototype.doubleValue = null;
              AnyValue.prototype.arrayValue = null;
              AnyValue.prototype.kvlistValue = null;
              AnyValue.prototype.bytesValue = null;
              var $oneOfFields;
              Object.defineProperty(AnyValue.prototype, "value", {
                get: $util.oneOfGetter($oneOfFields = ["stringValue", "boolValue", "intValue", "doubleValue", "arrayValue", "kvlistValue", "bytesValue"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              AnyValue.create = /* @__PURE__ */ __name(function create(properties) {
                return new AnyValue(properties);
              }, "create");
              AnyValue.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue"))
                  writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).string(message.stringValue);
                if (message.boolValue != null && Object.hasOwnProperty.call(message, "boolValue"))
                  writer.uint32(
                    /* id 2, wireType 0 =*/
                    16
                  ).bool(message.boolValue);
                if (message.intValue != null && Object.hasOwnProperty.call(message, "intValue"))
                  writer.uint32(
                    /* id 3, wireType 0 =*/
                    24
                  ).int64(message.intValue);
                if (message.doubleValue != null && Object.hasOwnProperty.call(message, "doubleValue"))
                  writer.uint32(
                    /* id 4, wireType 1 =*/
                    33
                  ).double(message.doubleValue);
                if (message.arrayValue != null && Object.hasOwnProperty.call(message, "arrayValue"))
                  $root.opentelemetry.proto.common.v1.ArrayValue.encode(message.arrayValue, writer.uint32(
                    /* id 5, wireType 2 =*/
                    42
                  ).fork()).ldelim();
                if (message.kvlistValue != null && Object.hasOwnProperty.call(message, "kvlistValue"))
                  $root.opentelemetry.proto.common.v1.KeyValueList.encode(message.kvlistValue, writer.uint32(
                    /* id 6, wireType 2 =*/
                    50
                  ).fork()).ldelim();
                if (message.bytesValue != null && Object.hasOwnProperty.call(message, "bytesValue"))
                  writer.uint32(
                    /* id 7, wireType 2 =*/
                    58
                  ).bytes(message.bytesValue);
                return writer;
              }, "encode");
              AnyValue.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              AnyValue.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.AnyValue();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      message.stringValue = reader.string();
                      break;
                    }
                    case 2: {
                      message.boolValue = reader.bool();
                      break;
                    }
                    case 3: {
                      message.intValue = reader.int64();
                      break;
                    }
                    case 4: {
                      message.doubleValue = reader.double();
                      break;
                    }
                    case 5: {
                      message.arrayValue = $root.opentelemetry.proto.common.v1.ArrayValue.decode(reader, reader.uint32());
                      break;
                    }
                    case 6: {
                      message.kvlistValue = $root.opentelemetry.proto.common.v1.KeyValueList.decode(reader, reader.uint32());
                      break;
                    }
                    case 7: {
                      message.bytesValue = reader.bytes();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              AnyValue.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              AnyValue.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                var properties = {};
                if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                  properties.value = 1;
                  if (!$util.isString(message.stringValue))
                    return "stringValue: string expected";
                }
                if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  if (typeof message.boolValue !== "boolean")
                    return "boolValue: boolean expected";
                }
                if (message.intValue != null && message.hasOwnProperty("intValue")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  if (!$util.isInteger(message.intValue) && !(message.intValue && $util.isInteger(message.intValue.low) && $util.isInteger(message.intValue.high)))
                    return "intValue: integer|Long expected";
                }
                if (message.doubleValue != null && message.hasOwnProperty("doubleValue")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  if (typeof message.doubleValue !== "number")
                    return "doubleValue: number expected";
                }
                if (message.arrayValue != null && message.hasOwnProperty("arrayValue")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  {
                    var error = $root.opentelemetry.proto.common.v1.ArrayValue.verify(message.arrayValue);
                    if (error)
                      return "arrayValue." + error;
                  }
                }
                if (message.kvlistValue != null && message.hasOwnProperty("kvlistValue")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  {
                    var error = $root.opentelemetry.proto.common.v1.KeyValueList.verify(message.kvlistValue);
                    if (error)
                      return "kvlistValue." + error;
                  }
                }
                if (message.bytesValue != null && message.hasOwnProperty("bytesValue")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  if (!(message.bytesValue && typeof message.bytesValue.length === "number" || $util.isString(message.bytesValue)))
                    return "bytesValue: buffer expected";
                }
                return null;
              }, "verify");
              AnyValue.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.common.v1.AnyValue)
                  return object;
                var message = new $root.opentelemetry.proto.common.v1.AnyValue();
                if (object.stringValue != null)
                  message.stringValue = String(object.stringValue);
                if (object.boolValue != null)
                  message.boolValue = Boolean(object.boolValue);
                if (object.intValue != null) {
                  if ($util.Long)
                    (message.intValue = $util.Long.fromValue(object.intValue)).unsigned = false;
                  else if (typeof object.intValue === "string")
                    message.intValue = parseInt(object.intValue, 10);
                  else if (typeof object.intValue === "number")
                    message.intValue = object.intValue;
                  else if (typeof object.intValue === "object")
                    message.intValue = new $util.LongBits(object.intValue.low >>> 0, object.intValue.high >>> 0).toNumber();
                }
                if (object.doubleValue != null)
                  message.doubleValue = Number(object.doubleValue);
                if (object.arrayValue != null) {
                  if (typeof object.arrayValue !== "object")
                    throw TypeError(".opentelemetry.proto.common.v1.AnyValue.arrayValue: object expected");
                  message.arrayValue = $root.opentelemetry.proto.common.v1.ArrayValue.fromObject(object.arrayValue);
                }
                if (object.kvlistValue != null) {
                  if (typeof object.kvlistValue !== "object")
                    throw TypeError(".opentelemetry.proto.common.v1.AnyValue.kvlistValue: object expected");
                  message.kvlistValue = $root.opentelemetry.proto.common.v1.KeyValueList.fromObject(object.kvlistValue);
                }
                if (object.bytesValue != null) {
                  if (typeof object.bytesValue === "string")
                    $util.base64.decode(object.bytesValue, message.bytesValue = $util.newBuffer($util.base64.length(object.bytesValue)), 0);
                  else if (object.bytesValue.length >= 0)
                    message.bytesValue = object.bytesValue;
                }
                return message;
              }, "fromObject");
              AnyValue.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                  object.stringValue = message.stringValue;
                  if (options3.oneofs)
                    object.value = "stringValue";
                }
                if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                  object.boolValue = message.boolValue;
                  if (options3.oneofs)
                    object.value = "boolValue";
                }
                if (message.intValue != null && message.hasOwnProperty("intValue")) {
                  if (typeof message.intValue === "number")
                    object.intValue = options3.longs === String ? String(message.intValue) : message.intValue;
                  else
                    object.intValue = options3.longs === String ? $util.Long.prototype.toString.call(message.intValue) : options3.longs === Number ? new $util.LongBits(message.intValue.low >>> 0, message.intValue.high >>> 0).toNumber() : message.intValue;
                  if (options3.oneofs)
                    object.value = "intValue";
                }
                if (message.doubleValue != null && message.hasOwnProperty("doubleValue")) {
                  object.doubleValue = options3.json && !isFinite(message.doubleValue) ? String(message.doubleValue) : message.doubleValue;
                  if (options3.oneofs)
                    object.value = "doubleValue";
                }
                if (message.arrayValue != null && message.hasOwnProperty("arrayValue")) {
                  object.arrayValue = $root.opentelemetry.proto.common.v1.ArrayValue.toObject(message.arrayValue, options3);
                  if (options3.oneofs)
                    object.value = "arrayValue";
                }
                if (message.kvlistValue != null && message.hasOwnProperty("kvlistValue")) {
                  object.kvlistValue = $root.opentelemetry.proto.common.v1.KeyValueList.toObject(message.kvlistValue, options3);
                  if (options3.oneofs)
                    object.value = "kvlistValue";
                }
                if (message.bytesValue != null && message.hasOwnProperty("bytesValue")) {
                  object.bytesValue = options3.bytes === String ? $util.base64.encode(message.bytesValue, 0, message.bytesValue.length) : options3.bytes === Array ? Array.prototype.slice.call(message.bytesValue) : message.bytesValue;
                  if (options3.oneofs)
                    object.value = "bytesValue";
                }
                return object;
              }, "toObject");
              AnyValue.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              AnyValue.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.AnyValue";
              }, "getTypeUrl");
              return AnyValue;
            }();
            v1.ArrayValue = function() {
              function ArrayValue(properties) {
                this.values = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(ArrayValue, "ArrayValue");
              ArrayValue.prototype.values = $util.emptyArray;
              ArrayValue.create = /* @__PURE__ */ __name(function create(properties) {
                return new ArrayValue(properties);
              }, "create");
              ArrayValue.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.values != null && message.values.length)
                  for (var i = 0; i < message.values.length; ++i)
                    $root.opentelemetry.proto.common.v1.AnyValue.encode(message.values[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              }, "encode");
              ArrayValue.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              ArrayValue.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.ArrayValue();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.values && message.values.length))
                        message.values = [];
                      message.values.push($root.opentelemetry.proto.common.v1.AnyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              ArrayValue.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              ArrayValue.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.values != null && message.hasOwnProperty("values")) {
                  if (!Array.isArray(message.values))
                    return "values: array expected";
                  for (var i = 0; i < message.values.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.AnyValue.verify(message.values[i]);
                    if (error)
                      return "values." + error;
                  }
                }
                return null;
              }, "verify");
              ArrayValue.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.common.v1.ArrayValue)
                  return object;
                var message = new $root.opentelemetry.proto.common.v1.ArrayValue();
                if (object.values) {
                  if (!Array.isArray(object.values))
                    throw TypeError(".opentelemetry.proto.common.v1.ArrayValue.values: array expected");
                  message.values = [];
                  for (var i = 0; i < object.values.length; ++i) {
                    if (typeof object.values[i] !== "object")
                      throw TypeError(".opentelemetry.proto.common.v1.ArrayValue.values: object expected");
                    message.values[i] = $root.opentelemetry.proto.common.v1.AnyValue.fromObject(object.values[i]);
                  }
                }
                return message;
              }, "fromObject");
              ArrayValue.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.values = [];
                if (message.values && message.values.length) {
                  object.values = [];
                  for (var j = 0; j < message.values.length; ++j)
                    object.values[j] = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.values[j], options3);
                }
                return object;
              }, "toObject");
              ArrayValue.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              ArrayValue.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.ArrayValue";
              }, "getTypeUrl");
              return ArrayValue;
            }();
            v1.KeyValueList = function() {
              function KeyValueList(properties) {
                this.values = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(KeyValueList, "KeyValueList");
              KeyValueList.prototype.values = $util.emptyArray;
              KeyValueList.create = /* @__PURE__ */ __name(function create(properties) {
                return new KeyValueList(properties);
              }, "create");
              KeyValueList.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.values != null && message.values.length)
                  for (var i = 0; i < message.values.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.values[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              }, "encode");
              KeyValueList.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              KeyValueList.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.KeyValueList();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.values && message.values.length))
                        message.values = [];
                      message.values.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              KeyValueList.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              KeyValueList.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.values != null && message.hasOwnProperty("values")) {
                  if (!Array.isArray(message.values))
                    return "values: array expected";
                  for (var i = 0; i < message.values.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.values[i]);
                    if (error)
                      return "values." + error;
                  }
                }
                return null;
              }, "verify");
              KeyValueList.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.common.v1.KeyValueList)
                  return object;
                var message = new $root.opentelemetry.proto.common.v1.KeyValueList();
                if (object.values) {
                  if (!Array.isArray(object.values))
                    throw TypeError(".opentelemetry.proto.common.v1.KeyValueList.values: array expected");
                  message.values = [];
                  for (var i = 0; i < object.values.length; ++i) {
                    if (typeof object.values[i] !== "object")
                      throw TypeError(".opentelemetry.proto.common.v1.KeyValueList.values: object expected");
                    message.values[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.values[i]);
                  }
                }
                return message;
              }, "fromObject");
              KeyValueList.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.values = [];
                if (message.values && message.values.length) {
                  object.values = [];
                  for (var j = 0; j < message.values.length; ++j)
                    object.values[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.values[j], options3);
                }
                return object;
              }, "toObject");
              KeyValueList.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              KeyValueList.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.KeyValueList";
              }, "getTypeUrl");
              return KeyValueList;
            }();
            v1.KeyValue = function() {
              function KeyValue(properties) {
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(KeyValue, "KeyValue");
              KeyValue.prototype.key = null;
              KeyValue.prototype.value = null;
              KeyValue.create = /* @__PURE__ */ __name(function create(properties) {
                return new KeyValue(properties);
              }, "create");
              KeyValue.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                  writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).string(message.key);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                  $root.opentelemetry.proto.common.v1.AnyValue.encode(message.value, writer.uint32(
                    /* id 2, wireType 2 =*/
                    18
                  ).fork()).ldelim();
                return writer;
              }, "encode");
              KeyValue.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              KeyValue.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.KeyValue();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      message.key = reader.string();
                      break;
                    }
                    case 2: {
                      message.value = $root.opentelemetry.proto.common.v1.AnyValue.decode(reader, reader.uint32());
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              KeyValue.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              KeyValue.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.key != null && message.hasOwnProperty("key")) {
                  if (!$util.isString(message.key))
                    return "key: string expected";
                }
                if (message.value != null && message.hasOwnProperty("value")) {
                  var error = $root.opentelemetry.proto.common.v1.AnyValue.verify(message.value);
                  if (error)
                    return "value." + error;
                }
                return null;
              }, "verify");
              KeyValue.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.common.v1.KeyValue)
                  return object;
                var message = new $root.opentelemetry.proto.common.v1.KeyValue();
                if (object.key != null)
                  message.key = String(object.key);
                if (object.value != null) {
                  if (typeof object.value !== "object")
                    throw TypeError(".opentelemetry.proto.common.v1.KeyValue.value: object expected");
                  message.value = $root.opentelemetry.proto.common.v1.AnyValue.fromObject(object.value);
                }
                return message;
              }, "fromObject");
              KeyValue.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.defaults) {
                  object.key = "";
                  object.value = null;
                }
                if (message.key != null && message.hasOwnProperty("key"))
                  object.key = message.key;
                if (message.value != null && message.hasOwnProperty("value"))
                  object.value = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.value, options3);
                return object;
              }, "toObject");
              KeyValue.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              KeyValue.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.KeyValue";
              }, "getTypeUrl");
              return KeyValue;
            }();
            v1.InstrumentationScope = function() {
              function InstrumentationScope(properties) {
                this.attributes = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(InstrumentationScope, "InstrumentationScope");
              InstrumentationScope.prototype.name = null;
              InstrumentationScope.prototype.version = null;
              InstrumentationScope.prototype.attributes = $util.emptyArray;
              InstrumentationScope.prototype.droppedAttributesCount = null;
              InstrumentationScope.create = /* @__PURE__ */ __name(function create(properties) {
                return new InstrumentationScope(properties);
              }, "create");
              InstrumentationScope.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                  writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).string(message.name);
                if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                  writer.uint32(
                    /* id 2, wireType 2 =*/
                    18
                  ).string(message.version);
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).fork()).ldelim();
                if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                  writer.uint32(
                    /* id 4, wireType 0 =*/
                    32
                  ).uint32(message.droppedAttributesCount);
                return writer;
              }, "encode");
              InstrumentationScope.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              InstrumentationScope.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.InstrumentationScope();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      message.name = reader.string();
                      break;
                    }
                    case 2: {
                      message.version = reader.string();
                      break;
                    }
                    case 3: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 4: {
                      message.droppedAttributesCount = reader.uint32();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              InstrumentationScope.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              InstrumentationScope.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.name != null && message.hasOwnProperty("name")) {
                  if (!$util.isString(message.name))
                    return "name: string expected";
                }
                if (message.version != null && message.hasOwnProperty("version")) {
                  if (!$util.isString(message.version))
                    return "version: string expected";
                }
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                  if (!$util.isInteger(message.droppedAttributesCount))
                    return "droppedAttributesCount: integer expected";
                }
                return null;
              }, "verify");
              InstrumentationScope.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.common.v1.InstrumentationScope)
                  return object;
                var message = new $root.opentelemetry.proto.common.v1.InstrumentationScope();
                if (object.name != null)
                  message.name = String(object.name);
                if (object.version != null)
                  message.version = String(object.version);
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.common.v1.InstrumentationScope.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.common.v1.InstrumentationScope.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.droppedAttributesCount != null)
                  message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                return message;
              }, "fromObject");
              InstrumentationScope.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.attributes = [];
                if (options3.defaults) {
                  object.name = "";
                  object.version = "";
                  object.droppedAttributesCount = 0;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                  object.name = message.name;
                if (message.version != null && message.hasOwnProperty("version"))
                  object.version = message.version;
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options3);
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                  object.droppedAttributesCount = message.droppedAttributesCount;
                return object;
              }, "toObject");
              InstrumentationScope.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              InstrumentationScope.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.InstrumentationScope";
              }, "getTypeUrl");
              return InstrumentationScope;
            }();
            return v1;
          }();
          return common;
        }();
        proto.resource = function() {
          var resource = {};
          resource.v1 = function() {
            var v1 = {};
            v1.Resource = function() {
              function Resource2(properties) {
                this.attributes = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(Resource2, "Resource");
              Resource2.prototype.attributes = $util.emptyArray;
              Resource2.prototype.droppedAttributesCount = null;
              Resource2.create = /* @__PURE__ */ __name(function create(properties) {
                return new Resource2(properties);
              }, "create");
              Resource2.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                  writer.uint32(
                    /* id 2, wireType 0 =*/
                    16
                  ).uint32(message.droppedAttributesCount);
                return writer;
              }, "encode");
              Resource2.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              Resource2.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.resource.v1.Resource();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.droppedAttributesCount = reader.uint32();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              Resource2.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              Resource2.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                  if (!$util.isInteger(message.droppedAttributesCount))
                    return "droppedAttributesCount: integer expected";
                }
                return null;
              }, "verify");
              Resource2.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.resource.v1.Resource)
                  return object;
                var message = new $root.opentelemetry.proto.resource.v1.Resource();
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.resource.v1.Resource.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.resource.v1.Resource.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.droppedAttributesCount != null)
                  message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                return message;
              }, "fromObject");
              Resource2.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.attributes = [];
                if (options3.defaults)
                  object.droppedAttributesCount = 0;
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options3);
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                  object.droppedAttributesCount = message.droppedAttributesCount;
                return object;
              }, "toObject");
              Resource2.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              Resource2.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.resource.v1.Resource";
              }, "getTypeUrl");
              return Resource2;
            }();
            return v1;
          }();
          return resource;
        }();
        proto.trace = function() {
          var trace4 = {};
          trace4.v1 = function() {
            var v1 = {};
            v1.TracesData = function() {
              function TracesData(properties) {
                this.resourceSpans = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(TracesData, "TracesData");
              TracesData.prototype.resourceSpans = $util.emptyArray;
              TracesData.create = /* @__PURE__ */ __name(function create(properties) {
                return new TracesData(properties);
              }, "create");
              TracesData.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resourceSpans != null && message.resourceSpans.length)
                  for (var i = 0; i < message.resourceSpans.length; ++i)
                    $root.opentelemetry.proto.trace.v1.ResourceSpans.encode(message.resourceSpans[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              }, "encode");
              TracesData.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              TracesData.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.TracesData();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.resourceSpans && message.resourceSpans.length))
                        message.resourceSpans = [];
                      message.resourceSpans.push($root.opentelemetry.proto.trace.v1.ResourceSpans.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              TracesData.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              TracesData.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.resourceSpans != null && message.hasOwnProperty("resourceSpans")) {
                  if (!Array.isArray(message.resourceSpans))
                    return "resourceSpans: array expected";
                  for (var i = 0; i < message.resourceSpans.length; ++i) {
                    var error = $root.opentelemetry.proto.trace.v1.ResourceSpans.verify(message.resourceSpans[i]);
                    if (error)
                      return "resourceSpans." + error;
                  }
                }
                return null;
              }, "verify");
              TracesData.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.trace.v1.TracesData)
                  return object;
                var message = new $root.opentelemetry.proto.trace.v1.TracesData();
                if (object.resourceSpans) {
                  if (!Array.isArray(object.resourceSpans))
                    throw TypeError(".opentelemetry.proto.trace.v1.TracesData.resourceSpans: array expected");
                  message.resourceSpans = [];
                  for (var i = 0; i < object.resourceSpans.length; ++i) {
                    if (typeof object.resourceSpans[i] !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.TracesData.resourceSpans: object expected");
                    message.resourceSpans[i] = $root.opentelemetry.proto.trace.v1.ResourceSpans.fromObject(object.resourceSpans[i]);
                  }
                }
                return message;
              }, "fromObject");
              TracesData.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.resourceSpans = [];
                if (message.resourceSpans && message.resourceSpans.length) {
                  object.resourceSpans = [];
                  for (var j = 0; j < message.resourceSpans.length; ++j)
                    object.resourceSpans[j] = $root.opentelemetry.proto.trace.v1.ResourceSpans.toObject(message.resourceSpans[j], options3);
                }
                return object;
              }, "toObject");
              TracesData.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              TracesData.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.TracesData";
              }, "getTypeUrl");
              return TracesData;
            }();
            v1.ResourceSpans = function() {
              function ResourceSpans(properties) {
                this.scopeSpans = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(ResourceSpans, "ResourceSpans");
              ResourceSpans.prototype.resource = null;
              ResourceSpans.prototype.scopeSpans = $util.emptyArray;
              ResourceSpans.prototype.schemaUrl = null;
              ResourceSpans.create = /* @__PURE__ */ __name(function create(properties) {
                return new ResourceSpans(properties);
              }, "create");
              ResourceSpans.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                  $root.opentelemetry.proto.resource.v1.Resource.encode(message.resource, writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).fork()).ldelim();
                if (message.scopeSpans != null && message.scopeSpans.length)
                  for (var i = 0; i < message.scopeSpans.length; ++i)
                    $root.opentelemetry.proto.trace.v1.ScopeSpans.encode(message.scopeSpans[i], writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork()).ldelim();
                if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.schemaUrl);
                return writer;
              }, "encode");
              ResourceSpans.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              ResourceSpans.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.ResourceSpans();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      message.resource = $root.opentelemetry.proto.resource.v1.Resource.decode(reader, reader.uint32());
                      break;
                    }
                    case 2: {
                      if (!(message.scopeSpans && message.scopeSpans.length))
                        message.scopeSpans = [];
                      message.scopeSpans.push($root.opentelemetry.proto.trace.v1.ScopeSpans.decode(reader, reader.uint32()));
                      break;
                    }
                    case 3: {
                      message.schemaUrl = reader.string();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              ResourceSpans.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              ResourceSpans.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.resource != null && message.hasOwnProperty("resource")) {
                  var error = $root.opentelemetry.proto.resource.v1.Resource.verify(message.resource);
                  if (error)
                    return "resource." + error;
                }
                if (message.scopeSpans != null && message.hasOwnProperty("scopeSpans")) {
                  if (!Array.isArray(message.scopeSpans))
                    return "scopeSpans: array expected";
                  for (var i = 0; i < message.scopeSpans.length; ++i) {
                    var error = $root.opentelemetry.proto.trace.v1.ScopeSpans.verify(message.scopeSpans[i]);
                    if (error)
                      return "scopeSpans." + error;
                  }
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                  if (!$util.isString(message.schemaUrl))
                    return "schemaUrl: string expected";
                }
                return null;
              }, "verify");
              ResourceSpans.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.trace.v1.ResourceSpans)
                  return object;
                var message = new $root.opentelemetry.proto.trace.v1.ResourceSpans();
                if (object.resource != null) {
                  if (typeof object.resource !== "object")
                    throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.resource: object expected");
                  message.resource = $root.opentelemetry.proto.resource.v1.Resource.fromObject(object.resource);
                }
                if (object.scopeSpans) {
                  if (!Array.isArray(object.scopeSpans))
                    throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.scopeSpans: array expected");
                  message.scopeSpans = [];
                  for (var i = 0; i < object.scopeSpans.length; ++i) {
                    if (typeof object.scopeSpans[i] !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.scopeSpans: object expected");
                    message.scopeSpans[i] = $root.opentelemetry.proto.trace.v1.ScopeSpans.fromObject(object.scopeSpans[i]);
                  }
                }
                if (object.schemaUrl != null)
                  message.schemaUrl = String(object.schemaUrl);
                return message;
              }, "fromObject");
              ResourceSpans.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.scopeSpans = [];
                if (options3.defaults) {
                  object.resource = null;
                  object.schemaUrl = "";
                }
                if (message.resource != null && message.hasOwnProperty("resource"))
                  object.resource = $root.opentelemetry.proto.resource.v1.Resource.toObject(message.resource, options3);
                if (message.scopeSpans && message.scopeSpans.length) {
                  object.scopeSpans = [];
                  for (var j = 0; j < message.scopeSpans.length; ++j)
                    object.scopeSpans[j] = $root.opentelemetry.proto.trace.v1.ScopeSpans.toObject(message.scopeSpans[j], options3);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              }, "toObject");
              ResourceSpans.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              ResourceSpans.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.ResourceSpans";
              }, "getTypeUrl");
              return ResourceSpans;
            }();
            v1.ScopeSpans = function() {
              function ScopeSpans(properties) {
                this.spans = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(ScopeSpans, "ScopeSpans");
              ScopeSpans.prototype.scope = null;
              ScopeSpans.prototype.spans = $util.emptyArray;
              ScopeSpans.prototype.schemaUrl = null;
              ScopeSpans.create = /* @__PURE__ */ __name(function create(properties) {
                return new ScopeSpans(properties);
              }, "create");
              ScopeSpans.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.scope != null && Object.hasOwnProperty.call(message, "scope"))
                  $root.opentelemetry.proto.common.v1.InstrumentationScope.encode(message.scope, writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).fork()).ldelim();
                if (message.spans != null && message.spans.length)
                  for (var i = 0; i < message.spans.length; ++i)
                    $root.opentelemetry.proto.trace.v1.Span.encode(message.spans[i], writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork()).ldelim();
                if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.schemaUrl);
                return writer;
              }, "encode");
              ScopeSpans.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              ScopeSpans.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.ScopeSpans();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.decode(reader, reader.uint32());
                      break;
                    }
                    case 2: {
                      if (!(message.spans && message.spans.length))
                        message.spans = [];
                      message.spans.push($root.opentelemetry.proto.trace.v1.Span.decode(reader, reader.uint32()));
                      break;
                    }
                    case 3: {
                      message.schemaUrl = reader.string();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              ScopeSpans.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              ScopeSpans.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.scope != null && message.hasOwnProperty("scope")) {
                  var error = $root.opentelemetry.proto.common.v1.InstrumentationScope.verify(message.scope);
                  if (error)
                    return "scope." + error;
                }
                if (message.spans != null && message.hasOwnProperty("spans")) {
                  if (!Array.isArray(message.spans))
                    return "spans: array expected";
                  for (var i = 0; i < message.spans.length; ++i) {
                    var error = $root.opentelemetry.proto.trace.v1.Span.verify(message.spans[i]);
                    if (error)
                      return "spans." + error;
                  }
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                  if (!$util.isString(message.schemaUrl))
                    return "schemaUrl: string expected";
                }
                return null;
              }, "verify");
              ScopeSpans.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.trace.v1.ScopeSpans)
                  return object;
                var message = new $root.opentelemetry.proto.trace.v1.ScopeSpans();
                if (object.scope != null) {
                  if (typeof object.scope !== "object")
                    throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.scope: object expected");
                  message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(object.scope);
                }
                if (object.spans) {
                  if (!Array.isArray(object.spans))
                    throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.spans: array expected");
                  message.spans = [];
                  for (var i = 0; i < object.spans.length; ++i) {
                    if (typeof object.spans[i] !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.spans: object expected");
                    message.spans[i] = $root.opentelemetry.proto.trace.v1.Span.fromObject(object.spans[i]);
                  }
                }
                if (object.schemaUrl != null)
                  message.schemaUrl = String(object.schemaUrl);
                return message;
              }, "fromObject");
              ScopeSpans.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.spans = [];
                if (options3.defaults) {
                  object.scope = null;
                  object.schemaUrl = "";
                }
                if (message.scope != null && message.hasOwnProperty("scope"))
                  object.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.toObject(message.scope, options3);
                if (message.spans && message.spans.length) {
                  object.spans = [];
                  for (var j = 0; j < message.spans.length; ++j)
                    object.spans[j] = $root.opentelemetry.proto.trace.v1.Span.toObject(message.spans[j], options3);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              }, "toObject");
              ScopeSpans.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              ScopeSpans.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.ScopeSpans";
              }, "getTypeUrl");
              return ScopeSpans;
            }();
            v1.Span = function() {
              function Span2(properties) {
                this.attributes = [];
                this.events = [];
                this.links = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(Span2, "Span");
              Span2.prototype.traceId = null;
              Span2.prototype.spanId = null;
              Span2.prototype.traceState = null;
              Span2.prototype.parentSpanId = null;
              Span2.prototype.name = null;
              Span2.prototype.kind = null;
              Span2.prototype.startTimeUnixNano = null;
              Span2.prototype.endTimeUnixNano = null;
              Span2.prototype.attributes = $util.emptyArray;
              Span2.prototype.droppedAttributesCount = null;
              Span2.prototype.events = $util.emptyArray;
              Span2.prototype.droppedEventsCount = null;
              Span2.prototype.links = $util.emptyArray;
              Span2.prototype.droppedLinksCount = null;
              Span2.prototype.status = null;
              Span2.create = /* @__PURE__ */ __name(function create(properties) {
                return new Span2(properties);
              }, "create");
              Span2.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                  writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).bytes(message.traceId);
                if (message.spanId != null && Object.hasOwnProperty.call(message, "spanId"))
                  writer.uint32(
                    /* id 2, wireType 2 =*/
                    18
                  ).bytes(message.spanId);
                if (message.traceState != null && Object.hasOwnProperty.call(message, "traceState"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.traceState);
                if (message.parentSpanId != null && Object.hasOwnProperty.call(message, "parentSpanId"))
                  writer.uint32(
                    /* id 4, wireType 2 =*/
                    34
                  ).bytes(message.parentSpanId);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                  writer.uint32(
                    /* id 5, wireType 2 =*/
                    42
                  ).string(message.name);
                if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                  writer.uint32(
                    /* id 6, wireType 0 =*/
                    48
                  ).int32(message.kind);
                if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                  writer.uint32(
                    /* id 7, wireType 1 =*/
                    57
                  ).fixed64(message.startTimeUnixNano);
                if (message.endTimeUnixNano != null && Object.hasOwnProperty.call(message, "endTimeUnixNano"))
                  writer.uint32(
                    /* id 8, wireType 1 =*/
                    65
                  ).fixed64(message.endTimeUnixNano);
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 9, wireType 2 =*/
                      74
                    ).fork()).ldelim();
                if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                  writer.uint32(
                    /* id 10, wireType 0 =*/
                    80
                  ).uint32(message.droppedAttributesCount);
                if (message.events != null && message.events.length)
                  for (var i = 0; i < message.events.length; ++i)
                    $root.opentelemetry.proto.trace.v1.Span.Event.encode(message.events[i], writer.uint32(
                      /* id 11, wireType 2 =*/
                      90
                    ).fork()).ldelim();
                if (message.droppedEventsCount != null && Object.hasOwnProperty.call(message, "droppedEventsCount"))
                  writer.uint32(
                    /* id 12, wireType 0 =*/
                    96
                  ).uint32(message.droppedEventsCount);
                if (message.links != null && message.links.length)
                  for (var i = 0; i < message.links.length; ++i)
                    $root.opentelemetry.proto.trace.v1.Span.Link.encode(message.links[i], writer.uint32(
                      /* id 13, wireType 2 =*/
                      106
                    ).fork()).ldelim();
                if (message.droppedLinksCount != null && Object.hasOwnProperty.call(message, "droppedLinksCount"))
                  writer.uint32(
                    /* id 14, wireType 0 =*/
                    112
                  ).uint32(message.droppedLinksCount);
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                  $root.opentelemetry.proto.trace.v1.Status.encode(message.status, writer.uint32(
                    /* id 15, wireType 2 =*/
                    122
                  ).fork()).ldelim();
                return writer;
              }, "encode");
              Span2.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              Span2.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.Span();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      message.traceId = reader.bytes();
                      break;
                    }
                    case 2: {
                      message.spanId = reader.bytes();
                      break;
                    }
                    case 3: {
                      message.traceState = reader.string();
                      break;
                    }
                    case 4: {
                      message.parentSpanId = reader.bytes();
                      break;
                    }
                    case 5: {
                      message.name = reader.string();
                      break;
                    }
                    case 6: {
                      message.kind = reader.int32();
                      break;
                    }
                    case 7: {
                      message.startTimeUnixNano = reader.fixed64();
                      break;
                    }
                    case 8: {
                      message.endTimeUnixNano = reader.fixed64();
                      break;
                    }
                    case 9: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 10: {
                      message.droppedAttributesCount = reader.uint32();
                      break;
                    }
                    case 11: {
                      if (!(message.events && message.events.length))
                        message.events = [];
                      message.events.push($root.opentelemetry.proto.trace.v1.Span.Event.decode(reader, reader.uint32()));
                      break;
                    }
                    case 12: {
                      message.droppedEventsCount = reader.uint32();
                      break;
                    }
                    case 13: {
                      if (!(message.links && message.links.length))
                        message.links = [];
                      message.links.push($root.opentelemetry.proto.trace.v1.Span.Link.decode(reader, reader.uint32()));
                      break;
                    }
                    case 14: {
                      message.droppedLinksCount = reader.uint32();
                      break;
                    }
                    case 15: {
                      message.status = $root.opentelemetry.proto.trace.v1.Status.decode(reader, reader.uint32());
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              Span2.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              Span2.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.traceId != null && message.hasOwnProperty("traceId")) {
                  if (!(message.traceId && typeof message.traceId.length === "number" || $util.isString(message.traceId)))
                    return "traceId: buffer expected";
                }
                if (message.spanId != null && message.hasOwnProperty("spanId")) {
                  if (!(message.spanId && typeof message.spanId.length === "number" || $util.isString(message.spanId)))
                    return "spanId: buffer expected";
                }
                if (message.traceState != null && message.hasOwnProperty("traceState")) {
                  if (!$util.isString(message.traceState))
                    return "traceState: string expected";
                }
                if (message.parentSpanId != null && message.hasOwnProperty("parentSpanId")) {
                  if (!(message.parentSpanId && typeof message.parentSpanId.length === "number" || $util.isString(message.parentSpanId)))
                    return "parentSpanId: buffer expected";
                }
                if (message.name != null && message.hasOwnProperty("name")) {
                  if (!$util.isString(message.name))
                    return "name: string expected";
                }
                if (message.kind != null && message.hasOwnProperty("kind"))
                  switch (message.kind) {
                    default:
                      return "kind: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                      break;
                  }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                  if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                    return "startTimeUnixNano: integer|Long expected";
                }
                if (message.endTimeUnixNano != null && message.hasOwnProperty("endTimeUnixNano")) {
                  if (!$util.isInteger(message.endTimeUnixNano) && !(message.endTimeUnixNano && $util.isInteger(message.endTimeUnixNano.low) && $util.isInteger(message.endTimeUnixNano.high)))
                    return "endTimeUnixNano: integer|Long expected";
                }
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                  if (!$util.isInteger(message.droppedAttributesCount))
                    return "droppedAttributesCount: integer expected";
                }
                if (message.events != null && message.hasOwnProperty("events")) {
                  if (!Array.isArray(message.events))
                    return "events: array expected";
                  for (var i = 0; i < message.events.length; ++i) {
                    var error = $root.opentelemetry.proto.trace.v1.Span.Event.verify(message.events[i]);
                    if (error)
                      return "events." + error;
                  }
                }
                if (message.droppedEventsCount != null && message.hasOwnProperty("droppedEventsCount")) {
                  if (!$util.isInteger(message.droppedEventsCount))
                    return "droppedEventsCount: integer expected";
                }
                if (message.links != null && message.hasOwnProperty("links")) {
                  if (!Array.isArray(message.links))
                    return "links: array expected";
                  for (var i = 0; i < message.links.length; ++i) {
                    var error = $root.opentelemetry.proto.trace.v1.Span.Link.verify(message.links[i]);
                    if (error)
                      return "links." + error;
                  }
                }
                if (message.droppedLinksCount != null && message.hasOwnProperty("droppedLinksCount")) {
                  if (!$util.isInteger(message.droppedLinksCount))
                    return "droppedLinksCount: integer expected";
                }
                if (message.status != null && message.hasOwnProperty("status")) {
                  var error = $root.opentelemetry.proto.trace.v1.Status.verify(message.status);
                  if (error)
                    return "status." + error;
                }
                return null;
              }, "verify");
              Span2.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.trace.v1.Span)
                  return object;
                var message = new $root.opentelemetry.proto.trace.v1.Span();
                if (object.traceId != null) {
                  if (typeof object.traceId === "string")
                    $util.base64.decode(object.traceId, message.traceId = $util.newBuffer($util.base64.length(object.traceId)), 0);
                  else if (object.traceId.length >= 0)
                    message.traceId = object.traceId;
                }
                if (object.spanId != null) {
                  if (typeof object.spanId === "string")
                    $util.base64.decode(object.spanId, message.spanId = $util.newBuffer($util.base64.length(object.spanId)), 0);
                  else if (object.spanId.length >= 0)
                    message.spanId = object.spanId;
                }
                if (object.traceState != null)
                  message.traceState = String(object.traceState);
                if (object.parentSpanId != null) {
                  if (typeof object.parentSpanId === "string")
                    $util.base64.decode(object.parentSpanId, message.parentSpanId = $util.newBuffer($util.base64.length(object.parentSpanId)), 0);
                  else if (object.parentSpanId.length >= 0)
                    message.parentSpanId = object.parentSpanId;
                }
                if (object.name != null)
                  message.name = String(object.name);
                switch (object.kind) {
                  default:
                    if (typeof object.kind === "number") {
                      message.kind = object.kind;
                      break;
                    }
                    break;
                  case "SPAN_KIND_UNSPECIFIED":
                  case 0:
                    message.kind = 0;
                    break;
                  case "SPAN_KIND_INTERNAL":
                  case 1:
                    message.kind = 1;
                    break;
                  case "SPAN_KIND_SERVER":
                  case 2:
                    message.kind = 2;
                    break;
                  case "SPAN_KIND_CLIENT":
                  case 3:
                    message.kind = 3;
                    break;
                  case "SPAN_KIND_PRODUCER":
                  case 4:
                    message.kind = 4;
                    break;
                  case "SPAN_KIND_CONSUMER":
                  case 5:
                    message.kind = 5;
                    break;
                }
                if (object.startTimeUnixNano != null) {
                  if ($util.Long)
                    (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                  else if (typeof object.startTimeUnixNano === "string")
                    message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                  else if (typeof object.startTimeUnixNano === "number")
                    message.startTimeUnixNano = object.startTimeUnixNano;
                  else if (typeof object.startTimeUnixNano === "object")
                    message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                }
                if (object.endTimeUnixNano != null) {
                  if ($util.Long)
                    (message.endTimeUnixNano = $util.Long.fromValue(object.endTimeUnixNano)).unsigned = false;
                  else if (typeof object.endTimeUnixNano === "string")
                    message.endTimeUnixNano = parseInt(object.endTimeUnixNano, 10);
                  else if (typeof object.endTimeUnixNano === "number")
                    message.endTimeUnixNano = object.endTimeUnixNano;
                  else if (typeof object.endTimeUnixNano === "object")
                    message.endTimeUnixNano = new $util.LongBits(object.endTimeUnixNano.low >>> 0, object.endTimeUnixNano.high >>> 0).toNumber();
                }
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.trace.v1.Span.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.Span.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.droppedAttributesCount != null)
                  message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                if (object.events) {
                  if (!Array.isArray(object.events))
                    throw TypeError(".opentelemetry.proto.trace.v1.Span.events: array expected");
                  message.events = [];
                  for (var i = 0; i < object.events.length; ++i) {
                    if (typeof object.events[i] !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.Span.events: object expected");
                    message.events[i] = $root.opentelemetry.proto.trace.v1.Span.Event.fromObject(object.events[i]);
                  }
                }
                if (object.droppedEventsCount != null)
                  message.droppedEventsCount = object.droppedEventsCount >>> 0;
                if (object.links) {
                  if (!Array.isArray(object.links))
                    throw TypeError(".opentelemetry.proto.trace.v1.Span.links: array expected");
                  message.links = [];
                  for (var i = 0; i < object.links.length; ++i) {
                    if (typeof object.links[i] !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.Span.links: object expected");
                    message.links[i] = $root.opentelemetry.proto.trace.v1.Span.Link.fromObject(object.links[i]);
                  }
                }
                if (object.droppedLinksCount != null)
                  message.droppedLinksCount = object.droppedLinksCount >>> 0;
                if (object.status != null) {
                  if (typeof object.status !== "object")
                    throw TypeError(".opentelemetry.proto.trace.v1.Span.status: object expected");
                  message.status = $root.opentelemetry.proto.trace.v1.Status.fromObject(object.status);
                }
                return message;
              }, "fromObject");
              Span2.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults) {
                  object.attributes = [];
                  object.events = [];
                  object.links = [];
                }
                if (options3.defaults) {
                  if (options3.bytes === String)
                    object.traceId = "";
                  else {
                    object.traceId = [];
                    if (options3.bytes !== Array)
                      object.traceId = $util.newBuffer(object.traceId);
                  }
                  if (options3.bytes === String)
                    object.spanId = "";
                  else {
                    object.spanId = [];
                    if (options3.bytes !== Array)
                      object.spanId = $util.newBuffer(object.spanId);
                  }
                  object.traceState = "";
                  if (options3.bytes === String)
                    object.parentSpanId = "";
                  else {
                    object.parentSpanId = [];
                    if (options3.bytes !== Array)
                      object.parentSpanId = $util.newBuffer(object.parentSpanId);
                  }
                  object.name = "";
                  object.kind = options3.enums === String ? "SPAN_KIND_UNSPECIFIED" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options3.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.endTimeUnixNano = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.endTimeUnixNano = options3.longs === String ? "0" : 0;
                  object.droppedAttributesCount = 0;
                  object.droppedEventsCount = 0;
                  object.droppedLinksCount = 0;
                  object.status = null;
                }
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                  object.traceId = options3.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options3.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                if (message.spanId != null && message.hasOwnProperty("spanId"))
                  object.spanId = options3.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options3.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                if (message.traceState != null && message.hasOwnProperty("traceState"))
                  object.traceState = message.traceState;
                if (message.parentSpanId != null && message.hasOwnProperty("parentSpanId"))
                  object.parentSpanId = options3.bytes === String ? $util.base64.encode(message.parentSpanId, 0, message.parentSpanId.length) : options3.bytes === Array ? Array.prototype.slice.call(message.parentSpanId) : message.parentSpanId;
                if (message.name != null && message.hasOwnProperty("name"))
                  object.name = message.name;
                if (message.kind != null && message.hasOwnProperty("kind"))
                  object.kind = options3.enums === String ? $root.opentelemetry.proto.trace.v1.Span.SpanKind[message.kind] === void 0 ? message.kind : $root.opentelemetry.proto.trace.v1.Span.SpanKind[message.kind] : message.kind;
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options3.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options3.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options3.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.endTimeUnixNano != null && message.hasOwnProperty("endTimeUnixNano"))
                  if (typeof message.endTimeUnixNano === "number")
                    object.endTimeUnixNano = options3.longs === String ? String(message.endTimeUnixNano) : message.endTimeUnixNano;
                  else
                    object.endTimeUnixNano = options3.longs === String ? $util.Long.prototype.toString.call(message.endTimeUnixNano) : options3.longs === Number ? new $util.LongBits(message.endTimeUnixNano.low >>> 0, message.endTimeUnixNano.high >>> 0).toNumber() : message.endTimeUnixNano;
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options3);
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                  object.droppedAttributesCount = message.droppedAttributesCount;
                if (message.events && message.events.length) {
                  object.events = [];
                  for (var j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.opentelemetry.proto.trace.v1.Span.Event.toObject(message.events[j], options3);
                }
                if (message.droppedEventsCount != null && message.hasOwnProperty("droppedEventsCount"))
                  object.droppedEventsCount = message.droppedEventsCount;
                if (message.links && message.links.length) {
                  object.links = [];
                  for (var j = 0; j < message.links.length; ++j)
                    object.links[j] = $root.opentelemetry.proto.trace.v1.Span.Link.toObject(message.links[j], options3);
                }
                if (message.droppedLinksCount != null && message.hasOwnProperty("droppedLinksCount"))
                  object.droppedLinksCount = message.droppedLinksCount;
                if (message.status != null && message.hasOwnProperty("status"))
                  object.status = $root.opentelemetry.proto.trace.v1.Status.toObject(message.status, options3);
                return object;
              }, "toObject");
              Span2.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              Span2.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Span";
              }, "getTypeUrl");
              Span2.SpanKind = function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "SPAN_KIND_UNSPECIFIED"] = 0;
                values[valuesById[1] = "SPAN_KIND_INTERNAL"] = 1;
                values[valuesById[2] = "SPAN_KIND_SERVER"] = 2;
                values[valuesById[3] = "SPAN_KIND_CLIENT"] = 3;
                values[valuesById[4] = "SPAN_KIND_PRODUCER"] = 4;
                values[valuesById[5] = "SPAN_KIND_CONSUMER"] = 5;
                return values;
              }();
              Span2.Event = function() {
                function Event(properties) {
                  this.attributes = [];
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                __name(Event, "Event");
                Event.prototype.timeUnixNano = null;
                Event.prototype.name = null;
                Event.prototype.attributes = $util.emptyArray;
                Event.prototype.droppedAttributesCount = null;
                Event.create = /* @__PURE__ */ __name(function create(properties) {
                  return new Event(properties);
                }, "create");
                Event.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                    writer.uint32(
                      /* id 1, wireType 1 =*/
                      9
                    ).fixed64(message.timeUnixNano);
                  if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).string(message.name);
                  if (message.attributes != null && message.attributes.length)
                    for (var i = 0; i < message.attributes.length; ++i)
                      $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                        /* id 3, wireType 2 =*/
                        26
                      ).fork()).ldelim();
                  if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                    writer.uint32(
                      /* id 4, wireType 0 =*/
                      32
                    ).uint32(message.droppedAttributesCount);
                  return writer;
                }, "encode");
                Event.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                }, "encodeDelimited");
                Event.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.Span.Event();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.timeUnixNano = reader.fixed64();
                        break;
                      }
                      case 2: {
                        message.name = reader.string();
                        break;
                      }
                      case 3: {
                        if (!(message.attributes && message.attributes.length))
                          message.attributes = [];
                        message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      case 4: {
                        message.droppedAttributesCount = reader.uint32();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                }, "decode");
                Event.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                }, "decodeDelimited");
                Event.verify = /* @__PURE__ */ __name(function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                    if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                      return "timeUnixNano: integer|Long expected";
                  }
                  if (message.name != null && message.hasOwnProperty("name")) {
                    if (!$util.isString(message.name))
                      return "name: string expected";
                  }
                  if (message.attributes != null && message.hasOwnProperty("attributes")) {
                    if (!Array.isArray(message.attributes))
                      return "attributes: array expected";
                    for (var i = 0; i < message.attributes.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                      if (error)
                        return "attributes." + error;
                    }
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                    if (!$util.isInteger(message.droppedAttributesCount))
                      return "droppedAttributesCount: integer expected";
                  }
                  return null;
                }, "verify");
                Event.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.trace.v1.Span.Event)
                    return object;
                  var message = new $root.opentelemetry.proto.trace.v1.Span.Event();
                  if (object.timeUnixNano != null) {
                    if ($util.Long)
                      (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                    else if (typeof object.timeUnixNano === "string")
                      message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                    else if (typeof object.timeUnixNano === "number")
                      message.timeUnixNano = object.timeUnixNano;
                    else if (typeof object.timeUnixNano === "object")
                      message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                  }
                  if (object.name != null)
                    message.name = String(object.name);
                  if (object.attributes) {
                    if (!Array.isArray(object.attributes))
                      throw TypeError(".opentelemetry.proto.trace.v1.Span.Event.attributes: array expected");
                    message.attributes = [];
                    for (var i = 0; i < object.attributes.length; ++i) {
                      if (typeof object.attributes[i] !== "object")
                        throw TypeError(".opentelemetry.proto.trace.v1.Span.Event.attributes: object expected");
                      message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                    }
                  }
                  if (object.droppedAttributesCount != null)
                    message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                  return message;
                }, "fromObject");
                Event.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                  if (!options3)
                    options3 = {};
                  var object = {};
                  if (options3.arrays || options3.defaults)
                    object.attributes = [];
                  if (options3.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.timeUnixNano = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                    } else
                      object.timeUnixNano = options3.longs === String ? "0" : 0;
                    object.name = "";
                    object.droppedAttributesCount = 0;
                  }
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                    if (typeof message.timeUnixNano === "number")
                      object.timeUnixNano = options3.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                    else
                      object.timeUnixNano = options3.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options3.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                  if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                  if (message.attributes && message.attributes.length) {
                    object.attributes = [];
                    for (var j = 0; j < message.attributes.length; ++j)
                      object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options3);
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                    object.droppedAttributesCount = message.droppedAttributesCount;
                  return object;
                }, "toObject");
                Event.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                }, "toJSON");
                Event.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Span.Event";
                }, "getTypeUrl");
                return Event;
              }();
              Span2.Link = function() {
                function Link(properties) {
                  this.attributes = [];
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                __name(Link, "Link");
                Link.prototype.traceId = null;
                Link.prototype.spanId = null;
                Link.prototype.traceState = null;
                Link.prototype.attributes = $util.emptyArray;
                Link.prototype.droppedAttributesCount = null;
                Link.create = /* @__PURE__ */ __name(function create(properties) {
                  return new Link(properties);
                }, "create");
                Link.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                    writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).bytes(message.traceId);
                  if (message.spanId != null && Object.hasOwnProperty.call(message, "spanId"))
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).bytes(message.spanId);
                  if (message.traceState != null && Object.hasOwnProperty.call(message, "traceState"))
                    writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).string(message.traceState);
                  if (message.attributes != null && message.attributes.length)
                    for (var i = 0; i < message.attributes.length; ++i)
                      $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                        /* id 4, wireType 2 =*/
                        34
                      ).fork()).ldelim();
                  if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                    writer.uint32(
                      /* id 5, wireType 0 =*/
                      40
                    ).uint32(message.droppedAttributesCount);
                  return writer;
                }, "encode");
                Link.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                }, "encodeDelimited");
                Link.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.Span.Link();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.traceId = reader.bytes();
                        break;
                      }
                      case 2: {
                        message.spanId = reader.bytes();
                        break;
                      }
                      case 3: {
                        message.traceState = reader.string();
                        break;
                      }
                      case 4: {
                        if (!(message.attributes && message.attributes.length))
                          message.attributes = [];
                        message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      case 5: {
                        message.droppedAttributesCount = reader.uint32();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                }, "decode");
                Link.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                }, "decodeDelimited");
                Link.verify = /* @__PURE__ */ __name(function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.traceId != null && message.hasOwnProperty("traceId")) {
                    if (!(message.traceId && typeof message.traceId.length === "number" || $util.isString(message.traceId)))
                      return "traceId: buffer expected";
                  }
                  if (message.spanId != null && message.hasOwnProperty("spanId")) {
                    if (!(message.spanId && typeof message.spanId.length === "number" || $util.isString(message.spanId)))
                      return "spanId: buffer expected";
                  }
                  if (message.traceState != null && message.hasOwnProperty("traceState")) {
                    if (!$util.isString(message.traceState))
                      return "traceState: string expected";
                  }
                  if (message.attributes != null && message.hasOwnProperty("attributes")) {
                    if (!Array.isArray(message.attributes))
                      return "attributes: array expected";
                    for (var i = 0; i < message.attributes.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                      if (error)
                        return "attributes." + error;
                    }
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                    if (!$util.isInteger(message.droppedAttributesCount))
                      return "droppedAttributesCount: integer expected";
                  }
                  return null;
                }, "verify");
                Link.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.trace.v1.Span.Link)
                    return object;
                  var message = new $root.opentelemetry.proto.trace.v1.Span.Link();
                  if (object.traceId != null) {
                    if (typeof object.traceId === "string")
                      $util.base64.decode(object.traceId, message.traceId = $util.newBuffer($util.base64.length(object.traceId)), 0);
                    else if (object.traceId.length >= 0)
                      message.traceId = object.traceId;
                  }
                  if (object.spanId != null) {
                    if (typeof object.spanId === "string")
                      $util.base64.decode(object.spanId, message.spanId = $util.newBuffer($util.base64.length(object.spanId)), 0);
                    else if (object.spanId.length >= 0)
                      message.spanId = object.spanId;
                  }
                  if (object.traceState != null)
                    message.traceState = String(object.traceState);
                  if (object.attributes) {
                    if (!Array.isArray(object.attributes))
                      throw TypeError(".opentelemetry.proto.trace.v1.Span.Link.attributes: array expected");
                    message.attributes = [];
                    for (var i = 0; i < object.attributes.length; ++i) {
                      if (typeof object.attributes[i] !== "object")
                        throw TypeError(".opentelemetry.proto.trace.v1.Span.Link.attributes: object expected");
                      message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                    }
                  }
                  if (object.droppedAttributesCount != null)
                    message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                  return message;
                }, "fromObject");
                Link.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                  if (!options3)
                    options3 = {};
                  var object = {};
                  if (options3.arrays || options3.defaults)
                    object.attributes = [];
                  if (options3.defaults) {
                    if (options3.bytes === String)
                      object.traceId = "";
                    else {
                      object.traceId = [];
                      if (options3.bytes !== Array)
                        object.traceId = $util.newBuffer(object.traceId);
                    }
                    if (options3.bytes === String)
                      object.spanId = "";
                    else {
                      object.spanId = [];
                      if (options3.bytes !== Array)
                        object.spanId = $util.newBuffer(object.spanId);
                    }
                    object.traceState = "";
                    object.droppedAttributesCount = 0;
                  }
                  if (message.traceId != null && message.hasOwnProperty("traceId"))
                    object.traceId = options3.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options3.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                  if (message.spanId != null && message.hasOwnProperty("spanId"))
                    object.spanId = options3.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options3.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                  if (message.traceState != null && message.hasOwnProperty("traceState"))
                    object.traceState = message.traceState;
                  if (message.attributes && message.attributes.length) {
                    object.attributes = [];
                    for (var j = 0; j < message.attributes.length; ++j)
                      object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options3);
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                    object.droppedAttributesCount = message.droppedAttributesCount;
                  return object;
                }, "toObject");
                Link.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                }, "toJSON");
                Link.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Span.Link";
                }, "getTypeUrl");
                return Link;
              }();
              return Span2;
            }();
            v1.Status = function() {
              function Status(properties) {
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(Status, "Status");
              Status.prototype.message = null;
              Status.prototype.code = null;
              Status.create = /* @__PURE__ */ __name(function create(properties) {
                return new Status(properties);
              }, "create");
              Status.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                  writer.uint32(
                    /* id 2, wireType 2 =*/
                    18
                  ).string(message.message);
                if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                  writer.uint32(
                    /* id 3, wireType 0 =*/
                    24
                  ).int32(message.code);
                return writer;
              }, "encode");
              Status.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              Status.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.Status();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 2: {
                      message.message = reader.string();
                      break;
                    }
                    case 3: {
                      message.code = reader.int32();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              Status.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              Status.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.message != null && message.hasOwnProperty("message")) {
                  if (!$util.isString(message.message))
                    return "message: string expected";
                }
                if (message.code != null && message.hasOwnProperty("code"))
                  switch (message.code) {
                    default:
                      return "code: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                      break;
                  }
                return null;
              }, "verify");
              Status.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.trace.v1.Status)
                  return object;
                var message = new $root.opentelemetry.proto.trace.v1.Status();
                if (object.message != null)
                  message.message = String(object.message);
                switch (object.code) {
                  default:
                    if (typeof object.code === "number") {
                      message.code = object.code;
                      break;
                    }
                    break;
                  case "STATUS_CODE_UNSET":
                  case 0:
                    message.code = 0;
                    break;
                  case "STATUS_CODE_OK":
                  case 1:
                    message.code = 1;
                    break;
                  case "STATUS_CODE_ERROR":
                  case 2:
                    message.code = 2;
                    break;
                }
                return message;
              }, "fromObject");
              Status.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.defaults) {
                  object.message = "";
                  object.code = options3.enums === String ? "STATUS_CODE_UNSET" : 0;
                }
                if (message.message != null && message.hasOwnProperty("message"))
                  object.message = message.message;
                if (message.code != null && message.hasOwnProperty("code"))
                  object.code = options3.enums === String ? $root.opentelemetry.proto.trace.v1.Status.StatusCode[message.code] === void 0 ? message.code : $root.opentelemetry.proto.trace.v1.Status.StatusCode[message.code] : message.code;
                return object;
              }, "toObject");
              Status.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              Status.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Status";
              }, "getTypeUrl");
              Status.StatusCode = function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "STATUS_CODE_UNSET"] = 0;
                values[valuesById[1] = "STATUS_CODE_OK"] = 1;
                values[valuesById[2] = "STATUS_CODE_ERROR"] = 2;
                return values;
              }();
              return Status;
            }();
            return v1;
          }();
          return trace4;
        }();
        proto.collector = function() {
          var collector = {};
          collector.trace = function() {
            var trace4 = {};
            trace4.v1 = function() {
              var v1 = {};
              v1.TraceService = function() {
                function TraceService(rpcImpl, requestDelimited, responseDelimited) {
                  $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }
                __name(TraceService, "TraceService");
                (TraceService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = TraceService;
                TraceService.create = /* @__PURE__ */ __name(function create(rpcImpl, requestDelimited, responseDelimited) {
                  return new this(rpcImpl, requestDelimited, responseDelimited);
                }, "create");
                Object.defineProperty(TraceService.prototype["export"] = /* @__PURE__ */ __name(function export_(request3, callback) {
                  return this.rpcCall(export_, $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest, $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse, request3, callback);
                }, "export_"), "name", { value: "Export" });
                return TraceService;
              }();
              v1.ExportTraceServiceRequest = function() {
                function ExportTraceServiceRequest(properties) {
                  this.resourceSpans = [];
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                __name(ExportTraceServiceRequest, "ExportTraceServiceRequest");
                ExportTraceServiceRequest.prototype.resourceSpans = $util.emptyArray;
                ExportTraceServiceRequest.create = /* @__PURE__ */ __name(function create(properties) {
                  return new ExportTraceServiceRequest(properties);
                }, "create");
                ExportTraceServiceRequest.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resourceSpans != null && message.resourceSpans.length)
                    for (var i = 0; i < message.resourceSpans.length; ++i)
                      $root.opentelemetry.proto.trace.v1.ResourceSpans.encode(message.resourceSpans[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                }, "encode");
                ExportTraceServiceRequest.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                }, "encodeDelimited");
                ExportTraceServiceRequest.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.resourceSpans && message.resourceSpans.length))
                          message.resourceSpans = [];
                        message.resourceSpans.push($root.opentelemetry.proto.trace.v1.ResourceSpans.decode(reader, reader.uint32()));
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                }, "decode");
                ExportTraceServiceRequest.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                }, "decodeDelimited");
                ExportTraceServiceRequest.verify = /* @__PURE__ */ __name(function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.resourceSpans != null && message.hasOwnProperty("resourceSpans")) {
                    if (!Array.isArray(message.resourceSpans))
                      return "resourceSpans: array expected";
                    for (var i = 0; i < message.resourceSpans.length; ++i) {
                      var error = $root.opentelemetry.proto.trace.v1.ResourceSpans.verify(message.resourceSpans[i]);
                      if (error)
                        return "resourceSpans." + error;
                    }
                  }
                  return null;
                }, "verify");
                ExportTraceServiceRequest.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest();
                  if (object.resourceSpans) {
                    if (!Array.isArray(object.resourceSpans))
                      throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest.resourceSpans: array expected");
                    message.resourceSpans = [];
                    for (var i = 0; i < object.resourceSpans.length; ++i) {
                      if (typeof object.resourceSpans[i] !== "object")
                        throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest.resourceSpans: object expected");
                      message.resourceSpans[i] = $root.opentelemetry.proto.trace.v1.ResourceSpans.fromObject(object.resourceSpans[i]);
                    }
                  }
                  return message;
                }, "fromObject");
                ExportTraceServiceRequest.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                  if (!options3)
                    options3 = {};
                  var object = {};
                  if (options3.arrays || options3.defaults)
                    object.resourceSpans = [];
                  if (message.resourceSpans && message.resourceSpans.length) {
                    object.resourceSpans = [];
                    for (var j = 0; j < message.resourceSpans.length; ++j)
                      object.resourceSpans[j] = $root.opentelemetry.proto.trace.v1.ResourceSpans.toObject(message.resourceSpans[j], options3);
                  }
                  return object;
                }, "toObject");
                ExportTraceServiceRequest.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                }, "toJSON");
                ExportTraceServiceRequest.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest";
                }, "getTypeUrl");
                return ExportTraceServiceRequest;
              }();
              v1.ExportTraceServiceResponse = function() {
                function ExportTraceServiceResponse(properties) {
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                __name(ExportTraceServiceResponse, "ExportTraceServiceResponse");
                ExportTraceServiceResponse.prototype.partialSuccess = null;
                ExportTraceServiceResponse.create = /* @__PURE__ */ __name(function create(properties) {
                  return new ExportTraceServiceResponse(properties);
                }, "create");
                ExportTraceServiceResponse.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.partialSuccess != null && Object.hasOwnProperty.call(message, "partialSuccess"))
                    $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.encode(message.partialSuccess, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  return writer;
                }, "encode");
                ExportTraceServiceResponse.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                }, "encodeDelimited");
                ExportTraceServiceResponse.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.partialSuccess = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.decode(reader, reader.uint32());
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                }, "decode");
                ExportTraceServiceResponse.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                }, "decodeDelimited");
                ExportTraceServiceResponse.verify = /* @__PURE__ */ __name(function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess")) {
                    var error = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.verify(message.partialSuccess);
                    if (error)
                      return "partialSuccess." + error;
                  }
                  return null;
                }, "verify");
                ExportTraceServiceResponse.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse();
                  if (object.partialSuccess != null) {
                    if (typeof object.partialSuccess !== "object")
                      throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse.partialSuccess: object expected");
                    message.partialSuccess = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.fromObject(object.partialSuccess);
                  }
                  return message;
                }, "fromObject");
                ExportTraceServiceResponse.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                  if (!options3)
                    options3 = {};
                  var object = {};
                  if (options3.defaults)
                    object.partialSuccess = null;
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess"))
                    object.partialSuccess = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.toObject(message.partialSuccess, options3);
                  return object;
                }, "toObject");
                ExportTraceServiceResponse.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                }, "toJSON");
                ExportTraceServiceResponse.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse";
                }, "getTypeUrl");
                return ExportTraceServiceResponse;
              }();
              v1.ExportTracePartialSuccess = function() {
                function ExportTracePartialSuccess(properties) {
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                __name(ExportTracePartialSuccess, "ExportTracePartialSuccess");
                ExportTracePartialSuccess.prototype.rejectedSpans = null;
                ExportTracePartialSuccess.prototype.errorMessage = null;
                ExportTracePartialSuccess.create = /* @__PURE__ */ __name(function create(properties) {
                  return new ExportTracePartialSuccess(properties);
                }, "create");
                ExportTracePartialSuccess.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.rejectedSpans != null && Object.hasOwnProperty.call(message, "rejectedSpans"))
                    writer.uint32(
                      /* id 1, wireType 0 =*/
                      8
                    ).int64(message.rejectedSpans);
                  if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).string(message.errorMessage);
                  return writer;
                }, "encode");
                ExportTracePartialSuccess.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                }, "encodeDelimited");
                ExportTracePartialSuccess.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.rejectedSpans = reader.int64();
                        break;
                      }
                      case 2: {
                        message.errorMessage = reader.string();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                }, "decode");
                ExportTracePartialSuccess.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                }, "decodeDelimited");
                ExportTracePartialSuccess.verify = /* @__PURE__ */ __name(function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.rejectedSpans != null && message.hasOwnProperty("rejectedSpans")) {
                    if (!$util.isInteger(message.rejectedSpans) && !(message.rejectedSpans && $util.isInteger(message.rejectedSpans.low) && $util.isInteger(message.rejectedSpans.high)))
                      return "rejectedSpans: integer|Long expected";
                  }
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage")) {
                    if (!$util.isString(message.errorMessage))
                      return "errorMessage: string expected";
                  }
                  return null;
                }, "verify");
                ExportTracePartialSuccess.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess();
                  if (object.rejectedSpans != null) {
                    if ($util.Long)
                      (message.rejectedSpans = $util.Long.fromValue(object.rejectedSpans)).unsigned = false;
                    else if (typeof object.rejectedSpans === "string")
                      message.rejectedSpans = parseInt(object.rejectedSpans, 10);
                    else if (typeof object.rejectedSpans === "number")
                      message.rejectedSpans = object.rejectedSpans;
                    else if (typeof object.rejectedSpans === "object")
                      message.rejectedSpans = new $util.LongBits(object.rejectedSpans.low >>> 0, object.rejectedSpans.high >>> 0).toNumber();
                  }
                  if (object.errorMessage != null)
                    message.errorMessage = String(object.errorMessage);
                  return message;
                }, "fromObject");
                ExportTracePartialSuccess.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                  if (!options3)
                    options3 = {};
                  var object = {};
                  if (options3.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.rejectedSpans = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                    } else
                      object.rejectedSpans = options3.longs === String ? "0" : 0;
                    object.errorMessage = "";
                  }
                  if (message.rejectedSpans != null && message.hasOwnProperty("rejectedSpans"))
                    if (typeof message.rejectedSpans === "number")
                      object.rejectedSpans = options3.longs === String ? String(message.rejectedSpans) : message.rejectedSpans;
                    else
                      object.rejectedSpans = options3.longs === String ? $util.Long.prototype.toString.call(message.rejectedSpans) : options3.longs === Number ? new $util.LongBits(message.rejectedSpans.low >>> 0, message.rejectedSpans.high >>> 0).toNumber() : message.rejectedSpans;
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                  return object;
                }, "toObject");
                ExportTracePartialSuccess.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                }, "toJSON");
                ExportTracePartialSuccess.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess";
                }, "getTypeUrl");
                return ExportTracePartialSuccess;
              }();
              return v1;
            }();
            return trace4;
          }();
          collector.metrics = function() {
            var metrics = {};
            metrics.v1 = function() {
              var v1 = {};
              v1.MetricsService = function() {
                function MetricsService(rpcImpl, requestDelimited, responseDelimited) {
                  $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }
                __name(MetricsService, "MetricsService");
                (MetricsService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = MetricsService;
                MetricsService.create = /* @__PURE__ */ __name(function create(rpcImpl, requestDelimited, responseDelimited) {
                  return new this(rpcImpl, requestDelimited, responseDelimited);
                }, "create");
                Object.defineProperty(MetricsService.prototype["export"] = /* @__PURE__ */ __name(function export_(request3, callback) {
                  return this.rpcCall(export_, $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest, $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse, request3, callback);
                }, "export_"), "name", { value: "Export" });
                return MetricsService;
              }();
              v1.ExportMetricsServiceRequest = function() {
                function ExportMetricsServiceRequest(properties) {
                  this.resourceMetrics = [];
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                __name(ExportMetricsServiceRequest, "ExportMetricsServiceRequest");
                ExportMetricsServiceRequest.prototype.resourceMetrics = $util.emptyArray;
                ExportMetricsServiceRequest.create = /* @__PURE__ */ __name(function create(properties) {
                  return new ExportMetricsServiceRequest(properties);
                }, "create");
                ExportMetricsServiceRequest.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resourceMetrics != null && message.resourceMetrics.length)
                    for (var i = 0; i < message.resourceMetrics.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.ResourceMetrics.encode(message.resourceMetrics[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                }, "encode");
                ExportMetricsServiceRequest.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                }, "encodeDelimited");
                ExportMetricsServiceRequest.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.resourceMetrics && message.resourceMetrics.length))
                          message.resourceMetrics = [];
                        message.resourceMetrics.push($root.opentelemetry.proto.metrics.v1.ResourceMetrics.decode(reader, reader.uint32()));
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                }, "decode");
                ExportMetricsServiceRequest.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                }, "decodeDelimited");
                ExportMetricsServiceRequest.verify = /* @__PURE__ */ __name(function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.resourceMetrics != null && message.hasOwnProperty("resourceMetrics")) {
                    if (!Array.isArray(message.resourceMetrics))
                      return "resourceMetrics: array expected";
                    for (var i = 0; i < message.resourceMetrics.length; ++i) {
                      var error = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.verify(message.resourceMetrics[i]);
                      if (error)
                        return "resourceMetrics." + error;
                    }
                  }
                  return null;
                }, "verify");
                ExportMetricsServiceRequest.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest();
                  if (object.resourceMetrics) {
                    if (!Array.isArray(object.resourceMetrics))
                      throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest.resourceMetrics: array expected");
                    message.resourceMetrics = [];
                    for (var i = 0; i < object.resourceMetrics.length; ++i) {
                      if (typeof object.resourceMetrics[i] !== "object")
                        throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest.resourceMetrics: object expected");
                      message.resourceMetrics[i] = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.fromObject(object.resourceMetrics[i]);
                    }
                  }
                  return message;
                }, "fromObject");
                ExportMetricsServiceRequest.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                  if (!options3)
                    options3 = {};
                  var object = {};
                  if (options3.arrays || options3.defaults)
                    object.resourceMetrics = [];
                  if (message.resourceMetrics && message.resourceMetrics.length) {
                    object.resourceMetrics = [];
                    for (var j = 0; j < message.resourceMetrics.length; ++j)
                      object.resourceMetrics[j] = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.toObject(message.resourceMetrics[j], options3);
                  }
                  return object;
                }, "toObject");
                ExportMetricsServiceRequest.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                }, "toJSON");
                ExportMetricsServiceRequest.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest";
                }, "getTypeUrl");
                return ExportMetricsServiceRequest;
              }();
              v1.ExportMetricsServiceResponse = function() {
                function ExportMetricsServiceResponse(properties) {
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                __name(ExportMetricsServiceResponse, "ExportMetricsServiceResponse");
                ExportMetricsServiceResponse.prototype.partialSuccess = null;
                ExportMetricsServiceResponse.create = /* @__PURE__ */ __name(function create(properties) {
                  return new ExportMetricsServiceResponse(properties);
                }, "create");
                ExportMetricsServiceResponse.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.partialSuccess != null && Object.hasOwnProperty.call(message, "partialSuccess"))
                    $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.encode(message.partialSuccess, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  return writer;
                }, "encode");
                ExportMetricsServiceResponse.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                }, "encodeDelimited");
                ExportMetricsServiceResponse.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.partialSuccess = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.decode(reader, reader.uint32());
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                }, "decode");
                ExportMetricsServiceResponse.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                }, "decodeDelimited");
                ExportMetricsServiceResponse.verify = /* @__PURE__ */ __name(function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess")) {
                    var error = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.verify(message.partialSuccess);
                    if (error)
                      return "partialSuccess." + error;
                  }
                  return null;
                }, "verify");
                ExportMetricsServiceResponse.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse();
                  if (object.partialSuccess != null) {
                    if (typeof object.partialSuccess !== "object")
                      throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse.partialSuccess: object expected");
                    message.partialSuccess = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.fromObject(object.partialSuccess);
                  }
                  return message;
                }, "fromObject");
                ExportMetricsServiceResponse.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                  if (!options3)
                    options3 = {};
                  var object = {};
                  if (options3.defaults)
                    object.partialSuccess = null;
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess"))
                    object.partialSuccess = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.toObject(message.partialSuccess, options3);
                  return object;
                }, "toObject");
                ExportMetricsServiceResponse.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                }, "toJSON");
                ExportMetricsServiceResponse.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse";
                }, "getTypeUrl");
                return ExportMetricsServiceResponse;
              }();
              v1.ExportMetricsPartialSuccess = function() {
                function ExportMetricsPartialSuccess(properties) {
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                __name(ExportMetricsPartialSuccess, "ExportMetricsPartialSuccess");
                ExportMetricsPartialSuccess.prototype.rejectedDataPoints = null;
                ExportMetricsPartialSuccess.prototype.errorMessage = null;
                ExportMetricsPartialSuccess.create = /* @__PURE__ */ __name(function create(properties) {
                  return new ExportMetricsPartialSuccess(properties);
                }, "create");
                ExportMetricsPartialSuccess.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.rejectedDataPoints != null && Object.hasOwnProperty.call(message, "rejectedDataPoints"))
                    writer.uint32(
                      /* id 1, wireType 0 =*/
                      8
                    ).int64(message.rejectedDataPoints);
                  if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).string(message.errorMessage);
                  return writer;
                }, "encode");
                ExportMetricsPartialSuccess.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                }, "encodeDelimited");
                ExportMetricsPartialSuccess.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.rejectedDataPoints = reader.int64();
                        break;
                      }
                      case 2: {
                        message.errorMessage = reader.string();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                }, "decode");
                ExportMetricsPartialSuccess.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                }, "decodeDelimited");
                ExportMetricsPartialSuccess.verify = /* @__PURE__ */ __name(function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.rejectedDataPoints != null && message.hasOwnProperty("rejectedDataPoints")) {
                    if (!$util.isInteger(message.rejectedDataPoints) && !(message.rejectedDataPoints && $util.isInteger(message.rejectedDataPoints.low) && $util.isInteger(message.rejectedDataPoints.high)))
                      return "rejectedDataPoints: integer|Long expected";
                  }
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage")) {
                    if (!$util.isString(message.errorMessage))
                      return "errorMessage: string expected";
                  }
                  return null;
                }, "verify");
                ExportMetricsPartialSuccess.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess();
                  if (object.rejectedDataPoints != null) {
                    if ($util.Long)
                      (message.rejectedDataPoints = $util.Long.fromValue(object.rejectedDataPoints)).unsigned = false;
                    else if (typeof object.rejectedDataPoints === "string")
                      message.rejectedDataPoints = parseInt(object.rejectedDataPoints, 10);
                    else if (typeof object.rejectedDataPoints === "number")
                      message.rejectedDataPoints = object.rejectedDataPoints;
                    else if (typeof object.rejectedDataPoints === "object")
                      message.rejectedDataPoints = new $util.LongBits(object.rejectedDataPoints.low >>> 0, object.rejectedDataPoints.high >>> 0).toNumber();
                  }
                  if (object.errorMessage != null)
                    message.errorMessage = String(object.errorMessage);
                  return message;
                }, "fromObject");
                ExportMetricsPartialSuccess.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                  if (!options3)
                    options3 = {};
                  var object = {};
                  if (options3.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.rejectedDataPoints = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                    } else
                      object.rejectedDataPoints = options3.longs === String ? "0" : 0;
                    object.errorMessage = "";
                  }
                  if (message.rejectedDataPoints != null && message.hasOwnProperty("rejectedDataPoints"))
                    if (typeof message.rejectedDataPoints === "number")
                      object.rejectedDataPoints = options3.longs === String ? String(message.rejectedDataPoints) : message.rejectedDataPoints;
                    else
                      object.rejectedDataPoints = options3.longs === String ? $util.Long.prototype.toString.call(message.rejectedDataPoints) : options3.longs === Number ? new $util.LongBits(message.rejectedDataPoints.low >>> 0, message.rejectedDataPoints.high >>> 0).toNumber() : message.rejectedDataPoints;
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                  return object;
                }, "toObject");
                ExportMetricsPartialSuccess.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                }, "toJSON");
                ExportMetricsPartialSuccess.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess";
                }, "getTypeUrl");
                return ExportMetricsPartialSuccess;
              }();
              return v1;
            }();
            return metrics;
          }();
          collector.logs = function() {
            var logs3 = {};
            logs3.v1 = function() {
              var v1 = {};
              v1.LogsService = function() {
                function LogsService(rpcImpl, requestDelimited, responseDelimited) {
                  $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }
                __name(LogsService, "LogsService");
                (LogsService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = LogsService;
                LogsService.create = /* @__PURE__ */ __name(function create(rpcImpl, requestDelimited, responseDelimited) {
                  return new this(rpcImpl, requestDelimited, responseDelimited);
                }, "create");
                Object.defineProperty(LogsService.prototype["export"] = /* @__PURE__ */ __name(function export_(request3, callback) {
                  return this.rpcCall(export_, $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest, $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse, request3, callback);
                }, "export_"), "name", { value: "Export" });
                return LogsService;
              }();
              v1.ExportLogsServiceRequest = function() {
                function ExportLogsServiceRequest(properties) {
                  this.resourceLogs = [];
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                __name(ExportLogsServiceRequest, "ExportLogsServiceRequest");
                ExportLogsServiceRequest.prototype.resourceLogs = $util.emptyArray;
                ExportLogsServiceRequest.create = /* @__PURE__ */ __name(function create(properties) {
                  return new ExportLogsServiceRequest(properties);
                }, "create");
                ExportLogsServiceRequest.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resourceLogs != null && message.resourceLogs.length)
                    for (var i = 0; i < message.resourceLogs.length; ++i)
                      $root.opentelemetry.proto.logs.v1.ResourceLogs.encode(message.resourceLogs[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                }, "encode");
                ExportLogsServiceRequest.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                }, "encodeDelimited");
                ExportLogsServiceRequest.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.resourceLogs && message.resourceLogs.length))
                          message.resourceLogs = [];
                        message.resourceLogs.push($root.opentelemetry.proto.logs.v1.ResourceLogs.decode(reader, reader.uint32()));
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                }, "decode");
                ExportLogsServiceRequest.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                }, "decodeDelimited");
                ExportLogsServiceRequest.verify = /* @__PURE__ */ __name(function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.resourceLogs != null && message.hasOwnProperty("resourceLogs")) {
                    if (!Array.isArray(message.resourceLogs))
                      return "resourceLogs: array expected";
                    for (var i = 0; i < message.resourceLogs.length; ++i) {
                      var error = $root.opentelemetry.proto.logs.v1.ResourceLogs.verify(message.resourceLogs[i]);
                      if (error)
                        return "resourceLogs." + error;
                    }
                  }
                  return null;
                }, "verify");
                ExportLogsServiceRequest.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest();
                  if (object.resourceLogs) {
                    if (!Array.isArray(object.resourceLogs))
                      throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest.resourceLogs: array expected");
                    message.resourceLogs = [];
                    for (var i = 0; i < object.resourceLogs.length; ++i) {
                      if (typeof object.resourceLogs[i] !== "object")
                        throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest.resourceLogs: object expected");
                      message.resourceLogs[i] = $root.opentelemetry.proto.logs.v1.ResourceLogs.fromObject(object.resourceLogs[i]);
                    }
                  }
                  return message;
                }, "fromObject");
                ExportLogsServiceRequest.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                  if (!options3)
                    options3 = {};
                  var object = {};
                  if (options3.arrays || options3.defaults)
                    object.resourceLogs = [];
                  if (message.resourceLogs && message.resourceLogs.length) {
                    object.resourceLogs = [];
                    for (var j = 0; j < message.resourceLogs.length; ++j)
                      object.resourceLogs[j] = $root.opentelemetry.proto.logs.v1.ResourceLogs.toObject(message.resourceLogs[j], options3);
                  }
                  return object;
                }, "toObject");
                ExportLogsServiceRequest.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                }, "toJSON");
                ExportLogsServiceRequest.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest";
                }, "getTypeUrl");
                return ExportLogsServiceRequest;
              }();
              v1.ExportLogsServiceResponse = function() {
                function ExportLogsServiceResponse(properties) {
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                __name(ExportLogsServiceResponse, "ExportLogsServiceResponse");
                ExportLogsServiceResponse.prototype.partialSuccess = null;
                ExportLogsServiceResponse.create = /* @__PURE__ */ __name(function create(properties) {
                  return new ExportLogsServiceResponse(properties);
                }, "create");
                ExportLogsServiceResponse.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.partialSuccess != null && Object.hasOwnProperty.call(message, "partialSuccess"))
                    $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.encode(message.partialSuccess, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  return writer;
                }, "encode");
                ExportLogsServiceResponse.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                }, "encodeDelimited");
                ExportLogsServiceResponse.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.partialSuccess = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.decode(reader, reader.uint32());
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                }, "decode");
                ExportLogsServiceResponse.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                }, "decodeDelimited");
                ExportLogsServiceResponse.verify = /* @__PURE__ */ __name(function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess")) {
                    var error = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.verify(message.partialSuccess);
                    if (error)
                      return "partialSuccess." + error;
                  }
                  return null;
                }, "verify");
                ExportLogsServiceResponse.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse();
                  if (object.partialSuccess != null) {
                    if (typeof object.partialSuccess !== "object")
                      throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse.partialSuccess: object expected");
                    message.partialSuccess = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.fromObject(object.partialSuccess);
                  }
                  return message;
                }, "fromObject");
                ExportLogsServiceResponse.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                  if (!options3)
                    options3 = {};
                  var object = {};
                  if (options3.defaults)
                    object.partialSuccess = null;
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess"))
                    object.partialSuccess = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.toObject(message.partialSuccess, options3);
                  return object;
                }, "toObject");
                ExportLogsServiceResponse.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                }, "toJSON");
                ExportLogsServiceResponse.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse";
                }, "getTypeUrl");
                return ExportLogsServiceResponse;
              }();
              v1.ExportLogsPartialSuccess = function() {
                function ExportLogsPartialSuccess(properties) {
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                __name(ExportLogsPartialSuccess, "ExportLogsPartialSuccess");
                ExportLogsPartialSuccess.prototype.rejectedLogRecords = null;
                ExportLogsPartialSuccess.prototype.errorMessage = null;
                ExportLogsPartialSuccess.create = /* @__PURE__ */ __name(function create(properties) {
                  return new ExportLogsPartialSuccess(properties);
                }, "create");
                ExportLogsPartialSuccess.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.rejectedLogRecords != null && Object.hasOwnProperty.call(message, "rejectedLogRecords"))
                    writer.uint32(
                      /* id 1, wireType 0 =*/
                      8
                    ).int64(message.rejectedLogRecords);
                  if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).string(message.errorMessage);
                  return writer;
                }, "encode");
                ExportLogsPartialSuccess.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                }, "encodeDelimited");
                ExportLogsPartialSuccess.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.rejectedLogRecords = reader.int64();
                        break;
                      }
                      case 2: {
                        message.errorMessage = reader.string();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                }, "decode");
                ExportLogsPartialSuccess.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                }, "decodeDelimited");
                ExportLogsPartialSuccess.verify = /* @__PURE__ */ __name(function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.rejectedLogRecords != null && message.hasOwnProperty("rejectedLogRecords")) {
                    if (!$util.isInteger(message.rejectedLogRecords) && !(message.rejectedLogRecords && $util.isInteger(message.rejectedLogRecords.low) && $util.isInteger(message.rejectedLogRecords.high)))
                      return "rejectedLogRecords: integer|Long expected";
                  }
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage")) {
                    if (!$util.isString(message.errorMessage))
                      return "errorMessage: string expected";
                  }
                  return null;
                }, "verify");
                ExportLogsPartialSuccess.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess();
                  if (object.rejectedLogRecords != null) {
                    if ($util.Long)
                      (message.rejectedLogRecords = $util.Long.fromValue(object.rejectedLogRecords)).unsigned = false;
                    else if (typeof object.rejectedLogRecords === "string")
                      message.rejectedLogRecords = parseInt(object.rejectedLogRecords, 10);
                    else if (typeof object.rejectedLogRecords === "number")
                      message.rejectedLogRecords = object.rejectedLogRecords;
                    else if (typeof object.rejectedLogRecords === "object")
                      message.rejectedLogRecords = new $util.LongBits(object.rejectedLogRecords.low >>> 0, object.rejectedLogRecords.high >>> 0).toNumber();
                  }
                  if (object.errorMessage != null)
                    message.errorMessage = String(object.errorMessage);
                  return message;
                }, "fromObject");
                ExportLogsPartialSuccess.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                  if (!options3)
                    options3 = {};
                  var object = {};
                  if (options3.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.rejectedLogRecords = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                    } else
                      object.rejectedLogRecords = options3.longs === String ? "0" : 0;
                    object.errorMessage = "";
                  }
                  if (message.rejectedLogRecords != null && message.hasOwnProperty("rejectedLogRecords"))
                    if (typeof message.rejectedLogRecords === "number")
                      object.rejectedLogRecords = options3.longs === String ? String(message.rejectedLogRecords) : message.rejectedLogRecords;
                    else
                      object.rejectedLogRecords = options3.longs === String ? $util.Long.prototype.toString.call(message.rejectedLogRecords) : options3.longs === Number ? new $util.LongBits(message.rejectedLogRecords.low >>> 0, message.rejectedLogRecords.high >>> 0).toNumber() : message.rejectedLogRecords;
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                  return object;
                }, "toObject");
                ExportLogsPartialSuccess.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                }, "toJSON");
                ExportLogsPartialSuccess.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess";
                }, "getTypeUrl");
                return ExportLogsPartialSuccess;
              }();
              return v1;
            }();
            return logs3;
          }();
          return collector;
        }();
        proto.metrics = function() {
          var metrics = {};
          metrics.v1 = function() {
            var v1 = {};
            v1.MetricsData = function() {
              function MetricsData(properties) {
                this.resourceMetrics = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(MetricsData, "MetricsData");
              MetricsData.prototype.resourceMetrics = $util.emptyArray;
              MetricsData.create = /* @__PURE__ */ __name(function create(properties) {
                return new MetricsData(properties);
              }, "create");
              MetricsData.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resourceMetrics != null && message.resourceMetrics.length)
                  for (var i = 0; i < message.resourceMetrics.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.ResourceMetrics.encode(message.resourceMetrics[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              }, "encode");
              MetricsData.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              MetricsData.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.MetricsData();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.resourceMetrics && message.resourceMetrics.length))
                        message.resourceMetrics = [];
                      message.resourceMetrics.push($root.opentelemetry.proto.metrics.v1.ResourceMetrics.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              MetricsData.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              MetricsData.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.resourceMetrics != null && message.hasOwnProperty("resourceMetrics")) {
                  if (!Array.isArray(message.resourceMetrics))
                    return "resourceMetrics: array expected";
                  for (var i = 0; i < message.resourceMetrics.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.verify(message.resourceMetrics[i]);
                    if (error)
                      return "resourceMetrics." + error;
                  }
                }
                return null;
              }, "verify");
              MetricsData.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.MetricsData)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.MetricsData();
                if (object.resourceMetrics) {
                  if (!Array.isArray(object.resourceMetrics))
                    throw TypeError(".opentelemetry.proto.metrics.v1.MetricsData.resourceMetrics: array expected");
                  message.resourceMetrics = [];
                  for (var i = 0; i < object.resourceMetrics.length; ++i) {
                    if (typeof object.resourceMetrics[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.MetricsData.resourceMetrics: object expected");
                    message.resourceMetrics[i] = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.fromObject(object.resourceMetrics[i]);
                  }
                }
                return message;
              }, "fromObject");
              MetricsData.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.resourceMetrics = [];
                if (message.resourceMetrics && message.resourceMetrics.length) {
                  object.resourceMetrics = [];
                  for (var j = 0; j < message.resourceMetrics.length; ++j)
                    object.resourceMetrics[j] = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.toObject(message.resourceMetrics[j], options3);
                }
                return object;
              }, "toObject");
              MetricsData.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              MetricsData.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.MetricsData";
              }, "getTypeUrl");
              return MetricsData;
            }();
            v1.ResourceMetrics = function() {
              function ResourceMetrics(properties) {
                this.scopeMetrics = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(ResourceMetrics, "ResourceMetrics");
              ResourceMetrics.prototype.resource = null;
              ResourceMetrics.prototype.scopeMetrics = $util.emptyArray;
              ResourceMetrics.prototype.schemaUrl = null;
              ResourceMetrics.create = /* @__PURE__ */ __name(function create(properties) {
                return new ResourceMetrics(properties);
              }, "create");
              ResourceMetrics.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                  $root.opentelemetry.proto.resource.v1.Resource.encode(message.resource, writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).fork()).ldelim();
                if (message.scopeMetrics != null && message.scopeMetrics.length)
                  for (var i = 0; i < message.scopeMetrics.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.ScopeMetrics.encode(message.scopeMetrics[i], writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork()).ldelim();
                if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.schemaUrl);
                return writer;
              }, "encode");
              ResourceMetrics.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              ResourceMetrics.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ResourceMetrics();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      message.resource = $root.opentelemetry.proto.resource.v1.Resource.decode(reader, reader.uint32());
                      break;
                    }
                    case 2: {
                      if (!(message.scopeMetrics && message.scopeMetrics.length))
                        message.scopeMetrics = [];
                      message.scopeMetrics.push($root.opentelemetry.proto.metrics.v1.ScopeMetrics.decode(reader, reader.uint32()));
                      break;
                    }
                    case 3: {
                      message.schemaUrl = reader.string();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              ResourceMetrics.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              ResourceMetrics.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.resource != null && message.hasOwnProperty("resource")) {
                  var error = $root.opentelemetry.proto.resource.v1.Resource.verify(message.resource);
                  if (error)
                    return "resource." + error;
                }
                if (message.scopeMetrics != null && message.hasOwnProperty("scopeMetrics")) {
                  if (!Array.isArray(message.scopeMetrics))
                    return "scopeMetrics: array expected";
                  for (var i = 0; i < message.scopeMetrics.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.ScopeMetrics.verify(message.scopeMetrics[i]);
                    if (error)
                      return "scopeMetrics." + error;
                  }
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                  if (!$util.isString(message.schemaUrl))
                    return "schemaUrl: string expected";
                }
                return null;
              }, "verify");
              ResourceMetrics.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.ResourceMetrics)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.ResourceMetrics();
                if (object.resource != null) {
                  if (typeof object.resource !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.resource: object expected");
                  message.resource = $root.opentelemetry.proto.resource.v1.Resource.fromObject(object.resource);
                }
                if (object.scopeMetrics) {
                  if (!Array.isArray(object.scopeMetrics))
                    throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.scopeMetrics: array expected");
                  message.scopeMetrics = [];
                  for (var i = 0; i < object.scopeMetrics.length; ++i) {
                    if (typeof object.scopeMetrics[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.scopeMetrics: object expected");
                    message.scopeMetrics[i] = $root.opentelemetry.proto.metrics.v1.ScopeMetrics.fromObject(object.scopeMetrics[i]);
                  }
                }
                if (object.schemaUrl != null)
                  message.schemaUrl = String(object.schemaUrl);
                return message;
              }, "fromObject");
              ResourceMetrics.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.scopeMetrics = [];
                if (options3.defaults) {
                  object.resource = null;
                  object.schemaUrl = "";
                }
                if (message.resource != null && message.hasOwnProperty("resource"))
                  object.resource = $root.opentelemetry.proto.resource.v1.Resource.toObject(message.resource, options3);
                if (message.scopeMetrics && message.scopeMetrics.length) {
                  object.scopeMetrics = [];
                  for (var j = 0; j < message.scopeMetrics.length; ++j)
                    object.scopeMetrics[j] = $root.opentelemetry.proto.metrics.v1.ScopeMetrics.toObject(message.scopeMetrics[j], options3);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              }, "toObject");
              ResourceMetrics.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              ResourceMetrics.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ResourceMetrics";
              }, "getTypeUrl");
              return ResourceMetrics;
            }();
            v1.ScopeMetrics = function() {
              function ScopeMetrics(properties) {
                this.metrics = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(ScopeMetrics, "ScopeMetrics");
              ScopeMetrics.prototype.scope = null;
              ScopeMetrics.prototype.metrics = $util.emptyArray;
              ScopeMetrics.prototype.schemaUrl = null;
              ScopeMetrics.create = /* @__PURE__ */ __name(function create(properties) {
                return new ScopeMetrics(properties);
              }, "create");
              ScopeMetrics.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.scope != null && Object.hasOwnProperty.call(message, "scope"))
                  $root.opentelemetry.proto.common.v1.InstrumentationScope.encode(message.scope, writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).fork()).ldelim();
                if (message.metrics != null && message.metrics.length)
                  for (var i = 0; i < message.metrics.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.Metric.encode(message.metrics[i], writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork()).ldelim();
                if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.schemaUrl);
                return writer;
              }, "encode");
              ScopeMetrics.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              ScopeMetrics.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ScopeMetrics();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.decode(reader, reader.uint32());
                      break;
                    }
                    case 2: {
                      if (!(message.metrics && message.metrics.length))
                        message.metrics = [];
                      message.metrics.push($root.opentelemetry.proto.metrics.v1.Metric.decode(reader, reader.uint32()));
                      break;
                    }
                    case 3: {
                      message.schemaUrl = reader.string();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              ScopeMetrics.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              ScopeMetrics.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.scope != null && message.hasOwnProperty("scope")) {
                  var error = $root.opentelemetry.proto.common.v1.InstrumentationScope.verify(message.scope);
                  if (error)
                    return "scope." + error;
                }
                if (message.metrics != null && message.hasOwnProperty("metrics")) {
                  if (!Array.isArray(message.metrics))
                    return "metrics: array expected";
                  for (var i = 0; i < message.metrics.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.Metric.verify(message.metrics[i]);
                    if (error)
                      return "metrics." + error;
                  }
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                  if (!$util.isString(message.schemaUrl))
                    return "schemaUrl: string expected";
                }
                return null;
              }, "verify");
              ScopeMetrics.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.ScopeMetrics)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.ScopeMetrics();
                if (object.scope != null) {
                  if (typeof object.scope !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.scope: object expected");
                  message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(object.scope);
                }
                if (object.metrics) {
                  if (!Array.isArray(object.metrics))
                    throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.metrics: array expected");
                  message.metrics = [];
                  for (var i = 0; i < object.metrics.length; ++i) {
                    if (typeof object.metrics[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.metrics: object expected");
                    message.metrics[i] = $root.opentelemetry.proto.metrics.v1.Metric.fromObject(object.metrics[i]);
                  }
                }
                if (object.schemaUrl != null)
                  message.schemaUrl = String(object.schemaUrl);
                return message;
              }, "fromObject");
              ScopeMetrics.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.metrics = [];
                if (options3.defaults) {
                  object.scope = null;
                  object.schemaUrl = "";
                }
                if (message.scope != null && message.hasOwnProperty("scope"))
                  object.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.toObject(message.scope, options3);
                if (message.metrics && message.metrics.length) {
                  object.metrics = [];
                  for (var j = 0; j < message.metrics.length; ++j)
                    object.metrics[j] = $root.opentelemetry.proto.metrics.v1.Metric.toObject(message.metrics[j], options3);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              }, "toObject");
              ScopeMetrics.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              ScopeMetrics.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ScopeMetrics";
              }, "getTypeUrl");
              return ScopeMetrics;
            }();
            v1.Metric = function() {
              function Metric(properties) {
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(Metric, "Metric");
              Metric.prototype.name = null;
              Metric.prototype.description = null;
              Metric.prototype.unit = null;
              Metric.prototype.gauge = null;
              Metric.prototype.sum = null;
              Metric.prototype.histogram = null;
              Metric.prototype.exponentialHistogram = null;
              Metric.prototype.summary = null;
              var $oneOfFields;
              Object.defineProperty(Metric.prototype, "data", {
                get: $util.oneOfGetter($oneOfFields = ["gauge", "sum", "histogram", "exponentialHistogram", "summary"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              Metric.create = /* @__PURE__ */ __name(function create(properties) {
                return new Metric(properties);
              }, "create");
              Metric.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                  writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).string(message.name);
                if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                  writer.uint32(
                    /* id 2, wireType 2 =*/
                    18
                  ).string(message.description);
                if (message.unit != null && Object.hasOwnProperty.call(message, "unit"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.unit);
                if (message.gauge != null && Object.hasOwnProperty.call(message, "gauge"))
                  $root.opentelemetry.proto.metrics.v1.Gauge.encode(message.gauge, writer.uint32(
                    /* id 5, wireType 2 =*/
                    42
                  ).fork()).ldelim();
                if (message.sum != null && Object.hasOwnProperty.call(message, "sum"))
                  $root.opentelemetry.proto.metrics.v1.Sum.encode(message.sum, writer.uint32(
                    /* id 7, wireType 2 =*/
                    58
                  ).fork()).ldelim();
                if (message.histogram != null && Object.hasOwnProperty.call(message, "histogram"))
                  $root.opentelemetry.proto.metrics.v1.Histogram.encode(message.histogram, writer.uint32(
                    /* id 9, wireType 2 =*/
                    74
                  ).fork()).ldelim();
                if (message.exponentialHistogram != null && Object.hasOwnProperty.call(message, "exponentialHistogram"))
                  $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.encode(message.exponentialHistogram, writer.uint32(
                    /* id 10, wireType 2 =*/
                    82
                  ).fork()).ldelim();
                if (message.summary != null && Object.hasOwnProperty.call(message, "summary"))
                  $root.opentelemetry.proto.metrics.v1.Summary.encode(message.summary, writer.uint32(
                    /* id 11, wireType 2 =*/
                    90
                  ).fork()).ldelim();
                return writer;
              }, "encode");
              Metric.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              Metric.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Metric();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      message.name = reader.string();
                      break;
                    }
                    case 2: {
                      message.description = reader.string();
                      break;
                    }
                    case 3: {
                      message.unit = reader.string();
                      break;
                    }
                    case 5: {
                      message.gauge = $root.opentelemetry.proto.metrics.v1.Gauge.decode(reader, reader.uint32());
                      break;
                    }
                    case 7: {
                      message.sum = $root.opentelemetry.proto.metrics.v1.Sum.decode(reader, reader.uint32());
                      break;
                    }
                    case 9: {
                      message.histogram = $root.opentelemetry.proto.metrics.v1.Histogram.decode(reader, reader.uint32());
                      break;
                    }
                    case 10: {
                      message.exponentialHistogram = $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.decode(reader, reader.uint32());
                      break;
                    }
                    case 11: {
                      message.summary = $root.opentelemetry.proto.metrics.v1.Summary.decode(reader, reader.uint32());
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              Metric.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              Metric.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                var properties = {};
                if (message.name != null && message.hasOwnProperty("name")) {
                  if (!$util.isString(message.name))
                    return "name: string expected";
                }
                if (message.description != null && message.hasOwnProperty("description")) {
                  if (!$util.isString(message.description))
                    return "description: string expected";
                }
                if (message.unit != null && message.hasOwnProperty("unit")) {
                  if (!$util.isString(message.unit))
                    return "unit: string expected";
                }
                if (message.gauge != null && message.hasOwnProperty("gauge")) {
                  properties.data = 1;
                  {
                    var error = $root.opentelemetry.proto.metrics.v1.Gauge.verify(message.gauge);
                    if (error)
                      return "gauge." + error;
                  }
                }
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  if (properties.data === 1)
                    return "data: multiple values";
                  properties.data = 1;
                  {
                    var error = $root.opentelemetry.proto.metrics.v1.Sum.verify(message.sum);
                    if (error)
                      return "sum." + error;
                  }
                }
                if (message.histogram != null && message.hasOwnProperty("histogram")) {
                  if (properties.data === 1)
                    return "data: multiple values";
                  properties.data = 1;
                  {
                    var error = $root.opentelemetry.proto.metrics.v1.Histogram.verify(message.histogram);
                    if (error)
                      return "histogram." + error;
                  }
                }
                if (message.exponentialHistogram != null && message.hasOwnProperty("exponentialHistogram")) {
                  if (properties.data === 1)
                    return "data: multiple values";
                  properties.data = 1;
                  {
                    var error = $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.verify(message.exponentialHistogram);
                    if (error)
                      return "exponentialHistogram." + error;
                  }
                }
                if (message.summary != null && message.hasOwnProperty("summary")) {
                  if (properties.data === 1)
                    return "data: multiple values";
                  properties.data = 1;
                  {
                    var error = $root.opentelemetry.proto.metrics.v1.Summary.verify(message.summary);
                    if (error)
                      return "summary." + error;
                  }
                }
                return null;
              }, "verify");
              Metric.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.Metric)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.Metric();
                if (object.name != null)
                  message.name = String(object.name);
                if (object.description != null)
                  message.description = String(object.description);
                if (object.unit != null)
                  message.unit = String(object.unit);
                if (object.gauge != null) {
                  if (typeof object.gauge !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.Metric.gauge: object expected");
                  message.gauge = $root.opentelemetry.proto.metrics.v1.Gauge.fromObject(object.gauge);
                }
                if (object.sum != null) {
                  if (typeof object.sum !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.Metric.sum: object expected");
                  message.sum = $root.opentelemetry.proto.metrics.v1.Sum.fromObject(object.sum);
                }
                if (object.histogram != null) {
                  if (typeof object.histogram !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.Metric.histogram: object expected");
                  message.histogram = $root.opentelemetry.proto.metrics.v1.Histogram.fromObject(object.histogram);
                }
                if (object.exponentialHistogram != null) {
                  if (typeof object.exponentialHistogram !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.Metric.exponentialHistogram: object expected");
                  message.exponentialHistogram = $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.fromObject(object.exponentialHistogram);
                }
                if (object.summary != null) {
                  if (typeof object.summary !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.Metric.summary: object expected");
                  message.summary = $root.opentelemetry.proto.metrics.v1.Summary.fromObject(object.summary);
                }
                return message;
              }, "fromObject");
              Metric.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.defaults) {
                  object.name = "";
                  object.description = "";
                  object.unit = "";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                  object.name = message.name;
                if (message.description != null && message.hasOwnProperty("description"))
                  object.description = message.description;
                if (message.unit != null && message.hasOwnProperty("unit"))
                  object.unit = message.unit;
                if (message.gauge != null && message.hasOwnProperty("gauge")) {
                  object.gauge = $root.opentelemetry.proto.metrics.v1.Gauge.toObject(message.gauge, options3);
                  if (options3.oneofs)
                    object.data = "gauge";
                }
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  object.sum = $root.opentelemetry.proto.metrics.v1.Sum.toObject(message.sum, options3);
                  if (options3.oneofs)
                    object.data = "sum";
                }
                if (message.histogram != null && message.hasOwnProperty("histogram")) {
                  object.histogram = $root.opentelemetry.proto.metrics.v1.Histogram.toObject(message.histogram, options3);
                  if (options3.oneofs)
                    object.data = "histogram";
                }
                if (message.exponentialHistogram != null && message.hasOwnProperty("exponentialHistogram")) {
                  object.exponentialHistogram = $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.toObject(message.exponentialHistogram, options3);
                  if (options3.oneofs)
                    object.data = "exponentialHistogram";
                }
                if (message.summary != null && message.hasOwnProperty("summary")) {
                  object.summary = $root.opentelemetry.proto.metrics.v1.Summary.toObject(message.summary, options3);
                  if (options3.oneofs)
                    object.data = "summary";
                }
                return object;
              }, "toObject");
              Metric.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              Metric.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Metric";
              }, "getTypeUrl");
              return Metric;
            }();
            v1.Gauge = function() {
              function Gauge(properties) {
                this.dataPoints = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(Gauge, "Gauge");
              Gauge.prototype.dataPoints = $util.emptyArray;
              Gauge.create = /* @__PURE__ */ __name(function create(properties) {
                return new Gauge(properties);
              }, "create");
              Gauge.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.dataPoints != null && message.dataPoints.length)
                  for (var i = 0; i < message.dataPoints.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.NumberDataPoint.encode(message.dataPoints[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              }, "encode");
              Gauge.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              Gauge.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Gauge();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.dataPoints && message.dataPoints.length))
                        message.dataPoints = [];
                      message.dataPoints.push($root.opentelemetry.proto.metrics.v1.NumberDataPoint.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              Gauge.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              Gauge.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                  if (!Array.isArray(message.dataPoints))
                    return "dataPoints: array expected";
                  for (var i = 0; i < message.dataPoints.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.verify(message.dataPoints[i]);
                    if (error)
                      return "dataPoints." + error;
                  }
                }
                return null;
              }, "verify");
              Gauge.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.Gauge)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.Gauge();
                if (object.dataPoints) {
                  if (!Array.isArray(object.dataPoints))
                    throw TypeError(".opentelemetry.proto.metrics.v1.Gauge.dataPoints: array expected");
                  message.dataPoints = [];
                  for (var i = 0; i < object.dataPoints.length; ++i) {
                    if (typeof object.dataPoints[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Gauge.dataPoints: object expected");
                    message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.fromObject(object.dataPoints[i]);
                  }
                }
                return message;
              }, "fromObject");
              Gauge.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.dataPoints = [];
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.toObject(message.dataPoints[j], options3);
                }
                return object;
              }, "toObject");
              Gauge.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              Gauge.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Gauge";
              }, "getTypeUrl");
              return Gauge;
            }();
            v1.Sum = function() {
              function Sum(properties) {
                this.dataPoints = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(Sum, "Sum");
              Sum.prototype.dataPoints = $util.emptyArray;
              Sum.prototype.aggregationTemporality = null;
              Sum.prototype.isMonotonic = null;
              Sum.create = /* @__PURE__ */ __name(function create(properties) {
                return new Sum(properties);
              }, "create");
              Sum.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.dataPoints != null && message.dataPoints.length)
                  for (var i = 0; i < message.dataPoints.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.NumberDataPoint.encode(message.dataPoints[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                if (message.aggregationTemporality != null && Object.hasOwnProperty.call(message, "aggregationTemporality"))
                  writer.uint32(
                    /* id 2, wireType 0 =*/
                    16
                  ).int32(message.aggregationTemporality);
                if (message.isMonotonic != null && Object.hasOwnProperty.call(message, "isMonotonic"))
                  writer.uint32(
                    /* id 3, wireType 0 =*/
                    24
                  ).bool(message.isMonotonic);
                return writer;
              }, "encode");
              Sum.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              Sum.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Sum();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.dataPoints && message.dataPoints.length))
                        message.dataPoints = [];
                      message.dataPoints.push($root.opentelemetry.proto.metrics.v1.NumberDataPoint.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.aggregationTemporality = reader.int32();
                      break;
                    }
                    case 3: {
                      message.isMonotonic = reader.bool();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              Sum.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              Sum.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                  if (!Array.isArray(message.dataPoints))
                    return "dataPoints: array expected";
                  for (var i = 0; i < message.dataPoints.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.verify(message.dataPoints[i]);
                    if (error)
                      return "dataPoints." + error;
                  }
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  switch (message.aggregationTemporality) {
                    default:
                      return "aggregationTemporality: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                      break;
                  }
                if (message.isMonotonic != null && message.hasOwnProperty("isMonotonic")) {
                  if (typeof message.isMonotonic !== "boolean")
                    return "isMonotonic: boolean expected";
                }
                return null;
              }, "verify");
              Sum.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.Sum)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.Sum();
                if (object.dataPoints) {
                  if (!Array.isArray(object.dataPoints))
                    throw TypeError(".opentelemetry.proto.metrics.v1.Sum.dataPoints: array expected");
                  message.dataPoints = [];
                  for (var i = 0; i < object.dataPoints.length; ++i) {
                    if (typeof object.dataPoints[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Sum.dataPoints: object expected");
                    message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.fromObject(object.dataPoints[i]);
                  }
                }
                switch (object.aggregationTemporality) {
                  default:
                    if (typeof object.aggregationTemporality === "number") {
                      message.aggregationTemporality = object.aggregationTemporality;
                      break;
                    }
                    break;
                  case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                  case 0:
                    message.aggregationTemporality = 0;
                    break;
                  case "AGGREGATION_TEMPORALITY_DELTA":
                  case 1:
                    message.aggregationTemporality = 1;
                    break;
                  case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                  case 2:
                    message.aggregationTemporality = 2;
                    break;
                }
                if (object.isMonotonic != null)
                  message.isMonotonic = Boolean(object.isMonotonic);
                return message;
              }, "fromObject");
              Sum.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.dataPoints = [];
                if (options3.defaults) {
                  object.aggregationTemporality = options3.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
                  object.isMonotonic = false;
                }
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.toObject(message.dataPoints[j], options3);
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  object.aggregationTemporality = options3.enums === String ? $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] === void 0 ? message.aggregationTemporality : $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] : message.aggregationTemporality;
                if (message.isMonotonic != null && message.hasOwnProperty("isMonotonic"))
                  object.isMonotonic = message.isMonotonic;
                return object;
              }, "toObject");
              Sum.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              Sum.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Sum";
              }, "getTypeUrl");
              return Sum;
            }();
            v1.Histogram = function() {
              function Histogram(properties) {
                this.dataPoints = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(Histogram, "Histogram");
              Histogram.prototype.dataPoints = $util.emptyArray;
              Histogram.prototype.aggregationTemporality = null;
              Histogram.create = /* @__PURE__ */ __name(function create(properties) {
                return new Histogram(properties);
              }, "create");
              Histogram.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.dataPoints != null && message.dataPoints.length)
                  for (var i = 0; i < message.dataPoints.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.HistogramDataPoint.encode(message.dataPoints[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                if (message.aggregationTemporality != null && Object.hasOwnProperty.call(message, "aggregationTemporality"))
                  writer.uint32(
                    /* id 2, wireType 0 =*/
                    16
                  ).int32(message.aggregationTemporality);
                return writer;
              }, "encode");
              Histogram.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              Histogram.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Histogram();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.dataPoints && message.dataPoints.length))
                        message.dataPoints = [];
                      message.dataPoints.push($root.opentelemetry.proto.metrics.v1.HistogramDataPoint.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.aggregationTemporality = reader.int32();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              Histogram.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              Histogram.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                  if (!Array.isArray(message.dataPoints))
                    return "dataPoints: array expected";
                  for (var i = 0; i < message.dataPoints.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.HistogramDataPoint.verify(message.dataPoints[i]);
                    if (error)
                      return "dataPoints." + error;
                  }
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  switch (message.aggregationTemporality) {
                    default:
                      return "aggregationTemporality: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                      break;
                  }
                return null;
              }, "verify");
              Histogram.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.Histogram)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.Histogram();
                if (object.dataPoints) {
                  if (!Array.isArray(object.dataPoints))
                    throw TypeError(".opentelemetry.proto.metrics.v1.Histogram.dataPoints: array expected");
                  message.dataPoints = [];
                  for (var i = 0; i < object.dataPoints.length; ++i) {
                    if (typeof object.dataPoints[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Histogram.dataPoints: object expected");
                    message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.HistogramDataPoint.fromObject(object.dataPoints[i]);
                  }
                }
                switch (object.aggregationTemporality) {
                  default:
                    if (typeof object.aggregationTemporality === "number") {
                      message.aggregationTemporality = object.aggregationTemporality;
                      break;
                    }
                    break;
                  case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                  case 0:
                    message.aggregationTemporality = 0;
                    break;
                  case "AGGREGATION_TEMPORALITY_DELTA":
                  case 1:
                    message.aggregationTemporality = 1;
                    break;
                  case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                  case 2:
                    message.aggregationTemporality = 2;
                    break;
                }
                return message;
              }, "fromObject");
              Histogram.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.dataPoints = [];
                if (options3.defaults)
                  object.aggregationTemporality = options3.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.HistogramDataPoint.toObject(message.dataPoints[j], options3);
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  object.aggregationTemporality = options3.enums === String ? $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] === void 0 ? message.aggregationTemporality : $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] : message.aggregationTemporality;
                return object;
              }, "toObject");
              Histogram.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              Histogram.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Histogram";
              }, "getTypeUrl");
              return Histogram;
            }();
            v1.ExponentialHistogram = function() {
              function ExponentialHistogram(properties) {
                this.dataPoints = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(ExponentialHistogram, "ExponentialHistogram");
              ExponentialHistogram.prototype.dataPoints = $util.emptyArray;
              ExponentialHistogram.prototype.aggregationTemporality = null;
              ExponentialHistogram.create = /* @__PURE__ */ __name(function create(properties) {
                return new ExponentialHistogram(properties);
              }, "create");
              ExponentialHistogram.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.dataPoints != null && message.dataPoints.length)
                  for (var i = 0; i < message.dataPoints.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.encode(message.dataPoints[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                if (message.aggregationTemporality != null && Object.hasOwnProperty.call(message, "aggregationTemporality"))
                  writer.uint32(
                    /* id 2, wireType 0 =*/
                    16
                  ).int32(message.aggregationTemporality);
                return writer;
              }, "encode");
              ExponentialHistogram.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              ExponentialHistogram.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogram();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.dataPoints && message.dataPoints.length))
                        message.dataPoints = [];
                      message.dataPoints.push($root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.aggregationTemporality = reader.int32();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              ExponentialHistogram.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              ExponentialHistogram.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                  if (!Array.isArray(message.dataPoints))
                    return "dataPoints: array expected";
                  for (var i = 0; i < message.dataPoints.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.verify(message.dataPoints[i]);
                    if (error)
                      return "dataPoints." + error;
                  }
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  switch (message.aggregationTemporality) {
                    default:
                      return "aggregationTemporality: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                      break;
                  }
                return null;
              }, "verify");
              ExponentialHistogram.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.ExponentialHistogram)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogram();
                if (object.dataPoints) {
                  if (!Array.isArray(object.dataPoints))
                    throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogram.dataPoints: array expected");
                  message.dataPoints = [];
                  for (var i = 0; i < object.dataPoints.length; ++i) {
                    if (typeof object.dataPoints[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogram.dataPoints: object expected");
                    message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.fromObject(object.dataPoints[i]);
                  }
                }
                switch (object.aggregationTemporality) {
                  default:
                    if (typeof object.aggregationTemporality === "number") {
                      message.aggregationTemporality = object.aggregationTemporality;
                      break;
                    }
                    break;
                  case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                  case 0:
                    message.aggregationTemporality = 0;
                    break;
                  case "AGGREGATION_TEMPORALITY_DELTA":
                  case 1:
                    message.aggregationTemporality = 1;
                    break;
                  case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                  case 2:
                    message.aggregationTemporality = 2;
                    break;
                }
                return message;
              }, "fromObject");
              ExponentialHistogram.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.dataPoints = [];
                if (options3.defaults)
                  object.aggregationTemporality = options3.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.toObject(message.dataPoints[j], options3);
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  object.aggregationTemporality = options3.enums === String ? $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] === void 0 ? message.aggregationTemporality : $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] : message.aggregationTemporality;
                return object;
              }, "toObject");
              ExponentialHistogram.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              ExponentialHistogram.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ExponentialHistogram";
              }, "getTypeUrl");
              return ExponentialHistogram;
            }();
            v1.Summary = function() {
              function Summary(properties) {
                this.dataPoints = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(Summary, "Summary");
              Summary.prototype.dataPoints = $util.emptyArray;
              Summary.create = /* @__PURE__ */ __name(function create(properties) {
                return new Summary(properties);
              }, "create");
              Summary.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.dataPoints != null && message.dataPoints.length)
                  for (var i = 0; i < message.dataPoints.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.encode(message.dataPoints[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              }, "encode");
              Summary.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              Summary.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Summary();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.dataPoints && message.dataPoints.length))
                        message.dataPoints = [];
                      message.dataPoints.push($root.opentelemetry.proto.metrics.v1.SummaryDataPoint.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              Summary.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              Summary.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                  if (!Array.isArray(message.dataPoints))
                    return "dataPoints: array expected";
                  for (var i = 0; i < message.dataPoints.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.verify(message.dataPoints[i]);
                    if (error)
                      return "dataPoints." + error;
                  }
                }
                return null;
              }, "verify");
              Summary.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.Summary)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.Summary();
                if (object.dataPoints) {
                  if (!Array.isArray(object.dataPoints))
                    throw TypeError(".opentelemetry.proto.metrics.v1.Summary.dataPoints: array expected");
                  message.dataPoints = [];
                  for (var i = 0; i < object.dataPoints.length; ++i) {
                    if (typeof object.dataPoints[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Summary.dataPoints: object expected");
                    message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.fromObject(object.dataPoints[i]);
                  }
                }
                return message;
              }, "fromObject");
              Summary.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.dataPoints = [];
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.toObject(message.dataPoints[j], options3);
                }
                return object;
              }, "toObject");
              Summary.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              Summary.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Summary";
              }, "getTypeUrl");
              return Summary;
            }();
            v1.AggregationTemporality = function() {
              var valuesById = {}, values = Object.create(valuesById);
              values[valuesById[0] = "AGGREGATION_TEMPORALITY_UNSPECIFIED"] = 0;
              values[valuesById[1] = "AGGREGATION_TEMPORALITY_DELTA"] = 1;
              values[valuesById[2] = "AGGREGATION_TEMPORALITY_CUMULATIVE"] = 2;
              return values;
            }();
            v1.DataPointFlags = function() {
              var valuesById = {}, values = Object.create(valuesById);
              values[valuesById[0] = "DATA_POINT_FLAGS_DO_NOT_USE"] = 0;
              values[valuesById[1] = "DATA_POINT_FLAGS_NO_RECORDED_VALUE_MASK"] = 1;
              return values;
            }();
            v1.NumberDataPoint = function() {
              function NumberDataPoint(properties) {
                this.attributes = [];
                this.exemplars = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(NumberDataPoint, "NumberDataPoint");
              NumberDataPoint.prototype.attributes = $util.emptyArray;
              NumberDataPoint.prototype.startTimeUnixNano = null;
              NumberDataPoint.prototype.timeUnixNano = null;
              NumberDataPoint.prototype.asDouble = null;
              NumberDataPoint.prototype.asInt = null;
              NumberDataPoint.prototype.exemplars = $util.emptyArray;
              NumberDataPoint.prototype.flags = null;
              var $oneOfFields;
              Object.defineProperty(NumberDataPoint.prototype, "value", {
                get: $util.oneOfGetter($oneOfFields = ["asDouble", "asInt"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              NumberDataPoint.create = /* @__PURE__ */ __name(function create(properties) {
                return new NumberDataPoint(properties);
              }, "create");
              NumberDataPoint.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                  writer.uint32(
                    /* id 2, wireType 1 =*/
                    17
                  ).fixed64(message.startTimeUnixNano);
                if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                  writer.uint32(
                    /* id 3, wireType 1 =*/
                    25
                  ).fixed64(message.timeUnixNano);
                if (message.asDouble != null && Object.hasOwnProperty.call(message, "asDouble"))
                  writer.uint32(
                    /* id 4, wireType 1 =*/
                    33
                  ).double(message.asDouble);
                if (message.exemplars != null && message.exemplars.length)
                  for (var i = 0; i < message.exemplars.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.Exemplar.encode(message.exemplars[i], writer.uint32(
                      /* id 5, wireType 2 =*/
                      42
                    ).fork()).ldelim();
                if (message.asInt != null && Object.hasOwnProperty.call(message, "asInt"))
                  writer.uint32(
                    /* id 6, wireType 1 =*/
                    49
                  ).sfixed64(message.asInt);
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 7, wireType 2 =*/
                      58
                    ).fork()).ldelim();
                if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                  writer.uint32(
                    /* id 8, wireType 0 =*/
                    64
                  ).uint32(message.flags);
                return writer;
              }, "encode");
              NumberDataPoint.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              NumberDataPoint.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.NumberDataPoint();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 7: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.startTimeUnixNano = reader.fixed64();
                      break;
                    }
                    case 3: {
                      message.timeUnixNano = reader.fixed64();
                      break;
                    }
                    case 4: {
                      message.asDouble = reader.double();
                      break;
                    }
                    case 6: {
                      message.asInt = reader.sfixed64();
                      break;
                    }
                    case 5: {
                      if (!(message.exemplars && message.exemplars.length))
                        message.exemplars = [];
                      message.exemplars.push($root.opentelemetry.proto.metrics.v1.Exemplar.decode(reader, reader.uint32()));
                      break;
                    }
                    case 8: {
                      message.flags = reader.uint32();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              NumberDataPoint.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              NumberDataPoint.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                var properties = {};
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                  if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                    return "startTimeUnixNano: integer|Long expected";
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                  if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                    return "timeUnixNano: integer|Long expected";
                }
                if (message.asDouble != null && message.hasOwnProperty("asDouble")) {
                  properties.value = 1;
                  if (typeof message.asDouble !== "number")
                    return "asDouble: number expected";
                }
                if (message.asInt != null && message.hasOwnProperty("asInt")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  if (!$util.isInteger(message.asInt) && !(message.asInt && $util.isInteger(message.asInt.low) && $util.isInteger(message.asInt.high)))
                    return "asInt: integer|Long expected";
                }
                if (message.exemplars != null && message.hasOwnProperty("exemplars")) {
                  if (!Array.isArray(message.exemplars))
                    return "exemplars: array expected";
                  for (var i = 0; i < message.exemplars.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.Exemplar.verify(message.exemplars[i]);
                    if (error)
                      return "exemplars." + error;
                  }
                }
                if (message.flags != null && message.hasOwnProperty("flags")) {
                  if (!$util.isInteger(message.flags))
                    return "flags: integer expected";
                }
                return null;
              }, "verify");
              NumberDataPoint.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.NumberDataPoint)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.NumberDataPoint();
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.startTimeUnixNano != null) {
                  if ($util.Long)
                    (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                  else if (typeof object.startTimeUnixNano === "string")
                    message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                  else if (typeof object.startTimeUnixNano === "number")
                    message.startTimeUnixNano = object.startTimeUnixNano;
                  else if (typeof object.startTimeUnixNano === "object")
                    message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                }
                if (object.timeUnixNano != null) {
                  if ($util.Long)
                    (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                  else if (typeof object.timeUnixNano === "string")
                    message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                  else if (typeof object.timeUnixNano === "number")
                    message.timeUnixNano = object.timeUnixNano;
                  else if (typeof object.timeUnixNano === "object")
                    message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                }
                if (object.asDouble != null)
                  message.asDouble = Number(object.asDouble);
                if (object.asInt != null) {
                  if ($util.Long)
                    (message.asInt = $util.Long.fromValue(object.asInt)).unsigned = false;
                  else if (typeof object.asInt === "string")
                    message.asInt = parseInt(object.asInt, 10);
                  else if (typeof object.asInt === "number")
                    message.asInt = object.asInt;
                  else if (typeof object.asInt === "object")
                    message.asInt = new $util.LongBits(object.asInt.low >>> 0, object.asInt.high >>> 0).toNumber();
                }
                if (object.exemplars) {
                  if (!Array.isArray(object.exemplars))
                    throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.exemplars: array expected");
                  message.exemplars = [];
                  for (var i = 0; i < object.exemplars.length; ++i) {
                    if (typeof object.exemplars[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.exemplars: object expected");
                    message.exemplars[i] = $root.opentelemetry.proto.metrics.v1.Exemplar.fromObject(object.exemplars[i]);
                  }
                }
                if (object.flags != null)
                  message.flags = object.flags >>> 0;
                return message;
              }, "fromObject");
              NumberDataPoint.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults) {
                  object.exemplars = [];
                  object.attributes = [];
                }
                if (options3.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options3.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options3.longs === String ? "0" : 0;
                  object.flags = 0;
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options3.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options3.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options3.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options3.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options3.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options3.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.asDouble != null && message.hasOwnProperty("asDouble")) {
                  object.asDouble = options3.json && !isFinite(message.asDouble) ? String(message.asDouble) : message.asDouble;
                  if (options3.oneofs)
                    object.value = "asDouble";
                }
                if (message.exemplars && message.exemplars.length) {
                  object.exemplars = [];
                  for (var j = 0; j < message.exemplars.length; ++j)
                    object.exemplars[j] = $root.opentelemetry.proto.metrics.v1.Exemplar.toObject(message.exemplars[j], options3);
                }
                if (message.asInt != null && message.hasOwnProperty("asInt")) {
                  if (typeof message.asInt === "number")
                    object.asInt = options3.longs === String ? String(message.asInt) : message.asInt;
                  else
                    object.asInt = options3.longs === String ? $util.Long.prototype.toString.call(message.asInt) : options3.longs === Number ? new $util.LongBits(message.asInt.low >>> 0, message.asInt.high >>> 0).toNumber() : message.asInt;
                  if (options3.oneofs)
                    object.value = "asInt";
                }
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options3);
                }
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                return object;
              }, "toObject");
              NumberDataPoint.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              NumberDataPoint.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.NumberDataPoint";
              }, "getTypeUrl");
              return NumberDataPoint;
            }();
            v1.HistogramDataPoint = function() {
              function HistogramDataPoint(properties) {
                this.attributes = [];
                this.bucketCounts = [];
                this.explicitBounds = [];
                this.exemplars = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(HistogramDataPoint, "HistogramDataPoint");
              HistogramDataPoint.prototype.attributes = $util.emptyArray;
              HistogramDataPoint.prototype.startTimeUnixNano = null;
              HistogramDataPoint.prototype.timeUnixNano = null;
              HistogramDataPoint.prototype.count = null;
              HistogramDataPoint.prototype.sum = null;
              HistogramDataPoint.prototype.bucketCounts = $util.emptyArray;
              HistogramDataPoint.prototype.explicitBounds = $util.emptyArray;
              HistogramDataPoint.prototype.exemplars = $util.emptyArray;
              HistogramDataPoint.prototype.flags = null;
              HistogramDataPoint.prototype.min = null;
              HistogramDataPoint.prototype.max = null;
              var $oneOfFields;
              Object.defineProperty(HistogramDataPoint.prototype, "_sum", {
                get: $util.oneOfGetter($oneOfFields = ["sum"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              Object.defineProperty(HistogramDataPoint.prototype, "_min", {
                get: $util.oneOfGetter($oneOfFields = ["min"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              Object.defineProperty(HistogramDataPoint.prototype, "_max", {
                get: $util.oneOfGetter($oneOfFields = ["max"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              HistogramDataPoint.create = /* @__PURE__ */ __name(function create(properties) {
                return new HistogramDataPoint(properties);
              }, "create");
              HistogramDataPoint.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                  writer.uint32(
                    /* id 2, wireType 1 =*/
                    17
                  ).fixed64(message.startTimeUnixNano);
                if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                  writer.uint32(
                    /* id 3, wireType 1 =*/
                    25
                  ).fixed64(message.timeUnixNano);
                if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                  writer.uint32(
                    /* id 4, wireType 1 =*/
                    33
                  ).fixed64(message.count);
                if (message.sum != null && Object.hasOwnProperty.call(message, "sum"))
                  writer.uint32(
                    /* id 5, wireType 1 =*/
                    41
                  ).double(message.sum);
                if (message.bucketCounts != null && message.bucketCounts.length) {
                  writer.uint32(
                    /* id 6, wireType 2 =*/
                    50
                  ).fork();
                  for (var i = 0; i < message.bucketCounts.length; ++i)
                    writer.fixed64(message.bucketCounts[i]);
                  writer.ldelim();
                }
                if (message.explicitBounds != null && message.explicitBounds.length) {
                  writer.uint32(
                    /* id 7, wireType 2 =*/
                    58
                  ).fork();
                  for (var i = 0; i < message.explicitBounds.length; ++i)
                    writer.double(message.explicitBounds[i]);
                  writer.ldelim();
                }
                if (message.exemplars != null && message.exemplars.length)
                  for (var i = 0; i < message.exemplars.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.Exemplar.encode(message.exemplars[i], writer.uint32(
                      /* id 8, wireType 2 =*/
                      66
                    ).fork()).ldelim();
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 9, wireType 2 =*/
                      74
                    ).fork()).ldelim();
                if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                  writer.uint32(
                    /* id 10, wireType 0 =*/
                    80
                  ).uint32(message.flags);
                if (message.min != null && Object.hasOwnProperty.call(message, "min"))
                  writer.uint32(
                    /* id 11, wireType 1 =*/
                    89
                  ).double(message.min);
                if (message.max != null && Object.hasOwnProperty.call(message, "max"))
                  writer.uint32(
                    /* id 12, wireType 1 =*/
                    97
                  ).double(message.max);
                return writer;
              }, "encode");
              HistogramDataPoint.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              HistogramDataPoint.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.HistogramDataPoint();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 9: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.startTimeUnixNano = reader.fixed64();
                      break;
                    }
                    case 3: {
                      message.timeUnixNano = reader.fixed64();
                      break;
                    }
                    case 4: {
                      message.count = reader.fixed64();
                      break;
                    }
                    case 5: {
                      message.sum = reader.double();
                      break;
                    }
                    case 6: {
                      if (!(message.bucketCounts && message.bucketCounts.length))
                        message.bucketCounts = [];
                      if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                          message.bucketCounts.push(reader.fixed64());
                      } else
                        message.bucketCounts.push(reader.fixed64());
                      break;
                    }
                    case 7: {
                      if (!(message.explicitBounds && message.explicitBounds.length))
                        message.explicitBounds = [];
                      if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                          message.explicitBounds.push(reader.double());
                      } else
                        message.explicitBounds.push(reader.double());
                      break;
                    }
                    case 8: {
                      if (!(message.exemplars && message.exemplars.length))
                        message.exemplars = [];
                      message.exemplars.push($root.opentelemetry.proto.metrics.v1.Exemplar.decode(reader, reader.uint32()));
                      break;
                    }
                    case 10: {
                      message.flags = reader.uint32();
                      break;
                    }
                    case 11: {
                      message.min = reader.double();
                      break;
                    }
                    case 12: {
                      message.max = reader.double();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              HistogramDataPoint.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              HistogramDataPoint.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                var properties = {};
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                  if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                    return "startTimeUnixNano: integer|Long expected";
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                  if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                    return "timeUnixNano: integer|Long expected";
                }
                if (message.count != null && message.hasOwnProperty("count")) {
                  if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                    return "count: integer|Long expected";
                }
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  properties._sum = 1;
                  if (typeof message.sum !== "number")
                    return "sum: number expected";
                }
                if (message.bucketCounts != null && message.hasOwnProperty("bucketCounts")) {
                  if (!Array.isArray(message.bucketCounts))
                    return "bucketCounts: array expected";
                  for (var i = 0; i < message.bucketCounts.length; ++i)
                    if (!$util.isInteger(message.bucketCounts[i]) && !(message.bucketCounts[i] && $util.isInteger(message.bucketCounts[i].low) && $util.isInteger(message.bucketCounts[i].high)))
                      return "bucketCounts: integer|Long[] expected";
                }
                if (message.explicitBounds != null && message.hasOwnProperty("explicitBounds")) {
                  if (!Array.isArray(message.explicitBounds))
                    return "explicitBounds: array expected";
                  for (var i = 0; i < message.explicitBounds.length; ++i)
                    if (typeof message.explicitBounds[i] !== "number")
                      return "explicitBounds: number[] expected";
                }
                if (message.exemplars != null && message.hasOwnProperty("exemplars")) {
                  if (!Array.isArray(message.exemplars))
                    return "exemplars: array expected";
                  for (var i = 0; i < message.exemplars.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.Exemplar.verify(message.exemplars[i]);
                    if (error)
                      return "exemplars." + error;
                  }
                }
                if (message.flags != null && message.hasOwnProperty("flags")) {
                  if (!$util.isInteger(message.flags))
                    return "flags: integer expected";
                }
                if (message.min != null && message.hasOwnProperty("min")) {
                  properties._min = 1;
                  if (typeof message.min !== "number")
                    return "min: number expected";
                }
                if (message.max != null && message.hasOwnProperty("max")) {
                  properties._max = 1;
                  if (typeof message.max !== "number")
                    return "max: number expected";
                }
                return null;
              }, "verify");
              HistogramDataPoint.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.HistogramDataPoint)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.HistogramDataPoint();
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.startTimeUnixNano != null) {
                  if ($util.Long)
                    (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                  else if (typeof object.startTimeUnixNano === "string")
                    message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                  else if (typeof object.startTimeUnixNano === "number")
                    message.startTimeUnixNano = object.startTimeUnixNano;
                  else if (typeof object.startTimeUnixNano === "object")
                    message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                }
                if (object.timeUnixNano != null) {
                  if ($util.Long)
                    (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                  else if (typeof object.timeUnixNano === "string")
                    message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                  else if (typeof object.timeUnixNano === "number")
                    message.timeUnixNano = object.timeUnixNano;
                  else if (typeof object.timeUnixNano === "object")
                    message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                }
                if (object.count != null) {
                  if ($util.Long)
                    (message.count = $util.Long.fromValue(object.count)).unsigned = false;
                  else if (typeof object.count === "string")
                    message.count = parseInt(object.count, 10);
                  else if (typeof object.count === "number")
                    message.count = object.count;
                  else if (typeof object.count === "object")
                    message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
                }
                if (object.sum != null)
                  message.sum = Number(object.sum);
                if (object.bucketCounts) {
                  if (!Array.isArray(object.bucketCounts))
                    throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.bucketCounts: array expected");
                  message.bucketCounts = [];
                  for (var i = 0; i < object.bucketCounts.length; ++i)
                    if ($util.Long)
                      (message.bucketCounts[i] = $util.Long.fromValue(object.bucketCounts[i])).unsigned = false;
                    else if (typeof object.bucketCounts[i] === "string")
                      message.bucketCounts[i] = parseInt(object.bucketCounts[i], 10);
                    else if (typeof object.bucketCounts[i] === "number")
                      message.bucketCounts[i] = object.bucketCounts[i];
                    else if (typeof object.bucketCounts[i] === "object")
                      message.bucketCounts[i] = new $util.LongBits(object.bucketCounts[i].low >>> 0, object.bucketCounts[i].high >>> 0).toNumber();
                }
                if (object.explicitBounds) {
                  if (!Array.isArray(object.explicitBounds))
                    throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.explicitBounds: array expected");
                  message.explicitBounds = [];
                  for (var i = 0; i < object.explicitBounds.length; ++i)
                    message.explicitBounds[i] = Number(object.explicitBounds[i]);
                }
                if (object.exemplars) {
                  if (!Array.isArray(object.exemplars))
                    throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.exemplars: array expected");
                  message.exemplars = [];
                  for (var i = 0; i < object.exemplars.length; ++i) {
                    if (typeof object.exemplars[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.exemplars: object expected");
                    message.exemplars[i] = $root.opentelemetry.proto.metrics.v1.Exemplar.fromObject(object.exemplars[i]);
                  }
                }
                if (object.flags != null)
                  message.flags = object.flags >>> 0;
                if (object.min != null)
                  message.min = Number(object.min);
                if (object.max != null)
                  message.max = Number(object.max);
                return message;
              }, "fromObject");
              HistogramDataPoint.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults) {
                  object.bucketCounts = [];
                  object.explicitBounds = [];
                  object.exemplars = [];
                  object.attributes = [];
                }
                if (options3.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options3.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options3.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.count = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.count = options3.longs === String ? "0" : 0;
                  object.flags = 0;
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options3.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options3.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options3.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options3.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options3.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options3.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.count != null && message.hasOwnProperty("count"))
                  if (typeof message.count === "number")
                    object.count = options3.longs === String ? String(message.count) : message.count;
                  else
                    object.count = options3.longs === String ? $util.Long.prototype.toString.call(message.count) : options3.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  object.sum = options3.json && !isFinite(message.sum) ? String(message.sum) : message.sum;
                  if (options3.oneofs)
                    object._sum = "sum";
                }
                if (message.bucketCounts && message.bucketCounts.length) {
                  object.bucketCounts = [];
                  for (var j = 0; j < message.bucketCounts.length; ++j)
                    if (typeof message.bucketCounts[j] === "number")
                      object.bucketCounts[j] = options3.longs === String ? String(message.bucketCounts[j]) : message.bucketCounts[j];
                    else
                      object.bucketCounts[j] = options3.longs === String ? $util.Long.prototype.toString.call(message.bucketCounts[j]) : options3.longs === Number ? new $util.LongBits(message.bucketCounts[j].low >>> 0, message.bucketCounts[j].high >>> 0).toNumber() : message.bucketCounts[j];
                }
                if (message.explicitBounds && message.explicitBounds.length) {
                  object.explicitBounds = [];
                  for (var j = 0; j < message.explicitBounds.length; ++j)
                    object.explicitBounds[j] = options3.json && !isFinite(message.explicitBounds[j]) ? String(message.explicitBounds[j]) : message.explicitBounds[j];
                }
                if (message.exemplars && message.exemplars.length) {
                  object.exemplars = [];
                  for (var j = 0; j < message.exemplars.length; ++j)
                    object.exemplars[j] = $root.opentelemetry.proto.metrics.v1.Exemplar.toObject(message.exemplars[j], options3);
                }
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options3);
                }
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                if (message.min != null && message.hasOwnProperty("min")) {
                  object.min = options3.json && !isFinite(message.min) ? String(message.min) : message.min;
                  if (options3.oneofs)
                    object._min = "min";
                }
                if (message.max != null && message.hasOwnProperty("max")) {
                  object.max = options3.json && !isFinite(message.max) ? String(message.max) : message.max;
                  if (options3.oneofs)
                    object._max = "max";
                }
                return object;
              }, "toObject");
              HistogramDataPoint.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              HistogramDataPoint.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.HistogramDataPoint";
              }, "getTypeUrl");
              return HistogramDataPoint;
            }();
            v1.ExponentialHistogramDataPoint = function() {
              function ExponentialHistogramDataPoint(properties) {
                this.attributes = [];
                this.exemplars = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(ExponentialHistogramDataPoint, "ExponentialHistogramDataPoint");
              ExponentialHistogramDataPoint.prototype.attributes = $util.emptyArray;
              ExponentialHistogramDataPoint.prototype.startTimeUnixNano = null;
              ExponentialHistogramDataPoint.prototype.timeUnixNano = null;
              ExponentialHistogramDataPoint.prototype.count = null;
              ExponentialHistogramDataPoint.prototype.sum = null;
              ExponentialHistogramDataPoint.prototype.scale = null;
              ExponentialHistogramDataPoint.prototype.zeroCount = null;
              ExponentialHistogramDataPoint.prototype.positive = null;
              ExponentialHistogramDataPoint.prototype.negative = null;
              ExponentialHistogramDataPoint.prototype.flags = null;
              ExponentialHistogramDataPoint.prototype.exemplars = $util.emptyArray;
              ExponentialHistogramDataPoint.prototype.min = null;
              ExponentialHistogramDataPoint.prototype.max = null;
              ExponentialHistogramDataPoint.prototype.zeroThreshold = null;
              var $oneOfFields;
              Object.defineProperty(ExponentialHistogramDataPoint.prototype, "_sum", {
                get: $util.oneOfGetter($oneOfFields = ["sum"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              Object.defineProperty(ExponentialHistogramDataPoint.prototype, "_min", {
                get: $util.oneOfGetter($oneOfFields = ["min"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              Object.defineProperty(ExponentialHistogramDataPoint.prototype, "_max", {
                get: $util.oneOfGetter($oneOfFields = ["max"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              ExponentialHistogramDataPoint.create = /* @__PURE__ */ __name(function create(properties) {
                return new ExponentialHistogramDataPoint(properties);
              }, "create");
              ExponentialHistogramDataPoint.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                  writer.uint32(
                    /* id 2, wireType 1 =*/
                    17
                  ).fixed64(message.startTimeUnixNano);
                if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                  writer.uint32(
                    /* id 3, wireType 1 =*/
                    25
                  ).fixed64(message.timeUnixNano);
                if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                  writer.uint32(
                    /* id 4, wireType 1 =*/
                    33
                  ).fixed64(message.count);
                if (message.sum != null && Object.hasOwnProperty.call(message, "sum"))
                  writer.uint32(
                    /* id 5, wireType 1 =*/
                    41
                  ).double(message.sum);
                if (message.scale != null && Object.hasOwnProperty.call(message, "scale"))
                  writer.uint32(
                    /* id 6, wireType 0 =*/
                    48
                  ).sint32(message.scale);
                if (message.zeroCount != null && Object.hasOwnProperty.call(message, "zeroCount"))
                  writer.uint32(
                    /* id 7, wireType 1 =*/
                    57
                  ).fixed64(message.zeroCount);
                if (message.positive != null && Object.hasOwnProperty.call(message, "positive"))
                  $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.encode(message.positive, writer.uint32(
                    /* id 8, wireType 2 =*/
                    66
                  ).fork()).ldelim();
                if (message.negative != null && Object.hasOwnProperty.call(message, "negative"))
                  $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.encode(message.negative, writer.uint32(
                    /* id 9, wireType 2 =*/
                    74
                  ).fork()).ldelim();
                if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                  writer.uint32(
                    /* id 10, wireType 0 =*/
                    80
                  ).uint32(message.flags);
                if (message.exemplars != null && message.exemplars.length)
                  for (var i = 0; i < message.exemplars.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.Exemplar.encode(message.exemplars[i], writer.uint32(
                      /* id 11, wireType 2 =*/
                      90
                    ).fork()).ldelim();
                if (message.min != null && Object.hasOwnProperty.call(message, "min"))
                  writer.uint32(
                    /* id 12, wireType 1 =*/
                    97
                  ).double(message.min);
                if (message.max != null && Object.hasOwnProperty.call(message, "max"))
                  writer.uint32(
                    /* id 13, wireType 1 =*/
                    105
                  ).double(message.max);
                if (message.zeroThreshold != null && Object.hasOwnProperty.call(message, "zeroThreshold"))
                  writer.uint32(
                    /* id 14, wireType 1 =*/
                    113
                  ).double(message.zeroThreshold);
                return writer;
              }, "encode");
              ExponentialHistogramDataPoint.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              ExponentialHistogramDataPoint.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.startTimeUnixNano = reader.fixed64();
                      break;
                    }
                    case 3: {
                      message.timeUnixNano = reader.fixed64();
                      break;
                    }
                    case 4: {
                      message.count = reader.fixed64();
                      break;
                    }
                    case 5: {
                      message.sum = reader.double();
                      break;
                    }
                    case 6: {
                      message.scale = reader.sint32();
                      break;
                    }
                    case 7: {
                      message.zeroCount = reader.fixed64();
                      break;
                    }
                    case 8: {
                      message.positive = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.decode(reader, reader.uint32());
                      break;
                    }
                    case 9: {
                      message.negative = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.decode(reader, reader.uint32());
                      break;
                    }
                    case 10: {
                      message.flags = reader.uint32();
                      break;
                    }
                    case 11: {
                      if (!(message.exemplars && message.exemplars.length))
                        message.exemplars = [];
                      message.exemplars.push($root.opentelemetry.proto.metrics.v1.Exemplar.decode(reader, reader.uint32()));
                      break;
                    }
                    case 12: {
                      message.min = reader.double();
                      break;
                    }
                    case 13: {
                      message.max = reader.double();
                      break;
                    }
                    case 14: {
                      message.zeroThreshold = reader.double();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              ExponentialHistogramDataPoint.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              ExponentialHistogramDataPoint.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                var properties = {};
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                  if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                    return "startTimeUnixNano: integer|Long expected";
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                  if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                    return "timeUnixNano: integer|Long expected";
                }
                if (message.count != null && message.hasOwnProperty("count")) {
                  if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                    return "count: integer|Long expected";
                }
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  properties._sum = 1;
                  if (typeof message.sum !== "number")
                    return "sum: number expected";
                }
                if (message.scale != null && message.hasOwnProperty("scale")) {
                  if (!$util.isInteger(message.scale))
                    return "scale: integer expected";
                }
                if (message.zeroCount != null && message.hasOwnProperty("zeroCount")) {
                  if (!$util.isInteger(message.zeroCount) && !(message.zeroCount && $util.isInteger(message.zeroCount.low) && $util.isInteger(message.zeroCount.high)))
                    return "zeroCount: integer|Long expected";
                }
                if (message.positive != null && message.hasOwnProperty("positive")) {
                  var error = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.verify(message.positive);
                  if (error)
                    return "positive." + error;
                }
                if (message.negative != null && message.hasOwnProperty("negative")) {
                  var error = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.verify(message.negative);
                  if (error)
                    return "negative." + error;
                }
                if (message.flags != null && message.hasOwnProperty("flags")) {
                  if (!$util.isInteger(message.flags))
                    return "flags: integer expected";
                }
                if (message.exemplars != null && message.hasOwnProperty("exemplars")) {
                  if (!Array.isArray(message.exemplars))
                    return "exemplars: array expected";
                  for (var i = 0; i < message.exemplars.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.Exemplar.verify(message.exemplars[i]);
                    if (error)
                      return "exemplars." + error;
                  }
                }
                if (message.min != null && message.hasOwnProperty("min")) {
                  properties._min = 1;
                  if (typeof message.min !== "number")
                    return "min: number expected";
                }
                if (message.max != null && message.hasOwnProperty("max")) {
                  properties._max = 1;
                  if (typeof message.max !== "number")
                    return "max: number expected";
                }
                if (message.zeroThreshold != null && message.hasOwnProperty("zeroThreshold")) {
                  if (typeof message.zeroThreshold !== "number")
                    return "zeroThreshold: number expected";
                }
                return null;
              }, "verify");
              ExponentialHistogramDataPoint.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint();
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.startTimeUnixNano != null) {
                  if ($util.Long)
                    (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                  else if (typeof object.startTimeUnixNano === "string")
                    message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                  else if (typeof object.startTimeUnixNano === "number")
                    message.startTimeUnixNano = object.startTimeUnixNano;
                  else if (typeof object.startTimeUnixNano === "object")
                    message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                }
                if (object.timeUnixNano != null) {
                  if ($util.Long)
                    (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                  else if (typeof object.timeUnixNano === "string")
                    message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                  else if (typeof object.timeUnixNano === "number")
                    message.timeUnixNano = object.timeUnixNano;
                  else if (typeof object.timeUnixNano === "object")
                    message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                }
                if (object.count != null) {
                  if ($util.Long)
                    (message.count = $util.Long.fromValue(object.count)).unsigned = false;
                  else if (typeof object.count === "string")
                    message.count = parseInt(object.count, 10);
                  else if (typeof object.count === "number")
                    message.count = object.count;
                  else if (typeof object.count === "object")
                    message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
                }
                if (object.sum != null)
                  message.sum = Number(object.sum);
                if (object.scale != null)
                  message.scale = object.scale | 0;
                if (object.zeroCount != null) {
                  if ($util.Long)
                    (message.zeroCount = $util.Long.fromValue(object.zeroCount)).unsigned = false;
                  else if (typeof object.zeroCount === "string")
                    message.zeroCount = parseInt(object.zeroCount, 10);
                  else if (typeof object.zeroCount === "number")
                    message.zeroCount = object.zeroCount;
                  else if (typeof object.zeroCount === "object")
                    message.zeroCount = new $util.LongBits(object.zeroCount.low >>> 0, object.zeroCount.high >>> 0).toNumber();
                }
                if (object.positive != null) {
                  if (typeof object.positive !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.positive: object expected");
                  message.positive = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.fromObject(object.positive);
                }
                if (object.negative != null) {
                  if (typeof object.negative !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.negative: object expected");
                  message.negative = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.fromObject(object.negative);
                }
                if (object.flags != null)
                  message.flags = object.flags >>> 0;
                if (object.exemplars) {
                  if (!Array.isArray(object.exemplars))
                    throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.exemplars: array expected");
                  message.exemplars = [];
                  for (var i = 0; i < object.exemplars.length; ++i) {
                    if (typeof object.exemplars[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.exemplars: object expected");
                    message.exemplars[i] = $root.opentelemetry.proto.metrics.v1.Exemplar.fromObject(object.exemplars[i]);
                  }
                }
                if (object.min != null)
                  message.min = Number(object.min);
                if (object.max != null)
                  message.max = Number(object.max);
                if (object.zeroThreshold != null)
                  message.zeroThreshold = Number(object.zeroThreshold);
                return message;
              }, "fromObject");
              ExponentialHistogramDataPoint.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults) {
                  object.attributes = [];
                  object.exemplars = [];
                }
                if (options3.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options3.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options3.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.count = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.count = options3.longs === String ? "0" : 0;
                  object.scale = 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.zeroCount = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.zeroCount = options3.longs === String ? "0" : 0;
                  object.positive = null;
                  object.negative = null;
                  object.flags = 0;
                  object.zeroThreshold = 0;
                }
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options3);
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options3.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options3.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options3.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options3.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options3.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options3.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.count != null && message.hasOwnProperty("count"))
                  if (typeof message.count === "number")
                    object.count = options3.longs === String ? String(message.count) : message.count;
                  else
                    object.count = options3.longs === String ? $util.Long.prototype.toString.call(message.count) : options3.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  object.sum = options3.json && !isFinite(message.sum) ? String(message.sum) : message.sum;
                  if (options3.oneofs)
                    object._sum = "sum";
                }
                if (message.scale != null && message.hasOwnProperty("scale"))
                  object.scale = message.scale;
                if (message.zeroCount != null && message.hasOwnProperty("zeroCount"))
                  if (typeof message.zeroCount === "number")
                    object.zeroCount = options3.longs === String ? String(message.zeroCount) : message.zeroCount;
                  else
                    object.zeroCount = options3.longs === String ? $util.Long.prototype.toString.call(message.zeroCount) : options3.longs === Number ? new $util.LongBits(message.zeroCount.low >>> 0, message.zeroCount.high >>> 0).toNumber() : message.zeroCount;
                if (message.positive != null && message.hasOwnProperty("positive"))
                  object.positive = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.toObject(message.positive, options3);
                if (message.negative != null && message.hasOwnProperty("negative"))
                  object.negative = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.toObject(message.negative, options3);
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                if (message.exemplars && message.exemplars.length) {
                  object.exemplars = [];
                  for (var j = 0; j < message.exemplars.length; ++j)
                    object.exemplars[j] = $root.opentelemetry.proto.metrics.v1.Exemplar.toObject(message.exemplars[j], options3);
                }
                if (message.min != null && message.hasOwnProperty("min")) {
                  object.min = options3.json && !isFinite(message.min) ? String(message.min) : message.min;
                  if (options3.oneofs)
                    object._min = "min";
                }
                if (message.max != null && message.hasOwnProperty("max")) {
                  object.max = options3.json && !isFinite(message.max) ? String(message.max) : message.max;
                  if (options3.oneofs)
                    object._max = "max";
                }
                if (message.zeroThreshold != null && message.hasOwnProperty("zeroThreshold"))
                  object.zeroThreshold = options3.json && !isFinite(message.zeroThreshold) ? String(message.zeroThreshold) : message.zeroThreshold;
                return object;
              }, "toObject");
              ExponentialHistogramDataPoint.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              ExponentialHistogramDataPoint.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint";
              }, "getTypeUrl");
              ExponentialHistogramDataPoint.Buckets = function() {
                function Buckets(properties) {
                  this.bucketCounts = [];
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                __name(Buckets, "Buckets");
                Buckets.prototype.offset = null;
                Buckets.prototype.bucketCounts = $util.emptyArray;
                Buckets.create = /* @__PURE__ */ __name(function create(properties) {
                  return new Buckets(properties);
                }, "create");
                Buckets.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.offset != null && Object.hasOwnProperty.call(message, "offset"))
                    writer.uint32(
                      /* id 1, wireType 0 =*/
                      8
                    ).sint32(message.offset);
                  if (message.bucketCounts != null && message.bucketCounts.length) {
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork();
                    for (var i = 0; i < message.bucketCounts.length; ++i)
                      writer.uint64(message.bucketCounts[i]);
                    writer.ldelim();
                  }
                  return writer;
                }, "encode");
                Buckets.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                }, "encodeDelimited");
                Buckets.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.offset = reader.sint32();
                        break;
                      }
                      case 2: {
                        if (!(message.bucketCounts && message.bucketCounts.length))
                          message.bucketCounts = [];
                        if ((tag & 7) === 2) {
                          var end2 = reader.uint32() + reader.pos;
                          while (reader.pos < end2)
                            message.bucketCounts.push(reader.uint64());
                        } else
                          message.bucketCounts.push(reader.uint64());
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                }, "decode");
                Buckets.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                }, "decodeDelimited");
                Buckets.verify = /* @__PURE__ */ __name(function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.offset != null && message.hasOwnProperty("offset")) {
                    if (!$util.isInteger(message.offset))
                      return "offset: integer expected";
                  }
                  if (message.bucketCounts != null && message.hasOwnProperty("bucketCounts")) {
                    if (!Array.isArray(message.bucketCounts))
                      return "bucketCounts: array expected";
                    for (var i = 0; i < message.bucketCounts.length; ++i)
                      if (!$util.isInteger(message.bucketCounts[i]) && !(message.bucketCounts[i] && $util.isInteger(message.bucketCounts[i].low) && $util.isInteger(message.bucketCounts[i].high)))
                        return "bucketCounts: integer|Long[] expected";
                  }
                  return null;
                }, "verify");
                Buckets.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets();
                  if (object.offset != null)
                    message.offset = object.offset | 0;
                  if (object.bucketCounts) {
                    if (!Array.isArray(object.bucketCounts))
                      throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.bucketCounts: array expected");
                    message.bucketCounts = [];
                    for (var i = 0; i < object.bucketCounts.length; ++i)
                      if ($util.Long)
                        (message.bucketCounts[i] = $util.Long.fromValue(object.bucketCounts[i])).unsigned = true;
                      else if (typeof object.bucketCounts[i] === "string")
                        message.bucketCounts[i] = parseInt(object.bucketCounts[i], 10);
                      else if (typeof object.bucketCounts[i] === "number")
                        message.bucketCounts[i] = object.bucketCounts[i];
                      else if (typeof object.bucketCounts[i] === "object")
                        message.bucketCounts[i] = new $util.LongBits(object.bucketCounts[i].low >>> 0, object.bucketCounts[i].high >>> 0).toNumber(true);
                  }
                  return message;
                }, "fromObject");
                Buckets.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                  if (!options3)
                    options3 = {};
                  var object = {};
                  if (options3.arrays || options3.defaults)
                    object.bucketCounts = [];
                  if (options3.defaults)
                    object.offset = 0;
                  if (message.offset != null && message.hasOwnProperty("offset"))
                    object.offset = message.offset;
                  if (message.bucketCounts && message.bucketCounts.length) {
                    object.bucketCounts = [];
                    for (var j = 0; j < message.bucketCounts.length; ++j)
                      if (typeof message.bucketCounts[j] === "number")
                        object.bucketCounts[j] = options3.longs === String ? String(message.bucketCounts[j]) : message.bucketCounts[j];
                      else
                        object.bucketCounts[j] = options3.longs === String ? $util.Long.prototype.toString.call(message.bucketCounts[j]) : options3.longs === Number ? new $util.LongBits(message.bucketCounts[j].low >>> 0, message.bucketCounts[j].high >>> 0).toNumber(true) : message.bucketCounts[j];
                  }
                  return object;
                }, "toObject");
                Buckets.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                }, "toJSON");
                Buckets.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets";
                }, "getTypeUrl");
                return Buckets;
              }();
              return ExponentialHistogramDataPoint;
            }();
            v1.SummaryDataPoint = function() {
              function SummaryDataPoint(properties) {
                this.attributes = [];
                this.quantileValues = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(SummaryDataPoint, "SummaryDataPoint");
              SummaryDataPoint.prototype.attributes = $util.emptyArray;
              SummaryDataPoint.prototype.startTimeUnixNano = null;
              SummaryDataPoint.prototype.timeUnixNano = null;
              SummaryDataPoint.prototype.count = null;
              SummaryDataPoint.prototype.sum = null;
              SummaryDataPoint.prototype.quantileValues = $util.emptyArray;
              SummaryDataPoint.prototype.flags = null;
              SummaryDataPoint.create = /* @__PURE__ */ __name(function create(properties) {
                return new SummaryDataPoint(properties);
              }, "create");
              SummaryDataPoint.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                  writer.uint32(
                    /* id 2, wireType 1 =*/
                    17
                  ).fixed64(message.startTimeUnixNano);
                if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                  writer.uint32(
                    /* id 3, wireType 1 =*/
                    25
                  ).fixed64(message.timeUnixNano);
                if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                  writer.uint32(
                    /* id 4, wireType 1 =*/
                    33
                  ).fixed64(message.count);
                if (message.sum != null && Object.hasOwnProperty.call(message, "sum"))
                  writer.uint32(
                    /* id 5, wireType 1 =*/
                    41
                  ).double(message.sum);
                if (message.quantileValues != null && message.quantileValues.length)
                  for (var i = 0; i < message.quantileValues.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.encode(message.quantileValues[i], writer.uint32(
                      /* id 6, wireType 2 =*/
                      50
                    ).fork()).ldelim();
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 7, wireType 2 =*/
                      58
                    ).fork()).ldelim();
                if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                  writer.uint32(
                    /* id 8, wireType 0 =*/
                    64
                  ).uint32(message.flags);
                return writer;
              }, "encode");
              SummaryDataPoint.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              SummaryDataPoint.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.SummaryDataPoint();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 7: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.startTimeUnixNano = reader.fixed64();
                      break;
                    }
                    case 3: {
                      message.timeUnixNano = reader.fixed64();
                      break;
                    }
                    case 4: {
                      message.count = reader.fixed64();
                      break;
                    }
                    case 5: {
                      message.sum = reader.double();
                      break;
                    }
                    case 6: {
                      if (!(message.quantileValues && message.quantileValues.length))
                        message.quantileValues = [];
                      message.quantileValues.push($root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.decode(reader, reader.uint32()));
                      break;
                    }
                    case 8: {
                      message.flags = reader.uint32();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              SummaryDataPoint.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              SummaryDataPoint.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                  if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                    return "startTimeUnixNano: integer|Long expected";
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                  if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                    return "timeUnixNano: integer|Long expected";
                }
                if (message.count != null && message.hasOwnProperty("count")) {
                  if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                    return "count: integer|Long expected";
                }
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  if (typeof message.sum !== "number")
                    return "sum: number expected";
                }
                if (message.quantileValues != null && message.hasOwnProperty("quantileValues")) {
                  if (!Array.isArray(message.quantileValues))
                    return "quantileValues: array expected";
                  for (var i = 0; i < message.quantileValues.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.verify(message.quantileValues[i]);
                    if (error)
                      return "quantileValues." + error;
                  }
                }
                if (message.flags != null && message.hasOwnProperty("flags")) {
                  if (!$util.isInteger(message.flags))
                    return "flags: integer expected";
                }
                return null;
              }, "verify");
              SummaryDataPoint.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.SummaryDataPoint)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.SummaryDataPoint();
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.startTimeUnixNano != null) {
                  if ($util.Long)
                    (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                  else if (typeof object.startTimeUnixNano === "string")
                    message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                  else if (typeof object.startTimeUnixNano === "number")
                    message.startTimeUnixNano = object.startTimeUnixNano;
                  else if (typeof object.startTimeUnixNano === "object")
                    message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                }
                if (object.timeUnixNano != null) {
                  if ($util.Long)
                    (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                  else if (typeof object.timeUnixNano === "string")
                    message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                  else if (typeof object.timeUnixNano === "number")
                    message.timeUnixNano = object.timeUnixNano;
                  else if (typeof object.timeUnixNano === "object")
                    message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                }
                if (object.count != null) {
                  if ($util.Long)
                    (message.count = $util.Long.fromValue(object.count)).unsigned = false;
                  else if (typeof object.count === "string")
                    message.count = parseInt(object.count, 10);
                  else if (typeof object.count === "number")
                    message.count = object.count;
                  else if (typeof object.count === "object")
                    message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
                }
                if (object.sum != null)
                  message.sum = Number(object.sum);
                if (object.quantileValues) {
                  if (!Array.isArray(object.quantileValues))
                    throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.quantileValues: array expected");
                  message.quantileValues = [];
                  for (var i = 0; i < object.quantileValues.length; ++i) {
                    if (typeof object.quantileValues[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.quantileValues: object expected");
                    message.quantileValues[i] = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.fromObject(object.quantileValues[i]);
                  }
                }
                if (object.flags != null)
                  message.flags = object.flags >>> 0;
                return message;
              }, "fromObject");
              SummaryDataPoint.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults) {
                  object.quantileValues = [];
                  object.attributes = [];
                }
                if (options3.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options3.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options3.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.count = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.count = options3.longs === String ? "0" : 0;
                  object.sum = 0;
                  object.flags = 0;
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options3.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options3.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options3.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options3.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options3.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options3.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.count != null && message.hasOwnProperty("count"))
                  if (typeof message.count === "number")
                    object.count = options3.longs === String ? String(message.count) : message.count;
                  else
                    object.count = options3.longs === String ? $util.Long.prototype.toString.call(message.count) : options3.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
                if (message.sum != null && message.hasOwnProperty("sum"))
                  object.sum = options3.json && !isFinite(message.sum) ? String(message.sum) : message.sum;
                if (message.quantileValues && message.quantileValues.length) {
                  object.quantileValues = [];
                  for (var j = 0; j < message.quantileValues.length; ++j)
                    object.quantileValues[j] = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.toObject(message.quantileValues[j], options3);
                }
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options3);
                }
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                return object;
              }, "toObject");
              SummaryDataPoint.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              SummaryDataPoint.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.SummaryDataPoint";
              }, "getTypeUrl");
              SummaryDataPoint.ValueAtQuantile = function() {
                function ValueAtQuantile(properties) {
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                __name(ValueAtQuantile, "ValueAtQuantile");
                ValueAtQuantile.prototype.quantile = null;
                ValueAtQuantile.prototype.value = null;
                ValueAtQuantile.create = /* @__PURE__ */ __name(function create(properties) {
                  return new ValueAtQuantile(properties);
                }, "create");
                ValueAtQuantile.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.quantile != null && Object.hasOwnProperty.call(message, "quantile"))
                    writer.uint32(
                      /* id 1, wireType 1 =*/
                      9
                    ).double(message.quantile);
                  if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(
                      /* id 2, wireType 1 =*/
                      17
                    ).double(message.value);
                  return writer;
                }, "encode");
                ValueAtQuantile.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                }, "encodeDelimited");
                ValueAtQuantile.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.quantile = reader.double();
                        break;
                      }
                      case 2: {
                        message.value = reader.double();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                }, "decode");
                ValueAtQuantile.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                }, "decodeDelimited");
                ValueAtQuantile.verify = /* @__PURE__ */ __name(function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.quantile != null && message.hasOwnProperty("quantile")) {
                    if (typeof message.quantile !== "number")
                      return "quantile: number expected";
                  }
                  if (message.value != null && message.hasOwnProperty("value")) {
                    if (typeof message.value !== "number")
                      return "value: number expected";
                  }
                  return null;
                }, "verify");
                ValueAtQuantile.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile();
                  if (object.quantile != null)
                    message.quantile = Number(object.quantile);
                  if (object.value != null)
                    message.value = Number(object.value);
                  return message;
                }, "fromObject");
                ValueAtQuantile.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                  if (!options3)
                    options3 = {};
                  var object = {};
                  if (options3.defaults) {
                    object.quantile = 0;
                    object.value = 0;
                  }
                  if (message.quantile != null && message.hasOwnProperty("quantile"))
                    object.quantile = options3.json && !isFinite(message.quantile) ? String(message.quantile) : message.quantile;
                  if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options3.json && !isFinite(message.value) ? String(message.value) : message.value;
                  return object;
                }, "toObject");
                ValueAtQuantile.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                }, "toJSON");
                ValueAtQuantile.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile";
                }, "getTypeUrl");
                return ValueAtQuantile;
              }();
              return SummaryDataPoint;
            }();
            v1.Exemplar = function() {
              function Exemplar(properties) {
                this.filteredAttributes = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(Exemplar, "Exemplar");
              Exemplar.prototype.filteredAttributes = $util.emptyArray;
              Exemplar.prototype.timeUnixNano = null;
              Exemplar.prototype.asDouble = null;
              Exemplar.prototype.asInt = null;
              Exemplar.prototype.spanId = null;
              Exemplar.prototype.traceId = null;
              var $oneOfFields;
              Object.defineProperty(Exemplar.prototype, "value", {
                get: $util.oneOfGetter($oneOfFields = ["asDouble", "asInt"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              Exemplar.create = /* @__PURE__ */ __name(function create(properties) {
                return new Exemplar(properties);
              }, "create");
              Exemplar.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                  writer.uint32(
                    /* id 2, wireType 1 =*/
                    17
                  ).fixed64(message.timeUnixNano);
                if (message.asDouble != null && Object.hasOwnProperty.call(message, "asDouble"))
                  writer.uint32(
                    /* id 3, wireType 1 =*/
                    25
                  ).double(message.asDouble);
                if (message.spanId != null && Object.hasOwnProperty.call(message, "spanId"))
                  writer.uint32(
                    /* id 4, wireType 2 =*/
                    34
                  ).bytes(message.spanId);
                if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                  writer.uint32(
                    /* id 5, wireType 2 =*/
                    42
                  ).bytes(message.traceId);
                if (message.asInt != null && Object.hasOwnProperty.call(message, "asInt"))
                  writer.uint32(
                    /* id 6, wireType 1 =*/
                    49
                  ).sfixed64(message.asInt);
                if (message.filteredAttributes != null && message.filteredAttributes.length)
                  for (var i = 0; i < message.filteredAttributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.filteredAttributes[i], writer.uint32(
                      /* id 7, wireType 2 =*/
                      58
                    ).fork()).ldelim();
                return writer;
              }, "encode");
              Exemplar.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              Exemplar.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Exemplar();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 7: {
                      if (!(message.filteredAttributes && message.filteredAttributes.length))
                        message.filteredAttributes = [];
                      message.filteredAttributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.timeUnixNano = reader.fixed64();
                      break;
                    }
                    case 3: {
                      message.asDouble = reader.double();
                      break;
                    }
                    case 6: {
                      message.asInt = reader.sfixed64();
                      break;
                    }
                    case 4: {
                      message.spanId = reader.bytes();
                      break;
                    }
                    case 5: {
                      message.traceId = reader.bytes();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              Exemplar.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              Exemplar.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                var properties = {};
                if (message.filteredAttributes != null && message.hasOwnProperty("filteredAttributes")) {
                  if (!Array.isArray(message.filteredAttributes))
                    return "filteredAttributes: array expected";
                  for (var i = 0; i < message.filteredAttributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.filteredAttributes[i]);
                    if (error)
                      return "filteredAttributes." + error;
                  }
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                  if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                    return "timeUnixNano: integer|Long expected";
                }
                if (message.asDouble != null && message.hasOwnProperty("asDouble")) {
                  properties.value = 1;
                  if (typeof message.asDouble !== "number")
                    return "asDouble: number expected";
                }
                if (message.asInt != null && message.hasOwnProperty("asInt")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  if (!$util.isInteger(message.asInt) && !(message.asInt && $util.isInteger(message.asInt.low) && $util.isInteger(message.asInt.high)))
                    return "asInt: integer|Long expected";
                }
                if (message.spanId != null && message.hasOwnProperty("spanId")) {
                  if (!(message.spanId && typeof message.spanId.length === "number" || $util.isString(message.spanId)))
                    return "spanId: buffer expected";
                }
                if (message.traceId != null && message.hasOwnProperty("traceId")) {
                  if (!(message.traceId && typeof message.traceId.length === "number" || $util.isString(message.traceId)))
                    return "traceId: buffer expected";
                }
                return null;
              }, "verify");
              Exemplar.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.Exemplar)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.Exemplar();
                if (object.filteredAttributes) {
                  if (!Array.isArray(object.filteredAttributes))
                    throw TypeError(".opentelemetry.proto.metrics.v1.Exemplar.filteredAttributes: array expected");
                  message.filteredAttributes = [];
                  for (var i = 0; i < object.filteredAttributes.length; ++i) {
                    if (typeof object.filteredAttributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Exemplar.filteredAttributes: object expected");
                    message.filteredAttributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.filteredAttributes[i]);
                  }
                }
                if (object.timeUnixNano != null) {
                  if ($util.Long)
                    (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                  else if (typeof object.timeUnixNano === "string")
                    message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                  else if (typeof object.timeUnixNano === "number")
                    message.timeUnixNano = object.timeUnixNano;
                  else if (typeof object.timeUnixNano === "object")
                    message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                }
                if (object.asDouble != null)
                  message.asDouble = Number(object.asDouble);
                if (object.asInt != null) {
                  if ($util.Long)
                    (message.asInt = $util.Long.fromValue(object.asInt)).unsigned = false;
                  else if (typeof object.asInt === "string")
                    message.asInt = parseInt(object.asInt, 10);
                  else if (typeof object.asInt === "number")
                    message.asInt = object.asInt;
                  else if (typeof object.asInt === "object")
                    message.asInt = new $util.LongBits(object.asInt.low >>> 0, object.asInt.high >>> 0).toNumber();
                }
                if (object.spanId != null) {
                  if (typeof object.spanId === "string")
                    $util.base64.decode(object.spanId, message.spanId = $util.newBuffer($util.base64.length(object.spanId)), 0);
                  else if (object.spanId.length >= 0)
                    message.spanId = object.spanId;
                }
                if (object.traceId != null) {
                  if (typeof object.traceId === "string")
                    $util.base64.decode(object.traceId, message.traceId = $util.newBuffer($util.base64.length(object.traceId)), 0);
                  else if (object.traceId.length >= 0)
                    message.traceId = object.traceId;
                }
                return message;
              }, "fromObject");
              Exemplar.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.filteredAttributes = [];
                if (options3.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options3.longs === String ? "0" : 0;
                  if (options3.bytes === String)
                    object.spanId = "";
                  else {
                    object.spanId = [];
                    if (options3.bytes !== Array)
                      object.spanId = $util.newBuffer(object.spanId);
                  }
                  if (options3.bytes === String)
                    object.traceId = "";
                  else {
                    object.traceId = [];
                    if (options3.bytes !== Array)
                      object.traceId = $util.newBuffer(object.traceId);
                  }
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options3.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options3.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options3.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.asDouble != null && message.hasOwnProperty("asDouble")) {
                  object.asDouble = options3.json && !isFinite(message.asDouble) ? String(message.asDouble) : message.asDouble;
                  if (options3.oneofs)
                    object.value = "asDouble";
                }
                if (message.spanId != null && message.hasOwnProperty("spanId"))
                  object.spanId = options3.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options3.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                  object.traceId = options3.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options3.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                if (message.asInt != null && message.hasOwnProperty("asInt")) {
                  if (typeof message.asInt === "number")
                    object.asInt = options3.longs === String ? String(message.asInt) : message.asInt;
                  else
                    object.asInt = options3.longs === String ? $util.Long.prototype.toString.call(message.asInt) : options3.longs === Number ? new $util.LongBits(message.asInt.low >>> 0, message.asInt.high >>> 0).toNumber() : message.asInt;
                  if (options3.oneofs)
                    object.value = "asInt";
                }
                if (message.filteredAttributes && message.filteredAttributes.length) {
                  object.filteredAttributes = [];
                  for (var j = 0; j < message.filteredAttributes.length; ++j)
                    object.filteredAttributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.filteredAttributes[j], options3);
                }
                return object;
              }, "toObject");
              Exemplar.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              Exemplar.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Exemplar";
              }, "getTypeUrl");
              return Exemplar;
            }();
            return v1;
          }();
          return metrics;
        }();
        proto.logs = function() {
          var logs3 = {};
          logs3.v1 = function() {
            var v1 = {};
            v1.LogsData = function() {
              function LogsData(properties) {
                this.resourceLogs = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(LogsData, "LogsData");
              LogsData.prototype.resourceLogs = $util.emptyArray;
              LogsData.create = /* @__PURE__ */ __name(function create(properties) {
                return new LogsData(properties);
              }, "create");
              LogsData.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resourceLogs != null && message.resourceLogs.length)
                  for (var i = 0; i < message.resourceLogs.length; ++i)
                    $root.opentelemetry.proto.logs.v1.ResourceLogs.encode(message.resourceLogs[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              }, "encode");
              LogsData.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              LogsData.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.logs.v1.LogsData();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.resourceLogs && message.resourceLogs.length))
                        message.resourceLogs = [];
                      message.resourceLogs.push($root.opentelemetry.proto.logs.v1.ResourceLogs.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              LogsData.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              LogsData.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.resourceLogs != null && message.hasOwnProperty("resourceLogs")) {
                  if (!Array.isArray(message.resourceLogs))
                    return "resourceLogs: array expected";
                  for (var i = 0; i < message.resourceLogs.length; ++i) {
                    var error = $root.opentelemetry.proto.logs.v1.ResourceLogs.verify(message.resourceLogs[i]);
                    if (error)
                      return "resourceLogs." + error;
                  }
                }
                return null;
              }, "verify");
              LogsData.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.logs.v1.LogsData)
                  return object;
                var message = new $root.opentelemetry.proto.logs.v1.LogsData();
                if (object.resourceLogs) {
                  if (!Array.isArray(object.resourceLogs))
                    throw TypeError(".opentelemetry.proto.logs.v1.LogsData.resourceLogs: array expected");
                  message.resourceLogs = [];
                  for (var i = 0; i < object.resourceLogs.length; ++i) {
                    if (typeof object.resourceLogs[i] !== "object")
                      throw TypeError(".opentelemetry.proto.logs.v1.LogsData.resourceLogs: object expected");
                    message.resourceLogs[i] = $root.opentelemetry.proto.logs.v1.ResourceLogs.fromObject(object.resourceLogs[i]);
                  }
                }
                return message;
              }, "fromObject");
              LogsData.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.resourceLogs = [];
                if (message.resourceLogs && message.resourceLogs.length) {
                  object.resourceLogs = [];
                  for (var j = 0; j < message.resourceLogs.length; ++j)
                    object.resourceLogs[j] = $root.opentelemetry.proto.logs.v1.ResourceLogs.toObject(message.resourceLogs[j], options3);
                }
                return object;
              }, "toObject");
              LogsData.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              LogsData.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.logs.v1.LogsData";
              }, "getTypeUrl");
              return LogsData;
            }();
            v1.ResourceLogs = function() {
              function ResourceLogs(properties) {
                this.scopeLogs = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(ResourceLogs, "ResourceLogs");
              ResourceLogs.prototype.resource = null;
              ResourceLogs.prototype.scopeLogs = $util.emptyArray;
              ResourceLogs.prototype.schemaUrl = null;
              ResourceLogs.create = /* @__PURE__ */ __name(function create(properties) {
                return new ResourceLogs(properties);
              }, "create");
              ResourceLogs.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                  $root.opentelemetry.proto.resource.v1.Resource.encode(message.resource, writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).fork()).ldelim();
                if (message.scopeLogs != null && message.scopeLogs.length)
                  for (var i = 0; i < message.scopeLogs.length; ++i)
                    $root.opentelemetry.proto.logs.v1.ScopeLogs.encode(message.scopeLogs[i], writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork()).ldelim();
                if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.schemaUrl);
                return writer;
              }, "encode");
              ResourceLogs.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              ResourceLogs.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.logs.v1.ResourceLogs();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      message.resource = $root.opentelemetry.proto.resource.v1.Resource.decode(reader, reader.uint32());
                      break;
                    }
                    case 2: {
                      if (!(message.scopeLogs && message.scopeLogs.length))
                        message.scopeLogs = [];
                      message.scopeLogs.push($root.opentelemetry.proto.logs.v1.ScopeLogs.decode(reader, reader.uint32()));
                      break;
                    }
                    case 3: {
                      message.schemaUrl = reader.string();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              ResourceLogs.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              ResourceLogs.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.resource != null && message.hasOwnProperty("resource")) {
                  var error = $root.opentelemetry.proto.resource.v1.Resource.verify(message.resource);
                  if (error)
                    return "resource." + error;
                }
                if (message.scopeLogs != null && message.hasOwnProperty("scopeLogs")) {
                  if (!Array.isArray(message.scopeLogs))
                    return "scopeLogs: array expected";
                  for (var i = 0; i < message.scopeLogs.length; ++i) {
                    var error = $root.opentelemetry.proto.logs.v1.ScopeLogs.verify(message.scopeLogs[i]);
                    if (error)
                      return "scopeLogs." + error;
                  }
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                  if (!$util.isString(message.schemaUrl))
                    return "schemaUrl: string expected";
                }
                return null;
              }, "verify");
              ResourceLogs.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.logs.v1.ResourceLogs)
                  return object;
                var message = new $root.opentelemetry.proto.logs.v1.ResourceLogs();
                if (object.resource != null) {
                  if (typeof object.resource !== "object")
                    throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.resource: object expected");
                  message.resource = $root.opentelemetry.proto.resource.v1.Resource.fromObject(object.resource);
                }
                if (object.scopeLogs) {
                  if (!Array.isArray(object.scopeLogs))
                    throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.scopeLogs: array expected");
                  message.scopeLogs = [];
                  for (var i = 0; i < object.scopeLogs.length; ++i) {
                    if (typeof object.scopeLogs[i] !== "object")
                      throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.scopeLogs: object expected");
                    message.scopeLogs[i] = $root.opentelemetry.proto.logs.v1.ScopeLogs.fromObject(object.scopeLogs[i]);
                  }
                }
                if (object.schemaUrl != null)
                  message.schemaUrl = String(object.schemaUrl);
                return message;
              }, "fromObject");
              ResourceLogs.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.scopeLogs = [];
                if (options3.defaults) {
                  object.resource = null;
                  object.schemaUrl = "";
                }
                if (message.resource != null && message.hasOwnProperty("resource"))
                  object.resource = $root.opentelemetry.proto.resource.v1.Resource.toObject(message.resource, options3);
                if (message.scopeLogs && message.scopeLogs.length) {
                  object.scopeLogs = [];
                  for (var j = 0; j < message.scopeLogs.length; ++j)
                    object.scopeLogs[j] = $root.opentelemetry.proto.logs.v1.ScopeLogs.toObject(message.scopeLogs[j], options3);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              }, "toObject");
              ResourceLogs.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              ResourceLogs.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.logs.v1.ResourceLogs";
              }, "getTypeUrl");
              return ResourceLogs;
            }();
            v1.ScopeLogs = function() {
              function ScopeLogs(properties) {
                this.logRecords = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(ScopeLogs, "ScopeLogs");
              ScopeLogs.prototype.scope = null;
              ScopeLogs.prototype.logRecords = $util.emptyArray;
              ScopeLogs.prototype.schemaUrl = null;
              ScopeLogs.create = /* @__PURE__ */ __name(function create(properties) {
                return new ScopeLogs(properties);
              }, "create");
              ScopeLogs.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.scope != null && Object.hasOwnProperty.call(message, "scope"))
                  $root.opentelemetry.proto.common.v1.InstrumentationScope.encode(message.scope, writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).fork()).ldelim();
                if (message.logRecords != null && message.logRecords.length)
                  for (var i = 0; i < message.logRecords.length; ++i)
                    $root.opentelemetry.proto.logs.v1.LogRecord.encode(message.logRecords[i], writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork()).ldelim();
                if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.schemaUrl);
                return writer;
              }, "encode");
              ScopeLogs.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              ScopeLogs.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.logs.v1.ScopeLogs();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.decode(reader, reader.uint32());
                      break;
                    }
                    case 2: {
                      if (!(message.logRecords && message.logRecords.length))
                        message.logRecords = [];
                      message.logRecords.push($root.opentelemetry.proto.logs.v1.LogRecord.decode(reader, reader.uint32()));
                      break;
                    }
                    case 3: {
                      message.schemaUrl = reader.string();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              ScopeLogs.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              ScopeLogs.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.scope != null && message.hasOwnProperty("scope")) {
                  var error = $root.opentelemetry.proto.common.v1.InstrumentationScope.verify(message.scope);
                  if (error)
                    return "scope." + error;
                }
                if (message.logRecords != null && message.hasOwnProperty("logRecords")) {
                  if (!Array.isArray(message.logRecords))
                    return "logRecords: array expected";
                  for (var i = 0; i < message.logRecords.length; ++i) {
                    var error = $root.opentelemetry.proto.logs.v1.LogRecord.verify(message.logRecords[i]);
                    if (error)
                      return "logRecords." + error;
                  }
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                  if (!$util.isString(message.schemaUrl))
                    return "schemaUrl: string expected";
                }
                return null;
              }, "verify");
              ScopeLogs.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.logs.v1.ScopeLogs)
                  return object;
                var message = new $root.opentelemetry.proto.logs.v1.ScopeLogs();
                if (object.scope != null) {
                  if (typeof object.scope !== "object")
                    throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.scope: object expected");
                  message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(object.scope);
                }
                if (object.logRecords) {
                  if (!Array.isArray(object.logRecords))
                    throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.logRecords: array expected");
                  message.logRecords = [];
                  for (var i = 0; i < object.logRecords.length; ++i) {
                    if (typeof object.logRecords[i] !== "object")
                      throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.logRecords: object expected");
                    message.logRecords[i] = $root.opentelemetry.proto.logs.v1.LogRecord.fromObject(object.logRecords[i]);
                  }
                }
                if (object.schemaUrl != null)
                  message.schemaUrl = String(object.schemaUrl);
                return message;
              }, "fromObject");
              ScopeLogs.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.logRecords = [];
                if (options3.defaults) {
                  object.scope = null;
                  object.schemaUrl = "";
                }
                if (message.scope != null && message.hasOwnProperty("scope"))
                  object.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.toObject(message.scope, options3);
                if (message.logRecords && message.logRecords.length) {
                  object.logRecords = [];
                  for (var j = 0; j < message.logRecords.length; ++j)
                    object.logRecords[j] = $root.opentelemetry.proto.logs.v1.LogRecord.toObject(message.logRecords[j], options3);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              }, "toObject");
              ScopeLogs.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              ScopeLogs.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.logs.v1.ScopeLogs";
              }, "getTypeUrl");
              return ScopeLogs;
            }();
            v1.SeverityNumber = function() {
              var valuesById = {}, values = Object.create(valuesById);
              values[valuesById[0] = "SEVERITY_NUMBER_UNSPECIFIED"] = 0;
              values[valuesById[1] = "SEVERITY_NUMBER_TRACE"] = 1;
              values[valuesById[2] = "SEVERITY_NUMBER_TRACE2"] = 2;
              values[valuesById[3] = "SEVERITY_NUMBER_TRACE3"] = 3;
              values[valuesById[4] = "SEVERITY_NUMBER_TRACE4"] = 4;
              values[valuesById[5] = "SEVERITY_NUMBER_DEBUG"] = 5;
              values[valuesById[6] = "SEVERITY_NUMBER_DEBUG2"] = 6;
              values[valuesById[7] = "SEVERITY_NUMBER_DEBUG3"] = 7;
              values[valuesById[8] = "SEVERITY_NUMBER_DEBUG4"] = 8;
              values[valuesById[9] = "SEVERITY_NUMBER_INFO"] = 9;
              values[valuesById[10] = "SEVERITY_NUMBER_INFO2"] = 10;
              values[valuesById[11] = "SEVERITY_NUMBER_INFO3"] = 11;
              values[valuesById[12] = "SEVERITY_NUMBER_INFO4"] = 12;
              values[valuesById[13] = "SEVERITY_NUMBER_WARN"] = 13;
              values[valuesById[14] = "SEVERITY_NUMBER_WARN2"] = 14;
              values[valuesById[15] = "SEVERITY_NUMBER_WARN3"] = 15;
              values[valuesById[16] = "SEVERITY_NUMBER_WARN4"] = 16;
              values[valuesById[17] = "SEVERITY_NUMBER_ERROR"] = 17;
              values[valuesById[18] = "SEVERITY_NUMBER_ERROR2"] = 18;
              values[valuesById[19] = "SEVERITY_NUMBER_ERROR3"] = 19;
              values[valuesById[20] = "SEVERITY_NUMBER_ERROR4"] = 20;
              values[valuesById[21] = "SEVERITY_NUMBER_FATAL"] = 21;
              values[valuesById[22] = "SEVERITY_NUMBER_FATAL2"] = 22;
              values[valuesById[23] = "SEVERITY_NUMBER_FATAL3"] = 23;
              values[valuesById[24] = "SEVERITY_NUMBER_FATAL4"] = 24;
              return values;
            }();
            v1.LogRecordFlags = function() {
              var valuesById = {}, values = Object.create(valuesById);
              values[valuesById[0] = "LOG_RECORD_FLAGS_DO_NOT_USE"] = 0;
              values[valuesById[255] = "LOG_RECORD_FLAGS_TRACE_FLAGS_MASK"] = 255;
              return values;
            }();
            v1.LogRecord = function() {
              function LogRecord(properties) {
                this.attributes = [];
                if (properties) {
                  for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                    if (properties[keys4[i]] != null)
                      this[keys4[i]] = properties[keys4[i]];
                }
              }
              __name(LogRecord, "LogRecord");
              LogRecord.prototype.timeUnixNano = null;
              LogRecord.prototype.observedTimeUnixNano = null;
              LogRecord.prototype.severityNumber = null;
              LogRecord.prototype.severityText = null;
              LogRecord.prototype.body = null;
              LogRecord.prototype.attributes = $util.emptyArray;
              LogRecord.prototype.droppedAttributesCount = null;
              LogRecord.prototype.flags = null;
              LogRecord.prototype.traceId = null;
              LogRecord.prototype.spanId = null;
              LogRecord.create = /* @__PURE__ */ __name(function create(properties) {
                return new LogRecord(properties);
              }, "create");
              LogRecord.encode = /* @__PURE__ */ __name(function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                  writer.uint32(
                    /* id 1, wireType 1 =*/
                    9
                  ).fixed64(message.timeUnixNano);
                if (message.severityNumber != null && Object.hasOwnProperty.call(message, "severityNumber"))
                  writer.uint32(
                    /* id 2, wireType 0 =*/
                    16
                  ).int32(message.severityNumber);
                if (message.severityText != null && Object.hasOwnProperty.call(message, "severityText"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.severityText);
                if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                  $root.opentelemetry.proto.common.v1.AnyValue.encode(message.body, writer.uint32(
                    /* id 5, wireType 2 =*/
                    42
                  ).fork()).ldelim();
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 6, wireType 2 =*/
                      50
                    ).fork()).ldelim();
                if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                  writer.uint32(
                    /* id 7, wireType 0 =*/
                    56
                  ).uint32(message.droppedAttributesCount);
                if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                  writer.uint32(
                    /* id 8, wireType 5 =*/
                    69
                  ).fixed32(message.flags);
                if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                  writer.uint32(
                    /* id 9, wireType 2 =*/
                    74
                  ).bytes(message.traceId);
                if (message.spanId != null && Object.hasOwnProperty.call(message, "spanId"))
                  writer.uint32(
                    /* id 10, wireType 2 =*/
                    82
                  ).bytes(message.spanId);
                if (message.observedTimeUnixNano != null && Object.hasOwnProperty.call(message, "observedTimeUnixNano"))
                  writer.uint32(
                    /* id 11, wireType 1 =*/
                    89
                  ).fixed64(message.observedTimeUnixNano);
                return writer;
              }, "encode");
              LogRecord.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              }, "encodeDelimited");
              LogRecord.decode = /* @__PURE__ */ __name(function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.logs.v1.LogRecord();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  switch (tag >>> 3) {
                    case 1: {
                      message.timeUnixNano = reader.fixed64();
                      break;
                    }
                    case 11: {
                      message.observedTimeUnixNano = reader.fixed64();
                      break;
                    }
                    case 2: {
                      message.severityNumber = reader.int32();
                      break;
                    }
                    case 3: {
                      message.severityText = reader.string();
                      break;
                    }
                    case 5: {
                      message.body = $root.opentelemetry.proto.common.v1.AnyValue.decode(reader, reader.uint32());
                      break;
                    }
                    case 6: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 7: {
                      message.droppedAttributesCount = reader.uint32();
                      break;
                    }
                    case 8: {
                      message.flags = reader.fixed32();
                      break;
                    }
                    case 9: {
                      message.traceId = reader.bytes();
                      break;
                    }
                    case 10: {
                      message.spanId = reader.bytes();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              }, "decode");
              LogRecord.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              }, "decodeDelimited");
              LogRecord.verify = /* @__PURE__ */ __name(function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                  if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                    return "timeUnixNano: integer|Long expected";
                }
                if (message.observedTimeUnixNano != null && message.hasOwnProperty("observedTimeUnixNano")) {
                  if (!$util.isInteger(message.observedTimeUnixNano) && !(message.observedTimeUnixNano && $util.isInteger(message.observedTimeUnixNano.low) && $util.isInteger(message.observedTimeUnixNano.high)))
                    return "observedTimeUnixNano: integer|Long expected";
                }
                if (message.severityNumber != null && message.hasOwnProperty("severityNumber"))
                  switch (message.severityNumber) {
                    default:
                      return "severityNumber: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 24:
                      break;
                  }
                if (message.severityText != null && message.hasOwnProperty("severityText")) {
                  if (!$util.isString(message.severityText))
                    return "severityText: string expected";
                }
                if (message.body != null && message.hasOwnProperty("body")) {
                  var error = $root.opentelemetry.proto.common.v1.AnyValue.verify(message.body);
                  if (error)
                    return "body." + error;
                }
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                  if (!$util.isInteger(message.droppedAttributesCount))
                    return "droppedAttributesCount: integer expected";
                }
                if (message.flags != null && message.hasOwnProperty("flags")) {
                  if (!$util.isInteger(message.flags))
                    return "flags: integer expected";
                }
                if (message.traceId != null && message.hasOwnProperty("traceId")) {
                  if (!(message.traceId && typeof message.traceId.length === "number" || $util.isString(message.traceId)))
                    return "traceId: buffer expected";
                }
                if (message.spanId != null && message.hasOwnProperty("spanId")) {
                  if (!(message.spanId && typeof message.spanId.length === "number" || $util.isString(message.spanId)))
                    return "spanId: buffer expected";
                }
                return null;
              }, "verify");
              LogRecord.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.logs.v1.LogRecord)
                  return object;
                var message = new $root.opentelemetry.proto.logs.v1.LogRecord();
                if (object.timeUnixNano != null) {
                  if ($util.Long)
                    (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                  else if (typeof object.timeUnixNano === "string")
                    message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                  else if (typeof object.timeUnixNano === "number")
                    message.timeUnixNano = object.timeUnixNano;
                  else if (typeof object.timeUnixNano === "object")
                    message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                }
                if (object.observedTimeUnixNano != null) {
                  if ($util.Long)
                    (message.observedTimeUnixNano = $util.Long.fromValue(object.observedTimeUnixNano)).unsigned = false;
                  else if (typeof object.observedTimeUnixNano === "string")
                    message.observedTimeUnixNano = parseInt(object.observedTimeUnixNano, 10);
                  else if (typeof object.observedTimeUnixNano === "number")
                    message.observedTimeUnixNano = object.observedTimeUnixNano;
                  else if (typeof object.observedTimeUnixNano === "object")
                    message.observedTimeUnixNano = new $util.LongBits(object.observedTimeUnixNano.low >>> 0, object.observedTimeUnixNano.high >>> 0).toNumber();
                }
                switch (object.severityNumber) {
                  default:
                    if (typeof object.severityNumber === "number") {
                      message.severityNumber = object.severityNumber;
                      break;
                    }
                    break;
                  case "SEVERITY_NUMBER_UNSPECIFIED":
                  case 0:
                    message.severityNumber = 0;
                    break;
                  case "SEVERITY_NUMBER_TRACE":
                  case 1:
                    message.severityNumber = 1;
                    break;
                  case "SEVERITY_NUMBER_TRACE2":
                  case 2:
                    message.severityNumber = 2;
                    break;
                  case "SEVERITY_NUMBER_TRACE3":
                  case 3:
                    message.severityNumber = 3;
                    break;
                  case "SEVERITY_NUMBER_TRACE4":
                  case 4:
                    message.severityNumber = 4;
                    break;
                  case "SEVERITY_NUMBER_DEBUG":
                  case 5:
                    message.severityNumber = 5;
                    break;
                  case "SEVERITY_NUMBER_DEBUG2":
                  case 6:
                    message.severityNumber = 6;
                    break;
                  case "SEVERITY_NUMBER_DEBUG3":
                  case 7:
                    message.severityNumber = 7;
                    break;
                  case "SEVERITY_NUMBER_DEBUG4":
                  case 8:
                    message.severityNumber = 8;
                    break;
                  case "SEVERITY_NUMBER_INFO":
                  case 9:
                    message.severityNumber = 9;
                    break;
                  case "SEVERITY_NUMBER_INFO2":
                  case 10:
                    message.severityNumber = 10;
                    break;
                  case "SEVERITY_NUMBER_INFO3":
                  case 11:
                    message.severityNumber = 11;
                    break;
                  case "SEVERITY_NUMBER_INFO4":
                  case 12:
                    message.severityNumber = 12;
                    break;
                  case "SEVERITY_NUMBER_WARN":
                  case 13:
                    message.severityNumber = 13;
                    break;
                  case "SEVERITY_NUMBER_WARN2":
                  case 14:
                    message.severityNumber = 14;
                    break;
                  case "SEVERITY_NUMBER_WARN3":
                  case 15:
                    message.severityNumber = 15;
                    break;
                  case "SEVERITY_NUMBER_WARN4":
                  case 16:
                    message.severityNumber = 16;
                    break;
                  case "SEVERITY_NUMBER_ERROR":
                  case 17:
                    message.severityNumber = 17;
                    break;
                  case "SEVERITY_NUMBER_ERROR2":
                  case 18:
                    message.severityNumber = 18;
                    break;
                  case "SEVERITY_NUMBER_ERROR3":
                  case 19:
                    message.severityNumber = 19;
                    break;
                  case "SEVERITY_NUMBER_ERROR4":
                  case 20:
                    message.severityNumber = 20;
                    break;
                  case "SEVERITY_NUMBER_FATAL":
                  case 21:
                    message.severityNumber = 21;
                    break;
                  case "SEVERITY_NUMBER_FATAL2":
                  case 22:
                    message.severityNumber = 22;
                    break;
                  case "SEVERITY_NUMBER_FATAL3":
                  case 23:
                    message.severityNumber = 23;
                    break;
                  case "SEVERITY_NUMBER_FATAL4":
                  case 24:
                    message.severityNumber = 24;
                    break;
                }
                if (object.severityText != null)
                  message.severityText = String(object.severityText);
                if (object.body != null) {
                  if (typeof object.body !== "object")
                    throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.body: object expected");
                  message.body = $root.opentelemetry.proto.common.v1.AnyValue.fromObject(object.body);
                }
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.droppedAttributesCount != null)
                  message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                if (object.flags != null)
                  message.flags = object.flags >>> 0;
                if (object.traceId != null) {
                  if (typeof object.traceId === "string")
                    $util.base64.decode(object.traceId, message.traceId = $util.newBuffer($util.base64.length(object.traceId)), 0);
                  else if (object.traceId.length >= 0)
                    message.traceId = object.traceId;
                }
                if (object.spanId != null) {
                  if (typeof object.spanId === "string")
                    $util.base64.decode(object.spanId, message.spanId = $util.newBuffer($util.base64.length(object.spanId)), 0);
                  else if (object.spanId.length >= 0)
                    message.spanId = object.spanId;
                }
                return message;
              }, "fromObject");
              LogRecord.toObject = /* @__PURE__ */ __name(function toObject(message, options3) {
                if (!options3)
                  options3 = {};
                var object = {};
                if (options3.arrays || options3.defaults)
                  object.attributes = [];
                if (options3.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options3.longs === String ? "0" : 0;
                  object.severityNumber = options3.enums === String ? "SEVERITY_NUMBER_UNSPECIFIED" : 0;
                  object.severityText = "";
                  object.body = null;
                  object.droppedAttributesCount = 0;
                  object.flags = 0;
                  if (options3.bytes === String)
                    object.traceId = "";
                  else {
                    object.traceId = [];
                    if (options3.bytes !== Array)
                      object.traceId = $util.newBuffer(object.traceId);
                  }
                  if (options3.bytes === String)
                    object.spanId = "";
                  else {
                    object.spanId = [];
                    if (options3.bytes !== Array)
                      object.spanId = $util.newBuffer(object.spanId);
                  }
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.observedTimeUnixNano = options3.longs === String ? long.toString() : options3.longs === Number ? long.toNumber() : long;
                  } else
                    object.observedTimeUnixNano = options3.longs === String ? "0" : 0;
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options3.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options3.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options3.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.severityNumber != null && message.hasOwnProperty("severityNumber"))
                  object.severityNumber = options3.enums === String ? $root.opentelemetry.proto.logs.v1.SeverityNumber[message.severityNumber] === void 0 ? message.severityNumber : $root.opentelemetry.proto.logs.v1.SeverityNumber[message.severityNumber] : message.severityNumber;
                if (message.severityText != null && message.hasOwnProperty("severityText"))
                  object.severityText = message.severityText;
                if (message.body != null && message.hasOwnProperty("body"))
                  object.body = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.body, options3);
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options3);
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                  object.droppedAttributesCount = message.droppedAttributesCount;
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                  object.traceId = options3.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options3.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                if (message.spanId != null && message.hasOwnProperty("spanId"))
                  object.spanId = options3.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options3.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                if (message.observedTimeUnixNano != null && message.hasOwnProperty("observedTimeUnixNano"))
                  if (typeof message.observedTimeUnixNano === "number")
                    object.observedTimeUnixNano = options3.longs === String ? String(message.observedTimeUnixNano) : message.observedTimeUnixNano;
                  else
                    object.observedTimeUnixNano = options3.longs === String ? $util.Long.prototype.toString.call(message.observedTimeUnixNano) : options3.longs === Number ? new $util.LongBits(message.observedTimeUnixNano.low >>> 0, message.observedTimeUnixNano.high >>> 0).toNumber() : message.observedTimeUnixNano;
                return object;
              }, "toObject");
              LogRecord.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              }, "toJSON");
              LogRecord.getTypeUrl = /* @__PURE__ */ __name(function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.logs.v1.LogRecord";
              }, "getTypeUrl");
              return LogRecord;
            }();
            return v1;
          }();
          return logs3;
        }();
        return proto;
      }();
      return opentelemetry2;
    }();
    module2.exports = $root;
  }
});

// ../../node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/platform/types.js
var ServiceClientType;
var init_types4 = __esm({
  "../../node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/platform/types.js"() {
    "use strict";
    (function(ServiceClientType2) {
      ServiceClientType2[ServiceClientType2["SPANS"] = 0] = "SPANS";
      ServiceClientType2[ServiceClientType2["METRICS"] = 1] = "METRICS";
      ServiceClientType2[ServiceClientType2["LOGS"] = 2] = "LOGS";
    })(ServiceClientType || (ServiceClientType = {}));
  }
});

// ../../node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/platform/util.js
function getExportRequestProto(clientType) {
  if (clientType === ServiceClientType.SPANS) {
    return root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest;
  } else if (clientType === ServiceClientType.LOGS) {
    return root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest;
  } else {
    return root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest;
  }
}
var root;
var init_util3 = __esm({
  "../../node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/platform/util.js"() {
    "use strict";
    root = __toESM(require_root());
    init_types4();
    __name(getExportRequestProto, "getExportRequestProto");
  }
});

// ../../node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/platform/node/util.js
var util_exports = {};
__export(util_exports, {
  send: () => send
});
function send(collector, objects, compression, onSuccess, onError) {
  var serviceRequest = collector.convert(objects);
  var exportRequestType = getExportRequestProto(collector.getServiceClientType());
  var message = exportRequestType.create(serviceRequest);
  if (message) {
    var body = exportRequestType.encode(message).finish();
    if (body) {
      sendWithHttp(collector, Buffer.from(body), "application/x-protobuf", onSuccess, onError);
    }
  } else {
    onError(new OTLPExporterError("No proto"));
  }
}
var init_util4 = __esm({
  "../../node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/platform/node/util.js"() {
    "use strict";
    init_esm2();
    init_util3();
    __name(send, "send");
  }
});

// node_modules/.pnpm/pino-std-serializers@7.0.0/node_modules/pino-std-serializers/lib/err-helpers.js
var require_err_helpers = __commonJS({
  "node_modules/.pnpm/pino-std-serializers@7.0.0/node_modules/pino-std-serializers/lib/err-helpers.js"(exports2, module2) {
    "use strict";
    var isErrorLike = /* @__PURE__ */ __name((err) => {
      return err && typeof err.message === "string";
    }, "isErrorLike");
    var getErrorCause = /* @__PURE__ */ __name((err) => {
      if (!err)
        return;
      const cause = err.cause;
      if (typeof cause === "function") {
        const causeResult = err.cause();
        return isErrorLike(causeResult) ? causeResult : void 0;
      } else {
        return isErrorLike(cause) ? cause : void 0;
      }
    }, "getErrorCause");
    var _stackWithCauses = /* @__PURE__ */ __name((err, seen) => {
      if (!isErrorLike(err))
        return "";
      const stack = err.stack || "";
      if (seen.has(err)) {
        return stack + "\ncauses have become circular...";
      }
      const cause = getErrorCause(err);
      if (cause) {
        seen.add(err);
        return stack + "\ncaused by: " + _stackWithCauses(cause, seen);
      } else {
        return stack;
      }
    }, "_stackWithCauses");
    var stackWithCauses = /* @__PURE__ */ __name((err) => _stackWithCauses(err, /* @__PURE__ */ new Set()), "stackWithCauses");
    var _messageWithCauses = /* @__PURE__ */ __name((err, seen, skip) => {
      if (!isErrorLike(err))
        return "";
      const message = skip ? "" : err.message || "";
      if (seen.has(err)) {
        return message + ": ...";
      }
      const cause = getErrorCause(err);
      if (cause) {
        seen.add(err);
        const skipIfVErrorStyleCause = typeof err.cause === "function";
        return message + (skipIfVErrorStyleCause ? "" : ": ") + _messageWithCauses(cause, seen, skipIfVErrorStyleCause);
      } else {
        return message;
      }
    }, "_messageWithCauses");
    var messageWithCauses = /* @__PURE__ */ __name((err) => _messageWithCauses(err, /* @__PURE__ */ new Set()), "messageWithCauses");
    module2.exports = {
      isErrorLike,
      getErrorCause,
      stackWithCauses,
      messageWithCauses
    };
  }
});

// node_modules/.pnpm/pino-std-serializers@7.0.0/node_modules/pino-std-serializers/lib/err-proto.js
var require_err_proto = __commonJS({
  "node_modules/.pnpm/pino-std-serializers@7.0.0/node_modules/pino-std-serializers/lib/err-proto.js"(exports2, module2) {
    "use strict";
    var seen = Symbol("circular-ref-tag");
    var rawSymbol = Symbol("pino-raw-err-ref");
    var pinoErrProto = Object.create({}, {
      type: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      message: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      stack: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      aggregateErrors: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoErrProto, rawSymbol, {
      writable: true,
      value: {}
    });
    module2.exports = {
      pinoErrProto,
      pinoErrorSymbols: {
        seen,
        rawSymbol
      }
    };
  }
});

// node_modules/.pnpm/pino-std-serializers@7.0.0/node_modules/pino-std-serializers/lib/err.js
var require_err = __commonJS({
  "node_modules/.pnpm/pino-std-serializers@7.0.0/node_modules/pino-std-serializers/lib/err.js"(exports2, module2) {
    "use strict";
    module2.exports = errSerializer;
    var { messageWithCauses, stackWithCauses, isErrorLike } = require_err_helpers();
    var { pinoErrProto, pinoErrorSymbols } = require_err_proto();
    var { seen } = pinoErrorSymbols;
    var { toString: toString2 } = Object.prototype;
    function errSerializer(err) {
      if (!isErrorLike(err)) {
        return err;
      }
      err[seen] = void 0;
      const _err = Object.create(pinoErrProto);
      _err.type = toString2.call(err.constructor) === "[object Function]" ? err.constructor.name : err.name;
      _err.message = messageWithCauses(err);
      _err.stack = stackWithCauses(err);
      if (Array.isArray(err.errors)) {
        _err.aggregateErrors = err.errors.map((err2) => errSerializer(err2));
      }
      for (const key in err) {
        if (_err[key] === void 0) {
          const val = err[key];
          if (isErrorLike(val)) {
            if (key !== "cause" && !Object.prototype.hasOwnProperty.call(val, seen)) {
              _err[key] = errSerializer(val);
            }
          } else {
            _err[key] = val;
          }
        }
      }
      delete err[seen];
      _err.raw = err;
      return _err;
    }
    __name(errSerializer, "errSerializer");
  }
});

// node_modules/.pnpm/pino-std-serializers@7.0.0/node_modules/pino-std-serializers/lib/err-with-cause.js
var require_err_with_cause = __commonJS({
  "node_modules/.pnpm/pino-std-serializers@7.0.0/node_modules/pino-std-serializers/lib/err-with-cause.js"(exports2, module2) {
    "use strict";
    module2.exports = errWithCauseSerializer;
    var { isErrorLike } = require_err_helpers();
    var { pinoErrProto, pinoErrorSymbols } = require_err_proto();
    var { seen } = pinoErrorSymbols;
    var { toString: toString2 } = Object.prototype;
    function errWithCauseSerializer(err) {
      if (!isErrorLike(err)) {
        return err;
      }
      err[seen] = void 0;
      const _err = Object.create(pinoErrProto);
      _err.type = toString2.call(err.constructor) === "[object Function]" ? err.constructor.name : err.name;
      _err.message = err.message;
      _err.stack = err.stack;
      if (Array.isArray(err.errors)) {
        _err.aggregateErrors = err.errors.map((err2) => errWithCauseSerializer(err2));
      }
      if (isErrorLike(err.cause) && !Object.prototype.hasOwnProperty.call(err.cause, seen)) {
        _err.cause = errWithCauseSerializer(err.cause);
      }
      for (const key in err) {
        if (_err[key] === void 0) {
          const val = err[key];
          if (isErrorLike(val)) {
            if (!Object.prototype.hasOwnProperty.call(val, seen)) {
              _err[key] = errWithCauseSerializer(val);
            }
          } else {
            _err[key] = val;
          }
        }
      }
      delete err[seen];
      _err.raw = err;
      return _err;
    }
    __name(errWithCauseSerializer, "errWithCauseSerializer");
  }
});

// node_modules/.pnpm/pino-std-serializers@7.0.0/node_modules/pino-std-serializers/lib/req.js
var require_req = __commonJS({
  "node_modules/.pnpm/pino-std-serializers@7.0.0/node_modules/pino-std-serializers/lib/req.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      mapHttpRequest,
      reqSerializer
    };
    var rawSymbol = Symbol("pino-raw-req-ref");
    var pinoReqProto = Object.create({}, {
      id: {
        enumerable: true,
        writable: true,
        value: ""
      },
      method: {
        enumerable: true,
        writable: true,
        value: ""
      },
      url: {
        enumerable: true,
        writable: true,
        value: ""
      },
      query: {
        enumerable: true,
        writable: true,
        value: ""
      },
      params: {
        enumerable: true,
        writable: true,
        value: ""
      },
      headers: {
        enumerable: true,
        writable: true,
        value: {}
      },
      remoteAddress: {
        enumerable: true,
        writable: true,
        value: ""
      },
      remotePort: {
        enumerable: true,
        writable: true,
        value: ""
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoReqProto, rawSymbol, {
      writable: true,
      value: {}
    });
    function reqSerializer(req) {
      const connection = req.info || req.socket;
      const _req = Object.create(pinoReqProto);
      _req.id = typeof req.id === "function" ? req.id() : req.id || (req.info ? req.info.id : void 0);
      _req.method = req.method;
      if (req.originalUrl) {
        _req.url = req.originalUrl;
      } else {
        const path = req.path;
        _req.url = typeof path === "string" ? path : req.url ? req.url.path || req.url : void 0;
      }
      if (req.query) {
        _req.query = req.query;
      }
      if (req.params) {
        _req.params = req.params;
      }
      _req.headers = req.headers;
      _req.remoteAddress = connection && connection.remoteAddress;
      _req.remotePort = connection && connection.remotePort;
      _req.raw = req.raw || req;
      return _req;
    }
    __name(reqSerializer, "reqSerializer");
    function mapHttpRequest(req) {
      return {
        req: reqSerializer(req)
      };
    }
    __name(mapHttpRequest, "mapHttpRequest");
  }
});

// node_modules/.pnpm/pino-std-serializers@7.0.0/node_modules/pino-std-serializers/lib/res.js
var require_res = __commonJS({
  "node_modules/.pnpm/pino-std-serializers@7.0.0/node_modules/pino-std-serializers/lib/res.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      mapHttpResponse,
      resSerializer
    };
    var rawSymbol = Symbol("pino-raw-res-ref");
    var pinoResProto = Object.create({}, {
      statusCode: {
        enumerable: true,
        writable: true,
        value: 0
      },
      headers: {
        enumerable: true,
        writable: true,
        value: ""
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoResProto, rawSymbol, {
      writable: true,
      value: {}
    });
    function resSerializer(res) {
      const _res = Object.create(pinoResProto);
      _res.statusCode = res.headersSent ? res.statusCode : null;
      _res.headers = res.getHeaders ? res.getHeaders() : res._headers;
      _res.raw = res;
      return _res;
    }
    __name(resSerializer, "resSerializer");
    function mapHttpResponse(res) {
      return {
        res: resSerializer(res)
      };
    }
    __name(mapHttpResponse, "mapHttpResponse");
  }
});

// node_modules/.pnpm/pino-std-serializers@7.0.0/node_modules/pino-std-serializers/index.js
var require_pino_std_serializers = __commonJS({
  "node_modules/.pnpm/pino-std-serializers@7.0.0/node_modules/pino-std-serializers/index.js"(exports2, module2) {
    "use strict";
    var errSerializer = require_err();
    var errWithCauseSerializer = require_err_with_cause();
    var reqSerializers = require_req();
    var resSerializers = require_res();
    module2.exports = {
      err: errSerializer,
      errWithCause: errWithCauseSerializer,
      mapHttpRequest: reqSerializers.mapHttpRequest,
      mapHttpResponse: resSerializers.mapHttpResponse,
      req: reqSerializers.reqSerializer,
      res: resSerializers.resSerializer,
      wrapErrorSerializer: /* @__PURE__ */ __name(function wrapErrorSerializer(customSerializer) {
        if (customSerializer === errSerializer)
          return customSerializer;
        return /* @__PURE__ */ __name(function wrapErrSerializer(err) {
          return customSerializer(errSerializer(err));
        }, "wrapErrSerializer");
      }, "wrapErrorSerializer"),
      wrapRequestSerializer: /* @__PURE__ */ __name(function wrapRequestSerializer(customSerializer) {
        if (customSerializer === reqSerializers.reqSerializer)
          return customSerializer;
        return /* @__PURE__ */ __name(function wrappedReqSerializer(req) {
          return customSerializer(reqSerializers.reqSerializer(req));
        }, "wrappedReqSerializer");
      }, "wrapRequestSerializer"),
      wrapResponseSerializer: /* @__PURE__ */ __name(function wrapResponseSerializer(customSerializer) {
        if (customSerializer === resSerializers.resSerializer)
          return customSerializer;
        return /* @__PURE__ */ __name(function wrappedResSerializer(res) {
          return customSerializer(resSerializers.resSerializer(res));
        }, "wrappedResSerializer");
      }, "wrapResponseSerializer")
    };
  }
});

// node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/caller.js
var require_caller = __commonJS({
  "node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/caller.js"(exports2, module2) {
    "use strict";
    function noOpPrepareStackTrace(_5, stack) {
      return stack;
    }
    __name(noOpPrepareStackTrace, "noOpPrepareStackTrace");
    module2.exports = /* @__PURE__ */ __name(function getCallers() {
      const originalPrepare = Error.prepareStackTrace;
      Error.prepareStackTrace = noOpPrepareStackTrace;
      const stack = new Error().stack;
      Error.prepareStackTrace = originalPrepare;
      if (!Array.isArray(stack)) {
        return void 0;
      }
      const entries = stack.slice(2);
      const fileNames = [];
      for (const entry of entries) {
        if (!entry) {
          continue;
        }
        fileNames.push(entry.getFileName());
      }
      return fileNames;
    }, "getCallers");
  }
});

// node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/lib/validator.js
var require_validator = __commonJS({
  "node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/lib/validator.js"(exports2, module2) {
    "use strict";
    module2.exports = validator;
    function validator(opts = {}) {
      const {
        ERR_PATHS_MUST_BE_STRINGS = /* @__PURE__ */ __name(() => "fast-redact - Paths must be (non-empty) strings", "ERR_PATHS_MUST_BE_STRINGS"),
        ERR_INVALID_PATH = /* @__PURE__ */ __name((s) => `fast-redact \u2013 Invalid path (${s})`, "ERR_INVALID_PATH")
      } = opts;
      return /* @__PURE__ */ __name(function validate({ paths }) {
        paths.forEach((s) => {
          if (typeof s !== "string") {
            throw Error(ERR_PATHS_MUST_BE_STRINGS());
          }
          try {
            if (/〇/.test(s))
              throw Error();
            const expr = (s[0] === "[" ? "" : ".") + s.replace(/^\*/, "\u3007").replace(/\.\*/g, ".\u3007").replace(/\[\*\]/g, "[\u3007]");
            if (/\n|\r|;/.test(expr))
              throw Error();
            if (/\/\*/.test(expr))
              throw Error();
            Function(`
            'use strict'
            const o = new Proxy({}, { get: () => o, set: () => { throw Error() } });
            const \u3007 = null;
            o${expr}
            if ([o${expr}].length !== 1) throw Error()`)();
          } catch (e) {
            throw Error(ERR_INVALID_PATH(s));
          }
        });
      }, "validate");
    }
    __name(validator, "validator");
  }
});

// node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/lib/rx.js
var require_rx = __commonJS({
  "node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/lib/rx.js"(exports2, module2) {
    "use strict";
    module2.exports = /[^.[\]]+|\[((?:.)*?)\]/g;
  }
});

// node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/lib/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/lib/parse.js"(exports2, module2) {
    "use strict";
    var rx = require_rx();
    module2.exports = parse;
    function parse({ paths }) {
      const wildcards = [];
      var wcLen = 0;
      const secret = paths.reduce(function(o, strPath, ix) {
        var path = strPath.match(rx).map((p) => p.replace(/'|"|`/g, ""));
        const leadingBracket = strPath[0] === "[";
        path = path.map((p) => {
          if (p[0] === "[")
            return p.substr(1, p.length - 2);
          else
            return p;
        });
        const star = path.indexOf("*");
        if (star > -1) {
          const before = path.slice(0, star);
          const beforeStr = before.join(".");
          const after = path.slice(star + 1, path.length);
          const nested = after.length > 0;
          wcLen++;
          wildcards.push({
            before,
            beforeStr,
            after,
            nested
          });
        } else {
          o[strPath] = {
            path,
            val: void 0,
            precensored: false,
            circle: "",
            escPath: JSON.stringify(strPath),
            leadingBracket
          };
        }
        return o;
      }, {});
      return { wildcards, wcLen, secret };
    }
    __name(parse, "parse");
  }
});

// node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/lib/redactor.js
var require_redactor = __commonJS({
  "node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/lib/redactor.js"(exports2, module2) {
    "use strict";
    var rx = require_rx();
    module2.exports = redactor;
    function redactor({ secret, serialize, wcLen, strict, isCensorFct, censorFctTakesPath }, state) {
      const redact = Function("o", `
    if (typeof o !== 'object' || o == null) {
      ${strictImpl(strict, serialize)}
    }
    const { censor, secret } = this
    const originalSecret = {}
    const secretKeys = Object.keys(secret)
    for (var i = 0; i < secretKeys.length; i++) {
      originalSecret[secretKeys[i]] = secret[secretKeys[i]]
    }

    ${redactTmpl(secret, isCensorFct, censorFctTakesPath)}
    this.compileRestore()
    ${dynamicRedactTmpl(wcLen > 0, isCensorFct, censorFctTakesPath)}
    this.secret = originalSecret
    ${resultTmpl(serialize)}
  `).bind(state);
      redact.state = state;
      if (serialize === false) {
        redact.restore = (o) => state.restore(o);
      }
      return redact;
    }
    __name(redactor, "redactor");
    function redactTmpl(secret, isCensorFct, censorFctTakesPath) {
      return Object.keys(secret).map((path) => {
        const { escPath, leadingBracket, path: arrPath } = secret[path];
        const skip = leadingBracket ? 1 : 0;
        const delim = leadingBracket ? "" : ".";
        const hops = [];
        var match;
        while ((match = rx.exec(path)) !== null) {
          const [, ix] = match;
          const { index, input } = match;
          if (index > skip)
            hops.push(input.substring(0, index - (ix ? 0 : 1)));
        }
        var existence = hops.map((p) => `o${delim}${p}`).join(" && ");
        if (existence.length === 0)
          existence += `o${delim}${path} != null`;
        else
          existence += ` && o${delim}${path} != null`;
        const circularDetection = `
      switch (true) {
        ${hops.reverse().map((p) => `
          case o${delim}${p} === censor:
            secret[${escPath}].circle = ${JSON.stringify(p)}
            break
        `).join("\n")}
      }
    `;
        const censorArgs = censorFctTakesPath ? `val, ${JSON.stringify(arrPath)}` : `val`;
        return `
      if (${existence}) {
        const val = o${delim}${path}
        if (val === censor) {
          secret[${escPath}].precensored = true
        } else {
          secret[${escPath}].val = val
          o${delim}${path} = ${isCensorFct ? `censor(${censorArgs})` : "censor"}
          ${circularDetection}
        }
      }
    `;
      }).join("\n");
    }
    __name(redactTmpl, "redactTmpl");
    function dynamicRedactTmpl(hasWildcards, isCensorFct, censorFctTakesPath) {
      return hasWildcards === true ? `
    {
      const { wildcards, wcLen, groupRedact, nestedRedact } = this
      for (var i = 0; i < wcLen; i++) {
        const { before, beforeStr, after, nested } = wildcards[i]
        if (nested === true) {
          secret[beforeStr] = secret[beforeStr] || []
          nestedRedact(secret[beforeStr], o, before, after, censor, ${isCensorFct}, ${censorFctTakesPath})
        } else secret[beforeStr] = groupRedact(o, before, censor, ${isCensorFct}, ${censorFctTakesPath})
      }
    }
  ` : "";
    }
    __name(dynamicRedactTmpl, "dynamicRedactTmpl");
    function resultTmpl(serialize) {
      return serialize === false ? `return o` : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `;
    }
    __name(resultTmpl, "resultTmpl");
    function strictImpl(strict, serialize) {
      return strict === true ? `throw Error('fast-redact: primitives cannot be redacted')` : serialize === false ? `return o` : `return this.serialize(o)`;
    }
    __name(strictImpl, "strictImpl");
  }
});

// node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/lib/modifiers.js
var require_modifiers = __commonJS({
  "node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/lib/modifiers.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      groupRedact,
      groupRestore,
      nestedRedact,
      nestedRestore
    };
    function groupRestore({ keys: keys4, values, target }) {
      if (target == null || typeof target === "string")
        return;
      const length = keys4.length;
      for (var i = 0; i < length; i++) {
        const k = keys4[i];
        target[k] = values[i];
      }
    }
    __name(groupRestore, "groupRestore");
    function groupRedact(o, path, censor, isCensorFct, censorFctTakesPath) {
      const target = get(o, path);
      if (target == null || typeof target === "string")
        return { keys: null, values: null, target, flat: true };
      const keys4 = Object.keys(target);
      const keysLength = keys4.length;
      const pathLength = path.length;
      const pathWithKey = censorFctTakesPath ? [...path] : void 0;
      const values = new Array(keysLength);
      for (var i = 0; i < keysLength; i++) {
        const key = keys4[i];
        values[i] = target[key];
        if (censorFctTakesPath) {
          pathWithKey[pathLength] = key;
          target[key] = censor(target[key], pathWithKey);
        } else if (isCensorFct) {
          target[key] = censor(target[key]);
        } else {
          target[key] = censor;
        }
      }
      return { keys: keys4, values, target, flat: true };
    }
    __name(groupRedact, "groupRedact");
    function nestedRestore(instructions) {
      for (let i = 0; i < instructions.length; i++) {
        const { target, path, value } = instructions[i];
        let current = target;
        for (let i2 = path.length - 1; i2 > 0; i2--) {
          current = current[path[i2]];
        }
        current[path[0]] = value;
      }
    }
    __name(nestedRestore, "nestedRestore");
    function nestedRedact(store, o, path, ns, censor, isCensorFct, censorFctTakesPath) {
      const target = get(o, path);
      if (target == null)
        return;
      const keys4 = Object.keys(target);
      const keysLength = keys4.length;
      for (var i = 0; i < keysLength; i++) {
        const key = keys4[i];
        specialSet(store, target, key, path, ns, censor, isCensorFct, censorFctTakesPath);
      }
      return store;
    }
    __name(nestedRedact, "nestedRedact");
    function has(obj, prop) {
      return obj !== void 0 && obj !== null ? "hasOwn" in Object ? Object.hasOwn(obj, prop) : Object.prototype.hasOwnProperty.call(obj, prop) : false;
    }
    __name(has, "has");
    function specialSet(store, o, k, path, afterPath, censor, isCensorFct, censorFctTakesPath) {
      const afterPathLen = afterPath.length;
      const lastPathIndex = afterPathLen - 1;
      const originalKey = k;
      var i = -1;
      var n;
      var nv;
      var ov;
      var oov = null;
      var wc = null;
      var kIsWc;
      var wcov;
      var consecutive = false;
      var level = 0;
      var depth = 0;
      var redactPathCurrent = tree();
      ov = n = o[k];
      if (typeof n !== "object")
        return;
      while (n != null && ++i < afterPathLen) {
        depth += 1;
        k = afterPath[i];
        oov = ov;
        if (k !== "*" && !wc && !(typeof n === "object" && k in n)) {
          break;
        }
        if (k === "*") {
          if (wc === "*") {
            consecutive = true;
          }
          wc = k;
          if (i !== lastPathIndex) {
            continue;
          }
        }
        if (wc) {
          const wcKeys = Object.keys(n);
          for (var j = 0; j < wcKeys.length; j++) {
            const wck = wcKeys[j];
            wcov = n[wck];
            kIsWc = k === "*";
            if (consecutive) {
              redactPathCurrent = node(redactPathCurrent, wck, depth);
              level = i;
              ov = iterateNthLevel(wcov, level - 1, k, path, afterPath, censor, isCensorFct, censorFctTakesPath, originalKey, n, nv, ov, kIsWc, wck, i, lastPathIndex, redactPathCurrent, store, o[originalKey], depth + 1);
            } else {
              if (kIsWc || typeof wcov === "object" && wcov !== null && k in wcov) {
                if (kIsWc) {
                  ov = wcov;
                } else {
                  ov = wcov[k];
                }
                nv = i !== lastPathIndex ? ov : isCensorFct ? censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov) : censor;
                if (kIsWc) {
                  const rv = restoreInstr(node(redactPathCurrent, wck, depth), ov, o[originalKey]);
                  store.push(rv);
                  n[wck] = nv;
                } else {
                  if (wcov[k] === nv) {
                  } else if (nv === void 0 && censor !== void 0 || has(wcov, k) && nv === ov) {
                    redactPathCurrent = node(redactPathCurrent, wck, depth);
                  } else {
                    redactPathCurrent = node(redactPathCurrent, wck, depth);
                    const rv = restoreInstr(node(redactPathCurrent, k, depth + 1), ov, o[originalKey]);
                    store.push(rv);
                    wcov[k] = nv;
                  }
                }
              }
            }
          }
          wc = null;
        } else {
          ov = n[k];
          redactPathCurrent = node(redactPathCurrent, k, depth);
          nv = i !== lastPathIndex ? ov : isCensorFct ? censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov) : censor;
          if (has(n, k) && nv === ov || nv === void 0 && censor !== void 0) {
          } else {
            const rv = restoreInstr(redactPathCurrent, ov, o[originalKey]);
            store.push(rv);
            n[k] = nv;
          }
          n = n[k];
        }
        if (typeof n !== "object")
          break;
        if (ov === oov || typeof ov === "undefined") {
        }
      }
    }
    __name(specialSet, "specialSet");
    function get(o, p) {
      var i = -1;
      var l = p.length;
      var n = o;
      while (n != null && ++i < l) {
        n = n[p[i]];
      }
      return n;
    }
    __name(get, "get");
    function iterateNthLevel(wcov, level, k, path, afterPath, censor, isCensorFct, censorFctTakesPath, originalKey, n, nv, ov, kIsWc, wck, i, lastPathIndex, redactPathCurrent, store, parent, depth) {
      if (level === 0) {
        if (kIsWc || typeof wcov === "object" && wcov !== null && k in wcov) {
          if (kIsWc) {
            ov = wcov;
          } else {
            ov = wcov[k];
          }
          nv = i !== lastPathIndex ? ov : isCensorFct ? censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov) : censor;
          if (kIsWc) {
            const rv = restoreInstr(redactPathCurrent, ov, parent);
            store.push(rv);
            n[wck] = nv;
          } else {
            if (wcov[k] === nv) {
            } else if (nv === void 0 && censor !== void 0 || has(wcov, k) && nv === ov) {
            } else {
              const rv = restoreInstr(node(redactPathCurrent, k, depth + 1), ov, parent);
              store.push(rv);
              wcov[k] = nv;
            }
          }
        }
      }
      for (const key in wcov) {
        if (typeof wcov[key] === "object") {
          redactPathCurrent = node(redactPathCurrent, key, depth);
          iterateNthLevel(wcov[key], level - 1, k, path, afterPath, censor, isCensorFct, censorFctTakesPath, originalKey, n, nv, ov, kIsWc, wck, i, lastPathIndex, redactPathCurrent, store, parent, depth + 1);
        }
      }
    }
    __name(iterateNthLevel, "iterateNthLevel");
    function tree() {
      return { parent: null, key: null, children: [], depth: 0 };
    }
    __name(tree, "tree");
    function node(parent, key, depth) {
      if (parent.depth === depth) {
        return node(parent.parent, key, depth);
      }
      var child = {
        parent,
        key,
        depth,
        children: []
      };
      parent.children.push(child);
      return child;
    }
    __name(node, "node");
    function restoreInstr(node2, value, target) {
      let current = node2;
      const path = [];
      do {
        path.push(current.key);
        current = current.parent;
      } while (current.parent != null);
      return { path, value, target };
    }
    __name(restoreInstr, "restoreInstr");
  }
});

// node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/lib/restorer.js
var require_restorer = __commonJS({
  "node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/lib/restorer.js"(exports2, module2) {
    "use strict";
    var { groupRestore, nestedRestore } = require_modifiers();
    module2.exports = restorer;
    function restorer() {
      return /* @__PURE__ */ __name(function compileRestore() {
        if (this.restore) {
          this.restore.state.secret = this.secret;
          return;
        }
        const { secret, wcLen } = this;
        const paths = Object.keys(secret);
        const resetters = resetTmpl(secret, paths);
        const hasWildcards = wcLen > 0;
        const state = hasWildcards ? { secret, groupRestore, nestedRestore } : { secret };
        this.restore = Function(
          "o",
          restoreTmpl(resetters, paths, hasWildcards)
        ).bind(state);
        this.restore.state = state;
      }, "compileRestore");
    }
    __name(restorer, "restorer");
    function resetTmpl(secret, paths) {
      return paths.map((path) => {
        const { circle, escPath, leadingBracket } = secret[path];
        const delim = leadingBracket ? "" : ".";
        const reset = circle ? `o.${circle} = secret[${escPath}].val` : `o${delim}${path} = secret[${escPath}].val`;
        const clear = `secret[${escPath}].val = undefined`;
        return `
      if (secret[${escPath}].val !== undefined) {
        try { ${reset} } catch (e) {}
        ${clear}
      }
    `;
      }).join("");
    }
    __name(resetTmpl, "resetTmpl");
    function restoreTmpl(resetters, paths, hasWildcards) {
      const dynamicReset = hasWildcards === true ? `
    const keys = Object.keys(secret)
    const len = keys.length
    for (var i = len - 1; i >= ${paths.length}; i--) {
      const k = keys[i]
      const o = secret[k]
      if (o) {
        if (o.flat === true) this.groupRestore(o)
        else this.nestedRestore(o)
        secret[k] = null
      }
    }
  ` : "";
      return `
    const secret = this.secret
    ${dynamicReset}
    ${resetters}
    return o
  `;
    }
    __name(restoreTmpl, "restoreTmpl");
  }
});

// node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/lib/state.js
var require_state = __commonJS({
  "node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/lib/state.js"(exports2, module2) {
    "use strict";
    module2.exports = state;
    function state(o) {
      const {
        secret,
        censor,
        compileRestore,
        serialize,
        groupRedact,
        nestedRedact,
        wildcards,
        wcLen
      } = o;
      const builder = [{ secret, censor, compileRestore }];
      if (serialize !== false)
        builder.push({ serialize });
      if (wcLen > 0)
        builder.push({ groupRedact, nestedRedact, wildcards, wcLen });
      return Object.assign(...builder);
    }
    __name(state, "state");
  }
});

// node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/index.js
var require_fast_redact = __commonJS({
  "node_modules/.pnpm/fast-redact@3.5.0/node_modules/fast-redact/index.js"(exports2, module2) {
    "use strict";
    var validator = require_validator();
    var parse = require_parse();
    var redactor = require_redactor();
    var restorer = require_restorer();
    var { groupRedact, nestedRedact } = require_modifiers();
    var state = require_state();
    var rx = require_rx();
    var validate = validator();
    var noop = /* @__PURE__ */ __name((o) => o, "noop");
    noop.restore = noop;
    var DEFAULT_CENSOR = "[REDACTED]";
    fastRedact.rx = rx;
    fastRedact.validator = validator;
    module2.exports = fastRedact;
    function fastRedact(opts = {}) {
      const paths = Array.from(new Set(opts.paths || []));
      const serialize = "serialize" in opts ? opts.serialize === false ? opts.serialize : typeof opts.serialize === "function" ? opts.serialize : JSON.stringify : JSON.stringify;
      const remove = opts.remove;
      if (remove === true && serialize !== JSON.stringify) {
        throw Error("fast-redact \u2013 remove option may only be set when serializer is JSON.stringify");
      }
      const censor = remove === true ? void 0 : "censor" in opts ? opts.censor : DEFAULT_CENSOR;
      const isCensorFct = typeof censor === "function";
      const censorFctTakesPath = isCensorFct && censor.length > 1;
      if (paths.length === 0)
        return serialize || noop;
      validate({ paths, serialize, censor });
      const { wildcards, wcLen, secret } = parse({ paths, censor });
      const compileRestore = restorer();
      const strict = "strict" in opts ? opts.strict : true;
      return redactor({ secret, wcLen, serialize, strict, isCensorFct, censorFctTakesPath }, state({
        secret,
        censor,
        compileRestore,
        serialize,
        groupRedact,
        nestedRedact,
        wildcards,
        wcLen
      }));
    }
    __name(fastRedact, "fastRedact");
  }
});

// node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/symbols.js
var require_symbols = __commonJS({
  "node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/symbols.js"(exports2, module2) {
    "use strict";
    var setLevelSym = Symbol("pino.setLevel");
    var getLevelSym = Symbol("pino.getLevel");
    var levelValSym = Symbol("pino.levelVal");
    var levelCompSym = Symbol("pino.levelComp");
    var useLevelLabelsSym = Symbol("pino.useLevelLabels");
    var useOnlyCustomLevelsSym = Symbol("pino.useOnlyCustomLevels");
    var mixinSym = Symbol("pino.mixin");
    var lsCacheSym = Symbol("pino.lsCache");
    var chindingsSym = Symbol("pino.chindings");
    var asJsonSym = Symbol("pino.asJson");
    var writeSym = Symbol("pino.write");
    var redactFmtSym = Symbol("pino.redactFmt");
    var timeSym = Symbol("pino.time");
    var timeSliceIndexSym = Symbol("pino.timeSliceIndex");
    var streamSym = Symbol("pino.stream");
    var stringifySym = Symbol("pino.stringify");
    var stringifySafeSym = Symbol("pino.stringifySafe");
    var stringifiersSym = Symbol("pino.stringifiers");
    var endSym = Symbol("pino.end");
    var formatOptsSym = Symbol("pino.formatOpts");
    var messageKeySym = Symbol("pino.messageKey");
    var errorKeySym = Symbol("pino.errorKey");
    var nestedKeySym = Symbol("pino.nestedKey");
    var nestedKeyStrSym = Symbol("pino.nestedKeyStr");
    var mixinMergeStrategySym = Symbol("pino.mixinMergeStrategy");
    var msgPrefixSym = Symbol("pino.msgPrefix");
    var wildcardFirstSym = Symbol("pino.wildcardFirst");
    var serializersSym = Symbol.for("pino.serializers");
    var formattersSym = Symbol.for("pino.formatters");
    var hooksSym = Symbol.for("pino.hooks");
    var needsMetadataGsym = Symbol.for("pino.metadata");
    module2.exports = {
      setLevelSym,
      getLevelSym,
      levelValSym,
      levelCompSym,
      useLevelLabelsSym,
      mixinSym,
      lsCacheSym,
      chindingsSym,
      asJsonSym,
      writeSym,
      serializersSym,
      redactFmtSym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      stringifySym,
      stringifySafeSym,
      stringifiersSym,
      endSym,
      formatOptsSym,
      messageKeySym,
      errorKeySym,
      nestedKeySym,
      wildcardFirstSym,
      needsMetadataGsym,
      useOnlyCustomLevelsSym,
      formattersSym,
      hooksSym,
      nestedKeyStrSym,
      mixinMergeStrategySym,
      msgPrefixSym
    };
  }
});

// node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/redaction.js
var require_redaction = __commonJS({
  "node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/redaction.js"(exports2, module2) {
    "use strict";
    var fastRedact = require_fast_redact();
    var { redactFmtSym, wildcardFirstSym } = require_symbols();
    var { rx, validator } = fastRedact;
    var validate = validator({
      ERR_PATHS_MUST_BE_STRINGS: () => "pino \u2013 redacted paths must be strings",
      ERR_INVALID_PATH: (s) => `pino \u2013 redact paths array contains an invalid path (${s})`
    });
    var CENSOR = "[Redacted]";
    var strict = false;
    function redaction(opts, serialize) {
      const { paths, censor } = handle(opts);
      const shape = paths.reduce((o, str) => {
        rx.lastIndex = 0;
        const first = rx.exec(str);
        const next = rx.exec(str);
        let ns = first[1] !== void 0 ? first[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, "$1") : first[0];
        if (ns === "*") {
          ns = wildcardFirstSym;
        }
        if (next === null) {
          o[ns] = null;
          return o;
        }
        if (o[ns] === null) {
          return o;
        }
        const { index } = next;
        const nextPath = `${str.substr(index, str.length - 1)}`;
        o[ns] = o[ns] || [];
        if (ns !== wildcardFirstSym && o[ns].length === 0) {
          o[ns].push(...o[wildcardFirstSym] || []);
        }
        if (ns === wildcardFirstSym) {
          Object.keys(o).forEach(function(k) {
            if (o[k]) {
              o[k].push(nextPath);
            }
          });
        }
        o[ns].push(nextPath);
        return o;
      }, {});
      const result = {
        [redactFmtSym]: fastRedact({ paths, censor, serialize, strict })
      };
      const topCensor = /* @__PURE__ */ __name((...args2) => {
        return typeof censor === "function" ? serialize(censor(...args2)) : serialize(censor);
      }, "topCensor");
      return [...Object.keys(shape), ...Object.getOwnPropertySymbols(shape)].reduce((o, k) => {
        if (shape[k] === null) {
          o[k] = (value) => topCensor(value, [k]);
        } else {
          const wrappedCensor = typeof censor === "function" ? (value, path) => {
            return censor(value, [k, ...path]);
          } : censor;
          o[k] = fastRedact({
            paths: shape[k],
            censor: wrappedCensor,
            serialize,
            strict
          });
        }
        return o;
      }, result);
    }
    __name(redaction, "redaction");
    function handle(opts) {
      if (Array.isArray(opts)) {
        opts = { paths: opts, censor: CENSOR };
        validate(opts);
        return opts;
      }
      let { paths, censor = CENSOR, remove } = opts;
      if (Array.isArray(paths) === false) {
        throw Error("pino \u2013 redact must contain an array of strings");
      }
      if (remove === true)
        censor = void 0;
      validate({ paths, censor });
      return { paths, censor };
    }
    __name(handle, "handle");
    module2.exports = redaction;
  }
});

// node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/time.js
var require_time = __commonJS({
  "node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/time.js"(exports2, module2) {
    "use strict";
    var nullTime = /* @__PURE__ */ __name(() => "", "nullTime");
    var epochTime = /* @__PURE__ */ __name(() => `,"time":${Date.now()}`, "epochTime");
    var unixTime = /* @__PURE__ */ __name(() => `,"time":${Math.round(Date.now() / 1e3)}`, "unixTime");
    var isoTime = /* @__PURE__ */ __name(() => `,"time":"${new Date(Date.now()).toISOString()}"`, "isoTime");
    module2.exports = { nullTime, epochTime, unixTime, isoTime };
  }
});

// node_modules/.pnpm/quick-format-unescaped@4.0.4/node_modules/quick-format-unescaped/index.js
var require_quick_format_unescaped = __commonJS({
  "node_modules/.pnpm/quick-format-unescaped@4.0.4/node_modules/quick-format-unescaped/index.js"(exports2, module2) {
    "use strict";
    function tryStringify(o) {
      try {
        return JSON.stringify(o);
      } catch (e) {
        return '"[Circular]"';
      }
    }
    __name(tryStringify, "tryStringify");
    module2.exports = format;
    function format(f, args2, opts) {
      var ss = opts && opts.stringify || tryStringify;
      var offset = 1;
      if (typeof f === "object" && f !== null) {
        var len = args2.length + offset;
        if (len === 1)
          return f;
        var objects = new Array(len);
        objects[0] = ss(f);
        for (var index = 1; index < len; index++) {
          objects[index] = ss(args2[index]);
        }
        return objects.join(" ");
      }
      if (typeof f !== "string") {
        return f;
      }
      var argLen = args2.length;
      if (argLen === 0)
        return f;
      var str = "";
      var a = 1 - offset;
      var lastPos = -1;
      var flen = f && f.length || 0;
      for (var i = 0; i < flen; ) {
        if (f.charCodeAt(i) === 37 && i + 1 < flen) {
          lastPos = lastPos > -1 ? lastPos : 0;
          switch (f.charCodeAt(i + 1)) {
            case 100:
            case 102:
              if (a >= argLen)
                break;
              if (args2[a] == null)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += Number(args2[a]);
              lastPos = i + 2;
              i++;
              break;
            case 105:
              if (a >= argLen)
                break;
              if (args2[a] == null)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += Math.floor(Number(args2[a]));
              lastPos = i + 2;
              i++;
              break;
            case 79:
            case 111:
            case 106:
              if (a >= argLen)
                break;
              if (args2[a] === void 0)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              var type = typeof args2[a];
              if (type === "string") {
                str += "'" + args2[a] + "'";
                lastPos = i + 2;
                i++;
                break;
              }
              if (type === "function") {
                str += args2[a].name || "<anonymous>";
                lastPos = i + 2;
                i++;
                break;
              }
              str += ss(args2[a]);
              lastPos = i + 2;
              i++;
              break;
            case 115:
              if (a >= argLen)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += String(args2[a]);
              lastPos = i + 2;
              i++;
              break;
            case 37:
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += "%";
              lastPos = i + 2;
              i++;
              a--;
              break;
          }
          ++a;
        }
        ++i;
      }
      if (lastPos === -1)
        return f;
      else if (lastPos < flen) {
        str += f.slice(lastPos);
      }
      return str;
    }
    __name(format, "format");
  }
});

// node_modules/.pnpm/atomic-sleep@1.0.0/node_modules/atomic-sleep/index.js
var require_atomic_sleep = __commonJS({
  "node_modules/.pnpm/atomic-sleep@1.0.0/node_modules/atomic-sleep/index.js"(exports2, module2) {
    "use strict";
    if (typeof SharedArrayBuffer !== "undefined" && typeof Atomics !== "undefined") {
      let sleep = function(ms) {
        const valid = ms > 0 && ms < Infinity;
        if (valid === false) {
          if (typeof ms !== "number" && typeof ms !== "bigint") {
            throw TypeError("sleep: ms must be a number");
          }
          throw RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
        }
        Atomics.wait(nil, 0, 0, Number(ms));
      };
      __name(sleep, "sleep");
      const nil = new Int32Array(new SharedArrayBuffer(4));
      module2.exports = sleep;
    } else {
      let sleep = function(ms) {
        const valid = ms > 0 && ms < Infinity;
        if (valid === false) {
          if (typeof ms !== "number" && typeof ms !== "bigint") {
            throw TypeError("sleep: ms must be a number");
          }
          throw RangeError("sleep: ms must be a number that is greater than 0 but less than Infinity");
        }
        const target = Date.now() + Number(ms);
        while (target > Date.now()) {
        }
      };
      __name(sleep, "sleep");
      module2.exports = sleep;
    }
  }
});

// node_modules/.pnpm/sonic-boom@4.0.1/node_modules/sonic-boom/index.js
var require_sonic_boom = __commonJS({
  "node_modules/.pnpm/sonic-boom@4.0.1/node_modules/sonic-boom/index.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var EventEmitter = require("events");
    var inherits = require("util").inherits;
    var path = require("path");
    var sleep = require_atomic_sleep();
    var BUSY_WRITE_TIMEOUT = 100;
    var kEmptyBuffer = Buffer.allocUnsafe(0);
    var MAX_WRITE = 16 * 1024;
    var kContentModeBuffer = "buffer";
    var kContentModeUtf8 = "utf8";
    function openFile(file, sonic) {
      sonic._opening = true;
      sonic._writing = true;
      sonic._asyncDrainScheduled = false;
      function fileOpened(err, fd) {
        if (err) {
          sonic._reopening = false;
          sonic._writing = false;
          sonic._opening = false;
          if (sonic.sync) {
            process.nextTick(() => {
              if (sonic.listenerCount("error") > 0) {
                sonic.emit("error", err);
              }
            });
          } else {
            sonic.emit("error", err);
          }
          return;
        }
        const reopening = sonic._reopening;
        sonic.fd = fd;
        sonic.file = file;
        sonic._reopening = false;
        sonic._opening = false;
        sonic._writing = false;
        if (sonic.sync) {
          process.nextTick(() => sonic.emit("ready"));
        } else {
          sonic.emit("ready");
        }
        if (sonic.destroyed) {
          return;
        }
        if (!sonic._writing && sonic._len > sonic.minLength || sonic._flushPending) {
          sonic._actualWrite();
        } else if (reopening) {
          process.nextTick(() => sonic.emit("drain"));
        }
      }
      __name(fileOpened, "fileOpened");
      const flags = sonic.append ? "a" : "w";
      const mode = sonic.mode;
      if (sonic.sync) {
        try {
          if (sonic.mkdir)
            fs.mkdirSync(path.dirname(file), { recursive: true });
          const fd = fs.openSync(file, flags, mode);
          fileOpened(null, fd);
        } catch (err) {
          fileOpened(err);
          throw err;
        }
      } else if (sonic.mkdir) {
        fs.mkdir(path.dirname(file), { recursive: true }, (err) => {
          if (err)
            return fileOpened(err);
          fs.open(file, flags, mode, fileOpened);
        });
      } else {
        fs.open(file, flags, mode, fileOpened);
      }
    }
    __name(openFile, "openFile");
    function SonicBoom(opts) {
      if (!(this instanceof SonicBoom)) {
        return new SonicBoom(opts);
      }
      let { fd, dest, minLength, maxLength, maxWrite, sync, append = true, mkdir, retryEAGAIN, fsync, contentMode, mode } = opts || {};
      fd = fd || dest;
      this._len = 0;
      this.fd = -1;
      this._bufs = [];
      this._lens = [];
      this._writing = false;
      this._ending = false;
      this._reopening = false;
      this._asyncDrainScheduled = false;
      this._flushPending = false;
      this._hwm = Math.max(minLength || 0, 16387);
      this.file = null;
      this.destroyed = false;
      this.minLength = minLength || 0;
      this.maxLength = maxLength || 0;
      this.maxWrite = maxWrite || MAX_WRITE;
      this.sync = sync || false;
      this.writable = true;
      this._fsync = fsync || false;
      this.append = append || false;
      this.mode = mode;
      this.retryEAGAIN = retryEAGAIN || (() => true);
      this.mkdir = mkdir || false;
      let fsWriteSync;
      let fsWrite;
      if (contentMode === kContentModeBuffer) {
        this._writingBuf = kEmptyBuffer;
        this.write = writeBuffer;
        this.flush = flushBuffer;
        this.flushSync = flushBufferSync;
        this._actualWrite = actualWriteBuffer;
        fsWriteSync = /* @__PURE__ */ __name(() => fs.writeSync(this.fd, this._writingBuf), "fsWriteSync");
        fsWrite = /* @__PURE__ */ __name(() => fs.write(this.fd, this._writingBuf, this.release), "fsWrite");
      } else if (contentMode === void 0 || contentMode === kContentModeUtf8) {
        this._writingBuf = "";
        this.write = write2;
        this.flush = flush;
        this.flushSync = flushSync;
        this._actualWrite = actualWrite;
        fsWriteSync = /* @__PURE__ */ __name(() => fs.writeSync(this.fd, this._writingBuf, "utf8"), "fsWriteSync");
        fsWrite = /* @__PURE__ */ __name(() => fs.write(this.fd, this._writingBuf, "utf8", this.release), "fsWrite");
      } else {
        throw new Error(`SonicBoom supports "${kContentModeUtf8}" and "${kContentModeBuffer}", but passed ${contentMode}`);
      }
      if (typeof fd === "number") {
        this.fd = fd;
        process.nextTick(() => this.emit("ready"));
      } else if (typeof fd === "string") {
        openFile(fd, this);
      } else {
        throw new Error("SonicBoom supports only file descriptors and files");
      }
      if (this.minLength >= this.maxWrite) {
        throw new Error(`minLength should be smaller than maxWrite (${this.maxWrite})`);
      }
      this.release = (err, n) => {
        if (err) {
          if ((err.code === "EAGAIN" || err.code === "EBUSY") && this.retryEAGAIN(err, this._writingBuf.length, this._len - this._writingBuf.length)) {
            if (this.sync) {
              try {
                sleep(BUSY_WRITE_TIMEOUT);
                this.release(void 0, 0);
              } catch (err2) {
                this.release(err2);
              }
            } else {
              setTimeout(fsWrite, BUSY_WRITE_TIMEOUT);
            }
          } else {
            this._writing = false;
            this.emit("error", err);
          }
          return;
        }
        this.emit("write", n);
        const releasedBufObj = releaseWritingBuf(this._writingBuf, this._len, n);
        this._len = releasedBufObj.len;
        this._writingBuf = releasedBufObj.writingBuf;
        if (this._writingBuf.length) {
          if (!this.sync) {
            fsWrite();
            return;
          }
          try {
            do {
              const n2 = fsWriteSync();
              const releasedBufObj2 = releaseWritingBuf(this._writingBuf, this._len, n2);
              this._len = releasedBufObj2.len;
              this._writingBuf = releasedBufObj2.writingBuf;
            } while (this._writingBuf.length);
          } catch (err2) {
            this.release(err2);
            return;
          }
        }
        if (this._fsync) {
          fs.fsyncSync(this.fd);
        }
        const len = this._len;
        if (this._reopening) {
          this._writing = false;
          this._reopening = false;
          this.reopen();
        } else if (len > this.minLength) {
          this._actualWrite();
        } else if (this._ending) {
          if (len > 0) {
            this._actualWrite();
          } else {
            this._writing = false;
            actualClose(this);
          }
        } else {
          this._writing = false;
          if (this.sync) {
            if (!this._asyncDrainScheduled) {
              this._asyncDrainScheduled = true;
              process.nextTick(emitDrain, this);
            }
          } else {
            this.emit("drain");
          }
        }
      };
      this.on("newListener", function(name) {
        if (name === "drain") {
          this._asyncDrainScheduled = false;
        }
      });
    }
    __name(SonicBoom, "SonicBoom");
    function releaseWritingBuf(writingBuf, len, n) {
      if (typeof writingBuf === "string" && Buffer.byteLength(writingBuf) !== n) {
        n = Buffer.from(writingBuf).subarray(0, n).toString().length;
      }
      len = Math.max(len - n, 0);
      writingBuf = writingBuf.slice(n);
      return { writingBuf, len };
    }
    __name(releaseWritingBuf, "releaseWritingBuf");
    function emitDrain(sonic) {
      const hasListeners = sonic.listenerCount("drain") > 0;
      if (!hasListeners)
        return;
      sonic._asyncDrainScheduled = false;
      sonic.emit("drain");
    }
    __name(emitDrain, "emitDrain");
    inherits(SonicBoom, EventEmitter);
    function mergeBuf(bufs, len) {
      if (bufs.length === 0) {
        return kEmptyBuffer;
      }
      if (bufs.length === 1) {
        return bufs[0];
      }
      return Buffer.concat(bufs, len);
    }
    __name(mergeBuf, "mergeBuf");
    function write2(data) {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      const len = this._len + data.length;
      const bufs = this._bufs;
      if (this.maxLength && len > this.maxLength) {
        this.emit("drop", data);
        return this._len < this._hwm;
      }
      if (bufs.length === 0 || bufs[bufs.length - 1].length + data.length > this.maxWrite) {
        bufs.push("" + data);
      } else {
        bufs[bufs.length - 1] += data;
      }
      this._len = len;
      if (!this._writing && this._len >= this.minLength) {
        this._actualWrite();
      }
      return this._len < this._hwm;
    }
    __name(write2, "write");
    function writeBuffer(data) {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      const len = this._len + data.length;
      const bufs = this._bufs;
      const lens = this._lens;
      if (this.maxLength && len > this.maxLength) {
        this.emit("drop", data);
        return this._len < this._hwm;
      }
      if (bufs.length === 0 || lens[lens.length - 1] + data.length > this.maxWrite) {
        bufs.push([data]);
        lens.push(data.length);
      } else {
        bufs[bufs.length - 1].push(data);
        lens[lens.length - 1] += data.length;
      }
      this._len = len;
      if (!this._writing && this._len >= this.minLength) {
        this._actualWrite();
      }
      return this._len < this._hwm;
    }
    __name(writeBuffer, "writeBuffer");
    function callFlushCallbackOnDrain(cb) {
      this._flushPending = true;
      const onDrain = /* @__PURE__ */ __name(() => {
        if (!this._fsync) {
          fs.fsync(this.fd, (err) => {
            this._flushPending = false;
            cb(err);
          });
        } else {
          this._flushPending = false;
          cb();
        }
        this.off("error", onError);
      }, "onDrain");
      const onError = /* @__PURE__ */ __name((err) => {
        this._flushPending = false;
        cb(err);
        this.off("drain", onDrain);
      }, "onError");
      this.once("drain", onDrain);
      this.once("error", onError);
    }
    __name(callFlushCallbackOnDrain, "callFlushCallbackOnDrain");
    function flush(cb) {
      if (cb != null && typeof cb !== "function") {
        throw new Error("flush cb must be a function");
      }
      if (this.destroyed) {
        const error = new Error("SonicBoom destroyed");
        if (cb) {
          cb(error);
          return;
        }
        throw error;
      }
      if (this.minLength <= 0) {
        cb?.();
        return;
      }
      if (cb) {
        callFlushCallbackOnDrain.call(this, cb);
      }
      if (this._writing) {
        return;
      }
      if (this._bufs.length === 0) {
        this._bufs.push("");
      }
      this._actualWrite();
    }
    __name(flush, "flush");
    function flushBuffer(cb) {
      if (cb != null && typeof cb !== "function") {
        throw new Error("flush cb must be a function");
      }
      if (this.destroyed) {
        const error = new Error("SonicBoom destroyed");
        if (cb) {
          cb(error);
          return;
        }
        throw error;
      }
      if (this.minLength <= 0) {
        cb?.();
        return;
      }
      if (cb) {
        callFlushCallbackOnDrain.call(this, cb);
      }
      if (this._writing) {
        return;
      }
      if (this._bufs.length === 0) {
        this._bufs.push([]);
        this._lens.push(0);
      }
      this._actualWrite();
    }
    __name(flushBuffer, "flushBuffer");
    SonicBoom.prototype.reopen = function(file) {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this._opening) {
        this.once("ready", () => {
          this.reopen(file);
        });
        return;
      }
      if (this._ending) {
        return;
      }
      if (!this.file) {
        throw new Error("Unable to reopen a file descriptor, you must pass a file to SonicBoom");
      }
      if (file) {
        this.file = file;
      }
      this._reopening = true;
      if (this._writing) {
        return;
      }
      const fd = this.fd;
      this.once("ready", () => {
        if (fd !== this.fd) {
          fs.close(fd, (err) => {
            if (err) {
              return this.emit("error", err);
            }
          });
        }
      });
      openFile(this.file, this);
    };
    SonicBoom.prototype.end = function() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this._opening) {
        this.once("ready", () => {
          this.end();
        });
        return;
      }
      if (this._ending) {
        return;
      }
      this._ending = true;
      if (this._writing) {
        return;
      }
      if (this._len > 0 && this.fd >= 0) {
        this._actualWrite();
      } else {
        actualClose(this);
      }
    };
    function flushSync() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this.fd < 0) {
        throw new Error("sonic boom is not ready yet");
      }
      if (!this._writing && this._writingBuf.length > 0) {
        this._bufs.unshift(this._writingBuf);
        this._writingBuf = "";
      }
      let buf = "";
      while (this._bufs.length || buf) {
        if (buf.length <= 0) {
          buf = this._bufs[0];
        }
        try {
          const n = fs.writeSync(this.fd, buf, "utf8");
          const releasedBufObj = releaseWritingBuf(buf, this._len, n);
          buf = releasedBufObj.writingBuf;
          this._len = releasedBufObj.len;
          if (buf.length <= 0) {
            this._bufs.shift();
          }
        } catch (err) {
          const shouldRetry = err.code === "EAGAIN" || err.code === "EBUSY";
          if (shouldRetry && !this.retryEAGAIN(err, buf.length, this._len - buf.length)) {
            throw err;
          }
          sleep(BUSY_WRITE_TIMEOUT);
        }
      }
      try {
        fs.fsyncSync(this.fd);
      } catch {
      }
    }
    __name(flushSync, "flushSync");
    function flushBufferSync() {
      if (this.destroyed) {
        throw new Error("SonicBoom destroyed");
      }
      if (this.fd < 0) {
        throw new Error("sonic boom is not ready yet");
      }
      if (!this._writing && this._writingBuf.length > 0) {
        this._bufs.unshift([this._writingBuf]);
        this._writingBuf = kEmptyBuffer;
      }
      let buf = kEmptyBuffer;
      while (this._bufs.length || buf.length) {
        if (buf.length <= 0) {
          buf = mergeBuf(this._bufs[0], this._lens[0]);
        }
        try {
          const n = fs.writeSync(this.fd, buf);
          buf = buf.subarray(n);
          this._len = Math.max(this._len - n, 0);
          if (buf.length <= 0) {
            this._bufs.shift();
            this._lens.shift();
          }
        } catch (err) {
          const shouldRetry = err.code === "EAGAIN" || err.code === "EBUSY";
          if (shouldRetry && !this.retryEAGAIN(err, buf.length, this._len - buf.length)) {
            throw err;
          }
          sleep(BUSY_WRITE_TIMEOUT);
        }
      }
    }
    __name(flushBufferSync, "flushBufferSync");
    SonicBoom.prototype.destroy = function() {
      if (this.destroyed) {
        return;
      }
      actualClose(this);
    };
    function actualWrite() {
      const release = this.release;
      this._writing = true;
      this._writingBuf = this._writingBuf || this._bufs.shift() || "";
      if (this.sync) {
        try {
          const written = fs.writeSync(this.fd, this._writingBuf, "utf8");
          release(null, written);
        } catch (err) {
          release(err);
        }
      } else {
        fs.write(this.fd, this._writingBuf, "utf8", release);
      }
    }
    __name(actualWrite, "actualWrite");
    function actualWriteBuffer() {
      const release = this.release;
      this._writing = true;
      this._writingBuf = this._writingBuf.length ? this._writingBuf : mergeBuf(this._bufs.shift(), this._lens.shift());
      if (this.sync) {
        try {
          const written = fs.writeSync(this.fd, this._writingBuf);
          release(null, written);
        } catch (err) {
          release(err);
        }
      } else {
        fs.write(this.fd, this._writingBuf, release);
      }
    }
    __name(actualWriteBuffer, "actualWriteBuffer");
    function actualClose(sonic) {
      if (sonic.fd === -1) {
        sonic.once("ready", actualClose.bind(null, sonic));
        return;
      }
      sonic.destroyed = true;
      sonic._bufs = [];
      sonic._lens = [];
      fs.fsync(sonic.fd, closeWrapped);
      function closeWrapped() {
        if (sonic.fd !== 1 && sonic.fd !== 2) {
          fs.close(sonic.fd, done);
        } else {
          done();
        }
      }
      __name(closeWrapped, "closeWrapped");
      function done(err) {
        if (err) {
          sonic.emit("error", err);
          return;
        }
        if (sonic._ending && !sonic._writing) {
          sonic.emit("finish");
        }
        sonic.emit("close");
      }
      __name(done, "done");
    }
    __name(actualClose, "actualClose");
    SonicBoom.SonicBoom = SonicBoom;
    SonicBoom.default = SonicBoom;
    module2.exports = SonicBoom;
  }
});

// node_modules/.pnpm/on-exit-leak-free@2.1.2/node_modules/on-exit-leak-free/index.js
var require_on_exit_leak_free = __commonJS({
  "node_modules/.pnpm/on-exit-leak-free@2.1.2/node_modules/on-exit-leak-free/index.js"(exports2, module2) {
    "use strict";
    var refs = {
      exit: [],
      beforeExit: []
    };
    var functions = {
      exit: onExit,
      beforeExit: onBeforeExit
    };
    var registry;
    function ensureRegistry() {
      if (registry === void 0) {
        registry = new FinalizationRegistry(clear);
      }
    }
    __name(ensureRegistry, "ensureRegistry");
    function install(event) {
      if (refs[event].length > 0) {
        return;
      }
      process.on(event, functions[event]);
    }
    __name(install, "install");
    function uninstall(event) {
      if (refs[event].length > 0) {
        return;
      }
      process.removeListener(event, functions[event]);
      if (refs.exit.length === 0 && refs.beforeExit.length === 0) {
        registry = void 0;
      }
    }
    __name(uninstall, "uninstall");
    function onExit() {
      callRefs("exit");
    }
    __name(onExit, "onExit");
    function onBeforeExit() {
      callRefs("beforeExit");
    }
    __name(onBeforeExit, "onBeforeExit");
    function callRefs(event) {
      for (const ref of refs[event]) {
        const obj = ref.deref();
        const fn = ref.fn;
        if (obj !== void 0) {
          fn(obj, event);
        }
      }
      refs[event] = [];
    }
    __name(callRefs, "callRefs");
    function clear(ref) {
      for (const event of ["exit", "beforeExit"]) {
        const index = refs[event].indexOf(ref);
        refs[event].splice(index, index + 1);
        uninstall(event);
      }
    }
    __name(clear, "clear");
    function _register(event, obj, fn) {
      if (obj === void 0) {
        throw new Error("the object can't be undefined");
      }
      install(event);
      const ref = new WeakRef(obj);
      ref.fn = fn;
      ensureRegistry();
      registry.register(obj, ref);
      refs[event].push(ref);
    }
    __name(_register, "_register");
    function register(obj, fn) {
      _register("exit", obj, fn);
    }
    __name(register, "register");
    function registerBeforeExit(obj, fn) {
      _register("beforeExit", obj, fn);
    }
    __name(registerBeforeExit, "registerBeforeExit");
    function unregister(obj) {
      if (registry === void 0) {
        return;
      }
      registry.unregister(obj);
      for (const event of ["exit", "beforeExit"]) {
        refs[event] = refs[event].filter((ref) => {
          const _obj = ref.deref();
          return _obj && _obj !== obj;
        });
        uninstall(event);
      }
    }
    __name(unregister, "unregister");
    module2.exports = {
      register,
      registerBeforeExit,
      unregister
    };
  }
});

// node_modules/.pnpm/thread-stream@3.0.0/node_modules/thread-stream/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/thread-stream@3.0.0/node_modules/thread-stream/package.json"(exports2, module2) {
    module2.exports = {
      name: "thread-stream",
      version: "3.0.0",
      description: "A streaming way to send data to a Node.js Worker Thread",
      main: "index.js",
      types: "index.d.ts",
      dependencies: {
        "real-require": "^0.2.0"
      },
      devDependencies: {
        "@types/node": "^20.1.0",
        "@types/tap": "^15.0.0",
        "@yao-pkg/pkg": "^5.11.5",
        desm: "^1.3.0",
        fastbench: "^1.0.1",
        husky: "^9.0.6",
        "pino-elasticsearch": "^8.0.0",
        "sonic-boom": "^3.0.0",
        standard: "^17.0.0",
        tap: "^16.2.0",
        "ts-node": "^10.8.0",
        typescript: "^5.3.2",
        "why-is-node-running": "^2.2.2"
      },
      scripts: {
        test: 'standard && npm run transpile && tap "test/**/*.test.*js" && tap --ts test/*.test.*ts',
        "test:ci": "standard && npm run transpile && npm run test:ci:js && npm run test:ci:ts",
        "test:ci:js": 'tap --no-check-coverage --timeout=120 --coverage-report=lcovonly "test/**/*.test.*js"',
        "test:ci:ts": 'tap --ts --no-check-coverage --coverage-report=lcovonly "test/**/*.test.*ts"',
        "test:yarn": 'npm run transpile && tap "test/**/*.test.js" --no-check-coverage',
        transpile: "sh ./test/ts/transpile.sh",
        prepare: "husky install"
      },
      standard: {
        ignore: [
          "test/ts/**/*"
        ]
      },
      repository: {
        type: "git",
        url: "git+https://github.com/mcollina/thread-stream.git"
      },
      keywords: [
        "worker",
        "thread",
        "threads",
        "stream"
      ],
      author: "Matteo Collina <hello@matteocollina.com>",
      license: "MIT",
      bugs: {
        url: "https://github.com/mcollina/thread-stream/issues"
      },
      homepage: "https://github.com/mcollina/thread-stream#readme"
    };
  }
});

// node_modules/.pnpm/thread-stream@3.0.0/node_modules/thread-stream/lib/wait.js
var require_wait = __commonJS({
  "node_modules/.pnpm/thread-stream@3.0.0/node_modules/thread-stream/lib/wait.js"(exports2, module2) {
    "use strict";
    var MAX_TIMEOUT = 1e3;
    function wait(state, index, expected, timeout, done) {
      const max = Date.now() + timeout;
      let current = Atomics.load(state, index);
      if (current === expected) {
        done(null, "ok");
        return;
      }
      let prior = current;
      const check = /* @__PURE__ */ __name((backoff) => {
        if (Date.now() > max) {
          done(null, "timed-out");
        } else {
          setTimeout(() => {
            prior = current;
            current = Atomics.load(state, index);
            if (current === prior) {
              check(backoff >= MAX_TIMEOUT ? MAX_TIMEOUT : backoff * 2);
            } else {
              if (current === expected)
                done(null, "ok");
              else
                done(null, "not-equal");
            }
          }, backoff);
        }
      }, "check");
      check(1);
    }
    __name(wait, "wait");
    function waitDiff(state, index, expected, timeout, done) {
      const max = Date.now() + timeout;
      let current = Atomics.load(state, index);
      if (current !== expected) {
        done(null, "ok");
        return;
      }
      const check = /* @__PURE__ */ __name((backoff) => {
        if (Date.now() > max) {
          done(null, "timed-out");
        } else {
          setTimeout(() => {
            current = Atomics.load(state, index);
            if (current !== expected) {
              done(null, "ok");
            } else {
              check(backoff >= MAX_TIMEOUT ? MAX_TIMEOUT : backoff * 2);
            }
          }, backoff);
        }
      }, "check");
      check(1);
    }
    __name(waitDiff, "waitDiff");
    module2.exports = { wait, waitDiff };
  }
});

// node_modules/.pnpm/thread-stream@3.0.0/node_modules/thread-stream/lib/indexes.js
var require_indexes = __commonJS({
  "node_modules/.pnpm/thread-stream@3.0.0/node_modules/thread-stream/lib/indexes.js"(exports2, module2) {
    "use strict";
    var WRITE_INDEX = 4;
    var READ_INDEX = 8;
    module2.exports = {
      WRITE_INDEX,
      READ_INDEX
    };
  }
});

// node_modules/.pnpm/thread-stream@3.0.0/node_modules/thread-stream/index.js
var require_thread_stream = __commonJS({
  "node_modules/.pnpm/thread-stream@3.0.0/node_modules/thread-stream/index.js"(exports2, module2) {
    "use strict";
    var { version } = require_package();
    var { EventEmitter } = require("events");
    var { Worker } = require("worker_threads");
    var { join } = require("path");
    var { pathToFileURL } = require("url");
    var { wait } = require_wait();
    var {
      WRITE_INDEX,
      READ_INDEX
    } = require_indexes();
    var buffer = require("buffer");
    var assert = require("assert");
    var kImpl = Symbol("kImpl");
    var MAX_STRING = buffer.constants.MAX_STRING_LENGTH;
    var FakeWeakRef = class {
      static {
        __name(this, "FakeWeakRef");
      }
      constructor(value) {
        this._value = value;
      }
      deref() {
        return this._value;
      }
    };
    var FakeFinalizationRegistry = class {
      static {
        __name(this, "FakeFinalizationRegistry");
      }
      register() {
      }
      unregister() {
      }
    };
    var FinalizationRegistry2 = process.env.NODE_V8_COVERAGE ? FakeFinalizationRegistry : global.FinalizationRegistry || FakeFinalizationRegistry;
    var WeakRef2 = process.env.NODE_V8_COVERAGE ? FakeWeakRef : global.WeakRef || FakeWeakRef;
    var registry = new FinalizationRegistry2((worker) => {
      if (worker.exited) {
        return;
      }
      worker.terminate();
    });
    function createWorker(stream2, opts) {
      const { filename, workerData } = opts;
      const bundlerOverrides = "__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {};
      const toExecute = bundlerOverrides["thread-stream-worker"] || join(__dirname, "lib", "worker.js");
      const worker = new Worker(toExecute, {
        ...opts.workerOpts,
        trackUnmanagedFds: false,
        workerData: {
          filename: filename.indexOf("file://") === 0 ? filename : pathToFileURL(filename).href,
          dataBuf: stream2[kImpl].dataBuf,
          stateBuf: stream2[kImpl].stateBuf,
          workerData: {
            $context: {
              threadStreamVersion: version
            },
            ...workerData
          }
        }
      });
      worker.stream = new FakeWeakRef(stream2);
      worker.on("message", onWorkerMessage);
      worker.on("exit", onWorkerExit);
      registry.register(stream2, worker);
      return worker;
    }
    __name(createWorker, "createWorker");
    function drain(stream2) {
      assert(!stream2[kImpl].sync);
      if (stream2[kImpl].needDrain) {
        stream2[kImpl].needDrain = false;
        stream2.emit("drain");
      }
    }
    __name(drain, "drain");
    function nextFlush(stream2) {
      const writeIndex = Atomics.load(stream2[kImpl].state, WRITE_INDEX);
      let leftover = stream2[kImpl].data.length - writeIndex;
      if (leftover > 0) {
        if (stream2[kImpl].buf.length === 0) {
          stream2[kImpl].flushing = false;
          if (stream2[kImpl].ending) {
            end(stream2);
          } else if (stream2[kImpl].needDrain) {
            process.nextTick(drain, stream2);
          }
          return;
        }
        let toWrite = stream2[kImpl].buf.slice(0, leftover);
        let toWriteBytes = Buffer.byteLength(toWrite);
        if (toWriteBytes <= leftover) {
          stream2[kImpl].buf = stream2[kImpl].buf.slice(leftover);
          write2(stream2, toWrite, nextFlush.bind(null, stream2));
        } else {
          stream2.flush(() => {
            if (stream2.destroyed) {
              return;
            }
            Atomics.store(stream2[kImpl].state, READ_INDEX, 0);
            Atomics.store(stream2[kImpl].state, WRITE_INDEX, 0);
            while (toWriteBytes > stream2[kImpl].data.length) {
              leftover = leftover / 2;
              toWrite = stream2[kImpl].buf.slice(0, leftover);
              toWriteBytes = Buffer.byteLength(toWrite);
            }
            stream2[kImpl].buf = stream2[kImpl].buf.slice(leftover);
            write2(stream2, toWrite, nextFlush.bind(null, stream2));
          });
        }
      } else if (leftover === 0) {
        if (writeIndex === 0 && stream2[kImpl].buf.length === 0) {
          return;
        }
        stream2.flush(() => {
          Atomics.store(stream2[kImpl].state, READ_INDEX, 0);
          Atomics.store(stream2[kImpl].state, WRITE_INDEX, 0);
          nextFlush(stream2);
        });
      } else {
        destroy(stream2, new Error("overwritten"));
      }
    }
    __name(nextFlush, "nextFlush");
    function onWorkerMessage(msg) {
      const stream2 = this.stream.deref();
      if (stream2 === void 0) {
        this.exited = true;
        this.terminate();
        return;
      }
      switch (msg.code) {
        case "READY":
          this.stream = new WeakRef2(stream2);
          stream2.flush(() => {
            stream2[kImpl].ready = true;
            stream2.emit("ready");
          });
          break;
        case "ERROR":
          destroy(stream2, msg.err);
          break;
        case "EVENT":
          if (Array.isArray(msg.args)) {
            stream2.emit(msg.name, ...msg.args);
          } else {
            stream2.emit(msg.name, msg.args);
          }
          break;
        case "WARNING":
          process.emitWarning(msg.err);
          break;
        default:
          destroy(stream2, new Error("this should not happen: " + msg.code));
      }
    }
    __name(onWorkerMessage, "onWorkerMessage");
    function onWorkerExit(code) {
      const stream2 = this.stream.deref();
      if (stream2 === void 0) {
        return;
      }
      registry.unregister(stream2);
      stream2.worker.exited = true;
      stream2.worker.off("exit", onWorkerExit);
      destroy(stream2, code !== 0 ? new Error("the worker thread exited") : null);
    }
    __name(onWorkerExit, "onWorkerExit");
    var ThreadStream = class extends EventEmitter {
      static {
        __name(this, "ThreadStream");
      }
      constructor(opts = {}) {
        super();
        if (opts.bufferSize < 4) {
          throw new Error("bufferSize must at least fit a 4-byte utf-8 char");
        }
        this[kImpl] = {};
        this[kImpl].stateBuf = new SharedArrayBuffer(128);
        this[kImpl].state = new Int32Array(this[kImpl].stateBuf);
        this[kImpl].dataBuf = new SharedArrayBuffer(opts.bufferSize || 4 * 1024 * 1024);
        this[kImpl].data = Buffer.from(this[kImpl].dataBuf);
        this[kImpl].sync = opts.sync || false;
        this[kImpl].ending = false;
        this[kImpl].ended = false;
        this[kImpl].needDrain = false;
        this[kImpl].destroyed = false;
        this[kImpl].flushing = false;
        this[kImpl].ready = false;
        this[kImpl].finished = false;
        this[kImpl].errored = null;
        this[kImpl].closed = false;
        this[kImpl].buf = "";
        this.worker = createWorker(this, opts);
        this.on("message", (message, transferList) => {
          this.worker.postMessage(message, transferList);
        });
      }
      write(data) {
        if (this[kImpl].destroyed) {
          error(this, new Error("the worker has exited"));
          return false;
        }
        if (this[kImpl].ending) {
          error(this, new Error("the worker is ending"));
          return false;
        }
        if (this[kImpl].flushing && this[kImpl].buf.length + data.length >= MAX_STRING) {
          try {
            writeSync(this);
            this[kImpl].flushing = true;
          } catch (err) {
            destroy(this, err);
            return false;
          }
        }
        this[kImpl].buf += data;
        if (this[kImpl].sync) {
          try {
            writeSync(this);
            return true;
          } catch (err) {
            destroy(this, err);
            return false;
          }
        }
        if (!this[kImpl].flushing) {
          this[kImpl].flushing = true;
          setImmediate(nextFlush, this);
        }
        this[kImpl].needDrain = this[kImpl].data.length - this[kImpl].buf.length - Atomics.load(this[kImpl].state, WRITE_INDEX) <= 0;
        return !this[kImpl].needDrain;
      }
      end() {
        if (this[kImpl].destroyed) {
          return;
        }
        this[kImpl].ending = true;
        end(this);
      }
      flush(cb) {
        if (this[kImpl].destroyed) {
          if (typeof cb === "function") {
            process.nextTick(cb, new Error("the worker has exited"));
          }
          return;
        }
        const writeIndex = Atomics.load(this[kImpl].state, WRITE_INDEX);
        wait(this[kImpl].state, READ_INDEX, writeIndex, Infinity, (err, res) => {
          if (err) {
            destroy(this, err);
            process.nextTick(cb, err);
            return;
          }
          if (res === "not-equal") {
            this.flush(cb);
            return;
          }
          process.nextTick(cb);
        });
      }
      flushSync() {
        if (this[kImpl].destroyed) {
          return;
        }
        writeSync(this);
        flushSync(this);
      }
      unref() {
        this.worker.unref();
      }
      ref() {
        this.worker.ref();
      }
      get ready() {
        return this[kImpl].ready;
      }
      get destroyed() {
        return this[kImpl].destroyed;
      }
      get closed() {
        return this[kImpl].closed;
      }
      get writable() {
        return !this[kImpl].destroyed && !this[kImpl].ending;
      }
      get writableEnded() {
        return this[kImpl].ending;
      }
      get writableFinished() {
        return this[kImpl].finished;
      }
      get writableNeedDrain() {
        return this[kImpl].needDrain;
      }
      get writableObjectMode() {
        return false;
      }
      get writableErrored() {
        return this[kImpl].errored;
      }
    };
    function error(stream2, err) {
      setImmediate(() => {
        stream2.emit("error", err);
      });
    }
    __name(error, "error");
    function destroy(stream2, err) {
      if (stream2[kImpl].destroyed) {
        return;
      }
      stream2[kImpl].destroyed = true;
      if (err) {
        stream2[kImpl].errored = err;
        error(stream2, err);
      }
      if (!stream2.worker.exited) {
        stream2.worker.terminate().catch(() => {
        }).then(() => {
          stream2[kImpl].closed = true;
          stream2.emit("close");
        });
      } else {
        setImmediate(() => {
          stream2[kImpl].closed = true;
          stream2.emit("close");
        });
      }
    }
    __name(destroy, "destroy");
    function write2(stream2, data, cb) {
      const current = Atomics.load(stream2[kImpl].state, WRITE_INDEX);
      const length = Buffer.byteLength(data);
      stream2[kImpl].data.write(data, current);
      Atomics.store(stream2[kImpl].state, WRITE_INDEX, current + length);
      Atomics.notify(stream2[kImpl].state, WRITE_INDEX);
      cb();
      return true;
    }
    __name(write2, "write");
    function end(stream2) {
      if (stream2[kImpl].ended || !stream2[kImpl].ending || stream2[kImpl].flushing) {
        return;
      }
      stream2[kImpl].ended = true;
      try {
        stream2.flushSync();
        let readIndex = Atomics.load(stream2[kImpl].state, READ_INDEX);
        Atomics.store(stream2[kImpl].state, WRITE_INDEX, -1);
        Atomics.notify(stream2[kImpl].state, WRITE_INDEX);
        let spins = 0;
        while (readIndex !== -1) {
          Atomics.wait(stream2[kImpl].state, READ_INDEX, readIndex, 1e3);
          readIndex = Atomics.load(stream2[kImpl].state, READ_INDEX);
          if (readIndex === -2) {
            destroy(stream2, new Error("end() failed"));
            return;
          }
          if (++spins === 10) {
            destroy(stream2, new Error("end() took too long (10s)"));
            return;
          }
        }
        process.nextTick(() => {
          stream2[kImpl].finished = true;
          stream2.emit("finish");
        });
      } catch (err) {
        destroy(stream2, err);
      }
    }
    __name(end, "end");
    function writeSync(stream2) {
      const cb = /* @__PURE__ */ __name(() => {
        if (stream2[kImpl].ending) {
          end(stream2);
        } else if (stream2[kImpl].needDrain) {
          process.nextTick(drain, stream2);
        }
      }, "cb");
      stream2[kImpl].flushing = false;
      while (stream2[kImpl].buf.length !== 0) {
        const writeIndex = Atomics.load(stream2[kImpl].state, WRITE_INDEX);
        let leftover = stream2[kImpl].data.length - writeIndex;
        if (leftover === 0) {
          flushSync(stream2);
          Atomics.store(stream2[kImpl].state, READ_INDEX, 0);
          Atomics.store(stream2[kImpl].state, WRITE_INDEX, 0);
          continue;
        } else if (leftover < 0) {
          throw new Error("overwritten");
        }
        let toWrite = stream2[kImpl].buf.slice(0, leftover);
        let toWriteBytes = Buffer.byteLength(toWrite);
        if (toWriteBytes <= leftover) {
          stream2[kImpl].buf = stream2[kImpl].buf.slice(leftover);
          write2(stream2, toWrite, cb);
        } else {
          flushSync(stream2);
          Atomics.store(stream2[kImpl].state, READ_INDEX, 0);
          Atomics.store(stream2[kImpl].state, WRITE_INDEX, 0);
          while (toWriteBytes > stream2[kImpl].buf.length) {
            leftover = leftover / 2;
            toWrite = stream2[kImpl].buf.slice(0, leftover);
            toWriteBytes = Buffer.byteLength(toWrite);
          }
          stream2[kImpl].buf = stream2[kImpl].buf.slice(leftover);
          write2(stream2, toWrite, cb);
        }
      }
    }
    __name(writeSync, "writeSync");
    function flushSync(stream2) {
      if (stream2[kImpl].flushing) {
        throw new Error("unable to flush while flushing");
      }
      const writeIndex = Atomics.load(stream2[kImpl].state, WRITE_INDEX);
      let spins = 0;
      while (true) {
        const readIndex = Atomics.load(stream2[kImpl].state, READ_INDEX);
        if (readIndex === -2) {
          throw Error("_flushSync failed");
        }
        if (readIndex !== writeIndex) {
          Atomics.wait(stream2[kImpl].state, READ_INDEX, readIndex, 1e3);
        } else {
          break;
        }
        if (++spins === 10) {
          throw new Error("_flushSync took too long (10s)");
        }
      }
    }
    __name(flushSync, "flushSync");
    module2.exports = ThreadStream;
  }
});

// node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/transport.js
var require_transport = __commonJS({
  "node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/transport.js"(exports2, module2) {
    "use strict";
    var { createRequire } = require("module");
    var getCallers = require_caller();
    var { join, isAbsolute, sep } = require("path");
    var sleep = require_atomic_sleep();
    var onExit = require_on_exit_leak_free();
    var ThreadStream = require_thread_stream();
    function setupOnExit(stream2) {
      onExit.register(stream2, autoEnd);
      onExit.registerBeforeExit(stream2, flush);
      stream2.on("close", function() {
        onExit.unregister(stream2);
      });
    }
    __name(setupOnExit, "setupOnExit");
    function buildStream(filename, workerData, workerOpts) {
      const stream2 = new ThreadStream({
        filename,
        workerData,
        workerOpts
      });
      stream2.on("ready", onReady);
      stream2.on("close", function() {
        process.removeListener("exit", onExit2);
      });
      process.on("exit", onExit2);
      function onReady() {
        process.removeListener("exit", onExit2);
        stream2.unref();
        if (workerOpts.autoEnd !== false) {
          setupOnExit(stream2);
        }
      }
      __name(onReady, "onReady");
      function onExit2() {
        if (stream2.closed) {
          return;
        }
        stream2.flushSync();
        sleep(100);
        stream2.end();
      }
      __name(onExit2, "onExit");
      return stream2;
    }
    __name(buildStream, "buildStream");
    function autoEnd(stream2) {
      stream2.ref();
      stream2.flushSync();
      stream2.end();
      stream2.once("close", function() {
        stream2.unref();
      });
    }
    __name(autoEnd, "autoEnd");
    function flush(stream2) {
      stream2.flushSync();
    }
    __name(flush, "flush");
    function transport(fullOptions) {
      const { pipeline, targets, levels, dedupe, options: options3 = {}, worker = {}, caller = getCallers() } = fullOptions;
      const callers = typeof caller === "string" ? [caller] : caller;
      const bundlerOverrides = "__bundlerPathsOverrides" in globalThis ? globalThis.__bundlerPathsOverrides : {};
      let target = fullOptions.target;
      if (target && targets) {
        throw new Error("only one of target or targets can be specified");
      }
      if (targets) {
        target = bundlerOverrides["pino-worker"] || join(__dirname, "worker.js");
        options3.targets = targets.filter((dest) => dest.target).map((dest) => {
          return {
            ...dest,
            target: fixTarget(dest.target)
          };
        });
        options3.pipelines = targets.filter((dest) => dest.pipeline).map((dest) => {
          return dest.pipeline.map((t) => {
            return {
              ...t,
              level: dest.level,
              // duplicate the pipeline `level` property defined in the upper level
              target: fixTarget(t.target)
            };
          });
        });
      } else if (pipeline) {
        target = bundlerOverrides["pino-worker"] || join(__dirname, "worker.js");
        options3.pipelines = [pipeline.map((dest) => {
          return {
            ...dest,
            target: fixTarget(dest.target)
          };
        })];
      }
      if (levels) {
        options3.levels = levels;
      }
      if (dedupe) {
        options3.dedupe = dedupe;
      }
      options3.pinoWillSendConfig = true;
      return buildStream(fixTarget(target), options3, worker);
      function fixTarget(origin) {
        origin = bundlerOverrides[origin] || origin;
        if (isAbsolute(origin) || origin.indexOf("file://") === 0) {
          return origin;
        }
        if (origin === "pino/file") {
          return join(__dirname, "..", "file.js");
        }
        let fixTarget2;
        for (const filePath of callers) {
          try {
            const context = filePath === "node:repl" ? process.cwd() + sep : filePath;
            fixTarget2 = createRequire(context).resolve(origin);
            break;
          } catch (err) {
            continue;
          }
        }
        if (!fixTarget2) {
          throw new Error(`unable to determine transport target for "${origin}"`);
        }
        return fixTarget2;
      }
      __name(fixTarget, "fixTarget");
    }
    __name(transport, "transport");
    module2.exports = transport;
  }
});

// node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/tools.js
var require_tools = __commonJS({
  "node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/tools.js"(exports2, module2) {
    "use strict";
    var format = require_quick_format_unescaped();
    var { mapHttpRequest, mapHttpResponse } = require_pino_std_serializers();
    var SonicBoom = require_sonic_boom();
    var onExit = require_on_exit_leak_free();
    var {
      lsCacheSym,
      chindingsSym,
      writeSym,
      serializersSym,
      formatOptsSym,
      endSym,
      stringifiersSym,
      stringifySym,
      stringifySafeSym,
      wildcardFirstSym,
      nestedKeySym,
      formattersSym,
      messageKeySym,
      errorKeySym,
      nestedKeyStrSym,
      msgPrefixSym
    } = require_symbols();
    var { isMainThread } = require("worker_threads");
    var transport = require_transport();
    function noop() {
    }
    __name(noop, "noop");
    function genLog(level, hook) {
      if (!hook)
        return LOG;
      return /* @__PURE__ */ __name(function hookWrappedLog(...args2) {
        hook.call(this, args2, LOG, level);
      }, "hookWrappedLog");
      function LOG(o, ...n) {
        if (typeof o === "object") {
          let msg = o;
          if (o !== null) {
            if (o.method && o.headers && o.socket) {
              o = mapHttpRequest(o);
            } else if (typeof o.setHeader === "function") {
              o = mapHttpResponse(o);
            }
          }
          let formatParams;
          if (msg === null && n.length === 0) {
            formatParams = [null];
          } else {
            msg = n.shift();
            formatParams = n;
          }
          if (typeof this[msgPrefixSym] === "string" && msg !== void 0 && msg !== null) {
            msg = this[msgPrefixSym] + msg;
          }
          this[writeSym](o, format(msg, formatParams, this[formatOptsSym]), level);
        } else {
          let msg = o === void 0 ? n.shift() : o;
          if (typeof this[msgPrefixSym] === "string" && msg !== void 0 && msg !== null) {
            msg = this[msgPrefixSym] + msg;
          }
          this[writeSym](null, format(msg, n, this[formatOptsSym]), level);
        }
      }
      __name(LOG, "LOG");
    }
    __name(genLog, "genLog");
    function asString(str) {
      let result = "";
      let last = 0;
      let found = false;
      let point = 255;
      const l = str.length;
      if (l > 100) {
        return JSON.stringify(str);
      }
      for (var i = 0; i < l && point >= 32; i++) {
        point = str.charCodeAt(i);
        if (point === 34 || point === 92) {
          result += str.slice(last, i) + "\\";
          last = i;
          found = true;
        }
      }
      if (!found) {
        result = str;
      } else {
        result += str.slice(last);
      }
      return point < 32 ? JSON.stringify(str) : '"' + result + '"';
    }
    __name(asString, "asString");
    function asJson(obj, msg, num, time) {
      const stringify2 = this[stringifySym];
      const stringifySafe = this[stringifySafeSym];
      const stringifiers = this[stringifiersSym];
      const end = this[endSym];
      const chindings = this[chindingsSym];
      const serializers = this[serializersSym];
      const formatters = this[formattersSym];
      const messageKey = this[messageKeySym];
      const errorKey = this[errorKeySym];
      let data = this[lsCacheSym][num] + time;
      data = data + chindings;
      let value;
      if (formatters.log) {
        obj = formatters.log(obj);
      }
      const wildcardStringifier = stringifiers[wildcardFirstSym];
      let propStr = "";
      for (const key in obj) {
        value = obj[key];
        if (Object.prototype.hasOwnProperty.call(obj, key) && value !== void 0) {
          if (serializers[key]) {
            value = serializers[key](value);
          } else if (key === errorKey && serializers.err) {
            value = serializers.err(value);
          }
          const stringifier = stringifiers[key] || wildcardStringifier;
          switch (typeof value) {
            case "undefined":
            case "function":
              continue;
            case "number":
              if (Number.isFinite(value) === false) {
                value = null;
              }
            case "boolean":
              if (stringifier)
                value = stringifier(value);
              break;
            case "string":
              value = (stringifier || asString)(value);
              break;
            default:
              value = (stringifier || stringify2)(value, stringifySafe);
          }
          if (value === void 0)
            continue;
          const strKey = asString(key);
          propStr += "," + strKey + ":" + value;
        }
      }
      let msgStr = "";
      if (msg !== void 0) {
        value = serializers[messageKey] ? serializers[messageKey](msg) : msg;
        const stringifier = stringifiers[messageKey] || wildcardStringifier;
        switch (typeof value) {
          case "function":
            break;
          case "number":
            if (Number.isFinite(value) === false) {
              value = null;
            }
          case "boolean":
            if (stringifier)
              value = stringifier(value);
            msgStr = ',"' + messageKey + '":' + value;
            break;
          case "string":
            value = (stringifier || asString)(value);
            msgStr = ',"' + messageKey + '":' + value;
            break;
          default:
            value = (stringifier || stringify2)(value, stringifySafe);
            msgStr = ',"' + messageKey + '":' + value;
        }
      }
      if (this[nestedKeySym] && propStr) {
        return data + this[nestedKeyStrSym] + propStr.slice(1) + "}" + msgStr + end;
      } else {
        return data + propStr + msgStr + end;
      }
    }
    __name(asJson, "asJson");
    function asChindings(instance, bindings) {
      let value;
      let data = instance[chindingsSym];
      const stringify2 = instance[stringifySym];
      const stringifySafe = instance[stringifySafeSym];
      const stringifiers = instance[stringifiersSym];
      const wildcardStringifier = stringifiers[wildcardFirstSym];
      const serializers = instance[serializersSym];
      const formatter = instance[formattersSym].bindings;
      bindings = formatter(bindings);
      for (const key in bindings) {
        value = bindings[key];
        const valid = key !== "level" && key !== "serializers" && key !== "formatters" && key !== "customLevels" && bindings.hasOwnProperty(key) && value !== void 0;
        if (valid === true) {
          value = serializers[key] ? serializers[key](value) : value;
          value = (stringifiers[key] || wildcardStringifier || stringify2)(value, stringifySafe);
          if (value === void 0)
            continue;
          data += ',"' + key + '":' + value;
        }
      }
      return data;
    }
    __name(asChindings, "asChindings");
    function hasBeenTampered(stream2) {
      return stream2.write !== stream2.constructor.prototype.write;
    }
    __name(hasBeenTampered, "hasBeenTampered");
    var hasNodeCodeCoverage = process.env.NODE_V8_COVERAGE || process.env.V8_COVERAGE;
    function buildSafeSonicBoom(opts) {
      const stream2 = new SonicBoom(opts);
      stream2.on("error", filterBrokenPipe);
      if (!hasNodeCodeCoverage && !opts.sync && isMainThread) {
        onExit.register(stream2, autoEnd);
        stream2.on("close", function() {
          onExit.unregister(stream2);
        });
      }
      return stream2;
      function filterBrokenPipe(err) {
        if (err.code === "EPIPE") {
          stream2.write = noop;
          stream2.end = noop;
          stream2.flushSync = noop;
          stream2.destroy = noop;
          return;
        }
        stream2.removeListener("error", filterBrokenPipe);
        stream2.emit("error", err);
      }
      __name(filterBrokenPipe, "filterBrokenPipe");
    }
    __name(buildSafeSonicBoom, "buildSafeSonicBoom");
    function autoEnd(stream2, eventName) {
      if (stream2.destroyed) {
        return;
      }
      if (eventName === "beforeExit") {
        stream2.flush();
        stream2.on("drain", function() {
          stream2.end();
        });
      } else {
        stream2.flushSync();
      }
    }
    __name(autoEnd, "autoEnd");
    function createArgsNormalizer(defaultOptions) {
      return /* @__PURE__ */ __name(function normalizeArgs(instance, caller, opts = {}, stream2) {
        if (typeof opts === "string") {
          stream2 = buildSafeSonicBoom({ dest: opts });
          opts = {};
        } else if (typeof stream2 === "string") {
          if (opts && opts.transport) {
            throw Error("only one of option.transport or stream can be specified");
          }
          stream2 = buildSafeSonicBoom({ dest: stream2 });
        } else if (opts instanceof SonicBoom || opts.writable || opts._writableState) {
          stream2 = opts;
          opts = {};
        } else if (opts.transport) {
          if (opts.transport instanceof SonicBoom || opts.transport.writable || opts.transport._writableState) {
            throw Error("option.transport do not allow stream, please pass to option directly. e.g. pino(transport)");
          }
          if (opts.transport.targets && opts.transport.targets.length && opts.formatters && typeof opts.formatters.level === "function") {
            throw Error("option.transport.targets do not allow custom level formatters");
          }
          let customLevels;
          if (opts.customLevels) {
            customLevels = opts.useOnlyCustomLevels ? opts.customLevels : Object.assign({}, opts.levels, opts.customLevels);
          }
          stream2 = transport({ caller, ...opts.transport, levels: customLevels });
        }
        opts = Object.assign({}, defaultOptions, opts);
        opts.serializers = Object.assign({}, defaultOptions.serializers, opts.serializers);
        opts.formatters = Object.assign({}, defaultOptions.formatters, opts.formatters);
        if (opts.prettyPrint) {
          throw new Error("prettyPrint option is no longer supported, see the pino-pretty package (https://github.com/pinojs/pino-pretty)");
        }
        const { enabled, onChild } = opts;
        if (enabled === false)
          opts.level = "silent";
        if (!onChild)
          opts.onChild = noop;
        if (!stream2) {
          if (!hasBeenTampered(process.stdout)) {
            stream2 = buildSafeSonicBoom({ fd: process.stdout.fd || 1 });
          } else {
            stream2 = process.stdout;
          }
        }
        return { opts, stream: stream2 };
      }, "normalizeArgs");
    }
    __name(createArgsNormalizer, "createArgsNormalizer");
    function stringify(obj, stringifySafeFn) {
      try {
        return JSON.stringify(obj);
      } catch (_5) {
        try {
          const stringify2 = stringifySafeFn || this[stringifySafeSym];
          return stringify2(obj);
        } catch (_6) {
          return '"[unable to serialize, circular reference is too complex to analyze]"';
        }
      }
    }
    __name(stringify, "stringify");
    function buildFormatters(level, bindings, log) {
      return {
        level,
        bindings,
        log
      };
    }
    __name(buildFormatters, "buildFormatters");
    function normalizeDestFileDescriptor(destination2) {
      const fd = Number(destination2);
      if (typeof destination2 === "string" && Number.isFinite(fd)) {
        return fd;
      }
      if (destination2 === void 0) {
        return 1;
      }
      return destination2;
    }
    __name(normalizeDestFileDescriptor, "normalizeDestFileDescriptor");
    module2.exports = {
      noop,
      buildSafeSonicBoom,
      asChindings,
      asJson,
      genLog,
      createArgsNormalizer,
      stringify,
      buildFormatters,
      normalizeDestFileDescriptor
    };
  }
});

// node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/constants.js"(exports2, module2) {
    "use strict";
    var DEFAULT_LEVELS = {
      trace: 10,
      debug: 20,
      info: 30,
      warn: 40,
      error: 50,
      fatal: 60
    };
    var SORTING_ORDER = {
      ASC: "ASC",
      DESC: "DESC"
    };
    module2.exports = {
      DEFAULT_LEVELS,
      SORTING_ORDER
    };
  }
});

// node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/levels.js
var require_levels = __commonJS({
  "node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/levels.js"(exports2, module2) {
    "use strict";
    var {
      lsCacheSym,
      levelValSym,
      useOnlyCustomLevelsSym,
      streamSym,
      formattersSym,
      hooksSym,
      levelCompSym
    } = require_symbols();
    var { noop, genLog } = require_tools();
    var { DEFAULT_LEVELS, SORTING_ORDER } = require_constants();
    var levelMethods = {
      fatal: (hook) => {
        const logFatal = genLog(DEFAULT_LEVELS.fatal, hook);
        return function(...args2) {
          const stream2 = this[streamSym];
          logFatal.call(this, ...args2);
          if (typeof stream2.flushSync === "function") {
            try {
              stream2.flushSync();
            } catch (e) {
            }
          }
        };
      },
      error: (hook) => genLog(DEFAULT_LEVELS.error, hook),
      warn: (hook) => genLog(DEFAULT_LEVELS.warn, hook),
      info: (hook) => genLog(DEFAULT_LEVELS.info, hook),
      debug: (hook) => genLog(DEFAULT_LEVELS.debug, hook),
      trace: (hook) => genLog(DEFAULT_LEVELS.trace, hook)
    };
    var nums = Object.keys(DEFAULT_LEVELS).reduce((o, k) => {
      o[DEFAULT_LEVELS[k]] = k;
      return o;
    }, {});
    var initialLsCache = Object.keys(nums).reduce((o, k) => {
      o[k] = '{"level":' + Number(k);
      return o;
    }, {});
    function genLsCache(instance) {
      const formatter = instance[formattersSym].level;
      const { labels } = instance.levels;
      const cache = {};
      for (const label in labels) {
        const level = formatter(labels[label], Number(label));
        cache[label] = JSON.stringify(level).slice(0, -1);
      }
      instance[lsCacheSym] = cache;
      return instance;
    }
    __name(genLsCache, "genLsCache");
    function isStandardLevel(level, useOnlyCustomLevels) {
      if (useOnlyCustomLevels) {
        return false;
      }
      switch (level) {
        case "fatal":
        case "error":
        case "warn":
        case "info":
        case "debug":
        case "trace":
          return true;
        default:
          return false;
      }
    }
    __name(isStandardLevel, "isStandardLevel");
    function setLevel(level) {
      const { labels, values } = this.levels;
      if (typeof level === "number") {
        if (labels[level] === void 0)
          throw Error("unknown level value" + level);
        level = labels[level];
      }
      if (values[level] === void 0)
        throw Error("unknown level " + level);
      const preLevelVal = this[levelValSym];
      const levelVal = this[levelValSym] = values[level];
      const useOnlyCustomLevelsVal = this[useOnlyCustomLevelsSym];
      const levelComparison = this[levelCompSym];
      const hook = this[hooksSym].logMethod;
      for (const key in values) {
        if (levelComparison(values[key], levelVal) === false) {
          this[key] = noop;
          continue;
        }
        this[key] = isStandardLevel(key, useOnlyCustomLevelsVal) ? levelMethods[key](hook) : genLog(values[key], hook);
      }
      this.emit(
        "level-change",
        level,
        levelVal,
        labels[preLevelVal],
        preLevelVal,
        this
      );
    }
    __name(setLevel, "setLevel");
    function getLevel(level) {
      const { levels, levelVal } = this;
      return levels && levels.labels ? levels.labels[levelVal] : "";
    }
    __name(getLevel, "getLevel");
    function isLevelEnabled(logLevel) {
      const { values } = this.levels;
      const logLevelVal = values[logLevel];
      return logLevelVal !== void 0 && this[levelCompSym](logLevelVal, this[levelValSym]);
    }
    __name(isLevelEnabled, "isLevelEnabled");
    function compareLevel(direction, current, expected) {
      if (direction === SORTING_ORDER.DESC) {
        return current <= expected;
      }
      return current >= expected;
    }
    __name(compareLevel, "compareLevel");
    function genLevelComparison(levelComparison) {
      if (typeof levelComparison === "string") {
        return compareLevel.bind(null, levelComparison);
      }
      return levelComparison;
    }
    __name(genLevelComparison, "genLevelComparison");
    function mappings(customLevels = null, useOnlyCustomLevels = false) {
      const customNums = customLevels ? Object.keys(customLevels).reduce((o, k) => {
        o[customLevels[k]] = k;
        return o;
      }, {}) : null;
      const labels = Object.assign(
        Object.create(Object.prototype, { Infinity: { value: "silent" } }),
        useOnlyCustomLevels ? null : nums,
        customNums
      );
      const values = Object.assign(
        Object.create(Object.prototype, { silent: { value: Infinity } }),
        useOnlyCustomLevels ? null : DEFAULT_LEVELS,
        customLevels
      );
      return { labels, values };
    }
    __name(mappings, "mappings");
    function assertDefaultLevelFound(defaultLevel, customLevels, useOnlyCustomLevels) {
      if (typeof defaultLevel === "number") {
        const values = [].concat(
          Object.keys(customLevels || {}).map((key) => customLevels[key]),
          useOnlyCustomLevels ? [] : Object.keys(nums).map((level) => +level),
          Infinity
        );
        if (!values.includes(defaultLevel)) {
          throw Error(`default level:${defaultLevel} must be included in custom levels`);
        }
        return;
      }
      const labels = Object.assign(
        Object.create(Object.prototype, { silent: { value: Infinity } }),
        useOnlyCustomLevels ? null : DEFAULT_LEVELS,
        customLevels
      );
      if (!(defaultLevel in labels)) {
        throw Error(`default level:${defaultLevel} must be included in custom levels`);
      }
    }
    __name(assertDefaultLevelFound, "assertDefaultLevelFound");
    function assertNoLevelCollisions(levels, customLevels) {
      const { labels, values } = levels;
      for (const k in customLevels) {
        if (k in values) {
          throw Error("levels cannot be overridden");
        }
        if (customLevels[k] in labels) {
          throw Error("pre-existing level values cannot be used for new levels");
        }
      }
    }
    __name(assertNoLevelCollisions, "assertNoLevelCollisions");
    function assertLevelComparison(levelComparison) {
      if (typeof levelComparison === "function") {
        return;
      }
      if (typeof levelComparison === "string" && Object.values(SORTING_ORDER).includes(levelComparison)) {
        return;
      }
      throw new Error('Levels comparison should be one of "ASC", "DESC" or "function" type');
    }
    __name(assertLevelComparison, "assertLevelComparison");
    module2.exports = {
      initialLsCache,
      genLsCache,
      levelMethods,
      getLevel,
      setLevel,
      isLevelEnabled,
      mappings,
      assertNoLevelCollisions,
      assertDefaultLevelFound,
      genLevelComparison,
      assertLevelComparison
    };
  }
});

// node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/meta.js
var require_meta = __commonJS({
  "node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/meta.js"(exports2, module2) {
    "use strict";
    module2.exports = { version: "9.1.0" };
  }
});

// node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/proto.js
var require_proto = __commonJS({
  "node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/proto.js"(exports2, module2) {
    "use strict";
    var { EventEmitter } = require("events");
    var {
      lsCacheSym,
      levelValSym,
      setLevelSym,
      getLevelSym,
      chindingsSym,
      parsedChindingsSym,
      mixinSym,
      asJsonSym,
      writeSym,
      mixinMergeStrategySym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      serializersSym,
      formattersSym,
      errorKeySym,
      messageKeySym,
      useOnlyCustomLevelsSym,
      needsMetadataGsym,
      redactFmtSym,
      stringifySym,
      formatOptsSym,
      stringifiersSym,
      msgPrefixSym
    } = require_symbols();
    var {
      getLevel,
      setLevel,
      isLevelEnabled,
      mappings,
      initialLsCache,
      genLsCache,
      assertNoLevelCollisions
    } = require_levels();
    var {
      asChindings,
      asJson,
      buildFormatters,
      stringify
    } = require_tools();
    var {
      version
    } = require_meta();
    var redaction = require_redaction();
    var constructor = class Pino {
      static {
        __name(this, "Pino");
      }
    };
    var prototype = {
      constructor,
      child,
      bindings,
      setBindings,
      flush,
      isLevelEnabled,
      version,
      get level() {
        return this[getLevelSym]();
      },
      set level(lvl) {
        this[setLevelSym](lvl);
      },
      get levelVal() {
        return this[levelValSym];
      },
      set levelVal(n) {
        throw Error("levelVal is read-only");
      },
      [lsCacheSym]: initialLsCache,
      [writeSym]: write2,
      [asJsonSym]: asJson,
      [getLevelSym]: getLevel,
      [setLevelSym]: setLevel
    };
    Object.setPrototypeOf(prototype, EventEmitter.prototype);
    module2.exports = function() {
      return Object.create(prototype);
    };
    var resetChildingsFormatter = /* @__PURE__ */ __name((bindings2) => bindings2, "resetChildingsFormatter");
    function child(bindings2, options3) {
      if (!bindings2) {
        throw Error("missing bindings for child Pino");
      }
      options3 = options3 || {};
      const serializers = this[serializersSym];
      const formatters = this[formattersSym];
      const instance = Object.create(this);
      if (options3.hasOwnProperty("serializers") === true) {
        instance[serializersSym] = /* @__PURE__ */ Object.create(null);
        for (const k in serializers) {
          instance[serializersSym][k] = serializers[k];
        }
        const parentSymbols = Object.getOwnPropertySymbols(serializers);
        for (var i = 0; i < parentSymbols.length; i++) {
          const ks = parentSymbols[i];
          instance[serializersSym][ks] = serializers[ks];
        }
        for (const bk in options3.serializers) {
          instance[serializersSym][bk] = options3.serializers[bk];
        }
        const bindingsSymbols = Object.getOwnPropertySymbols(options3.serializers);
        for (var bi = 0; bi < bindingsSymbols.length; bi++) {
          const bks = bindingsSymbols[bi];
          instance[serializersSym][bks] = options3.serializers[bks];
        }
      } else
        instance[serializersSym] = serializers;
      if (options3.hasOwnProperty("formatters")) {
        const { level, bindings: chindings, log } = options3.formatters;
        instance[formattersSym] = buildFormatters(
          level || formatters.level,
          chindings || resetChildingsFormatter,
          log || formatters.log
        );
      } else {
        instance[formattersSym] = buildFormatters(
          formatters.level,
          resetChildingsFormatter,
          formatters.log
        );
      }
      if (options3.hasOwnProperty("customLevels") === true) {
        assertNoLevelCollisions(this.levels, options3.customLevels);
        instance.levels = mappings(options3.customLevels, instance[useOnlyCustomLevelsSym]);
        genLsCache(instance);
      }
      if (typeof options3.redact === "object" && options3.redact !== null || Array.isArray(options3.redact)) {
        instance.redact = options3.redact;
        const stringifiers = redaction(instance.redact, stringify);
        const formatOpts = { stringify: stringifiers[redactFmtSym] };
        instance[stringifySym] = stringify;
        instance[stringifiersSym] = stringifiers;
        instance[formatOptsSym] = formatOpts;
      }
      if (typeof options3.msgPrefix === "string") {
        instance[msgPrefixSym] = (this[msgPrefixSym] || "") + options3.msgPrefix;
      }
      instance[chindingsSym] = asChindings(instance, bindings2);
      const childLevel = options3.level || this.level;
      instance[setLevelSym](childLevel);
      this.onChild(instance);
      return instance;
    }
    __name(child, "child");
    function bindings() {
      const chindings = this[chindingsSym];
      const chindingsJson = `{${chindings.substr(1)}}`;
      const bindingsFromJson = JSON.parse(chindingsJson);
      delete bindingsFromJson.pid;
      delete bindingsFromJson.hostname;
      return bindingsFromJson;
    }
    __name(bindings, "bindings");
    function setBindings(newBindings) {
      const chindings = asChindings(this, newBindings);
      this[chindingsSym] = chindings;
      delete this[parsedChindingsSym];
    }
    __name(setBindings, "setBindings");
    function defaultMixinMergeStrategy(mergeObject, mixinObject) {
      return Object.assign(mixinObject, mergeObject);
    }
    __name(defaultMixinMergeStrategy, "defaultMixinMergeStrategy");
    function write2(_obj, msg, num) {
      const t = this[timeSym]();
      const mixin3 = this[mixinSym];
      const errorKey = this[errorKeySym];
      const messageKey = this[messageKeySym];
      const mixinMergeStrategy = this[mixinMergeStrategySym] || defaultMixinMergeStrategy;
      let obj;
      if (_obj === void 0 || _obj === null) {
        obj = {};
      } else if (_obj instanceof Error) {
        obj = { [errorKey]: _obj };
        if (msg === void 0) {
          msg = _obj.message;
        }
      } else {
        obj = _obj;
        if (msg === void 0 && _obj[messageKey] === void 0 && _obj[errorKey]) {
          msg = _obj[errorKey].message;
        }
      }
      if (mixin3) {
        obj = mixinMergeStrategy(obj, mixin3(obj, num, this));
      }
      const s = this[asJsonSym](obj, msg, num, t);
      const stream2 = this[streamSym];
      if (stream2[needsMetadataGsym] === true) {
        stream2.lastLevel = num;
        stream2.lastObj = obj;
        stream2.lastMsg = msg;
        stream2.lastTime = t.slice(this[timeSliceIndexSym]);
        stream2.lastLogger = this;
      }
      stream2.write(s);
    }
    __name(write2, "write");
    function noop() {
    }
    __name(noop, "noop");
    function flush(cb) {
      if (cb != null && typeof cb !== "function") {
        throw Error("callback must be a function");
      }
      const stream2 = this[streamSym];
      if (typeof stream2.flush === "function") {
        stream2.flush(cb || noop);
      } else if (cb)
        cb();
    }
    __name(flush, "flush");
  }
});

// node_modules/.pnpm/safe-stable-stringify@2.4.3/node_modules/safe-stable-stringify/index.js
var require_safe_stable_stringify = __commonJS({
  "node_modules/.pnpm/safe-stable-stringify@2.4.3/node_modules/safe-stable-stringify/index.js"(exports2, module2) {
    "use strict";
    var { hasOwnProperty } = Object.prototype;
    var stringify = configure();
    stringify.configure = configure;
    stringify.stringify = stringify;
    stringify.default = stringify;
    exports2.stringify = stringify;
    exports2.configure = configure;
    module2.exports = stringify;
    var strEscapeSequencesRegExp = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
    function strEscape(str) {
      if (str.length < 5e3 && !strEscapeSequencesRegExp.test(str)) {
        return `"${str}"`;
      }
      return JSON.stringify(str);
    }
    __name(strEscape, "strEscape");
    function insertSort(array) {
      if (array.length > 200) {
        return array.sort();
      }
      for (let i = 1; i < array.length; i++) {
        const currentValue = array[i];
        let position = i;
        while (position !== 0 && array[position - 1] > currentValue) {
          array[position] = array[position - 1];
          position--;
        }
        array[position] = currentValue;
      }
      return array;
    }
    __name(insertSort, "insertSort");
    var typedArrayPrototypeGetSymbolToStringTag = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(
        Object.getPrototypeOf(
          new Int8Array()
        )
      ),
      Symbol.toStringTag
    ).get;
    function isTypedArrayWithEntries(value) {
      return typedArrayPrototypeGetSymbolToStringTag.call(value) !== void 0 && value.length !== 0;
    }
    __name(isTypedArrayWithEntries, "isTypedArrayWithEntries");
    function stringifyTypedArray(array, separator, maximumBreadth) {
      if (array.length < maximumBreadth) {
        maximumBreadth = array.length;
      }
      const whitespace = separator === "," ? "" : " ";
      let res = `"0":${whitespace}${array[0]}`;
      for (let i = 1; i < maximumBreadth; i++) {
        res += `${separator}"${i}":${whitespace}${array[i]}`;
      }
      return res;
    }
    __name(stringifyTypedArray, "stringifyTypedArray");
    function getCircularValueOption(options3) {
      if (hasOwnProperty.call(options3, "circularValue")) {
        const circularValue = options3.circularValue;
        if (typeof circularValue === "string") {
          return `"${circularValue}"`;
        }
        if (circularValue == null) {
          return circularValue;
        }
        if (circularValue === Error || circularValue === TypeError) {
          return {
            toString() {
              throw new TypeError("Converting circular structure to JSON");
            }
          };
        }
        throw new TypeError('The "circularValue" argument must be of type string or the value null or undefined');
      }
      return '"[Circular]"';
    }
    __name(getCircularValueOption, "getCircularValueOption");
    function getBooleanOption(options3, key) {
      let value;
      if (hasOwnProperty.call(options3, key)) {
        value = options3[key];
        if (typeof value !== "boolean") {
          throw new TypeError(`The "${key}" argument must be of type boolean`);
        }
      }
      return value === void 0 ? true : value;
    }
    __name(getBooleanOption, "getBooleanOption");
    function getPositiveIntegerOption(options3, key) {
      let value;
      if (hasOwnProperty.call(options3, key)) {
        value = options3[key];
        if (typeof value !== "number") {
          throw new TypeError(`The "${key}" argument must be of type number`);
        }
        if (!Number.isInteger(value)) {
          throw new TypeError(`The "${key}" argument must be an integer`);
        }
        if (value < 1) {
          throw new RangeError(`The "${key}" argument must be >= 1`);
        }
      }
      return value === void 0 ? Infinity : value;
    }
    __name(getPositiveIntegerOption, "getPositiveIntegerOption");
    function getItemCount(number) {
      if (number === 1) {
        return "1 item";
      }
      return `${number} items`;
    }
    __name(getItemCount, "getItemCount");
    function getUniqueReplacerSet(replacerArray) {
      const replacerSet = /* @__PURE__ */ new Set();
      for (const value of replacerArray) {
        if (typeof value === "string" || typeof value === "number") {
          replacerSet.add(String(value));
        }
      }
      return replacerSet;
    }
    __name(getUniqueReplacerSet, "getUniqueReplacerSet");
    function getStrictOption(options3) {
      if (hasOwnProperty.call(options3, "strict")) {
        const value = options3.strict;
        if (typeof value !== "boolean") {
          throw new TypeError('The "strict" argument must be of type boolean');
        }
        if (value) {
          return (value2) => {
            let message = `Object can not safely be stringified. Received type ${typeof value2}`;
            if (typeof value2 !== "function")
              message += ` (${value2.toString()})`;
            throw new Error(message);
          };
        }
      }
    }
    __name(getStrictOption, "getStrictOption");
    function configure(options3) {
      options3 = { ...options3 };
      const fail = getStrictOption(options3);
      if (fail) {
        if (options3.bigint === void 0) {
          options3.bigint = false;
        }
        if (!("circularValue" in options3)) {
          options3.circularValue = Error;
        }
      }
      const circularValue = getCircularValueOption(options3);
      const bigint = getBooleanOption(options3, "bigint");
      const deterministic = getBooleanOption(options3, "deterministic");
      const maximumDepth = getPositiveIntegerOption(options3, "maximumDepth");
      const maximumBreadth = getPositiveIntegerOption(options3, "maximumBreadth");
      function stringifyFnReplacer(key, parent, stack, replacer, spacer, indentation) {
        let value = parent[key];
        if (typeof value === "object" && value !== null && typeof value.toJSON === "function") {
          value = value.toJSON(key);
        }
        value = replacer.call(parent, key, value);
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            let res = "";
            let join = ",";
            const originalIndentation = indentation;
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              if (spacer !== "") {
                indentation += spacer;
                res += `
${indentation}`;
                join = `,
${indentation}`;
              }
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyFnReplacer(String(i), value, stack, replacer, spacer, indentation);
                res += tmp2 !== void 0 ? tmp2 : "null";
                res += join;
              }
              const tmp = stringifyFnReplacer(String(i), value, stack, replacer, spacer, indentation);
              res += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              if (spacer !== "") {
                res += `
${originalIndentation}`;
              }
              stack.pop();
              return `[${res}]`;
            }
            let keys4 = Object.keys(value);
            const keyLength = keys4.length;
            if (keyLength === 0) {
              return "{}";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            let whitespace = "";
            let separator = "";
            if (spacer !== "") {
              indentation += spacer;
              join = `,
${indentation}`;
              whitespace = " ";
            }
            const maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (deterministic && !isTypedArrayWithEntries(value)) {
              keys4 = insertSort(keys4);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys4[i];
              const tmp = stringifyFnReplacer(key2, value, stack, replacer, spacer, indentation);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}:${whitespace}${tmp}`;
                separator = join;
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res += `${separator}"...":${whitespace}"${getItemCount(removedKeys)} not stringified"`;
              separator = join;
            }
            if (spacer !== "" && separator.length > 1) {
              res = `
${indentation}${res}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          default:
            return fail ? fail(value) : void 0;
        }
      }
      __name(stringifyFnReplacer, "stringifyFnReplacer");
      function stringifyArrayReplacer(key, value, stack, replacer, spacer, indentation) {
        if (typeof value === "object" && value !== null && typeof value.toJSON === "function") {
          value = value.toJSON(key);
        }
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            const originalIndentation = indentation;
            let res = "";
            let join = ",";
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              if (spacer !== "") {
                indentation += spacer;
                res += `
${indentation}`;
                join = `,
${indentation}`;
              }
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyArrayReplacer(String(i), value[i], stack, replacer, spacer, indentation);
                res += tmp2 !== void 0 ? tmp2 : "null";
                res += join;
              }
              const tmp = stringifyArrayReplacer(String(i), value[i], stack, replacer, spacer, indentation);
              res += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              if (spacer !== "") {
                res += `
${originalIndentation}`;
              }
              stack.pop();
              return `[${res}]`;
            }
            stack.push(value);
            let whitespace = "";
            if (spacer !== "") {
              indentation += spacer;
              join = `,
${indentation}`;
              whitespace = " ";
            }
            let separator = "";
            for (const key2 of replacer) {
              const tmp = stringifyArrayReplacer(key2, value[key2], stack, replacer, spacer, indentation);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}:${whitespace}${tmp}`;
                separator = join;
              }
            }
            if (spacer !== "" && separator.length > 1) {
              res = `
${indentation}${res}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          default:
            return fail ? fail(value) : void 0;
        }
      }
      __name(stringifyArrayReplacer, "stringifyArrayReplacer");
      function stringifyIndent(key, value, stack, spacer, indentation) {
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (typeof value.toJSON === "function") {
              value = value.toJSON(key);
              if (typeof value !== "object") {
                return stringifyIndent(key, value, stack, spacer, indentation);
              }
              if (value === null) {
                return "null";
              }
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            const originalIndentation = indentation;
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              indentation += spacer;
              let res2 = `
${indentation}`;
              const join2 = `,
${indentation}`;
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyIndent(String(i), value[i], stack, spacer, indentation);
                res2 += tmp2 !== void 0 ? tmp2 : "null";
                res2 += join2;
              }
              const tmp = stringifyIndent(String(i), value[i], stack, spacer, indentation);
              res2 += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res2 += `${join2}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              res2 += `
${originalIndentation}`;
              stack.pop();
              return `[${res2}]`;
            }
            let keys4 = Object.keys(value);
            const keyLength = keys4.length;
            if (keyLength === 0) {
              return "{}";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            indentation += spacer;
            const join = `,
${indentation}`;
            let res = "";
            let separator = "";
            let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (isTypedArrayWithEntries(value)) {
              res += stringifyTypedArray(value, join, maximumBreadth);
              keys4 = keys4.slice(value.length);
              maximumPropertiesToStringify -= value.length;
              separator = join;
            }
            if (deterministic) {
              keys4 = insertSort(keys4);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys4[i];
              const tmp = stringifyIndent(key2, value[key2], stack, spacer, indentation);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}: ${tmp}`;
                separator = join;
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res += `${separator}"...": "${getItemCount(removedKeys)} not stringified"`;
              separator = join;
            }
            if (separator !== "") {
              res = `
${indentation}${res}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          default:
            return fail ? fail(value) : void 0;
        }
      }
      __name(stringifyIndent, "stringifyIndent");
      function stringifySimple(key, value, stack) {
        switch (typeof value) {
          case "string":
            return strEscape(value);
          case "object": {
            if (value === null) {
              return "null";
            }
            if (typeof value.toJSON === "function") {
              value = value.toJSON(key);
              if (typeof value !== "object") {
                return stringifySimple(key, value, stack);
              }
              if (value === null) {
                return "null";
              }
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            let res = "";
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return "[]";
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifySimple(String(i), value[i], stack);
                res += tmp2 !== void 0 ? tmp2 : "null";
                res += ",";
              }
              const tmp = stringifySimple(String(i), value[i], stack);
              res += tmp !== void 0 ? tmp : "null";
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res += `,"... ${getItemCount(removedKeys)} not stringified"`;
              }
              stack.pop();
              return `[${res}]`;
            }
            let keys4 = Object.keys(value);
            const keyLength = keys4.length;
            if (keyLength === 0) {
              return "{}";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            let separator = "";
            let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (isTypedArrayWithEntries(value)) {
              res += stringifyTypedArray(value, ",", maximumBreadth);
              keys4 = keys4.slice(value.length);
              maximumPropertiesToStringify -= value.length;
              separator = ",";
            }
            if (deterministic) {
              keys4 = insertSort(keys4);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys4[i];
              const tmp = stringifySimple(key2, value[key2], stack);
              if (tmp !== void 0) {
                res += `${separator}${strEscape(key2)}:${tmp}`;
                separator = ",";
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res += `${separator}"...":"${getItemCount(removedKeys)} not stringified"`;
            }
            stack.pop();
            return `{${res}}`;
          }
          case "number":
            return isFinite(value) ? String(value) : fail ? fail(value) : "null";
          case "boolean":
            return value === true ? "true" : "false";
          case "undefined":
            return void 0;
          case "bigint":
            if (bigint) {
              return String(value);
            }
          default:
            return fail ? fail(value) : void 0;
        }
      }
      __name(stringifySimple, "stringifySimple");
      function stringify2(value, replacer, space) {
        if (arguments.length > 1) {
          let spacer = "";
          if (typeof space === "number") {
            spacer = " ".repeat(Math.min(space, 10));
          } else if (typeof space === "string") {
            spacer = space.slice(0, 10);
          }
          if (replacer != null) {
            if (typeof replacer === "function") {
              return stringifyFnReplacer("", { "": value }, [], replacer, spacer, "");
            }
            if (Array.isArray(replacer)) {
              return stringifyArrayReplacer("", value, [], getUniqueReplacerSet(replacer), spacer, "");
            }
          }
          if (spacer.length !== 0) {
            return stringifyIndent("", value, [], spacer, "");
          }
        }
        return stringifySimple("", value, []);
      }
      __name(stringify2, "stringify");
      return stringify2;
    }
    __name(configure, "configure");
  }
});

// node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/multistream.js
var require_multistream = __commonJS({
  "node_modules/.pnpm/pino@9.1.0/node_modules/pino/lib/multistream.js"(exports2, module2) {
    "use strict";
    var metadata = Symbol.for("pino.metadata");
    var { DEFAULT_LEVELS } = require_constants();
    var DEFAULT_INFO_LEVEL = DEFAULT_LEVELS.info;
    function multistream(streamsArray, opts) {
      let counter = 0;
      streamsArray = streamsArray || [];
      opts = opts || { dedupe: false };
      const streamLevels = Object.create(DEFAULT_LEVELS);
      streamLevels.silent = Infinity;
      if (opts.levels && typeof opts.levels === "object") {
        Object.keys(opts.levels).forEach((i) => {
          streamLevels[i] = opts.levels[i];
        });
      }
      const res = {
        write: write2,
        add,
        emit,
        flushSync,
        end,
        minLevel: 0,
        streams: [],
        clone,
        [metadata]: true,
        streamLevels
      };
      if (Array.isArray(streamsArray)) {
        streamsArray.forEach(add, res);
      } else {
        add.call(res, streamsArray);
      }
      streamsArray = null;
      return res;
      function write2(data) {
        let dest;
        const level = this.lastLevel;
        const { streams } = this;
        let recordedLevel = 0;
        let stream2;
        for (let i = initLoopVar(streams.length, opts.dedupe); checkLoopVar(i, streams.length, opts.dedupe); i = adjustLoopVar(i, opts.dedupe)) {
          dest = streams[i];
          if (dest.level <= level) {
            if (recordedLevel !== 0 && recordedLevel !== dest.level) {
              break;
            }
            stream2 = dest.stream;
            if (stream2[metadata]) {
              const { lastTime, lastMsg, lastObj, lastLogger } = this;
              stream2.lastLevel = level;
              stream2.lastTime = lastTime;
              stream2.lastMsg = lastMsg;
              stream2.lastObj = lastObj;
              stream2.lastLogger = lastLogger;
            }
            stream2.write(data);
            if (opts.dedupe) {
              recordedLevel = dest.level;
            }
          } else if (!opts.dedupe) {
            break;
          }
        }
      }
      __name(write2, "write");
      function emit(...args2) {
        for (const { stream: stream2 } of this.streams) {
          if (typeof stream2.emit === "function") {
            stream2.emit(...args2);
          }
        }
      }
      __name(emit, "emit");
      function flushSync() {
        for (const { stream: stream2 } of this.streams) {
          if (typeof stream2.flushSync === "function") {
            stream2.flushSync();
          }
        }
      }
      __name(flushSync, "flushSync");
      function add(dest) {
        if (!dest) {
          return res;
        }
        const isStream = typeof dest.write === "function" || dest.stream;
        const stream_ = dest.write ? dest : dest.stream;
        if (!isStream) {
          throw Error("stream object needs to implement either StreamEntry or DestinationStream interface");
        }
        const { streams, streamLevels: streamLevels2 } = this;
        let level;
        if (typeof dest.levelVal === "number") {
          level = dest.levelVal;
        } else if (typeof dest.level === "string") {
          level = streamLevels2[dest.level];
        } else if (typeof dest.level === "number") {
          level = dest.level;
        } else {
          level = DEFAULT_INFO_LEVEL;
        }
        const dest_ = {
          stream: stream_,
          level,
          levelVal: void 0,
          id: counter++
        };
        streams.unshift(dest_);
        streams.sort(compareByLevel);
        this.minLevel = streams[0].level;
        return res;
      }
      __name(add, "add");
      function end() {
        for (const { stream: stream2 } of this.streams) {
          if (typeof stream2.flushSync === "function") {
            stream2.flushSync();
          }
          stream2.end();
        }
      }
      __name(end, "end");
      function clone(level) {
        const streams = new Array(this.streams.length);
        for (let i = 0; i < streams.length; i++) {
          streams[i] = {
            level,
            stream: this.streams[i].stream
          };
        }
        return {
          write: write2,
          add,
          minLevel: level,
          streams,
          clone,
          emit,
          flushSync,
          [metadata]: true
        };
      }
      __name(clone, "clone");
    }
    __name(multistream, "multistream");
    function compareByLevel(a, b) {
      return a.level - b.level;
    }
    __name(compareByLevel, "compareByLevel");
    function initLoopVar(length, dedupe) {
      return dedupe ? length - 1 : 0;
    }
    __name(initLoopVar, "initLoopVar");
    function adjustLoopVar(i, dedupe) {
      return dedupe ? i - 1 : i + 1;
    }
    __name(adjustLoopVar, "adjustLoopVar");
    function checkLoopVar(i, length, dedupe) {
      return dedupe ? i >= 0 : i < length;
    }
    __name(checkLoopVar, "checkLoopVar");
    module2.exports = multistream;
  }
});

// node_modules/.pnpm/pino@9.1.0/node_modules/pino/pino.js
var require_pino = __commonJS({
  "node_modules/.pnpm/pino@9.1.0/node_modules/pino/pino.js"(exports2, module2) {
    "use strict";
    var os = require("os");
    var stdSerializers = require_pino_std_serializers();
    var caller = require_caller();
    var redaction = require_redaction();
    var time = require_time();
    var proto = require_proto();
    var symbols = require_symbols();
    var { configure } = require_safe_stable_stringify();
    var { assertDefaultLevelFound, mappings, genLsCache, genLevelComparison, assertLevelComparison } = require_levels();
    var { DEFAULT_LEVELS, SORTING_ORDER } = require_constants();
    var {
      createArgsNormalizer,
      asChindings,
      buildSafeSonicBoom,
      buildFormatters,
      stringify,
      normalizeDestFileDescriptor,
      noop
    } = require_tools();
    var { version } = require_meta();
    var {
      chindingsSym,
      redactFmtSym,
      serializersSym,
      timeSym,
      timeSliceIndexSym,
      streamSym,
      stringifySym,
      stringifySafeSym,
      stringifiersSym,
      setLevelSym,
      endSym,
      formatOptsSym,
      messageKeySym,
      errorKeySym,
      nestedKeySym,
      mixinSym,
      levelCompSym,
      useOnlyCustomLevelsSym,
      formattersSym,
      hooksSym,
      nestedKeyStrSym,
      mixinMergeStrategySym,
      msgPrefixSym
    } = symbols;
    var { epochTime, nullTime } = time;
    var { pid } = process;
    var hostname = os.hostname();
    var defaultErrorSerializer = stdSerializers.err;
    var defaultOptions = {
      level: "info",
      levelComparison: SORTING_ORDER.ASC,
      levels: DEFAULT_LEVELS,
      messageKey: "msg",
      errorKey: "err",
      nestedKey: null,
      enabled: true,
      base: { pid, hostname },
      serializers: Object.assign(/* @__PURE__ */ Object.create(null), {
        err: defaultErrorSerializer
      }),
      formatters: Object.assign(/* @__PURE__ */ Object.create(null), {
        bindings(bindings) {
          return bindings;
        },
        level(label, number) {
          return { level: number };
        }
      }),
      hooks: {
        logMethod: void 0
      },
      timestamp: epochTime,
      name: void 0,
      redact: null,
      customLevels: null,
      useOnlyCustomLevels: false,
      depthLimit: 5,
      edgeLimit: 100
    };
    var normalize = createArgsNormalizer(defaultOptions);
    var serializers = Object.assign(/* @__PURE__ */ Object.create(null), stdSerializers);
    function pino2(...args2) {
      const instance = {};
      const { opts, stream: stream2 } = normalize(instance, caller(), ...args2);
      const {
        redact,
        crlf,
        serializers: serializers2,
        timestamp,
        messageKey,
        errorKey,
        nestedKey,
        base,
        name,
        level,
        customLevels,
        levelComparison,
        mixin: mixin3,
        mixinMergeStrategy,
        useOnlyCustomLevels,
        formatters,
        hooks,
        depthLimit,
        edgeLimit,
        onChild,
        msgPrefix
      } = opts;
      const stringifySafe = configure({
        maximumDepth: depthLimit,
        maximumBreadth: edgeLimit
      });
      const allFormatters = buildFormatters(
        formatters.level,
        formatters.bindings,
        formatters.log
      );
      const stringifyFn = stringify.bind({
        [stringifySafeSym]: stringifySafe
      });
      const stringifiers = redact ? redaction(redact, stringifyFn) : {};
      const formatOpts = redact ? { stringify: stringifiers[redactFmtSym] } : { stringify: stringifyFn };
      const end = "}" + (crlf ? "\r\n" : "\n");
      const coreChindings = asChindings.bind(null, {
        [chindingsSym]: "",
        [serializersSym]: serializers2,
        [stringifiersSym]: stringifiers,
        [stringifySym]: stringify,
        [stringifySafeSym]: stringifySafe,
        [formattersSym]: allFormatters
      });
      let chindings = "";
      if (base !== null) {
        if (name === void 0) {
          chindings = coreChindings(base);
        } else {
          chindings = coreChindings(Object.assign({}, base, { name }));
        }
      }
      const time2 = timestamp instanceof Function ? timestamp : timestamp ? epochTime : nullTime;
      const timeSliceIndex = time2().indexOf(":") + 1;
      if (useOnlyCustomLevels && !customLevels)
        throw Error("customLevels is required if useOnlyCustomLevels is set true");
      if (mixin3 && typeof mixin3 !== "function")
        throw Error(`Unknown mixin type "${typeof mixin3}" - expected "function"`);
      if (msgPrefix && typeof msgPrefix !== "string")
        throw Error(`Unknown msgPrefix type "${typeof msgPrefix}" - expected "string"`);
      assertDefaultLevelFound(level, customLevels, useOnlyCustomLevels);
      const levels = mappings(customLevels, useOnlyCustomLevels);
      if (typeof stream2.emit === "function") {
        stream2.emit("message", { code: "PINO_CONFIG", config: { levels, messageKey, errorKey } });
      }
      assertLevelComparison(levelComparison);
      const levelCompFunc = genLevelComparison(levelComparison);
      Object.assign(instance, {
        levels,
        [levelCompSym]: levelCompFunc,
        [useOnlyCustomLevelsSym]: useOnlyCustomLevels,
        [streamSym]: stream2,
        [timeSym]: time2,
        [timeSliceIndexSym]: timeSliceIndex,
        [stringifySym]: stringify,
        [stringifySafeSym]: stringifySafe,
        [stringifiersSym]: stringifiers,
        [endSym]: end,
        [formatOptsSym]: formatOpts,
        [messageKeySym]: messageKey,
        [errorKeySym]: errorKey,
        [nestedKeySym]: nestedKey,
        // protect against injection
        [nestedKeyStrSym]: nestedKey ? `,${JSON.stringify(nestedKey)}:{` : "",
        [serializersSym]: serializers2,
        [mixinSym]: mixin3,
        [mixinMergeStrategySym]: mixinMergeStrategy,
        [chindingsSym]: chindings,
        [formattersSym]: allFormatters,
        [hooksSym]: hooks,
        silent: noop,
        onChild,
        [msgPrefixSym]: msgPrefix
      });
      Object.setPrototypeOf(instance, proto());
      genLsCache(instance);
      instance[setLevelSym](level);
      return instance;
    }
    __name(pino2, "pino");
    module2.exports = pino2;
    module2.exports.destination = (dest = process.stdout.fd) => {
      if (typeof dest === "object") {
        dest.dest = normalizeDestFileDescriptor(dest.dest || process.stdout.fd);
        return buildSafeSonicBoom(dest);
      } else {
        return buildSafeSonicBoom({ dest: normalizeDestFileDescriptor(dest), minLength: 0 });
      }
    };
    module2.exports.transport = require_transport();
    module2.exports.multistream = require_multistream();
    module2.exports.levels = mappings();
    module2.exports.stdSerializers = serializers;
    module2.exports.stdTimeFunctions = Object.assign({}, time);
    module2.exports.symbols = symbols;
    module2.exports.version = version;
    module2.exports.default = pino2;
    module2.exports.pino = pino2;
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DEFAULT_BASE_URL: () => DEFAULT_BASE_URL,
  Feasibility: () => Feasibility,
  Iudex: () => Iudex,
  Resolution: () => Resolution,
  TaskStatus: () => TaskStatus,
  TerminalTaskStatuses: () => TerminalTaskStatuses,
  WorkflowStatus: () => WorkflowStatus,
  baseTaskSchema: () => baseTaskSchema,
  chatErrorSchema: () => chatErrorSchema,
  chatFunctionCallSchema: () => chatFunctionCallSchema,
  chatFunctionReturnSchema: () => chatFunctionReturnSchema,
  chatImageSchema: () => chatImageSchema,
  chatListSchema: () => chatListSchema,
  chatTextSchema: () => chatTextSchema,
  chatTurnSchema: () => chatTurnSchema,
  config: () => config,
  convertSeverityTextToNumber: () => convertSeverityTextToNumber,
  convertSeverityValuesToLevel: () => convertSeverityValuesToLevel,
  createClient: () => createClient,
  createFunctionClient: () => createFunctionClient,
  createWorkflowClient: () => createWorkflowClient,
  emitOtelLog: () => emitOtelLog,
  extractMessageTextContent: () => extractMessageTextContent,
  feasibilityCheckSchema: () => feasibilityCheckSchema,
  fetchGetWorkflowById: () => fetchGetWorkflowById,
  fetchGetWorkflows: () => fetchGetWorkflows,
  fetchPostWorkflows: () => fetchPostWorkflows,
  getCallerInfo: () => getCallerInfo,
  getFirstTaskByStatus: () => getFirstTaskByStatus,
  getLastTaskByStatus: () => getLastTaskByStatus,
  getWorkflowByIdReqSchema: () => getWorkflowByIdReqSchema,
  getWorkflowByIdResSchema: () => getWorkflowByIdResSchema,
  getWorkflowsResSchema: () => getWorkflowsResSchema,
  instrument: () => instrument,
  iudexConsole: () => console_exports,
  iudexFastify: () => fastify_exports,
  iudexPino: () => pino_exports,
  iudexPinoHttp: () => pino_http_exports,
  iudexTrpc: () => trpc_exports,
  mapIudexToOpenAi: () => mapIudexToOpenAi,
  nextMessage: () => nextMessage,
  postWorkflowsReqSchema: () => postWorkflowsReqSchema,
  postWorkflowsResSchema: () => postWorkflowsResSchema,
  preOrderTraversal: () => preOrderTraversal,
  putFunctionJsons: () => putFunctionJsons,
  resolutionCheckSchema: () => resolutionCheckSchema,
  returnFunctionCall: () => returnFunctionCall,
  reversePreOrderTraversal: () => reversePreOrderTraversal,
  startWorkflow: () => startWorkflow,
  taskErroredSchema: () => taskErroredSchema,
  taskExecutingSchema: () => taskExecutingSchema,
  taskPendingSchema: () => taskPendingSchema,
  taskPlanningSchema: () => taskPlanningSchema,
  taskResolvedSchema: () => taskResolvedSchema,
  taskSchema: () => taskSchema,
  taskSequencedSchema: () => taskSequencedSchema,
  taskSequencingSchema: () => taskSequencingSchema,
  trackAttribute: () => trackAttribute,
  withTracing: () => withTracing,
  workflowInfoSchema: () => workflowInfoSchema,
  workflowMetadataSchema: () => workflowMetadataSchema,
  workflowSchema: () => workflowSchema
});
module.exports = __toCommonJS(src_exports);
__reExport(src_exports, require("function-json-schema"), module.exports);

// src/utils.ts
function setTimeoutPromise(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
__name(setTimeoutPromise, "setTimeoutPromise");
function poll(fn, args2, {
  maxTries,
  tries,
  waitMs
} = { maxTries: 60, tries: 0, waitMs: 1e3 }) {
  if (tries >= maxTries) {
    throw Error(
      `Polling failed after ${maxTries} tries for function ${fn.name}.`
    );
  }
  return fn(...args2).then((res) => {
    if (res == null) {
      return setTimeoutPromise(waitMs).then(() => poll(fn, args2, { maxTries, tries: tries + 1, waitMs }));
    }
    return res;
  });
}
__name(poll, "poll");
function deconstructedPromise() {
  let promiseResolve;
  let promiseReject;
  const promise = new Promise((resolve, reject) => {
    promiseResolve = resolve;
    promiseReject = reject;
  });
  return {
    promise,
    resolve: promiseResolve,
    reject: promiseReject
  };
}
__name(deconstructedPromise, "deconstructedPromise");

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_isPlaceholder.js
function _isPlaceholder(a) {
  return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
}
__name(_isPlaceholder, "_isPlaceholder");

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_curry1.js
function _curry1(fn) {
  return /* @__PURE__ */ __name(function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  }, "f1");
}
__name(_curry1, "_curry1");

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_curry2.js
function _curry2(fn) {
  return /* @__PURE__ */ __name(function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a2) {
          return fn(_a2, b);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  }, "f2");
}
__name(_curry2, "_curry2");

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_isArray.js
var isArray_default = Array.isArray || /* @__PURE__ */ __name(function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
}, "_isArray");

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_has.js
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
__name(_has, "_has");

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_isArguments.js
var toString = Object.prototype.toString;
var _isArguments = /* @__PURE__ */ function() {
  return toString.call(arguments) === "[object Arguments]" ? /* @__PURE__ */ __name(function _isArguments2(x) {
    return toString.call(x) === "[object Arguments]";
  }, "_isArguments") : /* @__PURE__ */ __name(function _isArguments2(x) {
    return _has("callee", x);
  }, "_isArguments");
}();
var isArguments_default = _isArguments;

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/keys.js
var hasEnumBug = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString");
var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
var hasArgsEnumBug = /* @__PURE__ */ function() {
  "use strict";
  return arguments.propertyIsEnumerable("length");
}();
var contains = /* @__PURE__ */ __name(function contains2(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
}, "contains");
var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(/* @__PURE__ */ __name(function keys2(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}, "keys")) : /* @__PURE__ */ _curry1(/* @__PURE__ */ __name(function keys3(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && isArguments_default(obj);
  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== "length")) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
}, "keys"));
var keys_default = keys;

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_toISOString.js
var pad = /* @__PURE__ */ __name(function pad2(n) {
  return (n < 10 ? "0" : "") + n;
}, "pad");
var _toISOString = typeof Date.prototype.toISOString === "function" ? /* @__PURE__ */ __name(function _toISOString2(d) {
  return d.toISOString();
}, "_toISOString") : /* @__PURE__ */ __name(function _toISOString3(d) {
  return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
}, "_toISOString");

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_arrayReduce.js
function _arrayReduce(reducer, acc, list) {
  var index = 0;
  var length = list.length;
  while (index < length) {
    acc = reducer(acc, list[index]);
    index += 1;
  }
  return acc;
}
__name(_arrayReduce, "_arrayReduce");

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_isInteger.js
var isInteger_default = Number.isInteger || /* @__PURE__ */ __name(function _isInteger(n) {
  return n << 0 === n;
}, "_isInteger");

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_objectAssign.js
function _objectAssign(target) {
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  var output = Object(target);
  var idx = 1;
  var length = arguments.length;
  while (idx < length) {
    var source = arguments[idx];
    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
    idx += 1;
  }
  return output;
}
__name(_objectAssign, "_objectAssign");
var objectAssign_default = typeof Object.assign === "function" ? Object.assign : _objectAssign;

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/mapObjIndexed.js
var mapObjIndexed = /* @__PURE__ */ _curry2(/* @__PURE__ */ __name(function mapObjIndexed2(fn, obj) {
  return _arrayReduce(function(acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys_default(obj));
}, "mapObjIndexed"));
var mapObjIndexed_default = mapObjIndexed;

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/mergeAll.js
var mergeAll = /* @__PURE__ */ _curry1(/* @__PURE__ */ __name(function mergeAll2(list) {
  return objectAssign_default.apply(null, [{}].concat(list));
}, "mergeAll"));
var mergeAll_default = mergeAll;

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/trim.js
var hasProtoTrim = typeof String.prototype.trim === "function";

// src/clients/function-client.ts
function checkResponse(r) {
  if (!r.ok) {
    throw Error(`Request ${r.url} failed with ${r.status}: ${r.statusText}`);
  }
  if (r.status === 204) {
    return Promise.resolve();
  }
  return r.json();
}
__name(checkResponse, "checkResponse");
function throwOnApiError(json) {
  if (json?.message === "Service Unavailable") {
    throw Error(json.message);
  }
  return json;
}
__name(throwOnApiError, "throwOnApiError");
function unwrapApi(json) {
  if (json?.body && typeof json.body === "string" && json.body.startsWith("{") && json.body.endsWith("}")) {
    return JSON.parse(json.body);
  }
  return json;
}
__name(unwrapApi, "unwrapApi");
function parseIudexResponse(r) {
  return checkResponse(r).then(throwOnApiError).then(unwrapApi).then((v) => {
    if (process.env.DEBUG_MODE) {
      console.log((/* @__PURE__ */ new Date()).toISOString(), "Response:", v);
    }
    return v;
  }).catch((e) => {
    throw Error(`Request ${r.url} failed with ${r.status}: ${e.message}`);
  });
}
__name(parseIudexResponse, "parseIudexResponse");
function createFunctionClient(baseUrl, apiKey) {
  const fns = {
    returnFunctionCall,
    nextMessage,
    startWorkflow,
    putFunctionJsons
  };
  return mapObjIndexed_default((fn) => fn(baseUrl, apiKey), fns);
}
__name(createFunctionClient, "createFunctionClient");
function returnFunctionCall(baseUrl, apiKey) {
  return function(functionCallId, functionReturn) {
    const bodyJson = {
      functionCallId,
      functionReturn
    };
    return fetch(baseUrl + "/function_calls/" + functionCallId + "/return", {
      method: "PUT",
      headers: { "x-api-key": `${apiKey}` },
      body: JSON.stringify(bodyJson)
    }).then(parseIudexResponse);
  };
}
__name(returnFunctionCall, "returnFunctionCall");
function nextMessage(baseUrl, apiKey) {
  return function(workflowId) {
    return fetch(baseUrl + "/workflows/" + workflowId + "/next_message", {
      method: "GET",
      headers: { "x-api-key": `${apiKey}` }
    }).then(parseIudexResponse);
  };
}
__name(nextMessage, "nextMessage");
function startWorkflow(baseUrl, apiKey) {
  return function(query, modules) {
    return fetch(baseUrl + "/workflows", {
      method: "POST",
      headers: { "x-api-key": `${apiKey}` },
      body: JSON.stringify({ query, modules })
    }).then(parseIudexResponse);
  };
}
__name(startWorkflow, "startWorkflow");
function putFunctionJsons(baseUrl, apiKey) {
  return function(jsons, module2) {
    const bodyJson = { jsons, module: module2 };
    return fetch(baseUrl + "/function_jsons", {
      method: "PUT",
      headers: { "x-api-key": `${apiKey}` },
      body: JSON.stringify(bodyJson)
    }).then(parseIudexResponse);
  };
}
__name(putFunctionJsons, "putFunctionJsons");

// src/clients/workflow-client.ts
function createWorkflowClient(baseUrl, apiKey) {
  const fns = {
    fetchGetWorkflows,
    fetchGetWorkflowById,
    fetchPostWorkflows
  };
  return mapObjIndexed_default((fn) => fn(baseUrl, apiKey), fns);
}
__name(createWorkflowClient, "createWorkflowClient");
async function checkResponseStatus(res) {
  const body = await res.json();
  if (!res.ok) {
    const error = body.error || res.statusText || body.message;
    throw new Error(`Request failed with: ${error}`);
  }
  return body;
}
__name(checkResponseStatus, "checkResponseStatus");
function fetchGetWorkflows(baseUrl, apiKey) {
  return function() {
    return fetch(`${baseUrl}/workflows`, {
      method: "GET",
      headers: { "x-api-key": apiKey }
    }).then(checkResponseStatus);
  };
}
__name(fetchGetWorkflows, "fetchGetWorkflows");
function fetchGetWorkflowById(baseUrl, apiKey) {
  return function(req) {
    return fetch(`${baseUrl}/workflows/${req.workflowId}`, {
      method: "GET",
      headers: { "x-api-key": apiKey }
    }).then(checkResponseStatus);
  };
}
__name(fetchGetWorkflowById, "fetchGetWorkflowById");
function fetchPostWorkflows(baseUrl, apiKey) {
  return function(req) {
    return fetch(`${baseUrl}/workflows`, {
      method: "POST",
      body: JSON.stringify(req),
      headers: { "x-api-key": apiKey }
    }).then(checkResponseStatus);
  };
}
__name(fetchPostWorkflows, "fetchPostWorkflows");

// src/clients/workflow-schemas.ts
var import_zod3 = __toESM(require("zod"));

// src/types/task-types.ts
var import_zod = __toESM(require("zod"));
var TaskStatus = {
  // Queued state
  Pending: "Pending",
  // awaiting processing
  // Processing states
  Planning: "Planning",
  // in programmer
  Executing: "Executing",
  // in executor
  Sequencing: "Sequencing",
  // in sequencer
  // Terminal states
  Resolved: "Resolved",
  // execution resolved task
  Sequenced: "Sequenced",
  // no resolution; sequuencer created subtasks
  Errored: "Errored"
  // unrecoverable error during processing
};
var TerminalTaskStatuses = [
  TaskStatus.Resolved,
  TaskStatus.Sequenced,
  TaskStatus.Errored
];
var baseTaskSchema = import_zod.default.object({
  id: import_zod.default.string(),
  description: import_zod.default.string(),
  status: import_zod.default.nativeEnum(TaskStatus),
  stepIndex: import_zod.default.number(),
  depth: import_zod.default.number(),
  numRewrites: import_zod.default.number()
});
var Feasibility = {
  Feasible: "Feasible",
  Rewritable: "Rewritable",
  Infeasible: "Infeasible"
};
var feasibilityCheckSchema = import_zod.default.object({
  feasibility: import_zod.default.nativeEnum(Feasibility),
  reason: import_zod.default.coerce.string(),
  fix: import_zod.default.string().optional()
});
var Resolution = {
  Resolved: "Resolved",
  Rewritable: "Rewritable",
  Infeasible: "Infeasible"
};
var resolutionCheckSchema = import_zod.default.object({
  resolution: import_zod.default.nativeEnum(Resolution),
  reason: import_zod.default.coerce.string(),
  fix: import_zod.default.string().optional()
});
var taskPendingSchema = baseTaskSchema.extend({
  status: import_zod.default.literal(TaskStatus.Pending)
});
var taskPlanningSchema = baseTaskSchema.extend({
  status: import_zod.default.literal(TaskStatus.Planning),
  // present if rewriting
  program: import_zod.default.string().optional(),
  feasibilityCheck: feasibilityCheckSchema.optional(),
  // present if rewriting from executor
  resolutionCheck: resolutionCheckSchema.optional()
});
var taskExecutingSchema = baseTaskSchema.extend({
  status: import_zod.default.literal(TaskStatus.Executing),
  program: import_zod.default.string(),
  usedFunctionNames: import_zod.default.array(import_zod.default.string()),
  feasibilityCheck: feasibilityCheckSchema
});
var taskResolvedSchema = baseTaskSchema.extend({
  status: import_zod.default.literal(TaskStatus.Resolved),
  program: import_zod.default.string(),
  usedFunctionNames: import_zod.default.array(import_zod.default.string()),
  feasibilityCheck: feasibilityCheckSchema,
  resolutionCheck: resolutionCheckSchema
});
var taskSequencingSchema = baseTaskSchema.extend({
  status: import_zod.default.literal(TaskStatus.Sequencing),
  program: import_zod.default.string(),
  feasibilityCheck: feasibilityCheckSchema,
  // present if sequencing from executor
  usedFunctionNames: import_zod.default.array(import_zod.default.string()).optional(),
  resolutionCheck: resolutionCheckSchema.optional()
});
var taskSequencedSchema = baseTaskSchema.extend({
  status: import_zod.default.literal(TaskStatus.Sequenced),
  program: import_zod.default.string(),
  subtasks: import_zod.default.lazy(() => taskSchema.array()),
  feasibilityCheck: feasibilityCheckSchema,
  usedFunctionNames: import_zod.default.array(import_zod.default.string()).optional(),
  resolutionCheck: resolutionCheckSchema.optional()
});
var taskErroredSchema = baseTaskSchema.extend({
  status: import_zod.default.literal(TaskStatus.Errored),
  errorMsg: import_zod.default.string(),
  errorName: import_zod.default.string(),
  errorStack: import_zod.default.string().optional()
});
var taskSchema = import_zod.default.union([
  taskPendingSchema,
  taskPlanningSchema,
  taskExecutingSchema,
  taskResolvedSchema,
  taskSequencingSchema,
  taskSequencedSchema,
  taskErroredSchema
]);

// src/types/workflow-types.ts
var import_zod2 = __toESM(require("zod"));
var WorkflowStatus = {
  Running: "Running",
  Completed: "Completed",
  Failed: "Failed",
  Paused: "Paused",
  TimedOut: "TimedOut"
};
var workflowMetadataSchema = import_zod2.default.object({
  maxFunctionMatches: import_zod2.default.number().optional()
});
var workflowSchema = import_zod2.default.object({
  workflowId: import_zod2.default.string(),
  root: taskSchema,
  modules: import_zod2.default.array(import_zod2.default.string()).optional(),
  createdAt: import_zod2.default.string(),
  updatedAt: import_zod2.default.string(),
  metadata: workflowMetadataSchema.optional(),
  orgId: import_zod2.default.string()
});
var workflowInfoSchema = import_zod2.default.object({
  workflowId: import_zod2.default.string(),
  modules: import_zod2.default.array(import_zod2.default.string()).optional(),
  createdAt: import_zod2.default.string(),
  updatedAt: import_zod2.default.string(),
  // Task summary
  description: import_zod2.default.string(),
  status: import_zod2.default.nativeEnum(WorkflowStatus),
  numLeafTasks: import_zod2.default.number()
});

// src/clients/workflow-schemas.ts
var getWorkflowsResSchema = import_zod3.default.object({
  workflowInfos: import_zod3.default.array(workflowInfoSchema)
});
var getWorkflowByIdReqSchema = import_zod3.default.object({
  workflowId: import_zod3.default.string()
});
var getWorkflowByIdResSchema = import_zod3.default.object({
  workflow: taskSchema
  // root task
});
var postWorkflowsReqSchema = import_zod3.default.object({
  query: import_zod3.default.string(),
  // Undefined means use all org modules. [] means use all modules.
  modules: import_zod3.default.array(import_zod3.default.string()).optional(),
  opts: import_zod3.default.object({
    maxFunctionMatches: import_zod3.default.number().optional()
  }).optional()
});
var postWorkflowsResSchema = import_zod3.default.object({
  message: import_zod3.default.string(),
  workflowId: import_zod3.default.string()
});

// src/types/chat-types.ts
var import_zod4 = require("zod");
var chatTurnBaseSchema = import_zod4.z.object({
  id: import_zod4.z.string(),
  type: import_zod4.z.string(),
  sender: import_zod4.z.string(),
  timestamp: import_zod4.z.string()
});
var chatTextSchema = chatTurnBaseSchema.extend({
  type: import_zod4.z.literal("text"),
  text: import_zod4.z.string()
});
var chatErrorSchema = chatTurnBaseSchema.extend({
  type: import_zod4.z.literal("error"),
  name: import_zod4.z.string(),
  message: import_zod4.z.string(),
  cause: import_zod4.z.string().optional(),
  stack: import_zod4.z.string().optional()
});
var chatImageSchema = chatTurnBaseSchema.extend({
  type: import_zod4.z.literal("image"),
  image: import_zod4.z.string(),
  description: import_zod4.z.string()
});
var chatListSchema = chatTurnBaseSchema.extend({
  type: import_zod4.z.literal("list"),
  list: import_zod4.z.array(import_zod4.z.string())
});
var chatFunctionCallSchema = chatTurnBaseSchema.extend({
  type: import_zod4.z.literal("functionCall"),
  functionCallId: import_zod4.z.string(),
  functionName: import_zod4.z.string(),
  functionArgs: import_zod4.z.record(import_zod4.z.unknown())
});
var chatFunctionReturnSchema = chatTurnBaseSchema.extend({
  type: import_zod4.z.literal("functionReturn"),
  functionCallId: import_zod4.z.string(),
  functionReturn: import_zod4.z.string()
});
var chatTurnSchema = import_zod4.z.discriminatedUnion("type", [
  chatTextSchema,
  chatErrorSchema,
  chatImageSchema,
  chatListSchema,
  chatFunctionCallSchema,
  chatFunctionReturnSchema
]);

// src/instrumentation/index.ts
var import_auto_instrumentations_node = require("@opentelemetry/auto-instrumentations-node");
var import_sdk_node = require("@opentelemetry/sdk-node");
var import_sdk_trace_node = require("@opentelemetry/sdk-trace-node");
var import_resources = require("@opentelemetry/resources");
var import_semantic_conventions5 = require("@opentelemetry/semantic-conventions");
var import_api_logs2 = require("@opentelemetry/api-logs");
var import_sdk_logs = require("@opentelemetry/sdk-logs");

// ../../node_modules/.pnpm/@opentelemetry+exporter-logs-otlp-proto@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/exporter-logs-otlp-proto/build/esm/platform/node/OTLPLogExporter.js
init_esm();
init_esm2();

// ../../node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/platform/node/OTLPProtoExporterNodeBase.js
var import_api18 = require("@opentelemetry/api");
init_esm2();
var __extends4 = /* @__PURE__ */ function() {
  var extendStatics = /* @__PURE__ */ __name(function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  }, "extendStatics");
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    __name(__, "__");
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var OTLPProtoExporterNodeBase = (
  /** @class */
  function(_super) {
    __extends4(OTLPProtoExporterNodeBase2, _super);
    function OTLPProtoExporterNodeBase2(config5) {
      if (config5 === void 0) {
        config5 = {};
      }
      return _super.call(this, config5) || this;
    }
    __name(OTLPProtoExporterNodeBase2, "OTLPProtoExporterNodeBase");
    OTLPProtoExporterNodeBase2.prototype._sendPromise = function(objects, onSuccess, onError) {
      var _this = this;
      var promise = new Promise(function(resolve, reject) {
        _this._send(_this, objects, _this.compression, resolve, reject);
      }).then(onSuccess, onError);
      this._sendingPromises.push(promise);
      var popPromise = /* @__PURE__ */ __name(function() {
        var index = _this._sendingPromises.indexOf(promise);
        _this._sendingPromises.splice(index, 1);
      }, "popPromise");
      promise.then(popPromise, popPromise);
    };
    OTLPProtoExporterNodeBase2.prototype.send = function(objects, onSuccess, onError) {
      var _this = this;
      if (this._shutdownOnce.isCalled) {
        import_api18.diag.debug("Shutdown already started. Cannot send objects");
        return;
      }
      if (!this._send) {
        setImmediate(function() {
          var send2 = (init_util4(), __toCommonJS(util_exports)).send;
          _this._send = send2;
          _this._sendPromise(objects, onSuccess, onError);
        });
      } else {
        this._sendPromise(objects, onSuccess, onError);
      }
    };
    return OTLPProtoExporterNodeBase2;
  }(OTLPExporterNodeBase)
);

// ../../node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/platform/index.js
init_types4();

// ../../node_modules/.pnpm/@opentelemetry+otlp-transformer@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-transformer/build/esm/common/index.js
init_esm();
function hrTimeToNanos(hrTime) {
  var NANOSECONDS = BigInt(1e9);
  return BigInt(hrTime[0]) * NANOSECONDS + BigInt(hrTime[1]);
}
__name(hrTimeToNanos, "hrTimeToNanos");
function toLongBits(value) {
  var low = Number(BigInt.asUintN(32, value));
  var high = Number(BigInt.asUintN(32, value >> BigInt(32)));
  return { low, high };
}
__name(toLongBits, "toLongBits");
function encodeAsLongBits(hrTime) {
  var nanos = hrTimeToNanos(hrTime);
  return toLongBits(nanos);
}
__name(encodeAsLongBits, "encodeAsLongBits");
function encodeAsString(hrTime) {
  var nanos = hrTimeToNanos(hrTime);
  return nanos.toString();
}
__name(encodeAsString, "encodeAsString");
var encodeTimestamp = typeof BigInt !== "undefined" ? encodeAsString : hrTimeToNanoseconds;
function identity(value) {
  return value;
}
__name(identity, "identity");
function optionalHexToBinary(str) {
  if (str === void 0)
    return void 0;
  return hexToBinary(str);
}
__name(optionalHexToBinary, "optionalHexToBinary");
var DEFAULT_ENCODER = {
  encodeHrTime: encodeAsLongBits,
  encodeSpanContext: hexToBinary,
  encodeOptionalSpanContext: optionalHexToBinary
};
function getOtlpEncoder(options3) {
  var _a2, _b;
  if (options3 === void 0) {
    return DEFAULT_ENCODER;
  }
  var useLongBits = (_a2 = options3.useLongBits) !== null && _a2 !== void 0 ? _a2 : true;
  var useHex = (_b = options3.useHex) !== null && _b !== void 0 ? _b : false;
  return {
    encodeHrTime: useLongBits ? encodeAsLongBits : encodeTimestamp,
    encodeSpanContext: useHex ? identity : hexToBinary,
    encodeOptionalSpanContext: useHex ? identity : optionalHexToBinary
  };
}
__name(getOtlpEncoder, "getOtlpEncoder");

// ../../node_modules/.pnpm/@opentelemetry+otlp-transformer@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-transformer/build/esm/common/internal.js
var __read4 = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
function createInstrumentationScope(scope) {
  return {
    name: scope.name,
    version: scope.version
  };
}
__name(createInstrumentationScope, "createInstrumentationScope");
function toAttributes(attributes) {
  return Object.keys(attributes).map(function(key) {
    return toKeyValue(key, attributes[key]);
  });
}
__name(toAttributes, "toAttributes");
function toKeyValue(key, value) {
  return {
    key,
    value: toAnyValue(value)
  };
}
__name(toKeyValue, "toKeyValue");
function toAnyValue(value) {
  var t = typeof value;
  if (t === "string")
    return { stringValue: value };
  if (t === "number") {
    if (!Number.isInteger(value))
      return { doubleValue: value };
    return { intValue: value };
  }
  if (t === "boolean")
    return { boolValue: value };
  if (value instanceof Uint8Array)
    return { bytesValue: value };
  if (Array.isArray(value))
    return { arrayValue: { values: value.map(toAnyValue) } };
  if (t === "object" && value != null)
    return {
      kvlistValue: {
        values: Object.entries(value).map(function(_a2) {
          var _b = __read4(_a2, 2), k = _b[0], v = _b[1];
          return toKeyValue(k, v);
        })
      }
    };
  return {};
}
__name(toAnyValue, "toAnyValue");

// ../../node_modules/.pnpm/@opentelemetry+otlp-transformer@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-transformer/build/esm/resource/internal.js
function createResource(resource) {
  return {
    attributes: toAttributes(resource.attributes),
    droppedAttributesCount: 0
  };
}
__name(createResource, "createResource");

// ../../node_modules/.pnpm/@opentelemetry+otlp-transformer@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-transformer/build/esm/logs/index.js
var __values2 = function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read5 = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
function createExportLogsServiceRequest(logRecords, options3) {
  var encoder = getOtlpEncoder(options3);
  return {
    resourceLogs: logRecordsToResourceLogs(logRecords, encoder)
  };
}
__name(createExportLogsServiceRequest, "createExportLogsServiceRequest");
function createResourceMap(logRecords) {
  var e_1, _a2;
  var resourceMap = /* @__PURE__ */ new Map();
  try {
    for (var logRecords_1 = __values2(logRecords), logRecords_1_1 = logRecords_1.next(); !logRecords_1_1.done; logRecords_1_1 = logRecords_1.next()) {
      var record = logRecords_1_1.value;
      var resource = record.resource, _b = record.instrumentationScope, name_1 = _b.name, _c = _b.version, version = _c === void 0 ? "" : _c, _d = _b.schemaUrl, schemaUrl = _d === void 0 ? "" : _d;
      var ismMap = resourceMap.get(resource);
      if (!ismMap) {
        ismMap = /* @__PURE__ */ new Map();
        resourceMap.set(resource, ismMap);
      }
      var ismKey = name_1 + "@" + version + ":" + schemaUrl;
      var records = ismMap.get(ismKey);
      if (!records) {
        records = [];
        ismMap.set(ismKey, records);
      }
      records.push(record);
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (logRecords_1_1 && !logRecords_1_1.done && (_a2 = logRecords_1.return))
        _a2.call(logRecords_1);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return resourceMap;
}
__name(createResourceMap, "createResourceMap");
function logRecordsToResourceLogs(logRecords, encoder) {
  var resourceMap = createResourceMap(logRecords);
  return Array.from(resourceMap, function(_a2) {
    var _b = __read5(_a2, 2), resource = _b[0], ismMap = _b[1];
    return {
      resource: createResource(resource),
      scopeLogs: Array.from(ismMap, function(_a3) {
        var _b2 = __read5(_a3, 2), scopeLogs = _b2[1];
        return {
          scope: createInstrumentationScope(scopeLogs[0].instrumentationScope),
          logRecords: scopeLogs.map(function(log) {
            return toLogRecord(log, encoder);
          }),
          schemaUrl: scopeLogs[0].instrumentationScope.schemaUrl
        };
      }),
      schemaUrl: void 0
    };
  });
}
__name(logRecordsToResourceLogs, "logRecordsToResourceLogs");
function toLogRecord(log, encoder) {
  var _a2, _b, _c;
  return {
    timeUnixNano: encoder.encodeHrTime(log.hrTime),
    observedTimeUnixNano: encoder.encodeHrTime(log.hrTimeObserved),
    severityNumber: toSeverityNumber(log.severityNumber),
    severityText: log.severityText,
    body: toAnyValue(log.body),
    attributes: toLogAttributes(log.attributes),
    droppedAttributesCount: log.droppedAttributesCount,
    flags: (_a2 = log.spanContext) === null || _a2 === void 0 ? void 0 : _a2.traceFlags,
    traceId: encoder.encodeOptionalSpanContext((_b = log.spanContext) === null || _b === void 0 ? void 0 : _b.traceId),
    spanId: encoder.encodeOptionalSpanContext((_c = log.spanContext) === null || _c === void 0 ? void 0 : _c.spanId)
  };
}
__name(toLogRecord, "toLogRecord");
function toSeverityNumber(severityNumber) {
  return severityNumber;
}
__name(toSeverityNumber, "toSeverityNumber");
function toLogAttributes(attributes) {
  return Object.keys(attributes).map(function(key) {
    return toKeyValue(key, attributes[key]);
  });
}
__name(toLogAttributes, "toLogAttributes");

// ../../node_modules/.pnpm/@opentelemetry+exporter-logs-otlp-proto@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/exporter-logs-otlp-proto/build/esm/version.js
var VERSION3 = "0.51.1";

// ../../node_modules/.pnpm/@opentelemetry+exporter-logs-otlp-proto@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/exporter-logs-otlp-proto/build/esm/platform/node/OTLPLogExporter.js
var __extends5 = /* @__PURE__ */ function() {
  var extendStatics = /* @__PURE__ */ __name(function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  }, "extendStatics");
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    __name(__, "__");
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __assign2 = function() {
  __assign2 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
var USER_AGENT = {
  "User-Agent": "OTel-OTLP-Exporter-JavaScript/" + VERSION3
};
var DEFAULT_COLLECTOR_RESOURCE_PATH = "v1/logs";
var DEFAULT_COLLECTOR_URL = "http://localhost:4318/" + DEFAULT_COLLECTOR_RESOURCE_PATH;
var OTLPLogExporter = (
  /** @class */
  function(_super) {
    __extends5(OTLPLogExporter2, _super);
    function OTLPLogExporter2(config5) {
      if (config5 === void 0) {
        config5 = {};
      }
      var _this = _super.call(this, config5) || this;
      _this.headers = __assign2(__assign2(__assign2(__assign2({}, _this.headers), USER_AGENT), utils_exports.parseKeyPairsIntoRecord(getEnv().OTEL_EXPORTER_OTLP_LOGS_HEADERS)), parseHeaders(config5 === null || config5 === void 0 ? void 0 : config5.headers));
      return _this;
    }
    __name(OTLPLogExporter2, "OTLPLogExporter");
    OTLPLogExporter2.prototype.convert = function(logs3) {
      return createExportLogsServiceRequest(logs3);
    };
    OTLPLogExporter2.prototype.getDefaultUrl = function(config5) {
      return typeof config5.url === "string" ? config5.url : getEnv().OTEL_EXPORTER_OTLP_LOGS_ENDPOINT.length > 0 ? appendRootPathToUrlIfNeeded(getEnv().OTEL_EXPORTER_OTLP_LOGS_ENDPOINT) : getEnv().OTEL_EXPORTER_OTLP_ENDPOINT.length > 0 ? appendResourcePathToUrl(getEnv().OTEL_EXPORTER_OTLP_ENDPOINT, DEFAULT_COLLECTOR_RESOURCE_PATH) : DEFAULT_COLLECTOR_URL;
    };
    OTLPLogExporter2.prototype.getServiceClientType = function() {
      return ServiceClientType.LOGS;
    };
    return OTLPLogExporter2;
  }(OTLPProtoExporterNodeBase)
);

// src/instrumentation/index.ts
var import_exporter_trace_otlp_proto = require("@opentelemetry/exporter-trace-otlp-proto");
var import_lodash4 = __toESM(require("lodash"));

// src/instrumentation/utils.ts
var import_semantic_conventions2 = require("@opentelemetry/semantic-conventions");
var import_api_logs = require("@opentelemetry/api-logs");
var import_lodash = __toESM(require("lodash"));
var config = { isInstrumented: false, oldConsole: { ...console } };
function convertSeverityTextToNumber(severityText) {
  if (severityText == void 0) {
    return;
  }
  switch (severityText) {
    case "TRACE":
      return 1;
    case "DEBUG":
      return 5;
    case "INFO":
      return 9;
    case "WARN":
      return 13;
    case "ERROR":
      return 17;
    case "FATAL":
      return 21;
    default:
      return;
  }
}
__name(convertSeverityTextToNumber, "convertSeverityTextToNumber");
function convertSeverityValuesToLevel(severityNumber, severityText) {
  severityNumber ||= convertSeverityTextToNumber(severityText) || 0;
  if (severityNumber >= 1 && severityNumber <= 4) {
    return "TRACE";
  } else if (severityNumber >= 5 && severityNumber <= 8) {
    return "DEBUG";
  } else if (severityNumber >= 9 && severityNumber <= 12) {
    return "INFO";
  } else if (severityNumber >= 13 && severityNumber <= 16) {
    return "WARN";
  } else if (severityNumber >= 17 && severityNumber <= 20) {
    return "ERROR";
  } else if (severityNumber >= 21 && severityNumber <= 24) {
    return "FATAL";
  } else {
    return "INFO";
  }
}
__name(convertSeverityValuesToLevel, "convertSeverityValuesToLevel");
function getCallerInfo(frameDepth) {
  const stack = new Error().stack;
  if (!stack)
    return {};
  const stackLines = stack.split("\n");
  const callerStackLine = stackLines[frameDepth + 1];
  const callerAndPathRegex = /at (?<caller>.+?) \((?<filePath>[^:()]+(?::[^:()]+)*):(?<lineNum>\d+):\d+\)/;
  const capMatch = callerStackLine.match(callerAndPathRegex);
  if (capMatch) {
    const { filePath, lineNum, caller } = capMatch.groups;
    return { filePath, lineNum: Number(lineNum), caller };
  }
  const pathOnlyRegex = /at (?<filePath>[^:()]+(?::[^:()]+)*):(?<lineNum>\d+):\d+/;
  const poMatch = callerStackLine.match(pathOnlyRegex);
  if (poMatch) {
    const { filePath, lineNum } = poMatch.groups;
    return { filePath, lineNum: Number(lineNum) };
  }
  return {};
}
__name(getCallerInfo, "getCallerInfo");
function emitOtelLog({
  level,
  body,
  severityNumber,
  attributes,
  stackDepth
}) {
  if (!config.isInstrumented)
    return;
  const attrs = { ...attributes };
  if (stackDepth != null) {
    const { filePath, lineNum, caller } = getCallerInfo(stackDepth + 1);
    Object.assign(attrs, {
      [import_semantic_conventions2.SEMATTRS_CODE_FILEPATH]: filePath,
      [import_semantic_conventions2.SEMATTRS_CODE_LINENO]: lineNum,
      [import_semantic_conventions2.SEMATTRS_CODE_FUNCTION]: caller
    });
  }
  const otelLogger = import_api_logs.logs.getLogger("default");
  otelLogger.emit({
    severityNumber: severityNumber || convertSeverityTextToNumber(level.toUpperCase()),
    severityText: level.toUpperCase(),
    body,
    attributes: import_lodash.default.omitBy(attrs, import_lodash.default.isNil)
  });
}
__name(emitOtelLog, "emitOtelLog");

// src/instrumentation/index.ts
var import_api19 = require("@opentelemetry/api");

// src/instrumentation/console.ts
var console_exports = {};
__export(console_exports, {
  instrumentConsole: () => instrumentConsole
});
function instrumentConsole() {
  const { log, error, warn, info, debug, timeLog, timeEnd } = console;
  [
    { name: "log", logger: log, level: "INFO" },
    { name: "error", logger: error, level: "ERROR" },
    { name: "warn", logger: warn, level: "WARN" },
    { name: "info", logger: info, level: "INFO" },
    { name: "debug", logger: debug, level: "DEBUG" },
    { name: "timeLog", logger: timeLog, level: "INFO" },
    { name: "timeEnd", logger: timeEnd, level: "INFO" }
  ].forEach(({ name, logger: logger2, level }) => {
    console[name] = function(...content) {
      logger2(...content);
      const contentWoCtx = content.filter((c) => typeof c !== "object" || !("ctx" in c || "authCtx" in c));
      const contentCtx = mergeAll_default(
        content.filter((c) => typeof c === "object" && ("ctx" in c || "authCtx" in c)).map((c) => {
          if (c.ctx)
            return c.ctx;
          if (c.authCtx)
            return c.authCtx;
          return {};
        })
      );
      if (contentWoCtx.length === 1) {
        emitOtelLog({ level, body: contentWoCtx[0], attributes: contentCtx });
      } else {
        emitOtelLog({ level, body: contentWoCtx.join(" "), attributes: contentCtx });
      }
    };
  });
}
__name(instrumentConsole, "instrumentConsole");

// src/instrumentation/traceloop.ts
var import_instrumentation_anthropic = require("@traceloop/instrumentation-anthropic");
var import_instrumentation_openai = require("@traceloop/instrumentation-openai");
var import_instrumentation_azure = require("@traceloop/instrumentation-azure");
var import_instrumentation_llamaindex = require("@traceloop/instrumentation-llamaindex");
var import_instrumentation_vertexai = require("@traceloop/instrumentation-vertexai");
var import_instrumentation_bedrock = require("@traceloop/instrumentation-bedrock");
var import_instrumentation_cohere = require("@traceloop/instrumentation-cohere");
var import_instrumentation_pinecone = require("@traceloop/instrumentation-pinecone");
var import_instrumentation_langchain = require("@traceloop/instrumentation-langchain");
var import_instrumentation_chromadb = require("@traceloop/instrumentation-chromadb");
function traceloopInstrumentations() {
  const instrumentations = [
    new import_instrumentation_anthropic.AnthropicInstrumentation(),
    new import_instrumentation_openai.OpenAIInstrumentation(),
    new import_instrumentation_azure.AzureOpenAIInstrumentation(),
    new import_instrumentation_llamaindex.LlamaIndexInstrumentation(),
    new import_instrumentation_vertexai.AIPlatformInstrumentation(),
    new import_instrumentation_vertexai.VertexAIInstrumentation(),
    new import_instrumentation_bedrock.BedrockInstrumentation(),
    new import_instrumentation_cohere.CohereInstrumentation(),
    new import_instrumentation_pinecone.PineconeInstrumentation(),
    new import_instrumentation_langchain.LangChainInstrumentation(),
    new import_instrumentation_chromadb.ChromaDBInstrumentation()
  ];
  return instrumentations;
}
__name(traceloopInstrumentations, "traceloopInstrumentations");

// src/instrumentation/pino.ts
var pino_exports = {};
__export(pino_exports, {
  args: () => args,
  config: () => config2,
  destination: () => destination,
  iudexPino: () => iudexPino,
  mixin: () => mixin,
  options: () => options,
  write: () => write
});
var import_semantic_conventions3 = require("@opentelemetry/semantic-conventions");
var import_pino = __toESM(require_pino());
var import_lodash2 = __toESM(require("lodash"));
function write(str) {
  if (config.isInstrumented) {
    try {
      const { level, msg, time, ...rest } = JSON.parse(str);
      const levelNumber = Number(level);
      const severityText = convertSeverityValuesToLevel(levelNumber || void 0, level);
      emitOtelLog({ level: severityText, severityNumber: level, body: msg, attributes: rest });
    } catch {
      emitOtelLog({ level: "INFO", body: str });
    }
  }
  import_pino.default.destination(1).write(str);
}
__name(write, "write");
var config2 = {
  mixinStackDepth: 4
};
function mixin() {
  const { filePath, lineNum, caller } = getCallerInfo(config2.mixinStackDepth);
  return import_lodash2.default.omitBy({
    [import_semantic_conventions3.SEMATTRS_CODE_FILEPATH]: filePath,
    [import_semantic_conventions3.SEMATTRS_CODE_LINENO]: lineNum,
    [import_semantic_conventions3.SEMATTRS_CODE_FUNCTION]: caller
  }, import_lodash2.default.isNil);
}
__name(mixin, "mixin");
var destination = { write };
var options = { mixin };
var args = [options, destination];
var iudexPino = {
  write,
  config: config2,
  mixin,
  destination,
  options,
  args
};

// src/instrumentation/pino-http.ts
var pino_http_exports = {};
__export(pino_http_exports, {
  PinoHttpInstrumentation: () => PinoHttpInstrumentation,
  iudexPinoHttp: () => iudexPinoHttp,
  options: () => options2
});
var import_instrumentation = require("@opentelemetry/instrumentation");

// src/instrumentation/trpc.ts
var trpc_exports = {};
__export(trpc_exports, {
  config: () => config3,
  extractTrpcReqInputs: () => extractTrpcReqInputs,
  isObject: () => isObject,
  isTrpcRequest: () => isTrpcRequest,
  iudexTrpc: () => iudexTrpc,
  trpcReqMessage: () => trpcReqMessage
});
var config3 = {
  trpcBasePath: "/trpc"
};
function isTrpcRequest(req) {
  const url2 = req.originalUrl || req.url;
  return url2 && url2.startsWith(config3.trpcBasePath);
}
__name(isTrpcRequest, "isTrpcRequest");
function extractTrpcReqInputs(req) {
  const { url: url2 } = req;
  if (!url2) {
    return {};
  }
  if (req.method === "GET") {
    const [, inputStr] = url2.split("?", 2);
    const searchParams = new URLSearchParams(inputStr);
    const queryInput = searchParams.get("input");
    const inputs2 = (queryInput ? JSON.parse(queryInput) : {}) || {};
    return isObject(inputs2) ? inputs2 : { 0: inputs2 };
  }
  const inputs = req.body;
  return isObject(inputs) ? inputs : { 0: inputs };
}
__name(extractTrpcReqInputs, "extractTrpcReqInputs");
function trpcReqMessage(req, res) {
  const { url: url2 } = req;
  if (!url2) {
    return "Iudex Error: Missing URL in TRPC request";
  }
  const [pathsStr] = url2.split("?", 2);
  const paths = pathsStr.slice(1).split(",");
  const inputs = extractTrpcReqInputs(req);
  const calls = paths.map((path, idx) => {
    return {
      path,
      input: inputs[idx]
    };
  });
  return `TRPC:
${calls.map((call) => {
    return `  ${call.path}${call.input ? ` (${jsonStrOrEmpty(call.input)})` : ""}`;
  }).join("\n")}`;
}
__name(trpcReqMessage, "trpcReqMessage");
var iudexTrpc = {
  config: config3,
  isTrpcRequest,
  extractTrpcReqInputs,
  trpcReqMessage
};
function jsonStrOrEmpty(obj) {
  return obj ? JSON.stringify(obj, null, 4) : "";
}
__name(jsonStrOrEmpty, "jsonStrOrEmpty");
function isObject(value) {
  return !!value && !Array.isArray(value) && typeof value === "object";
}
__name(isObject, "isObject");

// src/instrumentation/pino-http.ts
var options2 = {
  customSuccessMessage: (req, res) => {
    if (iudexTrpc.isTrpcRequest(req)) {
      try {
        return iudexTrpc.trpcReqMessage(req, res);
      } catch {
      }
    }
    return !req.readableAborted && res.writableEnded ? "request completed" : "request aborted";
  }
};
var iudexPinoHttp = {
  options: options2
};
var PinoHttpInstrumentation = class extends import_instrumentation.InstrumentationBase {
  static {
    __name(this, "PinoHttpInstrumentation");
  }
  constructor(config5 = {}) {
    super("pino-http", "1.0.0", config5);
  }
  init() {
    return new import_instrumentation.InstrumentationNodeModuleDefinition("pino-http", ["*"], (module2) => {
      const isESM = module2[Symbol.toStringTag] === "Module";
      const moduleExports = isESM ? module2.default : module2;
      const patchedPinoHttp = Object.assign((...args2) => {
        if (args2.length === 0) {
          return moduleExports(options2);
        }
        if (args2.length === 1) {
          const optsOrStream = args2[0];
          if (typeof optsOrStream?.write === "function") {
            return moduleExports(options2, optsOrStream);
          }
          if (typeof optsOrStream === "object") {
            return moduleExports({ ...options2, ...optsOrStream });
          }
        }
        const opts = args2[0];
        args2[0] = { ...options2, ...opts };
        return moduleExports(...args2);
      }, moduleExports);
      if (typeof patchedPinoHttp.pinoHttp === "function") {
        patchedPinoHttp.pinoHttp = patchedPinoHttp;
      }
      if (typeof patchedPinoHttp.default === "function") {
        patchedPinoHttp.default = patchedPinoHttp;
      }
      if (isESM) {
        module2.pinoHttp = patchedPinoHttp;
        module2.default = patchedPinoHttp;
      }
      return patchedPinoHttp;
    });
  }
};

// src/instrumentation/fastify.ts
var fastify_exports = {};
__export(fastify_exports, {
  config: () => config4,
  iudexFastify: () => iudexFastify,
  logger: () => logger,
  mixin: () => mixin2,
  stream: () => stream
});
var import_semantic_conventions4 = require("@opentelemetry/semantic-conventions");
var import_lodash3 = __toESM(require("lodash"));
var stream = iudexPino.destination;
var config4 = {
  mixinStackDepth: 5
};
function mixin2() {
  const { filePath, lineNum, caller } = getCallerInfo(config4.mixinStackDepth);
  return import_lodash3.default.omitBy({
    [import_semantic_conventions4.SEMATTRS_CODE_FILEPATH]: filePath,
    [import_semantic_conventions4.SEMATTRS_CODE_LINENO]: lineNum,
    [import_semantic_conventions4.SEMATTRS_CODE_FUNCTION]: caller
  }, import_lodash3.default.isNil);
}
__name(mixin2, "mixin");
var logger = {
  level: "info",
  mixin: mixin2,
  stream
};
var iudexFastify = {
  stream,
  mixin: mixin2,
  logger
};

// src/instrumentation/index.ts
if (process.env.IUDEX_DEBUG) {
  console.log("IUDEX_DEBUG on. Setting diag logger to console.");
  import_api19.diag.setLogger(new import_api19.DiagConsoleLogger(), import_api19.DiagLogLevel.DEBUG);
}
function instrument({
  baseUrl = process.env.IUDEX_EXPORTER_OTLP_ENDPOINT || process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "https://api.iudex.ai",
  iudexApiKey = process.env.IUDEX_API_KEY,
  serviceName = process.env.OTEL_SERVICE_NAME || "unknown-service",
  instanceId,
  gitCommit = process.env.GIT_COMMIT,
  githubUrl = process.env.GITHUB_URL,
  env = process.env.NODE_ENV,
  headers: configHeaders = {},
  settings = {}
} = {}) {
  if (config.isInstrumented)
    return;
  if (!iudexApiKey) {
    console.warn(
      `The IUDEX_API_KEY environment variable is missing or empty. Provide IUDEX_API_KEY to the environment on load OR instrument with the iudexApiKey option. Example: \`instrument{ iudexApiKey: 'My_API_Key' })\``
    );
    return;
  }
  const headers = {
    "x-api-key": iudexApiKey,
    ...configHeaders
  };
  if (!gitCommit) {
    try {
      const { execSync } = require("child_process");
      gitCommit = execSync("git rev-parse HEAD").toString().trim();
    } catch (e) {
    }
  }
  const resource = new import_resources.Resource(import_lodash4.default.omitBy({
    [import_semantic_conventions5.SEMRESATTRS_SERVICE_NAME]: serviceName,
    [import_semantic_conventions5.SEMRESATTRS_SERVICE_INSTANCE_ID]: instanceId,
    "git.commit": gitCommit,
    "github.url": githubUrl,
    "env": env
  }, import_lodash4.default.isNil));
  const logExporter = new OTLPLogExporter({ url: baseUrl + "/v1/logs", headers });
  const logRecordProcessor = new import_sdk_logs.BatchLogRecordProcessor(logExporter);
  const loggerProvider = new import_sdk_logs.LoggerProvider({ resource });
  loggerProvider.addLogRecordProcessor(logRecordProcessor);
  import_api_logs2.logs.setGlobalLoggerProvider(loggerProvider);
  const traceExporter = new import_exporter_trace_otlp_proto.OTLPTraceExporter({ url: baseUrl + "/v1/traces", headers });
  const spanProcessors = [new import_sdk_trace_node.BatchSpanProcessor(traceExporter)];
  const sdk = new import_sdk_node.NodeSDK({
    serviceName,
    resource,
    logRecordProcessor,
    spanProcessors,
    instrumentations: [
      // Instrument OTel auto
      (0, import_auto_instrumentations_node.getNodeAutoInstrumentations)({
        "@opentelemetry/instrumentation-fs": { enabled: false },
        "@opentelemetry/instrumentation-express": {
          spanNameHook(info) {
            console.error("EXPXXXXXXXXXXINFO", info);
            return `${info.request.method} ${info.route}`;
          }
        }
      }),
      // new PinoHttpInstrumentation(),
      // Instrument ai stuff
      traceloopInstrumentations()
    ],
    autoDetectResources: true
  });
  sdk.start();
  if (settings.instrumentConsole || settings.instrumentConsole == void 0) {
    instrumentConsole();
  }
  config.isInstrumented = true;
  return {
    updateResource(newResource) {
      const mergedResource = resource.merge(new import_resources.Resource(newResource));
      const loggerProvider2 = new import_sdk_logs.LoggerProvider({ resource: mergedResource });
      loggerProvider2.addLogRecordProcessor(logRecordProcessor);
      import_api_logs2.logs.setGlobalLoggerProvider(loggerProvider2);
      const tracerProvider = new import_sdk_trace_node.NodeTracerProvider({ resource: mergedResource });
      tracerProvider.register();
      tracerProvider.addSpanProcessor(spanProcessors[0]);
      import_api19.trace.setGlobalTracerProvider(tracerProvider);
    }
  };
}
__name(instrument, "instrument");
function trackAttribute(key, value) {
  const activeSpan = import_api19.trace.getActiveSpan();
  activeSpan?.setAttribute(key, value);
}
__name(trackAttribute, "trackAttribute");
function withTracing(fn, ctx = {}) {
  if (!config.isInstrumented) {
    return fn;
  }
  const { name, trackArgs = true, attributes } = ctx;
  const tracer = import_api19.trace.getTracer("default");
  return function(...args2) {
    return tracer.startActiveSpan(name || fn.name || "<anonymous>", (span) => {
      try {
        if (attributes) {
          span.setAttributes(attributes);
        }
        if (trackArgs) {
          if (args2.length === 1) {
            span.setAttribute("arg", args2[0]);
          } else if (args2.length > 1) {
            span.setAttribute("args", args2);
          }
        }
        const ret = fn(...args2);
        if (ret?.then) {
          return ret.then((res) => {
            span.setStatus({ code: import_api19.SpanStatusCode.OK });
            return res;
          }).catch((err) => {
            span.setStatus({
              code: import_api19.SpanStatusCode.ERROR,
              message: err?.message
            });
            span.recordException(err);
            throw err;
          }).finally(() => {
            span.end();
          });
        }
        span.setStatus({ code: import_api19.SpanStatusCode.OK });
        return ret;
      } catch (err) {
        span.setStatus({
          code: import_api19.SpanStatusCode.ERROR,
          message: err?.message
        });
        span.recordException(err);
        throw err;
      } finally {
        span.end();
      }
    });
  };
}
__name(withTracing, "withTracing");

// src/index.ts
var DEFAULT_BASE_URL = "https://api.iudex.ai";
function createClient(baseUrl, apiKey) {
  return {
    ...createFunctionClient(baseUrl, apiKey),
    ...createWorkflowClient(baseUrl, apiKey)
  };
}
__name(createClient, "createClient");
var Iudex = class {
  static {
    __name(this, "Iudex");
  }
  baseUrl;
  apiKey;
  maxTries;
  client;
  currentWorkflowId;
  functionLinker;
  constructor({
    apiKey = process.env.IUDEX_API_KEY,
    baseUrl = process.env.IUDEX_BASE_URL || DEFAULT_BASE_URL,
    maxTries = process.env.IUDEX_MAX_TRIES ? parseInt(process.env.IUDEX_MAX_TRIES) : 60
  } = {}) {
    if (!apiKey) {
      throw Error(
        `The IUDEX_API_KEY environment variable is missing or empty. Provide IUDEX_API_KEY to the environment on load OR instantiate the Iudex client with the apiKey option. Example: \`new Iudex({ apiKey: 'My API Key' })\``
      );
    }
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.maxTries = maxTries;
    this.client = createClient(this.baseUrl, this.apiKey);
    this.streamCurrentTask = this.streamCurrentTask.bind(this);
  }
  uploadFunctions = (jsons, modules) => {
    return this.client.putFunctionJsons(jsons, modules);
  };
  linkFunctions = (functionLinker) => {
    this.functionLinker = functionLinker;
  };
  /**
   * @param message message to send
   * @returns response as a chat object
   */
  sendChatTurn = async (message, opts = {}) => {
    const { onChatTurn, modules } = opts;
    const {
      promise: currentWorkflowId,
      resolve: setCurrentWorkflowId,
      reject: rejectCurrentWorkflowId
    } = deconstructedPromise();
    this.currentWorkflowId = currentWorkflowId;
    const userTurn = {
      id: "msg_ephemeral_" + (/* @__PURE__ */ new Date()).toISOString(),
      type: "text",
      sender: "you",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      text: message
    };
    onChatTurn?.(userTurn);
    const { workflowId } = await this.client.startWorkflow(userTurn.text, modules).catch((e) => {
      rejectCurrentWorkflowId(e);
      throw e;
    });
    setCurrentWorkflowId(workflowId);
    let nextMessage2 = await poll(
      this.client.nextMessage,
      [workflowId],
      { maxTries: 60, tries: 0, waitMs: 1e3 }
    );
    onChatTurn?.(nextMessage2);
    while (nextMessage2.type === "functionCall") {
      if (!this.functionLinker) {
        throw Error(
          "Establish a way to call functions using `.linkFunctions` before sending a message that might require your functions to answer."
        );
      }
      const fn = this.functionLinker(nextMessage2.functionName);
      const fnReturn = await fn(nextMessage2.functionArgs);
      const fnReturnTurn = {
        id: "msg_ephemeral_" + (/* @__PURE__ */ new Date()).toISOString(),
        type: "functionReturn",
        sender: nextMessage2.functionName,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        functionCallId: nextMessage2.functionCallId,
        functionReturn: JSON.stringify(fnReturn)
      };
      onChatTurn?.(fnReturnTurn);
      await this.client.returnFunctionCall(
        fnReturnTurn.functionCallId,
        fnReturnTurn.functionReturn
      );
      nextMessage2 = await poll(
        this.client.nextMessage,
        [workflowId],
        { maxTries: 60, tries: 0, waitMs: 1e3 }
      );
      onChatTurn?.(nextMessage2);
    }
    return nextMessage2;
  };
  /**
   * @param message message to send
   * @returns response message as a string
   */
  sendMessage = async (message, opts = {}) => {
    const chatTurn = await this.sendChatTurn(message, opts);
    return chatTurn.text;
  };
  async *streamCurrentTask() {
    if (!this.currentWorkflowId) {
      throw Error("No current workflow id. Send a message first.");
    }
    const workflowId = await this.currentWorkflowId;
    let rootTask = await this.client.fetchGetWorkflowById({ workflowId }).then((r) => r.workflow);
    let processingTask = getFirstTaskByStatus(rootTask, [
      "Pending",
      "Planning",
      "Executing",
      "Sequencing"
    ]);
    let oldProcessingTask;
    while (processingTask) {
      if (oldProcessingTask?.id !== processingTask.id || oldProcessingTask?.status !== processingTask.status) {
        yield processingTask;
        oldProcessingTask = processingTask;
      }
      await setTimeoutPromise(1e3);
      rootTask = await this.client.fetchGetWorkflowById({ workflowId }).then((r) => r.workflow);
      const maybeErroredTask = getLastTaskByStatus(rootTask, "Errored");
      if (maybeErroredTask) {
        yield maybeErroredTask;
        return;
      }
      processingTask = getFirstTaskByStatus(rootTask, [
        "Pending",
        "Planning",
        "Executing",
        "Sequencing"
      ]);
    }
    const resolvedTask = getLastTaskByStatus(rootTask, "Resolved");
    if (!resolvedTask) {
      throw Error("No processing nor resolved task found.");
    }
    yield resolvedTask;
    return;
  }
  // ======================= OpenAI interface shim ======================
  chatCompletionsCreate = (body) => {
    const lastMessage = body.messages[body.messages.length - 1];
    if (!lastMessage) {
      throw Error(`The messages array is empty.`);
    }
    const penUltMessage = body.messages[body.messages.length - 2];
    if (lastMessage?.tool_call_id && penUltMessage?.workflowId) {
      const workflowId = penUltMessage.workflowId;
      const callId = lastMessage.tool_call_id;
      const functionReturn = lastMessage.content || "";
      const functionCallRes = this.client.returnFunctionCall(callId, String(functionReturn));
      const nextMessageRes = functionCallRes.then(() => poll(
        this.client.nextMessage,
        [workflowId],
        { maxTries: 60, tries: 0, waitMs: 1e3 }
      ));
      return nextMessageRes.then((r) => {
        return {
          model: body.model,
          ...mapIudexToOpenAi(r, workflowId)
        };
      });
    }
    if (!lastMessage.content) {
      throw Error(`The message content is empty.`);
    }
    const {
      promise: currentWorkflowId,
      resolve: setCurrentWorkflowId,
      reject: rejectCurrentWorkflowId
    } = deconstructedPromise();
    this.currentWorkflowId = currentWorkflowId;
    const messageContent = extractMessageTextContent(lastMessage.content);
    return this.client.startWorkflow(messageContent).then(({ workflowId }) => {
      setCurrentWorkflowId(workflowId);
      return poll(
        this.client.nextMessage,
        [workflowId],
        { maxTries: 60, tries: 0, waitMs: 1e3 }
      ).then((r) => {
        return {
          model: body.model,
          ...mapIudexToOpenAi(r, workflowId)
        };
      });
    }).catch((e) => {
      rejectCurrentWorkflowId(e);
      throw e;
    });
  };
  chat = {
    completions: {
      create: this.chatCompletionsCreate
    }
  };
};
function mapIudexToOpenAi(m, workflowId) {
  if (m.type === "functionCall") {
    const message = {
      content: null,
      role: "assistant",
      tool_calls: [{
        id: m.functionCallId,
        function: { name: m.functionName, arguments: JSON.stringify(m.functionArgs) },
        type: "function"
      }],
      workflowId
    };
    return {
      id: m.id,
      choices: [{
        index: 0,
        finish_reason: "tool_calls",
        logprobs: null,
        message
      }],
      created: new Date(m.timestamp).valueOf(),
      object: "chat.completion"
    };
  }
  if (m.type === "text") {
    const message = {
      content: m.text,
      role: "assistant",
      workflowId
    };
    return {
      id: m.id,
      choices: [{
        index: 0,
        finish_reason: "stop",
        logprobs: null,
        message
      }],
      created: new Date(m.timestamp).valueOf(),
      object: "chat.completion"
    };
  }
  throw Error("Unsupported message type: " + m.type);
}
__name(mapIudexToOpenAi, "mapIudexToOpenAi");
function extractMessageTextContent(content) {
  if (typeof content === "string") {
    return content;
  }
  return content.map((c) => c.type === "text" ? c.text : "").join("");
}
__name(extractMessageTextContent, "extractMessageTextContent");
function getLastTaskByStatus(root2, status) {
  const arrayStatus = !Array.isArray(status) ? [status] : status;
  const traverse = reversePreOrderTraversal(
    (t) => t.subtasks || [],
    (t) => arrayStatus.includes(t.status)
  );
  return traverse(root2);
}
__name(getLastTaskByStatus, "getLastTaskByStatus");
function getFirstTaskByStatus(root2, status) {
  const arrayStatus = !Array.isArray(status) ? [status] : status;
  const traverse = preOrderTraversal(
    (t) => t.subtasks || [],
    (t) => arrayStatus.includes(t.status)
  );
  return traverse(root2);
}
__name(getFirstTaskByStatus, "getFirstTaskByStatus");
function reversePreOrderTraversal(getChildren, predicate) {
  return /* @__PURE__ */ __name(function traverse(node) {
    if (predicate(node)) {
      return node;
    }
    const reversedChildren = getChildren(node).reverse();
    for (const child of reversedChildren) {
      const maybeFound = traverse(child);
      if (maybeFound !== void 0) {
        return maybeFound;
      }
    }
    return void 0;
  }, "traverse");
}
__name(reversePreOrderTraversal, "reversePreOrderTraversal");
function preOrderTraversal(getChildren, predicate) {
  return /* @__PURE__ */ __name(function traverse(node) {
    if (predicate(node)) {
      return node;
    }
    const children = getChildren(node);
    for (const child of children) {
      const maybeFound = traverse(child);
      if (maybeFound !== void 0) {
        return maybeFound;
      }
    }
    return void 0;
  }, "traverse");
}
__name(preOrderTraversal, "preOrderTraversal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_BASE_URL,
  Feasibility,
  Iudex,
  Resolution,
  TaskStatus,
  TerminalTaskStatuses,
  WorkflowStatus,
  baseTaskSchema,
  chatErrorSchema,
  chatFunctionCallSchema,
  chatFunctionReturnSchema,
  chatImageSchema,
  chatListSchema,
  chatTextSchema,
  chatTurnSchema,
  config,
  convertSeverityTextToNumber,
  convertSeverityValuesToLevel,
  createClient,
  createFunctionClient,
  createWorkflowClient,
  emitOtelLog,
  extractMessageTextContent,
  feasibilityCheckSchema,
  fetchGetWorkflowById,
  fetchGetWorkflows,
  fetchPostWorkflows,
  getCallerInfo,
  getFirstTaskByStatus,
  getLastTaskByStatus,
  getWorkflowByIdReqSchema,
  getWorkflowByIdResSchema,
  getWorkflowsResSchema,
  instrument,
  iudexConsole,
  iudexFastify,
  iudexPino,
  iudexPinoHttp,
  iudexTrpc,
  mapIudexToOpenAi,
  nextMessage,
  postWorkflowsReqSchema,
  postWorkflowsResSchema,
  preOrderTraversal,
  putFunctionJsons,
  resolutionCheckSchema,
  returnFunctionCall,
  reversePreOrderTraversal,
  startWorkflow,
  taskErroredSchema,
  taskExecutingSchema,
  taskPendingSchema,
  taskPlanningSchema,
  taskResolvedSchema,
  taskSchema,
  taskSequencedSchema,
  taskSequencingSchema,
  trackAttribute,
  withTracing,
  workflowInfoSchema,
  workflowMetadataSchema,
  workflowSchema,
  ...require("function-json-schema")
});
//# sourceMappingURL=index.js.map