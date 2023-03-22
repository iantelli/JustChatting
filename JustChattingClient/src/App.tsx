import { useEffect, useState } from "react";
import { Channel, Message } from "./models";
import * as channelService from "./api/Channel"
import * as messageService from "./api/Message"
import { ChannelBox} from "./components";
import useSignalR from "./useSignalR";

export default function App() {
    const { connection } = useSignalR("/r/chat");
    const [channels, setChannels] = useState([] as Channel[] | undefined);
    const [text, setText] = useState("");
    const [userName, setuserName] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Send the message to signal r
        const result = await messageService.createMessage({text, userName}, 1,);
    }

    useEffect(() => {
        (async () => {
            const channelresponse = await channelService.getChannels();
            setChannels(channelresponse);
        }
        )();
    }, []);

    useEffect(() => {
        if (!connection) {
            return
        }
        connection.invoke("AddToGroup", 1)
        // listen for messages from the server
        connection.on("ReceiveMessage", (message) => {
            console.log("message from the server", message)
        })

        return () => {
            connection.invoke("RemoveFromGroup", 1)
            connection.off("ReceiveMessage")
        }
    }, [connection])

    return (
        <div>
            <p>{connection ? "Connected" : "Not connected"}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={e => setText(e.target.value)} />
                <input type="text" value={userName} onChange={e => setuserName(e.target.value)} />
                <button type="submit">Send</button>
            </form>
            {channels?.map((channel) => (
                <ChannelBox key={channel.id} channel={channel} />
            ))}
        </div>
    );
}