import { User, IUser, IRoomForUser, IProblemDetail } from 'swagchat-sdk';
export interface IUserState {
    apiKey: string;
    apiEndpoint: string;
    realtimeEndpoint: string;
    userId: string;
    accessToken: string;
    user: User | null;
    userRooms: IRoomForUser[];
    users: IUser[];
    contacts: IUser[];
    blocks: string[];
    problemDetail: IProblemDetail | null;
}
