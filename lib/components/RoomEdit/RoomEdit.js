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
var RoomEdit = (function (_super) {
    __extends(RoomEdit, _super);
    function RoomEdit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onInputTextChange = function (e) {
            _this.props.roomUpdateName(e.target.value);
        };
        return _this;
    }
    RoomEdit.prototype.componentDidMount = function () {
        this.inputTextDom.value = this.props.roomName;
    };
    RoomEdit.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "room-edit-root" },
            React.createElement(_1.PhotoEdit, { src: this.props.roomPictureUrl, width: 120, height: 120, onUpdatePhoto: this.props.roomUpdatePicture }),
            React.createElement("input", { className: "room-edit-input-text", ref: function (child) { return _this.inputTextDom = child; }, type: "text", placeholder: "グループ名を入力", onChange: this.onInputTextChange.bind(this) })));
    };
    return RoomEdit;
}(React.Component));
exports.RoomEdit = RoomEdit;
//# sourceMappingURL=RoomEdit.js.map