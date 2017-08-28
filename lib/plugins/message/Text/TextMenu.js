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
var TextMenu = (function (_super) {
    __extends(TextMenu, _super);
    function TextMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextMenu.prototype.render = function () {
        var on = {
            color: '#0084ff'
        };
        var off = {
            color: '#bdbdbd'
        };
        var _a = this.props, updateMenuIndex = _a.updateMenuIndex, ownMenuIndex = _a.ownMenuIndex, currentMenuIndex = _a.currentMenuIndex;
        return (React.createElement("div", { className: "text-menu-root", onClick: function () { updateMenuIndex(ownMenuIndex); } },
            React.createElement(components_1.Keyboard, { className: "text-menu-icon", style: ownMenuIndex === currentMenuIndex ? on : off })));
    };
    return TextMenu;
}(React.Component));
exports.TextMenu = TextMenu;
//# sourceMappingURL=TextMenu.js.map