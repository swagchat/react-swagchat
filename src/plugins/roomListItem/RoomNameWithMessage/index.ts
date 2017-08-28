import {
  IPluginRoomListItem,
  IPluginRoomListItemProps,
} from 'swagchat-sdk/src/interface';
import { RoomNameWithMessage } from './RoomNameWithMessage';

export class PluginRoomListItemRoomNameWithMessage implements IPluginRoomListItem {
  name: string = 'roomNameWithMessage';
  item: React.ComponentClass<IPluginRoomListItemProps> = RoomNameWithMessage;
}
