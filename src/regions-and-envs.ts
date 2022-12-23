export const regions = ["aus", "nova", "lon", "local"] as ["aus", "nova", "lon", "local"];
export type Region = typeof regions[number];
export type RegionIncAll = Region | "all";
export const appEnvironments = ["dev", "staging", "qa", "live", "local", "unittest"] as const;
export type AppEnv = typeof appEnvironments[number];
export const dataEnvironments = ["com-datastaging", "com-datalive", "local", "unittest"] as const;
export type DataEnv = typeof dataEnvironments[number];
export type DataEnvIncAll = DataEnv | "all";

const liveDataEnvProcessingEnvs = ["qa", "live", "com-datalive"];

export const mapDataEnvsFromAllEnvs = (envs: string[]): DataEnv[] => {
  const envsLowerCase = envs.map((s) => s.toLocaleLowerCase());
  if (envsLowerCase.indexOf("all") > -1) {
    return ["com-datastaging", "com-datalive"];
  }

  const dataEnvs: DataEnv[] = [];

  if (
    envsLowerCase.find((env) => {
      return liveDataEnvProcessingEnvs.find((p) => p === env);
    })
  ) {
    dataEnvs.push("com-datalive");
  }

  if (
    envsLowerCase.find((env) => {
      return !liveDataEnvProcessingEnvs.find((p) => p === env);
    })
  ) {
    dataEnvs.push("com-datastaging");
  }

  return dataEnvs;
};
