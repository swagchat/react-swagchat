/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IContactsFetchRequestAction } from '../../actions/user';
import { IUserState, IRoomState, IStyleState, ISettingState } from '../../stores/';
import { IUpdateStyleAction } from '../../actions/style';
import { IUserBlockFetchRequestAction, IUserUnBlockFetchRequestAction } from '../../actions/user';
import { ICombinedAssetPostAndRoomUpdateRequestAction } from '../../actions/combined';
import { IRoomUserRemoveFetchRequestAction, IRoomUpdateNameAction, IRoomUpdatePictureAction } from '../../actions/room';
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
