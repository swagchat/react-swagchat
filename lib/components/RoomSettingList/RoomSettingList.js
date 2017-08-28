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
var components_1 = require("../../components");
var components_2 = require("../../components");
var utils_1 = require("../../utils");
var RoomSettingList = (function (_super) {
    __extends(RoomSettingList, _super);
    function RoomSettingList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onBlockItemTap = function () {
            var users = utils_1.opponentUser(_this.props.roomState.room.users, _this.props.userState.user.userId);
            if (users && users.length > 0) {
                if (_this.props.userState.blocks && _this.props.userState.blocks.indexOf(users[0].userId) >= 0) {
                    _this.props.userUnBlockFetch([users[0].userId]);
                }
                else {
                    _this.props.userBlockFetch([users[0].userId]);
                }
            }
            _this.modalViewTap('block', false);
        };
        _this.onRoomEditOkClick = function () {
            _this.modalViewTap('roomEdit', false);
            _this.props.assetPostAndRoomUpdate();
        };
        _this.onLeftItemTap = function () {
            _this.props.roomUserRemoveFetch([_this.props.userState.user.userId]);
        };
        _this.modalViewTap = function (modalKey, isDisplay) {
            _this.props.updateStyle({
                modalStyle: (_a = {},
                    _a[modalKey] = {
                        isDisplay: isDisplay,
                    },
                    _a)
            });
            var _a;
        };
        return _this;
    }
    RoomSettingList.prototype.render = function () {
        var _this = this;
        var _a = this.props, userState = _a.userState, roomState = _a.roomState, styleState = _a.styleState, settingState = _a.settingState, updateStyle = _a.updateStyle, roomUpdateName = _a.roomUpdateName, roomUpdatePicture = _a.roomUpdatePicture;
        return (React.createElement("div", null,
            React.createElement("div", { className: "room-setting-list-root" }, (function () {
                if (roomState.room.type === swagchat_sdk_1.RoomType.ONE_ON_ONE) {
                    var users = utils_1.opponentUser(roomState.room.users, userState.user.userId);
                    var title = 'ブロックする';
                    var modalDescription = 'ブロックしますか？';
                    if (users && users.length > 0 && users[0].isCanBlock) {
                        if (userState.blocks && userState.blocks.indexOf(users[0].userId) >= 0) {
                            title = 'ブロックを解除する';
                            modalDescription = 'ブロックを解除しますか？';
                        }
                        var blockActions = [
                            { name: 'はい', type: 'positive', onItemTap: _this.onBlockItemTap.bind(_this) },
                            { name: 'いいえ', type: 'negative', onItemTap: _this.modalViewTap.bind(_this, 'block', false) },
                        ];
                        return (React.createElement("div", { className: "room-setting-list-root" },
                            React.createElement(components_1.IconListItem, { title: title, leftIcon: React.createElement(components_1.Button, { icon: React.createElement(components_1.Block, null) }), onClick: _this.modalViewTap.bind(_this, 'block', true) }),
                            React.createElement(components_1.ModalDialog, { modalKey: "block", description: modalDescription, actions: blockActions, styleState: styleState, updateStyle: updateStyle })));
                    }
                    return null;
                }
                else {
                    if (roomState.room.isCanLeft) {
                        var leftActions = [
                            { name: 'はい', type: 'positive', onItemTap: _this.onLeftItemTap.bind(_this) },
                            { name: 'いいえ', type: 'negative', onItemTap: _this.modalViewTap.bind(_this, 'left', false) },
                        ];
                        return (React.createElement("div", null,
                            React.createElement(components_1.IconListItem, { title: "グループ情報編集", leftIcon: React.createElement(components_1.Button, { icon: React.createElement(components_1.Edit, null) }), onClick: _this.modalViewTap.bind(_this, 'roomEdit', true) }),
                            React.createElement(components_1.ModalView, { title: "グループ情報編集", component: React.createElement(components_2.RoomEdit, { roomName: roomState.room.name, roomPictureUrl: roomState.room.pictureUrl ? roomState.room.pictureUrl : settingState.noAvatarImages[0], roomUpdateName: roomUpdateName, roomUpdatePicture: roomUpdatePicture }), modalKey: "roomEdit", styleState: styleState, updateStyle: updateStyle, onOkClick: _this.onRoomEditOkClick.bind(_this) }),
                            React.createElement(components_1.IconListItem, { title: "退出する", leftIcon: React.createElement(components_1.Button, { icon: React.createElement(components_1.Exit, null) }), onClick: _this.modalViewTap.bind(_this, 'left', true) }),
                            React.createElement(components_1.ModalDialog, { modalKey: "left", description: "退出しますか？", actions: leftActions, styleState: styleState, updateStyle: updateStyle })));
                    }
                    return null;
                }
            })())));
    };
    RoomSettingList.defaultProps = {
        title: '',
        desableMarginTop: true,
        displayNoDataImage: '',
        displayNoDataText: '',
    };
    return RoomSettingList;
}(React.Component));
exports.RoomSettingList = RoomSettingList;
//# sourceMappingURL=RoomSettingList.js.map