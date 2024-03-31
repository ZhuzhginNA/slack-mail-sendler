import { NestFactory } from '@nestjs/core'
import { MailModule } from './mail/mail.module'
import { MailController } from './mail/mail.controller'
// import cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(MailModule)
  app.enableCors();
  await app.listen(3000)
}
bootstrap()
