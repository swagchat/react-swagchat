/// <reference types="react" />
import * as React from 'react';
export interface IRoomSeparatorProps {
    title: string;
    isDisplayBorder?: boolean;
}
export declare class SubTitleBar extends React.Component<IRoomSeparatorProps, void> {
    static defaultProps: Partial<IRoomSeparatorProps>;
    render(): JSX.Element;
}
