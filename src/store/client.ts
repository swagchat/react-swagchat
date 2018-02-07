import { Client, Room } from 'swagchat-sdk';

export interface ClientState {
  client: Client | null;
  currentRoom: Room | null;
  userId: string;
  accessToken: string;
}