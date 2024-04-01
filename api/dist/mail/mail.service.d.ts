import { WebClient } from '@slack/web-api';
import { IMailService } from './mail.service.interface';
export declare class MailService implements IMailService {
    token: string;
    web: WebClient;
    sendMessageToAllUsers(message: string): Promise<void>;
    getAnswers(page: number, limit: number): Promise<any>;
    postAnswer(req: any): Promise<void>;
    saveAnswer(req: any): Promise<void>;
}
