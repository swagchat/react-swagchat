"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextItem_1 = require("./TextItem");
exports.TextItem = TextItem_1.TextItem;
var TextInteraction_1 = require("./TextInteraction");
exports.TextInteraction = TextInteraction_1.TextInteraction;
var TextMenu_1 = require("./TextMenu");
exports.TextMenu = TextMenu_1.TextMenu;
var PluginMessageText = (function () {
    function PluginMessageText(position) {
        this.name = 'text';
        this.messageListMarginBottom = 88;
        this.item = TextItem_1.TextItem;
        this.interaction = TextInteraction_1.TextInteraction;
        this.menu = TextMenu_1.TextMenu;
        this.position = 'BOTTOM';
        if (position) {
            this.position = position;
        }
    }
    return PluginMessageText;
}());
exports.PluginMessageText = PluginMessageText;
//# sourceMappingURL=index.js.map