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
var classNames = require('classnames');
var Avatar = (function (_super) {
    __extends(Avatar, _super);
    function Avatar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Avatar.prototype.render = function () {
        var style = {};
        if (this.props.width) {
            style.width = this.props.width + 'px';
        }
        if (this.props.height) {
            style.height = this.props.height + 'px';
        }
        if (this.props.margin) {
            style.margin = this.props.margin + 'px';
        }
        return (React.createElement("img", { src: this.props.src, className: classNames('avatar', this.props.className), style: style, onClick: this.props.onClick }));
    };
    return Avatar;
}(React.Component));
exports.Avatar = Avatar;
//# sourceMappingURL=Avatar.js.map