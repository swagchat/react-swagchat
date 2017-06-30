/// <reference types="react" />
import * as React from 'react';
import { IPluginMessageItemProps } from '../';
export interface IImagePayload {
    mime: string;
    sourceUrl: string;
    thumbnailUrl: string;
}
export declare class ImageItem extends React.Component<IPluginMessageItemProps, void> {
    render(): JSX.Element;
}
