export type UsersAnswer = {
    id: string
    name: string
    email: string
    answers: Answer[]
}

export type Answer = {
    id: string
    UserId: string
    questionId: string
    text: string
    question: Question
}

export type Question = {
    id: string
    text: string
}