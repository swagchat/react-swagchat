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
var RoomSettingModalItem_1 = require("./RoomSettingModalItem");
var _1 = require("../../");
var utils_1 = require("../../utils");
var RoomSettingList = (function (_super) {
    __extends(RoomSettingList, _super);
    function RoomSettingList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoomSettingList.prototype.onBlockItemTap = function () {
        var users = utils_1.opponentUser(this.props.roomState.room.users, this.props.userState.user.userId);
        if (users && users.length > 0) {
            if (this.props.userState.blocks && this.props.userState.blocks.indexOf(users[0].userId) >= 0) {
                this.props.userUnBlockFetch([users[0].userId]);
            }
            else {
                this.props.userBlockFetch([users[0].userId]);
            }
        }
    };
    RoomSettingList.prototype.onLeftItemTap = function () {
        this.props.roomUserRemoveFetch([this.props.userState.user.userId]);
    };
    RoomSettingList.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null, (function () {
            if (_this.props.roomState.room.type === swagchat_sdk_1.RoomType.ONE_ON_ONE) {
                var users = utils_1.opponentUser(_this.props.roomState.room.users, _this.props.userState.user.userId);
                var title = 'ブロックする';
                var modalDescription = 'ブロックしますか？';
                if (users && users.length > 0 && users[0].isCanBlock) {
                    if (_this.props.userState.blocks && _this.props.userState.blocks.indexOf(users[0].userId) >= 0) {
                        title = 'ブロックを解除する';
                        modalDescription = 'ブロックを解除しますか？';
                    }
                    var blockActions = [
                        { name: 'はい', onItemTap: _this.onBlockItemTap.bind(_this) },
                        { name: 'いいえ', onItemTap: function () { } },
                    ];
                    return (React.createElement("div", { className: "room-setting-list-root" },
                        React.createElement(RoomSettingModalItem_1.RoomSettingModalItem, { title: title, leftIcon: React.createElement(_1.Button, { icon: React.createElement(_1.Block, null) }), modalKey: "block", modalDescription: modalDescription, modalActions: blockActions, styleState: _this.props.styleState, updateStyle: _this.props.updateStyle })));
                }
                return null;
            }
            else {
                if (_this.props.roomState.room.isCanLeft) {
                    var blockActions = [
                        { name: 'はい', onItemTap: _this.onLeftItemTap.bind(_this) },
                        { name: 'いいえ', onItemTap: function () { } },
                    ];
                    return (React.createElement("div", { className: "room-setting-list-root" },
                        React.createElement(RoomSettingModalItem_1.RoomSettingModalItem, { title: "退会する", leftIcon: React.createElement(_1.Button, { icon: React.createElement(_1.Exit, null) }), modalKey: "left", modalDescription: "退会しますか？", modalActions: blockActions, styleState: _this.props.styleState, updateStyle: _this.props.updateStyle })));
                }
                return null;
            }
        })()));
    };
    return RoomSettingList;
}(React.Component));
RoomSettingList.defaultProps = {
    title: '',
    desableMarginTop: true,
    displayNoDataImage: '',
    displayNoDataText: '',
};
exports.RoomSettingList = RoomSettingList;
//# sourceMappingURL=RoomSettingList.js.map