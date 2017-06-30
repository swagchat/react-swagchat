import * as React from 'react';
import {
  IRoom,
  IUserForRoom,
  IMessage,
} from 'swagchat-sdk';
import {
  IStyleState,
  ISettingState,
  IUserState,
  IRoomState,
} from '../../stores/';

export interface IPluginMessageItemProps {
  message: IMessage;
  user: IUserForRoom;
  myUserId: string;
}

export interface IPluginMessageInteractionProps {
ownInteractionIndex: number;
  currentMenuIndex: number;
  styleState: IStyleState;
  settingState: ISettingState;
  userState: IUserState;
  roomState: IRoomState;
  createMessage: (messageType: string, payload: Object) => void;
  sendMessages: () => void;
  updateStyle: (style: Object) => void;
  updateMenuIndex: (currentMenuIndex: number) => void;
  assetPostAndSendMessage: (file: Blob) => void;
  updateRoom: (putRoom: IRoom) => void;
}

export interface IPluginMessageMenuProps {
  userState: IUserState;
  roomState: IRoomState;
  ownMenuIndex: number;
  currentMenuIndex: number;
  updateMenuIndex: (currentMenuIndex: number) => void;
}

export interface IPluginMessage {
  name: string;
  messageListMarginBottom: number;
  item: React.ComponentClass<IPluginMessageItemProps>;
  interaction: React.ComponentClass<IPluginMessageInteractionProps>;
  menu: React.ComponentClass<IPluginMessageMenuProps>;
}

export { PluginMessageImage } from './Image';
export { PluginMessageText } from './Text';