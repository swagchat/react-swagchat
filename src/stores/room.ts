import { Room, IUserForRoom, IProblemDetail } from 'swagchat-sdk';

export interface IRoomState {
  roomId: string;
  room: Room | null;
  problemDetail: IProblemDetail | null;
  roomUsers: {[key: string]: IUserForRoom} | null;
  updateName: string;
  updatePicture: Blob | null;
  updateType: number;
}
