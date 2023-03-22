namespace JustChatting.Dtos;

public class ChannelDto
{
    public int Id { get; set; } 
    public string Name { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
}