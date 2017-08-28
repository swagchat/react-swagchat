/// <reference types="react" />
import * as React from 'react';
import { IRoomForUser } from 'swagchat-sdk';
import { IPluginRoomListItem } from 'swagchat-sdk/src/interface';
export interface IRoomItemProps {
    myUserId: string;
    roomListItems: {
        [key: number]: IPluginRoomListItem;
    };
    customRoomListItems?: {
        [key: number]: IPluginRoomListItem;
    };
    userRoom: IRoomForUser;
    noAvatarImages: string[];
    onClick?: Function;
}
export declare class RoomItem extends React.Component<IRoomItemProps, {}> {
    render(): JSX.Element;
}
