/// <reference types="react" />
import * as React from 'react';
import { IPluginMessageInteractionProps } from '../';
export declare class TextInteraction extends React.Component<IPluginMessageInteractionProps, {}> {
    private sendIconStyle;
    private fontSize;
    private padding;
    private textValue;
    private textareaDom;
    private newLineCount;
    private previousLastLetter;
    private onKeyDownName;
    private maxCharCount;
    private initialInteractionStyle;
    componentDidMount(): void;
    private onChange(e);
    onKeyDown(e: any): void;
    onClick(): void;
    render(): JSX.Element;
}
