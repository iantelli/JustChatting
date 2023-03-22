namespace JustChatting.Models;

public class Message
{
    public int Id { get; set; }
    public string Text { get; set; }
    public string UserName { get; set; }
    public DateTime Created { get; set; }
    public int ChannelId { get; set; }
    public Channel Channel { get; set; }
}