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
var swagchat_sdk_1 = require("swagchat-sdk");
var utils_1 = require("../../../utils");
var components_1 = require("../../../components");
var utils_2 = require("../../../utils");
var RoomNameWithMessage = (function (_super) {
    __extends(RoomNameWithMessage, _super);
    function RoomNameWithMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoomNameWithMessage.prototype.onClick = function (room) {
        if (this.props.onClick) {
            this.props.onClick(room);
        }
    };
    RoomNameWithMessage.prototype.render = function () {
        var _a = this.props, myUserId = _a.myUserId, userRoom = _a.userRoom, noAvatarImages = _a.noAvatarImages;
        if (this.props.userRoom.roomId === '') {
            return React.createElement("div", null);
        }
        var userName = userRoom.name;
        var pictureUrl = userRoom.pictureUrl;
        if (userRoom.type === swagchat_sdk_1.RoomType.ONE_ON_ONE) {
            var users = utils_2.opponentUser(userRoom.users, myUserId);
            if (users) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].isShowUsers) {
                        userName += users[i].name + ' ';
                        pictureUrl = users[i].pictureUrl;
                    }
                }
            }
        }
        return (React.createElement("div", { className: "room-name-with-message-root", onClick: this.onClick.bind(this, userRoom) },
            React.createElement("div", { className: "room-name-with-message-flex1" },
                React.createElement(components_1.Avatar, { src: pictureUrl ? pictureUrl : noAvatarImages[0], className: "room-name-with-message-avatar" })),
            React.createElement("div", { className: "room-name-with-message-flex2" },
                React.createElement("div", { className: "room-name-with-message-subject" }, userName),
                React.createElement("div", { className: "room-name-with-message-description" }, userRoom.lastMessage)),
            React.createElement("div", { className: "room-name-with-message-flex3" },
                React.createElement("p", { className: "room-name-with-message-datetime" }, userRoom.lastMessageUpdated ? utils_1.dateHumanize(userRoom.lastMessageUpdated) : ''),
                userRoom.ruUnreadCount > 0 ? React.createElement(components_1.Badge, { className: "room-name-with-message-badge", count: userRoom.ruUnreadCount }) : null)));
    };
    return RoomNameWithMessage;
}(React.Component));
exports.RoomNameWithMessage = RoomNameWithMessage;
//# sourceMappingURL=RoomNameWithMessage.js.map