import { IPluginMessage } from '../plugins/message';
import { IPluginRoomListItem } from '../plugins/roomListItem';

export interface IPluginState {
  messages: IPluginMessage[];
  customMessages: IPluginMessage[];
  currentMenuIndex: number;

  roomListItems: {[key: number]: IPluginRoomListItem};
  customRoomListItems: {[key: string]: IPluginRoomListItem} | null;
}
