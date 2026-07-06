import { PublishCommand } from "@aws-sdk/client-sns";
import { Commbot } from "./commbot-commands-types";

export const buildSendCommandToCommbot: Commbot.TBuildSendCommandToCommbot =
  (sns, commbotTopicArn, localProcessingEnv) => async (command, args) => {
    const c: Commbot.TCommbotCommand = {
      command,
      args,
      localProcessingEnv,
      internalCommand: true,
    };

    await sns.send(
      new PublishCommand({
        TopicArn: commbotTopicArn,
        Message: JSON.stringify(c),
      }),
    );
  };
