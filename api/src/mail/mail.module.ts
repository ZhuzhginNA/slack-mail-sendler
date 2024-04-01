import { Module } from '@nestjs/common'
import { MailController } from './mail.controller'
import { MailService } from './mail.service'
import { PrismaClient } from '@prisma/client'

@Module({
  imports: [PrismaClient],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
