import { IMessage, IProblemDetail } from 'swagchat-sdk';
export interface IMessageState {
    messagesAllCount: number;
    messagesLimit: number;
    messagesOffset: number;
    messages: {
        [key: string]: IMessage;
    };
    problemDetail: IProblemDetail | null;
    createMessages: IMessage[];
}
