import { Injectable } from '@nestjs/common'
import { WebClient } from '@slack/web-api'
import { IMailService } from './mail.service.interface'
import { PrismaClient } from '@prisma/client'




const prisma = new PrismaClient()



@Injectable()
export class MailService implements IMailService {
     token = process.env.SLACK_BOT_TOKEN
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
          })
        }
    
        console.log('Message successfully sent to all users.')
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }

    public async getAnswers(page: number, limit: number): Promise<any> {
      try {
        const usersWithAnswers = await prisma.user.findMany({
          include: {
            answers: {
              include: {
                question: true,
              },
            },
          },
          take: +limit, 
          skip: (page - 1) * limit, 
        });
  
        return usersWithAnswers
      } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
      }
    }

    public async postAnswer(req: any) {
      try {
        const answer =JSON.parse(req.payload)
        const userId = answer.channel.id
        const messageTs = answer.message.ts
        await this.web.chat.update({
          channel: userId,
          ts: messageTs, 
          text: answer.actions[0].value == 'yes' ? `Спасибо за ответ! Ждем тебя на летнем корпоративе` : `Спасибо за ответ! Очень жаль что ты не сможешь приехать =(`,
        });
        
    }catch(error){
        console.log(error)
    }
    }

    public async saveAnswer(req: any) {

      const data = JSON.parse(req.payload)


      const newQuestion = await prisma.question.create({
        data: {
  
          text: data.message.blocks[0].text.text
        }
      })

      const newUser = await prisma.user.create({
        data: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.username
        }
      })
    
      const newAnswer = await prisma.answer.create({
        data: {
          text: data.actions[0].value,
          question: {
            connect: {
              id: newQuestion.id
            }
          },
          user: {
            connect: {
              id: data.user.id
            }
          }
        }
      })

      
    }
}