import { HashRouter as Router } from 'react-router-dom';
import { Client, IUISettings } from 'swagchat-sdk';

export { TemplateMessenger, renderTemplateMessenger } from './TemplateMessenger';
export { RouteRoomListPage, renderRoomList } from './RouteRoomListPage';
export { RouteMessagePage, renderMessagePage } from './RouteMessagePage';
export { RouteRoomSettingPage, renderRoomSetting } from './RouteRoomSettingPage';
export { RouteSelectContactPage, renderSelectContact } from './RouteSelectContactPage';
export interface IContext {
  router: Router;
  client: Client;
  uiSettings: IUISettings;
}