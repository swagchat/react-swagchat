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
var utils_1 = require("../../utils");
var _1 = require("../../");
var MessageBody = (function (_super) {
    __extends(MessageBody, _super);
    function MessageBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageBody.prototype.render = function () {
        var _a = this.props, messageState = _a.messageState, settingState = _a.settingState, pluginState = _a.pluginState, roomState = _a.roomState, userState = _a.userState, styleState = _a.styleState, createMessage = _a.createMessage, sendMessages = _a.sendMessages, updateStyle = _a.updateStyle, updateMenuIndex = _a.updateMenuIndex, updateRoom = _a.updateRoom, assetPostAndSendMessage = _a.assetPostAndSendMessage;
        return (React.createElement("div", { className: "message-body-root" },
            (function () {
                if (!(messageState.messages && Object.keys(messageState.messages).length > 0)) {
                    return (React.createElement("div", { className: "nodata-wrap" },
                        settingState.noMessageImage !== '' ? React.createElement("img", { className: "nodata-image", src: settingState.noMessageImage }) : '',
                        React.createElement("p", { className: "nodata-text" }, settingState.noMessageText !== '' ? settingState.noMessageText : '')));
                }
                var messageItems = new Array;
                var workMMDD = '';
                var itemMMDD = '';
                for (var messageId in messageState.messages) {
                    itemMMDD = utils_1.dateFormateMMDD(messageState.messages[messageId].created);
                    if (workMMDD !== itemMMDD) {
                        messageItems.push(React.createElement(_1.MessageDateSeparator, { key: 'date-separator-' + messageState.messages[messageId].messageId, date: itemMMDD }));
                    }
                    workMMDD = itemMMDD;
                    messageItems.push(React.createElement(_1.MessageItem, { key: 'message-item-' + messageState.messages[messageId].messageId, pluginState: pluginState, message: messageState.messages[messageId], user: roomState.roomUsers[messageState.messages[messageId].userId], myUserId: userState.user.userId }));
                }
                return messageItems;
            })(),
            React.createElement(_1.MessageInteraction, { pluginState: pluginState, currentMenuIndex: pluginState.currentMenuIndex, styleState: styleState, settingState: settingState, userState: userState, roomState: roomState, createMessage: createMessage, sendMessages: sendMessages, updateStyle: updateStyle, updateMenuIndex: updateMenuIndex, assetPostAndSendMessage: assetPostAndSendMessage, availableMessageTypes: roomState.room.availableMessageTypes, updateRoom: updateRoom }),
            React.createElement(_1.MessageMenu, { pluginState: pluginState, userState: userState, roomState: roomState, currentMenuIndex: pluginState.currentMenuIndex, updateMenuIndex: updateMenuIndex, availableMessageTypes: roomState.room.availableMessageTypes })));
    };
    return MessageBody;
}(React.Component));
exports.MessageBody = MessageBody;
//# sourceMappingURL=MessageBody.js.map