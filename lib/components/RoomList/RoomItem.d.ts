/// <reference types="react" />
import * as React from 'react';
import { IRoomForUser } from 'swagchat-sdk';
import { IPluginRoomListItem } from '../../plugins/roomListItem';
export interface IRoomItemProps {
    myUserId: string;
    roomListItems: {
        [key: number]: IPluginRoomListItem;
    };
    userRoom: IRoomForUser;
    onClick?: Function;
    customRoomListItems?: {
        [key: number]: IPluginRoomListItem;
    };
}
export declare class RoomItem extends React.Component<IRoomItemProps, void> {
    render(): JSX.Element;
}
