"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Commbot;
(function (Commbot) {
    Commbot.commbotCommands = [
        'DLQ_ALERT',
        'DLQ_CREATE_IGNORE_RULE_SUCCESS',
        'DLQ_CREATE_IGNORE_RULE_FAILURE',
        'DLQ_DELETE_IGNORE_RULE_SUCCESS',
        'DLQ_DELETE_IGNORE_RULE_FAILURE',
        'DLQ_REQUEUE_MESSAGE_SUCCESS',
        'DLQ_REQUEUE_MESSAGE_FAILURE',
        'DLQ_DELETE_MESSAGE_SUCCESS',
        'DLQ_DELETE_MESSAGE_FAILURE',
    ];
    Commbot.isCommbotCommand = (thing) => !!thing && !!thing.internalCommand && Commbot.commbotCommands.indexOf(thing.command) !== -1;
})(Commbot = exports.Commbot || (exports.Commbot = {}));
;
//# sourceMappingURL=commbot-commands-types.js.map