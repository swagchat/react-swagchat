/// <reference types="react" />
import * as React from 'react';
export interface ISettingState {
    setting: Object;
    roomListTitle: string;
    roomListTabbar: React.ComponentClass<any> | null;
    noRoomListText: string;
    noRoomListImage: string;
    noMessageText: string;
    noMessageImage: string;
    inputMessagePlaceholderText: string;
    roomSettingTitle: string;
    roomMembersTitle: string;
}
