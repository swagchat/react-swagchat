import { takeLatest, call, put, ForkEffect } from 'redux-saga/effects';
// import { push } from 'react-router-redux';
// import { InvalidParam } from '../store';
import { InvalidParam, ErrorResponse } from '../protogen/errorResponse_pb';

import {
  UserResponse,
} from '../store/user';
import {
  LOGIN_REQUEST,
  LoginRequestAction,
  loginRequestSuccessActionCreator,
  loginRequestFailureActionCreator,
} from '../action/user';

function* gLoginRequest(action: LoginRequestAction) {
  const res: UserResponse = yield call((username: string, password: string) => {
    let invalidParams = new Array<InvalidParam>();
    if (username === '') {
      const invalidParam = new InvalidParam();
      invalidParam.setName('username');
      invalidParam.setReason('username is empty');
      invalidParams.push(invalidParam);
    }
    if (password === '') {
      const invalidParam = new InvalidParam();
      invalidParam.setName('password');
      invalidParam.setReason('password is empty');
      invalidParams.push(invalidParam);
    }
    if (username === 'admin' && password === 'admin') {
      return {
        user: {
          userID: 'admin',
          name: 'admin',
        },
        error: null,
      };
    }
    let errorResponse = new ErrorResponse();
    errorResponse.setTitle('login failure');
    errorResponse.setInvalidparamsList(invalidParams);
    return {
      user: null,
      errorResponse: errorResponse,
    };
  },                                   action.username, action.password);
  if (res.user) {
    yield put(loginRequestSuccessActionCreator(res.user));
    // store.dispatch(push('/'));
  } else {
    yield put(loginRequestFailureActionCreator(res.errorResponse!));
  }
}

export function* userSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(LOGIN_REQUEST, gLoginRequest);
}
