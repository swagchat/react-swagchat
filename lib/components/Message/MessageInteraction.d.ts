/// <reference types="react" />
import * as React from 'react';
import { IRoom } from 'swagchat-sdk';
import { IPluginState, IStyleState, ISettingState, IUserState, IRoomState } from '../../stores/';
export interface IMessageInteractionProps {
    pluginState: IPluginState;
    currentMenuIndex: number;
    styleState: IStyleState;
    settingState: ISettingState;
    userState: IUserState;
    roomState: IRoomState;
    availableMessageTypes: string[] | null;
    createMessage: (messageType: string, payload: Object) => void;
    sendMessages: () => void;
    updateStyle: (style: Object) => void;
    updateMenuIndex: (currentMenuIndex: number) => void;
    assetPostAndSendMessage: (file: Blob) => void;
    updateRoom: (putRoom: IRoom) => void;
}
export declare class MessageInteraction extends React.Component<IMessageInteractionProps, void> {
    render(): JSX.Element;
}
