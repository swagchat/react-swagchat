/// <reference types="react" />
import * as React from 'react';
import { IPluginMessageInteractionProps } from '../';
export declare class ImageInteraction extends React.Component<IPluginMessageInteractionProps, {}> {
    private selectImage;
    private confirmImageDOM;
    private inputFileDom;
    private initialInteractionStyle;
    componentDidMount(): void;
    onFileUploadChange(e: any): void;
    onConfirmClose(): void;
    onFileUploadRequest(): void;
    render(): JSX.Element;
}
