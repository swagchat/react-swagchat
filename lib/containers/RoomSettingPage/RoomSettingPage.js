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
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var swagchat_sdk_1 = require("swagchat-sdk");
var user_1 = require("../../actions/user");
var components_1 = require("../../components");
var style_1 = require("../../actions/style");
var user_2 = require("../../actions/user");
var combined_1 = require("../../actions/combined");
var room_1 = require("../../actions/room");
var utils_1 = require("../../utils");
var RoomSettingPage = (function (_super) {
    __extends(RoomSettingPage, _super);
    function RoomSettingPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoomSettingPage.prototype.onItemTap = function (user) {
        console.log(user);
    };
    RoomSettingPage.prototype.render = function () {
        var _a = this.props, settingState = _a.settingState, roomState = _a.roomState, userState = _a.userState, history = _a.history, styleState = _a.styleState, updateStyle = _a.updateStyle, userBlockFetch = _a.userBlockFetch, userUnBlockFetch = _a.userUnBlockFetch, roomUserRemoveFetch = _a.roomUserRemoveFetch, roomUpdateName = _a.roomUpdateName, roomUpdatePicture = _a.roomUpdatePicture, assetPostAndRoomUpdate = _a.assetPostAndRoomUpdate;
        if (!(roomState && roomState.room)) {
            return React.createElement("div", null);
        }
        var pictureUrl = roomState.room.pictureUrl ? roomState.room.pictureUrl : '';
        var name = roomState.room.name;
        if (roomState.room.type === swagchat_sdk_1.RoomType.ONE_ON_ONE) {
            var users = utils_1.opponentUser(roomState.room.users, userState.user.userId);
            if (users && users.length > 0) {
                pictureUrl = users[0].pictureUrl;
                name = users[0].name;
            }
        }
        return (React.createElement("div", { className: "room-setting-page-root" },
            React.createElement(components_1.TopBar, { title: settingState.roomSettingTitle, leftButton: React.createElement(components_1.Button, { icon: React.createElement(components_1.Back, null), onClick: history.goBack }) }),
            React.createElement(components_1.SimpleListItem, { name: name, pictureUrl: pictureUrl ? pictureUrl : settingState.noAvatarImages[0], width: 80, height: 80 }),
            React.createElement(components_1.RoomSettingList, { desableMarginTop: false, userState: userState, roomState: roomState, styleState: styleState, settingState: settingState, displayNoDataText: "No contacts.", updateStyle: updateStyle, onItemTap: this.onItemTap.bind(this), userBlockFetch: userBlockFetch, userUnBlockFetch: userUnBlockFetch, roomUserRemoveFetch: roomUserRemoveFetch, roomUpdateName: roomUpdateName, roomUpdatePicture: roomUpdatePicture, assetPostAndRoomUpdate: assetPostAndRoomUpdate }),
            (function () {
                if (roomState.room.type !== swagchat_sdk_1.RoomType.ONE_ON_ONE && roomState.room.isShowUsers && roomState.room.type !== swagchat_sdk_1.RoomType.NOTICE_ROOM) {
                    return (React.createElement("div", { className: "layout-box-1" },
                        React.createElement(components_1.SubTitleBar, { title: settingState.roomMembersTitle, isDisplayBorder: false }),
                        (function () {
                            var users = new Array;
                            for (var i = 0; i < roomState.room.users.length; i++) {
                                var user = roomState.room.users[i];
                                if (user.isShowUsers) {
                                    users.push(React.createElement(components_1.SimpleListItem, { key: 'simple-list-item-' + i, name: user.name, pictureUrl: user.pictureUrl }));
                                }
                            }
                            return users;
                        })()));
                }
                else {
                    return null;
                }
            })()));
    };
    return RoomSettingPage;
}(React.Component));
var mapStateToProps = function (state) {
    if (state.client.client && state.user.user) {
        return {
            userState: state.user,
            roomState: state.room,
            styleState: state.style,
            settingState: state.setting,
        };
    }
    return {};
};
var mapDispatchToProps = function (dispatch, ownProps) {
    ownProps; // TODO
    return {
        contactsFetchRequest: function () { return dispatch(user_1.contactsFetchRequestActionCreator()); },
        updateStyle: function (style) { return dispatch(style_1.updateStyleActionCreator(style)); },
        userBlockFetch: function (blockUserIds) { return dispatch(user_2.userBlockFetchRequestActionCreator(blockUserIds)); },
        userUnBlockFetch: function (blockUserIds) { return dispatch(user_2.userUnBlockFetchRequestActionCreator(blockUserIds)); },
        roomUserRemoveFetch: function (userIds) { return dispatch(room_1.roomUserRemoveFetchRequestActionCreator(userIds)); },
        roomUpdateName: function (updateName) { return dispatch(room_1.roomUpdateNameActionCreator(updateName)); },
        roomUpdatePicture: function (updatePicture) { return dispatch(room_1.roomUpdatePictureActionCreator(updatePicture)); },
        assetPostAndRoomUpdate: function () { return dispatch(combined_1.combinedAssetPostAndRoomUpdateRequestActionCreator()); },
    };
};
exports.ContainerRoomSettingPage = react_router_dom_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(RoomSettingPage));
//# sourceMappingURL=RoomSettingPage.js.map