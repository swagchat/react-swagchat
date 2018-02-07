import { IAddonMessage, IAddonRoomListItem } from 'swagchat-sdk';

export interface AddonState {
  messages: IAddonMessage[];
  customMessages: IAddonMessage[];
  currentMenuIndex: number;

  roomListItems: {[key: number]: IAddonRoomListItem};
  customRoomListItems: {[key: string]: IAddonRoomListItem} | null;
}