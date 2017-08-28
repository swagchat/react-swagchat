/// <reference types="react" />
import * as React from 'react';
import { IOnClickProps } from '../../';
export interface IButtonProps extends IOnClickProps {
    icon?: React.ReactNode;
    text?: string;
    className?: string;
    style?: Object;
}
export declare const Button: (props: IButtonProps) => JSX.Element;
