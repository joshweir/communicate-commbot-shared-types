"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDataEnvsFromAllEnvs = exports.dataEnvironments = exports.appEnvironments = exports.regions = void 0;
exports.regions = ["aus", "nova"];
exports.appEnvironments = ["dev", "staging", "qa", "live"];
exports.dataEnvironments = ["com-datastaging", "com-datalive"];
const liveDataEnvProcessingEnvs = ["qa", "live", "com-datalive"];
exports.mapDataEnvsFromAllEnvs = (envs) => {
    const envsLowerCase = envs.map((s) => s.toLocaleLowerCase());
    if (envsLowerCase.indexOf("all") > -1) {
        return ["com-datastaging", "com-datalive"];
    }
    const dataEnvs = [];
    if (envsLowerCase.find((env) => {
        return liveDataEnvProcessingEnvs.find((p) => p === env);
    })) {
        dataEnvs.push("com-datalive");
    }
    if (envsLowerCase.find((env) => {
        return !liveDataEnvProcessingEnvs.find((p) => p === env);
    })) {
        dataEnvs.push("com-datastaging");
    }
    return dataEnvs;
};
//# sourceMappingURL=regions-and-envs.js.map