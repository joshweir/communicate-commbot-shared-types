"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DlqIgnoreRules;
(function (DlqIgnoreRules) {
    DlqIgnoreRules.isTDlqIgnoreRules = (thing) => thing instanceof Array && [...new Set(thing.map((t) => typeof t))] === ['string'];
    DlqIgnoreRules.isTDlqIgnoreRuleRecord = (thing) => typeof thing === 'object' &&
        typeof thing.id === 'string' &&
        typeof thing.env === 'string' &&
        typeof thing.region === 'string' &&
        ['AUS', 'NOVA', 'ALL'].indexOf(thing.region) > -1 &&
        typeof thing.dlqName === 'string' &&
        typeof thing.description === 'string' &&
        DlqIgnoreRules.isTDlqIgnoreRules(thing.ignoreRules);
    DlqIgnoreRules.isTDlqIgnoreRuleRawRecord = (thing) => typeof thing === 'object' &&
        typeof thing.id === 'string' &&
        typeof thing.env === 'string' &&
        typeof thing.region === 'string' &&
        ['AUS', 'NOVA', 'ALL'].indexOf(thing.region) > -1 &&
        typeof thing.dlqName === 'string' &&
        typeof thing.description === 'string' &&
        typeof thing.ignoreRules === 'string';
})(DlqIgnoreRules = exports.DlqIgnoreRules || (exports.DlqIgnoreRules = {}));
;
//# sourceMappingURL=dlq-ignore-rules-types.js.map