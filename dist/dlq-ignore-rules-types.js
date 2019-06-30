"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTDlqIgnoreRules = (thing) => thing instanceof Array && [...new Set(thing.map((t) => typeof t))] === ['string'];
exports.isTDlqIgnoreRuleRecord = (thing) => typeof thing === 'object' &&
    typeof thing.id === 'string' &&
    typeof thing.env === 'string' &&
    typeof thing.dlqName === 'string' &&
    typeof thing.description === 'string' &&
    exports.isTDlqIgnoreRules(thing.ignoreRules);
exports.isTDlqIgnoreRuleRawRecord = (thing) => typeof thing === 'object' &&
    typeof thing.id === 'string' &&
    typeof thing.env === 'string' &&
    typeof thing.dlqName === 'string' &&
    typeof thing.description === 'string' &&
    typeof thing.ignoreRules === 'string';
//# sourceMappingURL=dlq-ignore-rules-types.js.map