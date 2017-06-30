/// <reference types="react" />
import * as React from 'react';
export interface IProps {
    title: string;
    pictureUrl?: string;
    leftButton?: React.ReactNode;
    rightButton?: React.ReactNode;
}
export declare class TopBar extends React.Component<IProps, void> {
    render(): JSX.Element;
}
