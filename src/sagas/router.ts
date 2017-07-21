import { takeLatest, ForkEffect, select, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { IFetchUserResponse, User } from 'swagchat-sdk';
import { State } from '../stores';
import { combinedRoomAndMessagesFetchRequestActionCreator } from '../actions/combined';
import { userFetchRequestSuccessActionCreator, userFetchRequestFailureActionCreator } from '../actions/user';
import { setClientActionCreator } from '../actions/client';
import { roomFetchRequestActionCreator } from '../actions/room';
import { clearMessagesActionCreator } from '../actions/message';
import { userAuthRequestActionCreator, contactsFetchRequestActionCreator } from '../actions/user';

function* locationChange() {
  const state: State = yield select();
  if (!state.router.location) {
    return;
  }

  const pathname = state.router.location!.pathname;

  let roomListPathRegExp = state.setting.roomListRoutePath ? pathname.match(new RegExp('^' + state.setting.roomListRoutePath + '$')) : null;
  let messagePathRegExp = state.setting.messageRoutePath ? pathname.match(new RegExp('^' + state.setting.messageRoutePath)) : null;
  let roomSettingPathRegExp = state.setting.roomSettingRoutePath ? pathname.match(new RegExp('^' + state.setting.roomSettingRoutePath)) : null;
  let selectContactPathRegExp = state.setting.selectContactRoutePath ? pathname.match(new RegExp('^' + state.setting.selectContactRoutePath)) : null;

  if (roomListPathRegExp) {
    yield put(clearMessagesActionCreator());
    yield put(userAuthRequestActionCreator());
  }
  if (messagePathRegExp || roomSettingPathRegExp) {
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
      if (messagePathRegExp) {
        yield put(clearMessagesActionCreator());
        roomId = pathname.match(new RegExp(state.setting.messageRoutePath + '([a-zA-z0-9-]+)'));
        if (roomId) {
          yield put(combinedRoomAndMessagesFetchRequestActionCreator(roomId[1]));
        }
      } else if (roomSettingPathRegExp) {
        roomId = pathname.match(new RegExp(state.setting.roomSettingRoutePath + '([a-zA-z0-9-]+)'));
        if (roomId) {
          yield put(roomFetchRequestActionCreator(roomId[1]));
        }
      }
    } else {
      yield put(userFetchRequestFailureActionCreator(res.error!));
    }
  }
  if (selectContactPathRegExp) {
    yield put(contactsFetchRequestActionCreator());
  }
}

export function* routerSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(LOCATION_CHANGE, locationChange);
}
