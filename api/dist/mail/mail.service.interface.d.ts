import type { UsersAnswer } from './types';
export interface IMailService {
    sendMessageToAllUsers(message: string): Promise<void>;
    getAnswers(page: number, limit: number): Promise<UsersAnswer[]>;
}
