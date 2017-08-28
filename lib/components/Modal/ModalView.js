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
var ModalView = (function (_super) {
    __extends(ModalView, _super);
    function ModalView() {
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
    ModalView.prototype.componentDidMount = function () {
        this.props.updateStyle(this.initialInteractionStyle);
    };
    ModalView.prototype.onItemTap = function () {
        this.props.updateStyle({
            modalStyle: (_a = {},
                _a[this.props.modalKey] = {
                    isDisplay: true,
                },
                _a)
        });
        var _a;
    };
    ModalView.prototype.onCloseTap = function () {
        this.props.updateStyle({
            modalStyle: (_a = {},
                _a[this.props.modalKey] = {
                    isDisplay: false,
                },
                _a)
        });
        var _a;
    };
    ModalView.prototype.onWrapTap = function (e) {
        e.stopPropagation();
    };
    ModalView.prototype.render = function () {
        var _a = this.props, title = _a.title, component = _a.component, styleState = _a.styleState, modalKey = _a.modalKey;
        var style = styleState;
        var modalStyle = style.modalStyle;
        if (!modalStyle) {
            return React.createElement("div", null);
        }
        return (React.createElement("div", null, modalStyle && modalStyle[modalKey] && modalStyle[modalKey].isDisplay ? (React.createElement("div", { className: "modal-dialog-root", onClick: this.onCloseTap.bind(this) },
            React.createElement("div", { className: "modal-view-content-wrap", onClick: this.onWrapTap },
                React.createElement("div", { className: "modal-view-root" },
                    React.createElement("div", { className: "modal-view-header" },
                        React.createElement(components_1.Button, { icon: React.createElement(components_1.Close, { className: "modal-view-icon" }), onClick: this.onCloseTap.bind(this) }),
                        React.createElement("div", { className: "modal-view-title" }, title),
                        React.createElement(components_1.Button, { icon: React.createElement(components_1.Done, { className: "modal-view-icon" }), onClick: this.props.onOkClick })),
                    component)))) : null));
    };
    return ModalView;
}(React.Component));
exports.ModalView = ModalView;
//# sourceMappingURL=ModalView.js.map