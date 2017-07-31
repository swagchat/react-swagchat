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
var MessageMenuTop = (function (_super) {
    __extends(MessageMenuTop, _super);
    function MessageMenuTop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageMenuTop.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "message-menu-top-root" }, (function () {
            var availableMessageType;
            var menus = new Array;
            if (_this.props.availableMessageTypes && _this.props.availableMessageTypes.length > 0) {
                for (var i = 0; i < _this.props.availableMessageTypes.length; i++) {
                    availableMessageType = _this.props.availableMessageTypes[i];
                    for (var j = 0; j < _this.props.pluginState.customMessages.length; j++) {
                        var plugin = _this.props.pluginState.customMessages[j];
                        if (plugin.name === availableMessageType && plugin.name !== 'TextMenu' && plugin.position === 'TOP') {
                            menus.push(React.createElement(_this.props.pluginState.customMessages[_this.props.currentMenuIndex].menu, {
                                key: 'plugin-message-interaction-' + i,
                                userState: _this.props.userState,
                                roomState: _this.props.roomState,
                                ownMenuIndex: i,
                                currentMenuIndex: _this.props.currentMenuIndex,
                                updateMenuIndex: _this.props.updateMenuIndex,
                            }));
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < _this.props.pluginState.messages.length; i++) {
                    var plugin = _this.props.pluginState.messages[i];
                    if (plugin.menu.name !== 'TextMenu' && plugin.position === 'TOP') {
                        menus.push(React.createElement(plugin.menu, {
                            key: 'plugin-message-interaction-' + i,
                            userState: _this.props.userState,
                            roomState: _this.props.roomState,
                            ownMenuIndex: i,
                            currentMenuIndex: _this.props.currentMenuIndex,
                            updateMenuIndex: _this.props.updateMenuIndex,
                        }));
                    }
                }
            }
            return menus;
        })()));
    };
    return MessageMenuTop;
}(React.Component));
exports.MessageMenuTop = MessageMenuTop;
//# sourceMappingURL=MessageMenuTop.js.map