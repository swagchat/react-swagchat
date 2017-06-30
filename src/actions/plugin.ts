import { Action } from 'redux';

import { IPluginMessage } from '../plugins/message';
import { IPluginRoomListItem } from '../plugins/roomListItem';

export const SET_PLUGIN_MESSAGE = 'SET_PLUGIN_MESSAGE';
export const SET_CUSTOM_PLUGIN_MESSAGE = 'SET_CUSTOM_PLUGIN_MESSAGE';
export const PLUGIN_MESSAGE_UPDATE_MENU_INDEX = 'UPDATE_MENU_INDEX';
export const SET_PLUGIN_ROOM_LIST_ITEM = 'SET_PLUGIN_ROOM_LIST_ITEM';
export const SET_CUSTOM_PLUGIN_ROOM_LIST_ITEM = 'SET_CUSTOM_PLUGIN_ROOM_LIST_ITEM';

export type PluginActionTypes = typeof SET_PLUGIN_MESSAGE
  | typeof SET_CUSTOM_PLUGIN_MESSAGE
  | typeof PLUGIN_MESSAGE_UPDATE_MENU_INDEX
  | typeof SET_PLUGIN_ROOM_LIST_ITEM
  | typeof SET_CUSTOM_PLUGIN_ROOM_LIST_ITEM
;

export interface ISetPluginMessageAction extends Action {
  type: PluginActionTypes;
  messages: IPluginMessage[];
}
export const setPluginMessageActionCreator = (messages: IPluginMessage[]): ISetPluginMessageAction => ({
  type: SET_PLUGIN_MESSAGE,
  messages: messages,
});

export interface ISetCustomPluginMessageAction extends Action {
  type: PluginActionTypes;
  customMessages: IPluginMessage[];
}
export const setCustomPluginMessageActionCreator = (customMessages: IPluginMessage[]): ISetCustomPluginMessageAction => ({
  type: SET_CUSTOM_PLUGIN_MESSAGE,
  customMessages: customMessages,
});

export interface IPluginMessageUpdateMenuIndexAction extends Action {
  type: PluginActionTypes;
  currentMenuIndex: number;
}
export const pluginMessageUpdateMenuIndexActionCreator = (currentMenuIndex: number): IPluginMessageUpdateMenuIndexAction => ({
  type: PLUGIN_MESSAGE_UPDATE_MENU_INDEX,
  currentMenuIndex: currentMenuIndex,
});

export interface ISetPluginRoomListItemAction extends Action {
  type: PluginActionTypes;
  roomListItems: {[key: number]: IPluginRoomListItem};
}
export const setPluginRoomListItemActionCreator = (roomListItems: IPluginRoomListItem[]): ISetPluginRoomListItemAction => ({
  type: SET_PLUGIN_ROOM_LIST_ITEM,
  roomListItems: roomListItems,
});

export interface ISetCustomPluginRoomListItemAction extends Action {
  type: PluginActionTypes;
  customRoomListItems: {[key: number]: IPluginRoomListItem};
}
export const setCustomPluginRoomListItemActionCreator = (customRoomListItems: IPluginRoomListItem[]): ISetCustomPluginRoomListItemAction => ({
  type: SET_CUSTOM_PLUGIN_ROOM_LIST_ITEM,
  customRoomListItems: customRoomListItems,
});

export type PluginMessageActions = ISetPluginMessageAction
  | ISetCustomPluginMessageAction
  | IPluginMessageUpdateMenuIndexAction
  | ISetPluginRoomListItemAction
  | ISetCustomPluginRoomListItemAction
;
