import { takeLatest, call, put, ForkEffect, select } from 'redux-saga/effects';
import { State } from '../store';

import {
  IFetchUserResponse,
  IRoomForUser,
  opponentUser,
} from 'swagchat-sdk';
import {
  FETCH_USER_REQUEST,
  FetchUserRequestAction,
  fetchUserRequestSuccessActionCreator,
  fetchUserRequestFailureActionCreator,
} from '../action/user';

function* gFetchUserRequest(action: FetchUserRequestAction) {
  const state: State = yield select();

  if (state.client.userId === '' || state.client.accessToken === '') {
    const error = {
      title: 'not set auth params',
    };
    yield put(fetchUserRequestFailureActionCreator(error));
    return;
  }

  const res: IFetchUserResponse = yield call(() => {
    return state.client.client!.getUser(state.client.userId, state.client.accessToken);
  });
  if (res.user) {
    let userRooms: {[key: string]: IRoomForUser} = {};
    res.user.rooms!.map((value: IRoomForUser) => {
      const users = opponentUser(value.users, state.client.userId);
      let userNames = '';
      if (users) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].isShowUsers) {
            userNames += users[i].name + ' ';
          }
        }
        value.name = userNames;
        value.pictureUrl = users[0].pictureUrl;
      }
      userRooms[value.roomId] = value;
    });

    yield put(fetchUserRequestSuccessActionCreator(res.user, userRooms));
  } else {
    yield put(fetchUserRequestFailureActionCreator(res.error!));
  }
}

export function* userSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(FETCH_USER_REQUEST, gFetchUserRequest);
}
