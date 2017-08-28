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
var setting_1 = require("swagchat-sdk/src/actions/setting");
var user_1 = require("swagchat-sdk/src/actions/user");
var stores_1 = require("swagchat-sdk/src/stores");
var _1 = require("../containers/");
var utils_1 = require("../utils");
var RouteRoomListPage = (function (_super) {
    __extends(RouteRoomListPage, _super);
    function RouteRoomListPage(props, context) {
        var _this = _super.call(this, props, context) || this;
        var apiKey;
        var userId;
        var userAccessToken;
        if (props.route && props.route.userId) {
            apiKey = props.route.apiKey;
            userId = props.route.userId;
            userAccessToken = props.route.userAccessToken;
        }
        else if (props.userId) {
            apiKey = props.apiKey;
            userId = props.userId;
            userAccessToken = props.userAccessToken;
        }
        else {
            var scObj = utils_1.getAuthInfoFromStorage();
            apiKey = scObj.apiKey;
            userId = scObj.userId;
            userAccessToken = scObj.userAccessToken;
        }
        stores_1.store.dispatch(setting_1.setRoomListTitleActionCreator(props.route ? props.route.roomListTitle : props.roomListTitle));
        stores_1.store.dispatch(setting_1.setRoomListTabbarActionCreator(props.route ? props.route.tabbar : props.tabbar));
        stores_1.store.dispatch(setting_1.setNoRoomListTextActionCreator(props.route ? props.route.noRoomListText : props.noRoomListText));
        stores_1.store.dispatch(setting_1.setNoRoomListImageActionCreator(props.route ? props.route.noRoomListImage : props.noRoomListImage));
        stores_1.store.dispatch(setting_1.setRoomSettingTitleActionCreator(props.route ? props.route.roomSettingTitle : props.roomSettingTitle));
        stores_1.store.dispatch(setting_1.setRoomMembersTitleActionCreator(props.route ? props.route.roomMembersTitle : props.roomMembersTitle));
        stores_1.store.dispatch(setting_1.setNoAvatarImagesActionCreator(props.route ? props.route.noAvatarImages : props.noAvatarImages));
        stores_1.store.dispatch(setting_1.setRoomListRoutePathActionCreator(props.route ? props.route.roomListRoutePath : props.roomListRoutePath));
        stores_1.store.dispatch(setting_1.setMessageRoutePathActionCreator(props.route ? props.route.messageRoutePath : props.messageRoutePath));
        stores_1.store.dispatch(setting_1.setSelectContactRoutePathActionCreator(props.route ? props.route.selectContactRoutePath : props.selectContactRoutePath));
        stores_1.store.dispatch(user_1.setUserAuthParamsActionCreator(apiKey, props.route ? props.route.apiEndpoint : props.apiEndpoint, props.route ? props.route.realtimeEndpoint : props.realtimeEndpoint, userId, userAccessToken));
        return _this;
    }
    RouteRoomListPage.prototype.render = function () {
        return (React.createElement(react_redux_1.Provider, { store: stores_1.store },
            React.createElement(react_router_redux_1.ConnectedRouter, { history: stores_1.routerHistory },
                React.createElement(react_router_dom_1.Route, { path: stores_1.store.getState().setting.roomListRoutePath, component: _1.ContainerRoomListPage }))));
    };
    return RouteRoomListPage;
}(React.Component));
exports.RouteRoomListPage = RouteRoomListPage;
exports.renderRoomList = function (params) {
    ReactDom.render(React.createElement(RouteRoomListPage, { roomListTitle: params.roomListTitle, noRoomListText: params.noRoomListText, noRoomListImage: params.noRoomListImage, roomSettingTitle: params.roomSettingTitle, roomMembersTitle: params.roomMembersTitle, renderDomId: params.renderDomId, apiKey: params.apiKey, apiEndpoint: params.apiEndpoint, realtimeEndpoint: params.realtimeEndpoint, userId: params.userId, userAccessToken: params.userAccessToken, noAvatarImages: params.noAvatarImages ? params.noAvatarImages : ['https://unpkg.com/react-swagchat/dist/img/normal.png', 'https://unpkg.com/react-swagchat/dist/img/sad.png', 'https://unpkg.com/react-swagchat/dist/img/smile.png'], roomListRoutePath: params.roomListRoutePath, messageRoutePath: params.messageRoutePath, selectContactRoutePath: params.selectContactRoutePath }), document.getElementById(params.renderDomId));
};
//# sourceMappingURL=RouteRoomListPage.js.map