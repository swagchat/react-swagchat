/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IUser, IRoom } from 'swagchat-sdk';
import { IContactsFetchRequestAction, IUpdateSelectContactsAction, IClearSelectContactsAction } from 'swagchat-sdk/src/actions/user';
import { IRoomUpdatePictureAction } from 'swagchat-sdk/src/actions/room';
import { IUpdateStyleAction } from 'swagchat-sdk/src/actions/style';
import { IUserState } from 'swagchat-sdk/src/stores/user';
import { IRoomState } from 'swagchat-sdk/src/stores/room';
import { IStyleState } from 'swagchat-sdk/src/stores/style';
import { ISettingState } from 'swagchat-sdk/src/stores/setting';
import { ICombinedCreateRoomAndMessagesFetchRequestAction, ICombinedAssetPostAndRoomCreatAndMessageFetchRequestAction } from 'swagchat-sdk/src/actions/combined';
import { IRoomUpdateNameAction } from 'swagchat-sdk/src/actions/room';
export interface ISelectContactPageProps extends RouteComponentProps<any> {
    title: string;
    userState: IUserState;
    roomState: IRoomState;
    styleState: IStyleState;
    settingState: ISettingState;
    selectContactTitle: string;
    noContactListText: string;
    noContactListImage: string;
    roomListRoutePath: string;
    contactsFetchRequest: () => IContactsFetchRequestAction;
    updateSelectContacts: (contact: IUser) => IUpdateSelectContactsAction;
    clearSelectContacts: () => IClearSelectContactsAction;
    combinedCreateRoomAndMessagesFetchRequest: (room: IRoom) => ICombinedCreateRoomAndMessagesFetchRequestAction;
    updateStyle: (style: Object) => IUpdateStyleAction;
    roomUpdateName: (updateName: string) => IRoomUpdateNameAction;
    roomUpdatePicture: (updatePicture: Blob) => IRoomUpdatePictureAction;
    assetPostAndRoomCreateAndMessageFetchRequest: () => ICombinedAssetPostAndRoomCreatAndMessageFetchRequestAction;
}
export declare const ContainerSelectContactPage: React.ComponentClass<ISelectContactPageProps>;
