"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
    ENVIRONMENT_LISTS_KEYS = [
      "OTEL_NO_PATCH_MODULES",
      "OTEL_PROPAGATORS"
    ];
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
    logLevelMap = {
      ALL: import_api6.DiagLogLevel.ALL,
      VERBOSE: import_api6.DiagLogLevel.VERBOSE,
      DEBUG: import_api6.DiagLogLevel.DEBUG,
      INFO: import_api6.DiagLogLevel.INFO,
      WARN: import_api6.DiagLogLevel.WARN,
      ERROR: import_api6.DiagLogLevel.ERROR,
      NONE: import_api6.DiagLogLevel.NONE
    };
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
      function CompositePropagator2(config3) {
        if (config3 === void 0) {
          config3 = {};
        }
        var _a2;
        this._propagators = (_a2 = config3.propagators) !== null && _a2 !== void 0 ? _a2 : [];
        this._fields = Array.from(new Set(this._propagators.map(function(p) {
          return typeof p.fields === "function" ? p.fields() : [];
        }).reduce(function(x, y) {
          return x.concat(y);
        }, [])));
      }
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
    W3CTraceContextPropagator = /** @class */
    function() {
      function W3CTraceContextPropagator2() {
      }
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
      function ParentBasedSampler2(config3) {
        var _a2, _b, _c, _d;
        this._root = config3.root;
        if (!this._root) {
          globalErrorHandler(new Error("ParentBasedSampler must have a root sampler configured"));
          this._root = new AlwaysOnSampler();
        }
        this._remoteParentSampled = (_a2 = config3.remoteParentSampled) !== null && _a2 !== void 0 ? _a2 : new AlwaysOnSampler();
        this._remoteParentNotSampled = (_b = config3.remoteParentNotSampled) !== null && _b !== void 0 ? _b : new AlwaysOffSampler();
        this._localParentSampled = (_c = config3.localParentSampled) !== null && _c !== void 0 ? _c : new AlwaysOnSampler();
        this._localParentNotSampled = (_d = config3.localParentNotSampled) !== null && _d !== void 0 ? _d : new AlwaysOffSampler();
      }
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
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
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
      function OTLPExporterBase2(config3) {
        if (config3 === void 0) {
          config3 = {};
        }
        this._sendingPromises = [];
        this.url = this.getDefaultUrl(config3);
        if (typeof config3.hostname === "string") {
          this.hostname = config3.hostname;
        }
        this.shutdown = this.shutdown.bind(this);
        this._shutdownOnce = new BindOnceFuture(this._shutdown, this);
        this._concurrencyLimit = typeof config3.concurrencyLimit === "number" ? config3.concurrencyLimit : 30;
        this.timeoutMillis = configureExporterTimeout(config3.timeoutMillis);
        this.onInit(config3);
      }
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
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
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
  var options2 = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.pathname,
    method: "POST",
    headers: __assign({ "Content-Type": contentType }, collector.headers),
    agent: collector.agent
  };
  var request3 = parsedUrl.protocol === "http:" ? http.request : https.request;
  var sendWithRetry = function(retries, minDelay) {
    if (retries === void 0) {
      retries = DEFAULT_EXPORT_MAX_ATTEMPTS;
    }
    if (minDelay === void 0) {
      minDelay = DEFAULT_EXPORT_INITIAL_BACKOFF;
    }
    req = request3(options2, function(res) {
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
  };
  sendWithRetry();
}
function readableFromBuffer(buff) {
  var readable = new import_stream.Readable();
  readable.push(buff);
  readable.push(null);
  return readable;
}
function createHttpAgent(config3) {
  if (config3.httpAgentOptions && config3.keepAlive === false) {
    import_api16.diag.warn("httpAgentOptions is used only when keepAlive is true");
    return void 0;
  }
  if (config3.keepAlive === false || !config3.url)
    return void 0;
  try {
    var parsedUrl = new url.URL(config3.url);
    var Agent3 = parsedUrl.protocol === "http:" ? http.Agent : https.Agent;
    return new Agent3(__assign({ keepAlive: true }, config3.httpAgentOptions));
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
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    OTLPExporterNodeBase = /** @class */
    function(_super) {
      __extends3(OTLPExporterNodeBase2, _super);
      function OTLPExporterNodeBase2(config3) {
        if (config3 === void 0) {
          config3 = {};
        }
        var _this = _super.call(this, config3) || this;
        _this.DEFAULT_HEADERS = {};
        if (config3.metadata) {
          import_api17.diag.warn("Metadata cannot be set when using http");
        }
        _this.headers = Object.assign(_this.DEFAULT_HEADERS, parseHeaders(config3.headers), utils_exports.parseKeyPairsIntoRecord(getEnv().OTEL_EXPORTER_OTLP_HEADERS));
        _this.agent = createHttpAgent(config3);
        _this.compression = configureCompression(config3.compression);
        return _this;
      }
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
        var popPromise = function() {
          var index = _this._sendingPromises.indexOf(promise);
          _this._sendingPromises.splice(index, 1);
        };
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
      return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err) {
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
        };
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      });
    }
  }
});

// ../../node_modules/.pnpm/@protobufjs+base64@1.1.2/node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "../../node_modules/.pnpm/@protobufjs+base64@1.1.2/node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    var base64 = exports2;
    base64.length = function length(string) {
      var p = string.length;
      if (!p)
        return 0;
      var n = 0;
      while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
      return Math.ceil(string.length * 3) / 4 - n;
    };
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    base64.encode = function encode(buffer, start, end) {
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
    };
    var invalidEncoding = "invalid encoding";
    base64.decode = function decode(string, buffer, offset) {
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
    };
    base64.test = function test(string) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
    };
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
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    };
    EventEmitter.prototype.off = function off(evt, fn) {
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
    };
    EventEmitter.prototype.emit = function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args2 = [], i = 1;
        for (; i < arguments.length; )
          args2.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args2);
      }
      return this;
    };
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
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
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
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
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
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports3;
    }
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = val >>> 16 & 255;
      buf[pos + 2] = val >>> 8 & 255;
      buf[pos + 3] = val & 255;
    }
    function readUintLE(buf, pos) {
      return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
    }
    function readUintBE(buf, pos) {
      return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
    }
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
  }
});

