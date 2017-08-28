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
var react_router_redux_1 = require("react-router-redux");
var stores_1 = require("../../stores");
var components_1 = require("../../components");
var RoomListPage = (function (_super) {
    __extends(RoomListPage, _super);
    function RoomListPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoomListPage.prototype.onItemTap = function (room) {
        if (this.props.history) {
            stores_1.store.dispatch(react_router_redux_1.push(this.props.messageRoutePath + '/' + room.roomId));
        }
    };
    RoomListPage.prototype.onCreateRoomButton = function () {
        if (this.props.history) {
            stores_1.store.dispatch(react_router_redux_1.push(this.props.selectContactRoutePath));
        }
    };
    RoomListPage.prototype.render = function () {
        var _a = this.props, roomListTitle = _a.roomListTitle, userId = _a.userId, userRooms = _a.userRooms, roomListItems = _a.roomListItems, roomListTabbar = _a.roomListTabbar, noRoomListText = _a.noRoomListText, noRoomListImage = _a.noRoomListImage, noAvatarImages = _a.noAvatarImages;
        return (React.createElement("div", null,
            React.createElement(components_1.TopBar, { title: roomListTitle, rightButton: React.createElement(components_1.Button, { icon: React.createElement(components_1.CheckCircleOutline, null), onClick: this.onCreateRoomButton.bind(this) }) }),
            React.createElement(components_1.RoomList, { myUserId: userId, userRooms: userRooms, roomListItems: roomListItems, hasTopBar: true, hasTabBar: roomListTabbar ? true : false, noRoomListText: noRoomListText, noRoomListImage: noRoomListImage, noAvatarImages: noAvatarImages, onClick: this.onItemTap.bind(this) }),
            roomListTabbar ? roomListTabbar : null));
    };
    return RoomListPage;
}(React.Component));
var mapStateToProps = function (state) {
    if (state.client.client && state.user.user) {
        return {
            apiKey: state.client.client.apiKey,
            apiEndpoint: state.client.client.apiEndpoint,
            userAccessToken: state.user.user.accessToken,
            roomListTitle: state.setting.roomListTitle,
            userId: state.user.user.userId,
            userRooms: state.user.userRooms,
            roomListItems: state.plugin.roomListItems,
            noRoomListText: state.setting.noRoomListText,
            noRoomListImage: state.setting.noRoomListImage,
            noAvatarImages: state.setting.noAvatarImages,
            roomListRoutePath: state.setting.roomListRoutePath,
            messageRoutePath: state.setting.messageRoutePath,
            selectContactRoutePath: state.setting.selectContactRoutePath,
            roomListTabbar: state.setting.roomListTabbar,
        };
    }
    return {};
};
var mapDispatchToProps = function (dispatch, ownProps) {
    dispatch;
    ownProps; // TODO
    return {};
};
exports.ContainerRoomListPage = react_router_dom_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(RoomListPage));
//# sourceMappingURL=RoomListPage.js.map