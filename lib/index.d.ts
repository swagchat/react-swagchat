/// <reference types="react-router-dom" />
import { HashRouter as Router } from 'react-router-dom';
import { Client, IUISettings } from 'swagchat-sdk';
export { RoomSettingList, RoomSettingModalItem } from './components/RoomSettingList';
export { AddCircle, Back, Block, Close, Exit, Expand, CheckCircle, Keyboard, Camera, Send, RadioButtonChecked, RadioButtonUnChecked } from './components/icons/';
export { ContainerRoomListPage, ContainerMessagePage, ContainerNotFoundPage, ContainerRoomSettingPage, ContainerSelectContactPage } from './containers/';
export { TemplateGeneral, renderTemplateGeneral, RouteMessagePage, renderMessagePage, RouteRoomListPage, renderRoomList, RouteRoomSettingPage, renderRoomSetting } from './templates/';
export { Avatar, Badge, Modal, IModalAction, TopBar, SubTitleBar, SimpleListItem, RoomList, RoomItem, Button, ContactList, CheckListItem, MessageDateSeparator, MessageBody, MessageInteraction, MessageItem, MessageMenu } from './components/';
export { PluginMessageText, PluginMessageImage } from './plugins/message';
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
export declare const logColor = "#3F51B5";
