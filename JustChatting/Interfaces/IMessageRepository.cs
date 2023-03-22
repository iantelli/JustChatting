using JustChatting.Models;

namespace JustChatting.Interfaces;

public interface IMessageRepository
{
    ICollection<Message> GetMessages();
    Message GetMessage(int id);
    bool MessageExists(int id);
    bool CreateMessage(Message message);
    bool UpdateMessage(Message message);
    bool DeleteMessage(Message message);
    bool Save();
}