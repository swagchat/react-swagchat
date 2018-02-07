import { Action } from 'redux';
import { Client, Room } from 'swagchat-sdk';

export const SET_CLIENT = 'SET_CLIENT';
export const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM';
export const SET_AUTH_PARAMS = 'SET_AUTH_PARAMS';

export type ClientActionTypes = typeof SET_CLIENT
| typeof SET_CURRENT_ROOM
| typeof SET_AUTH_PARAMS
;

export interface ClientBaseAction extends Action {
  type: ClientActionTypes;
}

export interface SetClientAction extends ClientBaseAction {
  client: Client;
}
export const setClientActionCreator = (client: Client): SetClientAction => ({
  type: SET_CLIENT,
  client: client,
});

export interface SetCurrentRoomAction extends ClientBaseAction {
  currentRoom: Room;
}
export const setCurrentRoomActionCreator = (currentRoom: Room): SetCurrentRoomAction => ({
  type: SET_CURRENT_ROOM,
  currentRoom: currentRoom,
});

export interface SetAuthParamsAction extends ClientBaseAction {
  userId: string;
  accessToken: string;
}
export const setAuthParamsActionCreator = (
  userId: string,
  accessToken: string,
  ): SetAuthParamsAction => ({
  type: SET_AUTH_PARAMS,
  userId: userId,
  accessToken: accessToken,
});

export type ClientActions = ClientBaseAction
  | SetClientAction
  | SetAuthParamsAction
;