import {
  IAddonRoomListItem,
  IAddonRoomListItemProps,
} from 'swagchat-sdk';
import { RoomAndUserNameWithMessage } from './RoomAndUserNameWithMessage';

export class PluginRoomListItemRoomAndUserNameWithMessage implements IAddonRoomListItem {
  name: string = 'roomAndUserNameWithMessage';
  item: React.ComponentClass<IAddonRoomListItemProps> = RoomAndUserNameWithMessage;
}
