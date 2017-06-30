import { IUserForRoom, IRoomUser } from 'swagchat-sdk';
import { IRoomState } from '../stores/room';
import {
  IRoomFetchRequestSuccessAction,
  IRoomFetchRequestFailureAction,
  IRoomUserAddFetchRequestSuccessAction,
  IRoomUserAddFetchRequestFailureAction,
  IRoomUserRemoveFetchRequestSuccessAction,
  IRoomUserRemoveFetchRequestFailureAction,
  ROOM_FETCH_REQUEST_SUCCESS,
  ROOM_FETCH_REQUEST_FAILURE,
  ROOM_USER_ADD_FETCH_REQUEST_SUCCESS,
  ROOM_USER_ADD_FETCH_REQUEST_FAILURE,
  ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS,
  ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE,
  RoomActions,
} from '../actions/room';

const getInitialState = (): IRoomState => ({
  roomId: '',
  room: null,
  problemDetail: null,
  roomUsers: null,
});

export function room(state: IRoomState = getInitialState(), action: RoomActions): IRoomState {
  switch (action.type) {
    case ROOM_FETCH_REQUEST_SUCCESS:
      const roomFetchRequestSuccessAction = <IRoomFetchRequestSuccessAction>action;
      let roomUsers: {[key: string]: IUserForRoom} = {};
      if (roomFetchRequestSuccessAction.room.users) {
        roomFetchRequestSuccessAction.room.users!.map((user: IUserForRoom) => {
          roomUsers[user.userId] = user;
        });
      } else {
        roomUsers = state.roomUsers!;
      }
      return Object.assign(
        {},
        state,
        {
          room: roomFetchRequestSuccessAction.room,
          roomUsers: roomUsers,
        }
      );
    case ROOM_FETCH_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          room: null,
          problemDetail: (<IRoomFetchRequestFailureAction>action).problemDetail,
        }
      );
    case ROOM_USER_ADD_FETCH_REQUEST_SUCCESS:
      let addRoomUsers: {[key: string]: IRoomUser} = {};
      (<IRoomUserAddFetchRequestSuccessAction>action).roomUsers!.map((user: IRoomUser) => {
        addRoomUsers[user.userId] = user;
      });
      return Object.assign(
        {},
        state,
        {
          roomUsers: addRoomUsers,
        }
      );
    case ROOM_USER_ADD_FETCH_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          problemDetail: (<IRoomUserAddFetchRequestFailureAction>action).problemDetail,
        }
      );
    case ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS:
      let removeRoomUsers: {[key: string]: IRoomUser} = {};
      for (let roomUser of (<IRoomUserRemoveFetchRequestSuccessAction>action).roomUsers) {
        removeRoomUsers[roomUser.userId] = roomUser;
      }
      return Object.assign(
        {},
        state,
        {
          roomUsers: removeRoomUsers,
        }
      );
    case ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          problemDetail: (<IRoomUserRemoveFetchRequestFailureAction>action).problemDetail,
        }
      );
    default:
      return state;
  }
}
