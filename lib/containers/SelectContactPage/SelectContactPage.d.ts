/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IContactsFetchRequestAction } from '../../actions/user';
import { IUserState } from '../../stores/user';
export interface ISelectContactPageProps extends RouteComponentProps<any> {
    title: string;
    userState: IUserState;
    contactsFetchRequest: () => IContactsFetchRequestAction;
}
export declare const ContainerSelectContactPage: React.ComponentClass<ISelectContactPageProps>;
