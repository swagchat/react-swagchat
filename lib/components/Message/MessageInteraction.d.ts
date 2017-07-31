/// <reference types="react" />
import * as React from 'react';
import { IRoom } from 'swagchat-sdk';
import { IPluginState, IStyleState, ISettingState, IUserState, IRoomState } from '../../stores/';
import { IPluginMessageTextInteractionStyle } from '../../stores/style';
export interface IMessageInteractionProps {
    pluginState: IPluginState;
    currentMenuIndex: number;
    styleState: IStyleState;
    settingState: ISettingState;
    userState: IUserState;
    roomState: IRoomState;
    availableMessageTypes: string[] | null;
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
export declare class MessageInteraction extends React.Component<IMessageInteractionProps, void> {
    render(): JSX.Element;
}
