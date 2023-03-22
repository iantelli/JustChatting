import { Channel } from "../models";

type ChannelBoxProps = {
    channel: Channel;
}

export const ChannelBox = (props: ChannelBoxProps) => {
    return (
        <div className="channel-box">
            <div className="channel-box__name">{props.channel.name}</div>
            <div className="channel-box__created-at">{props.channel.created.toString()}</div>
        </div>
    );
}