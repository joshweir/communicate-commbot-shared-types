"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dlq = void 0;
const regions_and_envs_1 = require("./regions-and-envs");
var Dlq;
(function (Dlq) {
    Dlq.isSQSRecordAttributes = (thing) => typeof thing === 'object' &&
        typeof thing.ApproximateReceiveCount === 'string' &&
        typeof thing.SentTimestamp === 'string' &&
        typeof thing.SenderId === 'string' &&
        typeof thing.ApproximateFirstReceiveTimestamp === 'string';
    Dlq.isDlqMessage = (thing) => thing &&
        typeof thing.env === "string" &&
        typeof thing.dlqName === "string" &&
        typeof thing.messageId === "string" &&
        typeof thing.sentTimestamp === "number" &&
        typeof thing.region === "string" &&
        regions_and_envs_1.regions.indexOf(thing.region) > -1 &&
        ["string", "undefined"].indexOf(typeof thing.operationId) > -1 &&
        thing.payload &&
        (typeof thing.attributes === "undefined" || Dlq.isSQSRecordAttributes(thing.attributes));
})(Dlq = exports.Dlq || (exports.Dlq = {}));
//# sourceMappingURL=dlq-types.js.map