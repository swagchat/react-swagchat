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
var ReactDom = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var react_router_redux_1 = require("react-router-redux");
var react_redux_1 = require("react-redux");
var setting_1 = require("../actions/setting");
var message_1 = require("../actions/message");
var user_1 = require("../actions/user");
var stores_1 = require("../stores");
var _1 = require("../containers/");
var RouteRoomListPage = (function (_super) {
    __extends(RouteRoomListPage, _super);
    function RouteRoomListPage(props, context) {
        var _this = _super.call(this, props, context) || this;
        stores_1.store.dispatch(message_1.clearMessagesActionCreator());
        stores_1.store.dispatch(setting_1.setRoomListTitleActionCreator(props.route ? props.route.roomListTitle : props.roomListTitle));
        stores_1.store.dispatch(setting_1.setRoomListTabbarActionCreator(props.route ? props.route.tabbar : props.tabbar));
        stores_1.store.dispatch(setting_1.setNoRoomListTextActionCreator(props.route ? props.route.noRoomListText : props.noRoomListText));
        stores_1.store.dispatch(setting_1.setNoRoomListImageActionCreator(props.route ? props.route.noRoomListImage : props.noRoomListImage));
        stores_1.store.dispatch(setting_1.setRoomSettingTitleActionCreator(props.route ? props.route.roomSettingTitle : props.roomSettingTitle));
        stores_1.store.dispatch(setting_1.setRoomMembersTitleActionCreator(props.route ? props.route.roomMembersTitle : props.roomMembersTitle));
        stores_1.store.dispatch(user_1.setUserAuthParamsActionCreator(props.route ? props.route.apiKey : props.apiKey, props.route ? props.route.apiEndpoint : props.apiEndpoint, props.route ? props.route.realtimeEndpoint : props.realtimeEndpoint, props.route ? props.route.userId : props.userId, props.route ? props.route.userAccessToken : props.userAccessToken));
        stores_1.store.dispatch(user_1.userAuthRequestActionCreator());
        return _this;
    }
    RouteRoomListPage.prototype.render = function () {
        return (React.createElement(react_redux_1.Provider, { store: stores_1.store },
            React.createElement(react_router_redux_1.ConnectedRouter, { history: stores_1.routerHistory },
                React.createElement(react_router_dom_1.Route, { component: _1.ContainerRoomListPage }))));
    };
    return RouteRoomListPage;
}(React.Component));
exports.RouteRoomListPage = RouteRoomListPage;
exports.renderRoomList = function (params) {
    ReactDom.render(React.createElement(RouteRoomListPage, { roomListTitle: params.roomListTitle, noRoomListText: params.noRoomListText, noRoomListImage: params.noRoomListImage, roomSettingTitle: params.roomSettingTitle, roomMembersTitle: params.roomMembersTitle, renderDomId: params.renderDomId, apiKey: params.apiKey, apiEndpoint: params.apiEndpoint, realtimeEndpoint: params.realtimeEndpoint, userId: params.userId, userAccessToken: params.userAccessToken }), document.getElementById(params.renderDomId));
};
//# sourceMappingURL=RouteRoomListPage.js.map