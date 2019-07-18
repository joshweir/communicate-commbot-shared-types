import { v4 } from 'uuid';
import { TMatcher, isMatcher } from 'joshs-object-matcher';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export namespace DlqIgnoreRules {
  export type TStepMatcher = TMatcher & {
    stepName: string;
  };
  
  export type TModplanMatcherExpression = {
    modInfo?: TMatcher[];
    modSteps?: TStepMatcher[];
  };
  
  export const isStepMatcher = (thing: any): thing is TStepMatcher => {
    if (typeof thing !== 'object') {
      throw new Error(`step matcher invalid, must be an object: ${JSON.stringify(thing)}`);
    }
    const { stepName, ...matcherProps } = thing;
    if (typeof stepName !== 'string' || !stepName || !stepName.length) {
      throw new Error(`step matcher invalid, stepName prop is required: ${JSON.stringify(thing)}`);
    }
    if (!isMatcher(matcherProps)) {
      throw new Error(`step matcher invalid, matcher props invalid: ${JSON.stringify(thing)}`);
    }
  
    return true;
  };
  
  export const isModPlanMatcherExpression = (thing: any): thing is TModplanMatcherExpression => {
    if (typeof thing !== 'object') return false;
  
    if ((!thing.modInfo || !thing.modInfo.length) && (!thing.modSteps || !thing.modSteps.length)) {
      throw new Error(`modplanMatcherExpression must contain modInfo item(s) and/or modStep item(s)`);
    }
  
    if (
      (!thing.modInfo || thing.modInfo.filter(isMatcher).length === thing.modInfo.length) &&
      (!thing.modSteps || thing.modSteps.filter(isStepMatcher).length === thing.modSteps.length)
    ) {
      return true;
    }
  
    return false;
  };
  
  export const isModPlanMatcherExpressions = (thing: any): thing is TModplanMatcherExpression[] => {
    if (!(thing instanceof Array)) {
      throw new Error(`mod plan matcher expression must be an array`);
    }
  
    if (thing.length > 0 && thing.filter(isModPlanMatcherExpression).length === thing.length) {
      return true;
    }
  
    return false;
  };

  export type TDlqIgnoreRuleRecord = {
    id: string;
    env: string;
    region: 'ALL' | 'AUS' | 'NOVA';
    dlqName: string;
    description: string;
    ignoreRules: (TModplanMatcherExpression | TMatcher)[];
  };

  export const isDlqIgnoreRuleRecord = (thing: any): thing is TDlqIgnoreRuleRecord =>
    typeof thing === 'object' &&
    typeof thing.id === 'string' &&
    typeof thing.env === 'string' &&
    typeof thing.region === 'string' &&
    ['AUS', 'NOVA', 'ALL'].indexOf(thing.region) > -1 &&
    typeof thing.dlqName === 'string' &&
    typeof thing.description === 'string' &&
    thing.ignoreRules instanceof Array &&
    (
      isModPlanMatcherExpressions(thing.ignoreRules) ||
      thing.ignoreRules.filter(isMatcher).length === thing.ignoreRules.length
    );

  export type TDlqIgnoreRuleRawRecord = Omit<TDlqIgnoreRuleRecord, 'ignoreRules'> & {
    ignoreRules: string;
  };

  export const isDlqIgnoreRuleRawRecord = (thing: any): thing is TDlqIgnoreRuleRawRecord =>
    typeof thing === 'object' &&
    typeof thing.id === 'string' &&
    typeof thing.env === 'string' &&
    typeof thing.region === 'string' &&
    ['AUS', 'NOVA', 'ALL'].indexOf(thing.region) > -1 &&
    typeof thing.dlqName === 'string' &&
    typeof thing.description === 'string' &&
    typeof thing.ignoreRules === 'string';
  
  export const parseMultiValueIgnoreRuleField = (input: string): string => {
    let result: string = input;
    if (typeof result === 'string') {
      if (['ALL',''].indexOf(result.toLocaleUpperCase()) === -1) {
        result = result.split(',').join(',');
      }
      result = result.toLocaleUpperCase();
    }

    return result;
  }

  export const parseDlqIgnoreRuleRawRecord = (input: string): TDlqIgnoreRuleRawRecord | undefined => {
    try {
      const record = JSON.parse(input);
      if (record) {
        if (typeof record.id !== 'string' || !record.id.length) {
          record.id = v4();
        }
        record.env = parseMultiValueIgnoreRuleField(record.env);
        record.region = parseMultiValueIgnoreRuleField(record.region);
        record.dlqName = parseMultiValueIgnoreRuleField(record.dlqName);

        if (isDlqIgnoreRuleRawRecord(record)) {
          return record;
        }
      }
    } catch(e) {}

    return;
  };

  export type TIgnoreRuleKey = Pick<TDlqIgnoreRuleRecord, 'id' | 'region' | 'env'>;
  
  export const isTIgnoreRuleKey = (thing: any): thing is TIgnoreRuleKey => 
    typeof thing === 'object' &&
    typeof thing.id === 'string' &&
    typeof thing.region === 'string' &&
    ['AUS', 'NOVA', 'ALL'].indexOf(thing.region) > -1 &&
    typeof thing.env === 'string';
  
  export const parseIgnoreRuleKey = (input: string): TIgnoreRuleKey | undefined => {
    try {
      const record = JSON.parse(input);
      if (record) {
        record.env = parseMultiValueIgnoreRuleField(record.env);
        record.region = parseMultiValueIgnoreRuleField(record.region);
      }

      if (isTIgnoreRuleKey(record)) {
        return record;
      }
    } catch(e) {}
  
    return;
  };
};
