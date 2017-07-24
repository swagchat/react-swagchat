/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IRoomForUser } from 'swagchat-sdk';
import { IPluginRoomListItem } from '../../plugins/roomListItem';
export interface IRoomListPageProps extends RouteComponentProps<any> {
    apiKey: string;
    apiEndpoint: string;
    userAccessToken: string;
    roomListTitle: string;
    userId: string;
    userRooms: IRoomForUser[];
    roomListItems: {
        [key: number]: IPluginRoomListItem;
    };
    noRoomListText: string;
    noRoomListImage: string;
    noAvatarImages: string[];
    roomListRoutePath: string;
    messageRoutePath: string;
    selectContactRoutePath: string;
    roomListTabbar: React.ComponentClass<any> | null;
}
export declare const ContainerRoomListPage: React.ComponentClass<IRoomListPageProps>;
