/// <reference types="react" />
import * as React from 'react';
import { IUserState, IRoomState, IStyleState } from '../../stores/';
export interface IRoomSettingListProps {
    title?: string;
    desableMarginTop?: boolean;
    displayNoDataImage?: string;
    displayNoDataText?: string;
    userState: IUserState;
    roomState: IRoomState;
    styleState: IStyleState;
    updateStyle: (style: Object) => void;
    userBlockFetch: (blockUserIds: string[]) => void;
    userUnBlockFetch: (blockUserIds: string[]) => void;
    roomUserRemoveFetch: (userIds: string[]) => void;
    onItemTap?: Function;
}
export declare class RoomSettingList extends React.Component<IRoomSettingListProps, void> {
    static defaultProps: Partial<IRoomSettingListProps>;
    onBlockItemTap(): void;
    onLeftItemTap(): void;
    render(): JSX.Element;
}
