export type Message = {
    id: number
    text: String
    userName: String
    created: Date
    channelId: number
}

export type MessageDto = {
    text: String
    userName: String
}