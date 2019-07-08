"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dlq;
(function (Dlq) {
    Dlq.isDlqDynamoMessage = (thing) => thing &&
        thing.envAndDlqName &&
        typeof thing.envAndDlqName === 'string' &&
        thing.envAndDlqName.split('|').length === 2 &&
        typeof thing.sentTimestamp === 'number' &&
        typeof thing.region === 'string' &&
        ['aus', 'nova'].indexOf(thing.region) > -1 &&
        ['string', 'undefined'].indexOf(typeof thing.operationId) > -1 &&
        ['string', 'undefined'].indexOf(typeof thing.messageId) > -1 &&
        (typeof thing.ignoreRuleIds === 'undefined' || thing.ignoreRuleIds instanceof Array) &&
        thing.payload;
})(Dlq = exports.Dlq || (exports.Dlq = {}));
;
//# sourceMappingURL=dlq-types.js.map