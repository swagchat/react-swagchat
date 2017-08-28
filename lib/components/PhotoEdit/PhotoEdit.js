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
var components_1 = require("../../components");
var classNames = require('classnames');
var PhotoEdit = (function (_super) {
    __extends(PhotoEdit, _super);
    function PhotoEdit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onFileUploadChange = function (e) {
            _this.selectImage = e.target.files[0];
            if (!_this.selectImage.type.match('image.*')) {
                return;
            }
            var reader = new FileReader();
            var self = _this;
            reader.onload = (function () {
                return function (e) {
                    self.confirmImageDOM.src = e.target.result;
                };
            }.bind(_this))(_this.selectImage);
            reader.readAsDataURL(_this.selectImage);
            _this.props.onUpdatePhoto(_this.selectImage);
        };
        _this.onPhoto = function (e) {
            e.preventDefault();
            _this.inputFileDom.click();
        };
        return _this;
    }
    PhotoEdit.prototype.render = function () {
        var _this = this;
        var style = {};
        if (this.props.width) {
            style.width = this.props.width + 'px';
        }
        if (this.props.height) {
            style.height = this.props.height + 'px';
        }
        if (this.props.margin) {
            style.margin = this.props.margin + 'px';
        }
        return (React.createElement("div", null,
            React.createElement("img", { src: this.props.src, ref: function (child) { return _this.confirmImageDOM = child; }, className: classNames('avatar', this.props.className), style: style, onClick: this.props.onClick }),
            React.createElement(components_1.Button, { className: "photo-edit-button", icon: React.createElement(components_1.Photo, { className: "photo-edit-icon" }), onClick: this.onPhoto.bind(this) }),
            React.createElement("input", { type: "file", ref: function (child) { return _this.inputFileDom = child; }, className: "image-interaction-input", accept: "image/*", onChange: this.onFileUploadChange.bind(this) })));
    };
    return PhotoEdit;
}(React.Component));
exports.PhotoEdit = PhotoEdit;
//# sourceMappingURL=PhotoEdit.js.map