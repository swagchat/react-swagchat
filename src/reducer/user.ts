import { UserState } from '../store/user';
import {
  LoginRequestSuccessAction,
  LoginRequestFailureAction,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  UserActions,
} from '../action/user';

const getInitialState = (): UserState => ({
  currentUserID: '',
  users: null,
  user:  null,
  errorResponse: null,
});

export function user(state: UserState = getInitialState(), action: UserActions): UserState {
  switch (action.type) {
    case LOGIN_REQUEST_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          user: (action as LoginRequestSuccessAction).user,
        }
      );
    case LOGIN_REQUEST_FAILURE:
      return Object.assign(
        {},
        state,
        {
          user: null,
          errorResponse: (action as LoginRequestFailureAction).errorResponse,
        }
      );
    default:
      return state;
  }
}
