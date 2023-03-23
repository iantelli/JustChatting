import { useEffect, useState } from "react";
import { Channel, Message } from "./models";
import * as channelService from "./api/Channel"
import * as messageService from "./api/Message"
import { ChannelBox } from "./components";
import useSignalR from "./useSignalR";
import { Flex,
Button,
    Input,
    Heading,

} from "@chakra-ui/react";
import { ChatMessage } from "./components";

export default function App() {
    const { connection } = useSignalR("/r/chat");
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[] | undefined>([]);
    const [channels, setChannels] = useState<Channel[] | undefined>([]);
    const [channelName, setChannelName] = useState<string>("");
    const [currentChannelId, setCurrentChannelId] = useState<number>(0);

    useEffect(() => {
        if (connection) {
            connection.on("ReceiveMessage", (message: Message) => {
                setMessages([...messages!, message]);
            });
        }
    }, [connection, messages]);

    useEffect(() => {
        channelService.getChannels().then((channels) => {
            setChannels(channels);
        });
    }, []);

    const handleJoinGroup = (channelId: number) => {
        connection?.invoke("AddToGroup", channelId.toString());
        setCurrentChannelId(channelId);
        channelService.getMessagesForChannel(channelId).then((messages) => {
            setMessages(messages);
        });
    }

    const handleLeaveGroup = () => {
        connection?.invoke("RemoveFromGroup", currentChannelId.toString());
        setCurrentChannelId(0);
        setMessages([]);
    }

    const handleSendMessage = () => {
        messageService.createMessage({text: message, userName}, currentChannelId).then(() => {
            setMessage("");
        });
    }

    const handleCreateChannel = async () => {
        await channelService.createChannel({name: channelName});
        channelService.getChannels().then((channels) => {
            setChannels(channels);
        });
    }

    const handleDeleteChannel = async (channelId: number) => {
        await channelService.deleteChannel(channelId);
        channelService.getChannels().then((channels) => {
            setChannels(channels);
        });
        if (channelId === currentChannelId) {
            handleLeaveGroup();
        }
    }

    const handleDeleteMessage = async (messageId: number) => {
        await messageService.deleteMessage(messageId);
        channelService.getMessagesForChannel(currentChannelId).then((messages) => {
            setMessages(messages);
        });
    }

    return (
        <>
            <Flex flexDirection={"column"} justifyContent={"center"} textAlign={"center"}>
                <Heading>Channel Name</Heading>
                <Input type="text" value={channelName} onChange={(e) => setChannelName(e.target.value)} />
                <Button colorScheme={"green"} onClick={handleCreateChannel}>Create</Button>
                <Flex flexDirection={"row"} justifyContent={"center"} textAlign={"center"}>
                    {channels?.map((channel) => (
                        <ChannelBox key={channel.id} channel={channel} onJoin={() => handleJoinGroup(channel.id)} onDelete={() => handleDeleteChannel(channel.id)} currentChannelId={currentChannelId} />
                    ))}
                </Flex>
                <Flex flexDirection={"column"} justifyContent={"center"} textAlign={"center"}>
                    {messages?.map((message) => (
                        <ChatMessage key={message.id}  message={message} onDelete={() => handleDeleteMessage(message.id)}/>
                    ))}
                </Flex>
                <Flex flexDirection={"column"} justifyContent={"center"} align={"center"} textAlign={"center"}>
                    <Heading>Name</Heading>
                    <Input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <Heading>Message</Heading>
                    <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <Button colorScheme={"green"} onClick={handleSendMessage}>Send</Button>
                </Flex>
                {currentChannelId !== 0 ? (
                    <Button colorScheme={"red"} onClick={handleLeaveGroup}>Leave</Button>
                ) : (
                    <></>
                )}
            </Flex>
        </>
    );
}