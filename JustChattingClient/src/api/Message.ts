import { Message, MessageDto } from '../models'
import axios from 'axios'
const baseUrl = 'https://material-star-production.up.railway.app'
export async function getMessages(): Promise<Message[] | undefined> {
    try {
        const { data } = await axios.get(`${baseUrl}/api/Message`)
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function getMessage(id: number): Promise<Message | undefined> {
    try {
        const { data } = await axios.get(`${baseUrl}/api/Message/${id}`)
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function updateMessage(message: Message): Promise<void> {
    try {
        await axios.put(`${baseUrl}/api/Message/${message.id}`, message)
    } catch (error) {
        console.error(error)
    }
}

export async function createMessage(message: MessageDto, channelId: number): Promise<Message | undefined> {
    try {
        const response = await axios.post(`${baseUrl}/api/Message/${channelId}`, message)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export async function deleteMessage(id: number): Promise<void> {
    try {
        await axios.delete(`${baseUrl}/api/Message/${id}`)
    } catch (error) {
        console.error(error)
    }
}