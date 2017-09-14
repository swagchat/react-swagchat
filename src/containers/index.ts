import { HashRouter as Router } from 'react-router-dom';
import { Client, IUISettings } from 'swagchat-sdk';

export interface IContext {
  router: Router;
  client: Client;
  uiSettings: IUISettings;
}
export { RoomListPage } from './RoomListPage/RoomListPage';
export { RoomSettingPage } from './RoomSettingPage/RoomSettingPage';
export { SelectContactPage } from './SelectContactPage/SelectContactPage';
export { MessagePage } from './MessagePage/MessagePage';
export { NotFoundPage } from './/NotFoundPage/NotFoundPage';

export interface IRenderUserInfoParams {
  userId?: string;
  userAccessToken?: string;
}

export interface IRenderClientParams {
  apiKey?: string;
  apiEndpoint?: string;
  rtmProtocol?: string;
  rtmHost?: string;
  rtmPath?: string;
}

export interface IRenderRoutePathParams {
  roomListRoutePath?: string;
  messageRoutePath?: string;
  roomSettingRoutePath?: string;
  selectContactRoutePath?: string;
}
