"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var index_1 = require("../src/instrumentation/index");
(0, index_1.instrument)({
    serviceName: 'test-fastify-instrumentation',
    githubUrl: 'https://github.com/iudexai/ghost-shell',
    publicWriteOnlyIudexApiKey: 'ixk_5d1d59f0fda17554b15ed2a2e407131306ce8f5260f7ae821e9f3684423a3afa',
    env: 'dev',
});
var fastify_1 = require("fastify");
function rollOnce(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function rollTheDice(rolls, min, max) {
    var result = [];
    for (var i = 0; i < rolls; i++) {
        result.push(rollOnce(min, max));
    }
    return result;
}
var fastify = (0, fastify_1.default)({
    logger: __assign(__assign({}, index_1.iudexFastify.logger), { level: 'info' }),
});
fastify.get('/', function (request, reply) {
    var outcomes = rollTheDice(2, 1, 6);
    request.log.info('request log outcomes', outcomes);
    console.log('console log outcomes', outcomes);
    void reply.send(outcomes);
});
fastify.listen({ port: 3000 }, function (err, address) {
    if (err)
        throw err;
    console.log("Server is now listening on ".concat(address));
});
