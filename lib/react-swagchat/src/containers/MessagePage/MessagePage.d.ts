/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IRoom } from 'swagchat-sdk';
import { IClientState, IPluginState, IUserState, IRoomState, IMessageState, IStyleState, ISettingState } from 'swagchat-sdk/src/stores';
import { IMessageBodyMenuStyle, IPluginMessageTextInteractionStyle } from 'swagchat-sdk/src/stores/style';
import { IMarkAsReadRequestAction } from 'swagchat-sdk/src/actions/user';
import { IRoomUpdateRequestAction } from 'swagchat-sdk/src/actions/room';
import { ICombinedAssetPostAndSendMessageRequestAction } from 'swagchat-sdk/src/actions/combined';
import { IPluginMessageUpdateMenuIndexAction } from 'swagchat-sdk/src/actions/plugin';
import { IUpdateStyleAction, IUpdateMessageBodyMenuStyleAction, IUpdatePluginMessageTextInteractionStyleAction } from 'swagchat-sdk/src/actions/style';
import { IMessagesFetchRequestAction, ISendMessagesAction, ICreateMessageAction } from 'swagchat-sdk/src/actions/message';
export interface IProps extends RouteComponentProps<any> {
    pluginState: IPluginState;
    clientState: IClientState;
    userState: IUserState;
    roomState: IRoomState;
    messageState: IMessageState;
    styleState: IStyleState;
    settingState: ISettingState;
    messagesFetchRequest: () => IMessagesFetchRequestAction;
    createMessage: (messageType: string, payload: Object) => ICreateMessageAction;
    sendMessages: () => ISendMessagesAction;
    updateMenuIndex: (currentMenuIndex: number) => IPluginMessageUpdateMenuIndexAction;
    updateStyle: (style: Object) => IUpdateStyleAction;
    updateMessageModyMenuStyle: (messageBodyMenuStyle: IMessageBodyMenuStyle) => IUpdateMessageBodyMenuStyleAction;
    updatePluginMessageTextInteractionStyle: (pluginMessageTextInteractionStyle: IPluginMessageTextInteractionStyle) => IUpdatePluginMessageTextInteractionStyleAction;
    assetPostAndSendMessage: (file: Blob) => ICombinedAssetPostAndSendMessageRequestAction;
    markAsRead: (roomId: string) => IMarkAsReadRequestAction;
    updateRoom: (putRoom: IRoom) => IRoomUpdateRequestAction;
}
export declare class MessagePage extends React.Component<IProps, {}> {
    private isReceiveMessagesFinished;
    private onScroll;
    private updateMessages;
    private handleScroll;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onRoomSetting(): void;
    render(): JSX.Element;
}
export declare const ContainerMessagePage: React.ComponentClass<IProps>;
