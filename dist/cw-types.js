"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regions_and_envs_1 = require("./regions-and-envs");
var Cw;
(function (Cw) {
    Cw.isCWAlert = (thing) => thing &&
        typeof thing.requestId === "string" &&
        typeof thing.env === "string" &&
        typeof thing.region === "string" &&
        regions_and_envs_1.regions.indexOf(thing.region) > -1 &&
        typeof thing.alarmTimestamp === "number" &&
        typeof thing.functionName === "string" &&
        typeof thing.metricName === "string" &&
        typeof thing.reason === "string";
})(Cw = exports.Cw || (exports.Cw = {}));
//# sourceMappingURL=cw-types.js.map