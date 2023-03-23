using JustChatting.Models;

namespace JustChatting.Interfaces;

public interface IChannelRepository
{
    ICollection<Channel> GetChannels();
    Channel GetChannel(int id);
    bool ChannelExists(int id);
    bool CreateChannel(Channel channel);
    bool UpdateChannel(Channel channel);
    bool DeleteChannel(Channel channel);
    ICollection<Message> GetMessagesInChannel(int id);
    bool Save();
}