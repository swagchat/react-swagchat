import * as React from 'react';
import { Action } from 'redux';

export const SET_SETTING = 'SET_SETTING';
export const SET_ROOM_LIST_TITLE = 'SET_ROOM_LIST_TITLE';
export const SET_ROOM_LIST_TABBAR = 'SET_ROOM_LIST_TABBAR';
export const SET_NO_ROOM_LIST_TEXT = 'SET_NO_ROOM_LIST_TEXT';
export const SET_NO_ROOM_LIST_IMAGE = 'SET_NO_ROOM_LIST_IMAGE';
export const SET_NO_MESSAGE_TEXT = 'SET_NO_MESSAGE_TEXT';
export const SET_NO_MESSAGE_IMAGE = 'SET_NO_MESSAGE_IMAGE';
export const SET_INPUT_MESSAGE_PLACEHOLDER_TEXT = 'SET_INPUT_MESSAGE_PLACEHOLDER_TEXT';
export const SET_ROOM_SETTING_TITLE = 'SET_ROOM_SETTING_TITLE';
export const SET_ROOM_MENBERS_TITLE = 'SET_ROOM_MENBERS_TITLE';

export type SettingActionTypes = typeof SET_SETTING
  | typeof SET_ROOM_LIST_TITLE
  | typeof SET_ROOM_LIST_TABBAR
  | typeof SET_NO_ROOM_LIST_TEXT
  | typeof SET_NO_ROOM_LIST_IMAGE
  | typeof SET_NO_MESSAGE_TEXT
  | typeof SET_NO_MESSAGE_IMAGE
  | typeof SET_INPUT_MESSAGE_PLACEHOLDER_TEXT
  | typeof SET_ROOM_SETTING_TITLE
  | typeof SET_ROOM_MENBERS_TITLE
;

export interface ISetSettingAction extends Action {
  type: SettingActionTypes;
  setting: Object;
}
export const setSettingActionCreator = (setting: Object): ISetSettingAction => ({
  type: SET_SETTING,
  setting: setting,
});

export interface ISetRoomListTitleAction extends Action {
  type: SettingActionTypes;
  roomListTitle: string;
}
export const setRoomListTitleActionCreator = (roomListTitle: string): ISetRoomListTitleAction => ({
  type: SET_ROOM_LIST_TITLE,
  roomListTitle: roomListTitle,
});

export interface ISetRoomListTabbarAction extends Action {
  type: SettingActionTypes;
  roomListTabbar: React.ComponentClass<any> | null;
}
export const setRoomListTabbarActionCreator = (roomListTabbar: React.ComponentClass<any>): ISetRoomListTabbarAction => ({
  type: SET_ROOM_LIST_TABBAR,
  roomListTabbar: roomListTabbar,
});

export interface ISetNoRoomListTextAction extends Action {
  type: SettingActionTypes;
  noRoomListText: string;
}
export const setNoRoomListTextActionCreator = (noRoomListText: string): ISetNoRoomListTextAction => ({
  type: SET_NO_ROOM_LIST_TEXT,
  noRoomListText: noRoomListText,
});

export interface ISetNoRoomListImageAction extends Action {
  type: SettingActionTypes;
  noRoomListImage: string;
}
export const setNoRoomListImageActionCreator = (noRoomListImage: string): ISetNoRoomListImageAction => ({
  type: SET_NO_ROOM_LIST_IMAGE,
  noRoomListImage: noRoomListImage,
});

export interface ISetNoMessageTextAction extends Action {
  type: SettingActionTypes;
  noMessageText: string;
}
export const setNoMessageTextActionCreator = (noMessageText: string): ISetNoMessageTextAction => ({
  type: SET_NO_MESSAGE_TEXT,
  noMessageText: noMessageText,
});

export interface ISetNoMessageImageAction extends Action {
  type: SettingActionTypes;
  noMessageImage: string;
}
export const setNoMessageImageActionCreator = (noMessageImage: string): ISetNoMessageImageAction => ({
  type: SET_NO_MESSAGE_IMAGE,
  noMessageImage: noMessageImage,
});

export interface ISetInputMessagePlaceholderTextAction extends Action {
  type: SettingActionTypes;
  inputMessagePlaceholderText: string;
}
export const setInputMessagePlaceholderTextActionCreator = (inputMessagePlaceholderText: string): ISetInputMessagePlaceholderTextAction => ({
  type: SET_INPUT_MESSAGE_PLACEHOLDER_TEXT,
  inputMessagePlaceholderText: inputMessagePlaceholderText,
});

export interface ISetRoomSettingTitleAction extends Action {
  type: SettingActionTypes;
  roomSettingTitle: string;
}
export const setRoomSettingTitleActionCreator = (roomSettingTitle: string): ISetRoomSettingTitleAction => ({
  type: SET_ROOM_SETTING_TITLE,
  roomSettingTitle: roomSettingTitle,
});

export interface ISetRoomMembersTitleAction extends Action {
  type: SettingActionTypes;
  roomMembersTitle: string;
}
export const setRoomMembersTitleActionCreator = (roomMembersTitle: string): ISetRoomMembersTitleAction => ({
  type: SET_ROOM_MENBERS_TITLE,
  roomMembersTitle: roomMembersTitle,
});

export type SettingActions = ISetSettingAction
  | ISetRoomListTitleAction
  | ISetRoomListTabbarAction
  | ISetNoRoomListTextAction
  | ISetNoRoomListImageAction
  | ISetNoMessageTextAction
  | ISetNoMessageImageAction
  | ISetInputMessagePlaceholderTextAction
  | ISetRoomSettingTitleAction
  | ISetRoomMembersTitleAction
;