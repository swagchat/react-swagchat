"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageItem_1 = require("./ImageItem");
exports.ImageItem = ImageItem_1.ImageItem;
var ImageInteraction_1 = require("./ImageInteraction");
exports.ImageInteraction = ImageInteraction_1.ImageInteraction;
var ImageMenu_1 = require("./ImageMenu");
exports.ImageMenu = ImageMenu_1.ImageMenu;
var PluginMessageImage = (function () {
    function PluginMessageImage() {
        this.name = 'image';
        this.messageListMarginBottom = 88;
        this.item = ImageItem_1.ImageItem;
        this.interaction = ImageInteraction_1.ImageInteraction;
        this.menu = ImageMenu_1.ImageMenu;
    }
    return PluginMessageImage;
}());
exports.PluginMessageImage = PluginMessageImage;
//# sourceMappingURL=index.js.map