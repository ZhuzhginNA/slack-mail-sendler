export interface IMailService {
    sendMessageToAllUsers(message: string) : Promise<void>,
    getAnswers(res): any
}