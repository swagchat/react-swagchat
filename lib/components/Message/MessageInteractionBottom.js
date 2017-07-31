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
var MessageInteractionBottom = (function (_super) {
    __extends(MessageInteractionBottom, _super);
    function MessageInteractionBottom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageInteractionBottom.prototype.render = function () {
        var _a = this.props, userState = _a.userState, roomState = _a.roomState, styleState = _a.styleState, settingState = _a.settingState, pluginState = _a.pluginState, currentMenuIndex = _a.currentMenuIndex, onTextareaBlur = _a.onTextareaBlur, onTextareaFocus = _a.onTextareaFocus, createMessage = _a.createMessage, sendMessages = _a.sendMessages, updateMenuIndex = _a.updateMenuIndex, updateStyle = _a.updateStyle, updatePluginMessageTextInteractionStyle = _a.updatePluginMessageTextInteractionStyle, updateRoom = _a.updateRoom, assetPostAndSendMessage = _a.assetPostAndSendMessage, availableMessageTypes = _a.availableMessageTypes;
        var bottomPluginCount = 0;
        if (availableMessageTypes && availableMessageTypes.length > 0) {
            for (var i = 0; i < pluginState.customMessages.length; i++) {
                var plugin = pluginState.messages[i];
                if (plugin.position === 'BOTTOM') {
                    bottomPluginCount++;
                }
            }
        }
        else {
            for (var i = 0; i < pluginState.messages.length; i++) {
                var plugin = pluginState.messages[i];
                if (plugin.position === 'BOTTOM') {
                    bottomPluginCount++;
                }
            }
        }
        return (React.createElement("div", { className: "message-interaction-root", style: bottomPluginCount === 1 ? { marginLeft: '10px' } : {} }, (function () {
            var availableMessageType;
            var interaction = new Array;
            interaction.push(React.createElement(pluginState.customMessages[0].interaction, {
                key: 'message-interaction' + pluginState.customMessages[0].interaction.name,
                ownInteractionIndex: currentMenuIndex,
                currentMenuIndex: currentMenuIndex,
                styleState: styleState,
                settingState: settingState,
                userState: userState,
                roomState: roomState,
                position: 'BOTTOM',
                onTextareaFocus: onTextareaFocus,
                onTextareaBlur: onTextareaBlur,
                createMessage: createMessage,
                sendMessages: sendMessages,
                updateStyle: updateStyle,
                updatePluginMessageTextInteractionStyle: updatePluginMessageTextInteractionStyle,
                updateMenuIndex: updateMenuIndex,
                assetPostAndSendMessage: assetPostAndSendMessage,
                updateRoom: updateRoom,
            }));
            if (availableMessageTypes && availableMessageTypes.length > 0) {
                for (var i = 0; i < availableMessageTypes.length; i++) {
                    availableMessageType = availableMessageTypes[i];
                    for (var j = 0; j < pluginState.customMessages.length; j++) {
                        var plugin = pluginState.customMessages[j];
                        if (plugin.name === availableMessageType) {
                            var plugin_1 = pluginState.customMessages[currentMenuIndex];
                            if (plugin_1.interaction.name !== 'TextInteraction' && plugin_1.position === 'BOTTOM') {
                                interaction.push(React.createElement(plugin_1.interaction, {
                                    key: 'message-interaction-' + j,
                                    ownInteractionIndex: currentMenuIndex,
                                    currentMenuIndex: currentMenuIndex,
                                    styleState: styleState,
                                    settingState: settingState,
                                    userState: userState,
                                    roomState: roomState,
                                    position: 'BOTTOM',
                                    onTextareaFocus: onTextareaFocus,
                                    onTextareaBlur: onTextareaBlur,
                                    createMessage: createMessage,
                                    sendMessages: sendMessages,
                                    updateStyle: updateStyle,
                                    updatePluginMessageTextInteractionStyle: updatePluginMessageTextInteractionStyle,
                                    updateMenuIndex: updateMenuIndex,
                                    assetPostAndSendMessage: assetPostAndSendMessage,
                                    updateRoom: updateRoom,
                                }));
                            }
                        }
                    }
                }
            }
            else {
                var plugin = pluginState.customMessages[currentMenuIndex];
                if (plugin.interaction.name !== 'TextInteraction' && plugin.position === 'BOTTOM') {
                    interaction.push(React.createElement(plugin.interaction, {
                        key: 'message-interaction-' + plugin.interaction.name,
                        ownInteractionIndex: currentMenuIndex,
                        currentMenuIndex: currentMenuIndex,
                        styleState: styleState,
                        settingState: settingState,
                        userState: userState,
                        roomState: roomState,
                        position: 'BOTTOM',
                        onTextareaFocus: onTextareaFocus,
                        onTextareaBlur: onTextareaBlur,
                        createMessage: createMessage,
                        sendMessages: sendMessages,
                        updateStyle: updateStyle,
                        updatePluginMessageTextInteractionStyle: updatePluginMessageTextInteractionStyle,
                        updateMenuIndex: updateMenuIndex,
                        assetPostAndSendMessage: assetPostAndSendMessage,
                        updateRoom: updateRoom,
                    }));
                }
            }
            return interaction;
        })()));
    };
    return MessageInteractionBottom;
}(React.Component));
exports.MessageInteractionBottom = MessageInteractionBottom;
//# sourceMappingURL=MessageInteractionBottom.js.map