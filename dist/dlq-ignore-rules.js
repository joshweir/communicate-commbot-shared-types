"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
var DlqIgnoreRules;
(function (DlqIgnoreRules) {
    DlqIgnoreRules.isTDlqIgnoreRules = (thing) => thing instanceof Array && [...new Set(thing.map((t) => typeof t))] === ['string'];
    DlqIgnoreRules.isTDlqIgnoreRuleRecord = (thing) => typeof thing === 'object' &&
        typeof thing.id === 'string' &&
        typeof thing.env === 'string' &&
        typeof thing.region === 'string' &&
        ['aus', 'nova', 'all'].indexOf(thing.region) > -1 &&
        typeof thing.dlqName === 'string' &&
        typeof thing.description === 'string' &&
        DlqIgnoreRules.isTDlqIgnoreRules(thing.ignoreRules);
    DlqIgnoreRules.isTDlqIgnoreRuleRawRecord = (thing) => typeof thing === 'object' &&
        typeof thing.id === 'string' &&
        typeof thing.env === 'string' &&
        typeof thing.region === 'string' &&
        ['aus', 'nova', 'all'].indexOf(thing.region) > -1 &&
        typeof thing.dlqName === 'string' &&
        typeof thing.description === 'string' &&
        typeof thing.ignoreRules === 'string';
    DlqIgnoreRules.parseDlqIgnoreRuleRawRecord = (input) => {
        try {
            const record = JSON.parse(input);
            if (record && (typeof record.id !== 'string' || !record.id.length)) {
                record.id = uuid_1.v4();
            }
            if (DlqIgnoreRules.isTDlqIgnoreRuleRawRecord(record)) {
                return record;
            }
        }
        catch (e) { }
        return;
    };
    DlqIgnoreRules.isTIgnoreRuleKey = (thing) => typeof thing === 'object' &&
        typeof thing.id === 'string' &&
        typeof thing.region === 'string' &&
        ['aus', 'nova', 'all'].indexOf(thing.region) > -1 &&
        typeof thing.dataEnv === 'string' &&
        ['com-datastaging', 'com-datalive', 'all'].indexOf(thing.dataEnv) > -1;
    DlqIgnoreRules.parseIgnoreRuleKey = (input) => {
        try {
            const record = JSON.parse(input);
            if (DlqIgnoreRules.isTIgnoreRuleKey(record)) {
                return record;
            }
        }
        catch (e) { }
        return;
    };
})(DlqIgnoreRules = exports.DlqIgnoreRules || (exports.DlqIgnoreRules = {}));
;
//# sourceMappingURL=dlq-ignore-rules.js.map