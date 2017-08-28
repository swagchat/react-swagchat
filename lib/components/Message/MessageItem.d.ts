/// <reference types="react" />
import * as React from 'react';
import { IUserForRoom, IMessage } from 'swagchat-sdk';
import { IPluginState } from '../../stores/';
export interface IMessageItemProps {
    pluginState: IPluginState;
    message: IMessage;
    user: IUserForRoom;
    myUserId: string;
}
export declare class MessageItem extends React.Component<IMessageItemProps, {}> {
    render(): JSX.Element;
}
