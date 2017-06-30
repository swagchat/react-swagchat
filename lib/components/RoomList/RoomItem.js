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
var RoomItem = (function (_super) {
    __extends(RoomItem, _super);
    function RoomItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoomItem.prototype.render = function () {
        var _a = this.props, myUserId = _a.myUserId, roomListItems = _a.roomListItems, userRoom = _a.userRoom, onClick = _a.onClick, customRoomListItems = _a.customRoomListItems;
        return (React.createElement("div", null, (function () {
            var item = null;
            if (customRoomListItems) {
                var plugin = customRoomListItems[userRoom.type]; // userRoom.type -> userRoom.customRoomListItem
                item = React.createElement(plugin.item, {
                    myUserId: myUserId,
                    userRoom: userRoom,
                    onClick: onClick,
                });
            }
            else {
                item = React.createElement(roomListItems[userRoom.type].item, {
                    myUserId: myUserId,
                    userRoom: userRoom,
                    onClick: onClick,
                });
            }
            return item;
        })()));
    };
    return RoomItem;
}(React.Component));
exports.RoomItem = RoomItem;
//# sourceMappingURL=RoomItem.js.map