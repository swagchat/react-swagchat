import { Action } from 'redux';
import { IPluginMessage } from '../plugins/message';
import { IPluginRoomListItem } from '../plugins/roomListItem';
export declare const SET_PLUGIN_MESSAGE = "SET_PLUGIN_MESSAGE";
export declare const SET_CUSTOM_PLUGIN_MESSAGE = "SET_CUSTOM_PLUGIN_MESSAGE";
export declare const PLUGIN_MESSAGE_UPDATE_MENU_INDEX = "UPDATE_MENU_INDEX";
export declare const SET_PLUGIN_ROOM_LIST_ITEM = "SET_PLUGIN_ROOM_LIST_ITEM";
export declare const SET_CUSTOM_PLUGIN_ROOM_LIST_ITEM = "SET_CUSTOM_PLUGIN_ROOM_LIST_ITEM";
export declare type PluginActionTypes = typeof SET_PLUGIN_MESSAGE | typeof SET_CUSTOM_PLUGIN_MESSAGE | typeof PLUGIN_MESSAGE_UPDATE_MENU_INDEX | typeof SET_PLUGIN_ROOM_LIST_ITEM | typeof SET_CUSTOM_PLUGIN_ROOM_LIST_ITEM;
export interface ISetPluginMessageAction extends Action {
    type: PluginActionTypes;
    messages: IPluginMessage[];
}
export declare const setPluginMessageActionCreator: (messages: IPluginMessage[]) => ISetPluginMessageAction;
export interface ISetCustomPluginMessageAction extends Action {
    type: PluginActionTypes;
    customMessages: IPluginMessage[];
}
export declare const setCustomPluginMessageActionCreator: (customMessages: IPluginMessage[]) => ISetCustomPluginMessageAction;
export interface IPluginMessageUpdateMenuIndexAction extends Action {
    type: PluginActionTypes;
    currentMenuIndex: number;
}
export declare const pluginMessageUpdateMenuIndexActionCreator: (currentMenuIndex: number) => IPluginMessageUpdateMenuIndexAction;
export interface ISetPluginRoomListItemAction extends Action {
    type: PluginActionTypes;
    roomListItems: {
        [key: number]: IPluginRoomListItem;
    };
}
export declare const setPluginRoomListItemActionCreator: (roomListItems: IPluginRoomListItem[]) => ISetPluginRoomListItemAction;
export interface ISetCustomPluginRoomListItemAction extends Action {
    type: PluginActionTypes;
    customRoomListItems: {
        [key: number]: IPluginRoomListItem;
    };
}
export declare const setCustomPluginRoomListItemActionCreator: (customRoomListItems: IPluginRoomListItem[]) => ISetCustomPluginRoomListItemAction;
export declare type PluginMessageActions = ISetPluginMessageAction | ISetCustomPluginMessageAction | IPluginMessageUpdateMenuIndexAction | ISetPluginRoomListItemAction | ISetCustomPluginRoomListItemAction;
