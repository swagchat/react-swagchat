/// <reference types="react" />
import * as React from 'react';
import { IUser } from 'swagchat-sdk';
import { IOnClickProps } from '../../';
export interface IContactListProps extends IOnClickProps {
    contacts: IUser[];
    selectedContacts: {
        [key: string]: IUser;
    };
    hasTopBar?: boolean;
    noContactListText?: string;
    noContactListImage?: string;
}
export declare class ContactList extends React.Component<IContactListProps, void> {
    static defaultProps: Partial<IContactListProps>;
    onClick(user: IUser): void;
    render(): JSX.Element;
}
