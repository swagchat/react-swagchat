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
var IconListItem = (function (_super) {
    __extends(IconListItem, _super);
    function IconListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconListItem.prototype.render = function () {
        return (React.createElement("div", { className: "icon-list-item-root", onClick: this.props.onClick ? this.props.onClick.bind(this) : null },
            React.createElement("div", { className: "icon-list-item-flex1" }, this.props.leftIcon ? this.props.leftIcon : ''),
            React.createElement("div", { className: "icon-list-item-flex2" },
                React.createElement("span", null, this.props.title)),
            React.createElement("div", { className: "icon-list-item-flex3" }, this.props.rightIcon ? this.props.rightIcon : '')));
    };
    return IconListItem;
}(React.Component));
exports.IconListItem = IconListItem;
//# sourceMappingURL=IconListItem.js.map