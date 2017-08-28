/// <reference types="react-router-dom" />
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
import { HashRouter as Router } from 'react-router-dom';
import { Client, IUISettings } from 'swagchat-sdk';
