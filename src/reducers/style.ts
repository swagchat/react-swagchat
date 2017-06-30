import { IStyleState } from '../stores/';
import {
  IUpdateStyleAction,
  UPDATE_STYLE,
  StyleActions,
} from '../actions/style';

const getInitialState = (): IStyleState => ({
});

export function style(state: IStyleState = getInitialState(), action: StyleActions): IStyleState {
  switch (action.type) {
    case UPDATE_STYLE:
      return Object.assign(
        {},
        state,
        (<IUpdateStyleAction>action).style,
      );
    default:
      return state;
  }
}
