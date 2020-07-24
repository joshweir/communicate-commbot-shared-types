import { Region, regions } from "./regions-and-envs";

export namespace Cw {
  export type TCWAlert = {
    requestId: string;
    env: string;
    region: Region;
    alarmTimestamp: number;
    functionName: string;
    metricName: string;
    reason: string;
  };

  export const isCWAlert = (thing: any): thing is TCWAlert =>
    thing &&
    typeof thing.requestId === "string" &&
    typeof thing.env === "string" &&
    typeof thing.region === "string" &&
    regions.indexOf(thing.region) > -1 &&
    typeof thing.alarmTimestamp === "number" &&
    typeof thing.functionName === "string" &&
    typeof thing.metricName === "string" &&
    typeof thing.reason === "string";

  export type TCWAlertKey = Pick<
    TCWAlert,
    "region" | "functionName" | "env" | "requestId"
  >;
}
