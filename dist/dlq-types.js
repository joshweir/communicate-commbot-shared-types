"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regions_and_envs_1 = require("./regions-and-envs");
var Dlq;
(function (Dlq) {
    Dlq.isDlqMessage = (thing) => thing &&
        typeof thing.env === 'string' &&
        typeof thing.dlqName === 'string' &&
        typeof thing.messageId === 'string' &&
        typeof thing.sentTimestamp === 'number' &&
        typeof thing.region === 'string' &&
        regions_and_envs_1.regions.indexOf(thing.region) > -1 &&
        ['string', 'undefined'].indexOf(typeof thing.operationId) > -1 &&
        thing.payload;
})(Dlq = exports.Dlq || (exports.Dlq = {}));
;
//# sourceMappingURL=dlq-types.js.map