// import { ErrorResponse } from './';
import { ErrorResponse } from '../protogen/errorResponse_pb';

export interface UserState {
  currentUserID: string;
  users: User[] | null;
  user: User | null;
  errorResponse: ErrorResponse | null;
}

export interface User {
  userID: string;
  name: string;
}

export interface UserResponse {
  user: User | null;
  errorResponse: ErrorResponse | null;
}

export interface UsersResponse {
  allCouunt: number;
  users: User[] | null;
  errorResponse: ErrorResponse | null;
}