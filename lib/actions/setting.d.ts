/// <reference types="react" />
import * as React from 'react';
import { Action } from 'redux';
export declare const SET_SETTING = "SET_SETTING";
export declare const SET_ROOM_LIST_TITLE = "SET_ROOM_LIST_TITLE";
export declare const SET_ROOM_LIST_TABBAR = "SET_ROOM_LIST_TABBAR";
export declare const SET_NO_ROOM_LIST_TEXT = "SET_NO_ROOM_LIST_TEXT";
export declare const SET_NO_ROOM_LIST_IMAGE = "SET_NO_ROOM_LIST_IMAGE";
export declare const SET_NO_MESSAGE_TEXT = "SET_NO_MESSAGE_TEXT";
export declare const SET_NO_MESSAGE_IMAGE = "SET_NO_MESSAGE_IMAGE";
export declare const SET_INPUT_MESSAGE_PLACEHOLDER_TEXT = "SET_INPUT_MESSAGE_PLACEHOLDER_TEXT";
export declare const SET_ROOM_SETTING_TITLE = "SET_ROOM_SETTING_TITLE";
export declare const SET_ROOM_MENBERS_TITLE = "SET_ROOM_MENBERS_TITLE";
export declare const SET_ROOM_LIST_ROUTE_PATH = "SET_ROOM_LIST_ROUTE_PATH";
export declare const SET_MESSAGE_ROUTE_PATH = "SET_MESSAGE_ROUTE_PATH";
export declare const SET_ROOM_SETTING_ROUTE_PATH = "SET_ROOM_SETTING_ROUTE_PATH";
export declare const SET_SELECT_CONTACT_ROUTE_PATH = "SET_SELECT_CONTACT_ROUTE_PATH";
export declare type SettingActionTypes = typeof SET_SETTING | typeof SET_ROOM_LIST_TITLE | typeof SET_ROOM_LIST_TABBAR | typeof SET_NO_ROOM_LIST_TEXT | typeof SET_NO_ROOM_LIST_IMAGE | typeof SET_NO_MESSAGE_TEXT | typeof SET_NO_MESSAGE_IMAGE | typeof SET_INPUT_MESSAGE_PLACEHOLDER_TEXT | typeof SET_ROOM_SETTING_TITLE | typeof SET_ROOM_MENBERS_TITLE | typeof SET_ROOM_LIST_ROUTE_PATH | typeof SET_MESSAGE_ROUTE_PATH | typeof SET_ROOM_SETTING_ROUTE_PATH | typeof SET_SELECT_CONTACT_ROUTE_PATH;
export interface ISetSettingAction extends Action {
    type: SettingActionTypes;
    setting: Object;
}
export declare const setSettingActionCreator: (setting: Object) => ISetSettingAction;
export interface ISetRoomListTitleAction extends Action {
    type: SettingActionTypes;
    roomListTitle: string;
}
export declare const setRoomListTitleActionCreator: (roomListTitle: string) => ISetRoomListTitleAction;
export interface ISetRoomListTabbarAction extends Action {
    type: SettingActionTypes;
    roomListTabbar: React.ComponentClass<any> | null;
}
export declare const setRoomListTabbarActionCreator: (roomListTabbar: React.ComponentClass<any>) => ISetRoomListTabbarAction;
export interface ISetNoRoomListTextAction extends Action {
    type: SettingActionTypes;
    noRoomListText: string;
}
export declare const setNoRoomListTextActionCreator: (noRoomListText: string) => ISetNoRoomListTextAction;
export interface ISetNoRoomListImageAction extends Action {
    type: SettingActionTypes;
    noRoomListImage: string;
}
export declare const setNoRoomListImageActionCreator: (noRoomListImage: string) => ISetNoRoomListImageAction;
export interface ISetNoMessageTextAction extends Action {
    type: SettingActionTypes;
    noMessageText: string;
}
export declare const setNoMessageTextActionCreator: (noMessageText: string) => ISetNoMessageTextAction;
export interface ISetNoMessageImageAction extends Action {
    type: SettingActionTypes;
    noMessageImage: string;
}
export declare const setNoMessageImageActionCreator: (noMessageImage: string) => ISetNoMessageImageAction;
export interface ISetInputMessagePlaceholderTextAction extends Action {
    type: SettingActionTypes;
    inputMessagePlaceholderText: string;
}
export declare const setInputMessagePlaceholderTextActionCreator: (inputMessagePlaceholderText: string) => ISetInputMessagePlaceholderTextAction;
export interface ISetRoomSettingTitleAction extends Action {
    type: SettingActionTypes;
    roomSettingTitle: string;
}
export declare const setRoomSettingTitleActionCreator: (roomSettingTitle: string) => ISetRoomSettingTitleAction;
export interface ISetRoomMembersTitleAction extends Action {
    type: SettingActionTypes;
    roomMembersTitle: string;
}
export declare const setRoomMembersTitleActionCreator: (roomMembersTitle: string) => ISetRoomMembersTitleAction;
export interface ISetRoomListRoutePathAction extends Action {
    type: SettingActionTypes;
    roomListRoutePath: string;
}
export declare const setRoomListRoutePathActionCreator: (roomListRoutePath: string) => ISetRoomListRoutePathAction;
export interface ISetMessageRoutePathAction extends Action {
    type: SettingActionTypes;
    messageRoutePath: string;
}
export declare const setMessageRoutePathActionCreator: (messageRoutePath: string) => ISetMessageRoutePathAction;
export interface ISetRoomSettingRoutePathAction extends Action {
    type: SettingActionTypes;
    roomSettingRoutePath: string;
}
export declare const setRoomSettingRoutePathActionCreator: (roomSettingRoutePath: string) => ISetRoomSettingRoutePathAction;
export interface ISetSelectContactRoutePathAction extends Action {
    type: SettingActionTypes;
    selectContactRoutePath: string;
}
export declare const setSelectContactRoutePathActionCreator: (selectContactRoutePath: string) => ISetSelectContactRoutePathAction;
export declare type SettingActions = ISetSettingAction | ISetRoomListTitleAction | ISetRoomListTabbarAction | ISetNoRoomListTextAction | ISetNoRoomListImageAction | ISetNoMessageTextAction | ISetNoMessageImageAction | ISetInputMessagePlaceholderTextAction | ISetRoomSettingTitleAction | ISetRoomMembersTitleAction | ISetRoomListRoutePathAction | ISetMessageRoutePathAction | ISetRoomSettingRoutePathAction | ISetSelectContactRoutePathAction;
