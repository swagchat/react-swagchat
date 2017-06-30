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
var _1 = require("../../");
var style_1 = require("../../actions/style");
var user_2 = require("../../actions/user");
var room_1 = require("../../actions/room");
var utils_1 = require("../../utils");
var RoomSettingPage = (function (_super) {
    __extends(RoomSettingPage, _super);
    function RoomSettingPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoomSettingPage.prototype.componentDidUpdate = function () {
        if (this.props.history.action === 'POP' && !this.props.roomState.room) {
            // store.dispatch(roomFetchRequestActionCreator(this.props.match.params.roomId));
        }
    };
    RoomSettingPage.prototype.onItemTap = function (user) {
        console.log(user);
    };
    RoomSettingPage.prototype.render = function () {
        var _this = this;
        if (!(this.props.roomState && this.props.roomState.room)) {
            return React.createElement("div", null);
        }
        var pictureUrl = this.props.roomState.room.pictureUrl ? this.props.roomState.room.pictureUrl : '';
        var name = this.props.roomState.room.name;
        if (this.props.roomState.room.type === swagchat_sdk_1.RoomType.ONE_ON_ONE) {
            var users = utils_1.opponentUser(this.props.roomState.room.users, this.props.userState.user.userId);
            if (users && users.length > 0) {
                pictureUrl = users[0].pictureUrl;
                name = users[0].name;
            }
        }
        return (React.createElement("div", { className: "room-setting-page-root" },
            React.createElement(_1.TopBar, { title: this.props.settingState.roomSettingTitle, leftButton: React.createElement(_1.Button, { icon: React.createElement(_1.Back, null), onClick: this.props.history.goBack }) }),
            React.createElement(_1.SimpleListItem, { name: name, pictureUrl: pictureUrl, width: 80, height: 80 }),
            React.createElement(_1.RoomSettingList, { desableMarginTop: false, userState: this.props.userState, roomState: this.props.roomState, styleState: this.props.styleState, displayNoDataText: "No contacts.", updateStyle: this.props.updateStyle, onItemTap: this.onItemTap.bind(this), userBlockFetch: this.props.userBlockFetch, userUnBlockFetch: this.props.userUnBlockFetch, roomUserRemoveFetch: this.props.roomUserRemoveFetch }),
            (function () {
                if (_this.props.roomState.room.type !== swagchat_sdk_1.RoomType.ONE_ON_ONE && _this.props.roomState.room.isShowUsers && _this.props.roomState.room.type !== swagchat_sdk_1.RoomType.NOTICE_ROOM) {
                    return (React.createElement("div", { className: "layout-box-1" },
                        React.createElement(_1.SubTitleBar, { title: _this.props.settingState.roomMembersTitle, isDisplayBorder: false }),
                        (function () {
                            var users = new Array;
                            for (var i = 0; i < _this.props.roomState.room.users.length; i++) {
                                var user = _this.props.roomState.room.users[i];
                                if (user.isShowUsers) {
                                    users.push(React.createElement(_1.SimpleListItem, { key: 'simple-list-item-' + i, name: user.name, pictureUrl: user.pictureUrl }));
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
    };
};
exports.ContainerRoomSettingPage = react_router_dom_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(RoomSettingPage));
//# sourceMappingURL=RoomSettingPage.js.map