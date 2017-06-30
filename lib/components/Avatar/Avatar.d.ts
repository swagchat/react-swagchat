/// <reference types="react" />
import * as React from 'react';
import { IOnClickProps } from '../../';
export interface IBackButtonProps extends IOnClickProps {
    src: string;
    className?: string;
    width?: number;
    height?: number;
    margin?: number;
}
export declare class Avatar extends React.Component<IBackButtonProps, void> {
    render(): JSX.Element;
}
