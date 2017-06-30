/// <reference types="react" />
import * as React from 'react';
import { IRoomForUser } from 'swagchat-sdk';
import { IPluginRoomListItemProps } from '../';
export declare class RoomAndUserNameWithMessage extends React.Component<IPluginRoomListItemProps, void> {
    onClick(room: IRoomForUser): void;
    render(): JSX.Element;
}