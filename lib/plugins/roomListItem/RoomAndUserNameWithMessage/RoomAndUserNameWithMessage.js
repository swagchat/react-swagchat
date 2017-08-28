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
var utils_2 = require("../../../utils");
var RoomAndUserNameWithMessage = (function (_super) {
    __extends(RoomAndUserNameWithMessage, _super);
    function RoomAndUserNameWithMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoomAndUserNameWithMessage.prototype.onClick = function (room) {
        if (this.props.onClick) {
            this.props.onClick(room);
        }
    };
    RoomAndUserNameWithMessage.prototype.render = function () {
        var _a = this.props, myUserId = _a.myUserId, userRoom = _a.userRoom, noAvatarImages = _a.noAvatarImages;
        if (userRoom.roomId === '') {
            return React.createElement("div", null);
        }
        var users = utils_2.opponentUser(userRoom.users, myUserId);
        var userNames = '';
        if (users) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].isShowUsers) {
                    userNames += users[i].name + ' ';
                }
            }
        }
        return (React.createElement("div", { className: "room-and-user-name-with-message-root", onClick: this.onClick.bind(this, userRoom) },
            React.createElement("div", { className: "room-and-user-name-with-message-flex1" },
                React.createElement(components_1.Avatar, { src: userRoom.pictureUrl ? userRoom.pictureUrl : noAvatarImages[0], className: "room-and-user-name-with-message-avatar" })),
            React.createElement("div", { className: "room-and-user-name-with-message-flex2" },
                React.createElement("div", { className: "room-and-user-name-with-message-subject" }, userRoom.name),
                React.createElement("div", { className: "room-and-user-name-with-message-username" }, userNames),
                React.createElement("div", { className: "room-and-user-name-with-message-description" }, userRoom.lastMessage)),
            React.createElement("div", { className: "room-and-user-name-with-message-flex3" },
                React.createElement("p", { className: "room-and-user-name-with-message-datetime" }, userRoom.lastMessageUpdated ? utils_1.dateHumanize(userRoom.lastMessageUpdated) : ''),
                userRoom.ruUnreadCount > 0 ? React.createElement(components_1.Badge, { className: "room-and-user-name-with-message-badge", count: userRoom.ruUnreadCount }) : null)));
    };
    return RoomAndUserNameWithMessage;
}(React.Component));
exports.RoomAndUserNameWithMessage = RoomAndUserNameWithMessage;
//# sourceMappingURL=RoomAndUserNameWithMessage.js.map