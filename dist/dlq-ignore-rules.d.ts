import { TMatcher } from 'joshs-object-matcher';
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
    type TDlqIgnoreRuleRecord = {
        id: string;
        env: string;
        region: 'ALL' | 'AUS' | 'NOVA';
        dlqName: string;
        description: string;
        ignoreRules: (TModplanMatcherExpression | TMatcher)[];
    };
    const isDlqIgnoreRuleRecord: (thing: any) => thing is TDlqIgnoreRuleRecord;
    type TDlqIgnoreRuleRawRecord = Omit<TDlqIgnoreRuleRecord, 'ignoreRules'> & {
        ignoreRules: string;
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