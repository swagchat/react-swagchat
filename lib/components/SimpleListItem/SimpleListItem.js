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
var SimpleListItem = (function (_super) {
    __extends(SimpleListItem, _super);
    function SimpleListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleListItem.prototype.render = function () {
        return (React.createElement("div", { className: "simple-list-item-wrap", onClick: this.props.onClick },
            React.createElement("div", { className: "simple-list-item-wrap-flex1", style: { width: this.props.width + 'px' } },
                React.createElement(_1.Avatar, { src: this.props.pictureUrl, width: this.props.width, height: this.props.height })),
            React.createElement("div", { className: "simple-list-item-wrap-flex2", style: { height: this.props.height + 'px' } },
                React.createElement("span", null, this.props.name))));
    };
    return SimpleListItem;
}(React.Component));
SimpleListItem.defaultProps = {
    width: 60,
    height: 60,
};
exports.SimpleListItem = SimpleListItem;
//# sourceMappingURL=SimpleListItem.js.map