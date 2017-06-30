import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import { User, IFetchUserResponse, IFetchRoomResponse, IPostAssetResponse, IMessage, IFetchMessagesResponse } from 'swagchat-sdk';
import * as Scroll from 'react-scroll';

import {
  setClientActionCreator,
} from '../actions/client';
import {
  userFetchRequestSuccessActionCreator,
  markAsReadRequestActionCreator,
  userFetchRequestFailureActionCreator,
} from  '../actions/user';
import {
  IRoomFetchRequestAction,
  roomFetchRequestSuccessActionCreator,
  roomFetchRequestFailureActionCreator,
} from '../actions/room';
import {
  ICombinedAssetPostAndSendMessageRequestAction,
  ICombinedUserAndRoomAndMessagesFetchRequestAction,
  ICombinedUserAndRoomFetchRequestAction,
  ICombinedUpdateMessagesAction,
  combinedUpdateMessagesActionCreator,
  COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST,
  COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST,
  COMBINED_USER_AND_ROOM_FETCH_REQUEST,
  COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST,
  COMBINED_UPDATE_MESSAGES,
} from '../actions/combined';
import {
  updateMessagesActionCreator,
  createMessageActionCreator,
  messagesSendRequestActionCreator,
  beforeMessagesFetchActionActionCreator,
  // messagesFetchRequestActionCreator,
  messagesFetchRequestSuccessActionCreator,
  messagesFetchRequestFailureActionCreator,
} from '../actions/message';
import {
  assetPostRequestSuccessActionCreator,
  assetPostRequestFailureActionCreator,
} from '../actions/asset';
import { store, State } from '../stores';
import { logColor } from '../';

function* fetchRoomAndMessages(action: IRoomFetchRequestAction) {
  const state: State = yield select();
  const fetchRoomRes: IFetchRoomResponse = yield call((roomId: string) => {
    return state.client.client!.getRoom(roomId);
  }, action.roomId);
  if (fetchRoomRes.room) {
    yield put(roomFetchRequestSuccessActionCreator(fetchRoomRes.room));
    yield put(beforeMessagesFetchActionActionCreator(fetchRoomRes.room.messageCount, 20));
    const fetchMessageRes: IFetchMessagesResponse = yield call(() => {
      return fetchRoomRes.room!.getMessages({
        limit: 20,
        offset: (fetchRoomRes.room!.messageCount - 20) < 0 ? 0 : fetchRoomRes.room!.messageCount - 20,
      });
    });
    if (fetchMessageRes.messages) {
      yield put(messagesFetchRequestSuccessActionCreator(fetchMessageRes.messages!));
      yield put(markAsReadRequestActionCreator(fetchRoomRes.room.roomId));
      Scroll.animateScroll.scrollToBottom({duration: 0});
    } else {
      yield put(messagesFetchRequestFailureActionCreator(fetchMessageRes.error!));
    }

    fetchRoomRes.room.subscribeMessage((message: IMessage) => {
      console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + logColor);
      store.dispatch(combinedUpdateMessagesActionCreator([message]));
    });
  } else {
    yield put(roomFetchRequestFailureActionCreator(fetchRoomRes.error!));
  }
}

