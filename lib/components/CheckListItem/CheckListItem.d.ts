/// <reference types="react" />
import * as React from 'react';
import { IUser } from 'swagchat-sdk';
import { IOnClickProps } from '../../';
export interface ICheckListItemProps extends IOnClickProps {
    user: IUser;
}
export declare class CheckListItem extends React.Component<ICheckListItemProps, void> {
    onClick(user: IUser): void;
    render(): JSX.Element;
}
