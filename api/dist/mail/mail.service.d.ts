import { WebClient } from '@slack/web-api';
import { IMailService } from './mail.service.interface';
export declare class MailService implements IMailService {
    token: string;
    web: WebClient;
    sendMessageToAllUsers(message: string): Promise<void>;
    getAnswers(): Promise<({
        answers: ({
            question: {
                id: number;
                text: string;
            };
        } & {
            id: number;
            userId: string;
            questionId: number;
            text: string;
        })[];
    } & {
        id: string;
        name: string;
        email: string;
    })[]>;
    postAnswer(req: any): Promise<void>;
    saveAnswer(req: any): Promise<void>;
}
