/// <reference types="react" />
import * as React from 'react';
import { IRoom } from 'swagchat-sdk';
import { IPluginState, IUserState, IRoomState, IMessageState, IStyleState, ISettingState } from '../../stores/';
export interface IProps {
    pluginState: IPluginState;
    userState: IUserState;
    roomState: IRoomState;
    messageState: IMessageState;
    styleState: IStyleState;
    settingState: ISettingState;
    createMessage: (messageType: string, payload: Object) => void;
    sendMessages: () => void;
    updateMenuIndex: (currentMenuIndex: number) => void;
    updateStyle: (style: Object) => void;
    assetPostAndSendMessage: (file: Blob) => void;
    markAsRead: (roomId: string) => void;
    updateRoom: (putRoom: IRoom) => void;
}
export declare class MessageBody extends React.Component<IProps, void> {
    render(): JSX.Element;
}
