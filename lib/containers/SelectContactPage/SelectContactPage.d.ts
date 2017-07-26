/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IUser, IRoom } from 'swagchat-sdk';
import { IContactsFetchRequestAction, IUpdateSelectContactsAction, IClearSelectContactsAction } from '../../actions/user';
import { IRoomUpdatePictureAction } from '../../actions/room';
import { IUpdateStyleAction } from '../../actions/style';
import { IUserState } from '../../stores/user';
import { IRoomState } from '../../stores/room';
import { IStyleState } from '../../stores/style';
import { ISettingState } from '../../stores/setting';
import { ICombinedCreateRoomAndMessagesFetchRequestAction, ICombinedAssetPostAndRoomCreatAndMessageFetchRequestAction } from '../../actions/combined';
import { IRoomUpdateNameAction } from '../../actions/room';
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
