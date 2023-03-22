import { Message, MessageDto } from '../models'
import axios from 'axios'
export async function getMessages(): Promise<Message[] | undefined> {
    try {
        const { data } = await axios.get(`/api/Message`)
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function getMessage(id: number): Promise<Message | undefined> {
    try {
        const { data } = await axios.get(`/api/Message/${id}`)
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function updateMessage(message: Message): Promise<void> {
    try {
        await axios.put(`/api/Message/${message.id}`, message)
    } catch (error) {
        console.error(error)
    }
}

export async function createMessage(message: MessageDto, channelId: number): Promise<Message | undefined> {
    try {
        const response = await axios.post(`/api/Message/${channelId}`, message)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export async function deleteMessage(id: number): Promise<void> {
    try {
        await axios.delete(`/api/Message/${id}`)
    } catch (error) {
        console.error(error)
    }
}