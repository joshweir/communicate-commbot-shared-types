"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDlqDynamoMessage = (thing) => thing &&
    thing.envAndDlqName &&
    typeof thing.envAndDlqName === 'string' &&
    thing.envAndDlqName.split('|').length === 2 &&
    thing.sentTimestamp &&
    typeof thing.sentTimestamp === 'number' &&
    thing.operationId &&
    typeof thing.operationId === 'string' &&
    thing.messageId &&
    typeof thing.messageId === 'string' &&
    (typeof thing.ignoreRuleIds === 'undefined' || thing.ignoreRuleIds instanceof Array) &&
    thing.payload;
//# sourceMappingURL=dlq-types.js.map