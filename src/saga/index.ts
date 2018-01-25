import { fork, ForkEffect } from 'redux-saga/effects';
import { userSaga } from './user';
// import { routerSaga } from './router';

export function* rootSaga(): IterableIterator<ForkEffect> {
  yield fork(userSaga);
  // yield fork(routerSaga);
}
