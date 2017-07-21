/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IUserState } from '../../stores/user';
export interface ISelectContactPageProps extends RouteComponentProps<any> {
    title: string;
    userState: IUserState;
}
export declare const ContainerSelectContactPage: React.ComponentClass<ISelectContactPageProps>;
