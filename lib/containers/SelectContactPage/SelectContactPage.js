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
var user_1 = require("swagchat-sdk/src/actions/user");
var room_1 = require("swagchat-sdk/src/actions/room");
var style_1 = require("swagchat-sdk/src/actions/style");
var stores_1 = require("swagchat-sdk/src/stores");
var components_1 = require("../../components");
var combined_1 = require("swagchat-sdk/src/actions/combined");
var room_2 = require("swagchat-sdk/src/actions/room");
var SelectContactPage = (function (_super) {
    __extends(SelectContactPage, _super);
    function SelectContactPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onRoomCreateOkClick = function () {
            _this.props.assetPostAndRoomCreateAndMessageFetchRequest();
        };
        return _this;
    }
    SelectContactPage.prototype.componentWillUnmount = function () {
        this.props.clearSelectContacts();
    };
    SelectContactPage.prototype.onContactTap = function (user) {
        this.props.updateSelectContacts(user);
    };
    SelectContactPage.prototype.onCloseButton = function () {
        if (this.props.history) {
            stores_1.store.dispatch(react_router_redux_1.push(this.props.roomListRoutePath));
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
        var _a = this.props, selectContactTitle = _a.selectContactTitle, userState = _a.userState, roomState = _a.roomState, styleState = _a.styleState, noContactListText = _a.noContactListText, noContactListImage = _a.noContactListImage, updateStyle = _a.updateStyle, roomUpdateName = _a.roomUpdateName, roomUpdatePicture = _a.roomUpdatePicture;
        return (React.createElement("div", null,
            React.createElement(components_1.TopBar, { title: selectContactTitle, leftButton: React.createElement(components_1.Button, { icon: React.createElement(components_1.Close, null), onClick: this.onCloseButton.bind(this) }), rightButton: React.createElement(components_1.Button, { icon: React.createElement(components_1.Done, null), onClick: this.onOkButton.bind(this) }) }),
            React.createElement(components_1.ContactList, { hasTopBar: true, contacts: userState.contacts, selectedContacts: userState.selectContacts, noContactListText: noContactListText, noContactListImage: noContactListImage, onClick: this.onContactTap.bind(this) }),
            React.createElement(components_1.ModalView, { title: "グループ情報登録", component: React.createElement(components_1.RoomEdit, { roomName: roomState.updateName, roomPictureUrl: roomState.updatePictureUrl, roomUpdateName: roomUpdateName, roomUpdatePicture: roomUpdatePicture }), modalKey: "roomCreate", styleState: styleState, updateStyle: updateStyle, onOkClick: this.onRoomCreateOkClick.bind(this) })));
    };
    return SelectContactPage;
}(React.Component));
var mapStateToProps = function (state) {
    if (state.client.client && state.user.user) {
        return {
            userState: state.user,
            roomState: state.room,
            styleState: state.style,
            settingState: state.setting,
            selectContactTitle: state.setting.selectContactTitle,
            noContactListText: state.setting.noContactListText,
            noContactListImage: state.setting.noContactListImage,
            roomListRoutePath: state.setting.roomListRoutePath,
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
        updateStyle: function (style) { return dispatch(style_1.updateStyleActionCreator(style)); },
        roomUpdateName: function (updateName) { return dispatch(room_2.roomUpdateNameActionCreator(updateName)); },
        roomUpdatePicture: function (updatePicture) { return dispatch(room_1.roomUpdatePictureActionCreator(updatePicture)); },
        assetPostAndRoomCreateAndMessageFetchRequest: function () { return dispatch(combined_1.combinedAssetPostAndRoomCreateAndMessageFetchRequestActionCreator()); },
    };
};
exports.ContainerSelectContactPage = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SelectContactPage);
//# sourceMappingURL=SelectContactPage.js.map