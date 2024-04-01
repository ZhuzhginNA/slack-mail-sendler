"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const web_api_1 = require("@slack/web-api");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let MailService = class MailService {
    constructor() {
        this.token = 'xoxb-6873655806946-6888905554884-ROQnCU7z1izWwhn3DR7uLuH8';
        this.web = new web_api_1.WebClient(this.token);
    }
    async sendMessageToAllUsers(message) {
        try {
            const usersListResponse = await this.web.users.list({});
            console.log(usersListResponse);
            const users = usersListResponse.members;
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
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    }
    async getAnswers() {
        try {
            const usersWithAnswers = await prisma.user.findMany({
                include: {
                    answers: {
                        include: {
                            question: true,
                        },
                    },
                },
            });
            return usersWithAnswers;
        }
        catch (error) {
            console.error(error);
            throw new Error('Internal server error');
        }
    }
    async postAnswer(req) {
        try {
            const answer = JSON.parse(req.payload);
            const userId = answer.channel.id;
            const messageTs = answer.message.ts;
            console.log(userId);
            await this.web.chat.update({
                channel: userId,
                ts: messageTs,
                text: 'updatedMessage',
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async saveAnswer(req) {
        const data = JSON.parse(req.payload);
        const newQuestion = await prisma.question.create({
            data: {
                text: data.message.blocks[0].text.text
            }
        });
        const newUser = await prisma.user.create({
            data: {
                id: data.user.id,
                name: data.user.name,
                email: data.user.username
            }
        });
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
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)()
], MailService);
//# sourceMappingURL=mail.service.js.map