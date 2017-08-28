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
var TopBar = (function (_super) {
    __extends(TopBar, _super);
    function TopBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopBar.prototype.render = function () {
        var _a = this.props, title = _a.title, pictureUrl = _a.pictureUrl, leftButton = _a.leftButton, rightButton = _a.rightButton;
        return (React.createElement("div", { className: "topbar-root" },
            leftButton ? leftButton : null,
            (function () {
                if (pictureUrl) {
                    return (React.createElement("div", { className: "topbar-avatar-title-wrap" },
                        React.createElement("div", { className: "topbar-avatar" },
                            React.createElement(components_1.Avatar, { src: pictureUrl, width: 32, height: 32 })),
                        React.createElement("h1", { className: "topbar-avatar-title" }, title)));
                }
                else {
                    return React.createElement("h1", { className: "topbar-title" }, title);
                }
            })(),
            rightButton ? rightButton : null));
    };
    return TopBar;
}(React.Component));
exports.TopBar = TopBar;
//# sourceMappingURL=TopBar.js.map