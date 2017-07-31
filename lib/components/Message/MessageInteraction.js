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
var MessageInteraction = (function (_super) {
    __extends(MessageInteraction, _super);
    function MessageInteraction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageInteraction.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "message-interaction-root" }, (function () {
            var availableMessageType;
            var interaction = new Array;
            interaction.push(React.createElement(_this.props.pluginState.customMessages[0].interaction, {
                key: 'message-interaction' + _this.props.pluginState.customMessages[0].interaction.name,
                ownInteractionIndex: _this.props.currentMenuIndex,
                currentMenuIndex: _this.props.currentMenuIndex,
                styleState: _this.props.styleState,
                settingState: _this.props.settingState,
                userState: _this.props.userState,
                roomState: _this.props.roomState,
                onTextareaFocus: _this.props.onTextareaFocus,
                onTextareaBlur: _this.props.onTextareaBlur,
                createMessage: _this.props.createMessage,
                sendMessages: _this.props.sendMessages,
                updateStyle: _this.props.updateStyle,
                updatePluginMessageTextInteractionStyle: _this.props.updatePluginMessageTextInteractionStyle,
                updateMenuIndex: _this.props.updateMenuIndex,
                assetPostAndSendMessage: _this.props.assetPostAndSendMessage,
                updateRoom: _this.props.updateRoom,
            }));
            if (_this.props.availableMessageTypes && _this.props.availableMessageTypes.length > 0) {
                for (var i = 0; i < _this.props.availableMessageTypes.length; i++) {
                    availableMessageType = _this.props.availableMessageTypes[i];
                    for (var j = 0; j < _this.props.pluginState.customMessages.length; j++) {
                        var plugin = _this.props.pluginState.customMessages[j];
                        if (plugin.name === availableMessageType) {
                            var pluginInteraction = _this.props.pluginState.customMessages[_this.props.currentMenuIndex].interaction;
                            if (pluginInteraction.name !== 'TextInteraction') {
                                interaction.push(React.createElement(pluginInteraction, {
                                    key: 'message-interaction-' + j,
                                    ownInteractionIndex: _this.props.currentMenuIndex,
                                    currentMenuIndex: _this.props.currentMenuIndex,
                                    styleState: _this.props.styleState,
                                    settingState: _this.props.settingState,
                                    userState: _this.props.userState,
                                    roomState: _this.props.roomState,
                                    onTextareaFocus: _this.props.onTextareaFocus,
                                    onTextareaBlur: _this.props.onTextareaBlur,
                                    createMessage: _this.props.createMessage,
                                    sendMessages: _this.props.sendMessages,
                                    updateStyle: _this.props.updateStyle,
                                    updatePluginMessageTextInteractionStyle: _this.props.updatePluginMessageTextInteractionStyle,
                                    updateMenuIndex: _this.props.updateMenuIndex,
                                    assetPostAndSendMessage: _this.props.assetPostAndSendMessage,
                                    updateRoom: _this.props.updateRoom,
                                }));
                            }
                        }
                    }
                }
            }
            else {
                var pluginInteraction = _this.props.pluginState.customMessages[_this.props.currentMenuIndex].interaction;
                if (pluginInteraction.name !== 'TextInteraction') {
                    interaction.push(React.createElement(pluginInteraction, {
                        key: 'message-interaction-' + pluginInteraction.name,
                        ownInteractionIndex: _this.props.currentMenuIndex,
                        currentMenuIndex: _this.props.currentMenuIndex,
                        styleState: _this.props.styleState,
                        settingState: _this.props.settingState,
                        userState: _this.props.userState,
                        roomState: _this.props.roomState,
                        onTextareaFocus: _this.props.onTextareaFocus,
                        onTextareaBlur: _this.props.onTextareaBlur,
                        createMessage: _this.props.createMessage,
                        sendMessages: _this.props.sendMessages,
                        updateStyle: _this.props.updateStyle,
                        updatePluginMessageTextInteractionStyle: _this.props.updatePluginMessageTextInteractionStyle,
                        updateMenuIndex: _this.props.updateMenuIndex,
                        assetPostAndSendMessage: _this.props.assetPostAndSendMessage,
                        updateRoom: _this.props.updateRoom,
                    }));
                }
            }
            return interaction;
        })()));
    };
    return MessageInteraction;
}(React.Component));
exports.MessageInteraction = MessageInteraction;
//# sourceMappingURL=MessageInteraction.js.map