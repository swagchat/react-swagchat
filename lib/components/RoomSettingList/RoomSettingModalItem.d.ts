/// <reference types="react" />
import * as React from 'react';
import { IModalAction } from '../../';
import { IStyleState } from '../../stores/';
export interface IRoomSettingModalItemProps {
    title: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onItemTap?: Function;
    modalKey: string;
    modalDescription: string;
    modalActions: IModalAction[];
    styleState: IStyleState;
    updateStyle: (style: Object) => void;
}
export declare class RoomSettingModalItem extends React.Component<IRoomSettingModalItemProps, void> {
    private initialInteractionStyle;
    componentDidMount(): void;
    onItemTap(): void;
    onCloseTap(): void;
    render(): JSX.Element;
}
