export type Message = {
    id: number
    text: string
    userName: string
    created: Date
    channelId: number
}

export type MessageDto = {
    text: string
    userName: string
}