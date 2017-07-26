/// <reference types="react" />
import * as React from 'react';
import { IOnClickProps } from '../../';
export interface IAvatarProps extends IOnClickProps {
    src: string;
    className?: string;
    width?: number;
    height?: number;
    margin?: number;
}
export declare class Avatar extends React.Component<IAvatarProps, void> {
    render(): JSX.Element;
}
