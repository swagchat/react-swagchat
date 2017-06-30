"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var effects_1 = require("redux-saga/effects");
var swagchat_sdk_1 = require("swagchat-sdk");
var Scroll = require("react-scroll");
var client_1 = require("../actions/client");
var user_1 = require("../actions/user");
var room_1 = require("../actions/room");
var combined_1 = require("../actions/combined");
var message_1 = require("../actions/message");
var asset_1 = require("../actions/asset");
var stores_1 = require("../stores");
var _1 = require("../");
function fetchRoomAndMessages(action) {
    var state, fetchRoomRes, fetchMessageRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, effects_1.call(function (roomId) {
                        return state.client.client.getRoom(roomId);
                    }, action.roomId)];
            case 2:
                fetchRoomRes = _a.sent();
                if (!fetchRoomRes.room) return [3 /*break*/, 11];
                return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestSuccessActionCreator(fetchRoomRes.room))];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.put(message_1.beforeMessagesFetchActionActionCreator(fetchRoomRes.room.messageCount, 20))];
            case 4:
                _a.sent();
                return [4 /*yield*/, effects_1.call(function () {
                        return fetchRoomRes.room.getMessages({
                            limit: 20,
                            offset: (fetchRoomRes.room.messageCount - 20) < 0 ? 0 : fetchRoomRes.room.messageCount - 20,
                        });
                    })];
            case 5:
                fetchMessageRes = _a.sent();
                if (!fetchMessageRes.messages) return [3 /*break*/, 8];
                return [4 /*yield*/, effects_1.put(message_1.messagesFetchRequestSuccessActionCreator(fetchMessageRes.messages))];
            case 6:
                _a.sent();
                return [4 /*yield*/, effects_1.put(user_1.markAsReadRequestActionCreator(fetchRoomRes.room.roomId))];
            case 7:
                _a.sent();
                Scroll.animateScroll.scrollToBottom({ duration: 0 });
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, effects_1.put(message_1.messagesFetchRequestFailureActionCreator(fetchMessageRes.error))];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                fetchRoomRes.room.subscribeMessage(function (message) {
                    console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + _1.logColor);
                    stores_1.store.dispatch(combined_1.combinedUpdateMessagesActionCreator([message]));
                });
                return [3 /*break*/, 13];
            case 11: return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestFailureActionCreator(fetchRoomRes.error))];
            case 12:
                _a.sent();
                _a.label = 13;
            case 13: return [2 /*return*/];
        }
    });
}
function fetchUserAndRoomAndMessages(action) {
    var fetchUserRes, fetchRoomRes_1, state_1, fetchMessageRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.call(function (apiKey, apiEndpoint, realtimeEndpoint, userId, accessToken) {
                    return swagchat_sdk_1.User.auth({
                        apiKey: apiKey,
                        apiEndpoint: apiEndpoint,
                        realtimeEndpoint: realtimeEndpoint,
                        userId: userId,
                        accessToken: accessToken,
                    });
                }, action.apiKey, action.apiEndpoint, action.realtimeEndpoint, action.userId, action.accessToken)];
            case 1:
                fetchUserRes = _a.sent();
                if (!fetchUserRes.user) return [3 /*break*/, 17];
                return [4 /*yield*/, effects_1.put(user_1.userFetchRequestSuccessActionCreator(fetchUserRes.user))];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.put(client_1.setClientActionCreator(fetchUserRes.user._client))];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.call(function (roomId) {
                        return fetchUserRes.user._client.getRoom(roomId);
                    }, action.roomId)];
            case 4:
                fetchRoomRes_1 = _a.sent();
                if (!fetchRoomRes_1.room) return [3 /*break*/, 14];
                return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestSuccessActionCreator(fetchRoomRes_1.room))];
            case 5:
                _a.sent();
                return [4 /*yield*/, effects_1.put(message_1.beforeMessagesFetchActionActionCreator(fetchRoomRes_1.room.messageCount, 20))];
            case 6:
                _a.sent();
                return [4 /*yield*/, effects_1.select()];
            case 7:
                state_1 = _a.sent();
                return [4 /*yield*/, effects_1.call(function () {
                        return fetchRoomRes_1.room.getMessages({
                            limit: state_1.message.messagesLimit,
                            offset: state_1.message.messagesOffset,
                        });
                    })];
            case 8:
                fetchMessageRes = _a.sent();
                if (!fetchMessageRes.messages) return [3 /*break*/, 11];
                return [4 /*yield*/, effects_1.put(message_1.messagesFetchRequestSuccessActionCreator(fetchMessageRes.messages))];
            case 9:
                _a.sent();
                return [4 /*yield*/, effects_1.put(user_1.markAsReadRequestActionCreator(fetchRoomRes_1.room.roomId))];
            case 10:
                _a.sent();
                Scroll.animateScroll.scrollToBottom({ duration: 0 });
                fetchRoomRes_1.room.subscribeMessage(function (message) {
                    console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + _1.logColor);
                    stores_1.store.dispatch(combined_1.combinedUpdateMessagesActionCreator([message]));
                });
                return [3 /*break*/, 13];
            case 11: return [4 /*yield*/, effects_1.put(message_1.messagesFetchRequestFailureActionCreator(fetchMessageRes.error))];
            case 12:
                _a.sent();
                _a.label = 13;
            case 13: return [3 /*break*/, 16];
            case 14: return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestFailureActionCreator(fetchRoomRes_1.error))];
            case 15:
                _a.sent();
                _a.label = 16;
            case 16: return [3 /*break*/, 19];
            case 17: return [4 /*yield*/, effects_1.put(user_1.userFetchRequestFailureActionCreator(fetchUserRes.error))];
            case 18:
                _a.sent();
                _a.label = 19;
            case 19: return [2 /*return*/];
        }
    });
}
function fetchUserAndRoom(action) {
    var fetchUserRes, fetchRoomRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.call(function (apiKey, apiEndpoint, realtimeEndpoint, userId, accessToken) {
                    return swagchat_sdk_1.User.auth({
                        apiKey: apiKey,
                        apiEndpoint: apiEndpoint,
                        realtimeEndpoint: realtimeEndpoint,
                        userId: userId,
                        accessToken: accessToken,
                    });
                }, action.apiKey, action.apiEndpoint, action.realtimeEndpoint, action.userId, action.accessToken)];
            case 1:
                fetchUserRes = _a.sent();
                if (!fetchUserRes.user) return [3 /*break*/, 9];
                return [4 /*yield*/, effects_1.put(user_1.userFetchRequestSuccessActionCreator(fetchUserRes.user))];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.put(client_1.setClientActionCreator(fetchUserRes.user._client))];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.call(function (roomId) {
                        return fetchUserRes.user._client.getRoom(roomId);
                    }, action.roomId)];
            case 4:
                fetchRoomRes = _a.sent();
                if (!fetchRoomRes.room) return [3 /*break*/, 6];
                return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestSuccessActionCreator(fetchRoomRes.room))];
            case 5:
                _a.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, effects_1.put(room_1.roomFetchRequestFailureActionCreator(fetchRoomRes.error))];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, effects_1.put(user_1.userFetchRequestFailureActionCreator(fetchUserRes.error))];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}
