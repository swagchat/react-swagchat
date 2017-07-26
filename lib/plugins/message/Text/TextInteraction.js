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
    function TextInteraction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fontSize = 18;
        _this.padding = 10;
        _this.textValue = '';
        _this.newLineCount = 0;
        _this.initialInteractionStyle = {
            pluginMessageTextInteractionStyle: {
                textAreaStyle: {
                    fontSize: _this.fontSize + 'px',
                    padding: _this.padding + 'px',
                    height: _this.fontSize + 'px',
                },
            }
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
            var newTextAreaStyle = Object.assign({}, pluginMessageTextInteractionStyle.textAreaStyle, { height: this.fontSize * newLineCount + 'px' });
            this.props.updateStyle({
                pluginMessageTextInteractionStyle: {
                    textAreaStyle: newTextAreaStyle,
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
        return (React.createElement("div", { className: "text-interaction-root" },
            React.createElement("textarea", { ref: function (child) { return _this.textareaDom = child; }, className: "text-interaction-textarea", style: pluginMessageTextInteractionStyle.textAreaStyle, onChange: this.onChange.bind(this), placeholder: this.props.settingState.inputMessagePlaceholderText }),
            React.createElement(_1.Button, { className: "text-interaction-send-button", icon: React.createElement(_1.Send, { className: "text-interaction-send-icon", style: this.sendIconStyle }), onClick: this.onClick.bind(this) })));
    };
    return TextInteraction;
}(React.Component));
exports.TextInteraction = TextInteraction;
//# sourceMappingURL=TextInteraction.js.map