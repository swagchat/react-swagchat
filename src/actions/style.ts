import { Action } from 'redux';

export const UPDATE_STYLE = 'UPDATE_STYLE';

export type StyleActionTypes = typeof UPDATE_STYLE
;

export interface IUpdateStyleAction extends Action {
  type: StyleActionTypes;
  style: Object;
}
export const updateStyleActionCreator = (style: Object): IUpdateStyleAction => ({
  type: UPDATE_STYLE,
  style: style,
});

export type StyleActions = IUpdateStyleAction
;
