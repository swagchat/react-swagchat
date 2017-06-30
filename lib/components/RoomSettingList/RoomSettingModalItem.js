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
var _1 = require("../../");
var RoomSettingModalItem = (function (_super) {
    __extends(RoomSettingModalItem, _super);
    function RoomSettingModalItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initialInteractionStyle = {
            roomSettingModalItemStyle: {
                modal: (_a = {},
                    _a[_this.props.modalKey] = {
                        isDisplay: false,
                    },
                    _a)
            }
        };
        return _this;
        var _a;
    }
    RoomSettingModalItem.prototype.componentDidMount = function () {
        this.props.updateStyle(this.initialInteractionStyle);
    };
    RoomSettingModalItem.prototype.onItemTap = function () {
        this.props.updateStyle({
            roomSettingModalItemStyle: {
                modal: (_a = {},
                    _a[this.props.modalKey] = {
                        isDisplay: true,
                    },
                    _a)
            }
        });
        var _a;
    };
    RoomSettingModalItem.prototype.onCloseTap = function () {
        this.props.updateStyle({
            roomSettingModalItemStyle: {
                modal: (_a = {},
                    _a[this.props.modalKey] = {
                        isDisplay: false,
                    },
                    _a)
            }
        });
        var _a;
    };
    RoomSettingModalItem.prototype.render = function () {
        var style = this.props.styleState;
        var roomSettingModalItemStyle = style.roomSettingModalItemStyle;
        if (!roomSettingModalItemStyle) {
            return React.createElement("div", null);
        }
        return (React.createElement("div", null,
            React.createElement("div", { className: "room-setting-modal-item-root", onClick: this.onItemTap.bind(this) },
                React.createElement("div", { className: "room-setting-modal-item-flex1" }, this.props.leftIcon ? this.props.leftIcon : ''),
                React.createElement("div", { className: "room-setting-modal-item-flex2" },
                    React.createElement("span", null, this.props.title)),
                React.createElement("div", { className: "room-setting-modal-item-flex3" }, this.props.rightIcon ? this.props.rightIcon : '')),
            roomSettingModalItemStyle.modal && roomSettingModalItemStyle.modal[this.props.modalKey] && roomSettingModalItemStyle.modal[this.props.modalKey].isDisplay ? (React.createElement(_1.Modal, { description: this.props.modalDescription, actions: this.props.modalActions, onCloseTap: this.onCloseTap.bind(this) })) : null));
    };
    return RoomSettingModalItem;
}(React.Component));
exports.RoomSettingModalItem = RoomSettingModalItem;
//# sourceMappingURL=RoomSettingModalItem.js.map