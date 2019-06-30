declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type TDlqIgnoreRule = string;
export declare type TDlqIgnoreRules = TDlqIgnoreRule[];
export declare const isTDlqIgnoreRules: (thing: any) => thing is string[];
export declare type TDlqIgnoreRuleRecord = {
    id: string;
    env: string;
    dlqName: string;
    description: string;
    ignoreRules: TDlqIgnoreRules;
};
export declare const isTDlqIgnoreRuleRecord: (thing: any) => thing is TDlqIgnoreRuleRecord;
export declare type TDlqIgnoreRuleRegExpRecord = Omit<TDlqIgnoreRuleRecord, 'ignoreRules'> & {
    ignoreRules: RegExp[];
};
export declare type TDlqIgnoreRuleRawRecord = Omit<TDlqIgnoreRuleRecord, 'ignoreRules'> & {
    ignoreRules: string;
};
export declare const isTDlqIgnoreRuleRawRecord: (thing: any) => thing is TDlqIgnoreRuleRawRecord;
export {};
//# sourceMappingURL=dlq-ignore-rules-types.d.ts.map