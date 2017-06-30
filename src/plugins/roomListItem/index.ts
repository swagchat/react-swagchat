import * as React from 'react';
import { IRoomForUser } from 'swagchat-sdk';

export interface IPluginRoomListItemProps {
  myUserId: string;
  userRoom: IRoomForUser;
  onClick?: Function;
}

export interface IPluginRoomListItem {
  name: string;
  item: React.ComponentClass<IPluginRoomListItemProps>;
}

export { PluginRoomListItemRoomNameWithMessage } from './RoomNameWithMessage';
export { PluginRoomListItemRoomAndUserNameWithMessage } from './RoomAndUserNameWithMessage';
