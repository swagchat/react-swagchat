import {
  HashRouter as Router,
} from 'react-router-dom';
import { Client, IUISettings } from 'swagchat-sdk';

export {
  AddCircle,
  Back,
  Block,
  Close,
  Exit,
  Expand,
  CheckCircle,
  CheckCircleOutline,
  Keyboard,
  Camera,
  Send,
  RadioButtonChecked,
  RadioButtonUnChecked,
  Photo,
  Edit,
  Done,
} from './components/icons/';
export {
  ContainerRoomListPage,
  ContainerMessagePage,
  ContainerNotFoundPage,
  ContainerRoomSettingPage,
  ContainerSelectContactPage
} from './containers/';
export {
  Avatar,
  Badge,
  ModalView,
  ModalDialog,
  IModalAction,
  TopBar,
  SubTitleBar,
  SimpleListItem,
  IconListItem,
  RoomList,
  RoomItem,
  Button,
  ContactList,
  CheckListItem,
  MessageDateSeparator,
  MessageBody,
  MessageInteractionBottom,
  MessageInteractionTop,
  MessageItem,
  MessageMenuBottom,
  MessageMenuTop,
  RoomSettingList,
  PhotoEdit,
  RoomEdit,
} from './components/';
export {
  PluginMessageText,
  PluginMessageImage
} from './plugins/message';

export interface IContext {
  router: Router;
  client: Client;
  uiSettings: IUISettings;
}

export interface IOnClickProps {
  onClick?: (param?: any) => void;
}

export interface IIconProps {
  className?: string;
  style?: Object;
}

export const logColor = '#3F51B5';

import { renderTemplateMessenger, renderRoomList, renderMessagePage, renderRoomSetting } from './templates/';
(window as any).renderTemplateMessenger = renderTemplateMessenger;
(window as any).renderRoomList = renderRoomList;
(window as any).renderMessagePage = renderMessagePage;
(window as any).renderRoomSetting = renderRoomSetting;
