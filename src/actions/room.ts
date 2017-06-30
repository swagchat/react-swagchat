import { Action } from 'redux';
import { Room, IRoom, IProblemDetail, IRoomUser } from 'swagchat-sdk';

export const ROOM_FETCH_REQUEST = 'ROOM_FETCH_REQUEST';
export const ROOM_FETCH_REQUEST_SUCCESS = 'ROOM_FETCH_REQUEST_SUCCESS';
export const ROOM_FETCH_REQUEST_FAILURE = 'ROOM_FETCH_REQUEST_FAILURE';
export const ROOM_UPDATE_REQUEST = 'ROOM_UPDATE_REQUEST';
export const ROOM_USER_ADD_FETCH_REQUEST = 'ROOM_USER_ADD_FETCH_REQUEST';
export const ROOM_USER_ADD_FETCH_REQUEST_SUCCESS = 'ROOM_USER_ADD_FETCH_REQUEST_SUCCESS';
export const ROOM_USER_ADD_FETCH_REQUEST_FAILURE = 'ROOM_USER_ADD_FETCH_REQUEST_FAILURE';
export const ROOM_USER_REMOVE_FETCH_REQUEST = 'ROOM_USER_REMOVE_FETCH_REQUEST';
export const ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS = 'ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS';
export const ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE = 'ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE';

export type RoomActionTypes = typeof ROOM_FETCH_REQUEST
  | typeof ROOM_FETCH_REQUEST_SUCCESS
  | typeof ROOM_FETCH_REQUEST_FAILURE
  | typeof ROOM_UPDATE_REQUEST
  | typeof ROOM_USER_ADD_FETCH_REQUEST
  | typeof ROOM_USER_ADD_FETCH_REQUEST_SUCCESS
  | typeof ROOM_USER_ADD_FETCH_REQUEST_FAILURE
  | typeof ROOM_USER_REMOVE_FETCH_REQUEST
  | typeof ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS
  | typeof ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE
;

export interface IRoomFetchRequestAction extends Action {
  type: RoomActionTypes;
  roomId: string;
}
export const roomFetchRequestActionCreator = (roomId: string): IRoomFetchRequestAction => ({
  type: ROOM_FETCH_REQUEST,
  roomId: roomId,
});

export interface IRoomFetchRequestSuccessAction extends Action {
  type: RoomActionTypes;
  room: Room;
}
export const roomFetchRequestSuccessActionCreator = (room: Room): IRoomFetchRequestSuccessAction => ({
  type: ROOM_FETCH_REQUEST_SUCCESS,
  room: room,
});

export interface IRoomFetchRequestFailureAction extends Action {
  type: RoomActionTypes;
  problemDetail: IProblemDetail;
}
export const roomFetchRequestFailureActionCreator = (problemDetail: IProblemDetail): IRoomFetchRequestFailureAction => ({
  type: ROOM_FETCH_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IRoomUpdateRequestAction extends Action {
  type: RoomActionTypes;
  putRoom: IRoom;
}
export const roomUpdateRequestActionCreator = (putRoom: IRoom): IRoomUpdateRequestAction => ({
  type: ROOM_UPDATE_REQUEST,
  putRoom: putRoom,
});

export interface IRoomUserAddFetchRequestAction extends Action {
  type: RoomActionTypes;
  userIds: string[];
}
export const roomUserAddFetchRequestActionCreator = (userIds: string[]): IRoomUserAddFetchRequestAction => ({
  type: ROOM_USER_ADD_FETCH_REQUEST,
  userIds: userIds,
});

export interface IRoomUserAddFetchRequestSuccessAction extends Action {
  type: RoomActionTypes;
  roomUsers: IRoomUser[];
}
export const roomUserAddFetchRequestSuccessActionCreator = (roomUsers: IRoomUser[]): IRoomUserAddFetchRequestSuccessAction => ({
  type: ROOM_USER_ADD_FETCH_REQUEST_SUCCESS,
  roomUsers: roomUsers,
});

export interface IRoomUserAddFetchRequestFailureAction extends Action {
  type: RoomActionTypes;
  problemDetail: IProblemDetail;
}
export const roomUserAddFetchRequestFailureActionCreator = (problemDetail: IProblemDetail): IRoomUserAddFetchRequestFailureAction => ({
  type: ROOM_USER_ADD_FETCH_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IRoomUserRemoveFetchRequestAction extends Action {
  type: RoomActionTypes;
  userIds: string[];
}
export const roomUserRemoveFetchRequestActionCreator = (userIds: string[]): IRoomUserRemoveFetchRequestAction => ({
  type: ROOM_USER_REMOVE_FETCH_REQUEST,
  userIds: userIds,
});

export interface IRoomUserRemoveFetchRequestSuccessAction extends Action {
  type: RoomActionTypes;
  roomUsers: IRoomUser[];
}
export const roomUserRemoveFetchRequestSuccessActionCreator = (roomUsers: IRoomUser[]): IRoomUserRemoveFetchRequestSuccessAction => ({
  type: ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS,
  roomUsers: roomUsers,
});

export interface IRoomUserRemoveFetchRequestFailureAction extends Action {
  type: RoomActionTypes;
  problemDetail: IProblemDetail;
}
export const roomUserRemoveFetchRequestFailureActionCreator = (problemDetail: IProblemDetail): IRoomUserRemoveFetchRequestFailureAction => ({
  type: ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export type RoomActions = IRoomFetchRequestAction
  | IRoomFetchRequestSuccessAction
  | IRoomFetchRequestFailureAction
  | IRoomUserAddFetchRequestAction
  | IRoomUserAddFetchRequestSuccessAction
  | IRoomUserAddFetchRequestFailureAction
  | IRoomUserRemoveFetchRequestAction
  | IRoomUserRemoveFetchRequestSuccessAction
  | IRoomUserRemoveFetchRequestFailureAction
;
