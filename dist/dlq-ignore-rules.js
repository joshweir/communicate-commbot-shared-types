"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DlqIgnoreRules = void 0;
const uuid_1 = require("uuid");
const joshs_object_matcher_1 = require("joshs-object-matcher");
var DlqIgnoreRules;
(function (DlqIgnoreRules) {
    DlqIgnoreRules.isStepMatcher = (thing) => {
        if (typeof thing !== 'object') {
            return false;
        }
        const { stepName, ...matcherProps } = thing;
        if (typeof stepName !== 'string' || !stepName || !stepName.length) {
            return false;
        }
        if (!joshs_object_matcher_1.isMatcher(matcherProps)) {
            return false;
        }
        return true;
    };
    DlqIgnoreRules.isModPlanMatcherExpression = (thing) => {
        if (typeof thing !== 'object')
            return false;
        if ((!thing.modInfo || !thing.modInfo.length) && (!thing.modSteps || !thing.modSteps.length)) {
            return false;
        }
        if ((!thing.modInfo || thing.modInfo.filter(joshs_object_matcher_1.isMatcher).length === thing.modInfo.length) &&
            (!thing.modSteps || thing.modSteps.filter(DlqIgnoreRules.isStepMatcher).length === thing.modSteps.length)) {
            return true;
        }
        return false;
    };
    DlqIgnoreRules.isModPlanMatcherExpressions = (thing) => {
        if (!(thing instanceof Array)) {
            return false;
        }
        if (thing.length > 0 && thing.filter(DlqIgnoreRules.isModPlanMatcherExpression).length === thing.length) {
            return true;
        }
        return false;
    };
    DlqIgnoreRules.isLogMatcher = (thing) => typeof thing === 'object' &&
        typeof thing.pattern === 'string' &&
        ['undefined', 'string'].indexOf(typeof thing.flags) !== -1;
    DlqIgnoreRules.isDlqIgnoreRuleRecord = (thing) => typeof thing === 'object' &&
        typeof thing.id === 'string' &&
        typeof thing.env === 'string' &&
        typeof thing.region === 'string' &&
        ['AUS', 'NOVA', 'ALL'].indexOf(thing.region) > -1 &&
        typeof thing.dlqName === 'string' &&
        typeof thing.description === 'string' &&
        (typeof thing.logsMustExistPatterns === 'undefined' || (typeof thing.logsMustExistPatterns === 'object' &&
            thing.logsMustExistPatterns.filter(DlqIgnoreRules.isLogMatcher).length === thing.logsMustExistPatterns.length)) &&
        thing.ignoreRules instanceof Array &&
        (DlqIgnoreRules.isModPlanMatcherExpressions(thing.ignoreRules) ||
            thing.ignoreRules.filter(joshs_object_matcher_1.isMatcher).length === thing.ignoreRules.length);
    DlqIgnoreRules.isDlqIgnoreRuleRawRecord = (thing) => typeof thing === 'object' &&
        typeof thing.id === 'string' &&
        typeof thing.env === 'string' &&
        typeof thing.region === 'string' &&
        ['AUS', 'NOVA', 'ALL'].indexOf(thing.region) > -1 &&
        typeof thing.dlqName === 'string' &&
        typeof thing.description === 'string' &&
        typeof thing.ignoreRules === 'string' &&
        ['undefined', 'string'].indexOf(typeof thing.logsMustExistPatterns) !== -1;
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
                if (DlqIgnoreRules.isDlqIgnoreRuleRawRecord(record)) {
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