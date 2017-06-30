import { Action } from 'redux';
export declare const UPDATE_STYLE = "UPDATE_STYLE";
export declare type StyleActionTypes = typeof UPDATE_STYLE;
export interface IUpdateStyleAction extends Action {
    type: StyleActionTypes;
    style: Object;
}
export declare const updateStyleActionCreator: (style: Object) => IUpdateStyleAction;
export declare type StyleActions = IUpdateStyleAction;
