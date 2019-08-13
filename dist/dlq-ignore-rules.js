"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const joshs_object_matcher_1 = require("joshs-object-matcher");
var DlqIgnoreRules;
(function (DlqIgnoreRules) {
    DlqIgnoreRules.isStepMatcher = (thing) => {
        if (typeof thing !== 'object') {
            throw new Error(`step matcher invalid, must be an object: ${JSON.stringify(thing)}`);
        }
        const { stepName } = thing, matcherProps = __rest(thing, ["stepName"]);
        if (typeof stepName !== 'string' || !stepName || !stepName.length) {
            throw new Error(`step matcher invalid, stepName prop is required: ${JSON.stringify(thing)}`);
        }
        if (!joshs_object_matcher_1.isMatcher(matcherProps)) {
            throw new Error(`step matcher invalid, matcher props invalid: ${JSON.stringify(thing)}`);
        }
        return true;
    };
    DlqIgnoreRules.isModPlanMatcherExpression = (thing) => {
        if (typeof thing !== 'object')
            return false;
        if ((!thing.modInfo || !thing.modInfo.length) && (!thing.modSteps || !thing.modSteps.length)) {
            throw new Error(`modplanMatcherExpression must contain modInfo item(s) and/or modStep item(s)`);
        }
        if ((!thing.modInfo || thing.modInfo.filter(joshs_object_matcher_1.isMatcher).length === thing.modInfo.length) &&
            (!thing.modSteps || thing.modSteps.filter(DlqIgnoreRules.isStepMatcher).length === thing.modSteps.length)) {
            return true;
        }
        return false;
    };
    DlqIgnoreRules.isModPlanMatcherExpressions = (thing) => {
        if (!(thing instanceof Array)) {
            throw new Error(`mod plan matcher expression must be an array`);
        }
        if (thing.length > 0 && thing.filter(DlqIgnoreRules.isModPlanMatcherExpression).length === thing.length) {
            return true;
        }
        return false;
    };
    DlqIgnoreRules.isDlqIgnoreRuleRecord = (thing) => typeof thing === 'object' &&
        typeof thing.id === 'string' &&
        typeof thing.env === 'string' &&
        typeof thing.region === 'string' &&
        ['AUS', 'NOVA', 'ALL'].indexOf(thing.region) > -1 &&
        typeof thing.dlqName === 'string' &&
        typeof thing.description === 'string' &&
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