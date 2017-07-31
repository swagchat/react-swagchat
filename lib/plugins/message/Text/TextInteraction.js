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
var utils_1 = require("../../../utils");
var TextInteraction = (function (_super) {
    __extends(TextInteraction, _super);
    function TextInteraction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fontSize = 18;
        _this.padding = 10;
        _this.textValue = '';
        _this.newLineCount = 0;
        _this.previousLastLetter = '';
        _this.onKeyDownName = '';
        _this.maxCharCount = 0;
        _this.initialInteractionStyle = {
            textAreaStyle: {
                fontSize: _this.fontSize + 'px',
                padding: _this.padding + 'px',
                height: _this.fontSize + 'px',
                overflowY: 'hidden',
            },
        };
        return _this;
    }
    TextInteraction.prototype.componentDidMount = function () {
        this.props.updatePluginMessageTextInteractionStyle(this.initialInteractionStyle);
        this.maxCharCount = (this.textareaDom.clientWidth - 20) / (this.fontSize * 0.57);
    };
    TextInteraction.prototype.onChange = function (e) {
        e.preventDefault();
        this.textValue = e.target.value;
        var newLineCount = (e.target.value.match(new RegExp('\n', 'g')) || []).length + 1;
        // Auto new line
        var arrayTextValue = this.textValue.split('\n');
        for (var i = 0; i < arrayTextValue.length; i++) {
            var autoLineCount = Math.ceil((utils_1.countString(arrayTextValue[i]) / this.maxCharCount)) - 1;
            if (autoLineCount > 0) {
                newLineCount += autoLineCount;
            }
        }
        newLineCount === 0 ? newLineCount = 1 : null;
        if (this.newLineCount !== newLineCount && newLineCount <= 4) {
            this.newLineCount = newLineCount;
            var newTextAreaStyle = Object.assign({}, this.props.styleState.pluginMessageTextInteractionStyle.textAreaStyle, {
                height: this.fontSize * newLineCount + 'px',
                overflowY: 'auto',
            });
            var newPluginMessageTextInteractionStyle = {
                textAreaStyle: newTextAreaStyle,
            };
            this.props.updatePluginMessageTextInteractionStyle(newPluginMessageTextInteractionStyle);
        }
        if (this.newLineCount === 1) {
            var newTextAreaStyle = Object.assign({}, this.props.styleState.pluginMessageTextInteractionStyle.textAreaStyle, {
                height: this.fontSize * newLineCount + 'px',
                overflowY: 'hidden',
            });
            var newPluginMessageTextInteractionStyle = {
                textAreaStyle: newTextAreaStyle,
            };
            this.props.updatePluginMessageTextInteractionStyle(newPluginMessageTextInteractionStyle);
        }
        // For iPhone creepy keyboard movement
        var noCountLetterRegexp = '[\ \　]';
        var lastLetter = this.textValue.slice(-1);
        if (this.onKeyDownName === 'Backspace' || this.onKeyDownName === 'Enter') {
            return;
        }
        var doubleByteCharacterRegExp = '[^\x01-\x7E]';
        if ((lastLetter.match(new RegExp(doubleByteCharacterRegExp)) || lastLetter.match(new RegExp(noCountLetterRegexp)))) {
            this.props.onTextareaFocus();
        }
        else {
            this.props.onTextareaBlur();
        }
        if (!lastLetter.match(new RegExp(noCountLetterRegexp))) {
            this.previousLastLetter = lastLetter;
        }
    };
    TextInteraction.prototype.onKeyDown = function (e) {
        this.onKeyDownName = e.key;
    };
    TextInteraction.prototype.onClick = function () {
        var emptyCheckString = this.textValue.replace(/\s|\n|　/g, '');
        if (emptyCheckString === '') {
            return;
        }
        this.props.createMessage('text', { text: this.textValue });
        this.props.sendMessages();
        this.props.updatePluginMessageTextInteractionStyle(this.initialInteractionStyle);
        this.textareaDom.value = '';
        this.textValue = '';
    };
    TextInteraction.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "text-interaction-root" },
            React.createElement("textarea", { ref: function (child) { return _this.textareaDom = child; }, className: "text-interaction-textarea", style: this.props.styleState.pluginMessageTextInteractionStyle.textAreaStyle, onChange: this.onChange.bind(this), placeholder: this.props.settingState.inputMessagePlaceholderText, onBlur: this.props.onTextareaBlur, onKeyDown: this.onKeyDown.bind(this) }),
            React.createElement(_1.Button, { className: "text-interaction-send-button", icon: React.createElement(_1.Send, { className: "text-interaction-send-icon", style: this.sendIconStyle }), onClick: this.onClick.bind(this) })));
    };
    return TextInteraction;
}(React.Component));
exports.TextInteraction = TextInteraction;
//# sourceMappingURL=TextInteraction.js.map