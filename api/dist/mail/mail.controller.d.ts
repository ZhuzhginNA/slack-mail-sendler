import { MailService } from './mail.service';
import { Request, Response } from 'express';
import { PaginationDto } from './PaginationDto';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendsendMessageToAllUsers(message: any): Promise<void>;
    getAnswer(pagination: PaginationDto): Promise<any>;
    postAnswer(request: Request, res: Response): Response<any, Record<string, any>>;
}
