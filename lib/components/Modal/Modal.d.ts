/// <reference types="react" />
import * as React from 'react';
export interface IModalAction {
    name: string;
    onItemTap: any;
}
export interface IModalProps {
    description: string;
    actions: IModalAction[];
    onCloseTap: () => void;
}
export declare class Modal extends React.Component<IModalProps, void> {
    render(): JSX.Element;
}
