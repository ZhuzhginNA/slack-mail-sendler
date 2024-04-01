export interface IMailService {
    sendMessageToAllUsers(message: string) : Promise<void>,
    getAnswers(page: number, limit: number): Promise<any>
}