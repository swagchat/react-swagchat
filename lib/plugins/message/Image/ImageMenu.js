"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var components_1 = require("../../../components");
var ImageMenu = (function (_super) {
    __extends(ImageMenu, _super);
    function ImageMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageMenu.prototype.render = function () {
        var on = {
            color: '#0084ff'
        };
        var off = {
            color: '#bdbdbd'
        };
        var _a = this.props, updateMenuIndex = _a.updateMenuIndex, ownMenuIndex = _a.ownMenuIndex, currentMenuIndex = _a.currentMenuIndex;
        return (React.createElement("div", { className: "image-menu-root", onClick: function () { updateMenuIndex(ownMenuIndex); } },
            React.createElement(components_1.Camera, { className: "image-menu-icon", style: ownMenuIndex === currentMenuIndex ? on : off })));
    };
    return ImageMenu;
}(React.Component));
exports.ImageMenu = ImageMenu;
//# sourceMappingURL=ImageMenu.js.map