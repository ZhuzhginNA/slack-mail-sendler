export interface IMailService {
    sendMessageToAllUsers(message: string) : Promise<void>,
    getAnswer(res): any
}