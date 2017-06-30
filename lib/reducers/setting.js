"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setting_1 = require("../actions/setting");
var getInitialState = function () { return ({
    setting: {},
    roomListTitle: '',
    roomListTabbar: null,
    noRoomListText: '',
    noRoomListImage: '',
    noMessageText: '',
    noMessageImage: '',
    inputMessagePlaceholderText: '',
    roomSettingTitle: '',
    roomMembersTitle: '',
}); };
function setting(state, action) {
    if (state === void 0) { state = getInitialState(); }
    switch (action.type) {
        case setting_1.SET_SETTING:
            return Object.assign({}, state, {
                setting: action.setting,
            });
        case setting_1.SET_ROOM_LIST_TITLE:
            return Object.assign({}, state, {
                roomListTitle: action.roomListTitle,
            });
        case setting_1.SET_ROOM_LIST_TABBAR:
            return Object.assign({}, state, {
                roomListTabbar: action.roomListTabbar,
            });
        case setting_1.SET_NO_ROOM_LIST_TEXT:
            return Object.assign({}, state, {
                noRoomListText: action.noRoomListText,
            });
        case setting_1.SET_NO_ROOM_LIST_IMAGE:
            return Object.assign({}, state, {
                noRoomListImage: action.noRoomListImage,
            });
        case setting_1.SET_NO_MESSAGE_TEXT:
            return Object.assign({}, state, {
                noMessageText: action.noMessageText,
            });
        case setting_1.SET_NO_MESSAGE_IMAGE:
            return Object.assign({}, state, {
                noMessageImage: action.noMessageImage,
            });
        case setting_1.SET_INPUT_MESSAGE_PLACEHOLDER_TEXT:
            return Object.assign({}, state, {
                inputMessagePlaceholderText: action.inputMessagePlaceholderText,
            });
        case setting_1.SET_ROOM_SETTING_TITLE:
            return Object.assign({}, state, {
                roomSettingTitle: action.roomSettingTitle,
            });
        case setting_1.SET_ROOM_MENBERS_TITLE:
            return Object.assign({}, state, {
                roomMembersTitle: action.roomMembersTitle,
            });
        default:
            return state;
    }
}
exports.setting = setting;
//# sourceMappingURL=setting.js.map