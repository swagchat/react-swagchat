/// <reference types="react" />
import * as React from 'react';
import { IPluginState, IUserState, IRoomState } from '../../stores/';
export interface IMessageMenuBottomProps {
    pluginState: IPluginState;
    userState: IUserState;
    roomState: IRoomState;
    currentMenuIndex: number;
    updateMenuIndex: (currentMenuINdex: number) => void;
    availableMessageTypes: string[] | null;
}
export declare class MessageMenuBottom extends React.Component<IMessageMenuBottomProps, {}> {
    render(): JSX.Element;
}
