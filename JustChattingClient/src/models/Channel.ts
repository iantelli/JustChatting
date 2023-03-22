import { Message } from './Message'
export type Channel = {
    id: number
    name: String
    created: Date
    messages: Message[]
}