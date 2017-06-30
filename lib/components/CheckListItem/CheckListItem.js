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
var _1 = require("../../");
var CheckListItem = (function (_super) {
    __extends(CheckListItem, _super);
    function CheckListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckListItem.prototype.onClick = function (user) {
        if (this.props.onClick) {
            this.props.onClick(user);
        }
    };
    CheckListItem.prototype.render = function () {
        return (React.createElement("div", { className: "check-list-item-root", onClick: this.onClick.bind(this, this.props.user) },
            React.createElement("div", { className: "check-list-item-flex1" },
                React.createElement(_1.Avatar, { src: this.props.user.pictureUrl ? this.props.user.pictureUrl : '', className: "check-list-item-avatar" })),
            React.createElement("div", { className: "check-list-item-flex2" },
                React.createElement("div", { className: "check-list-item-subject" }, this.props.user.name)),
            React.createElement("div", { className: "check-list-item-flex3" },
                React.createElement(_1.Button, { icon: React.createElement(_1.CheckCircle, null) }))));
    };
    return CheckListItem;
}(React.Component));
exports.CheckListItem = CheckListItem;
//# sourceMappingURL=CheckListItem.js.map