/// <reference types="react" />
import * as React from 'react';
export interface IRoomEditProps {
    roomName: string;
    roomPictureUrl: string;
    roomUpdateName: (updateName: string) => void;
    roomUpdatePicture: (updatePicture: Blob) => void;
}
export declare class RoomEdit extends React.Component<IRoomEditProps, {}> {
    private inputTextDom;
    componentDidMount(): void;
    onInputTextChange: (e: any) => void;
    render(): JSX.Element;
}
