import { IAsset, IProblemDetail } from 'swagchat-sdk';
export interface IAssetState {
    file: Blob | null;
    asset: IAsset | null;
    problemDetail: IProblemDetail | null;
}
