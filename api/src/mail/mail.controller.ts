import { Controller, Post, Get, Req, Res, HttpStatus, Query } from '@nestjs/common'
import { MailService } from './mail.service'
import { Request, Response } from 'express'
import { PaginationDto } from './PaginationDto'


@Controller('/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/sendMessageToAllUsers')
  sendsendMessageToAllUsers(): any {
    return this.mailService.sendMessageToAllUsers("Иди делать плашки нечисть")
  }

  @Get('/getAnswers')
  getAnswer(@Query() pagination: PaginationDto): any {
    return this.mailService.getAnswers(pagination.page, pagination.limit)
  }

  @Post('/postAnswer')
  postAnswer(@Req() request: Request, @Res() res: Response): any {
    this.mailService.postAnswer(request.body)
    this.mailService.saveAnswer(request.body)
    return res.sendStatus(HttpStatus.OK).send();
  }
}
