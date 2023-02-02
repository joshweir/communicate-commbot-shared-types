import { TMatcher } from 'joshs-object-matcher';
import { RegionUpperIncAll } from './regions-and-envs';
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare namespace DlqIgnoreRules {
    type TStepMatcher = TMatcher & {
        stepName: string;
    };
    type TModplanMatcherExpression = {
        modInfo?: TMatcher[];
        modSteps?: TStepMatcher[];
    };
    const isStepMatcher: (thing: any) => thing is TStepMatcher;
    const isModPlanMatcherExpression: (thing: any) => thing is TModplanMatcherExpression;
    const isModPlanMatcherExpressions: (thing: any) => thing is TModplanMatcherExpression[];
    type LogMatcher = {
        pattern: string;
        flags?: string;
    };
    const isLogMatcher: (thing: any) => thing is LogMatcher;
    type TDlqIgnoreRuleRecord = {
        id: string;
        env: string;
        region: RegionUpperIncAll;
        dlqName: string;
        description: string;
        ignoreRules: (TModplanMatcherExpression | TMatcher)[];
        logsMustExistPatterns: LogMatcher[] | undefined;
    };
    const isDlqIgnoreRuleRecord: (thing: any) => thing is TDlqIgnoreRuleRecord;
    type TDlqIgnoreRuleRawRecord = Omit<TDlqIgnoreRuleRecord, 'ignoreRules' | 'logsMustExistPatterns'> & {
        ignoreRules: string;
        logsMustExistPatterns: string | undefined;
    };
    const isDlqIgnoreRuleRawRecord: (thing: any) => thing is TDlqIgnoreRuleRawRecord;
    const parseMultiValueIgnoreRuleField: (input: string) => string;
    const parseDlqIgnoreRuleRawRecord: (input: string) => TDlqIgnoreRuleRawRecord | undefined;
    type TIgnoreRuleKey = Pick<TDlqIgnoreRuleRecord, 'id' | 'region' | 'env'>;
    const isTIgnoreRuleKey: (thing: any) => thing is Pick<TDlqIgnoreRuleRecord, "id" | "env" | "region">;
    const parseIgnoreRuleKey: (input: string) => Pick<TDlqIgnoreRuleRecord, "id" | "env" | "region"> | undefined;
}
export {};
//# sourceMappingURL=dlq-ignore-rules.d.ts.map