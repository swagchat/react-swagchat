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
var react_router_redux_1 = require("react-router-redux");
var react_redux_1 = require("react-redux");
var user_1 = require("../../actions/user");
var stores_1 = require("../../stores");
var _1 = require("../../");
var combined_1 = require("../../actions/combined");
var SelectContactPage = (function (_super) {
    __extends(SelectContactPage, _super);
    function SelectContactPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectContactPage.prototype.componentWillUnmount = function () {
        this.props.clearSelectContacts();
    };
    SelectContactPage.prototype.onContactTap = function (user) {
        this.props.updateSelectContacts(user);
    };
    SelectContactPage.prototype.onCloseButton = function () {
        if (this.props.history) {
            stores_1.store.dispatch(react_router_redux_1.push('/'));
        }
    };
    SelectContactPage.prototype.onOkButton = function () {
        console.log('onOkButton');
        var room = {
            userId: this.props.userState.userId,
            type: 0,
            name: '',
        };
        this.props.combinedCreateRoomAndMessagesFetchRequest(room);
    };
    SelectContactPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(_1.TopBar, { title: "Select contact", leftButton: React.createElement(_1.Button, { icon: React.createElement(_1.Close, null), onClick: this.onCloseButton.bind(this) }), rightButton: React.createElement(_1.Button, { text: "OK", onClick: this.onOkButton.bind(this) }) }),
            React.createElement(_1.ContactList, { hasTopBar: true, contacts: this.props.userState.contacts, selectedContacts: this.props.userState.selectContacts, noContactListText: this.props.noContactListText, noContactListImage: this.props.noContactListImage, onClick: this.onContactTap.bind(this) })));
    };
    return SelectContactPage;
}(React.Component));
var mapStateToProps = function (state) {
    if (state.client.client && state.user.user) {
        return {
            userState: state.user,
            noContactListText: state.setting.noContactListText,
            noContactListImage: state.setting.noContactListImage,
        };
    }
    return {};
};
var mapDispatchToProps = function (dispatch, ownProps) {
    ownProps; // TODO
    dispatch; // TODO
    return {
        contactsFetchRequest: function () { return dispatch(user_1.contactsFetchRequestActionCreator()); },
        updateSelectContacts: function (contact) { return dispatch(user_1.updateSelectContactsActionCreator(contact)); },
        clearSelectContacts: function () { return dispatch(user_1.clearSelectContactsActionCreator()); },
        combinedCreateRoomAndMessagesFetchRequest: function (room) { return dispatch(combined_1.combinedCreateRoomAndMessagesFetchRequestActionCreator(room)); },
    };
};
exports.ContainerSelectContactPage = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SelectContactPage);
//# sourceMappingURL=SelectContactPage.js.map