import { Action } from 'redux';
import { Client } from 'swagchat-sdk';

export const SET_CLIENT = 'SET_CLIENT';

export type ClientActionTypes = typeof SET_CLIENT;

export interface ISetClientAction extends Action {
  type: ClientActionTypes;
  client: Client;
}
export const setClientActionCreator = (client: Client): ISetClientAction => ({
  type: SET_CLIENT,
  client: client,
});

export type ClientActions = ISetClientAction;
