/// <reference types="react" />
import * as React from 'react';
import { IRoomForUser } from 'swagchat-sdk';
import { IOnClickProps } from '../../';
import { IPluginRoomListItem } from 'swagchat-sdk/src/interface';
export interface IRoomListProps extends IOnClickProps {
    myUserId: string;
    userRooms: IRoomForUser[];
    roomListItems: {
        [key: number]: IPluginRoomListItem;
    };
    customRoomListItems: {
        [key: number]: IPluginRoomListItem;
    };
    title?: string;
    hasTopBar?: boolean;
    hasTabBar?: boolean;
    noRoomListText?: string;
    noRoomListImage?: string;
    noAvatarImages: string[];
}
export declare class RoomList extends React.Component<IRoomListProps, {}> {
    static defaultProps: Partial<IRoomListProps>;
    onClick(room: any): void;
    render(): JSX.Element;
}
