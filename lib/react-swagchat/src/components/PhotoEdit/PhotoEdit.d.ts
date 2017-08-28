/// <reference types="react" />
import * as React from 'react';
import { IOnClickProps } from '../../';
export interface IPhotoEditProps extends IOnClickProps {
    src: string;
    className?: string;
    width?: number;
    height?: number;
    margin?: number;
    onUpdatePhoto: (updatePictureUrl: Blob) => void;
}
export declare class PhotoEdit extends React.Component<IPhotoEditProps, {}> {
    private selectImage;
    private confirmImageDOM;
    private inputFileDom;
    onFileUploadChange: (e: any) => void;
    onPhoto: (e: any) => void;
    render(): JSX.Element;
}
