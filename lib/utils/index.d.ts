import { IUserForRoom, IUserMini } from 'swagchat-sdk';
export declare function dateHumanize(ISO3339: string): string;
export declare function dateFormateHHMM(ISO3339: string): string;
export declare function dateFormateMMDD(ISO3339: string): string;
export declare function date2ISO3339String(date: Date): string;
export declare function opponentUser(users: IUserForRoom[] | IUserMini[], myUserId: string): (IUserForRoom[] | null);