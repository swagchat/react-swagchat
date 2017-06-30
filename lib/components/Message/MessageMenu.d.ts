/// <reference types="react" />
import * as React from 'react';
import { IPluginState, IUserState, IRoomState } from '../../stores/';
export interface IProps {
    pluginState: IPluginState;
    userState: IUserState;
    roomState: IRoomState;
    currentMenuIndex: number;
    updateMenuIndex: (currentMenuINdex: number) => void;
    availableMessageTypes: string[] | null;
}
export declare class MessageMenu extends React.Component<IProps, void> {
    render(): JSX.Element;
}