function assetPostAndSendMessage(action) {
    var state, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, effects_1.call(function (file) {
                        return state.user.user.fileUpload(file);
                    }, action.file)];
            case 2:
                res = _a.sent();
                if (!res.asset) return [3 /*break*/, 6];
                return [4 /*yield*/, effects_1.put(asset_1.assetPostRequestSuccessActionCreator(res.asset))];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.put(message_1.createMessageActionCreator('image', {
                        mime: res.asset.mime,
                        sourceUrl: res.asset.sourceUrl,
                    }))];
            case 4:
                _a.sent();
                return [4 /*yield*/, effects_1.put(message_1.messagesSendRequestActionCreator())];
            case 5:
                _a.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, effects_1.put(asset_1.assetPostRequestFailureActionCreator(res.error))];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}
function updateMessages(action) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.put(message_1.updateMessagesActionCreator(action.messages))];
            case 1:
                _a.sent();
                Scroll.animateScroll.scrollToBottom({ duration: 300 });
                return [2 /*return*/];
        }
    });
}
function combinedSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(combined_1.COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST, fetchRoomAndMessages)];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(combined_1.COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST, fetchUserAndRoomAndMessages)];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(combined_1.COMBINED_USER_AND_ROOM_FETCH_REQUEST, fetchUserAndRoom)];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(combined_1.COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST, assetPostAndSendMessage)];
            case 4:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(combined_1.COMBINED_UPDATE_MESSAGES, updateMessages)];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.combinedSaga = combinedSaga;
//# sourceMappingURL=combined.js.map