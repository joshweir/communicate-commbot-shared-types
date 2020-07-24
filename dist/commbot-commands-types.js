"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commbot = void 0;
var Commbot;
(function (Commbot) {
    Commbot.commbotCommands = [
        "GENERIC_ALERT",
        "DLQ_ALERT",
        "DLQ_CREATE_IGNORE_RULE_SUCCESS",
        "DLQ_CREATE_IGNORE_RULE_FAILURE",
        "DLQ_DELETE_IGNORE_RULE_SUCCESS",
        "DLQ_DELETE_IGNORE_RULE_FAILURE",
        "DLQ_REQUEUE_MESSAGE_SUCCESS",
        "DLQ_REQUEUE_MESSAGE_FAILURE",
        "DLQ_DELETE_MESSAGE_SUCCESS",
        "DLQ_DELETE_MESSAGE_FAILURE",
        "DLQ_BULK_REQUEUE_SUCCESS",
        "DLQ_BULK_REQUEUE_FAILURE",
        "DLQ_LIST_IGNORE_RULES_SUCCESS",
        "DLQ_LIST_IGNORE_RULES_FAILURE",
        "DLQ_RESUME_SUCCESS",
        "DLQ_RESUME_FAILURE",
        "DLQ_PAUSE_SUCCESS",
        "DLQ_PAUSE_FAILURE",
        "DLQ_COUNT_SUCCESS",
        "DLQ_COUNT_FAILURE",
        "DLQ_HEAD_SUCCESS",
        "DLQ_HEAD_FAILURE",
        "DLQ_TAIL_SUCCESS",
        "DLQ_TAIL_FAILURE",
        "DLQ_PICK_SUCCESS",
        "DLQ_PICK_FAILURE",
        "DLQ_CREATE_TRASH_RULE_SUCCESS",
        "DLQ_CREATE_TRASH_RULE_FAILURE",
        "DLQ_DELETE_TRASH_RULE_SUCCESS",
        "DLQ_DELETE_TRASH_RULE_FAILURE",
        "DLQ_LIST_TRASH_RULES_SUCCESS",
        "DLQ_LIST_TRASH_RULES_FAILURE",
        "QDB_COLD_TO_WARM_ALERT",
        "QDB_WARM_UP_TO_DATE",
        "QDB_ALERT",
        "QDB_PAUSE_SUCCESS",
        "QDB_PAUSE_FAILURE",
        "QDB_RESUME_SUCCESS",
        "QDB_RESUME_FAILURE",
        "QDB_RESTART_SUCCESS",
        "QDB_RESTART_FAILURE",
        "QDB_WARM_TO_HOT_SUCCESS",
        "QDB_WARM_TO_HOT_FAILURE",
        "DATAMOD_SUCCESS",
        "DATAMOD_FAILURE",
        "TERRAFORM_PLAN_APPROVAL_REQUEST",
        "GET_ENTITY_SUCCESS",
        "GET_ENTITY_FAILURE",
        "CW_ALERT",
    ];
    Commbot.isCommbotCommand = (thing) => !!thing &&
        !!thing.internalCommand &&
        Commbot.commbotCommands.indexOf(thing.command) !== -1;
})(Commbot = exports.Commbot || (exports.Commbot = {}));
//# sourceMappingURL=commbot-commands-types.js.map