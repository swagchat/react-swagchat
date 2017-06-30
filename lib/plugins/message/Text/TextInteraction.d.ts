/// <reference types="react" />
import * as React from 'react';
import { IPluginMessageInteractionProps } from '../';
export declare class TextInteraction extends React.Component<IPluginMessageInteractionProps, void> {
    private sendIconStyle;
    private fontSize;
    private padding;
    private menuHeight;
    private textValue;
    private textareaDom;
    private newLineCount;
    private initialInteractionStyle;
    constructor(props: IPluginMessageInteractionProps);
    componentDidMount(): void;
    private onChange(e);
    onClick(): void;
    render(): JSX.Element;
}
