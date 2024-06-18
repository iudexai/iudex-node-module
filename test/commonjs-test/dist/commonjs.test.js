"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const iudex_1 = require("iudex");
(0, iudex_1.instrument)({
    serviceName: 'test-express-instrumentation',
    githubUrl: 'https://github.com/iudexai/ghost-shell',
    baseUrl: 'https://pgrev2bga0.execute-api.us-west-2.amazonaws.com',
    // baseUrl: 'https://api.iudex.ai',
});
const express_1 = __importDefault(require("express"));
const pino_http_1 = __importDefault(require("pino-http"));
const pino_1 = __importDefault(require("pino"));
const logger = (0, pino_1.default)(...iudex_1.iudexPino.args);
/** dice.js **/
function rollOnce(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function rollTheDice(rolls, min, max) {
    const result = [];
    for (let i = 0; i < rolls; i++) {
        result.push(rollOnce(min, max));
    }
    return result;
}
/** app.ts **/
const PORT = parseInt(process.env.PORT || '8080');
const app = (0, express_1.default)();
app.use((0, pino_http_1.default)());
app.get('/', (req, res) => {
    const rolls = req.query.rolls ? parseInt(req.query.rolls.toString()) : 2;
    logger.info(`Rolling the dice ${rolls} times.`);
    const outcomes = rollTheDice(rolls, 1, 6);
    res.send(JSON.stringify(outcomes));
});
app.listen(PORT, () => {
    console.log(`Listening for requests on http://localhost:${PORT}`);
});
