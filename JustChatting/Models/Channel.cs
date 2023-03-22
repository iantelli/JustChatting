namespace JustChatting.Models;

public class Channel
{
   public int Id { get; set; } 
   public string Name { get; set; }
   public DateTime Created { get; set; }
   public ICollection<Message> Messages { get; set; }
}