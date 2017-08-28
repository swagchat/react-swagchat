/// <reference types="react" />
import * as React from 'react';
import { IPluginMessageItemProps } from '../';
export interface ITextPayload {
    text: string;
}
export declare class TextItem extends React.Component<IPluginMessageItemProps, {}> {
    render(): JSX.Element;
}
