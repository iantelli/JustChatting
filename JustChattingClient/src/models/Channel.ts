import { Message } from './Message'
export type Channel = {
    id: number
    name: string
    created: Date
    messages: Message[]
}

export type ChannelDto = {
    name: string
}