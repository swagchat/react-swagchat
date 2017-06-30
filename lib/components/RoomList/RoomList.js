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
var RoomItem_1 = require("./RoomItem");
var _1 = require("../../");
var RoomList = (function (_super) {
    __extends(RoomList, _super);
    function RoomList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoomList.prototype.onClick = function (room) {
        if (this.props.onClick) {
            this.props.onClick(room);
        }
    };
    RoomList.prototype.render = function () {
        var _this = this;
        var _a = this.props, myUserId = _a.myUserId, roomListItems = _a.roomListItems, title = _a.title, hasTopBar = _a.hasTopBar, hasTabBar = _a.hasTabBar, noRoomListText = _a.noRoomListText, noRoomListImage = _a.noRoomListImage, userRooms = _a.userRooms;
        var style = Object.assign({}, hasTopBar ? { marginTop: '47px' } : {}, hasTabBar ? { marginBottom: '57px' } : {});
        return (React.createElement("div", { className: "page-container", style: style },
            title ? React.createElement(_1.SubTitleBar, { title: title }) : null,
            (function () {
                if (userRooms && userRooms.length > 0) {
                    var roomItems = new Array;
                    for (var i = 0; i < userRooms.length; i++) {
                        roomItems.push(React.createElement(RoomItem_1.RoomItem, { key: i, roomListItems: roomListItems, myUserId: myUserId, userRoom: userRooms[i], onClick: _this.onClick.bind(_this) }));
                    }
                    return roomItems;
                }
                else {
                    return (React.createElement("div", { className: "nodata-wrap" },
                        noRoomListImage !== '' ? React.createElement("img", { className: "nodata-image", src: noRoomListImage }) : '',
                        React.createElement("p", { className: "nodata-text" }, noRoomListText !== '' ? noRoomListText : '')));
                }
            })()));
    };
    return RoomList;
}(React.Component));
RoomList.defaultProps = {
    hasTopBar: false,
};
exports.RoomList = RoomList;
//# sourceMappingURL=RoomList.js.map