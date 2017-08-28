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
var utils_1 = require("../../../utils");
var components_1 = require("../../../components");
var TextItem = (function (_super) {
    __extends(TextItem, _super);
    function TextItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextItem.prototype.render = function () {
        var _a = this.props, message = _a.message, myUserId = _a.myUserId, user = _a.user;
        var payload = message.payload;
        var splitMessage = payload.text.split('\n');
        var displayText = new Array;
        splitMessage.forEach(function (value, index) {
            displayText.push(React.createElement("span", { key: 'text-item-' + message.messageId + '-' + index },
                value,
                React.createElement("br", null)));
        });
        if (user.userId === myUserId) {
            return (React.createElement("div", null,
                React.createElement("div", { className: "text-item-message-right" }, displayText),
                React.createElement("div", { className: "text-item-time-right" }, utils_1.dateFormateHHMM(message.created)),
                React.createElement("div", { className: "text-item-clear" })));
        }
        else {
            return (React.createElement("div", null,
                React.createElement(components_1.Avatar, { className: "text-item-avatar", src: user.pictureUrl }),
                React.createElement("p", { className: "text-item-name" }, user.name),
                React.createElement("div", { className: "text-item-message-left" }, payload.text),
                React.createElement("div", { className: "text-item-time-left" }, utils_1.dateFormateHHMM(message.created)),
                React.createElement("div", { className: "text-item-clear" })));
        }
    };
    return TextItem;
}(React.Component));
exports.TextItem = TextItem;
//# sourceMappingURL=TextItem.js.map