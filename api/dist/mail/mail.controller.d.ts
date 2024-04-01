import { MailService } from './mail.service';
import { Request, Response } from 'express';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendsendMessageToAllUsers(): any;
    getAnswer(): any;
    postAnswer(request: Request, res: Response): any;
}
