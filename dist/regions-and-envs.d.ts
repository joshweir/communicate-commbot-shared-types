export declare const regions: ["aus", "nova"];
export declare type Region = (typeof regions)[number];
export declare type RegionIncAll = Region | "all";
export declare const appEnvironments: ["dev", "staging", "qa", "beta", "live"];
export declare type AppEnv = (typeof appEnvironments)[number];
export declare const dataEnvironments: ["com-datastaging", "com-datalive"];
export declare type DataEnv = (typeof dataEnvironments)[number];
export declare type DataEnvIncAll = DataEnv | "all";
export declare const mapDataEnvsFromAllEnvs: (envs: string[]) => ("com-datastaging" | "com-datalive")[];
//# sourceMappingURL=regions-and-envs.d.ts.map