"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var style_1 = require("../actions/style");
var getInitialState = function () { return ({}); };
function style(state, action) {
    if (state === void 0) { state = getInitialState(); }
    switch (action.type) {
        case style_1.UPDATE_STYLE:
            return Object.assign({}, state, action.style);
        default:
            return state;
    }
}
exports.style = style;
//# sourceMappingURL=style.js.map