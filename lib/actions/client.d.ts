import { Action } from 'redux';
import { Client } from 'swagchat-sdk';
export declare const SET_CLIENT = "SET_CLIENT";
export declare type ClientActionTypes = typeof SET_CLIENT;
export interface ISetClientAction extends Action {
    type: ClientActionTypes;
    client: Client;
}
export declare const setClientActionCreator: (client: Client) => ISetClientAction;
export declare type ClientActions = ISetClientAction;
