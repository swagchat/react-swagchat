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
var react_redux_1 = require("react-redux");
var _1 = require("../../");
var SelectContactPage = (function (_super) {
    __extends(SelectContactPage, _super);
    function SelectContactPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectContactPage.prototype.onContactTap = function (user) {
        console.log('SelectContactPage.onContactTap');
        console.log(user);
    };
    SelectContactPage.prototype.onCloseButton = function () {
        if (this.props.history) {
            this.props.history.push({ pathname: '/' });
        }
    };
    SelectContactPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(_1.TopBar, { title: "Select contact", leftButton: React.createElement(_1.Button, { icon: React.createElement(_1.Close, null), onClick: this.onCloseButton.bind(this) }), rightButton: React.createElement(_1.Button, { text: "OK" }) }),
            React.createElement(_1.ContactList, { hasTopBar: true, contacts: this.props.userState.contacts, displayNoDataText: "No contacts.", onClick: this.onContactTap.bind(this) })));
    };
    return SelectContactPage;
}(React.Component));
var mapStateToProps = function (state) {
    if (state.client.client && state.user.user) {
        return {
            userState: state.user,
        };
    }
    return {};
};
var mapDispatchToProps = function (dispatch, ownProps) {
    ownProps; // TODO
    dispatch; // TODO
    return {};
};
exports.ContainerSelectContactPage = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SelectContactPage);
//# sourceMappingURL=SelectContactPage.js.map