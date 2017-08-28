/// <reference types="react" />
import * as React from 'react';
import { IStyleState } from 'swagchat-sdk/src/stores/';
export interface IModalProps {
    title: string;
    component: React.ReactNode;
    modalKey: string;
    styleState: IStyleState;
    updateStyle: (style: Object) => void;
    onOkClick: () => void;
}
export declare class ModalView extends React.Component<IModalProps, {}> {
    private initialInteractionStyle;
    componentDidMount(): void;
    onItemTap(): void;
    onCloseTap(): void;
    onWrapTap(e: any): void;
    render(): JSX.Element;
}
