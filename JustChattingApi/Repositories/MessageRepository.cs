using JustChatting.Data;
using JustChatting.Models;
using JustChatting.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace JustChatting.Repositories;

public class MessageRepository : IMessageRepository
{
    private readonly DataContext _context;
    public MessageRepository(DataContext context)
    {
        _context = context;
    }
    public ICollection<Message> GetMessages()
    {
        return _context.Messages.ToList();
    }

    public Message GetMessage(int id)
    {
        return _context.Messages.Where(m => m.Id == id).FirstOrDefault();
    }

    public bool MessageExists(int id)
    {
        return _context.Messages.Any(m => m.Id == id);
    }

    public bool CreateMessage(Message message)
    {
        _context.Add(message);
        return Save();
    }

    public bool UpdateMessage(Message message)
    {
        _context.Update(message);
        return Save();
    }

    public bool DeleteMessage(Message message)
    {
        _context.Remove(message);
        return Save();
    }

    public bool Save()
    {
        return _context.SaveChanges() > 0 ? true : false;
    }
}