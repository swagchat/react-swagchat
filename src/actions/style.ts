import { Action } from 'redux';
import {
  IMessageBodyMenuStyle,
  IPluginMessageTextInteractionStyle,
} from '../stores/style';

export const UPDATE_STYLE = 'UPDATE_STYLE';
export const UPDATE_MESSAGE_BODY_MENU_STYLE = 'UPDATE_MESSAGE_BODY_MENU_STYLE';
export const UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE = 'UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE';

export type StyleActionTypes = typeof UPDATE_STYLE
  | typeof UPDATE_MESSAGE_BODY_MENU_STYLE
  | typeof UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE
;

export interface IUpdateStyleAction extends Action {
  type: StyleActionTypes;
  style: Object;
}
export const updateStyleActionCreator = (style: Object): IUpdateStyleAction => ({
  type: UPDATE_STYLE,
  style: style,
});

export interface IUpdateMessageBodyMenuStyleAction extends Action {
  type: StyleActionTypes;
  messageBodyMenuStyle: IMessageBodyMenuStyle;
}
export const updateMessageBodyMenuStyleActionCreator = (messageBodyMenuStyle: IMessageBodyMenuStyle): IUpdateMessageBodyMenuStyleAction => ({
  type: UPDATE_MESSAGE_BODY_MENU_STYLE,
  messageBodyMenuStyle: messageBodyMenuStyle,
});

export interface IUpdatePluginMessageTextInteractionStyleAction extends Action {
  type: StyleActionTypes;
  pluginMessageTextInteractionStyle: IPluginMessageTextInteractionStyle;
}
export const updatePluginMessageTextInteractionStyleActionCreator = (pluginMessageTextInteractionStyle: IPluginMessageTextInteractionStyle): IUpdatePluginMessageTextInteractionStyleAction => ({
  type: UPDATE_PLUGIN_MESSAGE_TEXT_INTERACTION_STYLE,
  pluginMessageTextInteractionStyle: pluginMessageTextInteractionStyle,
});

export type StyleActions = IUpdateStyleAction
  | IUpdateMessageBodyMenuStyleAction
  | IUpdatePluginMessageTextInteractionStyleAction
;
