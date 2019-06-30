"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commbotCommands = [
    'DLQ_ALERT',
    'DLQ_CREATE_IGNORE_RULE_SUCCESS',
    'DLQ_CREATE_IGNORE_RULE_FAILURE',
    'DLQ_DELETE_IGNORE_RULE_SUCCESS',
    'DLQ_DELETE_IGNORE_RULE_FAILURE',
];
exports.isCommbotCommand = (thing) => !!thing && !!thing.internalCommand && exports.commbotCommands.indexOf(thing.command) !== -1;
//# sourceMappingURL=commbot-commands-types.js.map