import { ClientState } from '../store/client';
import {
  SetClientAction,
  SetCurrentRoomAction,
  SetAuthParamsAction,
  SET_CLIENT,
  SET_CURRENT_ROOM,
  SET_AUTH_PARAMS,
  ClientActions,
} from '../action/client';

const getInitialState = (): ClientState => ({
  client: null,
  currentRoom: null,
  userId: '',
  accessToken: '',
});

export function client(state: ClientState = getInitialState(), action: ClientActions): ClientState {
  switch (action.type) {
    case SET_CLIENT:
      return Object.assign(
        {},
        state,
        {
          client: (action as SetClientAction).client,
        }
      );
    case SET_CURRENT_ROOM:
      return Object.assign(
        {},
        state,
        {
          currentRoom: (action as SetCurrentRoomAction).currentRoom,
        }
      );
    case SET_AUTH_PARAMS:
      const setUserAuthParamsAction = action as SetAuthParamsAction;
      return Object.assign(
        {},
        state,
        {
          userId: setUserAuthParamsAction.userId,
          accessToken: setUserAuthParamsAction.accessToken,
        }
      );
    default:
      return state;
  }
}