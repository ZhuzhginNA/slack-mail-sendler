import { MailService } from './mail.service';
import { Request, Response } from 'express';
import { PaginationDto } from './PaginationDto';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendsendMessageToAllUsers(): any;
    getAnswer(pagination: PaginationDto): any;
    postAnswer(request: Request, res: Response): any;
}
