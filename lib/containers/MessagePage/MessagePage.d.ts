/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IRoom } from 'swagchat-sdk';
import { IClientState, IPluginState, IUserState, IRoomState, IMessageState, IStyleState, ISettingState } from '../../stores';
import { IMessageBodyMenuStyle, IPluginMessageTextInteractionStyle } from '../../stores/style';
import { IMarkAsReadRequestAction } from '../../actions/user';
import { IRoomUpdateRequestAction } from '../../actions/room';
import { ICombinedAssetPostAndSendMessageRequestAction } from '../../actions/combined';
import { IPluginMessageUpdateMenuIndexAction } from '../../actions/plugin';
import { IUpdateStyleAction, IUpdateMessageBodyMenuStyleAction, IUpdatePluginMessageTextInteractionStyleAction } from '../../actions/style';
import { IMessagesFetchRequestAction, ISendMessagesAction, ICreateMessageAction } from '../../actions/message';
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
export declare class MessagePage extends React.Component<IProps, void> {
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
