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
var SubTitleBar = (function (_super) {
    __extends(SubTitleBar, _super);
    function SubTitleBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubTitleBar.prototype.render = function () {
        return (React.createElement("div", { className: "sub-title-bar-root", style: !this.props.isDisplayBorder ? { border: 'none' } : {} }, this.props.title));
    };
    return SubTitleBar;
}(React.Component));
SubTitleBar.defaultProps = {
    isDisplayBorder: true,
};
exports.SubTitleBar = SubTitleBar;
//# sourceMappingURL=SubTitleBar.js.map