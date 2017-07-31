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
var _1 = require("../../../");
var ImageInteraction = (function (_super) {
    __extends(ImageInteraction, _super);
    function ImageInteraction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initialInteractionStyle = {
            pluginMessageImageInteractionStyle: {
                display: 'none',
            },
        };
        return _this;
    }
    ImageInteraction.prototype.componentDidMount = function () {
        this.props.updateStyle(this.initialInteractionStyle);
        if (this.inputFileDom) {
            this.inputFileDom.click();
        }
    };
    ImageInteraction.prototype.onFileUploadChange = function (e) {
        this.selectImage = e.target.files[0];
        if (!this.selectImage.type.match('image.*')) {
            return;
        }
        var reader = new FileReader();
        var self = this;
        reader.onload = (function () {
            return function (e) {
                self.confirmImageDOM.src = e.target.result;
                self.props.updateStyle({
                    pluginMessageImageInteractionStyle: {
                        display: 'block',
                    }
                });
            };
        }.bind(this))(this.selectImage);
        reader.readAsDataURL(this.selectImage);
    };
    ImageInteraction.prototype.onConfirmClose = function () {
        this.props.updateStyle(this.initialInteractionStyle);
        this.props.updateMenuIndex(0);
    };
    ImageInteraction.prototype.onFileUploadRequest = function () {
        this.confirmImageDOM.src = '';
        this.props.updateStyle(this.initialInteractionStyle);
        this.props.updateMenuIndex(0);
        this.props.assetPostAndSendMessage(this.selectImage);
        this.selectImage = null;
    };
    ImageInteraction.prototype.render = function () {
        var _this = this;
        var style = this.props.styleState;
        var pluginMessageImageInteractionStyle = style.pluginMessageImageInteractionStyle;
        return (React.createElement("div", { className: "image-interaction-root", style: pluginMessageImageInteractionStyle ? pluginMessageImageInteractionStyle : {} },
            React.createElement("div", { className: this.props.position === 'TOP' ? 'image-interaction-confirm-wrap-top' : 'image-interaction-confirm-wrap-bottom', style: pluginMessageImageInteractionStyle ? pluginMessageImageInteractionStyle : {} },
                React.createElement(_1.Button, { icon: React.createElement(_1.Close, { style: { color: 'white' } }), onClick: this.onConfirmClose.bind(this), className: "image-interaction-close-icon" }),
                React.createElement("img", { id: "confirmImage", ref: function (child) { return _this.confirmImageDOM = child; }, role: "presentation", className: "image-interaction-confirm-image", onClick: this.onFileUploadRequest.bind(this) })),
            React.createElement("input", { type: "file", ref: function (child) { return _this.inputFileDom = child; }, className: "image-interaction-input", accept: "image/*", onChange: this.onFileUploadChange.bind(this) })));
    };
    return ImageInteraction;
}(React.Component));
exports.ImageInteraction = ImageInteraction;
//# sourceMappingURL=ImageInteraction.js.map