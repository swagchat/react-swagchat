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
var components_1 = require("../../components");
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
        var _this = this;
        return (React.createElement("div", { className: "check-list-item-wrap", onClick: this.props.onClick },
            React.createElement("div", { className: "check-list-item-flex1", style: { height: this.props.width + 'px', lineHeight: this.props.width + 'px' } },
                React.createElement(components_1.Avatar, { src: this.props.pictureUrl, width: this.props.width, height: this.props.height })),
            React.createElement("div", { className: "check-list-item-flex2", style: { height: this.props.width + 'px', lineHeight: this.props.width + 'px' } },
                React.createElement("div", { className: "check-list-item-subject" }, this.props.name)),
            React.createElement("div", { className: "check-list-item-flex3", style: { height: this.props.width + 'px', lineHeight: this.props.width + 'px' } }, (function () {
                if (_this.props.isChecked) {
                    return React.createElement(components_1.Button, { icon: React.createElement(components_1.RadioButtonChecked, null) });
                }
                else {
                    return React.createElement(components_1.Button, { icon: React.createElement(components_1.RadioButtonUnChecked, { style: { fill: 'rgba(153, 153, 153, 0.2)' } }) });
                }
            })())));
    };
    return CheckListItem;
}(React.Component));
exports.CheckListItem = CheckListItem;
//# sourceMappingURL=CheckListItem.js.map