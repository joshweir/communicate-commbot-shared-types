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
        ['AUS', 'NOVA', 'ALL'].indexOf(thing.region) > -1 &&
        typeof thing.dlqName === 'string' &&
        typeof thing.description === 'string' &&
        typeof thing.ignoreRules === 'string';
    DlqIgnoreRules.parseMultiValueIgnoreRuleField = (input) => {
        let result = input;
        if (typeof result === 'string') {
            if (['ALL', ''].indexOf(result.toLocaleUpperCase()) === -1) {
                result = result.split(',').join(',');
            }
            result = result.toLocaleUpperCase();
        }
        return result;
    };
    DlqIgnoreRules.parseDlqIgnoreRuleRawRecord = (input) => {
        try {
            const record = JSON.parse(input);
            if (record) {
                if (typeof record.id !== 'string' || !record.id.length) {
                    record.id = uuid_1.v4();
                }
                record.env = DlqIgnoreRules.parseMultiValueIgnoreRuleField(record.env);
                record.region = DlqIgnoreRules.parseMultiValueIgnoreRuleField(record.region);
                record.dlqName = DlqIgnoreRules.parseMultiValueIgnoreRuleField(record.dlqName);
                if (DlqIgnoreRules.isTDlqIgnoreRuleRawRecord(record)) {
                    return record;
                }
            }
        }
        catch (e) { }
        return;
    };
    DlqIgnoreRules.isTIgnoreRuleKey = (thing) => typeof thing === 'object' &&
        typeof thing.id === 'string' &&
        typeof thing.region === 'string' &&
        ['AUS', 'NOVA', 'ALL'].indexOf(thing.region) > -1 &&
        typeof thing.env === 'string';
    DlqIgnoreRules.parseIgnoreRuleKey = (input) => {
        try {
            const record = JSON.parse(input);
            if (record) {
                record.env = DlqIgnoreRules.parseMultiValueIgnoreRuleField(record.env);
                record.region = DlqIgnoreRules.parseMultiValueIgnoreRuleField(record.region);
            }
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