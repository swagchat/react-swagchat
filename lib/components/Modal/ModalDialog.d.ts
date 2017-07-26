/// <reference types="react" />
import * as React from 'react';
import { IStyleState } from '../../stores/';
export interface IModalAction {
    name: string;
    type: string;
    onItemTap: any;
}
export interface IModalProps {
    description: string;
    actions: IModalAction[];
    modalKey: string;
    styleState: IStyleState;
    updateStyle: (style: Object) => void;
}
export declare class ModalDialog extends React.Component<IModalProps, void> {
    private initialInteractionStyle;
    componentDidMount(): void;
    onItemTap(): void;
    onCloseTap(): void;
    onWrapTap(e: any): void;
    render(): JSX.Element;
}