// ../../node_modules/.pnpm/@protobufjs+utf8@1.1.0/node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "../../node_modules/.pnpm/@protobufjs+utf8@1.1.0/node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    var utf8 = exports2;
    utf8.length = function utf8_length(string) {
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
    };
    utf8.read = function utf8_read(buffer, start, end) {
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
    };
    utf8.write = function utf8_write(string, buffer, offset) {
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
    };
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
      return function pool_alloc(size2) {
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
      };
    }
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
    LongBits.fromNumber = function fromNumber(value) {
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
    };
    LongBits.from = function from(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util.isString(value)) {
        if (util.Long)
          value = util.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    LongBits.prototype.toNumber = function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits(
        (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
        (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
      );
    };
    LongBits.prototype.toHash = function toHash() {
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
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    };
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
    function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util.isObject = function isObject(value) {
      return value && typeof value === "object";
    };
    util.isset = /**
     * Checks if a property on a message is considered to be present.
     * @param {Object} obj Plain object or message instance
     * @param {string} prop Property name
     * @returns {boolean} `true` if considered to be present, otherwise `false`
     */
    util.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
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
    util.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util.Long = /* istanbul ignore next */
    util.global.dcodeIO && /* istanbul ignore next */
    util.global.dcodeIO.Long || /* istanbul ignore next */
    util.global.Long || util.inquire("long");
    util.key2Re = /^true|false|0|1$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util.longToHash = function longToHash(value) {
      return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    };
    util.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src, ifNotSet) {
      for (var keys4 = Object.keys(src), i = 0; i < keys4.length; ++i)
        if (dst[keys4[i]] === void 0 || !ifNotSet)
          dst[keys4[i]] = src[keys4[i]];
      return dst;
    }
    util.merge = merge;
    util.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
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
      CustomError.prototype = Object.create(Error.prototype, {
        constructor: {
          value: CustomError,
          writable: true,
          enumerable: false,
          configurable: true
        },
        name: {
          get: function get() {
            return name;
          },
          set: void 0,
          enumerable: false,
          // configurable: false would accurately preserve the behavior of
          // the original, but I'm guessing that was not intentional.
          // For an actual error subclass, this property would
          // be configurable.
          configurable: true
        },
        toString: {
          value: function value() {
            return this.name + ": " + this.message;
          },
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      return CustomError;
    }
    util.newError = newError;
    util.ProtocolError = newError("ProtocolError");
    util.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys4 = Object.keys(this), i2 = keys4.length - 1; i2 > -1; --i2)
          if (fieldMap[keys4[i2]] === 1 && this[keys4[i2]] !== void 0 && this[keys4[i2]] !== null)
            return keys4[i2];
      };
    };
    util.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
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
      function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
      function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
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
    function noop() {
    }
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    function Writer() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer();
      };
    };
    Writer.create = create();
    Writer.alloc = function alloc(size) {
      return new util.Array(size);
    };
    if (util.Array !== Array)
      Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
    Writer.prototype._push = function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    };
    function writeByte(val, buf, pos) {
      buf[pos] = val & 255;
    }
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf[pos] = val;
    }
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
        value
      )).len;
      return this;
    };
    Writer.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer.prototype.sint32 = function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    };
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
    Writer.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = function write_float(value) {
      return this._push(util.float.writeFloatLE, 4, value);
    };
    Writer.prototype.double = function write_double(value) {
      return this._push(util.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer.prototype.reset = function reset() {
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
    };
    Writer.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
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
    BufferWriter._configure = function() {
      BufferWriter.alloc = util._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy)
          val.copy(buf, pos, 0, val.length);
        else
          for (var i = 0; i < val.length; )
            buf[pos++] = val[i++];
      };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util.isString(value))
        value = util._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
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
    function Reader(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    } : function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    };
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer2) {
          return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        })(buffer);
      } : create_array;
    };
    Reader.create = create();
    Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */
    util.Array.prototype.slice;
    Reader.prototype.uint32 = /* @__PURE__ */ function read_uint32_setup() {
      var value = 4294967295;
      return function read_uint32() {
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
      };
    }();
    Reader.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    };
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
    Reader.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader.prototype.bytes = function read_bytes() {
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
    };
    Reader.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader.prototype.skip = function skip(length) {
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
    };
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
        int64: function read_int64() {
          return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        }
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
    BufferReader._configure = function() {
      if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
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
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request3, callback) {
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
          function rpcCallback(err, response) {
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
          }
        );
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function() {
          callback(err);
        }, 0);
        return void 0;
      }
    };
    Service.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    };
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
              AnyValue.create = function create(properties) {
                return new AnyValue(properties);
              };
              AnyValue.encode = function encode(message, writer) {
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
              };
              AnyValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              AnyValue.decode = function decode(reader, length) {
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
              };
              AnyValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              AnyValue.verify = function verify(message) {
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
              };
              AnyValue.fromObject = function fromObject(object) {
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
              };
              AnyValue.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                  object.stringValue = message.stringValue;
                  if (options2.oneofs)
                    object.value = "stringValue";
                }
                if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                  object.boolValue = message.boolValue;
                  if (options2.oneofs)
                    object.value = "boolValue";
                }
                if (message.intValue != null && message.hasOwnProperty("intValue")) {
                  if (typeof message.intValue === "number")
                    object.intValue = options2.longs === String ? String(message.intValue) : message.intValue;
                  else
                    object.intValue = options2.longs === String ? $util.Long.prototype.toString.call(message.intValue) : options2.longs === Number ? new $util.LongBits(message.intValue.low >>> 0, message.intValue.high >>> 0).toNumber() : message.intValue;
                  if (options2.oneofs)
                    object.value = "intValue";
                }
                if (message.doubleValue != null && message.hasOwnProperty("doubleValue")) {
                  object.doubleValue = options2.json && !isFinite(message.doubleValue) ? String(message.doubleValue) : message.doubleValue;
                  if (options2.oneofs)
                    object.value = "doubleValue";
                }
                if (message.arrayValue != null && message.hasOwnProperty("arrayValue")) {
                  object.arrayValue = $root.opentelemetry.proto.common.v1.ArrayValue.toObject(message.arrayValue, options2);
                  if (options2.oneofs)
                    object.value = "arrayValue";
                }
                if (message.kvlistValue != null && message.hasOwnProperty("kvlistValue")) {
                  object.kvlistValue = $root.opentelemetry.proto.common.v1.KeyValueList.toObject(message.kvlistValue, options2);
                  if (options2.oneofs)
                    object.value = "kvlistValue";
                }
                if (message.bytesValue != null && message.hasOwnProperty("bytesValue")) {
                  object.bytesValue = options2.bytes === String ? $util.base64.encode(message.bytesValue, 0, message.bytesValue.length) : options2.bytes === Array ? Array.prototype.slice.call(message.bytesValue) : message.bytesValue;
                  if (options2.oneofs)
                    object.value = "bytesValue";
                }
                return object;
              };
              AnyValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              AnyValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.AnyValue";
              };
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
              ArrayValue.prototype.values = $util.emptyArray;
              ArrayValue.create = function create(properties) {
                return new ArrayValue(properties);
              };
              ArrayValue.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.values != null && message.values.length)
                  for (var i = 0; i < message.values.length; ++i)
                    $root.opentelemetry.proto.common.v1.AnyValue.encode(message.values[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              };
              ArrayValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ArrayValue.decode = function decode(reader, length) {
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
              };
              ArrayValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ArrayValue.verify = function verify(message) {
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
              };
              ArrayValue.fromObject = function fromObject(object) {
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
              };
              ArrayValue.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.values = [];
                if (message.values && message.values.length) {
                  object.values = [];
                  for (var j = 0; j < message.values.length; ++j)
                    object.values[j] = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.values[j], options2);
                }
                return object;
              };
              ArrayValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ArrayValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.ArrayValue";
              };
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
              KeyValueList.prototype.values = $util.emptyArray;
              KeyValueList.create = function create(properties) {
                return new KeyValueList(properties);
              };
              KeyValueList.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.values != null && message.values.length)
                  for (var i = 0; i < message.values.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.values[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              };
              KeyValueList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              KeyValueList.decode = function decode(reader, length) {
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
              };
              KeyValueList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              KeyValueList.verify = function verify(message) {
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
              };
              KeyValueList.fromObject = function fromObject(object) {
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
              };
              KeyValueList.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.values = [];
                if (message.values && message.values.length) {
                  object.values = [];
                  for (var j = 0; j < message.values.length; ++j)
                    object.values[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.values[j], options2);
                }
                return object;
              };
              KeyValueList.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              KeyValueList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.KeyValueList";
              };
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
              KeyValue.prototype.key = null;
              KeyValue.prototype.value = null;
              KeyValue.create = function create(properties) {
                return new KeyValue(properties);
              };
              KeyValue.encode = function encode(message, writer) {
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
              };
              KeyValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              KeyValue.decode = function decode(reader, length) {
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
              };
              KeyValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              KeyValue.verify = function verify(message) {
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
              };
              KeyValue.fromObject = function fromObject(object) {
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
              };
              KeyValue.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.defaults) {
                  object.key = "";
                  object.value = null;
                }
                if (message.key != null && message.hasOwnProperty("key"))
                  object.key = message.key;
                if (message.value != null && message.hasOwnProperty("value"))
                  object.value = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.value, options2);
                return object;
              };
              KeyValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              KeyValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.KeyValue";
              };
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
              InstrumentationScope.prototype.name = null;
              InstrumentationScope.prototype.version = null;
              InstrumentationScope.prototype.attributes = $util.emptyArray;
              InstrumentationScope.prototype.droppedAttributesCount = null;
              InstrumentationScope.create = function create(properties) {
                return new InstrumentationScope(properties);
              };
              InstrumentationScope.encode = function encode(message, writer) {
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
              };
              InstrumentationScope.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              InstrumentationScope.decode = function decode(reader, length) {
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
              };
              InstrumentationScope.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              InstrumentationScope.verify = function verify(message) {
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
              };
              InstrumentationScope.fromObject = function fromObject(object) {
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
              };
              InstrumentationScope.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.attributes = [];
                if (options2.defaults) {
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
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                  object.droppedAttributesCount = message.droppedAttributesCount;
                return object;
              };
              InstrumentationScope.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              InstrumentationScope.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.InstrumentationScope";
              };
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
              Resource2.prototype.attributes = $util.emptyArray;
              Resource2.prototype.droppedAttributesCount = null;
              Resource2.create = function create(properties) {
                return new Resource2(properties);
              };
              Resource2.encode = function encode(message, writer) {
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
              };
              Resource2.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Resource2.decode = function decode(reader, length) {
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
              };
              Resource2.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Resource2.verify = function verify(message) {
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
              };
              Resource2.fromObject = function fromObject(object) {
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
              };
              Resource2.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.attributes = [];
                if (options2.defaults)
                  object.droppedAttributesCount = 0;
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                  object.droppedAttributesCount = message.droppedAttributesCount;
                return object;
              };
              Resource2.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Resource2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.resource.v1.Resource";
              };
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
              TracesData.prototype.resourceSpans = $util.emptyArray;
              TracesData.create = function create(properties) {
                return new TracesData(properties);
              };
              TracesData.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resourceSpans != null && message.resourceSpans.length)
                  for (var i = 0; i < message.resourceSpans.length; ++i)
                    $root.opentelemetry.proto.trace.v1.ResourceSpans.encode(message.resourceSpans[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              };
              TracesData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              TracesData.decode = function decode(reader, length) {
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
              };
              TracesData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              TracesData.verify = function verify(message) {
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
              };
              TracesData.fromObject = function fromObject(object) {
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
              };
              TracesData.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.resourceSpans = [];
                if (message.resourceSpans && message.resourceSpans.length) {
                  object.resourceSpans = [];
                  for (var j = 0; j < message.resourceSpans.length; ++j)
                    object.resourceSpans[j] = $root.opentelemetry.proto.trace.v1.ResourceSpans.toObject(message.resourceSpans[j], options2);
                }
                return object;
              };
              TracesData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              TracesData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.TracesData";
              };
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
              ResourceSpans.prototype.resource = null;
              ResourceSpans.prototype.scopeSpans = $util.emptyArray;
              ResourceSpans.prototype.schemaUrl = null;
              ResourceSpans.create = function create(properties) {
                return new ResourceSpans(properties);
              };
              ResourceSpans.encode = function encode(message, writer) {
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
              };
              ResourceSpans.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ResourceSpans.decode = function decode(reader, length) {
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
              };
              ResourceSpans.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ResourceSpans.verify = function verify(message) {
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
              };
              ResourceSpans.fromObject = function fromObject(object) {
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
              };
              ResourceSpans.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.scopeSpans = [];
                if (options2.defaults) {
                  object.resource = null;
                  object.schemaUrl = "";
                }
                if (message.resource != null && message.hasOwnProperty("resource"))
                  object.resource = $root.opentelemetry.proto.resource.v1.Resource.toObject(message.resource, options2);
                if (message.scopeSpans && message.scopeSpans.length) {
                  object.scopeSpans = [];
                  for (var j = 0; j < message.scopeSpans.length; ++j)
                    object.scopeSpans[j] = $root.opentelemetry.proto.trace.v1.ScopeSpans.toObject(message.scopeSpans[j], options2);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              };
              ResourceSpans.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ResourceSpans.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.ResourceSpans";
              };
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
              ScopeSpans.prototype.scope = null;
              ScopeSpans.prototype.spans = $util.emptyArray;
              ScopeSpans.prototype.schemaUrl = null;
              ScopeSpans.create = function create(properties) {
                return new ScopeSpans(properties);
              };
              ScopeSpans.encode = function encode(message, writer) {
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
              };
              ScopeSpans.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ScopeSpans.decode = function decode(reader, length) {
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
              };
              ScopeSpans.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ScopeSpans.verify = function verify(message) {
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
              };
              ScopeSpans.fromObject = function fromObject(object) {
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
              };
              ScopeSpans.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.spans = [];
                if (options2.defaults) {
                  object.scope = null;
                  object.schemaUrl = "";
                }
                if (message.scope != null && message.hasOwnProperty("scope"))
                  object.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.toObject(message.scope, options2);
                if (message.spans && message.spans.length) {
                  object.spans = [];
                  for (var j = 0; j < message.spans.length; ++j)
                    object.spans[j] = $root.opentelemetry.proto.trace.v1.Span.toObject(message.spans[j], options2);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              };
              ScopeSpans.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ScopeSpans.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.ScopeSpans";
              };
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
              Span2.create = function create(properties) {
                return new Span2(properties);
              };
              Span2.encode = function encode(message, writer) {
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
              };
              Span2.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Span2.decode = function decode(reader, length) {
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
              };
              Span2.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Span2.verify = function verify(message) {
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
              };
              Span2.fromObject = function fromObject(object) {
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
              };
              Span2.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults) {
                  object.attributes = [];
                  object.events = [];
                  object.links = [];
                }
                if (options2.defaults) {
                  if (options2.bytes === String)
                    object.traceId = "";
                  else {
                    object.traceId = [];
                    if (options2.bytes !== Array)
                      object.traceId = $util.newBuffer(object.traceId);
                  }
                  if (options2.bytes === String)
                    object.spanId = "";
                  else {
                    object.spanId = [];
                    if (options2.bytes !== Array)
                      object.spanId = $util.newBuffer(object.spanId);
                  }
                  object.traceState = "";
                  if (options2.bytes === String)
                    object.parentSpanId = "";
                  else {
                    object.parentSpanId = [];
                    if (options2.bytes !== Array)
                      object.parentSpanId = $util.newBuffer(object.parentSpanId);
                  }
                  object.name = "";
                  object.kind = options2.enums === String ? "SPAN_KIND_UNSPECIFIED" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.endTimeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.endTimeUnixNano = options2.longs === String ? "0" : 0;
                  object.droppedAttributesCount = 0;
                  object.droppedEventsCount = 0;
                  object.droppedLinksCount = 0;
                  object.status = null;
                }
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                  object.traceId = options2.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                if (message.spanId != null && message.hasOwnProperty("spanId"))
                  object.spanId = options2.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                if (message.traceState != null && message.hasOwnProperty("traceState"))
                  object.traceState = message.traceState;
                if (message.parentSpanId != null && message.hasOwnProperty("parentSpanId"))
                  object.parentSpanId = options2.bytes === String ? $util.base64.encode(message.parentSpanId, 0, message.parentSpanId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.parentSpanId) : message.parentSpanId;
                if (message.name != null && message.hasOwnProperty("name"))
                  object.name = message.name;
                if (message.kind != null && message.hasOwnProperty("kind"))
                  object.kind = options2.enums === String ? $root.opentelemetry.proto.trace.v1.Span.SpanKind[message.kind] === void 0 ? message.kind : $root.opentelemetry.proto.trace.v1.Span.SpanKind[message.kind] : message.kind;
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options2.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options2.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.endTimeUnixNano != null && message.hasOwnProperty("endTimeUnixNano"))
                  if (typeof message.endTimeUnixNano === "number")
                    object.endTimeUnixNano = options2.longs === String ? String(message.endTimeUnixNano) : message.endTimeUnixNano;
                  else
                    object.endTimeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.endTimeUnixNano) : options2.longs === Number ? new $util.LongBits(message.endTimeUnixNano.low >>> 0, message.endTimeUnixNano.high >>> 0).toNumber() : message.endTimeUnixNano;
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                  object.droppedAttributesCount = message.droppedAttributesCount;
                if (message.events && message.events.length) {
                  object.events = [];
                  for (var j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.opentelemetry.proto.trace.v1.Span.Event.toObject(message.events[j], options2);
                }
                if (message.droppedEventsCount != null && message.hasOwnProperty("droppedEventsCount"))
                  object.droppedEventsCount = message.droppedEventsCount;
                if (message.links && message.links.length) {
                  object.links = [];
                  for (var j = 0; j < message.links.length; ++j)
                    object.links[j] = $root.opentelemetry.proto.trace.v1.Span.Link.toObject(message.links[j], options2);
                }
                if (message.droppedLinksCount != null && message.hasOwnProperty("droppedLinksCount"))
                  object.droppedLinksCount = message.droppedLinksCount;
                if (message.status != null && message.hasOwnProperty("status"))
                  object.status = $root.opentelemetry.proto.trace.v1.Status.toObject(message.status, options2);
                return object;
              };
              Span2.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Span2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Span";
              };
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
                Event.prototype.timeUnixNano = null;
                Event.prototype.name = null;
                Event.prototype.attributes = $util.emptyArray;
                Event.prototype.droppedAttributesCount = null;
                Event.create = function create(properties) {
                  return new Event(properties);
                };
                Event.encode = function encode(message, writer) {
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
                };
                Event.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Event.decode = function decode(reader, length) {
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
                };
                Event.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Event.verify = function verify(message) {
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
                };
                Event.fromObject = function fromObject(object) {
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
                };
                Event.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.arrays || options2.defaults)
                    object.attributes = [];
                  if (options2.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.timeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                    } else
                      object.timeUnixNano = options2.longs === String ? "0" : 0;
                    object.name = "";
                    object.droppedAttributesCount = 0;
                  }
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                    if (typeof message.timeUnixNano === "number")
                      object.timeUnixNano = options2.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                    else
                      object.timeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options2.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                  if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                  if (message.attributes && message.attributes.length) {
                    object.attributes = [];
                    for (var j = 0; j < message.attributes.length; ++j)
                      object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                    object.droppedAttributesCount = message.droppedAttributesCount;
                  return object;
                };
                Event.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Event.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Span.Event";
                };
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
                Link.prototype.traceId = null;
                Link.prototype.spanId = null;
                Link.prototype.traceState = null;
                Link.prototype.attributes = $util.emptyArray;
                Link.prototype.droppedAttributesCount = null;
                Link.create = function create(properties) {
                  return new Link(properties);
                };
                Link.encode = function encode(message, writer) {
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
                };
                Link.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Link.decode = function decode(reader, length) {
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
                };
                Link.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Link.verify = function verify(message) {
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
                };
                Link.fromObject = function fromObject(object) {
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
                };
                Link.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.arrays || options2.defaults)
                    object.attributes = [];
                  if (options2.defaults) {
                    if (options2.bytes === String)
                      object.traceId = "";
                    else {
                      object.traceId = [];
                      if (options2.bytes !== Array)
                        object.traceId = $util.newBuffer(object.traceId);
                    }
                    if (options2.bytes === String)
                      object.spanId = "";
                    else {
                      object.spanId = [];
                      if (options2.bytes !== Array)
                        object.spanId = $util.newBuffer(object.spanId);
                    }
                    object.traceState = "";
                    object.droppedAttributesCount = 0;
                  }
                  if (message.traceId != null && message.hasOwnProperty("traceId"))
                    object.traceId = options2.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                  if (message.spanId != null && message.hasOwnProperty("spanId"))
                    object.spanId = options2.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                  if (message.traceState != null && message.hasOwnProperty("traceState"))
                    object.traceState = message.traceState;
                  if (message.attributes && message.attributes.length) {
                    object.attributes = [];
                    for (var j = 0; j < message.attributes.length; ++j)
                      object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                    object.droppedAttributesCount = message.droppedAttributesCount;
                  return object;
                };
                Link.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Link.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Span.Link";
                };
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
              Status.prototype.message = null;
              Status.prototype.code = null;
              Status.create = function create(properties) {
                return new Status(properties);
              };
              Status.encode = function encode(message, writer) {
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
              };
              Status.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Status.decode = function decode(reader, length) {
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
              };
              Status.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Status.verify = function verify(message) {
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
              };
              Status.fromObject = function fromObject(object) {
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
              };
              Status.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.defaults) {
                  object.message = "";
                  object.code = options2.enums === String ? "STATUS_CODE_UNSET" : 0;
                }
                if (message.message != null && message.hasOwnProperty("message"))
                  object.message = message.message;
                if (message.code != null && message.hasOwnProperty("code"))
                  object.code = options2.enums === String ? $root.opentelemetry.proto.trace.v1.Status.StatusCode[message.code] === void 0 ? message.code : $root.opentelemetry.proto.trace.v1.Status.StatusCode[message.code] : message.code;
                return object;
              };
              Status.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Status.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Status";
              };
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
                (TraceService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = TraceService;
                TraceService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                  return new this(rpcImpl, requestDelimited, responseDelimited);
                };
                Object.defineProperty(TraceService.prototype["export"] = function export_(request3, callback) {
                  return this.rpcCall(export_, $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest, $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse, request3, callback);
                }, "name", { value: "Export" });
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
                ExportTraceServiceRequest.prototype.resourceSpans = $util.emptyArray;
                ExportTraceServiceRequest.create = function create(properties) {
                  return new ExportTraceServiceRequest(properties);
                };
                ExportTraceServiceRequest.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resourceSpans != null && message.resourceSpans.length)
                    for (var i = 0; i < message.resourceSpans.length; ++i)
                      $root.opentelemetry.proto.trace.v1.ResourceSpans.encode(message.resourceSpans[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                };
                ExportTraceServiceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportTraceServiceRequest.decode = function decode(reader, length) {
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
                };
                ExportTraceServiceRequest.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportTraceServiceRequest.verify = function verify(message) {
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
                };
                ExportTraceServiceRequest.fromObject = function fromObject(object) {
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
                };
                ExportTraceServiceRequest.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.arrays || options2.defaults)
                    object.resourceSpans = [];
                  if (message.resourceSpans && message.resourceSpans.length) {
                    object.resourceSpans = [];
                    for (var j = 0; j < message.resourceSpans.length; ++j)
                      object.resourceSpans[j] = $root.opentelemetry.proto.trace.v1.ResourceSpans.toObject(message.resourceSpans[j], options2);
                  }
                  return object;
                };
                ExportTraceServiceRequest.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportTraceServiceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest";
                };
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
                ExportTraceServiceResponse.prototype.partialSuccess = null;
                ExportTraceServiceResponse.create = function create(properties) {
                  return new ExportTraceServiceResponse(properties);
                };
                ExportTraceServiceResponse.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.partialSuccess != null && Object.hasOwnProperty.call(message, "partialSuccess"))
                    $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.encode(message.partialSuccess, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  return writer;
                };
                ExportTraceServiceResponse.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportTraceServiceResponse.decode = function decode(reader, length) {
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
                };
                ExportTraceServiceResponse.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportTraceServiceResponse.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess")) {
                    var error = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.verify(message.partialSuccess);
                    if (error)
                      return "partialSuccess." + error;
                  }
                  return null;
                };
                ExportTraceServiceResponse.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse();
                  if (object.partialSuccess != null) {
                    if (typeof object.partialSuccess !== "object")
                      throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse.partialSuccess: object expected");
                    message.partialSuccess = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.fromObject(object.partialSuccess);
                  }
                  return message;
                };
                ExportTraceServiceResponse.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.defaults)
                    object.partialSuccess = null;
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess"))
                    object.partialSuccess = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.toObject(message.partialSuccess, options2);
                  return object;
                };
                ExportTraceServiceResponse.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportTraceServiceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse";
                };
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
                ExportTracePartialSuccess.prototype.rejectedSpans = null;
                ExportTracePartialSuccess.prototype.errorMessage = null;
                ExportTracePartialSuccess.create = function create(properties) {
                  return new ExportTracePartialSuccess(properties);
                };
                ExportTracePartialSuccess.encode = function encode(message, writer) {
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
                };
                ExportTracePartialSuccess.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportTracePartialSuccess.decode = function decode(reader, length) {
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
                };
                ExportTracePartialSuccess.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportTracePartialSuccess.verify = function verify(message) {
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
                };
                ExportTracePartialSuccess.fromObject = function fromObject(object) {
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
                };
                ExportTracePartialSuccess.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.rejectedSpans = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                    } else
                      object.rejectedSpans = options2.longs === String ? "0" : 0;
                    object.errorMessage = "";
                  }
                  if (message.rejectedSpans != null && message.hasOwnProperty("rejectedSpans"))
                    if (typeof message.rejectedSpans === "number")
                      object.rejectedSpans = options2.longs === String ? String(message.rejectedSpans) : message.rejectedSpans;
                    else
                      object.rejectedSpans = options2.longs === String ? $util.Long.prototype.toString.call(message.rejectedSpans) : options2.longs === Number ? new $util.LongBits(message.rejectedSpans.low >>> 0, message.rejectedSpans.high >>> 0).toNumber() : message.rejectedSpans;
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                  return object;
                };
                ExportTracePartialSuccess.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportTracePartialSuccess.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess";
                };
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
                (MetricsService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = MetricsService;
                MetricsService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                  return new this(rpcImpl, requestDelimited, responseDelimited);
                };
                Object.defineProperty(MetricsService.prototype["export"] = function export_(request3, callback) {
                  return this.rpcCall(export_, $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest, $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse, request3, callback);
                }, "name", { value: "Export" });
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
                ExportMetricsServiceRequest.prototype.resourceMetrics = $util.emptyArray;
                ExportMetricsServiceRequest.create = function create(properties) {
                  return new ExportMetricsServiceRequest(properties);
                };
                ExportMetricsServiceRequest.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resourceMetrics != null && message.resourceMetrics.length)
                    for (var i = 0; i < message.resourceMetrics.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.ResourceMetrics.encode(message.resourceMetrics[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                };
                ExportMetricsServiceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportMetricsServiceRequest.decode = function decode(reader, length) {
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
                };
                ExportMetricsServiceRequest.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportMetricsServiceRequest.verify = function verify(message) {
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
                };
                ExportMetricsServiceRequest.fromObject = function fromObject(object) {
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
                };
                ExportMetricsServiceRequest.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.arrays || options2.defaults)
                    object.resourceMetrics = [];
                  if (message.resourceMetrics && message.resourceMetrics.length) {
                    object.resourceMetrics = [];
                    for (var j = 0; j < message.resourceMetrics.length; ++j)
                      object.resourceMetrics[j] = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.toObject(message.resourceMetrics[j], options2);
                  }
                  return object;
                };
                ExportMetricsServiceRequest.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportMetricsServiceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest";
                };
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
                ExportMetricsServiceResponse.prototype.partialSuccess = null;
                ExportMetricsServiceResponse.create = function create(properties) {
                  return new ExportMetricsServiceResponse(properties);
                };
                ExportMetricsServiceResponse.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.partialSuccess != null && Object.hasOwnProperty.call(message, "partialSuccess"))
                    $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.encode(message.partialSuccess, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  return writer;
                };
                ExportMetricsServiceResponse.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportMetricsServiceResponse.decode = function decode(reader, length) {
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
                };
                ExportMetricsServiceResponse.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportMetricsServiceResponse.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess")) {
                    var error = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.verify(message.partialSuccess);
                    if (error)
                      return "partialSuccess." + error;
                  }
                  return null;
                };
                ExportMetricsServiceResponse.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse();
                  if (object.partialSuccess != null) {
                    if (typeof object.partialSuccess !== "object")
                      throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse.partialSuccess: object expected");
                    message.partialSuccess = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.fromObject(object.partialSuccess);
                  }
                  return message;
                };
                ExportMetricsServiceResponse.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.defaults)
                    object.partialSuccess = null;
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess"))
                    object.partialSuccess = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.toObject(message.partialSuccess, options2);
                  return object;
                };
                ExportMetricsServiceResponse.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportMetricsServiceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse";
                };
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
                ExportMetricsPartialSuccess.prototype.rejectedDataPoints = null;
                ExportMetricsPartialSuccess.prototype.errorMessage = null;
                ExportMetricsPartialSuccess.create = function create(properties) {
                  return new ExportMetricsPartialSuccess(properties);
                };
                ExportMetricsPartialSuccess.encode = function encode(message, writer) {
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
                };
                ExportMetricsPartialSuccess.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportMetricsPartialSuccess.decode = function decode(reader, length) {
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
                };
                ExportMetricsPartialSuccess.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportMetricsPartialSuccess.verify = function verify(message) {
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
                };
                ExportMetricsPartialSuccess.fromObject = function fromObject(object) {
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
                };
                ExportMetricsPartialSuccess.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.rejectedDataPoints = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                    } else
                      object.rejectedDataPoints = options2.longs === String ? "0" : 0;
                    object.errorMessage = "";
                  }
                  if (message.rejectedDataPoints != null && message.hasOwnProperty("rejectedDataPoints"))
                    if (typeof message.rejectedDataPoints === "number")
                      object.rejectedDataPoints = options2.longs === String ? String(message.rejectedDataPoints) : message.rejectedDataPoints;
                    else
                      object.rejectedDataPoints = options2.longs === String ? $util.Long.prototype.toString.call(message.rejectedDataPoints) : options2.longs === Number ? new $util.LongBits(message.rejectedDataPoints.low >>> 0, message.rejectedDataPoints.high >>> 0).toNumber() : message.rejectedDataPoints;
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                  return object;
                };
                ExportMetricsPartialSuccess.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportMetricsPartialSuccess.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess";
                };
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
                (LogsService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = LogsService;
                LogsService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                  return new this(rpcImpl, requestDelimited, responseDelimited);
                };
                Object.defineProperty(LogsService.prototype["export"] = function export_(request3, callback) {
                  return this.rpcCall(export_, $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest, $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse, request3, callback);
                }, "name", { value: "Export" });
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
                ExportLogsServiceRequest.prototype.resourceLogs = $util.emptyArray;
                ExportLogsServiceRequest.create = function create(properties) {
                  return new ExportLogsServiceRequest(properties);
                };
                ExportLogsServiceRequest.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resourceLogs != null && message.resourceLogs.length)
                    for (var i = 0; i < message.resourceLogs.length; ++i)
                      $root.opentelemetry.proto.logs.v1.ResourceLogs.encode(message.resourceLogs[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                };
                ExportLogsServiceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportLogsServiceRequest.decode = function decode(reader, length) {
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
                };
                ExportLogsServiceRequest.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportLogsServiceRequest.verify = function verify(message) {
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
                };
                ExportLogsServiceRequest.fromObject = function fromObject(object) {
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
                };
                ExportLogsServiceRequest.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.arrays || options2.defaults)
                    object.resourceLogs = [];
                  if (message.resourceLogs && message.resourceLogs.length) {
                    object.resourceLogs = [];
                    for (var j = 0; j < message.resourceLogs.length; ++j)
                      object.resourceLogs[j] = $root.opentelemetry.proto.logs.v1.ResourceLogs.toObject(message.resourceLogs[j], options2);
                  }
                  return object;
                };
                ExportLogsServiceRequest.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportLogsServiceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest";
                };
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
                ExportLogsServiceResponse.prototype.partialSuccess = null;
                ExportLogsServiceResponse.create = function create(properties) {
                  return new ExportLogsServiceResponse(properties);
                };
                ExportLogsServiceResponse.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.partialSuccess != null && Object.hasOwnProperty.call(message, "partialSuccess"))
                    $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.encode(message.partialSuccess, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  return writer;
                };
                ExportLogsServiceResponse.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportLogsServiceResponse.decode = function decode(reader, length) {
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
                };
                ExportLogsServiceResponse.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportLogsServiceResponse.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess")) {
                    var error = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.verify(message.partialSuccess);
                    if (error)
                      return "partialSuccess." + error;
                  }
                  return null;
                };
                ExportLogsServiceResponse.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse();
                  if (object.partialSuccess != null) {
                    if (typeof object.partialSuccess !== "object")
                      throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse.partialSuccess: object expected");
                    message.partialSuccess = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.fromObject(object.partialSuccess);
                  }
                  return message;
                };
                ExportLogsServiceResponse.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.defaults)
                    object.partialSuccess = null;
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess"))
                    object.partialSuccess = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.toObject(message.partialSuccess, options2);
                  return object;
                };
                ExportLogsServiceResponse.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportLogsServiceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse";
                };
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
                ExportLogsPartialSuccess.prototype.rejectedLogRecords = null;
                ExportLogsPartialSuccess.prototype.errorMessage = null;
                ExportLogsPartialSuccess.create = function create(properties) {
                  return new ExportLogsPartialSuccess(properties);
                };
                ExportLogsPartialSuccess.encode = function encode(message, writer) {
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
                };
                ExportLogsPartialSuccess.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportLogsPartialSuccess.decode = function decode(reader, length) {
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
                };
                ExportLogsPartialSuccess.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportLogsPartialSuccess.verify = function verify(message) {
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
                };
                ExportLogsPartialSuccess.fromObject = function fromObject(object) {
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
                };
                ExportLogsPartialSuccess.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.rejectedLogRecords = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                    } else
                      object.rejectedLogRecords = options2.longs === String ? "0" : 0;
                    object.errorMessage = "";
                  }
                  if (message.rejectedLogRecords != null && message.hasOwnProperty("rejectedLogRecords"))
                    if (typeof message.rejectedLogRecords === "number")
                      object.rejectedLogRecords = options2.longs === String ? String(message.rejectedLogRecords) : message.rejectedLogRecords;
                    else
                      object.rejectedLogRecords = options2.longs === String ? $util.Long.prototype.toString.call(message.rejectedLogRecords) : options2.longs === Number ? new $util.LongBits(message.rejectedLogRecords.low >>> 0, message.rejectedLogRecords.high >>> 0).toNumber() : message.rejectedLogRecords;
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                  return object;
                };
                ExportLogsPartialSuccess.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportLogsPartialSuccess.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess";
                };
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
              MetricsData.prototype.resourceMetrics = $util.emptyArray;
              MetricsData.create = function create(properties) {
                return new MetricsData(properties);
              };
              MetricsData.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resourceMetrics != null && message.resourceMetrics.length)
                  for (var i = 0; i < message.resourceMetrics.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.ResourceMetrics.encode(message.resourceMetrics[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              };
              MetricsData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              MetricsData.decode = function decode(reader, length) {
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
              };
              MetricsData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              MetricsData.verify = function verify(message) {
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
              };
              MetricsData.fromObject = function fromObject(object) {
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
              };
              MetricsData.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.resourceMetrics = [];
                if (message.resourceMetrics && message.resourceMetrics.length) {
                  object.resourceMetrics = [];
                  for (var j = 0; j < message.resourceMetrics.length; ++j)
                    object.resourceMetrics[j] = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.toObject(message.resourceMetrics[j], options2);
                }
                return object;
              };
              MetricsData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              MetricsData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.MetricsData";
              };
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
              ResourceMetrics.prototype.resource = null;
              ResourceMetrics.prototype.scopeMetrics = $util.emptyArray;
              ResourceMetrics.prototype.schemaUrl = null;
              ResourceMetrics.create = function create(properties) {
                return new ResourceMetrics(properties);
              };
              ResourceMetrics.encode = function encode(message, writer) {
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
              };
              ResourceMetrics.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ResourceMetrics.decode = function decode(reader, length) {
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
              };
              ResourceMetrics.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ResourceMetrics.verify = function verify(message) {
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
              };
              ResourceMetrics.fromObject = function fromObject(object) {
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
              };
              ResourceMetrics.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.scopeMetrics = [];
                if (options2.defaults) {
                  object.resource = null;
                  object.schemaUrl = "";
                }
                if (message.resource != null && message.hasOwnProperty("resource"))
                  object.resource = $root.opentelemetry.proto.resource.v1.Resource.toObject(message.resource, options2);
                if (message.scopeMetrics && message.scopeMetrics.length) {
                  object.scopeMetrics = [];
                  for (var j = 0; j < message.scopeMetrics.length; ++j)
                    object.scopeMetrics[j] = $root.opentelemetry.proto.metrics.v1.ScopeMetrics.toObject(message.scopeMetrics[j], options2);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              };
              ResourceMetrics.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ResourceMetrics.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ResourceMetrics";
              };
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
              ScopeMetrics.prototype.scope = null;
              ScopeMetrics.prototype.metrics = $util.emptyArray;
              ScopeMetrics.prototype.schemaUrl = null;
              ScopeMetrics.create = function create(properties) {
                return new ScopeMetrics(properties);
              };
              ScopeMetrics.encode = function encode(message, writer) {
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
              };
              ScopeMetrics.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ScopeMetrics.decode = function decode(reader, length) {
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
              };
              ScopeMetrics.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ScopeMetrics.verify = function verify(message) {
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
              };
              ScopeMetrics.fromObject = function fromObject(object) {
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
              };
              ScopeMetrics.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.metrics = [];
                if (options2.defaults) {
                  object.scope = null;
                  object.schemaUrl = "";
                }
                if (message.scope != null && message.hasOwnProperty("scope"))
                  object.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.toObject(message.scope, options2);
                if (message.metrics && message.metrics.length) {
                  object.metrics = [];
                  for (var j = 0; j < message.metrics.length; ++j)
                    object.metrics[j] = $root.opentelemetry.proto.metrics.v1.Metric.toObject(message.metrics[j], options2);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              };
              ScopeMetrics.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ScopeMetrics.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ScopeMetrics";
              };
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
              Metric.create = function create(properties) {
                return new Metric(properties);
              };
              Metric.encode = function encode(message, writer) {
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
              };
              Metric.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Metric.decode = function decode(reader, length) {
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
              };
              Metric.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Metric.verify = function verify(message) {
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
              };
              Metric.fromObject = function fromObject(object) {
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
              };
              Metric.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.defaults) {
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
                  object.gauge = $root.opentelemetry.proto.metrics.v1.Gauge.toObject(message.gauge, options2);
                  if (options2.oneofs)
                    object.data = "gauge";
                }
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  object.sum = $root.opentelemetry.proto.metrics.v1.Sum.toObject(message.sum, options2);
                  if (options2.oneofs)
                    object.data = "sum";
                }
                if (message.histogram != null && message.hasOwnProperty("histogram")) {
                  object.histogram = $root.opentelemetry.proto.metrics.v1.Histogram.toObject(message.histogram, options2);
                  if (options2.oneofs)
                    object.data = "histogram";
                }
                if (message.exponentialHistogram != null && message.hasOwnProperty("exponentialHistogram")) {
                  object.exponentialHistogram = $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.toObject(message.exponentialHistogram, options2);
                  if (options2.oneofs)
                    object.data = "exponentialHistogram";
                }
                if (message.summary != null && message.hasOwnProperty("summary")) {
                  object.summary = $root.opentelemetry.proto.metrics.v1.Summary.toObject(message.summary, options2);
                  if (options2.oneofs)
                    object.data = "summary";
                }
                return object;
              };
              Metric.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Metric.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Metric";
              };
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
              Gauge.prototype.dataPoints = $util.emptyArray;
              Gauge.create = function create(properties) {
                return new Gauge(properties);
              };
              Gauge.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.dataPoints != null && message.dataPoints.length)
                  for (var i = 0; i < message.dataPoints.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.NumberDataPoint.encode(message.dataPoints[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              };
              Gauge.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Gauge.decode = function decode(reader, length) {
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
              };
              Gauge.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Gauge.verify = function verify(message) {
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
              };
              Gauge.fromObject = function fromObject(object) {
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
              };
              Gauge.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.dataPoints = [];
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.toObject(message.dataPoints[j], options2);
                }
                return object;
              };
              Gauge.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Gauge.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Gauge";
              };
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
              Sum.prototype.dataPoints = $util.emptyArray;
              Sum.prototype.aggregationTemporality = null;
              Sum.prototype.isMonotonic = null;
              Sum.create = function create(properties) {
                return new Sum(properties);
              };
              Sum.encode = function encode(message, writer) {
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
              };
              Sum.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Sum.decode = function decode(reader, length) {
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
              };
              Sum.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Sum.verify = function verify(message) {
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
              };
              Sum.fromObject = function fromObject(object) {
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
              };
              Sum.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.dataPoints = [];
                if (options2.defaults) {
                  object.aggregationTemporality = options2.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
                  object.isMonotonic = false;
                }
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.toObject(message.dataPoints[j], options2);
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  object.aggregationTemporality = options2.enums === String ? $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] === void 0 ? message.aggregationTemporality : $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] : message.aggregationTemporality;
                if (message.isMonotonic != null && message.hasOwnProperty("isMonotonic"))
                  object.isMonotonic = message.isMonotonic;
                return object;
              };
              Sum.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Sum.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Sum";
              };
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
              Histogram.prototype.dataPoints = $util.emptyArray;
              Histogram.prototype.aggregationTemporality = null;
              Histogram.create = function create(properties) {
                return new Histogram(properties);
              };
              Histogram.encode = function encode(message, writer) {
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
              };
              Histogram.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Histogram.decode = function decode(reader, length) {
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
              };
              Histogram.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Histogram.verify = function verify(message) {
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
              };
              Histogram.fromObject = function fromObject(object) {
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
              };
              Histogram.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.dataPoints = [];
                if (options2.defaults)
                  object.aggregationTemporality = options2.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.HistogramDataPoint.toObject(message.dataPoints[j], options2);
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  object.aggregationTemporality = options2.enums === String ? $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] === void 0 ? message.aggregationTemporality : $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] : message.aggregationTemporality;
                return object;
              };
              Histogram.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Histogram.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Histogram";
              };
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
              ExponentialHistogram.prototype.dataPoints = $util.emptyArray;
              ExponentialHistogram.prototype.aggregationTemporality = null;
              ExponentialHistogram.create = function create(properties) {
                return new ExponentialHistogram(properties);
              };
              ExponentialHistogram.encode = function encode(message, writer) {
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
              };
              ExponentialHistogram.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ExponentialHistogram.decode = function decode(reader, length) {
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
              };
              ExponentialHistogram.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ExponentialHistogram.verify = function verify(message) {
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
              };
              ExponentialHistogram.fromObject = function fromObject(object) {
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
              };
              ExponentialHistogram.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.dataPoints = [];
                if (options2.defaults)
                  object.aggregationTemporality = options2.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.toObject(message.dataPoints[j], options2);
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  object.aggregationTemporality = options2.enums === String ? $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] === void 0 ? message.aggregationTemporality : $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] : message.aggregationTemporality;
                return object;
              };
              ExponentialHistogram.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ExponentialHistogram.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ExponentialHistogram";
              };
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
              Summary.prototype.dataPoints = $util.emptyArray;
              Summary.create = function create(properties) {
                return new Summary(properties);
              };
              Summary.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.dataPoints != null && message.dataPoints.length)
                  for (var i = 0; i < message.dataPoints.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.encode(message.dataPoints[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              };
              Summary.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Summary.decode = function decode(reader, length) {
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
              };
              Summary.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Summary.verify = function verify(message) {
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
              };
              Summary.fromObject = function fromObject(object) {
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
              };
              Summary.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.dataPoints = [];
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.toObject(message.dataPoints[j], options2);
                }
                return object;
              };
              Summary.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Summary.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Summary";
              };
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
              NumberDataPoint.create = function create(properties) {
                return new NumberDataPoint(properties);
              };
              NumberDataPoint.encode = function encode(message, writer) {
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
              };
              NumberDataPoint.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              NumberDataPoint.decode = function decode(reader, length) {
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
              };
              NumberDataPoint.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              NumberDataPoint.verify = function verify(message) {
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
              };
              NumberDataPoint.fromObject = function fromObject(object) {
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
              };
              NumberDataPoint.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults) {
                  object.exemplars = [];
                  object.attributes = [];
                }
                if (options2.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options2.longs === String ? "0" : 0;
                  object.flags = 0;
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options2.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options2.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options2.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options2.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.asDouble != null && message.hasOwnProperty("asDouble")) {
                  object.asDouble = options2.json && !isFinite(message.asDouble) ? String(message.asDouble) : message.asDouble;
                  if (options2.oneofs)
                    object.value = "asDouble";
                }
                if (message.exemplars && message.exemplars.length) {
                  object.exemplars = [];
                  for (var j = 0; j < message.exemplars.length; ++j)
                    object.exemplars[j] = $root.opentelemetry.proto.metrics.v1.Exemplar.toObject(message.exemplars[j], options2);
                }
                if (message.asInt != null && message.hasOwnProperty("asInt")) {
                  if (typeof message.asInt === "number")
                    object.asInt = options2.longs === String ? String(message.asInt) : message.asInt;
                  else
                    object.asInt = options2.longs === String ? $util.Long.prototype.toString.call(message.asInt) : options2.longs === Number ? new $util.LongBits(message.asInt.low >>> 0, message.asInt.high >>> 0).toNumber() : message.asInt;
                  if (options2.oneofs)
                    object.value = "asInt";
                }
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                return object;
              };
              NumberDataPoint.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              NumberDataPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.NumberDataPoint";
              };
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
              HistogramDataPoint.create = function create(properties) {
                return new HistogramDataPoint(properties);
              };
              HistogramDataPoint.encode = function encode(message, writer) {
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
              };
              HistogramDataPoint.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              HistogramDataPoint.decode = function decode(reader, length) {
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
              };
              HistogramDataPoint.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              HistogramDataPoint.verify = function verify(message) {
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
              };
              HistogramDataPoint.fromObject = function fromObject(object) {
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
              };
              HistogramDataPoint.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults) {
                  object.bucketCounts = [];
                  object.explicitBounds = [];
                  object.exemplars = [];
                  object.attributes = [];
                }
                if (options2.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.count = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.count = options2.longs === String ? "0" : 0;
                  object.flags = 0;
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options2.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options2.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options2.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options2.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.count != null && message.hasOwnProperty("count"))
                  if (typeof message.count === "number")
                    object.count = options2.longs === String ? String(message.count) : message.count;
                  else
                    object.count = options2.longs === String ? $util.Long.prototype.toString.call(message.count) : options2.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  object.sum = options2.json && !isFinite(message.sum) ? String(message.sum) : message.sum;
                  if (options2.oneofs)
                    object._sum = "sum";
                }
                if (message.bucketCounts && message.bucketCounts.length) {
                  object.bucketCounts = [];
                  for (var j = 0; j < message.bucketCounts.length; ++j)
                    if (typeof message.bucketCounts[j] === "number")
                      object.bucketCounts[j] = options2.longs === String ? String(message.bucketCounts[j]) : message.bucketCounts[j];
                    else
                      object.bucketCounts[j] = options2.longs === String ? $util.Long.prototype.toString.call(message.bucketCounts[j]) : options2.longs === Number ? new $util.LongBits(message.bucketCounts[j].low >>> 0, message.bucketCounts[j].high >>> 0).toNumber() : message.bucketCounts[j];
                }
                if (message.explicitBounds && message.explicitBounds.length) {
                  object.explicitBounds = [];
                  for (var j = 0; j < message.explicitBounds.length; ++j)
                    object.explicitBounds[j] = options2.json && !isFinite(message.explicitBounds[j]) ? String(message.explicitBounds[j]) : message.explicitBounds[j];
                }
                if (message.exemplars && message.exemplars.length) {
                  object.exemplars = [];
                  for (var j = 0; j < message.exemplars.length; ++j)
                    object.exemplars[j] = $root.opentelemetry.proto.metrics.v1.Exemplar.toObject(message.exemplars[j], options2);
                }
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                if (message.min != null && message.hasOwnProperty("min")) {
                  object.min = options2.json && !isFinite(message.min) ? String(message.min) : message.min;
                  if (options2.oneofs)
                    object._min = "min";
                }
                if (message.max != null && message.hasOwnProperty("max")) {
                  object.max = options2.json && !isFinite(message.max) ? String(message.max) : message.max;
                  if (options2.oneofs)
                    object._max = "max";
                }
                return object;
              };
              HistogramDataPoint.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              HistogramDataPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.HistogramDataPoint";
              };
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
              ExponentialHistogramDataPoint.create = function create(properties) {
                return new ExponentialHistogramDataPoint(properties);
              };
              ExponentialHistogramDataPoint.encode = function encode(message, writer) {
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
              };
              ExponentialHistogramDataPoint.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ExponentialHistogramDataPoint.decode = function decode(reader, length) {
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
              };
              ExponentialHistogramDataPoint.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ExponentialHistogramDataPoint.verify = function verify(message) {
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
              };
              ExponentialHistogramDataPoint.fromObject = function fromObject(object) {
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
              };
              ExponentialHistogramDataPoint.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults) {
                  object.attributes = [];
                  object.exemplars = [];
                }
                if (options2.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.count = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.count = options2.longs === String ? "0" : 0;
                  object.scale = 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.zeroCount = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.zeroCount = options2.longs === String ? "0" : 0;
                  object.positive = null;
                  object.negative = null;
                  object.flags = 0;
                  object.zeroThreshold = 0;
                }
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options2.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options2.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options2.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options2.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.count != null && message.hasOwnProperty("count"))
                  if (typeof message.count === "number")
                    object.count = options2.longs === String ? String(message.count) : message.count;
                  else
                    object.count = options2.longs === String ? $util.Long.prototype.toString.call(message.count) : options2.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  object.sum = options2.json && !isFinite(message.sum) ? String(message.sum) : message.sum;
                  if (options2.oneofs)
                    object._sum = "sum";
                }
                if (message.scale != null && message.hasOwnProperty("scale"))
                  object.scale = message.scale;
                if (message.zeroCount != null && message.hasOwnProperty("zeroCount"))
                  if (typeof message.zeroCount === "number")
                    object.zeroCount = options2.longs === String ? String(message.zeroCount) : message.zeroCount;
                  else
                    object.zeroCount = options2.longs === String ? $util.Long.prototype.toString.call(message.zeroCount) : options2.longs === Number ? new $util.LongBits(message.zeroCount.low >>> 0, message.zeroCount.high >>> 0).toNumber() : message.zeroCount;
                if (message.positive != null && message.hasOwnProperty("positive"))
                  object.positive = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.toObject(message.positive, options2);
                if (message.negative != null && message.hasOwnProperty("negative"))
                  object.negative = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.toObject(message.negative, options2);
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                if (message.exemplars && message.exemplars.length) {
                  object.exemplars = [];
                  for (var j = 0; j < message.exemplars.length; ++j)
                    object.exemplars[j] = $root.opentelemetry.proto.metrics.v1.Exemplar.toObject(message.exemplars[j], options2);
                }
                if (message.min != null && message.hasOwnProperty("min")) {
                  object.min = options2.json && !isFinite(message.min) ? String(message.min) : message.min;
                  if (options2.oneofs)
                    object._min = "min";
                }
                if (message.max != null && message.hasOwnProperty("max")) {
                  object.max = options2.json && !isFinite(message.max) ? String(message.max) : message.max;
                  if (options2.oneofs)
                    object._max = "max";
                }
                if (message.zeroThreshold != null && message.hasOwnProperty("zeroThreshold"))
                  object.zeroThreshold = options2.json && !isFinite(message.zeroThreshold) ? String(message.zeroThreshold) : message.zeroThreshold;
                return object;
              };
              ExponentialHistogramDataPoint.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ExponentialHistogramDataPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint";
              };
              ExponentialHistogramDataPoint.Buckets = function() {
                function Buckets(properties) {
                  this.bucketCounts = [];
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                Buckets.prototype.offset = null;
                Buckets.prototype.bucketCounts = $util.emptyArray;
                Buckets.create = function create(properties) {
                  return new Buckets(properties);
                };
                Buckets.encode = function encode(message, writer) {
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
                };
                Buckets.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Buckets.decode = function decode(reader, length) {
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
                };
                Buckets.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Buckets.verify = function verify(message) {
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
                };
                Buckets.fromObject = function fromObject(object) {
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
                };
                Buckets.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.arrays || options2.defaults)
                    object.bucketCounts = [];
                  if (options2.defaults)
                    object.offset = 0;
                  if (message.offset != null && message.hasOwnProperty("offset"))
                    object.offset = message.offset;
                  if (message.bucketCounts && message.bucketCounts.length) {
                    object.bucketCounts = [];
                    for (var j = 0; j < message.bucketCounts.length; ++j)
                      if (typeof message.bucketCounts[j] === "number")
                        object.bucketCounts[j] = options2.longs === String ? String(message.bucketCounts[j]) : message.bucketCounts[j];
                      else
                        object.bucketCounts[j] = options2.longs === String ? $util.Long.prototype.toString.call(message.bucketCounts[j]) : options2.longs === Number ? new $util.LongBits(message.bucketCounts[j].low >>> 0, message.bucketCounts[j].high >>> 0).toNumber(true) : message.bucketCounts[j];
                  }
                  return object;
                };
                Buckets.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Buckets.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets";
                };
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
              SummaryDataPoint.prototype.attributes = $util.emptyArray;
              SummaryDataPoint.prototype.startTimeUnixNano = null;
              SummaryDataPoint.prototype.timeUnixNano = null;
              SummaryDataPoint.prototype.count = null;
              SummaryDataPoint.prototype.sum = null;
              SummaryDataPoint.prototype.quantileValues = $util.emptyArray;
              SummaryDataPoint.prototype.flags = null;
              SummaryDataPoint.create = function create(properties) {
                return new SummaryDataPoint(properties);
              };
              SummaryDataPoint.encode = function encode(message, writer) {
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
              };
              SummaryDataPoint.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              SummaryDataPoint.decode = function decode(reader, length) {
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
              };
              SummaryDataPoint.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              SummaryDataPoint.verify = function verify(message) {
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
              };
              SummaryDataPoint.fromObject = function fromObject(object) {
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
              };
              SummaryDataPoint.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults) {
                  object.quantileValues = [];
                  object.attributes = [];
                }
                if (options2.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.count = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.count = options2.longs === String ? "0" : 0;
                  object.sum = 0;
                  object.flags = 0;
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options2.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options2.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options2.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options2.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.count != null && message.hasOwnProperty("count"))
                  if (typeof message.count === "number")
                    object.count = options2.longs === String ? String(message.count) : message.count;
                  else
                    object.count = options2.longs === String ? $util.Long.prototype.toString.call(message.count) : options2.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
                if (message.sum != null && message.hasOwnProperty("sum"))
                  object.sum = options2.json && !isFinite(message.sum) ? String(message.sum) : message.sum;
                if (message.quantileValues && message.quantileValues.length) {
                  object.quantileValues = [];
                  for (var j = 0; j < message.quantileValues.length; ++j)
                    object.quantileValues[j] = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.toObject(message.quantileValues[j], options2);
                }
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                return object;
              };
              SummaryDataPoint.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              SummaryDataPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.SummaryDataPoint";
              };
              SummaryDataPoint.ValueAtQuantile = function() {
                function ValueAtQuantile(properties) {
                  if (properties) {
                    for (var keys4 = Object.keys(properties), i = 0; i < keys4.length; ++i)
                      if (properties[keys4[i]] != null)
                        this[keys4[i]] = properties[keys4[i]];
                  }
                }
                ValueAtQuantile.prototype.quantile = null;
                ValueAtQuantile.prototype.value = null;
                ValueAtQuantile.create = function create(properties) {
                  return new ValueAtQuantile(properties);
                };
                ValueAtQuantile.encode = function encode(message, writer) {
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
                };
                ValueAtQuantile.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ValueAtQuantile.decode = function decode(reader, length) {
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
                };
                ValueAtQuantile.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ValueAtQuantile.verify = function verify(message) {
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
                };
                ValueAtQuantile.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile();
                  if (object.quantile != null)
                    message.quantile = Number(object.quantile);
                  if (object.value != null)
                    message.value = Number(object.value);
                  return message;
                };
                ValueAtQuantile.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.defaults) {
                    object.quantile = 0;
                    object.value = 0;
                  }
                  if (message.quantile != null && message.hasOwnProperty("quantile"))
                    object.quantile = options2.json && !isFinite(message.quantile) ? String(message.quantile) : message.quantile;
                  if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options2.json && !isFinite(message.value) ? String(message.value) : message.value;
                  return object;
                };
                ValueAtQuantile.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ValueAtQuantile.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile";
                };
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
              Exemplar.create = function create(properties) {
                return new Exemplar(properties);
              };
              Exemplar.encode = function encode(message, writer) {
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
              };
              Exemplar.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Exemplar.decode = function decode(reader, length) {
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
              };
              Exemplar.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Exemplar.verify = function verify(message) {
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
              };
              Exemplar.fromObject = function fromObject(object) {
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
              };
              Exemplar.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.filteredAttributes = [];
                if (options2.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options2.longs === String ? "0" : 0;
                  if (options2.bytes === String)
                    object.spanId = "";
                  else {
                    object.spanId = [];
                    if (options2.bytes !== Array)
                      object.spanId = $util.newBuffer(object.spanId);
                  }
                  if (options2.bytes === String)
                    object.traceId = "";
                  else {
                    object.traceId = [];
                    if (options2.bytes !== Array)
                      object.traceId = $util.newBuffer(object.traceId);
                  }
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options2.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options2.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.asDouble != null && message.hasOwnProperty("asDouble")) {
                  object.asDouble = options2.json && !isFinite(message.asDouble) ? String(message.asDouble) : message.asDouble;
                  if (options2.oneofs)
                    object.value = "asDouble";
                }
                if (message.spanId != null && message.hasOwnProperty("spanId"))
                  object.spanId = options2.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                  object.traceId = options2.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                if (message.asInt != null && message.hasOwnProperty("asInt")) {
                  if (typeof message.asInt === "number")
                    object.asInt = options2.longs === String ? String(message.asInt) : message.asInt;
                  else
                    object.asInt = options2.longs === String ? $util.Long.prototype.toString.call(message.asInt) : options2.longs === Number ? new $util.LongBits(message.asInt.low >>> 0, message.asInt.high >>> 0).toNumber() : message.asInt;
                  if (options2.oneofs)
                    object.value = "asInt";
                }
                if (message.filteredAttributes && message.filteredAttributes.length) {
                  object.filteredAttributes = [];
                  for (var j = 0; j < message.filteredAttributes.length; ++j)
                    object.filteredAttributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.filteredAttributes[j], options2);
                }
                return object;
              };
              Exemplar.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Exemplar.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Exemplar";
              };
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
              LogsData.prototype.resourceLogs = $util.emptyArray;
              LogsData.create = function create(properties) {
                return new LogsData(properties);
              };
              LogsData.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resourceLogs != null && message.resourceLogs.length)
                  for (var i = 0; i < message.resourceLogs.length; ++i)
                    $root.opentelemetry.proto.logs.v1.ResourceLogs.encode(message.resourceLogs[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              };
              LogsData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              LogsData.decode = function decode(reader, length) {
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
              };
              LogsData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              LogsData.verify = function verify(message) {
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
              };
              LogsData.fromObject = function fromObject(object) {
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
              };
              LogsData.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.resourceLogs = [];
                if (message.resourceLogs && message.resourceLogs.length) {
                  object.resourceLogs = [];
                  for (var j = 0; j < message.resourceLogs.length; ++j)
                    object.resourceLogs[j] = $root.opentelemetry.proto.logs.v1.ResourceLogs.toObject(message.resourceLogs[j], options2);
                }
                return object;
              };
              LogsData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              LogsData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.logs.v1.LogsData";
              };
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
              ResourceLogs.prototype.resource = null;
              ResourceLogs.prototype.scopeLogs = $util.emptyArray;
              ResourceLogs.prototype.schemaUrl = null;
              ResourceLogs.create = function create(properties) {
                return new ResourceLogs(properties);
              };
              ResourceLogs.encode = function encode(message, writer) {
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
              };
              ResourceLogs.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ResourceLogs.decode = function decode(reader, length) {
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
              };
              ResourceLogs.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ResourceLogs.verify = function verify(message) {
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
              };
              ResourceLogs.fromObject = function fromObject(object) {
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
              };
              ResourceLogs.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.scopeLogs = [];
                if (options2.defaults) {
                  object.resource = null;
                  object.schemaUrl = "";
                }
                if (message.resource != null && message.hasOwnProperty("resource"))
                  object.resource = $root.opentelemetry.proto.resource.v1.Resource.toObject(message.resource, options2);
                if (message.scopeLogs && message.scopeLogs.length) {
                  object.scopeLogs = [];
                  for (var j = 0; j < message.scopeLogs.length; ++j)
                    object.scopeLogs[j] = $root.opentelemetry.proto.logs.v1.ScopeLogs.toObject(message.scopeLogs[j], options2);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              };
              ResourceLogs.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ResourceLogs.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.logs.v1.ResourceLogs";
              };
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
              ScopeLogs.prototype.scope = null;
              ScopeLogs.prototype.logRecords = $util.emptyArray;
              ScopeLogs.prototype.schemaUrl = null;
              ScopeLogs.create = function create(properties) {
                return new ScopeLogs(properties);
              };
              ScopeLogs.encode = function encode(message, writer) {
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
              };
              ScopeLogs.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ScopeLogs.decode = function decode(reader, length) {
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
              };
              ScopeLogs.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ScopeLogs.verify = function verify(message) {
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
              };
              ScopeLogs.fromObject = function fromObject(object) {
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
              };
              ScopeLogs.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.logRecords = [];
                if (options2.defaults) {
                  object.scope = null;
                  object.schemaUrl = "";
                }
                if (message.scope != null && message.hasOwnProperty("scope"))
                  object.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.toObject(message.scope, options2);
                if (message.logRecords && message.logRecords.length) {
                  object.logRecords = [];
                  for (var j = 0; j < message.logRecords.length; ++j)
                    object.logRecords[j] = $root.opentelemetry.proto.logs.v1.LogRecord.toObject(message.logRecords[j], options2);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              };
              ScopeLogs.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ScopeLogs.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.logs.v1.ScopeLogs";
              };
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
              LogRecord.create = function create(properties) {
                return new LogRecord(properties);
              };
              LogRecord.encode = function encode(message, writer) {
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
              };
              LogRecord.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              LogRecord.decode = function decode(reader, length) {
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
              };
              LogRecord.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              LogRecord.verify = function verify(message) {
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
              };
              LogRecord.fromObject = function fromObject(object) {
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
              };
              LogRecord.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.attributes = [];
                if (options2.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options2.longs === String ? "0" : 0;
                  object.severityNumber = options2.enums === String ? "SEVERITY_NUMBER_UNSPECIFIED" : 0;
                  object.severityText = "";
                  object.body = null;
                  object.droppedAttributesCount = 0;
                  object.flags = 0;
                  if (options2.bytes === String)
                    object.traceId = "";
                  else {
                    object.traceId = [];
                    if (options2.bytes !== Array)
                      object.traceId = $util.newBuffer(object.traceId);
                  }
                  if (options2.bytes === String)
                    object.spanId = "";
                  else {
                    object.spanId = [];
                    if (options2.bytes !== Array)
                      object.spanId = $util.newBuffer(object.spanId);
                  }
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.observedTimeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.observedTimeUnixNano = options2.longs === String ? "0" : 0;
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options2.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options2.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.severityNumber != null && message.hasOwnProperty("severityNumber"))
                  object.severityNumber = options2.enums === String ? $root.opentelemetry.proto.logs.v1.SeverityNumber[message.severityNumber] === void 0 ? message.severityNumber : $root.opentelemetry.proto.logs.v1.SeverityNumber[message.severityNumber] : message.severityNumber;
                if (message.severityText != null && message.hasOwnProperty("severityText"))
                  object.severityText = message.severityText;
                if (message.body != null && message.hasOwnProperty("body"))
                  object.body = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.body, options2);
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                  object.droppedAttributesCount = message.droppedAttributesCount;
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                  object.traceId = options2.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                if (message.spanId != null && message.hasOwnProperty("spanId"))
                  object.spanId = options2.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                if (message.observedTimeUnixNano != null && message.hasOwnProperty("observedTimeUnixNano"))
                  if (typeof message.observedTimeUnixNano === "number")
                    object.observedTimeUnixNano = options2.longs === String ? String(message.observedTimeUnixNano) : message.observedTimeUnixNano;
                  else
                    object.observedTimeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.observedTimeUnixNano) : options2.longs === Number ? new $util.LongBits(message.observedTimeUnixNano.low >>> 0, message.observedTimeUnixNano.high >>> 0).toNumber() : message.observedTimeUnixNano;
                return object;
              };
              LogRecord.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              LogRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.logs.v1.LogRecord";
              };
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
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/lodash.js
var require_lodash = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/lodash.js"(exports2, module2) {
    "use strict";
    (function() {
      var undefined2;
      var VERSION4 = "4.17.21";
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
      var reTrimStart = /^\s+/;
      var reWhitespace = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo, "g");
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        // Latin-1 Supplement block.
        "\xC0": "A",
        "\xC1": "A",
        "\xC2": "A",
        "\xC3": "A",
        "\xC4": "A",
        "\xC5": "A",
        "\xE0": "a",
        "\xE1": "a",
        "\xE2": "a",
        "\xE3": "a",
        "\xE4": "a",
        "\xE5": "a",
        "\xC7": "C",
        "\xE7": "c",
        "\xD0": "D",
        "\xF0": "d",
        "\xC8": "E",
        "\xC9": "E",
        "\xCA": "E",
        "\xCB": "E",
        "\xE8": "e",
        "\xE9": "e",
        "\xEA": "e",
        "\xEB": "e",
        "\xCC": "I",
        "\xCD": "I",
        "\xCE": "I",
        "\xCF": "I",
        "\xEC": "i",
        "\xED": "i",
        "\xEE": "i",
        "\xEF": "i",
        "\xD1": "N",
        "\xF1": "n",
        "\xD2": "O",
        "\xD3": "O",
        "\xD4": "O",
        "\xD5": "O",
        "\xD6": "O",
        "\xD8": "O",
        "\xF2": "o",
        "\xF3": "o",
        "\xF4": "o",
        "\xF5": "o",
        "\xF6": "o",
        "\xF8": "o",
        "\xD9": "U",
        "\xDA": "U",
        "\xDB": "U",
        "\xDC": "U",
        "\xF9": "u",
        "\xFA": "u",
        "\xFB": "u",
        "\xFC": "u",
        "\xDD": "Y",
        "\xFD": "y",
        "\xFF": "y",
        "\xC6": "Ae",
        "\xE6": "ae",
        "\xDE": "Th",
        "\xFE": "th",
        "\xDF": "ss",
        // Latin Extended-A block.
        "\u0100": "A",
        "\u0102": "A",
        "\u0104": "A",
        "\u0101": "a",
        "\u0103": "a",
        "\u0105": "a",
        "\u0106": "C",
        "\u0108": "C",
        "\u010A": "C",
        "\u010C": "C",
        "\u0107": "c",
        "\u0109": "c",
        "\u010B": "c",
        "\u010D": "c",
        "\u010E": "D",
        "\u0110": "D",
        "\u010F": "d",
        "\u0111": "d",
        "\u0112": "E",
        "\u0114": "E",
        "\u0116": "E",
        "\u0118": "E",
        "\u011A": "E",
        "\u0113": "e",
        "\u0115": "e",
        "\u0117": "e",
        "\u0119": "e",
        "\u011B": "e",
        "\u011C": "G",
        "\u011E": "G",
        "\u0120": "G",
        "\u0122": "G",
        "\u011D": "g",
        "\u011F": "g",
        "\u0121": "g",
        "\u0123": "g",
        "\u0124": "H",
        "\u0126": "H",
        "\u0125": "h",
        "\u0127": "h",
        "\u0128": "I",
        "\u012A": "I",
        "\u012C": "I",
        "\u012E": "I",
        "\u0130": "I",
        "\u0129": "i",
        "\u012B": "i",
        "\u012D": "i",
        "\u012F": "i",
        "\u0131": "i",
        "\u0134": "J",
        "\u0135": "j",
        "\u0136": "K",
        "\u0137": "k",
        "\u0138": "k",
        "\u0139": "L",
        "\u013B": "L",
        "\u013D": "L",
        "\u013F": "L",
        "\u0141": "L",
        "\u013A": "l",
        "\u013C": "l",
        "\u013E": "l",
        "\u0140": "l",
        "\u0142": "l",
        "\u0143": "N",
        "\u0145": "N",
        "\u0147": "N",
        "\u014A": "N",
        "\u0144": "n",
        "\u0146": "n",
        "\u0148": "n",
        "\u014B": "n",
        "\u014C": "O",
        "\u014E": "O",
        "\u0150": "O",
        "\u014D": "o",
        "\u014F": "o",
        "\u0151": "o",
        "\u0154": "R",
        "\u0156": "R",
        "\u0158": "R",
        "\u0155": "r",
        "\u0157": "r",
        "\u0159": "r",
        "\u015A": "S",
        "\u015C": "S",
        "\u015E": "S",
        "\u0160": "S",
        "\u015B": "s",
        "\u015D": "s",
        "\u015F": "s",
        "\u0161": "s",
        "\u0162": "T",
        "\u0164": "T",
        "\u0166": "T",
        "\u0163": "t",
        "\u0165": "t",
        "\u0167": "t",
        "\u0168": "U",
        "\u016A": "U",
        "\u016C": "U",
        "\u016E": "U",
        "\u0170": "U",
        "\u0172": "U",
        "\u0169": "u",
        "\u016B": "u",
        "\u016D": "u",
        "\u016F": "u",
        "\u0171": "u",
        "\u0173": "u",
        "\u0174": "W",
        "\u0175": "w",
        "\u0176": "Y",
        "\u0177": "y",
        "\u0178": "Y",
        "\u0179": "Z",
        "\u017B": "Z",
        "\u017D": "Z",
        "\u017A": "z",
        "\u017C": "z",
        "\u017E": "z",
        "\u0132": "IJ",
        "\u0133": "ij",
        "\u0152": "Oe",
        "\u0153": "oe",
        "\u0149": "'n",
        "\u017F": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root2 = freeGlobal || freeSelf || Function("return this")();
      var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
      var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply(func, thisArg, args2) {
        switch (args2.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args2[0]);
          case 2:
            return func.call(thisArg, args2[0], args2[1]);
          case 3:
            return func.call(thisArg, args2[0], args2[1], args2[2]);
        }
        return func.apply(thisArg, args2);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (!predicate(array[index], index, array)) {
            return false;
          }
        }
        return true;
      }
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index];
        }
        while (++index < length) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty("length");
      function asciiToArray(string) {
        return string.split("");
      }
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (comparator(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      function baseProperty(key) {
        return function(object) {
          return object == null ? undefined2 : object[key];
        };
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? undefined2 : object[key];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
        });
        return accumulator;
      }
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      function baseSum(array, iteratee) {
        var result, index = -1, length = array.length;
        while (++index < length) {
          var current = iteratee(array[index]);
          if (current !== undefined2) {
            result = result === undefined2 ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseToPairs(object, props) {
        return arrayMap(props, function(key) {
          return [key, object[key]];
        });
      }
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1, length = strSymbols.length;
        while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue(object, key) {
        return object == null ? undefined2 : object[key];
      }
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array, placeholder) {
        var index = -1, length = array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index] = PLACEHOLDER;
            result[resIndex++] = index;
          }
        }
        return result;
      }
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      function setToPairs(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array, value, fromIndex) {
        var index = fromIndex + 1;
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return index;
      }
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      var runInContext = function runInContext2(context) {
        context = context == null ? root2 : _5.defaults(root2.Object(), context, _5.pick(root2, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
        var coreJsData = context["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = function() {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        }();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object2);
        var oldDash = root2._;
        var reIsNative = RegExp2(
          "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        );
        var Buffer2 = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
        var defineProperty = function() {
          try {
            var func = getNative(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        }();
        var ctxClearTimeout = context.clearTimeout !== root2.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root2.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root2.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
        var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap2 = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
        var metaMap = WeakMap2 && new WeakMap2();
        var realNames = {};
        var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
        var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
        function lodash(value) {
          if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate = /* @__PURE__ */ function() {
          function object() {
          }
          return function(proto) {
            if (!isObject(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object.prototype = proto;
            var result2 = new object();
            object.prototype = undefined2;
            return result2;
          };
        }();
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined2;
        }
        lodash.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "escape": reEscape,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "evaluate": reEvaluate,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "interpolate": reInterpolate,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          "variable": "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          "imports": {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            "_": lodash
          }
        };
        lodash.prototype = baseLodash.prototype;
        lodash.prototype.constructor = lodash;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray(this.__views__);
          return result2;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index += dir;
              var iterIndex = -1, value = array[index];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        function hashDelete(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result2 = data[key];
            return result2 === HASH_UNDEFINED ? undefined2 : result2;
          }
          return hasOwnProperty.call(data, key) ? data[key] : undefined2;
        }
        function hashHas(key) {
          var data = this.__data__;
          return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
        }
        function hashSet(key, value) {
          var data = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
          return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
        function listCacheDelete(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index == lastIndex) {
            data.pop();
          } else {
            splice.call(data, index, 1);
          }
          --this.size;
          return true;
        }
        function listCacheGet(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          return index < 0 ? undefined2 : data[index][1];
        }
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            ++this.size;
            data.push([key, value]);
          } else {
            data[index][1] = value;
          }
          return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map2 || ListCache)(),
            "string": new Hash()
          };
        }
        function mapCacheDelete(key) {
          var result2 = getMapData(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
          var data = getMapData(this, key), size2 = data.size;
          data.set(key, value);
          this.size += data.size == size2 ? 0 : 1;
          return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values2) {
          var index = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache();
          while (++index < length) {
            this.add(values2[index]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          var data = this.__data__ = new ListCache(entries);
          this.size = data.size;
        }
        function stackClear() {
          this.__data__ = new ListCache();
          this.size = 0;
        }
        function stackDelete(key) {
          var data = this.__data__, result2 = data["delete"](key);
          this.size = data.size;
          return result2;
        }
        function stackGet(key) {
          return this.__data__.get(key);
        }
        function stackHas(key) {
          return this.__data__.has(key);
        }
        function stackSet(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache(pairs);
          }
          data.set(key, value);
          this.size = data.size;
          return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
            isIndex(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined2;
        }
        function arraySampleSize(array, n) {
          return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
        }
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        function assignMergeValue(object, key, value) {
          if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assignValue(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assocIndexOf(array, key) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        function baseAssign(object, source) {
          return object && copyObject(source, keys4(source), object);
        }
        function baseAssignIn(object, source) {
          return object && copyObject(source, keysIn(source), object);
        }
        function baseAssignValue(object, key, value) {
          if (key == "__proto__" && defineProperty) {
            defineProperty(object, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object[key] = value;
          }
        }
        function baseAt(object, paths) {
          var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
          while (++index < length) {
            result2[index] = skip ? undefined2 : get(object, paths[index]);
          }
          return result2;
        }
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined2) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined2) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        function baseClone(value, bitmask, customizer, key, object, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result2 !== undefined2) {
            return result2;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object) {
              result2 = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys4;
          var props = isArr ? undefined2 : keysFunc(value);
          arrayEach(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        function baseConforms(source) {
          var props = keys4(source);
          return function(object) {
            return baseConformsTo(object, source, props);
          };
        }
        function baseConformsTo(object, source, props) {
          var length = props.length;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (length--) {
            var key = props[length], predicate = source[key], value = object[key];
            if (value === undefined2 && !(key in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args2) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return setTimeout2(function() {
            func.apply(undefined2, args2);
          }, wait);
        }
        function baseDifference(array, values2, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap(values2, baseUnary(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE) {
            includes2 = cacheHas;
            isCommon = false;
            values2 = new SetCache(values2);
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index, collection2) {
            result2 = !!predicate(value, index, collection2);
            return result2;
          });
          return result2;
        }
        function baseExtremum(array, iteratee2, comparator) {
          var index = -1, length = array.length;
          while (++index < length) {
            var value = array[index], current = iteratee2(value);
            if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
              var computed = current, result2 = value;
            }
          }
          return result2;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined2 || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index, collection2) {
            if (predicate(value, index, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        function baseFlatten(array, depth, predicate, isStrict, result2) {
          var index = -1, length = array.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee2) {
          return object && baseFor(object, iteratee2, keys4);
        }
        function baseForOwnRight(object, iteratee2) {
          return object && baseForRight(object, iteratee2, keys4);
        }
        function baseFunctions(object, props) {
          return arrayFilter(props, function(key) {
            return isFunction(object[key]);
          });
        }
        function baseGet(object, path) {
          path = castPath(path, object);
          var index = 0, length = path.length;
          while (object != null && index < length) {
            object = object[toKey(path[index++])];
          }
          return index && index == length ? object : undefined2;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object);
          return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
        }
        function baseGetTag(value) {
          if (value == null) {
            return value === undefined2 ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object, key) {
          return object != null && hasOwnProperty.call(object, key);
        }
        function baseHasIn(object, key) {
          return object != null && key in Object2(object);
        }
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax(start, end);
        }
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap(array, baseUnary(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
          }
          array = arrays[0];
          var index = -1, seen = caches[0];
          outer:
            while (++index < length && result2.length < maxLength) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseInverter(object, setter, iteratee2, accumulator) {
          baseForOwn(object, function(value, key, object2) {
            setter(accumulator, iteratee2(value), key, object2);
          });
          return accumulator;
        }
        function baseInvoke(object, path, args2) {
          path = castPath(path, object);
          object = parent(object, path);
          var func = object == null ? object : object[toKey(last(path))];
          return func == null ? undefined2 : apply(func, object, args2);
        }
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        function baseIsDate(value) {
          return isObjectLike(value) && baseGetTag(value) == dateTag;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
          objTag = objTag == argsTag ? objectTag : objTag;
          othTag = othTag == argsTag ? objectTag : othTag;
          var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack());
          return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap(value) {
          return isObjectLike(value) && getTag(value) == mapTag;
        }
        function baseIsMatch(object, source, matchData, customizer) {
          var index = matchData.length, length = index, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (index--) {
            var data = matchData[index];
            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0], objValue = object[key], srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined2 && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative(value) {
          if (!isObject(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        function baseIsSet(value) {
          return isObjectLike(value) && getTag(value) == setTag;
        }
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity2;
          }
          if (typeof value == "object") {
            return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result2 = [];
          for (var key in Object2(object)) {
            if (hasOwnProperty.call(object, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseKeysIn(object) {
          if (!isObject(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object), result2 = [];
          for (var key in object) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee2) {
          var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          if (isKey(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path), srcValue);
          }
          return function(object) {
            var objValue = get(object, path);
            return objValue === undefined2 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor(source, function(srcValue, key) {
            stack || (stack = new Stack());
            if (isObject(srcValue)) {
              baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
              if (newValue === undefined2) {
                newValue = srcValue;
              }
              assignMergeValue(object, key, newValue);
            }
          }, keysIn);
        }
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
          var isCommon = newValue === undefined2;
          if (isCommon) {
            var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              newValue = objValue;
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject(objValue) || isFunction(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object, key, newValue);
        }
        function baseNth(array, n) {
          var length = array.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex(n, length) ? array[n] : undefined2;
        }
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap(iteratees, function(iteratee2) {
              if (isArray(iteratee2)) {
                return function(value) {
                  return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity2];
          }
          var index = -1;
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index, "value": value };
          });
          return baseSortBy(result2, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function basePick(object, paths) {
          return basePickBy(object, paths, function(value, path) {
            return hasIn(object, path);
          });
        }
        function basePickBy(object, paths, predicate) {
          var index = -1, length = paths.length, result2 = {};
          while (++index < length) {
            var path = paths[index], value = baseGet(object, path);
            if (predicate(value, path)) {
              baseSet(result2, castPath(path, object), value);
            }
          }
          return result2;
        }
        function basePropertyDeep(path) {
          return function(object) {
            return baseGet(object, path);
          };
        }
        function basePullAll(array, values2, iteratee2, comparator) {
          var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
          if (array === values2) {
            values2 = copyArray(values2);
          }
          if (iteratee2) {
            seen = arrayMap(array, baseUnary(iteratee2));
          }
          while (++index < length) {
            var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice.call(seen, fromIndex, 1);
              }
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index = indexes[length];
            if (length == lastIndex || index !== previous) {
              var previous = index;
              if (isIndex(index)) {
                splice.call(array, index, 1);
              } else {
                baseUnset(array, index);
              }
            }
          }
          return array;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end, step, fromRight) {
          var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index] = start;
            start += step;
          }
          return result2;
        }
        function baseRepeat(string, n) {
          var result2 = "";
          if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
            return result2;
          }
          do {
            if (n % 2) {
              result2 += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string += string;
            }
          } while (n);
          return result2;
        }
        function baseRest(func, start) {
          return setToString(overRest(func, start, identity2), func + "");
        }
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        function baseSampleSize(collection, n) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        function baseSet(object, path, value, customizer) {
          if (!isObject(object)) {
            return object;
          }
          path = castPath(path, object);
          var index = -1, length = path.length, lastIndex = length - 1, nested = object;
          while (nested != null && ++index < length) {
            var key = toKey(path[index]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object;
            }
            if (index != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined2;
              if (newValue === undefined2) {
                newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
              }
            }
            assignValue(nested, key, newValue);
            nested = nested[key];
          }
          return object;
        }
        var baseSetData = !metaMap ? identity2 : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString = !defineProperty ? identity2 : function(func, string) {
          return defineProperty(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        function baseSlice(array, start, end) {
          var index = -1, length = array.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : end - start >>> 0;
          start >>>= 0;
          var result2 = Array2(length);
          while (++index < length) {
            result2[index] = array[index + start];
          }
          return result2;
        }
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index, collection2) {
            result2 = predicate(value, index, collection2);
            return !result2;
          });
          return !!result2;
        }
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed = array[mid];
              if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity2, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed <= value : computed < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee2) {
          var index = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            if (!index || !eq(computed, seen)) {
              var seen = computed;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          return +value;
        }
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray(value)) {
            return arrayMap(value, baseToString) + "";
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function baseUniq(array, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set2 = iteratee2 ? null : createSet(array);
            if (set2) {
              return setToArray(set2);
            }
            isCommon = false;
            includes2 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed);
                }
                result2.push(value);
              } else if (!includes2(seen, computed, comparator)) {
                if (seen !== result2) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseUnset(object, path) {
          path = castPath(path, object);
          object = parent(object, path);
          return object == null || delete object[toKey(last(path))];
        }
        function baseUpdate(object, path, updater, customizer) {
          return baseSet(object, path, updater(baseGet(object, path)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
          }
          return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
        }
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush([result3], action.args));
          }, result2);
        }
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index = -1, result2 = Array2(length);
          while (++index < length) {
            var array = arrays[index], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index) {
                result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        function baseZipObject(props, values2, assignFunc) {
          var index = -1, length = props.length, valsLength = values2.length, result2 = {};
          while (++index < length) {
            var value = index < valsLength ? values2[index] : undefined2;
            assignFunc(result2, props[index], value);
          }
          return result2;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == "function" ? value : identity2;
        }
        function castPath(value, object) {
          if (isArray(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath(toString2(value));
        }
        var castRest = baseRest;
        function castSlice(array, start, end) {
          var length = array.length;
          end = end === undefined2 ? length : end;
          return !start && end >= length ? array : baseSlice(array, start, end);
        }
        var clearTimeout2 = ctxClearTimeout || function(id) {
          return root2.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        function cloneArrayBuffer(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
          return result2;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
            var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object, other, orders) {
          var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index < length) {
            var result2 = compareAscending(objCriteria[index], othCriteria[index]);
            if (result2) {
              if (index >= ordersLength) {
                return result2;
              }
              var order = orders[index];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        function composeArgs(args2, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args2.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args2[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args2[argsIndex++];
          }
          return result2;
        }
        function composeArgsRight(args2, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args2.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args2[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args2[argsIndex++];
            }
          }
          return result2;
        }
        function copyArray(source, array) {
          var index = -1, length = source.length;
          array || (array = Array2(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        function copyObject(source, props, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index = -1, length = props.length;
          while (++index < length) {
            var key = props[index];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
            if (newValue === undefined2) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue(object, key, newValue);
            } else {
              assignValue(object, key, newValue);
            }
          }
          return object;
        }
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        function copySymbolsIn(source, object) {
          return copyObject(source, getSymbolsIn(source), object);
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        function createAssigner(assigner) {
          return baseRest(function(object, sources) {
            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined2 : customizer;
              length = 1;
            }
            object = Object2(object);
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, index, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index-- : ++index < length) {
              if (iteratee2(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper;
        }
        function createCaseFirst(methodName) {
          return function(string) {
            string = toString2(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        function createCtor(Ctor) {
          return function() {
            var args2 = arguments;
            switch (args2.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args2[0]);
              case 2:
                return new Ctor(args2[0], args2[1]);
              case 3:
                return new Ctor(args2[0], args2[1], args2[2]);
              case 4:
                return new Ctor(args2[0], args2[1], args2[2], args2[3]);
              case 5:
                return new Ctor(args2[0], args2[1], args2[2], args2[3], args2[4]);
              case 6:
                return new Ctor(args2[0], args2[1], args2[2], args2[3], args2[4], args2[5]);
              case 7:
                return new Ctor(args2[0], args2[1], args2[2], args2[3], args2[4], args2[5], args2[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args2);
            return isObject(result2) ? result2 : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args2 = Array2(length), index = length, placeholder = getHolder(wrapper);
            while (index--) {
              args2[index] = arguments[index];
            }
            var holders = length < 3 && args2[0] !== placeholder && args2[length - 1] !== placeholder ? [] : replaceHolders(args2, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                undefined2,
                args2,
                holders,
                undefined2,
                undefined2,
                arity - length
              );
            }
            var fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
            return apply(fn, this, args2);
          }
          return wrapper;
        }
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys4(collection);
              predicate = function(key) {
                return iteratee2(iterable[key], key, iterable);
              };
            }
            var index = findIndexFunc(collection, predicate, fromIndex);
            return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
          };
        }
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index--) {
              var func = funcs[index];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index = wrapper ? index : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args2 = arguments, value = args2[0];
              if (wrapper && args2.length == 1 && isArray(value)) {
                return wrapper.plant(value).value();
              }
              var index2 = 0, result2 = length ? funcs[index2].apply(this, args2) : value;
              while (++index2 < length) {
                result2 = funcs[index2].call(this, result2);
              }
              return result2;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
          function wrapper() {
            var length = arguments.length, args2 = Array2(length), index = length;
            while (index--) {
              args2[index] = arguments[index];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args2, placeholder);
            }
            if (partials) {
              args2 = composeArgs(args2, partials, holders, isCurried);
            }
            if (partialsRight) {
              args2 = composeArgsRight(args2, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args2, placeholder);
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                thisArg,
                args2,
                newHolders,
                argPos,
                ary2,
                arity - length
              );
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args2.length;
            if (argPos) {
              args2 = reorder(args2, argPos);
            } else if (isFlip && length > 1) {
              args2.reverse();
            }
            if (isAry && ary2 < length) {
              args2.length = ary2;
            }
            if (this && this !== root2 && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args2);
          }
          return wrapper;
        }
        function createInverter(setter, toIteratee) {
          return function(object, iteratee2) {
            return baseInverter(object, setter, toIteratee(iteratee2), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined2 && other === undefined2) {
              return defaultValue;
            }
            if (value !== undefined2) {
              result2 = value;
            }
            if (other !== undefined2) {
              if (result2 === undefined2) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString(value);
                other = baseToString(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            return baseRest(function(args2) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply(iteratee2, thisArg, args2);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined2 ? " " : baseToString(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args2 = Array2(leftLength + argsLength), fn = this && this !== root2 && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args2[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args2[leftIndex++] = arguments[++argsIndex];
            }
            return apply(fn, isBind ? thisArg : this, args2);
          }
          return wrapper;
        }
        function createRange(fromRight) {
          return function(start, end, step) {
            if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
              end = step = undefined2;
            }
            start = toFinite(start);
            if (end === undefined2) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined2, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString2(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString2(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
          return new Set2(values2);
        };
        function createToPairs(keysFunc) {
          return function(object) {
            var tag = getTag(object);
            if (tag == mapTag) {
              return mapToArray(object);
            }
            if (tag == setTag) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
            partials = holders = undefined2;
          }
          ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
          arity = arity === undefined2 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined2;
          }
          var data = isBindKey ? undefined2 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined2, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
          if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
          if (isObject(objValue) && isObject(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject(value) ? undefined2 : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
          stack.set(array, other);
          stack.set(other, array);
          while (++index < arrLength) {
            var arrValue = array[index], othValue = other[index];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== undefined2) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq(+object, +other);
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
              return object == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object);
              return result2;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object;
          }
          var result2 = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result2;
        }
        function flatRest(func) {
          return setToString(overRest(func, undefined2, flatten), func + "");
        }
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys4, getSymbols);
        }
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data = array[length], otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result2;
        }
        function getHolder(func) {
          var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
          return object.placeholder;
        }
        function getIteratee() {
          var result2 = lodash.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        function getMapData(map2, key) {
          var data = map2.__data__;
          return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
        }
        function getMatchData(object) {
          var result2 = keys4(object), length = result2.length;
          while (length--) {
            var key = result2[length], value = object[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        function getNative(object, key) {
          var value = getValue(object, key);
          return baseIsNative(value) ? value : undefined2;
        }
        function getRawTag(value) {
          var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
          try {
            value[symToStringTag] = undefined2;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result2;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
          if (object == null) {
            return [];
          }
          object = Object2(object);
          return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
          var result2 = [];
          while (object) {
            arrayPush(result2, getSymbols(object));
            object = getPrototype(object);
          }
          return result2;
        };
        var getTag = baseGetTag;
        if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
          getTag = function(value) {
            var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result2;
          };
        }
        function getView(start, end, transforms) {
          var index = -1, length = transforms.length;
          while (++index < length) {
            var data = transforms[index], size2 = data.size;
            switch (data.type) {
              case "drop":
                start += size2;
                break;
              case "dropRight":
                end -= size2;
                break;
              case "take":
                end = nativeMin(end, start + size2);
                break;
              case "takeRight":
                start = nativeMax(start, end - size2);
                break;
            }
          }
          return { "start": start, "end": end };
        }
        function getWrapDetails(source) {
          var match = source.match(reWrapDetails);
          return match ? match[1].split(reSplitDetails) : [];
        }
        function hasPath(object, path, hasFunc) {
          path = castPath(path, object);
          var index = -1, length = path.length, result2 = false;
          while (++index < length) {
            var key = toKey(path[index]);
            if (!(result2 = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result2 || ++index != length) {
            return result2;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
        }
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        function initCloneObject(object) {
          return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return new Ctor();
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return new Ctor();
            case symbolTag:
              return cloneSymbol(object);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable(value) {
          return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall(value, index, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index;
          if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
            return eq(object[index], value);
          }
          return false;
        }
        function isKey(value, object) {
          if (isArray(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
        }
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        var isMaskable = coreJsData ? isFunction : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined2 || key in Object2(object));
          };
        }
        function memoizeCapped(func) {
          var result2 = memoize(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        function mergeData(data, source) {
          var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function nativeKeysIn(object) {
          var result2 = [];
          if (object != null) {
            for (var key in Object2(object)) {
              result2.push(key);
            }
          }
          return result2;
        }
        function objectToString(value) {
          return nativeObjectToString.call(value);
        }
        function overRest(func, start, transform2) {
          start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
          return function() {
            var args2 = arguments, index = -1, length = nativeMax(args2.length - start, 0), array = Array2(length);
            while (++index < length) {
              array[index] = args2[start + index];
            }
            index = -1;
            var otherArgs = Array2(start + 1);
            while (++index < start) {
              otherArgs[index] = args2[index];
            }
            otherArgs[start] = transform2(array);
            return apply(func, this, otherArgs);
          };
        }
        function parent(object, path) {
          return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
        }
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
          }
          return array;
        }
        function safeGet(object, key) {
          if (key === "constructor" && typeof object[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object[key];
        }
        var setData = shortOut(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root2.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined2, arguments);
          };
        }
        function shuffleSelf(array, size2) {
          var index = -1, length = array.length, lastIndex = length - 1;
          size2 = size2 === undefined2 ? length : size2;
          while (++index < size2) {
            var rand = baseRandom(index, lastIndex), value = array[rand];
            array[rand] = array[index];
            array[index] = value;
          }
          array.length = size2;
          return array;
        }
        var stringToPath = memoizeCapped(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName, function(match, number, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
          });
          return result2;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        function chunk(array, size2, guard) {
          if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
            size2 = 1;
          } else {
            size2 = nativeMax(toInteger(size2), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size2 < 1) {
            return [];
          }
          var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
          while (index < length) {
            result2[resIndex++] = baseSlice(array, index, index += size2);
          }
          return result2;
        }
        function compact(array) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args2 = Array2(length - 1), array = arguments[0], index = length;
          while (index--) {
            args2[index - 1] = arguments[index];
          }
          return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args2, 1));
        }
        var difference = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function(array, values2) {
          var iteratee2 = last(values2);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest(function(array, values2) {
          var comparator = last(values2);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
        });
        function drop(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function dropRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        function findIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index);
        }
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length - 1;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index, true);
        }
        function flatten(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY) : [];
        }
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        function fromPairs(pairs) {
          var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index < length) {
            var pair = pairs[index];
            result2[pair[0]] = pair[1];
          }
          return result2;
        }
        function head(array) {
          return array && array.length ? array[0] : undefined2;
        }
        function indexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseIndexOf(array, value, index);
        }
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        var intersection = baseRest(function(arrays) {
          var mapped = arrayMap(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          if (iteratee2 === last(mapped)) {
            iteratee2 = undefined2;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest(function(arrays) {
          var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
        });
        function join(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined2;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
        }
        function nth(array, n) {
          return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
        }
        var pull = baseRest(pullAll);
        function pullAll(array, values2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
        }
        function pullAllBy(array, values2, iteratee2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
        }
        function pullAllWith(array, values2, comparator) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
        }
        var pullAt = flatRest(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap(indexes, function(index) {
            return isIndex(index, length) ? +index : index;
          }).sort(compareAscending));
          return result2;
        });
        function remove(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result2.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        function slice(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined2 ? length : toInteger(end);
          }
          return baseSlice(array, start, end);
        }
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value);
            if (index < length && eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value, true) - 1;
            if (eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        function take(array, n, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return array && array.length ? baseUniq(array, undefined2, comparator) : [];
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function(index) {
            return arrayMap(array, baseProperty(index));
          });
        }
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap(result2, function(group) {
            return apply(iteratee2, undefined2, group);
          });
        }
        var without = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
        });
        var xor = baseRest(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props, values2) {
          return baseZipObject(props || [], values2 || [], assignValue);
        }
        function zipObjectDeep(props, values2) {
          return baseZipObject(props || [], values2 || [], baseSet);
        }
        var zipWith = baseRest(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash(value);
          result2.__chain__ = true;
          return result2;
        }
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        function thru(value, interceptor) {
          return interceptor(value);
        }
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
            return baseAt(object, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined2
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined2);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined2) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone2 = wrapperClone(parent2);
            clone2.__index__ = 0;
            clone2.__values__ = undefined2;
            if (result2) {
              previous.__wrapped__ = clone2;
            } else {
              result2 = clone2;
            }
            var previous = clone2;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined2
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue(result2, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), 1);
        }
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), INFINITY);
        }
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(map(collection, iteratee2), depth);
        }
        function forEach(collection, iteratee2) {
          var func = isArray(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function forEachRight(collection, iteratee2) {
          var func = isArray(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        var groupBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue(result2, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax(length + fromIndex, 0);
          }
          return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest(function(collection, path, args2) {
          var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index] = isFunc ? apply(path, value, args2) : baseInvoke(value, path, args2);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue(result2, key, value);
        });
        function map(collection, iteratee2) {
          var func = isArray(collection) ? arrayMap : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined2 : orders;
          if (!isArray(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        function shuffle(collection) {
          var func = isArray(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike(collection)) {
            return isString(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        function some(collection, predicate, guard) {
          var func = isArray(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root2.Date.now();
        };
        function after(n, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          n = guard ? undefined2 : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
        }
        function before(n, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined2;
            }
            return result2;
          };
        }
        var bind = baseRest(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function(object, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        function debounce(func, wait, options2) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject(options2)) {
            leading = !!options2.leading;
            maxing = "maxWait" in options2;
            maxWait = maxing ? nativeMax(toNumber(options2.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options2 ? !!options2.trailing : trailing;
          }
          function invokeFunc(time) {
            var args2 = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined2;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args2);
            return result2;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined2;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined2;
            return result2;
          }
          function cancel() {
            if (timerId !== undefined2) {
              clearTimeout2(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined2;
          }
          function flush() {
            return timerId === undefined2 ? result2 : trailingEdge(now());
          }
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined2) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout2(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined2) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest(function(func, args2) {
          return baseDelay(func, 1, args2);
        });
        var delay = baseRest(function(func, wait, args2) {
          return baseDelay(func, toNumber(wait) || 0, args2);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args2 = arguments, key = resolver ? resolver.apply(this, args2) : args2[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args2);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          };
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        memoize.Cache = MapCache;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return function() {
            var args2 = arguments;
            switch (args2.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args2[0]);
              case 2:
                return !predicate.call(this, args2[0], args2[1]);
              case 3:
                return !predicate.call(this, args2[0], args2[1], args2[2]);
            }
            return !predicate.apply(this, args2);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function(args2) {
            var index = -1, length = nativeMin(args2.length, funcsLength);
            while (++index < length) {
              args2[index] = transforms[index].call(this, args2[index]);
            }
            return apply(func, this, args2);
          });
        });
        var partial = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
        });
        var partialRight = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
        });
        function rest(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start === undefined2 ? start : toInteger(start);
          return baseRest(func, start);
        }
        function spread(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start == null ? 0 : nativeMax(toInteger(start), 0);
          return baseRest(function(args2) {
            var array = args2[start], otherArgs = castSlice(args2, 0, start);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply(func, this, otherArgs);
          });
        }
        function throttle(func, wait, options2) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          if (isObject(options2)) {
            leading = "leading" in options2 ? !!options2.leading : leading;
            trailing = "trailing" in options2 ? !!options2.trailing : trailing;
          }
          return debounce(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray(value) ? value : [value];
        }
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys4(source));
        }
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments = baseIsArguments(/* @__PURE__ */ function() {
          return arguments;
        }()) ? baseIsArguments : function(value) {
          return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        var isArray = Array2.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike(value);
        }
        function isBoolean(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          var result2 = customizer ? customizer(value, other) : undefined2;
          return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
        }
        function isError(value) {
          if (!isObjectLike(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
        }
        function isFinite2(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction(value) {
          if (!isObject(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        function isObjectLike(value) {
          return value != null && typeof value == "object";
        }
        var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        function isNaN2(value) {
          return isNumber(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil(value) {
          return value == null;
        }
        function isNumber(value) {
          return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        function isPlainObject(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
        }
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString(value) {
          return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        function isSymbol(value) {
          return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined(value) {
          return value === undefined2;
        }
        function isWeakMap(value) {
          return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        function isWeakSet(value) {
          return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike(value)) {
            return isString(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY || value === -INFINITY) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim(value);
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
        }
        function toString2(value) {
          return value == null ? "" : baseToString(value);
        }
        var assign = createAssigner(function(object, source) {
          if (isPrototype(source) || isArrayLike(source)) {
            copyObject(source, keys4(source), object);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
              assignValue(object, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner(function(object, source) {
          copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keys4(source), object, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate(prototype);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        var defaults = baseRest(function(object, sources) {
          object = Object2(object);
          var index = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined2;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index < length) {
            var source = sources[index];
            var props = keysIn(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key = props[propsIndex];
              var value = object[key];
              if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                object[key] = source[key];
              }
            }
          }
          return object;
        });
        var defaultsDeep = baseRest(function(args2) {
          args2.push(undefined2, customDefaultsMerge);
          return apply(mergeWith, undefined2, args2);
        });
        function findKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object, iteratee2) {
          return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forInRight(object, iteratee2) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forOwn(object, iteratee2) {
          return object && baseForOwn(object, getIteratee(iteratee2, 3));
        }
        function forOwnRight(object, iteratee2) {
          return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
        }
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys4(object));
        }
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        function get(object, path, defaultValue) {
          var result2 = object == null ? undefined2 : baseGet(object, path);
          return result2 === undefined2 ? defaultValue : result2;
        }
        function has(object, path) {
          return object != null && hasPath(object, path, baseHas);
        }
        function hasIn(object, path) {
          return object != null && hasPath(object, path, baseHasIn);
        }
        var invert = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          result2[value] = key;
        }, constant(identity2));
        var invertBy = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          if (hasOwnProperty.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys4(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function keysIn(object) {
          return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        function mapKeys(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, iteratee2(value, key, object2), value);
          });
          return result2;
        }
        function mapValues(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, key, iteratee2(value, key, object2));
          });
          return result2;
        }
        var merge = createAssigner(function(object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
          baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest(function(object, paths) {
          var result2 = {};
          if (object == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap(paths, function(path) {
            path = castPath(path, object);
            isDeep || (isDeep = path.length > 1);
            return path;
          });
          copyObject(object, getAllKeysIn(object), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        var pick = flatRest(function(object, paths) {
          return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props = arrayMap(getAllKeysIn(object), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object, props, function(value, path) {
            return predicate(value, path[0]);
          });
        }
        function result(object, path, defaultValue) {
          path = castPath(path, object);
          var index = -1, length = path.length;
          if (!length) {
            length = 1;
            object = undefined2;
          }
          while (++index < length) {
            var value = object == null ? undefined2 : object[toKey(path[index])];
            if (value === undefined2) {
              index = length;
              value = defaultValue;
            }
            object = isFunction(value) ? value.call(object) : value;
          }
          return object;
        }
        function set(object, path, value) {
          return object == null ? object : baseSet(object, path, value);
        }
        function setWith(object, path, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseSet(object, path, value, customizer);
        }
        var toPairs = createToPairs(keys4);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee2, accumulator) {
          var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject(object)) {
              accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
            return iteratee2(accumulator, value, index, object2);
          });
          return accumulator;
        }
        function unset(object, path) {
          return object == null ? true : baseUnset(object, path);
        }
        function update(object, path, updater) {
          return object == null ? object : baseUpdate(object, path, castFunction(updater));
        }
        function updateWith(object, path, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
        }
        function values(object) {
          return object == null ? [] : baseValues(object, keys4(object));
        }
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn(object));
        }
        function clamp(number, lower, upper) {
          if (upper === undefined2) {
            upper = lower;
            lower = undefined2;
          }
          if (upper !== undefined2) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined2) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined2) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start, end);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined2;
          }
          if (floating === undefined2) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined2;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined2;
            }
          }
          if (lower === undefined2 && upper === undefined2) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined2) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase = createCompounder(function(result2, word, index) {
          word = word.toLowerCase();
          return result2 + (index ? capitalize(word) : word);
        });
        function capitalize(string) {
          return upperFirst(toString2(string).toLowerCase());
        }
        function deburr(string) {
          string = toString2(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        function endsWith(string, target, position) {
          string = toString2(string);
          target = baseToString(target);
          var length = string.length;
          position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        function escape(string) {
          string = toString2(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = toString2(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
        }
        var kebabCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad3(string, length, chars) {
          string = toString2(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string, length, chars) {
          string = toString2(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        function padStart(string, length, chars) {
          string = toString2(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString2(string).replace(reTrimStart, ""), radix || 0);
        }
        function repeat(string, n, guard) {
          if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString2(string), n);
        }
        function replace() {
          var args2 = arguments, string = toString2(args2[0]);
          return args2.length < 3 ? string : string.replace(args2[1], args2[2]);
        }
        var snakeCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined2;
          }
          limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString2(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
            separator = baseToString(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        var startCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString2(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString(target);
          return string.slice(position, position + target.length) == target;
        }
        function template(string, options2, guard) {
          var settings = lodash.templateSettings;
          if (guard && isIterateeCall(string, options2, guard)) {
            options2 = undefined2;
          }
          string = toString2(string);
          options2 = assignInWith({}, options2, settings, customDefaultsAssignIn);
          var imports = assignInWith({}, options2.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys4(imports), importsValues = baseValues(imports, importsKeys);
          var isEscaping, isEvaluating, index = 0, interpolate = options2.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2(
            (options2.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options2.evaluate || reNoMatch).source + "|$",
            "g"
          );
          var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options2, "sourceURL") ? (options2.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = hasOwnProperty.call(options2, "variable") && options2.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
          });
          result2.source = source;
          if (isError(result2)) {
            throw result2;
          }
          return result2;
        }
        function toLower(value) {
          return toString2(value).toLowerCase();
        }
        function toUpper(value) {
          return toString2(value).toUpperCase();
        }
        function trim(string, chars, guard) {
          string = toString2(string);
          if (string && (guard || chars === undefined2)) {
            return baseTrim(string);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start, end).join("");
        }
        function trimEnd(string, chars, guard) {
          string = toString2(string);
          if (string && (guard || chars === undefined2)) {
            return string.slice(0, trimmedEndIndex(string) + 1);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join("");
        }
        function trimStart(string, chars, guard) {
          string = toString2(string);
          if (string && (guard || chars === undefined2)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start).join("");
        }
        function truncate(string, options2) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject(options2)) {
            var separator = "separator" in options2 ? options2.separator : separator;
            length = "length" in options2 ? toInteger(options2.length) : length;
            omission = "omission" in options2 ? baseToString(options2.omission) : omission;
          }
          string = toString2(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined2) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString2(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match = separator.exec(substring)) {
                var newEnd = match.index;
              }
              result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
            }
          } else if (string.indexOf(baseToString(separator), end) != end) {
            var index = result2.lastIndexOf(separator);
            if (index > -1) {
              result2 = result2.slice(0, index);
            }
          }
          return result2 + omission;
        }
        function unescape(string) {
          string = toString2(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        var upperCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
          string = toString2(string);
          pattern = guard ? undefined2 : pattern;
          if (pattern === undefined2) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        var attempt = baseRest(function(func, args2) {
          try {
            return apply(func, undefined2, args2);
          } catch (e) {
            return isError(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object, methodNames) {
          arrayEach(methodNames, function(key) {
            key = toKey(key);
            baseAssignValue(object, key, bind(object[key], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function(args2) {
            var index = -1;
            while (++index < length) {
              var pair = pairs[index];
              if (apply(pair[0], this, args2)) {
                return apply(pair[1], this, args2);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant(value) {
          return function() {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity2(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method = baseRest(function(path, args2) {
          return function(object) {
            return baseInvoke(object, path, args2);
          };
        });
        var methodOf = baseRest(function(object, args2) {
          return function(path) {
            return baseInvoke(object, path, args2);
          };
        });
        function mixin3(object, source, options2) {
          var props = keys4(source), methodNames = baseFunctions(source, props);
          if (options2 == null && !(isObject(source) && (methodNames.length || !props.length))) {
            options2 = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys4(source));
          }
          var chain2 = !(isObject(options2) && "chain" in options2) || !!options2.chain, isFunc = isFunction(object);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
              };
            }
          });
          return object;
        }
        function noConflict() {
          if (root2._ === this) {
            root2._ = oldDash;
          }
          return this;
        }
        function noop() {
        }
        function nthArg(n) {
          n = toInteger(n);
          return baseRest(function(args2) {
            return baseNth(args2, n);
          });
        }
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path) {
          return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
        }
        function propertyOf(object) {
          return function(path) {
            return object == null ? undefined2 : baseGet(object, path);
          };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        function stubFalse() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return "";
        }
        function stubTrue() {
          return true;
        }
        function times(n, iteratee2) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER) {
            return [];
          }
          var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes(length, iteratee2);
          while (++index < n) {
            iteratee2(index);
          }
          return result2;
        }
        function toPath(value) {
          if (isArray(value)) {
            return arrayMap(value, toKey);
          }
          return isSymbol(value) ? [value] : copyArray(stringToPath(toString2(value)));
        }
        function uniqueId(prefix) {
          var id = ++idCounter;
          return toString2(prefix) + id;
        }
        var add = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
          return array && array.length ? baseExtremum(array, identity2, baseGt) : undefined2;
        }
        function maxBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
        }
        function mean(array) {
          return baseMean(array, identity2);
        }
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        function min(array) {
          return array && array.length ? baseExtremum(array, identity2, baseLt) : undefined2;
        }
        function minBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
        }
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity2) : 0;
        }
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.assignIn = assignIn;
        lodash.assignInWith = assignInWith;
        lodash.assignWith = assignWith;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.castArray = castArray;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.concat = concat;
        lodash.cond = cond;
        lodash.conforms = conforms;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.differenceBy = differenceBy;
        lodash.differenceWith = differenceWith;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatMap = flatMap;
        lodash.flatMapDeep = flatMapDeep;
        lodash.flatMapDepth = flatMapDepth;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flattenDepth = flattenDepth;
        lodash.flip = flip;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.fromPairs = fromPairs;
        lodash.functions = functions;
        lodash.functionsIn = functionsIn;
        lodash.groupBy = groupBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.intersectionBy = intersectionBy;
        lodash.intersectionWith = intersectionWith;
        lodash.invert = invert;
        lodash.invertBy = invertBy;
        lodash.invokeMap = invokeMap;
        lodash.iteratee = iteratee;
        lodash.keyBy = keyBy;
        lodash.keys = keys4;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.mergeWith = mergeWith;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin3;
        lodash.negate = negate;
        lodash.nthArg = nthArg;
        lodash.omit = omit;
        lodash.omitBy = omitBy;
        lodash.once = once;
        lodash.orderBy = orderBy;
        lodash.over = over;
        lodash.overArgs = overArgs;
        lodash.overEvery = overEvery;
        lodash.overSome = overSome;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pickBy = pickBy;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAll = pullAll;
        lodash.pullAllBy = pullAllBy;
        lodash.pullAllWith = pullAllWith;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rangeRight = rangeRight;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.reverse = reverse;
        lodash.sampleSize = sampleSize;
        lodash.set = set;
        lodash.setWith = setWith;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortedUniq = sortedUniq;
        lodash.sortedUniqBy = sortedUniqBy;
        lodash.split = split;
        lodash.spread = spread;
        lodash.tail = tail;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.thru = thru;
        lodash.toArray = toArray;
        lodash.toPairs = toPairs;
        lodash.toPairsIn = toPairsIn;
        lodash.toPath = toPath;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.unary = unary;
        lodash.union = union;
        lodash.unionBy = unionBy;
        lodash.unionWith = unionWith;
        lodash.uniq = uniq;
        lodash.uniqBy = uniqBy;
        lodash.uniqWith = uniqWith;
        lodash.unset = unset;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.update = update;
        lodash.updateWith = updateWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.without = without;
        lodash.words = words;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.xorBy = xorBy;
        lodash.xorWith = xorWith;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipObjectDeep = zipObjectDeep;
        lodash.zipWith = zipWith;
        lodash.entries = toPairs;
        lodash.entriesIn = toPairsIn;
        lodash.extend = assignIn;
        lodash.extendWith = assignInWith;
        mixin3(lodash, lodash);
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.ceil = ceil;
        lodash.clamp = clamp;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.cloneDeepWith = cloneDeepWith;
        lodash.cloneWith = cloneWith;
        lodash.conformsTo = conformsTo;
        lodash.deburr = deburr;
        lodash.defaultTo = defaultTo;
        lodash.divide = divide;
        lodash.endsWith = endsWith;
        lodash.eq = eq;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.floor = floor;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.get = get;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has;
        lodash.hasIn = hasIn;
        lodash.head = head;
        lodash.identity = identity2;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.invoke = invoke;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isArrayBuffer = isArrayBuffer;
        lodash.isArrayLike = isArrayLike;
        lodash.isArrayLikeObject = isArrayLikeObject;
        lodash.isBoolean = isBoolean;
        lodash.isBuffer = isBuffer;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isEqualWith = isEqualWith;
        lodash.isError = isError;
        lodash.isFinite = isFinite2;
        lodash.isFunction = isFunction;
        lodash.isInteger = isInteger;
        lodash.isLength = isLength;
        lodash.isMap = isMap;
        lodash.isMatch = isMatch;
        lodash.isMatchWith = isMatchWith;
        lodash.isNaN = isNaN2;
        lodash.isNative = isNative;
        lodash.isNil = isNil;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isObjectLike = isObjectLike;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isSafeInteger = isSafeInteger;
        lodash.isSet = isSet;
        lodash.isString = isString;
        lodash.isSymbol = isSymbol;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.isWeakMap = isWeakMap;
        lodash.isWeakSet = isWeakSet;
        lodash.join = join;
        lodash.kebabCase = kebabCase;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lowerCase = lowerCase;
        lodash.lowerFirst = lowerFirst;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.maxBy = maxBy;
        lodash.mean = mean;
        lodash.meanBy = meanBy;
        lodash.min = min;
        lodash.minBy = minBy;
        lodash.stubArray = stubArray;
        lodash.stubFalse = stubFalse;
        lodash.stubObject = stubObject;
        lodash.stubString = stubString;
        lodash.stubTrue = stubTrue;
        lodash.multiply = multiply;
        lodash.nth = nth;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad3;
        lodash.padEnd = padEnd;
        lodash.padStart = padStart;
        lodash.parseInt = parseInt2;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.replace = replace;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext2;
        lodash.sample = sample;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedIndexBy = sortedIndexBy;
        lodash.sortedIndexOf = sortedIndexOf;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.sortedLastIndexBy = sortedLastIndexBy;
        lodash.sortedLastIndexOf = sortedLastIndexOf;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.subtract = subtract;
        lodash.sum = sum;
        lodash.sumBy = sumBy;
        lodash.template = template;
        lodash.times = times;
        lodash.toFinite = toFinite;
        lodash.toInteger = toInteger;
        lodash.toLength = toLength;
        lodash.toLower = toLower;
        lodash.toNumber = toNumber;
        lodash.toSafeInteger = toSafeInteger;
        lodash.toString = toString2;
        lodash.toUpper = toUpper;
        lodash.trim = trim;
        lodash.trimEnd = trimEnd;
        lodash.trimStart = trimStart;
        lodash.truncate = truncate;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.upperCase = upperCase;
        lodash.upperFirst = upperFirst;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.first = head;
        mixin3(lodash, function() {
          var source = {};
          baseForOwn(lodash, function(func, methodName) {
            if (!hasOwnProperty.call(lodash.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        }(), { "chain": false });
        lodash.VERSION = VERSION4;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash[methodName].placeholder = lodash;
        });
        arrayEach(["drop", "take"], function(methodName, index) {
          LazyWrapper.prototype[methodName] = function(n) {
            n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
            var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
          var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index) {
          var takeName = "take" + (index ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index) {
          var dropName = "drop" + (index ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity2);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function(path, args2) {
          if (typeof path == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path, args2);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end !== undefined2) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash.prototype[methodName] = function() {
            var value = this.__wrapped__, args2 = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args2[0], useLazy = isLazy || isArray(value);
            var interceptor = function(value2) {
              var result3 = lodashFunc.apply(lodash, arrayPush([value2], args2));
              return isTaker && chainAll ? result3[0] : result3;
            };
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args2);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined2 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args2);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash.prototype[methodName] = function() {
            var args2 = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray(value) ? value : [], args2);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray(value2) ? value2 : [], args2);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined2
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.at = wrapperAt;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.next = wrapperNext;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.first = lodash.prototype.head;
        if (symIterator) {
          lodash.prototype[symIterator] = wrapperToIterator;
        }
        return lodash;
      };
      var _5 = runInContext();
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root2._ = _5;
        define(function() {
          return _5;
        });
      } else if (freeModule) {
        (freeModule.exports = _5)._ = _5;
        freeExports._ = _5;
      } else {
        root2._ = _5;
      }
    }).call(exports2);
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
  is: () => is,
  iudexFastify: () => fastify_exports,
  iudexPino: () => pino_exports,
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

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_isPlaceholder.js
function _isPlaceholder(a) {
  return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
}

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_curry1.js
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_curry2.js
function _curry2(fn) {
  return function f2(a, b) {
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
  };
}

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_isArray.js
var isArray_default = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
};

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_has.js
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_isArguments.js
var toString = Object.prototype.toString;
var _isArguments = /* @__PURE__ */ function() {
  return toString.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
    return toString.call(x) === "[object Arguments]";
  } : function _isArguments2(x) {
    return _has("callee", x);
  };
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
var contains = function contains2(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};
var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /* @__PURE__ */ _curry1(function keys3(obj) {
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
});
var keys_default = keys;

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_toISOString.js
var pad = function pad2(n) {
  return (n < 10 ? "0" : "") + n;
};
var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
  return d.toISOString();
} : function _toISOString3(d) {
  return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};

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

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/internal/_isInteger.js
var isInteger_default = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};

// ../../node_modules/.pnpm/ramda@0.29.0/node_modules/ramda/es/mapObjIndexed.js
var mapObjIndexed = /* @__PURE__ */ _curry2(function mapObjIndexed2(fn, obj) {
  return _arrayReduce(function(acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys_default(obj));
});
var mapObjIndexed_default = mapObjIndexed;

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
function throwOnApiError(json) {
  if (json?.message === "Service Unavailable") {
    throw Error(json.message);
  }
  return json;
}
function unwrapApi(json) {
  if (json?.body && typeof json.body === "string" && json.body.startsWith("{") && json.body.endsWith("}")) {
    return JSON.parse(json.body);
  }
  return json;
}
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
function createFunctionClient(baseUrl, apiKey) {
  const fns = {
    returnFunctionCall,
    nextMessage,
    startWorkflow,
    putFunctionJsons
  };
  return mapObjIndexed_default((fn) => fn(baseUrl, apiKey), fns);
}
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
function nextMessage(baseUrl, apiKey) {
  return function(workflowId) {
    return fetch(baseUrl + "/workflows/" + workflowId + "/next_message", {
      method: "GET",
      headers: { "x-api-key": `${apiKey}` }
    }).then(parseIudexResponse);
  };
}
function startWorkflow(baseUrl, apiKey) {
  return function(query, modules) {
    return fetch(baseUrl + "/workflows", {
      method: "POST",
      headers: { "x-api-key": `${apiKey}` },
      body: JSON.stringify({ query, modules })
    }).then(parseIudexResponse);
  };
}
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

// src/clients/workflow-client.ts
function createWorkflowClient(baseUrl, apiKey) {
  const fns = {
    fetchGetWorkflows,
    fetchGetWorkflowById,
    fetchPostWorkflows
  };
  return mapObjIndexed_default((fn) => fn(baseUrl, apiKey), fns);
}
async function checkResponseStatus(res) {
  const body = await res.json();
  if (!res.ok) {
    const error = body.error || res.statusText || body.message;
    throw new Error(`Request failed with: ${error}`);
  }
  return body;
}
function fetchGetWorkflows(baseUrl, apiKey) {
  return function() {
    return fetch(`${baseUrl}/workflows`, {
      method: "GET",
      headers: { "x-api-key": apiKey }
    }).then(checkResponseStatus);
  };
}
function fetchGetWorkflowById(baseUrl, apiKey) {
  return function(req) {
    return fetch(`${baseUrl}/workflows/${req.workflowId}`, {
      method: "GET",
      headers: { "x-api-key": apiKey }
    }).then(checkResponseStatus);
  };
}
function fetchPostWorkflows(baseUrl, apiKey) {
  return function(req) {
    return fetch(`${baseUrl}/workflows`, {
      method: "POST",
      body: JSON.stringify(req),
      headers: { "x-api-key": apiKey }
    }).then(checkResponseStatus);
  };
}

// src/clients/workflow-schemas.ts
var import_zod3 = __toESM(require("zod"), 1);

// src/types/task-types.ts
var import_zod = __toESM(require("zod"), 1);
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
var import_zod2 = __toESM(require("zod"), 1);
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
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var OTLPProtoExporterNodeBase = (
  /** @class */
  function(_super) {
    __extends4(OTLPProtoExporterNodeBase2, _super);
    function OTLPProtoExporterNodeBase2(config3) {
      if (config3 === void 0) {
        config3 = {};
      }
      return _super.call(this, config3) || this;
    }
    OTLPProtoExporterNodeBase2.prototype._sendPromise = function(objects, onSuccess, onError) {
      var _this = this;
      var promise = new Promise(function(resolve, reject) {
        _this._send(_this, objects, _this.compression, resolve, reject);
      }).then(onSuccess, onError);
      this._sendingPromises.push(promise);
      var popPromise = function() {
        var index = _this._sendingPromises.indexOf(promise);
        _this._sendingPromises.splice(index, 1);
      };
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
function toLongBits(value) {
  var low = Number(BigInt.asUintN(32, value));
  var high = Number(BigInt.asUintN(32, value >> BigInt(32)));
  return { low, high };
}
function encodeAsLongBits(hrTime) {
  var nanos = hrTimeToNanos(hrTime);
  return toLongBits(nanos);
}
function encodeAsString(hrTime) {
  var nanos = hrTimeToNanos(hrTime);
  return nanos.toString();
}
var encodeTimestamp = typeof BigInt !== "undefined" ? encodeAsString : hrTimeToNanoseconds;
function identity(value) {
  return value;
}
function optionalHexToBinary(str) {
  if (str === void 0)
    return void 0;
  return hexToBinary(str);
}
var DEFAULT_ENCODER = {
  encodeHrTime: encodeAsLongBits,
  encodeSpanContext: hexToBinary,
  encodeOptionalSpanContext: optionalHexToBinary
};
function getOtlpEncoder(options2) {
  var _a2, _b;
  if (options2 === void 0) {
    return DEFAULT_ENCODER;
  }
  var useLongBits = (_a2 = options2.useLongBits) !== null && _a2 !== void 0 ? _a2 : true;
  var useHex = (_b = options2.useHex) !== null && _b !== void 0 ? _b : false;
  return {
    encodeHrTime: useLongBits ? encodeAsLongBits : encodeTimestamp,
    encodeSpanContext: useHex ? identity : hexToBinary,
    encodeOptionalSpanContext: useHex ? identity : optionalHexToBinary
  };
}

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
function toAttributes(attributes) {
  return Object.keys(attributes).map(function(key) {
    return toKeyValue(key, attributes[key]);
  });
}
function toKeyValue(key, value) {
  return {
    key,
    value: toAnyValue(value)
  };
}
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

// ../../node_modules/.pnpm/@opentelemetry+otlp-transformer@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-transformer/build/esm/resource/internal.js
function createResource(resource) {
  return {
    attributes: toAttributes(resource.attributes),
    droppedAttributesCount: 0
  };
}

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
function createExportLogsServiceRequest(logRecords, options2) {
  var encoder = getOtlpEncoder(options2);
  return {
    resourceLogs: logRecordsToResourceLogs(logRecords, encoder)
  };
}
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
function toSeverityNumber(severityNumber) {
  return severityNumber;
}
function toLogAttributes(attributes) {
  return Object.keys(attributes).map(function(key) {
    return toKeyValue(key, attributes[key]);
  });
}

// ../../node_modules/.pnpm/@opentelemetry+exporter-logs-otlp-proto@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/exporter-logs-otlp-proto/build/esm/version.js
var VERSION3 = "0.51.1";

// ../../node_modules/.pnpm/@opentelemetry+exporter-logs-otlp-proto@0.51.1_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/exporter-logs-otlp-proto/build/esm/platform/node/OTLPLogExporter.js
var __extends5 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
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
    function OTLPLogExporter2(config3) {
      if (config3 === void 0) {
        config3 = {};
      }
      var _this = _super.call(this, config3) || this;
      _this.headers = __assign2(__assign2(__assign2(__assign2({}, _this.headers), USER_AGENT), utils_exports.parseKeyPairsIntoRecord(getEnv().OTEL_EXPORTER_OTLP_LOGS_HEADERS)), parseHeaders(config3 === null || config3 === void 0 ? void 0 : config3.headers));
      return _this;
    }
    OTLPLogExporter2.prototype.convert = function(logs3) {
      return createExportLogsServiceRequest(logs3);
    };
    OTLPLogExporter2.prototype.getDefaultUrl = function(config3) {
      return typeof config3.url === "string" ? config3.url : getEnv().OTEL_EXPORTER_OTLP_LOGS_ENDPOINT.length > 0 ? appendRootPathToUrlIfNeeded(getEnv().OTEL_EXPORTER_OTLP_LOGS_ENDPOINT) : getEnv().OTEL_EXPORTER_OTLP_ENDPOINT.length > 0 ? appendResourcePathToUrl(getEnv().OTEL_EXPORTER_OTLP_ENDPOINT, DEFAULT_COLLECTOR_RESOURCE_PATH) : DEFAULT_COLLECTOR_URL;
    };
    OTLPLogExporter2.prototype.getServiceClientType = function() {
      return ServiceClientType.LOGS;
    };
    return OTLPLogExporter2;
  }(OTLPProtoExporterNodeBase)
);

// src/instrumentation/index.ts
var import_exporter_trace_otlp_proto = require("@opentelemetry/exporter-trace-otlp-proto");
var import_lodash4 = __toESM(require_lodash(), 1);

// src/instrumentation/utils.ts
var import_semantic_conventions2 = require("@opentelemetry/semantic-conventions");
var import_api_logs = require("@opentelemetry/api-logs");
var import_lodash = __toESM(require_lodash(), 1);
var is = { instrumented: false };
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
function emitOtelLog({
  level,
  body,
  severityNumber,
  attributes,
  stackDepth
}) {
  if (!is.instrumented)
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

// src/instrumentation/index.ts
var import_api19 = require("@opentelemetry/api");

// src/instrumentation/pino.ts
var pino_exports = {};
__export(pino_exports, {
  args: () => args,
  config: () => config,
  destination: () => destination,
  iudexPino: () => iudexPino,
  mixin: () => mixin,
  options: () => options,
  write: () => write
});
var import_semantic_conventions3 = require("@opentelemetry/semantic-conventions");
var import_lodash2 = __toESM(require_lodash(), 1);
function write(str) {
  if (!is.instrumented)
    return;
  try {
    const { level, msg, time, ...rest } = JSON.parse(str);
    const severityText = convertSeverityValuesToLevel(level);
    emitOtelLog({ level: severityText, severityNumber: level, body: msg, attributes: rest });
  } catch {
    emitOtelLog({ level: "INFO", body: str });
  }
}
var config = {
  mixinStackDepth: 4
};
function mixin() {
  const { filePath, lineNum, caller } = getCallerInfo(config.mixinStackDepth);
  return import_lodash2.default.omitBy({
    [import_semantic_conventions3.SEMATTRS_CODE_FILEPATH]: filePath,
    [import_semantic_conventions3.SEMATTRS_CODE_LINENO]: lineNum,
    [import_semantic_conventions3.SEMATTRS_CODE_FUNCTION]: caller
  }, import_lodash2.default.isNil);
}
var destination = { write };
var options = { mixin };
var args = [options, destination];
var iudexPino = {
  write,
  config,
  mixin,
  destination,
  options,
  args
};

// src/instrumentation/fastify.ts
var fastify_exports = {};
__export(fastify_exports, {
  config: () => config2,
  iudexFastify: () => iudexFastify,
  logger: () => logger,
  mixin: () => mixin2,
  stream: () => stream
});
var import_semantic_conventions4 = require("@opentelemetry/semantic-conventions");
var import_lodash3 = __toESM(require_lodash(), 1);
var stream = iudexPino.destination;
var config2 = {
  mixinStackDepth: 5
};
function mixin2() {
  const { filePath, lineNum, caller } = getCallerInfo(config2.mixinStackDepth);
  return import_lodash3.default.omitBy({
    [import_semantic_conventions4.SEMATTRS_CODE_FILEPATH]: filePath,
    [import_semantic_conventions4.SEMATTRS_CODE_LINENO]: lineNum,
    [import_semantic_conventions4.SEMATTRS_CODE_FUNCTION]: caller
  }, import_lodash3.default.isNil);
}
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
  headers: configHeaders = {}
} = {}) {
  if (is.instrumented)
    return;
  if (!iudexApiKey) {
    throw Error(
      `The IUDEX_API_KEY environment variable is missing or empty. Provide IUDEX_API_KEY to the environment on load OR instrument with the iudexApiKey option. Example: \`instrument{ iudexApiKey: 'My_API_Key' })\``
    );
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
      (0, import_auto_instrumentations_node.getNodeAutoInstrumentations)({
        "@opentelemetry/instrumentation-fs": { enabled: false }
      })
    ],
    autoDetectResources: true
  });
  sdk.start();
  is.instrumented = true;
  function updateResource(newResource) {
    const mergedResource = resource.merge(new import_resources.Resource(newResource));
    const loggerProvider2 = new import_sdk_logs.LoggerProvider({ resource: mergedResource });
    loggerProvider2.addLogRecordProcessor(logRecordProcessor);
    import_api_logs2.logs.setGlobalLoggerProvider(loggerProvider2);
    const tracerProvider = new import_sdk_trace_node.NodeTracerProvider({ resource: mergedResource });
    tracerProvider.register();
    tracerProvider.addSpanProcessor(spanProcessors[0]);
    import_api19.trace.setGlobalTracerProvider(tracerProvider);
  }
  return { updateResource };
}
function withTracing(fn, ctx) {
  if (!is.instrumented) {
    return fn;
  }
  const tracer = import_api19.trace.getTracer("default");
  return function(...args2) {
    return tracer.startActiveSpan(String(ctx?.name) || fn.name || "<anonymous>", (span) => {
      try {
        const ret = fn(...args2);
        span.setStatus({ code: import_api19.SpanStatusCode.OK });
        return ret;
      } catch (err) {
        span.setStatus({
          code: import_api19.SpanStatusCode.ERROR,
          message: err?.message
        });
        throw err;
      } finally {
        span.end();
      }
    });
  };
}

// src/index.ts
var DEFAULT_BASE_URL = "https://api.iudex.ai";
function createClient(baseUrl, apiKey) {
  return {
    ...createFunctionClient(baseUrl, apiKey),
    ...createWorkflowClient(baseUrl, apiKey)
  };
}
var Iudex = class {
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
function extractMessageTextContent(content) {
  if (typeof content === "string") {
    return content;
  }
  return content.map((c) => c.type === "text" ? c.text : "").join("");
}
function getLastTaskByStatus(root2, status) {
  const arrayStatus = !Array.isArray(status) ? [status] : status;
  const traverse = reversePreOrderTraversal(
    (t) => t.subtasks || [],
    (t) => arrayStatus.includes(t.status)
  );
  return traverse(root2);
}
function getFirstTaskByStatus(root2, status) {
  const arrayStatus = !Array.isArray(status) ? [status] : status;
  const traverse = preOrderTraversal(
    (t) => t.subtasks || [],
    (t) => arrayStatus.includes(t.status)
  );
  return traverse(root2);
}
function reversePreOrderTraversal(getChildren, predicate) {
  return function traverse(node) {
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
  };
}
function preOrderTraversal(getChildren, predicate) {
  return function traverse(node) {
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
  };
}
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
  is,
  iudexFastify,
  iudexPino,
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
  withTracing,
  workflowInfoSchema,
  workflowMetadataSchema,
  workflowSchema,
  ...require("function-json-schema")
});
/*! Bundled license information:

lodash/lodash.js:
  (**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
//# sourceMappingURL=index.cjs.map