function* fetchUserAndRoomAndMessages(action: ICombinedUserAndRoomAndMessagesFetchRequestAction) {
  const fetchUserRes: IFetchUserResponse = yield call((apiKey: string, apiEndpoint: string, realtimeEndpoint: string, userId: string, accessToken: string) => {
    return User.auth({
      apiKey: apiKey!,
      apiEndpoint: apiEndpoint!,
      realtimeEndpoint: realtimeEndpoint!,
      userId: userId!,
      accessToken: accessToken!,
    });
  }, action.apiKey, action.apiEndpoint, action.realtimeEndpoint, action.userId, action.accessToken);
  if (fetchUserRes.user) {
    yield put(userFetchRequestSuccessActionCreator(fetchUserRes.user));
    yield put(setClientActionCreator(fetchUserRes.user._client));
    const fetchRoomRes: IFetchRoomResponse = yield call((roomId: string) => {
      return fetchUserRes.user!._client.getRoom(roomId);
    }, action.roomId);
    if (fetchRoomRes.room) {
      yield put(roomFetchRequestSuccessActionCreator(fetchRoomRes.room));
      yield put(beforeMessagesFetchActionActionCreator(fetchRoomRes.room.messageCount, 20));
      const state: State = yield select();
      const fetchMessageRes: IFetchMessagesResponse = yield call(() => {
        return fetchRoomRes.room!.getMessages({
          limit: state.message.messagesLimit,
          offset: state.message.messagesOffset,
        });
      });
      if (fetchMessageRes.messages) {
        yield put(messagesFetchRequestSuccessActionCreator(fetchMessageRes.messages!));
        yield put(markAsReadRequestActionCreator(fetchRoomRes.room.roomId));
        Scroll.animateScroll.scrollToBottom({duration: 0});

        fetchRoomRes.room.subscribeMessage((message: IMessage) => {
          console.info('%c[ReactSwagChat]Receive message(push)', 'color:' + logColor);
          store.dispatch(combinedUpdateMessagesActionCreator([message]));
        });
      } else {
        yield put(messagesFetchRequestFailureActionCreator(fetchMessageRes.error!));
      }
    } else {
      yield put(roomFetchRequestFailureActionCreator(fetchRoomRes.error!));
    }
  } else {
    yield put(userFetchRequestFailureActionCreator(fetchUserRes.error!));
  }
}

function* fetchUserAndRoom(action: ICombinedUserAndRoomFetchRequestAction) {
  const fetchUserRes: IFetchUserResponse = yield call((apiKey: string, apiEndpoint: string, realtimeEndpoint: string, userId: string, accessToken: string) => {
    return User.auth({
      apiKey: apiKey!,
      apiEndpoint: apiEndpoint!,
      realtimeEndpoint: realtimeEndpoint!,
      userId: userId!,
      accessToken: accessToken!,
    });
  }, action.apiKey, action.apiEndpoint, action.realtimeEndpoint, action.userId, action.accessToken);
  if (fetchUserRes.user) {
    yield put(userFetchRequestSuccessActionCreator(fetchUserRes.user));
    yield put(setClientActionCreator(fetchUserRes.user._client));
    const fetchRoomRes: IFetchRoomResponse = yield call((roomId: string) => {
      return fetchUserRes.user!._client.getRoom(roomId);
    }, action.roomId);
    if (fetchRoomRes.room) {
      yield put(roomFetchRequestSuccessActionCreator(fetchRoomRes.room));
    } else {
      yield put(roomFetchRequestFailureActionCreator(fetchRoomRes.error!));
    }
  } else {
    yield put(userFetchRequestFailureActionCreator(fetchUserRes.error!));
  }
}

function* assetPostAndSendMessage(action: ICombinedAssetPostAndSendMessageRequestAction) {
  const state = yield select();
  const res: IPostAssetResponse = yield call((file: Blob) => {
    return state.user.user.fileUpload(file);
  }, action.file);
  if (res.asset) {
    yield put(assetPostRequestSuccessActionCreator(res.asset));
    yield put(createMessageActionCreator('image', {
      mime: res.asset.mime,
      sourceUrl: res.asset.sourceUrl,
    }));
    yield put(messagesSendRequestActionCreator());
  } else {
    yield put(assetPostRequestFailureActionCreator(res.error!));
  }
}

function* updateMessages(action: ICombinedUpdateMessagesAction) {
  yield put(updateMessagesActionCreator(action.messages));
  Scroll.animateScroll.scrollToBottom({duration: 300});
}

export function* combinedSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST, fetchRoomAndMessages);
  yield takeLatest(COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST, fetchUserAndRoomAndMessages);
  yield takeLatest(COMBINED_USER_AND_ROOM_FETCH_REQUEST, fetchUserAndRoom);
  yield takeLatest(COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST, assetPostAndSendMessage);
  yield takeLatest(COMBINED_UPDATE_MESSAGES, updateMessages);
}
