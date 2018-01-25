import { takeLatest, ForkEffect, put } from 'redux-saga/effects';
import { LOCATION_CHANGE, RouterAction } from 'react-router-redux';
import { loginRequestSuccessActionCreator } from '../action/user';

function* gLocationChange(action: RouterAction) {
  window.console.log(action);
  yield put(loginRequestSuccessActionCreator({
    userID: 'aaaa',
    name: 'bbbb',
  }));
}

export function* routerSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(LOCATION_CHANGE, gLocationChange);
}
