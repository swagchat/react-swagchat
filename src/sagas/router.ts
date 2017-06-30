import { takeLatest, ForkEffect, select, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { IFetchUserResponse, User } from 'swagchat-sdk';
import { State } from '../stores';
import { combinedRoomAndMessagesFetchRequestActionCreator } from '../actions/combined';
import { userFetchRequestSuccessActionCreator, userFetchRequestFailureActionCreator } from '../actions/user';
import { setClientActionCreator } from '../actions/client';
import { roomFetchRequestActionCreator } from '../actions/room';
import { clearMessagesActionCreator } from '../actions/message';

function* locationChange() {
  const state: State = yield select();
  const pathname = state.router.location!.pathname;
  if (pathname === '/') {
    yield put(clearMessagesActionCreator());
  }

  if (pathname.startsWith('/messages') || pathname.startsWith('/roomSetting')) {
    const res: IFetchUserResponse = yield call(() => {
      return User.auth({
        apiKey: state.user.apiKey,
        apiEndpoint: state.user.apiEndpoint,
        realtimeEndpoint: state.user.realtimeEndpoint,
        userId: state.user.userId,
        accessToken: state.user.accessToken,
      });
    });
    if (res.user) {
      yield put(setClientActionCreator(res.user._client));
      yield put(userFetchRequestSuccessActionCreator(res.user));

      let roomId;
      if (pathname.startsWith('/messages')) {
        roomId = pathname.replace(/\/messages\//g, '');
        yield put(combinedRoomAndMessagesFetchRequestActionCreator(roomId));
      } else if (pathname.startsWith('/roomSetting')) {
        roomId = pathname.replace(/\/roomSetting\//g, '');
        yield put(roomFetchRequestActionCreator(roomId));
      }
    } else {
      yield put(userFetchRequestFailureActionCreator(res.error!));
    }
  }
}

export function* routerSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(LOCATION_CHANGE, locationChange);
}
