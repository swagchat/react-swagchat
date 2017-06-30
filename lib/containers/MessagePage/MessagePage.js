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
var react_router_redux_1 = require("react-router-redux");
var react_redux_1 = require("react-redux");
var Scroll = require("react-scroll");
var lodash_1 = require("lodash");
var swagchat_sdk_1 = require("swagchat-sdk");
var utils_1 = require("../../utils");
var _1 = require("../../");
var stores_1 = require("../../stores");
var user_1 = require("../../actions/user");
var room_1 = require("../../actions/room");
var combined_1 = require("../../actions/combined");
var plugin_1 = require("../../actions/plugin");
var style_1 = require("../../actions/style");
var message_1 = require("../../actions/message");
var MessagePage = (function (_super) {
    __extends(MessagePage, _super);
    function MessagePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isReceiveMessagesFinished = false;
        _this.updateMessages = function () {
            if (!_this.props.roomState.room) {
                return;
            }
            _this.props.messagesFetchRequest();
            console.info('%c[ReactSwagChat]Loaded message count [' + Object.keys(_this.props.messageState.messages).length + ']', 'color:' + _1.logColor);
            if (_this.props.messageState.messagesAllCount <= Object.keys(_this.props.messageState.messages).length) {
                _this.isReceiveMessagesFinished = true;
            }
        };
        _this.handleScroll = function () {
            if (_this.isReceiveMessagesFinished) {
                console.info('%c[ReactSwagChat]Remove scroll EventListener', 'color:' + _1.logColor);
                window.removeEventListener('scroll', _this.onScroll);
                return;
            }
            if (document.body.scrollTop < 100) {
                _this.updateMessages();
            }
        };
        return _this;
    }
    MessagePage.prototype.componentDidMount = function () {
        this.onScroll = lodash_1.throttle(this.handleScroll, 100);
        console.info('%c[ReactSwagChat]Add scroll EventListener', 'color:' + _1.logColor);
        window.addEventListener('scroll', this.onScroll);
        this.props.updateMenuIndex(0);
        Scroll.animateScroll.scrollToBottom({ duration: 0 });
    };
    MessagePage.prototype.componentWillUnmount = function () {
        console.info('%c[ReactSwagChat]Remove scroll EventListener', 'color:' + _1.logColor);
        window.removeEventListener('scroll', this.onScroll);
        this.props.updateMenuIndex(0);
        this.props.roomState.room.unsubscribeMessage();
    };
    MessagePage.prototype.onRoomSetting = function () {
        if (this.props.history) {
            stores_1.store.dispatch(react_router_redux_1.push('/roomSetting/' + this.props.roomState.room.roomId));
        }
    };
    MessagePage.prototype.render = function () {
        if (!(this.props.roomState && this.props.roomState.room)) {
            return React.createElement("div", null);
        }
        var name = this.props.roomState.room.name ? this.props.roomState.room.name : '';
        var pictureUrl = this.props.roomState.room.pictureUrl ? this.props.roomState.room.pictureUrl : '';
        if (this.props.roomState.room.type === swagchat_sdk_1.RoomType.ONE_ON_ONE) {
            var users = utils_1.opponentUser(this.props.roomState.room.users, this.props.userState.user.userId);
            if (users && users.length > 0) {
                name = users[0].name;
                pictureUrl = users[0].pictureUrl;
            }
        }
        return (React.createElement("div", null,
            React.createElement(_1.TopBar, { title: name, leftButton: React.createElement(_1.Button, { icon: React.createElement(_1.Back, null), onClick: this.props.history.goBack }), rightButton: React.createElement(_1.Avatar, { onClick: this.onRoomSetting.bind(this), src: pictureUrl, width: 30, height: 30, margin: 9 }) }),
            React.createElement(_1.MessageBody, { pluginState: this.props.pluginState, userState: this.props.userState, roomState: this.props.roomState, messageState: this.props.messageState, styleState: this.props.styleState, createMessage: this.props.createMessage, sendMessages: this.props.sendMessages, updateMenuIndex: this.props.updateMenuIndex, updateStyle: this.props.updateStyle, settingState: this.props.settingState, assetPostAndSendMessage: this.props.assetPostAndSendMessage, markAsRead: this.props.markAsRead, updateRoom: this.props.updateRoom })));
    };
    return MessagePage;
}(React.Component));
exports.MessagePage = MessagePage;
var mapStateToProps = function (state) {
    if (state.client.client && state.user.user) {
        return {
            pluginState: state.plugin,
            clientState: state.client,
            userState: state.user,
            roomState: state.room,
            messageState: state.message,
            styleState: state.style,
            settingState: state.setting,
        };
    }
    return {};
};
var mapDispatchToProps = function (dispatch, ownProps) {
    ownProps; // TODO
    return {
        messagesFetchRequest: function () { return dispatch(message_1.messagesFetchRequestActionCreator()); },
        createMessage: function (messageType, payload) { return dispatch(message_1.createMessageActionCreator(messageType, payload)); },
        sendMessages: function () { return dispatch(message_1.sendMessagesActionCreator()); },
        updateMenuIndex: function (currentMenuIndex) { return dispatch(plugin_1.pluginMessageUpdateMenuIndexActionCreator(currentMenuIndex)); },
        updateStyle: function (style) { return dispatch(style_1.updateStyleActionCreator(style)); },
        assetPostAndSendMessage: function (file) { return dispatch(combined_1.combinedAssetPostAndSendMessageRequestActionCreator(file)); },
        markAsRead: function (roomId) { return dispatch(user_1.markAsReadRequestActionCreator(roomId)); },
        updateRoom: function (putRoom) { return dispatch(room_1.roomUpdateRequestActionCreator(putRoom)); },
    };
};
exports.ContainerMessagePage = react_router_dom_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MessagePage));
//# sourceMappingURL=MessagePage.js.map