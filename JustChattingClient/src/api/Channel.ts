import { Message, Channel, ChannelDto } from '../models'
import axios from 'axios'

export async function getChannels(): Promise<Channel[] | undefined> {
    try {
        const { data } = await axios.get(`/api/Channel`)
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function getChannel(id: number): Promise<Channel | undefined> {
    try {
        const { data } = await axios.get(`/api/Channel/${id}`)
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function getMessagesForChannel(channelId: number): Promise<Message[] | undefined> {
    try {
        const { data } = await axios.get(`/api/Channel/${channelId}/messages`)
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function updateChannel(channel: Channel): Promise<Channel | undefined> {
    try {
        const response = await axios.put(`$/api/Channel/${channel.id}`, channel)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export async function createChannel(channel: ChannelDto): Promise<Channel | undefined> {
    try {
        const response = await axios.post(`/api/Channel`, channel)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export async function deleteChannel(id: number): Promise<void> {
    try {
        await axios.delete(`/api/Channel/${id}`)
    } catch (error) {
        console.error(error)
    }
}
