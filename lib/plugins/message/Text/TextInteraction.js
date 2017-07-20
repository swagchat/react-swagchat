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
var TextInteraction = (function (_super) {
    __extends(TextInteraction, _super);
    function TextInteraction(props) {
        var _this = _super.call(this, props) || this;
        _this.fontSize = 18;
        _this.padding = 10;
        _this.menuHeight = 40;
        _this.textValue = '';
        _this.newLineCount = 0;
        _this.initialInteractionStyle = {
            pluginMessageTextInteractionStyle: {
                rootStyle: {
                    bottom: _this.menuHeight + 1 + 'px',
                    height: _this.fontSize + 20 + 'px',
                },
                textAreaStyle: {
                    fontSize: _this.fontSize + 'px',
                    padding: _this.padding + 'px',
                    marginRight: _this.fontSize + 20 + 'px',
                    height: _this.fontSize + 'px',
                },
                sendButtonStyle: {
                    height: _this.fontSize + 20 + 'px',
                    lineHeight: _this.fontSize + 20 + 'px',
                    width: _this.fontSize + 20 + 'px',
                }
            }
        };
        _this.sendIconStyle = {
            height: _this.fontSize + 'px',
            width: _this.fontSize + 'px',
        };
        return _this;
    }
    TextInteraction.prototype.componentDidMount = function () {
        this.props.updateStyle(this.initialInteractionStyle);
    };
    TextInteraction.prototype.onChange = function (e) {
        e.preventDefault();
        var newLineCount = (e.target.value.match(new RegExp('\n', 'g')) || []).length + 1;
        if (this.newLineCount !== newLineCount && newLineCount <= 4) {
            this.newLineCount = newLineCount;
            var style = this.props.styleState;
            var pluginMessageTextInteractionStyle = style.pluginMessageTextInteractionStyle;
            var newRootStyle = Object.assign({}, pluginMessageTextInteractionStyle.rootStyle, { height: this.fontSize * newLineCount + 20 + 'px' });
            var newTextAreaStyle = Object.assign({}, pluginMessageTextInteractionStyle.textAreaStyle, { height: this.fontSize * newLineCount + 'px' });
            var newSendButtonStyle = Object.assign({}, pluginMessageTextInteractionStyle.sendButtonStyle, { height: this.fontSize * newLineCount + 20 + 'px' });
            this.props.updateStyle({
                pluginMessageTextInteractionStyle: {
                    rootStyle: newRootStyle,
                    textAreaStyle: newTextAreaStyle,
                    sendButtonStyle: newSendButtonStyle,
                }
            });
        }
        this.textValue = e.target.value;
    };
    TextInteraction.prototype.onClick = function () {
        var emptyCheckString = this.textValue.replace(/\s|\n|　/g, '');
        if (emptyCheckString === '') {
            return;
        }
        this.props.createMessage('text', { text: this.textValue });
        this.props.sendMessages();
        this.props.updateStyle(this.initialInteractionStyle);
        this.textareaDom.value = '';
        this.textValue = '';
    };
    TextInteraction.prototype.render = function () {
        var _this = this;
        var style = this.props.styleState;
        if (!style.pluginMessageTextInteractionStyle) {
            return React.createElement("div", null);
        }
        var pluginMessageTextInteractionStyle = style.pluginMessageTextInteractionStyle;
        return (React.createElement("div", { className: "text-interaction-root", style: pluginMessageTextInteractionStyle.rootStyle },
            React.createElement("textarea", { ref: function (child) { return _this.textareaDom = child; }, className: "text-interaction-textarea", style: pluginMessageTextInteractionStyle.textAreaStyle, onChange: this.onChange.bind(this), placeholder: this.props.settingState.inputMessagePlaceholderText }),
            React.createElement(_1.Button, { className: "text-interaction-send-button", style: pluginMessageTextInteractionStyle.sendButtonStyle, icon: React.createElement(_1.Send, { className: "text-interaction-send-icon", style: this.sendIconStyle }), onClick: this.onClick.bind(this) })));
    };
    return TextInteraction;
}(React.Component));
exports.TextInteraction = TextInteraction;
//# sourceMappingURL=TextInteraction.js.map