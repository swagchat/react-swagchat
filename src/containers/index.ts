import { HashRouter as Router } from 'react-router-dom';
import { Client, IUISettings } from 'swagchat-sdk';

export interface IContext {
  router: Router;
  client: Client;
  uiSettings: IUISettings;
}
export { ContainerRoomList } from './RoomListPage/ContainerRoomList';
export { RoomListPage, renderRoomList } from './RoomListPage/RoomListPage';

export { ContainerRoomSetting } from './RoomSettingPage/ContainerRoomSetting';
export { RoomSettingPage, renderRoomSetting } from './RoomSettingPage/RoomSettingPage';

export { ContainerSelectContact } from './SelectContactPage/ContainerSelectContact';
export { SelectContactPage } from './SelectContactPage/SelectContactPage';

export { ContainerMessage } from './MessagePage/ContainerMessage';
export { ContainerMessage2 } from './MessagePage/ContainerMessage2';
export { MessagePage, renderMessagePage } from './MessagePage/MessagePage';

export { ContainerNotFoundPage } from './/NotFoundPage/NotFoundPage';

