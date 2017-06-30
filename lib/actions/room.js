"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROOM_FETCH_REQUEST = 'ROOM_FETCH_REQUEST';
exports.ROOM_FETCH_REQUEST_SUCCESS = 'ROOM_FETCH_REQUEST_SUCCESS';
exports.ROOM_FETCH_REQUEST_FAILURE = 'ROOM_FETCH_REQUEST_FAILURE';
exports.ROOM_UPDATE_REQUEST = 'ROOM_UPDATE_REQUEST';
exports.ROOM_USER_ADD_FETCH_REQUEST = 'ROOM_USER_ADD_FETCH_REQUEST';
exports.ROOM_USER_ADD_FETCH_REQUEST_SUCCESS = 'ROOM_USER_ADD_FETCH_REQUEST_SUCCESS';
exports.ROOM_USER_ADD_FETCH_REQUEST_FAILURE = 'ROOM_USER_ADD_FETCH_REQUEST_FAILURE';
exports.ROOM_USER_REMOVE_FETCH_REQUEST = 'ROOM_USER_REMOVE_FETCH_REQUEST';
exports.ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS = 'ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS';
exports.ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE = 'ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE';
exports.roomFetchRequestActionCreator = function (roomId) { return ({
    type: exports.ROOM_FETCH_REQUEST,
    roomId: roomId,
}); };
exports.roomFetchRequestSuccessActionCreator = function (room) { return ({
    type: exports.ROOM_FETCH_REQUEST_SUCCESS,
    room: room,
}); };
exports.roomFetchRequestFailureActionCreator = function (problemDetail) { return ({
    type: exports.ROOM_FETCH_REQUEST_FAILURE,
    problemDetail: problemDetail,
}); };
exports.roomUpdateRequestActionCreator = function (putRoom) { return ({
    type: exports.ROOM_UPDATE_REQUEST,
    putRoom: putRoom,
}); };
exports.roomUserAddFetchRequestActionCreator = function (userIds) { return ({
    type: exports.ROOM_USER_ADD_FETCH_REQUEST,
    userIds: userIds,
}); };
exports.roomUserAddFetchRequestSuccessActionCreator = function (roomUsers) { return ({
    type: exports.ROOM_USER_ADD_FETCH_REQUEST_SUCCESS,
    roomUsers: roomUsers,
}); };
exports.roomUserAddFetchRequestFailureActionCreator = function (problemDetail) { return ({
    type: exports.ROOM_USER_ADD_FETCH_REQUEST_FAILURE,
    problemDetail: problemDetail,
}); };
exports.roomUserRemoveFetchRequestActionCreator = function (userIds) { return ({
    type: exports.ROOM_USER_REMOVE_FETCH_REQUEST,
    userIds: userIds,
}); };
exports.roomUserRemoveFetchRequestSuccessActionCreator = function (roomUsers) { return ({
    type: exports.ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS,
    roomUsers: roomUsers,
}); };
exports.roomUserRemoveFetchRequestFailureActionCreator = function (problemDetail) { return ({
    type: exports.ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE,
    problemDetail: problemDetail,
}); };
//# sourceMappingURL=room.js.map