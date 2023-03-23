using JustChatting.Data;
using JustChatting.Interfaces;
using JustChatting.Models;
using Microsoft.EntityFrameworkCore;

namespace JustChatting.Repositories;

public class ChannelRepository : IChannelRepository
{
    private readonly DataContext _context;
    public ChannelRepository(DataContext context)
    {
        _context = context;
    }
    public ICollection<Channel> GetChannels()
    {
        return _context.Channels.ToList();
    }

    public Channel GetChannel(int id)
    {
        return _context.Channels.Where(c => c.Id == id).Include(m => m.Messages).FirstOrDefault();
    }
    
    public ICollection<Message> GetMessagesInChannel(int id)
    {
        return _context.Messages.Where(c => c.Channel.Id == id).ToList();
    }

    public bool ChannelExists(int id)
    {
        return _context.Channels.Any(c => c.Id == id);
    }

    public bool CreateChannel(Channel channel)
    {
        _context.Add(channel);
        return Save();
    }

    public bool UpdateChannel(Channel channel)
    {
        _context.Update(channel);
        return Save();
    }

    public bool DeleteChannel(Channel channel)
    {
        _context.Remove(channel);
        return Save();
    }

    public bool Save()
    {
        return _context.SaveChanges() > 0 ? true : false;
    }
}