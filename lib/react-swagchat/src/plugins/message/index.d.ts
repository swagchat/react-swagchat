import { IRoom, IUserForRoom, IMessage } from 'swagchat-sdk';
import { IStyleState, ISettingState, IUserState, IRoomState, IPluginMessageTextInteractionStyle } from 'swagchat-sdk/src/stores/';
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
    position: string;
    onTextareaFocus: () => void;
    onTextareaBlur: () => void;
    createMessage: (messageType: string, payload: Object) => void;
    sendMessages: () => void;
    updateStyle: (style: Object) => void;
    updatePluginMessageTextInteractionStyle: (pluginMessageTextInteractionStyle: IPluginMessageTextInteractionStyle) => void;
    updateMenuIndex: (currentMenuIndex: number) => void;
    assetPostAndSendMessage: (file: Blob) => void;
    updateRoom: (putRoom: IRoom) => void;
}
export { PluginMessageImage } from './Image';
export { PluginMessageText } from './Text';
