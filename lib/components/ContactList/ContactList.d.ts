/// <reference types="react" />
import * as React from 'react';
import { IUser } from 'swagchat-sdk';
import { IOnClickProps } from '../../';
export interface IContactListProps extends IOnClickProps {
    contacts: IUser[];
    hasTopBar?: boolean;
    displayNoDataText?: string;
    displayNoDataImage?: string;
}
export declare class ContactList extends React.Component<IContactListProps, void> {
    static defaultProps: Partial<IContactListProps>;
    onClick(user: IUser): void;
    render(): JSX.Element;
}
