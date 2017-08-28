/// <reference types="react" />
import * as React from 'react';
import { IOnClickProps } from '../../';
export interface IIconListItemProps extends IOnClickProps {
    title: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
export declare class IconListItem extends React.Component<IIconListItemProps, {}> {
    render(): JSX.Element;
}
