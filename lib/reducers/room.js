"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var room_1 = require("../actions/room");
var getInitialState = function () { return ({
    roomId: '',
    room: null,
    problemDetail: null,
    roomUsers: null,
}); };
function room(state, action) {
    if (state === void 0) { state = getInitialState(); }
    switch (action.type) {
        case room_1.ROOM_FETCH_REQUEST_SUCCESS:
            var roomFetchRequestSuccessAction = action;
            var roomUsers_1 = {};
            if (roomFetchRequestSuccessAction.room.users) {
                roomFetchRequestSuccessAction.room.users.map(function (user) {
                    roomUsers_1[user.userId] = user;
                });
            }
            else {
                roomUsers_1 = state.roomUsers;
            }
            return Object.assign({}, state, {
                room: roomFetchRequestSuccessAction.room,
                roomUsers: roomUsers_1,
            });
        case room_1.ROOM_FETCH_REQUEST_FAILURE:
            return Object.assign({}, state, {
                room: null,
                problemDetail: action.problemDetail,
            });
        case room_1.ROOM_USER_ADD_FETCH_REQUEST_SUCCESS:
            var addRoomUsers_1 = {};
            action.roomUsers.map(function (user) {
                addRoomUsers_1[user.userId] = user;
            });
            return Object.assign({}, state, {
                roomUsers: addRoomUsers_1,
            });
        case room_1.ROOM_USER_ADD_FETCH_REQUEST_FAILURE:
            return Object.assign({}, state, {
                problemDetail: action.problemDetail,
            });
        case room_1.ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS:
            var removeRoomUsers = {};
            for (var _i = 0, _a = action.roomUsers; _i < _a.length; _i++) {
                var roomUser = _a[_i];
                removeRoomUsers[roomUser.userId] = roomUser;
            }
            return Object.assign({}, state, {
                roomUsers: removeRoomUsers,
            });
        case room_1.ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE:
            return Object.assign({}, state, {
                problemDetail: action.problemDetail,
            });
        default:
            return state;
    }
}
exports.room = room;
//# sourceMappingURL=room.js.map