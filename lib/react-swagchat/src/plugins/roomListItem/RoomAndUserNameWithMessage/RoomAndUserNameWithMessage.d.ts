/// <reference types="react" />
import * as React from 'react';
import { IRoomForUser } from 'swagchat-sdk';
import { IPluginRoomListItemProps } from 'swagchat-sdk/src/interface';
export declare class RoomAndUserNameWithMessage extends React.Component<IPluginRoomListItemProps, {}> {
    onClick(room: IRoomForUser): void;
    render(): JSX.Element;
}
