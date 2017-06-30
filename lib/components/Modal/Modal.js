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
var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Modal.prototype.render = function () {
        var _a = this.props, description = _a.description, actions = _a.actions, onCloseTap = _a.onCloseTap;
        return (React.createElement("div", { className: "modal-root", onClick: onCloseTap },
            React.createElement("div", { className: "modal-content-wrap" },
                React.createElement("p", { className: "modal-content-description" }, description),
                React.createElement("ul", { className: "modal-content-action" }, (function () {
                    var actionItems = new Array;
                    for (var i = 0; i < actions.length; i++) {
                        actionItems.push(React.createElement("li", { key: 'modal-action-item-' + i, onClick: actions[i].onItemTap }, actions[i].name));
                    }
                    return actionItems;
                })()))));
    };
    return Modal;
}(React.Component));
exports.Modal = Modal;
//# sourceMappingURL=Modal.js.map