"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.Button = function (props) { return (React.createElement("div", { className: props.className ? props.className : 'button', style: props.style ? props.style : {}, onClick: props.onClick }, (function () {
    if (props.icon) {
        return props.icon;
    }
    else if (props.text) {
        return React.createElement("div", { className: "button_text" }, props.text);
    }
    else {
        return null;
    }
})())); };
//# sourceMappingURL=Button.js.map