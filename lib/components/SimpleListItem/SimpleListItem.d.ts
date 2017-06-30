/// <reference types="react" />
import * as React from 'react';
import { IOnClickProps } from '../../';
export interface ISimpleListItemProps extends IOnClickProps {
    name: string;
    pictureUrl: string;
    width?: number;
    height?: number;
}
export declare class SimpleListItem extends React.Component<ISimpleListItemProps, void> {
    static defaultProps: Partial<ISimpleListItemProps>;
    render(): JSX.Element;
}
