import { Controller, Post, Get, Req, Res, HttpStatus } from '@nestjs/common'
import { MailService } from './mail.service'
import { Request, Response } from 'express'

@Controller('/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/sendMessageToAllUsers')
  sendsendMessageToAllUsers(): any {
    return this.mailService.sendMessageToAllUsers("Иди делать плашки нечисть")
  }

  @Get('/getAnswers')
  getAnswer(): any {
    return this.mailService.getAnswers()
  }

  @Post('/postAnswer')
  postAnswer(@Req() request: Request, @Res() res: Response): any {
    this.mailService.postAnswer(request.body)
    this.mailService.saveAnswer(request.body)
    return res.sendStatus(HttpStatus.OK).send();
  }
}
