import { useEffect, useState } from "react";
import { Channel, Message} from "./models";
import * as channelService from "./api/Channel"
import { ChannelBox} from "./components";
import "./App.css";
import useSignalR from "./useSignalR";

export default function App() {
    const { connection } = useSignalR("/r/chat");
    const [channels, setChannels] = useState([] as Channel[] | undefined);

    useEffect(() => {
        (async () => {
            const channelresponse = await channelService.getChannels();
            setChannels(channelresponse);
        }
        )();
    }, []);

    return (
        <div className="App">
            <h1>SignalR Chat</h1>
            <p>{connection ? "Connected" : "Not connected"}</p>
            {channels?.map((channel) => (
                <ChannelBox key={channel.id} channel={channel} />
            ))}
        </div>
    );
}