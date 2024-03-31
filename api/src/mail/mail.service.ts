import { Injectable } from '@nestjs/common'
import { WebClient } from '@slack/web-api'
import { IMailService } from './mail.service.interface'
import { response } from 'express'
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()



@Injectable()
export class MailService implements IMailService {
     token = 'xoxp-6873655806946-6867019602950-6886442240450-3263978e0500c07b1cc7a72935299c82'
     web = new WebClient(this.token)

  

     public async sendMessageToAllUsers(message: string) {
      try {
        // Get the list of users in the Slack workspace
        const usersListResponse = await this.web.users.list({});

        console.log(usersListResponse)

        const users = usersListResponse.members;
    
        // Send message to each user with a form containing two buttons
        for (const user of users) {
          await this.web.chat.postMessage({
            channel: user.id,
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: message,
                },
              },
              {
                type: 'actions',
                elements: [
                  {
                    type: 'button',
                    text: {
                      type: 'plain_text',
                      text: 'Yes',
                    },
                    value: 'yes',
                    
                  },
                  {
                    type: 'button',
                    text: {
                      type: 'plain_text',
                      text: 'No',
                    },
                    value: 'no',
                    
                  },
                ],
              },
            ],
          });
        }
    
        console.log('Message successfully sent to all users.');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }

    public getAnswer(res: Response) {
      try {
        console.log(res)
        return res
      }
      catch(error){
        console.log(error)
      }
    }

    public async postAnswer(req: any) {
      try {
        //  const id = req.payload.user.id
        const answer =JSON.parse(req.payload)
        const userId = answer.channel.id
        const messageTs = answer.message.ts

        console.log(userId)

        await this.web.chat.update({
          channel: userId,
          ts: messageTs, 
          text: 'updatedMessage',
        });
        
    }catch(error){
        console.log(error)
    }
    }

    public async saveAnswer(req: any) {

      const data = JSON.parse(req.payload)

      // console.log(data)

      const newQuestion = await prisma.question.create({
        data: {
  
          text: data.message.blocks[0].text.text
        }
      });

      // console.log(data.actions.value)
    
      const newAnswer = await prisma.answer.create({
        data: {
          text: data.actions[0].value,
          question: {
            connect: {
              id: newQuestion.id
            }
          }
        }
      });

      const newUser = await prisma.user.create({
        data: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.username
        }
      });
    }
}