/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IContactsFetchRequestAction } from 'swagchat-sdk/src/actions/user';
import { IUserState, IRoomState, IStyleState, ISettingState } from 'swagchat-sdk/src/stores/';
import { IUpdateStyleAction } from 'swagchat-sdk/src/actions/style';
import { IUserBlockFetchRequestAction, IUserUnBlockFetchRequestAction } from 'swagchat-sdk/src/actions/user';
import { ICombinedAssetPostAndRoomUpdateRequestAction } from 'swagchat-sdk/src/actions/combined';
import { IRoomUserRemoveFetchRequestAction, IRoomUpdateNameAction, IRoomUpdatePictureAction } from 'swagchat-sdk/src/actions/room';
export interface IRoomSettingPageProps extends RouteComponentProps<any> {
    title: string;
    userState: IUserState;
    roomState: IRoomState;
    styleState: IStyleState;
    settingState: ISettingState;
    updateStyle: (style: Object) => IUpdateStyleAction;
    contactsFetchRequest: () => IContactsFetchRequestAction;
    userBlockFetch: (blockUserIds: string[]) => IUserBlockFetchRequestAction;
    userUnBlockFetch: (blockUserIds: string[]) => IUserUnBlockFetchRequestAction;
    roomUserRemoveFetch: (userIds: string[]) => IRoomUserRemoveFetchRequestAction;
    roomUpdateName: (updateName: string) => IRoomUpdateNameAction;
    roomUpdatePicture: (updatePicture: Blob) => IRoomUpdatePictureAction;
    assetPostAndRoomUpdate: () => ICombinedAssetPostAndRoomUpdateRequestAction;
}
export declare const ContainerRoomSettingPage: React.ComponentClass<IRoomSettingPageProps>;
