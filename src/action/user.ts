import { Action } from 'redux';
import { User } from '../store/user';
// import { ErrorResponse } from '../store';
import { ErrorResponse } from '../protogen/errorResponse_pb';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILURE = 'LOGIN_REQUEST_FAILURE';

export type UserActionTypes = typeof LOGIN_REQUEST
  | typeof LOGIN_REQUEST_SUCCESS
  | typeof LOGIN_REQUEST_FAILURE
;

export interface UserBaseAction extends Action {
  type: UserActionTypes;
}

export interface LoginRequestAction extends UserBaseAction {
  username: string;
  password: string;
}
export const loginRequestActionCreator = (username: string, password: string): LoginRequestAction => ({
  type: LOGIN_REQUEST,
  username: username,
  password: password,
});

export interface LoginRequestSuccessAction extends UserBaseAction {
  user: User;
}
export const loginRequestSuccessActionCreator = (asset: User): LoginRequestSuccessAction => ({
  type: LOGIN_REQUEST_SUCCESS,
  user: asset,
});

export interface LoginRequestFailureAction extends UserBaseAction {
  errorResponse: ErrorResponse;
}
export const loginRequestFailureActionCreator = 
  (errorResponse: ErrorResponse): LoginRequestFailureAction => ({
  type: LOGIN_REQUEST_FAILURE,
  errorResponse: errorResponse,
});

export type UserActions = UserBaseAction
  | LoginRequestAction
  | LoginRequestSuccessAction
  | LoginRequestFailureAction
;
