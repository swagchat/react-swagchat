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
var MessageItem = (function (_super) {
    __extends(MessageItem, _super);
    function MessageItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageItem.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null, (function () {
            var node = null;
            _this.props.pluginState.messages.forEach(function (plugin) {
                if (plugin.name === _this.props.message.type) {
                    node = React.createElement(plugin.item, {
                        message: _this.props.message,
                        user: _this.props.user,
                        myUserId: _this.props.myUserId,
                    });
                    return;
                }
            });
            return node;
        })()));
    };
    return MessageItem;
}(React.Component));
exports.MessageItem = MessageItem;
//# sourceMappingURL=MessageItem.js.map