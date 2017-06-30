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
var _1 = require("../../../");
var ImageItem = (function (_super) {
    __extends(ImageItem, _super);
    function ImageItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageItem.prototype.render = function () {
        var _a = this.props, message = _a.message, myUserId = _a.myUserId, user = _a.user;
        var payload = message.payload;
        if (user.userId === myUserId) {
            return (React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("img", { src: payload.sourceUrl, className: "image-item-message-right" }),
                    React.createElement("div", { className: "image-item-time-right" }, utils_1.dateFormateHHMM(message.created)),
                    React.createElement("div", { className: "image-item-clear" }))));
        }
        else {
            return (React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement(_1.Avatar, { className: "image-item-avatar", src: user.pictureUrl }),
                    React.createElement("p", { className: "image-item-name" }, user.name),
                    React.createElement("img", { src: payload.sourceUrl, className: "image-item-message-left" }),
                    React.createElement("div", { className: "image-item-time-left" }, utils_1.dateFormateHHMM(message.created)),
                    React.createElement("div", { className: "image-item-clear" }))));
        }
    };
    return ImageItem;
}(React.Component));
exports.ImageItem = ImageItem;
//# sourceMappingURL=ImageItem.js.map