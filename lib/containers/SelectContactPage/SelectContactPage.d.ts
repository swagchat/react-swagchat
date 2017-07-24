/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IUser, IRoom } from 'swagchat-sdk';
import { IContactsFetchRequestAction, IUpdateSelectContactsAction, IClearSelectContactsAction } from '../../actions/user';
import { IUserState } from '../../stores/user';
import { ICombinedCreateRoomAndMessagesFetchRequestAction } from '../../actions/combined';
export interface ISelectContactPageProps extends RouteComponentProps<any> {
    title: string;
    userState: IUserState;
    selectContactTitle: string;
    noContactListText: string;
    noContactListImage: string;
    roomListRoutePath: string;
    contactsFetchRequest: () => IContactsFetchRequestAction;
    updateSelectContacts: (contact: IUser) => IUpdateSelectContactsAction;
    clearSelectContacts: () => IClearSelectContactsAction;
    combinedCreateRoomAndMessagesFetchRequest: (room: IRoom) => ICombinedCreateRoomAndMessagesFetchRequestAction;
}
export declare const ContainerSelectContactPage: React.ComponentClass<ISelectContactPageProps>;
