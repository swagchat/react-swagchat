import { Action } from 'redux';
import { IAsset, IProblemDetail } from 'swagchat-sdk';

export const ASSET_POST_REQUEST = 'ASSET_POST_REQUEST';
export const ASSET_POST_REQUEST_SUCCESS = 'ASSET_POST_REQUEST_SUCCESS';
export const ASSET_POST_REQUEST_FAILURE = 'ASSET_POST_REQUEST_FAILURE';

export type AssetActionTypes = typeof ASSET_POST_REQUEST
  | typeof ASSET_POST_REQUEST_SUCCESS
  | typeof ASSET_POST_REQUEST_FAILURE
;

export interface IAssetPostRequestAction extends Action {
  type: AssetActionTypes;
  file: Blob;
}
export const assetPostRequestActionCreator = (file: Blob): IAssetPostRequestAction => ({
  type: ASSET_POST_REQUEST,
  file: file,
});

export interface IAssetPostRequestSuccessAction extends Action {
  type: AssetActionTypes;
  asset: IAsset;
}
export const assetPostRequestSuccessActionCreator = (asset: IAsset): IAssetPostRequestSuccessAction => ({
  type: ASSET_POST_REQUEST_SUCCESS,
  asset: asset,
});

export interface IAssetPostRequestFailureAction extends Action {
  type: AssetActionTypes;
  problemDetail: IProblemDetail;
}
export const assetPostRequestFailureActionCreator = (problemDetail: IProblemDetail): IAssetPostRequestFailureAction => ({
  type: ASSET_POST_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export type AssetActions = IAssetPostRequestAction
  | IAssetPostRequestSuccessAction
  | IAssetPostRequestFailureAction
;
