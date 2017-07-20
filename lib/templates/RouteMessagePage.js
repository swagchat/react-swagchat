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
var plugin_1 = require("../actions/plugin");
var setting_1 = require("../actions/setting");
var message_1 = require("../actions/message");
var combined_1 = require("../actions/combined");
var stores_1 = require("../stores");
var _1 = require("../containers/");
var message_2 = require("../plugins/message");
var utils_1 = require("../utils");
var RouteMessagePage = (function (_super) {
    __extends(RouteMessagePage, _super);
    function RouteMessagePage(props, context) {
        var _this = _super.call(this, props, context) || this;
        var apiKey;
        var userId;
        var userAccessToken;
        if (props.route.userId) {
            apiKey = props.route.apiKey;
            userId = props.route.userId;
            userAccessToken = props.route.userAccessToken;
        }
        else if (props.userId) {
            apiKey = props.route.apiKey;
            userId = props.route.userId;
            userAccessToken = props.route.userAccessToken;
        }
        else {
            var scObj = utils_1.getAuthInfoFromStorage();
            apiKey = scObj.apiKey;
            userId = scObj.userId;
            userAccessToken = scObj.userAccessToken;
        }
        var scMessagePlugins = _this.props.route && _this.props.route.scMessagePlugins ? _this.props.route.scMessagePlugins : [
            new message_2.PluginMessageText(),
            new message_2.PluginMessageImage(),
        ];
        stores_1.store.dispatch(plugin_1.setPluginMessageActionCreator(scMessagePlugins));
        var scCustomMessagePlugins = _this.props.route && _this.props.route.scMessagePlugins ? _this.props.route.scMessagePlugins : [
            new message_2.PluginMessageText(),
            new message_2.PluginMessageImage(),
            new message_2.PluginMessageImage(),
        ];
        stores_1.store.dispatch(plugin_1.setCustomPluginMessageActionCreator(scCustomMessagePlugins));
        stores_1.store.dispatch(message_1.clearMessagesActionCreator());
        stores_1.store.dispatch(setting_1.setNoMessageTextActionCreator(props.route ? props.route.noMessageText : props.noMessageText));
        stores_1.store.dispatch(setting_1.setNoMessageImageActionCreator(props.route ? props.route.noMessageImage : props.noMessageImage));
        stores_1.store.dispatch(setting_1.setInputMessagePlaceholderTextActionCreator(props.route ? props.route.inputMessagePlaceholderText : props.inputMessagePlaceholderText));
        stores_1.store.dispatch(combined_1.combinedUserAndRoomAndMessagesFetchRequestActionCreator(apiKey, props.route ? props.route.apiEndpoint : props.apiEndpoint, props.route ? props.route.realtimeEndpoint : props.realtimeEndpoint, userId, userAccessToken, props.params.roomId));
        return _this;
    }
    RouteMessagePage.prototype.render = function () {
        return (React.createElement(react_redux_1.Provider, { store: stores_1.store },
            React.createElement(react_router_redux_1.ConnectedRouter, { history: stores_1.routerHistory },
                React.createElement(react_router_dom_1.Route, { exact: true, path: "", component: _1.ContainerMessagePage }))));
    };
    return RouteMessagePage;
}(React.Component));
exports.RouteMessagePage = RouteMessagePage;
exports.renderMessagePage = function (params) {
    ReactDom.render(React.createElement(RouteMessagePage, { noMessageText: params.noMessageText, noMessageImage: params.noMessageImage, inputMessagePlaceholderText: params.inputMessagePlaceholderText, renderDomId: params.renderDomId, apiKey: params.apiKey, apiEndpoint: params.apiEndpoint, realtimeEndpoint: params.realtimeEndpoint, userId: params.userId, userAccessToken: params.userAccessToken }), document.getElementById(params.renderDomId));
};
//# sourceMappingURL=RouteMessagePage.js.map