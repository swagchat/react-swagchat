import {
  IPluginRoomListItem,
  IPluginRoomListItemProps,
} from 'swagchat-sdk';
import { RoomAndUserNameWithMessage } from './RoomAndUserNameWithMessage';

export class PluginRoomListItemRoomAndUserNameWithMessage implements IPluginRoomListItem {
  name: string = 'roomAndUserNameWithMessage';
  item: React.ComponentClass<IPluginRoomListItemProps> = RoomAndUserNameWithMessage;
}
