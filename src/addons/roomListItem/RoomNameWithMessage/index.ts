import {
  IAddonRoomListItem,
  IAddonRoomListItemProps,
} from 'swagchat-sdk';
import { RoomNameWithMessage } from './RoomNameWithMessage';

export class PluginRoomListItemRoomNameWithMessage implements IAddonRoomListItem {
  name: string = 'roomNameWithMessage';
  item: React.ComponentClass<IAddonRoomListItemProps> = RoomNameWithMessage;
}
