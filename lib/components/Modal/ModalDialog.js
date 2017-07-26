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
var ModalDialog = (function (_super) {
    __extends(ModalDialog, _super);
    function ModalDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initialInteractionStyle = {
            modalStyle: (_a = {},
                _a[_this.props.modalKey] = {
                    isDisplay: false,
                },
                _a)
        };
        return _this;
        var _a;
    }
    ModalDialog.prototype.componentDidMount = function () {
        this.props.updateStyle(this.initialInteractionStyle);
    };
    ModalDialog.prototype.onItemTap = function () {
        this.props.updateStyle({
            modalStyle: (_a = {},
                _a[this.props.modalKey] = {
                    isDisplay: true,
                },
                _a)
        });
        var _a;
    };
    ModalDialog.prototype.onCloseTap = function () {
        this.props.updateStyle({
            modalStyle: (_a = {},
                _a[this.props.modalKey] = {
                    isDisplay: false,
                },
                _a)
        });
        var _a;
    };
    ModalDialog.prototype.onWrapTap = function (e) {
        e.stopPropagation();
    };
    ModalDialog.prototype.render = function () {
        var _a = this.props, description = _a.description, actions = _a.actions, styleState = _a.styleState, modalKey = _a.modalKey;
        var style = styleState;
        var modalStyle = style.modalStyle;
        if (!modalStyle) {
            return React.createElement("div", null);
        }
        return (React.createElement("div", null, modalStyle && modalStyle[modalKey] && modalStyle[modalKey].isDisplay ? (React.createElement("div", { className: "modal-dialog-root", onClick: this.onCloseTap.bind(this) },
            React.createElement("div", { className: "modal-dialog-content-wrap", onClick: this.onWrapTap },
                React.createElement("p", { className: "modal-dialog-content-description" }, description),
                React.createElement("ul", { className: "modal-dialog-content-action" }, (function () {
                    var actionItems = new Array;
                    for (var i = 0; i < actions.length; i++) {
                        actionItems.push(React.createElement("li", { className: actions[i].type, key: 'modal-dialog-action-item-' + i, onClick: actions[i].onItemTap }, actions[i].name));
                    }
                    return actionItems;
                })())))) : null));
    };
    return ModalDialog;
}(React.Component));
exports.ModalDialog = ModalDialog;
//# sourceMappingURL=ModalDialog.js.map