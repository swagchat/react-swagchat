/// <reference types="react" />
import * as React from 'react';
import { IRoomForUser } from 'swagchat-sdk';
import { IPluginRoomListItemProps } from '../';
export declare class RoomNameWithMessage extends React.Component<IPluginRoomListItemProps, {}> {
    onClick(room: IRoomForUser): void;
    render(): JSX.Element;
}
