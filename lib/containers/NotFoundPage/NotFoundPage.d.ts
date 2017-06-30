/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
export interface IProps extends RouteComponentProps<any> {
}
export declare class NotFoundPage extends React.Component<IProps, void> {
    render(): JSX.Element;
}
export declare const ContainerNotFoundPage: React.ComponentClass<IProps>;
