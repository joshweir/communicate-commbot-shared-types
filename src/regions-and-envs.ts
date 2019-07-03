export const regions = ['aus', 'nova'] as ['aus', 'nova'];
export type Region = (typeof regions)[number];
export type RegionIncAll = Region | 'all';
export const appEnvironments = ['dev', 'staging', 'qa', 'beta', 'live'] as ['dev', 'staging', 'qa', 'beta', 'live'];
export type AppEnv = (typeof appEnvironments)[number];
export const dataEnvironments = ['com-datastaging', 'com-datalive'] as ['com-datastaging', 'com-datalive'];
export type DataEnv = (typeof dataEnvironments)[number];
export type DataEnvIncAll = DataEnv | 'all';

const liveDataEnvProcessingEnvs = ['qa', 'beta', 'live', 'com-datalive'];

export const mapDataEnvsFromAllEnvs = (envs: string[]): DataEnv[] => {
  if (envs.indexOf('all') > -1) {
    return ['com-datastaging', 'com-datalive'];
  }

  const dataEnvs: DataEnv[] = [];

  if (
    envs.find((env) => {
      return liveDataEnvProcessingEnvs.find((p) => p === env);
    })
  ) {
    dataEnvs.push('com-datalive');
  }

  if (
    envs.find((env) => {
      return liveDataEnvProcessingEnvs.find((p) => p !== env);
    })
  ) {
    dataEnvs.push('com-datastaging');
  }

  return dataEnvs;
};